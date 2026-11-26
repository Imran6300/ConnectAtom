import type { Product } from "@/lib/catalogue/types";

const DT = "Starting design choice from the product playbook; confirm against the supplier datasheet.";
const PLAT = "Platform capability from the product playbook; which channels you get depends on the plan.";

const aquacultureWaterMonitor: Product = {
  num: 20,
  slug: "aquaculture-water-monitor",
  name: "Aquaculture Water Monitor",
  brandName: "ConnectAtom Aqua",
  modelCode: "CA-AW1",
  tier: 3,
  phase: "later",
  availability: "in-development",
  sector: "agriculture",
  scene: "pond",
  device: "water-probe",
  headline: "dissolved oxygen, pH and temperature alerts",
  tagline: "Planned: hear about low oxygen in the pond before the fish do.",
  summary:
    "In development: a solar pond monitor for dissolved oxygen, pH and temperature with night-time low-oxygen alerts. Early-access interest is open from fish and shrimp farms.",
  overview: [
    "ConnectAtom Aqua is in development. It is not on sale yet, and we are collecting early-access interest from fish and shrimp farms, hatcheries and ornamental fish farms. This page describes what the product will do and what we are still validating. It is the hardest field problem on our list, so it comes last, and we expect to start with a very small number of ponds.",
    "In a pond, plants and algae make oxygen in daylight and use it at night, along with the fish, the shrimp and everything decaying on the bottom. So the oxygen level is usually lowest in the hours before dawn, when the farmer is asleep. When it falls too far, stock can be lost within hours. The idea is a pole-mounted unit at the pond with dissolved-oxygen, pH and temperature probes, powered by a solar panel and a battery, sending readings over 4G. A low-oxygen reading at night goes straight to the farmer and the next person on the list.",
    "The probes are the difficult part. They sit in the water, they foul with slime and algae, and they drift. Good probes are costly. What we are validating is how often they need cleaning and calibration in a working pond, how the solar and battery setup copes in the monsoon, and what alert thresholds make sense for different species. That last question is not ours to answer alone. A domain expert has to validate the thresholds before any farmer relies on them.",
  ],
  problem:
    "Low dissolved oxygen at night can wipe out a pond within hours. A farmer who checks the water by hand in the evening and the morning cannot see what happens in between. By the time the fish are gasping at the surface, the loss has already begun.",
  buyers: [
    "Fish and shrimp farms",
    "Hatcheries",
    "Ornamental fish farms",
    "Farm managers who look after many ponds",
  ],
  how: [
    {
      title: "Mount the unit at the pond",
      body: "A pole-mounted enclosure stands at the pond edge. The dissolved-oxygen, pH and temperature probes hang in the water at a depth we are still validating. A solar panel and a battery power the unit.",
    },
    {
      title: "Readings go over 4G",
      body: "The unit sends its readings over a 4G link to the ConnectAtom platform. Farms are often outside good coverage, so we are checking how the unit behaves where the signal is weak.",
    },
    {
      title: "Trends build up on the dashboard",
      body: "The dashboard shows oxygen, pH and temperature through the day and the night. You can put two ponds side by side and see which one is behaving differently.",
    },
    {
      title: "Night-time alerts reach a person",
      body: "A critical low-oxygen reading at night goes to the first contact on WhatsApp, and moves to the next contact if nobody acknowledges. If an aerator signal is wired in, the platform also shows whether the aerator is running.",
    },
  ],
  hardware: {
    sensors: [
      "Dissolved-oxygen probe (starting design choice)",
      "pH probe (starting design choice)",
      "Temperature probe (starting design choice)",
    ],
    connectivity: ["4G"],
    power: "Solar panel with a battery as the starting design choice. Panel size, battery capacity and run time without sun are to be confirmed.",
  },
  specs: [
    { group: "Sensing", label: "Dissolved-oxygen probe", value: "Probe in the pond water", status: "design-target", note: DT },
    { group: "Sensing", label: "pH probe", value: "Probe in the pond water", status: "design-target", note: DT },
    { group: "Sensing", label: "Temperature probe", value: "Probe in the pond water", status: "design-target", note: DT },
    { group: "Sensing", label: "Probe type, range and accuracy", value: "To be confirmed", status: "to-confirm", note: "Depends on the supplier. Not yet tested on a finished unit." },
    { group: "Sensing", label: "Cleaning and calibration interval", value: "To be confirmed", status: "to-confirm", note: "Probes foul and drift. The interval must come from field trials." },
    { group: "Connectivity", label: "Network", value: "4G", status: "design-target", note: DT },
    { group: "Connectivity", label: "Radio approvals", value: "To be confirmed", status: "to-confirm", note: "Check which rules apply before any sale." },
    { group: "Power", label: "Power", value: "Solar panel and battery", status: "design-target", note: DT },
    { group: "Power", label: "Battery run time without sun", value: "To be confirmed", status: "to-confirm" },
    { group: "Enclosure", label: "Mounting", value: "Pole-mounted enclosure", status: "design-target", note: DT },
    { group: "Enclosure", label: "Ingress rating and corrosion resistance", value: "To be confirmed", status: "to-confirm", note: "Humidity, rain and salt water exposure need to be considered." },
    { group: "Alerts", label: "Alert channels", value: "WhatsApp, SMS, voice call, email", status: "design-target", note: PLAT },
    { group: "Data and reports", label: "Reports and export", value: "PDF reports and CSV export", status: "design-target", note: PLAT },
  ],
  features: [
    { title: "Dissolved-oxygen, pH and temperature trends", body: "Three traces through the day and night, so you can see the daily rhythm of each pond and spot the day it changes." },
    { title: "Critical night-time low-oxygen alert", body: "When oxygen falls below the limit you set, the message goes out at once, and moves to the next contact if nobody acknowledges." },
    { title: "Aerator on and off monitoring", body: "With an aerator signal wired in, you see when the aerator ran and are told if it is off while oxygen is low." },
    { title: "Pond comparison", body: "Put two or more ponds on one screen to see which is drifting from the others." },
    { title: "Offline and power-cut alerts", body: "If the unit stops reporting, for a flat battery or a lost signal, you are told, so silence is not mistaken for good news." },
    { title: "Daily summary report", body: "A daily PDF of the three readings, and CSV export for your own records." },
  ],
  benefits: [
    { title: "Hear about low oxygen while there is time", body: "A night alert gives the farmer time to start an aerator or act before the stock is stressed." },
    { title: "Know the pattern of each pond", body: "A few weeks of trend shows how each pond behaves, so the farmer knows what is normal for it." },
    { title: "Check the aerator is doing its job", body: "Aerator on and off history shows whether it ran when it was needed." },
    { title: "Fewer unplanned night rounds", body: "A farm manager can rely on alerts, instead of walking the ponds in the dark to check by hand." },
  ],
  applications: [
    { title: "Shrimp ponds", body: "Intensive ponds where aerators run through the night and the oxygen needs a steady watch." },
    { title: "Fish grow-out ponds", body: "Larger ponds where a single sensor point at the edge is placed after advice on depth and position." },
    { title: "Hatcheries", body: "Water for young stock needs a close watch, with thresholds set by the hatchery's own expert." },
    { title: "Ornamental fish farms", body: "Smaller tanks and ponds where a lost batch is a large loss." },
    { title: "Farms with many ponds", body: "A manager compares ponds on one screen and goes first to the one that is different." },
  ],
  protocols: [
    { name: "MQTT over TLS", role: "Carries readings and events from the unit to the ConnectAtom platform." },
    { name: "4G (Cat-1)", role: "Mobile data link from the pond." },
    { name: "HTTPS", role: "Fallback path for devices that cannot use MQTT." },
  ],
  integrations: [
    { name: "WhatsApp", note: "Low-oxygen and aerator alerts to the first contact. Plan dependent." },
    { name: "SMS", note: "Critical alerts by SMS on higher plans." },
    { name: "Voice call", note: "Escalation call to the next contact on higher plans, useful at night." },
    { name: "Email", note: "Alerts and scheduled reports by email." },
    { name: "CSV export", note: "Download pond history for your own sheets." },
    { name: "PDF reports", note: "Daily, weekly and monthly reports, depending on the plan." },
    { name: "API and webhooks", note: "On higher plans, for connecting to your own systems." },
  ],
  tags: ["dissolved-oxygen", "water-quality", "temperature", "4g", "outdoor", "battery-backup", "escalation", "whatsapp", "reports"],
  docs: [
    { title: "Aquaculture Water Monitor datasheet", kind: "datasheet", status: "planned" },
    { title: "Pond mounting and installation guide", kind: "install-guide", status: "planned" },
    { title: "Probe cleaning and calibration guide", kind: "calibration", status: "planned" },
  ],
  pricing: {
    hardwareFromInr: 12000,
    hardwareToInr: 25000,
    monthlyInr: 800,
    monthlyNote: "Indicative starting assumption per device per month. To be confirmed with early-access customers. Not an offer.",
    showPublic: false,
  },
  alertExample:
    "Sample. Pond 3: dissolved oxygen is low and has been falling since 01:40. Aerator 1 reports off. Check the aerator and the pond now.",
  reportName: "Daily pond dissolved-oxygen, pH and temperature summary",
  deviceTypeKey: "aqua_v1",
  watchOut: [
    "Probes foul and drift. They need regular cleaning and calibration, and a reading from a dirty probe can mislead.",
    "Good probes are costly. This is the main driver of the hardware price.",
    "Alert thresholds must be validated by a domain expert. We do not set them for you, and no number on this page should be read as safe or unsafe.",
  ],
  faqs: [
    {
      q: "Can I order the Aquaculture Water Monitor today?",
      a: "No. It is in development, and it is the last product on our list. We are collecting early-access interest so we can test it in working ponds. Tell us about your farm and we will contact you if a pilot suits.",
    },
    {
      q: "What oxygen level will it alert at?",
      a: "That is for you and a qualified aquaculture adviser to set. It differs by species, stocking and pond. We do not publish a figure, and we will not set thresholds without expert validation.",
    },
    {
      q: "How often do the probes need cleaning?",
      a: "We do not know yet. Probes foul with slime and algae and drift over time, and the interval must come from field trials. Plan on regular cleaning and calibration.",
    },
    {
      q: "What if there is no sun for several days?",
      a: "The battery is meant to carry the unit through the night and cloudy spells. How long it lasts is to be confirmed. If the unit stops reporting, you are told.",
    },
    {
      q: "Will it switch my aerator on?",
      a: "No. The first version watches and alerts only. It can show whether an aerator is running if the signal is wired in.",
    },
  ],
  relatedProductSlugs: ["generator-monitor", "soil-moisture-monitor", "water-tank-level-monitor"],
  images: { gallery: [] },
  missing: [
    "Supplier datasheets for the dissolved-oxygen, pH and temperature probes, with range and accuracy",
    "Probe cleaning and calibration interval from field trials in working ponds",
    "Probe price and its effect on the hardware range after supplier quotes",
    "Alert thresholds for each species, validated by a qualified aquaculture adviser",
    "Solar panel size, battery capacity and run time without sun, including monsoon conditions",
    "Enclosure ingress rating and corrosion resistance for pond and salt-water conditions",
    "4G behaviour at remote farms with weak coverage",
    "Radio approvals for the wireless device",
    "How the aerator on and off signal is wired in, checked by a licensed electrician",
    "Installation photographs from a real pond",
    "Confirmed hardware and monthly price after supplier quotes",
  ],
  updatedAt: "2026-11-24",
  publishedAt: "2026-11-24",
  status: "live",
} as Product;

export default aquacultureWaterMonitor;
