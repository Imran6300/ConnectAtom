import type { Product } from "@/lib/catalogue/types";

const DT = "Starting design choice from the product playbook; confirm against the supplier datasheet.";
const PLAT = "Platform capability from the product playbook; which channels you get depends on the plan.";

const compressorMonitor: Product = {
  num: 18,
  slug: "compressor-monitor",
  name: "Compressor Runtime and Pressure Monitor",
  brandName: "ConnectAtom Compressor",
  modelCode: "CA-CP1",
  tier: 3,
  phase: "later",
  availability: "in-development",
  sector: "industrial",
  scene: "factory-floor",
  device: "clamp-meter",
  headline: "runtime, load and pressure-drop alerts",
  tagline: "Planned: see how hard your compressor works, and where the air is going.",
  summary:
    "In development: a monitor for workshop and factory air compressors that tracks runtime, load and pressure, and flags leaks and overruns. Early-access interest is open.",
  overview: [
    "ConnectAtom Compressor is in development. It is not on sale yet, and we are collecting early-access interest from workshops, garages, packaging units and small factories that run an air compressor every day. This page describes what the product will do and what we are still validating on real machines.",
    "A compressor does not announce that it is working too hard. It simply runs more. A small leak in a hose, a coupling or a tool lets air escape, the pressure falls, and the motor starts again to refill the tank. The machine loads and unloads more often and runs for more hours, and the electricity bill and the wear both go up. Most owners see the result as a bill or a breakdown, not as a reading.",
    "The idea is to watch three things: the pressure in the line, the motor current or the run signal, and the temperature of the machine. From these the platform works out how long the compressor ran, how much of that time it was under load, and how fast the pressure falls when nobody is using air. A steady fall with the machine idle points to a leak. We are validating how reliable that leak pattern is on different compressors, tank sizes and shift patterns before we promise it to anyone.",
  ],
  problem:
    "Air leaks and an overworked compressor waste electricity and shorten the life of the machine. The cost is hidden: the compressor just seems to run a lot. Without a record of runtime and pressure, nobody can say whether the shop floor needs a bigger machine, a leak hunt or a service.",
  buyers: [
    "Workshops and garages with a shop compressor",
    "Small factories with a central air line",
    "Packaging units that depend on air tools and machines",
    "Maintenance leads who service several compressors",
  ],
  how: [
    {
      title: "Fit the pressure transducer",
      body: "A pressure transducer goes on a fitting on the air receiver or the main line. It gives a 4-20 mA or a 0-5 V signal, read through an analog-to-digital converter. The fitting and the mounting point matter, and we are validating both.",
    },
    {
      title: "Read the run signal and the temperature",
      body: "A clamp on the motor cable, or a run contact from the starter, shows when the compressor is running and how hard. A temperature sensor on the machine adds a third reading. All of these are read only.",
    },
    {
      title: "Readings reach the platform",
      body: "The node sends pressure, current and temperature to the ConnectAtom platform. If the link drops, readings are held on the device and sent when it returns.",
    },
    {
      title: "You see the pattern and get the alert",
      body: "The dashboard shows runtime, load percentage and the pressure trace. A pressure drop, an overrun or a service due date goes to the first contact on WhatsApp, and moves to the next contact if nobody acknowledges.",
    },
  ],
  hardware: {
    sensors: [
      "Pressure transducer, 4-20 mA or 0-5 V with ADC (starting design choice)",
      "Current clamp or run contact (starting design choice)",
      "Temperature sensor on the machine (starting design choice)",
    ],
    connectivity: ["Connection type to be confirmed for the factory-floor setting"],
    power: "Supply for the node to be confirmed. Battery backup is not part of the playbook design.",
  },
  specs: [
    { group: "Sensing", label: "Pressure input", value: "Pressure transducer, 4-20 mA or 0-5 V with ADC", status: "design-target", note: DT },
    { group: "Sensing", label: "Run and load input", value: "Current clamp or run contact", status: "design-target", note: DT },
    { group: "Sensing", label: "Temperature input", value: "Temperature sensor on the machine", status: "design-target", note: DT },
    { group: "Sensing", label: "Pressure range and accuracy", value: "To be confirmed", status: "to-confirm", note: "Depends on the chosen transducer and the compressor. Not yet tested on a finished unit." },
    { group: "Sensing", label: "Load percentage method", value: "To be confirmed", status: "to-confirm", note: "How current maps to load on different motors is still being validated." },
    { group: "Connectivity", label: "Network", value: "To be confirmed", status: "to-confirm" },
    { group: "Connectivity", label: "Radio approvals", value: "To be confirmed", status: "to-confirm", note: "Check which rules apply before any sale." },
    { group: "Power", label: "Supply and backup", value: "To be confirmed", status: "to-confirm" },
    { group: "Enclosure", label: "Enclosure and ingress rating", value: "To be confirmed", status: "to-confirm", note: "Workshop dust, oil mist and vibration need to be considered." },
    { group: "Alerts", label: "Alert channels", value: "WhatsApp, SMS, voice call, email", status: "design-target", note: PLAT },
    { group: "Data and reports", label: "Reports and export", value: "PDF reports and CSV export", status: "design-target", note: PLAT },
    { group: "Support", label: "Install help", value: "Planned. Terms to be confirmed.", status: "to-confirm" },
  ],
  features: [
    { title: "Runtime and load percentage", body: "See how many hours the compressor ran today, and how much of that time it was loaded rather than idling." },
    { title: "Leak detection from pressure decay", body: "When the machine is idle and the pressure still falls steadily, the platform flags a likely leak. It is a pointer to go and look, not a diagnosis." },
    { title: "Wasted runtime from leaks", body: "An estimate of the runtime spent refilling air that leaked out, so the cost of a leak is a number of hours you can see." },
    { title: "Pressure drop and overrun alerts", body: "Set a low pressure mark and a longest sensible run. A message goes out when either is crossed, and again if nobody acknowledges." },
    { title: "Service reminders", body: "Reminders based on running hours rather than the calendar, so a machine that works double shifts is serviced when it needs it." },
    { title: "Machine temperature trace", body: "A temperature reading beside the runtime, to spot a machine that runs hot when it runs long." },
  ],
  benefits: [
    { title: "Leaks become visible", body: "A pressure trace that falls while the machine is idle tells you to start a leak hunt, before the bill does." },
    { title: "Fewer surprise stoppages", body: "A long overrun or a rising temperature reaches the maintenance lead early." },
    { title: "Service when it is due", body: "Running hours drive the reminder, so service neither slips nor happens too early." },
    { title: "A record for the sizing question", body: "Load history helps an owner judge whether the shop needs a repair, a service or a bigger machine." },
  ],
  applications: [
    { title: "Workshop and garage compressors", body: "A single shop machine with a few hose lines, where one leaking coupling can keep the motor running all day." },
    { title: "Small factory central air line", body: "Pressure watched at the receiver, with an alert for a drop that stops the machines downstream." },
    { title: "Packaging units", body: "Lines that need steady air get a message when the pressure sags during a shift." },
    { title: "Maintenance rounds across several machines", body: "One view of runtime and service due dates across every compressor the lead looks after." },
    { title: "Leak hunt before and after", body: "Compare idle pressure decay before and after repairs to see whether the fix made a difference." },
  ],
  protocols: [
    { name: "MQTT over TLS", role: "Carries readings and events from the node to the ConnectAtom platform." },
    { name: "4-20 mA or 0-5 V analog input", role: "Reads the pressure transducer through an analog-to-digital converter on the node." },
    { name: "HTTPS", role: "Fallback path for devices that cannot use MQTT." },
  ],
  integrations: [
    { name: "WhatsApp", note: "Pressure and overrun alerts to the first contact. Plan dependent." },
    { name: "SMS", note: "Critical alerts by SMS on higher plans." },
    { name: "Voice call", note: "Escalation call to the next contact on higher plans." },
    { name: "Email", note: "Alerts and scheduled reports by email." },
    { name: "CSV export", note: "Download runtime, load and pressure history for your own sheets." },
    { name: "PDF reports", note: "Daily, weekly and monthly reports, depending on the plan." },
    { name: "API and webhooks", note: "On higher plans, for connecting to your own systems." },
  ],
  tags: ["pressure", "energy", "temperature", "downtime", "escalation", "whatsapp", "reports"],
  docs: [
    { title: "Compressor Runtime and Pressure Monitor datasheet", kind: "datasheet", status: "planned" },
    { title: "Pressure transducer fitting and installation guide", kind: "install-guide", status: "planned" },
    { title: "Sample runtime and leak report", kind: "sample-report", status: "planned" },
  ],
  pricing: {
    hardwareFromInr: 8000,
    hardwareToInr: 15000,
    monthlyInr: 500,
    monthlyNote: "Indicative starting assumption per device per month. To be confirmed with early-access customers. Not an offer.",
    showPublic: false,
  },
  alertExample:
    "Sample. Compressor 2: pressure fell while the machine was idle, and it has been running 3 hours without a break. Possible air leak. Check hoses, couplings and the drain valve.",
  reportName: "Daily compressor runtime, load and pressure summary",
  deviceTypeKey: "compressor_v1",
  watchOut: [
    "Pressure sensors need correct fittings and safe installation. Air lines hold stored energy, so fitting work must be done by a trained person with the line depressurised.",
    "Leak detection from the pressure-decay pattern is a pointer, not proof. Normal use and a leak can look alike, so someone still has to go and look.",
  ],
  faqs: [
    {
      q: "Can I order the Compressor Runtime and Pressure Monitor today?",
      a: "No. It is in development. We are collecting early-access interest so we can test it on real compressors. Tell us your machine type and we will contact you when a pilot slot opens.",
    },
    {
      q: "How will it find an air leak?",
      a: "It watches the pressure when the machine is idle. A steady fall points to air escaping somewhere. It tells you that a leak is likely, not where it is. We are still validating how reliable the pattern is.",
    },
    {
      q: "Do I need to open the compressor or its wiring?",
      a: "The current clamp goes around a motor cable and the run contact is read only. The pressure transducer needs a proper fitting on the air line. Have a trained person fit it with the line depressurised.",
    },
    {
      q: "Will it switch the compressor on or off?",
      a: "No. The first version watches and alerts only.",
    },
    {
      q: "What will it cost?",
      a: "The playbook starting assumption is ₹8,000 to ₹15,000 for the hardware and about ₹500 a month. These are indicative and not an offer. We will confirm them with early-access customers.",
    },
  ],
  relatedProductSlugs: ["energy-monitor", "vibration-monitor", "machine-downtime-tracker"],
  images: { gallery: [] },
  missing: [
    "Pressure transducer supplier datasheet, pressure range and accuracy",
    "Fitting types and thread sizes needed for common compressor receivers and lines",
    "Safe installation procedure for the pressure fitting, reviewed by a qualified person",
    "How load percentage is worked out from motor current across different compressor types",
    "Field validation of leak detection from pressure decay on real compressors",
    "Network type, power supply and enclosure ingress rating for the factory-floor node",
    "Radio approvals for the wireless device",
    "Installation photographs from a real compressor",
    "Confirmed hardware and monthly price after supplier quotes",
    "Whether the current clamp needs any rule checks before it is sold as a measuring device",
  ],
  updatedAt: "2026-11-24",
  publishedAt: "2026-11-24",
  status: "live",
} as Product;

export default compressorMonitor;
