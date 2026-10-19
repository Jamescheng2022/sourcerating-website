export const siteConfig = {
  name: "Source Rating",
  tagline: "Industrial Sourcing Research & Field Notes",
  domain: "www.sourcerating.com",
  url: "https://www.sourcerating.com",
  description:
    "Original industrial sourcing articles, technical context and buyer field notes, alongside supplier verification and procurement support.",
  author: "James Cheng",
  locale: "en_US",
  contact: { email: "contact@sourcerating.com", wechat: "SourceRating" },
  social: { linkedin: "https://www.linkedin.com/in/hcrdi" },
  nav: [
    { label: "Articles", href: "/blog" },
    { label: "Buyer Guides", href: "/buyer-decisions" },
    { label: "Membership", href: "/membership" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footer: {
    tagline:
      "Industrial sourcing, in context. Original articles and practical questions for the people behind a purchase.",
    quickLinks: [
      { label: "Articles", href: "/blog" },
      { label: "Membership", href: "/membership" },
      { label: "Services", href: "/services" },
      { label: "Buyer Guides", href: "/buyer-decisions" },
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
