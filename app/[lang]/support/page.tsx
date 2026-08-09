import type { Metadata } from "next";
import { LegalDoc, legalMetadata } from "@/components/LegalDoc";
import { isLang } from "@/lib/i18n";

function narrow(lang: string) {
  // `dynamicParams = false` on the segment means only "en" and "zh" ever reach here.
  return isLang(lang) && lang !== "ja" ? lang : "en";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return legalMetadata(narrow(lang), "support");
}

export default async function LocalizedSupportPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <LegalDoc lang={narrow(lang)} docKey="support" />;
}
