# The worked drawings against the official solutions — EX 1 … EX 7

Audited 2026-08-15/16 against `web/pdf/EX{1..7}-*-solution-en.pdf`, each cross-checked
against its German twin and against the unsolved task sheet. Until now every answer in
this project was **derived**, because the solutions were believed to be behind a login;
they are not, and this is the first time the derivations have been checked against the key.

Scope: `ex1_1 ex1_2 ex1_3 ex1_4 ex1_5 · ex2_1 ex2_2 ex2_3 · ex3_1a ex3_1b ex3_2 ex3_3 ex3_4 ·
ex4_1 ex4_2 ex4_3 · ex5_1 ex5_2 ex5_3 · ex6_1 ex6_2 ex6_3 ex6_4 ex6_5 · ex7_1 ex7_3 ex7_4`.
EX 8, 9, 10 and the two Additional sheets were audited separately.

**No view file and no `exercises.json` entry was edited in producing this report.**

## How the "official sheet" column was obtained

Only EX 2 prints its answers as numbers. EX 5, EX 6 and EX 7 print **no numbers at all**,
and EX 1, EX 3 and EX 4 print only a handful. So most of the "Official sheet" figures below
were **measured off the solutions' own vector artwork** — rendered at 300 dpi or converted
with `pdftocairo -svg`, endpoints taken in PostScript points, converted at the sheet's own
stated scales (form 1:50 / 1:100 / 1:200 / 1:500; force 1 cm ≙ 10 / 20 / 100 / 500 kN).

The technique is calibrated on every sheet where a printed number exists, and it reproduces
those numbers: EX 1 task 4 c) 60 kN measures 6.000 cm; EX 7 case d) returns
R₁ = 60.0 / R₂ = 89.9 / A = 37.5 / B = 187.4 kN against exact 60 / 90 / 37.5 / 187.5.
The sheets are drawn to better than 0.5 %, so **their member lengths are answers** — which
also means a view cannot claim "the sheet gives no number" as a defence.

## Coverage

Every task on EX 1–6, Creative tasks included, has a view. EX 7 has no `ex7_2.js` because
Task 2 is folded into `ex7_1` — deliberately, and the official solution does the same thing,
printing the Task 1 and Task 2 headings consecutively over one set of five figures.

---

## Ranked summary — the views that DIFFER, worst first

| # | View | Verdict | The defect in one line |
|---|---|---|---|
| 1 | **ex7_3** | MIXED | Both quantified "cost of the opening" figures are fabrications: `tieY` routes the tie *below* every opening unconditionally, giving **+567 %** for a door whose head a top chord clears by 0.374 m — which is what the sheet actually draws — and both penalties multiply the *support* moment by the *opening's* lever arm. |
| 2 | **ex7_4** | DIFFERS | Defaults to g_d = 7.5 kN/m when the official answer is **10.0** (the solution renders both load bars and builds its force diagram on the sum), so every default force is 25 % light; the existing toggle already reproduces −90 / +270 kN exactly. |
| 3 | **ex4_3** | DIFFERS | Draws the cathedral's right side as a mirror and its step 8 asserts "the same 600 kN at the pier head", but the sheet's right aisle has an inclined closing line and its pier carries **531.7 kN**; the single unified force diagram that is the task's actual deliverable is absent. |
| 4 | **ex1_4** | MIXED | Cases d) and f) have **N₁ and N₂ interchanged** in the RESULT panel — the sheet reads 30 T / 30 C, the view reads 30 C / 30 T — because `CASES` carries `a1: 330, a2: 30`. |
| 5 | **ex6_2/3/4/5** | MIXED | One defect, four views: `ex6_common.js` emits a grid of **disjoint joint polygons** where all four solved sheets draw a single nested **Cremona/Maxwell reciprocal diagram** — the reciprocity the exercise exists to teach — and its docstring wrongly asserts this is "the way the sheet asks for it". |
| 6 | **ex7_1** | MIXED | The force diagram contains **nothing but the load line** — no pole, no rays, no closing reactions, no tie — while Task 2's whole demand is the force diagram; and case b) is painted blue-top / pink-bottom over all 10 m, contradicting the view's own result bar and the one instruction the sheet repeats in every task. |
| 7 | **ex5_3** | MIXED | The thrust line **misses the roller in b), c), d) and e)** — the tie is forced horizontal, so the line dips ~1.6 m below support B with no member joining them — and the inflection point is dead code in all five cases (`NSEG = 60` puts every true zero exactly on a sample node), so step 5 prints "changes side at x = —". |
| 8 | **ex2_3** | MIXED | The force diagram is drawn **on top of** the form diagram (load line and pole across the deck and the right cable), and the sheet's actual method for a) — extending the two end cable segments to a concurrency point on the resultant's line of action — is not constructed at all. |
| 9 | **ex5_1** | MIXED | The **A_h / A_v decomposition the task explicitly demands** is not drawn (the sheet draws eight labelled component arrows closing the force diagram as a rectangle); c) has no ray fan; and `53.8 kN` is printed at the crown where the arch force is 40.8 kN. |
| 10 | **ex3_4** | MIXED | Correctly catches the key contradicting itself (table A = 3000, sentence A = 3500) but then **adopts the key's inflated 3000/3500 as its target** and back-solves Δ = 14.70 m / f = 6.72 m, where the key drew Δ = 13.83 m / f = 6.95 m — inconsistent with how `ex3_3` rejects the identical slip. |
| 11 | **ex2_2** | MIXED | Stops at the raw **20.6 mm** where the sheet's stated answer to b) is the catalogue size **21 mm** (its sibling `ex2_3` does apply `Math.ceil`), and the anchor reactions A and B are not drawn in either diagram. |
| 12 | **ex4_1** | MIXED | Task c) inverts the arch into a cable where the sheet draws a second, *higher arch*, so the family of arches the sheet is pointing at is never shown; and point **i** sits at the pole's level in case b) instead of on the closing-line ray. |
| 13 | **ex3_2** | MIXED | The closing strings **CS/SL and CS′/SL′ are neither drawn nor labelled**, though the task says "then fix the direction of the reaction forces" and the official plate labels both in both plans. |
| 14 | **ex6_1** | MIXED | Diagram C prints `11 + 3 − 12 = +2` against the sheet's `15 + 3 > 16`: the sheet counts the two diagonal **crossings as pinned joints**. Same answer, different printed line; the view's convention is the standard one and is stated, the sheet's is not. |
| 15 | **ex1_3** | AGREES* | Numbers and verdict exact, but the docstring claims "the sheet's checkbox answer is 'not stable'" when **neither box is ticked** in either language, its `x̄ = 16.11` is stale (live 34.11), and it reports x̄ / patch / miss in drawing units rather than the sheet's metres. |

Views that agree outright: **ex1_1, ex1_2, ex2_1, ex3_1a, ex3_1b, ex4_2, ex5_2** —
and `ex3_1b` is *more* complete than the key, drawing the "one further tangent" task 1c
demands in both plans where the official plate draws it in neither.

## Where the OFFICIAL sheet is wrong

| Sheet | The error | Proof |
|---|---|---|
| **EX 3, task 3 d) and e)** | Every force scaled off the p. 3 force plan is **2.56 % too large** — the printed 5915 kN and 11 830 kN should be 5788 and 11 576, which is what the view prints. | The key computes R = 2437.5 kN in part c), then lays R off on its own plan as a line 141.6 pt = **5.00 cm**, which at its stated 1 cm ≙ 500 kN is 2500 kN. The correct length is 4.875 cm. 2500/2437.5 = 1.0256. The same slip inflates the Creative task's 3000 / 3500 by 2.6 %. |
| **EX 3, Creative** | The key **contradicts itself**: its table reads A = 3000 kN, the sentence below it reads A = 3500 kN. | With H = 2948.8 kN, A = 3500 forces A_v = 1885.4 kN, so the verticals would sum to 3771 kN against 2437.5 kN of applied load. `ex3_4` is right to reject it. |
| **EX 3, task 3** | The key's own plate violates the task's "10 m above ground": supports at 13.28 m, crown at 9.76 m. The answer is only determined to ±6 % and neither the key nor the view says so. | Fixing it by moving the wall to 13.5 m gives f = 3.5 m; fixing it by putting the crown at 10.0 m gives f = 3.28 m and N = 6160 kN. Both are legitimate readings of the same sheet. |
| **EX 1, Creative b)** | The sheet's own "stable" four-box design **tips**. | Its force diagram draws all four load vectors at 70.84 pt = 50 kN instead of 60 / 60 / 40 / 30, and its F-labels are permuted off the boxes they name (the box it calls F₁ measures 0.5 × 1.5 m, which is F₄'s box). Its drawn resultant at 251.41 pt is exactly the *unweighted* mean of the four action lines. Correctly weighted, x̄ = 261.70 pt against a foot ending at 258.00 pt — **65 mm past the edge** — and the top box also falls off its neighbour unwelded. `ex1_5`'s b) is stable by 82 mm. |
| **EX 7, Creative** | The official roof slopes at **14.61°**, below the task's own stated 15° minimum. | Top edge (6.538, 22.601) → (23.884, 27.122) in sheet metres: Δx = 17.346, Δy = 4.521 → 14.61°, and the red tie beneath it is drawn at the same angle. Identical in EN and DE, so not a typesetting accident. It would need 4.65 m of rise, not 4.52 m. |
| **EX 7, tasks 1–2** | A systematic **~6 % gap** on every chord force, from a drafting artefact. | The sheet's chords are drawn ~0.06 m inside each face, so its constructed lever arm is z ≈ 1.88 m, not the full 2.000 m: d) 270/143.6 = 1.880, c) 187.5/99.3 = 1.888, a) 187.5/98.6 = 1.902, e) 750/406 = 1.847. `ex7_1`'s z = 2.000 m follows the compendium ("the entire structural depth is to be used") and is the defensible teaching number — but the discrepancy is real and in every case. |
| **EX 2** | Four printed slips, all cosmetic; the views are right. | N_allow printed "86′035 **kN**" where the unit is N; f_ef printed 293.5 where 74671/254.47 = 293.4; Creative A_req printed 290.5 where it is 290.4; Creative D printed 19.3 where it is 19.2. |
| **EX 6, diagram C** | Not wrong, but its determinacy convention is **unstated** — it counts diagonal crossings as pinned joints. | Sheet: 15 members + 3 reactions > 16 (8 joints). Standard convention: 11 + 3 − 12 = +2. Both give degree +2. Everywhere else EX 6 is correct: all four Cremona diagrams measure within ±0.3 kN of exact and were independently re-derived by joint equilibrium. |
| **EX 5** | No error found. Pages 1–2 reproduce to ±0.02 m / ±0.2 kN. Page 3's freehand funiculars are declared qualitative by the sheet itself, and the views' are exact — better than the key. | — |

## Collateral findings in the repo (not view files)

- `web/tools/regress/ex5_regress.py:26–29` records `ex5_1`'s 1.75 m default rise as if it were
  the answer; the sheet chose f = 3.00 / 3.00 / 1.50 m, deliberately holding H = 40.83 kN across
  all three cases. Its EX 5.2 and Creative blocks are correct.
- `web/views/ex3_4.js:30` and `web/tools/regress/ex3_regress.py:136` both state that with
  A = 3500 the verticals "would sum to 2712 kN". The correct value is **3771 kN** — which the
  regression script itself prints.
- `web/tools/regress/ex6_regress.py` records the correct values throughout and needs no change.
- `exercises.json` still quotes EX 7's *uncorrected* task wording, "Starting at the largest span
  width"; the solution silently corrects this to "Starting at the largest resultant" /
  "bei der grössten Teilresultierenden", which is what `ex7_1`'s step 3 follows.
- `ex6_5`'s description and step 4 both promise "drag its depth", but `H = 1.5` is a hard-coded
  const and no such control exists.
- `ex2_3`'s step 6 is titled "Node by node" and its docstring claims the force diagram "grows one
  ray at a time", but `cab0/1/2` and `ray0/1/2` all carry `intro: SOLVED`, so it appears in one beat.

---

# EX 1 "Equilibrium" — Structural Design I, HS 22

Audited against `web/pdf/EX1-equilibrium-solution-en.pdf` (3 pages), cross-checked
against `EX1-equilibrium-solution-de.pdf` and the unsolved `EX1-equilibrium-task-en.pdf`.

Method note: the sheet carries no printed numeric answers for tasks 1–3, so every
"official sheet" number below was measured off the sheet's own vector artwork
(`pdftocairo -svg`, transforms applied, endpoints in PostScript points) and converted
at the sheet's stated scales — form 1:50 (1 pt = 0.017639 m) and the per-task force
scale (1 cm = 28.3465 pt). Where the sheet prints a number, the measurement reproduces
it exactly (e.g. task 4 c) 60 kN measures 170.02 pt = 6.000 cm), so the technique is
calibrated.

---

## ex1_1 — Task 1: Resultant of two non-parallel forces
**Verdict: AGREES**

| Quantity | Official sheet | View | |
|---|---|---|---|
| F₁ | 20 kN (force-diagram vector 56.60 pt = 1.997 cm) | 20 kN | ok |
| F₂ | 30 kN (84.93 pt = 2.996 cm) | 30 kN | ok |
| angle of F₁ below horizontal | 18.20° / 18.24° / 18.28° (three drawn instances) | 18.11° | ok (0.1°, ΔR < 0.02 kN) |
| R magnitude | 115.91 pt = 4.089 cm ≙ **40.9 kN** | 40.9 kN | ok |
| R direction | **62.38°** below horizontal | 62.3° | ok |
| R line of action | through the crossing of the two action lines, measured at (344.89, 323.8) pt; the sheet's orange dash-dot line passes through it | through P, the crossing point | ok |
| R components | — | →19.0 / ↓36.2 kN | consistent |

**What is drawn.** The sheet draws exactly two things: a form diagram with the two
dash-dot lines of action, F₁ and F₂ as green arrows, and R as a dashed green arrow
through the intersection; and a force diagram with F₁ and F₂ tip-to-tail and R closing
the triangle, dashed. The view draws the same two diagrams with the same tip-to-tail
order (F₁ first, then F₂), the same dashed convention for R, and the same green. The
view adds a labelled disk **P** at the intersection and an on-canvas answer readout
(`R = 40.9 kN / 62.3° below horizontal`) that the sheet does not have — additions, not
omissions. Nothing on the sheet is missing from the view.

**Stated answer.** The task asks for magnitude, direction and position only; there is no
discussion question and the sheet writes no sentence. The view's answer text ("the two
given forces are exactly equivalent to this single resultant") is a correct gloss.

**Differences.** None of substance. The view's force scale is 1 unit = 5 kN where the
sheet is 1 cm ≙ 10 kN; the header strip states the sheet's scale, so this is declared.

---

## ex1_2 — Task 2: Resultant of several non-parallel forces (trial funicular)
**Verdict: AGREES**

| Quantity | Official sheet | View | |
|---|---|---|---|
| F₁ | 45 kN (85.05 pt = 3.001 cm at 15 kN/cm) | 45 kN | ok |
| F₂ | 30 kN (56.62 pt) | 30 kN | ok |
| F₃ | 15 kN (28.29 pt) | 15 kN | ok |
| F₄ | 30 kN (56.66 pt) | 30 kN | ok |
| direction of F₁ | 82.05° below horizontal | 82.0° | ok |
| direction of F₂ | 90.00° | 90.0° | ok |
| direction of F₃ | 84.98° | 85.0° | ok |
| direction of F₄ | 109.97° | 110.0° | ok |
| spacing of the action lines | F₂,F₃,F₄ at (+46.43,−16.67), (+72.10,+5.52), (+119.85,+46.79) pt from F₁ | identical to 0.2 % (5.01 pt per drawing unit) | ok |
| R magnitude | 222.36 pt = 7.844 cm ≙ **117.7 kN** | 117.7 kN | ok |
| R direction | **91.30°** below horizontal | 91.3° | ok |
| R line of action | sheet's orange dash-dot line, measured at two ends; in view coordinates (−8.98, 18.88) and (−9.99, −25.27) | the view's line −117.696x + 2.691y = 1109.13 passes within **0.06 pt** of both | ok |

**What is drawn.** Same construction: four green load arrows on four dash-dot action
lines, a tip-to-tail load line, a free pole with a fan of rays, a funicular of five
strings, the first and last extended to a closing point, and R drawn in both diagrams.
The view labels its rays 0…4 where the sheet labels them 1…5, and it draws the two
outer strings dashed where the sheet draws all five solid — cosmetic. The view puts the
pole to the left of the load line where the sheet puts it (as o′) to the right, and its
funicular closes above rather than below; both are legitimate, the pole is free, and the
view makes that its whole point (draggable pole, "every choice gives the same
resultant"). The resultant's measured line of action is identical to 0.06 pt, which is
the real test and it passes.

**Stated answer.** No discussion question; the sheet prints no sentence.

**Differences.** None of substance. Presentational only: the on-canvas force scale
reads "1 unit :: 6 kN" while the header says the sheet's "1 cm ≙ 15 kN"; ex1_5 handles
the same situation better by printing both ("1 unit ≙ 16 kN (sheet: 1 cm ≙ 20 kN)").

---

## ex1_3 — Task 3: Resultant of several parallel forces + stability
**Verdict: AGREES** (with two stale statements in the view's own docstring, and one
presentational defect)

| Quantity | Official sheet | View | |
|---|---|---|---|
| F₁ / F₂ / F₃ | 60 / 60 / 40 kN (84.93 / 85.05 / 56.62 pt at 20 kN/cm) | 60 / 60 / 40 | ok |
| ΣF = R | 226.61 pt = 7.995 cm ≙ **160 kN**, vertical | 160 kN vertical | ok |
| top box | 1.5 × 1.0 m, left edge at −2.0155 m | 10.20 × 6.79 units = 1.500 × 0.998 m, left edge −2.016 m | ok |
| middle box | 3.0 × 0.5 m, left edge −1.4238 m | 20.40 × 3.41 units = 3.000 × 0.501 m, left edge −1.422 m | ok |
| bottom box | 1.0 × 1.0 m, left edge 0 (drawn contact line 291.62 → 348.25 pt = 0.9987 m) | 6.80 units = 1.000 m, patch 36.29 … 43.09 units | ok |
| x̄ of the resultant | orange line drawn at 273.39 pt; computed from the drawn centroids 273.415 pt = **0.3216 m left of the contact patch** | 34.11 units, patch starts 36.29 → **outside by 2.18 units = 0.3205 m** | ok |
| stability verdict | (checkbox **left blank** — see below) but the drawn R is outside the patch, and page 3 a) says "change the arrangement from task 3) … so that it becomes stable" | NOT STABLE, it tips | ok |

