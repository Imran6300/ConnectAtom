// Catalogue: products. Shapes mirror the `products` collection in the blueprint, so this file can move
// into MongoDB (admin-editable) later without changing the pages. Prices are INDICATIVE starting points.

export type Faq = { q: string; a: string };
export type Product = {
  num: number;
  slug: string;
  name: string;
  brandName: string;
  modelCode: string;
  tier: 1 | 2 | 3;
  phase: "launch" | "expand" | "later";
  status: "live" | "draft";
  headline: string; // used in the title: "{name} with {headline}"
  summary: string; // 120-155 chars, meta description
  problem: string;
  buyers: string[];
  hardware: { sensors: string[]; connectivity: string[]; power: string };
  features: { title: string; body: string }[];
  hardwareFromInr: number;
  hardwareToInr: number;
  alertExample: string;
  reportName: string;
  deviceTypeKey?: string;
  relatedSlugs: string[];
  faqs: Faq[];
  updatedAt: string;
};

const UPDATED = "2026-11-22";

export const LIVE_PRODUCTS: Product[] = [
  {
    num: 1, slug: "cold-room-monitor", name: "Cold Room Monitor", brandName: "ConnectAtom Cold Room", modelCode: "CA-CR1", tier: 1, phase: "launch", status: "live",
    headline: "WhatsApp Alerts", deviceTypeKey: "cold_room_v1",
    summary: "Cold room temperature monitoring with WhatsApp alerts. Know about a warm room or an open door in minutes, not the next morning.",
    problem: "A compressor trips or a door is left open overnight, the stock spoils, and the owner finds out in the morning. A paper log taken a few times a day cannot tell you when it started or how long it lasted.",
    buyers: ["Cold storages", "Fruit and vegetable traders", "Ice-cream distributors", "Meat and fish wholesalers"],
    hardware: { sensors: ["1 or 2 external probes rated to -30°C", "Optional door sensor"], connectivity: ["Wi-Fi", "4G variant for sites where Wi-Fi does not reach"], power: "Mains adapter with battery backup, so a power cut still sends an alert" },
    features: [
      { title: "Out-of-range alerts with a delay", body: "Set a limit and a time, for example above 8°C for 10 minutes. You get one clear alert, not a message for every reading." },
      { title: "Power-cut and offline alerts", body: "If mains power is lost or the device goes quiet, you are told. Silence is also a failure." },
      { title: "Escalation", body: "If nobody acknowledges within your set time, the next person on your list is told." },
      { title: "Daily summary", body: "Minimum, maximum and average for every room, and how many alerts fired, in one short message." },
      { title: "Local buzzer", body: "An optional buzzer and LED alarm on the device, even when the network is down." },
    ],
    hardwareFromInr: 5000, hardwareToInr: 8000,
    alertExample: "Cold Room 2: 9.4°C for 10 min (limit 8°C). Door open 14 min. Check door and compressor.",
    reportName: "Daily cold room summary", relatedSlugs: ["door-open-sensor", "medical-fridge-monitor", "warehouse-climate-monitor"],
    faqs: [
      { q: "Will Wi-Fi work inside a metal cold room?", a: "Metal walls block Wi-Fi, so the gateway is mounted outside the room and only the probe cable goes in. Where Wi-Fi is still weak, we offer a 4G variant." },
      { q: "What happens during a power cut?", a: "The device runs on its battery backup and sends a power-cut alert. Batteries lose capacity in the cold, so they are kept outside the cold zone." },
      { q: "Can I mute alerts during defrost?", a: "Set the delay longer than your defrost peak, and use quiet hours for non-critical warnings. Critical alerts are never muted." },
    ],
    updatedAt: UPDATED,
  },
  {
    num: 2, slug: "medical-fridge-monitor", name: "Medical Fridge Monitor", brandName: "ConnectAtom Med Fridge", modelCode: "CA-MF1", tier: 1, phase: "launch", status: "live",
    headline: "Temperature Logs and Alerts", deviceTypeKey: "medical_fridge_v1",
    summary: "Medical fridge temperature monitoring for pharmacies, clinics and labs. Continuous 2-8°C logs, instant alerts and reports you can show an auditor.",
    problem: "Medicines and vaccines must stay within 2 to 8°C, and auditors and insurers ask for a continuous temperature record. A twice-a-day paper entry cannot show what happened in between.",
    buyers: ["Pharmacies", "Clinics", "Diagnostic labs", "Blood banks", "Hospital wards"],
    hardware: { sensors: ["Precision probe (about ±0.1°C class) in a glycol or thermal-buffer bottle", "Calibration certificate with each probe"], connectivity: ["Wi-Fi", "4G variant"], power: "Mains adapter with battery backup" },
    features: [
      { title: "2 to 8°C presets", body: "Start from a 2 to 8°C rule and change it for your own stock." },
      { title: "Excursion log", body: "Every time the temperature leaves the range, the start, end, duration and peak are recorded." },
      { title: "Acknowledge with a reason", body: "Staff acknowledge an alert and note why, for example 'stock being restocked'. Who and when are saved." },
      { title: "Reports with timestamps", body: "Daily, weekly and monthly reports, with your probe's calibration details attached." },
      { title: "Buffered probe", body: "The probe sits in a buffer bottle so a door opening does not cause a false alarm." },
    ],
    hardwareFromInr: 5000, hardwareToInr: 9000,
    alertExample: "Pharmacy Fridge: 8.6°C for 5 min (limit 8°C). Check the door seal and keep stock in the fridge.",
    reportName: "Fridge temperature report", relatedSlugs: ["cold-room-monitor", "door-open-sensor", "warehouse-climate-monitor"],
    faqs: [
      { q: "Is this certified or compliant?", a: "We provide continuous, timestamped logs. We do not claim certification. Check the exact standard your auditor or insurer expects, and we will help match the report format." },
      { q: "How long is data kept?", a: "90 days on Starter, 1 year on Pro and 3 years on Business." },
      { q: "Do probes come with calibration certificates?", a: "Medical-fridge kits use probes that come with calibration certificates. Yearly recalibration is available as a service." },
    ],
    updatedAt: UPDATED,
  },
  {
    num: 3, slug: "kitchen-freezer-monitor", name: "Kitchen Freezer Monitor", brandName: "ConnectAtom Kitchen", modelCode: "CA-KT1", tier: 1, phase: "launch", status: "live",
    headline: "Automatic Food-Safety Logs", deviceTypeKey: "kitchen_freezer_v1",
    summary: "Walk-in freezer and chiller monitoring for restaurants and cloud kitchens. Automatic temperature logs, shift summaries and alerts to your phone.",
    problem: "Clipboard logs get skipped or filled in later, and one failed freezer can ruin thousands of rupees of stock overnight.",
    buyers: ["Restaurants", "Cloud kitchens", "Bakeries", "Caterers", "Hotel kitchens"],
    hardware: { sensors: ["1 or 2 probes rated for freezer use", "Optional second probe for hot-hold or bain-marie"], connectivity: ["Wi-Fi", "4G variant"], power: "Mains adapter with battery backup, in a sealed IP65 box" },
    features: [
      { title: "Automatic logs", body: "A reading is logged every 15 to 30 minutes, with no one filling in a sheet." },
      { title: "Shift summary", body: "A short summary at the end of each shift for the kitchen manager and owner." },
      { title: "Phone first", body: "The dashboard is built for a phone, because that is what a kitchen has." },
      { title: "Many outlets", body: "Chains see every outlet on one dashboard." },
    ],
    hardwareFromInr: 4000, hardwareToInr: 7000,
    alertExample: "Walk-in Freezer: -9.0°C for 20 min (limit -15°C). Check the door and the compressor.",
    reportName: "Shift temperature summary", relatedSlugs: ["cold-room-monitor", "door-open-sensor", "water-leak-detector"],
    faqs: [
      { q: "Kitchens are hot and greasy. Will it last?", a: "The gateway sits in an IP65 sealed box with strain-relieved cable glands, and only the probe goes into the freezer." },
      { q: "Can I see all my outlets together?", a: "Yes. Each outlet is a site, and the overview shows every device across all of them." },
    ],
    updatedAt: UPDATED,
  },
  {
    num: 4, slug: "warehouse-climate-monitor", name: "Warehouse Climate Monitor", brandName: "ConnectAtom Godown", modelCode: "CA-GD1", tier: 1, phase: "launch", status: "live",
    headline: "Temperature and Humidity Alerts", deviceTypeKey: "godown_v1",
    summary: "Godown and warehouse temperature and humidity monitoring. Find the hot corner, get alerts when conditions drift and see weekly trends.",
    problem: "Heat and humidity damage stock slowly and silently, and nobody knows which corner of the godown is the problem.",
    buyers: ["Pharma distributors", "FMCG and food warehouses", "Textile and paper stores", "Seed and spice storage"],
    hardware: { sensors: ["Several temperature and humidity nodes per godown"], connectivity: ["Wi-Fi", "LoRa node-to-gateway link for large sites"], power: "Mains or battery nodes" },
    features: [
      { title: "Zone view", body: "See node positions on a floor plan and spot the hot or damp corner." },
      { title: "Humidity and dew-point rules", body: "Alert when humidity stays above your limit for the time you set." },
      { title: "Weekly trend report", body: "A weekly report and a nightly summary of every node." },
      { title: "7-day survey", body: "Start with a 7-day survey using 4 nodes, then decide where to put permanent ones." },
    ],
    hardwareFromInr: 5000, hardwareToInr: 8000,
    alertExample: "Godown B, north wall: 37.2°C for 30 min (limit 35°C). Check ventilation near the roof.",
    reportName: "Weekly godown climate report", relatedSlugs: ["medical-fridge-monitor", "server-room-monitor", "door-open-sensor"],
    faqs: [
      { q: "How many nodes does a godown need?", a: "It depends on size and layout. The 7-day survey with 4 nodes shows where conditions differ, and pricing is per node." },
      { q: "Do humidity sensors drift?", a: "Humidity sensors can drift in condensing conditions. We plan replacement as part of the maintenance plan." },
    ],
    updatedAt: UPDATED,
  },
  {
    num: 5, slug: "server-room-monitor", name: "Server Room Monitor", brandName: "ConnectAtom Server Room", modelCode: "CA-SR1", tier: 1, phase: "launch", status: "live",
    headline: "Power-Cut and Heat Alerts", deviceTypeKey: "server_room_v1",
    summary: "Server room and data closet monitoring for offices, ISPs and schools. Heat, power-cut and leak alerts, with a 4G fallback when the network is down.",
    problem: "An AC failure or a power cut overheats equipment overnight or over the weekend, and nobody knows until Monday.",
    buyers: ["Small offices", "ISPs", "Schools", "Branch offices", "CCTV and NVR rooms"],
    hardware: { sensors: ["Temperature and humidity sensor", "Leak-rope input", "Mains-presence sense"], connectivity: ["Wi-Fi", "Optional 4G fallback"], power: "Mains adapter with battery backup" },
    features: [
      { title: "Heat and power-cut rules", body: "Know when the AC fails or the mains goes, even if you are away." },
      { title: "4G fallback", body: "If the office network is down, a Wi-Fi alert never leaves the building. The 4G fallback does." },
      { title: "Simple status page", body: "One page that shows if the room is normal." },
    ],
    hardwareFromInr: 5000, hardwareToInr: 10000,
    alertExample: "Server Room: 33.1°C for 10 min (limit 30°C). Check the AC and the power supply.",
    reportName: "Server room daily summary", relatedSlugs: ["water-leak-detector", "door-open-sensor", "warehouse-climate-monitor"],
    faqs: [
      { q: "What if our internet goes down?", a: "That is exactly when you need the 4G fallback variant. The device alerts you over mobile data." },
      { q: "Can installers resell it?", a: "Yes. CCTV and network installers can earn a share. See the partners page." },
    ],
    updatedAt: UPDATED,
  },
  {
    num: 6, slug: "door-open-sensor", name: "Door Open Sensor", brandName: "ConnectAtom Door Sensor", modelCode: "CA-DR1", tier: 1, phase: "launch", status: "live",
    headline: "Door-Open Alerts", summary: "Door open sensor add-on for cold rooms and fridges. See how long doors stay open and what it does to temperature.",
    problem: "A door left open is the most common cause of a temperature excursion, and a temperature alarm alone arrives late.",
    buyers: ["Cold rooms", "Walk-in freezers", "Pharmacies", "Warehouses"],
    hardware: { sensors: ["Magnetic reed switch wired to the main device, or a wireless version"], connectivity: ["Through the main device"], power: "Powered by the main device (wired) or battery (wireless)" },
    features: [
      { title: "Door-open duration", body: "An alert when a door stays open longer than you allow." },
      { title: "Door events on the chart", body: "See exactly when the door opened on the temperature graph." },
      { title: "Open-by-hour report", body: "How many times and how long, by hour, so you can fix the habit." },
    ],
    hardwareFromInr: 2000, hardwareToInr: 3000,
    alertExample: "Cold Room 2: door open 14 min. Close the door.",
    reportName: "Door-open by hour", relatedSlugs: ["cold-room-monitor", "medical-fridge-monitor", "kitchen-freezer-monitor"],
    faqs: [
      { q: "Is it a separate subscription?", a: "No. It is an add-on included in the plan of the device it connects to." },
      { q: "Wired or wireless?", a: "Wired is more reliable. Wireless versions need battery changes, so we recommend wired wherever the cable can reach." },
    ],
    updatedAt: UPDATED,
  },
  {
    num: 7, slug: "water-leak-detector", name: "Water Leak Detector", brandName: "ConnectAtom Leak", modelCode: "CA-LK1", tier: 1, phase: "launch", status: "live",
    headline: "Instant Leak Alerts", deviceTypeKey: "water_leak_v1",
    summary: "Water leak detector for basements, server rooms, labs and cold-room drain lines. Get an instant alert, and a message when it is dry again.",
    problem: "A slow leak is found only after the damage is done.",
    buyers: ["Basements", "Hostels", "Server rooms", "Labs", "Cold-room drain lines", "Hospitals"],
    hardware: { sensors: ["Leak rope or leak probe"], connectivity: ["Wi-Fi"], power: "Mains or battery" },
    features: [
      { title: "Instant alert", body: "A message the moment water is detected." },
      { title: "Location label", body: "Each detector has a name, so you know which spot is wet." },
      { title: "Dry again", body: "A clear message when the leak has cleared." },
    ],
    hardwareFromInr: 2000, hardwareToInr: 4000,
    alertExample: "Basement pump room: water detected. Check the floor and the drain line.",
    reportName: "Leak event log", relatedSlugs: ["server-room-monitor", "cold-room-monitor", "door-open-sensor"],
    faqs: [
      { q: "Can I buy just a leak detector?", a: "Yes, but it works best bundled with a server room or cold room monitor, as a low-cost add-on." },
      { q: "Mains or battery?", a: "Either. Battery units send a low-battery alert before they stop." },
    ],
    updatedAt: UPDATED,
  },
  {
    num: 8, slug: "dairy-chilling-monitor", name: "Dairy Chilling Monitor", brandName: "ConnectAtom Dairy", modelCode: "CA-DY1", tier: 1, phase: "launch", status: "live",
    headline: "Cooling-Curve Alerts",
    summary: "Milk chilling centre monitoring for dairies and cooperatives. Track how fast milk cools, log each batch and get alerts when cooling is too slow.",
    problem: "Milk must be cooled to a target temperature within a set time. Slow cooling causes rejection or spoilage.",
    buyers: ["Dairy collection centres", "Bulk milk cooler centres", "Sweet shops", "Ice-cream makers"],
    hardware: { sensors: ["Food-grade stainless probe in the bulk cooler", "Ambient probe", "Optional compressor-run input"], connectivity: ["Wi-Fi", "4G variant"], power: "Mains adapter with battery backup" },
    features: [
      { title: "Cooling curve", body: "A chart of time to reach the target temperature, for every batch." },
      { title: "Batch log", body: "A record of each batch, with start, end and temperature." },
      { title: "Slow-cooling alert", body: "An alert when cooling is taking longer than it should." },
      { title: "Shift report", body: "A report for each shift." },
    ],
    hardwareFromInr: 5000, hardwareToInr: 8000,
    alertExample: "Bulk Cooler 1: 12.0°C after 90 min (target 4°C). Check the compressor and the agitator.",
    reportName: "Shift chilling report", relatedSlugs: ["cold-room-monitor", "door-open-sensor", "medical-fridge-monitor"],
    faqs: [
      { q: "Are the probes food-grade?", a: "Yes. Dairy kits use food-grade, washdown-resistant stainless probes." },
      { q: "Who is it for?", a: "Chilling-centre managers and cooperative secretaries, where one person is responsible for every batch." },
    ],
    updatedAt: UPDATED,
  },
];

