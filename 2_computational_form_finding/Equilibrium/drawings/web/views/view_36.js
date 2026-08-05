/**
 * Drawing view/36 "Single panel truss" (https://block.arch.ethz.ch/eq/drawing/view/36)
 * -- hand-written interactive construction (replaces the auto-converted dump).
 *
 * A triangular single-panel truss: pin support at A, roller at B, external load F
 * at the apex C. The reactions are found graphically with the three-force rule
 * (the load and the roller reaction meet at X; the pin reaction must pass through
 * A and X), then the member forces close the force polygon node by node.
 *
 * Interactive: drag the apex C and the force-diagram pole o; sliders for the load
 * magnitude, load angle and force-diagram scale.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 36 — Single panel truss',
  subtitle: 'reactions by the three-force rule, then the force polygon',
  frame: [[-0.44, -1.45], [15.62, 6.58]],
};

const A = [2, 2];                 // pin support (fixed)
const B = [6, 2];                 // roller support (fixed)

const DEFAULTS = {
  cx: 3.61, cy: 4.0,              // apex C (draggable)
  F: 1.5,                         // load magnitude
  phi: -72,                       // load direction (degrees, 0 = ->)
  ox: 10.0, oy: 5.0,              // force-diagram pole o (draggable)
  s: 1.0,                         // force-diagram scale
};

const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'Supports', d: 'pin at A (holds any direction), roller at B (vertical reaction only)' },
  { t: 'Truss panel', d: 'draw the three members: A–B, A–C, C–B' },
  { t: 'External load', d: 'the load F acts on the apex C along its line of action' },
  { t: 'Three-force rule', d: 'F and the roller reaction meet at X; the pin reaction passes through A and X' },
  { t: 'Load vector', d: 'force diagram: draw F to scale, from o to p' },
  { t: 'Reaction triangle', d: 'through p a vertical (∥ R_B), through o a parallel to A–X: they meet in q' },
  { t: 'Reactions', d: 'read off R_B = p→q (roller) and R_A = q→o (pin)' },
  { t: 'Node C', d: 'through o and p, parallels to the members A–C and C–B meet in c' },
  { t: 'Member forces', d: 'o–c is the force in A–C, c–p the force in C–B' },
  { t: 'Compression / tension', d: 'blue = compression, red = tension' },
];

function compute(st) {
  const C = [st.cx, st.cy];
  const dir = [Math.cos(V.rad(st.phi)), Math.sin(V.rad(st.phi))];   // load direction
  const Fv = V.mul(dir, st.F);

  // three-force rule: X = load's line of action ∩ vertical through B
  const X = V.intersect(C, dir, B, [0, 1]) || V.add(B, [0, 3]);
  // moments about A: cross(rCA, F) + RB_y * span = 0
  const momF = V.cross(V.sub(C, A), Fv);
  const RB = [0, -momF / (B[0] - A[0])];            // roller reaction at B
  const RA = V.mul(V.add(Fv, RB), -1);              // pin reaction closes equilibrium

  // member forces from node equilibrium at C (n > 0 = compression)
  const uCA = V.unit(V.sub(A, C));
  const uCB = V.unit(V.sub(B, C));
  const det = V.cross(uCA, uCB);
  const nCA = det ? V.cross(Fv, uCB) / det : 0;
  const nCB = det ? V.cross(uCA, Fv) / det : 0;
  // node A, x-components: RA + nCA*uCA (push of AC) + t*uAB = 0; t > 0 = tension
  const uAB = V.unit(V.sub(B, A));
  const tAB = -(RA[0] + nCA * uCA[0]) / uAB[0];
  const colCA = nCA > 0 ? PAL.blue : PAL.red;
  const colCB = nCB > 0 ? PAL.blue : PAL.red;
  const colAB = tAB > 0 ? PAL.red : PAL.blue;

  // force diagram at pole o
  const O = [st.ox, st.oy];
  const p1 = V.add(O, V.mul(Fv, st.s));             // load vector o -> p
  const p2 = V.add(p1, V.mul(RB, st.s));            // q: then R_B, closing to o via R_A
  const c = V.intersect(O, uCA, p1, uCB) || O;      // node-C polygon corner

  const loadTail = V.sub(C, V.mul(dir, 1.6));       // form-diagram load arrow

  return { C, X, Fv, RA, RB, O, p1, p2, c, loadTail, dir, colCA, colCB, colAB };
}

function hatchPairs(cx, groundY, w = 1.2, n = 5) {
  const pairs = [];
  for (let i = 0; i < n; i++) {
    const x = cx - w / 2 + (i / (n - 1)) * (w * 0.7);
    pairs.push([[x, groundY - 0.45], [x + 0.35, groundY]]);
  }
  return pairs;
}

export function create(dw, panel, makePlayer) {
  const st = { ...DEFAULTS };
  let d = compute(st);
  const memberColor = (key) => ({ pending: PAL.black, final: (dd) => dd[key] });

  dw.label('form_title', 'Form Diagram', { cls: 'title' });
  dw.label('force_title', 'Force Diagram', { cls: 'title', intro: 5, flash: false });

  // step 1: supports
  const groundY = A[1] - 0.26;
  dw.seg('ground_A', { intro: 1, color: PAL.black, w: 0.03 });
  dw.seg('ground_B', { intro: 1, color: PAL.black, w: 0.03 });
  dw.strokes('hatch_A', 5, { intro: 1, color: PAL.grey, w: 0.02 });
  dw.strokes('hatch_B', 5, { intro: 1, color: PAL.grey, w: 0.02 });
  dw.circle('roller_B', { intro: 1, color: PAL.black, z: 0.05 });
  dw.disk('pt_A', { intro: 1, r: 0.09 });
  dw.disk('pt_B', { intro: 1, r: 0.09 });
  dw.label('lbl_A', 'A', { cls: 'point', intro: 1 });
  dw.label('lbl_B', 'B', { cls: 'point', intro: 1 });

  // step 2: members
  dw.seg('mAB', { intro: 2, color: memberColor('colAB'), w: 0.045 });
  dw.seg('mAC', { intro: 2, color: memberColor('colCA'), w: 0.045 });
  dw.seg('mCB', { intro: 2, color: memberColor('colCB'), w: 0.045 });
  dw.disk('pt_C', { intro: 2, r: 0.09 });
  dw.label('lbl_C', 'C', { cls: 'point', intro: 2 });

  // step 3: load at C
  dw.arrow('load', { intro: 3, w: 0.06, headLen: 0.35, headW: 0.14 });

  // step 4: three-force rule (dashed guides + X)
  dw.dashLine('act_F', { intro: 4, dash: 0.18 });
  dw.dashLine('act_B', { intro: 4, dash: 0.18 });
  dw.dashLine('act_A', { intro: 4, dash: 0.18 });
  dw.disk('pt_X', { intro: 4, r: 0.07, face: PAL.grey, edge: PAL.grey });
  dw.label('lbl_X', 'X', { cls: 'point', intro: 4 });

  // step 5: load vector o -> p
  dw.arrow('fF', { intro: 5, w: 0.06, headLen: 0.35, headW: 0.14 });
  dw.disk('pt_O', { intro: 5, r: 0.09 });
  dw.label('lbl_O', 'o', { cls: 'point', intro: 5 });
  dw.label('lbl_p1', 'p', { cls: 'point', intro: 5 });

  // step 6: closing parallels (dashed) -> q
  dw.dashLine('par_B', { intro: 6, dash: 0.18 });
  dw.dashLine('par_A', { intro: 6, dash: 0.18 });
  dw.disk('pt_p2', { intro: 6, r: 0.07, face: PAL.grey, edge: PAL.grey });
  dw.label('lbl_p2', 'q', { cls: 'point', intro: 6 });

  // step 7: reactions (green arrows in both diagrams)
  dw.arrow('rB', { intro: 7, w: 0.06, headLen: 0.35, headW: 0.14 });
  dw.arrow('rA', { intro: 7, w: 0.06, headLen: 0.35, headW: 0.14 });
  dw.arrow('fRB', { intro: 7, w: 0.06, headLen: 0.35, headW: 0.14 });
  dw.arrow('fRA', { intro: 7, w: 0.06, headLen: 0.35, headW: 0.14 });

  // step 8: node-C parallels -> c
  dw.dashLine('par_CA', { intro: 8, dash: 0.18 });
  dw.dashLine('par_CB', { intro: 8, dash: 0.18 });
  dw.disk('pt_c', { intro: 8, r: 0.07, face: PAL.grey, edge: PAL.grey });
  dw.label('lbl_c', 'c', { cls: 'point', intro: 8 });

  // step 9: member force segments
  dw.seg('fCA', { intro: 9, color: memberColor('colCA'), w: 0.045 });
  dw.seg('fCB', { intro: 9, color: memberColor('colCB'), w: 0.045 });

  function update() {
    dw.setLabel('form_title', [2.6, 6.1]);
    dw.setLabel('force_title', [11.4, 6.1]);
    dw.setLabel('lbl_A', [A[0] - 0.35, A[1] + 0.05]);
    dw.setLabel('lbl_B', [B[0] + 0.38, B[1] + 0.05]);
    dw.setDisk('pt_A', A);
    dw.setDisk('pt_B', B);
    dw.setSeg('ground_A', [A[0] - 0.65, groundY], [A[0] + 0.65, groundY]);
    dw.setSeg('ground_B', [B[0] - 0.65, groundY - 0.13], [B[0] + 0.65, groundY - 0.13]);
    dw.setStrokes('hatch_A', hatchPairs(A[0], groundY));
    dw.setStrokes('hatch_B', hatchPairs(B[0], groundY - 0.13));
    dw.setCircle('roller_B', [B[0], A[1] - 0.13], 0.13);

    dw.setSeg('mAB', A, B);
    dw.setSeg('mAC', A, d.C);
    dw.setSeg('mCB', d.C, B);
    dw.setDisk('pt_C', d.C);
    dw.setLabel('lbl_C', [d.C[0] - 0.1, d.C[1] + 0.32]);

    dw.setArrow('load', d.loadTail, d.C);

    // dashed guides: only as long as they need to be
    const ext = (a, b, m = 0.7) => {
      const u = V.unit(V.sub(b, a));
      return [V.sub(a, V.mul(u, m)), V.add(b, V.mul(u, m))];
    };
    dw.setDashLine('act_F', ext(d.loadTail, d.X));
    dw.setDashLine('act_B', ext(B, d.X));
    dw.setDashLine('act_A', ext(A, d.X));
    dw.setDisk('pt_X', d.X);
    dw.setLabel('lbl_X', [d.X[0] + 0.28, d.X[1] + 0.15]);

    dw.setArrow('fF', d.O, d.p1);
    dw.setDisk('pt_O', d.O);
    dw.setLabel('lbl_O', [d.O[0] - 0.3, d.O[1] + 0.1]);
    dw.setLabel('lbl_p1', [d.p1[0] + 0.3, d.p1[1] - 0.1]);

    dw.setDashLine('par_B', ext(d.p1, d.p2));
    dw.setDashLine('par_A', ext(d.O, d.p2));
    dw.setDisk('pt_p2', d.p2);
    dw.setLabel('lbl_p2', [d.p2[0] + 0.3, d.p2[1] + 0.05]);

    const aim = (target, vec) => {   // reaction arrow pointing INTO the support
      const u = V.unit(vec);
      return [V.sub(target, V.mul(u, 1.65)), V.sub(target, V.mul(u, 0.45))];
    };
    dw.setArrow('rB', ...aim(B, d.RB));
    dw.setArrow('rA', ...aim(A, d.RA));
    dw.setArrow('fRB', d.p1, d.p2);
    dw.setArrow('fRA', d.p2, d.O);

    dw.setDashLine('par_CA', ext(d.O, d.c));
    dw.setDashLine('par_CB', ext(d.p1, d.c));
    dw.setDisk('pt_c', d.c);
    dw.setLabel('lbl_c', [d.c[0] - 0.3, d.c[1] - 0.15]);

    dw.setSeg('fCA', d.O, d.c);
    dw.setSeg('fCB', d.c, d.p1);
  }

  function refresh() {
    d = compute(st);
    update();
    player.apply(d, st);
  }

  const player = makePlayer(STEPS, refresh);

  const view = panel.section('View');
  panel.button(view, 'zoom fit', () => dw.zoomFit());

  const par = panel.section('Parameters');
  panel.slider(par, st, 'F', 'F (load)', 0.5, 3, 0.1, refresh);
  panel.slider(par, st, 'phi', 'load angle', -180, 0, 1, refresh);
  panel.slider(par, st, 's', 'scale force diagram', 0.5, 2, 0.1, refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(st, DEFAULTS);
    panel.syncAll();
    refresh();
  });

  const drag = { C: 2, O: 5 };
  dw.enableDrag(
    (wx, wy, tol) => {
      let best = null;
      for (const [name, intro] of Object.entries(drag)) {
        if (player.k < intro) continue;
        const p = name === 'C' ? d.C : d.O;
        const dist = Math.hypot(p[0] - wx, p[1] - wy);
        if (dist < tol) { best = name; tol = dist; }
      }
      return best;
    },
    (name, wx, wy) => {
      if (name === 'C') {
        st.cx = wx;
        st.cy = Math.max(wy, A[1] + 0.6);   // keep the apex above the chord
      } else {
        st.ox = wx;
        st.oy = wy;
      }
      refresh();
    },
  );

  refresh();
  return player;
}
