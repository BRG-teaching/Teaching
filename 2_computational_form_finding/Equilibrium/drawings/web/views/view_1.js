/**
 * Drawing view/1 "Subsystem" (https://block.arch.ethz.ch/eq/drawing/view/1)
 * as a step-by-step construction: a three-bar node and its force polygon.
 *
 * Construction math is a direct port of view_1/view_1_compas.py (which mirrors
 * applet_0/geogebra.xml); everything viewer-related comes from lib/eqdraw.js.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 1 — Subsystem',
  subtitle: 'three-bar node: form + force diagram',
  frame: [[-5.2088, 15.2557], [127.3526, 81.5364]],
};

const DEFAULTS = {
  ax: 24, ay: 48,                          // node A
  radius: 21,                              // guide circle radius   [20, 30]
  thB: Math.atan2(20.99964, -0.123),       // B on circle
  thC: V.rad(210), thD: V.rad(-30),        // C, D on circle
  f4x: 96, f4y: 58,                        // force diagram pole F4
  F: 5,                                    // load magnitude        [1, 10]
  sFD: 3.2,                                // scaleForceDiagram     [1, 5]
  sLS: 7,                                  // scaleLoadSymbol       [1, 10]
  sIF: 0.13,                               // scaleInternalForces   [0.01, 1]
  mode: 0,                                 // flips the force diagram
  n: false,                                // "1 & 2 symmetrical"
  o1: false,                               // "show internal forces"
  o2: false,                               // "hide external force in force diagram"
  n4: true,                                // "show points"
};

// every construction move happens on BOTH sides at once: what is drawn in the
// form diagram (left) appears with its equivalent vector in the force diagram
// (right) in the same step
const STEPS = [
  { t: 'How to draw this scheme', d: 'step through with the slider, press play, or use ←/→' },
  { t: 'Node A', d: 'place the node where the three bars meet' },
  { t: 'Guide circle', d: 'dashed circle of radius R around A: the bar ends lie on it' },
  { t: 'Bar 3', d: 'choose B on the circle and draw bar 3 = A–B' },
  { t: 'The load — in both diagrams', d: 'left: F pulls on the node along bar 3 — right: from pole F4, the same vector, F × scale → G' },
  { t: 'Bar 1 — form and parallel', d: 'left: choose C, bar 1 = C–A — right: dashed parallel to bar 1 through one end of the load vector' },
  { t: 'Bar 2 — form and parallel', d: 'left: choose D, bar 2 = D–A — right: dashed parallel to bar 2 through the other end' },
  { t: 'Point H', d: 'the two parallels intersect at H: the polygon closes' },
  { t: 'Forces in bars 1 and 2', d: 'G–H is the force in bar 2, H–F4 in bar 1 — the bars flash on the left' },
  { t: 'Compression / tension', d: 'closed polygon = equilibrium; blue = compression, red = tension' },
];

let hCache = [82.19, 50.03]; // last valid H, reused if bars 1 and 2 become parallel

// the construction (mirrors applet_0/geogebra.xml)
function compute(s) {
  const A = [s.ax, s.ay];
  const on = (t) => [A[0] + s.radius * Math.cos(t), A[1] + s.radius * Math.sin(t)];
  const B = on(s.thB), C = on(s.thC), D = on(s.thD);
  const Cm = V.mirror(C, A, B);                       // C' = Mirror[C, Ray[A, B]]
  const F4 = [s.f4x, s.f4y];
  const u = V.unit(V.sub(B, A));                      // direction of bar 3

  const W13 = V.ggbAngle(u, V.sub(C, A));
  const bEnd = s.n ? Cm : D;                          // outer end of bar 2
  const W23 = V.ggbAngle(u, V.sub(bEnd, A));
  const cond = W23 > W13;

  const sign = s.mode === 0 ? -1 : 1;
  const G = V.add(F4, V.mul(u, sign * s.F * s.sFD));

  // H = intersection of (through Pi ∥ bar 2) and (through Pj ∥ bar 1)
  const [Pi, Pj] = cond ? [G, F4] : [F4, G];
  const di = V.sub(A, bEnd), dj = V.sub(A, C);
  hCache = V.intersect(Pi, di, Pj, dj) || hCache;
  const H = hCache;

  const E = V.add(B, V.mul(u, s.sLS));                // load symbol endpoint above B
  const segK = cond ? [G, H] : [H, F4];               // force in bar 2
  const segL = cond ? [H, F4] : [H, G];               // force in bar 1

  // dynamic-color angles (internalForce macro)
  const w3 = V.ggbAngle(V.sub(B, A), V.sub(G, F4));
  const w1 = V.ggbAngle(V.sub(C, A), V.sub(F4, H));
  const w1A = V.ggbAngle(V.sub(C, A), V.sub(H, G));
  const w2 = V.ggbAngle(V.sub(D, A), V.sub(H, G));
  const w2A = V.ggbAngle(V.sub(D, A), V.sub(F4, H));
  const w2S = V.ggbAngle(V.sub(Cm, A), V.sub(H, G));
  const w2SA = V.ggbAngle(V.sub(Cm, A), V.sub(F4, H));
  const wb = s.n ? (cond ? w2S : w2SA) : (cond ? w2 : w2A);
  const wa = cond ? w1 : w1A;
  const col = (w) => (V.isCompression(w) ? PAL.blue : PAL.red);

  // internal-force rectangles: name -> [bar end, force segment, w, visible]
  const rects = {
    V3: [B, [F4, G], w3, s.o1],
    V2: [D, [G, H], w2, s.o1 && cond && !s.n],
    V2A: [D, [H, F4], w2A, s.o1 && !cond && !s.n],
    V2S: [Cm, [G, H], w2S, s.o1 && cond && s.n],
    V2SA: [Cm, [H, F4], w2SA, s.o1 && !cond && s.n],
    V1: [C, [H, F4], w1, s.o1 && cond],
    V1A: [C, [G, H], w1A, s.o1 && !cond],
  };

  return { A, B, C, D, Cm, F4, G, H, E, bEnd, cond, Pi, Pj, di, dj, segK, segL,
           c3: col(w3), c2: col(wb), c1: col(wa), rects };
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  let d = compute(s);

  // ------------------------------------------------------------------
  // elements (intro = construction step at which each appears)
  // ------------------------------------------------------------------

  const memberColor = (key) => ({ pending: PAL.black, final: (dd) => dd[key] });

  dw.label('form_title', 'Form Diagram', { cls: 'title' });
  dw.label('force_title', 'Force Diagram', { cls: 'title', intro: 4, flash: false });

  dw.dashedCircle('circle', { intro: 2 });
  dw.seg('bar3', { intro: 3, color: memberColor('c3') });
  dw.seg('bar1', { intro: 5, color: memberColor('c1') });
  dw.seg('bar2', { intro: 6, color: memberColor('c2') });
  dw.dashLine('aux_j', { intro: 5 });   // parallel to bar 1, drawn WITH bar 1
  dw.dashLine('aux_i', { intro: 6 });   // parallel to bar 2, drawn WITH bar 2
  dw.seg('force3', { intro: 4, color: memberColor('c3') });
  dw.seg('force2', { intro: 8, color: memberColor('c2') });
  dw.seg('force1', { intro: 8, color: memberColor('c1') });

  dw.arrow('load', { intro: 4 });                                     // F at the node
  dw.arrow('loadF', { intro: 4, when: (st) => !st.o2 });              // F4 -> G

  // closing the polygon adds no new form element: re-flash bars 1 and 2 on
  // the left while their force segments are drawn on the right
  dw.highlight('bar2', [8]);
  dw.highlight('bar1', [8]);

  dw.disk('pt_A', { intro: 1, when: (st) => st.n4 });
  dw.disk('pt_B', { intro: 3 });
  dw.disk('pt_C', { intro: 5 });
  dw.disk('pt_D', { intro: 6, when: (st) => !st.n });
  dw.disk('pt_Cm', { intro: 6, r: 0.42, when: (st) => st.n });
  dw.disk('pt_F4', { intro: 4 });
  dw.disk('pt_G', { intro: 4, r: 0.42, when: (st) => st.n4 });
  dw.disk('pt_H', { intro: 7, r: 0.42, when: (st) => st.n4 });

  const letters = {
    A: [1, (st) => st.n4], B: [3], C: [5], D: [6, (st) => !st.n],
    F4: [4], G: [4, (st) => st.n4], H: [7, (st) => st.n4],
  };
  for (const [p, [intro, when]] of Object.entries(letters)) {
    dw.label(`lbl_${p}`, p, { cls: 'point', intro, when });
  }
  const numbers = { f3: [3, 'c3'], f1: [5, 'c1'], f2: [6, 'c2'],
                    s3: [4, 'c3'], s2: [8, 'c2'], s1: [8, 'c1'] };
  for (const [name, [intro, ck]] of Object.entries(numbers)) {
    dw.label(name, name[1], { cls: 'num', intro, color: { final: (dd) => dd[ck] } });
  }
  dw.highlight('f2', [8]);
  dw.highlight('f1', [8]);

  // dual pairs: hovering a member highlights its force-diagram counterpart
  dw.link('bar3', 'force3', 'f3', 's3');
  dw.link('bar1', 'force1', 'aux_j', 'f1', 's1');
  dw.link('bar2', 'force2', 'aux_i', 'f2', 's2');
  dw.link('load', 'loadF');
  dw.ghostable('force3', 'force2', 'force1', 'loadF');

  for (const name of Object.keys(d.rects)) {                          // internal forces
    dw.poly(name, 4, {
      intro: STEPS.length - 1, opacity: 0.45, flash: false,
      color: { pending: PAL.grey, final: (dd) => (V.isCompression(dd.rects[name][2]) ? PAL.blue : PAL.red) },
      when: (st, dd) => dd.rects[name][3],
    });
  }

  // ------------------------------------------------------------------
  // geometry refresh
  // ------------------------------------------------------------------

  function update() {
    dw.setLabel('form_title', [18, 79.4]);
    dw.setLabel('force_title', [89, 79.3]);
    dw.setDashedCircle('circle', d.A, s.radius);

    dw.setSeg('bar3', d.A, d.B);
    dw.setSeg('bar1', d.C, d.A);
    dw.setSeg('bar2', d.bEnd, d.A);
    dw.setSeg('force3', d.F4, d.G);
    dw.setSeg('force2', d.segK[0], d.segK[1]);
    dw.setSeg('force1', d.segL[0], d.segL[1]);
    // parallels run a little past H on both sides, GeoGebra-style
    const dir = (from, fallback) => (V.dist(d.H, from) > 1e-6 ? V.unit(V.sub(d.H, from)) : V.unit(fallback));
    const ei = dir(d.Pi, d.di), ej = dir(d.Pj, d.dj);
    dw.setDashLine('aux_i', [V.sub(d.Pi, V.mul(ei, 6)), V.add(d.H, V.mul(ei, 8))]);
    dw.setDashLine('aux_j', [V.sub(d.Pj, V.mul(ej, 6)), V.add(d.H, V.mul(ej, 8))]);

    if (s.mode) dw.setArrow('load', d.B, d.E);
    else dw.setArrow('load', d.E, d.B);
    dw.setArrow('loadF', d.F4, d.G);

    for (const p of ['A', 'B', 'C', 'D', 'Cm', 'F4', 'G', 'H']) dw.setDisk(`pt_${p}`, d[p]);
    const off = { A: [-2.4, -1.8], B: [1.4, 1.0], C: [-2.6, -0.6], D: [1.4, -0.6],
                  F4: [1.2, -1.8], G: [1.4, -1.0], H: [-0.8, 2.0] };
    for (const p of Object.keys(letters)) dw.setLabel(`lbl_${p}`, V.add(d[p], off[p]));

    const midOff = (p, q, dx, dy) => [(p[0] + q[0]) / 2 + dx, (p[1] + q[1]) / 2 + dy];
    dw.setLabel('f3', midOff(d.A, d.B, -1.6, -1.0));
    dw.setLabel('f1', midOff(d.C, d.A, 0.0, 1.2));
    dw.setLabel('f2', midOff(d.bEnd, d.A, -0.6, 1.0));
    dw.setLabel('s3', midOff(d.F4, d.G, 1.2, -0.1));
    dw.setLabel('s2', midOff(d.segK[0], d.segK[1], 0.0, -2.0));
    dw.setLabel('s1', midOff(d.segL[0], d.segL[1], 0.0, 1.4));

    for (const [name, [end, fseg, ,]] of Object.entries(d.rects)) {
      const halfw = (s.sIF * V.dist(fseg[0], fseg[1])) / s.sFD;       // internalForce macro
      dw.setPoly(name, V.rectPoints(d.A, end, halfw));
    }
  }

  function refresh() {
    d = compute(s);
    update();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  // ------------------------------------------------------------------
  // side panel + dragging (A, F4 free; B, C, D stay on the circle)
  // ------------------------------------------------------------------

  const view = panel.section('View');
  panel.button(view, 'zoom fit', () => dw.zoomFit());

  const par = panel.section('Parameters');
  panel.slider(par, s, 'mode', 'mode (flip force diagram)', 0, 1, 1, refresh);
  panel.toggle(par, s, 'n', '1 & 2 symmetrical', refresh);
  panel.toggle(par, s, 'o2', 'hide external force in force diagram', refresh);
  panel.toggle(par, s, 'o1', 'show internal forces', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0.01, 1, 0.01, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram', 1, 5, 0.1, refresh);
  panel.slider(par, s, 'sLS', 'scale load symbol', 1, 10, 0.1, refresh);
  panel.slider(par, s, 'F', 'F (load)', 1, 10, 0.1, refresh);
  panel.slider(par, s, 'radius', 'radius R', 20, 30, 1, refresh);
  panel.toggle(par, s, 'n4', 'show points', refresh);
  panel.button(par, 'return to start', () => {
    Object.assign(s, DEFAULTS);
    panel.syncAll();
    refresh();
  });

  const intro = { A: 1, B: 3, C: 5, D: 6, F4: 4 };
  dw.enableDrag(
    (wx, wy, tol) => {
      let best = null;
      for (const name of Object.keys(intro)) {
        if (player.k < intro[name]) continue;
        if (name === 'D' && s.n) continue;
        const dd = Math.hypot(d[name][0] - wx, d[name][1] - wy);
        if (dd < tol) { best = name; tol = dd; }
      }
      return best;
    },
    (name, wx, wy) => {
      if (name === 'A') { s.ax = wx; s.ay = wy; }
      else if (name === 'F4') { s.f4x = wx; s.f4y = wy; }
      else s[{ B: 'thB', C: 'thC', D: 'thD' }[name]] = Math.atan2(wy - s.ay, wx - s.ax);
      refresh();
    },
  );

  refresh();
  return player;
}
