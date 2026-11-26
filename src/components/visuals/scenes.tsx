import type { ReactNode } from "react";
import type { SceneKey } from "../../lib/catalogue/types";

/* Original flat geometric scene art. Server component, pure inline SVG, no animation of its own:
   the global stylesheet animates `.ca-pulse` (the signal arcs). Palette follows the brand guide. */

const BG = "#0A1622", P1 = "#112536", P2 = "#18324A", P3 = "#23415C", P4 = "#3E5468";
const MIST = "#E3EBF0", STEEL = "#8FA6B8", TEAL = "#14D1BC", AMBER = "#FFB224", RED = "#F0524F", GREEN = "#2BC77A";

const DEFAULT_TITLES: Record<SceneKey, string> = {
  "cold-room": "Cold room with insulated door, evaporator fan and stacked pallets",
  "medical-fridge": "Glass-door pharmacy fridge with shelves of medicine boxes",
  kitchen: "Commercial kitchen with a stainless walk-in door, steel counter and hanging pans",
  warehouse: "Warehouse with tall pallet racking under roof trusses",
  "server-room": "Server room with two racks and ceiling air conditioner",
  greenhouse: "Arched polyhouse with plant rows and a fogger line",
  "poultry-shed": "Long poultry shed with end fans and feeders",
  pond: "Aquaculture pond with a paddle-wheel aerator and a pole sensor",
  "farm-field": "Farm field with furrows, a drip line and a soil stake",
  "water-tank": "Overhead water tank on a stand with pipes and a pump",
  "factory-floor": "Factory floor with a press, a lathe, a conveyor and a tower light",
  truck: "Refrigerated box truck on the road",
  building: "Apartment block with a water tank on the roof",
  "dairy-cooler": "Bulk milk cooler with a milk can and a probe",
  "hospital-ward": "Hospital ward with a bed, an IV stand and a small medicine fridge",
};

/* ---------------------------------------------------------------- shared bits */

