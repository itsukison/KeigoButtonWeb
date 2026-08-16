import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "敬語ボタン iPhone版｜敬語に直せるAIキーボード" },
  description:
    "LINE・メール・DMの文章をキーボード上で書き直せるiPhone向けAIキーボードアプリ。敬語・メール文・要約・翻訳・返信に加え、よく使う直し方は自分のボタンとして登録できます。アプリを切り替えず、タップした文章だけをAIで整えます。",
  alternates: { canonical: "/iphone" },
  openGraph: {
    title: "敬語ボタン iPhone版｜敬語に直せるAIキーボード",
    description: "文章をキーボード上で自然な敬語へ。iPhone向けAIキーボードアプリ。",
    url: "/iphone",
    images: [{ url: "/home.png", alt: "敬語ボタン iPhone版のアプリ画面" }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "敬語ボタン iPhone版｜敬語に直せるAIキーボード",
    description: "文章をキーボード上で自然な敬語へ。iPhone向けAIキーボードアプリ。",
    images: ["/home.png"],
  },
};

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return children;
}
