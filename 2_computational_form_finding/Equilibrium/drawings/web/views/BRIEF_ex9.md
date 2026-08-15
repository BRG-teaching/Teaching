# DECODE BRIEF — EX 9 "Plates" (Structural Design II, ETH, FS 23)

Sources decoded
- `drawings/web/pdf/EX9-plates-task-en.pdf` (3 pages, A3, 841.89 × 1190.55 pt, InDesign 18.2, 2023-04-28)
- `drawings/web/pdf/EX9-plates-aufgabe-de.pdf` (same, German — used only to resolve ambiguities)
- Theory: compendium `9.1-transferring-of-vertical-loads-en.pdf`, `3.3-loads-en.pdf`,
  `3.4-tributary-area-en.pdf`, plus `2.5-dimensioning-en.pdf` / `2.6-formulary-en.pdf`
  (these two are where the load factors live).

No published solution exists. Every number in §4 is derived here and checked.

---

## 1. TASK TEXT (verbatim, English)

**There are 8 distinct lettered sub-parts**, spread over 4 tasks:
Task 1 → a, b (2). Task 2 → no sub-parts, one instruction (1). Task 3 → a, b, c (3).
Creative Task → a, b (2).

### Page 1

> **Task 1  Tributary area**
> a) Divide each plate into the tributary areas resulting from the placement of the load bearing walls and columns.
> b) Draw the tributary areas of the plate on the columns and colour the area which is relevant for dimensioning.

Figure captions on p.1: `a)`, `b)`, `axonometric drawings`.

> **Task 2  Qualitative internal force flow**
> Draw a qualitative internal force flow and the reaction forces into the axonometric drawing of the two following structures. Indicate tension forces with red, compression forces with blue and reaction forces with green.

(German is subtly different: "…in die axonometrische Darstellung **des Tragwerks**" — singular —
and "Markieren Sie … **äussere Kräfte** grün" = *external* forces, not *reaction* forces.)

### Page 2

> **Task 3  Transferring vertical loads**
> The plate is loaded by a dead area load of s̄<sub>k</sub> = 1 kN/m².
> a) Calculate the design value of the constant area load. Draw the relevant tributary area for one of the five beams (subsystem A) into the floor plan. Calculate the line load g<sub>d</sub> over the relevant beam.
> b) Draw a possible internal force flow in the beam (subsystem A) for the line load found in a). Draw the corresponding force diagram. Indicate tension forces with red and compression forces with blue.
> c) The reaction forces from b) are the same for all five beams that support the plate. These are further transferred to two longitudinal beams (subsystem B). First draw the applied forces. Secondly, find an internal force flow in one of these longitudinal beams with the aid of the force diagram, considering that the maximum compression force is 310 kN. (Hint: In simple arch-cable structures, the elements at the supports are subjected to the maximum force.) Indicate tension forces with red, compression forces with blue and reaction forces with green.

Figure captions on p.2, verbatim: `a)`, `s̄d`, `plate`, `subsystem A`, `subsystem B`, `beams / supports`,
`axonometric drawing`, `plans 1:500`, `subsystem A`, `subsystem B`,
`b)`, `gd`, `form diagram subsystem A 1:200`, `force diagram 1cm ≙ 50kN`,
`c)`, `form diagram subsystem B 1:200`, `force diagram 1cm ≙ 50kN`.

### Page 3

> **Creative Task  Beam grid pavilion**
> An existing pavilion consisting of walls and columns gets a new supporting structure to carry the roof. Given are the point loads resulting from the new roof covering and the position of the walls and columns.
> a) Design a beam grid through which the loads of the roof can be transferred to the existing walls and columns. Note that the maximum length of the beams is 9 meters and that each beam has a hight of 2 meters. Draw your design in both, floor plan and axonometric drawing.
> b) Using the axonometric drawing, consider how the forces are transferred through the beams into the walls and columns. Then draw an elevation of each type of beam in scale in the form diagram and find the respective force flow in it. Indicate tension forces with red, compression forces with blue and reaction forces with green.

Figure captions on p.3, verbatim: `F` (×10), `2 m`, `3 m`, `new beam grid`, `Existing: walls and columns`,
`axonometric drawing`, `point load`, `3 m` (×3 horizontal, ×4 vertical), `floor plan 1:100`, `Views beams 1:100`.

Typo in the sheet: "**hight**" for *height* (Creative Task a).

---

## 2. GIVENS — every printed number

| Quantity | Value | Where it appears |
|---|---|---|
| Course / term | Structural Design II – FS 23 | header, all 3 pages |
| Sheet | EX 9 "Plates", p. 1/3 … 3/3 | header |
| Characteristic area load | s̄<sub>k</sub> = **1 kN/m²**, declared *dead* ("ständige Flächenlast") | Task 3 intro, p.2 |
| Number of transverse beams | **five** (subsystem A) | Task 3 a) and c) |
| Number of longitudinal beams | **two** (subsystem B) | Task 3 c) |
| Max compression constraint | **310 kN** | Task 3 c) |
| Plan scale, Task 3 | **1:500** | caption "plans 1:500" |
| Form-diagram scale, Task 3 b) and c) | **1:200** | captions |
| Force-diagram scale, Task 3 b) and c) | **1 cm ≙ 50 kN** | captions |
| Max beam length, Creative Task | **9 m** (DE adds: *plus Materialstärke*, and states it is a **transport** limit) | Creative a) |
| Beam height, Creative Task | **2 m** | Creative a) and axo dimension string "2 m" |
| Existing walls/columns height | **3 m** | axo dimension string, p.3 |
| Plan grid, Creative Task | **3 m** × 3 (x) and **3 m** × 4 (y) → 9 m × 12 m | dimension lines, p.3 |
| Plan/elevation scale, Creative Task | **1:100** | captions "floor plan 1:100", "Views beams 1:100" |
| Point load | symbol **F** only, magnitude **not given** | p.3 |

