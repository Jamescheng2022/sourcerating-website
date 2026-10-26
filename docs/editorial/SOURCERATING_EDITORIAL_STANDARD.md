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
- **Owner override (2026-10-25): mandatory independent figures.** Every website article needs at least one cover image; its *body* needs at least two separate useful inline figures when up to 600 English words, three for 601–1200 words, and four above 1200 words. Count distinct article-body subjects, **not** cover, mobile rendition, OG image, a prompt, or a Library-only asset. Do not pad counts by recoloring, resizing or reframing one subject. Longer work should add figures naturally where needed. If a genuinely defensible illustration cannot be made, **hold the article** for editorial resolution; do not silently waive the owner's threshold.
- **Default photographic standard:** authentic permitted industrial photography, or physically plausible **high-resolution AI editorial concepts** in the manner of restrained industrial documentary photography. Credible components, joints, tools, machines, people, workflow, scale, natural light, texture and perspective are more important than stylization. No cartoons, simplified flat vectors, toy-like CGI, multi-image collages or text-heavy poster panels as routine coverage. An accurate verified technical schematic is an exception only when precise geometry, apparatus internals, standards relationships or load-path explanation would be misleading as a photo; the reviewer must record the exception's actual information value.
- **Generated art disclosure (each AI concept, cover and inline):** the alt, caption and source/rights record must all clearly distinguish concepts from real evidence and include: “AI-generated conceptual editorial image; not a photograph or evidence of a specific project, factory, inspection or product”. Avoid fabricated certificate numbers, test values, named project marks, logos, acceptance labels or assertions of compliance. Never use a conceptual test setup or generated instrument screen as proof.
- **Actual files:** retain full-resolution original raster bytes under `public/images/blog/`, a separately usable `mobileSrc` for wide/text-heavy figures and responsive natural subject framing; independently check legibility at 320/375/390/430 CSS px. Stage every image with article path, alt, caption, rights/source note, file SHA and an editorial reason why the figure adds a different insight. For LinkedIn, stage a high-quality JPG/PNG (prefer portrait 4:5), not a stand-in SVG or unmounted prompt.
- **Independent IMAGE_EDITORIAL_PASS:** photo realism and engineering plausibility are qualitative gates, **not CI/build checks**. Claude Lead alone grants the exact-head review verdict after inspecting each actual image at desktop and narrow width; record explicit fail/pass per figure, covering physics, provenance, distinct insight, linkage to adjacent prose, mobile legibility and copyright. Structural files, alt and captions present, Preview READY, image count met or writer self-review do not imply PASS. Missing review or a visual reject means **HOLD—not merge/publish**.
- Label generated or conceptual visuals clearly as **illustration / not a photograph or inspection record of a specific project**. Never imply a generated image documents an actual supplier, worker, defect or test result.
- Always provide alt text, attribution/rights, a factual caption and a mobile readability check. Do not put essential meaning exclusively in tiny letters within an image.
- Reading column: about 680–760 CSS px; body type about 17–18px with generous line spacing. Use open spacing, restrained colors and minimal boxed callouts. Tables must work on small screens.

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

## Ownership override — 23 October 2026 (owner-confirmed)

ChatGPT is the website editorial researcher, author and producer of actual images. ChatGPT stages complete typed `BlogPost` source + registry import + image bytes/captions/mobile variants in the **existing single content Draft PR**. Claude Lead is the sole independent editorial/visual reviewer, fixer/coordinator and **only final website publisher**. Do not authorize ChatGPT, Codex or AGY to merge `main` or deploy production by default; they may assist within Lead's existing chain but not replace the gate. Release requires Lead's review on the exact final head SHA, CI, browser/mobile visual verification, merge/deploy receipt and production readback. Any prior workflow text suggesting ChatGPT self-publication is superseded by this direction. Reuse the canonical agent-bus and original daily task, not a second writer, scheduler, Lead or publisher.
