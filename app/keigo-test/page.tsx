import type { Metadata } from "next";
import Link from "next/link";
import { KeigoQuiz } from "@/components/KeigoQuiz";
import { AppCta, Breadcrumbs, JsonLd, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { QUIZ } from "@/content/quiz";
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
  title: "敬語テスト20問｜ビジネス敬語力診断（無料・登録不要）",
  description:
    "ビジネスの実際の場面から出題する敬語テスト20問。尊敬語と謙譲語の使い分け、二重敬語、身内敬語を診断し、間違いが多かった分野と全問の解説を表示します。無料・登録不要。",
  keywords: ["敬語テスト", "敬語 診断", "敬語力 チェック", "ビジネスマナー クイズ", "敬語クイズ", "敬語 問題"],
  alternates: { canonical: "/keigo-test" },
  openGraph: {
    title: "敬語テスト20問｜ビジネス敬語力診断（無料・登録不要）",
    description: "実際の場面から出題。尊敬語と謙譲語、二重敬語、身内敬語を20問で診断します。",
    url: "/keigo-test",
    type: "website",
    images: [{ url: "/keyboard.jpg", alt: "敬語テスト20問" }],
  },
};

const TRAIL = [
  { name: "ホーム", path: "/" },
  { name: "敬語テスト", path: "/keigo-test" },
];

const FAQ = [
  {
    q: "敬語テストは無料ですか？会員登録は必要ですか？",
    a: "無料です。会員登録もログインも不要で、このページで20問すべてに回答できます。結果と全問の解説もその場で表示されます。",
  },
  {
    q: "何問正解すれば実務で問題ないレベルですか？",
    a: "20問中14問（70%）以上であれば、業務で困る場面はほとんどありません。18問（90%）以上なら、二重敬語や身内敬語まで判別できているレベルです。10問未満の場合は、尊敬語と謙譲語の切り替えで迷いが出ている可能性が高いため、動作の主体を確認する習慣をつけると安定します。",
  },
  {
    q: "どんな分野から出題されますか？",
    a: "「尊敬語と謙譲語」「二重敬語」「身内敬語」「ビジネス慣用」「メール表現」の5分野です。文法の名称を問うのではなく、取引先へのメールや上司へのチャットといった実際の場面を提示して、どれを送るべきかを選ぶ形式にしています。",
  },
  {
    q: "解説はありますか？",
    a: "あります。20問すべての回答が終わったあと、正解・あなたの回答・なぜそうなるのかの解説を全問分表示します。間違いが多かった分野も集計して表示されます。",
  },
  {
    q: "敬語の正解は文脈によって変わりませんか？",
    a: "変わる場合があります。そのためこのテストでは、各問に「取引先へのメール」「上司へのチャット」といった場面を明示しています。文脈によって複数の答えが許容される項目については、解説の中でその旨を補足しています。",
  },
];