/** The ConnectAtom node: teal rounded square with the white C-ring mark, plus signal arcs. */
function Node({ x, y, dir = -40 }: { x: number; y: number; dir?: number }) {
  const cx = x + 20, cy = y + 20;
  const arc = (r: number) => {
    const a1 = ((dir - 30) * Math.PI) / 180, a2 = ((dir + 30) * Math.PI) / 180;
    const p = (a: number) => `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
    return `M${p(a1)}A${r} ${r} 0 0 1 ${p(a2)}`;
  };
  return (
    <g>
      <rect x={x - 3} y={y - 3} width="46" height="46" rx="12" fill={BG} opacity=".55" />
      <rect x={x} y={y} width="40" height="40" rx="10" fill={TEAL} />
      <g transform={`translate(${x + 5} ${y + 5}) scale(.3)`} fill="none" stroke="#fff">
        <path d="M73.29 29.07A34 34 0 1 0 73.29 70.93" strokeWidth="9" strokeLinecap="round" />
        <line x1="46.5" y1="50" x2="84.5" y2="50" strokeWidth="6.5" />
        <circle cx="46.5" cy="50" r="9.5" fill="#fff" stroke="none" />
        <circle cx="84.5" cy="50" r="7.5" fill="#fff" stroke="none" />
      </g>
      <g fill="none" stroke={TEAL} strokeWidth="3.5" strokeLinecap="round">
        <path className="ca-pulse" d={arc(32)} strokeOpacity=".95" />
        <path className="ca-pulse" d={arc(45)} strokeOpacity=".7" />
        <path className="ca-pulse" d={arc(58)} strokeOpacity=".45" />
      </g>
    </g>
  );
}

function Cloud({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 28h86a14 14 0 0 0 0-28a20 20 0 0 0-38-6a22 22 0 0 0-40 10a12 12 0 0 0-8 24z"
      fill="none" stroke={MIST} strokeOpacity=".09" strokeWidth="2"
    />
  );
}

/** Four-bladed fan, centred on (x, y). */
function Fan({ x, y, r = 24 }: { x: number; y: number; r?: number }) {
  const k = r / 24;
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <circle r="24" fill={BG} stroke={P4} strokeWidth="3" />
      <path
        d="M0 0C10-4 18-12 12-20C6-16 2-8 0 0ZM0 0C4 10 12 18 20 12C16 6 8 2 0 0ZM0 0C-10 4-18 12-12 20C-6 16-2 8 0 0ZM0 0C-4-10-12-18-20-12C-16-6-8-2 0 0Z"
        fill={STEEL}
      />
      <circle r="4" fill={P4} />
    </g>
  );
}

function Snow({ x, y, s = 6, o = 0.6 }: { x: number; y: number; s?: number; o?: number }) {
  const d = s * 0.7;
  return (
    <path
      d={`M${x - s} ${y}H${x + s}M${x} ${y - s}V${y + s}M${x - d} ${y - d}L${x + d} ${y + d}M${x - d} ${y + d}L${x + d} ${y - d}`}
      stroke="#BFE9F2" strokeOpacity={o} strokeWidth="2" strokeLinecap="round" fill="none"
    />
  );
}

const Floor = ({ y = 400, fill = P2 }: { y?: number; fill?: string }) => <rect y={y} width="800" height={500 - y} fill={fill} />;

/* ---------------------------------------------------------------- scenes */

function ColdRoom() {
  const boxes = (x: number, cols: number, rows: number, w = 60, h = 46) =>
    Array.from({ length: cols * rows }, (_, i) => {
      const c = i % cols, r = Math.floor(i / cols);
      return <rect key={`${x}-${i}`} x={x + c * w} y={385 - (r + 1) * h} width={w} height={h} fill={(c + r) % 2 ? P3 : P2} stroke={P4} strokeWidth="2" />;
    });
  return (
    <>
      <rect width="800" height="400" fill={P1} />
      <Floor />
      <Cloud x={420} y={190} s={1.2} />
      {/* insulated door */}
      <rect x="64" y="108" width="226" height="292" rx="6" fill={P3} stroke={P4} strokeWidth="4" />
      <rect x="84" y="128" width="186" height="272" fill={P2} />
      <path d="M177 128V400M84 264H270" stroke={P3} strokeWidth="3" />
      <rect x="244" y="232" width="12" height="76" rx="6" fill={STEEL} />
      <rect x="58" y="160" width="14" height="30" rx="3" fill={STEEL} />
      <rect x="58" y="320" width="14" height="30" rx="3" fill={STEEL} />
      <circle cx="177" cy="82" r="8" fill={AMBER} />
      <circle cx="177" cy="82" r="15" fill="none" stroke={AMBER} strokeOpacity=".35" strokeWidth="2" />
      {/* evaporator */}
      <path d="M360 0V70M640 0V70" stroke={P4} strokeWidth="6" />
      <rect x="340" y="70" width="320" height="78" rx="8" fill={P2} stroke={P4} strokeWidth="3" />
      <Fan x={420} y={109} />
      <Fan x={580} y={109} />
      <path d="M472 84V134M500 84V134M528 84V134" stroke={P4} strokeWidth="3" />
      <path d="M356 148l8 22 8-22M440 148l6 30 6-30M530 148l5 16 5-16M600 148l7 26 7-26" fill="#BFE9F2" fillOpacity=".6" />
      <Snow x={395} y={185} /><Snow x={560} y={200} s={5} /><Snow x={640} y={175} s={7} o={0.4} />
      {/* pallets */}
      <rect x="380" y="385" width="180" height="15" fill={P4} />
      {boxes(380, 3, 3)}
      <rect x="600" y="385" width="120" height="15" fill={P4} />
      {boxes(600, 2, 4, 60, 42)}
      <path d="M600 217h120" stroke={MIST} strokeOpacity=".25" strokeWidth="2" />
      <Node x={306} y={192} dir={-30} />
    </>
  );
}

function MedicalFridge() {
  const shelves = [172, 252, 332];
  const box = (x: number, y: number, w: number, h: number, f: string, k: string) => <rect key={k} x={x} y={y} width={w} height={h} rx="2" fill={f} />;
  return (
    <>
      <rect width="800" height="400" fill={P1} />
      <Floor />
      <rect x="240" y="60" width="320" height="340" rx="14" fill={P3} stroke={P4} strokeWidth="4" />
      <rect x="262" y="104" width="276" height="272" rx="6" fill="#0C1B2A" />
      <rect x="262" y="76" width="276" height="20" rx="4" fill={P2} />
      <path d="M394 80h12M400 76v16" stroke={GREEN} strokeWidth="4" strokeLinecap="round" transform="translate(0 -1)" />
      <path d="M262 376L400 104H460L322 376Z" fill="#fff" fillOpacity=".05" />
      {shelves.map((y) => <rect key={y} x="262" y={y} width="276" height="8" fill={P4} />)}
      {box(280, 128, 50, 44, MIST, "a")}{box(336, 140, 38, 32, "#9CC9D8", "b")}{box(380, 122, 56, 50, MIST, "c")}{box(444, 136, 40, 36, "#9CC9D8", "d")}{box(490, 128, 34, 44, MIST, "e")}
      {box(280, 214, 44, 38, "#9CC9D8", "f")}{box(468, 204, 54, 48, MIST, "g")}{box(412, 220, 46, 32, "#9CC9D8", "h")}
      {box(284, 296, 70, 36, MIST, "i")}{box(360, 284, 50, 48, "#9CC9D8", "j")}{box(416, 300, 60, 32, MIST, "k")}{box(482, 290, 40, 42, "#9CC9D8", "l")}
      {/* probe in a small bottle */}
      <path d="M348 236V228a6 6 0 0 1 6-6h14a6 6 0 0 1 6 6v8" fill="none" />
      <rect x="342" y="214" width="42" height="38" rx="8" fill="none" stroke={MIST} strokeWidth="3" />
      <rect x="345" y="232" width="36" height="17" rx="5" fill={TEAL} fillOpacity=".45" />
      <path d="M363 205V230" stroke={STEEL} strokeWidth="4" strokeLinecap="round" />
      <path d="M363 206V190Q363 182 372 182H532Q552 182 552 150V108Q552 100 560 100H600" fill="none" stroke={STEEL} strokeWidth="2.5" />
      <rect x="540" y="130" width="10" height="130" rx="5" fill={STEEL} />
      <rect x="260" y="400" width="30" height="14" fill={P4} /><rect x="510" y="400" width="30" height="14" fill={P4} />
      <Node x={600} y={80} dir={-35} />
    </>
  );
}

function Kitchen() {
  const pan = (x: number, w: number, k: string) => (
    <g key={k}>
      <path d={`M${x} 150v14`} stroke={STEEL} strokeWidth="3" />
      <ellipse cx={x} cy={196} rx={w} ry={w * 0.2} fill={P4} />
      <path d={`M${x - w} 196a${w} ${w * 0.9} 0 0 0 ${2 * w} 0z`} fill={STEEL} />
      <rect x={x + w - 2} y="192" width="34" height="7" rx="3" fill={P4} />
    </g>
  );
  return (
    <>
      <rect width="800" height="400" fill={P1} />
      <Floor />
      <path d="M300 70H780M300 110H780M300 150H780M300 190H780M300 230H780M300 270H780" stroke={P2} strokeWidth="2" />
      {/* walk-in door */}
      <rect x="50" y="90" width="210" height="310" rx="6" fill="#2B3B4A" stroke={P4} strokeWidth="4" />
      <rect x="72" y="112" width="166" height="288" fill="#34495C" />
      <path d="M72 112L238 400" stroke="#fff" strokeOpacity=".06" strokeWidth="40" />
      <rect x="116" y="150" width="78" height="64" rx="12" fill={BG} stroke={P4} strokeWidth="4" />
      <rect x="216" y="220" width="12" height="90" rx="6" fill={MIST} fillOpacity=".7" />
      <rect x="44" y="140" width="12" height="28" fill={STEEL} /><rect x="44" y="330" width="12" height="28" fill={STEEL} />
      {/* rail and pans */}
      <path d="M310 140H770" stroke={STEEL} strokeWidth="5" strokeLinecap="round" />
      {pan(360, 38, "p1")}{pan(470, 30, "p2")}{pan(560, 42, "p3")}{pan(670, 28, "p4")}
      {/* steel counter */}
      <rect x="300" y="310" width="470" height="14" rx="4" fill={STEEL} />
      <rect x="310" y="324" width="450" height="76" fill="#2B3B4A" />
      <path d="M460 324V400M610 324V400" stroke={P4} strokeWidth="3" />
      <rect x="360" y="346" width="60" height="8" rx="4" fill={STEEL} /><rect x="500" y="346" width="60" height="8" rx="4" fill={STEEL} /><rect x="650" y="346" width="60" height="8" rx="4" fill={STEEL} />
      <path d="M560 310v-44h64v44z" fill={P4} /><rect x="554" y="258" width="76" height="9" rx="4" fill={STEEL} />
      <path d="M580 244q-8-12 0-22M604 244q-8-12 0-22" fill="none" stroke={MIST} strokeOpacity=".25" strokeWidth="3" strokeLinecap="round" />
      <Node x={266} y={190} dir={-35} />
    </>
  );
}

function Warehouse() {
  const bays = [110, 330, 550];
  return (
    <>
      <rect width="800" height="400" fill={P1} />
      <Floor />
      {/* roof trusses */}
      <path d="M0 60H800M0 120H800" stroke={P4} strokeWidth="5" />
      <path d="M0 120L50 60L100 120L150 60L200 120L250 60L300 120L350 60L400 120L450 60L500 120L550 60L600 120L650 60L700 120L750 60L800 120" fill="none" stroke={P3} strokeWidth="3" />
      {/* racking */}
      {bays.map((x) => (
        <g key={x}>
          <path d={`M${x} 140V400M${x + 200} 140V400`} stroke={P4} strokeWidth="9" />
          <path d={`M${x} 190H${x + 200}M${x} 270H${x + 200}M${x} 350H${x + 200}`} stroke={STEEL} strokeOpacity=".7" strokeWidth="8" />
          {[0, 1].map((c) => <rect key={`t${c}`} x={x + 14 + c * 90} y="130" width="82" height="60" fill="none" />)}
          <rect x={x + 14} y="150" width="80" height="40" fill={P3} stroke={P4} strokeWidth="2" /><rect x={x + 102} y="158" width="84" height="32" fill={P2} stroke={P4} strokeWidth="2" />
          <rect x={x + 14} y="224" width="52" height="46" fill={P2} stroke={P4} strokeWidth="2" /><rect x={x + 70} y="224" width="56" height="46" fill={P3} stroke={P4} strokeWidth="2" /><rect x={x + 132} y="232" width="54" height="38" fill={P2} stroke={P4} strokeWidth="2" />
          <rect x={x + 16} y="304" width="80" height="46" fill={P2} stroke={P4} strokeWidth="2" /><rect x={x + 102} y="296" width="82" height="54" fill={P3} stroke={P4} strokeWidth="2" />
        </g>
      ))}
      <rect x="330" y="140" width="0" height="0" />
      <path d="M100 400h20M330 400h20M550 400h20" stroke={AMBER} strokeWidth="0" />
      <Node x={538} y={86} dir={-30} />
      <path d="M558 126v14" stroke={STEEL} strokeWidth="3" />
    </>
  );
}

function ServerRoom() {
  const rack = (x: number, k: string) => (
    <g key={k}>
      <rect x={x} y="110" width="150" height="290" rx="6" fill={P2} stroke={P4} strokeWidth="4" />
      {Array.from({ length: 7 }, (_, i) => (
        <g key={i}>
          <rect x={x + 12} y={124 + i * 38} width="126" height="30" rx="3" fill={BG} />
          <path d={`M${x + 24} ${139 + i * 38}H${x + 70}`} stroke={P3} strokeWidth="6" strokeLinecap="round" />
          <path d={`M${x + 90} ${139 + i * 38}H${x + 126}`} stroke={k === "r2" && i === 4 ? AMBER : i === 2 ? TEAL : GREEN} strokeWidth="6" strokeDasharray="0 12" strokeLinecap="round" />
        </g>
      ))}
    </g>
  );
  return (
    <>
      <rect width="800" height="400" fill={P1} />
      <Floor />
      <path d="M0 440H800M120 400L60 500M300 400L270 500M500 400L520 500M700 400L760 500" stroke={P3} strokeWidth="2" />
      {/* ceiling AC */}
      <rect x="170" y="26" width="460" height="52" rx="8" fill={P2} stroke={P4} strokeWidth="3" />
      <path d="M200 46H600M200 58H600" stroke={BG} strokeWidth="4" strokeLinecap="round" />
      <path d="M260 90q0 20 -18 28M400 90v28M540 90q0 20 18 28" fill="none" stroke={MIST} strokeOpacity=".2" strokeWidth="3" strokeLinecap="round" />
      {rack(230, "r1")}
      {rack(420, "r2")}
      <path d="M305 110V90H495V110" fill="none" stroke={STEEL} strokeOpacity=".5" strokeWidth="5" />
      <rect x="650" y="150" width="56" height="250" fill={P2} />
      <path d="M650 150h56" stroke={P4} strokeWidth="3" />
      <Node x={660} y={194} dir={-140} />
    </>
  );
}

function Greenhouse() {
  const rows = [210, 300, 390];
  return (
    <>
      <rect width="800" height="500" fill={BG} />
      <Cloud x={600} y={60} s={1.1} /><Cloud x={80} y={90} s={0.8} />
      <rect y="400" width="800" height="100" fill={P2} />
      <path d="M90 400V250A310 250 0 0 1 710 250V400Z" fill={P1} stroke={P4} strokeWidth="6" />
      <path d="M90 400V250A310 250 0 0 1 710 250V400" fill="none" stroke={MIST} strokeOpacity=".15" strokeWidth="22" />
      <path d="M250 400V122M400 400V12M550 400V122M170 400V170M630 400V170" stroke={P4} strokeWidth="3" fill="none" />
      <path d="M400 12V400" stroke="none" />
      <path d="M100 250H700" stroke={P4} strokeWidth="3" />
      {/* fogger line */}
      <path d="M130 170H670" stroke={STEEL} strokeWidth="4" />
      {[190, 290, 400, 510, 610].map((x) => <g key={x}><circle cx={x} cy="178" r="5" fill={STEEL} /><circle cx={x} cy="206" r="14" fill="none" stroke={MIST} strokeOpacity=".15" strokeWidth="2" /></g>)}
      {/* plant beds */}
      {[130, 280, 430, 580].map((x) => <rect key={x} x={x} y="350" width="90" height="26" rx="3" fill={P3} />)}
      {[175, 325, 475, 625].map((x) => (
        <g key={x}>
          <path d={`M${x - 30} 350q-4-34 14-40M${x} 350q0-50 0-62M${x + 30} 350q4-34-14-40`} fill="none" stroke={GREEN} strokeWidth="5" strokeLinecap="round" />
          <ellipse cx={x - 22} cy="312" rx="16" ry="9" fill={GREEN} /><ellipse cx={x} cy="284" rx="12" ry="18" fill={GREEN} /><ellipse cx={x + 22} cy="312" rx="16" ry="9" fill={GREEN} />
        </g>
      ))}
      <Node x={196} y={206} dir={-30} />
      <rect x="130" y="376" width="540" height="8" fill={P4} />
    </>
  );
}

function PoultryShed() {
  return (
    <>
      <rect width="800" height="500" fill={BG} />
      <Cloud x={560} y={50} s={1} /><Cloud x={90} y={100} s={0.8} />
      <Floor y={390} />
      {/* roof */}
      <path d="M40 210L330 130H620L700 210Z" fill={P3} stroke={P4} strokeWidth="3" />
      {/* side wall */}
      <rect x="60" y="210" width="580" height="180" fill={P2} />
      <path d="M60 210H640" stroke={P4} strokeWidth="6" />
      <rect x="90" y="236" width="520" height="126" rx="6" fill="#0C1B2A" />
      <path d="M90 262L610 262" stroke={P3} strokeWidth="2" />
      {/* inside: drinker line, feeders, birds */}
      <path d="M100 252H600" stroke={STEEL} strokeOpacity=".6" strokeWidth="3" />
      {[170, 290, 410, 530].map((x) => (
        <g key={x}>
          <path d={`M${x} 252V288`} stroke={STEEL} strokeWidth="3" />
          <path d={`M${x - 20} 322L${x} 288L${x + 20} 322Z`} fill={P4} /><ellipse cx={x} cy="324" rx="26" ry="6" fill={STEEL} />
        </g>
      ))}
      {[120, 214, 240, 352, 470, 500, 580].map((x, i) => (
        <g key={x} fill={MIST} fillOpacity=".5">
          <ellipse cx={x} cy={344 - (i % 2) * 4} rx="14" ry="10" /><circle cx={x + 12} cy={334 - (i % 2) * 4} r="6" /><path d={`M${x - 14} ${340 - (i % 2) * 4}l-7-8l9 3z`} />
        </g>
      ))}
      <rect x="90" y="362" width="520" height="4" fill={P4} />
      {/* end wall */}
      <path d="M640 210L740 240V390H640Z" fill={P3} stroke={P4} strokeWidth="3" />
      <path d="M640 210L700 210L740 240" fill="none" stroke={P4} strokeWidth="3" />
      <g transform="translate(700 300) skewY(8)"><Fan x={-20} y={-22} r={22} /><Fan x={-20} y={34} r={22} /></g>
      <Node x={44} y={262} dir={-140} />
      <path d="M0 0" />
    </>
  );
}

function Pond() {
  return (
    <>
      <rect width="800" height="500" fill={BG} />
      <Cloud x={520} y={50} s={1.2} /><Cloud x={70} y={110} s={0.8} />
      <circle cx="690" cy="110" r="34" fill="none" stroke={MIST} strokeOpacity=".12" strokeWidth="3" />
      <path d="M0 270H800V500H0Z" fill={P2} />
      <path d="M0 250Q100 240 180 262L0 290Z" fill={P1} /><path d="M800 250Q700 244 640 262L800 290Z" fill={P1} />
      <path d="M0 270H800" stroke={P4} strokeWidth="2" />
      {[[400, 410, 190], [180, 440, 100], [650, 380, 120], [320, 470, 90]].map(([cx, cy, rx]) => (
        <ellipse key={`${cx}${cy}`} cx={cx} cy={cy} rx={rx} ry={rx * 0.12} fill="none" stroke={MIST} strokeOpacity=".14" strokeWidth="2" />
      ))}
      {/* aerator */}
      <rect x="400" y="305" width="230" height="22" rx="8" fill={STEEL} />
      <rect x="440" y="266" width="70" height="42" rx="6" fill={P4} stroke={STEEL} strokeWidth="3" />
      <path d="M475 266V240h60" fill="none" stroke={STEEL} strokeWidth="5" />
      <g transform="translate(480 318)">
        <circle r="10" fill={P4} />
        {[0, 60, 120, 180, 240, 300].map((a) => <rect key={a} x="-7" y="-46" width="14" height="30" rx="2" fill={TEAL} fillOpacity=".85" transform={`rotate(${a})`} />)}
        <circle r="46" fill="none" stroke={STEEL} strokeWidth="3" />
      </g>
      <path d="M520 360q16-26 34 0M552 372q14-22 28 0M440 372q-10-22-26-6" fill="none" stroke={MIST} strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" />
      <path d="M418 360q-16 4 -24 18M600 332q18-6 30 6" stroke={MIST} strokeOpacity=".25" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* pole sensor */}
      <rect x="146" y="140" width="10" height="260" fill={STEEL} />
      <rect x="132" y="198" width="38" height="46" rx="6" fill={P4} stroke={STEEL} strokeWidth="3" />
      <circle cx="151" cy="212" r="4" fill={GREEN} />
      <path d="M151 244V372" stroke={MIST} strokeOpacity=".5" strokeWidth="2" strokeDasharray="4 4" />
      <rect x="144" y="372" width="14" height="30" rx="7" fill={STEEL} />
      <path d="M118 380q33 10 66 0" fill="none" stroke={MIST} strokeOpacity=".25" strokeWidth="3" />
      <Node x={131} y={92} dir={-30} />
      <path d="M600 420q20-30 40-6" fill="none" stroke={MIST} strokeOpacity=".2" strokeWidth="3" strokeLinecap="round" />
    </>
  );
}

function FarmField() {
  const xs = [-300, -150, 0, 150, 300, 450, 600, 750, 900, 1050, 1200];
  return (
    <>
      <rect width="800" height="500" fill={BG} />
      <circle cx="610" cy="120" r="38" fill="none" stroke={MIST} strokeOpacity=".12" strokeWidth="3" />
      <Cloud x={110} y={80} s={1.1} /><Cloud x={360} y={130} s={0.7} />
      <path d="M0 232Q150 214 300 230T600 226T800 232V500H0Z" fill={P1} />
      {xs.slice(0, -1).filter((_, i) => i % 2 === 0).map((x, i) => (
        <path key={x} d={`M400 232L${x} 500H${xs[i * 2 + 1]}Z`} fill={P2} />
      ))}
      <path d={xs.map((x) => `M400 232L${x} 500`).join("")} stroke={P3} strokeWidth="2" />
      {/* seedlings */}
      <path d="M400 232L45 500M400 232L195 500M400 232L345 500M400 232L495 500M400 232L645 500" stroke={GREEN} strokeWidth="8" strokeDasharray="0 28" strokeLinecap="round" strokeOpacity=".0" />
      {[75, 225, 375, 525, 675].map((x) => (
        <path key={x} d={`M${400 + (x - 400) * 0.0} 232`} />
      ))}
      <path d="M400 236L110 500" stroke={GREEN} strokeWidth="9" strokeDasharray="0 34" strokeLinecap="round" />
      <path d="M400 236L235 500" stroke={GREEN} strokeWidth="9" strokeDasharray="0 34" strokeLinecap="round" />
      <path d="M400 236L560 500" stroke={GREEN} strokeWidth="9" strokeDasharray="0 34" strokeLinecap="round" />
      {/* drip line */}
      <path d="M400 236L328 500" stroke={STEEL} strokeWidth="4" />
      <path d="M400 236L328 500" stroke={TEAL} strokeWidth="6" strokeDasharray="0 30" strokeLinecap="round" />
      <path d="M355 440q-6 10 0 16M370 380q-4 8 0 12" fill="none" stroke={TEAL} strokeWidth="3" strokeLinecap="round" />
      {/* stake */}
      <rect x="500" y="330" width="14" height="150" fill={STEEL} />
      <path d="M500 480h14l-7 20z" fill={STEEL} />
      <path d="M440 480q60-12 130 0" stroke={P4} strokeWidth="6" strokeLinecap="round" fill="none" />
      <Node x={487} y={282} dir={-35} />
    </>
  );
}

function WaterTank() {
  return (
    <>
      <rect width="800" height="400" fill={P1} />
      <Floor y={400} />
      <Cloud x={560} y={40} s={1.1} /><Cloud x={80} y={70} s={0.8} />
      {/* stand */}
      <path d="M260 220L236 400M540 220L564 400M330 220V400M470 220V400" stroke={P4} strokeWidth="9" />
      <path d="M262 270L548 270M246 340L558 340" stroke={P4} strokeWidth="5" />
      <path d="M262 270L330 340M470 270L330 340M470 270L548 340" stroke={P4} strokeWidth="3" fill="none" />
      {/* tank */}
      <path d="M220 110V210a180 28 0 0 0 360 0V110" fill={P3} stroke={P4} strokeWidth="4" />
      <ellipse cx="400" cy="110" rx="180" ry="28" fill={P2} stroke={P4} strokeWidth="4" />
      <path d="M220 150a180 28 0 0 0 360 0" fill="none" stroke={P4} strokeWidth="3" />
      <rect x="470" y="100" width="40" height="10" rx="3" fill={STEEL} />
      <path d="M400 82V58" stroke={STEEL} strokeWidth="5" />
      <path d="M380 58h40" stroke={STEEL} strokeWidth="5" strokeLinecap="round" />
      {/* ladder */}
      <path d="M600 130V400M630 130V400" stroke={STEEL} strokeWidth="5" />
      <path d="M600 160h30M600 200h30M600 240h30M600 280h30M600 320h30M600 360h30" stroke={STEEL} strokeWidth="4" />
      {/* pipes and pump */}
      <path d="M400 238V400" stroke={STEEL} strokeWidth="14" />
      <path d="M400 380H150" stroke={STEEL} strokeWidth="14" />
      <rect x="60" y="350" width="90" height="48" rx="8" fill={P3} stroke={P4} strokeWidth="3" />
      <circle cx="170" cy="374" r="26" fill={P4} stroke={STEEL} strokeWidth="4" />
      <path d="M60 366h90M60 382h90" stroke={P4} strokeWidth="3" />
      <rect x="62" y="398" width="86" height="8" fill={P4} />
      <path d="M400 440H640" stroke={P3} strokeWidth="2" />
      <Node x={254} y={158} dir={-140} />
    </>
  );
}

function FactoryFloor() {
  return (
    <>
      <rect width="800" height="410" fill={P1} />
      <Floor y={410} />
      <path d="M0 80L70 30V80L140 30V80L210 30V80L280 30V80L350 30V80L420 30V80L490 30V80L560 30V80L630 30V80L700 30V80L770 30V80H800V30" fill="none" stroke={P2} strokeWidth="0" />
      <path d="M0 20H800" stroke={P3} strokeWidth="2" />
      {[40, 150, 260, 370, 480, 590, 700].map((x) => <rect key={x} x={x} y="56" width="70" height="46" rx="3" fill={P2} />)}
      {/* press */}
      <path d="M70 410V150h150V196H130V260h90V410Z" fill="none" />
      <rect x="70" y="132" width="150" height="50" fill={P3} stroke={P4} strokeWidth="3" />
      <rect x="90" y="182" width="110" height="26" fill={P4} />
      <rect x="132" y="208" width="26" height="60" fill={STEEL} />
      <rect x="104" y="268" width="82" height="16" fill={P4} />
      <rect x="70" y="284" width="150" height="26" fill={P3} stroke={P4} strokeWidth="3" />
      <rect x="84" y="310" width="122" height="100" fill={P2} stroke={P4} strokeWidth="3" />
      <rect x="86" y="132" width="12" height="154" fill={P2} /><rect x="192" y="132" width="12" height="154" fill={P2} />
      {/* lathe */}
      <rect x="290" y="300" width="230" height="22" rx="3" fill={P4} />
      <rect x="300" y="322" width="210" height="88" fill={P2} stroke={P4} strokeWidth="3" />
      <rect x="290" y="238" width="62" height="62" rx="4" fill={P3} stroke={P4} strokeWidth="3" />
      <circle cx="330" cy="270" r="14" fill="none" stroke={STEEL} strokeWidth="4" />
      <rect x="360" y="262" width="80" height="12" fill={STEEL} />
      <rect x="460" y="270" width="50" height="30" rx="3" fill={P3} stroke={P4} strokeWidth="2" />
      <rect x="440" y="244" width="14" height="26" fill={STEEL} />
      {/* tower light */}
      <rect x="570" y="240" width="8" height="170" fill={STEEL} />
      <rect x="556" y="404" width="36" height="8" fill={P4} />
      <rect x="558" y="174" width="32" height="22" rx="4" fill={GREEN} />
      <rect x="558" y="198" width="32" height="20" rx="4" fill={AMBER} fillOpacity=".2" />
      <rect x="558" y="220" width="32" height="20" rx="4" fill={RED} fillOpacity=".2" />
      <rect x="554" y="168" width="40" height="8" rx="3" fill={P4} />
      {/* conveyor */}
      <rect x="610" y="350" width="190" height="14" rx="7" fill={STEEL} />
      <path d="M630 364v46M780 364v46" stroke={P4} strokeWidth="6" />
      {[630, 670, 710, 750, 790].map((x) => <circle key={x} cx={x} cy="357" r="5" fill={P4} />)}
      <rect x="640" y="316" width="44" height="34" fill={P3} stroke={P4} strokeWidth="2" />
      <rect x="720" y="326" width="38" height="24" fill={P3} stroke={P4} strokeWidth="2" />
      <Node x={266} y={176} dir={-35} />
    </>
  );
}

function Truck() {
  return (
    <>
      <rect width="800" height="500" fill={BG} />
      <Cloud x={560} y={40} s={1.1} /><Cloud x={90} y={90} s={0.8} />
      <path d="M0 330L60 280L110 320L190 250L260 330ZM520 330L610 270L700 330Z" fill={P1} />
      <rect y="372" width="800" height="128" fill={P1} />
      <rect y="372" width="800" height="6" fill={P2} />
      <path d="M40 450H140M240 450H340M440 450H540M640 450H740" stroke={P4} strokeWidth="6" strokeLinecap="round" />
      {/* box */}
      <rect x="110" y="130" width="400" height="215" rx="10" fill={P3} stroke={P4} strokeWidth="4" />
      <rect x="126" y="146" width="368" height="183" rx="6" fill={P2} />
      <path d="M180 146V329M440 146V329" stroke={P3} strokeWidth="3" />
      <Snow x={310} y={238} s={26} o={0.8} />
      <circle cx="310" cy="238" r="46" fill="none" stroke={MIST} strokeOpacity=".18" strokeWidth="3" />
      {/* reefer unit */}
      <rect x="516" y="146" width="40" height="96" rx="6" fill={P4} stroke={STEEL} strokeWidth="2" />
      <path d="M526 164h20M526 178h20M526 192h20M526 206h20" stroke={BG} strokeWidth="3" strokeLinecap="round" />
      <circle cx="536" cy="226" r="5" fill={GREEN} />
      {/* cab */}
      <path d="M556 345V190L622 190Q640 190 652 214L690 262Q700 270 700 290V345Z" fill={P3} stroke={P4} strokeWidth="4" strokeLinejoin="round" />
      <path d="M594 208H620Q630 208 636 220L664 262H594Z" fill={BG} stroke={P4} strokeWidth="3" />
      <rect x="690" y="296" width="12" height="20" rx="3" fill={AMBER} />
      <rect x="110" y="345" width="590" height="14" fill={P4} />
      {/* wheels */}
      {[190, 450, 620].map((x) => (
        <g key={x}><circle cx={x} cy="372" r="36" fill={BG} stroke={P4} strokeWidth="4" /><circle cx={x} cy="372" r="15" fill={STEEL} /><circle cx={x} cy="372" r="5" fill={P4} /></g>
      ))}
      <Node x={130} y={70} dir={-35} />
    </>
  );
}

function Building() {
  return (
    <>
      <rect width="800" height="500" fill={BG} />
      <Cloud x={80} y={60} s={1} /><Cloud x={620} y={40} s={0.9} />
      <defs>
        <pattern id="building-win" width="64" height="62" patternUnits="userSpaceOnUse" x="250" y="160">
          <rect x="12" y="12" width="40" height="38" rx="3" fill={BG} stroke={P4} strokeWidth="2" />
          <path d="M32 12V50" stroke={P4} strokeWidth="2" />
        </pattern>
      </defs>
      <Floor y={420} />
      <rect x="60" y="250" width="150" height="170" fill={P1} /><rect x="590" y="220" width="150" height="200" fill={P1} />
      <rect x="76" y="270" width="118" height="140" fill="none" stroke={P2} strokeWidth="2" /><rect x="606" y="240" width="118" height="170" fill="none" stroke={P2} strokeWidth="2" />
      {/* main block */}
      <rect x="240" y="150" width="320" height="270" fill={P2} />
      <rect x="240" y="150" width="320" height="270" fill="url(#building-win)" />
      <rect x="226" y="136" width="348" height="22" fill={P3} stroke={P4} strokeWidth="2" />
      <rect x="370" y="360" width="60" height="60" rx="3" fill={BG} stroke={P4} strokeWidth="3" />
      <rect x="296" y="264" width="40" height="38" rx="3" fill={AMBER} fillOpacity=".55" />
      {/* roof tank */}
      <path d="M276 130l-6-50M324 130l6-50" stroke={P4} strokeWidth="4" />
      <path d="M262 72V122H340V72" fill={P3} stroke={P4} strokeWidth="3" />
      <ellipse cx="301" cy="72" rx="39" ry="9" fill={P2} stroke={P4} strokeWidth="3" />
      <path d="M262 98H340" stroke={P4} strokeWidth="3" />
      <path d="M342 110H372V420" fill="none" stroke={STEEL} strokeWidth="5" strokeOpacity=".7" />
      <Node x={420} y={88} dir={-30} />
      <path d="M340 104H420" stroke={P4} strokeWidth="0" />
    </>
  );
}

function DairyCooler() {
  return (
    <>
      <rect width="800" height="400" fill={P1} />
      <Floor />
      <path d="M0 330H800" stroke={P2} strokeWidth="2" />
      {/* tank */}
      <rect x="150" y="200" width="440" height="150" rx="75" fill="#2B3B4A" stroke={P4} strokeWidth="4" />
      <path d="M200 214H540" stroke="#fff" strokeOpacity=".14" strokeWidth="14" strokeLinecap="round" />
      <path d="M150 275H590" stroke={P4} strokeWidth="0" />
      <rect x="300" y="158" width="90" height="48" rx="8" fill={STEEL} stroke={P4} strokeWidth="3" />
      <rect x="326" y="140" width="38" height="20" rx="4" fill={P4} />
      <rect x="300" y="108" width="14" height="52" rx="2" fill={P4} /><rect x="296" y="98" width="70" height="14" rx="4" fill={STEEL} />
      {/* cutaway with milk and probe */}
      <rect x="420" y="228" width="120" height="76" rx="12" fill={MIST} fillOpacity=".85" stroke={P4} strokeWidth="3" />
      <path d="M426 244q16-8 30 0t30 0t30 0" fill="none" stroke="#fff" strokeWidth="3" />
      <path d="M470 160V280" stroke={STEEL} strokeWidth="5" strokeLinecap="round" />
      <path d="M470 206V190H520" fill="none" stroke={STEEL} strokeWidth="2.5" />
      <circle cx="470" cy="282" r="7" fill={TEAL} />
      {/* outlet and legs */}
      <rect x="124" y="296" width="36" height="14" rx="4" fill={STEEL} /><rect x="108" y="290" width="22" height="26" rx="4" fill={P4} />
      <rect x="190" y="350" width="22" height="50" fill={P4} /><rect x="528" y="350" width="22" height="50" fill={P4} />
      {/* condensing unit */}
      <rect x="610" y="264" width="130" height="136" rx="6" fill={P2} stroke={P4} strokeWidth="3" />
      <path d="M626 288H724M626 304H724M626 320H724" stroke={BG} strokeWidth="4" strokeLinecap="round" />
      <Fan x={675} y={366} r={22} />
      <path d="M590 300H610" stroke={STEEL} strokeWidth="6" />
      {/* milk can */}
      <path d="M44 400V300Q44 290 52 290H108Q116 290 116 300V400Z" fill={STEEL} stroke={P4} strokeWidth="3" />
      <path d="M54 270H106L110 290H50Z" fill={P4} />
      <rect x="50" y="256" width="60" height="16" rx="6" fill={STEEL} />
      <path d="M44 320H116M44 380H116" stroke={P4} strokeWidth="3" />
      <path d="M44 310q-18 4 -16 20M116 310q18 4 16 20" fill="none" stroke={P4} strokeWidth="5" strokeLinecap="round" />
      <Node x={514} y={100} dir={-35} />
    </>
  );
}

function HospitalWard() {
  return (
    <>
      <rect width="800" height="400" fill={P1} />
      <Floor />
      <rect x="0" y="330" width="800" height="12" fill={P2} />
      {/* ceiling light and window */}
      <rect x="320" y="22" width="160" height="14" rx="6" fill={MIST} fillOpacity=".18" />
      <rect x="520" y="70" width="190" height="130" rx="4" fill={BG} stroke={P4} strokeWidth="4" />
      <path d="M615 70V200M520 135H710" stroke={P4} strokeWidth="3" />
      <path d="M560 160h60v-10" stroke={MIST} strokeOpacity=".12" strokeWidth="14" />
      <path d="M452 96H450V330" stroke={STEEL} strokeWidth="0" />
      {/* medicine fridge on a counter */}
      <rect x="40" y="250" width="200" height="150" fill={P2} stroke={P4} strokeWidth="3" />
      <rect x="40" y="244" width="200" height="12" rx="3" fill={STEEL} />
      <rect x="70" y="150" width="110" height="94" rx="8" fill={P3} stroke={P4} strokeWidth="4" />
      <rect x="82" y="162" width="68" height="70" rx="4" fill="#0C1B2A" />
      <path d="M82 200H150" stroke={P4} strokeWidth="4" />
      <rect x="92" y="172" width="22" height="24" fill={MIST} /><rect x="120" y="180" width="22" height="16" fill="#9CC9D8" /><rect x="94" y="208" width="30" height="20" fill="#9CC9D8" /><rect x="128" y="206" width="16" height="22" fill={MIST} />
      <rect x="160" y="170" width="7" height="42" rx="3" fill={STEEL} />
      <path d="M120 270H200M120 300H200" stroke={P4} strokeWidth="3" />
      {/* IV stand */}
      <path d="M340 400V150" stroke={STEEL} strokeWidth="6" />
      <path d="M300 140H380" stroke={STEEL} strokeWidth="6" strokeLinecap="round" />
      <path d="M340 400L300 410M340 400L380 410" stroke={P4} strokeWidth="6" strokeLinecap="round" />
      <path d="M308 140V152M372 140V152" stroke={STEEL} strokeWidth="3" />
      <path d="M296 154H322V204Q322 214 309 214Q296 214 296 204Z" fill={TEAL} fillOpacity=".5" stroke={MIST} strokeWidth="2" />
      <path d="M309 214V258" stroke={MIST} strokeOpacity=".7" strokeWidth="2" />
      <path d="M309 258Q309 330 400 340" fill="none" stroke={MIST} strokeOpacity=".5" strokeWidth="2" />
      {/* bed */}
      <rect x="440" y="224" width="12" height="176" fill={P4} />
      <rect x="440" y="230" width="300" height="20" fill={P4} />
      <rect x="452" y="206" width="280" height="30" rx="14" fill={MIST} fillOpacity=".8" />
      <rect x="455" y="190" width="70" height="22" rx="10" fill={MIST} />
      <rect x="452" y="248" width="280" height="22" rx="3" fill={P3} />
      <path d="M470 270V290H730V270" fill="none" stroke={P4} strokeWidth="4" />
      <rect x="728" y="206" width="12" height="194" fill={P4} />
      <path d="M470 292V400M720 292V400" stroke={P4} strokeWidth="6" />
      <circle cx="470" cy="408" r="8" fill={STEEL} /><circle cx="720" cy="408" r="8" fill={STEEL} />
      <path d="M470 400H720" stroke={P4} strokeWidth="0" />
      <rect x="600" y="206" width="132" height="64" rx="8" fill={AMBER} fillOpacity="0" />
      <Node x={228} y={116} dir={-35} />
    </>
  );
}

const SCENE_ART: Record<SceneKey, () => ReactNode> = {
  "cold-room": ColdRoom, "medical-fridge": MedicalFridge, kitchen: Kitchen, warehouse: Warehouse,
  "server-room": ServerRoom, greenhouse: Greenhouse, "poultry-shed": PoultryShed, pond: Pond,
  "farm-field": FarmField, "water-tank": WaterTank, "factory-floor": FactoryFloor, truck: Truck,
  building: Building, "dairy-cooler": DairyCooler, "hospital-ward": HospitalWard,
};

export function Scene({ name, className, title }: { name: SceneKey; className?: string; title?: string }) {
  const Art = SCENE_ART[name];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={title ?? DEFAULT_TITLES[name]}
      className={className}
    >
      <rect width="800" height="500" fill={BG} />
      <Art />
    </svg>
  );
}
