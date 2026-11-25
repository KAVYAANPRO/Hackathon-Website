export type TrackItem = {
  id: string;
  code: string;
  title: string;
  tagline: string;
  description: string;
  focusAreas: string[];
  status: "proposed" | "confirmed";
  accentGeometry: "lattice" | "circuit" | "pulse" | "helix" | "shield" | "prism";
};

export type JourneyStep = {
  number: string;
  title: string;
  summary: string;
  detail: string;
  status: "proposed" | "confirmed";
};

export type ScheduleSession = {
  time: string;
  title: string;
  category:
    | "Opening Ceremony"
    | "Hacking Session"
    | "Mentoring"
    | "Project Submission"
    | "Judging"
    | "Awards";
  description: string;
};

export type ScheduleDay = {
  dayLabel: string;
  dateLabel: string;
  sessions: ScheduleSession[];
};

export type SponsorTier = {
  id: string;
  tierName: string;
  description: string;
  sponsors: Array<{
    name: string;
    logoUrl: string;
    websiteUrl: string;
  }>;
};

export type OrganizerMember = {
  id: string;
  name: string;
  role: string;
  description: string;
  profileUrl?: string;
};

export type FaqItem = {
  id: string;
  topic: string;
  question: string;
  answer: string;
  confirmed: boolean;
};

