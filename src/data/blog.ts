import { maerskAsiaMiddleEastPssPost } from "@/content/blog/maersk-asia-middle-east-peak-season-surcharge-buyer-guide";
import { electronicBillOfLadingPost } from "@/content/blog/electronic-bill-of-lading-cargo-release-buyer-checklist";
import { cbamSteelEmissionsPost } from "@/content/blog/eu-cbam-steel-supplier-emissions-data-2026";
import newEditorialPosts from "@/content/blog/editorial-expansion-20261104.json";
import { applyEditorialMedia } from "@/lib/editorial-media";
import { blogPosts as existingPosts } from "@/content/blog/legacy-posts";
import type { BlogPost } from "@/content/blog/legacy-posts";
import { acceptanceSamplingPost } from "@/content/blog/accepted-sampling-lot-not-zero-defects";
import { isoScopePost } from "@/content/blog/iso-9001-certificate-factory-scope";
import { calibrationPost } from "@/content/blog/calibration-sticker-measurement-tolerance";
import { saltSprayPost } from "@/content/blog/salt-spray-hours-not-service-life";
import { laboratoryScopePost } from "@/content/blog/accredited-laboratory-specific-test-scope";
import { stainlessCarbonPost } from "@/content/blog/xrf-316l-carbon-verification";
import { plywoodPackingPost } from "@/content/blog/plywood-crate-solid-wood-skids-ispm15";
import { containerMassPost } from "@/content/blog/packing-list-weight-container-vgm";
import { tariffCodePost } from "@/content/blog/supplier-hs-code-destination-import-classification";
import { epdComparisonPost } from "@/content/blog/epd-carbon-comparison-functional-unit-boundary";
import { weldEvidencePost } from "@/content/blog/weld-photo-not-joint-release-evidence";

export type { BlogPost } from "@/content/blog/legacy-posts";

// Existing articles retain their original records and relative order.
export const blogPosts: BlogPost[] = ([
  maerskAsiaMiddleEastPssPost,
  electronicBillOfLadingPost,
  cbamSteelEmissionsPost,
  ...(newEditorialPosts as BlogPost[]),
  weldEvidencePost,
  isoScopePost,
  calibrationPost,
  saltSprayPost,
  laboratoryScopePost,
  stainlessCarbonPost,
  plywoodPackingPost,
  containerMassPost,
  tariffCodePost,
  epdComparisonPost,
  acceptanceSamplingPost,
  ...existingPosts,
] as BlogPost[]).map(applyEditorialMedia);

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
