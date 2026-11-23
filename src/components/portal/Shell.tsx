"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Activity, Bell, BookUser, Building2, CreditCard, FileText, LayoutDashboard, LogOut, Menu, Settings, SlidersHorizontal, Users, X, Cpu } from "lucide-react";
import { LogoIcon, Logo } from "@/components/brand/Logo";
import { LiveProvider } from "./live";
import { useAppDispatch, useSession } from "@/store/StoreProvider";
import { logout } from "@/store/authSlice";

const NAV = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/devices", label: "Devices", icon: Cpu },
  { href: "/dashboard/alerts", label: "Alerts", icon: Bell },
  { href: "/dashboard/rules", label: "Rules", icon: SlidersHorizontal },
  { href: "/dashboard/contacts", label: "Contacts", icon: BookUser },
  { href: "/dashboard/sites", label: "Sites", icon: Building2 },
  { href: "/dashboard/reports", label: "Reports", icon: FileText },
  { href: "/dashboard/team", label: "Team", icon: Users },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];
const ADMIN_NAV = [
  { href: "/admin", label: "Overview", icon: Activity, exact: true }, { href: "/admin/leads", label: "Leads", icon: BookUser }, { href: "/admin/accounts", label: "Accounts", icon: Building2 },
  { href: "/admin/devices", label: "Fleet", icon: Cpu }, { href: "/admin/pages", label: "Pages and SEO", icon: FileText }, { href: "/admin/audit", label: "Audit log", icon: Settings },
];

export function Shell({ children, admin }: { children: React.ReactNode; admin?: boolean }) {
  const path = usePathname(); const router = useRouter(); const dispatch = useAppDispatch(); const session = useSession();
  const [open, setOpen] = useState(false);
  const items = admin ? ADMIN_NAV : NAV;
  const active = (i: { href: string; exact?: boolean }) => (i.exact ? path === i.href : path.startsWith(i.href));
  async function out() { await dispatch(logout()); router.push("/login"); }
  const nav = (
    <nav aria-label={admin ? "Admin" : "Dashboard"} className="grid gap-1 p-3">
      {items.map((i) => { const I = i.icon; const a = active(i); return (
        <Link key={i.href} href={i.href} onClick={() => setOpen(false)} aria-current={a ? "page" : undefined} className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm no-underline transition"
          style={{ color: a ? "var(--ca-ink)" : "var(--text-body)", background: a ? "var(--ca-teal)" : "transparent", fontWeight: a ? 600 : 500 }}><I size={17} aria-hidden />{i.label}</Link>); })}
    </nav>
  );
  return (
    <LiveProvider enabled={!admin}>
      <div className="min-h-screen lg:grid lg:grid-cols-[240px_1fr]" style={{ background: "var(--bg)" }}>
        <aside data-theme="dark" className="hidden lg:block" style={{ background: "var(--ca-ink)" }}>
          <div className="sticky top-0 flex h-screen flex-col"><div className="p-5"><Link href={admin ? "/admin" : "/dashboard"}><Logo width={140} /></Link>{admin && <p className="mono mt-2 text-xs" style={{ color: "var(--ca-amber)" }}>STAFF CONSOLE</p>}</div>
            <div className="flex-1 overflow-y-auto">{nav}</div>
            <div className="border-t p-4 text-sm" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}><p className="truncate font-medium" style={{ color: "var(--text)" }}>{session?.user.name}</p><p className="truncate text-xs">{admin ? session?.user.staffRole : session?.tenant?.name}</p>
              <button onClick={out} className="mt-3 flex items-center gap-2 text-sm" style={{ color: "var(--text-body)" }}><LogOut size={15} /> Sign out</button></div></div>
        </aside>
        <div>
          <div data-theme="dark" className="flex items-center justify-between px-4 py-3 lg:hidden" style={{ background: "var(--ca-ink)" }}>
            <LogoIcon size={30} /><button onClick={() => setOpen(!open)} className="btn btn-secondary !h-9 !px-2" aria-label="Menu" aria-expanded={open}>{open ? <X size={18} /> : <Menu size={18} />}</button>
          </div>
          {open && <div data-theme="dark" className="lg:hidden" style={{ background: "var(--ca-ink)" }}>{nav}<button onClick={out} className="flex items-center gap-2 px-6 pb-4 text-sm" style={{ color: "var(--text-body)" }}><LogOut size={15} /> Sign out</button></div>}
          <main id="main" className="mx-auto max-w-[1100px] p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </LiveProvider>
  );
}
