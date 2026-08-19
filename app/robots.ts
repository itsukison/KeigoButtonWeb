import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Every AI retrieval and training crawler is explicitly allowed.
 *
 * The default for an unlisted agent is already "allowed", but naming them is
 * not redundant: several of these crawlers (notably Applebot-Extended and
 * Google-Extended) are opt-OUT signals, and some operators' tooling reports a
 * site as "no explicit permission" when the agent is absent from robots.txt.
 * Being cited by an assistant is the whole point of this site, so the intent is
 * stated rather than inferred.
 */
const AI_CRAWLERS = [
  // OpenAI
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Claude-Web",
  "anthropic-ai",
  // Google (Gemini / AI Overviews training signal)
  "Google-Extended",
  "GoogleOther",
  // Apple Intelligence / Siri
  "Applebot",
  "Applebot-Extended",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Microsoft Copilot
  "bingbot",
  "BingPreview",
  // Meta AI
  "meta-externalagent",
  "meta-externalfetcher",
  "FacebookBot",
  // Others that feed retrieval or training corpora
  "Amazonbot",
  "CCBot",
  "cohere-ai",
  "cohere-training-data-crawler",
  "YouBot",
  "Diffbot",
  "Bytespider",
  "TimpiBot",
  "omgili",
  "webzio-extended",
  "AI2Bot",
  "Ai2Bot-Dolma",
  "MistralAI-User",
  "DuckAssistBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // JS chunks stay crawlable so Googlebot can fully render the
        // interactive tool pages; /api/ has no indexable content.
        disallow: ["/api/"],
      },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
