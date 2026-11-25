import type { Metadata } from "next";
import { eventConfig } from "@/config/event";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy and data protection policy for AmdavadHacks 2027.",
};

export default function PrivacyPage() {
  return (
    <section className="bg-[#070709] pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF5C00]">
          GOVERNANCE // PRIVACY
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-[#F5F5F5]">
          Privacy Policy
        </h1>
        <div className="mt-8 space-y-6 text-base leading-relaxed text-[#92929C]">
          <p>
            {eventConfig.brand.edition} collects only the information strictly
            necessary to notify you about event updates, manage future
            applications, and review partnership enquiries.
          </p>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#F5F5F5]">
              1. Data Minimization &amp; Security
            </h2>
            <p className="mt-2">
              Participant and partner submissions are transmitted over HTTPS and
              stored with strict server-side access controls. Participant data is
              never exposed through public APIs or sold to third parties.
            </p>
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#F5F5F5]">
              2. Protection of Minors
            </h2>
            <p className="mt-2">
              Applicants under 18 years of age are required to acknowledge
              parent/guardian awareness when registering interest. Formal
              adult-organizer review and signed guardian consent are mandatory
              before any minor is admitted to onsite participation.
            </p>
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#F5F5F5]">
              3. Updates &amp; Deletion
            </h2>
            <p className="mt-2">
              Once official contact channels are published, participants may
              request access to or deletion of their submitted interest records
              at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
