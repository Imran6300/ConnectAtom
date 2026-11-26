import type { Product } from "@/lib/catalogue/types";

const DT = "Starting design choice from the product playbook; confirm against the supplier datasheet.";
const PLAT = "Platform capability from the product playbook; which channels you get depends on the plan.";

const waterTankLevelMonitor: Product = {
  num: 11,
  slug: "water-tank-level-monitor",
  name: "Water Tank Level and Pump Alert",
  brandName: "ConnectAtom Tank",
  modelCode: "CA-WT1",
  tier: 2,
  phase: "expand",
  availability: "in-development",
  sector: "facilities",
  scene: "water-tank",
  device: "tank-level",
  headline: "level alerts and pump run tracking",
  tagline: "Planned: know the tank level before it overflows or runs dry.",
  summary:
    "In development: a tank level sensor with low and high alerts and pump run tracking, built for apartments, schools and factories. Early-access interest is open.",
  overview: [
    "ConnectAtom Tank is in development. It is not on sale yet, and we are collecting early-access interest from apartment committees, facility managers and factory owners who want to try it. This page describes what the product will do and what we are still validating with real tanks and real pumps.",
    "The idea is simple. A level sensor on the tank sends the water level to the ConnectAtom platform. You see the level as a percentage on your phone, with a chart for the day. When the tank drops below the low mark or climbs to the high mark, the right person gets a message on WhatsApp. If a pump contactor feeds a signal back, the platform also knows when the pump is running, how long it ran, and whether the level moved while it did.",
    "We are starting with monitoring only. We will not switch pumps on or off in the first version. Controlling a pump through a relay means working on the electrical supply, and that carries a safety risk we want to understand properly before we offer it. What we are validating now is where sensors sit best in different tank shapes, how steady the readings are with a moving water surface, and how useful the daily consumption estimate is to a building manager.",
  ],
  problem:
    "A tank that overflows wastes water and a tank that runs dry leaves a whole building without it. Most committees find out from a resident's complaint or a wet terrace, not from a reading. When the pump keeps running against an empty sump, it can also burn out, and nobody notices until the motor stops.",
  buyers: [
    "Apartment associations and township committees",
    "Factory and workshop facility managers",
    "Schools and colleges with overhead and underground tanks",
    "Hospitals and hostels that cannot go without water",
  ],
  how: [
    {
      title: "Fit the level sensor",
      body: "An ultrasonic sensor looks down from the tank lid, or a submersible pressure sensor sits at the bottom. The choice depends on the tank. Both are starting choices we are validating.",
    },
    {
      title: "Optionally read the pump signal",
      body: "A feedback wire from the pump contactor tells the node when the pump is on. This is read only. The node does not switch the pump.",
    },
    {
      title: "Readings reach the platform",
      body: "The node sends the level over Wi-Fi, or over a 4G variant where Wi-Fi does not reach the pump house. Readings are held on the device if the link drops and sent when it returns.",
    },
    {
      title: "You get the level and the alert",
      body: "The dashboard shows the level percentage and the pump run history. Low and high alerts go to the first contact on WhatsApp, and move to the next contact if nobody acknowledges.",
    },
  ],
  hardware: {
    sensors: [
      "Ultrasonic or submersible pressure level sensor (starting design choice)",
      "Optional pump-contactor feedback input (read only)",
    ],
    connectivity: ["Wi-Fi by default", "4G variant for remote pump houses"],
    power: "DC adapter with Li-ion or LiFePO4 backup as the starting design choice. Battery hours to be confirmed.",
  },
  specs: [
    { group: "Sensing", label: "Level sensor", value: "Ultrasonic or submersible pressure type", status: "design-target", note: DT },
    { group: "Sensing", label: "Pump feedback", value: "Optional contactor feedback input, read only", status: "design-target", note: DT },
    { group: "Sensing", label: "Level accuracy", value: "To be confirmed", status: "to-confirm", note: "Depends on the chosen sensor and tank. Not yet tested on a finished unit." },
    { group: "Connectivity", label: "Network", value: "Wi-Fi by default, 4G variant", status: "design-target", note: DT },
    { group: "Connectivity", label: "Radio approvals", value: "To be confirmed", status: "to-confirm", note: "Check which rules apply before any sale." },
    { group: "Power", label: "Supply", value: "DC adapter plus Li-ion or LiFePO4 backup", status: "design-target", note: DT },
    { group: "Power", label: "Backup run time", value: "To be confirmed", status: "to-confirm" },
    { group: "Enclosure", label: "Enclosure", value: "IP65 ABS box with cable glands", status: "design-target", note: DT },
    { group: "Enclosure", label: "Ingress rating of the finished unit", value: "To be confirmed", status: "to-confirm" },
    { group: "Alerts", label: "Local alarm", value: "Buzzer and LED", status: "design-target", note: DT },
    { group: "Alerts", label: "Alert channels", value: "WhatsApp, SMS, voice call, email", status: "design-target", note: PLAT },
    { group: "Data and reports", label: "Reports and export", value: "PDF reports and CSV export", status: "design-target", note: PLAT },
    { group: "Support", label: "Install help", value: "Planned. Terms to be confirmed.", status: "to-confirm" },
  ],
  features: [
    { title: "Level chart in percent", body: "See the tank as a percentage with a chart for the day, so you can tell a slow leak from normal use." },
    { title: "Low and high alerts", body: "Set a low mark and a high mark. A message goes out when the level crosses either one, and again if nobody acknowledges." },
    { title: "Pump dry-run alert", body: "If the pump has been running and the level has not risen, you are told to go and check the pump and the sump." },
    { title: "Pump runtime tracking", body: "With the optional feedback wire, the platform records each pump run and the total run time for the day." },
    { title: "Daily consumption estimate", body: "A daily figure worked out from level changes. It is an estimate, because pumping and use overlap." },
    { title: "Several tanks, one view", body: "Overhead tank, sump and borewell tank on one dashboard, with each user limited to the sites they look after." },
  ],
  benefits: [
    { title: "Fewer overflows", body: "A high-level message gives the caretaker time to switch the pump off before the terrace is wet." },
    { title: "Fewer dry taps", body: "A low-level message reaches the committee before residents start calling." },
    { title: "Pump trouble seen early", body: "Long runs with no rise in level point to a pump, valve or sump problem." },
    { title: "A record of use", body: "A daily history helps a manager see how much the building really uses." },
  ],
  applications: [
    { title: "Apartment overhead tanks", body: "The caretaker and the committee both see the level, and a high alert helps stop the night-time overflow." },
    { title: "Factory process and fire-water tanks", body: "A low alert for a tank the plant depends on, sent to the maintenance lead." },
    { title: "School and college sump and overhead pairs", body: "Watch both tanks, and see whether the pump keeps up through the day." },
    { title: "Hospital and hostel storage", body: "Places that cannot go without water get a low-level message early enough to arrange a tanker." },
    { title: "Farm and nursery water tanks", body: "A level view for tanks that feed irrigation, in places far from the owner." },
  ],
  protocols: [
    { name: "MQTT over TLS", role: "Carries readings and events from the node to the ConnectAtom platform." },
    { name: "Wi-Fi", role: "Default link from the node to the building network." },
    { name: "4G (Cat-1)", role: "Optional link where Wi-Fi does not reach the pump house or tank." },
    { name: "HTTPS", role: "Fallback path for devices that cannot use MQTT." },
  ],
  integrations: [
    { name: "WhatsApp", note: "Level and pump alerts to the first contact. Plan dependent." },
    { name: "SMS", note: "Critical alerts by SMS on higher plans." },
    { name: "Voice call", note: "Escalation call to the next contact on higher plans." },
    { name: "Email", note: "Alerts and scheduled reports by email." },
    { name: "CSV export", note: "Download level and pump history for your own sheets." },
    { name: "PDF reports", note: "Daily, weekly and monthly reports, depending on the plan." },
    { name: "API and webhooks", note: "On higher plans, for connecting to your own systems." },
  ],
  tags: ["level", "pump", "wifi", "4g", "whatsapp", "escalation", "reports", "offline-buffering"],
  docs: [
    { title: "Water Tank Level and Pump Alert datasheet", kind: "datasheet", status: "planned" },
    { title: "Tank sensor installation guide", kind: "install-guide", status: "planned" },
    { title: "Sample daily level report", kind: "sample-report", status: "planned" },
  ],
  pricing: {
    hardwareFromInr: 5000,
    hardwareToInr: 10000,
    monthlyInr: 200,
    monthlyNote: "Indicative starting assumption per device per month. To be confirmed with early-access customers. Not an offer.",
    showPublic: false,
  },
  alertExample:
    "Sample. Block B overhead tank: 18% and falling (low mark 25%). Pump has run 40 min and the level has not risen. Check the pump and the sump valve.",
  reportName: "Daily tank level and pump run summary",
  deviceTypeKey: "water_tank_v1",
  watchOut: [
    "Automatic pump control (a relay output) adds electrical-safety risk. The first version is monitoring only.",
    "The daily consumption figure is an estimate. Inflow and use overlap, so treat it as a guide.",
  ],
  faqs: [
    {
      q: "Can I order the Water Tank Level and Pump Alert today?",
      a: "No. It is in development. We are collecting early-access interest so we can test it on real tanks. Tell us your tank type and we will contact you when a pilot slot opens.",
    },
    {
      q: "Will it switch my pump on and off?",
      a: "Not in the first version. It watches and alerts only. Switching a pump means working on the electrical supply, and we want to prove the monitoring first.",
    },
    {
      q: "Which sensor will it use?",
      a: "Either an ultrasonic sensor on the lid or a submersible pressure sensor at the bottom. The right one depends on your tank, and we are still validating both.",
    },
    {
      q: "Is the consumption figure exact?",
      a: "No. It is a daily estimate worked out from level changes. If the pump fills the tank while people draw from it, the figure will be rough.",
    },
    {
      q: "What if Wi-Fi does not reach the pump house?",
      a: "A 4G variant is planned for that case. The device also keeps readings on board when the link drops and sends them when it comes back.",
    },
  ],
  relatedProductSlugs: ["generator-monitor", "water-leak-detector"],
  images: { gallery: [] },
  missing: [
    "Level sensor accuracy on a finished unit, for ultrasonic and for pressure types",
    "Supplier datasheet for the chosen level sensor",
    "Power supply details, battery capacity and backup run time",
    "Enclosure ingress rating of the finished unit",
    "Radio approvals for the wireless device",
    "Installation photographs from a real tank",
    "Maximum tank depth and sensing range the product will support",
    "Wiring and installation rules for the pump-contactor feedback input, checked by a licensed electrician",
    "Behaviour of the ultrasonic reading with foam, condensation and a moving water surface",
    "Confirmed hardware and monthly price after supplier quotes",
  ],
  updatedAt: "2026-11-24",
  publishedAt: "2026-11-24",
  status: "live",
} as Product;

export default waterTankLevelMonitor;
