import { StoreProvider } from "@/store/StoreProvider";
export default function AuthLayout({ children }: { children: React.ReactNode }) { return <StoreProvider session={null}>{children}</StoreProvider>; }
