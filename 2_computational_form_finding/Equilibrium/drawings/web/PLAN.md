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
| 21–35, 37–54 | … | auto-converted, to redo |
| 14 | Prestress | hand-written ✔ (the simplest prestressed system: cables 2/3 + ground tie 1 prestressed to C; auxiliary C-only triangle (the applet's hidden checkbox, staged then retired behind the toggle) fixes the cable force A; under Q < C the polygon M→N→T→S→M keeps A/B frozen and the tie sheds to C−Q; at Q ≥ C the tie goes slack (black, pipe off) and the polygon switches to the plain V; regression 8e-14 / 25 checks incl. frozen-A, slack switch, asymmetric drag; node inspector G/H/anchors on the drawn reaction arrows) |
| 17 | Masonry arch on spreading supports | hand-written ✔ (19-voussoir arch, right support drags outward; three hinges (crown extrados + haunch intrados) split it into four rigid bodies computed as live transforms; three-point method: trial funicular per span → divisions d₁/d₂ → parallels to the span chords → pole o; ground-exit walk reproduces the applet's collapse cases; "YOUR ARCH STILL STANDS / JUST COLLAPSED" live; node inspector on 22 thrust-line nodes) |
| 13 | Tower Bridge | hand-written ✔ (side-span chain through F/E/I = three-point problem ×4 load cases: dead g (visible trial → divisions i₁/i₂ → chord parallels → pole o), superposition check (mode-2 strings II/III on the chord lines), live q₁/q₂ (new lines → poles o₁/o₂, envelope), point load Q (Q-alone chord triangle, step-8 trial apparatus → pole o₃), backstay over the saddle, FDD slider separates the 4 force systems; the applet's etching shipped as the actual image (assets/view_13_etching.png, exact anchors, 40%); regression 1.5e-6 / 96 pts (full XML eval 1.8e-13 / 497); node inspector F+15 hangers+I) |
| 19 | Wooden bridge in Essing | hand-written ✔ (continuous band over 17+32.5+32.5+17 m: 20-strip main half-field, pole o₁ from support tangent + horizontal crown tangent, funicular through draggable crown C; approach field mirrored ⇒ loads laid off upward (Fₗ = −Fᵣ), pole o₂; vertical through o₁ → N₇ → trestle reaction A, anchor Fₗ with Fₗₕ = H; right half grey mirror; site = applet's 87-element vector drawing (band arcs, double-line trestles, bearings, terrain); regression 4.9e-7 / 140 pts; node inspector on abutment/pier/20 strip nodes/crown) |
| 16 | Minimum and Maximum Thrust | hand-written ✔ (masonry arch, 16 voussoirs; max line through crown intrados + springing extrados, min line through crown extrados + springing intrados; two trial funiculars (orange/cyan) → division points W₄/Z₄ → poles o₁/o₂ on the crown horizontal; H_max/H_min readouts; node inspector on thrust line 1) |
| 18 | Salginatobel Bridge | hand-written ✔ (three-hinge chords → poles o₁/o₂, 30-strip funicular through D and B, extra load Q re-poses the three-point problem via trial + crown chords → pole o; bridge photo as vector silhouette; node inspector over the arch nodes) |
| 20 | Hoop forces in a masonry arch | hand-written ✔ (dome slice: 8 courses by bisection, plan-arc weights, mid-surface chain, hoop forces H₁–H₈ telescoping on the crown-level line with ΣH = 0, offset reaction B, N′/N″ ring forces in plan + force-side decompositions; hoop signs computed live; node inspector over the course centroids) |
| 21 | Fan-harp bridge | hand-written ✔ (cable-stayed Cremona: mast + 6 stays, anchors slide fan → semifan → harp (buttons), joint-by-joint force polygon, left loads up from O / right up from the closing LF₄, anchor force B = gap O–LF₇ (appears when the mast is inclined), reaction A beside the load line; 16 numbered members, pipes, 12-node inspector) |
| 22 | Cantilevered fan bridge | hand-written ✔ (Alamillo-type balanced cantilever: deck on one bearing + 4 fan stays from a back-leaning mast (drag H in the circle); O-less Cremona joint by joint from the deck tip → poles R,S,T,U; parallels to the straight mast through the poles cut the load line extended at A₁,Z,W,V — the gaps are the required mast weights F₅…F₈; reaction A = ΣFᵢ offset beside the load line; regression ≤7.9e-14 / 30 pts × 5 live states; 9-node inspector) |
| 12 | Complex Prestress | hand-written ✔ (lens system: trial → division point i, pole line ∥ chord, prestress picks poles o₁/o₂ on opposite sides, 14 members + 6 ties all paired, PointLoad Q, dimensions P_upper/P_lower, node inspector) |
| 15 | Cable For Non-uniformly Distributed Load | hand-written ✔ (24-strip cable, R₁/R₂ trials through sag point V₃, pole parallelogram, tangents meet on R; node inspector) |
| 36 | Single Panel Truss | hand-written ✔ (redone to standard: applet's trial-pole/division-point construction, antiresultant + offset apparatus, parallel reactions → H/V, member 1 force segment, node inspector) |

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
