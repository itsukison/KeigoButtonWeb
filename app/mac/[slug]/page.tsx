import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MAC_USE_CASES, macUseCase, macUseCasePath } from "@/content/mac-use-cases";
import { MacUseCasePage } from "@/components/pages/MacUseCasePage";
import "../../mac-landing.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return MAC_USE_CASES.map((entry) => ({ slug: entry.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = macUseCase(slug);
  if (!entry) return {};
  const page = entry.ja;
  const path = macUseCasePath("ja", entry.slug);
  const enPath = macUseCasePath("en", entry.slug);

  return {
    title: { absolute: page.metaTitle },
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: path,
      languages: { ja: path, en: enPath, "x-default": path },
    },
    openGraph: {
      title: page.metaTitle,
      description: page.description,
      url: path,
      type: "article",
      publishedTime: page.published,
      modifiedTime: page.updated,
      locale: "ja_JP",
      alternateLocale: ["en_US"],
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

export default async function JapaneseMacUseCase({ params }: Props) {
  const { slug } = await params;
  const entry = macUseCase(slug);
  if (!entry) notFound();
  return <MacUseCasePage lang="ja" entry={entry} />;
}
