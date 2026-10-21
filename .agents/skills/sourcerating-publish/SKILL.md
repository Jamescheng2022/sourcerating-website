---
name: sourcerating-publish
description: Research, edit, illustrate, check, publish and verify SourceRating.com website buyer-research articles via the canonical GitHub repository and Vercel. Use for new or revised industrial sourcing articles, magazine visuals, blog publishing failures, daily article operations and their release receipts.
---

# SourceRating website publisher

**Canonical website repo:** `Jamescheng2022/sourcerating-website`, branch `main`. **Vercel project:** `sourcerating-website`, team `jamescheng2022s-projects`, project `prj_2dv2ZpoNaeZD438vuWtgeSdsB2B1`, public canonical origin `https://www.sourcerating.com`.

This repository Skill is the workflow contract, **not an autonomous scheduler**, a publishing credential, an approval bypass or a substitute for independent editorial review. The existing SourceRating daily task remains the one scheduler; do not create a duplicate. The companion deterministic checker is `scripts/check-editorial-publication.mjs`.

## 0. Boundaries and ownership

- Work only in this website repository, not `Jamescheng2022/sourcerating` (the separate application), and not An-Thai, NEWMEDA, Precast or mail.
- For ordinary content and editorial images, use the connected GitHub tools directly, independent of a local PC or Codex queue. Do not silently change billing, DNS, authentication, payment plans, credentials, marketing identity or frontend ownership.
- Existing explicit platform denials, held drafts, AGY ownership restrictions and other project-specific permissions remain binding. A new GitHub/API path is not permission to retry a refused operation.
- The website Skill handles its own articles. LinkedIn is a **separate destination**: a LinkedIn draft or image does not count as a posted update. Verify the original authorized account, posting connector, review and public permalink separately.
- Review the current production deployment, open PRs and prior publication receipts before starting. Follow any real user changes to publication cadence or quality requirements.

## 1. Acquire the exact job and de-duplicate

1. Resolve `YYYY-MM-DD` in the existing task's `Asia/Shanghai` reporting day. Identify the reader, one question, geography, product, publisher/standard and topic intent.
2. Fetch `main`, `src/data/blog.ts`, `src/content/blog`, open PRs/branches and the public `/blog` index. Search old topic, slug, article ID, original complete manuscript and content hash. Prefer previously reviewed original drafts that are actually accessible; never regenerate a missing original and pretend it is the same reviewed item.
3. Record a stable slug and the current branch/PR/production state. If the same item is in progress, continue its one branch/PR rather than competing on `src/data/blog.ts`.
4. Keep at least one useful differentiated insight. If no credible new evidence is available, do not manufacture a long article to meet a quota.

## 2. Research and write like an editor

Read `docs/editorial/SOURCERATING_EDITORIAL_STANDARD.md` **at execution time**. It is the single source of truth for audience, voice, sourcing, and free/paid content boundaries.

- Separate primary evidence, attributed claims and editorial interpretation. Supply dated, clickable URLs and note exactly what the material can and cannot establish.
- Do not invent factory visits, interviews, buyer cases, RFQs, standards passages, prices, paid entitlements or other operational facts. Do not impersonate an external author or mechanically imitate a named writer.
- Choose an appropriate form: Industry Intelligence, Buyer's Field Notes or Deep Research. Headings, tables, FAQ, direct-answer cards and key-takeaway cards are optional, **never a universal template**. End with an actual insight or next practical question.
- Write a self-contained free article. For any future paid offering, provide additional *real* research utility instead of withholding the answer from the free reader.

## 3. Mandatory magazine-style visual story — enforced gate (2026-10-22)

The owner has **replaced the former 'one strong image is optional' advice with a binding release requirement** for every new or substantially revised SourceRating article, including reviewed drafts awaiting merge and previously published articles being revised. **A cover alone is a FAIL.** Never say an article meets this standard until the final public page has the real visuals and mobile rendering.

**Quantified floor (not a maximum):** one real cover image **plus distinct inline explanatory figures**: 2 figures for articles of 600 English body words or less; 3 for 601–1,200 words; 4 for longer articles. Count distinct visual concepts and image files, not the extra mobile variant of a figure. More images are welcome when they help; images repeated under new filenames, purely decorative crops or irrelevant AI scenes **do not earn credit**.

