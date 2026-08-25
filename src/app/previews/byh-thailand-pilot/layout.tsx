import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./isolation.css";

const title = "BYH New Technology Thailand · Digital Pilot";
const description =
  "Independent multilingual manufacturing website and employee AI pilot prepared for BYH New Technology Thailand.";

export const metadata: Metadata = {
  title: { default: title, template: "%s" },
  description,
  robots: { index: false, follow: false, nocache: true },
  icons: { icon: "/images/byh-pilot/byh-pilot-mark.svg" },
  openGraph: {
    type: "website",
    title,
    description,
    siteName: "BYH Thailand Digital Pilot",
    images: [],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: [],
  },
};

export default function ByhPilotLayout({ children }: { children: ReactNode }) {
  return <div className="byh-preview-boundary">{children}</div>;
}
