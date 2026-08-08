import { AppleIcon } from './product/Product.jsx'

export default function Footer({ onDownload }) {
  return (
    <footer className="footer">
      <img className="footer__art" src="/mac-footer.png" alt="" aria-hidden="true" />

      <div className="shell footer__inner">
        <div className="footer__content">
          <nav className="footer__column footer__navigation" aria-label="フッターナビゲーション">
            <p className="footer__heading">ナビゲーション</p>
            <a href="#how">使い方</a>
            <a href="#features">できること</a>
            <a href="#pricing">料金</a>
            <a href="#faq">よくある質問</a>
            <a href="/mobile">iPhone版</a>
            <a href="/keigo-henkan">無料の敬語変換</a>
            <a href="/blog">敬語の記事</a>
          </nav>

          <div className="footer__column footer__download">
            <p className="footer__heading">Macでも、敬語ボタン。</p>
            <p className="footer__copy">
              いま書いている場所で、<br />そのまま文章を整えます。
            </p>
            <button className="footer__button" type="button" onClick={onDownload}>
              <AppleIcon />
              無料でダウンロード
            </button>
          </div>

          <div className="footer__column footer__company">
            <a className="footer__brand" href="#top">
              <img src="/mac-icon.png" alt="" width="28" height="28" />
              敬語ボタン
            </a>
            <div className="footer__legal-links">
              <a href="/terms">利用規約</a>
              <a href="/privacy">プライバシーポリシー</a>
              <a href="mailto:keigobutton@gmail.com">お問い合わせ</a>
            </div>
            <p className="footer__copyright">© 2026 株式会社Core7</p>
          </div>
        </div>

        <a className="footer__wordmark" href="#top" aria-label="ページ上部へ戻る">
          敬語ボタン
        </a>
      </div>
    </footer>
  )
}
