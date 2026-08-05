/**
 * Drawing view/5 "Funicular Line Through Two Points 1"
 * (https://block.arch.ethz.ch/eq/drawing/view/5) as a step-by-step
 * construction: three loads, two prescribed points E3 and G3 -- a trial
 * funicular gives the division point i on the load line; every pole o on the
 * parallel through i to the chord E3-G3 yields a funicular that passes
 * through BOTH points.
 *
 * Live port of view_5/applet_0/geogebra.xml (view_5_compas.py coordinates are
 * the regression reference). Every step draws form (left) and force (right)
 * together; segments are numbered 1-4 on both sides, the intermediate nodes
 * are named I, II, III as in the original applet.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 5 — Funicular Line Through Two Points 1',
  subtitle: 'a funicular through two prescribed points',
  about: 'Three loads and two prescribed points. A trial funicular locates the division point i on the load line; every pole chosen on the parallel to the chord through i produces a funicular that passes exactly through both points.',
  frame: [[-2.6331, 16.5109], [123.3003, 79.4776]],
};

const CLIP_Y = [76.0106, 17.1975];       // guide lines span these two horizontals
const RESOLVE = 15;

const DEFAULTS = {
  px: [13, 21, 39], py: [54, 50, 54],               // load points Z2, A3, B3
  th: [Math.atan2(49.0971 - 54, 12.0194 - 13),      // load directions, as in the applet
       Math.atan2(45.002 - 50, 21.1399 - 21),
       Math.atan2(49.1464 - 54, 40.2009 - 39)],
  e3: [3.9914, 64.7], g3: [52.1721, 63.2101],       // the two prescribed points
  ix: 95.6274, iy: 65.855,                          // load line start I
  mx: 117, my: 52,                                  // trial pole o'
  tH: 43.36,                                        // trial start H3 on E3's guide
  pG: -23.42,                                       // pole o along the chord parallel
  vt: -7.17,                                        // resultant arrow along its line of action
  F: [2.6, 2, 2.6],                                 // F1, F2, F3 [1, 5] kN
  sFD: 4.5,                                         // scaleForceDiagram [4, 6] units/kN
  sLS: 5,                                           // loadSymbol [1, 10]
  sIF: 0.15,
  node: 0,                                          // node-equilibrium inspector (0 = off)
  o1: true,
  n4: true,
};

// every construction move happens on BOTH sides at once
const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'The loads — in both diagrams', d: 'left: three loads with their lines of action — right: stacked tip-to-tail on the load line I→J→K→L' },
  { t: 'Two points to pass through', d: 'left: the funicular must pass through E₃ and G₃ (dashed guides ∥ the load line)' },
  { t: 'Trial pole o′', d: 'right: place a trial pole o′ anywhere — it will be corrected later' },
  { t: 'Trial ray o′–L', d: 'right: ray o′–L — left: start at H₃ on E₃\'s guide, parallel to it, up to line of action 1' },
  { t: 'Trial ray o′–K', d: 'right: ray o′–K — left: continue parallel to it to line of action 2' },
  { t: 'Trial ray o′–J', d: 'right: ray o′–J — left: continue parallel to it to line of action 3' },
  { t: 'Trial ray o′–I', d: 'right: ray o′–I — left: continue parallel to it to G₃\'s guide → S' },
  { t: 'The resultant, located', d: 'both sides at once: extend trial strings 1 and 4 → U locates R (left), and R = I→L on the load line (right), both dashed green' },
  { t: 'Trial closing chord', d: 'left: dashed chord H₃–S — right: the parallel through o′ cuts the load line at i' },
  { t: 'The chord E₃–G₃ → pole o', d: 'left: dashed chord E₃–G₃ — right: through i, parallel to it: ANY pole o on this line passes through both points' },
  { t: 'Segment 1 — form and force', d: 'right: L–o — left: from E₃ parallel to it → node I on line of action 1' },
  { t: 'Segment 2 — form and force', d: 'right: K–o — left: parallel to it → node II' },
  { t: 'Segment 3 — form and force', d: 'right: J–o — left: parallel to it → node III' },
  { t: 'Segment 4 — form and force', d: 'right: I–o — left: parallel to it from III — it lands exactly on G₃' },
  { t: 'Tension', d: 'the funicular through E₃ and G₃ resolves pink = tension (the grey trial stays as a record of the construction)' },
];

const cache = {};
function inter(key, p1, d1, p2, d2) {
  cache[key] = V.intersect(p1, d1, p2, d2) || cache[key] || p1;
  return cache[key];
}

/** Guide through p along u, clipped between the applet's two horizontals. */
function clipGuide(p, u) {
  if (Math.abs(u[1]) < 0.04) return [V.sub(p, V.mul(u, 40)), V.add(p, V.mul(u, 40))];
  const t1 = (CLIP_Y[0] - p[1]) / u[1];
  const t2 = (CLIP_Y[1] - p[1]) / u[1];
  return [V.add(p, V.mul(u, t1)), V.add(p, V.mul(u, t2))];
}

