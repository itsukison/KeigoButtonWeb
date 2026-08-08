import { useEffect, useState } from 'react'
import { APP_STORE_URL } from '@/lib/site'
import {
  AppleIcon,
  AppWindow,
  DesktopScene,
  GeneratingCapsule,
  OverlayBar,
  ResultPanel,
} from './product/Product.jsx'

/**
 * Willow's split hero (content.md R9): copy left, and on the right a real app
 * scene with the product composited on top of it. Chosen over VoiceOS's
 * centred hero because our bar is ~28pt tall — centred and shrunk, it reads as
 * nothing at all. The whole point is that it sits *over* another app.
 *
 * The right side cycles the actual interaction rather than showing a still,
 * because "the text is replaced in place" is a change over time and a
 * screenshot cannot show it. Five phases now, matching AGENTS.md §4's real
 * state machine (pill → hover row → generating → result → written back) —
 * the result panel used to be skipped entirely, which left "review before it
 * writes back" untold.
 */

const DRAFT = '明日の定例、15時からに変更してもらえませんか。あと資料の最終版も送ります。'
const REWRITTEN =
  '恐れ入りますが、明日の定例を15時からに変更いただけますでしょうか。あわせて資料の最終版も共有いたします。'

const PHASES = [
  { key: 'idle', ms: 1700 },
  { key: 'hover', ms: 1900 },
  { key: 'generating', ms: 2600 },
  { key: 'result', ms: 2800 },
  { key: 'done', ms: 2200 },
]

export default function Hero({ onDownload }) {
  const [i, setI] = useState(0)
  const phase = PHASES[i].key

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setI(1) // park on the expanded row — the most informative single frame
      return
    }
    const t = setTimeout(() => setI((n) => (n + 1) % PHASES.length), PHASES[i].ms)
    return () => clearTimeout(t)
  }, [i])

  const showRewritten = phase === 'done'
  const showCaret = phase === 'idle' || phase === 'hover'

  return (
    <section className="hero" id="top">
      <div className="shell hero__grid">
        <div>
          {/* One text node, not three flex children — as separate items each
              fragment wrapped on its own and the line broke mid-number. */}
          <span className="hero__badge">
            <Dot />
            <span>
              iPhone版「敬語ボタン」は <b>5,000人以上</b> に使われています
            </span>
          </span>

          <h1 className="h-display">いま書いている場所で、そのまま整える。</h1>

          {/* The "コピーも、貼り付けも、アプリの切り替えもいりません" half was cut:
              the next section's H2 is that sentence, so the hero was spending
              its lede on a line the reader meets again one screen later. */}
          <p className="lede measure" style={{ marginTop: 'var(--space-24)' }}>
            画面下のバーにホバーして、自分のボタンを押すだけ。
          </p>

          <div className="hero__actions">
            <button className="btn btn--filled btn--lg" onClick={onDownload}>
              <AppleIcon />
              Mac版をダウンロード
            </button>
            <a className="btn btn--outline btn--lg" href={APP_STORE_URL}>
              <AppleIcon />
              iPhone版を入手
            </a>
          </div>

          <p className="caption hero__meta">
            macOS 14 以降 · 無料で使えます · iPhone版と同じアカウント
          </p>
        </div>

        <div className="hero__visual">
          <DesktopScene
            bar={
              <div className="hero__stage" key={phase}>
                {phase === 'generating' ? (
                  <GeneratingCapsule />
                ) : phase === 'result' ? (
                  <ResultPanel />
                ) : (
                  <OverlayBar
                    collapsed={phase === 'idle' || phase === 'done'}
                    hot={phase === 'hover' ? '敬語' : null}
                  />
                )}
              </div>
            }
          >
            <AppWindow title="メール — 新規メッセージ">
              <div
                className={`win__field${phase !== 'idle' ? ' win__field--focus' : ''}${showRewritten ? ' win__field--flash' : ''}`}
              >
                {showRewritten ? (
                  REWRITTEN
                ) : (
                  <>
                    {DRAFT}
                    {showCaret && <span className="win__caret" />}
                  </>
                )}
              </div>
            </AppWindow>
          </DesktopScene>
        </div>
      </div>
    </section>
  )
}

function Dot() {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: 'var(--accent)',
        display: 'inline-block',
        flex: 'none',
        marginTop: 7,
      }}
    />
  )
}
