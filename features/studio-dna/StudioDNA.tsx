"use client";

import { motion } from "motion/react";
import { fadeUp, stagger } from "@/lib/motion";

const STAGES = ["Gameplay", "Design", "Technology", "Player feedback", "Updates", "Better game"];

/** The dev pipeline as a growing line with stage markers — reads as a loop
 * back to "better game," not a one-way corporate process diagram. */
export function StudioDNA() {
  return (
    <section className="bg-ink-950 py-32">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15% 0px" }}
          className="font-display text-xs font-bold tracking-[0.3em] text-paper-dim uppercase"
        >
          Kilow DNA
        </motion.p>

        <div className="relative mt-16 pl-10">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top" }}
            className="absolute top-2 left-[7px] h-[calc(100%-1rem)] w-px bg-gradient-to-b from-accent to-accent/10"
          />

          <motion.ol
            variants={stagger(0.12, 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15% 0px" }}
            className="flex flex-col gap-10"
          >
            {STAGES.map((stage, i) => (
              <motion.li key={stage} variants={fadeUp} className="relative">
                <span className="absolute top-1.5 -left-10 h-3.5 w-3.5 rounded-full border-2 border-accent bg-ink-950" />
                <span className="font-display text-2xl font-extrabold tracking-tight text-paper uppercase md:text-3xl">
                  {stage}
                </span>
                {i === STAGES.length - 1 && (
                  <span className="ml-3 text-clamp-sm text-paper-faint">→ loops back to gameplay</span>
                )}
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
