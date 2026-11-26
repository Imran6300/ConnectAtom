# ConnectAtom V2 content brief (read fully before writing)

You are writing catalogue records for the ConnectAtom website. Records are TypeScript objects that must satisfy the zod schemas in
`src/lib/catalogue/types.ts` (READ THAT FILE FIRST: field names, min/max lengths and enums are enforced).

## Sources you may use
- `docs/source/playbook.txt`  product facts: buyer, problem, hardware, software features, how-to-start, watch-outs, prices, platform. THIS IS THE PRODUCT TRUTH.
- `docs/source/blueprint.txt` site structure, page rules, industry/fit matrix.
- `docs/source/brand-guide.txt` voice and naming.
- `docs/source/existing-*.ts.txt` the text that already exists for products 1-8, 9 industries and 4 fits: PRESERVE its meaning and reuse its good sentences.
- General, well-established domain knowledge for EXPLANATION (why heat spoils stock, why a probe near a door reads wrong, how a defrost cycle spikes a reading). Explain mechanisms; do not cite numbers you cannot source.

## Hard rules (the validator checks most of these)
1. NEVER fabricate. No statistics, percentages, market sizes, customer names, testimonials, case-study results, awards, certifications, or "proven" claims.
2. NEVER name a standard, regulation or regulator as a fact (no ISO/IEC numbers, FSSAI, CDSCO, WHO, GDP, HACCP, NABL, FDA...). If a rule might apply, write "Check which rules apply to you" and add a short line to `sourcesNeeded` (industries) or `missing` (products).
3. Specs: use only what the playbook states. Playbook hardware choices (TMP117 about +-0.1C, PT100 with MAX31865, SHT4x, SCD41, ESP32-S3/C6, DS18B20, Li-ion/LiFePO4 backup, IP65 ABS box, buzzer+LED...) are `design-target`, with a note "Starting design choice from the product playbook; confirm against the supplier datasheet". Anything the playbook does not state (accuracy of a finished unit, battery hours, IP rating of the shipped unit, range in metres, operating temperature of the node, certifications) is `to-confirm` with value "To be confirmed" and ALSO listed in `missing`. Never invent a number to fill a gap.
4. Price: use the playbook hardware range and monthly figure. Prices are indicative starting assumptions, never an offer.
5. Planned products (availability "in-development") must say so honestly in `overview[0]` and `tagline` must not imply they ship today. Write them as what the product will do and what we are validating. Never "available now", "order today".
6. Voice (brand-guide.txt): plain words, short sentences, numbers beat adjectives, calm, precise, practical, dependable. Alerts written like a calm colleague: what happened, how long, what to check. Avoid hype and filler. BANNED words: cutting-edge, revolutionary, next-gen, seamless, solutions (as a noun for the product), synergy, game-changing, world-class, state-of-the-art, empower, unlock, holistic, best-in-class, leverage, turnkey, ecosystem. No "!!" and no ALL-CAPS alarm text. Write "ConnectAtom" (one word). Currency: rupee sign and Indian grouping. Units: degree C. Words buyers in India use: godown, cold storage, chilling centre.
7. Uniqueness: every record must read as written for that product/industry. No paragraph may be reused across records with a noun swapped. Each record should contain specifics a reader cannot get from a sibling record (the failure that product causes, where to place the sensor, what the alert looks like, what the owner does next).
8. Write for the customer first (an owner or manager, not an engineer), search engines second. No keyword stuffing; the name appears naturally.
9. Honest limits: include the playbook "Watch out" points as `watchOut` (products) or in challenges/FAQ answers where natural.
10. Tags: use ONLY words from TAG_VOCAB in types.ts.
11. Platform capabilities you may state (from playbook section 3): live dashboard on phone, WhatsApp + SMS + voice-call + email alerts (plan dependent), escalation to next contact, acknowledge with reason, out-of-range-for-N-minutes rules, power-cut and offline alerts, local buzzer+LED, daily/weekly/monthly PDF reports (plan dependent), CSV export, data retention by plan, multi-site, users limited to sites, API/webhooks on higher plans, offline buffering on the device, calibration offset stored server-side, device claim by QR. Do not state capabilities beyond these.
12. Dates: `updatedAt: "2026-11-24"`; `publishedAt` same.

## How to deliver
Write the files named in your task. Each file: `import type { X } from "@/lib/catalogue/types";` then `const x: X = {...}; export default x;` (or an array default export where stated).
After writing, validate: `cd /home/claude/connectatom-v2 && npx tsx scripts/validate-content.ts <your files>` and fix every FAIL until all pass.
Do NOT run `next build`, `npm install`, or edit any file other than the ones assigned to you (other agents work in parallel in the same folder).
Finish with a SHORT report (under 150 words): files written, anything you flagged as missing/sourcesNeeded, any judgement calls.
