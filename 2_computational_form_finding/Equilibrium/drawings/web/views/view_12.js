/**
 * Drawing view/12 "Complex Prestress"
 * (https://block.arch.ethz.ch/eq/drawing/view/12) as a step-by-step
 * construction: a lens-shaped prestressed cable system. An upper cable through
 * the anchors C and E and a lower cable through D and F are linked by six
 * vertical ties that pull them together with equal forces F1. One trial
 * funicular locates the division point i on the load line; the pole line
 * through i parallel to the chord holds every pole whose funicular passes
 * through both anchors. The two prestress magnitudes CHOOSE the poles: o1 at
 * P_up*scale left of the load line (upper cable), o2 at P_lo*scale right of it
 * (lower cable, opposite side = opposite curvature). Everything is in tension.
 *
 * Live port of view_12/applet_0/geogebra.xml; the complete chain (trial
 * funicular, division point, both poles, both cables) is regression-checked
 * against the applet's baked coordinates (max err 3e-7; the applet's own
 * saved anchor D is rounded to 1.4e-4). See notes/view_12_analysis.md.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 12 — Complex Prestress',
  subtitle: 'two cables + six ties, all in tension by prestress',
  about: 'A lens-shaped prestressed system: an upper cable through the anchors C and E and a lower cable through D and F, linked by six vertical ties pulling them together with equal forces. One trial funicular fixes the division point i on the load line; the two prestress magnitudes choose the poles o₁ and o₂ on the pole line through i — on opposite sides of the load line, so the cables curve in opposite directions — and the whole system resolves in pure tension.',
  frame: [[1.37, 8.25], [167.17, 91.16]],
};

// fixed geometry from the applet
const C  = [8.81, 64.87];                              // top-left anchor
const E  = [80.08781803483242, 64.86863895929665];     // top-right anchor
const D  = [8.806810089256569, 38.19477340672393];     // bottom-left anchor
const F4 = [80.08781803483242, 38.19477340672393];     // bottom-right anchor
const GX = [21.766993352088544, 30.80898167499457, 39.8509699979006,
            48.89295832080663, 58.085646449094426, 67.12763477200045];
const GUIDE_Y = [82.37995634465788, 9.290550734501071]; // guide lines span
const QTIP_Y = 68.28120071461679;                       // Q arrow tip height
const DOWN = [0, -1];
const RESOLVE = 32;

const DEFAULTS = {
  F1: 6.6,                    // force in every tie [1, 10] kN
  sFD: 0.7,                   // scaleForceDiagram [0.5, 2] units/kN
  PL: 0,                      // PointLoad: tie carrying the extra load Q (0 = none)
  Q: 8,                       // extra point load [-8, 8] kN
  sLS: 7,                     // loadSymbol [5, 10]
  Fup: 42,                    // F_PrestressUpperChord [10, 50] kN
  Flo: 42,                    // F_PrestressLowerChord [10, 50] kN
  mx: 127.98550722392798, my: 68.23927700051057,   // load line start M (top)
  // trial start U on C's vertical: the applet saves y = 16.67, which puts the
  // trial partly below the visible window; U is a free "start anywhere" point,
  // so we start it higher to keep the whole trial inside the frame
  uy: 33,
  vx: 92.20408238752648, vy: 58.418687288956995,   // trial pole o'
  r3y: 36.31222655677313,     // height of the P_up / P_lo dimension line
  sIF: 0.04,
  o1: true,
  n4: true,
  hideRF: false,              // applet checkbox: hide reactions in force diagram
  node: 0,                    // node-equilibrium inspector (0 = off)
};

// every construction move happens on BOTH sides at once
const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'Four anchors', d: 'left: an upper cable will run from C to E, a lower cable from D to F — all four ends anchored in the rock' },
  { t: 'Six ties → the load line', d: 'left: six vertical lines of action for the ties — right: the six equal forces F₁…F₆ they exert, stacked tip-to-tail down the load line' },
  { t: 'Trial pole o′', d: 'right: place a trial pole o′ anywhere, with rays to all seven load-line points' },
  { t: 'Trial string ∥ first ray', d: 'left: start anywhere on C\'s vertical (at U), parallel to the first ray, up to line of action 1' },
  { t: 'Trial string ∥ next ray', d: 'left: continue parallel to the next ray to line of action 2' },
  { t: 'Trial string ∥ next ray', d: 'left: continue to line of action 3' },
  { t: 'Trial string ∥ next ray', d: 'left: continue to line of action 4' },
  { t: 'Trial string ∥ next ray', d: 'left: continue to line of action 5' },
  { t: 'Trial string ∥ next ray', d: 'left: continue to line of action 6' },
  { t: 'Trial string ∥ last ray', d: 'left: continue parallel to the last ray until E\'s vertical' },
  { t: 'Closing → division point i', d: 'left: dashed trial closing — right: the parallel through o′ cuts the load line at the division point i' },
  { t: 'Chord → pole line', d: 'left: dashed chord C–E — right: through i, parallel to it: ANY pole on this line yields a funicular through both C and E' },
  { t: 'Prestress picks the pole o₁', d: 'right: the upper prestress P_up sets the pole o₁ at distance P_up × scale LEFT of the load line' },
  { t: 'Upper cable 1', d: 'right: ray o₁ to the bottom of the load line — left: from C parallel to it → line of action 1' },
  { t: 'Upper cable 2', d: 'right: the next ray — left: parallel to it → line of action 2' },
  { t: 'Upper cable 3', d: 'right: the next ray — left: parallel → line of action 3' },
  { t: 'Upper cable 4', d: 'right: the next ray — left: parallel → line of action 4' },
  { t: 'Upper cable 5', d: 'right: the next ray — left: parallel → line of action 5' },
  { t: 'Upper cable 6', d: 'right: the next ray — left: parallel → line of action 6' },
  { t: 'Upper cable 7', d: 'right: ray o₁ to the top of the load line — left: parallel to it — it lands exactly on E' },
  { t: 'Reactions A and B', d: 'left: the upper cable pulls on its anchors — right: the same vectors close the upper polygon through o₁' },
  { t: 'Prestress picks the pole o₂', d: 'right: the lower prestress P_lo sets the pole o₂ on the OTHER side of the load line → the lower cable curves the other way' },
  { t: 'Lower cable 8', d: 'right: ray o₂ to the bottom of the load line — left: from D parallel to it → line of action 1' },
  { t: 'Lower cable 9', d: 'right: the next ray — left: parallel to it → line of action 2' },
  { t: 'Lower cable 10', d: 'right: the next ray — left: parallel → line of action 3' },
  { t: 'Lower cable 11', d: 'right: the next ray — left: parallel → line of action 4' },
  { t: 'Lower cable 12', d: 'right: the next ray — left: parallel → line of action 5' },
  { t: 'Lower cable 13', d: 'right: the next ray — left: parallel → line of action 6' },
  { t: 'Lower cable 14', d: 'right: ray o₂ to the top of the load line — left: parallel to it — it lands exactly on F' },
  { t: 'Reactions C and D', d: 'left: the lower cable pulls on D and F — right: the same vectors close the lower polygon through o₂' },
  { t: 'The six ties', d: 'left: the ties link the cables, pulling them together — right: each tie\'s force IS its load-line edge F₁…F₆' },
  { t: 'Tension everywhere', d: 'the trial construction disappears — prestress puts cables AND ties in pure tension (pink)' },
];

const cache = {};
function inter(key, p1, d1, p2, d2) {
  cache[key] = V.intersect(p1, d1, p2, d2) || cache[key] || p1;
  return cache[key];
}

// the construction (mirrors applet_0/geogebra.xml, evaluated live)
function compute(s) {
  // load line M (top) down to T; gap k (= tie k's force) widens by Q when PL = k
  const M = [s.mx, s.my];
  const pts = [M];
  for (const gap of [6, 5, 4, 3, 2, 1]) {
    const dy = s.F1 * s.sFD + (Math.round(s.PL) === gap ? s.Q * s.sFD : 0);
    pts.push([pts[pts.length - 1][0], pts[pts.length - 1][1] - dy]);
  }
  const L = pts.slice().reverse();          // bottom-up: L[0]=T ... L[6]=M

  // trial funicular from U on C's vertical, pole o' = Vt
  const Vt = [s.vx, s.vy];
  const U = [C[0], s.uy];
  const tn = [U];
  const tx = [...GX, E[0]];
  for (let k = 0; k < 7; k++) {
    tn.push(inter(`t${k}`, tn[k], V.sub(L[k], Vt), [tx[k], 0], DOWN));
  }

  // division point i; the pole line through i parallel to the chord C-E
  const ip = inter('ip', Vt, V.sub(tn[7], U), M, DOWN);
  const uch = V.unit(V.sub(E, C));
  const G1 = V.sub(ip, V.mul(uch, s.Fup * s.sFD));   // pole o1 (left)
  const N1 = V.add(ip, V.mul(uch, s.Flo * s.sFD));   // pole o2 (right)

  // the two cables: funiculars from C (pole o1) and D (pole o2)
  const UP = [C];
  const LO = [D];
  for (let k = 0; k < 6; k++) {
    UP.push(inter(`u${k}`, UP[k], V.sub(L[k], G1), [GX[k], 0], DOWN));
    LO.push(inter(`l${k}`, LO[k], V.sub(L[k], N1), [GX[k], 0], DOWN));
  }
  UP.push(E);                               // last member lands on E / F4
  LO.push(F4);

  // colors via the applet's internalForce angle: Angle(Line[A,B], Line[C,D])
  const col = (w) => (V.isCompression(w) ? PAL.blue : PAL.red);
  const cu = [], cl = [], ct = [];
  for (let k = 0; k < 7; k++) {
    cu.push(col(V.ggbAngle(V.sub(UP[k + 1], UP[k]), V.sub(L[k], G1))));
    cl.push(col(V.ggbAngle(V.sub(LO[k + 1], LO[k]), V.sub(N1, L[k]))));
  }
  for (let k = 0; k < 6; k++) {
    ct.push(col(V.ggbAngle(V.sub(LO[k + 1], UP[k + 1]), V.sub(L[k], L[k + 1]))));
  }

  // member forces [kN]
  const Nu = L.map((p) => V.dist(p, G1) / s.sFD);     // upper members 1..7 (per ray)
  const Nl = L.map((p) => V.dist(p, N1) / s.sFD);     // lower members 8..14
  const Nt = [];                                      // ties 1..6
  for (let k = 0; k < 6; k++) Nt.push(V.dist(L[k + 1], L[k]) / s.sFD);

  return { L, M, Vt, U, tn, ip, uch, G1, N1, UP, LO, cu, cl, ct, Nu, Nl, Nt };
}

/** subscript digits for member force readouts */
const SUBD = '₀₁₂₃₄₅₆₇₈₉';
const subN = (n) => String(n).split('').map((c) => SUBD[+c]).join('');

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  let d = compute(s);

  const W_BAR = 0.42, W_TIE = 0.55, W_RAY = 0.2, W_STR = 0.34;
  const ARROW = { w: 0.55, headLen: 1.9, headW: 0.72 };
  const memberColor = (arr, i) => ({ pending: PAL.black, final: (dd) => dd[arr][i] });

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // step 1: the four hatched anchor blocks (site background)
  for (const n of ['anchC', 'anchE', 'anchD', 'anchF']) {
    dw.strokes(n, 8, { intro: 1, w: 0.16, color: PAL.grey, flash: false });
  }
  dw.instant('anchC', 'anchE', 'anchD', 'anchF');

  // step 2: six lines of action (left) + the load line edges (right):
  // green arrows drawn ON the line, one per tie, labels F1..F6
  for (let k = 0; k < 6; k++) {
    dw.dashLine(`gv${k}`, { intro: 2, dash: 1.0 });
    dw.arrow(`edge${k}`, { intro: 2, ...ARROW });
    dw.label(`fl${k}`, `F${SUBD[k + 1]}`, { cls: 'num', intro: 2, color: PAL.green });
  }
  dw.dashLine('gload', { intro: 2, dash: 1.0 });
  dw.arrow('qarr', { intro: 2, ...ARROW, when: (st) => st.PL >= 1 });
  dw.label('lblQ', 'Q', { cls: 'num', intro: 2, color: PAL.green, when: (st) => st.PL >= 1 });

  // steps 3-10: trial pole + rays (grey), trial strings across the verticals
  for (let k = 0; k < 7; k++) {
    dw.seg(`tr${k}`, { intro: 3, outro: RESOLVE, w: W_RAY, color: PAL.grey });
    dw.seg(`tf${k}`, { intro: 4 + k, outro: RESOLVE, w: W_STR, color: PAL.grey });
    dw.highlight(`tr${k}`, [4 + k]);
  }

  // step 11: trial closing (left) -> division point i (right)
  dw.dashLine('tclose', { intro: 11, outro: RESOLVE, dash: 1.0 });
  dw.dashLine('tpar', { intro: 11, outro: RESOLVE, dash: 1.0 });

  // step 12: the chord C-E + the pole line through i (black dashed)
  dw.dashLine('chord', { intro: 12, outro: RESOLVE, color: PAL.black, dash: 1.3 });
  dw.dashLine('poleLine', { intro: 12, outro: RESOLVE, color: PAL.black, dash: 1.3 });

  // step 13 / 22: the poles fixed by the prestress (dashed distance segments,
  // dimension lines with end ticks, grey dashed droppers) -- these persist
  dw.dashLine('dP1', { intro: 13, color: PAL.black, dash: 1.3 });
  dw.dashLine('dP2', { intro: 22, color: PAL.black, dash: 1.3 });
  dw.strokes('dimU', 3, { intro: 13, w: 0.16, color: PAL.grey });
  dw.strokes('dimL', 3, { intro: 22, w: 0.16, color: PAL.grey });
  dw.dashLine('dropG1', { intro: 13, dash: 1.0 });
  dw.dashLine('dropN1', { intro: 22, dash: 1.0 });
  dw.label('lblPup', '', { intro: 13, color: PAL.grey });
  dw.label('lblPlo', '', { intro: 22, color: PAL.grey });

  // steps 14-20 / 23-29: the members, each drawn WITH its pole ray
  for (let k = 0; k < 7; k++) {
    dw.seg(`fr${k}`, { intro: 14 + k, w: W_BAR, color: memberColor('cu', k) });
    dw.seg(`useg${k}`, { intro: 14 + k, w: W_BAR, color: memberColor('cu', k) });
    dw.seg(`lr${k}`, { intro: 23 + k, w: W_BAR, color: memberColor('cl', k) });
    dw.seg(`lseg${k}`, { intro: 23 + k, w: W_BAR, color: memberColor('cl', k) });
    dw.label(`fnU${k}`, `${k + 1}`, { cls: 'num', intro: 14 + k, color: { final: (dd) => dd.cu[k] } });
    dw.label(`snU${k}`, `${k + 1}`, { cls: 'num', intro: 14 + k, color: { final: (dd) => dd.cu[k] } });
    dw.label(`fnL${k}`, `${k + 8}`, { cls: 'num', intro: 23 + k, color: { final: (dd) => dd.cl[k] } });
    dw.label(`snL${k}`, `${k + 8}`, { cls: 'num', intro: 23 + k, color: { final: (dd) => dd.cl[k] } });
  }

  // step 21 / 30: reactions, form + force sides together (force ones toggleable)
  const rf = (st) => !st.hideRF;
  for (const [n, intro] of [['reacA', 21], ['reacB', 21], ['reacC', 30], ['reacD', 30]]) {
    dw.arrow(n, { intro, ...ARROW });
  }
  for (const [n, intro] of [['vA', 21], ['vB', 21], ['vC', 30], ['vD', 30]]) {
    dw.arrow(n, { intro, ...ARROW, when: rf });
  }
  for (const [n, txt, intro] of [['lblAf', 'A', 21], ['lblBf', 'B', 21],
                                 ['lblCf', 'C', 30], ['lblDf', 'D', 30]]) {
    dw.label(n, txt, { cls: 'num', intro, color: PAL.green });
  }
  for (const [n, txt, intro] of [['lblAr', 'A', 21], ['lblBr', 'B', 21],
                                 ['lblCr', 'C', 30], ['lblDr', 'D', 30]]) {
    dw.label(n, txt, { cls: 'num', intro, color: PAL.green, when: rf });
  }

  // step 31: the six ties (their forces are the load-line edges F1..F6)
  for (let k = 0; k < 6; k++) {
    dw.seg(`tie${k}`, { intro: 31, w: W_TIE, color: memberColor('ct', k) });
    dw.highlight(`edge${k}`, [31]);
  }

  // points
  const HANDLE = { r: 0.72 }, DERIVED = { r: 0.54 };
  const show = (st) => st.n4;
  for (const n of ['C', 'E', 'D', 'F4']) dw.disk(`pt_${n}`, { intro: 1, ...HANDLE, when: show });
  for (let k = 0; k < 7; k++) dw.disk(`pt_L${k}`, { intro: 2, ...DERIVED, when: show });
  dw.disk('pt_V', { intro: 3, outro: RESOLVE, ...HANDLE, when: show });
  dw.disk('pt_U', { intro: 4, outro: RESOLVE, ...HANDLE, when: show });
  for (let k = 0; k < 7; k++) dw.disk(`pt_t${k}`, { intro: 4 + k, outro: RESOLVE, ...DERIVED, when: show });
  dw.disk('pt_i', { intro: 11, ...DERIVED, when: show });
  dw.disk('pt_G1', { intro: 13, ...DERIVED, when: show });
  dw.disk('pt_N1', { intro: 22, ...DERIVED, when: show });
  for (let k = 0; k < 6; k++) {
    dw.disk(`pt_up${k}`, { intro: 14 + k, ...DERIVED, when: show });
    dw.disk(`pt_lo${k}`, { intro: 23 + k, ...DERIVED, when: show });
  }
  dw.disk('pt_R3', { intro: 13, ...HANDLE, when: show });

  const letters = {
    C: ['C', 1], E: ['E', 1], D: ['D', 1], F4: ['F', 1],
    V: ['o′', 3, RESOLVE], i: ['i', 11], G1: ['o₁', 13], N1: ['o₂', 22],
  };
  for (const [p, [text, intro, outro]] of Object.entries(letters)) {
    dw.label(`lbl_${p}`, text, { cls: 'point', intro, outro, when: show });
  }

  // internal-force pipes (on by default): 7 upper + 6 ties + 7 lower
  for (let k = 0; k < 20; k++) {
    const arr = k < 7 ? 'cu' : k < 13 ? 'ct' : 'cl';
    const i = k < 7 ? k : k < 13 ? k - 7 : k - 13;
    dw.poly(`if${k}`, 4, {
      intro: RESOLVE, opacity: 0.45, flash: false,
      color: { pending: PAL.grey, final: (dd) => dd[arr][i] },
      when: (st) => st.o1,
    });
  }
  // force readouts (two columns: upper members, lower members, ties line)
  for (let k = 0; k < 14; k++) {
    const arr = k < 7 ? 'cu' : 'cl';
    const i = k % 7;
    dw.label(`ro${k}`, '', { intro: RESOLVE, flash: false,
                             color: { final: (dd) => dd[arr][i] } });
  }
  dw.label('roT', '', { intro: RESOLVE, flash: false, color: { final: (dd) => dd.ct[0] } });

  // node-equilibrium inspector: free-body star inset at the top of the form
  // diagram + tip-to-tail forces on the node's sub-polygon in the force
  // diagram. Interior nodes balance three forces (two cable members + tie);
  // the anchors balance member force against reaction.
  dw.nodeInspector(3, { when: (st) => st.node > 0, w: 1.5 * W_BAR, headLen: 2.2, headW: 0.85, r: 0.55 });
  const NODE_NAMES = ['A', '1·2', '2·3', '3·4', '4·5', '5·6', '6·7', 'B',
                      'C', '8·9', '9·10', '10·11', '11·12', '12·13', '13·14', 'D'];
  const NODE_DISKS = ['pt_C', 'pt_up0', 'pt_up1', 'pt_up2', 'pt_up3', 'pt_up4', 'pt_up5', 'pt_E',
                      'pt_D', 'pt_lo0', 'pt_lo1', 'pt_lo2', 'pt_lo3', 'pt_lo4', 'pt_lo5', 'pt_F4'];
  const nodeAt = [
    () => C, ...[0, 1, 2, 3, 4, 5].map((k) => () => d.UP[k + 1]), () => E,
    () => D, ...[0, 1, 2, 3, 4, 5].map((k) => () => d.LO[k + 1]), () => F4,
  ];
  const nodePolys = () => {
    const { L, G1, N1 } = d;
    const upper = [0, 1, 2, 3, 4, 5].map((j) => [[L[j], G1], [G1, L[j + 1]], [L[j + 1], L[j]]]);
    const lower = [0, 1, 2, 3, 4, 5].map((j) => [[L[j], L[j + 1]], [L[j + 1], N1], [N1, L[j]]]);
    return [
      [[G1, L[0]], [L[0], G1]], ...upper, [[L[6], G1], [G1, L[6]]],
      [[L[0], N1], [N1, L[0]]], ...lower, [[N1, L[6]], [L[6], N1]],
    ];
  };

  function updateNode() {
    const j = Math.max(0, Math.min(NODE_DISKS.length - 1, Math.round(s.node) - 1));
    dw.selectDisk(s.node > 0 ? NODE_DISKS[j] : null);
    dw.setNodeInspector([44, 83], 5.4, `node ${NODE_NAMES[j]}`, nodePolys()[j]);
  }

  // dual pairs (yellow hover)
  for (let k = 0; k < 7; k++) {
    dw.link(`useg${k}`, `fr${k}`, `fnU${k}`, `snU${k}`);
    dw.link(`lseg${k}`, `lr${k}`, `fnL${k}`, `snL${k}`);
    dw.link(`tf${k}`, `tr${k}`);
  }
  for (let k = 0; k < 6; k++) dw.link(`tie${k}`, `edge${k}`, `fl${k}`);
  dw.link('tclose', 'tpar');
  dw.link('chord', 'poleLine');
  dw.link('reacA', 'vA', 'lblAf', 'lblAr');
  dw.link('reacB', 'vB', 'lblBf', 'lblBr');
  dw.link('reacC', 'vC', 'lblCf', 'lblCr');
  dw.link('reacD', 'vD', 'lblDf', 'lblDr');
  dw.link('dP1', 'dimU', 'lblPup', 'dropG1');
  dw.link('dP2', 'dimL', 'lblPlo', 'dropN1');
  dw.ghostable('fr0', 'fr1', 'fr2', 'fr3', 'fr4', 'fr5', 'fr6',
               'lr0', 'lr1', 'lr2', 'lr3', 'lr4', 'lr5', 'lr6',
               'edge0', 'edge1', 'edge2', 'edge3', 'edge4', 'edge5');

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  /** hatched anchor block: face line behind P (away = w) + 45-degree ticks */
  function hatch(P, w) {
    const p = V.perp(w);
    const A = V.add(V.add(P, V.mul(w, 1.1)), V.mul(p, -2.6));
    const B = V.add(V.add(P, V.mul(w, 1.1)), V.mul(p, 2.6));
    const tick = V.mul(V.unit(V.add(w, p)), 1.7);
    const pairs = [[A, B]];
    for (let k = 0; k < 7; k++) {
      const base = V.add(A, V.mul(V.sub(B, A), k / 6));
      pairs.push([base, V.add(base, tick)]);
    }
    return pairs;
  }

  /** dimension line a-b with perpendicular end ticks */
  function dim(a, b) {
    const t = V.mul(V.perp(V.unit(V.sub(b, a))), 0.9);
    return [[a, b], [V.sub(a, t), V.add(a, t)], [V.sub(b, t), V.add(b, t)]];
  }

  function update() {
    dw.setLabel('form_title', [8, 88.9]);
    dw.setLabel('force_title', [110, 88.9]);
    dw.setLabel('force_sub', [110, 86.5]);
    dw.setText('force_sub', `1 unit :: ${(1 / s.sFD).toFixed(2)} kN`);

    // anchors (site): faces perpendicular to the cable ends
    dw.setStrokes('anchC', hatch(C, V.unit(V.sub(C, d.UP[1]))));
    dw.setStrokes('anchE', hatch(E, V.unit(V.sub(E, d.UP[6]))));
    dw.setStrokes('anchD', hatch(D, V.unit(V.sub(D, d.LO[1]))));
    dw.setStrokes('anchF', hatch(F4, V.unit(V.sub(F4, d.LO[6]))));
    dw.setDisk('pt_C', C);
    dw.setDisk('pt_E', E);
    dw.setDisk('pt_D', D);
    dw.setDisk('pt_F4', F4);

    // guides + load line
    for (let k = 0; k < 6; k++) {
      dw.setDashLine(`gv${k}`, [[GX[k], GUIDE_Y[0]], [GX[k], GUIDE_Y[1]]]);
      dw.setArrow(`edge${k}`, d.L[k + 1], d.L[k]);            // downward
      dw.setLabel(`fl${k}`, V.add(V.mid(d.L[k + 1], d.L[k]), [2.3, 0]));
    }
    dw.setDashLine('gload', [[d.M[0], GUIDE_Y[0]], [d.M[0], GUIDE_Y[1]]]);
    for (let k = 0; k < 7; k++) dw.setDisk(`pt_L${k}`, d.L[k]);
    const qx = s.PL >= 1 ? GX[Math.round(s.PL) - 1] : GX[0];
    dw.setArrow('qarr', [qx, QTIP_Y + s.sLS], [qx, QTIP_Y]);
    dw.setLabel('lblQ', [qx + 1.6, QTIP_Y + s.sLS - 1.4]);

    // trial construction
    for (let k = 0; k < 7; k++) {
      dw.setSeg(`tr${k}`, d.L[k], d.Vt);
      dw.setSeg(`tf${k}`, d.tn[k], d.tn[k + 1]);
      dw.setDisk(`pt_t${k}`, d.tn[k + 1]);
    }
    dw.setDisk('pt_V', d.Vt);
    dw.setDisk('pt_U', d.U);
    dw.setDashLine('tclose', [d.U, d.tn[7]]);
    dw.setDashLine('tpar', [d.Vt, d.ip]);
    dw.setDisk('pt_i', d.ip);

    // chord + pole line + poles + dimensions
    dw.setDashLine('chord', [C, E]);
    dw.setDashLine('poleLine', [V.sub(d.ip, V.mul(d.uch, s.Fup * s.sFD + 7)),
                                V.add(d.ip, V.mul(d.uch, s.Flo * s.sFD + 7))]);
    dw.setDashLine('dP1', [d.ip, d.G1]);
    dw.setDashLine('dP2', [d.ip, d.N1]);
    dw.setDisk('pt_G1', d.G1);
    dw.setDisk('pt_N1', d.N1);
    const R3 = [d.M[0], s.r3y];
    const U3 = [d.G1[0], s.r3y];
    const V3 = [d.N1[0], s.r3y];
    dw.setStrokes('dimU', dim(U3, R3));
    dw.setStrokes('dimL', dim(R3, V3));
    dw.setDashLine('dropG1', [U3, d.G1]);
    dw.setDashLine('dropN1', [V3, d.N1]);
    dw.setDisk('pt_R3', R3);
    dw.setLabel('lblPup', [V.mid(U3, R3)[0], s.r3y - 1.9]);
    dw.setLabel('lblPlo', [V.mid(R3, V3)[0], s.r3y - 1.9]);
    dw.setText('lblPup', `P_upper = ${s.Fup.toFixed(1)} kN`);
    dw.setText('lblPlo', `P_lower = ${s.Flo.toFixed(1)} kN`);

    // members + rays + numbers
    const fanNum = (pole, k) => {
      // number position along ray k, pushed off the middle ray of the fan
      const pos = V.add(d.L[k], V.mul(V.sub(pole, d.L[k]), 0.26));
      const ref = V.add(d.L[3], V.mul(V.sub(pole, d.L[3]), 0.26));
      const away = k === 3 ? [0, 1] : V.unit(V.sub(pos, ref));
      return V.add(pos, V.mul(away, 1.2));
    };
    for (let k = 0; k < 7; k++) {
      dw.setSeg(`fr${k}`, d.G1, d.L[k]);
      dw.setSeg(`useg${k}`, d.UP[k], d.UP[k + 1]);
      dw.setSeg(`lr${k}`, d.N1, d.L[k]);
      dw.setSeg(`lseg${k}`, d.LO[k], d.LO[k + 1]);
      const pu = V.perp(V.unit(V.sub(d.UP[k + 1], d.UP[k])));
      dw.setLabel(`fnU${k}`, V.add(V.mid(d.UP[k], d.UP[k + 1]),
                                   V.mul(pu, pu[1] > 0 ? 1.5 : -1.5)));
      const pl = V.perp(V.unit(V.sub(d.LO[k + 1], d.LO[k])));
      dw.setLabel(`fnL${k}`, V.add(V.mid(d.LO[k], d.LO[k + 1]),
                                   V.mul(pl, pl[1] > 0 ? -1.5 : 1.5)));
      dw.setLabel(`snU${k}`, fanNum(d.G1, k));
      dw.setLabel(`snL${k}`, fanNum(d.N1, k));
    }
    for (let k = 0; k < 6; k++) {
      dw.setDisk(`pt_up${k}`, d.UP[k + 1]);
      dw.setDisk(`pt_lo${k}`, d.LO[k + 1]);
      dw.setSeg(`tie${k}`, d.UP[k + 1], d.LO[k + 1]);
    }

    // reactions: at the anchors (length sLS, like the applet's loadSymbol
    // circles) and ON the closing rays of the two force polygons
    dw.setArrow('reacA', C, V.add(C, V.mul(V.unit(V.sub(C, d.UP[1])), s.sLS)));
    dw.setArrow('reacB', E, V.add(E, V.mul(V.unit(V.sub(E, d.UP[6])), s.sLS)));
    dw.setArrow('reacC', D, V.add(D, V.mul(V.unit(V.sub(D, d.LO[1])), s.sLS)));
    dw.setArrow('reacD', F4, V.add(F4, V.mul(V.unit(V.sub(F4, d.LO[6])), s.sLS)));
    dw.setArrow('vA', d.L[0], d.G1);
    dw.setArrow('vB', d.G1, d.L[6]);
    dw.setArrow('vC', d.N1, d.L[0]);
    dw.setArrow('vD', d.L[6], d.N1);
    dw.setLabel('lblAf', V.add(C, V.add(V.mul(V.unit(V.sub(C, d.UP[1])), s.sLS + 1.6), [0, -1.4])));
    dw.setLabel('lblBf', V.add(E, V.add(V.mul(V.unit(V.sub(E, d.UP[6])), s.sLS + 1.6), [0, -1.4])));
    dw.setLabel('lblCf', V.add(D, V.add(V.mul(V.unit(V.sub(D, d.LO[1])), s.sLS + 1.6), [0, 1.4])));
    dw.setLabel('lblDf', V.add(F4, V.add(V.mul(V.unit(V.sub(F4, d.LO[6])), s.sLS + 1.6), [0, 1.4])));
    dw.setLabel('lblAr', V.add(V.mid(d.L[0], d.G1), [-1.2, -1.6]));
    dw.setLabel('lblBr', V.add(V.mid(d.G1, d.L[6]), [-1.7, 1.4]));
    dw.setLabel('lblCr', V.add(V.mid(d.N1, d.L[0]), [1.2, -1.6]));
    dw.setLabel('lblDr', V.add(V.mid(d.L[6], d.N1), [1.7, 1.4]));

    // point labels
    const loff = { C: [-1.9, 1.2], E: [1.9, 1.2], D: [-1.9, -1.2], F4: [1.9, -1.2],
                   V: [-2.1, 0.3], i: [-1.9, -1.8], G1: [-1.2, 1.7], N1: [1.4, 1.7] };
    const lat = { C, E, D, F4, V: d.Vt, i: d.ip, G1: d.G1, N1: d.N1 };
    for (const p of Object.keys(letters)) {
      dw.setLabel(`lbl_${p}`, V.add(lat[p], loff[p]));
    }

    // pipes + readouts
    for (let k = 0; k < 7; k++) {
      dw.setPoly(`if${k}`, V.rectPoints(d.UP[k], d.UP[k + 1], s.sIF * d.Nu[k]));
      dw.setPoly(`if${13 + k}`, V.rectPoints(d.LO[k], d.LO[k + 1], s.sIF * d.Nl[k]));
    }
    for (let k = 0; k < 6; k++) {
      dw.setPoly(`if${7 + k}`, V.rectPoints(d.UP[k + 1], d.LO[k + 1], s.sIF * d.Nt[k]));
    }
    for (let k = 0; k < 14; k++) {
      dw.setLabel(`ro${k}`, [k < 7 ? 96 : 133, 31 - 2.2 * (k % 7)]);
      const val = k < 7 ? d.Nu[k] : d.Nl[k - 7];
      dw.setText(`ro${k}`, `N${subN(k + 1)} = ${val.toFixed(1)} kN`);
    }
    dw.setLabel('roT', [96, 31 - 2.2 * 7]);
    const tieVals = [...new Set(d.Nt.map((v) => v.toFixed(1)))].join(' / ');
    dw.setText('roT', `ties: N = ${tieVals} kN`);
  }

  function refresh() {
    d = compute(s);
    update();
    updateNode();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  // ------------------------------------------------------------------
  // side panel + dragging
  // ------------------------------------------------------------------

  const view = panel.section('View');
  panel.button(view, 'zoom fit', () => dw.zoomFit());

  const par = panel.section('Parameters');
  panel.slider(par, s, 'F1', 'F₁ — tie force (kN)', 1, 10, 0.1, refresh);
  panel.slider(par, s, 'Fup', 'P_up — prestress upper cable (kN)', 10, 50, 0.5, refresh);
  panel.slider(par, s, 'Flo', 'P_lo — prestress lower cable (kN)', 10, 50, 0.5, refresh);
  panel.slider(par, s, 'PL', 'point load at tie (0 = none)', 0, 6, 1, refresh);
  panel.slider(par, s, 'Q', 'Q — extra point load (kN)', -8, 8, 0.1, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram (units/kN)', 0.5, 2, 0.05, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 5, 10, 0.5, refresh);
  panel.toggle(par, s, 'o1', 'show internal forces', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.12, 0.005, refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  panel.toggle(par, s, 'hideRF', 'hide reactions in force diagram', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'node (0 = off): A, 1·2 … 6·7, B, C, 8·9 … 13·14, D',
               0, 16, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS });
    panel.syncAll();
    refresh();
  });

  const hits = [
    ['M', () => d.M, 2, 99],
    ['V', () => d.Vt, 3, RESOLVE],
    ['U', () => d.U, 4, RESOLVE],
    ['R3', () => [d.M[0], s.r3y], 13, 99],
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
      if (name === 'M') { s.mx = Math.max(95, Math.min(160, wx)); s.my = wy; }
      else if (name === 'V') { s.vx = wx; s.vy = wy; }
      else if (name === 'U') s.uy = Math.max(10, Math.min(34, wy));
      else if (name === 'R3') s.r3y = Math.max(11, Math.min(38, wy));
      refresh();
    },
  );

  // click a node point to inspect it (clicking again deselects); the panel
  // slider stays in sync
  dw.nodeSelect(nodeAt.map((at) => ({ at })), (i) => {
    s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
    panel.syncAll();
    refresh();
  });

  refresh();
  return player;
}
