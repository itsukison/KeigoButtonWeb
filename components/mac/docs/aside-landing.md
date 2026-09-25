# Mac landing appearance

The requested Aside refresh applies only to `/`, `/en`, and `/zh`. It adapts the
native palette and typography in `laptop/design.md` for these landing pages under
this request; it does not expand that native specification into a shared site theme.
The iPhone pages, guides, tools, metadata and social preview retain their appearance.

`MacHome` selects `mac-landing--aside`. The override block at the end of
`app/mac-landing.css` is scoped beneath that modifier; preserve it when updating
shared Mac CSS. `Footer` defaults to its existing appearance, and the landing's
`App` explicitly selects `appearance="aside"`.

`public/mac/aside/moutain.png` and `gradient.png` are byte-identical copies of the
supplied laptop assets. Both reserve their original 1672 × 941 dimensions and use
bounded aspect-fill crops. The mountain sits behind an opaque editor. The footer
lazily loads the glow in its own strip; all footer text sits on opaque pale cyan.
The empty purple interlude is omitted without changing content section order.

Product previews retain their own font, locale weights, dark colors, compact type,
generation ring and five-phase timing. On narrow screens the complete hero overlay
scales together to fit, and navigation spacing tightens to keep all controls visible.

## Verification

- Production build and standalone TypeScript check passed.
- Before/after full-page captures inspected for Japanese, English and Chinese at
  1440, 1024 and 390 px; no horizontal overflow. Checked headings, crops, stages,
  pricing alignment and footer readability.
- Production Chromium checks passed across all nine combinations: download buttons
  and four-step modal, dismissal, pricing cycles, FAQ toggles, language switching,
  section anchors and blue keyboard focus. Download requests were intercepted as
  test attachments; no release binary was downloaded or installed.
- Complete idle → hover → generating → result → done → idle sequence verified in
  all three languages at 1440 and 390 px with the browser clock. Every phase fits
  the scene. Reduced-motion captures park on the expanded bar with the ring stopped.
- WebKit smoke checks passed for all three languages at 390 px.
- Links, headings and JSON-LD match before/after. Both supplied originals are intact.
- `/en/mac/reply-assistant`, `/en/rewrite`, and `/keigo-henkan` screenshots are
  pixel-identical before/after at all three widths. `/iphone` layout and typography
  match; pixel differences are confined to its existing animated phone demo.
- Contrast: body on canvas 5.47:1; body on pale cyan 5.19:1; blue links on pale cyan
  4.78:1; white primary-button text 17.65:1. Text never overlays the scenic artwork.

Local captures and browser harnesses for this pass are in
`/tmp/mac-landing-refresh/` (temporary verification evidence). No deployment included.
