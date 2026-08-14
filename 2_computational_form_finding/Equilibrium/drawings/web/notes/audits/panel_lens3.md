# Verification agent 3 — multi-layer representations & ghost completeness

Date: 2026-08-13. Scope: all 53 views (1–54, no 30) vs the live applets
(block.arch.ethz.ch/eq/drawing/view/N). Tools: `mode_scan.py` (XML layer scan:
every slider/boolean/`<condition showObject>`/image per applet → layers.json),
`live_dump.py` (live applet driving), `ghost_audit.py` + `dump_only.py`
(headless dump of every dw element: kind/intro/outro/when/ghost-twin/bbox at
the final step + step-1 and final screenshots → ghostB/, ghostC/).

## A) Multi-layer / mode coverage

`mode` semantics established from notes + live dumps: mode 0 = resolved final
drawing, mode 1 = step construction (= our step player; its final step = mode
0), mode 2 (views 2/3/5/6/9/13/20/41) = node walkthrough (= our node
inspector / an extra construction, see below). The big per-view findings:

- **view 9** (mode 0..2 gating 264 el.): mode 1 = parabola by tangents,
  mode 2 = parabola by secants, `overlay` checkbox superimposes. OUR PORT
  INTERLEAVES BOTH constructions (steps 12–14 = the tangent-division/envelope
  content) and the resolve step is the overlay. Covered.
- **view 13** (mode 0..2, 196 el.): mode 1 = trial-funicular construction
  (staged, steps 22–25), mode 2 = superposition check (staged one step, then
  retires exactly like the mode gate). Covered.
- **view 12**: applet mode 1 = subsystem free bodies → our "Subsystem" panel
  slider (0 complete / 1 upper / 2 lower / 3 ties). Covered.
- **view 11 — PORTED THIS PASS**: hidden checkbox `o_2` "showArrows" (79
  gated elements) = the deck load drawn as per-hanger load arrows (29 main +
  8 side, live-verified screenshots live11o2/). Added toggle "show per-hanger
  load arrows" (default off, like the applet), arrows on all three spans
  (right span mirrored — our step 10 mirrors, applet only draws the left).
- view 18/32/10 orange live-load systems, view 33 flipDiagonals, view 37
  HP Howe/Pratt, view 43 N/V/M + thrust + parabola + Bow layers, views 26/27/
  29/38 construction/trial toggles, views 46/47/48 Bow + single loads,
  view 45 presets, view 2/3 scenarios, view 4 show/hide family: all already
  exposed in our panels (verified against the XML gate lists).
- showLabels (21/22/24/26/27/29/37/38/52): the applets hide member numbers by
  default; ours draws them always (house rule) or via a 'lab' toggle — the
  layer's information is present. Not a gap.
- Deliberate, documented omissions (left as is): view 19 sCoF1/sCoF2 author
  aids (blue dotted admin polylines; noted in notes/view_19_analysis.md),
  view 44 Bow letters (off-canvas analytic texts; view 43 teaches Bow),
  view 20 'cls' cover-left (degenerate in the saved state), view 21
  tower/scaleLoads/scaleSupports/A1 leftovers.
- Images: view 1's Foto.png is degenerate in the applet (NaN anchors, never
  visible live) — correctly absent; views 11 (pic3 etching), 13, 18, 31, 32,
  34, 51, 53, 54 all ship their image/etching with the applet's default
  visibility (32 default ON verified).

## B) Ghost completeness (rule: step-1 teal preview = COMPLETE final force
diagram; outroed elements OUT; form diagram NEVER ghosted)

Full-fleet element dump found ghost gaps in 30 of 53 views. Fixed:

- **view 42** (had been "fixed" in 0d1fbae but wrongly): the commit had
  ghosted dimI/dimO/dlead/mlead — those are the FORM-side h-dimensions, so
  teal marks were painted over the form diagram (a never-ghost-the-form
  violation), while the force-side N_max leaders were missing. Now ghosts
  fCO/fCOg/fOD/fODg/fGO/fOQ2/fGOg/fOQ2g/fA/fQ/fH/dimT/dimB.
