import type { Metadata } from "next";
import { BillingResult } from "@/components/BillingResult";

export const metadata: Metadata = {
  title: "お手続きが完了しました",
  description: "敬語ボタン Pro のお申し込みが完了しました。",
  // These are personal transaction endpoints reached only from Stripe Checkout.
  // Nothing here belongs in an index, and `session_id` in the URL means an indexed
  // copy would leak one user's Checkout Session id into search results.
  robots: { index: false, follow: false },
};

export default function BillingSuccessPage() {
  return (
    <BillingResult
      eyebrow="お支払い完了"
      title="Pro のご利用を開始できます"
      body={
        <>
          <p>
            ありがとうございます。お支払いが完了し、月1,000回までの書き換えがご利用いただけます。
          </p>
          <p className="mt-4">
            アプリに戻ると、プランが自動的に切り替わります。
          </p>
        </>
      }
      primary={{ label: "敬語ボタンに戻る", href: "keigobutton://billing" }}
    >
      <p>
        領収書はご登録のメールアドレス宛にStripeからお送りします。プランの確認・お支払い方法の変更・解約は、アプリの「プラン」画面からいつでも行えます。
      </p>
      <p className="mt-4">
        {/* The one honest caveat. `success_url` fires on Stripe's redirect, which can
            arrive before the webhook that actually grants Pro — so the app re-reads
            entitlement on return rather than trusting this page, and a user who looks
            within a second or two may briefly still see 無料. Saying so costs one
            sentence and prevents the support ticket. */}
        反映まで数秒かかる場合があります。プランが変わらない場合は、少し待ってからアプリを開き直してください。
      </p>
    </BillingResult>
  );
}
