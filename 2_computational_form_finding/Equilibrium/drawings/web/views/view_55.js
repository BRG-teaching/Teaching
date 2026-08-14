/**
 * Drawing 55 — "Three-hinged Braced Arch" (historical)
 * Sondericker, Graphic Statics (Wiley 1903), Art. 53, Plate II, Figs 3/3A:
 * the windward rib of a symmetrical three-hinged braced arch under dead
 * load (400 lb/ft of outer chord) and wind on the right side (600 lb/ft,
 * normal to the roof surface). The diagonals are tension counters; the
 * LINE OF PRESSURE decides which one of each pair works.
 *
 * Reconstruction from the 1903 plate + book text (notes/view_55_analysis.md):
 * end hinge at the origin, feet at -1.5/+1.25; vertical end post 5+6+8.05;
 * outer chord STRAIGHT at slope 30° ("SLOPE 30"), divisions 8.1 + 5x5 to
 * gh, one last 5-ft division kinking onto the crown hinge; inner chord =
 * 30-ft-radius arc ("30' R.") from a vertical tangent, sweeping 60°, then
 * straight at 30° (parallel chords) to the crown; struts perpendicular to
 * the outer chord except B3's member 7-4, whose foot bisects the inner arc.
 * Statics recomputed exactly (tools/regress/v55_regress.py): three-hinge
 * reactions, tension-only counter selection, full Maxwell-Cremona (closure
 * ~1e-11 lbs). Book check values: H = 14 860, V = 9 900, c-8 = 35 250 C —
 * ours differ by 2-5% (the hand-drawn 1903 plate vs this exact geometry);
 * the plate's full/dashed counters match ours in every panel the book
 * discusses (8-9 in panel c, 16-17 in panel g).
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'Drawing 55 — Three-hinged Braced Arch, 1903',
  subtitle: 'Sondericker’s windward rib: line of pressure, counters, Maxwell diagram',
  about: 'A page of history: Plate II of Jerome Sondericker’s "Graphic Statics" (MIT, 1903). Half of a symmetrical three-hinged arch carries dead load on its outer chord and wind on the right side. The reactions of the hinges locate the pole P; the funicular polygon of the joint loads drawn through the hinges is the LINE OF PRESSURE, and wherever it leaves the rib, the tension-only diagonals must work — the method of shears and moments picks the active counter of every panel. The Maxwell diagram (the book’s Fig. 3A) then delivers every member force, checked on members 4-5 and 12-14.',
  frame: [[-37.5, -4.0], [48.0, 45.5]],
};

const RESOLVE = 19;

// ---------------------------------------------------------------------------
// constants of the plate
// ---------------------------------------------------------------------------
const D30 = Math.PI / 6;
const U30 = [-Math.cos(D30), Math.sin(D30)];          // up the 30° slope
const I_FOOT = [-1.5, 0];
const O_POST = [[1.25, 0], [1.25, 5], [1.25, 11], [1.25, 19.05]];  // foot,O1,O2,B3
const CIN = [-31.5, 0];                                // inner arc centre
const RIN = 30.0;                                      // "30' R."
const PHI_END = Math.PI / 3;                           // arc sweeps 60°
const ARC_END = [CIN[0] + RIN * Math.cos(PHI_END), RIN * Math.sin(PHI_END)];
const TRIB = [4.05, 6.55, 5, 5, 5, 5, 5, 2.5];         // tributary ft per joint
const OUTER_DIVS = [8.05, 5, 5, 5, 5, 5];              // B3..gh along the slope
const NWIND = (() => {                                 // roof normal (pushes in)
  let n = [Math.sin(5 * Math.PI / 6), -Math.cos(5 * Math.PI / 6)];
  if (n[1] > 0) n = [-n[0], -n[1]];
  return n;
})();

const DEFAULTS = {
  fd: 1.0,          // dead load factor (1 = 400 lb/ft)
  fw: 1.0,          // wind factor (1 = 600 lb/ft, right side)
  sFD: 2100,        // force diagram scale, lbs per drawing unit
  sIF: 0.00003,     // internal-force pipes
  o1: true,
  press: true,      // the line of pressure
  chk: true,        // the check funicular (i)(k)(a)
  plate: false,     // the 1903 plate behind the drawing
  lbl: true,
  node: 0,
  _k: 99,
};

const STEPS = [
  { t: 'How to draw this scheme', d: 'a drawing from 1903, brought back to life — step through with the slider, press play, or use ←/→' },
  { t: 'Half of a three-hinged arch', d: 'left: the rib spans from the end hinge to the middle hinge at the crown — a vertical end post (5 + 6 + 8.05 ft), an outer chord straight at SLOPE 30°, and an inner chord: a 30-ft-radius arc rising into a straight parallel to the outer chord' },
  { t: 'The web: posts and counters', d: 'left: struts perpendicular to the outer chord (the member 7-4 instead bisects the inner arc); every panel gets TWO thin diagonals — tension counters, only one of each pair can work; the spaces are numbered 1–18 in Bow’s notation, as on the plate' },
  { t: 'Dead load and wind', d: 'left: dead load on the outer chord and wind normal to the right slope combine into one inclined load per joint — right: laid tip-to-tail they bend the load line A…I (the dead leg meets the wind leg)',
    detail: (d, st) => [`joint loads ab…h: ${d.loadMags.map((v) => Math.round(v)).join(' · ')} lbs`,
                        `Σ dead = ${Math.round(15240 * st.fd)} · Σ wind = ${Math.round(22860 * st.fw)} lbs`] },
  { t: 'The middle hinge: H and V', d: 'the three-hinge condition (moments about each end hinge, the leeward rib carries dead load only) fixes the crown force — right: H and V plotted from I locate the pole P',
    detail: (d) => [`H = ${Math.round(Math.abs(d.F[0]))} · V = ${Math.round(Math.abs(d.F[1]))} lbs — the 1903 book: 14 860 · 9 900`],
    take: 'the hand-drawn plate and this exact reconstruction agree within a few percent — 1903 drafting was good' },
  { t: 'Checking the pole', d: 'left: a funicular for the two RESULTANTS (dead, wind): string (i) through the crown ∥ PI, string (k) ∥ PK between the resultants — the closing string (a) runs ∥ PA exactly through the end hinge: P is right', take: 'the book: "when it is found that the closing string (k) is parallel to PK, thus checking the location of the pole"' },
  { t: 'The reactions of the hinges', d: 'right: P→I is the reaction at the middle hinge, A→P at the end hinge — left: the same two forces push at the hinges; with the loads they close one polygon P I H G F E D C B A P',
    detail: (d) => [`middle hinge: ${Math.round(Math.hypot(d.F[0], d.F[1]))} lbs · end hinge: ${Math.round(Math.hypot(d.R[0], d.R[1]))} lbs`] },
  { t: 'The LINE OF PRESSURE', d: 'left: the funicular polygon of the joint loads, drawn through the hinges (heavy): every string is the line of action of the resultant force on the rib to either side — right: its magnitude is the corresponding ray from P',
    take: 'the drawing’s signature move: the pressure line makes the flow of force through the arch VISIBLE' },
  { t: 'Which counters work?', d: 'where the pressure line passes OUTSIDE the rib, the panel shear pulls one way; where it re-enters, the other — method of shears (panel g) and moments (panel c): the working diagonal of each pair resolves, its partner goes slack (pale)',
    take: 'the book picks 8-9 in panel c and 16-17 in panel g — exactly the diagonals this reconstruction finds in tension' },
  { t: 'The stress in c-8 by moments', d: 'left: moment axis at the joint 0 (the intersection of diagonal 8-9 with the inner chord): the resultant PC on its string, times its arm, divided by the arm of c-8 — the book computes 35 250 lbs compression',
    detail: (d) => [`c-8 here: ${Math.round(Math.abs(d.force2))} lbs compression · the book: 35 250 lbs`] },
  { t: 'The crown joint closes first', d: 'left: at the middle hinge only TWO members meet the crown load and the reaction PI — right: through H parallel to the outer chord h-18, through P… the polygon closes at the pole 18: both force segments drawn PARALLEL to their members, as the members flash',
    detail: (d) => [`h-18 = ${Math.round(Math.abs(d.force['gh|C']))} C · 18-p = ${Math.round(Math.abs(d.force['I9|C']))} lbs`] },
  { t: 'Panel g — joints gh and 18', d: 'left: the joint under load gh and its inner mate flash — right: their polygons close: chord g-16, the counter 16-17 and the inner chord 17-p drawn PARALLEL to their members; poles 16 and 17 COINCIDE: the strut gh-18 carries NOTHING',
    detail: (d) => [`g-16 = ${Math.round(Math.abs(d.force['fg|gh']))} C · counter ${Math.round(Math.abs(d.force['I8|gh'] ?? 0))} T · strut 16-18 = 0`] },
  { t: 'Panel f — joints fg and I8', d: 'left: the next pair flashes — right: chord f-14, the strut 15-17, the counter 14-15 and the inner chord close on the poles 14 and 15 — every segment parallel to its member on the left' },
  { t: 'Panel e — joints ef and I7', d: 'left: pair by pair down the rib — right: poles 12 and 13; the inner chord pieces here carry the LARGEST tension of the whole arch',
    detail: (d) => [`inner 15-p = ${Math.round(d.force['I7|I8'] ?? 0)} T · 13-p = ${Math.round(d.force['I6|I7'] ?? 0)} T lbs`] },
  { t: 'Panel d — joints de and I6', d: 'left: the pressure line crosses the rib in these panels — the counters change family exactly here — right: poles 10 and 11 land far left' },
  { t: 'Panel c — joints cd and 0', d: 'left: the joint 0 of the book’s moment method and its outer mate — right: poles 8 and 9; the chord c-8 closes at the force the book computed by moments',
    detail: (d) => [`c-8 = ${Math.round(Math.abs(d.force2))} C (book: 35 250) · 8-9 = ${Math.round(Math.abs(d.force['bc|I5'] ?? d.force['I4|cd'] ?? 0))} T`] },
  { t: 'Panel b — joints bc and I4', d: 'left: the last inclined panel — right: poles 6 and 7; the outer chord b-6 approaches its maximum' },
  { t: 'The tall panel — B3 and I3', d: 'left: the joint ab under the biggest tributary and the 7-4 strut’s foot — right: poles 4 and 5; the counter of the tall panel and the member 7-4 close in one move' },
  { t: 'Down the end post', d: 'left: the post joints and both feet flash — right: poles 1, 2, 3 close against the space a, and at the SUPPORT the last polygon shuts on the end reaction AP: the Cremona check',
    detail: (d) => [`closure of the diagram: ${d.closure.toExponential(1)} lbs`] },
  { t: 'Compression and tension', d: 'blue = compression (outer chord, post, struts), pink = tension (inner chord above the crossing, the working counters); pale = slack counters and the zero strut; pipes ∝ force — drag the sliders: wind off, and the arch calms; click any joint for its equilibrium',
    detail: (d) => [`extremes: outer ${Math.round(d.extremes[0])} C · inner ${Math.round(d.extremes[1])} T · checks 4-5 & 12-14 close to ${d.closure.toExponential(1)} lbs`],
    take: 'a 1903 plate, recomputed live: the drawing WAS the calculation — and it still is' },
];

// ---------------------------------------------------------------------------
// small numerics
// ---------------------------------------------------------------------------
function bisect(f, a, b, n = 80) {
  let fa = f(a);
  for (let i = 0; i < n; i++) {
    const m = (a + b) / 2, fm = f(m);
    if (fa * fm <= 0) b = m; else { a = m; fa = fm; }
  }
  return (a + b) / 2;
}

/** least squares solve of A x = b via normal equations + Gauss elimination */
function lstsq(A, b) {
  const n = A[0].length, m = A.length;
  const N = Array.from({ length: n }, () => new Float64Array(n + 1));
  for (let i = 0; i < m; i++) {
    const Ai = A[i];
    for (let j = 0; j < n; j++) {
      if (Ai[j] === 0) continue;
      for (let k = 0; k < n; k++) N[j][k] += Ai[j] * Ai[k];
      N[j][n] += Ai[j] * b[i];
    }
  }
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(N[r][c]) > Math.abs(N[p][c])) p = r;
    [N[c], N[p]] = [N[p], N[c]];
    const pv = N[c][c] || 1e-30;
    for (let r = 0; r < n; r++) {
      if (r === c) continue;
      const f = N[r][c] / pv;
      if (!f) continue;
      for (let k = c; k <= n; k++) N[r][k] -= f * N[c][k];
    }
  }
  return Array.from({ length: n }, (_, c) => N[c][n] / (N[c][c] || 1e-30));
}

