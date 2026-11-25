import { NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";
import { getServerSupabaseClient } from "@/lib/supabase";

const partnerEnquirySchema = z.object({
  organizationName: z
    .string()
    .trim()
    .min(2, "Organization name is required")
    .max(160),
  contactName: z.string().trim().min(2, "Contact name is required").max(120),
  workEmail: z.string().trim().email("Valid work email is required").max(180),
  category: z.enum([
    "title",
    "technology",
    "community",
    "food-hospitality",
    "merchandise",
    "other",
  ]),
  message: z
    .string()
    .trim()
    .min(10, "Please share a brief note about your partnership interest")
    .max(2000),
  website: z.string().max(0).optional(), // Honeypot
});

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";
    const rate = checkRateLimit(`partner:${ip}`, 4, 60_000);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          error: `Too many requests. Please try again in ${rate.retryAfterSeconds}s.`,
        },
        { status: 429 }
      );
    }

    const body: unknown = await request.json();
    const parsed = partnerEnquirySchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstIssue?.message ?? "Invalid enquiry details" },
        { status: 400 }
      );
    }

    if (parsed.data.website && parsed.data.website.length > 0) {
      return NextResponse.json({
        ok: true,
        message: "Enquiry received.",
      });
    }

    const supabase = getServerSupabaseClient();
    if (supabase) {
      const { error } = await supabase.from("partner_enquiries").insert({
        organization_name: parsed.data.organizationName,
        contact_name: parsed.data.contactName,
        work_email: parsed.data.workEmail.toLowerCase(),
        category: parsed.data.category,
        message: parsed.data.message,
      });

      if (error) {
        return NextResponse.json(
          { error: "Unable to submit enquiry right now. Please try again." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      ok: true,
      message:
        "Thank you. Your partnership enquiry for AmdavadHacks 2027 has been logged for organizer review.",
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }
}
