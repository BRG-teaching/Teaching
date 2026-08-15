# DECODE BRIEF — EX 10 "Bracing & Horizontal Forces" (Structural Design II, FS 23)

Sources decoded
- `drawings/web/pdf/EX10-bracing-horizontal-forces-task-en.pdf` (4 pp, A3, 841.89 × 1190.55 pt, InDesign 18.2, 2023-05-04)
- `drawings/web/pdf/EX10-bracing-horizontal-forces-aufgabe-de.pdf` (same artwork, German)
- `drawings/web/pdf/compendium/10.1-horizontal-forces-en.pdf` — defines the method
- `drawings/web/pdf/compendium/10.2-buckling-en.pdf` — defines the buckling chart
- `drawings/web/pdf/compendium/2.5-dimensioning-en.pdf`, `2.6-formulary-en.pdf` — material data

No published solution exists (login-gated). Every number below is derived here and checked.

Decode method: `pdftocairo -svg` per page, every `<path d="M x y L x y">` parsed with its
`transform="matrix(...)"` applied and closepath (`Z`) segments reconstructed; every claim
confirmed against a 300 dpi `pdftoppm` render. Chart curves were digitised from the
300 dpi raster (the chart is an embedded JPEG, not vector).

---

## 1. TASK TEXT, VERBATIM (English sheet)

Page header, all four pages:
> EX 10 — Structural Design II – FS 23 — Bracing & Horizontal Forces — Name: — Koje: — p. N / 4

**Task 1 — Bracing** (p. 1)
> The subtasks a) to f) show different layouts of walls acting as bracing schemes of a plate. Tick the box if the bracing is working.
>
> a)   b)   c)   d)   e)   f)

**Task 2 — Horizontal Forces (qualitatively)** (p. 1)
> Analyse the force flow within the ceiling due to an applied horizontal force. The walls are used for bracing.
> a) Find a qualitative internal force flow in the plate such that it can be redirected into the ground through the walls.
> b) Then find a possible internal force flow in the walls A, B and C. First draw the applied horizontal force for each wall into the corresponding form diagram. Then, find the support forces. Indicate tension forces with red, compression forces with blue and reaction forces with green.
>
> (labels: `wall A`, `wall B`, `wall C`, `F`; `top view 1:200`; `form diagram wall A 1:100`, `form diagram wall B 1:100`, `form diagram wall C 1:100`)

**Task 3 — Horizontal Forces (quantitatively)** (p. 2)
> Analyse the force flow within the ceiling due to an applied horizontal force. The walls are used for bracing.
> a) First, find an internal force flow in the plate such as it can be redirected into the ground through the walls. Draw the corresponding force diagram if F = 100 kN.
> b) Then find a possible internal force flow in the walls A, B and C. First draw the applied horizontal force for each wall into the corresponding form diagram. Secondly, draw the force diagram for each wall. Indicate tension forces with red, compression forces with blue and reaction forces with green.
>
> (labels: `wall A`, `wall B`, `wall C`, `F`; `top view 1:200`; three `form diagram wall X 1:100`; `force diagrams 1cm ≙ 10kN`)

**Task 4 — Stability against buckling** (p. 3)
> Given is a 2.4 m long column made of steel S355. It is designed as a round solid profile with a cross-sectional area of 400 mm2. It is subjected to a force Nd=54 kN, and has a hinged support at the top and bottom.
> a) Check the buckling behaviour of the column. Use the relevant buckling curve to check its stability and draw the corresponding values in the diagram.
> b) In general, how can buckling be prevented?
>
> (chart axes: `Nd / (A · fcd)` vertical, `lcr / √A` horizontal; caption `buckling behaviour for different steel profiles`; support-condition strip: `lcr = l`, `lcr = 0.7 l`, `lcr = 0.5 l`, `lcr = l`, `lcr = 2 l`)

**Task 5 — Redesigning of first floor** (p. 4)
> A ceiling plate is considered on which a horizontal force F1 = 100 kN is applied.
> a) Place three 2.8m high structural walls in such a way that the system is braced. Sketch a possible internal force flow in the plate such that the forces can be transmitted through the walls into the floor. Draw the corresponding force diagram. Indicate tension forces with red, compression forces with blue and external forces with green.
> b) Design the side views of the three walls and draw them in scale in the form diagram. Complete the views with the respective qualitative force flow.
> c) Another force F2 = 100 kN now acts on the slab. Transfer your bracing scheme from a) and then complete the floor plan qualitatively with a possible internal force flow.
>
> (labels: `ceiling plate`, `new structural walls (2.8m)`, `F1`, `F2`; `top view 1:200`; three `form diagram wall X 1:100`; `force diagrams 1cm ≙ 10kN`)

**Count of distinct lettered sub-parts: 15** — Task 1: 6 (a–f, one tick box each);
Task 2: 2 (a, b); Task 3: 2 (a, b); Task 4: 2 (a, b); Task 5: 3 (a, b, c).
Sub-parts 2b, 3b and 5b each cover three walls, so 15 letters = 21 drawing deliverables.

---

## 2. GIVENS — every printed number and where it appears

| Quantity | Value | Where printed / measured |
|---|---|---|
| Sheet | EX 10, Structural Design II, FS 23, 4 pages, A3 | page header |
| Task 2 load | `F`, magnitude **not given** (qualitative) | arrow on p.1 plan + axonometric |
| Task 3 load | **F = 100 kN** | Task 3 a) text |
| Task 5 loads | **F1 = 100 kN**, **F2 = 100 kN** | Task 5 stem and c) |
| Task 5 wall height | **2.8 m** | Task 5 a) text and the p.4 axonometric legend "new structural walls (2.8m)" |
| Plan scale | **1:200** | caption "top view 1:200" (pp. 1, 2, 4) |
| Elevation scale | **1:100** | caption "form diagram wall X 1:100" |
| Force scale | **1 cm ≙ 10 kN** | bottom-right of pp. 2 and 4 |
| Column length | **l = 2.4 m** | Task 4 stem |
| Column material | **steel S355** | Task 4 stem |
| Column section | **round solid, A = 400 mm²** | Task 4 stem |
| Column load | **N_d = 54 kN** | Task 4 stem |
| Column supports | **hinged top and bottom** → case a) | Task 4 stem + chart strip |
| Buckling lengths offered | l_cr = l / 0.7l / 0.5l / l / 2l | strip beside the chart, p. 3 |
| Chart axes | `N_d/(A·f_cd)` 0…1.0+, `l_cr/√A` 0…~190 | p. 3 chart; ticks at 0, 50, 100, 150 (minor ticks every 10) |

