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

## 3. Prepare actual images, not just image prompts

1. For a substantial article consider a documentary-style editorial photo and/or a technical explanatory visual; every chosen visual must help understanding, not just add decoration.
2. Secure actual image bytes, confirm rights, add to `public/images/blog/` (or another proven public path), and check format, dimensions, responsive layout, alt, caption and attribution. Any generated factory scene must be labeled as an **AI-generated illustration, not evidence of a particular facility, product inspection or customer**.
3. Place the real media path in the article's `coverImage` or an inline `articleBody` `illustration` block. **Generated in the chat, stored in Library or mentioned in a draft is not the same as present in the production webpage.**
4. Use an actual mobile-specific layout for text-heavy wide diagrams (the current article renderer supports `mobileSrc`). Confirm caption stays with the corresponding visual.
5. The image shared on LinkedIn or in Open Graph must be a compatible raster image (typically JPG/PNG). The site body may use SVG or AVIF with a raster social fallback. Check the *actual production* `og:image`, not just the source filename.
6. No copyrighted third-party visual copied without permission. If an image cannot be obtained or truthfully attributed, use a suitable original graphic or publish without that image and explain the limitation.

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
