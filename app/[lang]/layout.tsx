import { notFound } from "next/navigation";
import { LangShell } from "@/components/LangShell";
import { PREFIXED_LANGS, isLang } from "@/lib/i18n";

/**
 * The English and Chinese half of the site.
 *
 * **Japanese is not under this segment**, and that is the whole design: it stays on
 * the unprefixed routes it is already indexed on (`/`, `/keigo-henkan`, …). Next's
 * i18n guide nests every locale including the default, which would have moved every
 * ranking URL. `/en` and `/zh` are additive instead — no existing path changes, and
 * nothing outside the translated spine is touched.
 *
 * `dynamicParams = false` makes anything other than `en` and `zh` a 404 rather than
 * an attempted render, so `/foo` behaves exactly as it did before this segment
 * existed. Static routes still win over this dynamic one, which is what keeps
 * `/iphone`, `/blog` and `/reibun` resolving to their Japanese pages.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return PREFIXED_LANGS.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang) || lang === "ja") notFound();

  return <LangShell lang={lang}>{children}</LangShell>;
}
