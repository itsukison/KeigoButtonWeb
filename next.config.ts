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
    ];
  },
};

export default nextConfig;
