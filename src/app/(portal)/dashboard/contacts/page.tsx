"use client";
import { useState } from "react";
import { PageHeader, useFetch, Loading, Empty, Modal, ErrorNote } from "@/components/portal/ui";
import { useCan } from "@/store/StoreProvider";
import { api, toApiError } from "@/lib/api";

type Contact = { _id: string; name: string; phone?: string; email?: string; role?: string; level: number; delayMin: number; channels: string[] };
type TestResult = { to?: string; channel: string; status: string; detail?: string };

export default function Page() {
  const list = useFetch<Contact[]>("/contacts"); const can = useCan("rules"); const [open, setOpen] = useState(false); const [err, setErr] = useState("");
  const [test, setTest] = useState<TestResult[] | null>(null); const [busy, setBusy] = useState(false);
  async function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); const d = new FormData(e.currentTarget); setErr("");
    try { await api.post("/contacts", { name: d.get("name"), phone: d.get("phone") || undefined, email: d.get("email") || undefined, level: Number(d.get("level")), delayMin: Number(d.get("delayMin")), channels: d.getAll("channels") }); setOpen(false); list.reload(); } catch (ex) { setErr(toApiError(ex).message); }
  }
  async function sendTest() { setBusy(true); try { setTest((await api.post<{ results: TestResult[] }>("/contacts/test-alert")).data.results); } catch (e) { setErr(toApiError(e).message); } finally { setBusy(false); } }
  return (
    <>
      <PageHeader title="Contacts" sub="Level 1 is told first. If nobody acknowledges, level 2 and then level 3 are told after their delay." action={can && <div className="flex gap-2"><button className="btn btn-secondary" onClick={sendTest} disabled={busy}>Send test alert</button><button className="btn btn-primary" onClick={() => { setErr(""); setOpen(true); }}>Add contact</button></div>} />
      {test && <div className="card mb-4"><h3>Test alert result</h3><ul className="text-sm">{test.length ? test.map((r, i) => <li key={i}>{r.channel} to {r.to ?? "-"}: <b>{r.status}</b>{r.detail ? ` (${r.detail})` : ""}</li>) : <li>No contacts to send to.</li>}</ul><p className="text-xs" style={{ color: "var(--text-muted)" }}>Email is live. WhatsApp, SMS and voice show &quot;skipped&quot; until those providers are connected.</p></div>}
      {list.loading ? <Loading /> : !list.data?.length ? <Empty title="No contacts yet" text="Add at least two people so an alert always reaches someone." /> : (
        <div className="card overflow-x-auto !p-0"><table className="table-ca w-full"><thead><tr><th>Name</th><th>Level</th><th>After</th><th>Reach by</th><th /></tr></thead>
          <tbody>{list.data.map((c) => <tr key={c._id}><td>{c.name}<div className="text-xs" style={{ color: "var(--text-muted)" }}>{[c.phone, c.email].filter(Boolean).join(" · ")}</div></td><td>{c.level}</td><td>{c.level === 1 ? "Immediately" : `${c.delayMin} min`}</td><td>{c.channels.join(", ")}</td><td>{can && <button className="text-sm" style={{ color: "var(--crit-text)" }} onClick={async () => { await api.delete(`/contacts/${c._id}`); list.reload(); }}>Remove</button>}</td></tr>)}</tbody></table></div>)}
      {open && <Modal title="Add contact" onClose={() => setOpen(false)}><form onSubmit={add} className="grid gap-3">
        <div><label className="label" htmlFor="name">Name</label><input id="name" name="name" required className="input" /></div>
        <div className="grid grid-cols-2 gap-3"><div><label className="label" htmlFor="phone">Phone</label><input id="phone" name="phone" className="input" placeholder="+91..." /></div><div><label className="label" htmlFor="email">Email</label><input id="email" name="email" type="email" className="input" /></div></div>
        <div className="grid grid-cols-2 gap-3"><div><label className="label" htmlFor="level">Level</label><select id="level" name="level" className="input"><option>1</option><option>2</option><option>3</option></select></div><div><label className="label" htmlFor="delayMin">Delay (min)</label><input id="delayMin" name="delayMin" type="number" min={1} defaultValue={15} className="input" /></div></div>
        <fieldset className="flex flex-wrap gap-4 text-sm"><legend className="label">Reach by</legend>{["whatsapp", "sms", "voice", "email"].map((c) => <label key={c} className="flex items-center gap-2"><input type="checkbox" name="channels" value={c} defaultChecked={c === "whatsapp" || c === "email"} />{c}</label>)}</fieldset>
        <ErrorNote msg={err} /><button className="btn btn-primary">Add</button></form></Modal>}
    </>
  );
}
