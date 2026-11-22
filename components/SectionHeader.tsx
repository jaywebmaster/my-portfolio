import type { ReactNode } from "react";

/** Numbered eyebrow, heading and optional intro shared by every section. */
export function SectionHeader({
  index,
  eyebrow,
  title,
  titleId,
  intro,
  className = "",
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  titleId: string;
  intro?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <p className="label-mono flex items-center gap-3">
        <span className="text-accent">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-accent/40" />
        <span className="text-mute">{eyebrow}</span>
      </p>
      <h2 id={titleId} className="mt-5 text-[clamp(2rem,4.4vw,3.25rem)]">
        {title}
      </h2>
      {intro ? (
        <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-mute">{intro}</p>
      ) : null}
    </div>
  );
}