// the construction (mirrors applet_0/geogebra.xml, evaluated live)
function compute(s) {
  const Lp = s.px.map((x, i) => [x, s.py[i]]);                  // Z2, A3, B3
  const Hd = s.th.map((t, i) => V.add(Lp[i], V.mul([Math.cos(t), Math.sin(t)], s.sLS)));
  const dir = Hd.map((h, i) => V.unit(V.sub(h, Lp[i])));        // load directions

  const I = [s.ix, s.iy];
  const J = V.add(I, V.mul(dir[2], s.F[2] * s.sFD));
  const K = V.add(J, V.mul(dir[1], s.F[1] * s.sFD));
  const L = V.add(K, V.mul(dir[0], s.F[0] * s.sFD));
  const uLoad = V.unit(V.sub(L, I));

  const E3 = s.e3, G3 = s.g3;
  const H3 = V.add(E3, V.mul(uLoad, s.tH));
  const M = [s.mx, s.my];

  // trial funicular across the three lines of action, guide to guide
  const P = inter('P', H3, V.sub(L, M), Lp[0], dir[0]);
  const Q = inter('Q', P, V.sub(K, M), Lp[1], dir[1]);
  const R = inter('R', Q, V.sub(J, M), Lp[2], dir[2]);
  const S = inter('S', R, V.sub(I, M), G3, uLoad);

  // trial strings 1 and 4 extended meet at U: the resultant acts there
  const U = inter('U', H3, V.sub(L, M), R, V.sub(I, M));
  const Vr = V.add(U, V.mul(uLoad, s.vt));          // dashed resultant arrow position

  // division point i; the pole line through i parallel to the chord E3-G3
  const E1 = inter('E1', M, V.sub(S, H3), I, uLoad);
  const uch = V.unit(V.sub(G3, E3));
  const G1 = V.add(E1, V.mul(uch, s.pG));

  // the true funicular through E3 ... G3
  const H1 = inter('H1', E3, V.sub(G1, L), Lp[0], dir[0]);
  const I1 = inter('I1', H1, V.sub(G1, K), Lp[1], dir[1]);
  const J1 = inter('J1', I1, V.sub(G1, J), Lp[2], dir[2]);

  // segment-1's line meets the resultant's line of action at M1: the
  // funicular for the single load R is E3 - M1 - G3 (dashed helpers)
  const M1 = inter('M1', E3, V.sub(G1, L), U, uLoad);

  const col = (w) => (V.isCompression(w) ? PAL.blue : PAL.red);
  const c1 = col(V.ggbAngle(V.sub(H1, E3), V.sub(L, G1)));
  const c2 = col(V.ggbAngle(V.sub(I1, H1), V.sub(K, G1)));
  const c3 = col(V.ggbAngle(V.sub(J1, I1), V.sub(J, G1)));
  const c4 = col(V.ggbAngle(V.sub(G3, J1), V.sub(I, G1)));

  const fcent = V.mul(V.add(V.add(I, L), G1), 1 / 3);
  const Ns = [V.dist(G1, L), V.dist(G1, K), V.dist(G1, J), V.dist(G1, I)]
    .map((l) => l / s.sFD);

  return { Lp, Hd, dir, I, J, K, L, uLoad, E3, G3, H3, M, P, Q, R, S, U, Vr, M1,
           E1, uch, G1, H1, I1, J1, fcent, c1, c2, c3, c4, Ns };
}

