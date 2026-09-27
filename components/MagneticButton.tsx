"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { playTone } from "@/lib/sound";

interface MagneticButtonProps {
  href: string;
  external?: boolean;
  strength?: number;
  cursor?: string;
  cursorLabel?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

/** A link (external store link, in-page anchor, or route) that gently pulls
 * toward the pointer when hovered, and springs back on release/leave.
 * `MotionConfig reducedMotion="user"` (set once in the root layout) makes
 * this a no-op automatically for reduced-motion visitors — no extra guard
 * needed here. */
export function MagneticButton({
  href,
  external,
  strength = 0.35,
  cursor = "link",
  cursorLabel,
  className = "",
  style,
  children,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 });

  function onPointerMove(e: React.PointerEvent<HTMLAnchorElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  }

  function onPointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener" : undefined}
      data-cursor={cursor}
      data-cursor-label={cursorLabel}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onClick={() => playTone("click")}
      onMouseEnter={() => playTone("hover")}
      style={{ ...style, x: springX, y: springY }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}
