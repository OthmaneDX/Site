"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { stagger, revealText } from "@/lib/motion";
import { ensureGsap, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const LINE_1 = ["WE", "BUILD", "WORLDS."];
const LINE_2 = ["YOU", "PLAY", "THEM."];

export function HeroTypography({ play }: { play: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Cursor parallax: the whole heading drifts a few px opposite the pointer.
  useEffect(() => {
    if (reducedMotion) return;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;

    const el = rootRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const py = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      el.style.translate = `${px * -10}px ${py * -6}px`;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reducedMotion]);

  // Scroll reaction: the heading settles/fades slightly as the visitor
  // starts scrolling away from the hero, so it reads as "letting go" rather
  // than abruptly disappearing.
  useEffect(() => {
    // Scroll is locked until entry, so there's nothing to measure/react to
    // yet — deferring this avoids paying its layout cost during load.
    if (reducedMotion || !play) return;
    const el = rootRef.current;
    if (!el) return;
    ensureGsap();

    const ctx = gsap.context(() => {
      gsap.to(el, {
        scale: 0.92,
        opacity: 0.35,
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // gsap.context tracks everything created inside it (including the
    // ScrollTrigger above) and tears it down on revert — no need to touch
    // ScrollTrigger.getAll(), which would also kill other components'.
    return () => ctx.revert();
  }, [reducedMotion, play]);

  return (
    <div ref={rootRef} className="transition-[translate] duration-500 ease-out">
      <motion.h1
        variants={stagger(0.09, 0.3)}
        initial="hidden"
        animate={play ? "visible" : "hidden"}
        className="font-display text-clamp-hero font-extrabold leading-[0.92] tracking-tight text-paper"
      >
        <span className="block overflow-hidden">
          {LINE_1.map((word, i) => (
            <motion.span key={i} variants={revealText} className="mr-[0.22em] inline-block">
              {word}
            </motion.span>
          ))}
        </span>
        <span className="block overflow-hidden text-accent-lite">
          {LINE_2.map((word, i) => (
            <motion.span key={i} variants={revealText} className="mr-[0.22em] inline-block">
              {word}
            </motion.span>
          ))}
        </span>
      </motion.h1>
    </div>
  );
}
