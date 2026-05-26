import { Metadata } from "next";
import { siteConfig } from "@/data/site-config";

interface PageMetadata {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  path,
  ogImage = "/images/og-default.jpg",
  noIndex = false,
}: PageMetadata): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle =
    path === "/"
      ? `${title} - ${siteConfig.tagline}`
      : `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.contact.email,
      contactType: "sales",
      availableLanguage: ["English", "Chinese"],
    },
    areaServed: ["Europe", "North America", "Australia", "United Kingdom"],
    serviceType: [
      "Engineering supplier verification",
      "Construction materials factory audit",
      "Pre-shipment inspection",
      "Production monitoring",
      "China engineering sourcing support",
    ],
    address: { "@type": "PostalAddress", addressCountry: "CN" },
  };
}
