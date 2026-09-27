"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { connectLenis } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Mounts Lenis smooth scroll and wires it to GSAP's ticker, site-wide.
 * Skipped entirely under reduced motion — native scroll stays untouched. */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({ autoRaf: false });
    const disconnect = connectLenis(lenis);

    return () => {
      disconnect();
      lenis.destroy();
    };
  }, [reducedMotion]);

  return children;
}
