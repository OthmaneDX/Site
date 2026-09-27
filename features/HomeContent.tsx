"use client";

import { useUiStore } from "@/store/ui";

/** Wraps everything below the entry gate so it's `inert` (unfocusable, out
 * of the accessibility tree) for the brief window the gate is actually
 * showing — the gate already covers it visually, but visual stacking alone
 * doesn't stop keyboard/screen-reader users from reaching it early. */
export function HomeContent({ children }: { children: React.ReactNode }) {
  const hasEntered = useUiStore((s) => s.hasEntered);
  return <div inert={!hasEntered}>{children}</div>;
}
