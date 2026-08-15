/**
 * EX 9 · Creative Task — Beam grid pavilion
 * Structural Design II, FS 23 (sheet EX 9 "Plates", page 3).
 *
 * "An existing pavilion consisting of walls and columns gets a new supporting
 *  structure to carry the roof. Given are the point loads resulting from the
 *  new roof covering and the position of the walls and columns.
 *  a) Design a beam grid through which the loads of the roof can be
 *     transferred to the existing walls and columns. Note that the maximum
 *     length of the beams is 9 meters and that each beam has a hight [sic] of
 *     2 meters. Draw your design in both, floor plan and axonometric drawing.
 *  b) Using the axonometric drawing, consider how the forces are transferred
 *     through the beams into the walls and columns. Then draw an elevation of
 *     each type of beam in scale in the form diagram and find the respective
 *     force flow in it. Indicate tension forces with red, compression forces
 *     with blue and reaction forces with green."
 *
 * GEOMETRY, digitised from page 3 at the stated 1:100. Origin O = the
 * top-left grid intersection, +x right, +y down.
 *   footprint       9.00 m × 12.00 m — 3 bays of 3.00 m by 4 bays of 3.00 m
 *   point loads F   TEN of them, at (3,0) (3,3) (3,6) (3,9) (3,12) and
 *                   (6,0) (6,3) (6,6) (6,9) (6,12). None sits over an
 *                   existing support.
 *   columns (3)     0.20 × 0.20 m, at (0,0), (9,0) and (9,12)
 *   walls (0.20 m)  an L in the bottom left: x = 0 from y = 9 to 12, and
 *                   y = 12 from x = 0 to 3; plus a 6.00 m wall at x = 9 from
 *                   y = 3 to 9
 *   heights         existing walls and columns 3 m, new beam grid 2 m above
 *
 * A TRAP IN THE PDF, recorded so nobody falls into it twice: `pdftotext`
 * returns TWENTY "F" labels on page 3 and only TEN are drawn. The ten
 * phantoms are the real set translated by (−2.32, −80.35) pt — an earlier
 * layout left behind in the text layer. `pdftocairo` emits no glyph paths for
 * them and a 600 dpi render shows blank paper there. Ten loads, not twenty.
 *
 * WHAT IS AND IS NOT DETERMINED. F has no magnitude, page 3 carries no force
 * scale, and the beam width is not given, so every force here is a multiple of
 * F. The beam grid itself is the design freedom — this is the open task.
 *
 * THE DESIGN DRAWN HERE, and why it is the neat one:
 *   The 9 m transport limit is exactly the 9 m plan width but only ¾ of the
 *   12 m plan depth, so nothing can run the full depth: the primary beams have
 *   to run across, in x.
 *   - five transverse beams of 9.00 m, at y = 0, 3, 6, 9, 12. Each carries two
 *     loads F at its third points, so each end takes exactly F.
 *   - their right-hand ends land on the column (9,0), the 6 m wall (three of
 *     them) and the column (9,12).
 *   - their left-hand ends land on the column (0,0), the L-wall (two of them)
 *     — and the two at y = 3 and y = 6 have nothing under them, so
 *   - one 9.00 m longitudinal spine at x = 0 from y = 0 to 9 picks those two
 *     up. It then carries 2F at ITS third points too: the same beam, again.
 *
 *   support totals   column (0,0) 2F · L-wall x=0 leg 2F · L-wall y=12 leg F ·
 *                    column (9,0) F · the 6 m wall 3F · column (9,12) F
 *                    Σ = 10F in, 10F out ✓
 *
 *   force flow in the 9 m beam, depth z = 2.000 m, two loads F at the third
 *   points:  M_max = F · 3.000 = 3.000 F·m, constant between the loads, so
 *            H     = M_max / z = 1.500 F   (top chord compression = tie tension)
 *            strut = √(F² + 1.500²F²) = 1.803 F at arctan(1/1.5) = 33.69°
 *   and because the spine is the same 9 m span with the same 2F at the same
 *   third points, it has an identical force flow: THERE IS ONLY ONE BEAM TYPE.
 *   That is the answer to part b).
 *
 * The panel offers the tempting alternative — one 12.00 m spine down the whole
 * left edge — which needs no second member but breaks the 9 m limit, and gives
 * a second, heavier beam type into the bargain (H = 2.250 F). The badge turns
 * red when it does.
 *
 * Since all the new beams sit at one level, the axonometric the sheet also
 * asks for adds nothing to the plan except the 2 m depth, which the elevation
 * below already shows at scale.
 *
 * The sheet prints no answers. Everything above is derived.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

const BW = 9.0, BH = 12.0;            // the footprint
const GX = [0, 3, 6, 9], GY = [0, 3, 6, 9, 12];
const LOADS = [];
for (const x of [3, 6]) for (const y of GY) LOADS.push([x, y]);
const COLS = [[0, 0], [9, 0], [9, 12]];
const TWALL = 0.20, TCOL = 0.20;
// [x0, y0, x1, y1] of each existing wall's centre line
const WALLS = [[0, 9, 0, 12], [0, 12, 3, 12], [9, 3, 9, 9]];
const LMAX = 9.0;                     // the transport limit
const NLD = 2;                        // point loads on one beam
const NCH = 3;                        // chord segments in one beam

const SUP = {
  C00: { p: [0, 0], nm: 'column (0,0)' },
  C90: { p: [9, 0], nm: 'column (9,0)' },
  C912: { p: [9, 12], nm: 'column (9,12)' },
  W9: { p: [9, 6], nm: 'the 6 m wall' },
  WL0: { p: [0, 9], nm: 'the L-wall, x = 0 leg' },
  WL12: { p: [0, 12], nm: 'the L-wall, y = 12 leg' },
};

const DEFAULTS = {
  F: 20,            // kN — ASSUMED: the sheet gives F no magnitude
  z: 2.0,           // m — the task fixes this at 2 m
  long: false,      // run one 12 m spine instead of the 9 m one
  which: 0,         // 0 = a transverse beam · 1 = the spine
  fd: true,
  lbl: true, _k: 99,
};

// -------------------------------------------------------------------- maths --

/**
 * A simply supported beam with point loads, and the funicular that carries
 * them inside a depth z: reactions, the thrust line, the chord forces and the
 * tie. Positions are measured from the left end of the beam.
 */
