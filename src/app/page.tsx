import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { BuyerPainPoints } from "@/components/home/BuyerPainPoints";
import { ValueProps } from "@/components/home/ValueProps";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { WhyChooseMe } from "@/components/home/WhyChooseMe";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { Deliverables } from "@/components/home/Deliverables";
import { Workflow } from "@/components/home/Workflow";
import { PricingGuidance } from "@/components/home/PricingGuidance";
import { CTASection } from "@/components/home/CTASection";
import { HomeFAQ } from "@/components/home/HomeFAQ";

export const metadata: Metadata = {
  title: "China Supplier Verification for Engineering & Construction Materials",
  description:
    "China-based supplier verification, factory audits, inspection, and sourcing support for precast concrete, steel structures, construction materials, MEP components, and engineering equipment.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <BuyerPainPoints />
      <ServicesGrid />
      <IndustriesSection />
      <Deliverables />
      <Workflow />
      <PricingGuidance />
      <ValueProps />
      <WhyChooseMe />
      <CTASection />
      <HomeFAQ />
    </>
  );
}
