import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },

  async redirects() {
    return [
      // The site was indexed on the Vercel preview host before keigobutton.com
      // existed. Redirecting at the app level (rather than only setting the
      // primary domain in Vercel) guarantees the consolidation survives any
      // dashboard change and covers every path, not just the root.
      {
        source: "/:path*",
        has: [{ type: "host", value: "keigobutton.vercel.app" }],
        destination: "https://keigobutton.com/:path*",
        permanent: true,
      },
      // www → apex. Vercel's primary-domain setting should already do this, but
      // keeping it here means the canonical host is enforced by the same repo
      // that writes the canonical tags.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.keigobutton.com" }],
        destination: "https://keigobutton.com/:path*",
        permanent: true,
      },
      // /ai-keigo-keyboard was a pre-SEO page (1,001 chars, no row in the
      // keyword map) competing with this article for the same 「iPhone 敬語
      // キーボード」cluster. Search Console had it at "Discovered – currently
      // not indexed" on 2026-07-30, so nothing is being thrown away by folding
      // it in. `permanent: true` emits 308, which Google consolidates the same
      // way as a 301.
      {
        source: "/ai-keigo-keyboard",
        destination: "/blog/iphone-keigo-keyboard",
        permanent: true,
      },
      // /mobile → /iphone. The iPhone landing was moved off `/` on 2026-08-08 and
      // parked at /mobile, which Google never fetched (URL Inspection, 2026-08-16:
      // "検出 - インデックス未登録", lastCrawlTime null) — so the slug is being
      // corrected while there is still nothing to lose. `/mobile` is the URL shape
      // Google documents for the deprecated separate-mobile-site configuration; the
      // page is a product page for the iPhone app, not a device variant of the site,
      // and `/iphone` also matches the query text (「敬語ボタン iPhone」).
      {
        source: "/mobile",
        destination: "/iphone",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
