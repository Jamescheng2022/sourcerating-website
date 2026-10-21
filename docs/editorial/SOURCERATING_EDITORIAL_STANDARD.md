# SourceRating Editorial Standard · 2026-10-19

**Editorial promise:** Report like an industrial journalist, reason like an engineer, and frame questions as a buyer would. Provide useful evidence; do not make the buyer's decision for them.

This is a voice and presentation standard for SourceRating website articles and LinkedIn writing. It is not a prompt to mimic a named writer's exact style.

## What every piece should earn

1. **A reader worth serving.** Name the actual reader and the decision or uncertainty they face before choosing a topic.
2. **One editorial question.** Prefer an original, sharp angle over an encyclopedic title. Opening paragraphs must answer *why this matters now or in practice* without generic introductions.
3. **Visible intellectual work.** Separate confirmed facts, source claims, interpretation and unresolved facts. Offer at least one specific insight, distinction, documented mechanism or comparison not found in a shallow web summary.
4. **Natural prose.** Write continuous paragraphs with rhythm, reasonable variation in sentence length and a discernible authorial point of view. Remove habitual repetition, unnecessary hedging, synthetic “imagine a buyer” case studies, six-step lists and ornamental slogans.
5. **Precision without a lawsuit attached to every sentence.** Put source limits where they belong. Do not repeat the same disclaimer in the introduction, body, FAQ and sources.
6. **Proof before claim.** Prefer official standards/purchasers/project owners, technical associations, original filings and material documentation. Date and scope volatile material. Attribute corporate self-reports; never invent interviews, factory visits, procurement events, buyer quotes, prices, certifications or inspection outcomes.
7. **A real ending.** The final paragraph should leave the reader with an insight, practical question or useful next reading—not a generic summary of what was already said.

## Three editorial families (choose one; do not make every article identical)

- **Industry Intelligence:** an event/filing/project change, its evidence, implications and unknowns; story and sources first.
- **Buyer's Field Notes:** one hard buyer question, a decisive explanation of the underlying technical/commercial issue, practical evidence, restrained references.
- **Deep Research:** linked data, market/technical comparisons, contradictions, limitations, reproducible source trail.

Use only components the story needs. Neither FAQ, a direct-answer callout, a takeaways card, a table, a checklist, nor a numbered six-step sequence is mandatory. Word count follows the scope; avoid both arbitrary 2,000-word padding and thin keyword pages.

## Visual editing

- Favor evidence diagrams, accurately labeled photo documentation (with permission), annotated drawings, material/process close-ups, real comparison tables and carefully art-directed editorial illustration.
- **Publication blocker (owner revision 2026-10-22):** every new or revised article requires one cover **and** a minimum of 2 distinct inline figures (≤600 English body words), 3 (601–1,200), or 4 (>1,200). These are minimums, not decorative quotas; achieve richness through distinct factual visual explanations. If useful/rights-cleared figures are unavailable, hold publication and improve the research rather than padding with stock.
- Label generated or conceptual visuals clearly as **illustration / not a photograph or inspection record of a specific project**. Never imply a generated image documents an actual supplier, worker, defect or test result.
- Always provide alt text, attribution/rights, a factual caption and a mobile readability check. Do not put essential meaning exclusively in tiny letters within an image.
- Reading column: about 680–760 CSS px; body type about 17–18px with generous line spacing. Use open spacing, restrained colors and minimal boxed callouts. Tables must work on small screens.


### Image-rich mobile reading and independent review — mandatory

Place actual `articleBody` illustration blocks **inside the narrative at different sections**, not just a hero or gallery. Mobile figure and caption must be large enough to read without zooming or horizontal swiping; for wide data-rich diagrams create a real mobile-specific vertical representation, not a renamed resized copy. Accept factual process photography, annotated product details, standards-scope comparisons, buyer decision diagrams and proven provenance; avoid fake evidence, unnecessary decorations, repeated visual concepts and unclear licensing. A LinkedIn image does not satisfy on-site body artwork.

A separate reviewer must produce an explicit `IMAGE_EDITORIAL_PASS` tied to the **exact final post version and media**: number and diversity, factual correspondence with text, licensing/provenance, caption/alt accuracy, phone readability, absence of made-up inspections. An automated count can fail missing media but never award editorial merit. Without `IMAGE_EDITORIAL_PASS`, the draft remains held; the GitHub preflight additionally **fails** numeric and structural minimums for every new or substantively changed article. Published older articles are queued for upgrades; any revision must meet the new floor before re-release. Production acceptance reads back the public cover, every inline figure, mobile variants and SHA-matched image files.

## Free content and future paid depth

The free story must stand alone and repay the reader's time. Any paid report must add **substantively new** evidence or utility: sourced company/market datasets, reproducible comparison, model-ready tables, annotated document examples, destination-specific requirements or actively maintained research. Do not hide the actual answer just to drive a purchase. Do not claim a member product or deliverable exists until it does. Keep site content separate from SourceRating AI workspace product positioning.

## LinkedIn: one original picture-led professional item per day

- Prioritize an independently readable 200–450-word field insight or longer native article only where warranted. Do not paste the site's first paragraph and call it a fresh post.
- Start with a single observation, question or useful contradiction; support with 1–3 concrete details. Keep calls to action soft, usually one relevant site link.
- Use one editorial image or explanatory graphic when it genuinely improves comprehension. Prepare a 4:5 or landscape asset with the correct platform-supported format and alt text, not an assumed SVG upload.
- No fabricated lived experience or implied visit to factories. No near-duplicate social posts, engagement bait, mass hashtags or unauthorized contact outreach. No automatic claim of posting without an actual LinkedIn permalink/account readback.
- SourceRating article -> LinkedIn original angle -> relevant deeper study is the connection; LinkedIn must also be valuable without clicking.

## Publish and quality gate

- Check current article inventory, drafts, prior PRs, original source records and the exact target repository to prevent duplicates.
- Independently verify factual claims and live links; a writer's own final pass is not an independent reviewer.
- Site changes: isolated branch/PR -> Vercel Preview and code check -> agreed regular content release gates -> merge -> production READY -> public page, image, metadata, blog index and sitemap readback. Report every state separately.
- Social changes: check original LinkedIn owner, connected posting network, previous day/post history, image rights and current permissions. A Markdown draft and a scheduled item are not a published LinkedIn article.
- Current production site repository: `Jamescheng2022/sourcerating-website`; do not confuse with `Jamescheng2022/sourcerating` application repository.
- The owner-approved SourceRating daily task remains the sole daily source of website/editorial production. Do not create a competing content pipeline or a second daily task without reconciliation.

## Editorial litmus tests

- Would an engineer learn something specific here that would survive without the summary boxes?
- Could a buyer use the evidence request to communicate with a vendor?
- Does the prose sound like one editor with a useful point, rather than a model required to fill every section?
- Is the image valuable without pretending to be evidence?
- Is the content worth reading even if the reader never contacts us?
