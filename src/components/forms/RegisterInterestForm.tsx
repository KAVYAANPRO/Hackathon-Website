"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle, ArrowUpRight, ShieldCheck } from "lucide-react";
import { eventConfig } from "@/config/event";

type FieldErrors = Partial<Record<string, string>>;

export function RegisterInterestForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isMinor, setIsMinor] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validateField = (name: string, value: string | boolean): string | null => {
    if (name === "fullName" && typeof value === "string" && value.trim().length < 2) {
      return "Please enter your full name (at least 2 characters).";
    }
    if (
      name === "email" &&
      typeof value === "string" &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
    ) {
      return "Please enter a valid email address.";
    }
    if (name === "institution" && typeof value === "string" && value.trim().length < 2) {
      return "Please enter your school, college, or organization.";
    }
    if (name === "city" && typeof value === "string" && value.trim().length < 2) {
      return "Please enter your city.";
    }
    return null;
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (!value) return; // Don't show premature error if untouched empty on blur
    const msg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: msg ?? undefined }));
  };

  const handleInput = (name: string) => {
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (serverError) setServerError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      fullName: String(fd.get("fullName") ?? ""),
      email: String(fd.get("email") ?? ""),
      institution: String(fd.get("institution") ?? ""),
      city: String(fd.get("city") ?? ""),
      role: String(fd.get("role") ?? "developer"),
      trackInterest: String(fd.get("trackInterest") ?? eventConfig.tracks[0].id),
      participationMode: String(fd.get("participationMode") ?? "individual"),
      isMinor: fd.get("isMinor") === "on",
      guardianConsentConfirmed: fd.get("guardianConsentConfirmed") === "on",
      privacyAccepted: fd.get("privacyAccepted") === "on",
      website: String(fd.get("website") ?? ""),
    };

    const nextErrors: FieldErrors = {};
    (["fullName", "email", "institution", "city"] as const).forEach((key) => {
      const msg = validateField(key, payload[key]);
      if (msg) nextErrors[key] = msg;
    });

    if (payload.isMinor && !payload.guardianConsentConfirmed) {
      nextErrors.guardianConsentConfirmed =
        "Parent/guardian consent acknowledgment is required for participants under 18.";
    }

    if (!payload.privacyAccepted) {
      nextErrors.privacyAccepted =
        "Please accept the privacy notice to continue.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstKey = Object.keys(nextErrors)[0];
      const target = form.querySelector<HTMLElement>(`[name="${firstKey}"]`);
      target?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/register-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { error?: string; message?: string };

      if (!res.ok) {
        setServerError(data.error ?? "Unable to submit right now.");
      } else {
        setSuccessMessage(
          data.message ?? "Your interest has been recorded for AmdavadHacks 2027."
        );
        form.reset();
        setIsMinor(false);
      }
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (successMessage) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border border-[#FF5C00]/40 bg-[#101014] p-8"
      >
        <div className="flex items-start gap-4">
          <CheckCircle2
            className="mt-0.5 h-6 w-6 shrink-0 text-[#FF5C00]"
            aria-hidden="true"
          />
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#FFB36B]">
              STATUS // REGISTERED INTEREST
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-[#F5F5F5]">
              You&apos;re on the early builder list.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#92929C]">
              {successMessage}
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => setSuccessMessage(null)}
                className="min-h-[48px] border border-white/15 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.16em] text-[#F5F5F5] hover:border-[#FF5C00]"
              >
                Register Another Person
              </button>
              <Link
                href="/"
                className="inline-flex min-h-[48px] items-center gap-2 bg-[#FF5C00] px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#070709]"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="register-form-heading"
      className="space-y-6 border border-white/12 bg-[#101014] p-6 sm:p-10"
    >
      <div className="border-b border-white/10 pb-4">
        <h2
          id="register-form-heading"
          className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#F5F5F5]"
        >
          Interest Registration
        </h2>
        <p className="mt-1 text-sm text-[#92929C]">
          No payment is collected. Fields marked with{" "}
          <span className="text-[#FF5C00]">*</span> are required.
        </p>
      </div>

      {serverError && (
        <div
          role="alert"
          aria-live="assertive"
          className="flex items-start gap-3 border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-200"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Honeypot anti-spam field */}
      <div className="visually-hidden" aria-hidden="true">
        <label htmlFor="reg-website">Website</label>
        <input
          id="reg-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="fullName"
            className="font-mono text-xs uppercase tracking-[0.14em] text-[#F5F5F5]"
          >
            Full Name <span className="text-[#FF5C00]" aria-hidden="true">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            enterKeyHint="next"
            onBlur={handleBlur}
            onInput={() => handleInput("fullName")}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className="min-h-[48px] w-full border border-white/15 bg-[#070709] px-4 py-3 text-base text-[#F5F5F5] placeholder:text-[#92929C]/60"
            placeholder="Aarav Patel"
          />
          {errors.fullName && (
            <span id="fullName-error" className="text-xs text-red-400">
              {errors.fullName}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="font-mono text-xs uppercase tracking-[0.14em] text-[#F5F5F5]"
          >
            Email Address <span className="text-[#FF5C00]" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            enterKeyHint="next"
            onBlur={handleBlur}
            onInput={() => handleInput("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="min-h-[48px] w-full border border-white/15 bg-[#070709] px-4 py-3 text-base text-[#F5F5F5] placeholder:text-[#92929C]/60"
            placeholder="builder@university.edu"
          />
          {errors.email && (
            <span id="email-error" className="text-xs text-red-400">
              {errors.email}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="institution"
            className="font-mono text-xs uppercase tracking-[0.14em] text-[#F5F5F5]"
          >
            Institution / College <span className="text-[#FF5C00]" aria-hidden="true">*</span>
          </label>
          <input
            id="institution"
            name="institution"
            type="text"
            required
            autoComplete="organization"
            enterKeyHint="next"
            onBlur={handleBlur}
            onInput={() => handleInput("institution")}
            aria-invalid={Boolean(errors.institution)}
            aria-describedby={errors.institution ? "institution-error" : undefined}
            className="min-h-[48px] w-full border border-white/15 bg-[#070709] px-4 py-3 text-base text-[#F5F5F5] placeholder:text-[#92929C]/60"
            placeholder="Nirma University / DA-IICT / High School"
          />
          {errors.institution && (
            <span id="institution-error" className="text-xs text-red-400">
              {errors.institution}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="city"
            className="font-mono text-xs uppercase tracking-[0.14em] text-[#F5F5F5]"
          >
            City <span className="text-[#FF5C00]" aria-hidden="true">*</span>
          </label>
          <input
            id="city"
            name="city"
            type="text"
            required
            autoComplete="address-level2"
            enterKeyHint="next"
            onBlur={handleBlur}
            onInput={() => handleInput("city")}
            aria-invalid={Boolean(errors.city)}
            aria-describedby={errors.city ? "city-error" : undefined}
            className="min-h-[48px] w-full border border-white/15 bg-[#070709] px-4 py-3 text-base text-[#F5F5F5] placeholder:text-[#92929C]/60"
            placeholder="Ahmedabad"
          />
          {errors.city && (
            <span id="city-error" className="text-xs text-red-400">
              {errors.city}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="role"
            className="font-mono text-xs uppercase tracking-[0.14em] text-[#F5F5F5]"
          >
            Primary Discipline
          </label>
          <select
            id="role"
            name="role"
            defaultValue="developer"
            className="min-h-[48px] w-full border border-white/15 bg-[#070709] px-4 py-3 text-base text-[#F5F5F5]"
          >
            <option value="developer">Software Developer / Engineer</option>
            <option value="designer">Product / UI/UX Designer</option>
            <option value="hardware">Hardware / Embedded Builder</option>
            <option value="entrepreneur">Aspiring Entrepreneur / PM</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="trackInterest"
            className="font-mono text-xs uppercase tracking-[0.14em] text-[#F5F5F5]"
          >
            Proposed Track Interest
          </label>
          <select
            id="trackInterest"
            name="trackInterest"
            defaultValue={eventConfig.tracks[0].id}
            className="min-h-[48px] w-full border border-white/15 bg-[#070709] px-4 py-3 text-base text-[#F5F5F5]"
          >
            {eventConfig.tracks.map((track) => (
              <option key={track.id} value={track.id}>
                {track.title} (Proposed)
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset className="space-y-3 border border-white/10 bg-[#070709] p-4">
        <legend className="px-2 font-mono text-xs uppercase tracking-[0.16em] text-[#92929C]">
          Intended Participation Mode
        </legend>
        <div className="flex flex-wrap gap-6">
          <label className="inline-flex min-h-[44px] cursor-pointer items-center gap-2.5 text-sm text-[#F5F5F5]">
            <input
              type="radio"
              name="participationMode"
              value="individual"
              defaultChecked
              className="h-4 w-4 accent-[#FF5C00]"
            />
            Individual (looking for a team or solo)
          </label>
          <label className="inline-flex min-h-[44px] cursor-pointer items-center gap-2.5 text-sm text-[#F5F5F5]">
            <input
              type="radio"
              name="participationMode"
              value="team"
              className="h-4 w-4 accent-[#FF5C00]"
            />
            Existing Team
          </label>
        </div>
      </fieldset>

      {/* Minor protection & privacy */}
      <div className="space-y-4 border border-white/10 bg-[#070709] p-5">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-[#FFB36B]">
          <ShieldCheck className="h-4 w-4 text-[#FF5C00]" aria-hidden="true" />
          <span>Participant Privacy &amp; Minor Protection</span>
        </div>

        <label className="flex min-h-[44px] cursor-pointer items-start gap-3 text-sm text-[#F5F5F5]">
          <input
            type="checkbox"
            name="isMinor"
            checked={isMinor}
            onChange={(e) => setIsMinor(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-[#FF5C00]"
          />
          <span>I am currently under 18 years of age.</span>
        </label>

        {isMinor && (
          <div className="ml-7 border-l-2 border-[#FF5C00] pl-4">
            <label className="flex min-h-[44px] cursor-pointer items-start gap-3 text-sm text-[#92929C]">
              <input
                type="checkbox"
                name="guardianConsentConfirmed"
                onChange={() => handleInput("guardianConsentConfirmed")}
                aria-invalid={Boolean(errors.guardianConsentConfirmed)}
                className="mt-1 h-4 w-4 shrink-0 accent-[#FF5C00]"
              />
              <span>
                I confirm I have parent/legal guardian awareness to register
                interest. Formal adult-organizer review and signed guardian
                consent will be required before any onsite participation.
              </span>
            </label>
            {errors.guardianConsentConfirmed && (
              <p className="mt-1 text-xs text-red-400">
                {errors.guardianConsentConfirmed}
              </p>
            )}
          </div>
        )}

        <label className="flex min-h-[44px] cursor-pointer items-start gap-3 text-sm text-[#92929C]">
          <input
            type="checkbox"
            name="privacyAccepted"
            required
            onChange={() => handleInput("privacyAccepted")}
            aria-invalid={Boolean(errors.privacyAccepted)}
            className="mt-1 h-4 w-4 shrink-0 accent-[#FF5C00]"
          />
          <span>
            I agree to the{" "}
            <Link href="/privacy" className="text-[#F5F5F5] underline hover:text-[#FF5C00]">
              Privacy Policy
            </Link>{" "}
            and consent to receive official AmdavadHacks 2027 updates.{" "}
            <span className="text-[#FF5C00]" aria-hidden="true">*</span>
          </span>
        </label>
        {errors.privacyAccepted && (
          <p className="text-xs text-red-400">{errors.privacyAccepted}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 bg-[#FF5C00] px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#070709] transition-colors hover:bg-[#FFB36B] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Submitting..." : "Submit Interest Registration"}
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  );
}