Numbers **not** printed but needed, taken from the compendium (`2.5-dimensioning-en.pdf`,
`2.6-formulary-en.pdf`):
- γ<sub>G</sub> = **1.35** (dead load), γ<sub>Q</sub> = 1.5 (live load).
- Notation convention (`3.3-loads-en.pdf`): overbar = **area** load [kN/m²]; lower case, no bar =
  **line** load [kN/m]; capital = **point** load [kN]. Conversions s = s̄·b, F = s·l.
- Tributary-area rule (`3.4-tributary-area-en.pdf`): "loads directly go to the nearest support …
  the distance between two load-bearing elements is halved in each case".

Nothing else — **there is not one dimension line on page 1 or page 2.** All Task 3 geometry has to be
scaled off the drawing. That is done in §3.

---

## 3. GEOMETRY, DIGITISED

Method: `pdftocairo -svg -f N -l N`, then every `<path d=…>` walked with its accumulated
`transform="matrix(a,b,c,d,e,f)"` applied (including `Z` closepath, which restores the last edge of
every rectangle). Dash segments were re-coalesced into single lines. Every claim below was
re-checked against `pdftoppm -r 300/600 -png` crops. Conversions used:
1 pt = 0.3527778 mm → **1:100 → 0.035278 m/pt; 1:200 → 0.070556 m/pt; 1:500 → 0.176389 m/pt.**

### 3.1 Task 3 — floor plan, 1:500 (p.2)

Origin **O = the top-left corner of the plate outline**, SVG (459.36, 344.05) pt.
+X to the right (the 25 m direction), +Y downward on the sheet (the 15 m direction).

| Element | Measured (pt) | Metres (from O) | Nominal |
|---|---|---|---|
| Plate outline (solid) | 141.68 × 85.01 | 24.992 × 14.995 | **25.00 m × 15.00 m** |
| A-beam 1 (dashed pair) | x 12.74 … 15.54 | 2.247 … 2.741 | centre **2.50 m**, width 0.50 m |
| A-beam 2 | x 41.04 … 43.94 | 7.239 … 7.750 | centre **7.50 m** |
| A-beam 3 | x 69.44 … 72.24 | 12.248 … 12.742 | centre **12.50 m** |
| A-beam 4 | x 97.74 … 100.54 | 17.240 … 17.734 | centre **17.50 m** |
| A-beam 5 | x 126.14 … 128.94 | 22.248 … 22.742 | centre **22.50 m** |
| A-beam centre spacing | 28.35 pt | 5.001 m | **5.00 m** |
| B-beam, near edge | y 0 … 2.83 | 0 … 0.499 | 0 … **0.50 m**, centre 0.25 m |
| B-beam, far edge | y 82.18 … 85.01 | 14.496 … 14.995 | 14.50 … **15.00 m**, centre 14.75 m |
| Columns (4, solid black squares) | 2.83 × 2.83 each | 0.499 × 0.499 | **0.50 × 0.50 m**, at the four plate corners; centres (0.25, 0.25), (24.75, 0.25), (0.25, 14.75), (24.75, 14.75) |

Line-type check (segment counts): plate outline = 2 segments/side ⇒ **solid**; the ten A-beam edges
(38 dashes each) and the two B-beam inner faces (64 dashes each) ⇒ **dashed**. Columns are `fill`
paths with no stroke ⇒ **solid black**.

### 3.2 Task 3 — the two elevations on the same 1:500 plate (p.2)

Long elevation (below the plan), and short elevation (right of the plan). Both agree:

| Layer (top → bottom) | Long elev. (pt) | Short elev. (pt) | Metres |
|---|---|---|---|
| Plate thickness | 4.25 | 4.30 | 0.750 / 0.758 — **see §6, error 2** |
| Subsystem A depth | 14.45 | 14.40 | **2.549 / 2.540 m** |
| Subsystem B depth | 17.00 | 17.00 | **2.999 m = 3.00 m** |
| Column height (drawn) | 12.83 | 12.80 | 2.263 / 2.258 m (arbitrary — cropped by the frame) |

Stacking order confirmed: **plate → subsystem A (5 transverse beams) → subsystem B (2 longitudinal
beams) → columns.** A spans the 15 m direction, B spans the 25 m direction.

### 3.3 Task 3 b) — form diagram subsystem A, 1:200 (p.2)

Origin **O = left end of the beam at its soffit**, SVG (169.65, 721.73) pt. +X right, +Z up.