function beam(L, loads, z) {
  const W = loads.reduce((t, l) => t + l.P, 0);
  const Rb = loads.reduce((t, l) => t + (l.P * l.x) / L, 0);
  const Ra = W - Rb;
  const M = (x) => Ra * x - loads.reduce((t, l) => t + l.P * Math.max(0, x - l.x), 0);
  const Mmax = Math.max(...loads.map((l) => M(l.x)), 0);
  const H = Mmax / z;
  const nodes = [[0, 0], ...loads.map((l) => [l.x, M(l.x) / H]), [L, 0]];
  const shear = [];
  let Vv = Ra;
  for (const l of loads) { shear.push(Vv); Vv -= l.P; }
  shear.push(Vv);
  const N = shear.map((v) => Math.hypot(H, v));
  return { L, W, Ra, Rb, Mmax, H, nodes, shear, N, z,
           ang: (Math.atan2(Math.abs(shear[0]), H) * 180) / Math.PI };
}

function compute(s) {
  const F = s.F, z = Math.max(s.z, 0.2);
  const spineL = s.long ? 12.0 : 9.0;

  // five transverse beams, each 9.00 m with F at its third points
  const tr = beam(BW, [{ x: 3, P: F }, { x: 6, P: F }], z);
  // the spine, picking up the two transverse beams that have nothing under them
  const sp = beam(spineL, [{ x: 3, P: tr.Ra }, { x: 6, P: tr.Ra }], z);

  // where every beam end goes
  const rows = [
    { y: 0, left: 'C00', right: 'C90' },
    { y: 3, left: 'SP', right: 'W9' },
    { y: 6, left: 'SP', right: 'W9' },
    { y: 9, left: 'WL0', right: 'W9' },
    { y: 12, left: 'WL12', right: 'C912' },
  ];
  const tot = {};
  for (const k of Object.keys(SUP)) tot[k] = 0;
  for (const r of rows) {
    if (r.left !== 'SP') tot[r.left] += tr.Ra;
    tot[r.right] += tr.Rb;
  }
  const spEnds = s.long ? ['C00', 'WL12'] : ['C00', 'WL0'];
  tot[spEnds[0]] += sp.Ra;
  tot[spEnds[1]] += sp.Rb;

  const sumOut = Object.values(tot).reduce((a, b) => a + b, 0);
  const sumIn = LOADS.length * F;
  const maxLen = Math.max(BW, spineL);
  const ok = maxLen <= LMAX + 1e-9;
  // one beam type only if the spine carries the same thing over the same span
  const types = Math.abs(sp.L - tr.L) < 1e-9 && Math.abs(sp.H - tr.H) < 1e-6 ? 1 : 2;

  const which = Math.round(s.which);
  const B = which ? sp : tr;
  const Bname = which ? `the spine, ${sp.L.toFixed(2)} m` : `a transverse beam, ${BW.toFixed(2)} m`;

  return { F, z, tr, sp, spineL, rows, tot, spEnds, sumIn, sumOut, maxLen, ok, types,
           which, B, Bname, long: s.long,
           beams: [...rows.map((r) => ({ a: [0, r.y], b: [BW, r.y], L: BW })),
                   { a: [0, 0], b: [0, spineL], L: spineL }] };
}

