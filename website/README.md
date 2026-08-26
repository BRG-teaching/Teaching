# eQUILIBRIUM website — interactive drawings from COMPAS JSON

This folder is a small website that plays **step-by-step graphic statics drawings**
in the browser, like the original
[eQUILIBRIUM drawings site](https://brg-teaching.github.io/Teaching/2_computational_form_finding/Equilibrium/drawings/web/gallery.html):

- a **gallery page** with one card per drawing,
- an **interactive view** per drawing: the construction plays step by step with
  captions, a step slider, play/pause, keyboard arrows, mouse pan and zoom.

The important part: **you never write JavaScript to add a drawing.**
Every drawing is a single **COMPAS JSON file** that you produce with a small
Python script (or export from geometry you made in Rhino).  You drop the file
into a folder, add its id to a one-line list, and it appears in the gallery.

The site is built with [Vue 3](https://vuejs.org) + [Vuetify](https://vuetifyjs.com)
(same stack as the `brg-viewer` frontend) and renders the drawings with the
official COMPAS three.js viewer
[`@compas-dev/compas-threejs-ts`](https://github.com/compas-dev/compas_threejs_ts).
You can treat all of that as machinery: the only folder you ever touch is
`data/`.

---

## 1. One-time setup

You need **Node.js** (the JavaScript equivalent of the Python interpreter).

1. Install the LTS version from <https://nodejs.org> (or `winget install OpenJS.NodeJS.LTS`).
2. Open a terminal **in this folder** (`Teaching/website`) and run:

   ```bash
   npm install     # like "pip install -r requirements.txt" — downloads dependencies once
   npm run dev     # starts a local server and prints a URL like http://localhost:5173/
   ```

3. Open the printed URL in your browser.  You should see the gallery with
   "Drawing 1 — Subsystem"; click it and the construction plays.

   In the drawing view: **←/→** step, **space** plays/pauses, **drag** pans,
   **mouse wheel** zooms, **double-click** re-fits the drawing.
   You can deep-link a step with `#/view/1?step=4` (or `?step=last`).

Leave `npm run dev` running while you work — every file you change reloads
automatically.

---

## 2. The map (the only folders that matter to you)

```
website/
├── drawings/                 ← the Python scripts that WRITE the drawings.
│   ├── make_view_2.py        ← the minimal example of §4.  COPY THIS.
│   └── make_view_1_parametric.py  ← the draggable example of §5
├── data/                     ← everything the site reads.  ONE flat folder.
│   ├── view_1.json           ← the drawing itself (COMPAS JSON)
│   ├── view_1.png            ← its thumbnail on the gallery card
│   └── view_1.mp4            ← optional loop played over the thumbnail
├── src/                      ← the website's code.  You never need to touch it.
└── README.md                 ← this file
```

**The gallery is a mirror of `data/`.**  There is no list to maintain: the site
asks the server which `view_*.json` files are there, so

- write `data/view_3.json` → a third card appears on the next refresh,
- delete it → the card is gone,
- add `data/view_3.png` (and optionally `view_3.mp4`) → the card gets its
  thumbnail, and plays the loop like the original site.

That is the whole workflow, and §4 walks through it with the smallest possible
example.

---

## 3. What a drawing JSON is

A drawing is a COMPAS `Data` object of class `Drawing` from the
**`eqdraw_ops`** package that already lives in this repository at
`Equilibrium/drawings/python/eqdraw_ops.py`.  It holds:

| field   | meaning                                                                    |
| ------- | -------------------------------------------------------------------------- |
| `view`  | the drawing number (used in the URL: `#/view/2`)                            |
| `title` | shown in the sidebar and on the gallery card                                |
| `about` | one-paragraph description (sidebar + gallery card)                          |
| `frame` | drawing extents `[[xmin, ymin], [xmax, ymax]]` — the camera fits this box   |
| `steps` | list of `{"title", "caption"}` — one per construction step; index 0 = intro |
| `ops`   | ordered list of `Op` — the actual drawing elements                          |

Every `Op` is one element with a **`kind`**, a **COMPAS geometry**, the
**`step`** at which it appears, and its style:

| kind       | geometry                | style fields used                                    |
| ---------- | ----------------------- | ---------------------------------------------------- |
| `point`    | `Point`                 | `width` = marker radius, `color` = fill (white)      |
| `segment`  | `Line`                  | `width`, `color`                                     |
| `arrow`    | `Line` (start = tail)   | `width`, `color`, `head=[length, half-width]`, `dash`|
| `polyline` | `Polyline`              | `width` (0 = hairline), `dash`, `color`              |
| `circle`   | `Circle`                | `width` (0 = hairline), `dash`, `color`              |
| `polygon`  | `Polygon` (filled)      | `color`, `opacity`                                   |
| `label`    | `Point` (the anchor)    | `text`, `style` (`"title"`, `"point"`, `"num"`), `color` |

Everything is drawn in the **XY plane** (z = 0), in whatever units you like —
the viewer normalizes the frame automatically.

Colors follow the house palette (`eqdraw_ops.PALETTE`):

| meaning              | hex       |
| -------------------- | --------- |
| compression member   | `#1a1eb2` |
| tension member       | `#ce4095` |
| load / reaction      | `#3f9c20` |
| construction guide   | `#aaaaaa` |
| zero-force member    | `#b9b9bd` |

Three behaviors come for free, matching the original site:

- when a step arrives, its elements are **drawn in gradually** — segments grow
  from their start point, arrow tips travel with their heads, dashed guides
  extend dash by dash, circles sweep around, point markers scale up, labels
  fade in — staggered so the cascade fits the step interval;
- an element **flashes black** during the step in which it is drawn, then takes
  its final color (elements of the very last step don't flash);
- an element with `until=k` disappears again at step `k` (temporary
  construction apparatus).

Stroke-width rule of thumb (so every drawing has the same visual weight):
for a frame that is `W` units wide, use bar width `0.003·W`, point radius
`0.005·W`, arrow width `0.004·W` with head `[0.013·W, 0.005·W]`, and dash
length `0.007·W`.  Width `0` always means "hairline".

---

## 4. Step by step: add a second view

This is the recipe for a **new card in the gallery that opens a new interactive
drawing** — step slider, play, arrow keys, draw-in animation, pan and zoom.
No draggable control points: that is section 5, and it is optional.

The example is deliberately the smallest drawing there is — **a rectangle, one
edge per step** — so that nothing distracts from the loop you are learning:

> **edit the Python → run it → refresh the browser**

It already exists in the repository, so you can run it before you understand it:

- the script: `drawings/make_view_2.py`
- what it writes: `data/view_2.json` → the card "A rectangle"

### Step 1 — run it once

Leave `npm run dev` running, and in a **second terminal**:

```bash
cd C:\brg\code_python\Teaching\website\drawings
python make_view_2.py
```

It prints `wrote …\data\view_2.json - 5 ops, 5 steps`.  Refresh the
browser: the gallery has a second card, and clicking it plays the rectangle,
edge by edge.

(If Python cannot find COMPAS, use the environment you normally use for COMPAS
work — `pip install compas`.)

### Step 2 — read the whole script

There is nothing else in it.  This is the entire file, minus the comments:

```python
import pathlib, sys

VIEW = 2        # <<< THE ONLY NUMBER TO CHANGE when you copy this file <<<

HERE = pathlib.Path(__file__).resolve().parent               # .../website/drawings
DATA = HERE.parent / "data"                                  # what the website reads
EQ = HERE.parents[1] / "2_computational_form_finding" / "Equilibrium"
sys.path.insert(0, str(EQ / "drawings" / "python"))          # to import eqdraw_ops

import compas
from compas.colors import Color
from compas.geometry import Line, Point
from eqdraw_ops import Drawing, Op, PALETTE

BLUE = Color.from_hex(PALETTE["compression"])

# the geometry: four corners
A = (20.0, 20.0)
B = (80.0, 20.0)
C = (80.0, 60.0)
D = (20.0, 60.0)

# the drawing: one Op per element, `step` = when it appears
ops = [
    Op("label", Point(50, 70, 0), step=0, text="A rectangle", style="title"),
    Op("segment", Line((*A, 0), (*B, 0)), step=1, color=BLUE, width=0.25),
    Op("segment", Line((*B, 0), (*C, 0)), step=2, color=BLUE, width=0.25),
    Op("segment", Line((*C, 0), (*D, 0)), step=3, color=BLUE, width=0.25),
    Op("segment", Line((*D, 0), (*A, 0)), step=4, color=BLUE, width=0.25),
]

# one caption per step, plus the index-0 intro
steps = [
    {"title": "A rectangle", "caption": "press play, or step with the slider"},
    {"title": "Bottom", "caption": "draw the bottom edge, from A to B"},
    {"title": "Right", "caption": "draw the right edge, from B to C"},
    {"title": "Top", "caption": "draw the top edge, from C to D"},
    {"title": "Left", "caption": "close the rectangle, from D back to A"},
]

drawing = Drawing(
    view=VIEW,
    title="Drawing {} — A rectangle".format(VIEW),
    about="The smallest possible drawing: four edges, one per construction step.",
    frame=[[10, 10], [90, 78]],     # [[xmin, ymin], [xmax, ymax]] — the camera fits this
    steps=steps,
    ops=ops,
)

out = DATA / "view_{}.json".format(VIEW)
compas.json_dump(drawing, str(out), pretty=True)
```

That is the entire idea of this website: **a drawing is a list of `Op`s and a
list of captions, dumped to JSON.**  Everything the viewer does — playing,
stepping, growing each line in as it is drawn, flashing it black on its own
step, panning, zooming — it does for you, from that list.

Four things are worth pointing at:

| line | why it matters |
| ---- | -------------- |
| `step=2` | the only thing that makes the drawing animate: an element appears at its step |
| `steps = [...]` | one caption per step **plus** the index-0 intro, so the highest `step=4` needs 5 entries |
| `frame=` | the box the camera fits, `[[xmin, ymin], [xmax, ymax]]` — it must enclose your geometry |
| `z = 0` | everything is drawn in the XY plane; the third coordinate is always `0` |

### Step 3 — change something and see it

With the browser open on the drawing, edit the script and re-run it:

- move a corner: `C = (95.0, 60.0)` — and widen the frame so it still fits;
- add a fifth step with a diagonal:

  ```python
  Op("segment", Line((*A, 0), (*C, 0)), step=5, color=BLUE, width=0.25),
  ```

  …and add its caption to `steps`, or step 5 will not be reachable;
- change `PALETTE["compression"]` (blue) to `PALETTE["tension"]` (pink), or add
  `dash=0.5` to an edge to make it a construction line.

Re-run `python make_view_2.py`, refresh — that is the whole workflow.  Section 3
lists every `kind` you can use besides `segment`: `point`, `arrow`, `polyline`,
`circle`, `polygon`, `label`.

### Step 4 — your own drawing, as view 3

```bash
copy make_view_2.py make_view_3.py
```

Then **change one line** — the number near the top of the copy:

```python
VIEW = 3        # <<< THE ONLY NUMBER TO CHANGE when you copy this file <<<
```

and run it:

```bash
python make_view_3.py
```

```
wrote …\data\view_3.json - 5 ops, 5 steps
```

Refresh the browser.  The card appears, and it opens `#/view/3`.  Now edit the
geometry, the ops and the captions until it is your drawing, re-running the
script each time.

`VIEW` decides two things at once — the output filename `view_3.json` and the
`view=` field inside it.  They must agree, which is why they come from one
number.  Nothing else has to be told about the new drawing: the gallery lists
whatever `view_*.json` files are in `data/`.

**If your new card does not show up**, it is almost certainly that you copied
the script but did not change `VIEW`, so it rewrote `view_2.json` instead of
creating `view_3.json` — the give-away is `wrote …view_2.json` in the output.

**To delete a drawing**, delete its files in `data/` (`view_3.json`, and its
`.png` / `.mp4` if it has them).  The card disappears on the next refresh; there
is no list to clean up afterwards.

### Step 5 — the thumbnail on the gallery card

A new card is blank until you put a picture next to the data.  There is no
setting and no field in the JSON: the gallery looks for **two files named after
the view**, and uses whichever it finds.

```
data/view_3.png     ← the thumbnail (the still image)
data/view_3.mp4     ← optional loop, played silently over it
```

They sit in `data/` next to the drawing's JSON — one flat folder holds the
drawing, its thumbnail and its optional loop, all named after the view number.

**Making the PNG.**  Open the finished drawing at its last step,
`#/view/3?step=last`, and screenshot the white canvas area — on Windows,
`Win + Shift + S`.  Leave out the dark sidebar and the caption card in the
corner; crop to roughly **3:2** (the card is 660 × 430 and crops to fill, so
anything near that shape is safe), and save it as `data/view_3.png`.

Reproducible version, if you would rather not crop by hand — with `npm run dev`
running:

```bash
chrome --headless=new --window-size=1500,900 --hide-scrollbars \
       --virtual-time-budget=14000 \
       --screenshot=shot.png "http://127.0.0.1:5173/#/view/3?step=last"
```

then crop `shot.png` to the canvas and save it under the name above.

**The optional loop.**  Record the construction playing (any screen recorder),
save it as `view_3.mp4`, and the card plays it silently on a loop as soon as it
scrolls into view, with the PNG showing until the video is ready — exactly like
the original eQUILIBRIUM gallery.  Keep the PNG even when you add a video: it is
the poster, and the fallback if the video fails to load.

Refresh the gallery — no rebuild needed, `data/` is served as-is.

### Checklist when a drawing looks wrong

| symptom | cause |
| ------- | ----- |
| no new card in the gallery at all | no new `data/view_N.json` was written — usually because you copied a script and forgot to change `VIEW`, so it rewrote the drawing it was copied from |
| nothing appears, or the camera is far off | `frame` does not enclose your geometry — it is fitted exactly |
| the last steps are unreachable | `steps` is shorter than `max(step) + 1` (remember the index-0 intro) |
| the card opens the wrong drawing number | the number in the filename and the `view=` field inside it disagree |
| a line is invisible or hair-thin | geometry is not at `z = 0`, or `width` was left at its default `0.0` (0 = hairline) |
| the strokes look too fat or too thin | derive them from the frame width `W` with the rule of thumb in §3 |


## 5. Draggable control points (the parametric layer)

A drawing can also be **interactive like the original GeoGebra applets**:
pink control points that the reader drags, with the whole construction —
form *and* force diagram, including the compression/tension colors —
re-solving live.

The idea comes straight from GeoGebra: **an element carries its own
formula**.  You already placed the ink (the ops); now you tell each element
*why* it is where it is.  Three ingredients, all authored in the same Python
script, with the helpers from `drawings/eqdraw_params.py`:

**1. Give elements their formula** (`op.define`) — most of the work:

```python
from eqdraw_params import point, handle, offset, intersection, midpoint, \
                          line, at, circle, through, band, member

op = {o.name: o for o in drawing.ops}      # look ops up by name

op["bar3"].define  = line("A", "B")        # the bar follows points A and B
op["pt_B"].define  = at("B")               # the marker sits on B
op["lbl_B"].define = at("B", 1.4, 1.0)     # the label, with a small offset
op["circle"].define = circle("A")          # the guide circle is centered on A
op["aux_j"].define = through("J1", "J2")   # a polyline through named points
op["V3"].define    = band("A", "B", 0.65)  # a force band along the bar
```

**2. Say which points exist, which are draggable, and how new points are
constructed** (`drawing.params`).  A handle "on" an op slides along that
op's live geometry — like GeoGebra's *point on path*.  Rules can be written
in ANY order; the viewer sorts them:

```python
drawing.params = {
    "points":  [point("A", 24, 48), point("F4", 96, 58)],   # fixed
    "handles": [handle("B", op="pt_B", on="circle")],       # draggable, on the circle
    "rules": [
        offset("G", "F4", "B", "A", 16),                # G = F4 + 16 towards A-from-B
        intersection("H", "F4", "C", "A", "G", "D", "A"),  # the two parallels meet
        midpoint("M3", "A", "B"),                       # a label anchor
    ],
```

**3. Make the colors live** — one `member(...)` per bar (blue = compression,
pink = tension, decided exactly as in the original applets).  It recolors the
bar, its force-diagram edge, its number labels and its band together:

```python
    "colors": [
        member("3", bar=("A", "B"), force=("F4", "G")),
        member("1", bar=("A", "C"), force=("H", "F4")),
        member("2", bar=("A", "D"), force=("G", "H")),
    ],
}
```

That's the whole language.  The rule helpers are:

| helper                                      | meaning                                                   |
| ------------------------------------------- | --------------------------------------------------------- |
| `offset(name, from, a, b, length, rotate=0, away_from=None)` | `from + unit(b−a)·length`; `rotate` turns the direction (degrees); `away_from="H"` flips it so the result lands farther from H (arrows stepping aside) |
| `intersection(name, p1, a1, b1, p2, a2, b2)`| where the line through `p1` parallel to `a1→b1` meets the line through `p2` parallel to `a2→b2` — the graphic-statics workhorse |
| `midpoint(name, a, b)`                      | the midpoint                                              |
| `distance(a, b, scale)`                     | a scalar usable as any length/width: `|a−b|·scale`        |

and the define helpers: `line(start, end)`, `at(point, dx, dy)`,
`circle(center, radius=None)`, `through(*points)`, `band(a, b, width)`.

The complete worked example — drawing 1 fully draggable — is
`drawings/make_view_1_parametric.py` (~50 lines of defines + 15 rules).
Run it after any change to regenerate `data/view_1.json`.  Drawings
without `params` simply play statically — the parametric layer is always
optional.

**Porting one of the 53 originals?**  `drawings/ggb2params.py 7` reads the
original GeoGebra applet (`drawings/view_7/applet_0/geogebra.xml`) and prints
a draft: the free points, the on-path handles, the intersections and segment
formulas it could translate — plus an honest list of what it could not
(`If`/`Mirror`/macros), which is your hand-work.  GeoGebra labels differ from
the web op names; `drawings/python/recipes/view_N_draw.py` is the dictionary
between them.

---

## 6. Where the geometry can come from

`eqdraw_ops` only needs COMPAS `Point / Line / Polyline / Circle / Polygon`
objects — it does not care where they came from:

- **Pure Python**: compute coordinates as in the tutorial above.
- **Rhino**: draw your lines and points in Rhino, read them with
  `compas_rhino` (e.g. `compas_rhino.conversions.curve_to_compas_line`,
  or simply note the coordinates), then feed them to `Op(...)` in the same
  script.  The drawing file itself is always written by `compas.json_dump`.
- **Any COMPAS workflow** (form finding, graphic statics, …): whatever
  produces geometry can also assign it a `step`, a `color` from `PALETTE`
  and a width — that *is* the drawing.

Tip: the 130 existing files in `Equilibrium/drawings/python/ops/` are all in
exactly this format — copy any of them into `data/` as `view_N.json` and it
appears in the gallery, a rich real example to study (and
`Equilibrium/drawings/python/recipes/view_1_draw.py` shows drawing 1 written
as literal Python calls).

---

## 7. Building and publishing

```bash
npm run build
```

creates a `dist/` folder that is **fully self-contained and relocatable**
(all paths are relative, routing uses `#/…`), so it works from any subfolder
of any static host — GitHub Pages included — with no server configuration.

The Teaching repository publishes everything on `main` verbatim via
`.github/workflows/pages.yml`.  Two options:

- **simplest**: run `npm run build` locally and commit the `dist/` folder
  (remove `dist/` from `.gitignore` first); the site is then served at
  `…/2_computational_form_finding/Equilibrium/website/dist/`;
- **cleaner**: add a build step to the Pages workflow
  (`cd …/Equilibrium/website && npm ci && npm run build`) so the site is
  built on every push.

---

## 8. How it works under the hood (for the curious — not needed to add drawings)

- `src/lib/drawing.ts` reads the COMPAS JSON: it unwraps the standard
  `{"dtype": …, "data": …}` envelopes of `eqdraw_ops/Drawing`, the geometry
  (`compas.geometry/…`) and colors, and normalizes the drawing to a
  predictable size.
- `src/lib/flatten.ts` converts every op into **triangle meshes**: strokes
  become world-width quads with round caps, arrows get solid heads, dashed
  lines are tessellated dash by dash, polygons are ear-clipped.  This is what
  gives the drawings the same graphic quality as the original hand-written
  site — the generic viewer draws lines only 1 px thin.
- `src/lib/dispatcher.ts` encodes those meshes and all commands
  (camera, materials, visibility) as COMPAS-protobuf messages — the only
  input `@compas-dev/compas-threejs-ts` accepts — using
  `@gramaziokohler/compas-pb-ts`.  Colors are pre-compensated for the
  viewer's ACES tone mapping (`src/lib/aces.ts`) so the palette renders
  exactly.
- `src/components/DrawingViewer.vue` owns the camera (a 15° near-orthographic
  view driven by pan/zoom commands), projects the crisp HTML labels, and
  reveals/hides/flashes elements per step with visibility and material
  messages.  The draw-in animation re-dispatches each new element's mesh with
  partially grown geometry every animation frame (`flattenOp(op, …, f)`).
- `src/views/DrawingView.vue` and `StepPanel.vue` are the page around it:
  caption card, progress bar, sliders, autoplay (3.4 s per step ÷ speed).
- `src/views/GalleryView.vue` builds the gallery from `views.json` — which is
  not a file but a listing of `data/view_*.json`, produced by the small
  `viewsIndex()` plugin in `vite.config.ts` (a middleware in dev, an emitted
  asset at build time).  That is why adding or deleting a drawing needs no
  bookkeeping.

Version pins that matter: `@gramaziokohler/compas-pb-ts` is pinned to
**2.0.0** (the wire format the viewer 1.2.x decodes) and `three` to
**~0.182.0** (the viewer's peer range).  If you upgrade
`@compas-dev/compas-threejs-ts`, re-check both.
