import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { ARTICLES } from "@/content/articles";
import { REIBUN } from "@/content/reibun";

/**
 * Derived from the content registries so a new article or 例文 page is in the
 * sitemap the moment it is written. Never hand-maintain this list.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: "2026-08-08", changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/mobile`, lastModified: "2026-08-08", changeFrequency: "monthly", priority: 0.9 },

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

  return [...staticRoutes, ...articleRoutes, ...reibunRoutes];
}
