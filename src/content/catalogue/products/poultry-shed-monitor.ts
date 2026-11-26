import type { Product } from "@/lib/catalogue/types";

const DT = "Starting design choice from the product playbook; confirm against the supplier datasheet.";
const PLAT = "Platform capability from the product playbook; which channels you get depends on the plan.";

const poultryShedMonitor: Product = {
  num: 10,
  slug: "poultry-shed-monitor",
  name: "Poultry Shed Monitor",
  brandName: "ConnectAtom Poultry",
  modelCode: "CA-PS1",
  tier: 2,
  phase: "expand",
  availability: "in-development",
  sector: "agriculture",
  scene: "poultry-shed",
  device: "climate-node",
  headline: "heat, ammonia and power-cut alerts",
  tagline: "Planned: hear about shed heat, ammonia and power cuts before the birds feel them.",
  summary:
    "In development: nodes that watch temperature, humidity, ammonia and mains power in a poultry shed, with age-wise targets you set. Early-access interest is open.",
  overview: [
    "ConnectAtom Poultry is in development. It is not on sale yet, and we are collecting early-access interest from broiler and layer farm owners who would like to try it. This page describes what the product will do and what we are still validating inside real sheds.",
    "The idea is a few small nodes placed at bird level, spread along the shed, because the air at the roof and the air at the birds are not the same. Each node reads temperature and humidity. One unit adds an electrochemical ammonia sensor, and a mains-failure sense tells the platform when the power is gone and the fans have stopped. You see each shed on your phone. You set the temperature target for each age of the flock, and when a shed drifts from it for the time you chose, the owner and the supervisor get a message on WhatsApp.",
    "We are careful with two things. We do not put ammonia or bird-comfort numbers into the product for you. The targets are yours, set with your own vet or feed advisor, because they depend on the breed and the stage. And we are testing how long an ammonia sensor lasts in a dusty, damp shed, because we expect it to drift and corrode. A sensor replacement will be part of the plan, and we will say so up front.",
  ],
  problem:
    "Heat builds quickly in a closed shed, and ammonia builds slowly in wet litter. When the power goes, the fans stop and the shed can warm in a short time. The owner is often away and the supervisor may be asleep. Losses show up as mortality and slower growth, and by then it is too late to act.",
  buyers: [
    "Broiler farm owners",
    "Layer farm owners",
    "Farm supervisors who look after several sheds",
    "Hatcheries that want a record of room conditions",
  ],
  how: [
    {
      title: "Place nodes at bird level",
      body: "Several nodes go along the length of the shed, at the height of the birds, away from fans, cooling pads and the door. One node near the roof tells you little about what the birds feel.",
    },
    {
      title: "Add the ammonia sensor and the mains sense",
      body: "An electrochemical ammonia sensor sits in the air where the birds are, away from the wet drinker line. A mains-failure sense reports the moment the shed power drops.",
    },
    {
      title: "Set targets by age",
      body: "You set the temperature target for each age of the flock. As the flock grows, the target moves with it. The platform does not supply the numbers.",
    },
    {
      title: "Alerts reach the owner and the supervisor",
      body: "Readings go to the platform over Wi-Fi, or a 4G variant where the farm has no Wi-Fi. A drift, an ammonia alert or a power cut goes to the first contact on WhatsApp and moves to the next contact if nobody acknowledges.",
    },
  ],
  hardware: {
    sensors: [
      "Temperature and humidity nodes at bird level, several per shed (starting design choice)",
      "Electrochemical ammonia sensor",
      "Mains-failure sense",
    ],
    connectivity: ["Wi-Fi by default", "4G variant for farms without Wi-Fi", "On-device buffering when the link drops"],
    power: "Mains adapter with battery backup as the starting design choice, so the node can report a power cut. Battery hours to be confirmed.",
  },
  specs: [
    { group: "Sensing", label: "Temperature and humidity", value: "Nodes at bird level, several per shed", status: "design-target", note: DT },
    { group: "Sensing", label: "Ammonia", value: "Electrochemical ammonia sensor", status: "design-target", note: DT },
    { group: "Sensing", label: "Mains-failure sense", value: "Reports when shed power is lost", status: "design-target", note: DT },
    { group: "Sensing", label: "Accuracy of the finished unit", value: "To be confirmed", status: "to-confirm", note: "Not yet tested in a shed." },
    { group: "Sensing", label: "Ammonia sensor life", value: "Plan for replacement every 12 to 18 months", status: "design-target", note: "From the product playbook. Real life to be confirmed in a working shed." },
    { group: "Connectivity", label: "Network", value: "Wi-Fi by default, 4G variant", status: "design-target", note: DT },
    { group: "Connectivity", label: "Radio approvals", value: "To be confirmed", status: "to-confirm", note: "Check which rules apply before any sale." },
    { group: "Power", label: "Supply", value: "Mains adapter plus battery backup", status: "design-target", note: DT },
    { group: "Power", label: "Backup run time", value: "To be confirmed", status: "to-confirm" },
    { group: "Enclosure", label: "Enclosure", value: "Dust and moisture resistant enclosure", status: "design-target", note: "Starting design choice. Dust and moisture are harsh in a shed." },
    { group: "Enclosure", label: "Ingress rating of the finished unit", value: "To be confirmed", status: "to-confirm" },
    { group: "Alerts", label: "Local alarm", value: "Buzzer and LED", status: "design-target", note: DT },
    { group: "Alerts", label: "Alert channels", value: "WhatsApp, SMS, voice call, email", status: "design-target", note: PLAT },
    { group: "Data and reports", label: "Daily report and export", value: "PDF report and CSV export", status: "design-target", note: PLAT },
  ],
  features: [
    { title: "Age-wise temperature targets", body: "Set the target for each age of the flock. The platform checks each shed against the target for that day." },
    { title: "Ammonia alert", body: "When the ammonia reading rises above the level you set, the supervisor is told to check the litter and the ventilation." },
    { title: "Power-cut alert", body: "The mains sense reports the moment the shed loses power. You hear that the fans have stopped, not that birds are in trouble." },
    { title: "Shed-to-shed comparison", body: "Put two or more sheds on one view. If one shed runs warmer than its neighbours, you see it straight away." },
    { title: "Several nodes per shed", body: "Spread nodes along the shed to see hot spots, such as the far end from the fans." },
    { title: "Daily report to owner and supervisor", body: "A morning page: how long each shed was out of range, any power cut, and any ammonia alert." },
  ],
  benefits: [
    { title: "Earlier action on heat", body: "A message when a shed drifts leaves time to open curtains, start the cooling or call the electrician." },
    { title: "Power cuts do not go unnoticed", body: "The owner knows the fans are off even when away from the farm." },
    { title: "Fewer disagreements", body: "Owner and supervisor read the same numbers, so the question becomes what to do rather than who is right." },
    { title: "A record per flock", body: "The shed history helps explain a poor batch and plan the next one." },
  ],
  applications: [
    { title: "Broiler sheds", body: "Heat and power cuts are the main worries. Targets change as the flock ages, so the age-wise setting matters." },
    { title: "Layer sheds", body: "Long-running flocks and wet litter bring ammonia into focus. The shed comparison shows which house needs attention." },
    { title: "Farms with several sheds", body: "One view for all sheds, with the supervisor limited to the sheds they look after." },
    { title: "Hatcheries", body: "Rooms that need steady conditions, with an alert to the person on duty." },
    { title: "Farms with unreliable mains", body: "The mains-failure sense and the battery backup tell you when the shed is on its own." },
  ],
  protocols: [
    { name: "MQTT over TLS", role: "Carries readings and events from the node to the ConnectAtom platform." },
    { name: "Wi-Fi", role: "Default link from the node to the farm network." },
    { name: "4G (Cat-1)", role: "Optional link on farms without Wi-Fi." },
    { name: "I2C", role: "Connects temperature, humidity and ammonia sensor boards to the node inside the unit." },
  ],
  integrations: [
    { name: "WhatsApp", note: "Heat, ammonia and power-cut alerts to the first contact. Plan dependent." },
    { name: "SMS", note: "Critical alerts by SMS on higher plans." },
    { name: "Voice call", note: "Escalation call to the next contact on higher plans." },
    { name: "Email", note: "Alerts and scheduled reports by email." },
    { name: "CSV export", note: "Download shed history for your own sheets." },
    { name: "PDF reports", note: "Daily, weekly and monthly reports, depending on the plan." },
    { name: "API and webhooks", note: "On higher plans, for connecting to your own systems." },
  ],
  tags: ["temperature", "humidity", "ammonia", "mains-sensing", "multi-node", "wifi", "4g", "battery-backup", "whatsapp", "escalation", "reports"],
  docs: [
    { title: "Poultry Shed Monitor datasheet", kind: "datasheet", status: "planned" },
    { title: "Shed node placement and installation guide", kind: "install-guide", status: "planned" },
    { title: "Sample daily shed report", kind: "sample-report", status: "planned" },
  ],
  pricing: {
    hardwareFromInr: 8000,
    hardwareToInr: 15000,
    monthlyInr: 500,
    monthlyNote: "Indicative starting assumption per device per month. Ammonia sensor replacement would be charged separately. To be confirmed with early-access customers. Not an offer.",
    showPublic: false,
  },
  alertExample:
    "Sample. Shed 3: mains power lost 6 min ago and the shed is running on battery. Fans are likely off. Check the supply and the generator.",
  reportName: "Daily shed climate and power report",
  deviceTypeKey: "poultry_shed_v1",
  watchOut: [
    "Ammonia sensors drift and corrode. Plan to replace them every 12 to 18 months, and expect that to be a paid item.",
    "Dust and moisture are harsh on every part of a shed node. Enclosures and sensors will need regular checks and cleaning.",
    "The targets for temperature and ammonia are yours to set. We do not supply thresholds, and the product is not veterinary advice.",
  ],
  faqs: [
    {
      q: "Can I order the Poultry Shed Monitor today?",
      a: "No. It is in development. We are collecting early-access interest so we can test it in working sheds. Tell us how many sheds you run and we will contact you when a pilot slot opens.",
    },
    {
      q: "What ammonia level will it alert at?",
      a: "You choose it. We do not put a number into the product for you, because the right level depends on your flock and your advisor. The alert fires when the reading rises above the level you set.",
    },
    {
      q: "How long does the ammonia sensor last?",
      a: "Plan for a replacement every 12 to 18 months. These sensors drift and corrode, more so in a dusty, damp shed. We are testing real life, and the replacement will be a charged item.",
    },
    {
      q: "Will it know when the power is cut?",
      a: "Yes, that is the aim. A mains-failure sense reports the loss, and the battery backup keeps the node alive long enough to send the message. Battery hours are still to be confirmed.",
    },
    {
      q: "Does it switch my fans on?",
      a: "No. It watches and alerts only. It tells you the fans may have stopped, and you decide what to do.",
    },
  ],
  relatedProductSlugs: ["greenhouse-climate-monitor", "generator-monitor", "water-tank-level-monitor"],
  images: { gallery: [] },
  missing: [
    "Accuracy and drift of the temperature and humidity nodes in a dusty working shed",
    "Supplier datasheet for the chosen ammonia sensor",
    "Real life of the ammonia sensor in a shed, and the price of a replacement",
    "Battery capacity and backup run time for the power-cut report",
    "Enclosure ingress rating of the finished unit, and protection from dust",
    "Radio approvals for the wireless device",
    "Photographs from a real broiler or layer shed",
    "Mains-failure sense wiring and safety rules, checked by a licensed electrician",
    "Sensible node count and layout per shed size, from field trials",
    "Confirmed hardware and monthly price after supplier quotes",
  ],
  updatedAt: "2026-11-24",
  publishedAt: "2026-11-24",
  status: "live",
} as Product;

export default poultryShedMonitor;
