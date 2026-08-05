/**
 * Drawing view/4 "Resultant of Non-concurrent Forces"
 * (https://block.arch.ethz.ch/eq/drawing/view/4) as a step-by-step
 * construction: six given forces -> force polygon -> resultant magnitude ->
 * pole and rays -> funicular polygon across the lines of action -> the
 * resultant's position.
 *
 * Live port of view_4/applet_0/geogebra.xml (view_4_compas.py coordinates are
 * the regression reference). Every step draws form (left) and force (right)
 * together: each given force with its polygon edge, each funicular string
 * with a re-flash of its pole ray.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 4 — Resultant of Non-concurrent Forces',
  subtitle: 'force polygon + funicular polygon locate the resultant',
  about: 'Six non-concurrent forces are reduced to a single resultant. The force polygon gives its magnitude and direction; a funicular polygon drawn across the lines of action locates its position: the outer strings extended meet on the resultant\'s line of action.',
  frame: [[-27.6089, -57.592], [138.8078, 25.6164]],
};

const N = 6;                              // number of given forces
const CLIP_Y = [19.6294, -55.2746];       // lines of action span these two horizontals
const RESOLVE = 15;

// baked free-point defaults (application points + direction-handle angles)
const A0 = [[-18.2707, 3.7567], [-8.554, 3.8126], [0, 0], [10.8081, 3.3861],
            [20.3302, 3.7567], [31.0451, -2.2876]];
const S0 = [[-18.759, 10.7396], [-8.8727, 10.8053], [1.0771, 6.9166],
            [11.5659, 10.345], [18.1666, -2.9006], [26.7771, 3.2608]];

const DEFAULTS = {
  ax: A0.map((p) => p[0]), ay: A0.map((p) => p[1]),
  th: S0.map((p, i) => Math.atan2(p[1] - A0[i][1], p[0] - A0[i][0])),
  F: [4, 5, 4.5, 4, 7, 7],                // F_1..F_6 [1, 7] kN
  h1x: 77.2424, h1y: 12.7263,             // force polygon start H1
  o1x: 120.2159, o1y: -5.2445,            // pole O1
  o6x: -25.2688, o6y: -19.1522,           // funicular start O6
  wt: -30.8,                              // resultant arrow along its line of action
  sFD: 2.5,                               // scaleForceDiagram [1, 5] units/kN
  sLS: 7,                                 // scaleLoadSymbol [1, 10]
  n4: true,
};

const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'Force 1 — in both diagrams', d: 'left: force 1 at A with its line of action — right: from H₁, the same vector, F₁ × scale long' },
  { t: 'Force 2', d: 'left: force 2 at B — right: tip-to-tail onto the polygon, parallel to it' },
  { t: 'Force 3', d: 'left: force 3 at C — right: tip-to-tail, parallel' },
  { t: 'Force 4', d: 'left: force 4 at D — right: tip-to-tail, parallel' },
  { t: 'Force 5', d: 'left: force 5 at E — right: tip-to-tail, parallel' },
  { t: 'Force 6', d: 'left: force 6 at F — right: tip-to-tail, parallel' },
  { t: 'Pole O₁ and rays', d: 'right: choose a pole O₁ and connect it to every vertex of the force polygon' },
  { t: 'String ∥ ray O₁–H₁', d: 'left: choose O₆, draw the string parallel to the first ray until line of action 1' },
  { t: 'String ∥ ray O₁–I₁', d: 'left: continue from the intersection, parallel to the next ray, to line of action 2' },
  { t: 'String ∥ ray O₁–J₁', d: 'left: continue to line of action 3' },
  { t: 'String ∥ ray O₁–K₁', d: 'left: continue to line of action 4' },
  { t: 'String ∥ ray O₁–L₁', d: 'left: continue to line of action 5' },
  { t: 'String ∥ ray O₁–M₁', d: 'left: continue to line of action 6' },
  { t: 'Close the funicular', d: 'left: extend the last string (∥ O₁–N₁) and the first string — dashed — they intersect at T₂' },
  { t: 'The resultant — in both diagrams', d: 'right: R runs from the polygon start to its end — left: through T₂, parallel to it: the six forces reduce to R, dashed in both diagrams' },
];

const cache = {};
function inter(key, p1, d1, p2, d2) {
  cache[key] = V.intersect(p1, d1, p2, d2) || cache[key] || p1;
  return cache[key];
}

/** Line of action through p along dir, clipped to the two horizontals. */
function loaSeg(p, dir) {
  if (Math.abs(dir[1]) < 0.04) return [V.sub(p, V.mul(dir, 60)), V.add(p, V.mul(dir, 60))];
  const t1 = (CLIP_Y[0] - p[1]) / dir[1];
  const t2 = (CLIP_Y[1] - p[1]) / dir[1];
  return [V.add(p, V.mul(dir, t1)), V.add(p, V.mul(dir, t2))];
}

