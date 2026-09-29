# Aside website redesign — verification

## Outcome

The production build and TypeScript check pass. All 56 HTML routes were checked at 1440, 1024, and 390 px: 168 route/viewport combinations, all HTTP 200, with no horizontal document overflow, browser runtime errors, or missing visible eager images.

The existing landing sections, protected iPhone pages, support/terms/privacy, and iPhone-specific articles retain their appearance. Support/terms/privacy in three languages and the two protected articles match all 33 baseline screenshots pixel-for-pixel. The iPhone landing contains an existing animated demonstration, so its animation pixels are not used as a static equality gate. Direct-visit and client-navigation style snapshots match for the iPhone landing, a protected article, localized support, and the main landing.

JSON-LD matches the original baseline on every compared route. Protected routes receive only the legacy icon metadata. The new favicon contains 16/32/48 px representations, with separate 192 px browser and 180 px touch images.

## Behavioral checks

- Download/modal checks on six representative routes at all three widths: one intercepted attachment request per click, manual retry, four installation steps, Tab wrapping, Escape/backdrop/close dismissal, focus restoration, and scroll restoration.
- Five rewriting tools: initial disabled state, loading, two candidates, clipboard copying, quota errors, server errors, offline recovery, blank input, and the 300-character limit. Requests retained their expected modes: `keigo`, `kosei`, `mail`, `en_natural`, and `en_reply`.
- Local checker: findings and clean results. Quiz: all 20 questions, results, and restart. Example page: copying a complete example.
- All nine localized billing destinations: state-specific presentation, preserved `keigobutton://billing` action, and `noindex` metadata.
- Contents anchors, locale navigation, and phone-user-agent App Store actions.
- WebKit smoke checks at 390 px for the Japanese tool, English tool, and Chinese billing screen, including the native dialog.
- Final targeted production checks confirm the first tablet navigation link is reachable and the English editors precede contents navigation at all three widths.

AI interaction checks use deterministic HTTP responses; they do not establish the health of the live AI service. Billing checks verify the existing return-page contract without performing transactions. Download interaction checks use intercepted test attachments.

## Visual and accessibility review

Representative tool, quiz, index, article, example, guide, legal, billing, and installation surfaces were inspected from browser captures. Checks included narrow layouts, long headings, artwork crops, visible controls, reading columns, responsive contents rails, and full-page overflow. The high-resolution native mascot replaces enlargement of the small navigation mark in illustration stages.

Controlled color pairs meet ordinary-text contrast requirements: body/canvas 5.47:1, white/primary action 17.65:1, blue/selection 4.54:1, and blue focus/white 5.10:1. Decorative imagery stays outside text surfaces. Reduced-motion captures and opaque navigation fallbacks are supported; this is not a blanket contrast certification of every protected legacy element.

## Local evidence and preview

- Production preview: `http://127.0.0.1:3111/keigo-henkan` while the local server is running.
- Captures and route records: `/tmp/aside-site-refresh/{before,after,final}/`.
- Interaction results: `/tmp/aside-site-refresh/interactions.json` (39 check groups).
- Navigation and contrast results: `/tmp/aside-site-refresh/navigation.json`.
- Local harnesses: `/tmp/aside-site-refresh/{capture,final-capture,verify,navigation}.cjs`.

Temporary evidence is not a deployment artifact. No deployment was performed.

## Desktop component refinement

The desktop shell now renders the same `Footer` component and appearance as the landing pages. Desktop promotions and iPhone-related article sections inherit the desktop system while retaining their copy and links. Protected routes retain their legacy renderer. Navigation, footer, and installation illustrations use the neutral keycap icon. The installation guide uses consistent neutral vector scenes in place of colorful backgrounds.

The production build and TypeScript pass. Eighteen representative route/viewport combinations verify the shared footer, neutral navigation icons, desktop promotion styling, and lack of horizontal overflow at 1440, 1024, and 390 pixels. Refined CTA, footer, and dialog captures live in `/tmp/aside-site-refresh/`.

The 38 Chromium interaction groups passed, including installer request counts, retry, focus trapping/restoration, dismissal, tool results/errors/copying, quiz, billing links, and protected icon metadata. The three WebKit route/modal checks passed separately against the restarted final build; an initial check during a rebuild was repeated on the stable server. Results: `/tmp/aside-site-refresh/refinement-interactions.json`.

## Single-row navigation

Production build and TypeScript pass after removing the secondary sitewide navigation. Twenty-four checks cover Japanese/English Mac guides, the blog, and Chinese billing at 1440/1024/390 px in Chromium and WebKit: one site header row, no horizontal overflow, mobile menu access and Escape dismissal, and guide contents navigation. All 40 unique internal footer destinations return 200; footer section anchors resolve to existing IDs. Screenshots: `/tmp/aside-site-refresh/single-nav-{chromium,webkit}-{width}.png`. Harness: `/tmp/aside-nav-check.cjs`.
