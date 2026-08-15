# DECODE BRIEF — EX X "Additional Exercises", Structural Design I (HS 22)

Source files
- English task sheet:  `drawings/web/pdf/EXX-additional-exercises-sd-i-task-en.pdf`
- German task sheet:   `drawings/web/pdf/EXX-additional-exercises-sd-i-aufgabe-de.pdf`
- **English solution:  `drawings/web/pdf/EXX-additional-exercises-sd-i-solution-en.pdf`**
- **German solution:   `drawings/web/pdf/EXX-additional-exercises-sd-i-solution-de.pdf`**

**This is the only sheet in the project whose official solution is published.**
Every number in this brief was nevertheless derived independently first, and the
key was then read as a second opinion. That was the right order: the key
contains errors (see below). Where the two disagree, the disagreement is stated
here and in the view, with a reason.

All geometry comes from `drawings/web/tools/sheetvec.py` run on the vector
artwork of the PDF, never from a screenshot. Every claim was confirmed against a
real render (`pdftoppm -r 150 -f N -l N -png`), because these InDesign files
carry hidden duplicate artwork that `pdftotext` and the vector dump both return
and that never appears on the page.

---

## 0. STRUCTURE OF THE SHEET

**15 A3 pages. Page N is Task N — a clean 1:1 mapping, with no numbering trap.**
The German sheet numbers the same blocks Aufgabe 1 … 15 and agrees throughout.
(Contrast the SD II sheet, whose English task numbers are corrupt; see
`BRIEF_exX_sd2.md` §0.)

**17 numbered task blocks** (tasks 14 and 15 each split into `.1` and `.2`)
and **44 lettered sub-parts**. Nothing in the list below is skipped.

| # | page | task | title | sub-parts | view file |
|---|---|---|---|---|---|
| 1 | 1 | 1 | Cable with multiple loads | a, b | `exX1_1.js` |
| 2 | 2 | 2 | Material properties | a, b, c, d, e | `exX1_2.js` |
| 3 | 3 | 3 | Closing string | a, b, c | `exX1_3.js` |
| 4 | 4 | 4 | Funicular form (pole free) | a, b, c, d | `exX1_4.js` |
| 5 | 5 | 5 | Funicular form through a given point | a, b, c, d | `exX1_5.js` |
| 6 | 6 | 6 | Designing a suspended roof | a, b | `exX1_6.js` |
| 7 | 7 | 7 | Suspension bridge Sigriswil | a, b | `exX1_7.js` |
| 8 | 8 | 8 | Finding the thrust line using a trial funicular | a | `exX1_8.js` |
| 9 | 9 | 9 | Finding the thrust line | a, b | `exX1_9.js` |
| 10 | 10 | 10 | Laon Cathedral, France | a, b, c, d | `exX1_10.js` |
| 11 | 11 | 11 | Arch-cable structure with different support conditions | a, b, c, d | `exX1_11.js` |
| 12 | 12 | 12 | From arch-cable to truss | 4 unlettered situations | `exX1_12.js` |
| 13 | 13 | 13 | Bridge | a, b | `exX1_13.js` |
| 14 | 14 | 14.1 | Span and cantilever | a, b | `exX1_14.js` |
| 15 | 14 | 14.2 | Combination of two arch-cable structures | – | `exX1_14.js` |
| 16 | 15 | 15.1 | Cantilever of an arch-cable structure | – | `exX1_15.js` |
| 17 | 15 | 15.2 | Arch-cable structure (fourth force added) | – | `exX1_15.js` |

Sub-part count: 2 + 5 + 3 + 4 + 4 + 2 + 2 + 1 + 2 + 4 + 4 + 4 + 2 + 3 + 2 = **44**.

Four sub-parts are written answers rather than drawings — **2 d), 2 e), 3 c) and
13 b)**. The key prints all four in prose; each is carried in its view as a step
caption plus a RESULT line, and in three of the four the view also *shows* the
statement rather than only asserting it.

### Printed labelling faults in the task sheet (cosmetic, but they confuse)

- **Task 11** prints its first three cases as `a) a)`, `a) b)`, `a) c)` and the
  fourth as `d)`. There are four cases, lettered a)–d); the leading `a)` on the
  first three is a stray InDesign duplicate. The German sheet has the same fault.
- **Task 8** has only an `a)`; there is no b).
- Both sheets repeat their load-label text twice on most pages (hidden artwork),
  which is why `pdftotext` shows every load value two or three times.

---

## 1. ERRORS FOUND IN THE OFFICIAL KEY

The key is a *Lösungsvorschlag* — a proposal — and it is wrong in places. Two
errors were known before this decode; two more were found by it. Each is stated
inside the view that covers it, with both numbers and a reason.

**Substantive errors — the key is wrong:**

| task | the key prints / draws | correct | how it was caught |
|---|---|---|---|
| **1 a)** | `N_d max = 92.2 kN` | **91.20 kN** | three independent routes (joint I, joint II, force-diagram closure) all give 91.22–91.23 kN. A digit transposition: 92.2 would need member 2 drawn at 16.06°, and the sheet draws 16.355°. Both EN and DE solutions carry it, so it was typed once into a shared table. |
| **3 a)** | pole labels `o₁` and `o₂` | **swapped** | the pole 82.56 kN from the load line has the rays parallel to members 1 and 2, i.e. it belongs to structure **I**, and the key calls it `o₂`; the 43.98 kN pole is structure II's and is called `o₁`. Confirmed twice — by ray-to-member parallelism in the key's own drawing, and by the pole distances (82.56 / 43.98 / 90.17 for I / II / III, matching the printed ratio 1 : 0.535 : 1.096 only under the corrected labelling). The reaction labels A₁…B₃ in the same figure are correct. |
| **7 b)** | member numbers in the three node sketches | **the form- and force-diagram numbering (1, 2 = cable halves; 3, 6 = backstays; 4, 5 = pylons)** | the key's own form and force diagrams agree with each other and the node sketches contradict both: node I calls the cable halves 3 and 4; node II swaps 1 and 3 (the backstay goes down-left, the cable down-right) and calls the pylon 2 instead of 4; node III calls the main cable 4 instead of 2. Arrow *directions* are all correct — the numbers look like leftovers from an earlier figure. |
| **10 d)** | `g_3d = 8.5 kN/m` | **8.27 kN/m** | the key's own force diagram measures the `R_3` segment as 44.87 kN over `L_3 = 5.4243 m` → 8.271 kN/m, and its own drawn parabola (rise 2.359 m, H_3 = 12.89 kN) says the same. 8.5 is 2.8 % high — read off a drawing rather than derived. Its knock-on: G and H print as 108 and 155, where the exact construction gives **107.49** and **154.70**. |

**Roundings and silences — not errors, but worth knowing:**

| task | what | note |
|---|---|---|
| 2 c) | concrete `A_req = 903 mm²` | computed from the rounded `f_cd = 13.3`; the exact 20/1.5 = 13.333 gives exactly **900 mm²**. The key's own round-up rule would turn 903 into a = 31 mm, and it prints 30 — which is right, because the exact area gives a = 30.00 mm. |
| 6 b) | `A_req = 13'404.8 mm²` | divided by the rounded `f_td = 223.8`; 235/1.05 = 223.8095 gives **13'404.26 mm²**. 0.004 %, and `D = 131 mm` either way. |
| 6 a) | the force diagram | drawn ≈ 2.6 % oversize: at its own 1 cm ≙ 250 kN the load line reads 2499 kN where it should read 2437.5. Shape and answer are right. |
| 8 | pole labels `o` and `o′` | the key calls the **real** pole `o` and the **trial** pole `o′` — the reverse of the usual convention. Kept as printed so the view can be read against the sheet, but the view says which is which. |
| 8 | `R` | **119.30 kN, not 120.** The four loads are inclined, so the resultant is shorter than the sum of the magnitudes. The key's own load line measures 119.26 and agrees. |
| 10 c) | `F_1d` | asked for by the task and never printed. It is **64.44 kN**. |
| 11 | magnitudes of A and B | asked for by the task and never printed for any of the four cases. They are 26.887 / 19.309 / 17.500 / 17.500 kN. |
| 12, 13 a), 14, 15 | member forces | asked for or implied and never printed; the key draws only. All derived below. |
| 4, 13 a), 14 | "a POSSIBLE structure" | the pole is free — a one-parameter family. The key silently uses H = 72.00 kN in all four cases of task 4, and H = 50 kN in 13 a), without saying that these are choices rather than results. Each view says so and hands the reader the slider. |

Faults in the **task** sheet (as opposed to the key) are listed in §0 above and
in the individual task sections.

Further detail on all of the above is in each task's **Agreement / disagreement**
section below.

---

## 2. CONSTANTS USED THROUGHOUT

From the compendium (`drawings/web/pdf/compendium-structural-design-I-II-en.pdf`,
chapters 2.5 and 2.6):

| quantity | value |
|---|---|
| gamma_G (dead load) | 1.35 |
| gamma_Q (live load) | 1.50 |
| Steel S235 | f_tk = f_ck = 235 N/mm², gamma_M = 1.05 → **f_d = 223.81 N/mm²** |
| Timber, spruce | f_tk = 14 N/mm², f_ck = 20 N/mm², gamma_M = 1.7 → f_td = 8.24, f_cd = 11.76 N/mm² |
| Concrete C20/25 | f_ck = 20 N/mm², f_tk = 1.5 N/mm², gamma_M = 1.5 → f_cd = 13.33, f_td = 1.00 N/mm² |
| square solid section | A_req = a² → a = sqrt(A_req) |
| circular section | A = pi·D²/4 → D = sqrt(4A/pi) |

Force-diagram scales, page by page: 10 kN/cm (p.1, 8, 9, 10, 12, 13, 14),
20 kN/cm (p.3, 4), 5 kN/cm (p.11), 15 kN/cm (p.15), 200 kN/cm (p.7),
250 kN/cm (p.6). Form-diagram scales: 1:50 (p.1, 3), 1:100 (p.4, 10, 11, 12,
13, 14, 15), 1:250 (p.8, 9), 1:500 (p.6), 1:1500 (p.7), 1:100 cross-section (p.7).
Page 5 states no scale at all — it is a pure construction exercise with no
numbers (confirmed against the German sheet and both solutions).

---

## Task 1 — Cable with multiple loads (p. 1)

**Text (verbatim, English sheet).**
"Task 1  Cable with multiple loads
 a) Draw the corresponding subsystems and the force diagram for the given
    situation. Indicate the magnitude of the reaction forces and the maximum
    load in the table. Colour tensile forces red, compressive forces blue and
    external forces green.
 b) The cable can take a maximum load of N_d max = 70kN. With the help of the
    force diagram, find the resulting form of the cable and draw it in the
    existing form diagram."

**Givens.** Two INCLINED design point loads: F_2d = 90 kN at node II, F_1d = 44 kN
at node I. Two pin supports IV (left) and III (right), at the same height.
"form diagram 1:50", "force diagram 1cm ≙ 10kN". The answer table asks for
A [kN], B [kN], N_d max [kN]. No dimension is printed anywhere on the page.

**Geometry.** Origin = sheetvec's own shifted page origin for page 1 of the task
PDF (bottom-left of the artwork bounding box); only differences matter, so the
origin is arbitrary. Produced by

    $PY web/tools/sheetvec.py web/pdf/EXX-additional-exercises-sd-i-task-en.pdf 1 \
        --scale 50 --min 0.2 --cluster

| point | x [m] | y [m] | what |
|---|---|---|---|
| IV  |  4.555 | 14.922 | pin support, left |
| II  |  7.265 | 12.212 | node, carries F_2d |
| I   |  9.347 | 12.823 | node, carries F_1d |
| III | 11.446 | 14.922 | pin support, right |

Members and their printed angles, straight out of the dump:
1 = IV–II, **135.00°** (45° down to the right) · 2 = II–I, **16.35°** ·
3 = I–III, **45.00°**. Span IV–III = **6.891 m**; both supports at y = 14.922,
i.e. exactly level. The member lengths (3.832 / 2.170 / 2.968 m) are NOT round —
normal for a graphic-statics sheet, where only the angles are drawn to mean
something. The two 45° end members ARE round, and that is the sheet's design.

The two load arrows also come out of the dump, and their directions are the
whole trick of the task:
`(7.250, 12.165) -> (7.020, 11.451)` → F_2d at **252.18°**
`(9.378, 12.784) -> (9.847, 12.199)` → F_1d at **−51.25°**

so   F_2d = 90 × (−0.30603, −0.95202) = (−27.542, −85.682) kN
     F_1d = 44 × (+0.62592, −0.77989) = (+27.541, −34.315) kN.

**Derivation.**

*The resultant.* The two horizontal components cancel to 0.002 kN, so
**R = 120.00 kN, vertical**. The two lines of action intersect at
x = 8.00065, and the midspan of IV–III is x = 8.00050 — 0.15 mm apart at
1:50 scale. So R runs through midspan, which is why the two reactions are equal.
That is a designed coincidence, not luck: 90 and 44 kN at those two inclinations
were chosen to produce it.

*a) Reactions.* A cable can only pull along itself, so the reaction at each
support is directed along the end member. Both end members are at ±45°, hence
A = B = R / (2 cos 45°) = **84.853 kN ≈ 85 kN**. Members 1 and 3 therefore also
carry 84.853 kN.

*a) The middle member.* Node II: 84.853·u(II→IV) + F_2d + N_2·u(II→I) = 0.
The unbalanced vector is (87.543, 25.682), so **N_2 = 91.232 kN** — and its
direction is 16.35°, which is exactly the direction the sheet drew member 2 in.
That is the proof that the printed form really is the funicular of these loads.
Three independent routes agree:
  joint II, x-equation → 91.234 · joint II, y-equation → 91.203 ·
  |unbalanced vector| → 91.232.
Closing at joint I gives member 3 back as 84.856 kN, 0.004 % off 84.853.
All three members are in TENSION (it is a cable), and
**N_d max = N_2 = 91.2 kN**, in the middle member.

*b) The deeper form.* Keep the supports, the two load magnitudes and the two
lines of action; let the cable sag deeper. Parametrise by **h**, the depth below
the support chord (y = 14.922) of the point Q where the two reaction lines meet
on R's line of action (x = 8.00065). Then

  A = B = 60 · √(1 + (3.4456/h)²)         [3.4456 m = half the span 6.891 m]
  node II' = (line IV→Q) ∩ (F_2d's line of action)
  node I'  = (line III→Q) ∩ (F_1d's line of action)
  N_2 from joint equilibrium at II'.

The printed form is h = 3.4456 m (which is what makes the end members 45°).
Requiring max N = 70 kN gives **h = 5.7339 m**, and then

| h [m] | member 1 | member 2 | member 3 |
|---|---|---|---|
| 3.4456 (as printed) | 84.85 | **91.23** | 84.85 |
| 5.2195 (crossover)  | 71.89 | **71.89** | 71.89 |
| 5.7339 (the answer) | **70.00** | 68.59 | **70.00** |

node II' = (6.888, 11.040), node I' = (9.826, 12.226), A = B = **70.00 kN**.

**The migration of the maximum is the point of 1b.** At the printed depth the
middle member is the largest; deepen the cable and the end members overtake it.
They cross at **h = 5.2195 m**, where all three members carry the same
71.89 kN. Above a capacity of 71.89 kN the MIDDLE member sizes the cable; below
it — and the sheet's 70 kN is below it — the two END members do. So the answer
to b) is set by A = B = 70 kN, and the middle member is left slack at 68.59 kN.
max N is strictly decreasing in h, so the required depth is unique and can be
bisected for any capacity; the floor is 60 kN, approached only as h → ∞
(A = B = 60·√(1+(3.4456/h)²) → 60, half the 120 kN resultant).

Second reading of the same fact, in the force diagram: the two poles (printed
form and deep form) both lie on the HORIZONTAL line 60 kN below the top of the
load line. That horizontal is the closing line of a structure whose supports are
level, and the 60 kN is the simple-beam reaction A_v = B_v = R/2. Task 3 is the
same theorem, stated on purpose.

**Official key says.** The printed table is **A = 85, B = 85, N_d max = 92.2**.
The form diagram of the solution draws the b) answer as a pale-red deeper cable
1'–2'–3' below the printed one, and the force diagram labels N_d max on the ray
of member 2. The German solution sheet prints the same 92.2.

**Agreement / disagreement.**
- A and B: **agree**. 84.853 → 85 kN, as printed.
- N_d max: **DISAGREE**. Mine is **91.23 kN → 91.2**; the key prints **92.2**.
  91.2 is right and 92.2 is a digit-transposition typo: it is reproduced three
  ways above from the sheet's own digitised geometry, and 92.2 is not consistent
  with the drawn 16.35° direction of member 2 (92.2 would need 16.06° with the
  same 45° ends, i.e. a different drawing). Both the EN and the DE solution
  carry the same 92.2, so it was typed once into a shared table.
- b): the key prints no numbers for b) at all, only the drawn form. My h =
  5.7339 m form matches the pale-red cable the key draws (node II' below and
  left of II, node I' below and right of I).

**Interactive view (`exX1_1.js`, view id `X1_1`).**
Steps: 1 the given cable · 2 the two inclined loads and why R comes out vertical
through midspan · 3 a) the ±45° ends give A = B = 84.85 kN · 4 a) joint II
closes and gives 91.23 kN, with the 92.2 disagreement stated on screen ·
5 b) the same load, a deeper form · 6 b) the 70 kN answer at h = 5.734 m ·
7 the crossover at h = 5.2195 m where the maximum changes member.
Controls: **`Ncap`** — the cable's capacity, default the sheet's 70 kN, with
`solve` on the view puts the cable at the depth that exactly uses it; **`h`** —
the sag depth, free when `solve` is off; **`lam`** — a scale factor on both
loads together (keeps every direction, hence keeps the printed form a valid
funicular); `orig` / `lbl` toggles.
RESULT lines: a) A = B and N_d max with the key's 92.2 named as wrong;
b) the depth h, the three member forces, and which member is the maximum.

---

## Task 2 — Material properties (p. 2)

**Text (verbatim, English sheet).**
"Task 2  Material properties
 To get a feel for how different materials behave under tension and compression
 forces, we compare wood (spruce), steel (S235) and concrete (C20/25) in the
 following.
 a) Complete the table with values from the formula and your own calculations.
 b) Given is a tension load of N_d = 12kN. Calculate the required cross-sectional
    area A_req for the three materials. The cross-sectional area corresponds to a
    square solid profile. Calculate the side length a of the profile for each of
    the three materials and compare them. (Areq = a2 )
 c) Repeat b) but now with a compression load of N_d = 12kN.
 d) What do you notice when comparing the different cross-sections?
 e) Which material behaves the most brittle and which the most ductile when
    subjected to a tensile load? Consult the stress-strain diagrams in the
    lecture on “Material and Dimensioning”."