**Not printed anywhere on the sheet, needed for Task 4** (must come from compendium 2.6 formulary):
- S355: f_tk = f_ck = **355 N/mm²**, γ_M = **1.05** → **f_cd = 338.10 N/mm²** (compendium 2.5 uses exactly 338.1 N/mm² for S355).
- **E is not given in the course formulary at all.** Any closed-form Euler check (mine below) has to import E = 210 000 N/mm² from outside the course material.

**Plan dimensions are not annotated on the sheet** — there is not one dimension string on any of
the three plans. Everything in §3 comes from measuring the drawing against the printed scale.

---

## 3. GEOMETRY, DIGITISED

Convention for all plan coordinates below: **origin = bottom-left corner of the printed slab
rectangle, x to the right, y up the page, metres.** (SVG y runs down the page; it has been
flipped.) Conversion used: 1 pt = 0.3527778 mm ⇒ 1 pt = 0.070556 m at 1:200,
0.035278 m at 1:100, 0.14111 m at 1:400.

### 3.1 Task 2 plan (p. 1, "top view 1:200")

Raw page coordinates (pt, SVG y down): slab 187.66 → 414.34 in x, 665.20 → 835.19 in y.
226.68 pt × 169.99 pt ⇒ **15.994 m × 11.994 m ⇒ slab 16.00 m × 12.00 m.**

| Element | Centreline (m) | Notes |
|---|---|---|
| Slab outline | (0,0)–(16.00,0)–(16.00,12.00)–(0,12.00) | 16.00 × 12.00 m |
| **Wall A** | (0.00, 11.80) – (5.00, 11.80) | horizontal, 5.00 m long, 0.40 m thick, outer face flush with the top edge |
| **Wall B** | (8.80, 3.50) – (8.80, 8.50) | vertical, 5.00 m long, 0.40 m thick, free-standing, centred on y = 6.00 |
| **Wall C** | (0.00, 0.20) – (5.00, 0.20) | horizontal, 5.00 m long, 0.40 m thick, outer face flush with the bottom edge |
| **F** | applied at (0.00, **6.00**), direction **+x** | exactly the slab mid-height (measured 750.19 pt vs mid 750.195 pt) |

Wall B's centreline is 124.67 pt from the left edge = **8.796 m**; 102.01 pt from the right edge =
**7.198 m**. Read as 8.80 m / 7.20 m (they sum to 16.00 m).

View-direction triangles (solid, ~4 pt): below wall A at (2.50, 10.80) pointing **+y**; below wall C
at (2.50, −0.80) pointing **+y**; left of wall B at (7.90, 6.00) pointing **+x**.
With view direction **d** and up = +z, the elevation's right-hand direction is **d × z**:
- walls A and C, d = +y ⇒ elevation right = **+x_plan**;
- wall B, d = +x ⇒ elevation right = **−y_plan** (so the elevation's left end is y = 8.50).

### 3.2 Task 3 plan (p. 2, "top view 1:200")

Slab 170.06 → 396.75 pt in x, 279.66 → 449.67 pt in y ⇒ 226.69 × 170.01 pt ⇒ **16.00 m × 12.00 m.**

| Element | Centreline (m) | Notes |
|---|---|---|
| **Wall A** | (0.20, 0.00) – (0.20, 5.00) | vertical, 5.00 m, 0.40 m thick, flush with the left edge, bottom-aligned |
| **Wall B** | (11.00, 11.80) – (16.00, 11.80) | horizontal, 5.00 m, 0.40 m thick, flush with the top edge, right-aligned |
| **Wall C** | (15.80, 0.00) – (15.80, 5.00) | vertical, 5.00 m, 0.40 m thick, flush with the right edge, bottom-aligned |
| **F = 100 kN** | applied at (0.00, **6.00**), direction **+x** | mid-height (364.67 pt vs mid 364.665 pt) |

View triangles: below wall B at (13.50, 11.00) pointing **+y** (elevation right = +x_plan);
left of wall A at (−0.40, 2.50) pointing **+x**; at (14.90, 2.50) pointing **+x** for wall C
(both elevations right = −y_plan, i.e. the slab's bottom edge is at the elevation's right end).

### 3.3 Task 5 plans (p. 4)

**5a** — slab 170.09 → 396.77 pt, 285.96 → 456.00 pt ⇒ 226.67 × 170.00 pt ⇒ **16.00 m × 12.00 m**,
**no walls drawn** (student places them).
`F1 = 100 kN`, +x, applied at (0.00, **3.00**) — measured 42.50 pt above the bottom edge
= 2.999 m. **This is NOT mid-height**, unlike Tasks 2 and 3. A dash-dot axis line at y = 3.00 m
runs across the plan and out both sides.

**5c** — slab 518.68 → 745.36 pt, 922.95 → 1092.94 pt ⇒ **16.00 m × 12.00 m**, no walls.
- `F1 = 100 kN`, +x, at (0.00, **3.00**) — identical to 5a.
- `F2 = 100 kN`, **+y**, applied at (**13.00**, 0.00) on the bottom edge (arrow tail 42.50 pt below
  the edge; 184.17 pt from the left edge = 12.995 m). Dash-dot axis at x = 13.00 m.

### 3.4 Wall elevations ("form diagram … 1:100")

All nine elevations share the same frame, measured 141.67 × 85.00 pt = **5.000 m × 2.999 m**:

- wall length **5.00 m**, total height **3.00 m**;
- horizontal line 11.33 pt below the top = **slab 0.40 m thick**, clear wall height **2.60 m**;
- dash-dot axis line 5.665 pt below the top = **slab mid-plane at z = 2.80 m** — this is the level
  at which the horizontal force from the diaphragm is applied;
- two supports at the base, apex **0.40 m in from each end** ⇒ **support span 4.60 m**.
  One is hatched (pin), one is a plain triangle over a line (roller):
  p.1 wall A / wall B / wall C: pin **left**, roller right.
  p.2 wall A: roller left, pin **right**. p.2 wall B: pin **left**, roller right.
  p.2 wall C: roller left, pin **right**.

Openings (local x from the wall's left end, z above the base):

| Elevation | Opening |
|---|---|
| p.1 wall A (Task 2) | none — solid panel |
| p.1 wall B (Task 2) | rectangle x 1.555 → 3.443 m, z 0.822 → 2.177 m (1.888 × 1.355 m) |
| p.1 wall C (Task 2) | identical rectangle, x 1.555 → 3.443 m, z 0.822 → 2.177 m |
| p.2 wall A (Task 3) | **two triangular openings** leaving a 0.657 m wide diagonal band at 31.3°. Upper triangle (0.738, 2.499)-(3.921, 2.499)-(0.738, 0.562); lower triangle (4.306, 2.265)-(4.306, 0.328)-(1.123, 0.328); the two hypotenuses are parallel, slope dz/dx = 0.6086 |
| p.2 wall B (Task 3) | **two circles** ⌀1.013 m, centres (0.891, 1.959) and (4.107, 1.959) |
| p.2 wall C (Task 3) | **one circle** ⌀1.681 m, centre (2.499, 1.289) — dead centre of the wall length |
| p.4 walls A/B/C (Task 5) | **blank** — student designs the elevations |

### 3.5 Task 1, the six bracing panels (p. 1)

No scale, no dimensions. Six identical rectangles, page pt 56.67 wide × 113.33 high ⇒ **aspect
1 : 2 (portrait)**. Wall thickness 1.89 pt = W/30. Panel-normalised coordinates below
(u = 0 left … 1 right, v = 0 bottom … 1 top). Panel x-origins: a 157.34, b 270.68, c 384.02,
d 497.35, e 610.69, f 724.02; all y 210.02 → 323.35.

- **a)** right edge wall, u = 0.967…1.00, v = 0…1 (full height); bottom edge wall, v = 0…0.017, u = 0…1 (full width). **Two walls.**
- **b)** a square core, u 0.25…0.75, v 0.375…0.625 (side = W/2), all four sides walls, with a gap of W/6 in the **left** side, centred (v 0.4256…0.5744). Effectively a channel/core.
- **c)** one full-width horizontal wall on v = 0.500; two collinear vertical walls on u = 0.500, one from v = 0.685 to 1.00, one from v = 0.00 to 0.315 (gap in the middle 37 % of the height).
- **d)** horizontal wall at the top, u 0.25…0.75; horizontal wall at the bottom, u 0.25…0.75; a diagonal wall at exactly 45° on the page from (u 0.228, v 0.630) to (u 0.761, v 0.364), centred on the panel.
- **e)** one full-width horizontal wall on v = 0.500; upper diagonal from (u 0.178, v 0.991) to (u 0.822, v 0.796); lower diagonal from (u 0.178, v 0.009) to (u 0.822, v 0.204). The two diagonals are exact mirror images about v = 0.5.
- **f)** top edge wall full width; bottom edge wall full width; left edge wall v 0.50…1.00; right edge wall v 0.00…0.50.

