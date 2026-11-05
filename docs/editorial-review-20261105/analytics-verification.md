# Historical article view snapshot verification

The coordinating reviewer independently queried Windsor's connected Google
Analytics 4 channel for the SourceRating account and supplied the following
verification on 2026-11-05. This document records that supplied review evidence;
the implementation worker did not perform a new analytics query.

The requested period remains **2026-01-01 through 2026-11-03**. The metric is
`screen_page_views`: repeated page views count. These are neither unique readers
nor completed reads, and visits without analytics consent may be absent.

| Article | Independently confirmed views |
|---|---:|
| plywood-crate-solid-wood-skids-ispm15 | 5 |
| calibration-sticker-measurement-tolerance | 2 |
| salt-spray-hours-not-service-life | 2 |
| supplier-hs-code-destination-import-classification | 2 |

The account/field/period query completed at approximately **01:38 UTC** and
returned `done` with eight rows. A further query including the documented
`hostname` dimension, without a hostname filter, completed at approximately
**01:40 UTC** with ten rows. All four article counts above belonged exclusively
to `www.sourcerating.com`; no local or preview hostname contributed to them.
Other property paths did contain localhost traffic. Future imports must retain
the explicit production-host restriction and must not use total property views
as production traffic.

Original review evidence SHA256s, supplied by the coordinating reviewer:

- Account/period response: `9815c645f214c2c6470c3a8214053644d9811fa24d7468c04b4fff9e23518996`
- Hostname response: `e47cf9896f6093ed61472e0d8ff4e9264c2be84122149b5d3d1eba805206f1d3`

The original `updatedAt: 2026-11-04` is retained in the snapshot. The later query
confirms the values and host scope, not that historical extraction time.
Missing slugs and articles published after the period now display **Views not
yet available**; they are not converted to a fabricated zero. The period and
metric limitations are screen-reader accessible, rather than only a tooltip.
No analytics consent implementation or numeric snapshot value was changed.
