/**
 * EX 4 · Creative — Cathedral
 * Structural Design I, HS 22 (sheet EX 4 "Arch structures", page 3).
 *
 * "Complete the given cross section of the vault of the main nave of a
 * cathedral with your own design of side naves and supporting walls. Draw the
 * inner force flow in the construction with help of the force diagram and
 * adjust your design if necessary. The forces have to be led into the ground
 * through the structure. Keep in mind that a stone construction works in
 * compression only.
 *   a) The inner force flow in the vault of the main nave is already given.
 *      First, find the geometry of the vault of the left side nave. Take into
 *      account the vertical walls inbetween the main and the side nave which
 *      define that the inner force has to be transferred vertically to the
 *      supports.
 *   b) Then coordinate the geometry of the left supporting wall with the
 *      external force F₁d, which you can freely choose.
 *   c) Apply the same procedure to design the structure of the right side nave."
 *
 * (The sheet's text says F₁d while its drawing labels the buttress weights
 * G₁d and G₂d — the same slip is in the German original. They are the same
 * force.)
 *
 * Digitised at the stated 1:100, origin at the left buttress axis on the
 * ground: pier axes at 5.000 and 10.000 m, buttress axes at 0.000 and
 * 15.000 m, nave centre 7.500 m, springing level 6.956 m. g₁d = 160 kN/m
 * over the 5 m nave, g₂d = g₃d = 80 kN/m over each 5 m aisle.
 *
 * R₁d = 800 kN is NOT an extra load: 160 kN/m × 5.000 m = 800 kN exactly, the
 * force-diagram vector measures exactly 8.0000 cm at the stated 1 cm ≙ 100 kN,
 * and the given thrust line is a pure parabola with no kink at the crown —
 * all three only make sense if R₁d is g₁d's resultant.
 *
 * The vault outline is a two-centred pointed arch whose centres sit exactly on
 * the PIER AXES: intrados radius 4.650 m about (5.000, 6.956) and (10.000,
 * 6.956), which reproduces the drawn apex at 10.877 m to three decimals.
 *
 * The sheet prints no answers. Derived here:
 *   the given nave thrust line rises 4.398 m, so H = M/f = 500/4.3983 =
 *   113.68 kN and each springing takes 400 kN down — a reaction of 415.8 kN
 *   leaning only 15.86° off vertical, which is the whole point of a pointed
 *   vault.
 *   a) The pier may only be pushed vertically, so the aisle vault has to
 *      cancel that thrust exactly: H_aisle = 113.68 kN. Its load is
 *      80 × 5 = 400 kN, so f = 250/113.68 = 2.199 m — exactly HALF the nave's
 *      rise, since it carries half the load at the same thrust. The pier head
 *      then takes 600 kN straight down.
 *   b) At the buttress head the aisle delivers 200 kN down and 113.68 kN
 *      outward, 6.956 m above the base, i.e. 790.8 kNm of overturning. The
 *      resultant stays inside a base of width b only while
 *      G₁d ≥ 1581.6/b − 200 kN. The drawn 0.70 m pinnacle cannot do it at any
 *      sane weight — which is exactly the "adjust your design if necessary"
 *      the task asks for.
 *   c) is the mirror image, with identical numbers.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

export const meta = {
  title: 'EX 4 Creative — a cathedral that stands up',
  subtitle: 'Structural Design I · sheet EX 4 “Arch structures”, Creative task a)–c)',
  about: 'The nave vault is given; everything holding it up is yours to design. Stone only works in compression, so the whole job is keeping one line of thrust inside the masonry all the way to the ground. The pier between nave and aisle can only be pushed straight down, and that single condition fixes how deep the aisle vault has to be. Then the buttress has to turn a sideways shove into a vertical one — drag its width and its weight until the thrust line stays inside it.',
  result: (d) => [`the given nave vault: H = ${d.Hn.toFixed(2)} kN, 400 kN per springing → ${d.Rspring.toFixed(1)} kN at ${d.angN.toFixed(2)}° off vertical`,
                  `a) the aisle vault must match that thrust → rise f = ${d.fa.toFixed(3)} m; the pier head then takes ${d.pier.toFixed(0)} kN straight down`,
                  d.ok ? `b) buttress ${d.b.toFixed(2)} m wide with G = ${d.G.toFixed(0)} kN: the thrust line lands ${d.inside.toFixed(2)} m inside the base — IT STANDS`
                       : `b) buttress ${d.b.toFixed(2)} m wide with G = ${d.G.toFixed(0)} kN: the thrust line falls ${(-d.inside).toFixed(2)} m OUTSIDE the base — it overturns`],
  frame: [[-25, -22], [25, 18]],
};

const MPU = 1.00;                     // drawing units per metre (1:100 sheet)
const OX = -20, GY = -13.2;           // metre-zero, and the ground line
const PIER = [5.0, 10.0];             // pier axes, m
const BUT = [0.0, 15.0];              // buttress axes, m
const SPR = 6.956;                    // springing level, m
const RISE_N = 4.398;                 // the given nave thrust line's rise, m
const G1 = 160, G2 = 80;              // kN/m over the nave and each aisle
const NAVE = 5.0, AISLE = 5.0;        // m
const SFD = 45;                       // kN per drawing unit
const LLX = 6, LLY = 9;
const NSEG = 22;

const DEFAULTS = {
  b: 3.0,                             // m — the buttress base width (your design)
  G: 420,                             // kN — the buttress weight (your design)
  auto: true,                         // aisle rise solved, or dragged
  fa: 2.199,
  lbl: true, _k: 99,
  o1: true, sIF: 0.0013,
};

const SHAPED = 3;

const ux = (m) => OX + m * MPU;
const uy = (m) => GY + m * MPU;

const STEPS = [
  { t: 'The exercise', d: 'the Creative task: the nave vault of a cathedral is given, and everything that holds it up is yours. Stone only pushes, so the thrust line has to stay inside the masonry the whole way down' },
  { t: 'What is given', d: 'left: the section — two piers, the pointed nave vault, and the loads. The blue line inside the vault is the thrust line the sheet hands you, and it is a parabola, so the 160 kN/m above it is all it carries',
    detail: () => [`g₁d = ${G1} kN/m over the ${NAVE} m nave → R₁d = ${G1 * NAVE} kN, exactly the sheet's printed value`,
                   `g₂d = g₃d = ${G2} kN/m over each ${AISLE} m aisle`] },
  { t: 'What the nave pushes with', d: 'right: the nave’s own force triangle. 400 kN down at each springing, and a thrust read off the given rise. It is remarkably small — a pointed arch is steep where it meets the pier, so it barely pushes sideways',
    detail: (d) => [`H = q·L²/(8f) = ${d.Hn.toFixed(2)} kN · each springing ${d.Rspring.toFixed(1)} kN, only ${d.angN.toFixed(2)}° off vertical`],
    take: 'the pointed arch was not a style decision — it is how you keep the thrust nearly vertical' },
  { t: 'a) The aisle vault, from one condition', d: 'the pier between nave and aisle is a thin wall: it can carry weight straight down but nothing sideways. So whatever the nave pushes with, the aisle has to push back with exactly the same — and that fixes the aisle vault’s depth completely',
    detail: (d) => [`required H = ${d.Hn.toFixed(2)} kN · aisle load ${G2 * AISLE} kN → V = ${(G2 * AISLE / 2).toFixed(0)} kN`,
                    `f = M/H = ${(G2 * AISLE * AISLE / 8).toFixed(1)}/${d.Hn.toFixed(2)} = ${d.fa.toFixed(3)} m`,
                    `half the load at the same thrust, so exactly half the nave's rise`] },
  { t: 'a) The pier is quiet', d: 'left: at the pier head the two thrusts arrive pointing at each other and cancel. What is left goes straight down the pier into the ground — which is why the pier can be as thin as it is',
    detail: (d) => [`pier head: ${(G1 * NAVE / 2).toFixed(0)} + ${(G2 * AISLE / 2).toFixed(0)} = ${d.pier.toFixed(0)} kN vertical, 0 kN horizontal`] },
  { t: 'b) The buttress has a problem', d: 'at the outer end there is nothing to push back. The aisle arrives with 113.68 kN of sideways push almost seven metres above the ground, and that is a large overturning moment for a thin wall to swallow',
    detail: (d) => [`${(G2 * AISLE / 2).toFixed(0)} kN down and ${d.Hn.toFixed(2)} kN outward, ${SPR.toFixed(2)} m up → ${(d.Hn * SPR).toFixed(0)} kNm of overturning`] },
  { t: 'b) Weight is the answer', d: 'the only thing that turns a sideways push into a vertical one is weight. Add enough of it, over a wide enough base, and the thrust line bends down inside the masonry. Drag the width and the weight and watch the line move',
    detail: (d) => [`G₁d ≥ ${(d.Hn * SPR * 2).toFixed(0)}/b − ${(G2 * AISLE / 2).toFixed(0)} kN · at b = ${d.b.toFixed(2)} m that is ${d.Gmin.toFixed(0)} kN, and you have ${d.G.toFixed(0)}`,
                    `the resultant lands ${d.e.toFixed(2)} m off the axis, ${d.ok ? 'inside' : 'OUTSIDE'} the ${(d.b / 2).toFixed(2)} m half-width`],
    take: 'a pinnacle is not decoration — it is ballast, and the drawn 0.70 m one is nowhere near enough' },
  { t: 'c) And the same on the right', d: 'the right side is the mirror image and the numbers are identical. Every force in the building now has a continuous path of compression from the vault to the ground, which is all a stone cathedral ever needed',
    detail: (d) => [`the same ${d.fa.toFixed(3)} m rise, the same ${d.pier.toFixed(0)} kN at the pier head · ${(G1 * NAVE + 2 * G2 * AISLE).toFixed(0)} kN of roof in total`],
    take: 'every arch needs something to lean on, and the whole plan of a gothic cathedral is that argument worked outward' },
];

function compute(s) {
  const Rn = G1 * NAVE;                          // 800 kN
  const Hn = (G1 * NAVE * NAVE) / (8 * RISE_N);  // 113.68 kN
  const Vn = Rn / 2;
  const Rspring = Math.hypot(Hn, Vn);
  const angN = (Math.atan2(Hn, Vn) * 180) / Math.PI;
  const Ra = G2 * AISLE;                         // 400 kN
  const Va = Ra / 2;
  const fa = s.auto ? (G2 * AISLE * AISLE / 8) / Hn : s.fa;
  const Ha = (G2 * AISLE * AISLE) / (8 * fa);
  const pier = Vn + Va;
  // the buttress: what arrives at its head, and where the resultant lands
  const M = Hn * SPR;
  const Ntot = Va + s.G;
  const e = M / Ntot;                            // offset from the buttress axis
  const inside = s.b / 2 - e;
  const Gmin = (2 * M) / s.b - Va;
  // the thrust lines
  const par = (x0, x1, f) => Array.from({ length: NSEG + 1 }, (_, i) => {
    const u = i / NSEG;
    return [ux(x0 + (x1 - x0) * u), uy(SPR + 4 * f * u * (1 - u))];
  });
  const nave = par(PIER[0], PIER[1], RISE_N);
  const aisleL = par(BUT[0], PIER[0], fa);
  const aisleR = par(PIER[1], BUT[1], fa);
  // force diagram: the nave triangle and one aisle triangle
  const T = [LLX, LLY], Mn = [LLX, LLY - Rn / SFD];
  const on = [LLX + Hn / SFD, LLY - Vn / SFD];
  const Ta = [LLX + 9, LLY - 2], Ma = [LLX + 9, LLY - 2 - Ra / SFD];
  const oa = [LLX + 9 + Ha / SFD, LLY - 2 - Va / SFD];
  return { Rn, Hn, Vn, Rspring, angN, Ra, Va, fa, Ha, pier, M, Ntot, e, inside,
           Gmin, ok: inside >= 0, b: s.b, G: s.G, nave, aisleL, aisleR,
           T, Mn, on, Ta, Ma, oa };
}

// a two-centred pointed arch, drawn as two circular arcs
function pointed(x0, x1, ys, cx0, cx1, r, n) {
  const pts = [];
  const apexY = ys + Math.sqrt(Math.max(r * r - ((x0 + x1) / 2 - cx0) ** 2, 0));
  for (let i = 0; i <= n; i++) {
    const u = i / n;
    if (u <= 0.5) {
      const t = u * 2;
      const x = x0 + ((x0 + x1) / 2 - x0) * t;
      pts.push([x, ys + Math.sqrt(Math.max(r * r - (x - cx1) ** 2, 0))]);
    } else {
      const t = (u - 0.5) * 2;
      const x = (x0 + x1) / 2 + (x1 - (x0 + x1) / 2) * t;
      pts.push([x, ys + Math.sqrt(Math.max(r * r - (x - cx0) ** 2, 0))]);
    }
  }
  pts[n / 2 | 0] = [(x0 + x1) / 2, apexY];
  return pts;
}

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  s.sIF = dw.bandScale(compute(s).Rspring);
  const ARR = dw.W.arrow, NARR = dw.W.narrow;
  const THR = { pending: PAL.black, final: (dd, st) => (st._k >= SHAPED ? PAL.blue : PAL.grey) };

  dw.label('form_title', 'Lageplan 1:100 — form diagram', { cls: 'title', flash: false });
  dw.label('force_title', 'Kräfteplan — force diagram', { cls: 'title', flash: false });
  dw.label('force_sub', '', { cls: 'point', flash: false });

  dw.seg('ground', { intro: 1, w: dw.W.bar, color: PAL.black, flash: false });
  dw.strokes('gHatch', 22, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  // the masonry: two piers, two buttresses
  for (const k of [0, 1]) {
    dw.poly(`pier${k}`, 4, { intro: 1, opacity: 1.0, z: -0.5, color: 0xd6d6da, flash: false });
    dw.poly(`but${k}`, 4, { intro: 6, opacity: 1.0, z: -0.5, color: 0xd6d6da, flash: false });
    dw.poly(`pin${k}`, 3, { intro: 1, opacity: 1.0, z: -0.5, color: 0xe6e6ea, flash: false });
  }
  // the vault outline, context rather than structure
  dw.strokes('intra', 24, { intro: 1, w: dw.W.thin, color: PAL.grey, flash: false });
  dw.strokes('extra', 24, { intro: 1, w: dw.W.thin, color: PAL.grey, flash: false });
  for (const k of [0, 1]) {
    dw.dashLine(`ax${k}`, { intro: 1, color: PAL.grey, dash: dw.W.dash });
    dw.dashLine(`bx${k}`, { intro: 1, color: PAL.grey, dash: dw.W.dash });
  }
  // the loads
  for (const [n, cnt] of [['g1', 12], ['g2', 12], ['g3', 12]]) {
    dw.seg(`bar_${n}`, { intro: 1, w: dw.W.thin, color: PAL.green });
    dw.arrows(`arr_${n}`, cnt, { intro: 1, w: dw.W.thin, color: PAL.green,
      headLen: dw.W.narrow.headLen * 0.75, headW: dw.W.narrow.headW * 0.75 });
    dw.label(`l_${n}`, '', { cls: 'num', intro: 1, color: PAL.green, when: (st) => st.lbl });
  }
  dw.dashArrow('R1d', { intro: 1, color: PAL.green, w: dw.W.arrow.w * 1.15,
    headLen: dw.W.arrow.headLen, headW: dw.W.arrow.headW, dash: dw.W.dash * 1.6, flash: false });
  dw.label('lR1d', 'R₁d = 800 kN', { cls: 'num', intro: 1, color: PAL.green });

  // the force diagram: the nave triangle (given) and the aisle triangle (a)
  dw.arrow('ffn', { intro: 2, color: PAL.green, ...ARR });
  dw.label('lffn', 'R₁d', { cls: 'num', intro: 2, color: PAL.green, when: (st) => st.lbl });
  dw.disk('ptOn', { intro: 2, r: dw.W.disk * 0.8 });
  dw.label('lOn', 'o', { cls: 'num', intro: 2, when: (st) => st.lbl });
  dw.seg('rayN1', { intro: 2, w: dw.W.bar, color: PAL.blue });
  dw.seg('rayN2', { intro: 2, w: dw.W.bar, color: PAL.blue });
  dw.seg('dimHn', { intro: 2, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lHn', '', { intro: 2, flash: false, color: PAL.grey });

  dw.arrow('ffa', { intro: SHAPED, color: PAL.green, ...ARR });
  dw.label('lffa', 'R₂d', { cls: 'num', intro: SHAPED, color: PAL.green, when: (st) => st.lbl });
  dw.disk('ptOa', { intro: SHAPED, r: dw.W.disk * 0.8 });
  dw.seg('rayA1', { intro: SHAPED, w: dw.W.bar, color: PAL.blue });
  dw.seg('rayA2', { intro: SHAPED, w: dw.W.bar, color: PAL.blue });
  dw.seg('dimHa', { intro: SHAPED, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lHa', '', { intro: SHAPED, flash: false, color: PAL.grey });

  // the three thrust lines
  for (const [n, st] of [['nave', 1], ['aisleL', SHAPED], ['aisleR', 7]]) {
    dw.poly(`bd_${n}`, 2 * (NSEG + 1), { intro: st, opacity: 1.0, z: -0.18, flash: false,
      color: { pending: PAL.zeroBand, final: () => PAL.blueBand }, when: (x) => x.o1 });
    dw.strokes(`th_${n}`, NSEG, { intro: st, w: dw.W.bar, color: n === 'nave' ? PAL.blue : THR });
  }
  dw.seg('dimFa', { intro: SHAPED, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lFa', '', { intro: SHAPED, flash: false, color: PAL.grey });
  dw.seg('dimFn', { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('lFn', '', { intro: 1, flash: false, color: PAL.grey });

  // the pier head, and the buttress check
  for (const k of [0, 1]) {
    dw.arrow(`pierF${k}`, { intro: 4, color: PAL.green, ...NARR });
    dw.label(`lpierF${k}`, '', { cls: 'num', intro: 4, color: PAL.green });
  }
  dw.arrow('bhead', { intro: 5, color: PAL.green, ...NARR });
  dw.label('lbhead', '', { cls: 'num', intro: 5, color: PAL.green });
  dw.arrow('gwt', { intro: 6, color: PAL.green, ...NARR });
  dw.label('lgwt', 'G₁d', { cls: 'num', intro: 6, color: PAL.green, when: (st) => st.lbl });
  dw.strokes('bthrust', 2, { intro: 6, w: dw.W.bar, color: PAL.blue });
  dw.disk('bland', { intro: 6, r: dw.W.disk });
  dw.label('lbland', '', { cls: 'num', intro: 6, flash: false,
    color: { final: (dd) => (dd.ok ? PAL.green : PAL.red) } });
  dw.seg('bbase', { intro: 6, w: dw.W.bar * 1.6, color: PAL.black, flash: false });

  dw.instant('form_title', 'force_title', 'force_sub', 'ground', 'gHatch');
  dw.ghostable('ffn', 'ffa');

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);
    dw.setLabel('form_title', [-2, -18.0]);
    dw.setLabel('force_title', [14, -13.0]);
    dw.setLabel('force_sub', [14, -14.4]);
    dw.setText('force_sub', `to scale · 1 unit ≙ ${SFD} kN  (sheet: 1 cm ≙ 100 kN)`);

    dw.setSeg('ground', [ux(-3.5), GY], [ux(18.5), GY]);
    dw.setStrokes('gHatch', Array.from({ length: 22 }, (_, i) => {
      const x = ux(-3.2) + i * ((ux(18.5) - ux(-3.2)) / 21);
      return [[x, GY], [x - 0.6, GY - 0.75]];
    }));

    // piers, buttresses, pinnacles
    for (const k of [0, 1]) {
      const px = PIER[k];
      dw.setPoly(`pier${k}`, [[ux(px - 0.35), GY], [ux(px + 0.35), GY],
                              [ux(px + 0.35), uy(SPR)], [ux(px - 0.35), uy(SPR)]]);
      const bx = BUT[k];
      dw.setPoly(`but${k}`, [[ux(bx - s.b / 2), GY], [ux(bx + s.b / 2), GY],
                             [ux(bx + s.b / 2), uy(SPR)], [ux(bx - s.b / 2), uy(SPR)]]);
      const ptop = k === 0 ? 10.913 : 8.284;
      dw.setPoly(`pin${k}`, [[ux(bx - 0.35), uy(SPR)], [ux(bx + 0.35), uy(SPR)],
                             [ux(bx), uy(ptop)]]);
      dw.setDashLine(`ax${k}`, [[ux(px), uy(15.2)], [ux(px), GY - 1.0]]);
      dw.setDashLine(`bx${k}`, [[ux(bx), uy(13.0)], [ux(bx), GY - 1.0]]);
    }
    // the vault outline
    const ip = pointed(5.35, 9.65, SPR, PIER[0], PIER[1], 4.65, 24);
    const ep = pointed(5.0, 10.0, 8.860, 7.136, 7.864, 2.864, 24);
    dw.setStrokes('intra', Array.from({ length: 24 }, (_, i) =>
      [[ux(ip[i][0]), uy(ip[i][1])], [ux(ip[i + 1][0]), uy(ip[i + 1][1])]]));
    dw.setStrokes('extra', Array.from({ length: 24 }, (_, i) =>
      [[ux(ep[i][0]), uy(ep[i][1])], [ux(ep[i + 1][0]), uy(ep[i + 1][1])]]));

    // the loads
    const bars = [['g1', PIER[0], PIER[1], 13.60, `g₁d = ${G1} kN/m`],
                  ['g2', BUT[0], PIER[0], 11.540, `g₂d = ${G2} kN/m`],
                  ['g3', PIER[1], BUT[1], 11.540, `g₃d = ${G2} kN/m`]];
    for (const [n, x0, x1, yy, txt] of bars) {
      dw.setSeg(`bar_${n}`, [ux(x0), uy(yy + 0.5)], [ux(x1), uy(yy + 0.5)]);
      dw.setArrows(`arr_${n}`, Array.from({ length: 12 }, (_, i) => {
        const x = ux(x0 + ((x1 - x0) * i) / 11);
        return [[x, uy(yy + 0.5)], [x, uy(yy - 0.35)]];
      }));
      dw.setLabel(`l_${n}`, [ux((x0 + x1) / 2), uy(yy + 1.5)]);
      dw.setText(`l_${n}`, txt);
    }
    dw.setDashArrow('R1d', [ux(7.5), uy(16.3)], [ux(7.5), uy(15.0)]);
    dw.setLabel('lR1d', [ux(7.5) + 6.2, uy(15.7)]);

    // force diagram — the nave
    dw.setArrow('ffn', d.T, d.Mn);
    dw.setLabel('lffn', V.add(V.mid(d.T, d.Mn), [-2.2, 0]));
    dw.setDisk('ptOn', d.on);
    dw.setLabel('lOn', V.add(d.on, [1.3, 0.7]));
    dw.setSeg('rayN1', d.Mn, d.on);
    dw.setSeg('rayN2', d.on, d.T);
    dw.setSeg('dimHn', [LLX, d.on[1]], d.on);
    dw.setLabel('lHn', [(LLX + d.on[0]) / 2, d.on[1] + 1.2]);
    dw.setText('lHn', `H = ${d.Hn.toFixed(1)} kN`);
    // and the aisle
    dw.setArrow('ffa', d.Ta, d.Ma);
    dw.setLabel('lffa', V.add(V.mid(d.Ta, d.Ma), [-2.2, 0]));
    dw.setDisk('ptOa', d.oa);
    dw.setSeg('rayA1', d.Ma, d.oa);
    dw.setSeg('rayA2', d.oa, d.Ta);
    dw.setSeg('dimHa', [d.Ta[0], d.oa[1]], d.oa);
    dw.setLabel('lHa', [(d.Ta[0] + d.oa[0]) / 2, d.oa[1] + 1.2]);
    dw.setText('lHa', `H = ${d.Ha.toFixed(1)} kN`);

    // the three thrust lines, each as a ribbon of its own force
    const lines = [['nave', d.nave, G1, NAVE, d.Hn], ['aisleL', d.aisleL, G2, AISLE, d.Ha],
                   ['aisleR', d.aisleR, G2, AISLE, d.Ha]];
    for (const [n, c, q, L, H] of lines) {
      dw.setStrokes(`th_${n}`, Array.from({ length: NSEG }, (_, i) => [c[i], c[i + 1]]));
      const nrm = c.map((p, i) => V.unit(V.perp(
        V.sub(c[Math.min(NSEG, i + 1)], c[Math.max(0, i - 1)]))));
      const hw = c.map((p, i) => s.sIF * Math.hypot(H, q * L * (0.5 - i / NSEG)));
      dw.setPoly(`bd_${n}`, [...c.map((p, i) => V.add(p, V.mul(nrm[i], hw[i]))),
                             ...c.map((p, i) => V.sub(p, V.mul(nrm[i], hw[i]))).reverse()]);
    }
    dw.setSeg('dimFn', [ux(7.5) + 1.2, uy(SPR)], [ux(7.5) + 1.2, uy(SPR + RISE_N)]);
    dw.setLabel('lFn', [ux(7.5) + 4.0, uy(SPR + RISE_N / 2)]);
    dw.setText('lFn', `${RISE_N.toFixed(2)} m`);
    dw.setSeg('dimFa', [ux(2.5) + 1.0, uy(SPR)], [ux(2.5) + 1.0, uy(SPR + d.fa)]);
    dw.setLabel('lFa', [ux(2.5) + 3.6, uy(SPR + d.fa / 2)]);
    dw.setText('lFa', `f = ${d.fa.toFixed(2)} m`);

    // the pier heads: purely vertical
    for (const k of [0, 1]) {
      dw.setArrow(`pierF${k}`, [ux(PIER[k]), uy(SPR)], [ux(PIER[k]), uy(SPR) - 3.0]);
      dw.setLabel(`lpierF${k}`, [ux(PIER[k]) + (k ? 3.6 : -3.6), uy(SPR) - 3.4]);
      dw.setText(`lpierF${k}`, `${d.pier.toFixed(0)} kN`);
    }
    // the buttress: what arrives, the ballast, and where the thrust lands
    const head = [ux(BUT[0]), uy(SPR)];
    const uHead = V.unit([-d.Hn, -d.Va]);
    dw.setArrow('bhead', head, V.add(head, V.mul(uHead, 3.2)));
    dw.setLabel('lbhead', V.add(head, V.mul(uHead, 5.4)));
    dw.setText('lbhead', `${d.Va.toFixed(0)} ↓ · ${d.Hn.toFixed(0)} →`);
    dw.setArrow('gwt', [ux(BUT[0]), uy(SPR * 0.62) + 1.8], [ux(BUT[0]), uy(SPR * 0.62) - 0.6]);
    dw.setLabel('lgwt', [ux(BUT[0]) - 4.2, uy(SPR * 0.62) + 1.6]);
    dw.setText('lgwt', `G₁d = ${d.G.toFixed(0)} kN`);
    const land = [ux(BUT[0] - d.e), GY];
    dw.setStrokes('bthrust', [[head, [ux(BUT[0]), uy(SPR * 0.62)]],
                              [[ux(BUT[0]), uy(SPR * 0.62)], land]]);
    dw.setDisk('bland', land);
    dw.setLabel('lbland', [land[0] - 6.0, GY - 1.4]);
    dw.setText('lbland', d.ok ? `inside by ${d.inside.toFixed(2)} m`
                              : `outside by ${(-d.inside).toFixed(2)} m`);
    dw.setSeg('bbase', [ux(BUT[0] - s.b / 2), GY - 0.35], [ux(BUT[0] + s.b / 2), GY - 0.35]);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const des = panel.section('Your design');
  panel.slider(des, s, 'b', 'buttress base width b (m)', 0.7, 6, 0.05, refresh);
  panel.slider(des, s, 'G', 'buttress weight G₁d (kN)', 0, 1400, 10, refresh);
  panel.toggle(des, s, 'auto', 'a) solve the aisle rise for me', refresh);
  panel.slider(des, s, 'fa', 'aisle rise (m, when not solved)', 0.8, 5, 0.02, refresh);
  const giv = panel.section('Given');
  panel.toggle(giv, s, 'lbl', 'show labels', refresh);
  panel.toggle(giv, s, 'o1', 'thickness ∝ force (off: uniform)', refresh);
  panel.slider(giv, s, 'sIF', 'scale internal forces', 0, s.sIF * 2.5, s.sIF / 20, refresh);

  refresh();
  return player;
}
