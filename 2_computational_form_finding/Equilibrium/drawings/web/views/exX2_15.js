/**
 * EX X · Aufgabe 15 — Additional Horizontal Forces (quantitatively), layout 2
 * Structural Design II, FS 23, sheet "EX X — Additional Exercises", page 13.
 *
 * NUMBERING. The English sheet calls this "Task 3" — one of three blocks with
 * that label. German: Aufgabe 15, used here (error E1). As on page 12 the
 * German splits it into a) the plate and b) the walls; the English does not.
 *
 * TEXT (verbatim, English). "Consider the force flow within the ceiling due to
 * an applied horizontal force. The walls are used for bracing, therefore find
 * the internal force flow in the plate such as it can be redirected into the
 * ground through the walls. Draw the corresponding force diagram if F = 100 kN.
 * Then find a possible internal force flow in the walls A, B and C. First draw
 * the applied horizontal force for each wall into the corresponding form
 * diagram. Use red for tension, blue for compression and green for the external
 * forces."
 *
 * GIVEN. F = 100 kN horizontal. Top view 1:200; wall elevations 1:100; force
 * diagrams **1 cm ≙ 20 kN** — note that this is NOT the 1 cm ≙ 10 kN of
 * page 12, on an otherwise near-identical page.
 *
 * GEOMETRY — top view, 1:200, origin = bottom-left corner of the ceiling slab.
 * The same slab as page 12, a different wall layout.
 *   ceiling slab           x 0 … 15.995   y 0 … 11.995
 *   wall B (runs in x)     x 10.996 … 15.995   y 11.595 … 11.995 (CL 11.795)
 *   wall A (runs in y)     x  7.798 …  8.197 (CL  7.998)   y 0 … 4.998
 *   wall C (runs in y)     x 15.595 … 15.995 (CL 15.795)   y 0 … 4.998
 *   F, pointing +x         applied at the left edge, x = 0, y = 5.997 (mid-height)
 * All three walls 4.998 m long, 0.400 m thick.
 *
 * a) ANSWERS — the plate.
 *      ΣFx :  B = 100.00 kN          (wall B is the only x-bracing wall)
 *      ΣFy :  A + C = 0              → A and C form a COUPLE
 *      ΣM  :  F and B are themselves a couple, 100 × (11.795 − 5.997)
 *             = 579.8 kNm, balanced by A and C over their spacing
 *             15.795 − 7.998 = 7.798 m
 *    → A = C = 579.76 / 7.798 = 74.35 kN, equal and opposite.
 *
 *      wall B  100.00 kN along the wall (x), opposing F
 *      wall A   74.35 kN along the wall (y)
 *      wall C   74.35 kN along the wall (y), opposite in sense to A
 *
 *    Independent check, moments about the slab origin: F gives
 *    −5.997 × 100 = −599.7 kNm; B gives −11.795 × (−100) = +1179.5 kNm; A at
 *    x = 7.998 gives 7.998 A and C at x = 15.795 gives −15.795 A. Sum:
 *    579.76 − 7.798 A = 0 → A = 74.35 kN. ΣFy = 74.35 − 74.35 = 0. Closes.
 *    Couple route, which is quicker: F and B are equal, opposite and 5.798 m
 *    apart → 579.76 kNm; A and C are equal, opposite and 7.798 m apart →
 *    74.35 × 7.798 = 579.76 kNm. Identical.
 *
 *    THE FORCE DIAGRAM CLOSES AS A RECTANGLE. F, A, B and C laid tip to tail
 *    are 100 → 74.35 → 100 → 74.35 at right angles, so the polygon is a true
 *    100 × 74.35 rectangle. That is what "two couples in balance" looks like
 *    when you draw it, and it is worth noticing that a closed polygon proves
 *    only ΣF = 0 — the moment equation, which is the one that produced 74.35,
 *    leaves no trace in it at all.
 *
 * GEOMETRY — wall elevations, 1:100, origin = bottom-left corner of each panel.
 * All three panels 4.998 × 2.999 m; clear height to the slab soffit 2.599 m;
 * supports pin / roller at x = 0.200 and x = 4.798.
 *   wall A  a plain solid panel, nothing drawn inside. Pin left, roller right.
 *   wall B  a solid panel with a rectangular door opening, 2.199 m wide ×
 *           1.599 m high, sitting on the base, from x = 1.3995 to 3.5987 —
 *           centred on the wall's mid-length, leaving 1.400 m piers each side.
 *           Pin left, roller right.
 *   wall C  a cross-braced panel: X-bracing over a rectangle 3.5676 × 2.1714 m
 *           placed from x = 0.6926 to 4.2602 and y = 0.3275 to 2.4989; each
 *           diagonal 4.176 m long at ±31.30°.
 *           ITS SUPPORTS ARE SWAPPED — roller LEFT, pin RIGHT — relative to
 *           walls A and B on this page and to every wall on page 12. This is
 *           sheet error E18: almost certainly a mirrored block rather than
 *           intent, but it changes which base takes the horizontal force.
 *
 * b) ANSWERS — the walls.
 *   wall B, 100.00 kN at 2.599 m: overturning 259.9 kNm over the 4.598 m
 *     support spacing → vertical couple ±56.53 kN; the force path must arch
 *     OVER the 2.199 m door opening, because the straight line from the near
 *     top corner to the far base support passes right through it.
 *   wall A, 74.35 kN at 2.599 m: overturning 193.24 kNm / 4.598 m → ±42.03 kN
 *     vertical couple. A plain panel, so a single diagonal strut plus a tie is
 *     the natural answer.
 *   wall C, 74.35 kN at 2.599 m: the X-brace takes it directly. If only the
 *     tension diagonal acts (the usual assumption for slender steel crosses),
 *     N = 74.35 / cos 31.30° = 87.04 kN; if both diagonals act, ±43.52 kN
 *     each. Chord force = 74.35 × tan 31.30° = 45.18 kN.
 *
 * The sheet prints no answers. Everything above is derived, and the plate
 * solution was reproduced twice — by hand from the couple argument and through
 * lib/plan.js's 3 × 3 solve — agreeing to the last digit.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';
import { pageScales, mapper, slabRing, makeWall, axisSeg, lineOfAction,
         stability, solvePlan, wallResultant, panelBase, viewTriangle,
         reactionArrow } from '../lib/plan.js';

// -------------------------------------------------------------- the model --

const SLW = 15.995, SLH = 11.995;
const WT = 0.400;
const PANL = 4.998, PANH = 2.999, SLABT = 0.400;
const HCLR = PANH - SLABT;             // 2.599 m
const INSET = 0.200;
const DOOR_B = { x0: 1.3995, x1: 3.5987, h: 1.599 };
const XBR_C = { x0: 0.6926, x1: 4.2602, y0: 0.3275, y1: 2.4989 };

const NAX = 3, NARCH = 10;

// ---------------------------------------------------------------- layout --

const SC = pageScales(1.5);            // 1 printed cm ≙ 1.5 drawing units
const FORCE20 = SC.cm / 20;            // THIS page says 1 cm ≙ 20 kN, not 10
const PORG = [11.0, -1.6];
const EORG = [[3.6, -15.6], [12.6, -15.6], [21.6, -15.6]];
const FDX = -14.0, FDY = -2.2;
const FARR = 0.05;                     // units per kN for arrows on FORM diagrams
const ROFF = 1.7;

const DEFAULTS = { F: 100, fy: 5.997, xboth: false, axes: true, lbl: true, _k: 99 };

const K_AXES = 2, K_LOAD = 3, K_SOLVE = 4, K_FD = 5, K_WALL = 6, K_REV = 7;

export const meta = {
  title: 'EX X · 15 — one wall takes the force, two more take the twist',
  subtitle: 'Structural Design II · “EX X — Additional Exercises”, p. 13 · German Aufgabe 15 (the English sheet calls it “Task 3”)',
  about: 'The same slab as page 12, the same 100 kN, and the walls moved. Now only one wall lies along the load, so it takes all of it — and because it sits five and a half metres away from the force, the two of them form a couple that would spin the floor. The other two walls, both across the load, cancel each other out to zero net force and exist purely to supply the opposing twist. That is the cleanest demonstration in the whole booklet of what a bracing couple is for: slide the force up the edge and wall B never changes, while A and C run from +74 kN through zero — exactly when the force lines up with B — and out the other side reversed. Watch the force polygon while you do it: it is a rectangle, and it closes just as happily when the answer is wrong, because a closed polygon knows nothing about moments.',
  result: (d) => [
    `F = ${d.F.toFixed(1)} kN horizontal at y = ${d.fy.toFixed(3)} m · force diagram 1 cm ≙ 20 kN on this page (page 12 says 10 kN — the same drawing, a different scale)`,
    `ΣFx: wall B = ${d.NB.toFixed(2)} kN, the only x-bracing wall · ΣFy: A + C = ${(d.lam[0] + d.lam[2]).toExponential(1)} → A and C are a COUPLE`,
    `ΣM: F and B are a couple of ${d.F.toFixed(1)} × ${Math.abs(11.795 - d.fy).toFixed(3)} = ${Math.abs(d.Mcouple).toFixed(2)} kNm, over A and C's ${d.spacing.toFixed(3)} m spacing → A = C = ${d.NA.toFixed(2)} kN`,
    `walls: B ${d.NB.toFixed(2)} kN — a ±${d.coupB.toFixed(2)} kN base couple arching over the 2.199 m door · A ${d.NA.toFixed(2)} kN — ±${d.coupA.toFixed(2)} kN, one diagonal · C ${d.NC.toFixed(2)} kN — X-brace ${d.xboth ? `±${(d.xN / 2).toFixed(2)} kN in both diagonals` : `${d.xN.toFixed(2)} kN in the tension diagonal alone`}, chord ${d.xChord.toFixed(2)} kN`,
    `wall C's supports are SWAPPED (roller left, pin right) against every other wall on this sheet — error E18 · braced by ${d.stab.points.length} distinct axis intersections, residual ${d.resid.toExponential(1)} kN`],
  frame: [[-26, -22], [30, 16]],
};

const STEPS = [
  { t: 'The exercise', d: 'EX X page 13, German Aufgabe 15. The same 16 by 12 metre slab as page 12 and the same 100 kN — but the walls have moved, and now only one of them lies along the load',
    detail: () => ['top view 1:200 · wall elevations 1:100 · force diagram 1 cm ≙ 20 kN',
                   'page 12, an otherwise identical page, says 1 cm ≙ 10 kN. Check the caption before you scale anything off it',
                   'wall B runs east–west at the top right; walls A and C both run north–south'],
    take: 'two pages, two layouts, two completely different answers — from the same slab and the same force' },
  { t: 'The plan', d: 'right: the slab from above. Wall B is tucked into the top-right corner, and A and C stand parallel to each other down the bottom half, 7.798 m apart',
    detail: () => [`slab ${SLW.toFixed(3)} × ${SLH.toFixed(3)} m · all three walls 4.998 m long, 0.400 m thick`,
                   `wall B centreline y = 11.795 · wall A centreline x = 7.998 · wall C centreline x = 15.795`,
                   'A and C are parallel, so they can never share a load — only oppose each other'] },
  { t: 'The axes, and whether it stands up', d: 'draw the three centrelines right across the plan first. A and C are parallel and never meet; B crosses both. Two distinct intersection points, so the slab is properly braced — the compendium\'s own test',
    detail: (d) => [`A ∥ C — no intersection`, `B × A and B × C → ${d.stab.points.length} distinct points`,
                    d.stab.braced ? 'more than one intersection → braced ✓' : `NOT braced: ${d.stab.why}`],
    take: 'three parallel axes, or three through one point, and the floor spins. Anything else works' },
  { t: 'The load', d: 'green: F entering the left edge at mid-height, on its own line of action. It is parallel to B and perpendicular to A and C — so before any arithmetic you already know which wall is going to take it',
    detail: (d) => [`F = ${d.F.toFixed(1)} kN at y = ${d.fy.toFixed(3)} m`,
                    `wall B's axis is at y = 11.795 m, so F and B are ${Math.abs(11.795 - d.fy).toFixed(3)} m apart`,
                    'two equal opposite forces that far apart are a couple, and a couple needs another couple to stop it'] },
  { t: 'One force, then one couple', d: 'the equations fall out in order. ΣFx has only wall B in it. ΣFy has only A and C, and no load — so they are equal and opposite. Then ΣM decides how big that pair has to be',
    detail: (d) => [`ΣFx: B = ${d.NB.toFixed(2)} kN — all of it, because nothing else lies along x`,
                    `ΣFy: A + C = 0 → a pure couple, no net force`,
                    `ΣM: ${d.F.toFixed(1)} × ${Math.abs(11.795 - d.fy).toFixed(3)} = ${Math.abs(d.Mcouple).toFixed(2)} kNm ÷ ${d.spacing.toFixed(3)} m = ${d.NA.toFixed(2)} kN each`],
    take: 'a couple is balanced only by another couple. Its moment does not depend on where you take moments, which is why this one is quicker done by inspection than by ΣM about a corner' },
  { t: 'The force diagram is a rectangle', d: 'left: F, A, B and C laid tip to tail. Two pairs at right angles, each pair equal and opposite — so the polygon closes as a perfect rectangle. And now the warning: it would close just as neatly if A and C were the wrong size, because a force polygon says nothing whatever about moments',
    detail: (d) => [`sides ${d.F.toFixed(2)} × ${d.NA.toFixed(2)} kN, at 1 cm ≙ 20 kN`,
                    `residual force ${d.resid.toExponential(1)} kN · residual moment ${d.residM.toExponential(1)} kNm`,
                    'the moment equation is what produced 74.35, and it leaves no trace in this drawing'],
    take: 'always do the moment check separately. The polygon is necessary and nowhere near sufficient' },
  { t: 'Inside the three walls', d: 'bottom: the panels unfolded. B takes 100 kN over a door it has to arch over; A takes 74.35 kN through one diagonal and a tie; C takes the same 74.35 kN through an X-brace, which is the only one of the three that is honestly detailed for the job',
    detail: (d) => [`B: ±${d.coupB.toFixed(2)} kN base couple; the straight strut would pass through the ${(DOOR_B.x1 - DOOR_B.x0).toFixed(3)} m door, so it kinks over it`,
                    `A: ±${d.coupA.toFixed(2)} kN base couple; the diagonal carries ${d.diagA.toFixed(2)} kN at ${d.degA.toFixed(2)}°`,
                    `C: X-brace at ±31.30° — ${d.xboth ? `±${(d.xN / 2).toFixed(2)} kN in each diagonal` : `${d.xN.toFixed(2)} kN in the tension diagonal, the other slack`}, chord ${d.xChord.toFixed(2)} kN`],
    take: 'wall C\'s supports are drawn roller-left / pin-right — swapped against every other wall on this sheet. Almost certainly a mirrored block, and it moves the horizontal reaction to the other end' },
  { t: 'Slide the force and watch the couple turn over', d: 'the cleanest demonstration on the sheet. Wall B never changes: it always takes the whole 100 kN, wherever the force enters. A and C do all the varying — through zero exactly when F lines up with B, and out the other side with their senses swapped',
    detail: (d) => [`at y = 11.795 m (level with wall B) the lever arm is zero and A = C = 0`,
                    `here, at y = ${d.fy.toFixed(3)} m: A = ${d.lam[0].toFixed(2)}, C = ${d.lam[2].toFixed(2)} kN (signed, along +y)`,
                    `B stays at ${d.NB.toFixed(2)} kN throughout`],
    take: 'the walls that carry no net force are still the ones doing the difficult job. Take them out and the floor rotates' },
];

// ------------------------------------------------------------------ maths --

function compute(s) {
  const A = makeWall('A', [7.998, 0], [7.998, 4.998], WT);
  const B = makeWall('B', [10.996, 11.795], [15.995, 11.795], WT);
  const C = makeWall('C', [15.795, 0], [15.795, 4.998], WT);
  const walls = [A, B, C];

  const loads = [{ at: [0, s.fy], f: [s.F, 0] }];
  const sol = solvePlan(walls, loads);
  const res = wallResultant(walls, sol.lam);
  const stab = stability(walls);

  const NA = Math.abs(sol.lam[0]), NB = Math.abs(sol.lam[1]), NC = Math.abs(sol.lam[2]);
  const spacing = C.mid[0] - A.mid[0];
  const Mcouple = s.F * (B.mid[1] - s.fy);
  const resid = Math.hypot(res.f[0] + s.F, res.f[1]);
  const residM = res.m + sol.M;

  const bA = panelBase(NA, HCLR, PANL, INSET);
  const bB = panelBase(NB, HCLR, PANL, INSET);
  const bC = panelBase(NC, HCLR, PANL, INSET);
  // wall A's single diagonal, corner to corner between the two supports
  const degA = (Math.atan2(HCLR, PANL - 2 * INSET) * 180) / Math.PI;
  const diagA = NA / Math.cos((degA * Math.PI) / 180);
  // wall C's X-brace, at the drawn 31.30°
  const degX = (Math.atan2(XBR_C.y1 - XBR_C.y0, XBR_C.x1 - XBR_C.x0) * 180) / Math.PI;
  const xN = NC / Math.cos((degX * Math.PI) / 180);
  const xChord = NC * Math.tan((degX * Math.PI) / 180);

  return { F: s.F, fy: s.fy, xboth: s.xboth, walls, A, B, C, sol, res, stab,
           lam: sol.lam, NA, NB, NC, spacing, Mcouple, resid, residM,
           coupA: bA.V, coupB: bB.V, coupC: bC.V, spanA: bA.span,
           degA, diagA, degX, xN, xChord };
}

// ------------------------------------------------------------------- view --

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  const px = mapper(PORG, SC.plan);
  const ev = (k) => mapper(EORG[k], SC.elev);
  const NAMES = ['A', 'B', 'C'];
  const OUTW = [[-1, 0], [0, 1], [1, 0]];

  dw.label('t_plan', '', { cls: 'title', flash: false });
  dw.label('t_elev', '', { cls: 'title', flash: false });
  dw.label('t_fd', '', { cls: 'title', flash: false });

  // ---- the plan
  dw.strokes('slab', 4, { intro: 1, w: dw.W.str, color: PAL.black });
  for (let i = 0; i < 3; i++) {
    dw.poly(`wall${i}`, 4, { intro: 1, color: PAL.black, opacity: 0.9 });
    dw.poly(`tri${i}`, 3, { intro: 1, color: PAL.black, opacity: 1 });
    dw.label(`lwall${i}`, NAMES[i], { cls: 'num', intro: 1, when: (st) => st.lbl });
    dw.dashLine(`axis${i}`, { intro: K_AXES, color: PAL.grey, dash: dw.W.dash,
      when: (st) => st.axes });
    dw.arrow(`rw${i}`, { intro: K_SOLVE, color: PAL.green, ...NARR });
    dw.label(`lrw${i}`, '', { cls: 'num', intro: K_SOLVE, color: PAL.green });
  }
  for (let i = 0; i < NAX; i++) {
    dw.disk(`cross${i}`, { intro: K_AXES, r: dw.W.disk * 0.75,
      when: (st, dd) => !!dd && st.axes && i < dd.stab.points.length });
  }
  dw.label('lstab', '', { cls: 'point', intro: K_AXES, flash: false, color: PAL.grey,
    when: (st) => st.axes });
  dw.dashLine('loa', { intro: K_LOAD, color: PAL.grey, dash: dw.W.dash });
  dw.arrow('fF', { intro: K_LOAD, color: PAL.green, ...ARR });
  dw.label('lfF', '', { cls: 'num', intro: K_LOAD, color: PAL.green });
  dw.seg('lever', { intro: K_LOAD, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('llever', '', { intro: K_LOAD, flash: false, color: PAL.grey });

  // ---- the force diagram: F, A, B, C tip to tail — a closed rectangle
  const FDN = ['F', 'A', 'B', 'C'];
  for (let i = 0; i < 4; i++) {
    dw.arrow(`fd${i}`, { intro: K_FD, color: PAL.green, ...NARR });
    dw.label(`lfd${i}`, '', { cls: 'num', intro: K_FD, color: PAL.green });
  }
  dw.label('lfdNote', '', { cls: 'point', intro: K_FD, flash: false, color: PAL.grey });
  dw.link('fF', 'fd0');
  dw.link('rw0', 'fd1', 'lrw0');
  dw.link('rw1', 'fd2', 'lrw1');
  dw.link('rw2', 'fd3', 'lrw2');

  // ---- the three wall elevations
  for (let k = 0; k < 3; k++) {
    dw.strokes(`pOut${k}`, 4, { intro: K_WALL, w: dw.W.str, color: PAL.black });
    dw.poly(`pSlab${k}`, 4, { intro: K_WALL, color: PAL.grey, opacity: 0.35, z: -0.2 });
    dw.strokes(`pSup${k}`, 10, { intro: K_WALL, w: dw.W.dim, color: PAL.grey, flash: false });
    dw.disk(`pPin${k}`, { intro: K_WALL, r: dw.W.disk * 0.7 });
    dw.arrow(`pH${k}`, { intro: K_WALL, color: PAL.green, ...NARR });
    dw.label(`lpH${k}`, '', { cls: 'num', intro: K_WALL, color: PAL.green });
    dw.arrow(`pV${k}a`, { intro: K_WALL, color: PAL.green, ...NARR });
    dw.arrow(`pV${k}b`, { intro: K_WALL, color: PAL.green, ...NARR });
    dw.label(`lpV${k}`, '', { cls: 'num', intro: K_WALL, color: PAL.green });
    dw.label(`lpan${k}`, '', { cls: 'point', intro: K_WALL, flash: false });
    // every panel gets the same three-element skeleton: a strut (possibly
    // kinked), a base tie and a vertical tie at the near support
    dw.strokes(`pStrut${k}`, 2, { intro: K_WALL, w: dw.W.bar, color: PAL.blue });
    dw.seg(`pTie${k}`, { intro: K_WALL, w: dw.W.bar, color: PAL.red });
    dw.seg(`pHang${k}`, { intro: K_WALL, w: dw.W.bar, color: PAL.red });
    dw.label(`lpN${k}`, '', { cls: 'num', intro: K_WALL, color: PAL.blue });
  }
  // wall B's door
  dw.strokes('bDoor', 3, { intro: K_WALL, w: dw.W.str, color: PAL.black });
  // wall C's X-brace replaces its strut/tie skeleton
  dw.seg('xTens', { intro: K_WALL, w: dw.W.bar, color: PAL.red });
  dw.seg('xComp', { intro: K_WALL, w: dw.W.bar,
    color: { pending: PAL.black, final: (dd) => (dd.xboth ? PAL.blue : PAL.zero) } });
  dw.strokes('xFrame', 4, { intro: K_WALL, w: dw.W.thin, color: PAL.grey });
  dw.label('lxT', '', { cls: 'num', intro: K_WALL, color: PAL.red });
  dw.label('lxC', '', { cls: 'num', intro: K_WALL,
    color: { pending: PAL.black, final: (dd) => (dd.xboth ? PAL.blue : PAL.zero) } });
  dw.label('lxSwap', '', { cls: 'point', intro: K_WALL, flash: false, color: PAL.orange });

  dw.instant('t_plan', 't_elev', 't_fd');
  dw.ghostable('fd0', 'fd1', 'fd2', 'fd3');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);

    dw.setLabel('t_plan', [PORG[0] + (SLW / 2) * SC.plan, 11.0]);
    dw.setText('t_plan', `Grundriss 1:200 — arrows here at 1 unit ≙ ${(1 / FARR).toFixed(0)} kN`);
    dw.setLabel('t_fd', [FDX, 1.0]);
    dw.setText('t_fd', `Kräfteplan — this page says 1 cm ≙ 20 kN`);
    dw.setLabel('t_elev', [14.0, -5.6]);
    dw.setText('t_elev', `Wandansichten 1:100 — the arrows are symbols, the numbers exact`);

    // ---- the plan
    const ring = slabRing(SLW, SLH).map(([x, y]) => px(x, y));
    dw.setStrokes('slab', ring.map((p, i) => [p, ring[(i + 1) % 4]]));
    const box = [0, 0, SLW, SLH];
    d.walls.forEach((w, i) => {
      dw.setPoly(`wall${i}`, w.ring.map(([x, y]) => px(x, y)));
      dw.setPoly(`tri${i}`, viewTriangle(V.add(w.mid, V.mul(OUTW[i], -1.15)),
        V.mul(OUTW[i], -1), 0.55).map(([x, y]) => px(x, y)));
      dw.setLabel(`lwall${i}`, px(w.mid[0] + (i === 1 ? 0 : (i === 0 ? -0.95 : 0.95)),
                                  w.mid[1] + (i === 1 ? -0.95 : 0)));
      const ax = axisSeg(w, box, 2.2);
      if (ax) dw.setDashLine(`axis${i}`, ax.map(([x, y]) => px(x, y)));
      const anchor = V.add(w.mid, V.mul(OUTW[i], ROFF));
      const tip = px(anchor[0], anchor[1]);
      const arrow = reactionArrow(w, d.lam[i], FARR / SC.plan, anchor);
      const tail = px(arrow[0][0], arrow[0][1]);
      const Lk = Math.abs(d.lam[i]) * FARR;
      if (Lk > 0.4) dw.setArrow(`rw${i}`, tail, tip);
      else dw.setArrow(`rw${i}`, tip, tip);
      dw.setLabel(`lrw${i}`, V.add(V.mid(tail, tip),
        i === 1 ? [0, 1.3] : [i === 0 ? -3.2 : 3.2, i === 0 ? -0.9 : 0]));
      dw.setText(`lrw${i}`, `${w.name} = ${Math.abs(d.lam[i]).toFixed(2)} kN`);
    });
    d.stab.points.forEach((p, i) => { if (i < NAX) dw.setDisk(`cross${i}`, px(p[0], p[1])); });
    for (let i = d.stab.points.length; i < NAX; i++) dw.setDisk(`cross${i}`, px(0, 0));
    dw.setLabel('lstab', [PORG[0] + (SLW / 2) * SC.plan, PORG[1] - 3.4]);
    dw.setText('lstab', d.stab.braced
      ? `${d.stab.points.length} distinct axis intersections → properly braced`
      : `NOT braced: ${d.stab.why}`);

    const loa = lineOfAction([0, d.fy], [1, 0], box, 3.0);
    dw.setDashLine('loa', loa.map(([x, y]) => px(x, y)));
    const fTip = px(0, d.fy);
    const fLen = Math.abs(d.F) * FARR;
    dw.setArrow('fF', [fTip[0] - Math.sign(d.F || 1) * fLen, fTip[1]], fTip);
    dw.setLabel('lfF', [fTip[0] - Math.sign(d.F || 1) * fLen * 0.5, fTip[1] + 1.3]);
    dw.setText('lfF', `F = ${d.F.toFixed(1)} kN`);
    // the lever arm between F's line and wall B's
    const lvx = px(-1.4, 0)[0];
    dw.setSeg('lever', [lvx, px(0, d.fy)[1]], [lvx, px(0, d.B.mid[1])[1]]);
    dw.setLabel('llever', [lvx - 3.0, (px(0, d.fy)[1] + px(0, d.B.mid[1])[1]) / 2]);
    dw.setText('llever', `${Math.abs(d.B.mid[1] - d.fy).toFixed(3)} m`);

    // ---- the force diagram: F → A → B → C, tip to tail
    const vecs = [[d.F, 0], V.mul(d.A.u, d.lam[0]), V.mul(d.B.u, d.lam[1]),
                  V.mul(d.C.u, d.lam[2])];
    const pts = [[0, 0]];
    vecs.forEach((v) => pts.push(V.add(pts[pts.length - 1], V.mul(v, FORCE20))));
    const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
    const off = V.sub([FDX, FDY], [(Math.min(...xs) + Math.max(...xs)) / 2,
                                   (Math.min(...ys) + Math.max(...ys)) / 2]);
    for (let i = 0; i < 4; i++) {
      const a = V.add(pts[i], off), b = V.add(pts[i + 1], off);
      dw.setArrow(`fd${i}`, a, b);
      const n = V.mul(V.unit(V.perp(V.sub(b, a))), i === 0 ? 1.5 : i === 2 ? 1.5 : 0);
      dw.setLabel(`lfd${i}`, V.add(V.add(V.mid(a, b), n),
        i === 1 ? [2.9, 0] : i === 3 ? [-2.9, 0] : [0, 0]));
      dw.setText(`lfd${i}`, `${FDN[i]} = ${Math.hypot(...vecs[i]).toFixed(2)}`);
    }
    dw.setLabel('lfdNote', [FDX, FDY - (Math.max(...ys) - Math.min(...ys)) / 2 - 3.2]);
    dw.setText('lfdNote', 'it closes as a rectangle — and would close just as well if A and C were wrong');

    // ---- the three wall elevations
    const share = [d.NA, d.NB, d.NC];
    const coup = [d.coupA, d.coupB, d.coupC];
    for (let k = 0; k < 3; k++) {
      const e = ev(k);
      const bx = [e(0, 0), e(PANL, 0), e(PANL, PANH), e(0, PANH)];
      dw.setStrokes(`pOut${k}`, bx.map((p, i) => [p, bx[(i + 1) % 4]]));
      dw.setPoly(`pSlab${k}`, [e(0, HCLR), e(PANL, HCLR), e(PANL, PANH), e(0, PANH)]);
      const sp = [];
      for (const x of [INSET, PANL - INSET]) {
        sp.push(...V.hatch([e(x, 0)[0] - 1.1, e(x, 0)[1] - 0.5],
          [e(x, 0)[0] + 1.1, e(x, 0)[1] - 0.5], -1, 0.75, 5));
      }
      dw.setStrokes(`pSup${k}`, sp);
      // the PIN: left on A and B, RIGHT on C — the sheet's own error E18
      dw.setDisk(`pPin${k}`, e(k === 2 ? PANL - INSET : INSET, 0));
      // arrows drawn ON a form diagram are symbols, not measurements: the
      // magnitude is written beside them
      const Hk = 2.4;
      dw.setArrow(`pH${k}`, [e(0, HCLR)[0] - Hk, e(0, HCLR)[1] + 0.7],
                            [e(0, HCLR)[0], e(0, HCLR)[1] + 0.7]);
      dw.setLabel(`lpH${k}`, [e(0, 0)[0] - Hk * 0.5, e(0, HCLR)[1] + 1.8]);
      dw.setText(`lpH${k}`, `${share[k].toFixed(2)} kN`);
      const Vk = 1.8;
      if (Vk > 0.3) {
        dw.setArrow(`pV${k}a`, [e(INSET, 0)[0], e(INSET, 0)[1] - 1.1 - Vk],
                               [e(INSET, 0)[0], e(INSET, 0)[1] - 1.1]);
        dw.setArrow(`pV${k}b`, [e(PANL - INSET, 0)[0], e(PANL - INSET, 0)[1] - 1.1],
                               [e(PANL - INSET, 0)[0], e(PANL - INSET, 0)[1] - 1.1 - Vk]);
      } else {
        for (const t of ['a', 'b']) dw.setArrow(`pV${k}${t}`, e(PANL / 2, 0), e(PANL / 2, 0));
      }
      dw.setLabel(`lpV${k}`, [e(PANL / 2, 0)[0], e(0, 0)[1] - 2.4 - Vk]);
      dw.setText(`lpV${k}`, `base couple ±${coup[k].toFixed(2)} kN`);
      dw.setLabel(`lpan${k}`, [e(PANL / 2, 0)[0], e(0, PANH)[1] + 3.0]);
      dw.setText(`lpan${k}`, ['wall A — plain panel', 'wall B — door opening',
                              'wall C — X-braced'][k]);

      // the internal skeleton. A: one straight strut. B: kinked over the door.
      // C: replaced by the X-brace below, so its skeleton is parked.
      const eK = e;
      if (k === 2) {
        for (const nm of [`pStrut${k}`]) dw.setStrokes(nm, [[eK(0, 0), eK(0, 0)], [eK(0, 0), eK(0, 0)]]);
        dw.setSeg(`pTie${k}`, eK(INSET, 0), eK(PANL - INSET, 0));
        dw.setSeg(`pHang${k}`, eK(0, 0), eK(0, 0));
        dw.setLabel(`lpN${k}`, eK(0, -99));
        dw.setText(`lpN${k}`, '');
      } else {
        const top = [INSET, HCLR], foot = [PANL - INSET, 0];
        let kink = V.mid(top, foot);
        if (k === 1) kink = [(DOOR_B.x0 + DOOR_B.x1) / 2, DOOR_B.h + 0.30];
        dw.setStrokes(`pStrut${k}`, [[eK(...top), eK(...kink)], [eK(...kink), eK(...foot)]]);
        dw.setSeg(`pTie${k}`, eK(INSET, 0), eK(PANL - INSET, 0));
        dw.setSeg(`pHang${k}`, eK(INSET, 0), eK(INSET, HCLR));
        dw.setLabel(`lpN${k}`, V.add(eK(kink[0], kink[1]), [2.4, 1.2]));
        dw.setText(`lpN${k}`, k === 0 ? `${d.diagA.toFixed(1)}` : 'over the door');
      }
    }
    // wall B's door
    const eB = ev(1);
    dw.setStrokes('bDoor', [
      [eB(DOOR_B.x0, 0), eB(DOOR_B.x0, DOOR_B.h)],
      [eB(DOOR_B.x0, DOOR_B.h), eB(DOOR_B.x1, DOOR_B.h)],
      [eB(DOOR_B.x1, DOOR_B.h), eB(DOOR_B.x1, 0)]]);
    // wall C's X-brace
    const eC = ev(2);
    const fr = [eC(XBR_C.x0, XBR_C.y0), eC(XBR_C.x1, XBR_C.y0),
                eC(XBR_C.x1, XBR_C.y1), eC(XBR_C.x0, XBR_C.y1)];
    dw.setStrokes('xFrame', fr.map((p, i) => [p, fr[(i + 1) % 4]]));
    dw.setSeg('xTens', eC(XBR_C.x0, XBR_C.y0), eC(XBR_C.x1, XBR_C.y1));
    dw.setSeg('xComp', eC(XBR_C.x0, XBR_C.y1), eC(XBR_C.x1, XBR_C.y0));
    dw.setLabel('lxT', eC(XBR_C.x0 + 1.05, XBR_C.y0 + 0.30));
    dw.setText('lxT', `${(d.xboth ? d.xN / 2 : d.xN).toFixed(1)}`);
    dw.setLabel('lxC', eC(XBR_C.x0 + 1.05, XBR_C.y1 - 0.30));
    dw.setText('lxC', d.xboth ? `${(d.xN / 2).toFixed(1)}` : '0 — slack');
    dw.setLabel('lxSwap', [14.0, -21.2]);
    dw.setText('lxSwap', 'E18: this panel’s supports are swapped — roller left, pin right');

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const g = panel.section('Given');
  panel.slider(g, s, 'F', 'F (kN)', -150, 150, 5, refresh,
    (v) => `${v} kN ${v > 0 ? '→' : v < 0 ? '←' : ''}`);
  panel.slider(g, s, 'fy', 'where F enters the left edge (m)', 0, 12, 0.25, refresh,
    (v) => `y = ${v.toFixed(2)} m${Math.abs(v - 11.795) < 0.3 ? ' — level with wall B' : ''}`);
  const w = panel.section('What to look at');
  panel.toggle(w, s, 'xboth', 'wall C: let BOTH diagonals act (else tension-only)', refresh);
  panel.toggle(w, s, 'axes', 'show the wall axes and their intersections', refresh);
  panel.toggle(w, s, 'lbl', 'show labels', refresh);

  refresh();
  return player;
}
