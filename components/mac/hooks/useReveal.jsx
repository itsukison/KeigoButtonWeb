import { useEffect, useRef, useState } from 'react'

/**
 * Fade + 8px rise on first entry. That is the whole motion budget for this
 * page — design.md is editorial restraint, so no parallax and no big moves.
 * prefers-reduced-motion is handled in CSS (.reveal collapses to no-op).
 */
export function useReveal() {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || shown) return

    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    )

    io.observe(node)
    return () => io.disconnect()
  }, [shown])

  return { ref, className: `reveal${shown ? ' reveal--in' : ''}` }
}

/** Section wrapper that reveals on scroll. */
export function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const { ref, className: revealClass } = useReveal()
  return (
    <Tag ref={ref} className={`${revealClass} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  )
}
