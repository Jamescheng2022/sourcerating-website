"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import { GoogleAnalytics as NextGoogleAnalytics } from "@next/third-parties/google";
import { usePathname } from "next/navigation";
import { useMobileIa } from "@/components/layout/MobileIaContext";
import { cn } from "@/lib/utils";

const key = "ga4_analytics_consent_v1";
const changed = "ga4-consent-changed";
function subscribe(callback: () => void) {
  function storageChanged(event: StorageEvent) {
    // Removing the React component cannot unload a Google script already running.
    if (event.key === null || (event.key === key && event.oldValue === "granted" && event.newValue !== "granted")) {
      window.location.reload();
      return;
    }
    callback();
  }
  window.addEventListener("storage", storageChanged);
  window.addEventListener(changed, callback);
  return () => {
    window.removeEventListener("storage", storageChanged);
    window.removeEventListener(changed, callback);
  };
}
function snapshot() {
  try { return localStorage.getItem(key); } catch { return null; }
}
function serverSnapshot() { return null; }

export function GoogleAnalyticsConsent({ gaId, debugMode }: { gaId: string; debugMode: boolean }) {
  const consent = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const pathname = usePathname();
  const { iaMode } = useMobileIa();

  // Do not initialize the tag when entering a private operations page.
  if (pathname?.startsWith("/jbxz") || pathname?.startsWith("/admin")) return null;

  // Check whether the mobile bottom workstation bar is active on the current page.
  // When active on viewport < 1024px, float above the 56px bottom dock to prevent occluding the Home button.
  const hasBottomBar = Boolean(
    pathname &&
    !pathname.startsWith("/blog/") &&
    !pathname.startsWith("/admin") &&
    !pathname.startsWith("/jbxz") &&
    !(pathname === "/ia-proposal" && iaMode === "editorial")
  );

  function choose(value: "granted" | "denied") {
    try { localStorage.setItem(key, value); } catch { return; }
    // A reload removes the already-running tag after consent withdrawal.
    if (consent === "granted" && value === "denied") { window.location.reload(); return; }
    window.dispatchEvent(new Event(changed));
  }

  return (
    <>
      {consent === "granted" && (
        <>
          <Script id="ga4-privacy" strategy="afterInteractive">{`
            window.dataLayer=window.dataLayer||[];
            window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
            window.gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
            window.gtag('set',{allow_google_signals:false,allow_ad_personalization_signals:false${debugMode ? ",traffic_type:'internal'" : ""}});
          `}</Script>
          <NextGoogleAnalytics gaId={gaId} debugMode={debugMode} />
        </>
      )}
      {consent === null ? (
        <section
          aria-label="Analytics preferences"
          className={cn(
            "fixed z-[1000] p-4 bg-white text-[#17202a] border border-[#89939e] rounded-lg max-w-[560px] shadow-[0_3px_18px_#0002]",
            "left-4 right-4 lg:left-4 lg:right-auto",
            hasBottomBar
              ? "bottom-[calc(3.5rem+env(safe-area-inset-bottom,0px)+12px)] lg:bottom-4"
              : "bottom-[calc(env(safe-area-inset-bottom,0px)+16px)] lg:bottom-4"
          )}
        >
          <p className="m-0 mb-3 text-sm leading-normal">
            Allow Google Analytics cookies to help us understand visits? Optional analytics stays off until you allow it. You can change this choice at any time.
          </p>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="px-3.5 py-2 mr-3 border border-current rounded min-h-[44px] inline-flex items-center text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Allow analytics
          </button>
          <button
            type="button"
            onClick={() => choose("denied")}
            className="px-3.5 py-2 border border-current rounded min-h-[44px] inline-flex items-center text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Reject analytics
          </button>
        </section>
      ) : (
        <button
          type="button"
          aria-label={consent === "granted" ? "Turn off Google Analytics" : "Allow Google Analytics"}
          onClick={() => choose(consent === "granted" ? "denied" : "granted")}
          className={cn(
            "fixed left-2 z-[900] px-2.5 py-1 bg-white text-[#17202a] text-xs border border-[#89939e] rounded min-h-[44px] inline-flex items-center shadow-xs hover:bg-gray-50 transition-colors",
            hasBottomBar
              ? "bottom-[calc(3.5rem+env(safe-area-inset-bottom,0px)+8px)] lg:bottom-2"
              : "bottom-[calc(env(safe-area-inset-bottom,0px)+8px)] lg:bottom-2"
          )}
        >
          Analytics: {consent === "granted" ? "on — turn off" : "off — allow"}
        </button>
      )}
    </>
  );
}
