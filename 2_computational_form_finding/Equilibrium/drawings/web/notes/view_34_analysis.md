# view 34 — Supersam

Ground truth: https://block.arch.ethz.ch/eq/drawing/view/34 (live via CDP; 14
states in scratchpad/live34/: default, steps 1–10, image off, slider + drag
states). Applet `step` 0..10 (mode ≟ 1); mode 0 = final.

The Warsaw Supersam roof (Hajnos/Krasiński system): every load is carried
TWICE — by a pair of compression ARCHES (wall→column, column→wall, blue) and
by one full-span tension CABLE (red), designed with EQUAL AND OPPOSITE
horizontal thrusts (H_tension = H_compression = 8.2·factor_H · sFD), so the
horizontal components cancel at the ends and the middle strut carries H
between the arches. Three three-point funicular problems over one load line.

## Decode summary (618 objects)

- **Form (fixed)**: bases A(0,0) B(2.25,0) D(3.75,0) F(7.5,0); pedestal
  polygons A-B-G(2.25,.4)-J(0,.65), C-D-I'(3.75,.3)-I(2.25,.3),
  E-F-K(7.5,.9)-G'(3.75,.4); ground line (−0.95,0)–(8.33,0); supports named
  1..4 = J, I, I', K. Cable/arch ends DRAG on the wall verticals: H_1 at
  x = 0, A_1 at x = 7.5, both y ∈ [0.014, 1.416]. Load action verticals at
  x = 0.375 + 0.75k for k = 0..2 and 4.125 + 0.75k for k = 0..4 (a GAP over
  the middle column); green load symbols at height y = 3.396, length
  loadSymbol (0.8).
- **Load line** from draggable LL_8 (16.77, 4.46): 8 equal drops
  loadP·sFD (0.5·0.8); R_1 = first 3 (span 1), R_2 = last 5 (span 2), each
  drawn twice (main line + the `offset` (0.6) twin for the tension system).
- **H**: N draggable on the load-line axis below (16.77, −2.75);
  O = N − (8.2·factor_H·sFD, 0), P = N + same: H_compression = N–O (blue
  bar), H_tension = N–P (red bar, drawn offset). Both compression poles on
  the vertical through O; the tension pole on the vertical through P.
- **Trials (applet step 2, ours 3–4)**: span 1 pole I_1, start J_1 on x=0 →
  strings across loa_0..2, end on x(I) → closing J_1–N_1 → parallel through
  I_1 cuts loadline1 (LL_8..LL_2) at O_1 "i_1_c"; span 2 pole L, start M on
  x = 3.75 → across loa_3..7, end on x = 7.5 → W "i_2_c" on loadline2
  (LL_2..LL_7). Poles: P_1 "o_1_c" = vert(O) ∩ parallel(O_1, chord I–H_1);
  Z "o_2_c" = vert(O) ∩ parallel(W, chord I'–A_1).
- **Arches (step ≥ 3 ∨ 0)**: arch 1 = H_1 → loa_0..2 → I (piece k ∥ ray
  P_1→LL_k), closure ∥ P_1–LL_2 exact; arch 2 = I' → loa_3..7 → A_1 (rays
  Z–LL_2..LL_7). Blue th3. Chords a_3 = I–H_1, d_2 = I'–A_1 blue dash15;
  closing p_3 = P_1–O_1, l_2 = Z–W blue dash15; rays th1/2 black.
- **Compression reactions**: A_c/B_c/C_c/D_c = green vectors ON the outer
  rays (P_1→LL_8, LL_2→P_1, Z→LL_2, LL_7→Z), steps 3–4/5, + fixed-length
  (loadSymbol) form arrows at H_1/I/I'/A_1 along those directions.
  H/V components (steps 4/5..9, H's also final): form A_Hc (+x), A_Vc (−y),
  B_H (−x), B_V (+y), C_H (+x), C_V (+y), D_Hc (−x), D_Vc (−y); force-side
  DIMENSION arrows with dotted leaders: A_Hc top lane (y(S_4)+0.1), B_H
  above it; C_H bottom lane; A_Vc/D_Vc at x(P_1) − 0.75·offRF; B_V/C_V at
  x(P_1) − 1.25·offRF. B_H = C_H = H_c — the STRUT I–I' carries the whole
  thrust between the arches.
- **Tension (steps 6–8)**: trial pole T_1, start U_1 on x=0, across ALL 8
  loads, end on x = 7.5 → J_2 "i_t" on the full load line; chord f_4 =
  H_1–A_1 red dash15; pole K_2 "o_t" = vert(P) ∩ parallel(J_2, f_4),
  displayed offset as O_7 = K_2 + (offset, 0) with the OFFSET load line
  LL'_k and rays LL'_k→O_7, closing P_7–O_7 (P_7 = J_2 + offset).
  Cable = H_1 → all 8 loa → A_1 (rays K_2–LL_k), red th3, closure exact.
  Reactions A_t = O_7→LL' , D_t = LL_7'→O_7 green on the offset rays; form
  arrows at H_1/A_1 ∥ (LL_8−K_2)/(K_2−LL_7); A_Ht (−x!) and D_Ht (+x)
  OPPOSE A_Hc/D_Hc — the thrusts cancel; A_Vt/D_Vt dims at
  x(O_7) + 0.75·offRF.
- **Base (step 10, ours 11)**: strut a_8 = I–I' (th3), wall pieces
  H_1→A and I'→D (th3), base points A/B/D/F, total verticals at the bases:
  "A_V = A_V_c + A_V_t", "B_V", "C_V" (green up arrows, length loadSymbol).
- **Sketch** pic1 = sketch_01b.png (769×121), corners Z_1 (−1.141, −0.413)
  → A_2 (8.792, −0.413), COND showImage (default FALSE) — ported as
  assets/view_34_sketch.png + toggle.
- Axes dash: load-line axis S_4–R_4 (x 16.77, y −3.30..5.69), pole axis
  T_4–U_4 (x 11.52), tension axis (x(P)+offset).

## Toggles / defaults

mode/step → player; loadP 0.2..2 (0.5); factor_H 0.5..1 (0.8); offset 0..1
(0.6); offsetReactionForces 0..1.5 (1.25); scaleForceDiagram 0.1..2 (0.8,
hidden slider — exposed); loadSymbol 0.1..2 (0.8); showImage (false);
showHandles (not ported — H_1/A_1/N/LL_8/trial handles always draggable).

## Regression (scratchpad/v34_regress.py vs live dumps)

39 points (load line, trials incl. N_1/V/I_2, divisions O_1/W/J_2, poles
P_1/Z/K_2/O_7, arch 1+2 and cable interior vertices) × 5 states (default,
step2, step6, sliders loadP=1/factor=0.6, dragged LL_8/N/H_1/A_1): max err
**1.4e-14**; all three funicular closures exact (< 1.5e-14).
