# Plan: interactive EXERCISE views (2026-08-15)

Goal: a second wing of the site — **the course exercises, worked as
interactive drawings** — built on the same platform and the same rules as
the 54 drawing views: left form diagram, right force diagram, **drawn
together in the same step**, house palette, ghost preview, node inspector,
movies, COMPAS ops export. Every page links to the real exercise sheet
(and its official solution where one exists).

Source classification: [COURSE_ARCHIVE_INVENTORY.md](COURSE_ARCHIVE_INVENTORY.md).

## 1. Why this fits the platform exactly

The sheets already speak our language: red tension / blue compression /
green external forces, form diagram + force diagram side by side, trial
funiculars, poles, load lines, numbered members. Each task states its
**givens** (loads in kN, both scales, geometry) and most print an **answer
table** (`N_d,max = 94 kN`, thrust = 120 kN, …). That answer table is the
regression target — it replaces the live-applet dump we used for the
drawing views. A view is only finished when it reproduces the sheet's own
printed numbers.

## 2. What gets built

**One view per exercise TASK**, not per sheet — 32 tasks across EX 1–10,
plus the two Additional sheets. Namespace `ex<sheet>_<task>` (e.g.
`ex1_1`, `ex6_3`) in `web/views/`, so the existing `view_N` numbering is
never touched. Sheets I-3 and I-X have official solutions to check
against; everywhere else our view **is** the proposed solution and must
say so.

### Tier A — core graphic statics, full form↔force pairing (20 views)

These are the reason the wing exists; each is a construction the student
can step through and drag.

| view | sheet · task | what it constructs |
|---|---|---|
| ex1_1 | I-1 · 1 | resultant of two non-parallel forces (F₁ 20, F₂ 30 kN) — parallelogram in force, position in form |
| ex1_2 | I-1 · 2 | resultant of four non-parallel forces via a **trial funicular** |
| ex1_3 | I-1 · 3 | resultant of parallel forces (funicular finds the line of action) |
| ex1_4 | I-1 · 4 | single-node equilibrium — the closing force polygon |
| ex2_1 | I-2 · 1 | analysing a cable of given geometry, node by node (I, II, III), F₁ = 100 kN |
| ex2_2 | I-2 · 2 | dimensioning a suspension bridge: forces → cross-sections via the formulary |
| ex3_1 | I-3 · 1 | point load vs line load on a cable |
| ex3_2 | I-3 · 2 | **cable form-finding** (the sheet's own worked solution: trial funicular → R → global equilibrium → segments, `N_d,max = 94 kN`) |
| ex3_3 | I-3 · 3 | roof form of a suspended construction |
| ex4_1 | I-4 · 1 | arch form under a constraint — (a) governing force = 100 kN, (b) thrust = 120 kN |
| ex4_2 | I-4 · 2 | support reactions in arch structures |
| ex5_1 | I-5 · 1 | span: arch-cable structure |
| ex5_2 | I-5 · 2 | cantilever, and the comparison with the span |
| ex6_2 | II-6 · 2 | spanning truss — full Cremona, joint by joint |
| ex6_3 | II-6 · 3 | cantilevering truss |
| ex6_4 | II-6 · 4 | combined truss |
| ex7_2 | II-7 · 2 | internal force flow in a beam, quantitative (node by node) |
| ex7_3 | II-7 · 3 | beam with openings |
| ex8_1 | II-8 · 1 | frame corner: from arches to frames |
| ex8_2 | II-8 · 2 | internal force flow in frames |

### Tier B — same platform, different emphasis (12 views)

Determinacy counting, tributary areas, dimensioning proofs, buckling and
bracing are not funicular constructions; they still become views, but the
right-hand pane carries the relevant apparatus instead of a force polygon
(a counting overlay, a load-path plan, a proof panel):
`ex6_1` determinacy · `ex7_1` qualitative force flow · `ex8_3` dimensioning
· `ex8_4` axial force proof · `ex9_1` tributary area · `ex9_2` qualitative
flow · `ex9_3` transferring vertical loads · `ex10_1` bracing ·
`ex10_2/3` horizontal forces qualitative + quantitative · `ex10_4`
buckling · `ex10_5` redesign of the first floor.

### Tier C — the Additional sheets (later)

I-X and II-X hold ~30 more tasks between them, and I-X ships a full
official solution. Mine them once Tier A proves the workflow.

## 3. The pages

- **`exercises.html`** — a second gallery in the same BRG style as
  `gallery.html` (grey ground, flat white tiles, Roboto, autoplaying movie
  loops), but **grouped**: a section per sheet, headed by the sheet title
  and a link row. Each card = one task view.
- **Per-sheet header links** (the user's requirement — the pages must
  point at the real exercises): task PDF **EN** · task PDF **DE** ·
  official solution when it exists · the matching **compendium sheet** ·
  the **lecture deck**. All as raw links into the `pdf-archive` branch,
  built from the URL pattern in the inventory.
- **Per-view sidebar** gains an "Exercise" section: the task statement
  verbatim, the givens, and the same link row — so a student inside a view
  can always reach the sheet it came from.
- `gallery.html` gains a link to `exercises.html` and vice versa.

## 4. Per-view build recipe (adapted from the drawing-view recipe)

1. **Read the sheet.** Extract the task text, the givens (loads, scales,
   geometry) and the printed answers. Where the German and English sheets
   differ, English wins for captions; German numbers are the check.
2. **Derive the construction** — never trace the printed figure. Solve it
   the way the compendium chapter teaches it (that is the pedagogical
   point), then confirm the geometry matches the sheet's drawing.
3. **Python regression** in `tools/regress/ex<sheet>_<task>_regress.py`
   against the sheet's own answer table; for I-3 and I-X also against the
   official solution's drawn values. Equilibrium residuals to ~1e-10.
4. **Author the view** on the house contract: paired steps (a member on
   the left and its force segment on the right in the SAME step, drawn
   simultaneously — the grey-skeleton + `when`-gate pattern), draggable
   givens, live-value caption cards with the takeaway, ghost preview,
   node inspector, thickness ∝ force toggle.
5. **Verify**: per-step screenshots, then movie, then the ops export
   (`tools/export_ops.py`), then the parallelism check on `m_*` vs `f_*`.
6. Commit + push per view (push = deploy).

## 5. Sequence

- **Phase 0** — scaffolding: `exercises.html`, the links data file
  (generated from the archive, one entry per sheet), the sidebar
  "Exercise" section in `index.html`, cross-links. No views yet.
- **Phase 1** — sheet I-1 (four views). Smallest, purely about resultants;
  proves the whole pipeline end to end including the page.
- **Phase 2** — sheet I-3 (three views). The one with an official
  solution: the strongest possible correctness check of the approach.
- **Phase 3** — the rest of Tier A, sheet by sheet, in course order.
- **Phase 4** — Tier B, where each needs a bespoke right-hand pane.
- **Phase 5** — Tier C additional exercises.

## 6. Open questions for the user

1. **Language**: captions in English only (as the 54 views are), or
   EN/DE toggle since every sheet exists in both? A toggle is real work;
   English-only is consistent with what exists.
2. **Answers**: should a view reveal the numeric answer immediately, or
   hold it behind a "show solution" toggle so the sheet stays usable as
   homework? (Recommendation: hold it — a `solution` toggle, default off,
   with the construction steps still available.)
3. **Scope**: all 32 tasks, or Tier A only (20) as the first release?
4. **PDF hosting**: link into the `pdf-archive` branch (zero copying, but
   the files stay on a side branch), or copy the exercise PDFs into the
   Pages deployment so the site is self-contained?
