/**
 * EX 10 · Task 5 — Redesigning the first floor: place the walls yourself
 * Structural Design II, FS 23 (sheet EX 10 "Bracing & Horizontal Forces", p. 4).
 *
 * TASK TEXT, verbatim:
 *   "A ceiling plate is considered on which a horizontal force F1 = 100 kN is
 *    applied.
 *    a) Place three 2.8m high structural walls in such a way that the system
 *       is braced. Sketch a possible internal force flow in the plate such
 *       that the forces can be transmitted through the walls into the floor.
 *       Draw the corresponding force diagram. Indicate tension forces with
 *       red, compression forces with blue and external forces with green.
 *    b) Design the side views of the three walls and draw them in scale in the
 *       form diagram. Complete the views with the respective qualitative force
 *       flow.
 *    c) Another force F2 = 100 kN now acts on the slab. Transfer your bracing
 *       scheme from a) and then complete the floor plan qualitatively with a
 *       possible internal force flow."
 *   (labels: `ceiling plate`, `new structural walls (2.8m)`, `F1`, `F2`;
 *    `top view 1:200`, three `form diagram wall X 1:100`,
 *    `force diagrams 1cm ≙ 10kN`)
 *
 * THE METHOD, stated because it is what makes the exercise honest
 * (compendium 10.1): a wall can only absorb a force ALONG ITS OWN AXIS, so
 * each wall is one force on one known line with one unknown magnitude. Three
 * walls give three unknowns against the three equilibrium equations of a body
 * in plane: the slab is STATICALLY DETERMINATE in plan, and pure statics on
 * the wall centrelines gives exactly what a stiffness-based sharing would
 * give. Not a simplification — a fact about having exactly three walls.
 *
 * GEOMETRY DIGITISED FROM p. 4 (nothing is dimensioned on the sheet):
 *   slab   16.00 x 12.00 m, both in 5a and 5c
 *   F1 = 100 kN, +x, applied at (0.00, 3.00) — measured 42.50 pt above the
 *        bottom edge. THIS IS NOT MID-HEIGHT, unlike tasks 2 and 3, and
 *        nothing on the sheet flags the change (decode brief §6.4).
 *   F2 = 100 kN, +y, applied at (13.00, 0.00) on the bottom edge.
 *   wall height 2.80 m (the sheet's own legend).
 *   NO WALLS ARE DRAWN: the student places them, so the layout below is a
 *   recommendation, fully worked.
 *
 * THE RECOMMENDED LAYOUT — all three walls on slab edges, 5.00 x 0.40 m, the
 * same family as tasks 2 and 3:
 *   wall A  (0.00, 0.20) – (5.00, 0.20)      horizontal, bottom left, takes x
 *   wall B  (11.00, 11.80) – (16.00, 11.80)  horizontal, top right, takes x
 *   wall C  (15.80, 3.50) – (15.80, 8.50)    vertical, right edge, takes y
 * Axes y = 0.20 and y = 11.80 are parallel, x = 15.80 is not, and there is no
 * common point: braced, and determinate.
 *
 * CASE a) — F1 = 100 kN at y = 3.00 m
 *   sum Fy = 0                        =>  C = 0
 *   moments about wall A's axis:  100 (3.00 - 0.20) = B (11.80 - 0.20)
 *                                     =>  B = 280.0/11.60 = 24.1379 kN
 *                                     =>  A = 100 - 24.1379 = 75.8621 kN
 *   check about y = 11.80: 100 x 8.80 = 880.0 = 75.8621 x 11.60  OK
 *   check resultant: (-100, 0) acting at
 *     y = (75.8621 x 0.20 + 24.1379 x 11.80)/100 = 3.000 m — collinear with
 *     F1, so no torsion, so C = 0. Consistent.
 *   force-diagram lengths at 1 cm = 10 kN: A 7.586 cm, B 2.414 cm, C 0,
 *     F1 10.000 cm.
 *
 * CASE c) — F1 plus F2 = 100 kN, +y, at x = 13.00 m
 *   sum Fy = 0                        =>  C = 100.00 kN in -y
 *   moments about (15.80, 0.20), a point on BOTH A's and C's axes:
 *     F1 gives -(3.00-0.20) x 100 = -280.0 and F2 gives
 *     (13.00-15.80) x 100 = -280.0, against -(11.80-0.20) B
 *                                     =>  B = 560.0/11.60 = 48.2759 kN
 *                                     =>  A = 100 - 48.2759 = 51.7241 kN
 *   check sum Fx = 100 - 51.7241 - 48.2759 = 0  OK
 *   check sum M about the origin: loads -300 + 1300 = +1000.0 kNm; walls
 *     10.345 + 569.655 - 1580 = -1000.0 kNm  OK
 *   the applied resultant is (100, 100), |R| = 141.42 kN at 45 degrees on the
 *     line x - y = 10, and the walls deliver exactly -R on that same line.
 *   force-diagram lengths: A 5.172 cm, B 4.828 cm, C 10.000 cm,
 *     F1 = F2 = 10.000 cm.
 *
 * THE FORCE FLOW, general and the same for every case here. The wall axes
 * cross in exactly two places; steer every load into those two points.
 *   P1 = A n C = (15.80, 0.20)     P2 = B n C = (15.80, 11.80)
 * Each load's entry node splits into two members, one to each crossing (a 2x2
 * solve). At a crossing the arriving force is decomposed onto the two wall
 * axes that meet there, and each component runs along its axis to its wall —
 * or is delivered on the spot when the crossing already lies on the wall,
 * which is what happens at P2, since P2 is inside wall B (x 11.00…16.00).
 * With F1 alone this produces, at 100 kN:
 *   entry (0.00, 3.00) -> P1  77.03 kN compression · -> P2  27.63 kN compression
 *   along wall A's axis  P1 -> (5.00, 0.20)   75.86 kN tension
 *   along wall C's axis  P1 -> (15.80, 3.50)  13.44 kN tension
 *                        P2 -> (15.80, 8.50)  13.44 kN tension
 *   into wall B at P2                         24.14 kN
 * The two 13.44 kN ties pull wall C's two ends in OPPOSITE directions and
 * cancel: that is what C = 0 looks like as a drawing.
 *
 * PART b), THE ELEVATIONS. Nothing is given, so this view designs them: 5.00 x
 * 2.80 m panels with a 1.00 x 2.10 m door, pin and roller 0.20 m in from each
 * end (support span 4.60 m, the same detailing as tasks 2 and 3 — the sheet
 * never states it in words, decode brief §6.10). The slab load arrives at the
 * top edge, z = 2.80 m, so every vertical support couple is H x 2.80/4.60 =
 * 0.60870 H. Internally each panel is the two-member model the supports force:
 * a vertical over the roller and a diagonal to the pin, because only the pin
 * can take H. Diagonal = H sqrt(span^2 + z^2)/span, vertical = H z/span.
 *
 * A WARNING WORTH BUILDING IN (decode brief §4.5). The layout students reach
 * for first is task 3's — A at x = 0.20, C at x = 15.80, B at y = 11.80. It is
 * braced, but with F1 at y = 3.00 and F2 at x = 13.00 it gives
 * A = 38.46, B = 100.00, C = 138.46 kN: wall C then carries 38 % MORE than the
 * total applied load in that direction. The recommended layout keeps every
 * wall at or below 100 kN. The panel offers both, side by side.
 *
 * ERRORS CARRIED (decode brief §6):
 *   4. F1 is at y = 3.00 m, NOT mid-height, unlike tasks 2 and 3, and the
 *      sheet does not flag it. Said out loud in step 1.
 *   7. English 5a says "external forces with green" where 2b and 3b say
 *      "reaction forces"; the German says "äussere Kräfte" throughout.
 *      External is used.
 *  10. the support idealisation is never stated; 4.60 m is assumed and the
 *      5.00 m reading is offered in the panel.
 *
 * Every number is recomputed in compute(); the sliders move the answer.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';
import * as P from '../lib/plan.js';

// ------------------------------------------------------------------ givens
const LX = 16.00, LY = 12.00, TW = 0.40, WLEN = 5.00;
const HWALL = 2.80;                            // "new structural walls (2.8m)"
const DOOR = [2.00, 0.00, 3.00, 2.10];         // the door this view designs

const SC = P.pageScales(2.0);
const MP = SC.plan, ME = SC.elev, SF = SC.force;
const SA = 0.040;                              // plan arrows are symbols, m per kN
const SEU = 0.080;                             // elevation arrows, units per kN

// the plan is the only thing in the left column, and the two UI cards pin it:
// the step caption reaches down to y ≈ 6.2 and the RESULT card up to
// y ≈ -13.2, so the slab sits low and its title/dimension margins are tight
const PO = [-38, -7.8];
const EO = [[0, -14], [15, -14], [30, -14]];
const GO = [20, -2];                           // the global force polygon
const NO = [[10, 20], [4, 2]];                 // the two entry-node polygons

// the two layouts the view compares
const LAYOUTS = [
  { n: 'recommended', w: [['A', [0.00, 0.20], [5.00, 0.20]],
                          ['B', [11.00, 11.80], [16.00, 11.80]],
                          ['C', [15.80, 3.50], [15.80, 8.50]]] },
  { n: 'the task-3 layout', w: [['A', [0.20, 0.00], [0.20, 5.00]],
                                ['B', [11.00, 11.80], [16.00, 11.80]],
                                ['C', [15.80, 0.00], [15.80, 5.00]]] },
];

const DEFAULTS = { F1: 100, F2: 100, yF1: 3.00, xF2: 13.00,
                   f2: false, alt: false, span46: true, lbl: true, _k: 99 };

export const meta = {
  title: 'EX 10.5 — you place the walls, and one of them does nothing',
  subtitle: 'Structural Design II · sheet EX 10 “Bracing & Horizontal Forces”, task 5 a)–c)',
  about: 'The last task hands over a bare 16 by 12 metre slab with a 100 kN push on it and says: put three walls in, 2.8 metres high, so that it is braced. There is no single right answer, so this view recommends one and works it completely — two walls along opposite edges to take the push and share the twist, one up the right-hand edge to take anything across. With the first force alone that third wall carries exactly nothing, because the two others already line their resultant up with the load. Then a second 100 kN arrives from a different direction and the third wall earns its keep. The panel also offers the layout students reach for first, which is braced and still a worse design: one of its walls ends up carrying 38 % more than the whole applied load.',
  result: (d) => [
    `layout ${d.lay.n}: A ${d.walls[0].a.map((v) => v.toFixed(2)).join(',')}→${d.walls[0].b.map((v) => v.toFixed(2)).join(',')}, B top right, C right edge`,
    `${d.f2 ? 'c) F1 + F2' : 'a) F1 alone'}: A = ${Math.abs(d.A).toFixed(4)} · B = ${Math.abs(d.B).toFixed(4)} · C = ${Math.abs(d.C).toFixed(4)} kN`,
    `at 1 cm ≙ 10 kN: A ${(Math.abs(d.A) / 10).toFixed(3)} · B ${(Math.abs(d.B) / 10).toFixed(3)} · C ${(Math.abs(d.C) / 10).toFixed(3)} · F1 ${(d.F1 / 10).toFixed(3)}${d.f2 ? ` · F2 ${(d.F2 / 10).toFixed(3)}` : ''} cm`,
    d.f2
      ? `resultant ${d.Rmag.toFixed(2)} kN at ${d.Rang.toFixed(1)}°, M ${d.Rmom.toFixed(1)} kNm about O — the walls undo exactly that`
      : `both x-walls put their resultant on F1's own line y = ${d.yR === null ? '—' : d.yR.toFixed(3)} m ⇒ C = 0`,
    `struts ${d.struts.map((t) => Math.abs(t).toFixed(2)).join('/')} kN into P₁ ${d.pts[0] ? `${d.pts[0][0].toFixed(2)},${d.pts[0][1].toFixed(2)}` : ''} and P₂ ${d.pts[1] ? `${d.pts[1][0].toFixed(2)},${d.pts[1][1].toFixed(2)}` : ''}`,
    `b) walls ${HWALL.toFixed(2)} m high, span ${d.span.toFixed(2)} m — base H and V, wall by wall:`,
    d.ev.map((w) => `${w.k} → ${Math.abs(w.H).toFixed(2)}, ±${w.V.toFixed(2)}`).join(' · ') + ' kN',
    d.alt ? `WARNING: ${Math.max(Math.abs(d.A), Math.abs(d.B), Math.abs(d.C)).toFixed(2)} kN into one wall — more than either applied force`
          : `worst wall ${Math.max(Math.abs(d.A), Math.abs(d.B), Math.abs(d.C)).toFixed(2)} kN; the task-3 layout would reach ${d.altWorst.toFixed(2)} kN`],
  frame: [[-42, -26], [44, 26]],
};

const STEPS = [
  { t: 'The exercise', d: 'EX 10 task 5: a bare slab, a 100 kN push, and an instruction to put three 2.8 metre walls in so that it holds. There is no unique answer — so this recommends one, works it completely, and then shows what happens when a second force arrives from another direction' },
  { t: 'What is given', d: (d) => `the ceiling plate, 16 by 12 metres at 1:200, and F1 = ${d.F1.toFixed(0)} kN entering at the left edge on y = ${d.yF1.toFixed(2)} m. Note that height: it is NOT the slab's mid-height, unlike tasks 2 and 3, and the sheet never says so`,
    detail: (d) => [`slab ${LX.toFixed(2)} × ${LY.toFixed(2)} m · no walls drawn — you place them`,
                    `F1 = ${d.F1.toFixed(2)} kN at (0.00, ${d.yF1.toFixed(2)}), direction +x`,
                    `mid-height would be ${(LY / 2).toFixed(2)} m — this is ${(LY / 2 - d.yF1).toFixed(2)} m below it`],
    take: 'walls 2.80 m high, so the load arrives 2.80 m above their base' },
  { t: 'Three walls, placed', d: (d) => `${d.lay.n}: two walls along opposite edges to take the push and share the twist between them, and one up the right-hand edge for anything acting across the slab. All three 5.00 by 0.40 metres, all on an edge so they are out of the way`,
    detail: (d) => d.walls.map((w) => `wall ${w.name}  (${w.a[0].toFixed(2)}, ${w.a[1].toFixed(2)}) – (${w.b[0].toFixed(2)}, ${w.b[1].toFixed(2)})  takes ${Math.abs(w.u[0]) > 0.5 ? 'x' : 'y'}`),
    take: 'try the other layout in the panel: it is braced too, and it is a worse design' },
  { t: 'Braced?', d: (d) => `two of the axes are parallel and the third is not, and no point lies on all three — so ${d.st.braced ? 'the slab can neither slide nor spin: braced' : 'it is NOT braced'}. Two crossings, and those two points are where the whole force flow is going to be steered`,
    detail: (d) => [`${d.st.n} independent axes · ${d.st.why}`,
                    ...d.pts.map((p, i) => `P${i + 1} = (${p[0].toFixed(2)}, ${p[1].toFixed(2)})`)] },
  { t: 'The flow', d: 'the load cannot reach the walls directly, so it is steered into the two crossings. At the entry point it splits into two members, one aimed at each crossing; at each crossing the arriving force is taken apart along the two wall axes that meet there, and each part runs along its axis to its wall',
    detail: (d) => [...d.struts.map((t, i) => (d.nodes[Math.floor(i / 2)]
                      ? `F${Math.floor(i / 2) + 1} entry → P${i % 2 + 1} : ${Math.abs(t).toFixed(2)} kN ${t < 0 ? 'compression' : 'tension'}`
                      : '')).filter(Boolean),
                    ...d.links.filter((m) => m.len > 1e-6).map((m) =>
                      `along wall ${m.wall}'s axis, ${m.len.toFixed(2)} m : ${Math.abs(m.force).toFixed(2)} kN ${m.tension ? 'tension' : 'compression'}`)],
    take: 'P₂ already lies inside wall B, so that part of the load is delivered on the spot with no member at all' },
  { t: (d) => (d.f2 ? 'c) Both forces' : 'a) The answer with F1 alone'),
    d: (d) => (d.f2
      ? `with F2 as well the third wall finally does something: C takes the whole ${Math.abs(d.C).toFixed(2)} kN of the new force, and the two edge walls re-share the horizontal between them`
      : `wall C carries NOTHING. Not because it is badly placed, but because walls A and B have already put their resultant on F1's own line — ${Math.abs(d.A).toFixed(2)} at y = 0.20 and ${Math.abs(d.B).toFixed(2)} at y = 11.80 average out to y = ${d.yR === null ? '—' : d.yR.toFixed(2)} m, exactly where F1 came in. No eccentricity, no torsion, nothing left for C`),
    detail: (d) => [`A = ${Math.abs(d.A).toFixed(4)} kN · B = ${Math.abs(d.B).toFixed(4)} kN · C = ${Math.abs(d.C).toFixed(4)} kN`,
                    d.f2 ? `Σ F_x = ${d.F1.toFixed(1)} − ${Math.abs(d.A).toFixed(4)} − ${Math.abs(d.B).toFixed(4)} = ${(d.F1 - Math.abs(d.A) - Math.abs(d.B)).toFixed(6)} ✓`
                         : `moments about y = 0.20: ${d.F1.toFixed(1)} × ${(d.yF1 - 0.20).toFixed(2)} = ${(d.F1 * (d.yF1 - 0.2)).toFixed(1)} = B × 11.60 ✓`,
                    `residual of the three equilibrium equations: ${d.res.toExponential(1)}`] },
  { t: 'The force diagram', d: (d) => (d.f2
      ? 'at 1 cm ≙ 10 kN. Two loads and three reactions close a proper polygon — F1 across, F2 up, then A and B back along the top and C straight down'
      : 'at 1 cm ≙ 10 kN. With F1 alone every external force is horizontal, so the polygon collapses onto a single line: 10.00 cm out and 7.586 + 2.414 cm back. A force diagram that is a straight line is exactly what "no force across the slab" looks like'),
    detail: (d) => [`F1 ${(d.F1 / 10).toFixed(3)} cm${d.f2 ? ` · F2 ${(d.F2 / 10).toFixed(3)} cm` : ''}`,
                    `A ${(Math.abs(d.A) / 10).toFixed(3)} cm · B ${(Math.abs(d.B) / 10).toFixed(3)} cm · C ${(Math.abs(d.C) / 10).toFixed(3)} cm`,
                    `and the node triangles beside the plan, one per load`] },
  { t: 'c) A second force', d: (d) => `F2 = ${d.F2.toFixed(0)} kN pushes up through x = ${d.xF2.toFixed(2)} m. Turn it on in the panel. Now the applied resultant is ${d.Rmag.toFixed(1)} kN at ${d.Rang.toFixed(0)}°, it is no longer parallel to the two edge walls, and wall C has to close it`,
    detail: (d) => [`F2 = ${d.F2.toFixed(2)} kN at (${d.xF2.toFixed(2)}, 0.00), direction +y`,
                    d.f2 ? `A = ${Math.abs(d.A).toFixed(4)}, B = ${Math.abs(d.B).toFixed(4)}, C = ${Math.abs(d.C).toFixed(4)} kN`
                         : 'F2 is off — switch it on in the panel',
                    `the same three walls serve both cases, which is what part c) asks for`],
    take: 'the same bracing scheme has to work for a) and c) — that is the real constraint of the task' },
  { t: 'b) The three elevations', d: (d) => `2.80 m high, 5.00 m long, at 1:100, with a door — the sheet leaves the design to you. The slab load lands on the top edge and the pin and roller near the base turn it into a horizontal reaction and a vertical couple. Only the pin can take H, so the diagonal always runs to it`,
    detail: (d) => d.ev.map((w) => `wall ${w.k}: ${w.loads.map((L) => `${Math.abs(L.f).toFixed(2)}`).join(' + ')} kN at z = ${HWALL.toFixed(2)} m → H ${Math.abs(w.H).toFixed(2)}, V ±${w.V.toFixed(2)} kN`),
    take: (d) => (Math.abs(d.C) < 1e-6
      ? 'wall C gets two equal and opposite pulls at its two ends: it stands in tension along its length and delivers no base shear at all'
      : 'wall C now has a real base shear') },
  { t: 'The answer', d: (d) => `${d.f2 ? 'c)' : 'a)'} A = ${Math.abs(d.A).toFixed(3)} kN, B = ${Math.abs(d.B).toFixed(3)} kN, C = ${Math.abs(d.C).toFixed(3)} kN with this layout. Switch to the task-3 layout in the panel and watch one wall go to ${d.altWorst.toFixed(1)} kN — braced, and a worse design`,
    detail: (d) => [`a)  A = 75.862, B = 24.138, C = 0 kN`,
                    `c)  A = 51.724, B = 48.276, C = 100.000 kN`,
                    `currently: A = ${Math.abs(d.A).toFixed(3)}, B = ${Math.abs(d.B).toFixed(3)}, C = ${Math.abs(d.C).toFixed(3)} kN (${d.lay.n}${d.f2 ? ', both forces' : ', F1 alone'})`],
    take: 'braced is the minimum. Which of the braced layouts you choose decides how big the walls have to be' },
];

// ------------------------------------------------------------------ maths
/** Route every load into the two axis crossings and share it out. */
function flow(walls, pts, loads) {
  const struts = [], links = [], nodes = [];
  const alpha = walls.map(() => 0);
  // which two walls meet at each crossing
  const at = pts.map((p) => walls.map((w, i) => i).filter((i) => P.onAxis(walls[i], p, 1e-6)));
  const D = pts.map(() => [0, 0]);
  for (const L of loads) {
    if (Math.hypot(...L.f) < 1e-9) { struts.push(0, 0); nodes.push(null); continue; }
    const u = pts.map((p) => V.unit(V.sub(p, L.at)));
    const den = V.cross(u[0], u[1]);
    const T0 = Math.abs(den) < 1e-9 ? 0 : V.cross(V.mul(L.f, -1), u[1]) / den;
    const T1 = Math.abs(den) < 1e-9 ? 0 : V.cross(u[0], V.mul(L.f, -1)) / den;
    struts.push(T0, T1);
    nodes.push({ at: L.at, f: L.f, u, T: [T0, T1] });
    D[0] = V.add(D[0], V.mul(u[0], -T0));      // force delivered at each crossing
    D[1] = V.add(D[1], V.mul(u[1], -T1));
  }
  // decompose each crossing's force onto the two wall axes meeting there
  pts.forEach((p, k) => {
    const [i, j] = at[k];
    if (i === undefined || j === undefined) return;
    const ui = walls[i].u, uj = walls[j].u;
    const den = V.cross(ui, uj);
    if (Math.abs(den) < 1e-9) return;
    const a = V.cross(D[k], uj) / den;
    const b = V.cross(ui, D[k]) / den;
    [[i, a], [j, b]].forEach(([wi, mag]) => {
      alpha[wi] += mag;
      const w = walls[wi];
      const t = V.dot(V.sub(p, w.a), w.u);
      const inside = t > -1e-9 && t < w.len + 1e-9;
      const target = inside ? p : (t < 0 ? w.a : w.b);
      const len = V.dist(p, target);
      const f = V.mul(w.u, mag);                       // force delivered to the wall
      const dir = len > 1e-9 ? V.unit(V.sub(target, p)) : w.u;
      links.push({ k, wall: w.name, wi, from: p, to: target, len, force: mag,
                   tension: V.dot(f, dir) < 0, at: target, f });
    });
  });
  return { struts, links, nodes, alpha, D, at };
}

