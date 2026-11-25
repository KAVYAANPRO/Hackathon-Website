import { NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";
import { getServerSupabaseClient } from "@/lib/supabase";

const registerInterestSchema = z
  .object({
    fullName: z.string().trim().min(2, "Full name is required").max(120),
    email: z.string().trim().email("Valid email address is required").max(180),
    institution: z
      .string()
      .trim()
      .min(2, "Institution or organization is required")
      .max(160),
    city: z.string().trim().min(2, "City is required").max(100),
    role: z.enum(["developer", "designer", "entrepreneur", "hardware", "other"]),
    trackInterest: z.string().trim().min(1).max(80),
    participationMode: z.enum(["individual", "team"]),
    isMinor: z.boolean(),
    guardianConsentConfirmed: z.boolean(),
    privacyAccepted: z.literal(true, {
      error: "You must accept the privacy policy to register interest",
    }),
    website: z.string().max(0).optional(), // Honeypot field
  })
  .refine((data) => !data.isMinor || data.guardianConsentConfirmed, {
    message:
      "Participants under 18 require parent/guardian consent acknowledgment",
    path: ["guardianConsentConfirmed"],
  });

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";
    const rate = checkRateLimit(`register:${ip}`, 5, 60_000);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          error: `Too many requests. Please try again in ${rate.retryAfterSeconds}s.`,
        },
        { status: 429 }
      );
    }

    const body: unknown = await request.json();
    const parsed = registerInterestSchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstIssue?.message ?? "Invalid submission data" },
        { status: 400 }
      );
    }

    // Silently accept if honeypot was filled by a bot
    if (parsed.data.website && parsed.data.website.length > 0) {
      return NextResponse.json({
        ok: true,
        message: "Interest recorded.",
      });
    }

    const supabase = getServerSupabaseClient();
    if (supabase) {
      const { error } = await supabase.from("interest_registrations").insert({
        full_name: parsed.data.fullName,
        email: parsed.data.email.toLowerCase(),
        institution: parsed.data.institution,
        city: parsed.data.city,
        role: parsed.data.role,
        track_interest: parsed.data.trackInterest,
        participation_mode: parsed.data.participationMode,
        is_minor: parsed.data.isMinor,
        guardian_consent_confirmed: parsed.data.guardianConsentConfirmed,
      });

      if (error) {
        if (error.code === "23505") {
          return NextResponse.json(
            { error: "This email is already registered for updates." },
            { status: 409 }
          );
        }
        return NextResponse.json(
          { error: "Unable to save registration right now. Please try again." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      ok: true,
      message:
        "Your interest in AmdavadHacks 2027 has been recorded. We will notify you when full registration opens.",
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }
}
