import type { ReactNode } from "react";
import type { Lang } from "@/lib/i18n";
import { AsideShell } from "@/components/aside/AsideShell";

export function MacDocShell({
  lang,
  children,
  variant = "reading",
}: {
  lang: Lang;
  children: ReactNode;
  variant?: "reading" | "tools";
}) {
  return (
    <AsideShell lang={lang} variant={variant}>
      {children}
    </AsideShell>
  );
}
