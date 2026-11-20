# Advance Payment Guarantee / URDG 758 Article: Documentary Photo Assets, Rights & Verification | 2026-11-20

**Scope:** Author implementation for SourceRating article `advance-payment-guarantee-performance-bond-urdg-758-buyer-guide`, dated 2026-11-20. The article is registered in `src/data/blog.ts` and typed in `src/content/blog/advance-payment-guarantee-performance-bond-urdg-758-buyer-guide.ts`.

## Four Non-Duplicate Real Photographic Subjects (Eight WebP Renditions)

All four subjects are licensed documentary photographs from Wikimedia Commons, NOT synthetic or AI-generated imagery, and NOT evidence of any specific bank, guarantee, supplier or test. None duplicates an image used in earlier SourceRating articles. Licence metadata was read from the Commons API (`prop=imageinfo&iiprop=extmetadata`) on 2026-11-20, and each thumbnail was visually inspected before use.

### 1. Cover: Historic buildings on the Bund, Shanghai
- **Author:** David Berkowitz
- **Source URL:** https://commons.wikimedia.org/wiki/File:The_Bund_-_Shanghai,_China_(9065118959).jpg
- **License:** CC BY 2.0 (https://creativecommons.org/licenses/by/2.0/)
- **Adaptation:** 1280 px Commons thumbnail, cropped to 16:9 (sky removed), resized to 960x540 and 330x186 WebP.
- **Visible caption:** credits author, Commons and licence; states no bank or building shown is connected to any guarantee or supplier.

### 2. Figure: Factory acceptance testing of a signalling equipment enclosure
- **Author:** MTA Capital Construction Mega Projects
- **Source URL:** https://commons.wikimedia.org/wiki/File:Factory_acceptance_testing_for_a_CIL_hut_at_a_testing_facility_in_Batesburg,_South_Carolina._07-17-2019_(48382832866).jpg
- **License:** CC BY 2.0 (https://creativecommons.org/licenses/by/2.0/)
- **Adaptation:** 1280 px thumbnail, cropped to 3:2, resized to 960x640 and 330x220 WebP.
- **Visible caption:** credits author, Commons and licence; not a record of any supplier or test.

### 3. Figure: Heavy-lift carrier with project cargo off Singapore
- **Author:** CEphoto, Uwe Aranas
- **Source URL:** https://commons.wikimedia.org/wiki/File:Singapore_Happy-Sky-01.jpg
- **License:** CC BY-SA 3.0 (https://creativecommons.org/licenses/by-sa/3.0/)
- **Adaptation:** 1280 px thumbnail, cropped to 16:10, resized to 960x600 and 330x206 WebP; adapted renditions shared under the same licence.
- **Visible caption:** credits author, Commons and licence; notes the visible operator name implies no endorsement.

### 4. Figure: Chinese-built C620-1B centre lathe (1975), museum exhibit
- **Author:** TurnOnTheNight
- **Source URL:** https://commons.wikimedia.org/wiki/File:C620-1B_centre_lathe_(1975)_20260331124639.jpg
- **License:** CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/)
- **Adaptation:** 1280 px thumbnail, cropped to 4:3, resized to 960x720 and 330x248 WebP; adapted renditions shared under the same licence.
- **Visible caption:** credits author, Commons and licence; documentary illustration only. (A close-up nameplate photo of the same machine was reviewed and rejected because its military-factory marking would distract from the subject.)

## Local media hygiene

Source thumbnails were downloaded to a session scratchpad outside the repository, converted with `sharp`, and deleted after conversion. Only the eight WebP renditions below are tracked in Git.

## SHA-256 Integrity Verification

| File Path | Dimensions | Bytes | SHA-256 Digest |
|---|---|---|---|
| `public/images/blog/apg-urdg-bund-bank-buildings-desktop.webp` | 960x540 | 50304 | `e618321ea7a47ca543719ef47ab337ce18563dcb3a445af54293ebe1f35a4374` |
| `public/images/blog/apg-urdg-bund-bank-buildings-mobile.webp` | 330x186 | 7456 | `f692937a3ce84b7c1a853a69168f32c934b72ca94bba003e8e631382bdd914e0` |
| `public/images/blog/apg-urdg-centre-lathe-desktop.webp` | 960x720 | 130526 | `9d313445de1ad3a10c93a40c85abfe6483ce4a06c02d655ffe2a893a632f3462` |
| `public/images/blog/apg-urdg-centre-lathe-mobile.webp` | 330x248 | 20990 | `a0c790040447d7eab3c7f107577fa794b270830c0320146fe35f8f484ac1236f` |
| `public/images/blog/apg-urdg-factory-acceptance-test-desktop.webp` | 960x640 | 154518 | `5df206f7e4058dc29a9caadb56375dc826ff6ad61c4fe0554b3112097a96bcf7` |
| `public/images/blog/apg-urdg-factory-acceptance-test-mobile.webp` | 330x220 | 20154 | `b21881a4d9c12be2c7059639e7728eedb18dbbbd75fa4b992f0d90c9799b0a71` |
| `public/images/blog/apg-urdg-heavy-load-carrier-desktop.webp` | 960x600 | 59828 | `08756298e57173801699ba1a19bb686e2525a57078b8363577593cba4749f6b1` |
| `public/images/blog/apg-urdg-heavy-load-carrier-mobile.webp` | 330x206 | 7660 | `96f740464739d988ba7d250af92971a02aedc64743df1fc547e60ed3ed8d42a6` |
