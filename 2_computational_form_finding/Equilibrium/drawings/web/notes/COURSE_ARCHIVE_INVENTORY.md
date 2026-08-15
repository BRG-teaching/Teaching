# The `pdf-archive` branch, classified (2026-08-15)

163 PDFs live on branch `pdf-archive` under
`2_computational_form_finding/Equilibrium/files/`. Many carry opaque hash
filenames, so every file was opened and classified by its printed first
page (`pdftotext`), not by its name. Raw-file URL pattern:

```
https://github.com/BRG-teaching/Teaching/raw/pdf-archive/2_computational_form_finding/Equilibrium/files/<FILENAME>
```

## The three families, and how they line up

The course runs **Structural Design I (HS)** → **II (FS)** → **III
(materials)**. Lecture deck, compendium chapter and exercise sheet are
the same numbering — this is the spine of the whole archive:

| # | Lecture deck (pages) | Compendium sheets | Exercise sheet |
|---|---|---|---|
| 0 | L00 Teil 1–5 intro (62/34/63/49/28) | — | — |
| 1 | L01_Gleichgewicht (76) | 1.1 resultant of two non-parallel forces · 1.2 several non-parallel · 1.3 several parallel · 1.4 stability | **EX/UE 1 Equilibrium** (4 tasks) |
| 2 | L02_Graphic-Statics (72) + L02_Dimensionierung (61) | 2.1 form diagram–subsystem–force diagram · 2.2 analysis step by step · 2.3 analysis vs form-finding · 2.4 form-finding step by step · 2.5 dimensioning · 2.6 formulary | **EX/UE 2 Dimensioning and Graphic Statics** (2 tasks) |
| 3 | L03-Cables (164) | 3.1 point loads → uniformly distributed · 3.2 parabola · 3.3 loads · 3.4 tributary areas | **EX/UE 3 Cable structures** (3 tasks) — **the only sheet with an official worked solution** |
| 4 | L04-Arches (148) | 4.1 thrust line: trial funicular · 4.2 form-finding under specific constraints · 4.3 dividing systems | **EX/UE 4 Arch structures** (2 tasks) |
| 5 | L05-Arch-Cables (201) | 5.1 supports · 5.2 arch-cable structures · 5.3 span vs cantilever | **EX/UE 5 Arch-Cable** (2 tasks) |
| 6 | L06-Trusses (121) + colloquium (3) | 6.1 global equilibrium · 6.2 internal statical determinacy · 6.3 zero members | **EX/UE 6 Trusses** (4 tasks) |
| 7 | L07-Beams (94) + colloquium (5) | 7.1 intersecting elements · 7.2 force flow in a beam node by node · 7.3 superposition | **EX/UE 7 Beams** (3 tasks) |
| 8 | L08_Frames (85) + (6) | 8.1 redirecting forces | **EX/UE 8 Frames** (4 tasks) |
| 9 | L09_Scheiben&Platten (168) | 9.1 transferring of vertical loads | **EX/UE 9 Plates** (3 tasks) |
| 10 | (in L09/L10 material) | 10.1 horizontal forces · 10.2 buckling | **EX/UE 10 Bracing & Horizontal Forces** (5 tasks) |
| X | — | — | **EX/UE X Additional Exercises**, one per semester (15/16 p) — **both have official solutions** |

Structural Design III is materials-led and has its own pattern: lectures
`TEIII_L1_Steel` (211 p), `L2_Concrete` (240), `L3_Timber` (237),
`L4_Masonry` (265), `L5_ConstructionDetails` (378), with exercises
`te3_ex2…ex5` that ship **Task and Solution, in English and German** —
the only place in the archive where that pairing is explicit in the
filenames.

## Exercise sheets: task ↔ solution availability

Each sheet exists twice: **EX** = English, **UE** = German (same tasks).

| sheet | topic | task EN | task DE | solution |
|---|---|---|---|---|
| I-1 | Equilibrium | ✔ | ✔ | — |
| I-2 | Dimensioning and Graphic Statics | ✔ | ✔ | — |
| I-3 | Cable structures / Seiltragwerke | *missing* | ✔ | ✔ **DE** |
| I-4 | Arch structures | ✔ | ✔ | — |
| I-5 | Arch-Cable | ✔ | ✔ | — |
| I-X | Additional Exercises | ✔ | ✔ | ✔ EN + DE |
| II-6 | Trusses | ✔ | ✔ | — |
| II-7 | Beams | ✔ | ✔ | — |
| II-8 | Frames | ✔ | ✔ | — |
| II-9 | Plates | ✔ | ✔ | — |
| II-10 | Bracing & Horizontal Forces | ✔ | ✔ | — |
| II-X | Additional Exercises | ✔ | ✔ | — |
| III-1…5 | Introduction, concrete, timber, masonry, details | ✔ | ✔ | ✔ (ex2–ex5) |

**Two gaps worth knowing:** the English EX 3 sheet is absent (only the
German UE 3), and only three graphic-statics sheets have an official
solution (I-3, I-X, and II-X's task only). For every other sheet the
answer exists solely as the numbers printed in the task's own answer
tables (e.g. UE 3 Task 2 prints `N_d,max = 94 kN`).

## Reference material (not lecture, not exercise)

`Compendium_*`/`Kompendium_*` bundles (38 p, EN + DE) collect sheets
1.1–10.2; `SchwartzSkriptTE_1_2` (176 p) and `_3_4` (202 p) are the long
script; plus a glossary, the formulary (`Formelsammlung – Formulary`),
`Summary of conventions`, steel-profile tables (`sdIII_stahlprofile`) and
load tables (`sdIII_lasten und kennwerte`). Admin: syllabus, semester
overview, submission task, final review.

## What the exercises look like inside

Exactly our house language, which is why they port so well. UE 3 Task 2's
official solution draws: the loads F_d1…F_d4 as **green** arrows on the
form diagram; a **trial funicular** (dashed, labelled CS′/SL′) to find the
resultant **R**; the closing string CS/SL; the cable segments 1…5 in
**red** (tension); support reactions A and B in **green**; and beneath it
the force diagram (`Kräfteplan 1 cm ≙ 10 kN`) with the load line, the
trial pole o′, the final pole o, numbered rays 1…5 and the two green
reaction vectors — then an answer table with `N_d,max`. Colour convention
stated on the sheets: **red = tension, blue = compression, green =
external forces** (our palette, with pink standing in for red).
