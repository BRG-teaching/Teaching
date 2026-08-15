# DECODE BRIEF — EX 8 "Frames", pages 2 and 3

Structural Design II, FS 23. Sources decoded:

* `drawings/web/pdf/EX8-frames-task-en.pdf` (3 pp, A4 landscape 297 × 210 mm)
* `drawings/web/pdf/EX8-frames-aufgabe-de.pdf` (German twin — see §8, it is **not** a
  faithful translation)
* `drawings/web/pdf/compendium/8.1-redirecting-forces-en.pdf` (the method)
* `drawings/web/pdf/compendium/2.5-dimensioning-en.pdf`, `2.6-formulary-en.pdf` (the factors)

No published solution exists. Everything below §2 is derived here, with the working shown.

Geometry was digitised with
`drawings/web/tools/sheetvec.py <pdf> <page> --scale 100`, cross-checked against a
300 dpi render (`pdftoppm -r 300`). Page 1 calibrates the tool: its case c) portal comes
out 7.997 m between column centrelines against a nominal 8.000 m, so the digitiser is good
to ±0.003 m at 1:100. **Page 2 carries no dimension lines at all** — the numbers below are
the only dimensions this sheet contains.

---

## 0. Page 1, case b) — the polygonal arch (the one item still open from page 1)

Origin = **left support pin apex**, x to the right, y up. Supports digitise at
(6.825, 20.863) and (14.822, 20.863) in raw sheet coordinates → span **7.997 m ≈ 8.000 m**,
and the crown hinge (the point of the V-notch) at **(3.999, 3.996) ≈ (4.000, 4.000)**.
Page 1's established decode is confirmed exactly.

**Outer outline** (m):

| # | x | y |
|---|---|---|
| O0 | −1.071 | 0.000 |
| O1 | 0.420 | 3.922 |
| O2 | 3.499 | 4.926 |
| — crown notch, outer edge runs down to (3.951, 4.086) — |
| C | 4.000 | 4.000 |
| — mirror: (4.046, 4.086) — |
| O2′ | 4.498 | 4.926 |
| O3 | 7.577 | 3.922 |
| O4 | 9.068 | 0.000 |

**Inner outline** (m):

| # | x | y |
|---|---|---|
| I0 | 0.776 | 0.000 |
| I1 | 1.665 | 2.618 |
| I2 | 3.635 | 3.145 |
| — notch edge up to (3.959, 3.906) — |
| C | 4.000 | 4.000 |
| — mirror: (4.038, 3.906) — |
| I2′ | 4.361 | 3.145 |
| I3 | 6.331 | 2.618 |
| I4 | 7.221 | 0.000 |

The two halves meet at a knife point at the crown: each half tapers from a 1.781 m deep
section at the outer kink to zero at the hinge. Base cut is horizontal, 1.847 m wide;
the springing faces rise at 69.2° (outer) and 71.2° (inner); the upper faces run at
18.06° (outer) and 14.98° (inner).

**Centreline** (mid-points of matched outer/inner vertices):

| point | x | y | departure from the (0,0)-(4,4)-(8,0) triangle |
|---|---|---|---|
| base-cut mid | −0.148 | 0.000 | +0.105 m ⟂, outside (the pin at (0,0) is 0.148 m inboard of the base mid-point) |
| support pin | 0.000 | 0.000 | 0 (by definition) |
| kink | **1.043** | **3.270** | **+1.575 m ⟂** (2.228 m vertically above the 45° leg) — the largest departure |
| nose | 3.567 | 4.036 | +0.332 m ⟂ |
| crown hinge | 4.000 | 4.000 | 0 |
| nose (R) | 4.433 | 4.036 | +0.332 m ⟂ |
| kink (R) | 6.957 | 3.270 | +1.575 m ⟂ |
| base-cut mid (R) | 8.148 | 0.000 | +0.105 m ⟂ |

Sign convention: "+" = the centreline sits **above/outside** the funicular triangle leg
(perpendicular distance, ⟂ to the 45° chord). The arch is a *pointed* polygon: it rises far
steeper than the funicular at the springing and is far flatter than it under the crown.

**Consequence worth carrying into the views:** the thrust-line triangle (0,0)-(4,4)-(8,0)
**leaves the material of case b)** between (1.175, 1.175) and (2.966, 2.966) — a 2.53 m
stretch of the left leg where the triangle passes *below* the inner face by up to 0.674 m ⟂
(at the inner kink I1). Case b) therefore also needs a §8.1 redirection, exactly like page 2.

---

## 1. Task text, verbatim, and the sub-part count

### Task 2 — "Internal force flow in frames" (p. 2)

> Find a possible internal force flow in the given reinforced concrete frame with the help
> of the thrust line. First calculate the applied forces at design level. Then draw the
> corresponding force diagrams and colour tension forces in red, compression forces in blue
> and external forces in green.
>
> a) Assume a horizontal live load Q_k = 30 kN.
>
> b) The dead load is G_k = 20 kN and the live load is Q_k = 18 kN.

