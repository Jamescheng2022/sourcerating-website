import { Metadata } from "next";
import { siteConfig } from "@/data/site-config";

interface PageMetadata {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
  keywords?: string[];
}

export function generatePageMetadata({
  title,
  description,
  path,
  ogImage = "/images/hero-factory-audit.png",
  noIndex = false,
  keywords,
}: PageMetadata): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle = `${title} | ${siteConfig.name}`;

  return {
    title: { absolute: fullTitle },
    description,
    keywords,
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
  const organizationId = `${siteConfig.url}/#organization`;
  const serviceId = `${siteConfig.url}/#professional-service`;
  const personId = `${siteConfig.url}/about#james-cheng`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/brand/source-rating-logo.svg`,
        description: siteConfig.description,
        founder: { "@id": personId },
        contactPoint: {
          "@type": "ContactPoint",
          email: siteConfig.contact.email,
          contactType: "sales",
          availableLanguage: ["English", "Chinese"],
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": serviceId,
        name: siteConfig.name,
        url: siteConfig.url,
        parentOrganization: { "@id": organizationId },
        image: `${siteConfig.url}/images/hero-factory-audit.png`,
        description: siteConfig.description,
        areaServed: ["China", "Vietnam", "Southeast Asia"],
        serviceType: [
          "Engineering supplier verification",
          "Construction materials factory audit",
          "Technical supplier review",
          "Pre-shipment inspection",
          "Production monitoring",
          "Buyer-side engineering procurement support",
          "Free supplier risk screen",
        ],
        address: { "@type": "PostalAddress", addressCountry: "TH" },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: "James Cheng",
        url: `${siteConfig.url}/about`,
        sameAs: [siteConfig.social.linkedin],
        worksFor: { "@id": organizationId },
      },
    ],
  };
}
