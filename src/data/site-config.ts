export const siteConfig = {
  name: "Source Rating",
  tagline: "China Supplier Verification for Construction Buyers",
  domain: "www.sourcerating.com",
  url: "https://www.sourcerating.com",
  description:
    "China-based supplier verification, factory audits, inspection, and sourcing support for construction materials, equipment, and project components.",
  author: "Source Rating",
  locale: "en_US",
  contact: { email: "contact@sourcerating.com", wechat: "SourceRating" },
  social: { linkedin: "" },
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/pricing" },
    { label: "Playbook", href: "/playbook" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footer: {
    tagline:
      "Construction-focused supplier verification, factory audits, and project procurement support in China.",
    quickLinks: [
      { label: "Services", href: "/services" },
      { label: "Pricing", href: "/pricing" },
      { label: "Playbook", href: "/playbook" },
      { label: "Industries", href: "/industries" },
      { label: "Case Studies", href: "/case-studies" },
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
