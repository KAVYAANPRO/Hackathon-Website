import { eventConfig } from "@/config/event";

export function OrganizersSection() {
  const { isFinalized, note, members } = eventConfig.organizers;

  return (
    <section
      id="organizers"
      className="relative border-b border-white/10 bg-[#070709] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 font-mono text-xs uppercase tracking-[0.2em] text-[#92929C]">
          <span>06 // ORGANIZING COUNCIL</span>
          <span>AHMEDABAD, GUJARAT</span>
        </div>

        {!isFinalized || members.length === 0 ? (
          <div className="grid grid-cols-1 gap-6 border border-white/10 bg-[#101014] p-8 sm:grid-cols-12 sm:items-center">
            <div className="sm:col-span-8">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[#F5F5F5] sm:text-3xl">
                BUILT BY STUDENTS. BACKED BY{" "}
                <span className="text-[#FF5C00]">CRAFT.</span>
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#92929C] sm:text-base">
                {note}
              </p>
            </div>
            <div className="sm:col-span-4 sm:text-right">
              <span className="inline-block border border-white/15 bg-[#070709] px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#FFB36B]">
                Roster Awaiting Confirmation
              </span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <article
                key={member.id}
                className="flex flex-col justify-between border border-white/10 bg-[#101014] p-6"
              >
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#FF5C00]">
                    {member.role}
                  </p>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold text-[#F5F5F5]">
                    {member.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#92929C]">
                    {member.description}
                  </p>
                </div>
                {member.profileUrl && (
                  <a
                    href={member.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block font-mono text-xs uppercase tracking-[0.16em] text-[#FFB36B] hover:underline"
                  >
                    Profile ↗
                  </a>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
