# view_16 "Minimum and maximum thrust in a masonry arch" — decoded algorithm

A semicircular masonry arch (16 equal voussoirs) with TWO thrust-line
funiculars: the MAXIMUM-thrust line through the crown INTRADOS and the
extrados springings (thick blue, pole o₁, load line 1 at x = 39) and the
MINIMUM-thrust line through the crown EXTRADOS and the intrados springing
points (thin blue, pole o₂, load line 2 at x = 45.29). Each pole is found by
the two-point funicular method: trial pole + closing string → division point
→ parallel to the real closing chord → pole on the crown horizontal.
Site note text: "The thrust line has to be contained within the bounding
geometry for the arch to be stable."

## Geometry (defaults; A = arch centre, free grey point)
- A = (20.74421133215402, 10.224749441793364); springing line l through A.
- rE = 9.53656831073833 (extrados radius; handleArcRadius draggable on l,
  x ∈ [28.92, 32.05] ⇒ rE ∈ [8.18, 11.31]); rI = 7.649043668313393
  (intrados; point B hidden — NOT draggable in the applet).
- θ₀ = atan2(1.432703, 9.428335) ≈ 8.643° — the springing angle
  (handleArcSegment draggable on constraintArc up to ≈ 35.1°).
- Full semicircles c (intrados) and d (extrados) drawn BLACK DASHED (type
  20); the analysed segment F'–E–handleArcSegment (extrados, CircumcircleArc
  d_15) and U'–D–U (intrados, e_15) drawn SOLID black.
- Joints: uniform angular subdivision θ_k = θ₀ + k·(π/2−θ₀)/8, k = 0..8
  (achieved by repeated AngularBisector); joint k = segment intrados(θ_k) –
  extrados(θ_k); crown joint b_2 = D–E on the axis; mirrored left (j_2 =
  F'–U' springing). 16 voussoirs.
- Voussoir centroids = GeoGebra Centroid[Polygon] of each 4-gon (eE_k,
  eE_{k+1}, cI_{k+1}, cI_k): right V, W, Z, A_1, B_1, C_1, D_1, E_1
  (crown→springing) + mirrors across the crown axis. 16 vertical centroid
  lines left→right (grey dash20 q_17.. from y 8.3308 to 24.8218, always on).
- 16 green load arrows (th5): at each centroid line from y 23.905 down to
  22.405 (length = loadSymbol 1.5), always visible. Voussoir weight = CONST
  wv = 1.657584521446055 kN (|L_1M_1|), independent of the arch size.

## Load lines (y top = 24, drop per voussoir = wv·sFD = 0.8288)
- Load line 1: T_2 = (39, 24) free (cap 'a'); P1_0..P1_16 (bottom L_3);
  drawn SOLID black th2 (r_8). Crown point P1_8 at y 17.3697; the crown
  horizontal i_5 through it carries BOTH poles.
- Load line 2: handleForceDiagram2 = (45.2876, 24) on the horizontal through
  T_2; P2_0..P2_16 (bottom L_{11}); drawn DASHED th2 (k_20, dash10).

## Maximum thrust (funicular 1, th5 blue, pole D_5 = o₁)
- Prescribed: crown point handleFunicularTop on joint D–E (default = D =
  intrados) + the mirrored extrados springings F', handleArcSegment.
