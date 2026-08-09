import type { Metadata } from "next";
import { BillingResult } from "@/components/BillingResult";

export const metadata: Metadata = {
  title: "お手続きが完了しました",
  description: "お支払い管理からお戻りいただきました。",
  robots: { index: false, follow: false },
};

/// The Billing Portal's `return_url`.
///
/// This one page is the exit from every portal flow — cancelling, un-cancelling,
/// switching to annual, updating a card — so it cannot name what just happened. It
/// deliberately does not guess: claiming 「解約が完了しました」 to someone who only
/// looked at an invoice would be worse than saying nothing. The app re-reads
/// entitlement on return and shows the actual state, which is the one source that
/// is always right.
export default function BillingReturnPage() {
  return (
    <BillingResult
      eyebrow="お支払い管理"
      title="変更内容を保存しました"
      body={
        <>
          <p>
            お支払い管理での操作は完了しています。現在のプランはアプリの「プラン」画面でご確認いただけます。
          </p>
          <p className="mt-4">
            解約された場合も、お支払い済みの期間が終了するまでは Pro をそのままご利用いただけます。
          </p>
        </>
      }
      primary={{ label: "敬語ボタンに戻る", href: "keigobutton://billing" }}
    >
      <p>
        変更が反映されるまで数秒かかる場合があります。表示が変わらない場合は、少し待ってからアプリを開き直してください。
      </p>
    </BillingResult>
  );
}
