import type { Metadata } from "next";
import { EmployeeAssistant } from "./EmployeeAssistant";

export const metadata: Metadata = { title: "BYH Works · Employee AI Pilot", robots: { index: false, follow: false } };

export default function EmployeeAssistantPage() {
  return <EmployeeAssistant />;
}
