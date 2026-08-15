/**
 * EX X · German task 9.2 — a capacity you can compute, against a demand
 * nobody printed
 * Structural Design II, FS 23, "Additional Exercises", sheet page 7 (bottom).
 *
 * NUMBERING. The English sheet calls this block "Task 2"; the German sheet
 * calls it Aufgabe 9.2, and the German numbering is the correct one.
 *
 * TEXT (verbatim). "Check whether the reinforcement in the reinforced concrete
 * in additional task 1a) can withstand the relevant tension force. The
 * reinforcement has a round section with a diameter of 16 mm and is made of
 * steel S235."
 *
 * GIVENS. D = 16 mm, steel S235. From the compendium's formulary (2.6):
 * f_tk = 235 N/mm² and γ_M = 1.05.
 *
 * THE CAPACITY SIDE — fully determinable, and this is the half of the task
 * that has an answer:
 *   A       = π × 16² / 4        = 201.0619 mm²
 *   f_td    = f_tk / γ_M = 235 / 1.05 = 223.8095 N/mm²
 *   N_allow = 201.0619 × 223.8095 = 44 999.6 N = 45.000 kN
 * Independent check: 0.2011 × 10⁻³ m² × 223 810 kN/m² = 45.00 kN.
 *
 * THE DEMAND SIDE — NOT DETERMINABLE, for two compounding reasons (error E5,
 * and a broken cross-reference on top of it):
 *   1. The referent is ambiguous. Page 7's own frames are labelled "Task 1 a)
 *      / b)" in the English sheet; the only block actually called "Additional
 *      Task 1 a)" is on PAGE 6 (the Q = 30 kN frame). The German resolves it —
 *      "aus Aufgabe 9.1 a)" — i.e. the frame on page 7 itself.
 *   2. Under that (correct) reading, G_d has no value anywhere in the booklet,
 *      so there is no tension force to check.
 * The view therefore refuses to invent one. It makes the tension force the
 * slider, draws the 45.00 kN capacity as a hard line, and says which numbers
 * WOULD be the answer under each reading:
 *   - if the referent were page 6's given distribution [G 8.2] b), the largest
 *     tension there is 25.881 kN → 57.5 % utilisation, and the bar passes;
 *   - under the German (correct) referent the answer is "0.xxxx × G_d", and
 *     G_d has no value.
 *
 * THE OTHER DIRECTION, which the same two lines give for free: the diameter
 * a given tension needs.
 *   D_req = 2 √(N / (π f_td))
 * and rounded UP to the next whole millimetre, the way the sheet's sister task
 * on page 8 asks for. At 25.881 kN that is 12.13 mm → 13 mm.
 *
 * The capacity curve drawn here is N_R(D) = π D² f_td / 4, a parabola: doubling
 * the diameter quadruples the capacity, which is the one thing worth seeing.
 */

import { PAL } from '../lib/eqdraw.js';
import * as V from '../lib/vec.js';

const FTK = 235, GAM_M = 1.05;
const FTD = FTK / GAM_M;                        // 223.8095 N/mm²
const D_SHEET = 16;                             // mm, the sheet's bar
const N_82B = 25.881;                           // kN, largest tension in [G 8.2] b)

const area = (D) => (Math.PI * D * D) / 4;                    // mm²
const cap = (D) => (area(D) * FTD) / 1000;                    // kN
const dReq = (N) => 2 * Math.sqrt((N * 1000) / (Math.PI * FTD));  // mm

// the capacity chart: D on x, N on y
const D0 = 6, D1 = 26, N0 = 0, N1 = 120;
const CX0 = 5, CX1 = 32, CY0 = -17, CY1 = 10;
const cx = (D) => CX0 + ((D - D0) / (D1 - D0)) * (CX1 - CX0);
const cy = (N) => CY0 + ((N - N0) / (N1 - N0)) * (CY1 - CY0);
const NCURVE = 40;

// the bar section, drawn to scale at 0.42 drawing units per millimetre
const SEC = [-22, -2], MM = 0.42;

