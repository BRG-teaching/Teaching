# view 51 — Burgo Factory, P. L. Nervi

Ground truth: https://block.arch.ethz.ch/eq/drawing/view/51 (driven headless via
CDP; 15 states dumped to scratchpad/live51/*.json + screenshots: default,
mode 1 steps 0–11, two dragged states). Applet slider `step` 0..11 shows only
in `mode = 1`; mode 0 = the complete drawing (`step ≟ 0` conditions).

Nervi's Burgo paper mill: a suspension ROOF. A 7 m-grid deck (x 3.25..13.75,
y = y(W) ≈ 9.1) hangs from a 16-panel funicular cable spanning the two pylon
tops D (5, 10.153) and E (12, 10.153); the two back spans (4 panels each)
continue over back-stay cables down to the deck-edge anchors W / W′, where the
deck itself is the TIE taking the horizontal pull. The inclined tapered
concrete columns leant so their axes carry the resultant of cable pull +
hanger load + own weight.

## Decode summary (applet_0/geogebra.xml, 511 objects)

- **Verticals**: 25 lines of action (black th2 dotted, always visible) at
  xs = 3.25 + k·0.4375, k = 0..24 (span D–E divided in 16, back spans in 4),
  from y(B_1) = 10.9823 down to y(C_1) = 7.1339. Drag rails (dash-dot th2):
  `d` x = 3.25, y ∈ [8.5495, 10] for W; `k_1` x = 8.5, y ∈ [8.5495, 9.7585]
  for Z_3 (both endpoints showHandles-gated points U/V and A/B).
- **Photo `pic2`**: corners W_8 (3,8) → Z_8 (14,8), 853×190 px → 2.45 units
  tall, layer 0 (behind everything), alpha 1. Ships as
  assets/view_51_photo.jpg via dw.image.
- **Deck + load**: `j_7` = W–W′ black th2. Green strips (rgb(0,100,0) fill
  α≈0.1 + green edges) between deck level and y(W) − sLS/4: poly3 (W→D),
  poly2 (D→E), poly6 (E→W′); green text "q" at Midpoint(E_7, W), offset
  (−40, 0) px. poly5 = the pylon's tributary strip (x 4.78125..5.21875,
  α 0.2), applet step 8 only. poly4 = right strip edge highlight, steps 1&6
  (skipped — duplicate of poly6).
- **Load line 1** (x = x(E_3), from draggable E_3): 18 drops
  [⅛, ¼×7, ⅛, ⅛, ¼×7, ⅛]·sFD → W_3 4·sFD below; N_3 = middle. R₁ = w_1 =
  Vector(E_3, W_3) th5, + form twin u_4 = sLS arrow at draggable M_7 (8.5, 8)
  (both applet step ≥ 2).
- **Trial (applet step 3, retired after)**: A_4 = (8.5, 2·y(Z_3) − y(D)) —
  DOUBLE the sag (funicular of uniform load has half the mid-ordinate of the
  resultant triangle); grey dash10 chords m_1 = D–A_4, n_1 = A_4–E. Pole
  B_4 = Line(E_3 ∥ m_1) ∩ Line(W_3 ∥ n_1).
- **Cable** (step ≥ 3 ∨ 0): funicular from Z_3 (draggable sag point): piece
  between loads k−1, k ∥ ray B_4→LL[k]; left half via rays LL[8]..LL[2] to
  verticals xs[11]..xs[5] (points D_4, E_4, F_4, G_4, H_4, I_4, C_4), then
  D–C_4 closes exactly ∥ ray LL[1] (verified < 1e-14); right half = mirror
  about x = 8.5 (J_4..P_4). 19 rays: r_1 (E_3) th2, 8 th1 (F_3..M_3), n_8 =
  B_4–N_3 black th2 dash10, 8 th1 (O_3..V_3), s_1 (W_3) th2. End-force
  vectors th5: v_6 = B_4→E_3 "A", u_6 = W_3→B_4 "B"; form twins (length sLS
  from D/E along the outer-ray directions): v_2 "A" at D, v_4 "B" at E.
- **Hangers** (step ≥ 3 ∨ 0): 15 verticals deck→cable at xs[5..19]; pylon
  verticals e_1 = B_6–D, f_7 = R_6–E have COND[step ≥ 3] withOUT ∨ 0: stand-ins
  during construction, replaced by the inclined columns in the final state
  (we keep them — nothing-disappears rule; the columns overlay them).
- **Load line 2** (x = x(Q_4), draggable Q_4; applet step ≥ 4): drops
  [⅛, ¼, ¼, ¼, ⅛]·sFD → V_4; R₂ = u_2 = Vector(Q_4, V_4); form twins at
  y(M_7): w_4 at x = 4.125 (step ≥ 4), s_8 at x = 12.875 (step ≥ 7).
- **Backstay pole (applet step 5 only, grey apparatus)**: W_4 = midpoint
  (grey ⊤ marks p_9/q_9 "1/2" on the vertical through draggable F_8 +
  horizontals s_9/t_9/a_10); trial chord d_4 = W–D grey dash10; a_8 =
  If(step≟5, A_8–W_4, Z_4–W_4) black dash10 — the parallel to the chord
  through W_4; k_4 = B_8–V_4 black th2 (horizontal helper). Pole Z_4 =
  Line(W_4 ∥ W–D) ∩ horizontal(V_4).
- **Backstays**: left (step ≥ 6 ∨ 0) W→A_5→B_5→C_5→D, piece i ∥ ray Z_4→
  [U_4, T_4, S_4], closes ∥ Z_4→R_4 (< 1e-14); hangers b_1/c_1/d_1; rays
  f_4 (Q_4) th2 + g_4..j_4 th1; th5: v_7 = Z_4→Q_4 "C", u_7 = V_4→Z_4 "D"
  (the deck-tie pull), form twins u_3 "C" at D (dir Q_4−Z_4, sLS) and w_7 =
  W→C_8 "D" (C_8 draggable on the deck line; applet shows w_7 steps 6–8 ∨ 0,
  w_8 7–8 ∨ 0 — we keep them). Right (step ≥ 7 ∨ 0): mirror about x = 8.5 +
  mirrored force triangle about the vertical a_9 through F_8: rays c_9/d_9/
  e_9/i_9 th1 + j_9 (mid) dash10, th5 u_9 "R₂" (H_8→G_8), v_9 "F" (G_8→I_8),
  w_9 "E" (I_8→H_8); form twins w "E" at E, w_8 = W′→U_8 "F".
- **Column head forces (applet step 8)**: th5 at D: w_2 "A′" (dir B_4−E_3),
  v_3 "C′" (dir Z_4−Q_4); w_3 "Q" at draggable O_8 (5, 10) length sLS +
  m_9 "wCC" below it (both shown steps 8–10 only, NOT at 0 — they retire).
- **Force diagram 3 (applet step 9–10)**, from draggable H_5: J_5 = H_5 +
  (B_4 − E_3) "A′"; L_5 = J_5 − (0, sFD/4) "Q" (pylon tributary ⅛+⅛);
  M_5 = L_5 − (0, 4·sFD) "weightConcreteColumn" (slider fixed 4);
  N_5 = M_5 + (Z_4 − Q_4) "C′"; closing v_1 = N_5→H_5 "G" (step ≥ 10).
  Form (step ≥ 10 ∨ 0): column axis m_8 = D–K_5 black dash10, u_8 "G" =
  (K_5 − sLS·Ĝ)→K_5, v_8 "H" mirrored.
- **Columns (applet step 11 ∨ 0)**: axis j_5 = Line(D ∥ G) ∩ ground
  y = y(I_5) = 8.1825 → K_5; O_5/P_5 = K_5 ∓ (0.1, 0) (slider Column = 0.1);
  R_5 = mid(D, O_5); S_5 on Circle(R_5, 0.25) at fixed angle
  θ = −2.764888777044788 (taper kink); Q_5 = Line(P_5 ∥ G) ∩ OrthogonalLine
  (D, G). poly1 = (Q_5, D, S_5, K_5, P_5) α 0.1 + th2 edges; poly1′ mirror.
  The columns TILT to follow G when Z_3 / W / weights change.
- **Unused applet objects**: sliders `F` (0..1000), `scaleOffsetReaction-
  Forces` (hidden, 1.4), `scaleInternalForces` (hidden 0.1) — referenced by
  nothing; B_7 = Intersect(load5, e_6) is NaN in the applet itself. No
  internal-force pipes in this view.
- **Off-canvas checkboxes** (x = 1544 > 1200): showHandles, showPoints —
  API-only. showPoints reveals the grey derived points; ported as a toggle.

## Toggles / defaults

| control | kind | default | ported |
|---|---|---|---|
| mode / step | sliders | 0 | our step player |
| scaleForceDiagram | 0.5..2 | 1 | slider |
| scaleLoadSymbol | 0.2..2 | 0.55 | slider |
| weightConcreteColumn_1 | 4..4 fixed | 4 | constant |
| Column | 0.1..0.1 fixed | 0.1 | constant |
| showPoints | checkbox | false | toggle |
| showHandles | checkbox | false | not ported (handles fixed: D, E, B_1, C_1, U/V, A/B, I_5, C, I_5) |
| button1 | reset Z_3 (8.5, 9.17), W (3.25, 9.1) | — | return to start |

Draggable in our port: Z_3 (sag, on k_1 rail), W (anchor, on d rail), E_3,
Q_4, H_5 (diagram anchors), M_7, O_8 (R₁/Q arrow positions), F_8 (mirror
axis), C_8 ("D" arrow tip).

## Regression (scratchpad/v51_regress.py vs live dumps)

Full chain (67 derived points: pole, 14 cable points + mirrors, backstays,
Z_4, mirrored diagram 2, diagram 3, column polygons, all arrow helper
points, strips): default **2.8e-14**, dragged (Z_3, W) **2.7e-14**, dragged2
(Z_3, W, E_3, Q_4, H_5) **2.2e-14**. Funicular closure onto D / onto the
outer rays < 1e-14 in all states (exact by the pole construction). S_5 at
1.4e-5 = angle constant rounding (fixed designer point).