### 3.6 Axonometrics

Pages 1, 2 and 4 each carry a schematic axonometric to the right of the plan: a 30° / 30°
projection, both plan axes unforeshortened, edge 113.33 pt ≙ 16 m and 85.00 pt ≙ 12 m
⇒ **1:400**, wall height drawn 21.25 pt ≙ 3.00 m. The slab thickness in the axonometric is drawn
4.34 pt ≙ 0.61 m, i.e. schematic and *not* the 0.40 m the elevations give. Treat the axonometrics
as illustration only; the plans are authoritative.

---

## 4. THE ANSWERS, DERIVED

### 4.0 Which method the sheet expects

Compendium 10.1 states the method verbatim:
> "Since walls can only absorb forces along their axis, the possible lines of action of the walls
> and thus their points of intersection are drawn into the slab first. If more than one
> intersection is found, the system is properly braced."

So: **each wall is a single force whose line of action is that wall's centreline**, and the slab is
solved by **plane statics / graphic statics** (a strut-and-tie force flow plus a closed force
polygon). There is no stiffness distribution, no centre-of-rigidity calculation, no torsional
stiffness. **This is not a simplification here:** with exactly three walls the slab has three
unknown reactions and three equilibrium equations, so the system is **statically determinate** and
a rigid-diaphragm stiffness distribution would return **identical** numbers. A stiffness assumption
would only start to matter with four or more walls, which this sheet never has.

### 4.1 Task 1 — which schemes work

Criterion: three or more wall axes, **not all parallel** and **not all concurrent** (a common
intersection point, finite or at infinity, leaves a rotation free).

| | Layout | Axes | Verdict |
|---|---|---|---|
| a) | 1 vertical + 1 horizontal wall | 2 only | **✗ NOT braced** — only 2 reactions for 3 DOF |
| b) | closed square core with one door gap | horizontal-acting walls on 2 different v, vertical-acting walls | **✓ braced** |
| c) | 1 horizontal wall + 2 collinear vertical walls, all through the panel centre | y = 0.5·H and x = 0.5·W, all through (0.5W, 0.5H) | **✗ NOT braced** — concurrent; and the two vertical walls are collinear, so only 2 independent constraints |
| d) | 2 parallel horizontals + 1 diagonal at 45° | parallel pair meets at infinity, diagonal not parallel to them, no common point | **✓ braced** |
| e) | 1 horizontal wall + 2 mirrored diagonals | the two diagonals are mirror images about the horizontal wall's axis, so they cross **on** it | **✗ NOT braced** — all three axes concurrent |
| f) | 2 parallel horizontals + 2 parallel verticals | 2 directions, 4 axes, no common point | **✓ braced** |

**Check on e)** — the concurrency point. Upper diagonal through page pt (620.76, 211.03),
slope dy/dx = 22.12/36.52 = 0.60569; lower diagonal through (620.76, 322.33), slope −0.60569;
horizontal wall axis at y = 266.675 pt = the exact mean of 211.03 and 322.33. Intersection at
x = 620.76 + (266.68 − 211.03)/0.60569 = **712.6 pt**, y = 266.68 pt — i.e. u = **1.80**, v = 0.50:
**0.80 panel-widths outside the right edge**, on the mid-height line. The pole is off the drawing;
you only find it by extending the axes. This is the pedagogic trap of the whole task.

