import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

export function AuthShell({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <main data-theme="dark" className="circuit-bg grid min-h-screen place-items-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-6 block"><Logo width={160} /></Link>
        <div className="card"><h1 className="!text-[1.6rem]">{title}</h1>{sub && <p className="mb-4 text-sm">{sub}</p>}{children}</div>
      </div>
    </main>
  );
}
