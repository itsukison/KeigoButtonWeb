/**
 * Ad attribution for ChatGPT Ads (and any other UTM-tagged campaign).
 *
 * A visitor lands on keigobutton.com carrying campaign parameters in the query
 * string, browses a few pages, and only then taps an App Store button. The
 * parameters are gone from the URL by that point, so they are stashed for the
 * session on arrival and re-attached to the click event.
 *
 * Nothing here reads page content, form fields, or anything the visitor typed —
 * only the six allow-listed query parameters below.
 */

/** The only query parameters ever read or stored. Anything else is ignored. */
export const ATTRIBUTION_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "openai_campaign_id",
  "openai_ad_group_id",
  "openai_ad_id",
] as const;

export type AttributionParam = (typeof ATTRIBUTION_PARAMS)[number];
export type Attribution = Partial<Record<AttributionParam, string>>;

/** Session-scoped by design: sessionStorage clears when the tab closes. */
const STORAGE_KEY = "kb_attribution";

/** Campaign IDs are short; anything longer is junk or an injection attempt. */
const MAX_VALUE_LENGTH = 256;

/**
 * Fallback when sessionStorage is unavailable (Safari private mode, storage
 * blocked by policy). Attribution then lives only for the current page view,
 * which still covers the common land-and-tap path.
 */
let memoryFallback: Attribution = {};

const isAttributionParam = (key: string): key is AttributionParam =>
  (ATTRIBUTION_PARAMS as readonly string[]).includes(key);

const clean = (value: string | null): string | undefined => {
  if (!value) return undefined;
  const trimmed = value.trim().slice(0, MAX_VALUE_LENGTH);
  return trimmed.length > 0 ? trimmed : undefined;
};

/** Extracts the allow-listed parameters from a query string. */
export function parseAttribution(search: string): Attribution {
  const params = new URLSearchParams(search);
  const result: Attribution = {};
  for (const key of ATTRIBUTION_PARAMS) {
    const value = clean(params.get(key));
    if (value !== undefined) result[key] = value;
  }
  return result;
}

export const hasAttribution = (attribution: Attribution): boolean =>
  Object.keys(attribution).length > 0;

function readStore(): Attribution {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return memoryFallback;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return memoryFallback;

    // Re-validate on read: sessionStorage is writable by anything running on
    // the page, so never trust its shape or contents.
    const result: Attribution = {};
    for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (!isAttributionParam(key) || typeof value !== "string") continue;
      const cleaned = clean(value);
      if (cleaned !== undefined) result[key] = cleaned;
    }
    return result;
  } catch {
    return memoryFallback;
  }
}

function writeStore(attribution: Attribution): void {
  memoryFallback = attribution;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Storage full or blocked — memoryFallback still carries the page view.
  }
}

/**
 * Records the attribution for this arrival and returns what is now stored.
 *
 * A URL carrying any campaign parameter replaces the stored set wholesale
 * rather than merging into it: a second ad click is a new attribution context,
 * and merging would splice `utm_source` from the first click onto
 * `openai_ad_id` from the second. A URL with no campaign parameters (internal
 * navigation, a direct return visit) leaves the stored set untouched.
 */
export function recordAttribution(search: string): Attribution {
  const fromUrl = parseAttribution(search);
  if (!hasAttribution(fromUrl)) return readStore();
  writeStore(fromUrl);
  return fromUrl;
}

/** The attribution stored for this session, for use as event properties. */
export const getAttribution = (): Attribution => readStore();