// --------------------------------------------------------------------- view --

export const meta = {
  title: 'EX 9.4 — ten loads and nowhere to put them',
  subtitle: 'Structural Design II · sheet EX 9 “Plates”, creative task',
  about: 'An existing pavilion — three columns, an L of wall and one six-metre wall — gets a new roof, and the roof arrives as ten point loads, none of which is over an existing support. Design a beam grid to catch them. The one hard constraint is that no beam may be longer than nine metres, and the plan is nine metres wide but twelve deep, so the beams have to run across; two of them then have nothing to land on at the left, and one longitudinal spine of exactly nine metres picks those two up. It turns out to carry the same load over the same span as the others, so the whole pavilion is a single beam type — which is the neat answer to part b). The panel offers the obvious alternative, a twelve-metre spine, and shows the badge going red.',
  result: (d) => [
    `ten loads of F = ${d.F.toFixed(1)} kN = ${d.sumIn.toFixed(1)} kN, and every one of them lands between the existing supports`,
    `the grid: five transverse beams of ${BW.toFixed(2)} m plus one spine of ${d.spineL.toFixed(2)} m — longest ${d.maxLen.toFixed(2)} m ${d.ok ? `≤ ${LMAX.toFixed(2)} m ✓` : `> ${LMAX.toFixed(2)} m ✗ the transport limit is broken`}`,
    Object.entries(d.tot).map(([k, v]) => `${SUP[k].nm} ${(v / d.F).toFixed(2)} F`).join(' · ')
      + ` — Σ = ${(d.sumOut / d.F).toFixed(2)} F = ${d.sumOut.toFixed(1)} kN ✓`,
    `${d.Bname}, ${d.z.toFixed(2)} m deep: H = M/z = ${d.B.Mmax.toFixed(2)}/${d.z.toFixed(2)} = ${d.B.H.toFixed(3)} kN = ${(d.B.H / d.F).toFixed(3)} F · struts ${d.B.N[0].toFixed(3)} kN = ${(d.B.N[0] / d.F).toFixed(3)} F at ${d.B.ang.toFixed(2)}° — ${d.types === 1 ? 'and the spine is the SAME beam: one type only' : 'the spine is a second, heavier type'}`],
  frame: [[-26, -22], [30, 16]],
};

const FLOW = 6;

