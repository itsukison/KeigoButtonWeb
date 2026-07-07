import type { Metadata } from "next";
import { Noto_Sans_JP, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

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
  metadataBase: new URL("https://keigobutton.vercel.app"),
  title: {
    default: "敬語ボタン",
    template: "%s | 敬語ボタン",
  },
  description:
    "敬語ボタンは、送る前に文章を敬語に整える日本語キーボードアプリです。タップした時だけ AI が文面を整え、すべての入力を記録することはありません。",
  openGraph: {
    title: "敬語ボタン",
    description:
      "送る前に、敬語に整える。LINE、メール、DMの文面をその場で自然に。",
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
