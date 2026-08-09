import type { LegalDocument } from "@/components/LegalDoc";
import * as en from "./en";
import * as zh from "./zh";

/**
 * Translated legal documents, by language.
 *
 * `ja` is absent on purpose: the Japanese originals are hand-written JSX in
 * `app/{support,terms,privacy}/page.tsx` and are the authoritative texts. Nothing
 * here should ever become the source for them — `LegalDoc` is only reachable from
 * the `/en` and `/zh` routes.
 */
export const LEGAL: Record<"en" | "zh", Record<"support" | "terms" | "privacy", LegalDocument>> = {
  en: { support: en.support, terms: en.terms, privacy: en.privacy },
  zh: { support: zh.support, terms: zh.terms, privacy: zh.privacy },
};
