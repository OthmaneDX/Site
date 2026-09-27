/** Kilow motion system: three tiers, one signature ease. Reused by both
 * Motion for React and GSAP so nothing on the page feels animated by a
 * different hand. */

export const duration = {
  micro: 0.18,
  ui: 0.35,
  cinematic: 1.1,
} as const;

/** matches --ease-kilow in globals.css */
export const easeKilow = [0.16, 1, 0.3, 1] as const;
export const easeKilowIn = [0.7, 0, 0.84, 0] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.ui, ease: easeKilow },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.ui, ease: easeKilow },
  },
};

export const revealText = {
  hidden: { opacity: 0, y: "0.6em" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.cinematic, ease: easeKilow },
  },
};

/** Stagger helper for parent containers driving fadeUp/revealText children. */
export function stagger(step = 0.06, delayChildren = 0) {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: step, delayChildren },
    },
  };
}
