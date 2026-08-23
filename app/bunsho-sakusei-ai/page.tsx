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
 * `/bunsho-sakusei-ai` — free 文章作成 tool: notes in, work-ready Japanese out.
 *
 * **Why this page exists, and why the morning's verdict was reversed.** On
 * 2026-08-22 this document's own §前提の修正 concluded that 「AI文章作成」 is a
 * fiction-generation category in Japanese, because the related keywords for the broad
 * term are dominated by AIのべりすと (135,000/月) and 小説自動生成. That is true of the
 * broad term and false of the 「無料」 variants. The SERP for `ai 文章作成 無料`
 * (checked 2026-08-22) contains **no fiction sites**: it is business-writing
 * comparison roundups (fungry / C-NAPS, AI ONE, sitelead, genai-ai, cad-kenkyujo),
 * LeapMe's free tool page at /ja/app/text-generator, and an App Store listing. The
 * cluster is ~5,400/month across `ai 文章作成 無料` (2,400), `〜無料 おすすめ` (880),
 * `〜無料 登録なし` (720), `ai文章作成アプリ 無料` (590), `〜無料サイト` (480) and
 * `ai文章作成サイト` (320), all at KD 0–2.
 *
 * **The honesty constraint that shapes the whole page.** This product edits text; it
 * does not write essays from nothing. What it genuinely does is the `mail` mode:
 * rough notes or bullets become the body of a work message. So the promise here is
 * 「メモ → 仕事の文章」 and the page says plainly what it cannot do. A page that
 * implied general long-form generation would be contradicted by its own tool in one
 * click, which costs more than the traffic is worth (§設計方針 7, 11).
 *
 * **The 作成例 section is real endpoint output** (verified 2026-08-23 against
 * production `web-rewrite` v7, mode `mail`, first candidate of each pair). If you edit
 * one, run it through the tool first — a demo the page's own tool contradicts costs
 * more trust than a plainer example.
 */
export const metadata: Metadata = {
  title: "AI文章作成｜無料・登録不要でメモから仕事の文章を作ります",
  description:
    "箇条書きのメモを、そのまま送れる仕事の文章にします。依頼・催促・お詫び・日程調整・報告などのメール本文とチャット連絡文に対応。登録不要・無料。記事や小説を書くツールではありません。",
  keywords: [
    "ai 文章作成 無料",
    "ai文章作成 無料 登録なし",
    "ai文章作成アプリ 無料",
    "ai 文章作成 サイト",
    "文章作成 ai 無料",
    "メモ 文章 作成 ai",
    "ビジネス文章 作成 ai",
  ],
  alternates: { canonical: "/bunsho-sakusei-ai" },
  openGraph: {
    title: "AI文章作成｜無料・登録不要でメモから仕事の文章を作ります",
    description: "箇条書きのメモを、そのまま送れる仕事の文章に。登録不要・無料。",
    url: "/bunsho-sakusei-ai",
    type: "website",
    images: [{ url: "/keyboard.jpg", alt: "敬語ボタンのAI文章作成ツール" }],
  },
};

const TRAIL = [
  { name: "ホーム", path: "/" },
  { name: "AI文章作成", path: "/bunsho-sakusei-ai" },
];

const FAQ = [
  {
    q: "AI文章作成は無料で使えますか？",
    a: "無料で使えます。会員登録もログインも不要です。1日5回・1回300文字までを無料枠としています。回数制限なく使いたい場合は、iPhoneのキーボードアプリまたはMac版をご利用ください。どちらもダウンロードは無料です。",
  },
  {
    q: "ゼロから記事やブログを書けますか？",
    a: "書けません。このツールは、あなたが書いたメモや箇条書きを仕事の文章に整えるものです。テーマだけを渡して長文を生成する用途には向いていません。記事やブログの下書きが目的なら、ChatGPTやGeminiなどの汎用AIのほうが適しています。",
  },
  {
    q: "どんな文章を作れますか？",
    a: "依頼、催促、お詫び、日程調整、欠勤や遅刻の連絡、簡単な報告など、仕事で毎日送る短い文章です。メールの本文（宛名なし・結びまで）と、チャットにそのまま貼れる連絡文の両方に対応します。",
  },
  {
    q: "数字や日付は正しく入りますか？",
    a: "あなたがメモに書いた数字・日付・固有名詞はそのまま使うよう指示していますが、書いていない情報をAIが補うことはありません。逆に、書いた情報が取り違えられる可能性はゼロではないので、金額と期日だけは送信前に目視で確認してください。",
  },
  {
    q: "ChatGPTと比べて何が違いますか？",
    a: "出力の自由度ではChatGPTのほうが上です。違いは操作数で、こちらは指示文（プロンプト）を書く必要がなく、メモを貼ってモードを選ぶだけです。そのぶん1日5回・300文字までという制限があります。1日に何十回も書くなら、ブラウザではなく入力欄の中で完結するアプリのほうが速くなります。",
  },
  {
    q: "入力した内容は保存されますか？",
    a: "文章を作るためにサーバーへ送信されますが、処理後に本文を保存することはありません。ログには文字数などの統計情報のみを記録しています。機密情報や個人情報を含む内容の入力は避けてください。",
  },
];

