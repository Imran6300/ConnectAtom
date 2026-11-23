import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getServerSession } from "@/lib/server-auth";
import { StoreProvider } from "@/store/StoreProvider";
import { Shell } from "@/components/portal/Shell";

export const metadata: Metadata = { title: "Dashboard | ConnectAtom", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

// The portal is behind login. The tenant comes from the verified session on the server, never from the URL.
export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  if (!session) redirect("/login?next=/dashboard");
  if (!session.tenant) redirect(session.user.staffRole ? "/admin" : "/login");
  return <StoreProvider session={session}><Shell>{children}</Shell></StoreProvider>;
}