// ---------------------------------------------------------------------------
// the construction
// ---------------------------------------------------------------------------
const GEO = (() => {
  // outer chord polygon
  const OUT = [O_POST[3].slice()];
  for (const L of OUTER_DIVS) OUT.push(V.add(OUT[OUT.length - 1], V.mul(U30, L)));
  const GH = OUT[OUT.length - 1];
  const nrm = [-U30[1], U30[0]];   // normal of the inner straight
  const tLast = bisect((t) => {
    const p = V.add(GH, [5 * Math.cos(t), 5 * Math.sin(t)]);
    return V.dot(V.sub(p, ARC_END), nrm);
  }, 150.001 * Math.PI / 180, 215 * Math.PI / 180);
  OUT.push(V.add(GH, [5 * Math.cos(tLast), 5 * Math.sin(tLast)]));
  const CROWN = OUT[OUT.length - 1];

  const innerHit = (p, dir) => {
    const f = V.sub(p, CIN), b = V.dot(f, dir), c = V.dot(f, f) - RIN * RIN;
    const disc = b * b - c;
    const cands = [];
    if (disc >= 0) {
      for (const t of [-b - Math.sqrt(disc), -b + Math.sqrt(disc)]) {
        if (t > 0.1) {
          const q = V.add(p, V.mul(dir, t));
          const phi = Math.atan2(q[1], q[0] - CIN[0]);
          if (phi >= -0.02 && phi <= PHI_END + 1e-9) cands.push([t, q]);
        }
      }
    }
    const den = V.dot(dir, nrm);
    if (Math.abs(den) > 1e-12) {
      const t = V.dot(V.sub(ARC_END, p), nrm) / den;
      if (t > 0.1) {
        const q = V.add(p, V.mul(dir, t));
        const s2 = V.dot(V.sub(q, ARC_END), U30);
        if (s2 >= -1e-6 && s2 <= V.dist(CROWN, ARC_END) + 1e-6) cands.push([t, q]);
      }
    }
    cands.sort((x, y) => x[0] - y[0]);
    return cands[0][1];
  };
  let dperp = [Math.sin(5 * Math.PI / 6), -Math.cos(5 * Math.PI / 6)];
  if (V.dot(dperp, V.sub(CIN, O_POST[3])) < 0) dperp = [-dperp[0], -dperp[1]];
  const I1 = innerHit(O_POST[1], [-1, 0]);
  const I2 = innerHit(O_POST[2], [-1, 0]);
  const I4to9 = [];
  for (let k = 1; k <= 6; k++) I4to9.push(innerHit(OUT[k], dperp));
  const phi = (q) => Math.atan2(q[1], q[0] - CIN[0]);
  const pm = (phi(I2) + phi(I4to9[0])) / 2;
  const I3 = [CIN[0] + RIN * Math.cos(pm), RIN * Math.sin(pm)];
  const INNER = [I1, I2, I3, ...I4to9];

  const J = { S: [0, 0], C: CROWN, O1: O_POST[1], O2: O_POST[2], B3: O_POST[3] };
  INNER.forEach((q, i) => { J['I' + (i + 1)] = q; });
  ['bc', 'cd', 'de', 'ef', 'fg', 'gh'].forEach((n, i) => { J[n] = OUT[i + 1]; });
  return { OUT, CROWN, J, tLast };
})();