| Element | pt | Metres |
|---|---|---|
| Beam length | 212.53 | **14.995 m = 15.00 m** |
| Beam depth (soffit → top) | 36.03 | **2.542 m** |
| Plate above (dashed) | 7.11 | **0.502 m = 0.50 m** |
| Left support column (dashed, 2 lines) | x 3.55 … 10.65 | 0.2505 … 0.7514, centre **0.5009 m**, width 0.5009 m |
| Right support column | x 201.95 … 208.95 | 14.249 … 14.743, centre **14.496 m** |
| Left support triangle apex (pinned, hatched) | x 7.08 | **0.4996 m** |
| Right support triangle apex (roller) | x 205.44 | **14.495 m** |
| **Span between apexes** | 198.36 | **13.996 m = 14.00 m** ← conflicts with the plan, see §6 |
| Load strip g<sub>d</sub> | 19 arrows, pitch 11.81 pt | pitch 0.833 m, spanning the whole 15.00 m |

### 3.4 Task 3 c) — form diagram subsystem B, 1:200 (p.2)

Origin **O = left end of the beam at its soffit**, SVG (169.77, 1069.57) pt.

| Element | pt | Metres |
|---|---|---|
| Beam length | 354.21 | **24.992 m = 25.00 m** |
| Beam depth | 42.51 | **2.999 m = 3.00 m** |
| Subsystem-A beams above (5, in section) | width 7.10 each | **0.501 m**; depth above B = 36.10 pt = 2.547 m |
| A-beam centres | 35.38 / 106.28 / 177.08 / 247.98 / 318.78 | **2.496 / 7.499 / 12.494 / 17.496 / 22.492 m** → nominal 2.5 / 7.5 / 12.5 / 17.5 / 22.5 m |
| Plate above (dashed) | 7.08 | **0.4995 m = 0.50 m**, full 25 m |
| Left support apex (pinned) | x 3.54 | **0.2498 m** |
| Right support apex (roller) | x 350.67 | **24.741 m** |
| **Span between apexes** | 347.13 | **24.491 m = 24.50 m** |
| Support columns (dashed) | 0.03 … 7.13 and 347.13 … 354.23 | 0.002 … 0.503 and 24.488 … 24.989 → 0.50 m wide, outer faces flush with the beam ends, centres 0.25 / 24.75 m |

The plan (§3.1) and form diagram B agree: columns/B-beams are centred **0.25 m** in from the plate
edge in both directions. Form diagram A is the only drawing that disagrees.

### 3.5 Task 1 a) — five plates with walls/columns (p.1, qualitative, no scale)

All five plates are **85.01 × 85.01 pt squares**; walls and columns are **6.37 pt thick**
(= 0.07493 of the plate side, call it t = 0.075 a). Normalised to a 1 × 1 plate, origin at the
top-left corner, +X right, +Y down:

1. Two walls: x ∈ [0, 0.075] and [0.925, 1], both y ∈ [0, 1] — two opposite edges.
2. One wall x ∈ [0, 0.075], y ∈ [0, 1]; **two columns** 0.075 × 0.075 at the top-right and
   bottom-right corners.
3. **L of walls**: left x ∈ [0, 0.075] full height, plus top y ∈ [0, 0.075] for x ∈ [0.075, 1];
   **one column** at the bottom-right corner.
4. **U of walls**: left (full height), top (x ∈ [0.075, 1]), right (x ∈ [0.925, 1], y ∈ [0.075, 1]).
   Open at the bottom.
5. **Closed ring**: all four walls.

### 3.6 Task 1 b) — five plates with columns (p.1, qualitative, no scale)

Columns are 6.37 pt squares. Let **u = 42.505 pt** be the recurring module (so the drawn plates are
2u × 2u, 2u × 2u, 4u × 2u, 2u × 3u, 2u × 3u). Column centres, measured from the plate's top-left
corner, in units of u:

1. Plate 2u × 2u. Columns at (0,0), (2,0), (0,2), (2,2) — **4, at the corners**.
2. Plate 2u × 2u. Columns at (1,0), (0,1), (2,1), (1,2) — **4, at the edge midpoints**.
3. Plate 4u × 2u. Columns at (0,0), (2,0), (4,0), (0,2), (2,2), (4,2) — **6, two equal bays**.
4. Plate 2u × 3u. Columns at (0.5, 0.5), (1.5, 0.5), (0.5, 1.5), (1.5, 1.5), (0.5, 2.5), (1.5, 2.5)
   — **6, inset half a bay from every edge** (cantilevers all round). Plate outline is dashed here.
5. Plate 2u × 3u. Columns at x = 0, 1, 2 and y = 0, 1, 3 — **9, on the edges, with unequal
   y-bays 1u and 2u**.

### 3.7 Task 2 — two axonometric structures (p.1, qualitative, no dimensions)

Both are two-storey wall/plate assemblies drawn in isometric with the *same* topology family as
Task 3; **no dimension, scale or load magnitude is printed anywhere on Task 2.** Topology:

- **Left structure**: two parallel upright wall-plates at the upper level, each carrying a line load
  `g` on its top edge, running in one isometric direction; they land on two upright wall-plates at
  the lower level running in the *perpendicular* direction; those in turn stand on short columns
  (two visible stubs). Pure A-onto-B-onto-columns chain.
- **Right structure**: same idea but the upper walls do **not** land at their ends — one upper wall
  overhangs its lower support, and the lower walls are shorter and offset, with four column stubs.
  This is the "cantilever" variant, i.e. the point of the exercise is that the reaction of subsystem
  A is not simply half the load.

Load strips: the left structure has 2 × 17 arrows, the right 2 × 17 — decorative, not a count.

### 3.8 Creative Task — floor plan, 1:100 (p.3)

