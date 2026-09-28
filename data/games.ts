import { z } from "zod";

export const gameSchema = z.object({
  slug: z.string(),
  title: z.string(),
  tagline: z.string(),
  description: z.string(),
  status: z.enum(["live", "development"]),
  keyArt: z.string(),
  storeUrl: z.string().url().optional(),
  releaseDate: z.string().optional(),
  platform: z.literal("Android"),
  features: z.array(z.string()).min(1),
  accent: z.object({
    base: z.string(),
    deep: z.string(),
  }),
  // Real gameplay media doesn't exist yet for any title — left optional on
  // purpose so the detail page renders a complete, intentional layout with
  // just the key art today, and a screenshot gallery / trailer embed can be
  // dropped in later with zero component changes.
  screenshots: z.array(z.string()).optional(),
  trailer: z.string().url().optional(),
});

export type Game = z.infer<typeof gameSchema>;

const rawGames = [
  {
    slug: "bear-adventure-surfer",
    title: "Bear Adventure Surfer",
    tagline: "Grind the rails. Outrun the train.",
    description:
      "A scrappy, backpack-wearing bear rides a hoverboard through a sun-drenched city on rails — dodge, jump and chain near-misses in an endless one-thumb sprint built for quick sessions.",
    status: "live",
    keyArt: "/img/icon-bear.webp",
    storeUrl:
      "https://play.google.com/store/apps/details?id=com.kilow.bear.adventure.surfer.rush.subway",
    platform: "Android",
    features: [
      "One-thumb endless rail-grind",
      "Procedural runs — never the same track twice",
      "Coin & combo scoring",
      "Free to play, no paywalls",
    ],
    accent: { base: "var(--color-bear)", deep: "var(--color-bear-deep)" },
  },
  {
    slug: "chameleon-surfer-rush",
    title: "Chameleon Surfer Rush",
    tagline: "Color-shifting. Cop-dodging. Never the same run twice.",
    description:
      "Grind the rails, dodge the beat cop and outrun the train as a color-shifting chameleon surfer — one more run always feels like the first.",
    status: "live",
    keyArt: "/img/icon-chameleon.webp",
    storeUrl:
      "https://play.google.com/store/apps/details?id=com.kilow.chameleon.rush.surfer",
    platform: "Android",
    features: [
      "Signature color-shift ability",
      "Chase sequences with a beat cop",
      "Endless one-thumb rail-grind",
      "Free to play, no paywalls",
    ],
    accent: { base: "var(--color-chameleon)", deep: "var(--color-chameleon-deep)" },
  },
  {
    slug: "gugu-gaga-penguin-surfer",
    title: "Gugu Gaga Penguin Surfer",
    tagline: "Suit up. Grind the neon night.",
    description:
      "A penguin-suited rider takes the rails through a neon-lit night city — the newest endless surfer in the Kilow lineup.",
    status: "live",
    keyArt: "/img/icon-penguin.webp",
    storeUrl:
      "https://play.google.com/store/apps/details?id=com.kilow.gugu.gaga.gogo.penguin.surfer",
    platform: "Android",
    features: [
      "Endless one-thumb rail-grind",
      "Neon night city setting",
      "Free to play, no paywalls",
    ],
    accent: { base: "var(--color-penguin)", deep: "var(--color-penguin-deep)" },
  },
] satisfies Game[];

export const games: Game[] = rawGames.map((g) => gameSchema.parse(g));

export const liveGames = games.filter((g) => g.status === "live");
export const upcomingGames = games.filter((g) => g.status === "development");

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}
