import type { Metadata } from "next";
import { Noto_Sans_JP, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { PUBLISHER_NAME, PUBLISHER_URL, SITE_NAME, SITE_URL } from "@/lib/site";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "敬語ボタン｜敬語に直せるAIキーボード",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "敬語ボタンは、LINE・メール・DMの文章をキーボード上で自然な敬語に書き直せるiPhone向けAIキーボードアプリです。アプリを切り替えず、タップした文章だけをAIで整えます。無料の敬語変換ツール・敬語チェック・敬語テストも公開しています。",
  applicationName: SITE_NAME,
  authors: [{ name: PUBLISHER_NAME, url: PUBLISHER_URL }],
  creator: PUBLISHER_NAME,
  publisher: PUBLISHER_NAME,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "敬語ボタン",
    "敬語 変換",
    "敬語変換 無料",
    "敬語 チェック",
    "二重敬語",
    "敬語 AI",
    "AIキーボード",
    "日本語キーボード",
    "メール 敬語",
    "文章 書き直し",
  ],
  // Set GOOGLE_SITE_VERIFICATION in Vercel to use the HTML-tag method instead
  // of the DNS TXT record. Both are accepted; whichever lands first wins.
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "敬語ボタン｜敬語に直せるAIキーボード",
    description:
      "LINE・メール・DMの文章を、キーボード上で自然な敬語へ。アプリを切り替えずに使えるiPhone向けAIキーボード。",
    url: "/",
    siteName: "敬語ボタン",
    images: [
      {
        url: "/home.png",
        alt: "敬語ボタンのアプリ画面",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "敬語ボタン｜敬語に直せるAIキーボード",
    description: "文章をキーボード上で自然な敬語へ。iPhone向けAIキーボードアプリ。",
    images: ["/home.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${jakarta.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-white text-[var(--foreground)]">
        {/* Hide scroll-reveal elements before paint so they don't flash in
            fully-rendered, then animate. Skipped for reduced-motion / no-JS. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('anim')}}catch(e){}",
          }}
        />
        {children}
      </body>
    </html>
  );
}
