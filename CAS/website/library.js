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
  let cur = null, heading = '';
  for (const line of text.split(/\r?\n/)) {
    const g = line.match(/^#{1}\s+(.+)$/);           // "# Papers" etc. groups the entries below it
    if (g) { heading = g[1].trim(); continue; }
    const h = line.match(/^## `([a-zA-Z0-9_-]+)\/` — (.+)$/);
    if (h) { cur = { id: h[1], title: h[2].trim(), heading, sections: [] }; books.push(cur); continue; }
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

// BRG in square pixels (5 rows, letters 4 wide with a 1-pixel gap), coloured along the blue→pink ramp.
// Which tab an entry belongs to: config override, then a "# Theses"/"# Papers" heading in
// LIBRARY.md, then words in its ID or title. Everything else is a book.
const THESIS_RE = /\b(theses|thesis|ph\.?\s?d|dissertation|doctoral|diss\.)\b|theses|thesis/i;
const PAPER_RE = /\b(papers?|publications?|articles?|journal|proceedings|conference|symposium|iass|doi)\b|papers|publications/i;
function classify(b) {
  if (cfg.groupOf[b.id]) return cfg.groupOf[b.id];
  if (THESIS_RE.test(b.heading) || /thes/i.test(b.heading)) return 'theses';
  if (PAPER_RE.test(b.heading)) return 'papers';
  if (THESIS_RE.test(b.id) || THESIS_RE.test(b.title)) return 'theses';
  if (PAPER_RE.test(b.id) || PAPER_RE.test(b.title)) return 'papers';
  return 'books';
}
// A folder that holds many theses or papers (e.g. brg-theses/) shows each chapter file as its own item.
const isCollection = (b) => b.sections.length > 1 && /(^|[-_])(theses|papers|publications|articles|brg-pub)/i.test(b.id);
// "La statique graphique, Maurice Lévy, 1886" -> title / author / year, for the covers.
function splitTitle(t) {
  const parts = t.split(/,\s+/);
  const year = parts.length > 1 && /^\d{4}/.test(parts[parts.length - 1]) ? parts.pop() : '';
  const author = parts.length > 1 ? parts.slice(1).join(', ') : '';
  return { title: parts[0], author, year };
}
// Subjects, each with its own clearly different colour. An entry's subject is the one whose words appear
// most often in its title and chapter titles/summaries (ties: the earlier, more specific one).
const SUBJECTS = [
  { id: 'gs', label: 'Graphic statics', color: '#6a46c2', re: /graphi(c|que|cal)|statique|statics|graphostati|kräfteplan|cremona|funicular polygon|force polygon|reciprocal|equilibrium/gi },
  { id: 'ff', label: 'Form finding', color: '#a65812', re: /form[- ]?finding|force density|dynamic relaxation|cable|membrane|tensile|tension|net\b|nets\b|knit|formfinder/gi },
  { id: 'tna', label: 'Thrust networks & masonry', color: '#b33a62', re: /thrust|masonry|vault|shell|arch(es)?\b|dome|voussoir|compression|rhinovault|stability|mauerwerk|gewölbe/gi },
  { id: 'mat', label: 'Materialization', color: '#4d7a2c', re: /fabricat|construct|robot|assembl|discrete element|formwork|materiali|timber|concrete|print|prototype|building/gi },
  { id: 'comp', label: 'Computation', color: '#18867a', re: /comput|algorithm|geometr|code|program|compas|optimi|mesh|digital|numerical|parametric/gi },
  { id: 'sd', label: 'Structural design & history', color: '#2f56b0', re: /structur|tragwerk|design|history|histor|statik|engineering|faustformel/gi },
];
function subjectOf(text) {
  let best = SUBJECTS[SUBJECTS.length - 1], top = 0;
  for (const sub of SUBJECTS) { const n = (text.match(sub.re) || []).length; if (n > top) { top = n; best = sub; } }
  return best;
}
const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
// Short cover title: the title without author, year or subtitle; a part number from the ID.
function shortTitle(title, id = '') {
  let t = splitTitle(title).title.split(/\s*[:(—–]\s*|\s+-\s+/)[0].trim();
  const part = id.match(/(?:part|vol|band|teil)[-_]?(\d+)/i);
  if (t.length > 42) { const cut = t.slice(0, 42); t = cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;]+(and|for|of|the|a|an|in|on|und|der|die|das|de|la|le)$/i, '') + '…'; }
  if (part && !/\b(part|vol|teil|band|[IVX]+)\b/i.test(t)) t += ' ' + (ROMAN[+part[1]] || part[1]);
  return t;
}

// Cover: only the short title, on the colour of the entry's subject.
const BookCover = {
  props: { title: String, color: String },
  // Shrink the title until its longest word fits the cover (long German compounds).
  mounted() { this.fit(); document.fonts && document.fonts.ready.then(() => this.fit()); this.ro = new ResizeObserver(() => this.fit()); this.ro.observe(this.$el); },
  beforeUnmount() { this.ro && this.ro.disconnect(); },
  updated() { this.fit(); },
  methods: {
    fit() {
      // Titles hyphenate (CSS hyphens: auto); only a word that still overflows shrinks the title.
      const b = this.$el.querySelector('.cover-gen b');
      if (!b) return;
      b.style.fontSize = '';
      let size = parseFloat(getComputedStyle(b).fontSize);
      while (b.scrollWidth > b.clientWidth + 0.5 && size > 11) { size -= 0.5; b.style.fontSize = size + 'px'; }
    },
  },
  computed: {
    // Language of the title, so the browser hyphenates German and French titles correctly.
    lang() {
      const t = ` ${(this.title || '').toLowerCase()} `;
      if (/[äöüß]|\b(und|der|die|das|des|im|zur|für)\b|tragwerk|statik|bau/.test(t)) return 'de';
      if (/[éèêàç]|\b(la|le|les|du|et|des)\b|statique/.test(t)) return 'fr';
      return 'en';
    },
  },
  template: `<span class="cover" :style="{ '--cc': color }"><span class="cover-gen"><i></i><b :lang="lang">{{ title }}</b></span></span>`,
};

const PIXEL_ROWS = [
  '###  ###   ###',
  '#  # #  # #   ',
  '###  ###  # ##',
  '#  # # #  #  #',
  '###  #  #  ###',
].map((r) => r.replace(/ /g, '.'));
const RAMP = ['#3057b1', '#5552bb', '#7750c1', '#934abd', '#ae4bb2', '#ca49a4', '#dc4b8d'];
const PIXEL_COLS = PIXEL_ROWS[0].length;
const PIXEL = PIXEL_ROWS.flatMap((row) => [...row].map((ch, x) => (ch === '#' ? RAMP[Math.round((x / (PIXEL_COLS - 1)) * (RAMP.length - 1))] : null)));

const COMMANDS = [
  { cmd: '/help', help: 'list the commands' },
  { cmd: '/books', help: 'show the books, theses and papers' },
  { cmd: '/book', help: '<id> show the chapters of one book', arg: true },
  { cmd: '/search', help: '<words> search chapter titles and summaries', arg: true },
  { cmd: '/open', help: '<book>/<chapter.md> show a chapter in the viewer', arg: true },
  { cmd: '/read', help: '<book>/<chapter.md> [start] [lines] print lines here, show the chapter there', arg: true },
  { cmd: '/figures', help: '<book>/<chapter.md> show every figure of a chapter', arg: true },
  { cmd: '/drawings', help: 'show the eQUILIBRIUM step-by-step drawings' },
  { cmd: '/drawing', help: '<n> [step] play drawing n in the viewer', arg: true },
  { cmd: '/clear', help: 'clear the transcript' },
];
// The eQUILIBRIUM step-by-step player, on the same GitHub Pages site.
const PLAYER = '../../2_computational_form_finding/Equilibrium/drawings/web/';

createApp({
  components: { BookCover },
  setup() {
    const state = ref('loading');
    const error = ref('');
    const books = ref([]);
    const query = ref('');
    const route = reactive({ view: 'list', group: 'books', book: '', section: '' });
    const doc = reactive({ state: 'idle', html: '', error: '', path: '' });
    const libraryUrl = fileUrl(cfg.libraryPath);
    const host = new URL(base).host;

    const groupOf = (id) => { const b = books.value.find((x) => x.id === id); return b ? classify(b) : (cfg.groupOf[id] || 'books'); };
    // Shelf items per tab: whole books, or one item per file for collections of theses/papers.
    // Subject and cover of a whole entry, or of one item of a collection.
    const bookText = (b) => [b.title, ...b.sections.map((x) => x.title + ' ' + x.summary)].join(' ');
    const coverOf = (b) => ({ short: shortTitle(b.title, b.id), subject: subjectOf(bookText(b)) });
    const subject = ref('');
    // Shelf items per tab: whole books, or one item per file for collections of theses/papers.
    const shelfAll = computed(() => Object.fromEntries(cfg.groups.map((g) => [g.id, books.value.filter((b) => classify(b) === g.id).flatMap((b) =>
      isCollection(b) && g.id !== 'books'
        ? b.sections.map((x) => ({ key: b.id + '/' + x.section, id: b.id, title: x.title, short: shortTitle(x.title), subject: subjectOf(x.title + ' ' + x.summary), href: readerHref(b.id, x.section), meta: x.summary }))
        : [{ key: b.id, id: b.id, title: b.title, ...coverOf(b), href: '#/b/' + b.id, meta: `${b.sections.length} chapter${b.sections.length === 1 ? '' : 's'}` }])])));
    const shelf = computed(() => Object.fromEntries(Object.entries(shelfAll.value).map(([g, items]) => [g, subject.value ? items.filter((i) => i.subject.id === subject.value) : items])));
    // Subject chips for the open tab, with counts.
    const subjectsHere = computed(() => SUBJECTS.map((x) => ({ ...x, n: (shelfAll.value[route.group] || []).filter((i) => i.subject.id === x.id).length })).filter((x) => x.n));
    const groupLabel = (g) => (cfg.groups.find((x) => x.id === g) || cfg.groups[0]).label;
    const grouped = computed(() => Object.fromEntries(cfg.groups.map((g) => [g.id, books.value.filter((b) => classify(b) === g.id)])));
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
      // 1) the copy the Pages deploy makes (same site, no CORS needed); 2) the R2 bucket directly.
      let res = null;
      if (cfg.mirrorPath) {
        try { res = await fetch(`${cfg.mirrorPath}/${path.split('/').map(encodeURIComponent).join('/')}`, { cache: 'no-cache' }); } catch (e) { res = null; }
        if (res && !res.ok) res = null;
      }
      if (!res) res = await fetch(fileUrl(path), { mode: 'cors', credentials: 'omit' });
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

    // ---- BRG terminal: CLI on the right, session viewer on the left ----
    const log = ref([]);
    const input = ref('');
    const busy = ref(false);
    const history = [];
    let hpos = 0;
    const chat = [];
    const menuIndex = ref(0);
    const logEl = ref(null);
    const prompt = ref(null);
    const viewerEl = ref(null);
    const drawingIds = ref([]);
    const gridEl = ref(null);
    let unmountGrid = null;
    const say = (text, kind = 'out', act) => { log.value.push({ text, kind, act }); nextTick(() => { if (logEl.value) logEl.value.scrollTop = logEl.value.scrollHeight; }); };
    say('BRG terminal for the CAS library. Type /help for commands.', 'dim');
    say(cfg.chatEndpoint ? 'Ask a question, or use a command.' : 'Search mode: type words to search the library, or a command. AI answers are not connected yet.', 'dim');
    say('Pictures, chapters and drawings open on the left.', 'dim');

    // Viewer: what is on screen, with a back stack of the commands that produced it.
    const view = reactive({ kind: 'welcome', title: '', open: '', html: '', items: [], src: '', error: '', showBook: false });
    const viewStack = ref(['']);
    const setView = (v) => { Object.assign(view, { open: '', html: '', items: [], src: '', error: '', showBook: false }, v); if (viewerEl.value) viewerEl.value.scrollTop = 0; };
    const remember = (cmd) => { if (viewStack.value[viewStack.value.length - 1] !== cmd) viewStack.value.push(cmd); };
    function viewBack() {
      if (viewStack.value.length < 2) return;
      viewStack.value.pop();
      const cmd = viewStack.value[viewStack.value.length - 1];
      if (cmd) run(cmd, { quiet: true, noRemember: true });
      else setView({ kind: 'welcome', title: '' });
    }
    // Links inside a chapter shown in the viewer stay in the viewer.
    function onViewerClick(e) {
      const a = e.target.closest && e.target.closest('a[href^="#/b/"]');
      if (!a || !viewerEl.value.contains(a)) return;
      e.preventDefault();
      const [, , id, ...rest] = a.getAttribute('href').split('#')[1].split('/');
      if (rest.length) run(`/open ${id}/${decodeURIComponent(rest.join('/'))}`);
      else run(`/book ${id}`);
    }

    async function showDoc(id, section) {
      setView({ kind: 'loading', title: section });
      const html = renderMarkdown(await getText(`${id}/${section}`), `${id}/${section}`, bookIds.value);
      const s = books.value.find((b) => b.id === id)?.sections.find((x) => x.section === section);
      setView({ kind: 'doc', title: `${bookTitle(id)} · ${s ? s.title : section}`, html, open: `library.html${readerHref(id, section)}` });
    }

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
    const showHits = (q, list) => {
      setView({ kind: 'list', title: `Search: ${q} · ${list.length} chapter${list.length === 1 ? '' : 's'}`, items: list, showBook: true });
      if (!list.length) { say('No chapters match.', 'dim'); return; }
      list.slice(0, 12).forEach((s) => say(`${s.book}/${s.section}  ${s.title}`, 'out', `/open ${s.book}/${s.section}`));
      say(list.length > 12 ? `… ${list.length - 12} more in the viewer.` : 'Results are also in the viewer.', 'dim');
    };
    const splitRef = (ref_) => { const i = ref_.indexOf('/'); return i < 0 ? [ref_, ''] : [ref_.slice(0, i), ref_.slice(i + 1)]; };

    async function run(line, opts = {}) {
      line = line.trim();
      if (!line) return;
      if (!opts.quiet) { history.push(line); hpos = history.length; say('> ' + line, 'cmd'); }
      const [cmd, ...args] = line.split(/\s+/);
      const arg = args.join(' ');
      const keep = () => { if (!opts.noRemember) remember(line); };
      try {
        busy.value = true;
        if (cmd === '/help' || cmd === '?') COMMANDS.forEach((c) => say(`${c.cmd.padEnd(10)} ${c.help}`));
        else if (cmd === '/clear') log.value = [];
        else if (cmd === '/books') {
          if (!ready()) return;
          books.value.forEach((b) => say(`${b.id.padEnd(28)} ${b.title} (${b.sections.length})`, 'out', `/book ${b.id}`));
          setView({ kind: 'shelf', title: `Library · ${books.value.length} entries`, open: 'library.html#/books' }); keep();
        } else if (cmd === '/book') {
          if (!ready()) return;
          const b = books.value.find((x) => x.id === arg);
          if (!b) { say('Unknown book ID. Try /books.', 'err'); return; }
          b.sections.forEach((s) => say(`${s.section.padEnd(28)} ${s.title}`, 'out', `/open ${b.id}/${s.section}`));
          setView({ kind: 'list', title: b.title, items: b.sections, open: `library.html#/b/${b.id}` }); keep();
        } else if (cmd === '/search') { if (ready()) { showHits(arg, search(arg, allSections.value)); keep(); } }
        else if (cmd === '/open' || cmd === '/read' || cmd === '/figures') {
          if (!ready()) return;
          const [id, section] = splitRef(args[0] || '');
          if (!id || !section) { say(`Usage: ${cmd} <book>/<chapter.md>`, 'err'); return; }
          if (cmd === '/read') {
            const startLine = Math.max(1, parseInt(args[1] || '1', 10) || 1);
            const count = Math.min(200, Math.max(1, parseInt(args[2] || '40', 10) || 40));
            const lines = (await getText(`${id}/${section}`)).split(/\r?\n/);
            lines.slice(startLine - 1, startLine - 1 + count).forEach((l) => say(l || ' ', 'text'));
            const nextStart = startLine + count;
            if (nextStart <= lines.length) say(`lines ${startLine}–${nextStart - 1} of ${lines.length} · next: /read ${id}/${section} ${nextStart}`, 'dim', `/read ${id}/${section} ${nextStart}`);
            else say(`end of chapter (${lines.length} lines)`, 'dim');
          }
          if (cmd === '/figures') {
            await showDoc(id, section);
            const tpl = document.createElement('template'); tpl.innerHTML = view.html;
            const items = [...tpl.content.querySelectorAll('img')].map((img) => ({ src: img.src, alt: img.alt, name: img.src.split('/').pop() }));
            setView({ kind: 'figures', title: `Figures · ${view.title}`, items, open: view.open });
            say(`${items.length} figure${items.length === 1 ? '' : 's'} in the viewer.`, 'dim');
          } else {
            await showDoc(id, section);
            if (cmd === '/open') say('Chapter shown in the viewer.', 'dim');
          }
          keep();
        } else if (cmd === '/drawings') {
          if (!drawingIds.value.length) {
            const res = await fetch(PLAYER + 'views.json');
            drawingIds.value = res.ok ? await res.json() : [];
          }
          setView({ kind: 'drawings', title: `eQUILIBRIUM drawings · ${drawingIds.value.length}`, open: PLAYER + 'gallery.html' });
          say(`${drawingIds.value.length} drawings in the viewer. Pick one, or type /drawing <n>.`, 'dim'); keep();
        } else if (cmd === '/drawing') {
          const n = parseInt(args[0], 10);
          if (!n) { say('Usage: /drawing <n> [step]', 'err'); return; }
          const step = args[1] ? `&step=${encodeURIComponent(args[1])}` : '';
          const src = `${PLAYER}index.html?view=${n}${step}`;
          setView({ kind: 'drawing', title: `eQUILIBRIUM drawing ${n}`, src, open: src });
          say(`Drawing ${n} playing in the viewer. Use its controls to step through the construction.`, 'dim'); keep();
        } else if (cmd.startsWith('/')) say('Unknown command. Type /help.', 'err');
        else if (cfg.chatEndpoint) {
          chat.push({ role: 'user', content: line });
          const res = await fetch(cfg.chatEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: chat }) });
          if (!res.ok) throw new Error(`The chat service returned HTTP ${res.status}.`);
          const { reply } = await res.json();
          chat.push({ role: 'assistant', content: reply });
          reply.split('\n').forEach((l) => say(l || ' ', 'text'));
        } else if (ready()) { showHits(line, search(line, allSections.value)); keep(); }
      } catch (e) {
        say(e instanceof TypeError ? 'Could not reach the library (network or CORS).' : e.message, 'err');
        if (view.kind === 'loading') setView({ kind: 'error', title: 'Error', error: e.message });
      } finally { busy.value = false; }
    }
    function submit() { const line = input.value; input.value = ''; run(line); }
    // The empty viewer is a 3D grid; mount it whenever its canvas is on screen.
    watch(() => [view.kind, route.view], () => nextTick(() => {
      if (unmountGrid && !(gridEl.value && gridEl.value.isConnected)) { unmountGrid(); unmountGrid = null; }
      if (gridEl.value && !unmountGrid) unmountGrid = window.mountGrid3d(gridEl.value);
    }), { immediate: true });
    watch(() => route.view, (v) => {
      document.body.classList.toggle('term-full', v === 'terminal');
      if (v === 'terminal') nextTick(() => prompt.value && prompt.value.focus());
    }, { immediate: true });

    return {
      cfg, state, error, books, query, route, shelf, shelfAll, subject, subjectsHere, coverOf, doc, libraryUrl, host, grouped, book, bookTitle, sectionCount, hits,
      prev, next, sectionTitle, readerHref, docUrl, groupOf, groupLabel,
      pixel: PIXEL, pixelCols: PIXEL_COLS, log, input, busy, menuItems, menuIndex, takeMenu, onKey, submit, focusPrompt, prompt, logEl,
      view, viewStack, viewBack, viewerEl, onViewerClick, run, drawingIds, gridEl,
    };
  },
}).mount('#app');
