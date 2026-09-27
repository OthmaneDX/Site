"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "@/components/Logo";
import { MagneticButton } from "@/components/MagneticButton";
import { stagger, fadeUp } from "@/lib/motion";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

/** Fullscreen, game-menu-like takeover rather than a small dropdown —
 * entering/leaving it is itself a cinematic beat. */
export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ clipPath: "circle(0% at 100% 0%)" }}
          animate={{ clipPath: "circle(150% at 100% 0%)" }}
          exit={{ clipPath: "circle(0% at 100% 0%)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[150] flex flex-col bg-ink-950 md:hidden"
        >
          <div className="flex items-center justify-between px-6 py-5">
            <Logo />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="grid h-9 w-9 place-items-center rounded-full border border-paper/20 text-paper"
            >
              ×
            </button>
          </div>

          <motion.nav
            variants={stagger(0.08, 0.1)}
            initial="hidden"
            animate="visible"
            aria-label="Mobile"
            className="flex flex-1 flex-col justify-center gap-2 px-8"
          >
            {links.map((link) => (
              <motion.a
                key={link.href}
                variants={fadeUp}
                href={link.href}
                onClick={onClose}
                className="font-display text-4xl font-extrabold tracking-tight text-paper uppercase"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.nav>

          <div className="px-8 pb-10">
            <MagneticButton
              href="https://play.google.com/store/apps/developer?id=Kilow%20Limited"
              external
              cursor="play"
              className="inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-4 font-display text-sm font-bold tracking-[0.14em] text-ink-950 uppercase"
            >
              Play our games
            </MagneticButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
