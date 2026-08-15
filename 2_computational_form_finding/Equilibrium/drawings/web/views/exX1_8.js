/**
 * EX X · Task 8 — Finding the thrust line using a trial funicular
 * Structural Design I, HS 22, sheet "EX X — Additional Exercises", page 8.
 *
 * TEXT (verbatim, English sheet). "a) Four non-uniformly distributed point
 * loads and the two supports A and B are given. Find the only possible
 * structure that is in equilibrium under the given load and traverses point C.
 *  First find the magnitude of the resultant R in the force diagram, then its
 * position in the form diagram. To do this, use a trial funicular. Then find
 * the reaction forces and the form of the arch going through point C. Finally,
 * colour tension forces in red, compression forces in blue and the external
 * forces in green."
 *
 * GIVEN. F₁ = 45, F₂ = 30, F₃ = 15, F₄ = 30 kN, each on its own INCLINED line
 * of action (only F₂ is vertical). Form diagram 1:250, force diagram
 * 1 cm ≙ 10 kN. Both supports pinned, at the same level.
 *
 * GEOMETRY, digitised from the sheet's vector artwork with
 *   web/tools/sheetvec.py .../task-en.pdf 8 --scale 250 --min 0.05
 * and re-referenced to A. Origin = support A, x right, y up, metres.
 *
 *   A (pin)  (  0.000, 0.000)
 *   B (pin)  ( 14.995, 0.000)   span 15.00 m, both at the same level — round ✓
 *   C        (  3.715, 4.121)   small circle
 *
 *   line of action | crosses AB at x | tilt from the vertical
 *   F₁ = 45 kN     |  3.1378 m       | −8.00°  (leans left going down)
 *   F₂ = 30 kN     |  5.9610 m       |  0.00°
 *   F₃ = 15 kN     |  8.9752 m       | −5.00°
 *   F₄ = 30 kN     | 11.8649 m       | +7.54°  (leans right going down)
 *
 * The span comes out exactly 15.00 m, which validates the 1:250 scale; the
 * three tilts −8.00, 0.00 and −5.00 are exact, only F₄'s 7.54° is not round.
 *
 * C LIES ON F₁'s LINE OF ACTION. Checked, not assumed: F₁'s line at y = 4.121
 * is at x = 3.7170 and the digitised C is at x = 3.715 — 2 mm apart on a 15 m
 * span. This is the hinge of the whole exercise. Cut the arch immediately to
 * the left of C: the only force on that free body is the reaction at A, since
 * F₁ passes through C and therefore has no moment about it. ΣM_C = 0 then
 * forces THE REACTION AT A TO ACT ALONG THE LINE A–C. Here C is snapped onto
 * the line and parametrised by its height, so the slider keeps it there.
 *
 * DERIVATION (all of it recomputed live in compute(), nothing hard-coded).
 *
 *   R = 45·(−0.13917,−0.99027) + 30·(0,−1) + 15·(−0.08716,−0.99619)
 *       + 30·(+0.13113,−0.99137) = (−3.634, −119.246) kN
 *   |R| = 119.30 kN, 1.745° west of vertical.
 *
 *   NOTE: the four magnitudes add to 45+30+15+30 = 120 kN, but the loads are
 *   inclined, so the VECTOR sum is 119.30 kN. The key's own load line measures
 *   119.26 kN, so the key agrees. Anyone who writes 120 has added scalars.
 *
 *   Moments about A: ΣpᵢFyᵢ = −805.66 kNm ⇒ R crosses AB at x_R = 6.756 m
 *   (midspan is 7.4975 m).
 *
 *   Three-force condition: line A–C, R's line and the reaction at B meet at
 *   P = (6.99, 7.75). A + B + R = 0 then gives
 *       A = 88.23 kN at 47.95°   B = 77.22 kN at 135.91°
 *
 *   Walking the funicular from A:
 *       A(0,0) · C(3.717, 4.121) · (5.961, 5.011) · (9.363, 4.429) ·
 *       (11.405, 3.478) · B(14.995, 0.000)
 *   and the last string reaches B with a closure error of 9·10⁻¹⁶ m.
 *   Member forces, ALL COMPRESSION:
 *       1 A–C 88.23 · 2 56.84 · 3 53.60 · 4 56.83 · 5 77.22 kN
 *   Maximum thrust 88.23 kN in member 1, which is also the reaction at A.
 *   Nothing is in tension — the structure is an arch throughout.
 *
 * WHY THE TRIAL FUNICULAR. R's magnitude and direction come straight off the
 * load line, but four loads on four different lines have no common crossing
 * point, so the load line says nothing about WHERE R acts. Pick any pole o′,
 * draw the funicular; its first and last strings always meet on R's line of
 * action. Verified here for a whole grid of trial poles: x_R = 6.756156 m
 * every single time. The division point i on the force diagram's R-line is
 * invariant in exactly the same way, and the view prints both live while the
 * pole is dragged — that invariance IS the method.
 *
 * AGAINST THE OFFICIAL KEY. The key prints no numbers, only the drawing.
 * Digitising the key's own drawing (force = 4 × length in metres at
 * --scale 250):
 *
 *   quantity        key's drawing            derived here
 *   R               119.26 kN at 88.26°      119.30 kN at 88.25°
 *   R crosses AB    6.7525 m                 6.7562 m
 *   reaction A       88.34 kN at 48.67°       88.23 kN at 47.95°
 *   reaction B       76.07 kN at 135.98°      77.22 kN at 135.91°
 *   pole o (kN)     (−58.34, −66.34)         (−59.06, −65.52)
 *   point i (kN)    (−2.02, −66.34)          (−2.00, −65.52)
 *   F₁…F₄ drawn     44.98, 29.99, 15.00, 29.99
 *
 * NO DISAGREEMENT: the key is right, and agrees to drawing accuracy (worst
 * case 1.5 % on B, 0.7° on the direction of A — the width of a pencil line at
 * 1:250). Two things are worth saying out loud anyway, and the view says both:
 *   1. R is 119.30 kN, NOT 120 kN.
 *   2. The key labels the REAL pole "o" and the TRIAL pole "o′", the reverse
 *      of the usual convention. The same names are used here so the view can
 *      be read side by side with the sheet, but the captions say which is
 *      which.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

// ------------------------------------------------------------- the sheet --

const SPAN = 14.995;                        // A to B, metres (15.00 m)
const XA = [3.1378, 5.9610, 8.9752, 11.8649];   // where each line crosses AB
const TILT = [-8.00, 0.00, -5.00, 7.54];        // degrees from the vertical
const HC0 = 4.121;                          // the sheet's C, above the chord
const SUB = '₁₂₃₄';

// ------------------------------------------------------------ the layout --

const MPU = 1.50;                           // drawing units per metre
const FX = -1.0, FY = -2.0;                 // where A lands
const SFD = 10.5;                           // kN per drawing unit
const GX = -19.0, GY = -0.2;                // start of the load line
// the form diagram is clipped to this box, in metres, so that a wild trial
// pole cannot throw a string off the frame
const BOX = [-2.0, -6.3, 17.0, 9.6];
const HTOP = 9.2, HBOT = -5.5;              // how far the action lines are drawn

const DEFAULTS = {
  F1: 45, F2: 30, F3: 15, F4: 30,
  hC: HC0,                                  // C's height on F₁'s line
  pH: 45, pV: -39,                          // the TRIAL pole, kN from load-line start
  trial: true,                              // show the trial construction
  lbl: true,
  _k: 99,
};

// -------------------------------------------------------------- geometry --

/** Liang–Barsky: clip a segment to [xmin, ymin, xmax, ymax]. */
function clip(p0, p1, box) {
  const dx = p1[0] - p0[0], dy = p1[1] - p0[1];
  let t0 = 0, t1 = 1;
  const tests = [[-dx, p0[0] - box[0]], [dx, box[2] - p0[0]],
                 [-dy, p0[1] - box[1]], [dy, box[3] - p0[1]]];
  for (const [p, q] of tests) {
    if (Math.abs(p) < 1e-12) { if (q < 0) return null; continue; }
    const r = q / p;
    if (p < 0) { if (r > t1) return null; if (r > t0) t0 = r; }
    else { if (r < t0) return null; if (r < t1) t1 = r; }
  }
  return [[p0[0] + t0 * dx, p0[1] + t0 * dy], [p0[0] + t1 * dx, p0[1] + t1 * dy]];
}