Figure captions, both a) and b): *form diagram 1:100* … *force diagram 1cm ≙ 10kN*.

### Task 3 — "Dimensioning" (p. 2)

> Dimension the reinforcement within the reinforced concrete for the relevant tension force
> of task 2a). Use steel S235 to calculate the diameter of the round steel cable and round
> the result off to mm. (Round up!)

### Task 4 — "Axial Force Proof" (p. 2)

> Check whether the reinforcement in the reinforced concrete in task 2b) can withstand the
> relevant tension force. The reinforcement has a round section with a diameter of 18 mm and
> is made of steel S235.

### Creative Task — "Art Gallery" (p. 3)

> For an art gallery, a frame structure is to be designed such that it provides an interior
> space of at least 10 meters width and 5 meters height.
>
> a. Design the shape of such a frame in the form diagram. Apply the vertical dead load
>    G_d = 40 kN as well as the horizontal wind load Q_d = 35 kN.
>
> b. Verify your design. Seek the global equilibrium. Find a possible internal force flow and
>    draw the corresponding force diagram. Indicate tension forces with red, compression
>    forces with blue and reaction forces with green.
>
> c. If your force diagram does not fit on the paper, design a second, optimized frame and
>    adjust the force diagram.

Captions: *form diagram 1:100* … *force diagram 1cm ≙ 10kN*.

**Distinct sub-parts on pages 2–3: 7** — Task 2a, Task 2b, Task 3, Task 4, Creative a,
Creative b, Creative c. (Task 2's preamble adds four sub-operations that apply to both a and
b: design-level loads, thrust line, internal force flow, coloured force diagram.)

---

## 2. Page 2 geometry (Task 2)

Both frames are **three-hinged**: pin at each support, one hinge at the crown (the drawn
circle). Statically determinate. Everything is at 1:100; the digitised values are **not** on
a round metre grid — unlike page 1, these figures were drawn free-form.

### 2a) — asymmetric frame, supports at two different levels

Origin = **left support pin apex A**. Right support B is **2.686 m below** A.

```
A = (0.000,  0.000)          pin
B = (10.258, −2.686)         pin
C = (5.349,  5.260)          crown hinge  (see note)
```

Outer outline, left half → right half:

| point | x | y | what |
|---|---|---|---|
| (−0.150, 0.000) | −0.150 | 0.000 | foot of left outer face |
| O_L | −0.150 | 5.410 | top-left corner |
| — | 5.316 | 5.410 | top face at the crown, left edge |
| — | 5.381 | 5.410 | top face at the crown, right edge |
| O_R | 10.408 | 2.803 | top of the right column (outer) |
| — | 10.408 | −2.686 | foot of the right outer face |

Inner outline:

| point | x | y | what |
|---|---|---|---|
| — | 0.161 | 0.000 | foot of left inner face |
| K_L | 1.637 | 3.692 | left inner kink |
| — | 5.316 | 5.088 | inner apex, left |
| — | 5.373 | 5.021 | inner apex, right |
| K_R | 8.605 | 1.844 | right inner kink |
| — | 10.100 | −2.686 | foot of right inner face |

Base cuts (horizontal): left 0.311 m wide, right 0.308 m wide. Crown section depth
≈ 0.33 m. Both pin symbols are 0.500 m wide × 0.309 m high triangles.

*Note on C:* the drawn hinge circle (⌀ 0.20 m) straddles the top face, so its centre is
ambiguous by ±0.06 m. Taken at the mid-depth of the crown section, which coincides with the
Q_d line of action (y = 5.260). §3 shows the answer is insensitive to this: over the whole
range 5.021 ≤ C_y ≤ 5.410 the governing tension moves by only 0.13 %.

**Load, case a):** one force only. Horizontal, **pointing left (−x)**, line of action
y = 5.260 (through the crown hinge), arrow tip at (5.94, 5.260). Labelled **Q_d**.
Characteristic value from the text: **Q_k = 30 kN**. There is **no gravity load in case a)**.

### 2b) — symmetric portal, both supports at ground level

Origin = **left support pin apex A**.

```
A = (0.000, 0.000)           pin
B = (9.190, 0.000)           pin        span 9.190 m
C = (4.595, 4.510)           crown hinge — exactly at midspan
```

Outer outline: (−0.150, 0.000) → (−0.150, 4.672) → (4.567, 4.672) ‖ (4.624, 4.672) →
(9.340, 4.672) → (9.340, 0.000).

Inner outline: (0.128, 0.000) → K_L (1.428, 3.201) → (4.567, 4.351) ‖ (4.624, 4.351) →
K_R (7.763, 3.201) → (9.063, 0.000).

Column base cuts 0.278 m wide; top slab 0.321 m deep at the crown; the top-left/top-right
corners are the thick part of the section. The figure is symmetric to ±0.001 m about
x = 4.595.

The shape is identical to the compendium 8.1 "Hinges and global Equilibrium" figure; EX 8
adds the horizontal Q_d.