const HOW_TO = {
  "@type": "HowTo",
  name: "メモから仕事の文章をAIで作る手順",
  description: "箇条書きのメモを、そのまま送れるビジネス文章に変える手順です。",
  inLanguage: "ja",
  totalTime: "PT1M",
  tool: [{ "@type": "HowToTool", name: "AI文章作成ツール（無料・登録不要）" }],
  step: [
    {
      "@type": "HowToStep",
      name: "伝えたいことをメモで書く",
      text: "完成した文章ではなく、要点だけを書きます。「見積もりの返事がまだ来ていない」「金曜までに欲しい」のような箇条書きで十分です。",
      url: `${SITE_URL}/bunsho-sakusei-ai#howto`,
    },
    {
      "@type": "HowToStep",
      name: "形を選ぶ",
      text: "メールの本文にするなら「メール文にする」、チャットの連絡文なら「自然な言い方」、社外向けに固めるなら「敬語にする」を選びます。",
      url: `${SITE_URL}/bunsho-sakusei-ai#howto`,
    },
    {
      "@type": "HowToStep",
      name: "候補を見比べて選ぶ",
      text: "標準ともう一段ていねいな候補が2つ表示されます。近いほうを選び、数字と期日を確認してからコピーします。",
      url: `${SITE_URL}/bunsho-sakusei-ai#howto`,
    },
  ],
};

/**
 * Verified against production `web-rewrite` v7 (mode `mail`) on 2026-08-23. Each
 * `after` is the first of the two returned candidates — the straightforward one.
 */
const EXAMPLES = [
  {
    label: "催促",
    before: "先週送った見積もりの返事がまだ来ていない。今週金曜までに返事がほしい。",
    after:
      "お世話になっております。先週送付した見積もりのご返答がまだいただいておりません。今週金曜日までにご回答いただけますと助かります。何卒よろしくお願い申し上げます。",
  },
  {
    label: "日程調整",
    before: "来週の打ち合わせ、火曜の午後か水曜の午前が空いている。1時間ほど。オンラインで。",
    after:
      "お世話になっております。来週の打ち合わせですが、火曜日の午後または水曜日の午前が空いております。所要時間は約1時間で、オンラインにて実施したいと考えております。ご都合のほどご確認いただけますと幸いです。",
  },
  {
    label: "遅延のお詫び",
    before: "資料の提出が明日までに間に合わない。金曜まで待ってほしい。理由は先方の確認待ち。",
    after:
      "お世話になっております。資料の提出が明日までに間に合わないため、金曜までお待ちいただけますでしょうか。理由は先方の確認待ちです。ご迷惑をおかけしますが、何卒よろしくお願いいたします。",
  },
  {
    label: "依頼",
    before: "新しいロゴのデータをもらいたい。SVGとPNGの両方。今月末までに使いたい。",
    after:
      "お世話になっております。新しいロゴのデータをSVGとPNGの両方でご提供いただけますでしょうか。今月末までに使用したいので、よろしくお願いいたします。",
  },
];

