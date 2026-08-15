/**
 * EX X · German task 6 — one beam, five force paths, one chord force
 * Structural Design II, FS 23, "Additional Exercises", sheet page 4.
 *
 * NUMBERING. The English sheet calls this block "Task 1" — one of three blocks
 * with that label. The German sheet calls it Aufgabe 6, used here.
 *
 * TEXT (verbatim). "Draw the force diagrams for the given distribution of
 * internal forces for the beams in a) - c). For the cases d) and e), the force
 * diagram is already provided. Indicate tension forces with red and
 * compression forces with blue. Compare in f) the distribution of internal
 * forces in a) - c) with the versions in d) and e)."
 *
 * GIVENS. F1 = F2 = 25 kN, vertical, down, in all five cases. Form diagrams
 * 1:100, force diagrams 1 cm ≙ 10 kN.
 *
 * GEOMETRY, digitised (the sheet prints no dimensions). Beam outline
 * 9.911 × 1.723 m; the internal chord system spans L = 9.6216 m with an
 * internal depth d = 1.4355 m. Pin left, roller right. Loads at L/4 =
 * 2.4054 m and L/2 = 4.8108 m (digitised at 0.2577 L and 0.4998 L).
 *
 *   A = 31.25 kN, B = 18.75 kN in every case
 *   M(L/4) = 75.169 kNm · M(L/2) = 90.203 kNm
 *
 * ANSWERS (all derived here; the sheet prints none for a) – c)).
 *
 * a) ARCH AND TIE. The drawn polygon rises to 1.1970 m at L/4 and 1.4355 m at
 *    midspan; the exact funicular ratio is 75.169 / 90.203 = 0.83333 against
 *    the measured 1.1970 / 1.4355 = 0.8338, so the printed shape IS the true
 *    funicular and the view uses the exact one.
 *      H = M(L/2) / d = 90.203 / 1.4355 = 62.84 kN  →  tie +62.84 T
 *      arch  −70.18 / −63.15 / −65.57 C
 * b) CABLE AND STRUT. The exact mirror image about the beam axis. Same
 *    magnitudes, every sign reversed: strut −62.84 C, cable +70.18 / +63.15 /
 *    +65.57 T.
 * c) LENS. Both chords spring from the same two end points and open to
 *    ±0.5981 m at L/4 and ±0.7178 m at midspan, total midspan depth
 *    z = 1.4355 m. Each chord carries half of each load, so each has
 *      H = (M(L/2)/2) / (z/2) = M(L/2) / z = 62.84 kN
 *    and the segments come out ∓64.76 / ∓62.90 / ∓63.53. The arch thrust and
 *    the cable pull cancel: there is NO external horizontal reaction.
 *    The sheet draws the loads on the beam axis, between the two chords. To
 *    get half into each chord something has to spread them, so this view draws
 *    the two short posts on the load lines that the sheet leaves out; they
 *    come out at 12.50 kN compression each.
 * d) TRUSS, 12 numbered members. Panel L/4, depth d.
 *      1 B0–T1 −60.98 · 2 B0–B1 +52.36 · 3 T1–B1 +6.25 · 4 T1–T2 −52.36
 *      5 B1–T2 −12.20 · 6/9 B1–B3 +62.84 · 7 T2–T3 −31.42 · 8 T2–B3 −36.59
 *      10 T3–B3 +18.75 · 11 T3–B4 −36.59 · 12 B3–B4 +31.42
 *    Members 6 and 9 are ONE physical bar; the sheet splits the label where
 *    the F2 load line crosses it, and its own printed force diagram admits
 *    this by marking a single point "6/9".
 * e) TRUSS, 21 members. Reactions come out 31.23 / 18.77 rather than
 *    31.25 / 18.75 because the digitised load lines are at 2.412 and 4.811 m
 *    rather than exactly L/4 and L/2. Governing force: member 8, B1–B2,
 *    +61.07 kN at e)'s own drawn depth of 1.4350 m — and +61.05 kN at the
 *    1.4355 m the shared depth slider starts from, since one slider drives all
 *    five cases.
 *    Ten independent segment lengths of the sheet's own printed force diagrams
 *    were digitised and agree with these numbers to better than 1 %.
 *
 * THE POINT OF THE PAGE. a), b) and c) are three completely different force
 * paths and all three give the SAME 62.84 kN chord force, because all three
 * have the same internal lever arm of 1.4355 m at midspan. d) and e) reach the
 * same 62.84 kN in their bottom chord too. Move the depth slider and all five
 * rise together as 1/d.
 *
 * f) IS ALREADY ANSWERED ON THE TASK SHEET, in German, in the English version
 * too, and its last two lines overlap the ruled line beneath them in the
 * render — a translation bug and a layout bug at once. Translation:
 * "Situations a) to c) show a solution with an arch-cable structure inside the
 * beam. For such a solution in reinforced concrete the tension elements have
 * to be prestressed, otherwise large cracks can form in the concrete. In
 * variants d) and e) a truss is formed inside the beam. Here the forces are
 * better distributed and so are the cracks (many small cracks instead of one
 * large crack). Prestressing is therefore not needed."
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';
import { makeJointTrussView, funicular } from '../lib/exx2first.js';

const L = 9.6216, DEP = 1.4355;
const XS = [2.4054, 4.8108];
const F_SHEET = 25;

const fun = (s) => funicular(XS, [s.F, s.F], 0, L, 1);   // H = 1 → raw moments
const HofState = (s) => fun(s).M(L / 2) / s.dep;         // the chord thrust

// --------------------------------------------------------------- a) --------
const archNodes = (s, sign) => {
  const f = fun(s);
  const H = HofState(s);
  return [[0, 0], [XS[0], (sign * f.M(XS[0])) / H], [XS[1], (sign * f.M(XS[1])) / H],
          [L, 0]];
};
const CHORD_MEM = [[0, 1], [1, 2], [2, 3], [0, 3]];      // 3 segments + the chord

const chordSolve = (sign) => (s, M) => {
  const H = HofState(s);
  const f = funicular(XS, [s.F, s.F], 0, L, H);
  const forces = M.members.map(([i, j], m) => {
    if (m === 3) return sign * H;                        // the straight chord
    const a = M.nodes[i], b = M.nodes[j];
    return -sign * H * (V.dist(a, b) / Math.abs(b[0] - a[0]));
  });
  return { forces, reactions: { 0: [0, f.R0], 3: [0, f.R1] } };
};

// --------------------------------------------------------------- c) --------
// 0 left end · 1,2 upper chord · 3 right end · 4,5 lower chord
const LENS_MEM = [[0, 1], [1, 2], [2, 3],                // 0-2  upper chord
                  [0, 4], [4, 5], [5, 3],                // 3-5  lower chord
                  [1, 4], [2, 5]];                       // 6-7  the two posts
const lensNodes = (s) => {
  const f = fun(s);
  const H = HofState(s);                                 // = M(L/2) / z
  const h = XS.map((x) => f.M(x) / (2 * H));
  return [[0, 0], [XS[0], h[0]], [XS[1], h[1]], [L, 0],
          [XS[0], -h[0]], [XS[1], -h[1]]];
};
const lensSolve = (s, M) => {
  const H = HofState(s);
  const f = funicular(XS, [s.F, s.F], 0, L, H);
  const seg = (i, j, sign) => {
    const a = M.nodes[i], b = M.nodes[j];
    return sign * H * (V.dist(a, b) / Math.abs(b[0] - a[0]));
  };
  const forces = [
    seg(0, 1, -1), seg(1, 2, -1), seg(2, 3, -1),         // upper: compression
    seg(0, 4, +1), seg(4, 5, +1), seg(5, 3, +1),         // lower: tension
    -s.F / 2, -s.F / 2,                                  // the two posts
  ];
  return { forces, reactions: { 0: [0, f.R0], 3: [0, f.R1] } };
};

// --------------------------------------------------------------- d) --------
const PAN = L / 4;
const D_BASE = [[0, 0], [PAN, 0], [3 * PAN, 0], [4 * PAN, 0],
                [PAN, 1], [2 * PAN, 1], [3 * PAN, 1]];   // y = 1 → scaled below
const D_MEM = [[0, 4], [0, 1], [4, 1], [4, 5], [1, 5], [1, 2],
               [5, 6], [5, 2], [6, 2], [6, 3], [2, 3]];
const D_SHEET = ['1', '2', '3', '4', '5', '6/9', '7', '8', '10', '11', '12'];
const D_NAME = ['B0', 'B1', 'B3', 'B4', 'T1', 'T2', 'T3'];

// --------------------------------------------------------------- e) --------
const E_NAME = ['A', 'U1', 'T1', 'B1', 'M1', 'T2', 'B2', 'M2', 'T3', 'B3', 'U2', 'B4'];
const E_BASE = [[0, 0], [0.812, 0.5], [2.412, 1], [2.412, 0], [3.212, 0.5],
                [4.811, 1], [4.811, 0], [6.410, 0.5], [7.210, 1], [7.210, 0],
                [8.810, 0.5], [9.622, 0]];               // y in units of 1.4350
const E_MEM = [[0, 1], [0, 3], [1, 2], [1, 3], [2, 4], [3, 4], [2, 5], [3, 6],
               [4, 5], [4, 6], [5, 6], [5, 7], [6, 7], [5, 8], [6, 9], [7, 8],
               [7, 9], [8, 10], [9, 10], [9, 11], [10, 11]];

// ---------------------------------------------------------------------------

const SFD = 14;
const POLY_MPU = 2.3, POLY_ORG = [-26, -6];
const WIDE_MPU = 4.2, WIDE_ORG = [-26, -8];

const base = {
  supports: { 0: 'pin' },
  supportDir: () => [0, -1],
  reacLabelOff: (i) => (i === 0 ? [-3.8, -0.4] : [3.8, -0.4]),
  loadOff: () => [2.8, 0.5],
  cellLabelOff: [0, 5.0],
  MPU: POLY_MPU, ORG: POLY_ORG, SFD,
};

const CASES = [
  { ...base,
    tag: 'a)', name: 'arch and tie',
    nodes: archNodes({ F: F_SHEET, dep: DEP }, +1), members: CHORD_MEM,
    supports: { 0: 'pin', 3: 'roller-v' },
    loads: { 1: [0, -F_SHEET], 2: [0, -F_SHEET] },
    geom: (s) => archNodes(s, +1),
    load: (s) => ({ 1: [0, -s.F], 2: [0, -s.F] }),
    solve: chordSolve(+1),
    derive: (s, M, res) => ({ H: Math.abs(res.forces[3]), chord: res.forces[3],
                              chordName: 'tie', rise: M.nodes[2][1] }),
    poly: true, cells: [[8, 10], [24, 10], [8, -4], [24, -4]],
    nodeName: (i) => ['A', 'n1', 'n2', 'B'][i],
    nodeLabelOff: (i) => (i === 0 ? [-2.6, -1.6] : i === 3 ? [2.6, -1.6] : [0, 2.2]),
    labelSide: (m) => (m === 3 ? -1 : 1),
    note: 'the tie takes the whole thrust, so the pin carries no horizontal force',
  },
  { ...base,
    tag: 'b)', name: 'cable and strut — a) turned upside down',
    nodes: archNodes({ F: F_SHEET, dep: DEP }, -1), members: CHORD_MEM,
    supports: { 0: 'pin', 3: 'roller-v' },
    loads: { 1: [0, -F_SHEET], 2: [0, -F_SHEET] },
    geom: (s) => archNodes(s, -1),
    load: (s) => ({ 1: [0, -s.F], 2: [0, -s.F] }),
    solve: chordSolve(-1),
    derive: (s, M, res) => ({ H: Math.abs(res.forces[3]), chord: res.forces[3],
                              chordName: 'strut', rise: -M.nodes[2][1] }),
    poly: true, cells: [[8, 10], [24, 10], [8, -4], [24, -4]],
    nodeName: (i) => ['A', 'n1', 'n2', 'B'][i],
    nodeLabelOff: (i) => (i === 0 ? [-2.6, 1.6] : i === 3 ? [2.6, 1.6] : [0, -2.2]),
    labelSide: (m) => (m === 3 ? 1 : -1),
    note: 'identical magnitudes to a), every sign reversed — a mirror is still a solution',
  },
  { ...base,
    tag: 'c)', name: 'lens — an arch and a cable at once',
    nodes: lensNodes({ F: F_SHEET, dep: DEP }), members: LENS_MEM,
    supports: { 0: 'pin', 3: 'roller-v' },
    loads: { 1: [0, -F_SHEET], 2: [0, -F_SHEET] },
    geom: lensNodes,
    load: (s) => ({ 1: [0, -s.F], 2: [0, -s.F] }),
    solve: lensSolve,
    derive: (s, M, res) => ({ H: HofState(s),
                              chord: res.forces[0], chordName: 'each chord',
                              rise: M.nodes[2][1] - M.nodes[5][1] }),
    poly: true,
    cells: [[8, 12], [24, 12], [8, 2], [24, 2], [8, -8], [24, -8]],
    nodeName: (i) => ['A', 'u1', 'u2', 'B', 'l1', 'l2'][i],
    nodeLabelOff: (i) => ([[-2.6, -1.6], [0, 2.2], [0, 2.2], [2.6, -1.6],
                           [0, -2.2], [0, -2.2]][i]),
    labelSide: (m) => (m < 3 ? 1 : m < 6 ? -1 : 1),
    note: 'arch thrust and cable pull cancel inside the beam: no horizontal reaction at all',
  },
  { ...base,
    tag: 'd)', name: 'truss, 12 numbered members — force diagram given',
    nodes: D_BASE.map(([x, y]) => [x, y * DEP]), members: D_MEM,
    supports: { 0: 'pin', 3: 'roller-v' },
    loads: { 4: [0, -F_SHEET], 5: [0, -F_SHEET] },
    geom: (s) => D_BASE.map(([x, y]) => [x, y * s.dep]),
    load: (s) => ({ 4: [0, -s.F], 5: [0, -s.F] }),
    derive: (s, M, res) => ({ H: Math.abs(res.forces[5]), chord: res.forces[5],
                              chordName: 'the bottom chord 6/9', rise: s.dep }),
    poly: false,
    MPU: WIDE_MPU, ORG: WIDE_ORG,
    nodeName: (i) => D_NAME[i],
    reacName: (i) => (i === 0 ? 'A' : 'B'),
    nodeLabelOff: (i) => (i < 4 ? [0, -2.6] : [0, 2.6]),
    labelSide: (m) => [1, -1, 1, 1, 1, -1, 1, 1, 1, 1, -1][m],
    memLabel: (m, d) => `${D_SHEET[m]}: ${d.forces[m] > 0 ? '+' : ''}${d.forces[m].toFixed(2)}`,
    note: 'members 6 and 9 are ONE bar — the sheet splits the label where the F2 load line crosses it',
  },
  { ...base,
    tag: 'e)', name: 'truss, 21 members — force diagram given',
    nodes: E_BASE.map(([x, y]) => [x, y * 1.4350]), members: E_MEM,
    supports: { 0: 'pin', 11: 'roller-v' },
    loads: { 2: [0, -F_SHEET], 5: [0, -F_SHEET] },
    geom: (s) => E_BASE.map(([x, y]) => [x, y * s.dep]),
    load: (s) => ({ 2: [0, -s.F], 5: [0, -s.F] }),
    derive: (s, M, res) => ({ H: Math.abs(res.forces[7]), chord: res.forces[7],
                              chordName: 'member 8, B1–B2', rise: s.dep }),
    poly: false,
    MPU: WIDE_MPU, ORG: WIDE_ORG,
    nodeName: (i) => E_NAME[i],
    reacName: (i) => (i === 0 ? 'A' : 'B'),
    nodeLabelOff: (i) => (E_BASE[i][1] === 0 ? [0, -2.6] : E_BASE[i][1] === 1 ? [0, 2.6] : [0, 1.9]),
    labelSide: (m) => (m % 2 ? 1 : -1),
    // 21 force labels will not fit inside a 9.6 m beam: the drawing carries
    // the sheet's member NUMBERS and the caption carries the forces
    memLabel: (m) => `${m + 1}`,
    note: 'the reactions read 31.23 / 18.77, not 31.25 / 18.75: the digitised load lines sit at 2.412 and 4.811 m',
  },
];

const STEPS = [
  { t: 'The exercise', d: 'page 4 of the sheet: one beam, one pair of 25 kN loads, and five different ways of carrying them. Draw the force diagrams for a) to c); d) and e) already have theirs printed; then compare them in f)' },
  { t: 'The beam', d: 'left: the case on show. The outline is always the same 9.911 by 1.723 m beam; what changes is what is drawn inside it. Switch cases in the panel',
    detail: (d) => [`${d.tag} ${d.name}`,
                    `internal span L = ${L} m, internal depth d = ${d.dep.toFixed(4)} m`,
                    `F1 = F2 = ${d.F.toFixed(2)} kN at L/4 and L/2`] },
  { t: 'The reactions', d: 'the same in all five cases, because the loads and the span are the same. Nothing inside a beam can change what its supports have to carry',
    detail: (d) => [`A = ${Math.hypot(...d.reactions[0]).toFixed(2)} kN · B = ${Math.hypot(...(d.reactions[3] || d.reactions[11])).toFixed(2)} kN`,
                    `M(L/4) = ${fun(d).M(XS[0]).toFixed(3)} kNm · M(L/2) = ${fun(d).M(L / 2).toFixed(3)} kNm`,
                    `ΣV: ${(2 * d.F).toFixed(2)} kN in, ${(2 * d.F).toFixed(2)} kN out ✓`] },
  { t: 'The internal forces', d: 'now what is inside. In a) to c) the shape is given and the forces follow from it; in d) and e) the truss is given and the forces come out of the joints',
    detail: (d) => [d.ci < 3
      ? `H = M(L/2) / ${d.ci === 2 ? 'z' : 'd'} = ${fun(d).M(L / 2).toFixed(3)} / ${d.dep.toFixed(4)} = ${d.H.toFixed(2)} kN`
      : `${d.nm} members + ${d.nr} reactions = ${d.nm + d.nr} = 2 × ${d.nn} joints → determinate`,
      `largest tension +${d.tmax.toFixed(2)} kN · largest compression ${d.cmax.toFixed(2)} kN`,
      `${d.chordName}: ${d.chord > 0 ? '+' : ''}${d.chord.toFixed(2)} kN`,
      ...(d.ci === 4 ? [0, 7, 14].map((a) => d.forces.slice(a, a + 7)
        .map((f, k) => `${a + k + 1}: ${f > 0 ? '+' : ''}${f.toFixed(1)}`).join('  ')) : [])],
    take: (d) => (d.ci === 2 ? 'each chord of the lens takes half of each load, so each has half the moment over half the depth — and half over half is the same number' : '') },
  { t: 'The force diagram', d: (d) => (d.C.poly
      ? 'right: one closed polygon per joint, drawn to scale, every edge parallel to the member it stands for. Hover any member to light up its edges'
      : 'the sheet prints the force diagram for this case, so the exercise only asks you to read it. The load line laid off on the right is what it starts from: A, F1, F2 and B in order, and the sheet’s own printed diagram divides it 3.125 / 2.5 / 2.5 / 1.875 cm'),
    detail: (d) => (d.C.poly
      ? [`${d.nodes.length} joints → ${d.nodes.length} polygons, 1 unit ≙ ${SFD} kN`,
         d.ci === 2 ? 'the two end joints have no reaction edge in the horizontal direction: the thrust closes internally' : '']
        .filter(Boolean)
      : [`load line: A = ${Math.hypot(...d.reactions[0]).toFixed(2)} ↑, F1 = ${d.F.toFixed(2)} ↓, F2 = ${d.F.toFixed(2)} ↓, B = ${Math.hypot(...(d.reactions[3] || d.reactions[11])).toFixed(2)} ↑`,
         `ten segment lengths of the sheet’s printed diagram were digitised and agree with these numbers to better than 1 %`]) },
  { t: 'Three paths, one number', d: 'a) is an arch on a tie, b) is the same thing upside down, c) is both at once. Completely different drawings, and all three give the same chord force — because all three have the same lever arm at midspan. d) and e) land on it too, in their bottom chord',
    detail: (d) => [`a) tie +62.84 · b) strut −62.84 · c) each chord ∓64.76 with a horizontal component of 62.84 kN`,
                    `d) bottom chord 6/9 +62.84 · e) member 8 +61.05 (its panel is slightly off L/4)`,
                    `now at d = ${d.dep.toFixed(4)} m: ${d.chordName} = ${d.chord > 0 ? '+' : ''}${d.chord.toFixed(2)} kN`],
    take: 'drag the depth. Every one of the five rises as 1/d, together, because every one of them is the same moment divided by the same lever arm' },
  { t: 'f) The comparison', d: 'the sheet answers f) itself — in German, in the English version too, with the last two lines running over the ruled line beneath them. A translation bug and a layout bug in one paragraph. Here it is in English',
    detail: () => ['“Situations a) to c) show a solution with an arch-cable structure inside the beam.',
                   'For such a solution in reinforced concrete the tension elements have to be prestressed,',
                   'otherwise large cracks can form in the concrete. In variants d) and e) a truss is formed',
                   'inside the beam. Here the forces are better distributed and so are the cracks (many small',
                   'cracks instead of one large crack). Prestressing is therefore not needed.”'],
    take: 'the arch-cable answer concentrates the tension into one chord; the truss spreads it over many. Concrete does not mind carrying tension — it minds carrying it all in one place' },
];

export const { meta, create } = makeJointTrussView({
  title: 'EX X · 6 — one beam, five force paths, one chord force',
  subtitle: 'Structural Design II · sheet EX X “Additional Exercises”, page 4 (German task 6 a)–f); the English sheet calls it “Task 1”)',
  about: 'The same beam five times over, with the same two 25 kN loads: an arch on a tie, a cable under a strut, a lens with both, and then two trusses of 12 and 21 members. The reactions are 31.25 and 18.75 kN in every case and nothing drawn inside can change that. What the page is really teaching is that the chord force is the midspan moment divided by the internal depth — so all five arrive at the same 62.84 kN, and dragging the depth moves all five together. Part f) is answered on the task sheet itself, in German, even in the English version; the translation is in the last step.',
  result: (d) => [
    `${d.tag} ${d.name} — A = ${Math.hypot(...d.reactions[0]).toFixed(2)} kN, B = ${Math.hypot(...(d.reactions[3] || d.reactions[11])).toFixed(2)} kN, the same in all five cases`,
    `M(L/2) = ${fun(d).M(L / 2).toFixed(3)} kNm over an internal depth of ${d.dep.toFixed(4)} m → H = ${(fun(d).M(L / 2) / d.dep).toFixed(2)} kN`,
    `${d.chordName} = ${d.chord > 0 ? '+' : ''}${d.chord.toFixed(2)} kN · largest tension +${d.tmax.toFixed(2)} kN · largest compression ${d.cmax.toFixed(2)} kN`,
    `a), b) and c) are three different drawings with one answer: the same 1.4355 m lever arm gives all of them 62.84 kN`],
  frame: [[-28, -32], [34, 23]],
  defaults: { cas: 0, dep: DEP, F: F_SHEET },
  caseOf: (s) => s.cas,
  cases: CASES,
  at: { form: 1, load: 1, reac: 2, mem: 3, poly: 4 },
  steps: STEPS,
  formTitle: (d) => `${d.tag} — Form diagram 1:100`,
  noPolyNote: 'the sheet prints this one; the load line below is where it starts',
  titlePos: { form: [-14, -14.4], force: [16, 21.4], sub: [16, 19.8],
              note: [-14, -16.1], zero: [-14, -17.8] },

  // the beam outline that all five cases share, and — for d) and e), whose
  // force diagram the sheet already prints — the load line it is built on
  declare: (dw) => {
    dw.strokes('beam', 4, { intro: 1, w: dw.W.thin, color: PAL.grey, flash: false });
    dw.instant('beam');
    const wide = (st) => Math.round(st.cas) >= 3;
    for (let i = 0; i < 4; i++) {
      dw.arrow(`ll${i}`, { intro: 4, color: PAL.green, ...dw.W.narrow, when: wide });
      dw.label(`lll${i}`, '', { cls: 'num', intro: 4, color: PAL.green, when: wide });
    }
    dw.label('llTitle', '', { cls: 'point', flash: false, intro: 4, color: PAL.grey,
      when: wide });
  },
  extra: (dw, d) => {
    const C = d.C;
    const ux = (p) => [C.ORG[0] + p[0] * C.MPU, C.ORG[1] + p[1] * C.MPU];
    // the beam: 9.911 x 1.723 m, centred on the internal system
    const ox = (L - 9.911) / 2, oy = -(1.723 - d.dep) / 2;
    const c = [ux([ox, oy]), ux([ox + 9.911, oy]),
               ux([ox + 9.911, oy + 1.723]), ux([ox, oy + 1.723])];
    dw.setStrokes('beam', c.map((p, i) => [p, c[(i + 1) % 4]]));
    // the load line for the two truss cases
    const A = Math.hypot(...d.reactions[0]);
    const B = Math.hypot(...(d.reactions[3] || d.reactions[11]));
    const steps = [A, -d.F, -d.F, B];
    const nm = [`A = ${A.toFixed(2)}`, `F1 = ${d.F.toFixed(2)}`,
                `F2 = ${d.F.toFixed(2)}`, `B = ${B.toFixed(2)}`];
    const LSF = SFD / 2;                       // the load line gets its own scale
    let y = 3;
    for (let i = 0; i < 4; i++) {
      const y2 = y + steps[i] / LSF;
      dw.setArrow(`ll${i}`, [25, y], [25, y2]);
      // alternate the side: the four midpoints are only half a unit apart
      dw.setLabel(`lll${i}`, [25 + (i % 2 ? -5.8 : 5.8), (y + y2) / 2]);
      dw.setText(`lll${i}`, nm[i]);
      y = y2;
    }
    dw.setLabel('llTitle', [25, 3 + A / LSF + 2.4]);
    dw.setText('llTitle', `load line, 1 unit ≙ ${LSF.toFixed(0)} kN`);
  },
  controls: (panel, s, refresh) => {
    const sec = panel.section('The case');
    panel.slider(sec, s, 'cas', 'force path', 0, 4, 1, refresh,
      (v) => `${CASES[Math.round(v)].tag}  ${CASES[Math.round(v)].name.split(' — ')[0]}`);
    const g = panel.section('Given');
    panel.slider(g, s, 'dep', 'internal depth d (m)', 0.5, 1.4355, 0.0155, refresh,
      (v) => `${v.toFixed(4)} m${Math.abs(v - DEP) < 0.008 ? '  ← as drawn' : ''}`);
    panel.slider(g, s, 'F', 'F1 = F2 (kN)', 5, 50, 1, refresh,
      (v) => `${v.toFixed(0)} kN${Math.abs(v - F_SHEET) < 0.5 ? '  ← the sheet’s value' : ''}`);
  },
});
