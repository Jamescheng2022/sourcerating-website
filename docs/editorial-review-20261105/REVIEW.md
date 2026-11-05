# Local Kit integration and release-review corrections

This follow-up is based on the reviewed CI commit
`9dfe55c6b96c5edef4eb90f5d49cc8f9676e1969`, on the isolated branch
`fix/pr37-mobile-topics-20261105-astra`. The new changes remain local pending
independent review. The green GitHub run for `9dfe55c` does not validate this
follow-up. No new push, PR update, merge, production deployment or domain change
was performed.

## Kit input identity and lifecycle

The coordinating task supplied exact patch text from the previously reviewed
Library package `libfile_11691f1db18c8191b70f702a7419b4db`. The supplied UTF-8/LF
patch was materialized as task input, verified as **14,463 bytes**, and matched
SHA256 `15f93f9a2cd215263ca19b2251b5499d9d2516d21e0946e4c04524e6ff00f82a`.
`git apply --check` passed against clean `9dfe55c` before application. This was
not a retry of the failed Windows Library ZIP materialization; no helper was
modified and no Library metadata was fabricated.

The form uses the exact `async`, `data-uid="43bff6853a"` and
`https://sourcerating.kit.com/43bff6853a/index.js` embed. Kit owns submission and
confirmation. The component never submits an address or claims subscription
success. It appears after the third article, at the end of a one/two-result
feed, and after the author area on article pages. Empty results have no form.

Compared with the supplied patch, script insertion is deferred by a cancellable
zero-delay timer. Actual React development StrictMode testing confirms its
immediate effect replay does not start a duplicate provider request. Cleanup
disconnects the local observer, clears both timers/listeners and detaches only
the owned mount. Form rendering, not the script load event, determines ready
state; a 20-second watchdog reports failure and late rendering can recover.

Privacy text now explicitly discloses automatic connection to Kit before
subscription, separately from the unchanged Google Analytics choice. The GA
consent implementation was not modified.

**Real Kit remains unverified.** All provider requests in browser tests were
intercepted before network dispatch and replaced with a clearly identified local
mock, or blocked by the existing CDP harness. The mock uses the current script's
local mount. It cannot prove how the inaccessible real script behaves with
global UID lookup, navigation or delayed execution. The earlier HTTP 403 was not
retried, no real email was entered/submitted, and no actual subscription is
claimed. Real-provider behavior remains a release gate.

## Confirmed review issues and before/after evidence

| Issue at `9dfe55c` | Local correction | Verification |
|---|---|---|
| Repeated `q` was a string array and could throw `toLowerCase` TypeError | Shared normalization: first value wins, including an empty first value; trim query; unknown topic becomes All | Real React SSR and actual GETs for duplicate q/topic, empty/unknown values and normal search |
| Home lacked canonical; About inherited home metadata | Clean root/blog canonical and separate About title, description, canonical and OG URL | Actual SSR head readback for nine URLs; effective search/topic variants use `noindex, follow` |
| Missing slugs appeared as a fabricated `0 views`; nine new articles postdate the snapshot | Missing/out-of-period records show `Views not yet available`; 5/2/2/2 retained; period and limitations screen-reader accessible | React rendering tests for all nine new articles, both missing and out-of-period data, and all four verified counts |
| Crate whole-case and IPPC-detail bytes were paired with opposite captions/sources | Whole case uses body0; mark detail uses body1; provenance src/hash and CDP expectations synchronized | Original local JPEG pixels inspected; two actual 390px viewport screenshots inspected with complete captions; pairing/hash regression |
| NASA caption reversed the digital protractor's role | `Calibration using a digital protractor at NASA Armstrong.` | Display data, provenance and CDP fixture/expectation synchronized |
| Laboratory photo credit omitted photographer | `Dean Calma / IAEA` | Display and provenance credit synchronized |
| Import QC provenance statement lacked the direct index source | Link to `https://www.importqc.com/sample-reports/` supplied by the independent reviewer | Existing limits about anonymized sample / not contractual use / no SourceRating audit retained |
| Intermediate nine-photo manifest could be mistaken for final inventory | Explicit historical-artifact README beside it, pointing to final 64-image provenance and rendered registry | No intermediate hash/dimension claims substituted for final evidence |

