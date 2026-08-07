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
    founder: {
      "@type": "Person",
      name: "James Cheng",
      url: siteConfig.social.linkedin,
    },
    ...(sameAs ? { sameAs } : {}),
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.contact.email,
      contactType: "sales",
      availableLanguage: ["English", "Chinese"],
    },
    areaServed: [
      "China",
      "Vietnam",
      "Southeast Asia",
      "Europe",
      "North America",
      "Middle East",
      "Australia",
      "United Kingdom",
    ],
    serviceType: [
      "Engineering supplier verification",
      "Construction materials factory audit",
      "Technical supplier review",
      "Pre-shipment inspection",
      "Production monitoring",
      "Buyer-side engineering procurement support",
      "Supplier sourcing across China, Vietnam, and Southeast Asia",
      "Free supplier risk screen",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Engineering supplier verification and procurement services",
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
          name: "Engineering supplier background check",
          description: "Desk-based verification for an engineering or construction supplier.",
          price: "300",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "Factory verification visit",
          description: "On-site supplier verification before deposit, supplier approval, or a major procurement decision.",
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "USD",
            minPrice: 600,
          },
        },
      ],
    },
    address: { "@type": "PostalAddress", addressCountry: "TH" },
  };
}
