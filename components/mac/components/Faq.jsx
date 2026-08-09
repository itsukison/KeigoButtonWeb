import { useState } from 'react'
import { Reveal } from '../hooks/useReveal.jsx'
import { useT } from '../i18n'

/**
 * Ordered by how likely each question is to stop a download, not by topic.
 * The permission question is first because it is the one that kills installs.
 */
export default function Faq() {
  const t = useT()
  const ITEMS = t.faq.items
  const [open, setOpen] = useState(0)

  return (
    <section className="section faq-section" id="faq">
      <Reveal className="shell">
        <h2 className="h-heading center">{t.faq.title}</h2>

        <div className="faq">
          {ITEMS.map((item, i) => {
            const isOpen = open === i
            return (
              <div className="faq__item" key={item.q} data-open={String(isOpen)}>
                <h3>
                  <button
                    className="faq__q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    {item.q}
                    <span className="faq__sign" aria-hidden="true">+</span>
                  </button>
                </h3>
                {isOpen && (
                  <p className="body faq__a" id={`faq-a-${i}`}>
                    {item.a}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </Reveal>
    </section>
  )
}
