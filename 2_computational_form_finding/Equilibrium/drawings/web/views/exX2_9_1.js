/**
 * EX X · German task 9.1 — the thrust line, and the number the sheet forgot
 * Structural Design II, FS 23, "Additional Exercises", sheet page 7 (top).
 *
 * NUMBERING. The English sheet calls this block "Task 1"; the German sheet
 * calls it Aufgabe 9.1, and the German numbering is the correct one.
 *
 * TEXT (verbatim). "Draw a possible internal force flow for the reinforced
 * concrete frame with help of the thrust line. Draw the corresponding force
 * diagram and indicate tension forces with red, compression forces with blue
 * and reaction forces with green."
 *
 * GIVENS. a) a load labelled G_d · b) a load labelled Q_d. NEITHER CARRIES A
 * NUMBER, on this page or anywhere else in the booklet (error E5). Form
 * diagrams 1:100, force diagrams 1 cm ≙ 10 kN.
 *
 * That gap is what this view is built around: the load magnitude is the
 * SLIDER. Everything else is a fixed multiple of it, and those multiples are
 * exact, so the page is fully answerable the moment anyone supplies one number.
 * Nothing here invents a value — the slider is labelled for what it is.
 *
 * a) GEOMETRY, digitised. Origin = the bottom-left outer corner.
 *   outer (walking the outline) (0,0) (1.8217,0) (1.8217,3.6593) (4.0823,3.6593)
 *     (5.4661,5.0209) (5.5235,5.0209) (6.9072,3.6593) (9.1678,3.6593)
 *     (9.1678,0) (10.9895,0) (10.9895,5.4095) (0,5.4095)
 *   overall 10.9895 × 5.4095 m · both legs 1.8217 m wide · clear span 7.3461 m
 *   crown HINGE: circle centre (5.4948, 5.2176), diameter 0.200 m
 *   supports both PINNED, apexes at (0.1499, 0) and (10.8396, 0),
 *     spacing 10.6897 m · G_d vertical, DOWNWARD, at x = 5.4948
 *
 * a) ANSWERS. Two pinned bases plus the crown hinge = a THREE-HINGED frame, so
 * it is statically determinate and the thrust line must pass through all three
 * hinges. With G_d applied at the crown hinge and the frame symmetric:
 *   V_A = V_B = 0.5000 G_d
 *   half span support→crown = 5.4948 − 0.1499 = 5.3449 m; crown hinge height
 *   5.2176 m, so H = 0.5000 × 5.3449 / 5.2176 = 0.5122 G_d
 *   |R_A| = |R_B| = √(0.5000² + 0.5122²) = 0.7158 G_d at 44.31° above the
 *   horizontal, pointing inward and up.
 * check: 2 × 0.5000 G_d = G_d vertically, the two horizontal components
 * cancel, and the thrust line from (0.1499, 0) at 44.31° reaches x = 5.4948 at
 * y = 5.3449 × tan 44.31° = 5.2176 m — the crown hinge. Closes.
 *
 * b) GEOMETRY. Not a portal: a SOLID rectangular panel with the thrust line
 * drawn inside it.
 *   panel 0 … 9.4901 m × 0 … 4.6717 m
 *   hinge circle centre (4.7451, 4.5242), diameter 0.200 m, interrupting the
 *     top edge · supports both PINNED at (0.1499, 0) and (9.3401, 0)
 *   drawn thrust line T1 (0.2897, 0) → T2 (1.5512, 3.1576) → T3 (4.7163,
 *     4.3585) [hinge] T4 (4.7738, 4.2834) → T5 (9.1263, 0)
 *     segment directions +68.24°, +20.78°, −44.53°
 *   Q_d at x = 4.7450, pointing UPWARD — an uplift / suction case, drawn as
 *     the deliberate mirror of a)
 *
 * b) ANSWERS from the drawn directions. Resolving the two foot directions
 * against the vertical uplift Q_d:
 *   H = 0.2868 Q_d · |A| = 0.7731 Q_d (vertical part 0.7179 Q_d) ·
 *   |B| = 0.4023 Q_d (vertical part 0.2821 Q_d)
 * check: 0.7179 + 0.2821 = 1.0000 Q_d vertically; the horizontals cancel.
 * Because the load lifts, both supports have to HOLD THE PANEL DOWN.
 *
 * A REAL DEFECT IN b), drawn honestly rather than quietly fixed (error E16).
 * The given thrust line is NOT in equilibrium with a single vertical load at
 * x = 4.7450:
 *   (i)  the two foot directions, extended, concur at (2.7823, 6.2384) —
 *        outside the 4.6717 m tall panel and 1.96 m away from the load's line
 *        of action, whereas three coplanar forces must be concurrent;
 *   (ii) the line kinks at T2 (1.5512, 3.1576) from 68.24° to 20.78°, and a
 *        kink in a thrust line requires a force at that point. None is drawn.
 * So the figure is indicative, not a true funicular. The correct three-hinged
 * line for a load at the crown runs straight from each SUPPORT to the crown
 * hinge: (0.1499, 0) → (4.7451, 4.5242) is +44.56° and (9.3401, 0) → the same
 * point is −44.56° — perfectly symmetric, giving V = 0.5000 Q_d,
 * H = 0.5084 Q_d, |A| = |B| = 0.7129 Q_d. The sheet's right-hand segment
 * (−44.53°) is already that line to 0.03°; only the left-hand side, with its
 * spurious kink at T2, departs from it. The panel toggle draws both.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

const DEG = Math.PI / 180;

// ------------------------------------------------------------------- a) ----
const A_OUT = [[0, 0], [1.8217, 0], [1.8217, 3.6593], [4.0823, 3.6593],
               [5.4661, 5.0209], [5.5235, 5.0209], [6.9072, 3.6593],
               [9.1678, 3.6593], [9.1678, 0], [10.9895, 0], [10.9895, 5.4095],
               [0, 5.4095]];
const A_SUP = [[0.1499, 0], [10.8396, 0]];
const A_HINGE = [5.4948, 5.2176];
const A_LOADX = 5.4948;

// ------------------------------------------------------------------- b) ----
const B_OUT = [[0, 0], [9.4901, 0], [9.4901, 4.6717], [0, 4.6717]];
const B_SUP = [[0.1499, 0], [9.3401, 0]];
const B_HINGE = [4.7451, 4.5242];
const B_LOADX = 4.7450;
const B_T = [[0.2897, 0], [1.5512, 3.1576], [4.7163, 4.3585],
             [4.7738, 4.2834], [9.1263, 0]];

const MPU = 2.0, ORG = [-26, -13], SFD = 12;      // SFD: drawing units per G_d

/** Solve α·uA + β·uB + L = 0 for the two reaction magnitudes. */
function twoRays(uA, uB, L) {
  const det = uA[0] * uB[1] - uA[1] * uB[0];
  const a = (-L[0] * uB[1] + L[1] * uB[0]) / det;
  const b = (-uA[0] * L[1] + uA[1] * L[0]) / det;
  return [a, b];
}

