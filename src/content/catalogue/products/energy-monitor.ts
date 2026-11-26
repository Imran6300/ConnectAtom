import type { Product } from "@/lib/catalogue/types";

const DT = "Starting design choice from the product playbook; confirm against the supplier datasheet.";
const PLAT = "Platform capability from the product playbook; which channels you get depends on the plan.";

const energyMonitor: Product = {
  num: 17,
  slug: "energy-monitor",
  name: "Power and Energy Monitor",
  brandName: "ConnectAtom Energy",
  modelCode: "CA-EN1",
  tier: 3,
  phase: "later",
  availability: "in-development",
  sector: "industrial",
  scene: "factory-floor",
  device: "clamp-meter",
  headline: "kW, kWh and power factor per phase",
  tagline: "Planned: see where your electricity goes, one phase at a time.",
  summary:
    "In development: split-core clamps showing kW, kWh, power factor and demand peaks per phase, with a monthly cost estimate. Early-access interest is open.",
  overview: [
    "ConnectAtom Energy is in development. It is not on sale yet, and we are collecting early-access interest from factories, commercial buildings, cold storages and hostels that want to see where their electricity goes. This page describes what the product will do and what we are still validating.",
    "Split-core clamps close around the incoming cable or a machine feeder, without cutting or touching the wire. A metering front-end with a voltage reference turns the clamp signal into power values. A node in a DIN-rail enclosure sends them over Wi-Fi or 4G. On the dashboard you see kW, kWh and power factor for each phase, the peaks in demand, the use during off-hours, and the short spikes when a large motor starts. You enter your tariff, and the platform shows an estimate of the month's bill so far.",
    "Two limits matter. First, this is mains electricity. We will use non-invasive clamps only, and a licensed electrician must fit the clamps and the voltage connection. The product is not for a person to install on their own. Second, we will not call it a certified measuring instrument. Whether any rule applies to selling a device that measures energy is something we have to check before we sell, and it is on our open list. Until then, treat the readings as a monitoring aid, and as a way to see patterns, and not as a replacement for your supply meter.",
  ],
  problem:
    "Electricity is a large cost for a factory, a cold storage or a hostel, and the bill arrives as one number a month. Nobody can see which machine, which hour or which phase caused it. A motor that starts all at once, a compressor that runs through the night or a poor power factor can raise the bill, and none of it shows until the month is over.",
  buyers: [
    "Factory owners and plant managers",
    "Commercial building and mall managers",
    "Cold storage operators with large compressors",
    "Hostel and hospital facility managers",
  ],
  how: [
    {
      title: "A licensed electrician fits the clamps",
      body: "Split-core current clamps close around the cables without cutting them. A voltage reference is connected at the panel. This work is done by a licensed electrician, not by the buyer.",
    },
    {
      title: "The front-end measures power",
      body: "A metering front-end reads current and voltage and works out kW, kWh and power factor for each phase. The values are held on the device if the link drops.",
    },
    {
      title: "The node sends readings to the platform",
      body: "The node sits in a DIN-rail enclosure in the panel and sends readings over Wi-Fi, or over 4G where the panel has no Wi-Fi.",
    },
    {
      title: "You see the load, the peaks and the cost",
      body: "The dashboard shows load through the day, demand peaks, off-hours use and motor-start spikes. With your tariff entered, you see a monthly cost estimate.",
    },
  ],
  hardware: {
    sensors: [
      "Split-core CT clamps, non-invasive (starting design choice)",
      "Metering front-end with a voltage reference (starting design choice)",
    ],
    connectivity: ["Wi-Fi", "4G variant where the panel has no Wi-Fi"],
    power: "Powered from the panel it monitors, in a DIN-rail enclosure. Supply details and backup are to be confirmed.",
  },
  specs: [
    { group: "Sensing", label: "Current sensing", value: "Split-core CT clamps, non-invasive", status: "design-target", note: DT },
    { group: "Sensing", label: "Metering", value: "Metering front-end with voltage reference", status: "design-target", note: DT },
    { group: "Sensing", label: "Measured values", value: "kW, kWh and power factor per phase", status: "design-target", note: "Starting design choice from the product playbook; confirm against the supplier datasheet." },
    { group: "Sensing", label: "Measurement accuracy", value: "To be confirmed", status: "to-confirm", note: "Depends on the clamps and the front-end. Not yet tested on a finished unit." },
    { group: "Sensing", label: "Clamp sizes and current range", value: "To be confirmed", status: "to-confirm" },
    { group: "Connectivity", label: "Network", value: "Wi-Fi or 4G node", status: "design-target", note: DT },
    { group: "Connectivity", label: "Radio approvals", value: "To be confirmed", status: "to-confirm", note: "Check which rules apply before any sale." },
    { group: "Enclosure", label: "Mounting", value: "DIN-rail enclosure", status: "design-target", note: DT },
    { group: "Enclosure", label: "Enclosure rating of the finished unit", value: "To be confirmed", status: "to-confirm" },
    { group: "Power", label: "Supply and backup", value: "To be confirmed", status: "to-confirm" },
    { group: "Installation", label: "Installation", value: "Licensed electrician required", status: "design-target", note: "Starting design choice from the product playbook: non-invasive clamps only." },
    { group: "Analysis", label: "Cost estimate", value: "Monthly estimate from the tariff you enter", status: "design-target", note: "Starting design choice from the product playbook. It is an estimate, not a bill." },
    { group: "Data and reports", label: "Alerts, reports and export", value: "WhatsApp, SMS, voice call, email; PDF reports, CSV export", status: "design-target", note: PLAT },
  ],
  features: [
    { title: "kW, kWh and power factor per phase", body: "See each phase on its own, so an unbalanced load or a weak power factor on one phase is not hidden in a total." },
    { title: "Demand peaks", body: "The highest load of the day or the month, and the time it happened, so you can see what ran together." },
    { title: "Off-hours consumption", body: "What the site draws when it should be quiet, such as nights and holidays. Standing load shows up here." },
    { title: "Motor-start spike detection", body: "A large motor draws a short burst as it starts. The platform marks these, so you can see how often and when they stack." },
    { title: "Monthly cost estimate with tariff entry", body: "Enter your tariff and see an estimate of the bill so far. It is a guide, and your meter bill is the one you pay." },
    { title: "Pairs with cold room monitoring", body: "For a cold storage, read compressor energy beside room temperature from ConnectAtom Cold Room, and see what the cooling costs." },
  ],
  benefits: [
    { title: "See where the units go", body: "Load by phase and by hour shows when and where the electricity is used." },
    { title: "Find standing load", body: "Off-hours use points to equipment left running that nobody meant to leave on." },
    { title: "Spot costly peaks", body: "Seeing which machines start together helps you stagger them." },
    { title: "No wire cut", body: "Clamps go around the cable. The supply is not interrupted to fit them." },
  ],
  applications: [
    { title: "Cold storage compressors", body: "Read compressor energy with room temperature from ConnectAtom Cold Room, to see what holding the temperature costs." },
    { title: "Factory main incomers", body: "See the total load by phase and the demand peaks for the whole plant." },
    { title: "Single large machines", body: "Clamp one feeder to see what a furnace, press or pump draws and when it starts." },
    { title: "Commercial buildings and malls", body: "See night and holiday load and the share taken by air conditioning plant." },
    { title: "Hostels and large residences", body: "Track daily use through the term and find what stays on overnight." },
  ],
  protocols: [
    { name: "MQTT over TLS", role: "Carries power readings and events from the node to the ConnectAtom platform." },
    { name: "Wi-Fi", role: "Default link from the node to the site network." },
    { name: "4G (Cat-1)", role: "Optional link where the panel room has no Wi-Fi." },
    { name: "HTTPS", role: "Fallback path for devices that cannot use MQTT." },
  ],
  integrations: [
    { name: "WhatsApp", note: "Alerts on demand peaks and off-hours use. Plan dependent." },
    { name: "SMS", note: "Alerts by SMS on higher plans." },
    { name: "Voice call", note: "Escalation call to the next contact on higher plans." },
    { name: "Email", note: "Alerts and scheduled reports by email." },
    { name: "CSV export", note: "Download power and energy history for your own sheets." },
    { name: "PDF reports", note: "Daily, weekly and monthly reports, depending on the plan." },
    { name: "API and webhooks", note: "On higher plans, for connecting to your own systems." },
  ],
  tags: ["energy", "mains-sensing", "wifi", "4g", "whatsapp", "reports", "cold-chain", "offline-buffering"],
  docs: [
    { title: "Power and Energy Monitor datasheet", kind: "datasheet", status: "planned" },
    { title: "Clamp and panel installation guide, for licensed electricians", kind: "install-guide", status: "planned" },
    { title: "Sample monthly energy report", kind: "sample-report", status: "planned" },
  ],
  pricing: {
    hardwareFromInr: 8000,
    hardwareToInr: 20000,
    monthlyInr: 500,
    monthlyNote: "Indicative starting assumption per device per month. To be confirmed with early-access customers. Not an offer.",
    showPublic: false,
  },
  alertExample:
    "Sample. Plant main incomer: 38 kW drawn between 1:00 and 4:00 am, when the plant is shut. Standing load is above your usual night level. Check what is left running.",
  reportName: "Monthly energy, demand and cost estimate",
  deviceTypeKey: "energy_v1",
  watchOut: [
    "This is mains wiring. Use non-invasive clamps only, and have a licensed electrician install the clamps and the voltage connection.",
    "Check requirements before selling it as a measuring instrument. Until then, call it a monitoring aid, not a replacement for the supply meter.",
    "The monthly cost is an estimate from the tariff you enter. It will not match your bill to the rupee.",
  ],
  faqs: [
    {
      q: "Can I order the Power and Energy Monitor today?",
      a: "No. It is in development. We are collecting early-access interest from factories, buildings and cold storages. Tell us your supply type and what you want to see and we will contact you when a pilot slot opens.",
    },
    {
      q: "Do I need to cut a wire to fit it?",
      a: "No. Split-core clamps open and close around the cable. A licensed electrician still has to fit them and make the voltage connection safely, so this is not a do-it-yourself job.",
    },
    {
      q: "Will it replace my electricity meter?",
      a: "No. It helps you see patterns in your use. Your supply meter is the one that counts for billing. We are checking what rules apply to a device that measures energy before we sell it.",
    },
    {
      q: "Is the monthly cost exact?",
      a: "No. It is an estimate from the readings and the tariff you enter. Tariffs have parts that vary, so the estimate will differ from the bill.",
    },
    {
      q: "Can I use it with my cold storage?",
      a: "That is one of the first uses we have in mind. Put clamps on the compressor feeder and read its energy beside the room temperature from ConnectAtom Cold Room. It shows what holding the temperature costs.",
    },
  ],
  relatedProductSlugs: ["cold-room-monitor", "generator-monitor", "vibration-monitor"],
  images: { gallery: [] },
  missing: [
    "Measuring-instrument rules to check before selling",
    "Measurement accuracy of the finished unit for current, power and energy",
    "Supplier datasheets for the CT clamps and the metering front-end",
    "Clamp sizes and the current range the product will support",
    "Voltage-connection method and safe wiring guidance, checked by a licensed electrician",
    "Supply and backup details for the node in the panel",
    "Enclosure rating of the finished unit",
    "Radio approvals for the wireless device",
    "Tariff structures to support, and how to handle demand and time-of-day parts",
    "Installation photographs from a real panel",
    "Confirmed hardware and monthly price after supplier quotes",
  ],
  updatedAt: "2026-11-24",
  publishedAt: "2026-11-24",
  status: "live",
} as Product;

export default energyMonitor;
