# DECODE BRIEF — EX X "Additional Exercises", Structural Design II (FS 23)

Source files
- English task sheet: `drawings/web/pdf/EXX-additional-exercises-sd-ii-task-en.pdf`
- German task sheet:  `drawings/web/pdf/EXX-additional-exercises-sd-ii-aufgabe-de.pdf`
- No solution sheet exists for SD II. Every number below is derived here; the
  SD I solution key (`EXX-additional-exercises-sd-i-solution-en.pdf`) was read
  only for presentation style and rounding conventions.

Two independent calibrations prove the stated scales are honoured, so every
digitised length below can be trusted:
- p.9, "plans 1:200": the plate digitises 7.497 m x 4.998 m against the printed
  7.5 m x 5 m (error 0.04 %).
- p.15, "form diagram 1:100": element 1 digitises 3.189 m against the 3.2 m
  printed in the sheet's own worked buckling check (error 0.34 %).
The sheet prints **no dimension lines anywhere**. All geometry below comes from
`drawings/web/tools/sheetvec.py` on the vector artwork.

Material / load constants used throughout (compendium 2.5 + 2.6):
| quantity | value |
|---|---|
| gamma_G (dead load) | 1.35 |
| gamma_Q (live load) | 1.50 |
| Steel S235 | f_tk = f_ck = 235 N/mm2, gamma_M = 1.05 -> **f_d = 223.81 N/mm2** |
| Concrete C12/15 | f_ck = 12 N/mm2, f_tk = 1.1 N/mm2, gamma_M = 1.5 -> **f_cd = 8.000 N/mm2** |
| Circle | A = r^2 * pi ; D = 2 * sqrt(A/pi) |

---

## 0. THE NUMBERING TRAP — READ THIS FIRST

**The English sheet's task numbers are corrupt. The German sheet's are correct.**
The English PDF restarts the counter at almost every page and repeats numbers
(three separate blocks are called "Task 1", two are called "Task 3", two are
called "Task 2"). The German PDF numbers the same 24 blocks straight through as
Aufgabe 1.1 … 18. Every broken cross-reference in the English text is explained
by this. Use the German numbers as the canonical ID; they are used throughout
this brief as `[G n]`.

| page | English label(s) | German (canonical) | English label is |
|---|---|---|---|
| 1 | Task 1.1 / 1.2 / 1.3 | Aufgabe 1.1 / 1.2 / 1.3 | correct |
| 2 | Task 3, Task 4 | Aufgabe 2, Aufgabe 3 | **wrong (+1)** |
| 3 | Task 1, Task 2 | Aufgabe 4, Aufgabe 5 | **wrong** |
| 4 | Task 1 | Aufgabe 6 | **wrong** |
| 5 | Task 1 | Aufgabe 7 | **wrong** |
| 6 | Task 3, Task 1 | Aufgabe 8.1, 8.2 | **wrong** |
| 7 | Task 1, Task 2 | Aufgabe 9.1, 9.2 | **wrong** |
| 8 | Task 3, Task 2 | Aufgabe 10.1, 10.2 | **wrong** |
| 9 | Task 1 | Aufgabe 11 | **wrong** |
| 10 | Task 3 | Aufgabe 12 | **wrong** |
| 11 | Task 1 | Aufgabe 13 | **wrong** |
| 12 | Task 1 | Aufgabe 14 | **wrong** |
| 13 | Task 3 | Aufgabe 15 | **wrong** |
| 14 | Task 1, Task 2 | Aufgabe 16.1, 16.2 | **wrong** |
| 15 | Task 3 | Aufgabe 17 | **wrong** |
| 16 | Task 3 | Aufgabe 18 | **wrong** |

Two loads that the English translation **silently dropped** and that the German
sheet states explicitly — without them p.11 and p.16 are unanswerable:
- **[G 13] (p.11):** "Aus der Flächenlast resultieren fünf Punktlasten
  A1 bis A5 = **50 kN**" — the five point loads are 50 kN each.
- **[G 18] (p.16):** "Die maximale Belastung einer Stütze … beträgt **400 kN**"
  — each of the two columns is limited to 400 kN.

Page count: the PDF has **16 pages**; the running footer says "p. N / 15" on all
of them, so the footer denominator is wrong by one. The German footer says
"S. N / 16" and is right.

---

## 1. INVENTORY

**16 pages. 24 numbered task blocks. 48 distinct sub-parts.**

| # | page | German ID | English label | sub-part | one-line description | compendium chapter |
|---|---|---|---|---|---|---|
| 1 | 1 | 1.1 | Task 1.1 | – | Form-finding: arch–cable under 3 x 30 kN, tie force given as 60 kN | 4.1, 5.2, 2.4 |
| 2 | 1 | 1.2 | Task 1.2 | – | Analyse Howe truss, same loads; identify zero members first | 6.2, 6.3, 2.2 |
| 3 | 1 | 1.3 | Task 1.3 | – | Analyse Pratt truss, same loads | 6.2, 2.2 |
| 4 | 2 | 2 | Task 3 | – | Asymmetric truss, single 100 kN inclined load; global equilibrium first | 6.1, 1.1 |
| 5 | 2 | 3 | Task 4 | – | Symmetric shallow truss, 50 kN at apex | 6.2, 2.2 |
| 6 | 3 | 4 | Task 1 | – | Parallel-chord truss, F1 = 60 kN, F2 = 20 kN; find A and B | 6.1, 6.2 |
| 7 | 3 | 5 | Task 2 | – | Pitched truss under 3 x 30 kN inclined roof loads; find R, A, B | 1.2, 6.1 |
| 8 | 4 | 6 | Task 1 | a | Beam, arch-and-tie force path given, draw force diagram | 7.3, 5.2 |
| 9 | 4 | 6 | Task 1 | b | Beam, cable-and-strut (mirror of a) | 7.3, 5.2 |
| 10 | 4 | 6 | Task 1 | c | Beam, lens (arch + cable) force path | 7.3, 5.2 |
| 11 | 4 | 6 | Task 1 | d | Beam as 12-member truss, force diagram **given** | 7.2, 7.3 |
| 12 | 4 | 6 | Task 1 | e | Beam as 21-member truss, force diagram **given** | 7.2, 7.3 |
| 13 | 4 | 6 | Task 1 | f | Written comparison a)-c) vs d)-e); **answer already printed (in German)** | 7.3, 9.1 |
| 14 | 5 | 7 | Task 1 | a | Wall slab, inclined 70 kN — draw arch-cable + force diagram | 9.1, 5.2 |
| 15 | 5 | 7 | Task 1 | b | Wall slab, q1 = 8 kN/m full width | 9.1, 3.1 |
| 16 | 5 | 7 | Task 1 | c | Wall slab, q1 = 8 kN/m half width + F = 36 kN | 9.1, 3.1 |
| 17 | 5 | 7 | Task 1 | d | Wall slab, q1 = 6 kN/m, offset supports, force path **given** | 9.1, 5.3 |
| 18 | 6 | 8.1 | Task 3 | a | RC portal frame, vertical reactions — qualitative force path | 8.1 |
| 19 | 6 | 8.1 | Task 3 | b | Same frame, inclined reactions converging under the load | 8.1 |
| 20 | 6 | 8.1 | Task 3 | c | Same frame, load applied high, steeper inclined reactions | 8.1 |
| 21 | 6 | 8.2 | Task 1 | a | Statically indeterminate frame, Q = 30 kN, draw arch-cable | 8.1, 5.2 |
| 22 | 6 | 8.2 | Task 1 | b | Same frame, force path **given**, draw force diagram | 8.1, 2.2 |
| 23 | 7 | 9.1 | Task 1 | a | RC frame with thrust line, load G_d (**no value printed**) | 8.1, 4.1 |
| 24 | 7 | 9.1 | Task 1 | b | RC frame, uplift load Q_d (**no value printed**) | 8.1, 4.1 |
| 25 | 7 | 9.2 | Task 2 | – | Axial-force proof: 16 mm S235 bar vs the tension of 9.1 a) | 2.5, 2.6 |
| 26 | 8 | 10.1 | Task 3 | – | RC frame, Q_d = 35 kN horizontal (earthquake), force path given | 8.1, 10.1 |
| 27 | 8 | 10.2 | Task 2 | a | Dimension the reinforcement for the tension of [G 10.1] | 2.5, 2.6 |
| 28 | 8 | 10.2 | Task 2 | b | **Not in the German sheet** — C12/15 slab 8 cm x 10 cm compression proof | 2.5, 2.6 |
| 29 | 9 | 11 | Task 1 | a | Tributary area, one-way plate on one central beam | 3.4, 3.3 |
| 30 | 9 | 11 | Task 1 | b | Tributary area, plate on two edge beams | 3.4 |
| 31 | 9 | 11 | Task 1 | c | Tributary area, plate on two beams spanning the other way | 3.4 |
| 32 | 9 | 11 | Task 1 | d | Tributary area, plate on four edge beams (two-way) | 3.4 |
| 33 | 10 | 12 | Task 3 | a | Qualitative 3-D force flow, square roof on 4 edge beams + columns | 9.1, 3.4 |
| 34 | 10 | 12 | Task 3 | b | Qualitative 3-D force flow, two parallel wall-beams on columns | 9.1 |
| 35 | 11 | 13 | Task 1 | a | Subsystem B: beam under A1..A5 = 50 kN, two offset supports | 9.1, 5.3 |
| 36 | 11 | 13 | Task 1 | b | Subsystems C and D: transfer of the B reactions | 9.1, 5.3 |
| 37 | 12 | 14 | Task 1 | a | Bracing: force flow in the ceiling plate, F = 100 kN | 10.1 |
| 38 | 12 | 14 | Task 1 | b | Bracing: force flow inside walls A, B, C | 10.1 |
| 39 | 13 | 15 | Task 3 | a | Bracing (2nd layout): plate force flow, F = 100 kN | 10.1 |
| 40 | 13 | 15 | Task 3 | b | Bracing (2nd layout): force flow inside walls A, B, C | 10.1 |
| 41 | 14 | 16.1 | Task 1 | – | Match 5 support conditions to 5 buckling modes and l_cr/l; **table already filled in** | 10.2, 2.6 |
| 42 | 14 | 16.2 | Task 2 | – | Buckling check, SHS S235, A = 2000 mm2, N_cd = 300 kN; **worked answer printed** | 10.2 |
| 43 | 15 | 17 | Task 3 | a | Truss, F1d = F2d = 300 kN, find internal forces | 6.2, 2.2 |
| 44 | 15 | 17 | Task 3 | b | Dimension circular solid S235 sections for elements 1 and 2; **answer printed** | 2.5 |
| 45 | 15 | 17 | Task 3 | c | Buckling check of elements 1 and 2 at D = 85 mm; **answer printed** | 10.2 |
| 46 | 15 | 17 | Task 3 | d | How to prevent buckling (written); **answer printed (German)** | 10.2 |
| 47 | 16 | 18 | Task 3 | a | Longitudinal beam: max C1, C2 from the 400 kN column limit | 9.1, 5.3 |
| 48 | 16 | 18 | Task 3 | b | Crossbeams: max line load g_d | 9.1, 3.1 |

Sub-part 28 exists only in the English sheet. Sub-parts 13, 41, 42, 44, 45, 46
already carry printed answers in **both** language versions — they are worked
examples masquerading as exercises.

---

## 2-6. TASK BY TASK

Every geometry table is in **metres**, origin stated per task, x to the right,
y upwards. "T" = tension, "C" = compression. Member forces are quoted to
2 decimals; they are exact to the digitised geometry, whose own precision is
about 0.3 %.

---

### [G 1.1] p.1 — Form-Finding: Arch-Cable

**Text (verbatim).** "Find the arch-cable-structure that forms under the given
loading situation. The tension force in the bottom chord equals 60kN. Draw the
corresponding force diagram. Use red for tension and blue for compression."

**Givens.** F1 = F2 = F3 = 30 kN (vertical, down). Bottom-chord tension
= 60 kN. Form diagram 1:100. Force diagram 1 cm = 10 kN.

**Geometry.** Origin = left support (pin). Right support = roller, same level.

| point | x [m] | y [m] |
|---|---|---|
| A (pin) | 0.000 | 0.000 |
| load line F1 | 2.6657 | – |
| load line F2 | 5.3313 | – |
| load line F3 | 7.9970 | – |
| B (roller) | 10.6627 | 0.000 |

The three load lines are drawn as vertical dash-dot lines only; the arch nodes
are what the student must find. Span 10.663 m, loads at the exact quarter
points.

**Answers.**
Reactions (symmetric): **A = B = 45.00 kN**, vertical (the tie takes the thrust,
so the pin carries no horizontal force).

Funicular with H = 60 kN: rise increment per panel = V/H x 2.6657 m.

| segment | shear V [kN] | slope V/H | node rise above tie [m] |
|---|---|---|---|
| A -> n1 | +45 | 0.7500 | n1 = **1.9993** |
| n1 -> n2 | +15 | 0.2500 | n2 = **2.6657** (crown) |
| n2 -> n3 | -15 | -0.2500 | n3 = **1.9993** |
| n3 -> B | -45 | -0.7500 | B = 0 |

Arch (compression) segment forces N = -H*sqrt(1+slope^2):

| segment | N [kN] |
|---|---|
| A–n1 and n3–B | **75.00 C** |
| n1–n2 and n2–n3 | **61.85 C** |

Bottom chord (tie): **60.00 kN T** (given).

*Independent check.* Vertical component of segment A–n1 = 75.00 x (0.75/1.25)
= 45.00 kN = reaction A. Bending check: M at midspan = 45 x 5.3313 - 30 x 2.6657
= 159.94 kNm; 159.94 / 2.6657 m = 60.00 kN = H. Both close exactly.

**Note worth teaching.** The crown rise 2.6657 m is *identical* to the depth of
the trusses in 1.2 and 1.3 — the sheet is built so that all three tasks give the
same chord force of 60 kN at midspan. This is the whole point of the trio.

**Interactive view:** one slider for the tie force H (20 … 120 kN). The arch
shape must reflow live and the reader must see that the shape gets flat as H
rises and that the reactions never move.

---

### [G 1.2] p.1 — Analysis: Truss 1 (German title: "Fachwerktyp «Howe»")

**Text (verbatim).** "This loading case corresponds to that of 1.1, but here a
truss is analysed. Draw the corresponding force diagram for the given situation.
First identify possible zero members. Indicate tension forces with red and
compression forces with blue."

**Givens.** F1 = F2 = F3 = 30 kN down, applied at the top chord. 1:100;
1 cm = 10 kN.

**Geometry.** Origin = bottom-left node (pin). Parallel-chord truss,
4 square panels.

