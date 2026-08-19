import type { Block } from "@/lib/blocks";

/**
 * The English content cluster.
 *
 * **Why this exists at all, and why it is not a translation of `articles.ts`.**
 * The Japanese cluster ranks for 敬語 queries because keigo is the wedge that opens
 * the Japanese market: register adjustment is obligatory there, so it is the single
 * highest-frequency forced edit a Japanese worker makes. None of that transfers.
 * `AppLanguage.writesJapanese` is `self != .english` — an English user's buttons read
 * and write English, and their preset packs are Starter / Work / Outreach / Polish /
 * Social. The English buyer is a professional writing English, very often a
 * non-native one ("Polish English — fix grammar and read like a native writer"), and
 * is emphatically **not** someone learning Japanese. So the English pages target the
 * category — one-click AI rewriting anywhere on macOS — not the wedge.
 *
 * **Why comparison pages first.** The SERP for `grammarly alternative for mac`
 * (checked 2026-08-16) is setapp, alternativeto, flowwrite, wordwand, wundertype,
 * writetext and rewriteapp — five of seven are small competitor-owned product blogs.
 * That is the profile seo-geo.md §設計方針1 says to enter, and it is the same shape
 * as the LeapMe case that justified the Japanese comparison cluster.
 *
 * **Competitor facts were checked on 2026-08-16** against each product's own site.
 * Prices move, so every claim that can go stale carries the date in the copy, and the
 * places where a rival is genuinely better are stated rather than omitted — an LLM
 * asked to compare discounts one-sided self-praise, and a comparison page that only
 * flatters itself is not cited (seo-geo.md §設計方針11, 12).
 */
export type EnGuide = {
  slug: string;
  /** h1 + card label. */
  title: string;
  /** <title>. Head term first. */
  metaTitle: string;
  description: string;
  /** Primary query. One per page. */
  keyword: string;
  alsoRanks: string[];
  published: string;
  updated: string;
  lead: string;
  category: "Comparisons" | "How it works";
  minutes: number;
  blocks: Block[];
  faq: { q: string; a: string }[];
  /** Slugs of other English guides. */
  related: string[];
};

/** Shared closing block so every guide ends with the same honest summary + CTA. */
const closing = (note: string): Block[] => [
  { type: "h2", text: "Where KeigoButton fits", id: "fit" },
  { type: "p", text: note },
  {
    type: "callout",
    title: "The part we are worst at",
    text:
      "KeigoButton is new and small. As of 2026-08 it has single-digit App Store reviews, no Windows app, and no bring-your-own-model option. If you want a mature product with a long track record, Grammarly is the safer pick; if you want to pay once and use your own API key, Kerlig is.",
  },
  { type: "cta" },
];