**Answer key: a) ✗ b) ✓ c) ✗ d) ✓ e) ✗ f) ✓** (three of six tick).

### 4.2 Task 2 — qualitative, walls A + C horizontal, wall B vertical

Wall force lines: A on y = 11.80 (takes x only), C on y = 0.20 (takes x only), B on x = 8.80
(takes y only). Load F in +x on y = 6.00.

ΣF_y = 0 ⇒ **B = 0**.
ΣF_x = 0 ⇒ A_x + C_x = −F.
ΣM about the origin (M = x·F_y − y·F_x): −6.00 F − 11.80 A_x − 0.20 C_x = 0.
Substituting C_x = −F − A_x: −5.80 F − 11.60 A_x = 0 ⇒ **A_x = −0.5 F**, **C_x = −0.5 F**.

> **A = C = F/2 (each in −x); B = 0.**

**Check** — A and C sit 5.80 m above and 5.80 m below F's line of action, and are equal, so their
moments about y = 6.00 cancel exactly and F itself has zero moment about its own line: consistent
with B = 0. **Check 2** — the resultant of the three wall forces is (−F, 0) on the line
y = (0.5F·11.80 + 0.5F·0.20)/F = **6.00 m**, i.e. exactly collinear with F. **Zero eccentricity,
zero torsion.** This is why wall B is unloaded.

**Force flow in the slab** (compendium route — guide F into the wall-axis intersection points).
The only intersections are P₁ = (8.80, 11.80) = axis A ∩ axis B, and P₂ = (8.80, 0.20) = axis C ∩
axis B (axes A and C are parallel). Two intersections ⇒ braced.
- Strut ①: (0.00, 6.00) → P₁, length √(8.80² + 5.80²) = **10.539 m**, inclination
  atan(5.80/8.80) = **33.398°**.
- Strut ②: (0.00, 6.00) → P₂, mirror image.
- Tie ③: along y = 11.80 from P₁ back to wall A's right end (5.00, 11.80), length 3.80 m.
- Tie ④: along x = 8.80 from P₁ down to wall B's top end (8.80, 8.50), length 3.30 m.
- Tie ⑤: along x = 8.80 from P₂ up to wall B's bottom end (8.80, 3.50), length 3.30 m.
- Tie ⑥: along y = 0.20 from P₂ back to wall C's right end (5.00, 0.20), length 3.80 m.

Magnitudes, written for F = 100 kN so the view can show numbers (Task 2 itself is qualitative):
struts ① ② = 50/cos 33.398° = **59.88 kN compression** each; ties ③ ⑥ = **50.00 kN tension** each;
ties ④ ⑤ = 50·tan 33.398° = **32.95 kN tension** each.
**Node check at (0, 6.00):** 2 × 59.88 × cos 33.398° = 100.0 = F ✓, vertical components cancel ✓.
**Node check at P₁:** strut delivers (+50.00, +32.95); tie ③ pulls (−50.00, 0); tie ④ pulls
(0, −32.95); sum = 0 ✓.

Note the sign flip against the compendium's worked example: there walls A and C lie *beyond* the
intersection points, so member ③ is a **strut**; here walls A and C lie *before* them (x 0…5 vs
intersections at x = 8.80), so members ③ and ⑥ are **ties**. Colour them red, not blue.

Ties ④ and ⑤ are equal, opposite and **collinear** on x = 8.80, so they cancel exactly:
wall B receives 32.95 kN pulling at its top end and 32.95 kN pulling at its bottom end, is in
tension along its length, and delivers **zero base shear**. Equivalent and simpler: run one single
tie straight from P₁ to P₂ and leave wall B out of the flow entirely.

**Wall-level results (Task 2b), if F = 100 kN.** Force applied at the slab mid-plane, z = 2.80 m;
support span 4.60 m.
- Wall A: horizontal load 50.00 kN pulling at the **right** end of the elevation (elevation right =
  +x_plan). Base: H = 50.00 kN at the pin; vertical couple V = 50.00 × 2.80 / 4.60 = **±30.43 kN**.
- Wall C: identical.
- Wall B: two collinear opposite 32.95 kN forces at the ends of the top edge ⇒ **both base
  reactions zero**; the only internal action is a 32.95 kN tension tie along the top of the panel.

### 4.3 Task 3 — quantitative, F = 100 kN

Wall force lines: A on x = 0.20 (takes y), C on x = 15.80 (takes y), B on y = 11.80 (takes x).
Load F = 100 kN in +x on y = 6.00.

ΣF_x = 0 ⇒ **B = 100.00 kN in −x**.
ΣF_y = 0 ⇒ A_y = −C_y.
ΣM about origin: −6.00(100) + 11.80(100) + 0.20 A_y + 15.80 C_y = 0
⇒ 580 + 15.60 C_y = 0 ⇒ **C_y = −37.1795 kN, A_y = +37.1795 kN**.

> **A = C = F·(y_B − y_F)/(x_C − x_A) = 100 × 5.80 / 15.60 = 37.1795 kN ≈ 37.18 kN**
> **B = 100.00 kN**

**Check 1 (couples).** F and B form a couple 100 × (11.80 − 6.00) = **580.0 kNm**; A and C form the
balancing couple 37.1795 × (15.80 − 0.20) = 37.1795 × 15.60 = **580.0 kNm** ✓.
**Check 2 (resultant of the wall reactions).** ΣF = (−100.00, 0); ΣM about the origin
= 0.20(37.1795) + 15.80(−37.1795) + 11.80(100) = 7.436 − 587.436 + 1180 = **+600.0 kNm**, which for
a −100 kN x-force means line of action y = 600/100 = **6.00 m** — collinear with F ✓. So the wall
reactions reduce to a single 100 kN force in −x on y = 6.00 m: no residual force, no residual
torsion.
**Check 3 (edge-line idealisation).** If a student measures to the slab edges instead of the wall
centrelines (walls at x = 0 and 16.00, y = 12.00), A = C = 100 × 6.00/16.00 = **37.50 kN** — 0.86 %
high. Both readings are defensible at drawing accuracy; quote 37.18 kN and flag 37.50 kN.

