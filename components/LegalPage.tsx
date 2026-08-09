import type { ReactNode } from "react";
import Link from "next/link";
import { dict, href, type Lang } from "@/lib/i18n";

type Props = {
  /** Drives the chrome; the prose itself is passed in already translated. */
  lang?: Lang;
  title: string;
  updatedAt: string;
  lead?: string;
  children: ReactNode;
};

export function LegalPage({ lang = "ja", title, updatedAt, lead, children }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader lang={lang} />
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
      <SiteFooter lang={lang} />
    </div>
  );
}

function SiteHeader({ lang }: { lang: Lang }) {
  const t = dict(lang);
  return (
    <header className="border-b border-[var(--border)]">
      <div className="mx-auto max-w-5xl px-6 h-16 flex items-center justify-between">
        <Link href={href(lang, "/")} className="text-[15px] font-semibold tracking-[0.04em]">
          {t.brand}
        </Link>
        <nav className="flex items-center gap-7 text-[13px] text-[var(--muted)]">
          <Link href={href(lang, "/support")} className="hover:text-black transition-colors">
            {t.chrome.support}
          </Link>
          <Link href={href(lang, "/terms")} className="hover:text-black transition-colors">
            {t.chrome.terms}
          </Link>
          <Link href={href(lang, "/privacy")} className="hover:text-black transition-colors">
            {t.chrome.privacy}
          </Link>
          {/* 特商法 is a filing under Japanese commercial law and exists only in
              Japanese — it is a statutory disclosure, not marketing copy. */}
          {lang === "ja" ? (
            <Link href="/legal" className="hover:text-black transition-colors">
              特商法表記
            </Link>
          ) : null}
        </nav>
      </div>
    </header>
  );
}

function SiteFooter({ lang }: { lang: Lang }) {
  const t = dict(lang);
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--border)] mt-24">
      <div className="mx-auto max-w-5xl px-6 py-12 text-[13px] text-[var(--muted)] flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-black font-medium">{t.brand}</span>
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
          <Link href="/legal" className="hover:text-black transition-colors">
            特商法表記
          </Link>
        </nav>
        <div className="text-right">
          <div>© {year} Core7, Inc.</div>
        </div>
      </div>
    </footer>
  );
}
