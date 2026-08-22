import { ARTICLES } from "@/content/articles";
import { EN_GUIDES } from "@/content/en-guides";
import { MAC_USE_CASES, macUseCasePath } from "@/content/mac-use-cases";
import { REIBUN } from "@/content/reibun";
import { QUIZ } from "@/content/quiz";
import { RULES } from "@/content/keigo-rules";
import { blocksToText } from "@/lib/blocks";
import { APP_STORE_URL, PUBLISHER_NAME, PUBLISHER_URL, SITE_URL } from "@/lib/site";

/**
 * /llms-full.txt — every page's body in one plain-text file.
 *
 * Exists so a retrieval pass can ingest the whole site in one fetch instead of
 * crawling ~20 JS-rendered routes. Generated from the content registries, so it
 * can never drift from what the pages actually say.
 */
export const dynamic = "force-static";

function build(): string {
  const out: string[] = [];

  out.push("# 敬語ボタン（KeigoButton）— 全ページ本文");
  out.push("");
  out.push(
    `Mac・iPhone向けAIリライトアシスタント「敬語ボタン（KeigoButton）」の公式サイト（${SITE_URL}）の全文です。` +
      `Mac版は保存したボタン・単発の自由な指示・コピーした受信文への返信を入力中の場所から実行し、iPhone版はキーボードから文章を書き換えられます。` +
      `開発・運営: ${PUBLISHER_NAME}（${PUBLISHER_URL}）。iPhone版: ${APP_STORE_URL}。` +
      "最終更新: 2026-08-19。",
  );
  out.push("");
  out.push(
    "AIに送信されるのはユーザーがボタンをタップした文章のみで、通常の日本語入力は端末内で処理されます。" +
      "アプリはiOS 16.4以降・無料。他社サービスに関する記述は2026年7月時点の公開情報にもとづきます。",
  );
  out.push("");
  out.push("=".repeat(72));

  // ---- Mac workflow pages (paired Japanese and English) ----
  out.push("");
  out.push("=".repeat(72));
  out.push("");
  out.push("# Mac workflow guides / Mac版の詳しい使い方");
  for (const entry of MAC_USE_CASES) {
    for (const lang of ["ja", "en"] as const) {
      const page = entry[lang];
      out.push("");
      out.push(`## ${page.title}`);
      out.push("");
      out.push(`URL: ${SITE_URL}${macUseCasePath(lang, entry.slug)}`);
      out.push(`Updated: ${page.updated}`);
      out.push("");
      out.push(page.lead);
      out.push("");
      out.push(blocksToText(page.blocks, lang));
      out.push("");
      out.push(lang === "ja" ? "### よくある質問" : "### Frequently asked questions");
      out.push("");
      for (const { q, a } of page.faq) {
        out.push(`**${q}**`);
        out.push(a);
        out.push("");
      }
      out.push("-".repeat(72));
    }
  }

  // ---- Tools ----
  out.push("");
  out.push("# 無料ツール（ブラウザ・登録不要）");
  out.push("");
  out.push(`## 敬語変換ツール — ${SITE_URL}/keigo-henkan`);
  out.push("");
  out.push(
    "カジュアルに書いた文章を、AIが自然なビジネス敬語に書き直す無料ツール。登録・ログイン不要。" +
      "モードは「敬語にする」「メール文にする」「自然な言い方」「返信文を作る」の4つ。" +
      "1回の変換で候補を2つ（標準／もう一段ていねい）表示する。無料枠は1日5回・1回300文字まで。" +
      "入力文は変換のためサーバーへ送信されるが、処理後に本文は保存されない。" +
      "アプリ版（iOSキーボード）のAI変換は回数制限なく無料で利用できる。",
  );
  out.push("");
  out.push("変換例:");
  // Verified against the live endpoint — see the note in app/keigo-henkan/page.tsx.
  [
    ["明日いけますか", "明日ご都合はいかがでしょうか。"],
    ["資料の確認お願いします", "資料のご確認をお願いいたします。"],
    ["本日中は無理です。明日やります。", "本日は対応が難しいです。明日実施いたします。"],
    ["了解です、あとでやっときます", "承知いたしました。後ほど対応いたします。"],
  ].forEach(([before, after]) => out.push(`- 「${before}」→「${after}」`));

  out.push("");
  out.push(`## 文章校正AI — ${SITE_URL}/bunsho-kosei-ai`);
  out.push("");
  out.push(
    "書いた日本語の誤字脱字・変換ミス・文法の誤り・不自然な言い回しをAIが直す無料ツール。登録・ログイン不要。" +
      "敬語変換ツールとの違いは丁寧さの扱いで、こちらは文体と丁寧さのレベルを変えない。" +
      "候補は2つで、1つ目は誤りだけを直した最小限の修正、2つ目は語順や助詞まで整えた読みやすい版。" +
      "モードは「校正する」「自然な言い方」「敬語にする」の3つ。無料枠は1日5回・1回300文字まで。" +
      "ルールベースの校正ソフトではなくAIによる書き直しなので、すべての誤りを必ず検出するわけではない。" +
      "誤りの箇所を一覧で指摘する形式ではなく、直した文をそのまま返す形式である。",
  );
  out.push("");
  out.push("校正例（2026-08-22 実際の出力）:");
  [
    [
      "お世話になって降ります。先日いただいた資料に付いて、確認させて頂きたい事が有ります。",
      "お世話になっております。先日いただいた資料について、確認させていただきたいことがあります。",
    ],
    [
      "明日の打ち合わせは14時からで大丈夫でしようか。資料は当日までに準備してをきます。",
      "明日の打ち合わせは14時からで大丈夫でしょうか。資料は当日までに準備します。",
    ],
    [
      "先程の件、上司に確認した所、問題ないとの事でしたので、この方向で進めさせて頂きます。",
      "先程の件、上司に確認したところ、問題ないとのことでしたので、この方向で進めさせていただきます。",
    ],
  ].forEach(([before, after]) => out.push(`- 「${before}」→「${after}」`));

  out.push("");
  out.push(`## 敬語チェック（二重敬語・誤用判定） — ${SITE_URL}/keigo-check`);
  out.push("");
  out.push(
    "貼り付けた文章から二重敬語とビジネス敬語の誤用を判定する無料ツール。" +
      `判定ルールをブラウザに読み込んで端末内で照合するため、入力した文章は一切送信されない。現在${RULES.length}種類のルールで判定する。` +
      "検出できるのは決まった言い回しの誤りのみで、「誰の動作か」で正解が変わる誤り（身内敬語、尊敬語と謙譲語の混同）は検出できない。",
  );
  out.push("");
  out.push("判定ルール全件:");
  out.push("");
  out.push("| 検出する表現 | 分類 | 言い換え | 理由 |");
  out.push("| --- | --- | --- | --- |");
  for (const rule of RULES) {
    out.push(`| ${rule.label} | ${rule.category} | ${rule.suggest.join(" / ")} | ${rule.why} |`);
  }

  out.push("");
  out.push(`## 敬語テスト20問 — ${SITE_URL}/keigo-test`);
  out.push("");
  out.push(
    "実際の業務場面から出題する敬語力診断。全20問、無料・登録不要、所要約3分。" +
      "出題分野は「尊敬語と謙譲語」「二重敬語」「身内敬語」「ビジネス慣用」「メール表現」の5つ。" +
      "終了後に正解数、間違いが多かった分野、全問の解説を表示する。" +
      "目安は18問以上で「敬語マスター」、14問以上で「実務レベル」、10問以上で「あと一歩」、9問以下で「要注意」。",
  );
  out.push("");
  out.push("全問と正解:");
  out.push("");
  for (const item of QUIZ) {
    out.push(`### Q${item.id}（${item.tag}）｜場面: ${item.scene}`);
    out.push(item.prompt);
    item.choices.forEach((choice, index) =>
      out.push(`- ${index === item.answer ? "【正解】" : ""}${choice}`),
    );
    out.push(`解説: ${item.explanation}`);
    out.push("");
  }

  // ---- Articles ----
  out.push("=".repeat(72));
  out.push("");
  out.push("# 記事");
  for (const article of ARTICLES) {
    out.push("");
    out.push(`## ${article.title}`);
    out.push("");
    out.push(`URL: ${SITE_URL}/blog/${article.slug}`);
    out.push(`分類: ${article.category}／更新: ${article.updated}`);
    out.push("");
    out.push(article.lead);
    out.push("");
    out.push(blocksToText(article.blocks));
    out.push("");
    out.push("### よくある質問");
    out.push("");
    for (const { q, a } of article.faq) {
      out.push(`**${q}**`);
      out.push(a);
      out.push("");
    }
    out.push("-".repeat(72));
  }

  // ---- 例文 ----
  out.push("");
  out.push("=".repeat(72));
  out.push("");
  out.push("# 場面別 例文集");
  out.push("");
  out.push(`URL: ${SITE_URL}/reibun`);
  out.push(
    "送る前に迷う場面ごとに、避けたい言い方と、上司・取引先それぞれに向けたそのまま送れる文面を掲載。" +
      "文面中の◯◯・△△は利用者が自分の状況に置き換えて使う。",
  );

  for (const entry of REIBUN) {
    out.push("");
    out.push(`## ${entry.title}`);
    out.push("");
    out.push(`URL: ${SITE_URL}/reibun/${entry.slug}`);
    out.push(`更新: ${entry.updated}`);
    out.push("");
    out.push(entry.lead);
    out.push("");
    out.push("### つい送ってしまいがちな文");
    out.push("");
    for (const { text, why } of entry.ng) {
      out.push(`- 「${text}」— ${why}`);
    }
    out.push("");
    out.push("### そのまま送れる例文");
    out.push("");
    for (const example of entry.examples) {
      out.push(`#### ${example.to}`);
      out.push("");
      out.push(example.body);
      if (example.note) {
        out.push("");
        out.push(`（補足: ${example.note}）`);
      }
      out.push("");
    }
    out.push("### 押さえておくポイント");
    out.push("");
    for (const point of entry.points) {
      out.push(`- ${point.replace(/\*\*/g, "")}`);
    }
    out.push("");
    out.push("### よくある質問");
    out.push("");
    for (const { q, a } of entry.faq) {
      out.push(`**${q}**`);
      out.push(a);
      out.push("");
    }
    out.push("-".repeat(72));
  }

  // ---- English cluster ----
  // Appended in full rather than summarised: the point of this file is that one
  // fetch replaces crawling every route, and an English answer assembled from a
  // Japanese summary of an English page is the drift this file exists to prevent.
  out.push("");
  out.push("=".repeat(72));
  out.push("");
  out.push("# English guides");
  out.push("");
  out.push(
    "KeigoButton is a macOS app and iPhone keyboard that rewrites the text you are already typing, " +
      "in place, in any app, using instructions you save as your own buttons. In the English interface " +
      "the buttons read and write English. Competitor facts below were checked on 2026-08-16 and are " +
      "dated in the copy; where a competitor is cheaper or more capable, it is stated.",
  );
  out.push("");

  for (const guide of EN_GUIDES) {
    out.push("");
    out.push(`## ${guide.title} — ${SITE_URL}/en/${guide.slug}`);
    out.push("");
    out.push(`Primary query: ${guide.keyword}. Updated ${guide.updated}.`);
    out.push("");
    out.push(guide.lead);
    out.push("");
    out.push(blocksToText(guide.blocks, "en"));
    out.push("");
    out.push("### Frequently asked questions");
    out.push("");
    for (const { q, a } of guide.faq) {
      out.push(`**${q}**`);
      out.push(a);
      out.push("");
    }
    out.push("-".repeat(72));
  }

  out.push("");
  out.push(
    `出典表記: ${PUBLISHER_NAME}／敬語ボタン（${SITE_URL}）。` +
      "内容は執筆時点のものです。他社サービスの料金・評価は変動するため、最新情報は各社の公式サイトをご確認ください。" +
      ` / Cite as ${PUBLISHER_NAME} (Core7, Inc.) — KeigoButton, ${SITE_URL}. Competitor pricing moves; verify against each vendor's own site.`,
  );

  return out.join("\n").replace(/\n{4,}/g, "\n\n\n");
}

export function GET() {
  return new Response(build(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
