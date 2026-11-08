import type { BlogPost } from "@/data/blog";

export const maerskAsiaMiddleEastPssPost: BlogPost = {
  slug: "maersk-asia-middle-east-peak-season-surcharge-buyer-guide",
  title: "Maersk Added a $2,000 Peak Surcharge to the Gulf. Who Pays When the Ship Slips?",
  seoTitle: "Maersk Asia–Middle East Peak Surcharge: Buyer Freight Cost Guide",
  excerpt:
    "When carriers revise peak season surcharges across Asia–Gulf lanes, the difference between a planned booking date and the actual Price Calculation Date can add thousands of dollars per container. Here is how buyers protect their freight budgets.",
  date: "2026-11-08",
  category: "Packaging & Logistics",
  layout: "editorial",
  readTime: "5 min read",
  sections: [],
  coverImage: {
    src: "/images/blog/maersk-pss-vessel-cover-desktop.jpg",
    mobileSrc: "/images/blog/maersk-pss-vessel-cover-mobile.jpg",
    width: 1200,
    height: 800,
    mobileWidth: 800,
    mobileHeight: 533,
    alt: "The container ship Columbine Maersk underway at sea with full container stacks",
    caption:
      "Container vessel Columbine Maersk underway at sea. Photo: Bo Randstedt / [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Columbine_maersk.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/); cropped and resized. Illustrative shipping scene, not a specific carrier booking or cargo inspection.",
  },
  articleBody: [
    {
      type: "paragraph",
      text: "**A sudden freight surcharge announcement does not just raise container rates; it exposes whether your purchase contract clearly allocates ocean risk.** When a major ocean carrier adds $1,000 for a 20-foot box and $2,000 for a 40-foot box on shipments from Asia to the Middle East, the commercial dispute is rarely about whether the fee is real. The dispute is almost always about whose account pays when sailing dates slip across the effective date.",
    },
    {
      type: "paragraph",
      text: "On 4 November 2026, A.P. Moller – Maersk issued an advisory revising its Peak Season Surcharge (PSS) for cargo moving from Far East Asia to the Persian Gulf. For project buyers importing structural steel, mechanical equipment, building materials, and bulk components, an unbudgeted $2,000 fee per container across a 20-box shipment amounts to a $40,000 variance. If your team has not established the operational cutoff rules, that variance lands on the delivery desk as an emergency invoice.",
    },
    {
      type: "heading",
      text: "The November 2026 tariff schedule and destination scope",
    },
    {
      type: "paragraph",
      text: "The surcharge applies across all container equipment categories, including standard dry containers, high cubes, flat racks, open tops, and reefers. The tariff structure applies staggered effective dates depending on the origin country, while destination coverage focuses strictly on the Arabian Gulf.",
    },
    {
      type: "table",
      headers: [
        "Origin Scope",
        "Destination Scope",
        "Effective Date",
        "20' Container",
        "40' & 45' Container",
      ],
      rows: [
        [
          "China, HK, Taiwan, Macau, Japan, Southeast Asia",
          "UAE, Bahrain, Kuwait, Qatar, Dammam (Saudi Arabia)",
          "16 Nov 2026",
          "USD 1,000",
          "USD 2,000",
        ],
        [
          "Vietnam",
          "UAE, Bahrain, Kuwait, Qatar, Dammam (Saudi Arabia)",
          "19 Nov 2026",
          "USD 1,000",
          "USD 2,000",
        ],
        [
          "South Korea",
          "UAE, Bahrain, Kuwait, Qatar, Dammam (Saudi Arabia)",
          "22 Nov 2026",
          "USD 1,000",
          "USD 2,000",
        ],
      ],
    },
    {
      type: "paragraph",
      text: "Two geographic details deserve close scrutiny. First, the destination scope includes Dammam on Saudi Arabia's Gulf coast, but not Red Sea ports such as Jeddah. Second, the Asian origins span both major export manufacturing bases (China, Taiwan, South Korea, Vietnam) and Southeast Asian transshipment hubs (Singapore, Malaysia).",
    },
    {
      type: "illustration",
      src: "/images/blog/maersk-pss-jebel-ali-terminal-desktop.jpg",
      mobileSrc: "/images/blog/maersk-pss-jebel-ali-terminal-mobile.jpg",
      width: 960,
      height: 720,
      mobileWidth: 640,
      mobileHeight: 800,
      alt: "Container cranes and quayside container-handling operations at Port Jebel Ali in Dubai",
      caption:
        "Port Jebel Ali container terminal No. 2 in Dubai, United Arab Emirates. Photo: Bjoertvedt / [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Jebel_Ali_Free_Zone_08.jpg), [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/); cropped and resized. Illustrative port scene, not an individual delivery record.",
    },
    {
      type: "heading",
      text: "The date rule that catches buyers off guard",
    },
    {
      type: "paragraph",
      text: "When a surcharge is announced with an effective date of 16 November, buyers often assume that any cargo gated in or booked before that date is immune. In container liner shipping, that assumption is frequently incorrect.",
    },
    {
      type: "paragraph",
      text: "For non-SPOT bookings in non-FMC regulated trades such as the Asia-to-Middle East corridor, the surcharge rate is retrieved according to the carrier's **Price Calculation Date (PCD)**. Maersk defines PCD for these trades as the scheduled departure date of the first water leg at the time of booking confirmation. For FMC-regulated corridors, PCD typically defaults to the last container gate-in date.",
    },
    {
      type: "paragraph",
      text: "Consider the practical implication: if a supplier books a container with an estimated departure date of 14 November, but port congestion, missing documentation, or blank sailings cause the carrier to reschedule the departure to 17 November, the rate engine re-evaluates the tariff at the revised PCD. The $2,000 surcharge per box attaches automatically to the final freight manifest.",
    },
    {
      type: "heading",
      text: "Incoterms and the CFR supplier handover trap",
    },
    {
      type: "paragraph",
      text: "Under FOB terms, the overseas buyer contracts the freight forwarder and holds direct visibility into carrier booking notes, PCD triggers, and surcharge updates. The buyer absorbs the freight movement, but at least controls the booking timing and can negotiate or reroute before departure.",
    },
    {
      type: "paragraph",
      text: "Under CFR or CIF terms, however, the Asian supplier arranges and prepays the ocean freight. When a $2,000 per container surcharge appears on the carrier's booking note, suppliers frequently react in one of three problematic ways:",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "**The surprise debit note:** The supplier ships the goods without advance warning, then presents an invoice for the surcharge alongside shipping documents, demanding payment before releasing the original bill of lading or telex release.",
        "**Unilateral cargo holding:** The supplier delays gating in the container to avoid paying the surcharge upfront, causing project construction deadlines to slip at the destination port.",
        "**Dispute over contract silence:** If the purchase order states a fixed CIF price without an explicit surcharge escalation or risk clause, both parties end up in a legal standstill while terminal storage fees accumulate.",
      ],
    },
    {
      type: "illustration",
      src: "/images/blog/maersk-pss-yangshan-terminal-desktop.jpg",
      mobileSrc: "/images/blog/maersk-pss-yangshan-terminal-mobile.jpg",
      width: 960,
      height: 639,
      mobileWidth: 640,
      mobileHeight: 800,
      alt: "Quayside container cranes and container yard at Yangshan Deepwater Port in Shanghai",
      caption:
        "Yangshan Deepwater Port container terminal in Shanghai, China. Photo: Bruno Corpet / [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Shanghai-Yangshan-Port-Containers2013-01.JPG), [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/); cropped and resized. Illustrative terminal scene, not a specific booking confirmation.",
    },
    {
      type: "heading",
      text: "Four operational rules for November and December bookings",
    },
    {
      type: "paragraph",
      text: "To protect procurement budgets on orders shipping through Gulf ports during peak season, project teams should immediately enforce four administrative verification steps:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "**Inspect the carrier booking confirmation:** Request an unredacted copy of the carrier booking confirmation from the forwarder or supplier. Verify the Price Calculation Date (PCD) recorded in the carrier system, not just the vendor's estimated cargo ready date.",
        "**Verify the equipment type line items:** Confirm whether the booking involves special equipment (open tops, flat racks, or high cubes). Carrier surcharges apply universally across equipment types, but baseline rates for specialized gear fluctuate more steeply.",
        "**Establish explicit surcharge responsibility in writing:** For pending CFR or CIF orders, confirm in an email or contract amendment whether rate adjustments announced post-PO are seller-absorbed or buyer-approved. Do not leave freight surcharges unaddressed until cargo surrender.",
        "**Track the feeder and first water leg departure:** In transshipment bookings moving through regional hubs like Ningbo, Singapore, or Tanjung Pelepas, verify the departure timestamp of the first water leg. Slippage on the feeder leg can alter the tariff applicability on the mother vessel.",
      ],
    },
    {
      type: "paragraph",
      text: "Ocean freight markets reward procedural clarity over optimistic assumptions. By auditing carrier booking confirmations against official surcharge announcements before containers enter the port terminal, procurement teams prevent surprise freight invoices from eroding project margins.",
    },
    {
      type: "paragraph",
      text: "*Editorial caution: The carrier tariff details reflect official public carrier advisories checked as of November 2026. Specific freight rates, surcharge applicability, and service terms depend on individual customer contracts and carrier tariff filings.*",
    },
  ],
  referencesHeading: "Primary sources and verification",
  referencesIntro:
    "Official ocean carrier announcements and freight market index data verified on 8 November 2026. This article provides purchasing and logistics risk analysis, not commercial freight forwarder quotations or legal advice.",
  references: [
    {
      title: "Revision of Peak Season Surcharge (PSS) – Far East Asia to Middle East",
      publisher: "A.P. Moller - Maersk",
      href: "https://www.maersk.com/news/articles/2026/11/04/pss-far-east-asia-to-middle-east",
      note: "Published 4 November 2026; verified 8 November 2026. Details revised PSS tariff of USD 1,000/20' and USD 2,000/40' across all container types from Far East origins to UAE, Bahrain, Kuwait, Qatar, and Dammam (Saudi Arabia) with staggered effective dates between 16 and 22 November 2026.",
    },
    {
      title: "Shanghai Containerized Freight Index (SCFI) & China Containerized Freight Index (CCFI)",
      publisher: "Shanghai Shipping Exchange",
      href: "https://www.sse.net.cn/",
      note: "Export container freight index tracking Shanghai to Persian Gulf / Red Sea benchmark rates and market volatility across Middle Eastern maritime lanes.",
    },
    {
      title: "Terms for Maersk Spot and Non-Spot Bookings",
      publisher: "A.P. Moller - Maersk",
      href: "https://terms.maersk.com/terms-spot-booking",
      note: "Carrier terms establishing Price Calculation Date (PCD) rules, freight paying terms, and surcharge application mechanisms for confirmed container bookings.",
    },
  ],
  relatedLinks: [
    {
      title: "The Carrier Supports an eBL. Can Your Buyer Actually Collect the Cargo?",
      href: "/blog/electronic-bill-of-lading-cargo-release-buyer-checklist",
      description: "How to audit electronic bill of lading transfer routes, bank acceptance, and cargo release handovers.",
    },
    {
      title: "The Packing List Adds Up. The Container Weight Still Doesn’t.",
      href: "/blog/packing-list-weight-container-vgm",
      description: "Why verified gross mass requires an unbroken handover chain from packing to stowage.",
    },
  ],
};