export default function KeigoTestPage() {
  const jsonLd = graph(
    organizationNode,
    websiteNode,
    softwareApplicationNode,
    {
      "@type": "Quiz",
      "@id": `${SITE_URL}/keigo-test#quiz`,
      name: "敬語テスト20問",
      url: `${SITE_URL}/keigo-test`,
      inLanguage: "ja",
      educationalLevel: "ビジネス日本語",
      about: { "@type": "Thing", name: "日本語の敬語（尊敬語・謙譲語・丁寧語）" },
      numberOfQuestions: QUIZ.length,
      isAccessibleForFree: true,
      publisher: { "@id": ORG_ID },
      hasPart: QUIZ.slice(0, 5).map((item) => ({
        "@type": "Question",
        name: `${item.scene}：${item.prompt}`,
        acceptedAnswer: { "@type": "Answer", text: `${item.choices[item.answer]}｜${item.explanation}` },
        suggestedAnswer: item.choices
          .filter((_, i) => i !== item.answer)
          .map((choice) => ({ "@type": "Answer", text: choice })),
      })),
    },
    faqNode(FAQ),
    breadcrumbNode(TRAIL),
    { "@type": "WebPage", "@id": `${SITE_URL}/keigo-test`, isRelatedTo: { "@id": APP_ID } },
  );

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={jsonLd} />
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-5 pb-8 pt-10 lg:px-8 lg:pt-14">
        <Breadcrumbs trail={TRAIL} />

        <h1 className="mt-5 font-display text-[30px] font-semibold leading-[1.25] tracking-tight lg:text-[44px]">
          敬語テスト20問
        </h1>
        <p className="mt-4 text-[15px] leading-[1.95] text-black/65 lg:text-base">
          「取引先へのメール」「上司へのチャット」など、
          <strong className="font-bold text-black">実際の場面から出題</strong>
          します。文法用語は問いません。どれを送るべきかを選ぶだけで、尊敬語と謙譲語の使い分け、二重敬語、身内敬語の理解度が分かります。
        </p>
        <p className="mt-3 text-[13.5px] leading-7 text-black/45">
          全20問・所要3分ほど／無料・登録不要／終了後に全問の解説を表示
        </p>

        <div className="mt-8">
          <KeigoQuiz />
        </div>

        <section className="mt-16">
          <h2 className="font-display text-[22px] font-semibold leading-[1.4] tracking-tight lg:text-[27px]">
            出題する5分野
          </h2>
          <div className="mt-6 flex flex-col gap-4">
            {[
              {
                tag: "尊敬語と謙譲語",
                body:
                  "最も間違いが多い分野です。判断基準はひとつだけで、その動作をするのが相手なら尊敬語、自分なら謙譲語です。「明日御社にいらっしゃいます」が誤りになるのはこの理由です。",
                href: "/blog/keigo-shurui",
                label: "尊敬語・謙譲語・丁寧語の違い",
              },
              {
                tag: "二重敬語",
                body:
                  "ひとつの語に同じ種類の敬語を重ねた形です。「お読みになられる」「拝見させていただく」など、丁寧にしようとするほど起きやすく、本人が気づきにくい誤りです。",
                href: "/blog/niju-keigo",
                label: "二重敬語の例一覧と直し方",
              },
              {
                tag: "身内敬語",
                body:
                  "社外の相手に、自社の上司を尊敬語で言ってしまうパターンです。社外に対して自社の人間は「自分側」なので、「部長が申しておりました」が正しい形になります。",
                href: "/blog/keigo-shurui",
                label: "自社と相手の呼び方",
              },
              {
                tag: "ビジネス慣用",
                body:
                  "「了解しました」「ご苦労様」「させていただく」など、文法上は正しくても相手によって不適切になる表現です。誤りかどうかではなく、相手に応じた選び分けを問います。",
                href: "/reibun",
                label: "場面別の例文集",
              },
              {
                tag: "メール表現",
                body:
                  "依頼・催促・謝罪・断りといった、送る前にいちばん迷う場面です。丁寧さの度合いだけでなく、情報をどの順番で置くかも判断の対象になります。",
                href: "/reibun",
                label: "場面別の例文集",
              },
            ].map(({ tag, body, href, label }) => (
              <div key={tag} className="rounded-[20px] border border-black/10 p-5">
                <span className="rounded-full bg-[#F1EEFC] px-2.5 py-1 text-[11.5px] font-bold text-[#5B4BA8]">
                  {tag}
                </span>
                <p className="mt-3 text-[14px] leading-[1.9] text-black/70">{body}</p>
                <Link
                  href={href}
                  className="mt-3 inline-block text-[13px] font-bold text-black underline decoration-black/25 underline-offset-2"
                >
                  {label} →
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-[22px] font-semibold leading-[1.4] tracking-tight lg:text-[27px]">
            点数の目安
          </h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-black/10">
            <table className="w-full border-collapse text-left text-[13.5px]">
              <thead>
                <tr className="bg-[#F7F6FC]">
                  <th className="whitespace-nowrap px-4 py-3 font-bold">正解数</th>
                  <th className="whitespace-nowrap px-4 py-3 font-bold">判定</th>
                  <th className="px-4 py-3 font-bold">目安</th>
                </tr>
              </thead>
              <tbody className="text-black/70">
                <tr className="border-t border-black/[0.08]">
                  <td className="px-4 py-3 font-bold text-black">18〜20問</td>
                  <td className="px-4 py-3">敬語マスター</td>
                  <td className="px-4 py-3 leading-[1.8]">二重敬語や身内敬語まで判別できています</td>
                </tr>
                <tr className="border-t border-black/[0.08]">
                  <td className="px-4 py-3 font-bold text-black">14〜17問</td>
                  <td className="px-4 py-3">実務レベル</td>
                  <td className="px-4 py-3 leading-[1.8]">業務で困る場面は少ないはずです</td>
                </tr>
                <tr className="border-t border-black/[0.08]">
                  <td className="px-4 py-3 font-bold text-black">10〜13問</td>
                  <td className="px-4 py-3">あと一歩</td>
                  <td className="px-4 py-3 leading-[1.8]">尊敬語と謙譲語の切り替えで迷いが出ています</td>
                </tr>
                <tr className="border-t border-black/[0.08]">
                  <td className="px-4 py-3 font-bold text-black">9問以下</td>
                  <td className="px-4 py-3">要注意</td>
                  <td className="px-4 py-3 leading-[1.8]">目上の相手に違和感を持たれる可能性があります</td>
                </tr>
              </tbody>
            </table>
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

        <div className="mt-12">
          <AppCta
            heading="覚えるより、送る前に整えるほうが速い。"
            body="敬語の一覧を暗記する必要はありません。敬語ボタンをキーボードに追加すると、LINE・メール・Slackの入力欄でボタンを押すだけで、書いた文章をAIが自然な敬語に書き直します。"
          />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
