import type { ReactNode } from "react";
import type { DeviceKey } from "../../lib/catalogue/types";

/* Original flat front-view device illustrations, 400x300, transparent background.
   Light housing with Deep Space linework so they read on dark and light cards. Server component, pure inline SVG.
   No model numbers and no spec text inside the art. */

const INK = "#0A1622", HOUSE = "#E3EBF0", HOUSE2 = "#F4F8FA", SHADE = "#C3D2DC", STEEL = "#8FA6B8", SLATE = "#566879";
const TEAL = "#14D1BC", TEAL_D = "#0A8F80", AMBER = "#FFB224", RED = "#F0524F", GREEN = "#2BC77A";
const SOIL1 = "#9A7B5F", SOIL2 = "#7C6048", WATER = "#14D1BC";

export const DEVICE_META: Record<DeviceKey, { name: string; caption: string }> = {
  "gateway-probe": { name: "Gateway probe", caption: "A sealed box with a coiled probe cable that reads temperature and sends it on its own." },
  "climate-node": { name: "Climate node", caption: "A wall unit with a vented sensor head for room temperature and humidity." },
  "server-node": { name: "Server room node", caption: "A rack-side box with a leak rope that watches heat and water on the floor." },
  "door-sensor": { name: "Door sensor", caption: "A two-part magnetic switch that notices when a door is left open." },
  "leak-rope": { name: "Leak rope node", caption: "A small node with a sensing rope that you lay where water might collect." },
  "tank-level": { name: "Tank level sensor", caption: "An ultrasonic head on the tank lid that measures how full the tank is." },
  "clamp-meter": { name: "Clamp power meter", caption: "A DIN-rail box with split clamps that read current without cutting a cable." },
  "vibration-puck": { name: "Vibration puck", caption: "A magnetic puck that sits on a motor and listens for changes in how it shakes." },
  "air-quality": { name: "Air quality monitor", caption: "A wall unit that samples the air and shows the reading on a small display." },
  "soil-stake": { name: "Soil stake", caption: "A solar-topped stake that goes into the ground and reads the soil." },
  "water-probe": { name: "Water probe", caption: "A pole-mounted solar box with a probe that hangs in the water." },
  "gps-tracker": { name: "GPS tracker", caption: "A box with an antenna that reports where a vehicle or asset is." },
  "counter-sensor": { name: "Counter sensor", caption: "A proximity sensor that counts parts as they pass on a conveyor." },
};

/* ---------------------------------------------------------------- shared bits */

const SW = 3;
const line = { stroke: INK, strokeWidth: SW, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

/** The ConnectAtom mark (colour version), size s, top-left at x,y. */
function Mark(p: { x: number | string; y: number | string; s: number }) {
  const x = +p.x, y = +p.y, s = p.s;
  return (
    <g transform={`translate(${x} ${y}) scale(${s / 100})`}>
      <path d="M73.29 29.07A34 34 0 1 0 73.29 70.93" fill="none" stroke={INK} strokeWidth="9" strokeLinecap="round" />
      <line x1="46.5" y1="50" x2="84.5" y2="50" stroke={TEAL_D} strokeWidth="6.5" />
      <circle cx="46.5" cy="50" r="9.5" fill={TEAL_D} />
      <circle cx="84.5" cy="50" r="7.5" fill={TEAL_D} />
    </g>
  );
}

/** Light plastic housing with a top highlight and a bottom shade. */
function Box(p: { x: number | string; y: number | string; w: number | string; h: number | string; r?: number | string }) {
  const x = +p.x, y = +p.y, w = +p.w, h = +p.h, r = Number(p.r ?? 12);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={HOUSE} {...line} />
      <path d={`M${x + 6} ${y + h - 8}H${x + w - 6}`} stroke={SHADE} strokeWidth="4" strokeLinecap="round" />
      <path d={`M${x + r} ${y + 7}H${x + w - r}`} stroke={HOUSE2} strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

function Led({ x, y, r = 6 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r + 5} fill={TEAL} opacity=".28" />
      <circle cx={x} cy={y} r={r} fill={TEAL} stroke={INK} strokeWidth="2.5" />
      <circle cx={x - r / 3} cy={y - r / 3} r={r / 4} fill="#fff" opacity=".8" />
    </g>
  );
}

function Screw(p: { x: number | string; y: number | string; r?: number }) {
  const x = +p.x, y = +p.y, r = p.r ?? 3.5;
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={SHADE} stroke={INK} strokeWidth="2" />
      <path d={`M${x - r + 1} ${y + 1}L${x + r - 1} ${y - 1}`} stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
    </g>
  );
}