const J = GEO.J;
const CHORDS_IN = [['S','I1'],['I1','I2'],['I2','I3'],['I3','I4'],['I4','I5'],
                   ['I5','I6'],['I6','I7'],['I7','I8'],['I8','I9'],['I9','C']];
const POST = [['S','O1'],['O1','O2'],['O2','B3']];
const CHORDS_OUT = [['B3','bc'],['bc','cd'],['cd','de'],['de','ef'],['ef','fg'],['fg','gh'],['gh','C']];
const STRUTS = [['O1','I1'],['O2','I2'],['B3','I3'],['bc','I4'],['cd','I5'],
                ['de','I6'],['ef','I7'],['fg','I8'],['gh','I9']];
const QUADS = [['I1','O1','O2','I2'],['I2','O2','B3','I3'],['I3','B3','bc','I4'],
               ['I4','bc','cd','I5'],['I5','cd','de','I6'],['I6','de','ef','I7'],
               ['I7','ef','fg','I8'],['I8','fg','gh','I9']];
const LOAD_JOINTS = ['B3','bc','cd','de','ef','fg','gh','C'];
const EXT_PAIRS = [['i','h'],['h','g'],['g','f'],['f','e'],['e','d'],['d','c'],['c','b'],['b','a']];
const key = (m) => m[0] + '|' + m[1];

