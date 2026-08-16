import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { ARTICLES } from "@/content/articles";
import { EN_GUIDES } from "@/content/en-guides";
import { REIBUN } from "@/content/reibun";
import { SPINE_PATHS } from "@/lib/alternates";
import { PREFIXED_LANGS, href } from "@/lib/i18n";

/**
 * Derived from the content registries so a new article or 例文 page is in the
 * sitemap the moment it is written. Never hand-maintain this list.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: "2026-08-08", changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/iphone`, lastModified: "2026-08-16", changeFrequency: "monthly", priority: 0.9 },

    // Tools — the primary organic entry points.
    { url: `${SITE_URL}/keigo-henkan`, lastModified: "2026-07-28", changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/keigo-check`, lastModified: "2026-07-28", changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/keigo-test`, lastModified: "2026-07-28", changeFrequency: "monthly", priority: 0.85 },

    // Hubs.
    { url: `${SITE_URL}/reibun`, lastModified: "2026-07-28", changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_URL}/blog`, lastModified: "2026-07-28", changeFrequency: "weekly", priority: 0.8 },

    { url: `${SITE_URL}/support`, lastModified: "2026-06-08", changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/privacy`, lastModified: "2026-07-02", changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: "2026-06-08", changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/legal`, lastModified: "2026-08-08", changeFrequency: "yearly", priority: 0.3 },
  ];

  // The translated spine only. The Japanese tool and article pages have no English
  // or Chinese counterpart by decision (lib/i18n.ts), so they appear once, as they
  // always have — listing a URL that does not exist is worse than listing nothing.
  const localizedRoutes: MetadataRoute.Sitemap = PREFIXED_LANGS.flatMap((lang) =>
    SPINE_PATHS.map((path) => ({
      url: `${SITE_URL}${href(lang, path)}`,
      lastModified: "2026-08-09",
      changeFrequency: "monthly" as const,
      // Below their Japanese originals: these are new, and the Japanese pages are
      // the ones with the history and the links.
      priority: path === "/" ? 0.8 : 0.5,
    })),
  );

  // The free English tool. Priority matches the Japanese tools, which are the
  // pages that actually rank on this property.
  const enToolRoute: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/en/rewrite`,
      lastModified: "2026-08-17",
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // The English cluster. No `alternates` entry: these have no Japanese counterpart
  // by decision (app/[lang]/[slug]/page.tsx), so they appear once like the Japanese
  // tool pages do.
  const enGuideRoutes: MetadataRoute.Sitemap = EN_GUIDES.map((guide) => ({
    url: `${SITE_URL}/en/${guide.slug}`,
    lastModified: guide.updated,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const articleRoutes: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${SITE_URL}/blog/${article.slug}`,
    lastModified: article.updated,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const reibunRoutes: MetadataRoute.Sitemap = REIBUN.map((entry) => ({
    url: `${SITE_URL}/reibun/${entry.slug}`,
    lastModified: entry.updated,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...localizedRoutes,
    ...enToolRoute,
    ...enGuideRoutes,
    ...articleRoutes,
    ...reibunRoutes,
  ];
}
