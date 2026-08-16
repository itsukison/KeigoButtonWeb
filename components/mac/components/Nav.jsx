import { useEffect, useState } from 'react'
import { AppleIcon } from './product/Product.jsx'
import { LOCALES, href } from '@/lib/i18n'
import { useLang, useT } from '../i18n'

/**
 * Willow's nav: a plain fixed bar on the canvas — mark and wordmark left, links
 * on the page's centre line, the download button right, no fill until scroll.
 *
 * It used to be a floating blurred capsule, justified as a rhyme with the
 * product's own capsule. That shape is Henji's (landing_reference/19.29.24),
 * not Willow's, and the rhyme was not worth the divergence.
 */
/**
 * `home` is the path the section anchors belong to, and it is empty on the landing
 * itself — where `#how` is a jump within the page. The guide pages reuse this nav,
 * and there a bare `#how` scrolls to nothing, so they pass their language root and
 * the anchors become real cross-page links. The landing's markup is unchanged when
 * `home` is empty, which is the only state it is ever in.
 */
export default function Nav({ onDownload, home = '' }) {
  const t = useT()
  const lang = useLang()
  const currentLocale = LOCALES.find((locale) => locale.code === lang)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <nav className="nav__inner" aria-label={t.nav.aria}>
        <a className="nav__brand" href={home || '#top'}>
          <span className="nav__mark">
            <img src="/brand-icon.png" alt="" width="26" height="26" />
          </span>
          {t.brand}
        </a>

        <ul className="nav__links">
          <li><a className="nav__link" href={`${home}#how`}>{t.nav.how}</a></li>
          <li><a className="nav__link" href={`${home}#features`}>{t.nav.features}</a></li>
          <li><a className="nav__link" href={`${home}#pricing`}>{t.nav.pricing}</a></li>
          <li><a className="nav__link" href={`${home}#faq`}>{t.nav.faq}</a></li>
          <li><a className="nav__link" href="/iphone">{t.nav.mobile}</a></li>
        </ul>

        <div className="nav__cta">
          {/* Details keeps every locale as a real link while presenting the
              choices as a compact dropdown. Endonyms are never translated. */}
          <details className="nav__language">
            <summary aria-label={`${t.nav.language}: ${currentLocale.endonym}`}>
              <span>{currentLocale.endonym}</span>
              <span className="nav__language-chevron" aria-hidden="true" />
            </summary>
            <ul aria-label={t.nav.language}>
              {LOCALES.map((locale) => (
                <li key={locale.code}>
                  <a
                    href={href(locale.code, '/')}
                    hrefLang={locale.htmlLang}
                    aria-current={locale.code === lang ? 'page' : undefined}
                  >
                    {locale.endonym}
                  </a>
                </li>
              ))}
            </ul>
          </details>

          <button className="btn btn--filled" onClick={onDownload}>
            <AppleIcon />
            {t.nav.download}
          </button>
        </div>
      </nav>
    </header>
  )
}