function solveCase(layout, loads, span) {
  const walls = layout.w.map(([n, a, b]) => P.makeWall(n, a, b, TW));
  const sol = P.solvePlan(walls, loads.filter((L) => Math.hypot(...L.f) > 1e-9));
  const st = P.stability(walls);
  const pts = st.points.slice(0, 2);
  const fl = pts.length === 2 ? flow(walls, pts, loads) : { struts: [], links: [], nodes: [], alpha: [0, 0, 0] };

  // the three elevations. The view direction of each wall is chosen so that
  // you look at it from outside the slab; right = d x z decides the ends.
  const CEN = [LX / 2, LY / 2];
  const ev = walls.map((w, i) => {
    // the sheet views every horizontal wall along +y and every vertical wall
    // along +x, so walls of one orientation always unfold the same way round
    const d = Math.abs(w.u[0]) > Math.abs(w.u[1]) ? [0, 1] : [1, 0];
    const uf = P.unfold(w, d);
    const mine = fl.links.filter((m) => m.wi === i);
    const loads2 = mine.map((m) => ({ x: Math.max(0, Math.min(WLEN, uf.toLocal(m.at))),
                                      f: uf.toLocalDir(m.f) }));
    const H = loads2.reduce((a, L) => a + L.f, 0);
    const inset = (WLEN - span) / 2;
    const xPin = H >= 0 ? WLEN - inset : inset;        // the pin downstream of the push
    const xRoll = H >= 0 ? inset : WLEN - inset;
    const sgnp = Math.sign(xPin - xRoll) || 1;
    const L = Math.hypot(span, HWALL);
    const Vr = (HWALL * H) / span;
    return { k: w.name, uf, loads: loads2, H, inset, xPin, xRoll, span,
             Td: -Math.sign(H || 1) * sgnp * Math.abs(H) * L / span,
             Tv: Math.sign(H || 1) * sgnp * Math.abs(H) * HWALL / span,
             Vl: -Vr, Vr, V: Math.abs(Vr), Hpin: -H };
  });
  return { walls, sol, st, pts, ...fl, ev };
}

