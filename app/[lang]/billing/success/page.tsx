import type { Metadata } from "next";
import { BillingPage, billingMetadata } from "@/components/pages/BillingPages";
import { isLang } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return billingMetadata(isLang(lang) ? lang : "en", "success");
}

export default async function LocalizedBillingSuccessPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <BillingPage lang={isLang(lang) ? lang : "en"} screen="success" />;
}