const inBox = (p) => p && p[0] >= BOX[0] && p[0] <= BOX[2]
                       && p[1] >= BOX[1] && p[1] <= BOX[3];

function compute(s) {
  const A = [0, 0], B = [SPAN, 0];
  const mag = [s.F1, s.F2, s.F3, s.F4];
  // every line of action: a point on the chord + the DOWNWARD unit vector
  const ln = TILT.map((t, i) => {
    const r = V.rad(t);
    return { p: [XA[i], 0], u: [Math.sin(r), -Math.cos(r)], F: mag[i] };
  });
  // a point on line i at height h above the chord
  const at = (i, h) => V.sub(ln[i].p, V.mul(ln[i].u, h / -ln[i].u[1]));

  // C rides on F₁'s line of action — that is what makes the exercise solvable
  const C = at(0, s.hC);

  // 1. the resultant, and where it acts
  let Rv = [0, 0];
  for (const L of ln) Rv = V.add(Rv, V.mul(L.u, L.F));
  const Rmag = V.len(Rv);
  const uR = V.unit(Rv);
  const scal = mag.reduce((a, b) => a + b, 0);     // the SCALAR sum, for contrast
  let Mo = 0;                                      // moment about A
  for (const L of ln) Mo += L.p[0] * L.F * L.u[1] - L.p[1] * L.F * L.u[0];
  const xR = Mo / Rv[1];
  const Rp = [xR, 0];

  // 2. the reaction at A must run along A–C (C sits on F₁'s line, so the free
  //    body left of C carries nothing but that reaction)
  const uA = V.unit(V.sub(C, A));
  const P = V.intersect(A, uA, Rp, uR) || [xR, 0];
  const uB = V.unit(V.sub(P, B));
  const den = uA[0] * uB[1] - uA[1] * uB[0];
  const Am = (-Rv[0] * uB[1] + uB[0] * Rv[1]) / den;
  const Bm = (-uA[0] * Rv[1] + Rv[0] * uA[1]) / den;

  // 3. the arch: walk the funicular from A
  const nodes = [A];
  const N = [Am];
  let T = V.mul(uA, Am), cur = A;
  for (const L of ln) {
    cur = V.intersect(cur, T, L.p, L.u) || cur;
    nodes.push(cur);
    T = V.add(T, V.mul(L.u, L.F));
    N.push(V.len(T));
  }
  const endB = V.intersect(nodes[4], T, B, [0, 1]) || B;
  const closeErr = endB[1];
  nodes.push([B[0], 0]);

  // 4. the force diagram, in kN with the load line starting at (0,0)
  const fp = [[0, 0]];
  for (const L of ln) fp.push(V.add(fp[fp.length - 1], V.mul(L.u, L.F)));
  const oReal = V.mul(uA, -Am);                      // A = the vector o → 0

  // 5. the TRIAL pole — kept clear of the load line, where it would degenerate
  let ot = [s.pH, s.pV];
  const nrm = V.perp(uR);                            // cross(uR, nrm) = +1
  const dperp = V.cross(uR, ot);
  if (Math.abs(dperp) < 6) ot = V.add(ot, V.mul(nrm, (dperp >= 0 ? 6 : -6) - dperp));

  const tray = fp.map((q) => V.sub(q, ot));          // the trial rays
  const tn = [A];                                    // the trial funicular, from A
  cur = A;
  for (let i = 0; i < 4; i++) {
    cur = V.intersect(cur, tray[i], ln[i].p, ln[i].u) || cur;
    tn.push(cur);
  }
  // where the last string crosses the line through B parallel to R
  const tEnd = V.intersect(tn[4], tray[4], B, uR) || B;
  // first string ∩ last string — always on R's line of action, whatever o′ is
  const S = V.intersect(A, tray[0], tn[4], tray[4]) || Rp;
  const xS = S[0] - (uR[0] / uR[1]) * S[1];          // where that line meets AB
  // the trial closing string, and the division point it fixes on the R-line
  const csp = V.sub(tEnd, A);
  const iPt = V.intersect(ot, csp, fp[0], uR) || fp[0];
  // the real closing string is A–B, so the real pole sits on the horizontal
  // through i; the direction A–C then fixes it along that horizontal
  const oGraph = V.intersect(iPt, [1, 0], fp[0], uA) || oReal;
  const poleErr = V.dist(oGraph, oReal);

  // clipped trial strings
  const tseg = [];
  for (let i = 0; i < 5; i++) {
    const a = tn[i], b = i < 4 ? tn[i + 1] : tEnd;
    tseg.push(clip(a, b, BOX));
  }
  const sIn = inBox(S);

  return {
    A, B, C, ln, at, mag, scal,
    Rv, Rmag, uR, xR, Rp, Rang: (Math.atan2(-Rv[0], -Rv[1]) * 180) / Math.PI,
    uA, uB, P, Am, Bm, angA: (Math.atan2(uA[1], uA[0]) * 180) / Math.PI,
    angB: (Math.atan2(uB[1], uB[0]) * 180) / Math.PI,
    nodes, N, closeErr, Nmax: Math.max(...N), NmaxI: N.indexOf(Math.max(...N)) + 1,
    fp, oReal, ot, tray, tn, tEnd, S, xS, sIn, tseg, iPt, oGraph, poleErr,
    hC: s.hC, Hthrust: Math.abs(V.mul(uA, Am)[0]),
  };
}

