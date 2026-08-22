import type { Metadata } from "next";
import Link from "next/link";
import { AppCta, Breadcrumbs, JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { REIBUN } from "@/content/reibun";
import {
  ORG_ID,
  SITE_URL,
  breadcrumbNode,
  faqNode,
  graph,
  organizationNode,
  softwareApplicationNode,
  websiteNode,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "ビジネス敬語の例文集｜場面別にそのまま送れる文面",
  description:
    "休みの連絡、締切の遅れ、催促、日程調整、就活メール、お詫び、断り方、有給申請など、送る前に迷う場面ごとの例文集。上司・取引先それぞれに向けた、そのまま送れる文面を掲載しています。",
  keywords: ["ビジネスメール 例文", "敬語 例文", "上司 連絡 例文", "ビジネス 文面 テンプレート"],
  alternates: { canonical: "/reibun" },
  openGraph: {
    title: "ビジネス敬語の例文集｜場面別にそのまま送れる文面",
    description: "休みの連絡、締切の遅れ、催促、日程調整など、場面別の例文集。",
    url: "/reibun",
    type: "website",
  },
};

const TRAIL = [
  { name: "ホーム", path: "/" },
  { name: "場面別 例文", path: "/reibun" },
];

const FAQ = [
  {
    q: "例文はそのまま送っても問題ありませんか？",
    a: "◯◯や△△の部分をご自身の状況に置き換えれば、そのまま送れる形で書いています。ただし社内の慣習や相手との関係によって適切な丁寧さは変わるため、違和感がある場合は言い回しを調整してください。",
  },
  {
    q: "例文が自分の状況に当てはまらない場合はどうすればいいですか？",
    a: "伝えたい内容を普通の言葉で書いてから、敬語変換ツールに貼り付けるほうが速く済みます。例文を探して当てはめるより、自分の状況をそのまま書いて書き直させるほうが、内容がずれません。",
  },
  {
    q: "ビジネスメールで最も重要なことは何ですか？",
    a: "丁寧な言い回しよりも、必要な情報が入っていることと、それが読みやすい順番で並んでいることです。たとえば遅延の連絡なら、謝罪の言葉の量ではなく、新しい期限が数字で書かれているかどうかで相手の負担が変わります。",
  },
];

export default function ReibunIndexPage() {
  const jsonLd = graph(
    organizationNode,
    websiteNode,
    softwareApplicationNode,
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/reibun`,
      url: `${SITE_URL}/reibun`,
      name: "ビジネス敬語の例文集（場面別）",
      description:
        "休みの連絡、締切の遅れ、催促、日程調整、就活メール、お詫び、断り方、有給申請など、場面ごとのビジネス敬語の例文集。",
      inLanguage: "ja",
      publisher: { "@id": ORG_ID },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: REIBUN.length,
        itemListElement: REIBUN.map((entry, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: entry.title,
          url: `${SITE_URL}/reibun/${entry.slug}`,
        })),
      },
    },
    faqNode(FAQ),
    breadcrumbNode(TRAIL),
  );

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={jsonLd} />
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-5 pb-8 pt-10 lg:px-8 lg:pt-14">
        <Breadcrumbs trail={TRAIL} />

        <h1 className="mt-5 font-display text-[30px] font-semibold leading-[1.25] tracking-tight lg:text-[42px]">
          場面別 例文集
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-[1.95] text-black/65">
          送る前にいちばん迷う場面を{REIBUN.length}
          件そろえました。各ページには「つい送ってしまいがちな文」と、上司・取引先それぞれに向けた
          <strong className="font-bold text-black">そのまま送れる文面</strong>
          を掲載しています。
        </p>

        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {REIBUN.map((entry) => (
            <Link
              key={entry.slug}
              href={`/reibun/${entry.slug}`}
              className="group flex flex-col rounded-[22px] border border-black/10 p-5 transition-colors hover:border-black/30"
            >
              <h2 className="font-display text-[16.5px] font-semibold leading-[1.55] text-black">
                {entry.title}
              </h2>
              <p className="mt-2.5 flex-1 text-[13px] leading-[1.85] text-black/55">{entry.lead}</p>
              <span className="mt-4 text-[12px] font-bold text-black/40 transition-colors group-hover:text-black">
                例文{entry.examples.length}件を見る →
              </span>
            </Link>
          ))}
        </div>

        <section className="mt-16">
          <h2 className="font-display text-[19px] font-semibold tracking-tight lg:text-[22px]">
            例文が当てはまらないとき
          </h2>
          <p className="mt-3 max-w-2xl text-[14.5px] leading-[1.95] text-black/65">
            探して当てはめるより、伝えたい内容を普通の言葉で書いてから敬語に書き直させるほうが速く、内容もずれません。
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { href: "/keigo-henkan", label: "敬語変換", note: "書いた文章をAIが敬語に" },
              { href: "/bunsho-kosei-ai", label: "文章校正AI", note: "誤字脱字と不自然な言い回しを直します" },
              { href: "/bunsho-sakusei-ai", label: "AI文章作成", note: "メモから仕事の文章を作ります" },
              { href: "/keigo-check", label: "敬語チェック", note: "二重敬語・誤用を判定" },
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
            よくある質問
          </h2>
          <div className="mt-5 flex flex-col divide-y divide-black/[0.08] border-t border-black/[0.08]">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="py-5">
                <h3 className="font-display text-[15.5px] font-semibold leading-[1.6] text-black">{q}</h3>
                <p className="mt-2.5 text-[14px] leading-[1.95] text-black/65">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-14">
          <AppCta />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
