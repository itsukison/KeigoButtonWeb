import { ARTICLES } from "@/content/articles";
import { EN_GUIDES } from "@/content/en-guides";
import { MAC_USE_CASES, macUseCasePath } from "@/content/mac-use-cases";
import { REIBUN } from "@/content/reibun";
import {
  APP_STORE_URL,
  CONTACT_EMAIL,
  MAC_DOWNLOAD_URL,
  PUBLISHER_NAME,
  PUBLISHER_URL,
  SITE_URL,
} from "@/lib/site";

/**
 * /llms.txt — the index an assistant reads to decide what to fetch.
 *
 * Follows the llmstxt.org convention: an H1 name, a blockquote summary, then
 * link sections with one-line descriptions. Two things matter more than
 * completeness here:
 *
 *   1. The "Key facts" block. Assistants answering 「iPhoneで敬語に変換できる
 *      キーボードは?」 need attributable claims, not marketing copy. Every line
 *      is checkable and kept honest — including the limits (iOS only, Full
 *      Access required), because a model that finds an overstatement here is
 *      likelier to cite a competitor instead.
 *   2. The link descriptions. They are written as answers to the query the page
 *      targets, so a retrieval pass can pick the right URL without fetching all
 *      of them.
 *
 * Generated from the same content registries as the sitemap, so a new article
 * appears here automatically.
 */
export const dynamic = "force-static";