// ----------------------------------------------------------------- steps --

const STEPS = [
  { t: 'The exercise', d: 'EX X page 8. Four inclined point loads, two pinned supports, and one extra point C the structure has to pass through. Find the only arch that is in equilibrium under this load and goes through C',
    take: 'two pins plus a load is one condition short of an answer — C is the condition that closes it' },
  { t: 'What is given', d: 'left: the two supports 15.00 m apart and level, the four lines of action drawn dash-dot, and C. Only F₂ is vertical; the other three lean, which is what makes this harder than it looks',
    detail: (d) => [`F₁ = ${d.mag[0]} · F₂ = ${d.mag[1]} · F₃ = ${d.mag[2]} · F₄ = ${d.mag[3]} kN`,
                    `tilts from the vertical: ${TILT.map((t) => t.toFixed(2)).join('° · ')}°`,
                    `C = (${d.C[0].toFixed(3)}, ${d.C[1].toFixed(3)}) m — and it sits ON F₁'s line of action`],
    take: 'note where C is. It is not a random point: it lies exactly on the line of action of F₁' },
  { t: 'The load line, and R', d: 'right: the four vectors laid tip to tail, each parallel to its own line of action. The closing vector is the resultant — and because the loads are inclined it is SHORTER than the sum of their magnitudes',
    detail: (d) => [`scalar sum ${d.mag.join(' + ')} = ${d.scal} kN`,
                    `vector sum |R| = ${d.Rmag.toFixed(2)} kN, ${d.Rang.toFixed(2)}° west of vertical`,
                    `at 1 cm ≙ 10 kN that is a ${(d.Rmag / 10).toFixed(2)} cm line`],
    take: 'R = 119.30 kN, not 120. Adding magnitudes instead of vectors is the classic slip here' },
  { t: 'Pick ANY pole o′', d: 'right: the load line gives R\'s size and direction but says nothing about where it acts, because the four lines never meet in one point. So pick a pole — anywhere off the load line — and draw a ray to every division of it',
    detail: (d) => [`trial pole o′ at (${d.ot[0].toFixed(1)}, ${d.ot[1].toFixed(1)}) kN from the start of the load line`,
                    `five rays, o′–0 … o′–4, one for each string of the funicular to come`],
    take: 'the pole is free. That freedom is the whole trick, and the next two steps are about proving it costs nothing' },
  { t: 'The trial funicular', d: 'left: start at A and walk. Between two lines of action draw a string parallel to the ray that separates them — string 1 ∥ ray 0, string 2 ∥ ray 1, and so on. The polygon that comes out is not the answer; it is a scaffold',
    take: 'nothing about this shape is the structure. It is a measuring instrument' },
  { t: 'Close it — and R appears', d: 'left: extend the FIRST and the LAST string until they cross, at S. The whole load acts as one force through S. NOW DRAG THE TRIAL POLE — the scaffold changes shape completely and this line does not move',
    detail: (d) => [`S = (${d.S[0].toFixed(2)}, ${d.S[1].toFixed(2)}) m — S slides, the line does not`,
                    `R crosses AB at x = ${d.xS.toFixed(4)} m; midspan is ${(SPAN / 2).toFixed(3)} m`],
    take: 'drag o′ anywhere: 6.7562 m, every time. That invariance is the method' },
  { t: 'The closing strings, and i', d: 'left: CS′ joins the two ends of the TRIAL funicular, on the lines through A and B parallel to R. CS closes the real one, and since that passes through A and B, CS is just A–B. Right: the ray o′–i parallel to CS′ cuts the R-line at i',
    detail: (d) => [`i = (${d.iPt[0].toFixed(2)}, ${d.iPt[1].toFixed(2)}) kN — invariant too`,
                    `it splits R into ${V.dist(d.fp[0], d.iPt).toFixed(2)} kN for A and ${V.dist(d.iPt, d.fp[4]).toFixed(2)} kN for B`],
    take: 'the real pole has to lie on the horizontal through i' },
  { t: 'C fixes the pole', d: 'the third condition. Cut the arch just left of C: F₁ passes through C, so the only force on that piece is the reaction at A — which can then have NO moment about C. So A runs along A–C. Where that ray meets the horizontal through i is the real pole o',
    detail: (d) => [`A–C is at ${d.angA.toFixed(2)}° · graphical vs statical pole: ${d.poleErr.toExponential(1)} kN`,
                    `A, B and R meet at P = (${d.P[0].toFixed(2)}, ${d.P[1].toFixed(2)}) m`],
    take: 'the key gets here via CS and CS′; the moment about C gets here in one line' },
  { t: 'The arch', d: 'left: walk the funicular again with the real pole. First string A–C, one node on each line of action, and the last string arrives at B on its own — nobody made it. All navy: compression from end to end',
    detail: (d) => [`member forces ${d.N.map((n) => n.toFixed(2)).join(' · ')} kN`,
                    `closure at B: ${Math.abs(d.closeErr).toExponential(1)} m — it was never forced to`],
    take: 'the last string closing on B is the check' },
  { t: 'The answer', d: 'the maximum thrust is in the member at A — as it always is in an arch whose load sits to one side. Move C up or down its own line of action and watch the whole structure and both reactions follow; drag the trial pole and watch nothing at all happen to the answer',
    detail: (d) => [`R = ${d.Rmag.toFixed(2)} kN at ${d.Rang.toFixed(2)}° from vertical, through x = ${d.xR.toFixed(3)} m`,
                    `A = ${d.Am.toFixed(2)} kN at ${d.angA.toFixed(2)}° · B = ${d.Bm.toFixed(2)} kN at ${d.angB.toFixed(2)}°`,
                    `max ${d.Nmax.toFixed(2)} kN in member ${d.NmaxI} · nothing in tension`],
    take: 'trial funicular = find WHERE R acts. Point C = find WHICH funicular. Two separate jobs, two separate poles' },
];

