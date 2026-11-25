"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, ArrowUpRight } from "lucide-react";

type FieldErrors = Partial<Record<string, string>>;

export function PartnerEnquiryForm() {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInput = (name: string) => {
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (serverError) setServerError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      organizationName: String(fd.get("organizationName") ?? ""),
      contactName: String(fd.get("contactName") ?? ""),
      workEmail: String(fd.get("workEmail") ?? ""),
      category: String(fd.get("category") ?? "technology"),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
    };

    const nextErrors: FieldErrors = {};
    if (payload.organizationName.trim().length < 2) {
      nextErrors.organizationName = "Organization name is required.";
    }
    if (payload.contactName.trim().length < 2) {
      nextErrors.contactName = "Contact person name is required.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.workEmail.trim())) {
      nextErrors.workEmail = "Please enter a valid work email address.";
    }
    if (payload.message.trim().length < 10) {
      nextErrors.message = "Please include at least 10 characters about your goals.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstKey = Object.keys(nextErrors)[0];
      form.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/partner-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { error?: string; message?: string };

      if (!res.ok) {
        setServerError(data.error ?? "Unable to submit enquiry.");
      } else {
        setSuccessMessage(
          data.message ?? "Your partnership enquiry has been logged."
        );
        form.reset();
      }
    } catch {
      setServerError("Network error. Please try again.");
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
              ENQUIRY LOGGED
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-[#F5F5F5]">
              Thank you for reaching out.
            </h2>
            <p className="mt-2 text-base text-[#92929C]">{successMessage}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="partner-form-heading"
      className="space-y-6 border border-white/12 bg-[#101014] p-6 sm:p-10"
    >
      <div className="border-b border-white/10 pb-4">
        <h2
          id="partner-form-heading"
          className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#F5F5F5]"
        >
          Official Partnership Enquiry
        </h2>
        <p className="mt-1 text-sm text-[#92929C]">
          Submit your organization&apos;s interest. Commercial terms are shared
          directly after organizer review.
        </p>
      </div>

      {serverError && (
        <div
          role="alert"
          className="flex items-start gap-3 border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-200"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />
          <span>{serverError}</span>
        </div>
      )}

      <div className="visually-hidden" aria-hidden="true">
        <label htmlFor="partner-website">Website</label>
        <input
          id="partner-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="organizationName"
            className="font-mono text-xs uppercase tracking-[0.14em] text-[#F5F5F5]"
          >
            Organization / Company <span className="text-[#FF5C00]">*</span>
          </label>
          <input
            id="organizationName"
            name="organizationName"
            type="text"
            required
            autoComplete="organization"
            onInput={() => handleInput("organizationName")}
            aria-invalid={Boolean(errors.organizationName)}
            className="min-h-[48px] w-full border border-white/15 bg-[#070709] px-4 py-3 text-base text-[#F5F5F5]"
          />
          {errors.organizationName && (
            <span className="text-xs text-red-400">{errors.organizationName}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="contactName"
            className="font-mono text-xs uppercase tracking-[0.14em] text-[#F5F5F5]"
          >
            Contact Name <span className="text-[#FF5C00]">*</span>
          </label>
          <input
            id="contactName"
            name="contactName"
            type="text"
            required
            autoComplete="name"
            onInput={() => handleInput("contactName")}
            aria-invalid={Boolean(errors.contactName)}
            className="min-h-[48px] w-full border border-white/15 bg-[#070709] px-4 py-3 text-base text-[#F5F5F5]"
          />
          {errors.contactName && (
            <span className="text-xs text-red-400">{errors.contactName}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="workEmail"
            className="font-mono text-xs uppercase tracking-[0.14em] text-[#F5F5F5]"
          >
            Work Email <span className="text-[#FF5C00]">*</span>
          </label>
          <input
            id="workEmail"
            name="workEmail"
            type="email"
            required
            autoComplete="email"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            onInput={() => handleInput("workEmail")}
            aria-invalid={Boolean(errors.workEmail)}
            className="min-h-[48px] w-full border border-white/15 bg-[#070709] px-4 py-3 text-base text-[#F5F5F5]"
          />
          {errors.workEmail && (
            <span className="text-xs text-red-400">{errors.workEmail}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="category"
            className="font-mono text-xs uppercase tracking-[0.14em] text-[#F5F5F5]"
          >
            Partnership Category
          </label>
          <select
            id="category"
            name="category"
            defaultValue="technology"
            className="min-h-[48px] w-full border border-white/15 bg-[#070709] px-4 py-3 text-base text-[#F5F5F5]"
          >
            <option value="title">Title Partner</option>
            <option value="technology">Technology Partner</option>
            <option value="community">Community Partner</option>
            <option value="food-hospitality">Food &amp; Hospitality Partner</option>
            <option value="merchandise">Merchandise Partner</option>
            <option value="other">Other / Custom</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="font-mono text-xs uppercase tracking-[0.14em] text-[#F5F5F5]"
        >
          Partnership Goals &amp; Notes <span className="text-[#FF5C00]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          onInput={() => handleInput("message")}
          aria-invalid={Boolean(errors.message)}
          className="w-full border border-white/15 bg-[#070709] px-4 py-3 text-base text-[#F5F5F5]"
          placeholder="Tell us how your organization would like to support builders at AmdavadHacks 2027..."
        />
        {errors.message && (
          <span className="text-xs text-red-400">{errors.message}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 bg-[#FF5C00] px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#070709] transition-colors hover:bg-[#FFB36B] disabled:opacity-60"
      >
        {submitting ? "Submitting..." : "Submit Partnership Enquiry"}
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  );
}
