import type { Metadata } from "next";
import Link from "next/link";
import { KeigoChecker } from "@/components/KeigoChecker";
import { AppCta, Breadcrumbs, JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { RULES } from "@/content/keigo-rules";
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
  title: "敬語チェック｜二重敬語・誤用を無料で判定（送信なし）",
  description:
    "貼り付けた文章から二重敬語やビジネス敬語の誤用を判定する無料ツール。判定はブラウザ内で完結するため、入力した文章はどこにも送信されません。言い換え候補も表示します。",
  keywords: ["敬語チェック", "二重敬語 チェック", "敬語 添削", "敬語 校正", "二重敬語 一覧", "敬語 誤用"],
  alternates: { canonical: "/keigo-check" },
  openGraph: {
    title: "敬語チェック｜二重敬語・誤用を無料で判定（送信なし）",
    description: "文章を貼るだけで二重敬語と誤用を判定。ブラウザ内で完結し、送信されません。",
    url: "/keigo-check",
    type: "website",
    images: [{ url: "/keyboard.jpg", alt: "敬語ボタンの敬語チェックツール" }],
  },
};

const TRAIL = [
  { name: "ホーム", path: "/" },
  { name: "敬語チェック", path: "/keigo-check" },
];

const FAQ = [
  {
    q: "入力した文章はどこかに送信されますか？",
    a: "送信されません。このチェックは判定ルールをブラウザに読み込んで、あなたの端末の中だけで照合しています。サーバーとの通信は発生しないため、社内資料や取引先とのやり取りをそのまま貼り付けても外部に出ることはありません。",
  },
  {
    q: "どんな誤りを検出できますか？",
    a: `決まった言い回しの誤りを検出します。二重敬語（お読みになられる、ご覧になられる、拝見させていただく等）、敬称の重複（お名前様、各位様）、ビジネスでの誤用（ご苦労様、とんでもございません、よろしかったでしょうか）、表記のゆれなど、現在${RULES.length}種類のルールで判定しています。`,
  },
  {
    q: "検出できない誤りはありますか？",
    a: "あります。「誰がその動作をするか」で正解が変わる誤りは判定できません。たとえば社外の人に自社の上司を尊敬語で言ってしまう身内敬語や、相手の動作に謙譲語を使ってしまう混同は、文章だけでは主体を確定できないため検出対象外です。こうした誤りは、AIによる書き直し（敬語変換ツール）のほうが確実に直せます。",
  },
  {
    q: "「お伺いします」は誤りとして表示されますか？",
    a: "「参考」として表示されます。厳密には二重敬語ですが、文化庁の「敬語の指針」でも習慣として許容される例に挙げられており、ビジネスで使って問題になることはほとんどありません。そのまま使って差し支えない旨も併記しています。",
  },
  {
    q: "「了解しました」は使ってはいけないのですか？",
    a: "誤りではありません。丁寧語として成立しています。ただし敬意の度合いが弱いため、目上の相手には「承知しました」を使うのが一般的な運用です。このツールでは「参考」として、相手による使い分けを案内しています。",
  },
];

