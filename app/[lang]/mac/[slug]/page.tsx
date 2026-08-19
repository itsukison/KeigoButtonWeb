import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MAC_USE_CASES, macUseCase, macUseCasePath } from "@/content/mac-use-cases";
import { MacUseCasePage } from "@/components/pages/MacUseCasePage";
import "../../../mac-landing.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return MAC_USE_CASES.map((entry) => ({ lang: "en", slug: entry.slug }));
}

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const entry = macUseCase(slug);
  if (!entry || lang !== "en") return {};
  const page = entry.en;
  const path = macUseCasePath("en", entry.slug);
  const jaPath = macUseCasePath("ja", entry.slug);

  return {
    title: { absolute: page.metaTitle },
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: path,
      languages: { ja: jaPath, en: path, "x-default": jaPath },
    },
    openGraph: {
      title: page.metaTitle,
      description: page.description,
      url: path,
      type: "article",
      publishedTime: page.published,
      modifiedTime: page.updated,
      locale: "en_US",
      alternateLocale: ["ja_JP"],
      images: [{ url: "/mac-footer.png", alt: page.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.description,
      images: ["/mac-footer.png"],
    },
  };
}

export default async function EnglishMacUseCase({ params }: Props) {
  const { lang, slug } = await params;
  const entry = macUseCase(slug);
  if (!entry || lang !== "en") notFound();
  return <MacUseCasePage lang="en" entry={entry} />;
}
