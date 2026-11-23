"use client";
import Link from "next/link";
import { Check, Circle } from "lucide-react";
import { useEffect } from "react";
import { PageHeader, Stat, useFetch, Loading, ErrorNote, Device, Incident, StatusBadge, fmtVal, ago, SeverityBadge } from "@/components/portal/ui";
import { useLive } from "@/components/portal/live";
import { useSession } from "@/store/StoreProvider";

type Overview = { devices: { total: number; online: number; offline: number; never: number }; openIncidents: number; incidents24h: number; readings24h: number;
  valueDelivered: { alertsCaught: number; hoursMonitored: number; readingsStored: number }; onboarding: Record<string, boolean> };

const STEPS: [string, string, string][] = [
  ["siteAdded", "Add your first site", "/dashboard/sites"], ["deviceClaimed", "Claim your device with its code", "/dashboard/devices"],
  ["ruleSet", "Check the alert limits", "/dashboard/rules"], ["contactsAdded", "Add two people who get alerts", "/dashboard/contacts"], ["testAlertSent", "Send a test alert", "/dashboard/contacts"],
];

export default function Page() {
  const session = useSession();
  const ov = useFetch<Overview>("/overview"); const dev = useFetch<Device[]>("/devices"); const inc = useFetch<Incident[]>("/incidents?status=open");
  useLive((e) => { if (e === "incident" || e === "device") { ov.reload(); dev.reload(); inc.reload(); } });
  useEffect(() => { const t = setInterval(() => dev.reload(), 60000); return () => clearInterval(t); }, [dev]);
  if (ov.loading) return <Loading />;
  if (!ov.data) return <ErrorNote msg={ov.error || "Could not load."} />;
  const o = ov.data; const done = STEPS.filter(([k]) => o.onboarding[k]).length;
  return (
    <>
      <PageHeader title={`Hello, ${session?.user.name.split(" ")[0]}`} sub={session?.tenant?.name} />
      {done < STEPS.length && (
        <div className="card mb-6"><h3>Get set up ({done} of {STEPS.length})</h3>
          <ul className="grid gap-2">{STEPS.map(([k, label, href]) => (
            <li key={k} className="flex items-center gap-3 text-sm">{o.onboarding[k] ? <Check size={16} style={{ color: "var(--ok-text)" }} aria-label="Done" /> : <Circle size={16} aria-label="To do" />}
              {o.onboarding[k] ? <span style={{ color: "var(--text-muted)" }}>{label}</span> : <Link href={href}>{label}</Link>}</li>))}</ul></div>)}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Devices online" value={`${o.devices.online}/${o.devices.total}`} tone={o.devices.offline ? "warn" : "ok"} />
        <Stat label="Open alerts" value={o.openIncidents} tone={o.openIncidents ? "crit" : "ok"} />
        <Stat label="Alerts, last 24 h" value={o.incidents24h} />
        <Stat label="Readings, last 24 h" value={o.readings24h.toLocaleString("en-IN")} />
      </div>
      {!!inc.data?.length && (
        <div className="card mb-6"><h3>Open alerts</h3>
          <ul className="divide-y" style={{ borderColor: "var(--border)" }}>{inc.data.slice(0, 5).map((i) => (
            <li key={i.id} className="flex flex-wrap items-center justify-between gap-2 py-3"><div><p className="!my-0 font-medium" style={{ color: "var(--text)" }}>{i.deviceName}</p><p className="!my-0 text-sm">{i.message}</p></div><div className="flex items-center gap-3"><SeverityBadge s={i.severity} status={i.status} /><span className="text-xs" style={{ color: "var(--text-muted)" }}>{ago(i.openedAt)}</span></div></li>))}</ul>
          <Link href="/dashboard/alerts" className="mt-3 inline-block text-sm">All alerts</Link></div>)}
      <h2 className="!text-[1.25rem]">Your devices</h2>
      {dev.data && dev.data.length === 0 && <div className="card text-center"><p>No devices yet. Claim one using the code on its label.</p><Link href="/dashboard/devices" className="btn btn-primary no-underline">Claim a device</Link></div>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{dev.data?.map((d) => (
        <Link key={d.id} href={`/dashboard/devices/${d.id}`} className="card block no-underline transition hover:-translate-y-0.5">
          <div className="flex items-start justify-between gap-2"><h3 className="!mb-0 !text-base">{d.name}</h3><StatusBadge connection={d.connection} sensorFault={d.sensorFault} open={d.openIncidents} /></div>
          <p className="num mt-3 text-[2rem] font-medium leading-none" style={{ color: "var(--text)" }}>{fmtVal(d.lastReading?.ch?.temp, "°C")}</p>
          <p className="mt-2 text-xs" style={{ color: "var(--text-muted)" }}>{d.type?.name} · seen {ago(d.lastSeen)}</p></Link>))}</div>
      <p className="mt-8 text-xs" style={{ color: "var(--text-muted)" }}>{o.valueDelivered.readingsStored.toLocaleString("en-IN")} readings stored · {o.valueDelivered.hoursMonitored.toLocaleString("en-IN")} device-hours monitored</p>
    </>
  );
}
