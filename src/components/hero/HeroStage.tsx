"use client";
import { useEffect, useRef } from "react";
import { Check, CheckCheck, TriangleAlert } from "lucide-react";

/* ------------------------------------------------------------------ timeline
   One 13 s loop drives everything: the cold room warms past its limit, the unit
   sends an alert, someone acknowledges, the room recovers. Values are SAMPLE data. */
const LOOP = 13;
type Stage = "steady" | "drift" | "limit" | "alert" | "ack" | "clear";
const STAGES: [Stage, number][] = [["steady", 0], ["drift", 3.2], ["limit", 5.4], ["alert", 6.9], ["ack", 9.4], ["clear", 11]];
const stageAt = (t: number): Stage => { let s: Stage = "steady"; for (const [n, at] of STAGES) if (t >= at) s = n; return s; };
const smooth = (a: number, b: number, x: number) => { const k = Math.min(1, Math.max(0, (x - a) / (b - a))); return k * k * (3 - 2 * k); };
const tempAt = (t: number) => 4.2 + 5.2 * (smooth(3.2, 6.6, t) - smooth(9.6, 11.8, t)) + 0.12 * Math.sin(t * 2.1);

/* chart geometry */
const W = 330, H = 84, TMIN = 2, TMAX = 11;
const cx = (t: number) => (t / LOOP) * W;
const cy = (v: number) => H - 6 - ((v - TMIN) / (TMAX - TMIN)) * (H - 12);
const CURVE = Array.from({ length: 131 }, (_, i) => { const t = (i * LOOP) / 130; return `${i ? "L" : "M"}${cx(t).toFixed(1)} ${cy(tempAt(t)).toFixed(1)}`; }).join(" ");
const Y_LIMIT = cy(8);

/* unit geometry (ring is the brand's open orbit: gap faces the data trace) */
const RC = { x: 132, y: 128 }, R = 112, GAP = (38 * Math.PI) / 180;
const ring = (r: number) => { const x = RC.x + r * Math.cos(GAP), dy = r * Math.sin(GAP); return `M${x.toFixed(2)} ${(RC.y - dy).toFixed(2)} A${r} ${r} 0 1 0 ${x.toFixed(2)} ${(RC.y + dy).toFixed(2)}`; };

/* trace geometry, in stage coordinates (unit sits at left 0, top 282, so its centre is 132,410) */
const UP = "M258 410 V352 L300 310 V252";
const DOWN = "M258 410 V440 L288 470 H316";
const UP_FULL = "M191 410 H258 V352 L300 310 V252";
const DOWN_FULL = "M191 410 H258 V440 L288 470 H316";
const PACKETS: { path: "up" | "down"; start: number; dur: number; hot?: boolean }[] = [
  { path: "up", start: 0.5, dur: 1.3 }, { path: "up", start: 3.1, dur: 1.3 }, { path: "up", start: 8.3, dur: 1.3 }, { path: "up", start: 10.9, dur: 1.3 },
  { path: "down", start: 5.7, dur: 1.1, hot: true }, { path: "down", start: 5.95, dur: 1.1, hot: true },
];

function Mark({ s = 100 }: { s?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={s} height={s} aria-hidden="true">
      <path d="M73.29 29.07A34 34 0 1 0 73.29 70.93" fill="none" stroke="#F4F8FA" strokeWidth="9" strokeLinecap="round" />
      <line x1="46.5" y1="50" x2="84.5" y2="50" stroke="#14D1BC" strokeWidth="6.5" />
      <circle cx="46.5" cy="50" r="9.5" fill="#14D1BC" />
      <circle cx="84.5" cy="50" r="7.5" fill="#14D1BC" />
    </svg>
  );
}

