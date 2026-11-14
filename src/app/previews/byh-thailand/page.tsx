import type { Metadata } from "next";
import { ByhSite } from "./ByhSite";

export const metadata: Metadata = {
  title: "BYH New Technology Thailand · Independent Concept Preview",
  description: "Independent trilingual manufacturing website concept for BYH New Technology Thailand.",
  robots: { index: false, follow: false, nocache: true },
};

export default function ByhPreviewHome() { return <ByhSite page="home"/>; }
