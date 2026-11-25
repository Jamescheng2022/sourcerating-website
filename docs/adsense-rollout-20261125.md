# AdSense content-only rollout

Status: disabled by default; this PR does not enable monetization or establish consent compliance.

- Confirm AdSense site status is Ready; create a real responsive display ad unit for this site.
- Install and independently verify a Google-certified CMP that loads before the ad script, supports current IAB TCF, Google vendor 755, and user withdrawal. This component deliberately fails closed for missing or negative consent signals (including regions without explicit opt-in signals).
- Keep Auto ads disabled for this domain to avoid ads on checkout, workspaces, paywalls, and other ineligible routes.
- Configure production only: NEXT_PUBLIC_ADSENSE_ENABLED=true and NEXT_PUBLIC_ADSENSE_CONTENT_SLOT=<real ten-digit AdSense slot ID>. VERCEL_ENV must be production. No live ads on preview, localhost, or *.vercel.app.
- Verify privacy policy, CMP controls, CSP, ads.txt, and live slot requests. Do not click real ads.
- Before enablement, test 390/768/1440 widths, denied/missing/withdrawn consent, navigation, unfilled slots, and absence of requests on all excluded routes. Use mocked script/network for testing. Do not represent this branch as tested or approved until CI and browser evidence exist.
- Rollback: disable NEXT_PUBLIC_ADSENSE_ENABLED and rebuild production, or revert this PR. No database migration.
