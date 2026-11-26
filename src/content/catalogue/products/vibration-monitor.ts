import type { Product } from "@/lib/catalogue/types";

const DT = "Starting design choice from the product playbook; confirm against the supplier datasheet.";
const PLAT = "Platform capability from the product playbook; which channels you get depends on the plan.";

const vibrationMonitor: Product = {
  num: 16,
  slug: "vibration-monitor",
  name: "Motor and Pump Vibration Monitor",
  brandName: "ConnectAtom Vibration",
  modelCode: "CA-VB1",
  tier: 3,
  phase: "later",
  availability: "in-development",
  sector: "industrial",
  scene: "factory-floor",
  device: "vibration-puck",
  headline: "vibration and temperature trends for motors and pumps",
  tagline: "Planned: watch how a motor or pump shakes and heats, and see change early.",
  summary:
    "In development: a magnetic-mount vibration and temperature sensor for motors and pumps, with trends and thresholds. We are looking for one factory for a 60-day trial.",
  overview: [
    "ConnectAtom Vibration is in development. It is not on sale yet, and it is the furthest from launch of the products on this site. We are looking for one friendly factory, mill or pump house for a 60-day trial, where we collect data first. This page describes what the product will do and what we still have to prove.",
    "A small sensor sits on a magnetic mount on the motor or pump housing. It measures vibration and surface temperature. Instead of sending every raw sample, the device works out a few summary numbers itself, such as RMS, peak and the energy in chosen frequency bands, and sends those. The platform keeps a trend for each machine. It learns what is normal for that machine over the first period and shows the change. You set a warning level and a critical level, and the platform tells you when a reading crosses one. A maintenance log sits beside the trend so you can see what was done and when the readings changed.",
    "We will not promise that it predicts failure. Predicting a failure needs real failure data from real machines, and we do not have it yet. The first version offers trends, thresholds and an anomaly score that says how far a machine is from its own normal. That is a signal to go and look, not a forecast. Mounting also matters: a sensor placed a little differently reads differently, so we will give mounting rules and treat each machine's own baseline as the reference.",
  ],
  problem:
    "A motor or pump rarely fails without warning, but the warning is easy to miss. Bearings wear, shafts go out of line, and the machine shakes a little more and runs a little hotter for weeks. Without a reading, nobody notices until the machine stops in the middle of production. The repair then costs far more than the part, because of the lost hours, the rush order and the stock left half made.",
  buyers: [
    "Small manufacturers with critical motors and gearboxes",
    "Pump houses and water utilities",
    "Rice and oil mills",
    "Maintenance heads who rely on a walk-round with a hand on the casing",
  ],
  how: [
    {
      title: "Mount the sensor on the machine",
      body: "A magnetic mount holds the sensor on the motor or pump housing, close to the bearing. Mounting position and firmness change what the sensor reads, so we give a fixed mounting rule for each machine type.",
    },
    {
      title: "The sensor summarises on the device",
      body: "An industrial accelerometer measures vibration and a surface sensor measures temperature. The device works out RMS, peak and band energy itself and sends those numbers, not the raw signal.",
    },
    {
      title: "The platform learns the machine's normal",
      body: "For each machine, the platform builds a baseline from its own early readings. Later readings are compared with that baseline, so a large pump and a small fan are each judged against themselves.",
    },
    {
      title: "You see the trend and the threshold alerts",
      body: "The dashboard shows the vibration and temperature trend. A warning or critical message goes to the first contact on WhatsApp when a level is crossed, and an anomaly score shows how far the machine has moved from normal.",
    },
  ],
  hardware: {
    sensors: [
      "Industrial accelerometer module (starting design choice)",
      "Surface temperature sensor on the same magnetic mount (starting design choice)",
    ],
    connectivity: ["Link to be confirmed for the first version"],
    power: "To be confirmed. A battery node and a node powered from the plant are both open choices.",
  },
  specs: [
    { group: "Sensing", label: "Vibration sensor", value: "Industrial accelerometer module", status: "design-target", note: DT },
    { group: "Sensing", label: "Temperature sensor", value: "Surface temperature sensor", status: "design-target", note: DT },
    { group: "Sensing", label: "Mounting", value: "Magnetic mount", status: "design-target", note: DT },
    { group: "Processing", label: "On-device features", value: "RMS, peak and band energy", status: "design-target", note: DT },
    { group: "Sensing", label: "Frequency range and measurement accuracy", value: "To be confirmed", status: "to-confirm", note: "Depends on the chosen accelerometer. Not yet tested on a finished unit." },
    { group: "Sensing", label: "Surface temperature accuracy", value: "To be confirmed", status: "to-confirm" },
    { group: "Connectivity", label: "Network", value: "To be confirmed", status: "to-confirm", note: "The playbook does not fix the link for this product." },
    { group: "Connectivity", label: "Radio approvals", value: "To be confirmed", status: "to-confirm", note: "Check which rules apply before any sale." },
    { group: "Power", label: "Supply and battery life", value: "To be confirmed", status: "to-confirm" },
    { group: "Enclosure", label: "Enclosure, rating and operating temperature", value: "To be confirmed", status: "to-confirm", note: "A hot motor casing is a hard place for a sensor. Not yet verified." },
    { group: "Analysis", label: "Anomaly score", value: "Per-machine baseline learning", status: "design-target", note: "Starting design choice from the product playbook. It shows distance from normal, not a failure forecast." },
    { group: "Alerts", label: "Alert channels", value: "WhatsApp, SMS, voice call, email", status: "design-target", note: PLAT },
    { group: "Data and reports", label: "Reports and export", value: "PDF reports and CSV export", status: "design-target", note: PLAT },
  ],
  features: [
    { title: "Vibration trend per machine", body: "A line for each motor or pump over days and weeks, so a slow rise stands out from daily ups and downs." },
    { title: "Surface temperature beside it", body: "Heat and shaking on one chart. A rise in both together tells a different story from a rise in one." },
    { title: "Baseline learning", body: "The platform learns what each machine looks like when it runs well, and measures change against that, not against a generic table." },
    { title: "Warning and critical thresholds", body: "You set two levels. A warning asks someone to look soon. A critical asks someone to look now." },
    { title: "Anomaly score", body: "One number for how far a machine has moved from its own normal. It is a prompt to inspect, and it is not a forecast of failure." },
    { title: "Maintenance log", body: "Record a bearing change or an alignment job next to the trend, so you can see whether it changed the readings." },
  ],
  benefits: [
    { title: "Change seen before the stop", body: "A rising trend gives the maintenance team a reason to look during a planned break." },
    { title: "Inspection where it matters", body: "Rounds can go to the machines that have moved, not to every machine every day." },
    { title: "A history to point to", body: "The trend and the log show what happened before a repair, which helps the next decision." },
    { title: "Honest signals", body: "Thresholds and trends say what was measured. We do not ask you to trust a prediction we cannot back." },
  ],
  applications: [
    { title: "Rice and oil mill motors", body: "Watch the main drive motors and gearboxes that stop the whole line if they fail." },
    { title: "Pump houses and water utilities", body: "Watch pump bearings in places where a visit takes time. Pair with tank and level alerts." },
    { title: "Small manufacturing plants", body: "Put sensors on the few motors the line cannot do without." },
    { title: "Fans and blowers", body: "Track an imbalance that grows as dust or wear builds up." },
    { title: "The 60-day trial", body: "The first step is one factory, with sensors on a handful of machines, collecting data and comparing it with what maintenance finds." },
  ],
  protocols: [
    { name: "MQTT over TLS", role: "Carries feature values and events from the node to the ConnectAtom platform." },
    { name: "Wi-Fi or 4G", role: "Link from the node to the platform. The choice for the first version is to be confirmed." },
    { name: "HTTPS", role: "Fallback path for devices that cannot use MQTT." },
  ],
  integrations: [
    { name: "WhatsApp", note: "Warning and critical messages to the first contact. Plan dependent." },
    { name: "SMS", note: "Critical alerts by SMS on higher plans." },
    { name: "Voice call", note: "Escalation call to the next contact on higher plans." },
    { name: "Email", note: "Alerts and scheduled reports by email." },
    { name: "CSV export", note: "Download feature values and history for your own analysis." },
    { name: "API and webhooks", note: "On higher plans, for connecting to your own maintenance system." },
  ],
  tags: ["vibration", "temperature", "pump", "escalation", "whatsapp", "reports", "offline-buffering"],
  docs: [
    { title: "Motor and Pump Vibration Monitor datasheet", kind: "datasheet", status: "planned" },
    { title: "Sensor mounting guide", kind: "install-guide", status: "planned" },
    { title: "Sample vibration trend report", kind: "sample-report", status: "planned" },
  ],
  pricing: {
    hardwareFromInr: 10000,
    hardwareToInr: 25000,
    monthlyInr: 800,
    monthlyNote: "Indicative starting assumption per device per month. To be confirmed with early-access customers. Not an offer.",
    showPublic: false,
  },
  alertExample:
    "Sample. Feed pump 2: vibration RMS above your warning level for 30 min, and 6C above its usual surface temperature. Check the bearing and the mounting.",
  reportName: "Weekly machine vibration and temperature trend",
  deviceTypeKey: "vibration_v1",
  watchOut: [
    "We do not promise failure prediction. That needs real failure data, which we do not yet have. The first version offers trends and thresholds.",
    "Mounting variation affects readings. A sensor moved or fitted loosely will read differently, so each machine needs a fixed mounting position.",
    "The anomaly score only shows distance from a machine's own baseline. A baseline taken when the machine was already worn will hide that wear.",
  ],
  faqs: [
    {
      q: "Can I order the Motor and Pump Vibration Monitor today?",
      a: "No. It is in development. The first step is a 60-day trial in one factory. If you run motors or pumps and are willing to try it, tell us and we will contact you.",
    },
    {
      q: "Will it tell me a motor is about to fail?",
      a: "No. It will show trends, thresholds and an anomaly score. That tells you a machine has changed and is worth a look. Predicting failure needs real failure data, and we will not claim it before we have it.",
    },
    {
      q: "Why only a 60-day trial first?",
      a: "We need real readings from real machines, and what maintenance finds when it opens them. Without that, any threshold would be a guess. One friendly factory lets us collect that data first.",
    },
    {
      q: "Does it matter how I fit the sensor?",
      a: "Yes. A different spot, a loose mount or a painted surface can change the reading. We will give a mounting rule for each machine type and compare each machine only with its own baseline.",
    },
    {
      q: "What does it measure?",
      a: "Vibration, summarised on the device as RMS, peak and energy in frequency bands, and surface temperature. The exact accuracy and range are still to be confirmed.",
    },
  ],
  relatedProductSlugs: ["energy-monitor", "machine-downtime-tracker"],
  images: { gallery: [] },
  missing: [
    "Accelerometer supplier datasheet, measurement range, frequency range and accuracy",
    "Surface temperature sensor accuracy and the operating temperature of the node",
    "Real vibration and temperature data from the 60-day trial factory",
    "Real failure data, needed before any prediction claim can be considered",
    "Mounting rules per machine type and the effect of a mounting change on readings",
    "Choice of network for the first version",
    "Power supply details and battery life if a battery node is offered",
    "Enclosure and ingress rating for a hot, dusty plant",
    "Radio approvals for the wireless device",
    "Which frequency bands to use for band energy",
    "Photographs from a real motor or pump install",
    "Confirmed hardware and monthly price after supplier quotes",
  ],
  updatedAt: "2026-11-24",
  publishedAt: "2026-11-24",
  status: "live",
} as Product;

export default vibrationMonitor;