Next serializes the homepage root URL as `https://www.sourcerating.com` in HTML;
its normalized URL identity is `https://www.sourcerating.com/`. SSR assertions
require real head tags and compare URL identities. About remains exactly
`https://www.sourcerating.com/about`. Article metadata was not otherwise changed.

See [analytics-verification.md](analytics-verification.md) for the independently
confirmed GA4 account, period, production-host scope and supplied evidence
hashes. The four counts are verified; the historical snapshot extraction time
is not independently established. Numeric values, period and updatedAt are
unchanged.

The plywood before/after visual evidence in the companion review archive is:

- `visual/before-crate-figure-1-390px.png`: IPPC detail incorrectly captioned as
  support/forklift geometry, cropped from the previous real CI-fix local smoke.
- `visual/before-crate-figure-2-390px.png`: whole case incorrectly captioned as
  the mark detail, from that same prior smoke.
- `visual/crate-body0-390px.png`: actual final local page, whole case and support
  geometry caption visible together.
- `visual/crate-body1-390px.png`: actual final local page, IPPC detail and mark
  caption visible together.

The two image byte hashes are respectively
`2d2b534879af152ca968db2cf38cded0cc7f50d1e6c372931f6945f3a2f10314` (body0)
and `16d925d652de34a6349fa22dc8c65225079cf4e88584815bca0b0cbe9b06c7dc` (body1).
Pixel inspection establishes the depicted subject; hashes alone cannot establish
caption semantics. This follow-up changed mappings/captions/credit, not image
bytes. The original editorial rebuild intentionally replaced/rearranged media;
what it preserved was the original prose and URLs, not every original image.

## Actual local checks and limitations

- Production build: PASS with existing dependencies, webpack and one worker;
  59 routes generated. Default Windows Turbopack was not retried in this phase
  after its earlier recorded baseline worker failure. CI uses Ubuntu/Node 22;
  local tests used Windows/Node 24.15.0.
- TypeScript `tsc --noEmit`: PASS.
- Full lint: PASS with 0 errors and 13 warnings. All 13 warning rules/messages
  match `9dfe55c` (12 in the existing offline harness test, one existing `<img>`
  warning). An initially introduced test variable-name lint error was fixed;
  final changed-test lint also passes. No rule was disabled.
- Publication preflight: PASS, 693 checks across 39 articles; existing warnings
  remain. Publication tests: 10 PASS. Legacy/content/media checks: 52 PASS,
  including newsletter placement for zero through four articles.
- Editorial regression suite: 6 PASS including actual SSR head readback and
  the two previously crashing URLs.
- Real React/Chrome mock suite: 13 PASS, including StrictMode, duplicate mounts,
  immediate unmount, delayed response, script failure, actual 20-second timeout
  and recovery, Next client navigation/Back/Forward, placements, empty results,
  and both corrected crate viewports. These are mock-provider results only.
- Complete deterministic offline CDP harness: PASS after updating its NASA
  caption fixture; all original negative checks remain.
- Real Chromium overflow fixtures: 60 PASS across 320/375/390/430/1280px.
- **Full final 390px CDP smoke: FAILED locally.** Two attempts lost Chrome with
  WebSocket 1006 during the first long full-page screenshot after calibration
  geometry and metadata passed. Both failure receipts/logs are retained; there
  is no final PASS manifest or final full-smoke bundle validation. No further
  retry or weakening was attempted. The separate bounded 390px screenshots
  above provide visual evidence, not a replacement PASS for that gate.
- No GitHub run, real Kit form verification, subscription submission or live
  publication was performed for these new commits. Independent review and the
  remaining gates must precede any release.

The companion review archive contains complete diffs, commit patches, test logs,
before/after viewport images, exact file hashes and a final checkout receipt.
