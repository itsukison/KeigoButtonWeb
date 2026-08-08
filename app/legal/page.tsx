import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { APP_STORE_URL, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
  description:
    "敬語ボタン（iOSキーボードアプリ）の特定商取引法に基づく表記です。",
  alternates: { canonical: "/legal" },
};

export default function LegalNoticePage() {
  return (
    <LegalPage
      title="特定商取引法に基づく表記"
      updatedAt="最終更新日：2026年8月8日"
      lead="iOSキーボードアプリ「敬語ボタン」の通信販売に関する表示です。"
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
                <strong>アプリのダウンロード：</strong>無料
              </p>
              <p className="mt-3">
                <strong>サブスクリプション（有料プラン）：</strong>
                現在準備中です。提供開始後、各プランの税込価格・課金サイクル・提供内容は、
                <a href={APP_STORE_URL} className="link-underline">
                  App Store上の商品ページ
                </a>
                およびアプリ内に表示します。
              </p>
            </td>
          </tr>
          <tr>
            <th scope="row">商品代金以外の必要料金</th>
            <td>
              なし（インターネット通信料、App Storeの利用に伴う通信料等はお客様の負担となります）。
            </td>
          </tr>
          <tr>
            <th scope="row">代金の支払方法</th>
            <td>
              App Storeを通じた決済（Apple IDに登録された支払方法）。クレジットカード等の決済情報は当方では取得・保存しません。
            </td>
          </tr>
          <tr>
            <th scope="row">代金の支払時期</th>
            <td>
              サブスクリプションの初回購入確定時にApp Storeを通じて請求されます。自動更新プランの場合、各課金期間の開始時にApp Storeを通じて自動的に請求されます。
            </td>
          </tr>
          <tr>
            <th scope="row">役務の提供時期</th>
            <td>
              アプリのダウンロード、またはサブスクリプションの購入完了後、直ちにご利用いただけます。
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
                サブスクリプションの解約は、iOSの「設定」→ Apple ID（画面上部のお名前）→「サブスクリプション」から、対象のプランを選択して行ってください。
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
