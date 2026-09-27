import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Game Over",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="font-display text-clamp-2xl font-extrabold tracking-tight text-accent-lite">
          404
        </p>
        <h1 className="mt-4 font-display text-clamp-xl font-extrabold tracking-tight text-paper uppercase">
          Game over
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-clamp-base text-paper-dim">
          That page doesn&rsquo;t exist — it may have moved, or the link was mistyped. Respawn at
          the home page.
        </p>
        <Link
          href="/"
          data-cursor="link"
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 font-display text-sm font-bold tracking-[0.14em] text-ink-950 uppercase"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