**Loads, case b):**

| load | value | line of action | direction | applied at |
|---|---|---|---|---|
| G_d | G_k = 20 kN | vertical, x = 4.595 | downwards | dashed leader ends on the crown hinge |
| Q_d | Q_k = 18 kN | horizontal, y = 4.508 | **to the right (+x)** | arrow tip on the left outer face at (−0.150, 4.508) |

y = 4.508 is the crown-hinge elevation to within 0.002 m — **both loads pass through the
crown hinge C**. This is deliberate and it is what makes the exercise solvable by hand.

### Design values — the partial safety factors

From **compendium 2.6 "Formulary"**, table *Sicherheitsfaktoren für Lasten / Safety factors
for loads*:

* dead load  **γ_G = 1.35**
* live load  **γ_Q = 1.5**
* and `F_d = F_k · γ`  [kN]

Repeated verbatim in **compendium 2.5 "Dimensioning"**: *"For dead loads the safety factor is
γ_G = 1.35 and for live loads γ_Q = 1.5."*

| | characteristic | factor | **design** |
|---|---|---|---|
| 2a) Q | Q_k = 30 kN | ×1.5 | **Q_d = 45.00 kN** |
| 2b) G | G_k = 20 kN | ×1.35 | **G_d = 27.00 kN** |
| 2b) Q | Q_k = 18 kN | ×1.5 | **Q_d = 27.00 kN** |

Page 3 already states G_d and Q_d, so **no factors are applied there**.

Material (compendium 2.6, *Materialkennwerte*): S235 → f_tk = 235 N/mm², γ_M = 1.05, so
**f_td = 235 / 1.05 = 223.8095 N/mm²**. (S355 → 338.0952 N/mm²; needed only for the German
variant of Task 3, §8.)

---

## 3. Task 2 answers

### 3.1 The rule that unlocks both cases

Compendium 8.1: *"The lines of action of the applied force and those of the reaction forces
(thrust line) always intersect at the hinge in the form diagram."* In **both** frames every
applied load passes through the crown hinge C, so each half is reduced to a two-force body
and both reaction lines are the chords **A–C** and **C–B**. The thrust line is therefore the
two-segment polygon **A–C–B** in both cases, and there is nothing to construct: the global
equilibrium falls out of one force triangle.

### 3.2 Case a) — global equilibrium

Chords: A→C = (5.349, 5.260), |AC| = 7.5020 m, 44.519°.
B→C = (−4.909, 7.946), |BC| = 9.3401 m, 121.708°.

Node C: `N_L·u_AC + N_R·u_BC + (−45, 0) = 0`

```
0.71301 N_L − 0.52558 N_R = 45
0.70115 N_L + 0.85074 N_R =  0     →  N_L = −1.21335 N_R
```

**N_L = +39.26 kN (compression, left half)**, **N_R = −32.36 kN (tension, right half)**.

Reactions:

* **A = 39.26 kN** at 44.519°, components **(+27.99, +27.53) kN** — pushes up and to the right
* **B = 32.36 kN** at −58.292°, components **(+17.01, −27.53) kN** — pushes right and
  **downwards** (the right support has to hold the frame *down*)

**Check** ΣF = (27.99 + 17.01 − 45.00, 27.53 − 27.53) = (0.00, 0.00) ✓
**Check** ΣM about A = −5.260·(−45.00) + [10.258·(−27.53) − (−2.686)·17.01]
= 236.7 − 282.4 + 45.7 = 0.0 kNm ✓

**Thrust line:** the two straight segments A(0, 0) → C(5.349, 5.260) → B(10.258, −2.686).

### 3.3 Case a) — internal force flow (compendium 8.1 redirection)

The thrust line does not stay in the concrete. It leaves the left half at **(0.265, 0.261)**
— 0.372 m from the support — and leaves the right half at **(5.688, 4.712)**, i.e.
(+0.339, −0.548) from C, **0.644 m** from the crown. From there on it runs through the void. So both halves
must be redirected, exactly as in the compendium's *Frame corner*.

**Chosen model** (one per half, 5 elements, the same topology as compendium 8.1 items 3–7 —
every element lies inside the drawn concrete):

| element | runs along |
|---|---|
| C–O | the outer face from the crown to the outer corner |
| C–K | the inner face from the crown to the inner kink |
| K–O | the diagonal from the inner kink to the outer corner |
| K–S | the inner face from the kink down to the support |
| O–S | the outer face (the column) from the corner to the support |

**Left half** — O_L(−0.150, 5.410), K_L(1.637, 3.692), A(0, 0), force at C = (−27.99, −27.53):

| element | length | force | sense |
|---|---|---|---|
| C–O | 5.501 m | **34.93 kN** | TENSION |
| C–K | 4.030 m | 68.30 kN | compression |
| K–O | 2.479 m | 49.73 kN | compression |
| K–A | 4.039 m | 66.77 kN | compression |
| O–A | 5.412 m | **33.52 kN** | TENSION |

