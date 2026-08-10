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

/**
 * **The amounts DO change with the language, and only for English.**
 *
 * This file used to say the opposite — "billed in yen on every surface, and a
 * converted figure on the page would not be the figure at the card" — and that was
 * true until 2026-08-10, when the Mac app started charging USD to anyone reading it
 * in English (`docs/pricing.md` §1). The sentence's reasoning is unchanged and is now
 * the argument for this table: the page must show the figure that appears at the
 * card, and for an English reader that figure is $12.
 *
 * 简体中文 stays on yen. §17's premise is a Chinese speaker working in Japan, so their
 * card is a Japanese card — the same fact that keeps their buttons writing Japanese.
 *
 * `en → usd` is the whole mapping and it lives here only, mirroring the app's
 * `BillingCurrency.forInterface`. Both sides have to agree or the page quotes a price
 * checkout will not honour.
 */
export const PRICE = {
  jpy: {
    monthly: 1480,
    yearlyPerMonth: 1200, // ¥14,400 / 12 exactly — this is the number we sell on
    yearlyTotal: 14400,
  },
  usd: {
    monthly: 12,
    yearlyPerMonth: 10, // $120 / 12 exactly, and the reason $120 beat $96 and $99
    yearlyTotal: 120,
  },
}

export const currencyFor = (lang) => (lang === 'en' ? 'usd' : 'jpy')

/**
 * `¥1,480` and `$12`. No decimal part on either: every amount in the table is a whole
 * unit, and `$12.00` beside `¥1,480` reads as two different kinds of number.
 */
const money = (currency, n) =>
  currency === 'usd' ? `$${n.toLocaleString('en-US')}` : `¥${n.toLocaleString('ja-JP')}`

/**
 * Built from the dictionary rather than exported as a constant, because the page now
 * renders in three languages from one deployment — a module-level array would be one
 * language for whoever loaded it first. The currency rides along for the same reason.
 */
export function plans(t, lang) {
  const counts = {
    free: LIMITS.free.toLocaleString('en-US'),
    pro: LIMITS.pro.toLocaleString('en-US'),
  }
  const currency = currencyFor(lang)
  const price = PRICE[currency]
  const amount = (n) => money(currency, n)

  return {
    YEARLY_SAVE_LABEL: t.pricing.save,
    PLANS: [
      {
        id: 'free',
        name: t.pricing.free.name,
        blurb: t.pricing.free.blurb,
        price: (cycle) => ({
          amount: amount(0),
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
        // Annual leads with the monthly equivalent so it compares against ¥1,480 (or
        // $12) in one step, with the yearly total as the secondary line. Both annual
        // amounts divide by twelve exactly, which is the property that makes this
        // presentation honest rather than a rounded-down headline.
        price: (cycle) =>
          cycle === 'yearly'
            ? {
                amount: amount(price.yearlyPerMonth),
                period: t.pricing.perMonth,
                note: fill(t.pricing.yearlyNote, { total: amount(price.yearlyTotal) }),
              }
            : { amount: amount(price.monthly), period: t.pricing.perMonth, note: t.pricing.monthlyNote },
        features: t.pricing.pro.features.map((f) => fill(f, counts)),
        cta: t.pricing.pro.cta,
        ctaAction: 'subscribe',
        featured: true,
        foot: t.pricing.pro.foot,
      },
    ],
  }
}
