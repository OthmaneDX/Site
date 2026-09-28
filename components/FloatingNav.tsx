"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Logo } from "@/components/Logo";
import { MagneticButton } from "@/components/MagneticButton";
import { MobileMenu } from "@/components/MobileMenu";
import { useUiStore } from "@/store/ui";
import { upcomingGames } from "@/data/games";

// "/#id" (not bare "#id") so these resolve correctly from every route, not
// just the home page. "Next" only appears while there's actually an
// upcoming title to tease — NextRun itself renders nothing once every game
// is live, so linking to it otherwise would point at an empty section.
const LINKS = [
  { href: "/#games", label: "Games" },
  { href: "/#studio", label: "Studio" },
  ...(upcomingGames.length > 0 ? [{ href: "/#next", label: "Next" }] : []),
  { href: "/#contact", label: "Contact" },
];

/** Hides on scroll-down, reappears on scroll-up — stays out of the way of
 * the cinematic scroll sections without disappearing for good. */
export function FloatingNav() {
  const { scrollY } = useScroll();
  const lastY = useRef(0);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // Defaults to true everywhere except while the home page's entry gate is
  // actively showing — see store/ui.ts. Visually the gate already covers
  // the nav, but `inert` is what stops a keyboard user from tabbing past it
  // into links they can't see yet.
  const hasEntered = useUiStore((s) => s.hasEntered);

  useMotionValueEvent(scrollY, "change", (y) => {
    const goingDown = y > lastY.current && y > 120;
    setHidden(goingDown && !menuOpen);
    lastY.current = y;
  });

  return (
    <>
      <motion.header
        inert={!hasEntered}
        animate={{ y: hidden ? -96 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[100] px-6 py-5 md:px-10"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-paper/10 bg-ink-950/60 px-6 py-3 backdrop-blur-md">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-cursor="link"
                className="font-display text-xs font-bold tracking-[0.14em] text-paper-dim uppercase transition-colors hover:text-paper"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <MagneticButton
              href="https://play.google.com/store/apps/developer?id=Kilow%20Limited"
              external
              cursor="play"
              cursorLabel="Play"
              className="inline-flex rounded-full bg-accent px-5 py-2 font-display text-xs font-bold tracking-[0.14em] text-ink-950 uppercase"
            >
              Play
            </MagneticButton>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            data-cursor="link"
            className="grid h-9 w-9 place-items-center rounded-full border border-paper/20 md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span className="absolute inset-x-0 top-0 h-px bg-paper" />
              <span className="absolute inset-x-0 bottom-0 h-px bg-paper" />
            </span>
          </button>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={LINKS} />
    </>
  );
}