**What is drawn.** The sheet draws the three-box sculpture on a hatched ground, three
green weights on dash-dot centroid lines, a vertical load line with a pole and rays, a
trial funicular, the closing point, R as a dashed green vertical, and a pair of
`stable / not stable` tick boxes. The view draws all of that except the tick boxes,
which it replaces with a coloured `NOT STABLE — it tips` verdict plus an explicitly
drawn heavy "contact patch" segment under the bottom box — the patch is the thing the
sheet leaves implicit, so this is an improvement. The view's funicular is started below
the ground line, so its strings run through the ground hatching and across the verdict
label; the sheet hangs its funicular above the sculpture. Free choice of starting point,
but the view's placement is the messier of the two.

**Stated answer.** The sheet's only prose answer here is the tick box, and **in both the
English and the German solution PDF neither box is ticked** (verified by rendering the
region at 300 dpi in both files). The answer is nevertheless unambiguous from the sheet
itself: the drawn resultant is 0.32 m clear of the contact patch, and the Creative Task
on page 3 asks the student to "change the arrangement from task 3) … so that it becomes
stable", which only makes sense if task 3 is not stable. The view says NOT STABLE.
Same answer.

**Differences.**
1. The view's docstring asserts "the sheet's checkbox answer is 'not stable'." The sheet
   ticks nothing. The conclusion is right, the provenance claim is false.
2. The view's docstring says the resultant "falls at x̄ = 16.11 (drawing units, +8 in the
   view's frame)". The live value is 34.11, and 16.11 + 8 ≠ 34.11. Stale number in the
   comment; the code is correct.
3. Presentational: ex1_3 reports x̄, the patch and the miss in *drawing units*
   (`x̄ = 34.11 · contact patch 36.29 … 43.09 · outside by 2.18 units`). The sheet works
   at 1:50 in metres, and the sibling view ex1_5 reports metres. A student cannot compare
   2.18 units with anything on the sheet; the same miss is 0.32 m.

---

## ex1_4 — Task 4: Single node equilibrium, six subsystems
**Verdict: MIXED** — five of six cases exact; **cases d) and f) have N₁ and N₂
interchanged**, and case e)'s printed answer (∞) is not given.

| Quantity | Official sheet | View | |
|---|---|---|---|
| F | 30 kN (85.00 pt at 10 kN/cm), all six | 30 kN | ok |
| a) members | 150° and 30° | 150° / 30° | ok |
| a) N₁, N₂ | 30 T, 30 T | 30.0 T, 30.0 T | ok |
| b) members | 210° and 330° | 210° / 330° | ok |
| b) N₁, N₂ | 30 C, 30 C | 30.0 C, 30.0 C | ok |
| c) members | 150° (member 1) and 0° (member 2) | 150° / 0° | ok |
| c) N₁, N₂ | 60 T (170.02 pt = 6.000 cm), 52 T (147.24 pt = 5.194 cm ≙ 51.9) | 60.0 T, 52.0 T | ok |
| d) members | **1 = 30° (red/tension), 2 = 330° (blue/compression)** | **1 = 330°, 2 = 30°** | **swapped** |
| d) N₁, N₂ | **30 T, 30 C** | **30.0 C, 30.0 T** | **differs** |
| e) members | 0° and 180° | 0° / 180° | ok |
| e) N₁, N₂ | **∞, ∞** (no T/C box ticked) | "no solution", no value printed | **differs** |
| f) members | **1 = 30° (tension), 2 = 330° (compression)**, F drawn above the node | **1 = 330°, 2 = 30°**, F drawn above the node | **swapped** |
| f) N₁, N₂ | **30 T, 30 C** | **30.0 C, 30.0 T** | **differs** |

Evidence for the d)/f) swap: on the sheet, in both subsystems the member labelled **1**
carries a RED arrow running *away* from the node at exactly +30.0° (measured
(731.76, 601.27) → (805.38, 558.77) pt, 85.01 pt ≙ 30 kN) and the member labelled **2**
carries a BLUE arrow running *toward* the node at 150°, i.e. the member itself lies at
330°. The view's `CASES` array is `{ k:'d', a1:330, a2:30 }` and `{ k:'f', a1:330,
a2:30 }`. The sheet's tick boxes agree: d) and f) both have the compression box ticked in
the **N₂** column and the tension box ticked in the **N₁** column.

**What is drawn.** The view constructs the same six subsystems and the same six force
polygons, in the same polygon order (F down, then member 1, then member 2 closing), with
the same member geometry in every case, and it colours tension pink/red, compression
blue and the load green as the sheet demands. Case f)'s load arrow is drawn above the
node exactly as the sheet does. Case e) is drawn as two parallel lines with the open gap
F between them, matching the sheet's picture. The view does **not** reproduce the sheet's
N₁/N₂ table or the compression/tension tick boxes — it encodes the same information as
colour plus an on-polygon magnitude. That is a reasonable translation, and it also means
the "1"/"2" numbering never appears in the drawing, so the swap is invisible on canvas
and shows up only in the RESULT / step text. It still reaches the student as a wrong
answer, because the RESULT panel is the thing that lines up against the sheet's table.

**Stated answer.** The sheet answers the "Explain the solution of situation e)" question
in one printed sentence: *"The elements 1 and 2 do not intersect which means that they
become infinitely big."* (German: *"Die Elemente 1 und 2 schneiden sich nicht und sind
demnach unendlich gross."*) It means the two lines in the *force* diagram are parallel
and never meet — in the subsystem the two members obviously do meet, at the node, so the
sheet's own wording is loose. The view says instead: "no solution — both members are
horizontal, so the polygon cannot close", "the node is a MECHANISM: it moves", and "two
collinear members cannot equilibrate a force that is not on their line". That is the same
physics stated more precisely, but it never says the member forces are **infinitely
large**, and it prints no value where the sheet prints **∞** — so a student filling in
the sheet's table gets nothing from the view.

**Differences.**
1. **d) and f): N₁ and N₂ are interchanged.** The sheet is right — its own drawing shows
   member 1 at 30° in red and member 2 at 330° in blue, and the tick boxes match. The
   view's `CASES` entries for d) and f) should be `a1: 30, a2: 330`, not `a1: 330,
   a2: 30`. The magnitudes (30 kN each), the geometry, the colours and the physics are
   all correct in the view; only the labels are on the wrong members. The view's prose
   ("d) lower member 30 kN compression · upper member 30 kN tension") is itself correct
   and is what exposes the mismatch.
2. **e) gives no value where the sheet gives ∞.** The view reports "no solution" and
   colours the case grey. Both statements are true, but ∞ is the sheet's printed answer
   and the more useful one — it is the limit the student sees when the two members are
   rotated a hair off collinear. Neither party is wrong; the view is answering with
   "cannot be solved" where the sheet answers with "unbounded".

---

## ex1_5 — Creative Task: Resultant and stability, stacking of boxes
**Verdict: SHEET IS WRONG** (part b), plus the view answers part a) with a different —
and better — arrangement than the sheet's.

### The four given boxes (measured on page 3, both parties agree)

| Box | Size | Weight |
|---|---|---|
| F₁ | 1.503 × 0.989 m → 1.5 × 1.0 | 60 kN |
| F₂ | 2.998 × 0.502 m → 3.0 × 0.5 | 60 kN |
| F₃ | 0.999 × 0.989 m → 1.0 × 1.0 | 40 kN |
| F₄ | 0.500 × 1.5 m | 30 kN |

The view's `BOX` array is exactly this, and its "40 kN per square metre" gloss is
self-consistent with all four.

### a) Fix task 3's stack

| Quantity | Official sheet | View | |
|---|---|---|---|
| starting x̄ (task 3 as given) | −0.3216 m, patch 0 … 1.0 m | −0.321 m, patch 0.000 … 1.000 m (`--set '{"orig":true}'`) | ok |
| which box is moved | **the top box (1.5 × 1.0, 60 kN), 0.898 m to the RIGHT** — the sheet draws its old position as a dashed ghost | **the foot (1.0 × 1.0, 40 kN), 1.094 m to the LEFT** | differs |
| resulting x̄ | drawn orange line at 330.96 pt vs foot left edge 330.29 pt → **+0.012 m inside**; computed +0.016 m | **−0.594 m, dead centre of the patch −1.094 … −0.094** | differs |
| margin | **16 mm** (0.32 mm on the 1:50 sheet) | **500 mm** | differs |
| stands without welds? | **no** — box 2's underside then carries 120 kN at x̄ = −0.145 m against a patch of 0 … 1.0 m | **yes** — tightest joint 0.156 m to spare | differs |

The view reproduces the sheet's answer exactly when asked to:
`live.py 1_5 --set '{"orig":true,"d0":0.898}'` → `x̄ = 0.016 m … STABLE … 0.016 m inside
the nearer edge … but it is standing on its welds: box 2's underside would let go`.
So the view's model is right; it simply presents a different design.

### b) Design a stable four-box arrangement — **the sheet's answer is not stable**

The sheet's b) form diagram places, bottom to top: the 1.0 × 1.0 box on the ground
(patch 201.12 … 258.00 pt = 1.000 m), then the 3.0 × 0.5 box, then the 1.5 × 1.0 box,
then the 0.5 × 1.5 box overhanging to the left. Centroid abscissae, measured from the
green action lines: 229.71, 325.68, 249.55, 200.71 pt respectively.

Two independent faults:

1. **The four load vectors in b)'s force diagram are all the same length.** Measured:
   70.84, 70.84, 70.84, 70.84 pt. At the page's own stated 1 cm ≙ 20 kN that is
   49.98 kN four times — total 200 kN, not the given 190 kN, and not 60/60/40/30. The
   a) force diagram on the *same page* measures 85.01 / 85.00 / 56.67 pt = 60 / 60 / 40
   exactly, so the scale is not in doubt and this is a slip, not a convention.
2. **The F-labels in b) are permuted off the boxes they belong to.** The box the sheet
   labels F₁ in b) measures 0.500 × 1.50 m (that is F₄, 30 kN); the box labelled F₂
   measures 1.003 × 0.99 m (that is F₃, 40 kN); F₃ sits on a 1.48 × 0.99 m box (that is
   F₁, 60 kN); F₄ sits on a 3.00 × 0.50 m box (that is F₂, 60 kN).

The proof that fault 1 is what produced the drawn answer: the sheet's orange resultant in
b) is at **251.41 pt**, and the plain unweighted mean of the four action lines is
(200.71 + 229.71 + 249.55 + 325.68)/4 = **251.41 pt** — an exact match. The sheet located
its resultant by treating all four boxes as equally heavy.

With the correct weights (weight follows the box, as the task's own "the given boxes"
requires):

    x̄ = (30·200.71 + 40·229.71 + 60·249.55 + 60·325.68) / 190 = 49723.5/190 = 261.70 pt

against a ground contact patch of 201.12 … 258.00 pt. The resultant falls **3.70 pt =
0.065 m beyond the right-hand edge of the foot**. The sheet's own "interesting but
stable" arrangement **tips**. It is worse than that unwelded: the 0.5 × 1.5 top box
overlaps the box beneath it only over 0.106 … 0.242 m while its own centroid is at
−0.007 m, so it falls off on its own.

**SHEET IS WRONG** on Creative b).

### The view's b)

| Quantity | View | |
|---|---|---|
| boxes | 1.0×1.0 (40) on the ground at 0…1.0; 3.0×0.5 (60) at −0.4…2.6; 1.5×1.0 (60) at 0.8…2.3; 0.5×1.5 (30) at −0.4…0.1 | — |
| ΣF | 190 kN | ok — matches the sheet's given |
| x̄ | (40·0.5 + 60·1.1 + 60·1.55 + 30·(−0.15))/190 = 0.918 m | correct |
| patch | 0 … 1.0 m | — |
| verdict | STABLE by 0.082 m; needs its welds (box 2's underside carries 150 kN at 1.03 m against a 0…1.0 patch) | correct and honestly stated |

The view's b) is essentially the sheet's own idea — a 1 m cube foot, a 3 m plate
cantilevering off it, a box on top and the tall thin box hung off the far end as a
counterweight — but with each box carrying its own weight, and it actually stands.

**What is drawn.** The sheet's page 3 draws, for each of a) and b): the arrangement over
a hatched ground, green weights on dash-dot centroid lines, a load line with a pole and
rays, a trial funicular closed to a point, and R as a dashed green vertical. The view
draws all of it, and adds three things the sheet does not have: an explicit ground
contact patch with the miss distance drawn in red when it fails, a per-joint check of
what happens *without* the welds, and connectivity/interpenetration guards so a dragged
box that is floating in mid-air is reported as such rather than silently counted into a
"stable" resultant. Those additions are the right ones — the sheet's own b) is exactly
the case they would have caught.

**Stated answer.** The sheet gives no prose answer to the Creative task; the answer is
the two drawings. The view's step-8 text states its a) as *the* fix ("the foot slides
1.094 m left, right under the resultant — one box moved, nothing else") without
mentioning that the sheet moves the top box instead. Since the task is "change the
arrangement … so that it becomes stable" — any valid change — neither is wrong, but the
view is silently answering a) with a design the sheet does not show.

**Differences.**
1. **The sheet's b) is unstable.** Proven above: correct weights give x̄ = 261.70 pt
   against a foot ending at 258.00 pt, i.e. 65 mm past the edge; and the top box falls
   off its neighbour independently. The sheet got "stable" only by drawing four equal
   50 kN load vectors (its resultant sits at the *unweighted* mean of the four action
   lines, to the 0.01 pt) and by permuting the F-labels off the boxes they name. The view
   is right; the sheet is wrong.
2. **a): different box moved.** The sheet slides the top 60 kN box 0.898 m right, leaving
   16 mm of margin and a stack that only stands because it is welded. The view slides the
   40 kN foot 1.094 m left, leaving 500 mm and a stack that needs no welds. Both satisfy
   the task; the view's is the better engineering answer, but a student holding the
   solution sheet will not recognise the view's arrangement. The view can reproduce the
   sheet's exactly (`orig: true, d0: 0.898`), so this is a framing gap, not a modelling
   one — the step text should name the sheet's move as the alternative.
3. Cosmetic: the caption card overlaps the top of the drawing at the final step, and the
   funicular strings run below the ground line through the hatching.

---

# EX 2 — "Dimensioning and Graphic Statics" (Structural Design I, HS 22)

Official key: `web/pdf/EX2-dimensioning-and-graphic-statics-solution-en.pdf` (3 pp).
Views audited: `ex2_1`, `ex2_2`, `ex2_3` (read-only; nothing edited).

---

## ex2_1 — Task 1: Analysing cables with a given geometry
**Verdict: AGREES**

| Quantity | Official sheet | View | |
|---|---|---|---|
| F₁ | 100 kN | 100 kN | ok |
| a) span L / sag h | 3.00 m / 1.25 m (170 pt / 70.9 pt at 1:50) | 25.5 / 10.63 drawing units (same ratio) | ok |
| a) A | 78 kN | 78.1 kN | ok |
| a) B | 78 kN | 78.1 kN | ok |
| a) N_max = N₁ = N₂ | 78 kN | 78.1 kN (tension) | ok |
| a) H (not printed on sheet) | — (exact = 60.0) | 60.0 kN | ok |
| b) sag | h/2 = 0.625 m | 5.31 units (h/2) | ok |
| b) A | 130 kN | 130.1 kN | ok |
| b) B | 130 kN | 130.1 kN | ok |
| b) N_max = N₁ = N₂ | 130 kN | 130.1 kN (tension) | ok |
| b) H (not printed) | — (exact = 120.0) | 120.1 kN | ok |
| H ratio b/a | (implied ×2) | ×2.00 | ok |

Exact closed form confirms both columns: H = F·L/4h = 100·3.0/(4·1.25) = 60.0 kN,
N = √(50² + 60²) = 78.10 kN; halving h gives H = 120.0, N = √(50² + 120²) = 130.0 kN.
The view's 78.1 / 130.1 / 60.0 / 120.1 are the same numbers carrying one extra digit
plus a ~0.05 % digitising residue (its sag values are 10.63 and 5.31, not exactly 2:1).

**What is drawn.** The view constructs the same thing the sheet constructs: both cases side
by side, form diagram left, one closed force triangle per case on the right (F₁ laid off
downwards, then the two segment forces closing through the apex), cable in tension colour,
loads and reactions green, and support reactions drawn on the form diagram pulling up and
*outward* at A and B — the same sense as the sheet. The circuit in the force polygon is
identical to the sheet's (top→bottom = F₁, bottom→apex = A/segment 1, apex→top = B/segment 2),
and the green reaction pair is drawn stepped just outside the pink cable legs exactly as the
sheet overlays green A/B on red 1/2. Omitted relative to the sheet: (i) the three separate
subsystem free bodies "node I / node II / node III" — the view folds node II and III into one
"The supports" step instead of drawing two little FBDs; (ii) the sheet's member numbers 1 and 2
on the cable and in the force diagram; (iii) the sheet's node names II and III for the supports
(the view puts "A" and "B" at the support *points*, where the sheet uses A and B for the
*reaction forces* and II/III for the points); (iv) the pinned-support hatch symbols. None of
these changes an answer.

**Stated answer.** Sheet c): *"The bigger the structural depth of the system (h), the smaller
the forces."* The view's step-6 takeaway is "H = F·L/4h — the thrust is inversely proportional
to the sag, and that is what a cable costs", and its result line reads "halving the sag doubles
the thrust (×2.00)". Same claim, stated more sharply (the sheet only says "smaller"; the view
gives the 1/h law). Agrees.

**Differences.**
1. No substantive difference. The only gaps are presentational: the three subsystem FBDs, the
   member numbers 1/2, and the node names II/III are not drawn. The view is right.
2. (Not a sheet issue, but a defect) the third result line is the hard-coded sentence "halving
   the sag doubles the thrust (×N)". Move the `hb` slider to equal `ha` and it reads "halving
   the sag doubles the thrust (×1.00)", which is nonsense. The multiplier is live; the sentence
   is not.

---

## ex2_2 — Task 2: Dimensioning of a suspension bridge
**Verdict: MIXED** (every number agrees; the sheet's own stated answer to b) is missing, and the
anchor reactions the sheet draws are absent)

