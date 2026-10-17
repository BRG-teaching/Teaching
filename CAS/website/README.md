# CAS website

A one-page Vue 3 site with the key slides of the deck. It opens on the full-screen title slide;
scrolling down leads to the contents, course map, course timeline, the seven chapters (logos,
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
| `library.html#/terminal` | BRG terminal, full screen: the session viewer on the left shows what text cannot (chapters with figures and formulas, figure galleries, the eQUILIBRIUM step-by-step drawings); the CLI on the right takes `/books`, `/book`, `/search`, `/open`, `/read`, `/figures`, `/drawings`, `/drawing <n> [step]`, `/help`, like `uv run brg`. On phones the viewer sits above the CLI. |

`library-config.js` holds the bucket URL, which entries are theses or papers (`groupOf`;
everything else is a book), and `chatEndpoint` for AI answers in the terminal. Until that is
set, the terminal searches the library. The `brg` CLI uses each person's own Claude or
ChatGPT login, which a public web page cannot do, so AI answers need a small server, for
example a Cloudflare Worker with an API key that accepts `POST { messages }` and returns `{ reply }`.

### CORS rule for the bucket

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
