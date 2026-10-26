import type { BlogPost } from "@/data/blog";

export const panelFireClassificationPost: BlogPost = {
  slug: "astm-e84-class-a-vs-en-13501-1-panel-fire-evidence",
  title: "Class A Is Not B-s1,d0: The Fire-Test Report Behind an Imported Panel",
  seoTitle: "ASTM E84 Class A vs EN 13501-1: Panel Fire-Test Evidence",
  layout: "editorial",
  excerpt: "A genuine ASTM E84 report does not establish the EN reaction-to-fire class a project requires. The missing link is the tested construction and its intended installation.",
  date: "2026-10-20",
  category: "Buyer's Field Notes",
  readTime: "7 min read",
  coverImage: {
    src: "/images/blog/panel-fire-evidence-20261020.png",
    mobileSrc: "/images/blog/panel-fire-evidence-mobile-20261020.png",
    width: 1200,
    height: 630,
    alt: "An original comparison graphic separates ASTM E84 surface-burning indices from EN 13501-1 reaction-to-fire classification, and connects both reports to the product and installation.",
    caption: "SourceRating original technical explanatory graphic. AI-generated conceptual editorial image; not a photograph or evidence of a specific project, factory, inspection or product. This is not a test report or a classification conversion."
  },
  sections: [],
  articleBody: [
    { type: "paragraph", text: "A panel quotation can look unusually complete. The supplier has named the core, listed the skins and sent a laboratory report. Next to ‘Fire performance’ sits a reassuring phrase: ASTM E84 Class A. But the project specification asks for EN 13501-1 B-s1,d0. The difference is not a matter of translating two labels into the same language. The buyer has been given an answer to a different test question." },
    { type: "paragraph", text: "This problem is especially easy to miss in modular buildings, cleanrooms and factory fit-outs. One sales catalog may serve North America, Europe and several project-specific markets. The panel name stays the same while the required classification system, and often the permitted mounting arrangement, changes. A quality-looking PDF can be genuine without establishing the reaction-to-fire performance that this particular project asks for." },
    { type: "heading", text: "What the two documents actually measure" },
    { type: "paragraph", text: "ASTM's current catalog identifies E84-26a as the active edition of its test method for surface burning characteristics of building materials. The public description explains that a specimen is exposed under defined conditions and assessed using flame-spread and smoke-developed indices. The test itself does not establish a material as noncombustible, measure fire resistance, or comprehensively predict behavior in an actual building fire. ASTM also warns that mounting support and materials that melt, drip or delaminate can affect what the resulting indices mean. This is a test with a defined method and a limited interpretation, not a universal safety ranking. [ASTM E84 public scope](https://store.astm.org/e0084-26a.html)." },
    { type: "paragraph", text: "EN 13501-1 addresses the classification of construction products from reaction-to-fire test data, considering their end-use application. The BSI catalog identifies BS EN 13501-1:2018 as current. The annex to Commission Delegated Regulation (EU) 2016/364 provides a dated example of the classification framework. Its Table 1 covers construction products other than floorings, linear pipe thermal insulation and electric cables. For those products, the B classification involves different underlying measurements from ASTM E84; the accompanying s and d suffixes describe smoke and flaming droplets/particles. The governing construction-products regime and project specification still have to be identified separately. It is not a translation of the two E84 indices. [BSI classification scope](https://knowledge.bsigroup.com/products/fire-classification-of-construction-products-and-building-elements-classification-using-data-from-reaction-to-fire-tests) · [Commission Delegated Regulation (EU) 2016/364](https://eur-lex.europa.eu/eli/reg_del/2016/364/oj/eng) · [Original Official Journal text in the UK government archive](https://www.legislation.gov.uk/eur/2016/364/pdfs/eur_20160364_adopted_en.pdf)." },
    { type: "paragraph", text: "ASTM E84 is a test method; Class A is a classification applied to its results under the relevant code or specification. A Class A description based on ASTM E84 results should not be confused with European Euroclass A1. An [ICC explanation of the 2009 International Fire Code](https://media.iccsafe.org/news/eNews/2013v10n10/2009_ifc_bcbseries_p78-80.pdf) illustrates that distinction between test indices and a code-assigned class; it is a historical example, not the edition governing every current project. Nor does either surface-reaction label claim that a wall provides an hour of fire resistance. Fire resistance of an assembled element is a separate matter; a buyer who needs a rated partition or fire-separating wall has to identify the applicable assembly performance and its evidence, not borrow a surface index from a skin or coating." },
    {
      type: "illustration",
      src: "/images/blog/panel-fire-methods-desktop-20261026.svg",
      mobileSrc: "/images/blog/panel-fire-methods-mobile-20261026.svg",
      width: 1200,
      height: 760,
      alt: "Two differently structured conceptual report panels distinguish ASTM E84 flame-spread and smoke-developed indices from EN 13501-1 reaction-to-fire classes with smoke and droplet suffixes; no automatic class conversion.",
      caption: "Figure 1. ASTM E84 Class A and EN 13501-1 B-s1,d0 do not translate directly. SourceRating original technical illustration. AI-generated conceptual editorial image; not a photograph or evidence of a specific project, factory, inspection or product."
    },
    { type: "heading", text: "The specimen in the laboratory may not be the panel on the truck" },
    { type: "paragraph", text: "The most revealing page of a report can be the one describing how the specimen was built and mounted. Is it a bare facing sheet, a composite panel, a coated core, or an installed system? Was it fixed directly to a particular backing, installed over an air cavity, jointed or supported in a particular way? A report may describe a product that is recognizable in name but materially different in thickness, density, facing, adhesive, coating or joint arrangement from the material that will reach the project." },
    { type: "paragraph", text: "The UK government's [Approved Document B FAQ](https://www.gov.uk/guidance/approved-document-b-fire-safety-frequently-asked-questions) makes a useful, narrow point: reaction-to-fire classification may depend on the system tested in its configuration, including the form, orientation, substrate, jointing, mounting and fixing. It advises designers to consider a report's field of application against the proposed end use. That is official guidance for England, not a global product-approval rule. But the evidence question travels well: does this result describe the same construction that the buyer is buying and installing?" },
    {
      type: "illustration",
      src: "/images/blog/panel-fire-assembly-desktop-20261026.svg",
      mobileSrc: "/images/blog/panel-fire-assembly-mobile-20261026.svg",
      width: 1200,
      height: 790,
      alt: "Conceptual section through a composite sandwich panel, indicating a facing, insulation core, panel joint, through-fixing and backing rail as configuration fields to compare with the test report; not a tested design.",
      caption: "Figure 2. Product, backing, joint and fixing details may govern the report's field of application. Drawn symbolically, not to scale. SourceRating original technical illustration. AI-generated conceptual editorial image; not a photograph or evidence of a specific project, factory, inspection or product."
    },
    { type: "paragraph", text: "A legitimate fire report can also be out of scope because it tested a prior product revision. If the supplier has changed the core composition, the facing supplier or the adhesive, asking only for the same trade name may conceal a change relevant to the earlier classification. Do not guess whether a particular alteration invalidates the report; ask the responsible testing or classification body and project fire professional to determine what the existing report covers and what requires new assessment. Keep the old and revised configurations identified rather than quietly substituting a new datasheet into the same PDF packet." },
    { type: "heading", text: "Ask for the missing link, not merely another certificate" },
    { type: "paragraph", text: "The first reply to an E84-only submittal need not be ‘Please obtain every possible fire test.’ The buyer should identify the project's actual requirement: the precise classification, intended use, product location, supporting installation and governing jurisdiction. Then ask which EN 13501-1 classification report, if any, covers the proposed product and configuration, including its edition and field of application. Obtain the supporting identification sufficient for the designer or approving authority to connect that report to the delivered panels. If no such report exists, record the shortfall plainly; an ASTM E84 result may remain informative for other purposes without becoming an equivalent approval." },
    { type: "paragraph", text: "A compact comparison statement might read: ‘Offer identifies a composite wall panel with a specified core and facing; project requests EN 13501-1 B-s1,d0 for this installed use; supplier currently provides ASTM E84 surface-burning results for a reported specimen. EN classification and application to the proposed mounting arrangement are not demonstrated by that submission.’ This is suggested record wording, not a real supplier case or a determination that the product fails. The point is to name the evidence gap accurately instead of turning it into a product accusation or a false pass." },
    {
      type: "illustration",
      src: "/images/blog/panel-fire-evidence-chain-desktop-20261026.svg",
      mobileSrc: "/images/blog/panel-fire-evidence-chain-mobile-20261026.svg",
      width: 1200,
      height: 805,
      alt: "An unfilled fictional scope sheet, generic panel sample and symbolic wall arrangement distinguish the tested specimen, the shipped product revision and its intended installation; no real test result is shown.",
      caption: "Figure 3. Connect the report's tested specimen to the ordered product revision and the intended installation before any acceptance decision. SourceRating original technical illustration. AI-generated conceptual editorial image; not a photograph or evidence of a specific project, factory, inspection or product."
    },
    { type: "paragraph", text: "Watch for one more trap. Some countries and projects recognize alternative routes, particular deemed-to-satisfy provisions or a competent authority's accepted engineering assessment. Those possibilities are not created by this article, and the website of a foreign test laboratory cannot grant them. Record the actual contractual or statutory basis and obtain the responsible designer or authority's decision. A private buyer checklist does not override a fire strategy, local law or product-approval process." },
    { type: "paragraph", text: "The distinction between reaction to fire and fire resistance deserves its own conversation before the purchase is released. A reaction-to-fire classification relates to the product's contribution to developing fire under specified test conditions; a fire-resistance requirement concerns an element's performance for a defined duration and function. A quotation that uses ‘fireproof,’ ‘Class A,’ ‘one-hour’ and ‘Euroclass’ interchangeably has not yet established which performance is being promised. Get the requirement and report titles into the same sentence before negotiating the price." },
    { type: "paragraph", text: "The practical outcome is not a longer document checklist. It is a single, traceable connection: the required class → the tested construction → the actual product revision → the intended installed arrangement → the person authorised to accept the evidence. If that connection cannot be made, a lower panel price does not make the missing link disappear." }
  ],
  referencesHeading: "Source record and scope",
  referencesIntro: "Original source record dated 20 October 2026; ASTM, BSI, EUR-Lex and UK government public source pages independently rechecked 26 October 2026. The 2016 EU text was read from the UK government archive of the original Official Journal. Catalog summaries are not the full purchased standards. No supplier report, project approval or universal conversion between classifications is claimed. England-specific guidance is identified as such.",
  references: [
    { title: "Interior Wall and Ceiling Finish and Trim: 2009 IFC explanation", publisher: "International Code Council", href: "https://media.iccsafe.org/news/eNews/2013v10n10/2009_ifc_bcbseries_p78-80.pdf", note: "Historical 2009 International Fire Code explanatory extract, pages 78-80, especially page 79: the code assigns a class using test indices. Used only for that distinction, not as a current universal requirement. No numerical thresholds or source images reproduced." },
    { title: "Regulation (EU) 2016/364: original Official Journal PDF", publisher: "European Commission; archived by legislation.gov.uk", href: "https://www.legislation.gov.uk/eur/2016/364/pdfs/eur_20160364_adopted_en.pdf", note: "Original OJ L 68, 15 March 2016, pages 4-11. Annex Table 1 and notes 5-6 establish the cited B/s/d distinctions and product exclusions. This archive does not establish all subsequent EU regulatory changes." },
    { title: "ASTM E84-26a: Surface Burning Characteristics of Building Materials", publisher: "ASTM International", href: "https://store.astm.org/e0084-26a.html", note: "Active edition and public scope: what flame-spread and smoke-developed indices establish, and the method's stated limitations. No paid standard text reproduced." },
    { title: "BS EN 13501-1:2018: Classification using data from reaction-to-fire tests", publisher: "BSI", href: "https://knowledge.bsigroup.com/products/fire-classification-of-construction-products-and-building-elements-classification-using-data-from-reaction-to-fire-tests", note: "Current catalog edition, classification purpose and relationship to end-use application; not a reading of the full standard." },
    { title: "Commission Delegated Regulation (EU) 2016/364", publisher: "European Commission / EUR-Lex", href: "https://eur-lex.europa.eu/eli/reg_del/2016/364/oj/eng", note: "2016 classification framework under Regulation (EU) No 305/2011; the original text was verified through the official archive linked in this source record. This is a dated classification reference, not a determination of the current regime applicable to every product or project." },
    { title: "Approved Document B: Fire safety - frequently asked questions", publisher: "UK government", href: "https://www.gov.uk/guidance/approved-document-b-fire-safety-frequently-asked-questions", note: "Question 18 explains the tested configuration, field of application and installation context. Jurisdiction: England, not a global rule." }
  ],
  relatedLinks: [
    { title: "More industrial buyer research", href: "/blog", description: "Read SourceRating's free procurement and technical evidence articles." }
  ]
};
