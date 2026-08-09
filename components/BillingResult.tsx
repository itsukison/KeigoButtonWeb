import type { ReactNode } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

/// The three screens the Mac app's billing flow returns to.
///
/// Checkout and the Billing Portal both hand off to the DEFAULT BROWSER rather than a
/// web view, because Apple Pay needs Safari's payment sheet. That is the right call
/// for conversion and it leaves the user standing on this domain afterwards with no
/// obvious way back — all three of these URLs were 404s, so a completed ¥1,480
/// purchase ended on a "page not found". This is the other half of that hand-off.
///
/// Deliberately NOT a `LegalPage`: these are transactional confirmations, read in
/// about four seconds, and the long-prose layout would bury the one thing that
/// matters — that it worked, and where to go now.
type Props = {
  eyebrow: string;
  title: string;
  body: ReactNode;
  /** Shown as the primary action. Every page here has exactly one. */
  primary: { label: string; href: string };
  children?: ReactNode;
};

export function BillingResult({ eyebrow, title, body, primary, children }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader />
      <main className="flex-1 flex items-start justify-center px-6 py-24 md:py-32">
        <div className="w-full max-w-[520px]">
          <p className="text-[12px] tracking-[0.18em] text-[var(--muted)] uppercase mb-4">
            {eyebrow}
          </p>
          <h1 className="text-[28px] md:text-[32px] font-semibold tracking-tight leading-tight">
            {title}
          </h1>
          <div className="mt-5 text-[15px] text-[var(--muted)] leading-[1.9]">
            {body}
          </div>

          <div className="mt-9">
            {/* A plain <a>, not next/link: `keigobutton://` is a custom scheme and
                the router would try to treat it as an internal route. */}
            <a
              href={primary.href}
              className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-black text-white text-[14px] font-medium hover:opacity-90 transition-opacity"
            >
              {primary.label}
            </a>
          </div>

          {children ? (
            <div className="mt-10 pt-8 border-t border-[var(--border)] text-[13px] text-[var(--muted)] leading-[1.9]">
              {children}
            </div>
          ) : null}

          <p className="mt-8 text-[13px] text-[var(--muted)]">
            ご不明な点は
            <Link href="/support" className="link-underline mx-1">
              サポート
            </Link>
            をご覧ください。
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