const K_LOAD = 2, K_POLE = 3, K_TRIAL = 4, K_CLOSE = 5, K_CS = 6, K_REAL = 7,
      K_ARCH = 8;

// ------------------------------------------------------------------ view --

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  const fm = (p) => [FX + p[0] * MPU, FY + p[1] * MPU];
  const fc = (v) => [GX + v[0] / SFD, GY + v[1] / SFD];
  const BLUE = { pending: PAL.black, final: () => PAL.blue };
  const TRI = (st) => st.trial;

  dw.label('t_form', 'Form diagram 1:250', { cls: 'title', flash: false });
  dw.label('t_force', 'Force diagram 1 cm ≙ 10 kN', { cls: 'title', flash: false });

  // ---- given: supports, action lines, loads, C
  for (const n of ['A', 'B']) {
    dw.disk(`sup${n}`, { intro: 1, r: dw.W.disk });
    dw.strokes(`hat${n}`, 5, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
    dw.label(`lsup${n}`, n, { cls: 'num', intro: 1, flash: false });
  }
  for (let i = 0; i < 4; i++) {
    dw.dashLine(`la${i}`, { intro: 1, color: PAL.grey, dash: dw.W.dash });
    dw.arrow(`f${i}`, { intro: 1, color: PAL.green, ...ARR });
    dw.label(`lf${i}`, `F${SUB[i]}`, { cls: 'num', intro: 1, color: PAL.green });
  }
  dw.disk('ptC', { intro: 1, r: dw.W.disk });
  dw.label('lC', 'C', { cls: 'num', intro: 1 });

  // ---- the load line
  for (let i = 0; i < 4; i++) {
    dw.arrow(`ff${i}`, { intro: K_LOAD, color: PAL.green, ...NARR });
    dw.label(`lff${i}`, `F${SUB[i]}`, { cls: 'num', intro: K_LOAD, color: PAL.green,
      when: (st) => st.lbl });
    dw.link(`f${i}`, `ff${i}`, `lf${i}`, `lff${i}`);
  }
  dw.dashArrow('Rforce', { intro: K_LOAD, color: PAL.green, w: ARR.w * 1.15,
    headLen: ARR.headLen, headW: ARR.headW, dash: dw.W.dash * 1.6, flash: false });
  dw.label('lRforce', 'R', { cls: 'num', intro: K_LOAD, color: PAL.green });

  // ---- the trial pole and its rays
  dw.disk('ptOt', { intro: K_POLE, r: dw.W.disk * 0.85, when: TRI });
  dw.label('lOt', 'o′  (trial)', { cls: 'num', intro: K_POLE, when: TRI });
  for (let i = 0; i <= 4; i++) {
    dw.seg(`tray${i}`, { intro: K_POLE, w: dw.W.ray, color: PAL.grey, when: TRI });
  }
  // ---- the trial funicular, clipped to the drawing box
  for (let i = 0; i <= 4; i++) {
    dw.seg(`tstr${i}`, { intro: K_TRIAL, w: dw.W.ray, color: PAL.grey, z: -0.05,
      when: (st, dd) => st.trial && !!dd && !!dd.tseg[i] });
    dw.link(`tstr${i}`, `tray${i}`);
  }
  dw.dashLine('ext0', { intro: K_CLOSE, color: PAL.grey, dash: dw.W.dash,
    when: (st, dd) => st.trial && !!dd && dd.sIn });
  dw.dashLine('ext4', { intro: K_CLOSE, color: PAL.grey, dash: dw.W.dash,
    when: (st, dd) => st.trial && !!dd && dd.sIn });
  dw.link('ext0', 'tray0');
  dw.link('ext4', 'tray4');
  dw.disk('ptS', { intro: K_CLOSE, r: dw.W.disk,
    when: (st, dd) => st.trial && !!dd && dd.sIn });
  dw.label('lS', 'S', { cls: 'num', intro: K_CLOSE,
    when: (st, dd) => st.trial && !!dd && dd.sIn });

  // ---- R's line of action, and R itself, in the form diagram
  dw.dashLine('Rline', { intro: K_CLOSE, color: PAL.green, dash: dw.W.dash });
  dw.dashArrow('Rform', { intro: K_CLOSE, color: PAL.green, w: ARR.w * 1.15,
    headLen: ARR.headLen, headW: ARR.headW, dash: dw.W.dash * 1.6, flash: false });
  dw.label('lRform', 'R', { cls: 'num', intro: K_CLOSE, color: PAL.green });
  dw.dashLine('vertA', { intro: K_CLOSE, color: PAL.grey, dash: dw.W.dash, when: TRI });
  dw.dashLine('vertB', { intro: K_CLOSE, color: PAL.grey, dash: dw.W.dash, when: TRI });
  dw.link('Rform', 'Rforce', 'Rline', 'vertA', 'vertB', 'lRform', 'lRforce');

  // ---- the closing strings and the division point i
  dw.dashLine('csForm', { intro: K_CS, color: PAL.black, dash: dw.W.dash });
  dw.label('lCS', 'CS', { cls: 'num', intro: K_CS });
  dw.dashLine('cspForm', { intro: K_CS, color: PAL.black, dash: dw.W.dash, when: TRI });
  dw.label('lCSp', 'CS′', { cls: 'num', intro: K_CS, when: TRI });
  dw.dashLine('cspRay', { intro: K_CS, color: PAL.black, dash: dw.W.dash, when: TRI });
  dw.dashLine('csRay', { intro: K_REAL, color: PAL.black, dash: dw.W.dash });
  dw.disk('ptI', { intro: K_CS, r: dw.W.disk * 0.85 });
  dw.label('lI', 'i', { cls: 'num', intro: K_CS });
  dw.link('cspForm', 'cspRay', 'lCSp');
  dw.link('csForm', 'csRay', 'lCS');

  // ---- the real pole, its rays, and the arch
  dw.dashLine('lineAC', { intro: K_REAL, color: PAL.grey, dash: dw.W.dash });
  dw.disk('ptO', { intro: K_REAL, r: dw.W.disk * 0.85 });
  dw.label('lO', 'o  (real)', { cls: 'num', intro: K_REAL });
  for (let i = 0; i <= 4; i++) {
    dw.seg(`ray${i}`, { intro: K_REAL, w: dw.W.ray, color: BLUE });
    dw.label(`lray${i}`, `${i + 1}`, { cls: 'point', intro: K_ARCH, color: PAL.blue,
      when: (st) => st.lbl });
    dw.seg(`mem${i}`, { intro: K_ARCH, w: dw.W.bar, color: BLUE, z: 0.06 });
    dw.label(`lmem${i}`, '', { cls: 'num', intro: K_ARCH, color: PAL.blue,
      when: (st) => st.lbl });
    dw.link(`mem${i}`, `ray${i}`, `lmem${i}`, `lray${i}`);
  }
  for (let i = 1; i <= 4; i++) dw.disk(`nd${i}`, { intro: K_ARCH, r: dw.W.disk * 0.8 });
  dw.arrow('RA', { intro: K_REAL, color: PAL.green, ...ARR });
  dw.arrow('RB', { intro: K_REAL, color: PAL.green, ...ARR });
  dw.label('lRA', '', { cls: 'num', intro: K_REAL, color: PAL.green });
  dw.label('lRB', '', { cls: 'num', intro: K_REAL, color: PAL.green });
  dw.link('mem0', 'ray0', 'RA', 'lineAC', 'lRA');
  dw.link('mem4', 'ray4', 'RB', 'lRB');
  dw.disk('ptP', { intro: K_REAL, r: dw.W.disk * 0.7 });
  dw.label('lP', 'P', { cls: 'num', intro: K_REAL, color: PAL.grey,
    when: (st) => st.lbl });

  dw.instant('t_form', 't_force');
  dw.ghostable('ff0', 'ff1', 'ff2', 'ff3', 'Rforce');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);

    dw.setLabel('t_form', [13.0, -11.6]);
    dw.setLabel('t_force', [-18.4, -12.6]);
    dw.setText('t_force', `Force diagram 1 cm ≙ 10 kN — R = ${d.Rmag.toFixed(2)} kN, not ${d.scal}`);

    // --- supports
    for (const [n, p] of [['A', d.A], ['B', d.B]]) {
      const q = fm(p);
      dw.setDisk(`sup${n}`, q);
      dw.setStrokes(`hat${n}`, V.hatch([q[0] - 1.5, q[1] - 0.45],
        [q[0] + 1.5, q[1] - 0.45], -1, 0.85, 5));
      dw.setLabel(`lsup${n}`, [q[0] + (n === 'A' ? -1.5 : 1.5), q[1] - 1.5]);
    }

    // --- lines of action + load arrows
    for (let i = 0; i < 4; i++) {
      dw.setDashLine(`la${i}`, [fm(d.at(i, HBOT)), fm(d.at(i, HTOP))]);
      const tail = fm(d.at(i, 8.3)), tip = fm(d.at(i, 6.4));
      dw.setArrow(`f${i}`, tail, tip);
      dw.setLabel(`lf${i}`, V.add(V.mid(tail, tip), [1.15, 0.35]));
    }
    dw.setDisk('ptC', fm(d.C));
    dw.setLabel('lC', V.add(fm(d.C), [-1.4, 0.5]));

    // --- the load line
    for (let i = 0; i < 4; i++) {
      dw.setArrow(`ff${i}`, fc(d.fp[i]), fc(d.fp[i + 1]));
      dw.setLabel(`lff${i}`, V.add(V.mid(fc(d.fp[i]), fc(d.fp[i + 1])), [-1.4, 0]));
    }
    const off = [1.7, 0];
    dw.setDashArrow('Rforce', V.add(fc(d.fp[0]), off), V.add(fc(d.fp[4]), off));
    dw.setLabel('lRforce', V.add(V.add(V.mid(fc(d.fp[0]), fc(d.fp[4])), off), [1.1, 0]));

    // --- the trial pole, its rays and its funicular
    dw.setDisk('ptOt', fc(d.ot));
    dw.setLabel('lOt', V.add(fc(d.ot), [2.6, 0.65]));
    for (let i = 0; i <= 4; i++) dw.setSeg(`tray${i}`, fc(d.ot), fc(d.fp[i]));
    for (let i = 0; i <= 4; i++) {
      const c = d.tseg[i];
      if (c) dw.setSeg(`tstr${i}`, fm(c[0]), fm(c[1]));
      else dw.setSeg(`tstr${i}`, fm(d.A), fm(d.A));
    }
    const c0 = clip(d.S, d.tn[0], BOX) || [d.A, d.A];
    const c4 = clip(d.tn[4], d.S, BOX) || [d.A, d.A];
    dw.setDashLine('ext0', [fm(c0[0]), fm(c0[1])]);
    dw.setDashLine('ext4', [fm(c4[0]), fm(c4[1])]);
    dw.setDisk('ptS', fm(d.S));
    dw.setLabel('lS', V.add(fm(d.S), [1.2, 0.7]));

    // --- R in the form diagram
    const rp = (h) => V.sub(d.Rp, V.mul(d.uR, h / -d.uR[1]));
    dw.setDashLine('Rline', [fm(rp(HBOT)), fm(rp(10.6))]);
    dw.setDashArrow('Rform', fm(rp(10.4)), fm(rp(7.4)));
    dw.setLabel('lRform', V.add(fm(rp(9.0)), [1.2, 0]));
    dw.setDashLine('vertA', [fm(V.add(d.A, V.mul(d.uR, 6.0))), fm(V.sub(d.A, V.mul(d.uR, 9.4)))]);
    dw.setDashLine('vertB', [fm(V.add(d.B, V.mul(d.uR, 6.0))), fm(V.sub(d.B, V.mul(d.uR, 9.4)))]);

    // --- the closing strings and i
    dw.setDashLine('csForm', [fm(d.A), fm(d.B)]);
    dw.setLabel('lCS', V.add(fm(V.mid(d.A, d.B)), [0, 0.95]));
    dw.setDashLine('cspForm', [fm(d.A), fm(d.tEnd)]);
    dw.setLabel('lCSp', V.add(fm(V.mid(d.A, d.tEnd)), [-0.4, -1.15]));
    dw.setDashLine('cspRay', [fc(d.ot), fc(d.iPt)]);
    dw.setDashLine('csRay', [fc(d.oReal), fc(d.iPt)]);
    dw.setDisk('ptI', fc(d.iPt));
    dw.setLabel('lI', V.add(fc(d.iPt), [0.55, -0.85]));

    // --- the real pole, its rays, the arch
    dw.setDashLine('lineAC', [fm(V.sub(d.A, V.mul(d.uA, 5.6))), fm(V.add(d.C, V.mul(d.uA, 4.4)))]);
    dw.setDisk('ptO', fc(d.oReal));
    dw.setLabel('lO', V.add(fc(d.oReal), [-2.6, 0.7]));
    for (let i = 0; i <= 4; i++) {
      const o = fc(d.oReal), q = fc(d.fp[i]);
      dw.setSeg(`ray${i}`, o, q);
      dw.setLabel(`lray${i}`, V.add(V.add(o, V.mul(V.sub(q, o), 0.44)),
        V.mul(V.unit(V.perp(V.sub(q, o))), 0.65)));
      const a = fm(d.nodes[i]), b = fm(d.nodes[i + 1]);
      dw.setSeg(`mem${i}`, a, b);
      dw.setLabel(`lmem${i}`, V.add(V.mid(a, b), [0, i === 0 || i === 4 ? -1.3 : 1.2]));
      dw.setText(`lmem${i}`, `${d.N[i].toFixed(1)}`);
    }
    for (let i = 1; i <= 4; i++) dw.setDisk(`nd${i}`, fm(d.nodes[i]));
    const ta = V.sub(d.A, V.mul(d.uA, 5.2)), tb = V.sub(d.B, V.mul(d.uB, 5.2));
    dw.setArrow('RA', fm(ta), fm(d.A));
    dw.setArrow('RB', fm(tb), fm(d.B));
    dw.setLabel('lRA', V.add(fm(ta), [-0.5, -1.1]));
    dw.setLabel('lRB', V.add(fm(tb), [0.9, -1.1]));
    dw.setText('lRA', `A = ${d.Am.toFixed(2)} kN`);
    dw.setText('lRB', `B = ${d.Bm.toFixed(2)} kN`);
    dw.setDisk('ptP', fm(d.P));
    dw.setLabel('lP', V.add(fm(d.P), [1.3, 0.9]));

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  // drag the trial pole straight off the drawing
  dw.enableDrag((x, y, tol) => {
    const p = fc(d.ot);
    return Math.hypot(x - p[0], y - p[1]) < tol * 2 ? 'ot' : null;
  }, (key, x, y) => {
    s.pH = Math.max(-90, Math.min(95, (x - GX) * SFD));
    s.pV = Math.max(-105, Math.min(-8, (y - GY) * SFD));
    refresh();
  });

  const tr = panel.section('The trial funicular — drag it and watch nothing happen');
  panel.slider(tr, s, 'pH', 'trial pole o′ — across (kN)', -90, 95, 1, refresh,
    (v) => `${(+v).toFixed(0)}`);
  panel.slider(tr, s, 'pV', 'trial pole o′ — down (kN)', -105, -8, 1, refresh,
    (v) => `${(+v).toFixed(0)}`);
  panel.toggle(tr, s, 'trial', 'show the trial construction', refresh);

  const g = panel.section('Given');
  panel.slider(g, s, 'hC', 'C — height on F₁’s line (m)', 2.0, 7.0, 0.05, refresh,
    (v) => `${(+v).toFixed(2)}`);
  for (const [k, lb] of [['F1', 'F₁ (kN)'], ['F2', 'F₂ (kN)'],
                         ['F3', 'F₃ (kN)'], ['F4', 'F₄ (kN)']]) {
    panel.slider(g, s, k, lb, 5, 60, 1, refresh);
  }
  panel.toggle(g, s, 'lbl', 'show labels', refresh);

  refresh();
  return player;
}

