import type { Metadata } from "next";
import { LOCALES, href, type Lang } from "./i18n";

/**
 * `hreflang` for one page of the translated spine.
 *
 * Three properties make a set valid, and dropping any one makes Google ignore the
 * whole thing: it must be **self-referencing** (every version lists itself),
 * **symmetric** (every version lists every other), and carry **`x-default`** for a
 * reader we have no language for. `alternatesFor` is the only place these are built,
 * so a page cannot be added to one direction and forgotten in the other.
 *
 * **It is deliberately not applied sitewide.** `/keigo-henkan`, `/reibun/*` and the
 * article cluster exist to rank for Japanese queries and have no counterpart in
 * English or Chinese; annotating them would claim translations that do not exist.
 * Pages outside the spine keep their plain canonical and nothing else.
 */
export function alternatesFor(path: string): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[locale.htmlLang] = href(locale.code as Lang, path);
  }
  // Japanese is the fallback for everyone else, and it is the unprefixed URL — which
  // is also why `/` never became `/ja`: every indexed Japanese URL stays where it is.
  languages["x-default"] = href("ja", path);

  return { canonical: path, languages };
}

/** The same, for a localized variant: canonical points at that variant. */
export function alternatesForLang(lang: Lang, path: string): NonNullable<Metadata["alternates"]> {
  return { ...alternatesFor(path), canonical: href(lang, path) };
}

/**
 * Every path that exists in **all three** languages, and nothing else.
 *
 * The sitemap is built from this, so a path added here before its `/en` and `/zh`
 * routes exist puts a 404 in the sitemap — which is worse than the page being
 * missing, because it is a claim. Add the route first, then the entry.
 */
export const SPINE_PATHS = ["/", "/support", "/terms", "/privacy"] as const;
