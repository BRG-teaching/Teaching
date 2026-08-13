# Hand-crafting the eQUILIBRIUM drawings, one view at a time

## Why the auto-converted views fail (and view_1 works)

`tools/convert.py` faithfully replays the *original applet's* step masks, but that
is not enough to teach:

1. **Meaningless captions.** "Step 1 — construction step 1 of 6" tells a student
   nothing. view_1's captions narrate the construction ("from F4, parallel to
   bar 3, length F × scale → point G").
2. **The applets' steps are too coarse.** Most elements have `show=true`
   (visible at every step), so almost the whole drawing floods in at step 1 —
   and everything flashes pink at once. view_1 introduces one idea per step.
3. **Converter noise.** The GeoGebra export frame is drawn as a black rectangle,
   texts come out raw (`A = N_2 = |12| kN`), internal-force polygons degenerate
   to zero-width slivers, and the green direction arrows land exactly on top of
   the red force segments.
4. **Everything is baked.** No dragging, no parameter sliders, no dynamic
   compression/tension colors — the coordinates are a frozen snapshot.
5. **No form ↔ force narrative.** The essential lesson — *every construction in
   the form diagram has an equivalent vector in the force diagram* — is never
   spoken and never staged as paired steps.

Conclusion: views must be **hand-written like view_1**, one at a time, with the
original applet XML as the ground truth for the construction *math* and the
original `step` conditions as a hint for the *order*.

## Canonical step sequence (user, 2026-08-05)

Every view steps through the graphic-statics process **one construction move at
a time**, in this order (skip stages a drawing doesn't have):

1. given loads
2. load line (in the force diagram)
3. trial funicular polygon
4. reactions (closing line)
5. pole / constant force
6. conditions (parallels, intersections)
7. form finding / closing the polygon
8. numbered member ↔ force steps (indices 1, 2, 3, … in BOTH diagrams)
9. internal forces

Members are indexed with numbers (1, 2, 3, …), nodes with letters (A, B, …).

## Style contract (what "view_1 style" means)

Viewer behaviour (implemented in lib/eqdraw.js — views get it for free):

- Elements are **drawn gradually** when a step is entered (grow from their
  start point, sequentially, like hand drawing). Movies disable this via
  `player.dw.animEnabled = false`.
- The element(s) of the current step are **black** (the being-drawn color;
  points get a light-grey fill) — when the step finishes they take their
  **proper color immediately**. Tension resolves **pink #ce4095**, compression
  **blue** (user decision 2026-08-05: pink replaces red for tension, black
  replaces pink for being-drawn).
- Points otherwise: **white center, black boundary**, in all cases.
- Label text is **colored like the element it belongs to** (pass
  `color: {final: (d) => …}` or a hex to `dw.label`).
- The step caption sits at the **bottom center**; a **progress bar of the
  complete drawing** runs along the bottom edge and can be scrubbed.
- The sidebar step slider scrubs; the **cam** toggle makes the camera glide to
  frame each step's new elements while playing (any pointer interaction
  cancels the glide; panning/zooming stays free).
- **Ghost preview** (toggle, on by default): FORCE-diagram elements that are
  not yet drawn appear as a thin pale blue-green preview, far behind the
  drawn lines (opt-in per element via `dw.ghostable(...)`; the form diagram
  is never ghosted).
- **Hover = yellow** on both members of a dual pair; being-drawn = black;
  tension = pink #ce4095; compression = blue.
- **Internal-force pipes on by default** (`o1: true`) with a scale that makes
  them clearly visible; dark sidebar panel (video style).

- **Live construction math.** `compute(state)` ports the GeoGebra command chain
  (`Intersect`, `Line(P, parallel)`, `Circle`, …) using `lib/vec.js`. The saved
  applet coordinates are the regression test: with default state, computed
  points must reproduce them to ~1e-2.
- **One idea per step**, ~10–14 steps: intro card → form diagram staged in 3–5
  steps → force diagram staged in 4–6 steps → direction arrows → final resolve.
- **Form ↔ force pairing — same step, both sides.** A student who sees a line
  appear on the left must see its counterpart appear on the right *in the same
  step*: the load is drawn at the node AND laid off from the pole together; a
  member is drawn together with its force segment or its dashed parallel.
  Where a force-diagram move has no new form element (closing the polygon),
  use `dw.highlight(name, [steps])` to re-flash the related form members (and
  their number labels) pink while the move is drawn. Captions name both sides
  ("left: … — right: …").
