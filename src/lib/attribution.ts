// Reads the first-party ca_origin cookie set by proxy.ts. No personal data in it.
export type Origin = {
  firstPageUrl?: string; referrer?: string; gclid?: string; fbclid?: string;
  utm?: { source?: string; medium?: string; campaign?: string; content?: string; term?: string };
};
export function readOrigin(): Origin {
  if (typeof document === "undefined") return {};
  const m = document.cookie.split("; ").find((c) => c.startsWith("ca_origin="));
  if (!m) return {};
  try { return JSON.parse(decodeURIComponent(m.slice("ca_origin=".length))); } catch { return {}; }
}
export function flag(name: "usedTool" | "downloadedDatasheet", on = true) { try { sessionStorage.setItem(`ca_${name}`, on ? "1" : ""); } catch { /* storage may be blocked */ } }
export function getFlag(name: string) { try { return sessionStorage.getItem(`ca_${name}`) === "1"; } catch { return false; } }
