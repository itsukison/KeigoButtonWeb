import type { Metadata } from "next";

export const LEGACY_ICONS: Metadata["icons"] = {
  icon: [
    {
      url: "/icons/legacy/favicon.ico",
      sizes: "16x16 32x32 48x48",
      type: "image/x-icon",
    },
    { url: "/icons/legacy/icon.png", sizes: "192x192", type: "image/png" },
  ],
  apple: [
    {
      url: "/icons/legacy/apple-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
  ],
};
export const isProtectedArticle = (slug: string) =>
  ["ai-keyboard-osusume", "iphone-keigo-keyboard"].includes(slug);
