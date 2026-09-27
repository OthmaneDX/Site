import { EntrySequence } from "@/features/EntrySequence";
import { Hero } from "@/features/hero/Hero";
import { GameShowcase } from "@/features/game-showcase/GameShowcase";
import { PlaySection } from "@/features/play-section/PlaySection";
import { AboutManifesto } from "@/features/about/AboutManifesto";
import { StudioDNA } from "@/features/studio-dna/StudioDNA";
import { NextRun } from "@/features/next-run/NextRun";
import { StatsDashboard } from "@/features/stats/StatsDashboard";
import { ContactEnding } from "@/features/contact/ContactEnding";

export default function Home() {
  return (
    <>
      <EntrySequence />
      <Hero />
      <GameShowcase />
      <PlaySection />
      <AboutManifesto />
      <StudioDNA />
      <NextRun />
      <StatsDashboard />
      <ContactEnding />
    </>
  );
}
