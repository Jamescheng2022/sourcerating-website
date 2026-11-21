import type { BlogPost } from "@/data/blog";

export const cifCisfDestinationFeePost: BlogPost = {
  "slug": "cif-shipping-quote-destination-cisf-fee-trap-icc-cargo-insurance",
  "title": "The $300 CIF Shipping Quote That Invoiced $4,200 at the Port: A Buyer's Field Guide to LCL Destination Fee Extortion, the CISF Kickback, and the ICC (C) Insurance Blindspot",
  "seoTitle": "CIF Shipping Surcharges & CISF Port Fee Extortion: The Overseas Buyer's Guide to LCL Destination Kickbacks and Marine Cargo Insurance",
  "excerpt": "A field guide for overseas buyers purchasing machinery, electrical components, fabricated parts and commercial cargo on CIF or CFR terms: how the negative-freight CISF kickback works, why destination agents hold cargo hostage, when LCL becomes more expensive than a 20ft container, why standard CIF marine insurance pays $0 for water and handling damage, and how to contractually protect your landed costs.",
  "date": "2026-11-21",
  "category": "Packaging & Logistics",
  "layout": "editorial",
  "readTime": "18 min read",
  "sections": [],
  "coverImage": {
    "src": "/images/blog/cif-cisf-destination-rotterdam-terminal-desktop.webp",
    "mobileSrc": "/images/blog/cif-cisf-destination-rotterdam-terminal-mobile.webp",
    "width": 960,
    "height": 540,
    "mobileWidth": 330,
    "mobileHeight": 186,
    "alt": "Shipping container stacks at the Port of Rotterdam terminal under an overcast sky with straddle carriers in the background",
    "caption": "Shipping container stacks at the Port of Rotterdam, Europe's largest deepwater container hub. Destination terminal handling charges and container freight station fees are billed here by de-consolidating agents. Photo: AlfvanBeem, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Shipping_container_stacks_-_Port_of_Rotterdam_-_2017_-_1.jpg), [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/); cropped and resized to WebP. Documentary illustration only; implies no affiliation with any specific carrier or tariff dispute."
  },
  "articleBody": [
    {
      "type": "paragraph",
      "text": "An overseas procurement manager buying five crates of custom industrial valves, electrical motor drives, or structural components receives what looks like a commercial triumph: the manufacturer in Ningbo or Qingdao quotes CIF destination port (Rotterdam, Felixstowe, Hamburg, Los Angeles, or Sydney) with ocean freight billed at a token USD 50 per cubic metre (CBM)—or even 'Zero freight, ocean shipping included free of charge'. The commercial invoice is approved, the deposit is wired, and production finishes on schedule."
    },
    {
      "type": "paragraph",
      "text": "Four weeks later, the vessel docks. The buyer does not receive a call from a recognised shipping line, but an 'Arrival Notice and Freight Release Invoice' from an unfamiliar local break-bulk deconsolidator. To obtain the Delivery Order (D/O) and take custody of the goods, the consignee must pay USD 4,200 in non-negotiable destination fees on a USD 6,000 consignment. The bill lists items never mentioned in the proforma invoice: China Import Service Fee (CISF), De-consolidation Handling, Terminal Inbound Surcharge, Documentation Fee, and Container Freight Station (CFS) storage accumulating at USD 180 per day under a strict 48-hour free time clock."
    },
    {
      "type": "paragraph",
      "text": "When the buyer protests to the supplier, the supplier disclaims all responsibility: 'Incoterms CIF only covers freight to your port; destination port clearance and local terminal charges are always for the buyer\\'s account.' When crates are unpacked and found to have suffered water ingress and crushed corners from rough sea transit, the buyer discovers a second disaster: the CIF insurance certificate supplied by the seller covers only Institute Cargo Clauses (C)—a statutory minimum-peril policy that explicitly excludes sea water washing over deck, rough handling, container sweating, and rust."
    },
    {
      "type": "heading",
      "text": "The mechanics of the 'negative freight' kickback (退运费)"
    },
    {
      "type": "paragraph",
      "text": "Why would an origin freight forwarder carry 6 CBM of heavy machinery parts halfway across the world for free or below cost? The answer lies in the underground economics of Less-than-Container Load (LCL) consolidation, widely documented across international trade compliance reviews and shipping disputes."
    },
    {
      "type": "list",
      "ordered": true,
      "items": [
        "**Origin Exporter Enticement:** The origin master consolidator (co-loader) approaches export factories and trading companies with an offer that seems impossible: zero ocean freight to European or North American base ports, plus a cash rebate (known in Chinese logistics as 退运费, 'negative freight') of RMB 150 to RMB 300 (USD 20 to USD 40) per CBM paid *to the factory*.",
        "**The FCL Arbitrage:** The consolidator gathers 60 CBM of LCL cargo from a dozen unsuspecting exporters, stuffs a single 40ft High Cube container, and pays the shipping line a standard wholesale contract rate of USD 2,200 for the ocean voyage.",
        "**The Destination Partner Monopoly:** The origin consolidator signs an exclusive agency agreement with a destination break-bulk handling agent. The agreement stipulates that the origin forwarder passes the cargo at zero origin cost, on the condition that the destination agent bills the consignee inflated local charges and splits the net proceeds 50/50 with the origin co-loader.",
        "**The Hostage Delivery Order:** Under maritime shipping law, the ocean carrier issues a Master Bill of Lading (MBL) to the consolidator. The consignee receives only a House Bill of Lading (HBL). To release the cargo from the terminal CFS and obtain the Delivery Order (D/O) necessary for customs entry, the consignee must surrender the HBL to the destination agent. If the buyer refuses to pay the arbitrary fees, the agent withholds the D/O, triggering immediate storage penalties."
      ]
    },
    {
      "type": "illustration",
      "src": "/images/blog/cif-cisf-cfs-warehouse-forklift-desktop.webp",
      "mobileSrc": "/images/blog/cif-cisf-cfs-warehouse-forklift-mobile.webp",
      "width": 960,
      "height": 640,
      "mobileWidth": 330,
      "mobileHeight": 220,
      "alt": "Industrial diesel forklift transporting wooden pallets in a commercial warehouse facility",
      "caption": "A forklift handling palletized cargo inside a commercial warehouse. Container freight stations (CFS) perform de-stuffing and pallet sorting for LCL shipments, where de-consolidation fees and CISF surcharges are assessed. Photo: HUDORA GmbH, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Forklift.jpeg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/); cropped and resized to WebP, shared under the same licence. Documentary illustration only."
    },
    {
      "type": "heading",
      "text": "Incoterms 2020: where does risk and cost actually transfer under CIF?"
    },
    {
      "type": "paragraph",
      "text": "The primary reason buyers fall into this trap is a fundamental misunderstanding of the CIF (Cost, Insurance and Freight) rule under the International Chamber of Commerce [Incoterms 2020 rules](https://iccwbo.org/business-solutions/incoterms-rules/). Many buyers believe CIF means 'the supplier delivers the goods safely to my local warehouse with all port charges paid'. The legal reality is entirely different."
    },
    {
      "type": "table",
      "headers": ["Incoterm 2020", "Delivery & Risk Transfer Point", "Ocean Freight Paid By", "Destination Terminal (THC/CFS) Paid By", "Forwarder Nominated By", "Primary Risk for Industrial Buyer"],
      "rows": [
        ["EXW (Ex Works)", "At seller's factory/warehouse door", "Buyer", "Buyer", "Buyer", "Severe: Buyer manages export customs clearance and inland transit abroad"],
        ["FCA (Free Carrier)", "At named inland terminal or port gate", "Buyer", "Buyer", "Buyer (Nominated)", "Low: Clean risk handoff; buyer controls ocean freight, transit speed and destination charges"],
        ["FOB (Free on Board)", "Once cargo is on board vessel at origin port", "Buyer", "Buyer", "Buyer (Nominated)", "Low: Transparent freight, zero kickbacks, local forwarder accountability"],
        ["CFR (Cost & Freight)", "Once cargo is on board vessel at origin port", "Seller", "Buyer (unless in carriage contract)", "Seller", "High: Seller picks kickback forwarder; destination fee extortion"],
        ["CIF (Cost, Insurance, Freight)", "Once cargo is on board vessel at origin port", "Seller", "Buyer (unless in carriage contract)", "Seller", "High: Kickback forwarder + bare-minimum ICC (C) insurance trap"],
        ["DAP (Delivered at Place)", "At buyer's destination premises (uncleared)", "Seller", "Seller", "Seller", "Medium: Demurrage risk if import customs clearance is delayed"],
        ["DDP (Delivered Duty Paid)", "At buyer's destination premises (cleared)", "Seller", "Seller", "Seller", "Severe: Seller forwarder tariff misdeclaration and Importer of Record liabilities"]
      ]
    },
    {
      "type": "paragraph",
      "text": "Two legal cruxes govern Incoterms 2020 CIF. First is the Double-Port Separation: under CIF, the place of delivery is the port of shipment (when the goods are loaded on board the vessel), while the named destination is merely the endpoint of freight carriage. Risk transfers at the origin rail, not when the ship docks at your destination. Second is Article A6/B6 (Allocation of Costs): the seller pays ocean carriage to the named destination, but Article A6(b) explicitly provides that costs of unloading at the discharge port and destination terminal handling charges (DTHC/CFS) are for the buyer's account, unless such costs were included in the contract of carriage. Rogue consolidators deliberately strip destination handling from their carriage contract, legally dumping the entire burden onto the buyer."
    },
    {
      "type": "illustration",
      "src": "/images/blog/cif-cisf-ship-crane-rail-boundary-desktop.webp",
      "mobileSrc": "/images/blog/cif-cisf-ship-crane-rail-boundary-mobile.webp",
      "width": 960,
      "height": 600,
      "mobileWidth": 330,
      "mobileHeight": 206,
      "alt": "Large gantry cranes loading and discharging container vessels along the deepwater quay at Container Terminal Altenwerder in Hamburg",
      "caption": "Gantry cranes discharging container vessels at Container Terminal Altenwerder (CTA) in the Port of Hamburg. Under Incoterms 2020 CIF, the critical risk boundary transfers when goods cross the ship's rail at loading, not when the crane discharges at the destination quay. Photo: Jan Oelker / HHLA, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Container-Terminal-Altenwerder-CTA-2004.jpg), [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/); cropped and resized to WebP, shared under the same licence."
    },
    {
      "type": "heading",
      "text": "Destination port invoice audit: legitimate fees vs extortion"
    },
    {
      "type": "paragraph",
      "text": "When an arrival notice lands, procurement and freight accounting teams must immediately separate statutory carrier fees from concocted co-loader surcharges. A structured audit matrix separates legitimate port costs from kickback recovery schemes."
    },
    {
      "type": "table",
      "headers": ["Invoice Line Item", "Standard Market Rate (Europe / N. America)", "Rogue Co-Loader Extorted Rate", "Legitimacy Status", "Defense / Action Protocol"],
      "rows": [
        ["CISF / CISS (China Import Service Fee)", "USD 0.00 (Non-existent in carrier tariffs)", "USD 85 – USD 160 per CBM / W/M", "FRAUDULENT / KICKBACK", "Demand FMC tariff filing (US) or reject under Incoterms A6; force seller reimbursement"],
        ["DTHC (Destination Terminal Handling Charge)", "USD 20 – USD 35 per CBM (USD 250 flat for 20GP)", "USD 80 – USD 140 per CBM", "INFLATED (300%+)", "Compare against published port terminal tariff; demand underlying wharfage receipt"],
        ["CFS Receiving / De-stuffing Fee", "USD 25 – USD 45 per CBM", "USD 90 – USD 180 per CBM", "INFLATED (250%+)", "Require itemized break-bulk warehouse cost sheet; challenge non-standard line items"],
        ["Delivery Order (D/O) Issuance", "USD 60 – USD 100 flat per B/L", "USD 200 – USD 450 flat per B/L", "INFLATED", "Standard documentation fee; challenge fees exceeding USD 120"],
        ["Customs Turnover / Handover Fee", "USD 0.00 (or USD 30 if 3rd party broker used)", "USD 150 – USD 300 flat", "PUNITIVE SURCHARGE", "Charged to penalize buyers who do not use the agent's in-house customs broker"],
        ["Port Security (ISPS / Clean Truck)", "USD 10 – USD 25 flat", "USD 60 – USD 120 flat", "INFLATED", "Verify against carrier master bill of lading actual security pass-through"],
        ["CFS Storage / Demurrage", "7–14 days free time; then USD 30–USD 50/day", "3 days free time; then USD 120–USD 250/day", "TRAP", "Ticking clock weaponized by delaying invoices until free days expire"]
      ]
    },
    {
      "type": "paragraph",
      "text": "The weaponised storage clock is the deconsolidator's most effective leverage. While full containers (FCL) discharged directly from shipping lines typically enjoy 7 to 14 days of free demurrage at the container yard, private Container Freight Stations (CFS) handling LCL cargo often grant only 3 calendar days of free storage. The agent deliberately delays emailing the arrival notice or requires obscure wire-transfer confirmations until day 4, ensuring the buyer incurs immediate penalty storage of USD 150 to USD 250 per day."
    },
    {
      "type": "illustration",
      "src": "/images/blog/cif-cisf-port-customs-hold-truck-desktop.webp",
      "mobileSrc": "/images/blog/cif-cisf-port-customs-hold-truck-mobile.webp",
      "width": 960,
      "height": 640,
      "mobileWidth": 330,
      "mobileHeight": 220,
      "alt": "U.S. Customs and Border Protection officer directing a flatbed truck carrying a seaport container toward an inspection facility",
      "caption": "A U.S. Customs and Border Protection officer directing container transport at a seaport gate. Customs holds and documentation turnovers add demurrage pressure when arrival notices are disputed. Photo: James Tourtellotte / U.S. Customs and Border Protection, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:CBP_officer_directing_a_truck.jpg), [Public Domain](https://commons.wikimedia.org/wiki/File:CBP_officer_directing_a_truck.jpg); cropped and resized to WebP."
    },
    {
      "type": "heading",
      "text": "The volumetric breakeven: the 12–14 CBM rule"
    },
    {
      "type": "paragraph",
      "text": "A common mistake in industrial sourcing is assuming that Less-than-Container Load (LCL) is always cheaper than a Full Container Load (FCL) whenever the shipment volume is below the capacity of a standard 20ft dry box (~28 to 30 CBM). Because LCL destination fees are billed per Revenue Ton / CBM (Weight or Measurement, W/M), destination costs scale linearly. In contrast, FCL destination port terminal handling is a fixed lump sum per container."
    },
    {
      "type": "paragraph",
      "text": "Consider a concrete procurement case: 14 CBM of industrial pump components (weighing 4,500 kg) shipped from Shanghai to Hamburg. On CIF LCL terms with a supplier quote of USD 40/CBM, ocean freight is USD 560, but destination charges add CISF (USD 1,330), CFS de-stuffing (USD 770), destination THC (USD 490), D/O release (USD 250), and turnover fees (USD 320), totaling USD 3,720. On FOB terms for a dedicated 20GP container with a buyer-nominated forwarder, ocean freight is USD 1,450 flat, destination wharfage THC is USD 320 flat, D/O fee is USD 85, and security is USD 45, totaling USD 1,900. Shipping inside a half-empty 20ft container saves USD 1,820 (49%), eliminates deconsolidation delays, prevents co-loading damage, and provides 14 days of free demurrage."
    },
    {
      "type": "heading",
      "text": "Marine cargo insurance: the ICC (C) blindspot"
    },
    {
      "type": "paragraph",
      "text": "Under Incoterms 2020 CIF, the seller is legally obligated to procure marine cargo insurance. However, unless the purchase contract explicitly states otherwise, the seller is only required to purchase Institute Cargo Clauses (C)—the lowest and cheapest tier of maritime insurance established by the Lloyd's Market Association (LMA) and the International Underwriting Association of London (IUA)."
    },
    {
      "type": "table",
      "headers": ["Named Perils & Transport Events", "Institute Cargo Clauses (C)", "Institute Cargo Clauses (B)", "Institute Cargo Clauses (A) [All Risks]"],
      "rows": [
        ["Fire or explosion", "Covered", "Covered", "Covered"],
        ["Vessel stranded, grounded, sunk or capsized", "Covered", "Covered", "Covered"],
        ["Overturning or derailment of land conveyance", "Covered", "Covered", "Covered"],
        ["Collision or contact of vessel with external object", "Covered", "Covered", "Covered"],
        ["Discharge of cargo at a port of distress", "Covered", "Covered", "Covered"],
        ["General Average sacrifice and jettison", "Covered", "Covered", "Covered"],
        ["Earthquake, volcanic eruption or lightning", "EXCLUDED", "Covered", "Covered"],
        ["Washing overboard by heavy seas", "EXCLUDED", "Covered", "Covered"],
        ["Entry of sea, lake or river water into hold or container", "EXCLUDED", "Covered", "Covered"],
        ["Total loss of package lost overboard or dropped during loading", "EXCLUDED", "Covered", "Covered"],
        ["Rough handling / dropped crate by port crane", "EXCLUDED", "EXCLUDED", "Covered"],
        ["Container sweating / condensation / moisture damage", "EXCLUDED", "EXCLUDED", "Covered (subject to packing)"],
        ["Rust, oxidation, and discoloration during voyage", "EXCLUDED", "EXCLUDED", "Covered (subject to packing)"],
        ["Theft, pilferage, and non-delivery of cartons", "EXCLUDED", "EXCLUDED", "Covered"],
        ["Cargo shifting and crushing inside container during swell", "EXCLUDED", "EXCLUDED", "Covered"]
      ]
    },
    {
      "type": "paragraph",
      "text": "Institute Cargo Clauses (C) covers catastrophic total loss events, but it excludes the exact operational hazards that damage industrial equipment: rough crane drops, container sweat, rust, and water ingress. Furthermore, even under Institute Cargo Clauses (A) ('All Risks'), insurers routinely reject claims under Clause 4.3 (Insufficiency or Unsuitability of Packing). If heavy machinery shifts because internal wooden blocking gave way, or bare metal corrodes because export vapor corrosion inhibitor (VCI) film and desiccant were omitted, the insurer denies coverage. The packaging must meet documented industrial standards (see SourceRating's analysis of [solid wood skids and ISPM 15 standards](https://www.sourcerating.com/blog/plywood-crate-solid-wood-skids-ispm15))."
    },
    {
      "type": "heading",
      "text": "Contractual protection clauses for cross-border purchase orders"
    },
    {
      "type": "paragraph",
      "text": "To eliminate destination fee extortion and insurance gaps, procurement contracts must incorporate rigorous bilingual terms that shift financial accountability back to the seller."
    },
    {
      "type": "list",
      "ordered": false,
      "items": [
        "**Prohibition of CISF and Destination Fee Indemnity Clause:** 'The Contract Price is based on [FOB / CIF named port of destination, Incoterms 2020]. The Seller expressly warrants that the ocean freight contracted by the Seller or its shipping agents does not contain any negative freight, freight rebates, or co-loading kickback arrangements. The Seller guarantees that neither the Seller, the carrier, nor any destination de-consolidator or agent shall levy any China Import Service Fee (CISF), China Import Surcharge (CISS), turnover fees, or any destination terminal fees exceeding the standard published carrier terminal tariff at the port of discharge. If the consignee is billed any CISF, CISS, or unagreed destination surcharges to obtain the Delivery Order (D/O), the Seller shall unconditionally reimburse the Buyer within five (5) business days of receiving the invoice copy, or the Buyer shall have the legal right to deduct the full amount from any pending contract payment, warranty retention, or bank guarantee.'",
        "**Mandatory Marine Cargo Insurance Rider (ICC A All Risks):** 'Where the trade term is CIF or CIP, the Seller shall, at its own expense, procure marine cargo insurance coverage for not less than 110% of the CIF contract value, underwritten by a first-class international insurance company (rated A- or higher by Standard & Poor\\'s or A.M. Best). The policy shall be subject to the Institute Cargo Clauses (A) [All Risks], Institute War Clauses (Cargo), and Institute Strikes Clauses (Cargo), dated 01/01/2009 or latest revision. The insurance shall provide Warehouse to Warehouse coverage, remaining in full force from the time the goods leave the factory warehouse until final physical delivery and unloading at the Buyer\\'s designated job site or warehouse. The original insurance policy or negotiable certificate shall be delivered to the Buyer alongside the shipping documents.'"
      ]
    },
    {
      "type": "heading",
      "text": "Emergency rescue protocol: when cargo is held hostage at destination"
    },
    {
      "type": "paragraph",
      "text": "If an extortionate arrival notice has already been issued, follow this immediate escalation sequence to protect cargo rights and minimize demurrage losses."
    },
    {
      "type": "list",
      "ordered": true,
      "items": [
        "**Leverage CISG Article 30 & 74 Immediately:** Under the [United Nations Convention on Contracts for the International Sale of Goods (CISG)](https://uncitral.un.org/en/texts/salegoods/conventions/sale_of_goods/cisg) Article 30, the seller is legally bound to transfer title and deliver goods free from any third-party right or claim. Notify the seller in writing that an unauthorized third-party lien has been placed on the cargo due to their forwarder's kickback booking, and that all demurrage, legal costs, and consequential delays will be claimed as damages under CISG Article 74.",
        "**Demand Published Regulatory Tariff Filings:** In the United States, all non-vessel-operating common carriers (NVOCCs) are governed by [Federal Maritime Commission (FMC) regulations](https://www.fmc.gov/carrier-and-mto-demurrage-and-detention-rules/) under 46 CFR Part 520; demand their FMC Organization Number and the exact tariff rule governing each line item. In Europe, demand adherence to standard freight forwarding association rules (such as BIFA in the UK or FENEX in the Netherlands) and require their audited break-bulk terminal schedule.",
        "**Execute 'Payment Under Written Protest':** Never engage in a multi-week stalemate while cargo sits in a CFS warehouse racking up USD 200/day. If negotiations stall and free time expires, tender payment accompanied by a formal legal statement: 'Payment tendered strictly under protest to mitigate escalating terminal storage, reserving all statutory rights to seek full restitution and regulatory investigation.'",
        "**Initiate Regulatory and Commercial Countermeasures:** Deduct the extorted amount directly from the supplier's balance payment or advance payment guarantee (see SourceRating's [advance payment guarantee protocol](https://www.sourcerating.com/blog/advance-payment-guarantee-performance-bond-urdg-758-buyer-guide)), and file a formal billing dispute with the FMC Office of Consumer Affairs or local commercial fraud authorities."
      ]
    },
    {
      "type": "heading",
      "text": "Pre-procurement freight and insurance audit checklist"
    },
    {
      "type": "list",
      "ordered": false,
      "items": [
        "Trade Term Selected: Default to FCA (named inland terminal/port) or FOB (port of loading) using a buyer-nominated freight forwarder.",
        "Volumetric Threshold Check: If cargo exceeds 12 CBM or 8 metric tons, compare LCL quotes against a dedicated 20GP FCL container.",
        "Pre-Agreed Destination Tariff: If CIF/CFR is unavoidable, require the seller's forwarder to sign a Destination Tariff Schedule confirming all local charges prior to booking.",
        "Anti-CISF Indemnity Inserted: The purchase contract incorporates an express warranty indemnifying the buyer against CISF, CISS, and turnover fees.",
        "Insurance Level Specified: Contract mandates Institute Cargo Clauses (A) All Risks at 110% CIF value, plus War, Strikes, and Warehouse-to-Warehouse endorsements.",
        "Packaging Standards Defined: Crates meet ISPM 15 heat treatment standards, with VCI barrier foil and desiccant calculations to prevent Clause 4.3 insurance denials.",
        "CFS Free Time Confirmed: Minimum 10 calendar days of free storage time at destination CFS specified in the booking confirmation.",
        "Payment Linked to Release: Final balance payment (10% to 20%) is held until cargo is physically released from the destination port and inspected on site."
      ]
    },
    {
      "type": "paragraph",
      "text": "Transparent logistics is not an administrative afterthought; it is an essential component of landed cost control. A supplier that resists FOB terms or refuses to cap destination fees is almost always profiting from the logistics kickback behind your back. If you need assistance structuring freight contracts, auditing destination port invoices, or navigating carrier disputes, [contact SourceRating](https://www.sourcerating.com/contact) with your draft bill of lading and quotation details."
    }
  ],
  "referencesHeading": "Primary rules, conventions and regulatory sources",
  "referencesIntro": "Primary sources checked on 21 November 2026. Incoterms 2020 rules are an ICC publication; Institute Cargo Clauses are issued jointly by the Lloyd's Market Association (LMA) and the International Underwriting Association of London (IUA). This guide is operational procurement information, not legal counsel.",
  "references": [
    {
      "title": "Incoterms 2020 Rules for the use of domestic and international trade terms",
      "publisher": "International Chamber of Commerce (ICC)",
      "href": "https://iccwbo.org/business-solutions/incoterms-rules/",
      "note": "ICC Publication No. 723E; rules A6/B6 (allocation of costs) and delivery obligations for CIF and FCA."
    },
    {
      "title": "Institute Cargo Clauses (A), (B), (C)",
      "publisher": "Lloyd's Market Association (LMA) & International Underwriting Association (IUA)",
      "href": "https://www.lmalloyds.com/lma/joint-cargo",
      "note": "Joint Cargo Committee clauses CL382, CL383, CL384 (2009 revision); peril coverage schedules and Clause 4 general exclusions."
    },
    {
      "title": "Final Rule on Demurrage and Detention Billing Requirements (46 CFR Part 541)",
      "publisher": "Federal Maritime Commission (FMC)",
      "href": "https://www.fmc.gov/carrier-and-mto-demurrage-and-detention-rules/",
      "note": "Docket No. 22-04; regulatory standards for common carrier and MTO billing accuracy, dispute timeframes, and NVOCC pass-through rules."
    },
    {
      "title": "United Nations Convention on Contracts for the International Sale of Goods (CISG)",
      "publisher": "United Nations Commission on International Trade Law (UNCITRAL)",
      "href": "https://uncitral.un.org/en/texts/salegoods/conventions/sale_of_goods/cisg",
      "note": "Articles 30, 35, and 74; obligations of the seller to deliver goods free from any right or claim of a third party and damages for breach."
    }
  ],
  "relatedLinks": [
    {
      "title": "The PO Names a Factory. The Invoice Names a Trader. Who Is the Seller?",
      "href": "/blog/purchase-order-factory-invoice-trader-seller-entity-check",
      "description": "Verifying seller entity chains and payee legitimacy before wiring funds."
    },
    {
      "title": "The Packing List Adds Up. The Container Weight Still Doesn't.",
      "href": "/blog/packing-list-weight-container-vgm",
      "description": "SOLAS verified gross mass rules and container tare weight discrepancies."
    },
    {
      "title": "The Supplier Sent a Bank Guarantee for Your Deposit. Will the Bank Actually Pay?",
      "href": "/blog/advance-payment-guarantee-performance-bond-urdg-758-buyer-guide",
      "description": "Protecting advance payments and structuring milestone security under URDG 758."
    },
    {
      "title": "The Cross-Border Procurement Field Guide",
      "href": "/blog/cross-border-procurement-supply-chain-full-spectrum-guide",
      "description": "Managing cross-border risk across the full procurement and logistics lifecycle."
    }
  ]
};
