"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { APP_STORE_URL, MAC_DOWNLOAD_URL } from "@/lib/site";

/**
 * The two download CTAs, ordered by the visitor's device.
 *
 * **Why this is device-aware rather than two equal buttons.** The two surfaces are
 * not interchangeable: `MAC_DOWNLOAD_URL` is a `.dmg`, so offering it to someone on
 * a phone hands them a file their device cannot open, and offering only the App
 * Store to someone on a Mac hides the product they can actually install right now.
 * The Mac app cannot ship on the Mac App Store (`laptop/AGENTS.md` §2), so the site
 * is its only distribution channel — every closing CTA has to carry it.
 *
 * **Server render is the phone variant, deliberately.** `/` is crawled as MOBILE and
 * the Japanese search traffic is mostly phone users (seo-geo.md §前提の修正 2026-08-16),
 * so the pre-hydration markup shows the App Store first and links the Mac option to
 * the Mac landing page rather than to the installer. The Mac-first arrangement
 * appears after hydration on a Mac, which avoids a hydration mismatch — the first
 * render is identical on server and client.
 *
 * iPads running desktop-mode Safari report a Macintosh user agent, so touch points
 * are checked before treating a visitor as a Mac.
 */
export function PlatformDownloads({ size = "lg" }: { size?: "lg" | "sm" }) {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    const macLike = /Macintosh|Mac OS X/.test(ua);
    const touch = navigator.maxTouchPoints > 1;
    setIsMac(macLike && !touch);
  }, []);

  const primary =
    size === "lg"
      ? "rounded-xl bg-[#C8BCFA] px-6 py-3 text-[14px] font-bold text-black transition-transform active:scale-[0.98]"
      : "rounded-xl bg-[#C8BCFA] px-5 py-2.5 text-[13px] font-bold text-black";
  const secondary =
    size === "lg"
      ? "rounded-xl px-5 py-3 text-[14px] font-semibold text-white/70 ring-1 ring-white/20 transition-colors hover:text-white"
      : "text-[12.5px] font-semibold text-white/70 underline decoration-white/25 underline-offset-4 hover:text-white";

  if (isMac) {
    return (
      <>
        <a href={MAC_DOWNLOAD_URL} className={primary}>
          Mac版を無料ダウンロード
        </a>
        <a href={APP_STORE_URL} className={secondary}>
          iPhoneのキーボードでも使う
        </a>
      </>
    );
  }

  return (
    <>
      <a href={APP_STORE_URL} className={primary}>
        App Storeで無料ダウンロード
      </a>
      {/* A phone cannot open a .dmg, so this points at the Mac page, not the installer. */}
      <Link href="/" className={secondary}>
        Mac版について
      </Link>
    </>
  );
}