export const meta = {
  title: 'EX X · 8 — the thrust line, found with a trial funicular',
  subtitle: 'Structural Design I · “EX X — Additional Exercises”, p. 8, task 8 a)',
  about: 'Four inclined loads, two pinned supports, and one point C the arch has to pass through. Two pins and a load are one condition short of an answer, and C supplies it. The construction comes in two halves that are easy to confuse. First the TRIAL funicular: pick a pole anywhere off the load line, walk a polygon through the loads, and where its first and last strings cross is a point on the resultant’s line of action. Drag that trial pole — the polygon takes a completely different shape every time and the answer does not move by a millimetre, which is the only reason the method is allowed. Then the real pole, fixed by C: because C sits on the line of action of F₁, the piece of arch left of C carries nothing but the reaction at A, so that reaction must run along A–C. Two poles, two jobs. Everything is compression, and the biggest force is the one at A.',
  result: (d) => [
    `R = ${d.Rmag.toFixed(2)} kN at ${d.Rang.toFixed(2)}° west of vertical — NOT ${d.scal} kN: the magnitudes add to ${d.scal}, the vectors do not`,
    `its line of action crosses AB at x = ${d.xR.toFixed(3)} m from A, and the trial funicular puts it at ${d.xS.toFixed(4)} m for every pole`,
    `A = ${d.Am.toFixed(2)} kN at ${d.angA.toFixed(2)}° (along A–C) · B = ${d.Bm.toFixed(2)} kN at ${d.angB.toFixed(2)}°`,
    `arch ${d.N.map((n) => n.toFixed(2)).join(' · ')} kN, all COMPRESSION · max ${d.Nmax.toFixed(2)} kN in member ${d.NmaxI} · closes at B to ${Math.abs(d.closeErr).toExponential(1)} m`],
  frame: [[-26, -22], [30, 16]],
};
