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
to the embedded COMPAS notebook workspace and an ordered list of 34 tutorials. Small
COMPAS examples lead through data, JSON exchange, geometry, graphs, meshes, Model, IFC,
matrix decomposition and optimisation. Structures notebooks (`compas_ags`, `compas_fd`,
`compas_dr`, `compas_tna`) are later extensions.

Resource links go directly to complete official worksheet PDFs, lecture PDFs and exercise
notes. Notes use the English Structural Design I&II compendium at the relevant section,
or the official Structural Design III&IV script for material-specific forms and shells.
Lecture PDFs are in the R2 bucket under `teaching/equilibrium/files/`.

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
| `library.html#/notebook` | Jupyter + BRG, full screen: the JupyterLite notebook on the left, the BRG terminal on the right (see below); `#/terminal` opens it too |

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

## Jupyter + BRG: the notebook and the BRG terminal

The page has one workspace: the JupyterLite notebook on the left and the BRG terminal on the right.

**Without Claude**, the terminal runs its slash commands (`/help` lists them: the library, `/open` chapters,
`/figures`, `/notebook` tutorials, the eQUILIBRIUM `/drawings`) and searches the library for anything else.
Claude is on when `chatEndpoint` is set (the class's Worker) or when a visitor types `/key sk-ant-…` with their own
Anthropic API key, which then works from that browser alone (`vendor/brg-claude.js`; see `CAS/brg-terminal-ai/README.md`).

**With Claude**, everything typed that is not a slash command goes to Claude, with the tools of the BRG MCP server
(`mcpEndpoint` in `library-config.js`). "Create a box" makes Claude call the MCP's `compas_box_notebook` and pass
its cells to the page's `notebook` tool, which writes `brg_mcp.ipynb` into JupyterLite and opens it on the left.
Questions are answered from the library, with its figures shown in the terminal and `/open` links to the pages.
`/new` starts a new conversation, `/stop` stops an answer.

**Notebook skills** (`/skills`) work without Claude: every tool of the BRG MCP server whose name ends in
`_notebook` is a slash command (`compas_box_notebook` → `/box`), listed in `/skills`, `/help` and the `/` menu.
`/box 3 2 1` (or `/box zsize=4 color=#ce4095`) calls the tool from this page and opens the notebook it returns.
Tools ending in `_add` are additions (`compas_primitives_add` → `/add-primitives`): they add imports, a new cell
below the clicked cell and scene lines to the notebook that is open, instead of writing a new one.
A new `*_notebook` tool in mcp-server-brg appears here once that server is deployed (its
`docs/contributing/README.md`). `?mcp=http://localhost:8000/mcp` tries the skills against a local server.

Chapters, figures, the shelf and the eQUILIBRIUM drawings open on a sheet over the notebook; ✕ or `/close`
shows the notebook again.

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

The workspace keeps the notebook iframe and its kernels alive when switching exercises.
The terminal is the same one used by the library: its AI connection and `/key` settings
apply, and `/notebook <id>` opens an exercise. Notebook cells and terminal conversations
have separate state: paste a cell or error into the terminal when asking for help.
Library chapters open on a closable sheet above the notebook.

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
