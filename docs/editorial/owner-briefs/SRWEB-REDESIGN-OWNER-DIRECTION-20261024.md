# SourceRating Website 2.0 — Owner Direction / 唯一项目任务书

**Issued:** 2026-10-24 (Asia/Bangkok)
**Authority:** Owner's direction, for original Claude Lead and existing frontend/execution/review agents.
**Website repo:** `Jamescheng2022/sourcerating-website`
**Working branch:** `agent/sr-web-successor-20261016` / Draft PR #21
**Status:** INSTRUCTION ONLY — not a completed feature, code approval, production permission or payment authorization.

## 1. Owner outcome (not merely a Phase 1 audit)

Deliver a polished, useful, **mobile-first SourceRating website Preview**, independently reviewed and ready for Owner acceptance, integrating:

1. **Resources / 免费采购资源导航:** Search/filter by procurement decision, sector, destination and stage. Curate original official sources with bilingual explanations, provenance, review dates and licence caveats; provide a free downloadable SourceRating-authored index. Improve on existing PR #28 (14 linked resources/CSV), do not resell or mirror restricted third-party files.
2. **Intelligence / 深度情报:** Professional investigative procurement writing and the prospective paid subscription path. Writing quality must be evidence-led, differentiated, and deeper than a web summary: primary sources, contradictions, technical/commercial consequences, uncertainties, original buyer decision framework. Free articles must remain fully useful. Do not invent subscription availability, cadence, pricing, customer data or Gumroad membership.
3. **Field Kits / 可下载工具包:** Original, actionable bilingual English/Chinese checklists, decision tables, Excel worksheets, and annotated examples. Respect existing vetted SourceRating P01/P02, preserve approved formulas and review gates. Provide real samples; verified one-time Gumroad links only after product identity, account ownership, permission to charge and download fulfillment are proven.
4. **App / AVP early-access:** A truthful, separate `Coming Soon` or `Early Access / Waitlist` destination for the future SourceRating App. Verify if 'AVP' is merely spoken shorthand for App, not a separate product, before public-facing naming. If a working waitlist form is built, verify consent, data store, anti-spam, deduplication, confirmation and privacy policy. If unavailable, disable submissions and label it clearly Coming Soon. Do not present unlaunched software as live.
5. **Services:** Keep existing factory audit, supplier verification, procurement services and risk-screen reachable while changing the homepage priority from corporate brochure to industry research + utility hub.

**Concept:** Industrial Sourcing Intelligence & Resources — professional editorial + task-led resource navigator + practical digital product storefront. Avoid decorative/generic SaaS gradients, implausible factory imagery and thin SEO filler; borrow user-experience patterns from relevant directories and editorial sites without copying layouts/assets or brands.

## 2. What is already underway — RECONCILE, don't start a parallel rewrite

- **PR #21**: Existing research-first homepage, new navigation, explanation-only `/membership`; READY Vercel Preview had been reported. Independent review and 375/390px validation were not established. Draft, not approved for merge.
- **PR #26**: mobile CTA / header. Prior audit identifies a mechanically derived 320px overflow (~300px need versus ~288px available). Fix; test at real widths, don't downgrade a defect to merely unverified.
- **PR #28**: 14 official-resource links, English/Chinese usage notes and CSV. Rights/CBAM review reported provisionally passed; resource page is not wired into visible navigation and sitemap, so not yet discoverable.
- **Publishing Skill:** `.agents/skills/sourcerating-publish/SKILL.md` and `docs/editorial/SOURCERATING_EDITORIAL_STANDARD.md` are canonical for editorial publication. Existing SourceRating daily task, sole writer/publisher and release chain remain authoritative.
- **App is separate:** `Jamescheng2022/sourcerating` — don't modify app repo while redesigning the website unless separately authorized.

## 3. Execution allocation — Claude Lead owns outcomes

**Claude Lead**: sole Project Lead/release coordinator, conflict resolution, integration, commercial verification, independent QA and final evidence. Must not stop after Phase 1 to ask the owner whether to fix #26 or wire #28. Treat both as internal tasks and delegate them in parallel.