export function HeroStage() {
  const root = useRef<HTMLDivElement>(null);
  const tempEl = useRef<HTMLSpanElement>(null);
  const dispEl = useRef<SVGTextElement>(null);
  const lines = useRef<(SVGPathElement | null)[]>([]);
  const chart = useRef<SVGGElement>(null);
  const dot = useRef<SVGCircleElement>(null);
  const halo = useRef<SVGCircleElement>(null);
  const pathUp = useRef<SVGPathElement>(null);
  const pathDown = useRef<SVGPathElement>(null);
  const pk = useRef<(SVGGElement | null)[]>([]);

  useEffect(() => {
    const el = root.current, hero = el?.closest<HTMLElement>(".ca-hero");
    if (!el || !hero) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 1024px)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let lastTxt = "", lastStage = "";

    const paint = (t: number, reveal: number, packets: boolean) => {
      const v = tempAt(t), txt = v.toFixed(1);
      if (txt !== lastTxt) { lastTxt = txt; if (tempEl.current) tempEl.current.textContent = txt; if (dispEl.current) dispEl.current.textContent = `${txt}°C`; }
      const st = stageAt(t);
      if (st !== lastStage) { lastStage = st; hero.dataset.stage = st; }
      lines.current.forEach((l) => l && (l.style.strokeDashoffset = String(1 - reveal)));
      dot.current?.setAttribute("cx", cx(t).toFixed(1)); dot.current?.setAttribute("cy", cy(v).toFixed(1));
      halo.current?.setAttribute("cx", cx(t).toFixed(1)); halo.current?.setAttribute("cy", cy(v).toFixed(1));
      if (chart.current) chart.current.style.opacity = String(Math.min(1, t / 0.3, (LOOP - t) / 0.5));
      if (!packets) return;
      PACKETS.forEach((p, i) => {
        const g = pk.current[i], path = p.path === "up" ? pathUp.current : pathDown.current;
        if (!g || !path) return;
        const k = (t - p.start) / p.dur;
        if (k < 0 || k > 1) { g.style.opacity = "0"; return; }
        const e = k * k * (3 - 2 * k) * 0.35 + k * 0.65, len = path.getTotalLength();
        const a = path.getPointAtLength(e * len), b = path.getPointAtLength(Math.min(len, e * len + 2));
        g.setAttribute("transform", `translate(${a.x.toFixed(1)} ${a.y.toFixed(1)}) rotate(${(Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI).toFixed(1)})`);
        g.style.opacity = String(Math.min(1, k / 0.1, (1 - k) / 0.1));
      });
    };

    if (reduce) { paint(7.6, 1, false); return; }

    hero.dataset.live = "true";
    let raf = 0, prev = performance.now(), t = 0, visible = true, mx = 0, my = 0, tx = 0, ty = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.1, (now - prev) / 1000); prev = now;
      t = (t + dt) % LOOP;
      paint(t, t / LOOP, wide.matches);
      if (fine && wide.matches) {
        mx += (tx - mx) * 0.07; my += (ty - my) * 0.07;
        el.style.setProperty("--mx", mx.toFixed(3)); el.style.setProperty("--my", my.toFixed(3));
      }
    };
    const start = () => { if (!raf && visible && !document.hidden) { prev = performance.now(); raf = requestAnimationFrame(frame); } };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); });
    io.observe(el);
    const vis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", vis);
    const move = (e: PointerEvent) => { const r = hero.getBoundingClientRect(); tx = ((e.clientX - r.left) / r.width) * 2 - 1; ty = ((e.clientY - r.top) / r.height) * 2 - 1; };
    if (fine) window.addEventListener("pointermove", move, { passive: true });
    start();
    return () => { stop(); io.disconnect(); document.removeEventListener("visibilitychange", vis); window.removeEventListener("pointermove", move); delete hero.dataset.live; };
  }, []);

  return (
    <div ref={root} className="ca-stage" role="img" aria-label="Animated sample. A ConnectAtom unit sees a cold room warm past its 8 degree limit, sends a WhatsApp alert, and someone acknowledges it.">
      {/* ---------- the hardware ---------- */}
      <svg className="ca-unit" viewBox="0 0 270 260" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="ca-h-house" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F8FBFD" /><stop offset=".55" stopColor="#E3EBF0" /><stop offset="1" stopColor="#BFCFDA" /></linearGradient>
          <linearGradient id="ca-h-screen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0E2233" /><stop offset="1" stopColor="#071019" /></linearGradient>
        </defs>

        {/* ring: tick scale, base orbit, drawn orbit, comet, radio ripples */}
        <path d={ring(R - 11)} className="ca-ring__ticks" pathLength={100} />
        <path d={ring(R)} className="ca-ring__base" />
        <path d={ring(R)} className="ca-ring__draw" pathLength={100} />
        <path d={ring(R)} className="ca-ring__comet" pathLength={100} />
        <g className="ca-ripples">
          <path d={ring(R)} className="ca-ripple" /><path d={ring(R)} className="ca-ripple ca-ripple--2" /><path d={ring(R)} className="ca-ripple ca-ripple--3" />
          <path d={ring(R)} className="ca-ripple ca-ripple--hot" /><path d={ring(R)} className="ca-ripple ca-ripple--hot ca-ripple--2" />
        </g>

        {/* data trace out through the gap, ending in the junction pad */}
        <path d="M170 128 H258" className="ca-trunk" />
        <circle cx="258" cy="128" r="8" className="ca-pad" /><circle cx="258" cy="128" r="3" className="ca-pad__core" />

        <g className="ca-par-unit">
          <g className="ca-device"><g className="ca-buzz">
            {/* mounting ears + housing */}
            <rect x="60" y="92" width="16" height="26" rx="5" fill="#C3D2DC" stroke="#0A1622" strokeWidth="2" />
            <rect x="188" y="92" width="16" height="26" rx="5" fill="#C3D2DC" stroke="#0A1622" strokeWidth="2" />
            <circle cx="68" cy="105" r="2.6" fill="#8FA6B8" /><circle cx="196" cy="105" r="2.6" fill="#8FA6B8" />
            <rect x="73" y="54" width="118" height="148" rx="16" fill="url(#ca-h-house)" stroke="#0A1622" strokeWidth="2.5" />
            <path d="M89 61H175" stroke="#fff" strokeOpacity=".85" strokeWidth="3" strokeLinecap="round" />
            <path d="M82 194H182" stroke="#AFC1CE" strokeWidth="3" strokeLinecap="round" />
            {/* brand mark, engraved */}
            <g transform="translate(86 66) scale(.4)">
              <path d="M73.29 29.07A34 34 0 1 0 73.29 70.93" fill="none" stroke="#0A1622" strokeWidth="9" strokeLinecap="round" />
              <line x1="46.5" y1="50" x2="84.5" y2="50" stroke="#0A8F80" strokeWidth="6.5" />
              <circle cx="46.5" cy="50" r="9.5" fill="#0A8F80" /><circle cx="84.5" cy="50" r="7.5" fill="#0A8F80" />
            </g>
            {/* vents */}
            <path d="M150 74H174M150 81H174M150 88H174" stroke="#AFC1CE" strokeWidth="3" strokeLinecap="round" />
            {/* display */}
            <rect x="87" y="108" width="90" height="46" rx="8" fill="url(#ca-h-screen)" stroke="#8FA6B8" strokeWidth="1.5" />
            <text ref={dispEl} x="132" y="138" textAnchor="middle" className="ca-disp">4.2°C</text>
            <rect x="87" y="108" width="90" height="46" rx="8" className="ca-scanlines" />
            {/* status LEDs */}
            <g className="ca-leds">
              <circle cx="100" cy="174" r="4.5" className="ca-led ca-led--pwr" />
              <circle cx="118" cy="174" r="4.5" className="ca-led ca-led--link" />
              <circle cx="136" cy="174" r="4.5" className="ca-led ca-led--alert" />
            </g>
            {/* cable glands */}
            <rect x="103" y="202" width="20" height="10" rx="3" fill="#8FA6B8" stroke="#0A1622" strokeWidth="2" />
            <rect x="150" y="202" width="20" height="10" rx="3" fill="#8FA6B8" stroke="#0A1622" strokeWidth="2" />
          </g></g>
          {/* probe lead and probe, with a thermal halo that follows the state */}
          <path d="M113 212 C113 240 88 248 62 246" fill="none" stroke="#0A1622" strokeWidth="7" strokeLinecap="round" />
          <path d="M113 212 C113 240 88 248 62 246" fill="none" stroke="#566879" strokeWidth="4" strokeLinecap="round" />
          <circle cx="24" cy="246" r="19" className="ca-halo" />
          <rect x="24" y="239" width="40" height="14" rx="3" fill="#8FA6B8" stroke="#0A1622" strokeWidth="2" />
          <path d="M28 244H58" stroke="#F4F8FA" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M24 239L12 246L24 253Z" fill="#8FA6B8" stroke="#0A1622" strokeWidth="2" strokeLinejoin="round" />
        </g>
      </svg>

      <i className="ca-vlink" aria-hidden="true"><b /></i>

      {/* ---------- dashboard ---------- */}
      <div className="ca-card ca-dash" aria-hidden="true">
        <div className="ca-dash__top">
          <div><p className="ca-card__title">Cold Room 2</p><p className="ca-card__sub">Main Store | Limit 2 to 8°C</p></div>
          <div className="ca-badges">
            <span className="badge badge-ok ca-b-ok"><span className="live-dot" />Normal</span>
            <span className="badge badge-warn ca-b-warn"><TriangleAlert size={13} />Above limit</span>
          </div>
        </div>
        <p className="ca-temp num"><span ref={tempEl}>4.2</span><span className="ca-temp__unit">°C</span></p>
        <svg className="ca-chart" viewBox={`0 0 ${W} ${H}`} focusable="false">
          <defs>
            <clipPath id="ca-h-above"><rect x="0" y="0" width={W} height={Y_LIMIT} /></clipPath>
            <clipPath id="ca-h-below"><rect x="0" y={Y_LIMIT} width={W} height={H - Y_LIMIT} /></clipPath>
          </defs>
          <rect className="ca-band" x="0" y={Y_LIMIT} width={W} height={cy(TMIN) - Y_LIMIT} />
          <line className="ca-limit" x1="0" x2={W} y1={Y_LIMIT} y2={Y_LIMIT} />
          <text className="ca-chart__lbl" x={W - 2} y={Y_LIMIT - 5} textAnchor="end">8°C limit</text>
          <g ref={chart} style={{ opacity: 0 }}>
            <path ref={(n) => { lines.current[0] = n; }} d={CURVE} pathLength={1} clipPath="url(#ca-h-below)" className="ca-line ca-line--ok" />
            <path ref={(n) => { lines.current[1] = n; }} d={CURVE} pathLength={1} clipPath="url(#ca-h-above)" className="ca-line ca-line--hot" />
            <circle ref={halo} r="8" className="ca-dot__halo" cx="0" cy={cy(4.2)} />
            <circle ref={dot} r="3.6" className="ca-dot" cx="0" cy={cy(4.2)} />
          </g>
        </svg>
        <p className="ca-dash__foot"><span>Alert: above 8°C for 10 min</span><span>Illustrative sample</span></p>
      </div>

      <i className="ca-vlink" aria-hidden="true"><b /></i>

      {/* ---------- WhatsApp alert ---------- */}
      <div className="ca-card ca-alert" aria-hidden="true">
        <div className="ca-alert__head">
          <span className="ca-avatar"><Mark s={20} /></span>
          <div><p className="ca-card__title">ConnectAtom</p><p className="ca-card__sub">Sample alert</p></div>
        </div>
        <div className="ca-msgwrap">
          <p className="ca-msg ca-msg--idle"><Check size={14} />All readings in range. Nothing to do.</p>
          <p className="ca-msg ca-msg--typing"><i /><i /><i /></p>
          <p className="ca-msg ca-msg--alert">Cold Room 2: 9.4°C for 10 min (limit 8°C). Door open 14 min. Check door and compressor.</p>
        </div>
        <p className="ca-alert__foot">
          <span className="ca-t ca-t--watch">Watching</span>
          <span className="ca-t ca-t--sent">Delivered</span>
          <span className="ca-t ca-t--ack"><CheckCheck size={14} />Acknowledged</span>
        </p>
      </div>

      {/* ---------- desktop trace overlay ---------- */}
      <svg className="ca-links" viewBox="0 0 520 584" aria-hidden="true" focusable="false">
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={UP} pathLength={100} className="ca-tr" /><path d={UP} className="ca-flow" />
          <path d={DOWN} pathLength={100} className="ca-tr ca-tr--down" /><path d={DOWN} className="ca-flow ca-flow--down" />
          <path ref={pathUp} d={UP_FULL} stroke="none" /><path ref={pathDown} d={DOWN_FULL} stroke="none" />
        </g>
        <circle cx="300" cy="252" r="4" className="ca-endpad" /><circle cx="316" cy="470" r="4" className="ca-endpad ca-endpad--down" />
        {PACKETS.map((p, i) => (
          <g key={i} ref={(n) => { pk.current[i] = n; }} style={{ opacity: 0 }}>
            <rect x="-7" y="-2.5" width="14" height="5" rx="2.5" className={p.hot ? "ca-pk ca-pk--hot" : "ca-pk"} />
          </g>
        ))}
      </svg>
    </div>
  );
}
