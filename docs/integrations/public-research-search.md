# Public research search — B lane

`GET /api/research/search?q=ASTM+A123&kind=article&limit=20&offset=0`

Searches the existing article registry (including article body text), official resource metadata and preview Field Kit descriptions. `kind` accepts `all`, `article`, `resource`, `kit`, `research`; `category` is an optional exact category from the response. Words in `q` are matched together, case-insensitively with Unicode normalization. Title matches rank first; dates and IDs provide deterministic ordering. No model call, telemetry event or upstream service is involved. Results return a public title, excerpt, destination, category and honest availability status; no full body index or internal fields.

The homepage is owned by A lane. This change does not wire or replace its UI. Its client can fetch this endpoint, render `results`, show `total`, and keep query/filter state in the URL. Kit results are previews, not downloads or checkout. Official resources link to their original publishers.

## HyperResearch boundary

`src/data/public-research.json` deliberately starts as an empty array. The endpoint is usable with current site content even with no research export. `researchBridge.available` reports accepted export count; `liveResearch: false` explicitly states this is not a live research agent.

Only sanitized, independently reviewed, already-published output belongs in this file. Never copy a VM database, worker output, private report, source excerpt or credentials into it. A future export must include:

| Field | Requirement |
| --- | --- |
| `id` | Unique lowercase slug |
| `title`, `excerpt`, `category` | Public approved text only |
| `publicUrl` | Already live `https://[www.]sourcerating.com/blog/<slug>` or `/intelligence/<slug>` |
| `sourceDate`, `reviewedAt` | Valid ISO dates, review at or after source date |
| `qaStatus` | Exactly `approved` |
| `rightToPublish` | Exactly `true` |
| `provenance` | 1–20 public `{title, url}` references to published SourceRating evidence pages |

Primary source citations remain on those published evidence pages. This initial adapter deliberately does not ingest arbitrary external URLs. Unknown fields are omitted. Invalid records are omitted, duplicate IDs are deduplicated. There is no network fetch, arbitrary path/host input, environment lookup or route to the private HyperResearch service. These checks are a publication boundary, not a replacement for editorial review or proof of rights. No research record has been approved or published by this change.

## Verification

Run `node --test scripts/test-research-search.mjs`, `npx tsc --noEmit`, and `npx eslint src/lib/research-catalog.ts src/app/api/research/search/route.ts scripts/test-research-search.mjs`. Tests load the actual registries and handler with network, logging and environment access disabled. They cover cross-content search, filters, paging, validation, research projection, rejected private destinations and the HTTP response. Synthetic research fixtures exist only in tests.

Production merge, frontend browser acceptance, merchant account/product/delivery verification and independent review remain separate. No Gumroad or pricing configuration is changed.
