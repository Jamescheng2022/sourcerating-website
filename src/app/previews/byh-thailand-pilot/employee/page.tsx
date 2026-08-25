import type { Metadata } from "next";
import { EmployeeAssistant } from "./EmployeeAssistant";

export const metadata: Metadata = {
  title: { absolute: "BYH Works · Thailand Employee AI Pilot" },
  description: "Private multilingual employee knowledge assistant concept for BYH Thailand.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "BYH Works · Thailand Employee AI Pilot",
    description: "Private multilingual employee knowledge assistant concept for BYH Thailand.",
    siteName: "BYH Thailand Digital Pilot",
    images: [],
  },
};

export default function EmployeeAssistantPage() {
  return <EmployeeAssistant />;
}
