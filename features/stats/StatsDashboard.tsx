"use client";

import { motion } from "motion/react";
import { StatCounter } from "@/components/StatCounter";
import { liveGames } from "@/data/games";
import { fadeUp, stagger } from "@/lib/motion";

const STATS = [
  { label: "Players", value: <StatCounter to={10} suffix="K+" /> },
  { label: "Games live", value: <StatCounter to={liveGames.length} /> },
  { label: "Platform", value: "Android" },
  { label: "Runs left", value: "∞" },
];

/** A dashboard readout, not a row of generic marketing stat cards — numbers
 * big enough to be the visual, not a caption underneath one. */
export function StatsDashboard() {
  return (
    <section className="border-y border-paper/10 bg-ink-900 py-24">
      <motion.dl
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-15% 0px" }}
        className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-6 md:grid-cols-4 md:px-10"
      >
        {STATS.map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            className="flex min-w-0 flex-col-reverse px-4 py-8 text-center md:text-left"
          >
            <dt className="mt-2 font-display text-xs font-bold tracking-[0.3em] text-paper-faint uppercase">
              {stat.label}
            </dt>
            <dd className="font-display text-4xl font-extrabold tracking-tight text-paper md:text-5xl lg:text-6xl">
              {stat.value}
            </dd>
          </motion.div>
        ))}
      </motion.dl>
    </section>
  );
}
