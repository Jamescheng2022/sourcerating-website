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

  window.gtag?.("event", eventName, definedParams);
}
