import { useState } from 'react'
import { Reveal } from '../hooks/useReveal.jsx'
import { PLANS, YEARLY_SAVE_LABEL } from '../data/pricing.js'

/**
 * Poke's pricing block (content.md R6) with two cards instead of three —
 * AGENTS.md §10 puts team surfaces out of scope, so a third column would be
 * an empty "Enterprise" placeholder.
 *
 * Amounts live in src/data/pricing.js and are final — see docs/pricing.md.
 */
export default function Pricing({ onDownload, onSubscribe }) {
  const [cycle, setCycle] = useState('monthly')

  return (
    <section className="section section--tight section--band" id="pricing">
      <Reveal className="shell" style={{ textAlign: 'center' }}>
        <p className="eyebrow">料金</p>
        <h2 className="h-heading">まずは無料で。</h2>
        <p className="body center measure" style={{ marginTop: 'var(--space-12)' }}>
          毎日使うようになったら、月1,000回のProへ。
          iPhone版はこれからも無料です。
        </p>

        <div className="toggle" role="group" aria-label="支払い周期">
          <button
            className="toggle__btn"
            aria-pressed={cycle === 'monthly'}
            onClick={() => setCycle('monthly')}
          >
            月払い
          </button>
          <button
            className="toggle__btn"
            aria-pressed={cycle === 'yearly'}
            onClick={() => setCycle('yearly')}
          >
            年払い
            <span className="toggle__save">{YEARLY_SAVE_LABEL}</span>
          </button>
        </div>

        <div className="plans">
          {PLANS.map((plan) => {
            const price = plan.price(cycle)
            return (
              <div
                className={`plan${plan.featured ? ' plan--featured' : ''}`}
                key={plan.id}
              >
                <div className="plan__head">
                  <h3 className="plan__name">{plan.name}</h3>
                  {plan.featured && <span className="plan__flag">おすすめ</span>}
                </div>
                <p className="body-sm" style={{ marginTop: 4 }}>{plan.blurb}</p>

                <p className="plan__price">
                  <span className="plan__amount">{price.amount}</span>
                  <span className="plan__period">{price.period}</span>
                </p>
                <p className="caption plan__note">{price.note ?? '　'}</p>

                <ul className="plan__features">
                  {plan.features.map((f) => (
                    <li className="plan__feature" key={f}>
                      <span className="plan__check" aria-hidden="true">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="plan__cta">
                  <button
                    className={`btn btn--block ${plan.featured ? 'btn--filled' : 'btn--outline'}`}
                    type="button"
                    onClick={plan.ctaAction === 'download' ? onDownload : onSubscribe}
                  >
                    {plan.cta}
                  </button>
                  <p className="caption plan__foot">{plan.foot}</p>
                </div>
              </div>
            )
          })}
        </div>

        <p className="caption" style={{ marginTop: 'var(--space-20)' }}>
          価格はすべて税込みです。
        </p>
      </Reveal>
    </section>
  )
}
