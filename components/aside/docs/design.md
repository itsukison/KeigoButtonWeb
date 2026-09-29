# Aside web system

The native direction in `laptop/design.md` is adapted for the remaining website here. The existing Mac landing keeps its own Aside composition. Web layouts use responsive CSS pixels, not the native window measurements.

## Ownership and boundaries

`AsideShell` explicitly opts a page into the new system. It supplies navigation, device-aware downloads, the shared installation dialog, and the landing’s shared `Footer` component. Server-rendered page bodies are passed through as children. `AsideHero`, `AsideStage`, and `AsideSurface` supply the shared page and status compositions. `app/aside.css` contains the scoped styles; it does not modify root typography or the existing landing modifier.

Migrated routes:

- Japanese tools: `/keigo-henkan`, `/bunsho-kosei-ai`, `/bunsho-sakusei-ai`, `/keigo-check`, `/keigo-test`.
- `/reibun` and its example pages, `/blog` and general articles.
- Mac use cases in Japanese and English; the four English guides, `/en/rewrite`, and `/en/reply-generator`.
- Billing success, cancellation, and portal-return screens in all three languages; `/legal`.

Protected routes retain the original page styling: `/iphone`, support/terms/privacy in every language, `/blog/ai-keyboard-osusume`, and `/blog/iphone-keigo-keyboard`. `LegalPage` defaults to `appearance="legacy"`; only `/legal` opts into Aside. The article template also explicitly retains the original renderer for the two protected articles. `Prose` defaults to legacy, with an opt-in Aside appearance for general articles. Every component within an Aside page uses desktop typography and colors, including iPhone/iOS/keyboard sections and App Store promotions. Their content and destinations are preserved; legacy appearance is selected only by protected pages. Existing content, SEO metadata, anchors, API contracts, and entitlement copy remain authoritative.

## Visual roles

- Canvas `#FCFEFE`, work surface white, secondary plane `#F1F9FC`.
- Ink `#111111`, secondary text `#606A70`, primary action `#171919`.
- Blue text/focus `#006FC9`, selection `#E5F4FE`, indicator `#009AF5`. Blue is not the default primary button fill.
- System typography with Japanese and Simplified Chinese fallbacks; regular display headings, medium section headings. Long headings wrap; forms remain opaque.
- Desktop headers pair copy with a bounded illustration. Tool workspaces use a scenic outer frame around white fields. Long-form documents use a reading column and contents rail, which moves above the body on smaller screens.
- Billing uses a distinct status mark and one return-to-app action. A return screen does not independently verify payment or entitlement state.

Artwork in `public/mac/aside/` uses the supplied blue, pink, orange, glow, and mountain files. `mascot.png` is copied intact from the native app's high-resolution `MascotPortrait` asset, avoiding enlargement of the 128 px navigation mark. Decorative art has explicit bounds, no interaction, and no parallax. The footer artwork loads lazily. Ordinary text is outside the detailed artwork or on an opaque surface.

## Downloads, dialog, and icons

Eligible Mac download links are handled by the shell, which starts the configured installer URL once and shows the common four-step guide. Modified clicks retain browser behavior. Phones and iPads keep the App Store primary action. The existing landing still owns its own download initiation and simply renders the same dialog.

`DownloadModal` portals a native `<dialog>` to the document body. Its stylesheet owns its fonts and colors independently of either page theme. `showModal()` makes the background inert; explicit Tab wrapping keeps focus inside the dialog, including at the browser chrome boundary. Escape, the close button, and a backdrop click dismiss it. Focus and body scrolling are restored on unmount. The steps use neutral, bounded vector scenes with the neutral keycap icon, without colorful backdrop artwork. Navigation and the shared footer use that same icon. The steps remain visible without animation; narrow layouts stack them in a scrollable dialog.

The browser icon keeps the keycap identity on a pale neutral tile. `scripts/make-favicon.py` produces 16/32/48 px ICO, 192 px PNG, and 180 px touch PNG from the high-resolution mascot. Original icons live untouched under `public/icons/legacy/`. Metadata selects those originals on protected routes. The conventional `/favicon.ico` fallback is a public file, not an App Router metadata file that would inject the new icon into every protected page.

## Verification requirements

Run the production build and TypeScript. Inspect 1440/1024/390 px in all available languages. Exercise downloaded-file initiation with intercepted attachments; tool loading, results, errors and quotas with deterministic HTTP responses; clipboard actions; the full quiz; all billing deep links; keyboard navigation and modal recovery. Real billing and AI calls are not required for a visual migration.

Compare protected pages and the landing against baseline captures. Verify both direct visits and client navigation, since Next.js can retain stylesheets after a route changes. Check heading readability, image crops, horizontal overflow, primary-action contrast, reduced motion, and WebKit. Report task-specific results separately from these ongoing requirements.

## Navigation and internal links

Aside pages have one header row: brand/home, product features, pricing, the main localized writing-tool entry (FAQ in Chinese), language, and the device-aware download. Below 1080 px, a compact Menu discloses the primary links and language choices; it does not add a second navigation row. Escape closes the disclosure and restores focus. Page contents navigation remains inside the document and uses the shorter header offset.

The shared landing footer groups product links, writing tools, and guides, with support/legal/contact in the company area. Keep the Japanese proofreading and composition tools and English reply generator linked here alongside the converter and guide clusters. Index pages, related-content links, and contextual article links carry deeper discovery. Use real anchors with descriptive labels; do not recreate a sitewide keyword list beneath the header. The landing footer remains the shared visual component.

This follows the internal-link distribution in `Japanese/docs/marketing/gtm/seo-geo.md`, Google's [crawlable-link guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable), and NN/g's [footer navigation guidance](https://www.nngroup.com/articles/footers/).
