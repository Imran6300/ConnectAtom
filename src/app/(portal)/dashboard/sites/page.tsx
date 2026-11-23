"use client";
import { useState } from "react";
import { PageHeader, useFetch, Loading, Empty, ErrorNote, Site } from "@/components/portal/ui";
import { useCan } from "@/store/StoreProvider";
import { api, toApiError } from "@/lib/api";

export default function Page() {
  const list = useFetch<Site[]>("/sites"); const can = useCan("devices"); const [err, setErr] = useState("");
  async function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); const f = e.currentTarget; const d = new FormData(f); setErr("");
    try { await api.post("/sites", { name: d.get("name"), city: d.get("city") || undefined, address: d.get("address") || undefined }); f.reset(); list.reload(); } catch (ex) { setErr(toApiError(ex).message); }
  }
  async function del(id: string) { try { await api.delete(`/sites/${id}`); list.reload(); } catch (ex) { setErr(toApiError(ex).message); } }
  return (
    <>
      <PageHeader title="Sites" sub="A site is a place where devices are installed: a shop, a godown, a clinic." />
      {can && <form onSubmit={add} className="card mb-6 grid gap-3 sm:grid-cols-4"><div><label className="label" htmlFor="name">Name</label><input id="name" name="name" required className="input" /></div><div><label className="label" htmlFor="city">City</label><input id="city" name="city" className="input" /></div><div className="sm:col-span-2"><label className="label" htmlFor="address">Address</label><input id="address" name="address" className="input" /></div><div className="sm:col-span-4"><button className="btn btn-primary">Add site</button></div></form>}
      <ErrorNote msg={err} />
      {list.loading ? <Loading /> : !list.data?.length ? <Empty title="No sites yet" text="Add your first site above." /> : <div className="card !p-0"><table className="table-ca w-full"><thead><tr><th>Name</th><th>City</th><th>Address</th><th /></tr></thead><tbody>{list.data.map((s) => <tr key={s._id}><td>{s.name}</td><td>{s.city ?? "-"}</td><td>{s.address ?? "-"}</td><td>{can && <button className="text-sm" style={{ color: "var(--crit-text)" }} onClick={() => del(s._id)}>Remove</button>}</td></tr>)}</tbody></table></div>}
    </>
  );
}
