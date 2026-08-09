import type { ReactNode } from "react";
import { localeMeta, type Lang } from "@/lib/i18n";
import { HtmlLang } from "./HtmlLang";

/**
 * Marks a localized subtree as being in its own language.
 *
 * **Why this is a `<div lang>` and not `<html lang>`.** Next's own i18n guide nests
 * every route under `app/[lang]`, which gives the default language a prefix too —
 * `/keigo-henkan` would become `/ja/keigo-henkan`. This site is already indexed on
 * those unprefixed URLs and they are the pages that rank, so that pattern is not
 * available here. Setting `<html lang>` per route instead needs multiple root
 * layouts, and the docs are explicit that those require *no* top-level `layout.tsx`
 * — i.e. moving all thirteen existing route folders into a group, in the repo that
 * is currently live and earning, to change one attribute.
 *
 * `lang` is a global attribute and assistive technology honours the nearest
 * ancestor, so a wrapper around the whole body content is correct HTML and does the
 * real work — screen readers switch voice on it. It is server-rendered and needs no
 * JavaScript. `HtmlLang` then corrects the `<html>` element itself on the client,
 * which is the only part that cannot be done from here.
 *
 * If the `<html>` attribute ever has to be server-rendered, the route-group move is
 * the documented way and nothing here blocks it.
 */
export function LangShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  const meta = localeMeta(lang);
  return (
    <div lang={meta.htmlLang}>
      <HtmlLang lang={meta.htmlLang} />
      {children}
    </div>
  );
}