**Givens.** Three materials — Timber (Spruce), Steel (S235), Concrete (C20/25).
An empty 3 × 5 table with rows γ_M, f_tk, f_td, f_ck, f_cd. N_d = 12 kN in both
b) and c). Square solid section, A_req = a².

**Geometry.** None. This task is arithmetic, not drawing; the only geometry in
the view is invented (the three squares drawn to a common scale, and the
schematic σ–ε curves). Nothing was digitised from the page.

**Derivation.**

*a) — the characteristic values are LOOKED UP, not computed.* All of them come
from the compendium's formulary, chapter **2.6 "Materialkennwerte / Material
properties"** (`drawings/web/pdf/compendium-structural-design-I-II-en.pdf`,
verified by `pdftotext -layout`):

| | γ_M | f_tk | f_ck | γ_k |
|---|---|---|---|---|
| Timber, Fichte / Spruce | 1.7 (all timber) | 14 N/mm² | 20 N/mm² | 4.5 kN/m³ |
| Steel, S 235 | 1.05 (all steel) | 235 N/mm² | 235 N/mm² | 80.0 kN/m³ |
| Concrete, C20/25 | 1.5 (all concrete) | 1.5 N/mm² *(unreinforced)* | 20 N/mm² | 25 kN/m³ |

Note the two things worth checking and which both survive the check:
**steel's f_ck really is 235** (steel is symmetric — the formulary prints 235
in both columns), and **spruce's f_ck really is 20** in THIS compendium (SIA 265
grade C24 would say 21; the compendium rounds it to 20, and the compendium is
what the sheet is marked against).

Design values, compendium 2.5: f_d = f_k / γ_M.

| | f_td = f_tk/γ_M | f_cd = f_ck/γ_M |
|---|---|---|
| Spruce   | 14 / 1.7 = **8.235** → 8.2 | 20 / 1.7 = **11.765** → 11.8 |
| S235     | 235 / 1.05 = **223.810** → 223.8 | 235 / 1.05 = **223.810** → 223.8 |
| C20/25   | 1.5 / 1.5 = **1.000** | 20 / 1.5 = **13.333** → 13.3 |

*b) tension, N_d = 12 kN = 12 000 N.* A_req = N_d / f_td, a = √A_req, and the
compendium (2.5, the cable-diameter example) is explicit that the result is
**always rounded UP**: "rounding off would result in a diameter smaller than the
minimum requirement."

| | f_td | A_req exact [mm²] | a exact [mm] | a rounded up |
|---|---|---|---|---|
| Spruce | 8.235 | 1457.1 | 38.17 | **39** |
| S235   | 223.810 | 53.6 | 7.32 | **8** |
| C20/25 | 1.000 | 12000.0 | 109.54 | **110** |

*c) compression, N_d = 12 kN.* A_req = N_d / f_cd:

| | f_cd | A_req exact [mm²] | a exact [mm] | a rounded up |
|---|---|---|---|---|
| Spruce | 11.765 | 1020.0 | 31.94 | **32** |
| S235   | 223.810 | 53.6 | 7.32 | **8** |
| C20/25 | 13.333 | 900.0 | 30.00 | **30** |

*d) What you notice.* Concrete in tension needs **12 000 mm²** where steel needs
**54 mm²** — a factor of **224 in area, 13.7 in side length** (110 mm vs 8 mm).
The same concrete in compression needs **900 mm²**, 13.3× less than in tension:
concrete's tensile strength is 1/13.3 of its compressive strength, and the whole
of reinforced concrete follows from that one ratio — put steel where the tension
is and concrete where the compression is. Steel is the only one of the three
that is indifferent (f_td = f_cd = 223.81 N/mm², so the same 8 mm square either
way). Timber sits in the middle, and is the only one that is STRONGER in
compression than in tension (11.765 vs 8.235 N/mm²) once γ_M has been applied —
because γ_M = 1.7 is applied to both, that ordering is already in the
characteristic values (20 vs 14).

*e) Brittle vs ductile.* **Concrete is the most brittle and steel the most
ductile**; timber is between them and much closer to concrete. Order of
magnitude of the failure strain in tension (schematic, from the lecture
"Material and Dimensioning" — the compendium itself carries no σ–ε data):
concrete ≈ 0.1 ‰, timber ≈ 1.4 ‰, steel yields at 1.12 ‰ (= 235/210000) and
then runs on a plastic plateau to 20 ‰ and beyond before it breaks. Concrete
gives no warning at all; steel deforms visibly first, which is what "ductile"
buys you.

**Official key says.** The solution prints the completed table exactly as
derived above (1.7 / 14 / 8.2 / 20 / 11.8 · 1.05 / 235 / 223.8 / 235 / 223.8 ·
1.5 / 1.5 / 1 / 20 / 13.3), and the b) and c) blocks in full:
b) wood 1'464 mm² → 39 mm · steel 54 mm² → 8 mm · concrete 12'000 mm² → 110 mm;
c) wood 1'017 mm² → 32 mm · steel 54 mm² → 8 mm · concrete 903 mm² → 30 mm.
d) "Concrete requires the largest cross-section for the same tensile load … a
combination of both materials, so-called reinforced concrete, is often used."
e) "Concrete is very brittle … Steel has a long plastic phase … steel is
therefore a ductile material."

**Agreement / disagreement.**
- Table a): **every one of the fifteen cells agrees** with the compendium and
  with my own arithmetic. Nothing is wrong here — including the two cells the
  brief flagged as suspicious (steel f_ck = 235 ✓, spruce f_ck = 20 ✓).
- b) and c): agree to the printed precision, with two small roundings noted, not
  disputed:
  1. The key's areas are computed from the ROUNDED design strengths, so wood
     tension reads 1'464 mm² where the exact 14/1.7 gives 1457.1 mm², and
     concrete compression reads 903 mm² where the exact 20/1.5 gives exactly
     900 mm². Immaterial (both round up to the same side length).
  2. That second one leaves the key internally inconsistent by a hair: from its
     own 903 mm², a = 30.05 mm, which its own round-up rule would make **31**;
     it prints **30**. With the exact f_cd = 13.333 N/mm² the area is exactly
     900 mm² and a is exactly 30.00 mm, so **30 is the right answer** and the
     903 is what should have read 900. The view computes from the exact
     strengths and shows both numbers.
- d) and e): agree. The view adds the two quantitative hooks the key leaves
  implicit — the 224× area ratio, and concrete's own 13.3× tension/compression
  ratio.

**Interactive view (`exX1_2.js`, view id `X1_2`).**
Steps: 1 the three materials and where the numbers come from · 2 a) γ_M ·
3 a) the characteristic strengths · 4 a) f_d = f_k/γ_M, table complete ·
5 b) tension: A = N/f_td, the three squares drawn to a common scale ·
6 c) compression: the same three squares recomputed · 7 d) what you notice ·
8 e) the three schematic σ–ε curves, brittle to ductile.
The table is drawn as a real table (rules + cells) and the answers appear in it
row by row. The three square cross-sections stand on one baseline at one scale,
so the 110 mm concrete square against the 8 mm steel square is the picture.
Controls: **`Nd`** 2–40 kN (the sheet's 12 kN is the default) · **`mode`**
tension / compression / both · **`mat`** highlight one material or all ·
`exact` (compute from f_k/γ_M or from the key's rounded f_d) · `lbl`.
RESULT lines: the completed a) row for f_td / f_cd, the b) and c) answers with
side lengths, the 224× headline for d), and the brittle→ductile order for e).

---

## Task 3 — Closing string (p. 3)

**Text (verbatim, English sheet).**
"Task 3  Closing string
 a) The first situation shows three structures with different statical depth.
    Draw the corresponding force diagram for the three structures. Complete the
    form and force diagram with the closing string and find the intersection
    point i and the respective pole o. Colour tensile forces red, compression
    forces blue and external forces green.
 b) In the second situation, support B changes and with it the closing string.
    Proceed in the same way as in a).
 c) What do you find when comparing the different structural systems with regard
    to the closing string, the intersection point i and the pole o?"

**Givens.** One vertical point load **F_1 = 120 kN** in both situations.
"form diagram 1:50", "force diagram 1cm ≙ 20kN". Situation a) has one pin
support A and one support B, with three two-bar structures spanning between
them through three different nodes C₁ (= I), C₂ (= II), C₃ (= III) — all three
on the load's line of action. Situation b) keeps A and the node C but moves
support B to three different heights B₁, B₂, B₃ on one vertical.

**Geometry.** Origin = sheetvec's own shifted page origin for page 3 of the task
PDF. Produced by

    $PY web/tools/sheetvec.py web/pdf/EXX-additional-exercises-sd-i-task-en.pdf 3 \
        --scale 50 --min 0.15 --cluster

*Situation a)* (upper diagram):

| point | x [m] | y [m] | what |
|---|---|---|---|
| A  | 2.962 | 12.656 | pin support, left |
| B  | 5.961 | 13.406 | support, right (0.750 m higher) |
| C₁ | 5.340 | 12.535 | node of structure **I** (members 2 and 1) |
| C₂ | 5.340 | 11.907 | node of structure **II** (members 4 and 3) |
| C₃ | 5.340 | 13.906 | node of structure **III** (members 6 and 5) |

*Situation b)* (lower diagram):

| point | x [m] | y [m] | what |
|---|---|---|---|
| A  | 2.954 | 5.795 | support, left |
| C  | 4.453 | 4.557 | the ONE node, shared by all three structures |
| B₁ | 5.953 | 6.580 | structure **I**  (member 1 + member 2) |
| B₂ | 5.953 | 5.045 | structure **II** (member 1 + member 3) |
| B₃ | 5.953 | 4.260 | structure **III** (member 1 + member 4) |

Two things come out round and validate the 1:50 scale: **the span A–B is 2.999 m
in BOTH situations** (drawn as 3.00 m), and in b) **the load sits at 1.499 m,
exactly midspan**, which is why b)'s two reactions come out 60.02 / 59.98 kN.
Nothing else is round: in a) the load stands 2.378 m from A and 0.621 m from B,
and the three depths (0.716 / 1.344 m below and 0.655 m above the chord) are
free-hand numbers. Member 1 of situation b) is drawn three times at ±0.035 m
offset so all three structures can be seen; it is one member.

**Derivation.** Each structure is three forces on one node C: the load and two
bar forces, with the bar directions given. Solve
`N_A·u(C→A) + N_B·u(C→B) + F = 0` — a 2×2, no statics needed beyond that. The
sign of N is the answer to "red or blue".

The bookkeeping that the task is really about:
- **closing line s** = the chord joining the two supports, A–B.
- **statical depth d** = the vertical distance from s down to C, measured on the
  load's line of action.
- **A_v** = the simple-beam reaction = F·(x_B − x_F)/(x_B − x_A), and
  **M = A_v·(x_F − x_A)** the simple-beam moment under the load.
- **H = M / d** is the horizontal thrust, and it is the horizontal distance from
  the pole o to the load line in the force diagram.
- **i** is the point on the load line at A_v below the top, and it is where the
  ray parallel to the closing line leaves the pole. Decompose either reaction at
  its own support into a part along s (which has no moment about the other
  support) and a part along the load line: the moment equation then gives
  |top→i| = A_v exactly. **So i depends only on the load and on the two
  supports' HORIZONTAL positions — nothing else.**

*Situation a).* x_A = 2.962, x_F = 5.340, x_B = 5.961 →
**A_v = 24.848 kN, B_v = 95.152 kN, M = 59.089 kNm**. Closing line s = A–B, the
same for all three structures; it crosses the load line at y = 13.2507.

| structure | node | depth d [m] | N (A–C) | N (C–B) | H = M/d |
|---|---|---|---|---|---|
| **I**   | C₁ | +0.7157 (sag)  | **82.67** tension | **142.22** tension | 82.56 |
| **II**  | C₂ | +1.3437 (sag)  | **46.11** tension | **114.90** tension | 43.98 |
| **III** | C₃ | −0.6553 (rise) | **101.87** compression | **115.77** compression | 90.17 |

Each H checks against M/d to five figures. Poles: I and II sit to the RIGHT of
the load line at 82.56 and 43.98 kN, III to the LEFT at 90.17 kN (the arch, so
the pole flips sides). **All three lie on the one line through i parallel to
A–B**, because the closing line is the same for all three.

*Situation b).* x_A = 2.954, x_F = 4.453, x_B = 5.953 →
**A_v = 60.02 kN, B_v = 59.98 kN, M = 89.970 kNm** — the same for all three,
because only B's HEIGHT changed. Three different closing lines A–B₁, A–B₂, A–B₃:

| structure | support | s at the load | depth d [m] | N (member 1, A–C) | N (member to B) | H = M/d |
|---|---|---|---|---|---|---|
| **I**   | B₁ | 6.1874 | 1.6304 | **71.57** tension | **92.65** tension (2) | 55.18 |
| **II**  | B₂ | 5.4201 | 0.8631 | **135.19** tension | **109.62** tension (3) | 104.24 |
| **III** | B₃ | 5.0278 | 0.4708 | **247.87** tension | **194.83** tension (4) | 191.12 |

Everything is tension; nothing is blue in b). Because member 1 is shared, the
three A-reactions are parallel, so **all three poles lie on one line through the
TOP of the load line, in member 1's direction** — and the three closing-line
rays all pass through **the same i**, the midpoint of the load line (60 / 60).

*So c) is one theorem said twice.* i is fixed by the load and the horizontal
support positions; the pole always lies on the line through i parallel to that
structure's closing line. In a) the closing line never changes, so all the poles
land on one line. In b) the closing line changes every time, so the poles
scatter — but every closing line still goes through the same i.

**Official key says.**
a) the three force triangles, with the three poles marked **o₁, o₂, o₃**, a
dashed line through them and through i, and the members coloured (5, 6 blue;
1, 2, 3, 4 red). b) the three force triangles, poles o₁, o₂, o₃ marching away
from the top of the load line, i marked on the load line, three dashed closing
lines through it.
c) verbatim: *"Situation b) shows that as long as the load remains the same, all
closing lines intersect at point i on the load line. Situation a) shows that all
poles o come to lie on the respective closing line."*

**Agreement / disagreement.**
- Every force agrees. Measuring the printed force diagram of a) against its own
  "1 cm ≙ 20 kN" scale reproduces A₁ = 82, B₁ = 142, A₃ = 101, B₃ = 116 kN
  against my 82.67 / 142.22 / 101.87 / 115.77 — pixel accuracy, i.e. agreement.
  The three pole distances measured off the printed drawing are in the ratio
  1 : 0.535 : 1.096, and M/d predicts 1 : 0.533 : 1.092.
- **DISAGREE on the pole labels in 3a): o₁ and o₂ are swapped.** The pole at
  82.56 kN from the load line is the pole of structure **I** — its two rays are
  the ones drawn parallel to members 1 and 2 — and the key labels it **o₂**. The
  pole at 43.98 kN is structure **II**'s (rays parallel to members 3 and 4) and
  the key labels it **o₁**. Confirmed twice: by the ray-to-member parallelism in
  the printed drawing, and by the pole distances, which come out
  82.56 / 43.98 / 90.17 for I / II / III and match the printed 1 : 0.535 : 1.096
  only under my labelling. The reaction labels A₁, A₂, A₃ and B₁, B₂, B₃ in the
  same drawing are CORRECT — only the two pole labels are transposed. The view
  labels them correctly and says so on screen.
- c): agree with the key's sentence, and the view adds the reason (i = the
  simple-beam reaction split, which cannot see B's height).

**Interactive view (`exX1_3.js`, view id `X1_3`).**
Steps: 1 the two situations · 2 a) three depths, one span · 3 a) the closing
line and where i has to be · 4 a) the three force triangles and the three poles,
with the o₁/o₂ swap called out · 5 the slider: walk the depth continuously and
watch the pole slide along the closing line while i does not move · 6 b) B
moves, the closing line rotates · 7 b) the poles scatter but every closing line
still cuts the load line at the same i · 8 c) the answer.
Controls: **`sit`** a) / b) · **`yC`** the statical depth in a), continuous from
a high arch to a deep cable · **`yB`** the height of support B in b) ·
**`F`** the load, 40–200 kN · `sheet` (show the sheet's three structures behind
the live one) · `lbl`.
The live structure is drawn on top of the sheet's three, and its pole is a
disk that slides — in a) along the fixed dashed closing line through i, in b)
along the fixed line through the top of the load line, with its own closing
line pivoting about i. `dw.link` pairs every member with its ray, so
`parallel.py --live` checks the whole family, in both situations.
RESULT lines: the three a) structures with depth / force / thrust, the three b)
ones, the position of i, and c) in one sentence.

---

## Task 4 — Funicular form (p. 4)

**Text (verbatim, English sheet).** "Task 4 · Funicular form — Design the form of a
possible funicular cable for the cases a) to d) using the force diagram. Draw the
tension forces in red, compression forces in blue and reaction forces in green."

Sub-parts are unlettered beyond a)–d); each is the same span carrying the same
total load, split a different number of ways:

- a) `F₁ = 120 kN`
- b) `F₁ = 60 kN`, `F₂ = 60 kN`
- c) `F₁ = 40 kN`, `F₂ = 40 kN`, `F₃ = 40 kN`
- d) `g = 20 kN/m`

German (`aufgabe-de.pdf` p. 5 → task 4): "Aufgabe 4 Seilform — Entwerfen Sie für die
Fälle a) bis d) mit Hilfe des Kräfteplans eine mögliche Seilform. Zeichnen Sie
Zugkräfte rot, Druckkräfte blau und Auflagerkräfte grün." Same content; **"eine
mögliche"** ("a possible") is the operative word — the pole is free.

**Givens.** Printed scales, from the page footer: **form diagram 1:100**, **force
diagram 1 cm ≙ 20 kN**. Both supports are pinned and at the same level. The four
load cases all total **120 kN** — that is the whole design of the page.

**Geometry.** Origin = support A, x to the right, y **downwards positive** (the
cable sags). Digitised with

```
$PY web/tools/sheetvec.py web/pdf/EXX-additional-exercises-sd-i-task-en.pdf 4 \
      --scale 100 --min 0.2 --cluster
```

sheetvec's own shifted page origin, panel a) (all four panels are identical in x):

| point | x [m] | y [m] | note |
|---|---|---|---|
| A (pin, left)  |  6.679 | 25.740 | apex of the support triangle |
| B (pin, right) | 12.677 | 25.740 | same level as A |

so **l = 5.998 m → 6.00 m**, and the 1:100 is honoured to 0.03 %.

Load axes (the dash-dot verticals; same file):

| case | load axes [m], sheet coords | → from A [m] | division |
|---|---|---|---|
| a | 9.678 | 3.000 | l/2 |
| b | 8.679, 10.678 | 2.000, 3.999 | l/3, 2l/3 |
| c | 8.179, 9.678, 11.178 | 1.500, 2.999, 4.499 | l/4, l/2, 3l/4 |
| d | block 6.679 → 12.677 | 0 → 5.998 | the whole span |

