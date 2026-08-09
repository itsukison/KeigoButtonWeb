import type { Metadata } from "next";
import { BillingResult } from "@/components/BillingResult";

export const metadata: Metadata = {
  title: "お手続きを中断しました",
  description: "お支払い手続きは完了していません。",
  robots: { index: false, follow: false },
};

/// Reached from Checkout's `cancel_url` — the user backed out of the payment form.
///
/// Nothing was charged and nothing is wrong, so this says exactly that and stops.
/// A "are you sure?" or a discount offer here would be the 引き留め pattern the
/// 消費者庁 検討会 flags, and this is the moment a user is most sensitive to it.
export default function BillingCancelledPage() {
  return (
    <BillingResult
      eyebrow="お手続き中断"
      title="お支払いは行われていません"
      body={
        <>
          <p>
            お手続きを中断しました。料金は請求されていません。
          </p>
          <p className="mt-4">
            無料プランは引き続きそのままご利用いただけます。月50回まで書き換えできます。
          </p>
        </>
      }
      primary={{ label: "敬語ボタンに戻る", href: "keigobutton://billing" }}
    >
      <p>
        あらためてお申し込みいただく場合は、アプリの「プラン」画面からいつでもお手続きいただけます。
      </p>
    </BillingResult>
  );
}
