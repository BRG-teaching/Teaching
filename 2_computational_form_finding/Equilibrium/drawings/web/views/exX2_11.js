/**
 * EX X · Aufgabe 11 — Load-influenced Area (tributary areas)
 * Structural Design II, FS 23, sheet "EX X — Additional Exercises", page 9.
 *
 * NUMBERING. The English sheet calls this "Task 1" — one of three blocks with
 * that label. The German numbering, used here, is Aufgabe 11 (error E1).
 *
 * TEXT (verbatim, English). "The plate is loaded by a dead area load of
 * s_k = 1 kN/m². Calculate the design value of the constant area load.
 * Draw the relevant load-influenced area into the floor plan for both of the
 * following cases, a) and b). Then calculate the point load R and the line
 * load g over the relevant beam and complete the table."
 *
 * ERROR E6, carried in the view. The English asks for "both of the following
 * cases, a) and b)". FOUR cases are drawn, a) to d), each with its own table.
 * The German is right: "Zeichnen Sie für die Situationen a) bis d) …", and it
 * asks for R_d and g_d.
 *
 * GIVEN. s_k = 1 kN/m², explicitly a DEAD area load, so only γ_G = 1.35
 * applies and no live load exists on this page. Plate 7.5 m × 5 m (printed;
 * it digitises to 7.497 × 4.998, a 0.04 % drawing error — this is one of the
 * two calibrations that prove the sheet's stated scales are honoured, so the
 * printed values are used). Plans 1:200.
 *
 * GEOMETRY, metres, origin = lower-left corner of the plan, x along the 7.5 m
 * side, y along the 5 m side. From the sections: plate 0.400 thick, beams
 * 0.500 wide and 1.271 deep.
 *
 *   a  ONE beam,  along x, centreline y = 2.499 (mid-depth)   length 7.500
 *   b  TWO beams, along x, centrelines y = 0.250 and 4.748    length 7.500
 *   c  TWO beams, along y, centrelines x = 0.250 and 7.247    length 5.000
 *   d  FOUR beams in a closed ring, a 0.5 m perimeter band; the inner dashed
 *      rectangle runs x 0.499 … 6.997, y 0.500 … 4.498
 *
 * The small orthographic views are what disambiguate the axonometrics: a)'s
 * side section shows one 0.5 m stub at mid-depth; b)'s side section is a C,
 * stubs at both ends; c)'s front elevation is "a table with two legs"; d)'s
 * side section is a closed box. a → d is the classic progression: one beam,
 * two spanning the long way, two spanning the short way, a two-way ring.
 *
 * DESIGN LOAD.  s_d = 1.35 × 1.000 = 1.3500 kN/m²
 *               total on the plate = 1.3500 × 7.5 × 5.0 = 50.625 kN
 *
 * ANSWERS (all recomputed live; each was also checked by hand and a second
 * time through R = g × L, and the two routes agree exactly):
 *
 *  case  relevant beam         A [m²]   g [kN/m]              R [kN]
 *   a    the single beam       37.500   6.7500                50.625
 *   b    either edge beam      18.750   3.3750                25.3125
 *   c    either edge beam      18.750   5.0625                25.3125
 *   d    the LONG 7.5 m beam   12.500   3.3750 peak /
 *                                       2.2500 equivalent     16.875
 *   d    the short 5 m beam     6.2500  3.3750 peak /
 *                                       1.6875 equivalent      8.4375
 *
 *  working
 *   a) g = 1.3500 × 5.000 = 6.7500 kN/m ; R = 6.7500 × 7.500 = 50.625 kN
 *   b) g = 1.3500 × 2.500 = 3.3750 kN/m ; R = 3.3750 × 7.500 = 25.3125 kN
 *   c) g = 1.3500 × 3.750 = 5.0625 kN/m ; R = 5.0625 × 5.000 = 25.3125 kN
 *   d) 45° lines from the corners. Long beam: trapezoid,
 *      A = (7.500 + 2.500)/2 × 2.500 = 12.500 m², R = 16.875 kN, ordinate
 *      3.3750 kN/m over the middle 2.500 m tapering to zero at the corners.
 *      Short beam: triangle, A = ½ × 5.000 × 2.500 = 6.2500 m², R = 8.4375 kN,
 *      same 3.3750 kN/m peak at midspan.
 *
 *  INDEPENDENT CHECK — the tributary areas of every case tile the plate
 *  exactly, with no gap and no overlap, and the R's therefore always add to
 *  the same 50.625 kN:
 *      a  37.500                      = 37.500 m²   50.625            = 50.625
 *      b  2 × 18.750                  = 37.500      2 × 25.3125       = 50.625
 *      c  2 × 18.750                  = 37.500      2 × 25.3125       = 50.625
 *      d  2 × 12.500 + 2 × 6.2500     = 37.500      2 × 16.875 + 2 × 8.4375
 *                                                                     = 50.625
 *
 * AMBIGUITY, stated in the view. The table row is labelled "g" (English) /
 * "g_d" (German) and the sheet never says whether case d) wants the PEAK
 * ordinate of the triangle/trapezoid or the EQUIVALENT uniform value. Both are
 * quoted. Also: the axonometrics of a) and b) show stub columns that appear in
 * no other view and are not dimensioned — the plate's own supports are
 * undefined, and irrelevant to the tributary question.
 *
 * The sheet prints no answers. Everything above is derived.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

const GAM_G = 1.35;                    // compendium 2.6, dead load
const LX = 7.5, LY = 5.0;              // the plate, m (printed values)
const BW = 0.5;                        // beam width, m

// the four cases. `beams` are centre-lines; `rel` is the beam the table is
// about; `trib(i)` is the tributary polygon of beam i, in plate coordinates
const CASE = [
  { tag: 'a)', name: 'one beam across the middle',
    beams: [{ dir: 'x', at: LY / 2, L: LX }],
    tell: 'the only support there is, so the plate cantilevers 2.5 m onto it from each side and every square metre arrives here' },
  { tag: 'b)', name: 'two beams along the 7.5 m edges',
    beams: [{ dir: 'x', at: BW / 2, L: LX }, { dir: 'x', at: LY - BW / 2, L: LX }],
    tell: 'the plate now spans the SHORT way, 5 m, and each beam takes half of it' },
  { tag: 'c)', name: 'two beams along the 5 m edges',
    beams: [{ dir: 'y', at: BW / 2, L: LY }, { dir: 'y', at: LX - BW / 2, L: LY }],
    tell: 'the same two beams, turned through 90°: now the plate spans the LONG way and each beam takes half of 7.5 m' },
  { tag: 'd)', name: 'four beams — a closed ring',
    beams: [{ dir: 'x', at: BW / 2, L: LX }, { dir: 'x', at: LY - BW / 2, L: LX },
            { dir: 'y', at: BW / 2, L: LY }, { dir: 'y', at: LX - BW / 2, L: LY }],
    tell: 'a two-way plate: the load splits at 45° from each corner, so the long beams get trapezoids and the short beams get triangles' },
];

// tributary polygons, plate coordinates, one per beam of each case
function tribOf(c, i) {
  const h = LY / 2, w = LX / 2;
  if (c === 0) return [[0, 0], [LX, 0], [LX, LY], [0, LY]];
  if (c === 1) return i === 0 ? [[0, 0], [LX, 0], [LX, h], [0, h]]
                              : [[0, h], [LX, h], [LX, LY], [0, LY]];
  if (c === 2) return i === 0 ? [[0, 0], [w, 0], [w, LY], [0, LY]]
                              : [[w, 0], [LX, 0], [LX, LY], [w, LY]];
  // d) 45° from every corner: LY < LX, so the two fold lines meet at y = LY/2
  const a = LY / 2;
  if (i === 0) return [[0, 0], [LX, 0], [LX - a, a], [a, a]];          // long, bottom
  if (i === 1) return [[0, LY], [a, LY - a], [LX - a, LY - a], [LX, LY]];
  if (i === 2) return [[0, 0], [a, a], [a, LY - a], [0, LY]];          // short, left
  return [[LX, 0], [LX, LY], [LX - a, LY - a], [LX - a, a]];
}

const NBEAM = 4;

// --------------------------------------------------------------- geometry --

const PX = 3.2, PY = -3.4, PM = 2.85;    // the plan
const EX = -15.0, EY = -6.6, EM = 2.05;  // the beam elevation, centred on EX
const EGREF = 5.5;                       // the biggest ordinate, in units
const CX0 = 3.2, CKN = 0.34;             // the comparison chart
const CROW = [-6.4, -8.9, -11.2, -13.5, -15.8, -18.1];
const NARROW = 21;

const DEFAULTS = { sk: 1.0, cs: 0, sub: 0, all: true, lbl: true, _k: 99 };

const K_BEAM = 2, K_TRIB = 3, K_G = 4, K_R = 5, K_SUM = 6;

export const meta = {
  title: 'EX X · 11 — the same plate, four times, four different beams',
  subtitle: 'Structural Design II · “EX X — Additional Exercises”, p. 9 · German Aufgabe 11 (the English sheet calls it “Task 1”)',
  about: 'A 7.5 by 5 metre floor plate carrying one kilonewton per square metre, and four ways of holding it up. Nothing about the plate or the load changes between them — only which beams are there — and yet the load on the relevant beam runs from 50.6 kN down to 8.4 kN. The rule that produces every one of those numbers is the same: a beam picks up everything nearer to it than to any other support, so halve the distance to the neighbour, and where the plate spans two ways, split it at 45° from the corners. The check that costs nothing is that the four tributary areas always tile the whole plate exactly, so the point loads always add back to 50.625 kN.',
  result: (d) => [
    `s_d = ${GAM_G} × ${d.sk.toFixed(2)} = ${d.sd.toFixed(4)} kN/m² · the whole plate carries ${d.Stot.toFixed(3)} kN over ${(LX * LY).toFixed(1)} m²`,
    `${d.tag} ${d.bname}: A = ${d.A.toFixed(4)} m² → R = s_d × A = ${d.R.toFixed(4)} kN`,
    d.tapered
      ? `${d.tag} g is not constant: it peaks at ${d.gpeak.toFixed(4)} kN/m and averages ${d.gequiv.toFixed(4)} kN/m over the ${d.L.toFixed(3)} m — the sheet never says which one its table wants, so both are given`
      : `${d.tag} g = s_d × ${d.bw.toFixed(3)} m tributary width = ${d.gpeak.toFixed(4)} kN/m, and R = g × L = ${(d.gpeak * d.L).toFixed(4)} kN ✓`,
    `check: the tributary areas of ${d.tag} sum to ${d.Asum.toFixed(3)} m² = the whole plate, and their R's to ${d.Rsum.toFixed(3)} kN = ${d.Stot.toFixed(3)} kN ✓`],
  frame: [[-26, -22], [30, 16]],
};

const STEPS = [
  { t: 'The exercise', d: 'EX X page 9, German Aufgabe 11. One plate, one area load, and the question every floor plan asks: how much of it lands on THIS beam. The English text asks for “both of the following cases, a) and b)” — but four cases are drawn, each with its own table',
    detail: () => ['German: “Zeichnen Sie für die Situationen a) bis d) …” — four, and it asks for R_d and g_d',
                   'the sheet also prints two calibration dimensions here, 7.5 m and 5 m, which digitise to 7.497 and 4.998',
                   'that 0.04 % is how we know every other length on this booklet can be scaled off the drawing'],
    take: 'the English translation halved the exercise. Use the German' },
  { t: 'The plate and its design load', d: 'the load is characteristic and it is DEAD — so one factor, 1.35, and no live load anywhere on this page. Multiply it out once and remember the total: it is the only check you get',
    detail: (d) => [`s_d = γ_G × s_k = ${GAM_G} × ${d.sk.toFixed(2)} = ${d.sd.toFixed(4)} kN/m²`,
                    `plate ${LX} × ${LY} = ${(LX * LY).toFixed(1)} m²`,
                    `total = ${d.sd.toFixed(4)} × ${(LX * LY).toFixed(1)} = ${d.Stot.toFixed(3)} kN`],
    take: 'γ_Q never appears here. A dead load is known better than a live one, so it is punished less' },
  { t: 'The beams', d: 'switch between the four arrangements in the panel. Same plate, same load, same everything — only the beams move, and in d) there are four of them',
    detail: (d) => [`${d.tag} ${d.name}`, d.tell,
                    `${d.beams.length} beam${d.beams.length > 1 ? 's' : ''}, ${BW.toFixed(1)} m wide`],
    take: 'the sheet draws each case as an axonometric AND as two small orthographic views. It is the little side sections that tell you which is which' },
  { t: 'The tributary area', d: 'shaded green: the part of the plate whose load walks to the highlighted beam. The rule is halfway to the neighbouring support — and in d), where the plate spans both ways at once, the boundary is a 45° line out of each corner',
    detail: (d) => [`tributary width ${d.bw.toFixed(3)} m` + (d.tapered ? ' at the middle, tapering to zero at the corners' : ' along the whole length'),
                    `A = ${d.A.toFixed(4)} m²`,
                    `and the ${d.beams.length} areas of this case tile the plate: ${d.Asum.toFixed(3)} m² ✓`],
    take: 'a tributary area is not a guess. It is a Voronoi cell, and its edges are always halfway' },
  { t: 'The line load', d: 'left: the beam on its own, with the load the plate hands it. Multiply the area load by the tributary WIDTH and you get a load per metre — that is the whole conversion, and it is why case c) has a bigger g than case b) with exactly the same area',
    detail: (d) => (d.tapered
      ? [`peak ordinate g = s_d × ${d.bw.toFixed(3)} = ${d.gpeak.toFixed(4)} kN/m at midspan`,
         `equivalent uniform load = R / L = ${d.R.toFixed(4)} / ${d.L.toFixed(3)} = ${d.gequiv.toFixed(4)} kN/m`,
         `the sheet's table just says "g" and never resolves which — so both are quoted`]
      : [`g = s_d × b = ${d.sd.toFixed(4)} × ${d.bw.toFixed(3)} = ${d.gpeak.toFixed(4)} kN/m`,
         `constant over the whole ${d.L.toFixed(3)} m`,
         `b) and c) have the SAME area but different g, because the beams have different lengths`]),
    take: 'g is per metre of BEAM, so it depends on the tributary width; R is the total, so it depends on the area' },
  { t: 'The point load', d: 'and the total the beam has to carry: the area load times the area, which is the same thing as the line load times the length. Two routes, one number — do both, it is free',
    detail: (d) => [`R = s_d × A = ${d.sd.toFixed(4)} × ${d.A.toFixed(4)} = ${d.R.toFixed(4)} kN`,
                    d.tapered ? `and R = g_equiv × L = ${d.gequiv.toFixed(4)} × ${d.L.toFixed(3)} = ${(d.gequiv * d.L).toFixed(4)} kN ✓`
                              : `and R = g × L = ${d.gpeak.toFixed(4)} × ${d.L.toFixed(3)} = ${(d.gpeak * d.L).toFixed(4)} kN ✓`,
                    `at ${(100 * d.R / d.Stot).toFixed(1)} % of the plate's ${d.Stot.toFixed(3)} kN`] },
  { t: 'The check that costs nothing', d: 'the tributary areas of any one case tile the plate — no gap, no overlap — so the beam loads must add back to the total. If they do not, the tributary drawing is wrong, and this is the only way to find out without redoing it',
    detail: (d) => [`areas: ${d.parts.map((p) => p.A.toFixed(3)).join(' + ')} = ${d.Asum.toFixed(3)} m² (plate ${(LX * LY).toFixed(1)}) ✓`,
                    `loads: ${d.parts.map((p) => p.R.toFixed(3)).join(' + ')} = ${d.Rsum.toFixed(3)} kN (total ${d.Stot.toFixed(3)}) ✓`,
                    `in d) the two long beams take ${(100 * 2 * 16.875 / 50.625).toFixed(0)} % and the two short ones ${(100 * 2 * 8.4375 / 50.625).toFixed(0)} %`],
    take: 'the long beams of a two-way plate always take more than the short ones, and by exactly the ratio of the trapezoid to the triangle' },
  { t: 'Four answers from one plate', d: 'bottom right: every beam of every case, drawn against the same scale. The plate never changed and the load never changed — this whole spread is a consequence of where somebody put the beams. That is the lesson of the page',
    detail: (d) => [`a) 50.625 · b) 25.3125 · c) 25.3125 · d) 16.875 (long) and 8.4375 (short) kN`,
                    `b) and c) hold the SAME 25.3125 kN with different line loads: 3.3750 vs 5.0625 kN/m`,
                    `every column adds back to ${d.Stot.toFixed(3)} kN`],
    take: 'choosing a beam layout is choosing the loads. The structure is decided long before anything is dimensioned' },
];

// ------------------------------------------------------------------ maths --

const polyArea = (p) => {
  let a = 0;
  for (let i = 0; i < p.length; i++) {
    const j = (i + 1) % p.length;
    a += p[i][0] * p[j][1] - p[j][0] * p[i][1];
  }
  return Math.abs(a) / 2;
};

function compute(s) {
  const sd = GAM_G * s.sk;
  const Stot = sd * LX * LY;
  const c = Math.round(s.cs);
  const C = CASE[c];
  const parts = C.beams.map((b, i) => {
    const poly = tribOf(c, i);
    const A = polyArea(poly);
    return { ...b, i, poly, A, R: sd * A };
  });
  const Asum = parts.reduce((t, p) => t + p.A, 0);
  const Rsum = parts.reduce((t, p) => t + p.R, 0);

  // which beam the table is about: the user's pick, clamped
  const bi = Math.min(Math.round(s.sub), parts.length - 1);
  const B = parts[bi];
  const L = B.L;
  const tapered = c === 3;
  // tributary WIDTH: the constant one for a/b/c, the peak one for d
  const bw = tapered ? LY / 2 : B.A / L;
  const gpeak = sd * bw;
  const gequiv = B.R / L;
  const bname = c === 3 ? (B.dir === 'x' ? `the long ${L.toFixed(1)} m beam` : `the short ${L.toFixed(1)} m beam`)
    : parts.length > 1 ? `either beam (identical by symmetry)` : 'the single beam';

  // the ordinate of the line load along the beam, for the elevation
  const ord = Array.from({ length: NARROW }, (_, k) => {
    const t = (k / (NARROW - 1)) * L;
    if (!tapered) return gpeak;
    const e = Math.min(t, L - t);                 // distance to the nearer end
    return sd * Math.min(e, LY / 2);
  });

  return { sk: s.sk, sd, Stot, c, tag: C.tag, name: C.name, tell: C.tell,
           beams: C.beams, parts, Asum, Rsum, bi, B, L, bw, tapered,
           eg: EGREF / (sd * LY),
           A: B.A, R: B.R, gpeak, gequiv, bname, ord };
}

// every case's every beam, for the comparison chart (geometry only, so it can
// be built once)
const ALL = (() => {
  const out = [];
  CASE.forEach((C, c) => {
    const seen = new Set();
    C.beams.forEach((b, i) => {
      const key = `${b.dir}${b.L.toFixed(2)}`;
      if (seen.has(key)) return;                  // symmetric twins: show one
      seen.add(key);
      const A = polyArea(tribOf(c, i));
      const n = C.beams.filter((o) => `${o.dir}${o.L.toFixed(2)}` === key).length;
      out.push({ c, i, tag: C.tag, dir: b.dir, L: b.L, A, n });
    });
  });
  return out;
})();

// ------------------------------------------------------------------- view --

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const NARR = dw.W.narrow;
  const px = (x, y) => [PX + x * PM, PY + y * PM];

  dw.label('t_plan', '', { cls: 'title', flash: false });
  dw.label('t_elev', '', { cls: 'title', flash: false });
  dw.label('t_chart', '', { cls: 'title', flash: false });

  // ---- the plan
  dw.strokes('plate', 4, { intro: 1, w: dw.W.str, color: PAL.black });
  dw.label('lplate', '', { cls: 'num', intro: 1, color: PAL.grey });
  for (let i = 0; i < NBEAM; i++) {
    dw.poly(`beam${i}`, 4, { intro: K_BEAM, color: PAL.grey, opacity: 0.85, z: -0.1,
      when: (st, dd) => !!dd && i < dd.beams.length });
    dw.poly(`tribAll${i}`, 4, { intro: K_TRIB, color: PAL.green, opacity: 0.07, z: -0.28,
      when: (st, dd) => !!dd && st.all && i < dd.parts.length });
    dw.dashLine(`tribEdge${i}`, { intro: K_TRIB, color: PAL.grey, dash: dw.W.dash,
      when: (st, dd) => !!dd && i < dd.parts.length });
  }
  dw.poly('trib', 4, { intro: K_TRIB, color: PAL.green, opacity: 0.24, z: -0.22 });
  dw.strokes('relBeam', 1, { intro: K_TRIB, w: dw.W.bar * 1.6, color: PAL.green });
  dw.label('ltrib', '', { cls: 'num', intro: K_TRIB, color: PAL.green });

  // ---- the beam elevation, on the left
  dw.seg('bm', { intro: K_G, w: dw.W.bar, color: PAL.black });
  dw.seg('qtop', { intro: K_G, w: dw.W.thin, color: PAL.green,
    when: (st, dd) => !!dd && !dd.tapered });
  dw.dashLine('qshape', { intro: K_G, color: PAL.green, dash: dw.W.dash * 0.6,
    when: (st, dd) => !!dd && dd.tapered });
  dw.arrows('qarr', NARROW, { intro: K_G, w: dw.W.thin, color: PAL.green,
    headLen: dw.W.narrow.headLen * 0.7, headW: dw.W.narrow.headW * 0.7 });
  dw.label('lq', '', { cls: 'num', intro: K_G, color: PAL.green });
  dw.arrow('resR', { intro: K_R, color: PAL.green, ...NARR });
  dw.label('lR', '', { cls: 'num', intro: K_R, color: PAL.green });
  dw.seg('dimL', { intro: K_G, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('ldimL', '', { intro: K_G, flash: false, color: PAL.grey });

  // ---- the comparison chart
  for (let i = 0; i < ALL.length; i++) {
    dw.poly(`cb${i}`, 4, { intro: K_SUM + 1, z: -0.2, opacity: 0.8, flash: false,
      color: { pending: PAL.grey,
               final: (dd) => (ALL[i].c === dd.c ? PAL.green : PAL.zero) } });
    dw.label(`lcb${i}`, '', { cls: 'num', intro: K_SUM + 1,
      color: { pending: PAL.grey,
               final: (dd) => (ALL[i].c === dd.c ? PAL.green : PAL.grey) } });
  }
  dw.seg('ctot', { intro: K_SUM + 1, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lctot', '', { intro: K_SUM + 1, flash: false, color: PAL.grey });

  dw.instant('t_plan', 't_elev', 't_chart');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);

    dw.setLabel('t_plan', [PX + (LX / 2) * PM, PY + LY * PM + 1.7]);
    dw.setText('t_plan', `Grundriss 1:200 — ${d.tag} ${d.name}`);
    dw.setLabel('t_elev', [EX, EY + 9.4]);
    dw.setText('t_elev', `${d.tag} ${d.bname} on its own`);
    dw.setLabel('t_chart', [CX0 + 7.0, CROW[0]]);
    dw.setText('t_chart', `R on every beam of every case — 1 unit ≙ ${(1 / CKN).toFixed(2)} kN`);

    // --- the plan: plate, beams, tributary areas
    const cn = [px(0, 0), px(LX, 0), px(LX, LY), px(0, LY)];
    dw.setStrokes('plate', cn.map((p, i) => [p, cn[(i + 1) % 4]]));
    dw.setLabel('lplate', px(LX / 2, LY + 0.28));
    dw.setText('lplate', `${LX} × ${LY} m · s_d = ${d.sd.toFixed(3)} kN/m² · ${d.Stot.toFixed(3)} kN in total`);

    for (let i = 0; i < NBEAM; i++) {
      const b = d.beams[i];
      if (b) {
        const h = BW / 2;
        const q = b.dir === 'x'
          ? [px(0, b.at - h), px(LX, b.at - h), px(LX, b.at + h), px(0, b.at + h)]
          : [px(b.at - h, 0), px(b.at + h, 0), px(b.at + h, LY), px(b.at - h, LY)];
        dw.setPoly(`beam${i}`, q);
      }
      const p = d.parts[i];
      if (p) {
        const ring = p.poly.map(([x, y]) => px(x, y));
        while (ring.length < 4) ring.push(ring[ring.length - 1]);
        dw.setPoly(`tribAll${i}`, ring);
        dw.setDashLine(`tribEdge${i}`, [...ring, ring[0]]);
      }
    }
    const rel = d.B.poly.map(([x, y]) => px(x, y));
    while (rel.length < 4) rel.push(rel[rel.length - 1]);
    dw.setPoly('trib', rel);
    const rb = d.B.dir === 'x' ? [px(0, d.B.at), px(LX, d.B.at)]
                               : [px(d.B.at, 0), px(d.B.at, LY)];
    dw.setStrokes('relBeam', [rb]);
    // the label goes at the centroid of the tributary polygon
    const cxy = d.B.poly.reduce((t, p) => [t[0] + p[0] / d.B.poly.length,
                                           t[1] + p[1] / d.B.poly.length], [0, 0]);
    // step the area label off the beam's own centreline, or it lands on it
    if (d.B.dir === 'x') cxy[1] += cxy[1] - d.B.at >= -0.01 ? 0.75 : -0.75;
    else cxy[0] += cxy[0] - d.B.at >= -0.01 ? 0.75 : -0.75;
    dw.setLabel('ltrib', px(cxy[0], cxy[1]));
    dw.setText('ltrib', `A = ${d.A.toFixed(3)} m²`);

    // --- the beam elevation
    const half = (d.L * EM) / 2;
    const x0 = EX - half, x1 = EX + half;
    dw.setSeg('bm', [x0, EY], [x1, EY]);
    const EG = d.eg;
    dw.setSeg('qtop', [x0, EY + 0.5 + d.gpeak * EG], [x1, EY + 0.5 + d.gpeak * EG]);
    dw.setDashLine('qshape', d.ord.map((g, k) =>
      [x0 + ((x1 - x0) * k) / (NARROW - 1), EY + 0.5 + g * EG]));
    dw.setArrows('qarr', d.ord.map((g, k) => {
      const x = x0 + ((x1 - x0) * k) / (NARROW - 1);
      return [[x, EY + 0.5 + g * EG], [x, EY + 0.35]];
    }));
    dw.setLabel('lq', [EX, EY + 0.5 + d.gpeak * EG + 1.0]);
    dw.setText('lq', d.tapered
      ? `g peaks at ${d.gpeak.toFixed(4)} kN/m (average ${d.gequiv.toFixed(4)})`
      : `g = ${d.gpeak.toFixed(4)} kN/m`);
    dw.setArrow('resR', [EX, EY - 1.6], [EX, EY - 4.6]);
    dw.setLabel('lR', [EX + 4.6, EY - 3.4]);
    dw.setText('lR', `R = ${d.R.toFixed(4)} kN`);
    dw.setSeg('dimL', [x0, EY - 5.6], [x1, EY - 5.6]);
    dw.setLabel('ldimL', [EX, EY - 6.4]);
    dw.setText('ldimL', `L = ${d.L.toFixed(3)} m`);

    // --- the comparison chart
    ALL.forEach((a, i) => {
      const y = CROW[i + 1] ?? CROW[CROW.length - 1];
      const R = d.sd * a.A;
      dw.setPoly(`cb${i}`, [[CX0, y - 0.75], [CX0 + R * CKN, y - 0.75],
                            [CX0 + R * CKN, y + 0.75], [CX0, y + 0.75]]);
      dw.setLabel(`lcb${i}`, [CX0 + d.Stot * CKN + 4.9, y]);
      dw.setText(`lcb${i}`, `${a.tag} ${a.n > 1 ? `${a.n}× ` : ''}${a.L.toFixed(1)} m — ${R.toFixed(4)} kN`);
    });
    dw.setSeg('ctot', [CX0 + d.Stot * CKN, CROW[1] + 1.4],
                      [CX0 + d.Stot * CKN, CROW[CROW.length - 1] - 1.4]);
    dw.setLabel('lctot', [CX0 + d.Stot * CKN + 3.4, CROW[CROW.length - 1] - 2.0]);
    dw.setText('lctot', `the whole plate, ${d.Stot.toFixed(3)} kN`);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const w = panel.section('The situation');
  panel.slider(w, s, 'cs', 'case', 0, 3, 1, refresh,
    (v) => `${CASE[Math.round(v)].tag} ${CASE[Math.round(v)].name}`);
  panel.slider(w, s, 'sub', 'which beam', 0, 3, 1, refresh,
    (v) => {
      const C = CASE[Math.round(s.cs)];
      const b = C.beams[Math.min(Math.round(v), C.beams.length - 1)];
      return `${b.dir === 'x' ? LX.toFixed(1) : LY.toFixed(1)} m, ${b.dir === 'x' ? 'along x' : 'along y'}`;
    });
  panel.toggle(w, s, 'all', 'shade every tributary area faintly', refresh);
  panel.toggle(w, s, 'lbl', 'show labels', refresh);
  const g = panel.section('Given');
  panel.slider(g, s, 'sk', 's_k (kN/m²)', 0.5, 5.0, 0.1, refresh,
    (v) => `${v.toFixed(1)} kN/m² (dead)`);

  refresh();
  return player;
}