Everything comes out round, which validates the scale. Note the family: **n equal
loads of 120/n kN at the (n+1)-division points**, n = 1, 2, 3 … and d) is n → ∞.
The UDL check closes it: `g·l = 20 × 6.00 = 120 kN` ✓, the same total as a)–c).

**Derivation.** Both supports are level and every case is symmetric, so in all four

```
A_v = B_v = 120 / 2 = 60.00 kN
```

The pole is **free**: "a possible funicular" is a one-parameter family, the parameter
being the horizontal thrust H (the pole distance in the force diagram). For a level
chord the funicular ordinate under load i is the simple-beam moment divided by the
thrust,

```
y(x) = M(x) / H
```

Simple-beam moments (span 6.00 m, total 120 kN):

| case | M(x) at the load points [kNm] | M_max |
|---|---|---|
| a | M(3.0) = 180.0 | 180.0 |
| b | M(2.0) = M(4.0) = 120.0 | 120.0 |
| c | M(1.5) = M(4.5) = 90.0 · M(3.0) = 120.0 | 120.0 |
| d | M(x) = 10·x·(6−x) → M(3.0) = 90.0 | 90.0 |

At the pole the key actually drew — **H = 72.00 kN** (see below) — the forms are

| case | node depths below the chord [m] | sag f = M_max/H |
|---|---|---|
| a | 2.5000 | **2.5000** |
| b | 1.6667, 1.6667 (member 2 exactly horizontal) | **1.6667** |
| c | 1.2500, 1.6667, 1.2500 | **1.6667** |
| d | parabola y = 10x(6−x)/72 | **1.2500** |

Cable forces (`N = √(H² + V²)`, V the panel shear; the cable is entirely in TENSION):

| case | segment forces [kN] |
|---|---|
| a | 93.723, 93.723 |
| b | 93.723, **72.000** (horizontal), 93.723 |
| c | 93.723, 74.726, 74.726, 93.723 |
| d | 93.723 at the supports, falling smoothly to 72.000 at the crown |

**The result that unifies the page:** at one and the same pole every case has
`A_v = B_v = 60 kN`, the same end-tangent slope `60/72 = 0.8333` (**39.806°**) and
therefore the same maximum cable force **93.723 kN**. Only the interior changes.
Reactions: `A = B = 93.723 kN` inclined at 39.806° above the horizontal, outwards.

**The convergence, which is the teaching point of a)→d).** With n equal loads of
120/n kN at the (n+1)-division points, at fixed H the deepest ordinate is

```
n =  1   M_max = 180.0   f = 2.5000 m
n =  2           120.0       1.6667
n =  3           120.0       1.6667
n =  4           108.0       1.5000
n =  8            97.5       1.3542
n = 16            93.5       1.2988
n → ∞  g·l²/8 =   90.0       1.2500   (case d, the parabola)
```

so the polygon flattens monotonically onto the parabola of d) — `M_max` falls from
`Fl/4` to `gl²/8`, a factor of exactly 2 between a) and d).

**Official key says.** (`solution-en.pdf` p. 4, `solution-de.pdf` p. 4.) The key
prints no numbers at all for task 4 — it draws the answer. Digitised from the
solution page with the same command:

| case | drawn form, sheet coords [m] | drawn depths [m] |
|---|---|---|
| a | A(6.512, 30.066) · I(9.511, 27.567) · B(12.510, 30.066) | 2.499 |
| b | A(6.512, 21.569) · I(8.512, 19.903) · II(10.511, 19.903) · B(12.510, 21.569) | 1.666, 1.666 |
| c | A(6.512, 13.073) · I(8.012, 11.823) · II(9.511, 11.407) · III(11.011, 11.823) · B(12.510, 13.073) | 1.250, 1.666, 1.250 |
| d | parabola, support level y = 4.576 | crown 1.251 (pixel-measured at 200 dpi, see below) |

and the force diagrams, all four in the right-hand column, all with the pole to the
**right** of the load line:

| case | load line length | pole offset | → H |
|---|---|---|---|
| a | 5.998 cm ≙ 119.96 kN | 3.599 cm | **71.98 kN** |
| b | 2×2.999 cm ≙ 119.96 kN | 3.598 cm | **71.96 kN** |
| c | 3×1.999 cm ≙ 119.94 kN | 3.598 cm | **71.96 kN** |
| d | 5.998 cm ≙ 119.96 kN | 3.598 cm | **71.96 kN** |

Member/ray angles in the key: 39.80° for every end segment (all four cases), 0.00°
for b)'s member 2, 15.52°/164.48° for c)'s members 2 and 3.

Case d)'s parabola is drawn as Béziers, which `sheetvec` reduces to endpoints, so it
was measured off a 200 dpi render instead: the black dashed support line sits at
y = 2667.5 px and the black dashed crown line at y = 2766 px, 98.5 px apart at
78.74 px/m → **f = 1.251 m**. The red curve sampled column-by-column over the middle
third gives 1.238 / 1.245 / 1.219 m against the predicted 1.237 / 1.249 / 1.237 m.

**Agreement / disagreement.** **Full agreement — no error found in the key for
task 4.**

- span, load positions, symmetry: agree exactly;
- the key's chosen pole is `H = 71.96–71.98 kN` in all four force diagrams, i.e.
  **H = 72.00 kN** to within 0.06 % — one and the same pole for all four cases,
  which is clearly deliberate and is what makes them comparable;
- at that pole the node depths predicted here (2.5000 / 1.6667 / 1.2500 & 1.6667 /
  1.2500) reproduce the drawn depths (2.499 / 1.666 / 1.250 & 1.666 / 1.251) to
  **three decimals**;
- the drawn member angles (39.80°, 0.00°, 15.52°) reproduce the computed ones
  (39.806°, 0.000°, 15.524°) to **0.01°**.

One thing the key leaves implicit and the view says out loud: because "a possible"
funicular means the pole is free, **72 kN is a choice, not an answer**. Any H gives a
valid funicular; the key simply used the same one four times.

**Interactive view.** `exX1_4.js` (view id `X1_4`), 9 steps.

- Steps: the exercise → the span and the case's loads → the resultant and the
  reactions → the load line → **the pole is free** (drag it) → the rays → the
  funicular form → the member forces and the maximum → the convergence a)→d) → the
  four sags side by side.
- Controls: `cas` a)/b)/c)/d); `H` the pole distance 40–150 kN, default 72 kN
  ("← the pole the key drew"); `W` the total load 60–200 kN, default 120 kN; `nx`
  the number of equal loads for the convergence overlay, 1–24, default 12;
  `lbl` labels on/off.
- Every form-diagram segment is `dw.link`ed to its force-diagram ray, and the two
  reaction arrows to the first and last ray.
- RESULT lines: the case and its loads; `A_v = B_v` and the reaction magnitude and
  angle; the chosen H with the resulting sag and the whole set of node depths; the
  maximum cable force and the note that it is the same in all four cases at a given
  pole; and, when H is at 72 kN, that this is the key's pole and the depths match
  the drawn ones.

---

## Task 5 — Funicular form through a given point (p. 5)

**Text (verbatim, English sheet).** "Task 5 · Funicular form — For scenarios a) to
d), find and draw the funicular form through the given point. Make use of the force
diagram in c) and d). Draw the direction of the reaction force in the form diagram
and mark tension forces with red and compression forces with blue."

The four scenarios carry no further text; they are defined entirely by their
drawings:

- a) a single point load `F`
- b) a uniformly distributed load `q`
- c) `q` **plus** a point load `F`, force diagram partly given (`R_q`, `F`, `R_tot`, pole `o'`)
- d) `q` **plus** two point loads `F₁`, `F₂`, force diagram partly given (`F₁`, `R_q`, `F₂`, `R_tot`)

German (`aufgabe-de.pdf` p. 5): "Aufgabe 5 Seilform — Finden und zeichnen Sie in den
Situationen a) bis d) die Seilform, welche durch den gegebenen Punkt verläuft.
Verwenden sie dazu in c) und d) den Kräfteplan. Geben Sie die Richtung der
Auflagerkräfte an und färben Sie Zugkräfte rot, Druckkräfte blau und äussere Kräfte
grün." Identical content.

**Givens — and what is NOT given.**

**The sheet prints no magnitudes and no scale for task 5.** Checked all four PDFs:
`task-en.pdf` p. 5, `aufgabe-de.pdf` p. 5, `solution-en.pdf` p. 5, `solution-de.pdf`
p. 5. The complete text inventory of those pages is `F`, `q`, `F₁`, `F₂`, `R_q`,
`R_tot`, `o'`, `A`, `B`, `f`, `l`, `l/3`, `1`, `2`, "form diagram" / "Lageplan",
"force diagram" / "Kräfteplan" — **no number anywhere**, and the caption reads
"form diagram" with no ratio, unlike every other page in the booklet. So:

- the span is only ever called `l`, divided into three equal `l/3`;
- the loads are only ever called `F`, `q`, `F₁`, `F₂`;
- the only dimension marked is `f`, the parabola sag, and it is marked **twice
  stacked** (`f`, `f`) in b), c) and d) — i.e. it is a *construction* quantity, the
  half of the tangent-triangle depth, not a given.

That is not an omission: **the form does not depend on the magnitudes at all.**
Only the *ratios* between the loads and the position of the through-point decide it
(proved below). Multiplying every load by any factor leaves the drawing untouched
and only rescales the force diagram. The ratios that are needed *are* given — by the
printed force diagrams of c) and d) (also below). The view says all of this and
works the task symbolically in `F`, `q` and `l`.

**Geometry.** Origin = support A, x to the right, y **upwards**. There is no scale,
so all lengths below are in the sheet's own drawing metres at `--scale 100`, and are
then quoted as fractions of `l`. Digitised with

```
$PY web/tools/sheetvec.py web/pdf/EXX-additional-exercises-sd-i-task-en.pdf 5 \
      --scale 100 --min 0.3 --cluster
$PY web/tools/sheetvec.py web/pdf/EXX-additional-exercises-sd-i-solution-en.pdf 5 \
      --scale 100 --min 0.45
```

All four panels are geometrically identical. Panel a) (task page, sheetvec coords):

| point | x | y | note |
|---|---|---|---|
| axis 1 = A |  6.912 | — | dash-dot vertical |
| axis 2     |  8.914 | — | l/3 |
| axis 3     | 10.910 | — | 2l/3 |
| axis 4 = B | 12.909 | — | l |
| A (pin apex) |  6.915 | 31.262 | |
| B (pin apex) | 12.908 | 30.413 | |

Dimension-line ticks at 6.909 / 8.910 / 10.911 / 12.912 — spacing 2.001, 2.001,
2.001, so `l = 6.003` and the three thirds are exact.

| quantity | drawing | as a fraction of l |
|---|---|---|
| span `l` | 5.997 | 1 |
| B below A, `d` | 0.849 | **0.14150 l** |
| through-point `P`, x | 2.001 from A | **2l/3** |
| through-point `P`, depth below A, `p` | 2.849 | **0.474833 l** |

`p − d = 2.000 = l/3` **exactly**, which is the one geometric fact that matters: the
run from `P` to `B` is `l/3` and the rise is `l/3`, so **`P–B` is at exactly 45°**.
Confirmed on the solution page in all four panels: the drawn `P–B` segments are
(a) 45.02°, (b) 45.02°, (c) 45.02°, (d) 45.02°.

Load positions and extents (task page, all confirmed against the render):

| case | loads | position |
|---|---|---|
| a | `F` | axis 2 → **x = l/3** |
| b | `q` block | axis 2 → axis 3 → **the middle third** |
| c | `q` block · `F` | **the first third [0, l/3]** · **x = 2l/3** |
| d | `F₁` · `q` block · `F₂` | **x = l/3** · **the middle third** · **x = 2l/3** |

So in **every** case the last third `[2l/3, l]` is unloaded, and the given point sits
exactly at its left end. The through-point is at the same place in all four panels
(depths 2.849 / 2.849 / 2.848 / 2.848 measured independently from the four drawn
solutions).

The printed force diagrams give the missing **ratios**:

| case | printed load line, drawing units | ratio |
|---|---|---|
| c | `R_q` = 1.499, `F` = 1.500 | **F = R_q** |
| d | `F₁` = 1.499, `R_q` = 1.500, `F₂` = 1.499 | **F₁ = F₂ = R_q** |

i.e. in c) the point load equals the whole of the distributed load, and in d) each
point load does. Write `Q = R_q = q·l/3` for the resultant of the block.

**Derivation.**

For loads that are all vertical, the funicular through two given points A and B is

```
y(x) = y_A + (y_B − y_A)·x/l − M(x)/H
```

where `M(x)` is the *simple-beam* bending moment of the same loads on the same span
and `H` the horizontal thrust. With `y_A = 0` and `y_B = −d` this is
`y(x) = −d·x/l − M(x)/H`. There is one free parameter, `H` — the pole distance —
and passing through `P = (2l/3, −p)` spends it:

```
H = M(2l/3) / (p − 2d/3)          and here   p − 2d/3 = 2.283 (= 0.38050 l)
```

Equivalently and more revealingly: the last third is unloaded in every case, so the
funicular's final segment is the straight line `P–B`, whose slope is fixed at **+1**
by the geometry above. Since `y′(l) = −d/l + B_v/H`,

```
H = B_v / (1 + d/l) = B_v / 1.1415
```

with `B_v` the simple-beam right-hand reaction. The two routes agree to 5 decimals
in all four cases. **This is the cleanest statement of the exercise: the given point
and B fix the direction of the last segment, that direction fixes the reaction at B,
and the reaction at B fixes the pole.**

Reactions on the cable (`H` horizontal, and the chord being inclined the vertical
components are `A_v ± H·d/l`):

```
A_v,cable = A_v + H·d/l      B_v,cable = B_v − H·d/l      A = √(H² + A_v,cable²)   B = √(H² + B_v,cable²)
```

and `B_v,cable = H` in every case, because the last segment is at 45°.

Results, per unit load (`F` in a); `Q = R_q` in b), c), d); `l` cancels everywhere
except in the sags):

| | a) F | b) q | c) q + F | d) F₁ + q + F₂ |
|---|---|---|---|---|
| total load | 1.00000 F | 1.00000 Q | 2.00000 Q | 3.00000 Q |
| beam A_v / B_v | 0.66667 / 0.33333 | 0.50000 / 0.50000 | 1.16667 / 0.83333 | 1.50000 / 1.50000 |
| M(2l/3) | 0.66667 F·l/l | 1.00000 | 1.66667 | 3.00000 |
| **H** | **0.29201 F** | **0.43802 Q** | **0.73003 Q** | **1.31406 Q** |
| A_v,cable / B_v,cable | 0.70799 / 0.29201 | 0.56198 / 0.43802 | 1.26997 / 0.73003 | 1.68594 / 1.31406 |
| **reaction A** | **0.76584 F** | **0.71252 Q** | **1.46484 Q** | **2.13756 Q** |
| **reaction B** | **0.41297 F** | **0.61945 Q** | **1.03242 Q** | **1.85836 Q** |
| slope at B | +1.00000 | +1.00000 | +1.00000 | +1.00000 |
| **sag f** (parabola below its chord) | — | **0.57075** | **0.34245** | **0.19025** |

Ordinates of the funicular at 0, l/3, 2l/3, l (units of the drawing, `l = 6.00`):

| case | y(0) | y(l/3) | y(2l/3) | y(l) |
|---|---|---|---|---|
| a | 0 | **−4.8490** (the vertex, under F) | −2.8490 | −0.8490 |
| b | 0 | −2.5660 (tangent point) | −2.8490 | −0.8490 |
| c | 0 | −2.1094 (tangent point) | −2.8490 (kink, under F) | −0.8490 |
| d | 0 | −2.5660 (kink, under F₁) | −2.8490 (kink, under F₂) | −0.8490 |

The `y(2l/3) = −2.8490` row is the through-point, hit by construction in all four.
b) and d) share `y(l/3)` because both are symmetric, which makes `A_v/H = 1 + d/l`
in both.

Nothing above used a magnitude. Every entry is a pure number times `F` or `Q`, and
the *geometry* rows contain neither — which is the point the view is built to make.

**Official key says.** (`solution-en.pdf` p. 5.) Again the key prints **no numbers**;
it draws the answer and dimensions the sag `f` twice in b), c) and d). Digitised:

| case | what the key drew | measured |
|---|---|---|
| a | vertex of the two-segment cable | (8.728, 26.413) with A at (6.727, 31.262) → **depth 4.849** |
| a–d | final segment P→B | **45.02°** in all four panels |
| b | `f` dimension ticks at y = 28.558 / 27.987 / 27.416 | **f = 0.571** |
| c | `f` dimension ticks at y = 14.650 / 14.307 / 13.965 | **f = 0.343** |
| d | `f` dimension ticks at y = 12.998 / 12.808 / 12.617 | **f = 0.190** |
| c | force diagram: load line `R_q` then `F`, pole `o'` to the right | `R_q` = 1.499, `F` = 1.500 |
| d | force diagram: `F₁`, `R_q` (dashed, a resultant), `F₂` | 1.499 / 1.500 / 1.499 |

The stacked pair of `f` marks is the classic tangent construction: the two tangents
at the ends of a loaded stretch meet `2f` below the chord, the parabola passes `f`
below it, and the key dimensions both.

**Agreement / disagreement.** **Full agreement — no error found in the key for
task 5.** Four independent checks, none of which shares an input with another:

| quantity | derived here | the key draws | error |
|---|---|---|---|
| a) vertex depth | 4.8490 | 4.849 | 0.00 % |
| b) sag f | 0.57075 | 0.571 | 0.04 % |
| c) sag f | 0.34245 | 0.343 | 0.16 % |
| d) sag f | 0.19025 | 0.190 | 0.13 % |
| slope of P–B, all four | exactly +1 (45.000°) | 45.02° | 0.02° |

The three `f` values in particular are a strong check: they come out of three
different load arrangements, they differ by a factor of three between the extremes,
and the *only* inputs are the through-point and the ratio `F : R_q = 1 : 1` read off
the printed force diagrams. Getting all three right confirms both the geometry
digitisation and the reading `F = R_q`, `F₁ = F₂ = R_q`.

**One thing to state honestly, and the view does:** the sheet genuinely does not give
`F`, `q` or `l`, so no absolute force or length can be quoted for task 5. Everything
here is a multiple of `F` or of `Q = q·l/3`, and every length a multiple of `l`.
The view therefore prints its numbers as coefficients, offers a load-magnitude
slider purely to show the force diagram scaling while the form stands still, and
states the assumed working value in its caption.

**Interactive view.** `exX1_5.js` (view id `X1_5`), 9 steps.

