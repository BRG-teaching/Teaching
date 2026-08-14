# Lens 2 — USER INTERFACE COMPLETENESS audit (views 1–54, 2026-08-13)

Method: for every view, enumerated applet controls from `view_N/applet_0/geogebra.xml`
(booleans with caption/default/visibility, numeric sliders incl. hidden/off-canvas,
buttons, free + path points) and `view_N/page.html` `controls` dict, then diffed
against `web/views/view_N.js` panel.slider/panel.toggle/panel.button/enableDrag.
Extractor: `scratchpad/audit.py`. Every port was checked; every fix screenshot-verified
via headless Chrome (`scratchpad/shot.py`, `scratchpad/check.py`) before commit.

## Gaps found and CLOSED (5 commits, 12 views touched)

| view | missing control (applet name) | fix | commit |
|------|------------------------------|-----|--------|
| 20 | `cls` "cover left side" (visible checkbox: white cover over the mirrored half) | toggle hides left joints/action-lines/mirror loads, ring arcs clipped to 0..π/2 | 40eda09 |
| 20 | `o_1` "showLabels" (59 texts) | `lbl` toggle gating all F/H/N′N″/B/member labels + readouts (house default ON) | 40eda09 |
| 11 | `showDimensions` (page-exposed, default ON; 1125/4200/1125 ft dimension row) | `dims` toggle gating dim line, ticks, 3 texts | c70bb1b |
| 11 | `o_2` "showArrows" (29+8+8 per-hanger load arrows) | `arr` toggle (arrows layer implemented by sibling agent in same tree; committed together) | c70bb1b |
| 44 | `showBow` (20 Bow-notation texts: A–G on all three frames + a/g on the force lines) | `bow` toggle + 20 labels at the applet's Text anchors | 270782f |
| 44 | `scaleLoadSymbol` (visible slider [0.2..1]=0.9; state existed, no UI) | `sLS` panel slider | 270782f |
| 21 | `showLabels` (page-exposed, default ON, 29 texts) | `lbl` toggle (member numbers 1–16 ×2, F₁–F₆ ×2, A/B) | f02487e |
| 22 | `showLabels` (page-exposed, default ON, 24 texts) | `lbl` toggle (F₁–F₈ ×2, numbers 1–12 ×2, A, readouts) | f02487e |
| 23 | `showLabels` (page-exposed, default ON, 24 texts) | `lbl` toggle (F ×2, numbers ×2, reactions A/B/C ×2) | f02487e |
| 24 | `showLabels` (page-exposed, default OFF, 22 texts) | `lbl` toggle (default ON = house rule; combined with `rf` gate on reaction labels) | f02487e |
| 26 | `showLabels` (page-exposed, default OFF, 46 texts) | `lbl` toggle (F₁–F₉ ×2, A/B ×2, 23 member numbers ×2) | f02487e |
| 27 | `showLabels` (visible checkbox, default OFF, 42 texts) | `lbl` toggle (G₁–G₅, LL, A/B ×2, C/B/V/D member numbers ×2) | f02487e |
| 29 | `showLabels` (visible checkbox, default OFF, 42 texts) | `lbl` toggle (same pattern as 27) | f02487e |

Batch verification: labels visible with toggle ON → OFF:
21: 55→13, 22: 66→22, 23: 65→25, 24: 82→40, 26: 88→20, 27: 69→22, 29: 63→16.
No movie regenerated — every new control preserves the default appearance
(cls/bow/arr default OFF; dims/lbl default ON matching what was already drawn).

## Controls examined and judged NOT missing (capability reachable / orphan)

- **show handles** (nearly every view): dragging is always live in the ports; several
  ports expose an explicit `sh` toggle too (16, 17, 18, 22, 42, 45, 53). OK.
- **mode/step/node sliders**: step player replaces mode 1; `node` slider + click-to-
  inspect replaces mode 2 everywhere (port ranges ≥ applet ranges, e.g. v2 node 0..4
  vs applet 0..1). OK.
- **Orphan controls that gate/drive nothing in their XML** (verified by
  condition+expression+command scan): v16 `o_3` "show force diagram no1";
  v20 `o` "show reaction forces in FD", `o_2` "show inner forces arch 1" +
  `scaleInternalForces`; v21 `o_1` "hide inner forces in FD", `A1`, `scaleSupports`
  (and `tower` only sizes the drag-constraint circles); v26 `m` "hide internal
  forces in FD"; v51 `F` [0..1000]; v19 `loadlines`. Skipped.
- **Hidden-in-applet cosmetic layout sliders** (visible=false and absent from
  page.html): v2 `scaleOffset`; v7 `HorF/HorM/whiteSpace`; v8 `n` (force count),
  `LoadHoriz`, `segmentSpace`; v15 `i` (strip count); v43/44 `distanceN/V/M`,
  `distancePoint`, `distanceSuperposition` (diagram row layout — ports use fixed
  layout); v3 `closingString`. Skipped.
- **v3 `offsetResultant`**: only draws an offset copy of R beside the load line during
  applet steps 3–5 / node 7; port draws R dashed-green directly on the load line and
  on its line of action with a draggable position (`vt`). Judged covered; noted.
- **v9 `overlay`**: shows the mode-2 rays + funicular polyline in mode 0; port's
  funicular members `mem1..8` + `ray1..8` persist at the final step (no outro), so the
  content is permanently reachable. Covered.
- **v28** `pointsSub/pointsLL1/pointsLL2/pointsFD` (4 point-group checkboxes) unified
  under the port's single `n4 show points`. Capability reachable, coarser grouping.
- **v25/28/31/33/35/39** already had label toggles; v1–8, 10, 12–18, 25, 28, 31–34,
  35–43, 45–54 audited complete (all page-dict controls + visible XML controls mapped).

## Overlaps left to siblings (noted, not fixed here)

- **v19 `sCoF1`/`sCoF2`** ("show construction objects field 1/2", 153 + 93 objects):
  the per-field funicular construction apparatus. The port draws the construction as
  steps; the full always-on layers are ghost/layer completeness → agent 3.
- **v44 `o_1` trial funicular**: port has dead state `trial` + unused `trialW` gate and
  a comment deferring to Drawing 43's apparatus; the merged `o1t` covers chords (j_2).
  Actual trial-funicular geometry layer → agent 3.
- **v11 `arr` arrows layer**: geometry authored by the sibling in the shared tree;
  I verified and committed it together with my `dims` toggle.
