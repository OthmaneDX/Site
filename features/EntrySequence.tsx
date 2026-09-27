"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useUiStore } from "@/store/ui";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { playTone } from "@/lib/sound";

const SESSION_KEY = "kilow:entered";

/** A once-per-session ceremonial gate, not a repeat-visit tax: skipped
 * entirely on route changes back home, and skipped immediately (no forced
 * wait) for reduced-motion visitors. Renders as a fullscreen overlay above
 * everything else while the rest of the page mounts underneath it. */
export function EntrySequence() {
  const hasEntered = useUiStore((s) => s.hasEntered);
  const setHasEntered = useUiStore((s) => s.setHasEntered);
  const reducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // hasEntered defaults to true (open) so every other route works with no
    // gate at all — this is the one place that ever closes it, and only
    // when a fresh, motion-safe visitor genuinely needs to see it. Always
    // sets it explicitly (both directions), not just "close when needed":
    // useReducedMotion's own internal effect hasn't necessarily resolved
    // the real value on this first run (it starts at `false` and flips via
    // its own effect), so this effect re-fires once that lands — and if it
    // only ever closed the gate and never reopened it, a stale first pass
    // with reducedMotion still `false` could wrongly latch it shut for a
    // reduced-motion visitor.
    const already = window.sessionStorage.getItem(SESSION_KEY) === "1";
    setHasEntered(already || reducedMotion);
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  useEffect(() => {
    document.documentElement.style.overflow = hasEntered ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [hasEntered]);

  function enter() {
    window.sessionStorage.setItem(SESSION_KEY, "1");
    playTone("enter");
    setHasEntered(true);
  }

  if (!ready) return null;

  return (
    <AnimatePresence>
      {!hasEntered && (
        <motion.div
          key="entry"
          exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[300] grid place-items-center bg-ink-950"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-10 text-center"
          >
            <span className="font-display text-2xl font-extrabold tracking-[0.3em] text-paper">
              KILOW
            </span>

            <button
              type="button"
              onClick={enter}
              data-cursor="play"
              className="group flex items-center gap-3 rounded-full border border-paper/25 px-8 py-4 font-display text-sm font-bold tracking-[0.25em] text-paper uppercase transition-colors hover:border-accent-lite hover:text-accent-lite"
            >
              Enter Kilow
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