- Steps: the exercise → the supports, the given point and the case's loads → the
  loads' resultant(s) and the printed load line → **the given point pins the pole**
  (the last segment `P–B` is fixed, so `B`'s direction is fixed, so `H` is fixed) →
  the rays → the funicular, straight where unloaded and parabolic under `q` → the
  `2f / f` tangent construction and the sag check against the key → the reactions →
  **the form is independent of the magnitudes** (drag the load slider and watch the
  form diagram not move) → the four cases compared.
- Controls: `cas` a)/b)/c)/d); `U` the unit load (`F`, or `R_q`) 20–140, default
  60 — the *scale-independence* demonstration; `rho` = `F/R_q` in c) and d),
  0.25–2.5, default 1.00 ("← what the printed force diagram gives"); `pd` the
  through-point depth as a fraction of `l`, 0.35–0.65, default 0.474833
  ("← the point the sheet marks"); `lbl` labels on/off.
- Every straight funicular segment is `dw.link`ed to its ray; each parabola's chord
  is linked to the ray drawn to the mid-point of its `R_q` block (a parabola's chord
  slope is the mean of its end tangent slopes, so that ray is exactly parallel to
  it); the two reaction arrows are linked to the first and last ray.
- RESULT lines: "the sheet gives no magnitudes — everything is a multiple of F (or
  R_q = q·l/3) and of l"; the pinned thrust `H` as a coefficient and in the working
  units; the two reactions with their magnitudes and directions; the sag `f` with
  the key's drawn value alongside; and the standing note that the form is unchanged
  by any uniform rescaling of the loads.

---

## Task 6 — Designing a suspended roof (p. 6)

**Text (verbatim, English sheet).**
"a) For the situation below, determine the shape of the roof. The roof is fixed
between the supports A and B. It is a hanging construction. The maximum cable
force is N_d,max = 3000 kN. Draw the corresponding form and force diagrams. Draw
the direction and determine the magnitude of the reaction force. Indicate
tension forces with red and compression forces with blue."
"b) Calculate the diameter for the cable made of steel S235 due to the maximum
cable force."

(German, Aufgabe 6 "Dachform einer Hängekonstruktion": identical, and it adds
nothing the English drops. Both sheets print g_d = 33.75 kN/m and
q_d = 3.75 kN/m on the two load bars — so **37.50 kN/m in total, already at
design level** (the subscript d). There is no partial factor to apply here.)

**Givens.** g_d = 33.75 kN/m, q_d = 3.75 kN/m → s_d = 37.50 kN/m, uniformly
distributed over the horizontal projection. N_d,max = 3000 kN (GIVEN — this is
what fixes the sag, the exercise is form-finding, not analysis). Steel S235,
f_tk = 235 N/mm², γ_M = 1.05. Form diagram 1:500; force diagram 1 cm ≙ 250 kN.

**Geometry.** Origin = support A. Both supports are at the same level, on the
inner faces of two buildings drawn as grey blocks.
`$PY web/tools/sheetvec.py web/pdf/EXX-additional-exercises-sd-i-task-en.pdf 6 --scale 500 --min 0.2 --cluster`

| point | x [m] | y [m] | source |
|---|---|---|---|
| A (left support) | 0.000 | 0.000 | inner face of the left block, x = 49.907 in the dump |
| B (right support) | 64.978 | 0.000 | inner face of the right block, x = 114.885 |
| ground | – | −15.659 | block base y = 91.020, tops y = 106.679 |
| block width | 11.267 | | both blocks |
| load bars | – | +2.837 … +5.336 (g_d) and +6.720 … +9.219 (q_d) | the two UDL bars, x-extent identical to the span |

Span digitises as **64.978 m** = 65.00 m to 0.03 %, which validates the stated
1:500. The view uses **L = 65.00 m**. The two load bars run exactly A→B, so the
UDL covers the span and nothing else.

The solution page adds the answer geometry (`sheetvec … solution-en.pdf 6
--scale 500`), and the drawn red cable is a flattened polyline in the SVG:
`pdftocairo -svg -f 6 -l 6` gives one 64-vertex red path, span 368.38 pt,
midspan ordinate 40.728 pt → **span 64.98 m, drawn sag f = 7.184 m**.
The key's force diagram: load line 49.979 (dump units) → 9.996 cm → 2499 kN;
end rays 61.788 → 12.358 cm → 3089 kN; pole distance 56.712 → 11.342 cm →
2836 kN. So the key's force diagram is drawn ≈ 2.6 % OVERSIZE, but its shape is
right: end-ray inclination 23.86° against the derived 23.97°, N/R = 1.2363
against 1.2308.

**Derivation.**

The cable carries a UDL over the horizontal projection, so it is a parabola,
H is constant along it, and with level supports the largest tension is at the
two ends. Everything follows from that:

```
R   = s_d · L      = 37.50 × 65.00              = 2437.50 kN
V   = R/2          = 1218.75 kN            (each support, vertical component)
H   = √(N_max² − V²) = √(3000² − 1218.75²)      = 2741.286 kN
f   = s_d L² /(8H) = 37.50 × 65²/(8 × 2741.286) = 7.2246 m
tanθ= 4f/L = V/H   = 0.44460                    → θ = 23.9695°
A = B = √(H² + V²) = 3000.00 kN  ← identically N_d,max, and EXACTLY so
```

f/L = 1/9.00, and the developed cable length (numerical integration of the
parabola) is 67.082 m against the 65.00 m chord.

*Is A = B = 3000 kN a rounding coincidence?* **No — it is exact, by
construction.** The cable is anchored directly to A and B, so nothing but the
cable meets the support; the reaction there is the cable force at that point,
collinear with the end tangent. For a parabola under UDL with level supports
the maximum tension is at the supports. So A = B = N_max, identically, whatever
the load and the span are. The key's "3'000 / 3'000" is right to every digit,
and it is right *because* f was solved out of the same equation.

*Direction.* Both reactions point up and OUTWARD along the end tangents:
A at 180° − 23.97° = 156.03°, B at +23.97°. Components (±1218.75 horizontal,
+2741.29 vertical) — i.e. the anchorage has to hold 2741 kN of horizontal pull
at each end. Both are TENSION (red); nothing in this structure is in
compression, so the "compression = blue" half of the instruction has no work to
do — which is worth saying to the reader.

**b) Dimensioning.**
```
f_td  = f_tk/γ_M = 235/1.05           = 223.8095 N/mm²
A_req = N_d,max/f_td = 3'000'000/223.8095 = 13'404.26 mm²
D     = √(4A/π)                        = 130.64 mm  →  131 mm
```

**Official key says.**
- table: **A = 3'000 kN, B = 3'000 kN**;
- form diagram: parabolic red cable, sag drawn 7.18 m, two dashed red end
  tangents 1 and 2 crossing 2f below midspan, green R at midspan and green
  reaction arrows at A and B pointing outward along the tangents;
- force diagram: vertical load line, division point i at midspan, pole to the
  right, rays 1/A and 2/B;
- b) printed as `N_d,max = 3'000'000 N · f_td = 223.8 N/mm² ·
  A_req = N_d/f_td = 13'404.8 mm² · D = √(4·A/π) = 131 mm`.

**Agreement / disagreement.**
- A = B = 3000 kN — **agrees exactly**, and the view says why it is exact.
- D = 131 mm — **agrees**; mine is 130.64 mm, the key rounds to whole mm.
- A_req: key 13'404.8 mm², mine **13'404.26 mm²**. The key reached its figure by
  first rounding f_td to 223.8 N/mm² and then dividing (3·10⁶/223.8 = 13'404.83).
  Carrying 235/1.05 = 223.8095 through gives 13'404.26. A 0.004 % difference,
  invisible in D. Not an error, but the view states both so the reader can
  reproduce the printed digits.
- The sag: the key prints no number for f. Its drawn cable measures 7.184 m
  against the derived **7.2246 m** (0.6 % — the whole force diagram is drawn
  2.6 % oversize as well, so this is drafting tolerance, not a different
  answer).
- Nothing else on this page disagrees.

**Interactive view (`exX1_6.js`, id `X1_6`).**
Eight steps: the exercise → the situation (span, the two design line loads) →
the resultant R and its two halves → "the given force fixes the thrust": H by
Pythagoras → the thrust draws the roof (parabola, the two end tangents meeting
at node I, 2f below midspan, and the f + f dimension the sheet itself draws) →
the reactions come for free, A = B = N_max exactly → the force diagram (load
line, division point i, pole at distance H, rays 1 and 2 with the green
reactions laid on top of them, reversed) → b) the diameter.
Controls: **N_d,max** 2000 … 6000 kN (the headline — sag and diameter move in
opposite senses), **q_d** 0 … 12 kN/m with g_d fixed at 33.75, **span** 50 … 75 m,
and a member-number toggle. `compute()` guards N_max ≤ V and the view says so.
RESULT lines: s_d and R; H, f, f/L and the developed cable length; A = B =
N_max with the statement that this is an identity; b) f_td / A_req / D, and the
key's 13'404.8 mm² shown alongside with the reason for the difference.
`dw.link` groups: (cable end 1, ray 1, reaction A in both diagrams) and
(cable end 2, ray 2, reaction B in both). `occlusion.py --live` and
`parallel.py --live` both clean.

---

## Task 7 — Suspension bridge Sigriswil (p. 7)

**Text (verbatim, English sheet).**
"a) Calculate the total line load s_d on the dimensioning level for <u>one</u>
of the two main cables considering the safety factors. Then calculate the total
resultant point load R. Assume the constant area load is ḡ_k = 1.0 kN/m², and
the live load is q̄_k = 0.7 kN/m²."
"b) Find the maximum force in the cable, the support reaction forces and the
forces in the pylons and backstays assuming that the main cable (top cable)
represents a parabola. Mark tension forces in red, compression forces in blue
and external forces in green."

(German, Aufgabe 7 "Hängeseilbrücke Sigriswil", names the members the English
leaves anonymous: "die Beanspruchungen in den **Pylonen (Element 4 und 5)** und
**Rückverankerungen (Element 3 und 6)**", and asks for "die **Lage** und Grösse
der Auflagerreaktionen" — the *line of action* as well as the magnitude.)

**Givens.** ḡ_k = 1.0 kN/m², q̄_k = 0.7 kN/m², deck width b = 1.5 m,
γ_G = 1.35, γ_Q = 1.5 (compendium 2.6). **Two** main cables, and the task is
for one of them. Cross section 1:100, form diagram 1:1500, force diagram
1 cm ≙ 200 kN.

**Geometry.** Origin = II, the top of the LEFT pylon; x to the right, y up.
`$PY web/tools/sheetvec.py web/pdf/EXX-additional-exercises-sd-i-task-en.pdf 7 --scale 1500 --min 8`
(the solution page digitises to the same numbers, so the answer drawing sits on
the given geometry exactly).

| point | x [m] | y [m] |
|---|---|---|
| II — left pylon top | 0.000 | 0.000 |
| III — right pylon top | 287.902 | −20.311 |
| left pylon foot | −7.998 | −28.122 |
| right pylon foot | 295.899 | −47.416 |
| A — left backstay anchor | −24.966 | −15.294 |
| D — right backstay anchor | 312.962 | −37.004 |
| I — intersection of the two cable tangents | 143.951 | −38.342 |

| member | from → to | length [m] | angle |
|---|---|---|---|
| 3 left backstay | II → A | 29.278 | 31.49° below horizontal, to the left |
| 4 left pylon | foot → II | 29.237 | 74.13° |
| 5 right pylon | foot → III | 28.260 | 106.44° (leans out to the right) |
| 6 right backstay | III → D | 30.111 | 33.67° below horizontal, to the right |

Span **l = 287.902 m = 288.00 m** to 0.03 %, which validates 1:1500 — and 288 m
is the number that makes the key's printed R come out exactly (below), so the
view uses 288.00 m. The pylon tops are **not level**: II is 20.311 m above III.

Sag f, measured at MIDSPAN from the chord II–III down to the cable, is
dimensioned on the sheet by two stacked "f" marks (chord → cable → node I, so
node I is 2f below the chord). Two independent reads agree:
- the dimension lines at x = 222.008 are two 21.588-long strokes offset by
  **14.091 m**;
- the drawn red cable, extracted from the SVG (`pdftocairo -svg -f 7 -l 7`
  gives one 64-vertex red path, local span 544.271 pt, midspan ordinate
  45.839 pt against a chord ordinate of 19.199 pt) → f = 26.640 pt ×
  0.529167 m/pt = **14.093 m**.

The cross section at 1:100 confirms the load width: the "b = 1.5 m" dimension
digitises 1.499 m, and there are exactly **two** main cables (two lines rising
outward at 8.99° off vertical from the deck edges) plus two stabilising cables
running down and out at 35.71°.

**Derivation.**

*a) Load take-down.* The deck is 1.5 m wide and hangs from two main cables, so
each cable carries half the deck width, 0.75 m of tributary width:
```
s_d = (γ_G ḡ_k + γ_Q q̄_k) · b/2
    = (1.35 × 1.0 + 1.5 × 0.7) × 1.5/2
    = (1.350 + 1.050) × 0.75  =  2.400 × 0.75  =  1.800 kN/m
R   = s_d · l = 1.800 × 288.00                 =  518.40 kN
```
Both come out exactly on the key's printed values, and 518.4/1.8 = 288 m is
precisely the digitised span — which is the cross-check that the "one of the
two" reading (halving b) is the intended one. Take the whole 1.5 m and you get
3.6 kN/m and 1036.8 kN, twice what the key prints.

*b) The cable.* For a parabola under a UDL over the horizontal projection the
midspan offset from the chord is w l²/(8H) whether or not the supports are
level, so f alone fixes the thrust:
```
H     = s_d l² /(8f) = 1.8 × 288² /(8 × 14.093)        = 1324.23 kN
V_II  = s_d l/2 + H·Δh/l = 259.20 + 1324.23×20.311/288 =  352.59 kN
V_III = s_d l/2 − H·Δh/l = 259.20 − 93.39              =  165.81 kN        (Σ = 518.40 ✓)
N_1   = √(H² + V_II²)                                   = 1370.37 kN   (cable at II)
N_2   = √(H² + V_III²)                                  = 1334.57 kN   (cable at III)
```
**N_max in the main cable = 1370.4 kN, at the HIGHER pylon II** — the whole
point of the unequal tower heights. The lowest point of the cable is not at
midspan but at x = l/2 + Δh·l/(8f) = **195.88 m** from II, 26.08 m below II and
5.77 m below III.

*The three joints.* Unit vectors from the table above; tension pulls away from
the joint, the pylon (compression) pushes it up.

Node I (the two cable tangents and R) is the pole construction — it gives H and
the split of R into V_II and V_III, nothing more.

Node II: N_1·(0.96634, −0.25730) + N_3·(−0.85265, −0.52237) + N_4·(0.27352,
0.96186) = 0 → **N_3 = 2023.0 kN (T), N_4 = 1465.2 kN (C)**.

Node III: N_2·(−0.99225, −0.12423) + N_6·(0.83217, −0.55435) + N_5·(−0.28299,
0.95907) = 0 → **N_5 = 1359.8 kN (C), N_6 = 2053.5 kN (T)**.

*Reactions* (each anchor / foot has exactly one member, so each reaction is
collinear with it and equal to it):

| | magnitude [kN] | line of action | components [kN] |
|---|---|---|---|
| A left backstay anchor | **2023.0** | 31.49° below horizontal, down-left | (−1725.0, −1056.8) |
| B left pylon foot | **1465.2** | 74.13° up, leaning right | (+400.8, +1409.4) |
| C right pylon foot | **1359.8** | 73.56° up, leaning left | (−384.8, +1304.2) |
| D right backstay anchor | **2053.5** | 33.67° below horizontal, down-right | (+1709.0, −1138.3) |

Global check: ΣF_x = 0.0, ΣF_y = +518.4 = R ✓ (residual 2·10⁻¹³ kN).

The largest force anywhere in the system is not in the main cable at all: it is
the RIGHT backstay, 2053.5 kN, because the right pylon is shorter and leans
more. Worth naming in the view — the question asks for "the maximum force in
the cable", which is 1370.4 kN, and a reader who answers 2053.5 has answered a
different question.

**Official key says.**
- a) **q_d = 1.8 kN/m** on the load bar and **R = 518.4 kN** at midspan. Nothing
  else numeric is printed anywhere on the page.
- b) is answered graphically only: a red parabolic main cable, dashed red
  tangents 1 and 2 meeting at node I, l/2 + l/2 and the two f dimensions, red
  backstays 3 and 6, blue pylons 4 and 5, four green reaction arrows A, B, C, D
  in the directions tabulated above; three node sketches; and one closed force
  diagram at 1 cm ≙ 200 kN in which the pole is the meeting point of rays 1, 2,
  4 and 5.

**Agreement / disagreement.**
- a) s_d = 1.800 kN/m and R = 518.40 kN — **agrees exactly**, to every digit.
- b) The key gives no numbers, so the comparison is against its drawn lengths.
  Reading the force diagram at 1 cm ≙ 200 kN (1 dump unit at 1:1500 = 13.3333
  kN):

  | | drawn [kN] | derived [kN] | error |
  |---|---|---|---|
  | R | 518.2 | 518.40 | 0.04 % |
  | 1 (cable at II) | 1369.5 | 1370.37 | 0.06 % |
  | 2 (cable at III) | 1333.7 | 1334.57 | 0.07 % |
  | 3 / A | 2021.7 | 2023.0 | 0.07 % |
  | 4 / B | 1464.4 | 1465.2 | 0.06 % |
  | 5 / C | 1358.9 | 1359.8 | 0.07 % |
  | 6 / D | 2052.1 | 2053.5 | 0.07 % |

  and the key's pole sits at (338.995, 99.599) in the dump against the (338.99,
  99.585) my H and V_II predict. **Agrees to better than 0.1 % throughout** —
  this force diagram is drawn properly, unlike Task 6's.
- **ERROR IN THE KEY — the member numbers in the three node sketches.** The form
  diagram and the force diagram agree with each other: 1 = main cable left of
  node I, 2 = main cable right of it, 3 = left backstay, 4 = left pylon, 5 =
  right pylon, 6 = right backstay (the force diagram writes "A 3", "4 B",
  "5 C", "6 D" on the four outer edges and 1 / 2 on the two dashed rays, which
  is only consistent with that numbering). The node sketches contradict it:
  - **node I** labels the two cable halves **3 and 4**; they are 1 and 2;
  - **node II** puts **1** on the down-left arrow and **3** on the down-right
    arrow — but at II the backstay goes down-LEFT (31.5°) and the main cable
    goes down-RIGHT (14.9°), so the two labels are **swapped**; and it labels
    the blue pylon **2**, which should be **4**;
  - **node III** labels the main cable **4**; it is 2. (Its 5 and 6 are right.)
  The arrow directions in all three sketches are correct — only the numbers are
  wrong, and they look like leftovers from an earlier version of the figure.
  The view uses the form/force-diagram numbering throughout and says so.
