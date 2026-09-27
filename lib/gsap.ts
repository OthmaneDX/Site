import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

let registered = false;

/** Registers GSAP plugins exactly once, client-side only. Safe to call from
 * every component that needs ScrollTrigger — it's idempotent. */
export function ensureGsap() {
  if (registered || typeof window === "undefined") return gsap;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
  return gsap;
}

export { gsap, ScrollTrigger };

/** Wires a Lenis instance into GSAP's ticker so ScrollTrigger stays in sync
 * with Lenis's smoothed scroll position. Returns a cleanup function. */
export function connectLenis(lenis: Lenis) {
  ensureGsap();

  const onScroll = () => ScrollTrigger.update();
  lenis.on("scroll", onScroll);

  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    lenis.off("scroll", onScroll);
    gsap.ticker.remove(tick);
  };
}
