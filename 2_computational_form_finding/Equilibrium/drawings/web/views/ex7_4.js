/**
 * EX 7 · Creative — Open-Air Cinema
 * Structural Design II, FS 23 (sheet EX 7 "Beams", page 3).
 *
 * "For an open-air cinema, a roof is to be designed that protects the
 * spectators in the stands from rain. The roofing should protect the entire
 * area under the given load and must not protrude into the spectators' viewing
 * area. In addition, the top of the roof shall have a minimum inclination of
 * 15°. The roofing is to be supported on a series of parallel beams, which in
 * turn are supported on two supports.
 * Design the form of such a bearing beam in the form diagram. Find a possible
 * internal force flow with the aid of the force diagram. Indicate tension
 * forces with red, compression forces with blue and reaction forces with green."
 *
 * Digitised at the stated 1:100, origin at the left bearing:
 *   load band  0.000 → 17.995 m, i.e. 18.00 m of roof to carry
 *   bearings   PIN at (0.000, 0.000) and ROLLER at (5.999, 0.000) — 6.00 m
 *              apart and at the same level, on two 0.50 m columns
 *   ground     y = −4.216 m, stand platform y = −2.000 m out to x = 7.563,
 *              then five steps down to (10.762, −4.216)
 *   spectator  eye at (8.190, −1.657), with two dashed sight lines fanning
 *              from it at +30.3° and −9.2°
 *
 * g_d = 7.5 kN/m is the only load value printed. (A q_d = 2.5 kN/m label
 * exists in the PDF's text layer, twice, in BOTH languages, but is never
 * rendered and the task never mentions it — so 7.5 is the given, and 10.0 is
 * offered here as a toggle rather than assumed.)
 *
 * The heart of the task: the 18 m of roof has its resultant at x = 9.000 m,
 * which is 3.000 m PAST the roller. So the left bearing is in net UPLIFT —
 * R_A = −67.50 kN, pulling DOWN on the beam, and R_B = +202.50 kN. A "pin" on
 * top of a column that has to hold the beam down is an anchor, not a bearing,
 * and that is the detail the whole design turns on.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

const SPANLOAD = 18, XB = 6.0;
const MPU = 1.75;
const OX = -18, OY = 1.0;               // the left bearing
const GY = -4.216, PLAT = -2.0;
const EYE = [8.190, -1.657];
const UP = Math.tan((30.3 * Math.PI) / 180);
const DN = Math.tan((-9.2 * Math.PI) / 180);
const SFD = 14;
const LLX = 12, LLY = 6;
const NSEG = 48;

const DEFAULTS = {
  // the sheet prints g_d = 7.5 kN/m but DRAWS a second bar as well, and its
  // force diagram is built on the sum: 10.0 kN/m is the official load case
  q: 7.5, snow: true,
  tip: 5.6,                             // m, the roof tip above the bearings
  dep: 1.4,                             // m, the beam depth
  lbl: true, _k: 99,
};
const FLOW = 4;

const sight = (x) => EYE[1] + UP * (x - EYE[0]);

const STEPS = [
  { t: 'The exercise', d: 'the Creative task: roof an open-air cinema. Cover all eighteen metres, keep out of the spectators’ view, slope the top at least 15° so the rain runs off — and land it on just two columns' },
  { t: 'What is given', d: 'left: the stand, the spectator, and the two dashed lines that bound what they must be able to see. The two columns are only six metres apart, so twelve metres of roof hang off the end',
    detail: (d, st) => [`g_d = ${st.q} kN/m over ${SPANLOAD} m → ${d.tot.toFixed(1)} kN`,
                        'bearings: PIN at 0.000 m and ROLLER at 6.000 m, both at the same level',
                        'the sight lines fan from the eye at (8.19, −1.66) m at +30.3° and −9.2°'] },
  { t: 'Where the load actually sits', d: 'eighteen metres of roof puts its resultant at nine metres — three metres BEYOND the roller. That single fact decides everything about the supports',
    detail: (d) => [`R = ${d.tot.toFixed(1)} kN at x = ${(SPANLOAD / 2).toFixed(3)} m`,
                    `the roller is at ${XB.toFixed(3)} m, so the resultant is ${(SPANLOAD / 2 - XB).toFixed(3)} m past it`],
    take: 'a resultant outside the supports always lifts the far one' },
  { t: 'The left support has to pull DOWN', d: 'right: the reactions. The roller becomes a fulcrum and the pin at the near end is lifted — so it has to be anchored into its column, not merely rested on it',
    detail: (d) => [`R_A = ${d.RA.toFixed(2)} kN — negative, i.e. ${Math.abs(d.RA).toFixed(2)} kN DOWNWARD`,
                    `R_B = +${d.RB.toFixed(2)} kN up`,
                    `ΣV: ${d.RA.toFixed(1)} + ${d.RB.toFixed(1)} = ${d.tot.toFixed(1)} kN ✓`],
    take: 'the drawing shows that arrow pointing down; a bearing detailed the usual way would simply lift off' },
  { t: 'Now the roof itself', d: 'left: drag the tip and the depth. Three things have to hold at once — the underside must stay clear of the upper sight line, the top must slope at least 15°, and the whole eighteen metres must be covered',
    detail: (d) => [`top slope ${d.slope.toFixed(1)}° — ${d.slopeOK ? 'meets the 15° minimum ✓' : 'BELOW the 15° minimum ✗'}`,
                    `clearance to the sight line ${d.clear >= 0 ? '+' : ''}${d.clear.toFixed(2)} m — ${d.clear >= 0 ? 'clear of the viewing wedge ✓' : 'INSIDE the viewing wedge ✗'}`,
                    `covers 0 to ${SPANLOAD.toFixed(2)} m ✓`] },
  { t: 'The force flow', d: 'the beam hogs over the whole of its length — there is no sagging span at all, only a twelve-metre cantilever with a short back-span. So the TOP chord is the tension one everywhere, and the tie runs along the top',
    detail: (d) => [`largest moment ${Math.abs(d.Mmax).toFixed(1)} kNm, over the roller`,
                    `with a ${d.dep.toFixed(2)} m depth the chords carry ${(Math.abs(d.Mmax) / d.dep).toFixed(1)} kN`,
                    'deepen the beam and that number falls in proportion'],
    take: 'the deepest part of a cantilever belongs where the moment is, at the support — not at the tip' },
  { t: 'What the design costs', d: 'every one of the three constraints pushes the same way: a steeper roof clears the view and sheds the rain, but it also puts more material further out and more uplift on the anchor. There is no free choice here, only a balance',
    detail: (d) => [`anchor force at A: ${Math.abs(d.RA).toFixed(1)} kN, holding down`,
                    `column force at B: ${d.RB.toFixed(1)} kN, pushing down into the ground`,
                    `chord force ${(Math.abs(d.Mmax) / d.dep).toFixed(1)} kN at a ${d.dep.toFixed(2)} m depth`],
    take: 'the sight lines are a structural constraint, not an architectural one — they set where the beam may be' },
];

function compute(s) {
  const q = s.snow ? 10.0 : s.q;
  const tot = q * SPANLOAD;
  const xR = SPANLOAD / 2;
  const RB = (tot * xR) / XB;
  const RA = tot - RB;
  const M = (x) => {
    let m = 0;
    if (x > 0) m += RA * x;
    if (x > XB) m += RB * (x - XB);
    return m - (q * x * x) / 2;
  };
  let Mmax = 0;
  for (let i = 0; i <= 2000; i++) {
    const v = M((SPANLOAD * i) / 2000);
    if (Math.abs(v) > Math.abs(Mmax)) Mmax = v;
  }
  // the roof: underside horizontal over the columns, then straight to the tip
  const xk = Math.max(XB + 0.5, EYE[0] + (0 - EYE[1]) / UP);   // where the sight line crosses 0
  const under = (x) => (x <= xk ? 0 : ((x - xk) / (SPANLOAD - xk)) * s.tip);
  const top = (x) => under(x) + s.dep;
  const slope = (Math.atan2(s.tip, SPANLOAD - xk) * 180) / Math.PI;
  const slopeOK = slope >= 15;
  let clear = Infinity;
  for (let i = 0; i <= 200; i++) {
    const x = (SPANLOAD * i) / 200;
    if (x < EYE[0]) continue;
    clear = Math.min(clear, under(x) - sight(x));
  }
  const xs = Array.from({ length: NSEG + 1 }, (_, i) => (SPANLOAD * i) / NSEG);
  const H = Math.abs(Mmax) / s.dep || 1;
  const thrust = xs.map((x) => [x, M(x) / H]);
  return { q, tot, xR, RA, RB, Mmax, xk, under, top, slope, slopeOK, clear,
           xs, thrust, dep: s.dep, tip: s.tip, H };
}

const ux = (m) => OX + m * MPU;
const uy = (m) => OY + m * MPU;

export const meta = {
  title: 'EX 7 Creative — a roof for an open-air cinema',
  subtitle: 'Structural Design II · sheet EX 7 “Beams”, Creative task',
  about: 'Eighteen metres of roof on two columns six metres apart, over a grandstand whose spectators have to be able to see the screen. Three constraints pull against each other: cover everything, stay out of the sightlines, slope the top at least fifteen degrees. And because the resultant lands three metres past the roller, the near support has to hold the beam DOWN — an anchor rather than a bearing, which is the detail this whole design turns on.',
  result: (d) => [
    `R_A = ${d.RA.toFixed(2)} kN — ${d.RA < 0 ? 'DOWNWARD, the pin is an anchor' : 'upward'} · R_B = +${d.RB.toFixed(2)} kN`,
    `top slope ${d.slope.toFixed(1)}° ${d.slopeOK ? '✓' : '✗ below the 15° minimum'} · sight-line clearance ${d.clear >= 0 ? '+' : ''}${d.clear.toFixed(2)} m ${d.clear >= 0 ? '✓' : '✗'}`,
    `largest moment ${Math.abs(d.Mmax).toFixed(0)} kNm over the roller → chords ${(Math.abs(d.Mmax) / d.dep).toFixed(0)} kN at a ${d.dep.toFixed(2)} m depth`],
  frame: [[-22, -26], [30, 37]],
};

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const ARR = dw.W.arrow, NARR = dw.W.narrow;

  dw.label('form_title', 'Form diagram 1:100', { cls: 'title', flash: false });
  dw.label('force_title', 'Force diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { cls: 'point', flash: false });

  // the stand
  dw.seg('ground', { intro: 1, w: dw.W.bar, color: PAL.black, flash: false });
  dw.strokes('gHatch', 20, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.poly('stand', 4, { intro: 1, opacity: 1.0, z: -0.6, color: 0xe7e7ea, flash: false });
  dw.strokes('steps', 10, { intro: 1, w: dw.W.thin, color: PAL.grey, flash: false });
  dw.disk('eye', { intro: 1, r: dw.W.disk * 0.8 });
  dw.label('leye', 'spectator', { cls: 'point', intro: 1, flash: false, color: PAL.grey });
  dw.dashLine('sightU', { intro: 1, color: PAL.grey, dash: dw.W.dash });
  dw.dashLine('sightD', { intro: 1, color: PAL.grey, dash: dw.W.dash });
  dw.label('lsight', 'the view that must stay clear', { cls: 'point', intro: 1,
    flash: false, color: PAL.grey, when: (st) => st.lbl });
  for (const n of ['A', 'B']) {
    dw.poly(`col${n}`, 4, { intro: 1, opacity: 1.0, z: -0.5, color: 0xd6d6da, flash: false });
    dw.disk(`sup${n}`, { intro: 1, r: dw.W.disk });
    dw.label(`lsup${n}`, n, { cls: 'num', intro: 1, when: (st) => st.lbl });
  }
  dw.seg('rollB', { intro: 1, w: dw.W.thin, color: PAL.grey, flash: false });
  dw.seg('qbar', { intro: 1, w: dw.W.thin, color: PAL.green });
  dw.arrows('qarr', 25, { intro: 1, w: dw.W.thin, color: PAL.green,
    headLen: dw.W.narrow.headLen * 0.8, headW: dw.W.narrow.headW * 0.8 });
  dw.label('lq', '', { cls: 'num', intro: 1, color: PAL.green, when: (st) => st.lbl });

  dw.dashLine('Rline', { intro: 2, color: PAL.grey, dash: dw.W.dash });
  dw.dashArrow('Rform', { intro: 2, color: PAL.green, w: dw.W.arrow.w * 1.15,
    headLen: dw.W.arrow.headLen, headW: dw.W.arrow.headW, dash: dw.W.dash * 1.6, flash: false });
  dw.dashArrow('Rforce', { intro: 2, color: PAL.green, w: dw.W.arrow.w * 1.15,
    headLen: dw.W.arrow.headLen, headW: dw.W.arrow.headW, dash: dw.W.dash * 1.6, flash: false });
  dw.label('lRform', 'R', { cls: 'num', intro: 2, color: PAL.green });
  dw.label('lRforce', 'R', { cls: 'num', intro: 2, color: PAL.green });
  dw.link('Rform', 'Rforce', 'lRform', 'lRforce');

  for (const n of ['A', 'B']) {
    dw.arrow(`re${n}`, { intro: 3, color: PAL.green, ...ARR });
    dw.arrow(`fre${n}`, { intro: 3, color: PAL.green, ...ARR });
    dw.label(`lre${n}`, '', { cls: 'num', intro: 3, color: PAL.green });
    dw.link(`re${n}`, `fre${n}`, `lre${n}`);
  }
  // the roof beam
  dw.poly('roof', 2 * (NSEG + 1), { intro: FLOW, opacity: 1.0, z: -0.4,
    color: 0xeef0f4, flash: false });
  dw.strokes('rtop', NSEG, { intro: FLOW, w: dw.W.bar, color: PAL.red });
  dw.strokes('rbot', NSEG, { intro: FLOW, w: dw.W.bar, color: PAL.blue });
  dw.label('lslope', '', { cls: 'num', intro: FLOW, flash: false,
    color: { final: (dd) => (dd.slopeOK ? PAL.green : PAL.red) } });
  dw.label('lclear', '', { cls: 'num', intro: FLOW, flash: false,
    color: { final: (dd) => (dd.clear >= 0 ? PAL.green : PAL.red) } });
  dw.strokes('thrust', NSEG, { intro: 5, w: dw.W.bar, color: PAL.blue });
  dw.label('lthr', '', { cls: 'num', intro: 5, flash: false, color: PAL.blue });

  dw.instant('form_title', 'force_title', 'force_sub');
  dw.ghostable('Rforce', 'freA', 'freB');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    dw.setLabel('form_title', [4, -15.4]);
    dw.setLabel('force_title', [19, -13.0]);
    dw.setLabel('force_sub', [19, -14.4]);
    dw.setText('force_sub', `1 unit ≙ ${SFD} kN  (sheet: 1 cm ≙ 20 kN)`);

    dw.setSeg('ground', [ux(-2.5), uy(GY)], [ux(20.5), uy(GY)]);
    dw.setStrokes('gHatch', V.hatch([ux(-2.4), uy(GY)], [ux(20.5), uy(GY)], 1, 1.0, 20));
    dw.setPoly('stand', [[ux(-0.25), uy(GY)], [ux(7.563), uy(GY)],
                         [ux(7.563), uy(PLAT)], [ux(-0.25), uy(PLAT)]]);
    dw.setStrokes('steps', Array.from({ length: 10 }, (_, i) => {
      const t = Math.floor(i / 2), up = i % 2 === 0;
      const x0 = 7.563 + t * 0.641, y0 = PLAT - t * 0.443;
      return up ? [[ux(x0), uy(y0)], [ux(x0), uy(y0 - 0.443)]]
        : [[ux(x0), uy(y0 - 0.443)], [ux(x0 + 0.641), uy(y0 - 0.443)]];
    }));
    dw.setDisk('eye', [ux(EYE[0]), uy(EYE[1])]);
    dw.setLabel('leye', [ux(EYE[0]) - 0.6, uy(EYE[1]) - 1.9]);
    dw.setDashLine('sightU', [[ux(EYE[0]), uy(EYE[1])], [ux(19.5), uy(sight(19.5))]]);
    dw.setDashLine('sightD', [[ux(EYE[0]), uy(EYE[1])],
                              [ux(19.5), uy(EYE[1] + DN * (19.5 - EYE[0]))]]);
    dw.setLabel('lsight', [ux(16.5), uy(sight(16.5)) - 2.6]);

    for (const [n, x] of [['A', 0], ['B', XB]]) {
      dw.setPoly(`col${n}`, [[ux(x - 0.25), uy(PLAT)], [ux(x + 0.25), uy(PLAT)],
                             [ux(x + 0.25), uy(0)], [ux(x - 0.25), uy(0)]]);
      dw.setDisk(`sup${n}`, [ux(x), uy(0)]);
      dw.setLabel(`lsup${n}`, [ux(x) - 1.8, uy(0) + 1.0]);
    }
    dw.setSeg('rollB', [ux(XB) - 1.6, uy(0) - 1.1], [ux(XB) + 1.6, uy(0) - 1.1]);

    const qy = uy(d.top(SPANLOAD)) + 3.4;
    dw.setSeg('qbar', [ux(0), qy], [ux(SPANLOAD), qy]);
    dw.setArrows('qarr', Array.from({ length: 25 }, (_, i) => {
      const x = ux((SPANLOAD * i) / 24);
      return [[x, qy], [x, qy - 1.1]];
    }));
    dw.setLabel('lq', [ux(SPANLOAD) + 4.0, qy]);
    dw.setText('lq', `g_d = ${d.q} kN/m`);

    dw.setDashLine('Rline', [[ux(d.xR), qy + 1.4], [ux(d.xR), uy(GY) - 1.0]]);
    dw.setDashArrow('Rform', [ux(d.xR), qy - 1.6], [ux(d.xR), qy - 1.6 - d.tot / SFD]);
    dw.setLabel('lRform', [ux(d.xR) + 2.8, qy - 1.6 - d.tot / SFD / 2]);
    dw.setDashArrow('Rforce', [LLX, LLY], [LLX, LLY - d.tot / SFD]);
    dw.setLabel('lRforce', [LLX - 2.8, LLY - d.tot / SFD / 2]);

    for (const [n, x, v] of [['A', 0, d.RA], ['B', XB, d.RB]]) {
      const p = [ux(x), uy(0)];
      const len = Math.abs(v) / SFD;
      const tail = v >= 0 ? [p[0], p[1] - 1.2 - len] : [p[0], p[1] - 1.2];
      const tip = v >= 0 ? [p[0], p[1] - 1.2] : [p[0], p[1] - 1.2 - len];
      dw.setArrow(`re${n}`, tail, tip);
      dw.setLabel(`lre${n}`, [p[0] + (n === 'A' ? -4.4 : 4.4), p[1] - 1.6 - len / 2]);
      dw.setText(`lre${n}`, `${n} = ${v >= 0 ? '' : '−'}${Math.abs(v).toFixed(1)}`);
      const bx = LLX + (n === 'A' ? -3.2 : 3.2);
      dw.setArrow(`fre${n}`, [bx, LLY - d.tot / SFD], [bx, LLY - d.tot / SFD + v / SFD]);
    }

    // the roof, as a wedge of the chosen depth
    const bot = d.xs.map((x) => [ux(x), uy(d.under(x))]);
    const topL = d.xs.map((x) => [ux(x), uy(d.top(x))]);
    dw.setPoly('roof', [...topL, ...bot.slice().reverse()]);
    dw.setStrokes('rtop', Array.from({ length: NSEG }, (_, i) => [topL[i], topL[i + 1]]));
    dw.setStrokes('rbot', Array.from({ length: NSEG }, (_, i) => [bot[i], bot[i + 1]]));
    dw.setLabel('lslope', [ux(15.0), uy(d.top(15.0)) + 2.2]);
    dw.setText('lslope', `top slope ${d.slope.toFixed(1)}° ${d.slopeOK ? '✓' : '✗ needs 15°'}`);
    dw.setLabel('lclear', [ux(13.5), uy(d.under(13.5)) - 2.4]);
    dw.setText('lclear', `${d.clear >= 0 ? '+' : ''}${d.clear.toFixed(2)} m clear of the view ${d.clear >= 0 ? '✓' : '✗'}`);

    // the thrust line, hanging below the top chord because the beam hogs
    const TP = d.thrust.map(([x, y]) => [ux(x), uy(d.top(x) + y)]);
    dw.setStrokes('thrust', Array.from({ length: NSEG }, (_, i) => [TP[i], TP[i + 1]]));
    dw.setLabel('lthr', V.add(TP[Math.round(NSEG * 0.34)], [0, -2.2]));
    dw.setText('lthr', `thrust line · ${(Math.abs(d.Mmax) / d.dep).toFixed(0)} kN in the chords`);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);
  const des = panel.section('Your roof');
  panel.slider(des, s, 'tip', 'height at the tip (m)', 1.0, 9.0, 0.1, refresh);
  panel.slider(des, s, 'dep', 'beam depth (m)', 0.5, 3.0, 0.05, refresh);
  panel.toggle(des, s, 'lbl', 'show labels', refresh);
  const giv = panel.section('Given');
  panel.slider(giv, s, 'q', 'g_d (kN/m)', 4, 15, 0.5, refresh);
  panel.toggle(giv, s, 'snow', 'the second load bar the sheet draws (10.0 kN/m total)', refresh);

  refresh();
  return player;
}
