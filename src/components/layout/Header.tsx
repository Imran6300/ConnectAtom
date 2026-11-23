"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { LIVE_PRODUCTS } from "@/content/products";
import { LIVE_INDUSTRIES } from "@/content/industries";

const NAV = [{ href: "/how-it-works", label: "How it works" }, { href: "/pricing", label: "Pricing" }, { href: "/tools", label: "Tools" }];

function Mega({ label, href, items }: { label: string; href: string; items: { href: string; label: string }[] }) {
  return (
    <div className="group relative">
      <Link href={href} className="flex items-center gap-1 px-3 py-2 text-sm no-underline" style={{ color: "var(--text-body)" }}>
        {label} <ChevronDown size={14} aria-hidden />
      </Link>
      <div className="invisible absolute left-0 top-full z-50 w-[300px] pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <ul className="card !p-2" style={{ background: "var(--surface-raised)" }}>
          {items.map((i) => (
            <li key={i.href}><Link href={i.href} className="block rounded-md px-3 py-2 text-sm no-underline hover:bg-white/5" style={{ color: "var(--text)" }}>{i.label}</Link></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const products = LIVE_PRODUCTS.map((p) => ({ href: `/products/${p.slug}`, label: p.name }));
  const industries = LIVE_INDUSTRIES.map((i) => ({ href: `/industries/${i.slug}`, label: i.name }));
  return (
    <header data-theme="dark" className="sticky top-0 z-40 border-b" style={{ background: "var(--ca-ink)", borderColor: "var(--border)" }}>
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" aria-label="ConnectAtom home"><Logo width={150} /></Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          <Mega label="Products" href="/products" items={products} />
          <Mega label="Industries" href="/industries" items={industries} />
          {NAV.map((n) => <Link key={n.href} href={n.href} className="px-3 py-2 text-sm no-underline" style={{ color: "var(--text-body)" }}>{n.label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/login" className="hidden px-3 py-2 text-sm no-underline sm:block" style={{ color: "var(--text-body)" }}>Sign in</Link>
          <Link href="/book-pilot" className="btn btn-primary !h-10 no-underline">Get a free pilot</Link>
          <button className="btn btn-secondary !h-10 !px-3 lg:!hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </div>
      {open && (
        <nav className="container-x pb-4 lg:hidden" aria-label="Mobile">
          <ul className="grid gap-1">
            {[{ href: "/products", label: "Products" }, { href: "/industries", label: "Industries" }, ...NAV, { href: "/login", label: "Sign in" }].map((n) => (
              <li key={n.href}><Link href={n.href} onClick={() => setOpen(false)} className="block rounded-md px-3 py-3 no-underline" style={{ color: "var(--text)" }}>{n.label}</Link></li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