// Products 9-20: not on sale yet. They have NO pages until they can be piloted (a "coming soon" page is thin content).
// They appear only as a short roadmap list that links to the quote form.
export type RoadmapItem = { num: number; slug: string; name: string; phase: "expand" | "later"; tier: 2 | 3 };
export const ROADMAP: RoadmapItem[] = [
  { num: 9, slug: "greenhouse-climate-monitor", name: "Greenhouse, Mushroom and Hatchery Climate Monitor", phase: "expand", tier: 2 },
  { num: 10, slug: "poultry-shed-monitor", name: "Poultry Shed Monitor", phase: "expand", tier: 2 },
  { num: 11, slug: "water-tank-level-monitor", name: "Water Tank Level and Pump Alert", phase: "expand", tier: 2 },
  { num: 12, slug: "generator-monitor", name: "Diesel Generator Monitor", phase: "expand", tier: 2 },
  { num: 13, slug: "air-quality-monitor", name: "Air Quality Monitor", phase: "expand", tier: 2 },
  { num: 14, slug: "soil-moisture-monitor", name: "Soil Moisture and Irrigation Alerts", phase: "expand", tier: 2 },
  { num: 15, slug: "machine-downtime-tracker", name: "Production Counter and Downtime Tracker", phase: "expand", tier: 2 },
  { num: 16, slug: "vibration-monitor", name: "Motor and Pump Vibration Monitor", phase: "later", tier: 3 },
  { num: 17, slug: "energy-monitor", name: "Power and Energy Monitor", phase: "later", tier: 3 },
  { num: 18, slug: "compressor-monitor", name: "Compressor Runtime and Pressure Monitor", phase: "later", tier: 3 },
  { num: 19, slug: "reefer-truck-tracker", name: "Reefer Truck Tracker", phase: "later", tier: 3 },
  { num: 20, slug: "aquaculture-water-monitor", name: "Aquaculture Water Monitor", phase: "later", tier: 3 },
];

export const HERO_SLUGS = ["cold-room-monitor", "medical-fridge-monitor", "kitchen-freezer-monitor", "warehouse-climate-monitor"];
export const productBySlug = (slug: string) => LIVE_PRODUCTS.find((p) => p.slug === slug);
export const productByNum = (n: number) => LIVE_PRODUCTS.find((p) => p.num === n);
export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
