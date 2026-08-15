/**
 * EX 9 · Task 2 — Qualitative internal force flow
 * Structural Design II, FS 23 (sheet EX 9 "Plates", page 1).
 *
 * "Draw a qualitative internal force flow and the reaction forces into the
 *  axonometric drawing of the two following structures. Indicate tension
 *  forces with red, compression forces with blue and reaction forces with
 *  green."
 *
 * THE ENGLISH AND THE GERMAN DO NOT SAY THE SAME THING. The German is
 *   "…in die axonometrische Darstellung DES TRAGWERKS" — singular, one
 *   structure, where the English says "the two following structures"; and
 *   "Markieren Sie … ÄUSSERE KRÄFTE grün" = mark EXTERNAL forces green, where
 *   the English says "reaction forces with green".
 * The difference is not cosmetic: under the English reading only the four
 * column reactions are green and the applied line load is drawn in some other
 * colour; under the German reading the applied load is green too, because a
 * load is an external force. This project's palette has always used green for
 * both, so the German reading is the default here — and the panel switches, so
 * you can see exactly what the divergence costs. (It is the same slip listed
 * as ambiguity 9 in the decode of this sheet.)
 *
 * WHAT PAGE 1 ACTUALLY GIVES. Nothing measurable. No dimension, no scale, no
 * load magnitude, no support position is printed anywhere on task 2 — the
 * decode of the page records only the topology:
 *
 *   left structure   two parallel upright wall-plates at the upper level, each
 *                    with a line load on its top edge, running in one
 *                    isometric direction; they land on two upright wall-plates
 *                    at the lower level running in the PERPENDICULAR
 *                    direction; those stand on short columns.
 *   right structure  the same chain, but the upper walls do not land at their
 *                    ends — one lower wall is moved inwards, so the upper wall
 *                    overhangs it. This is the cantilever variant, and the
 *                    point of it is that the reaction of the upper wall is
 *                    then NOT half of its load.
 *
 * So every length in this view is invented, and stated as invented:
 *   upper walls  10.0 m long, 2.5 m deep, at y = 2.0 and 8.0 m, soffit z = 4.0
 *   lower walls  10.0 m long, 3.0 m deep, soffit z = 1.0, running in y,
 *                at x = 1.5 and 8.5 m (left structure) or 1.5 and 7.0 m (right)
 *   columns      1.0 m high, at y = 1.5 and 8.5 m under each lower wall
 * and the line load g has no magnitude on the sheet either, so it is a slider.
 * Every force below is therefore reported BOTH in kN and as a fraction of the
 * total load W, and the fractions are the part that the sheet actually fixes.
 *
 * THE FORCE FLOW DRAWN IN EACH WALL is the standard deep-beam picture: over a
 * span the wall makes an arch inside itself — a compression chord along the
 * top, two struts down to the supports and a tension tie along the soffit;
 * over a cantilever the same picture turns upside down — the tie runs along
 * the TOP and the strut leans down to the support. The chord forces are M / z
 * with z the full depth of the wall, and each strut closes the triangle on the
 * shear it carries, so the whole thing is an equilibrium solution: a "possible
 * internal force flow", which is exactly what the sheet asks for and no more.
 *
 * THE ONE NUMBER THE SHEET IS REALLY AFTER, at the drawn arrangement:
 *   left  structure  each upper wall gives 0.500 W_wall to each lower wall
 *   right structure  it gives 0.364 W_wall to the near one and 0.636 W_wall to
 *                    the far one — the overhang moves a third of the load
 * and in both cases the four columns still add back up to the whole load.
 *
 * The sheet prints no answers. Everything above is derived.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

const LA = 10.0;                     // upper wall length (x direction), m
const LB = 10.0;                     // lower wall length (y direction), m
const YA = [2.0, 8.0];               // where the two upper walls sit
const ZA0 = 4.0, DA = 2.5;           // upper wall soffit and depth
const ZB0 = 1.0, DB = 3.0;           // lower wall soffit and depth
const HC = 1.0, TC = 0.45;           // column height and thickness
const XB0 = 1.5;                     // the near lower wall never moves
const XB1 = [8.5, 7.0];              // the far one: symmetric · overhung
const NM = 8;                        // members drawn in one wall

const DEFAULTS = {
  sit: 0,          // 0 = the symmetric structure · 1 = the overhung one
  g: 10.0,         // kN/m — ASSUMED: the sheet prints no magnitude
  shift: 0.0,      // move the far lower wall, m
  csp: 1.5,        // how far the columns are set in under a lower wall, m
  deGreen: true,   // German reading: external forces (loads too) are green
  flow: true,
  lbl: true, _k: 99,
};

// -------------------------------------------------------------------- maths --

/**
 * One wall-plate as a deep beam: reactions, the moments, and a force flow that
 * is in equilibrium with them.
 *   u0,u1  the ends of the wall along its own axis
 *   d      its depth
 *   a,b    the two supports
 *   udl    a line load over the whole length
 *   loads  point loads [{u, P}]
 * Members come back in wall coordinates (u, v), v measured UP from the soffit.
 */
