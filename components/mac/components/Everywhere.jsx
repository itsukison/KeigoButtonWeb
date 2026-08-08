import { Reveal } from '../hooks/useReveal.jsx'

/**
 * Poke's floating-icon field (content.md R2), used for CAPABILITY rather than
 * social proof. Willow and Poke both run a customer logo wall here; we have no
 * such customers, so a logo wall would be a lie. "Which apps this works in" is
 * the honest version of the same visual.
 *
 * The marks are each app's own App Store artwork, pulled through the ASO MCP's
 * get_app_details (which returns a 512px icon URL per app id) and downsized
 * into public/apps/ so the page makes no request to Apple's CDN at runtime.
 * They are square files — the App Store serves the unmasked artwork — so the
 * squircle is CSS, see .every__chipIcon.
 *
 * ⚠ content.md §4 flags third-party brand-asset usage as unconfirmed and this
 * does not clear it. Showing a logo to say "we work here" is ordinary
 * nominative use and both references do it, but several of these companies
 * publish brand guidelines with their own rules. Worth a pass before launch.
 *
 * Cursor is not on the App Store, so there is no icon to fetch for it. Teams
 * took its slot: also Electron (so the same AGENTS.md §5 AX story), and far
 * more common in the Japanese offices this page is written for.
 */

const APPS = [
  { name: 'メール', icon: 'mail', x: 8, y: 22, d: 0 },
  { name: 'Slack', icon: 'slack', x: 26, y: 58, d: 1.1 },
  { name: 'Gmail', icon: 'gmail', x: 20, y: 6, d: 2.3 },
  { name: 'Notion', icon: 'notion', x: 46, y: 34, d: 0.6 },
  { name: 'Chrome', icon: 'chrome', x: 62, y: 70, d: 1.8 },
  { name: 'メモ', icon: 'notes', x: 72, y: 14, d: 0.3 },
  { name: 'Word', icon: 'word', x: 84, y: 48, d: 2.7 },
  { name: 'X', icon: 'x', x: 44, y: 78, d: 1.4 },
  { name: 'LINE', icon: 'line', x: 6, y: 76, d: 2.0 },
  { name: 'Teams', icon: 'teams', x: 88, y: 78, d: 0.9 },
]

export default function Everywhere() {
  return (
    <section className="section">
      <Reveal className="shell">
        <h2 className="h-heading measure center">
          テキストを打てる場所なら、どこでも。
        </h2>
        <p className="body measure center" style={{ marginTop: 'var(--space-20)' }}>
          アプリごとの拡張機能も、プラグインも、設定もありません。
          カーソルが置ける入力欄なら、そこが作業場所になります。
        </p>

        <div className="every__field" aria-hidden="true">
          {APPS.map((a) => (
            <span
              key={a.name}
              className="every__chip"
              style={{
                left: `${a.x}%`,
                top: `${a.y}%`,
                animationDelay: `${a.d}s`,
              }}
            >
              <img
                className="every__chipIcon"
                src={`/apps/${a.icon}.png`}
                alt=""
                width="20"
                height="20"
                loading="lazy"
              />
              {a.name}
            </span>
          ))}
        </div>

        <p className="caption center" style={{ marginTop: 'var(--space-24)' }}>
          ブラウザやSlackのように少し特殊な入力欄を持つアプリでも、読み取り方法を自動で切り替えて対応します。
        </p>
      </Reveal>
    </section>
  )
}
