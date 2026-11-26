import type { Product } from "@/lib/catalogue/types";

const DT = "Starting design choice from the product playbook; confirm against the supplier datasheet.";
const PLAT = "Platform capability from the product playbook; which channels you get depends on the plan.";

const machineDowntimeTracker: Product = {
  num: 15,
  slug: "machine-downtime-tracker",
  name: "Production Counter and Downtime Tracker",
  brandName: "ConnectAtom Production",
  modelCode: "CA-PC1",
  tier: 2,
  phase: "expand",
  availability: "in-development",
  sector: "industrial",
  scene: "factory-floor",
  device: "counter-sensor",
  headline: "piece counting and downtime reasons",
  tagline: "Planned: know how many pieces a machine made and why it stood still.",
  summary:
    "In development: a sensor that tracks machine running, idle and stopped time and counts pieces, with a shift report. Early-access interest from small factories is open.",
  overview: [
    "ConnectAtom Production is in development. It is not on sale yet, and we are collecting early-access interest from owners of small factories, packaging units and CNC and press shops. This page describes what the product will do and what we are still validating on real machines.",
    "The question it answers is a plain one: how many pieces did this machine make yesterday, and how long did it stand idle? A small sensor on or beside the machine detects when it is running and counts cycles. The platform draws a timeline of running, idle and stopped time. When the machine stops, a tablet near it asks the operator to tap a reason, such as no material, tool change or breakdown. At the end of the shift, a report shows availability and the count. The owner gets a daily summary on WhatsApp.",
    "We are being careful about one thing: every machine is different. A press, a CNC lathe and a packing line do not show their work the same way. So we plan to standardise on two or three sensing methods and agree written definitions with each factory, for example what counts as idle and what counts as one piece. This is validation work, not finished work, and we will do it with the first factories before we write any promise about accuracy.",
  ],
  problem:
    "Most owners of small factories cannot say how many pieces a machine made yesterday or how long it stood idle. They rely on the operator's memory, a paper log filled at the end of the shift, or a feeling. Time lost to waiting for material, setting up or small stops adds up unseen, and without a number there is nothing to improve and nothing to settle an argument about.",
  buyers: [
    "Owners of small factories and workshops",
    "Packaging units with a few lines",
    "CNC and press shop managers",
    "Production supervisors who fill the daily log by hand",
  ],
  how: [
    {
      title: "Sense the machine",
      body: "An optical or inductive proximity sensor watches a moving part, or a current clamp watches the motor. This tells the node when the machine is on and counts each cycle. Which method suits which machine is what we are validating.",
    },
    {
      title: "Optionally read the tower light",
      body: "Where a machine has a tower light, the node can sense the lamp colour. This adds the machine's own idea of running, waiting and fault.",
    },
    {
      title: "Readings reach the platform",
      body: "The node sends counts and states to the ConnectAtom platform. Readings are held on the device if the link drops and sent when it returns.",
    },
    {
      title: "Operator taps a reason, owner reads the report",
      body: "When the machine stops, a tablet beside it asks for a reason. The shift report shows availability and count, and a WhatsApp summary goes to the owner each day.",
    },
  ],
  hardware: {
    sensors: [
      "Optical or inductive proximity sensor for cycle counting (starting design choice)",
      "Current clamp for machine ON and OFF (starting design choice)",
      "Optional tower-light sense",
    ],
    connectivity: ["Wi-Fi or 4G, to be confirmed for the first version"],
    power: "Powering the node is to be confirmed. It must not need work inside the machine's electrical panel.",
  },
  specs: [
    { group: "Sensing", label: "Cycle counting", value: "Optical or inductive proximity sensor", status: "design-target", note: DT },
    { group: "Sensing", label: "Machine ON and OFF", value: "Current clamp", status: "design-target", note: DT },
    { group: "Sensing", label: "Tower-light sense", value: "Optional", status: "design-target", note: DT },
    { group: "Sensing", label: "Counting accuracy", value: "To be confirmed", status: "to-confirm", note: "Depends on the machine and the sensing method. Not yet tested on a finished unit." },
    { group: "Sensing", label: "Fastest cycle it can count", value: "To be confirmed", status: "to-confirm" },
    { group: "Connectivity", label: "Network", value: "To be confirmed", status: "to-confirm", note: "The playbook does not fix the link for this product." },
    { group: "Connectivity", label: "Radio approvals", value: "To be confirmed", status: "to-confirm", note: "Check which rules apply before any sale." },
    { group: "Power", label: "Supply and backup", value: "To be confirmed", status: "to-confirm" },
    { group: "Enclosure", label: "Enclosure and rating", value: "To be confirmed", status: "to-confirm", note: "Dust, oil mist and vibration on the shop floor are the test." },
    { group: "Operator input", label: "Reason entry", value: "Tablet near the machine", status: "design-target", note: "Starting design choice from the product playbook; tablet model to be decided." },
    { group: "Alerts", label: "Daily summary and alert channels", value: "WhatsApp daily summary; SMS, voice call, email", status: "design-target", note: PLAT },
    { group: "Data and reports", label: "Shift report and export", value: "Shift report (availability and count), CSV export", status: "design-target", note: PLAT },
  ],
  features: [
    { title: "Running, idle and stopped timeline", body: "A coloured strip for each machine across the shift, so you can see when it ran and where the gaps were." },
    { title: "Piece and cycle count", body: "A count for the shift and the day, taken from the sensor and not from the operator's tally sheet." },
    { title: "Downtime reasons by tapping a tablet", body: "When a machine stops, the operator taps a reason. It takes a second, and the reason sits on the timeline next to the gap." },
    { title: "Shift report", body: "Availability and count for each machine and each shift, in a page you can print or share." },
    { title: "WhatsApp daily summary", body: "The owner gets yesterday's count and stopped time for each machine, without opening a dashboard." },
    { title: "Written definitions per machine", body: "Idle, stopped and one piece are defined with you for each machine, so the numbers are agreed before they are argued about." },
  ],
  benefits: [
    { title: "A number where there was a guess", body: "Yesterday's count and idle time are on your phone each morning." },
    { title: "Stops with a reason", body: "Reasons add up over a week, and show whether the lost time is material, set-up or breakdown." },
    { title: "Fewer arguments about output", body: "A sensor count and a written definition give the owner and the supervisor one number to start from." },
    { title: "A paper log you can retire", body: "The end-of-shift tally becomes a report that is already filled in." },
  ],
  applications: [
    { title: "CNC and lathe shops", body: "See spindle running time against shift time and find the stops between jobs." },
    { title: "Press shops", body: "Count strokes with a proximity sensor and see how long the press waits for material or a die change." },
    { title: "Packaging lines", body: "Track one line's running and stopped time and the pieces packed per shift." },
    { title: "Small assembly and moulding units", body: "A current clamp gives running and idle time on machines that cannot take a counter." },
    { title: "Owner-run factories", body: "The owner checks a daily WhatsApp summary instead of asking each supervisor." },
  ],
  protocols: [
    { name: "MQTT over TLS", role: "Carries counts, machine states and events from the node to the ConnectAtom platform." },
    { name: "Wi-Fi or 4G", role: "Link from the node to the platform. The choice for the first version is to be confirmed." },
    { name: "HTTPS", role: "Fallback path for devices that cannot use MQTT." },
  ],
  integrations: [
    { name: "WhatsApp", note: "Daily summary to the owner. Plan dependent." },
    { name: "SMS", note: "Alerts by SMS on higher plans." },
    { name: "Email", note: "Shift reports and summaries by email." },
    { name: "CSV export", note: "Download counts and downtime reasons for your own sheets." },
    { name: "PDF reports", note: "Shift, daily and weekly reports, depending on the plan." },
    { name: "API and webhooks", note: "On higher plans, for connecting to your own systems." },
  ],
  tags: ["counting", "downtime", "wifi", "4g", "whatsapp", "reports", "offline-buffering"],
  docs: [
    { title: "Production Counter and Downtime Tracker datasheet", kind: "datasheet", status: "planned" },
    { title: "Machine sensing and mounting guide", kind: "install-guide", status: "planned" },
    { title: "Sample shift report", kind: "sample-report", status: "planned" },
  ],
  pricing: {
    hardwareFromInr: 6000,
    hardwareToInr: 10000,
    monthlyInr: 500,
    monthlyNote: "Indicative starting assumption per device per month. To be confirmed with early-access customers. Not an offer.",
    showPublic: false,
  },
  alertExample:
    "Sample. Press 2 has been stopped for 25 min (reason not yet entered). 412 pieces so far this shift. Please tap a reason on the tablet.",
  reportName: "Shift report: availability and piece count",
  deviceTypeKey: "production_counter_v1",
  watchOut: [
    "Every machine differs. We plan to standardise on two or three sensing methods.",
    "Agree clear written definitions of running, idle, stopped and one piece before go-live, to avoid accuracy disputes.",
    "Reasons depend on operators tapping the tablet. Missing taps leave gaps in the downtime record.",
  ],
  faqs: [
    {
      q: "Can I order the Production Counter and Downtime Tracker today?",
      a: "No. It is in development. We are collecting early-access interest so we can test it on real machines. Tell us your machine types and we will contact you when a pilot slot opens.",
    },
    {
      q: "Will it work on my old machine?",
      a: "Often, but not always. A current clamp can show running and idle on most electric machines. Counting pieces needs a sensor that sees each cycle. We will tell you honestly after looking at your machine.",
    },
    {
      q: "How does it decide what is idle and what is stopped?",
      a: "By definitions we agree with you in writing for each machine. For example, running with no output for a set time may be idle, and no power at all may be stopped. Where the line sits is your decision.",
    },
    {
      q: "Do operators have to enter data?",
      a: "Only the reason for a stop, by tapping a tablet. The count and the running time come from the sensor. If operators skip the tap, the stop is still recorded, only without a reason.",
    },
    {
      q: "Is the piece count exact?",
      a: "We do not claim an accuracy yet. It depends on the machine and the sensing method, and we are validating that. Agreed definitions will tell us what is being counted.",
    },
  ],
  relatedProductSlugs: ["energy-monitor", "vibration-monitor"],
  images: { gallery: [] },
  missing: [
    "Counting accuracy for proximity and current-clamp methods on real machines",
    "Supplier datasheets for the chosen proximity sensors and current clamps",
    "Maximum cycle rate the sensor and node can count",
    "Choice of network for the first version, Wi-Fi or 4G",
    "Power supply details for the node",
    "Enclosure and ingress rating for oil mist, dust and vibration",
    "Radio approvals for the wireless device",
    "Tablet model and how it is mounted and powered on the floor",
    "The two or three sensing methods to standardise on, after trials",
    "Template wording for the written definitions of running, idle, stopped and one piece",
    "Photographs from a real factory install",
    "Confirmed hardware and monthly price after supplier quotes",
  ],
  updatedAt: "2026-11-24",
  publishedAt: "2026-11-24",
  status: "live",
} as Product;

export default machineDowntimeTracker;
