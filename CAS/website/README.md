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

**With Claude** (`chatEndpoint` set, see `CAS/brg-terminal-ai/README.md`), everything typed that is not a slash
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
  with author, chapter, §, printed page and caption, on a card over the 3D view; then it recreates the construction
  beside it and ends with the sources as `/open` links. It builds:
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
  Every citation names the printed pages it refers to (the pages of the chapter where the topic appears, read from the
  books' `<sub>page N</sub>` markers, and the page of the figure) and shows the book's address on this site at that
  page: `library.html#/b/<book>/<chapter>?p=112` opens the reader there and marks the page; `/open <book>/<chapter> 112`
  does the same on the terminal's sheet. Claude's citations work the same way.
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
