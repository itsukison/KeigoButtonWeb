import type { Metadata } from "next";
import { BillingPage, billingMetadata } from "@/components/pages/BillingPages";

export const metadata: Metadata = billingMetadata("ja", "success");

export default function BillingSuccessPage() {
  return <BillingPage lang="ja" screen="success" />;
}
