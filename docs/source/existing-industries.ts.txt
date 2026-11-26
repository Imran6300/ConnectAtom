import type { Faq } from "./products";

export type Industry = {
  slug: string; name: string; wave: 1 | 2 | 3; fits: number[]; // product numbers from the fit matrix
  status: "live" | "draft";
  summary?: string; losses?: string[]; monitor?: string[]; checklist?: string[]; faqs?: Faq[];
};

const UPDATED = "2026-11-22";
export const INDUSTRY_UPDATED = UPDATED;

export const INDUSTRIES: Industry[] = [
  { slug: "cold-storage", name: "Cold Storage", wave: 1, fits: [1, 4, 6, 12, 17, 19], status: "live",
    summary: "Cold storages hold other people's stock, so one warm night becomes a dispute, not only a loss.",
    losses: ["A compressor trips overnight and chambers warm before the morning round.", "A door is left open during loading and nobody notices for hours.", "A power cut starts a generator that does not take the load, and the chamber warms."],
    monitor: ["Temperature in every chamber", "Door open time", "Power supply and device connection"],
    checklist: ["Probe at product height, away from the door and the cooling coil", "Gateway mounted outside the metal room", "Limit and delay set per chamber", "Two people on the alert list, with an escalation delay"],
    faqs: [{ q: "Can one dashboard show every chamber?", a: "Yes. Each chamber is a device, grouped under your site." }, { q: "Can I show customers their chamber history?", a: "Reports can be exported as CSV for any device and period." }] },
  { slug: "pharmacy", name: "Pharmacy", wave: 1, fits: [2, 4, 6], status: "live",
    summary: "A pharmacy fridge holds medicines that must stay within 2 to 8°C, and the record matters as much as the temperature.",
    losses: ["A fridge fails over a weekend and the whole stock has to be written off.", "A door is not closed properly at night.", "An inspector asks for a continuous temperature record and only paper entries exist."],
    monitor: ["Fridge temperature against 2 to 8°C", "Door open time", "Power cuts"],
    checklist: ["Probe in a buffer bottle", "Calibration certificate filed with the probe", "2 to 8°C rule active", "Excursion log reviewed weekly"],
    faqs: [{ q: "Does it replace the manual log?", a: "It records continuously. Check with your inspector whether they accept it in place of manual entries." }, { q: "What if the shop closes for the night?", a: "Alerts go to the people on your list at any hour." }] },
  { slug: "hospital", name: "Hospital", wave: 1, fits: [2, 5, 7, 12, 13], status: "live",
    summary: "Hospitals keep vaccines, blood, drugs and server rooms that all fail in different ways, often out of hours.",
    losses: ["A ward fridge drifts out of range at night.", "A server closet overheats after an AC failure.", "A leak in a basement store goes unseen."],
    monitor: ["Medical fridges", "Server and records rooms", "Leaks in stores and plant rooms"],
    checklist: ["One owner per fridge", "Alert list that includes the night supervisor", "Acknowledge-with-reason switched on", "Regular review of excursion logs"],
    faqs: [{ q: "Can wards see only their own fridges?", a: "Members can be limited to specific sites." }, { q: "Can we use our own probes?", a: "We supply probes matched to the product and its calibration record." }] },
  { slug: "clinic-and-diagnostic-lab", name: "Clinic and Diagnostic Lab", wave: 1, fits: [2, 6, 13], status: "live",
    summary: "Clinics and labs keep vaccines, reagents and samples in a few fridges, where one failure affects many patients.",
    losses: ["A reagent fridge warms overnight and a batch of tests is repeated.", "Vaccines are discarded after an unrecorded power cut."],
    monitor: ["Fridge temperature", "Door open time"],
    checklist: ["Alert to the clinic manager and the owner", "2 to 8°C rule per fridge", "Monthly report saved"],
    faqs: [{ q: "We have one fridge. Is that enough to start?", a: "Yes. One device and one plan is a normal start." }, { q: "Do we need a computer?", a: "No. The dashboard works on a phone." }] },
  { slug: "restaurant", name: "Restaurant", wave: 1, fits: [1, 3, 6], status: "live",
    summary: "A restaurant depends on a few freezers and chillers, and one failure can ruin a week of stock.",
    losses: ["A walk-in freezer fails after closing time.", "Paper temperature sheets are filled in at the end of the day.", "A door is left ajar after a delivery."],
    monitor: ["Freezer and chiller temperature", "Door open time"],
    checklist: ["Probe in the coldest part away from the door", "Alerts to the kitchen manager and the owner", "Shift summary checked daily"],
    faqs: [{ q: "Do I need to install anything on a computer?", a: "No. You get a dashboard link and WhatsApp alerts." }, { q: "Can I add outlets later?", a: "Yes. Each outlet becomes a site on your account." }] },
  { slug: "cloud-kitchen", name: "Cloud Kitchen", wave: 1, fits: [1, 3], status: "live",
    summary: "Cloud kitchens run lean and often unattended at night, so a cold-chain failure is found at the first morning order.",
    losses: ["Overnight failure of a freezer shared by several brands.", "No one owns the temperature log."],
    monitor: ["Freezer and chiller temperature", "Device connection"],
    checklist: ["Alert to the kitchen lead and the operator", "Automatic logs instead of manual sheets"],
    faqs: [{ q: "Our kitchen is in a shared building. Can neighbours share a demo?", a: "Yes. We can show a live dashboard on one kitchen and set up others nearby." }, { q: "Is it mobile friendly?", a: "Yes. It is built for phones." }] },
  { slug: "pharma-distributor", name: "Pharma Distributor", wave: 1, fits: [2, 4, 6, 19], status: "live",
    summary: "Pharma distributors store large volumes of temperature-sensitive stock across cold rooms and ambient godowns.",
    losses: ["A cold room drifts and a whole consignment is questioned.", "A hot corner in the godown goes unnoticed for weeks."],
    monitor: ["Cold rooms and fridges", "Godown temperature and humidity zones"],
    checklist: ["Multi-node survey of the godown", "Alert list for night and weekend", "Weekly trend report reviewed"],
    faqs: [{ q: "Can we monitor several branches?", a: "Yes. Each branch is a site, with users limited to their own branch if you want." }, { q: "Is there a visit for setup?", a: "Installation help is included. On-site visits are available in Hyderabad." }] },
  { slug: "warehouse-and-logistics", name: "Warehouse and Logistics", wave: 1, fits: [4, 6, 12, 17, 19], status: "live",
    summary: "Warehouses lose stock to heat and humidity that nobody measures, in places nobody walks.",
    losses: ["Stock damaged by humidity in one corner.", "Heat builds under a metal roof in summer."],
    monitor: ["Temperature and humidity by zone", "Door open time at cold bays"],
    checklist: ["Nodes spread across zones", "Humidity limit and delay set", "Weekly trend report"],
    faqs: [{ q: "Is the price per godown or per node?", a: "Per device, with multi-node pricing designed in from day one." }, { q: "Can it work in a large site?", a: "Yes. A LoRa link connects nodes to a gateway on large sites." }] },
  { slug: "server-room-and-isp", name: "Server Room and ISP", wave: 1, fits: [5, 6, 7, 12], status: "live",
    summary: "Small server rooms and ISP cabinets have little cooling margin, so an AC or power failure becomes an outage quickly.",
    losses: ["AC failure over a weekend.", "Mains power cut with no one on site.", "A leak under a raised floor."],
    monitor: ["Room temperature", "Mains power", "Leaks"],
    checklist: ["Sensor near the equipment intake", "4G fallback so alerts leave the building", "Alert list that includes the network engineer"],
    faqs: [{ q: "Will an alert reach us if our network is down?", a: "With the 4G fallback, yes." }, { q: "Can installers resell it?", a: "Yes. See the partners page." }] },
  // Waves 2 and 3: data only. Pages are built in batches after earlier batches earn their place (blueprint).
  ...([
    ["blood-bank", "Blood Bank", 2, [2, 12]], ["bakery-and-sweet-shop", "Bakery and Sweet Shop", 2, [1, 3]], ["hotel-and-catering", "Hotel and Catering", 2, [1, 3, 12, 13]],
    ["supermarket-and-retail", "Supermarket and Retail", 2, [1, 3, 6, 12, 17]], ["food-processing", "Food Processing", 2, [1, 4, 15, 17, 18]], ["dairy", "Dairy", 2, [1, 8, 12, 19]],
    ["ice-cream-and-frozen-foods", "Ice Cream and Frozen Foods", 2, [1, 6, 12]], ["meat-fish-and-seafood", "Meat, Fish and Seafood", 2, [1, 3, 6, 19]], ["fruit-and-vegetable-trading", "Fruit and Vegetable Trading", 2, [1, 4, 6]],
    ["mushroom-farm", "Mushroom Farm", 2, [9, 13]], ["greenhouse-and-nursery", "Greenhouse and Nursery", 2, [9, 11, 14]], ["poultry-farm", "Poultry Farm", 2, [10, 11, 12]], ["small-factory", "Small Factory", 2, [12, 15, 16, 17, 18]],
    ["hatchery", "Hatchery", 3, [9, 10]], ["aquaculture", "Aquaculture", 3, [12, 20]], ["orchard-and-farm", "Orchard and Farm", 3, [11, 12, 14]], ["school-and-college", "School and College", 3, [5, 11, 13]],
    ["pump-house-and-water-utility", "Pump House and Water Utility", 3, [11, 16, 17]], ["apartment-and-township", "Apartment and Township", 3, [7, 11, 12, 13]], ["transport-and-fleet", "Transport and Fleet", 3, [6, 19]], ["gym-and-co-working", "Gym and Co-working", 3, [13]],
  ] as [string, string, 2 | 3, number[]][]).map(([slug, name, wave, fits]): Industry => ({ slug, name, wave, fits, status: "draft" })),
];

export const LIVE_INDUSTRIES = INDUSTRIES.filter((i) => i.status === "live");
export const industryBySlug = (s: string) => INDUSTRIES.find((i) => i.slug === s);
