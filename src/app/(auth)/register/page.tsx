import type { Metadata } from "next";
import { AuthShell } from "../AuthShell"; import { RegisterForm } from "../AuthForms";
export const metadata: Metadata = { title: "Create account | ConnectAtom", robots: { index: false, follow: false } };
export default function Page() { return <AuthShell title="Create your account" sub="You can claim your devices in the next step."><RegisterForm /></AuthShell>; }
