"use client";

import { useEffect, useState } from "react";

/**
 * Counts from 0 up to `value` after mount. The server renders the final
 * value, so the number is correct without JavaScript and for crawlers, and
 * the width does not change because the digits are tabular.
 */
export function CountUp({
  value,
  duration = 1200,
  delay = 0,
}: {
  value: number;
  duration?: number;
  delay?: number;
}) {
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const start = performance.now() + delay;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / duration));
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(value * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration, delay]);

  return <>{shown}</>;
}
