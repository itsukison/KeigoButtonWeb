import { useLayoutEffect, useRef, useState } from 'react'

/**
 * Dia Browser's floor glow (diabrowser.com). Geometry, blur and curve are the
 * original's; two things are ours and neither is obvious from the code:
 *
 * - The ramp. Dia runs a full rainbow, which here would promote the accent to a
 *   brand colour — the one thing tokens.css exists to prevent. This is the
 *   lavender tile gradient extended down into the accent, so it is not a second
 *   palette. #6d5291 and #c9bbd2 are the app icon's own two hues.
 * - The reveal SCRUBS with scroll — Dia's `reveal: "scroll"` mode, not its
 *   mount transition. It was the mount transition twice over (fire once, ease
 *   over ~1.1s) and both times it was effectively invisible: the field is
 *   anchored to the floor of a tall section, so a timed rise runs itself out
 *   while the part that moves is still below the fold. Tying scaleY to scroll
 *   position instead means the rise cannot happen anywhere but on screen, and
 *   it is reversible — scrolling back up lowers it again.
 *
 * This is the one motion on the page that is not useReveal.jsx's "first entry
 * only, no parallax", and it is a deliberate exception rather than an oversight.
 */

const VBW = 1271
const VBH = 599

/* The ramp needs Dia's CONTRAST, not just its hues, and that is what the first
   version got wrong: six violets a step apart read as one haze no matter how
   little you blur them, which is why the field looked out of focus. What makes
   the original legible is its bright band — near-white #E1ECFE sitting between
   saturated blue below and saturated yellow above — so each column shows a light
   line against a dark one and the blur has an edge to preserve. This does the
   same trick inside our palette: deep violet floor, accent, a lift, the
   accent-wash band, then back down through the app icon's hues to the tile. */
const STOPS = [
  { offset: 0, color: '#1b1533' },
  { offset: 0.18, color: '#463fa6' },
  { offset: 0.34, color: '#8f83e0' },
  { offset: 0.46, color: '#eeedf7' },
  { offset: 0.6, color: '#9d7fc4' },
  { offset: 0.74, color: '#c9bbd2' },
  { offset: 0.88, color: '#e1dff5' },
  { offset: 1, color: '#f8f7f500' },
]

function bellHeights(n, peak, valley) {
  const mid = (n - 1) / 2
  return Array.from({ length: n }, (_, i) => {
    const t = mid === 0 ? 0 : Math.abs(i - mid) / mid
    const eased = 1 - Math.pow(t, 1.24)
    return peak * VBH * (valley + (1 - valley) * eased)
  })
}

/* Dia ships 9 bars at blur 15, valley 0.55. Ours runs fewer and crisper: wider
   columns hold their edges against the same blur, and the lower valley drops the
   shoulders so the middle reads as a peak rather than a plateau. `peak` is a
   fraction of the viewBox, so 1 is the ceiling — above that the tallest column
   is clipped at the top and the curve flattens. Height on the page is .glow's. */
/* How much of the viewport the rise is spread over, as a fraction of viewport
   height — Dia's own 0.65. Progress is 0 when the field's top edge is at the
   bottom of the viewport and 1 when it has travelled 65% of a screen past it,
   which for our height lands the field at full scale at about the moment all of
   it is in view. Larger = slower and more of the scroll spent rising. */
const SCRUB_SPAN = 0.65

export default function RiseGradient({ bars = 7, blur = 11, peak = 1, valley = 0.44 }) {
  const ref = useRef(null)
  const [scale, setScale] = useState(0)

  useLayoutEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setScale(1)
      return
    }

    let queued = false
    const measure = () => {
      queued = false
      const { top } = node.getBoundingClientRect()
      const vh = window.innerHeight || 1
      setScale(Math.max(0, Math.min(1, (vh - top) / (vh * SCRUB_SPAN))))
    }
    /* rAF-coalesced: scroll fires far more often than there are frames to draw,
       and the handler reads layout. */
    const onScroll = () => {
      if (queued) return
      queued = true
      requestAnimationFrame(measure)
    }

    /* Measured before paint (useLayoutEffect), so a reload partway down the page
       does not show one frame of a collapsed field. */
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const heights = bellHeights(bars, peak, valley)
  const colW = VBW / bars

  return (
    <div className="glow" aria-hidden="true" ref={ref}>
      <div className="glow__field" style={{ transform: `scaleY(${scale})` }}>
        <svg
          className="glow__svg"
          viewBox={`0 0 ${VBW} ${VBH}`}
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="glow-ramp" x1="0" y1="1" x2="0" y2="0">
              {STOPS.map((s) => (
                <stop key={s.offset} offset={s.offset} stopColor={s.color} />
              ))}
            </linearGradient>
            <filter id="glow-blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation={blur} />
            </filter>
          </defs>
          {heights.map((h, i) => (
            <g key={i} filter="url(#glow-blur)">
              <rect
                x={i * colW}
                y={VBH - h}
                width={colW * 1.23}
                height={h}
                fill="url(#glow-ramp)"
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}