| Quantity | Official sheet | View | |
|---|---|---|---|
| F₁d = F₂d | 40 kN | 40 kN | ok |
| a) H (not printed on sheet) | ≈ 53 kN scaled off the drawing | 52.8 kN | ok |
| a) N segment 5 (steep, at left anchor A) | N_d = 74′671 N | 74.7 kN | ok |
| a) N segment 4 (mid) | not printed | 54.4 kN | — |
| a) N segment 3 (right, at B) | not printed | 59.5 kN | — |
| a) N hangers 1, 2 | 40 kN each (implied by node I / node II) | drawn red, value never stated | gap |
| a) reactions A, B | drawn green; = 74.7 and 59.5 kN | **not drawn at all** | MISSING |
| b) f_td (S235) | 223.8 N/mm² | 223.8 N/mm² | ok |
| b) A_req | 333.6 mm² | 333.6 mm² (334) | ok |
| b) D computed | 20.6 mm | 20.6 mm | ok |
| b) **D chosen** | **≈ 21 mm** | **not given** | MISSING |
| c) A_ef (Ø18) | 254.5 mm² | 254.5 mm² | ok |
| c) f_td (S355) | 338.1 N/mm² | 338.1 N/mm² | ok |
| c) f_ef = N_d/A_ef | 293.5 N/mm² | not reported | sheet rounds wrong (see below) |
| c) N_allow | "86′035 kN" | 86.0 kN | sheet unit typo |
| c) verdict | ok! (safe) | SAFE, 87 % utilised | ok |

Arithmetic check: 235/1.05 = 223.810; 74671/223.810 = 333.65 mm²; √(4·333.65/π) = 20.611 mm;
π·18²/4 = 254.47 mm²; 355/1.05 = 338.095; 254.47·338.095 = 86 035 N = 86.0 kN;
74671/254.47 = **293.44** N/mm², so the sheet's printed f_ef = 293.5 is a last-digit rounding
slip (should be 293.4). Immaterial to the verdict. Separately, the sheet writes
N_allow = 86′035 **kN**; the unit must be **N** (86.0 kN) — otherwise the cable would be a
thousand times stronger than the load it is being checked against. **SHEET IS WRONG** on both,
but only cosmetically; the view's numbers are the correct ones.

The view's N_d = 74.674 kN against the sheet's 74.671 kN (3 N apart, 0.004 %) is proof the
digitised geometry, the pole construction and the sheet's own construction are the same thing.

**What is drawn.** The form diagram matches the sheet's geometry exactly (left anchor high,
steep segment down to the first cable node, near-flat mid segment, rising segment to the right
anchor, two vertical hangers to the deck, two green loads hanging below the deck). The force
diagram is the sheet's construction — a vertical load line of the two 40 kN loads, one pole,
three rays parallel to the three cable segments — but drawn **mirrored**: the view lays the
loads off left-load-first (F₂d on top) so the pole falls to the *right* of the load line, while
the sheet lays off F₁d first so its pole falls to the *left*. Both are valid orderings and both
give parallel rays; only the picture is handed differently. Genuinely missing relative to the
sheet: (i) **the anchor reactions A and B** — the sheet draws green arrows at nodes V and VI in
the form diagram and green legs labelled A and B closing the force diagram, and the view draws
no green at the anchors in either diagram (grep confirms `PAL.green` appears only on the two
hanger loads); (ii) the six subsystem FBDs node I…node VI; (iii) the sheet's member numbering
1–5 and node numerals I–VI — the view labels its cable forces 74.7 / 54.4 / 59.5 but never as
members 5 / 4 / 3, so a student holding the sheet cannot match them up; (iv) the hanger forces
(1 and 2 = 40 kN tension), which are what the sheet's node I and node II subsystems exist to
show; (v) the 1:10 cross-section circle of the Ø18 cable that part c) is drawn on.

**Stated answer.** b) The sheet's answer is a *catalogue* diameter: "D = 20.6 mm ≈ **21 mm**".
The view stops at the raw 20.6 mm in both the step-8 detail and the result bar; "21" does not
appear anywhere in `ex2_2.js`. Since the sheet's whole point in b) is round-**up** sizing (its
sibling `ex2_3` does apply `Math.ceil`), the view fails to state the sheet's answer.
c) The sheet runs the proof in *both* standard forms — the stress form (f_ef = N_d/A_ef ≤ f_td)
and the force form (N_d ≤ N_allow = f_td·A_ef) — and answers "ok!" to each. The view runs only
the force form and never reports the stress f_ef, even though part b) is worded "based on the
**stress** within the relevant segment". Same verdict (SAFE), one of the two proofs shown.

**Differences.**
1. **b) has no rounded-up answer.** Sheet: Ø 21 mm. View: "Ø 20.6 mm", full stop. The sheet is
   right — you cannot buy 20.6 mm, and rounding is the point of a dimensioning task.
2. **The anchor reactions are not drawn.** The sheet draws A and B green at both anchors and as
   the closing green legs of the force diagram (and gives node V / node VI subsystems for them);
   the view draws nothing green at the anchors. Numerically the information exists (they equal
   the 74.7 and 59.5 kN end-segment forces) but the view never says so, and the task instruction
   "indicate … external forces with green" is only half honoured.
3. **No f_ef.** The sheet's c) reports f_ef = 293.5 N/mm² ≤ f_td = 338.1; the view reports only
   N_allow ≥ N_d. Equivalent, but it drops the stress the question names.
4. **SHEET IS WRONG (cosmetic, ×2):** f_ef printed as 293.5 N/mm² when 74671/254.47 = 293.44 →
   293.4; and N_allow printed as "86′035 kN" when the unit is N (= 86.0 kN). The view has both
   right.
5. Presentational only: the force diagram is mirrored (load order reversed), the six subsystem
   FBDs and the sheet's member numbers 1–5 / node numerals I–VI are absent, and the 1:10
   cross-section is not drawn.

---

## ex2_3 — Creative Task: A new suspension bridge
**Verdict: MIXED** (the mathematics is verified against the sheet's own design, but the drawing
does not construct what the sheet constructs, the load names are swapped, and the force diagram
is laid on top of the form diagram)

The task is open ("Chose two new fixing points A and B"), so the sheet's numbers are one
particular design, not a target. The right test is whether the view *reproduces the sheet's
design when given the sheet's inputs* — it does:

| Quantity | Official sheet (its own anchor choice) | View, forced to the sheet's anchors (A ≈ (−18.1, −5.8), B ≈ (20.6, 2.5), H = 44 kN) | |
|---|---|---|---|
| H (scaled off the sheet's force diagram) | ≈ 44 kN | 44.0 kN (input) | ok |
| governing member | member 3, the *right* segment up to B | segment 3, 65.8 kN, the right segment up to B | ok |
| N_d,max | 65′000 N | 65.8 kN | ok (1.2 %) |
| f_td (S235) | 223.8 N/mm² | 223.8 N/mm² | ok |
| A_req | 290.5 mm² | 293.8 mm² | ok (tracks the 1.2 % force difference) |
| D computed | 19.3 mm | 19.3 mm | ok |
| D chosen | ≈ **20 mm** | **Ø 20 mm** | ok |

The view's **default** state is deliberately task 2's anchors, which gives H = 52.8 kN,
segment forces 74.7 / 54.4 / 59.4 kN, A = 74.7, B = 59.4, A_req = 334 mm², **Ø 21 mm S235** —
i.e. it reproduces `ex2_2`'s verified answer as a self-check. That is a defensible default but
it is *not* a new bridge: the premise is that the rock fractured and the anchors must move, so
the view opens on the one anchor pair the task forbids.

Sheet arithmetic check: 65000/223.810 = **290.43** mm² (sheet prints 290.5) and
√(4·290.43/π) = **19.23** mm (sheet prints 19.3). Both are last-digit rounding slips in the
sheet; the round-up to 20 mm is unaffected. **SHEET IS WRONG** in the last digit twice, harmlessly.

**What is drawn.** The view draws the deck, the two hangers and their loads, the resultant R
(dashed green, 80 kN, on the mid-line between the hangers, in both diagrams), draggable anchors
A and B with rock hatching, a pole/load-line force diagram with three rays, the three cable
segments in tension colour with their values, green anchor reactions along the cable at A and B,
the governing segment called out, and a Ø-to-scale cross-section circle labelled with the chosen
diameter and grade. Relative to the sheet, four things are wrong or missing:

- **The sheet's global-equilibrium construction is not drawn.** The sheet's page-3 form diagram
  extends the two *end* cable segments (5 and 3) as dashed lines until they cross, and that
  crossing sits on the resultant's line of action — that is the three-force concurrency that
  "determine the direction of the reaction forces with help of the global equilibrium" refers
  to, and it is how the sheet fixes the reaction directions. The view finds R, draws it, and
  then never uses it: the cable shape is fixed instead by a "horizontal thrust H" slider. Same
  degree of freedom, but the sheet's actual method — the step the task names — is not on screen.
- **"Node by node" does not go node by node.** Step 6 is titled "Node by node" and its text says
  "close each node in turn: anchor, hanger 1, hanger 2, anchor", and the file's docstring claims
  "the force diagram grows one ray at a time". It does not: `cab0/1/2` and `ray0/1/2` all carry
  `intro: SOLVED` (= 5), so all three segments and all three rays appear in the same beat
  (verified on the step-5 screenshot). `ex2_2` at least highlights its segments one at a time;
  this view does not even do that. The sheet's six subsystem FBDs (node I…node VI) are likewise
  absent.
- **F₁d and F₂d are swapped.** The sheet (pages 2 and 3 alike) puts F₂d on the **left** hanger
  (node II/IV) and F₁d on the **right** (node I/III). `ex2_3.js` labels them `'F' + '₁₂'[i]`
  with i = 0 at the left hanger, so the view prints F₁d on the left and F₂d on the right — the
  reverse of the sheet, and the reverse of its own sibling `ex2_2.js`, which correctly uses
  `'₂₁'`. Because F₁d = F₂d = 40 kN no number changes, but the labelling contradicts the sheet
  a student is reading alongside it.
- **The force diagram is drawn on top of the form diagram.** The load line sits at x = 8 with
  the pole at x = 18.6, while the bridge occupies x = −19 … 19.3 and the deck runs to x = 14.7 —
  so the load line, the pole and all three rays land squarely on the right cable segment and
  across the deck (clearly visible in every screenshot from step 2 on). Worse, the "Force
  diagram" caption is placed at y = +22 while its diagram lives at y = −4 … −20, i.e. 25 units
  away and up behind the header bar where it is clipped, and the "R" label collides with the
  "Form diagram 1:500" caption. The whole composition is also pushed to the right of an empty
  left half of the frame. Neither `ex2_1` nor `ex2_2` has this problem.

**Stated answer.** The Creative task has no discussion question; b) asks for a material and a
diameter. The sheet answers "S235, D = 19.3 ≈ 20 mm" for its 65 kN design. The view answers in
the same form and with the same rounding rule (`Math.ceil`), and reproduces exactly that answer
when given the sheet's anchors; on its default anchors it answers "S235, Ø 21 mm" for 74.7 kN,
and an S355 toggle gives Ø 17 mm. Consistent with the sheet.

**Differences.**
1. **The force diagram overlaps the form diagram** and its title is clipped off-screen — a
   layout bug, not a statics error, but it makes the finished drawing unreadable at every step
   past 2. The view is wrong.
2. **The sheet's global-equilibrium step is not constructed.** R is drawn but plays no part; the
   dashed concurrency of the two end segments on R's line of action — the sheet's stated method
   for finding the reaction directions — is missing, replaced by a thrust slider. The sheet is
   right about method; the view answers a slightly different question.
3. **Step 6 "Node by node" reveals everything at once**, contradicting both its own caption and
   the file docstring. The sheet's six node subsystems are not drawn either.
4. **F₁d / F₂d are on the wrong hangers** relative to the sheet and to `ex2_2`. No number
   changes; the labels do. The view is wrong.
5. The default anchor pair is task 2's, i.e. the pair the premise says has failed. Useful as a
   self-check, misleading as an opening state.
6. **SHEET IS WRONG (cosmetic):** A_req printed 290.5 mm² where 65000/223.81 = 290.43 → 290.4,
   and D printed 19.3 mm where √(4·290.43/π) = 19.23 → 19.2. The rounded answer, 20 mm, stands.

---

# EX 3 "Cable Structures" (Structural Design I, HS 22) — views vs. the official key

Key: `web/pdf/EX3-cable-structures-solution-en.pdf` (5 pages; p. 4 is blank, the "Creative" task is
p. 5) and its German twin `…-de.pdf`. Task sheet `…-aufgabe-de.pdf`.
All PDF measurements below are taken from the vector/raster geometry at 300 dpi, in PDF points
(1 pt = 0.35278 mm), so the stated scales (1:100, 1:500, 1 cm ≙ 20/10/500 kN) can be applied directly.

**One finding governs three of the five views: every force the key scales off its own Kräfteplan
is 2.56 % too large.** On p. 3 the key computes R = 2437.5 kN in part c), then lays R off on the
force plan as a line 141.6 pt long = 5.00 cm, which at its own stated 1 cm ≙ 500 kN is **2500 kN**.
The correct length is 4.875 cm. Everything measured against that load line (task 3 d), 3 e), and the
Creative task) is therefore inflated by 2500/2437.5 = 1.0256. This is proved below for both plates.

---

## ex3_1a — Task 1a: point load, design a funicular form + force plan
**Verdict: AGREES**

The key prints no numbers at all for task 1; it is a pure graphic answer, so the "official" column
below is what its plate actually measures.

| Quantity | Official sheet | View | |
|---|---|---|---|
| F_d | 120 kN | 120 kN | ok |
| span L | 170.4 pt @1:100 = 6.01 m | 6.00 m | ok |
| sag f (design choice) | 70.9 pt = 2.50 m | 2.50 m | ok |
| segment inclination | 39.8° (70.9/85.2) | 39.8° | ok |
| load line | 170.4 pt = 6.01 cm ≙ 120.2 kN | 120 kN | ok |
| pole distance H | 102.6 pt = 3.62 cm ≙ 72.4 kN | 72.0 kN | ok |
| ray length N₁ = N₂ | 133.1 pt = 4.70 cm ≙ 94.0 kN | 93.7 kN | ok |
| A = B | = ray = 94 kN | 93.7 kN | ok |
| governing | both segments equal | both equal | ok |

Exact arithmetic: H = F·L/(4f) = 120·6/10 = 72.0 kN, N = √(72² + 60²) = 93.72 kN. The plate is
within half a pencil width of both.

**What is drawn.** The view constructs exactly what the plate constructs and nothing is missing:
the V-shaped form diagram with node I and the load's line of action; the closed force triangle
(load line down, B up to the pole, A back to the top) with the two segment rays drawn *inside* the
green reaction arrows, precisely as the key superposes them; the two support reactions in the form
diagram pointing outward along the cable; and the key's separate little node-equilibrium sketch at I
(dashed circle, arrows 1 and 2 out, F_d down), which the view reproduces below the force plan. It
adds an H dimension line, a sag dimension, a force-proportional band and a live sag slider. Tension
is drawn in the project's pink (PAL.red = #ce4095) rather than the sheet's red, and external forces
in green — a deliberate project-wide palette substitution, not a miss. No compression exists here,
so blue is correctly absent.

**Stated answer.** Task 1a asks no discussion question. Nothing to compare.

**Differences.**
1. None of substance. The only deviations are the pink-for-red palette and the fact that the view
   supplies exact arithmetic where the key gives only a construction — in every case the arithmetic
   lands inside the key's own drawing tolerance.

---

## ex3_1b — Task 1b + 1c: uniform line load, and where the force is largest
**Verdict: AGREES** (the view is more complete than the key)

| Quantity | Official sheet | View | |
|---|---|---|---|
| q_d | 20 kN/m | 20 kN/m | ok |
| span L | 170.4 pt = 6.01 m | 6.00 m | ok |
| R = q·L | load line 168.5 pt ≙ 118.9 kN (= 120) | 120 kN | ok |
| sag f (design choice) | 35.5 pt = 1.253 m | 1.25 m | ok |
| end tangents meet below chord | ≈ 2f = 2.4–2.5 m | 2.50 m | ok |
| pole distance H | 102.6 pt ≙ 72.4 kN | 72.0 kN | ok |
| N at the crown | shortest ray = H = 72 kN | 72.0 kN | ok |
| N at the supports | longest ray ≙ 94 kN | 93.7 kN | ok |
| A = B | 94 kN | 93.7 kN | ok |
| rays in the fan | 21 (19 interior + 2 end tangents) | 21 (NFAN−1 = 19 + 2) | ok |

The pairing the sheet is built on holds exactly: q·L = 20·6 = 120 kN is task 1a's point load, and
H = q·L²/(8f) = 720/10 = 72 kN is task 1a's pole, so case b) reuses case a)'s force triangle with a
fan inside it. Both the key's plate and the view do this.

**What is drawn.** Everything the plate has: the load run with its bar, the closing string CS/SL
labelled, the resultant R dashed green at midspan, the parabola, the two end tangents 1 and 2
meeting at I at 2f below the chord, the pole, the closed force triangle with green reactions, and
the pale fan of tangent rays that is the visual answer to c). The view additionally draws the
"one further tangent" **in both plans** as a draggable element with its own force read-out.

**Stated answer.** Key (DE): *"Die innere Kraft verändert sich entlang der Kurve. Sie ist bei den
Auflagern am grössten. Diese grösste Kraft entspricht den äussersten Tangenten im Kräfteplan."*
(EN: "The internal force is not constant along the curve. It is largess [sic] at the supports. The
largest force corresponds to the outer tangents in the force diagram.") The view's step 9 caption
and RESULT bar say exactly this: *"the force is NOT constant: N = 72.0 kN at the crown, 93.7 kN at
the supports … the largest force is at the supports — the outermost tangents in the force plan."*
Same answer, same reason.

**Differences.**
1. Task 1c orders "draw one additional tangent into the form **and** force diagram". The official
   plate does **not** do this — it draws only the fan in the force plan and the two end tangents in
   the form plan; there is no extra tangent anywhere in the Lageplan. The view does what the task
   asks, in both plans, and makes it draggable. The view is right; the key under-delivers on its own
   instruction.
2. Cosmetic only: at the final step the label "tangent at 1.08 m" collides with the "Lageplan — form
   diagram" title, and the letter B is printed twice (once at the support, once at the reaction
   arrow tip).

---

## ex3_2 — Task 2: Seilform, four loads, supports at different heights
**Verdict: MIXED** — every number is exact; two construction annotations the key draws are missing.

Digitised from the key's plate: the drawn cable's five segment slopes are 0.960 / 0.6625 / 0.0743 /
−0.519 / −0.809. Each slope break equals F_i/H, giving H = 67.2 / 68.0 / 67.4 / 69.0 kN — one
thrust, H ≈ 67.8 kN. From that:

