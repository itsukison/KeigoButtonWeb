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

export const LIMITS = {
  free: 50,
  pro: 1000, // ≈33/day — beyond any human writing pace (docs/pricing.md §7)
}

export const PRICE = {
  monthly: 1480,
  yearlyPerMonth: 1200, // ¥14,400 / 12 exactly — this is the number we sell on
  yearlyTotal: 14400,
}

// ¥1,480 × 12 = ¥17,760, so annual saves ¥3,360 = 2.27 months.
export const YEARLY_SAVE_LABEL = '2ヶ月分以上お得'

const yen = (n) => `¥${n.toLocaleString('ja-JP')}`

export const PLANS = [
  {
    id: 'free',
    name: '無料',
    blurb: 'まず試す',
    price: (cycle) => ({ amount: yen(0), period: cycle === 'yearly' ? '/ 年' : '/ 月' }),
    features: [
      `月${LIMITS.free}回まで書き換え`,
      'ボタンは全種類使える',
      'iPhone版とボタンが同期',
      'クレジットカード不要',
    ],
    cta: 'Mac版をダウンロード',
    ctaAction: 'download',
    featured: false,
    foot: 'そのまま使い続けられます',
  },
  {
    id: 'pro',
    name: 'Pro',
    blurb: '毎日書く人へ',
    // Annual leads with the monthly equivalent so it compares against ¥1,480 in
    // one step, with the yearly total as the secondary line.
    price: (cycle) =>
      cycle === 'yearly'
        ? { amount: yen(PRICE.yearlyPerMonth), period: '/ 月', note: `年払い ${yen(PRICE.yearlyTotal)}` }
        : { amount: yen(PRICE.monthly), period: '/ 月', note: '月払い' },
    features: [
      '無料プランのすべて',
      `月${LIMITS.pro.toLocaleString('ja-JP')}回まで書き換え`,
      'Apple Pay対応',
      'いつでもワンクリックで解約',
    ],
    cta: 'この価格ではじめる',
    ctaAction: 'subscribe',
    featured: true,
    foot: 'いつでも解約できます',
  },
]
