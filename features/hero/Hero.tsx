"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { HeroFallback } from "@/features/hero/HeroFallback";
import { HeroTypography } from "@/features/hero/HeroTypography";
import { MagneticButton } from "@/components/MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useCanRunFullExperience } from "@/hooks/useIsTouchDevice";
import { useUiStore } from "@/store/ui";
import { fadeUp } from "@/lib/motion";

const Scene3D = dynamic(() => import("@/features/hero/Scene3D").then((m) => m.Scene3D), {
  ssr: false,
});

export function Hero() {
  const reducedMotion = useReducedMotion();
  const { canHover, isCapableDevice } = useCanRunFullExperience();
  const hasEntered = useUiStore((s) => s.hasEntered);
  // Gated on hasEntered too: the scene is invisible behind the opaque entry
  // screen until then, so there's no reason to pay for WebGL init before
  // the visitor has actually clicked in — matches the "world begins
  // forming after entry" beat and keeps it out of the initial-load cost.
  const use3D = canHover && isCapableDevice && !reducedMotion && hasEntered;

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-ink-950">
      <div className="absolute inset-0">{use3D ? <Scene3D /> : <HeroFallback />}</div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 md:px-10">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={hasEntered ? "visible" : "hidden"}
          className="mb-6 font-display text-xs font-bold tracking-[0.3em] text-paper-dim uppercase"
        >
          Kilow Limited — Indie Game Studio
        </motion.p>

        <HeroTypography play={hasEntered} />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={hasEntered ? "visible" : "hidden"}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <MagneticButton
            href="#games"
            cursor="play"
            cursorLabel="Play"
            className="inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 font-display text-sm font-bold tracking-[0.14em] text-ink-950 uppercase"
          >
            Enter the games
          </MagneticButton>
          <a
            href="#studio"
            data-cursor="link"
            className="font-display text-sm font-bold tracking-[0.14em] text-paper-dim uppercase transition-colors hover:text-paper"
          >
            The studio →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
