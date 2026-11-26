export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
export const dateIN = (iso: string) => new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