function compute(s) {
  const D = s.D, Nd = s.Nd;
  const A = area(D), NR = cap(D);
  const util = NR > 0 ? (Nd / NR) * 100 : Infinity;
  const need = dReq(Nd);
  return { D, Nd, A, NR, util, pass: Nd <= NR + 1e-9,
           need, needUp: Math.ceil(need - 1e-9),
           needCap: cap(Math.ceil(need - 1e-9)) };
}

const STEPS = [
  { t: 'The exercise', d: 'page 7 of the sheet, second block: “check whether the reinforcement can withstand the relevant tension force. The reinforcement has a round section with a diameter of 16 mm and is made of steel S235.” Half of that is answerable' },
  { t: 'The bar', d: 'left: the section, drawn to scale. One round bar, and its area is the only geometry in the whole task',
    detail: (d) => [`D = ${d.D.toFixed(0)} mm → A = π × ${d.D.toFixed(0)}² / 4 = ${d.A.toFixed(4)} mm²`,
                    `at the sheet’s 16 mm that is ${area(16).toFixed(4)} mm²`] },
  { t: 'The material', d: 'S235 means a characteristic strength of 235 N/mm². Design strength divides that by the material factor, which is 1.05 for steel — it is in the compendium’s formulary, not on the sheet',
    detail: () => [`f_tk = ${FTK} N/mm² · γ_M = ${GAM_M}`,
                   `f_td = ${FTK} / ${GAM_M} = ${FTD.toFixed(4)} N/mm²`],
    take: 'steel gets the smallest material factor of anything on the course, because it is the material we know best' },
  { t: 'The capacity', d: 'area times design strength, and that is the answer to the half of the task that has one. Right: the same number as a curve — capacity against diameter, which is a parabola, so doubling the bar quadruples what it can hold',
    detail: (d) => [`N_allow = ${d.A.toFixed(4)} × ${FTD.toFixed(4)} = ${(d.A * FTD).toFixed(1)} N = ${d.NR.toFixed(3)} kN`,
                    `check: ${(d.A / 1e6).toExponential(4)} m² × ${(FTD * 1000).toFixed(0)} kN/m² = ${d.NR.toFixed(3)} kN`,
                    `at the sheet’s 16 mm: ${cap(16).toFixed(3)} kN`],
    take: 'this is the number the task is really about, and it does not depend on anything the sheet forgot to print' },
  { t: 'The demand does not exist', d: 'the task says to check against “the relevant tension force of additional task 1a)”. There is no such force. Two things have gone wrong at once, and neither can be repaired from the sheet',
    detail: () => ['1. the reference is broken: page 7’s own frames are called “Task 1 a)/b)” in English,',
                   '   and the only block actually called “Additional Task 1 a)” is on PAGE 6.',
                   '   The German says “aus Aufgabe 9.1 a)” — the frame on page 7 itself.',
                   '2. and that frame’s load is labelled G_d, with no value, here or anywhere else.'],
    take: 'so the honest answer to “does it pass?” is “against what?”. The view will not invent a force; it makes it the slider' },
  { t: 'The check', d: 'drag the tension force across the 45.00 kN line. The bar diameter is the second control, and the two together answer both directions of the question: does this bar hold that force, and what bar would',
    detail: (d) => [`N_d = ${d.Nd.toFixed(3)} kN against N_allow = ${d.NR.toFixed(3)} kN → utilisation ${d.util.toFixed(1)} % · ${d.pass ? 'PASSES' : 'FAILS'}`,
                    `the diameter this force needs: D = 2√(N / π f_td) = ${d.need.toFixed(3)} mm → ${d.needUp} mm rounded up (${d.needCap.toFixed(2)} kN)`,
                    `for orientation only: page 6’s given distribution has a largest tension of ${N_82B} kN → ${((N_82B / cap(16)) * 100).toFixed(1)} % of a 16 mm bar`],
    take: 'the 25.881 kN mark on the slider is not the sheet’s answer — it is what the answer would be if the English cross-reference were the one that was meant' },
];

