"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { games } from "@/data/games";
import { GameScenePanel } from "@/features/game-showcase/GameScenePanel";
import { usePinnedShowcase } from "@/features/game-showcase/usePinnedShowcase";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeUp } from "@/lib/motion";

/** Desktop gets the pinned cinematic cross-fade sequence; mobile and
 * reduced-motion visitors get the same content as a plain scrolling stack
 * with lighter per-panel reveals — GSAP `pin` is genuinely janky on mobile
 * Safari, and pin+scrub is itself a motion-heavy technique regardless of
 * screen size. */
export function GameShowcase() {
  const reducedMotion = useReducedMotion();
  const [wideEnough, setWideEnough] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setWideEnough(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setWideEnough(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const pinned = wideEnough && !reducedMotion;

  usePinnedShowcase(containerRef, panelRefs, games.length, pinned);

  return (
    <section id="games" aria-label="Featured games" className="bg-ink-950">
      <div className="mx-auto max-w-7xl px-6 pt-24 md:px-10">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15% 0px" }}
          className="font-display text-xs font-bold tracking-[0.3em] text-paper-dim uppercase"
        >
          The lineup
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15% 0px" }}
          className="mt-4 font-display text-clamp-2xl font-extrabold tracking-tight text-paper uppercase"
        >
          Enter the games
        </motion.h2>
      </div>

      {pinned ? (
        <div ref={containerRef} className="relative mt-16 h-screen overflow-hidden">
          {games.map((game, i) => (
            <div
              key={game.slug}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              className="absolute inset-0"
            >
              <GameScenePanel game={game} index={i} stacked />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col gap-4">
          {games.map((game, i) => (
            <motion.div
              key={game.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <GameScenePanel game={game} index={i} stacked={false} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
