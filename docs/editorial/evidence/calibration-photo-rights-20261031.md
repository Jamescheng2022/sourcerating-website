# Calibration field note: documentary photo assets and rights | 2026-10-31

**Scope:** Photo repair only for the existing SourceRating article `calibration-sticker-measurement-tolerance`, originally published 2026-10-21. Original 593-word article body and the single existing blog registry entry are unchanged. The Draft PR is **not** publication permission.

## Three non-duplicate real photographic subjects

**Cover — actual plug-gauge calibration:** [NASA Armstrong original](https://commons.wikimedia.org/wiki/File:Calibration_Laboratory_Provides_Key_Aircraft_Support_(AFRC2019-0098-16).jpg) (NASA/Lauren Hughes, photographed 23 July 2019). US federal-government public-domain work, resized/cropped. The worker and calibration machine are real NASA laboratory subjects, not SourceRating supplier inspection or evidence for any product. 
- *Editorial Note on Insignia:* The NASA meatball patch on the technician's shirt is visibly prominent in both the landscape and portrait crops. Caption explicitly states: *"Demonstrates calibration work, not fitness for a buyer's specific tolerance or NASA endorsement of SourceRating."* References explicitly disclaim endorsement. No synthetic branding or misleading claims are made.

**Figure 1 — gauge-block reference artifacts:** [Glenn McKechnie, 26 March 2005](https://commons.wikimedia.org/wiki/File:GaugeBlockMetricSet.jpg). We elect the photograph's [CC BY-SA 3.0 license](https://creativecommons.org/licenses/by-sa/3.0/); credit, source and cropped/resized adaptations are disclosed in caption/references; desktop/mobile adapted photographs remain under CC BY-SA 3.0. The photographed physical blocks and printed graduations are historic originals, not invented part-inspection results, uncertainty values, or verification of any particular supplier measurement.

**Figure 2 — method-specific calibration setup:** [NASA Armstrong original](https://commons.wikimedia.org/wiki/File:Calibration_Laboratory_Provides_Key_Aircraft_Support_(AFRC2019-0098-02).jpg) (NASA/Ken Ulbrich, photographed 29 May 2019). US-government public-domain work, resized/cropped. An actual digital-protractor calibration example, not a certification of any product or claim that the buyer's part was measured this way. Caption explicitly states: *"Not the buyer's part or acceptance test."*

All six real JPG byte files are independently included in GitHub: 1200x900 desktop, 720x1180 smartphone. They have distinct technical meanings (calibration apparatus, reference standards, measurement setup) and are distributed at different natural paragraph breaks. **Not AI-generated.**

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

## Responsive Mobile Viewport Diagnosis & Capture Status

### Screenshot Artifact Root Cause Analysis
Diagnostic evaluation of desktop Chrome CLI on this host demonstrated that `--window-size=320,1200` enforces a desktop window floor of **504px** (`window.innerWidth: 504, clientWidth: 504`). The committed screenshots (`calibration-viewport-{320,375,390,430}px.png`) at `b268f35` clipped the 504px desktop frame at the requested width, horizontally cutting off the right side of H1, excerpt, and cover.

### Status of Mobile Viewport Verification
- **Status:** **PENDING BROWSER SLOT RE-ALLOCATION**.
- A genuine CDP measurement harness (`Emulation.setDeviceMetricsOverride` with `mobile: true`) has been prepared.
- As the host coordination slot is currently assigned to V4, the local browser process and Next dev server have been terminated to preserve memory (~2.30 GiB available).
- Full DOM metrics (`innerWidth`, `clientWidth`, `scrollWidth`, `devicePixelRatio`, and element boundingClientRects) and unclipped mobile PNGs will be generated in the next assigned browser window.

## Shared Renderer Reconciliation with PR #33 & Merge Simulation

A 3-way in-memory merge simulation via `git merge-tree 9d5ef00 origin/content/vgm-photo-repair-20261029 HEAD` demonstrates an **overlapping hunk conflict** in `src/app/blog/[slug]/page.tsx` and `src/components/shared/ArticleBody.tsx`:
- **PR #33 Implementation:** Uses typed `mobileWidth`/`mobileHeight` from its own modified `legacy-posts.ts`, but calls `<InlineText>` unconditionally on all captions.
  - *Conflict & CI Finding:* Remote CI run `40839346170` on PR #33 failed at `scripts/verify-blog-cover.mjs:81:55` because unconditional `<InlineText>` converts plain string captions into React element objects (`{ props: { text: ... } }`), failing strict equality assertions on legacy posts.
- **PR #35 Implementation:** Uses safe optional chaining `(post.coverImage as { mobileWidth?: number }).mobileWidth ?? 720` and conditional caption rendering `{caption.includes("](") ? <InlineText ...> : caption}`.
  - This passes all local and remote CI checks (Run `41380339383` SUCCESS), correctly rendering clickable markdown links for new field notes while retaining string literals for legacy posts.
- **Concrete Merge Reconciliation Strategy:**
  1. Claims of "seamless auto-merge independence" are retracted; Git requires manual or structured conflict resolution on the shared hunks.
  2. **Recommended Merge Order:** PR #35 should merge first into `main`. This establishes the working conditional caption renderer and fallback dimensions. When PR #33 is subsequently merged or rebased, the conflict on `page.tsx` and `ArticleBody.tsx` is resolved by retaining PR #35's renderer logic while incorporating PR #33's typing in `src/content/blog/legacy-posts.ts` and its VGM article.

## Claim and review scope

Primary claim rechecked 2026-10-31: [NIST's metrological traceability policy](https://www.nist.gov/metrology/metrological-traceability) explicitly distinguishes a measurement result's traceability from its fitness for the intended decision; uncertainty and method still matter. Existing article text and sourcing are retained. None of the photographs is offered as factual support for a specific supplier's dimensional acceptance.

**Review gates:** photo rights, full pixels and layout, captions and clickable references, 320/375/390/430px genuine browser readback, article/CI/build verification and production authorization. Codex GPT-6.1 Terra MEDIUM performs independent code review. Do NOT self-approve or publish.