/** Arrow drawn beside (not on) a force segment, pushed away from `cent`. */
function beside(a, b, cent, off = 0.9) {
  const u = V.unit(V.sub(b, a));
  const p = V.perp(u);
  const sgn = V.dot(p, V.sub(V.mid(a, b), cent)) >= 0 ? 1 : -1;
  const o = V.mul(p, off * sgn);
  return [V.add(a, o), V.add(b, o)];
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS, px: [...DEFAULTS.px], py: [...DEFAULTS.py],
              th: [...DEFAULTS.th], F: [...DEFAULTS.F] };
  let d = compute(s);

  const memberColor = (key) => ({ pending: PAL.black, final: (dd) => dd[key] });
  const W_BAR = 0.4, W_RAY = 0.18, W_STR = 0.32;
  const ARROW = { w: 0.5, headLen: 1.6, headW: 0.6 };

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // step 1: the three loads (left) + the load line I->J->K->L (right):
  // the load-line forces are green arrows drawn ON the line, as in the applet
  for (let i = 0; i < 3; i++) {
    dw.dashLine(`loa${i}`, { intro: 1, dash: 0.85 });
    dw.arrow(`load${i}`, { intro: 1, ...ARROW });
    dw.arrow(`edge${i}`, { intro: 1, ...ARROW });
  }

  // step 2: the two prescribed points + the resultant magnitude
  // (the resultant is ALWAYS dashed: dashed shaft + arrow head)
  dw.dashLine('gE', { intro: 2, dash: 0.85 });
  dw.dashLine('gG', { intro: 2, dash: 0.85 });
  dw.dashArrow('resArrow', { intro: 8, w: 0.7, headLen: 2.2, headW: 0.85 });

  // steps 4-7: trial rays (right) with the trial funicular strings (left),
  // all grey as in the applet
  for (let i = 0; i < 4; i++) {
    dw.seg(`tr${i}`, { intro: 4 + i, w: W_RAY, color: PAL.grey });
    dw.seg(`tf${i}`, { intro: 4 + i, w: W_STR, color: PAL.grey });
  }

  // step 8: strings 1 + 4 extended (dashed grey) meet at U -> the resultant's
  // line of action; the dashed resultant is drawn on it in the FORM diagram
  dw.dashLine('uext1', { intro: 8, dash: 0.85 });
  dw.dashLine('uext4', { intro: 8, dash: 0.85 });
  dw.dashLine('resGuide', { intro: 8, dash: 0.85 });
  dw.dashArrow('resFormArrow', { intro: 8, w: 0.7, headLen: 2.2, headW: 0.85 });

  // step 9: trial closing chord -> division point i (grey dashed, as original)
  dw.dashLine('tclose', { intro: 9, dash: 0.85 });
  dw.dashLine('tpar', { intro: 9, dash: 0.85 });

  // step 10: the chord E3-G3 -> pole line -> pole o (black dashed)
  dw.dashLine('chord', { intro: 10, color: PAL.black, dash: 1.1 });
  dw.dashLine('polePar', { intro: 10, color: PAL.black, dash: 1.1 });

  // steps 11-14: each funicular segment (left) with its pole ray (right)
  const cks = ['c1', 'c2', 'c3', 'c4'];
  for (let i = 0; i < 4; i++) {
    dw.seg(`fr${i}`, { intro: 11 + i, w: W_BAR, color: memberColor(cks[i]) });
    dw.seg(`seg${i}`, { intro: 11 + i, w: W_BAR, color: memberColor(cks[i]) });
  }

  // with the last segment: the funicular of the single load R (dashed
  // chords from H1 and J1 to M1 on the resultant's line of action)
  dw.dashLine('chM1a', { intro: 14, color: PAL.black, dash: 0.85 });
  dw.dashLine('chM1b', { intro: 14, dash: 0.85 });

  // step 15 is final: reactions in green, no flash
  for (const n of ['arrE3', 'arrG3', 'aR1', 'aR4']) {
    dw.arrow(n, { intro: RESOLVE, flash: false, ...ARROW });
  }

  // points
  const HANDLE = { r: 0.62 }, DERIVED = { r: 0.47 };
  const show = (st) => st.n4;
  for (let i = 0; i < 3; i++) {
    dw.disk(`pt_L${i}`, { intro: 1, ...HANDLE, when: show });
    dw.disk(`pt_H${i}`, { intro: 1, ...HANDLE, when: show });
  }
  dw.disk('pt_I', { intro: 1, ...HANDLE, when: show });
  for (const [n, intro] of [['J', 1], ['K', 1], ['Lv', 1]]) {
    dw.disk(`pt_${n}`, { intro, ...DERIVED, when: show });
  }
  dw.disk('pt_E3', { intro: 2, ...HANDLE, when: show });
  dw.disk('pt_G3', { intro: 2, ...HANDLE, when: show });
  dw.disk('pt_M', { intro: 3, ...HANDLE, when: show });
  dw.disk('pt_H3', { intro: 4, ...HANDLE, when: show });
  for (const [n, intro] of [['P', 4], ['Q', 5], ['R', 6], ['S', 7]]) {
    dw.disk(`pt_${n}`, { intro, ...DERIVED, when: show });
  }
  dw.disk('pt_U', { intro: 8, ...DERIVED, when: show });
  dw.disk('pt_V', { intro: 8, ...HANDLE, when: show });
  dw.disk('pt_E1', { intro: 9, ...DERIVED, when: show });
  dw.disk('pt_G1', { intro: 10, ...HANDLE, when: show });
  for (const [n, intro] of [['H1', 11], ['I1', 12], ['J1', 13]]) {
    dw.disk(`pt_${n}`, { intro, ...DERIVED, when: show });
  }
  dw.disk('pt_M1', { intro: 14, ...DERIVED, when: show });

  const letters = {
    I: ['I', 1], E3: ['E₃', 2], G3: ['G₃', 2], M: ['o′', 3],
    E1: ['i', 9], G1: ['o', 10], H1: ['I', 11], I1: ['II', 12], J1: ['III', 13],
    M1: ['M₁', 14],
  };
  for (const [p, [text, intro, outro]] of Object.entries(letters)) {
    dw.label(`lbl_${p}`, text, { cls: 'point', intro, outro, when: show });
  }

  dw.label('lblRf', 'R', { cls: 'num', intro: 8, color: PAL.green });
  dw.label('lblRm', 'R', { cls: 'num', intro: 8, color: PAL.green });

  // segment numbers 1..4, identical on both sides in the same step
  for (let i = 0; i < 4; i++) {
    dw.label(`fn${i}`, `${i + 1}`, { cls: 'num', intro: 11 + i, color: { final: (dd) => dd[cks[i]] } });
    dw.label(`sn${i}`, `${i + 1}`, { cls: 'num', intro: 11 + i, color: { final: (dd) => dd[cks[i]] } });
  }
  for (let i = 0; i < 4; i++) {
    dw.label(`ro${i}`, '', { intro: RESOLVE, flash: false, color: { final: (dd) => dd[cks[i]] } });
  }

  // internal forces (optional)
  const IF = [['E3', 'H1'], ['H1', 'I1'], ['I1', 'J1'], ['J1', 'G3']];
  IF.forEach((pair, i) => {
    dw.poly(`if${i}`, 4, {
      intro: RESOLVE, opacity: 0.45, flash: false,
      color: { pending: PAL.grey, final: (dd) => dd[cks[i]] },
      when: (st) => st.o1,
    });
  });

  // node-equilibrium inspector (mode 2): free-body star of the selected node
  // enlarged in an inset at the top + the same forces tip-to-tail on the
  // node's sub-polygon of the force diagram (thick black arrows)
  dw.nodeInspector(3, { when: (st) => st.node > 0, w: 1.5 * W_BAR, headLen: 2.0, headW: 0.75, r: 0.55 });

  // dual pairs: hovering a member highlights its counterpart
  for (let i = 0; i < 4; i++) {
    dw.link(`seg${i}`, `fr${i}`, `fn${i}`, `sn${i}`);
    dw.link(`tf${i}`, `tr${i}`);
  }
  dw.link('load0', 'edge0');
  dw.link('load1', 'edge1');
  dw.link('load2', 'edge2');
  dw.link('resArrow', 'resFormArrow', 'resGuide');
  dw.link('tclose', 'tpar');
  dw.link('chord', 'polePar');
  dw.link('arrE3', 'aR1');
  dw.link('arrG3', 'aR4');
  dw.ghostable('fr0', 'fr1', 'fr2', 'fr3', 'edge0', 'edge1', 'edge2', 'resArrow');

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  function update() {
    dw.setLabel('form_title', [7, 77.5]);
    dw.setLabel('force_title', [77, 77.5]);
    dw.setLabel('force_sub', [77, 75.3]);
    dw.setText('force_sub', `1 unit :: ${(1 / s.sFD).toFixed(2)} kN`);

    const edges = [[d.K, d.L], [d.J, d.K], [d.I, d.J]];
    for (let i = 0; i < 3; i++) {
      dw.setDashLine(`loa${i}`, clipGuide(d.Lp[i], d.dir[i]));
      dw.setArrow(`load${i}`, d.Lp[i], d.Hd[i]);
      dw.setArrow(`edge${i}`, edges[i][0], edges[i][1]);
      dw.setDisk(`pt_L${i}`, d.Lp[i]);
      dw.setDisk(`pt_H${i}`, d.Hd[i]);
    }
    dw.setDisk('pt_I', d.I);
    dw.setDisk('pt_J', d.J);
    dw.setDisk('pt_K', d.K);
    dw.setDisk('pt_Lv', d.L);

    dw.setDashLine('gE', clipGuide(d.E3, d.uLoad));
    dw.setDashLine('gG', clipGuide(d.G3, d.uLoad));
    // the resultant: dashed shaft I->L with an arrow head at L
    dw.setDashArrow('resArrow', d.I, d.L);

    const trays = [[d.L, d.M], [d.K, d.M], [d.J, d.M], [d.I, d.M]];
    const tfs = [[d.H3, d.P], [d.P, d.Q], [d.Q, d.R], [d.R, d.S]];
    for (let i = 0; i < 4; i++) {
      dw.setSeg(`tr${i}`, trays[i][0], trays[i][1]);
      dw.setSeg(`tf${i}`, tfs[i][0], tfs[i][1]);
    }

    // trial strings 1 + 4 extended to U; the resultant on its line of action
    dw.setDashLine('uext1', [d.P, d.U]);
    dw.setDashLine('uext4', [d.U, d.R]);
    dw.setDashLine('resGuide', clipGuide(d.U, d.uLoad));
    dw.setDashArrow('resFormArrow', d.Vr, V.add(d.Vr, V.mul(d.uLoad, 2 * s.sLS)));
    dw.setLabel('lblRf', V.add(V.mid(d.I, d.L), [-1.8, 0]));
    dw.setLabel('lblRm', V.add(d.Vr, V.add(V.mul(d.uLoad, s.sLS), [1.7, 0])));
    dw.setDisk('pt_U', d.U);
    dw.setDisk('pt_V', d.Vr);

    dw.setDashLine('tclose', [d.H3, d.S]);
    dw.setDashLine('tpar', [d.M, d.E1]);
    dw.setDashLine('chM1a', [d.H1, d.M1]);
    dw.setDashLine('chM1b', [d.M1, d.J1]);

    dw.setDashLine('chord', [d.E3, d.G3]);
    const pp = V.mul(d.uch, Math.sign(s.pG) || 1);
    dw.setDashLine('polePar', [V.sub(d.E1, V.mul(pp, 2.5)), V.add(d.G1, V.mul(pp, 4))]);

    const frs = [[d.L, d.G1], [d.K, d.G1], [d.J, d.G1], [d.I, d.G1]];
    const segs = [[d.E3, d.H1], [d.H1, d.I1], [d.I1, d.J1], [d.J1, d.G3]];
    for (let i = 0; i < 4; i++) {
      dw.setSeg(`fr${i}`, frs[i][0], frs[i][1]);
      dw.setSeg(`seg${i}`, segs[i][0], segs[i][1]);
      const pf = V.perp(V.unit(V.sub(segs[i][1], segs[i][0])));
      dw.setLabel(`fn${i}`, V.add(V.mid(segs[i][0], segs[i][1]), V.mul(pf, 1.6)));
      const m = V.mid(frs[i][0], frs[i][1]);
      dw.setLabel(`sn${i}`, V.add(m, V.mul(V.unit(V.sub(d.fcent, m)), 1.7)));
    }

    dw.setArrow('arrE3', d.E3, V.add(d.E3, V.mul(V.unit(V.sub(d.E3, d.H1)), 0.8 * s.sLS)));
    dw.setArrow('arrG3', d.G3, V.add(d.G3, V.mul(V.unit(V.sub(d.G3, d.J1)), 0.8 * s.sLS)));
    dw.setArrow('aR1', ...beside(d.L, d.G1, d.fcent));
    dw.setArrow('aR4', ...beside(d.G1, d.I, d.fcent));

    dw.setDisk('pt_E3', d.E3);
    dw.setDisk('pt_G3', d.G3);
    dw.setDisk('pt_M', d.M);
    dw.setDisk('pt_H3', d.H3);
    for (const p of ['P', 'Q', 'R', 'S', 'E1', 'G1', 'H1', 'I1', 'J1', 'M1']) dw.setDisk(`pt_${p}`, d[p]);

    const off = { I: [1.7, 0.7], E3: [-1.7, -1.3], G3: [1.7, -1.3], M: [1.8, 0],
                  E1: [1.6, 1.3], G1: [-0.6, -1.8], H1: [-1.6, -1.1], I1: [-1.6, -1.0], J1: [1.6, -1.1],
                  M1: [1.8, -0.9] };
    for (const p of Object.keys(letters)) dw.setLabel(`lbl_${p}`, V.add(d[p], off[p]));

    for (let i = 0; i < 4; i++) {
      dw.setLabel(`ro${i}`, [104, 26 - 2.4 * i]);
      dw.setText(`ro${i}`, `N${'₁₂₃₄'[i]} = ${d.Ns[i].toFixed(1)} kN`);
      const [a, b] = IF[i];
      dw.setPoly(`if${i}`, V.rectPoints(d[a === 'E3' ? 'E3' : a], d[b === 'G3' ? 'G3' : b],
                                        s.sIF * d.Ns[i]));
    }
  }

  // node-equilibrium inspector: node k -> its point, its disk, and the sides
  // of its closed sub-polygon in the force diagram (load-line edge, next-member
  // ray, previous-member ray; supports degenerate to member force + reaction;
  // M1 balances R against the two chord forces = the outer triangle L-o-I).
  // Each side, as a vector, is one force acting ON the node.
  const NODE_NAMES = ['E₃', 'I', 'II', 'III', 'G₃', 'M₁'];
  const NODE_DISKS = ['pt_E3', 'pt_H1', 'pt_I1', 'pt_J1', 'pt_G3', 'pt_M1'];
  const nodeAt = [() => d.E3, () => d.H1, () => d.I1, () => d.J1, () => d.G3, () => d.M1];
  const nodePolys = () => [
    [[d.L, d.G1], [d.G1, d.L]],
    [[d.K, d.L], [d.L, d.G1], [d.G1, d.K]],
    [[d.J, d.K], [d.K, d.G1], [d.G1, d.J]],
    [[d.I, d.J], [d.J, d.G1], [d.G1, d.I]],
    [[d.I, d.G1], [d.G1, d.I]],
    [[d.I, d.L], [d.L, d.G1], [d.G1, d.I]],
  ];

  function updateNode() {
    const j = Math.max(0, Math.min(NODE_DISKS.length - 1, Math.round(s.node) - 1));
    dw.selectDisk(s.node > 0 ? NODE_DISKS[j] : null);
    dw.setNodeInspector([26, 70.8], 5.8, `node ${NODE_NAMES[j]}`, nodePolys()[j]);
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
  for (let i = 0; i < 3; i++) panel.slider(par, s.F, i, `F${i + 1} (kN)`, 1, 5, 0.1, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram (units/kN)', 4, 6, 0.1, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 1, 10, 0.5, refresh);
  panel.toggle(par, s, 'o1', 'show internal forces', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.4, 0.01, refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'node (0 = off, 1 = E₃, 2–4 = I…III, 5 = G₃, 6 = M₁)',
               0, 6, 1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS, px: [...DEFAULTS.px], py: [...DEFAULTS.py],
                       th: [...DEFAULTS.th], F: [...DEFAULTS.F] });
    panel.syncAll();
    refresh();
  });

  const hits = [];
  for (let i = 0; i < 3; i++) {
    hits.push([`P${i}`, () => d.Lp[i], 1, 99], [`D${i}`, () => d.Hd[i], 1, 99]);
  }
  hits.push(['I', () => d.I, 1, 99], ['E3', () => d.E3, 2, 99], ['G3', () => d.G3, 2, 99],
            ['M', () => d.M, 3, 99], ['H3', () => d.H3, 4, 99],
            ['V', () => d.Vr, 8, 99], ['G1', () => d.G1, 10, 99]);
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
      if (name === 'I') { s.ix = wx; s.iy = wy; }
      else if (name === 'E3') s.e3 = [wx, wy];
      else if (name === 'G3') s.g3 = [wx, wy];
      else if (name === 'M') { s.mx = wx; s.my = wy; }
      else if (name === 'H3') s.tH = V.dot(V.sub([wx, wy], d.E3), d.uLoad);
      else if (name === 'V') s.vt = V.dot(V.sub([wx, wy], d.U), d.uLoad);
      else if (name === 'G1') {
        let t = V.dot(V.sub([wx, wy], d.E1), d.uch);
        if (Math.abs(t) < 0.5) t = 0.5 * (Math.sign(t) || -1);
        s.pG = t;
      } else {
        const i = +name.slice(1);
        if (name[0] === 'P') { s.px[i] = wx; s.py[i] = wy; }
        else s.th[i] = Math.atan2(wy - s.py[i], wx - s.px[i]);
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
