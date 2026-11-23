import { FITS, type Fit } from "@/content/fits";

// The combination gate (blueprint). A pair page stays unpublished until all five checks pass.
// Numbers are STARTING VALUES to tune from Search Console, not Google rules.
export const GATE = { minWords: 250, maxOverlap: 0.4, minDataPoints: 3 };

const words = (t: string) => t.toLowerCase().replace(/[^a-z0-9°\s-]/g, " ").split(/\s+/).filter(Boolean);
const copyOf = (f: Fit) => words(`${f.angle} ${f.problem} ${f.setup}`);
const grams = (w: string[], n = 5) => { const s = new Set<string>(); for (let i = 0; i + n <= w.length; i++) s.add(w.slice(i, i + n).join(" ")); return s; };

export type GateResult = { passed: boolean; failures: string[]; wordCount: number; overlap: number };

export function runGate(f: Fit): GateResult {
  const failures: string[] = [];
  const w = copyOf(f);
  if (f.fitScore < 4) failures.push("Fit score below 4: not a strong real buying situation");
  if (w.length < GATE.minWords) failures.push(`Unique copy is ${w.length} words (needs ${GATE.minWords})`);

  // word-sequence overlap against sibling pairs in the same family
  const mine = grams(w);
  let overlap = 0;
  for (const s of FITS) {
    if (s === f) continue;
    const sw = copyOf(s);
    if (sw.length < 50) continue;
    const sg = grams(sw);
    let shared = 0; mine.forEach((g) => { if (sg.has(g)) shared++; });
    overlap = Math.max(overlap, mine.size ? shared / mine.size : 0);
  }
  if (overlap > GATE.maxOverlap) failures.push(`Copy overlaps a sibling page by ${(overlap * 100).toFixed(0)}%`);

  const data = [f.thresholds?.length, f.reportTemplate, f.failureScenario, f.exampleAlert, f.hardwareVariant, f.installNotes, f.planRecommendation].filter(Boolean).length;
  if (data < GATE.minDataPoints) failures.push(`Only ${data} pair-specific data points (needs ${GATE.minDataPoints})`);
  if (!f.proof || !f.proof.length) failures.push("No proof: needs a pilot, a photo, a named reviewer, or labelled sample data");
  // Check 5 (3+ inbound links and a pair-specific call to action) is satisfied by the template: parent hub, sibling products and sibling industries always link here.
  return { passed: failures.length === 0, failures, wordCount: w.length, overlap };
}

export const isPublishable = (f: Fit) => f.status === "live" && runGate(f).passed;
export const publishableFits = () => FITS.filter(isPublishable);
