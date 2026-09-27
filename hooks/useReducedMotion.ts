"use client";

import { useEffect, useState } from "react";

/** True once we've confirmed (client-side) the visitor prefers reduced
 * motion. Starts false during SSR/hydration so there's no flash — every
 * consumer should already degrade gracefully if this flips a frame late. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
