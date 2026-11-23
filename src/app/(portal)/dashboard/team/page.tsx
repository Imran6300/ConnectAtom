"use client";
import { useState } from "react";
import { PageHeader, useFetch, Loading, ErrorNote } from "@/components/portal/ui";
import { useCan, useSession } from "@/store/StoreProvider";
import { api, toApiError } from "@/lib/api";

type Team = { members: { id: string; userId: string; name: string; email: string; role: string }[]; invites: { id: string; email: string; role: string; expiresAt: string }[] };
const ROLES = ["admin", "technician", "operator", "viewer", "auditor"];

export default function Page() {
  const t = useFetch<Team>("/team"); const can = useCan("users"); const me = useSession(); const [err, setErr] = useState(""); const [link, setLink] = useState("");
  async function invite(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); const f = e.currentTarget; const d = new FormData(f); setErr(""); setLink("");
    try { const r = await api.post<{ devLink?: string }>("/team/invite", { email: d.get("email"), role: d.get("role") }); if (r.data.devLink) setLink(r.data.devLink); f.reset(); t.reload(); } catch (ex) { setErr(toApiError(ex).message); }
  }
  const act = async (fn: () => Promise<unknown>) => { try { await fn(); t.reload(); } catch (ex) { setErr(toApiError(ex).message); } };
  return (
    <>
      <PageHeader title="Team" sub={me?.plan ? `${me.plan.label} plan${me.plan.maxUsers ? `: up to ${me.plan.maxUsers} users` : ""}` : undefined} />
      {can && <form onSubmit={invite} className="card mb-6 grid gap-3 sm:grid-cols-[1fr_180px_auto]"><div><label className="label" htmlFor="email">Invite by email</label><input id="email" name="email" type="email" required className="input" /></div><div><label className="label" htmlFor="role">Role</label><select id="role" name="role" className="input" defaultValue="viewer">{ROLES.map((r) => <option key={r}>{r}</option>)}</select></div><div className="flex items-end"><button className="btn btn-primary">Send invite</button></div></form>}
      <ErrorNote msg={err} />{link && <p className="card mb-4 break-all text-sm">Development only, invite link: <a href={link}>{link}</a></p>}
      {t.loading ? <Loading /> : <><div className="card mb-6 overflow-x-auto !p-0"><table className="table-ca w-full"><thead><tr><th>Name</th><th>Role</th><th /></tr></thead><tbody>{t.data?.members.map((m) => <tr key={m.id}><td>{m.name}<div className="text-xs" style={{ color: "var(--text-muted)" }}>{m.email}</div></td>
        <td>{can && m.role !== "owner" ? <select aria-label="Role" className="input !h-9 w-40" value={m.role} onChange={(e) => act(() => api.patch(`/team/${m.id}`, { role: e.target.value }))}>{ROLES.map((r) => <option key={r}>{r}</option>)}</select> : m.role}</td>
        <td>{can && m.role !== "owner" && m.userId !== me?.user.id && <button className="text-sm" style={{ color: "var(--crit-text)" }} onClick={() => act(() => api.delete(`/team/${m.id}`))}>Remove</button>}</td></tr>)}</tbody></table></div>
        {!!t.data?.invites.length && <div className="card"><h3>Pending invites</h3><ul className="text-sm">{t.data.invites.map((i) => <li key={i.id}>{i.email} as {i.role}</li>)}</ul></div>}</>}
    </>
  );
}
