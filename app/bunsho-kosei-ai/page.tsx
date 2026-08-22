import type { Metadata } from "next";
import Link from "next/link";
import { KeigoConverter } from "@/components/KeigoConverter";
import { AppCta, Breadcrumbs, JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
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

/**
 * `/bunsho-kosei-ai` — the 文章校正 / 文章添削 AI tool.
 *
 * **Why this page exists.** Until 2026-08-22 every Japanese page on this site was
 * about 敬語, the wedge. Measured, the wedge's sibling cluster is the one with real
 * category volume: 「文章校正 ai」4,400/月 KD 10, 「文章添削 ai」1,000/月 KD 18,
 * 「文章添削 ai 無料」1,000/月 KD 1, plus a low-difficulty commercial tail. The
 * category the old plan named — 「AI文章作成」 — is fiction generation in Japanese
 * (AIのべりすと 135,000/月), and web-side 「AIキーボード」 barely exists (260/月).
 * Full measurement in seo-geo.md §前提の修正（2026-08-22）.
 *
 * **Why it is a separate page and not a mode on `/keigo-henkan`.** Different query,
 * different promise. 敬語変換 raises the register; 校正 must not. The `kosei` mode in
 * `web-rewrite` overrides the shared second-candidate instruction for exactly that
 * reason, and a visitor searching 文章校正 who lands on a 敬語 page bounces.
 *
 * **The examples below are real endpoint output** (verified 2026-08-22 against
 * production `web-rewrite` v7, mode `kosei`). If you edit one, run it through the
 * tool first — a demo the page's own tool contradicts costs more trust than a
 * plainer example.
 */
export const metadata: Metadata = {
  title: "文章校正AI｜無料・登録不要で誤字脱字と不自然な日本語を直します",
  description:
    "書いた日本語をAIが校正・添削します。誤字脱字、変換ミス、文法の誤り、不自然な言い回しを直し、丁寧さのレベルは変えません。登録不要・無料。指摘の一覧ではなく、直した文をそのまま返します。",
  keywords: [
    "文章校正 ai",
    "文章校正 ai 無料",
    "文章添削 ai",
    "文章添削 ai 無料",
    "文章校正 アプリ",
    "文章添削アプリ 無料",
    "誤字脱字 チェック",
    "文章 言い換え ai",
  ],
  alternates: { canonical: "/bunsho-kosei-ai" },
  openGraph: {
    title: "文章校正AI｜無料・登録不要で誤字脱字と不自然な日本語を直します",
    description: "文章を貼り付けるだけで、AIが誤字脱字と不自然な言い回しを直します。登録不要・無料。",
    url: "/bunsho-kosei-ai",
    type: "website",
    images: [{ url: "/keyboard.jpg", alt: "敬語ボタンの文章校正AI" }],
  },
};

const TRAIL = [
  { name: "ホーム", path: "/" },
  { name: "文章校正AI", path: "/bunsho-kosei-ai" },
];

const FAQ = [
  {
    q: "文章校正AIは無料で使えますか？",
    a: "無料で使えます。会員登録もログインも不要です。1日5回・1回300文字までを無料枠としています。回数制限なく使いたい場合は、iPhoneのキーボードアプリまたはMac版をご利用ください。どちらもダウンロードは無料です。",
  },
  {
    q: "校正と添削と敬語変換は何が違いますか？",
    a: "このページの「校正する」は、誤字脱字・変換ミス・文法の誤り・不自然な言い回しを直しますが、文体と丁寧さのレベルは変えません。敬語に直したい場合は敬語変換ツールを使ってください。添削のように読みやすさまで整えたい場合は、候補2（読みやすく整えた版）を選んでください。",
  },
  {
    q: "誤りを指摘するのではなく、直した文が返ってくるのですか？",
    a: "直した文が返ってきます。候補は2つ表示され、1つ目は誤りだけを直した最小限の修正、2つ目は語順や助詞まで整えた読みやすい版です。どこが変わったかは元の文と見比べて確認してください。",
  },
  {
    q: "どんな誤りを直せますか？",
    a: "「お世話になって降ります」のような変換ミス、「確認させて頂きたい事が有ります」のような過剰な漢字表記、「大丈夫でしようか」のような打ち間違い、助詞の誤りや二重表現などです。AIによる書き直しなので、ルールベースの校正ツールのような網羅性の保証はありません。重要な文書は最後に必ずご自身で読み直してください。",
  },
  {
    q: "入力した文章は保存されますか？",
    a: "校正のためにサーバーへ送信されますが、処理後に本文を保存することはありません。ログには文字数などの統計情報のみを記録しています。機密情報や個人情報を含む文章の入力は避けてください。",
  },
  {
    q: "毎日たくさん校正したい場合はどうすればいいですか？",
    a: "Web版は1日5回までです。Macで仕事をしている場合はMac版が向いています。Mail・Slack・Gmail・Notionなど、いま書いている入力欄のまま校正でき、ブラウザを開いてコピー＆ペーストする必要がありません。iPhone中心ならキーボードアプリをお使いください。",
  },
];

const HOW_TO = {
  "@type": "HowTo",
  name: "AIで文章を校正する手順",
  description: "文章校正AIを使って、誤字脱字や不自然な言い回しを直す手順です。",
  inLanguage: "ja",
  totalTime: "PT1M",
  tool: [{ "@type": "HowToTool", name: "文章校正AI（無料・登録不要）" }],
  step: [
    {
      "@type": "HowToStep",
      name: "「校正する」を選ぶ",
      text: "初期状態は「校正する」です。丁寧さまで変えたい場合は「自然な言い方」または「敬語にする」を選びます。",
      url: `${SITE_URL}/bunsho-kosei-ai#howto`,
    },
    {
      "@type": "HowToStep",
      name: "文章を貼り付ける",
      text: "校正したい文章を入力欄に貼り付けます。300文字までが無料枠の対象です。",
      url: `${SITE_URL}/bunsho-kosei-ai#howto`,
    },
    {
      "@type": "HowToStep",
      name: "校正する",
      text: "「変換する」を押すと、最小限の修正版と、読みやすく整えた版の2つが表示されます。",
      url: `${SITE_URL}/bunsho-kosei-ai#howto`,
    },
    {
      "@type": "HowToStep",
      name: "元の文と見比べる",
      text: "固有名詞・数字・日付が変わっていないかを確認し、「コピー」を押して元のアプリに貼り戻します。",
      url: `${SITE_URL}/bunsho-kosei-ai#howto`,
    },
  ],
};

/** Verified against production `web-rewrite` v7 (mode `kosei`) on 2026-08-22. */
const EXAMPLES = [
  {
    before: "お世話になって降ります。先日いただいた資料に付いて、確認させて頂きたい事が有ります。",
    after: "お世話になっております。先日いただいた資料について、確認させていただきたいことがあります。",
    note: "「降ります」「に付いて」「事が有ります」を修正",
  },
  {
    before: "明日の打ち合わせは14時からで大丈夫でしようか。資料は当日までに準備してをきます。",
    after: "明日の打ち合わせは14時からで大丈夫でしょうか。資料は当日までに準備します。",
    note: "打ち間違い「でしようか」「してをきます」を修正",
  },
  {
    before: "先程の件、上司に確認した所、問題ないとの事でしたので、この方向で進めさせて頂きます。",
    after: "先程の件、上司に確認したところ、問題ないとのことでしたので、この方向で進めさせていただきます。",
    note: "形式名詞「所」「事」「頂きます」をひらく",
  },
];

export default function BunshoKoseiAiPage() {
  const jsonLd = graph(
    organizationNode,
    websiteNode,
    softwareApplicationNode,
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/bunsho-kosei-ai#tool`,
      name: "文章校正AI",
      url: `${SITE_URL}/bunsho-kosei-ai`,
      applicationCategory: "BusinessApplication",
      browserRequirements: "JavaScriptが有効なブラウザ",
      operatingSystem: "すべて（ブラウザ）",
      inLanguage: "ja",
      isAccessibleForFree: true,
      description:
        "書いた日本語の誤字脱字・変換ミス・文法の誤り・不自然な言い回しをAIが直す無料ツール。登録不要。文体と丁寧さのレベルは変えず、直した文を2つ返します。",
      offers: { "@type": "Offer", price: 0, priceCurrency: "JPY" },
      featureList: [
        "誤字脱字・変換ミスの修正",
        "文法の誤り・不自然な言い回しの修正",
        "丁寧さのレベルを変えない校正",
        "候補を2つ表示（最小限の修正／読みやすく整えた版）",
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
          文章校正AI
        </h1>
        <p className="mt-4 text-[15px] leading-[1.95] text-black/65 lg:text-base">
          書いた日本語の誤字脱字・変換ミス・文法の誤り・不自然な言い回しを、AIが直します。
          <strong className="font-bold text-black">登録不要・無料</strong>
          で、貼り付けるだけです。指摘の一覧ではなく、直した文がそのまま返ります。丁寧さのレベルは変えません。
        </p>

        <div className="mt-8" id="tool">
          <KeigoConverter initialMode="kosei" modes={["kosei", "natural", "keigo"]} />
        </div>

        {/* Body copy. The tool is above the fold; the text below is what makes the
            page rankable and answers the query for people who did not convert. */}
        <section className="mt-16">
          <h2 className="font-display text-[22px] font-semibold leading-[1.4] tracking-tight lg:text-[27px]">
            校正・自然な言い方・敬語の使い分け
          </h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-black/10">
            <table className="w-full border-collapse text-left text-[13.5px]">
              <thead>
                <tr className="bg-[#F7F6FC]">
                  <th className="whitespace-nowrap px-4 py-3 font-bold">モード</th>
                  <th className="px-4 py-3 font-bold">こんなときに</th>
                  <th className="px-4 py-3 font-bold">丁寧さ</th>
                </tr>
              </thead>
              <tbody className="text-black/70">
                <tr className="border-t border-black/[0.08]">
                  <td className="px-4 py-3 font-bold text-black">校正する</td>
                  <td className="px-4 py-3 leading-[1.8]">誤字脱字や打ち間違いが不安。文の調子は変えたくない</td>
                  <td className="px-4 py-3 leading-[1.8]">変えません</td>
                </tr>
                <tr className="border-t border-black/[0.08]">
                  <td className="px-4 py-3 font-bold text-black">自然な言い方</td>
                  <td className="px-4 py-3 leading-[1.8]">直訳調・かたい漢語が多く、読みにくい</td>
                  <td className="px-4 py-3 leading-[1.8]">ちょうどいい丁寧さに寄せます</td>
                </tr>
                <tr className="border-t border-black/[0.08]">
                  <td className="px-4 py-3 font-bold text-black">敬語にする</td>
                  <td className="px-4 py-3 leading-[1.8]">上司や取引先に送るので、失礼に見えないか不安</td>
                  <td className="px-4 py-3 leading-[1.8]">上げます</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[14px] leading-[1.95] text-black/60">
            敬語だけを直したい場合は
            <Link href="/keigo-henkan" className="font-semibold underline decoration-black/25 underline-offset-2">
              敬語変換ツール
            </Link>
            、二重敬語や誤用の判定だけをしたい場合は
            <Link href="/keigo-check" className="font-semibold underline decoration-black/25 underline-offset-2">
              敬語チェック
            </Link>
            のほうが向いています。敬語チェックはブラウザ内で判定するため、文章は送信されません。
          </p>
        </section>

        <section className="mt-14" id="howto">
          <h2 className="font-display text-[22px] font-semibold leading-[1.4] tracking-tight lg:text-[27px]">
            使い方
          </h2>
          <ol className="mt-6 flex flex-col gap-3">
            {[
              "「校正する」を選びます（初期状態です）。",
              "校正したい文章を貼り付けます。300文字までが無料枠の対象です。",
              "「変換する」を押すと、最小限の修正版と、読みやすく整えた版の2つが表示されます。",
              "元の文と見比べ、固有名詞・数字・日付が変わっていないか確認してから「コピー」で貼り戻します。",
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
            <span className="text-[12px] font-bold text-[#5B4BA8]">網羅性の保証はありません</span>
            <p className="mt-1.5 text-[14px] leading-[1.9] text-black/70">
              これはルールベースの校正ソフトではなく、AIによる書き直しです。すべての誤りを必ず検出するわけではありません。契約書や公開文書など、間違えられない文章は最後にご自身で読み直してください。
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-[22px] font-semibold leading-[1.4] tracking-tight lg:text-[27px]">
            校正の例
          </h2>
          <p className="mt-4 text-[14px] leading-[1.95] text-black/60">
            下の3件は、このページのツールが実際に返した出力です（2026-08-22 確認）。
          </p>
          <div className="mt-6 flex flex-col gap-4">
            {EXAMPLES.map(({ before, after, note }) => (
              <div key={before} className="rounded-[20px] border border-black/[0.08] bg-[#FAFAFB] p-4">
                <p className="text-[13.5px] font-semibold leading-[1.8] text-black/45">{before}</p>
                <div className="my-2 text-black/25" aria-hidden="true">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                  </svg>
                </div>
                <p className="text-[14.5px] font-bold leading-[1.8] text-black">{after}</p>
                <p className="mt-2 text-[12px] leading-6 text-black/45">{note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-[22px] font-semibold leading-[1.4] tracking-tight lg:text-[27px]">
            指摘型の校正ツールとの違い
          </h2>
          <p className="mt-4 text-[15px] leading-[1.95] text-black/65">
            日本語の校正ツールには、誤りの箇所を一覧で指摘するものと、直した文を返すものがあります。前者は「どこが」「なぜ」誤りかを学べる一方、直す作業は自分で行います。このページは後者です。直した文をそのままコピーして戻せますが、変更点は元の文と見比べて確認する必要があります。
          </p>
          <p className="mt-4 text-[15px] leading-[1.95] text-black/65">
            ChatGPTなどのチャット型AIでも同じことはできます。違いは操作数です。ここでは指示文を書く必要がなく、貼って押すだけです。ただし1日5回・300文字までという制限があります。1日に何十回も校正するなら、ブラウザではなく入力欄の中で完結するほうが速くなります。
          </p>
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

        <div className="mt-14 grid gap-3 sm:grid-cols-3">
          <Link
            href="/keigo-henkan"
            className="rounded-[20px] border border-black/10 p-5 transition-colors hover:border-black/30"
          >
            <span className="block text-[14px] font-bold text-black">敬語変換（AI）</span>
            <span className="mt-1.5 block text-[12.5px] leading-6 text-black/50">
              丁寧さのレベルを上げたいときはこちら。
            </span>
          </Link>
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
            href="/reibun"
            className="rounded-[20px] border border-black/10 p-5 transition-colors hover:border-black/30"
          >
            <span className="block text-[14px] font-bold text-black">場面別 例文集</span>
            <span className="mt-1.5 block text-[12.5px] leading-6 text-black/50">
              そのまま送れる例文から選べます。
            </span>
          </Link>
        </div>

        <div className="mt-12">
          <AppCta
            heading="校正のたびにブラウザを開くのをやめる。"
            body="このページのツールはブラウザ用です。Mac版を入れると、Mail・Slack・Gmail・Notionなど、いま書いている入力欄のまま同じ校正ができます。iPhoneならキーボードに追加すれば、LINEやメールの入力欄からそのまま使えます。どちらも回数制限はありません。"
          />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