| Quantity | Official sheet (measured off its plate / its table) | View | |
|---|---|---|---|
| F_d1…F_d4 | 20 / 40 / 40 / 20 kN | 20 / 40 / 40 / 20 kN | ok |
| ΣF = R | 120 kN | 120 kN | ok |
| H | 67.8 kN (mean of the four slope breaks) | 67.8 kN | ok |
| N segment 1 | 94.0 kN | 93.9 kN | ok |
| N segment 2 | 81.3 kN | 81.4 kN | ok |
| N segment 3 | 68.0 kN | 68.0 kN | ok |
| N segment 4 | 76.4 kN | 76.3 kN | ok |
| N segment 5 | 87.2 kN | 87.3 kN | ok |
| **N_d,max (answer table)** | **94 kN**, in segment 1 | 93.9 kN, segment 1 | ok |
| A (= N₁) | 94 kN | 93.9 kN | ok |
| B (= N₅) | 87 kN | 87.3 kN | ok |
| support geometry | A (217.8, 513.6), B (642.9, 460.9) pt; ΔY = −52.7 pt | same, digitised | ok |
| load lines of action | x = 274.3 / 331.0 / 416.0 / 529.4 pt | same | ok |

This is the closest agreement of the five views: the view reproduces all five segment forces of the
official plate to ±0.1 kN, and its steepest segment is segment 1, as the key's is.

**What is drawn.** The view constructs the sheet's sequence: the trial (auxiliary) funicular from a
trial pole o′ with its rays and strings, the intersection of the outer trial strings fixing R's line
of action, R laid off dashed green over the whole load line, then the chosen pole o at H from the
load line, the reactions closing the polygon, and finally the five cable segments each parallel to
its ray. Two things the official plate draws are **absent**: (i) the **closing string CS/SL** — the
dashed A–B line in the Lageplan and its counterpart through the pole in the Kräfteplan — and
(ii) **CS′/SL′**, the trial closing string, which the key labels in both plans; the view draws the
trial closing construction geometrically (the dashed extensions to the intersection point) but never
labels it. Also absent: the segment numbers 1–5 in the form diagram (the view labels the rays with
their force magnitudes 94/81/68/76/87 instead), and the key's pin/roller support symbols.

**Stated answer.** No discussion question; the only stated answer is the table N_d,max = 94 kN,
which the view prints verbatim in its RESULT bar and reproduces to 93.9 kN.

**Differences.**
1. CS/SL and CS′/SL′ are not drawn or labelled. The task statement is "…**then fix the direction of
   the reaction forces** and find the global equilibrium", and in this course the closing string is
   exactly the device that does that. The view parametrises the same freedom differently (a thrust
   slider H, with the pole's height solved so the funicular lands on B), which is mathematically
   equivalent and arguably clearer, but a student comparing the view to the sheet will not find the
   two named lines the sheet leans on. Neither party is *wrong*; the view is incomplete relative to
   the plate.
2. Segments are unnumbered in the form diagram. Minor, but the key's answer table refers to
   "segment" implicitly and the plate numbers 1–5 in both plans.

---

## ex3_3 — Task 3: the Pavilhão de Portugal, designing the suspended roof
**Verdict: SHEET IS WRONG** (parts d and e; a, b, c agree exactly)

| Quantity | Official sheet | View | |
|---|---|---|---|
| a) s̄_d = ḡ_k·1.35 + q̄_k·1.5 | 5·1.35 + 0.5·1.5 = **7.5 kN/m²** | 7.5 kN/m² | ok |
| b) s_d = s̄_d·b, b = 5 m | **37.5 kN/m** | 37.5 kN/m | ok |
| c) R = s_d·l, l = 65 m | **2437.5 kN** | 2437.5 kN | ok |
| span l (drawn) | 368.4 pt @1:500 = 64.97 m | 65 m | ok |
| support height above ground (drawn) | 75.25 pt = 13.28 m | 13.5 m | view rounds up |
| sag f (drawn) | 19.95 pt = 3.52 m | 3.50 m | ok |
| crown above ground (drawn) | 9.76 m — the task demands **10 m** | 10.0 m | view enforces the brief |
| R as laid off on its own force plan | 141.6 pt = **5.00 cm ≙ 2500 kN** | 2437.5 kN | **sheet wrong** |
| H (pole distance on its plate) | 328.0 pt = 11.57 cm ≙ 5787 kN | 5658 kN | sheet 2.3 % high |
| d) N_d,max = N₁ = N₂ | **5915 kN** | **5788 kN** | **sheet 2.2 % high** |
| d) A = B | 5915 kN | 5788 kN | same slip |
| e) doubled load | **11 830 kN** | 11 576 kN | same slip |

**Proof the sheet is wrong.** Its own force plan is drawn to *its own* stated scale 1 cm ≙ 500 kN.
The green load line on that plan measures 590 px at 300 dpi = 141.6 pt = 5.00 cm exactly, i.e.
**2500 kN** — but part c) of the same page computes R = 2437.5 kN, which is 4.875 cm. The pole sits
328.0 pt = 11.57 cm from the load line, i.e. H = 5787 kN, and √(5787² + 1250²) = **5921 kN**, which is
the printed 5915 to within a pencil width. So the printed 5915 is the plate read correctly against a
load line that was drawn 2.56 % too long. Rescaled to the true R: 5915 × 2437.5/2500 = **5767 kN**;
the view's exact figure for the same drawn sag is 5788 kN (H = 37.5·65²/(8·3.50) = 5658.5 kN,
N = √(5658.5² + 1218.75²) = 5788.2 kN). The two agree to 0.4 %. Consequently e)'s 11 830 kN is high
by the same 2.2 %. This is a drawing-board scaling slip, not a statics error — but it *is* an error,
and it is the same slip that inflates the Creative task (see ex3_4).

**Second, independent inconsistency in the key — this one the view papers over.** The task fixes the
crown at 10 m above ground; the plate draws the supports 13.28 m up and the crown at 9.76 m, so the
plate does not satisfy its own brief. The view resolves this by trusting the drawn sag (3.5 m) and
raising the wall to 13.5 m. The opposite resolution — trust the drawn wall (13.28 m) and put the
crown at exactly 10.0 m — gives f = 3.28 m, H = 6038 kN and **N = 6160 kN**, which is 6.4 % above the
view's answer. Neither reading is provably right; the key's drawing is only accurate to about
±0.25 m at 1:500 (half a millimetre on paper). The view's docstring states its choice explicitly and
honestly, but the view itself presents 5788 kN as *the* number without signalling that the geometry
is only determined to ±6 %.

**What is drawn.** The view builds the whole a)→d) chain the sheet builds: both stacked load runs
g_d and q_d, the section with the two grey wall slabs and hatched ground, CS/SL, R dashed green at
midspan, the parabola, its two end tangents 1 and 2 meeting 2f below the chord, the pole, the two
rays, the H dimension, and the near-horizontal support reactions. It adds a roof plan showing the
5 m influence strip (the key shows a 3-D sketch with a 5 m dimension instead, so this is a genuine
improvement for part b). Two things the key's plate has that the view lacks: the small
**node-equilibrium sketch** (dashed circle, R down, tangents 1 and 2 out) that the key draws to the
left of its Kräfteplan, and the label **i** for the division point on the load line. Minor label
collisions at the final step: "B", "R" and "CS/SL" overlap near the right support.

**Stated answer.** Key e): *"As the loading is doubled, the whole force diagram will be scaled by the
factor 2, therefore the internal forces in the cable will double as well."* The view's step 9 says
exactly that — "the shape does not change, so every direction in the force plan stays put and only
the scale grows. The whole Kräfteplan is multiplied by two, and so is every force in the cable" —
and prints both its own 11 576 kN and the sheet's 11 830 kN. Same answer.

**Differences.**
1. **SHEET IS WRONG:** d) 5915 kN and e) 11 830 kN are 2.2 % high, because the key laid its resultant
   off as a round 5.00 cm = 2500 kN instead of the 2437.5 kN it had just computed. The view's 5788 /
   11 576 kN are correct. Arithmetic above.
2. The key's plate also violates its own brief (crown drawn at 9.76 m, not 10 m). The view fixes this
   by adopting a 13.5 m wall; the equally defensible fix (13.28 m wall, crown at 10 m) gives
   6160 kN. The view should say the answer is only determined to about ±6 % by the drawing.
3. The key's node-equilibrium sketch and its load-line division point "i" are not drawn in the view.

---

## ex3_4 — Creative task: an asymmetric suspended roof
**Verdict: MIXED** — the view correctly catches and fixes a self-contradiction in the key, but it
adopts the key's 2.6 %-inflated forces as its target and therefore draws a different geometry from
the one the key drew.

| Quantity | Official sheet | View | |
|---|---|---|---|
| load, span, R | s_d = 37.5 kN/m, l = 65 m, R = 2437.5 kN | same | ok |
| N₁ | **3000 kN** | 2998 kN | ok |
| N₂ = N_max | **3500 kN** | 3499 kN | ok |
| A (answer table) | **3000 kN** | 2998 kN | ok |
| A (sentence under the table) | **3500 kN** | — | **sheet wrong** |
| B | 3500 kN | 3499 kN | ok |
| H | not printed; drawn geometry ⇒ 2850 kN | 2947 kN | see below |
| right wall raised by | drawn 78.4 pt = **13.83 m** | 14.70 m | differs |
| sag below the chord | drawn 39.4 pt = **6.95 m** | 6.72 m | differs |
| b) f_td = f_tk/γ_M, S235 | 235/1.05 = **223.8 N/mm²** | 223.8 N/mm² | ok |
| b) A_req = N_d/f_td | **15 638.96 mm²** | 15 632 mm² | ok (0.04 %) |
| b) D = √(4A/π) | 141.11 → prints **142 mm** (rounded up) | 141.08 → Ø 142 mm | ok |
| c) stiffening scheme | **not answered on the key** | plan with cross-ties | view adds it |

**Proof the key's sentence is wrong.** A cable can only pull along itself, so the reaction at a
support equals the force in the segment that reaches it: A = N₁, B = N₂. The table says A = 3000,
B = 3500; the sentence three lines below says "Auflagerreaktionen: A = 3500 kN, B = 3500 kN" (the
English page repeats it). Take the sentence at face value with the same thrust H = 2948.8 kN: A's
vertical component would be √(3500² − 2948.8²) = 1885.4 kN, identical to B's, so the two verticals
would sum to **3770.8 kN** — against only 2437.5 kN of applied load. Vertical equilibrium fails by
55 %. The table is right and the sentence is a slip; the view says so explicitly in its step-7
caption and uses A = N₁ = 2998 kN. **The view is right here.**

**The geometry the view draws is not the geometry the key drew.** The key's Creative plate, measured:
left support 74.97 pt = 13.23 m above ground (unchanged from task 3), right support 153.4 pt =
27.06 m, so the right wall is raised by **13.83 m**; the parabola hangs **6.95 m** below the tilted
chord. Those numbers with the true R = 2437.5 kN give H = 2850 kN, A_v = 612 kN, B_v = 1825 kN,
N₁ = **2915 kN**, N₂ = **3384 kN**. Multiply by the same 2500/2437.5 = 1.0256 load-line inflation found
on p. 3 and you get 2989 and 3470 — i.e. the key's printed 3000 and 3500. So the Creative task's
answers carry exactly the same 2.6 % error as task 3's 5915 kN. The view, instead of correcting it as
it did in ex3_3, treats 3000/3500 as the target and back-solves a geometry that produces them
(Δ = 14.70 m, f = 6.72 m). Because part a) explicitly says "choose a new height for the right support
wall", the view's design is legitimate and nothing in it is unbalanced — but it is a *different*
design from the plate's, and the view's treatment of the key is inconsistent between the two tasks.

**What is drawn.** The view has everything the key's plate has except the sculpture and the pale
comparison arch: ground and hatch, both wall slabs (with the original right-wall height ghosted
behind the raised one), the load run, R dashed green, the tilted CS/SL chord, the parabola with its
two end tangents 1 and 2, the pole, both rays, the load-line division point **i**, and both reactions
labelled with their magnitudes and drawn along the cable. It adds two things the key does **not**
supply: the cable cross-section drawn at true 1:500 scale for part b), and — importantly — a **plan
with cross-ties for part c)**, which the official key leaves completely unanswered (there is no
stiffening sketch anywhere on p. 5).

**Stated answer.** No prose answer exists on the key for a) or c); b) is pure arithmetic and matches.

**Differences.**
1. **SHEET IS WRONG:** "A = 3500 kN" under the answer table contradicts the table's own A = 3000 kN
   and violates vertical equilibrium by 1333 kN. The view catches this and is correct.
2. The key's printed N₁ = 3000 / N₂ = 3500 are ~2.6 % high, from the same 5.00 cm load line as
   task 3. The view reproduces them rather than correcting them, and to do so adopts Δ = 14.70 m and
   f = 6.72 m instead of the key's drawn 13.83 m and 6.95 m. Defensible (a) is a free design), but
   inconsistent with how ex3_3 handles the identical slip.
3. Not user-visible, but a factual error in the source: the docstring of `web/views/ex3_4.js`
   (line 30) and the comment in `web/tools/regress/ex3_regress.py` (line 136) both claim that with
   A = 3500 the vertical components "would sum to 2712 kN". The correct figure is **3771 kN** — the
   regression script itself computes and prints 3771 two lines later.
4. The view answers part c) (bracing); the official key does not answer it at all.

---

# EX 4 "Arch structures" (Structural Design I, HS 22) — views ex4_1, ex4_2, ex4_3 vs. the official solution

Source of truth: `web/pdf/EX4-arch-structures-solution-en.pdf` (3 pp.), cross-checked against
`...-solution-de.pdf`. The sheet prints **almost no numbers** — only F₁d/F₂d/F₃d = 40 kN (p.1),
R_L / R_R = 48/48 and 56/40 kN and g_d = 4 kN/m (p.2), and R₁d = 800 kN, R₂d = R₃d = 400 kN,
g₁d = 160 kN/m, g₂d = g₃d = 80 kN/m (p.3). Everything else in the "Official sheet" column below was
**measured off the vector PDF rendered at 300 dpi**, using the sheet's own stated scales
(form 1:100 / 1:200, force 1 cm ≙ 20 / 10 / 100 kN; at 300 dpi 1 cm = 118.11 px). Measurement noise
is roughly ±2 %.

---

## ex4_1 — Task 1: arches under specific constraints (a, b, c)
**Verdict: MIXED** — every number is right; task c) answers a different question than the sheet's,
and the force diagram is missing the closing line that defines the sheet's point **i**.

| Quantity | Official sheet | View | |
|---|---|---|---|
| span A→B | 6.00 m (drawn 693 px @ 1:100) | 6 m | ok |
| load axes | 1.5 / 3.0 / 4.5 m | 1.5 / 3.0 / 4.5 m | ok |
| F₁d = F₂d = F₃d | 40 kN (printed) | 40 kN | ok |
| a) V at each support | 60 kN (pole 61.3 kN below load-line top) | 60 kN | ok |
| a) thrust H | 79.7 kN measured; 80 kN exact from the printed 100 kN arcs | 80.0 kN | ok |
| a) reaction A = B | **100 kN (printed twice, as compass arcs)** | 100.0 kN | ok |
| a) node I height | 1.092 m | 1.125 m | ok (drawing tol.) |
| a) crown rise f | 1.477 m | 1.500 m | ok (drawing tol.) |
| a) inner segments 2,3 | 82.4 kN | 82.5 kN | ok |
| b) drop of B | 2.12 m measured (2.00 m at 1:100) | 2.00 m | ok |
| b) thrust H | 120.5 kN measured; **120 kN printed** | 120.0 kN | ok |
| b) A_v / B_v | 19.5 / 100.5 kN | 20 / 100 kN | ok |
| b) node heights (+/0/−) | +0.267 / 0.000 / −0.79 m | +0.250 / 0.000 / −0.750 m | ok |
| b) reaction A | 122 kN | 121.7 kN | ok |
| b) reaction B | 157 kN | 156.2 kN | ok |
| b) segment forces 1–4 | 122 / 122 / 135 / 157 kN | 121.7 / 121.7 / 134.2 / 156.2 kN | ok |
| b) point **i** on load line | 60 kN below the load-line top (beside F₂d) | 20 kN below the top (beside F₁d) | **differs** |

**What is drawn.** The core construction is the same in both: one load line of 3 × 40 kN, one pole
whose distance from the load line *is* the thrust, four rays, and a funicular that starts at A and
lands on B. Pole side matches the sheet (left of the load line for the arch). Reaction arrows point
into the supports along the end members, as on the sheet; compression is blue, reactions green.
Three things the sheet draws and the view does not: (1) the **CS/SL closing line** in the force
diagram — the sheet draws the ray from the pole parallel to the chord A–B, and its intersection with
the load line is what it labels **i**; the view keeps the label but pins it at the pole's own height,
which coincides with the sheet only in a) (horizontal chord) and is 40 kN out in b); (2) the
**compass-arc construction** of the pole in a) — the sheet swings two 100 kN arcs from the ends of
the load line and takes the intersection, which is the graphical form of the view's
√(100²−60²); (3) the **three node-equilibrium bubbles** at I, II, III (a small circle at each load
node with its two member forces and the load closing), drawn for both a) and b) — six sub-diagrams
in all, entirely absent from the view. The view also does not carry the sheet's member numbers 1–4
and node numerals I–III (it labels members with their kN value instead).

**Stated answer.** c) is not answered in words on either sheet (EN or DE) — it is answered by a
**drawing**: in case a) only, a second, *paler blue* funicular polyline is drawn over the same
supports and the same three loads, with a **higher** crown. Measured: pale node I = 1.918 m against
the solution's 1.092 m, i.e. the same funicular scaled by 1.757, so H′ = 80/1.757 ≈ **45.5 kN** and
its largest force is √(45.5² + 60²) ≈ **75 kN**. Nothing is drawn for c) in case b). The view answers
c) completely differently: it inverts the funicular below the chord into a **cable in tension**, and
its step-8 text ("an arch and a cable are the same drawing read upside down") plus the grey `alt`
ghost are about inversion, not about a different rise.