function compute(s) {
  // loads
  const loads = LOAD_JOINTS.map((_, k) => {
    const dead = [0, -400 * s.fd * TRIB[k]];
    const wind = V.mul(NWIND, 600 * s.fw * TRIB[k]);
    return V.add(dead, wind);
  });
  const loadMags = loads.map((L) => Math.hypot(L[0], L[1]));

  // three-hinge condition: crown force F on this rib (leeward = dead only)
  const cross = (a, b) => a[0] * b[1] - a[1] * b[0];
  const OUTPTS = LOAD_JOINTS.map((n) => J[n]);
  const Mw = OUTPTS.reduce((m, p, k) => m + cross(p, loads[k]), 0);
  const CR = GEO.CROWN, E2 = [2 * CR[0], 0];
  const Ml = OUTPTS.reduce((m, p, k) => {
    const pm = [2 * CR[0] - p[0], p[1]];
    return m + cross(V.sub(pm, E2), [0, -400 * s.fd * TRIB[k]]);
  }, 0);
  // [-CR.y, CR.x][Fx,Fy] = -Mw ; [(CR-E2).y, -(CR-E2).x][F] = -Ml
  const a11 = -CR[1], a12 = CR[0], a21 = CR[1] - E2[1], a22 = -(CR[0] - E2[0]);
  const det = a11 * a22 - a12 * a21;
  const F = [(-Mw * a22 + Ml * a12) / det, (-Ml * a11 + Mw * a21) / det];
  const R = [-(loads.reduce((t, L) => t + L[0], 0) + F[0]),
             -(loads.reduce((t, L) => t + L[1], 0) + F[1])];

  // member forces: iterate tension-only counter selection
  let choice = [1, 1, 1, 1, 1, 1, 0, 0];      // 0 = rising, 1 = dropping (defaults)
  let members, x;
  const freeJoints = Object.keys(J).filter((j) => j !== 'S');
  for (let it = 0; it < 20; it++) {
    members = [...CHORDS_IN, ...POST, ...CHORDS_OUT, ...STRUTS,
               ...QUADS.map((q, k) => (choice[k] === 0 ? [q[0], q[2]] : [q[1], q[3]]))];
    const idx = new Map(members.map((m, i) => [key(m), i]));
    const A = [], b = [];
    for (const j of freeJoints) {
      const rows = [new Float64Array(members.length), new Float64Array(members.length)];
      for (const m of members) {
        if (m[0] !== j && m[1] !== j) continue;
        const o = m[0] === j ? m[1] : m[0];
        const u = V.unit(V.sub(J[o], J[j]));
        rows[0][idx.get(key(m))] = u[0];
        rows[1][idx.get(key(m))] = u[1];
      }
      let P = [0, 0];
      const li = LOAD_JOINTS.indexOf(j);
      if (li >= 0) P = loads[li];
      if (j === 'C') P = V.add(P, F);
      A.push(rows[0], rows[1]);
      b.push(-P[0], -P[1]);
    }
    x = lstsq(A, b);
    let flipped = false;
    for (let k = 0; k < 8; k++) {
      const f = x[members.length - 8 + k];
      if (f < -1) { choice[k] = 1 - choice[k]; flipped = true; }
    }
    if (!flipped) break;
  }
  const force = {};
  members.forEach((m, i) => { force[key(m)] = x[i]; });
  // Bow-notation faces (space -> triangle) for the current actives
  const tri = { 1: ['S','O1','I1'], 18: ['I9','gh','C'] };
  QUADS.forEach((q, k) => {
    const [Ilo, Olo, Ohi, Ihi] = q;
    if (choice[k] === 0) { tri[2*k+2] = [Ilo, Olo, Ohi]; tri[2*k+3] = [Ilo, Ohi, Ihi]; }
    else { tri[2*k+2] = [Olo, Ohi, Ihi]; tri[2*k+3] = [Ilo, Olo, Ihi]; }
  });
  const extOf = {};
  CHORDS_OUT.forEach((m, i) => { extOf[key(m)] = 'bcdefgh'[i]; });
  POST.forEach((m) => { extOf[key(m)] = 'a'; });
  CHORDS_IN.forEach((m) => { extOf[key(m)] = 'p'; });
  const adj = {};
  for (const m of members) {
    const sps = Object.entries(tri).filter(([, t]) => t.includes(m[0]) && t.includes(m[1]))
      .map(([sp]) => +sp);
    if (extOf[key(m)] !== undefined) sps.push(extOf[key(m)]);
    adj[key(m)] = sps;
  }

  // Maxwell poles: joint-by-joint walk (sigma = -1 matches the 1903 plate)
  const poles = { i: [0, 0] };
  const jwalk = {};
  let closure = 0;
  const pending = new Set(Object.keys(J));
  for (let round = 0; round < 40 && pending.size; round++) {
    let progressed = false;
    for (const j of [...pending]) {
      const els = [];
      for (const m of members) {
        if (m[0] !== j && m[1] !== j) continue;
        const o = m[0] === j ? m[1] : m[0];
        const u = V.unit(V.sub(J[o], J[j]));
        els.push({ vec: V.mul(u, force[key(m)]), dir: u, sp: adj[key(m)] });
      }
      const li = LOAD_JOINTS.indexOf(j);
      if (li >= 0) els.push({ vec: loads[li], dir: V.unit(V.mul(loads[li], -1)), sp: EXT_PAIRS[7 - li] });
      if (j === 'C') els.push({ vec: F, dir: V.unit(V.mul(F, -1)), sp: ['p', 'i'] });
      if (j === 'S') els.push({ vec: R, dir: V.unit(V.mul(R, -1)), sp: ['a', 'p'] });
      els.sort((e1, e2) => Math.atan2(e1.dir[1], e1.dir[0]) - Math.atan2(e2.dir[1], e2.dir[0]));
      const n = els.length;
      const between = [];
      let ok = true;
      for (let k = 0; k < n; k++) {
        const shared = els[k].sp.filter((sp) => els[(k + 1) % n].sp.includes(sp));
        if (shared.length !== 1) { ok = false; break; }
        between.push(shared[0]);
      }
      if (!ok) continue;
      jwalk[j] = between;
      const k0 = between.findIndex((sp) => poles[sp] !== undefined);
      if (k0 < 0) continue;
      let run = poles[between[k0]].slice();
      for (let step = 1; step <= n; step++) {
        const k = (k0 + step) % n;
        run = V.add(run, els[k].vec);            // walk (+), negate below
        const sp = between[k];
        if (poles[sp] !== undefined) closure = Math.max(closure, V.dist(poles[sp], run));
        else poles[sp] = run.slice();
      }
      pending.delete(j);
      progressed = true;
    }
    if (!progressed) break;
  }

  for (const sp of Object.keys(poles)) poles[sp] = V.mul(poles[sp], -1);  // plate orientation

  // the line of pressure: funicular of the joint loads through the hinges
  const press = [GEO.CROWN.slice()];
  let dir = V.sub(poles.h, poles.p);              // string h leaves the crown
  let pt = GEO.CROWN.slice();
  for (let k = 6; k >= 0; k--) {                  // cross loads gh..B3
    const sp = EXT_PAIRS[7 - k][1];               // space after crossing load k
    const nd = V.sub(poles[sp], poles.p);
    // intersect current string with load k's action line
    const q = V.intersect(pt, dir, J[LOAD_JOINTS[k]], loads[k]);
    if (q) { press.push(q); pt = q; }
    dir = nd;
  }
  press.push([0, 0]);                             // string a lands on the end hinge

  // the check funicular for the two resultants (dead, wind)
  const Wd = 15240 * s.fd, Ww = 22860 * s.fw;
  const xbar = OUTPTS.reduce((t, p, k) => t + p[0] * 400 * s.fd * TRIB[k], 0) / Math.max(Wd, 1e-9);
  const Mww = OUTPTS.reduce((t, p, k) => t + cross(p, V.mul(NWIND, 600 * s.fw * TRIB[k])), 0);
  const Wv = V.mul(NWIND, Ww);
  // wind resultant line: cross(r, Wv) = Mww -> point r0 with r0 = alpha*perp
  const perpW = V.unit([-Wv[1], Wv[0]]);
  const r0 = V.mul(perpW, Mww / Math.max(Math.hypot(Wv[0], Wv[1]), 1e-9));
  const K = [poles.i[0], poles.i[1] - Wd];        // between the two resultant legs
  const chk = [GEO.CROWN.slice()];
  let q1 = V.intersect(GEO.CROWN, V.sub(poles.i, poles.p), [xbar, 20], [0, 1]);
  if (q1) chk.push(q1);
  let q2 = q1 ? V.intersect(q1, V.sub(K, poles.p), r0, Wv) : null;
  if (q2) chk.push(q2);
  chk.push([0, 0]);

  const extremes = [
    Math.max(...CHORDS_OUT.map((m) => -force[key(m)] || 0), ...POST.map((m) => -force[key(m)] || 0)),
    Math.max(...CHORDS_IN.map((m) => force[key(m)] || 0)),
  ];
  return { loads, loadMags, F, R, members, force, choice, adj, poles, jwalk, closure,
           press, chk, K, xbar, r0, Wv, extremes,
           force2: force['bc|cd'] };
}

