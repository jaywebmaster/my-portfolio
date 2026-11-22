"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * The page is static, so the server year is the build year. After hydration
 * this switches to the visitor's current year without a mismatch warning.
 */
export function CurrentYear({ buildYear }: { buildYear: number }) {
  return useSyncExternalStore(
    noopSubscribe,
    () => new Date().getFullYear(),
    () => buildYear,
  );
}