Origin **O = the top-left grid intersection**, SVG (143.90, 644.70) pt. +X right, +Y down.

- Grid: vertical grid lines at x = 0, 3.00, 6.00, 9.00 m (measured 0 / 3.002 / 6.002 / 9.003 m);
  horizontal grid lines at y = 0, 3.00, 6.00, 9.00, 12.00 m (measured 0 / 3.000 / 6.003 / 9.002 /
  12.003 m). **Building footprint 9.00 m × 12.00 m, 3 × 4 bays of 3.00 m.**
- **Point loads F: exactly 10**, at grid nodes
  (3, 0), (3, 3), (3, 6), (3, 9), (3, 12), (6, 0), (6, 3), (6, 6), (6, 9), (6, 12).
  Verified two ways: 10 asterisk markers in the plan, and 10 arrowheads in the axonometric
  (the axo loads form a 5 × 2 isometric lattice, u = (+49.11, −28.35) pt, v = (+49.11, +28.35) pt).
  **No load sits over an existing wall or column.**
- **Existing columns (3)**, 0.20 × 0.20 m (5.67 pt): at (0, 0), (9, 0), (9, 12).
- **Existing walls**, 0.20 m thick:
  - L-wall in the bottom-left: along x = 0 from y = 9.00 to 12.00 m (3.00 m long) **and** along
    y = 12.00 from x = 0 to 3.00 m (3.00 m long).
  - Wall along x = 9.00 from y = 3.00 to 9.00 m (**6.00 m** long).
- Dimension strings: three "3 m" along the bottom (9 m total), four "3 m" up the right (12 m total).
- Axonometric: the new roof plane is a dashed 3 m isometric grid over the same footprint; the
  "2 m" / "3 m" dimension stack on the right gives new-beam-grid depth 2 m above existing 3 m
  wall/column height.

---

## 4. THE ANSWERS (derived, with working)

### 4.0 Design load

γ<sub>G</sub> = 1.35 (dead), from the compendium formulary.

    s̄_d = γ_G · s̄_k = 1.35 · 1.000 kN/m² = **1.350 kN/m²**

Total design load on the plate:

    A_plate = 25.00 m · 15.00 m = 375.0 m²
    S_tot   = 1.350 kN/m² · 375.0 m² = **506.25 kN**    ← the global check for everything below

### 4.1 Task 3 a) — tributary area and line load of one subsystem-A beam

The 5 beams sit at x = 2.50, 7.50, 12.50, 17.50, 22.50 m, i.e. **5.00 m apart, and 2.50 m
(= half a bay) from each plate end.** Halving every distance:

    beam 1: 0.00 … 5.00 m   → b = 5.000 m
    beam 2: 5.00 … 10.00 m  → b = 5.000 m
    beam 3: 10.00 … 15.00 m → b = 5.000 m
    beam 4: 15.00 … 20.00 m → b = 5.000 m
    beam 5: 20.00 … 25.00 m → b = 5.000 m
    Σb = 25.000 m  ✓ (covers the whole plate, no gap, no overlap)

Every beam therefore has the **same** tributary area (see §6, ambiguity 6):

    A_trib = b · l = 5.000 m · 15.00 m = **75.00 m²**
    R_beam = s̄_d · A_trib = 1.350 · 75.00 = **101.25 kN**
    g_d    = s̄_d · b = 1.350 kN/m² · 5.000 m = **6.750 kN/m**

Check: g_d · l = 6.750 · 15.00 = 101.25 kN ✓; 5 beams · 101.25 = 506.25 kN = S_tot ✓

Force-diagram length at 1 cm ≙ 50 kN: 101.25 kN → **2.025 cm**.

### 4.2 Task 3 b) — subsystem A: reactions and one admissible force flow

Beam A: total length 15.00 m, loaded over its whole length by g_d = 6.750 kN/m, supported at the
two B-beams. Symmetric, therefore **independent of where exactly the supports sit**:

    A_left = A_right = 101.25 / 2 = **50.625 kN**   (each, vertical)

Check: 50.625 + 50.625 = 101.25 kN ✓. At 1 cm ≙ 50 kN → **1.0125 cm** each.

Bending demand (needed to size the force flow). Two support positions are drawn on the sheet, so
both are given:

| Support layout | span L | cantilever a | M_max at midspan |
|---|---|---|---|
| As drawn in form diagram A (§3.3) | 14.00 m | 0.50 m | R·L/2 − g_d(L/2+a)²/2 = 50.625·7.00 − 6.750·7.50²/2 = 354.375 − 189.844 = **164.531 kNm** |
| As drawn in the 1:500 plan + form B (§3.1, §3.4) — **recommended** | 14.50 m | 0.25 m | 50.625·7.25 − 6.750·7.50²/2 = 367.031 − 189.844 = **177.188 kNm** |
| (reference: pure 15.00 m simple span) | 15.00 m | 0 | g_d·L²/8 = **189.844 kNm** |

A clean, exactly-equivalent force flow (this is the construction the sheet is fishing for):
replace g_d by **two resultants of 50.625 kN at the quarter points of the loaded length**
(x = 3.750 m and x = 11.250 m from the beam end). The funicular is then a trapezoid: two inclined
compression struts from the supports up to the two load points, a horizontal compression top chord
between them, and a horizontal tension tie along the soffit. Because the two resultants are placed
at the quarter points, the constant moment between them equals the true M_max exactly.

