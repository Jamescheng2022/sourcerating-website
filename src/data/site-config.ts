export const siteConfig = {
  name: "Source Rating",
  tagline: "China Supplier Verification for Engineering & Construction Materials",
  domain: "www.sourcerating.com",
  url: "https://www.sourcerating.com",
  description:
    "China-based supplier verification, factory audits, inspection, and sourcing support for engineering, construction materials, precast concrete, and steel structure buyers.",
  author: "Source Rating",
  locale: "en_US",
  contact: { email: "contact@sourcerating.com", wechat: "SourceRating" },
  social: { linkedin: "https://linkedin.com/company/sourcerating" },
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/pricing" },
    { label: "Industries", href: "/industries" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footer: {
    tagline:
      "Engineering-focused supplier verification, factory audits, and project procurement support in China.",
    quickLinks: [
      { label: "Services", href: "/services" },
      { label: "Pricing", href: "/pricing" },
      { label: "Industries", href: "/industries" },
      { label: "Case Studies", href: "/case-studies" },
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
