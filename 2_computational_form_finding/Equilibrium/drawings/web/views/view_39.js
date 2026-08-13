/**
 * Drawing view/39 "Constant force bottom chord truss - construction"
 * (https://block.arch.ethz.ch/eq/drawing/view/39) as a step-by-step
 * construction.
 *
 * The FORM-FINDING sibling of view/29: the designer CHOOSES one force for
 * every bottom-chord (cable) piece. On the load line (five equal loads G),
 * the fan centre is the midpoint U1 of the load line; a circle of radius
 * BottomChordForce * scaleForceDiagram around U1 collects ALL cable forces:
 * horizontals through every load point cut the circle at the six ray ends,
 * the deck forces are those horizontals, the web forces the chords between
 * consecutive circle points. The form then walks from the left support:
 * each cable piece parallel to its ray, each web parallel to its chord --
 * closing exactly on the right support S.
 *
 * Live port of view_39/applet_0/geogebra.xml (222 commands); regression
 * scratchpad/v39_regress.py: worst 9.4e-14 over the default, step-9,
 * BottomChordForce=4.0 and loadG=0.4 live states (live39/*.json).
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 39 — Constant force bottom chord truss: construction',
  subtitle: 'choose ONE cable force — a circle in the force diagram form-finds the truss',
  about: 'The construction twin of drawing 29: instead of analysing a given truss, the designer chooses the force in the bottom chord — the same in every piece. A circle of that radius around the midpoint of the load line collects all six cable forces; horizontals through the load points cut it, and the chords between the cuts are the web forces. Walking the form from the left support, each cable piece parallel to its ray, the truss finds its own shape and closes exactly on the right support. Deepen or flatten it with the BottomChordForce slider.',
  frame: [[-1.5, -9.5], [21, 5.5]],
};

const SUB = ['₀', '₁', '₂', '₃', '₄', '₅'];
const RESOLVE = 10;

const DEFAULTS = {
  ll: [16.5806451612903, 2.15],            // O_1, the load-line top (drag)
  deckY: 0.4794520547945211,               // the deck level
  xR: 0.6021505376344081,                  // left support
  xS: 10.279569892473116,                  // right support
  st: [2.2150537634408598, 4.021505376344085, 5.827956989247309,
       7.376344086021503, 8.752688172043008],   // loaded stations
  loadY: 2.006849315068494,                // the load application level
  BC: 4.5,                                 // BottomChordForce [4, 5]
  loadG: 1.2,                              // loadG [0.4, 1.5]
  sFD: 0.8,                                // scaleForceDiagram [0.5, 1]
  oRF: 0.5,                                // offsetReactionForces [0, 1]
  sLS: 0.6,                                // scaleLoadSymbol [0.5, 5]
  sIF: 0.012,                              // scaleInternalForces [0, 0.05]
  o1: true,
  n4: true,
  lab: true,
  node: 0,
  _k: 99,
};

const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'A deck on two supports', d: 'left: the deck spans from R to S over six panels; five equal loads G press on the panel points (drag the sliders — loadG scales them)' },
  { t: 'The load line', d: 'right: the five loads stacked tip-to-tail O₁ → T₁; by symmetry each reaction carries 2½ G — A and B beside the line meet at its midpoint U₁' },
  { t: 'One level per load point', d: 'right: a horizontal (dashed) through every point of the load line — every deck force will lie on its level' },
  { t: 'The designer’s choice', d: 'right: ONE force for every bottom-chord piece: a circle of radius F_bottomchord around U₁ (drag the BottomChordForce slider — the whole truss will follow)' },
  { t: 'The circle cut by the levels', d: 'right: the levels cut the circle at six points — the horizontals from the cuts to the load line are the DECK forces 1, 4, 6, 9, 12, 15 (they grow toward midspan)' },
  { t: 'Six equal cable forces', d: 'right: the rays from the cuts to the centre U₁ are the CABLE forces 3, 5, 8, 11, 14, 17 — every one a radius: the chosen constant force' },
  { t: 'The web forces', d: 'right: the chords between consecutive cuts are the WEB forces 2, 7, 10, 13, 16 — short near midspan, where the cable is flattest' },
  { t: 'The form: first panel', d: 'left: from R parallel to ray 3 — the first cable piece; from the panel point H₂ parallel to chord 2 — the first web: they meet at the kink M₂' },
  { t: 'The cable walks across', d: 'left: piece by piece — each cable segment parallel to its ray, each web parallel to its chord — through N₂, O₂, P₂, Q₂ … and the last piece lands EXACTLY on the support S: the check' },
  { t: 'Compression and tension', d: 'the deck and the webs resolve blue = compression, the bottom chord pink = tension — the SAME force in all six pieces (pipes ∝ force); drag O₁, the sliders — click a joint for its equilibrium' },
];

// members: [form-from, form-to, force-from, force-to, kind]
// kinds: d = deck (blue), w = web (blue), c = cable (red/pink)
const MEMBERS = [
  null,
  ['R', 'H2', 'G2', 'O1', 'd'], ['H2', 'M2', 'G2', 'F2', 'w'], ['R', 'M2', 'G2', 'U1', 'c'],
  ['H2', 'I2', 'F2', 'P1', 'd'], ['M2', 'N2', 'F2', 'U1', 'c'], ['I2', 'J2', 'E2', 'Q1', 'd'],
  ['N2', 'I2', 'F2', 'E2', 'w'], ['N2', 'O2', 'E2', 'U1', 'c'], ['J2', 'K2', 'D2', 'R1', 'd'],
  ['J2', 'O2', 'E2', 'D2', 'w'], ['O2', 'P2', 'D2', 'U1', 'c'], ['K2', 'L2', 'B2', 'S1', 'd'],
  ['K2', 'P2', 'D2', 'B2', 'w'], ['P2', 'Q2', 'B2', 'U1', 'c'], ['L2', 'S', 'C2', 'T1', 'd'],
  ['L2', 'Q2', 'B2', 'C2', 'w'], ['Q2', 'S', 'C2', 'U1', 'c'],
];
const CABLE = [3, 5, 8, 11, 14, 17], WEB = [2, 7, 10, 13, 16], DECK = [1, 4, 6, 9, 12, 15];

function circleLeft(c, r, y) {
  const dy = y - c[1];
  const dx = Math.sqrt(Math.max(r * r - dy * dy, 0));
  return [c[0] - dx, y];
}

function compute(s) {
  const g = s.loadG * s.sFD;
  const O1 = s.ll;
  const P1 = [O1[0], O1[1] - g];
  const Q1 = [O1[0], P1[1] - g];
  const R1 = [O1[0], Q1[1] - g];
  const S1 = [O1[0], R1[1] - g];
  const T1 = [O1[0], S1[1] - g];
  const U1 = V.mid(Q1, R1);
  const r = s.BC * s.sFD;
  const G2 = circleLeft(U1, r, O1[1]);
  const F2 = circleLeft(U1, r, P1[1]);
  const E2 = circleLeft(U1, r, Q1[1]);
  const D2 = circleLeft(U1, r, R1[1]);
  const B2 = circleLeft(U1, r, S1[1]);
  const C2 = circleLeft(U1, r, T1[1]);

  const R = [s.xR, s.deckY], S = [s.xS, s.deckY];
  const H2 = [s.st[0], s.deckY], I2 = [s.st[1], s.deckY], J2 = [s.st[2], s.deckY];
  const K2 = [s.st[3], s.deckY], L2 = [s.st[4], s.deckY];
  const d = (a, b) => V.sub(b, a);
  const M2 = V.intersect(R, d(G2, U1), H2, d(G2, F2));
  const N2 = V.intersect(M2, d(F2, U1), I2, d(F2, E2));
  const O2 = V.intersect(N2, d(E2, U1), J2, d(E2, D2));
  const P2 = V.intersect(O2, d(D2, U1), K2, d(D2, B2));
  const Q2 = V.intersect(P2, d(B2, U1), L2, d(B2, C2));

  const pts = { O1, P1, Q1, R1, S1, T1, U1, G2, F2, E2, D2, B2, C2,
                R, S, H2, I2, J2, K2, L2, M2, N2, O2, P2, Q2 };
  const Ns = [null];
  for (let k = 1; k <= 17; k++) {
    const m = MEMBERS[k];
    Ns.push(V.dist(pts[m[2]], pts[m[3]]) / s.sFD);
  }
  return { ...pts, Ns, r };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS, ll: [...DEFAULTS.ll], st: [...DEFAULTS.st] };
  let d = compute(s);
  let player = null;

  const W_BAR = 0.045, W_FSEG = 0.034;
  const ARROW = { w: 0.045, headLen: 0.2, headW: 0.08 };
  const DASH = 0.1;
  const KCOL = { d: PAL.blue, w: PAL.blue, c: PAL.red };
  const memCol = (k) => ({ pending: PAL.black, final: () => KCOL[MEMBERS[k][4]] });
  const INTRO_FORCE = [null, 5, 7, 6, 5, 6, 5, 7, 6, 5, 7, 6, 5, 7, 6, 5, 7, 6];
  const INTRO_FORM = (k) => (k <= 3 ? 8 : 9);

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // step 1 -- deck, stations, supports, loads
  for (let i = 0; i < 7; i++) {
    dw.dashLine(`stn${i}`, { intro: 1, dash: 0.05, color: 0xafafaf, flash: false });
  }
  dw.seg('deck0', { intro: 1, w: 0.016, color: PAL.grey });
  dw.disk('pt_R', { intro: 1, r: 0.07 });
  dw.disk('pt_S', { intro: 1, r: 0.07 });
  dw.label('lbl_R', 'R', { cls: 'point', intro: 1, when: (st) => st.n4 });
  dw.label('lbl_S', 'S', { cls: 'point', intro: 1, when: (st) => st.n4 });
  for (let i = 0; i < 5; i++) {
    dw.arrow(`load${i}`, { intro: 1, ...ARROW });
    dw.label(`lF${i}`, `G${SUB[i + 1]}`, { cls: 'num', intro: 1, color: PAL.green });
    dw.disk(`pt_p${i}`, { intro: 1, r: 0.05, when: (st) => st.n4 });
  }

  // step 2 -- load line + U1 + reactions
  for (let i = 0; i < 5; i++) {
    dw.arrow(`edge${i}`, { intro: 2, ...ARROW });
    dw.label(`lFf${i}`, `G${SUB[i + 1]}`, { cls: 'num', intro: 2, color: PAL.green });
  }
  for (const nm of ['O1', 'P1', 'Q1', 'R1', 'S1', 'T1']) {
    dw.disk(`pt_${nm}`, { intro: 2, r: 0.045, when: (st) => st.n4 });
  }
  dw.disk('pt_U1', { intro: 2, r: 0.055, face: 0x111111, edge: 0x111111 });
  dw.label('lbl_U1', 'U₁', { cls: 'point', intro: 2 });
  dw.arrow('reacA', { intro: 2, ...ARROW });
  dw.arrow('reacB', { intro: 2, ...ARROW });
  dw.label('lA', 'A', { cls: 'num', intro: 2, color: PAL.green });
  dw.label('lB', 'B', { cls: 'num', intro: 2, color: PAL.green });
  dw.arrow('reacRform', { intro: 2, ...ARROW });
  dw.arrow('reacSform', { intro: 2, ...ARROW });
  dw.label('lRreac', 'A', { cls: 'num', intro: 2, color: PAL.green });
  dw.label('lSreac', 'B', { cls: 'num', intro: 2, color: PAL.green });

  // step 3 -- the six levels
  for (let i = 0; i < 6; i++) {
    dw.dashLine(`lev${i}`, { intro: 3, dash: DASH, color: 0x9a9a9a, flash: false });
  }

  // step 4 -- the circle (the designer's choice)
  // the applet hides the circle at its resolved state and the radius arm
  // as soon as the rays arrive (s5) -- mirror both retirements
  dw.dashLine('circle', { intro: 4, outro: RESOLVE, dash: 0.09, color: 0x9a9a9a, flash: false });
  dw.seg('radius', { intro: 4, outro: 6, w: 0.03, color: PAL.orange });
  dw.label('lbl_radius', 'F_bottomchord', { intro: 4, outro: 6, color: PAL.orange });

  // steps 5-7 -- deck forces, cable rays, web forces; 8-9 -- the form
  for (let k = 1; k <= 17; k++) {
    dw.seg(`fseg${k}`, { intro: INTRO_FORCE[k], w: W_FSEG, color: memCol(k) });
    dw.label(`n${k}s`, `${k}`, { cls: 'num', intro: INTRO_FORCE[k],
             color: { final: () => KCOL[MEMBERS[k][4]] }, when: (st) => st.lab });
    dw.seg(`mem${k}`, { intro: INTRO_FORM(k), w: W_BAR, color: memCol(k) });
    dw.label(`n${k}f`, `${k}`, { cls: 'num', intro: INTRO_FORM(k),
             color: { final: () => KCOL[MEMBERS[k][4]] }, when: (st) => st.lab });
  }
  for (const nm of ['G2', 'F2', 'E2', 'D2', 'B2', 'C2']) {
    dw.disk(`pt_${nm}`, { intro: 5, r: 0.045, when: (st) => st.n4 });
  }
  for (const [nm, txt, at] of [['M2', 'M₂', 8], ['N2', 'N₂', 9], ['O2', 'O₂', 9],
                               ['P2', 'P₂', 9], ['Q2', 'Q₂', 9]]) {
    dw.disk(`pt_${nm}`, { intro: at, r: 0.05, when: (st) => st.n4 });
    dw.label(`lbl_${nm}`, txt, { cls: 'point', intro: at, when: (st) => st.n4 });
  }

  // resolve -- pipes
  for (let k = 1; k <= 17; k++) {
    dw.poly(`if${k}`, 4, { intro: RESOLVE, opacity: 0.45, flash: false,
      color: { pending: PAL.grey, final: () => KCOL[MEMBERS[k][4]] },
      when: (st) => st.o1 });
  }
  for (let i = 0; i < 2; i++) {
    dw.label(`ro${i}`, '', { intro: RESOLVE, flash: false, color: PAL.green });
  }
  dw.label('roC', '', { intro: RESOLVE, flash: false, color: PAL.red });

  // node inspector
  dw.nodeInspector(5, { when: (st) => st.node > 0, w: 1.5 * W_BAR,
                        headLen: 0.22, headW: 0.09, r: 0.07 });

  // links + ghosts
  for (let k = 1; k <= 17; k++) dw.link(`mem${k}`, `fseg${k}`, `n${k}f`, `n${k}s`);
  for (let i = 0; i < 5; i++) dw.link(`load${i}`, `edge${i}`, `lF${i}`, `lFf${i}`, `stn${i + 1}`);
  dw.link('reacRform', 'reacA', 'lRreac', 'lA');
  dw.link('reacSform', 'reacB', 'lSreac', 'lB');
  dw.ghostable(...Array.from({ length: 17 }, (_, i) => `fseg${i + 1}`),
               'edge0', 'edge1', 'edge2', 'edge3', 'edge4', 'reacA', 'reacB');

  // ------------------------------------------------------------------
  function update() {
    dw.setLabel('form_title', [0.2, 4.9]);
    dw.setLabel('force_title', [12.6, 4.9]);
    dw.setLabel('force_sub', [12.6, 4.45]);
    dw.setText('force_sub', `1 unit :: ${(1 / s.sFD).toFixed(2)} kN`);

    // stations + deck + supports + loads
    const xs = [s.xR, ...s.st, s.xS];
    for (let i = 0; i < 7; i++) {
      dw.setDashLine(`stn${i}`, [[xs[i], -4.6], [xs[i], s.loadY + 1.2]]);
    }
    dw.setSeg('deck0', d.R, d.S);
    dw.setDisk('pt_R', d.R); dw.setDisk('pt_S', d.S);
    dw.setLabel('lbl_R', V.add(d.R, [-0.28, 0.18]));
    dw.setLabel('lbl_S', V.add(d.S, [0.16, 0.18]));
    for (let i = 0; i < 5; i++) {
      const at = [s.st[i], s.deckY];
      dw.setArrow(`load${i}`, [s.st[i], s.loadY + s.sLS], [s.st[i], s.loadY]);
      dw.setLabel(`lF${i}`, [s.st[i] + 0.18, s.loadY + 0.5 * s.sLS]);
      dw.setDisk(`pt_p${i}`, at);
    }

    // load line + reactions
    const pairs = [['O1', 'P1'], ['P1', 'Q1'], ['Q1', 'R1'], ['R1', 'S1'], ['S1', 'T1']];
    pairs.forEach(([a, b], i) => {
      dw.setArrow(`edge${i}`, d[a], d[b]);
      dw.setLabel(`lFf${i}`, V.add(V.mid(d[a], d[b]), [0.22, 0]));
    });
    for (const nm of ['O1', 'P1', 'Q1', 'R1', 'S1', 'T1']) dw.setDisk(`pt_${nm}`, d[nm]);
    dw.setDisk('pt_U1', d.U1);
    dw.setLabel('lbl_U1', V.add(d.U1, [-0.38, -0.16]));
    const off = [s.oRF, 0];
    dw.setArrow('reacA', V.add(d.U1, off), V.add(d.O1, off));
    dw.setArrow('reacB', V.add(d.T1, off), V.add(d.U1, off));
    dw.setLabel('lA', V.add(V.mid(d.U1, d.O1), [s.oRF + 0.22, 0]));
    dw.setLabel('lB', V.add(V.mid(d.T1, d.U1), [s.oRF + 0.22, 0]));
    dw.setArrow('reacRform', V.add(d.R, [0, -1.1]), V.add(d.R, [0, -0.15]));
    dw.setArrow('reacSform', V.add(d.S, [0, -1.1]), V.add(d.S, [0, -0.15]));
    dw.setLabel('lRreac', V.add(d.R, [-0.3, -0.75]));
    dw.setLabel('lSreac', V.add(d.S, [0.2, -0.75]));

    // levels + circle
    const lvls = ['O1', 'P1', 'Q1', 'R1', 'S1', 'T1'];
    lvls.forEach((nm, i) => {
      dw.setDashLine(`lev${i}`, [[d.U1[0] - d.r - 0.9, d[nm][1]], [d[nm][0], d[nm][1]]]);
    });
    const cpts = [];
    for (let a = 0; a <= 64; a++) {
      cpts.push([d.U1[0] + d.r * Math.cos(a / 64 * 2 * Math.PI),
                 d.U1[1] + d.r * Math.sin(a / 64 * 2 * Math.PI)]);
    }
    dw.setDashLine('circle', cpts);
    const rdir = V.unit([-2.2, -1]);
    dw.setSeg('radius', d.U1, V.add(d.U1, V.mul(rdir, d.r)));
    dw.setLabel('lbl_radius', V.add(d.U1, V.mul(rdir, 0.62 * d.r)));

    // members
    for (let k = 1; k <= 17; k++) {
      const m = MEMBERS[k];
      dw.setSeg(`fseg${k}`, d[m[2]], d[m[3]]);
      dw.setSeg(`mem${k}`, d[m[0]], d[m[1]]);
      const fm = V.mid(d[m[2]], d[m[3]]), gm = V.mid(d[m[0]], d[m[1]]);
      const kind = m[4];
      dw.setLabel(`n${k}s`, V.add(fm, kind === 'd' ? [0, 0.16] : kind === 'w' ? [-0.24, 0] : [0.1, 0.18]));
      dw.setLabel(`n${k}f`, V.add(gm, kind === 'd' ? [0, 0.2] : kind === 'w' ? [-0.22, 0] : [0.08, -0.24]));
    }
    for (const nm of ['G2', 'F2', 'E2', 'D2', 'B2', 'C2']) dw.setDisk(`pt_${nm}`, d[nm]);
    for (const nm of ['M2', 'N2', 'O2', 'P2', 'Q2']) {
      dw.setDisk(`pt_${nm}`, d[nm]);
      dw.setLabel(`lbl_${nm}`, V.add(d[nm], [0.05, -0.3]));
    }

    // pipes + readouts
    for (let k = 1; k <= 17; k++) {
      const m = MEMBERS[k];
      const w = d.Ns[k] * s.sIF * s.sFD * 6;
      const u = V.mul(V.unit(V.perp(V.sub(d[m[1]], d[m[0]]))), w / 2);
      dw.setPoly(`if${k}`, [V.add(d[m[0]], u), V.add(d[m[1]], u),
                            V.sub(d[m[1]], u), V.sub(d[m[0]], u)]);
    }
    dw.setLabel('ro0', [17.6, 4.9]);
    dw.setText('ro0', `G = ${s.loadG.toFixed(2)} kN`);
    dw.setLabel('ro1', [17.6, 4.45]);
    dw.setText('ro1', `A = B = ${(2.5 * s.loadG).toFixed(2)} kN`);
    dw.setLabel('roC', [17.6, 4.0]);
    dw.setText('roC', `cable = ${s.BC.toFixed(2)} kN — constant`);

    updateNode();
  }

  // ------------------------------------------------------------------
  // node equilibrium: R, H2..L2 (deck), M2..Q2 (cable kinks), S
  // ------------------------------------------------------------------
  const NODES = ['R', 'H2', 'I2', 'J2', 'K2', 'L2', 'S', 'M2', 'N2', 'O2', 'P2', 'Q2'];
  const NLBL = ['support R', 'H₂', 'I₂', 'J₂', 'K₂', 'L₂', 'support S',
                'M₂', 'N₂', 'O₂', 'P₂', 'Q₂'];
  function nodeSides(nm) {
    const dd = d, o = [s.oRF, 0];
    switch (nm) {
      case 'R':  return [[V.add(dd.U1, o), V.add(dd.O1, o)], [dd.O1, dd.G2], [dd.G2, dd.U1]];
      case 'H2': return [[dd.O1, dd.P1], [dd.P1, dd.F2], [dd.F2, dd.G2], [dd.G2, dd.O1]];
      case 'I2': return [[dd.P1, dd.Q1], [dd.Q1, dd.E2], [dd.E2, dd.F2], [dd.F2, dd.P1]];
      case 'J2': return [[dd.Q1, dd.R1], [dd.R1, dd.D2], [dd.D2, dd.E2], [dd.E2, dd.Q1]];
      case 'K2': return [[dd.R1, dd.S1], [dd.S1, dd.B2], [dd.B2, dd.D2], [dd.D2, dd.R1]];
      case 'L2': return [[dd.S1, dd.T1], [dd.T1, dd.C2], [dd.C2, dd.B2], [dd.B2, dd.S1]];
      case 'S':  return [[V.add(dd.T1, o), V.add(dd.U1, o)], [dd.U1, dd.C2], [dd.C2, dd.T1]];
      case 'M2': return [[dd.U1, dd.G2], [dd.G2, dd.F2], [dd.F2, dd.U1]];
      case 'N2': return [[dd.U1, dd.F2], [dd.F2, dd.E2], [dd.E2, dd.U1]];
      case 'O2': return [[dd.U1, dd.E2], [dd.E2, dd.D2], [dd.D2, dd.U1]];
      case 'P2': return [[dd.U1, dd.D2], [dd.D2, dd.B2], [dd.B2, dd.U1]];
      case 'Q2': return [[dd.U1, dd.B2], [dd.B2, dd.C2], [dd.C2, dd.U1]];
      default: return [];
    }
  }
  function updateNode() {
    const n = Math.max(1, Math.round(s.node));
    dw.selectDisk(s.node > 0 ? `pt_${NODES[n - 1]}` : null);
    dw.setNodeInspector(d[NODES[n - 1]], 1.1, s.node > 0 ? `joint ${NLBL[n - 1]}` : '',
                        nodeSides(NODES[n - 1]));
  }

  // ------------------------------------------------------------------
  function refresh() {
    if (player) s._k = player.k;
    d = compute(s);
    update();
    player.apply(d, s);
  }
  player = makePlayer(STEPS, refresh);

  const view = panel.section('View');
  panel.toggle(view, s, 'n4', 'show points', refresh);
  panel.toggle(view, s, 'lab', 'show member numbers', refresh);
  const par = panel.section('Parameters');
  panel.slider(par, s, 'BC', 'BottomChordForce (kN)', 4, 5, 0.01, refresh);
  panel.slider(par, s, 'loadG', 'loadG (kN)', 0.4, 1.5, 0.01, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram (units/kN)', 0.5, 1, 0.01, refresh);
  panel.slider(par, s, 'oRF', 'offset reaction forces', 0, 1, 0.05, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 0.5, 5, 0.1, refresh);
  panel.toggle(par, s, 'o1', 'show internal forces', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.05, 0.001, refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'joint (0 = off; 1-7 deck, 8-12 cable)', 0, 12, 1, refresh);

  const hits = [['ll', () => d.O1, 2, 99]];
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
      if (name === 'll') s.ll = [wx, wy];
      refresh();
    },
  );

  dw.nodeSelect(
    NODES.map((nm) => ({ at: () => d[nm] })),
    (i) => {
      s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
      panel.syncAll();
      refresh();
    },
  );

  refresh();
  return player;
}
