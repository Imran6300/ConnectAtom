import type { Product } from "@/lib/catalogue/types";

const DT = "Starting design choice from the product playbook; confirm against the supplier datasheet.";
const PLAT = "Platform capability from the product playbook; which channels you get depends on the plan.";

const soilMoistureMonitor: Product = {
  num: 14,
  slug: "soil-moisture-monitor",
  name: "Soil Moisture and Irrigation Alerts",
  brandName: "ConnectAtom Soil",
  modelCode: "CA-SM1",
  tier: 2,
  phase: "expand",
  availability: "in-development",
  sector: "agriculture",
  scene: "farm-field",
  device: "soil-stake",
  headline: "soil moisture charts and irrigation-needed alerts",
  tagline: "Planned: water when the soil says so, not when the clock says so.",
  summary:
    "In development: soil moisture probes with a chart per field zone and irrigation-needed alerts on WhatsApp in your language. Early access is open to growers.",
  overview: [
    "ConnectAtom Soil is in development. It is not on sale yet, and we are collecting early-access interest from orchard owners, nursery operators and farmers who irrigate on a schedule today. This page describes what the product will do and what we are still validating in real fields.",
    "The idea is to put a moisture reading in front of the person who decides when to water. A capacitive probe goes into the soil in a field zone. A solar-and-battery node reads it, together with soil temperature and rain, and sends the readings to the ConnectAtom platform. You see a moisture chart for each zone. When a zone dries below the level you set, a message goes to your WhatsApp in your local language: which zone, how dry, and how long it has been falling. A short weekly summary shows which zones needed water and which did not.",
    "We are starting with alerts and charts, not automation. Opening and closing valves from the platform is planned for later, once we understand how growers use the readings. What we are validating now is how many probes a zone really needs, how long a probe survives in wet, salty or stony soil, and whether the alert level a grower picks on day one still makes sense a month later. We are also testing seasonal plans, because a grower does not need the device in months when the field is empty.",
  ],
  problem:
    "Watering by schedule wastes water on days the soil is already wet and leaves a zone short on days it dries fast. The grower cannot see below the surface, so the choice is a guess made from habit. Under-watering costs yield. Over-watering costs pump hours and diesel, and can harm roots. In a large orchard, nobody walks every zone every day.",
  buyers: [
    "Orchard owners and plantation managers",
    "Nurseries and greenhouse growers who water by hand or by timer",
    "Farmers with drip or sprinkler zones and a pump they switch on by routine",
    "Landscaping firms that water lawns and gardens for clients",
  ],
  how: [
    {
      title: "Put the probe in the root zone",
      body: "A capacitive moisture probe goes into the soil in each field zone. Where roots go deep, a multi-depth probe can read at more than one depth. Multi-depth is an option we are still validating.",
    },
    {
      title: "The node reads soil, temperature and rain",
      body: "A solar-and-battery node reads the probe, soil temperature and a rain sensor at set intervals. It needs no mains power in the field. The reading interval is still to be decided.",
    },
    {
      title: "Readings travel by LoRa or 4G",
      body: "Readings go by LoRa or by 4G, depending on how far the field is from a gateway or a mobile signal. The device keeps readings on board if the link drops and sends them when it returns.",
    },
    {
      title: "You see the chart and get the message",
      body: "The dashboard shows moisture for each zone over the day and the week. When a zone crosses your dry mark, WhatsApp tells you in your local language. You decide whether to water.",
    },
  ],
  hardware: {
    sensors: [
      "Capacitive soil-moisture probe, multi-depth optional (starting design choice)",
      "Soil temperature sensing",
      "Rain sensing",
    ],
    connectivity: ["LoRa for fields near a gateway", "4G where there is mobile signal and no gateway"],
    power: "Solar panel with a battery in the field node, as the starting design choice. Battery capacity and days of cloud cover it can ride through are to be confirmed.",
  },
  specs: [
    { group: "Sensing", label: "Moisture probe", value: "Capacitive soil-moisture probe", status: "design-target", note: DT },
    { group: "Sensing", label: "Multi-depth probe", value: "Optional", status: "design-target", note: DT },
    { group: "Sensing", label: "Soil temperature and rain", value: "Soil temperature and rain sensing", status: "design-target", note: DT },
    { group: "Sensing", label: "Moisture accuracy and calibration by soil type", value: "To be confirmed", status: "to-confirm", note: "Capacitive probes read differently in sand, loam and clay. Not yet tested in the field." },
    { group: "Connectivity", label: "Network", value: "LoRa or 4G", status: "design-target", note: DT },
    { group: "Connectivity", label: "LoRa range and gateway needs", value: "To be confirmed", status: "to-confirm", note: "Depends on terrain and tree cover. No range is claimed." },
    { group: "Power", label: "Supply", value: "Solar panel with battery", status: "design-target", note: DT },
    { group: "Power", label: "Battery life without sun", value: "To be confirmed", status: "to-confirm" },
    { group: "Enclosure", label: "Enclosure rating of the finished node", value: "To be confirmed", status: "to-confirm", note: "Rain, dust, heat and insects are the test. Not yet verified." },
    { group: "Enclosure", label: "Probe life in the soil", value: "To be confirmed", status: "to-confirm", note: "Field durability is the hardest open question." },
    { group: "Alerts", label: "Alert channels", value: "WhatsApp, SMS, voice call, email", status: "design-target", note: PLAT },
    { group: "Alerts", label: "Alert language", value: "Local language on WhatsApp", status: "design-target", note: "Starting design choice from the product playbook. Which languages are offered is to be decided." },
    { group: "Data and reports", label: "Weekly summary and CSV export", value: "Weekly summary, CSV export", status: "design-target", note: PLAT },
  ],
  features: [
    { title: "Moisture chart per field zone", body: "Each zone gets its own line, so you can see which block dries first and how fast it dries after rain or watering." },
    { title: "Irrigation-needed alert", body: "Set a dry mark for each zone. When the moisture falls below it, you get a WhatsApp message naming the zone and the reading." },
    { title: "Local-language messages", body: "The alert is written in the language the person in the field reads, not in a technical code." },
    { title: "Rain and soil temperature in context", body: "The chart sits beside rain and soil temperature, so a rise in moisture after rain is not mistaken for watering." },
    { title: "Weekly summary", body: "A short weekly view of how each zone behaved, so you can compare it with your watering routine." },
    { title: "Seasonal plans", body: "Planned plans that follow the growing season, so a grower is not paying through months when the field is bare." },
  ],
  benefits: [
    { title: "Water on evidence", body: "You see what the soil holds before you start the pump, instead of watering because it is Tuesday." },
    { title: "Fewer wasted pump hours", body: "If a zone is still wet, the pump can stay off. That saves diesel or electricity." },
    { title: "Dry zones caught early", body: "A zone that dries faster than the rest gets noticed before the plants show stress." },
    { title: "A record of what you did", body: "The chart and the weekly summary let you compare one season with the next." },
  ],
  applications: [
    { title: "Orchards on drip lines", body: "One probe per irrigation block shows which blocks need water and which can wait." },
    { title: "Nurseries watering by timer", body: "Compare bed moisture with the timer schedule and see where the timer over- or under-waters." },
    { title: "Pilot to show water saved", body: "We plan to start with orchards and nurseries that irrigate by schedule, and compare moisture and pump hours before and after." },
    { title: "Plantations with distant blocks", body: "A manager sees remote blocks on a phone without driving out to check." },
    { title: "Landscaping contracts", body: "A firm watering lawns for clients can show a moisture record to support its schedule." },
  ],
  protocols: [
    { name: "LoRa", role: "Long-range, low-power link from field nodes to a gateway, where a gateway can be placed." },
    { name: "4G (Cat-1)", role: "Direct link from the node to the platform where mobile signal is available." },
    { name: "MQTT over TLS", role: "Carries readings and events from the gateway or node to the ConnectAtom platform." },
    { name: "HTTPS", role: "Fallback path for devices that cannot use MQTT." },
  ],
  integrations: [
    { name: "WhatsApp", note: "Irrigation-needed alerts in the local language. Plan dependent." },
    { name: "SMS", note: "Alerts by SMS where WhatsApp is not used, on higher plans." },
    { name: "Voice call", note: "Escalation call to the next contact on higher plans." },
    { name: "Email", note: "Alerts and scheduled summaries by email." },
    { name: "CSV export", note: "Download moisture history for your own sheets." },
    { name: "API and webhooks", note: "On higher plans. Valve control is planned for later and is not part of the first version." },
  ],
  tags: ["soil", "irrigation", "lora", "4g", "whatsapp", "outdoor", "battery-backup", "reports", "offline-buffering"],
  docs: [
    { title: "Soil Moisture and Irrigation Alerts datasheet", kind: "datasheet", status: "planned" },
    { title: "Probe placement and installation guide", kind: "install-guide", status: "planned" },
    { title: "Sample weekly zone summary", kind: "sample-report", status: "planned" },
  ],
  pricing: {
    hardwareFromInr: 6000,
    hardwareToInr: 12000,
    monthlyInr: 300,
    monthlyNote: "Indicative starting assumption per device per month. Seasonal plans are planned. To be confirmed with early-access customers. Not an offer.",
    showPublic: false,
  },
  alertExample:
    "Sample. Orchard block 3: soil moisture 22% and falling for 3 days (dry mark 30%). No rain in the last 4 days. Check whether to irrigate this block.",
  reportName: "Weekly soil moisture summary by field zone",
  deviceTypeKey: "soil_moisture_v1",
  watchOut: [
    "Farmers are price sensitive. The hardware price has to make sense against the water and pump hours it can save.",
    "Field durability is hard. Sun, rain, dust, insects and soil movement all act on the node and the probe.",
    "Churn is seasonal. Seasonal plans are needed so growers are not paying for months when nothing is planted.",
  ],
  faqs: [
    {
      q: "Can I order the Soil Moisture and Irrigation Alerts today?",
      a: "No. It is in development. We are collecting early-access interest so we can test it in real orchards and nurseries. Tell us your crop and your field size and we will contact you when a pilot slot opens.",
    },
    {
      q: "Will it open and close my valves?",
      a: "Not in the first version. It shows moisture and tells you when a zone is dry. Valve control is planned for later, after we have seen how growers use the readings.",
    },
    {
      q: "How many probes will I need?",
      a: "We do not know yet. It depends on how much your soil, slope and crop vary across the field. Finding a sensible number per zone is one of the things we are validating in the pilot.",
    },
    {
      q: "Will the alert come in my language?",
      a: "The plan is to send WhatsApp alerts in the local language. Which languages we offer first is still to be decided.",
    },
    {
      q: "Does the sensor work in any soil?",
      a: "Not equally well. Capacitive probes read differently in sand, loam and clay, and stones or salts can affect them. We will validate the readings on real soils and tell you the limits.",
    },
  ],
  relatedProductSlugs: ["water-tank-level-monitor", "greenhouse-climate-monitor"],
  images: { gallery: [] },
  missing: [
    "Moisture accuracy and calibration method for sand, loam and clay soils",
    "Supplier datasheet for the chosen capacitive probe",
    "Probe life in wet, salty and stony soil",
    "Solar panel size, battery capacity and days of cloud cover the node can ride through",
    "Enclosure rating of the finished node and its heat and insect resistance",
    "LoRa range on real farm terrain and the gateway arrangement",
    "Reading interval and its effect on battery life",
    "Radio approvals for the wireless device",
    "Photographs from a real orchard or nursery install",
    "Seasonal plan structure and price after early-access feedback",
    "Which local languages to support first and who checks the wording",
    "Confirmed hardware and monthly price after supplier quotes",
  ],
  updatedAt: "2026-11-24",
  publishedAt: "2026-11-24",
  status: "live",
} as Product;

export default soilMoistureMonitor;
