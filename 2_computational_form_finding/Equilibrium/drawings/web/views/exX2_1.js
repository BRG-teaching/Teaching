/**
 * EX X · German tasks 1.1, 1.2 and 1.3 — one load case, three force paths
 * Structural Design II, FS 23, "Additional Exercises", sheet page 1.
 *
 * NUMBERING. The English sheet's task numbers are corrupt: three separate
 * blocks are called "Task 1", two "Task 2", three "Task 3". The German sheet
 * numbers the same 24 blocks 1.1 … 18 without repetition, and that is the
 * numbering used here. Page 1 is the one page where the English labels
 * (1.1 / 1.2 / 1.3) happen to be right.
 *
 * TEXT (verbatim).
 *   1.1 "Find the arch-cable-structure that forms under the given loading
 *        situation. The tension force in the bottom chord equals 60kN. Draw
 *        the corresponding force diagram. Use red for tension and blue for
 *        compression."
 *   1.2 "This loading case corresponds to that of 1.1, but here a truss is
 *        analysed. Draw the corresponding force diagram for the given
 *        situation. First identify possible zero members. Indicate tension
 *        forces with red and compression forces with blue."
 *        (German title: Fachwerktyp «Howe».)
 *   1.3 "This loading case corresponds to that of 1.1 and 1.2, but here a
 *        different truss is analysed. Draw the corresponding force diagram for
 *        the given situation. Indicate tension forces with red and compression
 *        forces with blue."  (German title: Fachwerktyp «Pratt».)
 *
 * GIVENS. F1 = F2 = F3 = 30 kN vertical, down. Bottom-chord tension in 1.1 is
 * given as 60 kN. Form diagrams 1:100, force diagrams 1 cm ≙ 10 kN.
 *
 * GEOMETRY, digitised from the sheet (it prints no dimension lines anywhere;
 * the stated 1:100 was calibrated twice elsewhere on the booklet to 0.3 %).
 * Origin = the left support. Span 10.6627 m, loads at the exact quarter points
 * 2.6657 / 5.3313 / 7.9970 m. Both trusses are four SQUARE panels of
 * 2.6657 m, so the truss depth is 2.6657 m as well.
 *
 * THE POINT OF THE PAGE, and the reason all three are in one view: the sheet
 * is built so that the crown rise of 1.1's arch (2.6657 m at the given 60 kN)
 * is EXACTLY the depth of the trusses in 1.2 and 1.3. All three therefore
 * carry the same 60 kN at midspan — 1.1 in its tie, 1.2 in its bottom chord,
 * 1.3 in its top chord. Same load, same lever arm, same chord force; only the
 * web changes. Switch the case in the panel and watch that number not move.
 *
 * ANSWERS (all derived here; the sheet prints none).
 *   reactions, all three cases:  A = B = 45.00 kN vertical
 *   1.1  H = 60 kN → n1 = n3 = 1.9993 m, crown n2 = 2.6657 m above the tie
 *        arch  75.00 C (end panels) · 61.85 C (centre panels) · tie 60.00 T
 *        check: 75.00 × 0.75/1.25 = 45.00 = A; M_mid/z = 159.94/2.6657 = 60.00
 *   1.2  Howe (diagonals / / \ \):
 *        bottom +45 / +60 / +60 / +45 · top 0 / −45 / −45 / 0
 *        verticals 0 / +15 / 0 / +15 / 0 · diagonals −63.64 / −21.21 ×2 / −63.64
 *        FIVE zero members: U0–U1, U3–U4, L0–U0, L4–U4, L2–U2
 *   1.3  Pratt (diagonals \ \ / /), the exact mirror:
 *        bottom 0 / +45 / +45 / 0 · top −45 / −60 / −60 / −45
 *        verticals −45 / −45 / −30 / −45 / −45 · diagonals +63.64 / +21.21 ×2 / +63.64
 *        TWO zero members: L0–L1, L3–L4
 * Solved by joint equilibrium (residual < 1e-13) and cross-checked by hand
 * against a midspan section: 60.00 × 2.6657 = 159.94 kNm = 45 × 5.3313 −
 * 30 × 2.6657. Both close exactly.
 *
 * 1.1 IS A FORM-FINDING PROBLEM, not an analysis one: five nodes and five
 * members is one short of a determinate truss, so lib/truss.js cannot solve
 * it. The tie force IS the horizontal thrust, and the thrust chooses the
 * shape — which is why the tie force is the slider.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';
import { makeJointTrussView, funicular } from '../lib/exx2first.js';

const PAN = 2.6657;                      // m — the square panel = the truss depth
const SPAN = 4 * PAN;                    // 10.6627 m
const XS = [PAN, 2 * PAN, 3 * PAN];      // the three load lines
const H_GIVEN = 60;                      // kN — the sheet's given tie force

const MPU = 2.0, ORG = [-26, -10], SFD = 14;

// --------------------------------------------------------------- 1.1 -------
// five nodes: A(0) n1(1) n2(2) n3(3) B(4); four arch segments plus the tie
const ARCH_MEM = [[0, 1], [1, 2], [2, 3], [3, 4], [0, 4]];
const ARCH_NAME = ['A', 'n1', 'n2', 'n3', 'B'];

function archNodes(s) {
  const f = funicular(XS, [s.F, s.F, s.F], 0, SPAN, s.H);
  return [[0, 0], [XS[0], f.y[0]], [XS[1], f.y[1]], [XS[2], f.y[2]], [SPAN, 0]];
}

function archSolve(s, M) {
  const f = funicular(XS, [s.F, s.F, s.F], 0, SPAN, s.H);
  // every arch segment carries the same horizontal thrust; its axial force is
  // that thrust divided by the cosine of its slope, i.e. H × L / Δx
  const forces = M.members.map(([i, j], m) => {
    if (m === 4) return s.H;                          // the tie, in tension
    const a = M.nodes[i], b = M.nodes[j];
    return -s.H * (V.dist(a, b) / Math.abs(b[0] - a[0]));
  });
  return { forces, reactions: { 0: [0, f.R0], 4: [0, f.R1] } };
}

// -------------------------------------------------------- 1.2 and 1.3 ------
// L0..L4 = 0..4 along y = 0, U0..U4 = 5..9 along y = PAN
const TNODES = [];
for (let i = 0; i < 5; i++) TNODES.push([i * PAN, 0]);
for (let i = 0; i < 5; i++) TNODES.push([i * PAN, PAN]);
const TCOMMON = [[0, 1], [1, 2], [2, 3], [3, 4],          // 0-3   bottom chord
                 [5, 6], [6, 7], [7, 8], [8, 9],          // 4-7   top chord
                 [0, 5], [1, 6], [2, 7], [3, 8], [4, 9]]; // 8-12  verticals
const HOWE = [...TCOMMON, [0, 6], [1, 7], [3, 7], [4, 8]];   // 13-16  / / \ \
const PRATT = [...TCOMMON, [5, 1], [6, 2], [8, 2], [9, 3]];  // 13-16  \ \ / /
const TNAME = ['L0', 'L1', 'L2', 'L3', 'L4', 'U0', 'U1', 'U2', 'U3', 'U4'];

const trussLoads = (s) => ({ 6: [0, -s.F], 7: [0, -s.F], 8: [0, -s.F] });

// two columns of joint polygons down the right-hand side, clear of both cards
const TCELL = [];
for (let k = 0; k < 10; k++) TCELL.push([8 + (k % 2) * 16, 13 - Math.floor(k / 2) * 9]);
const ACELL = [[8, 13], [24, 13], [8, 4], [24, 4], [8, -5]];

const base = {
  MPU, ORG, SFD,
  supports: { 0: 'pin', 4: 'roller-v' },
  supportDir: () => [0, -1],
  reacName: (i) => (i === 0 ? 'A' : 'B'),
  cellLabelOff: [0, 4.4],
  reacLabelOff: (i) => (i === 0 ? [-3.8, -0.4] : [3.8, -0.4]),
  loadOff: () => [2.8, 0.5],
};

const CASES = [
  { ...base,
    tag: '1.1', name: 'arch-cable — the shape is the answer',
    nodes: archNodes({ H: H_GIVEN, F: 30 }),
    members: ARCH_MEM,
    loads: { 1: [0, -30], 2: [0, -30], 3: [0, -30] },
    geom: archNodes,
    load: (s) => ({ 1: [0, -s.F], 2: [0, -s.F], 3: [0, -s.F] }),
    solve: archSolve,
    derive: (s, M, res) => ({ chord: Math.abs(res.forces[4]),
                              chordName: 'the tie',
                              rise: M.nodes[2][1],
                              rise1: M.nodes[1][1] }),
    poly: true,
    cells: ACELL,
    nodeName: (i) => ARCH_NAME[i],
    nodeLabelOff: (i) => (i === 0 ? [-2.6, -1.4] : i === 4 ? [2.6, -1.4] : [0, -2.3]),
    labelSide: (m) => (m === 4 ? -1 : 1),
    note: 'one member short of a truss — this shape is found, not analysed',
  },
  { ...base,
    tag: '1.2', name: 'truss «Howe» — diagonals / / \\ \\',
    nodes: TNODES, members: HOWE, loads: trussLoads({ F: 30 }), load: trussLoads,
    derive: (s, M, res) => ({ chord: Math.abs(res.forces[1]),
                              chordName: 'the midspan bottom chord' }),
    poly: true, cells: TCELL,
    nodeName: (i) => TNAME[i],
    nodeLabelOff: (i) => (i < 5 ? [0, -3.4] : [0, 3.0]),
    labelSide: (m) => (m < 4 ? -1 : m < 8 ? 1 : m < 13 ? 1 : -1),
    note: '«Howe»: the diagonals are compressed, the verticals pull',
  },
  { ...base,
    tag: '1.3', name: 'truss «Pratt» — diagonals \\ \\ / /',
    nodes: TNODES, members: PRATT, loads: trussLoads({ F: 30 }), load: trussLoads,
    derive: (s, M, res) => ({ chord: Math.abs(res.forces[5]),
                              chordName: 'the midspan top chord' }),
    poly: true, cells: TCELL,
    nodeName: (i) => TNAME[i],
    nodeLabelOff: (i) => (i < 5 ? [0, -3.4] : [0, 3.0]),
    labelSide: (m) => (m < 4 ? -1 : m < 8 ? 1 : m < 13 ? 1 : -1),
    note: '«Pratt»: every web member has swapped sign against 1.2',
  },
];

const STEPS = [
  { t: 'The exercise', d: 'page 1 of the sheet asks the same question three times: three 30 kN loads on a 10.66 m span, carried first by an arch and a tie, then by two different trusses. Switch between them in the panel' },
  { t: 'The structure', d: 'left: the case on show, drawn at the sheet’s 1:100. The three loads and the span never change — only what is put underneath them',
    detail: (d) => [`${d.tag}  ${d.name}`,
                    `span ${SPAN.toFixed(4)} m · loads at the quarter points ${XS.map((x) => x.toFixed(4)).join(' / ')} m`,
                    d.ci === 0
                      ? `${d.members.length} members, ${d.nodes.length} nodes — a mechanism until its shape is chosen`
                      : `${d.nm} members + ${d.nr} reactions = ${d.nm + d.nr} = 2 × ${d.nn} joints → statically determinate`] },
  { t: 'Global equilibrium first', d: 'before any member: the whole thing is one body, the load is symmetric, and neither support is pushed sideways. This step is identical in all three cases, which is already half the point',
    detail: (d) => [`A = ${Math.hypot(...d.reactions[0]).toFixed(2)} kN up · B = ${Math.hypot(...d.reactions[4]).toFixed(2)} kN up`,
                    `ΣV: ${Math.hypot(...d.reactions[0]).toFixed(2)} + ${Math.hypot(...d.reactions[4]).toFixed(2)} = ${(3 * d.F).toFixed(2)} kN ✓`,
                    d.ci === 0 ? 'the tie swallows the thrust, so the pin carries no horizontal force either'
                               : 'ΣH = 0: nothing pushes sideways'] },
  { t: (d) => (d.ci === 0 ? 'Find the shape' : 'The member forces'),
    d: (d) => (d.ci === 0
      ? 'the tie force IS the horizontal thrust, and the thrust decides the shape: each panel’s rise is its shear divided by that thrust. Drag the tie force and watch the arch reflow — flatter as it rises, and the reactions never move'
      : 'solved joint by joint. A joint with two members and no load carries nothing in either; a joint with two collinear members plus one more carries nothing in the odd one out. Those come free, before any arithmetic'),
    detail: (d) => (d.ci === 0
      ? [`H = ${d.H.toFixed(2)} kN → rise at the quarter points ${d.rise1.toFixed(4)} m, crown ${d.rise.toFixed(4)} m`,
         `arch ${Math.abs(d.forces[0]).toFixed(2)} C at the ends, ${Math.abs(d.forces[1]).toFixed(2)} C at the centre · tie ${d.forces[4].toFixed(2)} T`,
         `check: ${Math.abs(d.forces[0]).toFixed(2)} × ${(d.rise1 / Math.hypot(PAN, d.rise1)).toFixed(4)} = ${(Math.abs(d.forces[0]) * d.rise1 / Math.hypot(PAN, d.rise1)).toFixed(2)} kN = A ✓`]
      : [`${d.zero.filter(Boolean).length} zero-force members, and they are found by looking, not by solving`,
         `largest tension +${d.tmax.toFixed(2)} kN · largest compression ${d.cmax.toFixed(2)} kN`,
         `residual of the joint solve ${d.resid.toExponential(1)} kN`]),
    take: (d) => (d.ci === 1
      ? 'U0 and U4 each have two members and no load → all four are zero; L2 has two collinear chords plus a vertical → the vertical is zero'
      : d.ci === 2 ? 'only two zero members here — the Pratt pattern puts the end verticals to work'
      : 'a bigger tie force buys a flatter arch, and a flatter arch costs more in the arch itself') },
  { t: 'The force diagram', d: 'right: one closed polygon per joint, each drawn to scale with every edge parallel to the member it stands for. Hover a member and its edges light up. Green edges are the load and the reaction; pink is tension, navy compression',
    detail: (d) => [`${d.nodes.length} joints → ${d.nodes.length} polygons, 1 unit ≙ ${SFD} kN`,
                    d.ci === 0
                      ? 'in the arch case every polygon shares the same two horizontal tie edges — that is the classic pole diagram, taken apart'
                      : 'the polygons are laid out in reading order, left to right, top to bottom'],
    take: 'a polygon that does not close means the joint before it was solved wrong' },
  { t: 'The number that does not move', d: 'now switch between the three cases and watch one number stay put. The arch’s tie, the Howe truss’s bottom chord and the Pratt truss’s top chord all carry the same force — because all three carry the same midspan moment over the same lever arm',
    detail: (d) => [`M at midspan = ${(3 * d.F / 2 * 2 * PAN - d.F * PAN).toFixed(2)} kNm, always`,
                    `lever arm: ${d.ci === 0 ? `the crown rise, ${d.rise.toFixed(4)} m` : `the truss depth, ${PAN.toFixed(4)} m`}`,
                    `→ ${d.chordName} carries ${d.chord.toFixed(2)} kN`,
                    d.ci === 0 && Math.abs(d.H - H_GIVEN) > 0.01
                      ? `at the sheet’s given H = ${H_GIVEN} kN the crown rise would be exactly ${PAN.toFixed(4)} m — the truss depth`
                      : 'the crown rise of 1.1 and the depth of 1.2 and 1.3 are the same 2.6657 m. That is not a coincidence'],
    take: 'the chord force of a spanning structure is its bending moment divided by its depth, whatever is drawn in between' },
];

export const { meta, create } = makeJointTrussView({
  title: 'EX X · 1.1–1.3 — the same 60 kN, three ways',
  subtitle: 'Structural Design II · sheet EX X “Additional Exercises”, page 1 (German tasks 1.1, 1.2, 1.3)',
  about: 'Three 30 kN loads on a 10.66 metre span, carried three different ways: an arch with a tie, a Howe truss, a Pratt truss. The page looks like three exercises and is really one. The sheet is drawn so that the crown rise of the arch at its given 60 kN tie force is exactly the depth of the two trusses, so all three end up with the same 60 kN at midspan — in the tie, in the bottom chord and in the top chord respectively. The web changes completely; the chord force does not move. The English sheet’s task numbers are corrupt across the booklet (three blocks called “Task 1”); the German numbering 1.1 / 1.2 / 1.3 used here is the correct one, and on this page the English labels happen to agree.',
  result: (d) => [
    `${d.tag} ${d.name.split(' — ')[0]}: A = B = ${Math.hypot(...d.reactions[0]).toFixed(2)} kN, vertical`,
    d.ci === 0
      ? `tie H = ${d.H.toFixed(2)} kN → crown rise ${d.rise.toFixed(4)} m · arch ${Math.abs(d.forces[0]).toFixed(2)} C (ends) and ${Math.abs(d.forces[1]).toFixed(2)} C (centre)`
      : `${d.zero.filter(Boolean).length} zero-force members · F_t,max = +${d.tmax.toFixed(2)} kN · F_c,max = ${d.cmax.toFixed(2)} kN`,
    `midspan: ${d.chordName} carries ${d.chord.toFixed(2)} kN = M/z = ${(3 * d.F / 2 * 2 * PAN - d.F * PAN).toFixed(2)} / ${(d.ci === 0 ? d.rise : PAN).toFixed(4)}`,
    d.ci === 0 && Math.abs(d.H - H_GIVEN) > 0.01
      ? `the sheet gives the tie as ${H_GIVEN} kN, at which the crown rise is exactly the trusses’ ${PAN.toFixed(4)} m depth`
      : `all three cases give the same ${((3 * d.F / 2 * 2 * PAN - d.F * PAN) / PAN).toFixed(2)} kN chord force, because all three share the ${PAN.toFixed(4)} m lever arm`],
  frame: [[-28, -32], [34, 23]],
  defaults: { cas: 0, H: H_GIVEN, F: 30 },
  caseOf: (s) => s.cas,
  cases: CASES,
  at: { form: 1, load: 1, reac: 2, mem: 3, poly: 4 },
  steps: STEPS,
  formTitle: (d) => `${d.tag} — Form diagram 1:100`,
  titlePos: { form: [-15, -16.0], force: [16, 20.0], sub: [16, 18.4],
              note: [-15, -17.8], zero: [-15, -19.5] },

  // the reference line that makes the page's point visible: the depth of the
  // two trusses, drawn across the arch so the crown can be compared to it
  declare: (dw) => {
    dw.dashLine('depth', { intro: 3, color: PAL.grey, dash: dw.W.dash,
      when: (st) => Math.round(st.cas) === 0 });
    dw.label('ldepth', '', { cls: 'point', intro: 3, flash: false, color: PAL.grey,
      when: (st) => Math.round(st.cas) === 0 });
    dw.seg('dimRise', { intro: 3, w: dw.W.dim, color: PAL.grey, flash: false,
      when: (st) => Math.round(st.cas) === 0 });
    dw.label('lrise', '', { cls: 'num', intro: 3, flash: false, color: PAL.grey,
      when: (st) => Math.round(st.cas) === 0 });
    dw.instant('depth', 'ldepth');
  },
  extra: (dw, d) => {
    const ux = (p) => [ORG[0] + p[0] * MPU, ORG[1] + p[1] * MPU];
    dw.setDashLine('depth', [ux([-0.5, PAN]), ux([SPAN + 0.5, PAN])]);
    dw.setLabel('ldepth', V.add(ux([SPAN + 0.6, PAN]), [3.6, 0]));
    dw.setText('ldepth', `truss depth ${PAN.toFixed(4)} m`);
    const cx = SPAN / 2;
    const top = d.ci === 0 ? d.nodes[2][1] : PAN;
    dw.setSeg('dimRise', ux([cx + 0.30, 0]), ux([cx + 0.30, top]));
    dw.setLabel('lrise', V.add(ux([cx + 0.34, top * 0.34]), [2.9, 0]));
    dw.setText('lrise', `crown ${top.toFixed(4)} m`);
  },
  controls: (panel, s, refresh) => {
    const sec = panel.section('The case');
    panel.slider(sec, s, 'cas', 'force path', 0, 2, 1, refresh,
      (v) => `${CASES[Math.round(v)].tag}  ${CASES[Math.round(v)].name}`);
    const giv = panel.section('Given');
    panel.slider(giv, s, 'H', '1.1  tie force H (kN)', 25, 120, 1, refresh,
      (v) => `${v.toFixed(0)} kN${Math.abs(v - H_GIVEN) < 0.5 ? '  ← the sheet’s value' : ''}`);
    panel.slider(giv, s, 'F', 'F1 = F2 = F3 (kN)', 10, 50, 1, refresh,
      (v) => `${v.toFixed(0)} kN${Math.abs(v - 30) < 0.5 ? '  ← the sheet’s value' : ''}`);
  },
});
