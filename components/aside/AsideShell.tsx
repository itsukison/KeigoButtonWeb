"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { APP_STORE_URL, MAC_DOWNLOAD_URL } from "@/lib/site";
import { dict, href, LOCALES, type Lang } from "@/lib/i18n";
import { MacI18nProvider } from "@/components/mac/i18n";
import DownloadModal from "@/components/mac/components/DownloadModal.jsx";
import Footer from "@/components/mac/components/Footer.jsx";
import "@/app/mac-landing.css";
import "@/app/aside.css";

const COPY = {
  ja: { resources: "文章ツール", features: "できること", pricing: "料金", download: "Mac版をダウンロード", menu: "メニュー" },
  en: { resources: "Writing tools", features: "Features", pricing: "Pricing", download: "Download for Mac", menu: "Menu" },
  zh: { resources: "常见问题", features: "功能", pricing: "价格", download: "下载 Mac 版", menu: "菜单" },
};

/** Server-rendered page bodies remain children, not imports into this client shell. */
export function AsideShell({
  children,
  lang = "ja",
  variant = "reading",
}: {
  children: ReactNode;
  lang?: Lang;
  variant?: "reading" | "tools" | "status";
}) {
  const t = dict(lang),
    c = COPY[lang];
  const [modal, setModal] = useState(false);
  const [phone, setPhone] = useState(false);
  const downloadUrl =
    process.env.NEXT_PUBLIC_MAC_DOWNLOAD_URL || MAC_DOWNLOAD_URL;
  useEffect(() => {
    setPhone(
      /iPhone|iPad|iPod|Android/.test(navigator.userAgent) ||
        (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1),
    );
  }, []);
  const openDownload = useCallback(() => {
    if (downloadUrl) window.location.assign(downloadUrl);
    setModal(true);
  }, [downloadUrl]);
  const closeDownload = useCallback(() => setModal(false), []);
  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const anchor = (event.target as Element).closest<HTMLAnchorElement>(
      "a[href]",
    );
    if (!anchor || anchor.target === "_blank") return;
    const url = anchor.getAttribute("href");
    if (url === MAC_DOWNLOAD_URL || url === downloadUrl) {
      event.preventDefault();
      openDownload();
    }
  };
  const primaryLinks = [
    [`${href(lang, "/")}#features`, c.features],
    [`${href(lang, "/")}#pricing`, c.pricing],
    [lang === "ja" ? "/keigo-henkan" : lang === "en" ? "/en/rewrite" : "/zh#faq", c.resources],
  ];
  const action = phone ? (
    <a className="aside-button" href={APP_STORE_URL}>
      {t.chrome.appStore}
    </a>
  ) : (
    <button className="aside-button" onClick={openDownload}>
      {c.download}
      <span aria-hidden="true">↗</span>
    </button>
  );
  return (
    <MacI18nProvider lang={lang}>
      <div
        id="top"
        className={`aside-site aside-site--${variant}`}
        onClick={onClick}
      >
        <a className="aside-skip" href="#aside-main">
          {lang === "ja"
            ? "本文へ"
            : lang === "zh"
              ? "跳至正文"
              : "Skip to content"}
        </a>
        <header className="aside-nav" onKeyDown={(event) => {
          if (event.key === "Escape") {
            const menu = event.currentTarget.querySelector("details[open]");
            if (menu) { menu.removeAttribute("open"); menu.querySelector("summary")?.focus(); }
          }
        }} onClick={(event) => {
          if ((event.target as Element).closest("a")) event.currentTarget.querySelector("details[open]")?.removeAttribute("open");
        }}>
          <div className="aside-nav__inner">
            <Link className="aside-brand" href={href(lang, "/")}>
              <img src="/icons/aside/icon.png" alt="" width="36" height="36" />
              {t.brand}
            </Link>
            <nav className="aside-nav__links" aria-label={c.menu}>
              {primaryLinks.map(([url, label]) => <Link key={url} href={url}>{label}</Link>)}
            </nav>
            <div className="aside-nav__actions">
              <details className="aside-menu">
                <summary>
                  <span className="aside-desktop-label">{LOCALES.find((l) => l.code === lang)?.endonym}</span>
                  <span className="aside-mobile-label">{c.menu}</span>
                  <span aria-hidden="true">⌄</span>
                </summary>
                <ul>
                  {primaryLinks.map(([url, label]) => <li key={url} className="aside-mobile-label"><Link href={url}>{label}</Link></li>)}
                  <li className="aside-mobile-label aside-menu__label">{t.chrome.language}</li>
                  {LOCALES.map((l) => (
                    <li key={l.code}>
                      <a
                        href={href(l.code as Lang, "/")}
                        hrefLang={l.htmlLang}
                        aria-current={l.code === lang ? "page" : undefined}
                      >
                        {l.endonym}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
              {action}
            </div>
          </div>
        </header>
        <div id="aside-main" tabIndex={-1} className="aside-page">
          {children}
        </div>
        <div className="mac-landing mac-landing--aside">
          <Footer
            appearance="aside"
            downloadLabel={phone ? t.chrome.appStore : undefined}
            home={href(lang, "/")}
            onDownload={() => {
              if (phone) window.location.assign(APP_STORE_URL);
              else openDownload();
            }}
          />
        </div>
        {modal && (
          <DownloadModal downloadUrl={downloadUrl} onClose={closeDownload} />
        )}
      </div>
    </MacI18nProvider>
  );
}
