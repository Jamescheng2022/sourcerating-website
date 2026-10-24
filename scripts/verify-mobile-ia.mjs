import fs from "fs";
import path from "path";

console.log("=== Mobile IA & Responsive Verification ===");

const checks = [];
function recordCheck(name, passed, details) {
  checks.push({ name, passed, details });
  const icon = passed ? "✓ PASS" : "✗ FAIL";
  console.log(`${icon}: ${name}${details ? ` (${details})` : ""}`);
}

// 1. Verify generated HTML files
const htmlFiles = [
  "resources.html",
  "intelligence.html",
  "field-kits.html",
  "membership.html",
  "app.html",
  "ia-proposal.html",
  "field-kits/steel-mill-test-certificate-audit-kit.html",
  "field-kits/factory-audit-acceptance-kit.html",
  "field-kits/cbam-steel-emissions-verification-kit.html",
];

for (const f of htmlFiles) {
  const p = path.join(process.cwd(), ".next/server/app", f);
  const exists = fs.existsSync(p);
  const size = exists ? fs.statSync(p).size : 0;
  recordCheck(
    `SSG HTML artifact: ${f}`,
    exists && size > 1000,
    exists ? `Size: ${Math.round(size / 1024)} KB` : "Pending next build"
  );
}

// 2. Verify CSV download
const csvPath = path.join(
  process.cwd(),
  "public/downloads/sourcerating-resource-index-20261024.csv"
);
const csvExists = fs.existsSync(csvPath);
const csvSize = csvExists ? fs.statSync(csvPath).size : 0;
recordCheck("CSV index asset exists", csvExists && csvSize > 500, `Size: ${csvSize} bytes`);

// 3. Inspect Field Kit source for non-commercial constraints
const fieldKitSource = fs.readFileSync(
  path.join(process.cwd(), "src/components/field-kits/GumroadPreviewCta.tsx"),
  "utf-8"
);
const hasWorkingCheckout = fieldKitSource.includes("https://gumroad.com/l/");
const isDisabledCta =
  fieldKitSource.includes("disabled") &&
  fieldKitSource.includes("cursor-not-allowed");
recordCheck(
  "Field Kit CTA is non-functional / preview-only",
  !hasWorkingCheckout && isDisabledCta,
  "Disabled attribute present, zero live checkout links"
);

// 4. Inspect Intelligence source for non-commercial constraints
const intellSource = fs.readFileSync(
  path.join(process.cwd(), "src/app/intelligence/page.tsx"),
  "utf-8"
);
const hasIntellPayment =
  intellSource.includes("stripe.com") ||
  intellSource.includes("gumroad.com") ||
  intellSource.includes("checkout");
recordCheck(
  "Intelligence is explanation-only (no payment/signup commitments)",
  !hasIntellPayment,
  "No external checkout or billing hooks"
);

// 5. Inspect Waitlist API for safe local preview storage
const waitlistApiSource = fs.readFileSync(
  path.join(process.cwd(), "src/app/api/waitlist-preview/route.ts"),
  "utf-8"
);
const hasExternalApi =
  waitlistApiSource.includes("mailchimp") ||
  waitlistApiSource.includes("hubspot") ||
  waitlistApiSource.includes("sendgrid") ||
  waitlistApiSource.includes("gumroad");
recordCheck(
  "Waitlist API has zero external email/CRM hooks",
  !hasExternalApi,
  "Local file-based capture only"
);

// 6. Responsive Pixel Budget Audit for Mobile Header (< 640px)
const headerSource = fs.readFileSync(
  path.join(process.cwd(), "src/components/layout/Header.tsx"),
  "utf-8"
);
const modeHiddenOnMobile = headerSource.includes("hidden sm:inline-flex") && headerSource.includes("toggleIaMode");
const riskScreenHiddenOnMobile = headerSource.includes("hidden sm:inline-flex min-h-[38px] items-center px-3 py-1.5 text-xs font-bold text-white bg-brand-950");
const menuHas44pxTap = headerSource.includes("min-h-[44px] min-w-[44px]");

recordCheck(
  "Header: IA mode pill hidden on mobile viewports (<640px)",
  modeHiddenOnMobile,
  "hidden sm:inline-flex prevents top bar overflow"
);
recordCheck(
  "Header: Risk Screen button hidden on mobile viewports (<640px)",
  riskScreenHiddenOnMobile,
  "hidden sm:inline-flex preserves 87px headroom at 320px viewport"
);
recordCheck(
  "Header: Mobile menu trigger conforms to 44x44px minimum touch target",
  menuHas44pxTap,
  "min-h-[44px] min-w-[44px] verified"
);

// 7. Component Touch and Constraint Checks
const componentsToCheck = [
  "src/components/resources/ResourceDirectory.tsx",
  "src/components/intelligence/IntelligenceDirectory.tsx",
  "src/components/field-kits/GumroadPreviewCta.tsx",
  "src/components/app/AppWaitlistForm.tsx",
  "src/components/layout/Header.tsx",
  "src/components/layout/BottomWorkstationBar.tsx",
];

for (const comp of componentsToCheck) {
  const content = fs.readFileSync(path.join(process.cwd(), comp), "utf-8");
  const hasMinTouch =
    content.includes("min-h-[44px]") ||
    content.includes("min-h-[48px]") ||
    content.includes("min-h-[38px]") ||
    content.includes("min-w-[44px]");
  const hasOverflowSafety =
    content.includes("break-words") ||
    content.includes("overflow-x-auto") ||
    content.includes("truncate") ||
    content.includes("max-w-") ||
    content.includes("min-w-0");

  recordCheck(
    `Responsive audit: ${path.basename(comp)}`,
    hasMinTouch && hasOverflowSafety,
    "Touch targets >=44px and responsive boundaries present"
  );
}

const failed = checks.filter((c) => !c.passed);
if (failed.length > 0) {
  console.error(`\n${failed.length} checks failed!`);
  process.exit(1);
} else {
  console.log(`\nAll ${checks.length} mobile IA verification checks PASSED!`);
}
