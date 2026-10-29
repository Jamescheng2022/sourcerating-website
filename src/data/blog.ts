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
import { chineseSteelStandardDatesPost } from "@/content/blog/chinese-steel-standard-edition-implementation-translation-dates";

export type { BlogPost } from "@/content/blog/legacy-posts";

// Existing articles retain their original records and relative order.
export const blogPosts: BlogPost[] = [
  chineseSteelStandardDatesPost,
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
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
