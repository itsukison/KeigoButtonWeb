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
    ];
  },
};

export default nextConfig;
