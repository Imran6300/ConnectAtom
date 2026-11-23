"use client";
import { PageHeader, Stat, useFetch, Loading, ErrorNote } from "@/components/portal/ui";

type Row = { _id: string | null; n: number; avgScore?: number };
type Stats = { last30Days: number; byStage: Row[]; byPage: Row[]; byProduct: Row[]; bySource: Row[] };
const Table = ({ title, rows, label }: { title: string; rows: Row[]; label: string }) => (
  <div className="card overflow-x-auto"><h3>{title}</h3>{!rows.length ? <p className="text-sm">No data yet.</p> : <table className="table-ca w-full"><thead><tr><th>{label}</th><th>Leads</th><th>Avg score</th></tr></thead><tbody>{rows.map((r) => <tr key={String(r._id)}><td>{r._id ?? "direct / unknown"}</td><td className="num">{r.n}</td><td className="num">{r.avgScore ?? "-"}</td></tr>)}</tbody></table>}</div>
);
export default function Page() {
  const s = useFetch<Stats>("/admin/stats");
  if (s.loading) return <Loading />; if (!s.data) return <ErrorNote msg={s.error} />;
  const st = (k: string) => s.data!.byStage.find((r) => r._id === k)?.n ?? 0;
  return (<>
    <PageHeader title="Overview" sub="Which pages and products bring buyers, not just clicks." />
    <div className="mb-6 grid gap-4 sm:grid-cols-4"><Stat label="Leads, 30 days" value={s.data.last30Days} /><Stat label="New, not contacted" value={st("new")} tone={st("new") ? "warn" : "ok"} /><Stat label="In pilot" value={st("pilot")} /><Stat label="Won" value={st("won")} tone="ok" /></div>
    <div className="grid gap-4 lg:grid-cols-2"><Table title="By landing page" rows={s.data.byPage} label="Page" /><Table title="By product" rows={s.data.byProduct} label="Product" /><Table title="By source" rows={s.data.bySource} label="Source" /></div>
  </>);
}
