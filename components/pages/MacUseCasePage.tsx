import Link from "next/link";
import type { MacUseCase, MacUseCaseLang } from "@/content/mac-use-cases";
import { macUseCasePath } from "@/content/mac-use-cases";
import { MacProse } from "@/components/mac/MacProse";
import { MacToc } from "@/components/mac/MacToc";
import { MacDocShell } from "@/components/mac/MacDocShell";
import { tableOfContents } from "@/lib/blocks";
import {
  APP_STORE_URL,
  MAC_DOWNLOAD_URL,
  PUBLISHER_URL,
  SITE_URL,
  breadcrumbNode,
  faqNode,
  graph,
  macSoftwareApplicationNode,
  organizationNode,
  websiteNodeFor,
} from "@/lib/site";

const COPY = {
  ja: {
    read: "分で読めます",
    updated: "更新",
    byline: "敬語ボタン開発チームが執筆",
    faq: "よくある質問",
    ctaTitle: "自分のMacで試す",
    ctaBody:
      "月50回まで無料、カード登録は不要です。Appleシリコン・IntelのmacOS 14以降に対応します。",
    download: "Mac版をダウンロード",
    iphone: "iPhone版を入手",
    related: "関連する使い方",
    home: "敬語ボタン",
  },
  en: {
    read: "min read",
    updated: "Updated",
    byline: "Written by the team behind KeigoButton",
    faq: "Frequently asked questions",
    ctaTitle: "Try it on your Mac",
    ctaBody:
      "Free for 50 rewrites a month, no card required. Supports Apple silicon and Intel on macOS 14 or later.",
    download: "Download for Mac",
    iphone: "Get it for iPhone",
    related: "Related workflow",
    home: "KeigoButton",
  },
} as const;

export function MacUseCasePage({
  lang,
  entry,
}: {
  lang: MacUseCaseLang;
  entry: MacUseCase;
}) {
  const page = entry[lang];
  const path = macUseCasePath(lang, entry.slug);
  const url = `${SITE_URL}${path}`;
  const labels = COPY[lang];
  const toc = [
    ...tableOfContents(page.blocks),
    { id: "faq-heading", text: labels.faq },
  ];

  const articleNode = {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: page.title,
    description: page.description,
    inLanguage: lang,
    datePublished: page.published,
    dateModified: page.updated,
    mainEntityOfPage: url,
    author: { "@id": organizationNode["@id"] },
    publisher: { "@id": organizationNode["@id"] },
    about: { "@id": macSoftwareApplicationNode(lang)["@id"] },
    keywords: page.keywords.join(", "),
  };

  return (
    <div className="mac-landing">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            graph(
              organizationNode,
              websiteNodeFor(lang),
              macSoftwareApplicationNode(lang),
              articleNode,
              faqNode(page.faq),
              breadcrumbNode([
                { name: labels.home, path: lang === "ja" ? "/" : "/en" },
                { name: page.title, path },
              ]),
            ),
          ).replace(/</g, "\\u003c"),
        }}
      />

      <MacDocShell lang={lang}>
        <article className="shell mac-doc">
          <div className="mac-doc__wrap">
            <header className="mac-doc__head">
              <p className="eyebrow">{page.category}</p>
              <h1 className="h-display">{page.title}</h1>
              <p className="mac-doc__lead">{page.lead}</p>
              <p className="mac-doc__meta">
                <span>
                  {page.minutes} {labels.read}
                </span>
                <span>·</span>
                <time dateTime={page.updated}>
                  {labels.updated} {page.updated}
                </time>
                <span>·</span>
                <a href={PUBLISHER_URL}>{labels.byline}</a>
              </p>
            </header>

            <div className="mac-doc__layout">
              <div className="mac-doc__main">
                <MacProse blocks={page.blocks} lang={lang} />

                <section className="mac-doc__faq" aria-labelledby="faq-heading">
                  <h2 id="faq-heading" className="h-heading mac-doc__h2">
                    {labels.faq}
                  </h2>
                  {page.faq.map((item) => (
                    <div key={item.q} className="mac-doc__faqItem">
                      <p className="mac-doc__faqQ">{item.q}</p>
                      <p className="mac-doc__p">{item.a}</p>
                    </div>
                  ))}
                </section>

                <section className="mac-doc__cta">
                  <h2 className="h-heading-sm">{labels.ctaTitle}</h2>
                  <p className="mac-doc__p">{labels.ctaBody}</p>
                  <div className="mac-doc__ctaActions">
                    <a className="btn btn--filled btn--lg" href={MAC_DOWNLOAD_URL}>
                      {labels.download}
                    </a>
                    <a className="btn btn--outline btn--lg" href={APP_STORE_URL}>
                      {labels.iphone}
                    </a>
                  </div>
                </section>

                {page.relatedLinks.length > 0 ? (
                  <section aria-labelledby="related-heading">
                    <h2 id="related-heading" className="h-heading mac-doc__h2">
                      {labels.related}
                    </h2>
                    <div className="mac-doc__related">
                      {page.relatedLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="mac-doc__relatedCard"
                        >
                          <span className="mac-doc__relatedTitle">{item.title}</span>
                          <span className="mac-doc__relatedNote">{item.note}</span>
                        </Link>
                      ))}
                    </div>
                  </section>
                ) : null}
              </div>

              <MacToc items={toc} />
            </div>
          </div>
        </article>
      </MacDocShell>
    </div>
  );
}