function compute(s) {
  const c = Math.round(s.cas);
  const G = s.G;
  if (c === 0) {
    const uA = V.unit(V.sub(A_HINGE, A_SUP[0]));
    const uB = V.unit(V.sub(A_HINGE, A_SUP[1]));
    const [a, b] = twoRays(uA, uB, [0, -G]);
    const RA = V.mul(uA, a), RB = V.mul(uB, b);
    const half = A_HINGE[0] - A_SUP[0][0];
    return { c, G, uA, uB, RA, RB, half, hCrown: A_HINGE[1],
             H: Math.abs(RA[0]), Aabs: Math.hypot(...RA), Babs: Math.hypot(...RB),
             angA: (Math.atan2(RA[1], RA[0]) / DEG),
             thrust: [A_SUP[0], A_HINGE, A_SUP[1]],
             loadDir: -1, conc: A_HINGE, miss: 0, ok: true,
             out: A_OUT, sup: A_SUP, hinge: A_HINGE, loadx: A_LOADX,
             tag: 'a)', name: 'three-hinged portal frame, G_d down on the crown' };
  }
  // b): either the sheet's own drawn line, or the true three-hinged one
  const straight = !!s.fix;
  const uA = straight ? V.unit(V.sub(B_HINGE, B_SUP[0])) : V.unit(V.sub(B_T[1], B_T[0]));
  const uB = straight ? V.unit(V.sub(B_HINGE, B_SUP[1])) : V.unit(V.sub(B_T[3], B_T[4]));
  const [a, b] = twoRays(uA, uB, [0, G]);        // Q_d points UP
  const RA = V.mul(uA, a), RB = V.mul(uB, b);
  // where the two foot lines actually meet, and how far that is from the load
  const P = V.intersect(straight ? B_SUP[0] : B_T[0], uA,
                        straight ? B_SUP[1] : B_T[4], uB);
  const miss = P ? Math.abs(P[0] - B_LOADX) : Infinity;
  return { c, G, uA, uB, RA, RB, half: B_HINGE[0] - B_SUP[0][0], hCrown: B_HINGE[1],
           H: Math.abs(RA[0]), Aabs: Math.hypot(...RA), Babs: Math.hypot(...RB),
           angA: (Math.atan2(RA[1], RA[0]) / DEG),
           thrust: straight ? [B_SUP[0], B_HINGE, B_SUP[1]] : B_T,
           loadDir: +1, conc: P, miss, ok: miss < 0.01, straight,
           out: B_OUT, sup: B_SUP, hinge: B_HINGE, loadx: B_LOADX,
           tag: 'b)', name: straight ? 'the same panel with the CORRECT three-hinged line'
                                     : 'solid panel, Q_d lifting, thrust line given' };
}

