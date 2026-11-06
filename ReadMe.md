# Teaching

The CAS Computational Form-finding website, course content, and browser-based Jupyter notebooks. Source files live outside the generated GitHub Pages deployment.

## Setup

Preview the CAS source directly from the repository root:

```bash
python -m http.server 8000
```

Open `http://localhost:8000/CAS/website/`. For local Python work with COMPAS, install [uv](https://docs.astral.sh/uv/) and run:

```bash
uv sync
```

## Build the docs deployment

`docs/` is generated and ignored by Git. Do not edit it or commit it. Assemble the static site and gallery manifest from `main` and the local `equilibrium` branch:

```bash
python tools/build_site.py
```

To use a separate checkout of the drawings branch:

```bash
python tools/build_site.py --equilibrium /path/to/equilibrium
```

Build JupyterLite and mirror the public library into the deployment:

```bash
python -m pip install -r CAS/jupyter/requirements.txt
jupyter lite build --lite-dir CAS/jupyter --contents ../website/notebooks --output-dir docs/CAS/website/jupyter --apps lab
python CAS/website/tools/mirror_books.py docs/CAS/website/books
```

Serve the finished deployment rather than the source tree:

```bash
python -m http.server 8000 --directory docs
```

Open `http://localhost:8000/CAS/website/` or `http://localhost:8000/CAS/website/notebook.html`. Rebuild `docs/` after changing source files.

## Branches and deployment

- `main` contains the CAS website, its content and assets, notebook sources, and `tools/build_site.py`.
- `equilibrium` contains the separate eQUILIBRIUM drawings websites and their development sources.
- `docs/` contains only the assembled public website, generated JupyterLite application, gallery, and mirrored library.

The GitHub Pages workflow builds and uploads only `docs/`; it never uploads the repository root. A main-branch push, the daily scheduled build, or a manual workflow run updates the deployment. Push `equilibrium` before `main` so the workflow can fetch the drawings.