- The task text's "the support reaction forces" is answered as four reactions
  A–D; the German additionally asks for their *Lage*, i.e. the lines of action,
  which is why the table above carries angles as well as magnitudes.

**Interactive view (`exX1_7.js`, id `X1_7`).**
Ten steps: the exercise → the bridge (digitised geometry, the main cable, the
stabilising cable and its hangers, the l/2 + l/2 dimension) → a) the cross
section and the "one of the two cables" halving → a) the load designed up,
s_d and R → b) node I: the sag fixes H, and the pole is born → b) the cable,
N_1 and N_2 and the off-centre low point → b) node II → b) node III → b) the
four reactions and the closed polygon → everything checked.
The single force diagram carries all three joints: its pole is the meeting
point of rays 1, 2, 4 and 5, and the three shaded triangles (Q0-o-Q4,
Q0-Q1-o, o-Q3-Q4) are nodes I, II and III and exactly tile the pentagon — so
no separate node sketches are drawn, and the key's mis-numbered ones are
called out in the last step's caption instead.
Controls: **q̄_k** 0 … 2.0 kN/m², **ḡ_k** 0.4 … 2.0 kN/m², **sag f** 8 … 24 m
(H goes as 1/f and the low point slides along the deck), **cables sharing the
deck** 1 or 2 (the trap in a), shown rather than described), and a label
toggle. RESULT lines: a) s_d and R against the key; b) H, V_II, V_III and the
cable N_max; b) the four member forces with the note that backstay 6 is the
biggest force in the bridge; b) the four reactions with their inclinations;
and the key comparison, which switches itself off when the sliders leave the
sheet's values.
`dw.link` groups: 1↔ray1, 2↔ray2, and 3↔ray3↔A, 4↔ray4↔B, 5↔ray5↔C,
6↔ray6↔D (each with both its form-diagram reaction arrow and its
force-diagram one). `occlusion.py --live` and `parallel.py --live` both clean.

---

## Task 8 — Finding the thrust line using a trial funicular (p. 8)

**Text (verbatim, English sheet).** "a) Four non-uniformly distributed point
loads and the two supports A and B are given. Find the only possible structure
that is in equilibrium under the given load and traverses point C.

First find the magnitude of the resultant R in the force diagram, then its
position in the form diagram. To do this, use a trial funicular. Then find the
reaction forces and the form of the arch going through point C. Finally, colour
tension forces in red, compression forces in blue and the external forces in
green."

**Givens.** F₁ = 45 kN, F₂ = 30 kN, F₃ = 15 kN, F₄ = 30 kN. Form diagram 1:250,
force diagram 1 cm ≙ 10 kN. The four loads are **inclined**, each with its own
line of action drawn dash-dot on the sheet; only F₂ is vertical. Both supports
are pinned and at the same level.

**Geometry.** Origin = support A, x to the right, y up, metres.
Digitised with

```
$PY web/tools/sheetvec.py web/pdf/EXX-additional-exercises-sd-i-task-en.pdf 8 \
      --scale 250 --min 0.05
```

(page origin arbitrary; the table below is re-referenced to A). The force
diagram was read from the same dump: at `--scale 250` a printed centimetre
comes out as 2.5 m, and 1 cm ≙ 10 kN, so **force [kN] = 4 × length [m]**.

| point | x [m] | y [m] | note |
|---|---|---|---|
| A (pin) | 0.000 | 0.000 | apex of the left support triangle |
| B (pin) | 14.995 | 0.000 | span **15.00 m**, same level — round ✓ |
| C | 3.715 | 4.121 | small circle; lies **on F₁'s line of action** |

Lines of action, given as the x where each crosses the chord AB and the tilt
from vertical (positive = leans right going down):

| load | x at y = 0 [m] | tilt from vertical |
|---|---|---|
| F₁ = 45 kN | 3.1378 | **−8.00°** (leans left) |
| F₂ = 30 kN | 5.9610 | 0.00° (vertical) |
| F₃ = 15 kN | 8.9752 | **−5.00°** |
| F₄ = 30 kN | 11.8649 | **+7.54°** |

The 8.00°, 5.00° and 0.00° come out exactly; only F₄'s 7.54° is not a round
number. The span is exactly 15.00 m, which validates the 1:250 scale. The
crossing points are not round — normal for a graphic-statics sheet, where only
the directions matter.

**C is on F₁'s line of action** — checked, not assumed: F₁'s line at y = 4.121
is at x = 3.7170 and the digitised C is at x = 3.715 (2 mm apart on a 15 m
span). This is the hinge of the whole exercise, see below. In the view C is
snapped onto the line (x = 3.7170 at the sheet's height) and parametrised by
its height; that snap is why the numbers below read 88.23 rather than the
88.21 the raw digitised C gives.

**Derivation.**

*1. The resultant.* Unit vectors from the tilts, so

```
F₁ = 45·(−0.13917, −0.99027) = (− 6.263, − 44.562)
F₂ = 30·( 0      , −1      ) = (  0    , − 30.000)
F₃ = 15·(−0.08716, −0.99619) = (− 1.307, − 14.943)
F₄ = 30·(+0.13113, −0.99137) = (+ 3.934, − 29.741)
                          R  = (− 3.634, −119.246)
```

**|R| = 119.30 kN**, 1.745° west of vertical. Note that the *sum of the
magnitudes* is 45+30+15+30 = 120 kN; because the loads are inclined the
*vector* sum is 119.30 kN, and 119.30 is the number the force diagram shows.

*2. Its line of action.* Moments about A of each load taken at its crossing of
the chord: ΣpᵢFyᵢ = −805.66 kNm, so R crosses AB at

**x_R = 805.66 / 119.246 = 6.756 m from A** (midspan is 7.4975 m).

*3. The trial funicular.* Any pole o′ off the load line gives a funicular;
started at A it is a different polygon for every o′, but its first and last
strings always intersect **on R's line of action**. Verified numerically for
four different trial poles: x_R = 6.756156 m every time (view `exX1_8.js`
prints this live while the pole is dragged). The division point i on the R-line
of the force diagram is invariant in the same way.

*4. The third condition — this is the trick of the exercise.* C lies on F₁'s
line of action. Cut the arch immediately to the left of C: the only force on
that free body is the reaction at A, because F₁ passes through C and has no
moment about it. ΣM_C = 0 therefore forces **the reaction at A to act along the
line A–C**. (The key reaches the same place by the CS/CS′ construction: the
real closing string is A–B, so the real pole lies on the horizontal through i;
the requirement that the funicular passes through C then fixes it along that
horizontal. Both give the same pole.)

*5. Reactions.* Three-force condition: line A–C, R's line and the reaction at B
are concurrent at **P = (6.99, 7.75)**. Then A + B + R = 0 gives

**A = 88.23 kN at 47.95°** (up-right, along A–C) ·
**B = 77.22 kN at 135.91°** (up-left).

*6. The arch.* Walking the funicular from A with that thrust:

| node | x [m] | y [m] | on |
|---|---|---|---|
| A | 0.000 | 0.000 | support |
| C | 3.717 | 4.121 | F₁ |
| n₂ | 5.961 | 5.011 | F₂ |
| n₃ | 9.363 | 4.429 | F₃ |
| n₄ | 11.405 | 3.478 | F₄ |
| B | 14.995 | 0.000 | support |

and the last string reaches B with a closure error of 9·10⁻¹⁶ m. Member forces,
all **compression**:

```
1 A–C   88.23   2  56.84   3  53.60   4  56.83   5 n₄–B  77.22  kN
```

Maximum thrust **88.23 kN in member 1**, the segment A–C, which is also the
reaction at A. Nothing is in tension; the structure is an arch throughout.

**Official key says.** The key prints no numbers at all — only the drawing. Its
drawing, digitised the same way, gives:

| quantity | key's drawing | derived here |
|---|---|---|
| R | 119.26 kN at 88.26° | 119.30 kN at 88.25° |
| R crosses AB at | 6.7525 m | 6.7562 m |
| reaction A | 88.34 kN at 48.67° | 88.23 kN at 47.95° |
| reaction B | 76.07 kN at 135.98° | 77.22 kN at 135.91° |
| pole o (kN from load-line start) | (−58.34, −66.34) | (−59.06, −65.52) |
| division point i | (−2.02, −66.34) | (−2.00, −65.52) |
| F₁…F₄ drawn | 44.98, 29.99, 15.00, 29.99 | 45, 30, 15, 30 |

**Agreement / disagreement.** No disagreement — the key is right, and it agrees
to drawing accuracy (worst case 1.5 % on reaction B, 0.7° on the direction of
A, which is the width of a pencil line at 1:250). Two things worth stating:

1. **R is 119.30 kN, not 120 kN.** The four magnitudes add to 120 but the loads
   are inclined, so the resultant is shorter than their sum. The key's own load
   line measures 119.26 kN, so the key agrees; anyone who writes 120 has added
   scalars.
2. The key labels the **real** pole `o` and the **trial** pole `o′`, which is
   the reverse of the usual convention (trial first, real second). Named the
   same way here so the view can be read against the sheet, but the view says
   which is which in words.

**Interactive view.** `exX1_8.js`, view id `X1_8`.

Steps: the given · the load line and R · pick a trial pole and draw the trial
funicular · close it and find R's line of action · the division point i · the
third condition (C on F₁'s line ⟹ the reaction at A runs along A–C) ⟹ the real
pole · the arch and its forces · the check.

Controls: **the trial pole o′ is draggable in two directions (kN horizontally
and vertically from the start of the load line)** — the trial funicular changes
shape completely while the intersection of its first and last strings, and
therefore R's line of action, does not move by so much as a millimetre. The
view prints x_R live so the reader can watch it stay at 6.756. Also: the height
of C along its own load line (moves the whole answer), and toggles for the
trial construction and the labels.

RESULT lines: R and its line of action · the two reactions · the five member
forces and the maximum · the closure check at B.

---

## Task 9 — Finding the thrust line (p. 9)

**Text (verbatim, English sheet).** "In a) and b), the thrust line that goes
through points A, B and C is sought. Draw the corresponding force diagram for
both situations. Colour tension forces in red, compression forces in blue and
the external forces in green."

The two sub-parts carry no text of their own; they are the two figures labelled
a) and b), each captioned "form diagram 1:250" and "force diagram 1cm ≙ 10kN".

**Givens.**
- a) `g_d = 8 kN/m`
- b) `q_d = 16 kN/m` **and** `g_d = 8 kN/m`, drawn as two stacked bands.

**Geometry.** Origin = support A, x right, y up, metres. Digitised with

```
$PY web/tools/sheetvec.py web/pdf/EXX-additional-exercises-sd-i-task-en.pdf 9 \
      --scale 250 --min 0.05
```

Both figures sit on the same three dash-dot verticals, which run the full
height of the page:

| vertical | x [m] from A |
|---|---|
| through A | 0.000 |
| through C | **9.997 ≈ 10.00** |
| through B | **14.995 ≈ 15.00** |

| point | x [m] | y [m] |
|---|---|---|
| A (pin) | 0.000 | 0.000 |
| B (pin) | 14.995 | 0.000 |
| C | 9.996 | **4.394** |

Support apexes: a) (19.425, 38.379) and (34.420, 38.379) in page coordinates;
b) (19.425, 2.499) and (34.420, 2.499). **Both supports are at the SAME level**
in both figures, and the C marker sits 4.394 m above the chord in both. Span
15.00 m and the C ordinate 10.00 m come out exactly round, which validates the
1:250 scale; the rise 4.394 m does not (nominally 4.4 m).

**Where the loads actually act — the thing to get right.** Digitised band
extents, confirmed against a 200 dpi render of the English *and* the German
sheet (the vector dump alone cannot be trusted on this page family):

| case | band | from x [m] | to x [m] |
|---|---|---|---|
| a) | g_d = 8 kN/m | 0.000 | **9.997 (= C's vertical)** |
| b) | g_d = 8 kN/m | **9.997** | 14.995 |
| b) | q_d = 16 kN/m | **9.997** | 14.995 |

So **a) is loaded only over the left 10 m**, not over the whole span, and **b)
is loaded only over the right 5 m**, with the 8 and the 16 covering exactly the
same 5.00 m (they are drawn one above the other, same length, both 4.998 m in
the dump). Totals: a) 8 × 10 = **80 kN** at x = 5.00 m; b) 24 × 5 = **120 kN**
at x = 12.50 m.

**Derivation.** Two pins at the same level, so the vertical reactions follow
from global equilibrium alone (the horizontal thrust has no lever about either
support), and the thrust follows from ΣM = 0 at C.

*a)* ΣM_B: A_v·15 = 80·10 → **A_v = 53.333, B_v = 26.667 kN**.
ΣM_C on the left free body: −10·A_v + 4.394·H + 80·5 = 0 → **H = 30.344 kN**.

```
A = (30.344,  53.333) → 61.36 kN at  60.36°
B = (−30.344, 26.667) → 40.40 kN at 138.70°
```

Shape: parabola over the loaded 10 m, y = 1.75757x − 0.131818x², then a
straight segment from C to B. y(10) = 4.394 ✓ and y′(10) = −0.8788, which is
exactly the slope of C→B — the thrust line has **no kink at C**, it is smooth,
because C happens to be the end of the loaded length. Crown **5.859 m at
x = 6.667 m** (where the shear is zero). The tangent at A and the line C–B meet
at **I = (5.000, 8.788)**, on the resultant's line of action — the three-force
condition, and the sagitta at midspan of the loaded length is half of I's
height above the chord A–C, which is the classical parabola construction the
key draws.
**Maximum thrust 61.36 kN, at A.**

*b)* ΣM_B: A_v·15 = 120·2.5 → **A_v = 20, B_v = 100 kN**.
ΣM_C on the left free body (no load at all to the left of C): −10·A_v + 4.394·H
= 0 → **H = 45.517 kN**.

```
A = (45.517,   20.000) →  49.72 kN at  23.72°
B = (−45.517, 100.000) → 109.87 kN at 114.47°
```

Shape: straight from A to C, then a parabola over the loaded 5 m,
y = 4.394 + 0.4394(x−10) − 0.263636(x−10)², which reaches y(15) = 0 at B ✓.
Crown only **4.577 m at x = 10.833 m** — a shallow bump just past C. Tangent
intersection **II = (12.500, 5.492)**, again on the resultant's line.
**Maximum thrust 109.87 kN, at B.**

*Why the exercise is worth doing.* A and B and C are the same three points in
both cases, yet the answers differ by a factor of 1.8 in the maximum force and
put it at opposite supports. The thrust line through three given points is
unique — but it is unique *for a given load*, and moving 120 kN onto the short
right-hand span nearly doubles what the structure has to carry.

**Official key says.** The key prints **no numbers**; it draws the two thrust
lines, the two force diagrams, the tangent-intersection points I and II, the
sagitta construction and a small node-equilibrium rosette for each case.
Digitising the key's own force diagrams (force = 4 × length in metres at
`--scale 250`):

| quantity | key's drawing | derived here |
|---|---|---|
| a) A | 61.35 kN at 60.34° | 61.36 kN at 60.36° |
| a) B | 40.40 kN at 138.72° | 40.40 kN at 138.70° |
| a) R | 79.97 kN vertical | 80.00 kN |
| b) A | 49.73 kN at 23.70° | 49.72 kN at 23.72° |
| b) B | 109.84 kN at 114.49° | 109.87 kN at 114.47° |
| b) R | 119.95 kN vertical | 120.00 kN |
| a) chord A–C slope | 0.4391 | 0.4394 |
| a) tangent at A slope | 1.7555 | 1.75757 |
| a) line C–B slope | −0.87867 | −0.8788 |

**Agreement / disagreement.** Agrees with the key everywhere, to 4 significant
figures — better than the key's own line weight. Since the key prints no
numbers, the numbers above are the answer.

One correction to the *task brief* this view was built from (not to the sheet):
the brief said the UDL in a) covers the whole span, that b) adds q_d over a
*shorter* stretch than g_d, and that A and B are at different heights. All
three are wrong. a) is loaded over the left 10 m only; in b) both bands cover
exactly the same right-hand 5 m; and the two supports are level in both
figures. The asymmetry comes from C sitting at x = 10 m, not from the supports.

**Interactive view.** `exX1_9.js`, view id `X1_9`.

One form diagram carries **both** cases at once — their loaded lengths do not
overlap (0–10 m for a, 10–15 m for b), so the two thrust lines can be drawn
through the same A, B, C and compared directly. Two force diagrams, one per
case, sit beside it.

Steps: the three given points · a) the load and its resultant · a) the vertical
reactions and the thrust from ΣM_C · a) the parabola, the tangent point I and
the force diagram · b) the same four moves · the comparison (same three points,
1.8× the force, at the other support).

Controls: the height of C (drag it and watch both thrust lines and both force
diagrams move — as C drops, both thrusts blow up), g_d and q_d.

RESULT lines: for each case, the reactions, the horizontal thrust, the crown
and its position, and the maximum thrust with the support it occurs at; plus
the ΣM_C = 0 check.

**Note on rounding.** The hand derivation above uses the round 15.00 m span and
10.00 m for C's abscissa. The view keeps the digitised 14.995 m and 9.996 m, so
it prints H = 30.32 / 45.50 kN and maxima 61.33 / 109.84 kN rather than
30.34 / 45.52 and 61.36 / 109.87 — a 0.05 % difference, and if anything closer
to the key's own drawing (which measures 109.84 kN for b) B).

---

## Task 10 — Laon Cathedral, France (p. 10)

**Text (verbatim, English sheet).**
"a) Find a parabola going through points A and B which lies within the structure
and carries the line load g_1d. Take into account that the applied force A from
the nave acts horizontally.
b) Then find the parabola through B, C and D. Find g_2d such that the supporting
line from point B runs vertically into point E.
c) In D, an additional point load F_1d is applied, representing the weight of the
buttress. Determine F_1d such that the thrust line is running from point D into
point F.
d) Find the parabola through points E and F in such a way that the thrust line
including the loads from the upper arches within the structure can be derived
into the groun d. From this, calculate the magnitude of the line load g_3d. Draw
the corresponding force diagram and indicate the magnitudes of the reaction
forces G and H. Colour tension forces in red, compression forces in blue and
external forces in green."
(the sheet really does print "groun d".)

**Givens.** form diagram 1:100 · force diagram 1 cm ≙ 10 kN · g_1d = 10 kN/m over
the nave vault, from A to the vertical through B · g_2d over the aisle roof, from
the vertical through B to the vertical through D · F_1d a point load on the
vertical through D · g_3d over the lower vault, from E to F · the force A that the
nave hands to the buttress acts **horizontally** · an empty G/H table to fill in.

