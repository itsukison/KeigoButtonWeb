import { Reveal } from '../hooks/useReveal.jsx'
import { AppWindow, OverlayBar } from './product/Product.jsx'
import { useT } from '../i18n'

/**
 * Willow's 01/02/03 storyboard (content.md R10). This is the section that
 * decides whether anyone downloads: if "hover, press, replaced in place" isn't
 * understood here, nothing later matters.
 *
 * All three frames hold the same window at the same size on purpose — that's
 * what makes them read as consecutive frames rather than three screenshots.
 */

export default function HowItWorks() {
  const t = useT()
  const STEPS = t.how.steps.map((s, i) => ({ ...s, n: `0${i + 1}` }))
  return (
    <section className="section section--band" id="how">
      <Reveal className="shell" style={{ textAlign: 'center' }}>
        <p className="eyebrow">{t.how.eyebrow}</p>
        <h2 className="h-heading center">{t.how.title}</h2>
        <p className="body center" style={{ marginTop: 'var(--space-16)' }}>
          {t.how.lede}
        </p>

        <div className="steps" style={{ textAlign: 'left' }}>
          {STEPS.map((s, i) => (
            <div className="step" key={s.n}>
              <div className="step__frame">
                <StepArt index={i} />
              </div>
              <div className="step__head">
                <span className="step__num">{s.n}</span>
                <span className="step__title">{s.title}</span>
              </div>
              <p className="body-sm step__body">{s.body}</p>
            </div>
          ))}
        </div>

        <p className="caption center" style={{ marginTop: 'var(--space-40)' }}>
          {t.how.note}
        </p>
      </Reveal>
    </section>
  )
}

/** Three frames of one continuous scene, at a scale that fits the card. */
function StepArt({ index }) {
  const t = useT()
  const before = t.how.before
  const after = t.how.after

  return (
    <div
      className="pv pv--xs"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 10,
      }}
    >
      <div className="step__window">
        <AppWindow title={t.how.windowTitle} metaLines={2}>
          <div className="win__field win__field--focus" style={{ fontSize: 11 }}>
            {index === 2 ? (
              <span className="win__sel">{after}</span>
            ) : (
              <>
                {before}
                <span className="win__caret" />
              </>
            )}
          </div>
        </AppWindow>
      </div>

      {/* Frames 1 and 3 both show the collapsed bar — the difference between
          them is the text, which is exactly the before/after being sold. */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <OverlayBar collapsed={index !== 1} hot={index === 1 ? t.hero.hotButton : null} />
      </div>
    </div>
  )
}
