"use client";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { api, toApiError } from "@/lib/api";

export function useFetch<T>(url: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!!url);
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    if (!url) return;
    try { setData((await api.get<T>(url)).data); setError(""); } catch (e) { setError(toApiError(e).message); } finally { setLoading(false); }
  }, [url]);
  useEffect(() => { load(); }, [load]);
  return { data, loading, error, reload: load, setData };
}

export const PageHeader = ({ title, sub, action }: { title: string; sub?: string; action?: ReactNode }) => (
  <div className="mb-6 flex flex-wrap items-end justify-between gap-3"><div><h1 className="!mb-1 !text-[1.75rem]">{title}</h1>{sub && <p className="text-sm" style={{ color: "var(--text-muted)" }}>{sub}</p>}</div>{action}</div>
);
export const Stat = ({ label, value, tone, sub }: { label: string; value: ReactNode; tone?: "ok" | "warn" | "crit"; sub?: string }) => (
  <div className="card"><p className="text-sm" style={{ color: "var(--text-muted)" }}>{label}</p><p className="num mt-1 text-[2rem] font-medium leading-none" style={{ color: tone ? `var(--${tone}-text)` : "var(--text)" }}>{value}</p>{sub && <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>{sub}</p>}</div>
);
export const Empty = ({ title, text, action }: { title: string; text?: string; action?: ReactNode }) => (
  <div className="card text-center"><h3>{title}</h3>{text && <p className="mx-auto max-w-md text-sm">{text}</p>}{action && <div className="mt-4">{action}</div>}</div>
);
export const Loading = () => <p className="text-sm" style={{ color: "var(--text-muted)" }} role="status">Loading...</p>;
export const ErrorNote = ({ msg }: { msg: string }) => msg ? <p className="field-error" role="alert">{msg}</p> : null;

export function StatusBadge({ connection, sensorFault, open }: { connection?: string; sensorFault?: boolean; open?: number }) {
  if (open) return <span className="badge badge-crit">Alert open</span>;
  if (sensorFault) return <span className="badge badge-warn">Sensor fault</span>;
  if (connection === "offline") return <span className="badge badge-warn">Offline</span>;
  if (connection === "never") return <span className="badge badge-warn">Waiting for data</span>;
  return <span className="badge badge-ok"><span className="live-dot" /> Normal</span>;
}
export const SeverityBadge = ({ s, status }: { s: string; status: string }) => status === "resolved" ? <span className="badge badge-ok">Resolved</span> : s === "critical" ? <span className="badge badge-crit">Critical</span> : <span className="badge badge-warn">Warning</span>;

export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => { const h = (e: KeyboardEvent) => e.key === "Escape" && onClose(); window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h); }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4" style={{ background: "rgba(10,22,34,.6)" }} role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <div className="card w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="mb-3 flex items-center justify-between"><h2 className="!mb-0 !text-[1.25rem]">{title}</h2><button className="btn btn-secondary !h-9 !px-2" onClick={onClose} aria-label="Close"><X size={16} /></button></div>{children}
      </div>
    </div>
  );
}

export const fmtTime = (d?: string | Date | null) => d ? new Date(d).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "-";
export function ago(d?: string | Date | null) {
  if (!d) return "never";
  const s = Math.max(0, Math.round((Date.now() - new Date(d).getTime()) / 1000));
  if (s < 60) return `${s} s ago`; if (s < 3600) return `${Math.round(s / 60)} min ago`; if (s < 86400) return `${Math.round(s / 3600)} h ago`; return `${Math.round(s / 86400)} d ago`;
}
export const fmtVal = (v: unknown, unit = "") => typeof v === "number" ? `${Math.round(v * 10) / 10}${unit}` : "-";

export type Device = {
  id: string; deviceId: string; name: string; typeKey: string; siteId?: string; connection: string; lastSeen?: string; sensorFault?: boolean; fwVersion?: string; openIncidents?: number; intervalSec: number;
  type?: { name: string; channels: { key: string; label: string; unit?: string; type?: string }[] };
  lastReading?: { ts: string; ch: Record<string, number>; rssi?: number; vbat?: number; pwr?: number };
  calibration?: Record<string, number>;
};
export type Incident = {
  id: string; deviceId: string; deviceName: string; kind: string; severity: string; status: string; message: string; openedAt: string; resolvedAt?: string; peak?: number;
  ackedAt?: string; ackedBy?: string; ackReason?: string; escalationLevel: number; isSample?: boolean;
  notifications: { level: number; channel: string; to?: string; status: string; detail?: string; at: string }[];
};
export type Site = { _id: string; name: string; city?: string; address?: string };
