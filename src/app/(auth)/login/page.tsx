import type { Metadata } from "next";
import { AuthShell } from "../AuthShell"; import { LoginForm } from "../AuthForms";
export const metadata: Metadata = { title: "Sign in | ConnectAtom", robots: { index: false, follow: false } };
export default function Page() { return <AuthShell title="Sign in" sub="To your ConnectAtom dashboard."><LoginForm /></AuthShell>; }