const STEPS = [
  { t: 'The exercise', d: 'page 7 of the sheet: draw the internal force flow of a reinforced-concrete frame with the help of its thrust line, and draw the force diagram. Two cases — a) pressed down, b) lifted up' },
  { t: 'The number that is missing', d: 'the two loads are labelled G_d and Q_d and neither has a value, here or anywhere else in the sixteen pages. So nothing on this page is a number until you supply one. The slider is that number, and everything else is an exact multiple of it',
    detail: (d) => [`${d.tag} ${d.name}`,
                    `the sheet gives no magnitude; the view uses ${d.G.toFixed(0)} kN and reports every result both ways`,
                    'change it and every force below scales exactly with it'],
    take: 'the honest answer to “what is the tension?” on this page is “×G_d”. That is not a dodge, it is the whole content' },
  { t: 'Three hinges make it determinate', d: (d) => (d.c === 0
      ? 'two pinned feet plus the hinge at the crown: three hinges, so the frame is statically determinate and the thrust line has to pass through all three of them. That single sentence fixes the answer'
      : 'the same rule would apply here — two pinned feet and a hinge in the top edge — except that the sheet has already drawn a thrust line, and the drawn one does not obey it'),
    detail: (d) => [`the crown hinge is ${d.hCrown.toFixed(4)} m up, ${d.half.toFixed(4)} m in from the left support`,
                    `vertical parts ${(Math.abs(d.RA[1]) / d.G).toFixed(4)} and ${(Math.abs(d.RB[1]) / d.G).toFixed(4)} × the load`,
                    d.c === 0
                      ? `H = 0.5000 × ${d.half.toFixed(4)} / ${d.hCrown.toFixed(4)} = ${(d.H / d.G).toFixed(4)} G_d`
                      : `the true line would be ±${(Math.atan2(B_HINGE[1], B_HINGE[0] - B_SUP[0][0]) / DEG).toFixed(2)}°, symmetric`] },
  { t: 'The thrust line', d: (d) => (d.c === 0
      ? 'straight from each pin to the crown hinge. It is a line of pure compression: the whole frame is an arch with a kink in it, and the material only has to be where that line goes'
      : 'the sheet’s own line, reproduced exactly as drawn: up at 68.24° from the left foot, a kink at 3.16 m, then across at 20.78° to the hinge, and down at −44.53° to the right foot'),
    detail: (d) => [`|A| = ${(d.Aabs / d.G).toFixed(4)} ${d.c === 0 ? 'G_d' : 'Q_d'} = ${d.Aabs.toFixed(2)} kN at ${Math.abs(d.angA > 90 ? 180 - d.angA : d.angA).toFixed(2)}°`,
                    `|B| = ${(d.Babs / d.G).toFixed(4)} ${d.c === 0 ? 'G_d' : 'Q_d'} = ${d.Babs.toFixed(2)} kN`,
                    `H = ${(d.H / d.G).toFixed(4)} ${d.c === 0 ? 'G_d' : 'Q_d'} = ${d.H.toFixed(2)} kN`],
    take: (d) => (d.c === 1 && !d.straight
      ? 'and it is wrong. The next step says why'
      : d.c === 1 ? 'this is the line the geometry actually demands' : '') },
  { t: (d) => (d.c === 1 && !d.straight ? 'The drawn line is not in equilibrium'
    : 'The force diagram'),
    d: (d) => (d.c === 1 && !d.straight
      ? 'three coplanar forces must be concurrent. Extend the two foot directions and they meet at (2.78, 6.24) — outside the panel and 1.96 m from the load’s line of action. The line also kinks at T2, and a kink needs a force there; none is drawn. Tick “straighten it” in the panel to see the line the geometry demands'
      : 'right: the load laid off, and the two reaction directions closing the triangle. Every edge is parallel to its own line in the form diagram, which is what makes the drawing an answer rather than a picture'),
    detail: (d) => (d.c === 1 && !d.straight
      ? [`the two foot lines meet at (${d.conc[0].toFixed(4)}, ${d.conc[1].toFixed(4)})`,
         `the load acts at x = ${B_LOADX} — a miss of ${d.miss.toFixed(3)} m`,
         'the numbers above are still the honest consequence of the drawn directions; they are just not a valid funicular']
      : [`load ${d.G.toFixed(2)} kN, reactions ${d.Aabs.toFixed(2)} and ${d.Babs.toFixed(2)} kN`,
         `1 unit ≙ ${(d.G / SFD).toFixed(2)} kN in the force diagram`,
         d.c === 0 ? 'the triangle is isosceles because the frame is symmetric and the load is on its axis' : ''].filter(Boolean)) },
  { t: 'What one number would buy', d: 'give G_d a value and the page closes in two lines. That is the whole gap: the geometry is exact, the ratios are exact, and one printed kilonewton would have made every question on this page answerable',
    detail: (d) => [`a) V = 0.5000 G_d · H = 0.5122 G_d · |R| = 0.7158 G_d at 44.31°`,
                    `b) as drawn: H = 0.2868 Q_d · |A| = 0.7731 Q_d · |B| = 0.4023 Q_d`,
                    `b) straightened: H = 0.5084 Q_d · |A| = |B| = 0.7129 Q_d`],
    take: 'and the tension force that task 9.2 asks you to check against a 16 mm bar? It is a multiple of a number nobody printed' },
];

