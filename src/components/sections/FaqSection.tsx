import { ChevronDown } from "lucide-react";
import { eventConfig } from "@/config/event";

export function FaqSection() {
  return (
    <section
      id="faqs"
      className="relative border-b border-white/10 bg-[#101014] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 font-mono text-xs uppercase tracking-[0.2em] text-[#92929C]">
          <span>07 // FREQUENTLY ASKED QUESTIONS</span>
          <span>TRANSPARENCY FIRST</span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.03em] text-[#F5F5F5]">
              QUESTIONS &amp;{" "}
              <span className="text-[#FF5C00]">CLARITY.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#92929C]">
              Items marked <span className="text-[#FFB36B]">Awaiting Announcement</span>{" "}
              are actively being finalized by the organizing team and will be
              updated before full registration opens.
            </p>
          </div>

          <div className="divide-y divide-white/10 border border-white/10 bg-[#070709] lg:col-span-8">
            {eventConfig.faqs.map((faq) => (
              <details key={faq.id} className="ah-details group">
                <summary className="ah-summary flex min-h-[64px] cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.02]">
                  <div className="flex items-start gap-4">
                    <ChevronDown
                      className="mt-1 h-4 w-4 shrink-0 text-[#FF5C00] transition-transform duration-200 group-open:rotate-180"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-[#92929C]">
                        {faq.topic}
                      </span>
                      <span className="mt-1 block font-[family-name:var(--font-display)] text-base font-medium text-[#F5F5F5] sm:text-lg">
                        {faq.question}
                      </span>
                    </div>
                  </div>
                  {!faq.confirmed && (
                    <span className="hidden shrink-0 border border-[#FFB36B]/35 bg-[#FFB36B]/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#FFB36B] sm:inline-block">
                      Awaiting Announcement
                    </span>
                  )}
                </summary>
                <div className="px-6 pb-6 pl-14 text-sm leading-relaxed text-[#92929C] sm:text-base">
                  {!faq.confirmed && (
                    <span className="mb-2 inline-block border border-[#FFB36B]/35 bg-[#FFB36B]/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#FFB36B] sm:hidden">
                      Awaiting Announcement
                    </span>
                  )}
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
