import type { ReactNode } from "react";

type Props = {
  title: string;
  updatedAt: string;
  lead?: string;
  children: ReactNode;
};

export function LegalPage({ title, updatedAt, lead, children }: Props) {
  return (
    <article className="mx-auto max-w-[var(--max-content)] px-6 py-20 md:py-28">
      <header className="mb-16">
        <p className="text-[12px] tracking-[0.18em] text-[var(--muted)] uppercase mb-4">
          {updatedAt}
        </p>
        <h1 className="text-[32px] md:text-[40px] font-semibold tracking-tight leading-tight">
          {title}
        </h1>
        {lead ? (
          <p className="mt-6 text-[15px] text-[var(--muted)] leading-[1.9]">
            {lead}
          </p>
        ) : null}
      </header>
      <div className="legal-prose text-[15px]">{children}</div>
    </article>
  );
}
