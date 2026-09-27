import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { games } from "@/data/games";
import { PageHero } from "@/components/PageHero";
import { ContactEnding } from "@/features/contact/ContactEnding";

export const metadata: Metadata = {
  title: "Games",
  description:
    "Every game Kilow Limited has shipped or has in development — Bear Adventure Surfer, Chameleon Surfer Rush, and Gugu Gaga Penguin Surfer.",
  alternates: { canonical: "/games" },
};

export default function GamesIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="The full lineup"
        title="Games"
        subtitle="Small catalogue, high polish. Every title Kilow has shipped or is building next."
      />

      <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 pb-32 sm:grid-cols-2 md:px-10 lg:grid-cols-3">
        {games.map((game) => (
          <li key={game.slug}>
            <Link
              href={`/games/${game.slug}`}
              data-cursor="link"
              className="group block overflow-hidden rounded-3xl border border-paper/10 bg-ink-900 transition-colors hover:border-paper/25"
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={game.keyArt}
                  alt={`${game.title} key art`}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span
                  className="font-display text-[10px] font-bold tracking-[0.25em] uppercase"
                  style={{ color: game.accent.base }}
                >
                  {game.status === "live" ? "Out now" : "In development"}
                </span>
                <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-paper uppercase">
                  {game.title}
                </h2>
                <p className="mt-2 text-clamp-sm text-paper-faint">{game.tagline}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <ContactEnding />
    </>
  );
}