export default function BunshoSakuseiAiPage() {
  const jsonLd = graph(
    organizationNode,
    websiteNode,
    softwareApplicationNode,
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/bunsho-sakusei-ai#tool`,
      name: "AI文章作成ツール",
      url: `${SITE_URL}/bunsho-sakusei-ai`,
      applicationCategory: "BusinessApplication",
      browserRequirements: "JavaScriptが有効なブラウザ",
      operatingSystem: "すべて（ブラウザ）",
      inLanguage: "ja",
      isAccessibleForFree: true,
      description:
        "箇条書きのメモを、そのまま送れる仕事の文章に変える無料ツール。登録不要。依頼・催促・お詫び・日程調整・報告などのメール本文とチャット連絡文に対応。記事や小説の生成には対応しない。",
      offers: { "@type": "Offer", price: 0, priceCurrency: "JPY" },
      featureList: [
        "箇条書きのメモからビジネスメールの本文を作成",
        "チャットにそのまま貼れる連絡文を作成",
        "社外向けに敬語のレベルを上げる",
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
          AI文章作成
        </h1>
        <p className="mt-4 text-[15px] leading-[1.95] text-black/65 lg:text-base">
          伝えたいことをメモで書けば、AIがそのまま送れる仕事の文章に整えます。
          <strong className="font-bold text-black">登録不要・無料</strong>
          。依頼・催促・お詫び・日程調整・報告など、毎日書く短い文章が対象です。
          記事や小説をゼロから書くツールではありません。
        </p>

        <div className="mt-8" id="tool">
          <KeigoConverter
            initialMode="mail"
            modes={["mail", "natural", "keigo"]}
            inputLabel="伝えたいことをメモで書いてください（箇条書きでも構いません）"
          />
        </div>

        {/* Body copy. The tool is above the fold; the text below is what makes the
            page rankable and answers the query for people who did not convert. The
            boundary section comes first on purpose — the query 「AI文章作成」 carries
            an expectation of long-form generation that this tool does not meet, and
            saying so early is cheaper than a bounce from the tool itself. */}
        <section className="mt-16">
          <h2 className="font-display text-[22px] font-semibold leading-[1.4] tracking-tight lg:text-[27px]">
            作れるもの、作れないもの
          </h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-black/10">
            <table className="w-full border-collapse text-left text-[13.5px]">
              <thead>
                <tr className="bg-[#F7F6FC]">
                  <th className="whitespace-nowrap px-4 py-3 font-bold">向いている</th>
                  <th className="px-4 py-3 font-bold">向いていない</th>
                </tr>
              </thead>
              <tbody className="text-black/70">
                <tr className="border-t border-black/[0.08]">
                  <td className="px-4 py-3 leading-[1.8]">
                    依頼・催促・お詫び・日程調整・欠勤や遅刻の連絡・簡単な報告
                  </td>
                  <td className="px-4 py-3 leading-[1.8]">記事・ブログ・小説・レポートなどの長文</td>
                </tr>
                <tr className="border-t border-black/[0.08]">
                  <td className="px-4 py-3 leading-[1.8]">メールの本文（宛名なし・結びまで）</td>
                  <td className="px-4 py-3 leading-[1.8]">調べものが必要な文章（事実は補いません）</td>
                </tr>
                <tr className="border-t border-black/[0.08]">
                  <td className="px-4 py-3 leading-[1.8]">チャットにそのまま貼れる連絡文</td>
                  <td className="px-4 py-3 leading-[1.8]">テーマだけを渡して展開させる使い方</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[14px] leading-[1.95] text-black/60">
            長文の構成をAIと相談しながら作りたい場合は、ChatGPTやGeminiなどの汎用AIのほうが適しています。ここは
            <strong className="font-bold text-black">「毎日書く短い文章を、指示文なしで終わらせる」</strong>
            ことに絞ったツールです。
          </p>
        </section>

        <section className="mt-14" id="howto">
          <h2 className="font-display text-[22px] font-semibold leading-[1.4] tracking-tight lg:text-[27px]">
            使い方
          </h2>
          <ol className="mt-6 flex flex-col gap-3">
            {[
              "伝えたいことを、完成した文章ではなくメモで書きます（箇条書きで構いません）。",
              "形を選びます。メール本文なら「メール文にする」、チャットなら「自然な言い方」、社外向けに固めるなら「敬語にする」。",
              "「変換する」を押すと、標準ともう一段ていねいな候補が2つ表示されます。",
              "数字・日付・固有名詞を確認し、「コピー」で元のアプリに貼り戻します。",
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
            <span className="text-[12px] font-bold text-[#5B4BA8]">書いていないことは補いません</span>
            <p className="mt-1.5 text-[14px] leading-[1.9] text-black/70">
              AIは、メモに無い日付・金額・約束を勝手に足さないよう指示されています。そのため「いつまでに」「いくら」が必要な連絡は、メモの段階で書いてください。書いた内容が取り違えられる可能性はゼロではないので、金額と期日だけは送信前に目視で確認することをおすすめします。
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-[22px] font-semibold leading-[1.4] tracking-tight lg:text-[27px]">
            作成例
          </h2>
          <p className="mt-4 text-[14px] leading-[1.95] text-black/60">
            下の4件は、このページのツールが実際に返した出力です（2026-08-23 確認）。
            上がメモ、下が「メール文にする」の候補1です。
          </p>
          <div className="mt-6 flex flex-col gap-4">
            {EXAMPLES.map(({ label, before, after }) => (
              <div key={before} className="rounded-[20px] border border-black/[0.08] bg-[#FAFAFB] p-4">
                <span className="text-[11px] font-bold text-[#5B4BA8]">{label}</span>
                <p className="mt-2 text-[13.5px] font-semibold leading-[1.8] text-black/45">{before}</p>
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
                <p className="text-[14.5px] font-bold leading-[1.85] text-black">{after}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[13.5px] leading-[1.9] text-black/55">
            どの例も、メモに書いていない日付・金額・約束は増えていません。「金曜まで」「今月末までに」はメモに書いたから残っています。
          </p>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-[22px] font-semibold leading-[1.4] tracking-tight lg:text-[27px]">
            他の無料AI文章作成ツールとの違い
          </h2>
          <p className="mt-4 text-[15px] leading-[1.95] text-black/65">
            無料で使えるAI文章作成ツールは多く、汎用のチャットAIを含めれば選択肢はさらに広がります。何でも書けるという意味では、ChatGPTやGeminiに勝てません。このツールの違いは範囲を狭めたことにあります。
            <strong className="font-bold text-black">指示文を書かない</strong>、
            <strong className="font-bold text-black">モードを選ぶだけ</strong>、
            <strong className="font-bold text-black">出力は候補2つ</strong>
            。毎日同じ種類の連絡を書く人にとっては、この3点のほうが自由度より効きます。
          </p>
          <p className="mt-4 text-[15px] leading-[1.95] text-black/65">
            制限は正直に書きます。1日5回・1回300文字まで、ブラウザでのコピー＆ペーストが前提です。すでに書いた文章の誤字や不自然さを直したいだけなら
            <Link href="/bunsho-kosei-ai" className="font-semibold underline decoration-black/25 underline-offset-2">
              文章校正AI
            </Link>
            、丁寧さのレベルだけを上げたいなら
            <Link href="/keigo-henkan" className="font-semibold underline decoration-black/25 underline-offset-2">
              敬語変換ツール
            </Link>
            のほうが目的に合います。
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
            href="/bunsho-kosei-ai"
            className="rounded-[20px] border border-black/10 p-5 transition-colors hover:border-black/30"
          >
            <span className="block text-[14px] font-bold text-black">文章校正AI</span>
            <span className="mt-1.5 block text-[12.5px] leading-6 text-black/50">
              すでに書いた文章の誤字と不自然さを直します。
            </span>
          </Link>
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
            href="/reibun"
            className="rounded-[20px] border border-black/10 p-5 transition-colors hover:border-black/30"
          >
            <span className="block text-[14px] font-bold text-black">場面別 例文集</span>
            <span className="mt-1.5 block text-[12.5px] leading-6 text-black/50">
              メモを書くのも面倒なときは、例文から選べます。
            </span>
          </Link>
        </div>

        <div className="mt-12">
          <AppCta
            heading="メモを書いた場所で、そのまま文章にする。"
            body="このページのツールはブラウザ用です。Mac版を入れると、Mail・Slack・Gmail・Notionなど、いま書いている入力欄のままメモを文章に変えられます。iPhoneならキーボードに追加すれば、LINEやメールの入力欄からそのまま使えます。どちらも回数制限はありません。"
          />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
