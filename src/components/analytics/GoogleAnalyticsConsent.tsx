"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import { GoogleAnalytics as NextGoogleAnalytics } from "@next/third-parties/google";
import { usePathname } from "next/navigation";

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
  // Do not initialize the tag when entering a private operations page.
  if (pathname?.startsWith("/jbxz") || pathname?.startsWith("/admin")) return null;
  function choose(value: "granted" | "denied") {
    try { localStorage.setItem(key, value); } catch { return; }
    // A reload removes the already-running tag after consent withdrawal.
    if (consent === "granted" && value === "denied") { window.location.reload(); return; }
    window.dispatchEvent(new Event(changed));
  }
  return <>
    {consent === "granted" && <>
      <Script id="ga4-privacy" strategy="afterInteractive">{`
        window.dataLayer=window.dataLayer||[];
        window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
        window.gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
        window.gtag('set',{allow_google_signals:false,allow_ad_personalization_signals:false${debugMode ? ",traffic_type:'internal'" : ""}});
      `}</Script>
      <NextGoogleAnalytics gaId={gaId} debugMode={debugMode} />
    </>}
    {consent === null ? <section aria-label="Analytics preferences" style={{position:"fixed",bottom:16,left:16,right:16,zIndex:1000,padding:16,background:"#fff",color:"#17202a",border:"1px solid #89939e",borderRadius:8,maxWidth:560,boxShadow:"0 3px 18px #0002"}}>
      <p style={{margin:"0 0 12px"}}>Allow Google Analytics cookies to help us understand visits? Optional analytics stays off until you allow it. You can change this choice at any time.</p>
      <button type="button" onClick={() => choose("granted")} style={{padding:"8px 14px",marginRight:12,border:"1px solid currentColor",borderRadius:4}}>Allow analytics</button>
      <button type="button" onClick={() => choose("denied")} style={{padding:"8px 14px",border:"1px solid currentColor",borderRadius:4}}>Reject analytics</button>
    </section> : <button type="button" aria-label={consent === "granted" ? "Turn off Google Analytics" : "Allow Google Analytics"} onClick={() => choose(consent === "granted" ? "denied" : "granted")} style={{position:"fixed",bottom:8,left:8,zIndex:900,padding:"4px 8px",background:"#fff",color:"#17202a",fontSize:12,border:"1px solid #89939e",borderRadius:4}}>
      Analytics: {consent === "granted" ? "on — turn off" : "off — allow"}
    </button>}
  </>;
}