function compute(s) {
  const lay = LAYOUTS[s.alt ? 1 : 0];
  const loads = [{ at: [0, s.yF1], f: [s.F1, 0] },
                 { at: [s.xF2, 0], f: [0, s.f2 ? s.F2 : 0] }];
  const span = s.span46 ? 4.60 : 5.00;
  const r = solveCase(lay, loads, span);
  const A = r.sol.lam[0], B = r.sol.lam[1], C = r.sol.lam[2];
  const wr = P.wallResultant(r.walls, r.sol.lam);
  const R = [s.F1, s.f2 ? s.F2 : 0];
  // the other layout, for the warning line
  const alt = solveCase(LAYOUTS[s.alt ? 0 : 1], loads, span);
  return { ...r, lay, loads, A, B, C, F1: s.F1, F2: s.F2, yF1: s.yF1, xF2: s.xF2,
           f2: s.f2, alt: s.alt, span,
           res: Math.max(...r.sol.check.map(Math.abs)),
           yR: wr.y, RW: Math.hypot(...wr.f),
           Rmag: Math.hypot(...R), Rang: (Math.atan2(R[1], R[0]) * 180) / Math.PI,
           Rmom: -s.yF1 * s.F1 + (s.f2 ? s.xF2 * s.F2 : 0),
           flowCheck: Math.max(...r.alpha.map((a, i) => Math.abs(-a - r.sol.lam[i]))),
           altWorst: Math.max(...alt.sol.lam.map(Math.abs)) };
}

