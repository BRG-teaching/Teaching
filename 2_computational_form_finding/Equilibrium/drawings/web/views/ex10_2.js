/**
 * EX 10 · Task 2 — Horizontal forces, qualitatively: the wall that carries nothing
 * Structural Design II, FS 23 (sheet EX 10 "Bracing & Horizontal Forces", p. 1).
 *
 * TASK TEXT, verbatim:
 *   "Analyse the force flow within the ceiling due to an applied horizontal
 *    force. The walls are used for bracing.
 *    a) Find a qualitative internal force flow in the plate such that it can
 *       be redirected into the ground through the walls.
 *    b) Then find a possible internal force flow in the walls A, B and C.
 *       First draw the applied horizontal force for each wall into the
 *       corresponding form diagram. Then, find the support forces. Indicate
 *       tension forces with red, compression forces with blue and reaction
 *       forces with green."
 *   (captions: `top view 1:200`, `form diagram wall A/B/C 1:100`)
 *
 * METHOD — and it matters that it is the only one needed (compendium 10.1):
 * a wall can only absorb a force ALONG ITS OWN AXIS, so each wall is one force
 * on one known line with one unknown magnitude. Three walls, three unknowns,
 * three equilibrium equations: the slab is STATICALLY DETERMINATE in plan.
 * Pure statics on the wall centrelines and a stiffness-based distribution
 * therefore give the SAME answer here; stiffness would only start to matter
 * with four walls or more, which this sheet never has.
 *
 * GEOMETRY, digitised from p. 1 (no dimension string is printed anywhere on
 * the sheet; everything below comes from measuring the drawing against the
 * printed 1:200). Origin = bottom-left corner of the slab, x right, y up, m.
 *
 *   slab      16.00 x 12.00 m   (226.68 x 169.99 pt at 1:200)
 *   wall A    (0.00, 11.80) – (5.00, 11.80)   horizontal, 5.00 x 0.40 m
 *   wall B    (8.80,  3.50) – (8.80,  8.50)   vertical,   free-standing
 *   wall C    (0.00,  0.20) – (5.00,  0.20)   horizontal, 5.00 x 0.40 m
 *   F         applied at (0.00, 6.00), direction +x  — EXACTLY mid-height
 *             (measured 750.19 pt against a mid of 750.195 pt)
 *
 * THE ANSWER, derived:
 *   sum Fy = 0            =>  B = 0
 *   sum Fx = 0            =>  A + C = F
 *   sum M about origin    =>  -y_F F - 11.80 A_x - 0.20 C_x = 0
 *   with y_F = 6.00:          A = C = F/2, each pushing in -x.
 *   In general             A = F (y_F - 0.20) / 11.60,  C = F - A.
 *
 * AND THE THING THE SHEET DOES NOT ADMIT (brief §6.2). Task 2 is DEGENERATE.
 * F lands exactly on the slab's mid-line and walls A and C sit exactly
 * symmetrically about it, so the resultant of the wall forces is collinear
 * with F: zero eccentricity, zero torsion, and wall B carries nothing. The
 * sheet still asks the student to "draw the applied horizontal force for each
 * wall ... then find the support forces" for wall B, whose honest answer is
 * "there is no applied resultant and there are no support forces".
 *
 * A WARNING ABOUT THE OBVIOUS FIX. Sliding F off the mid-line does NOT wake
 * wall B up, and this view says so plainly rather than pretending. B is the
 * only wall that can take a force in y, and F has no y component: sum Fy = 0
 * gives B = 0 for EVERY position of F. Moving F redistributes A against C and
 * nothing else. What does load B is a load with a y component — hence the
 * second slider, the direction of F. At 0 degrees the sheet's answer appears;
 * turn F by anything at all and B comes alive.
 *
 * THE FORCE FLOW IN THE SLAB (compendium route: steer F into the points where
 * the wall axes cross). Axes A and C are parallel, so the only intersections
 * are P1 = (8.80, 11.80) = A n B and P2 = (8.80, 0.20) = C n B. Two
 * intersections, so the slab is braced. From the entry point N = (0, y_F):
 *
 *   strut 1  N -> P1     compression
 *   strut 2  N -> P2     compression
 *   tie 3    P1 -> (5.00, 11.80), along wall A's axis      tension
 *   tie 4    P1 -> (8.80,  8.50), along wall B's axis      tension
 *   tie 5    P2 -> (8.80,  3.50), along wall B's axis      tension
 *   tie 6    P2 -> (5.00,  0.20), along wall C's axis      tension
 *
 * At F = 100 kN and y_F = 6.00 m: struts 59.88 kN each at 33.398 degrees,
 * ties 3 and 6 = 50.00 kN, ties 4 and 5 = 32.95 kN. Ties 4 and 5 are equal,
 * opposite and COLLINEAR on x = 8.80, so they cancel exactly: wall B is
 * pulled at both ends, stands in tension along its length, and delivers ZERO
 * base shear. (Note the sign flip against the compendium's worked example:
 * there walls A and C lie BEYOND the intersection points and member 3 is a
 * strut; here they lie before them, x 0…5 against an intersection at 8.80,
 * so members 3 and 6 are TIES. Red, not blue.)
 *
 * WALL-LEVEL RESULTS, task 2 b), at F = 100 kN. The force arrives at the slab
 * mid-plane, z = 2.80 m, and the elevations show a pin and a roller near the
 * base, span 4.60 m.
 *   wall A  50.00 kN at the RIGHT end of the elevation (elevation right =
 *           +x_plan, from the view triangle below the wall); base H = 50.00 kN
 *           at the pin and a vertical couple V = 50.00 x 2.80 / 4.60 = ±30.43 kN
 *   wall C  identical
 *   wall B  two collinear opposite 32.95 kN forces at the ends of the top
 *           edge; BOTH base reactions zero
 *
 * ERRORS CARRIED (brief §6):
 *   2.  the degeneracy above, stated in step 8 rather than glossed over.
 *   3.  no dimension is printed on the plan; wall B measures 8.796 m from the
 *       left edge and is read as 8.80 m.
 *   7.  the English sheet says "reaction forces with green" in 2b but
 *       "external forces with green" in 5a; the German says "äussere Kräfte"
 *       throughout. External is used here.
 *   10. the wall support idealisation is never stated in words. §3.4 of the
 *       decode brief also contradicts itself — it reads the support apexes as
 *       0.40 m in from each end, which would be a 4.20 m span, but every
 *       number it derives uses 4.60 m (supports 0.20 m in). 4.60 m is used
 *       here, and the panel slider offers the 5.00 m reading, which makes the
 *       couples 8 % smaller.
 *
 * Every number is recomputed in compute(); nothing is hard-coded.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';
import * as P from '../lib/plan.js';

// ------------------------------------------------------------------ givens
const LX = 16.00, LY = 12.00;                 // the slab, m
const TW = 0.40;                              // wall thickness, m
const WA = [[0.00, 11.80], [5.00, 11.80]];
const WB = [[8.80, 3.50], [8.80, 8.50]];
const WC = [[0.00, 0.20], [5.00, 0.20]];
const ZMID = 2.80;                            // slab mid-plane above the wall base
const HW = 3.00, LW = 5.00;                   // elevation frame, m
const OPEN = [1.555, 0.822, 3.443, 2.177];    // the printed opening, walls B and C

// scales: plan 1:200, elevations 1:100, force diagram 1 cm = 10 kN, all three
// locked to one another exactly as the page locks them, so a 100 kN force
// really is drawn longer than the 16 m slab is wide
const SC = P.pageScales(2.0);                 // 1 printed cm = 2.0 drawing units
const MP = SC.plan, ME = SC.elev, SF = SC.force;
// arrows INSIDE the plan are symbols, not measurements — the sheets draw them
// schematically and the force scale belongs to the force diagram alone
const SA = 0.040;                             // metres of plan per kN, plan arrows only
const SEU = 0.080;                            // elevation arrows, drawing units per kN

// ------------------------------------------------------------------ layout
const PO = [0, 8];                                    // plan, bottom-left
const EO = [[0, -14], [15, -14], [30, -14]];          // the three elevations
const FO = [-41, 5];                                  // entry-node force polygon
const GO = [-41, -9];                                 // the P₁ force polygon

const DEFAULTS = { F: 100, yF: 6.00, ang: 0, span46: true, lbl: true, _k: 99 };

export const meta = {
  title: 'EX 10.2 — the braced wall that carries nothing',
  subtitle: 'Structural Design II · sheet EX 10 “Bracing & Horizontal Forces”, task 2 a)–b)',
  about: 'A 16 by 12 metre floor slab with three walls in it — two along the top and bottom edges, one standing free in the middle — and a horizontal force pushed in from the left. The two edge walls take it in equal halves and the middle wall takes nothing at all, because the force arrives exactly on the line of symmetry. That zero is the lesson of the sheet, and it is also the thing the sheet never admits. Slide the force up and down: the halves become unequal, and the middle wall stays at zero, because it is the only wall that could take a force across the slab and the load has no component that way. Only turning the force does anything to it.',
  result: (d) => [
    `walls take force ALONG THEIR OWN AXIS · A and C on y = 11.80 / 0.20 take x · B on x = 8.80 takes y`,
    `A = ${Math.abs(d.A).toFixed(2)} kN in ${d.A < 0 ? '−x' : '+x'} · B = ${Math.abs(d.B) < 5e-3 ? '0.00' : Math.abs(d.B).toFixed(2) + ' kN in ' + (d.B < 0 ? '−y' : '+y')} · C = ${Math.abs(d.C).toFixed(2)} kN in ${d.C < 0 ? '−x' : '+x'}   (F = ${d.F.toFixed(1)} kN at y = ${d.yF.toFixed(2)} m, ${d.ang.toFixed(0)}°)`,
    d.pure
      ? `B = 0 exactly: F has no y component, and B is the only wall that can take one — Σ F_y = 0 settles it for EVERY position of F`
      : `turning F to ${d.ang.toFixed(0)}° gives it a y component of ${d.Fy.toFixed(2)} kN, and wall B is the only wall that can take it: B = ${Math.abs(d.B).toFixed(2)} kN`,
    `slab flow: struts ${d.N1.toFixed(2)} / ${d.N2.toFixed(2)} kN to the two axis crossings · ties ${Math.abs(d.T3).toFixed(2)} / ${Math.abs(d.T6).toFixed(2)} kN into A and C · ${Math.abs(d.T4).toFixed(2)} kN along wall B, equal and opposite at its two ends`,
    `wall bases (z = ${ZMID.toFixed(2)} m, span ${d.span.toFixed(2)} m): A → H ${Math.abs(d.A).toFixed(2)}, V ±${d.VA.toFixed(2)} kN · C → H ${Math.abs(d.C).toFixed(2)}, V ±${d.VC.toFixed(2)} kN · B → H ${Math.abs(d.B).toFixed(2)}, V ±${d.VB.toFixed(2)} kN`],
  frame: [[-40, -26], [40, 26]],
};

const STEPS = [
  { t: 'The exercise', d: 'EX 10 task 2: a floor slab, three bracing walls, one horizontal force. Find a force flow through the slab into the walls, and then what each wall has to hold at its base. The sheet asks for it qualitatively — this does it with numbers so you can see which of them is zero' },
  { t: 'The plan', d: 'a 16 by 12 metre slab at 1:200. Walls A and C run along the top and bottom edges, 5 metres long and 0.40 thick; wall B stands free in the middle, turned through 90 degrees. Nothing on the sheet is dimensioned — every number here is measured off the drawing against its printed scale',
    detail: () => [`slab ${LX.toFixed(2)} × ${LY.toFixed(2)} m`,
                   `wall A  (0.00, 11.80) – (5.00, 11.80)   ·   wall C  (0.00, 0.20) – (5.00, 0.20)`,
                   `wall B  (8.80, 3.50) – (8.80, 8.50)      ·   all 5.00 × 0.40 m`] },
  { t: 'A wall only works along itself', d: 'each centreline extended right across the plan. That line is the wall\'s one possible line of action: a wall is stiff along its length and floppy across it, so A and C can only take force in x, and B only in y. Three lines, three unknowns, three equilibrium equations — the slab is statically determinate in plan and needs no stiffness assumption at all',
    detail: () => ['A : y = 11.80, takes x', 'C : y = 0.20, takes x', 'B : x = 8.80, takes y',
                   'compendium 10.1 — "walls can only absorb forces along their axis"'],
    take: 'this is why plan bracing is a drawing problem and not a stiffness problem' },
  { t: 'Two crossings, so it is braced', d: 'axes A and C are parallel and never meet; axis B crosses both. Two distinct intersection points — and the compendium\'s test is exactly that: more than one intersection means properly braced',
    detail: (d) => [`P₁ = (8.80, 11.80) — axis A ∩ axis B`,
                    `P₂ = (8.80, 0.20) — axis C ∩ axis B`,
                    `${d.pts} intersections ⇒ braced ✓`] },
  { t: 'The load', d: (d) => `F = ${d.F.toFixed(0)} kN pushed in at the left edge, ${d.ang === 0 ? 'horizontally' : `turned ${d.ang.toFixed(0)}°`}, on the line y = ${d.yF.toFixed(2)} m. Its line of action runs right across the slab — and at 6.00 m that line is the slab's own mid-height, exactly half way between wall A at 11.80 and wall C at 0.20`,
    detail: (d) => [`F = ${d.F.toFixed(2)} kN at (0.00, ${d.yF.toFixed(2)})`,
                    `distance to wall A: ${(11.80 - d.yF).toFixed(2)} m · to wall C: ${(d.yF - 0.20).toFixed(2)} m`,
                    Math.abs(d.yF - 6) < 1e-9 ? 'equal — this is the sheet\'s own position' : 'no longer equal'],
    take: 'drag y_F in the panel; the two distances are the whole of the answer' },
  { t: 'Two struts carry it across', d: 'the force cannot reach the walls directly, so it is steered into the two points where the axes cross. One strut to P₁, one to P₂, and at the entry point their y components cancel while their x components add up to F',
    detail: (d) => [`strut ① N → P₁ : ${d.N1.toFixed(2)} kN compression at ${d.a1.toFixed(2)}°, ${d.L1.toFixed(3)} m`,
                    `strut ② N → P₂ : ${d.N2.toFixed(2)} kN compression at ${d.a2.toFixed(2)}°, ${d.L2.toFixed(3)} m`,
                    `check at the entry node: ${(d.N1 * Math.cos(d.a1 * Math.PI / 180) + d.N2 * Math.cos(d.a2 * Math.PI / 180)).toFixed(3)} = F ✓`] },
  { t: 'And the ties bring it home', d: 'the walls are not at the crossings, so each crossing has to be tied back to its wall. Along y = 11.80 into wall A, along y = 0.20 into wall C, and along x = 8.80 in both directions to the two ends of wall B. Red for tension, blue for compression, green for what the walls hand back',
    detail: (d) => [`tie ③ P₁ → (5.00, 11.80) : ${Math.abs(d.T3).toFixed(2)} kN ${d.T3 > 0 ? 'tension' : 'compression'}`,
                    `tie ⑥ P₂ → (5.00, 0.20) : ${Math.abs(d.T6).toFixed(2)} kN ${d.T6 > 0 ? 'tension' : 'compression'}`,
                    `ties ④ ⑤ along x = 8.80 : ${Math.abs(d.T4).toFixed(2)} kN each, equal and OPPOSITE`],
    take: 'walls A and C sit BEFORE the crossings, not beyond them, so members ③ and ⑥ are ties — the compendium\'s own example has them the other way round' },
  { t: 'The force diagram', d: 'at 1 cm ≙ 10 kN, exactly the sheet\'s scale — and the plan beside it is at 1:200, so a 100 kN force really is drawn longer than the slab is wide. Above: the triangle at the entry node, F closed by the two struts. Below: the triangle at P₁, the strut closed by wall A and by the tie down wall B',
    detail: (d) => [`entry node: F ${(d.F / 10).toFixed(3)} cm · ① ${(d.N1 / 10).toFixed(3)} cm · ② ${(d.N2 / 10).toFixed(3)} cm`,
                    `node P₁: ① ${(d.N1 / 10).toFixed(3)} cm · A ${(Math.abs(d.T3) / 10).toFixed(3)} cm · ④ ${(Math.abs(d.T4) / 10).toFixed(3)} cm`,
                    `every polygon closes — that is the check`] },
  { t: 'Why wall B is empty', d: (d) => (d.pure
      ? 'ties ④ and ⑤ are equal, opposite and collinear on x = 8.80, so they cancel and wall B delivers no base shear at all. The clean way to see it: F has no y component, and B is the only wall that could take one — so Σ F_y = 0 gives B = 0 whatever else happens. Slide y_F: A and C change, B does not move off zero. It takes turning F to load it'
      : `now that F is turned ${d.ang.toFixed(0)}° it has a y component of ${d.Fy.toFixed(2)} kN, and wall B is the only wall that can take it. B = ${Math.abs(d.B).toFixed(2)} kN — the degeneracy is gone`),
    detail: (d) => [`Σ F_y : ${d.Fy.toFixed(3)} + ${(-d.B).toFixed(3)} = ${(d.Fy - d.B).toFixed(6)} ✓`,
                    `resultant of the three wall forces: ${d.RW.toFixed(2)} kN on the line y = ${d.yR === null ? '—' : d.yR.toFixed(3)} m`,
                    d.pure ? `collinear with F at y = ${d.yF.toFixed(3)} m ⇒ zero eccentricity, zero torsion` : 'no longer a pure x force'],
    take: 'the sheet asks for wall B\'s support forces and the honest answer is that there are none' },
  { t: 'Each wall, unfolded', d: 'the little solid triangle beside each wall in the plan says which way you look at it, and the elevation\'s right-hand direction is that view direction crossed with up. Walls A and C therefore keep +x to the right; wall B is seen from the left, so its elevation runs from y = 8.50 down to y = 3.50. The force lands at the slab mid-plane, 2.80 m up, and the pin and roller near the base turn it into a couple',
    detail: (d) => [`wall A : H = ${Math.abs(d.A).toFixed(2)} kN at the pin, V = ±${d.VA.toFixed(2)} kN over ${d.span.toFixed(2)} m`,
                    `wall C : H = ${Math.abs(d.C).toFixed(2)} kN, V = ±${d.VC.toFixed(2)} kN`,
                    `wall B : two opposite ${Math.abs(d.T4).toFixed(2)} kN forces at the ends of the top edge — H = ${Math.abs(d.B).toFixed(2)}, V = ±${d.VB.toFixed(2)} kN`],
    take: 'the openings are drawn because they decide where the force can actually run — task 3 makes that quantitative' },
  { t: 'The answer', d: (d) => `A = C = F/2 = ${d.A.toFixed(2)} kN and B = ${Math.abs(d.B) < 5e-3 ? '0' : Math.abs(d.B).toFixed(2)} kN. Two walls do all the work and the third is along for the ride — not because it is badly placed, but because this particular load never asks it for anything`,
    detail: (d) => [`A = F (y_F − 0.20)/11.60 = ${d.F.toFixed(1)} × ${(d.yF - 0.20).toFixed(2)} / 11.60 = ${d.A.toFixed(4)} kN`,
                    `C = F − A = ${d.C.toFixed(4)} kN · B = ${d.B.toFixed(4)} kN`,
                    `residual of the three equilibrium equations: ${d.res.toExponential(1)}`] },
];

// ------------------------------------------------------------------ maths
function compute(s) {
  const walls = [P.makeWall('A', WA[0], WA[1], TW),
                 P.makeWall('B', WB[0], WB[1], TW),
                 P.makeWall('C', WC[0], WC[1], TW)];
  const th = (s.ang * Math.PI) / 180;
  const F = [s.F * Math.cos(th), s.F * Math.sin(th)];
  const N = [0, s.yF];
  const sol = P.solvePlan(walls, [{ at: N, f: F }]);
  const st = P.stability(walls);
  const wr = P.wallResultant(walls, sol.lam);

  // the two axis crossings the flow is steered through
  const P1 = P.axisCross(walls[0], walls[1]);
  const P2 = P.axisCross(walls[2], walls[1]);

  // entry node: F closed by two struts, one to each crossing
  const u1 = V.unit(V.sub(P1, N)), u2 = V.unit(V.sub(P2, N));
  const den = V.cross(u1, u2);
  // T positive = TENSION (pulls the node toward the far end)
  const T1 = Math.abs(den) < 1e-9 ? 0 : V.cross(V.mul(F, -1), u2) / den;
  const T2 = Math.abs(den) < 1e-9 ? 0 : V.cross(u1, V.mul(F, -1)) / den;
  const N1 = -T1, N2 = -T2;                       // positive = compression
  const L1 = V.dist(N, P1), L2 = V.dist(N, P2);
  const deg = (u) => (Math.atan2(u[1], u[0]) * 180) / Math.PI;

  // what each strut pushes onto its crossing, and how the crossing sheds it
  const d1 = V.mul(u1, N1);                       // force delivered at P1
  const d2 = V.mul(u2, N2);
  // at P1: x goes along wall A's axis, y goes along wall B's axis
  const T3 = d1[0];         // tension in the member P1 -> wall A when positive
  const T4 = d1[1];         // tension in the member P1 -> wall B top when positive
  const T6 = d2[0];
  const T5 = -d2[1];

  const A = sol.lam[0], B = sol.lam[1], C = sol.lam[2];
  const span = s.span46 ? 4.60 : 5.00;
  const V_ = (H) => (Math.abs(H) * ZMID) / span;

  // ---- the three elevations. The view triangle beside each wall gives the
  // view direction d; the elevation's right-hand direction is d x z, and that
  // one line decides which END the slab force lands on.
  const VIEW = { A: [0, 1], B: [1, 0], C: [0, 1] };
  const nearest = (w, q) => (V.dist(w.a, q) <= V.dist(w.b, q) ? w.a : w.b);
  const ev = walls.map((w, i) => {
    const uf = P.unfold(w, VIEW[w.name]);
    const lam = sol.lam[i];
    // where the flow hands the force over, in plan: the wall end the tie runs to
    const at = w.name === 'A' ? nearest(w, P1) : w.name === 'C' ? nearest(w, P2) : w.mid;
    const two = w.name === 'B';
    // the slab pushes the wall with -lam along the wall's own axis
    const dirn = Math.sign(uf.toLocalDir(V.mul(w.u, -lam))) || 1;
    const mag = two ? Math.abs(T4) : Math.abs(lam);
    const loadX = two ? null : uf.toLocal(at);
    const inset = (LW - span) / 2;
    // moments about the LEFT support: a rightward force at height z lifts the
    // right-hand support and holds the left one down
    const Vr = two ? 0 : (ZMID * dirn * mag) / span;
    return { k: w.name, uf, lam, two, dirn, mag, loadX, inset,
             Vl: -Vr, Vr, Hpin: -dirn * mag, V: Math.abs(Vr) };
  });

  return { ev,
    walls, st, pts: st.points.length, sol, F: s.F, yF: s.yF, ang: s.ang,
    Fx: F[0], Fy: F[1], N, P1, P2,
    A, B, C, res: Math.max(...sol.check.map(Math.abs)),
    pure: Math.abs(F[1]) < 1e-9,
    RW: Math.hypot(...wr.f), yR: wr.y,
    N1, N2, L1, L2, a1: deg(u1), a2: deg(u2), u1, u2, d1, d2,
    T3, T4, T5, T6, span,
    VA: V_(A), VB: V_(B), VC: V_(C),
  };
}

// ------------------------------------------------------------------- view
export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  const px = (p) => [PO[0] + p[0] * MP, PO[1] + p[1] * MP];
  const ex = (i, x, z) => [EO[i][0] + x * ME, EO[i][1] + z * ME];
  const box = [0, 0, LX, LY];
  const CEN = [LX / 2, LY / 2];

  const sgn = (get) => ({ pending: PAL.black,
    final: (d) => (!d ? PAL.black : Math.abs(get(d)) < 1e-6 ? PAL.zero
      : get(d) > 0 ? PAL.red : PAL.blue) });
  // members whose stored value is POSITIVE in compression
  const sgnC = (get) => ({ pending: PAL.black,
    final: (d) => (!d ? PAL.black : Math.abs(get(d)) < 1e-6 ? PAL.zero
      : get(d) > 0 ? PAL.blue : PAL.red) });

  dw.label('tPlan', 'top view 1:200', { cls: 'title', flash: false });
  dw.label('tForce', 'force diagrams  1 cm ≙ 10 kN', { cls: 'title', flash: false });
  dw.label('tElev', 'form diagrams  1:100', { cls: 'title', flash: false });

  // ---- the plan
  dw.strokes('slab', 4, { intro: 1, w: dw.W.str, color: PAL.black });
  ['A', 'B', 'C'].forEach((k, i) => {
    dw.poly(`w${k}`, 4, { intro: 1, color: PAL.black, opacity: 1 });
    dw.label(`lw${k}`, `wall ${k}`, { cls: 'num', intro: 1, flash: false });
    dw.poly(`vt${k}`, 3, { intro: 1, color: PAL.black, opacity: 1, flash: false });
    dw.dashLine(`ax${k}`, { intro: 2, color: PAL.grey, dash: dw.W.dash });
    dw.arrow(`dir${k}`, { intro: 2, color: PAL.grey, flash: false,
      w: NARR.w * 0.8, headLen: NARR.headLen * 0.8, headW: NARR.headW * 0.8 });
  });
  for (const n of ['1', '2']) {
    dw.disk(`P${n}`, { intro: 3, r: dw.W.disk });
    dw.label(`lP${n}`, `P${n === '1' ? '₁' : '₂'}`, { cls: 'num', intro: 3 });
  }
  for (const [n, a, b] of [['16', [0, 0], [LX, 0]], ['12', [LX, 0], [LX, LY]],
                           ['5', [5, LY], [0, LY]]]) {
    dw.strokes(`dim${n}`, 5, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
    dw.label(`ldim${n}`, '', { intro: 1, flash: false, color: PAL.grey });
  }
  dw.dashLine('loa', { intro: 4, color: PAL.grey, dash: dw.W.dash });
  dw.arrow('Farr', { intro: 4, color: PAL.green, ...ARR });
  dw.label('lF', '', { cls: 'num', intro: 4, color: PAL.green });
  dw.disk('Nnode', { intro: 4, r: dw.W.disk });

  dw.seg('str1', { intro: 5, w: dw.W.bar, color: sgnC((d) => d.N1) });
  dw.seg('str2', { intro: 5, w: dw.W.bar, color: sgnC((d) => d.N2) });
  dw.label('lstr1', '', { cls: 'num', intro: 5, color: sgnC((d) => d.N1), when: (st) => st.lbl });
  dw.label('lstr2', '', { cls: 'num', intro: 5, color: sgnC((d) => d.N2), when: (st) => st.lbl });
  dw.seg('tie3', { intro: 6, w: dw.W.bar, color: sgn((d) => d.T3) });
  dw.seg('tie6', { intro: 6, w: dw.W.bar, color: sgn((d) => d.T6) });
  dw.seg('tie4', { intro: 6, w: dw.W.thin, color: sgn((d) => d.T4) });
  dw.seg('tie5', { intro: 6, w: dw.W.thin, color: sgn((d) => d.T5) });
  for (const n of ['tie3', 'tie6', 'tie4']) {
    dw.label(`l${n}`, '', { cls: 'num', intro: 6, when: (st) => st.lbl,
      color: sgn((d) => (n === 'tie3' ? d.T3 : n === 'tie6' ? d.T6 : d.T4)) });
  }
  ['A', 'B', 'C'].forEach((k) => {
    dw.arrow(`re${k}`, { intro: 6, color: PAL.green, ...NARR });
    dw.label(`lre${k}`, '', { cls: 'num', intro: 6, color: PAL.green });
  });

  // ---- the force diagrams
  dw.arrow('fF', { intro: 7, color: PAL.green, ...NARR });
  dw.seg('fS1', { intro: 7, w: dw.W.ray, color: sgnC((d) => d.N1) });
  dw.seg('fS2', { intro: 7, w: dw.W.ray, color: sgnC((d) => d.N2) });
  dw.label('lfF', '', { cls: 'point', intro: 7, flash: false, color: PAL.green });
  dw.label('lfNode', 'node N', { cls: 'point', intro: 7, flash: false });
  dw.seg('gS1', { intro: 7, w: dw.W.ray, color: sgnC((d) => d.N1) });
  dw.seg('gA', { intro: 7, w: dw.W.ray, color: sgn((d) => d.T3) });
  dw.seg('gT4', { intro: 7, w: dw.W.ray, color: sgn((d) => d.T4) });
  dw.label('lgNode', 'node P₁', { cls: 'point', intro: 7, flash: false });
  dw.link('str1', 'fS1', 'lstr1');
  dw.link('str2', 'fS2', 'lstr2');
  dw.link('str1', 'gS1');
  dw.link('tie3', 'gA', 'ltie3', 'reA');
  dw.link('tie4', 'gT4', 'ltie4');
  dw.ghostable('fF', 'fS1', 'fS2', 'gS1', 'gA', 'gT4');

  // ---- the three elevations
  for (let i = 0; i < 3; i++) {
    dw.strokes(`eOut${i}`, 4, { intro: 9, w: dw.W.str, color: PAL.black, flash: false });
    dw.strokes(`eOpen${i}`, 4, { intro: 9, w: dw.W.thin, color: PAL.black, flash: false,
      when: (st, d) => !!d && i > 0 });
    dw.dashLine(`eSlab${i}`, { intro: 9, color: PAL.grey, dash: dw.W.dash * 0.6, flash: false });
    dw.dashLine(`eMid${i}`, { intro: 9, color: PAL.grey, dash: dw.W.dash * 0.6, flash: false });
    dw.label(`eTit${i}`, '', { cls: 'title', intro: 9, flash: false });
    for (const n of ['L', 'R']) {
      dw.poly(`eSup${i}${n}`, 3, { intro: 9, color: PAL.black, opacity: 1, flash: false });
      dw.strokes(`eHat${i}${n}`, 4, { intro: 9, w: dw.W.dim, color: PAL.grey, flash: false });
      dw.arrow(`eV${i}${n}`, { intro: 9, color: PAL.green, ...NARR });
      dw.label(`elV${i}${n}`, '', { cls: 'num', intro: 9, color: PAL.green, when: (st) => st.lbl });
    }
    dw.arrow(`eH${i}`, { intro: 9, color: PAL.green, ...NARR });
    dw.label(`elH${i}`, '', { cls: 'num', intro: 9, color: PAL.green, when: (st) => st.lbl });
    dw.arrow(`eLoad${i}`, { intro: 9, color: PAL.green, ...NARR });
    dw.arrow(`eLoad2${i}`, { intro: 9, color: PAL.green, ...NARR,
      when: (st, d) => !!d && i === 1 });
    dw.label(`elLoad${i}`, '', { cls: 'num', intro: 9, color: PAL.green });
  }

  dw.instant('tPlan', 'tForce', 'tElev');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);

    dw.setLabel('tPlan', px([LX / 2, LY + 3.2]));
    dw.setLabel('tForce', [FO[0] + 10, FO[1] + 2.4]);
    dw.setLabel('tElev', [EO[1][0] + LW * ME / 2, EO[1][1] + HW * ME + 3.0]);

    // --- plan: slab, walls, axes
    const c = [px([0, 0]), px([LX, 0]), px([LX, LY]), px([0, LY])];
    dw.setStrokes('slab', c.map((p, i) => [p, c[(i + 1) % 4]]));
    const view = { A: [0, 1], B: [1, 0], C: [0, 1] };
    const LPOS = { A: [1.2, 9.6], B: [10.9, 4.2], C: [1.2, 2.4] };
    d.walls.forEach((w, i) => {
      const k = w.name;
      dw.setPoly(`w${k}`, w.ring.map(px));
      dw.setLabel(`lw${k}`, px(LPOS[k]));
      const vp = V.add(w.mid, V.mul(view[k], -1.15));
      dw.setPoly(`vt${k}`, P.viewTriangle(vp, view[k], 0.42).map(px));
      const seg = P.axisSeg(w, box, 2.2);
      if (seg) dw.setDashLine(`ax${k}`, seg.map(px));
      const q = V.add(w.mid, V.mul(w.u, k === 'B' ? 2.6 : 3.0));
      dw.setArrow(`dir${k}`, px(V.sub(q, V.mul(w.u, 1.5))), px(q));
    });
    dw.setDisk('P1', px(d.P1));
    dw.setDisk('P2', px(d.P2));
    dw.setLabel('lP1', px(V.add(d.P1, [1.0, 1.0])));
    dw.setLabel('lP2', px(V.add(d.P2, [1.0, -1.0])));

    for (const [n, a, b, off, txt] of [
      ['16', [LX, 0], [0, 0], 2.6, `${LX.toFixed(2)} m`],
      ['12', [LX, LY], [LX, 0], 1.4, `${LY.toFixed(2)} m`],
      ['5', [WB[0][0], 0], [0, 0], 4.6, `${WB[0][0].toFixed(2)} m`]]) {
      dw.setStrokes(`dim${n}`, P.dimStrokes(a, b, off, 0.34).map(([p, q]) => [px(p), px(q)]));
      dw.setLabel(`ldim${n}`, px(P.dimLabel(a, b, off, 0.8)));
      dw.setText(`ldim${n}`, txt);
    }

    // --- the load
    const dirF = [Math.cos((s.ang * Math.PI) / 180), Math.sin((s.ang * Math.PI) / 180)];
    const loa = P.lineOfAction(d.N, dirF, box, 2.0);
    if (loa) dw.setDashLine('loa', loa.map(px));
    const tail = V.sub(d.N, V.mul(dirF, d.F * SA));
    dw.setArrow('Farr', px(tail), px(d.N));
    dw.setLabel('lF', px(V.add(V.mid(tail, d.N), [0, 1.1])));
    dw.setText('lF', `F = ${d.F.toFixed(0)} kN`);
    dw.setDisk('Nnode', px(d.N));

    // --- the flow
    const endA = [LW, WA[0][1]], endC = [LW, WC[0][1]];
    const topB = WB[1], botB = WB[0];
    dw.setSeg('str1', px(d.N), px(d.P1));
    dw.setSeg('str2', px(d.N), px(d.P2));
    dw.setLabel('lstr1', px(V.add(V.mid(d.N, d.P1), V.mul(V.perp(d.u1), -1.15))));
    dw.setLabel('lstr2', px(V.add(V.mid(d.N, d.P2), V.mul(V.perp(d.u2), 1.15))));
    dw.setText('lstr1', `① ${Math.abs(d.N1).toFixed(2)}`);
    dw.setText('lstr2', `② ${Math.abs(d.N2).toFixed(2)}`);
    dw.setSeg('tie3', px(d.P1), px(endA));
    dw.setSeg('tie6', px(d.P2), px(endC));
    dw.setSeg('tie4', px(d.P1), px(topB));
    dw.setSeg('tie5', px(d.P2), px(botB));
    dw.setLabel('ltie3', px(V.add(V.mid(d.P1, endA), [0, -1.15])));
    dw.setLabel('ltie6', px(V.add(V.mid(d.P2, endC), [0, 1.15])));
    dw.setLabel('ltie4', px(V.add(V.mid(d.P1, topB), [1.9, 0])));
    dw.setText('ltie3', `③ ${Math.abs(d.T3).toFixed(2)}`);
    dw.setText('ltie6', `⑥ ${Math.abs(d.T6).toFixed(2)}`);
    dw.setText('ltie4', `④⑤ ${Math.abs(d.T4).toFixed(2)}`);

    // --- what the walls hand back, drawn on the wall's own axis
    const lamOf = { A: d.A, B: d.B, C: d.C };
    d.walls.forEach((w) => {
      const k = w.name;
      const out = V.dot(V.sub(w.mid, CEN), w.n) >= 0 ? 1 : -1;
      const at = V.add(w.mid, V.mul(w.n, 1.15 * out));
      const [t0, t1] = P.reactionArrow(w, lamOf[k], SA, at);
      dw.setArrow(`re${k}`, px(t0), px(t1));
      dw.setLabel(`lre${k}`, px(V.add(V.add(V.mid(t0, t1), V.mul(w.n, 1.05 * out)),
                                     k === 'B' ? [2.4, 0.9] : [0, 0])));
      dw.setText(`lre${k}`, `${k} = ${Math.abs(lamOf[k]).toFixed(2)} kN`);
    });

    // --- force diagram, node N: F closed by the two struts
    const o = FO;
    const p1 = V.add(o, V.mul([d.Fx, d.Fy], SF));
    const p2 = V.add(p1, V.mul(d.u1, -d.N1 * SF));
    dw.setArrow('fF', o, p1);
    dw.setSeg('fS1', p1, p2);
    dw.setSeg('fS2', p2, o);
    dw.setLabel('lfF', V.add(V.mid(o, p1), [0, 0.95]));
    dw.setText('lfF', `F = ${d.F.toFixed(1)} kN = ${(d.F / 10).toFixed(2)} cm`);
    dw.setLabel('lfNode', V.add(o, [-1.6, -1.2]));
    // node P1: the strut closed by wall A and by the tie down wall B
    const q0 = GO;
    const q1 = V.add(q0, V.mul(d.d1, SF));
    const q2 = V.add(q1, [-d.T3 * SF, 0]);
    dw.setSeg('gS1', q0, q1);
    dw.setSeg('gA', q1, q2);
    dw.setSeg('gT4', q2, q0);
    dw.setLabel('lgNode', V.add(q1, [2.4, 0.4]));

    // --- the three elevations
    d.ev.forEach((w, i) => {
      const box4 = [ex(i, 0, 0), ex(i, LW, 0), ex(i, LW, HW), ex(i, 0, HW)];
      dw.setStrokes(`eOut${i}`, box4.map((p, j) => [p, box4[(j + 1) % 4]]));
      const op = [ex(i, OPEN[0], OPEN[1]), ex(i, OPEN[2], OPEN[1]),
                  ex(i, OPEN[2], OPEN[3]), ex(i, OPEN[0], OPEN[3])];
      dw.setStrokes(`eOpen${i}`, op.map((p, j) => [p, op[(j + 1) % 4]]));
      dw.setDashLine(`eSlab${i}`, [ex(i, 0, HW - 0.40), ex(i, LW, HW - 0.40)]);
      dw.setDashLine(`eMid${i}`, [ex(i, -0.5, ZMID), ex(i, LW + 0.5, ZMID)]);
      dw.setLabel(`eTit${i}`, ex(i, LW / 2, -4.6));
      dw.setText(`eTit${i}`, `wall ${w.k} · 1:100`);
      const xs = { L: w.inset, R: LW - w.inset };
      const Vs = { L: w.Vl, R: w.Vr };
      for (const n of ['L', 'R']) {
        const b = ex(i, xs[n], 0);
        dw.setPoly(`eSup${i}${n}`, [b, [b[0] - 0.30, b[1] - 0.52], [b[0] + 0.30, b[1] - 0.52]]);
        dw.setStrokes(`eHat${i}${n}`,
          V.hatch([b[0] - 0.55, b[1] - 0.55], [b[0] + 0.55, b[1] - 0.55], -1, 0.34, 4));
        // a support force pointing UP is drawn below the support pushing up;
        // a hold-down is drawn from the support pointing down
        const L = Vs[n] * SEU;
        const y0 = b[1] - 0.75;
        dw.setArrow(`eV${i}${n}`, L >= 0 ? [b[0], y0 - L] : [b[0], y0], L >= 0 ? [b[0], y0] : [b[0], y0 + L]);
        dw.setLabel(`elV${i}${n}`, [b[0] + (n === 'L' ? 1.5 : -1.5), y0 - 0.55]);
        dw.setText(`elV${i}${n}`, `${Vs[n] >= 0 ? '↑' : '↓'} ${Math.abs(Vs[n]).toFixed(2)}`);
      }
      const bp = ex(i, xs.L, 0);
      const HL = w.Hpin * SEU;
      dw.setArrow(`eH${i}`, [bp[0] - HL, bp[1] - 0.30], [bp[0], bp[1] - 0.30]);
      dw.setLabel(`elH${i}`, [bp[0] - HL / 2, bp[1] - 3.3]);
      dw.setText(`elH${i}`, `H = ${Math.abs(w.Hpin).toFixed(2)}`);
      // the force the slab hands over, at the mid-plane z = 2.80
      const mag = w.mag * SEU;
      if (w.two) {
        const a0 = ex(i, 0, ZMID), a1 = ex(i, LW, ZMID);
        dw.setArrow(`eLoad${i}`, a0, [a0[0] - mag, a0[1]]);
        dw.setArrow(`eLoad2${i}`, a1, [a1[0] + mag, a1[1]]);
      } else {
        const t = ex(i, w.loadX, ZMID);
        dw.setArrow(`eLoad${i}`, [t[0] - w.dirn * mag, t[1]], t);
        dw.setArrow(`eLoad2${i}`, t, t);
      }
      dw.setLabel(`elLoad${i}`, ex(i, LW / 2, ZMID + 0.62));
      dw.setText(`elLoad${i}`, w.two ? `± ${w.mag.toFixed(2)} kN` : `${w.mag.toFixed(2)} kN`);
    });

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const g = panel.section('The load');
  panel.slider(g, s, 'F', 'F (kN)', 0, 200, 5, refresh, (v) => `${v.toFixed(0)} kN`);
  panel.slider(g, s, 'yF', 'y_F — where F enters (m)', 0, 12, 0.1, refresh,
    (v) => `${v.toFixed(2)} m${Math.abs(v - 6) < 1e-9 ? '  (the sheet)' : ''}`);
  panel.slider(g, s, 'ang', 'direction of F (°)', -60, 60, 5, refresh,
    (v) => `${v.toFixed(0)}°${v === 0 ? '  — B stays 0' : '  — B wakes up'}`);
  const w = panel.section('Idealisation');
  panel.toggle(w, s, 'span46', 'support span 4.60 m (else 5.00 m)', refresh);
  panel.toggle(w, s, 'lbl', 'show the numbers', refresh);

  refresh();
  return player;
}
