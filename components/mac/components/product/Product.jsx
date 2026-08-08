/**
 * Live recreations of the macOS overlay, built from AGENTS.md §4/§8 tokens.
 *
 * These stand in for screenshots on purpose: they stay correct when the
 * design tokens move, they render crisp at any density, and they can animate
 * (the generating capsule's 2.6s rotation is the product's one colour moment
 * and a still image throws it away).
 *
 * A2 / A3-1 / A4 in content.md still want real captures eventually. Everything
 * here is faithful enough to ship with.
 */

/* --- The pill mark ------------------------------------------------------- */
/* The real one: the same full-colour keycap the app's own `BrandGlyph` draws on
   the bar. Not the outline cut — this recreation sits on the overlay's #141312,
   where the keyline closes up at 16px and the filled art does not. */
export function Mark({ className, ...rest }) {
  return <img className={className} src="/mac-mark.png" alt="" aria-hidden="true" {...rest} />
}

/* --- The bar ------------------------------------------------------------- */

const DEFAULT_BUTTONS = ['敬語', '要約', '英訳', '丁寧に']

export function OverlayBar({ buttons = DEFAULT_BUTTONS, hot = null, collapsed = false }) {
  if (collapsed) {
    return (
      <div className="bar bar--collapsed" role="img" aria-label="画面下のバー（待機中）">
        <Mark className="bar__mark" />
      </div>
    )
  }

  return (
    <div className="bar" role="img" aria-label="バーを展開した状態。自分のボタンが並んでいます">
      <Mark className="bar__mark" />
      <span className="bar__rule" />
      {buttons.map((label) => (
        <span
          key={label}
          className={`bar__btn${hot === label ? ' bar__btn--hot' : ''}`}
        >
          {label}
        </span>
      ))}
      <span className="bar__rule" />
      <span className="bar__btn bar__btn--icon" aria-hidden="true">
        <PencilIcon />
      </span>
    </div>
  )
}

/* --- Generating capsule -------------------------------------------------- */

export function GeneratingCapsule({ label = '書き換えています' }) {
  return (
    <div className="gen" role="img" aria-label={`${label}。バーがキャプセルに変わります`}>
      <div className="gen__inner">
        <span>{label}</span>
        <span className="gen__dots" aria-hidden="true">
          <i className="gen__dot" />
          <i className="gen__dot" />
          <i className="gen__dot" />
        </span>
      </div>
    </div>
  )
}

/* --- Result panel -------------------------------------------------------- */

export function ResultPanel({
  prompt = '敬語',
  body = '恐れ入りますが、明日の定例を15時からに変更いただけますでしょうか。あわせて資料の最終版も共有いたします。',
}) {
  return (
    <div className="res" role="img" aria-label="書き換え結果のパネル">
      <div className="res__head">
        <span className="res__pager">
          <span className="res__chev">‹</span>
          <span>1 / 3</span>
          <span className="res__chev">›</span>
        </span>
        <span className="res__x">✕</span>
      </div>
      <div className="res__prompt">{prompt}</div>
      <div className="res__body">{body}</div>
      <div className="res__foot">
        <span className="res__tools" aria-hidden="true">
          <RefreshIcon />
          <CopyIcon />
          <ThumbIcon />
          <ThumbIcon down />
        </span>
        <span className="res__insert">
          挿入 <span aria-hidden="true">⏎</span>
        </span>
      </div>
    </div>
  )
}

/* --- Mock app window ----------------------------------------------------- */

export function AppWindow({ title = 'メール — 新規メッセージ', children, metaLines = 3 }) {
  return (
    <div className="win">
      <div className="win__chrome">
        <span className="win__lights" aria-hidden="true">
          <i className="win__light" />
          <i className="win__light" />
          <i className="win__light" />
        </span>
        <span className="win__title">{title}</span>
      </div>
      <div className="win__body">
        {Array.from({ length: metaLines }).map((_, i) => (
          <span
            key={i}
            className="win__metaLine"
            style={{ width: `${[62, 44, 78][i % 3]}%` }}
            aria-hidden="true"
          />
        ))}
        {children}
      </div>
    </div>
  )
}

/* --- Full desktop scene (hero) ------------------------------------------- */

export function DesktopScene({ children, bar }) {
  return (
    <div className="pv scene">
      <div className="scene__menubar" aria-hidden="true">
        <span className="scene__menuItem" style={{ width: 26 }} />
        <span className="scene__menuItem" style={{ width: 34 }} />
        <span className="scene__menuItem" style={{ width: 22 }} />
        <span className="scene__menuItem" style={{ width: 30 }} />
      </div>
      <div className="scene__window">{children}</div>
      <div className="scene__bar">{bar}</div>
    </div>
  )
}

/* --- Icons --------------------------------------------------------------- */

export function AppleIcon({ className = 'btn__apple' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M11.02 8.47c-.02-1.7 1.39-2.52 1.45-2.56-.79-1.16-2.02-1.32-2.46-1.34-1.05-.1-2.04.62-2.57.62-.53 0-1.35-.6-2.22-.59-1.14.02-2.19.66-2.78 1.68-1.18 2.06-.3 5.1.85 6.77.56.82 1.24 1.73 2.12 1.7.85-.03 1.17-.55 2.2-.55s1.32.55 2.22.53c.92-.02 1.5-.83 2.06-1.65.65-.95.92-1.87.93-1.92-.02-.01-1.79-.69-1.8-2.7zM9.4 3.4c.47-.57.79-1.36.7-2.15-.68.03-1.5.45-1.98 1.02-.43.5-.81 1.31-.71 2.08.76.06 1.53-.39 1.99-.95z" />
    </svg>
  )
}

function PencilIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11.3 2.7a1.7 1.7 0 0 1 2.4 2.4L5.5 13.3 2 14l.7-3.5z" />
    </svg>
  )
}

function RefreshIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9" />
      <path d="M13.5 2.5V6H10" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.6" />
      <path d="M10.5 3.2A1.7 1.7 0 0 0 8.8 2.5H4.2A1.7 1.7 0 0 0 2.5 4.2v4.6c0 .7.4 1.3 1 1.6" />
    </svg>
  )
}

function ThumbIcon({ down = false }) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
      style={down ? { transform: 'rotate(180deg)' } : undefined}
    >
      <path d="M5.5 14V6.8l3-4.3c.9 0 1.6.8 1.5 1.7L9.7 6.5h3.1c.9 0 1.6.9 1.4 1.8l-.9 4.3c-.1.8-.8 1.4-1.6 1.4z" />
      <rect x="1.6" y="6.8" width="3" height="7.2" rx="1" />
    </svg>
  )
}
