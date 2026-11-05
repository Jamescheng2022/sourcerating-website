# SourceRating content-site rebuild — 4 November 2026

The old service-led home, repeated navigation and article wrappers obscure the content. This change makes procurement articles the home page, uses one horizontal topic navigation, and shares a compact header/footer across all existing routes. Author contact remains below articles and in a secondary sidebar.

## Scope

- Keeps the 30 original article slugs, dates and prose. Media-only overrides operate on the canonical registry and retain future newly registered articles.
- 30 individual covers; 55 distinct local image files/placements with no cross-article image reuse. Photographs and original certificate/document images are accurately distinguished. Historical certificates and training exercises are explicitly identified, without implying current certification or a real commercial case.
- Removes previous generic stock/category fallback and synthetic legacy figures from these migrated article presentations. Fixes the two reversed wood-crate image/caption assignments.
- Preserves canonical metadata, sitemap, article/publication digest, author schema, consent analytics, AdSense verification and existing API/service routes.
- Search and topics filter on the server, including direct URL parameters and subsequent navigation.
- Balanced parentheses in source/credit URLs are retained by inline link rendering.

## Evidence

Final source build passes; all 30 article routes generated. Existing publication comparison tests: 10 passed. Source publication checker passes 692 checks for 39 articles; warnings for original articles lacking explicit references remain visible and have not been suppressed. Exact media provenance and licenses: editorial-photo-provenance-20261104.json.

The separate static review site was inspected in the browser on desktop and its live search returned the calibrated-gauge article. Native Next.js browser QA remains incomplete: the managed preview launcher appends Vite flags that Next rejects. No working application script was changed to compensate. The native production build and source checks pass; those are not a production release.

## Outstanding work

Added nine researched articles with cross-review, source/claim records and nine additional real photographs (39 total articles, 64 media files). Public article-view labels now use a completed GA4 snapshot for the production hosts only, 2026-01-01 through 2026-11-03; 5/2/2/2 recorded views for the four reported articles, no invented popularity. The existing daily operation task now refreshes the same snapshot through the prior publication path. This is recorded page views, not unique humans or a realtime counter; consent gaps can undercount. Deeper revisions to older prose/reference quality remain ongoing editorial work.

Main snapshot: 16d749fef5875e46f0f423999e4632321bcf4015. Existing frozen editorial workflow contains pinned integration identities for earlier narrow photo PRs; review its applicability to this new scope without bypassing or weakening protected gates. No domain or production deployment changed by this branch.
