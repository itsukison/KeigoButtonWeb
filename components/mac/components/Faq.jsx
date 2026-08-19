import { Reveal } from '../hooks/useReveal.jsx'
import { useT } from '../i18n'

/**
 * Ordered by how likely each question is to stop a download, not by topic.
 * The permission question is first because it is the one that kills installs.
 */
export default function Faq() {
  const t = useT()
  const ITEMS = t.faq.items
  return (
    <section className="section faq-section" id="faq">
      <Reveal className="shell">
        <h2 className="h-heading center">{t.faq.title}</h2>

        <div className="faq">
          {ITEMS.map((item, i) => (
            <details className="faq__item" key={item.q} open={i === 0}>
              <summary className="faq__q">
                <span>{item.q}</span>
                <span className="faq__sign" aria-hidden="true">+</span>
              </summary>
              <p className="body faq__a">{item.a}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
