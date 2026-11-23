"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { api, toApiError } from "@/lib/api";
import { useAppDispatch } from "@/store/StoreProvider";
import { login, register, setSession } from "@/store/authSlice";
import type { Session } from "@/lib/server-auth";

const Err = ({ f, k }: { f: Record<string, string>; k: string }) => (f[k] ? <p className="field-error" role="alert">{f[k]}</p> : null);

function Google() {
  const [on, setOn] = useState(false);
  useEffect(() => { api.get("/auth/providers").then((r) => setOn(!!r.data.google)).catch(() => {}); }, []);
  if (!on) return null;
  return <><a href="/api/auth/google" className="btn btn-secondary mb-4 w-full no-underline">Continue with Google</a><p className="mb-4 text-center text-xs" style={{ color: "var(--text-muted)" }}>or use your email</p></>;
}
const landing = (s: Session, next?: string | null) => (next && next.startsWith("/") && !next.startsWith("//") ? next : s.user.staffRole && !s.tenant ? "/admin" : "/dashboard");

function LoginInner() {
  const router = useRouter(); const sp = useSearchParams(); const dispatch = useAppDispatch();
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false); const [f, setF] = useState<Record<string, string>>({});
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); const d = new FormData(e.currentTarget); setBusy(true); setErr(""); setF({});
    try { const s = await dispatch(login({ email: String(d.get("email")), password: String(d.get("password")) })).unwrap(); router.push(landing(s, sp.get("next"))); router.refresh(); }
    catch (ex) { setErr(typeof ex === "string" ? ex : "Could not sign in."); } finally { setBusy(false); }
  }
  return (
    <>
      {sp.get("error") && <p className="field-error mb-3">Google sign-in did not work. Try again or use your email.</p>}
      <Google />
      <form onSubmit={submit} className="grid gap-4">
        <div><label className="label" htmlFor="email">Email</label><input id="email" name="email" type="email" required autoComplete="email" className="input" /><Err f={f} k="email" /></div>
        <div><label className="label" htmlFor="password">Password</label><input id="password" name="password" type="password" required autoComplete="current-password" className="input" /></div>
        {err && <p className="field-error" role="alert">{err}</p>}
        <button className="btn btn-primary" disabled={busy}>{busy ? "Signing in..." : "Sign in"}</button>
      </form>
      <p className="mt-4 text-sm"><Link href="/forgot-password">Forgot your password?</Link></p>
      <p className="mt-2 text-sm">New to ConnectAtom? <Link href="/register">Create an account</Link></p>
    </>
  );
}
export const LoginForm = () => <Suspense><LoginInner /></Suspense>;

function RegisterInner() {
  const router = useRouter(); const sp = useSearchParams(); const dispatch = useAppDispatch();
  const invite = sp.get("invite"); const [busy, setBusy] = useState(false); const [err, setErr] = useState(""); const [f, setF] = useState<Record<string, string>>({});
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); const d = new FormData(e.currentTarget); setBusy(true); setErr(""); setF({});
    try {
      await dispatch(register({ name: d.get("name"), email: d.get("email"), password: d.get("password"), companyName: d.get("companyName") || undefined, phone: d.get("phone") || undefined, inviteToken: invite || undefined })).unwrap();
      router.push("/dashboard"); router.refresh();
    } catch (ex) { setErr(typeof ex === "string" ? ex : "Could not create the account."); } finally { setBusy(false); }
  }
  return (
    <>
      {!invite && <Google />}
      <form onSubmit={submit} className="grid gap-4">
        <div><label className="label" htmlFor="name">Your name</label><input id="name" name="name" required autoComplete="name" className="input" /><Err f={f} k="name" /></div>
        {!invite && <div><label className="label" htmlFor="companyName">Business name</label><input id="companyName" name="companyName" autoComplete="organization" className="input" /></div>}
        <div><label className="label" htmlFor="email">Email</label><input id="email" name="email" type="email" required defaultValue={sp.get("email") ?? ""} autoComplete="email" className="input" /></div>
        <div><label className="label" htmlFor="password">Password</label><input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" className="input" /><p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>At least 8 characters.</p></div>
        {err && <p className="field-error" role="alert">{err}</p>}
        <button className="btn btn-primary" disabled={busy}>{busy ? "Creating..." : invite ? "Join workspace" : "Create account"}</button>
      </form>
      <p className="mt-4 text-sm">Already have an account? <Link href="/login">Sign in</Link></p>
    </>
  );
}
export const RegisterForm = () => <Suspense><RegisterInner /></Suspense>;

export function ForgotForm() {
  const [done, setDone] = useState(false); const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) { e.preventDefault(); setBusy(true); try { await api.post("/auth/forgot-password", { email: new FormData(e.currentTarget).get("email") }); } finally { setBusy(false); setDone(true); } }
  if (done) return <p>If that email has an account, a reset link is on its way. It works for 1 hour.</p>;
  return <form onSubmit={submit} className="grid gap-4"><div><label className="label" htmlFor="email">Email</label><input id="email" name="email" type="email" required className="input" /></div><button className="btn btn-primary" disabled={busy}>Send reset link</button><Link href="/login" className="text-sm">Back to sign in</Link></form>;
}

function ResetInner() {
  const sp = useSearchParams(); const router = useRouter(); const dispatch = useAppDispatch(); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setErr("");
    try { const r = await api.post<Session>("/auth/reset-password", { token: sp.get("token"), password: new FormData(e.currentTarget).get("password") }); dispatch(setSession(r.data)); router.push("/dashboard"); router.refresh(); }
    catch (ex) { setErr(toApiError(ex).message); } finally { setBusy(false); }
  }
  return <form onSubmit={submit} className="grid gap-4"><div><label className="label" htmlFor="password">New password</label><input id="password" name="password" type="password" minLength={8} required autoComplete="new-password" className="input" /></div>{err && <p className="field-error" role="alert">{err}</p>}<button className="btn btn-primary" disabled={busy}>Set password</button></form>;
}
export const ResetForm = () => <Suspense><ResetInner /></Suspense>;