**Right half** — O_R(10.408, 2.803), K_R(8.605, 1.844), B(10.258, −2.686), force at C =
(−17.01, +27.53). The right half is in overall tension, so every sign flips relative to the
left:

| element | length | force | sense |
|---|---|---|---|
| C–O | 5.624 m | 19.11 kN | compression |
| **C–K** | **4.719 m** | **49.56 kN** | **TENSION ← governs** |
| K–O | 2.042 m | **20.02 kN** | TENSION |
| K–B | 4.822 m | **48.20 kN** | TENSION |
| O–B | 5.491 m | 17.76 kN | compression |

Node-by-node residual < 1.3 × 10⁻⁹ kN; the reaction recovered at each support reproduces §3.2
to 4 decimals ✓.

> ### **The relevant tension force, task 2a) = N_d = 49.56 kN**
> the upper inner face of the **right** half, element C–K. Runner-up K–B = 48.20 kN in the
> same chain — an 18 mm bar carried straight through both is the natural detail.

**Robustness.** Re-running the whole chain for every plausible crown-hinge elevation
(inner apex 5.021 → top face 5.410) moves this number only between **49.54 and 49.61 kN**.
The answer does not depend on how you read the hinge circle.

Force-diagram size (Maxwell, both halves on one pole, 1 cm ≙ 10 kN): **6.29 × 6.10 cm**.
The area the sheet reserves is about 10.7 × 10.1 cm → **fits**.

### 3.4 Case b) — global equilibrium

G_d = 27.00 kN ↓ and Q_d = 27.00 kN → , both through C. Their **resultant is
(27.00, −27.00) kN = 38.18 kN at exactly −45.000°**, on a line through C.

The chord C→B runs at **−44.465°**. The load resultant is therefore parallel to C–B to within
half a degree, and its line already passes through C:

```
N_L = +0.3565 kN   (compression, left half)   →  ≈ 0
N_R = +38.1888 kN  (compression, right half)
```

* **A = 0.36 kN** at 44.465°, components (+0.254, +0.250) kN — **effectively zero**
* **B = 38.19 kN** at 135.535°, components (−27.25, +26.75) kN

**Check** ΣF = (0.254 + 27.000 − 27.254, 0.250 − 27.000 + 26.750) = (0, 0) ✓
**Check** ΣM about B: G_d gives (4.595 − 9.190)(−27.00) = +124.07; Q_d gives
−4.508 · 27.00 = −121.72; A gives (0 − 9.190)(0.250) = −2.30. Sum = +0.05 ≈ 0 kNm ✓

**This is the punch line of case b): the entire design load walks straight down the right
leg and the left support carries nothing.** In the idealised geometry (crown at exactly
half-span → 45° chords) A is exactly 0 and B is exactly 38.1838 kN. The exercise's numbers —
20 × 1.35 = 27 and 18 × 1.5 = 27 — were chosen to make this happen.

**Thrust line:** the single straight line C(4.595, 4.510) → B(9.190, 0.000), collinear with
the load resultant. The A–C branch carries 0.36 kN and is drawn only for completeness.

### 3.5 Case b) — internal force flow

The thrust line C–B leaves the material at **(4.836, 4.273)**, 0.338 m from the crown, and does
not come back until **(8.980, 0.204)**, 0.204 m above the base. Over **5.81 m of its 6.44 m
length** it is in the void. Redirection, same 5-element model, right half only (the left half repeats
it at 1 % of the magnitude):

O(9.340, 4.672), K(7.763, 3.201), B(9.190, 0), force at C = (+27.25, −26.75):

| element | length | force | sense |
|---|---|---|---|
| **C–O** | **4.748 m** | **34.64 kN** | **TENSION ← governs** |
| C–K | 3.428 m | 66.95 kN | compression |
| K–O | 2.157 m | 48.76 kN | compression |
| K–B | 3.505 m | 64.41 kN | compression |
| O–B | 4.674 m | **32.09 kN** | TENSION |

Left half (same topology, force at C = (−0.254, −0.250)): C–O +0.32, C–K −0.62, K–O −0.45,
K–A −0.60, O–A +0.30 kN. Negligible, but note it has the **opposite** pattern to the right
half — it is the mirror of the case a) left half.

Residual 5 × 10⁻¹⁴ kN; reaction recovered = (−27.254, +26.750) ✓ matches §3.4.

> ### **The relevant tension force, task 2b) = N_d = 34.64 kN**
> the top slab, element C–O of the **right** half. Runner-up O–B = 32.09 kN, the outer face
> of the right column. Together they are one continuous tie wrapping the outside of the
> loaded corner — which is exactly the reinforcement Task 4 is checking.

**Robustness.** Over the plausible crown-hinge range (4.351 → 4.672) this governing tension
runs **37.72 → 31.86 kN**, i.e. 34.6 ± 3 kN. Less robust than case a), so quote it as
**≈ 34.6 kN** and state the hinge assumption alongside it.

