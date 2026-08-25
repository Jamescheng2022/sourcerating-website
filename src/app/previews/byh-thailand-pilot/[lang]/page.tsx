import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ByhPilotSite } from "../ByhPilotSite";
import type { PilotLanguage } from "@/data/byh-pilot";

const languages: PilotLanguage[] = ["th", "en", "zh"];

export const dynamicParams = false;

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const title = lang === "th"
    ? "BYH ประเทศไทย · การผลิตความแม่นยำ"
    : lang === "zh"
      ? "BYH 泰国 · 精密制造"
      : "BYH Thailand · Precision Manufacturing";
  return {
    title: { absolute: title },
    description: "Independent evidence-bound manufacturing website pilot for BYH New Technology Thailand.",
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description: "Independent evidence-bound manufacturing website pilot for BYH New Technology Thailand.",
      siteName: "BYH Thailand Digital Pilot",
      images: [],
    },
    twitter: {
      card: "summary",
      title,
      description: "Independent evidence-bound manufacturing website pilot for BYH New Technology Thailand.",
      images: [],
    },
    alternates: {
      languages: {
        "th-TH": "/previews/byh-thailand-pilot/th",
        "en": "/previews/byh-thailand-pilot/en",
        "zh-CN": "/previews/byh-thailand-pilot/zh",
      },
    },
  };
}

export default async function ByhPilotLanguagePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!languages.includes(lang as PilotLanguage)) notFound();
  return <ByhPilotSite lang={lang as PilotLanguage} />;
}
