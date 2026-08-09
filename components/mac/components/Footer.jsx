import { AppleIcon } from './product/Product.jsx'
import { href } from '@/lib/i18n'
import { useLang, useT } from '../i18n'

export default function Footer({ onDownload }) {
  const t = useT()
  const lang = useLang()
  return (
    <footer className="footer">
      <img className="footer__art" src="/mac-footer.png" alt="" aria-hidden="true" />

      <div className="shell footer__inner">
        <div className="footer__content">
          <nav className="footer__column footer__navigation" aria-label={t.footer.navAria}>
            <p className="footer__heading">{t.footer.navHeading}</p>
            <a href="#how">{t.nav.how}</a>
            <a href="#features">{t.nav.features}</a>
            <a href="#pricing">{t.nav.pricing}</a>
            <a href="#faq">{t.nav.faq}</a>
            <a href="/mobile">{t.footer.mobile}</a>
            <a href="/keigo-henkan">{t.footer.converter}</a>
            <a href="/blog">{t.footer.articles}</a>
          </nav>

          <div className="footer__column footer__download">
            <p className="footer__heading">{t.footer.downloadHeading}</p>
            <p className="footer__copy">
              {t.footer.downloadCopy[0]}<br />{t.footer.downloadCopy[1]}
            </p>
            <button className="footer__button" type="button" onClick={onDownload}>
              <AppleIcon />
              {t.footer.downloadButton}
            </button>
          </div>

          <div className="footer__column footer__company">
            <a className="footer__brand" href="#top">
              <img src="/brand-icon.png" alt="" width="28" height="28" />
              {t.brand}
            </a>
            <div className="footer__legal-links">
              <a href={href(lang, '/terms')}>{t.footer.terms}</a>
              <a href={href(lang, '/privacy')}>{t.footer.privacy}</a>
              <a href="mailto:keigobutton@gmail.com">{t.footer.contact}</a>
            </div>
            <p className="footer__copyright">{t.footer.copyright}</p>
          </div>
        </div>

        <a className="footer__wordmark" href="#top" aria-label={t.footer.toTop}>
          {t.brand}
        </a>
      </div>
    </footer>
  )
}
