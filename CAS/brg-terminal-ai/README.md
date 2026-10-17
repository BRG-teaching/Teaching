# BRG terminal: Claude

A Cloudflare Worker that gives the BRG terminal of the CAS website (`CAS/website/library.html#/terminal`)
Claude. Claude reads the BRG library, thinks, computes, and builds models in the 3D view next to the terminal.

```
page (GitHub Pages)                 this Worker (Cloudflare)               Claude API
 keeps the conversation   ──POST──▶  library tools run here:      ──────▶  claude-opus-5-5
 runs viewer commands               list_books, search_books,               adaptive thinking
 in the 3D view           ◀─lines──  read_book_section,           ◀──────   code execution (Python)
 sends back the viewer's             look_at_figure (R2 bucket)
 answers                             viewer calls go to the page
```

- **Library tools** read `LIBRARY.md` and the chapter Markdown from the public R2 bucket, with the tool names of
  mcp-server-brg: `list_books`, `search_books`, `read_book_section`, plus `look_at_figure`, which shows Claude
  a plate or figure as an image.
- **Code execution** (Anthropic's sandbox) lets Claude compute geometry, such as a funicular polygon or a thrust line,
  before it draws.
- **The `viewer` tool** sends session viewer command lines to the page, which runs them in the 3D view and sends
  back each line with the viewer's answer, so Claude sees what was created and corrects errors. Claude knows
  the viewer's 86 commands (`src/viewer-commands.js`, written by `CAS/website/tools/extract_viewer_commands.py`).
- **Instructions** (`src/prompt.js`) set the order of work: search the library first, historical books first
  (`search_books` ranks them first), read the chapter, look at the book's figure (the page shows it over the 3D view),
  recreate the construction in the 3D view in the Equilibrium palette (compression navy, tension pink, forces green,
  guides grey), then answer and cite author, §, page and figure with `/open book/chapter.md` lines, which the terminal
  turns into links. They follow BRG's own guidance for these books (mcp-server-brg's `book_guidance.md`).
- **Streaming:** thinking summaries, text and tool use stream to the terminal while Claude works.
- **Fallback:** requests use `fallbacks: "default"`. If a safety check declines a request, the API runs it again
  on the model Anthropic recommends for that case, instead of failing.
- **Prompt caching** keeps the tools, the instructions and the conversation so far cached between requests.

The conversation lives in the browser tab (`/new` starts over). Nothing is stored by the Worker.

## Set it up

You need an Anthropic API key (console.anthropic.com → API keys; set a monthly spend limit there) and a
Cloudflare account. The BRG library's R2 bucket is already on Cloudflare, so the same account works.

```bash
cd CAS/brg-terminal-ai
npm install
npx wrangler login
npx wrangler secret put ANTHROPIC_API_KEY     # paste the Anthropic key
npx wrangler secret put ACCESS_KEY            # make up a key for students, e.g. cas-2026-xyz
npx wrangler deploy                           # prints https://brg-terminal.<you>.workers.dev
```

Then put that address in `CAS/website/library-config.js` as `chatEndpoint`, push to `main`, and in the terminal
type `/key <ACCESS_KEY>` once per browser.

Settings in `wrangler.toml`: `MODEL` (default `claude-opus-5-5`), `EFFORT` (`low` … `max`, default `high`: how
much Claude thinks), `ALLOWED_ORIGINS` (pages that may call it), `LIBRARY_BASE` (the bucket).

**Keep `ACCESS_KEY` set.** The Worker spends your API key. The origin check only stops other web pages; a script can
send any origin. The access key is what keeps strangers out. Change it with `wrangler secret put ACCESS_KEY` and tell
the class.

**Cost.** Opus 5.5 costs $4 per million input tokens and $20 per million output tokens; cached input is $0.20 per
million. A question that searches, reads a chapter or two and draws typically runs a few rounds of 10–60 thousand
input tokens, mostly cached after the first, and a few thousand output tokens, so expect cents to a few tens of cents
per question. Check the real figures in the Anthropic console. To spend less, lower `EFFORT`, or set
`MODEL = "claude-sonnet-5-5"` ($2 / $10).

**Cloudflare plan.** The free Workers plan allows 10 ms of CPU per request, which streaming a long answer can exceed.
The Workers Paid plan ($5 a month) avoids that.

## Test without an API key

```bash
npm test                       # the Worker against a mock Claude API: tools, streaming, viewer round trip
node test/serve.mjs --mock     # the Worker on http://localhost:8788 with the mock
```

With the website served locally (e.g. `python3 -m http.server 8767` at the repository root), open
`http://localhost:8767/CAS/website/library.html?chat=http://localhost:8788#/terminal`. The `?chat=` override accepts
only a localhost address. With a real key, `ANTHROPIC_API_KEY=... node test/serve.mjs` runs the same page against
Claude itself.