**Force flow in the slab — the minimal solution is a single strut.**
Intersections of the wall axes: N₁' = (0.20, 11.80) = A ∩ B and **N₂ = (15.80, 11.80) = B ∩ C**
(axes A and C are parallel). Two intersections ⇒ braced.
Take **N₁ = (0.20, 6.00)**, the intersection of F's line of action with wall A's axis. The resultant
of F and A is (100, 37.1795) kN through N₁; its line has slope 37.1795/100 = 0.371795 and at
x = 15.80 reaches y = 6.00 + 0.371795 × 15.60 = **11.80** — i.e. it passes exactly through N₂. So:

| Member | From → To | Length | Force |
|---|---|---|---|
| A-link | (0.20, 5.00) → (0.20, 6.00), on wall A's axis | 1.00 m | **37.18 kN COMPRESSION** (blue) |
| **Strut S** | N₁ (0.20, 6.00) → N₂ (15.80, 11.80) | **16.643 m**, at **20.396°** | **106.69 kN COMPRESSION** (blue) |
| C-link | N₂ (15.80, 11.80) → (15.80, 5.00), on wall C's axis | 6.80 m | **37.18 kN TENSION** (red) |
| B | delivered at N₂, which lies **on** wall B (x 11.00…16.00) | — | 100.00 kN into wall B |

Strut force = √(100.00² + 37.1795²) = √11382.31 = **106.6879 kN**.
**Check:** 106.6879 × cos 20.396° = 100.000 ✓; 106.6879 × sin 20.396° = 37.180 ✓.
**Check on member sense:** wall A is *below* N₁ and must push it in +y ⇒ compression; wall C is
*below* N₂ and must pull it in −y ⇒ tension.

**Force diagram (Task 3a) at 1 cm ≙ 10 kN.** Closed polygon F → S → B → C → A:
F = 10.00 cm, strut S = **10.669 cm**, B = 10.00 cm, C = **3.718 cm**, A = **3.718 cm**.

**Wall-level results (Task 3b).** Slab mid-plane z = 2.80 m, support span 4.60 m; the vertical
support couple is H·z/span = 0.60870 H and is independent of where along the wall the load lands.

| Wall | Load at top | Enters at (plan) | Position in the elevation (elevation right = ...) | Base H | Base V couple |
|---|---|---|---|---|---|
| A | 37.18 kN in −y (slab reacts on wall) | (0.20, 5.00) | right = −y_plan ⇒ load at the **left** end, pushing right | 37.18 kN | **±22.63 kN** |
| B | 100.00 kN in +x | (15.80, 11.80) | right = +x_plan ⇒ load 0.20 m from the **right** end, pushing right | 100.00 kN | **±60.87 kN** |
| C | 37.18 kN in +y | (15.80, 5.00) | right = −y_plan ⇒ load at the **right** end, pushing left | 37.18 kN | **±22.63 kN** |

Checks: 37.1795 × 2.80/4.60 = **22.6310 kN**; 100.00 × 2.80/4.60 = **60.8696 kN**;
overturning moments 104.10 kNm and 280.00 kNm respectively, recovered as 22.6310 × 4.60 = 104.10 ✓
and 60.8696 × 4.60 = 280.00 ✓.

The printed openings force the wall-internal flow: wall A's only continuous material is the
0.657 m diagonal band at 31.3°, so the 37.18 kN must run as a **diagonal compression strut** down
that band with a tie along the top and the far vertical edge. Wall B's two ⌀1.01 m holes at
z = 1.96 m leave a full-depth pier at each end and a 2.20 m deep band below the holes. Wall C's
central ⌀1.68 m hole splits the panel into two piers plus a lintel.

### 4.4 Task 4 — buckling check

Given l = 2400 mm, hinged–hinged ⇒ **l_cr = 1.0 · l = 2400 mm** (case a) of the strip).
A = 400 mm² ⇒ **√A = 20.000 mm**.

> **Abscissa: l_cr / √A = 2400 / 20.000 = 120.0**
> **Ordinate: N_d / (A·f_cd) = 54 000 / (400 × 338.095) = 54.000 / 135.238 = 0.3993**

Plot the point **(120.0, 0.399)** in the diagram, and compare with the **lowest** curve (round solid
profile — the label "A ●" leads to it; the solid-square curve lies essentially on top of it).

Chart read-off, digitised from the 300 dpi render with the axis calibrated on the tick grid
(y = 1.0 at row 345.5, y = 0 at row 1340.0; x = 0 at col 146.0, x = 150 at col 1185.5):

| l_cr/√A | 20 | 30 | 35 | 40 | 50 | 60 | 80 | 100 | **120** | 150 |
|---|---|---|---|---|---|---|---|---|---|---|
| round-solid curve | 0.744 | 0.556 | 0.462 | 0.382 | 0.271 | 0.200 | 0.121 | 0.078 | **0.055** | 0.038 |

> **Verdict: 0.399 ≫ 0.055 ⇒ the point lies far ABOVE the curve ⇒ the column BUCKLES.**
> Chart capacity N_allow = 0.055 × 135.238 kN = **7.44 kN**; demand 54 kN; **utilisation ≈ 7.3**.

**Independent check by Euler theory** (E = 210 000 N/mm², imported — see §2):
d = √(4A/π) = √(1600/π) = **22.5675 mm**; I = A²/(4π) = 160 000/12.5664 = **12 732.4 mm⁴**;
i = √(I/A) = d/4 = **5.6419 mm**; λ = l_cr/i = 2400/5.6419 = **425.39**;
σ_cr = π²E/λ² = 2 072 616 / 180 957 = **11.454 N/mm²**;
**N_cr = σ_cr·A = 4.5817 kN**, i.e. 11.454/338.095 = **0.0339** on the chart's ordinate.
**N_d / N_cr = 54.00 / 4.582 = 11.79.** Same verdict, harsher factor — see the error note in §6
about the chart's calibration.
**Cross-check on the section itself:** N_pl,d = A·f_cd = 400 × 338.095 = **135.24 kN > 54 kN**, so
the cross-section is fine against material failure by a factor 2.50. Buckling governs by a factor
135.24/4.58 = **29.5**.

