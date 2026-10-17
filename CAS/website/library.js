// Library: reads LIBRARY.md from the R2 bucket and renders books, chapters and a terminal.
// The catalogue format is the one mcp-server-brg parses (src/brg_mcp/adapters/public_books.py):
//   ## `book-id/` — Title, Author, Year
//     - `01-chapter.md` **Chapter title** summary
const { createApp, ref, reactive, computed, watch, nextTick, onMounted } = Vue;
const cfg = window.CAS_LIBRARY;
const base = cfg.baseUrl.replace(/\/$/, '');

const fileUrl = (path) => base + '/' + path.split('/').map(encodeURIComponent).join('/');
const safePath = (p) => !!p && !p.startsWith('/') && !p.split('/').some((s) => s === '' || s === '.' || s === '..') && !/[\\%?#:]/.test(p);

function parseLibrary(text) {
  const books = [];
  let cur = null;
  for (const line of text.split(/\r?\n/)) {
    const h = line.match(/^## `([a-zA-Z0-9_-]+)\/` — (.+)$/);
    if (h) { cur = { id: h[1], title: h[2].trim(), sections: [] }; books.push(cur); continue; }
    const e = line.match(/^\s+- `([^`]+\.md)` \*\*(.*?)\*\*(.*)$/);
    if (cur && e && safePath(e[1])) {
      cur.sections.push({ book: cur.id, section: e[1], title: e[2], summary: e[3].replace(/^\s*[—-]\s*/, '').trim() });
    }
  }
  return books.filter((b) => b.sections.length);
}

// Markdown → safe HTML with KaTeX maths and links resolved against the chapter's URL.
function renderMarkdown(text, docPath, bookIds) {
  const math = [];
  const keep = (tex, display) => { math.push({ tex, display }); return `@@MATH${math.length - 1}@@`; };
  let src = text
    .replace(/```math\n([\s\S]*?)```/g, (_, t) => keep(t, true))
    .replace(/\$\$([\s\S]+?)\$\$/g, (_, t) => keep(t, true))
    .replace(/\$`([^`]+)`\$/g, (_, t) => keep(t, false))
    .replace(/(^|[^\\$])\$(?!\s)([^$\n]+?)(?<!\s)\$(?!\d)/g, (_, pre, t) => pre + keep(t, false));
  let html = DOMPurify.sanitize(marked.parse(src, { gfm: true }), { ADD_ATTR: ['target'] });
  html = html.replace(/@@MATH(\d+)@@/g, (_, i) => {
    const m = math[+i];
    try { return katex.renderToString(m.tex, { displayMode: m.display, throwOnError: false, output: 'html' }); }
    catch (e) { return `<code>${m.tex.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]))}</code>`; }
  });
  const tpl = document.createElement('template');
  tpl.innerHTML = html;
  const here = new URL(fileUrl(docPath));
  tpl.content.querySelectorAll('img[src]').forEach((img) => {
    img.src = new URL(img.getAttribute('src'), here).href; img.loading = 'lazy';
  });
  tpl.content.querySelectorAll('a[href]').forEach((a) => {
    const raw = a.getAttribute('href');
    if (raw.startsWith('#')) return;
    const u = new URL(raw, here);
    if (u.origin === here.origin && u.pathname.endsWith('.md')) {
      const parts = decodeURIComponent(u.pathname).replace(/^\//, '').split('/');
      if (bookIds.has(parts[0])) { a.setAttribute('href', `#/b/${parts[0]}/${encodeURIComponent(parts.slice(1).join('/'))}${u.hash}`); return; }
    }
    a.href = u.href; a.target = '_blank'; a.rel = 'noopener';
  });
  return tpl.innerHTML;
}

const PIXEL = [
  '███  ███   ███ ',
  '█  █ █  █ █    ',
  '███  ███  █ ██ ',
  '█  █ █ █  █  █ ',
  '███  █  █  ███ ',
].join('\n');

const COMMANDS = [
  { cmd: '/help', help: 'list the commands' },
  { cmd: '/books', help: 'list the books, theses and papers' },
  { cmd: '/book', help: '<id> list the chapters of one book', arg: true },
  { cmd: '/search', help: '<words> search chapter titles and summaries', arg: true },
  { cmd: '/read', help: '<book>/<chapter.md> [start] [lines] print part of a chapter', arg: true },
  { cmd: '/open', help: '<book>/<chapter.md> open a chapter in the reader', arg: true },
  { cmd: '/clear', help: 'clear the transcript' },
];

createApp({
  setup() {
    const state = ref('loading');
    const error = ref('');
    const books = ref([]);
    const query = ref('');
    const route = reactive({ view: 'list', group: 'books', book: '', section: '' });
    const doc = reactive({ state: 'idle', html: '', error: '', path: '' });
    const libraryUrl = fileUrl(cfg.libraryPath);
    const host = new URL(base).host;

    const groupOf = (id) => cfg.groupOf[id] || 'books';
    const groupLabel = (g) => (cfg.groups.find((x) => x.id === g) || cfg.groups[0]).label;
    const grouped = computed(() => Object.fromEntries(cfg.groups.map((g) => [g.id, books.value.filter((b) => groupOf(b.id) === g.id)])));
    const bookIds = computed(() => new Set(books.value.map((b) => b.id)));
    const book = computed(() => books.value.find((b) => b.id === route.book));
    const bookTitle = (id) => (books.value.find((b) => b.id === id) || {}).title || id;
    const sectionCount = computed(() => books.value.reduce((n, b) => n + b.sections.length, 0));
    const allSections = computed(() => books.value.flatMap((b) => b.sections));
    const search = (q, pool) => {
      const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
      if (!terms.length) return [];
      return pool.filter((s) => terms.every((t) => (s.title + ' ' + s.summary).toLowerCase().includes(t)));
    };
    const hits = computed(() => search(query.value, grouped.value[route.group].flatMap((b) => b.sections)));
    const idx = computed(() => (book.value ? book.value.sections.findIndex((s) => s.section === route.section) : -1));
    const prev = computed(() => (idx.value > 0 ? book.value.sections[idx.value - 1] : null));
    const next = computed(() => (book.value && idx.value >= 0 && idx.value < book.value.sections.length - 1 ? book.value.sections[idx.value + 1] : null));
    const sectionTitle = computed(() => {
      const s = book.value && book.value.sections.find((x) => x.section === route.section);
      return s ? s.title : route.section.replace('.md', '');
    });
    const readerHref = (id, section) => `#/b/${id}/${encodeURIComponent(section)}`;
    const docUrl = computed(() => fileUrl(`${route.book}/${route.section}`));

    // Routing: #/books  #/theses  #/papers  #/terminal  #/b/<id>  #/b/<id>/<chapter.md>
    function parseHash() {
      const h = location.hash.replace(/^#\/?/, '');
      const [head, id, ...rest] = h.split('/');
      if (head === 'terminal') Object.assign(route, { view: 'terminal' });
      else if (head === 'b' && id) {
        const section = rest.length ? decodeURIComponent(rest.join('/')) : '';
        Object.assign(route, { view: section ? 'read' : 'book', book: id, section });
      } else Object.assign(route, { view: 'list', group: cfg.groups.some((g) => g.id === head) ? head : 'books' });
      if (route.view !== 'terminal') scrollTo(0, 0);
    }
    addEventListener('hashchange', parseHash);
    parseHash();

    const textCache = new Map();
    async function getText(path) {
      if (!safePath(path)) throw new Error('That is not a library file path.');
      if (textCache.has(path)) return textCache.get(path);
      const res = await fetch(fileUrl(path), { mode: 'cors', credentials: 'omit' });
      if (!res.ok) throw new Error(`The library returned HTTP ${res.status} for ${path}.`);
      const t = await res.text();
      textCache.set(path, t);
      return t;
    }

    async function loadDoc() {
      if (route.view !== 'read') return;
      const path = `${route.book}/${route.section}`;
      Object.assign(doc, { state: 'loading', path, html: '', error: '' });
      try {
        const t = await getText(path);
        if (doc.path !== path) return;
        Object.assign(doc, { state: 'ready', html: renderMarkdown(t, path, bookIds.value) });
      } catch (e) {
        if (doc.path === path) Object.assign(doc, { state: 'error', error: e.message + ' Some books do not have every extra page.' });
      }
    }
    watch(() => [route.view, route.book, route.section, state.value], loadDoc);

    async function loadLibrary() {
      try {
        books.value = parseLibrary(await getText(cfg.libraryPath));
        if (!books.value.length) throw new Error('LIBRARY.md has no entries in the expected format.');
        state.value = 'ready';
      } catch (e) {
        state.value = 'error';
        error.value = e instanceof TypeError ? 'The browser could not reach the book bucket (network or CORS).' : e.message;
      }
    }
    const start = () => { if (state.value === 'loading' && !books.value.length) loadLibrary(); };
    onMounted(start);

    // ---- BRG terminal ----
    const log = ref([]);
    const input = ref('');
    const busy = ref(false);
    const history = [];
    let hpos = 0;
    const chat = [];
    const menuIndex = ref(0);
    const logEl = ref(null);
    const prompt = ref(null);
    const say = (text, kind = 'out', href) => { log.value.push({ text, kind, href }); nextTick(() => { if (logEl.value) logEl.value.scrollTop = logEl.value.scrollHeight; }); };
    say('BRG terminal for the CAS library. Type /help for commands.', 'dim');
    say(cfg.chatEndpoint ? 'Ask a question, or use a command.' : 'Search mode: type words to search the library, or a command. AI answers are not connected yet.', 'dim');

    const menuItems = computed(() => {
      const v = input.value;
      if (!v.startsWith('/') || v.includes(' ')) return [];
      return COMMANDS.filter((c) => c.cmd.startsWith(v.toLowerCase()));
    });
    watch(menuItems, () => { menuIndex.value = 0; });
    const takeMenu = (m) => { input.value = m.cmd + (m.arg ? ' ' : ''); if (!m.arg) submit(); prompt.value && prompt.value.focus(); };
    const focusPrompt = () => { if (!getSelection().toString()) prompt.value && prompt.value.focus(); };

    function onKey(e) {
      const items = menuItems.value;
      if (items.length && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        e.preventDefault(); menuIndex.value = (menuIndex.value + (e.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length; return;
      }
      if (items.length && e.key === 'Tab') { e.preventDefault(); takeMenu(items[menuIndex.value]); return; }
      if (items.length && e.key === 'Enter' && input.value !== items[menuIndex.value].cmd) { e.preventDefault(); takeMenu(items[menuIndex.value]); return; }
      if (e.key === 'Escape') { input.value = ''; return; }
      if (!items.length && (e.key === 'ArrowUp' || e.key === 'ArrowDown') && history.length) {
        e.preventDefault(); hpos = Math.max(0, Math.min(history.length, hpos + (e.key === 'ArrowUp' ? -1 : 1))); input.value = history[hpos] || '';
      }
    }

    const ready = () => { if (state.value !== 'ready') { say(state.value === 'loading' ? 'The library is still loading.' : 'The library is not available: ' + error.value, 'err'); return false; } return true; };
    const showHits = (list) => {
      if (!list.length) { say('No chapters match.', 'dim'); return; }
      list.slice(0, 12).forEach((s) => say(`${s.book}/${s.section}  ${s.title}${s.summary ? ' — ' + s.summary : ''}`, 'out', readerHref(s.book, s.section)));
      if (list.length > 12) say(`… ${list.length - 12} more. Narrow the search.`, 'dim');
    };
    const splitRef = (ref_) => { const i = ref_.indexOf('/'); return i < 0 ? [ref_, ''] : [ref_.slice(0, i), ref_.slice(i + 1)]; };

    async function submit() {
      const line = input.value.trim();
      input.value = '';
      if (!line) return;
      history.push(line); hpos = history.length;
      say('> ' + line, 'cmd');
      const [cmd, ...args] = line.split(/\s+/);
      const arg = args.join(' ');
      try {
        busy.value = true;
        if (cmd === '/help' || cmd === '?') COMMANDS.forEach((c) => say(`${c.cmd.padEnd(8)} ${c.help}`));
        else if (cmd === '/clear') log.value = [];
        else if (cmd === '/books') { if (ready()) books.value.forEach((b) => say(`${b.id.padEnd(28)} ${b.title} (${b.sections.length})`, 'out', '#/b/' + b.id)); }
        else if (cmd === '/book') {
          if (!ready()) return;
          const b = books.value.find((x) => x.id === arg);
          if (!b) say('Unknown book ID. Try /books.', 'err');
          else b.sections.forEach((s) => say(`${s.section.padEnd(28)} ${s.title}`, 'out', readerHref(b.id, s.section)));
        } else if (cmd === '/search') { if (ready()) showHits(search(arg, allSections.value)); }
        else if (cmd === '/read' || cmd === '/open') {
          if (!ready()) return;
          const [id, section] = splitRef(args[0] || '');
          if (!id || !section) { say(`Usage: ${cmd} <book>/<chapter.md>`, 'err'); return; }
          if (cmd === '/open') { location.hash = readerHref(id, section); return; }
          const startLine = Math.max(1, parseInt(args[1] || '1', 10) || 1);
          const count = Math.min(200, Math.max(1, parseInt(args[2] || '40', 10) || 40));
          const lines = (await getText(`${id}/${section}`)).split(/\r?\n/);
          lines.slice(startLine - 1, startLine - 1 + count).forEach((l) => say(l || ' ', 'text'));
          const nextStart = startLine + count;
          say(nextStart <= lines.length ? `lines ${startLine}–${nextStart - 1} of ${lines.length} · next: /read ${id}/${section} ${nextStart}` : `end of chapter (${lines.length} lines)`, 'dim');
        } else if (cmd.startsWith('/')) say('Unknown command. Type /help.', 'err');
        else if (cfg.chatEndpoint) {
          chat.push({ role: 'user', content: line });
          const res = await fetch(cfg.chatEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: chat }) });
          if (!res.ok) throw new Error(`The chat service returned HTTP ${res.status}.`);
          const { reply } = await res.json();
          chat.push({ role: 'assistant', content: reply });
          reply.split('\n').forEach((l) => say(l || ' ', 'text'));
        } else if (ready()) showHits(search(line, allSections.value));
      } catch (e) { say(e.message, 'err'); }
      finally { busy.value = false; }
    }
    watch(() => route.view, (v) => { if (v === 'terminal') nextTick(() => prompt.value && prompt.value.focus()); });

    return {
      cfg, state, error, books, query, route, doc, libraryUrl, host, grouped, book, bookTitle, sectionCount, hits,
      prev, next, sectionTitle, readerHref, docUrl, groupOf, groupLabel,
      pixel: PIXEL, log, input, busy, menuItems, menuIndex, takeMenu, onKey, submit, focusPrompt, prompt, logEl,
    };
  },
}).mount('#app');
