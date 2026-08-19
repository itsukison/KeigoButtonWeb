import Link from "next/link";
import type { Block } from "@/lib/blocks";
import { headingId } from "@/lib/blocks";

/**
 * `Block[]` rendered in the Mac landing's design language.
 *
 * `components/Prose.tsx` renders the same block model for the Japanese pages using
 * Tailwind utilities against that site's palette. The English guides sit beside the
 * Mac landing and have to look like it, so this is a second renderer over the same
 * data rather than a second data model — `blocksToText` and the JSON-LD keep working
 * untouched, which is the whole point of authoring content as data (seo-geo.md
 * §設計方針4). Adding a block type means teaching `Prose`, this file and
 * `blocksToText`; leaving one out breaks llms-full.txt silently.
 *
 * Every class here is either an existing `mac-landing.css` class or lives under the
 * `.mac-doc` prefix, which nothing else uses. The landing page's own styles are not
 * touched.
 */

/** `**bold**` and `[text](/href)`, which is all the inline markup the blocks use. */
function inline(text: string, key: string) {
  const parts: React.ReactNode[] = [];
  const pattern = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[1] !== undefined) {
      parts.push(<strong key={`${key}-b${i}`}>{match[1]}</strong>);
    } else {
      const href = match[3];
      const label = match[2];
      parts.push(
        href.startsWith("/") ? (
          <Link key={`${key}-l${i}`} href={href}>
            {label}
          </Link>
        ) : (
          <a key={`${key}-l${i}`} href={href}>
            {label}
          </a>
        ),
      );
    }
    last = match.index + match[0].length;
    i += 1;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function MacProse({
  blocks,
  lang = "en",
}: {
  blocks: readonly Block[];
  lang?: "ja" | "en";
}) {
  const rewriteLabels =
    lang === "ja"
      ? { before: "受信文・元の文章", after: "書き換え・返信例" }
      : { before: "Before", after: "After" };

  return (
    <div className="mac-doc__body">
      {blocks.map((block, index) => {
        const key = `b${index}`;
        switch (block.type) {
          case "h2":
            return (
              <h2 key={key} id={headingId(block, index)} className="h-heading mac-doc__h2">
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={key} className="h-heading-sm mac-doc__h3">
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={key} className="mac-doc__p">
                {inline(block.text, key)}
              </p>
            );
          case "ul":
            return (
              <ul key={key} className="mac-doc__list">
                {block.items.map((item, j) => (
                  <li key={j}>{inline(item, `${key}-${j}`)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={key} className="mac-doc__list mac-doc__list--ordered">
                {block.items.map((item, j) => (
                  <li key={j}>{inline(item, `${key}-${j}`)}</li>
                ))}
              </ol>
            );
          case "table":
            return (
              // The table scrolls inside its own container: several of these are six
              // columns wide and the page body must never scroll horizontally.
              <figure key={key} className="mac-doc__tablewrap">
                <div className="mac-doc__tablescroll">
                  <table className="mac-doc__table">
                    <thead>
                      <tr>
                        {block.head.map((cell, j) => (
                          <th key={j}>{cell}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, j) => (
                        <tr key={j}>
                          {row.map((cell, k) => (
                            <td key={k}>{inline(cell, `${key}-${j}-${k}`)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {block.caption ? (
                  <figcaption className="mac-doc__caption">{block.caption}</figcaption>
                ) : null}
              </figure>
            );
          case "rewrite":
            return (
              <div key={key} className="mac-doc__rewrite">
                <div className="mac-doc__rewriteRow">
                  <span className="mac-doc__rewriteLabel">{rewriteLabels.before}</span>
                  <p className="mac-doc__rewriteText">{block.before}</p>
                </div>
                <div className="mac-doc__rewriteRow mac-doc__rewriteRow--after">
                  <span className="mac-doc__rewriteLabel">{rewriteLabels.after}</span>
                  <p className="mac-doc__rewriteText">{block.after}</p>
                </div>
                {block.note ? <p className="mac-doc__rewriteNote">{block.note}</p> : null}
              </div>
            );
          case "callout":
            return (
              <aside key={key} className="mac-doc__callout">
                <p className="mac-doc__calloutTitle">{block.title}</p>
                <p className="mac-doc__p">{inline(block.text, key)}</p>
              </aside>
            );
          case "tool":
            return (
              <p key={key} className="mac-doc__tool">
                <Link href={block.href} className="btn btn--outline">
                  {block.label}
                </Link>
                {block.note ? <span className="mac-doc__toolNote">{block.note}</span> : null}
              </p>
            );
          case "cta":
            return null; // The page template renders one CTA of its own, at the end.
        }
      })}
    </div>
  );
}
