import type { Product } from "@/lib/catalogue/types";

const DT = "Starting design choice from the product playbook; confirm against the supplier datasheet.";
const PLAT = "Platform capability from the product playbook; which channels you get depends on the plan.";

const reeferTruckTracker: Product = {
  num: 19,
  slug: "reefer-truck-tracker",
  name: "Reefer Truck Tracker",
  brandName: "ConnectAtom Reefer",
  modelCode: "CA-RT1",
  tier: 3,
  phase: "later",
  availability: "in-development",
  sector: "logistics",
  scene: "truck",
  device: "gps-tracker",
  headline: "live route and cargo temperature",
  tagline: "Planned: show the consignee the temperature of the load, all the way to the door.",
  summary:
    "In development: a GPS and temperature tracker for refrigerated trucks with a live trip map and a trip report per delivery. Early access is open to transporters.",
  overview: [
    "ConnectAtom Reefer is in development. It is not on sale yet, and we are collecting early-access interest from food, pharma and dairy transporters and last-mile cold-chain operators. This page describes what the product will do and what we are still validating. We expect to pilot it with one or two small transporters first.",
    "A refrigerated load can leave the cold room at the right temperature and still be rejected at the other end. The consignee cannot see what happened in the truck, and the driver cannot prove it. The idea is to put a tracker in the truck with one or two temperature probes in the cargo area, a door sensor, a GPS position and a 4G link. The dispatcher sees the truck on a map. The consignee gets a trip report showing the temperature along the route.",
    "This is harder than a cold room. The unit sits in a moving vehicle, runs on an internal battery, depends on a mobile network that has gaps, and uses a SIM that costs money to run. What we are validating now is where to place the probes in different truck bodies, how long the battery lasts between charges, how well the tracker holds readings through dead zones, and what the rules say about SIMs and GPS trackers.",
  ],
  problem:
    "Consignees reject loads when they cannot see the temperature during transit. A driver who stopped at a dhaba, a door left open at a drop, or a reefer unit that cycled off for an hour leaves no trace. The transporter has no evidence and the load is argued over.",
  buyers: [
    "Food, pharma and dairy transporters",
    "Last-mile cold-chain operators",
    "Dispatchers who manage several trucks from one desk",
    "Consignees who want to see the temperature of what they receive",
  ],
  how: [
    {
      title: "Fit the tracker and the probes",
      body: "A 4G tracker with GPS is installed in the truck. One or two temperature probes go in the cargo area, and a door sensor goes on the rear door. Probe placement for each truck body is something we are validating.",
    },
    {
      title: "Readings are held on the device",
      body: "The tracker records position, temperature and door state, and runs on an internal battery. Where the mobile signal drops, it holds the readings on the device and sends them when the signal returns.",
    },
    {
      title: "The platform builds the trip",
      body: "Readings reach the ConnectAtom platform over a 4G link on an M2M or IoT SIM. The dispatcher sees the truck live on a map, with the temperature plotted against the route.",
    },
    {
      title: "Alerts and the trip report",
      body: "A temperature excursion or a geofence in or out goes to the dispatcher on WhatsApp. At the end of each delivery, a trip report PDF is made for the consignee.",
    },
  ],
  hardware: {
    sensors: [
      "GPS position from the tracker (starting design choice)",
      "One or two temperature probes in the cargo area (starting design choice)",
      "Door sensor (starting design choice)",
    ],
    connectivity: ["4G modem with GPS", "M2M or IoT SIM"],
    power: "Internal battery as the starting design choice. Run time and the vehicle power connection are to be confirmed.",
  },
  specs: [
    { group: "Sensing", label: "Temperature probes", value: "One or two probes in the cargo area", status: "design-target", note: DT },
    { group: "Sensing", label: "Door sensor", value: "Door open and close sensor", status: "design-target", note: DT },
    { group: "Sensing", label: "Temperature accuracy", value: "To be confirmed", status: "to-confirm", note: "Depends on the chosen probe and where it sits. Not yet tested on a finished unit." },
    { group: "Location", label: "Positioning", value: "GPS through the 4G modem", status: "design-target", note: DT },
    { group: "Location", label: "Position accuracy and update interval", value: "To be confirmed", status: "to-confirm" },
    { group: "Connectivity", label: "Network", value: "4G modem with an M2M or IoT SIM", status: "design-target", note: DT },
    { group: "Connectivity", label: "SIM plan and data cost", value: "To be confirmed", status: "to-confirm", note: "SIM data is a running cost. Supplier and plan not yet chosen." },
    { group: "Connectivity", label: "Radio approvals", value: "To be confirmed", status: "to-confirm", note: "Check which rules apply before any sale." },
    { group: "Power", label: "Power", value: "Internal battery", status: "design-target", note: DT },
    { group: "Power", label: "Battery run time", value: "To be confirmed", status: "to-confirm" },
    { group: "Enclosure", label: "Enclosure and ingress rating", value: "To be confirmed", status: "to-confirm", note: "Vehicle vibration, wash-down and heat need to be considered." },
    { group: "Alerts", label: "Alert channels", value: "WhatsApp, SMS, voice call, email", status: "design-target", note: PLAT },
    { group: "Data and reports", label: "Trip report and export", value: "PDF reports and CSV export", status: "design-target", note: PLAT },
  ],
  features: [
    { title: "Live trip map", body: "See where each truck is now and the route it has taken, on your phone or at the dispatch desk." },
    { title: "Temperature against the route", body: "A chart that puts the cargo temperature beside the journey, so a rise can be tied to a stop or a door opening." },
    { title: "Trip report for the consignee", body: "A PDF for each delivery with the route and the temperature trace, ready to hand over at the drop." },
    { title: "Geofence in and out", body: "Draw a boundary around a depot or a customer. A message goes out when the truck enters or leaves." },
    { title: "Excursion alerts to the dispatcher", body: "When the cargo temperature stays outside the range for the time you set, the dispatcher is told, and the message moves to the next contact if nobody acknowledges." },
    { title: "Door open record", body: "Each door opening is logged against the time and place, so a long stop with the door open shows up in the trip." },
  ],
  benefits: [
    { title: "Evidence at the drop", body: "A trip report shows the consignee what the load went through, instead of an argument at the gate." },
    { title: "Problems caught on the road", body: "A dispatcher who hears about an excursion mid-trip can call the driver while there is still time to act." },
    { title: "Fewer rejected loads", body: "A clear record helps settle a dispute about whether the temperature was kept." },
    { title: "One view of the fleet", body: "A dispatcher can watch several trucks, each with its own route and temperature." },
  ],
  applications: [
    { title: "Dairy and milk collection runs", body: "Trucks moving chilled milk or curd, with a trip report for the receiving plant." },
    { title: "Pharma and vaccine deliveries", body: "Temperature-controlled loads where the consignee asks to see the temperature in transit. Check which rules apply to you." },
    { title: "Frozen food and ice cream distribution", body: "Multi-drop routes where the rear door opens many times and the temperature needs to recover between stops." },
    { title: "Fruit, vegetable and fish transport", body: "Long-haul loads from farm or port to market, where a reefer unit that cycles off is hard to spot." },
    { title: "Last-mile cold-chain vans", body: "Smaller refrigerated vans on city routes, with geofences around each customer." },
  ],
  protocols: [
    { name: "MQTT over TLS", role: "Carries readings and events from the tracker to the ConnectAtom platform." },
    { name: "4G (Cat-1)", role: "Mobile data link from the truck, using an M2M or IoT SIM." },
    { name: "GPS", role: "Gives the position that the live map and the route chart are drawn from." },
    { name: "HTTPS", role: "Fallback path for devices that cannot use MQTT." },
  ],
  integrations: [
    { name: "WhatsApp", note: "Excursion and geofence alerts to the dispatcher. Plan dependent." },
    { name: "SMS", note: "Critical alerts by SMS on higher plans." },
    { name: "Voice call", note: "Escalation call to the next contact on higher plans." },
    { name: "Email", note: "Alerts and trip reports by email." },
    { name: "CSV export", note: "Download position and temperature history for your own sheets." },
    { name: "PDF reports", note: "A trip report per delivery for the consignee." },
    { name: "API and webhooks", note: "On higher plans, for connecting to your own dispatch system." },
  ],
  tags: ["gps", "mapping", "temperature", "door", "4g", "cold-chain", "offline-buffering", "battery-backup", "reports", "escalation", "whatsapp"],
  docs: [
    { title: "Reefer Truck Tracker datasheet", kind: "datasheet", status: "planned" },
    { title: "Truck installation guide", kind: "install-guide", status: "planned" },
    { title: "Sample trip report", kind: "sample-report", status: "planned" },
  ],
  pricing: {
    hardwareFromInr: 10000,
    hardwareToInr: 18000,
    monthlyInr: 700,
    monthlyNote: "Indicative starting assumption per device per month. To be confirmed with early-access customers. Not an offer.",
    showPublic: false,
  },
  alertExample:
    "Sample. Truck KA-01 to Hosur: cargo probe 1 has been above its limit for 20 min. Rear door opened 12 min ago at the last stop. Call the driver and check the reefer unit.",
  reportName: "Per-delivery trip report with route and temperature",
  deviceTypeKey: "reefer_v1",
  watchOut: [
    "Cellular dead zones are common on highways. The tracker has to hold readings on the device and send them when the signal returns.",
    "SIM data has a running cost, and it is part of the monthly price to be confirmed.",
    "Check the rules for SIMs and GPS trackers before selling. We have not confirmed what applies.",
  ],
  faqs: [
    {
      q: "Can I order the Reefer Truck Tracker today?",
      a: "No. It is in development. We plan to pilot it with one or two small transporters first. Tell us about your fleet and routes and we will contact you if a pilot slot suits you.",
    },
    {
      q: "What happens when the truck has no mobile signal?",
      a: "The tracker is designed to hold readings on the device and send them when the signal returns. The live map will lag in a dead zone, but the trip report should still be complete. We are validating this on real routes.",
    },
    {
      q: "Does the tracker control the reefer unit?",
      a: "No. It records and alerts only. It does not change the set temperature or switch the unit.",
    },
    {
      q: "Who gets the trip report?",
      a: "The transporter makes it for each delivery, and can pass the PDF to the consignee. What the consignee does with it is between you and them.",
    },
    {
      q: "Is there a running cost beyond the monthly plan?",
      a: "Yes, the SIM data has a running cost. The playbook assumes a monthly figure of about ₹700 per device, indicative and not an offer. Whether SIM data is inside it is still to be confirmed.",
    },
  ],
  relatedProductSlugs: ["door-open-sensor", "cold-room-monitor", "dairy-chilling-monitor"],
  images: { gallery: [] },
  missing: [
    "The rules for SIMs and GPS trackers in India. We have not confirmed what applies, and this must be checked before any sale",
    "M2M or IoT SIM supplier, plan and per-device data cost",
    "Supplier datasheet for the 4G modem with GPS",
    "Internal battery capacity and run time between charges",
    "How the tracker draws or avoids vehicle power, and wiring rules checked by a qualified person",
    "Temperature probe accuracy and recommended probe placement in different truck bodies",
    "GPS position accuracy and the reporting interval",
    "Enclosure ingress rating for vehicle vibration, heat and wash-down",
    "Radio approvals for the 4G device",
    "Installation photographs from a real truck",
    "Pilot route results from one or two small transporters",
    "Confirmed hardware and monthly price after supplier quotes",
  ],
  updatedAt: "2026-11-24",
  publishedAt: "2026-11-24",
  status: "live",
} as Product;

export default reeferTruckTracker;
