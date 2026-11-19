import type { BlogPost } from "@/data/blog";

export const valveForgingItpInspectionPost: BlogPost = {
  "slug": "overseas-valves-forgings-itp-en10204-inspection-guide",
  "title": "The 3.2 Certificate Has Two Signatures. Did Either Inspector See the Test Bar Cut?",
  "seoTitle": "Valve, Casting & Forging ITP and EN 10204 3.2 Witness Inspection: A Buyer's Counter-Fraud Protocol",
  "excerpt": "A field protocol for overseas buyers of pressure-retaining valves, castings and forgings: how to build an ITP with real hold points, what an EN 10204 3.2 inspector must physically control, why handheld XRF cannot catch an A105-for-LF2 swap, and how to verify a Lloyd's Register, TÜV, DNV or Bureau Veritas signature.",
  "date": "2026-11-19",
  "category": "Quality & Inspection",
  "layout": "editorial",
  "readTime": "18 min read",
  "sections": [],
  "coverImage": {
    "src": "/images/blog/valve-forging-itp-ball-valve-pump-station-desktop.webp",
    "mobileSrc": "/images/blog/valve-forging-itp-ball-valve-pump-station-mobile.webp",
    "width": 960,
    "height": 540,
    "mobileWidth": 330,
    "mobileHeight": 186,
    "alt": "Large flanged ball valve with gear operator installed between heavy bolted flanges on a pump-station pipeline",
    "caption": "A large flanged ball valve with gear operator in a pipeline pump station. Photo: Wilfra, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:NWO-Kugelhahn.JPG), public domain; cropped and resized to WebP. Documentary illustration only; not a record of any supplier, valve or inspection discussed in this article."
  },
  "articleBody": [
    {
      "type": "paragraph",
      "text": "In February 2022 a federal court in Tacoma sentenced the former director of metallurgy at Bradken's foundry to 30 months in prison. According to the [U.S. Department of Justice](https://www.justice.gov/usao-wdwa/pr/former-lab-director-sentenced-prison-falsifying-results-steel-testing-parts-navy-subs), she had falsified strength and toughness test results for steel castings supplied for U.S. Navy submarines from 1985 to 2017, in more than 240 productions of steel. The castings were not counterfeit and the foundry was not a shell company. The certificates were issued by the real manufacturer, signed by its own laboratory authority, and accepted for three decades."
    },
    {
      "type": "paragraph",
      "text": "That is the exact failure an EN 10204 type 3.1 certificate cannot protect against: the person vouching for the result belongs to the organisation that benefits from the result passing. Type 3.2 exists to add a second, independent signature. But a second signature is only worth what its signatory physically controlled. A 3.2 certificate on which the third-party inspector reviewed the mill's printout in a meeting room after the fact is, in substance, a 3.1 certificate with a more expensive letterhead."
    },
    {
      "type": "paragraph",
      "text": "This protocol is written for buyers sourcing pressure-retaining valves (API 600 gate valves, API 6D pipeline valves, ASME B16.34 class-rated valves) and the castings and forgings they are made from: carbon steel castings to ASTM A216, low-temperature castings to ASTM A352, low-temperature forgings to ASTM A350, and stainless and duplex forgings to ASTM A182. It covers three things that are usually handled separately and fail at the seams between them: the Inspection and Test Plan (ITP), the 3.2 witnessing itself, and the verification of the inspection body behind the second signature."
    },
    {
      "type": "heading",
      "text": "What EN 10204 actually distinguishes, and what it does not"
    },
    {
      "type": "paragraph",
      "text": "[EN 10204:2004](https://standards.iteh.ai/catalog/standards/cen/e944ea59-001d-4f76-bc3a-96947b19a169/en-10204-2004) defines types of inspection document for metallic products. It does not define test methods, acceptance values or inspector competence; those come from the product standard and the purchase order. The practical distinctions are about who tested what, and who signs."
    },
    {
      "type": "table",
      "headers": ["Document type", "Test basis", "Validated by", "What it can prove to a buyer"],
      "rows": [
        ["2.1 Declaration of compliance", "No test results", "Manufacturer", "Only that the manufacturer claims conformity"],
        ["2.2 Test report", "Non-specific inspection (results from production of the same type, not necessarily your lot)", "Manufacturer", "Typical capability, not the delivered heat"],
        ["3.1 Inspection certificate", "Specific inspection of the delivered products or test units", "Manufacturer's authorised inspection representative, independent of manufacturing", "Results for your heat and lot, vouched for by the manufacturer"],
        ["3.2 Inspection certificate", "Specific inspection of the delivered products or test units", "Manufacturer's inspection representative and either the purchaser's authorised representative or an inspector designated by official regulations", "Results for your heat and lot, with a second party who should have controlled specimen identity and witnessed the tests"]
      ]
    },
    {
      "type": "paragraph",
      "text": "Two consequences matter in valve procurement. First, EN 10204 is a material document standard. A finished valve is an assembly of body, bonnet, closure member, stem, bolting and trim, plus a pressure test that has nothing to do with the steel mill. When a purchase order says 'valves with 3.2 certificates', it has not said which parts, which tests or which inspector. Write it out: 3.2 for the body, bonnet and closure member material (heat-specific chemistry, tensile, impact and hardness), plus a witnessed pressure-test report for the assembled valve signed by the same inspection body."
    },
    {
      "type": "paragraph",
      "text": "Second, 3.2 does not upgrade a material. A 3.2 certificate for ASTM A105 is still a certificate for a forging steel with no impact-test requirement, and it is entirely possible to receive an impeccably witnessed certificate for the wrong grade. The ITP and the material specification decide what is tested; the certificate type only decides who stands behind the result."
    },
    {
      "type": "heading",
      "text": "When the regulation, rather than the buyer, asks for 3.2"
    },
    {
      "type": "paragraph",
      "text": "For equipment entering the European Union, the [Pressure Equipment Directive 2014/68/EU](https://eur-lex.europa.eu/eli/dir/2014/68/oj) requires, in Annex I section 4.3, that the materials of main pressure-bearing parts of equipment in categories II, III and IV be covered by a certificate of specific product control. The Commission's PED guidance, and the way notified bodies apply it, generally accept an EN 10204 3.1 certificate where the material manufacturer operates a quality system certified by a competent body established within the Union that has made a specific assessment for materials; where that condition is not met, a 3.2 certificate validated by a notified body, recognised third-party organisation or other competent party is the usual route. Many valve makers outside Europe hold the first kind of approval for some product lines and not others, which is why the question to ask is not 'can you do PED?' but 'which mill or forge, which approval certificate, issued by which notified body, covering which product form?'"
    },
    {
      "type": "paragraph",
      "text": "Notified bodies are listed in the Commission's NANDO database, linked from the [PED page of the European Commission](https://single-market-economy.ec.europa.eu/sectors/pressure-equipment-and-gas-appliances/pressure-equipment-sector/pressure-equipment-directive_en). If a certificate carries a four-digit notified-body number, check that the number belongs to the organisation printed next to it and that the body is notified for the directive and module claimed. This takes ten minutes and catches a surprising number of borrowed numbers. Where your project is not under PED, the requirement for 3.2 is purely contractual, and its value depends entirely on how you write the ITP."
    },
    {
      "type": "heading",
      "text": "The swap a handheld analyser cannot see"
    },
    {
      "type": "paragraph",
      "text": "Most buyers think of material fraud as a chemistry problem, and chemistry is what a handheld XRF analyser checks quickly. That covers some substitutions well. A forging sold as ASTM A182 F51 duplex (roughly 22% chromium, 5% nickel, 3% molybdenum) cannot pass as F316 (roughly 17% chromium, 10 to 14% nickel, 2 to 3% molybdenum), and a field XRF reading will separate them in seconds. The dangerous substitutions in valve and flange supply are the ones where the chemistry is legitimately similar and the difference lies in carbon content, heat treatment or proven toughness."
    },
    {
      "type": "paragraph",
      "text": "The clearest example is ASTM A105 versus ASTM A350 LF2. Both are carbon-manganese forging steels with overlapping composition ranges. LF2 is the low-temperature grade: it must be heat treated (normalised, or normalised and tempered, or quenched and tempered) and impact tested, with Class 1 tested at -46 °C. A105 has no mandatory impact test. A forged body made from A105 stock and stamped LF2 will produce an XRF reading indistinguishable from the real thing. The same applies to castings: ASTM A216 WCB and ASTM A352 LCC sit in similar chemical territory, and what makes LCC fit for -46 °C service is its heat treatment and the Charpy test on a coupon from that heat. For low-temperature service, the impact test is the material. If nobody independent saw it, nobody independent verified the grade."
    },
    {
      "type": "table",
      "headers": ["Substitution risk", "Can handheld XRF detect it?", "What actually detects it"],
      "rows": [
        ["F51 / F53 duplex supplied as or replaced by 316", "Yes: Cr/Ni/Mo ratios differ clearly", "XRF on every pressure part, plus ferrite measurement on duplex"],
        ["316 supplied for 316L", "No: carbon is invisible to XRF", "Spark OES with carbon channel, or laboratory analysis of a witnessed sample"],
        ["A105 supplied for A350 LF2", "No: overlapping chemistry", "Witnessed Charpy test at the specified temperature on a coupon of the same heat and heat-treatment batch; heat-treatment charts"],
        ["A216 WCB supplied for A352 LCB / LCC", "No: overlapping chemistry", "Witnessed impact test, heat-treatment record, coupon identity traced to the casting heat"],
        ["Correct duplex grade, wrong heat treatment (sigma phase)", "No: chemistry is correct", "ASTM A923 test (method per specification), ferrite count, field replica metallography where specified"],
        ["Over-hard carbon steel for sour service", "No", "Hardness survey against the NACE MR0175 / ISO 15156 limit written in the purchase order"]
      ]
    },
    {
      "type": "paragraph",
      "text": "This is why a buyer who relies on a single positive material identification (PMI) visit at the end of production is often reassured by the wrong test. SourceRating covered the carbon blind spot of XRF on 316L in [an earlier article](https://www.sourcerating.com/blog/xrf-316l-carbon-verification); the low-temperature case is worse, because no amount of chemistry, from any instrument, proves toughness."
    },
    {
      "type": "illustration",
      "src": "/images/blog/valve-forging-itp-charpy-impact-tester-desktop.webp",
      "mobileSrc": "/images/blog/valve-forging-itp-charpy-impact-tester-mobile.webp",
      "width": 960,
      "height": 720,
      "mobileWidth": 330,
      "mobileHeight": 248,
      "alt": "Analogue pendulum Charpy impact testing machine with its scale dial and specimen anvil",
      "caption": "An analogue pendulum Charpy impact testing machine. For low-temperature grades such as A350 LF2 and A352 LCC, this test, not the chemistry, is what proves the grade. Photo: Cjp24, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Charpy_impact_tester.jpg), [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/); cropped and resized to WebP. Not a record of any test discussed here."
    },
    {
      "type": "heading",
      "text": "Building the ITP: hold, witness and review mean different obligations"
    },
    {
      "type": "paragraph",
      "text": "An Inspection and Test Plan is a table that lists every inspection activity in the order it happens, the controlling document and acceptance criterion, the record produced, and an intervention code for each party. The codes are where most ITPs fail, because suppliers propose them and buyers accept them without reading the consequences."
    },
    {
      "type": "list",
      "ordered": false,
      "items": [
        "**Hold point (H):** production may not pass this step until the designated inspector has attended, or has released the step in writing. If the inspector does not come, the work stops. Use it only where the evidence is destroyed or hidden by the next step.",
        "**Witness point (W):** the inspector must be notified with agreed lead time and may attend. If they do not attend after proper notice, the supplier may proceed and the record stands. A witness point with a 24-hour notice window on a site 1,500 km from the inspector's office is, in practice, a review point.",
        "**Review (R):** the inspector examines records after the event. Appropriate for documents that exist independently of the inspector's presence, such as furnace charts with calibrated recorders.",
        "**Monitor or surveillance (M / S):** random, unannounced attendance. Useful for process control between hold points, such as welding repair practice on castings."
      ]
    },
    {
      "type": "paragraph",
      "text": "The design rule is simple: put a hold point immediately before the step that makes earlier evidence unrecoverable. Test coupons are cut from the casting or forging and then become anonymous pieces of steel; the moment of identification and stamping is irreversible, so it is a hold. A pressure test cannot be re-witnessed after painting has hidden weep paths, so the test is a hold. Dimensional checks can be repeated on the finished valve, so they rarely need to be."
    },
    {
      "type": "table",
      "headers": ["Step", "Activity", "Controlling document / acceptance", "Record", "Mfr", "3.2 inspector", "Buyer"],
      "rows": [
        ["1", "Pre-inspection meeting: ITP, procedures, grade, heat-treatment and NDT procedures, notification lead time", "PO, data sheet, ITP revision", "Signed minutes", "H", "H", "H"],
        ["2", "Raw material receipt: ingot, bar or melt heat numbers vs. mill certificate", "Material spec (A182 / A350 / A105 / A216 / A352)", "Receiving log, heat map", "R", "R", "R"],
        ["3", "Test-coupon selection and hard-stamp transfer (forging prolongation, separately forged test block or cast keel block)", "Material spec and general requirements (A961 for forgings, A703 / A781 for castings)", "Stamp log with photographs", "H", "H", "R"],
        ["4", "Heat treatment of parts with their coupons in the same furnace load", "Heat-treatment procedure; calibrated thermocouple record", "Furnace chart with load list", "R", "W (first load) / R", "R"],
        ["5", "Tensile and impact testing on stamped specimens; hardness", "Product spec; test temperature for impact; ISO 6892-1 / ASTM A370", "Laboratory report countersigned by inspector", "H", "W", "R"],
        ["6", "Chemical analysis of heat (ladle) and product check where specified", "Product spec; OES for carbon", "Analysis report", "R", "R / W for product check", "R"],
        ["7", "Casting NDT: visual (MSS SP-55), MT / PT, radiography where specified (e.g. ASME B16.34 special class)", "NDT procedures, qualified personnel, reference radiographs", "NDT reports, film or digital images", "R", "W (RT film review)", "R"],
        ["8", "Forging UT", "ASTM A388 or specified procedure", "UT report", "R", "W", "R"],
        ["9", "Major weld repairs on castings", "Repair limits in material spec; qualified WPS", "Repair map, post-repair NDT and heat treatment", "H", "H", "R"],
        ["10", "PMI on machined pressure parts and trim", "Grade table in PO; analyser verification on reference material", "PMI log by serial number", "R", "W", "R"],
        ["11", "Dimensional and marking check (MSS SP-25 marking, nameplate)", "GA drawing, ASME B16.10 face-to-face", "Dimensional report", "R", "R", "R"],
        ["12", "Shell test, backseat test, closure tests", "API 598 or API 6D, edition stated in PO; test medium and duration per standard", "Pressure-test report with gauge calibration IDs", "H", "H", "W"],
        ["13", "Fugitive emission or cryogenic test where specified", "ISO 15848-1 / specified procedure", "Test report", "R", "W", "W"],
        ["14", "Coating and preservation", "Paint system, DFT, end protection", "Coating report", "R", "R", "R"],
        ["15", "Final document dossier and release note", "Certificate pack mapped to serial numbers", "Inspection release note", "H", "H", "R"]
      ]
    },
    {
      "type": "paragraph",
      "text": "Two lines in that plan deserve emphasis. Step 3, coupon identification, is where 3.2 lives or dies, and step 12, the pressure test, is where valve buyers most often accept a test report without having made it a hold. For test durations, quote the standard and its edition in the purchase order rather than writing your own numbers: API 598 and API 6D set minimum durations by valve size and test type, and they have changed between editions. Ask the supplier to attach gauge calibration certificates and identify the gauge used for each test; a single gauge 'used' on forty valves in an afternoon is a question worth asking."
    },
    {
      "type": "illustration",
      "src": "/images/blog/valve-forging-itp-foundry-pouring-desktop.webp",
      "mobileSrc": "/images/blog/valve-forging-itp-foundry-pouring-mobile.webp",
      "width": 960,
      "height": 600,
      "mobileWidth": 330,
      "mobileHeight": 206,
      "alt": "Foundry workers pouring molten metal from a ladle into sand moulds on a production line",
      "caption": "Pouring sand castings at a foundry (historical U.S. National Archives photograph). For castings, the test coupon or keel block must come from the same heat and travel with the castings through heat treatment. Photo: Joe Clark, U.S. National Archives via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:POURING_SAND_CASTINGS_AT_THE_FORD_FOUNDRY_IN_DEARBORN_-_NARA_-_549693.jpg), public domain; cropped and resized to WebP. Archival illustration only."
    },
    {
      "type": "heading",
      "text": "What a 3.2 inspector must physically control"
    },
    {
      "type": "paragraph",
      "text": "Witnessing a mechanical test is not the same as watching a machine run. The value of the 3.2 signature comes from an unbroken chain between the product you will receive and the specimen that broke in the test machine. The inspector's job is to own each link of that chain."
    },
    {
      "type": "list",
      "ordered": true,
      "items": [
        "**Identity of the source:** the inspector confirms the heat number on the forging or casting, and that the test material is integral with it (a prolongation) or legitimately represents it (a separately forged test block or cast keel block from the same heat, as the specification allows).",
        "**Stamp transfer before separation:** the inspector applies their own hard stamp, with a stamp number traceable to them, to the coupon and to the product before the coupon is cut. Photographs should show the stamp, the heat number and the product serial in a single frame.",
        "**Heat-treatment association:** the stamped coupon goes into the same furnace load as the products it represents. The inspector either witnesses loading or reviews a furnace chart with a load list naming the coupon.",
        "**Specimen preparation:** the stamp is transferred again to machined tensile and Charpy specimens, or the inspector witnesses machining. A box of anonymous Charpy bars presented on the day of the test is not 3.2 evidence.",
        "**The test itself:** for impact tests, the inspector checks the cooling bath temperature and soak time, counts the three specimens, and reads the absorbed energy from the machine. For tensile tests, they check the machine's calibration status (ISO 7500-1 or ASTM E4) and see the extensometer or gauge marks.",
        "**Own record:** the inspector writes results in their own notes at the time of testing, and their signature on the certificate references a report or job number held by their organisation. If the inspection body cannot later retrieve that job number, the signature has nothing behind it."
      ]
    },
    {
      "type": "paragraph",
      "text": "Buyers should ask the inspection body, not the supplier, for the inspector's attendance record: dates, the address attended and the job number. One of the cheapest fraud checks in the whole process is plausibility of dates. A single inspector's signature on certificates for heats tested on the same day in factories several hundred kilometres apart deserves a phone call to the inspection body before shipment, not after."
    },
    {
      "type": "heading",
      "text": "Verifying the second signature: Lloyd's Register, TÜV, DNV, Bureau Veritas"
    },
    {
      "type": "paragraph",
      "text": "Large inspection bodies are aware that their names and stamps are borrowed, and most now offer some verification path. The paths differ by organisation and by certificate type, and none of them works if the buyer contacts the body through details printed on the suspicious document."
    },
    {
      "type": "list",
      "ordered": false,
      "items": [
        "**DNV** operates a public [certificate checker](https://certificatechecker.dnv.com/) for management system and product certificates, and issues digitally signed documents whose signatures can be [validated](https://www.dnv.com/supplychain/general/validating-digital-signatures/). A scanned image of a DNV document has no signature to validate; ask for the native signed PDF.",
        "**Bureau Veritas** verification depends on the business line and country. Its UK operation, for example, describes [checking certificate authenticity](https://bureauveritas.co.uk/needs/check-authenticity-certificates) by barcode and, for older or barcode-less documents, by sending the certificate to the issuing office. Expect to use the issuing office named on the certificate, reached through contact details from the BV website.",
        "**Lloyd's Register and LRQA** have been separate companies since Lloyd's Register sold its assurance business in 2021. A certificate signed under an LR marine or energy inspection mandate and one issued by LRQA are verified through different organisations. Check which entity is printed and verify with that one.",
        "**TÜV** is not a single company. TÜV SÜD, TÜV Rheinland, TÜV NORD and TÜV AUSTRIA are independent groups, and other businesses use similar names. Verify the full legal entity, its address, and, for PED work, its notified-body number in NANDO.",
        "**Any body:** ask for the inspection job number, the inspector's name and stamp number, and the date of attendance. Email the inspection body's regional office, found independently, with the certificate attached, and ask them to confirm all four. Keep the reply in the order file."
      ]
    },
    {
      "type": "paragraph",
      "text": "The document itself also carries signals. Red flags include certificate numbers that do not follow the body's format seen on other genuine documents; a stamp image that is pixel-identical across certificates, including its angle and ink density; an inspector signature on a certificate whose test date precedes the inspection booking; results that are identical to the last digit across different heats; heat numbers that differ between the certificate and the hard stamp on the product; and 3.2 certificates issued by an 'inspection company' with the same registered address or shareholders as the trading company selling the goods. That last check uses the same corporate-registry work SourceRating described for [split contracting entities](https://www.sourcerating.com/blog/purchase-order-factory-invoice-trader-seller-entity-check)."
    },
    {
      "type": "heading",
      "text": "On-site verification that survives a dispute"
    },
    {
      "type": "paragraph",
      "text": "Independent checks at the factory or on arrival do not replace the witnessed tests, but they do two things: they catch gross substitution, and they produce evidence the buyer controls. For that evidence to hold up in a commercial dispute, the method must be written down before the reading is taken."
    },
    {
      "type": "list",
      "ordered": false,
      "items": [
        "**Handheld XRF:** verify the analyser at the start and end of each session on a certified reference material of a similar alloy, and record both readings. Grind through paint, scale and any nickel or zinc coating to bright metal on a flat area. Take at least two readings per location. Record serial number, location and the full element readout, not just the analyser's grade-match label.",
        "**Spark OES:** use it where carbon decides the grade (L grades, carbon equivalent limits, low-temperature carbon steels where carbon is capped). The spark leaves a small burn mark; agree in advance where on the part it may be taken.",
        "**Portable hardness:** Leeb rebound (ASTM A956) and UCI (ASTM A1038) testers are sensitive to surface finish, mass and wall thickness, and their conversions to Brinell or Rockwell are approximate. For acceptance against a hard limit, such as a sour-service maximum written to NACE MR0175 / ISO 15156, specify the method and conversion in the purchase order, or witness a bench test on the coupon.",
        "**Duplex checks:** ferrite measurement by ferritescope gives a quick screen; the purchase order should state the acceptance range and whether ASTM E562 point counting governs. Intermetallic-phase screening uses ASTM A923, and the method (A, B or C) must be named, because they answer different questions.",
        "**Field metallographic replica:** where microstructure is in dispute, a replica taken to ASTM E1351 on the actual part can show sigma phase, carbide networks or a non-normalised structure without destructive sampling."
      ]
    },
    {
      "type": "illustration",
      "src": "/images/blog/valve-forging-itp-portable-hardness-tester-desktop.webp",
      "mobileSrc": "/images/blog/valve-forging-itp-portable-hardness-tester-mobile.webp",
      "width": 640,
      "height": 800,
      "mobileWidth": 330,
      "mobileHeight": 413,
      "alt": "Hand-portable hydraulic Brinell hardness tester with dial gauge and crank handle mounted on a test stand",
      "caption": "A hand-portable hydraulic Brinell hardness tester; the brand name is visible on the instrument and implies no endorsement. Field hardness is useful screening evidence when the method and conversion are agreed before the reading. Photo: GarfieldJAustin, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:A_portable_Brinell_hardness_tester,_2022.jpg), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); cropped and resized to WebP. Not a record of any inspection discussed here."
    },
    {
      "type": "heading",
      "text": "Contract language that gives the ITP teeth"
    },
    {
      "type": "paragraph",
      "text": "An ITP attached to a purchase order without corresponding commercial terms is a request, not an obligation. The clauses below are drafting starting points, written so that a supplier's quality manager and a buyer's lawyer can both read them. They should be adapted by counsel for the governing law of the contract."
    },
    {
      "type": "list",
      "ordered": true,
      "items": [
        "**Material substitution:** 'No material grade, product form or source mill other than those listed in Appendix A may be used without the Buyer's prior written approval. Approval of a substitute does not relieve the Seller of any requirement of the original specification.'",
        "**Inspector designation:** 'EN 10204 type 3.2 certificates shall be validated by the inspection body named by the Buyer in Appendix B. Certificates validated by any other party will be treated as type 3.1.'",
        "**Notification:** 'The Seller shall give the Buyer and the inspection body not less than five working days' written notice of each hold and witness point. Work performed past a hold point without written release may be rejected at the Seller's cost.'",
        "**Coupon retention:** 'Broken test specimens and coupon remnants bearing the inspector's stamp shall be retained for twelve months after delivery and made available for re-test on request.'",
        "**Re-test and cost allocation:** 'The Buyer may perform independent verification testing at any stage. If any result fails the specification, the Seller bears the cost of the verification test, replacement, re-inspection and associated freight.'",
        "**Document authenticity:** 'Submission of any certificate that the issuing inspection body does not confirm as genuine is a material breach.'"
      ]
    },
    {
      "type": "paragraph",
      "text": "The bilingual version of these clauses, together with a Chinese-language ITP template and a certificate verification log, is kept in the SourceRating field playbook that accompanies this article."
    },
    {
      "type": "heading",
      "text": "A pre-shipment release checklist"
    },
    {
      "type": "list",
      "ordered": false,
      "items": [
        "Every pressure part's serial number maps to a heat number, and every heat number maps to a 3.2 certificate whose job number the inspection body has confirmed in writing.",
        "Low-temperature grades show a witnessed impact test at the specified temperature, from a coupon that went through the same furnace load as the parts.",
        "The furnace chart has a load list that names the coupon.",
        "Stamp-transfer photographs show the inspector's stamp, heat number and product serial together.",
        "Pressure-test reports name the standard and edition, test medium, pressure, duration and gauge identifier for each valve, and the inspector signed them as a hold point.",
        "PMI log lists every pressure part and trim component by serial, with analyser verification readings at the start and end of each session.",
        "For PED shipments, the notified-body number on certificates matches NANDO and covers the module and product form.",
        "No certificate is from an inspection firm related by ownership or address to the seller."
      ]
    },
    {
      "type": "paragraph",
      "text": "The Bradken case was found by a laboratory employee who noticed altered test cards, not by a customer reading certificates. That is the honest limit of document review: it can tell you whether a certificate is internally consistent and genuinely issued, but not whether the number on it came from the steel you bought. Only the chain of custody can do that. When you next receive a 3.2 certificate, the most useful question to ask the inspection body is short: on what date, at what address, did your inspector stamp the coupon for this heat?"
    }
  ],
  "referencesHeading": "Standards, regulations and verification sources",
  "referencesIntro": "Primary sources checked on 19 November 2026. Material specifications (ASTM A105, A182, A216, A350, A352, A370, A388, A923, A956, A1038, E1351) and valve standards (API 598, API 600, API 6D, ASME B16.34, MSS SP-55) are cited by designation; confirm the edition named in your purchase order.",
  "references": [
    {
      "title": "Former lab director sentenced to prison for falsifying results of steel testing for parts of Navy subs",
      "publisher": "U.S. Attorney's Office, Western District of Washington",
      "href": "https://www.justice.gov/usao-wdwa/pr/former-lab-director-sentenced-prison-falsifying-results-steel-testing-parts-navy-subs",
      "note": "Official account of the Bradken foundry test-result falsification case, 1985–2017."
    },
    {
      "title": "EN 10204:2004 Metallic products — Types of inspection documents",
      "publisher": "European Committee for Standardization (CEN)",
      "href": "https://standards.iteh.ai/catalog/standards/cen/e944ea59-001d-4f76-bc3a-96947b19a169/en-10204-2004",
      "note": "Defines inspection document types 2.1, 2.2, 3.1 and 3.2 and who validates each."
    },
    {
      "title": "Directive 2014/68/EU on pressure equipment",
      "publisher": "Official Journal of the European Union (EUR-Lex)",
      "href": "https://eur-lex.europa.eu/eli/dir/2014/68/oj",
      "note": "Annex I section 4.3 sets material documentation requirements for main pressure-bearing parts."
    },
    {
      "title": "Pressure Equipment Directive",
      "publisher": "European Commission, Internal Market, Industry, Entrepreneurship and SMEs",
      "href": "https://single-market-economy.ec.europa.eu/sectors/pressure-equipment-and-gas-appliances/pressure-equipment-sector/pressure-equipment-directive_en",
      "note": "Commission guidance and the route to the NANDO list of notified bodies and recognised third-party organisations."
    },
    {
      "title": "Find a valid certificate",
      "publisher": "DNV",
      "href": "https://certificatechecker.dnv.com/",
      "note": "Public checker for DNV-issued management system and product certificates."
    },
    {
      "title": "Validating digital signatures on documents issued by DNV",
      "publisher": "DNV",
      "href": "https://www.dnv.com/supplychain/general/validating-digital-signatures/",
      "note": "How to validate the digital signature on a native DNV PDF."
    },
    {
      "title": "Check the authenticity of certificates",
      "publisher": "Bureau Veritas UK",
      "href": "https://bureauveritas.co.uk/needs/check-authenticity-certificates",
      "note": "Example of a Bureau Veritas country-level verification route by barcode or issuing-office request."
    },
    {
      "title": "API Standards",
      "publisher": "American Petroleum Institute",
      "href": "https://www.api.org/products-and-services/standards",
      "note": "Publisher of API 598, API 600 and API 6D; confirm the current edition before writing test durations into an ITP."
    }
  ],
  "relatedLinks": [
    {
      "title": "The PMI Screen Says 316. Who Verified the L?",
      "href": "/blog/xrf-316l-carbon-verification",
      "description": "Why handheld XRF cannot confirm low-carbon stainless grades, and what can."
    },
    {
      "title": "The Certificate of Conformance Blind Trust Trap: Why Overseas Buyers Accept Mill Sheets That Fail at Port",
      "href": "/blog/certificate-of-conformance-mill-sheet-traceability-port-rejection",
      "description": "The difference between a commercial declaration and heat-specific test evidence."
    },
    {
      "title": "An Accredited Laboratory Can Still Be the Wrong Laboratory for Your Test",
      "href": "/blog/accredited-laboratory-specific-test-scope",
      "description": "Checking that a laboratory's accreditation scope covers the exact test method you need."
    },
    {
      "title": "The Cross-Border Procurement Field Guide",
      "href": "/blog/cross-border-procurement-supply-chain-full-spectrum-guide",
      "description": "The wider procurement lifecycle this inspection protocol sits within."
    }
  ]
};