**How long may this column be?** Set N_cr = N_d: l_cr,max = 2400 √(4.5817/54.000) = **699 mm**
(Euler). By chart, ordinate 0.399 is reached at l_cr/√A ≈ 38.9 ⇒ l_cr,max ≈ **778 mm**.
Either way the 2.4 m column is roughly **3.1 – 3.4 times too long**.

**Task 4 b) — how buckling can be prevented, with numbers:**
1. **Shorten the buckling length by bracing.** Lateral restraints at the third or quarter points:
   3 restraints ⇒ 600 mm segments ⇒ N_cr = 4.5817 × (2400/600)² = **73.3 kN > 54 kN ✓**.
   2 restraints ⇒ 800 mm ⇒ 41.2 kN ✗.
2. **Stiffen the supports.** Fixed–fixed gives l_cr = 0.5 l = 1200 mm ⇒ N_cr = **18.33 kN** — still
   not enough on its own.
3. **Change the section shape at the same area** — put the material at the perimeter.
   Required I = N_d·l_cr²/(π²E) = 54 000 × 5.76×10⁶ / 2 072 616 = **150 073 mm⁴**,
   i.e. required i = √(150 073/400) = **19.37 mm**. With A = 400 mm² and a circular hollow section:
   R² + r² = 4i² = 1500.7 and R² − r² = A/π = 127.32 ⇒ R = 28.53, r = 26.21 mm ⇒
   **⌀57.1 × 2.32 mm tube**. Check: A = π(28.53² − 26.21²) = 399.3 mm² ✓,
   I = π(R⁴ − r⁴)/4 = 149 935 mm⁴ ✓, N_cr = 53.95 kN ≈ N_d ✓ (take the next size up in practice).
   The shape factor i/√A goes from 0.2821 (solid round) to 0.9685 (this tube) — a factor **3.43**,
   which is exactly the compendium's "a hollow profile can be almost four times as long".
4. **Reduce the load** / share it over more columns.
5. **A higher steel grade does not help.** In the Euler range the capacity depends on E and I only;
   S500 buckles at the same 4.58 kN.

### 4.5 Task 5 — student places the walls; a fully worked recommendation

Constraints: three walls, 2.8 m high, braced for F1 alone (part a) and for F1 + F2 (part c), and
the same scheme must serve both.

**Recommended layout** (keeps all three walls on the slab edges, 5.00 m long × 0.40 m thick, same
family as Tasks 2 and 3):

| Wall | Centreline (m) | Resists |
|---|---|---|
| A | (0.00, 0.20) – (5.00, 0.20), horizontal, bottom-left | x |
| B | (11.00, 11.80) – (16.00, 11.80), horizontal, top-right | x |
| C | (15.80, 3.50) – (15.80, 8.50), vertical, right edge, centred | y |

Stability: axes y = 0.20 and y = 11.80 are parallel, x = 15.80 is not; no common point ⇒ **braced**
and statically determinate.

**Case a) — F1 = 100 kN, +x, at y = 3.00 m**
ΣF_y ⇒ **C = 0**.
Moments about wall A's axis (y = 0.20): 100 × (3.00 − 0.20) = B × (11.80 − 0.20)
⇒ **B = 280.0 / 11.60 = 24.1379 kN**; **A = 100 − 24.1379 = 75.8621 kN** (both in −x).
**Check** about y = 11.80: 100 × 8.80 = 880.0 kNm and 75.8621 × 11.60 = 880.0 kNm ✓.
**Check** resultant: (−100, 0) acting at y = (75.8621 × 0.20 + 24.1379 × 11.80)/100 = **3.000 m** —
collinear with F1 ✓, so no torsion and hence C = 0, consistent.
Force flow: F1 enters at (0.00, 3.00); node at N₁ = (0.00, 3.00) on wall A's line is *not* needed —
simplest flow is a fan: a **tie** along y = 0.20 from the entry point region into wall A, and a
**strut** from the entry point to the point (16.00, 11.80) on wall B's axis, with the y-components
resolved on wall C's axis x = 15.80. Force-diagram lengths at 1 cm ≙ 10 kN:
A = 7.586 cm, B = 2.414 cm, C = 0, F1 = 10.000 cm.

**Case c) — F1 (as above) plus F2 = 100 kN, +y, at x = 13.00 m**
ΣF_y ⇒ **C = 100.00 kN in −y**.
Moments about the point (15.80, 0.20) (which lies on both A's and C's axes, so both drop out):
F1 contributes −(3.00 − 0.20) × 100 = −280.0; F2 contributes (13.00 − 15.80) × 100 = −280.0;
B contributes −(11.80 − 0.20) × B_x. Setting the sum to zero:
**B = 560.0 / 11.60 = 48.2759 kN** (in −x); **A = 100 − 48.2759 = 51.7241 kN** (in −x).
**Check** ΣF_x = 100 − 51.7241 − 48.2759 = 0 ✓; ΣF_y = 100 − 100 = 0 ✓.
**Check** ΣM about the origin: loads give −300 + 1300 = +1000.0 kNm; walls give
−0.20(−51.7241) − 11.80(−48.2759) + 15.80(−100) = 10.345 + 569.655 − 1580 = **−1000.0 kNm** ✓.
**Resultant of the applied loads:** (100, 100) kN, |R| = **141.42 kN at 45°**, line of action
x − y = 10 (through (10.00, 0) and (16.00, 6.00)). The wall system delivers exactly −R on the same
line — that is the "no leftover torsion" statement for part c).
Force-diagram lengths: A = 5.172 cm, B = 4.828 cm, C = 10.000 cm, F1 = F2 = 10.000 cm.

**Torsion / eccentricity, stated generally for this sheet.** With three walls the "torsion" is not
a separate quantity to be distributed — it is simply the moment that the *third* wall (or the pair
of parallel walls) has to close. Quantitatively:
- Task 2: eccentricity of F about the A/C pair = 0 ⇒ torsion 0 ⇒ B = 0.
- Task 3: eccentricity of F about wall B = 11.80 − 6.00 = **5.80 m** ⇒ torsion **580 kNm**, closed by
  the A/C couple over a 15.60 m lever ⇒ ±37.18 kN.
