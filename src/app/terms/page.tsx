import type { Metadata } from "next";
import { eventConfig } from "@/config/event";

export const metadata: Metadata = {
  title: "Terms & Code of Conduct",
  description: "Terms and provisional guidelines for AmdavadHacks 2027.",
};

export default function TermsPage() {
  return (
    <section className="bg-[#070709] pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF5C00]">
          GOVERNANCE // TERMS
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-[#F5F5F5]">
          Terms &amp; Provisional Guidelines
        </h1>
        <div className="mt-8 space-y-6 text-base leading-relaxed text-[#92929C]">
          <p>
            {eventConfig.brand.edition} is currently in its pre-registration
            planning phase ({eventConfig.dates.tentativeWindow}). All tracks,
            timelines, and projections shown on this website are provisional and
            subject to official organizer confirmation.
          </p>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#F5F5F5]">
              1. Interest Registration
            </h2>
            <p className="mt-2">
              Submitting the Register Interest form does not guarantee onsite
              admission and does not create any payment obligation. No fees are
              collected prior to finalized pricing and refund policy publication.
            </p>
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#F5F5F5]">
              2. Code of Conduct
            </h2>
            <p className="mt-2">
              All participants, mentors, partners, and organizers are expected to
              uphold a respectful, inclusive, and harassment-free engineering
              environment across digital and onsite spaces.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