**AGY**: original designated frontend design and implementation executor. Before irreversible redesign, produce **two distinct mobile-first options** for homepage, resources search, long-form reading, kit detail and app preview/waitlist. Start with 320px and 390px and include desktop composition. Lead selects based on documented evidence and owner preferences, then executes in one integrated **isolated** branch/PR. No separate publisher or conflicting Lead.

**Independent reviewer/Codex**: review exact integrated SHA, technical correctness, rights/claims, accessibility, responsive usability, tests and regressions. Earlier self-claimed approval does not certify a newer revision.

Work may be parallelized under the same Lead:
- A: Fix known 320px overflow; 320/375/390px evidence.
- B: Reconcile #21/#26/#28 files; integrate resource nav, sitemap and search/filter.
- C: Frontend design and cohesive implementation, including article/kit/App states.
- D: Read-only Gumroad real merchant/product SKU/link verification; paid routes fail closed if products or seller authority unverified.
- E: Independent responsive and user-journey tests, build/typing/lint and content regression checks.

## 4. Non-negotiable decision & security gates

- **Allowed within this owner request:** inspect repositories, review designs, create isolated frontend revisions, build/test previews, repair known UI defects, use connected tools for read-only verification and submit integrated PR with reproducible evidence.
- **Not authorized by this memo:** merge/deploy production, change merchant account/billing/secrets, activate real subscriptions or charge cards, send external email, or collect personal waitlist data through an unapproved mechanism.
- Never invent real Gumroad product/URL/SKU, working checkout, paying members, successful delivery, App release date, waitlist signups, customer feedback or repository-reader acknowledgements.
- Free official sources should be linked to original publishers by default. File-level redistribution/translation permissions and source currency must be checked before mirroring or repackaging.
- Current paid research P01/P02 and pilots are work in progress and must remain differentiated from already paid/verified merchant products.

## 5. Acceptance criteria — evidence, not status prose

**Product:** Search, topic/resource filters, bilingual content, deep-article reading, product previews, verified purchase links when truly available, truthful App waitlist/Coming Soon, retained services and blog URLs.

**Mobile:** Actual screenshots/verification at 320, 375, 390, 430, 768, 1024 and 1440px; no horizontal overflow, readable diagrams/tables, keyboard focus, tap targets and usable navigation/search.

**Build/review:** TypeScript/build/lint, known editorial publication tests, real links/CSV download, sitemap/index/metadata and independent reviewer verdict on exact final PR SHA. No old article or source evidence regression.

**Release:** One integrated PR, ready Vercel Preview URL, final commit SHA, screenshots and test records, any unresolved issues and precise owner-only approval needs. Production merge/deploy and live checkout remain gated by explicit Owner decision. State Preview vs Production accurately.

## 6. GitHub project communication and receipt

This file is **canonical owner direction inside the SourceRating website repository**, for the existing Claude Lead to consult while working on PR #21 and related PRs. It does not create a new Lead, new bus, independent scheduler or additional source of truth.

**Important:** A Git commit, PR comment or markdown file is not proof that Claude Lead automatically detected, read or accepted the instructions. The repo's Publishing Skill expressly says it is **not an autonomous scheduler**. Original Claude Lead should provide a specific **ACK citing this file's path and current commit**, then report progress/evidence via the original project's existing receipt path. Do not claim receipt or execution before real readback.

Owner expects continuous progress to the *full Preview acceptance outcome*, not an endless sequence of Phase-1 audit reports or minor technical decisions.

### Related links
- Existing redesign PR: https://github.com/Jamescheng2022/sourcerating-website/pull/21
- Known responsive fix PR: https://github.com/Jamescheng2022/sourcerating-website/pull/26
- Free bilingual resources PR: https://github.com/Jamescheng2022/sourcerating-website/pull/28
- Original scope note: https://github.com/Jamescheng2022/sourcerating-website/pull/21#issuecomment-6378335401
