"use client";
import { useState } from "react";
import { PageHeader, useFetch, Loading, ErrorNote } from "@/components/portal/ui";
import { useCan, useSession } from "@/store/StoreProvider";
import { api, toApiError } from "@/lib/api";

type Tenant = { name: string; gstin?: string; timezone: string };

export default function Page() {
  const me = useSession(); const t = useFetch<Tenant>("/tenant"); const can = useCan("users"); const [msg, setMsg] = useState(""); const [err, setErr] = useState("");
  async function run(fn: () => Promise<unknown>, ok: string, f?: HTMLFormElement) { setErr(""); setMsg(""); try { await fn(); setMsg(ok); f?.reset(); } catch (ex) { setErr(toApiError(ex).message); } }
  return (
    <>
      <PageHeader title="Settings" />
      <ErrorNote msg={err} />{msg && <p className="mb-4 text-sm" role="status" style={{ color: "var(--ok-text)" }}>{msg}</p>}
      <div className="grid gap-6 lg:grid-cols-2">
        <form className="card grid gap-3" onSubmit={(e) => { e.preventDefault(); const d = new FormData(e.currentTarget); run(() => api.patch("/auth/me", { name: d.get("name"), phone: d.get("phone") || undefined }), "Profile saved."); }}>
          <h3>Your profile</h3><div><label className="label" htmlFor="name">Name</label><input id="name" name="name" defaultValue={me?.user.name} required className="input" /></div>
          <div><label className="label" htmlFor="phone">Phone</label><input id="phone" name="phone" defaultValue={me?.user.phone} className="input" /></div><div><label className="label">Email</label><p className="!my-0">{me?.user.email}</p></div><button className="btn btn-primary">Save</button></form>
        <form className="card grid gap-3" onSubmit={(e) => { e.preventDefault(); const f = e.currentTarget; const d = new FormData(f); run(() => api.post("/auth/change-password", { currentPassword: d.get("currentPassword"), newPassword: d.get("newPassword") }), "Password changed.", f); }}>
          <h3>Change password</h3><div><label className="label" htmlFor="cp">Current password</label><input id="cp" name="currentPassword" type="password" required autoComplete="current-password" className="input" /></div>
          <div><label className="label" htmlFor="np">New password</label><input id="np" name="newPassword" type="password" minLength={8} required autoComplete="new-password" className="input" /></div><button className="btn btn-primary">Change</button></form>
        {t.loading ? <Loading /> : t.data && <form className="card grid gap-3 lg:col-span-2" onSubmit={(e) => { e.preventDefault(); const d = new FormData(e.currentTarget); run(() => api.patch("/tenant", { name: d.get("name"), gstin: d.get("gstin") || undefined }), "Business details saved."); }}>
          <h3>Business</h3><div className="grid gap-3 sm:grid-cols-2"><div><label className="label" htmlFor="bn">Business name</label><input id="bn" name="name" defaultValue={t.data.name} disabled={!can} className="input" /></div><div><label className="label" htmlFor="gst">GSTIN (for invoices)</label><input id="gst" name="gstin" defaultValue={t.data.gstin} disabled={!can} maxLength={15} className="input mono" /></div></div>
          <p className="text-sm">Time zone: {t.data.timezone}</p>{can && <div><button className="btn btn-primary">Save</button></div>}</form>}
      </div>
    </>
  );
}
