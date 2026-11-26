"use client";
import Script from "next/script";
import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { GA_ENABLED, GA_ID, initGtag, trackEvent, trackPageView } from "@/lib/analytics";

// Sends a page_view on first load and on every client-side navigation (the App Router does not reload the page).
function RouteTracker() {
  const pathname = usePathname();
  const search = useSearchParams();
  const qs = search?.toString() ?? "";
  useEffect(() => {
    if (!pathname) return;
    // Wait a beat so document.title already reflects the new page.
    const t = setTimeout(() => trackPageView(qs ? `${pathname}?${qs}` : pathname), 80);
    return () => clearTimeout(t);
  }, [pathname, qs]);
  return null;
}

// One delegated listener covers the whole app: no per-link wiring needed.
//  - any element with data-event="name" fires that event (optional data-event-label)
//  - tel: / mailto: / WhatsApp links / outbound links are detected automatically
function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;
      const tagged = target.closest<HTMLElement>("[data-event]");
      const a = target.closest<HTMLAnchorElement>("a[href]");
      const text = (tagged ?? a)?.getAttribute("aria-label") || (tagged ?? a)?.textContent?.trim().replace(/\s+/g, " ").slice(0, 80) || undefined;
      const base = { link_text: text, page_path: window.location.pathname };

      if (tagged?.dataset.event) { trackEvent(tagged.dataset.event, { ...base, event_label: tagged.dataset.eventLabel, link_url: a?.href }); return; }
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) return trackEvent("click_call", base);
      if (href.startsWith("mailto:")) return trackEvent("click_email", base);
      let url: URL;
      try { url = new URL(a.href, window.location.href); } catch { return; }
      if (url.hostname === "wa.me" || url.hostname.endsWith("whatsapp.com")) return trackEvent("click_whatsapp", { ...base, link_url: `${url.origin}${url.pathname}` });
      if ((url.protocol === "http:" || url.protocol === "https:") && url.origin !== window.location.origin) trackEvent("click_outbound", { ...base, link_url: `${url.origin}${url.pathname}`, link_domain: url.hostname });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}

export function Analytics() {
  useEffect(() => { initGtag(); }, []);
  if (!GA_ENABLED) return null;
  return (
    <>
      <Script id="ga4-lib" src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`} strategy="afterInteractive" />
      <Suspense fallback={null}><RouteTracker /></Suspense>
      <ClickTracker />
    </>
  );
}
