/**
 * Drawing view/8 "Funicular For Vertical Forces"
 * (https://block.arch.ethz.ch/eq/drawing/view/8) as a step-by-step
 * construction: four vertical loads on a deck line, two supports A and B
 * sliding on vertical walls. A trial funicular spanned wall-to-wall from a
 * trial pole o′ gives the division point i on the load line (the split of the
 * vertical reactions -- independent of the trial). The funicular through BOTH
 * supports exists for every pole o on the line through i parallel to the
 * closing line A-B; the last string then lands exactly on B.
 *
 * Live port of view_8/applet_0/geogebra.xml. The applet keeps its trial
 * machinery (pole J_1, funicular from K_1, closing, parallel) permanently
 * hidden and only shows its result Q_1 ("i"); we stage it as the grey trial
 * construction and keep it to the end. The full chain (load line, hidden
 * trial, division point, pole line, every funicular vertex, closure on W,
 * reaction arrows) is regression-checked against the applet's baked
 * coordinates to ~5e-7.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 8 — Funicular For Vertical Forces',
  subtitle: 'a funicular polygon for four vertical loads between two supports',
  about: 'Four vertical loads between two supports on the walls. A grey trial funicular spanned from wall to wall locates the division point i on the load line — the split of the vertical reactions, the same for any trial. Every pole o chosen on the parallel to the closing line A–B through i yields a funicular polygon that passes exactly through both supports.',
  frame: [[-4.869, -11.2393], [66.2343, 24.3123]],
};

const XR = 23.668233794000216;           // right wall x (left wall at x = 0)
const WALL_Y = [15, -10];                // the walls span these two horizontals
const LOAD_Y = 17;                       // the deck line the loads act on
const CLIP_Y = [21.2965, -10];           // lines of action span these
const DOWN = [0, -1];
const RESOLVE = 18;

const DEFAULTS = {
  rx: [3.004749785270942, 10.911926110829466, 16.244672935043354, 21.63871569976545],
  vy: 0, wy: 5.108170534680571,          // supports A, B along their walls
  d1x: 45, d1y: 15,                      // load line start D1 (top)
  j1x: 57.5, j1y: 3.5,                   // trial pole o' (applet hides it at (48.9, 8.5))
  k1y: -1,                               // trial start K1 on the left wall (applet: off-frame)
  po: 8.45624936,                        // pole o along the parallel through i
  F: [2.9, 4.9, 3, 4.4],                 // F1..F4 [1, 5] kN
  sFD: 1.2,                              // scaleForceDiagram [1, 5] units/kN
  sLS: 2.5,                              // loadSymbol [1, 5]
  sIF: 0.06,
  node: 0,                               // node-equilibrium inspector (0 = off)
  o1: true,
  sc: false,                             // show constraints (the load rails)
  n4: true,                              // show points (the applet's o_3, default true)
  hideRF: false,                         // hide reaction forces in force diagram
  o2: false,                             // hide inner forces (blacken the coloring)
};

// every construction move happens on BOTH sides at once
const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'Two supports', d: 'left: the supports A and B slide on the two walls — the funicular polygon must span between them' },
  { t: 'The loads — in both diagrams', d: 'left: four vertical loads on the deck line with their lines of action — right: the same forces stacked tip-to-tail on the load line: F₁, F₂, F₃, F₄' },
  { t: 'Trial pole o′', d: 'right: place a trial pole o′ anywhere, with rays to the five points of the load line' },
  { t: 'Trial string 1', d: 'left: start at K₁ anywhere on the left wall and draw parallel to the first ray, up to line of action 1' },
  { t: 'Trial string 2', d: 'left: continue parallel to the second ray to line of action 2' },
  { t: 'Trial string 3', d: 'left: continue parallel to the middle ray to line of action 3' },
  { t: 'Trial string 4', d: 'left: continue parallel to the fourth ray to line of action 4' },
  { t: 'Trial string 5', d: 'left: continue parallel to the last ray, from wall to wall' },
  { t: 'Trial closing → division point i', d: 'left: dashed trial closing, wall to wall — right: the parallel through o′ cuts the load line at i: the split of the vertical reactions, the same for ANY trial' },
  { t: 'The closing line A–B', d: 'left: dashed closing line through the two supports — right: the parallel to it through i is the locus of every pole whose funicular passes through A and B' },
  { t: 'The pole o', d: 'right: choose the pole o on that locus (drag it!) — the dashed ray o–i is the dual of the closing line' },
  { t: 'String 1 — form and force', d: 'right: ray from o to the top of the load line — left: from support A parallel to it → node I on line of action 1' },
  { t: 'String 2 — form and force', d: 'right: the second ray — left: continue parallel to it → node II' },
  { t: 'String 3 — form and force', d: 'right: the middle ray — left: continue parallel to it → node III' },
  { t: 'String 4 — form and force', d: 'right: the fourth ray — left: continue parallel to it → node IV' },
  { t: 'String 5 — form and force', d: 'right: the last ray — left: continue parallel to it: it lands exactly ON B' },
  { t: 'Reactions A and B', d: 'right: i splits the load line: B = from below i to o, A = from o back to the top — left: the same pulls appear at the supports' },
  { t: 'Tension', d: 'the funicular between A and B resolves pink = tension — the grey trial stays for comparison; drag o along its locus, the supports, or the loads' },
];

const cache = {};
function inter(key, p1, d1, p2, d2) {
  cache[key] = V.intersect(p1, d1, p2, d2) || cache[key] || p1;
  return cache[key];
}

// the construction (mirrors applet_0/geogebra.xml, evaluated live)
function compute(s) {
  const A = [0, s.vy], B = [XR, s.wy];                          // supports V, W
  const Rp = s.rx.map((x) => [x, LOAD_Y]);                      // load points R, S, T, U
  const Tl = s.rx.map((x) => [x, LOAD_Y + s.sLS]);              // load arrow tails

  // load line (top D1 downward: E1, G1, H1, I1)
  const D1 = [s.d1x, s.d1y];
  const E1 = V.add(D1, [0, -s.F[0] * s.sFD]);
  const G1 = V.add(E1, [0, -s.F[1] * s.sFD]);
  const H1 = V.add(G1, [0, -s.F[2] * s.sFD]);
  const I1 = V.add(H1, [0, -s.F[3] * s.sFD]);
  const verts = [D1, E1, G1, H1, I1];

  // trial funicular from K1 on the left wall, wall to wall, pole o' = J1
  const J1 = [s.j1x, s.j1y];
  const K1 = [0, s.k1y];
  const L1 = inter('L1', K1, V.sub(J1, D1), Rp[0], DOWN);
  const M1 = inter('M1', L1, V.sub(J1, E1), Rp[1], DOWN);
  const N1 = inter('N1', M1, V.sub(J1, G1), Rp[2], DOWN);
  const O1 = inter('O1', N1, V.sub(J1, H1), Rp[3], DOWN);
  const P5 = inter('P5', O1, V.sub(J1, I1), [XR, 0], [0, 1]);
  // closing K1-P5; the parallel through o' cuts the load line at i
  const Q1 = inter('Q1', J1, V.sub(P5, K1), D1, DOWN);

  // the pole o on the line through i parallel to the closing line A-B
  const uc = V.unit(V.sub(B, A));
  const O = V.add(Q1, V.mul(uc, s.po));

  // the funicular through A: string k ∥ ray o-vert[k]; the last lands on B
  const S1 = inter('S1', A, V.sub(O, D1), Rp[0], DOWN);
  const T1 = inter('T1', S1, V.sub(O, E1), Rp[1], DOWN);
  const U1 = inter('U1', T1, V.sub(O, G1), Rp[2], DOWN);
  const V1 = inter('V1', U1, V.sub(O, H1), Rp[3], DOWN);

  // "hide inner forces" (the applet's o_2 checkbox) blackens the dynamic
  // tension/compression coloring of members AND rays
  const col = (w) => (s.o2 ? PAL.black : (V.isCompression(w) ? PAL.blue : PAL.red));
  const c1 = col(V.ggbAngle(V.sub(S1, A), V.sub(O, D1)));
  const c2 = col(V.ggbAngle(V.sub(T1, S1), V.sub(O, E1)));
  const c3 = col(V.ggbAngle(V.sub(U1, T1), V.sub(O, G1)));
  const c4 = col(V.ggbAngle(V.sub(V1, U1), V.sub(O, H1)));
  const c5 = col(V.ggbAngle(V.sub(B, V1), V.sub(O, I1)));

  // reaction arrows at the supports: away from the funicular when it sags
  // (cable, pulls), into the support when it arches (strut, pushes) --
  // the applet's If(y(C_2) > y(D_2), ...) on v_2 / u_2
  const sag = V.mid(T1, U1)[1] <= V.mid(A, B)[1];
  const dirA = V.unit(V.sub(A, S1)), dirB = V.unit(V.sub(B, V1));

  const fcent = V.mul(V.add(V.add(D1, I1), O), 1 / 3);
  const Ns = verts.map((v) => V.dist(O, v) / s.sFD);            // N1..N5 (= RA, .., RB)

  // single rigid offset for the force-side reaction chain B = I1->o, A = o->D1
  // (both arrows translate together so B's head still lands on A's tail at o)
  const pOut = (a, b) => {
    const p = V.perp(V.unit(V.sub(b, a)));
    return V.dot(p, V.sub(V.mid(a, b), fcent)) >= 0 ? p : V.mul(p, -1);
  };
  const roff = V.mul(V.unit(V.add(pOut(O, D1), pOut(I1, O))), 1.3);

  return { A, B, Rp, Tl, D1, E1, G1, H1, I1, verts, J1, K1, L1, M1, N1, O1, P5,
           Q1, uc, O, S1, T1, U1, V1, c1, c2, c3, c4, c5, sag, dirA, dirB,
           fcent, roff, Ns };
}

/** Unit perpendicular of a->b pointing away from cent (label side helper). */
function awaySide(a, b, cent) {
  const p = V.perp(V.unit(V.sub(b, a)));
  return V.dot(p, V.sub(V.mid(a, b), cent)) >= 0 ? p : V.mul(p, -1);
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS, rx: [...DEFAULTS.rx], F: [...DEFAULTS.F] };
  let d = compute(s);

  const memberColor = (key) => ({ pending: PAL.black, final: (dd) => dd[key] });
  const W_BAR = 0.26, W_RAY = 0.12, W_STR = 0.19;
  const ARROW = { w: 0.32, headLen: 1.05, headW: 0.4 };
  const cks = ['c1', 'c2', 'c3', 'c4', 'c5'];

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // step 1: the walls and the two supports
  dw.dashLine('wallL', { intro: 1, dash: 0.6 });
  dw.dashLine('wallR', { intro: 1, dash: 0.6 });

  // step 2: the four loads (left) TOGETHER with the load line (right)
  for (let i = 0; i < 4; i++) {
    dw.dashLine(`loa${i}`, { intro: 2, dash: 0.6 });
    dw.arrow(`load${i}`, { intro: 2, ...ARROW });
    dw.arrow(`edge${i}`, { intro: 2, ...ARROW });
    dw.label(`lblFf${i}`, `F${'₁₂₃₄'[i]}`, { intro: 2, color: PAL.green });
    dw.label(`lblF${i}`, `F${'₁₂₃₄'[i]}`, { intro: 2, color: PAL.green });
    dw.dashLine(`cw${i}`, { intro: 2, dash: 0.45, when: (st) => st.sc });
  }

  // trial (steps 3-9), all grey, kept to the end (user: construction information must never disappear)
  for (let i = 0; i < 5; i++) {
    dw.seg(`tr${i}`, { intro: 3, w: W_RAY, color: PAL.grey });
    dw.seg(`tf${i}`, { intro: 4 + i, w: W_STR, color: PAL.grey });
    dw.highlight(`tr${i}`, [4 + i]);
  }
  dw.dashLine('tclose', { intro: 9, dash: 0.6 });
  dw.dashLine('tpar', { intro: 9, dash: 0.6 });

  // step 10: the closing line A-B (black dashed, kept) + the pole locus
  dw.dashLine('closeAB', { intro: 10, color: PAL.black, dash: 0.8 });
  dw.dashLine('locus', { intro: 10, dash: 0.6 });
  // step 11: the pole o + the closing ray o-i (black dashed, kept)
  dw.dashLine('rayOI', { intro: 11, color: PAL.black, dash: 0.8 });
  dw.highlight('closeAB', [11]);

  // steps 12-16: the five strings, each drawn WITH its ray o-vertex
  for (let i = 0; i < 5; i++) {
    dw.seg(`fr${i}`, { intro: 12 + i, w: W_BAR, color: memberColor(cks[i]) });
    dw.seg(`seg${i}`, { intro: 12 + i, w: W_BAR, color: memberColor(cks[i]) });
    dw.label(`fn${i}`, `${i + 1}`, { cls: 'num', intro: 12 + i, color: { final: (dd) => dd[cks[i]] } });
    dw.label(`sn${i}`, `${i + 1}`, { cls: 'num', intro: 12 + i, color: { final: (dd) => dd[cks[i]] } });
  }

  // step 17: reactions -- the rigid offset chain I1 -> o -> D1 beside the
  // closing rays (right) and at the supports (left). The applet's hideRF
  // checkbox (default false) hides the force-diagram pair.
  const rfShown = (st) => !st.hideRF;
  dw.arrow('reacAf', { intro: 17, ...ARROW, when: rfShown });   // o -> D1
  dw.arrow('reacBf', { intro: 17, ...ARROW, when: rfShown });   // I1 -> o
  dw.arrow('reacA', { intro: 17, ...ARROW });
  dw.arrow('reacB', { intro: 17, ...ARROW });
  dw.label('lblRA', 'A', { intro: 17, color: PAL.green, when: rfShown });
  dw.label('lblRB', 'B', { intro: 17, color: PAL.green, when: rfShown });

  // points
  const HANDLE = { r: 0.42 }, DERIVED = { r: 0.32 };
  const show = (st) => st.n4;
  dw.disk('pt_A', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_B', { intro: 1, ...HANDLE, when: show });
  for (let i = 0; i < 4; i++) dw.disk(`pt_R${i}`, { intro: 2, ...HANDLE, when: show });
  dw.disk('pt_D1', { intro: 2, ...HANDLE, when: show });
  for (const p of ['E1', 'G1', 'H1', 'I1']) dw.disk(`pt_${p}`, { intro: 2, ...DERIVED, when: show });
  dw.disk('pt_J1', { intro: 3, ...HANDLE, when: show });
  dw.disk('pt_K1', { intro: 4, ...HANDLE, when: show });
  for (const [p, k] of [['L1', 4], ['M1', 5], ['N1', 6], ['O1', 7], ['P5', 8]]) {
    dw.disk(`pt_${p}`, { intro: k, ...DERIVED, when: show });
  }
  dw.disk('pt_Q1', { intro: 9, ...DERIVED, when: show });
  dw.disk('pt_O', { intro: 11, ...HANDLE, when: show });
  for (const [p, k] of [['S1', 12], ['T1', 13], ['U1', 14], ['V1', 15]]) {
    dw.disk(`pt_${p}`, { intro: k, ...DERIVED, when: show });
  }

  const letters = {
    A: ['A', 1], B: ['B', 1], J1: ['o′', 3], K1: ['K₁', 4],
    Q1: ['i', 9], O: ['o', 11],
    S1: ['I', 12], T1: ['II', 13], U1: ['III', 14], V1: ['IV', 15],
  };
  for (const [p, [text, intro, outro]] of Object.entries(letters)) {
    dw.label(`lbl_${p}`, text, { cls: 'point', intro, outro, when: show });
  }

  // readouts + internal-force pipes (on by default)
  for (let i = 0; i < 5; i++) {
    dw.label(`ro${i}`, '', { intro: RESOLVE, flash: false, color: { final: (dd) => dd[cks[i]] } });
    dw.poly(`if${i}`, 4, {
      intro: RESOLVE, opacity: 0.45, flash: false,
      color: { pending: PAL.grey, final: (dd) => dd[cks[i]] },
      when: (st) => st.o1,
    });
  }

  // node-equilibrium inspector: free-body star of the selected node enlarged
  // in an inset at the top + the same forces tip-to-tail on the node's
  // sub-polygon of the force diagram (thick black arrows)
  dw.nodeInspector(3, { when: (st) => st.node > 0, w: 1.5 * W_BAR, headLen: 1.6, headW: 0.6, r: 0.45 });

  // dual pairs: hovering a member highlights its counterpart
  for (let i = 0; i < 5; i++) {
    dw.link(`seg${i}`, `fr${i}`, `fn${i}`, `sn${i}`);
    dw.link(`tf${i}`, `tr${i}`);
  }
  for (let i = 0; i < 4; i++) dw.link(`load${i}`, `edge${i}`, `lblFf${i}`, `lblF${i}`);
  dw.link('tclose', 'tpar');
  dw.link('closeAB', 'rayOI', 'locus');
  dw.link('reacA', 'reacAf', 'lblRA');
  dw.link('reacB', 'reacBf', 'lblRB');
  dw.ghostable('edge0', 'edge1', 'edge2', 'edge3', 'fr0', 'fr1', 'fr2', 'fr3', 'fr4',
               'reacAf', 'reacBf', 'tr0', 'tr1', 'tr2', 'tr3', 'tr4');

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  function update() {
    dw.setLabel('form_title', [4.5, 23]);
    dw.setLabel('force_title', [50, 23]);
    dw.setLabel('force_sub', [50, 21.5]);
    dw.setText('force_sub', `1 unit :: ${(1 / s.sFD).toFixed(2)} kN`);

    dw.setDashLine('wallL', [[0, WALL_Y[0]], [0, WALL_Y[1]]]);
    dw.setDashLine('wallR', [[XR, WALL_Y[0]], [XR, WALL_Y[1]]]);

    const edges = [[d.D1, d.E1], [d.E1, d.G1], [d.G1, d.H1], [d.H1, d.I1]];
    const rails = [[0.5, XR / 4 - 0.5], [XR / 4 + 0.5, XR / 2 - 0.5],
                   [XR / 2 + 0.5, 3 * XR / 4 - 0.5], [3 * XR / 4 + 0.5, XR - 0.5]];
    for (let i = 0; i < 4; i++) {
      dw.setDashLine(`loa${i}`, [[s.rx[i], CLIP_Y[0]], [s.rx[i], CLIP_Y[1]]]);
      dw.setArrow(`load${i}`, d.Tl[i], d.Rp[i]);
      dw.setArrow(`edge${i}`, edges[i][0], edges[i][1]);
      dw.setLabel(`lblFf${i}`, [s.rx[i] + 1.0, LOAD_Y + 0.72 * s.sLS]);
      dw.setLabel(`lblF${i}`, V.add(V.mid(edges[i][0], edges[i][1]), [-1.35, 0]));
      dw.setDashLine(`cw${i}`, [[rails[i][0], LOAD_Y], [rails[i][1], LOAD_Y]]);
      dw.setDisk(`pt_R${i}`, d.Rp[i]);
    }
    dw.setDisk('pt_D1', d.D1);
    for (const p of ['E1', 'G1', 'H1', 'I1']) dw.setDisk(`pt_${p}`, d[p]);

    const tfs = [[d.K1, d.L1], [d.L1, d.M1], [d.M1, d.N1], [d.N1, d.O1], [d.O1, d.P5]];
    for (let i = 0; i < 5; i++) {
      dw.setSeg(`tr${i}`, d.J1, d.verts[i]);
      dw.setSeg(`tf${i}`, tfs[i][0], tfs[i][1]);
    }
    dw.setDashLine('tclose', [d.K1, d.P5]);
    dw.setDashLine('tpar', [d.J1, d.Q1]);

    dw.setDashLine('closeAB', [d.A, d.B]);
    dw.setDashLine('locus', [V.sub(d.Q1, V.mul(d.uc, 2.5)), V.add(d.Q1, V.mul(d.uc, 13))]);
    dw.setDashLine('rayOI', [d.O, d.Q1]);

    const segs = [[d.A, d.S1], [d.S1, d.T1], [d.T1, d.U1], [d.U1, d.V1], [d.V1, d.B]];
    for (let i = 0; i < 5; i++) {
      dw.setSeg(`fr${i}`, d.O, d.verts[i]);
      const m = V.mid(d.O, d.verts[i]);
      dw.setLabel(`sn${i}`, V.add(m, V.mul(V.unit(V.sub(d.fcent, m)), 1.2)));
      dw.setSeg(`seg${i}`, segs[i][0], segs[i][1]);
      const pf = V.perp(V.unit(V.sub(segs[i][1], segs[i][0])));
      dw.setLabel(`fn${i}`, V.add(V.mid(segs[i][0], segs[i][1]), V.mul(pf, 1.2)));
    }

    // reactions: the WHOLE force-side chain I1 -> o (B) -> D1 (A) translated
    // rigidly by the single offset d.roff, so B's arrowhead lands exactly on
    // A's tail (at o + roff) and neither covers the pink rays; at the
    // supports (left): pulling away when the funicular sags, pushing into
    // them when it arches (the applet's v_2 / u_2 If(...) branches)
    const T = (p) => V.add(p, d.roff);
    dw.setArrow('reacAf', T(d.O), T(d.D1));
    dw.setArrow('reacBf', T(d.I1), T(d.O));
    const la = 1.3 * s.sLS;
    if (d.sag) {
      dw.setArrow('reacA', d.A, V.add(d.A, V.mul(d.dirA, la)));
      dw.setArrow('reacB', d.B, V.add(d.B, V.mul(d.dirB, la)));
    } else {
      dw.setArrow('reacA', V.sub(d.A, V.mul(d.dirA, la)), d.A);
      dw.setArrow('reacB', V.sub(d.B, V.mul(d.dirB, la)), d.B);
    }
    const outA = awaySide(d.O, d.D1, d.fcent);
    const outB = awaySide(d.I1, d.O, d.fcent);
    dw.setLabel('lblRA', V.add(V.mid(T(d.O), T(d.D1)), V.mul(outA, 1.0)));
    dw.setLabel('lblRB', V.add(V.mid(T(d.I1), T(d.O)), V.mul(outB, 1.0)));

    dw.setDisk('pt_A', d.A);
    dw.setDisk('pt_B', d.B);
    for (const p of ['J1', 'K1', 'L1', 'M1', 'N1', 'O1', 'P5', 'Q1', 'O', 'S1', 'T1', 'U1', 'V1']) {
      dw.setDisk(`pt_${p}`, d[p]);
    }

    const off = { A: [-1.4, 0.7], B: [1.3, -1.2], J1: [1.4, 0.4], K1: [-1.8, -0.8],
                  Q1: [-1.2, -0.75], O: [0.9, -1.2],
                  S1: [0, -1.3], T1: [0, -1.3], U1: [0, -1.3], V1: [0.4, -1.3] };
    for (const p of Object.keys(letters)) dw.setLabel(`lbl_${p}`, V.add(d[p], off[p]));

    const roT = ['N₁ = A', 'N₂', 'N₃', 'N₄', 'N₅ = B'];
    for (let i = 0; i < 5; i++) {
      dw.setLabel(`ro${i}`, [60.6, 1.6 - 1.75 * i]);
      dw.setText(`ro${i}`, `${roT[i]} = ${d.Ns[i].toFixed(1)} kN`);
      dw.setPoly(`if${i}`, V.rectPoints(segs[i][0], segs[i][1], s.sIF * d.Ns[i]));
    }
  }

  // node-equilibrium inspector: node k -> its disk and the sides of its
  // closed sub-polygon in the force diagram (load edge, next-member ray,
  // previous-member ray; the supports pair member force with reaction).
  // Each side, as a vector, is one force acting ON the node.
  const NODE_NAMES = ['A', 'I', 'II', 'III', 'IV', 'B'];
  const NODE_DISKS = ['pt_A', 'pt_S1', 'pt_T1', 'pt_U1', 'pt_V1', 'pt_B'];
  const nodeAt = [() => d.A, () => d.S1, () => d.T1, () => d.U1, () => d.V1, () => d.B];
  // support reactions use the SAME rigid offset d.roff as the visible green
  // arrows reacAf/reacBf, so the black highlight lands exactly on them;
  // member forces stay on the rays (offsetting a side translates it — its
  // vector, hence the free-body star, is unchanged)
  const TT = (p) => V.add(p, d.roff);
  const nodePolys = () => [
    [[TT(d.O), TT(d.D1)], [d.D1, d.O]],
    [[d.D1, d.E1], [d.E1, d.O], [d.O, d.D1]],
    [[d.E1, d.G1], [d.G1, d.O], [d.O, d.E1]],
    [[d.G1, d.H1], [d.H1, d.O], [d.O, d.G1]],
    [[d.H1, d.I1], [d.I1, d.O], [d.O, d.H1]],
    [[TT(d.I1), TT(d.O)], [d.O, d.I1]],
  ];

  function updateNode() {
    const j = Math.max(0, Math.min(NODE_DISKS.length - 1, Math.round(s.node) - 1));
    dw.selectDisk(s.node > 0 ? NODE_DISKS[j] : null);
    dw.setNodeInspector([34, 15], 4.3, `node ${NODE_NAMES[j]}`, nodePolys()[j]);
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
  for (let i = 0; i < 4; i++) panel.slider(par, s.F, i, `F${i + 1} (kN)`, 1, 5, 0.1, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram (units/kN)', 1, 5, 0.05, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 1, 5, 0.5, refresh);
  panel.toggle(par, s, 'o1', 'show internal forces', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.2, 0.005, refresh);
  panel.toggle(par, s, 'sc', 'show constraints (load rails)', refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  panel.toggle(par, s, 'hideRF', 'hide reaction forces in force diagram', refresh);
  panel.toggle(par, s, 'o2', 'hide inner forces', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'node (0 = off, 1 = A, 2–5 = I…IV, 6 = B)', 0, 6, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS, rx: [...DEFAULTS.rx], F: [...DEFAULTS.F] });
    panel.syncAll();
    refresh();
  });

  const hits = [];
  hits.push(['A', () => d.A, 1, 99], ['B', () => d.B, 1, 99]);
  for (let i = 0; i < 4; i++) hits.push([`R${i}`, () => d.Rp[i], 2, 99]);
  hits.push(['D1', () => d.D1, 2, 99],
            ['J1', () => d.J1, 3, 99], ['K1', () => d.K1, 4, 99],
            ['O', () => d.O, 11, 99]);
  const rails = [[0.5, XR / 4 - 0.5], [XR / 4 + 0.5, XR / 2 - 0.5],
                 [XR / 2 + 0.5, 3 * XR / 4 - 0.5], [3 * XR / 4 + 0.5, XR - 0.5]];
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
      if (name === 'A') s.vy = Math.max(WALL_Y[1] + 0.5, Math.min(WALL_Y[0] - 0.5, wy));
      else if (name === 'B') s.wy = Math.max(WALL_Y[1] + 0.5, Math.min(WALL_Y[0] - 0.5, wy));
      else if (name === 'D1') { s.d1x = wx; s.d1y = wy; }
      else if (name === 'J1') { s.j1x = wx; s.j1y = wy; }
      else if (name === 'K1') s.k1y = Math.max(WALL_Y[1], Math.min(WALL_Y[0], wy));
      else if (name === 'O') {
        let t = V.dot(V.sub([wx, wy], d.Q1), d.uc);
        if (Math.abs(t) < 1) t = Math.sign(t) || 1;
        s.po = t;
      } else {
        const i = +name.slice(1);
        s.rx[i] = Math.max(rails[i][0], Math.min(rails[i][1], wx));
      }
      refresh();
    },
  );

  // click a node point to inspect it (clicking the selected node deselects);
  // the panel slider stays in sync via panel.syncAll()
  dw.nodeSelect(nodeAt.map((at) => ({ at })), (i) => {
    s.node = Math.round(s.node) === i + 1 ? 0 : i + 1;
    panel.syncAll();
    refresh();
  });

  refresh();
  return player;
}