- Outro violations removed: view 18 'edgeG' (retires step 10), view 45
  'reacAf'/'reacBf' (retire step 10) — their twins were lingering teal.
- Added missing force-diagram elements (offset reactions, component chains,
  pole fans, load-line pieces/ticks, dimension leaders, when-gated variants):
  v2 (a2,a3), v3 (aR5,aR3), v5/v6 (aR1,aR4 + trial rays tr0–3), v7 (the
  offset A_V/A_H component chain), v8 (reacAf/reacBf + trial rays), v11
  (both fans + 7 component arrows; ghost comment was stale — the lib HAS
  strokes twins since 3ae1db1), v12 (vA–vD), v13 (Q-case ltQ + fanQ — the
  only case apparatus that persists at final), v15 (rTs), v19 (12 elements:
  both fans+ticks, ext2, FLH/FLV, whole mirrored R-case fan family,
  FRV/FRH), v20 (hoopf4+hoopf5 — plainly skipped — + all 16 dq/dr
  decomposition segs), v26 (load line ll0–8 + skipped fh3), v27/v29 (load
  line lv0–4 + diagonal fd0–3), v31 (pl1,pl2), v32 (was nearly empty:
  corrected load line llb0–15 + llbQ + catenary fan3), v35 (resRchk), v37
  (load line fl0–6 + offset reactions), v38 (fl0–4 + offset reactions), v40
  (rays1,rays2), v43 (polyT,polyB + thrFan when-gated), v44 (13 elements:
  P/S-case force lines, R vectors, all component chains), v46 (trial rays
  trf/trg + ofAV/ofBV), v48 (was 3 elements: both 11-ray fans + ofA/ofB),
  v50 (ray0–3 + ofA/ofB), v52 (fl0–9 + offset reactions).
- Verified-complete without changes: v1, v4, v9, v10, v14, v16, v17, v21–25,
  v28, v33, v34, v36, v39, v41, v47, v51, v53, v54. v49 legitimately has no
  ghost (pure couple, no force diagram).
- Classification method: every non-ghosted seg/arrow/darrow/strokes visible at
  the final step was bbox-tested against the ghosted force-diagram region and
  then source-verified (form-side reactions/loads/members/dimensions and
  N/V/M-diagram overlays excluded; force-side fans, ticks, offset chains,
  when-gated case variants included).

## Verification & delivery

- Re-audit of all 29+1 changed views (ghostC/summary.json): 0 genuine
  candidates left, 0 outro-ghosts. The two remaining flags are confirmed
  form-side false positives of the bbox heuristic (v13 reacBQ = form tower
  arrow; v44 frame/N-diagram elements captured by the widened bbox).
- Step-1 vs final screenshot pairs eyeballed: 42 (form-teal gone, N_max
  leaders in), 19 (both fans + mirrored case + dashed comps), 32 (full
  corrected-load-line fan), 48 (both 11-ray fans + H line), 5 (trial fan +
  offset reactions), 11 (both fans + all component chains + the new
  per-hanger arrows layer at step 2/final), 44 (all three case diagrams),
  45 (retired reacAf/reacBf teal strays gone).
- Sibling overlap noted: agent 2 ported showLabels for 21–29 (f02487e) and
  view 44's showBow + scaleLoadSymbol (270782f) — no conflict with this
  lens's edits; my "deliberate omission" note on 44's Bow is superseded by
  their port.
- Movies (+ posters) regenerated for all 30 changed views.
- Committed + pushed: 39c0b32 (view 11 o_2 layer + ghost; the arrows port
  itself had already been swept into sibling commit c70bb1b — shared
  working tree) and 8c42d1a (29-view ghost sweep, 66 files). User's Chrome
  gallery tab (localhost:8000) reloaded after the push.
