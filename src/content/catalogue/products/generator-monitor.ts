import type { Product } from "@/lib/catalogue/types";

const DT = "Starting design choice from the product playbook; confirm against the supplier datasheet.";
const PLAT = "Platform capability from the product playbook; which channels you get depends on the plan.";

const generatorMonitor: Product = {
  num: 12,
  slug: "generator-monitor",
  name: "Diesel Generator Monitor",
  brandName: "ConnectAtom Generator",
  modelCode: "CA-DG1",
  tier: 2,
  phase: "expand",
  availability: "in-development",
  sector: "facilities",
  scene: "building",
  device: "clamp-meter",
  headline: "run hours, fuel level and fail-to-start alerts",
  tagline: "Planned: know when your generator ran, how much fuel it has, and when it failed to start.",
  summary:
    "In development: a diesel generator monitor tracking run hours, fuel level and start failures, with service reminders. Early-access interest is being collected.",
  overview: [
    "ConnectAtom Generator is in development. It is not on sale yet, and we are collecting early-access interest from hospitals, factories, shops and apartment buildings that run a diesel generator set and would like to try it. This page describes what the product will do and what we are still validating on real generators.",
    "The idea is to give a generator the same quiet watching that a cold room gets. The node reads a run signal, either from a voltage-free contact on the generator control panel or from a clamp on a cable. It senses the starter battery voltage. It reads the fuel level with a sensor placed outside the tank, or with a properly rated sensor where that is suitable. From these, the platform counts run hours, reminds you when a service is due, tells you when the fuel level falls faster than the engine could burn it, and tells you when the mains failed and the generator did not start.",
    "We are starting with fuel-level and theft monitoring because that is the loss owners feel first. Service reminders come with it and keep the record useful. We are careful about fuel tanks. They are hazardous places, and we will not put improvised electronics inside one. A theft alert is a signal to go and look, not proof of who did it.",
  ],
  problem:
    "A generator is used rarely, so it is easy to forget. Fuel goes missing between visits, servicing slips past the due date, and the starter battery weakens quietly. The first sign of trouble is often the one that matters most: a power cut, a generator that does not start, and a ward, a cold room or a production line left in the dark.",
  buyers: [
    "Hospitals and nursing homes with standby generators",
    "Factory owners and plant managers",
    "Shops, malls and offices with a DG set",
    "Apartment committees and township facility managers",
  ],
  how: [
    {
      title: "Read the run signal",
      body: "The node takes a run signal from a voltage-free contact on the generator panel, or from a clamp around an output cable. The clamp avoids touching the panel wiring. Both options are starting design choices, and a qualified electrician should do the connection.",
    },
    {
      title: "Sense fuel from outside the tank",
      body: "The fuel level is read with a sensor that sits outside the tank, or with a properly rated sensor where that is suitable. We will not recommend improvised electronics inside a fuel tank.",
    },
    {
      title: "Watch the starter battery",
      body: "The node reads the battery voltage, so a weak battery shows up before the day the generator has to start. Ambient temperature near the set can be added.",
    },
    {
      title: "Alerts, run hours and the monthly report",
      body: "Readings go to the platform over Wi-Fi or a 4G variant. A fuel drop, a failed start or a service due goes to the first contact on WhatsApp, and to the next contact if nobody acknowledges. A monthly report lists runs and fuel.",
    },
  ],
  hardware: {
    sensors: [
      "Run signal through a voltage-free contact or a CT clamp (starting design choice)",
      "External fuel-level sensing, or a properly rated sensor",
      "Battery voltage sense",
      "Ambient temperature sensor",
    ],
    connectivity: ["Wi-Fi by default", "4G variant for generator yards without Wi-Fi", "On-device buffering when the link drops"],
    power: "Powered from a DC adapter with battery backup as the starting design choice, so the node still reports when the mains fails. Battery hours to be confirmed.",
  },
  specs: [
    { group: "Sensing", label: "Run signal", value: "Voltage-free contact or CT clamp", status: "design-target", note: DT },
    { group: "Sensing", label: "Fuel level", value: "External sensing, or a properly rated sensor", status: "design-target", note: DT },
    { group: "Sensing", label: "Battery voltage", value: "Starter battery voltage sense", status: "design-target", note: DT },
    { group: "Sensing", label: "Ambient temperature", value: "Sensor near the set", status: "design-target", note: DT },
    { group: "Sensing", label: "Fuel level accuracy", value: "To be confirmed", status: "to-confirm", note: "Depends on the tank shape and the sensing method. Not yet tested on a real tank." },
    { group: "Connectivity", label: "Network", value: "Wi-Fi by default, 4G variant", status: "design-target", note: DT },
    { group: "Connectivity", label: "Radio approvals", value: "To be confirmed", status: "to-confirm", note: "Check which rules apply before any sale." },
    { group: "Power", label: "Supply", value: "DC adapter plus battery backup", status: "design-target", note: DT },
    { group: "Power", label: "Backup run time", value: "To be confirmed", status: "to-confirm" },
    { group: "Enclosure", label: "Enclosure", value: "IP65 ABS box with cable glands", status: "design-target", note: DT },
    { group: "Enclosure", label: "Ingress rating of the finished unit", value: "To be confirmed", status: "to-confirm", note: "Heat, vibration and diesel fumes near a set are not yet tested." },
    { group: "Alerts", label: "Alert channels", value: "WhatsApp, SMS, voice call, email", status: "design-target", note: PLAT },
    { group: "Data and reports", label: "Monthly run report and export", value: "PDF report and CSV export", status: "design-target", note: PLAT },
    { group: "Support", label: "Install help", value: "Planned. Terms to be confirmed.", status: "to-confirm" },
  ],
  features: [
    { title: "Run hours and service reminders", body: "Every run is counted. When the set reaches the service hours you chose, the facility manager gets a reminder." },
    { title: "Fuel level view", body: "See the fuel level on your phone, with a chart through the day and through the month." },
    { title: "Fuel theft alert", body: "If the level drops while the generator is not running, you are told to go and look. It is a prompt to check, not proof of theft." },
    { title: "Fail-to-start alert", body: "When mains power is lost and the generator has not started within the time you set, the engineer is called first and the owner next." },
    { title: "Battery voltage watch", body: "A weak starter battery is a common reason a set does not start. A falling voltage is flagged before the next power cut." },
    { title: "Monthly run report", body: "One page: each run, its length, fuel used and fuel added, and the service due date." },
  ],
  benefits: [
    { title: "Fuel losses become visible", body: "A level that falls with the engine off is a clear signal. The owner can then look into it." },
    { title: "Servicing keeps pace", body: "Reminders come from real run hours, not from memory or a diary." },
    { title: "Fewer dark surprises", body: "A fail-to-start alert tells you within minutes, while there is still time to act." },
    { title: "A record of runs", body: "A monthly list of runs and fuel helps with budgeting and with questions from management." },
  ],
  applications: [
    { title: "Hospital standby sets", body: "The engineer is told at once if the set does not start during a cut, so wards are not left waiting." },
    { title: "Factory generator sets", body: "Track run hours and fuel across shifts, and see what each power cut cost in diesel." },
    { title: "Apartment and township DG sets", body: "The committee sees runs and fuel without relying on the watchman's log." },
    { title: "Shops and offices", body: "A small set that runs a few hours a month still needs its battery and servicing watched." },
    { title: "Cold rooms and server rooms with a standby set", body: "Pairs naturally with room monitors, so you know about the cut and the generator together." },
  ],
  protocols: [
    { name: "MQTT over TLS", role: "Carries readings and events from the node to the ConnectAtom platform." },
    { name: "Wi-Fi", role: "Default link from the node to the building network." },
    { name: "4G (Cat-1)", role: "Optional link where Wi-Fi does not reach the generator yard." },
    { name: "Dry contact input", role: "Reads the run signal from a voltage-free contact on the generator panel." },
  ],
  integrations: [
    { name: "WhatsApp", note: "Fuel, start and service alerts to the first contact. Plan dependent." },
    { name: "SMS", note: "Critical alerts by SMS on higher plans." },
    { name: "Voice call", note: "Escalation call to the next contact on higher plans." },
    { name: "Email", note: "Alerts and scheduled reports by email." },
    { name: "CSV export", note: "Download run and fuel history for your own sheets." },
    { name: "PDF reports", note: "Monthly run reports, depending on the plan." },
    { name: "API and webhooks", note: "On higher plans, for connecting to your own systems." },
  ],
  tags: ["generator", "fuel", "power-cut", "mains-sensing", "energy", "wifi", "4g", "battery-backup", "whatsapp", "escalation", "reports"],
  docs: [
    { title: "Diesel Generator Monitor datasheet", kind: "datasheet", status: "planned" },
    { title: "Generator and fuel sensor installation guide", kind: "install-guide", status: "planned" },
    { title: "Sample monthly run report", kind: "sample-report", status: "planned" },
  ],
  pricing: {
    hardwareFromInr: 8000,
    hardwareToInr: 15000,
    monthlyInr: 400,
    monthlyNote: "Indicative starting assumption per device per month. To be confirmed with early-access customers. Not an offer.",
    showPublic: false,
  },
  alertExample:
    "Sample. Main DG set: mains lost 4 min ago and the generator has not started. Starter battery is low. Check the set and the battery.",
  reportName: "Monthly generator run and fuel report",
  deviceTypeKey: "generator_v1",
  watchOut: [
    "Fuel tanks are hazardous. We use external sensing or properly rated sensors only, never improvised electronics inside a tank.",
    "A fuel-drop alert is a prompt to check. Refuelling, a sloping tank or temperature change can also move a reading.",
    "Connection to the generator panel or cables should be done by a qualified electrician.",
  ],
  faqs: [
    {
      q: "Can I order the Diesel Generator Monitor today?",
      a: "No. It is in development. We are collecting early-access interest so we can test it on real generators. Tell us your set and your site and we will contact you when a pilot slot opens.",
    },
    {
      q: "How will you measure the fuel level?",
      a: "With a sensor that sits outside the tank, or a properly rated sensor where that is suitable. We will not put improvised electronics inside a fuel tank, because the risk is too high.",
    },
    {
      q: "Does a fuel alert prove theft?",
      a: "No. It tells you the level fell while the set was not running. You still have to go and check, because a sloping tank, a leak or a sensor fault could be the cause.",
    },
    {
      q: "How does it know the generator ran?",
      a: "From a voltage-free contact on the control panel, or from a clamp on an output cable. Which one suits you depends on your set, and an electrician should fit it.",
    },
    {
      q: "Will it start my generator or control the changeover?",
      a: "No. It watches and alerts only. It tells you when a start did not happen, and your team handles the rest.",
    },
  ],
  relatedProductSlugs: ["energy-monitor", "water-tank-level-monitor", "poultry-shed-monitor"],
  images: { gallery: [] },
  missing: [
    "Fuel level accuracy for the chosen external sensing method on real tanks",
    "Supplier datasheets for the fuel sensor, the CT clamp and the battery sense",
    "Checked wiring method for the run contact and the clamp, by a licensed electrician",
    "Behaviour of the node near heat, vibration and diesel fumes",
    "Battery capacity and backup run time",
    "Enclosure ingress rating of the finished unit",
    "Radio approvals for the wireless device",
    "Photographs from a real generator installation",
    "Which rules apply to fitting sensors near fuel storage",
    "Confirmed hardware and monthly price after supplier quotes",
  ],
  updatedAt: "2026-11-24",
  publishedAt: "2026-11-24",
  status: "live",
} as Product;

export default generatorMonitor;
