import type { Metadata } from "next";
import { MacHome, macMetadata } from "@/components/pages/MacHome";
import { isLang } from "@/lib/i18n";
import "../mac-landing.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return macMetadata(isLang(lang) ? lang : "en");
}

export default async function LocalizedHome({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <MacHome lang={isLang(lang) ? lang : "en"} />;
}