| node | x [m] | y [m] | | node | x [m] | y [m] |
|---|---|---|---|---|---|---|
| L0 (pin) | 0.0000 | 0.000 | | U0 | 0.0000 | 2.6657 |
| L1 | 2.6657 | 0.000 | | U1 (F1) | 2.6657 | 2.6657 |
| L2 | 5.3313 | 0.000 | | U2 (F2) | 5.3313 | 2.6657 |
| L3 | 7.9970 | 0.000 | | U3 (F3) | 7.9970 | 2.6657 |
| L4 (roller) | 10.6627 | 0.000 | | U4 | 10.6627 | 2.6657 |

Members: 4 bottom chords, 4 top chords, 5 verticals (at all five x), 4 diagonals
**L0–U1, L1–U2, L3–U2, L4–U3** (pattern `/ / \ \`). 17 members + 3 reactions =
20 = 2 x 10 nodes -> statically determinate.

**Answers.** A = B = **45.00 kN** up.

| member | N [kN] | | member | N [kN] |
|---|---|---|---|---|
| bottom L0–L1 | +45.00 T | | top U0–U1 | **0** |
| bottom L1–L2 | +60.00 T | | top U1–U2 | -45.00 C |
| bottom L2–L3 | +60.00 T | | top U2–U3 | -45.00 C |
| bottom L3–L4 | +45.00 T | | top U3–U4 | **0** |
| vert L0–U0 | **0** | | diag L0–U1 | -63.64 C |
| vert L1–U1 | +15.00 T | | diag L1–U2 | -21.21 C |
| vert L2–U2 | **0** | | diag L3–U2 | -21.21 C |
| vert L3–U3 | +15.00 T | | diag L4–U3 | -63.64 C |
| vert L4–U4 | **0** | | | |

**Zero members (the explicit first part of the task): five —**
U0–U1, U3–U4 (the two end top chords), L0–U0, L4–U4 (the two end verticals),
and L2–U2 (the centre vertical).
Reasoning: at U0 only two non-collinear members meet with no load -> both zero
(same at U4). At L2 two collinear chords plus one vertical, no load -> the
vertical is zero.

*Independent check.* Section cut at midspan, moments about U2:
+60.00 x 2.6657 = 159.94 kNm; external moment 45 x 5.3313 - 30 x 2.6657
= 159.94 kNm. Match. Diagonals: 63.64 x cos45 = 45.00 = A.

**Interactive view:** a toggle that greys out the five zero members before the
Cremona diagram is stepped, so the reader sees the diagram collapse to 12 lines.

---

### [G 1.3] p.1 — Analysis: Truss 2 (German title: "Fachwerktyp «Pratt»")

**Text (verbatim).** "This loading case corresponds to that of 1.1 and 1.2, but
here a different truss is analysed. Draw the corresponding force diagram for the
given situation. Indicate tension forces with red and compression forces with
blue."

**Givens and geometry.** Identical to 1.2 (same nodes, same loads, same
supports). Only the diagonals differ: **U0–L1, U1–L2, U3–L2, U4–L3**
(pattern `\ \ / /`).

**Answers.** A = B = **45.00 kN** up.

| member | N [kN] | | member | N [kN] |
|---|---|---|---|---|
| bottom L0–L1 | **0** | | top U0–U1 | -45.00 C |
| bottom L1–L2 | +45.00 T | | top U1–U2 | -60.00 C |
| bottom L2–L3 | +45.00 T | | top U2–U3 | -60.00 C |
| bottom L3–L4 | **0** | | top U3–U4 | -45.00 C |
| vert L0–U0 | -45.00 C | | diag U0–L1 | +63.64 T |
| vert L1–U1 | -45.00 C | | diag U1–L2 | +21.21 T |
| vert L2–U2 | -30.00 C | | diag U3–L2 | +21.21 T |
| vert L3–U3 | -45.00 C | | diag U4–L3 | +63.64 T |
| vert L4–U4 | -45.00 C | | | |

Zero members: only two (L0–L1 and L3–L4, the two end bottom chords).

*Independent check.* Moments about L2 at midspan: -60.00 x 2.6657 = -159.94 kNm
against the external 159.94 kNm. Match. Note the mirror symmetry with 1.2:
every diagonal has swapped sign and the chord roles have swapped.

**Teaching point.** 1.2 (Howe, diagonals in compression / verticals in tension)
vs 1.3 (Pratt, diagonals in tension / verticals in compression) with the same
load and the same 60 kN midspan chord force. Careful: the German titles are
attached the way the German textbook uses them and the English sheet just calls
them "Truss 1/2".

**Interactive view:** one toggle that flips the diagonal pattern `/ / \ \` <->
`\ \ / /` and recolours the whole truss; the chord forces stay put, the web
forces all invert.

---

### [G 2] p.2 — Additional Truss (English: "Task 3")

**Text (verbatim).** "Draw the corresponding force diagram for the given truss.
First, find the global equilibrium. Indicate tension forces with red and
compression forces with blue."

**Givens.** F = 100 kN, applied at the apex, along a dash-dot line of action
inclined **25.77 deg** below the horizontal and pointing down-and-to-the-left.
1:100; 1 cm = 10 kN. A "subsystems" caption sits below the form diagram.

**Geometry.** Origin = left support A (pin, hatched). Right support B is a
roller (vertical reaction only) and sits **0.920 m lower** than A.

| node | x [m] | y [m] |
|---|---|---|
| A (pin) | 0.000 | 0.000 |
| T (apex, load) | 2.661 | 3.307 |
| M (lower node) | 2.661 | 0.771 |
| B (roller) | 8.499 | -0.920 |

Members: A–T (4.245 m), T–M (2.536 m, vertical), A–M (2.770 m), M–B (6.078 m),
T–B (7.208 m). 5 members + 3 reactions = 8 = 2 x 4 nodes -> determinate.

**Answers.** Load components: F_x = -90.05 kN, F_y = -43.48 kN.

Reactions: **A_x = +90.05 kN, A_y = +64.90 kN** (resultant **111.00 kN** at
35.79 deg above the horizontal, pointing up-and-right);
**B_y = -21.43 kN**, i.e. **21.43 kN acting DOWNWARD**.

| member | N [kN] |
|---|---|
| A–T | **-64.96 C** |
| T–M | **-28.58 C** |
| A–M | **-51.36 C** |
| M–B | **-51.36 C** |
| T–B | **+60.90 T** |

*Independent check.* Moments about A: the load's moment is
2.661 x (-43.48) - 3.307 x (-90.05) = +182.09 kNm; B_y x 8.499 = -182.09 -> B_y
= -21.43 kN. Sum of vertical forces: 64.90 - 21.43 - 43.48 = -0.01 ~ 0.
Sum of horizontal: 90.05 - 90.05 = 0.

**PROBLEM WITH THIS TASK.** B comes out in **uplift**. A roller as drawn cannot
deliver a downward reaction; it would lift off. Either the support must be a
two-way (pinned/anchored) bearing, or the load inclination is drawn wrong. State
this in the view rather than hiding it — it is a good teaching moment about when
a roller symbol is a lie.

**Interactive view:** one slider for the load inclination (0 … 90 deg). B_y
crosses zero at exactly **51.18 deg** — the inclination at which the load's line
of action passes through support A, which is also the slope of member A–T. For
anything shallower than that (the drawn 25.77 deg included) the roller is in
uplift; steeper and it works normally.

---

### [G 3] p.2 — Additional Truss (English: "Task 4")

**Text (verbatim).** "Draw the corresponding force diagram for the given truss.
Indicate tension forces with red and compression forces with blue."

**Givens.** F = 50 kN, vertical, down, at the apex. 1:100; 1 cm = 10 kN.
A "subsystem" caption sits below.

**Geometry.** Origin = left support A (pin). B is a roller, same level.

| node | x [m] | y [m] |
|---|---|---|
| A (pin) | 0.000 | 0.000 |
| Ln | 3.934 | 0.950 |
| T (apex, load) | 5.083 | 2.941 |
| Rn | 6.232 | 0.950 |
| B (roller) | 10.166 | 0.000 |

Members: A–T, T–B (rafters, 5.8725 m each); A–Ln, Rn–B (4.0471 m each);
Ln–Rn (2.298 m); T–Ln, T–Rn (2.2988 m each). 7 members + 3 reactions = 10
= 2 x 5 nodes -> determinate. Span 10.166 m, rise 2.941 m, apex exactly at
midspan.

**Answers.** A = B = **25.00 kN** up; A_x = 0.

| member | N [kN] |
|---|---|
| A–T, T–B (rafters) | **-85.68 C** |
| A–Ln, Rn–B | **+76.29 T** |
| Ln–Rn | **+63.82 T** |
| T–Ln, T–Rn | **+20.68 T** |

*Independent check.* Node A, horizontal: -85.68 x (5.083/5.8725) = -74.16 kN;
+76.29 x (3.934/4.0471) = +74.16 kN. Balance. Node A, vertical:
-85.68 x (2.941/5.8725) + 76.29 x (0.950/4.0471) = -42.91 + 17.91 = -25.00 kN,
matched by the 25.00 kN reaction. Global: 2 x 25 = 50 kN.

**Interactive view:** one slider for the apex rise (1 … 5 m) showing the rafter
force blowing up as the truss flattens, while the reactions stay at 25 kN.

---

### [G 4] p.3 — Additional Truss under non-Uniformly Distributed Load (English: "Task 1")

**Text (verbatim).** "Determine both reaction forces A and B for the following
truss. Draw the corresponding force diagram for the given case. Indicate tension
forces with red and compression forces with blue."

**Givens.** F1 = 60 kN, F2 = 20 kN, both vertical down on the top chord.
1:100; 1 cm = 10 kN. A "Subsystem" caption sits below.

**Geometry.** Origin = bottom-left node. Same topology as [G 1.2] (`/ / \ \`)
but a bigger square panel.

| node | x [m] | y [m] | | node | x [m] | y [m] |
|---|---|---|---|---|---|---|
| L0 (pin) | 0.0000 | 0.0000 | | U0 | 0.0000 | 2.8688 |
| L1 | 2.8688 | 0.0000 | | U1 (F1 = 60) | 2.8688 | 2.8688 |
| L2 | 5.7375 | 0.0000 | | U2 (F2 = 20) | 5.7375 | 2.8688 |
| L3 | 8.6063 | 0.0000 | | U3 | 8.6063 | 2.8688 |
| L4 (roller) | 11.4750 | 0.0000 | | U4 | 11.4750 | 2.8688 |

Diagonals L0–U1, L1–U2, L3–U2, L4–U3; verticals at all five x.
Span 11.475 m; loads at L/4 and L/2.

**Answers.** **A = 55.00 kN**, **B = 25.00 kN** (both up).

| member | N [kN] | | member | N [kN] |
|---|---|---|---|---|
| bottom L0–L1 | +55.00 T | | top U0–U1 | **0** |
| bottom L1–L2 | +50.00 T | | top U1–U2 | -55.00 C |
| bottom L2–L3 | +50.00 T | | top U2–U3 | -25.00 C |
| bottom L3–L4 | +25.00 T | | top U3–U4 | **0** |
| vert L0–U0 | **0** | | diag L0–U1 | -77.78 C |
| vert L1–U1 | -5.00 C | | diag L1–U2 | **+7.07 T** |
| vert L2–U2 | **0** | | diag L3–U2 | -35.36 C |
| vert L3–U3 | +25.00 T | | diag L4–U3 | -35.36 C |

*Independent check.* Reactions by moments about B:
A = [60 x (11.475-2.8688) + 20 x (11.475-5.7375)] / 11.475
= (516.38 + 114.75) / 11.475 = **55.00 kN**; B = 80 - 55 = **25.00 kN**.
Node U1 vertical: 77.78 x 0.7071 (from the diagonal) + 5.00 (vertical) - 60
= 55.00 + 5.00 - 60 = 0. Match.

**Notable result.** Diagonal L1–U2 changes sign (**+7.07 kN tension**) because
the load is asymmetric — in [G 1.2] the same member was in compression. This is
the whole point of the task.

**Interactive view:** one slider that moves load between F1 and F2 keeping
F1+F2 = 80 kN; the reader watches diagonal L1–U2 flip from compression to
tension as the load asymmetry grows (it crosses zero when F1 = 40 kN).

---

### [G 5] p.3 — Additional Truss under Inclined Load (English: "Task 2")

**Text (verbatim).** "Determine the resultant force R and both reaction forces A
and B for the following truss. Draw the corresponding force diagram for the
given case. Indicate tension forces with red and compression forces with blue."

**Givens.** F1 = F2 = F3 = 30 kN, all inclined **36.97 deg below the horizontal,
pointing down-and-to-the-right** (measured off the drawn arrows and confirmed
against three independent arrows). 1:100; 1 cm = 10 kN. A "subsystem" caption
sits below.

**Geometry.** Origin = left support A (pin). B is a roller, same level.
Symmetric pitched truss, span 10.311 m, rise 2.026 m, roof pitch 21.45 deg.

| node | x [m] | y [m] | note |
|---|---|---|---|
| A (pin) | 0.000 | 0.000 | **F1 acts here** |
| P1 | 2.578 | 1.013 | midpoint of the left rafter, **F2 acts here** |
| T (apex) | 5.156 | 2.026 | **F3 acts here** |
| P2 | 7.733 | 1.013 | midpoint of the right rafter |
| n1 | 2.976 | 0.000 | bottom-chord node |
| n2 | 7.335 | 0.000 | bottom-chord node |
| B (roller) | 10.311 | 0.000 | |

Members: rafters A–P1, P1–T, T–P2, P2–B (2.770 m each); bottom chord A–n1
(2.976 m), n1–n2 (4.359 m), n2–B (2.976 m); posts P1–n1, P2–n2 (1.088 m,
perpendicular to the rafter); webs n1–T, n2–T (2.976 m).
11 members + 3 reactions = 14 = 2 x 7 nodes -> determinate.

**Answers.**
**R = 90.00 kN**, at 36.97 deg below the horizontal, line of action through P1
(2.578, 1.013) — because the three equal parallel loads are equally spaced along
the rafter, the resultant passes through the middle one.
R_x = +71.91 kN, R_y = -54.13 kN.

Reactions: **A_x = -71.91 kN (i.e. 71.91 kN to the left), A_y = +33.53 kN**
-> resultant **A = 79.34 kN at 25.00 deg above the horizontal, up-and-left**;
**B = +20.60 kN** up.

| member | N [kN] |
|---|---|
| rafter A–P1 | -42.35 C |
| rafter P1–T | -58.06 C |
| rafter T–P2 | -56.32 C |
| rafter P2–B | -56.32 C |
| bottom A–n1 | +87.35 T |
| bottom n1–n2 | +52.41 T |
| bottom n2–B | +52.42 T |
| post P1–n1 | -25.56 C |
| post P2–n2 | **0** |
| web n1–T | +34.94 T |
| web n2–T | **0** |

*Independent check.* Moments about A: R applied at P1 gives
2.578 x (-54.13) - 1.013 x (71.91) = -139.54 - 72.85 = -212.39 kNm;
B x 10.311 = +212.39 -> B = 20.60 kN. Sum of verticals: 33.53 + 20.60 = 54.13 =
|R_y|. Zero-member rule confirms post P2–n2 = 0 (two collinear rafters + one
transverse member, unloaded) and hence web n2–T = 0 at n2.

**AMBIGUITY.** F1's line of action passes exactly through the pin support A.
Structurally F1 therefore does nothing except add directly to the reaction — it
never enters a member. This is almost certainly intended (a roof-slope
tributary load with the end load landing on the support) but a reader will
suspect a drafting mistake, so say it out loud.

**Interactive view:** one slider for the load inclination (0 … 90 deg), with the
resultant R and its line of action drawn live; at 0 deg the whole thing is a
pure horizontal push and B goes negative.

---

### [G 6] p.4 — Internal Force Distribution in a Simple Beam (English: "Task 1")

**Text (verbatim).** "Draw the force diagrams for the given distribution of
internal forces for the beams in a) - c). For the cases d) and e), the force
diagram is already provided. Indicate tension forces with red and compression
forces with blue. Compare in f) the distribution of internal forces in a) - c)
with the versions in d) and e)."

**Givens (all five cases).** F1 = F2 = 25 kN, vertical, down.
Form diagrams 1:100; force diagrams 1 cm = 10 kN.

**Geometry common to a) – e).** Origin = bottom-left node of the internal
force path. Beam outline 9.911 m x 1.723 m; the internal chord system spans
**L = 9.6216 m** with an internal depth **d = 1.4355 m**. Supports at the two
ends: pin left, roller right. Loads at **L/4 = 2.4054 m** and **L/2 =
4.8108 m** from A. (The load positions are digitised at 0.2577 L and 0.4998 L.)

Reactions for every case: **A = 31.25 kN, B = 18.75 kN**.
Moments: M(L/4) = 75.169 kNm, M(L/2) = **90.203 kNm**.

**a) Arch and tie.** Nodes of the drawn compression polygon, measured from the
tie line: (0, 0) – (2.4054, **1.1970**) – (4.8108, **1.4355**) – (9.6216, 0),
plus a straight tie along y = 0. The measured rise ratio 1.1970 / 1.4355 =
0.8338 matches the exact funicular ratio 75.169 / 90.203 = 0.83333, so the
printed shape is the true funicular.

| member | N [kN] |
|---|---|
| tie (bottom chord, full length) | **+62.84 T** |
| arch A -> F1 | **-70.18 C** |
| arch F1 -> F2 | **-63.15 C** |
| arch F2 -> B | **-65.57 C** |

H = M(L/2) / d = 90.203 / 1.4355 = **62.84 kN**.

**b) Cable and strut.** The exact mirror image of a) about the beam axis: the
polygon hangs to depths 1.1970 and 1.4355 below a straight top chord.
Magnitudes identical: **strut (top chord) 62.84 kN C**, cable segments
**70.18 / 63.15 / 65.57 kN T**.

**c) Lens (arch + cable together).** Both chords spring from the same two end
points on the beam axis (y = 0) and open to +-0.5985 m at L/4 and +-0.7178 m at
L/2, total depth at midspan **z = 1.436 m**. Each chord carries half of each
load (12.5 kN).

| member | N [kN] |
|---|---|
| upper chord, 3 segments | **-64.73 / -62.90 / -63.52 C** |
| lower chord, 3 segments | **+64.73 / +62.90 / +63.52 T** |

Horizontal component in each chord = 90.203 / 1.436 = **62.82 kN**. There is no
external horizontal reaction: the arch thrust is balanced internally by the
cable pull.

*Check across a), b), c):* all three give the same chord force,
**62.8 kN**, because all three have the same internal lever arm 1.4355 m at
midspan. That is exactly what the reader should discover.

**d) Truss, 12 numbered members (force diagram given on the sheet).**
Nodes, origin at the bottom-left node, panel = L/4 = 2.4054 m, depth 1.4355 m:

| node | x [m] | y [m] |
|---|---|---|
| B0 (pin) | 0.0000 | 0.0000 |
| B1 | 2.4054 | 0.0000 |
| B2 (dummy, chord split only) | 4.8108 | 0.0000 |
| B3 | 7.2162 | 0.0000 |
| B4 (roller) | 9.6216 | 0.0000 |
| T1 (F1) | 2.4054 | 1.4355 |
| T2 (F2) | 4.8108 | 1.4355 |
| T3 | 7.2162 | 1.4355 |

| # | member | N [kN] | measured off the printed force diagram |
|---|---|---|---|
| 1 | B0–T1 | **-60.98 C** | 60.78 |
| 2 | B0–B1 | **+52.36 T** | 52.47 |
| 3 | T1–B1 (vertical) | **+6.25 T** | – |
| 4 | T1–T2 | **-52.36 C** | 52.47 |
| 5 | B1–T2 | **-12.20 C** | – |
| 6/9 | B1–B3 (one bar, two labels) | **+62.84 T** | 62.91 |
| 7 | T2–T3 | **-31.42 C** | 31.59 |
| 8 | T2–B3 | **-36.59 C** | 36.50 |
| 10 | T3–B3 (vertical) | **+18.75 T** | – |
| 11 | T3–B4 | **-36.59 C** | 36.44 |
| 12 | B3–B4 | **+31.42 T** | 31.59 |

Members 6 and 9 are one physical bar; the sheet splits the label where the F2
load line crosses, and the printed force diagram accordingly marks the single
point "6/9".

**e) Truss, 21 numbered members (force diagram given on the sheet).**
Origin at the bottom-left node.

| node | x [m] | y [m] | | node | x [m] | y [m] |
|---|---|---|---|---|---|---|
| A (pin) | 0.000 | 0.0000 | | B2 | 4.811 | 0.0000 |
| U1 | 0.812 | 0.7175 | | M2 | 6.410 | 0.7175 |
| T1 (F1) | 2.412 | 1.4350 | | T3 | 7.210 | 1.4350 |
| B1 | 2.412 | 0.0000 | | B3 | 7.210 | 0.0000 |
| M1 | 3.212 | 0.7175 | | U2 | 8.810 | 0.7175 |
| T2 (F2) | 4.811 | 1.4350 | | B4 (roller) | 9.622 | 0.0000 |

| # | member | N [kN] | | # | member | N [kN] |
|---|---|---|---|---|---|---|
| 1 | A–U1 | -47.17 C | | 12 | T2–M2 | -17.10 C |
| 2 | A–B1 | +35.35 T | | 13 | B2–M2 | +28.74 T |
| 3 | U1–T1 | -57.53 C | | 14 | T2–T3 | -47.32 C |
| 4 | U1–B1 | +18.80 T | | 15 | B2–B3 | +36.70 T |
| 5 | T1–M1 | -2.18 C | | 16 | M2–T3 | +21.19 T |
| 6 | B1–M1 | -11.52 C | | 17 | M2–B3 | -6.92 C |
| 7 | T1–T2 | -50.87 C | | 18 | T3–U2 | -34.57 C |
| 8 | B1–B2 | **+61.07 T** (max) | | 19 | B3–U2 | +11.29 T |
| 9 | M1–T2 | -13.20 C | | 20 | B3–B4 | +21.24 T |
| 10 | M1–B2 | +2.02 T | | 21 | U2–B4 | -28.34 C |
| 11 | T2–B2 (vertical) | -12.59 C | | | | |

*Independent check on d) and e).* The sheet prints both force diagrams. Ten
independent segment lengths were digitised and compared (see the "measured"
column for d)); for e), members 8 (61.04 vs 61.07), 3 (57.52 vs 57.53), 7
(50.87 vs 50.87), 14 (47.25 vs 47.32), 15 (36.75 vs 36.70), 2 (35.34 vs 35.35),
13 (28.64 vs 28.74), 20 (21.33 vs 21.24), 16 (21.18 vs 21.19) and 12 (17.09 vs
17.10) all agree to better than 1 %. The load lines in both printed diagrams
divide as 3.125 / 2.5 / 2.5 / 1.875 cm, confirming A = 31.25 and B = 18.75 kN.

**f) The comparison — answer already printed on the sheet in German.**
Translation: *"Situations a) to c) show a solution with an arch-cable structure
inside the beam. For such a solution in reinforced concrete the tension elements
have to be prestressed, otherwise large cracks can form in the concrete. In
variants d) and e) a truss is formed inside the beam. Here the forces are better
distributed and so are the cracks (many small cracks instead of one large
crack). Prestressing is therefore not needed."*

**PROBLEM.** f)'s answer is printed on the *task* sheet, in German, in the
English version too, and the last two lines of the paragraph overlap the ruled
line beneath them in the render. Both a translation bug and a layout bug.

**Interactive view:** one slider for the internal depth d (0.5 … 1.44 m) shared
by all five cases, showing the chord force rise as 1/d and all five variants
converge on the same number at full depth.

---

### [G 7] p.5 — Additional Statically determined supported wall slab (English: "Task 1")

**Text (verbatim).** "Four equal wall slabs in reinforced concrete but with
different supports or loads are given. In situations a) to c) draw a possible
internal force distribution as an arch-cable-structure with the aid of the force
diagram. Draw the corresponding force diagram to the given force distribution in
d). Indicate tension forces with red and compression forces with blue."

**Givens.** a) F = 70 kN inclined; b) q1 = 8 kN/m; c) q1 = 8 kN/m plus
F = 36 kN; d) q1 = 6 kN/m. All four form diagrams 1:100; force diagrams
1 cm = 10 kN.

**Geometry.** Origin = bottom-left corner of the slab, for each case
separately. All four slabs are identical: **8.997 m wide x 3.093 m high**.
The support symbols sit 0.127 m inside each edge, so the structural
**span is 8.748 m** in a), b) and c) (pin left at x = 0.127, roller right at
x = 8.875).

**a) F = 70 kN inclined.** Direction 16.40 deg below the horizontal, pointing
down-and-to-the-left. Line of action: enters the slab through the **left face at
y = 2.112 m** above the base and leaves through the **top face at x = 3.331 m**
from the left edge.
Components F_x = -67.152 kN, F_y = -19.764 kN.

Answers: **A_x = +67.15 kN, A_y = +36.27 kN** (resultant **76.32 kN at
28.37 deg above horizontal**); **B = -16.50 kN, i.e. 16.50 kN downward**.

*Check.* A point on the line of action, in slab coordinates, is
(-0.528, 1.957); support A sits at (0.127, 0). Moment about A =
x*F_y - y*F_x = (-0.655)(-19.764) - (1.957)(-67.152) = 12.945 + 131.416
= +144.36 kNm; B = -144.36 / 8.748 = **-16.502 kN**;
A_y = 19.764 + 16.502 = **36.266 kN**; A_x = **67.152 kN**. Sums of forces in
both directions close to 1e-14.
**Note:** B is again in uplift, so the roller as drawn cannot work — same issue
as [G 2]. Flag it.

**b) q1 = 8 kN/m over the full 8.997 m.**
R = 8 x 8.997 = **71.976 kN**, acting at midspan.
**A = 36.01 kN, B = 35.97 kN** (both up; 36.0 kN each to drawing accuracy).
*Check:* A + B = 71.98 = R.

**c) q1 = 8 kN/m over the left 4.498 m plus F = 36 kN at x = 6.748 m.**
R_q = 8 x 4.498 = 35.984 kN at x = 2.249 m; F = 36 kN at x = 6.748 m.
Total 71.984 kN.
**A = 36.01 kN, B = 35.98 kN.**
*Check:* the combined resultant sits at (35.984 x 2.249 + 36 x 6.748) / 71.984
= 4.500 m = midspan, hence the equal reactions. This is clearly deliberate:
b) and c) are designed to give the same answer with completely different loads.

**d) q1 = 6 kN/m, offset supports, force path given.**
Supports: **A (pin) at x = 5.399 m** (= 0.6000 x the slab width, exactly) and
**B (roller) at x = 8.875 m**. The slab therefore cantilevers 5.399 m to the
left of A and only 0.122 m past B.
R = 6 x 8.997 = **53.982 kN** at x = 4.4985 m — i.e. *left of A*.
**A = +67.97 kN up; B = -13.98 kN, i.e. 13.98 kN DOWNWARD** (the drawn arrows
already say so: A points up, B points down).
*Check:* A + B = 67.967 - 13.985 = 53.982 = R. Moments about A:
53.982 x (5.399 - 4.4985) = 48.61 kNm balanced by 13.985 x 3.476 = 48.61 kNm.

The drawn internal force path in d) is a curved arch springing from the left
edge (x = 0.090, y = 0.100) up to a crown directly over support A
(x = 5.399, y = 3.040) and then dropping to (x = 8.875, y = 0.100), with a
straight bottom tie between the two ends and a vertical strut on the crown line.

**Interactive view:** one slider that moves support A from x = 0 to x = 8.875;
the reader watches B's reaction pass through zero at x = 4.4985 m (support A
under the load resultant) and go into uplift beyond it.

---

### [G 8.1] p.6 — Qualitative Inner Force Distribution in a Reinforced Concrete Frame (English: "Task 3")

**Text (verbatim).** "Three identical reinforced concrete frames with different
support conditions are given. Draw the possible inner force distribution for
each case. Indicate tension forces with red and compression forces with blue."

**Givens.** Nothing numeric. **No scale is printed for this block** (unlike the
task below it on the same page). Three frames a), b), c), each with one vertical
load arrow and two reaction arrows.

**Geometry.** Origin = bottom-left **outer** corner of the frame, y up. Values in
metres-at-1:100 (the block carries no printed scale, so read them as
proportions; on paper 1 unit = 10 mm). All three frames are the same drawing to
within 0.023 m, so "identical" is confirmed numerically.

| item | value |
|---|---|
| outer outline | (0,0) - (0,3.2027) - (6.0070,3.2027) - (6.0070,0) - (5.2855,0) - (5.2855,2.4529) - (0.7216,2.4529) - (0.7216,0) - (0,0) |
| overall | **6.0070 wide x 3.2027 high** |
| left leg | x 0 … 0.7216 (**0.7216** wide) |
| right leg | x 5.2855 … 6.0070 (0.7215 wide) |
| beam depth | **0.7498** (soffit at y = 2.4529) |
| clear opening | 4.5639 wide x 2.4529 high |
| support A / B | apexes at x = 0.3608 and x = 5.6462, y = 0 (the leg centrelines) |
| load | vertical, down, at x = 3.0036 = exact midspan |

**All six supports are drawn identically: hatched triangle = pinned.** The
"different support conditions" of the task title exist **only** in the drawn
reaction arrows and dash-dot lines of action — the symbols are the same in all
three. Say this in the view; it is the single most confusing thing about the
task.

**Answers (directions only — no magnitudes exist).**

| case | left reaction | right reaction | the two reaction lines meet at |
|---|---|---|---|
| a) | **90.00 deg** (vertical, up) at x = 0.3608 | **90.00 deg** (vertical, up) at x = 5.6462 | infinity (parallel) — no arch action, the frame works in bending |
| b) | **47.11 deg** up-and-right | **47.12 deg** up-and-left | **(2.9922, 2.8363)** — inside the beam, at its mid-depth on the midspan axis |
| c) | **62.37 deg** up-and-right | **62.37 deg** up-and-left | **(3.0036, 5.0461)** — **1.84 m above the top of the frame**, which is why c)'s load arrow is drawn high (tip at y = 5.306) |

*Independent check.* In b) the ray from support (0.3594, 0) to the intersection
(2.9922, 2.8361) computes to 47.13 deg against the 47.11 deg drawn; in c) the
ray from (0.3608, 0) to (3.0036, 5.0461) computes to 62.36 deg against 62.37
drawn. Both dash-dot systems are therefore genuine three-force concurrency
constructions, drawn to better than 0.02 deg.

**What the drawings must show.** a) inclined struts inside the legs are
impossible (the reactions are vertical), so the beam must work as a
tie-and-strut couple over its 0.75 m depth with the legs in pure compression.
b) the shallow thrust line lets an arch form inside the frame: compression from
the load down through the haunches to the supports, tension tie along the beam
soffit. c) the steep reactions put the concurrency point above the frame, so the
thrust line has to be pushed up out of the beam — the tie is now on the *top* of
the beam and the legs are in tension over part of their height.

**Interactive view:** one switch between a) / b) / c) that redraws the two
reaction rays and their concurrency point, so the reader sees the thrust line
migrate from "no arch" (a) to "arch in the beam" (b) to "arch above the frame"
(c).

---

### [G 8.2] p.6 — Additional Statically indetermined supported frame (English: "Task 1")

**Text (verbatim).** "Two equal frames in reinforced concrete with different
supports are given. In situation a) draw a possible internal force distribution
as an arch-cable-construction with the aid of the force diagram. Draw the
corresponding force diagram to the given force distribution in b). Indicate in
both a) and b) tension forces with red and compression forces with blue."

**Givens.** Q = 30 kN, vertical, down, at midspan, in both a) and b).
Form diagram 1:100; force diagram 1 cm = 10 kN.

**Geometry (identical for a) and b)).** Origin = support point A, y up.

| vertex | x [m] | y [m] |
|---|---|---|
| outer bottom-left | -0.1336 | 0 |
| outer top-left | -0.1336 | 3.0926 |
| outer top-right | 8.8634 | 3.0926 |
| outer bottom-right | 8.8634 | 0 |
| right leg inner face, base | 7.5221 | 0 |
| right leg inner face, soffit | 7.5199 | 2.0873 |
| left leg inner face, soffit | 1.2099 | 2.0873 |
| left leg inner face, base | 1.2099 | 0 |

Overall **8.997 m x 3.0926 m**; left leg 1.3435 m, right leg 1.3413 m; beam
depth **1.0053 m**; clear opening 6.3100 x 2.0873 m. Support A is 0.1336 m
inside the left outer face; **support spacing 8.7298 m**.
Q at **x = 4.3649 m = exact midspan**.

**Both supports in both cases are pinned** (hatched triangles): 4 reaction
components, 3 equations -> **statically indeterminate to degree 1**. The drawn
reaction arrows are therefore *given data*, not a result.

**a) Answers.** Drawn reaction angles: A at **31.282 deg**, B at **31.889 deg**
above the horizontal (both extensions pass through their supports to within
0.2 mm on paper). Using the symmetric mean **theta = 31.586 deg**:

- Vertical: A_v = B_v = Q/2 = **15.000 kN**
- Horizontal thrust: H = 15.000 / tan(31.586 deg) = **24.395 kN**
- Resultant: |A| = |B| = 15.000 / sin(31.586 deg) = **28.635 kN**

Taking each drawn arrow separately gives |A| = 28.888 kN (H = 24.688) and
|B| = 28.392 kN (H = 24.105); the 2.4 % spread is drafting error, and one H must
serve both.
*Independent check.* Moments about B: 30 x 4.3649 - 15.000 x 8.7298
= 130.95 - 130.95 = 0.000 kNm. Sum H = +24.395 - 24.395 = 0.
**State plainly:** theta is not fixed by statics; these numbers are the
consequence of the angle the sheet draws.

**b) Answers.** The internal force distribution is given. Nodes (origin = A):

| node | x [m] | y [m] | role |
|---|---|---|---|
| A | 0.0000 | 0.0000 | left support (pinned) |
| B | 8.7298 | 0.0000 | right support (pinned) |
| n1 | 0.0000 | 2.9796 | top of the left vertical tie |
| n2 | 8.7298 | 2.9796 | top of the right vertical tie |
| n3 | 4.3649 | 2.9749 | crown of the upper "lambda" — Q applies here |
| n4 | 4.3649 | 2.2652 | crown of the lower "V" |
| n5 | 1.1418 | 2.1337 | left knee |
| n6 | 7.5880 | 2.1337 | right knee |

| # | member | L [m] | N [kN] |
|---|---|---|---|
| 1 | A–n1 | 2.9796 | **+14.742 T** |
| 2 | B–n2 | 2.9796 | +14.742 T |
| 3 | A–n5 | 2.4200 | **-33.732 C** |
| 4 | B–n6 | 2.4200 | -33.732 C |
| 5 | n5–n1 | 1.4210 | -31.786 C |
| 6 | n6–n2 | 1.4210 | -31.786 C |
| 7 | n5–n3 | 3.3311 | **-42.845 C (largest force)** |
| 8 | n6–n3 | 3.3311 | -42.845 C |
| 9 | n3–n4 | 0.7097 | -8.361 C (central post) |
| 10 | n4–n1 | 4.4230 | **+25.881 T (largest tension)** |
| 11 | n4–n2 | 4.4230 | +25.881 T |

Reactions implied by the given distribution:
**A = (+15.916, +15.000) kN -> 21.870 kN at 43.304 deg**; B the mirror image;
horizontal thrust **H = 15.916 kN**.

*Independent checks.* (i) 8 nodes -> 16 equations; 11 members + 4 reaction
components = 15 unknowns; matrix rank 15, residual 5.7e-14 kN — so the drawn
geometry is exactly self-consistent, not merely approximately. (ii) Sum V =
15 + 15 - 30 = 0; sum H = 0; moment about A = 21.870 sin(43.304) x 8.7298
- 30 x 4.3649 = 0. (iii) The sheet's own drawn reaction arrows in b) measure
43.30 deg and 43.08 deg — statics gives **43.304 deg**, agreeing with the left
arrow to 0.004 deg. (iv) Node n3 closure: -0.5050 x (-42.845) - (-8.361)
= 29.996 ~ 30.000 kN.

At 1 cm = 10 kN the largest vector is 4.28 cm and the reactions are 2.19 cm.

**Note the contrast the task is built on:** a) with the shallow drawn thrust
(31.6 deg) needs H = 24.40 kN; b) with the steeper given distribution
(43.3 deg) needs only H = 15.92 kN. Same frame, same load, 35 % less thrust —
because the frame is indeterminate and the designer picks.

**Interactive view:** one slider for the reaction inclination theta (20 … 70
deg) with H, |A| and the whole strut-and-tie figure redrawing live, and the two
printed cases marked on the slider at 31.6 deg and 43.3 deg.

---

### [G 9.1] p.7 — Internal Force Flow in Frames (English: "Task 1")

**Text (verbatim).** "Draw a possible internal force flow for the reinforced
concrete frame with help of the thrust line. Draw the corresponding force
diagram and indicate tension forces with red, compression forces with blue and
reaction forces with green."

**Givens.** a) load labelled **G_d**; b) load labelled **Q_d**.
**Neither carries a number, on this page or anywhere else in the booklet.**
Form diagrams 1:100; force diagrams 1 cm = 10 kN.

**a) Geometry.** Origin = bottom-left outer corner, y up. A portal frame with a
hinged crown.

| vertex (walking the closed outline) | x [m] | y [m] |
|---|---|---|
| outer bottom-left | 0.0000 | 0.0000 |
| left leg inner face, base | 1.8217 | 0.0000 |
| left shoulder (soffit) | 1.8217 | 3.6593 |
| soffit, start of rise | 4.0823 | 3.6593 |
| crown underside, left of hinge | 5.4661 | 5.0209 |
| crown underside, right of hinge | 5.5235 | 5.0209 |
| soffit, end of fall | 6.9072 | 3.6593 |
| right shoulder | 9.1678 | 3.6593 |
| right leg inner face, base | 9.1678 | 0.0000 |
| outer bottom-right | 10.9895 | 0.0000 |
| outer top-right | 10.9895 | 5.4095 |
| outer top-left | 0.0000 | 5.4095 |

Overall **10.9895 m x 5.4095 m**; both legs **1.8217 m** wide; clear span
7.3461 m; clear height 3.6593 m; beam **1.7502 m** deep at the haunches thinning
to **0.3886 m** at the crown; soffit rise segments at **+-44.54 deg**.
**Hinge**: circle centre **(5.4948, 5.2176)**, diameter **0.200 m**, on the
centreline at the crown, tangent to the top edge.
**Supports: both pinned**, apexes at (0.1499, 0) and (10.8396, 0), spacing
**10.6897 m**.
**Load G_d**: vertical, **downward**, at x = 5.4948 (exact centreline),
arrowhead apex at y = 5.8596.

**b) Geometry.** Not a portal — a **solid rectangular panel** with the thrust
line drawn inside it. Origin = bottom-left corner.

| item | value |
|---|---|
| panel | 0 … **9.4901** m x 0 … **4.6717** m |
| bottom edge | drawn only as two stubs, x 0 … 0.2906 and 9.1263 … 9.4901 |
| hinge circle | centre **(4.7451, 4.5242)**, diameter 0.200 m, interrupting the top edge |
| supports | **both pinned**, apexes at (0.1499, 0) and (9.3401, 0), spacing 9.1902 m |

Drawn thrust line (asymmetric — two segments left, one straight run right):

| node | x [m] | y [m] | to next | L [m] | angle |
|---|---|---|---|---|---|
| T1 (left foot) | 0.2897 | 0.0000 | T1->T2 | 3.4004 | **+68.24 deg** |
| T2 (kink) | 1.5512 | 3.1576 | T2->T3 | 3.3853 | **+20.78 deg** |
| T3 (hinge, left) | 4.7163 | 4.3585 | hinge | | |
| T4 (hinge, right) | 4.7738 | 4.2834 | T4->T5 | 6.1067 | **-44.53 deg** |
| T5 (right foot) | 9.1263 | 0.0000 | | | |

**Load Q_d**: at x = 4.7450, and it points **UPWARD** (the arrowhead apex sits
above the shaft in the path data and the render confirms it). Case b) is an
**uplift / suction** case, deliberately drawn as the mirror of a).

**Answers.** **No absolute number can be given** — neither G_d nor Q_d has a
magnitude. What *is* fully determined is every ratio:

**a)** Two pinned bases plus the crown hinge = a **three-hinged frame**, so it
is statically determinate and the thrust line must pass through all three
hinges. With G_d applied at the crown hinge and the frame symmetric:
- V_A = V_B = **0.5000 x G_d**
- Half-span support-to-crown = 5.4948 - 0.1499 = 5.3449 m; crown hinge height
  = 5.2176 m. Moments about the crown for the left half:
  **H = 0.5000 x G_d x 5.3449 / 5.2176 = 0.5122 x G_d**
- |R_A| = |R_B| = sqrt(0.5000^2 + 0.5122^2) x G_d = **0.7158 x G_d**, at
  **44.31 deg** above the horizontal, pointing inward and up.
*Check:* 2 x 0.5000 G_d = G_d vertically; the two horizontal components
0.5122 G_d cancel; the thrust line from (0.1499, 0) at 44.31 deg reaches
x = 5.4948 at y = 5.3449 x tan(44.31 deg) = 5.2176 m = the crown hinge. Closes.

**b)** The thrust line is given, so the reaction *directions* are given: at the
left foot **68.24 deg**, at the right foot **-44.53 deg**. Resolving those two
directions against a vertical Q_d:
- **H = 0.2868 x Q_d**
- |A| = **0.7731 x Q_d** (vertical component 0.7179 Q_d)
- |B| = **0.4023 x Q_d** (vertical component 0.2821 Q_d)
*Check:* 0.7179 + 0.2821 = 1.0000 x Q_d vertically; horizontals cancel.

**A REAL DEFECT IN b), worth stating.** The drawn thrust line is **not in
equilibrium** with a single vertical load at x = 4.7450:
(i) the two foot directions, extended, concur at **(2.7823, 6.2384)** — outside
the 4.6717 m tall panel and 1.96 m away from the load's line of action, whereas
three coplanar forces must be concurrent; and
(ii) the line kinks at T2 (1.5512, 3.1576) from 68.24 deg to 20.78 deg, and a
kink in a thrust line requires a force at that point — none is drawn.
So the given figure is indicative, not a true funicular. Any view built from it
must either accept it as a sketch or straighten it. The correct three-hinged
line for a load at the crown runs straight from each *support* to the crown
hinge: from (0.1499, 0) to (4.7451, 4.5242) is **+44.56 deg** and from
(9.3401, 0) to the same point is **-44.56 deg** — perfectly symmetric, giving
V = 0.5000 Q_d, **H = 0.5084 Q_d**, |A| = |B| = **0.7129 Q_d**. Note that the
sheet's drawn *right-hand* segment (-44.53 deg) is already that correct line to
0.03 deg; only the left-hand side, with its spurious kink at T2, departs from
it.

**MISSING, stated plainly:** one number. Give G_d (and Q_d) a value and both
sub-parts close in two lines. Until then nothing on this page is a number.

**Interactive view:** make the missing number the control — a slider for G_d
(0 … 200 kN) with the thrust line and the force diagram scaling live. This turns
the sheet's defect into the view's feature.

---

### [G 9.2] p.7 — Additional Axial Force Proof (English: "Task 2")

**Text (verbatim).** "Check whether the reinforcement in the reinforced concrete
in additional task 1a) can withstand the relevant tension force. The
reinforcement has a round section with a diameter of 16 mm and is made of steel
S235."

**Givens.** D = 16 mm; S235.

**Answer — the capacity side, which is fully determinable:**
- A = pi x 16^2 / 4 = **201.0619 mm2**
- f_td = f_tk / gamma_M = 235 / 1.05 = **223.8095 N/mm2**
- **N_allow = 201.0619 x 223.8095 = 44 999.6 N = 45.000 kN**

*Independent check.* 201.0619 mm2 x 223.81 N/mm2 = 45.00 kN; equivalently
0.2011 x 10^-3 m2 x 223 810 kN/m2 = 45.00 kN.

**Answer — the demand side: NOT DETERMINABLE.** Two compounding faults:
1. The referent is ambiguous. Page 7's own frames are labelled "**Task** 1 a)/b)"
   in English; the only block actually called "Additional Task 1 a)" is on
   **page 6** (Q = 30 kN). The German resolves it — "aus Aufgabe **9.1** a)" —
   i.e. the frame on page 7 itself.
2. Under that (correct) reading, G_d has no value, so there is no tension force
   to check.

For orientation only: if the intended referent were page 6's given distribution
[G 8.2] b), the largest tension there is 25.881 kN -> utilisation 57.5 %, and
the bar would pass.

**Interactive view:** slider for the tension force (0 … 60 kN) against the fixed
45.00 kN capacity line, with the bar diameter as a second control (8 … 32 mm).

---

### [G 10.1] p.8 — Additional Reinforced Concrete Frame (English: "Task 3")

**Text (verbatim).** "Given is the possible distribution of the internal forces
for a reinforced concrete frame. Draw the corresponding force diagram. Indicate
tension forces with red and compression forces with blue."

**Givens.** **Q_d = 35 kN**, horizontal, pointing right, labelled "(earthquake)".
Form diagram 1:100; force diagram 1 cm = 10 kN. An empty "subsystem" panel sits
below.

**Geometry.** Origin = the **left support point P1**, y up. Outer outline
(splayed legs plus a slab with cantilevers on both sides):

| # | x [m] | y [m] | description |
|---|---|---|---|
| O1 | -1.3645 | 4.4374 | slab top, left end |
| O2 | -1.3645 | 3.9662 | slab underside, left tip |
| O3 | 0.0744 | 3.7850 | left cantilever underside meets the leg |
| O4 | -0.4024 | 0.0000 | left leg outer face at the base |
| O5 | 0.4024 | 0.0000 | left leg inner face at the base |
| O6 | 1.1041 | 2.7124 | leg inner face, kink |
| O7 | 2.4729 | 3.6314 | haunch meets the slab soffit |
| O8 | 5.0450 | 3.6314 | slab soffit, right of midspan |
| O9 | 6.4140 | 2.7124 | right haunch kink |
| O10 | 7.1157 | 0.0000 | right leg inner face at the base |
| O11 | 7.9204 | 0.0000 | right leg outer face at the base |
| O12 | 7.4435 | 3.7850 | right leg meets the cantilever underside |
| O13 | 8.8826 | 3.9662 | slab underside, right tip |
| O14 | 8.8826 | 4.4374 | slab top, right end |

Overall **10.2471 m wide x 4.4374 m high**; slab **0.8060 m** thick at midspan
tapering to 0.4712 m at the tips; leg base width 0.8048 m; **support spacing
7.5180 m**; the legs lean outward 0.4768 m over their height.

Q_d arrow: horizontal, **+x**, line of action at **y = 4.2445**; arrowhead apex
at x = -1.4848. The "point of application of Q" leader runs from (4.6421,
5.3681) to (3.7967, 4.3616) and lands on node **P4**. A small circle
(diameter 0.190 m) at (1.1026, 3.2622) marks where members P1–P3 and P2–P4
**cross without connecting** (their true intersection is (1.1034, 3.2586)).

Internal strut-and-tie nodes:

| node | x [m] | y [m] | role |
|---|---|---|---|
| P1 | 0.0000 | 0.0000 | left support (pinned) |
| P2 | 0.0735 | 2.8722 | left knee |
| P3 | 1.4392 | 4.2549 | left top node |
| P4 | 3.7590 | 4.2549 | midspan top node — Q_d enters here |
| P5 | 7.3210 | 4.2549 | right top node |
| P6 | 6.4160 | 3.2581 | right knee |
| P7 | 7.5180 | 0.0000 | right support (pinned) |

**Answers.** 7 nodes -> 14 equations; 10 members + 4 reaction components = 14
unknowns; rank 14, residual 8.8e-14 kN — exactly determinate and the drawn
geometry is internally exact.

| # | member | L [m] | N [kN] |
|---|---|---|---|
| 1 | P1–P2 | 2.8731 | **-34.554 C** |
| 2 | P2–P3 | 1.9434 | **-76.393 C (largest force)** |
| 3 | P1–P3 | 4.4917 | **+57.376 T (largest tension)** |
| 4 | P2–P4 | 3.9363 | +56.392 T |
| 5 | P3–P4 | 2.3198 | -35.299 C |
| 6 | P4–P5 | 3.5620 | +35.301 T |
| 7 | P4–P6 | 2.8378 | -56.394 C |
| 8 | P5–P6 | 1.3463 | -49.968 C |
| 9 | P5–P7 | 4.2595 | +37.034 T |
| 10 | P6–P7 | 3.4394 | -59.965 C |

Reactions: **R(P1) = (-17.500, -19.809) kN = 26.432 kN at 48.54 deg below the
horizontal** — the windward base is **held down**; **R(P7) = (-17.500, +19.809)
kN = 26.432 kN at 48.54 deg above the horizontal**.

*Independent check, done by hand against the matrix solve.* Shear splits equally
by the symmetry of the base pattern: H = 35/2 = 17.500 kN each. Overturning:
35 x 4.2549 = **148.92 kNm** over the 7.5180 m base spacing -> V = **19.809 kN**
down at P1, up at P7. Sum Fx = 35 - 17.5 - 17.5 = 0; sum Fy = 0; moment about
P1 = 0. Node P1 closure: (-0.884, -34.542) + (18.384, +54.351) +
(-17.500, -19.809) = (0.000, 0.000).
Using the arrow's own line (y = 4.2445) instead of the chord (y = 4.2549)
changes V from 19.809 to 19.760 kN, i.e. 0.25 % — quote 19.81 kN.

**Interactive view:** one slider for Q_d (-70 … +70 kN) so the reader watches
the earthquake force reverse and the uplift jump from one base to the other.

---

### [G 10.2] p.8 — Additional Dimensioning (English: "Task 2")

**Text (verbatim).** "a) Dimension the reinforcement within the reinforced
concrete for the relevant tension force of task 2 a). Use steel S235 to
calculate the diameter and round the result off to mm. (Round up!)
b) Verify whether the frame in task 2 b) can keep up with the relevant
compression force. The slab is 8 cm thick and is constructed in concrete C12/15.
Presume the force would affect the frame over the width of 10 cm."

**BROKEN REFERENCES.** There is no "task 2 a)" or "task 2 b)" anywhere in the
booklet that supplies a force. The German version reads *"Dimensionieren Sie die
Bewehrung … für die massgebende Zugkraft aus **Aufgabe 10.1**"* — i.e. the
Q_d = 35 kN frame immediately above on the same page — **and has no part b) at
all**. The English b) is an orphan.

**a) Answer, taking the German referent [G 10.1].** Governing tension there is
member 3 (P1–P3) = **57.376 kN**.
- A_req = 57 376 / 223.8095 = **256.36 mm2**
- D = 2 sqrt(A/pi) = 2 sqrt(256.36 / pi) = **18.067 mm -> 19 mm** (round up)

*Independent check.* A 19 mm bar has A = 283.53 mm2 and N_allow =
283.53 x 223.8095 = **63.45 kN > 57.376 kN**; an 18 mm bar gives 56.96 kN, which
is just short — so 19 mm is the first size that works. Correct.

**b) Answer, the part that is determinable regardless of the referent.**
Compressive resistance of an 80 mm x 100 mm C12/15 bearing area:
- A = 80 x 100 = **8000 mm2**
- f_cd = 12 / 1.5 = **8.000 N/mm2**
- **N_allow = 8000 x 8.000 = 64 000 N = 64.00 kN**

Against [G 10.1]'s own governing compression of 76.393 kN this **fails** at
119.4 % utilisation; against the slab-chord compression P3–P4 = 35.299 kN it
passes at 55.2 %; against [G 8.2] b)'s largest compression of 42.845 kN it
passes at 66.9 %. Which of these the sheet meant cannot be decided from the
sheet.

**Interactive view:** two coupled readouts — bar diameter vs tension force, and
bearing width vs compression force — with the 64.00 kN concrete limit drawn as a
hard line the reader can push a force slider across.

---
### [G 11] p.9 — Load-influenced Area (English: "Task 1")

**Text (verbatim).** "The plate is loaded by a dead area load of s_k = 1 kN/m2.
Calculate the design value of the constant area load.
Draw the relevant load-influenced area into the floor plan for both of the
following cases, a) and b).
Then calculate the point load R and the line load g over the relevant beam and
complete the table."

(The German says "für die Situationen **a) bis d)**" and asks for **R_d** and
**g_d**. Four cases are drawn, each with its own table. See error E6.)

**Givens.** s_k = **1 kN/m2**, explicitly a **dead** area load, so only
gamma_G = 1.35 applies; no live load is given. Plate **7.5 m x 5 m** (printed;
digitises to 7.497 x 4.998, a 0.04 % drawing error — use the printed values).
Plans 1:200. Four cases a)–d), each with an axonometric, a plan, a side section,
a front elevation and a table with rows A, s_d, R, g.

**Geometry.** Origin = lower-left corner of the plan; x along the 7.5 m side,
y along the 5 m side. From the sections: **plate 0.400 m thick, beams 0.500 m
wide and 1.271 m deep.**

| case | beams | position (m) | span direction | beam length |
|---|---|---|---|---|
| a | **one** | y 2.249 … 2.749, centreline **y = 2.499** (mid-depth) | along x | 7.500 m |
| b | **two** | y 0 … 0.500 (CL 0.250) and y 4.498 … 4.998 (CL 4.748) | along x | 7.500 m each |
| c | **two** | x 0 … 0.499 (CL 0.250) and x 6.997 … 7.497 (CL 7.247) | along y | 5.000 m each |
| d | **four** (closed ring) | a 0.5 m perimeter band; inner dashed rectangle x 0.499 … 6.997, y 0.500 … 4.498 | two along x, two along y | 7.500 / 5.000 m |

The small orthographic views are what disambiguate the axonometrics: a) side
section shows one 0.5 m stub at mid-depth; b) side section is a **C**, stubs at
both ends; c) side section is one full-height block and the front elevation is a
"table with two legs"; d) side section is a closed box. The sequence a -> d is
the classic teaching progression: one beam, then two spanning the long way, then
two spanning the short way, then a two-way ring.

**Design area load.**
**s_d = 1.35 x 1.000 = 1.3500 kN/m2**; total on the plate = 1.3500 x 7.500 x
5.000 = **50.625 kN**.

**Answers.**

| case | relevant beam (and why) | A [m2] | s_d [kN/m2] | R [kN] | g [kN/m] |
|---|---|---|---|---|---|
| a | the single beam — the only support, the plate cantilevers 2.5 m each side onto it | **37.500** | 1.3500 | **50.625** | **6.7500** |
| b | either edge beam (identical by symmetry); tributary width = half the 5.0 m one-way span | **18.750** | 1.3500 | **25.3125** | **3.3750** |
| c | either edge beam; tributary width = half the 7.5 m one-way span | **18.750** | 1.3500 | **25.3125** | **5.0625** |
| d | the **long (7.5 m)** beam — the largest tributary area, so it governs | **12.500** | 1.3500 | **16.875** | **3.3750** peak / **2.2500** equivalent uniform |
| d | (the short 5 m beam, for completeness) | **6.2500** | 1.3500 | **8.4375** | **3.3750** peak / **1.6875** equivalent uniform |

Working:
- a) g = 1.3500 x 5.000 = 6.7500 kN/m; R = 6.7500 x 7.500 = 50.625 kN.
- b) g = 1.3500 x 2.500 = 3.3750 kN/m; R = 3.3750 x 7.500 = 25.3125 kN.
- c) g = 1.3500 x 3.750 = 5.0625 kN/m; R = 5.0625 x 5.000 = 25.3125 kN.
- d) 45 deg lines from the corners. Long beam: trapezoid,
  A = (7.500 + 2.500)/2 x 2.500 = 12.500 m2, R = 16.875 kN, peak ordinate
  g = s_d x 2.500 = 3.3750 kN/m over the middle 2.500 m tapering to zero at the
  corners. Short beam: triangle, A = 0.5 x 5.000 x 2.500 = 6.2500 m2,
  R = 8.4375 kN, same 3.3750 kN/m peak at midspan.

*Independent checks (all exact).*

| case | sum of tributary areas | = 37.500 m2? | sum of R | = 50.625 kN? |
|---|---|---|---|---|
| a | 37.500 | yes | 50.625 | yes |
| b | 2 x 18.750 | yes | 2 x 25.3125 | yes |
| c | 2 x 18.750 | yes | 2 x 25.3125 | yes |
| d | 2 x 12.500 + 2 x 6.2500 | yes | 2 x 16.875 + 2 x 8.4375 | yes |

Second route, R = g x L: 6.7500 x 7.500 = 50.625; 3.3750 x 7.500 = 25.3125;
5.0625 x 5.000 = 25.3125; 2.2500 x 7.500 = 16.875; 1.6875 x 5.000 = 8.4375.

**AMBIGUITY.** The table row is labelled "g" (English) / "g_d" (German) and the
sheet never says whether case d) wants the peak ordinate or the equivalent
uniform value. Quote both. Also: the axonometrics of a) and b) show stub columns
that appear in no other view and are not dimensioned — the plate's own supports
are undefined and irrelevant to the tributary question.

**Interactive view:** one control that switches between a), b), c) and d) with
the tributary area shaded live on the plan and R and g printed — the point is
that the same plate under the same load gives four different beam loads.

---

### [G 12] p.10 — Qualitative internal Force Flow (English: "Task 3")

**Text (verbatim).** "Draw a qualitative internal force flow in the axonometric
drawing of the supporting structure. Use red for tension, blue for compression
and green for the external forces."

**Givens.** Two axonometrics, a) and b). g1 … g4 (a) and g (b) are symbols only.
**No scale, no dimension line and no load magnitude appears anywhere on this
page.** The answer is a coloured sketch, not a number.

**Geometry.** Both axonometrics are **true isometrics** (axes at 30 / 150 / 90
deg, all three foreshortened by 0.8165 — verified on p.9, whose printed 7.5 m
edge is drawn 6.122 m at 1:200 and 6.122 / 0.8165 = 7.498). Dividing the drawn
lengths by 0.8165 therefore recovers exact **proportions**; the absolute scale
is not stated. Values below are in those recovered units.

**a) Two-level square skeleton.**

| element | units |
|---|---|
| top ring, outer plan square | **10.00 x 10.00** |
| ring beams | **0.50 wide**, 0.47 deep |
| second ring, same 10 x 10 outline | 1.21 below the top ring |
| corner columns | **1.00 x 1.00**, **3.00** long to the lower square, then 1.50 more to the ground |
| lower square | 10 x 10, 3.00 below the second ring |
| central column | 1.00 x 1.00 x **1.50**, between the top-ring and second-ring levels |

A closed square ring of four beams carries a full-length uniform line load on
each edge: g1 on the NW edge, g2 NE, g3 SW, g4 SE (24–26 load arrows drawn per
edge, corner to corner). Four 1.0 x 1.0 corner columns take it down.
**Unresolved from the drawing:** the fifth, central column's head sits at about
(4.2 … 4.7, 4.2 … 4.7) of the 10-unit square rather than exactly (5, 5), and two
6.00-unit horizontal members radiate from its head toward the perimeter. Its
role cannot be pinned down from the geometry alone.

**b) Four deep beams (walls) at two levels.**

| element | units |
|---|---|
| every wall | **10.00 long x 3.00 deep** |
| the two upper (loaded) walls | parallel, **~4.60 apart** |
| column stubs | **0.50 x 0.50 x 1.50** |

Two parallel deep beams at the upper level, each with a uniform g over its full
10-unit length, sitting on two more identical deep beams running perpendicular
below. Three 0.5 x 0.5 x 1.5 column stubs are visible under the lower beams (two
solid, one dashed) at roughly the quarter points; **the true column count cannot
be established** because any further columns would be hidden behind the near
wall.

**Answers (qualitative — what a correct drawing must show).**
- a) Each edge beam carries its own g corner to corner; inside each beam the
  flow resolves into a **compression arch in the top fibre (blue)** and a
  **tension tie in the bottom fibre (red)** between the two corner nodes. The
  four beam-end reactions collect at the four corners (green, downward), the
  corner columns take them in pure **compression** to the lower level, the lower
  square distributes, and the lower columns carry on to the ground in
  compression. Because the plan is square and all four loads act, the four
  corner reactions are equal. Nothing is in net tension except the beam bottom
  chords.
- b) In each loaded upper wall, g is picked up by a **compression fan/arch
  (blue)** running to the two points where that wall crosses a lower wall, with
  a **horizontal tie (red)** along the bottom edge between them. Those two
  crossing points are the green external forces on the lower walls, which repeat
  the pattern down to their columns. All columns are in compression.

**MISSING.** No load and no span is given, so nothing on this page is a number.
Say so plainly.

**Interactive view:** a toggle between a) and b), plus a slider that moves a)'s
central column off-centre so the reader watches the share between the corner
columns and the central column change.

---

### [G 13] p.11 — Additional Transferring vertical Loads (English: "Task 1")

**Text (verbatim, English).** "The plate is loaded by the same dead area load of
task 4.
a) The reaction forces of the five beams in task 4a) (subsystem A) are further
transferred to two other beams (Subsystem B). Note the different support
condition of subsystem B. Find the inner force flow by the aid of the force
diagram. Use red for tension, blue for compression and green for the reaction
forces.
b) Again the reaction forces found in a) are further transferred to subsystems C
and D. Draw the external forces in the marked position. Find an internal force
flow and draw the corresponding force diagram."

**THE MISSING NUMBER.** "task 4" and "task 4a)" do not exist — the only "Task 4"
in the booklet is the p.2 truss. The German (**Aufgabe 13**) does not
cross-reference at all; it states the load: *"Aus der Flächenlast resultieren
fünf Punktlasten A1 bis A5 = **50 kN**, welche von den Querbalken (Subsystem A)
auf die beiden Längsbalken (Subsystem B) wirken."* — **A1 … A5 = 50 kN each.**
Use that.

*Cross-check that validates it.* Running the chain from p.9's area load instead
(s_k = 1 kN/m2 -> s_d = 1.350 kN/m2) on this page's own 25 x 15 m plate: each of
the five subsystem-A beams takes a 5.000 m strip, q = 1.3500 x 5.000 =
6.7500 kN/m over 15.000 m = 101.25 kN, giving end reactions of **50.625 kN**.
The German's 50 kN is that number rounded — the two derivations agree to 1.25 %.
Everything below uses the printed **50 kN**; multiply by 1.0125 for the
area-load-derived variant.

**Givens.** A1 … A5 = 50 kN each. Plans 1:500; form diagrams for subsystems B,
C, D at 1:200; force diagram **1 cm = 50 kN** (so 1 kN = 0.200 mm, and about
400 kN is the largest force that fits across the sheet).

**Geometry — plan, 1:500.** Origin = lower-left corner of the plate; x along the
25 m direction, y along the 15 m direction.

| item | digitised [m] | nominal |
|---|---|---|
| plate | 24.991 x 14.994 | **25.00 x 15.00 m** (375.0 m2) |
| plate thickness | 0.750 | 0.75 m |

| subsystem | members | centrelines | section |
|---|---|---|---|
| **A** | 5 beams spanning y (15.0 m) | x = **2.4995, 7.4975, 12.496, 17.494, 22.493** (spacing exactly 5.00 m, outer two 2.50 m from the edges) | 0.500 wide x 2.499 deep |
| **B** | 2 beams spanning x (25.0 m) | y = **0.250** and **14.744** (one along each 25 m edge) | 0.500 wide x 2.999 deep |
| **C / D** | 2 beams spanning y (15.0 m) | x = **0.250** (labelled *subsystem D*) and **9.9965** (labelled *subsystem C*) | 0.500 wide x 2.50 deep |
| **columns** | 4 | (0.250, 4.000), (0.250, 11.000), (9.9965, 4.000), (9.9965, 11.000) | symmetric about y = 7.5, 7.0 m apart |

Vertical stack below the plate: A (2.499) -> B (2.999) -> C/D (2.50) ->
columns (~2.26); total about 10.07 m. **Caveat:** the C/D naming rests only on
where the two labels sit in the 1:500 elevation, so quote the forces **by
position** as well as by name.

**Geometry — form diagram subsystem B, 1:200.** Origin = the beam's left end.

| item | x [m] | note |
|---|---|---|
| beam | 0 … **24.991** | depth **2.999 m** |
| **support 1 — ROLLER** | **0.250** | = the C/D edge-beam centreline |
| A1 | 2.499 | 50 kN down |
| A2 | 7.498 | 50 kN down |
| **support 2 — PIN** (hatched) | **9.9965** | = the inner C/D beam centreline |
| A3 | 12.496 | 50 kN down |
| A4 | 17.494 | 50 kN down |
| A5 | 22.492 | 50 kN down |

The five load positions match the five subsystem-A centrelines to 0.002 m and
the two supports match the two C/D centrelines to 0.001 m. **This is what "note
the different support condition of subsystem B" means:** a 9.746 m span with a
**14.995 m cantilever** carrying three of the five loads.

**a) Answers.** Total 5 x 50 = **250.00 kN**, resultant at x = 12.4965 — beyond
the second support.
- Moments about the pin: 50 x [(2.499-9.9965) + (7.498-9.9965) + (12.496-9.9965)
  + (17.494-9.9965) + (22.492-9.9965)] = 50 x 12.4965 = **624.83 kNm**
- **R(roller, x = 0.250) = -624.83 / 9.7465 = -64.11 kN**, i.e. **64.11 kN
  acting DOWNWARD** — the roller end is a hold-down.
- **R(pin, x = 9.9965) = 250.00 + 64.11 = +314.11 kN** up.

*Independent check.* Sum of vertical forces: 314.11 - 64.11 - 250.00 = 0.00.
Moments about the roller: 250 x (12.4965 - 0.250) = 3061.6 kNm and
314.11 x 9.7465 = 3061.5 kNm. At 1 cm = 50 kN these plot as 6.28 cm and 1.28 cm.
(With the area-load-derived 50.625 kN loads: -64.90 kN and +318.03 kN.)

**Geometry — form diagrams subsystems C and D, 1:200.** Origin = the beam's left
end, running along the 15 m direction.

| item | y [m] | note |
|---|---|---|
| beam | 0 … **14.995** | depth **2.498 m** |
| external force 1 | **0.250** | = the B1 centreline |
| support 1 — **PIN** (hatched) | **3.9985** | column |
| support 2 — **ROLLER** | **10.9965** | column |
| external force 2 | **14.745** | = the B2 centreline |

The two diagrams are geometrically identical **except** that subsystem D carries
a **circular opening, diameter 0.999 m, centred 3.044 m from the left end and
0.914 m above the soffit**. Subsystem C's interior was checked explicitly and
has no such arc. The text never mentions the hole; it is presumably there so
that D's force flow has to detour around it.

**b) Answers.** Each of C and D receives one reaction from **each** of the two
subsystem-B beams, one at each end of its 14.995 m length. From the plan, B's
left (uplift) support lands on the **x = 0.250** beam (*subsystem D*) and B's
right support on the **x = 9.9965** beam (*subsystem C*).

Loads and supports are both symmetric about y = 7.5, so each column takes
exactly half of the two end forces, i.e. one whole end force each:

| beam | end force at y = 0.250 and 14.745 | each column (y = 4.000 and 11.000) |
|---|---|---|
| x = 0.250 (*subsystem D*) | **64.11 kN upward** (it holds B down) | **64.11 kN TENSION** — the columns are anchors |
| x = 9.9965 (*subsystem C*) | **314.11 kN downward** | **314.11 kN COMPRESSION** |

*Check on the arithmetic.* Moments about the pin at 3.9985 with equal end forces
P: R x (10.9965 - 3.9985) = P(0.250 - 3.9985) + P(14.745 - 3.9985)
= P(-3.7485 + 10.7465) = 6.998 P, and 10.9965 - 3.9985 = 6.998, so R = P exactly.

*Independent check on the whole chain.* Two B beams x 5 x 50 kN =
**500.00 kN** delivered by the plate. Columns:
2 x 314.11 - 2 x 64.11 = 628.22 - 128.22 = **500.00 kN**. Closes exactly.
(Area-load variant: 2 x 318.03 - 2 x 64.90 = 506.25 kN = 1.3500 x 375.0 m2.)

**Flag this.** Two things a reader will trip over, both of which follow
inevitably from the drawn support positions and are almost certainly the
intended lesson: subsystem B's left support is a **roller in uplift** (it must
really be an anchored bearing), and subsystem D's columns are therefore in
**tension**.

**Interactive view:** one slider that moves subsystem B's pair of supports along
the 25 m beam; the reader watches the left reaction cross zero into uplift and
subsystem D's columns flip from compression to tension.

---
### [G 14] p.12 — Additional Horizontal Forces (quantitatively) (English: "Task 1")

**Text (verbatim, English).** "Analyse the force flow within the ceiling due to
an applied horizontal force. The walls are used for bracing, therefore find the
internal force flow in the plate such as it can be redirected into the ground
through the walls. Draw the corresponding force diagram if F = 100 kN.
Then find a possible internal force flow in the walls A, B and C. First draw the
applied horizontal force for each wall into the corresponding form diagram. Use
red for tension, blue for compression and green for the external forces."

The German splits this into **a)** (force flow in the plate + force diagram) and
**b)** (force flow in the walls); the English runs them together.

**Givens.** F = 100 kN horizontal. Top view 1:200; the three wall elevations
1:100; force diagrams 1 cm = 10 kN.

**Geometry — top view, 1:200.** Origin = bottom-left corner of the ceiling slab.

| item | x [m] | y [m] |
|---|---|---|
| ceiling slab | 0 … **15.995** | 0 … **11.995** |
| core / void (dashed X inside) | 0.400 … 8.597 | 1.499 … 8.496 |
| **wall A** (runs in x) | 0 … 4.998 | 11.595 … 11.995 (centreline **11.795**) |
| **wall C** (runs in x) | 0 … 4.998 | 0 … 0.400 (centreline **0.200**) |
| **wall B** (runs in y) | 8.597 … 8.997 (centreline **8.797**) | 3.498 … 8.496 |
| **F** (points +x) | applied at the left edge, x = 0 | **y = 9.996** |

All three walls are **4.998 m** long and **0.400 m** thick. The little solid
triangles in the plan are *pointers* to the walls, not reaction-direction
symbols — each one sits perpendicular to and points at its wall.

**Answers — a) the plate.** A wall braces only in its own plane, so walls A and
C take force along x and wall B along y. Three equations:

- Sum Fx: A + C = 100 kN
- Sum Fy: **B = 0** (F has no y component and B is the only y support)
- Sum M about the slab origin: 11.795 A + 0.200 C = 100 x 9.996 = 999.6 kNm

Solving: 11.795 A + 0.200 (100 - A) = 999.6 -> 11.595 A = 979.6 ->

| wall | force [kN] | direction |
|---|---|---|
| **A** | **84.48** | along the wall, opposing F |
| **C** | **15.52** | along the wall, opposing F |
| **B** | **0** | not activated by this load case |

*Independent check.* A + C = 100.00 kN. Moments re-substituted:
11.795 x 84.48 + 0.200 x 15.52 = 996.46 + 3.10 = 999.56 vs 999.60 kNm.
If instead the wall lines are idealised to the slab edges (y = 12.0 and y = 0,
F at y = 10.0) the split becomes exactly **A = 83.33 kN, C = 16.67 kN** — quote
both, the difference is drawing precision, not physics.

**Wall B carries nothing.** That is a real result, not an omission, and it is
worth making the punch line of the view: a wall perpendicular to the load does
not brace it. Say so explicitly, because the task text asks for a force flow in
wall B and the honest answer is "zero".

**Geometry — wall elevations, 1:100.** Origin = bottom-left corner of each
wall panel. All three panels: **4.998 m long x 2.999 m high**, of which the top
**0.400 m** is the ceiling slab, so the clear wall height (and the lever arm of
the applied force) is **2.599 m**. Supports in every elevation: pin at
x = 0.200, roller at x = 4.798.

- **Wall A** is drawn as a braced frame: a diagonal from (0.200, 0) to
  (4.470, 2.599) — length 4.999 m, **31.30 deg** — plus a vertical member
  0.400 m wide (x = 4.598 … 4.998) running the full 2.599 m.
- **Wall B** is drawn with an arch springing from (0.400, 0) and (4.598, 0) to
  an apex at (2.499, 2.499) — span 4.198 m, rise 2.499 m. It is a true
  **parabola** (quarter-point rise measures 1.874 m against the parabolic
  1.874 m, exact to 0.1 mm on paper).
- **Wall C** is a solid panel with a circular opening of diameter
  **1.5995 m**, centred at **(2.499, 1.400)** m from the panel's bottom-left
  corner — exactly mid-length, 1.400 m above the base; it occupies
  x 1.700 … 3.299 and y 0.600 … 2.199.

**Answers — b) the walls.**
*Wall A*, 84.48 kN entering at the top:
- diagonal: N = 84.48 / cos 31.30 deg = **98.90 kN**
- vertical post: N = 84.48 x tan 31.30 deg = **51.34 kN** (opposite sign to the
  diagonal)
- support couple: +-51.34 kN vertical, plus 84.48 kN horizontal at the pin.
*Check:* overturning 84.48 x 2.599 = 219.6 kNm over the 4.398 m between the
diagonal foot and the post foot gives 49.9 kN — the 3 % gap against 51.34 kN is
because the drawn diagonal head (x = 4.470) and the post (x = 4.598) do not
quite meet. Use 51.3 kN.
Sense: with F pushing the slab in +x the diagonal is a **tie** and the post a
**strut**; reverse F and the two swap.

*Wall C*, 15.52 kN entering at the top: overturning 15.52 x 2.599 = 40.34 kNm
over the 4.598 m base -> vertical couple **+-8.77 kN**; horizontal 15.52 kN at
the base. The force path has to detour round the circular opening — that is the
qualitative part.

*Wall B*: **all member forces zero.**

**Interactive view:** one slider moving F up and down the left edge (y = 0 … 12).
A and C swap dominance as F crosses mid-height, and B stays stubbornly at zero
the whole way — which is the lesson.

---

### [G 15] p.13 — Additional Horizontal Forces (quantitatively) (English: "Task 3")

**Text (verbatim, English).** "Consider the force flow within the ceiling due to
an applied horizontal force. The walls are used for bracing, therefore find the
internal force flow in the plate such as it can be redirected into the ground
through the walls. Draw the corresponding force diagram if F = 100 kN.
Then find a possible internal force flow in the walls A, B and C. First draw the
applied horizontal force for each wall into the corresponding form diagram. Use
red for tension, blue for compression and green for the external forces."

(Same German a)/b) split as [G 14].)

**Givens.** F = 100 kN horizontal. Top view 1:200; wall elevations 1:100;
force diagrams **1 cm = 20 kN** (note: different from p.12).

**Geometry — top view, 1:200.** Origin = bottom-left corner of the ceiling slab.
Same slab as p.12, different wall layout.

| item | x [m] | y [m] |
|---|---|---|
| ceiling slab | 0 … **15.995** | 0 … **11.995** |
| **wall B** (runs in x) | 10.996 … 15.995 | 11.595 … 11.995 (centreline **11.795**) |
| **wall A** (runs in y) | 7.798 … 8.197 (centreline **7.998**) | 0 … 4.998 |
| **wall C** (runs in y) | 15.595 … 15.995 (centreline **15.795**) | 0 … 4.998 |
| **F** (points +x) | applied at the left edge, x = 0 | **y = 5.997** (mid-height) |

All three walls 4.998 m long, 0.400 m thick.

**Answers — a) the plate.**

- Sum Fx: **B = 100.00 kN** (wall B is the only x-bracing wall)
- Sum Fy: A + C = 0 -> A and C form a **couple**
- Sum M: F and B are a couple of 100 x (11.795 - 5.997) = **579.8 kNm**,
  balanced by A and C over their spacing 15.795 - 7.997 = **7.798 m**

-> **A = C = 579.76 / 7.798 = 74.35 kN**, equal and opposite (A pushes one way in
y, C the other).

| wall | force [kN] | direction |
|---|---|---|
| **B** | **100.00** | along the wall (x), opposing F |
| **A** | **74.35** | along the wall (y) |
| **C** | **74.35** | along the wall (y), opposite sense to A |

*Independent check.* Take moments about the slab origin:
F gives -5.997 x 100 = -599.7 kNm; B gives -11.795 x (-100) = +1179.5 kNm;
A at x = 7.998 gives 7.998 A; C at x = 15.795 gives -15.795 A.
Sum: 579.76 - 7.798 A = 0 -> A = 74.35 kN. Sum Fy: 74.35 - 74.35 = 0. Closes.
Couple route: F and B are equal, opposite and 5.798 m apart -> 579.76 kNm;
A and C are equal, opposite and 7.798 m apart -> 74.35 x 7.798 = 579.76 kNm.
Identical.

**Geometry — wall elevations, 1:100.** Origin = bottom-left corner of each
panel. All three panels **4.998 m x 2.999 m**; clear height to the slab
soffit **2.599 m**; supports pin/roller at x = 0.200 and x = 4.798.
- **Wall A**: a plain solid panel, nothing drawn inside. Pin left, roller right.
- **Wall B**: a solid panel with a rectangular door opening, **2.199 m wide
  x 1.599 m high**, sitting on the base, from x = 1.3995 to x = 3.5987 —
  centred on the wall's mid-length, leaving 1.400 m piers each side.
  Pin left, roller right.
- **Wall C**: a cross-braced panel, X-bracing over a rectangle
  **3.5676 m x 2.1714 m** placed from x = 0.6926 to 4.2602 and y = 0.3275 to
  2.4989; each diagonal is 4.176 m long at **+-31.30 deg**. Note its supports
  are **swapped** relative to walls A and B on this page and relative to every
  wall on p.12: **roller left, pin right**.

**Answers — b) the walls.**
- **Wall B**, 100.00 kN at 2.599 m: overturning 259.9 kNm over the 4.598 m
  support spacing -> vertical couple **+-56.53 kN**; the force path must arch
  over the 2.199 m door opening.
- **Wall A**, 74.35 kN at 2.599 m: overturning 193.24 kNm / 4.598 m ->
  **+-42.03 kN** vertical couple. A plain panel, so a single diagonal strut plus
  a tie is the natural answer.
- **Wall C**, 74.35 kN at 2.599 m: the X-brace takes it directly.
  Tension-only diagonal: N = 74.35 / cos 31.30 deg = **87.04 kN**; if both
  diagonals act, **+-43.52 kN** each. Chord force = 74.35 x tan 31.30 deg
  = **45.18 kN**.

**Interactive view:** one slider moving F up and down the left edge. Wall B's
force never changes (always 100 kN) while the A/C couple runs from +74 kN,
through zero when F is level with wall B (y = 11.795), to reversed — the cleanest possible
demonstration of what a bracing couple does.

---
### [G 16.1] p.14 — Buckling behaviour (English: "Task 1")

**Text (verbatim).** "Shown below are columns with different supporting
conditions and buckling behaviour. In the following table, assign to each
support condition (1 - 5) the respective buckling behaviour (A - E) and the
ratio of the critical and the actual length."

**Givens.** Five columns 1) – 5) with different end conditions, five buckled
shapes A) – E). No dimensions.

**Answers — already printed in the table on the sheet, and correct:**

| support condition | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| buckling behaviour | D | C | B | E | A |
| l_cr / l | 1 | 0.5 | 2 | 0.7 | 1 |

Reading of each case (checked against compendium 2.6, which shows exactly these
five with l_cr = l, 0.7 l, 0.5 l, l, 2 l):
1) pinned top (laterally held, free to rotate) + pinned base -> single half
   wave, l_cr = l -> shape D.
2) top laterally held and rotationally restrained + fixed base -> S-curve with
   two inflection points, l_cr = 0.5 l -> shape C.
3) free top + fixed base -> quarter wave, l_cr = 2 l -> shape B.
4) top laterally held, free to rotate + fixed base -> l_cr = 0.7 l -> shape E.
5) top free to translate but rotation restrained + fixed base -> l_cr = l ->
   shape A.

**PROBLEM.** The answer table is printed on the *task* sheet in both language
versions. There is nothing left to do.

**Interactive view:** one toggle per column that swaps between "held" and "free"
at each end and redraws both the buckled shape and l_cr live.

---

### [G 16.2] p.14 — Buckling test (English: "Task 2")

**Text (verbatim).** "We are looking at a square hollow profile out of steel
S 235. The element has a length of 5 m, a cross section of A = 2'000 mm2 and is
stressed by a compression force of N_cd = 300 kN. The support condition
corresponds to that of example 4) in task 1. Calculate whether buckling is
occurring and draw the value in the diagram."

**Givens.** L = 5 m; A = 2000 mm2; N_cd = 300 kN; S235; support case 4)
-> l_cr = 0.7 l.

**Answer — printed on the sheet, and verified here:**
- l_cr = 0.7 x 5 m = **3.500 m**
- l_cr / sqrt(A) = 3500 mm / sqrt(2000) mm = 3500 / 44.721 = **78.26** (sheet: 78)
- f_cd = 235 / 1.05 = **223.81 N/mm2**
- N_cd / (A x f_cd) = 300 000 / (2000 x 223.81) = **0.6702** (sheet: 0.67)
- Plot (78.3, 0.670) on the buckling chart. It lies **below** the square-hollow-
  profile curve (which is at roughly 0.78 at that slenderness).
  -> **no buckling failure** ("KEIN KNICKVERSAGEN").

*Independent check.* N_allow at that slenderness = 0.78 x 2000 x 223.81
= 349.1 kN > 300 kN. Margin about 16 %.

**PROBLEM.** The full worked answer, including the German conclusion "KEIN
KNICKVERSAGEN", is printed on the task sheet.

**Interactive view:** a single slider for the member length (1 … 12 m) with a
dot moving along the chosen buckling curve and the utilisation printed live.

---

### [G 17] p.15 — Stability and dimensioning (English: "Task 3")

**Text (verbatim).**
a) "Find the internal forces for the given structure with help of the force
diagram. Use red for tension, blue for compression and green for the external
forces."
b) "The truss is built out of steel S 235 with circular solid profiles. Find the
required diameter of the elements 1 and 2 (without considering buckling yet).
Round the result to whole mm."
c) "After considering the self-weight of the structure, the diameter for each
element is 85 mm. In the given case the critical length is equal to the actual
length of the elements. Use the buckling diagram to test the stability of
elements 1 and 2 and draw the values into the diagram."
d) "How could buckling be prevented?"

**Givens.** F1d = F2d = 300 kN vertical down. 1:100; force diagram
1 cm = 100 kN. Steel S235. b) circular solid sections; c) D = 85 mm,
l_cr = l.

**Geometry.** Origin = left support A (pin). B is a roller at the same level.

| node | x [m] | y [m] | note |
|---|---|---|---|
| A (pin) | 0.0000 | 0.000 | |
| C | 1.9810 | 2.499 | F1d applies here |
| D | 3.7485 | 1.000 | mid node, apex of the raised bottom chord |
| E | 5.5160 | 2.499 | F2d applies here |
| B (roller) | 7.4970 | 0.000 | |

Members (7): A–C = element **1** (3.1889 m), A–D = element **2** (3.8796 m),
C–D (2.3176 m), C–E (3.5350 m, top chord), D–E (2.3176 m), D–B (3.8796 m),
E–B (3.1889 m). 7 + 3 = 10 = 2 x 5 nodes -> determinate.
(Calibration: the sheet's own printed working quotes l_cr = 3.2 m for element 1;
the digitised length is 3.1889 m.)

**a) Answers.** A = B = **300.00 kN** up, A_x = 0.

| member | N [kN] |
|---|---|
| **1** (A–C) | **-485.50 C** |
| **2** (A–D) | **+312.14 T** |
| C–D | +124.39 T |
| C–E (top chord) | -396.46 C |
| D–E | +124.39 T |
| D–B | +312.14 T |
| E–B | -485.50 C |

*Independent check.* The sheet's own printed b)-working uses N1 = 485 kN and
N2 = 312 kN — an exact match to two significant figures, which validates both
the digitised geometry and the solver. Node A: 485.50 x (1.981/3.1889) = 301.6
horizontal in, 312.14 x (3.7485/3.8796) = 301.6 horizontal out -> balance;
vertically 485.50 x (2.499/3.1889) = 380.5 down... balanced by 312.14 x
(1.000/3.8796) = 80.5 up plus the 300 kN reaction. Closes.

**b) Answers.**
- Element 1 (compression 485.50 kN): A_req = 485 500 / 223.81 = **2169.3 mm2**;
  D1 = 2 sqrt(2169.3 / pi) = **52.55 mm -> 53 mm**.
- Element 2 (tension 312.14 kN): A_req = 312 140 / 223.81 = **1394.7 mm2**;
  D2 = 2 sqrt(1394.7 / pi) = **42.14 mm -> 43 mm**.

The sheet prints 2167 mm2 / 52.53 mm / 53 mm and 1394 mm2 / 42.13 mm / 43 mm —
identical.

**c) Answers.** D = 85 mm -> A = pi x 42.5^2 = **5674.5 mm2**;
sqrt(A) = 75.33 mm.
- Element 1: l_cr = 3.189 m (sheet: 3.2 m); l_cr / sqrt(A) = 3189 / 75.33 =
  **42.33** (sheet: 42.5). N_cd / (A f_cd) = 485 500 / (5674.5 x 223.81) =
  **0.3823** (sheet: 0.38).
  Reading the **solid-circle** curve — the lowest curve on the chart — at a
  slenderness of 42 gives about 0.30. 0.382 > 0.30 -> **BUCKLING FAILURE**
  ("KNICKVERSAGEN!").
- Element 2 is a **tension** member and cannot buckle.

**d) Answers (printed on the sheet in German).** Translation:
- use a hollow section instead of a solid one;
- use a different material (e.g. S355 or S500);
- change the geometry (shorten the element).

**PROBLEM.** b), c) and d) are all printed with their answers, in German, on the
English task sheet. Only a) is genuinely open.

**Interactive view:** one slider for the bar diameter (40 … 140 mm) with element
1's point sliding along the solid-circle buckling curve, showing that the
material-only check (b) and the stability check (c) disagree until D is about
100 mm.

---

### [G 18] p.16 — Maximum load of a structure (English: "Additional Task 3, Transferring vertical loads")

**Text (verbatim, English).** "In additional task 1, you have determined the
maximum load of a column of the system illustrated below. Find the maximum roof
load g based on the maximum load of the two columns.
a) First draw a possible internal force flow in the lower beam as well as the
corresponding force diagram. Find the maximum force that the two crossbeams can
apply on the longitudinal beam. The magnitude of the reaction forces corresponds
to the compression load found in additional task 1. Use red for tension, blue
for compression and green for support forces.
b) Then use the force diagram to find the internal force flow and the maximum
line load g acting on the two crossbeams."

**THE MISSING NUMBER.** The English opening sentence is a broken cross-reference
and, as printed, the task cannot be started. The German version
(**Aufgabe 18**) states the value directly: *"Die maximale Belastung einer Stütze
des nachfolgend abgebildeten Systems beträgt **400 kN**."* — the maximum load of
a column is **400 kN**. Use that.

**Givens.** Column capacity 400 kN (each of two columns). Both form diagrams
1:100; both force diagrams 1 cm = 100 kN.

**Geometry.** Two separate 1:100 form diagrams. Origin per diagram = bottom-left
corner of the beam elevation.

*Longitudinal beam ("Längsbalken"), upper diagram:*

| item | x [m] | note |
|---|---|---|
| beam outline | 0.000 … 15.245 | depth **2.499 m** |
| A (pin) | 0.125 | reaction arrow, up |
| C1 (load) | 5.123 | arrow down from above |
| C2 (load) | 10.122 | arrow down from above |
| B (roller) | 15.120 | reaction arrow, up |

Span A–B = **14.995 m**; C1 at **4.998 m** from A, C2 at **9.997 m** from A
— i.e. exactly the third points of a 15 m span.

*Crossbeam ("Querbalken"), lower diagram:*

| item | x [m] | note |
|---|---|---|
| beam outline | 0.000 … 9.997 | depth **2.499 m** |
| line load g | 0.000 … 9.997 | full length |
| C (single support, pin) | 4.998 | exact midspan; reaction arrow up |

**a) Answers.** With C1 and C2 at the third points of a 15.000 m span,
A = C1 x (15.000 - 4.998)/15.000 + C2 x (15.000 - 9.997)/15.000
= C x (0.6668 + 0.3335) = **C** exactly, and B = C by symmetry. So each column
load equals each crossbeam force, one for one. Setting both columns to their
400 kN limit gives **C1 = C2 = 400.0 kN**.

Internal force flow (arch-and-tie over the full 2.499 m depth):
- M at C1 = 400 x 4.998 = **1999.2 kNm**; lever arm z = 2.499 m ->
  horizontal chord force H = **800.0 kN**.
- Bottom tie: **+800.0 kN T** (full length).
- Inclined struts A -> node under C1 and B -> node under C2:
  slope 2.499 / 4.998 = 0.5000 -> N = 800.0 x sqrt(1.25) = **-894.4 kN C**.
- Top strut between C1 and C2: **-800.0 kN C**.

*Check.* Vertical component of the inclined strut = 894.4 x (2.499/5.5875)
= 400.0 kN = the reaction. Closes.

**b) Answers.** Each crossbeam is 9.997 m long, carries a uniform g over its
whole length, and is supported at one point at midspan; it is a pair of
back-to-back 4.998 m cantilevers.
C = g x 9.997 m. With C = 400 kN:

**g_d = 400 / 9.997 = 40.01 kN/m -> 40.0 kN/m.**

*If instead the English cross-reference is honoured* and the column capacity is
taken from [G 13] rather than from the German's 400 kN, the largest column load
there is 314.11 kN (or 318.03 kN on the area-load-derived variant), giving
C1 = C2 = 314.11 kN and **g_d = 31.42 kN/m** (or 31.80 kN/m). The 21 %
disagreement with the German's 400 kN is the proof that the English
cross-reference is spurious rather than merely vague.

Internal force flow in the crossbeam: hogging over the whole length, so the
**tie is on top** and the compression arch below.
- M at the support = g x 4.9985^2 / 2 = 40.0 x 12.4925 = **499.7 kNm** (hogging).
- Chord force = 499.7 / 2.499 = **200.0 kN** (top chord tension, bottom chord
  compression), decaying parabolically to zero at each free end.

*Check.* Total load on one crossbeam = 40.0 x 9.997 = 399.9 kN = C. Two
crossbeams = 799.8 kN = A + B = 800 kN. Closes.

**Interactive view:** one slider for the column capacity (100 … 800 kN) driving
the whole chain — C1/C2 and then g_d — so the reader sees the capacity of a
single column propagate up to a roof load in kN/m2.

---
## 7. EVERY ERROR AND AMBIGUITY IN THE SHEET

Ordered by how much damage each one does to a reader working alone.

**E1 — The English task numbering is corrupt (all 16 pages).** Three separate
blocks are called "Task 1", two are called "Task 2", three are called "Task 3".
The German sheet numbers the same blocks 1.1 … 18 without repetition. Every
cross-reference in the English text is therefore unresolvable. See section 0 for
the full mapping. **Fix: renumber to the German scheme.**

**E2 — p.11 [G 13]: the load magnitude was dropped in translation.** English:
"The plate is loaded by the same dead area load of task 4. a) The reaction
forces of the five beams in task 4a) (subsystem A) …". There is no "task 4a)"
with five beams anywhere on the sheet. German: "Aus der Flächenlast resultieren
fünf Punktlasten A1 bis A5 = **50 kN**". The task is unanswerable in English and
trivial once you have the 50 kN. (Running the area-load chain from p.9 instead
gives 50.625 kN per load, so the German's 50 kN is that number rounded — the two
routes agree to 1.25 %.)

**E3 — p.16 [G 18]: the load magnitude was dropped in translation.** English:
"In additional task 1, you have determined the maximum load of a column …".
German: "Die maximale Belastung einer Stütze … beträgt **400 kN**." Same
failure mode as E2 — and note that 400 kN does **not** equal any column load
derivable from [G 13] (whose columns come out at 314.11 kN and 64.11 kN), which
confirms the English cross-reference is spurious rather than merely vague: the
400 kN is a fresh given.

**E4 — p.8 [G 10.2]: the cross-reference points nowhere, and part b) does not
exist in German.** English a) says "for the relevant tension force of task 2 a)"
and b) says "the frame in task 2 b)". There is no "task 2 a)/b)" anywhere in the
booklet that supplies a force — every block called "Task 2" was checked. German
says "für die massgebende Zugkraft aus **Aufgabe 10.1**" — i.e. the Q_d = 35 kN
earthquake frame on the same page — and has **no part b) at all**. The English
b) (8 cm C12/15 slab, 10 cm width) is an orphan with no identifiable source
force.

**E5 — p.7 [G 9.1]: the loads G_d and Q_d have no numeric value.** Both frames
are labelled only "G_d" and "Q_d". Consequently [G 9.2] ("check whether the
reinforcement … can withstand the relevant tension force") has no relevant
tension force to check. Only the *capacity* side is computable. This is a real
gap in both language versions, not a translation bug.

**E6 — p.9 [G 11]: the English asks for two cases, the drawing shows four.**
English: "Draw the relevant load-influenced area into the floor plan for both of
the following cases, a) and b)." German: "Zeichnen Sie für die Situationen
**a) bis d)** …". Four cases a)–d) are drawn, each with its own table.

**E7 — answers are printed on the task sheet, six times.** Sub-parts 13 (p.4 f),
41 (p.14 table), 42 (p.14 buckling check), 44/45/46 (p.15 b, c, d) all carry
their full worked solutions — several of them in German, in the English
document. Anyone building a view must decide whether to keep them as worked
examples or blank them out.

**E8 — untranslated German on the English sheet.** p.4 f), p.14 ("KEIN
KNICKVERSAGEN"), p.15 ("KNICKVERSAGEN!", "Element 2 ist ein Zugelement und kann
daher nicht knicken.", the three bullet answers to d)).

**E9 — the page footer is wrong.** All 16 English pages read "p. N / 15";
p.16 reads "p. 16 / 15". The German reads "S. N / 16" and is correct.

**E10 — p.2 [G 2] and p.5 [G 7] a): the roller supports come out in uplift.**
[G 2] gives B = 21.43 kN downward, [G 7] a) gives B = 16.50 kN downward. A
roller as drawn cannot deliver a downward reaction. Either the bearing has to be
anchored or the load inclination is a drafting error. The result is
mathematically correct and physically impossible as drawn.

**E11 — p.3 [G 5]: one of the three loads lands on the support.** F1's line of
action passes exactly through pin support A. It contributes to the reaction and
to nothing else. Almost certainly intentional (roof-slope tributary load) but it
looks like a mistake.

**E12 — no dimension lines anywhere.** Except for the "7.5 m" and "5 m" on p.9
and the "16 mm", "8 cm", "10 cm", "5 m", "2'000 mm2", "85 mm" appearing in
prose, the sheet gives no dimensions at all. Every length has to be scaled off
the drawing. The scales are honoured to about 0.3 % (verified twice), so this
works, but it means numbers such as the 2.6657 m panel of the p.1 trusses are
not round and cannot be made round.

**E13 — a duplicated-label numbering convention that looks like an error but is
not.** On p.4 d) the bottom chord carries labels 2, 6, 9, 12 but has only three
physical bars; members 6 and 9 are one bar split where the F2 load line crosses.
The printed force diagram admits this by marking a single point "6/9".

**E14 — hidden artwork in the PDF.** `pdftotext` returns two or three copies of
every load label (e.g. "F1 = 30kN" three times on p.1) that never render. Any
automated extraction has to be checked against a real raster render. This is the
documented trap in `drawings/web/tools/sheetvec.py` and it is present here.

**E15 — p.6 [G 8.2] is described as "statically indeterminate" but is solved
graphically.** The German title is "Statisch unbestimmt gelagerter Rahmen". Both
frames have two pinned supports (four reaction components, three equations), so
the solution is not unique; the drawn reaction directions are what makes it
determinate. The reader has to be told that the arrows are part of the given
data, not part of the answer. Worse, the two drawn arrows in a) are 0.6 deg out
of symmetry (31.282 deg vs 31.889 deg), which yields two different horizontal
thrusts (24.688 vs 24.105 kN) where physics demands one.

**E16 — p.7 [G 9.1] b): the given thrust line is not in equilibrium.** Its two
foot directions (+68.24 deg and -44.53 deg), extended, concur at (2.7823,
6.2384) — outside the panel and 1.96 m away from the load's line of action,
whereas three coplanar forces must be concurrent. It also kinks at (1.5512,
3.1576) with no force drawn there. The correct three-hinged line is symmetric at
+-44.56 deg; the sheet's right-hand segment already is that line, the left-hand
one is not.

**E17 — p.6 [G 8.1] carries no scale.** Every other drawing block on the sheet
is captioned with its scale; this one is not, so the frame dimensions can only
be read as proportions.

**E18 — p.13 [G 15]: wall C's supports are swapped.** Walls A and B on p.13 and
all three walls on p.12 are drawn pin-left / roller-right; wall C on p.13 is
roller-left / pin-right. Almost certainly a mirrored block rather than intent,
but it changes which base takes the horizontal force.

**E19a — p.11 [G 13]: subsystem D carries an undocumented opening.** Its 1:200
form diagram has a circular hole, diameter 0.999 m, centred 3.044 m from the
left end and 0.914 m above the soffit. Subsystem C, otherwise the identical
drawing, has none. The task text never mentions it, yet it changes the force
flow the student is asked to draw.

**E19b — p.11 [G 13]: the C / D naming is only a label position.** Nothing in
the geometry distinguishes "subsystem C" from "subsystem D"; the names come from
where the two captions sit in the 1:500 elevation. Quote the forces by position
(x = 0.250 m -> 64.11 kN uplift; x = 9.9965 m -> 314.11 kN compression) as well
as by name.

**E19c — p.10 [G 12]: two features of the drawing cannot be resolved.** In a)
the fifth (central) column's head sits at about (4.2 … 4.7, 4.2 … 4.7) of the
10-unit square rather than at (5, 5), and two 6.00-unit members radiate from it
with no stated role. In b) the number of columns under the lower walls cannot be
counted because any further ones are hidden behind the near wall.

**E19 — p.12 [G 14]: wall B is a zero-force support.** F is exactly parallel to
walls A and C, so equilibrium in y forces wall B to zero for any position of F.
The task nevertheless asks for an internal force flow in wall B and provides a
parabolic arch in its form diagram. The correct answer is "nothing"; the arch is
there for stability, not for this load case.

---

## 8. WHAT EACH INTERACTIVE VIEW SHOULD LET THE READER CHANGE — SUMMARY

| # | task | the one control |
|---|---|---|
| 1 | [G 1.1] | tie force H (20 … 120 kN) -> the arch shape reflows |
| 2 | [G 1.2] | toggle "hide zero members" before stepping the Cremona diagram |
| 3 | [G 1.3] | toggle the diagonal pattern `/ / \ \` <-> `\ \ / /` |
| 4 | [G 2] | load inclination 0 … 90 deg; B_y changes sign at 51.18 deg |
| 5 | [G 3] | apex rise 1 … 5 m; rafter force blows up as the truss flattens |
| 6 | [G 4] | move load between F1 and F2 at constant F1+F2 = 80 kN; diagonal L1–U2 flips sign at F1 = 40 kN |
| 7 | [G 5] | load inclination 0 … 90 deg with the resultant R drawn live |
| 8 | [G 6] | internal depth d, 0.5 … 1.44 m, shared by all five variants |
| 9 | [G 7] | position of support A, 0 … 8.875 m; B goes into uplift past 4.4985 m |
| 10 | [G 8.1] | switch between the three support conditions a) / b) / c) |
| 11 | [G 8.2] | reaction inclination theta, 20 … 70 deg; the two printed cases sit at 31.6 and 43.3 deg |
| 12 | [G 9.1] | magnitude of G_d / Q_d (the sheet leaves it open — make the gap the slider) |
| 13 | [G 9.2] | bar diameter 8 … 32 mm against a tension slider |
| 14 | [G 10.1] | Q_d, 0 … 70 kN, with the earthquake force reversing direction |
| 15 | [G 10.2] | tension force vs bar diameter, and compression force against the fixed 64.00 kN C12/15 bearing limit |
| 16 | [G 11] | switch a) / b) / c) / d) with the tributary area shaded live and R, g printed |
| 17 | [G 12] | switch a) / b), plus move a)'s central column off-centre |
| 18 | [G 13] | position of subsystem B's support pair; the left reaction crosses into uplift and drags subsystem D's columns into tension |
| 19 | [G 14] | position of F along the left edge; A and C swap dominance, B stays at zero |
| 20 | [G 15] | position of F along the left edge; B stays at 100 kN, the A/C couple reverses at y = 11.795 |
| 21 | [G 16.1] | toggle each column end between held and free |
| 22 | [G 16.2] | member length 1 … 12 m, dot sliding along the buckling curve |
| 23 | [G 17] | bar diameter 40 … 140 mm; material check vs stability check disagree below ~100 mm |
| 24 | [G 18] | column capacity 100 … 800 kN driving the whole chain down to g_d (400 kN -> 40.0 kN/m) |
