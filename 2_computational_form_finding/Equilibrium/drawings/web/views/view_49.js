/**
 * Drawing view/49 "Moment from force pair"
 * (https://block.arch.ethz.ch/eq/drawing/view/49) as a step-by-step
 * construction: a force pair (couple) -- two equal and opposite forces F at
 * arm d -- and a movable reference line through J. The moment of the pair
 * splits into F_o * d_o + F_u * d_u, but the SUM is always F * d, no matter
 * where the reference line lies; below the pair the lower share turns
 * negative and the total still stays F * d. The applet's buttons
 * (do = 0, do = du, du = 0, du = -1) jump J to the canonical positions.
 *
 * Live port of view_49/applet_0/geogebra.xml + page.html buttons. All
 * geometry (force anchors, dimension columns, distances, moment) verified
 * against the live applet to ~5e-15 in four states. This view is a pure
 * couple demonstration: it has no force diagram, no funicular and no
 * equilibrium nodes, so there is no node inspector (see the notes).
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 49 — Moment from force pair',
  subtitle: 'the couple F · d is the same about every reference line',
  about: 'Two equal and opposite forces at arm d form a force pair — a pure moment with no resultant. A movable reference line splits the moment into F_o·d_o + F_u·d_u, yet the sum stays F·d wherever the line lies; even below the pair, where the lower share counts negative, the total does not change.',
  frame: [[1.2, 3.9], [17.3, 12.0]],
};

const RESOLVE = 9;

const DEFAULTS = {
  ax: 6, ay: 8,                           // center A of the pair
  dist: 2,                                // half-arm [1, 3] (slider "distance")
  F: 2,                                   // force magnitude [1, 3] kN
  sLS: 1.35,                              // scaleLoadSymbol [0.5, 3] (arrow half-length)
  jt: 0.4,                                // J's fraction along N->H (0 = at C; 0.4 -> y = 8)
  kx: 8.780439121756487,                  // d_o column x (draggable on f)
  mx: 8.19181636726547,                   // connector anchor x
  ox: 9,                                  // d_u column x
  vx: 7.81900199600798,                   // d column x
  n4: true,                               // show points
};

const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'The upper force F₀', d: 'a horizontal force F₀ pointing right — its line of action is fixed' },
  { t: 'The lower force Fᵤ', d: 'an equal and opposite force Fᵤ below it: together they form a FORCE PAIR — the resultant is zero, what remains is pure rotation' },
  { t: 'The arm d', d: 'the perpendicular distance between the two lines of action: d = 2 · distance (slider) — measured by the tall dimension column' },
  { t: 'The moment M = F · d', d: 'the pair turns with moment M = F · d, here clockwise — the arc marks the positive sense' },
  { t: 'A reference line through J', d: 'choose ANY horizontal reference line by sliding J on the dashed vertical (or use the buttons in the panel)' },
  { t: 'The upper share d₀', d: 'd₀ = distance from the line of action of F₀ down to the reference line' },
  { t: 'The lower share dᵤ', d: 'dᵤ = distance from the reference line down to the line of action of Fᵤ' },
  { t: 'M = F₀·d₀ + Fᵤ·dᵤ', d: 'each force contributes its lever about the reference line — and the sum is ALWAYS F·d: drag J, the split changes, the moment does not' },
  { t: 'Independence of the reference', d: 'push J below the pair (button dᵤ = −1): the lower share turns negative, d₀ − dᵤ = d, and M stays F·d — a couple has the same moment about every point',
    detail: (d, st) => [`M = F·d = ${(st.F * d.d).toFixed(1)} kNm — about EVERY reference point`],
    take: 'a force pair has no resultant, only a moment — and that moment is the same everywhere' },
];

function compute(s) {
  const A = [s.ax, s.ay];
  const C = [s.ax, s.ay + s.dist];                              // upper action point
  const B = [s.ax, s.ay - s.dist];                              // lower action point
  const H = [s.ax, s.ay - 3];                                   // lower end of J's rail
  const N = C;                                                  // upper end of J's rail
  const J = [s.ax, N[1] - s.jt * (N[1] - H[1])];
  // force arrows (half-length sLS each side)
  const D = [C[0] - s.sLS, C[1]], E = [C[0] + s.sLS, C[1]];
  const G = [B[0] + s.sLS, B[1]], F1 = [B[0] - s.sLS, B[1]];
  // dimension columns
  const K = [s.kx, C[1]], L = [s.kx, J[1]];                     // d_o
  const P = [s.ox, J[1]], Q = [s.ox, B[1]];                     // d_u
  const R = [s.mx, J[1]], S = [s.mx, B[1]], M = [s.mx, C[1]];   // connector anchors
  const Vp = [s.vx, C[1]], U = [s.vx, B[1]];                    // d
  const d = 2 * s.dist;
  const dO = Math.abs(C[1] - J[1]);
  const dU = Math.abs(J[1] - B[1]);
  const below = J[1] < B[1];
  const Mval = s.F * dO + (below ? -1 : 1) * s.F * dU;
  return { A, B, C, H, N, J, D, E, G, F1, K, L, P, Q, R, S, M, Vp, U,
           d, dO, dU, below, Mval };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  let d = compute(s);

  const ARROW = { w: 0.07, headLen: 0.28, headW: 0.14 };

  dw.label('t_form', 'Form Diagram', { cls: 'title', flash: false, intro: 1 });

  // steps 1-2: the force pair + the vertical rail
  dw.arrow('Fo', { intro: 1, ...ARROW });
  dw.label('lblFo', 'F₀', { intro: 1, color: PAL.green });
  dw.dashLine('rail', { intro: 1, dash: 0.18 });
  dw.arrow('Fu', { intro: 2, ...ARROW });
  dw.label('lblFu', 'Fᵤ', { intro: 2, color: PAL.green });

  // step 3: the arm d (dimension column with cross ticks)
  dw.seg('dcol', { intro: 3, w: 0.03, color: PAL.grey });
  dw.strokes('dticks', 4, { intro: 3, w: 0.03, color: PAL.grey, flash: false });
  dw.label('lblD', '', { intro: 3 });

  // step 4: M = F d + the rotation-sense arc
  dw.strokes('arc', 20, { intro: 4, w: 0.035, color: PAL.black, flash: false });
  dw.poly('archead', 3, { intro: 4, color: PAL.black, flash: false });
  dw.label('lblPlus', '+', { cls: 'title', intro: 4 });
  dw.label('roFd', '', { cls: 'title', intro: 4, flash: false });

  // step 5: the reference line through J
  dw.dashLine('refline', { intro: 5, dash: 0.18, color: PAL.black });
  dw.label('lbl_J', 'J', { cls: 'point', intro: 5 });

  // step 6: d_o column + top connector
  dw.seg('kcol', { intro: 6, w: 0.03, color: PAL.grey });
  dw.strokes('kticks', 4, { intro: 6, w: 0.03, color: PAL.grey, flash: false });
  dw.dashLine('conTop', { intro: 6, dash: 0.09, color: PAL.black });
  dw.label('lblDo', '', { intro: 6 });

  // step 7: d_u column + bottom connector
  dw.seg('ocol', { intro: 7, w: 0.03, color: PAL.grey });
  dw.strokes('oticks', 4, { intro: 7, w: 0.03, color: PAL.grey, flash: false });
  dw.dashLine('conBot', { intro: 7, dash: 0.09, color: PAL.black });
  dw.label('lblDu', '', { intro: 7 });

  // step 8: the split formula (live)
  dw.label('roM1', '', { intro: 8, flash: false });
  dw.label('roM2', '', { intro: 8, flash: false });
  dw.highlight('kcol', [8]);
  dw.highlight('ocol', [8]);

  // points
  const HANDLE = { r: 0.09 }, DERIVED = { r: 0.07 };
  const show = (st) => st.n4;
  dw.disk('pt_A', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_C', { intro: 1, ...DERIVED, when: show });
  dw.disk('pt_B', { intro: 2, ...DERIVED, when: show });
  dw.disk('pt_J', { intro: 5, ...HANDLE, when: show });
  dw.disk('pt_K', { intro: 6, ...HANDLE, when: show });
  dw.disk('pt_O', { intro: 7, ...HANDLE, when: show });

  dw.link('kcol', 'lblDo');
  dw.link('ocol', 'lblDu');
  dw.link('dcol', 'lblD');

  // ------------------------------------------------------------------

  function fmt(x) {
    return (Math.round(x * 100) / 100).toFixed(2).replace(/\.?0+$/, '');
  }

  function update() {
    dw.setLabel('t_form', [3.4, 11.2]);

    dw.setArrow('Fo', d.D, d.E);
    dw.setLabel('lblFo', V.add(d.C, [0.15, 0.32]));
    dw.setArrow('Fu', d.G, d.F1);
    dw.setLabel('lblFu', V.add(d.B, [0.2, -0.34]));
    dw.setDashLine('rail', [d.N, d.H]);

    const X = 0.08;
    const cross = (p) => [[[p[0] - X, p[1] - X], [p[0] + X, p[1] + X]],
                          [[p[0] - X, p[1] + X], [p[0] + X, p[1] - X]]];
    dw.setSeg('dcol', d.Vp, d.U);
    dw.setStrokes('dticks', [...cross(d.Vp), ...cross(d.U)]);
    dw.setLabel('lblD', V.add(V.mid(d.Vp, d.U), [-0.55, 0]));
    dw.setText('lblD', `d = ${fmt(d.d)}`);

    // rotation-sense arc (clockwise +): right half-circle, head at the bottom
    const Z = [15.836, 9.487], r = 0.582;
    const arc = [];
    for (let i = 0; i < 20; i++) {
      const a0 = Math.PI / 2 - (i / 20) * Math.PI;
      const a1 = Math.PI / 2 - ((i + 1) / 20) * Math.PI;
      arc.push([[Z[0] + r * Math.cos(a0), Z[1] + r * Math.sin(a0)],
                [Z[0] + r * Math.cos(a1), Z[1] + r * Math.sin(a1)]]);
    }
    dw.setStrokes('arc', arc);
    const hb = [Z[0], Z[1] - r];
    dw.setPoly('archead', [[hb[0] + 0.1, hb[1] + 0.12], [hb[0] + 0.1, hb[1] - 0.12], [hb[0] - 0.22, hb[1]]]);
    dw.setLabel('lblPlus', [Z[0] - 0.35, Z[1]]);
    dw.setLabel('roFd', [12.6, 8.9]);
    dw.setText('roFd', `F · d = ${fmt(s.F * d.d)} kNm`);

    dw.setDashLine('refline', [[s.ax - 1.2, d.J[1]], [s.ox + 0.4, d.J[1]]]);
    dw.setLabel('lbl_J', V.add(d.J, [-0.35, 0.22]));

    dw.setSeg('kcol', d.K, d.L);
    dw.setStrokes('kticks', [...cross(d.K), ...cross(d.L)]);
    dw.setDashLine('conTop', [d.M, d.K]);
    dw.setLabel('lblDo', V.add(V.mid(d.K, d.L), [0.62, 0]));
    dw.setText('lblDo', `d₀ = ${fmt(d.dO)}`);

    dw.setSeg('ocol', d.P, d.Q);
    dw.setStrokes('oticks', [...cross(d.P), ...cross(d.Q)]);
    dw.setDashLine('conBot', [d.S, d.Q]);
    dw.setLabel('lblDu', V.add(V.mid(d.P, d.Q), [0.62, 0]));
    dw.setText('lblDu', `dᵤ = ${fmt(d.dU)}`);

    dw.setLabel('roM1', [13.35, 10.35]);
    dw.setLabel('roM2', [13.35, 9.7]);
    if (d.below) {
      dw.setText('roM1', 'M = F₀·d₀ − Fᵤ·dᵤ');
      dw.setText('roM2', `= ${fmt(s.F)} · ${fmt(d.dO)} − ${fmt(s.F)} · ${fmt(d.dU)} =`);
    } else {
      dw.setText('roM1', 'M = F₀·d₀ + Fᵤ·dᵤ');
      dw.setText('roM2', `= ${fmt(s.F)} · ${fmt(d.dO)} + ${fmt(s.F)} · ${fmt(d.dU)} =`);
    }

    dw.setDisk('pt_A', d.A);
    dw.setDisk('pt_C', d.C);
    dw.setDisk('pt_B', d.B);
    dw.setDisk('pt_J', d.J);
    dw.setDisk('pt_K', d.K);
    dw.setDisk('pt_O', d.P);
  }

  function refresh() {
    d = compute(s);
    update();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  // ------------------------------------------------------------------

  const view = panel.section('View');
  panel.button(view, 'zoom fit', () => dw.zoomFit());

  const par = panel.section('Parameters');
  panel.slider(par, s, 'F', 'F (kN)', 1, 3, 0.1, refresh);
  panel.slider(par, s, 'dist', 'distance (half-arm, m)', 1, 3, 0.1, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 0.5, 3, 0.05, refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);

  const ref = panel.section('Reference line');
  const setJ = (t) => { s.jt = t; panel.syncAll(); refresh(); };
  panel.button(ref, 'd₀ = 0 (J at F₀)', () => setJ(0));
  panel.button(ref, 'd₀ = dᵤ (J in the middle)', () => setJ(s.dist / (s.dist + 3)));
  panel.button(ref, 'dᵤ = 0 (J at Fᵤ)', () => setJ(2 * s.dist / (s.dist + 3)));
  panel.button(ref, 'dᵤ = −1 (J below the pair)', () => setJ((2 * s.dist + 1) / (s.dist + 3)));
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS });
    panel.syncAll();
    refresh();
  });

  const hits = [
    ['A', () => d.A, 1, 99], ['J', () => d.J, 5, 99],
    ['K', () => d.K, 6, 99], ['O', () => d.P, 7, 99],
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
      if (name === 'A') { s.ax = wx; s.ay = wy; }
      else if (name === 'J') {
        const t = (d.N[1] - wy) / (d.N[1] - d.H[1]);
        s.jt = Math.max(0, Math.min(1, t));
      } else if (name === 'K') s.kx = Math.max(s.ax + 1.6, Math.min(11.5, wx));
      else if (name === 'O') s.ox = Math.max(s.ax + 1.6, Math.min(11.5, wx));
      refresh();
    },
  );

  refresh();
  return player;
}