function wallFlow(u0, u1, d, a, b, udl, loads) {
  const L = u1 - u0;
  const Wu = udl * L;
  const Wp = loads.reduce((t, l) => t + l.P, 0);
  const Wt = Wu + Wp;
  const um = (u0 + u1) / 2;
  const Rb = (Wu * (um - a) + loads.reduce((t, l) => t + l.P * (l.u - a), 0)) / (b - a);
  const Ra = Wt - Rb;

  const M = (x) => Ra * Math.max(0, x - a) + Rb * Math.max(0, x - b)
    - (udl * (x - u0) ** 2) / 2
    - loads.reduce((t, l) => t + l.P * Math.max(0, x - l.u), 0);

  let Msag = 0, Mhog = 0;
  for (let i = 0; i <= 400; i++) {
    const m = M(u0 + (L * i) / 400);
    if (m > Msag) Msag = m;
    if (-m > Mhog) Mhog = -m;
  }

  // what each cantilever carries, and where its resultant sits
  const cant = (lo, hi) => {
    const Pu = udl * (hi - lo);
    const inner = loads.filter((l) => l.u > lo - 1e-9 && l.u < hi + 1e-9);
    const P = Pu + inner.reduce((t, l) => t + l.P, 0);
    if (P < 1e-9) return { P: 0, u: (lo + hi) / 2 };
    const mu = (Pu * (lo + hi) / 2 + inner.reduce((t, l) => t + l.P * l.u, 0)) / P;
    return { P, u: mu };
  };
  const cL = cant(u0, a), cR = cant(b, u1);
  const Va = Ra - cL.P, Vb = Rb - cR.P;          // shear entering the span

  const Hs = Msag / d;                            // chord force over the span
  const Nt1 = (cL.P * (a - cL.u)) / d;            // tie over the left cantilever
  const Nt2 = (cR.P * (cR.u - b)) / d;

  // the two struts meet the top chord where their own shear demands
  const q1 = Hs > 1e-9 && Va > 1e-9 ? Math.min(a + (d * Hs) / Va, (a + b) / 2) : (a + b) / 2;
  const q2 = Hs > 1e-9 && Vb > 1e-9 ? Math.max(b - (d * Hs) / Vb, (a + b) / 2) : (a + b) / 2;

  const on = Hs > 1e-9;
  const z = [u0, 0];
  const m = (nm, p, q, N, ten, live) => ({ nm, p: live ? p : z, q: live ? q : z,
                                           N: live ? N : 0, ten, live });
  const members = [
    m('soffit tie', [a, 0], [b, 0], Hs, true, on),
    m('strut', [a, 0], [q1, d], Math.hypot(Hs, Va), false, on),
    m('top chord', [q1, d], [q2, d], Hs, false, on),
    m('strut', [q2, d], [b, 0], Math.hypot(Hs, Vb), false, on),
    m('cantilever tie', [cL.u, d], [a, d], Nt1, true, Nt1 > 1e-9),
    m('cantilever strut', [cL.u, d], [a, 0], Math.hypot(Nt1, cL.P), false, Nt1 > 1e-9),
    m('cantilever tie', [b, d], [cR.u, d], Nt2, true, Nt2 > 1e-9),
    m('cantilever strut', [cR.u, d], [b, 0], Math.hypot(Nt2, cR.P), false, Nt2 > 1e-9),
  ];
  return { Ra, Rb, Wt, Msag, Mhog, Hs, Nt1, Nt2, Va, Vb, cL, cR, members, sag: on };
}

