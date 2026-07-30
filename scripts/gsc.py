#!/usr/bin/env python3
"""Search Console API client using only stdlib + cryptography (no google-auth).

Mints a service-account JWT assertion, exchanges it for an access token, and
exposes the four calls needed to audit indexing:

  sites                    -> GET  webmasters/v3/sites
  sitemaps  [siteUrl]      -> GET  webmasters/v3/sites/{site}/sitemaps
  inspect   <url>          -> POST searchconsole/v1/urlInspection/index:inspect
  analytics [days]         -> POST webmasters/v3/sites/{site}/searchAnalytics/query

Credentials: GOOGLE_APPLICATION_CREDENTIALS (service-account JSON path)
Property:    GSC_SITE_URL  ("sc-domain:example.com" or "https://example.com/")
"""
import base64
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding

TOKEN_URI = "https://oauth2.googleapis.com/token"
WMX = "https://www.googleapis.com/webmasters/v3"
SC = "https://searchconsole.googleapis.com/v1"
SCOPE = "https://www.googleapis.com/auth/webmasters.readonly"


def b64(raw: bytes) -> str:
    return base64.urlsafe_b64encode(raw).rstrip(b"=").decode()


def access_token() -> str:
    path = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS")
    if not path:
        sys.exit("GOOGLE_APPLICATION_CREDENTIALS is not set")
    if not os.path.isfile(path):
        sys.exit(f"credentials file not found: {path}")
    with open(path) as fh:
        sa = json.load(fh)
    if sa.get("type") != "service_account":
        sys.exit(f"expected a service_account key, got type={sa.get('type')!r}")

    now = int(time.time())
    claims = {
        "iss": sa["client_email"],
        "scope": SCOPE,
        "aud": sa.get("token_uri", TOKEN_URI),
        "iat": now,
        "exp": now + 3600,
    }
    signing_input = f'{b64(json.dumps({"alg": "RS256", "typ": "JWT"}).encode())}.{b64(json.dumps(claims).encode())}'
    key = serialization.load_pem_private_key(sa["private_key"].encode(), password=None)
    sig = key.sign(signing_input.encode(), padding.PKCS1v15(), hashes.SHA256())
    assertion = f"{signing_input}.{b64(sig)}"

    body = urllib.parse.urlencode(
        {"grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer", "assertion": assertion}
    ).encode()
    return json.loads(request(sa.get("token_uri", TOKEN_URI), data=body, raw=True))["access_token"]


def request(url, data=None, token=None, raw=False):
    headers = {}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    if data is not None and not raw:
        data = json.dumps(data).encode()
        headers["Content-Type"] = "application/json"
    elif raw:
        headers["Content-Type"] = "application/x-www-form-urlencoded"
    req = urllib.request.Request(url, data=data, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=45) as resp:
            return resp.read().decode()
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode()[:900]
        sys.exit(f"HTTP {exc.code} {exc.reason} for {url}\n{detail}")


def api(path, data=None):
    return json.loads(request(path, data=data, token=access_token()))


def site() -> str:
    s = os.environ.get("GSC_SITE_URL")
    if not s:
        sys.exit("GSC_SITE_URL is not set")
    return s


def main():
    cmd = sys.argv[1] if len(sys.argv) > 1 else "sites"

    if cmd == "sites":
        entries = api(f"{WMX}/sites").get("siteEntry", [])
        if not entries:
            print("No properties accessible to this service account.")
            print("Add its client_email as a user in GSC > Settings > Users and permissions.")
            return
        print(f"{len(entries)} accessible propert{'y' if len(entries) == 1 else 'ies'}:")
        for e in entries:
            print(f"  {e['siteUrl']:45} permission={e.get('permissionLevel')}")

    elif cmd == "sitemaps":
        s = sys.argv[2] if len(sys.argv) > 2 else site()
        maps = api(f"{WMX}/sites/{urllib.parse.quote(s, safe='')}/sitemaps").get("sitemap", [])
        if not maps:
            print(f"No sitemaps submitted for {s}")
            return
        for m in maps:
            counts = {c.get("type"): c.get("submitted") for c in m.get("contents", [])}
            print(f"  {m['path']}")
            print(f"    lastSubmitted={m.get('lastSubmitted')} lastDownloaded={m.get('lastDownloaded')}")
            print(f"    errors={m.get('errors')} warnings={m.get('warnings')} "
                  f"isPending={m.get('isPending')} contents={counts}")

    elif cmd == "inspect":
        url = sys.argv[2]
        r = api(f"{SC}/urlInspection/index:inspect",
                {"inspectionUrl": url, "siteUrl": site(), "languageCode": "ja"})
        idx = r.get("inspectionResult", {}).get("indexStatusResult", {})
        print(json.dumps({
            "url": url,
            "verdict": idx.get("verdict"),
            "coverageState": idx.get("coverageState"),
            "robotsTxtState": idx.get("robotsTxtState"),
            "indexingState": idx.get("indexingState"),
            "lastCrawlTime": idx.get("lastCrawlTime"),
            "pageFetchState": idx.get("pageFetchState"),
            "googleCanonical": idx.get("googleCanonical"),
            "userCanonical": idx.get("userCanonical"),
            "crawledAs": idx.get("crawledAs"),
            "sitemap": idx.get("sitemap"),
            "referringUrls": idx.get("referringUrls"),
        }, ensure_ascii=False, indent=2))

    elif cmd == "analytics":
        days = int(sys.argv[2]) if len(sys.argv) > 2 else 28
        end = time.strftime("%Y-%m-%d", time.gmtime())
        start = time.strftime("%Y-%m-%d", time.gmtime(time.time() - days * 86400))
        r = api(f"{WMX}/sites/{urllib.parse.quote(site(), safe='')}/searchAnalytics/query",
                {"startDate": start, "endDate": end,
                 "dimensions": ["query", "page"], "rowLimit": 100})
        rows = r.get("rows", [])
        print(f"{start} .. {end}: {len(rows)} rows")
        for row in rows:
            q, p = row["keys"]
            print(f"  {row['clicks']:>4}c {row['impressions']:>6}i pos={row['position']:>5.1f}  {q}  {p}")

    else:
        sys.exit(f"unknown command: {cmd}")


if __name__ == "__main__":
    main()
