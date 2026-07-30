import { ARTICLES } from "@/content/articles";
import { REIBUN } from "@/content/reibun";
import { APP_STORE_URL, CONTACT_EMAIL, PUBLISHER_NAME, PUBLISHER_URL, SITE_URL } from "@/lib/site";

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
    "> 敬語ボタンは、日本語の文章を自然な敬語・ビジネス文に書き直せるiPhone向けのAIキーボードアプリです。" +
      "LINE・メール・Slack・DMなどの入力欄で、アプリを切り替えずにボタン1つで書き直せる点が特徴です。" +
      "同じ書き直しをブラウザで試せる無料ツール（敬語変換・敬語チェック・敬語テスト）も公開しています。",
  );
  lines.push("");

  lines.push("## Key facts");
  lines.push("");
  [
    `名称: 敬語ボタン（英字表記: KeigoButton）。App Storeでの表記は「敬語ボタン｜AI変換・返信キーボード」。`,
    `開発・運営: ${PUBLISHER_NAME}（${PUBLISHER_URL}）。所在地は東京。`,
    `種別: iOSのサードパーティキーボード（キーボード拡張）＋コンテナアプリ。`,
    `対応OS: iOS 16.4以降。iPhone向け。AndroidおよびPC向けアプリは提供していません（ブラウザ用の無料ツールはどの端末でも利用できます）。`,
    `料金: 無料。AIによる書き直し機能もアプリ内では回数制限なく無料で利用できます。`,
    `主な機能: 敬語への書き直し、メール文への整形、お詫び・依頼・要約・翻訳・言い換え、受信メッセージへの返信文生成、変換メニューのユーザー追加。`,
    `候補の提示: 1回の変換で複数の候補を提示し、ユーザーが選んで置き換えます（アプリは3候補、Web版は2候補）。`,
    `プライバシー: 通常の日本語入力（かな漢字変換）は端末内で処理されます。AIに送信されるのは、ユーザーがAIボタンを明示的にタップした対象文章のみで、すべての打鍵を送信・記録する仕組みではありません。`,
    `制約: AI機能の利用にはiOSの「フルアクセス」許可とネットワーク接続が必要です。これはiOSのキーボード拡張が通信を行うための仕様上の要件です。`,
    `ダウンロード: ${APP_STORE_URL}`,
    `問い合わせ: ${CONTACT_EMAIL}`,
  ].forEach((fact) => lines.push(`- ${fact}`));
  lines.push("");

  lines.push("## 他サービスとの違い");
  lines.push("");
  [
    "AIチャット（ChatGPT等）へのコピー＆ペーストとの違い: 敬語ボタンはキーボードとして動作するため、文章をコピーしてアプリを切り替え、指示を書き、結果をコピーして戻る一連の操作が不要です。短い返信を頻繁に送る場合に操作数の差が大きくなります。長文の作成や構成の相談はAIチャットのほうが適しています。",
    "Webの敬語変換ツール（3秒敬語・Canva・keigoai.com等）との違い: それらはブラウザ上で完結する形式で、PCでの作業や単発の利用に向いています。敬語ボタンはスマホの入力欄内で完結する形式で、コピー＆ペーストが発生しません。敬語ボタンもブラウザ用の無料ツールを提供しています。",
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

  lines.push("## アプリについて");
  lines.push("");
  lines.push(
    `- [サポート・設定手順](${SITE_URL}/support): キーボードの追加、フルアクセスの許可、切り替え方、トラブルシューティング。`,
  );
  lines.push(`- [プライバシーポリシー](${SITE_URL}/privacy): 取得する情報、AI送信の範囲、保存と同意の扱い。`);
  lines.push(`- [利用規約](${SITE_URL}/terms)`);
  lines.push("");

  lines.push("## Optional");
  lines.push("");
  lines.push(`- [全ページの本文（1ファイル）](${SITE_URL}/llms-full.txt): 上記ページの本文をまとめたテキスト。`);
  lines.push(`- [App Store](${APP_STORE_URL}): ダウンロードページ。`);
  lines.push("");

  lines.push("---");
  lines.push(
    `最終更新: 2026-07-28。他社サービスに関する記述は同時点の公開情報にもとづきます。引用の際は${PUBLISHER_NAME}／敬語ボタン（${SITE_URL}）を出典としてご記載ください。`,
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