With the drawn beam depth **z = 2.542 m** (lever arm from soffit tie to top chord):

| | span 14.00 m (as drawn) | span 14.50 m (recommended) |
|---|---|---|
| Horizontal thrust H = M_max / z | 164.531 / 2.542 = **64.72 kN** | 177.188 / 2.542 = **69.70 kN** |
| Top chord (compression) | 64.72 kN | 69.70 kN |
| Bottom tie (tension) | 64.72 kN | 69.70 kN |
| Support struts (compression) √(50.625² + H²) | √(2562.89 + 4188.68) = **82.17 kN** | √(2562.89 + 4858.65) = **86.15 kN** |
| Strut inclination arctan(50.625/H) | 38.03° from horizontal | 35.99° |

Check at the left node: vertical Σ = 82.17·sin38.03° = 50.625 kN = reaction ✓;
horizontal Σ = 82.17·cos38.03° = 64.72 kN = tie ✓.
Force diagram at 1 cm ≙ 50 kN: load line 2.025 cm (2 × 1.0125), pole distance 1.294 cm,
support ray 1.643 cm.

Any deeper/shallower flow is also "possible" — the family is H = M_max/z, N_supp = √(50.625² + H²),
with z ≤ 2.542 m. Using the full depth (z = 2.542 m) minimises the forces.

### 4.3 Task 3 c) — subsystem B: applied forces, form finding under the 310 kN constraint

**Applied forces.** Each B beam receives one A-beam reaction at each of the five A-beam positions:

    P = 50.625 kN at x = 2.50, 7.50, 12.50, 17.50, 22.50 m (from the beam end)
    Σ per B beam = 5 · 50.625 = **253.125 kN**

Check: 2 B beams · 253.125 = 506.25 kN = S_tot ✓
Load line at 1 cm ≙ 50 kN: 5 segments of 1.0125 cm = **5.0625 cm** total.

**Reactions.** Supports at x = 0.250 m and 24.750 m (span 24.500 m); the load group is symmetric
about midspan (x = 12.500 m):

    B_left = B_right = 253.125 / 2 = **126.5625 kN**

Checks: 4 columns · 126.5625 = 506.25 kN = S_tot ✓; and directly from tributary areas, each corner
column carries a quarter of the plate = 12.50 · 7.50 = 93.75 m², × 1.350 = **126.5625 kN** ✓
At 1 cm ≙ 50 kN → **2.5313 cm**.

**The 310 kN constraint → the pole distance.** In a simple arch-and-tie the element at the support
carries the reaction as its vertical component and the (constant) horizontal thrust H as its
horizontal component:

    N_supp = √(B² + H²) = 310.000 kN,   B = 126.5625 kN
    H² = 310.000² − 126.5625² = 96 100.000 − 16 017.993 = 80 082.007
    **H = 282.988 kN**   (pole distance = 5.6598 cm at 1 cm ≙ 50 kN)

**The form.** Ordinates of the thrust line, y(x) = M(x)/H, measured **up from the tie** (= the line
through the two supports at the beam soffit). Distances a<sub>i</sub> from the left support are
2.25, 7.25, 12.25, 17.25, 22.25 m.

| node | x from beam end | M(x) [kNm] | y = M/H [m] |
|---|---|---|---|
| left support | 0.250 | 0 | 0 |
| load 1 | 2.500 | 126.5625·2.25 = 284.766 | **1.0063** |
| load 2 | 7.500 | 126.5625·7.25 − 50.625·5.00 = 664.453 | **2.3480** |
| load 3 (crown) | 12.500 | 126.5625·12.25 − 50.625·(10.00+5.00) = 791.016 | **2.7952** |
| load 4 | 17.500 | 664.453 | 2.3480 |
| load 5 | 22.500 | 284.766 | 1.0063 |
| right support | 24.750 | 0 | 0 |

**Required rise f = 2.7952 m; available beam depth = 3.000 m ⇒ it fits, with 0.205 m to spare.**
At 1:200 that is a rise of 1.3976 cm inside a 1.500 cm deep beam.

**Member forces.** Vertical component of chord segment i = the shear in that panel; horizontal
component = H = 282.988 kN throughout.

| segment | shear V [kN] | N = √(H² + V²) [kN] | type |
|---|---|---|---|
| support → load 1 | 126.5625 | **310.000** | compression (max ✓, matches the hint) |
| load 1 → load 2 | 126.5625 − 50.625 = 75.9375 | **292.999** | compression |
| load 2 → crown | 126.5625 − 101.25 = 25.3125 | **284.117** | compression |
| crown → load 4 | −25.3125 | 284.117 | compression |
| load 4 → load 5 | −75.9375 | 292.999 | compression |
| load 5 → support | −126.5625 | 310.000 | compression |
| tie (soffit, straight) | — | **282.988** | tension, constant |
| vertical struts at loads 1,2,4,5 and crown | — | 50.625 each | compression (they carry each load from the top face of the B beam down to the thrust line: lengths 3.000 − y = 1.994, 0.652, 0.205, 0.652, 1.994 m) |

Checks: horizontal equilibrium at every node — H constant = 282.988 kN ✓.
Vertical equilibrium at the left support node: 310.000 · (126.5625/310.000) = 126.5625 kN = B ✓.
Sum of the two support vertical components = 253.125 kN = Σ applied ✓.
Force-diagram lengths at 1 cm ≙ 50 kN: 6.200 / 5.860 / 5.682 cm for the three distinct chord rays,
5.6598 cm for the tie/pole distance.

