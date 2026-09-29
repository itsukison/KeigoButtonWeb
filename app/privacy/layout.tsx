import type { Metadata } from "next";
import { LEGACY_ICONS } from "@/lib/appearance";
export const metadata: Metadata = { icons: LEGACY_ICONS };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