**Geometry.** Origin at point A, x to the right, y UP, metres. The six labelled
points are small filled discs in the PDF artwork; `sheetvec.py` skips fill-only
paths, so they were read straight out of the vector dump
(`pdftocairo -svg -f 10 -l 10 …`, discs = grey-66.7 % 0.72 pt paths, 2.83 pt
across) and converted at 1 pt = 0.03527778 m (1:100).

| point | PDF pt (y down) | x [m] | y [m] |
|---|---|---|---|
| A (nave springing) | (228.717, 410.385) | 0.0000 | 0.0000 |
| B | (401.570, 633.129) | 6.0979 | −7.8579 |
| C | (462.305, 628.986) | 8.2405 | −7.7118 |
| D | (523.039, 736.191) | 10.3830 | −11.4937 |
| E | (401.570, 910.734) | 6.0979 | −17.6512 |
| F | (555.330, 910.734) | 11.5222 | −17.6512 |
| ground | y = 1096.266 pt | — | −24.1965 |

Three internal checks, all exact, which is what validates the digitising:
- **B and E share an x** to 3 decimals (401.570) — the sheet's "vertically into E".
- **E and F share a y** (910.734).
- **C is exactly midway between B and D in x**: (401.570 + 523.039)/2 = 462.3045
  against C's 462.305. *That is what the sheet's two `l/2` marks are for* — the
  dimension chain runs B → C → D with a tick at each, l/2 = 2.1427 m, and it says
  "C is the mid-ordinate", which is the only way to get a parabola through three
  points by hand.

The three load bars measure out to the same three verticals (bar centre ± half
width, in pt): g_1d 228.716→401.571, g_2d 401.570→523.039, g_3d 401.570→555.332.
So the loaded widths are **L_1 = 6.0979, L_2 = 4.2852, L_3 = 5.4243 m** — not
round, which is normal: this is a traced cathedral section, not a designed span.
Scale check: A sits 24.20 m above the floor, which is Laon's nave-vault height.

The section outline itself (black 0.72 pt strokes, minus the load bars, the load
arrows, the A and F_1d arrows, the l/2 chain and the seven point discs, then
Douglas–Peucker at 0.45 pt = 16 mm) is 137 segments and is stored in
`drawings/web/lib/exX1_laon.js`, so the view draws the real building. Its
ground-level footprint is two piers, x ∈ [4.990, 6.524] and x ∈ [9.411, 13.559];
the nave arcade opens between them.

**Derivation.** The thrust line is a chain of four pieces (the key numbers its
nodes I…VII and its rays 1…10; the same numbering is used below and in the view).

*a)* The force at A is horizontal, so A is the **vertex** of parabola I. With
y = −g_1x²/(2H_1) through B:

  H_1 = g_1·L_1² / (2·7.8579) = 10 × 37.184 / 15.7158 = **A = 23.660 kN**
  R_1 = g_1·L_1 = **60.979 kN**, so ray 2 = √(23.660² + 60.979²) = 65.408 kN.

*b)* Ray 5 (B→E) is vertical, so it carries no horizontal force and **H_2 = H_1**.
Parabola II must pass through B, C and D, and those are equally spaced in x
(h = 2.1427 m), so the second difference gives the curvature outright:

  y'' = (y_B − 2y_C + y_D)/h² = (−7.8579 + 15.4236 − 11.4937)/4.5912 = −0.85566
  **g_2d = −y''·H_2 = 0.85566 × 23.660 = 20.245 kN/m**   (R_2 = 86.754 kN)

  slope at B = +0.9849 (44.56° rising), apex 0.567 m above B at x = 7.249,
  slope at D = −2.6818. Ray 3 = 33.209 kN, ray 4 = 67.719 kN.
  Node B (III), vertical: **N_5 = R_1 + H_2·y'_B = 60.979 + 23.304 = 84.281 kN**
  compression down the wall from B to E.

*c)* D→F is straight, slope (−17.6512 + 11.4937)/(11.5222 − 10.3830) = −5.4053.
F_1d is vertical so it does not change H:

  **F_1d = H_2·(y'_D − s_DF) = 23.660 × (−2.6818 + 5.4053) = 64.440 kN**
  ray 6 = √(23.660² + 127.888²) = 130.061 kN.

*d)* Two free choices remain — the rise f_3 of parabola III and the load g_3d —
and they are a *design*, constrained by "within the structure" and "derived into
the ground": the parabola has to clear the lower vault and stay under the fill,
and both legs (7 from E, 10 from F) have to land inside one of the two piers.
Taking the key's own drawn parabola (apex 2.359 m above the E–F line, i.e. it
just touches the horizontal at the underside of the g_3d fill):

  H_3 = g_3·L_3²/(8f_3),  V_8 = g_3·L_3/2
  node E (VI):  **G** = (H_3, N_5 + V_8)      node F (VII): **H** = (−H_3 − H_1, 127.888 + V_8)

  with g_3d = 8.271 kN/m → H_3 = 12.893 kN, V_8 = 22.434 kN, ray 8 = ray 9 = 25.87
  **G = 107.49 kN**, landing at x = 5.31 m (inside the left pier, 4.99–6.52)
  **H = 154.70 kN**, landing at x = 13.11 m (inside the right pier, 9.41–13.56)

Check: ΣV = 107.49_v + 154.70_v = 257.04 = R_1 + R_2 + F_1d + R_3 ✓ ;
ΣH = 23.66 = A ✓.

**Official key says.** g_2d = 20 kN/m, g_3d = 8.5 kN/m, G = 108 kN, H = 155 kN.
F_1d and A are drawn but never printed. The key's own force diagram, measured
off the PDF at 1 cm ≙ 10 kN, is:

| ray | key drawn | derived here |
|---|---|---|
| 1 = A | 23.66 | 23.660 |
| R_1 | 60.98 | 60.979 |
| 2 | 65.40 | 65.408 |
| R_2 | 86.75 (→ g_2d = 20.245) | 86.754 |
| 3 | 33.21 | 33.209 |
| 5 = B→E | 84.28 | 84.281 |
| 4 | 67.72 | 67.719 |
| F_1d | 64.44 | 64.440 |
| 6 | 130.05 | 130.061 |
| R_3 | 44.87 (→ g_3d = 8.271) | 44.87 |
| 8 = 9 | 25.88 | 25.87 |
| 7 = G | 107.49 | 107.49 |
| 10 = H | 154.70 | 154.70 |

**Agreement / disagreement.** Every ray agrees to 3–4 significant figures, so the
construction is confirmed end to end. The disagreements are all between the key's
*printed* numbers and the key's *own drawing*:

- **g_3d: the key prints 8.5 kN/m; its own force diagram says 8.27 kN/m** (the R_3
  segment is 127.20 pt = 44.87 kN over L_3 = 5.4243 m), and its own drawn
  parabola (rise 2.359 m, H_3 = 12.89 kN) says the same. 8.5 is 2.8 % high — a
  read-off, not a derivation. **8.27 kN/m is the right answer**; the view carries
  both and defaults to 8.27.
- g_2d printed as 20; exact value 20.245 (1.2 % — a rounding, fine).
- G printed as 108; exact 107.49. H printed as 155; exact 154.70. Both are the
  printed values rounded up by half a percent; with the printed g_3d = 8.5 they
  come out 108.2 and 155.4, which is presumably how they were obtained.
- F_1d is never printed even though c) asks for it: **F_1d = 64.44 kN**.

**Interactive view.** `exX1_10.js` (view id `X1_10`). The real digitised section
is drawn behind everything in grey; the four thrust-line pieces are built in
order, each with its force-diagram counterpart declared through `dw.link`:

1. the section, the six points, the three loads and the horizontal A;
2. a) parabola I, vertex at A → A = H_1, and the force triangle 1–R_1–2;
3. b) ray 5 vertical ⇒ H_2 = H_1, and the three-point parabola II ⇒ g_2d;
4. node III (B) closed: N_5 = 84.28 kN down the wall;
5. c) node IV (D): F_1d sized so the line leaves along D→F;
6. d) parabola III between E and F, with the rise as a design choice;
7. nodes VI (E) and VII (F), the two legs, and where they land in the piers;
8. the whole force diagram and the answer, with the g_3d disagreement stated.

Controls: `g1` the nave load 4–20 kN/m (the whole chain is linear in it — every
force and g_2d and F_1d scale together while the geometry stays put, which is the
point worth seeing); `g3` 5–12 kN/m and `f3` the E–F rise 1.2–3.2 m (the two free
design parameters of part d); `showKey` swaps in the key's printed g_3d = 8.5.
RESULT lines carry A, g_2d, N_5, F_1d, g_3d, G, H, the two landing points and the
pass/fail of "inside the piers", and the g_3d disagreement.

---

## Task 11 — Arch-cable-structure with different support conditions (p. 11)

**Text (verbatim, English sheet).**
"Draw the force diagrams for the given cases. Pay attention to the support
conditions. Determine the magnitude of A and B. Draw tension forces in red,
compression forces in blue and reaction forces in green."
and, above the fourth figure: "d) Design a solution in which the structure only
spans underneath the closing string."

**The sub-part labels are corrupt in BOTH languages.** The three upper figures are
captioned "a) a)", "a) b)" and "a) c)" — a stray "a)" in front of each — and only
the fourth is a clean "d)". The German sheet ("Aufgabe 11 Bogen-Seil-Tragwerke mit
verschiedenen Auflagerbedingungen") repeats the same three "a)"s, so it is not a
translation slip. Read them as a), b), c), d).

**Givens.** form diagram 1:100 (all four) · force diagram 1 cm ≙ 5 kN (all four) ·
q_1 = 5 kN/m over the whole span in every case · the same arch in a), b), c) and a
free design in d) · a "subsystem" column between the two diagrams, i.e. the node
polygon at B.

**Geometry.** Origin at A, x right, y UP. All four figures are the same drawing
repeated; from the vector dump of the task page (arch = black 0.72 pt, 61-point
bezier flattening; supports = black 0.24 pt triangles; construction lines = grey
58.8 % 0.36 pt):

| quantity | PDF pt | metres |
|---|---|---|
| span A→B | 137.906 → 336.266 = 198.360 | **6.9973 → l = 7.00 m** |
| rise of the arch (a, b, c) | 323.453 → 280.953 = 42.500 | **1.4993 → f = 1.50 m** |
| sag of the cable (d, key) | 985.793 → 1028.300 = 42.507 | **1.50 m** |
| q_1 load bar | 137.87 → 336.22 | the full span |

Both come out round, so 1:100 is honoured exactly.

**The four support conditions**, read off the actual symbols (the triangle's base
line and the hatched line are *offset* at A in every case = a roller; at B they
*coincide* = a pin, identically in all four):

| case | A | plane of the roller | reaction direction at A | closing string |
|---|---|---|---|---|
| a | roller | −49.40° | **40.60°** | drawn DASHED (not a member) |
| b | roller | −25.00° | **65.00°** | drawn solid |
| c | roller | horizontal | **90.00° (vertical)** | drawn solid |
| d | roller | horizontal | **90.00° (vertical)** | dashed (student designs it) |

and 40.60° is not an arbitrary number: arctan(4f/l) = arctan(6/7) = **40.6013°**,
i.e. in case a) the support plane is set exactly perpendicular to the arch's own
end tangent. The grey dash-dot line drawn through A in each figure is that
reaction direction (measured 40.616°, 65.017°, vertical, vertical).

**Derivation.** Same arch, same load, in every case:

  R = q_1·l = 5 × 7.00 = **35.00 kN**, at midspan
  H = q_1·l²/(8f) = 5 × 49 / 12 = **20.4167 kN**
  end tangent  tanθ = 4f/l = 0.857143 → θ = 40.6013°
  force in the arch at the springing = √(H² + (R/2)²) = **26.887 kN** compression

Because the only loads are vertical, A_h + B_h = 0 always, and by symmetry
A_v = B_v = R/2 = 17.50 kN. So the direction imposed at A fixes everything, and
the closing string simply takes up whatever thrust the supports refuse:

| case | A_v | A_h = A_v/tanθ_A | **A = B** | closing string |
|---|---|---|---|---|
| a) θ = 40.6013° | 17.50 | 20.4167 | **26.887 kN** | **0** — no member needed, hence the dashed line |
| b) θ = 65° | 17.50 | 8.1608 | **19.309 kN** | **12.256 kN TENSION** |
| c) θ = 90° | 17.50 | 0 | **17.500 kN** | **20.417 kN TENSION** |
| d) mirror of c) | 17.50 | 0 | **17.500 kN** | **20.417 kN COMPRESSION** (strut), cable 26.887 kN tension |

That progression is the whole lesson: rotate the support plane away from the arch
thrust and the tie has to make up the difference, from nothing to all of it.
Case d) is c) turned upside down — hang the same parabola 1.50 m *below* the
closing string and every sign flips: the string becomes a strut in compression,
the curved element becomes a cable in tension, the reactions are unchanged.

B in every case: B_h = −A_h, B_v = 17.50, so |B| = |A| — the pin at B is never
asked to do more than the roller at A, which is worth saying out loud because the
symbols look so different.

**Official key says.** It draws all four force diagrams and prints **no numbers at
all**, even though the task asks for the magnitude of A and B. Measured off the
key's own drawings at 1 cm ≙ 5 kN (pole at the left, load line R on the right):

| case | key's A / B | key's closing string | derived here |
|---|---|---|---|
| a | 26.88 / 26.88 kN at ±40.60° | — (dashed) | 26.887 |
| b | 19.30 / 19.30 kN at 65°/115° | 12.25 red | 19.309 · 12.256 |
| c | 17.49 / 17.49 kN vertical | 20.41 red | 17.500 · 20.4167 |
| d | 17.49 / 17.49 kN vertical | 20.41 blue | 17.500 · 20.4167 |

and its two arch/cable rays are 26.88 kN in all four, H = 115.71 pt = 20.41 kN.

**Agreement / disagreement.** No disagreement: every measured length agrees with
the derivation to 4 significant figures (26.88 vs 26.887, 19.30 vs 19.309, 12.25
vs 12.256, 20.41 vs 20.4167, 17.49 vs 17.500). The only complaints against the
sheet are editorial: the corrupt "a) a) / a) b) / a) c)" labels, and the fact that
the key answers a question about *magnitudes* without printing a single one — so
the numbers above are the answer.

**Interactive view.** `exX1_11.js` (view id `X1_11`). One geometry, one load, one
control that switches the support condition, so that the load stays put while A
and B move — which is the point of the page. The form diagram, the node-B
subsystem polygon and the force diagram are all on screen at once and all four
cases are drawn to the same force scale, so the reader can watch A shorten from
26.9 to 17.5 kN and the tie grow from 0 to 20.4 kN as the support plane rotates.

Steps: the given arch and load → R and H → case a) (reaction along the tangent,
tie = 0) → case b) (65°, tie appears) → case c) (vertical, tie takes everything)
→ case d) (the design: hang it below the string, every sign flips) → the four
answers side by side.

Controls: `cse` 0–3 switches a)/b)/c)/d) and everything recomputes; `theta`
overrides the support-plane angle continuously from 30° to 90° so the reader can
sweep between the printed cases and see the tie force pass through zero exactly
at 40.60°; `q` 2–10 kN/m; `f` the rise/sag 0.8–2.5 m; `sub` shows the node-B
subsystem. RESULT lines give A, B, the closing-string force with its sign, the
arch/cable force, and the check A_h + B_h = 0.

---

## Task 12 — From arch-cable to truss (p. 12)

**Text (verbatim, English sheet).** "Task 12 From arch-cable to truss — Draw the
corresponding force diagram for the given situations. Colour tension forces red,
compression forces blue and the external forces green."

Four unlettered situations, top to bottom. The sheet prints only the loads, the
member numbers and the joint numbers; the key draws four form diagrams, four
columns of joint ("subsystem") polygons and four Cremona diagrams, **but prints
not one member force**. Every number below is derived here.

**Givens.**
| situation | loads | supports | members | joints |
|---|---|---|---|---|
| 1 | F₁ = 60 kN down at the apex | A (left) + B (right) | 1, 2, 3 | I, II, III |
| 2 | F₁ = 60 kN down at the bottom node | A (left) + B (right) | 1, 2, 3, 4, 5 | I, II, III |
| 3 | F₁ = F₂ = 30 kN down at the two top nodes | A only (bottom apex) | 1, 2, 3 | I, II, III |
| 4 | F₁ = F₂ = 30 kN down at the two bottom nodes | A only (mid-span) | 1, 2, 3, 4, 5 | I, II, III, IV |

Form diagram 1:100 in all four; force diagram 1 cm ≙ 10 kN in all four.
Note the coordinator's brief says situations 1–2 have three members: situation 2
in fact has **five** — the key numbers the two posts 4 and 5 and colours them.

**Geometry.** Origin: the left-hand node of each situation, deck/support level.
`$PY web/tools/sheetvec.py web/pdf/EXX-additional-exercises-sd-i-task-en.pdf 12
 --scale 100 --min 0.2 --cluster`, structural strokes only:

| situation | node | sheetvec x, y [m] | local x, y [m] |
|---|---|---|---|
| 1 | III (support A) | 5.472, 28.067 | 0, 0 |
| 1 | I  (apex, load)  | 8.471, 31.066 | 3, 3 |
| 1 | II (support B)   | 11.470, 28.067 | 6, 0 |
| 2 | II (top left)    | 5.472, 22.665 | 0, 3 |
| 2 | III (top right)  | 11.470, 22.665 | 6, 3 |
| 2 | I  (bottom, load)| 8.471, 19.666 | 3, 0 |
| 2 | A / B (post feet)| 5.472 / 11.470, 19.666 | 0, 0 / 6, 0 |
| 3 | II (top left, F₁)| 5.472, 13.262 | 0, 3 |
| 3 | I  (top right, F₂)| 11.470, 13.262 | 6, 3 |
| 3 | III (support A)  | 8.471, 10.263 | 3, 0 |
| 4 | I  (bottom left, F₁) | 5.472, 2.016 | 0, 0 |
| 4 | IV (support A)   | 8.471, 2.016 | 3, 0 |
| 4 | II (bottom right, F₂)| 11.470, 2.016 | 6, 0 |
| 4 | III (apex)       | 8.471, 5.014 | 3, 3 |

All four are the SAME triangle: span **6.000 m**, depth **3.000 m** (the dump
gives 5.998 and 2.999), so every diagonal is at exactly **45.00°** and is
4.243 m long. The roundness of 6.00 / 3.00 validates the 1:100 scale. That the
four situations share one geometry is the point of the exercise — only the
supports and where the load is applied change.

**Derivation.** Solved with `drawings/web/lib/truss.js` `analyse()` (positive =
tension), residual 0 in all four; checked joint by joint by hand and against the
key's colouring. With F = 60 kN total in every situation:

