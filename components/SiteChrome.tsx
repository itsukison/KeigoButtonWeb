import Link from "next/link";
import Image from "next/image";
import {
  APP_STORE_URL,
  CONTACT_EMAIL,
  MAC_DOWNLOAD_URL,
  PUBLISHER_NAME,
  PUBLISHER_URL,
} from "@/lib/site";
import { LOCALES, dict, href, type Lang } from "@/lib/i18n";

/**
 * The nav is language-dependent because most of it **only exists in Japanese**.
 * 敬語変換 / 敬語チェック / 敬語テスト / 例文 / 記事 are Japanese-search pages with
 * no English or Chinese counterpart (`lib/i18n.ts`), so an English header linking to
 * them would send an English reader to a Japanese page from a link labelled in
 * English. They are dropped rather than translated-in-label.
 *
 * Everything left is either translated or a link the reader can act on regardless
 * (the App Store, the contact address).
 */
function navFor(lang: Lang) {
  const t = dict(lang);
  if (lang !== "ja") {
    // Only what exists in this language. Grows as pages are translated — and the
    // rule is the same as the sitemap's: add the route first, then the link.
    return [{ href: href(lang, "/"), label: t.chrome.mac }];
  }
  return [
    { href: "/", label: "Mac版" },
    { href: "/iphone", label: "iPhone版" },
    { href: "/keigo-henkan", label: "敬語変換" },
    { href: "/bunsho-kosei-ai", label: "文章校正" },
    { href: "/keigo-check", label: "敬語チェック" },
    { href: "/keigo-test", label: "敬語テスト" },
    { href: "/reibun", label: "場面別 例文" },
    { href: "/blog", label: "記事" },
  ];
}