export const EN_GUIDES: EnGuide[] = [
  {
    slug: "ai-writing-apps-mac",
    title: "AI writing apps for Mac that work in every app",
    metaTitle: "Best AI Writing Apps for Mac (2026) — Tested and Compared",
    description:
      "A comparison of the macOS apps that rewrite text in place, in any app: Apple Intelligence, Grammarly, Kerlig, FixKey, Elephas, RewriteBar and KeigoButton. What each costs, how each is invoked, and which one fits which way of working.",
    keyword: "ai writing apps for mac",
    alsoRanks: [
      "best ai writing app mac",
      "system wide ai writing mac",
      "ai rewrite tool mac",
      "mac ai text editor any app",
    ],
    published: "2026-08-16",
    updated: "2026-08-16",
    category: "Comparisons",
    minutes: 9,
    lead:
      "Every app in this category does roughly the same thing: you press a shortcut, your text is rewritten, and it goes back where it was. The model is not the differentiator any more. What actually decides whether you keep using one is how it is invoked, whether you can save your own instructions, and how it charges you.",
    blocks: [
      { type: "h2", text: "The short version", id: "summary" },
      {
        type: "p",
        text:
          "**If you want free and you have an Apple silicon Mac, start with Apple Intelligence Writing Tools** — it is already installed and it costs nothing. Move to a paid app only when you hit its ceiling, which for most people is the fixed action list: you cannot add \"reply to this in our support voice\" as a button.",
      },
      {
        type: "p",
        text:
          "**If you are technical and want to pay once, Kerlig** ($49 one-time as of 2026-08-16) is the cheapest long-run option, because you supply your own API key and pay the model provider directly. **If you want unlimited usage with nothing to configure, FixKey** ($48/year as of 2026-08-16) is cheaper than we are and includes dictation.",
      },
      {
        type: "p",
        text:
          "**KeigoButton is the one to look at if you also write on your phone, or if you write any Japanese.** The buttons you build sync to an iOS keyboard, and the Japanese rewriting is the product's original purpose rather than a translation feature.",
      },
      { type: "h2", text: "How they compare", id: "compare" },
      {
        type: "table",
        caption: "Checked 2026-08-16 against each product's own pricing page. Prices move — verify before buying.",
        head: ["App", "How you invoke it", "Your own prompts?", "Price", "Notes"],
        rows: [
          [
            "Apple Intelligence Writing Tools",
            "Right-click or the Writing Tools menu",
            "No — fixed action list",
            "Free, built into macOS",
            "Apple silicon only. No custom instructions.",
          ],
          [
            "Grammarly",
            "Floating button in the text field",
            "Limited (prompts in the AI panel)",
            "Free tier; paid plans above it",
            "Correction-first. The largest and most established.",
          ],
          [
            "Kerlig",
            "Option+Space anywhere",
            "Yes — custom actions",
            "**$49 one-time** (1 Mac), $79 (2 Macs)",
            "You bring your own API key, so tokens are billed by the model provider on top. 350+ models. macOS 12+.",
          ],
          [
            "FixKey",
            "Custom shortcut anywhere",
            "Yes — custom AI prompts",
            "**$48/year**",
            "Unlimited rewrites and unlimited speech-to-text, 180+ languages.",
          ],
          [
            "RewriteBar / Elephas / TextWisely",
            "Menu bar or shortcut",
            "Yes",
            "Varies (TextWisely $29 one-time or $5/month)",
            "Same category, different emphases — Elephas adds a knowledge base.",
          ],
          [
            "[KeigoButton](/en)",
            "Hover the bar at the bottom of the screen",
            "Yes — buttons you write",
            "Free for 50 rewrites/month; **$12/month or $120/year** for 1,000",
            "The same buttons appear on an iPhone keyboard. macOS 14+, Apple silicon and Intel. No API key needed.",
          ],
        ],
      },
      {
        type: "callout",
        title: "Read the price column carefully",
        text:
          "On raw cost per year, FixKey ($48) and Kerlig ($49 once) both beat KeigoButton's $120. We are writing this comparison, and pretending otherwise would be easy to check and would cost you the right to believe anything else on this page. Pay us only if the phone keyboard or the Japanese quality is worth the difference to you.",
      },
      { type: "h2", text: "What actually separates them", id: "differences" },
      { type: "h3", text: "1. Whether you can save your own instructions" },
      {
        type: "p",
        text:
          "This is the biggest practical divide. Apple Intelligence gives you a fixed menu — Friendly, Professional, Concise, Summarise. That covers the common cases and nothing else. Kerlig, FixKey and KeigoButton all let you write the instruction once and keep it as a button, which is what turns the tool from a novelty into something you press thirty times a day.",
      },
      {
        type: "p",
        text:
          "The test to apply: think of the edit you personally make most often. \"Rewrite this so it does not sound passive-aggressive.\" \"Turn these notes into a status update.\" \"Reply declining, but leave the door open.\" If your tool cannot hold that as one press, you will keep going back to a chat window.",
      },
      { type: "h3", text: "2. Whether it reaches the text or replaces your clipboard" },
      {
        type: "p",
        text:
          "Apps in this category read and write through the macOS Accessibility API, which is why every one of them asks for that permission on first run. The ones that do it properly replace the text in place. The ones that do not fall back to copying, which means your clipboard is clobbered and you lose whatever was in it.",
      },
      {
        type: "p",
        text:
          "Browsers and Electron apps (Slack, Notion, VS Code) expose their text fields differently from native ones, so this is where products diverge in quality. Test your actual daily apps during the trial, not TextEdit.",
      },
      { type: "h3", text: "3. How it charges" },
      {
        type: "ul",
        items: [
          "**Bring your own key** (Kerlig): cheapest at volume, but you manage an API key and a second bill. Good if you already have one.",
          "**Flat subscription with usage included** (FixKey, KeigoButton): nothing to configure, predictable, more expensive per rewrite at high volume.",
          "**Free** (Apple Intelligence): no cost, no custom prompts, Apple silicon only.",
        ],
      },
      { type: "h2", text: "Which to pick", id: "pick" },
      {
        type: "ul",
        items: [
          "**You just want typos and tone fixed, for free** → Apple Intelligence Writing Tools, already on your Mac.",
          "**You want the most established product and correction is the main job** → Grammarly.",
          "**You are technical, high-volume, and want to pay once** → Kerlig.",
          "**You want unlimited usage plus dictation, cheaply** → FixKey.",
          "**You write on your phone as much as your Mac, or you write Japanese** → [KeigoButton](/en).",
        ],
      },
      {
        type: "tool",
        href: "/en/rewrite",
        label: "Try this kind of rewriting free, in the browser",
        note: "Four modes, two candidates each. No install, no account, five a day.",
      },
      ...closing(
        "KeigoButton started as a Japanese keyboard, and that is still where it is strongest: 敬語 (keigo) is the honorific register Japanese business writing requires, and getting it right is a forced edit on nearly every message. The Mac app applies the same idea to English — your own saved instructions, run against the text under your cursor, in any app. The thing none of the Mac-only tools above do is follow you onto a phone keyboard with the same buttons.",
      ),
    ],
    faq: [
      {
        q: "Is there a free AI writing app for Mac?",
        a: "Yes — Apple Intelligence Writing Tools is built into macOS on Apple silicon Macs and costs nothing. Grammarly and KeigoButton both have free tiers as well (KeigoButton's is 50 rewrites a month). The limitation of the free built-in option is that you cannot add your own instructions; you get Apple's fixed list of actions.",
      },
      {
        q: "Which AI writing app for Mac works in every application?",
        a: "Kerlig, FixKey, Elephas, RewriteBar, TextWisely and KeigoButton all work system-wide by using the macOS Accessibility permission to read and replace text in whatever app you are in. Grammarly works in most apps through its own floating interface. Quality varies most in browsers and Electron apps like Slack and Notion, so test the apps you actually use.",
      },
      {
        q: "Why do these apps need Accessibility permission?",
        a: "Reading the text in another application's text field, and writing the replacement back into it, is only possible through the macOS Accessibility API. It is the same permission text-expansion and dictation utilities require. It does not grant screen recording or keystroke logging, and it can be revoked in System Settings at any time.",
      },
      {
        q: "Is Kerlig or FixKey cheaper than KeigoButton?",
        a: "Both, on price alone, as of 2026-08-16. Kerlig is $49 once for one Mac, though you supply an API key and pay the model provider separately. FixKey is $48 a year with unlimited rewrites. KeigoButton is $120 a year for 1,000 rewrites a month, and is worth the difference only if you want the synced iPhone keyboard or you write Japanese.",
      },
    ],
    related: ["grammarly-alternative-mac", "apple-intelligence-writing-tools-alternative", "rewrite-text-any-app-mac"],
  },

  {
    slug: "grammarly-alternative-mac",
    title: "Grammarly alternatives for Mac, compared honestly",
    metaTitle: "Grammarly Alternative for Mac (2026) — 6 Options Compared",
    description:
      "Looking for a Grammarly alternative on macOS? A comparison of Apple Intelligence Writing Tools, Kerlig, FixKey, LanguageTool, RewriteBar and KeigoButton — what each replaces, what each costs, and where Grammarly is still the better choice.",
    keyword: "grammarly alternative for mac",
    alsoRanks: [
      "grammarly alternatives mac",
      "grammarly replacement macos",
      "cheaper than grammarly mac",
      "free grammarly alternative mac",
    ],
    published: "2026-08-16",
    updated: "2026-08-16",
    category: "Comparisons",
    minutes: 8,
    lead:
      "People leave Grammarly for three different reasons, and they need three different replacements. Sorting out which one you are is most of the decision.",
    blocks: [
      { type: "h2", text: "First work out why you are leaving", id: "why" },
      {
        type: "ol",
        items: [
          "**Price.** You want the same job done for less. → LanguageTool or Apple Intelligence.",
          "**Privacy.** You do not want your writing on someone's server. → a local-model tool, or Apple Intelligence, which runs much of its work on-device.",
          "**Capability.** Correction is not your problem; you want the text **rewritten** to your own instructions. → Kerlig, FixKey or KeigoButton.",
        ],
      },
      {
        type: "p",
        text:
          "The third group is the one most often mis-sold to. Grammarly is a **correction** product at heart — it finds what is wrong and proposes a fix. If what you actually want is \"make this sound like I am not annoyed\" or \"turn this into a client update\", you are not looking for a better Grammarly, you are looking for a different category of tool.",
      },
      { type: "h2", text: "The options", id: "options" },
      {
        type: "table",
        caption: "Checked 2026-08-16 against each product's own site.",
        head: ["Alternative", "Replaces Grammarly's…", "Price", "Catch"],
        rows: [
          [
            "Apple Intelligence Writing Tools",
            "Proofreading and basic tone changes",
            "Free, built in",
            "Apple silicon only. Fixed action list — no custom instructions.",
          ],
          [
            "LanguageTool",
            "Grammar and spelling, across many languages",
            "Free tier; paid premium",
            "Correction only. Not a rewriting tool.",
          ],
          [
            "Kerlig",
            "The AI rewriting panel",
            "$49 one-time (1 Mac)",
            "Bring your own API key; tokens billed separately.",
          ],
          [
            "FixKey",
            "The AI rewriting panel, plus dictation",
            "$48/year",
            "Subscription. Mac only.",
          ],
          [
            "RewriteBar / Elephas",
            "The AI rewriting panel",
            "Varies",
            "Same category; Elephas adds a knowledge base.",
          ],
          [
            "[KeigoButton](/en)",
            "The AI rewriting panel, on Mac **and** iPhone",
            "Free for 50/month; $12/month or $120/year",
            "Newer and much smaller. Strongest if you write Japanese.",
          ],
        ],
      },
      { type: "h2", text: "Where Grammarly is still better", id: "grammarly-wins" },
      {
        type: "p",
        text:
          "Written by the makers of one of the alternatives, so take it with that in mind — but these are checkable:",
      },
      {
        type: "ul",
        items: [
          "**Detection you did not ask for.** Grammarly flags the mistake you did not know you made. Instruction-driven tools only act when you press something, so they never catch what you were not looking for.",
          "**Breadth of platform.** Windows, browser extensions, Google Docs, Word. Most of the alternatives here are macOS-only, including ours.",
          "**Maturity.** Years of tuning and an enormous user base behind the suggestions.",
          "**Team features.** Style guides, brand tones, admin controls. None of the small Mac utilities have an answer to this.",
        ],
      },
      {
        type: "rewrite",
        before: "hey — following up again on the invoice, this is the third time ive asked",
        after:
          "Hi — checking in on this invoice once more. I know things get busy, but I'd appreciate an update when you have a moment.",
        note: "This is the kind of edit correction tools do not make: nothing here was grammatically wrong.",
      },
      { type: "h2", text: "If you want the rewriting half", id: "rewriting" },
      {
        type: "p",
        text:
          "Every tool in the third group works the same way: a shortcut, your own saved instructions, and the text replaced in place through the macOS Accessibility API. Pick on price model and on whether you need it on your phone too.",
      },
      {
        type: "ul",
        items: [
          "Pay once, bring your own key → **Kerlig**, $49.",
          "Flat yearly, unlimited, includes dictation → **FixKey**, $48/year.",
          "Free for light use, and the same buttons on an iPhone keyboard → **[KeigoButton](/en)**.",
        ],
      },
      {
        type: "tool",
        href: "/en/rewrite",
        label: "See what the rewriting half looks like",
        note: "Free in the browser — grammar, natural, professional or shorter.",
      },
      ...closing(
        "KeigoButton replaces the rewriting half of Grammarly, not the proofreading half. You save the edits you make constantly as buttons — fix grammar, sound natural, shorten, make it formal, write a follow-up — and press one instead of copying your text into a chat window and pasting the result back. It is free for 50 rewrites a month, and the buttons you make on the Mac appear on the iPhone keyboard too.",
      ),
    ],
    faq: [
      {
        q: "What is the best free Grammarly alternative for Mac?",
        a: "Apple Intelligence Writing Tools if you have an Apple silicon Mac — it is built into macOS, costs nothing, and covers proofreading and basic tone changes. LanguageTool's free tier is the better choice for grammar across multiple languages. Both are correction tools; neither lets you save your own rewriting instructions.",
      },
      {
        q: "Is there a Grammarly alternative that works in every Mac app?",
        a: "Yes. Kerlig, FixKey, RewriteBar, Elephas and KeigoButton all use the macOS Accessibility permission to read and replace text in whatever application you are typing in, including Mail, Slack, Gmail, Notion and Word. Coverage in browsers and Electron apps varies between products, so test the apps you use daily.",
      },
      {
        q: "Is Grammarly or KeigoButton cheaper?",
        a: "Grammarly has a genuinely useful free tier and so does KeigoButton (50 rewrites a month). Above that, KeigoButton is $12 a month or $120 a year. Compare against your actual usage rather than the headline: if you only need occasional proofreading, Grammarly's free tier or Apple's built-in tools will cost you nothing at all.",
      },
      {
        q: "Do I have to stop using Grammarly to use one of these?",
        a: "No, and many people run both. Grammarly catches mistakes you did not ask about; an instruction-driven rewriter changes text when you tell it to. They do different jobs and do not conflict, though running two tools that both hook into text fields can occasionally produce a duplicated interface in the same field.",
      },
    ],
    related: ["ai-writing-apps-mac", "apple-intelligence-writing-tools-alternative", "rewrite-text-any-app-mac"],
  },

  {
    slug: "apple-intelligence-writing-tools-alternative",
    title: "When Apple Intelligence Writing Tools is not enough",
    metaTitle: "Apple Intelligence Writing Tools Alternative for Mac (2026)",
    description:
      "Apple Intelligence Writing Tools is free and already on your Mac. Here is exactly where it stops — custom instructions, Intel Macs, language coverage — and which alternatives pick up from there.",
    keyword: "apple intelligence writing tools alternative",
    alsoRanks: [
      "apple intelligence writing tools custom prompt",
      "writing tools not available mac",
      "apple intelligence alternative mac writing",
      "better than apple intelligence writing",
    ],
    published: "2026-08-16",
    updated: "2026-08-16",
    category: "Comparisons",
    minutes: 6,
    lead:
      "Start here: if Writing Tools does what you need, use it. It is free, it is already installed, and much of it runs on-device. This page is only about the four specific walls people hit.",
    blocks: [
      { type: "h2", text: "The four walls", id: "walls" },
      { type: "h3", text: "1. You cannot add your own instruction" },
      {
        type: "p",
        text:
          "Writing Tools gives you a fixed set: Proofread, Rewrite, Friendly, Professional, Concise, Summary, and a few list and table conversions. That is a good default set and a hard ceiling. There is no way to add \"rewrite this as a follow-up that does not sound desperate\" and keep it as a one-press action.",
      },
      {
        type: "p",
        text:
          "This is the wall most people actually hit, and it is the reason the whole category of custom-prompt Mac utilities exists.",
      },
      { type: "h3", text: "2. Your Mac is Intel" },
      {
        type: "p",
        text:
          "Apple Intelligence requires Apple silicon. On an Intel Mac, Writing Tools is not an option at all, and a third-party app that does its work in the cloud is the only route. KeigoButton runs on both Apple silicon and Intel, on macOS 14 and later.",
      },
      { type: "h3", text: "3. The language you write in is not well covered" },
      {
        type: "p",
        text:
          "Apple has expanded language support steadily, but coverage and quality still vary a great deal by language, and a general-purpose system feature is rarely tuned for a specific register. Japanese business honorifics (敬語) are the clearest example: the rules are precise, the cost of getting them wrong is social, and a generic \"make it professional\" action does not encode them.",
      },
      { type: "h3", text: "4. You want the same thing on your phone" },
      {
        type: "p",
        text:
          "Writing Tools exists on iOS too, but it is again the same fixed list. If the point is that your own saved instructions follow you between devices, you need a product built around that.",
      },
      { type: "h2", text: "What to use instead", id: "instead" },
      {
        type: "table",
        caption: "Checked 2026-08-16.",
        head: ["If the wall is…", "Use", "Price"],
        rows: [
          ["Custom instructions, pay once", "Kerlig (bring your own API key)", "$49 one-time"],
          ["Custom instructions, unlimited use", "FixKey", "$48/year"],
          ["Intel Mac", "Any cloud-based tool, including [KeigoButton](/en)", "Free tier available"],
          ["Japanese, or you also write on a phone", "[KeigoButton](/en)", "Free for 50/month, then $12/month"],
        ],
      },
      {
        type: "tool",
        href: "/en/rewrite",
        label: "Compare the output against Writing Tools yourself",
        note: "Free in the browser, no account — then run the same text through Apple's.",
      },
      {
        type: "callout",
        title: "Do not pay to replace something free without checking first",
        text:
          "Open any text field, select some text, right-click, and look for Writing Tools. Try Proofread and Professional on a real message you were about to send. If that is enough, stop there — it costs nothing and it is one right-click away. Only the four walls above are worth spending money on.",
      },
      ...closing(
        "KeigoButton is for the first wall and the fourth: you write the instruction once, it becomes a button, and the same button is there on the iPhone keyboard. It also runs on Intel Macs, which Apple Intelligence does not. Where Apple wins and will keep winning is price and integration — it is free and it is already there.",
      ),
    ],
    faq: [
      {
        q: "Can I add my own custom prompts to Apple Intelligence Writing Tools?",
        a: "No. Writing Tools offers a fixed set of actions — Proofread, Rewrite, Friendly, Professional, Concise, Summary and some list and table conversions — and there is no way to save your own instruction as a reusable action. Third-party macOS apps such as Kerlig, FixKey and KeigoButton exist largely to fill that gap.",
      },
      {
        q: "Why is Writing Tools not showing up on my Mac?",
        a: "The most common reason is hardware: Apple Intelligence requires an Apple silicon Mac, so it is unavailable on Intel machines entirely. Beyond that, check that your macOS version is current, that Apple Intelligence is switched on in System Settings, and that your device language and region are among the supported ones.",
      },
      {
        q: "Is a paid alternative actually better than the free Apple one?",
        a: "Only in specific ways. Paid tools let you save your own instructions, usually run on Intel Macs, and often handle particular languages or registers better. Apple Intelligence is free, deeply integrated and partly on-device. If you have not hit one of those specific limits, the free option is the better deal.",
      },
      {
        q: "Does Apple Intelligence handle Japanese keigo correctly?",
        a: "It can produce polite Japanese, but a general 'make this professional' action does not encode the distinction between 尊敬語 and 謙譲語, or catch 二重敬語. That distinction is the whole reason KeigoButton exists — you can check the rules it applies for free in the browser at keigobutton.com/keigo-check.",
      },
    ],
    related: ["ai-writing-apps-mac", "grammarly-alternative-mac", "rewrite-text-any-app-mac"],
  },

  {
    slug: "rewrite-text-any-app-mac",
    title: "How to rewrite text in any app on your Mac",
    metaTitle: "How to Rewrite Text in Any App on Mac — Without Copy-Paste",
    description:
      "The copy, switch to ChatGPT, paste, prompt, copy, switch back, paste loop takes about eight steps. Here is how system-wide rewriting works on macOS, why it needs Accessibility permission, and how to set it up.",
    keyword: "rewrite text in any app mac",
    alsoRanks: [
      "chatgpt without switching apps mac",
      "ai text replacement mac",
      "system wide ai shortcut mac",
      "edit text in place ai mac",
    ],
    published: "2026-08-16",
    updated: "2026-08-16",
    category: "How it works",
    minutes: 6,
    lead:
      "If you use a chat assistant to fix your writing, you may be repeating the same eight-step round trip many times a day. This is how an in-place workflow reduces the switching, and how it works underneath.",
    blocks: [
      { type: "h2", text: "The loop you are currently running", id: "loop" },
      {
        type: "ol",
        items: [
          "Select the text",
          "Copy it",
          "Switch to the assistant",
          "Paste",
          "Type the instruction — again",
          "Wait, then copy the result",
          "Switch back",
          "Select the old text and paste over it",
        ],
      },
      {
        type: "p",
        text:
          "The exact time varies. The recurring cost is the interruption: you leave the message you were writing and then have to reconstruct where you were when you return.",
      },
      { type: "h2", text: "What replaces it", id: "replacement" },
      {
        type: "p",
        text:
          "A system-wide rewriting tool keeps the workflow in the current app: **invoke it, press your button, review the result, and insert.** The text under your cursor is read and your saved instruction is applied without moving the draft into a separate chat. For a normal rewrite, your clipboard is left alone.",
      },
      {
        type: "p",
        text:
          "The second half matters as much as the first. Because the instruction is saved rather than typed, you stop rewriting the prompt. \"Make this polite but not stiff\" is a button, not a sentence you compose for the four-hundredth time.",
      },
      {
        type: "rewrite",
        before: "cant make thursday, sorry. can we do next week instead? whenever works",
        after:
          "Apologies — Thursday no longer works on my end. Could we move to next week? I'm flexible on the day, so whatever suits you best.",
        note: "One press, in the reply field, without leaving it.",
      },
      { type: "h2", text: "How it works underneath", id: "mechanism" },
      {
        type: "p",
        text:
          "macOS exposes the contents of other applications' text fields through the **Accessibility API** — the same interface screen readers use. A tool with that permission can read the focused field and write a replacement into it. This is why every app in this category asks for Accessibility access on first run, and why none of them can work without it.",
      },
      {
        type: "ul",
        items: [
          "**Native apps** (Mail, Notes, Word) expose their fields cleanly, and replacement is exact.",
          "**Browsers and Electron apps** (Chrome, Slack, Notion, VS Code) expose them differently, so tools switch technique per app. This is where quality varies most between products.",
          "**Fallback.** When a field cannot be written directly, tools synthesise keystrokes or use the clipboard. The clipboard route is the one that loses whatever you had copied — worth testing before you commit.",
        ],
      },
      {
        type: "callout",
        title: "What Accessibility permission does not grant",
        text:
          "Accessibility is separate from Screen Recording, but it is still a broad and sensitive permission. KeigoButton uses it to read and set the focused text element. Grant it only to software you trust; you can revoke it at any time in System Settings › Privacy & Security › Accessibility.",
      },
      { type: "h2", text: "Setting it up", id: "setup" },
      {
        type: "ol",
        items: [
          "Install a system-wide rewriting app — [KeigoButton](/en), Kerlig, FixKey and others all work this way.",
          "Grant Accessibility permission when asked. Without it the app can read nothing.",
          "Write two or three buttons for the edits you personally make most often. Be specific: \"shorten to two sentences and keep the ask at the top\" beats \"improve\".",
          "Test in the apps you actually use — especially Slack and your browser — before relying on it.",
        ],
      },
      {
        type: "tool",
        href: "/en/rewrite",
        label: "Try the rewriting in your browser first",
        note: "Free, no install and no account — five a day.",
      },
      {
        type: "tool",
        href: "/en/mac/custom-rewrite-prompts",
        label: "See how custom rewrite buttons work",
        note: "Saved buttons, one-off instructions, selections, whole fields and empty-field drafting.",
      },
      ...closing(
        "KeigoButton puts a small bar at the bottom of your screen. Hover it and your buttons fan out; press one, review the result and insert it into the field. The buttons are yours to write, and they sync to an iPhone keyboard so the same ones are there when you are replying from your phone.",
      ),
    ],
    faq: [
      {
        q: "How do I use ChatGPT without switching apps on Mac?",
        a: "Use a system-wide rewriting utility instead of the chat window. Apps such as Kerlig, FixKey and KeigoButton read the text in whatever field you are typing in, apply an instruction you saved earlier, and write the result back in place — so there is no copying, no app switch and no re-typed prompt. Apple Intelligence Writing Tools does the same thing for a fixed set of actions, free.",
      },
      {
        q: "Can an app really replace text inside Slack or Gmail?",
        a: "Yes, through the macOS Accessibility API. Browsers and Electron apps like Slack expose their text fields differently from native apps, so tools handle them with different techniques and reliability varies. Test your own daily apps during a trial rather than assuming it works everywhere.",
      },
      {
        q: "Is it safe to give an app Accessibility permission?",
        a: "Accessibility is separate from Screen Recording, but it is a broad permission that can control interface elements. Grant it only to apps you have a reason to trust, prefer notarized ones, and revoke it in System Settings › Privacy & Security › Accessibility whenever you like.",
      },
      {
        q: "Does the text I rewrite get sent to a server?",
        a: "For cloud-based tools, yes — the selected text is sent so the model can rewrite it. Tools that run local models keep it on the machine. With KeigoButton, only the text you explicitly send by pressing a button is transmitted; it is not retained on the server after the rewrite, and whether it may be used to improve the model is a setting you control.",
      },
    ],
    related: ["ai-writing-apps-mac", "grammarly-alternative-mac", "apple-intelligence-writing-tools-alternative"],
  },
];

export const enGuide = (slug: string) => EN_GUIDES.find((guide) => guide.slug === slug);
