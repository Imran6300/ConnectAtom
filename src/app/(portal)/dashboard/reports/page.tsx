"use client";
import { useState } from "react";
import { PageHeader, useFetch, Loading, Empty, Device } from "@/components/portal/ui";

type Daily = { date: string; devices: { deviceId: string; name: string; readings: number; alerts: number; channels: Record<string, { label: string; unit?: string; min: number; max: number; avg: number }> }[] };
const today = () => new Date().toISOString().slice(0, 10);

export default function Page() {
  const [date, setDate] = useState(today()); const rep = useFetch<Daily>(`/reports/daily?date=${date}`); const dev = useFetch<Device[]>("/devices");
  const [devId, setDevId] = useState(""); const [from, setFrom] = useState(today()); const [to, setTo] = useState(today());
  const sel = devId || dev.data?.[0]?.id;
  const csv = sel ? `/api/reports/export.csv?deviceId=${sel}&from=${new Date(from + "T00:00:00").toISOString()}&to=${new Date(to + "T23:59:59").toISOString()}` : "#";
  return (
    <>
      <PageHeader title="Reports" sub="Daily summary and raw data export for audits." action={<button className="btn btn-secondary" onClick={() => window.print()}>Print</button>} />
      <div className="card mb-6"><div className="mb-3 flex flex-wrap items-end justify-between gap-3"><h3 className="!mb-0">Daily summary</h3><div><label className="label" htmlFor="d">Date</label><input id="d" type="date" className="input" value={date} max={today()} onChange={(e) => setDate(e.target.value)} /></div></div>
        {rep.loading ? <Loading /> : !rep.data?.devices.length ? <Empty title="No devices" /> : <div className="overflow-x-auto"><table className="table-ca w-full"><thead><tr><th>Device</th><th>Readings</th><th>Lowest</th><th>Highest</th><th>Average</th><th>Alerts</th></tr></thead>
          <tbody>{rep.data.devices.map((r) => { const c = Object.values(r.channels)[0]; return <tr key={r.deviceId}><td>{r.name}</td><td className="num">{r.readings}</td><td className="num">{c ? `${c.min}${c.unit ?? ""}` : "-"}</td><td className="num">{c ? `${c.max}${c.unit ?? ""}` : "-"}</td><td className="num">{c ? `${c.avg}${c.unit ?? ""}` : "-"}</td><td className="num">{r.alerts}</td></tr>; })}</tbody></table></div>}</div>
      <div className="card print:hidden"><h3>Export readings (CSV)</h3><div className="grid gap-3 sm:grid-cols-4"><div><label className="label" htmlFor="dv">Device</label><select id="dv" className="input" value={sel ?? ""} onChange={(e) => setDevId(e.target.value)}>{dev.data?.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}</select></div><div><label className="label" htmlFor="f">From</label><input id="f" type="date" className="input" value={from} onChange={(e) => setFrom(e.target.value)} /></div><div><label className="label" htmlFor="t">To</label><input id="t" type="date" className="input" value={to} onChange={(e) => setTo(e.target.value)} /></div><div className="flex items-end"><a className="btn btn-primary w-full no-underline" href={csv} download>Download CSV</a></div></div></div>
    </>
  );
}
