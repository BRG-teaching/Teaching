# view 35 — Lufthansa Hangar V (decode notes)

Source: view_35/applet_0/geogebra.xml (252 commands), live defaults confirmed via
scratchpad/live35/*.json (13 step states + geom6/geom16 + mode1 + H-swing dumps).

## Construction

- Truss: A free (7.372, 12.212); B = A+(22,0); C = A+(0,34); D = (B.x, C.y);
  E = mid(C,D). F/G = lower intersections of circles radius
  `ChangeGeometryofTruss` (6..20, default 11) around C,E and E,D — the slider
  spreads the inner triangle.
- Members (form label → applet segment): 1=C–F(l) 2=C–E(m) 3=F–E(t) 4=F–G(s)
  5=G–E(a_1) 6=E–D(n) 7=D–G(p) 8=G–B(q) 9=B–F(j) 10=A–F(r) 11=A–B(i_7).
  Live colors at default: blue 1,3,5,7,8,9,10; red 2,4,6,11.
- F₃ direction: H rides an arc (f_5) around D, radius 26.4966; the load line
  through H–D (b_1). Loads F₁=900 @C, F₂=1110 @E vertical, F₃=1000 @D inclined
  (sliders 500..2000).
- Force diagram: O free (80,60); P,Q stacked by F₁/sFD, F₂/sFD; S = Q +
  (F₃/sFD)·unit(D−H). R₁₂₃ = O→S (t_1, dashed).
- Trial: pole T free; strings from U (on the vertical through A) ∥ TO, TP, TQ,
  TS → V (on E's vertical), W (on the H–D line), Z = first∩last string;
  action line l_2 through Z ∥ O–S.
- Three-force: A = vertical roller → S₃ = action line ∩ vertical through A;
  pin direction S₃–B; C₁ = Line[O, vertical] ∩ Line[S ∥ S₃–B]. A_V = C₁→O,
  B = S→C₁ split into B_V (E₁ = (O.x, S.y) corner, drawn offset by
  offsetReactionForces) + B_H.
- Cremona: G₁ (joint C: from P ∥ 2, from O ∥ 1), H₁ (joint A: from O ∥ 10 ∩
  horizontal through C₁ — D₁ ≡ C₁), I₁ (joint B), J₁ (joint F), K₁ (joint E);
  joint D/G close automatically (member 7 = K₁→S).
- ZERO VERDICT: Text3/4/5 ("10=0", "11=0", "A_V=0", ORANGE 255,127,0) shown
  when |r_3| = |O–H₁| < 0.05 units AND at their steps — at the default loads
  the resultant passes (nearly) through B. Ours: same condition, the form/force
  member numbers 10/11 give way to the labels (applet's s6 mask hides
  text10_9/text10_{10}).
- Applet steps 0..12 (0 = resolved): s1 loads+load line+R, s2 trial, s3
  three-force (trial retires AFTER s2 — ours TRIAL_END=7), s4 reactions
  resolved, s5..s11 joints (C, zero-A, B, F, E, D close), s12 R-check.

## Regression

scratchpad/v35_regress.py: 23 points × 6 live states (default, s4, s12, geom=6,
geom=16, H swung −0.35 rad) — worst 7.7e-13. Sense colors verified against live
getColor() in default AND swung states (10/11 wake at ~58 kN, stay blue/red).

## Gotchas

- The trial polyline is U–V–W only (i_2); U–Z and W–Z are separate closing
  strings (j_2/k_2) — draw dashed, don't duplicate W–Z.
- D₁ ≡ C₁ always (both on the load-line vertical) — the applet keeps two names.
- The reaction symbols in the FORM are fixed loadSymbol-length arrows (u, v,
  w_1 from circles radius loadSymbol), not force-proportional.
