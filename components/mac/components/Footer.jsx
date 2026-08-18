import { AppleIcon } from './product/Product.jsx'
import { href } from '@/lib/i18n'
import { useLang, useT } from '../i18n'

/**
 * The English guides, listed only in the English footer.
 *
 * Hardcoded here rather than imported from `content/en-guides.ts` because this is a
 * client component: importing the registry to read four labels would pull every
 * guide's full `blocks` array into the browser bundle. A wrong href here 404s
 * visibly, which is the failure mode worth accepting for that trade.
 *
 * **These are nav labels, not page titles.** The first version listed each guide's
 * full h1 in the same flat column as the in-page anchors, which produced eleven
 * undifferentiated lines of prose where a reader expects a short index. A footer
 * lists destinations; the page says what it is once you arrive. They keep the head
 * term ("Grammarly", "Apple Intelligence") so the anchor text still carries the
 * query, and drop everything after it.
 */
const EN_GUIDE_LINKS = [
  { href: '/en/rewrite', label: 'Free rewriter' },
  { href: '/en/ai-writing-apps-mac', label: 'AI writing apps' },
  { href: '/en/grammarly-alternative-mac', label: 'Grammarly alternatives' },
  { href: '/en/apple-intelligence-writing-tools-alternative', label: 'Apple Intelligence' },
  { href: '/en/rewrite-text-any-app-mac', label: 'Rewrite in any app' },
]

/** `home` mirrors `Nav`: empty on the landing, the language root elsewhere, so the
 * section anchors below resolve instead of scrolling nowhere on a document page. */
export default function Footer({ onDownload, home = '' }) {
  const t = useT()
  const lang = useLang()
  const isEn = lang === 'en'
  return (
    <footer className="footer">
      <img className="footer__art" src="/mac-footer.png" alt="" aria-hidden="true" />

      <div className="shell footer__inner">
        <div className="footer__content">
          <nav className="footer__column footer__navigation" aria-label={t.footer.navAria}>
            <p className="footer__heading">{t.footer.navHeading}</p>
            <a href={`${home}#how`}>{t.nav.how}</a>
            <a href={`${home}#features`}>{t.nav.features}</a>
            <a href={`${home}#pricing`}>{t.nav.pricing}</a>
            <a href={`${home}#faq`}>{t.nav.faq}</a>
            <a href="/iphone">{t.footer.mobile}</a>
            {/* The internal hub. `/` is the only page on this property Google
                crawls, so these are the links that carry discovery and equity to
                the pages targeting 「敬語変換」-class queries (seo-geo.md §設計方針5).
                Restyle or move them freely; do not drop them. */}
            {/* English readers get the English cluster; the Japanese tool pages
                target Japanese queries and are not what an English visitor came
                for. Both lists still link the free converter, which is the one
                Japanese page useful in any language. */}
            {isEn ? (
              <>
                {/* A second heading inside the same column. Without it the guides
                    read as a continuation of the in-page anchors above, which is
                    what made the list feel like a wall rather than an index. */}
                <p className="footer__heading footer__heading--sub">Guides</p>
                {EN_GUIDE_LINKS.map((link) => (
                  <a key={link.href} href={link.href}>{link.label}</a>
                ))}
                <a href="/keigo-henkan">{t.footer.converter}</a>
              </>
            ) : (
              <>
                <a href="/keigo-henkan">{t.footer.converter}</a>
                <a href="/keigo-check">{t.footer.checker}</a>
                <a href="/keigo-test">{t.footer.test}</a>
                <a href="/reibun">{t.footer.reibun}</a>
                <a href="/blog">{t.footer.articles}</a>
              </>
            )}
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
              {/* `/en/support` and `/zh/support` are in the sitemap; without this
                  link they are in nothing else, because the Mac landing does not
                  render SiteChrome and SiteChrome is where the support link lived. */}
              <a href={href(lang, '/support')}>{t.chrome.support}</a>
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
