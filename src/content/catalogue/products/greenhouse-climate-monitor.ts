import type { Product } from "@/lib/catalogue/types";

const DT = "Starting design choice from the product playbook; confirm against the supplier datasheet.";
const PLAT = "Platform capability from the product playbook; which channels you get depends on the plan.";

const greenhouseClimateMonitor: Product = {
  num: 9,
  slug: "greenhouse-climate-monitor",
  name: "Greenhouse, Mushroom and Hatchery Climate Monitor",
  brandName: "ConnectAtom Greenhouse",
  modelCode: "CA-GH1",
  tier: 2,
  phase: "expand",
  availability: "in-development",
  sector: "agriculture",
  scene: "greenhouse",
  device: "climate-node",
  headline: "CO2, temperature and humidity alerts by growth stage",
  tagline: "Planned: watch CO2, temperature and humidity in your grow room and hear about a drift early.",
  summary:
    "In development: a climate node for greenhouses, mushroom rooms and hatcheries tracking CO2, temperature and humidity per growth stage. Early access is open.",
  overview: [
    "ConnectAtom Greenhouse is in development. It is not on sale yet, and we are collecting early-access interest from mushroom growers, polyhouse farmers, nursery owners and hatchery operators who would like to try it. This page describes what the product will do and what we are still validating in real grow rooms.",
    "The idea is a small weather-resistant node that hangs where the crop is. It measures CO2, air temperature and humidity, and can add a light reading. The node sends readings to the ConnectAtom platform, and you see the room on your phone. You tell the platform what crop or batch is growing and which stage it is at, and the platform checks the room against the ranges you set for that stage. When the room drifts out of range for the time you chose, the right person gets a message on WhatsApp.",
    "We are starting with mushroom growers near Hyderabad, because their rooms are small, their ranges are tight and the feedback comes within days. In the first version the product watches and alerts only. A relay output to run fans or foggers is a later idea, and it needs its own electrical-safety review before we offer it. What we are validating now is how steady the readings stay in a damp room, how often a sensor needs cleaning or replacing, and whether the stage-wise profiles match how growers actually work.",
  ],
  problem:
    "In a grow room, small drifts matter. CO2 that builds up in a closed mushroom room, a humidity swing after the fogger fails, or a hot afternoon under plastic can lower the yield or spoil a whole batch. The change is slow and gentle, so nobody feels it. The grower finds out at harvest, when the crop is already poor.",
  buyers: [
    "Mushroom growers running small fruiting rooms",
    "Polyhouse and greenhouse farmers",
    "Nursery owners with hardening and propagation areas",
    "Hatcheries that need a steady room climate",
  ],
  how: [
    {
      title: "Hang the node at crop height",
      body: "The node goes where the crop sits, away from the fogger nozzle, the fan outlet and the door. In a mushroom room that means beside the beds. In a polyhouse it means under the canopy, out of direct sun.",
    },
    {
      title: "Choose the crop and the stage",
      body: "You create a crop or batch profile and set target ranges for each growth stage. You decide the numbers, because you know your crop. The platform does not decide them for you.",
    },
    {
      title: "Readings reach the platform",
      body: "The node sends CO2, temperature and humidity over Wi-Fi, or over a 4G variant on farms where Wi-Fi does not reach. If the link drops, the node holds readings on the device and sends them in order when the link returns.",
    },
    {
      title: "You hear about a drift, and read the day",
      body: "When a reading stays out of range for the time you set, the first contact gets a WhatsApp message. If nobody acknowledges, it moves to the next contact. Each morning a daily climate report shows how the room behaved overnight.",
    },
  ],
  hardware: {
    sensors: [
      "SCD41-class CO2, temperature and humidity sensor (starting design choice)",
      "Optional light sensor",
    ],
    connectivity: ["Wi-Fi by default", "4G variant for remote farms", "On-device buffering when the link drops"],
    power: "Mains adapter with battery backup, or a solar and battery option for remote sites. Battery hours and solar panel size to be confirmed.",
  },
  specs: [
    { group: "Sensing", label: "CO2, temperature and humidity", value: "SCD41-class combined sensor", status: "design-target", note: DT },
    { group: "Sensing", label: "Light sensor", value: "Optional", status: "design-target", note: DT },
    { group: "Sensing", label: "Accuracy of the finished unit", value: "To be confirmed", status: "to-confirm", note: "Not yet tested on a finished unit in a damp room." },
    { group: "Connectivity", label: "Network", value: "Wi-Fi by default, 4G variant", status: "design-target", note: DT },
    { group: "Connectivity", label: "Radio approvals", value: "To be confirmed", status: "to-confirm", note: "Check which rules apply before any sale." },
    { group: "Power", label: "Supply", value: "Mains adapter with battery, or solar and battery option", status: "design-target", note: DT },
    { group: "Power", label: "Battery run time and solar sizing", value: "To be confirmed", status: "to-confirm" },
    { group: "Enclosure", label: "Enclosure", value: "Weather-resistant enclosure", status: "design-target", note: DT },
    { group: "Enclosure", label: "Ingress rating of the finished unit", value: "To be confirmed", status: "to-confirm", note: "Fogging and wash-down need testing." },
    { group: "Profiles", label: "Crop and batch profiles", value: "Target ranges per growth stage, day and night rules", status: "design-target", note: "Platform capability planned in the product playbook." },
    { group: "Alerts", label: "Local alarm", value: "Buzzer and LED", status: "design-target", note: DT },
    { group: "Alerts", label: "Alert channels", value: "WhatsApp, SMS, voice call, email", status: "design-target", note: PLAT },
    { group: "Data and reports", label: "Daily climate report and export", value: "PDF report and CSV export", status: "design-target", note: PLAT },
    { group: "Support", label: "Install help", value: "Planned. Terms to be confirmed.", status: "to-confirm" },
  ],
  features: [
    { title: "Crop and batch profiles", body: "Create a profile for a crop or a batch, with target ranges for each growth stage. Move the batch to the next stage and the ranges change with it." },
    { title: "Day and night rules", body: "A room that is right at noon can be wrong at 2 a.m. Set one range for the day and another for the night, so alerts match the cycle you run." },
    { title: "CO2 trend view", body: "See CO2 rise and fall through the day. A room that fills with CO2 after the fresh-air fan stops shows up as a climb on the chart." },
    { title: "Out-of-range for N minutes", body: "You choose how long a reading may stay out of range before anyone is told. A short spike after the door opens does not wake anyone." },
    { title: "Daily climate report", body: "Each morning, one page: highs, lows and time out of range for each stage, for the owner and the supervisor." },
    { title: "Optional light reading and a later relay", body: "A light sensor shows whether the lamps or the shade net did their job. A relay output for fans or foggers is a later idea, not part of the first version." },
  ],
  benefits: [
    { title: "Drift is caught while it can be fixed", body: "A message while the batch is still growing leaves time to open a vent, reset a fogger or call the electrician." },
    { title: "Fewer night-time surprises", body: "The node watches overnight, so the grower does not have to walk to the shed to check." },
    { title: "Records that explain a bad batch", body: "When yield drops, the climate history shows whether the room was the cause or not." },
    { title: "Good batches can be repeated", body: "Keep the profile of a good batch and run the next one the same way." },
  ],
  applications: [
    { title: "Mushroom fruiting rooms", body: "Small rooms with tight ranges. CO2 and humidity matter most, and a fogger or fan fault shows within the hour." },
    { title: "Polyhouses and greenhouses", body: "Heat under plastic on a still afternoon, and humidity that stays high overnight. Place the node under the canopy." },
    { title: "Nursery hardening and propagation areas", body: "Seedlings are sensitive. A day and night rule fits the way these areas are run." },
    { title: "Hatchery rooms", body: "A hatchery room needs a steady climate. The node watches the room, and the alert reaches the person on duty." },
    { title: "Remote farms on solar", body: "A solar and battery option for sites without steady mains, with readings buffered on the device when the signal is weak." },
  ],
  protocols: [
    { name: "MQTT over TLS", role: "Carries readings and events from the node to the ConnectAtom platform." },
    { name: "Wi-Fi", role: "Default link from the node to the farm or shed network." },
    { name: "4G (Cat-1)", role: "Optional link on farms where Wi-Fi does not reach the grow room." },
    { name: "I2C", role: "Connects the sensor and the optional light sensor to the node board inside the unit." },
  ],
  integrations: [
    { name: "WhatsApp", note: "Climate alerts to the first contact. Plan dependent." },
    { name: "SMS", note: "Critical alerts by SMS on higher plans." },
    { name: "Voice call", note: "Escalation call to the next contact on higher plans." },
    { name: "Email", note: "Alerts and scheduled reports by email." },
    { name: "CSV export", note: "Download climate history for your own sheets." },
    { name: "PDF reports", note: "Daily, weekly and monthly reports, depending on the plan." },
    { name: "API and webhooks", note: "On higher plans, for connecting to your own systems." },
  ],
  tags: ["temperature", "humidity", "co2", "wifi", "4g", "outdoor", "battery-backup", "offline-buffering", "whatsapp", "reports"],
  docs: [
    { title: "Greenhouse Climate Monitor datasheet", kind: "datasheet", status: "planned" },
    { title: "Grow room placement and installation guide", kind: "install-guide", status: "planned" },
    { title: "Sample daily climate report", kind: "sample-report", status: "planned" },
  ],
  pricing: {
    hardwareFromInr: 6000,
    hardwareToInr: 12000,
    monthlyInr: 400,
    monthlyNote: "Indicative starting assumption per device per month. To be confirmed with early-access customers. Not an offer.",
    showPublic: false,
  },
  alertExample:
    "Sample. Fruiting Room 2, Batch 14: CO2 above your range for 25 min and humidity falling. Fresh-air fan or fogger may have stopped. Check both.",
  reportName: "Daily grow room climate report",
  deviceTypeKey: "greenhouse_climate_v1",
  watchOut: [
    "Rural connectivity may need a 4G variant or on-device buffering, depending on the farm.",
    "Humidity sensors drift in condensing environments. Expect to check them against a reference and replace them over time.",
    "The target ranges are yours to set. We do not supply growing advice.",
  ],
  faqs: [
    {
      q: "Can I order the Greenhouse, Mushroom and Hatchery Climate Monitor today?",
      a: "No. It is in development. We are collecting early-access interest so we can test it in real grow rooms. Tell us your crop and your room size and we will contact you when a pilot slot opens.",
    },
    {
      q: "Who will you try it with first?",
      a: "Mushroom growers near Hyderabad. Their rooms are small and their ranges are tight, so we learn quickly whether the readings are useful. Greenhouses and hatcheries follow.",
    },
    {
      q: "Does it control my fans or foggers?",
      a: "Not in the first version. It watches and alerts only. A relay output is a later idea, and it needs an electrical-safety review before we offer it.",
    },
    {
      q: "Will it work on a farm with a poor signal?",
      a: "A 4G variant is planned for such sites, and the node keeps readings on board when the link drops, then sends them when it returns. We are still testing how this behaves in rural areas.",
    },
    {
      q: "How long will the humidity sensor last in a damp room?",
      a: "We do not know yet. Humidity sensors drift where water condenses on them, and we are testing how fast. We will tell you what we learn and plan for checks and replacement.",
    },
  ],
  relatedProductSlugs: ["poultry-shed-monitor", "air-quality-monitor", "warehouse-climate-monitor"],
  images: { gallery: [] },
  missing: [
    "Accuracy and long-term drift of the CO2, temperature and humidity sensor in a damp, condensing room",
    "Supplier datasheet for the chosen sensor and the optional light sensor",
    "Battery capacity, backup run time and solar panel size for remote sites",
    "Enclosure ingress rating of the finished unit, including fogging and wash-down",
    "Radio approvals for the wireless device",
    "Photographs from a real mushroom room or polyhouse",
    "Sensor cleaning and replacement interval, and the price of a replacement",
    "Real behaviour of 4G and on-device buffering on a rural farm",
    "Relay output wiring and safety rules for fans and foggers, checked by a licensed electrician",
    "Confirmed hardware and monthly price after supplier quotes",
  ],
  updatedAt: "2026-11-24",
  publishedAt: "2026-11-24",
  status: "live",
} as Product;

export default greenhouseClimateMonitor;
