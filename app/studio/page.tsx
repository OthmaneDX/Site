import type { Metadata } from "next";
import { AboutManifesto } from "@/features/about/AboutManifesto";
import { StudioDNA } from "@/features/studio-dna/StudioDNA";
import { ContactEnding } from "@/features/contact/ContactEnding";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Kilow Limited is a small independent mobile game studio built around one idea: the gameplay comes first.",
  alternates: { canonical: "/studio" },
};

export default function StudioPage() {
  return (
    <>
      <AboutManifesto />
      <StudioDNA />
      <ContactEnding />
    </>
  );
}
