import { Hero } from "@/components/marketing/Hero";
import { IntroStatement } from "@/components/marketing/IntroStatement";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { CapabilitiesGrid } from "@/components/marketing/CapabilitiesGrid";
import { DataAccuracy } from "@/components/marketing/DataAccuracy";
import { IndustryTabs } from "@/components/marketing/IndustryTabs";
import { CaseStudies } from "@/components/marketing/CaseStudies";
import { FooterCTA } from "@/components/marketing/FooterCTA";
import { Footer } from "@/components/marketing/Footer";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <IntroStatement />
      <HowItWorks />
      <CapabilitiesGrid />
      <DataAccuracy />
      <IndustryTabs />
      <CaseStudies />
      <FooterCTA />
      <Footer />
    </>
  );
}
