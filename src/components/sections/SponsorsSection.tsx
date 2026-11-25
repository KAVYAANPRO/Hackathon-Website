import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { eventConfig } from "@/config/event";

export function SponsorsSection() {
  const { tiers } = eventConfig.sponsorship;
  const hasAnyConfirmed = tiers.some((tier) => tier.sponsors.length > 0);

  return (
    <section
      id="sponsors"
      className="relative border-b border-white/10 bg-[#101014] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 font-mono text-xs uppercase tracking-[0.2em] text-[#92929C]">
          <span>05 // PARTNERSHIPS</span>
          <span className="text-[#FF5C00]">SPONSORSHIP PROSPECTUS</span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4.3vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.03em] text-[#F5F5F5]">
              POWER THE NEXT GENERATION OF{" "}
              <span className="text-[#FF5C00]">BUILDERS.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#92929C]">
              AmdavadHacks 2027 connects ambitious student engineers, designers,
              and founders with forward-thinking technology companies, developer
              platforms, and ecosystem partners.
            </p>
            <div className="mt-8">
              <Link
                href="/partners"
                className="inline-flex min-h-[48px] items-center gap-2 border border-[#FF5C00] bg-[#FF5C00] px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#070709] transition-colors hover:bg-[#FFB36B] hover:border-[#FFB36B]"
              >
                Become a Partner
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            {!hasAnyConfirmed && (
              <div className="mb-6 border border-[#FF5C00]/30 bg-[#070709] p-6">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#FFB36B]">
                  Partnership Invitation — 2027 Cohort
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#92929C]">
                  Official partner roster is currently being finalized. Partner
                  logos and endorsements appear here only after formal organizer
                  approval. Explore the partnership categories below or submit an
                  official business enquiry.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {tiers.map((tier, idx) => (
                <div
                  key={tier.id}
                  className={`border border-white/10 bg-[#070709] p-5 ${
                    idx === 0 ? "sm:col-span-2" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#F5F5F5]">
                      {tier.tierName}
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#92929C]">
                      {tier.sponsors.length > 0 ? "Confirmed" : "Open Tier"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[#92929C]">
                    {tier.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
