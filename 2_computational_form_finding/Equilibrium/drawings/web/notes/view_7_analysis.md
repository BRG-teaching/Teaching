# view_7 "Funicular Line Through Three Points 1" — decoded algorithm

12 applet steps; solves the THREE-point problem as two chained two-point
problems sharing the middle point N. All element names below are the applet's.

## Setup (always visible)
- Room: A free corner; B above A (left wall e = A–B), C right (bottom), D
  corner; visible outline = i_7 + m_7 (black th2). Grey dashed rails:
  e, f (walls), m (K–I, N's rail), j_3/k_3/l_3/m_3 (lines of action clipped),
  j 3 dash20 guides.
- Three prescribed points: **E on wall e, F on wall f, N on rail m** (all
  draggable). Chords s = E–N, a_1 = N–F (RED dash15, steps 9–10).
- Four load points A_1, B_1 (upper rail ⊂ n = J–M) and C_1, D_1 (lower rail
  ⊂ r = J–L), directions via arc handles R_1..U_1; green load vectors
  v, w, z, u_1 (tail handle → tip load point); lines of action i_2, j_2, l_2,
  m_2 (clipped segments j_3, k_3, l_3, m_3 grey dash20 always).

## Force diagram
- I_1 = load line start (free). Span-1 load line: V_1 = I_1 + F_1·dir1,
  W_1 = V_1 + F_2·dir2; a_3 = Segment(I_1, W_1) black th5 dash10, steps 2–10.
  Edge vectors u_5 = I_1→V_1, v_5 = V_1→W_1 (th5 DYN, step ≥1).
- Span-2 load line: U_2 = W_1 + F_3·dir3, V_2 = U_2 + F_4·dir4;
  j_4 = Segment(V_2, W_1) th5 dash10, steps 6–10. Edges w_5 = W_1→U_2,
  u_6 = U_2→V_2 (step ≥5).

## Span 1 (loads 1–2 between E and N), steps 2–5
- n_3 = line through E ∥ a_3 (E's guide, segment r_3 grey dash10, steps 2–9);
  q_3 = through N ∥ same (segment q_4, steps 2–9).
- Z_1 = trial pole 1 (steps 3–9), rays e_3 = Z_1–I_1, f_3 = Z_1–V_1,
  g_3 = Z_1–W_1 (grey th2, steps 3–9).
- Trial funicular 1 from W_2 (draggable on E's guide, steps 3–9):
  W_2 →(∥e_3)→ B_3 on loa1 →(∥f_3)→ C_3 on loa2 →(∥g_3)→ D_3 on N's guide.
  Segments c_4, k_4, p_4 (grey, steps 3–9); closing b_4 = W_2–D_3 dash15
  (steps 4–9).
- O_3 = division point: line through Z_1 ∥ b_4 (i_5) ∩ a_3 (steps 4–10);
  p_5 = O_3–Z_1 dash15 grey (steps 4–9).

## Span 2 (loads 3–4 between N and F), steps 6–8
- r_4 = through N ∥ j_4 (segment t_4, steps 6–9); s_4 = through F ∥ same
  (segment h_5, steps 6–9).
- Z_2 = trial pole 2 (steps 7–9), rays l_4 = Z_2–W_1, m_4 = Z_2–U_2,
  n_4 = Z_2–V_2 (steps 7–9).
- Trial funicular 2 from J_3 (draggable on N's span-2 guide t_4, steps 7–9):
  J_3 →(∥l_4)→ K_3 on loa3 →(∥m_4)→ L_3 on loa4 →(∥n_4)→ M_3 on F's guide.
  Segments e_5, f_5, g_5 (steps 7–9); closing d_5 = J_3–M_3 dash15 (8–9).
- N_3 = division point on j_4 via line through Z_2 ∥ d_5 (steps 8–10);
  q_5 = N_3–Z_2 dash15 (steps 8–9).

## Combine, steps 9–10
- Step 9: chords s = E–N and a_1 = N–F turn on (RED dash15, 9–10);
  k_5 = through O_3 ∥ s, l_5 = through N_3 ∥ a_1 → **P_6 = final pole**
  (step ≥9). m_5 = P_6–O_3, n_5 = P_6–N_3 (RED dash15, steps 9–10).
- Step 10: rays r_5 s_5 t_5 a_6 b_6 = P_6 to I_1 V_1 W_1 U_2 V_2 (black th2
  DYN → tension/compression at end) + final funicular h_6..m_6:
  E →(∥P_6 I_1)→ Q_3 →(∥P_6 V_1)→ R_3 → **N** →(∥P_6 W_1... wait order:
  segment j_6 = R_3–N, k_6 = N–S_3**) → S_3 → T_3 → F. Six members:
  E–Q_3, Q_3–R_3, R_3–N, N–S_3, S_3–T_3, T_3–F.
  (R_3–N is ∥ P_6–W_1 through R_3 landing on N; N–S_3 continues ∥ same ray?
  No: 6 members / 5 polygon vertices I_1,V_1,W_1,U_2,V_2 + pole = rays; member
  3 = R_3–N and member 4 = N–S_3 are BOTH ∥ P_6–W_1 — collinear through N —
  that's the theorem: the middle string passes through N.)
- Step 11: reactions w_1, v_1 (green, at E and F; z_1/u_2 hidden by hideRF).
- Step 12: per-member direction vectors v_2..u_4 (green, 10 = beside each
  polygon side + funicular?). internalForce polys only at final state
  (poly1..6, sIF slider): (E,Q_3 | I_1,P_6), (Q_3,R_3 | V_1,P_6),
  (R_3,N | W_1,P_6), + presumably (N,S_3 | W_1,P_6), (S_3,T_3 | U_2,P_6),
  (T_3,F | V_2,P_6).

## Step design for our version (paired, ~19 steps)
0 intro; 1 room + E,N,F; 2 loads (left) + span-1 load line I_1→V_1→W_1
(right, green edges); 3 E/N guides ∥ load line; 4 trial pole Z_1 + rays;
5–6–7 trial strings span 1 (one per ray, grey) → D_3; 8 closing + division
point O_3; 9 span-2 load line W_1→U_2→V_2 (green) + F/N guides; 10 pole Z_2
+ rays; 11–12–13 trial strings span 2 → M_3; 14 closing + N_3;
15 chords E–N, N–F (red dashed) + parallels through O_3, N_3 → pole P_6
(m_5, n_5 red dashed); 16–18 final segments paired with their P_6 rays,
numbered 1..6 both sides (middle two share ray P_6–W_1, caption: the string
through N); 19 reactions + resolve (trial retires).

## Notes
- Check u_5/v_5/w_5/u_6 dynamic colors before choosing green vs black edges.
- Get all baked coords incl. P_6, Q_3..T_3 for regression.
- frame from euclidianView; sliders: HorF 4.6 [1,5], HorM 17 [1,20],
  loadSymbol 4 [1,5], scaleForceDiagram 1.7 [1,2] (units/kN), F_1..F_4,
  sIF [0,0.1].
