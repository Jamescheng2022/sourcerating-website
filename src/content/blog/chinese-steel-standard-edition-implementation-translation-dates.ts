import type { BlogPost } from "@/content/blog/legacy-posts";

export const chineseSteelStandardDatesPost: BlogPost = {
  slug: "chinese-steel-standard-edition-implementation-translation-dates",
  title: "Three Dates Behind a Chinese Steel Standard",
  seoTitle: "Chinese Steel Standards: Edition, Implementation and Translation Dates",
  excerpt:
    "A worked reading of official Chinese standards records shows why an edition year, an implementation date and an English-publication date describe different things.",
  date: "2026-10-16",
  category: "Standards reference",
  readTime: "4 min read",
  sections: [],
  articleBody: [
    {
      type: "paragraph",
      text: "A Chinese steel-standard reference can carry several dates without referring to several different technical editions. An official record may identify when a standard was issued, when it took effect and when a foreign-language edition was announced. Keeping those fields separate makes the original record easier to understand.",
    },
    {
      type: "heading",
      text: "One designation, three dates",
    },
    {
      type: "paragraph",
      text: "As checked on 16 October 2026, SAMR lists GB/T 1591-2018 as current. Its issue date is 14 May 2018 and its implementation date is 1 February 2019. The record says it fully replaced GB/T 1591-2008. Separately, the SAMR/SAC announcement dated 30 October 2024 includes an English edition of GB/T 1591-2018 among 79 foreign-language editions.",
    },
    {
      type: "table",
      headers: ["Record field", "Date", "What the date describes"],
      rows: [
        ["Issue date", "14 May 2018", "Publication of the numbered standard"],
        [
          "Implementation date",
          "1 February 2019",
          "The implementation date stated in its official record",
        ],
        [
          "English-edition announcement",
          "30 October 2024",
          "A foreign-language publication announcement for the 2018 designation",
        ],
      ],
    },
    {
      type: "paragraph",
      text: "The 2024 announcement is therefore not, by itself, evidence of a new technical edition called GB/T 1591-2024. That distinction comes from reading the designation alongside the record type, rather than treating every date as a revision date.",
    },
    {
      type: "heading",
      text: "An older year does not automatically mean obsolete",
    },
    {
      type: "paragraph",
      text: "The same official portal lists GB/T 700-2006, Carbon structural steels, as current at this check. Its issue date is 1 November 2006 and its implementation date is 1 February 2007. In contrast, the GB/T 1591 record explicitly identifies the 2008 edition as replaced. An edition's age and its published status are different pieces of information.",
    },
    {
      type: "paragraph",
      text: "The GB/T 700 portal page also explains that online text reading is unavailable there because the standard adopts international or foreign standards and copyright is involved. A missing full-text view is not, on its own, evidence that the standard is invalid or withdrawn.",
    },
    {
      type: "heading",
      text: "A revision plan is another kind of record",
    },
    {
      type: "paragraph",
      text: "SAMR's plan 20251169-T-605 concerns structural steels, Part 3, and identifies GB/T 34560.3-2018 as the standard being revised. Assigned on 30 April 2025, the plan was displayed as undergoing approval at this check. Its proposed implementation interval of six months after publication is not an established calendar implementation date. This article does not assert that the plan has already replaced any published standard.",
    },
    {
      type: "heading",
      text: "What this catalogue does not cover",
    },
    {
      type: "paragraph",
      text: "The national full-text portal states that food-safety, environmental-protection and engineering-construction national standards fall outside this system. It directs readers to the relevant authorities. A material-standard search here is therefore not a complete search of building-code requirements.",
    },
    {
      type: "paragraph",
      text: "These public records describe standards and publication status. They do not establish a particular supplier's capacity, a batch's conformity, equivalence with another grade, destination-market acceptance or the requirements of a contract. No technical clauses, mechanical-property tables or standards text have been reproduced here. The original records remain available through the references below; status should be checked again when used.",
    },
  ],
  referencesHeading: "Official records and source scope",
  referencesIntro:
    "Records checked on 16 October 2026. Bibliographic facts are paraphrased; full standards and translations are not reproduced.",
  references: [
    {
      title: "GB/T 1591-2018 — official standard record",
      publisher: "SAMR",
      href: "https://std.samr.gov.cn/gb/search/gbDetailed?id=71F772D82AFFD3A7E05397BE0A0AB82A",
      note: "Current status, issue and implementation dates, and replacement relationship observed 16 October 2026.",
    },
    {
      title: "GB/T 1591-2018 — full-text portal metadata",
      publisher: "SAMR",
      href: "https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=D03B384873BCBA464E179A11EE14A89E",
      note: "Metadata corroboration within the same official system, not a separate independent source.",
    },
    {
      title: "2024 Announcement No. 27 — foreign-language editions",
      publisher: "SAMR / SAC",
      href: "https://std.sacinfo.org.cn/gnoc/queryInfo?id=20E21C6C50EDDF9A138AD3276B6B5B67",
      note: "English-edition announcement dated 30 October 2024.",
    },
    {
      title: "GB/T 700-2006 — official record",
      publisher: "SAMR",
      href: "https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=728DD12CB05533A5AE309BF47E6CBAA0",
      note: "Current status and copyright-related limitation on full-text access.",
    },
    {
      title: "National standards portal — coverage statement",
      publisher: "SAMR",
      href: "https://openstd.samr.gov.cn/bzgk/std/std_list",
      note: "System exclusions and disclosure limitations.",
    },
    {
      title: "Revision plan 20251169-T-605",
      publisher: "SAMR",
      href: "https://std.samr.gov.cn/gb/search/gbDetailed?id=349607024FE33C1DE06397BE0A0AA1D6",
      note: "Approval-stage plan; not a published replacement standard.",
    },
  ],
};
