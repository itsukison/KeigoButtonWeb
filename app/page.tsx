import type { Metadata } from "next";
import MacLanding from "@/components/mac/App";
import {
  faqNode,
  graph,
  macSoftwareApplicationNode,
  organizationNode,
  websiteNode,
} from "@/lib/site";
import "./mac-landing.css";

export const metadata: Metadata = {
  title: { absolute: "敬語ボタン Mac版｜いま書いている場所で、そのまま整える" },
  description:
    "画面下のバーから、いま入力している文章をその場で自然な敬語や目的に合う表現へ。コピーや貼り付け、アプリの切り替えなしで使える敬語ボタン Mac版です。",
  alternates: { canonical: "/" },
  openGraph: {
    title: "敬語ボタン Mac版｜いま書いている場所で、そのまま整える",
    description:
      "画面下のバーから、入力中の文章をその場で自然な敬語へ。コピーや貼り付け、アプリの切り替えなしで使えます。",
    url: "/",
    siteName: "敬語ボタン",
    images: [{ url: "/mac-footer.png", alt: "敬語ボタン Mac版" }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "敬語ボタン Mac版｜いま書いている場所で、そのまま整える",
    description: "入力中の文章を、その場で自然な敬語へ整えるMacアプリ。",
    images: ["/mac-footer.png"],
  },
};

const macFaq = [
  {
    q: "なぜアクセシビリティの許可が必要ですか？",
    a: "入力中の文章を読み取り、書き換えた文章を同じ場所へ戻すために使います。画面の撮影やキー入力の記録は行いません。",
  },
  {
    q: "iPhone版のアプリは必要ですか？",
    a: "必要ありません。Mac版だけでも使えます。同じアカウントでログインすると、iPhone版で作ったボタンをMacでも使えます。",
  },
  {
    q: "対応しているmacOSのバージョンは？",
    a: "macOS 14以降です。",
  },
] as const;

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            graph(organizationNode, websiteNode, macSoftwareApplicationNode, faqNode(macFaq)),
          ).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mac-landing">
        <MacLanding />
      </div>
    </>
  );
}
