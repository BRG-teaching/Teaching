/**
 * EX X · Task 2 — Material properties
 * Structural Design I, HS 22 (sheet EX X "Additional Exercises", page 2).
 *
 * "To get a feel for how different materials behave under tension and
 *  compression forces, we compare wood (spruce), steel (S235) and concrete
 *  (C20/25) in the following.
 *  a) Complete the table with values from the formula and your own calculations.
 *  b) Given is a tension load of N_d = 12kN. Calculate the required
 *     cross-sectional area A_req for the three materials. The cross-sectional
 *     area corresponds to a square solid profile. Calculate the side length a of
 *     the profile for each of the three materials and compare them. (Areq = a2)
 *  c) Repeat b) but now with a compression load of N_d = 12kN.
 *  d) What do you notice when comparing the different cross-sections?
 *  e) Which material behaves the most brittle and which the most ductile when
 *     subjected to a tensile load? Consult the stress-strain diagrams in the
 *     lecture on 'Material and Dimensioning'."
 *
 * NO GEOMETRY IS DIGITISED HERE. This task is arithmetic; the squares and the
 * stress-strain curves in this view are drawn, not measured off the sheet.
 *
 * a) THE CHARACTERISTIC VALUES ARE LOOKED UP, NOT COMPUTED. All of them are in
 * the compendium's formulary, chapter 2.6 "Materialkennwerte / Material
 * properties" (web/pdf/compendium-structural-design-I-II-en.pdf), and every one
 * of them was checked against it here:
 *
 *            gamma_M   f_tk      f_ck      density
 *   Fichte     1.7      14        20        4.5 kN/m3     (all timber: 1.7)
 *   S 235      1.05    235       235       80.0 kN/m3     (all steel:  1.05)
 *   C20/25     1.5       1.5      20       25   kN/m3     (all concrete: 1.5)
 *
 * The two cells worth doubting both survive: STEEL'S f_ck REALLY IS 235 (steel
 * is symmetric and the formulary prints 235 in both columns), and SPRUCE'S
 * f_ck REALLY IS 20 in this compendium (SIA 265 grade C24 would say 21; the
 * compendium rounds to 20, and the compendium is what the sheet is marked
 * against). f_d = f_k / gamma_M (compendium 2.5), so
 *
 *   spruce   f_td = 14/1.7   =   8.235 -> 8.2      f_cd = 20/1.7 =  11.765 -> 11.8
 *   S235     f_td = 235/1.05 = 223.810 -> 223.8    f_cd = same
 *   C20/25   f_td = 1.5/1.5  =   1.000            f_cd = 20/1.5 =  13.333 -> 13.3
 *
 * b) and c)  A_req = N_d / f_d, a = sqrt(A_req), and the compendium is explicit
 * (2.5, the cable-diameter example) that the result is ALWAYS ROUNDED UP:
 * "rounding off would result in a diameter smaller than the minimum
 * requirement". With N_d = 12 kN = 12 000 N and the exact strengths:
 *
 *            tension  A_req      a          compression  A_req      a
 *   spruce            1457.1     38.17 -> 39              1020.0     31.94 -> 32
 *   S235                53.6      7.32 ->  8                53.6      7.32 ->  8
 *   C20/25           12000.0    109.54 -> 110               900.0     30.00 -> 30
 *
 * AGREEMENT WITH THE OFFICIAL KEY. Every one of the fifteen cells of table a)
 * agrees, and so do b) and c). Two rounding wrinkles, reported not disputed:
 *   - the key computes its areas from the ROUNDED design strengths, so it prints
 *     1'464 mm2 for wood in tension (exact: 1457.1) and 903 mm2 for concrete in
 *     compression (exact: 900.0);
 *   - which leaves the key internally inconsistent by a hair: from its own
 *     903 mm2 the side is 30.05 mm, which its own round-up rule would make 31,
 *     and it prints 30. With the exact f_cd = 13.333 the area is exactly 900 mm2
 *     and the side exactly 30.00 mm, so 30 IS right and the 903 should read 900.
 * The panel's "exact" toggle switches between the two, so both are visible.
 *
 * d) Concrete in tension needs 12 000 mm2 where steel needs 54 -- a factor of
 * 224 in area and 13.7 in side length (110 mm against 8 mm). The same concrete
 * in compression needs 900 mm2, 13.3x less than in tension, because f_ck/f_tk =
 * 20/1.5. All of reinforced concrete follows from that one ratio. Steel is the
 * only one of the three that does not care which way it is loaded. Timber sits
 * between, and is the only one that is STRONGER in compression than in tension.
 *
 * e) Concrete is the most brittle, steel the most ductile, timber in between and
 * much closer to concrete. The strains in the sigma-epsilon panel are SCHEMATIC
 * (the compendium carries no stress-strain data; the lecture "Material and
 * Dimensioning" does), computed here as f_tk/E with the textbook moduli
 * E = 11 000 / 210 000 / 30 000 N/mm2, which puts first cracking at 1.27 / 1.12 /
 * 0.05 per mille. Concrete then stops; steel runs on along a plastic plateau to
 * around 260 per mille -- 26 % elongation -- before it breaks.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

// --------------------------------------------------- compendium 2.6 / 2.5 ---

const MAT = [
  { name: 'Timber', sub: 'Spruce · Fichte', gM: 1.7, ftk: 14, fck: 20, rho: 4.5,
    ftdKey: 8.2, fcdKey: 11.8, E: 11000, epsU: 1.4, plateau: 0, rU: 1.00,
    note: 'the only one of the three that is stronger in compression than in tension' },
  { name: 'Steel', sub: 'S 235', gM: 1.05, ftk: 235, fck: 235, rho: 80.0,
    ftdKey: 223.8, fcdKey: 223.8, E: 210000, epsU: 260, plateau: 20, rU: 1.10,
    note: 'symmetric: f_tk = f_ck, so tension and compression need the same square' },
  { name: 'Concrete', sub: 'C20/25', gM: 1.5, ftk: 1.5, fck: 20, rho: 25,
    ftdKey: 1.0, fcdKey: 13.3, E: 30000, epsU: 0.11, plateau: 0, rU: 1.00,
    note: 'f_tk is the UNREINFORCED tensile strength — 1/13.3 of the compressive one' },
];
const ROWS = ['γ_M', 'f_tk', 'f_td', 'f_ck', 'f_cd'];

// ------------------------------------------------------------- the layout ---

// the table, top right
const TX = [0.6, 8.6, 16.6, 24.6];            // row label, then the three materials
const TY0 = 15.8, TDY = 1.62;                 // header row, row pitch
const TW = 30.6;                              // how far the rules run

// the three squares, standing on one baseline
const CX = [6.0, 15.0, 26.0];
const BY = -12.6;
const SQH = 9.4;                              // the biggest square is always this tall

// the stress-strain panel, in the free band on the left
const GX = -26.0, GY = -7.4, GW = 18.0, GH = 8.2;
// The strain axis is BROKEN, and it has to be: concrete cracks at 0.05 per
// mille and steel is still stretching at 260, a range of five thousand to one.
// The first 2 per mille get 60 % of the width, the remaining 298 get the rest.
const EBRK = 2.0, EMAX = 300.0, FBRK = 0.60;
const RMAX = 1.22;                            // sigma / f_k on the stress axis
const TICKS = [0, 1, 2, 100, 200, 300];
const LBLPOS = [[60, 0.52], [150, 0.78], [60, 0.26]];        // where each curve is named
const LEAD = 4.4;                             // how far the leader stops short of a label

const DEFAULTS = {
  Nd: 12,                                     // kN, the sheet's b) and c)
  mode: 2,                                    // 0 tension · 1 compression · 2 both
  mat: 0,                                     // 0 all · 1 timber · 2 steel · 3 concrete
  exact: true,                                // f_d = f_k/gamma_M, or the key's rounded f_d
  lbl: true,
  _k: 99,
};

// ------------------------------------------------------------------ maths --

function compute(s) {
  const N = s.Nd * 1000;                      // kN -> N
  const m = MAT.map((M) => {
    const ftd = s.exact ? M.ftk / M.gM : M.ftdKey;
    const fcd = s.exact ? M.fck / M.gM : M.fcdKey;
    const At = N / ftd, Ac = N / fcd;
    const at = Math.sqrt(At), ac = Math.sqrt(Ac);
    return { ...M, ftd, fcd, At, Ac, at, ac,
             atUp: Math.ceil(at - 1e-9), acUp: Math.ceil(ac - 1e-9),
             epsY: (M.ftk / M.E) * 1000 };     // first crack / yield, per mille
  });
  const aMax = Math.max(...m.map((x) => Math.max(x.at, x.ac)));
  const smm = SQH / aMax;                     // drawing units per millimetre
  // the headline comparisons of d)
  const rAreaTC = m[2].At / m[1].At;          // concrete vs steel, in tension
  const rSideTC = m[2].at / m[1].at;
  const rConc = m[2].At / m[2].Ac;            // concrete: tension vs compression
  // e) the order, by failure strain in tension
  const order = [...m].sort((a, b) => a.epsU - b.epsU);
  return { m, aMax, smm, Nd: s.Nd, N, rAreaTC, rSideTC, rConc, order,
           mode: Math.round(s.mode), sel: Math.round(s.mat), exact: !!s.exact };
}

// ------------------------------------------------------------------- view --

const nice = (v) => (v >= 100 ? v.toFixed(1) : v >= 10 ? v.toFixed(2) : v.toFixed(3));

export const meta = {
  title: 'EX X.2 — the same 12 kN, in three materials',
  subtitle: 'Structural Design I · sheet EX X “Additional Exercises”, task 2 a)–e)',
  about: 'No statics on this page at all — just one division, done six times, and then looking at what comes out. Twelve kilonewtons of tension needs eight millimetres of steel and a hundred and ten of concrete, and the three squares drawn here at one scale are the whole answer to part d): concrete cannot be asked to pull. Turn the same load round into compression and the concrete square shrinks to thirty millimetres, because f_ck/f_tk = 13.3 — and reinforced concrete is nothing more than that ratio, acted on. Part e) is the other half of the story: the stress–strain curves show that concrete not only fails early, it fails without warning, while steel deforms for two hundred times as long before it goes. Every characteristic value here was checked cell by cell against the compendium formulary, and all fifteen of the key’s table entries are right.',
  result: (d) => [
    `a) f_td = ${d.m.map((x) => `${x.name.slice(0, 2)} ${nice(x.ftd)}`).join(' · ')} N/mm² · f_cd = ${d.m.map((x) => `${x.name.slice(0, 2)} ${nice(x.fcd)}`).join(' · ')} N/mm²  (${d.exact ? 'exact, f_d = f_k/γ_M' : 'the key’s rounded values'})`,
    `b) tension, N_d = ${d.Nd} kN: A_req = ${d.m.map((x) => `${x.At.toFixed(1)}`).join(' / ')} mm² → a = ${d.m.map((x) => `${x.atUp}`).join(' / ')} mm (timber / steel / concrete, rounded up)`,
    `c) compression, N_d = ${d.Nd} kN: A_req = ${d.m.map((x) => `${x.Ac.toFixed(1)}`).join(' / ')} mm² → a = ${d.m.map((x) => `${x.acUp}`).join(' / ')} mm`,
    `d) concrete in tension needs ${d.rAreaTC.toFixed(0)}× the AREA of steel and ${d.rSideTC.toFixed(1)}× the side; and ${d.rConc.toFixed(1)}× its own compression square — so put the steel where the tension is`,
    `e) most brittle ${d.order[0].name.toLowerCase()} (fails at ≈${d.order[0].epsU.toFixed(2)} ‰), most ductile ${d.order[2].name.toLowerCase()} (yields at ${d.order[2].epsY.toFixed(2)} ‰ and runs to ≈${d.order[2].epsU.toFixed(0)} ‰)`],
  frame: [[-27, -22], [32, 17]],
};

const STEPS = [
  { t: 'The exercise', d: 'one load, three materials, and the question of how much of each you need. Timber, steel and concrete, in tension and then in compression' },
  { t: 'a) The safety factor γ_M', d: 'top right: the table the sheet asks you to fill in. The first row is not calculated — it is looked up. Every material carries its own γ_M, and unlike a load factor it DIVIDES the strength instead of multiplying the load',
    detail: (d) => d.m.map((x) => `${x.name} (${x.sub}): γ_M = ${x.gM}`),
    take: 'γ_M covers what you do not know about the material; γ_G and γ_Q cover what you do not know about the load. Opposite directions, same idea' },
  { t: 'a) The characteristic strengths', d: 'also looked up, from the compendium’s formulary. Note the two numbers that decide the whole page: steel is the same in both directions, and concrete is thirteen times weaker in tension than in compression',
    detail: (d) => d.m.map((x) => `${x.name}: f_tk = ${x.ftk} · f_ck = ${x.fck} N/mm²  — ${x.note}`),
    take: 'concrete’s f_tk is the UNREINFORCED value. Reinforced concrete exists precisely so that this number never has to be used' },
  { t: 'a) Down to design level', d: 'f_d = f_k / γ_M, and the table is complete. Every one of these fifteen cells was checked against the compendium and against the printed key — and they all agree, including the two the eye wants to doubt',
    detail: (d) => d.m.map((x) => `${x.name}: f_td = ${x.ftk}/${x.gM} = ${nice(x.ftd)} · f_cd = ${x.fck}/${x.gM} = ${nice(x.fcd)} N/mm²`),
    take: 'the key rounds these to 8.2 / 223.8 / 1 and 11.8 / 223.8 / 13.3 — switch “use the key’s rounded strengths” in the panel to see what that costs' },
  { t: 'b) Tension', d: 'A_req = N_d / f_td, and the side of the square is its root. Bottom: the three squares, all at one scale, standing on one line. That picture is the answer to d) and no arithmetic is needed to read it',
    detail: (d) => d.m.map((x) => `${x.name}: A = ${d.N.toFixed(0)} / ${nice(x.ftd)} = ${x.At.toFixed(1)} mm² → a = ${x.at.toFixed(2)} → ${x.atUp} mm`),
    take: 'always round the side UP: rounding down gives a section smaller than the requirement (compendium 2.5)' },
  { t: 'c) Compression', d: 'the same load, turned round. Blue, inside the red. For steel the two squares are the same square — it does not care. For concrete the blue one is a small patch in the corner of the red one, and that is the ratio f_ck/f_tk made visible',
    detail: (d) => d.m.map((x) => `${x.name}: A = ${d.N.toFixed(0)} / ${nice(x.fcd)} = ${x.Ac.toFixed(1)} mm² → a = ${x.ac.toFixed(2)} → ${x.acUp} mm`),
    take: (d) => `concrete: ${d.rConc.toFixed(1)} times the area in tension that it needs in compression` },
  { t: 'd) What you notice', d: 'concrete in tension is absurd, and that is the point of the exercise. It is not a little worse than steel, it is two hundred times worse by area. So you do not ask it to pull: you put a steel bar where the tension is and let the concrete do the pushing. That combination has a name',
    detail: (d) => [`concrete needs ${d.rAreaTC.toFixed(0)}× the area of steel for the same tension: ${d.m[2].At.toFixed(0)} against ${d.m[1].At.toFixed(0)} mm², i.e. ${d.m[2].atUp} mm against ${d.m[1].atUp} mm of side`,
                    `steel is indifferent — f_td = f_cd = ${nice(d.m[1].ftd)} N/mm², the same ${d.m[1].atUp} mm square either way`,
                    `timber is the only one that is stronger pushed than pulled: ${nice(d.m[0].fcd)} against ${nice(d.m[0].ftd)} N/mm²`],
    take: 'reinforced concrete is not a clever invention on top of concrete. It is the only way to use the material at all wherever something has to pull' },
  { t: 'e) Brittle or ductile', d: 'left: the three stress–strain curves, schematic, each normalised to its own strength so they fit on one pair of axes. Concrete goes up and stops. Timber goes further and stops. Steel reaches its strength and then keeps stretching, and stretching — that plateau is the warning a structure gives before it falls down',
    detail: (d) => [d.order.map((x) => `${x.name} ${x.epsY.toFixed(2)} → ${x.epsU >= 10 ? x.epsU.toFixed(0) : x.epsU.toFixed(2)}`).join(' ‰ · ') + ' ‰   (yield → failure strain)',
                    `${d.order[0].name.toLowerCase()} is the most brittle, ${d.order[2].name.toLowerCase()} the most ductile — ${(d.order[2].epsU / d.order[0].epsU).toFixed(0)}× the strain before failure`],
    take: 'brittle is not “weak”. Concrete is strong; it simply gives no notice, and a structure that gives no notice is the dangerous kind' },
  { t: 'All five answers', d: 'the table, the six divisions, the two pictures. Nothing on this page needed statics — and yet it decides more about how a building is built than most pages that do',
    detail: (d) => [`a) f_td = ${d.m.map((x) => nice(x.ftd)).join(' / ')} · f_cd = ${d.m.map((x) => nice(x.fcd)).join(' / ')} N/mm² (timber / steel / concrete)`,
                    `b) a = ${d.m.map((x) => x.atUp).join(' / ')} mm in tension · c) a = ${d.m.map((x) => x.acUp).join(' / ')} mm in compression`,
                    `d) concrete pulls ${d.rAreaTC.toFixed(0)}× worse than steel · e) brittle → ductile: ${d.order.map((x) => x.name.toLowerCase()).join(' → ')}`],
    take: 'every cell of the key’s table a) is right; only its 903 mm² for concrete in compression should read 900, which is why its own 30 mm looks like a rounding slip and is not one' },
];

export function create(dw, panel, makePlayer) {
  const s = { ...DEFAULTS };
  const NARR = dw.W.narrow;

  const hot = (st, i) => st.sel === 0 || st.sel === i + 1;
  const colT = (i) => ({ pending: PAL.black,
    final: (dd, st) => (hot(st, i) ? PAL.red : PAL.redBand) });
  const colC = (i) => ({ pending: PAL.black,
    final: (dd, st) => (hot(st, i) ? PAL.blue : PAL.blueBand) });

  dw.label('t_tab', 'a) Materialkennwerte — the formulary table (compendium 2.6)',
    { cls: 'title', flash: false });
  dw.label('t_sq', '', { cls: 'title', flash: false });
  dw.label('t_sig', 'e) σ–ε, schematic, each normalised to its own f_k',
    { cls: 'title', flash: false });

  // ---- the table
  dw.strokes('tabRules', 7, { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.seg('tabVert', { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  for (let c = 0; c < 3; c++) {
    dw.label(`th${c}`, MAT[c].name, { cls: 'num', intro: 1, flash: false });
    dw.label(`ts${c}`, MAT[c].sub, { cls: 'point', intro: 1, flash: false, color: PAL.grey });
  }
  for (let r = 0; r < 5; r++) {
    dw.label(`trl${r}`, ROWS[r], { cls: 'num', intro: 1, flash: false });
    for (let c = 0; c < 3; c++) {
      dw.label(`tc${r}_${c}`, '', { cls: 'num', intro: r === 0 ? 1 : r === 2 || r === 4 ? 3 : 2,
        color: (r === 2 ? colT(c) : r === 4 ? colC(c) : undefined) });
    }
  }

  // ---- the three squares
  dw.seg('base', { intro: 4, w: dw.W.dim, color: PAL.grey, flash: false });
  for (let i = 0; i < 3; i++) {
    dw.poly(`sqT${i}`, 4, { intro: 4, color: PAL.red, opacity: 0.15,
      when: (st) => Math.round(st.mode) !== 1 });
    dw.strokes(`sqTe${i}`, 4, { intro: 4, w: dw.W.thin, color: colT(i),
      when: (st) => Math.round(st.mode) !== 1 });
    dw.poly(`sqC${i}`, 4, { intro: 5, color: PAL.blue, opacity: 0.22,
      when: (st) => Math.round(st.mode) !== 0 });
    dw.strokes(`sqCe${i}`, 4, { intro: 5, w: dw.W.thin, color: colC(i),
      when: (st) => Math.round(st.mode) !== 0 });
    dw.label(`sqn${i}`, '', { cls: 'num', intro: 4, flash: false });
    dw.label(`sqt${i}`, '', { cls: 'num', intro: 4, color: colT(i),
      when: (st) => st.lbl && Math.round(st.mode) !== 1 });
    dw.label(`sqc${i}`, '', { cls: 'num', intro: 5, color: colC(i),
      when: (st) => st.lbl && Math.round(st.mode) !== 0 });
  }
  dw.label('sqScale', '', { cls: 'point', intro: 4, flash: false, color: PAL.grey });

  // ---- the stress-strain panel
  dw.arrow('axE', { intro: 7, color: PAL.grey, ...NARR, flash: false });
  dw.arrow('axS', { intro: 7, color: PAL.grey, ...NARR, flash: false });
  dw.label('axEl', 'ε [‰]', { cls: 'point', intro: 7, flash: false, color: PAL.grey });
  dw.label('axSl', 'σ / f_k', { cls: 'point', intro: 7, flash: false, color: PAL.grey });
  dw.strokes('axTicks', TICKS.length, { intro: 7, w: dw.W.dim, color: PAL.grey, flash: false });
  for (let t = 0; t < TICKS.length; t++) {
    dw.label(`axT${t}`, '', { cls: 'point', intro: 7, flash: false, color: PAL.grey });
  }
  dw.strokes('axBrk', 2, { intro: 7, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('axBrkL', 'yield → failure · the ε axis is broken at 2 ‰', { cls: 'point', intro: 7, flash: false, color: PAL.grey });
  dw.dashLine('axFk', { intro: 7, color: PAL.grey, dash: dw.W.dash });
  const CVW = [dw.W.str, dw.W.bar, dw.W.thin];   // timber · steel · concrete
  for (let i = 0; i < 3; i++) {
    dw.strokes(`cv${i}`, 4, { intro: 7, w: CVW[i], color: colT(i) });
    dw.disk(`cvEnd${i}`, { intro: 7, r: dw.W.disk * 0.55 });
    dw.strokes(`cvLead${i}`, 1, { intro: 7, w: dw.W.dim, color: PAL.grey, flash: false });
    dw.label(`cvl${i}`, '', { cls: 'num', intro: 7, color: colT(i), when: (st) => st.lbl });
  }
  dw.label('cvFk', 'f_k', { cls: 'point', intro: 7, flash: false, color: PAL.grey });

  dw.instant('t_tab', 't_sq', 't_sig');

  let d = null;

  function refresh() {
    s._k = player.k;
    d = compute(s);

    dw.setLabel('t_tab', [TX[0] + 8.0, TY0 + 1.5]);
    dw.setLabel('t_sq', [CX[1] + 1.5, BY + SQH + 2.2]);
    dw.setText('t_sq', `b) and c) — the required square, N_d = ${d.Nd} kN, all three at one scale`);
    dw.setLabel('t_sig', [GX + GW / 2 - 0.5, GY + GH + 1.7]);

    // ================================================== the table ============
    const rowY = (r) => TY0 - 0.9 - TDY * (r + 1);
    const rules = [];
    rules.push([[TX[0] - 0.6, TY0 - 1.5], [TX[0] - 0.6 + TW, TY0 - 1.5]]);
    for (let r = 0; r < 5; r++) {
      rules.push([[TX[0] - 0.6, rowY(r) - 0.75], [TX[0] - 0.6 + TW, rowY(r) - 0.75]]);
    }
    rules.push([[TX[0] - 0.6, TY0 + 0.9], [TX[0] - 0.6 + TW, TY0 + 0.9]]);
    dw.setStrokes('tabRules', rules);
    dw.setSeg('tabVert', [TX[1] - 1.4, TY0 + 0.9], [TX[1] - 1.4, rowY(4) - 0.75]);
    for (let c = 0; c < 3; c++) {
      dw.setLabel(`th${c}`, [TX[c + 1], TY0]);
      dw.setLabel(`ts${c}`, [TX[c + 1], TY0 - 1.0]);
    }
    const cell = (r, c) => {
      const x = d.m[c];
      if (r === 0) return `${x.gM}`;
      if (r === 1) return `${x.ftk} N/mm²`;
      if (r === 2) return `${nice(x.ftd)} N/mm²`;
      if (r === 3) return `${x.fck} N/mm²`;
      return `${nice(x.fcd)} N/mm²`;
    };
    for (let r = 0; r < 5; r++) {
      dw.setLabel(`trl${r}`, [TX[0] + 1.0, rowY(r)]);
      for (let c = 0; c < 3; c++) {
        dw.setLabel(`tc${r}_${c}`, [TX[c + 1], rowY(r)]);
        dw.setText(`tc${r}_${c}`, cell(r, c));
      }
    }

    // ================================================== the squares ==========
    dw.setSeg('base', [CX[0] - 4.5, BY], [CX[2] + 5.5, BY]);
    d.m.forEach((x, i) => {
      const wt = x.at * d.smm, wc = x.ac * d.smm;
      const sq = (w) => [[CX[i] - w / 2, BY], [CX[i] + w / 2, BY],
                         [CX[i] + w / 2, BY + w], [CX[i] - w / 2, BY + w]];
      const ring = (nm, pts) => dw.setStrokes(nm,
        pts.map((p, k) => [p, pts[(k + 1) % 4]]));
      dw.setPoly(`sqT${i}`, sq(wt)); ring(`sqTe${i}`, sq(wt));
      dw.setPoly(`sqC${i}`, sq(wc)); ring(`sqCe${i}`, sq(wc));
      dw.setLabel(`sqn${i}`, [CX[i], BY - 1.4]);
      dw.setText(`sqn${i}`, `${x.name} · ${x.sub}`);
      dw.setLabel(`sqt${i}`, [CX[i], BY - 2.9]);
      dw.setText(`sqt${i}`, `b) ${x.At.toFixed(0)} mm² → ${x.atUp} mm`);
      dw.setLabel(`sqc${i}`, [CX[i], BY - 4.3]);
      dw.setText(`sqc${i}`, `c) ${x.Ac.toFixed(0)} mm² → ${x.acUp} mm`);
    });
    dw.setLabel('sqScale', [CX[1] + 1.5, BY - 5.9]);
    dw.setText('sqScale', `1 mm ≙ ${d.smm.toFixed(3)} units · red = tension b), blue = compression c)`);

    // ============================================== stress and strain ========
    const ex = (e) => (e <= EBRK
      ? GX + (e / EBRK) * FBRK * GW
      : GX + FBRK * GW + ((e - EBRK) / (EMAX - EBRK)) * (1 - FBRK) * GW);
    const gp = (e, r) => [ex(Math.min(e, EMAX)), GY + (r / RMAX) * GH];
    dw.setArrow('axE', [GX, GY], [GX + GW + 1.5, GY]);
    dw.setArrow('axS', [GX, GY], [GX, GY + GH + 1.2]);
    dw.setLabel('axEl', [GX + GW + 2.4, GY - 0.9]);
    dw.setLabel('axSl', [GX + 2.4, GY + GH + 0.5]);
    dw.setStrokes('axTicks', TICKS.map((e) => [gp(e, 0), V.add(gp(e, 0), [0, -0.5])]));
    TICKS.forEach((e, t) => {
      dw.setLabel(`axT${t}`, V.add(gp(e, 0), [0, -1.3]));
      dw.setText(`axT${t}`, `${e}`);
    });
    const bx = ex(EBRK);
    dw.setStrokes('axBrk', [[[bx - 0.55, GY - 0.5], [bx - 0.05, GY + 0.5]],
                            [[bx + 0.05, GY - 0.5], [bx + 0.55, GY + 0.5]]]);
    dw.setLabel('axBrkL', [bx + 3.4, GY + GH + 0.5]);
    dw.setDashLine('axFk', [gp(0, 1), gp(EMAX, 1)]);

    d.m.forEach((x, i) => {
      // rise elastically to f_k, hold if there is a plateau, then break
      const pts = [gp(0, 0), gp(x.epsY, 1)];
      if (x.plateau > x.epsY) pts.push(gp(x.plateau, 1));
      pts.push(gp(x.epsU, x.rU));
      pts.push(gp(x.epsU, 0));                        // the drop at rupture
      const segs = [];
      for (let k = 0; k < pts.length - 1; k++) segs.push([pts[k], pts[k + 1]]);
      while (segs.length < 4) segs.push([pts[pts.length - 1], pts[pts.length - 1]]);
      dw.setStrokes(`cv${i}`, segs.slice(0, 4));
      dw.setDisk(`cvEnd${i}`, gp(x.epsU, x.rU));
      // a leader from the label back to the material's own elastic branch, since
      // all three rising lines are crowded into the first per mille
      const [le, lr] = LBLPOS[i];
      const anchor = gp(le, lr);
      dw.setLabel(`cvl${i}`, anchor);
      dw.setStrokes(`cvLead${i}`, [[gp(x.epsY * lr, lr), [anchor[0] - LEAD, anchor[1]]]]);
      dw.setText(`cvl${i}`, `${x.name} ${x.epsY.toFixed(2)} → ${x.epsU >= 10 ? x.epsU.toFixed(0) : x.epsU.toFixed(2)} ‰`);
    });
    dw.setLabel('cvFk', V.add(gp(EMAX, 1), [1.5, 0.5]));

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const g = panel.section('Given');
  panel.slider(g, s, 'Nd', 'N_d (kN)', 2, 40, 1, refresh, (v) => `${v} kN — the sheet says 12`);
  const w = panel.section('What to look at');
  panel.slider(w, s, 'mode', 'which square', 0, 2, 1, refresh,
    (v) => ['b) tension only', 'c) compression only', 'both, nested'][Math.round(v)]);
  panel.slider(w, s, 'mat', 'highlight', 0, 3, 1, refresh,
    (v) => ['all three', 'timber', 'steel', 'concrete'][Math.round(v)]);
  panel.toggle(w, s, 'exact', 'exact f_d = f_k/γ_M (off = the key’s rounded f_d)', refresh);
  panel.toggle(w, s, 'lbl', 'show labels', refresh);

  refresh();
  return player;
}
