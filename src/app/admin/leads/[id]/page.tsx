"use client";
import { use, useState } from "react";
import { PageHeader, useFetch, Loading, ErrorNote, fmtTime } from "@/components/portal/ui";
import { api, toApiError } from "@/lib/api";

type Detail = { lead: Record<string, any>; activities: { _id: string; type: string; note?: string; at: string }[] }; // eslint-disable-line @typescript-eslint/no-explicit-any
const STAGES = ["new", "contacted", "qualified", "quoted", "pilot", "won", "lost", "nurture"];

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); const d = useFetch<Detail>(`/admin/leads/${id}`); const [err, setErr] = useState(""); const [res, setRes] = useState("");
  async function patch(body: Record<string, unknown>) { setErr(""); try { await api.patch(`/admin/leads/${id}`, body); d.reload(); } catch (e) { setErr(toApiError(e).message); } }
  async function convert() { setErr(""); try { const r = await api.post<{ inviteToken: string }>(`/admin/leads/${id}/convert`, {}); setRes(`${location.origin}/register?invite=${r.data.inviteToken}`); d.reload(); } catch (e) { setErr(toApiError(e).message); } }
  if (d.loading) return <Loading />; if (!d.data) return <ErrorNote msg={d.error} />;
  const { lead, activities } = d.data; const c = lead.contact ?? {};
  return (<>
    <PageHeader title={c.name} sub={`${lead.company ?? "No company"} · score ${lead.score} · ${lead.stage}`} />
    <ErrorNote msg={err} />
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card grid gap-1 text-sm"><h3>Details</h3>
        {[["Phone", c.phone], ["Email", c.email], ["Product", lead.productSlug], ["Industry", lead.industrySlug], ["Message", lead.message], ["Landing page", lead.origin?.pagePath], ["Source", lead.origin?.source], ["Received", fmtTime(lead.createdAt)]].map(([k, v]) => <p key={k as string} className="!my-0"><b>{k}:</b> {(v as string) || "-"}</p>)}
        {c.phone && <a className="btn btn-secondary mt-3 no-underline" href={`https://wa.me/${String(c.phone).replace(/\D/g, "")}`} target="_blank" rel="noreferrer">Open WhatsApp</a>}</div>
      <div className="card grid gap-3"><h3>Move it forward</h3>
        <div><label className="label" htmlFor="st">Stage</label><select id="st" className="input" value={lead.stage} onChange={(e) => { const s = e.target.value; const extra: Record<string, unknown> = {}; if (s === "lost") { const r = prompt("Why was this lost?"); if (!r) return; extra.lostReason = r; } if (s === "nurture") { const dt = prompt("Re-contact date (YYYY-MM-DD)"); if (!dt) return; extra.nextFollowUpAt = dt; } patch({ stage: s, ...extra }); }}>{STAGES.map((s) => <option key={s}>{s}</option>)}</select></div>
        <form onSubmit={(e) => { e.preventDefault(); const f = e.currentTarget; patch({ note: new FormData(f).get("note") }).then(() => f.reset()); }} className="grid gap-2"><label className="label" htmlFor="note">Add a note</label><textarea id="note" name="note" required maxLength={1000} rows={3} className="input !h-auto py-2" /><button className="btn btn-primary">Save note</button></form>
        <button className="btn btn-secondary" onClick={convert}>Convert to customer account</button>
        {res && <p className="break-all text-sm">Send this invite link to the customer: <a href={res}>{res}</a></p>}</div>
    </div>
    <div className="card mt-6"><h3>Activity</h3>{!activities.length ? <p className="text-sm">Nothing yet.</p> : <ul className="grid gap-2 text-sm">{activities.map((a) => <li key={a._id}><b>{a.type.replace("_", " ")}</b> · {fmtTime(a.at)}{a.note ? `: ${a.note}` : ""}</li>)}</ul>}</div>
  </>);
}
