# SourceRating Real Industrial Photography Standard · 2026-11-23

**Core Mandate:** Industrial buyer intelligence requires documentary truth. SourceRating articles must be illustrated with authentic industrial engineering photography, rigorously licensed for commercial publication, and transparently attributed.

---

## 1. Core Principles

1. **100% Authentic Documentary Photography**
   - All photographic imagery must depict real manufacturing facilities, authentic engineering equipment, genuine inspection procedures, or physical fabrication components.
   - **Zero AI-generated factory scenes:** Never use generative AI tools (Midjourney, DALL-E, Stable Diffusion, etc.) to fabricate fake factory floors, imaginary welders, simulated inspection benches, or fictional manufacturing defects.
   - When a conceptual workflow or data structure must be visualized, use an explicit technical diagram (SVG) clearly labeled as an *original editorial schematic, not a physical inspection record*.

2. **Standard Allocation: 2–4 Authentic Engineering Photos per Article**
   - **Hero / Cover Photo (1):** High-impact documentary image establishing the industrial operating environment, primary thermal or mechanical mechanism, and the physical scale of the problem (e.g., hot-dip galvanizing zinc kettle immersion).
   - **In-body Technical Photos (1–3):** Detailed technical close-ups illustrating the exact engineering constraints discussed in the text (e.g., venting/drainage hole geometry, H-beam cope cuts, dry film thickness gauge verification, finished structural member surface appearance).

---

## 2. Copyright & Licensing Verification Protocol

1. **Audit of Candidate Industry Sources**
   - When researching technical literature from trade journals (*metallbau Magazin*, *Modern Steel Construction*), corporate fabricators/galvanizers (*V&S Galvanizing*, *ZINQ*), manufacturer catalogs (*Kowa Industrial*), or trade associations (*American Galvanizers Association*, *AISC*):
     - Perform a deterministic copyright audit: inspect HTML metadata, page footer, Terms of Service, and image EXIF/attribution.
     - If the asset is under proprietary copyright (*"All rights reserved"*, *"Alle Rechte vorbehalten"*, corporate proprietary catalog, or association copyright) with no explicit open commercial reuse grant:
       - **DO NOT** scrape, copy, or republish the third-party images.
       - **DO** retain candidate URLs in the article's reference notes as authoritative citations and literature sources.
       - **DO** source equivalent, authentic photography under verified open commercial licenses (Creative Commons CC BY, CC BY-SA, CC0, or Public Domain) from reputable repositories (such as Wikimedia Commons).

2. **Permissible License Framework**
   - **Creative Commons CC0 / Public Domain:** Free commercial reuse without attribution required (attribution still provided as editorial best practice).
   - **Creative Commons CC BY (2.0 / 2.5 / 3.0 / 4.0):** Commercial reuse permitted with clear author credit and license link.
   - **Creative Commons CC BY-SA (2.0 / 2.5 / 3.0 / 4.0):** Commercial reuse permitted with author credit, license link, and note of modifications (cropping/resizing).
   - **Prohibited:** Any license with **NC** (Non-Commercial) or **ND** (No-Derivatives) restrictions, or unlicensed "fair use" claims.

---

## 3. Mandatory Metadata & Attribution Format

Every photographic asset embedded in SourceRating articles must satisfy four metadata criteria:

1. **Descriptive Alt Text:**
   - English alt text accurately describing the physical engineering components, machine type, or inspection action for accessibility and search indexing.
2. **Standardized Editorial Caption:**
   - Must contain: (1) Technical subject description, (2) Photographer / Organization credit with link, (3) Source archive link (e.g. Wikimedia Commons), (4) License designation with clickable license link, (5) Technical transformation note (*"cropped and resized for web"*), and (6) Mandatory documentary disclaimer.
   - **Standard Caption Template:**
     ```markdown
     [Technical description of component or process]. Photo: [Author Name] / [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:...), [License Name](https://creativecommons.org/licenses/...); cropped and resized for web. Documentary illustration only; not a specific project, supplier, or inspection discussed in this article.
     ```
3. **Structured Asset Ledger Entry:**
   - Documented in `docs/editorial/PUBLISHED_ARTICLES_LEDGER.md` or the specific release receipt with original URL, author, license, dimensions, local path, and hash.

---

## 4. Technical Asset Optimization & Responsive Delivery

1. **Aspect Ratios & Dimensions**
   - **Landscape (Primary):** Exact 3:2 ratio.
     - Desktop: `1200 x 800 px`
     - Mobile: `600 x 400 px`
   - **Portrait (Detail Close-up):** Exact 3:4 ratio.
     - Desktop: `800 x 1067 px`
     - Mobile: `480 x 640 px`
2. **File Formats & Compression Budget**
   - Dual-tier deployment: WebP (primary high-efficiency) + JPG (broad compatibility fallback).
   - Desktop assets: Target file size `< 250 KB`.
   - Mobile assets: Target file size `< 70 KB`.
   - Social / Open Graph: Compatible raster JPG/PNG for LinkedIn preview cards (`og:image`).
3. **Storage Location**
   - Stored in `public/images/blog/` with clean, descriptive kebab-case filenames:
     `[subject]-[detail]-desktop.[jpg|webp]` and `[subject]-[detail]-mobile.[jpg|webp]`.