// the construction (mirrors applet_0/geogebra.xml, evaluated live)
function compute(s) {
  const Ap = s.ax.map((x, i) => [x, s.ay[i]]);
  const Sp = s.th.map((t, i) => V.add(Ap[i], V.mul([Math.cos(t), Math.sin(t)], s.sLS)));
  const dir = Sp.map((sp, i) => V.unit(V.sub(Ap[i], sp)));

  const Pp = [[s.h1x, s.h1y]];                       // H1, I1, ..., N1
  for (let i = 0; i < N; i++) Pp.push(V.add(Pp[i], V.mul(dir[i], s.F[i] * s.sFD)));
  const R = V.sub(Pp[N], Pp[0]);
  const uR = V.unit(R);

  const O1 = [s.o1x, s.o1y], O6 = [s.o6x, s.o6y];
  const rayDir = Pp.map((p) => V.sub(p, O1));        // O1 -> each vertex

  // funicular polygon: string i is parallel to ray i, cut by line of action i+1
  const F0 = inter('G2', O6, rayDir[0], Ap[0], dir[0]);
  const F1 = inter('O2', F0, rayDir[1], Ap[1], dir[1]);
  const F2 = inter('P7', F1, rayDir[2], Ap[2], dir[2]);
  const F3 = inter('Q2', F2, rayDir[3], Ap[3], dir[3]);
  const F4 = inter('R2', F3, rayDir[4], Ap[4], dir[4]);
  const F5 = inter('S2', F4, rayDir[5], Ap[5], dir[5]);
  const T2 = inter('T2', F5, rayDir[6], O6, rayDir[0]);
  const Fp = [F0, F1, F2, F3, F4, F5];

  const W2 = V.add(T2, V.mul(uR, s.wt));
  const Rkn = V.len(R) / s.sFD;

  return { Ap, Sp, dir, Pp, R, uR, O1, O6, Fp, T2, W2, Rkn };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS, ax: [...DEFAULTS.ax], ay: [...DEFAULTS.ay],
              th: [...DEFAULTS.th], F: [...DEFAULTS.F] };
  let d = compute(s);

  const W_BAR = 0.5, W_RAY = 0.22, W_STR = 0.4;
  const ARROW = { w: 0.66, headLen: 2.1, headW: 0.8 };
  const RARROW = { w: 0.8, headLen: 2.6, headW: 1.0 };
  const FCENT = [130, -8];                 // green edge arrows push away from here

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { flash: false });

  // steps 1-6: each given force (left) + its polygon edge (right)
  for (let i = 0; i < N; i++) {
    dw.dashLine(`loa${i}`, { intro: i + 1, dash: 1.1 });
    dw.arrow(`arr${i}`, { intro: i + 1, ...ARROW });
    dw.seg(`edge${i}`, { intro: i + 1, w: W_BAR });
    dw.arrow(`earr${i}`, { intro: i + 1, ...ARROW });
  }

  // the resultant appears in BOTH diagrams at the final step, dashed green
  dw.dashArrow('resArrow', { intro: RESOLVE, flash: false, ...RARROW });

  // step 8: pole + rays; each later string re-flashes its ray
  for (let i = 0; i <= N; i++) {
    dw.seg(`ray${i}`, { intro: 7, w: W_RAY });
    dw.highlight(`ray${i}`, [8 + i]);
  }

  // steps 9-15: funicular strings; the two closing pieces are UNLOADED
  // string extensions -- drawn dashed so they read differently from the
  // loaded strings, meeting at T2
  for (let i = 0; i < N; i++) dw.seg(`str${i}`, { intro: 8 + i, w: W_STR });
  dw.dashLine('strClose', { intro: 14, dash: 1.1 });   // last string S2 -> T2
  dw.dashLine('strExt', { intro: 14, dash: 1.1 });     // first string extended G2 -> T2

  // step 16 is the last step: draw the located resultant in its final green
  dw.dashLine('loaR', { intro: RESOLVE, dash: 1.1, flash: false });
  dw.dashArrow('arrR', { intro: RESOLVE, flash: false, ...RARROW });

  // points
  const HANDLE = { r: 0.8 }, DERIVED = { r: 0.55 };
  const show = (st) => st.n4;
  for (let i = 0; i < N; i++) {
    dw.disk(`pt_A${i}`, { intro: i + 1, ...HANDLE, when: show });
    dw.disk(`pt_S${i}`, { intro: i + 1, ...HANDLE, when: show });
    dw.disk(`pt_P${i + 1}`, { intro: i + 1, ...DERIVED, when: show });
    dw.disk(`pt_F${i}`, { intro: 8 + i, ...DERIVED, when: show });
  }
  dw.disk('pt_H1', { intro: 1, ...HANDLE, when: show });
  dw.disk('pt_O1', { intro: 7, ...HANDLE, when: show });
  dw.disk('pt_O6', { intro: 8, ...HANDLE, when: show });
  dw.disk('pt_T2', { intro: 14, ...DERIVED, when: show });
  dw.disk('pt_W2', { intro: RESOLVE, ...HANDLE, when: show });

  const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
  for (let i = 0; i < N; i++) {
    dw.label(`lblA${i}`, LETTERS[i], { cls: 'point', intro: i + 1, when: show });
  }
  dw.label('lblH1', 'H₁', { cls: 'point', intro: 1, when: show });
  dw.label('lblO1', 'O₁', { cls: 'point', intro: 7, when: show });
  dw.label('lblO6', 'O₆', { cls: 'point', intro: 8, when: show });
  dw.label('lblT2', 'T₂', { cls: 'point', intro: 14, when: show });

  // numbers 1..6 + R on BOTH sides, green like the forces
  for (let i = 0; i < N; i++) {
    dw.label(`f${i}`, `${i + 1}`, { cls: 'num', intro: i + 1, color: PAL.green });
    dw.label(`s${i}`, `${i + 1}`, { cls: 'num', intro: i + 1, color: PAL.green });
  }
  dw.label('fR', 'R', { cls: 'num', intro: RESOLVE, flash: false, color: PAL.green });
  dw.label('sR', 'R', { cls: 'num', intro: RESOLVE, flash: false, color: PAL.green });
  dw.label('roR', '', { intro: RESOLVE, flash: false, color: PAL.green });

  // dual pairs: each force <-> its polygon edge; each string <-> its ray;
  // the resultant <-> its located line of action
  for (let i = 0; i < N; i++) {
    dw.link(`arr${i}`, `loa${i}`, `edge${i}`, `earr${i}`, `f${i}`, `s${i}`);
    if (i > 0) dw.link(`str${i}`, `ray${i}`);
  }
  // the first string + its extension pair with the TOP ray, the closing
  // string with the BOTTOM ray -- each side of the closing pair is dual to
  // its own end of the force diagram
  dw.link('str0', 'ray0', 'strExt');
  dw.link('strClose', 'ray6');
  dw.link('resArrow', 'loaR', 'arrR', 'fR', 'sR');
  const ghostNames = [];
  for (let i = 0; i < N; i++) ghostNames.push(`edge${i}`, `earr${i}`);
  for (let i = 0; i <= N; i++) ghostNames.push(`ray${i}`);
  dw.ghostable(...ghostNames, 'resArrow');

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  function update() {
    dw.setLabel('form_title', [-5, 23.8]);
    dw.setLabel('force_title', [95, 23.8]);
    dw.setLabel('force_sub', [95, 20.6]);
    dw.setText('force_sub', `1 unit :: ${(1 / s.sFD).toFixed(2)} kN`);

    for (let i = 0; i < N; i++) {
      dw.setDashLine(`loa${i}`, loaSeg(d.Ap[i], d.dir[i]));
      dw.setArrow(`arr${i}`, d.Sp[i], d.Ap[i]);
      dw.setSeg(`edge${i}`, d.Pp[i], d.Pp[i + 1]);
      // green arrow beside the edge; number on the far side of the arrow
      const u = V.unit(V.sub(d.Pp[i + 1], d.Pp[i]));
      const p = V.perp(u);
      const m = V.mid(d.Pp[i], d.Pp[i + 1]);
      const sgn = V.dot(p, V.sub(m, FCENT)) >= 0 ? 1 : -1;
      dw.setArrow(`earr${i}`, V.add(d.Pp[i], V.mul(p, 1.5 * sgn)),
                  V.add(d.Pp[i + 1], V.mul(p, 1.5 * sgn)));
      dw.setLabel(`s${i}`, V.add(m, V.mul(p, 3.4 * sgn)));
      // form: number beside the arrow, letter beside the point
      const pf = V.perp(d.dir[i]);
      dw.setLabel(`f${i}`, V.add(V.mid(d.Sp[i], d.Ap[i]), V.mul(pf, 1.9)));
      dw.setLabel(`lblA${i}`, V.add(d.Ap[i], V.mul(pf, -2.1)));
      dw.setDisk(`pt_A${i}`, d.Ap[i]);
      dw.setDisk(`pt_S${i}`, d.Sp[i]);
      dw.setDisk(`pt_P${i + 1}`, d.Pp[i + 1]);
      dw.setDisk(`pt_F${i}`, d.Fp[i]);
    }

    dw.setDashArrow('resArrow', d.Pp[0], d.Pp[N]);
    dw.setLabel('sR', V.add(V.mid(d.Pp[0], d.Pp[N]), V.mul(V.perp(d.uR), -2.6)));

    for (let i = 0; i <= N; i++) dw.setSeg(`ray${i}`, d.O1, d.Pp[i]);

    dw.setSeg('str0', d.O6, d.Fp[0]);
    for (let i = 1; i < N; i++) dw.setSeg(`str${i}`, d.Fp[i - 1], d.Fp[i]);
    dw.setDashLine('strClose', [d.Fp[N - 1], d.T2]);
    dw.setDashLine('strExt', [d.Fp[0], d.T2]);

    dw.setDashLine('loaR', loaSeg(d.T2, d.uR));
    dw.setDashArrow('arrR', d.W2, V.add(d.W2, V.mul(d.uR, 2 * s.sLS)));
    dw.setLabel('fR', V.add(V.add(d.W2, V.mul(d.uR, s.sLS)), V.mul(V.perp(d.uR), 2.2)));

    dw.setDisk('pt_H1', d.Pp[0]);
    dw.setDisk('pt_O1', d.O1);
    dw.setDisk('pt_O6', d.O6);
    dw.setDisk('pt_T2', d.T2);
    dw.setDisk('pt_W2', d.W2);
    dw.setLabel('lblH1', V.add(d.Pp[0], [1.6, 1.6]));
    dw.setLabel('lblO1', V.add(d.O1, [2.6, 0.6]));
    dw.setLabel('lblO6', V.add(d.O6, [-2.7, 0]));
    dw.setLabel('lblT2', V.add(d.T2, [1.4, -2.2]));

    dw.setLabel('roR', [113, 17]);
    dw.setText('roR', `R = ${d.Rkn.toFixed(1)} kN`);
  }

  function refresh() {
    d = compute(s);
    update();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  // ------------------------------------------------------------------
  // side panel + dragging
  // ------------------------------------------------------------------

  const view = panel.section('View');
  panel.button(view, 'zoom fit', () => dw.zoomFit());

  const par = panel.section('Parameters');
  for (let i = 0; i < N; i++) {
    panel.slider(par, s.F, i, `F${i + 1} (kN)`, 1, 7, 0.1, refresh);
  }
  panel.slider(par, s, 'sFD', 'scale force diagram (units/kN)', 1, 5, 0.1, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 1, 10, 0.5, refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, { ...DEFAULTS, ax: [...DEFAULTS.ax], ay: [...DEFAULTS.ay],
                       th: [...DEFAULTS.th], F: [...DEFAULTS.F] });
    panel.syncAll();
    refresh();
  });

  // drag handles: application points, direction handles, H1, O1, O6, W2
  const hits = [];
  for (let i = 0; i < N; i++) {
    hits.push([`A${i}`, () => d.Ap[i], i + 1, 99], [`S${i}`, () => d.Sp[i], i + 1, 99]);
  }
  hits.push(['H1', () => d.Pp[0], 1, 99], ['O1', () => d.O1, 7, 99],
            ['O6', () => d.O6, 8, 99], ['W2', () => d.W2, RESOLVE, 99]);
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
      if (name === 'H1') { s.h1x = wx; s.h1y = wy; }
      else if (name === 'O1') { s.o1x = wx; s.o1y = wy; }
      else if (name === 'O6') { s.o6x = wx; s.o6y = wy; }
      else if (name === 'W2') s.wt = V.dot(V.sub([wx, wy], d.T2), d.uR);
      else {
        const i = +name.slice(1);
        if (name[0] === 'A') { s.ax[i] = wx; s.ay[i] = wy; }
        else s.th[i] = Math.atan2(wy - s.ay[i], wx - s.ax[i]);
      }
      refresh();
    },
  );

  refresh();
  return player;
}
