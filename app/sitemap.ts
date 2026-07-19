import type { MetadataRoute } from "next";

const SITE_URL = "https://keigobutton.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: "2026-07-19",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/ai-keigo-keyboard`,
      lastModified: "2026-07-19",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/support`,
      lastModified: "2026-06-08",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: "2026-07-02",
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: "2026-06-08",
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}
