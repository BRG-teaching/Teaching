# The eQUILIBRIUM drawings as data (Python / COMPAS)

Every drawing of the [step-by-step web viewer](https://brg-teaching.github.io/Teaching/2_computational_form_finding/Equilibrium/drawings/web/gallery.html)
is stored here as an ordered series of **drawing operations** — geometry,
color, stroke width and the construction step at which each element
appears — so the whole drawing can be recreated in Python with
[COMPAS](https://github.com/compas-dev/compas).

```
python/
├── eqdraw_ops.py          the two classes (Drawing, Op) + the palette
├── ops/view_N.json        the database: one compas-serialized file per view
└── recipes/view_N_draw.py the same operations as readable literal COMPAS calls
```

## Recreate a drawing

```python
import compas
import eqdraw_ops  # noqa: F401  (registers Drawing/Op for json_load)

drawing = compas.json_load("ops/view_8.json")

print(drawing.title)            # Drawing 8 — Funicular For Vertical Forces
print(len(drawing.ops))         # 110 drawing operations

for op in drawing.ops:          # ordered by construction step
    print(op.step, op.kind, op.name, op.geometry, op.color, op.width)

drawing.at_step(5)              # only what is visible at step 5
drawing.steps[5]["caption"]     # ... and what that step teaches
```

`op.geometry` is plain COMPAS geometry (`Line`, `Polyline`, `Circle`,
`Polygon`, `Point`) in the XY plane, in drawing units, baked at each
view's default parameter state. Draw it with whatever you like —
`compas_viewer`, a plotter, Rhino, SVG; no viewer is prescribed here.

The `recipes/` files carry the identical content as literal COMPAS calls
(one `add(step, kind, geometry, color, …)` per element, grouped and
commented by construction step) — read them like a drawing manual.

## Conventions

- ops are ordered by construction: reading top to bottom IS the recipe;
  `step` = when an element appears, `until` = when the original applet
  retires it (trial apparatus), absent = it stays;
- colors are the resolved final colors of the house palette
  (`eqdraw_ops.PALETTE`): navy `#1a1eb2` compression, pink `#ce4095`
  tension, green `#3f9c20` loads/reactions/resultants, grey `#aaaaaa`
  guides, pale grey `#b9b9bd` zero-force members;
- widths are effective drawing units (the web viewer's global stroke
  scaling already applied); `dash` is the dash length of dashed strokes;
  member thickness ∝ force appears as opaque `polygon` ops (the pipes);
- `arrow` ops are `Line`s from tail to tip with `head = [length, width]`;
- the web viewer's interactive machinery (node inspector, ghost preview,
  hover, draggable handles) is deliberately NOT part of the recipe.

## Regenerating

The database is exported from the running web views themselves, so it
cannot drift from the site. After editing any `web/views/view_N.js`:

```
cd ../web && python tools/export_ops.py N      # or no args for all 53
```

(needs the local no-store server on port 8741, like `make_movies.py`).
