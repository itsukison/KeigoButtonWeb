import type { ReactNode } from "react";
export type Artwork = "blue" | "pink" | "orange" | "gradient" | "moutain";

/** Decorative artwork has a bounded crop and never sits behind readable prose. */
export function AsideStage({
  art = "blue",
  mascot = true,
}: {
  art?: Artwork;
  mascot?: boolean;
}) {
  return (
    <div className={`aside-stage aside-stage--${art}`} aria-hidden="true">
      <img
        className="aside-stage__background"
        src={`/mac/aside/${art}.png`}
        alt=""
        width="1672"
        height="941"
      />
      <div className="aside-stage__paper">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      {mascot && (
        <img
          className="aside-stage__mascot"
          src="/mac/aside/mascot.png"
          alt=""
          width="1280"
          height="1280"
        />
      )}
      <div className="aside-stage__dot" />
    </div>
  );
}
export function AsideHero({
  children,
  art = "blue",
}: {
  children: ReactNode;
  art?: Artwork;
}) {
  return (
    <header className="aside-hero">
      <div className="aside-hero__copy">{children}</div>
      <AsideStage art={art} />
    </header>
  );
}
export function AsideSurface({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`aside-surface ${className}`}>{children}</div>;
}
