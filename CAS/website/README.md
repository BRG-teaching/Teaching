# CAS website

A one-page Vue 3 site with the key slides of the deck, and the front page of
https://brg-teaching.github.io/Teaching/ (the repo's root `index.html` redirects here). It opens on
the full-screen title slide; every topic below is one screen, and scrolling settles on each in turn: the contents, course map, course timeline, the seven chapters (logos,
contents, resources, submission). The Contents / Resources / Submission cards and the grading
list start closed; click a coloured header to open one. A menu on the right side (a button at
the bottom right on phones) jumps to every section and marks where you are.

No build step. Vue is vendored in `vendor/` (v3.5.13, MIT), so the folder works as it is on
GitHub Pages or from any static server:

```bash
cd CAS && python3 -m http.server 8000   # then open http://localhost:8000/website/
```

Serve from `CAS/`, not `CAS/website/`: the page loads the logos from `../logos/` and the
photos from `../project/uploads/`.

| File | What to edit |
|---|---|
| `data.js` | All text: chapters, bullet lists, timeline steps, grading, and `links` (names in the cards that become links) |
| `index.html` | Page structure (Vue template) |
| `style.css` | Colours and layout, same palette and Open Sans type as the deck |
| `app.js` | The small amount of logic (chapter highlight, timeline placement) |
| `library.html`, `library.js`, `library.css`, `library-config.js` | The library and BRG terminal (below) |
| `gate.js` | The password screen |
| `history-submissions.js`, `history-submissions.css` | History Submission: structural references; styles for the course notebook list |
| `notebook-exercises.js`, `notebooks/` | Published tutorial registry and notebook copies; edit the canonical course sources |
| `assets/history/` | History photographs, diagrams, source images and generated previews |
| `history/` | Official worksheet PDFs, reference PDFs and source records |

The History chapter's **Submission** card opens a list of structural systems. Each
system shows a built-project photograph and a graphic-statics diagram, with plain titles
below the images. There are no project-description paragraphs or inline worksheet viewers.
The **Computational Structural Design with COMPAS** chapter's **Submission** card links
to the embedded COMPAS notebook workspace and an ordered list of 15 tutorials. Small
COMPAS examples lead through data, JSON exchange, geometry, graphs, meshes, Model, IFC,
matrix decomposition and optimisation. Structures notebooks (`compas_ags`, `compas_fd`,
`compas_dr`, `compas_tna`) are later extensions.

Resource links go directly to complete official worksheet PDFs, lecture PDFs and exercise
notes. Notes use the English Structural Design I&II compendium at the relevant section,
or the official Structural Design III&IV script for material-specific forms and shells.
Lecture PDFs use the repository's `pdf-archive` branch.

Individual official worksheets are copied byte for byte. The complete set contains eleven
unique handouts (41 pages, 44 numbered or creative tasks). Cables has four exercises across
five PDF pages, including the original blank fourth page. Material-specific forms includes
the complete steel, reinforced-concrete, timber and masonry handouts. Shared worksheets
remain available under each relevant system, including columns and bracing.

Figure content comes from the `graphic-statics-student-course` collection in R2
(`r2-books` profile, `brg-books` bucket) and the original course PDFs. The individual
file/page references and representative-model notes are in `history/sources.json`.
The worksheet/task catalogue and project-reference mappings are in
`history/official-worksheets.json`. Regenerate full PDFs, page previews and site data with
`python3 tools/build_history_worksheets.py /path/to/ETH-eQUILIBRIUM-course`
(requires PyMuPDF and Pillow). `history/official/sources.json` records the source file,
page count and SHA-256 hash of every official PDF.
`python3 tools/build_history_diagrams.py` regenerates the separate diagram previews
from the reference strips and the cable lecture image in `assets/history/diagrams/`.
All History image files belong in `assets/history/`; the MCP server knowledge folder
does not hold a duplicate course-image pack.

## Password

