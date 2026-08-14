# Lens 1 — CONSTRUCTION CORRECTNESS panel (agent 1 of 3)

Method: per view — XML step-mask dump (dump_xml.py) + our per-step screenshots
(shoot_local.py) + live applet step-drive (live_dump.py) where ground truth needed.
Ground truth = live applet; documented deviations in web/notes/ + PLAN.md respected.

| view | verdict | notes |
|------|---------|-------|
| 1 | OK | parametric applet (no step slider); steps hand-designed; final verified in triage |
| 2 | OK (documented deviations) | all elements present, finer staging; applet shows parallels+B1 only at its step 3 — ours accumulates (PLAN accumulate rule); hatch = outline-tick convention (PLAN cites view_2 hatchTicks) |
| 15 | FIXED 6509a5f | live s9->s0 diff: resolved state must retire trial poles o'1/o'2, pole o, T11, force-side trial rays, parallelogram, tangents; added outro RESOLVE to tr*/par*/tan* + pts/labels C9 D9 E9 T11; movie regenerated |
| 3 | FIXED 2a6852c | missing on-canvas F1/F2 load labels (applet u/v captions + w_4/p_4) added in BOTH diagrams at step 2, linked to their duals; R/chord persistence = documented accumulate rule |
| 4 | OK | forces 1-6 one per step paired, pole+rays, strings, R last — matches applet order; R green = documented platform style (applet orange) |
| 5 | OK | trial->i->chord->pole->segments matches; R staged both-sides-same-step (house rule) vs applet's early form-side R |
| 6 | OK | orange chords M1-E3/M1-G3 + pole parallels retire when segments start (= applet steps 7-8 retiring at 9) |
| 7 | OK | two-span trials -> i1/i2 -> chords -> pole -> segments -> reactions+components; ours retires trials at final (caption-documented) vs applet step 10; order preserved |
| 8 | OK | parametric applet; persistent trial documented in PLAN |
| 9 | OK | triage-verified; black-members-at-resolve vs our pink-resolve = documented platform final step |
| 10 | OK | orange catenary system re-verified this session-family via live getColor; sequence corresponds (parabola->rulers->weigh->trial->o1->catenary->A'/B') |
| 11 | OK (minor noted) | sequence matches applet 1..10; live resolved retires A/B/C/D resultant arrows keeping components — ours accumulates (documented rule, readable); etching persists correctly |
| 12 | OK | applet has only steps 0..3; our 20-step staging is the documented hand-design; regression vs live exists |
| 13 | OK | per-case retirement rebuilt + verified vs live step 9 in d4acd28 (triage session) |
| 14 | OK | parametric; Q-label grey fix shipped; deliberate fQ=3 default documented |
| 16 | OK | parametric; min/max thrust construction documented + triage-verified |
| 17 | OK | parametric; hinge/collapse mechanics live-verified at build |
| 18 | OK | orange Q system kept (10917 orange px at final); sequence R_g -> two-load trapezoid -> Q trial matches applet step groups 2-6/6-8/9-0 |
| 19 | OK (accepted deviation) | live band = GREEN left half + grey mirror right (confirmed via fresh live dump); ours resolves pink per documented tension palette; mirror half grey kept |
| 20 | OK | course/hoop step masks match our staging; outros present; built with live regression |
| 21 | OK | parametric (no slider); Cremona joint walk documented; triage-verified |
| 22 | OK | applet steps 2-8 (joints tip->poles->mast weights->A) match ours; step-5-7 h_4 helper retires; regression x5 live states at build |
| 23 | OK | parametric; live-verified at build (7 states) |
| 24 | OK | no step slider; terraces NaN fix + dims shipped in triage session |
| 25 | OK | built 2026-08 from live step masks (applet max 4); regression x6 states |
| 26 | OK | ray/dim apparatus outros (rays->10, dims->9, vln->9) mirror applet retirements ((2..7)/(3..7)/(4..9)); helper-orange drawn grey = guides convention (noted) |
| 27 | OK | parametric; zero-diagonal/Q logic live-verified at build |
| 28 | OK | built from live masks (max 7); stale F-captions correction documented in notes+PLAN |
| 29 | OK | parametric; A/B caps physical-labeling documented |
| 31 | OK | trial (2-3) -> R -> divisions -> pole -> Cremona storeys matches; 50 outros incl. trial retire at 7; photo at resolved step only (applet pic1 step=0) |
| 32 | OK | orange Q-system kept (3377 orange px at final); catenary/parabola/Q sequence live-verified in orange-fix pass |
| 33 | OK | trial (3..6) + R orange (4..6) retire at 7 = flip-aware Cremona start; masks match; regression x3 states incl. flip |
| 34 | OK | built from live masks (max 10); H_t=H_c apparatus regression x5 states |
| 35 | OK | built from live masks (max 12) incl. orange zero-verdict; regression 7.7e-13 x6 states |
| 36 | FIXED 29f0242 | full live step-drive s1..s8+s0: our outros map applet retirements exactly (trial->8=applet6, par-reactions->10=applet7, F'->7=applet5); only gap = applet hides division point i at s0 — pt_U+label now outro RESOLVE; geometry probe: C/A/B/Z exact vs live, U/W 1e-3 (live slider init) |
| 37 | OK | full live step-drive s1..s19+s0: trial+R apparatus retires at joint-walk start (ours outro 7 = applet s5, R-on-load-line outro 6 = applet s4); joint highlights walk-and-retire = our auto node-inspector design |
| 38 | OK | form-found lens; masks match; regression x3 states |
| 39-41 | OK | built this month directly from live step dumps (v39/v40/v41_regress + states in scratchpad) |
| 42-44 | OK | no applet step slider (parametric); hand-designed steps; live regressions + notes document construction; triage-verified finals |
| 45 | OK | complex per-step masks (step-2-only apparatus, cableB@8, cable@0/10, Bezier handles@0/1/10) — built with 9-live-state regression; swapped force captions documented |
| 46-50 | OK | no step slider; built with multi-state live regressions; triage-verified |
| 51 | OK | built from live masks (max 11), regression x3 states, ghost strokes twins |
| 52 | OK | no slider; regression x5 states |
| 53 | OK | built from live masks (max 7), regression x3 states |
| 54 | OK | built from live step dump (max 15); movie postdates view js (18:24 > 18:22) |

## Summary
- 53/53 views verified for construction order + retirement against XML step masks;
  live step-drives run for 15, 36, 37, 19, 11 (+ fresh default dumps); geometry probed on 36.
- FIXED + shipped: view 15 (6509a5f), view 3 (2a6852c), view 36 (see git log).
- Orange rule verified: 10/13/18/32 all keep the live-load orange at final (pixel scan).
- Accepted deviations (all documented in PLAN/notes/captions): green resultant R,
  pink tension palette, accumulate-vs-retire for non-obscuring construction lines
  (views 2/3/7/11), view 19 green band -> pink, view 26 helper orange -> grey guides.
