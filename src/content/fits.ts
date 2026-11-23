import { INDUSTRIES } from "./industries";
import { LIVE_PRODUCTS } from "./products";

// productIndustryFits: one record per real buying situation. The pair page is built from this record plus the catalogue.
// fitScore is a JUDGEMENT to confirm against buyer conversations. A pair page ships only if it passes the gate (lib/seo/gate.ts).
export type Fit = {
  productSlug: string; industrySlug: string; fitScore: 0 | 1 | 2 | 3 | 4 | 5;
  angle: string; problem: string; setup: string;
  thresholds?: { label: string; rule: string }[];
  reportTemplate?: string; failureScenario?: string; exampleAlert?: string; hardwareVariant?: string; installNotes?: string; planRecommendation?: string;
  proof?: { kind: "sample" | "pilot" | "photo" | "reviewer"; label: string }[];
  status: "draft" | "review" | "live"; updatedAt: string;
};

const U = "2026-11-22";
const written: Fit[] = [
  {
    productSlug: "cold-room-monitor", industrySlug: "cold-storage", fitScore: 5, status: "live", updatedAt: U,
    angle: "A cold storage holds other people's stock, so one warm night turns into a dispute with customers, not only a loss on your own books.",
    problem: "A multi-chamber cold storage has a separate compressor, door and defrost cycle for each chamber. If one compressor trips at 2 am, that chamber warms slowly, and the first person to notice is usually the supervisor on the morning round. By then the stock may belong to several customers, and the question is no longer only how much was lost but whose stock it was and how long it was warm. A paper log taken a few times a day cannot show when the drift began, how long it lasted, or whether an open door or a failed compressor caused it. A continuous record with timestamps answers those questions with evidence instead of memory, and an early alert means the compressor is often fixed before the stock is affected at all.",
    setup: "Each chamber gets its own device. The gateway is mounted outside the chamber, near the door, because a metal room blocks Wi-Fi, and only the probe cable passes through the wall. The probe is placed at product height, away from the door and from the cooling coil, so it reads the temperature the stock actually sees. We then set a limit and a delay for each chamber, because a frozen chamber and a fruit chamber need different numbers, and the delay is set longer than the normal defrost peak so routine cycles do not raise false alarms. Two people go on the alert list, with an escalation delay, so an alert at night reaches a second person if the first does not respond. An optional buzzer sounds locally even if the network is down.",
    thresholds: [{ label: "Chamber temperature", rule: "Above your limit for 10 minutes (starting value: 8°C, set per chamber)" }, { label: "Door", rule: "Open longer than the time you allow" }, { label: "Power", rule: "Mains lost, running on battery" }],
    reportTemplate: "Daily summary per chamber: minimum, maximum, average and alerts", failureScenario: "Compressor trips overnight; chamber warms for hours before the morning round.",
    exampleAlert: "Chamber 2: 9.4°C for 10 min (limit 8°C). Door open 14 min. Check door and compressor.", hardwareVariant: "Gateway outside the chamber, 1 to 2 probes rated to -30°C, 4G variant for sites with weak Wi-Fi.",
    installNotes: "Probe at product height away from the door and the coil; cable glands strain-relieved; antenna outside metal.", planRecommendation: "Pro for escalation and SMS; Business if customers ask for audit-ready reports.",
    proof: [{ kind: "sample", label: "Sample alert and report shown on this page are illustrative, not from a customer." }],
  },
  {
    productSlug: "medical-fridge-monitor", industrySlug: "pharmacy", fitScore: 5, status: "live", updatedAt: U,
    angle: "A pharmacy's fridge holds stock that must stay within 2 to 8°C, and the continuous record matters as much as the temperature itself.",
    problem: "A pharmacy usually has one or two fridges, and the whole stock of vaccines and cold-chain medicines can sit in them. A fridge that drifts over a weekend or a holiday may mean writing off the entire stock, and without a continuous record there is no way to know whether a given batch was exposed. Inspectors and insurers may ask for a temperature record that covers every hour, but a clipboard entry made morning and evening says nothing about the hours in between. The practical problems are also real: a door that was not closed properly at night, a power cut when the shop is shut, or a fridge that is opened often during a busy day and shows a short spike that is not a real excursion.",
    setup: "A precision probe sits in a glycol or thermal-buffer bottle inside the fridge. The buffer means a door opening does not cause a false alarm, while a real, lasting drift still does. The rule starts at 2 to 8°C with a short delay, for example 5 minutes, and you adjust it for your own stock. Every time the temperature leaves the range, the start, end, duration and peak are written to an excursion log, and staff acknowledge an alert with a short reason such as 'restocking', which records who and when. The probe comes with its calibration certificate, which is stored against the device so it can be attached to reports. The gateway sits outside the fridge on mains power, with a battery that sends a power-cut alert if the shop loses electricity.",
    thresholds: [{ label: "Too warm", rule: "Above 8°C for 5 minutes" }, { label: "Too cold", rule: "Below 2°C for 5 minutes" }, { label: "Power", rule: "Mains lost" }],
    reportTemplate: "Daily, weekly and monthly fridge temperature report with excursion table and calibration details", failureScenario: "Fridge drifts warm over a weekend while the shop is closed.",
    exampleAlert: "Pharmacy Fridge: 8.6°C for 5 min (limit 8°C). Check the door seal and keep stock in the fridge.", hardwareVariant: "Precision probe in a buffer bottle, Wi-Fi gateway with battery backup.",
    installNotes: "Probe in the middle of the fridge, not against the wall or the cooling plate; calibration certificate filed.", planRecommendation: "Pro for 1 year of data and PDF reports.",
    proof: [{ kind: "sample", label: "Sample alert and report shown on this page are illustrative, not from a customer." }],
  },
  {
    productSlug: "kitchen-freezer-monitor", industrySlug: "restaurant", fitScore: 5, status: "live", updatedAt: U,
    angle: "In a restaurant the temperature log is a chore that gets skipped, while the freezer it describes is worth thousands of rupees of stock.",
    problem: "Most restaurants record freezer and chiller temperatures on a clipboard. In a busy kitchen the sheet is skipped during service and filled in at the end of the day, so the numbers describe what someone remembers rather than what happened. The real risk is the night: a walk-in freezer that fails after closing can spoil a week of stock before the first cook arrives, and nobody is there to hear the compressor stop. Kitchens are also harsh places for electronics, with heat, steam and grease, so equipment that works in an office often fails in a kitchen. The owner usually wants two simple things: to be told when something is wrong, and to stop depending on a handwritten sheet that no one trusts.",
    setup: "The gateway goes in a sealed IP65 box outside the freezer, away from the steam and heat of the cooking line, with strain-relieved cable glands. One or two probes go inside the walk-in freezer and chiller, and an optional second probe can watch a hot-hold or bain-marie. A temperature reading is logged automatically every 15 to 30 minutes, so the record exists whether or not anyone fills in a sheet. The kitchen manager and the owner are both on the alert list, and the owner is told if the manager does not acknowledge. At the end of each shift a short summary is sent, and the dashboard is designed for a phone, because that is the device a kitchen already has. Chains can add every outlet to one dashboard.",
    thresholds: [{ label: "Freezer", rule: "Above your limit for 20 minutes (starting value: -15°C, set your own)" }, { label: "Power", rule: "Mains lost" }, { label: "Offline", rule: "No data for 15 minutes" }],
    reportTemplate: "Shift temperature summary for the kitchen manager and owner", failureScenario: "Walk-in freezer fails after closing; found at the first morning prep.",
    exampleAlert: "Walk-in Freezer: -9.0°C for 20 min (limit -15°C). Check the door and the compressor.", hardwareVariant: "IP65 gateway outside the freezer, freezer-rated probes, optional hot-hold probe.",
    installNotes: "Mount away from the cooking line; cable strain relief on every entry; probe away from the door.", planRecommendation: "Starter for a single outlet; Pro for chains that want SMS and escalation.",
    proof: [{ kind: "sample", label: "Sample alert shown on this page is illustrative, not from a customer." }],
  },
  {
    productSlug: "warehouse-climate-monitor", industrySlug: "pharma-distributor", fitScore: 5, status: "live", updatedAt: U,
    angle: "A pharma distributor's godown is large enough that conditions differ from corner to corner, so a single thermometer on the wall proves little.",
    problem: "Distributors keep cold-chain stock in cold rooms and everything else in ambient godowns, and the ambient stock still has storage limits. A large godown has a hot corner under the roof, a damp corner by a wall, and a cooler centre, and a single reading by the door describes none of them. Heat and humidity damage stock slowly and silently, so by the time a problem is visible the exposure has lasted weeks. The practical questions are where the hot and damp spots are, how long they last, and whether they worsen in summer or after rain. Without data from several positions, the answer is a guess, and it is hard to show a customer or an inspector that the stock was stored within its limits.",
    setup: "Start with a 7-day survey: four temperature and humidity nodes placed at different points in the godown, such as near the roof, by the door, against an outer wall and in the centre. After a week you can see which positions run hot or damp, and where permanent nodes should stay. Nodes connect over Wi-Fi, or over a LoRa link to a gateway in larger sites. You then set temperature and humidity rules with delays suited to slow changes, for example a warning when humidity stays above your limit for an hour. A nightly summary and a weekly trend report show each node, and a floor-plan zone map shows where the nodes are. Pricing is per node, designed for multi-node sites from the first day.",
    thresholds: [{ label: "Temperature", rule: "Above your limit for 30 minutes (starting value: 35°C)" }, { label: "Humidity", rule: "Above your limit for 60 minutes (starting value: 70%)" }, { label: "Offline", rule: "No data for 30 minutes" }],
    reportTemplate: "Weekly godown climate report with a node-by-node trend and a nightly summary", failureScenario: "Heat builds under a metal roof over weeks, unnoticed.",
    exampleAlert: "Godown B, north wall: 37.2°C for 30 min (limit 35°C). Check ventilation near the roof.", hardwareVariant: "Temperature and humidity nodes, Wi-Fi or LoRa to a gateway.",
    installNotes: "Place nodes at several heights and positions; keep them away from direct sunlight and from the door.", planRecommendation: "Pro for a year of data and weekly reports.",
    proof: [{ kind: "sample", label: "Sample alert shown on this page is illustrative, not from a customer." }],
  },
];

// Every other launch pair is created as a draft with no copy yet. It fails the gate and is NOT published.
function launchDrafts(): Fit[] {
  const out: Fit[] = [];
  for (const ind of INDUSTRIES.filter((i) => i.wave === 1)) {
    for (const p of LIVE_PRODUCTS.filter((p) => ind.fits.includes(p.num))) {
      if (written.some((w) => w.productSlug === p.slug && w.industrySlug === ind.slug)) continue;
      out.push({ productSlug: p.slug, industrySlug: ind.slug, fitScore: 4, angle: "", problem: "", setup: "", status: "draft", updatedAt: U });
    }
  }
  return out;
}
export const FITS: Fit[] = [...written, ...launchDrafts()];
export const fitFor = (product: string, industry: string) => FITS.find((f) => f.productSlug === product && f.industrySlug === industry);
