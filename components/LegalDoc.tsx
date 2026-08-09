import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { LEGAL } from "@/content/legal";
import { dict, href, type Lang } from "@/lib/i18n";

/** The two languages `LEGAL` holds; Japanese is the hand-written original. */
type TranslatedLang = Exclude<Lang, "ja">;

/**
 * The English and Chinese legal pages, rendered from structured blocks rather than
 * from JSX prose.
 *
 * **The Japanese originals are untouched.** They stay as hand-written JSX in
 * `app/{support,terms,privacy}/page.tsx`, because they are live legal documents and
 * mechanically re-extracting nine hundred lines of drafted Japanese to prove a
 * refactor is a risk with no upside. The translations are separate documents that
 * happen to share a renderer — which is also honest about what they are: legal texts
 * are versioned and reviewed as documents, not as interface strings.
 *
 * Every translated page opens with `prevails`. A translated privacy policy or terms
 * of service that drifts from the original creates two documents that both claim to
 * govern; naming the Japanese as authoritative is the standard way to have a
 * readable translation without that.
 */
export type Block =
  | { h2: string }
  | { h3: string }
  | { p: string }
  | { ol: string[] }
  | { ul: string[] }
  | { table: { head: [string, string]; rows: [string, string][] } };

export type LegalDocument = {
  title: string;
  metaDescription: string;
  updatedAt: string;
  lead: string;
  /** Shown above the body, in the reader's language. */
  prevails: string;
  blocks: Block[];
};

type DocKey = "support" | "terms" | "privacy";

export function legalMetadata(lang: TranslatedLang, key: DocKey): Metadata {
  const doc = LEGAL[lang][key];
  return {
    title: doc.title,
    description: doc.metaDescription,
    alternates: { canonical: href(lang, `/${key}`) },
  };
}

export function LegalDoc({ lang, docKey }: { lang: TranslatedLang; docKey: DocKey }) {
  const doc = LEGAL[lang][docKey];

  return (
    <LegalPage lang={lang} title={doc.title} updatedAt={doc.updatedAt} lead={doc.lead}>
      <p className="mb-10 rounded-xl bg-black/[0.035] px-5 py-4 text-[13px] leading-7 text-black/60">
        {doc.prevails}{" "}
        <a href={`/${docKey}`} className="link-underline" hrefLang="ja">
          {dict(lang).chrome.viewJapanese}
        </a>
      </p>
      {doc.blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </LegalPage>
  );
}

function BlockView({ block }: { block: Block }) {
  if ("h2" in block) return <h2>{block.h2}</h2>;
  if ("h3" in block) return <h3>{block.h3}</h3>;
  if ("p" in block) return <p>{block.p}</p>;
  if ("ol" in block)
    return (
      <ol>
        {block.ol.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ol>
    );
  if ("ul" in block)
    return (
      <ul>
        {block.ul.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    );
  return (
    <table>
      <thead>
        <tr>
          <th>{block.table.head[0]}</th>
          <th>{block.table.head[1]}</th>
        </tr>
      </thead>
      <tbody>
        {block.table.rows.map((row, i) => (
          <tr key={i}>
            <td>{row[0]}</td>
            <td>{row[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