- **Colors** (PAL in eqdraw.js): members are **black while pending**; the final
  step resolves blue = compression / red = tension via `ggbAngle` +
  `isCompression` (direction of the member vs its tip-to-tail force-polygon
  segment). Loads/reactions green, current-step elements pink (automatic),
  guides grey **and always dashed**. Temporary construction lines get an
  `outro` only if they would obscure the result; otherwise accumulate.
- **Readability.** Point disks small with thin outline; **labels must never
  overlap any line, arrow, or point — near their element, not on it** (check
  every step's screenshot for collisions, including after dragging defaults
  around); member numbers (`1, 2, 3, …`) appear in *both* diagrams at matching
  steps; magnitude readouts (`N₂ = 12.0 kN`) as labels near the force diagram,
  live-updated.
- **Direction arrows beside, not on, segments**: offset perpendicular by
  ~0.005 × frame width, pushed away from the polygon centroid.
- **Interactivity.** Free points draggable (pole, node); derived points stay on
  their guide (project drags onto the line / circle / polyline). Sliders for
  the applet's numerics (`F`, scaleForceDiagram, scaleLoadSymbol,
  scaleInternalForces…) with the applet's ranges; "show internal forces",
  "show points", "return to start".
- **Never draw** the GeoGebra export frame, axes helpers, or `show=false`
  scaffolding.

## Style fidelity (learned from view_5, 2026-08-05)

Before implementing a view, DUMP the applet's objColor / thickness / dash for
every visible element and follow it:

- the **resultant is always a dashed thick GREEN vector labeled R**, with a
  fixed world-unit dash length (same pattern at any arrow length), drawn in
  BOTH diagrams IN THE SAME STEP — on the load line AND at V on its line of
  action (found where the outer trial strings extended meet at U);
- load-line force vectors are **green arrows drawn ON the line** (funicular
  views), not black segments with offset arrows;
- **trial construction is grey** (thin); chords / closing lines are **black
  dashed**; grey dashed = guides;
- **orange belongs to the applets' mode-2 node view only** — never in the step
  construction, and orange lines never carry arrowheads;
- regression-test the FULL construction chain against the baked coordinates
  (every funicular vertex), not just the load line.

## Per-view recipe

1. Read `view_N/applet_0/geogebra.xml`: dump construction order, visibility
   conditions, slider defaults/ranges (see the python snippets in this repo's
   history). Read `view_N/view_N_compas.py` for baked ground-truth coordinates
   and `view_N/page.html` for the title.
   **Check the applet's embedded images** (`view_N/applet_0/<hash>/*.png`,
   referenced by `<element type="image">` with startPoint anchors). Two cases
   (user decision 2026-08-06):
   - **Photographs of built structures** (e.g. view 18 Salginatobel): ship the
     ACTUAL photo — copy the PNG into `web/assets/` and render it with
     `dw.image` at the applet's exact anchor, extent and opacity (typically
     ~20%), behind the drawing, instant. A vector silhouette is NOT acceptable.
   - **Drawn site figures** (hatched rock, deck slab, dimension figures):
     reproduce as vectors — hachure ticks along ground/rock outlines
     (`hatchTicks` in view_2.js), decks as outlined white slabs, and bare grey
     "scale" segments as real dimension lines with end ticks and live length
     labels.
2. Identify: free points, on-path points, sliders, the load(s), the members,
   the force-polygon chain (which parallels through which points), dynamic
   color formulas, annotation arrows (`scaleOffset` pattern), texts.
3. Design the step list on paper first — each step one sentence a student can
   follow, forming the form ↔ force narrative.
