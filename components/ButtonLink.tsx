import type { ComponentProps } from "react";

type Variant = "primary" | "secondary";
type Size = "md" | "sm";

const base =
  "group inline-flex select-none items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,border-color,color,transform,box-shadow] duration-300 ease-out-quint active:scale-[0.98] motion-safe:hover:-translate-y-0.5";

const sizes: Record<Size, string> = {
  md: "h-12 px-6 text-[0.9375rem]",
  sm: "h-10 px-4.5 text-sm",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-ink-950 shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_12px_32px_-12px_rgb(244_138_66/0.7)] hover:bg-accent-bright hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.3),0_16px_40px_-12px_rgb(244_138_66/0.85)]",
  secondary:
    "border border-white/12 bg-white/[0.03] text-paper hover:border-white/25 hover:bg-white/[0.07]",
};

/** An anchor styled as a button. Every CTA on the site is a link, never a dead button. */
export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ComponentProps<"a"> & { variant?: Variant; size?: Size }) {
  return (
    <a className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
}
