import { useEffect, useRef } from 'react'
import { useT } from '../i18n'

/**
 * Henji's install modal (content.md R1) with a fourth step Henji doesn't have:
 * granting Accessibility. That is where our installs actually stall, so it
 * belongs in the same numbered sequence as "drag to Applications" rather than
 * buried in a help article.
 *
 * The app shown throughout the sequence is the shipped macOS icon, rather
 * than a generic rounded square that leaves users guessing what to drag.
 */


export default function DownloadModal({ downloadUrl, onClose }) {
  const t = useT()
  const STEPS = t.modal.steps
  const closeRef = useRef(null)

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <div
      className="modal__backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="dl-title">
        <div className="modal__head">
          <div>
            <h2 className="h-heading-sm" id="dl-title">
              {downloadUrl ? t.modal.title : t.modal.titleSoon}
            </h2>
            <p className="body-sm" style={{ marginTop: 'var(--space-12)' }}>
              {downloadUrl ? (
                <>
                  {t.modal.lead[0]}
                  <a href={downloadUrl} style={{ textDecoration: 'underline' }}>
                    {t.modal.lead[1]}
                  </a>
                  {t.modal.lead[2]}
                </>
              ) : (
                t.modal.bodySoon
              )}
            </p>
          </div>
          <button
            className="modal__close"
            onClick={onClose}
            ref={closeRef}
            aria-label={t.modal.close}
          >
            ✕
          </button>
        </div>

        <div className="modal__steps">
          {STEPS.map((s, i) => (
            <div key={s.label}>
              <div className="modal__art">
                <StepArt index={i} />
              </div>
              <p className="mono modal__label">{s.label}</p>
              <p className="modal__title">{s.title}</p>
              <p className="body-sm modal__body">{s.body}</p>
            </div>
          ))}
        </div>

        <p className="caption" style={{ marginTop: 'var(--space-32)' }}>
          {t.modal.note}
        </p>
      </div>
    </div>
  )
}

/* Compact install diagrams using the shipped app icon. */
function StepArt({ index }) {
  const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinejoin: 'round', strokeLinecap: 'round' }

  if (index === 0) {
    return (
      <svg className="art" viewBox="0 0 120 90" {...stroke}>
        <rect x="14" y="16" width="92" height="58" rx="6" />
        <path d="M14 30h92" />
        <rect x="24" y="40" width="72" height="16" rx="4" fill="var(--accent-soft)" stroke="none" />
        <AppIconImage x={28} y={42} size={12} />
        <path d="M45 46h32M45 51h22" opacity=".65" />
        <circle cx="88" cy="24" r="6" />
        <path d="M88 21v6m-2.4-2.4L88 27l2.4-2.4" />
      </svg>
    )
  }
  if (index === 1) {
    return (
      <svg className="art" viewBox="0 0 120 90" {...stroke}>
        <AppIconImage x={12} y={22} size={42} />
        <rect x="74" y="34" width="30" height="26" rx="4" strokeDasharray="4 3" />
        <path d="M50 60q14 12 26 2" strokeDasharray="3 3" />
        <path d="M74 60l4-2-1 4z" fill="currentColor" />
      </svg>
    )
  }
  if (index === 2) {
    return (
      <svg className="art" viewBox="0 0 120 90" {...stroke}>
        {[0, 1, 2].map((r) =>
          [0, 1, 2, 3].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={20 + c * 22}
              y={18 + r * 22}
              width="16"
              height="16"
              rx="4"
              fill="none"
              stroke={r === 1 && c === 1 ? 'none' : 'currentColor'}
            />
          )),
        )}
        <AppIconImage x={42} y={40} size={16} />
      </svg>
    )
  }
  return (
    <svg className="art" viewBox="0 0 120 90" {...stroke}>
      <rect x="14" y="16" width="92" height="58" rx="6" />
      <path d="M14 30h92" />
      <rect x="24" y="40" width="48" height="6" rx="3" fill="var(--accent-soft)" stroke="none" />
      <rect x="24" y="54" width="34" height="6" rx="3" fill="var(--accent-soft)" stroke="none" />
      <AppIconImage x={27} y={38} size={10} />
      <rect x="80" y="38" width="18" height="10" rx="5" fill="var(--accent)" stroke="none" />
      <circle cx="93" cy="43" r="3.4" fill="#fff" stroke="none" />
    </svg>
  )
}

function AppIconImage({ x, y, size }) {
  const clipId = `app-icon-${x}-${y}-${size}`
  const radius = size * 0.22

  return (
    <>
      <defs>
        <clipPath id={clipId}>
          <rect x={x} y={y} width={size} height={size} rx={radius} />
        </clipPath>
      </defs>
      <image
        href="/brand-icon.png"
        x={x}
        y={y}
        width={size}
        height={size}
        clipPath={`url(#${clipId})`}
      />
    </>
  )
}
