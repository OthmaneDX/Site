import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { games, getGameBySlug } from "@/data/games";
import { ContactEnding } from "@/features/contact/ContactEnding";
import { MagneticButton } from "@/components/MagneticButton";

export function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return {};

  return {
    title: game.title,
    description: game.description,
    alternates: { canonical: `/games/${game.slug}` },
    openGraph: {
      title: game.title,
      description: game.description,
      images: [{ url: game.keyArt, width: 900, height: 900, alt: `${game.title} key art` }],
    },
  };
}

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  const related = games.filter((g) => g.slug !== game.slug);

  const videoGameJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.title,
    description: game.description,
    applicationCategory: "Game",
    operatingSystem: "Android",
    genre: "Endless runner",
    ...(game.storeUrl ? { url: game.storeUrl } : {}),
    image: `https://kilowlimited.com${game.keyArt}`,
    publisher: { "@type": "Organization", name: "Kilow Limited", url: "https://kilowlimited.com" },
    ...(game.status === "live"
      ? { offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameJsonLd) }}
      />

      <section
        className="relative overflow-hidden pt-32 pb-20 md:pt-40"
        style={{
          background: `radial-gradient(70% 60% at 75% 20%, color-mix(in oklab, ${game.accent.base} 26%, transparent), var(--color-ink-950) 70%)`,
        }}
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:px-10">
          <div>
            <span
              className="font-display text-xs font-bold tracking-[0.3em] uppercase"
              style={{ color: game.accent.base }}
            >
              {game.status === "live" ? "Out now" : "In development"} — {game.platform}
            </span>
            <h1 className="mt-5 font-display text-clamp-2xl font-extrabold tracking-tight text-paper uppercase">
              {game.title}
            </h1>
            <p className="mt-5 max-w-md text-clamp-lg text-paper-dim">{game.tagline}</p>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              {game.status === "live" && game.storeUrl ? (
                <MagneticButton
                  href={game.storeUrl}
                  external
                  cursor="play"
                  cursorLabel="Play"
                  className="inline-flex items-center gap-3 rounded-full px-8 py-4 font-display text-sm font-bold tracking-[0.14em] text-ink-950 uppercase"
                  style={{ background: game.accent.base }}
                  strength={0.35}
                >
                  Play now
                </MagneticButton>
              ) : (
                <span className="inline-flex items-center rounded-full border border-paper/25 px-7 py-3.5 font-display text-xs font-bold tracking-[0.2em] text-paper-dim uppercase">
                  Coming soon
                </span>
              )}
              <Link
                href="/games"
                data-cursor="link"
                className="font-display text-sm font-bold tracking-[0.14em] text-paper-dim uppercase transition-colors hover:text-paper"
              >
                ← All games
              </Link>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src={game.keyArt}
              alt={`${game.title} key art`}
              fill
              sizes="(min-width: 768px) 480px, 90vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 md:px-10">
        <h2 className="font-display text-xs font-bold tracking-[0.3em] text-paper-dim uppercase">
          About the game
        </h2>
        <p className="mt-5 text-clamp-lg text-paper-dim">{game.description}</p>

        <h2 className="mt-16 font-display text-xs font-bold tracking-[0.3em] text-paper-dim uppercase">
          Features
        </h2>
        <ul className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-paper/10 sm:grid-cols-2">
          {game.features.map((f) => (
            <li key={f} className="bg-ink-950 p-6 text-clamp-base text-paper">
              {f}
            </li>
          ))}
        </ul>

        {game.screenshots && game.screenshots.length > 0 && (
          <>
            <h2 className="mt-16 font-display text-xs font-bold tracking-[0.3em] text-paper-dim uppercase">
              Gallery
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
              {game.screenshots.map((src) => (
                <div key={src} className="relative aspect-[9/16] overflow-hidden rounded-2xl">
                  <Image src={src} alt={`${game.title} screenshot`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {related.length > 0 && (
        <section className="border-t border-paper/10 bg-ink-900 py-20">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <h2 className="font-display text-xs font-bold tracking-[0.3em] text-paper-dim uppercase">
              More from Kilow
            </h2>
            <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {related.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/games/${g.slug}`}
                    data-cursor="link"
                    className="group flex items-center gap-5 rounded-2xl border border-paper/10 p-4 transition-colors hover:border-paper/25"
                  >
                    <div className="relative h-20 w-20 flex-none overflow-hidden rounded-xl">
                      <Image src={g.keyArt} alt="" fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold tracking-tight text-paper uppercase">
                        {g.title}
                      </h3>
                      <p className="mt-1 text-clamp-sm text-paper-faint">{g.tagline}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ContactEnding />
    </>
  );
}
