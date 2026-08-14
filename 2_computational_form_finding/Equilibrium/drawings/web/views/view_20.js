/**
 * Drawing view/20 "Hoop forces in a masonry arch"
 * (https://block.arch.ethz.ch/eq/drawing/view/20) as a step-by-step
 * construction: one wedge-shaped slice (lune) of a hemispherical dome,
 * analysed as an arch that can only stand with the help of horizontal
 * HOOP forces from the neighbouring rings.
 *
 * Vertical section (top left): the half-ring is cut into 8 courses by
 * repeated angle bisection; each course's weight equals its ring length
 * in the top view (bottom left) times g. Because every hoop force is
 * horizontal, every meridional force must end on the horizontal through
 * the top of the load line: member j is drawn through PF_{j+1} parallel
 * to the mid-surface chord, and the horizontal jumps between the member
 * ends are the hoop forces H_1..H_8 (they telescope back: sum H = 0).
 * Near the crown the rings push the slice outward (compression, blue);
 * below ~52 deg they must pull it inward (tension, pink). In the top
 * view each hoop splits into the two tangential ring forces N'/N''.
 *
 * Live port of view_20/applet_0/geogebra.xml; the complete chain (ring
 * points, area centroids, load line, member ends A_4..B_4, offset feet,
 * decomposition points) is regression-checked against view_20_compas.py
 * to ~7e-7 (the XML's own baked derived coords are a degenerate saved
 * state). See notes/view_20_analysis.md.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 20 — Hoop forces in a masonry arch',
  subtitle: 'a dome slice held on its mid-surface by ring forces',
  about: 'One wedge-shaped slice of a hemispherical dome, cut into 8 courses. Each course weighs its ring length in the top view times g; since the pressure line must follow the mid-surface and all ring forces are horizontal, every meridional force ends on the crown-level line of the force diagram — the horizontal jumps between the member ends are the hoop forces. Near the crown the rings push the slice outward (compression, blue); below roughly 52 degrees they must pull it inward (hoop tension, pink), which plain masonry cannot provide. In the top view each hoop force splits into the two tangential ring forces N′ and N″ on the slice edges.',
  frame: [[3.968, -0.4385], [55.6498, 25.4024]],
};

const AX = 19.861438460472378, AY = 11.345444859101548;   // section centre A
const PSY = 4.940324549810353;                            // plan centre y (poleSlice)
const TOPLL = 23.429786239177446, BOTLL = 0.6259404365933184;  // lines of action
const BANDY = 21.289203503303263;                         // load arrows: tips
const HRMIN = 28.15, HRMAX = 31.17;                       // constrainRadius range
const THMIN = Math.atan2(6.336591148909376 - PSY, 29.404302569702743 - AX);
const THMAX = Math.atan2(8.781638023853613 - PSY, 28.70791383867416 - AX);
const N_C = 8;                                            // courses per half
const RESOLVE = 15;
const TOL = 0.02;                                         // hoop sign deadband

const DEFAULTS = {
  hr: 29.50590919882794,               // handleRadius x (outer radius drag)
  ir: 27.51048212878577,               // innerRadiusR x (inner radius drag)
  th: Math.atan2(8.402200257079622 - PSY, 28.86317342715605 - AX),  // slice half-angle
  spx: 48.03045021759524, spy: 19.65563989198898,  // SPforceDiagram
  sFD: 0.6,                            // scaleForceDiagram [0.5, 1]
  FG: 1,                               // F_G, weight per ring length [1, 3]
  sLS: 1.5,                            // loadSymbol [1, 2]
  oLL: 5,                              // offset loadline [0, 5]
  node: 0,                             // node-equilibrium inspector (0 = off)
  n4: true,                            // show points
  o4: false,                           // the applet's hidden "loadlines construction"
  cls: false,                          // the applet's "cover left side" checkbox
  lbl: true,                           // the applet's "showLabels" (o_1); house default ON
};

// every construction move happens on BOTH sides at once
const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'A slice of a dome', d: 'left: vertical section of the arch ring (drag the outer and inner radius) — below: top view of one wedge-shaped slice between two meridian planes (drag its edge to change the angle)' },
  { t: 'Eight courses', d: 'left: the half-ring is halved, quartered, eighthed by angle bisectors — 8 voussoirs per half, radial joints in both halves' },
  { t: 'Weight of the top course', d: 'left: drop the course centroid into the top view — its ring arc at that radius; the course weighs F₁ = arc × g (with the crown cap) — right: F₁ starts the load line' },
  { t: 'All course weights', d: 'left: the same for all 8 courses — nested plan arcs, loads F₂ … F₈ on their centroid lines (the grey mirror half carries the same) — right: the full load line' },
  { t: 'The rule of the game', d: 'left: masonry works only if the pressure line follows the MID-SURFACE (dashed chain through the centroids, crown → springing) — the weights alone cannot do that: extra horizontal forces are needed' },
  { t: 'The base reaction B', d: 'left: at the springing the joint is horizontal, so the force there is vertical: B carries the whole slice — right: B drawn beside the load line (dotted offset), from the bottom back up to crown level' },
  { t: 'Member 7', d: 'right: through PF₈, parallel to chord 7 of the mid-surface, up to the crown level — left: member 7 is the lowest inclined piece of the pressure line' },
  { t: 'Hoop force H₈', d: 'right: the polygon at the base node only closes with a HORIZONTAL jump H₈ (drawn on the dotted offset line above) — left: the bottom ring must pull the slice inward: hoop tension', },
  { t: 'Member 6 and H₇', d: 'right: through PF₇ parallel to chord 6 → the jump H₇ — left: member 6 and the inward pull at its lower node: tension again' },
  { t: 'Member 5 and H₆', d: 'right: through PF₆ parallel to chord 5 → H₆ — left: still hoop tension at the third node from the base' },
  { t: 'Members 4, 3, 2, 1', d: 'right: the remaining chords through PF₅ … PF₂, each ending on the crown line; at the crown the wedge tapers to nothing — the tiny crown piece carries no force' },
  { t: 'Hoop forces H₅ … H₁', d: 'right: the horizontal jumps walk back to the start of the load line: ΣH = 0 — left: near the crown the rings PUSH the slice outward: hoop compression' },
  { t: 'Ring forces N′, N″ — tension', d: 'below: in the top view each hoop force is the resultant of the two tangential ring forces on the slice edges — the outer three rings pull away from the edges — right: H₆, H₇, H₈ split parallel to the edge tangents' },
  { t: 'Ring forces N′, N″ — compression', d: 'below: the inner five rings press onto the slice edges — right: H₁ … H₅ split the same way at crown level' },
  { t: 'Hoop compression and hoop tension', d: 'blue = ring compression (upper courses), pink = ring tension (lower courses — plain masonry cracks there!); drag the radii, the slice angle or the sliders; click a course centroid for its node equilibrium',
    detail: (d, st) => [`B = ${d.B.toFixed(1)} kN — hoop forces H₁ = ${(Math.abs(d.H[0]) / st.sFD).toFixed(2)} … H₅ = ${(Math.abs(d.H[4]) / st.sFD).toFixed(2)} kN`],
    take: 'near the crown the rings PUSH, below ~52° they must PULL — where plain masonry cracks' },
];

/** Area centroid of a polygon. */
function centroid(pts) {
  let a = 0, cx = 0, cy = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x0, y0] = pts[i], [x1, y1] = pts[(i + 1) % pts.length];
    const cr = x0 * y1 - x1 * y0;
    a += cr; cx += (x0 + x1) * cr; cy += (y0 + y1) * cr;
  }
  a *= 0.5;
  return [cx / (6 * a), cy / (6 * a)];
}

