"use client";

import { MotionConfig } from "motion/react";

/** One config line makes every Motion-driven animation in the app
 * automatically respect the OS-level reduced-motion setting. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
