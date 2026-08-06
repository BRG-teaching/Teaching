# View 11 — Golden Gate Bridge (decode notes)

Source: `view_11/applet_0/geogebra.xml` (605 KB), title "Golden Gate Bridge".
Frame x [-2.2127, 27.9615], y [-5.9032, 9.1840]. mode 0 = overview, mode 1 =
steps 0-10 (step 0 = finished overview + bridge line-drawing image).
Embedded image `800px-Golden-Gate-Bridge_lines_clean.png` (pic3, corners
E_20=(-0.7984, 0.2606) → F_20=(26.8324, 0.2606), 800×243 px → height 8.394,
shown ONLY at step 0, full alpha; pic1 unused/hidden).

## Booleans / sliders (exhaustive sweep + live ggbApplet check)

- trialConstruction (false; checkbox appears at step 2): grey main-span trial
  (two trial poles U_9 (25.178, -0.800) / W_9 (24.937, -3.069), trial
  funiculars from M_8 (on tower-2 vertical, y 7.106) and W_5 (centre vertical,
  y 7.736), closings + parallels through the trial poles -> division points
  O_10/J_11, connectors K_11–J_11 / K_11–O_10 black dashed).
- TrialFunicular o_1 (TRUE; drawn only at applet step 5): side-span trial:
  pole L_13 (8.532, -0.782), start T_21 on tower-1 vertical (6, 7.335), grey
  trial funicular right-to-left over the 8 side fields, closing E_22–T_21 grey
  dashed, ∥closing through L_13 -> division Z_13 on the side load line; orange
  dashed: chord U_12–C (m_18) and Z_13–A_14 (c_21).
- showDimensions (true): grey dimension line at y = Z_15.y (2.8575) with cross
  ticks at x 2.48/6/12.38/18.76/22.28, texts "1125 ft (345 m)",
  "4200 ft (1280 m)", "1125 ft (345 m)" above (y ≈ 2.92).
- showHandles (false): extra draggable handles of the component rows.
- o = showPoints (false), o_2 = showArrows (false: per-hanger load arrows on
  the deck rows at steps 1/4, orange tick rows — not ported, symbolic).
- sliders: scaleLoadSymbol 1 [0.5,2] (symbolic arrow length),
  distanceLoadSymbol 0 [0,0.5], load 0.7 [0,5], scaleForceDiagram 0.6
  [0.5,0.8], factor 0.4 [0,1], scaleLoadSymbol2 0.8 (unused visibly),
  step [0,10], mode [0,1]. Hanger unit u = load·sFD·factor = 0.168/hanger.

## Fixed geometry

- Deck: three GREEN translucent bands y 5.0..5.1: side x 2.48..6 (poly1),
  main x 6..18.76 (poly2), side x 18.76..22.28 (poly3). poly2 flashes orange
  at step 1 (R₁ field load), poly1+poly4 orange at step 4 (R₂ side load);
  else green (0,0.6,0). Deck lines h (y=5) and s_2 (y=5.1).
- Towers x=6 and x=18.76: base B=(6,5)/F_5=(18.76,5), tops C=(6,6.57) /
  Z_5=(18.76,6.57), black th2 verticals.
- Anchor verticals x=2.48 / 22.28; anchor points U_12 (draggable on dashed
  segment y 4.4..6.1, default y 5.0128) and T_12 (same height, mirrored via
  horizontal e_23).
- Hanger stations: E-row y = E.y (2.1798, E draggable on x=6): side-left
  x 2.7..5.78 (8), main x 6.22..18.54 (29), side-right 18.98..22.06 (8);
  thin dotted guides from the E-row to y=9; 5 dash-dot station verticals at
  2.48, 6, 12.38, 18.76, 22.28; centre dash r_2 (12.38, y 3.8..6.2) carrying
  the sag handle B_6 (12.38, 5.1662); R₂ action verticals x 4.24 / 20.52
  black dashed (step≥5); R-arrow row y = Z_17.y (4.221, Z_17 draggable).

## Construction chain (all re-derived + regression-checked)

- Main load line (x=23): O_8=(23, 0.5) draggable; T_9 = O_8 − (0, 29u);
  V_9 = O_8 − (0, 14.5u).  Division points (invariant of the hidden trial;
  equal to the half-span beam reactions): d* = u·0.44·105/6.38 = 7.2414u;
  O_10 = O_8 − (0, d*) (right half), J_11 = T_9 + (0, d*) (left half).
- Pole K_11 = ∥(half-chord B_6–C) through J_11 ∩ ∥(B_6–Z_5) through O_10
  = (17.4579, −1.9360). H = 23 − x(K_11) = 5.5421.
- Main cable: from B_6, right half ∥ rays K_11→cut_k, k = 14,13,…,1 at
  x = 12.82+0.44j, last segment → Z_5 ∥ K_11→O_8; left half ∥ rays k = 15..28
  at x = 11.94−0.44j, last → C ∥ K_11→T_9. Closure at both tower tops exact.
  A = T_9→K_11 (cable force at tower 1), B = K_11→O_8 (tower 2), green th7;
  form arrows at tower tops ∥ A/B, length scaleLoadSymbol (circle construct).
- Components (step 3): A_H/B_H = ∓(H,0), A_V = B_V = 14.5u (K_11 is level
  with V_9); drawn on handle rows x=23 (A_H at y −5.365) and x=23.80 (A_V,
  B_V stacked at the T_9/V_9/O_8 levels), dashed connectors.
