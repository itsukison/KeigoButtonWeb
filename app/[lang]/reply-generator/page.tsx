import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnRewriter } from "@/components/mac/EnRewriter";
import { MacDocShell } from "@/components/mac/MacDocShell";
import { MacToc } from "@/components/mac/MacToc";
import { enGuide } from "@/content/en-guides";
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
 * `/en/reply-generator` — the free English reply tool.
 *
 * **Why this page exists and why it is not a mode on `/en/rewrite`.** Measured
 * 2026-08-22, `ai reply generator` is 720/month at KD 0 — the largest winnable
 * English term we found, and roughly 70× the term the English cluster was built on
 * (`grammarly alternative for mac`, 10/month). The SERP was checked the same day:
 * ranks 1–20 are all free no-login tool pages (planable, sitegpt, QuillBot, amie,
 * mailmeteor, toolsaday, heymarket), plus a Google Play listing at #3. That is a
 * tool-page query, not a product-page query, so `/en/mac/reply-assistant` — which
 * describes the Mac feature — cannot serve it. Full measurement in seo-geo.md
 * §前提の修正（2026-08-22）.
 *
 * **What this page is worth, honestly.** The visitor here wants one reply written
 * now, not a $120/year Mac app. Its job is the same as `/en/rewrite`'s: dwell,
 * return visits, links, and a path into the app for the subset who do this all day.
 * Do not judge it on downloads.
 *
 * `en_reply` is a `web-rewrite` mode (deployed 2026-08-22, v7, verified in
 * production). It takes the message you received as input, not your own draft.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "en" }];
}

const TOC = [
  { id: "how", text: "How to use it" },
  { id: "two", text: "Why two replies" },
  { id: "limits", text: "The limits, stated plainly" },
  { id: "app", text: "Replying all day" },
  { id: "faq-heading", text: "Frequently asked questions" },
];

const FAQ = [
  {
    q: "Is this AI reply generator free?",
    a: "Yes — five replies a day, up to 300 characters of incoming message each, with no account and no card. The limit is per IP address, so a shared office or campus connection may reach it sooner than you expect.",
  },
  {
    q: "What do I paste in — my reply or the message I received?",
    a: "The message you received. The tool reads it and writes the body of a reply. If you already have a draft and only want it corrected or made more professional, use the free English rewriter instead.",
  },
  {
    q: "Will it invent details I did not give it?",
    a: "It is instructed not to. It will not add dates, prices or commitments that the incoming message does not contain, which means a reply that needs a specific answer will come back general — you fill in the specifics. Read it before you send it; it is a draft, not an autoresponder.",
  },
  {
    q: "Can it reply to social comments and reviews, or only email?",
    a: "Anything you can paste as text: email, Slack, LinkedIn messages, support tickets, comments and reviews. It does not connect to your inbox or your social accounts, and it never sends anything on your behalf.",
  },
  {
    q: "Is my text stored or used to train a model?",
    a: "The message is sent to the model so the reply can be produced, and it is not retained on the server once the response is returned. Do not paste anything confidential into a free browser tool — including customer data you would not put in a chat assistant.",
  },
  {
    q: "How is this different from ChatGPT?",
    a: "For one reply, barely at all — a chat assistant does the same job, and you can steer it further. This is faster to reach because you do not write a prompt. The real difference appears at volume: this is still a browser tab you copy into and paste back from, which is the loop the Mac app exists to remove.",
  },
];

