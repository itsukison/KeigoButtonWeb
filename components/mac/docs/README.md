# Where this came from

`components/mac/` began as a standalone Vite prototype at `laptop/landing/`. The
prototype was retired once this copy became the production page — two copies of one
landing page is how they fall out of step, and it happened: a round of localization
work was done against the prototype before anyone noticed production was here.

`content.md` moved with it because **five files in `components/mac/` cite it by
section** (`content.md §10`, `R1`, `R6`, `R10`, `§2`). It is the copy deck and the
reference notes behind the page — including the sections that were cut and are still
recoverable from it.

Not moved: `landing_reference/`, ~10 MB of design screenshots the layout was measured
against. It has no code citing it and does not belong in a deployed repo; it stays
wherever the design material is kept.
