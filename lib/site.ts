import type { Lang } from "./i18n";

// Single source of truth for anything that has to agree across metadata,
// JSON-LD, sitemap, robots and llms.txt. Canonical host is the apex domain;
// www.keigobutton.com and keigobutton.vercel.app 308 to it (see next.config.ts
// and the Vercel primary-domain setting).
export const SITE_URL = "https://keigobutton.com";
export const SITE_NAME = "敬語ボタン";
export const SITE_TAGLINE = "敬語に直せるAIキーボード";

export const APP_STORE_URL =
  "https://apps.apple.com/jp/app/%E6%95%AC%E8%AA%9E%E3%83%9C%E3%82%BF%E3%83%B3-ai%E3%82%AD%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%89/id6777901723";
export const MAC_DOWNLOAD_URL =
  "https://github.com/itsukison/KeigoDesktop/releases/latest/download/KeigoButton.dmg";

export const APP_STORE_ID = "6777901723";
export const CONTACT_EMAIL = "keigobutton@gmail.com";

export const PUBLISHER_URL = "https://www.core7-jp.com/";
export const PUBLISHER_NAME = "株式会社Core7";

// Stable JSON-LD node identifiers. Every page that references the app or the
// publisher points at these @ids instead of restating the entity, so search
// engines and LLMs resolve one canonical node per thing.
export const MOBILE_APP_ID = `${SITE_URL}/iphone#app`;
export const MAC_APP_ID = `${SITE_URL}/#app`;
// Existing article and tool pages describe the iPhone keyboard, so their
// long-standing APP_ID reference continues to resolve to that app entity.
export const APP_ID = MOBILE_APP_ID;
export const ORG_ID = `${PUBLISHER_URL}#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const absolute = (path: string) =>
  path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const organizationNode = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: PUBLISHER_NAME,
  alternateName: "Core7, Inc.",
  url: PUBLISHER_URL,
  logo: absolute("/brand-icon.png"),
  description:
    "東京を拠点に、Mac・iPhone向けAIリライトアシスタント「敬語ボタン」を開発・運営するソフトウェア会社。",
  knowsAbout: ["AI writing assistants", "Japanese language input", "macOS and iOS applications"],
} as const;

export const websiteNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  inLanguage: "ja",
  publisher: { "@id": ORG_ID },
} as const;

/**
 * The app entity. Declared once here and referenced by @id everywhere else.
 * `SoftwareApplication` (not `MobileApplication`) is the type Google documents
 * for app rich results, and it is what LLM retrieval pipelines index against.
 */
export const softwareApplicationNode = {
  "@type": "SoftwareApplication",
  "@id": APP_ID,
  name: SITE_NAME,
  alternateName: ["KeigoButton", "敬語ボタン｜AIキーボード", "敬語ボタン｜AI変換・返信キーボード"],
  url: `${SITE_URL}/iphone`,
  downloadUrl: APP_STORE_URL,
  installUrl: APP_STORE_URL,
  // 敬語 is the wedge, not the ceiling: the keyboard runs whatever instruction the
  // user saved as a button (`OnboardingPresetCatalog` ships 定番 / 仕事 / 海外 /
  // 日本語 / SNS packs, and English mode writes English). Describing it as a keigo
  // converter understated it to every model that reads this node — and this @id is
  // referenced by every article and tool page on the site.
  description:
    "LINE・メール・DMの文章を、入力中のアプリを離れずに書き直せるiPhone向けAIキーボードアプリ。敬語・メール文・要約・翻訳・返信のほか、よく使う直し方を自分の言葉でボタンとして登録できます。通常の日本語入力は端末内で処理され、AIに送られるのはボタンをタップした文章だけです。",
  applicationCategory: "UtilitiesApplication",
  applicationSubCategory: "AIキーボード・文章作成支援",
  operatingSystem: "iOS 16.4以降",
  inLanguage: "ja",
  isAccessibleForFree: true,
  offers: {
    "@type": "Offer",
    price: 0,
    priceCurrency: "JPY",
    url: APP_STORE_URL,
  },
  featureList: [
    "キーボード上で文章を自然な敬語に変換",
    "メール文・お詫び・依頼・要約・翻訳・言い換え",
    "受信メッセージへの返信文を生成",
    "よく使う変換メニューを自分の言葉で追加",
    "LINE・メール・Slack・DMなど文字入力欄で利用",
    "通常の日本語入力は端末内で処理",
  ],
  screenshot: [absolute("/home.png"), absolute("/keyboard.jpg"), absolute("/prompts.png")],
  publisher: { "@id": ORG_ID },
  sameAs: [APP_STORE_URL],
} as const;

/**
 * The Mac app entity, **in the language of the page carrying it**.
 *
 * This used to be one Japanese constant emitted on `/`, `/en` and `/zh` alike, so
 * the English page declared `inLanguage: "ja"`, a Japanese `description`, and
 * `priceCurrency: "JPY"` while the visible pricing table beside it quoted dollars
 * (`components/mac/data/pricing.js` → `currencyFor`). An assistant reading the
 * English page for an English answer got Japanese prose and the wrong currency;
 * that is the one thing structured data exists to prevent.
 *
 * Currency follows `currencyFor(lang)` and must keep following it — the node has to
 * name the amount the reader is actually charged, not a converted figure.
 */
const MAC_APP_L10N = {
  ja: {
    name: `${SITE_NAME} Mac版`,
    description:
      "Mail・Slack・Gmailなどで入力中の文章を、自分で保存したボタンやその場の自由な指示で書き換え、受信文への返信も同じ場所で作れるmacOS向けAIリライトアシスタント。",
    applicationSubCategory: "AI文章作成支援",
    operatingSystem: "macOS 14以降",
    inLanguage: "ja",
    priceCurrency: "JPY",
    featureList: [
      "よく使う書き換え方を自分のボタンとして保存",
      "単発の自由な指示で文章を書き換え、空の入力欄では文章を新規作成",
      "コピーした受信メッセージを文脈にして返信文を作成",
      "通常の書き換えはコピー＆ペーストの往復やアプリ切り替え不要",
      "選択範囲または入力欄全体を自動判定",
      "Mail・Slack・Gmail・Notion・Chrome・Wordなどで利用",
    ],
  },
  en: {
    name: "KeigoButton for Mac",
    description:
      "A macOS AI rewrite assistant that runs saved buttons or a one-off instruction against text in any app, composes in empty fields, and drafts replies from a message you copy as context.",
    applicationSubCategory: "AI rewriting and reply assistance",
    operatingSystem: "macOS 14 or later",
    inLanguage: "en",
    priceCurrency: "USD",
    featureList: [
      "Turns recurring edits into reusable custom rewrite buttons",
      "Runs a one-off freeform instruction and can compose in an empty field",
      "Drafts a complete reply from an incoming message you explicitly copy",
      "Rewrites in place without a copy-and-paste round trip or app switching",
      "Uses your selection, or the whole field when nothing is selected",
      "Works in Mail, Slack, Gmail, Notion, Chrome and Word",
    ],
  },
  zh: {
    name: `${SITE_NAME} Mac 版`,
    description:
      "把你正在输入的日语文章就地改写成自然敬语和商务用语的 macOS 应用。无需复制、粘贴或切换应用。",
    applicationSubCategory: "AI 写作辅助",
    operatingSystem: "macOS 14 及以上",
    inLanguage: "zh-Hans",
    // 简体中文 readers are billed in yen (`pricing.js`: the premise is a Chinese
    // speaker working in Japan, so their card is a Japanese card).
    priceCurrency: "JPY",
    featureList: [
      "把正在输入的文章就地改写成自然的敬语",
      "无需复制、粘贴或切换应用",
      "自动判断改写选中部分还是整个输入框",
      "与 iPhone 版同步改写按钮",
      "可在 Mail、Slack、Gmail、Notion、Chrome、Word 等中使用",
    ],
  },
} as const;

export const macSoftwareApplicationNode = (lang: Lang) => {
  const l10n = MAC_APP_L10N[lang];
  return {
    "@type": "SoftwareApplication",
    "@id": MAC_APP_ID,
    name: l10n.name,
    alternateName: ["KeigoButton for Mac", "敬語ボタン macOS版", "敬語ボタン Mac版"],
    url: `${SITE_URL}/`,
    downloadUrl: MAC_DOWNLOAD_URL,
    installUrl: MAC_DOWNLOAD_URL,
    description: l10n.description,
    applicationCategory: "UtilitiesApplication",
    applicationSubCategory: l10n.applicationSubCategory,
    operatingSystem: l10n.operatingSystem,
    inLanguage: l10n.inLanguage,
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: 0,
      priceCurrency: l10n.priceCurrency,
      url: MAC_DOWNLOAD_URL,
    },
    featureList: l10n.featureList,
    publisher: { "@id": ORG_ID },
    sameAs: ["https://github.com/itsukison/KeigoDesktop"],
  };
};

/**
 * `websiteNode` for a localized route. The bare `websiteNode` stays Japanese
 * because the eight pages that import it are Japanese-only; only the translated
 * spine needs this.
 */
export const websiteNodeFor = (lang: Lang) => ({
  ...websiteNode,
  inLanguage: MAC_APP_L10N[lang].inLanguage,
});

type JsonLdNode = Record<string, unknown>;

/** Wraps nodes in an @graph so one script tag per page carries every entity. */
export const graph = (...nodes: JsonLdNode[]) => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});

export const faqNode = (items: readonly { q: string; a: string }[]): JsonLdNode => ({
  "@type": "FAQPage",
  mainEntity: items.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});

export const breadcrumbNode = (
  trail: readonly { name: string; path: string }[],
): JsonLdNode => ({
  "@type": "BreadcrumbList",
  itemListElement: trail.map(({ name, path }, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name,
    item: absolute(path),
  })),
});