/** Cable gland: nut and neck, pointing down from (x, y) which is the housing edge. */
function Gland({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x - 8} y={y - 2} width="16" height="9" rx="2" fill={SHADE} {...line} strokeWidth="2.5" />
      <rect x={x - 11} y={y + 6} width="22" height="11" rx="3" fill={HOUSE2} {...line} strokeWidth="2.5" />
      <path d={`M${x - 5} ${y + 9}V${y + 14}M${x + 5} ${y + 9}V${y + 14}`} stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
    </g>
  );
}

/** A cable: dark sheath with a lighter core line. */
function Cable({ d, w = 6, core = SLATE }: { d: string; w?: number; core?: string }) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke={INK} strokeWidth={w + 3} />
      <path d={d} stroke={core} strokeWidth={w - 1.5} />
    </g>
  );
}

/** Helix path (a coiled cable seen from the front), starting at (x, y0) and winding down. */
function coil(x: number, y0: number, turns: number, rx: number, ry: number, pitch: number) {
  const pts: string[] = [];
  const steps = turns * 24;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * turns * 2 * Math.PI;
    const px = x + rx * Math.sin(t);
    const py = y0 + (pitch * t) / (2 * Math.PI) + ry * (1 - Math.cos(t));
    pts.push(`${i === 0 ? "M" : "L"}${px.toFixed(1)} ${py.toFixed(1)}`);
  }
  return pts.join("");
}

/** Round-ish water drop. */
function Drop({ x, y, s = 1, o = 1 }: { x: number; y: number; s?: number; o?: number }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 -10C4 -3 8 1 8 5A8 8 0 0 1 -8 5C-8 1 -4 -3 0 -10Z"
      fill={WATER} fillOpacity={o} stroke={INK} strokeWidth={2.5 / s} strokeLinejoin="round"
    />
  );
}

