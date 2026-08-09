import type { Metadata } from "next";
import { BillingPage, billingMetadata } from "@/components/pages/BillingPages";

export const metadata: Metadata = billingMetadata("ja", "portal");

export default function BillingReturnPage() {
  return <BillingPage lang="ja" screen="portal" />;
}
