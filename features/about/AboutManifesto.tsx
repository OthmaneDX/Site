"use client";

import { motion } from "motion/react";
import { fadeUp, stagger } from "@/lib/motion";

const PRINCIPLES = [
  { title: "Gameplay first", body: "If it isn't fun in the first thirty seconds, it doesn't ship." },
  { title: "Built for phones", body: "One-handed controls, short sessions, instant loading." },
  { title: "Free to play", body: "No paywalls blocking the core experience, ever." },
  { title: "Always improving", body: "Shipped by player feedback, reviews and crash reports." },
];

export function AboutManifesto() {
  return (
    <section id="studio" className="bg-ink-950 py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15% 0px" }}
          className="font-display text-xs font-bold tracking-[0.3em] text-paper-dim uppercase"
        >
          The studio
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ delay: 0.05 }}
          className="mt-4 font-display text-clamp-2xl font-extrabold tracking-tight text-paper uppercase"
        >
          We are Kilow.
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ delay: 0.1 }}
          className="mt-4 max-w-xl text-clamp-lg text-paper-dim"
        >
          Small team. Big worlds. We build mobile games around one simple idea:
          <span className="block text-paper"> the gameplay comes first.</span>
        </motion.p>

        <motion.ul
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15% 0px" }}
          className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-paper/10 sm:grid-cols-2"
        >
          {PRINCIPLES.map((p) => (
            <motion.li variants={fadeUp} key={p.title} className="bg-ink-950 p-8">
              <h3 className="font-display text-lg font-bold text-paper uppercase">{p.title}</h3>
              <p className="mt-2 text-clamp-sm text-paper-faint">{p.body}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
