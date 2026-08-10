import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { APP_STORE_URL, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
  description:
    "敬語ボタン（iOSキーボードアプリ／Mac版アプリ）の特定商取引法に基づく表記です。",
  alternates: { canonical: "/legal" },
};

export default function LegalNoticePage() {
  return (
    <LegalPage
      title="特定商取引法に基づく表記"
      updatedAt="最終更新日：2026年8月8日"
      lead="「敬語ボタン」（iOSキーボードアプリおよびMac版アプリ）の通信販売に関する表示です。有料プランはMac版アプリのみが対象で、iOS版は無料でご利用いただけます。"
    >
      <table>
        <tbody>
          <tr>
            <th scope="row">販売業者</th>
            <td>孫逸歓</td>
          </tr>
          <tr>
            <th scope="row">所在地</th>
            <td>
              〒156-0053
              <br />
              東京都世田谷区桜3-9-24
            </td>
          </tr>
          <tr>
            <th scope="row">電話番号</th>
            <td>
              <a href="tel:08087004730" className="link-underline">
                080-8700-4730
              </a>
              <br />
              受付時間：平日 10:00〜18:00（土日祝・年末年始を除く）
            </td>
          </tr>
          <tr>
            <th scope="row">メールアドレス</th>
            <td>
              <a href={`mailto:${CONTACT_EMAIL}`} className="link-underline">
                {CONTACT_EMAIL}
              </a>
            </td>
          </tr>
          <tr>
            <th scope="row">販売価格</th>
            <td>
              <p>
                <strong>
                  iOS版（
                  <a href={APP_STORE_URL} className="link-underline">
                    キーボードアプリ
                  </a>
                  ）：
                </strong>
                無料。アプリ内課金および有料プランはありません。
              </p>
              <p className="mt-3">
                <strong>Mac版アプリ 無料プラン：</strong>
                ¥0（書き換え 月50回まで）
              </p>
              <p className="mt-3">
                <strong>Mac版アプリ 有料プラン「Pro」：</strong>
                書き換え 月1,000回まで
                <br />
                ・月払い：月額 ¥1,480
                <br />
                ・年払い：年額 ¥14,400／月あたり ¥1,200 相当
              </p>
              {/*
                Added 2026-08-10. The Mac app charges USD to anyone using it in English
                (laptop/docs/pricing.md §1), so a 販売価格 disclosure listing only yen
                understates what a real buyer is charged. Which currency applies is
                decided by the app's display language and is shown again at checkout.
              */}
              <p className="mt-3">
                アプリの表示言語を英語に設定してご購入の場合は、米ドル建てでのご請求となります。
                <br />
                ・月払い：月額 US$12
                <br />
                ・年払い：年額 US$120／月あたり US$10 相当
              </p>
              <p className="mt-3">
                はじめてご利用の方に対し、最初のご請求分に限り割引価格をご提示する場合があります。割引後の金額、割引が適用される期間、および次回以降の通常価格は、いずれも購入手続きの画面に表示します。
              </p>
              {/*
                **Not 「税込」.** laptop/docs/billing.md §10: Core7 is a 免税事業者 and not an
                適格請求書発行事業者, so a 消費税 claim is not ours to make — and 消費税法第63条's
                総額表示義務 excludes 免税事業者 by the text of the article, so nothing required
                the word either. The Mac app's plan card and the landing page have carried
                this sentence since 2026-08-08; this page was the last one still asserting
                「価格はすべて消費税を含む総額です」.
              */}
              <p className="mt-3">
                表示価格が実際にご請求される金額です。プランの内容および価格は、Mac版アプリ内の購入画面にも表示します。
              </p>
            </td>
          </tr>
          <tr>
            <th scope="row">商品代金以外の必要料金</th>
            <td>
              なし（インターネット通信料等はお客様の負担となります）。
            </td>
          </tr>
          <tr>
            <th scope="row">ソフトウェアの動作環境</th>
            <td>
              <p>
                <strong>Mac版アプリ：</strong>macOS 14.0 以降。ご利用にはmacOSの「アクセシビリティ」の許可が必要です。Mac App Storeでは配布しておらず、当方のウェブサイトから直接ダウンロードしていただく形式です。
              </p>
              <p className="mt-3">
                <strong>iOS版：</strong>
                <a href={APP_STORE_URL} className="link-underline">
                  App Store上の商品ページ
                </a>
                に記載の対応バージョンをご確認ください。
              </p>
            </td>
          </tr>
          <tr>
            <th scope="row">代金の支払方法</th>
            <td>
              <p>
                Mac版アプリの有料プランは、Stripe, Inc. が提供する決済サービスを通じたクレジットカード決済（Apple Payを含む）です。カード番号等の決済情報はStripeが処理し、当方では取得・保存しません。
              </p>
              <p className="mt-3">
                iOS版は無料のため、お支払いは発生しません。
              </p>
            </td>
          </tr>
          <tr>
            <th scope="row">代金の支払時期</th>
            <td>
              初回はお申込み手続きの完了時に請求されます。自動更新のため、以降は各課金期間（1ヶ月または1年）の開始時に自動的に請求されます。
            </td>
          </tr>
          <tr>
            <th scope="row">役務の提供時期</th>
            <td>
              アプリのダウンロード後、または有料プランのお申込み完了後、直ちにご利用いただけます。
            </td>
          </tr>
          <tr>
            <th scope="row">申込みの期間に関する定め</th>
            <td>なし</td>
          </tr>
          <tr>
            <th scope="row">申込みの撤回・契約の解除</th>
            <td>
              <p>
                有料プランの解約は、Mac版アプリの「アカウント」画面からお支払い管理ページ（Stripeカスタマーポータル）を開き、いつでも手続きできます。次回更新日の前日までに解約された場合、それ以降の請求は発生しません。
              </p>
              <p className="mt-3">
                解約後も、当該課金期間の終了までは引き続きご利用いただけます。既にお支払い済みの料金について、原則として返金は行いません。
              </p>
              <p className="mt-3">
                デジタルコンテンツ・役務の性質上、提供開始後のクーリングオフ（申込みの撤回）の適用はない場合があります。詳細は
                <a href="/terms" className="link-underline">
                  利用規約
                </a>
                もあわせてご確認ください。
              </p>
              <p className="mt-3">
                iOS版は無料のため、解約の手続きはありません。アプリを削除することでご利用を終了できます。
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      <p className="text-[var(--muted)]">
        本表記に関するお問い合わせは、上記メールアドレスまたは電話番号までご連絡ください。
      </p>
    </LegalPage>
  );
}