**Differences.**
1. **c) is a different construction.** Sheet = *a second arch of a different rise, still in
   compression*; view = *the same arch inverted into a cable*. Both are honest answers to "are there
   other possible solutions", and the view's is the stricter one — the sheet's higher arch has a
   relevant force of ≈75 kN, so **it does not satisfy a)'s own condition that the relevant force be
   100 kN**, whereas the inverted cable reproduces 100 / 82.5 / 82.5 / 100 kN exactly. On that
   reading the sheet's qualitative alternative is loose, but the view still fails to show the family
   of *arches* the sheet is pointing at (the `Ncon` slider can produce it, but nothing in the
   narrative says so).
2. **Point i is misplaced in case b).** The sheet defines i as the intersection of the closing-line
   ray with the load line (60 kN down from the top; the chord falls 2 m in 6 m, so the ray from the
   pole drops H/3 = 40 kN over the thrust distance and lands 20 + 40 = 60 kN down). The view puts i
   at the pole's own level, 20 kN down. In a) the two coincide, which is why it was not caught.
3. **No closing line, no compass arcs, no node bubbles.** Presentation gaps, not errors — but the
   pole in a) is *constructed* on the sheet and only *computed* in the view, and the node bubbles are
   six of the sheet's fifteen drawn sub-figures on page 1.

---

## ex4_2 — Task 2: support reactions in arch structures (a, b, c, d)
**Verdict: AGREES**

| Quantity | Official sheet | View | |
|---|---|---|---|
| total load / g_d | 24 m × 4 kN/m (printed) | 24 m × 4 kN/m | ok |
| a) spans | 12.0 + 12.0 m | 12 + 12 m | ok |
| a) rises | 2.98 / 2.96 m | 3.00 / 3.00 m | ok |
| a) R_L / R_R | **48 / 48 kN (printed)** | 48 / 48 on the load line | ok |
| a) H₁ / H₂ | 24.1 / 24.0 kN | 24.00 / 24.00 kN | ok |
| a) A | 34.2 kN | 33.94 kN | ok |
| a) B | 48.9 kN, **purely vertical** | 48.00 kN, vertical | ok |
| a) C | 33.1 kN | 33.94 kN | ok |
| b) spans | 13.96 + 10.04 m | 14 + 10 m | ok |
| b) rises | 3.00 / 2.98 m | 3.00 / 3.00 m | ok |
| b) R_L / R_R | **56 / 40 kN (printed)** | 56 / 40 | ok |
| b) H₁ / H₂ | 33.1 / 16.5 kN | 32.67 / 16.67 kN | ok |
| b) A | 43.1 kN | 43.02 kN | ok |
| b) B | 51.2 kN, 18.9° off vertical, up-and-LEFT | 50.60 kN, 18.43° off vertical, up-and-left | ok |
| b) C | 25.8 kN | 26.03 kN | ok |
| d) rise of the missing left arch | **5.91 m** (measured off the drawn arch) | **5.880 m** | ok |
| d) right rise | 3.01 m | 3.00 m | ok |
| d) H₁ = H₂ | 16.8 / 16.8 kN | 16.67 / 16.67 kN | ok |
| d) A / B / C | 33.3 / 48.9 vertical / 25.0 kN | 32.58 / 48.00 vertical / 26.03 kN | ok |
| ΣV | 96 kN | 96.0 kN | ok |

**What is drawn.** Same construction, same conclusion: one load line split at the arch division,
one pole per arch at its own thrust distance, four rays that are the two end-chords of each arch, a
closed polygon, and B as the vector between the two poles. The view reproduces the sheet's roller at
B in d) (un-hatched, plain line under it, vertical reaction) and gets the arrow directions right,
including B pointing up-and-to-the-**left** in b), which is what the sheet draws. Three
presentational gaps: (1) the view's **force diagram is the mirror of the sheet's** — the sheet puts
both poles to the *left* of the load line, the view puts them to the *right*; every direction still
comes out identical, and it is internally consistent, but it is inconsistent with the view's own
ex4_1, where the pole is on the left as on the sheet; (2) the sheet's form diagram draws the
**resultant of each arch's load as a single arrow** (R_L, R_R, with the printed values) and the
**dashed two-segment funicular** whose apex sits at exactly 2f above the springing — the graphic
step that makes qL²/(8f) a *construction* rather than a formula; the view prints the two values only
on the load line and draws neither; (3) the three **node-equilibrium bubbles** at I, II, III are
again absent. Cosmetic bug, not a statics issue: the "Lageplan 1:200 — form diagram" title is
positioned under the *force* diagram and collides with the "Kräfteplan" title.

**Stated answer.** c) is the one place on the whole sheet with a written answer:
> "In a) the thrust of the two arches cancels out, which results in a vertical reaction force B.
> In b) the wider span of the left arch results in additional thrust which makes the reaction force
> B non-vertical."
(DE: "…Bei b) resultiert aus der grösseren Spannweite des linken Bogens eine nicht-vertikale
Auflagerkraft B, welche dem zusätzlichen Schub entgegen wirkt.")
The view's step 7 says the same thing and quantifies it: "the vertical part does not move at all:
48 kN either way … what appears is a horizontal 16 kN, and B tilts … the change is +2.60 kN, i.e.
+5.4 %". Consistent with the sheet and strictly more informative.

**Differences.**
1. None of substance. The only content the sheet has and the view does not is the **intermediate
   graphic step** — load resultants R_L / R_R drawn in the form diagram and the dashed 2f funicular
   triangle — plus the node bubbles. Numbers, reaction directions, the roller in d), the 5.88 m
   answer and the c) discussion all match.

---

## ex4_3 — Creative task: cathedral (a, b, c)
**Verdict: DIFFERS**

| Quantity | Official sheet | View | |
|---|---|---|---|
| g₁d / g₂d / g₃d | 160 / 80 / 80 kN/m (printed) | same | ok |
| R₁d | **800 kN (printed)** = 160 × 5 m nave | 800 kN, treated as g₁d's resultant | ok |
| R₂d = R₃d | **400 kN (printed)** | 400 kN | ok |
| springing level above ground | 6.97 m | 6.956 m | ok |
| nave span (pier to pier) | 5.04 m | 5.0 m | ok |
| nave thrust-line rise | 4.386 m | 4.398 m | ok |
| nave thrust H | 114.0 kN | 113.69 kN | ok |
| springing reaction (nave) | ≈416 kN, ≈16° off vertical | 415.8 kN, 15.87° | ok |
| **left** aisle rise | 2.142 m (chord horizontal) | 2.199 m | ok |
| **left** pier head force | **602.8 kN, vertical** (green B in the force diagram) | 600 kN, vertical | ok |
| **right** aisle chord | **falls 3.13 m** from pier to buttress head (inclined CS/SL) | horizontal — mirror of the left | **DIFFERS** |
| **right** pier head force | **531.7 kN, vertical** (green C in the force diagram) | 600 kN | **DIFFERS** |
| G₁d (left buttress ballast) | **≈184 kN** | 420 kN (default; slider 0–1400) | differs by design |
| G₂d (right buttress ballast) | **≈211 kN** | not drawn at all | **missing** |
| reaction A | ≈401 kN, ≈16° off vertical, inclined | not drawn / not stated | **missing** |
| reactions B, C | vertical, 602.8 / 531.7 kN | pier-head arrows only, no ground reactions | partial |
| reaction D | inclined, ≈476 kN vertical component | not drawn | **missing** |
| ΣV into the ground | 1994.7 kN (= 1600 roof + 394.7 ballast); checks A+B+C+D | "1600 kN of roof in total" only | partial |

**What is drawn.** The view gets the *given* half of the problem exactly right: the pointed nave
vault, its parabolic thrust line, R₁d as g₁d's resultant, and — the actual answer to a) — the left
aisle vault whose rise must be **half** the nave's so that the two thrusts cancel and the pier is
pushed straight down. That is the sheet's a) and it matches to 3 %. From there the two diverge
badly.

*The right side is not a mirror.* The sheet's right aisle springs at the pier at springing level and
lands on the right buttress head **3.13 m lower**, on an inclined CS/SL that the sheet draws
explicitly and labels; G₂d is applied at that lower head, and segment 10 runs from it to support D.
The consequence is arithmetic, not cosmetic: taking moments on the 5 m right aisle
(400 kN of load, H = 113.7 kN, chord dropping 3.13 m), the vertical delivered to the pier is
(400·2.5 − 113.7·3.13)/5 = 129 kN, not 200 kN, so the **right pier carries 400 + 129 = 529 kN**, which
is exactly the 531.7 kN the sheet's force diagram shows for C. The view draws a symmetric parabola
and its step 8 asserts "the right side is the mirror image and the numbers are identical … the same
600 kN at the pier head". That is 600 vs 532 kN — a 13 % error against the sheet's own design, and
the view never draws a right-hand force path at all.

*The force diagram is the wrong object.* The sheet's page 3 is **one** force diagram: a single load
line carrying G₁d, R₂d, R₁d, R₃d, G₂d top to bottom, three poles on a common vertical, ten numbered
rays, two CS/SL closing lines (one horizontal, one inclined), and the four ground reactions A, B, C,
D closing it. The task's instruction is literally "draw the inner force flow in the construction
**with help of the force diagram**". The view draws **two detached triangles** — the nave's and one
aisle's — with no G₁d, no G₂d, no reactions and no closure. The buttress verdict is therefore
computed in JS and annotated on the form diagram, not read off a force diagram; there is nothing in
the view's Kräfteplan that could produce it.

*The buttress thrust line is drawn back to front.* `bthrust` is two segments: **vertical** from the
head down to 0.62·SPR, then inclined to the landing point. Physically the 113.7 kN horizontal arrives
*at the head*, so the line must deviate immediately; and since G₁d's line of action is the buttress
axis, which the thrust line only touches at the head, G₁d has to be added *at the head* — after which
the line is a **single straight inclined segment** all the way to the ground. That is exactly what
the sheet draws (segment 6, one straight line from the head to A). The view's landing point
e = M/N = 790.8/620 = 1.276 m is nonetheless correct, so the answer is right and the drawing of it is
not.

*The buttress geometry is modelled differently.* The view's `but0` is a rectangle of width b
**centred on the buttress axis**, so only b/2 of lever arm resists, giving Gmin = 2M/b − V. The
sheet's buttress is a stepped wall running ~2.6 m **outward** from the axis (the axis is its inner
face, where the aisle springs); the thrust line lands ≈2.1 m outboard of the axis and still sits
inside the masonry. The sheet achieves that with G₁d ≈ 184 kN — less than the 200 kN the aisle
itself delivers — whereas the view's centred model needs 327 kN at b = 3 m and its step-7 take-away
("a pinnacle is not decoration — it is ballast, and the drawn 0.70 m one is nowhere near enough") is
an artefact of halving the lever arm. Neither model is *wrong* — the task says design it yourself —
but the view's is roughly twice as pessimistic as the one the sheet actually drew.

Smaller gaps: no masonry outline for either aisle vault (the sheet draws pointed aisle vaults); no
thrust line down the piers to the ground and no ground reactions anywhere; the "form diagram" and
"force diagram" titles overlap on screen.

**Stated answer.** The sheet has no prose answer for this task; its answer is the drawing. The view's
step-8 sentence "the right side is the mirror image and the numbers are identical" is the one
explicit claim, and it is contradicted by the sheet's own drawing and force diagram (532 kN, not
600 kN, at the right pier).

**Differences.**
1. **The right side is asymmetric on the sheet and symmetric in the view**, and the view states the
   numbers are identical. Sheet: right pier 531.7 kN (measured directly off the green C vector in the
   force diagram, and independently confirmed by moments: 529 kN). View: 600 kN. The view is wrong
   about *the sheet's* design; it is self-consistent about *its own* symmetric design, but it never
   draws the right-hand force path down to the ground, so its own design is not actually completed
   either — which is precisely what task c) asks for.
2. **The single unified force diagram is missing.** The sheet's ten-ray, four-reaction Kräfteplan is
   the deliverable of the task; the view has two disconnected triangles and no G₁d, G₂d, A, B, C, D
   in force space at all.
3. **The buttress thrust line is drawn vertical-then-inclined** instead of one straight inclined line
   from the head. G₁d must be added at the head (its line of action meets the thrust line only
   there), which is how the sheet draws it. The landing point is right; the path is not.
4. **The buttress is modelled as a rectangle centred on the axis** rather than a mass extending
   outward from it, doubling the required ballast: the sheet stands on G₁d ≈ 184 kN, the view's
   default needs 327 kN at b = 3 m and it defaults to 420 kN.
5. Minor: no aisle vault outlines, no pier thrust lines to the ground, overlapping diagram titles.

---

### Where the sheet is loose
Only one place: **task 1 c)**. The alternative form drawn in pale blue over case a) has a largest
force of √(45.5² + 60²) ≈ 75 kN, not the 100 kN that a) itself demands ("In a) the relevant force
should be 100 kN"). As an answer to "is the form unique?" it is fine; as an answer to "are there
other possible solutions **for the cases above**" it breaks the case's own constraint. The view's
inverted-cable answer keeps every magnitude at 100 / 82.5 / 82.5 / 100 kN and does not.
No arithmetic error was found anywhere else on the three pages: every value I could measure —
including the unprinted 5.88 m in 2 d), the 4.40 m nave rise and the 600 / 532 kN pier heads —
is internally consistent.

---

# EX 5 "Arch-Cable" — Structural Design I, HS 22 — audit against `EX5-arch-cable-solution-en.pdf`

Method note. The solution sheet prints **no numeric answers and no prose** anywhere — the diff
between task and solution PDFs is drawings only. Every "official" figure below was therefore
**measured off the sheet's own vector geometry** at 300 dpi against its own two stated scales
(form diagram 1:100 → 1 cm = 1 m = 118.11 px; force diagram 1 cm ≙ 10 kN = 118.11 px). Measured
values reproduce to ±0.02 m / ±0.2 kN, so the sheet is drawn exactly, not freehand — except on
page 3, which the sheet itself declares qualitative.

---

## ex5_1 — Task 1 "Span": 70 kN over 7 m, three sets of supports

**Verdict: MIXED**

| Quantity | Official sheet | View | |
|---|---|---|---|
| span | 6.99 m (measured) → 7.00 m | 7.00 m | ok |
| F_d, a) and b) | 70 kN at midspan | 70 kN at midspan | ok |
| q_d, c) | 10 kN/m over 7.00 m = 70 kN | 10.0 kN/m over 7 m = 70 kN | ok |
| supports a) | pin + pin (both hatched) | pin + pin | ok |
| supports b), c) | **left = roller** (bare line, no hatch), right = pin | left roller, right pin | ok |
| A_v = B_v, all three | 35.0 kN | 35.0 kN | ok |
| **a) rise f** | **2.99 m → f = 3.00 m** | **default 1.75 m** | DIFFERS (slider reaches 3.00) |
| a) H = A_h = B_h | **40.9 kN** (measured 483 px) | 70.0 kN at default; 40.8 kN at f = 3.00 | see diff 1 |
| a) reaction A = B | 53.8 kN at 40.6° | 78.3 kN at default; 53.8 kN at f = 3.00 | see diff 1 |
| a) member 1 = 2 | 53.8 kN compression (blue) | same | ok |
| **b) rise f** | **3.00 m** (354 px) | default 1.75 m | DIFFERS |
| b) tie force | **40.9 kN** tension (red, measured 41.0) | 70.0 kN at default; 40.8 kN at f = 3.00 | see diff 1 |
| b), c) reactions | 35 kN, purely vertical, ΣH = 0 | same | ok |
| **c) rise f** | **1.50 m** (178 px) — deliberately half of a)/b) | default 1.75 m | DIFFERS |
| c) H = tie | **40.6 kN** measured (= q·L²/8f = 40.83) | 35.0 kN at default; 40.8 kN at f = 1.50 | see diff 1 |
| c) member at support | 53.8 kN | 53.8 kN (at f = 1.50) | ok |
| c) member at crown | = H = 40.8 kN | **labelled 53.8 kN at the crown** | WRONG label (diff 4) |
| force-diagram pole side | left of the load line | left of the load line | ok |

**What is drawn.** The view builds the same three structures the sheet builds — arch in blue over
the same 7 m, the roller cases getting a red tie along the chord and purely vertical green
reactions, the pole on the correct side of the load line, and the band thickness tapering along
the c) parabola. Four things the sheet draws are missing. (i) **The A_h / A_v decomposition.** The
sheet's a) draws four separate labelled green component arrows in the form diagram (A_h, A_v,
B_h, B_v) *and* closes the force diagram as a full rectangle of those components; the view draws
only the resultant reaction and a grey `H = …` dimension line. The task line printed in the view's
own header — "Divide each reaction force in its horizontal and vertical component" — is the one
instruction the view does not execute. (ii) **The c) ray fan.** The sheet's c) force diagram is a
fan of ~20 blue rays, one per polygon segment, which is the whole point of a distributed load; the
view draws only `ray1` and `ray2`, the two extreme rays, so its c) force diagram is
indistinguishable from a two-bar arch. (Its own sibling ex5_2 *does* draw the full fan, so this is
an internal inconsistency, not a house style.) (iii) **The c) resultant R and the dashed 2f
construction triangle**, both drawn on the sheet, are absent. (iv) The dashed chord is drawn but
never labelled **CS / SL** (closing string / Schlusslinie), and the corresponding CS/SL line and
division point **i** in the force diagram are absent. The sheet's per-node equilibrium circles at
I, II, III are also absent — a consistent house omission across all these views, noted once.

**Stated answer.** The sheet answers no question in words. Its non-verbal answer is that the same
H = 40.8 kN serves all three cases, achieved by halving the rise in c) (f = 3.00 → 1.50 m) because
a parabola under a UDL needs half the rise of a triangle under the equivalent point load. The view
carries one f slider shared by all three cases, so stepping a) → c) at fixed f halves H instead of
holding it; the view never says the sheet's point.

**Differences.**
1. The rise is a free design choice ("design the form of a possible structure"), and the view's
   slider can reach both of the sheet's values, so this is not an error — but the view's **default
   f = 1.75 m matches neither of the sheet's two choices**, so the view opens on H = 70 / 70 / 35 kN
   where the key shows 40.8 / 40.8 / 40.8 kN. `web/tools/regress/ex5_regress.py` lines 26–29 hard-code
   the 1.75 m defaults ("a) at f = 1.75 m, H = 70.0", "c) … H = 35.0") as if they were the answer;
   they are the view's answer, not the sheet's. Set f = 3.00 (a, b) and f = 1.50 (c) and the view
   reproduces the key to 0.1 kN.
2. The A_h / A_v component arrows are missing in a), in both diagrams. The sheet draws eight of
   them and the task text demands them. The view is incomplete here; the sheet is right.
