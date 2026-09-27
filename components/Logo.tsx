import Link from "next/link";

/** Pure typographic wordmark — the site's only "icon" is the word itself,
 * deliberately dropping the old pixel-gamepad mark to read as cinematic
 * rather than retro. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Kilow Limited — home"
      className={`font-display text-lg font-extrabold tracking-[0.08em] text-paper ${className}`}
    >
      KILOW
    </Link>
  );
}
