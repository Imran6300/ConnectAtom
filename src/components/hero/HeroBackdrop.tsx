// Decorative PCB trace field behind the hero. Pure SVG, server-rendered, no JS.
// Traces use 45-degree bends like a routed board; a short teal "pulse" runs along each one.
const TRACES: { d: string; dur: number; delay: number; pad?: [number, number] }[] = [
  { d: "M0 640 H180 L240 580 H420 L470 630 H640", dur: 9, delay: 0, pad: [640, 630] },
  { d: "M0 706 H120 L170 656 H300", dur: 7, delay: 2.2, pad: [300, 656] },
  { d: "M70 760 V694 L118 646", dur: 6, delay: 1, pad: [118, 646] },
  { d: "M1440 118 H1262 L1204 60 H1040", dur: 8, delay: 0.6, pad: [1040, 60] },
  { d: "M1440 204 H1332 L1292 164 H1184 L1150 130", dur: 10, delay: 3.4, pad: [1150, 130] },
  { d: "M1384 0 V82 L1344 122", dur: 6.5, delay: 1.8, pad: [1344, 122] },
  { d: "M1440 560 H1300 L1250 610 H1110", dur: 8.5, delay: 4, pad: [1110, 610] },
];

export function HeroBackdrop() {
  return (
    <svg className="ca-backdrop" viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {TRACES.map((t, i) => (
          <g key={i}>
            <path d={t.d} className="ca-bd__trace" />
            <path d={t.d} pathLength={100} className="ca-bd__pulse" style={{ animationDuration: `${t.dur}s`, animationDelay: `${t.delay}s` }} />
            {t.pad && <circle cx={t.pad[0]} cy={t.pad[1]} r="4.5" className="ca-bd__pad" />}
          </g>
        ))}
      </g>
    </svg>
  );
}