/** Solar panel, parallelogram with cell grid. */
function Solar({ x, y, w, h, skew = 14 }: { x: number; y: number; w: number; h: number; skew?: number }) {
  const cols = 4;
  const lines: string[] = [];
  for (let i = 1; i < cols; i++) {
    const t = i / cols;
    lines.push(`M${x + skew + w * t - skew * 0} ${y}L${x + w * t} ${y + h}`);
  }
  return (
    <g>
      <path d={`M${x + skew} ${y}H${x + w + skew}L${x + w} ${y + h}H${x}Z`} fill="#17415A" {...line} />
      <path d={lines.join("")} stroke={TEAL} strokeOpacity=".7" strokeWidth="1.8" />
      <path d={`M${x + skew / 2} ${y + h / 2}H${x + w + skew / 2}`} stroke={TEAL} strokeOpacity=".7" strokeWidth="1.8" />
      <path d={`M${x + skew + 5} ${y + 3}H${x + skew + 30}`} stroke="#fff" strokeOpacity=".45" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

function Arcs({ cx, cy, dir, rs = [14, 26, 38], w = 3 }: { cx: number; cy: number; dir: number; rs?: number[]; w?: number }) {
  const a1 = ((dir - 35) * Math.PI) / 180, a2 = ((dir + 35) * Math.PI) / 180;
  return (
    <g fill="none" stroke={TEAL} strokeWidth={w} strokeLinecap="round">
      {rs.map((r, i) => (
        <path
          key={r}
          strokeOpacity={1 - i * 0.22}
          d={`M${(cx + r * Math.cos(a1)).toFixed(1)} ${(cy + r * Math.sin(a1)).toFixed(1)}A${r} ${r} 0 0 1 ${(cx + r * Math.cos(a2)).toFixed(1)} ${(cy + r * Math.sin(a2)).toFixed(1)}`}
        />
      ))}
    </g>
  );
}

/* ---------------------------------------------------------------- devices */

function GatewayProbe() {
  return (
    <g>
      {/* mounting ears */}
      <rect x="96" y="50" width="24" height="26" rx="6" fill={SHADE} {...line} />
      <rect x="280" y="50" width="24" height="26" rx="6" fill={SHADE} {...line} />
      <Screw x="105" y="63" /><Screw x="295" y="63" />
      <Box x="110" y="34" w="180" h="132" r="14" />
      {/* sealed lid line */}
      <path d="M122 152H278" stroke={SHADE} strokeWidth="2" />
      <Mark x={128} y={50} s={54} />
      <path d="M132 118H190M132 130H168" stroke={STEEL} strokeWidth="4" strokeLinecap="round" />
      <Led x={256} y={62} />
      {/* buzzer grille */}
      <circle cx="248" cy="112" r="22" fill={HOUSE2} {...line} />
      <path d="M233 102H263M230 112H266M233 122H263" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      {/* glands */}
      <Gland x={158} y={166} />
      <Gland x={240} y={166} />
      {/* power lead going left */}
      <Cable d="M158 183C158 212 110 206 76 220C58 227 48 236 36 238" />
      <rect x="14" y="230" width="24" height="16" rx="4" fill={HOUSE2} {...line} />
      {/* coiled probe cable */}
      <Cable d={coil(240, 183, 4, 26, 7, 13)} w={5} />
      <Cable d="M240 243C240 262 270 268 300 266" />
      {/* steel probe tip */}
      <rect x="298" y="256" width="56" height="20" rx="3" fill={STEEL} {...line} />
      <path d="M354 256L376 266L354 276Z" fill={STEEL} {...line} />
      <path d="M304 261H350" stroke={HOUSE2} strokeWidth="3" strokeLinecap="round" />
      <rect x="298" y="254" width="12" height="24" rx="3" fill={SHADE} {...line} />
    </g>
  );
}

function ClimateNode() {
  return (
    <g>
      <Box x="132" y="22" w="136" h="136" r="16" />
      <Screw x="146" y="36" /><Screw x="254" y="36" />
      <Mark x={150} y={46} s={52} />
      <Led x={238} y={66} />
      <path d="M150 112H250M150 126H226" stroke={STEEL} strokeWidth="4" strokeLinecap="round" />
      {/* neck */}
      <rect x="184" y="158" width="32" height="22" fill={SHADE} {...line} />
      {/* vented sensor head: stacked louvres */}
      <g>
        <rect x="158" y="178" width="84" height="94" rx="10" fill={HOUSE} {...line} />
        {[188, 204, 220, 236, 252].map((y) => (
          <g key={y}>
            <path d={`M164 ${y}H236L230 ${y + 10}H170Z`} fill={HOUSE2} {...line} strokeWidth="2.5" />
          </g>
        ))}
        <path d="M170 266H230" stroke={SHADE} strokeWidth="4" strokeLinecap="round" />
      </g>
      {/* air flow */}
      <g fill="none" stroke={TEAL} strokeWidth="3" strokeLinecap="round">
        <path d="M82 206C100 196 116 216 138 206" strokeOpacity=".9" />
        <path d="M70 232C92 222 112 242 142 232" strokeOpacity=".65" />
        <path d="M262 206C284 196 300 216 322 206" strokeOpacity=".9" />
        <path d="M258 232C288 222 308 242 330 232" strokeOpacity=".65" />
      </g>
    </g>
  );
}

function RackPosts() {
  return (
    <g>
      {[28, 346].map((x) => (
        <g key={x}>
          <rect x={x} y="22" width="26" height="236" rx="4" fill={SHADE} {...line} />
          {[40, 70, 100, 130, 160, 190, 220].map((y) => (
            <rect key={y} x={x + 8} y={y} width="10" height="12" rx="2" fill={INK} opacity=".75" />
          ))}
        </g>
      ))}
    </g>
  );
}

function ServerNode() {
  return (
    <g>
      <RackPosts />
      {/* rack-mount ears */}
      <rect x="54" y="52" width="26" height="64" rx="4" fill={SHADE} {...line} />
      <rect x="320" y="52" width="26" height="64" rx="4" fill={SHADE} {...line} />
      <rect x="60" y="62" width="10" height="12" rx="2" fill={INK} opacity=".75" />
      <rect x="330" y="94" width="10" height="12" rx="2" fill={INK} opacity=".75" />
      <Box x="76" y="46" w="248" h="76" r="10" />
      <Mark x={94} y={58} s={46} />
      <path d="M152 76H232M152 92H206" stroke={STEEL} strokeWidth="4" strokeLinecap="round" />
      <Led x={290} y={70} />
      <path d="M258 98H306" stroke={SHADE} strokeWidth="5" strokeLinecap="round" />
      <Gland x={200} y={122} />
      {/* leak rope loop on the floor */}
      <path d="M200 139V160" stroke={INK} strokeWidth="9" strokeLinecap="round" />
      <Cable d="M200 139V160C200 178 150 176 108 190C66 204 70 258 130 262C200 268 300 268 332 250C364 232 346 196 296 190C250 184 200 196 200 160" w={8} core={STEEL} />
      <path d="M200 139V160" stroke={SLATE} strokeWidth="5" strokeLinecap="round" />
      {/* braid ticks */}
      <path
        d="M130 262C200 268 300 268 332 250"
        fill="none" stroke={INK} strokeWidth="6" strokeDasharray="2 7" opacity=".55"
      />
      <Drop x={236} y={236} s={0.9} />
      <Drop x={178} y={246} s={0.7} o={0.8} />
      <path d="M92 280H308" stroke={TEAL} strokeWidth="4" strokeLinecap="round" strokeOpacity=".7" />
    </g>
  );
}

function DoorSensor() {
  return (
    <g>
      {/* frame post (fixed side) */}
      <rect x="30" y="20" width="132" height="262" rx="4" fill={SHADE} {...line} />
      <rect x="44" y="34" width="104" height="234" rx="2" fill={HOUSE} {...line} strokeWidth="2.5" />
      {/* door leaf (moving side) */}
      <rect x="242" y="20" width="130" height="262" rx="4" fill={HOUSE} {...line} />
      <rect x="256" y="34" width="102" height="234" rx="2" fill={HOUSE2} {...line} strokeWidth="2.5" />
      <rect x="256" y="140" width="14" height="40" rx="5" fill={STEEL} {...line} strokeWidth="2.5" />
      {/* reed body on the frame */}
      <Box x="104" y="106" w="48" h={70} r={8} />
      <Led x={128} y={124} r={5} />
      <path d="M114 150H142M114 160H134" stroke={STEEL} strokeWidth="3.5" strokeLinecap="round" />
      {/* magnet on the door */}
      <rect x="244" y="116" width="26" height="50" rx="5" fill={HOUSE2} {...line} />
      <rect x="244" y="116" width="26" height="22" rx="5" fill={RED} {...line} />
      <rect x="244" y="141" width="26" height="25" rx="5" fill={STEEL} {...line} />
      {/* field between them */}
      <g fill="none" stroke={TEAL} strokeWidth="3" strokeLinecap="round" strokeDasharray="2 9">
        <path d="M154 131H242" />
        <path d="M154 151H242" />
      </g>
      <path d="M162 141H234M222 132L234 141L222 150" fill="none" stroke={TEAL} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* gap marks */}
      <path d="M162 50V250M242 50V250" stroke={INK} strokeWidth="2" strokeDasharray="4 6" opacity=".35" />
    </g>
  );
}

function LeakRope() {
  return (
    <g>
      {/* pipe with a drip */}
      <rect x="14" y="26" width="372" height="26" rx="6" fill={SHADE} {...line} />
      <rect x="236" y="22" width="28" height="34" rx="5" fill={HOUSE2} {...line} />
      <path d="M244 56L244 60M256 56L256 60" stroke={INK} strokeWidth="2.5" />
      <Drop x={250} y={98} s={1} />
      <Drop x={250} y={140} s={0.75} o={0.85} />
      {/* node */}
      <Box x="46" y="112" w="104" h="72" r="12" />
      <Mark x={58} y={124} s={34} />
      <path d="M100 134H134M100 146H124" stroke={STEEL} strokeWidth="3.5" strokeLinecap="round" />
      <Led x={134} y={162} r={5} />
      <Gland x={80} y={184} />
      {/* puddle */}
      <ellipse cx="250" cy="258" rx="112" ry="20" fill={WATER} fillOpacity=".35" stroke={TEAL} strokeWidth="3" />
      {/* rope in a loop through the puddle */}
      <Cable d="M80 201C80 250 120 268 180 262C230 266 306 272 340 254C366 240 340 218 300 224C250 232 190 240 176 252" w={8} core={STEEL} />
      <path d="M180 262C230 266 306 272 340 254" fill="none" stroke={INK} strokeWidth="6" strokeDasharray="2 7" opacity=".55" />
      <path d="M40 286H360" stroke={INK} strokeWidth="2.5" strokeLinecap="round" opacity=".25" />
    </g>
  );
}

function TankLevel({ id }: { id: string }) {
  return (
    <g>
      <defs>
        <clipPath id={`${id}-tank`}>
          <rect x="76" y="132" width="248" height="142" rx="10" />
        </clipPath>
      </defs>
      {/* tank body */}
      <rect x="76" y="132" width="248" height="142" rx="10" fill={HOUSE} {...line} />
      <g clipPath={`url(#${id}-tank)`}>
        <rect x="76" y="196" width="248" height="90" fill={WATER} fillOpacity=".55" />
        <path d="M76 196C100 188 120 204 144 196S190 188 214 196S260 204 284 196S310 190 324 196" fill="none" stroke={TEAL} strokeWidth="4" />
        <path d="M76 132V274" stroke={HOUSE2} strokeWidth="10" opacity=".7" />
      </g>
      <rect x="76" y="132" width="248" height="142" rx="10" fill="none" {...line} />
      {/* ribs */}
      <path d="M76 160H324" stroke={SHADE} strokeWidth="2.5" />
      {/* lid */}
      <rect x="66" y="112" width="268" height="24" rx="8" fill={SHADE} {...line} />
      {/* threaded neck */}
      <rect x="176" y="92" width="48" height="22" rx="3" fill={HOUSE2} {...line} />
      <path d="M180 100H220M180 107H220" stroke={INK} strokeWidth="2" opacity=".6" />
      {/* ultrasonic head */}
      <rect x="160" y="22" width="80" height="72" rx="12" fill={HOUSE} {...line} />
      <path d="M172 29H228" stroke={HOUSE2} strokeWidth="4" strokeLinecap="round" />
      <Mark x={172} y={36} s={30} />
      <Led x={218} y={52} r={5} />
      <rect x="170" y="74" width="60" height="12" rx="3" fill={INK} opacity=".85" />
      {/* sound path */}
      <g fill="none" stroke={TEAL} strokeWidth="3.5" strokeLinecap="round">
        <path d="M168 150Q200 166 232 150" strokeOpacity=".95" />
        <path d="M156 158Q200 182 244 158" strokeOpacity=".7" />
        <path d="M144 166Q200 198 256 166" strokeOpacity=".45" />
      </g>
      {/* cable out */}
      <Cable d="M240 52C268 52 286 40 312 40" w={5} />
    </g>
  );
}

function ClampMeter() {
  const clamp = (cx: number) => (
    <g>
      {/* cable */}
      <Cable d={`M${cx} 166V292`} w={11} />
      {/* split-core CT clamp */}
      <rect x={cx - 34} y="186" width="68" height="70" rx="12" fill={HOUSE} {...line} />
      <circle cx={cx} cy="226" r="17" fill="#17415A" {...line} />
      <path d={`M${cx - 34} 226H${cx - 17}M${cx + 17} 226H${cx + 34}`} stroke={INK} strokeWidth="3" />
      {/* hinge and latch */}
      <rect x={cx - 38} y="200" width="8" height="14" rx="2" fill={SHADE} {...line} strokeWidth="2.5" />
      <rect x={cx + 30} y="238" width="8" height="12" rx="2" fill={SHADE} {...line} strokeWidth="2.5" />
      <path d={`M${cx - 20} 194H${cx + 20}`} stroke={HOUSE2} strokeWidth="4" strokeLinecap="round" />
      {/* cable crossing through the clamp */}
      <path d={`M${cx} 209V243`} stroke={SLATE} strokeWidth="9" strokeLinecap="round" />
      <path d={`M${cx} 209V243`} stroke={INK} strokeWidth="9" strokeLinecap="round" opacity=".15" />
      {/* lead up to the unit */}
      <Cable d={`M${cx} 186C${cx} 170 ${cx} 160 ${cx} 150`} w={4} core={AMBER} />
    </g>
  );
  return (
    <g>
      {/* DIN rail */}
      <rect x="28" y="124" width="344" height="24" rx="3" fill={STEEL} {...line} />
      {[48, 84, 120, 156, 192, 228, 264, 300, 336].map((x) => (
        <rect key={x} x={x} y="131" width="18" height="10" rx="5" fill={INK} opacity=".7" />
      ))}
      {/* unit */}
      <Box x="86" y="14" w="228" h="110" r="10" />
      <rect x="86" y="108" width="228" height="22" rx="4" fill={SHADE} {...line} />
      <Mark x={104} y={28} s={50} />
      <path d="M168 44H252M168 60H228" stroke={STEEL} strokeWidth="4" strokeLinecap="round" />
      <Led x={282} y={40} />
      {/* terminal screws on the bottom strip */}
      {[110, 140, 170, 230, 260, 290].map((x) => (
        <rect key={x} x={x - 7} y="112" width="14" height="14" rx="3" fill={HOUSE2} {...line} strokeWidth="2.2" />
      ))}
      {clamp(130)}
      {clamp(270)}
    </g>
  );
}

function VibrationPuck() {
  return (
    <g>
      {/* motor feet */}
      <path d="M72 262H128V246H72ZM272 262H328V246H272Z" fill={SHADE} {...line} />
      <rect x="60" y="258" width="80" height="14" rx="3" fill={SLATE} {...line} />
      <rect x="260" y="258" width="80" height="14" rx="3" fill={SLATE} {...line} />
      {/* shaft */}
      <rect x="360" y="190" width="30" height="22" rx="3" fill={STEEL} {...line} />
      <path d="M368 196H386" stroke={HOUSE2} strokeWidth="3" strokeLinecap="round" />
      {/* motor body */}
      <rect x="46" y="140" width="318" height="116" rx="12" fill={HOUSE} {...line} />
      {/* end bells */}
      <rect x="40" y="150" width="30" height="96" rx="8" fill={SHADE} {...line} />
      <rect x="344" y="150" width="26" height="96" rx="8" fill={SHADE} {...line} />
      {/* cooling fins */}
      {Array.from({ length: 11 }, (_, i) => 90 + i * 22).map((x) => (
        <path key={x} d={`M${x} 152V244`} stroke={INK} strokeWidth="3" strokeLinecap="round" />
      ))}
      {Array.from({ length: 11 }, (_, i) => 94 + i * 22).map((x) => (
        <path key={x} d={`M${x} 152V244`} stroke={HOUSE2} strokeWidth="3" strokeLinecap="round" />
      ))}
      <rect x="168" y="124" width="64" height="18" rx="4" fill={SHADE} {...line} />
      {/* the puck */}
      <rect x="164" y="104" width="72" height="22" rx="4" fill={STEEL} {...line} />
      <path d="M170 116H230" stroke={INK} strokeWidth="2" opacity=".5" />
      <rect x="168" y="72" width="64" height="34" rx="12" fill={HOUSE} {...line} />
      <path d="M180 79H220" stroke={HOUSE2} strokeWidth="4" strokeLinecap="round" />
      <Mark x={174} y={78} s={26} />
      <Led x={218} y={90} r={5} />
      {/* vibration waves */}
      <g fill="none" stroke={TEAL} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M30 70L52 70L62 48L76 94L88 56L100 80L110 70L148 70" strokeOpacity=".9" />
        <path d="M252 70L290 70L300 80L312 56L324 94L338 48L348 70L370 70" strokeOpacity=".9" />
        <path d="M60 104H120M280 104H340" strokeOpacity=".4" />
      </g>
    </g>
  );
}

function AirQuality() {
  return (
    <g>
      <Box x="112" y="20" w="176" h="226" r="22" />
      <Screw x="130" y="38" /><Screw x="270" y="38" />
      {/* intake slot */}
      <rect x="136" y="52" width="128" height="20" rx="10" fill={INK} {...line} />
      <path d="M150 62H250" stroke={STEEL} strokeWidth="4" strokeLinecap="round" strokeDasharray="10 6" />
      {/* display */}
      <rect x="140" y="92" width="120" height="86" rx="12" fill={INK} {...line} />
      <circle cx="176" cy="135" r="22" fill="none" stroke="#17415A" strokeWidth="7" />
      <path d="M176 113A22 22 0 1 1 156.6 145" fill="none" stroke={TEAL} strokeWidth="7" strokeLinecap="round" />
      <path d="M212 112H246M212 128H238M212 144H246M212 160H230" stroke={TEAL} strokeWidth="5" strokeLinecap="round" strokeOpacity=".85" />
      <path d="M146 100H168" stroke="#fff" strokeOpacity=".3" strokeWidth="3" strokeLinecap="round" />
      {/* side exhaust slats */}
      <g stroke={INK} strokeWidth="3" strokeLinecap="round">
        <path d="M140 200H214M140 212H214M140 224H214" />
      </g>
      <Mark x={228} y={196} s={34} />
      {/* air in */}
      <g fill="none" stroke={TEAL} strokeWidth="3" strokeLinecap="round">
        <path d="M32 54C52 46 64 64 86 54" strokeOpacity=".9" />
        <path d="M24 80C48 70 66 90 92 80" strokeOpacity=".6" />
        <path d="M320 58C338 50 352 66 374 58" strokeOpacity=".9" />
        <path d="M312 84C336 74 354 94 380 84" strokeOpacity=".6" />
      </g>
      {/* particles */}
      <g fill={STEEL} opacity=".85">
        <circle cx="52" cy="104" r="4" /><circle cx="78" cy="122" r="3" /><circle cx="40" cy="140" r="3.5" />
        <circle cx="350" cy="116" r="4" /><circle cx="332" cy="140" r="3" /><circle cx="362" cy="150" r="3.5" />
      </g>
    </g>
  );
}

function SoilStake({ id }: { id: string }) {
  return (
    <g>
      <defs>
        <clipPath id={`${id}-ground`}>
          <rect x="20" y="182" width="360" height="106" rx="10" />
        </clipPath>
      </defs>
      {/* ground */}
      <g clipPath={`url(#${id}-ground)`}>
        <rect x="20" y="182" width="360" height="106" fill={SOIL2} />
        <rect x="20" y="182" width="360" height="26" fill={SOIL1} />
        <g fill={INK} opacity=".35">
          <circle cx="60" cy="232" r="4" /><circle cx="110" cy="256" r="5" /><circle cx="300" cy="240" r="4" />
          <circle cx="340" cy="266" r="5" /><circle cx="260" cy="272" r="3" /><circle cx="76" cy="276" r="3" />
        </g>
        <path d="M20 208H380" stroke={INK} strokeWidth="2.5" opacity=".6" />
        {/* moisture */}
        <g fill={TEAL}>
          <circle cx="150" cy="226" r="3.5" /><circle cx="160" cy="250" r="3" /><circle cx="248" cy="232" r="3.5" /><circle cx="238" cy="262" r="3" />
        </g>
      </g>
      <path d="M20 182H380" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      {/* grass */}
      <g fill="none" stroke={GREEN} strokeWidth="4" strokeLinecap="round">
        <path d="M52 182C52 168 48 160 44 154M52 182C54 166 60 160 64 156M330 182C330 168 326 160 322 154M330 182C332 168 338 160 342 156M340 182C340 172 344 166 350 164" />
      </g>
      {/* stake rod */}
      <path d="M190 130H210V256L200 278L190 256Z" fill={STEEL} {...line} />
      <path d="M195 136V250" stroke={HOUSE2} strokeWidth="3" strokeLinecap="round" />
      {[196, 224].map((y) => (
        <path key={y} d={`M190 ${y}H210`} stroke={INK} strokeWidth="5" />
      ))}
      {/* head box */}
      <Box x="166" y="82" w="68" h="52" r="10" />
      <Mark x={176} y={90} s={26} />
      <Led x={218} y={100} r={4.5} />
      <path d="M178 120H222" stroke={STEEL} strokeWidth="3.5" strokeLinecap="round" />
      {/* solar top */}
      <rect x="196" y="72" width="8" height="12" fill={SHADE} {...line} strokeWidth="2.5" />
      <Solar x={140} y={36} w={112} h={38} skew={22} />
      {/* wave from the stake */}
      <Arcs cx={238} cy={110} dir={-20} rs={[20, 34, 48]} />
    </g>
  );
}

function WaterProbe({ id }: { id: string }) {
  return (
    <g>
      <defs>
        <clipPath id={`${id}-water`}>
          <rect x="16" y="214" width="368" height="72" rx="10" />
        </clipPath>
      </defs>
      {/* solar panel */}
      <Solar x={44} y={16} w={140} h={36} skew={20} />
      <rect x="104" y="50" width="8" height="10" fill={SHADE} {...line} strokeWidth="2.5" />
      {/* box */}
      <Box x="52" y="60" w="130" h="76" r="12" />
      <Mark x={66} y={74} s={42} />
      <path d="M118 88H164M118 102H150" stroke={STEEL} strokeWidth="4" strokeLinecap="round" />
      <Led x={160} y={120} r={5} />
      <Gland x={140} y={136} />
      {/* pole */}
      <rect x="92" y="136" width="14" height="94" fill={STEEL} {...line} />
      <path d="M97 140V226" stroke={HOUSE2} strokeWidth="3" strokeLinecap="round" />
      <rect x="70" y="124" width="58" height="12" rx="3" fill={SLATE} {...line} />
      {/* water */}
      <g clipPath={`url(#${id}-water)`}>
        <rect x="16" y="214" width="368" height="80" fill={WATER} fillOpacity=".4" />
        <path d="M16 222C44 212 70 232 98 222S154 212 182 222S238 232 266 222S322 212 350 222S376 226 384 222" fill="none" stroke={TEAL} strokeWidth="4" />
        <path d="M30 252C60 244 80 260 110 252M250 262C280 254 300 270 330 262" fill="none" stroke={TEAL} strokeWidth="3" strokeOpacity=".6" />
      </g>
      {/* probe cable into the water */}
      <Cable d="M140 156C140 190 190 176 236 190C268 200 268 230 268 252" w={5} />
      <rect x="254" y="236" width="28" height="56" rx="8" fill={STEEL} {...line} />
      <path d="M260 244V284" stroke={HOUSE2} strokeWidth="3" strokeLinecap="round" />
      <path d="M254 258H282" stroke={INK} strokeWidth="3" />
      <rect x="258" y="228" width="20" height="12" rx="3" fill={SHADE} {...line} strokeWidth="2.5" />
      {/* signal */}
      <Arcs cx={176} cy={80} dir={-30} rs={[22, 36, 50]} />
    </g>
  );
}

function GpsTracker() {
  return (
    <g transform="translate(0 8)">
      {/* antenna */}
      <rect x="244" y="64" width="26" height="34" rx="5" fill={SHADE} {...line} />
      <path d="M257 64V30" stroke={INK} strokeWidth="14" strokeLinecap="round" />
      <path d="M257 64V30" stroke={HOUSE} strokeWidth="9" strokeLinecap="round" />
      <path d="M254 58V34" stroke={HOUSE2} strokeWidth="2.5" strokeLinecap="round" />
      <Arcs cx={257} cy={30} dir={-90} rs={[12, 24, 36]} />
      {/* mounting tabs */}
      <rect x="86" y="120" width="34" height="34" rx="8" fill={SHADE} {...line} />
      <rect x="280" y="120" width="34" height="34" rx="8" fill={SHADE} {...line} />
      <circle cx="100" cy="137" r="5" fill={INK} /><circle cx="300" cy="137" r="5" fill={INK} />
      <Box x="112" y="92" w="176" h="112" r="14" />
      <Mark x={130} y={108} s={52} />
      <path d="M134 176H200M134 188H178" stroke={STEEL} strokeWidth="4" strokeLinecap="round" />
      <Led x={256} y={124} />
      {/* SIM and port covers */}
      <rect x="226" y="154" width="46" height="30" rx="5" fill={HOUSE2} {...line} strokeWidth="2.5" />
      <path d="M236 164H262M236 174H254" stroke={SHADE} strokeWidth="3" strokeLinecap="round" />
      <Gland x={160} y={204} />
      <Cable d="M160 221C160 250 130 250 100 264C80 273 66 280 50 282" />
      {/* location pin */}
      <g transform="translate(316 232)">
        <path d="M0 40C-14 22 -22 12 -22 -2A22 22 0 0 1 22 -2C22 12 14 22 0 40Z" fill={TEAL} {...line} />
        <circle cx="0" cy="-2" r="8" fill={HOUSE2} stroke={INK} strokeWidth="2.5" />
      </g>
      <ellipse cx="316" cy="276" rx="26" ry="6" fill={INK} opacity=".25" />
    </g>
  );
}

function CounterSensor() {
  return (
    <g>
      {/* stand and arm */}
      <rect x="326" y="40" width="22" height="206" rx="4" fill={SHADE} {...line} />
      <rect x="310" y="236" width="54" height="14" rx="4" fill={SLATE} {...line} />
      <rect x="156" y="40" width="192" height="18" rx="5" fill={SHADE} {...line} />
      <rect x="168" y="58" width="28" height="12" fill={SLATE} {...line} strokeWidth="2.5" />
      {/* proximity sensor, pointing down */}
      <rect x="164" y="68" width="36" height="14" rx="3" fill={STEEL} {...line} />
      <rect x="168" y="82" width="28" height="52" rx="4" fill={HOUSE} {...line} />
      <path d="M172 90H192M172 98H192M172 106H192" stroke={SHADE} strokeWidth="2.5" />
      <rect x="170" y="134" width="24" height="12" rx="3" fill={INK} {...line} />
      <path d="M176 140H188" stroke={TEAL} strokeWidth="3" strokeLinecap="round" />
      <Led x={196} y={118} r={4.5} />
      {/* junction node */}
      <Box x="268" y="76" w="54" h="52" r="8" />
      <Mark x={276} y={84} s={30} />
      <Led x={308} y={116} r={4} />
      <Cable d="M182 70C182 60 240 60 268 94" w={4} />
      {/* beam */}
      <path d="M180 148L150 180H210Z" fill={TEAL} fillOpacity=".35" />
      <g stroke={TEAL} strokeWidth="3" strokeLinecap="round" strokeDasharray="2 8">
        <path d="M180 148L150 180M180 148L210 180" />
      </g>
      {/* conveyor */}
      <rect x="20" y="218" width="360" height="26" rx="13" fill={SLATE} {...line} />
      <path d="M44 231H356" stroke={INK} strokeWidth="2.5" strokeDasharray="10 12" opacity=".6" />
      <circle cx="40" cy="231" r="9" fill={SHADE} {...line} strokeWidth="2.5" />
      <circle cx="360" cy="231" r="9" fill={SHADE} {...line} strokeWidth="2.5" />
      {[100, 190, 280].map((x) => (
        <path key={x} d={`M${x} 244V272M${x - 14} 272H${x + 14}`} stroke={INK} strokeWidth="4" strokeLinecap="round" />
      ))}
      {/* parts */}
      <rect x="40" y="190" width="38" height="28" rx="5" fill={HOUSE2} {...line} />
      <rect x="112" y="190" width="38" height="28" rx="5" fill={HOUSE2} {...line} />
      <rect x="180" y="178" width="44" height="40" rx="5" fill={HOUSE2} {...line} />
      <path d="M188 188H216" stroke={SHADE} strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

/* ---------------------------------------------------------------- export */

export function DeviceArt({ kind, className, label }: { kind: DeviceKey; className?: string; label?: string }) {
  const id = `device-${kind}`;
  const text = label ?? `${DEVICE_META[kind].name}: ${DEVICE_META[kind].caption}`;
  let art: ReactNode;
  switch (kind) {
    case "gateway-probe": art = <GatewayProbe />; break;
    case "climate-node": art = <ClimateNode />; break;
    case "server-node": art = <ServerNode />; break;
    case "door-sensor": art = <DoorSensor />; break;
    case "leak-rope": art = <LeakRope />; break;
    case "tank-level": art = <TankLevel id={id} />; break;
    case "clamp-meter": art = <ClampMeter />; break;
    case "vibration-puck": art = <VibrationPuck />; break;
    case "air-quality": art = <AirQuality />; break;
    case "soil-stake": art = <SoilStake id={id} />; break;
    case "water-probe": art = <WaterProbe id={id} />; break;
    case "gps-tracker": art = <GpsTracker />; break;
    case "counter-sensor": art = <CounterSensor />; break;
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 300"
      className={className}
      role="img"
      aria-label={text}
      focusable="false"
    >
      <g id={id}>{art}</g>
    </svg>
  );
}
