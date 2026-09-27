"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface StatCounterProps {
  to: number;
  suffix?: string;
  duration?: number;
}

/** Counts up once, the first time it scrolls into view. Jumps straight to
 * the final value for reduced-motion visitors instead of animating. */
export function StatCounter({ to, suffix = "", duration = 1.1 }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setValue(to);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reducedMotion]);

  return (
    <motion.span ref={ref} aria-label={`${to}${suffix}`}>
      {value.toLocaleString()}
      {suffix}
    </motion.span>
  );
}
