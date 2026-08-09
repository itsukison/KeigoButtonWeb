import type { Metadata } from "next";
import { MacHome, macMetadata } from "@/components/pages/MacHome";
import "./mac-landing.css";

// 日本語, at `/`. The body and the metadata are shared with `/en` and `/zh` — see
// `components/pages/MacHome.tsx` for why they are one file rather than three.
export const metadata: Metadata = macMetadata("ja");

export default function Home() {
  return <MacHome lang="ja" />;
}
