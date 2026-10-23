import type { BlogPost } from "@/data/blog";

export const acceptanceSamplingPost: BlogPost = {
  slug: "accepted-sampling-lot-not-zero-defects",
  title: "The Shipment Passed Inspection. That Does Not Mean Every Piece Passed.",
  seoTitle: "Acceptance Sampling: What a Passed Inspection Means for Your Shipment",
  excerpt: "A lot-acceptance decision and a count of all defective pieces are different things. Buyers need to settle that distinction before an inspection report becomes a release instruction.",
  date: "2026-10-21",
  category: "Buyer's Field Notes",
  layout: "editorial",
  readTime: "5 min read",
  sections: [],
  coverImage: {
    src: "/images/blog/acceptance-sampling-field-note-20261021.svg",
    mobileSrc: "/images/blog/acceptance-sampling-field-note-mobile-20261023.svg",
    width: 1200,
    height: 900,
    alt: "Conceptual diagram separating the complete shipment, the selected inspection sample and the resulting lot decision.",
    caption: "Original editorial diagram. The sample is not the shipment; no real inspection results or recommended sample sizes are depicted."
  },
  articleBody: [
    { type: "paragraph", text: "The most consequential word in a pre-shipment inspection report may be the shortest: pass. A purchasing manager can read it as permission to release payment. A warehouse can read it as confirmation that every box is sound. An inspector may mean something much narrower: the observations met the acceptance rule for the sample examined." },
    { type: "paragraph", text: "Those interpretations need to be reconciled before the goods leave the factory. Otherwise the first defective piece found on arrival can turn a technically valid inspection into an argument about a promise nobody actually made." },
    { type: "heading", text: "A decision about a lot, not a census of its defects" },
    { type: "paragraph", text: "The [NIST engineering statistics handbook](https://www.itl.nist.gov/div898/handbook/pmc/section2/pmc21.htm) draws a useful distinction: acceptance sampling is primarily intended to support acceptance or rejection of a lot, rather than estimate its precise quality. A sample is selected from the lot and assessed against a specified plan. That procedure is not the same as inspecting every item." },
    { type: "paragraph", text: "Consequently, a passed sample does not establish that the shipment contains no defects. Nor should the percentage found in a small sample be presented as an exact count for the unexamined goods. These are different claims, requiring different evidence. The inspection report should state which claim its work supports." },
    { type: "illustration", src: "/images/blog/acceptance-sampling-pass-not-guarantee-20261022.svg", width: 900, height: 1125, alt: "Portrait contrast diagram: acceptance sampling PASS supports accepting the defined lot under an agreed plan but does not establish zero defects or 100 percent inspection.", caption: "A passing lot decision is not a claim that every unit was examined or every defect excluded. Original conceptual infographic, not an actual inspection result." },
    { type: "paragraph", text: "NIST also explains the trade-off through an [operating-characteristic curve](https://www.itl.nist.gov/div898/handbook/pmc/section2/pmc232.htm): a sampling plan has different probabilities of accepting lots at different underlying defect levels. Producer's and consumer's risks are part of choosing the plan. The practical lesson is not that sampling is unreliable. It is that sampling involves agreed decision risks, not a promise of certainty." },
    { type: "heading", text: "The inspector needs more than an AQL number" },
    { type: "paragraph", text: "An RFQ that says only 'AQL inspection required' leaves important purchasing decisions unresolved. Which lot does the inspection cover? Which characteristics are checked? How are defects classified? Who selects the sample? What happens after rejection? NIST's [description of a single sampling plan](https://www.itl.nist.gov/div898/handbook/pmc/section2/pmc23.htm) makes clear that sample size and the acceptance number are specific parts of the plan. A headline quality level is not the complete instruction." },
    { type: "paragraph", text: "For an industrial order, start by identifying the goods the decision will release. A shipment containing several product types, manufacturing batches or revisions should not silently become one undifferentiated inspection population. Ask the quality professional responsible for the plan to explain how those differences are treated. This is a procurement question about coverage, not a recommendation to select a particular sample size from this article." },
    { type: "illustration", src: "/images/blog/acceptance-sampling-lot-scope-20261022.svg", width: 900, height: 1125, alt: "Portrait technical illustration of a shipment containing different batches or revisions and a smaller sample selected for particular inspected characteristics.", caption: "Lot definition, sampling coverage and inspected characteristics must be agreed before the result is used. Illustrative categories; not actual sample sizes." },
    { type: "paragraph", text: "Next, describe defects in terms that the factory, inspector and receiving team can apply consistently. A scratch that is tolerable on hidden packaging is not automatically tolerable on a sealing surface. A dimension measured against an obsolete drawing is not a useful pass for the current revision. Record the requirement, its reference and the classification before inspectors are looking at a finished batch and negotiating what counts." },
    { type: "heading", text: "Release instructions should preserve the limits" },
    { type: "paragraph", text: "A useful report links its lot identity to the packing list, names the inspected characteristics, identifies the applicable plan and records what the sample actually contained. The release decision should also carry forward unresolved deviations, agreed concessions and any checks outside the inspection scope. An inspection of appearance does not silently become a functional test." },
    { type: "illustration", src: "/images/blog/acceptance-sampling-release-documents-20261022.svg", width: 900, height: 1125, alt: "Four-stage documentary evidence map linking lot identities, inspection plan, sample findings and unresolved exceptions with the released packing register.", caption: "Four separate pieces of release evidence help preserve the limits of PASS through dispatch. Original buyer-side editorial framework, not a quotation from a standard." },
    { type: "paragraph", text: "Consider asking for release wording such as: 'Lot accepted under the agreed sampling plan for the listed characteristics; outstanding exceptions are recorded separately.' This is suggested buyer-side wording, not a quotation from a standard. It communicates substantially more than a green pass box without pretending to guarantee each uninspected piece." },
    { type: "paragraph", text: "Define the rejection route as well. A failed lot may require segregation, corrective work and a properly agreed reinspection. Simply replacing the visibly bad sample pieces and asking the inspector to look again should not be an unrecorded shortcut. What happens next belongs in the inspection arrangement, not in an improvised conversation at the loading bay." },
    { type: "paragraph", text: "Sampling is useful precisely because inspecting everything can be impractical, expensive or destructive. Keep that advantage, but do not ask the report to say more than the work performed. Before approving dispatch, ask one final question: does everyone understand the same meaning of pass?" },
    { type: "paragraph", text: "For the wider release record, read our [pre-shipment inspection guide](https://www.sourcerating.com/blog/pre-shipment-inspection-engineering-materials)." }
  ],
  referencesHeading: "Source notes",
  referencesIntro: "Official NIST explanatory guidance checked on 21 October 2026. These sources explain statistical principles; they do not select a project sampling plan or replace the contractually adopted inspection standard.",
  references: [
    { title: "What is Acceptance Sampling?", publisher: "NIST/SEMATECH Engineering Statistics Handbook", href: "https://www.itl.nist.gov/div898/handbook/pmc/section2/pmc21.htm", note: "Purpose and limits of lot acceptance sampling, including the distinction from estimating lot quality." },
    { title: "How do you Choose a Single Sampling Plan?", publisher: "NIST/SEMATECH Engineering Statistics Handbook", href: "https://www.itl.nist.gov/div898/handbook/pmc/section2/pmc23.htm", note: "Explains sample size and acceptance number. Historical examples are not a recommendation to adopt an obsolete standard." },
    { title: "Choosing a Sampling Plan with a Given OC Curve", publisher: "NIST/SEMATECH Engineering Statistics Handbook", href: "https://www.itl.nist.gov/div898/handbook/pmc/section2/pmc232.htm", note: "Explains acceptance probabilities and producer/consumer risk. No example numerical plan is reproduced or prescribed here." }
  ],
  relatedLinks: [{ title: "Pre-shipment inspection for engineering materials", href: "/blog/pre-shipment-inspection-engineering-materials", description: "Connect inspection coverage and exceptions to the actual release decision." }]
};