- Trial 1 (ORANGE, COND o_4 'show construction polygons', default HIDDEN):
  trial pole L_5 = (52.8016, 23.3948); rays L_5→P1_0..8 grey; trial
  funicular from M_5 (draggable on the vertical through F', y 26.7665)
  across the 8 left centroid lines to V_5 on the crown axis (the chain
  segments are show=false even with o_4 — we stage them grey and retire);
  closing string l_12 = M_5–V_5 orange dash15 th3.
- W_4 = (through L_5 ∥ closing) ∩ load line 1 = division point (39, 20.379).
- Pole D_5 = (through W_4 ∥ chord F'–handleFunicularTop) ∩ crown horizontal
  = (34.4366, 17.3697). H_max = (x(T_2)−x(D_5))/sFD = 9.128 kN.
- Funicular 1: F' →(∥ D_5–P1_0)→ A_6 on line 0 → … → H_6 on line 7 →
  horizontal through handleFunicularTop → T_3 on line 8 → … → C_4 on line
  15 →(∥ D_5–P1_16)→ handleArcSegment. All 16 lines are crossed (F' is
  always outside the leftmost centroid line). Segments th5 blue.
- Reactions (green th5): on the force diagram u_7 = T_2→L_3 (total W, ON
  the load line), v_7 'B_1' = L_3→D_5, w_7 'A_1' = D_5→T_2 (COND hideRF
  false); in the form w_5 'A_1' at F' (tail = F' − unit(T_2−D_5)·loadSymbol)
  and v_6 'B_1' at handleArcSegment (tail = hAS − unit(D_5−L_3)·loadSymbol).
- internalForce macro pipes VD1..VD17 (blue 0,0,0.855) along funicular 1,
  force k = |D_5 − P1_k|·(1/sFD); scaleInternalForces default 0 (we default
  them visible per the platform contract).

## Minimum thrust (funicular 2, th2 blue, pole B_5 = o₂)
- Prescribed: springing point handleFunicularBottom on the right springing
  joint hAS–U (default = U = intrados), its mirror L_4, and the crown
  EXTRADOS E.
- Trial 2 (CYAN 0,255,255, COND o_4): trial pole A_5 = (55.5859, 18.1203);
  rays A_5→P2_0..8; trial funicular from M_4 (draggable on the vertical
  through L_4, y 31.8469) to V_4 on the crown axis; closing q_8 = M_4–V_4
  cyan dash15 th3.
- Z_4 = (through A_5 ∥ closing) ∩ load line 2 = (45.2876, 19.6044).
- Pole B_5 = (through Z_4 ∥ chord L_4–E) ∩ crown horizontal =
  (43.2734, 17.3697). H_min = (x(hFD2)−x(B_5))/sFD = 4.028 kN.
- Funicular 2 SKIPS the centroid lines outside its end points: i0 = #lines
  with x ≤ x(L_4) (default 2). CRITICAL subtlety (found by regression —
  0.09..0.47 error otherwise): the sector Ifs RESTART the chain AT the
  handle — the chain starts at L_4 itself with direction ∥ ray B_5–P2_{i0}
  (NOT at the virtual vertex of a chain begun ∥ ray 0). Same for trial 2:
  M_4 shares L_4's x, so its chain starts at M_4 ∥ ray A_5–P2_{i0}. DRAWN:
  L_4 →(∥ ray i0)→ vertex on line i0 → … → vertex on line 15−i0 →(∥ ray
  16−i0)→ handleFunicularBottom; the crown span j_15 = (vertex on line 7)–
  (vertex on line 8) is one straight horizontal segment THROUGH E (tangent
  to the extrados; verified collinear to 1e-14).
- Reactions (green th5): u_14 = hFD2→L_{11} (total, on load line 2), u_8
  'B_2' = L_{11}→B_5, v_8 'A_2' = B_5→hFD2 (COND hideRF false); form: 'A_2'
  at L_4 along the first drawn segment (tail = L_4 − unit(v0)·loadSymbol),
  'B_2' at hFB along the last drawn segment — the applet picks these via
  sector-conditional vectors (u_3/u_4/u_6/w_6, v_5/u_5/z_4/w_4).

## Toggles / sliders
- scaleForceDiagram 0.3..1 (0.5), scaleInternalForces 0..0.1 (0),
  loadSymbol 1..2 (1.5), hideRF ('hide reaction forces in force diagram'),
  showHandles (load-line letters a..i etc., default off), o_4 'show
  construction polygons' (default OFF — trial apparatus hidden at rest),
  o_3 'show force diagram no1' (defined but referenced by NO element —
  dead toggle, skipped).

## Port decisions
- 17 steps 0..16, RESOLVE = 16: arch (site, instant) → voussoir joints (2)
  → weights + BOTH nothing… weights paired with load line 1 (3) → max: crown
  handle + chord (4) → trial 1 (5) → division + pole o₁ (6) → funicular 1
  left + rays (7) → right + rays (8) → reactions 1 (9) → min: springing
  handle + chord + load line 2 (10) → trial 2 (11) → division + pole o₂ (12)
  → funicular 2 left (13) → right (14) → reactions 2 (15) → resolve (16):
  trials retire (the applet hides them at rest via o_4), thrust lines
  resolve blue = compression, pipes on funicular 1, H_max/H_min readouts.
- Trial 1 orange (PAL.orange), trial 2 cyan 0x0e9aa7 (applet 0,255,255).
- Node inspector on funicular 1 (max): 18 nodes = F', 16 loaded vertices,
  hAS. Interior node i: [P1_i→P1_{i+1}, P1_{i+1}→D_5, D_5→P1_i]; springings
  degenerate to member + reaction.
- Draggables: crown point (y along D–E), springing point (t along U–hAS),
  handleArcSegment (θ₀, clamp 0.03..0.6 rad), handleArcRadius (rE), T_2,
  handleForceDiagram2 (x), trial poles + trial starts, A (moves the arch;
  rI kept constant relative to A — in the applet B is an independent hidden
  point so dragging A would change rI incidentally; not pedagogy).
- meta.frame [[6.8, 6.3],[56.8, 27.7]] — wider than the applet export frame
  because the applet's own trial poles (52.8, 55.6) sit OUTSIDE its frame.

## Regression
scratchpad v16/regress.py re-derives: joints, all 16 centroids + mirrored
line x's, both load lines, both trial chains + closing strings, W_4, Z_4,
D_5, B_5, funicular 1 (A_6..H_6, T_3..C_4 + landing on hAS), funicular 2
(E_5..Z_5 virtual, E_4..I_6, crown collinearity through E, landing on hFB),
reaction arrow tips — 53 targets vs the baked homogeneous coords:
max |Δ| = 5.6e-13; funicular-2 crown segment through E collinear to 2.8e-14.
H_max = 9.128 kN, H_min = 4.028 kN, i0 = 2.

## Port verification (2026-08-06, after implementation)
- Live-applet boolean sweep (ggbApplet API on block.arch.ethz.ch/eq/drawing/
  view/16): hideRF hides exactly {v_7, w_7, u_8, v_8}; showHandles reveals 65
  objects (load-line division points/edges + funicular vertex points +
  letters a..i); o_3 changes NOTHING (dead toggle, confirmed); o_4 reveals
  the 54 trial objects. All four reproduced (o_3 skipped); defaults match.
- The applet marks every voussoir centroid with a grey CROSS (pointStyle 1,
  default visible) — ported as the cenMarks strokes (step 3).
- Site note text is "Note: ..." in black — ported verbatim.
- Deviations (deliberate): trial funicular CHAINS are staged grey during
  steps 5/11 and retire at resolve (the applet computes but never shows
  them — without them the closing string is unmotivated); closing-string /
  chord parallels are clipped to their construction spans (the applet draws
  unclipped infinite dashed lines); a grey dashed "crown horizontal" guide
  through the poles is added (the applet's i_5 is show=false); frame top
  raised to y=32.3 so the trial-2 apparatus (M_4 at y 31.85) is visible —
  the applet clips it off-frame; funicular-1 vertex points shown via "show
  points" (default on, platform convention).
- Node inspector: 18 nodes on thrust line 1 (A = F', 1..16 = loaded
  vertices, B = springing); interior node k closes {P1_k->P1_k+1,
  P1_k+1->o1, o1->P1_k}; springings degenerate to thrust + reaction with
  the reaction side on the SAME coordinates as the drawn green reaction
  vectors (D_5->a / load-line-bottom->D_5). Click-to-inspect verified via
  CDP (click on hAS -> slider 18); drag of the crown handle verified
  (H_max readout 9.13 -> 7.33 kN live).
