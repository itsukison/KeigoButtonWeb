import type { ReactNode } from "react";
import Link from "next/link";

type Props = {
  title: string;
  updatedAt: string;
  lead?: string;
  children: ReactNode;
};

export function LegalPage({ title, updatedAt, lead, children }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        <article className="mx-auto max-w-[var(--max-content)] px-6 py-20 md:py-28">
          <header className="mb-16">
            <p className="text-[12px] tracking-[0.18em] text-[var(--muted)] uppercase mb-4">
              {updatedAt}
            </p>
            <h1 className="text-[32px] md:text-[40px] font-semibold tracking-tight leading-tight">
              {title}
            </h1>
            {lead ? (
              <p className="mt-6 text-[15px] text-[var(--muted)] leading-[1.9]">
                {lead}
              </p>
            ) : null}
          </header>
          <div className="legal-prose text-[15px]">{children}</div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="border-b border-[var(--border)]">
      <div className="mx-auto max-w-5xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-[15px] font-semibold tracking-[0.04em]">
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
          <a
            href="https://www.core7-jp.com/"
            className="hover:text-black transition-colors"
          >
            運営会社
          </a>
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
