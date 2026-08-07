# Teaching

Resources for teaching.

## Description

https://docs.google.com/document/d/17gDPkJS4DjB0FUJg9BehDfBTe4H2NIyb7-zygBppUCI/edit?tab=t.0

## Setup

Requires [uv](https://docs.astral.sh/uv/). From the repo root:

```bash
uv sync
```

Run any script with `uv run` (works from any subdirectory):

```bash
uv run 2_computational_form_finding/Equilibrium/drawings/view_1/view_1_compas.py
```

### Step-by-step drawings (web)

Interactive step-by-step construction player for the eQUILIBRIUM drawings
(three.js, no build step):

```bash
cd 2_computational_form_finding/Equilibrium/drawings/web
python3 -m http.server 8741
# open http://localhost:8741/?view=1
```

Each drawing is a small module in `web/views/view_N.js`; the shared 2D viewer,
step player and color scheme live in `web/lib/`. View 1 is hand-written and
fully interactive (drag points, change forces); views 2–54 are generated from
the python dumps by `web/tools/convert.py` and replayed step by step.
`?view=N&step=K` (or `step=last`) deep-links a construction step.

Step-by-step movies (one frame per step, saved to `web/movies/`):

```bash
python3 web/tools/make_movies.py 1 2 14   # needs the server above running
```

## Schedule

- 1 ECTS = 30 h total student workload (ETH standard)
- Teaching hours ≈ ⅓ of workload (~10 h per ECTS)
- 1 teaching day = 6 contact hours

| Module | ECTS | Total workload (h) | Teaching hours | Teaching days |
|---|---|---|---|---|
| Compas | 2–3 | 60–90 | 20–30 | 3–5 |
| Computational form finding | 2–3 | 60–90 | 20–30 | 3–5 |
| Advanced masonry analysis | 2–3 | 60–90 | 20–30 | 3–5 |
| BIM | 2–3 | 60–90 | 20–30 | 3–5 |
| AI | 2–3 | 60–90 | 20–30 | 3–5 |
| Case studies | 5 | 150 | 50 | 8 |
| **Total** | **15–20** | **450–600** | **150–200** | **23–33** |

## Questions

- 2D Graphic Statics is made for teaching
- Everything else is made for developers
- Applications of compas_model and compas_ifc are minimal comparing to the content of the form-finding and masonry analysis.
- FEA resources very minimal.
- AI materials is absent.
- Why math is not explained how the solvers work, as the focus is given to the user interfaces?