| | 1 | 2 | 3 | 4 | 5 | reactions |
|---|---|---|---|---|---|---|
| situation 1 | −42.43 | −42.43 | +30.00 | – | – | A = B = 30 |
| situation 2 | +42.43 | +42.43 | −30.00 | −30.00 | −30.00 | A = B = 30 |
| situation 3 | −42.43 | −42.43 | +30.00 | – | – | A = 60 |
| situation 4 | +42.43 | −30.00 | +42.43 | −30.00 | −60.00 | A = 60 |

42.426 kN = 30√2; 30 kN = the horizontal thrust H = (F/2)·(b/h) = 30·(3/3).

Joint checks (situation 1, F = 60): at III, (0, +30) + 42.43·(−0.7071, −0.7071)
+ 30·(1, 0) = 0. At I, (0, −60) + 42.43·(0.7071, 0.7071) + 42.43·(−0.7071,
0.7071) = 0. Every joint of every situation closes to < 1e−12.

Force diagrams (all four are three or four points; a = the space below the
structure, b/c the spaces flanking the load, H = |N₃| the horizontal thrust):
- 1: load line x = 0 with b = (0, +30), a = (0, 0), c = (0, −30); pole
  V = (−30, 0). Rays: 2 = b–V, 3 = a–V, 1 = c–V. A = a→b, B = c→a, F₁ = b→c.
- 2: identical points, identical pole, colours inverted; members 4 and 5 fall ON
  the load line (they are vertical) and the key draws them offset beside it:
  4 = c→a coincides with A, 5 = a→b coincides with B.
- 3: b = (0, +30), a = (0, 0), c = (0, −30), pole V = (+30, 0) — on the OTHER
  side, because the support is now underneath. F₁ = b→a, F₂ = a→c, A = c→b.
- 4: b = (0, +30), a = (0, 0), c = (0, −30), T = (+30, +30), Bt = (+30, −30) —
  a rectangle. 2 = b–T, 1 = a–T, 5 = T–Bt, 3 = a–Bt, 4 = c–Bt.

The progression the four situations spell out:
1. **arch-cable, load on top** — two 45° struts in compression, the bottom chord
   a 30 kN tie. 2. **the same thing turned inside out** — the same 42.43 and 30,
   every sign reversed, plus two 30 kN posts that carry the reactions up to the
   working level. 3. **one support instead of two** — a bracket; the two loads
   halve, the total is unchanged, the diagonals are again 42.43 kN compression
   and the top chord 30 kN tension, but the single reaction is now 60 kN.
   4. **five members** — a real little truss: 42.43 kN tension diagonals,
   30 kN compression bottom chords and a **60 kN** compression post that takes
   the whole load straight into the support. That post is the largest force
   anywhere on the page, and it only appears at the last step.

**Official key says.** Four Cremona diagrams and four columns of joint polygons,
correctly drawn and correctly coloured (1 and 2 blue / 3 red in situation 1;
1 and 2 red / 3, 4, 5 blue in situation 2; 1 and 2 blue / 3 red in situation 3;
1 and 3 red / 2, 4, 5 blue in situation 4). **No numbers at all.**

**Agreement / disagreement.** Full agreement. Every colour in the key matches the
sign our solver returns, and the pole/vertex positions we compute reproduce the
key's drawn diagrams. No error found on this page. The one caveat is the
coordinator's brief, not the sheet: situation 2 has five members, not three.

**Interactive view.** `exX1_12.js`, view id `X1_12`, eight steps. One
`situation` slider (1 → 4) walks the progression; each situation is drawn as
form diagram (left) + Cremona (right) + the sheet's "subsystem" row of joint
polygons (bottom), with every member coloured by the sign our solver returns and
the force printed on it and on its ray. Steps: the exercise → the structure →
the reactions → the load line → closing every joint (the pole and H appear) →
the member forces → joint by joint → what carried over. Sliders for the total
load F (10–120 kN, default 60) and for the depth h (1.0–6.0 m, default 3.0)
recompute everything live — dropping h drives the diagonal and chord forces up
together, which is the arch-cable lesson; the drawing rescales itself so the
force diagram always fits. Toggles: the subsystem row, and labels. Every
form-diagram member is `dw.link`ed to its ray, and `parallel.py --live` was run
in all four situations (0 non-parallel pairs each). The final caption names, per
situation, which forces are unchanged from the previous one and which are new.
RESULT lines: the member forces and reactions of the current situation, the two
magnitudes that run through all four, the 60 kN post that only situation 4 has,
and the note that the key prints no numbers so these are ours.

---

## Task 13 — Bridge (p. 13)

**Text (verbatim, English sheet).**
"a) The form of the top chord of an arch-cable-structure for a bridge is given.
Using the force diagram, find the form of the bottom chord for the given loading
case. Note that the support B is a roller. Colour tension forces red,
compression forces blue and the external forces green."
"b) The structure is to be modified such that the force in the bottom chord is
constant. Describe in words how the form of the structure would change. Sketches
in the position and force plan can help."

**Givens.** F₁ = F₂ = F₃ = F₄ = F₅ = 20 kN, five vertical point loads on the five
dash-dot axes, applied at the **top** chord nodes (the key's joint polygons put
each F at a top node). Form diagram 1:100, force diagram 1 cm ≙ 10 kN. Support A
is a pin, support B is a **roller**. Members are numbered in the key 1–6 (top
chord, left to right), 7–11 (the five struts) and 12–17 (bottom chord).

**Geometry.** Origin: support A, at deck level.
`$PY web/tools/sheetvec.py web/pdf/EXX-additional-exercises-sd-i-task-en.pdf 13
 --scale 100 --min 0.4 --cluster` (task page, given top chord) and the same on
the solution PDF (answer geometry + force diagram).

| point | sheetvec x, y [m] | x from A [m] | y above deck [m] |
|---|---|---|---|
| A (pin)   | 8.726, 21.883 | 0.000 | 0 |
| T₁        | 10.226, 22.883 | 1.500 | 1.000 |
| T₂        | 13.225, 24.083 | 4.499 | 2.200 |
| T₃ (crown)| 16.224, 24.482 | 7.498 | 2.599 |
| T₄        | 19.223, 24.083 | 10.497 | 2.200 |
| T₅        | 22.222, 22.883 | 13.496 | 1.000 |
| B (roller)| 23.721, 21.883 | 14.995 | 0 |

Round to the drawn intent: span **15.00 m**, load axes at **1.5, 4.5, 7.5, 10.5,
13.5 m** (3.00 m apart, half a bay from each abutment), top chord heights
**1.00 / 2.20 / 2.60 / 2.20 / 1.00 m**. Everything comes out round, which
validates 1:100. The layout is symmetric, and that matters (see below).

Top-chord segment slopes: 0.66667, 0.40000, 0.13333, −0.13333, −0.40000,
−0.66667 — the decrement is **0.26667 at every node**, i.e. the given top chord
is exactly the funicular polygon of five equal 20 kN loads for a pole distance
of 20/0.26667 = **75 kN**. That is not an accident of drawing; it is what makes
the sheet's own answer work out in round numbers.

**Derivation.**

*Why both reactions are purely vertical.* Loads are vertical, so by symmetry
A_v = B_v = 50 kN. Each chord carries only vertical external forces (the loads
at the top nodes, the vertical strut forces at both), so the horizontal
component of each chord force is **constant** along that chord: call them H_top
and H_bot. At B, the roller takes no horizontal force, and only members 6 and 17
meet there, so H_top = H_bot = H. At A the same two chords meet, so their
horizontal components cancel there too and **A_h = 0**. The arch is
self-anchored by its own bottom chord; the thrust never reaches the ground.
(This corrects the framing in the coordinator's brief: the horizontal thrust does
NOT all go to A — it goes to the tie. What the roller at B buys you is precisely
that H_top = H_bot, which is what makes one single pole distance serve both
chords and the whole force diagram close.)

*The construction.* With the load line vertical, L_i = (0, −20i) for i = 0…5 and
the pole O = (0, −A_v) = (0, −50):
- top-chord ray i+1 runs L_i → P_i with P_i = (−H, −20i − H·m_i);
- all six P_i sit on the vertical x = −H, so the segments between them are
  vertical: those are the five strut forces
  S_i = 20 + H(m_i − m_{i−1}) = **20 − 0.26667 H**, equal for all five;
- bottom-chord ray 12+i runs P_i → O, with form-diagram slope
  m_i − (50 − 20i)/H;
- the bottom chord drawn from A with those six slopes lands back on B.

*The closure is automatic — so H is a free parameter.* Summing the bottom-chord
rise over the six bays, Σ Δ_i·m_i = 0 (the top chord closes) and
Σ Δ_i (50 − 20 i) = 0 is nothing but the global moment equation that already
fixed A_v = 50. So the bottom chord closes at B for **every** H, and the answer
to a) is a **one-parameter family**, not a single form. This is a real property
of the problem, not a modelling choice: the truss has 12 joints, 17 members and
3 reaction components, i.e. 24 equations against 20 unknowns, and the four
missing conditions are absorbed by the five unknown bottom-chord ordinates —
leaving exactly one free.

*Which H the key used.* From the solution's own force diagram (sheetvec, at
1 unit = 1 cm on paper = 10 kN): load line at x = 16.162 with the divisions
14.470, 12.471, 10.471, 8.472, 6.473, 4.474 (spacing 1.999 ⇒ 20.0 kN each,
100 kN total); pole at (16.162, 9.472), i.e. 4.998 below the top ⇒ A = 50.0 kN;
the P-line at x = 11.164 ⇒ **H = 4.998 units = 50.0 kN exactly**. The five
strut segments measure 0.667, 0.666, 0.666, 0.667, 0.666 ⇒ S = 6.67 kN each,
which is 20 − 0.26667·50 ✓.

*Answers for a) with the key's H = 50 kN.* Bottom-chord ordinates below deck
**0.500, 1.100, 1.300, 1.100, 0.500 m** (the solution PDF digitises 0.500,
1.100, 1.299 — agreement to 1 mm at full scale).

| member | 1 / 6 | 2 / 5 | 3 / 4 | 7…11 | 12 / 17 | 13 / 16 | 14 / 15 |
|---|---|---|---|---|---|---|---|
| force [kN] | 60.09 | 53.85 | 50.44 | 6.67 | 52.70 | 50.99 | 50.11 |
| sense | compr. | compr. | compr. | compr. | tens. | tens. | tens. |

Reactions A = B = 50.0 kN vertical, A_h = 0. Cross-check against the drawn
force diagram: rays measure 6.007, 5.383, 5.009 (top), 5.269, 5.097, 5.009
(bottom) units ⇒ 60.07, 53.83, 50.09 and 52.69, 50.97, 50.09 kN — agreement to
0.03 kN, i.e. to the width of the line.

Limits of the family: H → 75 kN flattens the bottom chord onto the straight line
A–B and the struts go to zero (the top chord alone is then the funicular);
H > 75 kN reverses the struts into tension and hogs the bottom chord above the
deck; small H sags it deeply (at H = 30 kN the mid-depth is 3.47 m).

*b) constant force in the bottom chord.* Reconstructed exactly from the key's
pale second drawing. In the force diagram a constant bottom-chord force means
all six points P_i lie on a **circle of radius C about the pole O**. The key
keeps the six bottom-chord DIRECTIONS of a) and slides each P_i out along its
own radius until |O P_i| = C, with C = |O P₀| = **52.70 kN**, the largest of the
a) forces (which is why the end member 1 and its ray are the only ones that do
not move). Consequences, all of them visible:
- the P_i no longer lie on a vertical line, so the segments between them —
  the strut forces — are **no longer vertical: the struts tilt**;
- the horizontal component of the bottom chord is no longer constant, which is
  exactly what the tilted struts supply;
- the top chord ray directions change with the P_i, so the arch **flattens**
  slightly: crown 2.512 m instead of 2.599 m.

b) numbers: bottom chord 52.70 kN tension in all six members; top chord
60.09 / 55.30 / 52.99 / 52.99 / 55.30 / 60.09 kN compression; struts
6.55 / 6.89 / 7.01 / 6.89 / 6.55 kN compression, leaning inward at the ends and
almost upright at mid-span. New node coordinates (x from A, y above deck):
top (1.500, 1.000), (4.500, 2.141), (7.500, 2.512); bottom (1.134, −0.378),
(4.087, −0.969), (7.500, −1.196).

**Official key says.** a) the drawn bottom chord with depths 0.500 / 1.100 /
1.299 m, vertical struts, a force diagram with pole distance 50.0 kN, all
top-chord rays and struts blue, all bottom-chord rays red, reactions green. No
numeric member forces are printed. b) in words: *"If the tension force in the
lower chord is constant, the struts between the top and bottom chords will tilt,
i.e. they will no longer be vertical."* — plus a pale second drawing of exactly
that structure and its force diagram.

**Agreement / disagreement.** Our a) geometry reproduces the key's to 1 mm and
our forces reproduce its drawn ray lengths to 0.03 kN. Our b) reconstruction
reproduces every node of the key's pale drawing to 3 mm and every ray of its
second force diagram to 0.01 units. **No error found in the key.** Two things
the key leaves unsaid and that the view states:
1. a) has **no unique answer** — H = 50 kN is a choice, not a result. Any
   0 < H < 75 kN gives an equally valid bottom chord. The key neither says so
   nor explains where 50 came from.
2. the roller at B does not send the thrust to A; it makes **both** reactions
   purely vertical and the arch self-anchored (A_h = 0).

**Interactive view.** `exX1_13.js`, view id `X1_13`. Steps: the given top chord
and loads → why A_h = 0 → load line and pole → the six top-chord rays and the
P-line (whose gaps are the strut forces) → the bottom-chord rays and the bottom
chord drawn bay by bay, closing on B → all member forces → the free parameter →
b). Controls: `H` (the pole distance, 20–74 kN, default the key's 50), `F` (the
five equal loads, 5–40 kN, default 20), `constB` (the b) toggle — switch it and
the struts visibly lean while the bottom-chord rays snap onto one circle),
`ghostA` (keep a) as a pale overlay while b) is on), and labels. RESULT lines:
the bottom-chord depths, the three distinct top-chord and bottom-chord forces,
the strut force, the reactions, the statement that H is free with the value
chosen, and — when `constB` is on — b) in words plus the constant force and the
new crown height.

---

## Task 14 — Span and cantilever · Combination of two arch-cable structures (p. 14)

**Text (verbatim, English sheet).**

*Task 14.1 — Span and cantilever.* "Design the form of a possible arch-cable
structure for the given loading case with the means of graphic statics. Draw
tension forces in red, compression forces in blue and reaction forces in green."
— sub-figure **a)** carries F1 and F2 between the supports; sub-figure **b)**
carries a single F3 outside them.

*Task 14.2 — Combination of two arch-cable structures.* "Transfer your geometry
of your solutions from task 14.1 a) by superimposing the form diagrams of a) and
b) into one arch-cable structure. Draw the corresponding force diagram. Indicate
the direction of the support forces. Draw the tension forces in red, compression
forces in blue and reaction forces in green."

The English 14.2 says "your solutions from task 14.1 a)" where it plainly means
a) **and b)** — the German is correct ("Übernehmen Sie die Geometrie ihrer
Tragwerke aus Aufgabe 14.1"). The German 14.1 also asks for the support
directions, which the English drops. Both slips are cosmetic.

**Givens.** a) F1 = 60 kN, F2 = 30 kN. b) F3 = 30 kN. 14.2 all three.
All loads vertical, downward. A = pin (left), B = roller (right).
Form diagram 1:100 · force diagram 1 cm ≙ 10 kN. The sheet prints no
coordinates, no rise, no member forces: everything below is derived.

**Geometry.** Origin = support **A** (the apex of the left support triangle),
x to the right, y up. Digitised with

```
$PY web/tools/sheetvec.py web/pdf/EXX-additional-exercises-sd-i-task-en.pdf 14 \
        --scale 100 --min 0.2 --cluster
```

which puts all three sub-figures on the same set of vertical lines (sheetvec's
own shifted page origin in brackets):

| point | sheetvec x [m] | x − x_A [m] | intended |
|---|---|---|---|
| A, support apex (a / b / 14.2) | 6.687 | 0 | 0 |
| F1 load line | 7.687 | 1.000 | **1.00** |
| F2 load line | 9.187 | 2.500 | **2.50** |
| B, support apex | 12.685 | 5.998 | **6.00** |
| F3 load line | 14.185 | 7.498 | **7.50** |

A and B are at the same height in all three figures (y = 24.976 / 15.224 / 0.417
for a / b / 14.2). The four x-stations come out round to 2 mm at 1:100, which
validates the scale; the views use the exact 1.00 / 2.50 / 6.00 / 7.50 m.

The solution page was digitised the same way (`solution-en.pdf`, page 14,
`--scale 100`) and gives the key's *chosen* form, again relative to A:

| | a) | b) | 14.2 |
|---|---|---|---|
| node on F1 (I) | (1.000, 1.826) | — | (1.000, 1.826) |
| node on F2 (II) | (2.499, 2.131) | — | (2.499, 2.130) |
| node on F3 (T) | — | (7.498, 2.435) | (7.498, 2.435) |

— i.e. 14.2's form diagram is *exactly* a) and b) laid on top of each other, to
the last digitised millimetre. The key even breaks member 4 at (3.912, 1.270)
where it crosses member 3; the crossing computed from the two node sets is
(3.913, 1.272). ✓

**Derivation.**

*Reactions.* A and B are both **vertical** in all three cases: the roller B
takes no horizontal force, and at the pin A the horizontal pull of the tie
exactly cancels the horizontal push of the arch, so nothing is left for the pin.

```
a)    B = (60·1.00 + 30·2.50)/6.00 = 135/6 = 22.5 kN ↑     A = 90 − 22.5 = 67.5 kN ↑
b)    B = (30·7.50)/6.00           = 225/6 = 37.5 kN ↑     A = 30 − 37.5 = −7.5 kN → 7.5 kN ↓
14.2  A = 67.5 − 7.5 = 60.0 kN ↑   B = 22.5 + 37.5 = 60.0 kN ↑
      check directly: B = (60·1 + 30·2.5 + 30·7.5)/6 = 360/6 = 60 ✓
```

*"A possible structure" = one free parameter each.* Both a) and b) are
form-finding problems, not analysis problems, and the free parameter is the
horizontal thrust — H_a for a), H_b for b). Everything else follows from it,
because with vertical loads every member of one chain carries the same
horizontal component and each node needs `H·(m_left − m_right) = F`:

