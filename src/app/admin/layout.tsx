import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getServerSession } from "@/lib/server-auth";
import { StoreProvider } from "@/store/StoreProvider";
import { Shell } from "@/components/portal/Shell";

export const metadata: Metadata = { title: "Admin | ConnectAtom", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  if (!session) redirect("/login?next=/admin");
  if (!session.user.staffRole) redirect("/dashboard");
  return <StoreProvider session={session}><Shell admin>{children}</Shell></StoreProvider>;
}