Both pages ask for the course password (`brg`) once per browser (`gate.js`, which stores
only its SHA-256). Unlocking also unlocks the eQUILIBRIUM drawings, which have their own gate
with the same password, so the viewer can show them without asking again. This keeps casual visitors out; it is not real protection: GitHub Pages
and the R2 bucket are public, so anyone with the file or bucket URL can still read them.
For real access control, put the bucket behind Cloudflare Access or a Worker that checks a login.

## Library (`library.html`)

Books, BRG PhD theses and papers, read live from the public R2 bucket `brg-books`, the
same one mcp-server-brg uses (`config/sources.yaml`). The catalogue is the bucket's
`LIBRARY.md`, written by the books-process workflow, so a newly published book appears here
without editing the site.

| Address | Page |
|---|---|
| `library.html#/books`, `#/theses`, `#/papers` | Catalogue tab, with a search over chapter titles and summaries |
| `library.html#/b/<book-id>` | One book: its chapters, plus README / INDEX / GLOSSARY / FIGURES when present |
| `library.html#/b/<book-id>/<chapter.md>` | Reader: the chapter as formatted text with KaTeX maths and figures, previous / next |
| `library.html#/terminal` | BRG terminal, full screen: the **session viewer** on the left, the CLI on the right (see below) |

**Tabs.** Each entry is sorted automatically: under a `# Theses` / `# Papers` heading in
`LIBRARY.md`, or with words such as thesis, PhD, dissertation (→ BRG PhD theses) or paper,
publication, journal, proceedings, conference, IASS (→ Papers) in its ID or title; everything
else is a book. A folder that collects many theses or papers (e.g. `brg-theses/`) shows each of
its files as its own item. `groupOf` in `library-config.js` overrides the sorting for an ID.

**Covers and subjects.** Every entry gets a title cover with only its short title (no author,
year or subtitle; a part number from the ID, e.g. *La statique graphique II*). The cover colour
is the entry's subject, found from words in its title and chapter summaries: structural design
& history (blue), computation (teal), graphic statics (violet), form finding (amber), thrust
networks & masonry (raspberry), materialization (green). Subject chips above the shelf filter it.

`library-config.js` holds the bucket URL, the tab overrides (`groupOf`), and `chatEndpoint`, the address of the
Claude service for the terminal (`CAS/brg-terminal-ai`, a Cloudflare Worker holding the Anthropic API key, since a
public page cannot). Until that is set, the terminal searches the library and builds from plain words itself.

### How the page reads the bucket

The GitHub Pages deploy (`.github/workflows/pages.yml`) runs `tools/mirror_books.py`, which
downloads `LIBRARY.md` and every chapter's markdown from R2 into `books/` of the published site.
The page reads that copy first, so no CORS rule is needed. Figures still load from R2 directly
(images do not need CORS). The deploy also runs daily at 03:17 UTC, so newly published books
appear within a day; run the workflow by hand (Actions → Deploy static site → Run workflow) to
pick them up at once. `books/` is not committed (`.gitignore`).

### Optional CORS rule for the bucket

Only needed if the page should read R2 directly (it falls back to that when the copy is missing).
Browsers only let the page read the bucket if R2 allows it. In Cloudflare: R2 → `brg-books`
→ Settings → CORS policy:

```json
[
  {
    "AllowedOrigins": ["https://brg-teaching.github.io", "http://localhost:8000"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 86400
  }
]
```

Libraries in `vendor/`: Vue 3.5.13, marked 12.0.2, DOMPurify 3.1.6, KaTeX 0.16.11 (all MIT).

## BRG terminal and the session viewer

