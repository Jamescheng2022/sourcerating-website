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
  const sameAs = siteConfig.social.linkedin ? [siteConfig.social.linkedin] : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/source-rating-logo.svg`,
    image: `${siteConfig.url}/images/hero-factory-audit.png`,
    description: siteConfig.description,
    ...(sameAs ? { sameAs } : {}),
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
      "Free supplier risk screen",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Engineering supplier verification services",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Free first-pass supplier risk screen",
          description: "Desk-based initial risk screen for one engineering supplier during launch.",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "Factory verification visit",
          description: "On-site supplier verification visit in China before deposit or supplier approval.",
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "USD",
            minPrice: 600,
          },
        },
      ],
    },
    address: { "@type": "PostalAddress", addressCountry: "CN" },
  };
}
