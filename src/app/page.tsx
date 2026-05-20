import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { WhyChooseMe } from "@/components/home/WhyChooseMe";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { Workflow } from "@/components/home/Workflow";
import { CTASection } from "@/components/home/CTASection";
import { HomeFAQ } from "@/components/home/HomeFAQ";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <ServicesGrid />
      <WhyChooseMe />
      <IndustriesSection />
      <Workflow />
      <CTASection />
      <HomeFAQ />
    </>
  );
}
