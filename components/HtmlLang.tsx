"use client";

import { useEffect } from "react";

/**
 * Corrects `<html lang>` for the localized routes.
 *
 * The root layout is shared with the Japanese site and hard-codes `lang="ja"`;
 * `LangShell` explains why it cannot be parameterised without moving every route.
 * The server-rendered `<div lang>` is what assistive technology actually reads, so
 * this is the last percent rather than the mechanism — it renders nothing, and a
 * reader with JavaScript disabled loses only the attribute on the root element.
 */
export function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = lang;
    // Restored on unmount so a client-side navigation back to a Japanese route does
    // not leave the document claiming to be English.
    return () => {
      document.documentElement.lang = previous;
    };
  }, [lang]);

  return null;
}
