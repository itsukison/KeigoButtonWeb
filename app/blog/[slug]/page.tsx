import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Prose } from "@/components/Prose";
import { AppCta, Breadcrumbs, JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ARTICLES, articleBySlug } from "@/content/articles";
import { tableOfContents } from "@/lib/blocks";
import {
  APP_ID,
  ORG_ID,
  SITE_URL,
  breadcrumbNode,
  faqNode,
  graph,
  organizationNode,
  softwareApplicationNode,
  websiteNode,
} from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ARTICLES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) return {};

  return {
    title: article.metaTitle,
    description: article.description,
    keywords: [article.keyword, ...article.alsoRanks],
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: article.metaTitle,
      description: article.description,
      url: `/blog/${article.slug}`,
      type: "article",
      publishedTime: article.published,
      modifiedTime: article.updated,
      images: [{ url: "/keyboard.jpg", alt: article.title }],
    },
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) notFound();

  const trail = [
    { name: "ホーム", path: "/" },
    { name: "記事", path: "/blog" },
    { name: article.title, path: `/blog/${article.slug}` },
  ];
  const toc = tableOfContents(article.blocks);
  const related = article.related.map(articleBySlug).filter(Boolean);

  const jsonLd = graph(
    organizationNode,
    websiteNode,
    softwareApplicationNode,
    {
      "@type": "Article",
      "@id": `${SITE_URL}/blog/${article.slug}#article`,
      headline: article.metaTitle,
      alternativeHeadline: article.title,
      description: article.description,
      inLanguage: "ja",
      datePublished: article.published,
      dateModified: article.updated,
      wordCount: article.blocks.length * 60,
      articleSection: article.category,
      keywords: [article.keyword, ...article.alsoRanks].join(", "),
      mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${article.slug}` },
      author: { "@id": ORG_ID },
      publisher: { "@id": ORG_ID },
      about: { "@id": APP_ID },
      isPartOf: { "@type": "Blog", "@id": `${SITE_URL}/blog#blog`, name: "敬語ボタン 記事" },
    },
    faqNode(article.faq),
    breadcrumbNode(trail),
  );

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={jsonLd} />
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-5 pb-8 pt-10 lg:px-8 lg:pt-14">
        <Breadcrumbs trail={trail} />

        <article className="mt-5">
          <div className="flex flex-wrap items-center gap-3 text-[12px]">
            <span className="rounded-full bg-[#F1EEFC] px-3 py-1 font-bold text-[#5B4BA8]">
              {article.category}
            </span>
            <span className="text-black/40">約{article.minutes}分で読めます</span>
            <span className="text-black/40">
              更新：
              <time dateTime={article.updated}>{article.updated.replace(/-/g, "/")}</time>
            </span>
          </div>

          <h1 className="mt-5 font-display text-[28px] font-semibold leading-[1.3] tracking-tight lg:text-[40px]">
            {article.title}
          </h1>
          <p className="mt-5 text-[15px] leading-[1.95] text-black/65 lg:text-base">{article.lead}</p>

          {toc.length > 2 ? (
            <nav aria-label="目次" className="mt-8 rounded-[20px] border border-black/10 bg-[#FAFAFB] p-5">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-black/35">目次</span>
              <ol className="mt-3 flex flex-col gap-2">
                {toc.map(({ id, text }, index) => (
                  <li key={id} className="flex gap-2.5 text-[13.5px] leading-[1.75]">
                    <span className="font-bold text-black/25">{index + 1}</span>
                    <a href={`#${id}`} className="text-black/65 hover:text-black">
                      {text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          <div className="mt-10">
            <Prose blocks={article.blocks} />
          </div>

          {article.faq.length > 0 ? (
            <section className="mt-16">
              <h2 className="font-display text-[22px] font-semibold leading-[1.4] tracking-tight lg:text-[27px]">
                よくある質問
              </h2>
              <div className="mt-6 flex flex-col divide-y divide-black/[0.08] border-t border-black/[0.08]">
                {article.faq.map(({ q, a }) => (
                  <div key={q} className="py-5">
                    <h3 className="font-display text-[16px] font-semibold leading-[1.6] text-black">{q}</h3>
                    <p className="mt-2.5 text-[14px] leading-[1.95] text-black/65">{a}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <footer className="mt-14 border-t border-black/[0.08] pt-6 text-[13px] leading-7 text-black/45">
            この記事は敬語ボタン（iPhone向けAIキーボードアプリ）を開発・運営する
            <a href="https://www.core7-jp.com/" className="font-semibold underline decoration-black/25 underline-offset-2">
              株式会社Core7
            </a>
            が執筆しています。他社サービスに関する記述は{article.updated.replace(/-/g, "/")}
            時点の公開情報にもとづくもので、最新の内容は各社の公式サイトをご確認ください。
          </footer>
        </article>

        {related.length > 0 ? (
          <section className="mt-14">
            <h2 className="font-display text-[19px] font-semibold tracking-tight">関連記事</h2>
            <div className="mt-5 flex flex-col gap-2.5">
              {related.map((item) => (
                <Link
                  key={item!.slug}
                  href={`/blog/${item!.slug}`}
                  className="rounded-[20px] border border-black/10 p-5 transition-colors hover:border-black/30"
                >
                  <span className="block text-[14.5px] font-bold leading-[1.6] text-black">{item!.title}</span>
                  <span className="mt-1.5 block text-[12.5px] leading-6 text-black/50">{item!.description}</span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>

      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <AppCta />
      </div>

      <SiteFooter />
    </div>
  );
}