// ------------------------------------------------------------------- view
export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  const px = (p) => [PO[0] + p[0] * MP, PO[1] + p[1] * MP];
  const ex = (i, x, z) => [EO[i][0] + x * ME, EO[i][1] + z * ME];
  const box = [0, 0, LX, LY];
  const CEN = [LX / 2, LY / 2];
  const NL = 4;                                  // axis-member slots

  const tie = (get) => ({ pending: PAL.black,
    final: (d) => (!d ? PAL.black : Math.abs(get(d)) < 1e-6 ? PAL.zero
      : get(d) > 0 ? PAL.red : PAL.blue) });

  dw.label('tPlan', 'top view 1:200', { cls: 'title', flash: false });
  dw.label('tForce', 'force diagram  1 cm ≙ 10 kN', { cls: 'title', flash: false });
  dw.label('tElev', 'form diagrams 1:100 — new structural walls, 2.80 m', { cls: 'title', flash: false });

  dw.strokes('slab', 4, { intro: 1, w: dw.W.str, color: PAL.black });
  for (const n of ['16', '12']) {
    dw.strokes(`dim${n}`, 5, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
    dw.label(`ldim${n}`, '', { intro: 1, flash: false, color: PAL.grey });
  }
  dw.dashLine('loa1', { intro: 1, color: PAL.grey, dash: dw.W.dash });
  dw.arrow('F1', { intro: 1, color: PAL.green, ...ARR });
  dw.label('lF1', '', { cls: 'num', intro: 1, color: PAL.green });
  dw.dashLine('loa2', { intro: 7, color: PAL.grey, dash: dw.W.dash, when: (st) => st.f2 });
  dw.arrow('F2', { intro: 7, color: PAL.green, ...ARR, when: (st) => st.f2 });
  dw.label('lF2', '', { cls: 'num', intro: 7, color: PAL.green, when: (st) => st.f2 });

  ['A', 'B', 'C'].forEach((k, i) => {
    dw.poly(`w${k}`, 4, { intro: 2, color: PAL.black, opacity: 1 });
    dw.label(`lw${k}`, `wall ${k}`, { cls: 'num', intro: 2, flash: false });
    dw.poly(`vt${k}`, 3, { intro: 2, color: PAL.black, opacity: 1, flash: false });
    dw.dashLine(`ax${k}`, { intro: 3, color: PAL.grey, dash: dw.W.dash });
    dw.arrow(`re${k}`, { intro: 5, color: PAL.green, ...NARR });
    dw.label(`lre${k}`, '', { cls: 'num', intro: 5, color: PAL.green });
  });
  for (const n of ['1', '2']) {
    dw.disk(`P${n}`, { intro: 3, r: dw.W.disk });
    dw.label(`lP${n}`, `P${n === '1' ? '₁' : '₂'}`, { cls: 'num', intro: 3 });
  }
  // the struts from each entry node to each crossing
  for (let i = 0; i < 4; i++) {
    dw.seg(`st${i}`, { intro: 4, w: dw.W.bar, color: tie((d) => d.struts[i] ?? 0),
      when: (st, d) => !!d && (i < 2 || st.f2) });
    dw.label(`lst${i}`, '', { cls: 'num', intro: 4, color: tie((d) => d.struts[i] ?? 0),
      when: (st, d) => !!d && st.lbl && (i < 2 || st.f2) });
  }
  // the members that run along a wall axis from a crossing to its wall
  for (let i = 0; i < NL; i++) {
    dw.seg(`lk${i}`, { intro: 4, w: dw.W.bar,
      color: tie((d) => (d.links[i] ? (d.links[i].tension ? 1 : -1) * Math.abs(d.links[i].force) : 0)),
      when: (st, d) => !!d && !!d.links[i] && d.links[i].len > 1e-6 });
    dw.label(`llk${i}`, '', { cls: 'num', intro: 4, when: (st, d) => !!d && st.lbl && !!d.links[i] && d.links[i].len > 1e-6,
      color: tie((d) => (d.links[i] ? (d.links[i].tension ? 1 : -1) * Math.abs(d.links[i].force) : 0)) });
  }

  // ---- the force diagrams
  dw.arrow('gF1', { intro: 6, color: PAL.green, ...NARR });
  dw.arrow('gF2', { intro: 6, color: PAL.green, ...NARR, when: (st) => st.f2 });
  dw.arrow('gA', { intro: 6, color: PAL.green, ...NARR });
  dw.arrow('gB', { intro: 6, color: PAL.green, ...NARR });
  dw.arrow('gC', { intro: 6, color: PAL.green, ...NARR, when: (st) => st.f2 });
  for (const [n, t] of [['gF1', 'F1'], ['gF2', 'F2'], ['gA', 'A'], ['gB', 'B'], ['gC', 'C']]) {
    dw.label(`l${n}`, t, { cls: 'num', intro: 6, color: PAL.green,
      when: (st) => st.f2 || (n !== 'gF2' && n !== 'gC') });
  }
  for (let i = 0; i < 2; i++) {
    dw.arrow(`nf${i}`, { intro: 6, color: PAL.green, ...NARR,
      when: (st, d) => !!d && (i === 0 || st.f2) });
    dw.seg(`nr${i}0`, { intro: 6, w: dw.W.ray, color: tie((d) => d.struts[2 * i] ?? 0),
      when: (st, d) => !!d && (i === 0 || st.f2) });
    dw.seg(`nr${i}1`, { intro: 6, w: dw.W.ray, color: tie((d) => d.struts[2 * i + 1] ?? 0),
      when: (st, d) => !!d && (i === 0 || st.f2) });
    dw.label(`ln${i}`, '', { cls: 'point', intro: 6, flash: false,
      when: (st, d) => !!d && (i === 0 || st.f2) });
    dw.link(`st${2 * i}`, `nr${i}0`, `lst${2 * i}`);
    dw.link(`st${2 * i + 1}`, `nr${i}1`, `lst${2 * i + 1}`);
  }
  dw.link('F1', 'gF1', 'nf0');
  dw.link('F2', 'gF2', 'nf1');
  dw.ghostable('gF1', 'gF2', 'gA', 'gB', 'gC', 'nr00', 'nr01', 'nr10', 'nr11');

  // ---- the three elevations
  for (let i = 0; i < 3; i++) {
    dw.strokes(`eOut${i}`, 4, { intro: 8, w: dw.W.str, color: PAL.black, flash: false });
    dw.strokes(`eDoor${i}`, 3, { intro: 8, w: dw.W.thin, color: PAL.black, flash: false });
    dw.dashLine(`eMid${i}`, { intro: 8, color: PAL.grey, dash: dw.W.dash * 0.6, flash: false });
    dw.label(`eTit${i}`, '', { cls: 'title', intro: 8, flash: false });
    dw.seg(`eDiag${i}`, { intro: 8, w: dw.W.bar,
      color: tie((d) => d.ev[i].Td) });
    dw.seg(`eVert${i}`, { intro: 8, w: dw.W.thin, color: tie((d) => d.ev[i].Tv) });
    dw.label(`elDiag${i}`, '', { cls: 'num', intro: 8, when: (st) => st.lbl,
      color: tie((d) => d.ev[i].Td) });
    for (const n of ['L', 'R']) {
      dw.poly(`eSup${i}${n}`, 3, { intro: 8, color: PAL.black, opacity: 1, flash: false });
      dw.strokes(`eHat${i}${n}`, 4, { intro: 8, w: dw.W.dim, color: PAL.grey, flash: false });
      dw.arrow(`eV${i}${n}`, { intro: 8, color: PAL.green, ...NARR });
      dw.label(`elV${i}${n}`, '', { cls: 'num', intro: 8, color: PAL.green, when: (st) => st.lbl });
    }
    dw.arrow(`eH${i}`, { intro: 8, color: PAL.green, ...NARR });
    dw.label(`elH${i}`, '', { cls: 'num', intro: 8, color: PAL.green, when: (st) => st.lbl });
    for (let j = 0; j < 2; j++) {
      dw.arrow(`eLd${i}_${j}`, { intro: 8, color: PAL.green, ...NARR,
        when: (st, d) => !!d && j < d.ev[i].loads.length });
      dw.label(`elLd${i}_${j}`, '', { cls: 'num', intro: 8, color: PAL.green,
        when: (st, d) => !!d && j < d.ev[i].loads.length });
    }
  }

  dw.instant('tPlan', 'tForce', 'tElev');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);

    dw.setLabel('tPlan', px([2.0, 12.8]));
    dw.setLabel('tForce', [GO[0] - 7, GO[1]]);
    dw.setLabel('tElev', [EO[0][0] + WLEN * ME / 2 + 7, EO[1][1] + HWALL * ME + 2.8]);

    // --- the plan
    const c = [px([0, 0]), px([LX, 0]), px([LX, LY]), px([0, LY])];
    dw.setStrokes('slab', c.map((p, i) => [p, c[(i + 1) % 4]]));
    for (const [n, a, b, off, txt] of [
      ['16', [LX, 0], [0, 0], 4.0, `${LX.toFixed(2)} m`],
      ['12', [0, LY], [0, 0], 1.6, `${LY.toFixed(2)} m`]]) {
      dw.setStrokes(`dim${n}`, P.dimStrokes(a, b, off, 0.34).map(([p, q]) => [px(p), px(q)]));
      dw.setLabel(`ldim${n}`, px(P.dimLabel(a, b, off, 0.6)));
      dw.setText(`ldim${n}`, txt);
    }
    const l1 = P.lineOfAction([0, d.yF1], [1, 0], box, 2.4);
    if (l1) dw.setDashLine('loa1', l1.map(px));
    dw.setArrow('F1', px([-d.F1 * SA, d.yF1]), px([0, d.yF1]));
    dw.setLabel('lF1', px([-d.F1 * SA / 2, d.yF1 + 1.1]));
    dw.setText('lF1', `F1 = ${d.F1.toFixed(0)} kN`);
    const l2 = P.lineOfAction([d.xF2, 0], [0, 1], box, 2.4);
    if (l2) dw.setDashLine('loa2', l2.map(px));
    dw.setArrow('F2', px([d.xF2, -d.F2 * SA]), px([d.xF2, 0]));
    dw.setLabel('lF2', px([d.xF2 - 3.4, -d.F2 * SA / 2]));
    dw.setText('lF2', `F2 = ${d.F2.toFixed(0)} kN`);

    d.walls.forEach((w, i) => {
      const k = w.name;
      dw.setPoly(`w${k}`, w.ring.map(px));
      const out = V.dot(V.sub(w.mid, CEN), w.n) >= 0 ? 1 : -1;
      dw.setLabel(`lw${k}`, px(V.sub(V.add(w.mid, V.mul(w.n, -1.5 * out)), V.mul(w.u, 1.6))));
      const vd = Math.abs(w.u[0]) > Math.abs(w.u[1]) ? [0, 1] : [1, 0];
      const vp = V.sub(w.mid, V.mul(vd, 1.15));
      dw.setPoly(`vt${k}`, P.viewTriangle(vp, vd, 0.42).map(px));
      const seg = P.axisSeg(w, box, 2.2);
      if (seg) dw.setDashLine(`ax${k}`, seg.map(px));
      const lam = d.sol.lam[i];
      const at = V.add(w.mid, V.mul(w.n, 1.8 * out));
      const [t0, t1] = P.reactionArrow(w, lam, SA, at);
      dw.setArrow(`re${k}`, px(t0), px(t1));
      // wall B's reaction sits along the slab's top edge, where the caption
      // card reaches down at the wordier steps, so its label steps sideways
      dw.setLabel(`lre${k}`, px(k === 'B' ? V.add(V.mid(t0, t1), [3.6, -0.8])
        : V.add(V.mid(t0, t1), V.mul(w.n, 1.2 * out))));
      dw.setText(`lre${k}`, `${k} = ${Math.abs(lam).toFixed(2)} kN`);
    });
    d.pts.forEach((p, i) => {
      dw.setDisk(`P${i + 1}`, px(p));
      dw.setLabel(`lP${i + 1}`, px(V.add(p, i ? [-3.6, 1.1] : [1.7, -1.3])));
    });

    // --- the flow
    d.nodes.forEach((nd, i) => {
      for (let j = 0; j < 2; j++) {
        const key = 2 * i + j;
        if (!nd) { dw.setSeg(`st${key}`, px([0, 0]), px([0, 0])); continue; }
        dw.setSeg(`st${key}`, px(nd.at), px(d.pts[j]));
        dw.setLabel(`lst${key}`, px(V.add(V.mid(nd.at, d.pts[j]),
          V.mul(V.perp(nd.u[j]), j ? 1.2 : -1.2))));
        dw.setText(`lst${key}`, `${Math.abs(d.struts[key]).toFixed(2)}`);
      }
    });
    for (let i = 0; i < NL; i++) {
      const m = d.links[i];
      if (!m) { dw.setSeg(`lk${i}`, px([0, 0]), px([0, 0])); continue; }
      dw.setSeg(`lk${i}`, px(m.from), px(m.to));
      const nn = V.perp(V.unit(V.sub(m.to, m.from)));
      dw.setLabel(`llk${i}`, px(V.add(V.mid(m.from, m.to), V.mul(nn, 1.2))));
      dw.setText(`llk${i}`, `${Math.abs(m.force).toFixed(2)}`);
    }

    // --- the global force polygon: F1, F2, A, B, C tip to tail
    let p = GO;
    // the three horizontal edges are collinear whenever F2 is off, so their
    // labels are staggered rather than stacked on one line
    const OFF = { gF1: [0, 1.5], gF2: [-4.2, 0], gA: [0, -1.5], gB: [-3.4, -1.5], gC: [-3.6, 0] };
    const step = (n, v) => {
      const q = V.add(p, V.mul(v, SF));
      dw.setArrow(n, p, q);
      dw.setLabel(`l${n}`, V.add(V.mid(p, q), OFF[n]));
      p = q;
    };
    step('gF1', [d.F1, 0]);
    step('gF2', [0, d.f2 ? d.F2 : 0]);
    step('gA', V.mul(d.walls[0].u, d.sol.lam[0]));
    step('gB', V.mul(d.walls[1].u, d.sol.lam[1]));
    step('gC', V.mul(d.walls[2].u, d.sol.lam[2]));
    dw.setText('lgF1', `F1 ${(d.F1 / 10).toFixed(2)} cm`);
    dw.setText('lgF2', `F2 ${(d.F2 / 10).toFixed(2)} cm`);
    dw.setText('lgA', `A ${(Math.abs(d.A) / 10).toFixed(3)}`);
    dw.setText('lgB', `B ${(Math.abs(d.B) / 10).toFixed(3)}`);
    dw.setText('lgC', `C ${(Math.abs(d.C) / 10).toFixed(3)}`);

    // --- one closed triangle per entry node
    d.nodes.forEach((nd, i) => {
      const o = NO[i];
      if (!nd) {
        dw.setArrow(`nf${i}`, o, o);
        dw.setSeg(`nr${i}0`, o, o);
        dw.setSeg(`nr${i}1`, o, o);
        return;
      }
      const a = V.add(o, V.mul(nd.f, SF));
      const b = V.add(a, V.mul(nd.u[0], nd.T[0] * SF));
      dw.setArrow(`nf${i}`, o, a);
      dw.setSeg(`nr${i}0`, a, b);
      dw.setSeg(`nr${i}1`, b, o);
      dw.setLabel(`ln${i}`, V.add(o, i === 0 ? [22, -1.3] : [-2.2, -1.3]));
      dw.setText(`ln${i}`, `node F${i + 1}`);
    });

    // --- the elevations
    d.ev.forEach((w, i) => {
      const box4 = [ex(i, 0, 0), ex(i, WLEN, 0), ex(i, WLEN, HWALL), ex(i, 0, HWALL)];
      dw.setStrokes(`eOut${i}`, box4.map((q, j) => [q, box4[(j + 1) % 4]]));
      dw.setStrokes(`eDoor${i}`, [[ex(i, DOOR[0], 0), ex(i, DOOR[0], DOOR[3])],
                                  [ex(i, DOOR[0], DOOR[3]), ex(i, DOOR[2], DOOR[3])],
                                  [ex(i, DOOR[2], DOOR[3]), ex(i, DOOR[2], 0)]]);
      dw.setDashLine(`eMid${i}`, [ex(i, -0.5, HWALL), ex(i, WLEN + 0.5, HWALL)]);
      dw.setLabel(`eTit${i}`, ex(i, WLEN / 2, -4.6));
      dw.setText(`eTit${i}`, `wall ${w.k} · 1:100`);
      const top = ex(i, w.xRoll, HWALL);
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
      for (let j = 0; j < 2; j++) {
        const L = w.loads[j];
        if (!L) { dw.setArrow(`eLd${i}_${j}`, ex(i, 0, 0), ex(i, 0, 0)); continue; }
        const t = ex(i, L.x, HWALL);
        const inward = L.x < WLEN / 2 ? 1 : -1;
        const dirn = Math.sign(L.f) || 1;
        const far = [t[0] + inward * Math.abs(L.f) * SEU, t[1]];
        dw.setArrow(`eLd${i}_${j}`, dirn === inward ? t : far, dirn === inward ? far : t);
        dw.setLabel(`elLd${i}_${j}`, [(t[0] + far[0]) / 2, t[1] + 1.0]);
        dw.setText(`elLd${i}_${j}`, `${Math.abs(L.f).toFixed(2)} kN`);
      }
    });

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const g = panel.section('The loads');
  panel.slider(g, s, 'F1', 'F1 (kN)', 0, 200, 5, refresh, (v) => `${v.toFixed(0)} kN`);
  panel.slider(g, s, 'yF1', 'F1 enters at y = (m)', 0.3, 11.7, 0.1, refresh,
    (v) => `${v.toFixed(2)} m${Math.abs(v - 3) < 1e-9 ? '  (the sheet)' : ''}`);
  panel.toggle(g, s, 'f2', 'c) add F2 = 100 kN in +y', refresh);
  panel.slider(g, s, 'F2', 'F2 (kN)', 0, 200, 5, refresh, (v) => `${v.toFixed(0)} kN`);
  panel.slider(g, s, 'xF2', 'F2 enters at x = (m)', 0.5, 15.5, 0.1, refresh,
    (v) => `${v.toFixed(2)} m${Math.abs(v - 13) < 1e-9 ? '  (the sheet)' : ''}`);
  const w = panel.section('The design');
  panel.toggle(w, s, 'alt', 'use the task-3 layout instead (braced, worse)', refresh);
  panel.toggle(w, s, 'span46', 'support span 4.60 m (else 5.00 m)', refresh);
  panel.toggle(w, s, 'lbl', 'show the numbers', refresh);

  refresh();
  return player;
}