- Side span (left): load line x = x(M_16): M_16 = (3.7937, 0.8492) draggable,
  K_13 = M_16 − (0, 8u). Division Z_13 = M_16 − (0, 4u) (exact: hangers at
  0.22+0.44j from the anchor, Σ/3.52 = 4). Pole A_14 (= S_14) = ∥chord
  (U_12→C) through Z_13 ∩ vertical x = x(M_16) − H = (−1.7484, −2.2746).
  H-locus vertical m_20 drawn dashed from step 4. Side cable: from U_12,
  segments ∥ rays A_14→(K_13 + k·u), k = 0..8, at x = 2.7+0.44j, last → C.
  Force triangle: R₂ = M_16→K_13, H(anchor) = K_13→A_14, C(backstay) =
  A_14→M_16.
- Right side span: literal mirror about the centre vertical x=12.38 (form)
  and about the vertical x = x(M_16) (t_18) in the force plane: right pole
  U_13 = (9.3358, −2.2746), load line S_13–T_13 at x = 9.3358; J = K_13→U_13,
  D = U_13→M_16. R₂ arrows at x 4.24 / 20.52 on the Z_17 row.
- Tower equilibrium (step 8): tip-to-tail at x = x(T_29) (15.5447, draggable):
  C down (A_30→Z_29 = −C), A down-right (Z_29→W_29 = −A), E = W_29→T_29
  straight up, |E| = A_V + C_V = 14.5u + |C_V| (C_V = 3.1238 at defaults).
  Form: E green arrow up under the deck at tower 1 (length sLS), F at tower 2.
  texts: "E = C_V + A_V", "F = B_V + D_V".
- Anchor forces (step 9): H components H_H = −(H,0), H_V = −(0, 1.7798)
  (= y(K_13)−y(A_14)); force side below the side fan (E_21 row y −4.268) and
  at x = 4.606 (M_21/N_21); form: symbolic unit arrows left/down at U_12;
  mirrored J_H/J_V at T_12.

## Regression (scratchpad/v11_regress.py)

Re-derives O_10, J_11, K_11, cable vertices (L_11, M_11, N_11, B_12, C_12,
E_12 + closures at C and Z_5), H, Z_13, A_14/S_14, side-cable vertices
(I_14, H_14, B_14 + closure at C), mirror points (J_14, K_14, Q_14, U_13,
S_13, Q_13), component points (D_15, E_15, Q_15, A_27, M_21, N_21, P_21,
Z_29, A_30) against the baked XML coords. Result: max error 6e-4 (K_15 chain,
6-decimal baked rounding), typical ≤1e-4; closures ≤1e-12.

## Our step list (paired, accumulate-only)

0 intro (bridge line-drawing) · 1 site: image + deck bands, towers, anchors,
station verticals + dimensions, hanger guides · 2 main load: main band flash +
R₁ at the sag vertical — load line R₁(field) 29u · 3 sag handle + half-chords
B₆–C / B₆–Z₅ — parallels through the division points i₁ i₂ (trial toggle) →
pole K · 4 rays from K — the main cable, hangers · 5 cable forces A, B at the
tower tops (both sides) · 6 components A_H A_V, B_H B_V (both sides) · 7 side
load: side band flash + R₂ — side load line 8u · 8 side trial (grey, per
applet default) → division i₃; chord U₁₂–C; H-locus at distance H → pole o₁ ·
9 side rays — side cable + hangers; H and C triangle (both sides) · 10 right
side span by symmetry (mirror cable, hangers, R₂, J/D triangle) · 11 tower
equilibrium: E = A+C tip-to-tail, E/F arrows (form) · 12 anchor components
H_H H_V / J_H J_V (both sides) · 13 resolve: cable pink = tension, pipes,
magnitudes in P (hanger loads).

Deviations: divisions computed directly (invariant; the applet's hidden
trialConstruction scaffold is summarised by the connectors + caption);
per-hanger deck arrows (o_2) not ported; component handle rows fixed at the
applet defaults (not draggable); magnitudes printed in units of the hanger
load P (the applet gives no kN scale); orange = node inspector only.

## Implemented (2026-08-06)

views/view_11.js, 14 steps (0-13) per the step list above. Regression:
31 baked points, max err 2.9e-4 (4-decimal baked rounding), funicular
closures at both tower tops and the side spans exact (1e-16); trial chains
verified against baked Z_9/R_10 (cut indexing: right trial uses cuts 0..14,
left trial cuts 15..29). Live-applet sweep (mode 1 steps 0-10 + all five
toggles) in scratchpad/live11/. Bridge image anchored at the applet's exact
pic3 corners, shown at steps 0-1 (0.95/0.4 opacity), retired after — the
applet shows it at its step 0 only.

Further deviations beyond the notes: the mirrored tower-2 tip-to-tail
polygon (B, D, F) is NOT drawn (the applet draws only the tower-1 E polygon;
placing a second 5.5-unit-wide polygon anywhere in the force strip collides
with the main fan) — its coordinates still drive the tower-2 node inspector;
force-side J_H/J_V rows omitted like the applet (form arrows only);
subscripts written A_H etc. in ASCII (the viewer font lacks subscript
letters); cable/hangers grouped as stroke sets (30+29+9+8+9+8), so hover
links pair whole groups, and per-member numbers are not used (the applet
names forces, not members).
