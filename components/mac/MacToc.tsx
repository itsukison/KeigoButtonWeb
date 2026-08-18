/**
 * The sticky section rail beside a document page.
 *
 * Built from the same `Block[]` the page renders, via `tableOfContents`, so a
 * heading cannot appear in the article and be missing from the index — the
 * failure that makes hand-written contents lists rot. `/en/rewrite` composes its
 * sections in JSX rather than blocks, so it passes `items` directly; the shape is
 * the same either way.
 *
 * Rendered only when there is something to navigate. Two entries is a list, not a
 * table of contents, and the Japanese article page already uses the same
 * threshold (`app/blog/[slug]/page.tsx`).
 */
export type TocItem = { id: string; text: string };

export function MacToc({ items, label = "On this page" }: { items: TocItem[]; label?: string }) {
  if (items.length < 3) return null;

  return (
    <aside className="mac-doc__toc" aria-label={label}>
      <p className="mac-doc__tocHeading">{label}</p>
      <nav className="mac-doc__tocList">
        {items.map((item) => (
          <a key={item.id} href={`#${item.id}`}>
            {item.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
