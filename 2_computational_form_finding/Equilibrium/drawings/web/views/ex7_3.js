/**
 * EX 7 · Task 3 — Internal force flow in a beam with openings
 * Structural Design II, FS 23 (sheet EX 7 "Beams", page 2).
 *
 * "The following two beams have openings for installation pipes as well as
 * doors and windows. Find a possible force flow within the material. Draw this
 * qualitatively into the beams and mark the elements in the according colour."
 *
 * The load is labelled only `g_d` with NO value, and the task says
 * "qualitatively" — so this view carries a load slider and reports everything
 * as a multiple of it, rather than inventing a number.
 *
 * Digitised at the stated 1:100. Both beams are 10.000 m long and 2.000 m deep
 * and both are DOUBLE CANTILEVERS on two interior supports, which is what makes
 * the task interesting: they hog over the supports and sag between them, so the
 * tension chord changes sides twice along each beam.
 *   LEFT beam   pin at 2.92 m, roller at 7.08 m (symmetric, 2.92 m of overhang
 *               at each end). Twelve Ø 0.271 m pipe holes in two clusters of
 *               3 × 2, at x = 0.261 / 0.645 / 1.028 m and 8.968 / 9.351 /
 *               9.734 m, in rows 0.222 m and 0.607 m below the top face.
 *   RIGHT beam  pin at 5.00 m, roller at 7.50 m (5.00 m of overhang left,
 *               2.50 m right). A 0.881 m square window at x 0.300…1.181,
 *               0.300 m below the top; and a 0.749 × 1.326 m door at
 *               x 8.951…9.700, from 0.374 to 1.700 m below the top.
 *
 * The point of the exercise is where those openings sit. Both clusters of pipe
 * holes are in the TOP corners of the left beam — over the cantilevers, which
 * is exactly where the hogging tension chord runs. So the flow cannot go
 * straight through; the tie has to be routed under the holes, and the view
 * draws that detour and reports how much depth it costs.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

const L = 10, DEP = 2;
const MPU = 1.55;
const NSEG = 60;

const BEAM = [
  { tag: 'left', sup: [2.92, 7.08],
    holes: [
      ...[0.261, 0.645, 1.028, 8.968, 9.351, 9.734].map((x) => ({ x, y: DEP - 0.222, r: 0.1355 })),
      ...[0.261, 0.645, 1.028, 8.968, 9.351, 9.734].map((x) => ({ x, y: DEP - 0.607, r: 0.1355 })),
    ],
    rects: [] },
  { tag: 'right', sup: [5.0, 7.5],
    holes: [],
    rects: [{ x0: 0.300, x1: 1.181, y0: DEP - 1.181, y1: DEP - 0.300 },
            { x0: 8.951, x1: 9.700, y0: DEP - 1.700, y1: DEP - 0.374 }] },
];

const DEFAULTS = { sit: 0, q: 15, detour: true, lbl: true, _k: 99 };
const FLOW = 3;

const STEPS = [
  { t: 'The exercise', d: 'EX 7 task 3: two beams with holes cut through them for pipes, a window and a door. Find a force flow that gets round them' },
  { t: 'What is given', d: 'left: a beam ten metres long and two deep on two INTERIOR supports, so it cantilevers at both ends. The sheet prints no load value — this is a qualitative task, so drag the load and watch nothing about the picture change',
    detail: (d, st) => [`${d.tag} beam · supports at ${d.sup.map((x) => x.toFixed(2)).join(' and ')} m`,
                        d.holes.length ? `${d.holes.length} pipe holes of Ø ${(2 * d.holes[0].r).toFixed(3)} m, in the two top corners`
                                       : 'a window near the left end and a door near the right'] },
  { t: 'Where it sags and where it hogs', d: 'a double cantilever usually does both — hogging over the supports and sagging between them. Work it out here and something better turns up',
    detail: (d) => [d.Msag > 1e-6
      ? `hogging over each support, sagging between: the sign changes at ${d.inflect.map((x) => x.toFixed(2)).join(' and ')} m`
      : 'this beam HOGS ALL THE WAY ALONG — there is no sagging region at all',
      `largest hogging moment ${Math.abs(d.Mhog).toFixed(1)} kNm · largest sagging ${d.Msag.toFixed(1)} kNm`,
      d.Msag > 1e-6 ? '' : `sagging vanishes once the cantilevers pass 2.50 m, and the sheet puts the supports at ${d.xa.toFixed(2)} m`],
    take: 'so the tension chord is the TOP one over the whole beam — which is exactly where all the holes are' },
  { t: 'The natural force flow', d: 'blue is the compression path and pink the tension it pulls against. Drawn without regard for the openings first, so you can see exactly which ones are in the way',
    detail: (d) => [`${d.clash} of the openings sit on the tension chord`,
                    d.clash ? 'and they are all in the top of the beam, where the tension chord runs — the flow as drawn goes straight through them, which a hole cannot carry'
                            : 'nothing is in the way here'] },
  { t: 'Routing round the openings', d: 'the tie cannot run through a hole, so it drops below the lowest row of them and comes back up. It costs lever arm, so the force in that stretch goes up — that is the price of the pipes',
    detail: (d) => [d.detour
      ? `the tie is pushed ${d.drop.toFixed(3)} m down past the holes, cutting the lever arm from ${DEP.toFixed(2)} to ${(DEP - d.drop).toFixed(2)} m`
      : 'untick “route round the openings” to compare',
      d.detour ? `so the chord force there rises from ${d.f0.toFixed(1)} to ${d.f1.toFixed(1)} kN, i.e. +${((d.f1 / d.f0 - 1) * 100).toFixed(0)} %` : ''],
    take: 'an opening is not free: it costs whatever depth the force has to give up to get round it' },
  { t: 'Where you may cut a hole', d: 'switch to the right-hand beam. Its window sits in the left cantilever and its door beyond the roller — both in hogging zones, both near the TOP. A hole is cheap where the chord it interrupts is lightly loaded, and expensive where it is not',
    detail: () => ['the safest place for an opening is near a point of inflection, where the moment passes through zero',
                   'the worst place is at a support, where the moment is largest'],
    take: 'draw the force flow first and cut the holes second, not the other way round' },
];

function compute(s) {
  const B = BEAM[Math.round(s.sit)];
  const q = s.q, tot = q * L;
  const [xa, xb] = B.sup;
  const RB = (tot * (L / 2 - xa)) / (xb - xa);
  const RA = tot - RB;
  const M = (x) => {
    let m = 0;
    if (x > xa) m += RA * (x - xa);
    if (x > xb) m += RB * (x - xb);
    return m - (q * x * x) / 2;
  };
  const xs = Array.from({ length: NSEG + 1 }, (_, i) => (L * i) / NSEG);
  const Ms = xs.map(M);
  let Mhog = 0, Msag = 0;
  for (let i = 0; i <= 2000; i++) {
    const v = M((L * i) / 2000);
    if (v < Mhog) Mhog = v;
    if (v > Msag) Msag = v;
  }
  const Mabs = Math.max(Math.abs(Mhog), Msag, 1e-9);
  const H = Mabs / DEP;
  const thrust = xs.map((x, i) => [x, Ms[i] / H]);
  const inflect = [];
  for (let i = 1; i <= NSEG; i++) {
    if (Ms[i - 1] * Ms[i] < 0) {
      inflect.push(xs[i - 1] + (xs[i] - xs[i - 1]) * Math.abs(Ms[i - 1])
        / (Math.abs(Ms[i - 1]) + Math.abs(Ms[i])));
    }
  }
  // how deep the tie has to drop to clear the lowest opening it meets
  const tops = [...B.holes.map((h) => h.y - h.r), ...B.rects.map((r) => r.y0)];
  const drop = tops.length ? DEP - Math.min(...tops) : 0;
  const clash = B.holes.length + B.rects.length;
  const f0 = Math.abs(Mhog) / DEP;
  const f1 = Math.abs(Mhog) / Math.max(DEP - drop, 0.2);
  return { ...B, q, tot, RA, RB, xa, xb, thrust, inflect, Mhog, Msag, H,
           drop, clash, f0, f1, detour: s.detour };
}

export const meta = {
  title: 'EX 7.3 — a beam full of holes',
  subtitle: 'Structural Design II · sheet EX 7 “Beams”, task 3',
  about: 'Two beams that have to carry a load and let pipes, a window and a door through at the same time. Both are double cantilevers, and their supports are set far enough in that sagging disappears completely — work it out and the whole length turns out to be hogging, so the TENSION chord is the top one everywhere. Which is exactly where every one of the openings has been cut. The flow has to detour under them, and the detour costs depth. No load value is printed, so drag it and watch the picture stay the same: this one is about geometry, not numbers.',
  result: (d) => [
    `${d.tag} beam: supports at ${d.xa.toFixed(2)} and ${d.xb.toFixed(2)} m, cantilevering ${d.xa.toFixed(2)} m and ${(L - d.xb).toFixed(2)} m`,
    d.Msag > 1e-6
      ? `hogging over the supports, sagging between — the tension chord changes sides at ${d.inflect.map((x) => x.toFixed(2)).join(' and ')} m`
      : `it HOGS the whole way: the cantilevers are longer than the 2.50 m at which sagging disappears, so the TOP chord is the tension one everywhere`,
    d.detour && d.drop > 0
      ? `routed under the openings the lever arm drops to ${(DEP - d.drop).toFixed(2)} m and the chord force rises ${((d.f1 / d.f0 - 1) * 100).toFixed(0)} %`
      : 'the natural flow, drawn without regard for the openings'],
  frame: [[-24, -20], [24, 20]],
};

const AX = -19, BASE = -3;
const ux = (m) => AX + m * MPU;
const uy = (m) => BASE + m * MPU;

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const ARR = dw.W.arrow;

  dw.label('form_title', 'Form diagram 1:100 — qualitative', { cls: 'title', flash: false });

  dw.poly('beam', 4, { intro: 1, opacity: 1.0, z: -0.6, color: 0xf0f0f3, flash: false });
  dw.strokes('edge', 4, { intro: 1, w: dw.W.thin, color: PAL.grey, flash: false });
  dw.seg('qbar', { intro: 1, w: dw.W.thin, color: PAL.green });
  dw.arrows('qarr', 21, { intro: 1, w: dw.W.thin, color: PAL.green,
    headLen: dw.W.narrow.headLen * 0.8, headW: dw.W.narrow.headW * 0.8 });
  dw.label('lq', 'g_d', { cls: 'num', intro: 1, color: PAL.green, when: (st) => st.lbl });
  for (let i = 0; i < 2; i++) {
    dw.disk(`sup${i}`, { intro: 1, r: dw.W.disk });
    dw.strokes(`hat${i}`, 5, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
    dw.seg(`roll${i}`, { intro: 1, w: dw.W.thin, color: PAL.grey, flash: false,
      when: (st, dd) => i === 1 });
  }
  // the openings: twelve circles for the left beam, two rectangles for the right
  for (let i = 0; i < 12; i++) {
    dw.circle(`hole${i}`, { intro: 1, color: PAL.black, flash: false,
      when: (st, dd) => !!dd && i < dd.holes.length });
  }
  for (let i = 0; i < 2; i++) {
    dw.strokes(`rect${i}`, 4, { intro: 1, w: dw.W.thin, color: PAL.black, flash: false,
      when: (st, dd) => !!dd && i < dd.rects.length });
  }
  for (let i = 0; i < 2; i++) {
    dw.disk(`inf${i}`, { intro: 2, r: dw.W.disk * 0.7,
      when: (st, dd) => !!dd && i < dd.inflect.length });
    dw.label(`linf${i}`, '', { cls: 'point', intro: 2, flash: false, color: PAL.grey,
      when: (st, dd) => !!dd && i < dd.inflect.length });
  }
  dw.strokes('thrust', NSEG, { intro: FLOW, w: dw.W.bar, color: PAL.blue });
  dw.strokes('tie', NSEG, { intro: FLOW, w: dw.W.bar, color: PAL.red });
  dw.label('lthr', 'compression', { cls: 'num', intro: FLOW, flash: false, color: PAL.blue });
  dw.label('ltie', 'tension', { cls: 'num', intro: FLOW, flash: false, color: PAL.red });
  dw.label('lcost', '', { cls: 'num', intro: 4, flash: false, color: PAL.red });

  dw.instant('form_title', 'beam', 'edge');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    dw.setLabel('form_title', [-2, -11.0]);

    const c = [[ux(0), uy(0)], [ux(L), uy(0)], [ux(L), uy(DEP)], [ux(0), uy(DEP)]];
    dw.setPoly('beam', c);
    dw.setStrokes('edge', c.map((p, i) => [p, c[(i + 1) % 4]]));

    const qy = uy(DEP) + 3.0;
    dw.setSeg('qbar', [ux(0), qy], [ux(L), qy]);
    dw.setArrows('qarr', Array.from({ length: 21 }, (_, i) => {
      const x = ux((L * i) / 20);
      return [[x, qy], [x, qy - 1.1]];
    }));
    dw.setLabel('lq', [ux(L) + 3.0, qy]);

    d.sup.forEach((x, i) => {
      const p = [ux(x), uy(0)];
      dw.setDisk(`sup${i}`, p);
      const drop = i === 1 ? 1.5 : 0.5;
      dw.setStrokes(`hat${i}`, V.hatch([p[0] - 1.8, p[1] - drop],
        [p[0] + 1.8, p[1] - drop], -1, 0.95, 5));
      if (i === 1) dw.setSeg(`roll${i}`, [p[0] - 1.8, p[1] - 1.2], [p[0] + 1.8, p[1] - 1.2]);
    });
    d.holes.forEach((h, i) => dw.setCircle(`hole${i}`, [ux(h.x), uy(h.y)], h.r * MPU));
    d.rects.forEach((r, i) => {
      const q = [[ux(r.x0), uy(r.y0)], [ux(r.x1), uy(r.y0)],
                 [ux(r.x1), uy(r.y1)], [ux(r.x0), uy(r.y1)]];
      dw.setStrokes(`rect${i}`, q.map((p, k) => [p, q[(k + 1) % 4]]));
    });
    d.inflect.forEach((x, i) => {
      dw.setDisk(`inf${i}`, [ux(x), uy(DEP / 2)]);
      dw.setLabel(`linf${i}`, [ux(x), uy(DEP / 2) - 2.2]);
      dw.setText(`linf${i}`, `${x.toFixed(2)} m`);
    });

    // the tie: on the bottom where the beam sags, on the top where it hogs,
    // and pushed clear of the openings when the detour is asked for
    const tieY = (x, m) => {
      const base = m >= 0 ? 0 : DEP;
      if (!d.detour || m >= 0) return base;
      const near = [...d.holes.filter((h) => Math.abs(h.x - x) < h.r * 2.6)
        .map((h) => h.y - h.r),
      ...d.rects.filter((r) => x > r.x0 - 0.2 && x < r.x1 + 0.2).map((r) => r.y0)];
      return near.length ? Math.min(...near) - 0.12 : base;
    };
    const TP = [], TIE = [];
    d.thrust.forEach(([x, y]) => {
      const t = tieY(x, y);
      TIE.push([ux(x), uy(t)]);
      TP.push([ux(x), uy(t + (y >= 0 ? y : y))]);
    });
    dw.setStrokes('thrust', Array.from({ length: NSEG }, (_, i) => [TP[i], TP[i + 1]]));
    dw.setStrokes('tie', Array.from({ length: NSEG }, (_, i) => [TIE[i], TIE[i + 1]]));
    const mi = Math.round(NSEG / 2);
    dw.setLabel('lthr', V.add(TP[mi], [0, 2.0]));
    dw.setLabel('ltie', V.add(TIE[Math.round(NSEG * 0.08)], [0, -2.2]));
    dw.setLabel('lcost', [ux(L / 2), uy(0) - 5.4]);
    dw.setText('lcost', d.detour && d.drop > 0
      ? `routed under the openings: lever arm ${(DEP - d.drop).toFixed(2)} m instead of ${DEP.toFixed(2)} m, chord force +${((d.f1 / d.f0 - 1) * 100).toFixed(0)} %`
      : 'the natural flow, ignoring the openings');

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);
  const cas = panel.section('The beam');
  panel.slider(cas, s, 'sit', 'which beam', 0, 1, 1, refresh,
    (v) => ['left — twelve pipe holes', 'right — a window and a door'][Math.round(v)]);
  panel.toggle(cas, s, 'detour', 'route the tie round the openings', refresh);
  panel.toggle(cas, s, 'lbl', 'show labels', refresh);
  const giv = panel.section('Given (no value is printed)');
  panel.slider(giv, s, 'q', 'g_d (kN/m)', 5, 30, 1, refresh);

  refresh();
  return player;
}
