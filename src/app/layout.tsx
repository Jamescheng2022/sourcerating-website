import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { generateOrganizationSchema } from "@/lib/metadata";
import { siteConfig } from "@/data/site-config";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: `${siteConfig.tagline} | ${siteConfig.name}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  keywords: ["China engineering supplier verification","China construction materials sourcing","precast concrete supplier China","steel structure factory audit China","construction materials inspection China","China factory audit engineering","project procurement China"],
  authors: [{ name: siteConfig.author }],
  robots: { index: true, follow: true },
  openGraph: { type: "website", locale: siteConfig.locale, url: siteConfig.url, siteName: siteConfig.name, title: `${siteConfig.tagline} | ${siteConfig.name}`, description: siteConfig.description, images: [{ url: "/images/hero-factory-audit.png", width: 1600, height: 900, alt: siteConfig.name }] },
  twitter: { card: "summary_large_image", title: `${siteConfig.tagline} | ${siteConfig.name}`, description: siteConfig.description, images: ["/images/hero-factory-audit.png"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/brand/source-rating-mark.svg" type="image/svg+xml" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganizationSchema()) }} />
      </head>
      <body className="font-sans antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