Force-diagram size: **6.19 × 5.88 cm** at 1 cm ≙ 10 kN → **fits** the reserved area.

### 3.6 Why "the relevant tension force" must mean the internal-flow tension

At the *thrust-line* (global equilibrium) level, case 2b) contains **no tension at all** —
both halves are in compression, one of them at 0.36 kN. Task 4 would then have nothing to
check. The phrase must therefore refer to the largest tension in the **internal force flow**,
i.e. the redirected strut-and-tie of §3.3/§3.5. The sheet's own numbers corroborate this:
2a)'s governing tension of 49.56 kN requires a 17 mm bar (§4), and Task 4 then hands the
student the next whole size, 18 mm. Under the alternative reading (32.36 kN, the tension in
the right chord of 2a) the required bar would be 14 mm and the 18 mm given in Task 4 would be
arbitrary.

---

## 4. Task 3 — dimension a round S235 bar for task 2a)

**f_sd** — the sheet calls it "the strength"; the compendium calls it **f_td**, the design
value of the allowable tensile stress. Source: compendium **2.6 Formulary**,
`f_td = f_tk / γ_M`, with S235 → f_tk = 235 N/mm² and γ_M = 1.05 from the *Materialkennwerte /
Steel* table. Worked identically in compendium 2.5.

```
f_td = f_tk / γ_M = 235 N/mm² / 1.05        = 223.8095 N/mm²

N_d  = 49.56 kN                              (§3.3, element C–K, right half)

A_req = N_d / f_td = 49 562 N / 223.8095     = 221.45 mm²

D = 2·√(A_req/π) = 2·√(221.45/π) = 2 × 8.3958 = 16.7916 mm
```

> ### **D_req = 16.79 mm → D = 17 mm** (rounded **up** to the whole millimetre)

Back-check: a 17 mm bar has A = π·8.5² = 226.98 mm², N_allow = 223.8095 × 226.98
= 50 800 N = **50.80 kN ≥ 49.56 kN** ✓ (utilisation 97.6 %). A 16 mm bar gives
201.06 mm² → 45.00 kN < 49.56 kN ✗, so 17 mm is genuinely the first size that works.

---

## 5. Task 4 — proof of an 18 mm S235 bar for task 2b)

Formula from compendium 2.6, *Tragsicherheitsnachweis*: `N_d ≤ N_allow = f_td · A_ef`.

```
A_ef    = (D/2)²·π = 9² · π                 = 254.4690 mm²
f_td                                         = 223.8095 N/mm²
N_allow = 223.8095 × 254.4690 = 56 953 N     = 56.95 kN

N_d     = 34.64 kN                           (§3.5, element C–O, right half)
```

> ### **N_allow = 56.95 kN,  utilisation = 34.64 / 56.95 = 60.8 %  →  PASS**

Margin 22.31 kN. The proof also holds for the runner-up element O–B (32.09 kN, 56.4 %), and
even for the *worst* value in the hinge-position sensitivity band (37.72 kN → 66.2 %).
Worth stating in the view: the same 18 mm bar would also pass task 2a)'s 49.56 kN at
**87.0 %**, which is why 18 mm is the size the sheet chose to hand over.

---

## 6. Page 3 — Creative "Art Gallery"

### 6.1 What the page actually supplies

Digitised from page 3 (all at 1:100), origin at the bottom-left corner of the dashed box:

| item | geometry |
|---|---|
| ground line | horizontal, full width, 23.963 m long |
| **dashed envelope** | rectangle, x 0.000 → **10.005 m**, y 0.000 → **5.126 m** |
| horizontal dimension | ticks at x = −0.177 and 9.820 → **9.997 m**, labelled "10.0 m", below the ground line |
| vertical dimension | ticks at y = 0.000 and 5.126 → **5.126 m**, labelled "5.0 m", to the right of the envelope |
| scenery | two framed pictures, a vase, three human silhouettes — decorative outlines inside the envelope, no structural meaning |
| captions | *form diagram 1:100* (mid-page), *force diagram 1cm ≙ 10kN* (page foot) |

**No frame, no supports, no load arrows, no span, no material are drawn.** The page is blank
apart from the envelope. Loads are given in the text at design level: **G_d = 40 kN vertical**,
**Q_d = 35 kN horizontal**; no characteristic values, so no γ.

Drawing area available for the force diagram on page 3: roughly **27.7 cm wide × 9.8 cm tall**
→ at 1 cm ≙ 10 kN the page can hold about **98 kN vertically**.

### 6.2 The constraint nobody states, and why part c) exists

With only **two** point loads, any *funicular* three-hinged frame is a polygon of at most
three straight segments, and the leeward segment is always a single straight line from the
crown hinge to B. For a 10 m × 5 m box to fit inside a symmetric funicular gable
A(0,0)–C(L/2,h)–B(L,0) you need `L·(1 − 5/h) ≥ 10`; the cheapest solution is around
**L = 20 m, h = 10 m**. Anything more compact than that has its thrust line outside the
material and works in bending — which, at the shallow member depths a compact portal has,
produces internal forces an order of magnitude above the applied loads. That is precisely
what part c) is warning about.