3. The c) force diagram has no ray fan. The sheet is right: with a distributed load every segment
   carries a different force and the fan is the drawing that shows it.
4. In c) the view prints `53.8 kN` immediately above the **crown** of the parabola, where the true
   arch force is H = 40.8 kN. 53.8 kN is the value at the *supports*. The label contradicts the
   view's own force band, which is drawn thinnest exactly there. The view is wrong.

---

## ex5_2 — Task 2 "Cantilever": 40 kN reaching 4 m off a wall

**Verdict: AGREES**

| Quantity | Official sheet | View | |
|---|---|---|---|
| support separation | 3.00 m (measured 3.01) | 3.000 m | ok |
| upper support | **pin** (hatched to the wall) | pin | ok |
| lower support | **roller** on the wall face | roller | ok |
| a) load | 40 kN at 4.00 m | 40 kN at 4.000 m | ok |
| b) loads | 4 × 10 kN at 0.000 / 2.667 / 5.334 / 8.001 m | 0 / 2.667 / 5.333 / 8.000 m | ok |
| c) load | q_d = 5 kN/m over 8.01 m | 5 kN/m over 8.0 m | ok |
| resultant, all three | 40 kN at 4.00 m | 40 kN at 4.000 m | ok |
| pin vertical | 40 kN (takes everything) | 40.00 kN | ok |
| H (roller push / pin pull) | **53.4 kN** measured, all three | 53.333 kN | ok |
| pin resultant | 66.7 kN (measured 53.4 / 40.1) | 66.667 kN at 36.87° | ok |
| pin direction | up-and-into the wall | up-left | ok |
| roller direction | horizontal, away from the wall | horizontal, away | ok |
| b) cable node depths | **1.511 / 2.510 / 3.010 m** below the pin | 1.500 / 2.500 / 3.000 m | ok |
| b) cable segments | 3 (the load on the wall axis gets none) | 3 — degenerate segment skipped | ok |
| b) force at the wall | 61.2 kN (slope 0.567 = 30/53.33) | 61.19 kN | ok |
| c) parabola at 2/4/6/8 m | 1.283 / 2.184 / 2.731 / 2.913 m | 1.313 / 2.250 / 2.813 / 3.000 m | ok (drafting tol.) |
| c) parabola landing | on the strut at 8.0 m, zero slope | exactly on it (`close` = 0) | ok |
| c) max cable force | 66.67 kN (= the pin reaction) | **66.07 kN** | 0.9 % low (diff 2) |
| strut | compression, at the roller's level, out to the tip | same | ok |
| cable | tension, red | tension, pink | ok |

**What is drawn.** This is a clean match. The view reproduces the sheet's construction member for
member: the tension cable hung from the pin, the compression strut lying along the roller's own
level, the cable landing exactly on the far end of the strut, the pole one thrust to the side of
the load line, one ray per cable segment plus the strut ray, and the two green reactions closing
the polygon in the same senses the sheet draws them. The two force diagrams are point reflections
of one another (sheet: load line left, pole right-and-low; view: load line right, pole
left-and-high) — every ray is still parallel to its member and every arrow still points the way
the sheet points it, so this is orientation, not substance. The view adds a full hatched wall line
and a dashed resultant R in all three cases (the sheet draws R only in c)); the sheet stacks the
four load magnitudes F₁d…F₄d as labelled ticks on the b) load line where the view labels only the
total 40. Nothing the sheet constructs is missing.

**Stated answer.** The sheet answers nothing in words. Its silent answer — identical reactions in
a), b) and c) because the resultant never moves, with only the cable's shape changing — is exactly
the view's step 8 ("Three shapes, one answer"). Agreement.

**Differences.**
1. Presentation only: force-diagram orientation, the drawn wall, the R arrow in a) and b), and the
   per-load tick labels on the b) load line. None of these changes an answer.
2. One small numeric slip: in c) the view reports the cable force at the wall as **66.07 kN** (and
   as the maximum). The true value there is √(53.333² + 40²) = **66.667 kN**, which is also what
   the sheet's outermost ray measures. The view computes each chord's force from the *mid-segment*
   shear (`compute`, `const v = tot - S.q * ((S.L * (i + 0.5)) / NSEG)`), which is right for a chord
   but understates the true tangent value at the very end of the cable. 0.9 % — cosmetic, but it is
   a printed number that disagrees with the key.

---

## ex5_3 — Creative task "Qualitative Force Flow": five load cases on one pin + one roller

**Verdict: MIXED**

| Quantity | Official sheet | View | |
|---|---|---|---|
| span A–B | 12.00 m (measured 11.95–12.02) | 12 m | ok |
| supports | pin left, roller right, same level | pin left, roller right | ok |
| a) load | F_d at 6.00 m | 6 m | ok |
| b) load | F_d at 14.95 m → 15.00 m | 15 m | ok |
| c) loads | F₁d at 5.88→6.00 m, F₂d at 15.00 m, equal | 6 m and 15 m, equal | ok |
| d) loads | q_d over 0–12.00 m with **R = F_d**, plus F_d at 15.00 m | q over 0–12 totalling 1 F, plus F at 15 | ok |
| e) load | q_d over 0–18.3 m → 0–18.00 m | q over 0–18 m | ok |
| a) reactions | both **up** | A = +0.50 F, B = +0.50 F | ok |
| b) reactions | **A DOWN**, B up | A = −0.25 F, B = +1.25 F | ok |
| c) reactions | both up | A = +0.25 F, B = +1.75 F | ok |
| d) reactions | both up | A = +0.25 F, B = +1.75 F | ok |
| e) reactions | both up | A = +4.50 q, B = +13.50 q | ok |
| e) resultants shown | **two**: R_l at 6.00 m, R_r at 15.00 m | one combined R at 9 m | differs (diff 3) |
| d) resultant shown | R at 6.00 m (the UDL's), F_d separately | one combined R at 10.5 m | differs (diff 3) |
| thrust line through the roller? | **yes, in all five** | **no in b)–e)** | DIFFERS (diff 1) |
| tie | inclined chord A → far end | horizontal A → far end | consequence of diff 1 |
| sign change of the thrust line | crossing drawn in c), d), e) | reported as "—" in all five | WRONG (diff 2) |

No load magnitudes exist to check: the sheet prints only the two relations F₁d = F₂d and R = F_d.
Both view and sheet are therefore working in multiples of one unknown load, and every reaction the
view computes agrees with the sheet's drawn arrow directions.

**What is drawn.** The view and the sheet draw the *same pair of lines* — a blue compression path
and a red tension chord bounding it — but they shear the pair differently, and only one of the two
shears is physically realisable. The sheet keeps the **blue thrust line passing exactly through
both supports** (measured: in b) the blue lies on the support axis at A and at B, and the red rises
linearly to the load at 15 m) and lets the red tie be the inclined closing chord. The view instead
fixes the **red tie horizontal through both supports** and lets the thrust line be M(x)/H. For a),
where M = 0 at both supports, these coincide and the view is right. For b), c), d) and e) they do
not: the view's thrust line dips below the axis at x = 12 by the hog (1.6 m at the default depth),
so the drawn roller sits on the tie with **the compression path passing 1.6 m underneath it and no
member joining the two**. The reaction B is the kink in that thrust line, and the view applies it
to a point that is not on the structure. There is no such gap on the sheet. Two further, smaller
gaps: the sheet's d) and e) carry a **CS / SL** label and paired **f** dimensions marking the
construction rise, and e) splits the UDL into the two part-resultants R_l and R_r that make the
4.5 q / 13.5 q split obvious by inspection; the view does neither. Worth recording in the sheet's
favour and against it: the sheet's b) is an *exact* funicular (the blue-to-red gap tracks M(x) to a
constant 0.388 m per unit F across all five sample points, and the kink ratio at B is exactly
R_B/R_A = 5), but its c), d) and e) are freehand — in c) the kink at B is 1.49 × the kink at F₁d
where statics requires 1.75. That is legitimate: the sheet's own instruction is "qualitative =
without force diagram". The view's thrust lines are exact in all five, which is better.

**Stated answer.** No words on the sheet. The answer it draws is the direction of the ten reaction
arrows, and the view gets all ten right, including the one that matters — b) with A pointing
downward. The view's own added claim, that a chord goes into tension where the thrust line drops
below it, matches the sheet's colouring everywhere.

**Differences.**
1. **The thrust line misses the roller in b), c), d) and e).** The sheet draws the compression path
   through both supports; the view draws it through neither support at B, hanging the reaction on
   empty space. The two drawings are shear-equivalent as *force diagrams*, but only the sheet's is
   a drawable *structure*. The sheet is right. Fix is one line: incline the tie so the thrust line
   returns to the axis at x = 12.
2. **The inflection point never renders — in any case.** `compute` finds it with
   `if (Ms[i - 1] * Ms[i] < 0)`, and because the sampling is `xs = far * i / NSEG` with NSEG = 60,
   the true zero lands *exactly on a sample node* in every case that has one: c) at x = 8.00 m
   (i = 32 of 15 m/60), d) at x = 6.00 m (i = 24), e) at x = 9.00 m (i = 30). The product is 0, not
   negative, so `inflect` is `null` in all five. Live-checked: `{"inflect":null}` for sit = 0…4.
   Consequences: step 5 prints "**the thrust line changes side at x = —**" for c), d) and e), which
   is false; the `ptInf` dot and its "sign changes at … m" caption never appear; and the on-drawing
   label **"hogging: the top is now in tension"** — the view's whole point about cantilever
   colouring — is dead, because its text and position are only ever set inside the
   `if (d.inflect !== null)` branch even though its own `when` clause (`hog > 0.05`) is satisfied in
   b), c), d) and e). A `<= 0` test, or interpolating on a sign change including zeros, fixes it.
3. Resultant presentation. In d) the sheet draws R at 6.00 m — the UDL's resultant, which is what
   "R = F_d" is telling you — and keeps F_d separate at 15 m; in e) it draws two resultants, R_l at
   6.00 m over the span and R_r at 15.00 m over the overhang, which is precisely how a student sees
   4.5 q / 13.5 q without arithmetic. The view collapses each case to one combined resultant
   (10.5 m in d), 9 m in e)). Not wrong, but it throws away the sheet's pedagogic device, and in d)
   it makes the printed "R = F_d" relation invisible.

---

### Cross-cutting

* No **SHEET IS WRONG** finding on EX 5. Pages 1 and 2 measure exact to the last 0.2 kN; page 3's
  freehand funiculars in c), d) and e) are covered by the sheet's own "qualitative" caveat.
* `web/tools/regress/ex5_regress.py` needs one correction of intent: its EX 5.1 block (lines 26–29)
  asserts the view's default f = 1.75 m and the H = 70 / 35 kN that follow, presenting them as the
  targets. The recovered key draws f = 3.00 m in a) and b) and f = 1.50 m in c), giving
  **H = 40.83 kN in all three**. The EX 5.2 and EX 5 Creative blocks are confirmed correct against
  the key.

---

# EX 6 "Trusses" (Structural Design II, FS 23) — views ex6_1 … ex6_5 against `EX6-trusses-solution-en.pdf`

Method note. The sheet prints **no member-force numbers anywhere**. Its answer content is
(i) the three determinacy count-lines on p. 1, (ii) the F_c,max / F_t,max table in task 3
(64 kN / 90 kN), and (iii) four drawn Cremona force diagrams at a stated **1 cm ≙ 10 kN**.
So the "Official sheet" columns below are the member forces **measured off the sheet's own
force diagrams** — the PDF was rasterised at 300 dpi and the red/blue polylines measured in
pixels, calibrated on the load line (whose total is known exactly from the given loads).
Accuracy is ±0.3 kN. The sign in every case is the sheet's own colour (red = tension,
blue = compression). Every sheet diagram was also re-derived by independent joint
equilibrium; all four are internally consistent and correct.

---

## ex6_1 — Task 1, Internal Statical Determinacy

**Verdict: MIXED**

| Quantity | Official sheet | View | |
|---|---|---|---|
| Diagram A (Warren), S | 11 | 11 | ok |
| Diagram A, A | 3 | 3 | ok |
| Diagram A, 2K | 14 (K = 7) | 14 (K = 7) | ok |
| Diagram A, verdict | `11 + 3 = 14` statically determinate | `11 + 3 − 2×7 = +0` statically determinate | ok |
| Diagram B (stepped), S | 17 | 17 | ok |
| Diagram B, 2K | 20 (K = 10) | 20 (K = 10) | ok |
| Diagram B, verdict | `17 + 3 = 20` statically determinate | `17 + 3 − 2×10 = +0` statically determinate | ok |
| Diagram C (X-braced), S | **15** | **11** | differs |
| Diagram C, 2K | **16 (K = 8)** | **12 (K = 6)** | differs |
| Diagram C, printed line | `15 + 3 > 16` | `11 + 3 − 12 = +2` | differs |
| Diagram C, verdict | statically indeterminate | OVER-determined by two | ok |
| Diagram C, degree | +2 (18 − 16) | +2 (14 − 12) | ok |

**What is drawn.** The view redraws all three form diagrams and its topology is bar-for-bar
the sheet's. Diagram A is the same seven-joint Warren with a pin left and a roller right.
Diagram B is the same seventeen-member stepped truss — I checked all seventeen bars and all
ten joints against the sheet and they are identical, including the detail that its right-hand
support is a **roller on a 45° inclined plane**, which the view draws with an inclined hatch
and correctly counts as one reaction component. Diagram C is the same two-panel X-braced
rectangle (2 top + 2 bottom chords, 3 verticals, 4 diagonals). The view adds something the
sheet does not have: it greys out one diagonal per panel to show *which* two bars are the
surplus, and it offers a toggle for that. Nothing on the sheet is missing.

**Stated answer.** The sheet's words are "statically determinate / statically determinate /
statically indeterminate". The view says "statically determinate / statically determinate /
OVER-determined by two, one surplus diagonal per panel". Same verdicts; the view is strictly
more informative (the sheet does not say by how much, nor in which direction, though its
`>` sign implies over-determinacy).

**Differences.**
1. **Diagram C is counted differently.** The sheet writes `15 + 3 > 16`, i.e. it counts
   **15 members and 8 joints**. That is only reachable by treating the two diagonal
   **crossings as pinned joints**: 6 frame joints + 2 crossings = 8, and the 4 diagonals cut
   into 8 half-diagonals gives 2 + 2 + 3 + 8 = 15. The view counts the diagram as drawn —
   the diagonals cross **without** a joint — giving 11 members and 6 joints, and says so
   explicitly in both its source docstring and its step text ("they cross WITHOUT a joint",
   "a crossing without a joint is not a joint: it adds a member and no equation").
   Neither is arithmetically wrong and **both land on degree +2**, so the answer is the same;
   but the two printed lines will not match if a student holds them side by side. The view's
   reading is the standard convention for X-bracing; the sheet's is a defensible but
   unusual modelling choice that it never states.
2. Cosmetic only: the sheet gives no names to the three diagrams; the view names them
   "Warren truss", "stepped truss", "two X-braced panels".

---

## ex6_2 — Task 2, Spanning Truss

**Verdict: MIXED** — every number agrees exactly; the force diagram the sheet draws is not
the force diagram the view draws.

Four square panels (45° diagonals), pin at B0, roller at B4, F₁ = F₂ = F₃ = 30 kN on the
three interior top joints. Sheet member numbers 1–11 (zero members printed as `0`) mapped to
the view's joint-pair names.

| Sheet member | Official sheet (measured, 1 cm ≙ 10 kN) | View | |
|---|---|---|---|
| 1 — diagonal A–T1 | −63.7 (C, blue) | −63.64 (C) | ok |
| 2 — bottom A–B1 | +45.1 (T, red) | +45.00 (T) | ok |
| 3 — top T1–T2 | −44.8 (C, blue) | −45.00 (C) | ok |
| 4 — vertical T1–B1 | +15.0 (T, red) | +15.00 (T) | ok |
| 5 — diagonal B1–T2 | −21.2 (C, blue) | −21.21 (C) | ok |
| 6 — bottom B1–B2 | +60.1 (T, red) | +60.00 (T) | ok |
| 6 — bottom B2–B3 | +60.1 (T, red) | +60.00 (T) | ok |
| 7 — top T2–T3 | −44.8 (C, blue) | −45.00 (C) | ok |
| 8 — diagonal T2–B3 | −21.2 (C, blue) | −21.21 (C) | ok |
| 9 — vertical T3–B3 | +15.0 (T, red) | +15.00 (T) | ok |
| 10 — bottom B3–B4 | +45.1 (T, red) | +45.00 (T) | ok |
| 11 — diagonal T3–B4 | −63.7 (C, blue) | −63.64 (C) | ok |
| `0` — top T0–T1 | 0 | 0 | ok |
| `0` — vertical B0–T0 | 0 | 0 | ok |
| `0` — vertical B2–T2 | 0 | 0 | ok |
| `0` — top T3–T4 | 0 | 0 | ok |
| `0` — vertical B4–T4 | 0 | 0 | ok |
| Reaction A | 45.0 up (load line) | 45.0 up | ok |
| Reaction B | 45.0 up (load line) | 45.0 up | ok |
| zero-force members | 5 | 5 (same five) | ok |
| F_t,max | +60 (member 6) | +60.00 | ok |
| F_c,max | −63.7 (members 1, 11) | −63.64 | ok |
| S + A vs 2K | (not asked here) | 17 + 3 = 2 × 10 | ok |

Every number, every sign, every zero-force member agrees. Load-factor slider checked at
2.0×: all forces scale exactly linearly (90/120/−127.28 …), which is correct for a truss.

**What is drawn.** The **form diagram is identical** to the sheet's — same ten joints, same
seventeen bars, same V of diagonals (rising right in panels 1–2, rising left in panels 3–4),
same pin/roller, same three loads, and the same tension-red / compression-blue / zero-grey
colouring the sheet asks for. The **force diagram is not the same object.** The sheet draws
one **single Cremona/Maxwell reciprocal diagram**: a vertical load line carrying F₁F₂F₃ down
and B, A back up, with every joint polygon nested into it so that bottom-chord members 2, 6
and 10 all radiate from one point and members 1 and 11 close on the load line's ends. The
view instead draws **ten separate joint polygons in a 2 × 5 grid**, one per joint, each
correct and each with edges parallel to and coloured like its members — but disjoint. The
reciprocity that is the whole point of the Cremona (shared edges, one figure) is therefore
not visible. The view also does **not carry the sheet's member numbering 1–11**; it labels
each bar with its force value instead, and names joints B0…T4 rather than leaving them
unnamed as the sheet does. Nothing else on the sheet is missing.