export default function KeigoCheckPage() {
  const jsonLd = graph(
    organizationNode,
    websiteNode,
    softwareApplicationNode,
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/keigo-check#tool`,
      name: "敬語チェック（二重敬語・誤用判定）",
      url: `${SITE_URL}/keigo-check`,
      applicationCategory: "BusinessApplication",
      browserRequirements: "JavaScriptが有効なブラウザ",
      operatingSystem: "すべて（ブラウザ）",
      inLanguage: "ja",
      isAccessibleForFree: true,
      description:
        "貼り付けた文章から二重敬語とビジネス敬語の誤用を判定する無料ツール。判定はブラウザ内で完結し、入力した文章は送信されない。",
      offers: { "@type": "Offer", price: 0, priceCurrency: "JPY" },
      featureList: [
        "二重敬語の検出（お読みになられる、拝見させていただく等）",
        "敬称の重複の検出（お名前様、各位様等）",
        "ビジネスでの誤用の検出（ご苦労様、よろしかったでしょうか等）",
        "言い換え候補の提示",
        "入力文をサーバーに送信しないローカル判定",
      ],
      publisher: { "@id": ORG_ID },
      isRelatedTo: { "@id": APP_ID },
    },
    faqNode(FAQ),
    breadcrumbNode(TRAIL),
  );

  const byCategory = ["二重敬語", "誤用", "使い分け", "表記"] as const;

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={jsonLd} />
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-5 pb-8 pt-10 lg:px-8 lg:pt-14">
        <Breadcrumbs trail={TRAIL} />

        <h1 className="mt-5 font-display text-[30px] font-semibold leading-[1.25] tracking-tight lg:text-[44px]">
          敬語チェック
        </h1>
        <p className="mt-4 text-[15px] leading-[1.95] text-black/65 lg:text-base">
          文章を貼り付けると、二重敬語とビジネス敬語の誤用を判定します。判定は
          <strong className="font-bold text-black">ブラウザの中だけ</strong>
          で行われるため、入力した文章はどこにも送信されません。社内資料やお客様とのやり取りもそのまま貼り付けられます。
        </p>

        <div className="mt-8">
          <KeigoChecker />
        </div>

        <section className="mt-16">
          <h2 className="font-display text-[22px] font-semibold leading-[1.4] tracking-tight lg:text-[27px]">
            このツールが検出できること・できないこと
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[20px] border border-black/10 bg-[#F5FBF6] p-5">
              <span className="text-[12px] font-bold text-[#1E7A42]">検出できる</span>
              <ul className="mt-3 flex flex-col gap-2 text-[13.5px] leading-[1.8] text-black/70">
                <li>二重敬語（お読みになられる、ご覧になられる）</li>
                <li>謙譲語の重複（拝見させていただく、頂戴させていただく）</li>
                <li>敬称の重複（お名前様、各位様、様殿）</li>
                <li>ビジネスでの誤用（ご苦労様、とんでもございません）</li>
                <li>接客敬語（よろしかったでしょうか、〜のほうでございます）</li>
                <li>表記のゆれ（すいません、させて頂く）</li>
              </ul>
            </div>
            <div className="rounded-[20px] border border-black/10 bg-[#FDF3F2] p-5">
              <span className="text-[12px] font-bold text-[#C0392B]">検出できない</span>
              <ul className="mt-3 flex flex-col gap-2 text-[13.5px] leading-[1.8] text-black/70">
                <li>身内敬語（社外に自社の上司を尊敬語で言う）</li>
                <li>尊敬語と謙譲語の混同（自分の動作に「いらっしゃる」）</li>
                <li>文脈に対して丁寧すぎる／足りない言い回し</li>
                <li>事実関係や数字の誤り</li>
                <li>文章全体の構成や読みやすさ</li>
              </ul>
            </div>
          </div>
          <p className="mt-5 text-[14px] leading-[1.95] text-black/60">
            検出できない側は、いずれも「誰がその動作をするのか」を判断しないと正解が決まりません。文章だけからは主体を確定できないため、機械的なルールでは扱えない領域です。こちらは
            <Link href="/keigo-henkan" className="font-semibold underline decoration-black/25 underline-offset-2">
              AIによる書き直し
            </Link>
            のほうが確実です。判定の考え方は
            <Link href="/blog/keigo-shurui" className="font-semibold underline decoration-black/25 underline-offset-2">
              尊敬語・謙譲語・丁寧語の違い
            </Link>
            で解説しています。
          </p>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-[22px] font-semibold leading-[1.4] tracking-tight lg:text-[27px]">
            判定ルール一覧（{RULES.length}件）
          </h2>
          <p className="mt-4 text-[15px] leading-[1.95] text-black/65">
            現在チェックしている言い回しの全件です。何を根拠に指摘しているかを確認できるよう公開しています。
          </p>

          {byCategory.map((category) => {
            const rules = RULES.filter((rule) => rule.category === category);
            if (rules.length === 0) return null;
            return (
              <div key={category} className="mt-8">
                <h3 className="font-display text-[16px] font-semibold text-black">
                  {category}（{rules.length}件）
                </h3>
                <div className="mt-3 overflow-x-auto rounded-2xl border border-black/10">
                  <table className="w-full border-collapse text-left text-[13px]">
                    <thead>
                      <tr className="bg-[#F7F6FC]">
                        <th className="whitespace-nowrap px-4 py-2.5 font-bold">検出する表現</th>
                        <th className="px-4 py-2.5 font-bold">言い換え</th>
                        <th className="px-4 py-2.5 font-bold">理由</th>
                      </tr>
                    </thead>
                    <tbody className="text-black/70">
                      {rules.map((rule) => (
                        <tr key={rule.id} className="border-t border-black/[0.08]">
                          <td className="px-4 py-2.5 font-bold text-black">{rule.label}</td>
                          <td className="whitespace-nowrap px-4 py-2.5">{rule.suggest.join(" / ")}</td>
                          <td className="px-4 py-2.5 leading-[1.75]">{rule.why}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
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
          <Link href="/blog/niju-keigo" className="rounded-[20px] border border-black/10 p-5 transition-colors hover:border-black/30">
            <span className="block text-[14px] font-bold text-black">二重敬語とは？例と直し方の一覧</span>
            <span className="mt-1.5 block text-[12.5px] leading-6 text-black/50">
              なぜ誤りとされるのか、慣用として許容される表現との境目まで。
            </span>
          </Link>
          <Link href="/keigo-test" className="rounded-[20px] border border-black/10 p-5 transition-colors hover:border-black/30">
            <span className="block text-[14px] font-bold text-black">敬語テスト20問</span>
            <span className="mt-1.5 block text-[12.5px] leading-6 text-black/50">
              二重敬語・身内敬語を場面つきで出題します。
            </span>
          </Link>
        </div>

        <div className="mt-12">
          <AppCta
            heading="ルールを覚えなくても、送る前に整えられます。"
            body="このチェックは決まった言い回しだけを見ています。敬語ボタンをキーボードに追加すると、LINE・メール・Slackの入力欄で、文章全体をAIが自然な敬語に書き直します。"
          />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
