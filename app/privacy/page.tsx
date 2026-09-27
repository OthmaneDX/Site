import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContactEnding } from "@/features/contact/ContactEnding";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Kilow Limited collects, uses and protects information in our Android games, including third-party analytics and advertising services.",
  alternates: { canonical: "/privacy" },
};

const SECTIONS: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "1. Information collection & use",
    body: (
      <>
        <p>
          We do <strong>not</strong> directly collect personally identifiable information.
        </p>
        <p>
          Some third-party services integrated into our games may collect information required to
          provide analytics, advertisements and crash reporting:
        </p>
        <ul>
          <li>Google Play Services</li>
          <li>Google AdMob</li>
          <li>Firebase Analytics</li>
          <li>Firebase Crashlytics</li>
        </ul>
      </>
    ),
  },
  {
    heading: "2. Log data",
    body: (
      <>
        <p>
          If an unexpected error occurs while using one of our games, third-party services may
          automatically collect technical information (&ldquo;Log Data&rdquo;), which can include:
        </p>
        <ul>
          <li>Device IP address</li>
          <li>Device model</li>
          <li>Android version</li>
          <li>Application version</li>
          <li>Date and time of use</li>
          <li>Crash reports</li>
          <li>Performance diagnostics</li>
          <li>General technical statistics</li>
        </ul>
      </>
    ),
  },
  {
    heading: "3. Advertising",
    body: (
      <>
        <p>
          Some of our games display advertisements using <strong>Google AdMob</strong>. AdMob may
          collect information including:
        </p>
        <ul>
          <li>Advertising identifier</li>
          <li>Device information</li>
          <li>Approximate location</li>
          <li>Advertising performance data</li>
          <li>App interaction data</li>
        </ul>
        <p>
          You can review how Google uses this data in the{" "}
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener">
            Google privacy &amp; terms
          </a>
          .
        </p>
      </>
    ),
  },
  {
    heading: "4. Cookies",
    body: (
      <p>
        Our games do not directly use cookies. However, some integrated third-party services may
        use technologies similar to cookies to improve their services and advertising experience.
      </p>
    ),
  },
  {
    heading: "5. Service providers",
    body: (
      <>
        <p>We work with trusted third-party companies to:</p>
        <ul>
          <li>Provide advertisements</li>
          <li>Analyse game usage</li>
          <li>Improve performance</li>
          <li>Detect crashes</li>
          <li>Maintain our services</li>
        </ul>
        <p>
          These providers only access information necessary to perform these services and are
          obligated not to use it for any unrelated purpose.
        </p>
      </>
    ),
  },
  {
    heading: "6. Security",
    body: (
      <p>
        Protecting your information is important to us. While we use commercially acceptable
        methods to safeguard information, no transmission over the Internet or electronic storage
        system can be guaranteed to be completely secure.
      </p>
    ),
  },
  {
    heading: "7. External links",
    body: (
      <p>
        Our games may contain links to third-party websites or services. We are not responsible
        for their content or privacy practices, and we encourage you to review their privacy
        policies before providing any information.
      </p>
    ),
  },
  {
    heading: "8. Children's privacy",
    body: (
      <p>
        Our applications are not intended for children under the age of 13. We do not knowingly
        collect personal information from children. If you believe a child has provided such
        information, please contact us and we will take appropriate action.
      </p>
    ),
  },
  {
    heading: "9. Changes to this policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time. Any changes will be published on this
        page along with an updated revision date.
      </p>
    ),
  },
  {
    heading: "10. Contact us",
    body: (
      <>
        <p>If you have questions about this Privacy Policy, get in touch:</p>
        <dl className="mt-4 grid gap-3">
          <div>
            <dt className="text-[11px] font-bold tracking-[0.2em] text-paper-faint uppercase">Developer</dt>
            <dd className="text-paper">Kilow Limited</dd>
          </div>
          <div>
            <dt className="text-[11px] font-bold tracking-[0.2em] text-paper-faint uppercase">Email</dt>
            <dd>
              <a href="mailto:knee.othmane@gmail.com" className="text-paper">
                knee.othmane@gmail.com
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-[11px] font-bold tracking-[0.2em] text-paper-faint uppercase">
              Google Play
            </dt>
            <dd>
              <a
                href="https://play.google.com/store/apps/developer?id=Kilow%20Limited"
                target="_blank"
                rel="noopener"
                className="text-paper"
              >
                Developer page
              </a>
            </dd>
          </div>
        </dl>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Last updated 1 July 2026" title="Privacy Policy" />

      <article className="mx-auto max-w-3xl px-6 pb-32 md:px-10">
        <p className="text-clamp-lg text-paper-dim">
          Welcome to <strong className="text-paper">Kilow Limited</strong>. This Privacy Policy
          explains how we collect, use and protect information when you use our mobile games and
          services. By using our applications, you agree to the practices described here.
        </p>

        <div className="mt-16 flex flex-col gap-14">
          {SECTIONS.map((s) => (
            <section key={s.heading} className="border-t border-paper/10 pt-10">
              <h2 className="font-display text-lg font-bold tracking-tight text-accent-lite uppercase">
                {s.heading}
              </h2>
              <div className="prose-privacy mt-4 flex flex-col gap-3 text-clamp-base text-paper-dim [&_a]:text-accent-lite [&_a]:underline [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-paper [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5">
                {s.body}
              </div>
            </section>
          ))}
        </div>
      </article>

      <ContactEnding />
    </>
  );
}
