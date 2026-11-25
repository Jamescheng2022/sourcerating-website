"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type Consent = {
  eventStatus?: string;
  cmpStatus?: string;
  tcString?: string;
  listenerId?: number;
  purpose?: { consents?: Record<number, boolean> };
  vendor?: { consents?: Record<number, boolean> };
};
type TcfApi = (command: string, version: number, callback: (data: Consent, success: boolean) => void, parameter?: number) => void;
type AdWindow = Window & { __tcfapi?: TcfApi; adsbygoogle?: object[] };
const publisher = "ca-pub-4813203643604350";

// Fail closed until a separately installed, Google-certified CMP provides consent.
export function ContentAd({ enabled, slot, hosts }: { enabled: boolean; slot: string; hosts: string[] }) {
  const [consented, setConsented] = useState(false);
  const requested = useRef(false);
  const unit = useRef<HTMLModElement>(null);
  const configured = enabled && /^\d{10}$/.test(slot);

  useEffect(() => {
    if (!configured || !hosts.includes(window.location.hostname)) return;
    const browser = window as AdWindow;
    let active = true;
    let listener: number | undefined;
    let api: TcfApi | undefined;
    const register = () => {
      if (api || !browser.__tcfapi) return;
      api = browser.__tcfapi;
      api("addEventListener", 2, (data, success) => {
        listener = data?.listenerId ?? listener;
        if (!active) {
          if (listener !== undefined) api?.("removeEventListener", 2, () => {}, listener);
          return;
        }
        const allowed = success && data?.cmpStatus === "loaded" &&
          (data.eventStatus === "tcloaded" || data.eventStatus === "useractioncomplete") &&
          Boolean(data.tcString && data.purpose?.consents?.[1] && data.vendor?.consents?.[755]);
        setConsented(allowed);
      });
    };
    register();
    const timer = window.setInterval(() => { register(); if (api) window.clearInterval(timer); }, 500);
    return () => {
      active = false;
      window.clearInterval(timer);
      if (listener !== undefined) api?.("removeEventListener", 2, () => {}, listener);
    };
  }, [configured, hosts]);

  if (!configured || !consented || requested.current && !unit.current) return null;
  return (
    <>
      <Script
        id="content-adsense"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisher}`}
        strategy="afterInteractive"
        crossOrigin="anonymous"
        onReady={() => {
          if (!unit.current || requested.current) return;
          requested.current = true;
          try { ((window as AdWindow).adsbygoogle ??= []).push({}); } catch { /* No retry or automatic refresh. */ }
        }}
      />
      <ins
        ref={unit}
        className="adsbygoogle editorial-ad"
        style={{ display: "block", width: "100%", maxWidth: "760px", margin: "2rem auto" }}
        data-ad-client={publisher}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <style>{'ins.editorial-ad[data-ad-status="unfilled"] { display: none !important; }'}</style>
    </>
  );
}
