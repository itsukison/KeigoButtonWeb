/**
 * Pricing. **Final for launch.** `docs/pricing.md` is the authority for every
 * number here and for the reasoning behind it; change it there first.
 *
 * Two things this file used to assert, both wrong and both now corrected:
 *
 *   1. The free ceiling is **50 rewrites / month**, not 10/day.
 *   2. iPhone and Mac are **not** one quota and not one contract. The iOS
 *      keyboard is free forever, with no cap change and no billing of any kind;
 *      the Mac app is the only paid surface. `docs/pricing.md` §2 has why that
 *      split removes the App Store / StoreKit problem entirely.
 *
 * Only two plans: `AGENTS.md` §10 puts team surfaces out of scope, and usage
 * volume is the only differentiation axis that exists today — so a third card
 * would have nothing true in it. Same reason there is no free trial: the
 * permanent 50/month tier already does that job (`docs/pricing.md` §3).
 */

import { fill } from '@/lib/i18n'

export const LIMITS = {
  free: 50,
  pro: 1000, // ≈33/day — beyond any human writing pace (docs/pricing.md §7)
}

export const PRICE = {
  monthly: 1480,
  yearlyPerMonth: 1200, // ¥14,400 / 12 exactly — this is the number we sell on
  yearlyTotal: 14400,
}

// The amounts never change with the language: the product is billed in yen on every
// surface, and a converted figure on the page would not be the figure at the card.
const yen = (n) => `¥${n.toLocaleString('ja-JP')}`

/**
 * Built from the dictionary rather than exported as a constant, because the page now
 * renders in three languages from one deployment — a module-level array would be one
 * language for whoever loaded it first.
 */
export function plans(t) {
  const counts = {
    free: LIMITS.free.toLocaleString('en-US'),
    pro: LIMITS.pro.toLocaleString('en-US'),
  }

  return {
    YEARLY_SAVE_LABEL: t.pricing.save,
    PLANS: [
      {
        id: 'free',
        name: t.pricing.free.name,
        blurb: t.pricing.free.blurb,
        price: (cycle) => ({
          amount: yen(0),
          period: cycle === 'yearly' ? t.pricing.perYear : t.pricing.perMonth,
        }),
        features: t.pricing.free.features.map((f) => fill(f, counts)),
        cta: t.pricing.free.cta,
        ctaAction: 'download',
        featured: false,
        foot: t.pricing.free.foot,
      },
      {
        id: 'pro',
        name: t.pricing.pro.name,
        blurb: t.pricing.pro.blurb,
        // Annual leads with the monthly equivalent so it compares against ¥1,480 in
        // one step, with the yearly total as the secondary line.
        price: (cycle) =>
          cycle === 'yearly'
            ? {
                amount: yen(PRICE.yearlyPerMonth),
                period: t.pricing.perMonth,
                note: fill(t.pricing.yearlyNote, { total: yen(PRICE.yearlyTotal) }),
              }
            : { amount: yen(PRICE.monthly), period: t.pricing.perMonth, note: t.pricing.monthlyNote },
        features: t.pricing.pro.features.map((f) => fill(f, counts)),
        cta: t.pricing.pro.cta,
        ctaAction: 'subscribe',
        featured: true,
        foot: t.pricing.pro.foot,
      },
    ],
  }
}