**If "310 kN" is read as an upper bound** (which is what the German says — *"nicht überschreiten
darf"*), the admissible family is

    2.7952 m ≤ f ≤ 3.000 m   ⇔   263.672 kN ≥ H ≥ 282.988 kN   ⇔   292.474 kN ≤ N_max ≤ 310.000 kN

with the deepest possible arch (f = 3.000 m, using the whole beam depth) giving
H = 791.016 / 3.000 = **263.672 kN** and N_max = √(263.672² + 126.5625²) = **292.474 kN**.

### 4.4 The complete load path, storey by storey (total in = total out)

| Level | Element | Load arriving | Count | Σ [kN] |
|---|---|---|---|---|
| 0 — surface | plate, 25.00 × 15.00 m | s̄_d = 1.350 kN/m² | 1 | **506.25** |
| 1 — subsystem A | transverse beam, 15.00 m, tributary 5.00 m | g_d = 6.750 kN/m ⇒ 101.25 kN | 5 | 5 × 101.25 = **506.25** ✓ |
| 2 — A/B interface | reaction of one A beam | 50.625 kN | 10 | 10 × 50.625 = **506.25** ✓ |
| 3 — subsystem B | longitudinal beam, 25.00 m, 5 point loads | 253.125 kN | 2 | 2 × 253.125 = **506.25** ✓ |
| 4 — columns / foundation | corner column | 126.5625 kN | 4 | 4 × 126.5625 = **506.25** ✓ |

Independent cross-check on level 4 by tributary area alone: each corner column owns a quarter of the
plate, 12.50 m × 7.50 m = 93.75 m²; 93.75 × 1.350 = 126.5625 kN ✓.

### 4.5 Task 1 answers

**Task 1 a)** — divide the plate into tributary areas (plate side a, normalised a = 1):

1. Two opposite walls → one-way span. Split on the **centre line**: each wall gets 0.5 a × a = **0.500 a²**.
2. One wall + two corner columns opposite. Split on the centre line first (wall gets **0.500 a²**);
   the far half is then halved again between the two columns: **0.250 a²** each.
   (Σ = 0.500 + 0.250 + 0.250 = 1.000 ✓)
3. L of walls (left + top) + one column at the opposite (bottom-right) corner. **Two constructions
   are defensible and both are marked correct in this course; state which one the view uses.**
   - (i) Compendium halving rule applied orthogonally — boundary x = 0.5 a between the left wall
     and the column, y = 0.5 a between the top wall and the column, plus the 45° diagonal from the
     top-left corner between the two walls: left wall **0.375 a²**, top wall **0.375 a²**,
     column **0.250 a²** (Σ = 1.000 ✓).
   - (ii) Halving only along the two free edges (giving the mid-edge points 0.5 a) and joining them
     with a straight line: column **0.125 a²**, left wall **0.4375 a²**, top wall **0.4375 a²**
     (Σ = 1.000 ✓).
   Construction (i) is the one consistent with `3.4-tributary-area-en.pdf`; use it as the default.
4. U of walls (left, top, right), open at the bottom. 45° bisectors from the two top corners meet
   at (0.5 a, 0.5 a); below that point the boundary is the vertical centre line. Top wall gets the
   triangle **0.250 a²**, left and right walls get **0.375 a²** each (Σ = 1.000 ✓).
5. Ring of four walls. The classic 45° bisectors from all four corners → four triangles, each
   **0.250 a²** (Σ = 1.000 ✓).

**Task 1 b)** — tributary areas on the columns; the one to colour is the **largest**.
Module u as in §3.6; areas in u²:

1. 4 corner columns on a 2u × 2u plate: every one is u × u = **1.000 u²**. All equal — any of the
   four may be coloured; the sheet's premise of a single governing column fails here.
2. 4 columns at the edge midpoints of a 2u × 2u plate: tributary boundaries are the two diagonals →
   four triangles of **1.000 u²** each. Again all equal.
3. 4u × 2u plate, 6 columns in two 2u bays: x-strips u, 2u, u; y-strips u, u.
   Corner columns **1.000 u²** (×4); **mid-edge columns 2.000 u² (×2) ← colour these.**
   Σ = 4(1.000) + 2(2.000) = 8.000 = 4u·2u ✓
4. 2u × 3u plate, 6 columns inset half a bay all round (bay = u): every column owns a full u × u
   bay = **1.000 u²**; Σ = 6.000 = 2u·3u ✓. All six equal — this is the point of the example
   (cantilevering half a bay equalises the columns).
5. 2u × 3u plate, 9 edge columns, x at 0/u/2u and y at 0/u/3u.
   x-strips: 0.5u, 1.0u, 0.5u. y-strips: 0.5u, 1.5u, 1.0u.

   | | x=0 | x=u | x=2u |
   |---|---|---|---|
   | y=0 | 0.250 | 0.500 | 0.250 |
   | y=u | 0.750 | **1.500 ← colour** | 0.750 |
   | y=3u | 0.500 | 1.000 | 0.500 |

   Σ = 6.000 = 2u·3u ✓. The governing column is the **centre column of the middle row**, at
   1.500 u² = **25.0 % of the whole plate**.

### 4.6 Creative Task — what can and cannot be answered

