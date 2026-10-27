# Real photographic artwork for the held panel-fire article — 27 October 2026

**Scope:** Same existing Draft PR #23 and original manuscript `astm-e84-class-a-vs-en-13501-1-panel-fire-evidence`; no new author, scheduler, reviewer or publisher. **Status: image candidate only, Claude Lead IMAGE_EDITORIAL_PASS UNKNOWN, unmerged and unpublished.** Original body paragraphs and date are retained. The source's 2026-10-20 article date must be corrected at release if and only if the Lead approves publication.

### Active art and rights

1. **Cover:** actual honeycomb sandwich-composite material photograph, *not* a foam-core fire-tested wall panel. Photographer Acheolg, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Composites_sandwich_panel.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Desktop/mobile resized derivatives remain licensed CC BY-SA 4.0. This photo is informative on core identity but may still be rejected by Lead if too unlike the product under discussion.
2. **Body Figure 1:** original technical methods comparison SVG desktop/mobile (from 26 October); an explicit engineering-accuracy exception, not passed by an independent reviewer. Keep its concept-art disclosure.
3. **Body Figure 2:** real PUR-core sandwich roofing at an installation. Photographer Sarang, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Sandwichpaneel-Dach07.jpg), dedicated public domain. It is not the tested specimen, proposed wall or product approval.
4. **Body Figure 3:** stacked sandwich construction panels. Photographer Dirk H. Urbanek, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Sandwichelemente_im_Paket.JPG), dedicated public domain. It shows no traceable link to a laboratory test, class, ordered revision or supplier.

All three photographs are independently sourced real images (no AI project photo fabrication). Figure 1 remains a method-focused technical schematic, not counted as a real photo. The older SVG figures 2/3 and PNG cover remain in Git history but are no longer used in the article: the 26 October figure inventory is historical and is **not** the active visual map. The source references and captions disclose real-photo authors, licenses, transformations and illustrative scope; no specific customer or classification status is implied.

### Actual bytes newly added under `public/images/blog/`

| Image asset | Dimensions | SHA256 of exact JPEG | Git blob SHA |
|---|---:|---|---|
| panel-core-photograph-desktop-20261027.jpg | 1200×900 | bbc5f5bf389284f7cc1fae4b0d8bf6aa7d6b9e6c85dc4428aeb3f2a18a512c3a | 3abca1b2f6d016d6f2a99c0ce6e9805259a46caa |
| panel-core-photograph-mobile-20261027.jpg | 720×540 | 09bc7f4542f3d281635fc19cf25d1e28818a29c2569a6cc9e9bba1bfb6461265 | edd8145d5192ea0d01d574bb81719e0f853df6a3 |
| panel-roof-photograph-desktop-20261027.jpg | 1200×900 | 2b71c921173f7046bba7439627912d0eba088943d2d383f17be5917fa94f06a2 | 1bd6eafcad8bb7081c3ec2ef32f85b7c5a9c0a85 |
| panel-roof-photograph-mobile-20261027.jpg | 720×540 | 582d92e97819b75bed65892608bed1569154a32e87a478cbf4e6a203bee57784 | 21d793bda67efac2b82e989f97d2982dae3f3cd6 |
| panel-delivery-photograph-desktop-20261027.jpg | 1200×766 | eca471f83ff767612420e09911dcc2f9c53c9f6263a69c19d3ce6f891d889a21 | 731ebe0d0153e44434470b3620ff8a1962d14637 |
| panel-delivery-photograph-mobile-20261027.jpg | 720×459 | 2935fd0e33d3625105e34813ad0d0ca47bf6a4abac60a9c93e9e09eff626e0a6 | b387b60c127eb5537a9d5513536d33214c1065c1 |

Original full-size photos (unchanged remote source SHA256): Acheolg `3ddc9df9f88b5a3da622628ea32505ba37af679d0567af7169da88df43210492`; Sarang `e2e65f0a32953e852659585e7fb12a8ee59efe53660682b77a4ec98c04245d3d`; Dirk H. Urbanek `d6549c3f323e4e7218e573fbd716ac240010430f5bd27fc84afe3d55242cd34f`. New sizes are published Commons JPEG renditions, not synthetic re-creations. Actual blob bytes uploaded via GitHub blob API and tree-committed; no prompt or unattached ChatGPT media passes as a site asset.

### Outstanding hard gates

- The article now has **one photo cover + three independent body subjects** (methods SVG + installation photo + delivery photo), with real desktop/mobile file bytes. This passes only a **structural count**, not editorial acceptability.
- Verify the existing Next.js renderer's fixed mobile image dimension attributes against actual 720×540 and 720×459 JPEGs before release; no phone screenshots or successful browser render have been established here.
- Independent Lead checks article/photo relevance, precise construction, license compliance, qualitative visual value, source/revision language and final SHA; must explicitly reject or grant `IMAGE_EDITORIAL_PASS`.
- Existing PR #23 is Draft and behind/conflicting with main; Claude Lead exclusively owns final merge conflict, CI, mobile QA, publication date and authorized production release. No ChatGPT merge/deploy.
