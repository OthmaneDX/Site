import { useEffect, type RefObject } from "react";
import { ensureGsap, gsap } from "@/lib/gsap";

/** Drives the desktop pinned sequence: each panel after the first starts
 * fully transparent/scaled-up, and crossfades in as its "slot" of scroll
 * distance is reached while the section stays pinned. One ScrollTrigger
 * pins the whole container for (panelCount - 1) viewport-heights of scroll. */
export function usePinnedShowcase(
  containerRef: RefObject<HTMLDivElement | null>,
  panelRefs: RefObject<(HTMLDivElement | null)[]>,
  panelCount: number,
  enabled: boolean
) {
  useEffect(() => {
    if (!enabled) return;
    const container = containerRef.current;
    if (!container || panelCount < 2) return;

    ensureGsap();

    const ctx = gsap.context(() => {
      const panels = panelRefs.current;
      panels.forEach((panel, i) => {
        if (i === 0 || !panel) return;
        gsap.set(panel, { opacity: 0, scale: 1.04 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${window.innerHeight * (panelCount - 1)}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      for (let i = 1; i < panelCount; i++) {
        const prev = panels[i - 1];
        const current = panels[i];
        if (!prev || !current) continue;
        tl.to(prev, { opacity: 0, scale: 0.96, duration: 0.5, ease: "power1.inOut" }, i - 0.5).to(
          current,
          { opacity: 1, scale: 1, duration: 0.5, ease: "power1.inOut" },
          i - 0.5
        );
      }
    }, container);

    return () => ctx.revert();
  }, [containerRef, panelRefs, panelCount, enabled]);
}
