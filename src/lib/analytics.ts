// GA4 helpers. Safe everywhere: every function is a no-op on the server, when the ID is missing, or when blocked by an ad blocker.
// Set NEXT_PUBLIC_GA_MEASUREMENT_ID (e.g. G-XXXXXXXXXX). In development nothing is sent unless NEXT_PUBLIC_GA_DEBUG=true.

export const GA_ID = (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "").trim();
const DEBUG = process.env.NEXT_PUBLIC_GA_DEBUG === "true";
export const GA_ENABLED = /^G-[A-Z0-9]+$/i.test(GA_ID) && (process.env.NODE_ENV === "production" || DEBUG);

/** Paths that are never tracked (internal staff tools would pollute your numbers). */
export const GA_EXCLUDED_PREFIXES = ["/admin"];
export const isExcludedPath = (path: string) => GA_EXCLUDED_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));

type Param = string | number | boolean | undefined | null;
export type EventParams = Record<string, Param>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __caGaReady?: boolean;
  }
}

/** Creates window.gtag and queues the config call. Commands queued before gtag.js loads are replayed in order by the library. */
export function initGtag() {
  if (!GA_ENABLED || typeof window === "undefined" || window.__caGaReady) return;
  window.dataLayer = window.dataLayer || [];
  // gtag.js needs the real `arguments` object in the queue, not an array.
  if (!window.gtag) {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
  }
  window.gtag("js", new Date());
  // Page views are sent manually on every route change (see Analytics.tsx), so the automatic one is off.
  window.gtag("config", GA_ID, { send_page_view: false, ...(DEBUG ? { debug_mode: true } : {}) });
  window.__caGaReady = true;
}

const clean = (params?: EventParams) => {
  if (!params) return undefined;
  const out: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== null && v !== "") out[k] = typeof v === "string" ? v.slice(0, 100) : v;
  return out;
};

export function trackEvent(name: string, params?: EventParams) {
  if (!GA_ENABLED || typeof window === "undefined") return;
  try { initGtag(); window.gtag?.("event", name, clean(params)); } catch { /* analytics must never break the app */ }
}

export function trackPageView(path: string) {
  if (!GA_ENABLED || typeof window === "undefined" || isExcludedPath(path.split("?")[0])) return;
  trackEvent("page_view", { page_path: path, page_location: window.location.origin + path, page_title: document.title });
}

const seen = new Set<string>();
/** Fires an event once per browser session (e.g. "user started using the calculator"). */
export function trackOnce(key: string, name: string, params?: EventParams) {
  if (typeof window === "undefined" || seen.has(key)) return;
  try { if (sessionStorage.getItem(`ca_ga_${key}`)) { seen.add(key); return; } sessionStorage.setItem(`ca_ga_${key}`, "1"); } catch { /* storage may be blocked */ }
  seen.add(key);
  trackEvent(name, params);
}