function compute(s) {
  const sit = Math.round(s.sit);
  const xb1 = Math.min(Math.max(XB1[sit] + s.shift, XB0 + 2.0), LA - 0.05);
  const c0 = Math.min(Math.max(s.csp, 0.4), LB / 2 - 0.4), c1 = LB - c0;

  // the two upper walls are identical; each spans onto the two lower walls
  const A = wallFlow(0, LA, DA, XB0, xb1, s.g, []);
  // each lower wall then carries one reaction from each upper wall
  const B0 = wallFlow(0, LB, DB, c0, c1, 0, YA.map((y) => ({ u: y, P: A.Ra })));
  const B1 = wallFlow(0, LB, DB, c0, c1, 0, YA.map((y) => ({ u: y, P: A.Rb })));

  const Wtot = 2 * A.Wt;
  const cols = 2 * (B0.Ra + B0.Rb) + 2 * (B1.Ra + B1.Rb) - (B0.Ra + B0.Rb + B1.Ra + B1.Rb);
  const colSum = B0.Ra + B0.Rb + B1.Ra + B1.Rb;
  const walls = [
    { id: 'A0', dir: 'x', at: YA[0], u0: 0, u1: LA, z0: ZA0, d: DA, f: A, z: -0.30 },
    { id: 'A1', dir: 'x', at: YA[1], u0: 0, u1: LA, z0: ZA0, d: DA, f: A, z: -0.40 },
    { id: 'B0', dir: 'y', at: XB0, u0: 0, u1: LB, z0: ZB0, d: DB, f: B0, z: -0.34 },
    { id: 'B1', dir: 'y', at: xb1, u0: 0, u1: LB, z0: ZB0, d: DB, f: B1, z: -0.44 },
  ];
  const colPts = [[XB0, c0], [XB0, c1], [xb1, c0], [xb1, c1]];
  const colR = [B0.Ra, B0.Rb, B1.Ra, B1.Rb];

  return { sit, g: s.g, xb1, c0, c1, A, B0, B1, walls, colPts, colR, colSum, cols,
           Wtot, Wwall: A.Wt,
           fa: A.Ra / A.Wt, fb: A.Rb / A.Wt,
           name: sit ? 'the overhung structure' : 'the symmetric structure' };
}

// --------------------------------------------------------------------- view --

export const meta = {
  title: 'EX 9.2 — a load looking for the ground',
  subtitle: 'Structural Design II · sheet EX 9 “Plates”, task 2',
  about: 'Two wall assemblies drawn in axonometric, and no numbers at all — the sheet prints no dimension, no scale and no load. So this is a picture task: where does the load go, and what is pulling and what is pushing while it gets there. Each wall is deep enough to make an arch inside itself, with a tie along its soffit; over a cantilever that picture turns upside down and the tie runs along the top. Move the far lower wall and watch the overhang take the load off one support and pile it onto the other — in the sheet’s own right-hand structure it is already a third of the load out of place. The sheet’s English and German disagree about what “green” means, and the panel lets you see both readings.',
  result: (d) => [
    `${d.name}: two upper walls of ${d.Wwall.toFixed(1)} kN each → ${d.Wtot.toFixed(1)} kN in total (g = ${d.g.toFixed(1)} kN/m assumed — the sheet gives none)`,
    `each upper wall hands ${d.A.Ra.toFixed(2)} kN (${(100 * d.fa).toFixed(1)} % of its load) to the near lower wall and ${d.A.Rb.toFixed(2)} kN (${(100 * d.fb).toFixed(1)} %) to the far one`,
    `columns: ${d.colR.map((r) => r.toFixed(2)).join(' + ')} = ${d.colSum.toFixed(2)} kN = everything that was put on ✓`,
    `inside a wall: ${d.A.sag ? `chord ${d.A.Hs.toFixed(2)} kN over the span` : 'the span has no sagging left — the overhang governs the whole wall'}${d.A.Nt2 > 1e-9 ? `, tie ${d.A.Nt2.toFixed(2)} kN along the top of the overhang` : ''}`],
  frame: [[-26, -22], [30, 16]],
};

const FLOW = 4;