- Task 5 case a: eccentricity of F1 about the A/B pair's resultant line = 0 by construction of the
  split ⇒ C = 0. Case c: the combined 141.42 kN resultant is offset from wall C's axis, and the
  A/B pair closes 560 kNm over an 11.60 m lever.

**Warning on wall placement (worth building into the view).** A layout the students commonly reach
for — the Task 3 layout (A at x = 0.20, C at x = 15.80, B at y = 11.80) — is braced, but with F1 at
y = 3.00 and F2 at x = 13.00 it gives **A = 38.46 kN, B = 100.00 kN, C = 138.46 kN**
(from 2180 + 0.20 A_y + 15.80 C_y = 0 with A_y + C_y = −100). Wall C then carries 38 % more than the
total applied load in that direction. The recommended layout above keeps every wall ≤ 100 kN.

---

## 5. PROPOSED STEP SEQUENCE FOR THE INTERACTIVE VIEW

Build the view on **Task 3** (the one quantitative slab problem). Tasks 1, 2, 4, 5 become
toggles/siblings, noted at the end.

| # | Title | What appears |
|---|---|---|
| 1 | **The floor plan** | 16.00 × 12.00 m slab at 1:200, walls A, B and C as 0.40 m thick, 5.00 m long solid rectangles at the measured positions, wall labels, the three view-direction triangles, edge dimension strings (16.00 / 12.00 / 5.00 / 0.40 / 11.00). Teal ghost of the finished force diagram, per the project's standing step-1 rule. |
| 2 | **Walls only take force along their own axis** | Each wall's centreline extended across the whole plan as a dashed axis; a small in-plane force arrow on each axis showing the one direction that wall can resist. |
| 3 | **The intersection test** | Highlight N₁' = (0.20, 11.80) and N₂ = (15.80, 11.80). State: axes A and C are parallel, B crosses both, two intersection points ⇒ braced. Optional inset: the six Task-1 panels, each with its axes extended, three green ticks and three red crosses, with panel e)'s pole drawn 0.80 panel-widths off the right edge. |
| 4 | **The load** | F = 100 kN arrow entering at (0.00, 6.00) in +x, its line of action extended right across the plan; node **N₁ = (0.20, 6.00)** picked out where it meets wall A's axis. |
| 5 | **One strut does the whole job** | Draw N₁ → N₂. Show the 20.396° inclination and the 16.643 m length; show that its line passes exactly through the B ∩ C intersection. Blue = compression. |
| 6 | **Resolve at N₂** | At N₂ split the strut into B = 100.00 kN along y = 11.80 (straight into wall B) and 37.18 kN along x = 15.80. Add the C-link (red tie, 6.80 m down to wall C) and the A-link (blue strut, 1.00 m up to N₁). Green external arrows at all three walls. |
| 7 | **The force diagram** | Build the closed polygon at 1 cm ≙ 10 kN in lockstep with step 6: F (10.00 cm) → S (10.669 cm) → B (10.00 cm) → C (3.718 cm) → A (3.718 cm), closing on itself. |
| 8 | **The couple check** | Overlay the two couples: F/B = 100 kN × 5.80 m = 580 kNm and A/C = 37.18 kN × 15.60 m = 580 kNm. Show the resultant of the three wall forces collapsing onto F's own line, y = 6.00 m. |
| 9 | **Unfold each wall into its elevation** | Rotate each wall out of the plan into its 1:100 elevation using its view-direction triangle (elevation right = d × z). Land the wall force on the top edge at the right end and at z = 2.80 m; draw the printed openings; route red/blue members around them; show the base pin/roller and the reactions H and ±V (37.18 / ±22.63 kN for A and C, 100.00 / ±60.87 kN for B). |
| 10 | **Answer** | Card: **A = C = 37.18 kN, B = 100.0 kN, strut 106.69 kN at 20.40°**, wall-base couples ±22.63 / ±60.87 kN, resultant of the wall reactions = 100 kN in −x on y = 6.00 m — collinear with F, so nothing is left over. |

**Live quantities (sliders / toggles)**
- `F` magnitude, 0 – 200 kN — everything scales linearly; the force diagram redraws at the fixed
  1 cm ≙ 10 kN scale so the polygon visibly grows.
- `y_F`, the height of F on the left edge, 0 – 12.00 m. **The most instructive slider on the sheet:**
  drag to y = 11.80 and A = C = 0 (F goes straight into wall B); drag to y = 0 and
  A = C = 100 × 11.80/15.60 = 75.64 kN. At y = 6.00 the printed answer appears.
- `x_C`, wall C's position, 5.00 – 15.80 m — shows the 1/lever-arm blow-up: A = C = 580/(x_C − 0.20).
  Sliding wall C onto wall A makes the couple singular and the plan unstable (the three axes become
  concurrent-at-infinity / two of them coincide) — a live demonstration of Task 1.
- Toggle **centreline vs. outer-edge** idealisation: 37.18 kN vs 37.50 kN.
- Toggle **layout**: Task 3 layout ↔ Task 2 layout (which drops B to zero) ↔ Task 5 recommended
  layout, all on the same 16 × 12 m slab.
- Toggle **F2** (Task 5c): adds the 100 kN +y load at x = 13.00 m and re-solves.
- Toggle **show wall axes / show force diagram / show labels**, matching the existing panel.

**What has to be drawn that is new to this project — say it plainly**

This is the first **plan (top-view)** view in the library. Everything shipped so far is an
elevation-space form/force diagram pair. Concretely, the following are new drawing primitives:

1. **A plan renderer.** A slab rectangle in metres with walls as filled/hatched 0.40 m thick
   rectangles, drawn at 1:200 — i.e. the drawing engine must accept a *per-figure* scale, because
   the same page also carries elevations at 1:100 and a force diagram at 1 cm ≙ 10 kN. The current
   single global `LINE_SCALE` is not sufficient.
2. **Wall-axis lines**: dashed centrelines extended beyond the wall to the plan boundary, with
   marked intersection points.
3. **In-plane force arrows and in-plane strut/tie members**, red/blue/green, drawn *inside* the plan
   — geometrically the same as an elevation truss, but they must sit in the plan's coordinate frame.
