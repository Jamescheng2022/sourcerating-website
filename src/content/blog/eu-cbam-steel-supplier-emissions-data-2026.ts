import type { BlogPost } from "@/data/blog";

export const cbamSteelEmissionsPost: BlogPost = {
  slug: "eu-cbam-steel-supplier-emissions-data-2026",
  title: "Your Steel Supplier Has a CBAM Emissions Number. Can You Actually Use It?",
  seoTitle: "EU CBAM 2026: How Steel Buyers Verify Supplier Emissions Data",
  excerpt: "Before accepting an overseas steel supplier's CBAM figure, match the product scope, producing installation, calculation period and verification route. A carbon number in a quotation is not automatically declarable evidence.",
  date: "2026-11-06",
  category: "Policy & Customs",
  layout: "editorial",
  readTime: "5 min read",
  sections: [],
  coverImage: {
    src: "/images/blog/cbam-20261106-steel-coils.jpg",
    width: 1600,
    height: 1200,
    alt: "Steel coils on rail wagons near Port Kembla; documentary image of an industrial product, not evidence of CBAM compliance.",
    caption: "Finished steel is a physical shipment; CBAM evidence must also identify the relevant producer and emissions route. Photo: JustARandomEditor123 / [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Steel_Coils_at_Port_Kembla.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/); resized for web. Independent location photo, not this article's supplier."
  },
  articleBody: [
    {
      type: "paragraph",
      text: "An EU steel buyer receives two offers for material due to ship in late 2026. One supplier sends a polished carbon-footprint presentation. The other offers a production-site emissions worksheet but cannot yet explain the verification route. Which offer is ready for the buyer's CBAM file? Neither can be judged from the headline number alone."
    },
    {
      type: "paragraph",
      text: "Since 1 January 2026, the EU Carbon Border Adjustment Mechanism (CBAM) has operated under its definitive regime. Selected iron and steel goods are in scope, but coverage depends on the **actual commodity classification**, not the phrase \"steel product\" in the quotation. The first declaration covering 2026 imports is due by **30 September 2027**. Buyers need to establish a data trail now, while the actual producer and shipment records can still be checked."
    },
    {
      type: "paragraph",
      text: "The procurement decision is not whether the supplier has *any* carbon figure. It is whether the importer's responsible team can link an applicable product, a producing installation and an accepted emissions reporting route without inventing missing facts."
    },
    {
      type: "heading",
      text: "Gate one: check the goods before requesting carbon figures"
    },
    {
      type: "paragraph",
      text: "First establish the destination CN classification and the actual form of the goods being imported. The Commission lists iron and steel as a CBAM sector, but that does not make every finished steel-containing article a covered good. The applicable code and product description must be checked against the CBAM rules and current EU tariff schedule. Where classification is uncertain, refer the specific product to the customs broker or appropriate ruling route rather than asking the supplier to choose a convenient code."
    },
    {
      type: "paragraph",
      text: "Separately identify the **authorised CBAM declarant**. For covered goods, the Commission describes a mass-based threshold of **more than 50 tonnes** for the importer or indirect customs representative; the threshold is not an automatic exemption for a particular consignment without checking the relevant annual quantities and rules. Hydrogen and electricity have different treatment, so do not generalise this steel-focused discussion to those sectors."
    },
    {
      type: "paragraph",
      text: "A purchasing department should not promise an importer that the supplier will \"take care of CBAM\" without identifying which EU party carries the declaration and certificate obligations."
    },
    {
      type: "heading",
      text: "Gate two: identify the actual producing installation"
    },
    {
      type: "paragraph",
      text: "\"Made in China,\" \"made in Turkey,\" or \"our group factory\" is not enough. Ask which production installation made the material, who operates it, and how the supplied goods relate to that installation's production and emissions records. A trading company may be the contractual seller without being the industrial operator supplying the emissions data."
    },
    {
      type: "paragraph",
      text: "The Commission's verification guidance is explicit that **CBAM verification applies at the installation level**. A buyer therefore needs the operating entity and installation identification, production pathway relevant to the goods, reporting period, and a credible link from order or batch records to the producer. Depending on the product, that link may run through a mill certificate, heat or cast records, plant delivery notes and the chain of custody. Those documents support traceability; they do not themselves verify carbon emissions."
    },
    {
      type: "illustration",
      src: "/images/blog/cbam-20261106-electric-arc-furnace.jpg",
      width: 1400,
      height: 1050,
      alt: "Operating steelworks electric arc furnace with bright steelmaking operation.",
      caption: "Manufacturing routes matter: this is an actual electric arc furnace in a German steel plant, not the production route of any supplier discussed here. Photo: GMH official / [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Elektrolichtbogen-Ofen_Georgsmarienh%C3%BCtte_GmbH.JPG), [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/); resized for web."
    },
    {
      type: "paragraph",
      text: "This distinction matters for purchased intermediates and more complex supply chains. If a steelmaker's own invoice is the only document, ask whether the calculation includes the relevant input materials and processes under the applicable CBAM methodology. Do not assume that a corporate sustainability score covers the production boundary of the steel actually imported."
    },
    {
      type: "heading",
      text: "Gate three: distinguish marketing carbon figures from declarable emissions"
    },
    {
      type: "paragraph",
      text: "A product EPD, annual ESG report or life-cycle figure may be useful background. Its boundary, functional unit and allocation method can differ from CBAM's methodology. Even a well-prepared EPD is not automatically a CBAM verification report."
    },
    {
      type: "paragraph",
      text: "Ask the supplier's technical team for the method used, unit and reporting period, coverage of relevant production steps and input materials, and which emission values it expects the importer to use. Keep the original calculation version and any assumptions. If the supplier has only a preliminary estimate, label it **provisional** in the cost model and name the person responsible for resolving it."
    },
    {
      type: "paragraph",
      text: "The Commission says an importer may declare using **default emissions values** or **actual verified emissions data**. For actual emissions, an independent verifier accredited by an EU national accreditation body must undertake the verification. A manufacturer's own sign-off, an ordinary laboratory certificate, or an audit of ISO 9001 is not a substitute for the specified CBAM verification process."
    },
    {
      type: "illustration",
      src: "/images/blog/cbam-20261106-integrated-steelworks.jpg",
      width: 1600,
      height: 900,
      alt: "Photograph of an integrated steel plant complex showing production and processing units.",
      caption: "One steelworks can include multiple distinct processing units; CBAM verification is linked to the relevant installation and reporting method. Photo: Skatebiker / [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Saldanha_Steel_works.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/); central production units cropped and resized for web. Archival photo, not a current compliance assessment."
    },
    {
      type: "paragraph",
      text: "The current timetable also matters. The Commission shows operators monitoring and calculating emissions during 2026, with first verification reports being issued from January 2027. A supplier's draft numbers delivered in November 2026 should therefore not be described as if the final 2027 declaration and verification have already happened."
    },
    {
      type: "heading",
      text: "The price risk is real, but a one-line estimate can mislead"
    },
    {
      type: "paragraph",
      text: "The Commission published a Q3 2026 CBAM certificate price of **€82.32** on **5 October 2026**. It reports 2026 prices quarterly and will publish weekly prices from 2027. The Commission also states that certificates will be purchased on the common central platform starting in **February 2027**."
    },
    {
      type: "paragraph",
      text: "That price is **not** a flat duty per tonne of imported steel. It is a certificate price tied to a tonne of CO₂ emissions and the CBAM calculation framework. The quantity of certificates that must ultimately be surrendered, any applicable adjustments and any admissible carbon price already paid in the producing country require their own substantiated calculation."
    },
    {
      type: "paragraph",
      text: "For quotation comparisons, keep the commercial steel price separate from the provisionally modelled carbon exposure. Ask who assumes the risk of missing producer records, corrected emission intensities, changes in applicable quarterly prices and delayed verification. Contract wording should allocate requests, access, corrections and costs explicitly; the Incoterms label alone does not answer those questions."
    },
    {
      type: "heading",
      text: "An actionable evidence request before the purchase order"
    },
    {
      type: "paragraph",
      text: "A buyer's short request can be organised around five items:"
    },
    {
      type: "list",
      ordered: true,
      items: [
        "**Product and scope:** precise specification, destination CN code proposed for broker review, covered product mass and expected import dates.",
        "**Producer identity:** legal operator, facility name and location, actual manufacturing route, and records that connect the goods to that installation.",
        "**Calculation basis:** relevant reporting period, emissions method and boundaries, input materials where required, source data owner and the version of any provisional values.",
        "**Verification route:** whether the importer will rely on defaults or actual verified values; if actual, who will arrange appropriately accredited verification and how the records will become accessible to the declarant.",
        "**Correction procedure:** a named technical contact, deadline for clarification, and a commercial rule for changes that emerge before the 2027 filing."
      ]
    },
    {
      type: "paragraph",
      text: "A supplier that cannot answer every question on day one is not necessarily disqualified. The buyer should identify the unresolved points before comparing carbon-related cost assumptions or accepting a statement that the order is \"CBAM compliant.\" A missing answer is a procurement hold point, not evidence of a particular emission intensity."
    },
    {
      type: "heading",
      text: "Put the information in the same file as the buy decision"
    },
    {
      type: "paragraph",
      text: "Keep the specification, relevant customs-code assessment, importer/declarant identity, supplier offer, producing-installation evidence and emissions-data version together. Update the file when the supplier changes the mill, production route or source records. A visually polished PDF is a weak control if the operations team cannot identify which heat or production facility it describes."
    },
    {
      type: "paragraph",
      text: "Before committing, make one direct decision: **can the responsible EU importer explain what product it is declaring, where its emissions figure came from, and whether it will use a permitted default or properly verified actual value?** If the answer is not yet clear, price the uncertainty explicitly and give the supplier a precise evidence request instead of quietly treating an estimate as compliance."
    },
    {
      type: "paragraph",
      text: "The CBAM obligation belongs to the relevant importer/declarant under EU rules. The purchasing leverage is upstream: make usable manufacturing evidence a contractual deliverable while the supplier can still provide it."
    }
  ],
  referencesHeading: "Source notes",
  referencesIntro: "Primary European Commission guidance checked on 6 November 2026. This article explains publicly documented EU rules and recommended buyer controls; it is not legal, customs, product-classification, or installation-level verification advice. No sample emissions intensity, supplier compliance status or payable certificate count is invented.",
  references: [
    {
      title: "Carbon Border Adjustment Mechanism overview",
      publisher: "European Commission",
      href: "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en",
      note: "Confirms definitive regime from 1 January 2026 and covered sectors, including iron and steel."
    },
    {
      title: "CBAM definitive regime",
      publisher: "European Commission",
      href: "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/cbam-definitive-regime_en",
      note: "Authorisation, >50-tonne annual mass-based threshold for covered goods, declarant role and certificate obligations."
    },
    {
      title: "Verification of CBAM emissions",
      publisher: "European Commission",
      href: "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/cbam-verification_en",
      note: "Explains installation-level verification; default versus accredited-verifier-confirmed actual values; first 2027 verification timetable."
    },
    {
      title: "CBAM certificate prices",
      publisher: "European Commission",
      href: "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/price-cbam-certificates_en",
      note: "Q3 2026 €82.32 (published 5 October 2026), quarterly 2026 and weekly 2027 prices, purchase platform from February 2027."
    },
    {
      title: "Iron and steel sector resources",
      publisher: "European Commission",
      href: "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/cbam-sectors_en",
      note: "Sector-specific official guidance, not a substitute for specific CN-code determination."
    },
    {
      title: "CBAM communications and news",
      publisher: "European Commission",
      href: "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/cbam-communication-and-news_en",
      note: "Confirmation of first 2026-import filing deadline on 30 September 2027."
    }
  ],
  relatedLinks: [
    {
      title: "Before Comparing Carbon Numbers, Read the Denominator",
      href: "/blog/epd-carbon-comparison-functional-unit-boundary",
      description: "Why two environmental declarations cannot be compared from the headline number alone."
    },
    {
      title: "Destination Customs Classification and Supplier HS Codes",
      href: "/blog/supplier-hs-code-destination-import-classification",
      description: "Why tariff classification belongs to the destination importer, not the supplier."
    }
  ]
};
