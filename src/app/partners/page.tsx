import type { Metadata } from "next";
import { eventConfig } from "@/config/event";
import { PartnerEnquiryForm } from "@/components/forms/PartnerEnquiryForm";

export const metadata: Metadata = {
  title: "Become a Partner",
  description:
    "Partner with AmdavadHacks 2027 in Ahmedabad, Gujarat. Explore sponsorship categories and submit an official business enquiry.",
};

export default function PartnersPage() {
  return (
    <section className="bg-[#070709] bg-arch-grid pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mb-12 border-b border-white/10 pb-6">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#FF5C00]">
            PARTNERSHIPS // {eventConfig.brand.edition}
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.4rem,5vw,4rem)] font-bold leading-[1] tracking-[-0.03em] text-[#F5F5F5]">
            POWER THE NEXT GENERATION OF{" "}
            <span className="text-[#FF5C00]">BUILDERS.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-[#92929C] sm:text-lg">
            Associate your brand with one of Gujarat&apos;s most ambitious
            student technology festivals. Connect with student engineers,
            designers, and early-stage builders in Ahmedabad.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            <div className="border border-white/10 bg-[#101014] p-6">
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-[#FFB36B]">
                Projected Reach (2027)
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="border border-white/8 bg-[#070709] p-4">
                  <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#F5F5F5]">
                    {eventConfig.projections.registrations}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#92929C]">
                    Projected Registrations
                  </div>
                </div>
                <div className="border border-white/8 bg-[#070709] p-4">
                  <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#F5F5F5]">
                    {eventConfig.projections.onsiteParticipants}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#92929C]">
                    Projected Onsite
                  </div>
                </div>
              </div>
              <p className="mt-3 font-mono text-[11px] text-[#92929C]">
                {eventConfig.projections.disclaimer}
              </p>
            </div>

            <div className="border border-white/10 bg-[#101014] p-6">
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-[#F5F5F5]">
                Partnership Categories
              </h2>
              <ul className="mt-4 space-y-4">
                {eventConfig.sponsorship.tiers.map((tier) => (
                  <li key={tier.id} className="border-b border-white/8 pb-3 last:border-b-0 last:pb-0">
                    <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-[#F5F5F5]">
                      {tier.tierName}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#92929C]">
                      {tier.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7">
            <PartnerEnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
