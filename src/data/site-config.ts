export const siteConfig = {
  name: "Source Rating",
  tagline: "Engineering Supplier Verification & Procurement Support",
  domain: "www.sourcerating.com",
  url: "https://www.sourcerating.com",
  description:
    "Thailand-based buyer-side supplier verification, factory audits, inspection, and engineering procurement support across China, Vietnam, and Southeast Asia.",
  author: "James Cheng / Source Rating",
  locale: "en_US",
  contact: { email: "contact@sourcerating.com", wechat: "SourceRating" },
  social: { linkedin: "https://www.linkedin.com/in/hcrdi" },
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
      "Buyer-side supplier verification, factory audits, and engineering procurement support across China, Vietnam, and Southeast Asia.",
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