// ---------------------------------------------------------------------------
export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const W_BAR = 0.22, W_THIN = 0.07;
  const colOf = (mk) => (dd) => {
    const f = dd.force[mk] ?? 0;
    if (Math.abs(f) < 1) return PAL.zero;
    return f < 0 ? PAL.blue : PAL.red;
  };

  dw.label('form_title', 'Form Diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Force Diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { cls: 'point', flash: false });

  // the 1903 plate behind the drawing (toggle)
  dw.image('plate', 'assets/view_55_plate.jpg', {
    corners: [[-46.5, -49.1], [16.0, -49.1], [-46.5, 56.6]], opacity: 0.18,
    when: (st) => st.plate,
  });

  // ---- form: chords, post, web -------------------------------------------
  const allAxial = [...CHORDS_IN, ...POST, ...CHORDS_OUT, ...STRUTS];
  for (const m of allAxial) {
    dw.seg('m_' + key(m), {
      intro: STRUTS.includes(m) ? 2 : 1, w: STRUTS.includes(m) ? 0.16 : W_BAR,
      color: { pending: PAL.black, final: colOf(key(m)) },
    });
  }
  for (let k = 0; k < 8; k++) {                    // both counters of each quad
    dw.seg('dgA' + k, { intro: 2, w: W_THIN, color: { pending: PAL.grey, final: (dd) =>
      (dd.choice[k] === 0 ? ((dd.force[key([QUADS[k][0], QUADS[k][2]])] ?? 0) > 1 ? PAL.red : PAL.zero) : PAL.zero) } });
    dw.seg('dgB' + k, { intro: 2, w: W_THIN, color: { pending: PAL.grey, final: (dd) =>
      (dd.choice[k] === 1 ? ((dd.force[key([QUADS[k][1], QUADS[k][3]])] ?? 0) > 1 ? PAL.red : PAL.zero) : PAL.zero) } });
  }
  // joints
  for (const j of Object.keys(J)) dw.disk('pt_' + j, { intro: 1, r: 0.38 });
  dw.disk('hinge_S', { intro: 1, r: 0.62, face: PAL.white });
  dw.disk('hinge_C', { intro: 1, r: 0.62, face: PAL.white });
  // Bow space numbers (the plate's 1..18) + letters
  for (let sp = 1; sp <= 18; sp++) {
    dw.label('sp' + sp, String(sp), { cls: 'point', intro: 2, flash: false, when: (st) => st.lbl });
  }
  const extLbl = { a: [7.5, 8], b: [0.5, 26], c: [-4.5, 29.5], d: [-9.5, 32.5], e: [-14.5, 35],
                   f: [-19.5, 37.3], g: [-24.5, 39.4], h: [-29.5, 40.8], i: [-35.8, 36.6], p: [-13, 9] };
  for (const [sp, at] of Object.entries(extLbl)) {
    dw.label('spx_' + sp, sp, { cls: 'point', intro: 2, flash: false, when: (st) => st.lbl });
    dw.setLabel('spx_' + sp, at);
  }
  dw.label('lbl0', '0', { cls: 'point', intro: 2, flash: false, when: (st) => st.lbl });

  // loads + action lines
  for (let k = 0; k < 8; k++) {
    dw.arrow('ld' + k, { intro: 3, color: PAL.green, w: 0.14, headLen: 0.85, headW: 0.36 });
    dw.dashLine('lda' + k, { intro: 3, color: PAL.grey, dash: 0.5 });
    dw.label('ldl' + k, ['ab','bc','cd','de','ef','fg','gh','h'][k],
             { cls: 'point', intro: 3, color: PAL.green, when: (st) => st.lbl });
  }
  // hinge reactions
  dw.arrow('reC', { intro: 6, color: PAL.green, w: 0.18, headLen: 1.0, headW: 0.42 });
  dw.arrow('reS', { intro: 6, color: PAL.green, w: 0.18, headLen: 1.0, headW: 0.42 });
  // line of pressure (heavy, like the plate)
  dw.strokes('press', 9, { intro: 7, w: 0.3, color: 0x232327, flash: true, when: (st) => st.press });
  // check funicular (i)(k)(a) + resultant lines
  dw.dashLine('chk', { intro: 5, color: PAL.grey, dash: 0.7, when: (st) => st.chk });
  dw.dashLine('chkD', { intro: 5, color: PAL.grey, dash: 0.35, when: (st) => st.chk });
  dw.dashLine('chkW', { intro: 5, color: PAL.grey, dash: 0.35, when: (st) => st.chk });
  dw.label('chkI', '(i)', { cls: 'point', intro: 5, flash: false, when: (st) => st.chk && st.lbl });
  dw.label('chkK', '(k)', { cls: 'point', intro: 5, flash: false, when: (st) => st.chk && st.lbl });
  dw.label('chkA', '(a)', { cls: 'point', intro: 5, flash: false, when: (st) => st.chk && st.lbl });

  // ---- force diagram -------------------------------------------------------
  const FD_I = [45.0, 23.5];
  const fd = (p) => [FD_I[0] + p[0] / s.sFD, FD_I[1] + p[1] / s.sFD];
  for (let k = 0; k < 8; k++) {                    // load line I -> A
    dw.arrow('fl' + k, { intro: 3, color: PAL.green, w: 0.12, headLen: 0.7, headW: 0.3 });
  }
  for (const sp of ['A','B','C','D','E','F','G','H','I','K']) {
    dw.label('fp' + sp, sp, { cls: 'num', intro: sp === 'K' ? 4 : 3, flash: false, when: (st) => st.lbl });
  }
  dw.dashLine('dimH', { intro: 4, color: PAL.grey, dash: 0.4 });
  dw.dashLine('dimV', { intro: 4, color: PAL.grey, dash: 0.4 });
  dw.label('dimHl', '', { cls: 'point', intro: 4, flash: false });
  dw.label('dimVl', '', { cls: 'point', intro: 4, flash: false });
  dw.disk('fpP', { intro: 4, r: 0.32, face: PAL.red });
  dw.label('fpPl', 'P', { cls: 'num', intro: 4, flash: false });
  dw.arrow('fre1', { intro: 6, color: PAL.green, w: 0.14, headLen: 0.8, headW: 0.34 }); // P->I
  dw.arrow('fre2', { intro: 6, color: PAL.green, w: 0.14, headLen: 0.8, headW: 0.34 }); // A->P
  for (let k = 0; k < 8; k++) {                    // rays P->B..P->I (pressure strings)
    dw.seg('ray' + k, { intro: 7, w: 0.045, color: PAL.grey, when: (st) => st.press });
  }
  // member force segments, grouped by build steps 10..14
  const JSTEP = { C: 10, gh: 11, I9: 11, fg: 12, I8: 12, ef: 13, I7: 13,
                  de: 14, I6: 14, cd: 15, I5: 15, bc: 16, I4: 16,
                  B3: 17, I3: 17, O2: 18, I2: 18, O1: 18, I1: 18, S: 18 };
  const MEM_STEP = (m) => Math.min(JSTEP[m[0]] ?? 18, JSTEP[m[1]] ?? 18);
  for (const m of allAxial) {
    dw.seg('f_' + key(m), { intro: MEM_STEP(m), w: 0.1,
      color: { pending: PAL.black, final: colOf(key(m)) } });
  }
  for (let k = 0; k < 8; k++) {
    dw.seg('fdgA' + k, { intro: 18 - k, w: 0.07,
      color: { pending: PAL.grey, final: (dd) => (dd.choice[k] === 0 ? PAL.red : PAL.zero) } });
    dw.seg('fdgB' + k, { intro: 18 - k, w: 0.07,
      color: { pending: PAL.grey, final: (dd) => (dd.choice[k] === 1 ? PAL.red : PAL.zero) } });
  }
  const POLE_STEP = { 18: 10, 16: 11, 17: 11, 14: 12, 15: 12, 12: 13, 13: 13,
                      10: 14, 11: 14, 8: 15, 9: 15, 6: 16, 7: 16,
                      4: 17, 5: 17, 1: 18, 2: 18, 3: 18 };
  for (let sp = 1; sp <= 18; sp++) {
    dw.disk('po' + sp, { intro: POLE_STEP[sp], r: 0.22 });
    dw.label('pol' + sp, String(sp), { cls: 'point', intro: POLE_STEP[sp], flash: false, when: (st) => st.lbl });
  }

  // pipes
  for (const m of allAxial) {
    dw.poly('if_' + key(m), 4, { intro: RESOLVE, opacity: 1.0, z: -0.18, flash: false,
      color: { pending: PAL.grey, final: colOf(key(m)) }, when: (st) => st.o1 });
  }

  // node inspector
  dw.nodeInspector(6, { when: (st) => st.node > 0, w: 1.5 * W_BAR, headLen: 1.0, headW: 0.4, r: 0.45 });

  // dual hover links: member <-> its force segment
  for (const m of allAxial) dw.link('m_' + key(m), 'f_' + key(m));
  for (let k = 0; k < 8; k++) {
    dw.link('dgA' + k, 'fdgA' + k);
    dw.link('dgB' + k, 'fdgB' + k);
  }

  // form <-> force pairing: when a joint's polygon closes in the force
  // diagram, the joint's members and its disk RE-FLASH on the form side —
  // and the linked pairs animate simultaneously (house pairing rule)
  for (const m of allAxial) {
    const st = MEM_STEP(m);
    dw.highlight('m_' + key(m), [st]);
  }
  for (let k = 0; k < 8; k++) {
    dw.highlight('dgA' + k, [18 - k]);
    dw.highlight('dgB' + k, [18 - k]);
  }
  for (const j of Object.keys(J)) {
    if (JSTEP[j] !== undefined) dw.highlight('pt_' + j, [JSTEP[j]]);
  }
  for (let k = 0; k < 8; k++) dw.link('ld' + k, 'ldl' + k, 'fl' + k);
  dw.link('reC', 'fre1');
  dw.link('reS', 'fre2');

  dw.instant('plate', 'form_title', 'force_title', 'force_sub');
  dw.ghostable(...allAxial.map((m) => 'f_' + key(m)),
               ...Array.from({ length: 8 }, (_, k) => 'fl' + k),
               ...Array.from({ length: 8 }, (_, k) => 'fdgA' + k),
               ...Array.from({ length: 8 }, (_, k) => 'fdgB' + k),
               'fre1', 'fre2');

  // -------------------------------------------------------------------------
  let d = null;
  const NODES = Object.keys(J);
  function refresh() {
    d = compute(s);
    dw.setLabel('form_title', [-16, -2.0]);
    dw.setLabel('force_title', [34, 37.2]);
    dw.setLabel('force_sub', [34, 35.9]);
    dw.setText('force_sub', `1 unit :: ${Math.round(s.sFD)} lbs`);

    for (const m of allAxial) {
      dw.setSeg('m_' + key(m), J[m[0]], J[m[1]]);
      const f = d.force[key(m)] ?? 0;
      dw.setPoly('if_' + key(m), V.rectPoints(J[m[0]], J[m[1]], Math.abs(f) * s.sIF));
    }
    for (let k = 0; k < 8; k++) {
      dw.setSeg('dgA' + k, J[QUADS[k][0]], J[QUADS[k][2]]);
      dw.setSeg('dgB' + k, J[QUADS[k][1]], J[QUADS[k][3]]);
    }
    for (const j of NODES) dw.setDisk('pt_' + j, J[j]);
    dw.setDisk('hinge_S', [0, 0]);
    dw.setDisk('hinge_C', GEO.CROWN);
    // space number labels at the face centroids
    const triNow = { 1: ['S','O1','I1'], 18: ['I9','gh','C'] };
    QUADS.forEach((q, k) => {
      const [Ilo, Olo, Ohi, Ihi] = q;
      if (d.choice[k] === 0) { triNow[2*k+2] = [Ilo, Olo, Ohi]; triNow[2*k+3] = [Ilo, Ohi, Ihi]; }
      else { triNow[2*k+2] = [Olo, Ohi, Ihi]; triNow[2*k+3] = [Ilo, Olo, Ihi]; }
    });
    for (let sp = 1; sp <= 18; sp++) {
      const t = triNow[sp];
      dw.setLabel('sp' + sp, [(J[t[0]][0] + J[t[1]][0] + J[t[2]][0]) / 3,
                              (J[t[0]][1] + J[t[1]][1] + J[t[2]][1]) / 3]);
    }
    dw.setLabel('lbl0', V.add(J.I5, [-0.9, -0.6]));

    const LSYM = 4.2;
    for (let k = 0; k < 8; k++) {
      const p = J[LOAD_JOINTS[k]];
      const u = V.unit(d.loads[k]);
      dw.setArrow('ld' + k, V.sub(p, V.mul(u, LSYM)), p);
      dw.setDashLine('lda' + k, [V.sub(p, V.mul(u, LSYM + 4)), V.add(p, V.mul(u, 2.5))]);
      dw.setLabel('ldl' + k, V.sub(p, V.mul(u, LSYM + 1.1)));
    }
    dw.setArrow('reC', V.sub(GEO.CROWN, V.mul(V.unit(d.F), LSYM)), GEO.CROWN);
    dw.setArrow('reS', V.sub([0, 0], V.mul(V.unit(d.R), LSYM)), [0, 0]);
    dw.setStrokes('press', d.press.slice(0, -1).map((p, i) => [p, d.press[i + 1]]));
    dw.setDashLine('chk', d.chk);
    const q1 = d.chk[1] ?? [d.xbar, 38], q2 = d.chk[2] ?? q1;
    dw.setDashLine('chkD', [[d.xbar, Math.min(q1[1] + 7, 41)], [d.xbar, q1[1] - 5]]);
    const wu = V.unit(d.Wv);
    dw.setDashLine('chkW', [V.add(q2, V.mul(wu, -8)), V.add(q2, V.mul(wu, 8))]);
    if (d.chk.length >= 4) {
      const clampY = (q) => [q[0], Math.min(q[1], 44.2)];
      dw.setLabel('chkI', clampY(V.mid(d.chk[0], d.chk[1])));
      dw.setLabel('chkK', clampY(V.mid(d.chk[1], d.chk[2])));
      dw.setLabel('chkA', clampY(V.mid(d.chk[2], d.chk[3])));
    }

    // force diagram
    const seqI = ['i','h','g','f','e','d','c','b','a'];
    for (let k = 0; k < 8; k++) {
      const p0 = fd(d.poles[seqI[k]]), p1 = fd(d.poles[seqI[k + 1]]);
      dw.setArrow('fl' + k, p0, p1);
    }
    const lblAt = { A: 'a', B: 'b', C: 'c', D: 'd', E: 'e', F: 'f', G: 'g', H: 'h', I: 'i' };
    for (const [Lb, sp] of Object.entries(lblAt)) {
      dw.setLabel('fp' + Lb, V.add(fd(d.poles[sp]), [0.8, 0.25]));
    }
    dw.setLabel('fpK', V.add(fd(d.K), [0.8, 0.2]));
    const Ppt = fd(d.poles.p), Ipt = fd(d.poles.i);
    dw.setDisk('fpP', Ppt);
    dw.setLabel('fpPl', V.add(Ppt, [-0.8, 0.4]));
    dw.setDashLine('dimH', [Ipt, [Ppt[0], Ipt[1]]]);
    dw.setDashLine('dimV', [[Ppt[0], Ipt[1]], Ppt]);
    dw.setLabel('dimHl', [(Ipt[0] + Ppt[0]) / 2, Ipt[1] + 0.7]);
    dw.setText('dimHl', `H = ${Math.round(Math.abs(d.F[0]))}`);
    dw.setLabel('dimVl', [Ppt[0] - 1.6, (Ipt[1] + Ppt[1]) / 2]);
    dw.setText('dimVl', `V = ${Math.round(Math.abs(d.F[1]))}`);
    dw.setArrow('fre1', Ppt, Ipt);
    dw.setArrow('fre2', fd(d.poles.a), Ppt);
    for (let k = 0; k < 8; k++) {
      dw.setSeg('ray' + k, Ppt, fd(d.poles[seqI[k + 1]]));
    }
    for (const m of allAxial) {
      const [s1, s2] = d.adj[key(m)];
      dw.setSeg('f_' + key(m), fd(d.poles[s1]), fd(d.poles[s2]));
    }
    for (let k = 0; k < 8; k++) {
      const dA = [QUADS[k][0], QUADS[k][2]], dB = [QUADS[k][1], QUADS[k][3]];
      const act = d.choice[k] === 0 ? dA : dB;
      const spA = d.adj[key(act)];
      const a0 = fd(d.poles[spA[0]]), a1 = fd(d.poles[spA[1]]);
      if (d.choice[k] === 0) { dw.setSeg('fdgA' + k, a0, a1); dw.setSeg('fdgB' + k, a0, a0); }
      else { dw.setSeg('fdgB' + k, a0, a1); dw.setSeg('fdgA' + k, a0, a0); }
    }
    for (let sp = 1; sp <= 18; sp++) {
      dw.setDisk('po' + sp, fd(d.poles[sp]));
      dw.setLabel('pol' + sp, V.add(fd(d.poles[sp]), [sp % 2 ? -0.7 : 0.7, 0.35]));
    }

    // node inspector
    const nsel = Math.round(s.node);
    if (nsel > 0) {
      const j = NODES[nsel - 1];
      const els = [];
      for (const m of d.members) {
        if (m[0] !== j && m[1] !== j) continue;
        const o = m[0] === j ? m[1] : m[0];
        const u = V.unit(V.sub(J[o], J[j]));
        els.push(V.mul(u, d.force[key(m)]));
      }
      const li = LOAD_JOINTS.indexOf(j);
      if (li >= 0) els.push(d.loads[li]);
      if (j === 'C') els.push(d.F);
      if (j === 'S') els.push(d.R);
      const ring = d.jwalk[j] || [];
      const sides = [];
      for (let k = 0; k < ring.length; k++) {
        sides.push([fd(d.poles[ring[k]]), fd(d.poles[ring[(k + 1) % ring.length]])]);
      }
      dw.selectDisk('pt_' + j);
      dw.setNodeInspector(J[j], 5.0, `joint ${j}`, sides);
    } else {
      dw.selectDisk(null);
      dw.setNodeInspector([0, 0], 5, '', []);
    }

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  dw.nodeSelect(NODES.map((j) => ({ at: () => J[j] })), (i) => {
    s.node = s.node === i + 1 ? 0 : i + 1;
    refresh();
  });

  const par = panel.section('Parameters');
  panel.slider(par, s, 'fd', 'dead load (× 400 lb/ft)', 0.2, 2, 0.05, refresh);
  panel.slider(par, s, 'fw', 'wind (× 600 lb/ft, right side)', 0, 2, 0.05, refresh);
  panel.slider(par, s, 'sFD', 'scale force diagram (lbs/unit)', 1000, 4000, 50, refresh);
  panel.toggle(par, s, 'o1', 'thickness ∝ force (off: uniform)', refresh);
  panel.slider(par, s, 'sIF', 'scale internal forces', 0, 0.0001, 0.000005, refresh);
  panel.toggle(par, s, 'press', 'show the line of pressure', refresh);
  panel.toggle(par, s, 'chk', 'show the pole check funicular', refresh);
  panel.toggle(par, s, 'lbl', 'show labels', refresh);
  panel.toggle(par, s, 'plate', 'show the 1903 plate', refresh);
  const nodeSec = panel.section('Node equilibrium');
  panel.slider(nodeSec, s, 'node', 'joint (0 = off)', 0, NODES.length, 1, refresh);

  refresh();
  return player;
}
