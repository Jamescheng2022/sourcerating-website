# BYH Thailand Digital Pilot

## Objective

Demonstrate one sellable, company-specific system for a newly operating Thailand manufacturer:

- a Thai-first international website;
- a public assistant restricted to verified evidence;
- a private employee AI workspace for Thai, Chinese and English knowledge;
- a shared operations console for content, approvals, SEO, AI quality and maintenance.

This is an independent private concept. It is not operated or endorsed by BYH or Wuxi BEST.

## Users and promised outcome

| User | Painful job | Pilot outcome |
|---|---|---|
| International buyer | Understand local capability and submit a qualified RFQ | Evidence-led Thai/English/Chinese website and structured RFQ |
| Thai employee | Find, translate and summarize approved procedures | BYH Works assistant with citations and human-review fallback |
| Thailand manager | Keep the site, knowledge and content current | One approval and operations console |
| SourceRating operator | Maintain the client without rebuilding every system | Shared website/AI/operations architecture with company-specific content |

## End-to-end success scenario

1. A buyer lands on the Thai route and understands the Thailand factory status.
2. The buyer asks the public assistant about Phase II and receives cited, bounded facts.
3. The buyer opens the RFQ workflow and sees the required engineering inputs.
4. A Thai employee opens BYH Works and asks a cross-language knowledge question.
5. The assistant cites an approved source or marks the answer for owner review.
6. The operator sees pending approvals, content work and maintenance health.

## Evidence boundaries

- Phase I opening: AMATA announcement, 18 October 2025.
- Phase II scope and planned capacity: Automotive Engineering Corporation announcement, 21 October 2025.
- Parent capability: Wuxi BEST public filings and website.
- Public trade activity is an internal lead signal only and is not published in the customer website without approval.
- Thailand certificates, exact installed equipment, released part numbers, current capacity, customer names and local sales contacts remain pending company confirmation.
- Generated manufacturing imagery is labelled as conceptual and must be replaced by a Thailand photo/video shoot before official launch.

## Architecture decision

| Layer | Pilot | Production direction |
|---|---|---|
| Website | Existing Next.js branch | Payload CMS + Next.js, isolated client deployment |
| Public assistant | Deterministic evidence API | Model adapter + retrieval over approved public corpus |
| Employee AI | Custom Thai-first shell and pilot corpus | Onyx Community Edition, single-client private deployment |
| Operations | Read-only pilot dashboard | Monitoring, approval workflows, analytics and maintenance automation |
| Languages | Separate `/th`, `/en`, `/zh` routes | Thai technical review and complete hreflang/canonical rules |

Onyx Community Edition is preferred over Dify for the employee pilot because its core chat, RAG, Agents and Actions are MIT licensed. Enterprise-only identity and advanced permission features must be re-evaluated when BYH supplies its authentication requirements.

## Current acceptance criteria

- [x] Thai is the default website route.
- [x] Thai, English and Chinese use separate URLs.
- [x] Company-specific factory narrative and evidence ledger are visible.
- [x] Generic generated imagery is explicitly labelled as conceptual.
- [x] Public assistant returns citations and avoids unsupported promises.
- [x] Employee assistant demonstrates Thai-first, citation-based answers and human-review flags.
- [x] Operations console covers approvals, content and annual maintenance.
- [ ] BYH-approved images, video, certificates, contacts and internal documents are available.
- [ ] Real authentication, Onyx deployment and document-level permissions are configured.
- [ ] Thai technical translator has reviewed all production content.
- [ ] Real RFQ submission, retention policy and privacy notices are approved.
- [ ] Private customer Preview has been visually accepted.

## Explicit non-goals for this stage

- No production deployment or official BYH domain.
- No email outreach.
- No real employee accounts or confidential document ingestion.
- No publication of customer names or unconfirmed certificates.
- No promise of price, delivery, certification or capacity.

## Next decision gate

After the private visual and functional review, prepare a sales package. External outreach and any public deployment require explicit authorization.
