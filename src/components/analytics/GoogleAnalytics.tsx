import { GoogleAnalyticsConsent } from "./GoogleAnalyticsConsent";

export function GoogleAnalytics() {
  const gaId = (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_ID || "").trim();
  if (process.env.VERCEL_ENV !== "production" || !/^G-[A-Z0-9]+$/.test(gaId) || /^G-X+$/.test(gaId)) return null;

  // GA4 Enhanced Measurement owns history-based page views. Do not add a
  // second router listener or a GTM GA4 tag for this same stream.
  return <GoogleAnalyticsConsent gaId={gaId} debugMode={process.env.GA4_DEBUG_MODE === "true"} />;
}