F is not given a magnitude, so all forces come out **in multiples of F**. What *is* determined:

- Total roof load = **10 F**, all of it on the two lines x = 3 m and x = 6 m.
- Existing supports available: 3 columns at (0,0), (9,0), (9,12) and 2 walls (the L at bottom-left,
  and the 6 m wall at x = 9, y = 3…9).
- The 9 m transport limit exactly equals the 9 m plan width but is **less than** the 12 m plan
  depth, so no beam can run the full 12 m: the primary beams must run transversely (x direction),
  and any longitudinal member must be ≤ 9 m.
- One clean solution that satisfies every constraint — **five transverse beams of 9.00 m** at
  y = 0, 3, 6, 9, 12 m, plus **one 9.00 m longitudinal spine** at x = 0 running y = 0 … 9:
  - each transverse beam carries 2F (loads at its third points, x = 3 and 6 m) → reactions **F**
    at each end;
  - right-hand ends: y = 0 → column (9,0); y = 3, 6, 9 → the 6 m wall; y = 12 → column (9,12);
  - left-hand ends: y = 0 → column (0,0); y = 12 → the L-wall leg along y = 12; y = 3 and 6 → the
    spine; y = 9 → directly onto the L-wall leg at x = 0;
  - the spine therefore carries 2F over 9.00 m (loads at y = 3 and 6) → reactions **F** each, into
    the column (0,0) and the L-wall.
  - Support totals: column (0,0) 2F, L-wall x = 0 leg 2F, L-wall y = 12 leg F, column (9,0) F,
    6 m wall 3F, column (9,12) F. **Σ = 10F in = 10F out ✓**
- Force flow in a 9 m transverse beam, depth z = 2.000 m, two loads F at the third points:
  M_max = R · 3.000 = **3.000 F·m** (constant between the loads), so
  H = M_max / z = **1.500 F** (top chord compression = bottom tie tension),
  support strut N = √(F² + 1.500²F²) = **1.803 F**, inclined at arctan(1/1.5) = 33.69° from
  horizontal. The spine is the same beam with the same 9 m/2F/third-point loading, so it has an
  identical force flow — **there is only one beam type** in this solution, which is the neat answer
  to Creative Task b).
- **Not determined by the sheet:** the magnitude of F, the force-diagram scale for page 3, the
  beam width, and the beam-grid layout itself (that is the design freedom of the task).

---

## 5. PROPOSED STEP SEQUENCE FOR THE INTERACTIVE VIEW

The quantitative sheet is Task 3; build the view on that. 9 steps.

| # | Title | What appears |
|---|---|---|
| 1 | **The structure** | Axonometric/exploded stack: plate 25.00 × 15.00 m, five subsystem-A beams (0.50 m wide, 2.54 m deep, at 2.5 / 7.5 / 12.5 / 17.5 / 22.5 m), two subsystem-B beams (3.00 m deep, along the long edges), four 0.50 m columns at the corners. Teal ghost preview of the finished force flow. |
| 2 | **The load** | s̄_k = 1.00 kN/m² arrow field on the plate; caption shows γ_G = 1.35 → **s̄_d = 1.350 kN/m²**; plate area 375.0 m²; total **506.25 kN**. |
| 3 | **Tributary strips (Task 3 a)** | The plan turns on; five 5.00 m strips wipe in one by one, boundaries at 0/5/10/15/20/25 m. Highlight one strip: **75.00 m²**. Running total 5 × 75 = 375 m² ✓. |
| 4 | **Area load → line load** | The highlighted strip collapses onto the beam axis: **g_d = s̄_d · b = 1.350 · 5.000 = 6.750 kN/m**; resultant 101.25 kN. |
| 5 | **Subsystem A: reactions (Task 3 b, part 1)** | Form diagram A at 1:200: 15.00 m beam, supports, UDL. Two resultants of 50.625 kN slide to the quarter points (3.75 / 11.25 m). Reactions **50.625 kN** each, green. |
| 6 | **Subsystem A: force flow + force diagram** | Trapezoidal thrust line drawn inside the 2.542 m depth; blue struts **82.17 kN**, blue top chord **64.72 kN**, red tie **64.72 kN**. Force diagram built alongside at 1 cm ≙ 50 kN. |
| 7 | **Hand-over to subsystem B (Task 3 c, part 1)** | The A reactions flip direction and land on the B beam as five point loads of **50.625 kN** at 2.5 / 7.5 / 12.5 / 17.5 / 22.5 m. Σ = 253.125 kN; reactions **126.5625 kN** each. |
| 8 | **Form finding under the 310 kN limit** | Force diagram first: load line 5.0625 cm, then the pole is placed so the support ray = 310 kN → **H = 282.988 kN**. Funicular is transferred into the form diagram; crown rise **2.7952 m** inside a 3.000 m beam. Chord forces 310.0 / 293.0 / 284.1 kN, tie 282.99 kN. |
| 9 | **Down to the foundation — the answer** | Full-height load-path diagram with the balance table of §4.4: 506.25 → 5 × 101.25 → 10 × 50.625 → 2 × 253.125 → 4 × **126.5625 kN**, each row ticked against 506.25 kN. |

**Live controls (sliders / toggles)**
- Slider **s̄_k**, 0.5 … 5.0 kN/m² — every number in the chain scales linearly (default 1.0).
- Toggle **γ_G**: 1.00 (characteristic) / 1.35 (design) — shows why the sheet asks for a).
- Slider **number of A beams** n = 3 … 8 — tributary width becomes 25.00/n, and the B-beam load
  becomes n point loads; demonstrates that the column load never changes.
