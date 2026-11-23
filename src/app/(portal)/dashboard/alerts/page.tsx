"use client";
import { useState } from "react";
import { PageHeader, useFetch, Loading, Empty, Modal, SeverityBadge, ErrorNote, Incident, fmtTime } from "@/components/portal/ui";
import { useLive } from "@/components/portal/live";
import { useCan } from "@/store/StoreProvider";
import { api, toApiError } from "@/lib/api";

export default function Page() {
  const [tab, setTab] = useState<"open" | "resolved">("open"); const list = useFetch<Incident[]>(`/incidents?status=${tab}`); const canAck = useCan("ack");
  const [ack, setAck] = useState<Incident | null>(null); const [err, setErr] = useState("");
  useLive((e) => { if (e === "incident") list.reload(); });
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); try { await api.post(`/incidents/${ack!.id}/ack`, { reason: new FormData(e.currentTarget).get("reason") || undefined }); setAck(null); list.reload(); } catch (ex) { setErr(toApiError(ex).message); }
  }
  return (
    <>
      <PageHeader title="Alerts" sub="Acknowledging stops further escalation. The alert closes by itself when the reading is back in range." />
      <div className="mb-4 flex gap-2" role="tablist">{(["open", "resolved"] as const).map((t) => <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className="btn !h-9" style={{ background: tab === t ? "var(--accent)" : "transparent", color: tab === t ? "var(--accent-contrast)" : "var(--text)", border: "1px solid var(--border)" }}>{t === "open" ? "Open" : "Resolved"}</button>)}</div>
      {list.loading ? <Loading /> : !list.data?.length ? <Empty title={tab === "open" ? "No open alerts" : "Nothing resolved yet"} text={tab === "open" ? "Everything is within limits." : undefined} /> : (
        <div className="grid gap-3">{list.data.map((i) => (
          <div key={i.id} className="card">
            <div className="flex flex-wrap items-start justify-between gap-2"><div><div className="flex items-center gap-2"><h3 className="!mb-0 !text-base">{i.deviceName}</h3><SeverityBadge s={i.severity} status={i.status} />{i.isSample && <span className="badge badge-warn">Sample</span>}</div><p className="!mb-0 mt-1 text-sm">{i.message}</p></div>
              {i.status === "open" && !i.ackedAt && canAck && <button className="btn btn-secondary" onClick={() => { setErr(""); setAck(i); }}>Acknowledge</button>}</div>
            <p className="mt-2 text-xs" style={{ color: "var(--text-muted)" }}>Opened {fmtTime(i.openedAt)}{i.resolvedAt && ` · resolved ${fmtTime(i.resolvedAt)}`}{i.ackedAt && ` · acknowledged by ${i.ackedBy ?? "someone"}${i.ackReason ? `: ${i.ackReason}` : ""}`}{i.status === "open" && ` · escalation level ${i.escalationLevel}`}</p>
            {!!i.notifications?.length && <details className="mt-2 text-xs"><summary className="cursor-pointer">Who was told ({i.notifications.length})</summary><ul className="mt-1 grid gap-1">{i.notifications.map((n, k) => <li key={k}>L{n.level} · {n.channel} · {n.to ?? "-"} · {n.status}{n.detail ? ` (${n.detail})` : ""}</li>)}</ul></details>}
          </div>))}</div>)}
      {ack && <Modal title={`Acknowledge: ${ack.deviceName}`} onClose={() => setAck(null)}><form onSubmit={submit} className="grid gap-4"><div><label className="label" htmlFor="reason">Note (optional)</label><input id="reason" name="reason" maxLength={200} className="input" placeholder="e.g. Door was left open, closed now" /></div><ErrorNote msg={err} /><button className="btn btn-primary">Acknowledge</button></form></Modal>}
    </>
  );
}
