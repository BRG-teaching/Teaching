# Plan: the drawing-operations database + COMPAS recreation (2026-08-14)

Goal (user): every view stored as a SERIES OF DRAWING OPERATIONS — a
consistent, minimal database carrying all geometry, color and width
information, so a user can recreate the drawing in Python with COMPAS.
No Python viewer for now; the website links to the code/data per view.

## 1. What exists and why it does not serve

- `view_N/view_N_compas.py` (53, auto-generated 2026-08-04 from the raw
  GeoGebra XML): baked applet state, applet colors, export-frame noise,
  compas_viewer-coupled, no step structure, none of our curation (palette,
  weights, pairing, captions). Reference-only; superseded for this purpose.
- The curated truth lives in `web/views/view_N.js`: compute() + element
  declarations (kind, intro/outro, color, width) + steps. The lib
  (`eqdraw.js`) knows every element's resolved style and geometry at
  runtime — which makes an EXACT export possible with zero re-porting.

## 2. Design

### Source of truth: automatic export from the running views
Instrument the lib with `window.__exportOps()`: at default parameter
state, walk `dw.elems` (the player provides steps and captions), resolve
every element's FINAL color exactly as `applyStep` does, and emit one
ops document per view. A tools script drives headless Chrome over all 53
views (same infra as make_movies/live_dump) and writes the database.
Regenerating after any view edit is one command — the database can never
drift from the site (a CI-friendly property hand-written ports lack).

### The database: one JSON document per view
`drawings/python/ops/view_N.json` — git-friendly, human-readable, and
servable by the website itself (GitHub Pages serves the repo). Schema
(all coordinates in the drawing plane, world units, 6 decimals):

```json
{
  "view": 8,
  "title": "Drawing 8 — Funicular For Vertical Forces",
  "about": "…",
  "frame": [[xmin, ymin], [xmax, ymax]],
  "palette": {"compression": "#1a1eb2", "tension": "#ce4095",
               "load": "#3f9c20", "guide": "#aaaaaa", "zero": "#b9b9bd"},
  "steps": [{"k": 1, "title": "…", "caption": "…"}, …],
  "ops": [
    {"op": "segment",  "name": "m1",  "step": 4, "p": [[x,y],[x,y]],
     "color": "#ce4095", "width": 0.29},
    {"op": "polyline", "name": "guide1", "step": 2, "p": [[…],[…],[…]],
     "color": "#aaaaaa", "dash": 0.9},
    {"op": "arrow",    "name": "F1", "step": 1, "p": [[tail],[tip]],
     "color": "#3f9c20", "width": 0.11, "head": [0.28, 0.11]},
    {"op": "polygon",  "name": "if0", "step": 18, "p": [[…]×4],
     "color": "#ce4095", "opacity": 1.0},
    {"op": "circle",   "name": "circK", "step": 3, "c": [x,y], "r": 1.0,
     "color": "#aaaaaa", "dash": 1.2},
    {"op": "point",    "name": "pt_A", "step": 1, "c": [x,y], "r": 0.65},
    {"op": "label",    "name": "lbl_A", "step": 1, "text": "A",
     "at": [x,y], "color": "#55555c", "cls": "point"},
    {"op": "image",    "name": "photo", "step": 1, "url": "assets/…png",
     "corners": [[bl],[br],[tl]], "opacity": 0.2}
  ]
}
```

Rules keeping it MINIMAL and CONSISTENT:
- ordered by construction: ops sorted by `step`, then declaration order —
  reading the list top-to-bottom IS the drawing recipe;
- `step` = when it appears; optional `until` = when the original retires
  it (trial apparatus); omitted keys take documented defaults (solid,
  opacity 1, width from the op kind's default);
- widths are the EFFECTIVE world-unit widths (LINE_SCALE and PIPE_SCALE
  already applied) — a recreator needs no knowledge of our lib;
- `strokes` groups flatten to individual `segment`/`polyline` ops;
  dashed arrows carry `dash`; every color is a resolved hex;
- excluded: ghost twins, hover/selection state, node-inspector arrows,
  hidden-by-default toggle layers (interactive machinery, not drawing);
- geometry is baked at the DEFAULT slider/drag state (the state every
  view opens with and the movies show).

### The Python side: one tiny loader, no viewer
`drawings/python/eqdraw_ops.py` (~100 lines, compas only):

```python
from eqdraw_ops import load
d = load("ops/view_8.json")
d.steps                     # [(k, title, caption), …]
d.ops                       # the raw operation list (dicts)
for op, geom, attrs in d.to_compas():   # compas.geometry objects
    …                       # Line / Polyline / Polygon / Circle / Point
                            # attrs = {color: compas Color, width, step, …}
d.at_step(5)                # ops visible at construction step 5
```

`to_compas()` maps: segment→Line, polyline→Polyline, polygon→Polygon,
circle→Circle, point→Point, arrow→Line + `attrs["arrow"]="tip"`, label →
(text, Point) annotation tuples. The user draws these with whatever they
like (compas_viewer, plotter, Rhino, svg) — the viewer side is explicitly
out of scope.

`drawings/python/README.md` documents the schema + a 10-line example.
The repo pyproject already ships compas.

### Website linking
Each view's sidebar gets a small "Recreate in Python" section:
- `ops/view_N.json` — direct link (served by the site itself);
- the GitHub folder `…/drawings/python/` (loader + README).
The gallery footer links the python folder once.

## 3. Execution order
1. lib: `__exportOps()` (element walk + style resolution, ~60 lines).
2. `tools/export_ops.py`: headless sweep → 53 JSONs (validates: every op
   has finite coords, known kind, hex color; fails loudly otherwise).
3. `drawings/python/eqdraw_ops.py` + README + regen note.
4. Spot-verify: rebuild view 8 + 24 from JSON with compas, compare
   coordinates against the JS dump (≤1e-6) and eyeball an SVG/plot.
5. index.html sidebar section + gallery footer link.
6. Movies unaffected (no visual change) — commit + push.

## 4. Decisions (user, 2026-08-14) — IMPLEMENTED same day
1. JSON + loader + generated per-view .py, with the JSON being
   COMPAS-NATIVE: written with compas.json_dump / read with
   compas.json_load (Drawing and Op are compas.data.Data subclasses in
   drawings/python/eqdraw_ops.py, styled after compas core).
2. Baked state: default state only.
3. Links: per-view sidebar section "Recreate in Python" (relative
   ../python/ops JSON — resolves on the deployed Pages tree, not on the
   local web/-rooted dev server — + GitHub recipe + package) and a
   gallery footer link.

## 5. Shipped layout
- drawings/python/eqdraw_ops.py — Drawing/Op Data classes + PALETTE.
- drawings/python/ops/view_N.json — 53 files, 12 202 ops total,
  compas-serialized; validated: json_load round-trip on all 53.
- drawings/python/recipes/view_N_draw.py — auto-generated literal COMPAS
  calls, grouped by construction step; each executes standalone and
  rebuilds exactly len(drawing.ops) operations (validated on all 53).
- web/lib eqdraw.js exportOps() + window.__exportOps (index.html) +
  web/tools/export_ops.py (headless sweep, validation, recipe writer).
- REGENERATION RULE: after editing any view, re-run
  `python tools/export_ops.py N` alongside the movie regen.