- Slider **N_max** for step 8, 293 … 400 kN — the funicular rise f = 791.016/√(N_max² − 126.5625²)
  animates; below **292.474 kN** the arch no longer fits inside the 3.00 m depth (turn the beam
  outline red). Default 310 kN.
- Toggle **A-beam span 14.00 m / 14.50 m** — makes the sheet's own inconsistency (§6, error 1)
  visible and shows that the reactions are unaffected.
- Toggle **show/hide the force diagram**, and **show numeric labels**.

---

## 6. ERRORS AND AMBIGUITIES IN THE SHEET

1. **The support position of subsystem A contradicts itself by 0.25 m.** The 1:500 plan and the
   1:200 form diagram of subsystem B both place the B beams / columns 0.25 m in from the plate edge
   (A span = 14.50 m, 0.25 m cantilever each end). The 1:200 form diagram of subsystem A places its
   supports 0.50 m in from the ends (span = 14.00 m, 0.50 m cantilever). Measured, not inferred:
   support apexes at 0.4996 m and 14.495 m in form diagram A versus band centres at 0.25 m and
   14.75 m in the plan. Use **14.50 m**; the reactions (50.625 kN) are unaffected either way, only
   M_max changes (177.188 vs 164.531 kNm) and with it the thrust H (69.70 vs 64.72 kN).
2. **The plate thickness is drawn at two different values.** 0.50 m in both 1:200 form diagrams
   (7.08–7.11 pt), but 0.75 m in the 1:500 elevations (4.25–4.30 pt). The 1:500 elevations are
   drawn ~1.5× too thick.
3. **Subsystem-A depth is not a round number.** Measured 2.542 m (1:200) and 2.540–2.549 m (1:500).
   Almost certainly 2.5 m intended; subsystem B is a clean 2.999 m = 3.00 m. Use 2.54 m if you want
   to match the drawing, 2.50 m if you want a round answer — it changes H by 1.7 %.
4. **No dimension line appears anywhere on pages 1 and 2.** Every Task 3 length has to be scaled
   off the drawing. The scale statements ("plans 1:500", "1:200") are the only metric anchor, and
   the column height in the 1:500 elevation (2.26 m) is meaningless — the frame crops it.
5. **s̄_k = 1 kN/m² is not a physical dead load for the plate drawn.** A 0.50 m reinforced-concrete
   plate weighs ≈ 12.5 kN/m² on its own. The sheet's "dead area load" is a pedagogical number and
   self-weight must **not** be added; nothing on the sheet says so explicitly.
6. **"The relevant tributary area for one of the five beams" presumes a governing beam that does
   not exist.** With the beams at 2.5 / 7.5 / 12.5 / 17.5 / 22.5 m on a 25 m plate, all five have
   an identical 5.000 m × 15.00 m tributary area. (The compendium example the phrasing is copied
   from, 3.4, *does* have a governing middle beam. Here it does not.) Same problem in Task 1 b)
   diagrams 1, 2 and 4, where the sheet asks to "colour the area which is relevant for
   dimensioning" but every column is equally loaded.
7. **EN and DE state the 310 kN differently.** English: "considering that the maximum compression
   force **is** 310 kN" (equality). German: "…dass die maximale Druckkraft 310 kN **nicht
   überschreiten darf**" (upper bound). Only the equality reading makes the form unique. As a bound
   the answer is a family, 292.474 kN ≤ N_max ≤ 310.000 kN.
8. **EN and DE differ on the beam-length limit.** English: "the maximum length of the beams is 9
   meters". German: the length is limited "**aufgrund des Transports** auf 9 Meter (**plus
   Materialstärke**)" — a transport constraint, and the 9 m is a clear length between faces. The
   English drops both qualifications.
9. **EN and DE differ in Task 2.** English says "the two following structures" and "reaction forces
   with green"; German says "des Tragwerks" (singular) and "äussere Kräfte grün" (external forces).
10. **Hidden text in the PDF.** `pdftotext` returns content that is never rendered:
    - page 3 returns **20** "F" labels; only **10** are drawn. The 10 phantoms are the real set
      translated by (−2.32, −80.35) pt — an earlier layout left in the text layer. `pdftocairo`
      emits no glyph paths for them, and a 600 dpi render confirms blank paper there.
    - page 2 returns **two** "s̄d" labels (at 327.76, 309.95 and 341.45, 325.40 pt) and **two**
      "gd" labels (at 386.19, 645.28 and 372.50, 629.83 pt); only one of each renders.
    Anyone rebuilding the sheet from `pdftotext` alone will draw twice the loads on page 3.
11. **Typo**: "hight" for "height", Creative Task a).
12. **Creative Task is under-specified as a statics problem** (deliberately — it is the open design
    task): F has no magnitude, page 3 carries no force scale, and the beam width is not given. Only
    ratios can be computed. Note also that none of the 10 loads sits over an existing support, and
    the 9 m limit is exactly the 9 m plan width but only ¾ of the 12 m plan depth, so a
    single-direction grid cannot work in the long direction.
13. **Task 1 and Task 2 carry no scale and no load magnitude at all** — they are purely qualitative.
    Any interactive view of them must be topological, not metric.