### 6.3 Proposal — the two-step answer the sheet is fishing for

**Design 1 (parts a + b): the intuitive compact portal.** Three-hinged, pins at A(0, 0) and
B(12, 0), 0.500 m members, outer outline (−0.25, 0)–(−0.25, 6.5)–(12.25, 6.5)–(12.25, 0),
inner soffit (0.25, 0)–(0.25, 5.0)–(6.0, 6.0)–(11.75, 5.0)–(11.75, 0), crown hinge
**C(6.000, 6.250)**. Clear interior 11.5 m × 5.0 m ✓. G_d = 40 kN on x = 6.000; Q_d = 35 kN
→ at the top of the windward column, y = 6.250 (through C).

*Global equilibrium* (both loads through C, so thrust line = A–C–B):

```
|AC| = 8.6639 m at 46.169°
N_L = 2.455 kN compression      A = 2.455 kN  = (+1.700, +1.771) kN
N_R = 52.994 kN compression     B = 52.99 kN  = (−36.700, +38.229) kN
check ΣF = (1.700 + 35.000 − 36.700, 1.771 − 40.000 + 38.229) = (0, 0) ✓
```

*Internal force flow*, right half, same 5-element model, O(12.25, 6.5), K(11.75, 5.0):

| element | force |
|---|---|
| C–O | **117.6 kN TENSION** |
| C–K | 157.8 kN compression |
| K–O | 419.5 kN compression |
| K–B | 432.0 kN compression |
| O–B | **393.6 kN TENSION** |

Sanity check by hand: at the knee the thrust line passes x = 7.200 at y = 5.000, i.e. 4.80 m
from the column centre; M = 38.23 × 4.80 = 183.5 kNm on a 0.500 m internal lever arm →
a 367 kN force couple. The truss gives 393/432 kN ✓ (same order, the difference is the
inclination of the members).

*Force diagram:* **15.4 × 43.2 cm**. A4 is 21.0 × 29.7 cm. **It does not fit — part c) is
triggered.**

**Design 2 (part c): the optimised, funicular gable.** Three-hinged, pins at **A(0, 0)** and
**B(20, 0)**, crown hinge **C(10, 10)**, two straight members. Both loads applied at the crown
hinge: G_d = 40 kN ↓ and Q_d = 35 kN →. Clear opening at 5.000 m height: x = 5.000 to
15.000 → **exactly 10.000 m wide × 5.000 m high** ✓ (the sheet says "at least").

```
|AC| = |BC| = 14.1421 m, both at 45°
N_L + N_R = G_d/sin45° = 56.5685      N_L − N_R = −Q_d/cos45° = −49.4975
N_L = 3.5355 kN compression           N_R = 53.0330 kN compression
A = 3.536 kN = (+2.500, +2.500) kN    B = 53.033 kN = (−37.500, +37.500) kN
check ΣF = (2.5 + 35.0 − 37.5, 2.5 − 40.0 + 37.5) = (0, 0) ✓
```

*Thrust line* = the frame axis A–C–B, so the frame is funicular: **no bending, no
redirection, no tension anywhere** — two struts and two reactions, five vectors in the whole
force diagram.

*Force diagram:* closed polygon G_d (4.00 cm) → Q_d (3.50 cm) → B (5.30 cm) → A (0.35 cm),
bounding box **3.75 × 4.00 cm**. **Fits with room to spare** — a factor of ~11 smaller than
design 1 in the critical dimension.

The teaching point to put on the slide: *the frame that hugs the room needs 432 kN inside it;
the frame that follows the loads needs 53 kN. Same loads, same brief.* If the 20 m span is
unacceptable, the middle path is to keep the 12 m portal and deepen the members — the couple
scales as 1/lever arm, so a 1.5 m deep haunch brings 432 kN down to ~145 kN (14.5 cm, still
marginal on A4).

---

## 7. Proposed step sequences (one view per task)

Convention for these views: teal ghost of the complete final force diagram at step 1
(project standing rule), tension red, compression blue, external green, reactions green.

### View EX8-2a — "Frame with a horizontal load" (9 steps)

1. Form diagram only: the frame outline (outer + inner polygon), both pins, the crown hinge.
   Teal ghost of the finished force diagram in the right-hand pane.
2. Q_k = 30 kN appears with its arrow; the factor box shows `Q_d = Q_k · γ_Q = 30 · 1.5 = 45 kN`,
   the arrow relabels to Q_d.
3. Hinge rule: dash the three hinge points, draw the highlight "all lines of action meet at
   the crown hinge"; the two chord lines A–C and C–B appear as dash-dot.
4. Force diagram: the 45 kN green vector is laid down, then closed by the two chord
   directions → A = 39.26 kN and B = 32.36 kN read off; both reaction arrows appear on the
   form diagram in green.
