# How the applets work, and how they were translated

## 1. What the applets are

The *eQUILIBRIUM* drawings are **GeoGebra** constructions teaching **graphic
statics**: form and forces are found geometrically (funicular/thrust lines,
force polygons, reciprocal diagrams) rather than numerically. Each page embeds
one applet via GeoGebra Web 4.4, with the whole construction shipped inline as a
base64-encoded `.ggb` (a ZIP) — already unpacked here to
`drawings/view_<N>/applet_0/geogebra.xml`.

A `.ggb` contains:
- `geogebra.xml` — the construction (objects + their current evaluated state),
- `geogebra_macro.xml` — custom tools (`internalForce`, `loadToLoadLine`,
  `supportRollerHorizontal`, `supportHingeHorizontalLeft`, `segmentdivision`,
  `pointAngleDistance`),
- `geogebra_javascript.js` — small UI scripts (e.g. a "reset" button),
- embedded images.

## 2. The GeoGebra construction model

A construction is a **dependency graph**. In `geogebra.xml`, `<construction>`
lists objects in creation order (a valid topological order). Two block kinds:

- **`<element type="..." label="...">`** — an object plus its style. Free objects
  carry their data here (`<coords>`, `<value>`); *dependent* objects also carry
  their **cached evaluated state** here.
- **`<command name="...">`** — a construction step mapping input labels
  (`<input a0=.. a1=..>`) to output labels (`<output a0=..>`).

Across all 53 files the command set is bounded (~20 core commands): `Intersect`,
`Segment`, `Line`, `Vector`, `Circle`, `Point`, `Mirror`, `OrthogonalLine`,
`Midpoint`, `Translate`, `Rotate`, `Ray`, `PolyLine`, `Polygon`, `CircleArc`,
`Centroid`, `If`, `Distance`, plus the 6 custom statics macros.

### The key insight

Every object's `<element>` block stores **the coordinates GeoGebra already
computed**. For example an intersection point:

```xml
<command name="Intersect"><input a0="l" a1="p_2"/><output a0="R_1"/></command>
<element type="point" label="R_1"><coords x="-135.33" y="137.07" z="6.98"/></element>
```

So `R_1` = (x/z, y/z) ≈ (−19.38, 19.63) is right there. This means we do **not**
need to re-implement GeoGebra's kernel — not `Intersect`, not `Mirror`, not the
statics macros, not expression evaluation. We read the cached state of every
*visible* object and use the `<command>` blocks only for **connectivity**.

Cached state per type (verified against the files):

| type | what is cached | used for |
|------|----------------|----------|
| `point` | `<coords x y z>` (homogeneous) | cartesian (x/z, y/z) |
| `segment` | supporting-line eqn in `<coords>` | endpoints taken from `Segment[A,B]` inputs |
| `line` / `ray` | implicit `(a,b,c)` in `<coords>` | clip `a·x+b·y+c=0` to the drawing bbox |
| `vector` | components `<coords>` + `<startPoint>` | arrow tail→tip |
| `conic` | `<matrix A0..A5>` | circle: center `(−A4,−A5)`, `r=√(A4²+A5²−A2)`; else sampled |
| `conicpart` | circle matrix (no arc angles) | arc rebuilt from `CircleArc/Semicircle/...` inputs |
| `polygon`/`polyline` | — | vertices from command inputs |

Appearance: `<objColor r g b alpha>`, `<lineStyle thickness>`; visibility from
`<show object>` gated by `<condition showObject="...">` (booleans resolved from
their cached `<value>`).

## 3. Translation strategy (`ggb2compas.py`)

For each file: parse → for every **visible**, renderable object, read its cached
geometry (and connectivity from its command) → emit a COMPAS object. Output is a
self-contained script: GeoGebra labels become named `compas.geometry.Point`
variables, and segments/lines/vectors/polygons/circles/arcs are built from them,
then added to a `compas_viewer` `Scene`.

Cases that needed a little evaluation (still no full kernel):
- **`If[cond, A, B]`** (conditional segments, e.g. bending-moment diagrams): a
  tiny boolean evaluator over cached point coords (`x()`,`y()`, `< > ∧ ∨`) picks
  the active branch.
- **Inline `Intersect[lineA, lineB]`** as a segment endpoint: solved directly
  from the two cached line equations.
- **Point expressions** `Label ± (dx,dy)`, `(x,y)`, `Midpoint[A,B]`.
- **`Mirror[arc, line|point]`**: the source arc is rebuilt and reflected.
- Polygon **side** segments are skipped when the polygon itself is drawn
  (avoids double edges).

### Rendering choices
- compas_viewer 2.0.2 has **no Arc scene-object**, so arcs are sampled into
  `Polyline`s. Non-circular conics are likewise sampled from their matrix.
- Infinite lines/rays are clipped to the drawing's bounding box.
- Non-finite (`NaN`/∞) cached coordinates — objects undefined in the saved
  state — are skipped.

### Verification
`smoke_test.py` builds every generated scene headless (Qt offscreen, `show()`
patched out): **53/53 build with no errors**. `preview.py` renders each with
matplotlib for an independent visual check (see `contact_sheet.png`) — the
results read as correct graphic-statics diagrams (beams + moment diagrams,
funiculars/parabolas, arch thrust lines, trusses, force polygons).

Residual: 14 `loadToLoadLine`-macro segments across a few files are skipped
(noted inline in those scripts). Everything else translates cleanly.