export const meta = {
  title: 'EX X · 9.2 — a capacity you can compute, a demand nobody printed',
  subtitle: 'Structural Design II · sheet EX X “Additional Exercises”, page 7 (German task 9.2; the English sheet calls it “Task 2”)',
  about: 'One round 16 mm bar in S235, and the question whether it can carry “the relevant tension force”. The capacity side is two lines and comes out at exactly 45.00 kN. The demand side does not exist: the English cross-reference points at a block on the previous page, the German one points at the frame directly above — and that frame’s load is labelled G_d with no number attached, here or anywhere in the sixteen pages. So this view computes the half that can be computed, draws the 45.00 kN line as hard as it deserves to be drawn, and makes the missing force the slider. The capacity curve on the right answers the question the other way round as well: what diameter a given tension needs.',
  result: (d) => [
    `capacity: A = π × ${d.D.toFixed(0)}² / 4 = ${d.A.toFixed(4)} mm² · f_td = ${FTK}/${GAM_M} = ${FTD.toFixed(4)} N/mm² → N_allow = ${d.NR.toFixed(3)} kN (45.000 kN at the sheet’s 16 mm)`,
    `demand: THE SHEET GIVES NONE. The English points at page 6, the German at the frame above — whose load G_d has no value anywhere in the booklet`,
    `with the slider’s N_d = ${d.Nd.toFixed(3)} kN: utilisation ${d.util.toFixed(1)} % → ${d.pass ? 'PASSES' : 'FAILS'} · the diameter it needs is ${d.need.toFixed(3)} mm → ${d.needUp} mm`,
    `for orientation: page 6’s largest tension is ${N_82B} kN, which is ${((N_82B / cap(16)) * 100).toFixed(1)} % of the 16 mm bar — it would pass`],
  frame: [[-28, -32], [34, 23]],
};

