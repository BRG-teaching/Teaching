# Claude notes — Equilibrium website

Vue 3 + Vite + Vuetify site that plays step-by-step graphic-statics drawings
from COMPAS JSON, rendered with `@compas-dev/compas-threejs-ts`. Built
2026-08-23/24; behavior verified against BOTH references: the deployed
`../drawings/web` site and the original ETH GeoGebra applets
(block.arch.ethz.ch/eq). Human docs: README.md (amateur tutorial). These
notes are for the assistant.

## Ground rules (user priorities)

- The deployed original site and the ETH applets are the quality bar — a
  missing behavior (draw-in animation, dynamic colors, declutter offsets,
  video gallery cards) is a bug, not a nice-to-have.
- Authors are COMPAS-Python amateurs, no JS: every feature must land as
  Python script + JSON + README section. Never require touching src/.
- Honest physics: no interactivity is better than wrong statics.
- Verify with headless Chrome screenshots and pixel-diffs (see hooks below).

## Layout (2026-08-26 flattening)

`website/data/` is Vite's `publicDir` (set in vite.config.ts) and holds
EVERYTHING the site reads, flat: `view_N.json`, `view_N.png`, `view_N.mp4`.
There is no `public/` and no `movies/` subfolder any more, so runtime URLs
carry NO `data/` prefix — fetches are `${BASE_URL}view_N.json` etc., and
`npm run build` copies the files to `dist/` root. The Python authoring scripts
live in `website/drawings/` (was `authoring/`).

`views.json` is NOT a file: the `viewsIndex()` plugin in vite.config.ts scans
`data/view_*.json` and answers `/views.json` via dev middleware / an emitted
`dist/views.json` asset. So the gallery mirrors the folder — dropping a
drawing in or deleting it needs no bookkeeping, and a stale card is
impossible. Do not reintroduce a hand-maintained list.

## Architecture (src/)

- `lib/drawing.ts` — parses `eqdraw_ops/Drawing` COMPAS dtype JSON
  (`data/view_N.json`), normalizes the frame to 50 world units.
- `lib/flatten.ts` — ops → triangle meshes (world-width stroke quads + caps,
  arrowheads, dash tessellation, ear-clip fills); takes a reveal fraction
  `f` for the eqdraw-style draw-in animation.
- `lib/params.ts` — parametric layer: named points, handles (GeoGebra-style
  `on: "<opName>"` point-on-path, constraint read live), rules
  (offset/intersection/midpoint, auto-topologically sorted), op-level
  `define` formulas (replacing the older `bind` list), and `colors`
  (compression/tension via GeoGebra's dynamic-color triangle-wave formula,
  ported verbatim from ../drawings/web/lib/vec.js).
- `lib/dispatcher.ts` — encodes protobuf messages (`@gramaziokohler/
  compas-pb-ts` **pinned 2.0.0**; 3.x wire format is incompatible;
  `three ~0.182.0` is the viewer's peer range).
- `lib/aces.ts` — exact inverse of the viewer's forced ACESFilmic tone
  mapping so flat palette colors render exactly (whites cap at #f5f5f5
  uniformly).
- `components/DrawingViewer.vue` — owns the camera (fov 15 pseudo-ortho;
  its own overlay swallows ALL pointer input: pan/zoom/handle-drag; the
  viewer's OrbitControls would rotate). Projects crisp HTML labels itself.
  Draw-in = re-dispatching meshes with partial geometry per rAF frame.
  Step reveal via set_visibility + material re-dispatch (black flash on the
  current step; final-step ops and `title` labels never flash).
- Viewer quirks: `createViewer` WIPES its container (give it a child div);
  hide its own UI (`#openObjectBar`, `#sidebar`, `#right-sidebar`) with
  `!important` (their rules use ID selectors); re-dispatching a mesh resets
  its visibility — re-assert hidden.

## Authoring pipeline (what an amateur does)

1. Static drawing: copy `drawings/make_view_2.py` (the minimal rectangle
   example of README §4), change the single `VIEW = N` at the top, run it.
   It builds `eqdraw_ops.Drawing` (ops = COMPAS geometry + style + step) →
   `compas.json_dump` → `data/view_N.json`. The card then exists; nothing
   else to register. Optional
   card art: `data/view_N.{png,mp4}`.
2. Parametric: `op.define = line("A","B") / at / circle / through / band`
   + `drawing.params = {points, handles, rules, colors}` using helpers in
   `drawings/eqdraw_params.py` (incl. `member()` macro = the applets'
   internalForce). Exemplar: `drawings/make_view_1_parametric.py`
   (regenerates data/view_1.json — run it after edits).
3. Porting an original: `drawings/ggb2params.py N` drafts params from
   `../drawings/view_N/applet_0/geogebra.xml`; If/Mirror/Rotate/macros are
   reported for hand-work; GGB labels ≠ web op names — the dictionary is
   `../drawings/python/recipes/view_N_draw.py`.
   `eqdraw_ops.py` (in ../drawings/python) gained backward-compatible
   `Drawing.params` and `Op.define` fields for this.

## Verification hooks

- Dev server may need `--host 127.0.0.1` (binds IPv6-only otherwise).
  The user's connected Claude browser is REMOTE (Linux) — it cannot reach
  localhost; use local headless Chrome:
  `chrome --headless=new --window-size=1500,900 --hide-scrollbars
  --virtual-time-budget=12000 --screenshot=out.png URL`.
- URL hooks: `#/view/1?step=K` (or `step=last`) deep-links a step and
  disables autoplay; `&drag=NAME,x,y` drags a handle (original drawing
  units) after boot — regression-test parametrics + colors this way.
- `npm run build` = type-check + build; dist/ is relocatable
  (`base:'./'` + hash router) for the Teaching GitHub Pages workflow.

## Known deliberate deltas vs the ETH original

Pink (not red) tension — Teaching restyle; fixed parallel assignment (no
`If`-based cond swap, mirrored-but-valid triangle in extreme configs); no
mode slider / C-mirror toggle (not in the ops data).
