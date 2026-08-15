/**
 * EX 8 · Creative Task — Art Gallery
 * Structural Design II, FS 23 (sheet EX 8 "Frames", page 3).
 *
 * "Design a frame for an art gallery. The frame should enclose an interior
 *  space of at least 10 m × 5 m and carry a vertical load of G_d = 40 kN and a
 *  horizontal load of Q_d = 35 kN.
 *  a) Draw the form diagram of the frame in scale 1:100.
 *  b) Find the internal force flow and draw the corresponding force diagram.
 *  c) Comment on your design: does the force diagram fit onto the sheet?"
 *
 * WHAT PAGE 3 ACTUALLY GIVES, digitised at the stated 1:100 with the origin at
 * the bottom-left corner of the dashed box:
 *   ground line       horizontal, 23.963 m long
 *   dashed envelope   x 0.000 → 10.005 m, y 0.000 → 5.126 m
 *   dimension strings "10.0 m" (measures 9.997 m — correct) and
 *                     "5.0 m"  (measures 5.126 m — 2.5 % OVERSIZE, 1.26 mm on
 *                     paper; the drawing and the label disagree)
 *   captions          "form diagram 1:100", "force diagram 1cm ≙ 10kN"
 * and NOTHING ELSE. No frame, no supports, no load arrows, no span, no
 * material. G_d and Q_d are given in the text at DESIGN level, with no
 * characteristic values, so no partial factor applies here — which is worth
 * saying out loud, because tasks 2–4 of the same sheet have just drilled the
 * opposite habit.
 *
 * The 2.5 % error is carried openly: the panel switches the required clear
 * height between the printed 5.000 m and the drawn 5.126 m, and it matters —
 * the optimised 20 m gable clears exactly 10.000 m at 5.000 m and only
 * 9.748 m at 5.126 m, so the honest answer changes with the reading.
 *
 * TWO DESIGNS, because part c) is a comparison and cannot be answered with one.
 *
 * DESIGN 1 — the intuitive compact portal. Three-hinged, pins A(0,0) and
 * B(12,0), 0.500 m members, crown hinge C(6.000, 6.250):
 *   outer  (−0.25,0) (−0.25,6.5) (6,6.5) (12.25,6.5) (12.25,0)
 *   inner  ( 0.25,0) ( 0.25,5.0) (6,6.0) (11.75,5.0) (11.75,0)
 *   clear interior 11.50 m × 5.00 m ✓ (the brief asks for at least 10 × 5)
 * Both loads pass through C, so the thrust line is A–C–B and one triangle of
 * forces closes the global equilibrium:
 *   |AC| = 8.6639 m at 46.169°
 *   N_L =  2.455 kN compression   A = ( +1.700,  +1.771) kN
 *   N_R = 52.994 kN compression   B = (−36.700, +38.229) kN
 *   ΣF = (1.700 + 35.000 − 36.700, 1.771 − 40.000 + 38.229) = (0, 0) ✓
 * But that thrust line is nowhere near inside the concrete, so the corner has
 * to redirect it, exactly as in task 2 (compendium 8.1's five-element corner,
 * lib/redirect.js). Right half, O(12.25,6.5), K(11.75,5.0):
 *   C–O  117.6 kN TENSION · C–K 157.8 compression · K–O 419.5 compression
 *   K–B  432.0 compression · O–B 393.6 kN TENSION
 * Sanity check by hand: at the knee the thrust line passes x = 7.200 at
 * y = 5.000, i.e. 4.80 m from the column centre; M = 38.23 × 4.80 = 183.5 kNm
 * on a 0.500 m lever arm → a 367 kN couple, same order as the 393/432 kN the
 * truss gives (the difference is the members' inclination).
 *   FORCE DIAGRAM 15.4 × 43.2 cm at 1 cm ≙ 10 kN. A4 is 21.0 × 29.7 cm.
 *   IT DOES NOT FIT — and that is exactly what part c) is fishing for.
 *
 * DESIGN 2 — the optimised funicular gable. Three-hinged, pins A(0,0) and
 * B(20,0), crown hinge C(10,10), two straight members, both loads at the crown:
 *   |AC| = |BC| = 14.1421 m at 45°
 *   N_L + N_R = G_d/sin45° = 56.5685      N_L − N_R = −Q_d/cos45° = −49.4975
 *   N_L =  3.5355 kN compression   A = ( +2.500,  +2.500) kN
 *   N_R = 53.0330 kN compression   B = (−37.500, +37.500) kN
 * The thrust line IS the frame axis, so the frame is funicular: no bending, no
 * redirection, no tension anywhere — two struts and two reactions, five
 * vectors in the whole force diagram.
 *   clear opening at 5.000 m: x = 5.000 … 15.000 → exactly 10.000 m ✓
 *   FORCE DIAGRAM 3.75 × 4.00 cm. Fits with room to spare.
 *
 * THE POINT, and it is worth putting on a slide: the frame that hugs the room
 * needs 432 kN inside it; the frame that follows the loads needs 53 kN. Same
 * loads, same brief. If a 20 m span is unacceptable the middle path is to keep
 * the 12 m portal and deepen the members — the couple scales as 1/lever arm,
 * so a 1.5 m haunch brings 432 kN down to about 145 kN, which is 14.5 cm and
 * still marginal on A4. The member-depth slider does exactly that.
 *
 * The sheet prints no answers. Everything above is derived, and every number
 * shown is recomputed live from the sliders.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';
import { padRing, furthestOutside } from '../lib/poly.js';
import { threeHinge, redirectHalf } from '../lib/redirect.js';

const WREQ = 10.0;                    // the brief's interior width, m
const HPRINT = 5.000, HDRAWN = 5.126; // the printed and the DRAWN clear height
const A4 = [21.0, 29.7];              // cm
const KNCM = 10.0;                    // the sheet's force scale: 1 cm ≙ 10 kN
const NRING = 16;
const NMEM = 5;                       // redirection elements in one corner

const DEFAULTS = {
  design: 0,        // 0 = the compact portal · 1 = the funicular gable
  Gd: 40, Qd: 35,   // kN, DESIGN level — the sheet gives no characteristic values
  span1: 12.0, hc1: 5.0, dep1: 0.50,
  span2: 20.0, h2: 10.0,
  drawn: false,     // require the DRAWN 5.126 m instead of the printed 5.000 m
  a4: true,
  flow: true,
  lbl: true, _k: 99,
};

// -------------------------------------------------------------------- maths --

const bbox = (pts) => {
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  return { w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys),
           x0: Math.min(...xs), y0: Math.min(...ys) };
};

function compute(s) {
  const design = Math.round(s.design);
  const hreq = s.drawn ? HDRAWN : HPRINT;
  const F = [s.Qd, -s.Gd];

  let A, B, C, out, inn, OL, KL, OR, KR, ring, clearW, clearH, name, short;
  if (design === 0) {
    const S = s.span1, t = s.dep1, hc = s.hc1, yo = hc + 1.5;
    A = [0, 0]; B = [S, 0]; C = [S / 2, yo - t / 2];
    out = [[-t / 2, 0], [-t / 2, yo], [S / 2, yo], [S + t / 2, yo], [S + t / 2, 0]];
    inn = [[t / 2, 0], [t / 2, hc], [S / 2, yo - t], [S - t / 2, hc], [S - t / 2, 0]];
    OL = [-t / 2, yo]; KL = [t / 2, hc];
    OR = [S + t / 2, yo]; KR = [S - t / 2, hc];
    ring = [...out, ...[...inn].reverse()];
    clearW = S - t; clearH = hc;
    name = `the compact portal, ${S.toFixed(2)} m span, ${t.toFixed(2)} m members`;
    short = `portal ${S.toFixed(2)} m span, ${t.toFixed(2)} m members`;
  } else {
    const L = s.span2, h = s.h2;
    A = [0, 0]; B = [L, 0]; C = [L / 2, h];
    out = [A, C, B]; inn = [A, C, B];
    OL = C; KL = C; OR = C; KR = C;
    ring = [A, C, B];
    clearW = hreq < h ? L * (1 - hreq / h) : 0; clearH = h;
    name = `the funicular gable, ${L.toFixed(2)} m span, crown ${h.toFixed(2)} m up`;
    short = `gable ${L.toFixed(2)} m span, crown ${h.toFixed(2)} m`;
  }

  const g = threeHinge(A, B, C, F);
  const fits = clearW >= WREQ - 1e-9 && clearH >= hreq - 1e-9;

  // the global force polygon: G down, then Q across, then the two reactions
  const gp = [[0, 0]];
  gp.push(V.add(gp[0], [0, -s.Gd]));
  gp.push(V.add(gp[1], [s.Qd, 0]));
  gp.push(V.add(gp[2], g.RB));
  const gbox = bbox(gp);

  let memR = [], memL = [], esc = { at: null, to: null, dist: 0 };
  let cr = null, crbox = null, NtMax = 0, NtWhere = '—', Nmax = Math.max(Math.abs(g.NL), Math.abs(g.NR));
  if (design === 0) {
    const hR = redirectHalf({ C, O: OR, K: KR, S: B }, g.atCR);
    const hL = redirectHalf({ C, O: OL, K: KL, S: A }, g.atCL);
    memR = hR.members; memL = hL.members;
    esc = furthestOutside([A, C, B], ring);
    for (const h of [hL, hR]) {
      for (const m of h.members) {
        if (m.tension && -m.N > NtMax) { NtMax = -m.N; NtWhere = m.name; }
        Nmax = Math.max(Nmax, Math.abs(m.N));
      }
    }
    // The Cremona of the right half. Its four points are the four faces of the
    // planar truss C–O–K–B: two exterior regions x (bordering C–O and O–B) and
    // y (bordering B–K and K–C), and the two triangles. Every side of it is
    // parallel to its member by construction, and the diagonal p1–p2 closing
    // out parallel to K–O is the proof that the chain was solved correctly.
    const x0 = [0, 0], y0 = g.atCR;
    const p1 = V.intersect(x0, V.unit(V.sub(OR, C)), y0, V.unit(V.sub(KR, C)));
    const p2 = V.intersect(x0, V.unit(V.sub(B, OR)), y0, V.unit(V.sub(KR, B)));
    if (p1 && p2) {
      cr = { x: x0, y: y0, p1, p2 };
      crbox = bbox([x0, y0, p1, p2]);
    }
  }

  // the force diagram that has to go on the sheet: for the portal it is the
  // internal Cremona, for the gable there is no internal diagram at all
  const fdbox = crbox ?? gbox;
  const cm = [fdbox.w / KNCM, fdbox.h / KNCM];
  const onA4 = (cm[0] <= A4[0] + 1e-9 && cm[1] <= A4[1] + 1e-9)
    || (cm[0] <= A4[1] + 1e-9 && cm[1] <= A4[0] + 1e-9);

  const ang = (v) => (Math.atan2(v[1], v[0]) * 180) / Math.PI;
  const checkF = Math.hypot(g.RA[0] + g.RB[0] + F[0], g.RA[1] + g.RB[1] + F[1]);

  return { design, name, short, hreq, A, B, C, out, inn, OL, KL, OR, KR, ring,
           clearW, clearH, fits, F, Gd: s.Gd, Qd: s.Qd,
           RA: g.RA, RB: g.RB, NL: g.NL, NR: g.NR, checkF,
           angA: ang(g.RA), angB: ang(g.RB),
           gp, gbox, memR, memL, esc, cr, crbox, fdbox, cm, onA4,
           NtMax, NtWhere, Nmax,
           span: B[0] - A[0], rise: C[1] - A[1] };
}

// --------------------------------------------------------------------- view --

export const meta = {
  title: 'EX 8.5 — the frame that follows the loads',
  subtitle: 'Structural Design II · sheet EX 8 “Frames”, creative task',
  about: 'Page 3 of the sheet is empty: a ground line, a dashed box ten metres by five, and two numbers. Put a frame around the box that carries forty kilonewtons down and thirty-five across. The obvious answer is a portal that hugs the room — and it needs four hundred and thirty kilonewtons inside its corner, because its shape was chosen for the room and not for the loads, so the thrust line runs outside the concrete and the corner has to redirect it. Its force diagram is forty-three centimetres tall and will not go on an A4 sheet, which is what part c) is really asking. The alternative is a gable whose axis IS the thrust line: no bending, no tension anywhere, fifty-three kilonewtons, and a force diagram four centimetres across. Switch between them, and deepen the portal’s members to watch the difference close.',
  result: (d) => [
    `${d.name} — clear interior ${d.clearW.toFixed(3)} × ${d.clearH.toFixed(3)} m against the required ${WREQ.toFixed(2)} × ${d.hreq.toFixed(3)} m ${d.fits ? '✓' : '✗'}`,
    `G_d = ${d.Gd.toFixed(1)} kN and Q_d = ${d.Qd.toFixed(1)} kN are DESIGN values already, so no γ · A = ${Math.hypot(...d.RA).toFixed(3)} kN at ${d.angA.toFixed(2)}° · B = ${Math.hypot(...d.RB).toFixed(3)} kN at ${d.angB.toFixed(2)}° · ΣF closes to ${d.checkF.toExponential(1)} kN`,
    d.design === 0
      ? `the thrust line leaves the concrete by up to ${d.esc.dist.toFixed(3)} m, so the corner redirects: largest force ${d.Nmax.toFixed(1)} kN, largest TENSION ${d.NtMax.toFixed(1)} kN in ${d.NtWhere}`
      : `the frame axis IS the thrust line, so it is funicular: two struts of ${Math.abs(d.NL).toFixed(3)} and ${Math.abs(d.NR).toFixed(3)} kN, and no tension anywhere`,
    `c) force diagram ${d.cm[0].toFixed(2)} × ${d.cm[1].toFixed(2)} cm at 1 cm ≙ ${KNCM.toFixed(0)} kN — on A4 (${A4[0].toFixed(1)} × ${A4[1].toFixed(1)} cm) it ${d.onA4 ? 'FITS ✓' : 'DOES NOT FIT ✗'}`],
  frame: [[-26, -22], [30, 16]],
};

const FLOW = 6;

const STEPS = [
  { t: 'The exercise', d: 'EX 8 creative task: an art gallery. Enclose at least 10 by 5 metres, carry 40 kN down and 35 kN across, and then — part c) — say whether the force diagram your design produces will actually fit on the sheet' },
  { t: 'What page 3 gives', d: 'a ground line, a dashed box, and two load magnitudes. That is the entire page. Both loads are given at DESIGN level with no characteristic values behind them, so no partial factor applies here — which is the opposite of everything tasks 2 to 4 just taught',
    detail: (d) => [`required interior ${WREQ.toFixed(2)} m × ${d.hreq.toFixed(3)} m`,
                    `G_d = ${d.Gd.toFixed(1)} kN vertical · Q_d = ${d.Qd.toFixed(1)} kN horizontal`,
                    `the sheet LABELS the box 5.0 m and DRAWS it 5.126 m — 2.5 % oversize, 1.26 mm on paper. The panel switches which one you have to satisfy`],
    take: 'everything from here is your design; the sheet has stopped helping' },
  { t: 'A frame around the room', d: 'the panel holds two designs. The first is the one everybody draws: a portal that hugs the box. The second follows the loads instead, and pays for the room with span. Both are three-hinged, so both are determinate and both can be solved with a ruler',
    detail: (d) => [d.name,
                    `clear interior ${d.clearW.toFixed(3)} × ${d.clearH.toFixed(3)} m — required ${WREQ.toFixed(2)} × ${d.hreq.toFixed(3)} m ${d.fits ? '✓' : '✗ the box does not fit inside'}`,
                    `span ${d.span.toFixed(2)} m, crown hinge ${d.rise.toFixed(3)} m up`] },
  { t: 'The loads, both through the crown', d: 'put the vertical load on the crown axis and the horizontal one on the crown’s level. Then all three lines of action — the resultant and the two reactions — meet at the crown hinge, and the whole of global equilibrium is one triangle',
    detail: (d) => [`resultant ${Math.hypot(...d.F).toFixed(2)} kN at ${((Math.atan2(d.F[1], d.F[0]) * 180) / Math.PI).toFixed(2)}°, through C`,
                    'a hinge carries no moment, so the thrust line has to pass through it'] },
  { t: 'Read the reactions', d: 'right: the load laid off, closed by the two chord directions. The chords ARE the reaction directions, so nothing is calculated — the triangle is the answer',
    detail: (d) => [`A = ${Math.hypot(...d.RA).toFixed(3)} kN at ${d.angA.toFixed(2)}°, components (${d.RA[0].toFixed(2)}, ${d.RA[1].toFixed(2)})`,
                    `B = ${Math.hypot(...d.RB).toFixed(3)} kN at ${d.angB.toFixed(2)}°, components (${d.RB[0].toFixed(2)}, ${d.RB[1].toFixed(2)})`,
                    `ΣF closes to ${d.checkF.toExponential(1)} kN ✓`] },
  { t: 'Does the thrust line stay inside?', d: 'this is where the two designs part company. The gable was drawn ON the line A–C–B, so its thrust line is its own axis and there is nothing more to do. The portal was drawn around the room, and its thrust line spends most of its length in mid-air',
    detail: (d) => [d.design === 0
      ? `the line escapes the concrete by up to ${d.esc.dist.toFixed(3)} m — nothing can carry the load along it`
      : 'the frame axis IS the thrust line: funicular, no bending, nothing to redirect',
      d.design === 0 ? 'so the corner has to carry the force around itself instead' : 'that is the whole design idea'],
    take: 'a thrust line outside the material is not a solution, it is a diagnosis' },
  { t: 'The corner pays for it', d: 'the portal’s corner redirects the force through five elements that all lie inside the concrete — the outer face, the inner face and a diagonal. The outer face comes out in TENSION, which is where the reinforcement goes, and the numbers are an order of magnitude above the loads that caused them',
    detail: (d) => (d.design === 0
      ? [...d.memR.map((m) => `${m.name}  ${Math.abs(m.N).toFixed(1)} kN ${m.tension ? 'tension' : 'compression'}`),
         `largest ${d.Nmax.toFixed(1)} kN, from loads of ${d.Gd.toFixed(0)} and ${d.Qd.toFixed(0)} kN`]
      : ['nothing to redirect — the gable has no corner and no bending',
         `the two struts are ${Math.abs(d.NL).toFixed(3)} and ${Math.abs(d.NR).toFixed(3)} kN, and that is the whole internal force flow`]),
    take: 'the lever arm inside a 0.5 m member is 0.5 m, and a moment divided by 0.5 m is a big number' },
  { t: 'How big is the force diagram?', d: 'measure it. At the sheet’s own scale, 1 cm to 10 kN, the drawing is as many centimetres tall as the biggest force is tens of kilonewtons — so the size of the paper is a direct statement about the size of the forces',
    detail: (d) => [`bounding box ${d.fdbox.w.toFixed(1)} × ${d.fdbox.h.toFixed(1)} kN`,
                    `at 1 cm ≙ ${KNCM.toFixed(0)} kN that is ${d.cm[0].toFixed(2)} × ${d.cm[1].toFixed(2)} cm`,
                    d.design === 0 ? 'and that is only the corner: the global triangle is a tenth of the size'
                                   : 'five vectors, and the whole thing closes'] },
  { t: 'c) Against an A4 sheet', d: 'here is part c), drawn rather than argued: the force diagram’s bounding box laid over an A4 page at the same scale. The portal runs off the top of the paper. The gable sits in one corner of it',
    detail: (d) => [`A4 is ${A4[0].toFixed(1)} × ${A4[1].toFixed(1)} cm`,
                    `this diagram is ${d.cm[0].toFixed(2)} × ${d.cm[1].toFixed(2)} cm → ${d.onA4 ? 'it FITS' : 'it DOES NOT FIT'}`,
                    d.onA4 ? '' : `it would need a sheet ${(d.cm[1] / A4[1]).toFixed(2)} times as long`].filter(Boolean),
    take: 'if the drawing will not fit on the page, the structure is telling you something about itself' },
  { t: 'The comparison', d: 'the frame that hugs the room needs 432 kN inside it. The frame that follows the loads needs 53. Same loads, same brief, same three hinges. And if a 20 metre span is unacceptable, the middle path is to keep the 12 metre portal and deepen its members — the couple goes as one over the lever arm, so the depth slider is worth a play',
    detail: (d) => [`this design: largest internal force ${d.Nmax.toFixed(1)} kN, force diagram ${d.cm[0].toFixed(2)} × ${d.cm[1].toFixed(2)} cm`,
                    d.design === 0 ? 'deepen the members and watch the corner forces fall as 1/depth'
                                   : 'no tension anywhere in this one: nothing to reinforce',
                    `the loads that caused it: ${Math.hypot(d.Gd, d.Qd).toFixed(2)} kN in total`],
    take: 'shape is the cheapest structural material there is' },
];

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const ARR = dw.W.arrow, NARR = dw.W.narrow;

  const MPU = 0.80, AX = 6.0, AY = -11.5;           // the form diagram
  const ux = (p) => [AX + p[0] * MPU, AY + p[1] * MPU];
  const GFX = 23.5, GFY = -6.0, SFDG = 7.0;         // the global force triangle
  const CRX = 26.5, CRY = 1.0, SFDC = 45.0;         // the internal Cremona
  const PX = 17.0, PY = 0.5, PSC = 0.26;            // the A4 comparison, per cm

  const D0 = (st, dd) => !!dd && dd.design === 0;
  const MEMCOL = (i) => ({
    pending: PAL.black,
    final: (dd, st) => (st._k < FLOW ? PAL.grey
      : dd.memR[i] && dd.memR[i].tension ? PAL.red : PAL.blue),
  });
  const MEMCOLL = (i) => ({
    pending: PAL.black,
    final: (dd, st) => (st._k < FLOW ? PAL.grey
      : dd.memL[i] && dd.memL[i].tension ? PAL.red : PAL.blue),
  });
  const FITC = { final: (dd) => (dd.onA4 ? PAL.green : PAL.red) };
  const BOXC = { final: (dd) => (dd.fits ? PAL.green : PAL.red) };

  dw.label('t_form', '', { cls: 'title', flash: false });
  dw.label('t_force', 'Kräfteplan — force diagram', { cls: 'title', flash: false });
  dw.label('t_paper', '', { cls: 'title', flash: false, when: (st) => st.a4 });

  // ---- the site: ground line and the dashed envelope the sheet prints
  dw.seg('ground', { intro: 1, w: dw.W.thin, color: PAL.grey });
  dw.strokes('ghatch', 22, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.dashLine('env', { intro: 1, color: BOXC, dash: dw.W.dash });
  dw.label('lenv', '', { cls: 'num', intro: 1, color: BOXC });

  // ---- the frame
  dw.poly('mat', NRING, { intro: 2, color: PAL.grey, opacity: 0.11, z: -0.2, flash: false,
    when: D0 });
  dw.strokes('edge', NRING, { intro: 2, w: dw.W.str, color: PAL.black, when: D0 });
  for (const n of ['A', 'B']) {
    dw.disk(`sup${n}`, { intro: 2, r: dw.W.disk });
    dw.label(`lsup${n}`, n, { cls: 'num', intro: 2, when: (st) => st.lbl });
    dw.strokes(`hat${n}`, 5, { intro: 2, w: dw.W.dim, color: PAL.grey, flash: false });
  }
  dw.disk('hingeC', { intro: 2, r: dw.W.disk });
  dw.label('lhingeC', 'C', { cls: 'num', intro: 2, when: (st) => st.lbl });

  // ---- the loads, on their real lines of action through C
  dw.arrow('fG', { intro: 3, color: PAL.green, ...ARR });
  dw.label('lfG', '', { cls: 'num', intro: 3, color: PAL.green });
  dw.dashLine('laG', { intro: 3, color: PAL.grey, dash: dw.W.dash });
  dw.arrow('fQ', { intro: 3, color: PAL.green, ...ARR });
  dw.label('lfQ', '', { cls: 'num', intro: 3, color: PAL.green });
  dw.dashLine('laQ', { intro: 3, color: PAL.grey, dash: dw.W.dash });

  // ---- global force triangle
  dw.arrow('ffG', { intro: 4, color: PAL.green, ...ARR });
  dw.arrow('ffQ', { intro: 4, color: PAL.green, ...ARR });
  dw.label('lffG', '', { cls: 'num', intro: 4, color: PAL.green, when: (st) => st.lbl });
  dw.label('lffQ', '', { cls: 'num', intro: 4, color: PAL.green, when: (st) => st.lbl });
  dw.seg('fRA', { intro: 4, w: dw.W.bar, color: PAL.green });
  dw.seg('fRB', { intro: 4, w: dw.W.bar, color: PAL.green });
  dw.label('lfRA', '', { cls: 'num', intro: 4, color: PAL.green, when: (st) => st.lbl });
  dw.label('lfRB', '', { cls: 'num', intro: 4, color: PAL.green, when: (st) => st.lbl });
  for (const n of ['A', 'B']) {
    dw.arrow(`re${n}`, { intro: 4, color: PAL.green, ...NARR });
    dw.label(`lre${n}`, '', { cls: 'num', intro: 4, color: PAL.green });
  }

  // ---- the thrust line, and where it leaves the material
  dw.seg('thr1', { intro: 5, w: dw.W.bar,
    color: { pending: PAL.grey, final: (dd) => (dd.design ? PAL.blue : PAL.grey) } });
  dw.seg('thr2', { intro: 5, w: dw.W.bar,
    color: { pending: PAL.grey, final: (dd) => (dd.design ? PAL.blue : PAL.grey) } });
  dw.label('lthr', '', { cls: 'point', intro: 5, flash: false, color: PAL.grey });
  dw.seg('esc', { intro: 5, w: dw.W.bar, color: PAL.red, flash: false,
    when: (st, dd) => !!dd && dd.esc.dist > 1e-6 });
  dw.label('lesc', '', { cls: 'num', intro: 5, color: PAL.red, flash: false,
    when: (st, dd) => !!dd && dd.esc.dist > 1e-6 });

  // ---- the corner redirection, both halves
  for (let i = 0; i < NMEM; i++) {
    dw.seg(`mR${i}`, { intro: FLOW, w: dw.W.bar, color: MEMCOL(i),
      when: (st, dd) => !!dd && dd.design === 0 && st.flow });
    dw.label(`lmR${i}`, '', { cls: 'num', intro: FLOW, color: MEMCOL(i),
      when: (st, dd) => !!dd && dd.design === 0 && st.flow && st.lbl });
    dw.seg(`mL${i}`, { intro: FLOW, w: dw.W.bar, color: MEMCOLL(i),
      when: (st, dd) => !!dd && dd.design === 0 && st.flow });
  }

  // ---- the internal Cremona of the right corner
  const CRN = ['C–O', 'C–K', 'K–O', 'K–S', 'O–S'];
  dw.seg('crEx', { intro: FLOW + 1, w: dw.W.ray, color: PAL.green, when: D0 });
  for (let i = 0; i < NMEM; i++) {
    dw.seg(`cr${i}`, { intro: FLOW + 1, w: dw.W.ray, color: MEMCOL(i), when: D0 });
    dw.link(`mR${i}`, `cr${i}`, `lmR${i}`);
  }
  for (const n of ['x', 'y', 'p1', 'p2']) {
    dw.disk(`cp_${n}`, { intro: FLOW + 1, r: dw.W.disk * 0.7, when: D0 });
  }
  dw.label('lcr', '', { cls: 'point', intro: FLOW + 1, flash: false, color: PAL.grey });
  // the reactions are along the two chords, in both designs — the one link
  // group that is always live
  dw.link('thr1', 'fRA', 'reA', 'lfRA');
  dw.link('thr2', 'fRB', 'reB', 'lfRB');

  // ---- part c): the bounding box against an A4 page
  dw.strokes('a4', 4, { intro: FLOW + 2, w: dw.W.thin, color: PAL.grey,
    when: (st) => st.a4 });
  dw.label('la4', 'A4', { cls: 'num', intro: FLOW + 2, color: PAL.grey, flash: false,
    when: (st) => st.a4 });
  dw.strokes('fdb', 4, { intro: FLOW + 2, w: dw.W.bar, color: FITC, when: (st) => st.a4 });
  dw.label('lfdb', '', { cls: 'num', intro: FLOW + 2, color: FITC, when: (st) => st.a4 });
  dw.label('lverdict', '', { cls: 'point', intro: FLOW + 2, color: FITC });

  dw.instant('t_form', 't_force', 't_paper', 'ground', 'ghatch');
  dw.ghostable('ffG', 'ffQ', 'fRA', 'fRB',
    'crEx', 'cr0', 'cr1', 'cr2', 'cr3', 'cr4');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);

    dw.setLabel('t_form', [16.0, -16.2]);
    dw.setText('t_form', `form diagram 1:100 · ${d.short}`);
    dw.setLabel('t_force', [24.5, -5.2]);
    dw.setLabel('t_paper', [20.0, 14.2]);
    dw.setText('t_paper', `c) will it fit on A4?`);

    // --- ground line and the dashed envelope
    const g0 = ux([-1.5, 0]), g1 = ux([d.span + 1.5, 0]);
    dw.setSeg('ground', g0, g1);
    dw.setStrokes('ghatch', V.hatch(g0, g1, -1, 0.8, 22));
    const ex0 = (d.span - WREQ) / 2;
    const e = [ux([ex0, 0]), ux([ex0 + WREQ, 0]),
               ux([ex0 + WREQ, d.hreq]), ux([ex0, d.hreq])];
    dw.setDashLine('env', [...e, e[0]]);
    dw.setLabel('lenv', V.add(V.mid(e[0], e[1]), [0, -1.6]));
    dw.setText('lenv', `${WREQ.toFixed(2)} × ${d.hreq.toFixed(3)} m`);

    // --- the frame
    const ring = d.ring.map(ux);
    dw.setPoly('mat', padRing(ring, NRING));
    const ed = [];
    for (let i = 0; i < ring.length; i++) ed.push([ring[i], ring[(i + 1) % ring.length]]);
    while (ed.length < NRING) ed.push([ring[0], ring[0]]);
    dw.setStrokes('edge', ed.slice(0, NRING));

    const A = ux(d.A), B = ux(d.B), C = ux(d.C);
    dw.setDisk('supA', A); dw.setDisk('supB', B); dw.setDisk('hingeC', C);
    dw.setLabel('lsupA', V.add(A, [-1.7, -1.0]));
    dw.setLabel('lsupB', V.add(B, [1.7, -1.0]));
    dw.setLabel('lhingeC', V.add(C, [-1.5, 0.9]));
    for (const [n, p] of [['A', A], ['B', B]]) {
      dw.setStrokes(`hat${n}`, V.hatch([p[0] - 1.6, p[1] - 0.45],
        [p[0] + 1.6, p[1] - 0.45], -1, 0.9, 5));
    }

    // --- the loads, through C
    dw.setArrow('fG', [C[0], C[1] + 5.4], [C[0], C[1] + 1.1]);
    dw.setLabel('lfG', [C[0] - 4.2, C[1] + 4.4]);
    dw.setText('lfG', `G_d = ${d.Gd.toFixed(1)} kN`);
    dw.setDashLine('laG', [[C[0], C[1] + 5.4], [C[0], AY - 1.2]]);
    dw.setArrow('fQ', [C[0] - 9.0, C[1]], [C[0] - 4.6, C[1]]);
    dw.setLabel('lfQ', [C[0] - 6.8, C[1] + 1.1]);
    dw.setText('lfQ', `Q_d = ${d.Qd.toFixed(1)} kN`);
    dw.setDashLine('laQ', [[C[0] - 9.0, C[1]], [B[0] + 1.5, C[1]]]);

    // --- global force triangle
    const T = [GFX, GFY];
    const pG = [T[0], T[1] - d.Gd / SFDG];
    const pQ = [pG[0] + d.Qd / SFDG, pG[1]];
    const pA = V.add(pQ, V.mul(d.RA, 1 / SFDG));
    dw.setArrow('ffG', T, pG);
    dw.setArrow('ffQ', pG, pQ);
    dw.setLabel('lffG', V.add(V.mid(T, pG), [-3.0, 0]));
    dw.setText('lffG', `G_d ${d.Gd.toFixed(0)}`);
    dw.setLabel('lffQ', V.add(V.mid(pG, pQ), [0, -1.2]));
    dw.setText('lffQ', `Q_d ${d.Qd.toFixed(0)}`);
    dw.setSeg('fRA', pQ, pA);
    dw.setSeg('fRB', pA, T);
    dw.setLabel('lfRA', V.add(V.mid(pQ, pA), [1.6, -1.2]));
    dw.setLabel('lfRB', V.add(V.mid(pA, T), [3.2, 0.4]));
    dw.setText('lfRA', `A = ${Math.hypot(...d.RA).toFixed(2)}`);
    dw.setText('lfRB', `B = ${Math.hypot(...d.RB).toFixed(2)}`);
    for (const [n, p, R] of [['A', A, d.RA], ['B', B, d.RB]]) {
      const u = V.unit(R);
      dw.setArrow(`re${n}`, V.sub(p, V.mul(u, 4.0)), V.sub(p, V.mul(u, 1.0)));
      const lp = V.add(V.sub(p, V.mul(u, 4.0)), [n === 'A' ? -2.2 : 2.2, -0.6]);
      dw.setLabel(`lre${n}`, [Math.max(lp[0], 1.8), lp[1]]);
      dw.setText(`lre${n}`, `${n} = ${Math.hypot(...R).toFixed(2)}`);
    }

    // --- the thrust line
    dw.setSeg('thr1', A, C);
    dw.setSeg('thr2', C, B);
    dw.setLabel('lthr', V.add(V.mid(A, C), [-4.4, 1.6]));
    dw.setText('lthr', d.design ? 'thrust line = the frame axis' : 'thrust line');
    if (d.esc.at) {
      dw.setSeg('esc', ux(d.esc.at), ux(d.esc.to));
      dw.setLabel('lesc', V.add(V.mid(ux(d.esc.at), ux(d.esc.to)), [3.6, 0.6]));
      dw.setText('lesc', `${d.esc.dist.toFixed(2)} m outside`);
    }

    // --- the redirection
    for (let i = 0; i < NMEM; i++) {
      const mR = d.memR[i], mL = d.memL[i];
      dw.setSeg(`mR${i}`, ux(mR ? mR.a : d.A), ux(mR ? mR.b : d.A));
      dw.setSeg(`mL${i}`, ux(mL ? mL.a : d.A), ux(mL ? mL.b : d.A));
      if (mR) {
        const a = ux(mR.a), b = ux(mR.b);
        const nb = V.mul(V.unit(V.perp(V.sub(b, a))), [3.0, -3.2, 2.0, -3.6, 3.6][i]);
        dw.setLabel(`lmR${i}`, V.add(V.mid(a, b), nb));
        dw.setText(`lmR${i}`, `${Math.abs(mR.N).toFixed(0)}`);
      }
    }

    // --- the Cremona
    const cq = (p) => [CRX + p[0] / SFDC, CRY + p[1] / SFDC];
    if (d.cr) {
      const { x, y, p1, p2 } = d.cr;
      const off = V.sub([CRX, CRY], [ (d.crbox.x0 + d.crbox.w / 2) / SFDC,
                                      (d.crbox.y0 + d.crbox.h / 2) / SFDC ]);
      const q = (p) => V.add([p[0] / SFDC, p[1] / SFDC], off);
      const P = { x: q(x), y: q(y), p1: q(p1), p2: q(p2) };
      dw.setSeg('crEx', P.x, P.y);
      dw.setSeg('cr0', P.x, P.p1);
      dw.setSeg('cr1', P.y, P.p1);
      dw.setSeg('cr2', P.p1, P.p2);
      dw.setSeg('cr3', P.y, P.p2);
      dw.setSeg('cr4', P.x, P.p2);
      for (const n of ['x', 'y', 'p1', 'p2']) dw.setDisk(`cp_${n}`, P[n]);
      dw.setLabel('lcr', [26.5, CRY + d.crbox.h / (2 * SFDC) + 1.4]);
      dw.setText('lcr', `1 unit ≙ ${SFDC.toFixed(0)} kN`);
    } else {
      const z = [CRX, CRY];
      dw.setSeg('crEx', z, z);
      for (let i = 0; i < NMEM; i++) dw.setSeg(`cr${i}`, z, z);
      for (const n of ['x', 'y', 'p1', 'p2']) dw.setDisk(`cp_${n}`, z);
      dw.setLabel('lcr', [CRX, CRY]);
      dw.setText('lcr', '');
    }

    // --- part c): the bounding box on an A4 page
    const pr = (w, h) => {
      const c = [[PX, PY], [PX + w * PSC, PY], [PX + w * PSC, PY + h * PSC], [PX, PY + h * PSC]];
      return c.map((p, i) => [p, c[(i + 1) % 4]]);
    };
    dw.setStrokes('a4', pr(A4[0], A4[1]));
    dw.setLabel('la4', [PX + A4[0] * PSC - 1.0, PY + 0.8]);
    dw.setStrokes('fdb', pr(d.cm[0], d.cm[1]));
    dw.setLabel('lfdb', [PX + (d.cm[0] * PSC) / 2, PY + d.cm[1] * PSC + 0.9]);
    dw.setText('lfdb', `${d.cm[0].toFixed(2)} × ${d.cm[1].toFixed(2)} cm`);
    dw.setLabel('lverdict', [20.0, PY - 1.9]);
    dw.setText('lverdict', d.onA4
      ? `fits on A4 ✓  (${(100 * d.cm[1] / A4[1]).toFixed(0)} % of its height)`
      : `does NOT fit on A4 ✗  (${(d.cm[1] / A4[1]).toFixed(2)} × too tall)`);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const w0 = panel.section('The design');
  panel.slider(w0, s, 'design', 'which frame', 0, 1, 1, refresh,
    (v) => (v ? '2 — the funicular gable' : '1 — the compact portal'));
  panel.toggle(w0, s, 'drawn', 'require the DRAWN 5.126 m, not the printed 5.0 m', refresh);
  panel.toggle(w0, s, 'a4', 'show the A4 comparison', refresh);
  panel.toggle(w0, s, 'flow', 'show the corner force flow', refresh);
  panel.toggle(w0, s, 'lbl', 'show labels', refresh);
  const w1 = panel.section('Design 1 — the compact portal');
  panel.slider(w1, s, 'span1', 'span (m)', 10.0, 20.0, 0.5, refresh);
  panel.slider(w1, s, 'hc1', 'clear height (m)', 4.0, 7.0, 0.1, refresh);
  panel.slider(w1, s, 'dep1', 'member depth (m)', 0.3, 2.0, 0.1, refresh);
  const w2 = panel.section('Design 2 — the funicular gable');
  panel.slider(w2, s, 'span2', 'span (m)', 12.0, 26.0, 0.5, refresh);
  panel.slider(w2, s, 'h2', 'crown height (m)', 6.0, 14.0, 0.5, refresh);
  const w3 = panel.section('Given (design level — no γ)');
  panel.slider(w3, s, 'Gd', 'G_d (kN)', 0, 80, 1, refresh);
  panel.slider(w3, s, 'Qd', 'Q_d (kN)', 0, 80, 1, refresh);

  refresh();
  return player;
}