export const metadata: Metadata = {
  title: {
    absolute: "AI Reply Generator — Free, No Login, Any Message",
  },
  description:
    "Paste the message you received and get a reply written for you. Works for email, Slack, LinkedIn, support tickets, comments and reviews. Free, no account, five replies a day.",
  keywords: [
    "ai reply generator",
    "ai response generator",
    "free reply generator no login",
    "ai email reply generator",
    "reply to message ai",
  ],
  alternates: { canonical: "/en/reply-generator" },
  openGraph: {
    title: "AI Reply Generator — Free, No Login",
    description:
      "Paste the message you received and get a reply written for you. Free, no account, five a day.",
    url: "/en/reply-generator",
    locale: "en_US",
    type: "website",
    images: [{ url: "/mac-footer.png", alt: "KeigoButton" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Reply Generator — Free, No Login",
    description:
      "Paste the message you received and get a reply written for you. Free, no account.",
    images: ["/mac-footer.png"],
  },
};

export default async function EnReplyGeneratorPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (lang !== "en") notFound();

  const url = `${SITE_URL}/en/reply-generator`;

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
                name: "AI Reply Generator",
                url,
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Any (web browser)",
                inLanguage: "en",
                isAccessibleForFree: true,
                offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
                featureList: [
                  "Draft a reply to any message you paste in",
                  "Two replies per run: straightforward and more formal",
                  "Works for email, chat, tickets, comments and reviews",
                  "No account and no connection to your inbox",
                ],
                publisher: { "@id": organizationNode["@id"] },
              },
              {
                "@type": "HowTo",
                "@id": `${url}#howto`,
                name: "How to generate a reply to a message",
                inLanguage: "en",
                totalTime: "PT1M",
                step: [
                  {
                    "@type": "HowToStep",
                    name: "Paste the message you received",
                    text: "Copy the email, chat message, ticket or comment you need to answer and paste it into the box. Up to 300 characters on the free tier.",
                    url: `${url}#how`,
                  },
                  {
                    "@type": "HowToStep",
                    name: "Press Rewrite",
                    text: "Two replies come back: a straightforward one and a more formal one.",
                    url: `${url}#how`,
                  },
                  {
                    "@type": "HowToStep",
                    name: "Add the specifics and send",
                    text: "Fill in any date, price or commitment the reply left general, read it once, then copy it into your mail or chat client.",
                    url: `${url}#how`,
                  },
                ],
              },
              faqNode(FAQ),
              breadcrumbNode([
                { name: "KeigoButton", path: "/en" },
                { name: "AI reply generator", path: "/en/reply-generator" },
              ]),
            ),
          ).replace(/</g, "\\u003c"),
        }}
      />

      <MacDocShell lang="en">
        <article className="shell mac-doc">
          <div className="mac-doc__wrap">
            <header className="mac-doc__head">
              <p className="eyebrow">Free tool</p>
              <h1 className="h-display">
                Paste the message. Get the reply.
              </h1>
              <p className="mac-doc__lead">
                An AI reply generator for the messages you keep putting off.
                Paste what you received — email, Slack, LinkedIn, a support
                ticket, a review — and get a reply written for you. No account,
                five a day, free.
              </p>
            </header>

            <div className="mac-doc__layout">
              <div className="mac-doc__main">
                <EnRewriter initialMode="en_reply" modes={["en_reply"]} />

                <div className="mac-doc__body">
                  <h2 className="h-heading mac-doc__h2" id="how">
                    How to use it
                  </h2>
                  <ul className="mac-doc__list">
                    <li>
                      <strong>Paste the incoming message, not your draft.</strong>{" "}
                      This tool reads what was sent to you and answers it. If you
                      already wrote a reply and want it corrected or softened,
                      the <Link href="/en/rewrite">free English rewriter</Link>{" "}
                      is the right tool.
                    </li>
                    <li>
                      <strong>Add the specifics yourself.</strong> The reply will
                      not invent a date, a price or a promise that the message
                      did not contain, so anything that needs a real answer comes
                      back general on purpose.
                    </li>
                    <li>
                      <strong>Read it before you send it.</strong> It is a draft.
                      Nothing is sent on your behalf, and the tool has no access
                      to your inbox or your accounts.
                    </li>
                  </ul>

                  <h2 className="h-heading mac-doc__h2" id="two">
                    Why two replies instead of one
                  </h2>
                  <p className="mac-doc__p">
                    How formal a reply should be is a judgement about the
                    relationship, and no tool can make it for you. One answer
                    hides that choice; two show the range — the first
                    straightforward, the second a step more formal — so you pick
                    rather than accept. It also makes it obvious when the model
                    has misread the message, which a single confident answer does
                    not.
                  </p>

                  <h2 className="h-heading mac-doc__h2" id="limits">
                    The limits, stated plainly
                  </h2>
                  <ul className="mac-doc__list">
                    <li>
                      <strong>Five a day, 300 characters of input.</strong> The
                      cap is per IP address, so a shared office or campus
                      connection will hit it sooner than one person would.
                    </li>
                    <li>
                      <strong>Your text is sent to a server.</strong> It is not
                      kept after the reply is produced, but it does leave your
                      machine. Do not paste customer data or anything
                      confidential into a free browser tool.
                    </li>
                    <li>
                      <strong>It does not know your context.</strong> It sees one
                      pasted message — not the thread, not the account history,
                      not what you agreed last week. Long negotiations are not
                      what this is for.
                    </li>
                    <li>
                      <strong>It is still a browser tab.</strong> You copy in and
                      paste back, once per reply. That loop is fine occasionally
                      and miserable thirty times a day.
                    </li>
                  </ul>

                  <aside className="mac-doc__callout">
                    <p className="mac-doc__calloutTitle">
                      Free alternatives worth knowing about
                    </p>
                    <p className="mac-doc__p">
                      Gmail has Smart Reply built in, and if you have an Apple
                      silicon Mac, Writing Tools is part of macOS and runs much of
                      its work on-device. Both are free and neither costs you a
                      copy-paste. We would rather you knew that than found out
                      afterwards — the wider comparison is in{" "}
                      <Link href="/en/ai-writing-apps-mac">
                        AI writing assistants for Mac
                      </Link>
                      .
                    </p>
                  </aside>

                  <h2 className="h-heading mac-doc__h2" id="app">
                    If you reply to messages all day
                  </h2>
                  <p className="mac-doc__p">
                    This page is the demo. The product is a small bar at the
                    bottom of your Mac screen: copy the message you received, put
                    your cursor in the reply field, hover the bar, and the reply
                    is written straight into the field you are already in — in
                    Mail, Slack, Gmail, Notion or anywhere else you can put a
                    cursor. The buttons are instructions you write once, and they
                    sync to an iPhone keyboard so the same ones are on your phone.
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
                  <h2 className="h-heading-sm">
                    Reply without leaving the reply field
                  </h2>
                  <p className="mac-doc__p">
                    50 rewrites a month free, no card. macOS 14 or later, Apple
                    silicon and Intel.
                  </p>
                  <div className="mac-doc__ctaActions">
                    <a
                      className="btn btn--filled btn--lg"
                      href={MAC_DOWNLOAD_URL}
                    >
                      Download for Mac
                    </a>
                    <a
                      className="btn btn--outline btn--lg"
                      href={APP_STORE_URL}
                    >
                      Get it for iPhone
                    </a>
                  </div>
                </section>

                <section aria-labelledby="related-heading">
                  <h2 id="related-heading" className="h-heading mac-doc__h2">
                    Keep reading
                  </h2>
                  <div className="mac-doc__related">
                    <Link
                      href="/en/mac/reply-assistant"
                      className="mac-doc__relatedCard"
                    >
                      <span className="mac-doc__relatedTitle">
                        AI Reply Assistant for Mac — Draft Replies in Any App
                      </span>
                      <span className="mac-doc__relatedNote">How it works</span>
                    </Link>
                    <Link href="/en/rewrite" className="mac-doc__relatedCard">
                      <span className="mac-doc__relatedTitle">
                        Free English rewriter
                      </span>
                      <span className="mac-doc__relatedNote">Free tool</span>
                    </Link>
                    <Link
                      href="/en/ai-writing-apps-mac"
                      className="mac-doc__relatedCard"
                    >
                      <span className="mac-doc__relatedTitle">
                        {enGuide("ai-writing-apps-mac")?.title}
                      </span>
                      <span className="mac-doc__relatedNote">Comparisons</span>
                    </Link>
                  </div>
                </section>
              </div>

              <MacToc items={TOC} />
            </div>
          </div>
        </article>
      </MacDocShell>
    </div>
  );
}
