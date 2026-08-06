# view_20 — Hoop forces in a masonry arch (dome slice)

Decode of `view_20/applet_0/geogebra.xml` (472 KB, 691 commands). No embedded images.
XML baked coords of many DERIVED points are a degenerate saved state (e.g. W @(451.8,396.2));
regression uses `view_20_compas.py` + recomputation. **54 derived points matched to 6.6e-7**
(scratchpad/v20_regress2.py). Live original captured via CDP + ggbApplet API
(scratchpad/v20/orig_*.png): mode 0, labels+points on, o_4 layer, node 1/8 views.

## The construction

A hemispherical dome is cut into wedge-shaped slices (lunes). One slice, of half-angle
θ (drag CoSl₁ on the plan arc, range 8.3°–23.5°), is analysed as an arch that CANNOT
stand alone — horizontal hoop forces from the neighbouring rings keep the pressure
line on the mid-surface.

Free/anchor state (defaults):
- A = (19.8614, 11.3454) centre of the section; poleSlice = (A.x, 4.9403) centre of the plan
- handleRadius x = 29.5059 → R_out = 9.6445 (drag on constrainRadius, x ∈ [28.04, 31.17])
- innerRadiusR x = 27.5105 → R_in = 7.6490 (drag along the springing line)
- CoSl₁ = (28.8632, 8.4022) → θ = 21.0357° (range: W₆ 8.32° … V₆ 23.47°)
- SPforceDiagram = (48.0305, 19.6556) (drag); sliders: scaleForceDiagram 0.6 [0.5,1],
  F_G 1 [1,3], loadSymbol 1.5 [1,2], oLL 5 [0,5] "offset loadline"
- booleans: o (show reaction forces, TRUE), o_1 showLabels F, o_6 Points F, sh handles F,
  o_4 loadlines-construction F (green full-height thin dashed verticals), cls cover-left F
  (degenerate at defaults), o_2 unused, o_3 = TRUE gate on decomposition segments.
  mode [0,2], step [0,8] (mode 1), node [0,9] (mode 2). Slider i = 0 [0,0] → ALL the
  Circle(X,i) offset-arrowhead scaffolding collapses; ignore it.

Section: half-ring split into 8 courses of 11.25° by repeated AngularBisector;
outer pts (0°→90°): handleRadius, M, I, L, G, K, H, J, E; inner: U, T, P, S, O, R, N, Q, D.
Course centroids (GeoGebra Centroid = AREA centroid of the quad, top→bottom):
V, W, Z, A₁, B₁, C₁, D₁, E₁; mirrored across the crown axis: V′…K₁ (left half, grey).
Radial joints drawn both halves; ring outline = CircumcircleArcs d_15 (outer), e_15
(inner) + springing joints m₁ (handleRadius→U), j₂ (left) + crown joint b₂ = E–D.
Dashed centre line centerToOuterRadius = Segment(A, handleRadius); constrainRadius and
constrainSlice are dash-dot drag guides.

Plan (top view): rays q′ (+θ), r′ (−θ) from poleSlice, outer arc q_c (R_out, th 3).
Course j ring arc at radius r_j = centroid_j.x − A.x (dropped via the MIRRORED
line of action ∩ e): arcs i_c(j=1,V)…p_c(j=8,E₁); arc length = 2θ·r_j.

Weights: F_j = arc_j · F_G, F₁ ×1.75 extra (crown cap). Load line at SP:
PF₂…PF₉ descending, edges f₁…f₈ green. Lines of action = verticals through the
RIGHT centroids (grey dotted, y 0.626–23.43); green load arrows in the band
y 21.29→22.79 (I₉/K₉, length loadSymbol); grey mirror loads on the LEFT verticals.

Force diagram: d₃ = horizontal through SP (crown level, HIDDEN — do not draw).
Member j (chain V→W→…→E₁) : through PF_{j+1} ∥ member j → ∩ d₃, mirrored across the
vertical through SP → points A₄,C₄,E₄,G₄,H₄,D₄,B₄ (members drawn PF_{j+1}→X_j, blue).
Because every hoop is horizontal, every meridional force ends on d₃.
Hoops (telescoping on d₃, Σ = 0): H₁=A₄→SP, H₂=C₄→A₄, H₃=E₄→C₄, H₄=G₄→E₄,
H₅=H₄→G₄, H₆=D₄→H₄, H₇=B₄→D₄, H₈=SP→B₄. +x = outward = ring COMPRESSION (blue),
−x = inward = ring TENSION (red/pink). Defaults: H₁..H₄ compression, H₅ ≈ 0 (−0.014),
H₆..H₈ tension. H₆,H₇,H₈ are drawn on the OFFSET line e₃ at SP.y + oLL (E₅→Z₃ etc.,
feet of B₄,D₄,H₄), linked by dotted verticals i₈,j₈,l₈; NOT as a drawn line (hidden).
Reaction B = total slice weight, vertical, drawn offset: m₈ = PF₉→U₃ dotted,
B = U₃→D₅ at x = SP.x + oLL, k₈ = dotted quarter-arc D₅→E₅. Form side: base member
g₄ = E₁→C₅ (vertical, C₅ = drop of E₁ to springing level) + green B arrow up at C₅.
Crown: R₂ = crown joint at V's height; segment r₃ = R₂→V carries ZERO force (the
wedge tapers to nothing at the axis) — the node-8 polygon closes SP→PF₂→A₄→SP.

