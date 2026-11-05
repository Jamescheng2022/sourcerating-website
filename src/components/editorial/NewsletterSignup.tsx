"use client";

import { useEffect, useId, useRef, useState } from "react";

const FORM_UID = "43bff6853a";
const FORM_SCRIPT = `https://sourcerating.kit.com/${FORM_UID}/index.js`;
const LOAD_TIMEOUT_MS = 20_000;

/** The provider owns submission and confirmation. This component never sends an email address. */
export function NewsletterSignup() {
  const headingId = useId();
  const hostRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let active = true;
    // Each effect owns a fresh mount. Cleanup detaches only this local DOM.
    // An old script may still execute; Kit-wide effects or global UID lookup
    // require real-provider navigation testing before this patch is released.
    const mount = document.createElement("div");
    host.appendChild(mount);
    setStatus("loading");

    const script = document.createElement("script");
    script.async = true;
    script.dataset.uid = FORM_UID;
    script.src = FORM_SCRIPT;

    const timeout = window.setTimeout(() => {
      if (active) setStatus("error");
    }, LOAD_TIMEOUT_MS);

    // A loaded script is not evidence that the actual provider form rendered.
    const checkForForm = () => {
      if (active && mount.querySelector("form")) {
        window.clearTimeout(timeout);
        setStatus("ready");
      }
    };
    const observer = new MutationObserver(checkForForm);
    observer.observe(mount, { childList: true, subtree: true });
    script.addEventListener("load", checkForForm);
    const handleError = () => {
      if (!active) return;
      window.clearTimeout(timeout);
      setStatus("error");
    };
    script.addEventListener("error", handleError);
    // StrictMode immediately replays effects in development. Defer insertion so
    // cleanup can cancel that first mount before it starts a provider request.
    const insertion = window.setTimeout(() => {
      if (active) mount.appendChild(script);
    }, 0);

    return () => {
      active = false;
      window.clearTimeout(insertion);
      window.clearTimeout(timeout);
      observer.disconnect();
      script.removeEventListener("load", checkForForm);
      script.removeEventListener("error", handleError);
      mount.remove();
    };
  }, []);

  return (
    <section className="editorial-newsletter" aria-labelledby={headingId}>
      <h2 id={headingId}>SourceRating newsletter</h2>
      <p className="editorial-newsletter-intro">Get new articles on industrial sourcing and procurement by email.</p>
      <div className="editorial-newsletter-embed" ref={hostRef} />
      {(status === "loading" || status === "error") && (
        <p className="editorial-newsletter-status" role="status">
          {status === "loading"
            ? "Loading the signup form…"
            : "The signup form could not load. Please refresh this page to try again."}
        </p>
      )}
      <noscript><p>Enable JavaScript to use the Kit signup form.</p></noscript>
      <p className="editorial-newsletter-privacy">
        This form loads automatically from Kit and connects your browser to Kit before you subscribe. Subscribe only if you want SourceRating emails. You can unsubscribe from each newsletter. <a href="/privacy">Privacy policy</a>.
      </p>
    </section>
  );
}
