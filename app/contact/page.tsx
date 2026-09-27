import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContactEnding } from "@/features/contact/ContactEnding";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Kilow Limited, or find our games on Google Play.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Contact"
        subtitle="Questions, feedback, press — we read everything that comes through."
      />
      <ContactEnding />
    </>
  );
}
