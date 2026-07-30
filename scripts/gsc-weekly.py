#!/usr/bin/env python3
"""Weekly Search Console snapshot for keigobutton.com.

Feeds the 測定 table in Japanese/docs/marketing/gtm/seo-geo.md and the weekly
review. Reads the URL list from the live sitemap rather than a hardcoded list,
so a new article shows up here the same way it shows up in the sitemap.

    export GOOGLE_APPLICATION_CREDENTIALS=~/.config/keigobutton/gsc.json
    export GSC_SITE_URL=sc-domain:keigobutton.com
    python3 scripts/gsc-weekly.py

Each run writes scripts/gsc-snapshots/<date>.json and diffs against the most
recent earlier snapshot, so coverage transitions (discovered -> indexed, or a
regression) are visible without reading the whole table.

Quota: the URL Inspection API allows 2,000 queries/day and 600/minute per
property, so one pass over ~26 URLs is negligible. Note it is READ-ONLY —
"request indexing" has no API and must be done by hand in the GSC UI.
"""
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import gsc  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
SNAPDIR = os.path.join(HERE, "gsc-snapshots")
SITEMAP = "https://keigobutton.com/sitemap.xml"

INDEXED = "送信して登録されました"


def norm(u):
    """Trailing slash only — Google reports the apex with one and the page
    declares it without, which is not a real canonical disagreement."""
    return (u or "").rstrip("/")


def sitemap_urls() -> list[str]:
    with urllib.request.urlopen(SITEMAP, timeout=30) as r:
        return re.findall(r"<loc>([^<]+)</loc>", r.read().decode())


def main() -> None:
    site = os.environ.get("GSC_SITE_URL")
    if not site:
        sys.exit("GSC_SITE_URL is not set")
    token = gsc.access_token()
    urls = sitemap_urls()
    today = time.strftime("%Y-%m-%d", time.gmtime())

    rows = []
    for i, u in enumerate(urls, 1):
        res = json.loads(
            gsc.request(
                f"{gsc.SC}/urlInspection/index:inspect",
                data={"inspectionUrl": u, "siteUrl": site, "languageCode": "ja"},
                token=token,
            )
        ).get("inspectionResult", {})
        idx = res.get("indexStatusResult", {})
        rows.append(
            {
                "url": u,
                "verdict": idx.get("verdict"),
                "coverage": idx.get("coverageState"),
                "robots": idx.get("robotsTxtState"),
                "fetch": idx.get("pageFetchState"),
                "lastCrawl": idx.get("lastCrawlTime"),
                "googleCanonical": idx.get("googleCanonical"),
                "userCanonical": idx.get("userCanonical"),
                "rich": [d.get("richResultType") for d in
                         (res.get("richResultsResult") or {}).get("detectedItems", [])],
            }
        )
        print(f"[{i:>2}/{len(urls)}] {u}", file=sys.stderr)
        time.sleep(0.15)

    indexed = [r for r in rows if r["coverage"] == INDEXED]
    print(f"\n=== {today} — indexed {len(indexed)}/{len(rows)} "
          f"({100 * len(indexed) // max(len(rows), 1)}%) ===\n")

    by_cov: dict[str, list[str]] = {}
    for r in rows:
        by_cov.setdefault(r["coverage"] or "(unknown)", []).append(r["url"])
    for cov, us in sorted(by_cov.items(), key=lambda x: -len(x[1])):
        print(f"{len(us):>3}  {cov}")
        for u in sorted(us):
            print(f"       {u.replace('https://keigobutton.com', '') or '/'}")

    bad = [r for r in rows if r["robots"] not in (None, "ALLOWED", "ROBOTS_TXT_STATE_UNSPECIFIED")]
    if bad:
        print("\n!! robots.txt blocking:")
        for r in bad:
            print(f"   {r['url']}  {r['robots']}")

    mism = [r for r in rows
            if r["googleCanonical"] and r["userCanonical"]
            and norm(r["googleCanonical"]) != norm(r["userCanonical"])]
    print(f"\ncanonical disagreements (trailing slash ignored): {len(mism)}")
    for r in mism:
        print(f"   {r['url']}\n     declared={r['userCanonical']}\n     google  ={r['googleCanonical']}")

    # Search Analytics. Rows only appear once Google has finalised the data,
    # which lags 2-3 days, so an empty result on a young property is expected.
    sa = json.loads(
        gsc.request(
            f"{gsc.WMX}/sites/{urllib.parse.quote(site, safe='')}/searchAnalytics/query",
            data={
                "startDate": time.strftime("%Y-%m-%d", time.gmtime(time.time() - 7 * 86400)),
                "endDate": today,
                "dimensions": ["query"],
                "rowLimit": 25,
            },
            token=token,
        )
    ).get("rows", [])
    print(f"\n=== top queries, last 7 days ({len(sa)} rows) ===")
    for row in sa:
        print(f"   {row['clicks']:>4}c {row['impressions']:>6}i pos={row['position']:>5.1f}  {row['keys'][0]}")

    os.makedirs(SNAPDIR, exist_ok=True)
    snap = os.path.join(SNAPDIR, f"{today}.json")
    json.dump({"date": today, "rows": rows, "queries": sa}, open(snap, "w"),
              ensure_ascii=False, indent=1)

    prev_files = sorted(f for f in os.listdir(SNAPDIR)
                        if f.endswith(".json") and f != f"{today}.json")
    if prev_files:
        prev = json.load(open(os.path.join(SNAPDIR, prev_files[-1])))
        before = {r["url"]: r["coverage"] for r in prev["rows"]}
        moved = [(u, before.get(u), r["coverage"]) for u, r in
                 ((r["url"], r) for r in rows) if before.get(u) != r["coverage"]]
        print(f"\n=== changes since {prev['date']} ({len(moved)}) ===")
        for u, a, b in moved:
            flag = "+" if b == INDEXED else ("-" if a == INDEXED else " ")
            print(f" {flag} {u.replace('https://keigobutton.com', '') or '/'}\n     {a} -> {b}")
    else:
        print(f"\n(no earlier snapshot; {os.path.basename(snap)} is the baseline)")


if __name__ == "__main__":
    main()
