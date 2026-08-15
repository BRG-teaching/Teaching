/**
 * EX X · Aufgabe 14 — Additional Horizontal Forces (quantitatively), layout 1
 * Structural Design II, FS 23, sheet "EX X — Additional Exercises", page 12.
 *
 * NUMBERING. The English sheet calls this "Task 1" — one of three blocks with
 * that label. German: Aufgabe 14, used here (error E1). The German also splits
 * it into a) the force flow in the plate + its force diagram and b) the force
 * flow in the walls; the English runs the two together in one paragraph.
 *
 * TEXT (verbatim, English). "Analyse the force flow within the ceiling due to
 * an applied horizontal force. The walls are used for bracing, therefore find
 * the internal force flow in the plate such as it can be redirected into the
 * ground through the walls. Draw the corresponding force diagram if F = 100 kN.
 * Then find a possible internal force flow in the walls A, B and C. First draw
 * the applied horizontal force for each wall into the corresponding form
 * diagram. Use red for tension, blue for compression and green for the external
 * forces."
 *
 * GIVEN. F = 100 kN horizontal. Top view 1:200; the three wall elevations
 * 1:100; force diagrams 1 cm ≙ 10 kN.
 *
 * GEOMETRY — top view, 1:200, origin = bottom-left corner of the ceiling slab.
 *   ceiling slab            x 0 … 15.995   y 0 … 11.995
 *   core / void (dashed X)  x 0.400 … 8.597   y 1.499 … 8.496
 *   wall A  (runs in x)     x 0 … 4.998    y 11.595 … 11.995  (CL 11.795)
 *   wall C  (runs in x)     x 0 … 4.998    y 0 … 0.400        (CL  0.200)
 *   wall B  (runs in y)     x 8.597 … 8.997 (CL 8.797)  y 3.498 … 8.496
 *   F, pointing +x          applied at the left edge, x = 0, y = 9.996
 * All three walls are 4.998 m long and 0.400 m thick. The little solid
 * triangles in the plan are POINTERS to the walls, not reaction-direction
 * symbols — each sits perpendicular to and points at its own wall.
 *
 * THE RULE (compendium 10.1, verbatim): "Since walls can only absorb forces
 * along their axis, the possible lines of action of the walls and thus their
 * points of intersection are drawn into the slab first. If more than one
 * intersection is found, the system is properly braced." A wall in plan is
 * therefore ONE force with ONE known line of action and one unknown magnitude;
 * three walls give three unknowns against the three equilibrium equations of a
 * rigid body in plane, so the slab is statically determinate and no stiffness
 * is needed. Here A and C are parallel and B crosses both, giving two distinct
 * intersection points — braced.
 *
 * a) ANSWERS — the plate. A wall braces only in its own plane, so A and C take
 *    force along x and B along y:
 *      ΣFx :  A + C = 100 kN
 *      ΣFy :  B = 0                     (F has no y component, and B is the
 *                                        only y support)
 *      ΣM about the slab origin :  11.795 A + 0.200 C = 100 × 9.996 = 999.6 kNm
 *    Solving: 11.795 A + 0.200 (100 − A) = 999.6 → 11.595 A = 979.6 →
 *      wall A = 84.48 kN   wall C = 15.52 kN   wall B = 0
 *    all acting along their own wall, opposing F.
 *    Independent check: A + C = 100.00 kN; re-substituting the moments,
 *    11.795 × 84.48 + 0.200 × 15.52 = 996.46 + 3.10 = 999.56 against 999.60 kNm.
 *    If instead the wall lines are idealised to the slab edges (y = 12.0 and
 *    y = 0, F at y = 10.0) the split becomes exactly A = 83.33, C = 16.67 kN —
 *    both are quoted, because the difference is drawing precision, not physics.
 *
 *    WALL B CARRIES NOTHING (error E19). That is a real result, not an
 *    omission: F is exactly parallel to walls A and C, so ΣFy forces B to zero
 *    for ANY position of F along the left edge. The task nevertheless asks for
 *    an internal force flow in wall B and provides a parabolic arch in its form
 *    diagram; the correct answer is "nothing", and the arch is there for
 *    stability under other load cases, not for this one.
 *
 * GEOMETRY — wall elevations, 1:100, origin = bottom-left corner of each panel.
 * All three panels 4.998 m long × 2.999 m high, of which the top 0.400 m is the
 * ceiling slab, so the clear wall height — and the lever arm of the applied
 * force — is 2.599 m. Supports in every elevation: pin at x = 0.200, roller at
 * x = 4.798.
 *   wall A  a braced frame: a diagonal from (0.200, 0) to (4.470, 2.599),
 *           length 4.999 m at 31.30°, plus a 0.400 m wide vertical member
 *           (x = 4.598 … 4.998) running the full 2.599 m
 *   wall B  an arch springing from (0.400, 0) and (4.598, 0) to an apex at
 *           (2.499, 2.499) — span 4.198 m, rise 2.499 m. A true parabola: the
 *           quarter-point rise measures 1.874 m against the parabolic 1.874 m,
 *           exact to 0.1 mm on paper
 *   wall C  a solid panel with a circular opening ⌀ 1.5995 m centred at
 *           (2.499, 1.400) — exactly mid-length, 1.400 m above the base,
 *           occupying x 1.700 … 3.299 and y 0.600 … 2.199
 *
 * b) ANSWERS — the walls.
 *   Wall A, 84.48 kN entering at the top:
 *     diagonal      N = 84.48 / cos 31.30° = 98.90 kN
 *     vertical post N = 84.48 × tan 31.30° = 51.34 kN, opposite in sign
 *     support couple ±51.34 kN vertical, plus 84.48 kN horizontal at the pin
 *   Check: overturning 84.48 × 2.599 = 219.6 kNm over the 4.398 m between the
 *   diagonal's foot and the post's foot gives 49.9 kN — the 3 % gap against
 *   51.34 kN is because the drawn diagonal head (x = 4.470) and the post
 *   (x = 4.598) do not quite meet. Use 51.3 kN.
 *   Sense: with F pushing the slab in +x the diagonal is a TIE and the post a
 *   STRUT; reverse F and the two swap.
 *   Wall C, 15.52 kN entering at the top: overturning 15.52 × 2.599 =
 *   40.34 kNm over the 4.598 m base → vertical couple ±8.77 kN; horizontal
 *   15.52 kN at the base. The force path has to detour round the circular
 *   opening — that part is qualitative.
 *   Wall B: all member forces zero.
 *
 * The sheet prints no answers. Everything above is derived, and the plate
 * solution was reproduced twice: once by hand from the three equilibrium
 * equations and once through lib/plan.js's 3 × 3 solve, agreeing exactly.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';
import { pageScales, mapper, slabRing, makeWall, axisSeg, lineOfAction,
         stability, solvePlan, wallResultant, panelBase, viewTriangle,
         reactionArrow } from '../lib/plan.js';

// -------------------------------------------------------------- the model --

const SLW = 15.995, SLH = 11.995;
const VOID = [[0.400, 1.499], [8.597, 1.499], [8.597, 8.496], [0.400, 8.496]];
const WT = 0.400, WL = 4.998;
const PANL = 4.998, PANH = 2.999, SLABT = 0.400;
const HCLR = PANH - SLABT;             // 2.599 m — the lever arm
const INSET = 0.200;                   // pin / roller inset in each elevation
const DIAG_A = [[0.200, 0], [4.470, 2.599]];
const POST_A = [4.798, 0.400];         // post centreline x, width
const ARCH_B = { a: [0.400, 0], b: [4.598, 0], apex: [2.499, 2.499] };
const HOLE_C = { c: [2.499, 1.400], r: 1.5995 / 2 };

const NAX = 3, NARCH = 10, NCIRC = 32;

// ---------------------------------------------------------------- layout --

// one printed centimetre = 1.5 drawing units, which locks the plan (1:200),
// the wall elevations (1:100) and the force scale (1 cm ≙ 10 kN) to each other
// exactly as the page locks them — so a 100 kN arrow really is longer than the
// 16 m slab drawn beside it
const SC = pageScales(1.5);
const PORG = [11.0, -1.6];              // the 1:200 plan
const EORG = [[3.6, -15.6], [12.6, -15.6], [21.6, -15.6]];  // the 1:100 walls
// Arrows drawn ON a form diagram are symbols, not measurements: at the sheet's
// own 1 cm ≙ 10 kN a 100 kN arrow is longer than the 16 m slab beside it. The
// FORCE DIAGRAM keeps that true scale; the plan and the elevations use FARR,
// and both scales are printed on the drawing.
const FARR = 0.05;                      // units per kN on the form diagrams
const FDX = -14.0, FDY = -0.6;          // the plate's force diagram
const ROFF = 1.7;                       // reactions drawn this far outside the slab

const DEFAULTS = { F: 100, fy: 9.996, edge: false, axes: true, lbl: true, _k: 99 };

const K_AXES = 2, K_LOAD = 3, K_SOLVE = 4, K_FD = 5, K_WALL = 6, K_ZERO = 7;

export const meta = {
  title: 'EX X · 14 — three walls, and one of them does nothing',
  subtitle: 'Structural Design II · “EX X — Additional Exercises”, p. 12 · German Aufgabe 14 (the English sheet calls it “Task 1”)',
  about: 'A ceiling slab pushed sideways with 100 kN, and three shear walls to get that force into the ground. The trick of the whole chapter is that a wall in plan is not a stiff object — it is ONE force on ONE line of action, its own centreline, with one unknown size. Three walls, three unknowns, three equations of plane equilibrium, and the slab is determinate: no stiffnesses, no distribution factors, just ΣFx, ΣFy and ΣM. Here that machinery produces a result the task does not seem to expect. Wall B runs across the load, so ΣFy makes it exactly zero — and it stays zero wherever you slide the force. The sheet still asks for a force flow inside it, and the honest answer is "nothing".',
  result: (d) => [
    `F = ${d.F.toFixed(1)} kN horizontal at y = ${d.fy.toFixed(3)} m${d.edge ? ' — walls idealised to the slab edges (y = 12.0 and 0)' : ' — walls on their digitised centrelines (y = 11.795 and 0.200)'}`,
    `ΣFx: A + C = ${d.F.toFixed(2)} · ΣFy: B = ${Math.abs(d.NB).toFixed(2)} · ΣM about the origin: ${d.yA.toFixed(3)} A + ${d.yC.toFixed(3)} C = ${d.F.toFixed(1)} × ${d.fy.toFixed(3)} = ${d.Mload.toFixed(2)} kNm`,
    `wall A = ${d.NA.toFixed(2)} kN · wall C = ${d.NC.toFixed(2)} kN · wall B = ${Math.abs(d.NB).toFixed(2)} kN — all along their own axis, A and C opposing F`,
    `A's braced frame: diagonal ${d.diagN.toFixed(2)} kN at ${d.diagDeg.toFixed(2)}°, post ${d.postN.toFixed(2)} kN, base couple ±${d.coupA.toFixed(2)} kN · C: base couple ±${d.coupC.toFixed(2)} kN, path detouring round the ⌀1.60 m opening`,
    `wall B carries NOTHING, for any position of F: it is perpendicular to the load, and ΣFy has only one term in it — braced by ${d.stab.points.length} distinct axis intersections, residual ${d.resid.toExponential(1)} kN`],
  frame: [[-26, -22], [30, 16]],
};

const STEPS = [
  { t: 'The exercise', d: 'EX X page 12, German Aufgabe 14. A ceiling slab, a 100 kN horizontal shove, and three walls to take it down. The German splits this into a) the plate and b) the walls; the English runs them together',
    detail: () => ['top view 1:200 · the three wall elevations 1:100 · force diagrams 1 cm ≙ 10 kN',
                   'all three walls are 4.998 m long and 0.400 m thick',
                   'the little solid triangles in the plan point AT their wall — they are not reaction symbols'],
    take: 'a horizontal force on a building is not carried by the floor. It is carried by whatever is standing in its plane' },
  { t: 'The plan', d: 'right: the slab seen from above, with the core void dashed and the three walls in place. A and C run east–west along the short left-hand edge; B runs north–south, in the middle',
    detail: () => [`slab ${SLW.toFixed(3)} × ${SLH.toFixed(3)} m · void ${(VOID[1][0] - VOID[0][0]).toFixed(3)} × ${(VOID[2][1] - VOID[0][1]).toFixed(3)} m`,
                   `wall A centreline y = 11.795 · wall C centreline y = 0.200 · wall B centreline x = 8.797`,
                   'each wall spans 4.998 m'] },
  { t: 'Draw the axes first', d: 'the compendium is blunt about it: “since walls can only absorb forces along their axis, the possible lines of action of the walls and thus their points of intersection are drawn into the slab first. If more than one intersection is found, the system is properly braced.” So extend all three centrelines right across the plan',
    detail: (d) => [`A and C are parallel — they never meet`,
                    `B crosses each of them: ${d.stab.points.length} distinct intersection points`,
                    d.stab.braced ? 'more than one → properly braced ✓' : `NOT braced — ${d.stab.why}`],
    take: 'three axes fail only when they are all parallel or all through one point. Everything else works' },
  { t: 'The load', d: 'green: F, on its own line of action, entering the left edge. Slide it up and down in the panel — that is the one control, and what it does to the three walls is the lesson',
    detail: (d) => [`F = ${d.F.toFixed(1)} kN, pointing +x, at y = ${d.fy.toFixed(3)} m`,
                    `moment about the slab origin: ${d.F.toFixed(1)} × ${d.fy.toFixed(3)} = ${d.Mload.toFixed(2)} kNm`,
                    'the line of action, not the point, is what the moment depends on'] },
  { t: 'Three equations, three walls', d: 'and now it is arithmetic. Each wall is one unknown along its own axis. Sum the forces across, sum them up the page, and take moments about a corner — the third equation is the one that splits A from C',
    detail: (d) => [`ΣFx: A + C = ${d.F.toFixed(2)} kN`,
                    `ΣFy: B = ${Math.abs(d.NB).toFixed(3)} kN — nothing else can resist in y, so it must be zero`,
                    `ΣM: ${d.yA.toFixed(3)} A + ${d.yC.toFixed(3)} C = ${d.Mload.toFixed(2)} → A = ${d.NA.toFixed(2)}, C = ${d.NC.toFixed(2)} kN`],
    take: `A takes ${(0).toFixed(0)}… look at the lever arms: A is 11.795 m from the origin and C only 0.200, so A does almost all the work` },
  { t: 'The force diagram', d: 'left: F laid off, and the wall reactions closing it. Every force here is horizontal, so the diagram is a straight line — that is not a failure of the drawing, it is the statement that this load case has no y component anywhere in it',
    detail: (d) => [`F = ${d.F.toFixed(2)} → A = ${d.NA.toFixed(2)} + C = ${d.NC.toFixed(2)} = ${(d.NA + d.NC).toFixed(2)} kN ✓`,
                    `residual force ${d.resid.toExponential(1)} kN · residual moment ${d.residM.toExponential(1)} kNm`,
                    `at the sheet's 1 cm ≙ 10 kN, F is 10 cm long — wider than the 16 m slab drawn at 1:200 beside it`],
    take: 'a closing force polygon proves ΣF = 0 and says nothing about ΣM. The moment check is separate, and it is the one that found A and C' },
  { t: 'Inside walls A and C', d: 'bottom: the walls unfolded into elevation. Each receives its own share at slab level, 2.599 m above the base, and has to get it down: A through a diagonal and a post, C through a solid panel with a 1.6 m hole in the middle of it',
    detail: (d) => [`A: diagonal ${d.diagN.toFixed(2)} kN at ${d.diagDeg.toFixed(2)}° — a TIE with F this way round · post ${d.postN.toFixed(2)} kN, a strut`,
                    `A's base: ±${d.coupA.toFixed(2)} kN vertical couple over ${d.spanA.toFixed(3)} m, plus ${d.NA.toFixed(2)} kN horizontal at the pin`,
                    `C: overturning ${(d.NC * HCLR).toFixed(2)} kNm over ${d.spanC.toFixed(3)} m → ±${d.coupC.toFixed(2)} kN, and the path must go round the opening`],
    take: 'reverse F and the diagonal becomes a strut and the post a tie. A single-diagonal brace only works one way round, which is why real ones come in pairs' },
  { t: 'And wall B does nothing', d: 'the punch line. F is exactly parallel to A and C, so the only equation B appears in is ΣFy — and there is nothing on the other side of it. B is zero. Slide F anywhere along that edge and it stays zero',
    detail: (d) => [`B = ${Math.abs(d.NB).toExponential(1)} kN, for every position of F`,
                    'the sheet still asks for “a possible internal force flow in the walls A, B and C”',
                    'the honest answer for B is: none. Its parabolic arch is there for other load cases'],
    take: 'a wall perpendicular to the load does not brace it. It is still needed — turn the wind 90° and B is the only thing holding the building up' },
];

// ------------------------------------------------------------------ maths --

function compute(s) {
  // the three wall centrelines, either digitised or idealised to the edges
  const yA = s.edge ? SLH : 11.795;
  const yC = s.edge ? 0 : 0.200;
  const fy = s.edge ? 10.0 : s.fy;
  const A = makeWall('A', [0, yA], [WL, yA], WT);
  const C = makeWall('C', [0, yC], [WL, yC], WT);
  const B = makeWall('B', [8.797, 3.498], [8.797, 8.496], WT);
  const walls = [A, B, C];

  const loads = [{ at: [0, fy], f: [s.F, 0] }];
  const sol = solvePlan(walls, loads);
  const res = wallResultant(walls, sol.lam);
  const stab = stability(walls);

  // lam is the force each wall applies TO the slab, along its own +u; the
  // magnitude a student writes down is |lam|
  const NA = Math.abs(sol.lam[0]), NB = Math.abs(sol.lam[1]), NC = Math.abs(sol.lam[2]);
  const Mload = s.F * fy;
  const resid = Math.hypot(res.f[0] + s.F, res.f[1]);
  const residM = res.m + sol.M;

  // wall A's braced frame
  const dvec = V.sub(DIAG_A[1], DIAG_A[0]);
  const diagDeg = (Math.atan2(dvec[1], dvec[0]) * 180) / Math.PI;
  const diagN = NA / Math.cos((diagDeg * Math.PI) / 180);
  const postN = NA * Math.tan((diagDeg * Math.PI) / 180);
  const bA = panelBase(NA, HCLR, PANL, INSET);
  const bC = panelBase(NC, HCLR, PANL, INSET);

  return { F: s.F, fy, edge: s.edge, yA, yC, walls, A, B, C, sol, res, stab,
           NA, NB, NC, lam: sol.lam, Mload, resid, residM,
           diagDeg, diagN, postN,
           coupA: bA.V, spanA: bA.span, coupC: bC.V, spanC: bC.span };
}

// ------------------------------------------------------------------- view --

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  const px = mapper(PORG, SC.plan);
  const ev = (k) => mapper(EORG[k], SC.elev);

  const WCOL = ['A', 'B', 'C'];

  dw.label('t_plan', '', { cls: 'title', flash: false });
  dw.label('t_elev', '', { cls: 'title', flash: false });
  dw.label('t_fd', '', { cls: 'title', flash: false });

  // ---- the plan
  dw.strokes('slab', 4, { intro: 1, w: dw.W.str, color: PAL.black });
  dw.dashLine('void', { intro: 1, color: PAL.grey, dash: dw.W.dash });
  for (let i = 0; i < 3; i++) {
    dw.poly(`wall${i}`, 4, { intro: 1, color: PAL.black, opacity: 0.9 });
    dw.poly(`tri${i}`, 3, { intro: 1, color: PAL.black, opacity: 1 });
    dw.label(`lwall${i}`, WCOL[i], { cls: 'num', intro: 1, when: (st) => st.lbl });
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

  // ---- the plate's force diagram
  dw.arrow('fdF', { intro: K_FD, color: PAL.green, ...ARR });
  dw.arrow('fdA', { intro: K_FD, color: PAL.green, ...NARR });
  dw.arrow('fdC', { intro: K_FD, color: PAL.green, ...NARR });
  dw.label('lfdF', '', { cls: 'num', intro: K_FD, color: PAL.green });
  dw.label('lfdA', '', { cls: 'num', intro: K_FD, color: PAL.green });
  dw.label('lfdC', '', { cls: 'num', intro: K_FD, color: PAL.green });
  dw.label('lfdB', '', { cls: 'point', intro: K_FD, flash: false, color: PAL.zero });
  dw.link('rw0', 'fdA', 'lrw0');
  dw.link('rw2', 'fdC', 'lrw2');
  dw.link('fF', 'fdF');

  // ---- the three wall elevations
  for (let k = 0; k < 3; k++) {
    dw.strokes(`pOut${k}`, 4, { intro: K_WALL, w: dw.W.str, color: PAL.black });
    dw.poly(`pSlab${k}`, 4, { intro: K_WALL, color: PAL.grey, opacity: 0.35, z: -0.2 });
    dw.strokes(`pSup${k}`, 10, { intro: K_WALL, w: dw.W.dim, color: PAL.grey, flash: false });
    dw.arrow(`pH${k}`, { intro: K_WALL, color: PAL.green, ...NARR });
    dw.label(`lpH${k}`, '', { cls: 'num', intro: K_WALL, color: PAL.green });
    dw.arrow(`pV${k}a`, { intro: K_WALL, color: PAL.green, ...NARR });
    dw.arrow(`pV${k}b`, { intro: K_WALL, color: PAL.green, ...NARR });
    dw.label(`lpV${k}`, '', { cls: 'num', intro: K_WALL, color: PAL.green });
    dw.label(`lpan${k}`, '', { cls: 'point', intro: K_WALL, flash: false });
  }
  // wall A: the diagonal and the post
  dw.seg('aDiag', { intro: K_WALL, w: dw.W.bar,
    color: { pending: PAL.black, final: (dd) => (dd.diagIsTie ? PAL.red : PAL.blue) } });
  dw.seg('aPost', { intro: K_WALL, w: dw.W.bar,
    color: { pending: PAL.black, final: (dd) => (dd.diagIsTie ? PAL.blue : PAL.red) } });
  dw.label('laDiag', '', { cls: 'num', intro: K_WALL,
    color: { pending: PAL.black, final: (dd) => (dd.diagIsTie ? PAL.red : PAL.blue) } });
  dw.label('laPost', '', { cls: 'num', intro: K_WALL,
    color: { pending: PAL.black, final: (dd) => (dd.diagIsTie ? PAL.blue : PAL.red) } });
  // wall B: the parabola, drawn in the "asleep" grey of a zero-force member
  dw.strokes('bArch', NARCH, { intro: K_WALL, w: dw.W.bar,
    color: { pending: PAL.black, final: () => PAL.zero } });
  dw.label('lbZero', '', { cls: 'num', intro: K_ZERO, color: PAL.zero });
  // wall C: the opening, and a path that goes round it
  dw.circle('cHole', { intro: K_WALL, color: PAL.black });
  dw.strokes('cStrut', 2, { intro: K_WALL, w: dw.W.bar, color: PAL.blue });
  dw.seg('cTie', { intro: K_WALL, w: dw.W.bar, color: PAL.red });
  dw.seg('cHang', { intro: K_WALL, w: dw.W.bar, color: PAL.red });
  dw.label('lcPath', '', { cls: 'num', intro: K_WALL, color: PAL.grey });

  dw.instant('t_plan', 't_elev', 't_fd');
  dw.ghostable('fdF', 'fdA', 'fdC');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    d.diagIsTie = d.F >= 0;

    dw.setLabel('t_plan', [PORG[0] + (SLW / 2) * SC.plan, 11.0]);
    dw.setText('t_plan', `Grundriss 1:200 — arrows here at 1 unit ≙ ${(1 / FARR).toFixed(0)} kN`);
    dw.setLabel('t_fd', [FDX, 1.2]);
    dw.setText('t_fd', `Kräfteplan — the sheet's own 1 cm ≙ 10 kN (${SC.force.toFixed(2)} units/kN)`);
    dw.setLabel('t_elev', [14.0, -5.6]);
    dw.setText('t_elev', `Wandansichten 1:100 — the arrows are symbols, the numbers exact`);

    // ---- the plan
    const ring = slabRing(SLW, SLH).map(([x, y]) => px(x, y));
    dw.setStrokes('slab', ring.map((p, i) => [p, ring[(i + 1) % 4]]));
    const vd = VOID.map(([x, y]) => px(x, y));
    dw.setDashLine('void', [...vd, vd[0]]);

    const box = [0, 0, SLW, SLH];
    d.walls.forEach((w, i) => {
      dw.setPoly(`wall${i}`, w.ring.map(([x, y]) => px(x, y)));
      const nrm = i === 1 ? [-1, 0] : [0, i === 0 ? -1 : 1];
      dw.setPoly(`tri${i}`, viewTriangle(V.add(w.mid, V.mul(nrm, -1.15)),
        V.mul(nrm, -1), 0.55).map(([x, y]) => px(x, y)));
      dw.setLabel(`lwall${i}`, px(w.mid[0] + (i === 1 ? 0.9 : 0),
                                  w.mid[1] + (i === 1 ? 3.2 : (i === 0 ? -0.95 : 0.95))));
      const ax = axisSeg(w, box, 2.2);
      if (ax) dw.setDashLine(`axis${i}`, ax.map(([x, y]) => px(x, y)));
      // The reaction acts along the wall's own axis. Drawn ON the axis it would
      // lie across the slab and hide it, so it is stepped OUTSIDE on a parallel
      // line — the way the sheets draw a support force in plan.
      const outw = [[0, 1], [-1, 0], [0, -1]][i];        // away from the slab
      const anchor = V.add(w.mid, V.mul(outw, ROFF));
      const tip = px(anchor[0], anchor[1]);
      const arrow = reactionArrow(w, d.lam[i], FARR / SC.plan, anchor);
      const tail = px(arrow[0][0], arrow[0][1]);
      const Lk = Math.abs(d.lam[i]) * FARR;
      if (Lk > 0.4) dw.setArrow(`rw${i}`, tail, tip);
      else dw.setArrow(`rw${i}`, tip, tip);
      dw.setLabel(`lrw${i}`, V.add(V.mid(tail, tip), i === 1 ? [2.8, 0] : [0, i === 0 ? 1.3 : -1.3]));
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

    // ---- the plate's force diagram: everything is horizontal, so it is a line
    const p0 = [FDX - (d.F * SC.force) / 2, FDY];
    const p1 = [p0[0] + d.F * SC.force, FDY];
    dw.setArrow('fdF', p0, p1);
    dw.setLabel('lfdF', V.add(V.mid(p0, p1), [0, 1.4]));
    dw.setText('lfdF', `F = ${d.F.toFixed(2)}`);
    const q1 = [p1[0] + d.lam[0] * SC.force, FDY - 2.2];
    dw.setArrow('fdA', [p1[0], FDY - 2.2], q1);
    dw.setLabel('lfdA', V.add(V.mid([p1[0], FDY - 2.2], q1), [0, -1.4]));
    dw.setText('lfdA', `A = ${Math.abs(d.lam[0]).toFixed(2)}`);
    const q2 = [q1[0] + d.lam[2] * SC.force, FDY - 4.4];
    dw.setArrow('fdC', [q1[0], FDY - 4.4], q2);
    dw.setLabel('lfdC', V.add(V.mid([q1[0], FDY - 4.4], q2), [0, -1.4]));
    dw.setText('lfdC', `C = ${Math.abs(d.lam[2]).toFixed(2)}`);
    dw.setLabel('lfdB', [FDX, FDY - 7.4]);
    dw.setText('lfdB', `B = ${Math.abs(d.NB).toFixed(2)} kN — a point, not a line`);

    // ---- the three wall elevations
    const share = [d.NA, d.NB, d.NC];
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
      // the slab force entering at the top
      // arrows drawn ON a form diagram are symbols, not measurements: the
      // magnitude is written beside them. Wall B's is a stub, because it is 0.
      const Hk = share[k] > 1e-6 ? 2.4 : 0.9;
      dw.setArrow(`pH${k}`, [e(0, HCLR)[0] - Hk, e(0, HCLR)[1] + 0.7],
                            [e(0, HCLR)[0], e(0, HCLR)[1] + 0.7]);
      dw.setLabel(`lpH${k}`, [e(0, 0)[0] - Hk * 0.5, e(0, HCLR)[1] + 1.8]);
      dw.setText(`lpH${k}`, `${share[k].toFixed(2)} kN`);
      // the base couple
      const coup = [d.coupA, 0, d.coupC][k];
      const Vk = coup > 1e-6 ? 1.8 : 0;
      if (Vk > 0.3) {
        dw.setArrow(`pV${k}a`, [e(INSET, 0)[0], e(INSET, 0)[1] - 1.1 - Vk],
                               [e(INSET, 0)[0], e(INSET, 0)[1] - 1.1]);
        dw.setArrow(`pV${k}b`, [e(PANL - INSET, 0)[0], e(PANL - INSET, 0)[1] - 1.1],
                               [e(PANL - INSET, 0)[0], e(PANL - INSET, 0)[1] - 1.1 - Vk]);
      } else {
        for (const t of ['a', 'b']) dw.setArrow(`pV${k}${t}`, e(PANL / 2, 0), e(PANL / 2, 0));
      }
      dw.setLabel(`lpV${k}`, [e(PANL / 2, 0)[0], e(0, 0)[1] - 2.4 - Vk]);
      dw.setText(`lpV${k}`, coup > 1e-6 ? `base couple ±${coup.toFixed(2)} kN` : 'no base couple');
      dw.setLabel(`lpan${k}`, [e(PANL / 2, 0)[0], e(0, PANH)[1] + 3.0]);
      dw.setText(`lpan${k}`, ['wall A — braced frame', 'wall B — arch',
                              'wall C — panel with a hole'][k]);
    }
    // wall A's diagonal and post
    const eA = ev(0);
    dw.setSeg('aDiag', eA(...DIAG_A[0]), eA(...DIAG_A[1]));
    dw.setSeg('aPost', eA(POST_A[0], 0), eA(POST_A[0], HCLR));
    dw.setLabel('laDiag', V.add(V.mid(eA(...DIAG_A[0]), eA(...DIAG_A[1])), [-2.2, 1.0]));
    dw.setText('laDiag', `${d.diagN.toFixed(1)}`);
    dw.setLabel('laPost', V.add(eA(POST_A[0], HCLR / 2), [-2.2, 0]));
    dw.setText('laPost', `${d.postN.toFixed(1)}`);
    // wall B's parabola
    const eB = ev(1);
    const ab = [];
    for (let i = 0; i <= NARCH; i++) {
      const t = i / NARCH;
      const x = ARCH_B.a[0] + (ARCH_B.b[0] - ARCH_B.a[0]) * t;
      const y = 4 * t * (1 - t) * ARCH_B.apex[1];
      ab.push(eB(x, y));
    }
    dw.setStrokes('bArch', ab.slice(0, -1).map((p, i) => [p, ab[i + 1]]));
    dw.setLabel('lbZero', eB(PANL / 2, 0.55));
    dw.setText('lbZero', '0 — every member');
    // wall C's opening and the path round it
    const eC = ev(2);
    dw.setCircle('cHole', eC(...HOLE_C.c), HOLE_C.r * SC.elev);
    // the straight line from the near top corner to the far base support runs
    // straight through the opening, so the strut has to kink over it
    const over = [HOLE_C.c[0], HOLE_C.c[1] + HOLE_C.r + 0.28];
    dw.setStrokes('cStrut', [
      [eC(INSET, HCLR), eC(over[0], over[1])],
      [eC(over[0], over[1]), eC(PANL - INSET, 0)]]);
    dw.setSeg('cTie', eC(INSET, 0), eC(PANL - INSET, 0));
    dw.setSeg('cHang', eC(INSET, 0), eC(INSET, HCLR));
    dw.setLabel('lcPath', eC(over[0] + 1.75, over[1] - 2.05));
    dw.setText('lcPath', 'over the hole');

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const g = panel.section('Given');
  panel.slider(g, s, 'F', 'F (kN)', -150, 150, 5, refresh,
    (v) => `${v} kN ${v > 0 ? '→' : v < 0 ? '←' : ''}`);
  panel.slider(g, s, 'fy', 'where F enters the left edge (m)', 0, 12, 0.25, refresh,
    (v) => `y = ${v.toFixed(2)} m`);
  const w = panel.section('What to look at');
  panel.toggle(w, s, 'edge', 'idealise the walls to the slab edges (y = 12.0 and 0)', refresh);
  panel.toggle(w, s, 'axes', 'show the wall axes and their intersections', refresh);
  panel.toggle(w, s, 'lbl', 'show labels', refresh);

  refresh();
  return player;
}
