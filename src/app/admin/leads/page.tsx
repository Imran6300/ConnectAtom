"use client";
import Link from "next/link";
import { useState } from "react";
import { PageHeader, useFetch, Loading, Empty, ago } from "@/components/portal/ui";

type Lead = { _id: string; stage: string; score: number; company?: string; productSlug?: string; overdue: boolean; createdAt: string; contact: { name: string; phone?: string; email?: string }; origin?: { pagePath?: string } };
const STAGES = ["", "new", "contacted", "qualified", "quoted", "pilot", "won", "lost", "nurture"];

export default function Page() {
  const [stage, setStage] = useState(""); const [q, setQ] = useState(""); const [page, setPage] = useState(1);
  const l = useFetch<{ total: number; size: number; items: Lead[] }>(`/admin/leads?page=${page}${stage ? `&stage=${stage}` : ""}${q ? `&q=${encodeURIComponent(q)}` : ""}`);
  return (<>
    <PageHeader title="Leads" sub="Highest score first. Red means new and past the 15 minute reply target." />
    <div className="mb-4 flex flex-wrap gap-3"><select aria-label="Stage" className="input" style={{ width: 176 }} value={stage} onChange={(e) => { setStage(e.target.value); setPage(1); }}>{STAGES.map((s) => <option key={s} value={s}>{s || "All stages"}</option>)}</select><input aria-label="Search" className="input" style={{ maxWidth: 320 }} placeholder="Search name, phone, company" value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} /></div>
    {l.loading ? <Loading /> : !l.data?.items.length ? <Empty title="No leads" /> : <div className="card overflow-x-auto !p-0"><table className="table-ca w-full"><thead><tr><th>Score</th><th>Contact</th><th>Company</th><th>Product</th><th>Stage</th><th>Age</th></tr></thead>
      <tbody>{l.data.items.map((x) => <tr key={x._id}><td className="num">{x.score}</td><td><Link href={`/admin/leads/${x._id}`}>{x.contact.name}</Link><div className="text-xs" style={{ color: "var(--text-muted)" }}>{x.contact.phone ?? x.contact.email}</div></td><td>{x.company ?? "-"}</td><td>{x.productSlug ?? "-"}</td><td>{x.overdue ? <span className="badge badge-crit">New, overdue</span> : <span className="badge badge-ok">{x.stage}</span>}</td><td>{ago(x.createdAt)}</td></tr>)}</tbody></table></div>}
    {l.data && l.data.total > l.data.size && <div className="mt-4 flex items-center gap-3 text-sm"><button className="btn btn-secondary !h-9" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>Page {page}<button className="btn btn-secondary !h-9" disabled={page * l.data.size >= l.data.total} onClick={() => setPage(page + 1)}>Next</button></div>}
  </>);
}
