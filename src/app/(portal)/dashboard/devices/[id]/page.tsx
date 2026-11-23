"use client";
import { use, useCallback, useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader, Stat, useFetch, Loading, ErrorNote, StatusBadge, Device, fmtVal, ago } from "@/components/portal/ui";
import { useLive } from "@/components/portal/live";
import { useCan } from "@/store/StoreProvider";
import { api, toApiError } from "@/lib/api";

type Points = { points: ({ ts: string } & Record<string, number | string>)[]; clampedToPlan: boolean; retentionDays: number };
type Stats = { channels: Record<string, { min: number; max: number; avg: number; percentInRange: number }> };
type Rule = { _id: string; deviceId: string; kind: string; channel?: string; op?: string; value?: number };
const RANGES = [["6 h", 6], ["24 h", 24], ["7 days", 168], ["30 days", 720]] as const;

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const dev = useFetch<Device>(`/devices/${id}`); const stats = useFetch<Stats>(`/devices/${id}/stats`); const rules = useFetch<Rule[]>("/rules");
  const [hours, setHours] = useState(24); const [pts, setPts] = useState<Points | null>(null); const [err, setErr] = useState("");
  const canEdit = useCan("devices"); const [name, setName] = useState(""); const [editing, setEditing] = useState(false);
  const loadPts = useCallback(async () => {
    try { const from = new Date(Date.now() - hours * 3600000).toISOString(); setPts((await api.get<Points>(`/devices/${id}/readings`, { params: { from } })).data); setErr(""); } catch (e) { setErr(toApiError(e).message); }
  }, [id, hours]);
  useEffect(() => { loadPts(); }, [loadPts]);
  useLive((e, p) => {
    if (p.deviceId !== id) return;
    if (e === "reading") dev.setData((d) => d && { ...d, connection: "online", lastSeen: String(p.ts), lastReading: { ts: String(p.ts), ch: p.ch as Record<string, number>, rssi: p.rssi as number, vbat: p.vbat as number, pwr: p.pwr as number } });
    else { dev.reload(); stats.reload(); }
  });
  async function rename() { try { await api.patch(`/devices/${id}`, { name }); setEditing(false); dev.reload(); } catch (e) { setErr(toApiError(e).message); } }
  if (dev.loading) return <Loading />;
  const d = dev.data; if (!d) return <ErrorNote msg={dev.error} />;
  const channels = (d.type?.channels ?? []).filter((c) => c.type !== "boolean");
  const main = channels[0];
  const lines = rules.data?.filter((r) => r.deviceId === id && r.kind === "threshold" && r.channel === main?.key && typeof r.value === "number") ?? [];
  return (
    <>
      <PageHeader title={d.name} sub={`${d.type?.name} · ${d.deviceId} · firmware ${d.fwVersion ?? "-"}`} action={<StatusBadge connection={d.connection} sensorFault={d.sensorFault} open={d.openIncidents} />} />
      {canEdit && (editing ? <div className="mb-4 flex gap-2"><input className="input max-w-xs" value={name} onChange={(e) => setName(e.target.value)} aria-label="Device name" /><button className="btn btn-primary" onClick={rename}>Save</button><button className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button></div> : <button className="mb-4 text-sm" style={{ color: "var(--accent)" }} onClick={() => { setName(d.name); setEditing(true); }}>Rename</button>)}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {channels.map((c) => <Stat key={c.key} label={c.label} value={fmtVal(d.lastReading?.ch?.[c.key], c.unit ? ` ${c.unit}` : "")} sub={`Updated ${ago(d.lastReading?.ts)}`} />)}
        <Stat label="Mains power" value={d.lastReading?.pwr === 0 ? "Lost" : d.lastReading ? "On" : "-"} tone={d.lastReading?.pwr === 0 ? "crit" : undefined} sub={d.lastReading?.vbat ? `Battery ${d.lastReading.vbat} V` : undefined} />
      </div>
      <div className="card mb-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><h3 className="!mb-0">{main?.label ?? "Readings"}</h3>
          <div className="flex gap-1" role="group" aria-label="Time range">{RANGES.map(([l, h]) => <button key={h} onClick={() => setHours(h)} aria-pressed={hours === h} className="btn !h-8 !px-3 !text-xs" style={{ background: hours === h ? "var(--accent)" : "transparent", color: hours === h ? "var(--accent-contrast)" : "var(--text)", border: "1px solid var(--border)" }}>{l}</button>)}</div></div>
        <ErrorNote msg={err} />
        {pts?.clampedToPlan && <p className="mb-2 text-xs" style={{ color: "var(--warn-text)" }}>Your plan keeps {pts.retentionDays} days of history, so older data is not shown.</p>}
        <div style={{ height: 300 }}>{pts && main && pts.points.length ? (
          <ResponsiveContainer><LineChart data={pts.points} margin={{ left: -10, right: 8, top: 8 }}>
            <CartesianGrid stroke="var(--border)" vertical={false} />
            <XAxis dataKey="ts" tickFormatter={(t) => new Date(t).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })} stroke="var(--text-muted)" fontSize={12} minTickGap={40} />
            <YAxis stroke="var(--text-muted)" fontSize={12} domain={["auto", "auto"]} unit={main.unit} width={52} />
            <Tooltip labelFormatter={(t) => new Date(t as string).toLocaleString("en-IN")} contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10 }} />
            {lines.map((r) => <ReferenceLine key={r._id} y={r.value} stroke="var(--crit-text)" strokeDasharray="5 4" label={{ value: `${r.op === ">" ? "max" : "min"} ${r.value}`, fill: "var(--crit-text)", fontSize: 11, position: "insideTopRight" }} />)}
            <Line type="monotone" dataKey={main.key} stroke="var(--chart-1)" strokeWidth={2} dot={false} isAnimationActive={false} />
          </LineChart></ResponsiveContainer>) : <p className="pt-24 text-center text-sm" style={{ color: "var(--text-muted)" }}>{pts ? "No readings in this period yet." : "Loading..."}</p>}</div>
      </div>
      {stats.data && Object.keys(stats.data.channels).length > 0 && (
        <div className="card"><h3>Last 24 hours</h3><div className="overflow-x-auto"><table className="table-ca w-full"><thead><tr><th>Channel</th><th>Lowest</th><th>Highest</th><th>Average</th><th>Within limits</th></tr></thead>
          <tbody>{channels.filter((c) => stats.data!.channels[c.key]).map((c) => { const s = stats.data!.channels[c.key]; return <tr key={c.key}><td>{c.label}</td><td className="num">{s.min}{c.unit}</td><td className="num">{s.max}{c.unit}</td><td className="num">{s.avg}{c.unit}</td><td className="num">{s.percentInRange}%</td></tr>; })}</tbody></table></div></div>)}
    </>
  );
}