export const meta = {
  title: 'EX X · 9.1 — the thrust line, and the number the sheet forgot',
  subtitle: 'Structural Design II · sheet EX X “Additional Exercises”, page 7 (German task 9.1; the English sheet calls it “Task 1”)',
  about: 'Two reinforced-concrete frames with a hinge in the crown, one pressed down by G_d and one lifted by Q_d — and neither load has a number, on this page or anywhere in the booklet. Three hinges make the frame determinate, so every ratio is exact: 0.5122 G_d of thrust, 0.7158 G_d in each reaction. The missing number is the slider. Case b) also carries a real defect: the thrust line the sheet draws is not in equilibrium with its own load, because its two feet point at a place 1.96 m away from where the load acts. The view draws it as drawn, says what is wrong with it, and offers the line the geometry actually demands.',
  result: (d) => [
    `${d.tag} ${d.name} — the sheet prints NO value for ${d.c === 0 ? 'G_d' : 'Q_d'}; this view uses ${d.G.toFixed(0)} kN`,
    `vertical parts ${(Math.abs(d.RA[1]) / d.G).toFixed(4)} and ${(Math.abs(d.RB[1]) / d.G).toFixed(4)} × load · H = ${(d.H / d.G).toFixed(4)} × load = ${d.H.toFixed(2)} kN`,
    `|A| = ${(d.Aabs / d.G).toFixed(4)} × load = ${d.Aabs.toFixed(2)} kN · |B| = ${(d.Babs / d.G).toFixed(4)} × load = ${d.Babs.toFixed(2)} kN${d.c === 1 ? ' — both HOLD THE PANEL DOWN, because Q_d lifts' : ''}`,
    d.c === 0
      ? 'the thrust line passes through all three hinges, which is what makes a three-hinged frame determinate'
      : d.straight
        ? 'straightened: the true three-hinged line, ±44.56°, symmetric — the sheet’s right-hand segment already is it'
        : `AS DRAWN THIS IS NOT IN EQUILIBRIUM: the two foot lines meet ${d.miss.toFixed(3)} m away from the load’s line of action, and the line kinks at T2 with no force there`],
  frame: [[-28, -32], [34, 23]],
};