Plan ring forces: offset lines t₅ ∥ q′ and j₆ ∥ r′ at distance loadSymbol OUTSIDE the
wedge. Per course, tangential arrows at the two edge points (fixed length loadSymbol):
compression courses point ONTO the edge (B₆→J₄ …), tension courses point AWAY
(Q₄→I₆ …); labels N′_j (q′ side) / N″_j (r′ side). In the force diagram each hoop H_k
is decomposed ∥ perp(q′)/perp(r′): triangles above d₃ for compression nodes
(K₇,J₇,I₇,H₇,O₇), below e₃ for tension nodes (L₇,M₇,N₇). |N′| = |N″| = H/(2 sinθ).

Applet colors (mode 0, live-verified): form chain red for members 5,6,7 + base
(the hoop-TENSION zone of the shell — the ~52° rule), blue above; force-side member
fan all blue; hoop arrows/arcs/N-vectors blue (compression) / red (tension); loads +
B green; left mirror apparatus grey. d₄'s dynamic blue channel "10" is a GeoGebra
typo (treated as red like its neighbours). The applet picks fixed intersection
outputs for the section hoop-arrow directions, so near the sign change (H₅) its
arrow can point the wrong way — we point arrows by the computed sign instead.

## Node sub-polygons (inspector; node 1 = E₁ … node 8 = V, as the applet)

X₀ = SP, X_j = [A₄,C₄,E₄,G₄,H₄,D₄,B₄][j−1]; course c = 9 − node.
- node 8: [SP→PF₂, PF₂→A₄, A₄→SP]
- nodes 2–7: [X_{c−1}→PF_c, PF_c→PF_{c+1}, PF_{c+1}→X_c, X_c→X_{c−1}]
- node 1: [B₄→PF₈, PF₈→PF₉, U₃→D₅ (B, at the drawn OFFSET arrow per user mandate),
  SP→B₄]

## Step list (hand-crafted, paired form+force; applet steps 1–8 are coarser)

0 intro · 1 section ring + plan wedge (given geometry, drag handles) ·
2 the 8 courses (radial joints both halves) · 3 top course: centroid + line of action
(+ mirrored line → plan radius) + plan arc 1 + F₁ (form arrow AND load line) ·
4 all courses: centroids, lines, arcs 2–8, F₂…F₈ + grey mirror apparatus ·
5 mid-surface chain guide (grey dashed R₂→V→…→E₁→C₅): the pressure line must follow it ·
6 base: member g₄ + B both diagrams (m₈, k₈ dotted) · 7 member 7 + '7' both sides ·
8 hoop H₈ both sides (offset line arrows + i₈) · 9 member 6 + H₇ (+ j₈) ·
10 member 5 + H₆ (+ l₈) · 11 members 4,3,2,1 + crown r₃ (+ numbers both sides) ·
12 hoops H₅…H₁ · 13 plan ring forces, tension courses (N′₆–N′₈ + force triangles
L₇,M₇,N₇) · 14 plan ring forces, compression courses (N′₁–N′₅ + K₇…O₇) ·
15 resolve: region colors + readouts (F_j, H_j, B), ΣH = 0 caption.

## Deliberate deviations
- Member numbers, H/N′ labels always on (applet: o_1 default false); N′ labels
  alternate offsets where the outer arcs crowd.
- Section hoop-arrow directions follow the computed sign (see above).
- d₃/e₃ never drawn (hidden scaffolding); dotted helpers k₈/m₈/i₈/j₈/l₈ are drawn.
- 'cls' cover-left polygon skipped (degenerate baked state, presentation-only).
- o_4 green load-line construction layer reproduced as a default-off toggle.
- No internal-force pipes: the applet defines scaleInternalForces = 0 and uses no
  internalForce macro (o_2 gates nothing).
- Form chain red/blue marks the hoop-tension REGION (as the applet); captions say so
  explicitly ("pink = courses that need hoop tension").
