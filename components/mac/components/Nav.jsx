import { useEffect, useState } from 'react'
import { AppleIcon } from './product/Product.jsx'

/**
 * Willow's nav: a plain fixed bar on the canvas — mark and wordmark left, links
 * on the page's centre line, the download button right, no fill until scroll.
 *
 * It used to be a floating blurred capsule, justified as a rhyme with the
 * product's own capsule. That shape is Henji's (landing_reference/19.29.24),
 * not Willow's, and the rhyme was not worth the divergence.
 */
export default function Nav({ onDownload }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <nav className="nav__inner" aria-label="メイン">
        <a className="nav__brand" href="#top">
          <span className="nav__mark">
            <img src="/mac-icon.png" alt="" width="26" height="26" />
          </span>
          敬語ボタン
        </a>

        <ul className="nav__links">
          <li><a className="nav__link" href="#how">使い方</a></li>
          <li><a className="nav__link" href="#features">できること</a></li>
          <li><a className="nav__link" href="#pricing">料金</a></li>
          <li><a className="nav__link" href="#faq">よくある質問</a></li>
          <li><a className="nav__link" href="/mobile">iPhone版</a></li>
        </ul>

        <div className="nav__cta">
          <button className="btn btn--filled" onClick={onDownload}>
            <AppleIcon />
            Mac版をダウンロード
          </button>
        </div>
      </nav>
    </header>
  )
}