export const eventConfig = {
  brand: {
    name: "AmdavadHacks",
    edition: "AmdavadHacks 2027",
    monogram: "AH",
    primaryTagline: "Engineer the Impossible.",
    secondaryTagline: "The City Builds. The Future Follows.",
    coordinates: "23.0225° N, 72.5714° E",
    city: "Ahmedabad",
    region: "Gujarat, India",
    year: "2027",
  },
  dates: {
    tentativeWindow: "March–May 2027",
    /**
     * Set to an ISO-8601 string (e.g. "2027-04-10T09:00:00+05:30") ONLY when
     * the exact event date is officially confirmed. Countdown stays disabled while null.
     */
    confirmedStartIso: null as string | null,
    isFinalized: false,
  },
  venue: {
    name: "Awaiting Confirmation",
    city: "Ahmedabad, Gujarat, India",
    isFinalized: false,
  },
  projections: {
    registrations: "300–400",
    registrationsLabel: "Projected Registrations",
    onsiteParticipants: "100–120",
    onsiteLabel: "Projected Onsite Participants",
    creativityValue: "∞",
    creativityLabel: "Unlimited Creativity",
    disclaimer:
      "Figures represent planning projections for AmdavadHacks 2027, not finalized capacity or past attendance.",
  },
  registration: {
    mode: "interest" as "interest" | "open" | "closed",
    feeStatus: "Not finalized — awaiting organizer announcement",
    teamSizeStatus: "Awaiting announcement",
    supportsFutureFeatures: [
      "Individual or team registration",
      "Team creation and joining",
      "Eligibility verification",
      "Registration status & participant dashboard",
      "Shortlisting status & project submissions",
      "Automated confirmation emails",
    ],
  },
  contact: {
    officialEmailApproved: false,
    officialEmail: null as string | null,
    socialLinksApproved: false,
    socials: [] as Array<{ label: string; href: string }>,
  },
  tracks: [
    {
      id: "ai-ml",
      code: "TRK-01",
      title: "Artificial Intelligence & Machine Learning",
      tagline: "Autonomous systems, applied inference, and human-centered intelligence.",
      description:
        "Build practical AI systems, edge-inference tools, developer copilots, or domain-specific ML models engineered for real-world reliability.",
      focusAreas: ["Applied LLMs & Agents", "Computer Vision", "Edge & Local Inference"],
      status: "proposed",
      accentGeometry: "lattice",
    },
    {
      id: "fintech",
      code: "TRK-02",
      title: "FinTech",
      tagline: "Programmable finance, inclusion infrastructure, and transparent commerce.",
      description:
        "Reimagine digital payments, credit accessibility, personal finance tooling, or fraud-resilient financial rails for emerging markets.",
      focusAreas: ["Payment Rails", "Financial Inclusion", "Risk & Compliance Tech"],
      status: "proposed",
      accentGeometry: "circuit",
    },
    {
      id: "healthtech",
      code: "TRK-03",
      title: "Healthcare Technology",
      tagline: "Preventive diagnostics, clinical workflow clarity, and accessible care.",
      description:
        "Design tools that empower patients, clinicians, and community health networks with faster triage, clear data, and assistive hardware or software.",
      focusAreas: ["Diagnostic Support", "Patient Accessibility", "Clinical Workflows"],
      status: "proposed",
      accentGeometry: "pulse",
    },
    {
      id: "sustainability",
      code: "TRK-04",
      title: "Sustainability",
      tagline: "Climate resilience, urban energy efficiency, and circular systems.",
      description:
        "Engineer solutions for water stewardship, urban heat mitigation, clean-grid optimization, and verifiable environmental impact.",
      focusAreas: ["Urban Climate Tech", "Energy Optimization", "Circular Supply Chains"],
      status: "proposed",
      accentGeometry: "helix",
    },
    {
      id: "cybersecurity",
      code: "TRK-05",
      title: "Cybersecurity",
      tagline: "Zero-trust defense, privacy-preserving systems, and resilient infrastructure.",
      description:
        "Create defensive security tools, privacy-first identity protocols, threat detection pipelines, or safer developer ecosystems.",
      focusAreas: ["Identity & Privacy", "Threat Detection", "Secure DevTooling"],
      status: "proposed",
      accentGeometry: "shield",
    },
    {
      id: "open-innovation",
      code: "TRK-06",
      title: "Open Innovation",
      tagline: "Uncharted territory for builders who refuse to fit inside a single box.",
      description:
        "Hardware-software hybrids, civic tech, creative computing, developer tools, or any bold idea that deserves to exist.",
      focusAreas: ["Civic & Cultural Tech", "Developer Tools", "Experimental Computing"],
      status: "proposed",
      accentGeometry: "prism",
    },
  ] satisfies TrackItem[],
  journey: [
    {
      number: "01",
      title: "Register",
      summary: "Submit your interest and builder profile.",
      detail:
        "Register your interest early to receive official updates when full individual and team applications open.",
      status: "proposed",
    },
    {
      number: "02",
      title: "Get Shortlisted",
      summary: "Applications reviewed for onsite cohort.",
      detail:
        "Proposed selection for the projected 100–120 onsite builders in Ahmedabad. Final criteria will be published before applications open.",
      status: "proposed",
    },
    {
      number: "03",
      title: "Form Your Team",
      summary: "Assemble engineers, designers, and thinkers.",
      detail:
        "Collaborate with peers or match with fellow shortlisted builders once team formation guidelines are announced.",
      status: "proposed",
    },
    {
      number: "04",
      title: "Build",
      summary: "Architect, prototype, and ship under pressure.",
      detail:
        "Intensive onsite building sprint supported by technical mentors, workshops, and focused engineering time.",
      status: "proposed",
    },
    {
      number: "05",
      title: "Present",
      summary: "Demonstrate working software and hardware.",
      detail:
        "Pitch functional prototypes and technical architecture directly to reviewers and domain practitioners.",
      status: "proposed",
    },
    {
      number: "06",
      title: "Showcase Your Innovation",
      summary: "Take the stage and launch beyond the weekend.",
      detail:
        "Top projects present at the closing showcase in front of peers, community leaders, and industry partners.",
      status: "proposed",
    },
  ] satisfies JourneyStep[],
  schedule: {
    isFinalized: false,
    announcementNote:
      "The multi-day agenda—including opening ceremony, hacking sprints, mentoring blocks, project submissions, judging, and awards—will be published once dates and venue are confirmed.",
    supportedCategories: [
      "Opening Ceremony",
      "Hacking Sessions",
      "Mentoring",
      "Project Submissions",
      "Judging",
      "Awards",
    ],
    days: [] as ScheduleDay[],
  },
  sponsorship: {
    isFinalized: false,
    tiers: [
      {
        id: "title",
        tierName: "Title Partner",
        description:
          "Lead association with AmdavadHacks 2027, keynote presence, and flagship brand integration across digital and onsite touchpoints.",
        sponsors: [],
      },
      {
        id: "technology",
        tierName: "Technology Partners",
        description:
          "Empower builders with APIs, cloud credits, developer tooling, dedicated technical tracks, and engineering mentorship.",
        sponsors: [],
      },
      {
        id: "community",
        tierName: "Community Partners",
        description:
          "Student clubs, developer collectives, and regional innovation networks amplifying builder outreach across campuses.",
        sponsors: [],
      },
      {
        id: "food-hospitality",
        tierName: "Food & Hospitality Partners",
        description:
          "Fueling late-night sprints and keeping onsite participants energized throughout the hackathon.",
        sponsors: [],
      },
      {
        id: "merchandise",
        tierName: "Merchandise Partners",
        description:
          "Crafting memorable, design-forward apparel and hardware kits bearing the AmdavadHacks identity.",
        sponsors: [],
      },
    ] satisfies SponsorTier[],
  },
  organizers: {
    isFinalized: false,
    note: "The official AmdavadHacks 2027 organizing council and advisory roster will be published here once confirmed.",
    members: [] as OrganizerMember[],
  },
  faqs: [
    {
      id: "eligibility",
      topic: "Eligibility",
      question: "Who is eligible to participate in AmdavadHacks 2027?",
      answer:
        "AmdavadHacks 2027 is designed for student developers, designers, innovators, and aspiring entrepreneurs. Exact academic eligibility criteria and age-consent requirements are awaiting final organizer announcement.",
      confirmed: false,
    },
    {
      id: "registration",
      topic: "Registration",
      question: "How does registration work right now?",
      answer:
        "Full registration is not open yet. You can currently submit the Register Interest form to be notified first when official applications, team creation, and participant dashboards go live.",
      confirmed: true,
    },
    {
      id: "team-size",
      topic: "Team Size",
      question: "What is the allowed team size?",
      answer:
        "Team size limits and rules for solo or team applications are awaiting announcement and will be published before official registration opens.",
      confirmed: false,
    },
    {
      id: "location",
      topic: "Event Location",
      question: "Where will AmdavadHacks 2027 take place?",
      answer:
        "The event will be hosted in Ahmedabad, Gujarat, India within the tentative March–May 2027 window. The exact venue is awaiting confirmation.",
      confirmed: false,
    },
    {
      id: "fees",
      topic: "Registration Fees",
      question: "Is there a registration fee?",
      answer:
        "Registration fee details are not finalized yet. No payments are collected at this stage; pricing and any applicable policies will be announced officially prior to registration.",
      confirmed: false,
    },
    {
      id: "food",
      topic: "Food Arrangements",
      question: "Will food and refreshments be provided onsite?",
      answer:
        "Onsite catering and hospitality arrangements are awaiting confirmation alongside venue and partner finalization.",
      confirmed: false,
    },
    {
      id: "experience",
      topic: "Required Experience",
      question: "Do I need prior hackathon experience to apply?",
      answer:
        "AmdavadHacks welcomes both seasoned builders and ambitious first-time student hackers. Specific evaluation rubrics and track expectations will be shared when applications open.",
      confirmed: false,
    },
    {
      id: "submission",
      topic: "Project Submission",
      question: "How will projects be submitted and judged?",
      answer:
        "Projects will be built during the event and submitted through the official submission workflow (to be enabled on the platform). Exact submission rules and judging rubrics are awaiting announcement.",
      confirmed: false,
    },
    {
      id: "shortlisting",
      topic: "Shortlisting Process",
      question: "How does the shortlisting process work?",
      answer:
        "Because onsite capacity is projected at 100–120 participants out of 300–400 projected registrations, applications will go through a shortlisting review. Detailed selection criteria are awaiting announcement.",
      confirmed: false,
    },
  ] satisfies FaqItem[],
} as const;
