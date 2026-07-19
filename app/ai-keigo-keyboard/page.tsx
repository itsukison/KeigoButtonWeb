import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const APP_STORE_URL =
  "https://apps.apple.com/jp/app/%E6%95%AC%E8%AA%9E%E3%83%9C%E3%82%BF%E3%83%B3-ai%E3%82%AD%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%89/id6777901723";

export const metadata: Metadata = {
  title: "敬語に直せるAIキーボードとは",
  description:
    "文章を敬語に書き直せるAIキーボード「敬語ボタン」の仕組み、使える場面、ChatGPTへコピペする方法との違い、プライバシーについて解説します。",
  alternates: { canonical: "/ai-keigo-keyboard" },
  openGraph: {
    title: "敬語に直せるAIキーボードとは｜敬語ボタン",
    description: "入力中のアプリを離れず、文章を自然な敬語へ書き直す方法。",
    url: "/ai-keigo-keyboard",
    type: "article",
    images: [{ url: "/keyboard.jpg", alt: "敬語ボタンを表示したiPhoneキーボード" }],
  },
};

const faq = [
  [
    "敬語ボタンはどのアプリで使えますか？",
    "iPhoneでキーボードを切り替えられる文字入力欄なら、LINE、メール、Slack、X、メモ、ブラウザなどで利用できます。アプリ側の仕様によりカスタムキーボードが使えない入力欄は除きます。",
  ],
  [
    "敬語以外にも書き直せますか？",
    "はい。メール文、お詫び、依頼、要約、翻訳、言い換えなど、場面に合わせた変換メニューを選べます。よく使う変換メニューは自分向けに設定できます。",
  ],
  [
    "文章は勝手に送信されますか？",
    "いいえ。AI機能を使うためにユーザーがボタンをタップしたときだけ、その時点の対象文章を処理します。通常の打鍵を常時送信・保存する仕組みではありません。",
  ],
];

export default function AiKeigoKeyboardPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "敬語に直せるAIキーボードとは",
    description:
      "文章を敬語に書き直せるAIキーボードの使い方と、敬語ボタンの特徴を解説します。",
    inLanguage: "ja",
    datePublished: "2026-07-19",
    dateModified: "2026-07-19",
    mainEntityOfPage: "https://keigobutton.vercel.app/ai-keigo-keyboard",
    author: {
      "@type": "Organization",
      "@id": "https://www.core7-jp.com/#organization",
      name: "株式会社Core7",
      url: "https://www.core7-jp.com/",
    },
    about: { "@id": "https://keigobutton.vercel.app/#app" },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <main className="min-h-screen bg-white text-[#18181A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />

      <header className="border-b border-black/10">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="font-display font-bold">敬語ボタン</Link>
          <Link href="/support" className="text-sm text-black/55">使い方</Link>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7D68D8]">
          AI keyboard guide
        </p>
        <h1 className="mt-4 font-display text-[38px] font-semibold leading-tight tracking-tight lg:text-[56px]">
          敬語に直せる
          <br />
          AIキーボードとは
        </h1>
        <p className="mt-7 text-base leading-8 text-black/60 lg:text-lg">
          AIキーボードは、文字を入力している場所から離れずにAIの文章支援を使えるキーボードです。「敬語ボタン」は、日本語の文章を自然な敬語、メール文、お詫び、依頼などへ書き直すことに重点を置いたiPhone向けアプリです。
        </p>

        <div className="relative my-12 aspect-[16/10] overflow-hidden rounded-[28px] bg-[#EEEAFD]">
          <Image
            src="/keyboard.jpg"
            alt="文章を敬語に書き直す敬語ボタンのAIキーボード"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>

        <div className="legal-prose text-[15px] lg:text-base">
          <h2>できること</h2>
          <p>
            たとえば「明日いけますか」と入力したあとに敬語の変換ボタンをタップすると、「明日ご都合いかがでしょうか」のような候補を表示します。入力中のアプリを切り替えず、候補を確認してそのまま文章を置き換えられます。
          </p>
          <p>
            就職活動の連絡、アルバイト先への返信、教授へのメール、上司へのSlack、取引先へのメッセージなど、内容は決まっていても適切な丁寧さに迷う場面で使えます。
          </p>

          <h2>ChatGPTへコピー＆ペーストする方法との違い</h2>
          <p>
            一般的なAIチャットでも敬語への書き直しはできます。一方、敬語ボタンはキーボードとして動くため、文章をコピーし、AIチャットを開き、指示を書き、結果をコピーして元のアプリへ戻る操作が要りません。短いやりとりの流れを止めずに使えることが違いです。
          </p>

          <h2>通常入力とAI処理</h2>
          <p>
            ふだんの日本語入力と変換は端末内で処理されます。AIへ送られるのは、ユーザーが書き直し機能を使うために明示的にボタンをタップした対象文章だけです。詳しい取扱いは
            <Link href="/privacy" className="link-underline">プライバシーポリシー</Link>
            で確認できます。
          </p>

          <h2>よくある質問</h2>
          {faq.map(([question, answer]) => (
            <section key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </section>
          ))}
        </div>

        <div className="mt-16 rounded-[28px] bg-[#18181A] p-8 text-white lg:p-10">
          <h2 className="font-display text-2xl font-semibold">送る前に、その一文を敬語に。</h2>
          <p className="mt-3 text-sm leading-7 text-white/60">
            敬語ボタンはApp Storeから無料でダウンロードできます。
          </p>
          <a
            href={APP_STORE_URL}
            className="mt-7 inline-block rounded-xl bg-[#C8BCFA] px-6 py-3 text-sm font-bold text-black"
          >
            App Storeで見る
          </a>
        </div>

        <p className="mt-10 text-sm text-black/45">
          開発・運営：<a href="https://www.core7-jp.com/" className="link-underline">株式会社Core7</a>
        </p>
      </article>
    </main>
  );
}