**Stated answer.** The sheet poses no discussion question here — a), b), c) are all
constructions. The view answers all three: A = B = 45 kN both vertical; five zero-force
members, listed by name; F_t,max = +60.00 and F_c,max = −63.64. All correct.

**Differences.**
1. The view's force diagram is a **grid of ten disconnected joint polygons**, not the sheet's
   single superimposed Cremona diagram. Same information, different drawing; the sheet's
   task c) says "complete the force diagram" (singular) and its solution is one figure.
2. The view does not reproduce the sheet's **member numbers 1–11 / `0`**, so a student cannot
   read the view against the printed sheet member by member.
3. Module size: the sheet's panel is 2.667 m at 1:100; the views use 2.500 m. The panels are
   square with 45° diagonals in both, so **every force is identical** — this is documented in
   `ex6_common.js` and in `ex6_regress.py`, and it is not an error, but the view's caption
   still reads "Form diagram 1:100" while drawing a 10.00 m span against the sheet's 10.67 m.

---

## ex6_3 — Task 3, Cantilevering Truss

**Verdict: MIXED** — every number agrees exactly, including the sheet's printed answer table;
the Cremona diagram and the resultant R are not reproduced.

Three square panels cantilevering right off a wall; roller (horizontal only) at the top wall
joint T0, pin at the bottom wall joint B0; F₁ = F₂ = F₃ = 15 kN at T1, T2, T3; T0 unloaded.
Sheet joints are numbered I…VII, members 1–10 plus three `0`.

| Sheet member | Official sheet (measured, 1 cm ≙ 10 kN) | View | |
|---|---|---|---|
| 1 — diagonal II–I (B2–T3) | −21.3 (C, blue) | −21.21 (C) | ok |
| 2 — top III–I (T2–T3) | +15.1 (T, red) | +15.00 (T) | ok |
| 3 — bottom IV–II (B1–B2) | −15.1 (C, blue) | −15.00 (C) | ok |
| 4 — vertical III–II (B2–T2) | +15.0 (T, red) | +15.00 (T) | ok |
| 5 — diagonal IV–III (B1–T2) | −42.4 (C, blue) | −42.43 (C) | ok |
| 6 — top V–III (T1–T2) | +45.1 (T, red) | +45.00 (T) | ok |
| 7 — bottom VI–IV (B0–B1) | −45.2 (C, blue) | −45.00 (C) | ok |
| 8 — vertical V–IV (B1–T1) | +30.0 (T, red) | +30.00 (T) | ok |
| 9 — diagonal VI–V (B0–T1) | −63.7 (C, blue) | −63.64 (C) | ok |
| 10 — top VII–V (T0–T1) | +90.1 (T, red) | +90.00 (T) | ok |
| `0` — vertical VII–VI (B0–T0) | 0 | 0 | ok |
| `0` — bottom II–tip (B2–B3) | 0 | 0 | ok |
| `0` — vertical I–tip (B3–T3) | 0 | 0 | ok |
| Reaction A (horizontal, at T0) | 90.1 pointing left | 90.0 horizontal | ok |
| Reaction B (at pin B0) | 100.8 up-and-right (measured) | 100.6 (= √(90² + 45²)) | ok |
| — its components | 90 out, 45 up | 90.0 out, 45.0 up | ok |
| Resultant R of the loads | 45, drawn dashed at F₂'s line | not drawn | see below |
| **F_c,max (answer table)** | **64 kN** | 63.6 kN | ok (rounding) |
| **F_t,max (answer table)** | **90 kN** | 90.0 kN | ok |
| zero-force members | 3 | 3 (same three) | ok |

The one place this sheet actually prints an answer — the F_c,max / F_t,max table — is
64 kN / 90 kN. The exact values are 45√2 = 63.640 and 90.000, so the sheet has rounded
63.64 → 64 and the view reports 63.6. Same number.

**What is drawn.** The form diagram matches the sheet exactly: same eight joints, thirteen
bars, all three diagonals rising to the right, the roller on the wall face at the **top** and
the pin at the **bottom** (the view's docstring explicitly flags this as the mirror of EX 7's
beam e), and it is right), and the same red-top-chord / blue-bottom-chord / blue-diagonal
colouring. The sheet's inclined resultant reaction at the pin is drawn as one inclined arrow
in both. Two things the sheet draws that the view does not: **(a) the dashed resultant
R = 45 kN**, which the sheet uses in both the form and the force diagram to set up global
equilibrium; **(b) the single Cremona force diagram** — again the view substitutes eight
separate joint polygons in a grid. The sheet's Cremona for this task is a clean single figure
in which member 10 (90 kN) spans the full width and the green A, B and R close the outer
triangle; none of that reads from the view's grid. The view also omits the sheet's roman
joint labels I…VII in favour of B0…T3, and again labels members with values rather than the
sheet's numbers 1–10.

**Stated answer.** The sheet's only worded output is the table (64 / 90 kN), and the view
prints exactly that in its RESULT bar and repeats it in the final step's takeaway. Agrees.

**Differences.**
1. Force diagram: grid of eight joint polygons instead of the sheet's one Cremona (as in
   ex6_2).
2. The sheet's **resultant R = 45 kN** — dashed green in both the form and the force diagram,
   and the device by which the sheet finds the inclined pin reaction graphically — is absent
   from the view, which states the reaction couple algebraically instead.
3. Member numbers 1–10 and joint labels I…VII from the sheet are not carried over.
4. Rounding only: sheet table 64 kN, view 63.6 kN.

---

## ex6_4 — Task 4, Combined Truss

**Verdict: MIXED** — every number agrees exactly; part a) is answered by a different method
from the one the sheet names, and the Cremona diagram is not reproduced.

Four square panels, pin at B0, roller at B3 (so the fourth bay cantilevers); F₁ = 60 kN at
T1, F₂ = 30 kN at T2, F₃ = 30 kN at T4 (the tip). Sheet members 1–9 plus six `0`.

| Sheet member | Official sheet (measured, 1 cm ≙ 10 kN) | View | |
|---|---|---|---|
| 1 — diagonal B3–T4 | −42.4 (C, blue) | −42.43 (C) | ok |
| 2 — top T2–T3 | +30.1 (T, red) | +30.00 (T) | ok |
| 2 — top T3–T4 | +30.1 (T, red) | +30.00 (T) | ok |
| 3 — bottom B1–B2 | +20.1 (T, red) | +20.00 (T) | ok |
| 3 — bottom B2–B3 | +20.1 (T, red) | +20.00 (T) | ok |
| 4 — diagonal T2–B3 | −70.7 (C, blue) | −70.71 (C) | ok |
| 5 — diagonal B1–T2 | +28.5 (T, red) | +28.28 (T) | ok |
| 6 — top T1–T2 | −40.3 (C, blue) | −40.00 (C) | ok |
| 7 — bottom B0–B1 | +40.2 (T, red) | +40.00 (T) | ok |
| 8 — vertical B1–T1 | −20.0 (C, blue) | −20.00 (C) | ok |
| 9 — diagonal B0–T1 | −56.8 (C, blue) | −56.57 (C) | ok |
| `0` — vertical B0–T0 | 0 | 0 | ok |
| `0` — top T0–T1 | 0 | 0 | ok |
| `0` — vertical B2–T2 | 0 | 0 | ok |
| `0` — vertical B3–T3 | 0 | 0 | ok |
| `0` — bottom B3–B4 | 0 | 0 | ok |
| `0` — vertical B4–T4 | 0 | 0 | ok |
| Reaction A | 40.0 up (load line, o→i) | 40.0 up | ok |
| Reaction B | 80.0 up (load line, i→bottom) | 80.0 up | ok |
| zero-force members | 6 | 6 (same six) | ok |
| F_t,max | +40 (member 7) | +40.00 | ok |
| F_c,max | −70.7 (member 4) | −70.71 | ok |

The single tension diagonal (member 5, +28.28) is red on the sheet and pink in the view; the
top chord's sign reversal (−40 → +30 at T2) is blue→red on the sheet and navy→pink in the
view. Both are reproduced exactly.

**What is drawn.** Form diagram identical — same nine loaded/unloaded joints, same seventeen
bars including the two diagonals springing from B3, same support positions, same colours.
The force diagram is where they part, and here in **two** ways. First, as before, the view
gives ten disconnected joint polygons rather than the sheet's one Cremona. Second, and more
pointedly, task 4 a) reads "Find the global equilibrium **with the help of the force
diagram**", and the sheet answers that literally: its solution overlays a **funicular / pole
construction** — dashed rays from a pole to the left of the load line, dashed strings back
onto the form diagram, and the **division point `i`** on the load line that separates A from
B. That construction *is* the sheet's answer to a). The view instead answers a) with a moment
equation ("ΣM about B0: 60·1 + 30·2 + 30·4 panels, resisted over 3 panels"). Numerically
identical (40 / 80), methodologically not what was asked.

**Stated answer.** No worded discussion question on this task. The view's own added claim —
"the top chord changes sign at T2, one panel INSIDE the roller … because the sign follows the
bending moment and that crosses zero inside the span" — is correct and checks out: the
bending moment is +20 (panel-kN) at B2 and −30 at B3, so it crosses zero within the third
panel, and the section cut there gives N_top = −M/h = +30 kN, matching the sheet's red. The
view's claim that member 5 is "the only diagonal in tension on the whole sheet" is also true
across tasks 2, 3 and 4.

**Differences.**
1. Part a) is answered **algebraically**, not "with the help of the force diagram": the
   sheet's funicular pole, its dashed rays, and the division point `i` on the load line are
   all absent from the view. This is the same class of defect as the EX 8 task 1 precedent —
   the right number, arrived at by a different construction from the one the sheet names.
2. Force diagram: grid of ten joint polygons instead of the sheet's one Cremona.
3. Member numbers 1–9 / `0` from the sheet are not carried over.
4. Module size 2.500 m vs the sheet's 2.667 m (no numeric effect; documented).

---

## ex6_5 — Creative Task, Designing a Greenhouse Roof

**Verdict: MIXED**

This is an open design task ("sketch a **possible** form of the roof"), so the member forces
of the sheet's proposal and of the view's proposal are not comparable and there is no shared
member table to build. What *is* comparable is the given data, the reactions (which are fixed
regardless of the design, because all loads are vertical and one bearing is a roller), and
the determinacy check.

| Quantity | Official sheet | View | |
|---|---|---|---|
| Loads F₁…F₆ | 10, 20, 20, 20, 20, 10 kN | 10, 20, 20, 20, 20, 10 kN | ok |
| Load grid | 3.000 m | 3.000 m | ok |
| Total load | 100 kN | 100 kN | ok |
| Bearing separation | 12.000 m horizontal, 4.000 m vertical | 12.000 m, 4.000 m | ok |
| F₁ / F₅ / F₆ relative to bearings | F₁ over A, F₅ over B, F₆ 3 m past B | same | ok |
| Reaction A (left, pin) | 37.5 up (load line o→i) | 37.50 up | ok |
| Reaction B (right, roller) | 62.5 up (load line i→bottom) | 62.50 up | ok |
| Horizontal reaction | none | none | ok |
| The design: members S | 17 | 21 | design choice |
| The design: joints K | 10 | 12 | design choice |
| Determinacy | 17 + 3 = 20 = 2 × 10 → determinate | 21 + 3 = 24 = 2 × 12 → determinate | ok |
| Member forces | none printed (colours only) | −84.6 … +58.0 kN | n/a |

I re-solved the **sheet's own** 17-bar design by joint equilibrium to check its colouring:
member 1 −18.0, 2 +15.0, 3 −20.0, 4 +15.0, 5 +33.75, 6 −58.59, 7 +12.5, 8 −33.75, 9 +52.5,
10 −22.54, 11 +63.10, 12 −35.0, 13 −11.25, 14 −49.58, 15 +49.58, 16 +7.5, 17 −41.25 kN.
**All seventeen colours on the sheet are correct.** I likewise re-solved the view's own 21-bar
design independently; it reproduces the view's live numbers to 1e-13, so the view's solver is
right too.

**What is drawn.** Both offer one determinate roof and solve it. They are different roofs,
which the task permits. The sheet's design is a stepped, non-parallel truss: the roof line is
flat from A over F₂, drops through member 14 to the lower level, then runs flat to the tip
past B, with A sitting **on** the roof line and B sitting on the **bottom** chord. The view's
design is a constant-slope parallel-chord truss (fall −4/12, depth 1.5 m) with both bearings
on the **bottom** chord, so the glass plane floats 1.5 m above both given column tops. Both
honour the given 12 m / 4 m bearing geometry. The view does **not draw the two given columns
or the ground line**, which the sheet does and which is what makes the "two given columns act
as supports" reading obvious. And once more, the view's force diagram is a grid of twelve
disconnected joint polygons rather than the sheet's single Cremona; the sheet's Cremona for
this task again carries the funicular rays and the division point `i` that answer "find the
global equilibrium" graphically.

**Stated answer.** The sheet answers nothing in words here beyond "check whether your truss is
statically determinate", which both do. The view's own headline claim — "whatever roof you
draw, the reactions are already decided … 37.5 / 62.5" — is correct and is a genuinely good
observation that the sheet only implies.

**Differences.**
1. **The view promises a control it does not have.** Its description says "Drag its depth and
   watch every member respond", and step 4 says "Drag its depth in the panel — deeper is
   always cheaper in force, and always worse for solar gain". There is **no depth slider**.
   The live panel for `6_5` offers only: load factor, thickness ∝ force, scale internal
   forces, grey out zero-force members, show labels. `H = 1.5` is a hard-coded constant in
   `ex6_5.js` and `makeTrussView` exposes no hook for it. This is a broken promise in the
   view's own text, independent of the sheet.
2. The two designs differ (17 bars / 10 joints vs 21 bars / 12 joints). Legitimate — the task
   asks the student to invent one — but a student comparing the two will find no member in
   common, and the view never says "the official proposal is a different roof".
3. The view does not draw the **two given columns and the ground**, which are part of the
   given data on the sheet, and it places the glass plane 1.5 m above both column tops rather
   than landing the roof line on the tall column the way the sheet's proposal does.
4. Force diagram: grid of twelve joint polygons instead of the sheet's one Cremona, and no
   funicular/pole construction for the reactions.

---

## Cross-cutting findings (all of ex6_2 … ex6_5, i.e. everything built on `ex6_common.js`)

1. **The force diagram is not the sheet's force diagram.** `ex6_common.js` line 9–13 states
   the intent: "The force diagram is drawn the way the sheet asks for it: a grid of JOINT
   polygons, one per joint." That is not what the sheet asks for. All four solved sheets draw
   **one Cremona/Maxwell reciprocal diagram** with a single load line, in which the joint
   polygons share edges — that shared-edge nesting is the reciprocity the exercise exists to
   teach, and it is exactly what a grid of disjoint polygons cannot show. Every individual
   polygon in the views is correct, correctly coloured and correctly parallel to its members;
   they are simply never assembled. This is one defect, repeated four times, and it is the
   single largest gap in the sheet.
2. **The sheet's member numbering is nowhere in the views.** The sheet numbers members
   1–11 (task 2), 1–10 (task 3), 1–9 (task 4), 1–17 (creative), with `0` for every zero-force
   member; task 3 additionally numbers joints I…VII. The views label each bar with its force
   value and name joints B0…T5. Nothing is wrong, but the two documents cannot be read
   against each other member by member.
3. **Global equilibrium is computed, never constructed.** Tasks 4 a) and the creative task
   both use a funicular/pole construction with the division point `i` on the load line, and
   task 3 uses the dashed resultant R; task 4 a) even says "with the help of the force
   diagram". None of these graphical devices appear in any view.
4. **Every number in every view is right.** All 17 + 13 + 17 member forces for tasks 2, 3 and
   4, all reactions, all zero-force member sets, and both entries of the task-3 answer table
   were checked twice — once by hand joint equilibrium, once by measuring the sheet's own
   Cremona diagrams at 300 dpi — and the views agree with the sheet everywhere. The regression
   at `web/tools/regress/ex6_regress.py` records the correct values and needs no change.
5. **The sheet is right too**, apart from the diagram-C counting convention in task 1. Its
   four Cremona diagrams measure to within ±0.3 kN of exact, its task-3 table (64 / 90 kN) is
   correct, and its creative-task colouring is correct in all seventeen members.
6. Minor rendering: in `6_2`, `6_4` and `6_5` the "Form diagram 1:100" caption overlaps the
   bottom-chord force labels at the final step (visible in the screenshots), and in `6_4` the
   "6 zero-force members" line collides with the B3 reaction label.

---

# EX 7 "Beams" — Structural Design II, FS 23

Sources: `web/pdf/EX7-beams-solution-en.pdf` (3 pp, identical geometry to the DE twin),
`EX7-beams-task-en.pdf`, `EX7-beams-aufgabe-de.pdf`.
Views: `web/views/ex7_1.js`, `ex7_3.js`, `ex7_4.js`.

Method note. The solution sheet prints **no numbers at all** — not one kN value.
Every "official" figure below was measured off the solution's own force diagrams
with `web/tools/sheetvec.py` at the stated scale 1 cm ≙ 20 kN, and the readings
self-check: the d) force diagram returns R₁ = 3.000 cm = 60.0 kN, R₂ = 4.494 cm =
89.9 kN, A = 1.874 cm = 37.5 kN, B = 9.368 cm = 187.4 kN — i.e. the sheet is drawn
to scale to better than 0.5 %, so its member lengths *are* answers.

---

## ex7_1 — Tasks 1 + 2: internal force flow in a beam, qualitative then quantitative (five support cases a–e)
**Verdict: MIXED**

Geometry read off the sheet (form diagrams, 1:100): every beam 9.999 × 1.999 m,
g_d = 15 kN/m. Supports a) 0 / 10.000, b) 0 / **7.498**, c) **4.999** only,
d) 0 / **3.99**, e) pin top-left + roller bottom-left. All five match the view exactly.

