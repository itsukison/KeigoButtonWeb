import type { Metadata } from "next";
import MacLanding from "@/components/mac/App";
import { alternatesFor, alternatesForLang } from "@/lib/alternates";
import { dict, localeMeta, type Lang } from "@/lib/i18n";
import {
  faqNode,
  graph,
  macSoftwareApplicationNode,
  organizationNode,
  websiteNodeFor,
} from "@/lib/site";

/**
 * The Mac landing, rendered by both `app/page.tsx` (日本語, at `/`) and
 * `app/[lang]/page.tsx` (`/en`, `/zh`).
 *
 * **One body, two routes.** The alternative — a copy of the page per language — is
 * how the two fall out of step: a change to the Japanese page is not a change to the
 * English one, and nothing tells you. Everything that differs between them comes
 * from `dict(lang)`.
 */
export function macMetadata(lang: Lang): Metadata {
  const t = dict(lang);
  const meta = localeMeta(lang);

  return {
    title: { absolute: t.seo.mac.title },
    description: t.seo.mac.description,
    alternates: lang === "ja" ? alternatesFor("/") : alternatesForLang(lang, "/"),
    openGraph: {
      title: t.seo.mac.ogTitle,
      description: t.seo.mac.ogDescription,
      url: lang === "ja" ? "/" : `/${lang}`,
      siteName: t.brand,
      images: [{ url: "/mac-footer.png", alt: t.seo.mac.ogTitle }],
      locale: meta.ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.seo.mac.title,
      description: t.seo.mac.ogDescription,
      images: ["/mac-footer.png"],
    },
  };
}

export function MacHome({ lang }: { lang: Lang }) {
  const t = dict(lang);

  // The FAQ structured data has to be the FAQ that is actually on the page — Google
  // treats a mismatch as a violation, and the visible copy is now translated.
  const macFaq = t.faq.items.slice(0, 3).map((item) => ({ q: item.q, a: item.a }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            graph(
              organizationNode,
              websiteNodeFor(lang),
              macSoftwareApplicationNode(lang),
              faqNode(macFaq),
            ),
          ).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mac-landing">
        <MacLanding lang={lang} />
      </div>
    </>
  );
}
