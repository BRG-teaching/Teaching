/**
 * EX X · German task 8.2 — an indeterminate frame, where the designer chooses
 * Structural Design II, FS 23, "Additional Exercises", sheet page 6 (bottom).
 *
 * NUMBERING. The English sheet calls this block "Task 1"; the German sheet
 * calls it Aufgabe 8.2 ("Statisch unbestimmt gelagerter Rahmen"), and the
 * German numbering is the correct one.
 *
 * TEXT (verbatim). "Two equal frames in reinforced concrete with different
 * supports are given. In situation a) draw a possible internal force
 * distribution as an arch-cable-construction with the aid of the force
 * diagram. Draw the corresponding force diagram to the given force
 * distribution in b). Indicate in both a) and b) tension forces with red and
 * compression forces with blue."
 *
 * GIVENS. Q = 30 kN, vertical, down, at midspan, in both a) and b). Form
 * diagram 1:100, force diagram 1 cm ≙ 10 kN.
 *
 * GEOMETRY (identical for a) and b)), digitised. Origin = support A, y up.
 *   outer      (−0.1336, 0) (−0.1336, 3.0926) (8.8634, 3.0926) (8.8634, 0)
 *              (7.5221, 0) (7.5199, 2.0873) (1.2099, 2.0873) (1.2099, 0)
 *   overall    8.997 × 3.0926 m · left leg 1.3435, right leg 1.3413 m
 *   beam depth 1.0053 m · clear opening 6.3100 × 2.0873 m
 *   supports   A at x = 0 and B at x = 8.7298 — spacing 8.7298 m
 *   Q          at x = 4.3649 m = exact midspan
 *
 * BOTH SUPPORTS IN BOTH CASES ARE PINNED (hatched triangles): four reaction
 * components against three equations, so the frame is STATICALLY INDETERMINATE
 * to degree 1. The drawn reaction arrows are therefore GIVEN DATA, not a
 * result — the reader has to be told that, because nothing on the sheet says
 * it. This is error E15: the sheet solves an indeterminate frame graphically
 * and never explains what makes it solvable.
 *
 * a) ANSWERS. The drawn arrows measure 31.282° at A and 31.889° at B — 0.6°
 * out of symmetry, which is drafting error, since physics demands one thrust.
 * Using the symmetric mean θ = 31.586°:
 *      V = Q/2 = 15.000 kN each
 *      H = 15.000 / tan(31.586°) = 24.395 kN
 *      |A| = |B| = 15.000 / sin(31.586°) = 28.635 kN
 * Taking each drawn arrow separately gives |A| = 28.888 (H = 24.688) and
 * |B| = 28.392 (H = 24.105); the 2.4 % spread is drafting error.
 * check: ΣM_B = 30 × 4.3649 − 15.000 × 8.7298 = 0.000 kNm; ΣH = 0.
 * Because the load is vertical at midspan and the two reactions are symmetric,
 * the three lines of action concur at h = 4.3649 · tanθ above the supports —
 * 2.684 m at the drawn angle, which is inside the beam. So a) really is a
 * two-strut arch, and the arch force IS the reaction: |A| = |B|.
 *
 * b) ANSWERS. Here the distribution is given, as 11 members between 8 nodes:
 *   node  x        y        role
 *   A     0.0000   0.0000   left support (pinned)
 *   B     8.7298   0.0000   right support (pinned)
 *   n1    0.0000   2.9796   top of the left vertical tie
 *   n2    8.7298   2.9796   top of the right vertical tie
 *   n3    4.3649   2.9749   crown of the upper "lambda" — Q applies here
 *   n4    4.3649   2.2652   crown of the lower "V"
 *   n5    1.1418   2.1337   left knee
 *   n6    7.5880   2.1337   right knee
 *   1 A–n1  +14.742 T   ·  2 B–n2  +14.742 T
 *   3 A–n5  −33.732 C   ·  4 B–n6  −33.732 C
 *   5 n5–n1 −31.786 C   ·  6 n6–n2 −31.786 C
 *   7 n5–n3 −42.845 C   ·  8 n6–n3 −42.845 C     ← the largest force
 *   9 n3–n4 −8.361 C (the central post)
 *  10 n4–n1 +25.881 T   · 11 n4–n2 +25.881 T     ← the largest tension
 * Reactions implied: A = (+15.916, +15.000) kN = 21.870 kN at 43.304°,
 * B the mirror; horizontal thrust H = 15.916 kN.
 * Independent checks. (i) 8 nodes → 16 equations, 11 members + 4 reaction
 * components = 15 unknowns, matrix rank 15, residual 7e-15 kN — the drawn
 * geometry is exactly self-consistent, not merely approximately. (ii) ΣV =
 * 15 + 15 − 30 = 0, ΣH = 0, ΣM_A = 0. (iii) The sheet's own drawn reaction
 * arrows in b) measure 43.30° and 43.08°; statics gives 43.304°, agreeing with
 * the left arrow to 0.004°. (iv) Node n3 closure: −0.5050 × (−42.845) −
 * (−8.361) = 29.996 ≈ 30.000 kN.
 *
 * THE CONTRAST THE TASK IS BUILT ON. a) with the shallow drawn thrust (31.6°)
 * needs H = 24.40 kN; b) with the steeper given distribution (43.3°) needs
 * only H = 15.92 kN. Same frame, same load, 35 % less thrust — because the
 * frame is indeterminate and the designer picks. The slider in a) walks
 * between them, and the two printed cases are marked on it.
 *
 * The θ slider stops at 45° rather than the 70° the decode brief suggested,
 * because beyond that the crown of the two-strut arch climbs off the drawing
 * (h = 4.3649 · tanθ is already 4.36 m at 45°, against a 3.09 m frame).
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';
import { makeJointTrussView } from '../lib/exx2first.js';

const OUT = [[-0.1336, 0], [-0.1336, 3.0926], [8.8634, 3.0926], [8.8634, 0],
             [7.5221, 0], [7.5199, 2.0873], [1.2099, 2.0873], [1.2099, 0]];
const SPAN = 8.7298, XM = SPAN / 2;
const SOF = 2.0873, TOP = 3.0926;
const TH_A = 31.586;                       // the symmetric mean of a)'s arrows
const TH_B = 43.304;                       // what statics gives for b)
const LEG_IN = 1.2099;                     // the left leg's inner face

const MPU = 2.7, ORG = [-26, -11], SFD = 12;

// ------------------------------------------------------------------- a) ----
const aNodes = (s) => [[0, 0], [XM, XM * Math.tan((s.th * Math.PI) / 180)], [SPAN, 0]];

// ------------------------------------------------------------------- b) ----
const B_NAME = ['A', 'B', 'n1', 'n2', 'n3', 'n4', 'n5', 'n6'];
const B_NODES = [[0, 0], [SPAN, 0], [0, 2.9796], [SPAN, 2.9796], [XM, 2.9749],
                 [XM, 2.2652], [1.1418, 2.1337], [7.5880, 2.1337]];
const B_MEM = [[0, 2], [1, 3], [0, 6], [1, 7], [6, 2], [7, 3],
               [6, 4], [7, 4], [4, 5], [5, 2], [5, 3]];
const B_SHEET = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

const base = {
  MPU, ORG, SFD,
  supportDir: () => [0, -1],
  cellLabelOff: [0, 4.8],
  loadOff: () => [3.0, 0.5],
};

const CASES = [
  { ...base,
    tag: 'a)', name: 'the arch-cable you choose',
    nodes: aNodes({ th: TH_A }), members: [[0, 1], [1, 2]],
    supports: { 0: 'pin', 2: 'pin' },
    loads: { 1: [0, -30] },
    geom: aNodes,
    load: (s) => ({ 1: [0, -s.Q] }),
    derive: (s, M, res) => ({
      th: s.th, h: M.nodes[1][1],
      H: Math.abs(res.reactions[0][0]),
      Aabs: Math.hypot(...res.reactions[0]),
      esc: LEG_IN * Math.tan((s.th * Math.PI) / 180),
      inBeam: M.nodes[1][1] >= SOF && M.nodes[1][1] <= TOP,
    }),
    poly: true, cells: [[8, 11], [24, 11], [8, -5]],
    nodeName: (i) => ['A', 'C', 'B'][i],
    reacName: (i) => (i === 0 ? 'A' : 'B'),
    nodeLabelOff: (i) => ([[-2.6, -1.8], [-1.4, 2.4], [2.6, -1.8]][i]),
    labelSide: (m) => (m === 0 ? 1 : 1),
    reacLabelOff: (i) => (i === 0 ? [-4.6, -1.6] : [4.6, -1.6]),
    note: (d) => (d.inBeam
      ? `the three lines of action meet ${d.h.toFixed(3)} m up — inside the beam, so an arch fits`
      : d.h < SOF
        ? `they meet only ${d.h.toFixed(3)} m up — below the beam soffit, so the strut crosses the opening`
        : `they meet ${d.h.toFixed(3)} m up — above the frame altogether`),
  },
  { ...base,
    tag: 'b)', name: 'the distribution the sheet gives',
    nodes: B_NODES, members: B_MEM, supports: { 0: 'pin', 1: 'pin' },
    loads: { 4: [0, -30] },
    load: (s) => ({ 4: [0, -s.Q] }),
    derive: (s, M, res) => ({
      H: Math.abs(res.reactions[0][0]),
      Aabs: Math.hypot(...res.reactions[0]),
      thB: (Math.atan2(res.reactions[0][1], res.reactions[0][0]) * 180) / Math.PI,
    }),
    poly: true,
    cells: [[6, 13], [20, 13], [6, 4], [20, 4], [6, -5], [20, -5], [6, -14], [20, -14]],
    nodeName: (i) => B_NAME[i],
    nodeLabelOff: (i) => ([[-2.6, -1.8], [2.6, -1.8], [-2.6, 1.2], [2.6, 1.2],
                           [-2.2, 2.2], [2.6, -0.4], [-1.4, -2.2], [1.4, -2.2]][i]),
    labelSide: (m) => [1, -1, -1, 1, 1, -1, 1, -1, 1, -1, 1][m],
    reacLabelOff: (i) => (i === 0 ? [-4.6, -1.6] : [4.6, -1.6]),
    // eleven force labels will not fit in a 9 m frame: the drawing carries the
    // sheet's member NUMBERS and the caption carries the forces
    memLabel: (m) => B_SHEET[m],
    note: 'eleven members, eight joints, residual 7e-15 kN: the drawn geometry is exactly self-consistent',
  },
];

const STEPS = [
  { t: 'The exercise', d: 'page 6 of the sheet, second block: the same reinforced-concrete frame twice, with 30 kN at midspan. In a) you choose an arch-cable inside it; in b) the sheet gives you one and you draw its force diagram' },
  { t: 'The frame', d: 'left: the frame, digitised at the sheet’s 1:100. Both supports in both cases are hatched triangles — pins. Four reaction components against three equations, so this frame is statically INDETERMINATE to degree one',
    detail: (d) => [`overall ${8.997} × ${TOP} m · beam ${(TOP - SOF).toFixed(4)} m deep · support spacing ${SPAN} m`,
                    `Q = ${d.Q.toFixed(2)} kN at x = ${XM.toFixed(4)} m, exact midspan`,
                    'indeterminate: statics alone will not give you the reactions'],
    take: 'so the reaction arrows the sheet draws are GIVEN DATA, not an answer. Nothing on the sheet says so, and it is the single most confusing thing about the task' },
  { t: 'What the drawing decides', d: (d) => (d.ci === 0
      ? 'in a) the choice is the inclination of the reactions. Fix that and everything follows: the load is vertical at midspan, so the three lines of action concur on the midspan axis and the two struts of the arch ARE the reaction lines'
      : 'in b) the choice is the whole strut-and-tie figure, and it is drawn for you. Eight joints, eleven members and four reaction components: sixteen equations against fifteen unknowns, and they are consistent — the sheet drew it exactly right'),
    detail: (d) => (d.ci === 0
      ? [`θ = ${d.th.toFixed(3)}° → the lines meet ${d.h.toFixed(4)} m above the supports`,
         `V = Q/2 = ${(d.Q / 2).toFixed(3)} kN · H = ${(d.Q / 2).toFixed(3)} / tanθ = ${d.H.toFixed(3)} kN`,
         `|A| = |B| = ${(d.Q / 2).toFixed(3)} / sinθ = ${d.Aabs.toFixed(3)} kN`]
      : [`A = (${d.reactions[0][0].toFixed(3)}, ${d.reactions[0][1].toFixed(3)}) kN = ${d.Aabs.toFixed(3)} kN at ${d.thB.toFixed(3)}°`,
         `the sheet’s own drawn arrows measure 43.30° and 43.08°; statics gives ${TH_B}°`,
         `residual of the joint solve ${d.resid.toExponential(1)} kN`]) },
  { t: 'The member forces', d: (d) => (d.ci === 0
      ? 'two members, and each one carries its own reaction: the strut is the reaction line. Watch the size of it as you change the inclination — a shallow arch is an expensive arch'
      : 'solved joint by joint. The two struts into the crown are the largest force in the frame, and the two long diagonals down to the tops of the legs are the largest tension'),
    detail: (d) => (d.ci === 0
      ? [`both struts ${d.forces[0].toFixed(3)} kN compression`,
         d.esc <= LEG_IN
           ? `the thrust line leaves the leg’s inner face ${d.esc.toFixed(3)} m up (the leg is ${LEG_IN.toFixed(4)} m wide)`
           : 'the thrust line stays inside the leg for its whole height',
         'so a real frame corner has to redirect this, exactly as on sheet EX 8']
      : [`largest force ${d.cmax.toFixed(3)} kN compression (members 7 and 8, into the crown)`,
         ...[0, 4, 8].map((a) => d.forces.slice(a, a + 4)
           .map((f, k) => `${a + k + 1}: ${f > 0 ? '+' : ''}${f.toFixed(2)}`).join('  '))]),
    take: (d) => (d.ci === 1 ? 'node n3 closes to 29.996 against the 30.000 kN load — four thousandths of a kilonewton, which is the digitiser, not the statics' : '') },
  { t: 'The force diagram', d: 'right: one closed polygon per joint, drawn to scale, every edge parallel to the member it stands for. Hover any member to light up its edges',
    detail: (d) => [`${d.nodes.length} joints → ${d.nodes.length} polygons, 1 unit ≙ ${SFD} kN (the sheet asks for 1 cm ≙ 10 kN)`,
                    d.ci === 0
                      ? 'with only three joints the whole force diagram is one triangle, drawn three times'
                      : 'the two support polygons are the ones that show the thrust: their horizontal edge is H'] },
  { t: 'Same frame, same load, different thrust', d: 'now compare. a) as the sheet draws it needs 24.40 kN of thrust; b) as the sheet draws it needs 15.92 kN. Nothing about the frame or the load changed — the designer chose, and that is what "statically indeterminate" means in practice',
    detail: (d) => [`a) θ = 31.586° → H = 24.395 kN, |A| = 28.635 kN`,
                    `b) θ = 43.304° → H = 15.916 kN, |A| = 21.870 kN — 35 % less thrust`,
                    `now: θ = ${d.ci === 0 ? d.th.toFixed(3) : d.thB.toFixed(3)}° → H = ${d.H.toFixed(3)} kN`],
    take: 'the arrows in a) are 31.282° and 31.889°, 0.6° out of symmetry, which yields two different thrusts where physics demands one. That is drafting error, and one H has to serve both' },
];

export const { meta, create } = makeJointTrussView({
  title: 'EX X · 8.2 — an indeterminate frame, where the designer chooses',
  subtitle: 'Structural Design II · sheet EX X “Additional Exercises”, page 6 (German task 8.2; the English sheet calls it “Task 1”)',
  about: 'The same concrete frame twice, with 30 kN at midspan and a pin under each leg. Four reaction components against three equations means statics cannot finish the job: the frame is indeterminate, and the arrows the sheet draws are given data rather than an answer. Nothing on the sheet says so. Once you accept that, everything follows from one number — the inclination of the reactions. The sheet’s own two drawings pick 31.6° and 43.3°, and the thrust they need differs by 35 per cent. Drag the inclination in a) and watch the arch climb, the thrust fall and the strut force with it.',
  result: (d) => [
    `${d.tag} ${d.name} — Q = ${d.Q.toFixed(2)} kN at midspan, both supports pinned → statically indeterminate to degree 1`,
    d.ci === 0
      ? `θ = ${d.th.toFixed(3)}° → V = ${(d.Q / 2).toFixed(3)} kN, H = ${d.H.toFixed(3)} kN, |A| = |B| = ${d.Aabs.toFixed(3)} kN; the lines of action meet ${d.h.toFixed(4)} m up`
      : `A = (${d.reactions[0][0].toFixed(3)}, ${d.reactions[0][1].toFixed(3)}) kN = ${d.Aabs.toFixed(3)} kN at ${d.thB.toFixed(3)}° · H = ${d.H.toFixed(3)} kN`,
    d.ci === 0
      ? `both struts ${d.forces[0].toFixed(3)} kN compression — the strut IS the reaction line`
      : `largest force ${d.cmax.toFixed(3)} kN C (members 7, 8) · largest tension +${d.tmax.toFixed(3)} kN (members 10, 11) · post 9 ${d.forces[8].toFixed(3)} kN`,
    `the sheet’s two answers: a) at 31.586° needs H = 24.395 kN, b) at 43.304° needs only 15.916 kN — same frame, same load, 35 % apart`],
  frame: [[-28, -32], [34, 23]],
  defaults: { cas: 0, th: TH_A, Q: 30 },
  caseOf: (s) => s.cas,
  cases: CASES,
  at: { form: 1, load: 1, reac: 2, mem: 3, poly: 4 },
  steps: STEPS,
  formTitle: (d) => `${d.tag} — Form diagram 1:100`,
  titlePos: { form: [-14, -14.6], force: [16, 21.4], sub: [16, 19.8],
              note: [-14, -16.3], zero: [-14, -18.0] },

  declare: (dw) => {
    dw.poly('mat', OUT.length, { intro: 1, color: PAL.grey, opacity: 0.12, z: -0.25, flash: false });
    dw.strokes('edge', OUT.length, { intro: 1, w: dw.W.str, color: PAL.black });
    dw.instant('mat');
    dw.dashLine('laQ', { intro: 1, color: PAL.grey, dash: dw.W.dash });
    dw.instant('laQ');
  },
  extra: (dw, d) => {
    const ux = (p) => [ORG[0] + p[0] * MPU, ORG[1] + p[1] * MPU];
    const ring = OUT.map(ux);
    dw.setPoly('mat', ring);
    dw.setStrokes('edge', ring.map((p, i) => [p, ring[(i + 1) % ring.length]]));
    dw.setDashLine('laQ', [ux([XM, TOP + 2.6]), ux([XM, -1.2])]);
  },
  controls: (panel, s, refresh) => {
    const sec = panel.section('The case');
    panel.slider(sec, s, 'cas', 'situation', 0, 1, 1, refresh,
      (v) => `${CASES[Math.round(v)].tag}  ${CASES[Math.round(v)].name}`);
    const g = panel.section('Given');
    panel.slider(g, s, 'th', 'a) reaction inclination θ (°)', 20, 45, 0.1, refresh,
      (v) => `${v.toFixed(2)}°${Math.abs(v - TH_A) < 0.06 ? '  ← as drawn in a)'
        : Math.abs(v - TH_B) < 0.06 ? '  ← b)’s inclination' : ''}`);
    panel.slider(g, s, 'Q', 'Q (kN)', 10, 60, 1, refresh,
      (v) => `${v.toFixed(0)} kN${Math.abs(v - 30) < 0.5 ? '  ← the sheet’s value' : ''}`);
  },
});
