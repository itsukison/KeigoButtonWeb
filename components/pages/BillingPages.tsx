import type { Metadata } from "next";
import { BillingResult } from "@/components/BillingResult";
import { dict, type Lang } from "@/lib/i18n";

/**
 * The three screens Checkout and the Billing Portal return to, in all three
 * languages.
 *
 * These matter more than their size suggests: Checkout hands off to the **default
 * browser** (Apple Pay needs Safari's payment sheet), so this is where a user stands
 * immediately after paying — and an English-speaking customer who has just been
 * charged ¥1,480 should not land on a Japanese page.
 *
 * They carry `robots: noindex` in every language. They are personal transaction
 * endpoints reached only from Stripe, and `session_id` in the URL means an indexed
 * copy would put one customer's Checkout Session id into search results. That is
 * also why they are not in `SPINE_PATHS` — noindex pages do not belong in a sitemap,
 * and `hreflang` between pages nobody may index would be pointless.
 */
type Screen = "success" | "cancelled" | "portal";

export function billingMetadata(lang: Lang, screen: Screen): Metadata {
  const copy = dict(lang).billing[screen];
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    robots: { index: false, follow: false },
  };
}

export function BillingPage({ lang, screen }: { lang: Lang; screen: Screen }) {
  const t = dict(lang);
  const copy = t.billing[screen];
  const second = "body2" in copy ? copy.body2 : null;
  const note2 = "note2" in copy ? (copy.note2 as string) : null;

  return (
    <BillingResult
      lang={lang}
      eyebrow={copy.eyebrow}
      title={copy.title}
      body={
        <>
          <p>{copy.body1}</p>
          {second ? <p className="mt-4">{second}</p> : null}
        </>
      }
      // A plain custom-scheme link back into the app; the same URL in every language.
      primary={{ label: t.billing.backToApp, href: "keigobutton://billing" }}
    >
      <p>{copy.note1}</p>
      {note2 ? <p className="mt-4">{note2}</p> : null}
    </BillingResult>
  );
}
