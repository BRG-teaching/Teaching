/**
 * Drawing view/14 "Prestress"
 * (https://block.arch.ethz.ch/eq/drawing/view/14) as a step-by-step
 * construction: the simplest prestressed system.
 *
 * Two cables hang the node G from the anchors; a vertical tie connects G
 * down to the ground anchor H and is prestressed with the force C. A load
 * Q pulls down at G. The auxiliary construction (the applet's hidden
 * checkbox) solves the C-only state and fixes the cable force A — and that
 * is the whole point: as long as Q < C the cable and anchor forces DO NOT
 * CHANGE under Q; only the tie sheds prestress, its force falling to C - Q.
 * At Q >= C the tie goes slack and the polygon switches to the plain V.
 *
 * Live port of view_14/applet_0/geogebra.xml (77 commands + internalForce
 * macro); the port's formulas are regression-checked against the baked
 * state and the physical invariants (|T-S| = (C-Q)*sFD, |A| frozen,
 * closure, slack switch) at 8e-14 -- see notes/view_14_analysis.md.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 14 — Prestress',
  subtitle: 'a prestressed tie keeps the cable forces constant — until the load eats the prestress',
  about: 'The simplest prestressed system: two cables hang a node from the anchors, and a tie — prestressed with the force C — holds it down to the ground. The auxiliary construction solves the C-only state and fixes the cable force A. As long as Q < C the cable and anchor forces do not change at all: the tie sheds prestress instead, its force falling to C − Q. The moment Q reaches C the tie goes slack and the cables finally feel the load.',
  frame: [[5.66, 3.97], [177.26, 89.77]],
};

const AY = 76.09559243595558;            // the anchor line
const M = [108.4448174965805, 58.40801732823311];  // force-diagram anchor (hidden, fixed)
const GUIDE_Y = [5.465513416162532, 82.7077700463192];
const LSYM = 8;                          // loadSymbol (hidden slider, 5-10)
const UP = [0, 1];
const RESOLVE = 11;

const DEFAULTS = {
  bx: 15.491808279815832,                // left anchor (on the anchor line)
  cx: 75.38,                             // right anchor
  gy: 60.61708575714987,                 // node G (on the midline)
  hy: 29.50979563566655,                 // ground anchor H (on the midline)
  // auxiliary pole O: the applet's baked position puts P off-frame (the aux
  // is hidden there by default); ours starts inside the canvas, still draggable
  ox: 95, oy: 47,
  fQ: 3,                                 // F_Q [0, 10]; applet+live default is 0, but the step
                                         // narrative (load line M->N, residual C-Q) needs Q > 0 --
                                         // at 0 steps 6-10 collapse to zero-length segments
  fC: 6,                                 // F_C [1, 10]
  sFD: 6.7,                              // scaleForceDiagram [0.5, 10]
  sIF: 0.055,                            // scaleInternalForces [0, 0.2]
  o1: true,                              // internal-force pipes
  aux: false,                            // the applet's 'auxiliary construction'
  hideRF: false,
  node: 0,
  n4: true,
  _k: 99,
};

const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'Two anchors, a node, a ground anchor', d: 'left: the node G will hang between the two anchors; below it, on the midline, the ground anchor (drag any of them!)' },
  { t: 'The cables 2 and 3', d: 'left: two cables carry the node to the anchors' },
  { t: 'The tie 1', d: 'left: a vertical tie holds the node DOWN to the ground anchor — it will be prestressed' },
  { t: 'The prestress C', d: 'left: the tie is tensioned with the force C (green, at the ground anchor) — right: C laid off on the auxiliary load line O→P' },
  { t: 'The auxiliary polygon', d: 'right: through P parallel to cable 2, through O parallel to cable 3 → R closes the C-only triangle; P–R is the cable force A before any load' },
  { t: 'The load Q', d: 'left: Q pulls down at the node — right: the load line M→N = Q of the real state' },
  { t: 'Cable 2 keeps its force', d: 'right: from M parallel to cable 2, the SAME length A as the auxiliary triangle → S. The prestressed cable does not feel Q' },
  { t: 'Cable 3', d: 'right: through N parallel to cable 3, to the vertical through S → T; N–T is cable 3’s force' },
  { t: 'The tie closes the polygon', d: 'right: T–S is vertical: the tie’s force, the RESIDUAL prestress C − Q (green). Q eats prestress, not cable force' },
  { t: 'Reactions A and B', d: 'right: A = S→M, B = N→T close the polygon — left: the anchors pull along the cables (green)' },
  { t: 'Pure tension', d: 'everything resolves pink = tension (pipes ∝ force). Drag F_Q up: A and B stay frozen until Q = C — then the tie goes slack and the polygon becomes the plain V' },
];

function compute(s) {
  const F = [(s.bx + s.cx) / 2, AY];
  const B = [s.bx, AY], C = [s.cx, AY];
  const G = [F[0], s.gy], H = [F[0], s.hy];
  const d2 = V.sub(G, B), d3 = V.sub(G, C);
  // auxiliary: the C-only triangle fixes |A|
  const O = [s.ox, s.oy];
  const P = [O[0], O[1] - s.fC * s.sFD];
  const R = V.intersect(P, d2, O, d3) || P;
  const Alen = V.dist(P, R);
  // the real polygon
  const S = V.add(M, V.mul(V.unit(d2), Alen));
  const N = [M[0], M[1] - s.fQ * s.sFD];
  const T = V.intersect(N, d3, S, UP) || S;
  const U = V.intersect(N, d3, M, d2) || M;
  const taut = s.fQ < s.fC;
  // load / reaction symbols (length = loadSymbol)
  const J = V.add(B, V.mul(V.unit(V.sub(B, G)), LSYM));
  const K = V.add(C, V.mul(V.unit(V.sub(C, G)), LSYM));
  const I = V.add(G, [0, LSYM]);
  const L = V.add(H, [0, -LSYM]);
  // forces in kN
  const NA = Alen / s.sFD;
  const NB = (taut ? V.dist(N, T) : V.dist(N, U)) / s.sFD;
  const N1 = taut ? s.fC - s.fQ : 0;
  return { F, B, C, G, H, d2, d3, O, P, R, Alen, S, N, T, U, taut,
           J, K, I, L, NA, NB, N1 };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  let d = compute(s);

  const W_BAR = 0.34, W_AUX = 0.3;
  const ARROW = { w: 0.55, headLen: 2.1, headW: 0.85 };
  const DASH = 1.1;
  const cableColor = { pending: PAL.black, final: () => PAL.red };
  const tieColor = { pending: PAL.black, final: (dd) => (dd.taut ? PAL.red : PAL.black) };
  const qColor = { pending: PAL.green, final: () => (s.fQ > 0 ? PAL.green : PAL.grey) };
  const cColor = { pending: PAL.green, final: (dd) => (dd.taut ? PAL.green : PAL.grey) };
  const auxw = (st) => st.aux || st._k < RESOLVE;
  const rfw = (st) => !st.hideRF;
  const tautw = (st, dd) => dd.taut;

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // step 1: geometry
  dw.dashLine('guide1', { intro: 1, dash: DASH, flash: false });
  dw.dashLine('guide2', { intro: 1, dash: DASH, flash: false });

  // steps 2-3: members
  dw.seg('mem2', { intro: 2, w: W_BAR, color: cableColor });
  dw.seg('mem3', { intro: 2, w: W_BAR, color: cableColor });
  dw.seg('mem1', { intro: 3, w: W_BAR, color: tieColor });
  dw.label('n2', '2', { cls: 'num', intro: 2, color: { final: () => PAL.red } });
  dw.label('n3', '3', { cls: 'num', intro: 2, color: { final: () => PAL.red } });
  dw.label('n1', '1', { cls: 'num', intro: 3, color: { final: (dd) => (dd.taut ? PAL.red : PAL.black) } });

  // step 4: prestress C + auxiliary load line
  dw.arrow('loadC', { intro: 4, ...ARROW, color: cColor });
  dw.label('lC', 'C', { intro: 4, color: PAL.green });
  dw.arrow('auxC', { intro: 4, ...ARROW, when: auxw });
  dw.label('lauxC', 'C', { intro: 4, color: PAL.green, when: auxw });

  // step 5: auxiliary polygon
  dw.dashLine('auxP2', { intro: 5, dash: DASH, when: auxw });
  dw.dashLine('auxP3', { intro: 5, dash: DASH, when: auxw });
  dw.seg('auxA', { intro: 5, w: W_AUX, color: PAL.black, when: auxw });
  dw.label('lauxA', 'A', { intro: 5, when: auxw });

  // step 6: the load Q
  dw.arrow('loadQ', { intro: 6, ...ARROW, color: qColor });
  dw.label('lQ', 'Q', { intro: 6, color: qColor });
  dw.arrow('llQ', { intro: 6, ...ARROW, when: (st) => st.fQ > 0 });
  dw.label('lQf', 'Q', { intro: 6, color: PAL.green, when: (st) => st.fQ > 0 });

  // steps 7-9: the force polygon
  dw.dashLine('par2', { intro: 7, dash: DASH });
  dw.seg('f2', { intro: 7, w: W_BAR, color: cableColor });
  dw.label('n2f', '2', { cls: 'num', intro: 7, color: { final: () => PAL.red } });
  dw.dashLine('par3', { intro: 8, dash: DASH });
  dw.dashLine('vertS', { intro: 8, dash: DASH });
  dw.seg('f3', { intro: 8, w: W_BAR, color: cableColor });
  dw.label('n3f', '3', { cls: 'num', intro: 8, color: { final: () => PAL.red } });
  dw.seg('f1', { intro: 9, w: W_BAR, color: { pending: PAL.black, final: () => PAL.red }, when: tautw });
  dw.label('n1f', '1', { cls: 'num', intro: 9, color: { final: () => PAL.red }, when: tautw });
  dw.arrow('reacC', { intro: 9, ...ARROW, when: (st, dd) => dd.taut && !st.hideRF });
  dw.label('lCf', 'C', { intro: 9, color: PAL.green, when: (st, dd) => dd.taut && !st.hideRF });
  dw.highlight('mem2', [7]);
  dw.highlight('mem3', [8]);
  dw.highlight('mem1', [9]);
  dw.highlight('loadC', [9]);

  // step 10: reactions
  dw.arrow('reacA', { intro: 10, ...ARROW });
  dw.arrow('reacB', { intro: 10, ...ARROW });
  dw.arrow('reacAl', { intro: 10, ...ARROW, when: rfw });
  dw.arrow('reacBl', { intro: 10, ...ARROW, when: rfw });
  dw.label('lA', 'A', { intro: 10, color: PAL.green });
  dw.label('lB', 'B', { intro: 10, color: PAL.green });
  dw.label('lAf', 'A', { intro: 10, color: PAL.green, when: rfw });
  dw.label('lBf', 'B', { intro: 10, color: PAL.green, when: rfw });

  // internal-force pipes
  const pw = (st) => st.o1 && st._k >= RESOLVE;
  for (let k = 0; k < 3; k++) {
    dw.poly(`if${k}`, 4, { intro: RESOLVE, opacity: 1.0, z: -0.18, color: PAL.red, flash: false,
                           when: (st, dd) => pw(st) && (k !== 0 || dd.taut) });
  }

  // points
  const HANDLE = { r: 0.85 }, DERIVED = { r: 0.62 };
  const show = (st) => st.n4;
  dw.disk('pt_B', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_C', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_G', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_H', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_O', { intro: 4, ...HANDLE, when: (st) => show(st) && auxw(st) });
  dw.disk('pt_P', { intro: 4, ...DERIVED, when: (st) => show(st) && auxw(st) });
  dw.disk('pt_R', { intro: 5, ...DERIVED, when: (st) => show(st) && auxw(st) });
  dw.disk('pt_M', { intro: 6, ...DERIVED, when: show });
  dw.disk('pt_N', { intro: 6, ...DERIVED, when: show });
  dw.disk('pt_S', { intro: 7, ...DERIVED, when: show });
  dw.disk('pt_T', { intro: 8, ...DERIVED, when: show });

  // readouts
  for (let i = 0; i < 5; i++) {
    dw.label(`ro${i}`, '', { intro: RESOLVE, flash: false,
              color: i < 2 ? PAL.green : i === 2 ? { final: (dd) => (dd.taut ? PAL.red : PAL.grey) } : PAL.green });
  }

  // node-equilibrium inspector (4 sides: the main polygon at G)
  dw.nodeInspector(4, { when: (st) => st.node > 0, w: 1.5 * W_BAR, headLen: 2.1, headW: 0.85, r: 0.9 });

  // dual hover pairs (one group per member / load / reaction)
  dw.link('mem2', 'f2', 'par2', 'auxP2', 'n2', 'n2f');
  dw.link('mem3', 'f3', 'par3', 'auxP3', 'n3', 'n3f');
  dw.link('mem1', 'f1', 'n1', 'n1f');
  dw.link('loadC', 'auxC', 'reacC', 'lC', 'lauxC', 'lCf');
  dw.link('loadQ', 'llQ', 'lQ', 'lQf');
  dw.link('reacA', 'reacAl', 'lA', 'lAf');
  dw.link('reacB', 'reacBl', 'lB', 'lBf');
  dw.ghostable('f2', 'f3', 'f1', 'llQ', 'reacAl', 'reacBl', 'reacC');

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  function update() {
    dw.setLabel('form_title', [7.53, 87.22]);
    dw.setLabel('force_title', [108.23, 87.22]);
    dw.setLabel('force_sub', [160, 87.22]);
    dw.setText('force_sub', `1 unit :: ${(1 / s.sFD).toFixed(2)} kN`);

    dw.setDashLine('guide1', [[d.F[0], GUIDE_Y[0]], [d.F[0], GUIDE_Y[1]]]);
    dw.setDashLine('guide2', [[M[0], GUIDE_Y[0]], [M[0], GUIDE_Y[1]]]);

    dw.setSeg('mem2', d.B, d.G);
    dw.setSeg('mem3', d.C, d.G);
    dw.setSeg('mem1', d.G, d.H);
    dw.setLabel('n2', V.add(V.mid(d.B, d.G), [-0.6, 1.6]));
    dw.setLabel('n3', V.add(V.mid(d.C, d.G), [0.6, 1.6]));
    dw.setLabel('n1', V.add(V.mid(d.G, d.H), [1.5, 0]));

    dw.setArrow('loadC', d.H, d.L);
    dw.setLabel('lC', V.add(d.L, [1.6, 1.6]));
    dw.setArrow('auxC', d.O, d.P);
    dw.setLabel('lauxC', V.add(V.mid(d.O, d.P), [1.7, 0]));

    const ext = (a, b, f) => V.add(b, V.mul(V.sub(b, a), f));
    dw.setDashLine('auxP2', [d.P, ext(d.P, d.R, 0.25)]);
    dw.setDashLine('auxP3', [d.O, ext(d.O, d.R, 0.25)]);
    dw.setSeg('auxA', d.P, d.R);
    dw.setLabel('lauxA', V.add(V.mid(d.P, d.R), [-1, -1.9]));

    dw.setArrow('loadQ', d.I, d.G);
    dw.setLabel('lQ', V.add(V.mid(d.I, d.G), [1.6, 0.6]));
    dw.setArrow('llQ', M, d.N);
    dw.setLabel('lQf', V.add(V.mid(M, d.N), [-2, 0]));

    dw.setDashLine('par2', [M, ext(M, d.S, 0.18)]);
    dw.setSeg('f2', ...(d.taut ? [M, d.S] : [d.U, M]));
    const lerp = (a, b, f) => [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
    dw.setLabel('n2f', V.add(lerp(M, d.taut ? d.S : d.U, 0.3), [1, 1.9]));
    dw.setDashLine('par3', [d.N, ext(d.N, d.taut ? d.T : d.U, 0.18)]);
    dw.setDashLine('vertS', [d.S, V.add(d.T, [0, 3])]);
    dw.setSeg('f3', ...(d.taut ? [d.N, d.T] : [d.N, d.U]));
    dw.setLabel('n3f', V.add(lerp(d.N, d.taut ? d.T : d.U, 0.3), [-1.2, -1.9]));
    dw.setSeg('f1', d.T, d.S);
    dw.setLabel('n1f', V.add(V.mid(d.T, d.S), [-1.8, 0]));
    dw.setArrow('reacC', d.T, d.S);
    dw.setLabel('lCf', V.add(V.mid(d.T, d.S), [2, 0]));

    dw.setArrow('reacA', d.B, d.J);
    dw.setArrow('reacB', d.C, d.K);
    dw.setLabel('lA', V.add(d.J, [-1.4, 1.6]));
    dw.setLabel('lB', V.add(d.K, [1.4, 1.6]));
    dw.setArrow('reacAl', ...(d.taut ? [d.S, M] : [d.U, M]));
    dw.setArrow('reacBl', ...(d.taut ? [d.N, d.T] : [d.N, d.U]));
    dw.setLabel('lAf', V.add(lerp(d.taut ? d.S : d.U, M, 0.75), [-2.2, -1.8]));
    dw.setLabel('lBf', V.add(lerp(d.N, d.taut ? d.T : d.U, 0.75), [2.2, -1.8]));

    // pipes: member 1 (tie), 2, 3 with their force magnitudes (world lengths)
    dw.setPoly('if0', V.rectPoints(d.G, d.H, s.sIF * (d.taut ? V.dist(d.T, d.S) : 0)));
    dw.setPoly('if1', V.rectPoints(d.B, d.G, s.sIF * d.Alen));
    dw.setPoly('if2', V.rectPoints(d.C, d.G, s.sIF * (d.taut ? V.dist(d.N, d.T) : V.dist(d.N, d.U))));

    dw.setDisk('pt_B', d.B); dw.setDisk('pt_C', d.C);
    dw.setDisk('pt_G', d.G); dw.setDisk('pt_H', d.H);
    dw.setDisk('pt_O', d.O); dw.setDisk('pt_P', d.P); dw.setDisk('pt_R', d.R);
    dw.setDisk('pt_M', M); dw.setDisk('pt_N', d.N);
    dw.setDisk('pt_S', d.S); dw.setDisk('pt_T', d.taut ? d.T : d.U);

    dw.setLabel('ro0', [160, 84.5]);
    dw.setText('ro0', `A = ${d.NA.toFixed(1)} kN`);
    dw.setLabel('ro1', [160, 81.6]);
    dw.setText('ro1', `B = ${d.NB.toFixed(1)} kN`);
    dw.setLabel('ro2', [160, 78.7]);
    dw.setText('ro2', d.taut ? `N₁ = ${d.N1.toFixed(1)} kN` : 'N₁ = 0 (slack)');
    dw.setLabel('ro3', [160, 75.8]);
    dw.setText('ro3', `Q = ${s.fQ.toFixed(1)} kN`);
    dw.setLabel('ro4', [160, 72.9]);
    dw.setText('ro4', `C = ${s.fC.toFixed(1)} kN`);
  }

  // node inspector: 1 = G, 2 = H, 3 = left anchor, 4 = right anchor.
  // Reaction sides lie EXACTLY on the drawn reaction arrows.
  function nodePoly() {
    const j = Math.round(s.node);
    if (j === 1) {
      return d.taut ? [[M, d.N], [d.N, d.T], [d.T, d.S], [d.S, M]]
                    : [[M, d.N], [d.N, d.U], [d.U, M]];
    }
    if (j === 2) return d.taut ? [[d.T, d.S], [d.S, d.T]] : [];
    if (j === 3) return d.taut ? [[d.S, M], [M, d.S]] : [[d.U, M], [M, d.U]];
    return d.taut ? [[d.N, d.T], [d.T, d.N]] : [[d.N, d.U], [d.U, d.N]];
  }
  function updateNode() {
    const j = Math.round(s.node);
    dw.selectDisk(j === 1 ? 'pt_G' : j === 2 ? 'pt_H' : j === 3 ? 'pt_B' : j === 4 ? 'pt_C' : null);
    const name = ['', 'G', 'H', 'left anchor', 'right anchor'][j] || '';
    const pos = [null, d.G, d.H, d.B, d.C][j] || d.G;
    dw.setNodeInspector(pos, 6.2, `node ${name}`, nodePoly());
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
  panel.slider(par, s, 'fQ', 'F_Q — the load Q (kN)', 0, 10, 0.1, refresh);
  panel.slider(par, s, 'fC', 'F_C — the prestress C (kN)', 1, 10, 0.1, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram (units/kN)', 0.5, 10, 0.1, refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.2, 0.005, refresh);
  panel.toggle(par, s, 'o1', 'show internal forces (pipes)', refresh);
  panel.toggle(par, s, 'aux', 'auxiliary construction', refresh);
  panel.toggle(par, s, 'hideRF', 'hide reaction forces in force diagram', refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'node (0 = off, 1 = G, 2 = H, 3/4 = anchors)', 0, 4, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS });
    panel.syncAll();
    refresh();
  });

  const hits = [
    ['B', () => d.B, 1, 99], ['C', () => d.C, 1, 99],
    ['G', () => d.G, 1, 99], ['H', () => d.H, 1, 99],
    ['O', () => d.O, 4, 99],
  ];
  dw.enableDrag(
    (wx, wy, tol) => {
      let best = null;
      for (const [name, get, k0, k1] of hits) {
        if (player.k < k0 || player.k >= k1) continue;
        if (name === 'O' && !(s.aux || player.k < RESOLVE)) continue;
        const p = get();
        const dd = Math.hypot(p[0] - wx, p[1] - wy);
        if (dd < tol) { best = name; tol = dd; }
      }
      return best;
    },
    (name, wx, wy) => {
      const cl = (v, a, b) => Math.max(a, Math.min(b, v));
      if (name === 'B') s.bx = cl(wx, 7, (s.bx + s.cx) / 2 - 6);
      else if (name === 'C') s.cx = cl(wx, (s.bx + s.cx) / 2 + 6, 102);
      else if (name === 'G') s.gy = cl(wy, s.hy + 4, AY - 4);
      else if (name === 'H') s.hy = cl(wy, 6, s.gy - 4);
      else if (name === 'O') { s.ox = cl(wx, 10, 100); s.oy = cl(wy, 10, 60); }
      refresh();
    },
  );

  dw.nodeSelect(
    [() => d.G, () => d.H, () => d.B, () => d.C].map((at) => ({ at })),
    (i) => {
      s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
      panel.syncAll();
      refresh();
    },
  );

  refresh();
  return player;
}
