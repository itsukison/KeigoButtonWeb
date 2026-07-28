/**
 * Content block model shared by articles and 例文 pages.
 *
 * Content is authored as data rather than JSX so one source can drive the
 * rendered page, the JSON-LD, the table of contents, the sitemap and the
 * plain-text llms.txt export. Adding a block type means teaching `Prose` and
 * `blocksToText` about it — nothing else.
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][]; caption?: string }
  | { type: "rewrite"; before: string; after: string; note?: string }
  | { type: "callout"; title: string; text: string }
  | { type: "tool"; href: string; label: string; note?: string }
  | { type: "cta"; heading?: string; body?: string };

/** Stable heading slug so in-page anchors survive copy edits to the body. */
export const headingId = (block: Block, index: number) =>
  block.type === "h2" && block.id ? block.id : `s${index + 1}`;

export const tableOfContents = (blocks: readonly Block[]) =>
  blocks
    .map((block, index) => ({ block, id: headingId(block, index) }))
    .filter(({ block }) => block.type === "h2")
    .map(({ block, id }) => ({ id, text: (block as { text: string }).text }));

/** Strips inline markup so the same text can go into JSON-LD and llms.txt. */
export const plain = (text: string) =>
  text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1");

/** Flattens blocks to markdown-ish plain text for the llms-full.txt export. */
export function blocksToText(blocks: readonly Block[]): string {
  const out: string[] = [];
  for (const block of blocks) {
    switch (block.type) {
      case "h2":
        out.push(`\n## ${plain(block.text)}\n`);
        break;
      case "h3":
        out.push(`\n### ${plain(block.text)}\n`);
        break;
      case "p":
        out.push(plain(block.text));
        break;
      case "ul":
      case "ol":
        out.push(block.items.map((item) => `- ${plain(item)}`).join("\n"));
        break;
      case "table":
        out.push(
          [
            `| ${block.head.join(" | ")} |`,
            `| ${block.head.map(() => "---").join(" | ")} |`,
            ...block.rows.map((row) => `| ${row.map(plain).join(" | ")} |`),
          ].join("\n"),
        );
        break;
      case "rewrite":
        out.push(
          `そのまま送ると: ${plain(block.before)}\n敬語ボタンの候補: ${plain(block.after)}${
            block.note ? `\n（${plain(block.note)}）` : ""
          }`,
        );
        break;
      case "callout":
        out.push(`**${plain(block.title)}** ${plain(block.text)}`);
        break;
      case "tool":
        out.push(`関連ツール: ${plain(block.label)} — ${block.href}`);
        break;
      case "cta":
        break;
    }
  }
  return out.join("\n\n").replace(/\n{3,}/g, "\n\n").trim();
}
