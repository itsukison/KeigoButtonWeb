import type { ReactNode } from "react";
import Link from "next/link";
import { type Block, headingId } from "@/lib/blocks";
import { AppCta } from "@/components/SiteChrome";

/**
 * Renders `**bold**` and `[label](/path)` inside body copy. Deliberately not a
 * markdown parser — content is authored in this repo, so the supported syntax
 * is exactly what the pages use.
 */
function inline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let cursor = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index));

    if (match[1] && match[2]) {
      const href = match[2];
      nodes.push(
        href.startsWith("/") ? (
          <Link key={key++} href={href} className="font-medium underline decoration-black/25 underline-offset-[3px] hover:decoration-black">
            {match[1]}
          </Link>
        ) : (
          <a
            key={key++}
            href={href}
            rel={href.includes("keigobutton.com") ? undefined : "nofollow noopener"}
            target="_blank"
            className="font-medium underline decoration-black/25 underline-offset-[3px] hover:decoration-black"
          >
            {match[1]}
          </a>
        ),
      );
    } else {
      nodes.push(
        <strong key={key++} className="font-bold text-black">
          {match[3]}
        </strong>,
      );
    }
    cursor = pattern.lastIndex;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

export function Prose({ blocks }: { blocks: readonly Block[] }) {
  return (
    <div className="flex flex-col">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={index}
                id={headingId(block, index)}
                className="mt-14 scroll-mt-28 font-display text-[22px] font-semibold leading-[1.4] tracking-tight text-black first:mt-0 lg:text-[27px]"
              >
                {inline(block.text)}
              </h2>
            );

          case "h3":
            return (
              <h3 key={index} className="mt-9 font-display text-[17px] font-semibold leading-[1.5] text-black lg:text-[19px]">
                {inline(block.text)}
              </h3>
            );

          case "p":
            return (
              <p key={index} className="mt-5 text-[15px] leading-[1.95] text-black/70">
                {inline(block.text)}
              </p>
            );

          case "ul":
            return (
              <ul key={index} className="mt-5 flex flex-col gap-2.5">
                {block.items.map((item, i) => (
                  <li key={i} className="flex gap-3 text-[15px] leading-[1.9] text-black/70">
                    <span aria-hidden="true" className="mt-[11px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#C8BCFA]" />
                    <span>{inline(item)}</span>
                  </li>
                ))}
              </ul>
            );

          case "ol":
            return (
              <ol key={index} className="mt-5 flex flex-col gap-3">
                {block.items.map((item, i) => (
                  <li key={i} className="flex gap-3.5 text-[15px] leading-[1.9] text-black/70">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F1EEFC] text-[12px] font-bold text-[#5B4BA8]">
                      {i + 1}
                    </span>
                    <span>{inline(item)}</span>
                  </li>
                ))}
              </ol>
            );

          case "table":
            return (
              <figure key={index} className="mt-7">
                <div className="overflow-x-auto rounded-2xl border border-black/10">
                  <table className="w-full border-collapse text-left text-[13.5px]">
                    <thead>
                      <tr className="bg-[#F7F6FC]">
                        {block.head.map((cell) => (
                          <th key={cell} className="whitespace-nowrap px-4 py-3 font-bold text-black">
                            {cell}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, r) => (
                        <tr key={r} className="border-t border-black/[0.08]">
                          {row.map((cell, c) => (
                            <td key={c} className="px-4 py-3 align-top leading-[1.8] text-black/70">
                              {inline(cell)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {block.caption ? (
                  <figcaption className="mt-2.5 text-[12px] leading-6 text-black/40">{block.caption}</figcaption>
                ) : null}
              </figure>
            );

          case "rewrite":
            return (
              <div key={index} className="mt-7 overflow-hidden rounded-[22px] border border-black/[0.08] bg-[#FAFAFB] p-5">
                <div className="rounded-2xl bg-[#EFEAFD] px-4 py-3.5">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-[#5B4BA8]/70">
                    そのまま送ると
                  </span>
                  <p className="mt-1.5 text-[14px] font-semibold leading-[1.75] text-black/55">{block.before}</p>
                </div>
                <div className="my-2 flex justify-center text-black/25" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                  </svg>
                </div>
                <div className="rounded-2xl border border-black/10 bg-white px-4 py-3.5">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-black/35">
                    敬語ボタンの候補
                  </span>
                  <p className="mt-1.5 text-[14px] font-bold leading-[1.75] text-black">{block.after}</p>
                </div>
                {block.note ? (
                  <p className="mt-3.5 text-[12.5px] leading-7 text-black/45">{inline(block.note)}</p>
                ) : null}
              </div>
            );

          case "callout":
            return (
              <div key={index} className="mt-7 rounded-[20px] border border-[#C8BCFA]/60 bg-[#F7F6FC] px-5 py-4">
                <span className="text-[12px] font-bold text-[#5B4BA8]">{block.title}</span>
                <p className="mt-1.5 text-[14px] leading-[1.9] text-black/70">{inline(block.text)}</p>
              </div>
            );

          case "tool":
            return (
              <Link
                key={index}
                href={block.href}
                className="group mt-7 flex items-center justify-between gap-4 rounded-[20px] border border-black/10 bg-white px-5 py-4 transition-colors hover:border-black/25"
              >
                <span>
                  <span className="block text-[14px] font-bold text-black">{block.label}</span>
                  {block.note ? (
                    <span className="mt-1 block text-[12.5px] leading-6 text-black/45">{block.note}</span>
                  ) : null}
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-black/30 transition-transform group-hover:translate-x-0.5 group-hover:text-black"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            );

          case "cta":
            return (
              <div key={index} className="mt-12">
                <AppCta heading={block.heading} body={block.body} />
              </div>
            );
        }
      })}
    </div>
  );
}
