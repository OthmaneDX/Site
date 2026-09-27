"use client";

import { motion } from "motion/react";
import { fadeUp, stagger } from "@/lib/motion";
import { MagneticButton } from "@/components/MagneticButton";
import { SoundToggle } from "@/components/SoundToggle";

const LINKS = [
  {
    label: "Play",
    href: "https://play.google.com/store/apps/developer?id=Kilow%20Limited",
    cursor: "play",
  },
  {
    label: "Follow",
    href: "https://play.google.com/store/apps/developer?id=Kilow%20Limited",
    cursor: "link",
  },
  { label: "Contact", href: "mailto:knee.othmane@gmail.com", cursor: "link" },
];

/** The end screen. Not "Ready to Play?" — a sign-off. */
export function ContactEnding() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-ink-950 pt-32 pb-12">
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,color-mix(in_oklab,var(--color-accent)_14%,transparent),transparent_70%)]" />

      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20% 0px" }}
        className="relative mx-auto flex max-w-3xl flex-col items-center px-6 text-center"
      >
        <motion.h2
          variants={fadeUp}
          className="font-display text-clamp-xl font-extrabold tracking-tight text-paper uppercase"
        >
          See you in the next run.
        </motion.h2>

        <motion.div variants={fadeUp} className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {LINKS.map((link) => (
            <MagneticButton
              key={link.label}
              href={link.href}
              external={link.href.startsWith("http")}
              cursor={link.cursor}
              strength={0.3}
              className="font-display text-sm font-bold tracking-[0.2em] text-paper uppercase transition-colors hover:text-accent-lite"
            >
              {link.label}
            </MagneticButton>
          ))}
        </motion.div>
      </motion.div>

      <div className="relative mx-auto mt-24 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-paper/10 px-6 pt-8 text-clamp-xs text-paper-faint md:flex-row md:px-10">
        <span>© {new Date().getFullYear()} Kilow Limited. All rights reserved.</span>
        <div className="flex items-center gap-6">
          <a href="/privacy" data-cursor="link" className="transition-colors hover:text-paper">
            Privacy Policy
          </a>
          <SoundToggle />
        </div>
      </div>
    </footer>
  );
}