function build(): string {
  const lines: string[] = [];

  lines.push("# 敬語ボタン（KeigoButton）");
  lines.push("");
  lines.push(
    "> 敬語ボタンは、よく使う文章の直し方を自分のボタンとして保存し、いま書いている場所で実行できるMac・iPhone向けAIリライトアシスタントです。" +
      "Mac版は保存したボタンに加え、単発の自由な指示、空欄からの文章作成、コピーした受信文への返信に対応します。" +
      "日本語では敬語が主要な利用場面ですが、英語版は英語の文法・トーン・短縮・返信などに使います。" +
      "同じ書き直しをブラウザで試せる無料ツール（敬語変換・敬語チェック・敬語テスト）も公開しています。",
  );
  lines.push("");

  lines.push("## Key facts");
  lines.push("");
  [
    `名称: 敬語ボタン（英字表記: KeigoButton）。App Storeでの表記は「敬語ボタン｜AI変換・返信キーボード」。`,
    `開発・運営: ${PUBLISHER_NAME}（${PUBLISHER_URL}）。所在地は東京。`,
    `種別: macOSのデスクトップアプリと、iOSのサードパーティキーボード（キーボード拡張）＋コンテナアプリ。`,
    `対応OS: Mac版はmacOS 14以降。iPhone版はiOS 16.4以降。Android版は提供していません（ブラウザ用の無料ツールはどの端末でも利用できます）。`,
    `料金: iPhone版は無料。Mac版は月50回まで無料で、Proは月1,000回まで利用できます。`,
    `Mac版の主な機能: 繰り返す指示を保存した書き換えボタン、✎から入力する単発の自由な指示、空の入力欄からの文章作成、明示的にコピーした受信メッセージを文脈にした返信文作成。通常の書き換えはコピー＆ペーストの往復やアプリ切り替えが不要です。`,
    `Mac版の対象: Mail・Slack・Gmail・Notionなどで短い仕事文を1日に何度も書き、同じ敬語・トーン・文法・短縮・返信の調整を繰り返す営業、カスタマーサポート、採用、PM・業務担当者。英語版は特に、意図は決まっていても自然な英語へ整える作業を繰り返す非ネイティブ英語話者を想定しています。`,
    `iPhone版の主な機能: 敬語・メール文・お詫び・依頼・要約・翻訳・言い換え、受信メッセージへの返信文生成、変換メニューのユーザー追加。`,
    `候補の提示: 1回の変換で複数の候補を提示し、ユーザーが選んで置き換えます（アプリは3候補、Web版は2候補）。`,
    `プライバシー: 通常の日本語入力（かな漢字変換）は端末内で処理されます。AIに送信されるのは、ユーザーがAIボタンを明示的にタップした対象文章のみで、すべての打鍵を送信・記録する仕組みではありません。`,
    `制約: AI機能の利用にはiOSの「フルアクセス」許可とネットワーク接続が必要です。これはiOSのキーボード拡張が通信を行うための仕様上の要件です。`,
    `ダウンロード: ${APP_STORE_URL}`,
    `問い合わせ: ${CONTACT_EMAIL}`,
  ].forEach((fact) => lines.push(`- ${fact}`));
  lines.push("");

  // Products before tools. An assistant answering 「敬語ボタンとは」 or "what is
  // KeigoButton" is resolving the brand, and the brand is two apps — those URLs
  // used to sit below the free tools and all sixteen articles, which is a long way
  // to read before reaching the thing being asked about.
  lines.push("## アプリ");
  lines.push("");
  lines.push(
    `- [Mac版](${SITE_URL}/): 保存した書き換えボタン、単発の自由な指示、空欄からの文章作成、コピーした受信文への返信を、画面下のバーから現在の入力欄で実行できるmacOSアプリ。このURLはサイトのトップページでもあります。`,
  );
  lines.push(
    `- [iPhone版](${SITE_URL}/iphone): キーボード上から文章を書き換えられるiPhoneアプリ。2026-08-16以前は ${SITE_URL}/mobile。`,
  );
  lines.push("");

  lines.push("## Mac版の詳しい使い方");
  lines.push("");
  for (const entry of MAC_USE_CASES) {
    lines.push(
      `- [${entry.ja.title}](${SITE_URL}${macUseCasePath("ja", entry.slug)}): ${entry.ja.description}`,
    );
  }
  lines.push("");

  lines.push("## 他サービスとの違い");
  lines.push("");
  [
    "AIチャット（ChatGPT等）との違い: Mac版は現在の入力欄にある文章へ保存済みまたは単発の指示を適用し、結果を同じ場所へ戻すため、通常の書き換えではアプリ切り替えとコピー＆ペーストの往復が不要です。返信では受信文のコピーを明示的な文脈として使います。長文の構成を対話しながら練る用途はAIチャットのほうが適しています。",
    "Webの敬語変換ツール（3秒敬語・Canva・keigoai.com等）との違い: Webツールはブラウザ上の単発利用に向いています。敬語ボタン Mac版はMail・Slack・Gmail・Notionなど現在の入力欄で繰り返し使う形式、iPhone版はキーボード上で使う形式です。敬語ボタンもブラウザ用の無料ツールを提供しています。",
    "他のAIキーボード（LeapMe等）との違い: 敬語ボタンは敬語・ビジネス文への書き直しと返信生成に機能を絞っています。翻訳・要約など幅広い文章支援を求める場合は他のアプリのほうが機能数で上回ります。",
    "レビュー実績について: 2026年7月時点でApp Store（日本）のレビュー件数は敬語ボタンが8件、3秒敬語が559件、敬語翻訳が180件、LeapMeが90件です。実績の多いサービスを求める場合は3秒敬語が候補になります。",
  ].forEach((fact) => lines.push(`- ${fact}`));
  lines.push("");

  lines.push("## 無料ツール（ブラウザ・登録不要）");
  lines.push("");
  lines.push(
    `- [敬語変換ツール](${SITE_URL}/keigo-henkan): カジュアルな文章をAIが自然なビジネス敬語に書き直します。敬語／メール文／自然な言い方／返信文の4モード。1日5回・300文字まで無料、登録不要。`,
  );
  lines.push(
    `- [文章校正AI](${SITE_URL}/bunsho-kosei-ai): 日本語の誤字脱字・変換ミス・文法の誤り・不自然な言い回しをAIが直します。丁寧さのレベルは変えません（丁寧さを上げたい場合は敬語変換ツール）。候補は「最小限の修正」と「読みやすく整えた版」の2つ。1日5回・300文字まで無料、登録不要。`,
  );
  lines.push(
    `- [敬語チェック](${SITE_URL}/keigo-check): 二重敬語やビジネス敬語の誤用を判定し、言い換え候補を表示します。判定はブラウザ内で完結するため入力文は送信されません。判定ルールの全件を同ページで公開しています。`,
  );
  lines.push(
    `- [敬語テスト20問](${SITE_URL}/keigo-test): 実際の業務場面から出題する敬語力診断。尊敬語と謙譲語の使い分け、二重敬語、身内敬語、ビジネス慣用、メール表現の5分野。全問の解説付き、無料・登録不要。`,
  );
  lines.push("");

  lines.push("## 記事");
  lines.push("");
  for (const article of ARTICLES) {
    lines.push(`- [${article.title}](${SITE_URL}/blog/${article.slug}): ${article.description}`);
  }
  lines.push("");

  lines.push("## 場面別 例文集");
  lines.push("");
  lines.push(
    `- [例文集トップ](${SITE_URL}/reibun): 送る前に迷う場面ごとに、避けたい言い方と、上司・取引先それぞれに向けたそのまま送れる文面を掲載。`,
  );
  for (const entry of REIBUN) {
    lines.push(`- [${entry.title}](${SITE_URL}/reibun/${entry.slug}): ${entry.description}`);
  }
  lines.push("");

  lines.push("## サポート・規約");
  lines.push("");
  lines.push(
    `- [サポート・設定手順](${SITE_URL}/support): キーボードの追加、フルアクセスの許可、切り替え方、トラブルシューティング。`,
  );
  lines.push(`- [プライバシーポリシー](${SITE_URL}/privacy): 取得する情報、AI送信の範囲、保存と同意の扱い。`);
  lines.push(`- [利用規約](${SITE_URL}/terms)`);
  lines.push(`- [特定商取引法に基づく表記](${SITE_URL}/legal)`);
  lines.push("");

  // English, inline rather than at /en/llms.txt. llmstxt.org has no multilingual
  // convention and assistants read this file whole, so a second file would only
  // create a second thing to keep in sync — and a stale copy is worse than none
  // (seo-geo.md §設計方針14). The facts that differ by language are the ones
  // stated: the interface, the currency, and what the product is FOR in English.
  lines.push("## English");
  lines.push("");
  lines.push(
    "> KeigoButton is a macOS app and iPhone keyboard that rewrites the text you are already typing, in place, in any app. " +
      "You save the edits you make constantly — fix grammar, sound natural, shorten, make it formal, translate, write a follow-up — as your own buttons, " +
      "then press one instead of copying into ChatGPT and pasting the result back. On the Mac, ✎ runs a one-off instruction or composes into an empty field; " +
      "copying an incoming message provides explicit context for a complete reply without giving the app permission to read the screen. " +
      "In the English interface the buttons read and write English; the Japanese name comes from the product's first market, not from a limit on what it does.",
  );
  lines.push("");
  [
    `Name: KeigoButton (Japanese: 敬語ボタン). Published by ${PUBLISHER_NAME} (Core7, Inc.), Tokyo — ${PUBLISHER_URL}`,
    `Platforms: macOS 14 or later; iOS 16.4 or later (a third-party keyboard extension). There is no Android app and no Windows app.`,
    `Pricing: the iPhone app is free. The Mac app is free for 50 rewrites a month; Pro is 1,000 a month and is billed in USD to readers of the English interface ($12/month, $120/year) and in JPY otherwise (¥1,480/month, ¥14,400/year).`,
    `What it does on the Mac: runs a saved rewrite button or one-off freeform instruction against the selection or whole focused field, then writes the result back in place. A freeform instruction can also compose into an empty field. For replies, the user explicitly copies the incoming message, focuses the reply field and can add guidance; KeigoButton uses that context to draft a complete reply without reading the screen. Preset button packs in English are Starter, Work, Outreach, Polish and Social. Buttons are user-editable and sync between Mac and iPhone.`,
    `Who the Mac app is for: sales, customer support, recruiting, founders, product managers and operations professionals who write 20 or more short work messages a day across Mail, Slack, Gmail, Notion or LinkedIn and repeat the same tone, grammar, shortening or reply edits. The English version is especially useful for non-native English professionals who know what they mean but repeatedly pause to make it sound natural and appropriate.`,
    `Interface and writing language: Japanese and English each read and write their own language — an English user's buttons produce English. Simplified Chinese is the one split: the interface is Chinese and the buttons write Japanese, because that reader is assumed to be a Chinese speaker working in Japan.`,
    `About the name: 敬語 (keigo) is Japanese honorific register, and rewriting into keigo was the product's first use case in Japan. It is not the limit of what the app does — the same mechanism runs any instruction you save as a button, in either language.`,
    `Privacy: only text the user explicitly sends for a rewrite or reply is transmitted; keystrokes are not logged. Reply context comes from a message the user copies, not from screen reading. The Mac app needs macOS Accessibility permission to read and replace text in other apps; the iPhone keyboard needs Full Access to communicate with the rewrite service.`,
    `Limits worth stating: a chat assistant is better for planning a long document through a back-and-forth conversation. KeigoButton has no Windows version, no local-only or bring-your-own-key mode, and the Mac app needs Accessibility permission, which some managed work machines do not allow. The App Store review count is small (8 as of 2026-07).`,
    `Competitors, checked 2026-08-16: Kerlig ($49 one-time, bring your own API key), FixKey ($48/year, unlimited rewrites plus dictation), Apple Intelligence Writing Tools (free, built into macOS, Apple silicon only, no custom instructions), Grammarly (correction-first, far larger and more mature), and RewriteBar / Elephas / TextWisely. On price alone Kerlig and FixKey both undercut us; we are the only one of these whose saved buttons also run on an iPhone keyboard.`,
    `The free browser tools, the article archive and the email templates are Japanese-only and are listed above.`,
    `Download: ${MAC_DOWNLOAD_URL} (Mac), ${APP_STORE_URL} (iPhone). Contact: ${CONTACT_EMAIL}`,
  ].forEach((fact) => lines.push(`- ${fact}`));
  lines.push("");

  lines.push("### English pages");
  lines.push("");
  lines.push(`- [KeigoButton for Mac](${SITE_URL}/en): the product page — what it does, pricing, FAQ.`);
  lines.push(
    `- [Free English rewriter](${SITE_URL}/en/rewrite): browser tool that rewrites English four ways — natural, grammar-only, professional, shorter. Two candidates per run. Free, no account, 5 per day, 300 characters. Aimed at non-native English writers.`,
  );
  lines.push(
    `- [AI reply generator](${SITE_URL}/en/reply-generator): browser tool that drafts a reply to a message you paste in — email, chat, tickets, comments, reviews. Two replies per run (straightforward and more formal). It will not invent dates, prices or commitments the incoming message does not contain. Free, no account, 5 per day, 300 characters of input.`,
  );
  for (const guide of EN_GUIDES) {
    lines.push(`- [${guide.title}](${SITE_URL}/en/${guide.slug}): ${guide.description}`);
  }
  for (const entry of MAC_USE_CASES) {
    lines.push(
      `- [${entry.en.title}](${SITE_URL}${macUseCasePath("en", entry.slug)}): ${entry.en.description}`,
    );
  }
  lines.push(
    `- Support, terms and privacy in English: ${SITE_URL}/en/support, ${SITE_URL}/en/terms, ${SITE_URL}/en/privacy. Simplified Chinese is the same set under ${SITE_URL}/zh.`,
  );
  lines.push("");

  lines.push("## Optional");
  lines.push("");
  lines.push(`- [全ページの本文（1ファイル）](${SITE_URL}/llms-full.txt): 上記ページの本文をまとめたテキスト。`);
  lines.push(`- [App Store](${APP_STORE_URL}): ダウンロードページ。`);
  lines.push("");

  lines.push("---");
  lines.push(
    `最終更新: 2026-08-19。他社サービスに関する記述は2026-08-16時点の公開情報にもとづきます。引用の際は${PUBLISHER_NAME}／敬語ボタン（${SITE_URL}）を出典としてご記載ください。` +
      ` / Last updated 2026-08-19. Please cite as ${PUBLISHER_NAME} (Core7, Inc.) — KeigoButton, ${SITE_URL}`,
  );

  return lines.join("\n");
}

export function GET() {
  return new Response(build(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