export function create(dw, panel, makePlayer) {
  const s = { D: D_SHEET, Nd: N_82B, mark: true, lbl: true, _k: 99 };
  const OKCOL = { pending: PAL.black, final: (d) => (d.pass ? PAL.green : PAL.red) };

  dw.label('t_sec', 'The bar section, to scale', { cls: 'title', flash: false });
  dw.label('t_chart', 'Capacity against diameter — N_R = π D² f_td / 4', { cls: 'title', flash: false });
  dw.label('t_sub', '', { cls: 'point', flash: false });
  dw.label('note', '', { cls: 'point', flash: false, color: PAL.grey });
  dw.instant('t_sec', 't_chart', 't_sub', 'note');

  // ---- the section
  dw.circle('sec', { intro: 1, color: PAL.black });
  dw.poly('secFill', 24, { intro: 1, color: PAL.redBand, opacity: 0.55, z: -0.2, flash: false });
  dw.seg('dimD', { intro: 1, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('ldimD', '', { cls: 'num', intro: 1, flash: false, color: PAL.grey });
  dw.label('larea', '', { cls: 'num', intro: 1, color: PAL.red });
  dw.label('lfd', '', { cls: 'num', intro: 2, color: PAL.grey });
  dw.label('lcap', '', { cls: 'num', intro: 3, color: PAL.green });

  // ---- the utilisation bar
  dw.poly('utilBar', 4, { intro: 5, color: { pending: PAL.zeroBand,
    final: (d) => (d.pass ? PAL.redBand : PAL.red) }, opacity: 0.85, z: -0.15, flash: false });
  dw.strokes('utilBox', 4, { intro: 5, w: dw.W.thin, color: PAL.grey, flash: false });
  dw.seg('utilCap', { intro: 5, w: dw.W.bar, color: PAL.green });
  dw.label('lutil', '', { cls: 'num', intro: 5, color: OKCOL });
  dw.label('lutilCap', '', { cls: 'num', intro: 5, flash: false, color: PAL.green });

  // ---- the chart
  dw.seg('axX', { intro: 3, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.seg('axY', { intro: 3, w: dw.W.dim, color: PAL.grey, flash: false });
  dw.label('laxX', 'bar diameter D [mm]', { cls: 'point', intro: 3, flash: false, color: PAL.grey });
  dw.label('laxY', 'N_R [kN]', { cls: 'point', intro: 3, flash: false, color: PAL.grey });
  for (let i = 0; i < 5; i++) {
    dw.label(`tx${i}`, '', { cls: 'point', intro: 3, flash: false, color: PAL.grey });
    dw.label(`ty${i}`, '', { cls: 'point', intro: 3, flash: false, color: PAL.grey });
  }
  dw.strokes('curve', NCURVE, { intro: 3, w: dw.W.bar, color: PAL.green });
  dw.disk('here', { intro: 3, r: dw.W.disk });
  dw.label('lhere', '', { cls: 'num', intro: 3, color: PAL.green });
  dw.dashLine('vD', { intro: 3, color: PAL.grey, dash: dw.W.dash });
  dw.dashLine('hN', { intro: 5, color: PAL.red, dash: dw.W.dash });
  dw.label('lhN', '', { cls: 'num', intro: 5, color: PAL.red });
  dw.dashLine('vReq', { intro: 5, color: PAL.blue, dash: dw.W.dash });
  dw.label('lvReq', '', { cls: 'num', intro: 5, color: PAL.blue });
  // where the sheet's own 16 mm bar sits, kept on the chart as a reference
  const showSheetPt = (st) => st.mark && Math.round(st.D) !== D_SHEET;
  dw.disk('sheetPt', { intro: 3, r: dw.W.disk * 0.8, when: showSheetPt });
  dw.label('lsheetPt', '', { cls: 'point', intro: 3, flash: false, color: PAL.grey,
    when: showSheetPt });

  let d = null;
  function refresh() {
    s._k = player.k;
    d = compute(s);

    dw.setLabel('t_sec', [-17, -15.6]);
    dw.setLabel('t_chart', [16, 21.4]);
    dw.setLabel('t_sub', [16, 19.8]);
    dw.setText('t_sub', `S235: f_tk = ${FTK} N/mm², γ_M = ${GAM_M} → f_td = ${FTD.toFixed(4)} N/mm²`);
    dw.setLabel('note', [-17, -17.4]);
    dw.setText('note', 'the sheet gives no tension force to check this against');

    // the section, at 0.42 drawing units per millimetre
    const r = (d.D / 2) * MM;
    dw.setCircle('sec', SEC, r);
    dw.setPoly('secFill', Array.from({ length: 24 }, (_, i) => {
      const a = (i / 24) * Math.PI * 2;
      return [SEC[0] + r * Math.cos(a), SEC[1] + r * Math.sin(a)];
    }));
    dw.setSeg('dimD', [SEC[0] - r, SEC[1] - r - 1.8], [SEC[0] + r, SEC[1] - r - 1.8]);
    dw.setLabel('ldimD', [SEC[0], SEC[1] - r - 3.0]);
    dw.setText('ldimD', `D = ${d.D.toFixed(0)} mm`);
    dw.setLabel('larea', [-10.5, 1.2]);
    dw.setText('larea', `A = π D²/4 = ${d.A.toFixed(2)} mm²`);
    dw.setLabel('lfd', [-10.5, -0.7]);
    dw.setText('lfd', `f_td = ${FTD.toFixed(2)} N/mm²`);
    dw.setLabel('lcap', [-10.5, -2.6]);
    dw.setText('lcap', `N_allow = ${d.NR.toFixed(3)} kN`);

    // the utilisation bar, 20 units wide = 100 % of the capacity
    const BW = 20, BX = -27, BY = -11.5, BH = 1.9;
    const f = Math.min(d.util / 100, 1.35);
    const box = [[BX, BY], [BX + BW, BY], [BX + BW, BY + BH], [BX, BY + BH]];
    dw.setStrokes('utilBox', box.map((p, i) => [p, box[(i + 1) % 4]]));
    dw.setPoly('utilBar', [[BX, BY], [BX + BW * f, BY], [BX + BW * f, BY + BH], [BX, BY + BH]]);
    dw.setSeg('utilCap', [BX + BW, BY - 0.9], [BX + BW, BY + BH + 0.9]);
    dw.setLabel('lutil', [BX + BW * Math.min(f, 1) * 0.5, BY - 1.6]);
    dw.setText('lutil', `N_d = ${d.Nd.toFixed(2)} kN → ${d.util.toFixed(1)} %  ${d.pass ? '✓ passes' : '✗ FAILS'}`);
    dw.setLabel('lutilCap', [BX + BW - 3.0, BY + BH + 2.0]);
    dw.setText('lutilCap', `N_allow = ${d.NR.toFixed(2)} kN`);

    // the chart
    dw.setSeg('axX', [cx(D0), cy(0)], [cx(D1), cy(0)]);
    dw.setSeg('axY', [cx(D0), cy(0)], [cx(D0), cy(N1)]);
    dw.setLabel('laxX', [(cx(D0) + cx(D1)) / 2, cy(0) - 5.4]);
    dw.setLabel('laxY', [cx(D0) - 4.6, cy(N1) + 1.4]);
    for (let i = 0; i < 5; i++) {
      const Dv = D0 + (i * (D1 - D0)) / 4;
      dw.setLabel(`tx${i}`, [cx(Dv), cy(0) - 1.5]);
      dw.setText(`tx${i}`, `${Dv.toFixed(0)}`);
      const Nv = (i * N1) / 4;
      dw.setLabel(`ty${i}`, [cx(D0) - 2.6, cy(Nv)]);
      dw.setText(`ty${i}`, `${Nv.toFixed(0)}`);
    }
    const pts = [];
    for (let i = 0; i <= NCURVE; i++) {
      const Dv = D0 + (i * (D1 - D0)) / NCURVE;
      pts.push([cx(Dv), cy(Math.min(cap(Dv), N1))]);
    }
    dw.setStrokes('curve', pts.slice(0, -1).map((p, i) => [p, pts[i + 1]]));
    const P = [cx(d.D), cy(Math.min(d.NR, N1))];
    dw.setDisk('here', P);
    dw.setLabel('lhere', V.add(P, [7.0, 0.8]));
    dw.setText('lhere', `${d.D.toFixed(0)} mm → ${d.NR.toFixed(2)} kN`);
    dw.setDashLine('vD', [[cx(d.D), cy(0)], P]);
    dw.setDashLine('hN', [[cx(D0), cy(d.Nd)], [cx(Math.min(d.need, D1)), cy(d.Nd)]]);
    dw.setLabel('lhN', [cx(D0) + 5.4, cy(d.Nd) + 1.3]);
    dw.setText('lhN', `N_d = ${d.Nd.toFixed(2)} kN`);
    dw.setDashLine('vReq', [[cx(Math.min(d.need, D1)), cy(0)],
                            [cx(Math.min(d.need, D1)), cy(Math.min(d.Nd, N1))]]);
    dw.setLabel('lvReq', [cx(Math.min(d.need, D1)), cy(0) - 3.2]);
    dw.setText('lvReq', `needs ${d.need.toFixed(2)} → ${d.needUp} mm`);
    const SP = [cx(D_SHEET), cy(cap(D_SHEET))];
    dw.setDisk('sheetPt', SP);
    dw.setLabel('lsheetPt', V.add(SP, [-8.0, 1.2]));
    dw.setText('lsheetPt', `the sheet’s 16 mm: ${cap(16).toFixed(3)} kN`);

    panel.syncAll();
    player.apply(d, s);
  }

  const player = makePlayer(STEPS, refresh);

  const g = panel.section('Given');
  panel.slider(g, s, 'D', 'bar diameter D (mm)', 8, 32, 1, refresh,
    (v) => `${v.toFixed(0)} mm${v === D_SHEET ? '  ← the sheet’s bar' : ''}`);
  const dm = panel.section('The demand — which the sheet never states');
  panel.slider(dm, s, 'Nd', 'tension force N_d (kN)', 0, 60, 0.5, refresh,
    (v) => `${v.toFixed(1)} kN${Math.abs(v - N_82B) < 0.26 ? '  ← page 6’s largest tension' : ''}`);
  panel.toggle(dm, s, 'mark', 'mark the sheet’s own 16 mm bar', refresh);
  panel.toggle(dm, s, 'lbl', 'show labels', refresh);

  refresh();
  return player;
}
