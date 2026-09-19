"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Fades and lifts its children in when they scroll into view.
 *
 * The server renders the content fully visible, so nothing is hidden without
 * JavaScript and there is no layout shift. On mount, content already inside
 * the viewport animates at once; content below it is hidden and revealed by
 * an IntersectionObserver. Users who prefer reduced motion get static content.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Milliseconds to wait once in view, used to stagger siblings. */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add("in");
      return;
    }

    el.classList.add("reveal-pending");
    // Threshold 0 with a small inset: fire once the top edge is 8% into the
    // viewport. A ratio threshold would never fire for elements taller than
    // the viewport, such as the 30-card grid on a phone.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.remove("reveal-pending");
        el.classList.add("in");
        observer.disconnect();
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