const STEPS = [
  { t: 'The exercise', d: 'EX 9 creative task: an existing pavilion of walls and columns, a new roof that arrives as ten point loads, and a beam grid to be designed. Two rules only — no beam longer than 9 metres, and every beam 2 metres deep' },
  { t: 'What exists', d: 'top: the floor plan at 1:100. Three columns and three lengths of wall, on a 3 metre grid, 9 metres wide and 12 deep. That is everything the sheet gives — the loads have no magnitude and there is no force scale on the page, so every answer here is a multiple of F',
    detail: () => [`footprint ${BW.toFixed(2)} × ${BH.toFixed(2)} m, ${GX.length - 1} × ${GY.length - 1} bays of 3.00 m`,
                   'columns at (0,0), (9,0), (9,12) · an L of wall bottom left · a 6.00 m wall at x = 9',
                   'the PDF’s text layer holds 20 “F” labels but only 10 are drawn — the other ten are an old layout left behind'] },
  { t: 'The ten loads', d: 'ten point loads, in two rows at x = 3 and x = 6 m. Not one of them sits over an existing wall or column, which is the whole reason a new structure is needed at all',
    detail: (d) => [`10 × F = ${d.sumIn.toFixed(1)} kN with F = ${d.F.toFixed(1)} kN (assumed — the sheet gives no magnitude)`,
                    'at (3,0) (3,3) (3,6) (3,9) (3,12) and (6,0) (6,3) (6,6) (6,9) (6,12)'],
    take: 'count the loads off the drawing, never off the text layer' },
  { t: 'Which way can a beam run?', d: '9 metres is exactly the width of the plan and only three quarters of its depth. So a beam can cross the building but cannot run down it — the primary beams must run in x, and they can only be 9 metres long, which is exactly what fits',
    detail: (d) => [`plan ${BW.toFixed(2)} m across — a beam fits exactly · ${BH.toFixed(2)} m deep — no beam reaches`,
                    `limit ${LMAX.toFixed(2)} m (a transport limit, the German adds: plus Materialstärke)`],
    take: 'the constraint is not a nuisance, it is the thing that decides the layout' },
  { t: 'Five beams across', d: 'one beam under each row of loads: y = 0, 3, 6, 9 and 12 m. Each picks up two loads, at its own third points, so each of its ends takes exactly F. Their right-hand ends all find something — the two columns and the 6 metre wall',
    detail: (d) => [`five beams of ${BW.toFixed(2)} m, each carrying 2F = ${(2 * d.F).toFixed(1)} kN`,
                    `right ends: column (9,0), the 6 m wall (three of them), column (9,12)`,
                    `left ends: column (0,0) and the L-wall take three — y = 3 and y = 6 have nothing`] },
  { t: 'And one spine for the other two', d: 'the beams at y = 3 and y = 6 have no support at their left end, so one longitudinal beam along x = 0 catches them and takes their reactions to the column at (0,0) and to the L-wall. From y = 0 to 9 that is 9.00 metres — the limit, exactly',
    detail: (d) => [`spine ${d.spineL.toFixed(2)} m ${d.ok ? '✓ within the limit' : '✗ OVER the 9 m limit'}`,
                    `it carries ${d.tr.Ra.toFixed(2)} kN at y = 3 and at y = 6 — its own third points`,
                    d.types === 1 ? 'same span, same loads, same places: it is the same beam again'
                                  : 'a different span, so a second beam type is needed'],
    take: 'the panel will run a 12 m spine instead — one member fewer, and the transport limit broken' },
  { t: 'The force flow in one beam', d: 'bottom: the beam at scale, 2 metres deep. Two loads at the third points, so the thrust line inside it is a trapezoid — a strut up from each support, a flat compression chord between the loads, and a tie along the soffit holding the two feet apart',
    detail: (d) => [`M_max = ${d.B.Ra.toFixed(2)} × 3.00 = ${d.B.Mmax.toFixed(2)} kNm, constant between the loads`,
                    `H = M/z = ${d.B.Mmax.toFixed(2)} / ${d.z.toFixed(2)} = ${d.B.H.toFixed(3)} kN = ${(d.B.H / d.F).toFixed(3)} F`,
                    `struts ${d.B.N[0].toFixed(3)} kN = ${(d.B.N[0] / d.F).toFixed(3)} F, at ${d.B.ang.toFixed(2)}° from horizontal`],
    take: 'the tie is the only red line in the whole pavilion, and it is at the bottom of every beam' },
  { t: 'The force diagram', d: 'right: the two loads laid off one under the other, the pole set back by H, and three rays that are parallel to the three chord segments. The reaction is read straight off it — half the load line, because the beam is symmetric',
    detail: (d) => [`load line 2F = ${d.B.W.toFixed(2)} kN · pole distance H = ${d.B.H.toFixed(3)} kN`,
                    `rays ${d.B.N.map((n) => n.toFixed(2)).join(' · ')} kN`,
                    'the sheet fixes no force scale for page 3, so this one is drawn in multiples of F'] },
  { t: 'One beam type', d: 'the transverse beams and the spine turn out to be the same 9 metre beam carrying the same 2F at the same third points. One type, one elevation, one force diagram — which is exactly what part b) asks for, and it is the reason to prefer the 9 metre spine over the 12 metre one',
    detail: (d) => [`${d.types === 1 ? 'ONE beam type' : 'TWO beam types'}: transverse H = ${(d.tr.H / d.F).toFixed(3)} F · spine H = ${(d.sp.H / d.F).toFixed(3)} F`,
                    Object.entries(d.tot).map(([k, v]) => `${SUP[k].nm} ${(v / d.F).toFixed(2)} F`).join(' · '),
                    `Σ out ${(d.sumOut / d.F).toFixed(3)} F = Σ in ${(d.sumIn / d.F).toFixed(3)} F ✓`],
    take: 'a grid that repeats one member is not just tidier, it is cheaper to make and to erect' },
];

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const ARR = dw.W.arrow, NARR = dw.W.narrow;

  const PX0 = 2.0, PY0 = 6.0, MP = 1.25;            // the plan
  const px = (p) => [PX0 + p[0] * MP, PY0 - p[1] * MP];
  const EX0 = 5.0, EY0 = -18.0, ME = 1.4;           // the elevation
  const ex = (x, v) => [EX0 + x * ME, EY0 + v * ME];
  const LLX = 25.0, LLY = 2.0, SFD = 4.0;           // force diagram: units per F


  dw.label('t_plan', 'floor plan 1:100 — the existing pavilion and the new beam grid',
    { cls: 'title', flash: false });
  dw.label('t_elev', '', { cls: 'title', flash: false });
  dw.label('t_force', 'Kräfteplan — force diagram', { cls: 'title', flash: false });

  // ---- the plan
  dw.strokes('foot', 4, { intro: 1, w: dw.W.thin, color: PAL.grey });
  for (let i = 0; i < GX.length + GY.length; i++) {
    dw.dashLine(`grid${i}`, { intro: 1, color: PAL.grey, dash: dw.W.dash });
  }
  for (let i = 0; i < WALLS.length; i++) {
    dw.poly(`wall${i}`, 4, { intro: 1, color: PAL.black, opacity: 1 });
  }
  for (let i = 0; i < COLS.length; i++) {
    dw.poly(`pcol${i}`, 4, { intro: 1, color: PAL.black, opacity: 1 });
  }
  dw.label('lexist', 'solid black = existing walls and columns · outlined = the new beam grid',
    { cls: 'point', intro: 1, flash: false, color: PAL.grey });
  for (let i = 0; i < LOADS.length; i++) {
    dw.disk(`ld${i}`, { intro: 2, r: dw.W.disk * 0.62, face: PAL.green, edge: PAL.green });
  }
  dw.label('lload', '', { cls: 'num', intro: 2, color: PAL.green });
  // the new beams: five across, then the spine
  for (let i = 0; i < 6; i++) {
    const okI = { final: (dd) => (dd.beams[i].L <= LMAX + 1e-9 ? PAL.green : PAL.red) };
    // the NEW beams are drawn as outlined members, so they cannot be confused
    // with the existing walls and columns, which are solid black
    dw.poly(`bmF${i}`, 4, { intro: i < 5 ? 4 : 5, color: PAL.grey, opacity: 0.30,
      flash: false });
    dw.strokes(`bm${i}`, 4, { intro: i < 5 ? 4 : 5, w: dw.W.thin, color: PAL.black });
    dw.label(`lbm${i}`, '', { cls: 'num', intro: i < 5 ? 4 : 5, color: okI,
      when: (st) => st.lbl });
  }
  // what arrives at each support
  const SK = Object.keys(SUP);
  for (const k of SK) {
    dw.disk(`sp_${k}`, { intro: 5, r: dw.W.disk * 0.8 });
    dw.label(`lsp_${k}`, '', { cls: 'num', intro: 5, color: PAL.green });
  }
  dw.label('lcheck', '', { cls: 'point', intro: 5, flash: false, color: PAL.black });

  // ---- the elevation of one beam type
  dw.strokes('bmOut', 4, { intro: FLOW, w: dw.W.str, color: PAL.black });
  for (const n of ['L', 'R']) {
    dw.disk(`sup${n}`, { intro: FLOW, r: dw.W.disk });
    dw.strokes(`hat${n}`, 5, { intro: FLOW, w: dw.W.dim, color: PAL.grey, flash: false });
    dw.arrow(`re${n}`, { intro: FLOW, color: PAL.green, ...NARR });
    dw.label(`lre${n}`, '', { cls: 'num', intro: FLOW, color: PAL.green });
  }
  for (let i = 0; i < NLD; i++) {
    dw.arrow(`ef${i}`, { intro: FLOW, color: PAL.green, ...ARR });
    dw.label(`lef${i}`, '', { cls: 'num', intro: FLOW, color: PAL.green });
  }
  for (let i = 0; i < NCH; i++) {
    dw.seg(`ch${i}`, { intro: FLOW, w: dw.W.bar,
      color: { pending: PAL.black, final: () => PAL.blue } });
    dw.label(`lch${i}`, '', { cls: 'num', intro: FLOW, color: PAL.blue,
      when: (st) => st.lbl });
  }
  dw.seg('tie', { intro: FLOW, w: dw.W.bar,
    color: { pending: PAL.black, final: () => PAL.red } });
  dw.label('ltie', '', { cls: 'num', intro: FLOW, color: PAL.red });
  dw.seg('dimZ', { intro: FLOW, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lz', '', { cls: 'num', intro: FLOW, color: PAL.grey });

  // ---- the force diagram
  for (let i = 0; i < NLD; i++) {
    dw.arrow(`ff${i}`, { intro: FLOW + 1, color: PAL.green, ...NARR });
  }
  dw.label('lfl', '', { cls: 'point', intro: FLOW + 1, flash: false, color: PAL.green });
  dw.disk('ptO', { intro: FLOW + 1, r: dw.W.disk * 0.8 });
  dw.label('lO', 'o', { cls: 'num', intro: FLOW + 1, when: (st) => st.lbl });
  dw.seg('dimH', { intro: FLOW + 1, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lH', '', { intro: FLOW + 1, flash: false, color: PAL.grey });
  for (let i = 0; i < NCH; i++) {
    dw.seg(`ray${i}`, { intro: FLOW + 1, w: dw.W.ray, color: PAL.blue });
    dw.link(`ch${i}`, `ray${i}`, `lch${i}`);
  }
  dw.link('tie', 'dimH', 'ltie');

  dw.instant('t_plan', 't_elev', 't_force', 'lexist');
  dw.ghostable('ff0', 'ff1', 'ray0', 'ray1', 'ray2');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);

    dw.setLabel('t_plan', [PX0 + (BW / 2) * MP, PY0 + 2.0]);
    dw.setLabel('t_elev', [EX0 + (d.B.L / 2) * ME + 2.5, EY0 + d.z * ME + 1.9]);
    dw.setText('t_elev', `Views beams 1:100 — ${d.Bname} × ${d.z.toFixed(2)} m`);
    dw.setLabel('t_force', [LLX - 3.0, LLY + 4.0]);

    // --- the plan
    const f = [px([0, 0]), px([BW, 0]), px([BW, BH]), px([0, BH])];
    dw.setStrokes('foot', f.map((p, i) => [p, f[(i + 1) % 4]]));
    GX.forEach((x, i) => dw.setDashLine(`grid${i}`, [px([x, 0]), px([x, BH])]));
    GY.forEach((y, i) => dw.setDashLine(`grid${GX.length + i}`, [px([0, y]), px([BW, y])]));
    WALLS.forEach(([x0, y0, x1, y1], i) => {
      const u = V.unit([x1 - x0, y1 - y0]);
      const n = V.mul([-u[1], u[0]], TWALL / 2);
      dw.setPoly(`wall${i}`, [px(V.add([x0, y0], n)), px(V.add([x1, y1], n)),
                              px(V.sub([x1, y1], n)), px(V.sub([x0, y0], n))]);
    });
    COLS.forEach(([x, y], i) => {
      const h = TCOL / 2;
      dw.setPoly(`pcol${i}`, [px([x - h, y - h]), px([x + h, y - h]),
                              px([x + h, y + h]), px([x - h, y + h])]);
    });
    dw.setLabel('lexist', px([BW / 2, BH + 0.85]));
    LOADS.forEach((p, i) => dw.setDisk(`ld${i}`, px(p)));
    dw.setLabel('lload', px([6.6, 1.5]));
    dw.setText('lload', `10 × F = ${d.sumIn.toFixed(1)} kN`);

    const BWID = 0.40;                       // drawn width of a new beam, m
    d.beams.forEach((b, i) => {
      const u = V.unit(V.sub(b.b, b.a));
      const n = V.mul([-u[1], u[0]], BWID / 2);
      const q = [px(V.add(b.a, n)), px(V.add(b.b, n)),
                 px(V.sub(b.b, n)), px(V.sub(b.a, n))];
      dw.setPoly(`bmF${i}`, q);
      dw.setStrokes(`bm${i}`, q.map((p, k) => [p, q[(k + 1) % 4]]));
      // all five transverse beams are the same length: label one of them
      const m = V.mid(px(b.a), px(b.b));
      dw.setLabel(`lbm${i}`, V.add(m, i < 5 ? [0, -0.95] : [2.9, 1.1]));
      dw.setText(`lbm${i}`, i === 0 || i === 5 ? `${b.L.toFixed(2)} m` : '');
    });

    for (const k of SK) {
      const p = px(SUP[k].p);
      dw.setDisk(`sp_${k}`, p);
      const out = SUP[k].p[0] > BW / 2 ? 1 : -1;
      dw.setLabel(`lsp_${k}`, V.add(p, [out * 2.6, 0.9]));
      dw.setText(`lsp_${k}`, `${(d.tot[k] / d.F).toFixed(2)} F`);
    }
    dw.setLabel('lcheck', [PX0 + (BW / 2) * MP + 4.5, PY0 - BH * MP - 2.3]);
    dw.setText('lcheck', `Σ = ${(d.sumOut / d.F).toFixed(2)} F = ${d.sumOut.toFixed(1)} kN ✓ `
      + `· longest beam ${d.maxLen.toFixed(2)} m `
      + `${d.ok ? `≤ ${LMAX.toFixed(0)} m ✓` : `> ${LMAX.toFixed(0)} m ✗`}`);

    // --- the elevation
    const B = d.B, L = B.L;
    const box = [ex(0, 0), ex(L, 0), ex(L, d.z), ex(0, d.z)];
    dw.setStrokes('bmOut', box.map((p, i) => [p, box[(i + 1) % 4]]));
    const SL = ex(0, 0), SR = ex(L, 0);
    dw.setDisk('supL', SL); dw.setDisk('supR', SR);
    for (const [n, p, R] of [['L', SL, B.Ra], ['R', SR, B.Rb]]) {
      dw.setStrokes(`hat${n}`, V.hatch([p[0] - 1.5, p[1] - 0.45],
        [p[0] + 1.5, p[1] - 0.45], -1, 0.85, 5));
      dw.setArrow(`re${n}`, [p[0], p[1] - 3.4], [p[0], p[1] - 0.9]);
      dw.setLabel(`lre${n}`, [p[0] + (n === 'L' ? -3.0 : 3.0), p[1] - 2.4]);
      dw.setText(`lre${n}`, `${R.toFixed(2)}`);
    }
    const lx = [3, 6];
    lx.forEach((x, i) => {
      dw.setArrow(`ef${i}`, ex(x, d.z + 2.6), ex(x, d.z + 0.15));
      dw.setLabel(`lef${i}`, V.add(ex(x, d.z + 1.9), [2.2, 0]));
      dw.setText(`lef${i}`, `F = ${d.F.toFixed(1)}`);
    });
    for (let i = 0; i < NCH; i++) {
      const a = B.nodes[i], b = B.nodes[i + 1];
      dw.setSeg(`ch${i}`, ex(a[0], a[1]), ex(b[0], b[1]));
      dw.setLabel(`lch${i}`, V.add(V.mid(ex(a[0], a[1]), ex(b[0], b[1])), [0, 1.1]));
      dw.setText(`lch${i}`, `${B.N[i].toFixed(2)}`);
    }
    dw.setSeg('tie', ex(0, 0), ex(L, 0));
    dw.setLabel('ltie', ex(L / 2, -1.15));
    dw.setText('ltie', `tie ${B.H.toFixed(2)} kN = ${(B.H / d.F).toFixed(3)} F, tension`);
    dw.setSeg('dimZ', ex(L + 0.35, 0), ex(L + 0.35, d.z));
    dw.setLabel('lz', V.add(ex(L + 0.35, d.z / 2), [2.3, 0]));
    dw.setText('lz', `z = ${d.z.toFixed(2)} m`);

    // --- the force diagram, drawn in multiples of F
    const T = [LLX, LLY];
    const div = [T];
    for (let i = 0; i < NLD; i++) {
      div.push([LLX, div[i][1] - (d.F / d.F) * SFD]);
      dw.setArrow(`ff${i}`, div[i], div[i + 1]);
    }
    dw.setLabel('lfl', [LLX + 2.6, (T[1] + div[NLD][1]) / 2]);
    dw.setText('lfl', `load line 2F`);
    const po = [LLX - (B.H / d.F) * SFD, T[1] - (B.Ra / d.F) * SFD];
    dw.setDisk('ptO', po);
    dw.setLabel('lO', V.add(po, [-1.3, 0.8]));
    dw.setSeg('dimH', [LLX, po[1]], po);
    dw.setLabel('lH', [(LLX + po[0]) / 2, po[1] + 1.1]);
    dw.setText('lH', `H = ${(B.H / d.F).toFixed(3)} F`);
    for (let i = 0; i < NCH; i++) dw.setSeg(`ray${i}`, po, div[i]);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const g = panel.section('The design');
  panel.toggle(g, s, 'long', 'run one 12 m spine instead (breaks the limit)', refresh);
  panel.slider(g, s, 'which', 'beam shown in elevation', 0, 1, 1, refresh,
    (v) => (v ? 'the spine' : 'a transverse beam'));
  panel.toggle(g, s, 'lbl', 'show labels', refresh);
  const h = panel.section('Given');
  panel.slider(h, s, 'F', 'point load F (kN) — assumed', 5, 60, 1, refresh);
  panel.slider(h, s, 'z', 'beam depth z (m) — the task says 2 m', 0.8, 3.0, 0.1, refresh);

  refresh();
  return player;
}
