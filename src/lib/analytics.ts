import { track } from "@vercel/analytics";

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, params?: AnalyticsParams) => void;
  }
}

export function trackEvent(eventName: string, params?: AnalyticsParams) {
  if (typeof window === "undefined") return;

  const definedParams = Object.fromEntries(
    Object.entries(params || {}).filter(([, value]) => value !== undefined),
  ) as Record<string, string | number | boolean>;

  try {
    track(eventName, definedParams);
  } catch {
    // Analytics must never interrupt the conversion path.
  }

  // Google receives only bounded event labels, never form values or arbitrary strings.
  const keys = new Set(["form", "location", "label", "guide", "landing_source", "assessment_source"]);
  const googleParams = Object.fromEntries(Object.entries(definedParams).filter(([key, value]) =>
    keys.has(key) && (typeof value === "boolean" || (typeof value === "number" && Number.isFinite(value)) ||
      (typeof value === "string" && /^[a-z0-9_-]{1,120}$/i.test(value)))
  ));
  window.gtag?.("event", eventName, googleParams);
}
