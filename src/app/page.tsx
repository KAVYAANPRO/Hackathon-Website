import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TracksSection } from "@/components/sections/TracksSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { ScheduleSection } from "@/components/sections/ScheduleSection";
import { SponsorsSection } from "@/components/sections/SponsorsSection";
import { OrganizersSection } from "@/components/sections/OrganizersSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinaleSection } from "@/components/sections/FinaleSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <TracksSection />
      <JourneySection />
      <ScheduleSection />
      <SponsorsSection />
      <OrganizersSection />
      <FaqSection />
      <FinaleSection />
    </>
  );
}
