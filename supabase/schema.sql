-- AmdavadHacks 2027 — Supabase PostgreSQL Schema
-- Run this in your Supabase SQL Editor when provisioning the backend.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Interest Registrations (Pre-registration phase)
CREATE TABLE IF NOT EXISTS public.interest_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  institution TEXT NOT NULL,
  city TEXT NOT NULL,
  role TEXT NOT NULL,
  track_interest TEXT NOT NULL,
  participation_mode TEXT NOT NULL,
  is_minor BOOLEAN NOT NULL DEFAULT FALSE,
  guardian_consent_confirmed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row-Level Security and deny all public/anon reads & writes
ALTER TABLE public.interest_registrations ENABLE ROW LEVEL SECURITY;

-- 2. Partner Enquiries
CREATE TABLE IF NOT EXISTS public.partner_enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  work_email TEXT NOT NULL,
  category TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.partner_enquiries ENABLE ROW LEVEL SECURITY;

-- Note: Server-side Next.js Route Handlers use SUPABASE_SERVICE_ROLE_KEY,
-- which bypasses RLS safely on the server without exposing any participant data to public APIs.
