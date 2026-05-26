import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { BuyerPainPoints } from "@/components/home/BuyerPainPoints";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { Deliverables } from "@/components/home/Deliverables";
import { PricingGuidance } from "@/components/home/PricingGuidance";
import { CTASection } from "@/components/home/CTASection";

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
      <Deliverables />
      <PricingGuidance />
      <CTASection />
    </>
  );
}