4. Write `views/view_N.js` by hand (start from view_1 or view_2 as template):
   `meta` (use the applet's frame), `DEFAULTS`, `STEPS`, `compute()`, elements
   with `intro`/`color`/`when`, `update()` with all label offsets, panel,
   drag mapping.
5. Verify: serve, screenshot **every step** headless, inspect each image for
   overlaps/misplaced labels/wrong colors; drag-test extremes via param tweaks
   (move defaults, re-screenshot). Compare final step against the baked python
   dump coordinates.
6. Only then move to the next view. Keep `convert.py` output for views not yet
   hand-crafted (the header comment `// Auto-generated` marks them).

## Order & status

Hand-written so far: 1, 2, 3, 4, 5, 36. Next in numeric order: 6, 7, …
Update this table as views are done:

| view | title | status |
|------|-------|--------|
| 1 | Subsystem | hand-written ✔ (paired steps) |
| 2 | Pedestrian Bridge 1 | hand-written ✔ (paired steps) |
| 3 | Pedestrian Bridge 2 | hand-written ✔ (trial funicular / closing string / reactions) |
| 4 | Resultant of Non-concurrent Forces | hand-written ✔ (force + funicular polygon) |
| 5 | Funicular Line Through Two Points 1 | hand-written ✔ (two-point theorem, method 1) |
| 6 | Funicular Line Through Two Points 2 | hand-written ✔ (method 2: split R at M₁, orange chords) |
| 7 | Funicular Line Through Three Points 1 | hand-written ✔ (two spans, two trials, one pole; reactions + H/V components) |
| 8 | Funicular For Vertical Forces | hand-written ✔ (hidden trial staged grey → division point i; pole locus ∥ closing line; node inspector) |
| 9 | Parabola Construction | hand-written ✔ (three points A/B/C, tangents meet 2h below closing string → pole; midpoint rule quarters → eighths, funicular ∥ rays; tangent-division method with orange rulers l₁/l₂, envelope + enclosing polygon; node inspector) |
| 10 | Parabola v. Catenary | hand-written ✔ (parabola via chord-mirror tangents → pole o; rulers measure s₁…s₉ → node loads Rᵢ → catenary load line; trial pole M + trial funicular → closing/chords → divisions i₁ i₂ i₃ → pole o₁; catenary members 1…9 paired with rays, parabola kept black as comparison; node inspector on the 10 cable nodes) |
| 11 | Golden Gate Bridge | hand-written ✔ (29-hanger main cable: half-chords through the division points → pole o; towers balanced horizontally → side poles o₁/o₂ on the H-vertical via trial funicular + division i₃; A/B/C/D/H/J with H/V components, tower resultants E/F tip-to-tail, anchor components; applet's bridge line-drawing shipped as assets/golden_gate_lines.png (steps 0-1); trial-construction + side-trial toggles; node inspector on towers/anchors/sag) |
| 35 | Lufthansa Hangar V | hand-written ✔ (parametric truss: F/G from circles radius ChangeGeometryofTruss around C/E/D; F₃ INCLINED along the draggable H–D arc line; trial funicular → line of action → three-force (A = vertical roller) → C₁ closes the load line → A_V, B_V (offset lane), B_H; Cremona joints C→A→B→F→E→D; the applet's orange zero verdict "10=0, 11=0, A_V=0" ported with its |r₃| < 0.05 condition (numbers 10/11 give way; swing H and they wake); regression 7.7e-13 / 23 pts × 6 live states incl. both geometry extremes + H swung; sense colors verified vs live getColor in 2 states; 7-joint inspector) |
| 39 | Constant force bottom chord truss: construction | hand-written ✔ (view 29's form-finding twin: the designer picks ONE cable force → circle radius BC·sFD around the load-line midpoint U₁; levels cut the circle → deck forces (horizontals), cable rays (radii, all equal), web chords; the form walks from R kink by kink and closes exactly on S; circle retires at the resolved state, orange radius arm when the rays arrive (live masks); regression 9.4e-14 / default+s9+BC4+loadG0.4; 12-joint inspector) |
| 40 | Continuous beam, symmetrical | hand-written ✔ (two-span continuous beam: span resultants on a draggable-apex tent through the three supports, mirrored by symmetry; the two span poles H/V share one vertical and the piece between them IS the middle reaction B; 8 strips per span refine the tent into inscribed parabolas; M-diagram = mirror across the beam line (hogging spike over B); the applet's s6 mirrored red fan = the symmetric reading with B doubled; regression 4.8e-15 / default+s6+R1=20+R1=50; 5-node inspector on the string polygons) |
| 41 | Continuous beam, cantilever | hand-written ✔ (draggable roller B — the cantilever grows; coarse tent through draggable A″/P₁ → pole J₁ = tie H_tension; SUBSYSTEM 1 (back span, pole at mid load line) + SUBSYSTEM 2 (cantilever: closing line A″–H₁–C₁′ is ONE straight red line, A_V₂ DOWN = uplift); superposition H_int = H_t − H_c = 0 made geometric on the bottom rail (mirror across the load line); 8 strips/span → true funicular kinking at B by exactly the reaction; step-9 M-mirror across the A″ level retires at the resolved state like the applet; hidden toggles ported: show temporary items (o), parabola handles (o₂), show R (o₃); regression 1.1e-14 / 4 live states incl. all 14 strip vertices; agent-assisted decode in notes/view_41_analysis.md) |
| 53 | Expo Pavillon Lisbon, A. Siza | hand-written ✔ (canopy cable by the doubled-sag trick (E′ = mirror of the midpoint through the draggable sag) → chords = end tangents → pole O → triangle A/B/R with sORF-offset arrows; the cable = the circumcircle arc through C/F/D over the applet's reference drawing; the wall block traced over the applet's section screenshot: A′ walks in at Q₁, splits into the compression diagonal 1 (blue, to the toe) + the tension edge 2 (red), weight D + bearing C close it; R₂ drags on its polyline track and reshapes the wall; both images shipped as assets; regression 1.9e-14 / 3 live states; 3-node inspector) |
| 54 | Cathedral of Laon | hand-written ✔ (the finale: flyer A–C, buttress C–E and nave arch F–H as THREE chained three-point funiculars over ONE load line; per stage the circle trick mirrors the span midpoint through the draggable sag → end tangents → pole; each pole sits on the previous pole's vertical; stage load totals are geometric (last-tangent rays return to the line); straight pieces C–F/E–H, draggable ground point I, reactions close the polygon along the leg directions; drawn over the cathedral silhouette (assets/view_54_section.png); regression 4.9e-14 incl. all 42 thrust vertices; 4-node inspector) |
| 14 | Prestress | hand-written ✔ (the simplest prestressed system: cables 2/3 + ground tie 1 prestressed to C; auxiliary C-only triangle (the applet's hidden checkbox, staged then retired behind the toggle) fixes the cable force A; under Q < C the polygon M→N→T→S→M keeps A/B frozen and the tie sheds to C−Q; at Q ≥ C the tie goes slack (black, pipe off) and the polygon switches to the plain V; regression 8e-14 / 25 checks incl. frozen-A, slack switch, asymmetric drag; node inspector G/H/anchors on the drawn reaction arrows) |
| 17 | Masonry arch on spreading supports | hand-written ✔ (19-voussoir arch, right support drags outward; three hinges (crown extrados + haunch intrados) split it into four rigid bodies computed as live transforms; three-point method: trial funicular per span → divisions d₁/d₂ → parallels to the span chords → pole o; ground-exit walk reproduces the applet's collapse cases; "YOUR ARCH STILL STANDS / JUST COLLAPSED" live; node inspector on 22 thrust-line nodes) |
| 13 | Tower Bridge | hand-written ✔ (side-span chain through F/E/I = three-point problem ×4 load cases: dead g (visible trial → divisions i₁/i₂ → chord parallels → pole o), superposition check (mode-2 strings II/III on the chord lines), live q₁/q₂ (new lines → poles o₁/o₂, envelope), point load Q (Q-alone chord triangle, step-8 trial apparatus → pole o₃), backstay over the saddle, FDD slider separates the 4 force systems; the applet's etching shipped as the actual image (assets/view_13_etching.png, exact anchors, 40%); regression 1.5e-6 / 96 pts (full XML eval 1.8e-13 / 497); node inspector F+15 hangers+I) |
| 19 | Wooden bridge in Essing | hand-written ✔ (continuous band over 17+32.5+32.5+17 m: 20-strip main half-field, pole o₁ from support tangent + horizontal crown tangent, funicular through draggable crown C; approach field mirrored ⇒ loads laid off upward (Fₗ = −Fᵣ), pole o₂; vertical through o₁ → N₇ → trestle reaction A, anchor Fₗ with Fₗₕ = H; right half grey mirror; site = applet's 87-element vector drawing (band arcs, double-line trestles, bearings, terrain); regression 4.9e-7 / 140 pts; node inspector on abutment/pier/20 strip nodes/crown) |
| 16 | Minimum and Maximum Thrust | hand-written ✔ (masonry arch, 16 voussoirs; max line through crown intrados + springing extrados, min line through crown extrados + springing intrados; two trial funiculars (orange/cyan) → division points W₄/Z₄ → poles o₁/o₂ on the crown horizontal; H_max/H_min readouts; node inspector on thrust line 1) |
| 18 | Salginatobel Bridge | hand-written ✔ (three-hinge chords → poles o₁/o₂, 30-strip funicular through D and B, extra load Q re-poses the three-point problem via trial + crown chords → pole o; bridge photo as vector silhouette; node inspector over the arch nodes) |
| 20 | Hoop forces in a masonry arch | hand-written ✔ (dome slice: 8 courses by bisection, plan-arc weights, mid-surface chain, hoop forces H₁–H₈ telescoping on the crown-level line with ΣH = 0, offset reaction B, N′/N″ ring forces in plan + force-side decompositions; hoop signs computed live; node inspector over the course centroids) |
| 21 | Fan-harp bridge | hand-written ✔ (cable-stayed Cremona: mast + 6 stays, anchors slide fan → semifan → harp (buttons), joint-by-joint force polygon, left loads up from O / right up from the closing LF₄, anchor force B = gap O–LF₇ (appears when the mast is inclined), reaction A beside the load line; 16 numbered members, pipes, 12-node inspector) |
| 22 | Cantilevered fan bridge | hand-written ✔ (Alamillo-type balanced cantilever: deck on one bearing + 4 fan stays from a back-leaning mast (drag H in the circle); O-less Cremona joint by joint from the deck tip → poles R,S,T,U; parallels to the straight mast through the poles cut the load line extended at A₁,Z,W,V — the gaps are the required mast weights F₅…F₈; reaction A = ΣFᵢ offset beside the load line; regression ≤7.9e-14 / 30 pts × 5 live states; 9-node inspector) |
| 42 | Internal forces in a fixed frame | hand-written ✔ (parametric applet, no step slider: 13 hand-designed steps; portal frame, reactions meet at N = h·h on the centre axis, zero-moment points O/P, red/blue resultant paths, force polygon normalised to constant N_max, λ(h) peaks at 2; both h≤2/h>2 constructions + "h=∞" checkbox; node inspector A/B/O/P; regression 3.3e-14 vs live) |
| 23 | Cable-stayed bridge | hand-written ✔ (footbridge across a gorge: deck leans from the draggable left support A₆ to the fixed rock end B₃; 5 stays fan from the draggable point D₂, mast to B₁₄ + backstay to the terrain-anchored K; node loads computed from real dead+live deck loads (Q_d); Cremona joint by joint → poles Z,C₁,D₁,G₁,H₁, fan node closes at I₁; rock reactions A/B/C = members 10/11/12 offset beside them, loads+reactions one closed polygon; regression ≤7.1e-13 / 29 checks × 7 live states; 9-node inspector incl. the 7-force fan node) |
| 43 | Internal forces in a three-hinged frame – line load | hand-written ✔ (no step slider in the applet: 15 hand-designed steps; UDL split at the hinge, two trial funiculars → divisions Z₁/A₂, hinge-chord parallels → pole I₁, components A_H/A_V/B_V/B_H; N/V/M diagrams on the frame copy exactly per the applet incl. corner arcs, M-parabola pole E₅, ideal thrust line + M_x = H·y_x probe; toggles trial/three-force/parabola/thrust/Bow/switchN; node inspector A/B/I/D/C; regression 3.7e-14 vs live) |
| 44 | Internal forces in a three-hinged frame – superposition | hand-written ✔ (13 steps; the same frame under q, F, and q+F side by side with all N/V/M rows; q-rectangle pole I₁, F-triangle pole G₃/H₃ from chord parallels, superposed polygon literally = vector sums closing on C₄; thrust line, parabola poles E₅/F₅, switchN; 9-node inspector; regression 5.3e-14 vs live) |
| 24 | Suspended roof | hand-written ✔ (hall roof on a funicular cable B₁₆→B₁₇ through the fixed sag A; half-chord construction (F = 2A−B₈) → pole o; cable walked from both ends, middle piece through A; roof sheet on posts (mid compression / end tension); LEFT support forces PRESCRIBED (2074/1716 kN circles → j → ground points D, B₂), RIGHT anchors E₂/E₄ draggable → i₇ → forces C/D; reactions A-D = the outer edges of the closed diagram, offset beside them; dims strip + live α; regression ≤8.1e-13 / 36 pts × 7 live states; 12-node inspector) |
| 12 | Complex Prestress | hand-written ✔ (lens system: trial → division point i, pole line ∥ chord, prestress picks poles o₁/o₂ on opposite sides, 14 members + 6 ties all paired, PointLoad Q, dimensions P_upper/P_lower, node inspector) |
| 15 | Cable For Non-uniformly Distributed Load | hand-written ✔ (24-strip cable, R₁/R₂ trials through sag point V₃, pole parallelogram, tangents meet on R; node inspector) |
| 31 | Eiffel Tower, G. Eiffel | hand-written ✔ (6 storeys, wind loads Q₁–Q₆; trial funicular → R → O₁ on the axis → reaction directions → pole o above the load-line midpoint (f₁=f₁, l₁=l₁ dims); storey-by-storey Cremona: braces = Qᵢ/2 on the horizontal through o, windward leg tension / leeward compression; the applet's tower photograph shipped as assets/view_31_tower.jpg at the resolved step; regression 2.9e-13 / 55 pts ×3 states; 13-node inspector) |
| 32 | Airport Hangar, P. L. Nervi | hand-written ✔ (one vault, three funiculars over 16 strips: uniform load → two half-span trials → i₁/i₂ → pole o → parabola; strip-length circles correct the load line → pole o₁ → catenary hugging the built section; extra Q on any strip → pole o₂ → the arch under Q resolves blue; the applet's section drawing shipped as assets/view_32_section.jpg at α 0.75 every step; regression 9.9e-14 / 129 pts ×2 states; 18-node inspector) |
| 33 | Cantilever truss | hand-written ✔ (wall truss, roller top + pin bottom, 5 equal loads; trial funicular → R → three-force rule → closing point Z → reactions A / B_H / B_V (offset chain); Cremona in Bow's notation, one interior point 1–7 per step, tip closes the check; flipDiagonals rebuilds the whole diagram live and swaps pink/blue in diagonals+verticals; regression 2.5e-14 / 33 pts ×3 states incl. flip; 9-joint inspector) |
| 26 | Constant force gable truss | hand-written ✔ (9 equal loads on two straight rafters; rays through the load-line points ∥ the rafter members + ONE draggable vertical (point v) ⇒ equal top-chord segments = constant rafter force, with the applet's perpendicular dimension apparatus; division i → bottom chord walked as the funicular of the k→i rays, web = struts carrying exactly F + apex tie in tension drawn on the offset line; hidden checkboxes ported: funicular polygon (pole 0, 2nd load line, division k) + actual load/support forces; regression 8e-13 vs live; 16-node inspector) |
| 27 | Constant force top chord truss | hand-written ✔ (the designer CHOOSES F_topChord (slider): all chord force segments end on one vertical ⇒ constant chord compression; funicular cable below via the applet's uniform-case derivation (cyan toggle), struts carry exactly G, diagonals 5/9/13/17 zero until the point load Q (factorQ/positionQ) wakes them; grey trial-funicular toggle finds i in the Q case; regression 2.1e-14 vs live in 3 states; 12-node inspector) |
| 29 | Constant force bottom chord truss | hand-written ✔ (mirror of 27: designer-chosen DECK tension via one vertical; funicular arch above in compression, tension hangers carry exactly G, diagonals zero until Q; load line laid G₅→G₁ (right-to-left Cremona walk); applet's offset A/B caps are swapped vs its own statics — labeled physically (verified in the live Q state); trial-funicular + cyan derivation toggles; regression 2.1e-14 vs live ×2 states; 12-node inspector) |
| 36 | Single Panel Truss | hand-written ✔ (redone to standard: applet's trial-pole/division-point construction, antiresultant + offset apparatus, parallel reactions → H/V, member 1 force segment, node inspector) |
| 37 | Pratt / Howe truss | hand-written ✔ (six-panel truss, 25 members, Howe↔Pratt toggle flips diagonals AND the whole Cremona; trial funicular → R → division point i → reactions on the offset line; 14 joint steps = applet's "Highlight Nodes" with auto node-inspector; per-mode force intros; regression 3.3e-14 vs baked + live both modes) |
| 38 | Lenticular truss | hand-written ✔ (form-found lens: geometry from the force diagram — all web points on ONE constant-force vertical at midpoint levels, verticals = G/2, diagonals zero; drag P for the lens depth, factorQ/positionQ wake the diagonals; l₁=l₂ / f₁=f₁ symmetry apparatus; cyan form-finding fan toggle; regression 2.8e-14 vs live, 3 states) |
| 52 | Freeform Truss | hand-written ✔ (parabola/sine blend top chord — reshape live; constant-force tie: all tie forces = rays of ONE circle around the division point (radius = reaction + tolerance); chord forces projected onto the circle, web = chords between circle points, closure lands exactly on the far support; regression 4e-13 vs live, 5 states; 22-joint inspector) |
| 46 | Internal forces in a beam – point load | hand-written ✔ (four stacked bands tied by dotted verticals: beam, grey trial funicular → division point c, V-diagram = horizontal projections of a/c/b (applet red), pole o at distance H AT THE LEVEL OF c → horizontal closing, funicular from baseline L1–L2 with 10 sampled ordinates mirrored ×sFD·H below = M-diagram, M(x)=H·y(x); offset reaction chain b→c→a; strings 1/2 paired with rays; regression 9e-14/49 pts ×4 states; node inspector on the 3 funicular nodes) |
| 47 | Internal forces in a beam – line load | hand-written ✔ (beam l=10 with line load q on two DRAGGABLE supports with overhangs; load discretized into 10 strips → load line a…k with R th7 on it; pole o′ draggable at distance H; funicular + three-piece closing (outer strings extended to the support verticals, dashed closing between) → division point l → offset reactions; V slopes at −q with jumps A/B; M sampled at 10 stations + both supports, hogging up = tension side, M(x)=H·y(x); regression 3.3e-13/58 pts ×4 states; node inspector on the 10 strip kinks + whole beam) |
| 48 | Internal forces in a beam – superposition | hand-written ✔ (uniform q FIXED + two movable point loads snapping to stations (position sliders + drag): superposition ON the load line — the strip under a load grows to q+F; trial pole o′ left → division point l, R through the outer-string crossing; mirror pole o at distance H right AT THE LEVEL OF l → black moment funicular from the baseline closes horizontally, red M = trial ordinates ×sFD·H; V with slope −q and drops F₁/F₂; regression 1.2e-14/69 pts ×4 states; node inspector on the 10 moment-funicular kinks + whole beam) |
| 49 | Moment from force pair | hand-written ✔ (couple F₀/Fᵤ at arm d, clockwise "+" arc; movable reference line J (drag + the applet's do=0 / do=du / du=0 / du=−1 buttons) splits M into F₀·d₀ + Fᵤ·dᵤ — always F·d, minus sign below the pair; dimension columns with cross ticks; regression 5.3e-15/15 pts ×4 states; no node inspector — pure couple, no equilibrium nodes (documented)) |
| 50 | Internal forces in a beam with cantilever – point load | hand-written ✔ (pin + draggable roller, beam runs past it; F₁/F₂ on rails, F₃ = the tip; trial funicular out to the tip and BACK to the roller vertical → division I₁ → offset reactions A/B; V = running sum with the applet's signed If for A / upper intersection for B, grey vertical hatch; V re-read as a green cascade +A −F₁ −F₂ +B −F₃ = 0 at five draggable x's; levels stacked into a SECOND load line, pole O″ ON the baseline at distance H (red), its funicular from T₂ closes at the free tip = M-diagram, M = y·H per text8; regression 5.5e-14/48 pts ×9 states, tip closure ≤8e-15; node inspector: 5 trial kinks + whole beam) |
| 45 | Free-form thrust lines | hand-written ✔ (quartic-Bézier arch on 5 draggable control points, waterloo/berlin/bergisel presets; deck load on 18 strips cut at the curve division points; thrust line forced through both springings + draggable M: split at M → two three-force problems on strings through M → R′/S → pole o; R, A/B (physically labeled — the applet's force captions are swapped), components, H at the draggable B₁ level; bending measure d = H·y/T on the arch normal per strip, red bending line + blue arch; regression 3.6e-12/85 pts ×9 live states; 20-node inspector on the thrust line) |
| 25 | Tree structure | hand-written ✔ (1 → 2 → 4 → 8 branches, each refinement's fork SLIDING on the previous branch axis (grey stubs remember the abandoned pieces); the roof = the tie chain 16–22; nested poles Z₁ → B₂/C₂ → A₂/D₂/E₂/G₂ with every level's forces persisting; per-step member renumbering via the applet's ~80 text conditions; roof-parallel "storey" default + set-parallel button; loads relabel R/8 → F₁…F₈ at the resolve step; 22 internal-force pipes; regression 1.1e-14/38 pts ×6 live states; 16-node inspector) |
| 28 | PAT Center, R. Rogers | hand-written ✔ (cable-stayed roof: A-frame with feet 2.14 apart, junctions D₂/D₃ on draggable vertical rails, stays/struts/compression deck/foundations 20-21; trial funicular → action line → two-bar SUBSTITUTE system with the horizontal tie → division K₁ → SIGNED reactions (F₁ → 300 kN flips B into a tie-down, arrows + colors follow); final diagram = one chain of parallels from the draggable anchor 'a', closure ∥ stay 1 < 5e-14; per-member tension/compression sense = the internalForce macro angle, red slack-cable warning ported; stale applet texts F₄=160/F₅=160/F₆=80 corrected to the geometric 200/200/100 kN; 21 pipes; regression 4.8e-14/40 pts ×4 live states; 13-node inspector) |
| 34 | Supersam | hand-written ✔ (Warsaw cable-truss roof: every load carried twice — two compression arches (wall–column–wall) + one full-span tension cable with EQUAL AND OPPOSITE thrusts H_t = H_c = 8.2·factor_H; three three-point trial-funicular problems over one load line (arch poles at H left, cable pole at H right drawn offset with a twin load line); the strut I–I′ carries the full H between the arches (B_H = C_H = H_c), the walls' horizontals cancel (A_Ht opposes A_Hc), only verticals reach the bases (A_V = A_Vc + A_Vt); force-side H/V component DIMENSION arrows with dotted leaders in the offRF lanes; section sketch as assets/view_34_sketch.png (toggle, default off); regression 1.4e-14/39 pts ×5 live states; 20-node inspector incl. the column tops where the strut = H) |
| 51 | Burgo Factory, P. L. Nervi | hand-written ✔ (suspension roof over the panoramic PHOTO (dw.image, applet anchors (3,8)–(14,8), full opacity, far behind): deck = tie at draggable anchor level W, 16-panel cable D–E through draggable sag Z₃ — trial = chords through the DOUBLED sag A₄, parallels through the load-line ends → pole; back spans over back-stay cables (midpoint ½/½ apparatus → pole on the horizontal through the bottom), anchor triangles C/R₂/D and mirrored R₂/E/F (D = F = the deck-tie pull); column free body A′+Q+wCC+C′ → closing G, the tapered columns LEAN along G (drag Z₃/W: they tilt); ghost covers all four force-diagram groups (lib gained strokes ghost twins); regression 2.8e-14/67 pts ×3 live states; 24-node inspector incl. both anchors + the column head) |

## Platform (beyond the per-view work)

- `gallery.html` — the main page ("eQUILIBRIUM — step-by-step"): minimal
  hairline grid of all views; finished views show a poster of the completed
  drawing and play their construction movie on hover; cards link into the
  viewer. Movies + posters come from `tools/make_movies.py` (captures the
  draw-in animation, crops the sidebar, 660px wide) — re-render after
  finishing a view: `python web/tools/make_movies.py N`.
- Opening a view AUTOPLAYS the construction (a `?step=` deep link opts out —
  the movie renderer and screenshot checks rely on that).
- `dw.link(...names)` — dual hover groups (form member + force counterpart +
  labels): hovering either side highlights the whole group pink. Declare for
  every member/load/string/reaction pair in every view.
- `dw.instant(...names)` — background/site elements: appear immediately in
  their final color (no draw-in, no pink flash).

## Node-equilibrium inspector (the applets' mode 2)

Every hand-written view has a "Node equilibrium" panel section with a node
slider (0 = off) AND click-to-inspect: clicking a node point in the form
diagram selects it (a click = pointerdown+pointerup without significant
movement — dragging still drags; clicking the selected node deselects).
Slider and click stay in sync (`panel.syncAll()`).

Library support in `lib/eqdraw.js` (use these, don't re-implement):

- `dw.nodeSelect(nodes, onSelect)` — the click hook; `nodes` =
  `[{ at: () => [x, y] }, …]`, `onSelect(i)` gets the 0-based index.
- `dw.selectDisk(name)` — marks the selected node's disk with an ORANGE edge
  (call from refresh with the current selection, null to clear).
- `dw.nodeInspector(count, { w, headLen, headW, r, when })` +
  `dw.setNodeInspector(center, radius, title, sides)` — the drawing itself:
  THICK BLACK arrows (~1.5x the view's member width), gated by `when`
  (selection only, NEVER by construction step):
  - `nq*`: the node's FREE-BODY STAR, enlarged in an inset at the TOP of the
    form-diagram area — every force acting on the node radiates from one
    point, magnitudes proportional (longest scaled to `radius`);
  - `nf*`: the same forces tip-to-tail ON the node's closed sub-polygon in
    the force diagram (drawn 1:1 where those forces live).

Deriving `sides` (per node, from the view's own compute()): the forces at a
node are the SIDES of its closed sub-polygon in the force diagram — load-line
edge + adjacent member rays, ordered tip-to-tail so they sum to zero (verify
numerically). Supports and load points degenerate to two opposite collinear
vectors (member force + reaction/load). Views with no members (view 4) use
the funicular string crossings: node i closes the pole triangle
{edge P_i–P_i+1, ray to the pole, ray back}.