export function create(dw, panel, makePlayer) {
  const s = { cas: 0, G: 100, fix: false, lbl: true, _k: 99 };
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  const ux = (p) => [ORG[0] + p[0] * MPU, ORG[1] + p[1] * MPU];

  dw.label('form_title', '', { cls: 'title', flash: false });
  dw.label('force_title', 'Force diagram — the closing triangle', { cls: 'title', flash: false });
  dw.label('force_sub', '', { cls: 'point', flash: false });
  dw.label('note', '', { cls: 'point', flash: false, color: PAL.grey });
  dw.instant('form_title', 'force_title', 'force_sub', 'note');

  dw.poly('mat', 12, { intro: 1, color: PAL.grey, opacity: 0.12, z: -0.25, flash: false });
  dw.strokes('edge', 12, { intro: 1, w: dw.W.str, color: PAL.black });
  dw.instant('mat');
  dw.circle('hinge', { intro: 1, color: PAL.black });
  dw.label('lhinge', 'hinge', { cls: 'point', intro: 1, flash: false, color: PAL.grey });
  for (const n of ['L', 'R']) {
    dw.disk(`sup${n}`, { intro: 1, r: dw.W.disk });
    dw.strokes(`hat${n}`, 5, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
    dw.label(`lsup${n}`, n === 'L' ? 'A' : 'B', { cls: 'num', intro: 1, when: (st) => st.lbl });
  }
  dw.arrow('fG', { intro: 1, color: PAL.green, ...ARR });
  dw.label('lfG', '', { cls: 'num', intro: 1, color: PAL.green });
  dw.dashLine('laG', { intro: 1, color: PAL.grey, dash: dw.W.dash });

  // the thrust line: up to four segments (a) uses two)
  for (let i = 0; i < 4; i++) {
    dw.seg(`thr${i}`, { intro: 3, w: dw.W.bar,
      color: { pending: PAL.black, final: () => PAL.blue } });
  }
  dw.label('lthr', '', { cls: 'point', intro: 3, flash: false, color: PAL.blue });
  for (const n of ['L', 'R']) {
    dw.arrow(`re${n}`, { intro: 2, color: PAL.green, ...NARR });
    dw.label(`lre${n}`, '', { cls: 'num', intro: 2, color: PAL.green, when: (st) => st.lbl });
  }

  // b) only: the place where the two foot lines actually meet, and the miss
  const bad = (st, d) => !!d && d.c === 1 && !d.straight;
  dw.dashLine('exA', { intro: 4, color: PAL.grey, dash: dw.W.dash, when: bad });
  dw.dashLine('exB', { intro: 4, color: PAL.grey, dash: dw.W.dash, when: bad });
  dw.disk('conc', { intro: 4, r: dw.W.disk * 0.9, when: bad });
  dw.seg('miss', { intro: 4, w: dw.W.dim, color: PAL.red, flash: false, when: bad });
  dw.label('lmiss', '', { cls: 'num', intro: 4, color: PAL.red, flash: false, when: bad });

  // the force triangle
  dw.arrow('tG', { intro: 2, color: PAL.green, ...ARR });
  dw.seg('tA', { intro: 2, w: dw.W.bar, color: PAL.green });
  dw.seg('tB', { intro: 2, w: dw.W.bar, color: PAL.green });
  dw.label('ltG', '', { cls: 'num', intro: 2, color: PAL.green });
  dw.label('ltA', '', { cls: 'num', intro: 2, color: PAL.green, when: (st) => st.lbl });
  dw.label('ltB', '', { cls: 'num', intro: 2, color: PAL.green, when: (st) => st.lbl });
  dw.seg('tH', { intro: 2, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('ltH', '', { cls: 'point', intro: 2, flash: false, color: PAL.grey });
  dw.link('reL', 'tA', 'lreL', 'ltA');
  dw.link('reR', 'tB', 'lreR', 'ltB');
  dw.ghostable('tG', 'tA', 'tB');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);

    dw.setLabel('form_title', [-14, -16.4]);
    dw.setText('form_title', `${d.tag} — Form diagram 1:100`);
    dw.setLabel('force_title', [17, 21.4]);
    dw.setLabel('force_sub', [17, 19.8]);
    dw.setText('force_sub', `1 unit ≙ ${(d.G / SFD).toFixed(2)} kN — the sheet asks for 1 cm ≙ 10 kN and gives no load`);
    dw.setLabel('note', [-14, -18.2]);
    dw.setText('note', d.c === 0
      ? 'three hinges: two pins and the crown — statically determinate'
      : d.straight ? 'straightened to the true three-hinged line, ±44.56°'
      : `the drawn line misses equilibrium by ${d.miss.toFixed(3)} m and kinks at T2 with no force there`);

    // the concrete
    const ring = d.out.map(ux);
    const pad = ring.length < 12 ? [...ring, ...Array(12 - ring.length).fill(ring[0])] : ring;
    dw.setPoly('mat', pad);
    const ed = ring.map((p, i) => [p, ring[(i + 1) % ring.length]]);
    while (ed.length < 12) ed.push([ring[0], ring[0]]);
    dw.setStrokes('edge', ed);
    dw.setCircle('hinge', ux(d.hinge), 0.1 * MPU);
    dw.setLabel('lhinge', V.add(ux(d.hinge), [-8.2, 1.4]));
    const SL = ux(d.sup[0]), SR = ux(d.sup[1]);
    dw.setDisk('supL', SL); dw.setDisk('supR', SR);
    dw.setLabel('lsupL', V.add(SL, [-2.6, -1.6]));
    dw.setLabel('lsupR', V.add(SR, [2.6, -1.6]));
    for (const [n, p] of [['L', SL], ['R', SR]]) {
      dw.setStrokes(`hat${n}`, V.hatch([p[0] - 1.8, p[1] - 0.6], [p[0] + 1.8, p[1] - 0.6], -1, 0.95, 5));
    }
    // the load, on its own line of action
    const yTip = d.c === 0 ? d.hinge[1] + 0.35 : d.hinge[1] + 0.35;
    const tip = ux([d.loadx, yTip]);
    // 3.4 units, not 6: a longer downward load arrow — and its label — climb
    // into the step-caption card, whose lowest edge is y = 2.06
    const tail = [tip[0], tip[1] + (d.loadDir < 0 ? 3.4 : -12.0)];
    dw.setArrow('fG', tail, tip);
    dw.setLabel('lfG', [tip[0] + 6.6, tip[1] + (d.loadDir < 0 ? 2.4 : -1.6)]);
    dw.setText('lfG', `${d.c === 0 ? 'G_d' : 'Q_d'} = ${d.G.toFixed(0)} kN`);
    dw.setDashLine('laG', [[tip[0], tip[1] + 4.2], ux([d.loadx, -1.4])]);

    // the thrust line
    const tp = d.thrust.map(ux);
    for (let i = 0; i < 4; i++) {
      const a = tp[Math.min(i, tp.length - 1)];
      const b = tp[Math.min(i + 1, tp.length - 1)];
      dw.setSeg(`thr${i}`, a, b);
    }
    dw.setLabel('lthr', V.add(V.mid(tp[0], tp[1]), [-6.6, 0.6]));
    dw.setText('lthr', 'thrust line');
    // the reactions, pushed into the pins along their own lines
    for (const [n, p, R] of [['L', SL, d.RA], ['R', SR, d.RB]]) {
      const u = V.unit(R);
      dw.setArrow(`re${n}`, V.sub(p, V.mul(u, 5.2)), V.sub(p, V.mul(u, 1.2)));
      dw.setLabel(`lre${n}`, V.add(V.sub(p, V.mul(u, 5.2)), [n === 'L' ? -4.2 : 4.2, -1.0]));
      dw.setText(`lre${n}`, `${n === 'L' ? 'A' : 'B'} = ${Math.hypot(...R).toFixed(2)}`);
    }

    // b) as drawn: where the two foot lines really meet
    if (d.c === 1 && d.conc) {
      const P = ux(d.conc);
      dw.setDashLine('exA', [ux(B_T[0]), P]);
      dw.setDashLine('exB', [ux(B_T[4]), P]);
      dw.setDisk('conc', P);
      dw.setSeg('miss', P, ux([B_LOADX, d.conc[1]]));
      dw.setLabel('lmiss', V.add(V.mid(P, ux([B_LOADX, d.conc[1]])), [0, 1.6]));
      dw.setText('lmiss', `${d.miss.toFixed(3)} m off the load line`);
    }

    // the force triangle: the load laid off, then the two reaction directions
    const T = [13, d.loadDir < 0 ? 14 : 2];
    const pG = [T[0], T[1] + d.loadDir * SFD];
    dw.setArrow('tG', T, pG);
    dw.setLabel('ltG', V.add(V.mid(T, pG), [-7.6, 0]));
    dw.setText('ltG', `${d.c === 0 ? 'G_d' : 'Q_d'} = ${d.G.toFixed(0)}`);
    const pA = V.add(pG, V.mul(d.RA, SFD / d.G));
    dw.setSeg('tA', pG, pA);
    dw.setSeg('tB', pA, T);
    const sgn = pA[0] > T[0] ? 1 : -1;
    dw.setLabel('ltA', V.add(V.mid(pG, pA), [sgn * 4.4, -1.0]));
    dw.setLabel('ltB', V.add(V.mid(pA, T), [sgn * 4.4, 1.0]));
    dw.setText('ltA', `A = ${d.Aabs.toFixed(2)}`);
    dw.setText('ltB', `B = ${d.Babs.toFixed(2)}`);
    const hy = T[1] - d.loadDir * 2.6;
    dw.setSeg('tH', [T[0], hy], [pA[0], hy]);
    dw.setLabel('ltH', [(T[0] + pA[0]) / 2, hy - d.loadDir * 1.4]);
    dw.setText('ltH', `H = ${d.H.toFixed(2)} kN = ${(d.H / d.G).toFixed(4)} × load`);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const sec = panel.section('The case');
  panel.slider(sec, s, 'cas', 'frame', 0, 1, 1, refresh,
    (v) => (v < 0.5 ? 'a) portal frame, G_d pressing down'
                    : 'b) solid panel, Q_d lifting'));
  panel.toggle(sec, s, 'fix', 'b): straighten the thrust line to the true one', refresh);
  panel.toggle(sec, s, 'lbl', 'show labels', refresh);
  const g = panel.section('Given — except that it is not');
  panel.slider(g, s, 'G', 'G_d / Q_d (kN) — THE SHEET PRINTS NO VALUE', 10, 200, 5, refresh,
    (v) => `${v.toFixed(0)} kN — your number, not the sheet’s`);

  refresh();
  return player;
}
