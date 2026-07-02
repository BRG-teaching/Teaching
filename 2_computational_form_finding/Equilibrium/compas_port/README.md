# eQUILIBRIUM → COMPAS

Self-contained **COMPAS** translations of the 53 interactive GeoGebra applets from
the BLOCK Research Group / Prof. Schwartz *eQUILIBRIUM* graphic-statics site
(`block.arch.ethz.ch/eq`). Each applet becomes a standalone Python script that
rebuilds the drawing with `compas.geometry` and opens it in **compas_viewer**.

## Layout

```
Equilibrium/
├── .venv/                         uv environment (compas, compas_viewer, ...)
├── drawings/
│   └── view_<N>/
│       ├── applet_0/geogebra.xml  original GeoGebra construction
│       └── view_<N>_compas.py     <-- generated COMPAS script (self-contained)
└── compas_port/
    ├── ggb2compas.py              the transpiler (GeoGebra XML -> COMPAS)
    ├── run.py                     launcher: open one applet in the viewer
    ├── preview.py                 matplotlib PNG previews (no OpenGL needed)
    ├── smoke_test.py              builds every scene headless to catch errors
    ├── previews/view_<N>.png      per-applet thumbnail
    ├── contact_sheet.png          all 53 at a glance
    ├── requirements.txt           pinned versions
    └── NOTES.md                   how the applets work + translation method
```

## Run

From the project base folder (`Equilibrium/`), using the bundled environment:

```bat
:: open an applet in compas_viewer (needs an OpenGL display)
.venv\Scripts\python.exe drawings\view_46\view_46_compas.py

:: or via the launcher
.venv\Scripts\python.exe compas_port\run.py 46
.venv\Scripts\python.exe compas_port\run.py 46 --png   :: PNG instead of window
```

The generated scripts import only `compas` and `compas_viewer` (installed in
`.venv`); all coordinates are inlined, so each file is self-contained.

## Recreate the environment

```bat
cd Equilibrium
uv venv .venv
uv pip install --python .venv -r compas_port\requirements.txt
```

## Regenerate / re-translate

```bat
.venv\Scripts\python.exe compas_port\ggb2compas.py        :: all 53
.venv\Scripts\python.exe compas_port\ggb2compas.py 46 9   :: specific views
.venv\Scripts\python.exe compas_port\smoke_test.py        :: verify all build
.venv\Scripts\python.exe compas_port\preview.py           :: PNGs + contact sheet
```

## Faithfulness & limitations

- Geometry is reconstructed from GeoGebra's **cached evaluated state**, so each
  drawing matches the applet at its **saved slider/parameter values**. The
  scripts are not interactive (no live sliders) — but every point is a named
  COMPAS `Point`, so you can edit coordinates and rebuild.
- Rendered object types: points, segments, infinite lines/rays (clipped to the
  drawing bounds), force **vectors** (drawn with arrowheads), polylines,
  filled polygons, circles, and arcs (sampled to polylines, since
  compas_viewer 2.0.2 has no Arc scene-object).
- Only objects **visible** in the saved state are drawn (GeoGebra
  `show`/`condition` flags are respected), matching what the applet shows.
- Text labels, buttons, images and angle-measure glyphs are omitted (annotation,
  not structural geometry).
- 14 segments produced by the custom `loadToLoadLine` macro (load-on-load-line
  symbols) across a few files could not be reconstructed and are skipped; each
  affected script lists them in a `# transpiler notes:` block. Everything else
  translates with zero warnings. All 53 scripts pass the headless smoke test.

See **NOTES.md** for the detailed analysis of the GeoGebra construction model
and the translation strategy.
