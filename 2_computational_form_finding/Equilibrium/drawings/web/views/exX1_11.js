/**
 * EX X · Task 11 — Arch-cable-structure with different support conditions
 * Structural Design I, HS 22, sheet "EX X — Additional Exercises", page 11.
 *
 * TASK TEXT (verbatim, English sheet)
 *  "Draw the force diagrams for the given cases. Pay attention to the support
 *   conditions. Determine the magnitude of A and B. Draw tension forces in red,
 *   compression forces in blue and reaction forces in green."
 *  and above the fourth figure:
 *  "d) Design a solution in which the structure only spans underneath the
 *   closing string."
 *
 * THE SUB-PART LABELS ARE CORRUPT IN BOTH LANGUAGES. The three upper figures
 * are captioned "a) a)", "a) b)" and "a) c)" — a stray "a)" in front of each —
 * and only the fourth is a clean "d)". The German sheet (Aufgabe 11,
 * "Bogen-Seil-Tragwerke mit verschiedenen Auflagerbedingungen") repeats the
 * same three "a)"s, so it is not a translation slip. Read them as a) b) c) d).
 *
 * GIVEN: form diagram 1:100 and force diagram 1 cm ≙ 5 kN, four times over;
 * q_1 = 5 kN/m over the whole span in every case.
 *
 * GEOMETRY, digitised from the task page (arch = the black 0.72 pt bezier,
 * flattened; supports = the black 0.24 pt triangles; the grey 58.8 % 0.36 pt
 * dash-dot line through A; 1 pt = 0.03527778 m at 1:100):
 *   span A→B    137.906 → 336.266 pt = 198.360 pt = 6.9973 m → l = 7.00 m
 *   rise (a,b,c) 323.453 → 280.953 pt =  42.500 pt = 1.4993 m → f = 1.50 m
 *   sag  (key's d)  985.793 → 1028.300 pt = 42.507 pt         → f = 1.50 m
 *   q_1 load bar spans exactly the same 137.87 → 336.22 pt
 * Both come out round, so 1:100 is honoured exactly. A and B are level.
 *
 * THE FOUR SUPPORT CONDITIONS, read off the symbols themselves. At A the
 * triangle's base line and the hatched line are OFFSET in all four figures — a
 * roller; at B they COINCIDE — a pin, identically in all four. The roller's
 * plane, and hence the direction of the reaction at A:
 *   a) plane at −49.40°  ⇒ reaction at  40.60°   closing string drawn DASHED
 *   b) plane at −25.00°  ⇒ reaction at  65.00°   closing string drawn solid
 *   c) plane horizontal  ⇒ reaction at  90.00°   closing string drawn solid
 *   d) plane horizontal  ⇒ reaction at  90.00°   the student designs it
 * and 40.60° is not arbitrary: arctan(4f/l) = arctan(6/7) = 40.6013°, so in a)
 * the support plane is set exactly perpendicular to the arch's own end tangent.
 * The grey dash-dot through A is that same direction (measured 40.616°, 65.017°,
 * vertical, vertical).
 *
 * DERIVATION. Same arch, same load, every time:
 *   R = q_1·l = 35.00 kN at midspan · H = q_1·l²/(8f) = 245/12 = 20.4167 kN
 *   end tangent tanθ₀ = 4f/l = 6/7 → θ₀ = 40.6013°
 *   force in the arch at the springing = √(H² + (R/2)²) = 26.887 kN
 * The loads are vertical, so A_h + B_h = 0 and A_v = B_v = R/2 = 17.50 kN
 * always; the direction imposed at A therefore fixes everything, and the
 * closing string takes up exactly the thrust the supports refuse:
 *   A_h = A_v/tanθ_A ,  closing string = H − A_h ,  |A| = |B| = √(A_h² + (R/2)²)
 *
 *   a) θ = 40.6013° → A_h = 20.4167 → A = B = 26.887 kN, string  0.000 kN
 *   b) θ = 65°      → A_h =  8.1608 → A = B = 19.309 kN, string 12.256 kN TENSION
 *   c) θ = 90°      → A_h =  0      → A = B = 17.500 kN, string 20.417 kN TENSION
 *   d) mirror of c) → A_h =  0      → A = B = 17.500 kN, string 20.417 kN COMPRESSION
 *                                     and the curved element is a CABLE, 26.887 kN tension
 * That progression is the lesson: rotate the support plane away from the arch's
 * own thrust and the string has to make up the difference, from nothing in a)
 * to all of it in c). Case d) is c) upside down — hang the same parabola 1.50 m
 * BELOW the closing string and every sign flips while the reactions do not.
 * Below 40.60° the string is pushed instead of pulled; the free-angle slider in
 * the panel takes the string force through zero exactly at θ₀.
 *
 * THE OFFICIAL KEY draws all four force diagrams and PRINTS NO NUMBER AT ALL,
 * although the task asks for the magnitude of A and B. Measured off its own
 * drawings at 1 cm ≙ 5 kN (pole left, load line right):
 *   a) A = B = 26.88 at ±40.60°, no string   b) A = B = 19.30 at 65°/115°, string 12.25 red
 *   c) A = B = 17.49 vertical, string 20.41 red
 *   d) A = B = 17.49 vertical, string 20.41 blue, cable rays 26.88 red
 *   and H = 115.71 pt = 20.41 kN, arch rays 152.39 pt = 26.88 kN, in all four.
 * Every one of those agrees with the derivation above to four significant
 * figures, so there is no disagreement of substance — only the corrupt sub-part
 * labels, and a key that answers a question about magnitudes without printing
 * one. The numbers in this view are that missing answer.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

const L = 7.00;                 // m, span A→B
const FS = 1.6;                 // drawing units per metre  (form diagram)
const QS = 0.32;                // drawing units per kN     (force diagram)
const X0 = 4.6, Y0 = 0.0;       // where A sits
const FOX = 22.0, FOY = -1.0;   // the pole of the force diagram
const SUB = [13.0, -14.5];      // the subsystem (node B) star
const NSEG = 22;                // segments per half of the drawn parabola

const CASES = [
  { k: 'a', th: null, name: 'a) roller plane ⟂ to the arch’s end tangent' },
  { k: 'b', th: 65, name: 'b) roller plane tilted — reaction at 65°' },
  { k: 'c', th: 90, name: 'c) roller plane horizontal — reaction vertical' },
  { k: 'd', th: 90, name: 'd) design: the structure hangs below the closing string' },
];

const DEFAULTS = {
  cse: 0,        // 0 = a) · 1 = b) · 2 = c) · 3 = d)
  q: 5,          // kN/m, the given load
  f: 1.50,       // m, rise of the arch / sag of the cable
  free: false,   // override the sheet's support angle
  theta: 55,     // degrees, only used when `free` is on
  sub: true,     // show the node-B subsystem
  lbl: true,
  _k: 99,
};

const deg = (r) => (r * 180) / Math.PI;

function solve(s, ci) {
  const q = s.q, f = s.f;
  const R = q * L;
  const H = (q * L * L) / (8 * f);
  const th0 = Math.atan((4 * f) / L);                 // the arch's end tangent
  const down = ci === 3;
  const set = CASES[ci].th;
  const th = s.free ? (s.theta * Math.PI) / 180
                    : (set === null ? th0 : (set * Math.PI) / 180);
  const Av = R / 2;
  const ah = Math.abs(Math.tan(th)) > 1e6 ? 0 : Av / Math.tan(th);
  const T = H - ah;                                   // + = tie (arch) / strut (cable)
  const Nsp = Math.hypot(H, Av);                      // arch or cable at the springing
  const Amag = Math.hypot(ah, Av);
  return { q, f, R, H, th0, th, down, Av, ah, T, Nsp, Amag, ci };
}

export const meta = {
  title: 'EX X.11 — one arch, four supports',
  subtitle: 'Structural Design I · EX X “Additional Exercises”, task 11 a)–d)',
  about: 'The same parabola, the same 5 kN/m, four different things underneath it. The point of the page is that the load never moves and the structure never changes shape, yet the reactions go from 26.9 kN leaning hard sideways to 17.5 kN standing straight up — because a support can only push in the direction its plane allows, and whatever thrust it refuses has to be taken by the string joining A to B. In a) the plane is set square to the arch’s own end tangent, so the string carries nothing and the sheet draws it as a dashed line; in c) the plane is flat, so the string carries the whole 20.4 kN thrust; b) is in between. d) turns the whole thing upside down and every sign with it. The panel’s free-angle slider sweeps continuously between the printed cases, and the string force passes through zero exactly at 40.60°.',
  result: (d) => [
    `${CASES[d.ci].name}${d.freeOn ? ` — overridden to θ = ${d.thDeg.toFixed(2)}°` : ''}`,
    `given: l = ${L.toFixed(2)} m, f = ${d.f.toFixed(2)} m, q₁ = ${d.q.toFixed(2)} kN/m ⇒ R = ${d.R.toFixed(2)} kN, H = ${d.H.toFixed(4)} kN, end tangent θ₀ = ${deg(d.th0).toFixed(2)}°`,
    `A = B = ${d.Amag.toFixed(3)} kN (A_v = B_v = ${d.Av.toFixed(2)} kN, A_h = −B_h = ${d.ah.toFixed(3)} kN) · ${d.down ? 'cable' : 'arch'} at the springing ${d.Nsp.toFixed(3)} kN ${d.down ? 'tension' : 'compression'}`,
    Math.abs(d.T) < 5e-3
      ? `closing string: 0.000 kN — a ZERO-FORCE member, which is why the sheet draws it dashed in a)`
      : `closing string: ${Math.abs(d.T).toFixed(3)} kN ${(d.T > 0) === !d.down ? 'TENSION (a tie)' : 'COMPRESSION (a strut)'}`,
    `all four, from the same l, f and q₁: a) A = B = ${d.all[0].toFixed(2)}, string ${Math.abs(d.allT[0]).toFixed(2)} · b) ${d.all[1].toFixed(2)}, string ${Math.abs(d.allT[1]).toFixed(2)} · c) ${d.all[2].toFixed(2)}, string ${Math.abs(d.allT[2]).toFixed(2)} · d) ${d.all[3].toFixed(2)}, string ${Math.abs(d.allT[3]).toFixed(2)} kN`,
    `the key draws all four force diagrams and prints no number at all — these are the missing answers (they match its drawings to 4 figures: 26.88, 19.30, 17.49, 17.49)`],
  frame: [[-14, -19], [33, 7]],
};

const STEPS = [
  { t: 'The exercise',
    d: 'four figures on one page, and they are the same drawing four times: the same 7 metre span, the same 1.5 metre parabola, the same 5 kN/m. Only what is underneath A changes. Switch cases in the panel and watch the reactions swing while the load stays exactly where it is',
    take: 'the sheet labels the first three “a) a)”, “a) b)” and “a) c)” — a typo it repeats in German. They are a), b), c)' },
  { t: 'The load, and the thrust it needs',
    d: 'before looking at any support: a parabola of rise f under a uniform load q has a horizontal thrust of q·l²/8f, constant along the whole arch, and end tangents at arctan(4f/l). Those two numbers are the same in all four cases because the geometry and the load are',
    detail: (d) => [`R = q₁·l = ${d.q.toFixed(2)} × ${L.toFixed(2)} = ${d.R.toFixed(2)} kN, acting at midspan`,
                    `H = q₁·l²/(8f) = ${d.q.toFixed(2)} × ${(L * L).toFixed(0)} / (8 × ${d.f.toFixed(2)}) = ${d.H.toFixed(4)} kN`,
                    `end tangent θ₀ = arctan(4f/l) = arctan(${((4 * d.f) / L).toFixed(4)}) = ${deg(d.th0).toFixed(4)}° · force there = √(H² + (R/2)²) = ${d.Nsp.toFixed(3)} kN`] },
  { t: 'What the support at A is allowed to do',
    d: 'A is a roller: its triangle sits on a plane and it can only push perpendicular to that plane. B is a pin and can push any way it likes — but the loads are all vertical, so A_h and B_h must cancel, and the moment about B fixes A_v at half the load whatever the plane is doing',
    detail: (d) => [`A_v = B_v = R/2 = ${d.Av.toFixed(2)} kN (symmetry / moments about B)`,
                    `the plane at A gives the reaction direction θ = ${d.thDeg.toFixed(2)}° ⇒ A_h = A_v/tanθ = ${d.ah.toFixed(3)} kN`,
                    `so |A| = |B| = √(A_h² + A_v²) = ${d.Amag.toFixed(3)} kN — the pin never has to do more than the roller`],
    take: 'B is drawn with a completely different symbol in all four figures and yet carries exactly the same force as A, every time' },
  { t: 'The force diagram: pole and the two arch rays',
    d: 'set the load line R out vertically and step the pole H to one side of it. The two rays from the pole to the ends of the load line ARE the arch at its two springings — same length, ±θ₀ — and this half of the diagram is identical in all four cases',
    detail: (d) => [`load line R = ${d.R.toFixed(2)} kN · pole offset H = ${d.H.toFixed(4)} kN`,
                    `rays 1 and 2 = ${d.Nsp.toFixed(3)} kN each, at ±${deg(d.th0).toFixed(2)}°`,
                    d.down ? 'in d) the curve hangs, so those two rays are TENSION — drawn red'
                           : 'the arch is in compression, so those two rays are drawn blue'] },
  { t: 'Closing it: A, B and the string',
    d: 'now the support enters. Slide along the pole’s horizontal until the direction from there to the top of the load line is the direction the roller allows — that point splits H between the string and the supports. What is left of H is the closing string’s force',
    detail: (d) => [`A = from the split point to the top of the load line = ${d.Amag.toFixed(3)} kN at ${d.thDeg.toFixed(2)}°`,
                    `B = from the bottom of the load line back = ${d.Amag.toFixed(3)} kN at ${(180 - d.thDeg).toFixed(2)}°`,
                    Math.abs(d.T) < 5e-3
                      ? 'closing string = H − A_h = 0.000 kN — nothing left over: the supports take the whole thrust'
                      : `closing string = H − A_h = ${d.H.toFixed(3)} − ${d.ah.toFixed(3)} = ${Math.abs(d.T).toFixed(3)} kN ${(d.T > 0) === !d.down ? 'tension' : 'compression'}`],
    take: 'in a) the split point lands exactly on the pole, so the string is a zero-force member — that is what the sheet’s dashed line means' },
  { t: 'The subsystem at B',
    d: 'the sheet asks for a “subsystem” beside each figure: the free body of one support node. Three forces meet at B — the curved element, the closing string and the reaction — and they close into a triangle that is just a corner of the force diagram, read off directly',
    detail: (d) => [`${d.down ? 'cable' : 'arch'} at B: ${d.Nsp.toFixed(2)} kN ${d.down ? 'pulling B down-left' : 'pushing B down-right'}`,
                    `closing string at B: ${Math.abs(d.T).toFixed(2)} kN ${(d.T > 0) === !d.down ? 'pulling B towards A' : 'pushing B away from A'}`,
                    `reaction B: ${d.Amag.toFixed(2)} kN at ${(180 - d.thDeg).toFixed(2)}° · the three close ✓`] },
  { t: 'All four, side by side',
    d: 'the same load, four supports, four answers. Rotating the plane at A from square-to-the-tangent to flat moves the thrust out of the supports and into the string, kilonewton for kilonewton; turning the structure upside down for d) changes every sign but not one magnitude. The free-angle slider sweeps the whole family',
    detail: (d) => [`a) θ = ${deg(d.th0).toFixed(2)}°: A = B = ${d.all[0].toFixed(2)} kN, string ${Math.abs(d.allT[0]).toFixed(2)} kN`,
                    `b) θ = 65°: A = B = ${d.all[1].toFixed(2)} kN, string ${Math.abs(d.allT[1]).toFixed(2)} kN tension · c) θ = 90°: ${d.all[2].toFixed(2)} kN, string ${Math.abs(d.allT[2]).toFixed(2)} kN tension`,
                    `d) hanging, θ = 90°: ${d.all[3].toFixed(2)} kN, string ${Math.abs(d.allT[3]).toFixed(2)} kN compression, cable ${d.Nsp.toFixed(2)} kN tension`],
    take: 'the official key draws all four of these and prints not a single number, even though the task asks for the magnitude of A and B' },
];

function compute(s) {
  const ci = Math.round(s.cse);
  const r = solve(s, ci);
  const all = [], allT = [];
  for (let i = 0; i < 4; i++) {
    const t = solve({ ...s, free: false }, i);
    all.push(t.Amag); allT.push(t.T);
  }
  const sg = r.down ? -1 : 1;                       // +1 arch up, −1 cable down
  const f = r.f;

  // ---- form diagram
  const fm = (x, y) => [X0 + x * FS, Y0 + y * FS];
  const Apt = fm(0, 0), Bpt = fm(L, 0);
  const yy = (x) => (sg * 4 * f * x * (L - x)) / (L * L);
  const half = (x0, x1) => {
    const out = [];
    for (let i = 0; i <= NSEG; i++) {
      const x = x0 + ((x1 - x0) * i) / NSEG;
      out.push(fm(x, yy(x)));
    }
    return out;
  };
  const cvL = half(0, L / 2), cvR = half(L / 2, L);
  // load bar, always on the far side of the structure from the closing string
  const ybar = r.down ? -(f + 2.9) : f + 1.6;
  const ytip = r.down ? ybar - 0.6 : f + 1.0;
  const yres0 = r.down ? -(f + 4.2) : f + 3.4;
  const yres1 = r.down ? -(f + 5.6) : f + 2.0;

  // reaction directions in the form diagram (unit vectors, pointing INTO the
  // structure): the roller at A leans towards the curved element it carries
  const uA = V.unit([sg * r.ah, r.Av]);
  const uB = V.unit([-sg * r.ah, r.Av]);

  // ---- force diagram
  const fp = (x, y) => [FOX + x * QS, FOY + y * QS];
  const P = fp(0, 0);                               // pole
  const Stop = fp(r.H, r.Av);
  const Sbot = fp(r.H, -r.Av);
  const Q = fp(r.T, 0);                             // where the string ends

  // ---- subsystem at B: the three forces acting on the node
  const fArch = [sg * r.H, -r.Av];                  // curved element on B
  const fStr = [-sg * r.T, 0];                      // closing string on B
  const fRe = [-sg * r.ah, r.Av];                   // reaction B

  return { ...r, thDeg: deg(r.th), freeOn: !!s.free, all, allT, sg,
           Apt, Bpt, cvL, cvR, ybar, ytip, yres0, yres1, uA, uB,
           P, Stop, Sbot, Q, fArch, fStr, fRe, fm, fp };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const NARR = dw.W.narrow;
  // the curved element: blue when it is an arch, pink/red when it hangs
  const CURVE = { pending: PAL.black, final: (dd) => (dd && dd.down ? PAL.red : PAL.blue) };
  // the closing string: tie, strut, or asleep
  const STRING = { pending: PAL.black,
    final: (dd) => (!dd ? PAL.black
      : Math.abs(dd.T) < 5e-3 ? PAL.zero
      : (dd.T > 0) === !dd.down ? PAL.red : PAL.blue) };

  dw.label('t_form', 'form diagram 1:100', { cls: 'title', flash: false });
  dw.label('t_sub', 'subsystem — node B', { cls: 'title', flash: false });
  dw.label('t_force', 'force diagram 1 cm ≙ 5 kN', { cls: 'title', flash: false });

  // ---------- form diagram ----------
  dw.strokes('cvL', NSEG, { intro: 1, w: dw.W.str, color: CURVE, cap: false });
  dw.strokes('cvR', NSEG, { intro: 1, w: dw.W.str, color: CURVE, cap: false });
  dw.label('lcvL', '', { cls: 'num', intro: 1, color: CURVE, when: (t) => t.lbl });
  dw.label('lcvR', '', { cls: 'num', intro: 1, color: CURVE, when: (t) => t.lbl });
  dw.seg('ch3', { intro: 1, w: dw.W.bar, color: STRING });
  dw.label('lch3', '', { cls: 'num', intro: 1, color: STRING, when: (t) => t.lbl });
  dw.dashLine('chord', { intro: 1, color: PAL.grey, dash: dw.W.dash });

  dw.seg('qbar', { intro: 1, w: dw.W.thin, color: PAL.green, flash: false });
  dw.arrows('qarr', 15, { intro: 1, w: dw.W.thin, color: PAL.green,
    headLen: NARR.headLen * 0.75, headW: NARR.headW * 0.75 });
  dw.label('lq', '', { cls: 'num', intro: 1, color: PAL.green });
  dw.dashArrow('Rres', { intro: 1, color: PAL.green, ...NARR, dash: dw.W.dash });
  dw.label('lRres', '', { cls: 'num', intro: 1, color: PAL.green });

  for (const n of ['A', 'B']) {
    dw.disk(`p${n}`, { intro: 1, r: dw.W.disk });
    dw.label(`l${n}`, n, { cls: 'point', intro: 1 });
    dw.strokes(`tri${n}`, 3, { intro: 2, w: dw.W.dim, color: PAL.black, flash: false });
    dw.seg(`pl${n}`, { intro: 2, w: dw.W.dim, color: PAL.black, flash: false });
    dw.strokes(`hat${n}`, 6, { intro: 2, w: dw.W.dim, color: PAL.grey, flash: false });
    dw.arrow(`re${n}`, { intro: 4, color: PAL.green, ...dw.W.arrow });
    dw.label(`lre${n}`, '', { cls: 'num', intro: 4, color: PAL.green });
  }
  dw.dashLine('axA', { intro: 2, color: PAL.grey, dash: dw.W.dash });

  // ---------- force diagram ----------
  dw.arrow('fR', { intro: 3, color: PAL.green, ...NARR });
  dw.label('lfR', '', { cls: 'num', intro: 3, color: PAL.green, when: (t) => t.lbl });
  dw.seg('ray1', { intro: 3, w: dw.W.ray, color: CURVE });
  dw.seg('ray2', { intro: 3, w: dw.W.ray, color: CURVE });
  dw.seg('ray3', { intro: 4, w: dw.W.ray, color: STRING });
  dw.label('lray1', '1', { cls: 'num', intro: 3, color: CURVE, when: (t) => t.lbl });
  dw.label('lray2', '2', { cls: 'num', intro: 3, color: CURVE, when: (t) => t.lbl });
  dw.label('lray3', '', { cls: 'num', intro: 4, color: STRING, when: (t) => t.lbl });
  dw.arrow('fA', { intro: 4, color: PAL.green, ...NARR });
  dw.arrow('fB', { intro: 4, color: PAL.green, ...NARR });
  dw.label('lfA', '', { cls: 'num', intro: 4, color: PAL.green, when: (t) => t.lbl });
  dw.label('lfB', '', { cls: 'num', intro: 4, color: PAL.green, when: (t) => t.lbl });
  dw.disk('fo', { intro: 3, r: dw.W.disk * 0.8 });
  dw.label('lfo', 'o', { cls: 'num', intro: 3, color: PAL.grey, when: (t) => t.lbl });

  // ---------- the node-B subsystem ----------
  const SHOW = (t) => t.sub;
  dw.disk('sc', { intro: 5, r: dw.W.disk * 0.8, when: SHOW });
  dw.arrow('s1', { intro: 5, color: CURVE, ...NARR, when: SHOW });
  dw.arrow('s3', { intro: 5, color: STRING, ...NARR, when: SHOW });
  dw.arrow('sB', { intro: 5, color: PAL.green, ...NARR, when: SHOW });
  dw.label('ls1', '1', { cls: 'num', intro: 5, color: CURVE, when: (t) => t.sub && t.lbl });
  dw.label('ls3', '3', { cls: 'num', intro: 5, color: STRING, when: (t) => t.sub && t.lbl });
  dw.label('lsB', 'B', { cls: 'num', intro: 5, color: PAL.green, when: (t) => t.sub && t.lbl });

  // ---------- the four cases, listed ----------
  for (let i = 0; i < 4; i++) {
    dw.label(`cmp${i}`, '', { cls: 'num', intro: 6, flash: false,
      color: { pending: PAL.grey, final: (dd) => (dd && dd.ci === i ? PAL.black : PAL.grey) } });
  }

  dw.link('ch3', 'ray3', 'lch3', 'lray3', 's3', 'ls3');
  dw.link('reA', 'fA', 'lreA', 'lfA');
  dw.link('reB', 'fB', 'lreB', 'lfB', 'sB', 'lsB');
  dw.link('Rres', 'fR', 'lRres', 'lfR');

  dw.instant('t_form', 't_sub', 't_force');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    const K = s._k;
    const fm = d.fm;

    dw.setLabel('t_form', [X0 + (L * FS) / 2 - 1.1, 6.4]);
    dw.setLabel('t_sub', [SUB[0], SUB[1] + 3.6]);
    dw.setLabel('t_force', [FOX + 3.4, 6.3]);

    // ---- the structure
    const seg = (pts) => pts.slice(0, -1).map((p, i) => [p, pts[i + 1]]);
    dw.setStrokes('cvL', seg(d.cvL));
    dw.setStrokes('cvR', seg(d.cvR));
    dw.setLabel('lcvL', V.add(fm(L / 4, d.sg * ((3 * d.f) / 4)), [-1.15, d.sg * 0.35]));
    dw.setText('lcvL', `2 · ${d.Nsp.toFixed(2)}`);
    dw.setLabel('lcvR', V.add(fm((3 * L) / 4, d.sg * ((3 * d.f) / 4)), [1.15, d.sg * 0.35]));
    dw.setText('lcvR', `1 · ${d.Nsp.toFixed(2)}`);
    dw.setSeg('ch3', d.Apt, d.Bpt);
    dw.setDashLine('chord', [d.Apt, d.Bpt]);
    dw.setLabel('lch3', [X0 + (L * FS) / 2, Y0 - d.sg * 0.95]);
    dw.setText('lch3', Math.abs(d.T) < 5e-3
      ? '3 · 0.00 — zero-force member'
      : `3 · ${Math.abs(d.T).toFixed(2)} ${(d.T > 0) === !d.down ? 'tension' : 'compression'}`);

    // ---- the load
    dw.setSeg('qbar', fm(0, d.ybar), fm(L, d.ybar));
    dw.setArrows('qarr', Array.from({ length: 15 }, (_, i) => {
      const x = (L * i) / 14;
      return [fm(x, d.ybar), fm(x, d.ytip)];
    }));
    dw.setLabel('lq', V.add(fm(L, d.ybar), [2.15, 0]));
    dw.setText('lq', `q₁ = ${d.q.toFixed(2)} kN/m`);
    dw.setDashArrow('Rres', fm(L / 2, d.yres0), fm(L / 2, d.yres1));
    dw.setLabel('lRres', V.add(fm(L / 2, (d.yres0 + d.yres1) / 2), d.down ? [-3.0, 0.8] : [1.9, -1.6]));
    dw.setText('lRres', `R = ${d.R.toFixed(2)} kN`);

    // ---- the supports, and the reactions they allow
    const sup = [['A', d.Apt, d.uA, true], ['B', d.Bpt, d.uB, false]];
    for (const [n, P, u, roller] of sup) {
      dw.setDisk(`p${n}`, P);
      dw.setLabel(`l${n}`, V.add(P, [n === 'A' ? -1.0 : 1.0, 0.55]));
      // a pin is drawn on a vertical axis; a roller on the plane it can slide on
      const ud = roller ? u : [0, 1];
      const h = 1.05, w = 0.62, gap = roller ? 0.34 : 0.0;
      const base = V.sub(P, V.mul(ud, h));
      const nn = V.perp(ud);
      const c1 = V.add(base, V.mul(nn, w)), c2 = V.sub(base, V.mul(nn, w));
      dw.setStrokes(`tri${n}`, [[P, c1], [c1, c2], [c2, P]]);
      const pb = V.sub(P, V.mul(ud, h + gap));
      const e1 = V.add(pb, V.mul(nn, w * 1.55)), e2 = V.sub(pb, V.mul(nn, w * 1.55));
      dw.setSeg(`pl${n}`, e1, e2);
      dw.setStrokes(`hat${n}`, V.hatch(e2, e1, -1, 0.62, 6));
      // the reaction: fixed length, its DIRECTION is what the case is about
      dw.setArrow(`re${n}`, V.sub(P, V.mul(u, 4.9)), V.sub(P, V.mul(u, 2.4)));
      dw.setLabel(`lre${n}`, V.add(V.sub(P, V.mul(u, 5.9)), [n === 'A' ? -0.9 : -1.4, -0.3]));
      dw.setText(`lre${n}`, K >= 2 ? `${n} = ${d.Amag.toFixed(2)} kN` : `${n} = ?`);
    }
    dw.setDashLine('axA', [V.sub(d.Apt, V.mul(d.uA, 7.2)), V.add(d.Apt, V.mul(d.uA, 3.2))]);

    // ---- the force diagram
    dw.setDisk('fo', d.P);
    dw.setLabel('lfo', V.add(d.P, [-0.55, 0.5]));
    dw.setArrow('fR', d.Stop, d.Sbot);
    dw.setLabel('lfR', V.add(V.mid(d.Stop, d.Sbot), [2.05, 0]));
    dw.setText('lfR', `R = ${d.R.toFixed(2)}`);
    dw.setSeg('ray2', d.P, d.Stop);
    dw.setSeg('ray1', d.P, d.Sbot);
    dw.setLabel('lray2', V.add(V.mid(d.P, d.Stop), [0.85, -0.35]));
    dw.setLabel('lray1', V.add(V.mid(d.P, d.Sbot), [0.85, 0.35]));
    dw.setSeg('ray3', d.P, d.Q);
    dw.setLabel('lray3', V.add(V.mid(d.P, d.Q), [0, -0.75]));
    dw.setText('lray3', Math.abs(d.T) < 5e-3 ? '3 · 0.00' : `3 · ${Math.abs(d.T).toFixed(2)}`);
    dw.setArrow('fA', d.Q, d.Stop);
    dw.setArrow('fB', d.Sbot, d.Q);
    dw.setLabel('lfA', V.add(V.mid(d.Q, d.Stop), [-1.75, 0.50]));
    dw.setText('lfA', `A ${d.Amag.toFixed(2)}`);
    dw.setLabel('lfB', V.add(V.mid(d.Sbot, d.Q), [-1.75, -0.50]));
    dw.setText('lfB', `B ${d.Amag.toFixed(2)}`);

    // ---- the subsystem: the three forces on node B, drawn from the node
    const vs = [d.fArch, d.fStr, d.fRe];
    const vmax = Math.max(1e-9, ...vs.map((v) => V.len(v)));
    const rr = 2.5 / vmax;
    dw.setDisk('sc', SUB);
    const nm = ['s1', 's3', 'sB'];
    const lb = ['ls1', 'ls3', 'lsB'];
    vs.forEach((v, i) => {
      const tip = V.add(SUB, V.mul(v, rr));
      dw.setArrow(nm[i], SUB, tip);
      dw.setLabel(lb[i], V.add(SUB, V.mul(v, rr * 1.32)));
    });

    // ---- the four cases, listed under the drawing
    const tag = ['a) ⟂ tangent', 'b) 65°', 'c) vertical', 'd) hanging'];
    for (let i = 0; i < 4; i++) {
      dw.setLabel(`cmp${i}`, [24.0, -9.6 - i * 1.5]);
      dw.setText(`cmp${i}`, `${i === d.ci ? '▶ ' : ''}${tag[i]} · A = B = ${d.all[i].toFixed(2)} kN`
        + ` · string ${Math.abs(d.allT[i]).toFixed(2)} kN`
        + (Math.abs(d.allT[i]) < 5e-3 ? '' : i === 3 ? ' comp.' : ' tens.'));
    }

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const c = panel.section('The case');
  panel.slider(c, s, 'cse', 'support condition', 0, 3, 1, refresh,
    (v) => CASES[Math.round(v)].name);
  panel.toggle(c, s, 'free', 'override the support angle', refresh);
  panel.slider(c, s, 'theta', 'reaction direction at A (°)', 25, 90, 1, refresh,
    (v) => `${v}°`);
  const g = panel.section('Given');
  panel.slider(g, s, 'q', 'q₁ (kN/m)', 2, 10, 0.5, refresh, (v) => `${v.toFixed(1)} kN/m`);
  panel.slider(g, s, 'f', 'rise / sag f (m)', 0.8, 2.6, 0.05, refresh, (v) => `${v.toFixed(2)} m`);
  const w = panel.section('What to show');
  panel.toggle(w, s, 'sub', 'the node-B subsystem', refresh);
  panel.toggle(w, s, 'lbl', 'show labels', refresh);

  refresh();
  return player;
}