export function SiteHeader({ lang = "ja" }: { lang?: Lang }) {
  const t = dict(lang);
  const NAV = navFor(lang);
  return (
    <header className="sticky top-0 z-40 border-b border-black/[0.07] bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5 lg:px-8">
        <Link href={href(lang, "/")} className="flex shrink-0 items-center gap-2.5">
          <Image
            src="/brand-icon.png"
            alt=""
            width={256}
            height={256}
            sizes="30px"
            className="h-[30px] w-[30px] object-contain"
          />
          <span className="font-display text-[16px] font-bold tracking-tight">{t.brand}</span>
        </Link>

        <nav className="hidden flex-1 items-center gap-6 text-[13px] font-medium text-black/55 lg:flex">
          {NAV.map(({ href, label }) => (
            <Link key={href} href={href} className="transition-colors hover:text-black">
              {label}
            </Link>
          ))}
        </nav>

        {/* Endonyms, never translated: a switcher that renames the language the
            reader is looking for is the one control they cannot use. */}
        <ul className="ml-auto hidden items-center gap-1 lg:flex" aria-label={t.chrome.language}>
          {LOCALES.map((l) => (
            <li key={l.code}>
              <a
                href={href(l.code as Lang, "/")}
                hrefLang={l.htmlLang}
                aria-current={l.code === lang ? "true" : undefined}
                className={`rounded-full px-2.5 py-1.5 text-[12px] transition-colors ${
                  l.code === lang
                    ? "pointer-events-none font-semibold text-black"
                    : "text-black/45 hover:text-black"
                }`}
              >
                {l.endonym}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={APP_STORE_URL}
          className="ml-auto shrink-0 rounded-full bg-[#18181A] px-4 py-2 text-[12px] font-bold text-white transition-transform active:scale-[0.98] lg:ml-3 lg:px-5 lg:text-[13px]"
        >
          {t.chrome.appStore}
        </a>
      </div>

      {/* Mobile nav: the tool routes are the money pages, so they stay reachable
          without a hamburger. Scrolls horizontally instead of wrapping. */}
      <nav className="flex gap-5 overflow-x-auto border-t border-black/[0.06] px-5 py-2.5 text-[12px] font-semibold text-black/55 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
        {NAV.map(({ href, label }) => (
          <Link key={href} href={href} className="shrink-0 whitespace-nowrap">
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function SiteFooter({ lang = "ja" }: { lang?: Lang }) {
  const t = dict(lang);
  const isJa = lang === "ja";
  return (
    <footer className="mt-24 border-t border-black/10 bg-[#FAFAFB]">
      <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <span className="font-display text-[15px] font-bold">{t.brand}</span>
            <p className="mt-3 max-w-xs text-[13px] leading-7 text-black/50">{t.chrome.tagline}</p>
            <a
              href={APP_STORE_URL}
              className="mt-5 inline-block rounded-xl bg-[#18181A] px-5 py-2.5 text-[13px] font-bold text-white"
            >
              {t.chrome.appStoreLong}
            </a>
          </div>

          {/* Japanese-only by construction — these are the 敬語 search pages. */}
          {isJa ? (
            <div className="text-[13px]">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-black/35">
                {t.chrome.tools}
              </span>
              <ul className="mt-4 flex flex-col gap-2.5 text-black/60">
                <li><Link href="/keigo-henkan" className="hover:text-black">敬語変換（AI）</Link></li>
                <li><Link href="/bunsho-kosei-ai" className="hover:text-black">文章校正・添削（AI）</Link></li>
                <li><Link href="/keigo-check" className="hover:text-black">二重敬語・誤用チェック</Link></li>
                <li><Link href="/keigo-test" className="hover:text-black">敬語テスト20問</Link></li>
                <li><Link href="/reibun" className="hover:text-black">場面別 例文集</Link></li>
                <li><Link href="/blog" className="hover:text-black">記事一覧</Link></li>
              </ul>
            </div>
          ) : null}

          <div className="text-[13px]">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-black/35">
              {t.chrome.company}
            </span>
            <ul className="mt-4 flex flex-col gap-2.5 text-black/60">
              <li><a href={PUBLISHER_URL} className="hover:text-black">{PUBLISHER_NAME}</a></li>
              <li><Link href={href(lang, "/")} className="hover:text-black">{t.chrome.mac}</Link></li>
              {/* `/iphone` and `/legal` are Japanese-only: the iPhone app is a
                  Japanese keyboard and 特商法 is a Japanese statutory filing. The
                  three that are translated are listed in every language. */}
              {isJa ? (
                <li><Link href="/iphone" className="hover:text-black">{t.chrome.mobile}</Link></li>
              ) : null}
              <li><Link href={href(lang, "/support")} className="hover:text-black">{t.chrome.support}</Link></li>
              <li><Link href={href(lang, "/terms")} className="hover:text-black">{t.chrome.terms}</Link></li>
              <li><Link href={href(lang, "/privacy")} className="hover:text-black">{t.chrome.privacy}</Link></li>
              {isJa ? (
                <li><Link href="/legal" className="hover:text-black">{t.chrome.legal}</Link></li>
              ) : null}
              <li><a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-black">{CONTACT_EMAIL}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-black/10 pt-6 text-[12px] text-black/40">
          © {new Date().getFullYear()} Core7, Inc. {t.chrome.copyright}
        </div>
      </div>
    </footer>
  );
}

/**
 * Closing conversion block. Every content and tool page ends on this so the
 * organic-traffic → install path is identical sitewide.
 */
export function AppCta({
  heading = "コピペをやめて、キーボードの中で敬語に。",
  body = "このページのツールはブラウザ用です。敬語ボタンをキーボードに追加すると、LINE・メール・Slackの入力欄からアプリを切り替えずに、同じ書き直しが回数無制限で使えます。",
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <aside className="overflow-hidden rounded-[28px] bg-[#18181A] p-7 text-white lg:p-10">
      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C8BCFA]">
        iPhone・Mac / 無料
      </span>
      <h2 className="mt-3 font-display text-[22px] font-semibold leading-[1.35] lg:text-[28px]">
        {heading}
      </h2>
      <p className="mt-4 max-w-2xl text-[14px] leading-8 text-white/60">{body}</p>
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <a
          href={APP_STORE_URL}
          className="rounded-xl bg-[#C8BCFA] px-6 py-3 text-[14px] font-bold text-black transition-transform active:scale-[0.98]"
        >
          App Storeで無料ダウンロード
        </a>
        <a
          href={MAC_DOWNLOAD_URL}
          className="rounded-xl px-5 py-3 text-[14px] font-semibold text-white/80 ring-1 ring-white/20 transition-colors hover:text-white"
        >
          Mac版をダウンロード
        </a>
        <Link
          href="/support"
          className="rounded-xl px-5 py-3 text-[14px] font-semibold text-white/65 ring-1 ring-white/15 transition-colors hover:text-white"
        >
          キーボードの追加手順
        </Link>
      </div>
    </aside>
  );
}

export function Breadcrumbs({ trail }: { trail: readonly { name: string; path: string }[] }) {
  return (
    <nav aria-label="パンくずリスト" className="flex flex-wrap items-center gap-1.5 text-[12px] text-black/40">
      {trail.map(({ name, path }, index) => (
        <span key={path} className="flex items-center gap-1.5">
          {index > 0 ? <span aria-hidden="true">/</span> : null}
          {index === trail.length - 1 ? (
            <span className="text-black/60">{name}</span>
          ) : (
            <Link href={path} className="hover:text-black">
              {name}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
