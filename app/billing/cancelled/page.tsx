import type { Metadata } from "next";
import { BillingPage, billingMetadata } from "@/components/pages/BillingPages";

export const metadata: Metadata = billingMetadata("ja", "cancelled");

export default function BillingCancelledPage() {
  return <BillingPage lang="ja" screen="cancelled" />;
}
