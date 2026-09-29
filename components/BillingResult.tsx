import type { ReactNode } from "react";
import Link from "next/link";
import { AsideShell } from "@/components/aside/AsideShell";
import { AsideStage, AsideSurface } from "@/components/aside/AsideParts";
import { dict, href, type Lang } from "@/lib/i18n";

type Props = {
  lang?: Lang;
  status: "success" | "cancelled" | "portal";
  eyebrow: string;
  title: string;
  body: ReactNode;
  primary: { label: string; href: string };
  children?: ReactNode;
};

/** These are return destinations, not independent verification of billing state. */
export function BillingResult({
  lang = "ja",
  status,
  eyebrow,
  title,
  body,
  primary,
  children,
}: Props) {
  return (
    <AsideShell lang={lang} variant="status">
      <main className="aside-status" data-status={status}>
        <AsideSurface>
          <span className="aside-status__mark" aria-hidden="true">
            {status === "success" ? "✓" : status === "cancelled" ? "−" : "↗"}
          </span>
          <p className="aside-status__eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <div className="aside-status__body">{body}</div>
          <div className="mt-8">
            <a href={primary.href} className="aside-button">
              {primary.label}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          {children && <div className="aside-status__notes">{children}</div>}
          <p className="aside-status__help">
            <Link href={href(lang, "/support")}>
              {dict(lang).chrome.support} ↗
            </Link>
          </p>
        </AsideSurface>
        <AsideStage art={status === "cancelled" ? "orange" : "gradient"} />
      </main>
    </AsideShell>
  );
}
