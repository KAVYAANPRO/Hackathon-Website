import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { eventConfig } from "@/config/event";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { BootSequence } from "@/components/BootSequence";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://amdavadhacks.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${eventConfig.brand.edition} — ${eventConfig.brand.primaryTagline}`,
    template: `%s | ${eventConfig.brand.edition}`,
  },
  description:
    "AmdavadHacks 2027 is Ahmedabad's flagship student hackathon & technology festival. Engineer the Impossible. Tentative window: March–May 2027.",
  keywords: [
    "AmdavadHacks",
    "AmdavadHacks 2027",
    "Ahmedabad Hackathon",
    "Student Hackathon India",
    "Gujarat Tech Festival",
    "Engineer the Impossible",
  ],
  authors: [{ name: "AmdavadHacks Organizers" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: eventConfig.brand.edition,
    title: `${eventConfig.brand.edition} — ${eventConfig.brand.primaryTagline}`,
    description:
      "A new generation of builders. One ambitious gathering in Ahmedabad, Gujarat. Register interest for AmdavadHacks 2027.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${eventConfig.brand.edition} — ${eventConfig.brand.primaryTagline}`,
    description:
      "The City Builds. The Future Follows. Register interest for AmdavadHacks 2027.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#070709",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#070709] text-[#F5F5F5] selection:bg-[#FF5C00]/30">
        <a
          href="#main-content"
          className="visually-hidden fixed top-4 left-4 z-[100] bg-[#FF5C00] px-4 py-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#070709]"
        >
          Skip to main content
        </a>
        <BootSequence />
        <SmoothScrollProvider>
          <Navbar />
          <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
