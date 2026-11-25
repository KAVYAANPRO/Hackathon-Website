import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import { eventConfig } from "@/config/event";

export function ScheduleSection() {
  const { isFinalized, announcementNote, supportedCategories, days } =
    eventConfig.schedule;

  return (
    <section
      id="schedule"
      className="relative border-b border-white/10 bg-[#070709] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 font-mono text-xs uppercase tracking-[0.2em] text-[#92929C]">
          <span>04 // SCHEDULE</span>
          <span className="text-[#FFB36B]">
            WINDOW: {eventConfig.dates.tentativeWindow}
          </span>
        </div>

        {!isFinalized ? (
          <div className="grid grid-cols-1 gap-8 border border-white/12 bg-[#101014] p-8 sm:p-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="mb-4 inline-flex items-center gap-2 border border-[#FF5C00]/35 bg-[#FF5C00]/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[#FFB36B]">
                <Clock className="h-3.5 w-3.5 text-[#FF5C00]" aria-hidden="true" />
                Schedule Announcing Soon
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.04] tracking-[-0.03em] text-[#F5F5F5]">
                PRECISION TIMING,{" "}
                <span className="text-[#92929C]">IN CALIBRATION.</span>
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#92929C]">
                {announcementNote}
              </p>
              <div className="mt-8">
                <Link
                  href="/register"
                  className="inline-flex min-h-[48px] items-center gap-2 border border-[#FF5C00] bg-[#FF5C00] px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#070709] transition-colors hover:bg-[#FFB36B] hover:border-[#FFB36B]"
                >
                  Get Schedule Alerts
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="flex flex-col justify-between border-t border-white/10 pt-6 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#92929C]">
                  Planned Program Architecture
                </p>
                <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
                  {supportedCategories.map((category, idx) => (
                    <li
                      key={category}
                      className="flex items-center justify-between border border-white/8 bg-[#070709] px-4 py-3 font-mono text-xs text-[#F5F5F5]"
                    >
                      <span>{category}</span>
                      <span className="text-[#92929C]">
                        0{idx + 1}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-6 font-mono text-[11px] text-[#92929C]">
                Exact dates &amp; session timings will be published once venue
                is finalized.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {days.map((day) => (
              <div
                key={day.dayLabel}
                className="border border-white/10 bg-[#101014] p-6"
              >
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#F5F5F5]">
                  {day.dayLabel} — {day.dateLabel}
                </h3>
                <div className="mt-4 divide-y divide-white/8">
                  {day.sessions.map((session) => (
                    <div
                      key={`${day.dayLabel}-${session.time}-${session.title}`}
                      className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-12"
                    >
                      <div className="font-mono text-xs text-[#FF5C00] sm:col-span-3">
                        {session.time}
                      </div>
                      <div className="sm:col-span-9">
                        <div className="font-semibold text-[#F5F5F5]">
                          {session.title}
                        </div>
                        <p className="mt-1 text-sm text-[#92929C]">
                          {session.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
