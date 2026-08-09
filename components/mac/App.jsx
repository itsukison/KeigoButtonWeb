'use client'

import { useCallback, useState } from 'react'
import { MAC_DOWNLOAD_URL } from '@/lib/site'
import { MacI18nProvider } from './i18n'

import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Problem from './components/Problem.jsx'
import Everywhere from './components/Everywhere.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import DeepDives from './components/DeepDives.jsx'
import Pricing from './components/Pricing.jsx'
import Faq from './components/Faq.jsx'
import Footer from './components/Footer.jsx'
import DownloadModal from './components/DownloadModal.jsx'

export default function App({ lang = 'ja' }) {
  const [modal, setModal] = useState(false)
  const downloadUrl =
    process.env.NEXT_PUBLIC_MAC_DOWNLOAD_URL ||
    MAC_DOWNLOAD_URL

  const openDownload = useCallback(() => {
    if (downloadUrl) window.location.assign(downloadUrl)
    setModal(true)
    // TODO(公開前): PostHog を初期化して 'download_clicked' を送る。
    // AGENTS.md §7 — Mac版は新規 PostHog プロジェクトへ送ること。既存の
    // Default project (465060) に混ぜると両プラットフォームの MAU が崩れる。
    // ファネル: download_clicked → app_launched → ax_granted → first_rewrite
  }, [downloadUrl])

  const openSubscribe = useCallback(() => {
    // TODO(公開前): 課金導線。アプリ内購入にするか Web チェックアウトにするかは
    // 未決。content.md §10 の「1契約1枠」を満たす実装であること。
    setModal(true)
  }, [])

  return (
    <MacI18nProvider lang={lang}>
      <Nav onDownload={openDownload} />

      <main>
        <Hero onDownload={openDownload} />
        <Problem />
        <Everywhere />
        <HowItWorks />
        <DeepDives />
        {/* FeatureGrid / Continuity / Privacy were cut from the page. Their
            source remains in laptop/landing if they need to come back. Two things went with them and are worth
            knowing: Continuity carried "one account, one subscription across
            iPhone and Mac" (the only claim no competitor can make), and
            Privacy carried the up-front explanation of why the app asks for
            Accessibility. Faq §1 still answers the permission question, but
            only for someone who scrolls that far. */}
        <Pricing onDownload={openDownload} onSubscribe={openSubscribe} />
        <Faq />
      </main>

      <Footer onDownload={openDownload} />

      {modal && <DownloadModal downloadUrl={downloadUrl} onClose={() => setModal(false)} />}
    </MacI18nProvider>
  )
}
