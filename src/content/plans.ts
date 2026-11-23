// From the playbook (section 4.2). Introductory prices, per device per month, plus GST.
export type Plan = { key: "starter" | "pro" | "business"; name: string; monthly: number; annual: number; rows: Record<string, string>; highlight?: boolean };
export const PLANS: Plan[] = [
  { key: "starter", name: "Starter", monthly: 299, annual: 2990, rows: { Alerts: "WhatsApp, email", "Data kept": "90 days", Reports: "Daily summary", Users: "3", "API and webhooks": "No", Support: "Chat, next business day" } },
  { key: "pro", name: "Pro", monthly: 499, annual: 4990, highlight: true, rows: { Alerts: "WhatsApp, SMS, voice call, escalation", "Data kept": "1 year", Reports: "Daily, weekly, monthly PDF", Users: "10", "API and webhooks": "Read-only API", Support: "Chat and phone, same day" } },
  { key: "business", name: "Business", monthly: 799, annual: 7990, rows: { Alerts: "Everything in Pro, plus on-call schedule", "Data kept": "3 years", Reports: "Audit-ready reports with calibration records", Users: "Unlimited", "API and webhooks": "Yes", Support: "Priority, onboarding visit, response target" } },
];
export const GENERAL_FAQS = [
  { q: "What is the 30-day pilot?", a: "We install a kit at your site. If it does not work for you in 30 days, you get your money back. That is the whole offer." },
  { q: "Do I pay for the device and the plan?", a: "Yes. You pay once for the device, then a monthly plan per device for the dashboard, alerts, reports and support." },
  { q: "Who installs it?", a: "We help you install it, in person in Hyderabad and by video elsewhere. Installation help is part of every system." },
  { q: "Where do alerts go?", a: "To the people you choose, in the order you choose, on WhatsApp and email on every plan. SMS and voice calls are on Pro and Business." },
  { q: "What if the internet or power goes down?", a: "The device keeps a battery backup and stores readings until the link returns. A 4G variant is available where Wi-Fi is weak." },
  { q: "Is it certified?", a: "We describe ConnectAtom as a monitoring aid. We make no certification or compliance claims we have not verified for your exact need." },
];
