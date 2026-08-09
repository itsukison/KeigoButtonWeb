import { Reveal } from '../hooks/useReveal.jsx'
import { AppWindow, GeneratingCapsule, ResultPanel } from './product/Product.jsx'
import { useT } from '../i18n'

/**
 * Poke's numbered alternating rows (content.md R3/R4), separated by hairlines
 * rather than whitespace — design.md uses that border 54 times and calls it
 * the preferred separator.
 *
 * Dive (2) is the real differentiator and the one competitors can't copy: a
 * clipboard-based tool physically cannot capture an unselected field, because
 * ⌘C with nothing selected copies nothing. Said here without the jargon.
 *
 * Dive (3) is where the generating capsule's rainbow sweep appears — the only
 * colour on the page — but the copy talks about what the result panel does
 * (review, regenerate, insert), not about the page's own colour budget.
 */

export default function DeepDives() {
  const t = useT()
  return (
    <section id="features">
      <div className="shell">
        <hr className="rule" />

        <Reveal className="dive">
          <div className="dive__copy">
            <p className="mono dive__eyebrow">(1)</p>
            <h3 className="h-heading-sm">{t.dives.one.title}</h3>
            <p className="body dive__body measure">{t.dives.one.body}</p>
            <a className="dive__link" href="#how">
              {t.dives.one.link} <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="dive__stage">
            <ButtonEditor />
          </div>
        </Reveal>

        <hr className="rule" />

        <Reveal className="dive dive--reverse">
          <div className="dive__copy">
            <p className="mono dive__eyebrow">(2)</p>
            <h3 className="h-heading-sm">{t.dives.two.title}</h3>
            <p className="body dive__body measure">{t.dives.two.body}</p>
          </div>
          <div className="dive__stage" style={{ flexDirection: 'column', gap: 20 }}>
            <SelectionCompare />
          </div>
        </Reveal>

        <hr className="rule" />

        <Reveal className="dive">
          <div className="dive__copy">
            <p className="mono dive__eyebrow">(3)</p>
            <h3 className="h-heading-sm">{t.dives.three.title}</h3>
            <p className="body dive__body measure">{t.dives.three.body}</p>
            <p className="mono" style={{ marginTop: 'var(--space-20)' }}>
              {t.dives.three.mono}
            </p>
          </div>
          <div className="dive__stage" style={{ flexDirection: 'column', gap: 28 }}>
            <div className="pv pv--lg">
              <GeneratingCapsule />
            </div>
            <div className="pv pv--sm">
              <ResultPanel />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/** The settings window is eggshell — the light half of AGENTS.md §8's two ramps. */
function ButtonEditor() {
  const t = useT()
  const rows = t.dives.editorRows

  return (
    <div className="editor">
      <div className="editor__head">{t.dives.editorHead}</div>
      {rows.map((r) => (
        <div className="editor__row" key={r.name}>
          <span className="editor__grip" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <circle cx="4" cy="2.5" r="1" /><circle cx="8" cy="2.5" r="1" />
              <circle cx="4" cy="6" r="1" /><circle cx="8" cy="6" r="1" />
              <circle cx="4" cy="9.5" r="1" /><circle cx="8" cy="9.5" r="1" />
            </svg>
          </span>
          <span>
            <span className="editor__name">{r.name}</span>
            <span className="editor__desc" style={{ display: 'block' }}>{r.desc}</span>
          </span>
          <span className="editor__switch" data-on={String(!r.off)} aria-hidden="true" />
        </div>
      ))}
    </div>
  )
}

function SelectionCompare() {
  const t = useT()
  return (
    <>
      <Case
        label={t.dives.two.selectedLabel}
        note={t.dives.two.selectedNote}
        field={
          <>
            {t.dives.two.fieldLead}
            <span className="win__sel">{t.dives.two.fieldSelected}</span>
            {t.dives.two.fieldTail}
          </>
        }
      />
      <Case
        label={t.dives.two.wholeLabel}
        note={t.dives.two.wholeNote}
        field={
          <>
            {t.dives.two.fieldLead}{t.dives.two.fieldSelected}{t.dives.two.fieldTail}
            <span className="win__caret" />
          </>
        }
      />
    </>
  )
}

function Case({ label, note, field }) {
  const t = useT()
  return (
    <div className="pv" style={{ width: '100%', maxWidth: 420 }}>
      <p className="mono" style={{ marginBottom: 8 }}>{label}</p>
      {/* .win is height:100%, so it needs a sized parent to render at all. */}
      <div style={{ height: 148 }}>
        <AppWindow title={t.dives.two.windowTitle} metaLines={1}>
          <div className="win__field win__field--focus" style={{ fontSize: 11 }}>
            {field}
          </div>
        </AppWindow>
      </div>
      <p className="caption" style={{ marginTop: 8 }}>{note}</p>
    </div>
  )
}
