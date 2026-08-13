/**
 * Drawing view/15 "Cable For Non-uniformly Distributed Load"
 * (https://block.arch.ethz.ch/eq/drawing/view/15) as a step-by-step
 * construction: a cable between two level supports A and B carries a base
 * load g over the whole span plus an additional load q = factor·g over the
 * left part. The span is discretised into 24 strips; the two partial
 * resultants R1 (loaded zone) and R2 (rest) are hung on trial funiculars
 * through a chosen sag point V3, giving trial poles o'1 and o'2; the
 * parallelogram over the division point closes at the pole o whose funicular
 * passes through A, V3's boundary vertical and B.
 *
 * Live port of view_15/applet_0/geogebra.xml; the full chain (load line,
 * trial poles, pole, all 24 cable vertices, tangent intersection T11,
 * resultant location) is regression-checked against the applet's baked
 * coordinates (66 targets, max error 5e-7 = the dump's rounding).
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 15 — Cable For Non-uniformly Distributed Load',
  subtitle: 'a cable under a partial extra load: two resultants, two trials, one pole',
  about: 'A cable between two level supports carries a base load g over the whole span and an additional load q over the left part, discretised into 24 strips. The two partial resultants are hung on trial funiculars through a chosen sag point; the parallelogram of their trial poles closes at the pole whose funicular — the cable — passes through both supports and the sag point’s vertical.',
  frame: [[3.0, 4.5], [117, 76]],
};

// fixed y-levels of the applet (hidden handle points)
const Y_SUP = 55.14;         // support level (A, B)
const Y_Q = 66.70658219022937;        // q-block rail
const Y_G = 61.640073618735116;       // g-block top
const Y_GRID_T = 70, Y_GRID_B = 6.576962386594359;   // strip-grid extent
const Y_RTIP = 50.71201973056903;     // resultant arrow tip level
const RAIL_Y = [25.200582150680, 51.386520243215];   // V3's rail extent
const X_LL = 93.80636420662152;       // the load line's x (S2 default)
const NSTRIP = 24;
const RESOLVE = 15;

const DEFAULTS = {
  ax: 10, bx: 69.99093107425405,      // supports (level Y_SUP)
  s2: [93.80636420662152, 62.30426191048729],   // load-line start
  v3y: 35.18264551979542,             // sag point on the boundary vertical
  gq: 3.2,                            // g [1, 10] kN per strip
  fq: 2.2,                            // factor q/g [0, 3]
  lq: 10,                             // strips carrying q [1, 14]
  sFD: 0.3,                           // scaleForceDiagram [0.1, 1] units/kN
  sLS: 2.8,                           // loadSymbol [1, 5]
  sIF: 0.012,
  orf: 0,                             // offsetReactionForces [0, 2] (applet slider)
  o1: true,                           // internal-force pipes
  o2: false,                          // hide external forces in force diagram
  n4: true,                           // show points
  node: 0,                            // node-equilibrium inspector (0 = off)
};

// every construction move happens on BOTH sides at once
const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'A cable and its loads', d: 'two level supports A (left) and B; a base load g over the whole span and an extra load q over the left part — the span is divided into 24 strips' },
  { t: 'The load line', d: 'left: every strip carries its share of g (and of q in the loaded zone) — right: the 24 strip loads stacked tip-to-tail: the heavier strips make longer edges' },
  { t: 'Resultants R₁ and R₂', d: 'left: the q-loaded strips sum to R₁, the remaining strips to R₂, each on the vertical through its zone’s centre — right: R₁ and R₂ are the two parts of the load line' },
  { t: 'Trial funicular for R₁', d: 'left: choose the sag point V₃ on the load boundary; strings A–W₈ and W₈–B (through V₃) bend on R₁’s line of action — right: the parallels through R₁’s ends meet at the trial pole o′₁' },
  { t: 'Trial funicular for R₂', d: 'left: strings A–Z₈ (through V₃) and Z₈–B bend on R₂’s line of action — right: the parallels through R₂’s ends meet at the trial pole o′₂' },
  { t: 'Reaction components', d: 'each trial hangs from the supports: A₁, B₁ carry R₁ and A₂, B₂ carry R₂ (left) — the same four vectors close the two force triangles (right)' },
  { t: 'The pole o', d: 'right: adding the component pairs tip-to-tail — through o′₁ parallel to the o′₂-rays, through o′₂ parallel to the o′₁-rays — the parallelogram closes at the pole o' },
  { t: 'The total load R', d: 'both sides at once: R = R₁ + R₂ fills the load line (right) and acts where the moments of R₁ and R₂ balance (left), dashed green' },
  { t: 'Reactions', d: 'left: the cable will hang along the support tangents, which meet exactly ON R’s line of action (three-force rule) — right: the reactions run from the pole o to the ends of the load line' },
  { t: 'The coarse funicular', d: 'left: through V₃, parallel to the middle ray (orange) joining o to the division of the load line: with the two tangents this is the funicular of R₁ and R₂ alone' },
  { t: 'The cable starts at A', d: 'left: from A parallel to the top ray, down to the first strip line — right: the top ray of the fan (the trial strings retire)' },
  { t: 'Across the q-zone', d: 'left: at every strip line the cable bends, each new segment parallel to the next ray — right: the rays to the heavy part of the load line' },
  { t: 'Across the g-zone', d: 'left: the bends flatten where the load is lighter — right: the rays to the light part of the load line' },
  { t: 'Landing at B', d: 'left: the last segment, parallel to the bottom ray, lands exactly on B' },
  { t: 'Tension', d: 'the cable resolves pink = tension; the length of each ray is the force in its segment — the flattest segment carries the least, the supports the most' },
];

// the construction (mirrors applet_0/geogebra.xml, evaluated live)
function compute(s) {
  const A = [s.ax, Y_SUP], B = [s.bx, Y_SUP];
  const L = s.bx - s.ax, st = L / NSTRIP;
  const loadX = [];
  for (let k = 0; k < NSTRIP; k++) loadX.push(s.ax + st / 2 + k * st);
  const W1x = s.ax + s.lq * st;                     // q ends here
  const e14x = (s.ax + W1x) / 2;                    // R1's line of action
  const f14x = (W1x + s.bx) / 2;                    // R2's line of action

  // load line: heavy strips (1..lq) then light strips
  const wHeavy = s.gq * (1 + s.fq) * s.sFD;
  const wLight = s.gq * s.sFD;
  const P = [s.s2.slice()];
  for (let k = 0; k < NSTRIP; k++) {
    const w = k < s.lq ? wHeavy : wLight;
    P.push([P[k][0], P[k][1] - w]);
  }
  const S2 = P[0], A9 = P[s.lq], U3 = P[NSTRIP];    // division + bottom

  // trial funiculars through the sag point V3 (on the boundary vertical)
  const V3 = [W1x, s.v3y];
  const W8 = V.add(B, V.mul(V.sub(V3, B), (e14x - s.bx) / (V3[0] - s.bx)));
  const Z8 = V.add(A, V.mul(V.sub(V3, A), (f14x - s.ax) / (V3[0] - s.ax)));
  const C9 = V.intersect(S2, V.sub(W8, A), A9, V.sub(B, W8)) || S2;   // o'1
  const D9 = V.intersect(A9, V.sub(Z8, A), U3, V.sub(B, Z8)) || U3;   // o'2
  const E9 = V.add(C9, V.sub(D9, A9));              // the pole o

  // the cable: from A, each segment parallel to its ray o-Pk
  const X = [A];
  for (let k = 0; k < NSTRIP; k++) {
    const d = V.sub(P[k], E9);
    X.push(V.add(X[k], V.mul(d, (loadX[k] - X[k][0]) / d[0])));
  }
  X.push(B);                                        // closes exactly on B

  // tangents meet on R's line of action (three-force rule)
  const T11 = V.intersect(A, V.sub(S2, E9), B, V.sub(U3, E9)) || A;
  const R1 = S2[1] - A9[1], R2 = A9[1] - U3[1];
  const xR = (e14x * R1 + f14x * R2) / (R1 + R2);

  // coarse-funicular middle string through V3, parallel to o-A9
  const dm = V.sub(E9, A9);
  const P2o = V.intersect(V3, dm, [e14x, 0], [0, 1]) || V3;
  const H11o = V.intersect(V3, dm, [f14x, 0], [0, 1]) || V3;

  // support arrows (length 1.5 * loadSymbol, as the applet)
  const al = 1.5 * s.sLS;
  const R8 = V.add(A, V.mul(V.unit(V.sub(S2, E9)), al));    // reaction A
  const S8 = V.add(B, V.mul(V.unit(V.sub(E9, U3)), al));    // reaction B
  const C11 = V.add(A, V.mul(V.unit(V.sub(A, V3)), al));    // A2
  const D11 = V.add(A, V.mul(V.unit(V.sub(A, W8)), al));    // A1
  const E11 = V.add(B, V.mul(V.unit(V.sub(B, V3)), al));    // B1
  const F11 = V.add(B, V.mul(V.unit(V.sub(B, Z8)), al));    // B2

  // forces (kN): per-segment = ray length / sFD; H = horizontal thrust
  const Ns = P.map((p) => V.dist(E9, p) / s.sFD);
  const H = Math.abs(E9[0] - S2[0]) / s.sFD;
  const Rtot = (R1 + R2) / s.sFD;

  return { A, B, L, st, loadX, W1x, e14x, f14x, wHeavy, wLight, P, S2, A9, U3,
           V3, W8, Z8, C9, D9, E9, X, T11, R1, R2, xR, P2o, H11o,
           R8, S8, C11, D11, E11, F11, Ns, H, Rtot };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS, s2: [...DEFAULTS.s2] };
  let d = compute(s);

  // the cable is a funicular of gravity loads sagging below its chord: every
  // segment is in tension (the applet paints it red unconditionally)
  const TEN = { pending: PAL.black, final: () => PAL.red };
  const W_BAR = 0.34, W_RAY = 0.14, W_STR = 0.26;
  const ARROW = { w: 0.45, headLen: 1.5, headW: 0.55 };
  const LOADARR = { w: 0.16, headLen: 0.75, headW: 0.3 };
  const DARR = { w: 0.5, headLen: 1.7, headW: 0.7, dash: 1.0 };

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // ------------------------------------------------------------------
  // step 1: site -- supports, strip grid, the two load blocks
  // ------------------------------------------------------------------
  for (let k = 0; k < NSTRIP + 2; k++) {
    dw.dashLine(`grid${k}`, { intro: 1, dash: 0.55 });
  }
  dw.poly('qFill', 4, { intro: 1, color: PAL.green, opacity: 0.1, flash: false });
  dw.strokes('qEdge', 4, { intro: 1, w: 0.14, color: PAL.green });
  dw.poly('gFill', 4, { intro: 1, color: PAL.green, opacity: 0.1, flash: false });
  dw.strokes('gEdge', 4, { intro: 1, w: 0.14, color: PAL.green });
  dw.label('lbl_q', 'q', { cls: 'num', intro: 1, color: PAL.green });
  dw.label('lbl_g', 'g', { cls: 'num', intro: 1, color: PAL.green });
  dw.dashLine('bound', { intro: 1, color: PAL.black, dash: 0.55 });   // a_5
  dw.dashLine('rail', { intro: 1, dash: 1.3 });   // l_3: V3's rail, site (always on)
  dw.instant(...[...Array(NSTRIP + 2)].map((_, k) => `grid${k}`),
             'qFill', 'qEdge', 'gFill', 'gEdge', 'lbl_q', 'lbl_g', 'bound', 'rail');

  // ------------------------------------------------------------------
  // step 2: per-strip loads (left) drawn WITH the load line edges (right)
  // ------------------------------------------------------------------
  for (let k = 0; k < NSTRIP; k++) {
    dw.arrow(`fload${k}`, { intro: 2, ...LOADARR });
    dw.seg(`ll${k}`, { intro: 2, w: 0.2, color: PAL.black });
    dw.link(`fload${k}`, `ll${k}`);
  }
  dw.dashLine('llGuide', { intro: 2, dash: 0.55 });

  // step 3: partial resultants R1, R2 -- dashed green in BOTH diagrams
  dw.dashLine('loa1', { intro: 3, outro: RESOLVE, dash: 0.55 });
  dw.dashLine('loa2', { intro: 3, outro: RESOLVE, dash: 0.55 });
  dw.dashArrow('r1f', { intro: 3, outro: 8, ...DARR });
  dw.dashArrow('r2f', { intro: 3, outro: 8, ...DARR });
  dw.dashArrow('r1s', { intro: 3, outro: 8, ...DARR });
  dw.dashArrow('r2s', { intro: 3, outro: 8, ...DARR });
  dw.label('lblR1f', 'R₁', { cls: 'num', intro: 3, outro: 8, color: PAL.green });
  dw.label('lblR2f', 'R₂', { cls: 'num', intro: 3, outro: 8, color: PAL.green });
  dw.label('lblR1s', 'R₁', { cls: 'num', intro: 3, outro: 8, color: PAL.green });
  dw.label('lblR2s', 'R₂', { cls: 'num', intro: 3, outro: 8, color: PAL.green });

  // steps 4-5: the two trial funiculars (grey strings left, grey DASHED
  // rays right -- the applet draws the pole rays dash10, and they stay)
  dw.seg('tf1a', { intro: 4, outro: 11, w: W_STR, color: PAL.grey });  // A-W8
  dw.seg('tf1b', { intro: 4, outro: 11, w: W_STR, color: PAL.grey });  // W8-B
  dw.dashLine('tr1a', { intro: 4, outro: RESOLVE, dash: 0.7 });        // S2-C9 (b_4)
  dw.dashLine('tr1b', { intro: 4, outro: RESOLVE, dash: 0.7 });        // A9-C9 (a_4)
  dw.seg('tf2a', { intro: 5, outro: 11, w: W_STR, color: PAL.grey });  // A-Z8
  dw.seg('tf2b', { intro: 5, outro: 11, w: W_STR, color: PAL.grey });  // Z8-B
  dw.dashLine('tr2a', { intro: 5, outro: RESOLVE, dash: 0.7 });        // A9-D9 (n_3)
  dw.dashLine('tr2b', { intro: 5, outro: RESOLVE, dash: 0.7 });        // U3-D9 (m_3)
  dw.link('tf1a', 'tr1a');
  dw.link('tf1b', 'tr1b');
  dw.link('tf2a', 'tr2a');
  dw.link('tf2b', 'tr2b');

  // step 6: reaction components at the supports + on the force diagram
  // (the applet paints the components GREY th5 -- they are a temporary
  //  decomposition, only the full reactions turn green)
  const CMP = [['cmpA1', 'fA1', 'A₁'], ['cmpA2', 'fA2', 'A₂'],
               ['cmpB1', 'fB1', 'B₁'], ['cmpB2', 'fB2', 'B₂']];
  for (const [fm, fo, txt] of CMP) {
    dw.arrow(fm, { intro: 6, outro: 9, ...ARROW, color: PAL.grey });
    dw.arrow(fo, { intro: 6, outro: 9, ...ARROW, color: PAL.grey });
    dw.label(`lbl_${fm}`, txt, { cls: 'num', intro: 6, outro: 9, color: PAL.grey });
    dw.label(`lbl_${fo}`, txt, { cls: 'num', intro: 6, outro: 9, color: PAL.grey });
    dw.link(fm, fo, `lbl_${fm}`, `lbl_${fo}`);
  }

  // step 7: the pole o closes the parallelogram (grey dashed, stays); the
  // applet re-adds the component pair on the far sides (k_8 = o'2->o 'B1',
  // l_8 = o->o'1 'A2', grey th5, retired with the components)
  dw.dashLine('par1', { intro: 7, outro: RESOLVE, dash: 0.7 });        // C9-E9 (i_4)
  dw.dashLine('par2', { intro: 7, outro: RESOLVE, dash: 0.7 });        // E9-D9 (j_4)
  dw.link('par1', 'par2');
  dw.arrow('parB1', { intro: 7, outro: 9, ...ARROW, color: PAL.grey });
  dw.arrow('parA2', { intro: 7, outro: 9, ...ARROW, color: PAL.grey });
  dw.label('lbl_parB1', 'B₁', { cls: 'num', intro: 7, outro: 9, color: PAL.grey });
  dw.label('lbl_parA2', 'A₂', { cls: 'num', intro: 7, outro: 9, color: PAL.grey });
  dw.link('parB1', 'lbl_parB1');
  dw.link('parA2', 'lbl_parA2');

  // step 8: the total load R -- dashed green in BOTH diagrams + its line
  // of action (BLACK dotted in the applet, s_7 -- R1/R2's stay grey)
  dw.dashLine('rLoa', { intro: 8, dash: 0.55, color: PAL.black });
  dw.dashArrow('rTf', { intro: 8, ...DARR });
  dw.dashArrow('rTs', { intro: 8, ...DARR });
  dw.label('lblRf', 'R', { cls: 'num', intro: 8, color: PAL.green });
  dw.label('lblRs', 'R', { cls: 'num', intro: 8, color: PAL.green });
  dw.link('rTf', 'rTs', 'lblRf', 'lblRs', 'rLoa');

  // step 9: reactions (green) + the support tangents meet at T11 on R.
  // The force-side arrows can be slid sideways with the applet's
  // offsetReactionForces slider; black dotted connectors (t_15/a_16/
  // b_16/c_16) tie the offset copies back to the load line.
  dw.arrow('reacA', { intro: 9, ...ARROW });
  dw.arrow('reacB', { intro: 9, ...ARROW });
  const noO2 = (st) => !st.o2;
  dw.arrow('fA', { intro: 9, when: noO2, ...ARROW });
  dw.arrow('fB', { intro: 9, when: noO2, ...ARROW });
  dw.label('lbl_reacA', 'A', { cls: 'num', intro: 9, color: PAL.green });
  dw.label('lbl_reacB', 'B', { cls: 'num', intro: 9, color: PAL.green });
  dw.label('lbl_fA', 'A', { cls: 'num', intro: 9, when: noO2, color: PAL.green });
  dw.label('lbl_fB', 'B', { cls: 'num', intro: 9, when: noO2, color: PAL.green });
  for (const n of ['ofA1', 'ofA2', 'ofB1', 'ofB2']) {
    dw.dashLine(n, { intro: 9, when: noO2, dash: 0.4, color: PAL.black, flash: false });
  }
  dw.dashLine('tanA', { intro: 9, outro: RESOLVE, dash: 0.7 });        // a_15
  dw.dashLine('tanB', { intro: 9, outro: RESOLVE, dash: 0.7 });        // b_15
  dw.link('reacA', 'fA', 'lbl_reacA', 'lbl_fA');
  dw.link('reacB', 'fB', 'lbl_reacB', 'lbl_fB');
  dw.link('tanA', 'tanB');

  // step 10: coarse-funicular middle string (orange, helper -- no arrowheads)
  dw.seg('ostr', { intro: 10, outro: RESOLVE, w: W_STR, color: PAL.orange });
  dw.seg('oray', { intro: 10, outro: RESOLVE, w: W_RAY, color: PAL.orange });
  dw.link('ostr', 'oray');

  // steps 11-14: the cable, segment by segment WITH its ray of the fan
  // (outer rays as thick as the cable, inner rays thin black -- the applet's
  // styling; every segment is hover-linked to its ray)
  const cabIntro = (k) => (k === 0 ? 11 : k <= s.lq - 1 ? 12 : k <= NSTRIP - 1 ? 13 : 14);
  for (let k = 0; k <= NSTRIP; k++) {
    const outer = k === 0 || k === NSTRIP;
    dw.seg(`cab${k}`, { intro: cabIntro(k), w: W_BAR, color: TEN });
    dw.seg(`ray${k}`, { intro: cabIntro(k), w: outer ? W_BAR : W_RAY,
                        color: outer ? TEN : { pending: PAL.black, final: () => PAL.black } });
    dw.link(`cab${k}`, `ray${k}`);
  }

  // points
  const HANDLE = { r: 0.58 }, DERIVED = { r: 0.44 };
  const show = (st) => st.n4;
  dw.disk('pt_A', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_B', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_S2', { intro: 2, ...HANDLE, when: show });
  dw.disk('pt_A9', { intro: 3, ...DERIVED, when: show });
  dw.disk('pt_V3', { intro: 4, ...HANDLE, when: show });
  dw.disk('pt_W8', { intro: 4, outro: 11, ...DERIVED, when: show });
  dw.disk('pt_C9', { intro: 4, outro: RESOLVE, ...DERIVED, when: show });
  dw.disk('pt_Z8', { intro: 5, outro: 11, ...DERIVED, when: show });
  dw.disk('pt_D9', { intro: 5, outro: RESOLVE, ...DERIVED, when: show });
  dw.disk('pt_E9', { intro: 7, outro: RESOLVE, ...DERIVED, when: show });
  dw.disk('pt_T11', { intro: 9, outro: RESOLVE, ...DERIVED, when: show });
  for (let k = 1; k <= NSTRIP; k++) {
    dw.disk(`pt_X${k}`, { intro: cabIntro(k - 1), r: 0.3, when: show });
  }

  const letters = {
    A: ['A', 1], B: ['B', 1], V3: ['V₃', 4], W8: ['W₈', 4, 11],
    C9: ['o′₁', 4, RESOLVE], Z8: ['Z₈', 5, 11], D9: ['o′₂', 5, RESOLVE],
    E9: ['o', 7, RESOLVE], T11: ['T₁₁', 9, RESOLVE],
  };
  for (const [p, [text, intro, outro]] of Object.entries(letters)) {
    dw.label(`lbl_${p}`, text, { cls: 'point', intro, outro, when: show });
  }

  // resolved force readouts
  for (const n of ['roA', 'roB', 'roH', 'roR']) {
    dw.label(n, '', { intro: RESOLVE, flash: false, color: PAL.black });
  }

  // internal-force pipes (on by default)
  for (let k = 0; k <= NSTRIP; k++) {
    dw.poly(`if${k}`, 4, {
      intro: RESOLVE, opacity: 0.45, flash: false,
      color: { pending: PAL.grey, final: () => PAL.red },
      when: (st) => st.o1,
    });
  }

  dw.ghostable(...[...Array(NSTRIP)].map((_, k) => `ll${k}`),
               ...[...Array(NSTRIP + 1)].map((_, k) => `ray${k}`), 'fA', 'fB');

  // node-equilibrium inspector: free-body star of the selected node in an
  // inset + the same forces tip-to-tail on the node's sub-polygon of the
  // force diagram. Interior node k closes the triangle {load-line edge
  // P(k-1)->Pk, ray Pk->o, ray o->P(k-1)}; the supports degenerate to
  // member force + reaction. (The applet has no node mode; this is its
  // physically-correct equivalent.)
  dw.nodeInspector(3, { when: (st) => st.node > 0, w: 1.5 * W_BAR, headLen: 1.6, headW: 0.6, r: 0.45 });
  const NODE_DISKS = ['pt_A', ...[...Array(NSTRIP)].map((_, k) => `pt_X${k + 1}`), 'pt_B'];
  const NODE_NAMES = ['A', ...[...Array(NSTRIP)].map((_, k) => `${k + 1}`), 'B'];
  const nodeAt = NODE_DISKS.map((_, j) => () => (j === 0 ? d.A : j === NSTRIP + 1 ? d.B : d.X[j]));
  const nodePoly = (j) => {
    // support nodes: the reaction side lands ON the visible (possibly
    // offset) reaction arrow, the member side stays on the ray itself
    const uA = V.unit(V.sub(d.S2, d.E9)), uB = V.unit(V.sub(d.U3, d.E9));
    const offA = V.mul([uA[1], -uA[0]], s.orf);
    const offB = V.mul([uB[1], -uB[0]], s.orf);
    if (j === 0) return [[d.S2, d.E9], [V.add(d.E9, offA), V.add(d.S2, offA)]];
    if (j === NSTRIP + 1) return [[d.E9, d.U3], [V.add(d.U3, offB), V.add(d.E9, offB)]];
    return [[d.P[j - 1], d.P[j]], [d.P[j], d.E9], [d.E9, d.P[j - 1]]];
  };

  function updateNode() {
    const j = Math.max(0, Math.min(NODE_DISKS.length - 1, Math.round(s.node) - 1));
    dw.selectDisk(s.node > 0 ? NODE_DISKS[j] : null);
    dw.setNodeInspector([81.5, 67.5], 5, `node ${NODE_NAMES[j]}`, nodePoly(j));
  }

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  function update() {
    dw.setLabel('form_title', [10, 73.6]);
    dw.setLabel('force_title', [91.5, 73.6]);
    dw.setLabel('force_sub', [91.5, 71.7]);
    dw.setText('force_sub', `1 unit :: ${(1 / s.sFD).toFixed(2)} kN`);

    // site: strip grid + load blocks
    dw.setDashLine('grid0', [[s.ax, Y_GRID_B], [s.ax, Y_GRID_T]]);
    dw.setDashLine(`grid${NSTRIP + 1}`, [[s.bx, Y_GRID_B], [s.bx, Y_GRID_T]]);
    for (let k = 0; k < NSTRIP; k++) {
      dw.setDashLine(`grid${k + 1}`, [[d.loadX[k], Y_GRID_B], [d.loadX[k], Y_GRID_T]]);
    }
    const yQb = Y_Q - s.sLS / 2, yGb = Y_G - s.sLS / 2;
    const qP = [[s.ax, Y_Q], [s.ax, yQb], [d.W1x, yQb], [d.W1x, Y_Q]];
    dw.setPoly('qFill', qP);
    dw.setStrokes('qEdge', [[qP[0], qP[1]], [qP[1], qP[2]], [qP[2], qP[3]], [qP[3], qP[0]]]);
    const gP = [[s.ax, Y_G], [s.ax, yGb], [s.bx, yGb], [s.bx, Y_G]];
    dw.setPoly('gFill', gP);
    dw.setStrokes('gEdge', [[gP[0], gP[1]], [gP[1], gP[2]], [gP[2], gP[3]], [gP[3], gP[0]]]);
    // block labels sit at the LEFT of the bands, as in the applet
    dw.setLabel('lbl_q', [s.ax - 2.6, Y_Q - s.sLS / 4]);
    dw.setLabel('lbl_g', [s.ax - 2.6, Y_G - s.sLS / 4]);
    dw.setDashLine('bound', [[d.W1x, Y_GRID_B], [d.W1x, Y_GRID_T]]);

    // step 2: strip loads + load line
    for (let k = 0; k < NSTRIP; k++) {
      const len = (s.sLS / 2) * (k < s.lq ? 1 + s.fq : 1);
      dw.setArrow(`fload${k}`, [d.loadX[k], yGb], [d.loadX[k], yGb - len]);
      dw.setSeg(`ll${k}`, d.P[k], d.P[k + 1]);
    }
    dw.setDashLine('llGuide', [[d.S2[0], Y_GRID_B], [d.S2[0], Y_GRID_T]]);

    // step 3: R1 / R2 both sides
    dw.setDashLine('loa1', [[d.e14x, Y_GRID_B], [d.e14x, Y_GRID_T]]);
    dw.setDashLine('loa2', [[d.f14x, Y_GRID_B], [d.f14x, Y_GRID_T]]);
    const yRt = Y_RTIP + 1.5 * s.sLS;
    dw.setDashArrow('r1f', [d.e14x, yRt], [d.e14x, Y_RTIP]);
    dw.setDashArrow('r2f', [d.f14x, yRt], [d.f14x, Y_RTIP]);
    dw.setDashArrow('r1s', d.S2, d.A9);
    dw.setDashArrow('r2s', d.A9, d.U3);
    dw.setLabel('lblR1f', [d.e14x + 1.6, Y_RTIP + 2]);
    dw.setLabel('lblR2f', [d.f14x + 1.6, Y_RTIP + 2]);
    dw.setLabel('lblR1s', [d.S2[0] - 1.7, (d.S2[1] + d.A9[1]) / 2]);
    dw.setLabel('lblR2s', [d.S2[0] - 1.7, (d.A9[1] + d.U3[1]) / 2]);

    // steps 4-5: trials
    dw.setDashLine('rail', [[d.W1x, RAIL_Y[0]], [d.W1x, RAIL_Y[1]]]);
    dw.setSeg('tf1a', d.A, d.W8);
    dw.setSeg('tf1b', d.W8, d.B);
    dw.setDashLine('tr1a', [d.S2, d.C9]);
    dw.setDashLine('tr1b', [d.A9, d.C9]);
    dw.setSeg('tf2a', d.A, d.Z8);
    dw.setSeg('tf2b', d.Z8, d.B);
    dw.setDashLine('tr2a', [d.A9, d.D9]);
    dw.setDashLine('tr2b', [d.U3, d.D9]);

    // step 6: components
    dw.setArrow('cmpA1', d.A, d.D11);
    dw.setArrow('cmpA2', d.A, d.C11);
    dw.setArrow('cmpB1', d.B, d.E11);
    dw.setArrow('cmpB2', d.B, d.F11);
    dw.setArrow('fA1', d.C9, d.S2);
    dw.setArrow('fA2', d.D9, d.A9);
    dw.setArrow('fB1', d.A9, d.C9);
    dw.setArrow('fB2', d.U3, d.D9);
    const lblAt = (a, b, off = 1.5) => {
      const u = V.unit(V.sub(b, a));
      return V.add(V.mid(a, b), V.mul(V.perp(u), off));
    };
    dw.setLabel('lbl_cmpA1', V.add(d.D11, V.mul(V.unit(V.sub(d.D11, d.A)), 1.5)));
    dw.setLabel('lbl_cmpA2', V.add(d.C11, V.mul(V.unit(V.sub(d.C11, d.A)), 1.5)));
    dw.setLabel('lbl_cmpB1', V.add(d.E11, V.mul(V.unit(V.sub(d.E11, d.B)), 1.5)));
    dw.setLabel('lbl_cmpB2', V.add(d.F11, V.mul(V.unit(V.sub(d.F11, d.B)), 1.5)));
    dw.setLabel('lbl_fA1', lblAt(d.C9, d.S2));
    dw.setLabel('lbl_fA2', lblAt(d.D9, d.A9));
    dw.setLabel('lbl_fB1', lblAt(d.A9, d.C9, -1.5));
    dw.setLabel('lbl_fB2', lblAt(d.U3, d.D9, -1.5));
    // step 7: the component pair re-added on the parallelogram's far sides
    dw.setArrow('parB1', d.D9, d.E9);
    dw.setArrow('parA2', d.E9, d.C9);
    dw.setLabel('lbl_parB1', lblAt(d.D9, d.E9, -1.5));
    dw.setLabel('lbl_parA2', lblAt(d.E9, d.C9, -1.5));

    // step 7: pole parallelogram
    dw.setDashLine('par1', [d.C9, d.E9]);
    dw.setDashLine('par2', [d.E9, d.D9]);

    // step 8: total R
    dw.setDashLine('rLoa', [[d.xR, Y_GRID_B], [d.xR, Y_GRID_T]]);
    dw.setDashArrow('rTf', [d.xR, Y_RTIP + 2 * s.sLS], [d.xR, Y_RTIP]);
    dw.setDashArrow('rTs', d.S2, d.U3);
    dw.setLabel('lblRf', [d.xR + 1.5, Y_RTIP + 2.6]);
    dw.setLabel('lblRs', [d.S2[0] + 1.8, (d.S2[1] + d.U3[1]) / 2]);

    // step 9: reactions + tangents; the force-side arrows slide sideways by
    // offsetReactionForces, perpendicular to their ray (applet: J11/K11,
    // M11/L11), with black dotted connectors back to the ray's endpoints
    const uA = V.unit(V.sub(d.S2, d.E9));
    const uB = V.unit(V.sub(d.U3, d.E9));
    const offA = V.mul([uA[1], -uA[0]], s.orf);
    const offB = V.mul([uB[1], -uB[0]], s.orf);
    const E9a = V.add(d.E9, offA), S2a = V.add(d.S2, offA);
    const E9b = V.add(d.E9, offB), U3b = V.add(d.U3, offB);
    dw.setArrow('reacA', d.A, d.R8);
    dw.setArrow('reacB', d.B, d.S8);
    dw.setArrow('fA', E9a, S2a);
    dw.setArrow('fB', E9b, U3b);
    dw.setDashLine('ofA1', [d.S2, S2a]);
    dw.setDashLine('ofA2', [d.E9, E9a]);
    dw.setDashLine('ofB1', [d.E9, E9b]);
    dw.setDashLine('ofB2', [d.U3, U3b]);
    dw.setLabel('lbl_reacA', V.add(d.R8, V.mul(V.unit(V.sub(d.R8, d.A)), 1.4)));
    dw.setLabel('lbl_reacB', V.add(d.S8, V.mul(V.unit(V.sub(d.S8, d.B)), 1.4)));
    dw.setLabel('lbl_fA', lblAt(E9a, S2a, -1.5));
    dw.setLabel('lbl_fB', lblAt(E9b, U3b, 1.5));
    dw.setDashLine('tanA', [d.A, d.T11]);
    dw.setDashLine('tanB', [d.T11, d.B]);

    // step 10: orange coarse string + middle ray
    dw.setSeg('ostr', d.P2o, d.H11o);
    dw.setSeg('oray', d.A9, d.E9);

    // steps 11-14: cable + fan
    for (let k = 0; k <= NSTRIP; k++) {
      dw.setSeg(`cab${k}`, d.X[k], d.X[k + 1]);
      dw.setSeg(`ray${k}`, d.P[k], d.E9);
      dw.setPoly(`if${k}`, V.rectPoints(d.X[k], d.X[k + 1], s.sIF * d.Ns[k]));
    }

    dw.setDisk('pt_A', d.A);
    dw.setDisk('pt_B', d.B);
    dw.setDisk('pt_S2', d.S2);
    for (const p of ['A9', 'V3', 'W8', 'C9', 'Z8', 'D9', 'E9', 'T11']) dw.setDisk(`pt_${p}`, d[p]);
    for (let k = 1; k <= NSTRIP; k++) dw.setDisk(`pt_X${k}`, d.X[k]);

    const off = { A: [-1.6, -1.1], B: [1.6, -1.1], V3: [-2.2, 0.7], W8: [-1.4, -1.2],
                  C9: [1.3, 1.3], Z8: [1.2, -1.4], D9: [1.4, -1.2], E9: [1.7, 0.3],
                  T11: [1.6, -0.9] };
    for (const p of Object.keys(letters)) dw.setLabel(`lbl_${p}`, V.add(d[p], off[p]));

    const ro = [['roA', `A = ${d.Ns[0].toFixed(1)} kN`], ['roB', `B = ${d.Ns[NSTRIP].toFixed(1)} kN`],
                ['roH', `H = ${d.H.toFixed(1)} kN`], ['roR', `R = ${d.Rtot.toFixed(1)} kN`]];
    ro.forEach(([n, t], i) => {
      dw.setLabel(n, [104, 14.2 - 2.1 * i]);
      dw.setText(n, t);
    });
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
  panel.slider(par, s, 'gq', 'g (kN per strip)', 1, 10, 0.1, refresh);
  panel.slider(par, s, 'fq', 'q/g — extra load factor', 0, 3, 0.1, refresh);
  panel.slider(par, s, 'lq', 'length of q (strips)', 1, 14, 1, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram (units/kN)', 0.1, 1, 0.05, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 1, 5, 0.1, refresh);
  panel.toggle(par, s, 'o1', 'show internal forces', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.04, 0.001, refresh);
  panel.slider(par, s, 'orf', 'offset reaction forces', 0, 2, 0.05, refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  panel.toggle(par, s, 'o2', 'hide external forces in force diagram', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'node (0 = off): 1 = A, 2–25 = cable nodes, 26 = B',
               0, NSTRIP + 2, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS, s2: [...DEFAULTS.s2] });
    panel.syncAll();
    refresh();
  });

  const hits = [
    ['A', () => d.A, 1, 99], ['B', () => d.B, 1, 99],
    ['S2', () => d.S2, 2, 99], ['V3', () => d.V3, 4, 99],
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
      if (name === 'A') s.ax = Math.max(5.5, Math.min(s.bx - 20, wx));
      else if (name === 'B') s.bx = Math.max(s.ax + 20, Math.min(88, wx));
      else if (name === 'S2') s.s2 = [wx, wy];
      else if (name === 'V3') s.v3y = Math.max(RAIL_Y[0], Math.min(RAIL_Y[1] - 0.5, wy));
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
