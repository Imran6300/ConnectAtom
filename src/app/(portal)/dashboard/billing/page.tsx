"use client";
import { PageHeader, useFetch, Loading, Stat, ErrorNote } from "@/components/portal/ui";
import { inr } from "@/content/products";

type Billing = { plan: string; status: string; devices: number; monthlyEstimate: number; planDetails: { label: string; retentionDays: number }; paymentsEnabled: boolean };

export default function Page() {
  const b = useFetch<Billing>("/billing");
  if (b.loading) return <Loading />; if (!b.data) return <ErrorNote msg={b.error} />;
  const d = b.data;
  return (
    <>
      <PageHeader title="Billing" />
      <div className="mb-6 grid gap-4 sm:grid-cols-3"><Stat label="Plan" value={d.planDetails.label} sub={`${d.planDetails.retentionDays} days of history`} /><Stat label="Devices" value={d.devices} /><Stat label="Estimate per month" value={inr(d.monthlyEstimate)} sub="Excluding GST" /></div>
      <div className="card"><h3>Payments</h3><p>Online payments are not switched on yet. We invoice you directly, with GST. To change plan or add devices, write to <a href="mailto:hello@connectatom.com">hello@connectatom.com</a>.</p></div>
    </>
  );
}
