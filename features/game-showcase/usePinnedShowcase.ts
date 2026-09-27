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
      let activeIndex = 0;

      // Non-active panels sit at opacity:0 but were still in normal tab
      // order — a keyboard/screen-reader user could land on a link they
      // can't see. `inert` removes a panel from both the tab order and the
      // accessibility tree whenever it isn't the visible one. Written
      // directly to the DOM (not React state) since this fires on every
      // scroll tick and a re-render per tick would fight the GSAP scrub.
      const setActive = (index: number) => {
        if (index === activeIndex) return;
        activeIndex = index;
        panels.forEach((panel, i) => {
          if (panel) panel.inert = i !== index;
        });
      };

      panels.forEach((panel, i) => {
        if (!panel) return;
        panel.inert = i !== 0;
        if (i === 0) return;
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
          onUpdate: (self) => setActive(Math.round(self.progress * (panelCount - 1))),
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

    return () => {
      ctx.revert();
      // `inert` was written directly to the DOM, outside GSAP's tracking,
      // so ctx.revert() won't undo it — clear it explicitly, otherwise a
      // panel could stay unreachable after switching to the unpinned
      // mobile layout (e.g. on resize across the 1024px breakpoint).
      panelRefs.current.forEach((panel) => {
        if (panel) panel.inert = false;
      });
    };
  }, [containerRef, panelRefs, panelCount, enabled]);
}
