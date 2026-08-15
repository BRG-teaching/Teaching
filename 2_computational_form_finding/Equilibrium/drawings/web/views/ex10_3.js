/**
 * EX 10 · Task 3 — Horizontal forces, quantitatively: one strut does the whole job
 * Structural Design II, FS 23 (sheet EX 10 "Bracing & Horizontal Forces", p. 2).
 *
 * TASK TEXT, verbatim:
 *   "Analyse the force flow within the ceiling due to an applied horizontal
 *    force. The walls are used for bracing.
 *    a) First, find an internal force flow in the plate such as it can be
 *       redirected into the ground through the walls. Draw the corresponding
 *       force diagram if F = 100 kN.
 *    b) Then find a possible internal force flow in the walls A, B and C.
 *       First draw the applied horizontal force for each wall into the
 *       corresponding form diagram. Secondly, draw the force diagram for each
 *       wall. Indicate tension forces with red, compression forces with blue
 *       and reaction forces with green."
 *   (captions: `top view 1:200`, `form diagram wall A/B/C 1:100`,
 *    `force diagrams 1cm ≙ 10kN`)
 *
 * WHICH METHOD THE SHEET EXPECTS — say it plainly, because it is what makes
 * the exercise honest. Compendium 10.1: "Since walls can only absorb forces
 * along their axis, the possible lines of action of the walls and thus their
 * points of intersection are drawn into the slab first." Each wall is one
 * force on one known line with one unknown magnitude. THREE walls give three
 * unknowns against the three equilibrium equations of a rigid body in plane,
 * so the slab is STATICALLY DETERMINATE in plan and pure statics on the wall
 * centrelines gives exactly what a stiffness-based sharing would give. It is
 * not a simplification. Stiffness would only start to matter at four walls or
 * more, and this sheet never has four.
 *
 * GEOMETRY, digitised from p. 2 at the printed 1:200. No dimension string is
 * printed anywhere on the sheet. Origin = bottom-left slab corner, x right,
 * y up, metres.
 *
 *   slab      16.00 x 12.00 m       (226.69 x 170.01 pt)
 *   wall A    (0.20, 0.00) – (0.20, 5.00)    vertical, flush with the left edge
 *   wall B    (11.00, 11.80) – (16.00, 11.80) horizontal, flush with the top
 *   wall C    (15.80, 0.00) – (15.80, 5.00)  vertical, flush with the right edge
 *   F         = 100 kN at (0.00, 6.00), direction +x — exactly mid-height
 *   all walls 5.00 x 0.40 m
 *
 * THE ANSWER, derived:
 *   sum Fx = 0                    =>  B = 100.00 kN in -x
 *   sum Fy = 0                    =>  A = -C
 *   sum M about the origin:  -6.00(100) + 11.80(100) + 0.20 A + 15.80 C = 0
 *                                 =>  580 + 15.60 C = 0
 *   >>  A = +37.1795 kN (in +y),  C = -37.1795 kN (in -y),  B = 100.00 kN
 *   generally  A = C = F (y_B - y_F) / (x_C - x_A) = 100 x 5.80 / 15.60
 *
 * CHECK 1, the couple, both ways:
 *   F and B are a couple  100.00 x (11.80 - 6.00) = 580.0 kNm
 *   A and C are a couple  37.1795 x (15.80 - 0.20) = 580.0 kNm            OK
 * CHECK 2, the resultant of the three wall reactions: (-100.00, 0) with a
 *   moment about the origin of +600.0 kNm, i.e. a line of action at
 *   y = 6.00 m — collinear with F. No residual force, no residual torsion.
 * CHECK 3, the edge-line reading: a student measuring to the slab EDGES
 *   (x = 0 and 16.00, y = 12.00) gets A = C = 100 x 6.00/16.00 = 37.50 kN,
 *   0.86 % high. Both are defensible at drawing accuracy. The panel offers
 *   both; 37.18 kN is quoted.
 *
 * THE FORCE FLOW — the minimal solution is ONE STRUT.
 * The wall axes cross at (0.20, 11.80) = A n B and N2 = (15.80, 11.80) = B n C
 * (A and C are parallel). Take N1 = (0.20, 6.00), where F's line of action
 * meets wall A's axis. The resultant of F and A there is (100, 37.1795) kN;
 * its slope is 0.371795 and at x = 15.80 it has climbed to
 * 6.00 + 0.371795 x 15.60 = 11.80 — exactly N2. So:
 *
 *   A-link  (0.20, 5.00) -> (0.20, 6.00)   1.000 m    37.18 kN COMPRESSION
 *   strut S  N1 -> N2                     16.643 m   106.69 kN COMPRESSION
 *   C-link  N2 -> (15.80, 5.00)            6.800 m    37.18 kN TENSION
 *   wall B is delivered AT N2, which lies on wall B (x 11.00 … 16.00)
 *
 *   |S| = sqrt(100.00^2 + 37.1795^2) = 106.6879 kN at 20.396 degrees.
 *   106.6879 cos 20.396 = 100.000 and 106.6879 sin 20.396 = 37.180.      OK
 *   Wall A is BELOW N1 and must push it in +y, hence compression; wall C is
 *   below N2 and must pull it in -y, hence tension.
 *
 * THE FORCE DIAGRAM at 1 cm = 10 kN is a RECTANGLE and the strut is its
 * diagonal: F 10.000 cm along the bottom, A 3.718 cm up the right side,
 * B 10.000 cm back along the top, C 3.718 cm down the left, closing; the
 * diagonal is 10.669 cm. The plan beside it is at 1:200, so a 100 kN force is
 * genuinely drawn longer than the 16 m slab is wide. That is the sheet's own
 * arithmetic, not a drafting choice.
 *
 * WALL-LEVEL RESULTS, task 3 b). The force arrives at the slab mid-plane,
 * z = 2.80 m, over a support span of 4.60 m, so every vertical support couple
 * is H x 2.80/4.60 = 0.60870 H whatever else happens.
 *   wall A   37.18 kN, base H 37.18, V ±22.63 kN   (roller left, pin right)
 *   wall B  100.00 kN, base H 100.00, V ±60.87 kN  (pin left, roller right)
 *   wall C   37.18 kN, base H 37.18, V ±22.63 kN   (roller left, pin right)
 *   checks: 22.6310 x 4.60 = 104.10 kNm = 37.1795 x 2.80  OK
 *           60.8696 x 4.60 = 280.00 kNm = 100.00 x 2.80   OK
 *
 * Each elevation is modelled as the two-member panel the geometry forces: a
 * vertical member above the ROLLER and a diagonal to the PIN, because only the
 * pin can take H. The diagonal is compression when the pin is downstream of
 * the push (wall A) and tension when it is upstream (wall B). Magnitudes
 * follow from one node: diagonal = H sqrt(span^2 + z^2)/span, vertical =
 * H z/span, and the reactions that come out are exactly the ones above.
 *
 * THE PRINTED OPENINGS are drawn because they decide where the force can
 * actually run: wall A's two triangular holes leave a single 0.657 m band of
 * continuous material at 31.3 degrees; wall B has two 1.013 m circles at
 * z = 1.96 m leaving a full-depth pier at each end; wall C has one 1.681 m
 * circle dead centre, splitting the panel into two piers and a lintel.
 *
 * ERRORS CARRIED (decode brief §6, plus one found here):
 *   3.  no plan dimension is printed anywhere on the sheet.
 *   7.  English 3b says "reaction forces with green", English 5a says
 *       "external forces"; the German says "äussere Kräfte" throughout.
 *   10. the support idealisation is never stated in words, and the decode
 *       brief contradicts itself about it: §3.4 reads the support apexes as
 *       0.40 m in from each end (a 4.20 m span) while every number in §4 uses
 *       4.60 m (0.20 m in). 4.60 m is used here; the panel offers 5.00 m,
 *       which makes the couples 8 % smaller.
 *   --  NEW. The brief's §4.3 table says wall C's load lands at the RIGHT end
 *       of its elevation. It cannot: walls A and C are both viewed along +x,
 *       so both elevations put y = 0 at the right and y = 5.00 at the LEFT,
 *       and both loads land at the LEFT end — A pushing right, C pushing
 *       left, which is what makes them a couple. The direction in that table
 *       is right; the end is not. The left end is used here.
 *
 * Nothing is hard-coded: every number above is recomputed in compute(), so
 * the sliders move the answer.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';
import * as P from '../lib/plan.js';

// ------------------------------------------------------------------ givens
const LX = 16.00, LY = 12.00, TW = 0.40;
const XA = 0.20, YB = 11.80, XC0 = 15.80;
const WLEN = 5.00, HW = 3.00, ZMID = 2.80;

const SC = P.pageScales(2.0);                 // 1 printed cm = 2.0 drawing units
const MP = SC.plan, ME = SC.elev, SF = SC.force;
const SA = 0.040;                             // plan arrows are symbols, m per kN
const SEU = 0.080;                            // elevation arrows, drawing units per kN

const PO = [0, 8];                            // the plan, bottom-left
const EO = [[0, -14], [15, -14], [30, -14]];  // the three elevations
const FO = [-38, -2];                         // the force diagram origin

const DEFAULTS = { F: 100, yF: 6.00, xC: 15.80, edge: false, span46: true, lbl: true, _k: 99 };

export const meta = {
  title: 'EX 10.3 — one strut carries the whole slab',
  subtitle: 'Structural Design II · sheet EX 10 “Bracing & Horizontal Forces”, task 3 a)–b)',
  about: 'The same 16 by 12 metre slab as task 2, but the walls have moved: one up each side and one along the top, and now the force is 100 kN and the answer has to be a number. Three walls, three unknowns, three equations — the slab is statically determinate in plan, which is why graphic statics on the wall centrelines and a stiffness distribution give the same answer here. Then the pretty part: the resultant of the load and the first wall reaction happens to point exactly at the corner where the other two wall axes cross, so a single straight strut across the slab does the entire job. The force diagram is a rectangle and the strut is its diagonal.',
  result: (d) => [
    `A = ${Math.abs(d.A).toFixed(4)} kN (${d.A > 0 ? '+y' : '−y'}) · B = ${Math.abs(d.B).toFixed(2)} kN (−x) · C = ${Math.abs(d.C).toFixed(4)} kN (${d.C > 0 ? '+y' : '−y'})`,
    `A = C = F (y_B − y_F)/(x_C − x_A) = ${d.F.toFixed(0)} × ${(YB - d.yF).toFixed(2)} / ${(d.xC - d.xA).toFixed(2)} = ${Math.abs(d.A).toFixed(4)} kN`,
    `strut N₁(${d.N1[0].toFixed(2)}, ${d.N1[1].toFixed(2)}) → N₂(${d.N2[0].toFixed(2)}, ${d.N2[1].toFixed(2)}): ${d.S.toFixed(4)} kN COMPRESSION at ${d.ang.toFixed(3)}°, ${d.Slen.toFixed(3)} m long`,
    `couple check both ways: F × ${(YB - d.yF).toFixed(2)} = ${d.M1.toFixed(1)} kNm and A × ${(d.xC - d.xA).toFixed(2)} = ${d.M2.toFixed(1)} kNm`,
    `the wall reactions reduce to ${d.RW.toFixed(2)} kN in −x on y = ${d.yR === null ? '—' : d.yR.toFixed(3)} m — collinear with F, so nothing is left over`,
    `wall bases (z = ${ZMID.toFixed(2)} m, span ${d.span.toFixed(2)} m): A → H ${Math.abs(d.A).toFixed(2)}, V ±${d.ev[0].V.toFixed(2)} · B → H ${Math.abs(d.B).toFixed(2)}, V ±${d.ev[1].V.toFixed(2)} · C → H ${Math.abs(d.C).toFixed(2)}, V ±${d.ev[2].V.toFixed(2)} kN`,
    d.edge ? `EDGE reading (walls on x = 0 / 16.00 and y = 12.00): A = C = ${Math.abs(d.A).toFixed(2)} kN`
           : `centreline reading; the edge-line reading would give A = C = ${d.Aedge.toFixed(2)} kN, 0.86 % high`],
  frame: [[-40, -26], [40, 26]],
};

const STEPS = [
  { t: 'The exercise', d: 'EX 10 task 3: the same slab, the walls moved, and now a number. F = 100 kN comes in at the left edge and has to end up in the ground through three walls. Find the flow, find the force in every member, and draw the force diagram at 1 cm ≙ 10 kN' },
  { t: 'The plan', d: 'a 16 by 12 metre slab at 1:200. Wall A runs up the left edge, wall C up the right edge, wall B along the top on the right-hand half. All three are 5.00 by 0.40 metres, and not one dimension is printed on the sheet — everything here is measured off the drawing against its stated scale',
    detail: () => [`slab ${LX.toFixed(2)} × ${LY.toFixed(2)} m`,
                   `wall A  (0.20, 0.00) – (0.20, 5.00)  ·  wall C  (15.80, 0.00) – (15.80, 5.00)`,
                   `wall B  (11.00, 11.80) – (16.00, 11.80)`] },
  { t: 'Three axes, three unknowns', d: 'each centreline run right across the plan. A wall only absorbs force along its own axis, so A and C can take y and B can take x — three unknown magnitudes on three known lines, against the three equilibrium equations of a body in plane. The slab is statically determinate: this is plain statics, and a stiffness-based sharing would return the identical numbers',
    detail: () => ['A : x = 0.20, takes y', 'C : x = 15.80, takes y', 'B : y = 11.80, takes x',
                   'three unknowns, three equations — no stiffness assumption anywhere'],
    take: 'that is the sentence worth keeping: with exactly three walls, statics IS the answer' },
  { t: 'Braced', d: 'axes A and C are parallel; axis B crosses both. Two distinct crossings, so by the compendium\'s own test the slab is properly braced — and the second of them, at the top right, is where the whole solution is going to happen',
    detail: (d) => [`(${d.xA.toFixed(2)}, ${YB.toFixed(2)}) — axis A ∩ axis B`,
                    `N₂ = (${d.xC.toFixed(2)}, ${YB.toFixed(2)}) — axis B ∩ axis C`,
                    `${d.pts} crossings ⇒ braced ✓`] },
  { t: 'The load, and the first node', d: (d) => `F = ${d.F.toFixed(0)} kN enters at (0.00, ${d.yF.toFixed(2)}) and its line of action runs across the slab. Where it meets wall A's axis is the node N₁ — the one place the load and one wall can be added together`,
    detail: (d) => [`F = ${d.F.toFixed(2)} kN at (0.00, ${d.yF.toFixed(2)}), direction +x`,
                    `N₁ = (${d.N1[0].toFixed(2)}, ${d.N1[1].toFixed(2)})`,
                    `lever arm to wall B's axis: ${(YB - d.yF).toFixed(2)} m ⇒ torsion ${d.M1.toFixed(1)} kNm`] },
  { t: 'One strut, and it aims itself', d: (d) => `add F and wall A's reaction at N₁ and the resultant is (${d.F.toFixed(1)}, ${d.A.toFixed(2)}) kN. Follow that line across the slab and at x = ${d.xC.toFixed(2)} it has climbed to exactly y = 11.80 — the corner N₂ where wall B's axis crosses wall C's. Nothing was arranged to make that happen; it is what the three equilibrium equations already decided`,
    detail: (d) => [`slope ${(Math.abs(d.A) / d.F).toFixed(6)} × ${(d.xC - d.xA).toFixed(2)} m = ${(Math.abs(d.A) / d.F * (d.xC - d.xA)).toFixed(3)} m of rise`,
                    `${d.yF.toFixed(2)} + ${(Math.abs(d.A) / d.F * (d.xC - d.xA)).toFixed(3)} = ${(d.yF + Math.abs(d.A) / d.F * (d.xC - d.xA)).toFixed(3)} m = wall B's axis ✓`,
                    `strut S = √(${d.F.toFixed(1)}² + ${Math.abs(d.A).toFixed(3)}²) = ${d.S.toFixed(4)} kN compression at ${d.ang.toFixed(3)}°`],
    take: 'a single straight member across a 16 metre slab, and the exercise is essentially over' },
  { t: 'Resolve at the far corner', d: 'the strut arrives at N₂ carrying both components. The horizontal 100 kN goes straight into wall B, because N₂ actually lies on wall B. The vertical 37.18 kN runs down wall C\'s axis as a tie. And back at N₁, the short link down to wall A is a strut, because wall A has to push the node up',
    detail: (d) => [`at N₂ : ${d.F.toFixed(2)} kN → wall B (N₂ is on the wall, x 11.00…16.00)`,
                    `C-link N₂ → (${d.xC.toFixed(2)}, 5.00), ${(YB - 5).toFixed(2)} m : ${Math.abs(d.C).toFixed(2)} kN TENSION`,
                    `A-link (${d.xA.toFixed(2)}, 5.00) → N₁, ${Math.abs(d.yF - 5).toFixed(2)} m : ${Math.abs(d.A).toFixed(2)} kN COMPRESSION`] },
  { t: 'The force diagram', d: 'at 1 cm ≙ 10 kN. The four external forces close a RECTANGLE — F along the bottom, A up the right side, B back along the top, C down the left — and the strut is its diagonal. Measure it: 10.669 cm, and it really is drawn longer than the 16 m slab is wide, because the slab is at 1:200 and this is not',
    detail: (d) => [`F ${(d.F / 10).toFixed(3)} cm · A ${(Math.abs(d.A) / 10).toFixed(3)} cm · B ${(Math.abs(d.B) / 10).toFixed(3)} cm · C ${(Math.abs(d.C) / 10).toFixed(3)} cm`,
                    `diagonal = strut S = ${(d.S / 10).toFixed(3)} cm = ${d.S.toFixed(3)} kN`,
                    `the polygon closes: residual ${d.res.toExponential(1)}`] },
  { t: 'The couple, checked both ways', d: 'F and wall B are a pair of equal, opposite, offset forces — a couple. Walls A and C are the couple that cancels it. Two completely different levers, one number, and if they did not agree the drawing would be wrong',
    detail: (d) => [`F × (11.80 − ${d.yF.toFixed(2)}) = ${d.F.toFixed(1)} × ${(YB - d.yF).toFixed(2)} = ${d.M1.toFixed(2)} kNm`,
                    `A × (${d.xC.toFixed(2)} − ${d.xA.toFixed(2)}) = ${Math.abs(d.A).toFixed(4)} × ${(d.xC - d.xA).toFixed(2)} = ${d.M2.toFixed(2)} kNm`,
                    `and the three wall forces add up to ${d.RW.toFixed(2)} kN in −x on y = ${d.yR === null ? '—' : d.yR.toFixed(3)} m — F's own line`],
    take: 'the wall reactions reduce to minus the load on the load\'s own line: nothing left over, no residual spin' },
  { t: 'Each wall, unfolded', d: 'the little solid triangle beside each wall says which way you look at it, and the elevation\'s right-hand direction is that view direction crossed with up. Walls A and C are both seen along +x, so both put the slab\'s bottom edge at the elevation\'s right and both take their load at the LEFT end — A pushing right, C pushing left, which is exactly what makes them a couple. Only the pin can take H, so the diagonal always runs to the pin',
    detail: (d) => d.ev.map((w) => `wall ${w.k}: ${w.mag.toFixed(2)} kN at z = ${ZMID.toFixed(2)} m → diagonal ${Math.abs(w.Td).toFixed(2)} kN ${w.Td < 0 ? 'compression' : 'tension'}, vertical ${Math.abs(w.Tv).toFixed(2)} kN ${w.Tv > 0 ? 'tension' : 'compression'}, H ${Math.abs(w.Hpin).toFixed(2)}, V ±${w.V.toFixed(2)} kN`),
    take: 'the printed openings are drawn because they decide where the force can actually run — wall A has one 0.657 m band of continuous material left, at 31.3°' },
  { t: 'The answer', d: (d) => `A = C = ${Math.abs(d.A).toFixed(2)} kN and B = ${Math.abs(d.B).toFixed(2)} kN, carried across the slab by one ${d.S.toFixed(2)} kN strut at ${d.ang.toFixed(2)}°. Drag y_F to 11.80 and A and C vanish — the load walks straight into wall B; drag wall C towards wall A and the lever arm collapses and the reactions blow up`,
    detail: (d) => [`A = C = ${Math.abs(d.A).toFixed(4)} kN · B = ${Math.abs(d.B).toFixed(4)} kN · S = ${d.S.toFixed(4)} kN`,
                    `base couples ±${d.ev[0].V.toFixed(2)} / ±${d.ev[1].V.toFixed(2)} / ±${d.ev[2].V.toFixed(2)} kN`,
                    `centreline ${d.edge ? '(off)' : '(on)'} — the edge-line reading gives ${d.Aedge.toFixed(2)} kN`] },
];

// ------------------------------------------------------------------ maths
function compute(s) {
  const xA = s.edge ? 0 : XA;
  const xC = s.edge ? LX : s.xC;
  const yB = s.edge ? LY : YB;
  const walls = [P.makeWall('A', [xA, 0], [xA, WLEN], TW),
                 P.makeWall('B', [xC - WLEN, yB], [xC, yB], TW),
                 P.makeWall('C', [xC, 0], [xC, WLEN], TW)];
  const F = [s.F, 0];
  const N1 = [xA, s.yF];
  const sol = P.solvePlan(walls, [{ at: [0, s.yF], f: F }]);
  const st = P.stability(walls);
  const wr = P.wallResultant(walls, sol.lam);
  const A = sol.lam[0], B = sol.lam[1], C = sol.lam[2];

  const N2 = P.axisCross(walls[1], walls[2]) ?? [xC, yB];
  const S = Math.hypot(s.F, A);
  const Slen = V.dist(N1, N2);
  const ang = (Math.atan2(A, s.F) * 180) / Math.PI;
  const M1 = s.F * (yB - s.yF);
  const M2 = Math.abs(A) * (xC - xA);
  const Aedge = (s.F * (LY - s.yF)) / LX;

  // ---- the three elevations, unfolded through d x z
  const VIEW = { A: [1, 0], B: [0, 1], C: [1, 0] };
  const PIN = { A: 'R', B: 'L', C: 'R' };                 // brief §3.4, page 2
  const span = s.span46 ? 4.60 : 5.00;
  const inset = (WLEN - span) / 2;
  const ev = walls.map((w, i) => {
    const uf = P.unfold(w, VIEW[w.name]);
    const lam = sol.lam[i];
    const at = w.name === 'A' ? N1 : w.name === 'B' ? N2 : N2;
    const dirn = Math.sign(uf.toLocalDir(V.mul(w.u, -lam))) || 1;
    const mag = Math.abs(lam);
    const loadX = Math.max(0, Math.min(WLEN, uf.toLocal(at)));
    const xPin = PIN[w.name] === 'R' ? WLEN - inset : inset;
    const xRoll = PIN[w.name] === 'R' ? inset : WLEN - inset;
    const sgnp = Math.sign(xPin - xRoll);
    const L = Math.hypot(span, ZMID);
    const Td = -dirn * sgnp * mag * L / span;        // negative = compression
    const Tv = dirn * sgnp * mag * ZMID / span;      // positive = tension
    const Vr = (ZMID * dirn * mag) / span;
    return { k: w.name, uf, lam, dirn, mag, loadX, xPin, xRoll, Td, Tv,
             Vl: -Vr, Vr, V: Math.abs(Vr), Hpin: -dirn * mag, inset, span };
  });

  return { walls, st, pts: st.points.length, xA, xC, yB, F: s.F, yF: s.yF,
           N1, N2, A, B, C, S, Slen, ang, M1, M2, Aedge, edge: s.edge,
           RW: Math.hypot(...wr.f), yR: wr.y, span, ev,
           res: Math.max(...sol.check.map(Math.abs)) };
}

// ------------------------------------------------------------------- view
export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  const px = (p) => [PO[0] + p[0] * MP, PO[1] + p[1] * MP];
  const ex = (i, x, z) => [EO[i][0] + x * ME, EO[i][1] + z * ME];
  const box = [0, 0, LX, LY];
  const CEN = [LX / 2, LY / 2];

  dw.label('tPlan', 'top view 1:200', { cls: 'title', flash: false });
  dw.label('tForce', 'force diagram  1 cm ≙ 10 kN', { cls: 'title', flash: false });
  dw.label('tElev', 'form diagrams 1:100 — a vertical over the roller, a diagonal to the pin',
    { cls: 'title', flash: false });

  // ---- the plan
  dw.strokes('slab', 4, { intro: 1, w: dw.W.str, color: PAL.black });
  ['A', 'B', 'C'].forEach((k) => {
    dw.poly(`w${k}`, 4, { intro: 1, color: PAL.black, opacity: 1 });
    dw.label(`lw${k}`, `wall ${k}`, { cls: 'num', intro: 1, flash: false });
    dw.poly(`vt${k}`, 3, { intro: 1, color: PAL.black, opacity: 1, flash: false });
    dw.dashLine(`ax${k}`, { intro: 2, color: PAL.grey, dash: dw.W.dash });
    dw.arrow(`dir${k}`, { intro: 2, color: PAL.grey, flash: false,
      w: NARR.w * 0.8, headLen: NARR.headLen * 0.8, headW: NARR.headW * 0.8 });
  });
  dw.disk('X1', { intro: 3, r: dw.W.disk });
  dw.disk('N2', { intro: 3, r: dw.W.disk });
  dw.label('lX1', 'A ∩ B', { cls: 'point', intro: 3 });
  dw.label('lN2', 'N₂', { cls: 'num', intro: 3 });
  for (const n of ['16', '12', '11']) {
    dw.strokes(`dim${n}`, 5, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
    dw.label(`ldim${n}`, '', { intro: 1, flash: false, color: PAL.grey });
  }
  dw.dashLine('loa', { intro: 4, color: PAL.grey, dash: dw.W.dash });
  dw.arrow('Farr', { intro: 4, color: PAL.green, ...ARR });
  dw.label('lF', '', { cls: 'num', intro: 4, color: PAL.green });
  dw.disk('N1', { intro: 4, r: dw.W.disk });
  dw.label('lN1', 'N₁', { cls: 'num', intro: 4 });

  dw.seg('strut', { intro: 5, w: dw.W.bar, color: { pending: PAL.black, final: () => PAL.blue } });
  dw.label('lstrut', '', { cls: 'num', intro: 5, color: PAL.blue, when: (st) => st.lbl });
  dw.seg('clink', { intro: 6, w: dw.W.bar, color: { pending: PAL.black, final: () => PAL.red } });
  dw.seg('alink', { intro: 6, w: dw.W.bar, color: { pending: PAL.black, final: () => PAL.blue } });
  dw.label('lclink', '', { cls: 'num', intro: 6, color: PAL.red, when: (st) => st.lbl });
  dw.label('lalink', '', { cls: 'num', intro: 6, color: PAL.blue, when: (st) => st.lbl });
  ['A', 'B', 'C'].forEach((k) => {
    dw.arrow(`re${k}`, { intro: 6, color: PAL.green, ...NARR });
    dw.label(`lre${k}`, '', { cls: 'num', intro: 6, color: PAL.green });
  });

  // ---- the couple check
  dw.strokes('cp1', 5, { intro: 8, w: dw.W.dim, color: PAL.green, flash: false });
  dw.strokes('cp2', 5, { intro: 8, w: dw.W.dim, color: PAL.green, flash: false });
  dw.label('lcp1', '', { intro: 8, color: PAL.green });
  dw.label('lcp2', '', { intro: 8, color: PAL.green });
  dw.dashLine('resline', { intro: 8, color: PAL.green, dash: dw.W.dash });
  dw.label('lresline', '', { cls: 'point', intro: 8, color: PAL.green });

  // ---- the force diagram: a rectangle whose diagonal is the strut
  dw.arrow('fF', { intro: 7, color: PAL.green, ...NARR });
  dw.arrow('fA', { intro: 7, color: PAL.green, ...NARR });
  dw.arrow('fB', { intro: 7, color: PAL.green, ...NARR });
  dw.arrow('fC', { intro: 7, color: PAL.green, ...NARR });
  dw.seg('fS', { intro: 7, w: dw.W.bar, color: PAL.blue });
  for (const [n, t] of [['fF', 'F'], ['fA', 'A'], ['fB', 'B'], ['fC', 'C'], ['fS', 'S']]) {
    dw.label(`l${n}`, t, { cls: 'num', intro: 7,
      color: n === 'fS' ? PAL.blue : PAL.green });
  }
  dw.link('strut', 'fS', 'lstrut', 'lfS');
  dw.link('Farr', 'fF', 'lF');
  dw.link('alink', 'fA', 'reA');
  dw.link('clink', 'fC', 'reC');
  dw.link('reB', 'fB');
  dw.ghostable('fF', 'fA', 'fB', 'fC', 'fS');

  // ---- the three elevations
  for (let i = 0; i < 3; i++) {
    dw.strokes(`eOut${i}`, 4, { intro: 9, w: dw.W.str, color: PAL.black, flash: false });
    dw.dashLine(`eSlab${i}`, { intro: 9, color: PAL.grey, dash: dw.W.dash * 0.6, flash: false });
    dw.dashLine(`eMid${i}`, { intro: 9, color: PAL.grey, dash: dw.W.dash * 0.6, flash: false });
    dw.label(`eTit${i}`, '', { cls: 'title', intro: 9, flash: false });
    dw.seg(`eDiag${i}`, { intro: 9, w: dw.W.bar,
      color: { pending: PAL.black, final: (d) => (!d ? PAL.black : d.ev[i].Td < 0 ? PAL.blue : PAL.red) } });
    dw.seg(`eVert${i}`, { intro: 9, w: dw.W.thin,
      color: { pending: PAL.black, final: (d) => (!d ? PAL.black : d.ev[i].Tv > 0 ? PAL.red : PAL.blue) } });
    dw.label(`elDiag${i}`, '', { cls: 'num', intro: 9, when: (st) => st.lbl,
      color: { pending: PAL.black, final: (d) => (!d ? PAL.black : d.ev[i].Td < 0 ? PAL.blue : PAL.red) } });
    for (const n of ['L', 'R']) {
      dw.poly(`eSup${i}${n}`, 3, { intro: 9, color: PAL.black, opacity: 1, flash: false });
      dw.strokes(`eHat${i}${n}`, 4, { intro: 9, w: dw.W.dim, color: PAL.grey, flash: false });
      dw.arrow(`eV${i}${n}`, { intro: 9, color: PAL.green, ...NARR });
      dw.label(`elV${i}${n}`, '', { cls: 'num', intro: 9, color: PAL.green, when: (st) => st.lbl });
    }
    dw.arrow(`eH${i}`, { intro: 9, color: PAL.green, ...NARR });
    dw.label(`elH${i}`, '', { cls: 'num', intro: 9, color: PAL.green, when: (st) => st.lbl });
    dw.arrow(`eLoad${i}`, { intro: 9, color: PAL.green, ...NARR });
    dw.label(`elLoad${i}`, '', { cls: 'num', intro: 9, color: PAL.green });
  }
  // the printed openings: two triangles, three circles
  dw.strokes('opA1', 3, { intro: 9, w: dw.W.thin, color: PAL.black, flash: false });
  dw.strokes('opA2', 3, { intro: 9, w: dw.W.thin, color: PAL.black, flash: false });
  dw.dashLine('bandA', { intro: 9, color: PAL.grey, dash: dw.W.dash * 0.5, flash: false });
  dw.circle('opB1', { intro: 9, color: PAL.black, flash: false });
  dw.circle('opB2', { intro: 9, color: PAL.black, flash: false });
  dw.circle('opC1', { intro: 9, color: PAL.black, flash: false });

  dw.instant('tPlan', 'tForce', 'tElev');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);

    dw.setLabel('tPlan', px([LX / 2 - 3.0, LY + 3.4]));
    dw.setLabel('tForce', [FO[0] + 10, FO[1] + 10.4]);
    dw.setLabel('tElev', [EO[1][0] + WLEN * ME / 2, EO[1][1] + HW * ME + 3.0]);

    // --- the plan
    const c = [px([0, 0]), px([LX, 0]), px([LX, LY]), px([0, LY])];
    dw.setStrokes('slab', c.map((p, i) => [p, c[(i + 1) % 4]]));
    const VIEW = { A: [1, 0], B: [0, 1], C: [1, 0] };
    const LPOS = { A: [1.9, 3.4], B: [d.xC - 4.6, 10.6], C: [d.xC - 3.2, 3.4] };
    d.walls.forEach((w) => {
      const k = w.name;
      dw.setPoly(`w${k}`, w.ring.map(px));
      dw.setLabel(`lw${k}`, px(LPOS[k]));
      const vp = V.add(w.mid, V.mul(VIEW[k], -1.15));
      dw.setPoly(`vt${k}`, P.viewTriangle(vp, VIEW[k], 0.42).map(px));
      const seg = P.axisSeg(w, box, 2.2);
      if (seg) dw.setDashLine(`ax${k}`, seg.map(px));
      const q = V.add(w.mid, V.mul(w.u, 2.8));
      dw.setArrow(`dir${k}`, px(V.sub(q, V.mul(w.u, 1.5))), px(q));
    });
    const X1 = [d.xA, d.yB];
    dw.setDisk('X1', px(X1));
    dw.setDisk('N2', px(d.N2));
    dw.setLabel('lX1', px(V.add(X1, [1.9, 0.9])));
    dw.setLabel('lN2', px(V.add(d.N2, [-1.3, -1.3])));

    for (const [n, a, b, off, txt] of [
      ['16', [LX, 0], [0, 0], 2.6, `${LX.toFixed(2)} m`],
      ['12', [LX, LY], [LX, 0], 1.4, `${LY.toFixed(2)} m`],
      ['11', [d.xC - WLEN, 0], [0, 0], 4.6, `${(d.xC - WLEN).toFixed(2)} m`]]) {
      dw.setStrokes(`dim${n}`, P.dimStrokes(a, b, off, 0.34).map(([p, q]) => [px(p), px(q)]));
      dw.setLabel(`ldim${n}`, px(P.dimLabel(a, b, off, 0.8)));
      dw.setText(`ldim${n}`, txt);
    }

    // --- the load
    const loa = P.lineOfAction([0, d.yF], [1, 0], box, 2.4);
    if (loa) dw.setDashLine('loa', loa.map(px));
    dw.setArrow('Farr', px([-d.F * SA, d.yF]), px([0, d.yF]));
    dw.setLabel('lF', px([-d.F * SA / 2, d.yF + 1.1]));
    dw.setText('lF', `F = ${d.F.toFixed(0)} kN`);
    dw.setDisk('N1', px(d.N1));
    dw.setLabel('lN1', px(V.add(d.N1, [1.5, -1.0])));

    // --- the flow
    dw.setSeg('strut', px(d.N1), px(d.N2));
    dw.setLabel('lstrut', px(V.add(V.mid(d.N1, d.N2), [0, -1.5])));
    dw.setText('lstrut', `S = ${d.S.toFixed(2)} kN`);
    dw.setSeg('clink', px(d.N2), px([d.xC, WLEN]));
    dw.setSeg('alink', px([d.xA, WLEN]), px(d.N1));
    dw.setLabel('lclink', px([d.xC - 1.7, 7.6]));
    dw.setLabel('lalink', px(V.add(d.N1, [2.0, 1.1])));
    dw.setText('lclink', `${Math.abs(d.C).toFixed(2)}`);
    dw.setText('lalink', `${Math.abs(d.A).toFixed(2)}`);

    const lamOf = { A: d.A, B: d.B, C: d.C };
    d.walls.forEach((w) => {
      const k = w.name;
      const out = V.dot(V.sub(w.mid, CEN), w.n) >= 0 ? 1 : -1;
      const at = V.add(w.mid, V.mul(w.n, 1.35 * out));
      const [t0, t1] = P.reactionArrow(w, lamOf[k], SA, at);
      dw.setArrow(`re${k}`, px(t0), px(t1));
      dw.setLabel(`lre${k}`, px(V.add(V.mid(t0, t1), V.mul(w.n, (k === 'C' ? 2.8 : 1.5) * out))));
      dw.setText(`lre${k}`, `${k} = ${Math.abs(lamOf[k]).toFixed(2)} kN`);
    });

    // --- the couple check
    dw.setStrokes('cp1', P.dimStrokes([4.0, d.yF], [4.0, d.yB], 0, 0.34)
      .map(([p, q]) => [px(p), px(q)]));
    dw.setLabel('lcp1', px([1.9, (d.yF + d.yB) / 2]));
    dw.setText('lcp1', `F × ${(d.yB - d.yF).toFixed(2)} = ${d.M1.toFixed(1)} kNm`);
    dw.setStrokes('cp2', P.dimStrokes([d.xA, 1.4], [d.xC, 1.4], 0, 0.34)
      .map(([p, q]) => [px(p), px(q)]));
    dw.setLabel('lcp2', px([(d.xA + d.xC) / 2, 0.6]));
    dw.setText('lcp2', `A × ${(d.xC - d.xA).toFixed(2)} = ${d.M2.toFixed(1)} kNm`);
    const yR = d.yR ?? d.yF;
    dw.setDashLine('resline', [px([-3.0, yR]), px([LX + 3.0, yR])]);
    dw.setLabel('lresline', px([LX + 5.4, yR + 3.2]));
    dw.setText('lresline', `walls ⇒ ${d.RW.toFixed(1)} kN on y = ${yR.toFixed(2)}`);

    // --- the force diagram: F, A, B, C close a rectangle; S is its diagonal
    const o = FO;
    const a1 = V.add(o, [d.F * SF, 0]);
    const b1 = V.add(a1, [0, d.A * SF]);
    const c1 = V.add(b1, [d.B * SF, 0]);
    dw.setArrow('fF', o, a1);
    dw.setArrow('fA', a1, b1);
    dw.setArrow('fB', b1, c1);
    dw.setArrow('fC', c1, o);
    dw.setSeg('fS', o, b1);
    dw.setLabel('lfF', V.add(V.mid(o, a1), [0, -1.1]));
    dw.setLabel('lfA', V.add(V.mid(a1, b1), [2.4, 0]));
    dw.setLabel('lfB', V.add(V.mid(b1, c1), [0, 1.1]));
    dw.setLabel('lfC', V.add(V.mid(c1, o), [-2.4, 0]));
    dw.setLabel('lfS', V.add(V.mid(o, b1), [0.6, -1.3]));
    dw.setText('lfF', `F ${(d.F / 10).toFixed(2)} cm`);
    dw.setText('lfA', `A ${(Math.abs(d.A) / 10).toFixed(3)}`);
    dw.setText('lfB', `B ${(Math.abs(d.B) / 10).toFixed(2)} cm`);
    dw.setText('lfC', `C ${(Math.abs(d.C) / 10).toFixed(3)}`);
    dw.setText('lfS', `S ${(d.S / 10).toFixed(3)} cm`);

    // --- the elevations
    d.ev.forEach((w, i) => {
      const box4 = [ex(i, 0, 0), ex(i, WLEN, 0), ex(i, WLEN, HW), ex(i, 0, HW)];
      dw.setStrokes(`eOut${i}`, box4.map((p, j) => [p, box4[(j + 1) % 4]]));
      dw.setDashLine(`eSlab${i}`, [ex(i, 0, HW - 0.40), ex(i, WLEN, HW - 0.40)]);
      dw.setDashLine(`eMid${i}`, [ex(i, -0.5, ZMID), ex(i, WLEN + 0.5, ZMID)]);
      dw.setLabel(`eTit${i}`, ex(i, WLEN / 2, -4.6));
      dw.setText(`eTit${i}`, `wall ${w.k} · 1:100`);
      const top = ex(i, w.xRoll, ZMID);
      const pin = ex(i, w.xPin, 0);
      const roll = ex(i, w.xRoll, 0);
      dw.setSeg(`eDiag${i}`, top, pin);
      dw.setSeg(`eVert${i}`, top, roll);
      dw.setLabel(`elDiag${i}`, V.add(V.mid(top, pin), [0, 0.9]));
      dw.setText(`elDiag${i}`, `${Math.abs(w.Td).toFixed(2)}`);
      const Vs = { L: w.Vl, R: w.Vr };
      const xs = { L: w.inset, R: WLEN - w.inset };
      for (const n of ['L', 'R']) {
        const b = ex(i, xs[n], 0);
        dw.setPoly(`eSup${i}${n}`, [b, [b[0] - 0.30, b[1] - 0.52], [b[0] + 0.30, b[1] - 0.52]]);
        dw.setStrokes(`eHat${i}${n}`,
          V.hatch([b[0] - 0.55, b[1] - 0.55], [b[0] + 0.55, b[1] - 0.55], -1, 0.34, 4));
        const L = Vs[n] * SEU;
        const y0 = b[1] - 0.75;
        dw.setArrow(`eV${i}${n}`, L >= 0 ? [b[0], y0 - L] : [b[0], y0],
          L >= 0 ? [b[0], y0] : [b[0], y0 + L]);
        dw.setLabel(`elV${i}${n}`, [b[0] + (n === 'L' ? 1.6 : -1.6), y0 - 0.55]);
        dw.setText(`elV${i}${n}`, `${Vs[n] >= 0 ? '↑' : '↓'} ${Math.abs(Vs[n]).toFixed(2)}`);
      }
      const HL = w.Hpin * SEU;
      dw.setArrow(`eH${i}`, [pin[0] - HL, pin[1] - 0.30], [pin[0], pin[1] - 0.30]);
      dw.setLabel(`elH${i}`, [ex(i, WLEN / 2, 0)[0], pin[1] - 3.3]);
      dw.setText(`elH${i}`, `H = ${Math.abs(w.Hpin).toFixed(2)}`);
      // the arrow is put on whichever side of the load point has panel under
      // it, so a force applied at an end does not float off the drawing
      const t = ex(i, w.loadX, ZMID);
      const inward = w.loadX < WLEN / 2 ? 1 : -1;
      const far = [t[0] + inward * w.mag * SEU, t[1]];
      dw.setArrow(`eLoad${i}`, w.dirn === inward ? t : far, w.dirn === inward ? far : t);
      dw.setLabel(`elLoad${i}`, ex(i, WLEN / 2, ZMID + 0.62));
      dw.setText(`elLoad${i}`, `${w.mag.toFixed(2)} kN`);
    });
    // the openings, exactly as printed
    const triA = [[[0.738, 2.499], [3.921, 2.499], [0.738, 0.562]],
                  [[4.306, 2.265], [4.306, 0.328], [1.123, 0.328]]];
    triA.forEach((t, j) => {
      const p = t.map(([x, z]) => ex(0, x, z));
      dw.setStrokes(`opA${j + 1}`, p.map((q, k) => [q, p[(k + 1) % 3]]));
    });
    dw.setDashLine('bandA', [ex(0, 0.9305, 0.445), ex(0, 4.1135, 2.382)]);
    dw.setCircle('opB1', ex(1, 0.891, 1.959), (1.013 / 2) * ME);
    dw.setCircle('opB2', ex(1, 4.107, 1.959), (1.013 / 2) * ME);
    dw.setCircle('opC1', ex(2, 2.499, 1.289), (1.681 / 2) * ME);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const g = panel.section('The load');
  panel.slider(g, s, 'F', 'F (kN)', 0, 200, 5, refresh, (v) => `${v.toFixed(0)} kN`);
  panel.slider(g, s, 'yF', 'y_F — where F enters (m)', 0, 12, 0.1, refresh,
    (v) => `${v.toFixed(2)} m${Math.abs(v - 6) < 1e-9 ? '  (the sheet)' : v > 11.75 ? '  → A = C = 0' : ''}`);
  const w = panel.section('The structure');
  panel.slider(w, s, 'xC', 'wall C at x = (m)', 3, 15.8, 0.1, refresh,
    (v) => `${v.toFixed(2)} m${v < 4 ? '  — the lever is collapsing' : ''}`);
  panel.toggle(w, s, 'edge', 'measure to the slab EDGES, not the centrelines', refresh);
  panel.toggle(w, s, 'span46', 'support span 4.60 m (else 5.00 m)', refresh);
  panel.toggle(w, s, 'lbl', 'show the numbers', refresh);

  refresh();
  return player;
}