5. Thrust line A–C–B drawn solid; the two exit points (0.265, 0.261) and (5.688, 4.712) blink
   red — "the thrust line leaves the concrete here".
6. Left-half redirection: elements C–O, C–K, K–O, K–A, O–A appear one at a time, coloured as
   they are resolved; force diagram grows in step.
7. Right-half redirection: the same five, note the sign flip (inner faces now red).
8. All ten internal elements labelled with their magnitudes; the governing tension C–K
   (right) = 49.56 kN pulses.
9. Summary card: A, B, N_max,tension = 49.56 kN, N_max,compression = 68.30 kN, "→ Task 3".

**Live controls:** Q_k slider 0–60 kN; γ_Q toggle 1.0 / 1.5; crown-hinge elevation slider
5.02–5.41 m (shows the answer barely moving — this is the robustness demo); toggle
"thrust line only / full internal flow"; toggle element labels; toggle the teal ghost.

### View EX8-2b — "Frame with dead + wind load" (9 steps)

1. Form diagram, pins, crown hinge, teal ghost.
2. G_k = 20 kN and Q_k = 18 kN appear; factor box → G_d = 27 kN, Q_d = 27 kN.
3. The two load vectors are combined into their resultant **38.18 kN at −45°** through C —
   drawn as a long green dash-dot ray.
4. **The reveal:** the ray is overlaid on the chord C–B (−44.47°). They coincide. Caption:
   "the resultant already points at B → A = 0".
5. Force diagram: the closed triangle G_d + Q_d + B; A shown as a 0.36 kN stub.
6. Thrust line C–B drawn solid; its exit (4.836, 4.273) and re-entry (8.980, 0.204) marked.
7. Right-half redirection, five elements, one per beat.
8. Left half greyed and annotated "carries 0.4 kN — present for stability only".
9. Summary: governing tension C–O = 34.6 kN, governing compression C–K = 66.95 kN,
   "→ Task 4".

**Live controls:** G_k and Q_k sliders (0–40 kN each) — the killer interaction is watching A
go from compression through zero to tension as the resultant angle crosses the chord angle;
a readout of "resultant angle vs chord angle"; crown-hinge elevation slider 4.35–4.67 m
(shows the ±3 kN band on the answer); ghost toggle.

### View EX8-3 — "Dimensioning the tie" (7 steps)

1. Recap card: the 2a) form diagram shrunk, the governing element C–K highlighted red,
   N_d = 49.56 kN.
2. f_tk = 235 N/mm² pulled out of the S235 row of the formulary table (table rendered live).
3. γ_M = 1.05 pulled out of the same row; f_td = 223.81 N/mm² computed on screen.
4. A_req = N_d / f_td = 221.45 mm², drawn as a filled circle at true scale beside a ruler.
5. D = 2√(A/π) = 16.79 mm — the circle gets its diameter dimension.
6. Round **up** → 17 mm; the circle grows to 17 mm, A = 226.98 mm².
7. Back-check bar: N_allow(17) = 50.80 kN vs N_d = 49.56 kN → 97.6 %; and
   N_allow(16) = 45.00 kN → fails. Two bars side by side, one green, one red.

**Live controls:** steel grade selector S235 / S355 / S500 (drives f_tk); N_d slider
0–120 kN; γ_M shown but locked at 1.05 with a tooltip; a "round up / round down" toggle that
turns the check red when set to "down" — makes the sheet's parenthetical land.

### View EX8-4 — "Axial force proof" (6 steps)

1. Recap: 2b) form diagram, element C–O red, N_d = 34.64 kN.
2. The 18 mm bar section drawn at true scale; A_ef = 254.47 mm².
3. f_td = 223.81 N/mm² carried over from view 3.
4. N_allow = f_td · A_ef = 56.95 kN, drawn as a capacity bar.
5. N_d overlaid on the capacity bar → 60.8 % filled; verdict stamp **PASS**.
6. Comparison panel: the same 18 mm bar against 2a)'s 49.56 kN → 87.0 %, still passing;
   and against a hypothetical 60 kN → 105 %, failing. Shows where the size runs out.

**Live controls:** diameter slider 10–25 mm (utilisation bar and verdict update live, and
the minimum passing diameter is called out); N_d slider; steel-grade selector; a toggle
between "task 2b) value 34.64 kN" and "sensitivity band 31.9–37.7 kN" that shows the
utilisation as a range instead of a number.

### View EX8-C — "Art Gallery" (10 steps)

1. The page-3 givens: ground line, the dashed 10.0 × 5.0 envelope, the two load magnitudes
   as floating labels. Nothing else. Caption: "everything from here is your design".
2. Design 1 appears: the 12 m portal with 0.5 m members drawn over the envelope; the
   envelope turns green (constraint satisfied).
3. Loads placed: G_d = 40 kN at the crown, Q_d = 35 kN at the windward eaves, both through C.
4. Global equilibrium via the hinge rule → A = 2.46 kN, B = 52.99 kN; small force triangle.
5. Thrust line A–C–B drawn; the long stretch outside the concrete flashes red.
6. Redirection of the right half; the force diagram starts growing — and keeps growing.
7. The force diagram bounding box (15.4 × 43.2 cm) is drawn against an A4 outline. It
   overflows the page. **This is part c).**
