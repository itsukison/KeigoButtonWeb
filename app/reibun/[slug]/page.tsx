import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppCta, Breadcrumbs, JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { REIBUN, reibunBySlug } from "@/content/reibun";
import { CopyableExample } from "@/components/CopyableExample";
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
  return REIBUN.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const entry = reibunBySlug(slug);
  if (!entry) return {};

  return {
    title: entry.metaTitle,
    description: entry.description,
    keywords: [entry.keyword, ...entry.alsoRanks],
    alternates: { canonical: `/reibun/${entry.slug}` },
    openGraph: {
      title: entry.metaTitle,
      description: entry.description,
      url: `/reibun/${entry.slug}`,
      type: "article",
      modifiedTime: entry.updated,
      images: [{ url: "/keyboard.jpg", alt: entry.title }],
    },
  };
}

export default async function ReibunPage({ params }: Params) {
  const { slug } = await params;
  const entry = reibunBySlug(slug);
  if (!entry) notFound();

  const trail = [
    { name: "ホーム", path: "/" },
    { name: "場面別 例文", path: "/reibun" },
    { name: entry.title, path: `/reibun/${entry.slug}` },
  ];
  const related = entry.related.map(reibunBySlug).filter(Boolean);

  const jsonLd = graph(
    organizationNode,
    websiteNode,
    softwareApplicationNode,
    {
      "@type": "Article",
      "@id": `${SITE_URL}/reibun/${entry.slug}#article`,
      headline: entry.metaTitle,
      alternativeHeadline: entry.title,
      description: entry.description,
      inLanguage: "ja",
      datePublished: entry.updated,
      dateModified: entry.updated,
      keywords: [entry.keyword, ...entry.alsoRanks].join(", "),
      articleSection: "場面別 例文",
      mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/reibun/${entry.slug}` },
      author: { "@id": ORG_ID },
      publisher: { "@id": ORG_ID },
      about: { "@id": APP_ID },
    },
    faqNode(entry.faq),
    breadcrumbNode(trail),
  );

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={jsonLd} />
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-5 pb-8 pt-10 lg:px-8 lg:pt-14">
        <Breadcrumbs trail={trail} />

        <article className="mt-5">
          <span className="text-[12px] font-bold text-[#5B4BA8]">場面別 例文</span>
          <h1 className="mt-3 font-display text-[28px] font-semibold leading-[1.3] tracking-tight lg:text-[40px]">
            {entry.title}
          </h1>
          <p className="mt-5 text-[15px] leading-[1.95] text-black/65 lg:text-base">{entry.lead}</p>

          {/* NG examples first: this is what the reader was about to send, and
              recognising it is what makes them read the rest. */}
          <section className="mt-12">
            <h2 className="font-display text-[22px] font-semibold leading-[1.4] tracking-tight lg:text-[27px]">
              つい送ってしまいがちな文
            </h2>
            <div className="mt-6 flex flex-col gap-4">
              {entry.ng.map(({ text, why }) => (
                <div key={text} className="rounded-[20px] border border-[#C0392B]/20 bg-[#FDF3F2] p-5">
                  <p className="text-[14.5px] font-bold leading-[1.8] text-black">「{text}」</p>
                  <p className="mt-2.5 text-[13.5px] leading-[1.9] text-black/60">{why}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14">
            <h2 className="font-display text-[22px] font-semibold leading-[1.4] tracking-tight lg:text-[27px]">
              そのまま送れる例文
            </h2>
            <p className="mt-4 text-[14px] leading-[1.9] text-black/55">
              ◯◯・△△の部分をご自身の状況に置き換えてお使いください。コピーボタンで全文をコピーできます。
            </p>
            <div className="mt-6 flex flex-col gap-5">
              {entry.examples.map((example) => (
                <CopyableExample key={example.to} to={example.to} body={example.body} note={example.note} />
              ))}
            </div>
          </section>

          <section className="mt-14">
            <h2 className="font-display text-[22px] font-semibold leading-[1.4] tracking-tight lg:text-[27px]">
              押さえておくポイント
            </h2>
            <ul className="mt-6 flex flex-col gap-3">
              {entry.points.map((point) => (
                <li key={point} className="flex gap-3 text-[15px] leading-[1.9] text-black/70">
                  <span aria-hidden="true" className="mt-[11px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#C8BCFA]" />
                  <span
                    dangerouslySetInnerHTML={{
                      __html: point.replace(
                        /\*\*([^*]+)\*\*/g,
                        '<strong class="font-bold text-black">$1</strong>',
                      ),
                    }}
                  />
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-14">
            <h2 className="font-display text-[22px] font-semibold leading-[1.4] tracking-tight lg:text-[27px]">
              自分の状況に合わせて書き直す
            </h2>
            <p className="mt-4 text-[15px] leading-[1.95] text-black/65">
              例文がそのまま当てはまらない場合は、伝えたい内容を普通の言葉で書いてから、AIに敬語へ書き直させるほうが速いです。
            </p>
            <Link
              href="/keigo-henkan"
              className="mt-5 flex items-center justify-between gap-4 rounded-[20px] border border-black/10 bg-white px-5 py-4 transition-colors hover:border-black/25"
            >
              <span>
                <span className="block text-[14px] font-bold text-black">敬語変換ツール（無料・登録不要）</span>
                <span className="mt-1 block text-[12.5px] leading-6 text-black/45">
                  書いた文章を貼るだけ。候補を2つ表示します。
                </span>
              </span>
              <span aria-hidden="true" className="shrink-0 text-black/30">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </section>

          <section className="mt-14">
            <h2 className="font-display text-[22px] font-semibold leading-[1.4] tracking-tight lg:text-[27px]">
              よくある質問
            </h2>
            <div className="mt-6 flex flex-col divide-y divide-black/[0.08] border-t border-black/[0.08]">
              {entry.faq.map(({ q, a }) => (
                <div key={q} className="py-5">
                  <h3 className="font-display text-[16px] font-semibold leading-[1.6] text-black">{q}</h3>
                  <p className="mt-2.5 text-[14px] leading-[1.95] text-black/65">{a}</p>
                </div>
              ))}
            </div>
          </section>

          <footer className="mt-14 border-t border-black/[0.08] pt-6 text-[13px] leading-7 text-black/45">
            最終更新：<time dateTime={entry.updated}>{entry.updated.replace(/-/g, "/")}</time>／
            この例文集は敬語ボタン（iPhone向けAIキーボードアプリ）を開発・運営する
            <a href="https://www.core7-jp.com/" className="font-semibold underline decoration-black/25 underline-offset-2">
              株式会社Core7
            </a>
            が作成しています。文面は一般的な例であり、社内規定や相手との関係に応じて調整してください。
          </footer>
        </article>

        {related.length > 0 ? (
          <section className="mt-14">
            <h2 className="font-display text-[19px] font-semibold tracking-tight">関連する場面</h2>
            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item!.slug}
                  href={`/reibun/${item!.slug}`}
                  className="rounded-2xl border border-black/10 px-4 py-3.5 text-[14px] font-semibold text-black/75 transition-colors hover:border-black/30 hover:text-black"
                >
                  {item!.title}
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
