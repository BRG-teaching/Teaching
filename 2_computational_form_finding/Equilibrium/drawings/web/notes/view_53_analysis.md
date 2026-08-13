# view 53 — Expo Pavillon Lisbon, A. Siza (decode notes)

Source: view_53/applet_0/geogebra.xml (170 commands); live dumps
scratchpad/live53/*.json (s0..s7 + mode1); chain scratchpad/v53_cmds.txt.

## Construction

- Cable C=(3.6228, 9.6666), D=(10.9786, 9.6666); E = midpoint; F draggable on
  the mid vertical (rail y 8.4161..9.5965); E′ = Mirror[E, F] (DOUBLED sag);
  chords s_3=[C E′], t_3=[E′ D]; the cable = CircumcircleArc[C F D] (an arc,
  not strips!). Load R = Vector[G N] with G=(21,11) free, |R| = 1.2 units.
- Pole O = Line[G ∥ E′–D] ∩ Line[N ∥ C–E′]; A = O→G, B = N→O; the applet's
  offset apparatus (Circle[O, scaleOffsetReactionForces]) draws A/B beside the
  triangle edges — ours offsets the green arrows by sORF perpendicular.
- Wall: polygon R₂→P₂→N₁→M₁→I₁→L₁→O₁→S₂ traced OVER the applet's section
  screenshot (pic2, corners A_1=(3.2851,7.7857) bl, B_1=(3.2851,3.0964) br —
  ROTATED 90°: tl = bl + (3.5162, 0)). **R₂=(4,4) draggable on the track
  PolyLine[(2.2402,4), (4,4), (4,2.3027)]** (k_3): P₂ = R₂'s vertical ∩ the
  top line y=7.3946, S₂ = R₂'s horizontal ∩ the toe vertical x=5.7598 —
  the wall reshapes. A′ enters at Q₁ = outer edge x=6.4398 ∩ line through
  Bt=(4.05, 7.3446) ∥ chord C–E′.
- Wall force polygon at Z₁=(18,4) (draggable): A′ = Z₁→A₂ (= N→O translated);
  member 1 = Z₁→B₂ ∥ the wall diagonal P₂–S₂ (BLUE, compression to the toe);
  member 2 = A₂→B₂ vertical (RED, the inner edge that wants tension);
  C = ground bearing at the toe (arrow into S₂ along Bt–S₂), D = the wall
  weight at the Bt vertical. Roof reference drawing pic3: bl=(2.5,8),
  br=(12.6,8.05), tl≈(2.4903,9.9540).
- Steps (applet 0..7): s1 site (q band flash); s2 R; s3 sag + chords + f dim
  (retire at s5); s4 arc + triangle; s5 A′ + Z₁; s6 wall block; s7=s0 resolved.
- Colors at s0: 1 blue (k_2/r_3), 2 red (l_2/q_3), A′ seg red (w_2) + green
  arrows; A/B triangle edges red thin (n/p) under green arrows (i_3/w_3);
  grey offset ticks. Hidden booleans: o = showHandles, o_1 = showPoints.

## Regression

scratchpad/v53_regress.py: worst 1.9e-14 (E′, O, Q₁, A₂, B₂ over s0/s7/mode1).
