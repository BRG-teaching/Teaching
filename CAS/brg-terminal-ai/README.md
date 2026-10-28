# BRG terminal: Claude

A Cloudflare Worker that gives the BRG terminal of the CAS website (`CAS/website/library.html#/terminal`)
Claude. Claude reads the BRG library, thinks, computes, and builds models in the 3D view next to the terminal.

```
page (GitHub Pages)                 this Worker (Cloudflare)             Claude API                 BRG MCP server
 keeps the conversation   ──POST──▶  streams the answer back   ──────▶  claude-sonnet-5-5  ──────▶  mcp-server-brg
 runs viewer commands                viewer calls go to the page        adaptive thinking            (Render, free
 in the 3D view           ◀─lines──                             ◀──────  code execution     ◀──────  plan)
 sends back the viewer's
 answers
```

- **The BRG MCP server** ([mcp-server-brg](https://github.com/BRG-research/mcp-server-brg)) gives Claude the
  library and every other BRG tool: `search_books` (historical books first), `read_book_section`, `look_at_figure`
  (a plate or figure as an image; the terminal shows it), `search_knowledge`, `funicular_cable` and the rest. The
  Claude API calls it directly through the MCP connector, at `MCP_URL` (`wrangler.toml`) or `mcpEndpoint`
  (`website/library-config.js`) in the own-key mode. Nothing of the library is implemented here: a tool added to
  the MCP server is in the terminal as soon as that server is deployed (on every push to its `main`; see its
  `deploy/README.md`).
- **Code execution** (Anthropic's sandbox) lets Claude compute geometry, such as a funicular polygon or a thrust line,
  before it draws.
- **The `viewer` tool** sends session viewer command lines to the page, which runs them in the 3D view and sends
  back each line with the viewer's answer, so Claude sees what was created and corrects errors. Claude knows
  the viewer's 86 commands (`src/viewer-commands.js`, written by `CAS/website/tools/extract_viewer_commands.py`).
- **Instructions** (`src/prompt.js`) set the order of work: search the library first, historical books first
  (`search_books` ranks them first), read the chapter, look at the book's figure (the terminal shows it),
  recreate the construction in the 3D view in the Equilibrium palette (compression navy, tension pink, forces green,
  guides grey), then answer and cite author, §, page and figure with `/open book/chapter.md` lines, which the terminal
  turns into links. They follow BRG's own guidance for these books (mcp-server-brg's `book_guidance.md`).
- **Streaming:** thinking summaries, text and tool use stream to the terminal while Claude works.
- **Fallback:** requests use `fallbacks: "default"`. If a safety check declines a request, the API runs it again
  on the model Anthropic recommends for that case, instead of failing.
- **Prompt caching** keeps the tools, the instructions and the conversation so far cached between requests.

The conversation lives in the browser tab (`/new` starts over). Nothing is stored by the Worker.

## Without a server: your own key in the browser

On the website, `/key sk-ant-…` (an Anthropic API key) switches Claude on in that browser only: the same agent
(`src/agent.js`, bundled by `npm run build:browser` into `CAS/website/vendor/brg-claude.js`) runs in the page and
calls the Anthropic API directly. The key is kept in the browser's local storage, sent only to Anthropic, masked in
the terminal, and removed with `/key off`. Each person pays for their own use. Use a key with a spend limit, in a
browser profile you trust, since a script running on the page could read it. The Worker below is for a class: one key, kept on the server.

## Try it on many questions

`ANTHROPIC_API_KEY=sk-ant-… npm run try` runs `test/try-prompts.mjs`: fourteen questions from the historical
books beyond cables and trusses (resultants, moment diagrams, centroids, masonry arches and the middle third,
three-hinged arches, Ritter and Culmann sections, earth pressure, Williot diagrams, moments of inertia, Maxwell's
reciprocal figures, the kern, a circular truss, Lévy on vaults). It writes `try-report.html`, one section per question:
the searches, readings and figures, the cited pages, the answer, and the drawing rendered from the viewer commands
in their colours, with any command the viewer would refuse. `--only 3,7` runs some; the whole set costs one to three
dollars on Sonnet 5.5.

## An Anthropic API key

An API key is separate from a claude.ai subscription, and you pay per use with prepaid credits:

1. Sign in at console.anthropic.com (the Claude Console) with your email.
2. Settings → Billing: buy credits (e.g. $10) and leave auto-reload off. You can never spend more than you loaded.
3. Optional: Settings → Workspaces → create a workspace "BRG terminal" with a monthly spend limit.
4. Settings → API Keys → Create Key, name it "BRG terminal", pick that workspace, and copy the key (`sk-ant-…`). It is
   shown only once.
5. On the website, type `/key sk-ant-…` in the BRG terminal. Or put the key on the Worker below for a whole class.

Settings → Cost shows what each key spent. Never put the key in a repository or a chat.

## Set it up for a class

You need the Anthropic API key above and a Cloudflare account. The BRG library's R2 bucket is already on Cloudflare,
so the same account works.

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

Settings in `wrangler.toml`: `MODEL` (default `claude-sonnet-5-5`), `EFFORT` (`low` … `max`, default `medium`: how
much Claude thinks), `ALLOWED_ORIGINS` (pages that may call it), `MCP_URL` (the BRG MCP server). The website's own-key
mode uses the same defaults (`src/agent.js`).

**Keep `ACCESS_KEY` set.** The Worker spends your API key. The origin check only stops other web pages; a script can
send any origin. The access key is what keeps strangers out. Change it with `wrangler secret put ACCESS_KEY` and tell
the class.

**Cost.** Claude Sonnet 5.5 costs $2 per million input tokens and $10 per million output tokens; cached input is
$0.20 per million. A question that searches, reads a chapter or two and draws typically runs a few rounds of 10–60
thousand input tokens, mostly cached after the first, and a few thousand output tokens: roughly $0.05–0.20 per
question at medium effort, so $10 of credits is about 50–200 questions. The terminal shows each answer's cost under
it. For the hardest questions, `MODEL = "claude-opus-5-5"` ($4 / $20) reasons better at about twice the price.

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
