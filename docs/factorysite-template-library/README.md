# FactorySite Template Library V1

This library exists to prevent FactorySite Autopilot from generating generic AI-looking concept pages. The target is a maintainable system that can produce real, production-capable manufacturing company websites with materially different visual identities.

## Architecture decision

Do not maintain a different backend for every visual template.

Use one standardized full-stack foundation for production features (CMS, auth, RFQ, SEO, preview, content workflow, AI knowledge configuration), and maintain multiple frontend design families that can be composed against the same content schema.

Preferred full-stack foundation: **Payload CMS + Next.js** (MIT).

## Required design families before autonomous website generation

1. Global Corporate Clean — large manufacturers, listed groups, diversified industrial companies.
2. Precision Engineering — machining, die casting, automotive components, tooling.
3. Industrial Product Catalog — machinery, pumps, automation, industrial equipment.
4. Electronics / Advanced Technology — PCB, electronics, EV, controls, data-center supply chain.
5. Heavy Industry / Materials — steel, construction materials, mining, chemicals, new materials.
6. Engineering Project — PEB, steel structure, precast, EPC, industrial services.
7. Japanese / Minimal Trust — conservative hierarchy, whitespace, proof-heavy, restrained motion.
8. German / Technical Documentation — specifications, downloads, certifications, application engineering.
9. Sustainability / Global Group — ESG, global footprint, governance and recruitment-heavy groups.
10. SME Export Manufacturer — conversion-oriented factory + products + OEM/ODM + RFQ.

## Template admission rules

A resource may enter the reusable production pool only if all are true:

- Commercial use is clearly allowed.
- Source-code delivery to a paying client is compatible with the license.
- License file and upstream repository are recorded.
- The project builds successfully from a pinned commit.
- Desktop and mobile navigation pass QA.
- Accessibility baseline is acceptable.
- SEO metadata can be controlled.
- It can be adapted to the shared content schema.
- Demo logos, stock images and fictional customer marks can be removed cleanly.

Resources with contradictory README/license terms are reference-only or rejected.

## Per-company selection workflow

Before building a client Demo:

1. Classify the company by industry, company scale, target buyer, product complexity and brand maturity.
2. Select at least five candidate design families/resources.
3. Score each for industry fit, information architecture fit, available source material, visual credibility, mobile quality and implementation cost.
4. Choose one base direction and compose it with reusable industrial sections rather than cloning the upstream template.
5. Apply company-specific typography, color system, imagery, navigation, section order and CTA strategy.
6. Generate a Design Fingerprint and compare against the previous five generated sites.
7. If similarity exceeds 75%, reject and rebuild.

## Manufacturing-specific section library

The shared section library should include at minimum:

- Factory hero with real facility/product imagery
- Company / Thailand entity introduction
- Product category grid
- Product detail / specification table
- Manufacturing process flow
- Equipment / capability matrix
- Capacity and factory footprint facts
- Quality system / certification evidence
- Industries / applications
- Download center for catalogs and PDFs
- Global footprint / Thailand location
- News / investment timeline
- Careers
- Supplier / procurement entry
- RFQ form with file upload
- Local phone / email / LINE / map
- Evidence-bound AI assistant
- Privacy / legal / independent-demo disclosure

## Current bootstrap decision

Approved foundation: TPL-001 Payload Official Website Template.

Strong visual bases/references: TPL-002 AstroWind, TPL-003 Nextly, TPL-004 Lonestone Astro Template, TPL-005 KeyAstro, TPL-006 DataNova, TPL-007 Tailcast, TPL-008 OpenOcean Payload Website Builder.

Visual inspiration only: TPL-009 Cruip Open React due to redistribution/license constraints.

Rejected from production pool pending legal clarification: TPL-010 and TPL-011 Themixly industrial templates because the repository license label and README usage restrictions are inconsistent.

## Next acceptance milestone

Do not resume automated company website generation until:

- at least 20 candidate resources have been researched;
- at least 8 distinct design families have one approved implementation each;
- 3 production-grade industrial reference sites have been built from the shared backend;
- one previously researched Thailand factory is rebuilt as a realistic customer-facing case site and passes desktop/mobile/multilingual/RFQ/CMS/AI QA.