function arcPairs(c, r, a0, a1, n) {
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const a = a0 + ((a1 - a0) * i) / n;
    pts.push([c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]);
  }
  return pts.slice(0, -1).map((p, i) => [p, pts[i + 1]]);
}

// the construction (mirrors applet_0/geogebra.xml, evaluated live)
function compute(s) {
  const Rout = s.hr - AX, Rin = s.ir - AX;
  const PS = [AX, PSY];
  const SP = [s.spx, s.spy];

  // section ring: 8 slices of 11.25deg
  const outer = [], inner = [];
  for (let k = 0; k <= N_C; k++) {
    const a = (Math.PI / 2) * (k / N_C);
    outer.push([AX + Rout * Math.cos(a), AY + Rout * Math.sin(a)]);
    inner.push([AX + Rin * Math.cos(a), AY + Rin * Math.sin(a)]);
  }
  // course area centroids, top -> bottom (V, W, Z, A1, B1, C1, D1, E1)
  const cent = [];
  for (let j = 1; j <= N_C; j++) {
    cent.push(centroid([outer[N_C - j + 1], outer[N_C - j], inner[N_C - j], inner[N_C - j + 1]]));
  }
  const mirr = cent.map((p) => [2 * AX - p[0], p[1]]);

  // plan ring arcs + weights
  const radii = cent.map((p) => p[0] - AX);
  const arcs = radii.map((r) => 2 * s.th * r);
  const w = arcs.map((a, i) => a * s.FG * s.sFD * (i === 0 ? 1.75 : 1));

  // load line
  const PF = [SP];
  for (let k = 0; k < N_C; k++) PF.push([SP[0], PF[k][1] - w[k]]);

  // mid-surface chain: crown joint -> centroids -> base
  const R2 = [AX, cent[0][1]];
  const C5 = [cent[7][0], AY];
  const chain = [R2, ...cent, C5];

  // member ends on the crown-level horizontal (mirrored across the load line)
  const X = [SP];
  for (let j = 1; j <= 7; j++) {
    const d = V.sub(cent[j], cent[j - 1]);       // member j direction (down-chain)
    const G3 = V.intersect(PF[j], [-d[0], d[1]], SP, [1, 0]);
    X.push([2 * SP[0] - G3[0], SP[1]]);
  }
  // hoop forces H_c (vector X[c] -> X[c-1], wrapping at the base; sum = 0);
  // positive = outward = ring compression
  const H = [];
  for (let c = 1; c <= N_C; c++) H.push(X[c - 1][0] - X[c % N_C][0]);
  const colH = H.map((h) => (h < -TOL ? PAL.red : PAL.blue));

  // offset line feet (tension hoops) + offset reaction
  const e3y = SP[1] + s.oLL;
  const foot = (p) => [p[0], e3y];
  const E5 = foot(SP), Z3 = foot(X[7]), W3 = foot(X[6]), F5 = foot(X[5]);
  const U3 = [SP[0] + s.oLL, PF[8][1]], D5 = [SP[0] + s.oLL, SP[1]];

  // hoop segments in the force diagram: [tail, tip] per course
  const hoopF = [
    [X[1], X[0]], [X[2], X[1]], [X[3], X[2]], [X[4], X[3]], [X[5], X[4]],
    [W3, F5], [Z3, W3], [E5, Z3],
  ];
  // decompositions parallel to the edge-tangents (perp of the plan rays)
  const sn = Math.sin(s.th), cs = Math.cos(s.th);
  const dec = [];
  for (let c = 1; c <= N_C; c++) {
    const [P, Q] = hoopF[c - 1];
    const up = c <= 5;
    const d1 = up ? [sn, cs] : [-sn, -cs];
    const d2 = up ? [sn, -cs] : [-sn, cs];
    dec.push(V.intersect(P, d1, Q, d2) || P);
  }

  // plan: rays, edge points, tangential ring-force arrows
  const uq = [cs, sn], ur = [cs, -sn];
  const offq = [-sn, cs], offr = [-sn, -cs];      // outward normals of the wedge
  const qE = radii.map((r) => V.add(PS, V.mul(uq, r)));
  const rE = radii.map((r) => V.add(PS, V.mul(ur, r)));
  const qTip = [AX + Rout * cs, PSY + Rout * sn];  // CoSl_1
  const rTip = [AX + Rout * cs, PSY - Rout * sn];

  const B = (PF[0][1] - PF[8][1]) / s.sFD;

  return { Rout, Rin, PS, SP, outer, inner, cent, mirr, radii, arcs, w, PF,
           R2, C5, chain, X, H, colH, e3y, E5, Z3, W3, F5, U3, D5, hoopF, dec,
           uq, ur, offq, offr, qE, rE, qTip, rTip, sn, cs, B };
}

