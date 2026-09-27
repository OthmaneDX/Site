"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { upcomingGames } from "@/data/games";
import { fadeUp } from "@/lib/motion";
import { useCanRunFullExperience } from "@/hooks/useIsTouchDevice";

/** "CLASSIFIED" teaser: real key art, deliberately kept hidden behind a
 * blur. Desktop reveals a spotlight around the cursor; touch reveals on
 * tap. Doesn't show everything — that's the point. */
export function NextRun() {
  const game = upcomingGames[0];
  const { canHover } = useCanRunFullExperience();
  const [tapped, setTapped] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    frameRef.current!.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    frameRef.current!.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  if (!game) return null;

  const revealed = canHover ? undefined : tapped;

  return (
    <section id="next" className="bg-ink-950 py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15% 0px" }}
          className="font-display text-xs font-bold tracking-[0.3em] text-paper-dim uppercase"
        >
          The next run
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ delay: 0.05 }}
          className="mt-4 font-display text-clamp-2xl font-extrabold tracking-tight text-paper uppercase"
        >
          Coming soon
        </motion.h2>

        <motion.div
          ref={frameRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onPointerMove={canHover ? onPointerMove : undefined}
          onClick={!canHover ? () => setTapped((v) => !v) : undefined}
          data-cursor={canHover ? "drag" : undefined}
          data-cursor-label={canHover ? "Reveal" : undefined}
          className="relative mt-16 aspect-video w-full overflow-hidden rounded-3xl bg-ink-800"
          style={{ "--mx": "50%", "--my": "50%" } as React.CSSProperties}
        >
          <Image
            src={game.keyArt}
            alt=""
            fill
            sizes="(min-width: 768px) 900px, 100vw"
            className="scale-110 object-cover blur-2xl"
          />
          <Image
            src={game.keyArt}
            alt={`${game.title} — coming soon`}
            fill
            sizes="(min-width: 768px) 900px, 100vw"
            className="object-cover transition-[mask-position,opacity] duration-300"
            style={{
              maskImage: canHover
                ? "radial-gradient(circle 160px at var(--mx) var(--my), black 60%, transparent 100%)"
                : undefined,
              WebkitMaskImage: canHover
                ? "radial-gradient(circle 160px at var(--mx) var(--my), black 60%, transparent 100%)"
                : undefined,
              opacity: canHover ? undefined : revealed ? 1 : 0,
            }}
          />

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink-950/30">
            <span className="rounded-full border border-paper/30 px-4 py-1.5 font-display text-[10px] font-bold tracking-[0.35em] text-paper uppercase">
              Classified
            </span>
            <span className="font-display text-2xl font-extrabold tracking-tight text-paper uppercase md:text-4xl">
              {game.title}
            </span>
            <span className="text-clamp-sm text-paper-dim">
              {canHover ? "Move your cursor to reveal" : "Tap to reveal"}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
