import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EN_GUIDES, enGuide } from "@/content/en-guides";
import { MacProse } from "@/components/mac/MacProse";
import { MacDocShell } from "@/components/mac/MacDocShell";
import { isLang } from "@/lib/i18n";
import {
  APP_STORE_URL,
  MAC_DOWNLOAD_URL,
  SITE_URL,
  breadcrumbNode,
  faqNode,
  graph,
  macSoftwareApplicationNode,
  organizationNode,
  websiteNodeFor,
} from "@/lib/site";
import "../../mac-landing.css";

/**
 * The English guide pages, at `/en/<slug>`.
 *
 * **English only, on purpose.** `generateStaticParams` runs once per parent `lang`
 * (Next: "the child `generateStaticParams` is executed once for each set of params
 * the parent generates") and returns nothing for `zh`, so `/zh/<slug>` is a 404
 * rather than an untranslated English page. 简体中文 readers are Chinese speakers
 * writing Japanese (`AGENTS.md` §17) and are not the audience for a Grammarly
 * comparison.
 *
 * **No `hreflang`.** These have no Japanese or Chinese counterpart, and the Japanese
 * cluster has no English one — the two clusters target different queries for
 * different jobs. Annotating them would claim translations that do not exist, which
 * is the rule `lib/alternates.ts` already states for the Japanese tool pages.
 */
export const dynamicParams = false;

// Both segments are generated here — the "bottom up" form in Next's
// generate-static-params guide. Returning only `slug` and letting the parent supply
// `lang` produced zero paths, and a child that silently generates nothing is
// indistinguishable from a build that worked.
export function generateStaticParams() {
  return EN_GUIDES.map((guide) => ({ lang: "en", slug: guide.slug }));
}

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const guide = enGuide(slug);
  if (!guide || lang !== "en") return {};

  const url = `/en/${guide.slug}`;
  return {
    title: { absolute: guide.metaTitle },
    description: guide.description,
    keywords: [guide.keyword, ...guide.alsoRanks],
    alternates: { canonical: url },
    openGraph: {
      title: guide.metaTitle,
      description: guide.description,
      url,
      type: "article",
      publishedTime: guide.published,
      modifiedTime: guide.updated,
      locale: "en_US",
      images: [{ url: "/mac-footer.png", alt: guide.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.metaTitle,
      description: guide.description,
      images: ["/mac-footer.png"],
    },
  };
}

export default async function EnGuidePage({ params }: Props) {
  const { lang, slug } = await params;
  const guide = enGuide(slug);
  if (!guide || !isLang(lang) || lang !== "en") notFound();

  const url = `${SITE_URL}/en/${guide.slug}`;
  const related = guide.related.map(enGuide).filter((g) => g !== undefined);

  const articleNode = {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: guide.metaTitle,
    description: guide.description,
    inLanguage: "en",
    datePublished: guide.published,
    dateModified: guide.updated,
    mainEntityOfPage: url,
    author: { "@id": organizationNode["@id"] },
    publisher: { "@id": organizationNode["@id"] },
    about: { "@id": macSoftwareApplicationNode("en")["@id"] },
  };

  return (
    <div className="mac-landing">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            graph(
              organizationNode,
              websiteNodeFor("en"),
              macSoftwareApplicationNode("en"),
              articleNode,
              faqNode(guide.faq),
              breadcrumbNode([
                { name: "KeigoButton", path: "/en" },
                { name: guide.title, path: `/en/${guide.slug}` },
              ]),
            ),
          ).replace(/</g, "\\u003c"),
        }}
      />

      <MacDocShell lang="en">
        <article className="shell mac-doc">
          <header className="mac-doc__head">
            <p className="eyebrow">{guide.category}</p>
            <h1 className="h-display">{guide.title}</h1>
            <p className="mac-doc__lead">{guide.lead}</p>
            <p className="mac-doc__meta">
              <span>{guide.minutes} min read</span>
              <span>·</span>
              <time dateTime={guide.updated}>Updated {guide.updated}</time>
              <span>·</span>
              {/* Stated rather than implied: this is a comparison written by one of
                  the products being compared, and saying so is what lets the rest of
                  it be believed (seo-geo.md §設計方針7). */}
              <span>Written by the team behind KeigoButton</span>
            </p>
          </header>

          <MacProse blocks={guide.blocks} />

          <section className="mac-doc__faq" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="h-heading mac-doc__h2">
              Frequently asked questions
            </h2>
            {guide.faq.map((item) => (
              <div key={item.q} className="mac-doc__faqItem">
                <p className="mac-doc__faqQ">{item.q}</p>
                <p className="mac-doc__p">{item.a}</p>
              </div>
            ))}
          </section>

          <section className="mac-doc__cta">
            <h2 className="h-heading-sm">Try it on your Mac</h2>
            <p className="mac-doc__p">
              Free for 50 rewrites a month, no card required. macOS 14 or later, Apple
              silicon and Intel.
            </p>
            <div className="mac-doc__ctaActions">
              <a className="btn btn--filled btn--lg" href={MAC_DOWNLOAD_URL}>
                Download for Mac
              </a>
              <a className="btn btn--outline btn--lg" href={APP_STORE_URL}>
                Get it for iPhone
              </a>
            </div>
          </section>

          {related.length > 0 ? (
            <section aria-labelledby="related-heading">
              <h2 id="related-heading" className="h-heading mac-doc__h2">
                Keep reading
              </h2>
              <div className="mac-doc__related">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/en/${item.slug}`}
                    className="mac-doc__relatedCard"
                  >
                    <span className="mac-doc__relatedTitle">{item.title}</span>
                    <span className="mac-doc__relatedNote">{item.category}</span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </article>
      </MacDocShell>
    </div>
  );
}