const SUB = ' ₁₂₃₄₅₆₇₈';

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  let d = compute(s);

  const W_BAR = 0.085, W_RING = 0.075, W_JOINT = 0.032, W_ARC = 0.055;
  const ARROW = { w: 0.1, headLen: 0.55, headW: 0.22 };
  const HARROW = { w: 0.08, headLen: 0.45, headW: 0.18 };
  // form chain member k pink when its lower node needs hoop tension (H_{k+1})
  const memCol = (k) => ({ pending: PAL.black, final: (dd) => dd.colH[k] });
  const hoopCol = (c) => ({ pending: PAL.black, final: (dd) => dd.colH[c - 1] });

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });
  dw.label('sec_lbl', 'vertical section', { flash: false, intro: 1 });
  dw.label('plan_lbl', 'top view', { flash: false, intro: 1 });

  // step 1: the ring in section + the wedge in plan (the given geometry)
  dw.strokes('ringO', 60, { intro: 1, w: W_RING, color: PAL.black });
  dw.strokes('ringI', 60, { intro: 1, w: W_RING, color: PAL.black });
  dw.strokes('spring', 2, { intro: 1, w: W_JOINT, color: PAL.black });
  dw.dashLine('axisC', { intro: 1, dash: 0.35, color: PAL.grey });
  dw.dashLine('radGuide', { intro: 1, dash: 0.18, color: PAL.grey });
  dw.seg('rayQ', { intro: 1, w: 0.045, color: PAL.black });
  dw.seg('rayR', { intro: 1, w: 0.045, color: PAL.black });
  dw.strokes('arcOut', 32, { intro: 1, w: W_RING, color: PAL.black });
  dw.dashLine('slcGuide', { intro: 1, dash: 0.18, color: PAL.grey });

  // the applet's "cover left side" checkbox hides the mirrored half of the
  // section (there it drops a white cover polygon; hiding is equivalent here)
  const notCls = (st) => !st.cls;
  // the applet's "showLabels" checkbox (o_1) gates every force/member label
  const lblOn = (st) => st.lbl;

  // step 2: the radial joints of the 8 courses, both halves
  dw.strokes('jointsR', 8, { intro: 2, w: W_JOINT, color: PAL.black });
  dw.strokes('jointsL', 7, { intro: 2, w: W_JOINT, color: PAL.black, when: notCls });

  // steps 3-4: lines of action, loads, plan arcs, load line
  for (let c = 1; c <= N_C; c++) {
    const intro = c === 1 ? 3 : 4;
    dw.dashLine(`act${c}`, { intro, dash: 0.22 });
    dw.dashLine(`actm${c}`, { intro, dash: 0.22, when: notCls });
    dw.arrow(`load${c}`, { intro, ...ARROW });
    dw.strokes(`arc${c}`, 20, { intro, w: W_ARC, color: hoopCol(c) });
    dw.arrow(`edge${c}`, { intro, ...ARROW });
    dw.label(`lF${c}`, `F${SUB[c]}`, { cls: 'num', intro, color: PAL.green, when: lblOn });
    dw.label(`lFf${c}`, `F${SUB[c]}`, { cls: 'num', intro, color: PAL.green, when: lblOn });
    dw.arrow(`mload${c}`, { intro: 4, ...ARROW, color: PAL.grey, when: notCls });
  }
  dw.instant('mload1', 'mload2', 'mload3', 'mload4', 'mload5', 'mload6', 'mload7', 'mload8');

  // the applet's hidden o_4 layer: green full-height loadline construction
  dw.strokes('o4lines', 16, { intro: 1, w: 0.014, color: 0x006400, flash: false, when: (st) => st.o4 });
  dw.instant('o4lines');

  // step 5: the mid-surface chain (the rule of the game)
  dw.dashLine('chainG', { intro: 5, dash: 0.3, color: PAL.grey });

  // step 6: base member + reaction B (offset in the force diagram)
  dw.seg('mbase', { intro: 6, w: W_BAR, color: hoopCol(8) });
  dw.arrow('reacBform', { intro: 6, ...ARROW });
  dw.dashLine('mB8', { intro: 6, dash: 0.22 });
  dw.arrow('reacB', { intro: 6, ...ARROW });
  dw.label('lblBf', 'B', { cls: 'num', intro: 6, color: PAL.green, when: lblOn });
  dw.label('lblBs', 'B', { cls: 'num', intro: 6, color: PAL.green, when: lblOn });

  // members 7..1 + crown piece, each with its force segment
  const memIntro = [11, 11, 11, 11, 10, 9, 7];    // member k=1..7
  for (let k = 1; k <= 7; k++) {
    dw.seg(`mem${k}`, { intro: memIntro[k - 1], w: W_BAR, color: memCol(k) });
    dw.seg(`fmem${k}`, { intro: memIntro[k - 1], w: 0.05, color: PAL.blue });
    dw.label(`ln${k}`, `${k}`, { cls: 'num', intro: memIntro[k - 1], color: { final: (dd) => dd.colH[k] }, when: lblOn });
    dw.label(`lnf${k}`, `${k}`, { cls: 'num', intro: memIntro[k - 1], color: PAL.blue, when: lblOn });
  }
  dw.seg('mcrown', { intro: 11, w: W_BAR, color: PAL.blue });

  // hoop forces: form arrow at the centroid + force jump + dotted connector
  const hoopIntro = [12, 12, 12, 12, 12, 10, 9, 8];   // course c=1..8
  for (let c = 1; c <= N_C; c++) {
    const intro = hoopIntro[c - 1];
    dw.arrow(`hoop${c}`, { intro, ...HARROW, color: hoopCol(c) });
    dw.arrow(`hoopf${c}`, { intro, ...HARROW, color: hoopCol(c) });
    dw.label(`lH${c}`, `H${SUB[c]}`, { cls: 'num', intro, color: { final: (dd) => dd.colH[c - 1] }, when: lblOn });
    dw.label(`lHf${c}`, `H${SUB[c]}`, { cls: 'num', intro, color: { final: (dd) => dd.colH[c - 1] }, when: lblOn });
  }
  dw.dashLine('con8', { intro: 8, dash: 0.22 });
  dw.dashLine('con7', { intro: 9, dash: 0.22 });
  dw.dashLine('con6', { intro: 10, dash: 0.22 });
  dw.dashLine('kArc', { intro: 8, dash: 0.22 });

  // plan ring forces N'/N'' + force-diagram decompositions
  for (let c = 1; c <= N_C; c++) {
    const intro = c >= 6 ? 13 : 14;
    dw.arrow(`pq${c}`, { intro, ...HARROW, color: hoopCol(c) });
    dw.arrow(`pr${c}`, { intro, ...HARROW, color: hoopCol(c) });
    dw.seg(`dq${c}`, { intro, w: 0.04, color: hoopCol(c) });
    dw.seg(`dr${c}`, { intro, w: 0.04, color: hoopCol(c) });
    dw.label(`lNq${c}`, `N′${SUB[c]}`, { cls: 'num', intro, color: { final: (dd) => dd.colH[c - 1] }, when: lblOn });
    dw.label(`lNr${c}`, `N″${SUB[c]}`, { cls: 'num', intro, color: { final: (dd) => dd.colH[c - 1] }, when: lblOn });
  }

  // points
  const HANDLE = { r: 0.17 }, DERIVED = { r: 0.13 };
  const show = (st) => st.n4;
  dw.disk('pt_A', { intro: 1, ...DERIVED, when: show });
  dw.disk('pt_PS', { intro: 1, ...DERIVED, when: show });
  dw.disk('pt_hr', { intro: 1, ...HANDLE });
  dw.disk('pt_ir', { intro: 1, ...HANDLE });
  dw.disk('pt_CoSl', { intro: 1, ...HANDLE });
  dw.disk('pt_SP', { intro: 3, ...HANDLE });
  for (let c = 1; c <= N_C; c++) {
    dw.disk(`pt_c${c}`, { intro: c === 1 ? 3 : 4, ...DERIVED });
    dw.disk(`pt_m${c}`, { intro: 4, r: 0.1, when: (st) => st.n4 && !st.cls });
  }
  dw.disk('pt_R2', { intro: 5, ...DERIVED, when: show });
  dw.disk('pt_C5', { intro: 5, ...DERIVED, when: show });

  // readouts
  dw.label('ro_B', '', { intro: RESOLVE, flash: false, color: PAL.green, when: lblOn });
  for (let c = 1; c <= N_C; c++) {
    dw.label(`ro_H${c}`, '', { intro: RESOLVE, flash: false, color: { final: (dd) => dd.colH[c - 1] }, when: lblOn });
  }

  // node-equilibrium inspector (free-body star + tip-to-tail sub-polygon)
  dw.nodeInspector(4, { when: (st) => st.node > 0, w: 1.5 * W_BAR, headLen: 0.55, headW: 0.22, r: 0.19 });

  // dual pairs
  for (let c = 1; c <= N_C; c++) {
    dw.link(`load${c}`, `edge${c}`, `arc${c}`, `lF${c}`, `lFf${c}`, `act${c}`);
    dw.link(`hoop${c}`, `hoopf${c}`, `lH${c}`, `lHf${c}`, `pq${c}`, `pr${c}`,
            `dq${c}`, `dr${c}`, `lNq${c}`, `lNr${c}`);
  }
  for (let k = 1; k <= 7; k++) dw.link(`mem${k}`, `fmem${k}`, `ln${k}`, `lnf${k}`);
  dw.link('mbase', 'reacBform', 'reacB', 'mB8', 'lblBf', 'lblBs');
  dw.ghostable('edge1', 'edge2', 'edge3', 'edge4', 'edge5', 'edge6', 'edge7', 'edge8',
               'fmem1', 'fmem2', 'fmem3', 'fmem4', 'fmem5', 'fmem6', 'fmem7',
               'hoopf1', 'hoopf2', 'hoopf3', 'hoopf4', 'hoopf5', 'hoopf6', 'hoopf7',
               'hoopf8', 'reacB',
               ...[...Array(8)].map((_, i) => `dq${i + 1}`),
               ...[...Array(8)].map((_, i) => `dr${i + 1}`));

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  function update() {
    dw.setLabel('form_title', [6.8, 24.6]);
    dw.setLabel('force_title', [36.5, 24.6]);
    dw.setLabel('force_sub', [36.7, 23.6]);
    dw.setText('force_sub', `1 unit :: ${(1 / s.sFD).toFixed(2)} kN`);
    dw.setLabel('sec_lbl', [7, 9]);
    dw.setLabel('plan_lbl', [7, 1]);

    // section ring + plan wedge ("cover left side" keeps only the right half)
    const aEnd = s.cls ? Math.PI / 2 : Math.PI;
    dw.setStrokes('ringO', arcPairs([AX, AY], d.Rout, 0, aEnd, 60));
    dw.setStrokes('ringI', arcPairs([AX, AY], d.Rin, 0, aEnd, 60));
    const springR = [[s.ir, AY], [s.hr, AY]];
    dw.setStrokes('spring', [s.cls ? springR : [[2 * AX - s.hr, AY], [2 * AX - s.ir, AY]], springR]);
    dw.setDashLine('axisC', [[AX, AY], [s.hr, AY]]);
    dw.setDashLine('radGuide', [[HRMIN, AY], [HRMAX, AY]]);
    dw.setSeg('rayQ', d.PS, d.qTip);
    dw.setSeg('rayR', d.PS, d.rTip);
    dw.setStrokes('arcOut', arcPairs(d.PS, d.Rout, -s.th, s.th, 32));
    dw.setDashLine('slcGuide', arcPairs(d.PS, d.Rout, THMIN, THMAX, 24).map((p) => p[0])
      .concat([[AX + d.Rout * Math.cos(THMAX), PSY + d.Rout * Math.sin(THMAX)]]));

    // joints (k = 1..7 radial + the crown joint E-D; springing drawn in step 1)
    const jr = [], jl = [];
    for (let k = 1; k <= 8; k++) jr.push([d.outer[k], d.inner[k]]);
    dw.setStrokes('jointsR', jr);
    for (let k = 1; k <= 7; k++) {
      jl.push([[2 * AX - d.outer[k][0], d.outer[k][1]], [2 * AX - d.inner[k][0], d.inner[k][1]]]);
    }
    dw.setStrokes('jointsL', jl);

    // lines of action, loads, plan arcs, load line
    const bandT = BANDY + s.sLS;
    let prevX = -99, row = 0;
    for (let c = 1; c <= N_C; c++) {
      const x = d.cent[c - 1][0], xm = 2 * AX - x;
      dw.setDashLine(`act${c}`, [[x, BOTLL], [x, TOPLL]]);
      dw.setDashLine(`actm${c}`, [[xm, BOTLL], [xm, TOPLL]]);
      dw.setArrow(`load${c}`, [x, bandT], [x, BANDY]);
      dw.setArrow(`mload${c}`, [xm, bandT], [xm, BANDY]);
      dw.setStrokes(`arc${c}`, arcPairs(d.PS, d.radii[c - 1], -s.th, s.th, 20));
      dw.setArrow(`edge${c}`, d.PF[c - 1], d.PF[c]);
      row = x - prevX < 1.1 ? row + 1 : 0;
      prevX = x;
      dw.setLabel(`lF${c}`, [x, TOPLL + 0.45 + 0.72 * row]);
      dw.setLabel(`lFf${c}`, [s.spx + 0.55, (d.PF[c - 1][1] + d.PF[c][1]) / 2]);
      dw.setDisk(`pt_c${c}`, d.cent[c - 1]);
      dw.setDisk(`pt_m${c}`, d.mirr[c - 1]);
    }
    const o4 = [];
    for (let c = 1; c <= N_C; c++) {
      o4.push([[d.cent[c - 1][0], -0.44], [d.cent[c - 1][0], 25.4]]);
      const xm = s.cls ? d.cent[c - 1][0] : d.mirr[c - 1][0];   // cover left side
      o4.push([[xm, -0.44], [xm, 25.4]]);
    }
    dw.setStrokes('o4lines', o4);

    // mid-surface chain
    dw.setDashLine('chainG', d.chain);
    dw.setDisk('pt_R2', d.R2);
    dw.setDisk('pt_C5', d.C5);

    // base + reaction
    dw.setSeg('mbase', d.cent[7], d.C5);
    dw.setArrow('reacBform', [d.C5[0], d.C5[1] - 1.3 * s.sLS], d.C5);
    dw.setLabel('lblBf', [d.C5[0] - 0.75, d.C5[1] - 1.3 * s.sLS + 0.45]);
    dw.setDashLine('mB8', [d.PF[8], d.U3]);
    dw.setArrow('reacB', d.U3, d.D5);
    dw.setLabel('lblBs', [d.U3[0] + 0.6, (d.U3[1] + d.D5[1]) / 2]);
    dw.setDashLine('kArc', arcPairs(d.SP, s.oLL, 0, Math.PI / 2, 20).map((p) => p[0])
      .concat([[d.SP[0], d.SP[1] + s.oLL]]));

    // members + force segments
    for (let k = 1; k <= 7; k++) {
      const a = d.cent[k - 1], b = d.cent[k];
      dw.setSeg(`mem${k}`, a, b);
      dw.setSeg(`fmem${k}`, d.PF[k], d.X[k]);
      const m = V.mid(a, b);
      const toward = V.unit(V.sub([AX, AY], m));   // into the ring void
      dw.setLabel(`ln${k}`, V.add(m, V.mul(toward, 0.95)));
      // force side: near the load-line end of the ray, where the fan is spread
      const q15 = V.add(d.PF[k], V.mul(V.sub(d.X[k], d.PF[k]), 0.16));
      dw.setLabel(`lnf${k}`, V.add(q15, [-0.42, 0.12]));
    }
    dw.setSeg('mcrown', d.R2, d.cent[0]);

    // hoop arrows: tail at the centroid, direction = sign of H
    let hx = -99, hrow = 0;
    for (let c = 1; c <= N_C; c++) {
      const p = d.cent[c - 1];
      const dir = d.H[c - 1] < -TOL ? -1 : 1;
      dw.setArrow(`hoop${c}`, p, [p[0] + dir * s.sLS, p[1]]);
      dw.setLabel(`lH${c}`, [p[0] + dir * (s.sLS + 0.55), p[1] + 0.32]);
      const [ta, tb] = d.hoopF[c - 1];
      dw.setArrow(`hoopf${c}`, ta, tb);
      const mx = (ta[0] + tb[0]) / 2;
      if (c <= 5) {
        hrow = Math.abs(mx - hx) < 1.3 ? hrow + 1 : 0;
        hx = mx;
        dw.setLabel(`lHf${c}`, [mx, d.SP[1] - 0.62 - 0.8 * hrow]);
      } else {
        dw.setLabel(`lHf${c}`, [mx, d.e3y + 0.55]);
      }
    }
    dw.setDashLine('con8', [d.X[7], d.Z3]);
    dw.setDashLine('con7', [d.X[6], d.W3]);
    dw.setDashLine('con6', [d.X[5], d.F5]);

    // plan ring forces + decompositions
    for (let c = 1; c <= N_C; c++) {
      const q = d.qE[c - 1], r = d.rE[c - 1];
      const ten = d.H[c - 1] < -TOL;
      const qo = V.add(q, V.mul(d.offq, s.sLS)), ro = V.add(r, V.mul(d.offr, s.sLS));
      if (ten) { dw.setArrow(`pq${c}`, q, qo); dw.setArrow(`pr${c}`, r, ro); }
      else { dw.setArrow(`pq${c}`, qo, q); dw.setArrow(`pr${c}`, ro, r); }
      // labels at the outer arrow ends; the crowded outer rings get their
      // labels past the wedge rim, marching outward along the rays
      if (c <= 5) {
        dw.setLabel(`lNq${c}`, V.add(qo, V.mul(d.offq, 0.5)));
        dw.setLabel(`lNr${c}`, V.add(ro, V.mul(d.offr, 0.5)));
      } else {
        const rr = d.Rout + 1.1 + (c - 6) * 0.95;
        dw.setLabel(`lNq${c}`, V.add(V.add(d.PS, V.mul(d.uq, rr)), V.mul(d.offq, 0.35)));
        dw.setLabel(`lNr${c}`, V.add(V.add(d.PS, V.mul(d.ur, rr)), V.mul(d.offr, 0.35)));
      }
      const [P, Q] = d.hoopF[c - 1];
      dw.setSeg(`dq${c}`, P, d.dec[c - 1]);
      dw.setSeg(`dr${c}`, d.dec[c - 1], Q);
    }

    dw.setDisk('pt_A', [AX, AY]);
    dw.setDisk('pt_PS', d.PS);
    dw.setDisk('pt_hr', [s.hr, AY]);
    dw.setDisk('pt_ir', [s.ir, AY]);
    dw.setDisk('pt_CoSl', d.qTip);
    dw.setDisk('pt_SP', d.SP);

    dw.setLabel('ro_B', [33, 23]);
    dw.setText('ro_B', `B = ${d.B.toFixed(1)} kN`);
    for (let c = 1; c <= N_C; c++) {
      dw.setLabel(`ro_H${c}`, [33, 23 - 0.85 * c]);
      dw.setText(`ro_H${c}`, `H${SUB[c]} = ${(Math.abs(d.H[c - 1]) / s.sFD).toFixed(2)} kN`);
    }
  }

  // node-equilibrium inspector: node 1 = base course centroid ... node 8 = crown.
  // Sides of the node's closed sub-polygon in the force diagram; the reaction
  // side uses the drawn OFFSET arrow so the inspector lands on it.
  function nodePoly() {
    const n = Math.max(1, Math.round(s.node));   // inspector hidden while node = 0
    const c = 9 - n;                        // course whose centroid is this node
    if (n === 8) return [[d.SP, d.PF[1]], [d.PF[1], d.X[1]], [d.X[1], d.SP]];
    if (n === 1) return [[d.X[7], d.PF[7]], [d.PF[7], d.PF[8]], [d.U3, d.D5], [d.SP, d.X[7]]];
    return [[d.X[c - 1], d.PF[c - 1]], [d.PF[c - 1], d.PF[c]],
            [d.PF[c], d.X[c % N_C]], [d.X[c % N_C], d.X[c - 1]]];
  }
  function updateNode() {
    const n = Math.round(s.node);
    dw.selectDisk(n > 0 ? `pt_c${9 - n}` : null);
    dw.setNodeInspector([33, 12], 2.1, `node ${n}`, nodePoly());
  }

  let player = null;
  function refresh() {
    d = compute(s);
    update();
    updateNode();
    player.apply(d, s);
  }

  player = makePlayer(STEPS, refresh);

  // ------------------------------------------------------------------
  // side panel + dragging
  // ------------------------------------------------------------------

  const view = panel.section('View');
  panel.button(view, 'zoom fit', () => dw.zoomFit());

  const par = panel.section('Parameters');
  panel.slider(par, s, 'FG', 'g — weight per ring length (kN/unit)', 1, 3, 0.1, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram (units/kN)', 0.5, 1, 0.05, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 1, 2, 0.1, refresh);
  panel.slider(par, s, 'oLL', 'offset loadline', 0, 5, 0.5, refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  panel.toggle(par, s, 'lbl', 'show labels', refresh);
  panel.toggle(par, s, 'cls', 'cover left side (only the analysed half)', refresh);
  panel.toggle(par, s, 'o4', 'show loadlines construction (applet layer)', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'node (0 = off, 1 = base course … 8 = crown course)',
               0, 8, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS });
    panel.syncAll();
    refresh();
  });

  const hits = [
    ['HR', () => [s.hr, AY], 1],
    ['IR', () => [s.ir, AY], 1],
    ['SL', () => d.qTip, 1],
    ['SP', () => d.SP, 3],
  ];
  dw.enableDrag(
    (wx, wy, tol) => {
      let best = null;
      for (const [name, get, k0] of hits) {
        if (player.k < k0) continue;
        const p = get();
        const dd = Math.hypot(p[0] - wx, p[1] - wy);
        if (dd < tol) { best = name; tol = dd; }
      }
      return best;
    },
    (name, wx, wy) => {
      if (name === 'HR') s.hr = Math.max(HRMIN, Math.min(HRMAX, wx));
      else if (name === 'IR') s.ir = Math.max(AX + 3, Math.min(s.hr - 0.8, wx));
      else if (name === 'SL') s.th = Math.max(THMIN, Math.min(THMAX, Math.atan2(wy - PSY, wx - AX)));
      else if (name === 'SP') { s.spx = wx; s.spy = wy; }
      refresh();
    },
  );

  // click a course centroid to inspect its node (1 = base ... 8 = crown)
  const nodes = [];
  for (let n = 1; n <= N_C; n++) nodes.push({ at: () => d.cent[N_C - n] });
  dw.nodeSelect(nodes, (i) => {
    s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
    panel.syncAll();
    refresh();
  });

  refresh();
  return player;
}
