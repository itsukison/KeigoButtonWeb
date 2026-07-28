import type { Metadata } from "next";
import Link from "next/link";
import { KeigoConverter } from "@/components/KeigoConverter";
import { AppCta, Breadcrumbs, JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { REIBUN } from "@/content/reibun";
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

export const metadata: Metadata = {
  title: "敬語変換ツール｜無料・登録不要でAIが敬語に書き直します",
  description:
    "カジュアルな文章を、AIが自然なビジネス敬語に無料で書き直します。登録不要・そのまま貼り付けるだけ。敬語／メール文／自然な言い方／返信文の4モードに対応し、候補を2つ表示します。",
  keywords: ["敬語変換", "敬語 変換 無料", "敬語に変換", "敬語変換 ツール", "カジュアル 敬語 変換", "敬語 AI"],
  alternates: { canonical: "/keigo-henkan" },
  openGraph: {
    title: "敬語変換ツール｜無料・登録不要でAIが敬語に書き直します",
    description: "文章を貼り付けるだけで、AIが自然なビジネス敬語に。登録不要・無料。",
    url: "/keigo-henkan",
    type: "website",
    images: [{ url: "/keyboard.jpg", alt: "敬語ボタンの敬語変換ツール" }],
  },
};

const TRAIL = [
  { name: "ホーム", path: "/" },
  { name: "敬語変換ツール", path: "/keigo-henkan" },
];

const FAQ = [
  {
    q: "敬語変換は無料で使えますか？",
    a: "無料で使えます。会員登録もログインも不要です。1日5回・1回300文字までを無料枠としています。回数制限なく使いたい場合は、iPhone向けのキーボードアプリ「敬語ボタン」をご利用ください。アプリのAI変換も無料です。",
  },
  {
    q: "入力した文章は保存されますか？",
    a: "変換のためにサーバーへ送信されますが、処理後に本文を保存することはありません。ログには文字数などの統計情報のみを記録しています。機密情報や個人情報を含む文章の入力は避けてください。",
  },
  {
    q: "どんな文章を敬語に変換できますか？",
    a: "上司へのチャット、取引先へのメール、就活の連絡、教授へのメッセージ、アルバイト先への連絡などに使えます。「敬語にする」以外にも、メール本文の形に整える、かたすぎない自然な言い方にする、受け取ったメッセージへの返信を作る、の合計4モードを選べます。",
  },
  {
    q: "ChatGPTで敬語に変換するのと何が違いますか？",
    a: "出力の質は大きく変わりません。違いは操作数です。このツールは指示文（プロンプト）を書く必要がなく、文章を貼って選ぶだけです。相手・媒体・禁止事項といった条件はあらかじめ組み込まれています。ChatGPTで同じ品質を出す場合の指示文は、記事「ChatGPTで敬語に変換する方法とプロンプト例」で公開しています。",
  },
  {
    q: "変換結果はそのまま送っても大丈夫ですか？",
    a: "送信前に必ずご自身で確認してください。AIは意味を保つよう指示されていますが、固有名詞・数字・日付は取り違える可能性があります。特に金額と期日は目視で確認することをおすすめします。",
  },
  {
    q: "スマホでも使えますか？",
    a: "使えます。ただしスマホの場合、ブラウザを開いてコピー＆ペーストする手間が発生します。スマホ中心で使うなら、入力欄からそのまま変換できるキーボードアプリのほうが操作が少なく済みます。",
  },
];

const HOW_TO = {
  "@type": "HowTo",
  name: "文章を敬語に変換する手順",
  description: "敬語変換ツールを使って、カジュアルな文章をビジネス敬語に書き直す手順です。",
  inLanguage: "ja",
  totalTime: "PT1M",
  tool: [{ "@type": "HowToTool", name: "敬語変換ツール（無料・登録不要）" }],
  step: [
    {
      "@type": "HowToStep",
      name: "モードを選ぶ",
      text: "「敬語にする」「メール文にする」「自然な言い方」「返信文を作る」の4つから、目的に合うものを選びます。",
      url: `${SITE_URL}/keigo-henkan#howto`,
    },
    {
      "@type": "HowToStep",
      name: "文章を貼り付ける",
      text: "書き直したい文章を入力欄に貼り付けます。300文字までが無料枠の対象です。",
      url: `${SITE_URL}/keigo-henkan#howto`,
    },
    {
      "@type": "HowToStep",
      name: "変換する",
      text: "「変換する」を押すと、標準ともう一段ていねいな候補が2つ表示されます。",
      url: `${SITE_URL}/keigo-henkan#howto`,
    },
    {
      "@type": "HowToStep",
      name: "確認してコピーする",
      text: "固有名詞・数字・日付が変わっていないかを確認し、「コピー」を押して元のアプリに貼り戻します。",
      url: `${SITE_URL}/keigo-henkan#howto`,
    },
  ],
};

export default function KeigoHenkanPage() {
  const jsonLd = graph(
    organizationNode,
    websiteNode,
    softwareApplicationNode,
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/keigo-henkan#tool`,
      name: "敬語変換ツール",
      url: `${SITE_URL}/keigo-henkan`,
      applicationCategory: "BusinessApplication",
      browserRequirements: "JavaScriptが有効なブラウザ",
      operatingSystem: "すべて（ブラウザ）",
      inLanguage: "ja",
      isAccessibleForFree: true,
      description:
        "カジュアルな日本語の文章を、AIが自然なビジネス敬語に書き直す無料ツール。登録不要。敬語・メール文・自然な言い方・返信文の4モードに対応。",
      offers: { "@type": "Offer", price: 0, priceCurrency: "JPY" },
      featureList: [
        "カジュアルな文章をビジネス敬語に変換",
        "ビジネスメールの本文の形に整形",
        "受け取ったメッセージへの返信文を生成",
        "候補を2つ表示（標準／もう一段ていねい）",
      ],
      publisher: { "@id": ORG_ID },
      isRelatedTo: { "@id": APP_ID },
    },
    HOW_TO,
    faqNode(FAQ),
    breadcrumbNode(TRAIL),
  );

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={jsonLd} />
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-5 pb-8 pt-10 lg:px-8 lg:pt-14">
        <Breadcrumbs trail={TRAIL} />

        <h1 className="mt-5 font-display text-[30px] font-semibold leading-[1.25] tracking-tight lg:text-[44px]">
          敬語変換ツール
        </h1>
        <p className="mt-4 text-[15px] leading-[1.95] text-black/65 lg:text-base">
          カジュアルに書いた文章を、AIが自然なビジネス敬語に書き直します。
          <strong className="font-bold text-black">登録不要・無料</strong>
          で、そのまま貼り付けるだけです。上司へのチャット、取引先へのメール、就活の連絡などにお使いください。
        </p>

        <div className="mt-8" id="tool">
          <KeigoConverter />
        </div>

        {/* Body copy. The tool is above the fold; the text below is what makes
            the page rankable and answers the query for people who did not
            convert. */}
        <section className="mt-16">
          <h2 className="font-display text-[22px] font-semibold leading-[1.4] tracking-tight lg:text-[27px]">
            4つのモードの使い分け
          </h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-black/10">
            <table className="w-full border-collapse text-left text-[13.5px]">
              <thead>
                <tr className="bg-[#F7F6FC]">
                  <th className="whitespace-nowrap px-4 py-3 font-bold">モード</th>
                  <th className="px-4 py-3 font-bold">こんなときに</th>
                  <th className="px-4 py-3 font-bold">出力の形</th>
                </tr>
              </thead>
              <tbody className="text-black/70">
                <tr className="border-t border-black/[0.08]">
                  <td className="px-4 py-3 font-bold text-black">敬語にする</td>
                  <td className="px-4 py-3 leading-[1.8]">書いた下書きが素っ気ない、失礼に見えないか不安</td>
                  <td className="px-4 py-3 leading-[1.8]">同じ長さのまま、丁寧な言い回しに置き換わります</td>
                </tr>
                <tr className="border-t border-black/[0.08]">
                  <td className="px-4 py-3 font-bold text-black">メール文にする</td>
                  <td className="px-4 py-3 leading-[1.8]">箇条書きのメモから、メール本文を作りたい</td>
                  <td className="px-4 py-3 leading-[1.8]">挨拶・本文・結びの構成に整形されます</td>
                </tr>
                <tr className="border-t border-black/[0.08]">
                  <td className="px-4 py-3 font-bold text-black">自然な言い方</td>
                  <td className="px-4 py-3 leading-[1.8]">敬語にすると硬すぎる、同僚や少し年上の相手</td>
                  <td className="px-4 py-3 leading-[1.8]">過剰な敬語を避けた、ちょうどいい丁寧さになります</td>
                </tr>
                <tr className="border-t border-black/[0.08]">
                  <td className="px-4 py-3 font-bold text-black">返信文を作る</td>
                  <td className="px-4 py-3 leading-[1.8]">届いたメッセージに何と返すか思いつかない</td>
                  <td className="px-4 py-3 leading-[1.8]">受け取った文を貼ると、返信の本文が生成されます</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-14" id="howto">
          <h2 className="font-display text-[22px] font-semibold leading-[1.4] tracking-tight lg:text-[27px]">
            使い方
          </h2>
          <ol className="mt-6 flex flex-col gap-3">
            {[
              "目的に合うモードを選びます（初期状態は「敬語にする」）。",
              "書き直したい文章を貼り付けます。300文字までが無料枠の対象です。",
              "「変換する」を押すと、標準ともう一段ていねいな候補が2つ表示されます。",
              "固有名詞・数字・日付が変わっていないか確認し、「コピー」で貼り戻します。",
            ].map((step, index) => (
              <li key={index} className="flex gap-3.5 text-[15px] leading-[1.9] text-black/70">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F1EEFC] text-[12px] font-bold text-[#5B4BA8]">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-6 rounded-[20px] border border-[#C8BCFA]/60 bg-[#F7F6FC] px-5 py-4">
            <span className="text-[12px] font-bold text-[#5B4BA8]">送信前に必ず確認してください</span>
            <p className="mt-1.5 text-[14px] leading-[1.9] text-black/70">
              AIは意味を保つよう指示されていますが、固有名詞・数字・日付を取り違える可能性があります。金額と期日だけは目視で確認することをおすすめします。
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-[22px] font-semibold leading-[1.4] tracking-tight lg:text-[27px]">
            変換の例
          </h2>
          <div className="mt-6 flex flex-col gap-4">
            {/* Every pair here is real output from the endpoint above, not
                copywriting. If you edit one, run it through the tool first —
                a demo the page's own tool contradicts costs more trust than
                a plainer example. */}
            {[
              { before: "明日いけますか", after: "明日ご都合はいかがでしょうか。" },
              { before: "資料の確認お願いします", after: "資料のご確認をお願いいたします。" },
              {
                before: "本日中は無理です。明日やります。",
                after: "本日は対応が難しいです。明日実施いたします。",
              },
              { before: "了解です、あとでやっときます", after: "承知いたしました。後ほど対応いたします。" },
            ].map(({ before, after }) => (
              <div key={before} className="rounded-[20px] border border-black/[0.08] bg-[#FAFAFB] p-4">
                <p className="text-[13.5px] font-semibold leading-[1.8] text-black/45">{before}</p>
                <div className="my-2 text-black/25" aria-hidden="true">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                  </svg>
                </div>
                <p className="text-[14.5px] font-bold leading-[1.8] text-black">{after}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-[22px] font-semibold leading-[1.4] tracking-tight lg:text-[27px]">
            場面別の例文から選ぶ
          </h2>
          <p className="mt-4 text-[15px] leading-[1.95] text-black/65">
            送る内容が決まっていない場合は、場面ごとのそのまま送れる例文も用意しています。
          </p>
          <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {REIBUN.slice(0, 8).map((entry) => (
              <Link
                key={entry.slug}
                href={`/reibun/${entry.slug}`}
                className="rounded-2xl border border-black/10 px-4 py-3.5 text-[14px] font-semibold text-black/75 transition-colors hover:border-black/30 hover:text-black"
              >
                {entry.title}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-[22px] font-semibold leading-[1.4] tracking-tight lg:text-[27px]">
            よくある質問
          </h2>
          <div className="mt-6 flex flex-col divide-y divide-black/[0.08] border-t border-black/[0.08]">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="py-5">
                <h3 className="font-display text-[16px] font-semibold leading-[1.6] text-black">{q}</h3>
                <p className="mt-2.5 text-[14px] leading-[1.95] text-black/65">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-14 grid gap-3 sm:grid-cols-2">
          <Link
            href="/keigo-check"
            className="rounded-[20px] border border-black/10 p-5 transition-colors hover:border-black/30"
          >
            <span className="block text-[14px] font-bold text-black">二重敬語・誤用チェック</span>
            <span className="mt-1.5 block text-[12.5px] leading-6 text-black/50">
              ブラウザ内で判定するため、文章は送信されません。
            </span>
          </Link>
          <Link
            href="/keigo-test"
            className="rounded-[20px] border border-black/10 p-5 transition-colors hover:border-black/30"
          >
            <span className="block text-[14px] font-bold text-black">敬語テスト20問</span>
            <span className="mt-1.5 block text-[12.5px] leading-6 text-black/50">
              尊敬語と謙譲語の使い分けを場面つきで出題します。
            </span>
          </Link>
        </div>

        <div className="mt-12">
          <AppCta />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
