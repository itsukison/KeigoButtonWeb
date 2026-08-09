import { useState } from 'react'
import { Reveal } from '../hooks/useReveal.jsx'
import { plans } from '../data/pricing.js'
import { useT } from '../i18n'

/**
 * Poke's pricing block (content.md R6) with two cards instead of three —
 * AGENTS.md §10 puts team surfaces out of scope, so a third column would be
 * an empty "Enterprise" placeholder.
 *
 * Amounts live in src/data/pricing.js and are final — see docs/pricing.md.
 */
export default function Pricing({ onDownload, onSubscribe }) {
  const t = useT()
  const { PLANS, YEARLY_SAVE_LABEL } = plans(t)
  const [cycle, setCycle] = useState('monthly')

  return (
    <section className="section section--tight section--band" id="pricing">
      <Reveal className="shell" style={{ textAlign: 'center' }}>
        <p className="eyebrow">{t.pricing.eyebrow}</p>
        <h2 className="h-heading">{t.pricing.title}</h2>
        <p className="body center measure" style={{ marginTop: 'var(--space-12)' }}>
          {t.pricing.lede}
        </p>

        <div className="toggle" role="group" aria-label={t.pricing.cycleAria}>
          <button
            className="toggle__btn"
            aria-pressed={cycle === 'monthly'}
            onClick={() => setCycle('monthly')}
          >
            {t.pricing.monthly}
          </button>
          <button
            className="toggle__btn"
            aria-pressed={cycle === 'yearly'}
            onClick={() => setCycle('yearly')}
          >
            {t.pricing.yearly}
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
                  {plan.featured && <span className="plan__flag">{t.pricing.recommended}</span>}
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

        {/*
          **Not 「税込」, and this was corrected rather than translated.** `docs/billing.md`
          §10 records that Core7 is a 免税事業者 and not an 適格請求書発行事業者, so a 消費税
          claim is not ours to make — 消費税法第63条's 総額表示義務 excludes 免税事業者 by the
          text of the article, so nothing requires the word either. The Mac app's own plan
          card says this sentence instead; the site said 「価格はすべて税込みです」 and was the
          last place still making the claim.
        */}
        <p className="caption" style={{ marginTop: 'var(--space-20)' }}>
          {t.pricing.taxNote}
        </p>
      </Reveal>
    </section>
  )
}