| Quantity | Official sheet | View | |
|---|---|---|---|
| a) A, B | 75.0, 75.0 kN | +75.00, +75.00 kN | ok |
| a) subsystem resultants | 1 × 150 kN at 5.00 m | 150 kN at 5.00 m | ok |
| a) tie force (member 3) | 4.929 cm = **98.6 kN** | **93.75 kN** | differs −5 % |
| b) A, B | 50.0, 100.0 kN | +50.00, +100.00 kN | ok |
| b) resultants | 112.5 at 3.749 m, 37.5 at 8.747 m | 112.5 at 3.75, 37.5 at 8.75 | ok |
| b) M_span / M over B | (not printed; = +83.33 / −46.88 kNm) | 83.33 / (−46.88 internal) | ok |
| b) inflection point | — | 6.66 m (exact 6.667) | ok |
| b) tie force (member 3) | 2.972 cm = **59.4 kN**, tie inclined 6.46° | **41.67 kN**, tie horizontal | differs −30 % |
| c) R | 150.0 kN (single support) | +150.00 kN | ok |
| c) resultants | 75 at 2.499 m, 75 at 7.498 m | 75 at 2.50, 75 at 7.50 | ok |
| c) top tie (member 1) | 4.963 cm = **99.3 kN** | **93.75 kN** | differs −6 % |
| d) A (uplift), B | **−37.5**, **+187.5 kN** | −37.50, +187.50 kN | ok |
| d) resultants | 60 at 2.0 m, 90 at 7.0 m | 60, 90 | ok |
| d) M over B | (= −270 kNm) | −270.00 kNm | ok |
| d) chord force (member 1) | 7.182 cm = **143.6 kN** | **135.00 kN** | differs −6 % |
| e) vertical at the pin | 150 kN (7.49 cm) | 150.0 kN | ok |
| e) horizontal couple | 20.31 cm = **±406 kN** | **±375.0 kN** | differs −8 % |
| e) reaction A as drawn | one inclined vector (−406, +150) | two components, same resultant | equivalent |
| lever arm z used | **≈1.88 m** (chords drawn ~0.06 m inside each face) | **2.000 m** (full depth) | see diff 1 |

**What is drawn.** The sheet's Task 2 asks for two things per case: a force flow in
the form diagram *and* a force diagram in which global equilibrium closes and every
member of the flow appears. The view does the first and only a third of the second.
Its "Force diagram" panel contains **nothing but the load line** — one green arrow of
150 kN in a), c), e), two stacked arrows (113 + 38, 60 + 90) in b), d). There is no
pole, no rays 1 and 2, no closing reaction vectors, and no red tie segment; the
reactions A and B are drawn only in the *form* diagram. The sheet's force diagrams
have all of it: load line, A and B closing it, the pole, the inclined rays (a): 6.193 cm
= 123.9 kN each, which checks against √(98.6² + 75²) = 123.9), and the horizontal tie
in red. So the view answers Task 1 and the *first half* of Task 2, and simply does not
construct the force diagram Task 2 is about. (For contrast, `ex7_4` does put its
reactions into the force diagram; `ex7_1` does not.) Beyond that, the *shapes* agree
well: a) parabolic arch on a bottom tie, c) top tie with the thrust dipping to the
single support, d) top tie with the thrust dipping to the roller at 4 m, e) top tie
with the thrust rising from the bottom of the wall to the free tip — all four are the
sheet's picture. Case b) is a genuinely different flow (see difference 2). The view
adds a *second* horizontal chord the sheet never draws — a blue top chord in a), a blue
bottom chord in c) and d) — which carries nothing in an arch-and-tie model. Colouring
is correct in a), c), d), e); it is wrong in b) (difference 3). Neither sheet nor view
draws a shear or moment diagram, and neither is asked for.

**Stated answer.** EX 7 poses no discussion question anywhere on the sheet, and the
solution adds no sentence of commentary — the drawings are the whole answer. One
wording change is worth recording: the **task** sheet says "Starting at the largest
span width" / "bei der grössten Spannweite", and the **solution** silently corrects it
to "Starting at the largest resultant" / "bei der grössten Teilresultierenden". The
view's step 3 says "always start with the LARGER piece", which is the corrected
version — right — but `exercises.json` still quotes the uncorrected task wording, and
the view's own d) lays the load line out in x-order (60 then 90), not largest-first.
The sheet's d) does the same, so the drawing is fine; only the sentence over-promises.

**Differences.**
1. **Lever arm, ≈6 % on every chord force.** The sheet's chords are drawn ~0.06 m
   inside each face, so its constructed lever arm is z ≈ 1.88 m, not the full 2.000 m:
   d) 270/143.6 = 1.880 m, c) 187.5/99.3 = 1.888 m, a) 187.5/98.6 = 1.902 m,
   e) 750/406 = 1.847 m. The view uses z = 2.000 m throughout, per the compendium
   ("the entire structural depth is to be used"), so it reads 5–8 % low against the
   sheet in *every* case. The view is the defensible teaching number and the sheet's
   inset is a drafting artefact — but the discrepancy is systematic and real, and the
   view's docstring line "The sheet prints no answers" is only true of the *text*: the
   solution's force diagrams are dimensioned to 0.5 % and do give answers.
2. **Case b): different force flow, 43 % different tie force.** The sheet does not use
   horizontal chords in b). Its red tie rises 6.46° in a straight line from the pin at
   the bottom-left to the top of the free tip, with the arch beneath it and a separate
   3–4–5 fan past the roller; tie force 59.4 kN. The view uses a horizontal bottom tie
   in the span, a horizontal top tie over the overhang, and a grey vertical "swap"
   member at the inflection; tie force 41.67 kN. Both are statically admissible — I
   checked the view's swap detail: at x = 6.665 the transferred force is the shear,
   50 kN, and node equilibrium closes — and the task only asks for "a possible" flow,
   so neither is wrong. But the numbers are not comparable and the pictures do not
   look alike.
3. **Case b) is coloured wrong.** The view's own result bar says "top chord:
   compression in the span, TENSION over the interior support" and "bottom chord:
   tension in the span, compression over the support" — yet the drawing paints the
   whole top chord blue and the whole bottom chord pink over all 10 m. The hogging
   stretch from x = 6.66 to 10 is coloured backwards. The sheet's instruction
   ("Indicate tension forces with red, compression forces with blue") is the one
   instruction the sheet repeats in every task, and b) is the one case where the
   colour has to change along the member. `topch`/`botch` take a single `final`
   colour for the whole strokes group, which is what causes it.
4. **Case e) draws its 375 kN couple at the force-diagram scale inside the form
   diagram.** At SFD = 9 kN/unit the two horizontal arrows are 41.7 units long against
   a 15.5-unit beam; they run clear across the canvas, through the force diagram, and
   dump their "375 ←" / "375 →" labels to the right of it. Numerically fine, visually
   broken. The sheet draws A as one short inclined vector instead.
5. **Extra chords.** The blue top chord in a) and the blue bottom chords in c) and d)
   are drawn in the view and absent from the sheet. In an arch-and-tie model they
   carry nothing — the compression is in the thrust line — so they are decorative at
   best and read as double-counting at worst.

---

## ex7_3 — Task 3: internal force flow in a beam with openings
**Verdict: MIXED**

| Quantity | Official sheet | View | |
|---|---|---|---|
| left beam, supports | 2.914 / 7.081 m | 2.92 / 7.08 m | ok |
| left beam, resultants | 3 (split at both supports) | 3 sub-resultants computed | ok |
| left beam, A / B | 75 / 75 kN (arrows drawn) | 75 / 75 (computed, **not drawn**) | see diff 3 |
| left beam, sagging region | none — tie is on top all along | none — "it HOGS the whole way" | ok |
| left beam, M over the support | (= −63.95 kNm at g_d = 15) | −63.95 kNm | ok |
| left beam, tie level | straight at **1.097 m** above the soffit, full length | at the top face, dipping to **1.14 m** only at the hole clusters | differs |
| left beam, resulting z at the support | ≈1.0–1.1 m → chord ≈58–64 kN (**+85 %**) | 2.0 m at the support → chord 32.0 kN | see diff 1 |
| view's stated penalty | — | "lever arm 1.26 m, chord force **+59 %**" | **wrong, see diff 1** |
| right beam, supports | 5.00 / 7.50 m | 5.00 / 7.50 m | ok |
| right beam, R_B | **0** — sheet draws an arrow at A only, none at B | 0 (computed, never stated, never drawn) | see diff 3 |
| right beam, M max | (= −187.5 kNm at the pin) | −187.5 kNm | ok |
| right beam, tie route | along the top; clears the door head and passes under the window naturally — **no detour needed** | forced down to **0.30 m** under the door sill | **wrong, see diff 2** |
| view's stated penalty | — | "lever arm 0.30 m, chord force **+567 %**" | **wrong, see diff 2** |

**What is drawn.** Task 3 is qualitative — no force diagram is asked for and neither
sheet nor view draws one, correctly. On the **right** beam the two constructions agree
almost perfectly in topology: the sheet puts the compression chord straight along the
soffit for the 5 m left cantilever with the red tie curving up from the free end to the
top at the pin, a vertical at the pin, then the red tie straight along the top with the
blue thrust rising from the soffit at the pin to meet it at the free tip. The view
draws the mirror-image parameterisation of exactly the same thing (straight tie, curved
thrust). On the **left** beam the two diverge: the sheet uses a *three*-chord flow — one
straight red tie at 1.097 m running the full 10 m (deliberately threaded under the pipe
holes), blue cantilever struts from each end down to the supports, plus **both** a blue
soffit strut and a blue arch between the supports. I checked that this is statically
admissible (at midspan, with T = 58 kN at y = 1.097, the arch takes 15.1 kN and the
soffit strut 43.0 kN, and Σ F·y reproduces M = −31.5 kNm exactly), even though the arch
above the tie makes the middle *look* as though it sags when it does not. The view uses
the ordinary two-chord flow with the tie on the top face. Both are legal answers to "a
possible force flow". The view's real contribution — that the sheet's tie has been
pushed down under the pipes and that this costs lever arm — is correct and is exactly
what the sheet did; it is the arithmetic attached to it that fails.

**Stated answer.** No discussion question, no prose in the solution.

**Differences.**
1. **The left beam's "+59 %" penalty does not follow from the view's own drawing.**
   `f1 = |M_hog| / (DEP − drop)` combines the *maximum* hogging moment, which occurs at
   the support x = 2.92 m, with the *reduced* lever arm, which the view applies only
   locally at the hole clusters (x ≤ 1.03 and x ≥ 8.97). At x = 1.03 the moment is
   −7.96 kNm and the drawn chord force is 7.0 kN, not 50.9 kN; at the support the view
   keeps the full 2.00 m, so its drawn flow costs essentially **nothing**. The sheet's
   flow *does* cost something, because its tie is straight at 1.097 m over the whole
   length: 63.95/≈1.05 ≈ 61 kN against 32.0 kN, i.e. **≈+85 %**. So the headline number
   matches neither the view's own geometry (≈0 %) nor the sheet's (≈+85 %).
2. **The right beam's "+567 %" is spurious.** `tieY` routes the tie *below* every
   opening unconditionally. The door occupies 0.300–1.626 m above the soffit; a tie on
   the top face clears its head by 0.374 m, which is what the sheet draws. The view
   instead drags the tie down to 0.18 m, declares a lever arm of 0.30 m and a 625 kN
   chord force, and prints "+567 %" — a number produced by a hole the flow never had to
   avoid, and again multiplied by the moment at the pin 4 m away (at the door,
   x ≈ 9.3 m, M = −3.7 kNm). The same bug affects the window on that beam (top at
   1.700 m, cleared by 0.30 m, yet the tie is dropped to 0.699 m). The logic needs to
   route *over* an opening when the chord clears its head, and to evaluate the penalty
   with the local moment.
3. **No reactions are drawn.** The sheet draws green A and B under the left beam and —
   pointedly — **only A** under the right beam, because with the resultant of the UDL
   landing exactly on the pin at 5.00 m the roller at 7.50 m carries **zero**. That is
   the sharpest single fact on the right-hand figure and the reason the sheet chose
   those support positions. The view computes R_B = 0 and never says so, never draws
   it, and its result bar describes the beam as if both supports work.

---

## ex7_4 — Creative task: open-air cinema roof beam
**Verdict: DIFFERS**

| Quantity | Official sheet | View (defaults) | |
|---|---|---|---|
| load | **g_d 7.5 + q_d 2.5 = 10.0 kN/m**, both bars drawn on p. 3 | **7.5 kN/m** (10.0 behind a toggle) | **differs, see diff 1** |
| loaded length | 18.00 m | 18.00 m | ok |
| support spacing | 6.00 m (pin at 0, roller at 6) | 6.00 m | ok |
| resultant | 180 kN at x = 9.00, i.e. 3.00 m past the roller | 135 kN at 9.00 | consequence of diff 1 |
| R_A | 4.496 cm = **−89.9 ≈ −90 kN (uplift)** | **−67.50 kN** | differs; toggle gives −90 ✓ |
| R_B | 13.49 cm = **+269.8 ≈ +270 kN** | **+202.50 kN** | differs; toggle gives +270 ✓ |
| R₁, R₂ | 59.8 ≈ 60 kN at 3.0 m, 118 ≈ 120 kN at 12.0 m | not drawn as sub-resultants | see "what is drawn" |
| M over the roller | (= −720 kNm) | −540 kNm (−720 with the toggle) | consequence of diff 1 |
| beam section | **wedge**: ≈2.18 m deep at A, **≈3.77 m at the roller**, ≈0 at the tip | **constant 1.40 m** (slider 0.5–3.0 m) | **differs, see diff 2** |
| top-of-roof slope | **14.61°** (both EN and DE) | **38.8°** | see diff 3 |
| tie force (member 1) | 10.156 cm = **203 kN** | **386 kN** (514 at 10 kN/m; 240 at 10 kN/m and the 3.0 m slider max) | differs ≥2× |
| force flow topology | tie along the top all the way; thrust from the top at A down to the soffit at the roller, then up to the tip | identical | ok |
| force diagram | full 7-element polygon, red/blue members, A, R₁, R₂, B all closing | load line + A + B only | see "what is drawn" |

**What is drawn.** The two constructions agree on the *physics* and disagree on the
*design*. Both find that 18 m of roof on supports 6 m apart puts the resultant 3 m past
the roller, so the near pin is in net uplift and must be an anchor; both hog over the
entire length, put the tension tie along the top and hang the thrust line below it,
touching the soffit at the roller and closing on the tie at both the anchor and the free
tip. The view says this clearly and its step 4 is the best thing in the view. Where it
parts company is the beam itself and the force diagram. The sheet designs a **wedge**:
one straight top edge at 14.6° from the anchor to the tip, a soffit that stays
horizontal from the anchor to the roller and then climbs at ≈29°, giving ≈3.8 m of depth
exactly where the 720 kNm sits and tapering to nothing at the tip — i.e. it puts the
material where the moment is, which is the lesson the view's own step 6 states in words
("the deepest part of a cantilever belongs where the moment is, at the support") and
then does not draw. The view's beam is a constant-1.4 m blade held horizontal for 11 m
and kinked up at 38.8°, which is why its chord force is 386 kN where the sheet's is
203 kN. The sheet's force diagram is a complete construction: green A, R₁, R₂, B closing
the polygon and seven numbered members in red and blue keyed to the form diagram
(1 tie, 2 tip, 3 cantilever thrust, 4–6 the back-span fan, 7 the anchor vertical at the
beam's end face). The view's force diagram has the load line and the two reaction
arrows — global equilibrium, which is more than `ex7_1` manages — but no members, no
colours, and no numbering, so the "find a possible internal force flow **with the aid of
the force diagram**" half of the task is not carried out.

**Stated answer.** No discussion question; no prose in the solution.

**Differences.**
1. **The load is 10 kN/m, not 7.5.** The view's docstring reasons: "A q_d = 2.5 kN/m
   label exists in the PDF's text layer, twice, in BOTH languages, but is never rendered
   and the task never mentions it — so 7.5 is the given." That reasoning was right about
   the **task** sheet (I rendered p. 3 of `EX7-beams-task-en.pdf`: one bar, g_d = 7.5
   only) and is **disproved by the solution**, which renders **two** load bars, labels
   them q_d = 2.5 kN/m and g_d = 7.5 kN/m, and builds its force diagram on the sum:
   the measured R₁ = 60 kN over 6 m and R₂ = 120 kN over 12 m are 10 kN/m exactly, and
   A = 90 / B = 270 follow. The view's default is therefore 25 % light on every force.
   Its "add the unprinted q_d (10.0 kN/m total)" toggle reproduces the official
   reactions exactly (−90 / +270), so this is a default and a docstring to change, not
   a computation.
2. **Constant depth versus the sheet's wedge, and a chord force ≥2× the sheet's.**
   The view's depth slider tops out at 3.0 m; the sheet needs 3.8 m at the roller and
   only there. Even at the slider maximum and the correct load the view reads 240 kN
   against the sheet's 203 kN, and at its own defaults 386 kN. It cannot express the
   sheet's answer. This is a creative task, so a different form is allowed — but the
   view's form contradicts its own closing takeaway about putting depth where the
   moment is.
3. **SHEET IS WRONG (marginally) on its own 15° rule.** The task says "the top of the
   roof shall have a minimum inclination of 15°". The solution's top edge runs from
   (6.538, 22.601) to (23.884, 27.122) in sheet metres — Δx = 17.346, Δy = 4.521 —
   which is **14.61°**, and the red tie beneath it is drawn at the same 14.61°. Both the
   EN and DE solutions are identical here, so it is not a typesetting accident. The
   official proposal misses its own stated minimum by 0.39°; it would need 4.65 m of
   rise instead of 4.52 m. The view's 38.8° comfortably satisfies the rule, so the view
   is the compliant one — but it reaches that slope by keeping the soffit flat for 11 m
   and then kinking, which is not what the sheet drew.
4. **Minor: M_max is sampled, not exact.** `compute` scans 2001 points and returns
   −539.73 kNm instead of −540.00 (−719.64 instead of −720.00). It rounds to the right
   display value, but the internal number is 0.05 % low.

---

## EX 7 task 2 — covered, not missing

Sheet EX 7 has four tasks: 1 (qualitative force flow, five beams a–e), 2 (quantitative:
resultants, global equilibrium in the force diagram, force diagrams for the internal
flow, red/blue/green), 3 (beams with openings), and a Creative task (open-air cinema).
There is no `ex7_2.js` because **Task 2 is folded into `ex7_1`**, deliberately and
correctly: `exercises.json` registers view `7_1` with `"n": "1 + 2"` and the title
"Internal force flow in a beam, qualitative and quantitative", and the official solution
does the same thing — it prints the Task 1 and Task 2 headings one after the other on
p. 1 and then draws a **single** set of five figures that serves both. So Task 2 is not
an uncovered task.

It is, however, the *least* well covered of the four. Task 2's specific demand is the
force diagram, and `ex7_1`'s force diagram contains only the load line: no pole, no
rays, no closing reactions, no tie. Of the three EX 7 views, `ex7_1` is the one whose
force diagram is furthest from the sheet's.

---
