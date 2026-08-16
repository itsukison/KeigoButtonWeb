import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnRewriter } from "@/components/mac/EnRewriter";
import { MacDocShell } from "@/components/mac/MacDocShell";
import {
  APP_STORE_URL,
  MAC_DOWNLOAD_URL,
  SITE_URL,
  breadcrumbNode,
  faqNode,
  graph,
  macSoftwareApplicationNode,
  organizationNode,
  websiteNodeFor,
} from "@/lib/site";
import "../../mac-landing.css";

/**
 * `/en/rewrite` — the free English rewriter.
 *
 * **English only.** `generateStaticParams` returns just `en`, so `/zh/rewrite` is
 * never built: a 简体中文 reader writes Japanese (`AGENTS.md` §17) and the Japanese
 * tool at `/keigo-henkan` already serves them.
 *
 * **Why the page has a body at all.** A tool page with nothing but the tool ranks for
 * nothing — seo-geo.md §設計方針6 is explicit that a visitor who does not use the
 * widget still has to find the answer to the query they arrived on. So the modes,
 * the limits and the honest comparison against the free alternatives are written out
 * below the tool.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "en" }];
}

const FAQ = [
  {
    q: "Is this English rewriter free?",
    a: "Yes — five rewrites a day, up to 300 characters each, with no account and no card. The limit is per IP address, so a shared office or campus connection may reach it sooner than you expect. The Mac app includes 50 rewrites a month free with no daily cap.",
  },
  {
    q: "Will my text be stored or used to train a model?",
    a: "The text is sent to the model so the rewrite can be produced, and it is not retained on the server once the response is returned. If you would rather nothing left your machine at all, Apple Intelligence Writing Tools runs much of its work on-device and is free on Apple silicon Macs.",
  },
  {
    q: "How is this different from ChatGPT?",
    a: "For a single sentence, it is not very different — this is faster to reach, but a chat assistant will do the same job. The difference shows up at volume: this tool still means copying your text into a browser tab and pasting the result back. The Mac app removes that round trip, which is the whole reason it exists.",
  },
  {
    q: "Is it good enough for non-native English writers?",
    a: "That is the case it is built for. The Grammar mode corrects mistakes while leaving your sentence structure alone, and the Natural mode fixes phrasing that is technically correct but reads as translated. Both return two candidates so you can see the range rather than accept one answer.",
  },
];

export const metadata: Metadata = {
  title: { absolute: "Free English Rewriter — Make Your Writing Sound Natural" },
  description:
    "Paste a sentence and get it rewritten: fix the grammar, make it sound natural, make it professional, or make it shorter. Free, no account, five rewrites a day.",
  keywords: [
    "english rewriter",
    "make my english sound natural",
    "professional email rewriter",
    "free sentence rewriter",
    "fix my english grammar online",
  ],
  alternates: { canonical: "/en/rewrite" },
  openGraph: {
    title: "Free English Rewriter",
    description:
      "Fix the grammar, make it sound natural, make it professional, or make it shorter. Free, no account.",
    url: "/en/rewrite",
    locale: "en_US",
    type: "website",
    images: [{ url: "/mac-footer.png", alt: "KeigoButton" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free English Rewriter",
    description: "Fix the grammar, make it natural, make it professional. Free, no account.",
    images: ["/mac-footer.png"],
  },
};

export default async function EnRewritePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (lang !== "en") notFound();

  const url = `${SITE_URL}/en/rewrite`;

  return (
    <div className="mac-landing">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            graph(
              organizationNode,
              websiteNodeFor("en"),
              macSoftwareApplicationNode("en"),
              {
                "@type": "WebApplication",
                "@id": `${url}#tool`,
                name: "Free English Rewriter",
                url,
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Any (web browser)",
                inLanguage: "en",
                isAccessibleForFree: true,
                offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
                featureList: [
                  "Rewrite English so it reads naturally",
                  "Correct grammar without changing your voice",
                  "Rewrite for a manager or a client",
                  "Shorten while keeping every detail",
                ],
                publisher: { "@id": organizationNode["@id"] },
              },
              faqNode(FAQ),
              breadcrumbNode([
                { name: "KeigoButton", path: "/en" },
                { name: "Free English rewriter", path: "/en/rewrite" },
              ]),
            ),
          ).replace(/</g, "\\u003c"),
        }}
      />

      <MacDocShell lang="en">
        <article className="shell mac-doc">
          <header className="mac-doc__head">
            <p className="eyebrow">Free tool</p>
            <h1 className="h-display">Make your English sound the way you meant it.</h1>
            <p className="mac-doc__lead">
              Paste the message you were about to send. Fix the grammar, make it read
              naturally, make it safe to send to a client, or cut it in half. No account,
              five a day, free.
            </p>
          </header>

          <EnRewriter />

          <div className="mac-doc__body">
            <h2 className="h-heading mac-doc__h2" id="modes">
              What the four modes actually do
            </h2>
            <ul className="mac-doc__list">
              <li>
                <strong>Natural</strong> — for writing that is grammatically fine but reads
                as translated. It fixes word order, collocations and the small idiom
                choices that mark a sentence as non-native, without changing your meaning.
              </li>
              <li>
                <strong>Grammar</strong> — the conservative one. It corrects mistakes and
                leaves everything else alone, including sentence structure and register.
                Use it when you want to sound like yourself, only correct.
              </li>
              <li>
                <strong>Professional</strong> — for a manager, a client, or someone you do
                not know. Blunt instructions become polite requests; it aims for warm and
                direct rather than stiff.
              </li>
              <li>
                <strong>Shorter</strong> — cuts hedging and filler and moves the ask to the
                front, while keeping every name, number, date and deadline.
              </li>
            </ul>

            <h2 className="h-heading mac-doc__h2" id="two">
              Why two candidates instead of one
            </h2>
            <p className="mac-doc__p">
              One answer looks authoritative and hides the fact that register is a choice.
              Two lets you see the range — the first is straightforward, the second is a
              step more polished — and pick the one that fits who you are writing to. It
              also makes it obvious when the model has misread you, which a single
              confident answer does not.
            </p>

            <h2 className="h-heading mac-doc__h2" id="limits">
              The limits, stated plainly
            </h2>
            <ul className="mac-doc__list">
              <li>
                <strong>Five a day, 300 characters.</strong> The cap is per IP address, so a
                shared office or campus connection will hit it sooner than one person would.
              </li>
              <li>
                <strong>Your text is sent to a server.</strong> It is not kept after the
                rewrite, but it does leave your machine. If that is not acceptable, use a
                tool that runs locally.
              </li>
              <li>
                <strong>It edits; it does not draft.</strong> Give it something to work on.
                For writing from nothing, or for talking through what to say, a chat
                assistant is the better tool.
              </li>
              <li>
                <strong>It is still a browser tab.</strong> You copy in and paste back —
                which is the exact loop the Mac app exists to remove.
              </li>
            </ul>

            <aside className="mac-doc__callout">
              <p className="mac-doc__calloutTitle">Free alternatives worth knowing about</p>
              <p className="mac-doc__p">
                If you have an Apple silicon Mac, Writing Tools is built into macOS, costs
                nothing and runs much of its work on-device — right-click any selected text.
                Grammarly and LanguageTool both have genuinely useful free tiers for
                correction. We would rather you knew that than found out afterwards; the
                comparison is written out in{" "}
                <Link href="/en/ai-writing-apps-mac">AI writing apps for Mac</Link>.
              </p>
            </aside>

            <h2 className="h-heading mac-doc__h2" id="app">
              The same thing, without the copy and paste
            </h2>
            <p className="mac-doc__p">
              This page is the demo. The product is a small bar at the bottom of your Mac
              screen: hover it, press one of your own buttons, and the text you are already
              typing is rewritten in place — in Mail, Slack, Gmail, Notion, Word or anywhere
              else you can put a cursor. The buttons are instructions you write once, and
              they sync to an iPhone keyboard so the same ones are there on your phone.
            </p>
          </div>

          <section className="mac-doc__faq" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="h-heading mac-doc__h2">
              Frequently asked questions
            </h2>
            {FAQ.map((item) => (
              <div key={item.q} className="mac-doc__faqItem">
                <p className="mac-doc__faqQ">{item.q}</p>
                <p className="mac-doc__p">{item.a}</p>
              </div>
            ))}
          </section>

          <section className="mac-doc__cta">
            <h2 className="h-heading-sm">Stop pasting into a browser tab</h2>
            <p className="mac-doc__p">
              50 rewrites a month free, no card. macOS 14 or later, Apple silicon and Intel.
            </p>
            <div className="mac-doc__ctaActions">
              <a className="btn btn--filled btn--lg" href={MAC_DOWNLOAD_URL}>
                Download for Mac
              </a>
              <a className="btn btn--outline btn--lg" href={APP_STORE_URL}>
                Get it for iPhone
              </a>
            </div>
          </section>

          <section aria-labelledby="related-heading">
            <h2 id="related-heading" className="h-heading mac-doc__h2">
              Keep reading
            </h2>
            <div className="mac-doc__related">
              <Link href="/en/ai-writing-apps-mac" className="mac-doc__relatedCard">
                <span className="mac-doc__relatedTitle">
                  AI writing apps for Mac that work in every app
                </span>
                <span className="mac-doc__relatedNote">Comparisons</span>
              </Link>
              <Link href="/en/grammarly-alternative-mac" className="mac-doc__relatedCard">
                <span className="mac-doc__relatedTitle">
                  Grammarly alternatives for Mac, compared honestly
                </span>
                <span className="mac-doc__relatedNote">Comparisons</span>
              </Link>
              <Link href="/en/rewrite-text-any-app-mac" className="mac-doc__relatedCard">
                <span className="mac-doc__relatedTitle">
                  How to rewrite text in any app on your Mac
                </span>
                <span className="mac-doc__relatedNote">How it works</span>
              </Link>
            </div>
          </section>
        </article>
      </MacDocShell>
    </div>
  );
}
