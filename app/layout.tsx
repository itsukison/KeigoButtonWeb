import type { Metadata } from "next";
import { Inter, Noto_Sans_JP, Noto_Sans_SC, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { PUBLISHER_NAME, PUBLISHER_URL, SITE_NAME, SITE_URL } from "@/lib/site";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

/**
 * 简体中文 only. 汉字 shared with Japanese have different regional glyph forms, and a
 * Japanese font draws the Japanese ones — legible to a Chinese reader, but visibly
 * the wrong shapes. The variable is applied by a `[lang="zh-Hans"]` rule in
 * `globals.css`, so the Japanese and English pages are unaffected.
 */
const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

// **300 is loaded for the English route only**, where `app/mac-landing.css` shifts the
// whole weight scale one step lighter under `[lang='en']`. It has to be requested here
// or the override silently does nothing: a weight that was never loaded does not fall
// back to the next one down — the browser synthesises it from 400 and draws something
// indistinguishable from 400.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "敬語ボタン｜Mac・iPhoneで文章をその場で整える",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Macでは入力中の場所からそのまま、iPhoneではキーボードから。文章を自然な敬語や目的に合う表現へ書き直せるAI文章作成アプリです。",
  applicationName: SITE_NAME,
  authors: [{ name: PUBLISHER_NAME, url: PUBLISHER_URL }],
  creator: PUBLISHER_NAME,
  publisher: PUBLISHER_NAME,
  keywords: [
    "敬語ボタン",
    "敬語 変換",
    "敬語変換 無料",
    "敬語 チェック",
    "二重敬語",
    "敬語 AI",
    "Mac 敬語",
    "macOS AI 文章作成",
    "AIキーボード",
    "日本語キーボード",
    "メール 敬語",
    "文章 書き直し",
  ],
  // Set GOOGLE_SITE_VERIFICATION in Vercel to use the HTML-tag method instead
  // of the DNS TXT record. Both are accepted; whichever lands first wins.
  verification:
    process.env.GOOGLE_SITE_VERIFICATION || process.env.BING_SITE_VERIFICATION
      ? {
          ...(process.env.GOOGLE_SITE_VERIFICATION
            ? { google: process.env.GOOGLE_SITE_VERIFICATION }
            : {}),
          ...(process.env.BING_SITE_VERIFICATION
            ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } }
            : {}),
        }
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
    title: "敬語ボタン｜Mac・iPhoneで文章をその場で整える",
    description:
      "Macでは入力中の場所から、iPhoneではキーボードから。文章を自然な敬語へ書き直せます。",
    url: "/",
    siteName: "敬語ボタン",
    images: [
      {
        url: "/mac-footer.png",
        alt: "敬語ボタン",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${notoSansSC.variable} ${jakarta.variable} ${inter.variable} h-full`}
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