```
a)   H_a·m(A→I)  = 67.5      →  y_I  = 67.50/H_a · 1.00 = 67.50/H_a
     H_a·m(I→II) =  7.5      →  y_II = y_I + 7.5·1.50/H_a = 78.75/H_a
     H_a·m(II→B) = −22.5     →  closes at B: 78.75 − 22.5·3.50/... = 0 ✓
     N1 = √(H_a²+67.5²) C · N2 = √(H_a²+7.5²) C · N4 = √(H_a²+22.5²) C · tie N3 = H_a T

b)   the triangle A–B–T:  H_b·y_T/7.50 = 7.5 (node A)  and  H_b·y_T/1.50 = 37.5 (node B)
     both give   H_b·y_T = 56.25     →  y_T = 56.25/H_b
     N1 = √(H_b²+7.5²) T (the tie A→T) · N2 = √(H_b²+37.5²) C (strut B→T) · N3 = H_b C (strut A–B)
```

Note the sign flip on the member between the supports: in a) it is a **tie**
(tension H_a), in b) a **strut** (compression H_b). That is the whole of 14.2.

*14.2 by superposition.* Keep both geometries, so both equilibrium states live
on the same set of members; add them. Members 1, 2, 3 (= a)'s 1, 2, 4) keep
a)'s forces; members 4, 6 (= b)'s 1, 2) keep b)'s; only member 5 is shared and
its force is the **sum of a signed pair**:

```
N5 = (tie of a)  +  (strut of b)  =  H_a − H_b        tension if H_a > H_b
```

Node checks on the combined structure, for *any* H_a, H_b:
at A, ΣH = −H_a + H_b + (H_a − H_b) = 0 and ΣV = −67.5 + 7.5 + 60 = 0;
at B, ΣH = +H_a − H_b − (H_a − H_b) = 0 and ΣV = −22.5 − 37.5 + 60 = 0. ✓
So the combination closes for every pair of thrusts — which is exactly why
"a possible structure" is allowed to be free.

*The force diagram of the combination is the two force diagrams stacked.*
With the load line vertical and its origin at the F1/F2 division:

```
load line   p_top (0,+60) · p1 (0,0) · p2 (0,−30) · p3 (0,−60)
            A = p1→p_top (60↑) · F1 = p_top→p1 · F2 = p1→p2 · F3 = p2→p3 · B = p3→p1 (60↑)
left pole   O1 = (−H_a, −7.5)       ← a)'s pole, unmoved
right pole  O2 = (+H_b, −22.5)      ← b)'s pole, unmoved, dropped by B_a = 22.5
vertex      V  = (−(H_a−H_b), 0)
rays        1: O1–p_top   2: O1–p1   3: O1–p2   4: O1–V and p2–O2
            5: V–p1 (horizontal, length H_a−H_b)   6: p3–O2
            V–O2 closes node B and is parallel to member 3
```

a)'s fan and b)'s fan keep their shape and their pole distance; the merge only
(i) stacks F3 under F2 on one load line, (ii) adds the two reactions
(67.5 − 7.5 = 60, 22.5 + 37.5 = 60), and (iii) shortens the horizontal tie ray
from H_a to H_a − H_b. Nothing else in either diagram moves.

**Official key says.** No numbers anywhere on the page — only the drawn answer.
Digitising the solution page gives the key's chosen thrusts as pole distances
of 3.692 cm and 2.308 cm, i.e. **H_a = 36.92 kN and H_b = 23.08 kN** (both very
close to a round 3.7 cm / 2.3 cm on the drawing board; their sum is 6.000 cm =
60.00 kN, which may or may not have been intended). At those values:

| | key, measured off the drawing | derived here |
|---|---|---|
| a) A / B | 67.46 / 22.50 kN ↑ | 67.50 / 22.50 |
| a) 1 / 2 / 3 / 4 | 76.91 C / 37.67 C / 36.92 T / 43.24 C | 76.94 / 37.67 / 36.92 / 43.24 |
| a) y_I / y_II | 1.826 / 2.131 m | 1.828 / 2.133 |
| b) A / B | 7.50 ↓ / 37.48 ↑ kN | 7.50 ↓ / 37.50 ↑ |
| b) 1 / 2 / 3 | 24.27 T / 44.02 C / 23.08 C | 24.27 / 44.03 / 23.08 |
| b) y_T | 2.435 m | 2.437 |
| 14.2 A / B | 59.97 / 59.97 kN ↑ | 60.00 / 60.00 |
| 14.2 1…6 | 76.91 C / 37.67 C / 43.24 C / 24.27 T / **13.84 T** / 44.02 C | 76.94 / 37.67 / 43.24 / 24.27 / **13.84** / 44.03 |

The key's own two poles sit at (−3.692, −0.749) and (+2.308, −2.249) from the
F1/F2 division of its load line, and its vertex V at (−1.384, 0) — the three
positions predicted above, to the drawn millimetre.

**Agreement / disagreement.** **No disagreement.** Every derived quantity agrees
with the key to the accuracy the drawing can carry (≤ 0.05 kN, ≤ 0.003 m — i.e.
0.03 mm on the sheet). The only defects on the page are the two wording slips
noted at the top (English 14.2 omits "and b)", and omits the support-direction
request that the German makes). Both are carried in the view's header and in a
step caption.

**Interactive view — `exX1_14.js`** (view id `X1_14`).
Three parts on one stage slider (`part`: a) · b) · a)+b) — the step player drives
it, the slider overrides). Steps: the exercise → a) given → a) reactions → a)
choose the thrust, the form appears → a) force diagram → b) given (the overhang)
→ b) reactions, A pulls **down** → b) form + force diagram → 14.2 superimpose the
two form diagrams (both drawn pale underneath the combined one) → 14.2 the force
diagram, with a)'s fan and b)'s fan left visible in grey exactly where they land
→ 14.2 the shared member 5, and what happens when H_b > H_a.

Controls: `H_a` (a)'s thrust, 12–80 kN, default 36.92 = the key's) and `H_b`
(b)'s thrust, 8–60 kN, default 23.08 = the key's); a toggle for the two pale
component diagrams; a toggle for the member/force labels. Both load values are
sliders too, so the superposition can be re-tested on a different load case.

RESULT lines: the three reaction pairs; the member forces of a) and b); the
combined member forces with member 5 called out as H_a − H_b and its sign; and
the standing check that A + B = ΣF and that the combination closes for every
thrust pair.

---

## Task 15 — Cantilever of an arch-cable structure · Arch-cable structure (p. 15)

**Text (verbatim, English sheet).**

*Task 15.1 — Cantilever of an arch-cable structure.* "Design the cantilever of
the arch-cable structure so that the horizontal force of the cantilever cancels
out the horizontal force of the given arch. Draw the tension forces in red,
compression forces in blue and reaction forces in green."

*Task 15.2 — Arch-cable structure.* "A fourth force is added to the loading case
of the Task 15.1. Design the form of a possible arch-cable-structure for the
given loading case with the means of graphic statics. Pay attention to the
roller B where the horizontal forces have to cancel out. Draw tension forces in
red, compression forces in blue and reaction forces in green."

The German 15.1 is sharper and says where the cancellation happens: "Wählen Sie
die Auskragung so, dass die horizontale Komponente der Auskragung **am
Rolllager B** die des vorgegebenen Bogens aufhebt."

**Givens.** 15.1: F1 = 60, F2 = 30, F3 = 30 kN, plus the arch A–I–II–B already
drawn (members 1, 2, 3); the cantilever is members 4 and 5. 15.2: F1 = 60,
F2 = 30, F4 = 45, F3 = 30 kN and nothing drawn at all; members 1…6.
All loads vertical, downward. A = pin, B = roller.
Form diagram 1:100 · force diagram 1 cm ≙ 15 kN.
**The key prints no number anywhere on this page** — every figure below is
derived here and only then compared with the key's drawn geometry.

**Geometry.** Origin = support **A**, x right, y up. Digitised with

```
$PY web/tools/sheetvec.py web/pdf/EXX-additional-exercises-sd-i-task-en.pdf 15 \
        --scale 100 --min 0.2 --cluster
```

15.1 (upper figure) — support apexes A (5.602, 17.081) and B (14.599, 17.081),
load lines at x = 7.102, 9.351, 16.848; the given arch runs
(5.602,17.081)–(7.102,18.858)–(9.354,19.154)–(14.599,17.081).
15.2 (lower figure) — A (5.604, 0.417), B (14.601, 0.417), load lines at
x = 7.104, 9.353, 11.602, 16.850.

Relative to A, both figures give the same stations:

| station | x − x_A [m] | intended |
|---|---|---|
| F1 | 1.500 | **1.50** |
| F2 | 3.749 | **3.75** |
| F4 (15.2 only) | 5.998 | **6.00** |
| B | 8.997 | **9.00** |
| F3 | 11.246 | **11.25** |
| node I of the given arch (15.1) | (1.500, **1.777**) | |
| node II of the given arch (15.1) | (3.752, **2.073**) | |

A and B are at the same height in both figures. Every x comes out round to 3 mm
at 1:100; the views use the exact 1.50 / 3.75 / 6.00 / 9.00 / 11.25 m. The two
arch node heights are *not* round — they encode the thrust, see below.

**Derivation.**

*Reactions.* Both supports come out **vertical** (the roller cannot take
horizontal force; at the pin the tie's pull cancels the arch's push), so simple
statics gives them and they do not depend on any design choice:

```
15.1  B = (60·1.50 + 30·3.75 + 30·11.25)/9.00 = 540/9  = 60.0 kN ↑   A = 120 − 60 = 60.0 kN ↑
15.2  B = (60·1.50 + 30·3.75 + 45·6.00 + 30·11.25)/9.00 = 810/9 = 90.0 kN ↑
      A = 165 − 90 = 75.0 kN ↑
      equivalently R = 165 kN at x̄ = 810/165 = 4.909 m from A →
      A = 165·(9.000−4.909)/9.000 = 75.0, B = 165·4.909/9.000 = 90.0 ✓
```

*15.1 — the given arch already carries a number: its thrust.* With vertical
loads every arch segment carries the same horizontal component H, and each node
needs `H·(m_left − m_right) = F`. The drawn arch gives that number twice:

```
m1 = 1.777/1.500 = 1.18467   m2 = (2.073−1.777)/2.250 = 0.13156   m3 = −2.073/5.250 = −0.39486
H = F1/(m1−m2) = 60/1.05311 = 56.974 kN        H = F2/(m2−m3) = 30/0.52641 = 56.990 kN
```

The two agree to **0.03 %**, which is the check that the printed arch really is
the funicular of 60/30 — and 56.98 kN is 3.799 cm at the sheet's 15 kN/cm, i.e.
the arch was drawn with a **3.80 cm pole distance = H_arch = 57.00 kN** exactly.
The view uses the exact funicular of H_arch (default 57.00 kN), which reproduces
the drawn node heights as 1.7763 and 2.0724 m — 0.4 mm from the digitised ones.

*15.1 — the cantilever, and the number the task is after.* The cantilever is the
tie 4 from A out to the tip T on F3's line (it flies straight over B) and the
strut 5 from B up to T. Its only free parameter is the tip height y_T. At T the
three forces F3, N4 and N5 must close, and since N4 and N5 have equal and
opposite horizontal components — call that H_cant — the vertical equation reads

```
H_cant·( y_T/(x_T−x_B) )  −  H_cant·( y_T/x_T )  =  F3
H_cant·y_T·(1/2.25 − 1/11.25) = 30      →      H_cant · y_T = 84.375 kN·m
i.e.   H_cant(y_T) = 84.375 / y_T   kN
```

**The design condition is H_cant = H_arch**, because those two are the only
horizontal forces meeting at the roller B and B cannot supply any:

```
y_T*  =  84.375 / H_arch  =  84.375 / 57.00  =  1.4803 m      ← THE ANSWER of 15.1
```

Then, and only then, everything else closes:

```
member 1  A→I    N = √(57.00² + 67.50²) = 88.35 kN  C
member 2  I→II   N = √(57.00² +  7.50²) = 57.49 kN  C
member 3  II→B   N = √(57.00² + 22.50²) = 61.28 kN  C
member 4  A→T    N = √(57.00² +  7.50²) = 57.49 kN  T      (the tie)
member 5  B→T    N = √(57.00² + 37.50²) = 68.23 kN  C
node A   ΣH: −57.00 + 57.00 = 0 ✓   ΣV: −67.50 + 7.50 + 60.00 = 0 ✓
node B   ΣH: +57.00 − 57.00 = 0 ✓   ΣV: −22.50 − 37.50 + 60.00 = 0 ✓   ← the headline check
node T   ΣH: +57.00 − 57.00 = 0 ✓   ΣV: +37.50 −  7.50 − 30.00 = 0 ✓
```

A small gift of the sheet's numbers: the tie 4 and the arch segment 2 both carry
a vertical component of exactly 7.50 kN over the same thrust, so they are
**exactly parallel and exactly equal in magnitude** (57.49 kN, one in tension,
one in compression). That is why the key's force diagram shows the rays "2" and
"4" lying on top of one another.

*15.2 — the whole form, with one free parameter.* Now nothing is drawn, so the
thrust H is the designer's choice; every node height is 1/H times a fixed
number. Working from A with the tie's vertical component H·m5 = 84.375/11.25 =
7.50 kN (the same cantilever relation as in 15.1, since F3, x_T and x_B are
unchanged):

```
H·a1 = A + 7.50 = 82.50   (A→n1)          y1 = 82.50·1.50/H            = 123.750/H
H·a2 = 82.50 − 60 = 22.50 (n1→n2)         y2 = y1 + 22.50·2.25/H       = 174.375/H
H·a3 = 22.50 − 30 = −7.50 (n2→n3)         y3 = y2 −  7.50·2.25/H       = 157.500/H
H·a4 = −7.50 − 45 = −52.50 (n3→B)         y_B = y3 − 52.50·3.00/H      = 0        ✓ closes exactly
H·m5 = 7.50  (tie A→T)                    y_T = 84.375/H
H·m6 = 84.375/2.25 = 37.50 (strut B→T)    check at B: 37.50 + 52.50 = 90.00 = B ✓
```

so the arch closes on B for **every** H — the closure is just global moment
equilibrium restated — and the roller condition is satisfied identically:
member 4 delivers +H to B and member 6 delivers −H. Member forces:

```
1 = √(H²+82.50²) C   2 = √(H²+22.50²) C   3 = √(H²+7.50²) C
4 = √(H²+52.50²) C   5 = √(H²+ 7.50²) T   6 = √(H²+37.50²) C
at H = 60.00 kN:  102.01 / 64.08 / 60.47 / 79.73 / 60.47 / 70.75 kN
node heights:      y1 2.063 · y2 2.906 · y3 2.625 · y_T 1.406 m
```

Here members 3 and 5 carry the identical 60.47 kN (mirror slopes ±7.50/H), one
compression, one tension.

**Official key says.** Nothing in words or numbers; only the drawn answer, which
digitises (`solution-en.pdf` page 15, `--scale 100`) as:

*15.1* — A (5.425, 24.400), B (14.422, 24.400), **tip T (16.668, 25.880)**, i.e.
**y_T = 1.480 m** above the supports. Force diagram: load line 7.997 cm = 119.96
kN, split 60 / 30 / 30; left pole 3.795 cm from it (**56.93 kN**), right pole
3.794 cm (**56.91 kN**); rays 5.884 / 3.827 / 4.080 / 3.827 / 4.543 cm =
**88.26 / 57.41 / 61.20 / 57.41 / 68.15 kN**; reactions both 3.998 cm = 60.0 kN.

*15.2* — A (5.427, 7.744), B (14.424, 7.744), nodes (1.499, 2.058), (3.748,
2.900), (5.998, 2.619) and tip (11.246, 1.403) relative to A — a pole distance
of 4.007 cm, i.e. **H ≈ 60.1 kN**. Load line 10.996 cm = 164.9 kN split
60/30/45/30; the division point **i** (labelled on the key) sits 4.998 cm below
the top → **A = 74.97 kN**, and 5.998 cm above the bottom → **B = 89.97 kN**.
Rays 6.803 / 4.278 / 4.038 / 5.319 / 4.038 / 4.722 cm = **102.05 / 64.17 /
60.57 / 79.79 / 60.57 / 70.83 kN**. The key also draws, in the form diagram, the
resultant **R** on a line of action 4.907 m right of A, a trial funicular in
pale red with its closing string dashed, and in the force diagram the trial pole
**o′** 5.060 cm right of the load line at the height of i — the classical route
to R and to the reaction split. The direct moment equation gives the same i.

**Agreement / disagreement.** **No disagreement.** Every derived number lands on
the key's drawn geometry within the drawing's own accuracy:

| | derived | key, measured | Δ |
|---|---|---|---|
| 15.1 H_arch | 57.00 kN | 56.93 / 56.91 | 0.13 % |
| 15.1 **y_T** | **1.4803 m** | **1.480 m** | 0.3 mm at 1:100 |
| 15.1 members 1–5 | 88.35 / 57.49 / 61.28 / 57.49 / 68.23 | 88.26 / 57.41 / 61.20 / 57.41 / 68.15 | ≤ 0.10 % |
| 15.1 A = B | 60.00 kN ↑ | 59.97 | ✓ |
| 15.2 A / B | 75.00 / 90.00 kN ↑ | 74.97 / 89.97 | ✓ |
| 15.2 R at x̄ | 165 kN at 4.909 m | 4.907 m | 2 mm |
| 15.2 node heights at H = 60.1 | 2.059 / 2.901 / 2.621 / 1.404 | 2.058 / 2.900 / 2.619 / 1.403 | ≤ 2 mm |

The only thing worth flagging is not an error but a silence: the sheet never
states that the given arch of 15.1 *is* the funicular of F1 and F2 — the reader
has to notice it, and if it were not, the task would have no solution. The view
makes that check its second step.

**Interactive view — `exX1_15.js`** (view id `X1_15`).
Two parts on a stage slider (`part`: 15.1 · 15.2), driven by the step player.
Steps: the exercise → 15.1 the given arch, and the check that it is funicular →
15.1 its thrust H_arch → 15.1 the cantilever's own relation H_cant = 84.375/y_T
→ 15.1 the design condition at B, with the unbalanced horizontal force drawn as
a red arrow at B that shrinks to nothing at y_T = 1.480 m → 15.1 the finished
force diagram and the three node checks → 15.2 the fourth load, R and the point
i → 15.2 choose the thrust, the whole form appears → 15.2 the force diagram,
with the roller condition read straight off it.

Controls: `H_arch` (15.1's given arch, 40–90 kN, default 57.00), `yT`
(15.1's design variable, 0.6–3.0 m — dragging it releases the auto-solve and
makes the residual at B visible), `auto` (put y_T back on the solution),
`H` (15.2's thrust, 35–110 kN, default 60.00 = the key's), plus the four load
magnitudes and a label toggle.

RESULT lines: **15.1 y_T = 1.480 m** with H_cant = H_arch = 57.00 kN and the
residual at B; the five 15.1 member forces and A = B = 60 kN; **15.2 A = 75,
B = 90 kN, R = 165 kN at 4.909 m**, the six member forces at the chosen thrust,
and the standing ΣH = 0 check at the roller.

---
