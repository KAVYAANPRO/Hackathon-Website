import type { Metadata } from "next";
import { eventConfig } from "@/config/event";
import { RegisterInterestForm } from "@/components/forms/RegisterInterestForm";

export const metadata: Metadata = {
  title: "Register Interest",
  description:
    "Register your early interest for AmdavadHacks 2027 in Ahmedabad, Gujarat. Receive updates when full individual and team applications open.",
};

export default function RegisterPage() {
  return (
    <section className="bg-[#070709] bg-arch-grid pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mb-12 border-b border-white/10 pb-6">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#FF5C00]">
            {`${eventConfig.brand.edition} // EARLY ACCESS`}
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.4rem,5vw,4rem)] font-bold leading-[1] tracking-[-0.03em] text-[#F5F5F5]">
            REGISTER INTEREST.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-[#92929C] sm:text-lg">
            Full applications are not open yet. Leave your details below to be
            notified first when team registration, eligibility verification, and
            participant dashboards launch.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <RegisterInterestForm />
          </div>

          <aside className="space-y-6 lg:col-span-5">
            <div className="border border-white/10 bg-[#101014] p-6">
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-[#FFB36B]">
                Current Event Status
              </h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div className="flex justify-between gap-4 border-b border-white/8 pb-3">
                  <dt className="text-[#92929C]">Tentative Window</dt>
                  <dd className="font-mono text-[#F5F5F5]">
                    {eventConfig.dates.tentativeWindow}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-white/8 pb-3">
                  <dt className="text-[#92929C]">Location</dt>
                  <dd className="font-mono text-[#F5F5F5]">
                    {eventConfig.brand.city}, {eventConfig.brand.region}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-white/8 pb-3">
                  <dt className="text-[#92929C]">Registration Fee</dt>
                  <dd className="text-right font-mono text-[#FFB36B]">
                    Not finalized
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#92929C]">Projected Onsite Cohort</dt>
                  <dd className="font-mono text-[#F5F5F5]">
                    {eventConfig.projections.onsiteParticipants} builders
                  </dd>
                </div>
              </dl>
            </div>

            <div className="border border-white/10 bg-[#101014] p-6">
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-[#F5F5F5]">
                Upcoming Platform Capabilities
              </h2>
              <p className="mt-2 text-sm text-[#92929C]">
                Once official registration opens, the platform will support:
              </p>
              <ul className="mt-4 space-y-2 font-mono text-xs text-[#92929C]">
                {eventConfig.registration.supportsFutureFeatures.map((feat) => (
                  <li key={feat} className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 bg-[#FF5C00]" aria-hidden="true" />
                    <span className="text-[#F5F5F5]">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
