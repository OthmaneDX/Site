"use client";

import { motion } from "motion/react";
import { MagneticButton } from "@/components/MagneticButton";
import { fadeUp, stagger } from "@/lib/motion";

/** A loading-screen-style beat between the game lineup and the studio
 * manifesto — "PLAYER 01 / READY?" rather than a generic "download now"
 * banner. */
export function PlaySection() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-32">
      <div className="absolute inset-0 bg-[radial-gradient(40%_45%_at_50%_50%,color-mix(in_oklab,var(--color-accent)_10%,transparent),transparent_70%)]" />

      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20% 0px" }}
        className="relative mx-auto flex max-w-3xl flex-col items-center px-6 text-center"
      >
        <motion.span
          variants={fadeUp}
          className="font-display text-xs font-bold tracking-[0.35em] text-paper-dim uppercase"
        >
          Player 01
        </motion.span>
        <motion.h2
          variants={fadeUp}
          className="mt-6 font-display text-clamp-2xl font-extrabold tracking-tight text-paper uppercase"
        >
          Ready?
        </motion.h2>
        <motion.div variants={fadeUp} className="mt-10">
          <MagneticButton
            href="https://play.google.com/store/apps/developer?id=Kilow%20Limited"
            external
            strength={0.4}
            cursor="play"
            cursorLabel="Play"
            className="inline-flex items-center gap-3 rounded-full bg-accent px-10 py-5 font-display text-base font-bold tracking-[0.16em] text-ink-950 uppercase"
          >
            Play our games
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
