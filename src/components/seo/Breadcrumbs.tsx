import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbList } from "@/lib/seo/jsonld";

export function Breadcrumbs({ trail, dark }: { trail: { name: string; path: string }[]; dark?: boolean }) {
  const full = [{ name: "Home", path: "/" }, ...trail];
  return (
    <nav aria-label="Breadcrumb" className="mb-5 text-sm">
      <JsonLd data={breadcrumbList(full)} />
      <ol className="flex flex-wrap items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
        {full.map((t, i) => (
          <li key={t.path} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden>›</span>}
            {i === full.length - 1 ? <span aria-current="page" className={dark ? "text-[color:var(--text)]" : ""}>{t.name}</span> : <Link href={t.path} className="no-underline hover:underline" style={{ color: "var(--text-muted)" }}>{t.name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
