import type { Product } from "@/lib/catalogue/types";

const DT = "Starting design choice from the product playbook; confirm against the supplier datasheet.";
const PLAT = "Platform capability from the product playbook; which channels you get depends on the plan.";

const airQualityMonitor: Product = {
  num: 13,
  slug: "air-quality-monitor",
  name: "Air Quality Monitor",
  brandName: "ConnectAtom Air",
  modelCode: "CA-AQ1",
  tier: 2,
  phase: "expand",
  availability: "in-development",
  sector: "facilities",
  scene: "building",
  device: "air-quality",
  headline: "PM2.5, PM10 and CO2 readings with ventilate alerts",
  tagline: "Planned: see PM2.5, PM10 and CO2 in your rooms and know when to open a window.",
  summary:
    "In development: a wall monitor for particles, CO2, temperature and humidity with ventilate-now alerts, for clinics, schools and offices. Early-access interest is open.",
  overview: [
    "ConnectAtom Air is in development. It is not on sale yet, and we are collecting early-access interest from clinics, schools, offices, gyms and co-working spaces who would like to try it. This page describes what the product will do and what we are still validating.",
    "The idea is a small wall-mounted unit that measures fine and coarse dust particles (PM2.5 and PM10), CO2, temperature and humidity. CO2 is read with an NDIR sensor, which works by light absorption. The unit sends readings to the ConnectAtom platform. You see the room on your phone. When CO2 stays high for the time you chose, the person who looks after the room gets a ventilate-now message on WhatsApp. An optional display on the unit shows the current reading in the room itself, and a lobby page, reachable by a QR code, can show the same to visitors.",
    "We want to be plain about what this product is. Readings are indicative unless the unit has been calibrated against a reference, and we have not done that yet. We do not say what is safe or unsafe, and we do not make health claims. The alert limits are yours to choose. The product helps you notice when a room feels stuffy or dusty, and gives you a record to act on. Cheap consumer monitors compete hard on price, so our value has to come from alerts, records and support, not from the sensor alone.",
  ],
  problem:
    "Nobody can see CO2 or fine dust. A closed classroom, a waiting room or a meeting room fills with breath and grows stale over a morning, and a dusty street or construction nearby adds particles. People get tired or uneasy, but there is no number to point to, so the window stays shut and the question stays open.",
  buyers: [
    "Clinic and diagnostic lab owners",
    "School and college administrators",
    "Office and co-working space managers",
    "Gym and hotel operators",
  ],
  how: [
    {
      title: "Mount it on the wall",
      body: "The unit goes on a wall at about breathing height, away from windows, vents, doors and the air-conditioner outlet. Direct airflow gives a reading that does not match the room.",
    },
    {
      title: "Read particles, CO2, temperature and humidity",
      body: "A particle sensor counts PM2.5 and PM10, an NDIR sensor reads CO2, and a temperature and humidity sensor adds comfort. The sensor choices are starting design choices we are validating.",
    },
    {
      title: "Readings reach the platform",
      body: "The unit sends readings over Wi-Fi to the ConnectAtom platform, and keeps them on the device if the link drops. You see live values and the day's chart on your phone.",
    },
    {
      title: "Get the ventilate-now alert and show the room",
      body: "You choose the CO2 level and the time that triggers a ventilate-now message. A daily summary shows how the room did. An optional display and a QR lobby page can show the current reading to people in the room.",
    },
  ],
  hardware: {
    sensors: [
      "PM2.5 and PM10 particle sensor (starting design choice)",
      "NDIR CO2 sensor",
      "Temperature and humidity sensor",
      "Optional display",
    ],
    connectivity: ["Wi-Fi by default", "On-device buffering when the link drops"],
    power: "Wall adapter as the starting design choice. A battery backup is not planned for the first version. To be confirmed.",
  },
  specs: [
    { group: "Sensing", label: "Particles", value: "PM2.5 and PM10 sensor", status: "design-target", note: DT },
    { group: "Sensing", label: "CO2", value: "NDIR CO2 sensor", status: "design-target", note: DT },
    { group: "Sensing", label: "Temperature and humidity", value: "Combined sensor", status: "design-target", note: DT },
    { group: "Sensing", label: "Reading accuracy", value: "To be confirmed", status: "to-confirm", note: "Readings are indicative unless the unit is calibrated against a reference." },
    { group: "Sensing", label: "Particle sensor life and cleaning interval", value: "To be confirmed", status: "to-confirm", note: "Particle sensors need cleaning and replacement." },
    { group: "Connectivity", label: "Network", value: "Wi-Fi", status: "design-target", note: DT },
    { group: "Connectivity", label: "Radio approvals", value: "To be confirmed", status: "to-confirm", note: "Check which rules apply before any sale." },
    { group: "Power", label: "Supply", value: "Wall adapter", status: "design-target", note: DT },
    { group: "Enclosure", label: "Mounting", value: "Wall mount with airflow vents", status: "design-target", note: "Starting design choice from the product playbook." },
    { group: "Display", label: "Display", value: "Optional on-unit display", status: "design-target", note: DT },
    { group: "Display", label: "Lobby page", value: "Reachable by QR code", status: "design-target", note: "Platform capability planned in the product playbook." },
    { group: "Alerts", label: "Alert channels", value: "WhatsApp, SMS, voice call, email", status: "design-target", note: PLAT },
    { group: "Data and reports", label: "Daily summary and export", value: "PDF summary and CSV export", status: "design-target", note: PLAT },
  ],
  features: [
    { title: "Live air-quality and CO2 view", body: "See particles, CO2, temperature and humidity for each room on your phone, with a chart for the day." },
    { title: "Ventilate-now alerts", body: "When CO2 stays above the level you set for the time you chose, the person responsible gets a message to open a window or switch on ventilation." },
    { title: "Daily summary", body: "A morning page showing how each room did through the day, and when it was at its worst." },
    { title: "Lobby display page by QR code", body: "Put a QR code in the lobby or on the classroom door. Visitors scan it and see the current reading for that room." },
    { title: "Optional on-unit display", body: "A small screen on the unit shows the room reading to people in the room, without opening a phone." },
    { title: "Room comparison", body: "Put several rooms on one view to see which ones fill up fastest, and when." },
  ],
  benefits: [
    { title: "A number instead of an argument", body: "A reading settles whether a room is stuffy, and shows when it started." },
    { title: "Ventilation at the right time", body: "A message at the right moment is better than a window kept open all day." },
    { title: "Visible care", body: "A lobby page shows visitors and parents that you watch your rooms." },
    { title: "A history to act on", body: "Daily records show which rooms and which hours need attention, so you can change timetables or layouts." },
  ],
  applications: [
    { title: "Clinic waiting rooms and consulting rooms", body: "Small rooms that fill during peak hours. The lobby page shows patients that the room is watched." },
    { title: "Classrooms and school halls", body: "CO2 climbs with the number of students. A ventilate-now message reaches the class teacher or the admin office." },
    { title: "Offices and meeting rooms", body: "A meeting room that feels stale by the second hour gets an alert while the meeting is still on." },
    { title: "Gyms and co-working spaces", body: "Many people in one room. See which hours need more fresh air." },
    { title: "Hotel and hospital common areas", body: "Lobbies, wards and banquet halls where air quality is part of how guests judge the place." },
  ],
  protocols: [
    { name: "MQTT over TLS", role: "Carries readings and events from the unit to the ConnectAtom platform." },
    { name: "Wi-Fi", role: "Default link from the unit to the building network." },
    { name: "HTTPS", role: "Serves the QR lobby page and carries fallback device traffic." },
    { name: "I2C and UART", role: "Connect the particle, CO2 and climate sensors to the controller inside the unit." },
  ],
  integrations: [
    { name: "WhatsApp", note: "Ventilate-now alerts to the person responsible. Plan dependent." },
    { name: "SMS", note: "Critical alerts by SMS on higher plans." },
    { name: "Voice call", note: "Escalation call to the next contact on higher plans." },
    { name: "Email", note: "Alerts and daily summaries by email." },
    { name: "CSV export", note: "Download room history for your own sheets." },
    { name: "PDF reports", note: "Daily, weekly and monthly reports, depending on the plan." },
    { name: "API and webhooks", note: "On higher plans, for connecting to your own systems." },
  ],
  tags: ["air-quality", "co2", "temperature", "humidity", "wifi", "calibration", "whatsapp", "reports"],
  docs: [
    { title: "Air Quality Monitor datasheet", kind: "datasheet", status: "planned" },
    { title: "Wall mounting and placement guide", kind: "install-guide", status: "planned" },
    { title: "Sample daily air quality summary", kind: "sample-report", status: "planned" },
  ],
  pricing: {
    hardwareFromInr: 6000,
    hardwareToInr: 12000,
    monthlyInr: 250,
    monthlyNote: "Indicative starting assumption per device per month. To be confirmed with early-access customers. Not an offer.",
    showPublic: false,
  },
  alertExample:
    "Sample. Classroom 4: CO2 has been above your ventilate-now level for 20 min. Open the windows or switch on the fan. Readings are indicative.",
  reportName: "Daily air quality and CO2 summary",
  deviceTypeKey: "air_quality_v1",
  watchOut: [
    "Particle sensors need cleaning and replacement. Dust and moisture shorten their life.",
    "Describe readings as indicative unless the unit has been calibrated against a reference.",
    "We make no health claims and set no safe limits. The alert levels are yours to choose.",
  ],
  faqs: [
    {
      q: "Can I order the Air Quality Monitor today?",
      a: "No. It is in development. We are collecting early-access interest from clinics, schools and offices. Tell us about your rooms and we will contact you when a pilot slot opens.",
    },
    {
      q: "Are the readings exact?",
      a: "No. They are indicative unless the unit has been calibrated against a reference, and we have not done that yet. Use them to compare rooms and see trends, not as a measurement for legal purposes.",
    },
    {
      q: "What counts as safe air?",
      a: "We do not say. We make no health claims and set no limits. You choose the CO2 level that triggers a ventilate-now message. If rules apply to your premises, check which rules apply to you.",
    },
    {
      q: "Does the particle sensor need care?",
      a: "Yes. Particle sensors collect dust and wear out, so they need cleaning and eventual replacement. We are testing how often, and will tell you before you buy.",
    },
    {
      q: "How do visitors see the reading?",
      a: "An optional display on the unit shows the room reading. You can also place a QR code in the lobby that opens a page with the current values for that room.",
    },
  ],
  relatedProductSlugs: ["greenhouse-climate-monitor", "server-room-monitor", "warehouse-climate-monitor"],
  images: { gallery: [] },
  missing: [
    "Accuracy of the PM2.5, PM10 and CO2 readings, and the calibration method against a reference",
    "Supplier datasheets for the particle, NDIR CO2 and climate sensors",
    "Cleaning interval and replacement life of the particle sensor, and its replacement price",
    "Display model and screen size for the optional display",
    "Whether a battery backup is offered",
    "Radio approvals for the wireless device",
    "Photographs from a real clinic or classroom installation",
    "Which rules apply to air quality claims or displays in public premises",
    "Wording and design review of the QR lobby page",
    "Confirmed hardware and monthly price after supplier quotes",
  ],
  updatedAt: "2026-11-24",
  publishedAt: "2026-11-24",
  status: "live",
} as Product;

export default airQualityMonitor;
