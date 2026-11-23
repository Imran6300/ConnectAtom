"use client";
import Link from "next/link";
import { useState } from "react";
import { PageHeader, useFetch, Loading, Empty, Modal, StatusBadge, ErrorNote, Device, Site, fmtVal, ago } from "@/components/portal/ui";
import { useLive } from "@/components/portal/live";
import { useCan } from "@/store/StoreProvider";
import { api, toApiError } from "@/lib/api";

export default function Page() {
  const dev = useFetch<Device[]>("/devices"); const sites = useFetch<Site[]>("/sites"); const can = useCan("devices");
  const [open, setOpen] = useState(false); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  useLive((e) => { if (e === "device" || e === "incident") dev.reload(); });
  async function claim(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); const d = new FormData(e.currentTarget); setBusy(true); setErr("");
    try { await api.post("/devices/claim", { claimCode: d.get("claimCode"), name: d.get("name"), siteId: d.get("siteId") }); setOpen(false); dev.reload(); } catch (ex) { setErr(toApiError(ex).message); } finally { setBusy(false); }
  }
  return (
    <>
      <PageHeader title="Devices" action={can && <button className="btn btn-primary" onClick={() => setOpen(true)}>Claim a device</button>} />
      {dev.loading ? <Loading /> : !dev.data?.length ? <Empty title="No devices yet" text="Enter the claim code printed on the device label. Your device starts sending readings once it has power and Wi-Fi." /> : (
        <div className="card overflow-x-auto !p-0"><table className="table-ca w-full"><thead><tr><th>Name</th><th>Product</th><th>Now</th><th>Status</th><th>Last seen</th></tr></thead>
          <tbody>{dev.data.map((d) => (<tr key={d.id}><td><Link href={`/dashboard/devices/${d.id}`}>{d.name}</Link><div className="mono text-xs" style={{ color: "var(--text-muted)" }}>{d.deviceId}</div></td><td>{d.type?.name}</td><td className="num">{fmtVal(d.lastReading?.ch?.temp, "°C")}</td><td><StatusBadge connection={d.connection} sensorFault={d.sensorFault} open={d.openIncidents} /></td><td>{ago(d.lastSeen)}</td></tr>))}</tbody></table></div>)}
      {open && (
        <Modal title="Claim a device" onClose={() => setOpen(false)}>
          {!sites.data?.length ? <p>Add a site first, then come back to claim the device. <Link href="/dashboard/sites">Go to sites</Link></p> : (
            <form onSubmit={claim} className="grid gap-4">
              <div><label className="label" htmlFor="claimCode">Claim code</label><input id="claimCode" name="claimCode" required className="input mono" placeholder="From the label" /></div>
              <div><label className="label" htmlFor="name">Name</label><input id="name" name="name" required className="input" placeholder="e.g. Cold room 1" /></div>
              <div><label className="label" htmlFor="siteId">Site</label><select id="siteId" name="siteId" required className="input">{sites.data.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}</select></div>
              <ErrorNote msg={err} /><button className="btn btn-primary" disabled={busy}>{busy ? "Claiming..." : "Claim"}</button></form>)}
        </Modal>)}
    </>
  );
}
