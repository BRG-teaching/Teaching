# view 40 — Continuous beam, symmetrical (decode notes, IN PROGRESS)

Source: view_40/applet_0/geogebra.xml (225 commands); live dumps
scratchpad/live40/*.json (s0..s6 + R1=20 + R1=50 + mode1). Steps 0..6.
Sliders: R1 [20..50]=35, sFD 5.5 [2..10], sLS 0.25, oRF 0.25, sIF [0..0.1], mode.

## Structure (decoded so far)

- Beam A—B—C (B = midpoint), slab rectangle around it; beam top line q through
  A1 (left) .. C1 (right). Span midpoints D (=mid A,B) and E (=mid B,C) with
  vertical rails al4/j; the R1 rail const1 = [W D_1] at level yPosConstR1;
  R1_2 = Point[const1] DRAGGABLE (the R₁ apex), R2 = Mirror[R1_2, vertical
  through B] — symmetry built in. I = Point[constB] on the B rail (draggable
  sag over B).
- The blue TENT = funicular of the two span resultants: A1 → R1_2 → I → R2 →
  C1 (segments f_1, g_1, h_1, i_1); rays a_1, c_1, d_1, e_1 extend them.
- R₁/R₂ arrows: u = Vector[R1_1, R1_2], v mirrored (GREEN, orange at s1).
- Force diagram: FD_0 free anchor, load line FD_0 → FD_1 (R₁) → FD_2 (R₂)
  vertical; pole H = Line[FD_1 ∥ g_1] ∩ Line[FD_0 ∥ f_1] (span-1 fan);
  pole V = Line[FD_1 ∥ h_1] ∩ vertical through H (span-2 fan);
  **B = Vector[V, H]** — the middle reaction appears as the pole-to-pole
  vertical on the LEFT of the fans (w_1). A_V: horizontal through H cuts the
  load line at J → A_V = J→FD_0, drawn offset via circle c_2 (v_1 =
  Vector[T, P]); C = below FD_2 via k_2/l_2 (v_2 = Vector[G_1, H_1] offset).
  t_1 = [H J] RED; t = [A1 C1] RED (beam soffit line, hidden at s5+).
- q_2 = segmentdivision[A1, B1, 8]: 8 strips per span -> the grey strip rays
  in both fans + the blue in-beam parabolas (strip funicular per span).
  (Commands 110-225 still to decode: the parabola strings, the s6 MIRRORED
  red fan + red continuous-beam M-diagram with hogging over B, m_5, the
  poly2/poly3 hatches, r_3/s_3 blue polylines.)

## Step masks (live)

s1 +[f_1 g_1 h_1 i_1(flash?)]; s4 -[them]; s5 +m_5 -t; s6 +[b_6 d_6 e_6 h_6
i_6 j_4..w_4 family] = the red mirrored/superposed apparatus. s2/s3 pure
color-flashes (A_V,C orange; then B orange).

## Colors at s0

blue: tents f_1..i_1? (h_2 j_2 k_6 l_6 m_6 n_6 q_1 r_1 = rays/fan), polylines
r_3 s_3 (in-beam parabolas); RED: p_2 t t_1; GREEN: loads/reactions vectors
u u_1 u_2 u_3 v v_1 v_2 w w_1 w_2 w_3, segs d_2 e_2 k_1 l_1 m_1 m_2 n_2 o;
grey rails const1 constB; black: beam/slab edges + circles c_5 r (dim
circles?), poly2 triangle + poly3 quad (support symbols), poly1 green (q band).

## Full decode (commands 110-225)

- FD_1 = FD_0 − (0, R1·sFD/100); FD_2 = FD_1 − same (NOTE the /100).
  R1_1 = R1_2 + (0, 2.5·sLS) (arrow tail). Rails: const1 y = 7.9001 (R apex),
  constB x = x(B), y from beamtop−0.02 down to 4.6319.
- Poles: H = Line[FD_1 ∥ g_1(R1_2→I)] ∩ Line[FD_0 ∥ f_1(A1→R1_2)];
  V = Line[FD_1 ∥ h_1(I→R2)] ∩ vertical through H. **B = Vector[V→H]** (the
  pole-to-pole vertical IS the middle reaction). J = loadline ∩ horizontal
  through H → A_V = J→FD_0 (offset arrow T→P); C = G_1→H_1 on the offset lane
  (FD_2 level up to the V level).
- Strips: stations al1..al7 through the 8-division of [A1, B1]; span-1 load
  line divided in 7 (B_3, J_1, K_1, L_1, M_1, N_1 + J?); strip rays H→each.
  Strip funicular walked BACKWARD from Z_1 = al7 ∩ g_1 parallel to the rays:
  O_1(al6), A_2(al5), B_2(al4), C_2(al3), D_2(al2), W_1 = al1 ∩ f_1;
  r_3 = PolyLine[A1 W_1 D_2 C_2 B_2 A_2 O_1 Z_1 I] — inscribed in the tent.
  Span 2 = mirror across the constB vertical (s_3).
- M-diagram (s5+): everything mirrored across the beam-top horizontal t →
  k_5/l_5 polylines (red), baseline m_5 = [A1 C1] replaces t.
- s6 red apparatus: the WHOLE force diagram mirrored across the load line
  (H' = Mirror[H, j_1], V'): red fans j_4..d_6, doubled B = Vector[V'→H'],
  mirrored offset reactions u_4/w_4 + pieces e_6/h_6/i_6/j_6 — the symmetric
  reading of the same construction.
- Support symbols: macros supportHingeHorizontalLeft[A], supportRollerHorizontal
  [B], [C]; slab = Polygon[A C G F]; q band = poly1 at the top.
- Draggables (white): FD_0, A1, I, R1_2 (+ frame pts). Sliders: R1 20..50,
  sFD, sLS, oRF, sIF, mode.
