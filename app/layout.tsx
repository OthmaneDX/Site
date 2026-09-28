import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { LenisProvider } from "@/components/LenisProvider";
import { MotionProvider } from "@/components/MotionProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { FloatingNav } from "@/components/FloatingNav";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const SITE_URL = "https://kilowlimited.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kilow Limited — We Build Worlds. You Play Them.",
    template: "%s | Kilow Limited",
  },
  description:
    "Kilow Limited is an independent mobile game studio building polished, free-to-play Android games — Bear Adventure Surfer, Chameleon Surfer Rush, and Gugu Gaga Penguin Surfer.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Kilow Limited",
    title: "Kilow Limited — We Build Worlds. You Play Them.",
    description: "An independent mobile game studio. Free-to-play Android games, built with the gameplay first.",
    images: [{ url: "/img/og-image.png", width: 1200, height: 630, alt: "Kilow Limited" }],
  },
  twitter: { card: "summary_large_image" },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#org`,
  name: "Kilow Limited",
  url: SITE_URL,
  logo: `${SITE_URL}/img/icon-512.png`,
  email: "knee.othmane@gmail.com",
  description: "Indie mobile game studio building polished Android games.",
  sameAs: ["https://play.google.com/store/apps/developer?id=Kilow%20Limited"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className="bg-ink-950 text-paper antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <MotionProvider>
          <LenisProvider>
            <NoiseOverlay />
            <CustomCursor />
            <FloatingNav />
            <main>{children}</main>
          </LenisProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
