export const siteConfig = {
  name: "Source Rating",
  tagline: "China Factory Inspection & Industrial Sourcing",
  domain: "www.sourcerating.com",
  url: "https://www.sourcerating.com",
  description:
    "Independent, on-the-ground factory inspection, supplier verification, and industrial sourcing services in China. Helping overseas clients reduce risk and ensure quality.",
  author: "Source Rating",
  locale: "en_US",
  contact: { email: "contact@sourcerating.com", wechat: "SourceRating" },
  social: { linkedin: "https://linkedin.com/company/sourcerating" },
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Industries", href: "/industries" },
    { label: "Case Studies", href: "/case-studies" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
  ],
  footer: {
    tagline:
      "Independent on-site factory verification, production inspection, and supplier due diligence in China.",
    quickLinks: [
      { label: "Services", href: "/services" },
      { label: "Industries", href: "/industries" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
} as const;
