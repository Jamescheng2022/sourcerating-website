# Real photographic artwork for the held panel-fire article — 27 October 2026

**Scope:** Same existing Draft PR #23 and original manuscript `astm-e84-class-a-vs-en-13501-1-panel-fire-evidence`; no new author, scheduler, reviewer or publisher. **Status: image candidate only, Claude Lead IMAGE_EDITORIAL_PASS UNKNOWN, unmerged and unpublished.** Original body paragraphs and date are retained. The source's 2026-10-20 article date must be corrected at release if and only if the Lead approves publication.

### Active art and rights

1. **Cover (replaced in this editorial follow-up):** actual metal-faced PUR-foam insulated **wall** sandwich panels with visible core/edge profile, rather than the prior unrelated honeycomb coupon. HNB Nordbleche GmbH, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Sandwichplatten_Fassade.jpg), [CC BY-SA 3.0 Unported](https://creativecommons.org/licenses/by-sa/3.0/), source image 18 July 2013 and Commons VRT permission. The 1280×853 and 960×640 thumbnail derivatives must retain author/license/source acknowledgement; neither image depicts a tested specimen or proves ASTM/EN classification.
2. **Body Figure 1:** original technical methods comparison SVG desktop/mobile (from 26 October); an explicit engineering-accuracy exception, not passed by an independent reviewer. Keep its concept-art disclosure.
3. **Body Figure 2:** real PUR-core sandwich roofing at an installation. Photographer Sarang, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Sandwichpaneel-Dach07.jpg), dedicated public domain. It is not the tested specimen, proposed wall or product approval.
4. **Body Figure 3:** stacked sandwich construction panels. Photographer Dirk H. Urbanek, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Sandwichelemente_im_Paket.JPG), dedicated public domain. It shows no traceable link to a laboratory test, class, ordered revision or supplier.

All three photographs are independently sourced real images (no AI project photo fabrication). Figure 1 remains a method-focused technical schematic, not counted as a real photo. The older SVG figures 2/3, first PNG cover and former honeycomb-photo cover remain in Git history but are no longer used in the article: the 26 October figure inventory is historical and is **not** the active visual map. The source references and captions disclose real-photo authors, licenses, transformations and illustrative scope; no specific customer or classification status is implied.

### Actual bytes under `public/images/blog/` (current replacement plus historical 27-Oct additions)

| Image asset | Dimensions | SHA256 of exact JPEG | Git blob SHA |
|---|---:|---|---|
| **ACTIVE COVER:** panel-wall-pur-core-desktop-20261027.jpg | 1280×853 | 33ec3c209b9d48d0c216da852cf3305bf4b4891fd58aa10c3f1992c10a7b5c0e | 2265cb16f864299aca856f53500ca3a8718430c7 |
| **ACTIVE MOBILE COVER:** panel-wall-pur-core-mobile-20261027.jpg | 960×640 | 9272bd101ec6b5c222dbd6b4406084ce65ffb2b9aef4eb036b7371954de9ba78 | ed53857a740d52a602ca75ae54c9b97a5c6610dc |
| panel-core-photograph-desktop-20261027.jpg | 1200×900 | bbc5f5bf389284f7cc1fae4b0d8bf6aa7d6b9e6c85dc4428aeb3f2a18a512c3a | 3abca1b2f6d016d6f2a99c0ce6e9805259a46caa |
| panel-core-photograph-mobile-20261027.jpg | 720×540 | 09bc7f4542f3d281635fc19cf25d1e28818a29c2569a6cc9e9bba1bfb6461265 | edd8145d5192ea0d01d574bb81719e0f853df6a3 |
| panel-roof-photograph-desktop-20261027.jpg | 1200×900 | 2b71c921173f7046bba7439627912d0eba088943d2d383f17be5917fa94f06a2 | 1bd6eafcad8bb7081c3ec2ef32f85b7c5a9c0a85 |
| panel-roof-photograph-mobile-20261027.jpg | 720×540 | 582d92e97819b75bed65892608bed1569154a32e87a478cbf4e6a203bee57784 | 21d793bda67efac2b82e989f97d2982dae3f3cd6 |
| panel-delivery-photograph-desktop-20261027.jpg | 1200×766 | eca471f83ff767612420e09911dcc2f9c53c9f6263a69c19d3ce6f891d889a21 | 731ebe0d0153e44434470b3620ff8a1962d14637 |
| panel-delivery-photograph-mobile-20261027.jpg | 720×459 | 2935fd0e33d3625105e34813ad0d0ca47bf6a4abac60a9c93e9e09eff626e0a6 | b387b60c127eb5537a9d5513536d33214c1065c1 |

The superseded `panel-core-photograph-*` JPEGs remain in Git history and current tree only for audit, **not referenced as the active cover**. The replacement cover has the exact author/rights link above; the linked 1280px and 960px renditions are the canonical source-resized copies, without color manipulation or falsified factory claims. No claim of a real tested project is made.

Original full-size photos (unchanged remote source SHA256): Acheolg `3ddc9df9f88b5a3da622628ea32505ba37af679d0567af7169da88df43210492`; Sarang `e2e65f0a32953e852659585e7fb12a8ee59efe53660682b77a4ec98c04245d3d`; Dirk H. Urbanek `d6549c3f323e4e7218e573fbd716ac240010430f5bd27fc84afe3d55242cd34f`. New sizes are published Commons JPEG renditions, not synthetic re-creations. Actual blob bytes uploaded via GitHub blob API and tree-committed; no prompt or unattached ChatGPT media passes as a site asset.

### Outstanding hard gates

- The article now has **one directly relevant material photo cover + three independent body subjects** (methods SVG + installation photo + delivery photo), with real desktop/mobile file bytes. This passes only a **structural count**, not editorial acceptability.
- Verify the existing Next.js renderer's fixed mobile image dimension attributes against the **new 960×640 mobile cover** plus the active **720×540 and 720×459 inline JPEGs** before release; no phone screenshots or successful browser render have been established here.
- Independent Lead checks article/photo relevance, precise construction, license compliance, qualitative visual value, source/revision language and final SHA; must explicitly reject or grant `IMAGE_EDITORIAL_PASS`.
- Existing PR #23 is Draft and behind/conflicting with main; Claude Lead exclusively owns final merge conflict, CI, mobile QA, publication date and authorized production release. No ChatGPT merge/deploy.

### 27 October additional cover relevance correction

The previous honeycomb composite coupon was materially unlike the steel-faced foam-core wall panel the article discusses, even with a disclaimer. Replaced its *active* cover reference with a verified documentary close-up of PUR-core metal-faced wall sandwich panels. This is materially aligned with the buyer's product-identification problem, without suggesting PUR panels have any particular Class A, B-s1,d0, or fire-resistance rating. The source's author and CC BY-SA 3.0 license were checked on the Commons file page on 2026-10-27 and credited in the live article's proposed alt, caption and source record. License review and image taste remain independently **UNKNOWN** until Claude Lead performs IMAGE_EDITORIAL_PASS on the new head.

This correction did **not** modify the author's technical paragraphs, registry, older image bytes, other PRs, main, paid pages, email or social channels. No protected preview/browser recheck was attempted because that route was previously denied; the existing platform and source-visual holds remain. All release gates belong to the original Claude Lead.
