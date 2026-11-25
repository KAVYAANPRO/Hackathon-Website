import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[75vh] flex-col items-center justify-center bg-[#070709] bg-arch-grid px-4 py-32 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#FF5C00]">
        ERR // 404 — COORDINATE NOT FOUND
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(3rem,8vw,6rem)] font-bold leading-none tracking-[-0.04em] text-[#F5F5F5]">
        OFF THE GRID.
      </h1>
      <p className="mt-4 max-w-md text-base text-[#92929C]">
        The route you requested does not exist in the AmdavadHacks 2027
        architecture.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-[48px] items-center gap-2 border border-[#FF5C00] bg-[#FF5C00] px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#070709] transition-colors hover:bg-[#FFB36B]"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Return to Base
      </Link>
    </section>
  );
}
