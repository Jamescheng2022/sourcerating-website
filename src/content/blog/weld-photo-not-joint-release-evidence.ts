import type { BlogPost } from "@/data/blog";

export const weldEvidencePost: BlogPost = {
  slug: "weld-photo-not-joint-release-evidence",
  title: "The Weld Looks Good in the Photo. Which Joint Was Actually Inspected?",
  seoTitle: "Weld Photos vs Traceable Weld Evidence: What Buyers Should Ask Before Release",
  excerpt: "A clean weld photograph shows that somebody looked. It does not say which joint, on which member, to which drawing revision, was examined against which acceptance basis. Buyers need those links before release.",
  date: "2026-10-23",
  category: "Buyer's Field Notes",
  layout: "editorial",
  readTime: "6 min read",
  sections: [],
  coverImage: {
    src: "/images/blog/weld-photo-evidence-hero-20261023.svg",
    width: 1200,
    height: 810,
    alt: "Conceptual illustration contrasting a weld photograph with the drawing, member mark and inspection record needed to identify the joint.",
    caption: "SourceRating original editorial illustration. Not a photograph or record of any actual supplier, weld or inspection."
  },
  articleBody: [
    { type: "paragraph", text: "A supplier sends a persuasive photograph of a welded steel connection. The bead is visible, the fit-up appears tidy, and the workshop looks busy. The buyer files the image under quality evidence. Later, the project inspector asks a simpler question: which weld, on which member, to which drawing revision, was actually examined? The photograph has no answer." },
    { type: "paragraph", text: "This is not an argument against photographs. A carefully identified image can be excellent evidence of a particular stage of work. The problem begins when an attractive image is asked to establish facts that are not visible in it: material identity, qualified welding conditions, examination scope, acceptance criteria or release authorization." },
    { type: "heading", text: "Start with the identity of the joint" },
    { type: "paragraph", text: "The [American Institute of Steel Construction's fabrication guidance](https://www.aisc.org/aisc/solutions-center/engineering-faqs/2-general-fabrication/) draws a useful distinction between material identification and traceability. Identification establishes that a specified material grade and size are being used. Traceability links a particular piece of steel to its mill test report across the work. These are related controls, but they are not synonyms, and full piece-by-piece traceability must not be assumed on every project." },
    { type: "paragraph", text: "For an outsourced steel assembly, the photo becomes more useful when it carries a member mark, an identifiable joint or weld reference and a drawing revision. Those identifiers should agree with the drawing register and the relevant quality record. Without a common identifier, a clean-looking weld in a photograph could be almost any weld on almost any assembly." },
    {
      type: "illustration",
      src: "/images/blog/weld-identity-desktop-20261023.svg",
      mobileSrc: "/images/blog/weld-identity-mobile-20261023.svg",
      width: 1200,
      height: 735,
      alt: "Annotated steel joint with labels for drawing revision, member mark and weld identity.",
      caption: "Figure 1. SourceRating original editorial illustration with illustrative IDs. Not a fabrication drawing, welding procedure or specific inspection."
    },
    { type: "paragraph", text: "That does not mean every supplier must produce a costly tracking system for every small bracket. The applicable project documents, risk and contractual requirements set the needed level of records. An AISC certification standard, for example, is not a universal substitute for the buyer's project specifications. Ask for the links that the order actually depends on." },
    { type: "heading", text: "A procedure, a qualification and an inspection do different jobs" },
    { type: "paragraph", text: "A welding procedure specification (WPS) describes the controlled method to be used for a defined application. Welder qualification evidence addresses the person's ability to perform within the applicable qualification range. An inspection report records what was examined and against which acceptance basis. None of the three, considered alone, proves that a particular shipped joint has met every relevant requirement." },
    { type: "paragraph", text: "[AWS describes D1.1/D1.1M:2025-AMD1](https://cm.aws.org/standards-and-publications/codes-and-standards/d1-1/) as a structural steel welding code addressing procedure and welder qualification, inspection and acceptance. The project must identify its applicable code, edition and amendments; the fact that this edition exists does not make it applicable to every international order. Likewise, the [AISC 207-25 certification standard](https://www.aisc.org/aisc/publications/current-standards/aisc-207/) establishes requirements for relevant certified participants and their systems, rather than certifying a specific weld in a purchase order." },
    {
      type: "illustration",
      src: "/images/blog/weld-records-desktop-20261023.svg",
      mobileSrc: "/images/blog/weld-records-mobile-20261023.svg",
      width: 1200,
      height: 710,
      alt: "WPS, welder qualification and inspection report shown as different evidence categories.",
      caption: "Figure 2. SourceRating original conceptual graphic. Not authentic company records or a universal document list."
    },
    { type: "paragraph", text: "A supplier might share a WPS and a welder certificate in good faith while the buyer still lacks the identified inspection result for the welded assembly. That is a documentation gap, not proof of defective work. Conversely, a one-page inspection record without the referenced joint, method or applicable acceptance criteria may be too ambiguous to support release. The point is to connect the evidence rather than maximize the number of PDFs." },
    { type: "heading", text: "Release is a decision made against the order" },
    { type: "paragraph", text: "Before dispatch, decide what constitutes an accepted assembly under the purchase order: the agreed drawing revision, material grade, member and weld identifiers, required inspection stages and methods, the governing acceptance basis, treatment of any nonconformances, and who is authorized to release the goods. Then ask the fabricator to connect those elements in a compact evidence packet. The necessary depth will differ for ordinary fabrications, critical connections and regulated work." },
    { type: "paragraph", text: "[AISC's welding-inspection discussion](https://www.aisc.org/aisc/solutions-center/engineering-faqs/9-welding-inspection-and-non-destructive-examination-nde/) explains that visual inspection and additional nondestructive examination do different jobs, and that applicable requirements govern inspection tasks and scope. A crisp smartphone image cannot establish an ultrasonic-testing result; equally, the absence of an ultrasonic-testing report does not prove that the contract required one. Ask what was specified, what was performed and what decision the result supports." },
    {
      type: "illustration",
      src: "/images/blog/weld-release-desktop-20261023.svg",
      mobileSrc: "/images/blog/weld-release-mobile-20261023.svg",
      width: 1200,
      height: 690,
      alt: "Four release gates, from visible appearance through authorized disposition.",
      caption: "Figure 3. SourceRating original conceptual buyer illustration. Not a welding acceptance procedure, structural design approval or release form."
    },
    { type: "paragraph", text: "For a remote purchase, the most revealing question is often: \"Please show me the record that links this photographed joint to the released member on our packing list.\" A capable fabricator may answer with a drawing mark, a traceable inspection sheet and a short reference to the approved release package. If the answer is only another photograph, the buyer has learned something important about the evidence available, not necessarily about the steel's intrinsic quality." },
    { type: "paragraph", text: "Good photography shows that somebody looked. Good traceability lets the next person determine exactly what they were looking at. Industrial procurement needs both, but it should never confuse one with the other." }
  ],
  referencesHeading: "Source notes",
  referencesIntro: "Official primary sources checked on 23 October 2026. This buyer note is not a project-specific engineering approval or welding acceptance procedure; the contract and the applicable code edition control.",
  references: [
    { title: "Engineering FAQs: General Fabrication", publisher: "American Institute of Steel Construction (AISC)", href: "https://www.aisc.org/aisc/solutions-center/engineering-faqs/2-general-fabrication/", note: "Distinguishes material identification from piece-by-piece traceability to mill test reports." },
    { title: "AISC 207-25 Certification Standard", publisher: "American Institute of Steel Construction (AISC)", href: "https://www.aisc.org/aisc/publications/current-standards/aisc-207/", note: "Requirements for certified participants and their systems; it does not certify a specific weld in a purchase order." },
    { title: "D1.1/D1.1M:2025-AMD1 Structural Welding Code: Steel", publisher: "American Welding Society (AWS)", href: "https://cm.aws.org/standards-and-publications/codes-and-standards/d1-1/", note: "Publisher overview of scope: procedure and welder qualification, inspection and acceptance. Project documents decide which code edition applies." },
    { title: "Engineering FAQs: Welding Inspection and NDE", publisher: "American Institute of Steel Construction (AISC)", href: "https://www.aisc.org/aisc/solutions-center/engineering-faqs/9-welding-inspection-and-non-destructive-examination-nde/", note: "Visual inspection and nondestructive examination serve different purposes; applicable requirements set inspection tasks and scope." }
  ],
  relatedLinks: [
    { title: "Verify a Chinese steel structure supplier before paying a deposit", href: "/blog/verify-chinese-steel-structure-supplier-before-deposit", description: "Check the supplier before the order, then use traceable evidence before release." },
    { title: "Pre-shipment inspection for engineering materials", href: "/blog/pre-shipment-inspection-engineering-materials", description: "Connect inspection coverage and exceptions to the actual release decision." }
  ]
};
