# Electronic Bill of Lading Cargo Release: Documentary Photo Assets, Rights & Verification | 2026-11-07

**Scope:** Author implementation for SourceRating article `electronic-bill-of-lading-cargo-release-buyer-checklist`, published 2026-11-07. The article is registered in `src/data/blog.ts` and typed in `src/content/blog/electronic-bill-of-lading-cargo-release-buyer-checklist.ts`.

## Three Non-Duplicate Real Photographic Subjects (Six JPEG Renditions)

All three photo subjects are authentic licensed documentary photography, NOT synthetic or AI-generated imagery, and NOT evidence of the KTNET–HMM trial, any specific eBL cargo shipment, or a SourceRating inspection.

### 1. Cover — Container vessel at Southampton port
- **Subject:** *Singapore Express* container ship alongside container-handling cranes at Southampton, England (December 2024).
- **Photographer / Author:** Geni
- **Source URL:** https://commons.wikimedia.org/wiki/File:Singapore_Express_southampton_container_port.JPG
- **Original Media URL:** https://upload.wikimedia.org/wikipedia/commons/e/ee/Singapore_Express_southampton_container_port.JPG
- **License:** CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/)
- **Adaptation / Transformation:** Wikimedia thumbnail resized from 6676x2640 to 1280x506; mobile rendition resized proportionally to 800x316 using Pillow; no editorial cropping.
- **Visible Caption Disclaimer:** *"Container vessel at Southampton, December 2024. Photo: Geni / Wikimedia Commons, CC BY-SA 4.0; resized. Illustrative shipping scene, not the KTNET–HMM eBL trial."*

### 2. Figure 1 — Historical archival paper bill of lading (1912)
- **Subject:** Archival paper bill of lading from a 1912 shipment with printed contract clauses and handwritten shipping marks.
- **Photographer / Author:** Archives New Zealand
- **Source URL:** https://commons.wikimedia.org/wiki/File:Bill_of_lading_(50116721023).jpg
- **Original Media URL:** https://upload.wikimedia.org/wikipedia/commons/d/d2/Bill_of_lading_%2850116721023%29.jpg
- **License:** CC BY 2.0 (https://creativecommons.org/licenses/by/2.0/)
- **Adaptation / Transformation:** Resized from 900x714 to 720x571 for mobile rendition using Pillow; no editorial cropping.
- **Visible Caption Disclaimer:** *"An archival paper bill of lading from a 1912 shipment. Image: Archives New Zealand / Wikimedia Commons, CC BY 2.0. Historical comparison only; not a modern eBL."*

### 3. Figure 2 — Container terminal handling cranes
- **Subject:** Tall container-handling cranes above a Southampton container terminal (June 2020).
- **Photographer / Author:** Geni
- **Source URL:** https://commons.wikimedia.org/wiki/File:130_container_port_cranes.JPG
- **Original Media URL:** https://upload.wikimedia.org/wikipedia/commons/9/97/130_container_port_cranes.JPG
- **License:** CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/)
- **Adaptation / Transformation:** Wikimedia thumbnail resized from 3716x4949 to 960x1279; mobile rendition resized proportionally to 640x853 using Pillow; no editorial cropping.
- **Visible Caption Disclaimer:** *"Container-handling cranes at Southampton, England. Photo: Geni / Wikimedia Commons, CC BY-SA 4.0; resized. Illustrative port scene, not a release confirmation."*

## SHA-256 Integrity Verification

| File Path | Dimensions | SHA-256 Digest |
|---|---|---|
| `public/images/blog/ebl-vessel-cover-desktop.jpg` | 1280x506 | `abeea07885e9f81cea89df2cd5195e72eb9dc1857b51819c14f214d18747302b` |
| `public/images/blog/ebl-vessel-cover-mobile.jpg` | 800x316 | `5ade71a724bae0a6c87e779a6b183a63a8f2949067cf4d5b946293d16dc2b448` |
| `public/images/blog/ebl-paper-bill-1912-desktop.jpg` | 900x714 | `22149ded879872aa2d287429442a8e2b2d9f90793a8edc83ca7c7c8bd08941a3` |
| `public/images/blog/ebl-paper-bill-1912-mobile.jpg` | 720x571 | `d62f585f8e290e642664fde0608cf52739b06601118c413ba88950fb1b1559d8` |
| `public/images/blog/ebl-terminal-cranes-desktop.jpg` | 960x1279 | `a0e89ba2f2563a70cfa5e32b92177da4f5505c5c90cdbbb138bfb6418c7a12de` |
| `public/images/blog/ebl-terminal-cranes-mobile.jpg` | 640x853 | `05113b820aff52eea39f436246725ff17ae5dd8a1c1ba2ab113848f9260578b6` |

All digests match the intake staging `SHA256SUMS.txt` exactly.

## Official Primary Sources Independently Verified (2026-11-07)

1. **Digital Container Shipping Association (DCSA)**
   - *From issuance to surrender: KTNET and HMM test eBL Korea on DCSA standards* (Published 5 November 2026; checked 7 November 2026).
   - URL: https://dcsa.org/newsroom/ktnet-hmm-ebl-korea
   - Verification note: Confirms integration testing from April to August 2026 and platform-interoperability testing in September. Parties are targeting future live shipment use during 2026; live production rollout across commercial routes is not yet reported.
2. **Digital Container Shipping Association (DCSA)**
   - *Five eBL platforms adopt DCSA Standard Annex v.2* (Published 4 June 2026; checked 7 November 2026).
   - URL: https://dcsa.org/newsroom/five-ebl-platforms-adopt-dcsa-interoperability-annex
   - Verification note: Details the interoperability framework and proof-of-concept testing across multiple eBL solution providers.
3. **International Chamber of Commerce (ICC) / FIT Alliance**
   - *Electronic Bill of Lading adoption grows as focus shifts to interoperability* (Published 21 October 2026; checked 7 November 2026).
   - URL: https://iccwbo.org/news-publications/news/electronic-bill-of-lading-adoption-grows-as-focus-shifts-to-interoperability/
   - Verification note: Reports industry survey findings highlighting steady progress alongside continuing friction in banking adoption and cross-platform document handovers.
4. **UNCITRAL**
   - *Model Law on Electronic Transferable Records (2017)*
   - URL: https://uncitral.un.org/en/texts/ecommerce/modellaw/electronic_transferable_records
   - Verification note: Direct portal page access returned HTTP 403; citation relies on indexed official legal metadata and is explicitly qualified without asserting direct portal retrieval.

## Publication Gates & Verification Status

- `npm run check:publication`: PASS (41 articles registered, 749 checks passed, 0 errors).
- `node scripts/check-editorial-publication.mjs --slug electronic-bill-of-lading-cargo-release-buyer-checklist`: PASS (32 checks passed, 0 errors).
- `node --test scripts/test-editorial-publication.mjs`: PASS (10/10 tests passed).
- `node scripts/test-editorial-release.mjs`: PASS (5/5 tests passed).
- `node scripts/verify-blog-cover.mjs`: PASS (54 checks passed).
- `npm run build`: PASS (All 61 routes statically generated including `/blog/electronic-bill-of-lading-cargo-release-buyer-checklist`).
- `node scripts/test-cdp-overflow-browser.mjs`: PASS across viewports 320px, 375px, 390px, 430px, 1280px.
- Worktree Isolation: Verified strictly within `D:\AgentWorkspaces\sr-daily-ebl-20261107`, branch `content/ebl-cargo-release-20261107`. No other repositories or branches touched.
