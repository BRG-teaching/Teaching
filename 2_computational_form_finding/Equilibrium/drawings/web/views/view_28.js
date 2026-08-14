/**
 * Drawing view/28 "PAT Center, R. Rogers"
 * (https://block.arch.ethz.ch/eq/drawing/view/28) as a step-by-step
 * construction.
 *
 * Rogers' Princeton PA Technology Center: a cable-STAYED roof. An A-frame
 * (apex D1, blue legs to the feet B6/B2 only 2.14 apart) carries two cable
 * junctions D2/D3; stays fan to the deck anchors, struts tie the junctions
 * back to the feet, the deck is the compression chord and the foundations
 * 20/21 are the only vertical reactions. Because the feet are so close,
 * sliding F1 50..300 kN flips the left reaction DOWNWARD -- and dragging
 * the junction heads down flips stays into compression, raising the
 * applet's red warning.
 *
 * Live port of view_28/applet_0/geogebra.xml (570 objects; the segment
 * CAPs are stale -- numbering resolved from the ~40 label texts); the full
 * chain matches the LIVE applet to ~5e-14 over 40 points in 4 states
 * including F1 = 300 and dragged heads (scratchpad/v28_regress.py).
 * NOTE the applet's on-canvas left-load texts "F4=160kN F5=160kN F6=80kN"
 * are stale: its own geometry uses 200/200/100 kN everywhere; we label the
 * true values. See notes/view_28_analysis.md.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 28 — PAT Center, R. Rogers',
  subtitle: 'a cable-stayed roof: A-frame, stays, compression deck, twin foundations',
  about: 'Rogers\' Princeton PA Technology Center is a cable-stayed roof: an A-frame with feet only 2.14 m apart carries two cable junctions, stays fan out to the deck anchors, and the deck itself is the compression chord. A trial funicular locates the resultant, a two-bar substitute system with the horizontal tie finds the division point, and the whole force diagram unfolds as one chain of parallels. Slide F₁ up to 300 kN and the left foundation flips into a tie-down; drag the junction heads low and the stays would go slack — the red warning appears.',
  frame: [[-1.2, -8.6], [37.2, 10.7]],
};

// fixed applet geometry (see notes/view_28_analysis.md)
const YD = 2.114668823637154;             // deck level
const B6 = [7.920178872037255, YD];
const B2 = [B6[0] + 2.14, YD];
const B3 = [B6[0] - 7.49, YD], B4 = [B6[0] - 4.68, YD], B5 = [B6[0] - 2.96, YD];
const B7 = [B2[0] + 2.96, YD], B8 = [B2[0] + 4.68, YD], B9 = [B2[0] + 7.49, YD];
const W1 = [B6[0], YD - 1.5], M3 = [B2[0], YD - 1.5];
const XD2 = 5.755043736902118, XD1 = 8.990178872037259, XD3 = 12.225314007172388;
const RAIL = [2.35, 8.3];                 // head rails (drag range)
const FL = [200, 200, 100];               // fixed left loads at B5, B4, B3 (kN)

const TRIAL_END = 7;                      // trial + substitute retire (applet <5)
const RESOLVE = 11;

const DEFAULTS = {
  yD2: 3.303403380467803,                 // junction D2 (reset C_2)
  yD1: 6.978360836912666,                 // apex D1 (reset C_1)
  yD3: 3.303403380467811,                 // junction D3 (reset C_3)
  Dp: [21, 4],                            // load line 1 anchor
  M: [24.33051488435251, 0.5296202649718282],   // trial pole "o"
  yP2: -7.5942760910270755,               // trial start on the B9 vertical
  yI1: 4.742727594891518,                 // substitute apex on the action line
  a: [21, 2],                             // final load line anchor
  F1: 100, F2: 200, F3: 200,              // sliders 50..300
  sFD: 150,                               // kN per unit [50, 200]
  sLS: 1,                                 // load symbol length [0.5, 2]
  sIF: 0.6,                               // internal-force scale [0, 2]
  offL: 0, offR: 1,
  o1: true, lbl: true, hideRF: false, n4: false,
  node: 0, _k: 99,
};

const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'The stayed roof and its loads', d: 'left: the A-frame with feet only 2.14 m apart, two cable junctions on their rails (drag them!), stays, deck — all still tentative (grey); the deck loads: F₄ = 200, F₅ = 200, F₆ = 100 kN fixed, F₁, F₂, F₃ on sliders' },
  { t: 'The load line', d: 'right: all six loads tip-to-tail from the draggable D: F₁ F₂ F₃ (right span) then 200 200 100 (left span), 1 unit :: 150 kN' },
  { t: 'A trial pole', d: 'right: any pole o with rays to every load-line division' },
  { t: 'The trial funicular', d: 'left: from P₂ on the F₁ vertical, one string per ray across the load verticals; the outer strings extended (dashed) cross on the LINE OF ACTION of the resultant R = 1000 kN' },
  { t: 'The substitute system', d: 'left: replace everything by two bars from the feet to a point I₁ on the action line, closed by the tie 3 between the feet — right: the force triangle 1-2 from the ends of the load line; the TIE is horizontal, so the horizontal through its pole cuts the load line at the division K₁' },
  { t: 'The reactions', d: 'right: the division splits the load line: A = bottom→K₁ goes into the right foundation, B = K₁→top into the left — left: green arrows at the foundations. Slide F₁ to 300: B flips DOWNWARD (the feet are too close!)' },
  { t: 'The left stays', d: 'left: cables 1, 2, 3 from the anchors up to the junction, strut 4 back to the foot, cable 5 up to the apex — right: each force parallel to its member, hung between the load-line levels' },
  { t: 'The A-frame and the right stays', d: 'left: the blue legs 6 and 7, cable 8, strut 9, cables 10, 11, 12 — right: the chain of parallels continues through the pole points' },
  { t: 'The deck', d: 'left: the deck pieces 13–19 close every anchor node — right: their forces are the HORIZONTALS of the diagram: the deck is the compression chord' },
  { t: 'The foundations', d: 'left: the feet continue down as 20 and 21 (dashed) — right: their forces are exactly the reaction pieces B and A on the load line; the offset green chain re-reads all six loads' },
  { t: 'Internal forces', d: 'pink = tension, blue = compression, pipe widths ∝ force; drag the junctions DOWN and the stays would go slack — the red warning appears; click any node (or use the slider) for its equilibrium' },
];

// members: [num, form pair (a() lazy), force pair keys, cableFlag]
function memberTable(d) {
  return [
    [1, [B3, d.D2], [d.a, d.J2], true],
    [2, [B4, d.D2], [d.J2, d.I2], true],
    [3, [B5, d.D2], [d.I2, d.Z1], true],
    [4, [B6, d.D2], [d.Z1, d.V1], true],
    [5, [d.D2, d.D1], [d.a, d.V1], true],
    [6, [B6, d.D1], [d.V1, d.U1], false],
    [7, [B2, d.D1], [d.U1, d.T1], false],
    [8, [d.D1, d.D3], [d.a, d.T1], true],
    [9, [B2, d.D3], [d.T1, d.S1], true],
    [10, [B7, d.D3], [d.S1, d.R1], true],
    [11, [B8, d.D3], [d.R1, d.Q1], true],
    [12, [B9, d.D3], [d.Q1, d.a], true],
    [13, [B9, B8], [d.A1, d.Q1], false],
    [14, [B8, B7], [d.Aa, d.R1], false],
    [15, [B7, B2], [d.C, d.S1], false],
    [16, [B6, B2], [d.O1, d.U1], false],
    [17, [B5, B6], [d.Z1, d.P1], false],
    [18, [B4, B5], [d.I2, d.F2p], false],
    [19, [B4, B3], [d.H2, d.J2], false],
    [20, [B6, W1], [d.O1, d.P1], false],
    [21, [B2, M3], [d.C, d.O1], false],
  ];
}

// the construction (mirrors applet_0/geogebra.xml, evaluated live)
function compute(s) {
  const D2 = [XD2, s.yD2], D1 = [XD1, s.yD1], D3 = [XD3, s.yD3];
  const Dp = s.Dp.slice();
  const drops = [s.F1, s.F2, s.F3, FL[0], FL[1], FL[2]];
  const LL1 = [Dp];
  for (const f of drops) LL1.push([Dp[0], LL1[LL1.length - 1][1] - f / s.sFD]);
  const Lb = LL1[6];

  // trial funicular: strings across the verticals B9 B8 B7 B5 B4 B3
  const M = s.M.slice();
  const P2 = [B9[0], s.yP2];
  const xs = [B8[0], B7[0], B5[0], B4[0], B3[0]];
  const poly = [P2];
  for (let k = 0; k < 5; k++) {
    const p = poly[poly.length - 1];
    const dd = V.sub(LL1[k + 1], M);
    poly.push([xs[k], p[1] + ((xs[k] - p[0]) / dd[0]) * dd[1]]);
  }
  const I3 = V.intersect(P2, V.sub(Dp, M), poly[5], V.sub(Lb, M));

  // substitute system on the action line
  const I1 = [I3[0], s.yI1];
  const J1 = V.intersect(Dp, V.sub(I1, B6), Lb, V.sub(B2, I1));
  const K1 = V.intersect(J1, [1, 0], Dp, [0, 1]);
  const Amag = K1[1] - Lb[1];             // signed (up +): RIGHT foundation 21
  const Bmag = Dp[1] - K1[1];             // LEFT foundation 20

  // final load line from a
  const a = s.a.slice();
  const A1 = [a[0], a[1] - s.F1 / s.sFD];
  const Aa = [a[0], A1[1] - s.F2 / s.sFD];
  const C = [a[0], Aa[1] - s.F3 / s.sFD];
  const O1 = [a[0], C[1] + Amag];
  const P1 = [a[0], O1[1] + Bmag];
  const F2p = [a[0], P1[1] - FL[0] / s.sFD];
  const H2 = [a[0], F2p[1] - FL[1] / s.sFD];

  // chain of parallels
  const Q1 = V.intersect(a, V.sub(B9, D3), A1, [1, 0]);
  const R1 = V.intersect(Q1, V.sub(B8, D3), Aa, [1, 0]);
  const S1 = V.intersect(R1, V.sub(B7, D3), C, [1, 0]);
  const T1 = V.intersect(S1, V.sub(B2, D3), a, V.sub(D3, D1));
  const U1 = V.intersect(T1, V.sub(B2, D1), O1, [1, 0]);
  const V1 = V.intersect(U1, V.sub(B6, D1), a, V.sub(D1, D2));
  const Z1 = V.intersect(V1, V.sub(B6, D2), P1, [1, 0]);
  const I2 = V.intersect(Z1, V.sub(B5, D2), F2p, [1, 0]);
  const J2 = V.intersect(I2, V.sub(B4, D2), H2, [1, 0]);

  const d = { D2, D1, D3, Dp, LL1, Lb, M, P2, poly, I3, I1, J1, K1,
              Amag, Bmag, a, A1, Aa, C, O1, P1, F2p, H2,
              Q1, R1, S1, T1, U1, V1, Z1, I2, J2 };
  d.members = memberTable(d);
  // force sense per member (internalForce macro convention)
  d.comp = d.members.map(([n, form, force]) =>
    V.isCompression(V.ggbAngle(V.sub(form[1], form[0]), V.sub(force[1], force[0]))));
  d.warn = d.members.some(([n, , , cable], i) => cable && d.comp[i]);
  d.magA = Math.abs(Amag) * s.sFD;
  d.magB = Math.abs(Bmag) * s.sFD;
  return d;
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS, Dp: [...DEFAULTS.Dp], M: [...DEFAULTS.M], a: [...DEFAULTS.a] };
  let d = compute(s);

  const SW = 0.07;
  const ARROW = { w: 0.11, headLen: 0.42, headW: 0.17 };
  const memColor = (i) => ({ pending: PAL.black,
    final: (dd) => (dd.comp[i] ? PAL.blue : PAL.red) });
  const NUM = (nm, txt, opts) => dw.label(nm, txt, {
    cls: 'num', ...opts, when: (st) => st.lbl && (!opts.when || opts.when(st)) });
  // member intro steps: 1-5 -> 7, 6-12 -> 8, 13-19 -> 9, 20-21 -> 10
  const INTRO = (n) => (n <= 5 ? 7 : n <= 12 ? 8 : n <= 19 ? 9 : 10);

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('form_sub', '1 :: 300 m', { flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // ---- step 1: site + grey preview + loads --------------------------------
  for (const [i, x] of [B3, B4, B5, B6, B2, B7, B8, B9].entries()) {
    dw.dashLine(`vert${i}`, { intro: 1, dash: 0.11, color: 0x8a8a8a, flash: false });
  }
  for (const nm of ['railD2', 'railD1', 'railD3']) {
    dw.dashLine(nm, { intro: 1, dash: 0.22, color: 0xbbbbbb, flash: false });
  }
  for (let i = 0; i < 21; i++) {
    dw.seg(`grey${i}`, { intro: 1, outro: INTRO(i + 1), w: 0.045, color: 0xc0c0c0,
      flash: false });
  }
  for (let i = 0; i < 6; i++) {
    dw.arrow(`load${i}`, { intro: 1, ...ARROW });
  }
  dw.label('lF4', 'F₄=200kN', { cls: 'num', intro: 1, color: PAL.green });
  dw.label('lF5', 'F₅=200kN', { cls: 'num', intro: 1, color: PAL.green });
  dw.label('lF6', 'F₆=100kN', { cls: 'num', intro: 1, color: PAL.green });
  dw.label('lF1', 'F₁', { cls: 'num', intro: 1, color: PAL.green });
  dw.label('lF2', 'F₂', { cls: 'num', intro: 1, color: PAL.green });
  dw.label('lF3', 'F₃', { cls: 'num', intro: 1, color: PAL.green });
  for (const nm of ['D2', 'D1', 'D3']) dw.disk(`pt_${nm}`, { intro: 1, r: 0.11 });

  // ---- step 2: load line 1 ------------------------------------------------
  dw.disk('pt_D', { intro: 2, outro: TRIAL_END, r: 0.11 });
  for (let i = 0; i < 6; i++) {
    dw.arrow(`ll1_${i}`, { intro: 2, outro: TRIAL_END, ...ARROW });
    dw.label(`lll1_${i}`, ['F₁', 'F₂', 'F₃', 'F₄', 'F₅', 'F₆'][i],
             { cls: 'num', intro: 2, outro: TRIAL_END, color: PAL.green });
  }

  // ---- step 3: trial pole + rays ------------------------------------------
  dw.disk('pt_M', { intro: 3, outro: TRIAL_END, r: 0.11 });
  dw.label('lbl_M', 'o', { cls: 'point', intro: 3, outro: TRIAL_END });
  dw.strokes('trays', 7, { intro: 3, outro: TRIAL_END, w: 0.035, color: 0xa0a0a0 });

  // ---- step 4: trial funicular + action line ------------------------------
  dw.disk('pt_P2', { intro: 4, outro: TRIAL_END, r: 0.11 });
  dw.strokes('tfun', 5, { intro: 4, outro: TRIAL_END, w: 0.05, color: 0xa0a0a0 });
  dw.dashLine('tclose1', { intro: 4, outro: TRIAL_END, dash: 0.2, color: 0xa0a0a0 });
  dw.dashLine('tclose2', { intro: 4, outro: TRIAL_END, dash: 0.2, color: 0xa0a0a0 });
  dw.dashLine('actline', { intro: 4, outro: TRIAL_END, dash: 0.12, color: 0x777777 });
  dw.dashArrow('fR', { intro: 4, outro: TRIAL_END, ...ARROW, dash: 0.25 });
  dw.dashArrow('aR', { intro: 4, outro: TRIAL_END, ...ARROW, dash: 0.25 });
  dw.label('lfR', 'R', { cls: 'num', intro: 4, outro: TRIAL_END, color: PAL.green });
  dw.label('laR', 'R', { cls: 'num', intro: 4, outro: TRIAL_END, color: PAL.green });

  // ---- step 5: substitute system ------------------------------------------
  dw.disk('pt_I1', { intro: 5, outro: TRIAL_END, r: 0.11 });
  dw.seg('sub1', { intro: 5, outro: TRIAL_END, w: 0.05, color: 0xa0a0a0 });
  dw.seg('sub2', { intro: 5, outro: TRIAL_END, w: 0.05, color: 0xa0a0a0 });
  dw.seg('subTie', { intro: 5, outro: TRIAL_END, w: SW, color: PAL.red });
  NUM('lsub1', '1', { intro: 5, outro: TRIAL_END });
  NUM('lsub2', '2', { intro: 5, outro: TRIAL_END });
  NUM('lsubTie', '3', { intro: 5, outro: TRIAL_END });
  dw.seg('fsub1', { intro: 5, outro: TRIAL_END, w: 0.05, color: 0xa0a0a0 });
  dw.seg('fsub2', { intro: 5, outro: TRIAL_END, w: 0.05, color: 0xa0a0a0 });
  dw.seg('fsubTie', { intro: 5, outro: TRIAL_END, w: SW, color: PAL.red });
  NUM('lfsub1', '1', { intro: 5, outro: TRIAL_END });
  NUM('lfsub2', '2', { intro: 5, outro: TRIAL_END });
  NUM('lfsubTie', '3', { intro: 5, outro: TRIAL_END });
  dw.disk('pt_K1', { intro: 5, r: 0.09, face: 0x666666, edge: 0x666666,
          when: (st) => st.n4 });
  dw.label('lbl_K1', 'K₁', { cls: 'point', intro: 5, outro: TRIAL_END });

  // ---- step 6: reactions --------------------------------------------------
  dw.arrow('fA1', { intro: 6, outro: TRIAL_END, ...ARROW, when: (st) => !st.hideRF });
  dw.arrow('fB1', { intro: 6, outro: TRIAL_END, ...ARROW, when: (st) => !st.hideRF });
  dw.label('lfA1', 'A', { cls: 'num', intro: 6, outro: TRIAL_END, color: PAL.green,
           when: (st) => !st.hideRF });
  dw.label('lfB1', 'B', { cls: 'num', intro: 6, outro: TRIAL_END, color: PAL.green,
           when: (st) => !st.hideRF });
  dw.dashLine('wA1', { intro: 6, outro: TRIAL_END, dash: 0.14, color: 0x2e8b2e, flash: false });
  dw.dashLine('wB1', { intro: 6, outro: TRIAL_END, dash: 0.14, color: 0x2e8b2e, flash: false });
  dw.arrow('aA', { intro: 6, ...ARROW });
  dw.arrow('aB', { intro: 6, ...ARROW });
  dw.label('laA', 'A', { cls: 'num', intro: 6, color: PAL.green });
  dw.label('laB', 'B', { cls: 'num', intro: 6, color: PAL.green });

  // ---- steps 7-10: the real structure + its force diagram ------------------
  for (let i = 0; i < 21; i++) {
    const n = i + 1;
    if (n === 20 || n === 21) {
      dw.dashLine(`mem${n}`, { intro: INTRO(n), dash: 0.16,
        color: memColor(i), flash: true });
    } else {
      dw.seg(`mem${n}`, { intro: INTRO(n), w: SW, color: memColor(i) });
    }
    dw.seg(`fs${n}`, { intro: INTRO(n), w: n >= 20 ? 0.09 : SW, color: memColor(i) });
    NUM(`lm${n}`, `${n}`, { intro: INTRO(n) });
    NUM(`lf${n}`, `${n}`, { intro: INTRO(n) });
  }
  dw.disk('pt_a', { intro: 7, r: 0.11 });

  // the final load line (offset green chain) arrives with the first members
  for (let i = 0; i < 6; i++) {
    dw.arrow(`ol${i}`, { intro: 7, ...ARROW });
    dw.label(`lol${i}`, ['F₄', 'F₅', 'F₆', 'F₁', 'F₂', 'F₃'][i],
             { cls: 'num', intro: 7, color: PAL.green });
    dw.dashLine(`wol${i}`, { intro: 7, dash: 0.14, color: 0x2e8b2e, flash: false });
  }
  dw.arrow('fA2', { intro: 7, ...ARROW, when: (st) => !st.hideRF });
  dw.arrow('fB2', { intro: 7, ...ARROW, when: (st) => !st.hideRF });
  dw.label('lfA2', 'A', { cls: 'num', intro: 7, color: PAL.green, when: (st) => !st.hideRF });
  dw.label('lfB2', 'B', { cls: 'num', intro: 7, color: PAL.green, when: (st) => !st.hideRF });
  dw.dashLine('wA2', { intro: 7, dash: 0.14, color: 0x2e8b2e, flash: false,
              when: (st) => !st.hideRF });
  dw.dashLine('wB2', { intro: 7, dash: 0.14, color: 0x2e8b2e, flash: false,
              when: (st) => !st.hideRF });
  dw.label('ro1', '', { intro: 10, flash: false, color: PAL.green });
  dw.label('ro2', '', { intro: 10, flash: false, color: PAL.green });

  // step 11: pipes + warning
  for (let i = 0; i < 21; i++) {
    dw.poly(`if${i}`, 4, { intro: RESOLVE, opacity: 1.0, z: -0.18, flash: false,
      color: { pending: PAL.grey, final: (dd) => (dd.comp[i] ? PAL.blue : PAL.red) },
      when: (st) => st.o1 });
  }
  dw.label('warn', 'Attention! The tension cables cannot be in compression!',
           { flash: false, color: 0xcc1111, when: (st, dd) => dd.warn });

  // node inspector
  dw.nodeInspector(5, { when: (st) => st.node > 0, w: 1.5 * SW,
                        headLen: 0.36, headW: 0.15, r: 0.15 });

  // dual pairs + ghosts
  for (let n = 1; n <= 21; n++) dw.link(`mem${n}`, `fs${n}`, `lm${n}`, `lf${n}`);
  for (let i = 0; i < 6; i++) dw.link(`load${i}`, `ol${i}`);
  dw.link('aA', 'fA2', 'laA', 'lfA2', 'mem21', 'fs21');
  dw.link('aB', 'fB2', 'laB', 'lfB2', 'mem20', 'fs20');
  dw.link('subTie', 'fsubTie', 'lsubTie', 'lfsubTie');
  dw.link('sub1', 'fsub1', 'lsub1', 'lfsub1');
  dw.link('sub2', 'fsub2', 'lsub2', 'lfsub2');
  dw.ghostable(...Array.from({ length: 21 }, (_, i) => `fs${i + 1}`),
               ...Array.from({ length: 6 }, (_, i) => `ol${i}`), 'fA2', 'fB2');
  dw.instant('vert0', 'vert1', 'vert2', 'vert3', 'vert4', 'vert5', 'vert6', 'vert7',
             'railD2', 'railD1', 'railD3',
             ...Array.from({ length: 21 }, (_, i) => `grey${i}`));

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------
  const DECKPTS = [B3, B4, B5, B6, B2, B7, B8, B9];

  function update() {
    dw.setLabel('form_title', [-0.5, 10.2]);
    dw.setLabel('form_sub', [-0.5, 9.55]);
    dw.setLabel('force_title', [19.4, 10.2]);
    dw.setLabel('force_sub', [19.4, 9.55]);
    dw.setText('force_sub', `1 :: ${s.sFD.toFixed(0)} kN`);

    for (const [i, p] of DECKPTS.entries()) {
      dw.setDashLine(`vert${i}`, [[p[0], 10], [p[0], -8.3]]);
    }
    dw.setDashLine('railD2', [[XD2, RAIL[0]], [XD2, RAIL[1]]]);
    dw.setDashLine('railD1', [[XD1, RAIL[0]], [XD1, RAIL[1]]]);
    dw.setDashLine('railD3', [[XD3, RAIL[0]], [XD3, RAIL[1]]]);
    d.members.forEach(([n, form], i) => {
      dw.setSeg(`grey${i}`, form[0], form[1]);
    });
    // loads at B3 B4 B5 (F6 F5 F4) + B7 B8 B9 (F3 F2 F1)
    const loadAt = [[B3, 'lF6'], [B4, 'lF5'], [B5, 'lF4'],
                    [B7, 'lF3'], [B8, 'lF2'], [B9, 'lF1']];
    loadAt.forEach(([p, lb], i) => {
      dw.setArrow(`load${i}`, p, [p[0], p[1] - s.sLS]);
      const stag = i === 1 ? 0.6 : 0;                // F5 drops to avoid F6/F4
      dw.setLabel(lb, [p[0] + (i < 3 ? -0.05 : 0.1), p[1] - s.sLS - 0.45 - stag]);
    });
    for (const nm of ['D2', 'D1', 'D3']) dw.setDisk(`pt_${nm}`, d[nm]);

    // load line 1
    dw.setDisk('pt_D', d.Dp);
    for (let i = 0; i < 6; i++) {
      dw.setArrow(`ll1_${i}`, d.LL1[i], d.LL1[i + 1]);
      dw.setLabel(`lll1_${i}`, [d.Dp[0] - 0.55, (d.LL1[i][1] + d.LL1[i + 1][1]) / 2]);
    }

    // trial
    dw.setDisk('pt_M', d.M);
    dw.setLabel('lbl_M', V.add(d.M, [0.35, 0.1]));
    dw.setStrokes('trays', d.LL1.map((p) => [d.M, p]));
    dw.setDisk('pt_P2', d.P2);
    dw.setStrokes('tfun', d.poly.slice(0, -1).map((p, i) => [p, d.poly[i + 1]]));
    dw.setDashLine('tclose1', [d.P2, d.I3]);
    dw.setDashLine('tclose2', [d.poly[5], d.I3]);
    dw.setDashLine('actline', [[d.I3[0], 9.3], [d.I3[0], -2.2]]);
    dw.setDashArrow('fR', d.Dp, d.Lb);
    dw.setLabel('lfR', [d.Dp[0] + 0.5, (d.Dp[1] + d.Lb[1]) / 2]);
    dw.setDashArrow('aR', [d.I3[0], d.I1[1] + 2 * s.sLS], [d.I3[0], d.I1[1]]);
    dw.setLabel('laR', [d.I3[0] + 0.4, d.I1[1] + 1.4 * s.sLS]);

    // substitute
    dw.setDisk('pt_I1', d.I1);
    dw.setSeg('sub1', B6, d.I1);
    dw.setSeg('sub2', d.I1, B2);
    dw.setSeg('subTie', B6, B2);
    dw.setLabel('lsub1', V.add(V.mid(B6, d.I1), [-0.4, 0.1]));
    dw.setLabel('lsub2', V.add(V.mid(d.I1, B2), [0.42, 0.1]));
    dw.setLabel('lsubTie', [d.I1[0] - 0.9, YD - 0.5]);
    dw.setSeg('fsub1', d.Dp, d.J1);
    dw.setSeg('fsub2', d.J1, d.Lb);
    dw.setSeg('fsubTie', d.J1, d.K1);
    dw.setLabel('lfsub1', V.add(V.mid(d.Dp, d.J1), [0.35, 0.2]));
    dw.setLabel('lfsub2', V.add(V.mid(d.J1, d.Lb), [0.35, -0.2]));
    dw.setLabel('lfsubTie', V.add(V.mid(d.J1, d.K1), [0, 0.35]));
    dw.setDisk('pt_K1', d.K1);
    dw.setLabel('lbl_K1', V.add(d.K1, [-0.55, 0.25]));

    // reactions at load line 1 (offset right)
    const xo = d.Dp[0] + s.offR;
    dw.setArrow('fA1', [xo, d.Lb[1]], [xo, d.K1[1]]);
    dw.setArrow('fB1', [xo, d.K1[1]], [xo, d.Dp[1]]);
    dw.setLabel('lfA1', [xo + 0.4, (d.Lb[1] + d.K1[1]) / 2]);
    dw.setLabel('lfB1', [xo + 0.4, (d.K1[1] + d.Dp[1]) / 2]);
    dw.setDashLine('wA1', [d.Lb, [xo, d.Lb[1]]]);
    dw.setDashLine('wB1', [d.Dp, [xo, d.Dp[1]]]);
    const sgnA = Math.sign(d.Amag) || 1, sgnB = Math.sign(d.Bmag) || 1;
    dw.setArrow('aA', [M3[0], M3[1] - 0.9 * sgnA], [M3[0], M3[1] + 0.1 * sgnA]);
    dw.setArrow('aB', [W1[0], W1[1] - 0.9 * sgnB], [W1[0], W1[1] + 0.1 * sgnB]);
    dw.setLabel('laA', [M3[0] + 0.35, M3[1] - 0.75]);
    dw.setLabel('laB', [W1[0] - 0.4, W1[1] - 0.75]);

    // real members + force segments + numbers
    const OFFS = {
      1: [-0.3, 0.35], 2: [-0.35, 0.2], 3: [-0.35, 0], 4: [0.3, 0.25],
      5: [-0.42, 0.15], 6: [-0.32, 0], 7: [0.34, 0], 8: [0.4, 0.22],
      9: [-0.3, 0.28], 10: [0.15, 0.35], 11: [0.28, 0.28], 12: [0.28, 0.35],
      13: [0, -0.42], 14: [0, -0.42], 15: [0, -0.42], 16: [0, -0.42],
      17: [0, -0.42], 18: [0, -0.42], 19: [0, -0.42], 20: [0.42, 0], 21: [0.45, 0],
    };
    const FOFF = {
      1: [0.35, 0.28], 2: [0.4, 0.25], 3: [0.42, 0.2], 4: [-0.35, 0.25],
      5: [-0.4, 0.3], 6: [0.35, 0.2], 7: [0.38, -0.2], 8: [-0.42, -0.28],
      9: [0.35, -0.3], 10: [0.42, -0.25], 11: [0.4, -0.28], 12: [0.35, -0.35],
      13: [0.35, -0.35], 14: [0.35, -0.35], 15: [0.35, -0.35], 16: [0.5, 0.3],
      17: [0.35, 0.35], 18: [0.35, 0.35], 19: [0.35, 0.35], 20: [-0.5, 0], 21: [-0.55, 0],
    };
    d.members.forEach(([n, form, force], i) => {
      if (n >= 20) dw.setDashLine(`mem${n}`, [form[0], form[1]]);
      else dw.setSeg(`mem${n}`, form[0], form[1]);
      dw.setSeg(`fs${n}`, force[0], force[1]);
      dw.setLabel(`lm${n}`, V.add(V.mid(form[0], form[1]), OFFS[n]));
      dw.setLabel(`lf${n}`, V.add(V.mid(force[0], force[1]), FOFF[n]));
    });
    dw.setDisk('pt_a', d.a);

    // offset green loads on the final line: F4 F5 F6 F1 F2 F3 from P1 down
    const lvl = [d.P1, d.F2p, d.H2, d.a, d.A1, d.Aa, d.C];
    const xg = d.a[0] - s.offL;
    for (let i = 0; i < 6; i++) {
      dw.setArrow(`ol${i}`, [xg, lvl[i][1]], [xg, lvl[i + 1][1]]);
      dw.setLabel(`lol${i}`, [xg - 0.55, (lvl[i][1] + lvl[i + 1][1]) / 2]);
      dw.setDashLine(`wol${i}`, [[d.a[0], lvl[i][1]], [xg, lvl[i][1]]]);
    }
    const xr = d.a[0] - s.offR;
    dw.setArrow('fA2', [xr, d.C[1]], [xr, d.O1[1]]);
    dw.setArrow('fB2', [xr, d.O1[1]], [xr, d.P1[1]]);
    dw.setLabel('lfA2', [xr - 0.45, (d.C[1] + d.O1[1]) / 2]);
    dw.setLabel('lfB2', [xr - 0.45, (d.O1[1] + d.P1[1]) / 2]);
    dw.setDashLine('wA2', [d.C, [xr, d.C[1]]]);
    dw.setDashLine('wB2', [d.P1, [xr, d.P1[1]]]);
    dw.setLabel('ro1', [30, -6.6]);
    dw.setText('ro1', `|B| = |N₂₀| = ${d.magB.toFixed(0)} kN`);
    dw.setLabel('ro2', [30, -7.4]);
    dw.setText('ro2', `|A| = |N₂₁| = ${d.magA.toFixed(0)} kN`);

    // pipes
    d.members.forEach(([n, form, force], i) => {
      dw.setPoly(`if${i}`, V.rectPoints(form[0], form[1],
        s.sIF / 30 * V.dist(force[0], force[1]) * 3));
    });
    dw.setLabel('warn', [8.99, 9.3]);
  }

  // ------------------------------------------------------------------
  // node inspector: 1-3 left anchors, 4/5 feet B6/B2, 6-8 D2/D1/D3,
  // 9-11 right anchors, 12/13 foundations
  // ------------------------------------------------------------------
  function nodeInfo() {
    const n = Math.round(s.node);
    const { a, A1, Aa, C, O1, P1, F2p, H2, Q1, R1, S1, T1, U1, V1, Z1, I2, J2 } = d;
    switch (n) {
      case 1: return { pos: B3, title: 'anchor B₃',
        sides: [[H2, a], [a, J2], [J2, H2]] };
      case 2: return { pos: B4, title: 'anchor B₄',
        sides: [[F2p, H2], [H2, J2], [J2, I2], [I2, F2p]] };
      case 3: return { pos: B5, title: 'anchor B₅',
        sides: [[P1, F2p], [F2p, I2], [I2, Z1], [Z1, P1]] };
      case 4: return { pos: B6, title: 'foot B₆',
        sides: [[O1, P1], [P1, Z1], [Z1, V1], [V1, U1], [U1, O1]] };
      case 5: return { pos: B2, title: 'foot B₂',
        sides: [[C, O1], [O1, U1], [U1, T1], [T1, S1], [S1, C]] };
      case 6: return { pos: d.D2, title: 'junction D₂',
        sides: [[a, V1], [V1, Z1], [Z1, I2], [I2, J2], [J2, a]] };
      case 7: return { pos: d.D1, title: 'apex D₁',
        sides: [[a, T1], [T1, U1], [U1, V1], [V1, a]] };
      case 8: return { pos: d.D3, title: 'junction D₃',
        sides: [[a, Q1], [Q1, R1], [R1, S1], [S1, T1], [T1, a]] };
      case 9: return { pos: B7, title: 'anchor B₇',
        sides: [[Aa, C], [C, S1], [S1, R1], [R1, Aa]] };
      case 10: return { pos: B8, title: 'anchor B₈',
        sides: [[A1, Aa], [Aa, R1], [R1, Q1], [Q1, A1]] };
      case 11: return { pos: B9, title: 'anchor B₉',
        sides: [[a, A1], [A1, Q1], [Q1, a]] };
      case 12: return { pos: W1, title: 'foundation 20',
        sides: [[O1, P1], [[d.a[0] - s.offR, O1[1]], [d.a[0] - s.offR, P1[1]]]] };
      default: return { pos: M3, title: 'foundation 21',
        sides: [[C, O1], [[d.a[0] - s.offR, C[1]], [d.a[0] - s.offR, O1[1]]]] };
    }
  }

  function updateNode() {
    const n = Math.round(s.node);
    const info = nodeInfo();
    dw.selectDisk(n === 6 ? 'pt_D2' : n === 7 ? 'pt_D1' : n === 8 ? 'pt_D3' : null);
    dw.setNodeInspector(info.pos, 1.1, n > 0 ? info.title : '', info.sides);
  }

  let player = null;
  function refresh() {
    s._k = player.k;
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
  panel.slider(par, s, 'F1', 'F₁ (kN)', 50, 300, 5, refresh);
  panel.slider(par, s, 'F2', 'F₂ (kN)', 50, 300, 5, refresh);
  panel.slider(par, s, 'F3', 'F₃ (kN)', 50, 300, 5, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram (kN/unit)', 50, 200, 5, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 0.5, 2, 0.1, refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 2, 0.1, refresh);
  panel.slider(par, s, 'offL', 'offset loads', 0, 1, 0.05, refresh);
  panel.slider(par, s, 'offR', 'offset reaction forces', 0, 2, 0.1, refresh);
  panel.toggle(par, s, 'o1', 'internal-force pipes', refresh);
  panel.toggle(par, s, 'lbl', 'show labels', refresh);
  panel.toggle(par, s, 'hideRF', 'hide reaction forces in force diagram', refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node',
               'node (0 = off, 1–3 left anchors, 4/5 feet, 6–8 junctions, 9–11 right anchors, 12/13 foundations)',
               0, 13, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS, Dp: [...DEFAULTS.Dp], M: [...DEFAULTS.M],
                       a: [...DEFAULTS.a] });
    panel.syncAll();
    refresh();
  });

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const hits = [
    ['D2', () => d.D2, 1, 99], ['D1', () => d.D1, 1, 99], ['D3', () => d.D3, 1, 99],
    ['D', () => d.Dp, 2, TRIAL_END],
    ['M', () => d.M, 3, TRIAL_END],
    ['P2', () => d.P2, 4, TRIAL_END],
    ['I1', () => d.I1, 5, TRIAL_END],
    ['a', () => d.a, 7, 99],
  ];
  dw.enableDrag(
    (wx, wy, tol) => {
      let best = null;
      for (const [name, get, k0, k1] of hits) {
        if (player.k < k0 || player.k >= k1) continue;
        const p = get();
        const dd = Math.hypot(p[0] - wx, p[1] - wy);
        if (dd < tol) { best = name; tol = dd; }
      }
      return best;
    },
    (name, wx, wy) => {
      if (name === 'D2') s.yD2 = clamp(wy, RAIL[0], RAIL[1]);
      else if (name === 'D1') s.yD1 = clamp(wy, RAIL[0], RAIL[1]);
      else if (name === 'D3') s.yD3 = clamp(wy, RAIL[0], RAIL[1]);
      else if (name === 'D') s.Dp = [clamp(wx, 19.5, 24), clamp(wy, 2.5, 7)];
      else if (name === 'M') s.M = [clamp(wx, 21.6, 28), clamp(wy, -4, 4)];
      else if (name === 'P2') s.yP2 = clamp(wy, -8.4, 1.5);
      else if (name === 'I1') s.yI1 = clamp(wy, 2.6, 8);
      else if (name === 'a') s.a = [clamp(wx, 19.5, 24), clamp(wy, -1, 4.5)];
      refresh();
    },
  );

  // click a node to inspect it
  const NODEPTS = [B3, B4, B5, B6, B2, null, null, null, B7, B8, B9, W1, M3];
  const nodeAt = [];
  for (let n = 1; n <= 13; n++) {
    nodeAt.push({ at: () => (n === 6 ? d.D2 : n === 7 ? d.D1 : n === 8 ? d.D3
      : NODEPTS[n - 1]) });
  }
  dw.nodeSelect(nodeAt, (i) => {
    s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
    panel.syncAll();
    refresh();
  });

  refresh();
  return player;
}