const STEPS = [
  { t: 'The exercise', d: 'EX 9 task 2: two wall assemblies in axonometric. Draw a qualitative internal force flow and the reactions — tension red, compression blue, external green. There is not one number on the page, so this is entirely about the picture' },
  { t: 'The structure', d: 'two upright wall-plates at the top, running one way; two more underneath running the other way; four short columns under those. Every load has exactly one route to the ground and this drawing is that route. The panel switches between the sheet’s two structures',
    detail: (d) => [`${d.name} — upper walls ${LA.toFixed(1)} m long and ${DA.toFixed(1)} m deep, at y = ${YA[0]} and ${YA[1]} m`,
                    `lower walls ${LB.toFixed(1)} m long and ${DB.toFixed(1)} m deep, at x = ${XB0.toFixed(2)} and ${d.xb1.toFixed(2)} m`,
                    'the sheet dimensions none of this — every length here is invented and said so'] },
  { t: 'The load', d: 'a line load along the top edge of each upper wall. The sheet gives it no magnitude, so it is a slider and every force below is quoted as a fraction of the total as well as in kilonewtons',
    detail: (d) => [`g = ${d.g.toFixed(2)} kN/m over ${LA.toFixed(1)} m → ${d.Wwall.toFixed(2)} kN per upper wall`,
                    `two walls → W = ${d.Wtot.toFixed(2)} kN, and that is the number the ground has to receive`],
    take: 'a load with no magnitude is not a problem — every answer just comes out as a ratio' },
  { t: 'Where the upper wall puts it', d: 'the upper wall rests on the two lower walls. If it lands on them at its ends the load splits evenly; if one of them is pulled inwards the wall overhangs it, and the overhanging half levers load off the far support and onto the near one',
    detail: (d) => [`supports at x = ${XB0.toFixed(2)} and ${d.xb1.toFixed(2)} m, with the load running the full ${LA.toFixed(1)} m`,
                    `near ${d.A.Ra.toFixed(2)} kN = ${(100 * d.fa).toFixed(1)} % · far ${d.A.Rb.toFixed(2)} kN = ${(100 * d.fb).toFixed(1)} %`,
                    Math.abs(d.fa - 0.5) < 1e-6 ? 'exactly half each — this is the symmetric case'
                      : `not half: the overhang has moved ${(100 * Math.abs(d.fb - 0.5)).toFixed(1)} % of the load across`],
    take: 'this is the whole reason the sheet draws two structures instead of one' },
  { t: 'The flow inside a wall', d: 'a wall this deep does not bend, it makes an arch inside itself: a compression chord along the top, a strut down to each support, and a tension tie along the soffit holding the two feet apart. Over a cantilever the same picture turns over — the tie runs along the TOP and the strut leans down to the support',
    detail: (d) => [d.A.sag ? `over the span: chord and tie ${d.A.Hs.toFixed(2)} kN = M/z = ${d.A.Msag.toFixed(2)} / ${DA.toFixed(2)}`
                            : 'no sagging region is left — the overhang has taken over the whole wall',
                    d.A.Nt1 > 1e-9 ? `over the near overhang: top tie ${d.A.Nt1.toFixed(2)} kN` : '',
                    d.A.Nt2 > 1e-9 ? `over the far overhang: top tie ${d.A.Nt2.toFixed(2)} kN` : ''].filter(Boolean),
    take: 'red on the soffit between the supports, red on the top face over an overhang — that flip is the answer the task wants to see' },
  { t: 'And again, one level down', d: 'the upper walls’ reactions are the lower walls’ loads. Two point loads instead of a line load, so the arch inside the lower wall is a trapezoid: up from each support to the load above it, flat across, and the tie underneath',
    detail: (d) => [`near lower wall: two loads of ${d.A.Ra.toFixed(2)} kN → ${d.B0.Ra.toFixed(2)} and ${d.B0.Rb.toFixed(2)} kN into its columns`,
                    `far lower wall: two loads of ${d.A.Rb.toFixed(2)} kN → ${d.B1.Ra.toFixed(2)} and ${d.B1.Rb.toFixed(2)} kN`,
                    `chords ${d.B0.Hs.toFixed(2)} and ${d.B1.Hs.toFixed(2)} kN`] },
  { t: 'The reactions, and the check', d: 'the four green arrows at the bottom are what the task calls for. They have to add up to the load that was put on at the top — nothing in between can create or destroy any of it',
    detail: (d) => [`${d.colR.map((r) => r.toFixed(2)).join(' + ')} = ${d.colSum.toFixed(3)} kN`,
                    `and the load was ${d.Wtot.toFixed(3)} kN — difference ${(d.colSum - d.Wtot).toExponential(1)} kN ✓`],
    take: 'the only check available on a task with no numbers is that the ratios add to one' },
  { t: 'What “green” means', d: 'the English asks for reaction forces in green; the German asks for äussere Kräfte — EXTERNAL forces, which includes the load. The panel switches between the two readings',
    detail: (d, st) => [st.deGreen ? 'German: the line load is green too'
                                   : 'English: only the four reactions are green',
                        'the statics does not change — only what the colour claims'],
    take: 'when two versions of a sheet disagree, say which one you followed' },
];

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const ARR = dw.W.arrow, NARR = dw.W.narrow;

  // Cabinet axonometric: x to the right, z up, y receding up-and-left at 45°
  // with a half-scale depth. A true isometric was tried first and it drew the
  // upper walls as long thin parallelograms lying across the lower ones, which
  // is unreadable once four walls carry a force flow each. In this projection
  // a wall running in x is a plain rectangle, and the depth still reads.
  const SC = 1.55, KY = 0.55, OX = 11.0, OY = -13.2;
  const iso = (p) => [OX + (p[0] - KY * p[1]) * SC, OY + (p[2] + KY * p[1]) * SC];
  // a point in a wall's own (u, v) plane, lifted into 3D and projected
  const wp = (W, u, v) => iso(W.dir === 'x' ? [u, W.at, W.z0 + v] : [W.at, u, W.z0 + v]);

  const LOADCOL = { pending: PAL.black, final: (dd, st) => (st.deGreen ? PAL.green : PAL.grey) };
  const MEM = (w, i) => ({
    pending: PAL.black,
    final: (dd, st) => (st._k < FLOW ? PAL.grey
      : dd.walls[w].f.members[i].ten ? PAL.red : PAL.blue),
  });

  dw.label('t_axo', '', { cls: 'title', flash: false });
  dw.label('t_leg', '', { cls: 'point', flash: false });

  for (let w = 0; w < 4; w++) {
    const zz = [-0.28, -0.31, -0.36, -0.40][w];
    dw.poly(`wall${w}`, 4, { intro: 1, color: 0xf2f2f4, opacity: 0.94, z: zz, flash: false });
    dw.strokes(`edge${w}`, 4, { intro: 1, w: dw.W.str, color: PAL.black, z: zz + 0.01 });
    for (let i = 0; i < NM; i++) {
      dw.seg(`m${w}_${i}`, { intro: FLOW + (w > 1 ? 1 : 0), w: dw.W.bar, z: zz + 0.02,
        color: MEM(w, i), when: (st, dd) => !!dd && st.flow && dd.walls[w].f.members[i].live });
      dw.label(`lm${w}_${i}`, '', { cls: 'num', intro: FLOW + (w > 1 ? 1 : 0), color: MEM(w, i),
        when: (st, dd) => !!dd && st.flow && st.lbl && dd.walls[w].f.members[i].live
          && (w === 0 || w === 2) && [0, 2, 4, 6].includes(i) });
    }
  }

  for (let c = 0; c < 4; c++) {
    dw.poly(`col${c}`, 4, { intro: 1, color: PAL.black, opacity: 1, z: -0.26 });
    dw.arrow(`re${c}`, { intro: 6, color: PAL.green, ...NARR });
    dw.label(`lre${c}`, '', { cls: 'num', intro: 6, color: PAL.green, when: (st) => st.lbl });
  }

  // the line load on each upper wall, and the hand-over onto the lower walls
  for (let w = 0; w < 2; w++) {
    dw.seg(`qbar${w}`, { intro: 2, w: dw.W.thin, color: LOADCOL });
    dw.arrows(`qarr${w}`, 11, { intro: 2, w: dw.W.thin, color: LOADCOL,
      headLen: NARR.headLen * 0.75, headW: NARR.headW * 0.75 });
  }
  dw.label('lq', '', { cls: 'num', intro: 2, color: LOADCOL });
  for (let i = 0; i < 4; i++) {
    dw.arrow(`ho${i}`, { intro: FLOW + 1, color: PAL.green, ...NARR });
    dw.label(`lho${i}`, '', { cls: 'num', intro: FLOW + 1, color: PAL.green,
      when: (st) => st.lbl });
  }
  dw.label('lfr', '', { cls: 'point', intro: 3, color: PAL.green });
  dw.label('lsum', '', { cls: 'point', intro: 6, flash: false, color: PAL.black });

  dw.instant('t_axo', 't_leg');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);

    dw.setLabel("t_axo", [14.5, 11.4]);
    dw.setText('t_axo', `${d.sit ? 'b)' : 'a)'} ${d.name} — axonometric drawing (no scale on the sheet)`);
    dw.setLabel("t_leg", [14.5, 9.9]);
    dw.setText('t_leg', 'blue = compression · red = tension · green = '
      + (s.deGreen ? 'external forces, loads included (German)' : 'reaction forces only (English)'));

    // --- the four walls
    d.walls.forEach((W, w) => {
      const c = [wp(W, W.u0, 0), wp(W, W.u1, 0), wp(W, W.u1, W.d), wp(W, W.u0, W.d)];
      dw.setPoly(`wall${w}`, c);
      dw.setStrokes(`edge${w}`, c.map((p, i) => [p, c[(i + 1) % 4]]));
      W.f.members.forEach((m, i) => {
        const a = wp(W, m.p[0], m.p[1]), b = wp(W, m.q[0], m.q[1]);
        dw.setSeg(`m${w}_${i}`, a, b);
        const n = V.mul(V.unit(V.perp(V.sub(b, a))), m.ten ? -1.1 : 1.1);
        dw.setLabel(`lm${w}_${i}`, V.add(V.mid(a, b), n));
        dw.setText(`lm${w}_${i}`, m.N.toFixed(1));
      });
    });

    // --- the columns and their reactions
    d.colPts.forEach(([x, y], c) => {
      const q = [[x - TC / 2, y, 0], [x + TC / 2, y, 0], [x + TC / 2, y, HC], [x - TC / 2, y, HC]];
      dw.setPoly(`col${c}`, q.map(iso));
      const base = iso([x, y, 0]);
      dw.setArrow(`re${c}`, V.add(base, [0, -4.4]), V.add(base, [0, -0.8]));
      dw.setLabel(`lre${c}`, V.add(base, [c % 2 ? 3.2 : -3.2, -3.0]));
      dw.setText(`lre${c}`, d.colR[c].toFixed(2));
    });

    // --- the line load on the two upper walls
    for (let w = 0; w < 2; w++) {
      const W = d.walls[w];
      const top = (u, h) => iso([u, W.at, ZA0 + DA + h]);
      dw.setSeg(`qbar${w}`, top(W.u0, 1.35), top(W.u1, 1.35));
      dw.setArrows(`qarr${w}`, Array.from({ length: 11 }, (_, i) => {
        const u = W.u0 + ((W.u1 - W.u0) * i) / 10;
        return [top(u, 1.35), top(u, 0.12)];
      }));
    }
    dw.setLabel('lq', V.add(iso([LA, YA[0], ZA0 + DA + 1.35]), [3.0, 0.7]));
    dw.setText('lq', `g = ${d.g.toFixed(1)} kN/m`);

    // --- the hand-over: each upper wall's reactions arriving on a lower wall
    let k = 0;
    for (const W of d.walls.slice(0, 2)) {
      for (const [u, P] of [[XB0, d.A.Ra], [d.xb1, d.A.Rb]]) {
        const tip = iso([u, W.at, ZA0]);
        dw.setArrow(`ho${k}`, V.add(tip, [0, 2.4]), V.add(tip, [0, 0.35]));
        dw.setLabel(`lho${k}`, V.add(tip, [k % 2 ? 3.6 : -3.6, 2.5]));
        dw.setText(`lho${k}`, P.toFixed(2));
        k++;
      }
    }
    dw.setLabel("lfr", [14.5, -17.4]);
    dw.setText('lfr', `each upper wall: ${(100 * d.fa).toFixed(1)} % near · ${(100 * d.fb).toFixed(1)} % far`);

    dw.setLabel("lsum", [14.5, -19.2]);
    dw.setText('lsum', `Σ columns ${d.colSum.toFixed(2)} kN = W = ${d.Wtot.toFixed(2)} kN ✓`);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const w1 = panel.section('The structure');
  panel.slider(w1, s, 'sit', 'which of the two', 0, 1, 1, refresh,
    (v) => (v ? 'b) the overhung one' : 'a) the symmetric one'));
  panel.slider(w1, s, 'shift', 'move the far lower wall (m)', -1.5, 2.0, 0.1, refresh);
  panel.slider(w1, s, 'csp', 'column inset under a lower wall (m)', 0.5, 3.0, 0.1, refresh);
  const w2 = panel.section('Given (assumed — the sheet gives none)');
  panel.slider(w2, s, 'g', 'line load g (kN/m)', 2, 30, 1, refresh);
  const w3 = panel.section('Drawing');
  panel.toggle(w3, s, 'deGreen', 'green = external forces (German reading)', refresh);
  panel.toggle(w3, s, 'flow', 'show the internal force flow', refresh);
  panel.toggle(w3, s, 'lbl', 'show labels', refresh);

  refresh();
  return player;
}
