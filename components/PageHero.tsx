"use client";

import { motion } from "motion/react";
import { fadeUp, stagger } from "@/lib/motion";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

/** Lighter-weight header for secondary routes (games index/detail, studio,
 * contact, privacy) — same type system and motion language as the home
 * page's cinematic sections, without the pinned/3D machinery those pages
 * don't need. */
export function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <motion.div
      variants={stagger(0.1)}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-4xl px-6 pt-40 pb-16 md:px-10 md:pt-48"
    >
      <motion.p
        variants={fadeUp}
        className="font-display text-xs font-bold tracking-[0.3em] text-paper-dim uppercase"
      >
        {eyebrow}
      </motion.p>
      <motion.h1
        variants={fadeUp}
        className="mt-4 font-display text-clamp-2xl font-extrabold tracking-tight text-paper uppercase"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p variants={fadeUp} className="mt-4 max-w-xl text-clamp-lg text-paper-dim">
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
