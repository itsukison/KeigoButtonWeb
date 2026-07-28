import type { Metadata } from "next";
import Link from "next/link";
import { AppCta, Breadcrumbs, JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ARTICLES, type Article } from "@/content/articles";
import {
  ORG_ID,
  SITE_URL,
  breadcrumbNode,
  graph,
  organizationNode,
  softwareApplicationNode,
  websiteNode,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "記事一覧｜敬語変換ツールの比較と敬語の知識",
  description:
    "敬語変換ツール・AIキーボードの比較、ChatGPTで敬語に変換するプロンプト、二重敬語や尊敬語・謙譲語の使い分けなど、敬語ボタン運営による記事の一覧です。",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "記事一覧｜敬語ボタン",
    description: "敬語変換ツールの比較と、敬語の使い分けに関する記事。",
    url: "/blog",
    type: "website",
  },
};

const TRAIL = [
  { name: "ホーム", path: "/" },
  { name: "記事", path: "/blog" },
];

const CATEGORIES: Article["category"][] = ["比較・選び方", "使い方", "敬語の知識"];

export default function BlogIndexPage() {
  const jsonLd = graph(
    organizationNode,
    websiteNode,
    softwareApplicationNode,
    {
      "@type": "Blog",
      "@id": `${SITE_URL}/blog#blog`,
      url: `${SITE_URL}/blog`,
      name: "敬語ボタン 記事",
      description:
        "敬語変換ツール・AIキーボードの比較と、ビジネス敬語の使い分けに関する記事。",
      inLanguage: "ja",
      publisher: { "@id": ORG_ID },
      blogPost: ARTICLES.map((article) => ({
        "@type": "BlogPosting",
        "@id": `${SITE_URL}/blog/${article.slug}#article`,
        headline: article.metaTitle,
        url: `${SITE_URL}/blog/${article.slug}`,
        datePublished: article.published,
        dateModified: article.updated,
        description: article.description,
        author: { "@id": ORG_ID },
      })),
    },
    breadcrumbNode(TRAIL),
  );

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={jsonLd} />
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-5 pb-8 pt-10 lg:px-8 lg:pt-14">
        <Breadcrumbs trail={TRAIL} />

        <h1 className="mt-5 font-display text-[30px] font-semibold leading-[1.25] tracking-tight lg:text-[42px]">
          記事一覧
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-[1.95] text-black/65">
          敬語変換ツールやAIキーボードの比較、ChatGPTで敬語に変換するときのプロンプト、二重敬語や尊敬語・謙譲語の使い分けなどをまとめています。
        </p>

        {CATEGORIES.map((category) => {
          const items = ARTICLES.filter((article) => article.category === category);
          if (items.length === 0) return null;
          return (
            <section key={category} className="mt-14">
              <h2 className="font-display text-[19px] font-semibold tracking-tight lg:text-[22px]">
                {category}
              </h2>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {items.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="group flex flex-col rounded-[22px] border border-black/10 p-5 transition-colors hover:border-black/30"
                  >
                    <div className="flex items-center gap-2.5 text-[11.5px] text-black/40">
                      <span>約{article.minutes}分</span>
                      <span aria-hidden="true">·</span>
                      <time dateTime={article.updated}>{article.updated.replace(/-/g, "/")}</time>
                    </div>
                    <h3 className="mt-2.5 font-display text-[16.5px] font-semibold leading-[1.55] text-black">
                      {article.title}
                    </h3>
                    <p className="mt-2.5 flex-1 text-[13px] leading-[1.85] text-black/55">{article.lead}</p>
                    <span className="mt-4 text-[12.5px] font-bold text-black/45 transition-colors group-hover:text-black">
                      読む →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        <section className="mt-16">
          <h2 className="font-display text-[19px] font-semibold tracking-tight lg:text-[22px]">
            無料ツール
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              { href: "/keigo-henkan", label: "敬語変換", note: "AIが文章を敬語に書き直します" },
              { href: "/keigo-check", label: "敬語チェック", note: "二重敬語・誤用を判定（送信なし）" },
              { href: "/keigo-test", label: "敬語テスト", note: "20問で敬語力を診断" },
            ].map(({ href, label, note }) => (
              <Link
                key={href}
                href={href}
                className="rounded-[20px] bg-[#18181A] p-5 text-white transition-transform active:scale-[0.99]"
              >
                <span className="block text-[14.5px] font-bold">{label}</span>
                <span className="mt-1.5 block text-[12px] leading-6 text-white/55">{note}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-[19px] font-semibold tracking-tight lg:text-[22px]">
            場面別の例文集
          </h2>
          <p className="mt-3 text-[14px] leading-[1.9] text-black/60">
            休みの連絡、締切の遅れ、催促、日程調整など、そのまま送れる文面を場面ごとにまとめています。
          </p>
          <Link
            href="/reibun"
            className="mt-4 inline-block rounded-xl border border-black/15 px-5 py-2.5 text-[13.5px] font-bold text-black transition-colors hover:bg-black hover:text-white"
          >
            例文集を見る
          </Link>
        </section>

        <div className="mt-14">
          <AppCta />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
