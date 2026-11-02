# Calibration field note: documentary photo assets and rights | 2026-10-31

**Scope:** Photo repair only for the existing SourceRating article `calibration-sticker-measurement-tolerance`, originally published 2026-10-21. Original 593-word article body and the single existing blog registry entry are unchanged. The Draft PR is **not** publication permission.

## Three non-duplicate real photographic subjects

**Cover — actual plug-gauge calibration:** [NASA Armstrong original](https://commons.wikimedia.org/wiki/File:Calibration_Laboratory_Provides_Key_Aircraft_Support_(AFRC2019-0098-16).jpg) (NASA/Lauren Hughes, photographed 23 July 2019). US federal-government public-domain work, resized/cropped. The worker and calibration machine are real NASA laboratory subjects, not SourceRating supplier inspection or evidence for any product. Visible NASA insignia is not an endorsement of SourceRating. Caption explicitly states: *"Demonstrates calibration work, not fitness for a buyer's specific tolerance or NASA endorsement of SourceRating."*

**Figure 1 — gauge-block reference artifacts:** [Glenn McKechnie, 26 March 2005](https://commons.wikimedia.org/wiki/File:GaugeBlockMetricSet.jpg). We elect the photograph's [CC BY-SA 3.0 license](https://creativecommons.org/licenses/by-sa/3.0/); credit, source and cropped/resized adaptations are disclosed in caption/references; desktop/mobile adapted photographs remain under CC BY-SA 3.0. The photographed physical blocks and printed graduations are historic originals, not invented part-inspection results, uncertainty values, or verification of any particular supplier measurement.

**Figure 2 — method-specific calibration setup:** [NASA Armstrong original](https://commons.wikimedia.org/wiki/File:Calibration_Laboratory_Provides_Key_Aircraft_Support_(AFRC2019-0098-02).jpg) (NASA/Ken Ulbrich, photographed 29 May 2019). US-government public-domain work, resized/cropped. An actual digital-protractor calibration example, not a certification of any product or claim that the buyer's part was measured this way. Caption explicitly states: *"Not the buyer's part or acceptance test."*

All six real JPG byte files are independently included in GitHub: 1200x900 desktop, 720x1180 smartphone. They have distinct technical meanings (calibration apparatus, reference standards, measurement setup) and are distributed at different natural paragraph breaks. **Not AI-generated.** They do not portray SourceRating's factory, customer, inspection or result. NASA logos must not be used to imply official endorsement.

## SHA-256 integrity list

| Repository file | Size | SHA256 |
|---|---|---|
| `public/images/blog/calibration-photo-20261031-calibration-lab-desktop.jpg` | 1200x900 | `1f0b1e977738bddd69dfc2597b575683b852079b89f1f92fc8ee368450af4cea` |
| `public/images/blog/calibration-photo-20261031-calibration-lab-mobile.jpg` | 720x1180 | `219c23e7709808c517cbb8e03e76da56529f14087207c056e18d287c1caf697f` |
| `public/images/blog/calibration-photo-20261031-gauge-blocks-desktop.jpg` | 1200x900 | `0137cfc1681daaf094a84ae65303e43435916296252511b84c808b9f7a791428` |
| `public/images/blog/calibration-photo-20261031-gauge-blocks-mobile.jpg` | 720x1180 | `d44f6b62a914970c0d8e11ed2727df31d6182333b69d9edfaeec71bdca128d91` |
| `public/images/blog/calibration-photo-20261031-digital-protractor-desktop.jpg` | 1200x900 | `77f695034d287d05d135db65cad1c6a7fef4c9c50c0f4ed2f700a9a1f87cc834` |
| `public/images/blog/calibration-photo-20261031-digital-protractor-mobile.jpg` | 720x1180 | `55321a8ddf1e2cee9b23c0648215c8da98577e875343b357f7e1754da7ee5058` |

Source TS UTF-8 SHA256 after the photo-only revision: `992c3c4afad4a909e4f9d7b17c2b2c5d1bfc9ab1f8eaab4b2e84ca818b652159`.

## Responsive local browser proof (320px, 375px, 390px, 430px)

Verified locally against running Next.js server (`http://127.0.0.1:3000/blog/calibration-sticker-measurement-tolerance`) using headless browser:

| Viewport | Status | Screenshot File | SHA256 | Overflow / Layout Check |
|---|---|---|---|---|
| 320x1200 | 200 OK | `docs/editorial/evidence/screenshots/calibration-viewport-320px.png` | `1c3ffb668531efd2bae19805ac294ffe581caf13c233a509ffb7f739988eb4ca` | Pass: 0px horizontal overflow, mobile images rendered, captions wrapped and readable |
| 375x1200 | 200 OK | `docs/editorial/evidence/screenshots/calibration-viewport-375px.png` | `45ce4b1ecbaf7a578304de21ec6d8393183d701c4eb3c60b5e07ee270fed18fd` | Pass: 0px horizontal overflow, mobile images rendered, captions wrapped and readable |
| 390x1200 | 200 OK | `docs/editorial/evidence/screenshots/calibration-viewport-390px.png` | `2f5f9880b9f450c4f596052561d6b06558ecc990356d9bbae0f26cd2f70e3361` | Pass: 0px horizontal overflow, mobile images rendered, captions wrapped and readable |
| 430x1200 | 200 OK | `docs/editorial/evidence/screenshots/calibration-viewport-430px.png` | `3d87b85bd1115fd42eef67344e8d2a490cf61161ad8e1b505191a8e256eb6322` | Pass: 0px horizontal overflow, mobile images rendered, captions wrapped and readable |

All three figure captions correctly render clickable attribution links (`NASA/Lauren Hughes`, `Glenn McKechnie / Wikimedia Commons`, `CC BY-SA 3.0`, `NASA/Ken Ulbrich original photograph`).

## Shared renderer reconciliation with PR #33

- PR #35 renderer updates in `src/app/blog/[slug]/page.tsx` and `src/components/shared/ArticleBody.tsx` implement safe fallback resolution:
  - `(post.coverImage as { mobileWidth?: number }).mobileWidth ?? 720`
  - `(post.coverImage as { mobileHeight?: number }).mobileHeight ?? 1180`
  - `(block as { mobileWidth?: number }).mobileWidth ?? 720`
  - `(block as { mobileHeight?: number }).mobileHeight ?? 1180`
  - Unconditional `<InlineText text={...} editorial={...} />` for all captions, correctly formatting plain text, markdown links, bold and italic.
- PR #35 maintains strict isolation: `src/content/blog/legacy-posts.ts` is NOT modified in PR #35, avoiding any type duplication or premature schema alterations.
- **Merge Order Independence:**
  - If PR #35 merges first: It introduces zero breaking changes. PR #33 subsequently merges smoothly to add explicit `mobileWidth` types.
  - If PR #33 merges first: PR #35's renderer fallbacks immediately bind to the newly typed `mobileWidth`/`mobileHeight` without conflicts.

## Claim and review scope

Primary claim rechecked 2026-10-31: [NIST's metrological traceability policy](https://www.nist.gov/metrology/metrological-traceability) explicitly distinguishes a measurement result's traceability from its fitness for the intended decision; uncertainty and method still matter. Existing article text and sourcing are retained. None of the photographs is offered as factual support for a specific supplier's dimensional acceptance.

**Review gates:** photo rights, full pixels and layout, captions and clickable references, `IMAGE_EDITORIAL_PASS` for this exact PR HEAD, 320/375/390/430px browser readback, article/CI/build verification and production authorization. Codex GPT-6.1 Terra MEDIUM performs independent code review. Do NOT self-approve or publish.