**Claude or templates.** Without Claude, the terminal only fills in fixed templates; it says so, and a request
beyond them ("circular truss", "three-hinged arch") is answered with "this needs Claude", not with the nearest template.
Claude is on when `chatEndpoint` is set (the class's Worker) or when a visitor types `/key sk-ant-…` with their own
Anthropic API key, which then works from that browser alone (`vendor/brg-claude.js`; see `CAS/brg-terminal-ai/README.md`).

**With Claude**, everything typed that is not a slash
command or a viewer command goes to Claude. It searches and reads the library, looks at figures, computes geometry
in Python, and draws in the 3D view through the viewer's commands, seeing what the viewer answers. Its thinking,
the tools it uses and its answer stream into the terminal; the sources it used end the answer as `/open` links.
`/new` starts a new conversation, `/stop` stops an answer, `/key <key>` stores the class's access key in the browser,
and `/local <words>` uses the built-in plain-word builder below instead of Claude.

The left half of `library.html#/terminal` is the session viewer from
[petrasvestartas/session](https://github.com/petrasvestartas/session) (`session_viewer`, Rust → WebAssembly,
WebGPU), built into `viewer/`. It needs a browser with WebGPU (Chrome or Edge; Safari 26).

- **Backend session.** Opened without parameters, the viewer watches the live scene
  (`scenes/view_live.yaml` in the session R2 bucket) and its ntfy channel. Whatever the desktop `brg`
  terminal, an MCP tool or a `session_py` script publishes with `bash/view_live.sh` appears here
  within seconds.
- **Commands from the terminal.** A line that starts with one of the viewer's 86 commands
  (`viewer-commands.js`, e.g. `Box 0,0,0 100 50 30`, `Sphere 0,0,0 10`, `Line 0,0,0 100,0,0`, `Move 10,0,0`,
  `Undo`, `Fit`, `Layers On`) runs in the viewer. `/viewer` lists every command; Tab completes them.
  A line of numbers (`0,0,0`, `25`) or `finish` answers a command that waits for a point or a value.
- **Plain words** (`library.js`, `phraseToCommands`, no AI involved) become viewer commands:
  shapes (`create a box and a sphere at 2000,0,0`, `draw a line from 0,0,0 to 100,0,50`, `create text saying "BRG"`),
  parts made of boxes and cylinders in millimetres (`create a table`, `create a 2000 by 900 table`, `make a chair`,
  `stool`, `bench`, `shelf with 6 shelves`, `staircase with 12 steps`, `wall`, `slab`, `3 by 4 column grid`, `frame`),
  and edits (`delete everything`, `select all and move up 200`, `rotate the box 45 degrees around x`, `scale by 50%`,
  `copy the sphere 1000 in x`, `hide everything`, `show all`, `top view`, `zoom to fit`, `undo twice`).
  A request it cannot read is reported as such, not searched in the library. Anything beyond this needs an AI
  model behind `chatEndpoint`.
- **Graphic statics from the books.** A graphic statics request first searches the library for the
  construction, finds its figure in the best chapter (by the words around the image) and shows that original figure,
  with author, chapter, §, printed page and caption, in the terminal (the 3D view only draws); then it recreates the construction in the
  3D view and ends with the sources. It builds:
  - funicular cables and arches: `funicular cable with 7 loads of 12 kN span 20 m sag 4 m`,
    `funicular arch loads 10 20 30 20 10`: form diagram (cable, closing string, loads, supports) and force diagram
    (load line, pole, rays, H), with the reactions, the thrust and the largest force;
  - trusses: `create a truss using graphic statics` (Pratt), `Howe truss with 8 panels span 16 m depth 2 m`,
    `Warren truss with loads on the bottom chord`, `roof truss with 4 panels`, `king post truss`. The member forces
    come from the equilibrium of the joints; the force diagram is the Cremona (reciprocal) diagram, built from Bow's
    notation: every space of the form diagram (letters outside, numbers inside, labelled in both diagrams) is a point
    of the force diagram, every member a line parallel to it. The terminal lists every member's force by its two
    spaces (`a-1 −30.0`), tension and compression.
  Historical books (before 1950, or by Lévy, Culmann, Cremona, Maxwell, Wolfe …) always rank first, then the rest.
  Sources stay in the terminal, and so do citations: each names the book, chapter, § and the printed pages it refers to (where the topic
  appears, read from the books' `<sub>page N</sub>` markers), quotes a sentence from it, and gives the link to the book
  in the Cloudflare library. Clicking a citation prints that page in the terminal (`/page <book>/<chapter.md> 112`).
  Claude's citations work the same way. The reader also opens at a page: `library.html#/b/<book>/<chapter>?p=112`.
  Drawings use the Equilibrium palette (`2_computational_form_finding/Equilibrium/drawings/web/lib/eqdraw.js`):
  compression navy `#1a1eb2`, tension pink `#ce4095`, loads, reactions and load lines green `#3f9c20`, guides grey
  `#aaaaaa`, zero-force members `#b9b9bd`, in the form and the force diagram alike.
  Graphic statics of an unnamed structure ("create a force diagram") asks which one; anything else is Claude's.
- The viewer's replies (`Created and selected box…`, `3 selected`, errors) are shown in the terminal.
- Chapters, figures, the shelf and the eQUILIBRIUM drawings open on a sheet over the viewer;
  ✕ or `/close` shows the 3D scene again.
- The viewer's URL options given to `library.html` pass through to it: `library.html?live=off#/terminal`
  opens an empty scene instead of the live one, `?scene=…`, `?live=<manifest url>`, `?msaa=1`, `?dpr=1` likewise.

The terminal runs each line through `wasmBindings.run_command(line, cancel)`, an entry point added to the viewer
by `tools/session-viewer-run-command.patch` (also reachable with `postMessage({ type: 'session-viewer:run', line, cancel })`).
`cancel` ends a command still waiting for picks first, so no viewer state (a pick command, a gumball number box,
a closed command line) can swallow the next line. The same patch adds a `Color` command (`Color #3f9c20`, `Color 63,156,32`, `Color Original`) that colours the selected
objects as the layer panel's colour menu does, and makes `Escape` end every running command; before it,
Element Beam, Column, Plate, Block and Support took `Escape` as a value and could not be cancelled from the command line.
A viewer built without the patch is driven by typing into its hidden command input instead, which is less reliable.

The live scene is read from the session R2 bucket, so that bucket's CORS rule must allow
`https://brg-teaching.github.io` as well as the viewer's own site.

Rebuild the viewer after it changes (`session` and `wood` cloned side by side, built at session `b173de5`).
`tools/Trunk.cas.toml` is the viewer's `Trunk.toml` without the pre-build hook that renders its docs:

```bash
cd session/session_viewer
rustup target add wasm32-unknown-unknown && cargo install trunk --version 0.21.14 --locked
cp ../../teaching/CAS/website/tools/Trunk.cas.toml .
git -C .. apply ../teaching/CAS/website/tools/session-viewer-run-command.patch   # run_command + Escape fix
mkdir -p target/docs/vue        # the docs hook is skipped; the viewer only links to them
REGEN_PROTO=0 trunk build --release --config Trunk.cas.toml --public-url ./ --dist ../../teaching/CAS/website/viewer
python3 ../../teaching/CAS/website/tools/extract_viewer_commands.py   # refresh viewer-commands.js
```

## Python exercises (`notebook.html`)

`notebook.html` opens `library.html#/notebook`: JupyterLab on the left and the existing
BRG terminal on the right. The default exercise is `01-basics/01-box.ipynb`.
Chapter 2 → **Submission** links to each tutorial in teaching order. Each notebook is
self-contained and minimal: a title, short section headings and runnable code
with a COMPAS scene, grouped by topic in `notebooks/<topic>/`.
`library.html#/notebook/<id>` and `/notebook <id>` open a tutorial without restarting
the iframe; `/notebook list` lists the available IDs.
The existing `#/notebook` and `#/notebook/cable` routes stay valid.
JupyterLite stores browser files under `cas-jupyter-contents-2`; renaming it hides
earlier browser-saved copies for everyone.

The canonical sources are in the local `mcp-server-brg` repository at
`knowledge/02_computational_design/notebooks/`, with teaching order in `tutorials.json`.
The site serves its own copies; it does not fetch notebook content from workshop repos.
After editing the source course, publish and verify the copies before committing Teaching:

```bash
python3 /path/to/mcp-server-brg/knowledge/02_computational_design/publish_notebooks.py --website /path/to/Teaching/CAS/website
python3 /path/to/mcp-server-brg/knowledge/02_computational_design/publish_notebooks.py --website /path/to/Teaching/CAS/website --check
```

The publisher copies only declared notebooks and generates `notebook-exercises.js`,
which supplies both the Submission list and workspace routes. It does not delete other
files or deploy the website. Edit sources once rather than maintaining two versions.
The course source README records workshop choices, revision dates and validation.

Both the 3D and notebook workspaces start with two-thirds of the width for the workspace
and one-third for chat. The thin divider has no arrow controls. Drag it to resize, click
it to hide or restore the terminal, or drag it to either outer edge to collapse that pane.
Hidden panes keep their sessions. With the divider focused, Enter or Space toggles the
terminal, Escape resets the proportions, and arrow keys resize (Shift for larger steps).
The chosen ratio is remembered in this browser. On small screens the panes stack and the
divider resizes their heights.
Workspace navigation uses the main horizontal header. Notebook files and exports are
managed inside the embedded Jupyter interface. On narrow screens the header scrolls horizontally.

The notebook runs Python locally through JupyterLite. The runtime is explicitly pinned
to Pyodide 0.29.3 / Python 3.13.2, matching the official IfcOpenShell WebAssembly wheel.
The first setup cell installs COMPAS 2.15.1, pythreejs 2.4.2 and `compas_notebook` 0.11.0.
Model uses `compas_model` 0.9.3; IFC uses `compas_ifc` 2.1.0 with the official IfcOpenShell
0.8.4 WASM wheel in the browser; the structures notebooks use `compas_ags` 1.3.3,
`compas_fd` 0.5.4, `compas_dr` 0.3.1 and `compas_tna` 0.9.0.
NumPy, SciPy and Shapely use the versions bundled with the pinned browser runtime. Choose
**Run → Run All Cells**, or **Shift+Enter** for individual cells.
The starter notebooks remain ordinary `.ipynb` files in `notebooks/`, usable in desktop
Jupyter; the setup cell installs missing packages there as well.
JupyterLite supports a subset of Python packages; advanced
exercises with native CAD libraries need a desktop or server Python environment.

The workspace keeps the notebook iframe and its kernels alive when switching exercises
or switching to the 3D view. The terminal is the same one used by the library: its existing
AI connection and `/key` settings apply, and `/notebook <id>` prints exercise
instructions. Notebook cells and terminal conversations have separate state: paste a
cell or error into the terminal when asking for help. Viewer commands switch to the
3D view, while library chapters open on a closable sheet above the notebook.

Work is saved in the current browser's IndexedDB. Students should also use
**File → Save and Export Notebook As → Notebook** to keep a copy on their computer.
The scene-based exercises use new filenames, so previously saved copies of the earlier
exercises stay available in the browser's file browser.

GitHub Pages builds JupyterLite before deployment using the pinned tools in
`../jupyter/requirements.txt`. To build and preview locally from the repository root:

```bash
python3 -m venv .venv
.venv/bin/pip install -r CAS/jupyter/requirements.txt
.venv/bin/jupyter lite build --lite-dir CAS/jupyter --contents ../website/notebooks --output-dir CAS/website/jupyter --apps lab
python3 -m http.server 8000
# http://localhost:8000/CAS/website/notebook.html
```

`jupyter/` is generated and ignored by Git; the editable build settings are in
`../jupyter/jupyter-lite.json`. Internet access is required on first launch to download
the Pyodide runtime and Python packages. The same course password gate applies.