1. Work out the visual storyline at outline time: product/process photo or genuinely useful opening visual, intermediate annotated details / comparison / diagram, and final decision-evidence or workflow visual. **Distribute illustrations through the sections**—not all at the beginning, end or in a single stacked gallery. Keep every image beside the paragraph it helps explain.
2. Upload actual original or properly licensed files to `public/images/blog/`. The website must reference the exact `coverImage.src` and `articleBody` blocks of `type: "illustration"`; a design prompt, Library attachment, LinkedIn image, file that exists only in GitHub or unregistered Markdown does not count as rendered inline artwork.
3. Every cover and figure needs correct dimensions, informative alt text, an accurate factual caption and provenance/rights. Never portray AI-generated workers, defective products, actual inspections or factory premises as real evidence. Label generated scenes as editorial illustrations; avoid confusing speculative diagrams with an actual report.
4. Prefer *different kinds of evidence:* details of a specification, drawings, inspection traceability, quality decisions, materials, logistics, side-by-side distinctions. **Do not game the minimum with repetitive graphics.** Check that diagrams are technically true and legible on a narrow phone display. Wide text-heavy diagrams require a specifically authored mobile-readable `mobileSrc` (a resized copy is inadequate).
5. Prior to any approval, an **independent reviewer** must explicitly record `IMAGE_EDITORIAL_PASS` tied to the **exact post/media revision** after checking visual variety, semantic value, rights, mobile readability and factual consistency. If unreviewed or failed, the release is held regardless of how many files exist.
6. The deterministic `npm run check:publication:changed` **fails the PR** for too few distinct images, missing/undecodable media, missing provenance/alt/caption, clustered figures or file duplicates. This is the *objective minimum*, not an automatic editorial-quality endorsement.
7. After merge, validate article cover, **every inline image and mobile variant** in the actual production HTML, verify reachable image bytes and matching SHA, and open the phone layout where a graphical viewer is available. Don't count a metadata `og:image` as a body illustration.

**Legacy work:** Many already-published old pieces predate this floor. Keep them accessible without turning unrelated documentation changes into a sitewide failure. Track them for image-rich revision, **starting with `accepted-sampling-lot-not-zero-defects`**; on any revised piece enforce the full modern floor. Never describe an unrevised legacy article as visually compliant merely because it has a cover.

The quantitative rule cannot replace judgment. An article that satisfies 1+3 by inserting filler art is still an editorial FAIL.

## 4. Stage the article in the live data model

As of 2026-10-19 the public blog routes **do not automatically ingest arbitrary Markdown** from `src/content/blog/`.

- Publish a typed `BlogPost` source (prefer one file per article in `src/content/blog/`); import/register it exactly once in the `blogPosts` array in `src/data/blog.ts`.
- Preserve the article's existing slug when revising. Use the actual `articleBody` block types and existing layout options; only add minimal compatible renderers when strictly needed. For rich-body articles, custom `ctaHeading`/`ctaBody` fields may not render: use a genuine, relevant inline link instead.
- Keep the entry complete: date, category, credible SEO title/excerpt, applicable sources/limits, correct internal links and visible image paths. Do not fabricate a new paid CTA.
- Never take the presence of a committed Markdown, uploaded photo, opened PR or green Preview as proof of a public article.

## 5. Check and independently review before release

In a checkout with Node dependencies installed, run:

```bash
npm ci
npm run check:publication
npm run check:publication:changed
npm run test:publication
node scripts/check-editorial-publication.mjs --slug ARTICLE_SLUG
npm run build
```

- `npm run check:publication` checks **all registered articles** for structural/asset/link failures; `--slug` checks the exact article. The GitHub PR preflight workflow should also run these deterministic checks.
- The checker tests local files and metadata only; it **cannot verify factual truth, design taste, copyright or legal compliance**. A writer's self-review is not an independent acceptance.
- Obtain a truly independent editorial/fact/source review and the available GitHub code review on the exact final content and asset revision. Fix findings; a review of an older SHA is not approval of a different article.
- Confirm Preview build is READY. For public/previews actually accessible to a tester, check full body, actual hero, internal illustration, captions, links, mobile appearance and SEO. If preview requires authentication, state that openly, do not claim it was visually inspected.
- If a check fails, a reviewer flags a material issue, a PR is conflicted or access is refused, stop **that release**. Preserve completed work; never bypass a denial by switching identities or weakening access controls.

## 6. Release by GitHub and verify production

1. Use a focused feature/content branch and PR to `main`. Confirm changed files are within scope, independent content review and automated checks pass, and there are no current unresolved blockers.
2. Merge with the expected final PR head SHA under the established ordinary publishing authorization. No force pushes, no unrelated secret, payment or configuration changes.
3. Check the **exact merged commit** is deployed to the verified Vercel project's **production** target and state is `READY`. A Preview is not production.
4. Then fetch the **public** article URL, blog index, sitemap and media; verify title, full body, images including mobile diagram asset, captions, intended links and raster OG image. Run:

```bash
node scripts/check-editorial-publication.mjs --slug ARTICLE_SLUG --live --origin https://www.sourcerating.com
```

5. An article is *published and verified* only when independent reviews, production deployment and public readback are all true. If the runtime lacks one verifier, explicitly label the missing gate instead of inventing a PASS.
6. Record the topic/slug, source/content hash, source URLs, independent reviewer and verdict, PR, merged commit, production deploy ID, public article URL, asset URLs, check result and outstanding issues in the existing PR or canonical evidence records. No parallel hidden queue.

## 7. Respond with real outcomes

Use a short Chinese receipt: **published/verified** URLs and count, **only drafted** count, image state, PR/commit, and actual blockers. Do not report scheduled, submitted, previewed, PR-open or a file in GitHub as if it were a publicly published article.

For repeat daily runs, re-read this Skill from `main`, check the current branch/product scope and restore only verifiable unfinished work. Do not delete originals or repeat a previously rejected release action.
