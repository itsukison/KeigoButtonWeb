"use client";

import { useCallback, useState, type ReactNode } from "react";
import { MAC_DOWNLOAD_URL } from "@/lib/site";
import { MacI18nProvider } from "./i18n";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import DownloadModal from "./components/DownloadModal.jsx";
import { href, type Lang } from "@/lib/i18n";

/**
 * Nav + Footer + download modal around a document page.
 *
 * `App.jsx` composes the same three around the landing sections. This is a second
 * composition rather than a prop on that one, because a guide page has no hero, no
 * pricing table and no section anchors, and threading "which sections" through the
 * landing would make the page that earns the money conditional on the pages that
 * do not.
 *
 * `children` is server-rendered and passed through as a slot, so the guide body
 * stays out of the client bundle — only the chrome is interactive.
 */
export function MacDocShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  const [modal, setModal] = useState(false);
  const downloadUrl = process.env.NEXT_PUBLIC_MAC_DOWNLOAD_URL || MAC_DOWNLOAD_URL;

  const openDownload = useCallback(() => {
    if (downloadUrl) window.location.assign(downloadUrl);
    setModal(true);
  }, [downloadUrl]);

  return (
    <MacI18nProvider lang={lang}>
      {/* `home` turns the nav's section anchors into cross-page links — on a guide
          page a bare `#pricing` scrolls to nothing. */}
      <Nav onDownload={openDownload} home={href(lang, "/")} />
      <main>{children}</main>
      <Footer onDownload={openDownload} home={href(lang, "/")} />
      {modal && <DownloadModal downloadUrl={downloadUrl} onClose={() => setModal(false)} />}
    </MacI18nProvider>
  );
}
