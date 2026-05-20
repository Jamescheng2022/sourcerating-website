import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { generateOrganizationSchema } from "@/lib/metadata";
import { siteConfig } from "@/data/site-config";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: { default: `${siteConfig.tagline} | ${siteConfig.name}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  keywords: ["China factory inspection","China factory audit","supplier verification China","China sourcing agent","factory quality control China","production monitoring China","China supply chain","industrial sourcing China"],
  authors: [{ name: siteConfig.author }],
  robots: { index: true, follow: true },
  openGraph: { type: "website", locale: siteConfig.locale, url: siteConfig.url, siteName: siteConfig.name, title: `${siteConfig.tagline} | ${siteConfig.name}`, description: siteConfig.description, images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: siteConfig.name }] },
  twitter: { card: "summary_large_image", title: `${siteConfig.tagline} | ${siteConfig.name}`, description: siteConfig.description, images: ["/images/og-default.jpg"] },
  alternates: { canonical: siteConfig.url },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganizationSchema()) }} />
      </head>
      <body className="font-sans antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
