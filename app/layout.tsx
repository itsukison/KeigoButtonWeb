import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
      className={`${notoSansJP.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-white text-[var(--foreground)]">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

function SiteHeader() {
  return (
    <header className="border-b border-[var(--border)]">
      <div className="mx-auto max-w-5xl px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-[15px] font-semibold tracking-[0.04em]"
        >
          敬語ボタン
        </Link>
        <nav className="flex items-center gap-7 text-[13px] text-[var(--muted)]">
          <Link href="/support" className="hover:text-black transition-colors">
            サポート
          </Link>
          <Link href="/terms" className="hover:text-black transition-colors">
            利用規約
          </Link>
          <Link href="/privacy" className="hover:text-black transition-colors">
            プライバシー
          </Link>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--border)] mt-24">
      <div className="mx-auto max-w-5xl px-6 py-12 text-[13px] text-[var(--muted)] flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-black font-medium">敬語ボタン</span>
          <span>株式会社Core7</span>
        </div>
        <nav className="flex gap-7">
          <Link href="/support" className="hover:text-black transition-colors">
            サポート
          </Link>
          <Link href="/terms" className="hover:text-black transition-colors">
            利用規約
          </Link>
          <Link href="/privacy" className="hover:text-black transition-colors">
            プライバシー
          </Link>
        </nav>
        <div className="text-right">
          <div>© {year} Core7, Inc.</div>
        </div>
      </div>
    </footer>
  );
}
