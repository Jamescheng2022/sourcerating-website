# SourceRating Website: shared-repository execution handoff
**Date:** 2026-10-24 · **Decision owner:** site owner · **Coordinator:** original Claude Lead only · **Frontend executor:** AGY
**Repository:** Jamescheng2022/sourcerating-website (website); **distinct app:** Jamescheng2022/sourcerating
**Status:** APPROVED SCOPE FOR RESEARCH, PREVIEW DEVELOPMENT, AND TESTING; NOT authorization to merge, publish, activate payments, or collect new personal data.

## Why this document lives here
The owner prefers one project GitHub repository as the shared reference for the project, rather than copying the same instructions through multiple relay systems. This file is a versioned scope/acceptance document inside the existing website repository, on the isolated resources pilot branch. Its presence in GitHub **does not prove any Lead watcher or auto-poll has run**. The original Claude Lead should explicitly acknowledge reading it and attach the resulting work to this repository.

## Business goal — more than a cosmetic facelift
Make SourceRating a **mobile-first industrial sourcing intelligence and resource-navigation destination**, not a generic SaaS sales brochure:
- **Free Resource Library:** highly usable task/industry/region search and filters, official source links, provenance dates, licence cautions, and English-Chinese usage notes; keep third-party files on the original publisher sites unless redistribution rights are individually verified. Use PR #28 and its 14-entry curated CSV as a starting point, not a finished library.
- **Intelligence:** free full-value reporting and a deeper subscription-style research lane for original, dated, reproducible procurement intelligence. Do not pretend membership payments or access controls are live until actually verified.
- **Field Kits:** specific, usable original bilingual workbooks, evidence-request templates and annotated worked examples; direct purchasers to only verified SourceRating Gumroad offers. Existing P01/P02 and bilingual pilots require technical/translation independent review; do not break formula integrity.
- **App early access:** a dedicated honest SourceRating App Coming Soon/Early Access page. Owner said “AVP” in speech; verify whether this refers to the SourceRating App. If the early-access form cannot be implemented with approved consent, secure storage, deduplication and anti-abuse, ship an honest noninteractive Coming Soon Preview instead of an inert or fake-success form.
- **Services:** retain working supplier checks, risk screen, inspection and procurement inquiry pathways in sensible secondary navigation.

## Existing PRs: audit and integrate, don't blindly merge
- **PR #21** Draft: research-first homepage, mobile navigation, explanation-only membership. Prior Vercel Preview READY, but independent review and 375/390px evidence were not accepted. GitHub currently reports mergeable=false; investigate head/main conflicts instead of assuming it can merge.
- **PR #26**: known mechanical width defect at 320px (CTA/header), not merely a missing screenshot. Fix with actual viewport tests before approving.
- **PR #28** Draft: free /resources and 14 bilingual records, source/rights/CBAM checks reviewed, but header discoverability/sitemap remain missing. Integrate with #21 in a single combined design rather than separate risky merges.
- Preserve existing article slugs, content, source records, SEO, /playbook, /buyer-decisions, /services, /pricing and /risk-screen. No cross-repo App production changes. One writer per file and one authorized production release owner.

## Who executes what
- **Claude Lead:** owns integrated outcomes, reconciles the three PRs, assigns AGY and an independent reviewer under the existing team/BOARD, solves ordinary blockers without asking the owner which minor fix comes first. Can run design, code changes on isolated branches, Vercel Preview and QA under this scope.
- **AGY:** research current professional directories/editors/technical libraries (e.g., Thomasnet for search workflows, Supply Chain Dive for reading, Freightos for tool/navigation layout, without cloning), offer 2 meaningfully different mobile-first designs, implement selected components via one integrated code branch and PR.
- **Independent Codex/reviewer:** technical UX/accessibility/visual/source/payment-path QA with explicit PASS/REVISE/FAIL and referenced evidence, not a self-written acceptance verdict.
- **Owner gate only:** final production merge/deployment, activation of real pricing/checkout/merchant accounts, new personal-data collection, or material business change.

## Information architecture (proposed, validate through buyer research)
Searchable home → /resources → /intelligence and free articles → /kits and validated Gumroad purchases → /app (coming soon / early access) → professional services. Avoid vague “AI-powered” claims, oversized heroes and decorative grid-card overload. Mobile search/navigation and editorial readability outrank effects.

## Tests & concrete acceptance
1. Actual working search/filter (mobile keyboard, no-results, zero-loading and broken-source states), links, free CSV retrieval, content discoverability in header/footer/sitemap.
2. Real browser screenshots and interaction at 320, 375, 390, 430, 768, 1024 and 1440px. Fix existing #26 overflow, include accessible controls, mobile 44px targets and legible Chinese/English typography.
3. Existing article URLs, canonical metadata, source references, image rights, privacy/analytics and original SourceRating service contact flows preserved.
4. Gumroad offers and subscription benefits verified against actual merchant/product links and customer fulfilment before enabling buttons. Unverified: clearly disabled/waitlist, no invented price/revenue/test transactions.
5. App page reflects actual app state; waitlist collects nothing unless approved and technical/privacy safeguards pass. A design mock must never pretend to have saved an email.
6. npm tests/build/lint, independent review, Vercel Preview URL, screenshots, tested paths and an evidence-based defects/limitations list on ONE integrated PR. Original Claude Lead controls final handoff for owner's production decision.

## Execution behavior — no stalled audit loop
Treat the earlier Phase 1 PR checks as sufficient to **start parallel remediation and design** now. Don't ask the owner whether to fix #26 or wire #28; these are ordinary subtasks. If some browser host is missing, use an approved alternative or mark that acceptance test pending, without halting unrelated implementation. Do not treat the existence of this file, a code commit, a GitHub comment or a READY Preview as proof of final release.

## Status reporting
Use the same website repo's single consolidated implementation PR for code/test evidence, with commit hashes, Preview link and unresolved blockers. Explicitly acknowledge this file via the existing Claude Lead channel. This document supersedes **only routing instructions** that suggested a separate manual paste or duplicate task; existing owner gates and operational rules remain unchanged.

**Goal:** a polished, genuinely navigable and independently verified SourceRating Preview ready for user testing and owner's final approval—not another review-only reply or a request to select routine subtasks.
