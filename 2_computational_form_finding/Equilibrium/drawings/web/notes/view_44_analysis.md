# view_44 — Three-hinged frame, superposition: applet decode

Source: `view_44/applet_0/geogebra.xml` (924 elements, the largest of the
frame series) + the live applet (https://block.arch.ethz.ch/eq/drawing/view/44)
driven headless. Saved FP*/FPM*/FPTM* coordinates are degenerate — recomputed.

## Layout (all one canvas, no step slider, no mode buttons)

Three copies of the same three-hinged frame (l = h = `frame` = 5.4) at
x-offsets 0 / 24 (`distancePoint`) / 40 (`distanceSuperposition`), rows at
y-offsets 10 (`distanceN`), 20 (`distanceV`), 30.5 (`distanceM`) — ALL
N/V/M diagrams visible at once (unlike view 43's exclusive buttons):

- case 1: line load q (green band, R₁/R₂ split at the hinge); force diagram
  = the view-43 rectangle with pole I₁ (H = q·l₁·l₂/2h, A_V = q·l/2 —
  closed-form equal to the trial construction, regression-verified).
- case 2: horizontal point load F at the corner B_P (ORANGE arrows,
  dyncolor 1,0.5,0). Force diagram: horizontal load line A₃→B₃ = F/sFD;
  parallels to the hinge chords A_P–I_P / I_P–C_P through A₃ / B₃ meet at
  G₃; H₃ = drop of G₃ onto the load line: A_H = H₃→A₃, B_H = B₃→H₃,
  A_V = G₃→H₃ (DOWN — uplift), B_V = its opposite (drawn 0.5 right).
- case 3: q + F. Force polygon at C₄: F (orange, C₄→LLT0), R₁, R₂ down,
  then D₄ = B₄ + (BH_F + BH_q), E₄ = D₄ + (BV_q + BV_F), F₄ = E₄ +
  (AV_q + AV_F), G₄ = F₄ + (AH_q + AH_F) — closes exactly on C₄.
  N/V/M rows constructed from the SUMMED component vectors with the same
  rotate/translate recipe (girder N strip from BH_F + BH_q since F enters
  at the corner); M row: corner points from the A_H/B_H sums, arcs, closing
  chord Z₄–B₅, M_max = q·l²/8/sMD off the closing line, parabola =
  funicular of pole F₅ (chords Z₄–C₅–B₅, C₅ mirrored below).

Checkboxes: `o_1` trial funicular construction, `j_2` chord construction
(both default off), `w_2` UDL thrust line (fan LL_i→I₁ + dashed funicular
through the M-copy feet), `o_3` parabola constructions (poles E₅ + F₅,
fans, chord circles), `showBow`, `showHandles`, `switchN` slider.
Long analytic texts (text3/text11/text37) sit OFF-CANVAS at x = 80…138 —
invisible in the applet's own viewport; not ported.

## Regression

Full chain (poles, all component vectors, all 9 diagram rows, both M
funiculars, thrust line) vs the LIVE applet at the default state and at
hinge I = 1.8 with F = 26: worst 5.3e-14 (scratchpad `v44_reg.py`).

## Port structure (13 hand-designed steps)

frames+rails → loads & three load lines → pole I₁ → q-reactions → pole G₃
→ F-reactions → superposed polygon (vector addition) → N row → V row →
M row → thrust line (retires at Done, toggle keeps) → done.

## Deviations from the applet (and why)

- red rows → house pink; F arrows keep the applet's orange dyncolor.
- The chord constructions (applet j_2/o_1, default hidden) are STAGED as
  the pole steps and retire at "Done" (the "keep chord constructions"
  toggle preserves them); the full trial-funicular apparatus of the q case
  is not duplicated here — it is taught in Drawing 43.
- The F arrow of the point-case force diagram is drawn 0.55 under the
  load line (applet V₆/W₆ offset eyeballed from the live screenshot).
- Off-canvas analytic texts and Bow letters not ported (Bow toggle omitted
  here; the three-frame page is dense enough).
- Node inspector (ours): feet + hinges of all three frames (9 nodes);
  q-feet close A_V+A_H+column force on the drawn components, F-feet on the
  G₃H₃A₃ triangle, superposition feet on the summed polygon; hinges show
  the two collinear hinge-force resultants.
- House pipes on the three frames (axial widths from the respective
  component vectors), default on.
