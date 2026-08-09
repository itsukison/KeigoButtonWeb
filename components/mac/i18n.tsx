"use client";

import { createContext, useContext, type ReactNode } from "react";
import { DEFAULT_LANG, dict, type Dict, type Lang } from "@/lib/i18n";

/**
 * The Mac landing is one client subtree under `components/mac/App.jsx`, so the
 * language reaches it once at the root rather than as a prop on ten components.
 *
 * The Vite prototype this was ported from resolved strings at module scope, which
 * worked only because each language was its own build. Here all three render from
 * one deployment, so a module-level dictionary would be a shared mutable global
 * across concurrent requests — the classic way a Japanese visitor gets served
 * English under load. A context is per-render and cannot do that.
 */
const MacI18nContext = createContext<{ lang: Lang; t: Dict }>({
  lang: DEFAULT_LANG,
  t: dict(DEFAULT_LANG),
});

export function MacI18nProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <MacI18nContext.Provider value={{ lang, t: dict(lang) }}>
      {children}
    </MacI18nContext.Provider>
  );
}

export function useT(): Dict {
  return useContext(MacI18nContext).t;
}

export function useLang(): Lang {
  return useContext(MacI18nContext).lang;
}
