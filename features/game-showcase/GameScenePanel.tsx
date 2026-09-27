"use client";

import { useRef } from "react";
import Image from "next/image";
import type { Game } from "@/data/games";

interface GameScenePanelProps {
  game: Game;
  index: number;
  stacked?: boolean;
}

/** One game's "world" — background tint, key art, title and features. Used
 * both as an absolutely-stacked pinned panel (desktop) and as a normal-flow
 * section (mobile/reduced-motion); `stacked` only changes positioning. */
export function GameScenePanel({ game, index, stacked = true }: GameScenePanelProps) {
  const artRef = useRef<HTMLDivElement>(null);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = artRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const py = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    artRef.current!.style.transform = `perspective(900px) rotateX(${py * -4}deg) rotateY(${px * 4}deg)`;
  }

  function onPointerLeave() {
    if (artRef.current) artRef.current.style.transform = "";
  }

  return (
    <div
      className={`${stacked ? "absolute inset-0" : "relative"} flex items-center overflow-hidden`}
      style={{
        background: `radial-gradient(70% 60% at 75% 30%, color-mix(in oklab, ${game.accent.base} 30%, transparent), var(--color-ink-950) 70%)`,
      }}
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 py-24 md:grid-cols-2 md:px-10">
        <div>
          <span className="font-display text-xs font-bold tracking-[0.3em] text-paper-dim uppercase">
            Game {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-paper uppercase md:text-6xl">
            {game.title}
          </h3>
          <p className="mt-5 max-w-md text-clamp-base text-paper-dim">{game.description}</p>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {game.features.map((f) => (
              <li key={f} className="text-clamp-sm text-paper-faint">
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            {game.status === "live" && game.storeUrl ? (
              <a
                href={game.storeUrl}
                target="_blank"
                rel="noopener"
                data-cursor="play"
                data-cursor-label="Play"
                className="inline-flex items-center gap-3 rounded-full px-7 py-3.5 font-display text-sm font-bold tracking-[0.14em] text-ink-950 uppercase"
                style={{ background: game.accent.base }}
              >
                Play now
              </a>
            ) : (
              <span className="inline-flex items-center rounded-full border border-paper/25 px-6 py-3 font-display text-xs font-bold tracking-[0.2em] text-paper-dim uppercase">
                In development
              </span>
            )}
          </div>
        </div>

        <div
          ref={artRef}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl shadow-2xl transition-transform duration-300 ease-out will-change-transform"
        >
          <Image
            src={game.keyArt}
            alt={`${game.title} key art`}
            fill
            sizes="(min-width: 768px) 420px, 80vw"
            className="object-cover"
            priority={index === 0}
          />
        </div>
      </div>
    </div>
  );
}
