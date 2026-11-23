"use client";
import { useState } from "react";
import { PageHeader, useFetch, Loading, Empty, ErrorNote, Device } from "@/components/portal/ui";
import { useCan } from "@/store/StoreProvider";
import { api, toApiError } from "@/lib/api";

type Rule = { _id: string; deviceId: string; kind: string; channel?: string; op?: string; value?: number; forMinutes: number; severity: string; enabled: boolean };
const label = (r: Rule) => r.kind === "offline" ? "Device offline" : r.kind === "power_lost" ? "Mains power lost" : `${r.channel} ${r.op === ">" ? "above" : "below"}`;

function Row({ r, can, onSaved }: { r: Rule; can: boolean; onSaved: () => void }) {
  const [v, setV] = useState(String(r.value ?? "")); const [m, setM] = useState(String(r.forMinutes)); const [sev, setSev] = useState(r.severity); const [err, setErr] = useState("");
  async function save() { try { await api.patch(`/rules/${r._id}`, { ...(r.kind === "threshold" ? { value: Number(v) } : {}), forMinutes: Number(m), severity: sev }); setErr(""); onSaved(); } catch (e) { setErr(toApiError(e).message); } }
  async function toggle() { await api.patch(`/rules/${r._id}`, { enabled: !r.enabled }).catch(() => {}); onSaved(); }
  return (
    <tr><td>{label(r)}</td>
      <td>{r.kind === "threshold" ? <input aria-label="Limit" className="input !h-9 num w-24" value={v} onChange={(e) => setV(e.target.value)} disabled={!can} inputMode="decimal" /> : "-"}</td>
      <td><input aria-label="Minutes" className="input !h-9 num w-20" value={m} onChange={(e) => setM(e.target.value)} disabled={!can} inputMode="numeric" /></td>
      <td><select aria-label="Severity" className="input !h-9" value={sev} onChange={(e) => setSev(e.target.value)} disabled={!can}><option value="warning">Warning</option><option value="critical">Critical</option></select></td>
      <td>{can && <div className="flex gap-2"><button className="btn btn-primary !h-9 !px-3" onClick={save}>Save</button><button className="btn btn-secondary !h-9 !px-3" onClick={toggle}>{r.enabled ? "Turn off" : "Turn on"}</button></div>}<ErrorNote msg={err} /></td></tr>
  );
}

export default function Page() {
  const rules = useFetch<Rule[]>("/rules"); const dev = useFetch<Device[]>("/devices"); const can = useCan("rules");
  if (rules.loading || dev.loading) return <Loading />;
  return (
    <>
      <PageHeader title="Alert rules" sub="An alert opens when a reading stays outside the limit for the number of minutes shown. Critical alerts ignore quiet hours." />
      {!dev.data?.length ? <Empty title="No devices yet" text="Rules are created with defaults when you claim a device." /> : dev.data.map((d) => (
        <div key={d.id} className="card mb-4 overflow-x-auto"><h3>{d.name}</h3>
          <table className="table-ca w-full"><thead><tr><th>Rule</th><th>Limit</th><th>For (min)</th><th>Severity</th><th /></tr></thead>
            <tbody>{rules.data?.filter((r) => r.deviceId === d.id).map((r) => <Row key={r._id + r.value + r.forMinutes + r.severity + r.enabled} r={r} can={can} onSaved={rules.reload} />)}</tbody></table></div>))}
    </>
  );
}