8. Design 2 wipes in: the 20 m × 10 m funicular gable, envelope still green, both loads
   moved to the crown.
9. Its force diagram: five vectors, 3.75 × 4.00 cm, sitting comfortably inside the same A4
   outline. Side-by-side with step 7's overflow.
10. Summary card: 432 kN vs 53 kN, "the frame that follows the loads".

**Live controls:** span slider 10–24 m; crown-height slider; member-depth slider
0.3–2.0 m (drives the couple, and the force diagram visibly shrinks as the haunch deepens);
a "snap to funicular" button that morphs design 1 into the thrust-line shape; G_d and Q_d
sliders; an A4-outline toggle with a live "fits / does not fit" badge.

---

## 8. Errors and ambiguities in the sheet — stated plainly

1. **EN and DE disagree on the steel grade in Task 3.** English: *"Use steel S235"*.
   German (Aufgabe 3): *"Verwenden Sie Stahl S355"*. Same task, different material. With
   S355 (f_td = 338.10 N/mm²) the answer becomes A_req = 146.59 mm², D = 13.66 mm → **14 mm**
   instead of 17 mm. The English is the more likely intent, because Task 4 (identical in both
   languages) then supplies 18 mm, the next size up from 17.
2. **"round the result off to mm. (Round up!)"** contradicts itself in the English. Compendium
   2.5 settles it: *"The result is always rounded up."*
3. **"the round steel cable"** — the element being dimensioned is embedded reinforcement in
   concrete, not a cable. The wording is copied from the cable example in compendium 2.5 and
   is wrong in this context (both languages: *"des runden Stahlkabels"*).
4. **"The relevant tension force" is not defined and, on the thrust line alone, does not exist
   for 2b).** Case 2b) has no tension in its global equilibrium at all. The phrase has to mean
   the largest tension in the *internal force flow*, but the same sheet asks only for *"a
   possible internal force flow"* — so the number the student is being graded on is not
   unique. My model (compendium 8.1's own frame-corner topology, five elements per half,
   every line inside the concrete) gives 49.56 kN for 2a) and 34.64 kN for 2b); a different
   but equally legal strut-and-tie will give different numbers. **This is the single biggest
   ambiguity in the sheet and any view must say so out loud.**
5. **Page 2 carries no dimensions whatsoever** — no span, no height, no member depths. The
   only scale is the caption "form diagram 1:100". Unlike page 1, the drawn geometry is not on
   a round grid: 2b) spans 9.190 m with the crown 4.510 m up and 0.278 m columns; 2a) spans
   10.258 m horizontally with a 2.686 m level difference between the supports. Nothing rounds.
6. **Case 2a) has no gravity load.** A reinforced-concrete frame is analysed under a single
   horizontal live load and zero dead load, which is physically impossible for the material
   named. It is a pure statics exercise dressed as concrete.
7. **Case 2b)'s design loads are degenerate.** G_d = 27 kN and Q_d = 27 kN produce a resultant
   at exactly 45°, which is parallel to the frame's own 44.47° chord — so the left support
   carries 0.36 kN, i.e. nothing. Either this is a very elegant piece of exercise design or a
   coincidence; either way half the drawn structure plays no part in the answer, and a student
   who gets A = 0 will assume they have made a mistake.
8. **Page 3's vertical dimension is drawn wrong.** The line labelled "5.0 m" measures
   **5.126 m** at 1:100 (2.5 % oversize, 1.26 mm on paper). The "10.0 m" measures 9.997 m and
   is correct.
9. **The crown hinge circle in both page-2 frames straddles the top face**, so its centre is
   ambiguous by about ±0.06 m. Immaterial for 2a) (the governing tension moves 0.13 %), but
   worth ±3 kN on 2b)'s 34.6 kN.
10. **Hidden artwork.** `pdftotext` returns the labels "G_d" and "Q_d" **twice** for figure b),
    and a stray "Q d" inside the Task 2 body paragraph. Only one of each renders. Confirmed
    against a 300 dpi raster — this is the trap the `sheetvec.py` docstring warns about.
11. **The force-diagram scale caps the exercise.** At 1 cm ≙ 10 kN the reserved area on page 2
    is about 10.7 × 10.1 cm, i.e. ~100 kN. Task 2's own answers reach 68 kN, so they just fit;
    but any student who draws a compact portal for the Creative Task will need 43 cm and
    cannot finish on the sheet. Part c) is the escape hatch, and it is the only place the
    sheet acknowledges the problem.
12. **Page 3 specifies nothing else** — no span, no support type or position, no material, no
    member depth, no load positions. G_d and Q_d are given at design level with no
    characteristic values, so no partial factors apply there (worth stating explicitly in the
    view, because Tasks 2–4 have just drilled the opposite habit).
