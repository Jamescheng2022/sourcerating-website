# Source Rating — China Factory Inspection & Industrial Sourcing

Professional service website for [www.sourcerating.com](https://www.sourcerating.com). Built with Next.js 16, Tailwind CSS, and TypeScript. Deployed on Vercel.

## Quick Start

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # Production build
```

## Deploy to Vercel

1. **Push to GitHub** (see below)
2. Go to [vercel.com/new](https://vercel.com/new) → Import your repo
3. Vercel auto-detects Next.js — no configuration needed
4. Add custom domain: `www.sourcerating.com`
5. Done! Auto-deploys on every push

## Production environment

Configure these variables in Vercel before accepting live inquiries:

- `RESEND_API_KEY` — sends contact and risk-screen leads.
- `CONTACT_TO` — destination mailbox; defaults to `contact@sourcerating.com`.
- `DEEPSEEK_API_KEY` — optional AI assessment for the free risk screen. The rules-based screen remains available without it.
- `DEEPSEEK_MODEL` — optional model override.
- `NEXT_PUBLIC_GA_ID` — optional Google Analytics property. Vercel Web Analytics and Speed Insights are included independently.
- `KV_REST_API_URL` & `KV_REST_API_TOKEN` (or `DATABASE_URL`) — **Owner Gate for Mobile App Waitlist:** Public waitlist intake is currently disabled / in-preparation with the `/api/waitlist-preview` route kept fail-closed (HTTP 503). Before public launch, the Owner must provision persistent storage (e.g. Vercel KV / Upstash Redis via `KV_REST_API_URL`/`KV_REST_API_TOKEN` or PostgreSQL via `DATABASE_URL`) and connect it in `src/app/api/waitlist-preview/route.ts`.

Both public forms apply same-origin checks, payload limits, a honeypot, best-effort per-IP throttling, and structured logs without lead PII. After changing form or email configuration, verify the full browser → API → mailbox path with a clearly marked internal test.

## Push to GitHub

```bash
git init
git add -A
git commit -m "Initial commit: Source Rating website"
git branch -M main
git remote add origin https://github.com/sourcerating/sourcerating-website.git
git push -u origin main
```

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── layout.tsx        # Root layout + SEO + JSON-LD
│   ├── page.tsx          # Homepage (assembles 8 sections)
│   ├── services/         # /services
│   ├── industries/       # /industries  
│   ├── case-studies/     # /case-studies
│   ├── about/            # /about
│   ├── contact/          # /contact (with form)
│   ├── faq/              # /faq (with FAQPage schema)
│   ├── blog/             # /blog + [slug] dynamic route
│   └── not-found.tsx     # 404
├── components/
│   ├── layout/           # Header, Footer
│   ├── home/             # Hero, ValueProps, ServicesGrid, WhyChooseMe,
│   │                     # IndustriesSection, Workflow, CTASection, HomeFAQ
│   ├── shared/           # ContactForm
│   └── ui/               # SectionHeading
├── data/                 # All content: services, industries, case studies, FAQ, site config
├── lib/                  # Utils (cn) + SEO metadata generators
└── content/blog/         # Typed article files; import them from src/data/blog.ts
```

## Publish professional articles

Website publishing is governed by the versioned **[SourceRating Publishing Skill](.agents/skills/sourcerating-publish/SKILL.md)**, alongside the [editorial standard](docs/editorial/SOURCERATING_EDITORIAL_STANDARD.md).

This is a GitHub/Vercel release procedure, not a second scheduled task. Current website routes read the `blogPosts` registry in `src/data/blog.ts`; **uploading a Markdown file into `src/content/blog` alone does not publish an article.**

Run deterministic source and image checks before PR merge:

```bash
npm ci
npm run check:publication
npm run test:publication
node scripts/check-editorial-publication.mjs --slug ARTICLE_SLUG
npm run build
```

After the reviewed PR is merged and Vercel reports the matching **production** commit READY, verify the actual public page, cover, mobile diagrams, index and sitemap:

```bash
node scripts/check-editorial-publication.mjs --slug ARTICLE_SLUG --live --origin https://www.sourcerating.com
```

GitHub Actions runs the source preflight and Next build for publication-related PRs. Passing those checks does not replace independent editorial/factual review or production HTTP readback. Keep LinkedIn artwork/drafts separate from claims about an actually published LinkedIn post.

## Content Editing

- **Services:** `src/data/services.ts`
- **Industries:** `src/data/industries.ts`
- **Case Studies:** `src/data/case-studies.ts`
- **FAQ:** `src/data/faq.ts`
- **Site Config:** `src/data/site-config.ts` (contact, nav, social)

## SEO Features

- Page-specific meta + Open Graph + Twitter Cards
- JSON-LD Organization schema (all pages)
- JSON-LD FAQPage schema (/faq page)
- `robots.txt` + `sitemap.xml`
- Canonical URLs + semantic HTML

## Next Steps

1. Replace placeholder images in `public/images/`
2. Add new buyer guides in `src/data/blog.ts`
3. Review all content in `src/data/` files
4. Review Vercel Web Analytics, Speed Insights, and structured form logs after each launch
