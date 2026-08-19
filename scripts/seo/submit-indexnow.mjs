const SITE_URL = "https://keigobutton.com";
const INDEXNOW_KEY = "b3e1a9d6f74c4e2a8b91d530c7f26a04";
const KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;

const DEFAULT_PATHS = [
  "/",
  "/en",
  "/mac/reply-assistant",
  "/en/mac/reply-assistant",
  "/mac/custom-rewrite-prompts",
  "/en/mac/custom-rewrite-prompts",
];

const requested = process.argv.slice(2);
const inputs = requested.length > 0 ? requested : DEFAULT_PATHS;
const urlList = [...new Set(inputs.map(toCanonicalUrl))];

if (urlList.length > 10_000) {
  throw new Error("IndexNow accepts at most 10,000 URLs in one request.");
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE_URL).host,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  }),
});

if (!response.ok && response.status !== 202) {
  const detail = await response.text();
  throw new Error(`IndexNow rejected the submission (${response.status}): ${detail}`);
}

console.log(`IndexNow accepted ${urlList.length} URL${urlList.length === 1 ? "" : "s"}.`);

function toCanonicalUrl(input) {
  const url = new URL(input, SITE_URL);
  if (url.origin !== SITE_URL) {
    throw new Error(`Refusing to submit a URL outside ${SITE_URL}: ${input}`);
  }
  url.hash = "";
  url.search = "";
  return url.href;
}