4. **The small solid view-direction triangles**, and the transform they encode.
5. **A plan → elevation "unfold" animation.** For each wall, a rotation about its own axis that
   carries the plan rectangle into the 1:100 elevation, driven by the triangle's direction
   (elevation right = d × ẑ). This is the single piece of new machinery with real value: it is what
   makes the sign conventions in Task 2b/3b legible instead of memorised.
6. **Openings inside an elevation panel** — rectangles, circles and triangles subtracted from the
   wall outline, with the force flow routed around them.
7. **A length-calibrated force diagram** (1 cm ≙ 10 kN) rather than a schematic one, so the
   10.00 cm / 3.718 cm lengths are literally measurable on screen.
8. Optional: the 30°/30° axonometric at 1:400, reproducible from the plan data with a fixed
   projection matrix. Low value; skip unless cheap.

Tasks 1 and 4 are natural **separate small views**: Task 1 as a six-panel "extend the axes and see
whether they meet" toggle grid; Task 4 as a buckling chart with a draggable point (l, section
shape, support condition) and a live Euler overlay — but see the chart caveat in §6.

---

## 6. ERRORS AND AMBIGUITIES IN THE SHEET

1. **Hidden duplicate text.** Every `F` / `F1` / `F2` label exists 2–3 times in the content stream at
   different y-positions; only the topmost renders. `pdftotext` reports three `F`s beside the Task 2
   plan and three beside its axonometric where **one** of each is drawn; page 4 reports two `F1`s per
   plan and two `F2`s. Verified against a 300 dpi render. **There is no hidden duplicate vector
   artwork** on pages 1, 2 or 4 — a scan of every segment longer than 100 pt found each slab outline
   exactly once. (Some short segments are drawn twice at identical coordinates; harmless overdraw.)

2. **Task 2 is degenerate and the sheet does not admit it.** F acts exactly on the slab mid-line
   (measured 750.19 pt against a mid of 750.195 pt) and walls A and C are exactly symmetric about it
   (y = 11.80 and 0.20). Therefore **wall B carries zero net force** and sub-task 2b for wall B has
   the answer "no applied resultant, no support forces" — yet the sheet asks the student to "draw
   the applied horizontal force for each wall … then find the support forces". The compendium's own
   worked example has the same degeneracy and dodges it by drawing two equal, opposite, collinear
   forces B₁ and B₂ at the two ends of wall B. Decide explicitly which reading the view teaches.

3. **No dimensions are printed on any plan.** Not one dimension string. Every plan dimension in §3
   is inferred from the drawing plus the "1:200" caption. The 16.00 × 12.00 m slab and 5.00 × 0.40 m
   walls come out clean; **wall B's position in Task 2 measures 8.796 m** from the left edge, which
   reads as 8.80 m but is not certain to the centimetre. Same for the wall centreline offsets of
   0.20 m — those are exactly half the 0.40 m thickness, so they are safe.

4. **Task 5's F1 is not at mid-height** (3.00 m above the bottom edge), whereas Tasks 2 and 3 both
   put F at mid-height (6.00 m). Nothing on the sheet flags the change and it is easy to miss.

5. **The Task 4 buckling chart is not quantitatively self-consistent.** Digitised, its round-solid
   curve follows an Euler branch of the form 780/x², which back-solves to f_cd ≈ 211 N/mm², not the
   338.1 N/mm² the course's own formulary gives for S355. At l_cr/√A = 120 the chart reads 0.055
   whereas exact Euler theory gives 0.0339 — a factor 1.6. In addition:
   - The two lowest curves are labelled solid-square and solid-round, but those two shapes differ in
     i/√A by only 2.3 % (0.28868 vs 0.28209) and must therefore be almost coincident. On the printed
     chart the two lowest curves are a factor ~5.5 apart in ordinate at x = 120, so the labelling and
     the curves cannot both be right.
   - Compendium 10.2 claims a hollow profile "can be almost four times as long"; the printed chart
     supports a ratio of only ≈ 2.4.
   The verdict (the column buckles) is completely unaffected — the demand is 0.399 against a
   capacity of 0.055 read off the chart, or 0.034 by theory — but **any number a student reads off
   this chart is soft to roughly a factor 1.6**, and the view must not present a chart read-off as
   an exact result.

6. **E is nowhere in the course material.** The formulary (2.6) gives f_tk, f_ck, γ_M and density but
   no modulus of elasticity, so the student physically cannot do the Euler cross-check and is forced
   onto the graph. The E = 210 GPa used in §4.4 is imported from outside the course.

7. **Colour-legend inconsistency between the English and German sheets.** English 2b and 3b say
   "…and **reaction** forces with green"; English 5a says "…and **external** forces with green"; the
   German sheet says "äussere Kräfte grün" (external) in all three places. Use *external* — the
   green arrows in the compendium include the loads the walls apply to the slab, which are not
   reaction forces of the slab in any strict sense.

8. **Task 1 gives neither a scale nor a load direction.** The six panels are bare 1:2 rectangles, so
   the answer rests purely on the topological rule (three axes, not all parallel, not concurrent).
   Panel c) is additionally a trap of a second kind: it *shows* three walls, but two of them are
   collinear, so there are only two independent constraints. Panel e)'s concurrency point lies
   0.80 panel-widths off the right edge and is invisible unless the axes are extended.

9. **Task 4's chart-strip labels repeat "l_cr = l" twice** (cases a and d — hinged/hinged and
   fixed-base/fixed-roller-top). That is correct, but the two identical labels on adjacent sketches
   read like a typo. The column in Task 4 is case a).

10. **Wall-support idealisation in the elevations is never stated in words.** The elevations show a
    pin and a roller 0.40 m in from each end (span 4.60 m), so the wall is treated as a simply
    supported panel, not as a wall on continuous ground. All base-reaction numbers in §4 depend on
    that 4.60 m span; a student assuming supports at the wall ends (5.00 m span) gets vertical
    couples 8 % smaller (20.82 / 56.00 kN instead of 22.63 / 60.87 kN).

11. **The axonometrics contradict the elevations on slab thickness** — 0.61 m in the axonometric
    (4.34 pt at 1:400) against 0.40 m in the elevations and plans. Schematic; ignore the
    axonometric for any measurement.
