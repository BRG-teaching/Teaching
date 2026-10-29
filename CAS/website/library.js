// Library: reads LIBRARY.md from the R2 bucket and renders books, chapters and a terminal.
// The catalogue format is the one mcp-server-brg parses (src/brg_mcp/adapters/public_books.py):
//   ## `book-id/` — Title, Author, Year
//     - `01-chapter.md` **Chapter title** summary
const { createApp, ref, reactive, computed, watch, nextTick, onMounted, onBeforeUnmount } = Vue;
const cfg = window.CAS_LIBRARY;
const notebookExercises = window.CAS_NOTEBOOKS || [];
const notebookExercise = (id) => notebookExercises.find((tutorial) => tutorial.id === id) || notebookExercises.find((tutorial) => tutorial.id === 'box');
// ?chat=http://localhost:8788 tries a local copy of the Claude service (CAS/brg-terminal-ai/test/serve.mjs).
// Only a local address: a link to another site could otherwise collect the conversation and the key.
// ?anthropic=http://localhost:8790 points the own-key mode at the mock Claude API of those tests.
const LOCAL = /^http:\/\/(localhost|127\.0\.0\.1):\d+\/?$/, devParam = (k) => { const v = new URLSearchParams(location.search).get(k); return v && LOCAL.test(v) ? v : ''; };
if (devParam('chat')) cfg.chatEndpoint = devParam('chat');
// The BRG MCP server, also called from this page for the notebook skills (/box, …). ?mcp=http://localhost:8000/mcp
// tries a local server for the skills only (Claude needs a public address).
const SKILLS_MCP = (() => { const v = new URLSearchParams(location.search).get('mcp'); return v && /^http:\/\/(localhost|127\.0\.0\.1):\d+\/mcp$/.test(v) ? v : cfg.mcpEndpoint; })();
let mcpId = 0;
async function mcpCall(method, params = {}) {
  const res = await fetch(SKILLS_MCP, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' },
    body: JSON.stringify({ jsonrpc: '2.0', id: ++mcpId, method, params }) });
  if (!res.ok) throw new Error(`The BRG MCP server answered HTTP ${res.status}.`);
  const reply = await res.json();
  if (reply.error) throw new Error(reply.error.message);
  return reply.result;
}
// A notebook skill is any MCP tool named *_notebook: compas_box_notebook is /box, and writes a new notebook.
// An addition is any tool named *_add: compas_primitives_add is /add-primitives, and adds to the open notebook.
// Their arguments are the tool's parameters, in order or as name=value (/box 3 2 1, /box zsize=4 color=#ce4095).
const skillName = (tool) => (/_add$/.test(tool) ? '/add-' : '/') + tool.replace(/^compas_/, '').replace(/_(notebook|add)$/, '').replace(/_/g, '-');
function skillOf(tool) {
  const props = tool.inputSchema?.properties || {};
  const args = Object.keys(props);
  const first = (tool.description || '').split(/\n\s*\n/)[0].replace(/\s+/g, ' ').trim();
  return { cmd: skillName(tool.name), tool: tool.name, args, props, skill: true, add: /_add$/.test(tool.name), arg: args.length > 0,
    help: (args.length ? args.map((a) => `[${a}]`).join(' ') + ' ' : '') + first };
}
function skillArguments(skill, words) {
  const out = {};
  let next = 0;
  for (const w of words) {
    const m = w.match(/^([a-z_]\w*)=(.*)$/i);
    const name = m ? m[1] : skill.args[next++];
    if (!name || !(name in skill.props)) throw new Error(`${skill.cmd} takes ${skill.args.join(', ') || 'no arguments'}.`);
    const raw = m ? m[2] : w, type = skill.props[name].type || (skill.props[name].anyOf || [])[0]?.type;
    const value = type === 'number' || type === 'integer' ? Number(raw) : type === 'boolean' ? /^(true|yes|1)$/i.test(raw) : raw;
    if (typeof value === 'number' && !Number.isFinite(value)) throw new Error(`${name} must be a number, not “${raw}”.`);
    out[name] = value;
  }
  return out;
}
// Merge import lines into an imports cell's source: a missing name joins its `from … import` line.
function mergeImports(source, lines) {
  const have = source ? source.split('\n') : [];
  for (const line of lines) {
    const m = line.match(/^from\s+(\S+)\s+import\s+([^()]+)$/);
    const at = m ? have.findIndex((h) => new RegExp(`^from\\s+${m[1].replace(/\./g, '\\.')}\\s+import\\s+[^()]+$`).test(h)) : -1;
    if (at < 0) { if (!have.some((h) => h.trim() === line.trim())) have.push(line); continue; }
    const names = have[at].replace(/^from\s+\S+\s+import\s+/, '').split(',').map((n) => n.trim());
    const missing = m[2].split(',').map((n) => n.trim()).filter((n) => !names.includes(n));
    if (missing.length) have[at] = `from ${m[1]} import ${[...names, ...missing].join(', ')}`;
  }
  return have.join('\n');
}
// asking for the tools also wakes the server (on a free plan it sleeps when unused) before Claude needs it
const skillsLoaded = SKILLS_MCP ? mcpCall('tools/list').then((r) => r.tools.filter((t) => /_(notebook|add)$/.test(t.name)).map(skillOf)).catch(() => []) : Promise.resolve([]);
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
    if (h) { cur = { id: h[1], title: h[2].trim(), heading, sections: [], processed: '' }; books.push(cur); continue; }
    const d = cur && !cur.sections.length && line.match(/^\d+ files? · processed (\d{4}-\d{2}-\d{2})\s*$/);
    if (d) { cur.processed = d[1]; continue; }
    const e = line.match(/^\s+- `([^`]+\.md)` \*\*(.*?)\*\*(.*)$/);
    if (cur && e && safePath(e[1])) {
      const when = e[3].match(/ · processed (\d{4}-\d{2}-\d{2})\)/);
      cur.sections.push({ book: cur.id, section: e[1], title: e[2], processed: when ? when[1] : '',
        summary: e[3].replace(/ · processed \d{4}-\d{2}-\d{2}\)/, ')').replace(/^\s*[—-]\s*/, '').trim() });
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

// A short citation from a catalogue title such as "Graphic Statics · and its Applications … · Maurice Lévy ·
// Second edition · Part I: … · Paris, Gauthier-Villars, 1886" → "Maurice Lévy, Graphic Statics, Part I (1886)".
function citeBook(title) {
  if (!title.includes(' · ')) { const t = splitTitle(title); return `${t.author ? t.author + ', ' : ''}${t.title}${t.year ? ' (' + t.year + ')' : ''}`; }
  const parts = title.split(' · '), main = parts[0];
  const author = parts.slice(1).find((x) => /^(?:[A-ZÀ-Ý][a-zà-ÿ'’-]+\.?\s?){2,3}$/.test(x.trim()));
  const part = (parts.find((x) => /^(Part|Vol\.?|Volume|Band|Teil)\s+[IVX\d]+/i.test(x)) || '').match(/^\S+\s+[IVX\d]+/);
  const year = (parts[parts.length - 1].match(/\b(1[5-9]\d\d|20\d\d)\b/) || [])[1];
  return `${author ? author + ', ' : ''}${main}${part ? ', ' + part[0] : ''}${year ? ' (' + year + ')' : ''}`;
}
// A catalogue title "Graphic Statics · and its Applications to Construction · La Statique … · Maurice Lévy ·
// Second edition · Part II (IIᵉ partie): Flexion plane. … · Paris, Gauthier-Villars, 1886" → the parts a reader needs:
// name "Graphic Statics and its Applications to Construction", author, part "Part II", part title, year.
function bookInfo(title) {
  if (!title.includes(' · ')) { const t = splitTitle(title); return { name: t.title, author: t.author, year: t.year, part: '', partTitle: '' }; }
  const parts = title.split(' · ').map((x) => x.trim());
  let name = parts[0];
  if (parts[1] && /^(and|or|und|et)\b/i.test(parts[1])) name += ' ' + parts[1];        // "… and its Applications …"
  else if (parts[1] && /^(A|An|The)\s/.test(parts[1])) name += ': ' + parts[1];       // subtitle "A Text Book on …"
  // author segments: two to four capitalised words ("Maurice Lévy", "William S. Wolfe, M.S.", "Joseph Schwartz (…)")
  const NAME = /^[A-ZÀ-Ý][\wÀ-ÿ'’.-]*(?:\s+[A-ZÀ-Ý][\wÀ-ÿ'’.-]*){1,3}(?:,\s*M\.S\.)?$/u, NOT = /edition|impression|ETH|Zürich|Paris|Press|University|Company|Verlag|Group|Tragwerk|Faustformel|Statique|Graphique|Structural|Design|Analysis/i;
  const author = parts.slice(1).map((x) => x.replace(/\s*\([^)]*\)$/, '').replace(/,\s*M\.S\.$/, ''))
    .filter((x) => NAME.test(x) && !NOT.test(x)).join(', ');
  const p = parts.find((x) => /^(Part|Vol\.?|Volume|Band|Teil)\s+[IVX\d]+/i.test(x)) || '';
  const pm = p.match(/^(\S+\s+[IVX\d]+)(?:\s*\([^)]*\))?\s*:?\s*(.*)$/);
  // the English part title only: drop a French/German original given in brackets
  const partTitle = pm ? pm[2].replace(/\s*\([^)]*\)\s*$/, '').replace(/\.$/, '') : '';
  // the year of the imprint: the last segment that names one
  const year = ([...parts].reverse().map((x) => (x.match(/\b(1[5-9]\d\d|20\d\d)\b/) || [])[1]).find(Boolean)) || '';
  return { name, author, year, part: pm ? pm[1] : '', partTitle };
}
// Books published in several parts (folders "<id>", "<id>-part-2", …) form one series, read part after part.
const seriesKey = (id) => id.replace(/-(?:part|vol|band|teil)-?\d+$/i, '');
const partNo = (id) => +((id.match(/-(?:part|vol|band|teil)-?(\d+)$/i) || [])[1] || 1);
// Printed pages. The chapters keep the books' page markers, <sub>page N</sub>. Text before the first marker means
// a marker closes its page; otherwise it opens it. pageMap gives every line its printed page (0: unknown).
const PAGE_MARK = /<sub>\s*(?:page|p\.)\s*(\d+)\s*<\/sub>/i;
function pageMap(lines) {
  const marks = [];
  lines.forEach((l, i) => { const m = l.match(PAGE_MARK); if (m) marks.push([i, +m[1]]); });
  const pages = new Array(lines.length).fill(0);
  if (!marks.length) return { pages, closing: false };
  const closing = lines.slice(0, marks[0][0]).filter((l) => l.trim() && !/^#|^!\[|^<img/.test(l.trim())).length > 3;
  let k = 0, cur = 0;
  lines.forEach((_, i) => {
    if (closing) { while (k < marks.length && marks[k][0] < i) k++; pages[i] = k < marks.length ? marks[k][1] : marks[marks.length - 1][1] + 1; }
    else { if (k < marks.length && marks[k][0] === i) cur = marks[k++][1]; pages[i] = cur; }
  });
  return { pages, closing };
}
// 112, 113, 114, 118 → "pp. 112–114, 118"
function pageList(list) {
  const ps = [...new Set(list.filter(Boolean))].sort((a, b) => a - b), runs = [];
  for (const q of ps) { const r = runs[runs.length - 1]; if (r && q === r[1] + 1) r[1] = q; else runs.push([q, q]); }
  if (!runs.length) return '';
  return (ps.length > 1 ? 'pp. ' : 'p. ') + runs.map(([a, b]) => (a === b ? a : `${a}–${b}`)).join(', ');
}
const plain = (t) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
// What a graphic statics construction is called in the books (English, French, German), to find its chapter
// and its figure.
// Each word with its weight; `avoid` marks chapters on something else that shares the words (3D reciprocals).

// Cover: only the short title, on the colour of the entry's subject.
const BookCover = {
  props: { title: String, color: String, img: String },
  data: () => ({ failed: false }),
  watch: { img() { this.failed = false; } },
  // Shrink the title until its longest word fits the cover (long German compounds).
  mounted() { this.fit(); document.fonts && document.fonts.ready.then(() => this.fit()); this.ro = new ResizeObserver(() => this.fit()); this.ro.observe(this.$el); },
  beforeUnmount() { this.ro && this.ro.disconnect(); },
  updated() { this.fit(); },
  methods: {
    fit() {
      // Titles hyphenate (CSS hyphens: auto); only a word that still overflows shrinks the title.
      const b = this.$el.querySelector && this.$el.querySelector('.cover-gen b');
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
  template: `<span v-if="img && !failed" class="cover cover-img" :style="{ '--cc': color }"><img :src="img" :alt="title" loading="lazy" @error="failed = true"></span>
    <span v-else class="cover" :style="{ '--cc': color }"><span class="cover-gen"><i></i><b :lang="lang">{{ title }}</b></span></span>`,
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
  { cmd: '/skills', help: 'list the skills of the BRG MCP server: /box, … write a notebook; /add-… add to the open one' },
  { cmd: '/undo', help: 'take back the last /add-… in the open notebook' },
  { cmd: '/notebook', help: '[exercise | list] open a course notebook or list tutorials', arg: true },
  { cmd: '/help', help: 'list the commands' },
  { cmd: '/books', help: 'show the books, theses and papers' },
  { cmd: '/book', help: '<id> show the chapters of one book', arg: true },
  { cmd: '/search', help: '<words> search chapter titles and summaries', arg: true },
  { cmd: '/open', help: '<book>/<chapter.md> show a chapter over the notebook', arg: true },
  { cmd: '/read', help: '<book>/<chapter.md> [start] [lines] print lines here, show the chapter there', arg: true },
  { cmd: '/figures', help: '<book>/<chapter.md> show every figure of a chapter', arg: true },
  { cmd: '/page', help: '<book>/<chapter.md> <page> print a printed page of a book here', arg: true },
  { cmd: '/drawings', help: 'show the eQUILIBRIUM step-by-step drawings' },
  { cmd: '/drawing', help: '<n> [step] play eQUILIBRIUM drawing n over the notebook', arg: true },
  { cmd: '/close', help: 'close the sheet and show the notebook' },
  { cmd: '/clear', help: 'clear the transcript' },
  { cmd: '/new', help: 'start a new conversation with Claude' },
  { cmd: '/stop', help: 'stop Claude’s answer' },
  { cmd: '/key', help: '<key> your Anthropic API key (sk-ant-…) or the class key; /key off removes them', arg: true },
  { cmd: '/usage', help: 'what Claude cost from this browser, and what is left of /budget' },
  { cmd: '/budget', help: '<dollars> the credits you loaded, to estimate what is left', arg: true },
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
    const route = reactive({ view: 'list', workspace: 'notebook', exercise: 'box', group: 'books', book: '', section: '', page: 0 });
    const doc = reactive({ state: 'idle', html: '', error: '', path: '' });
    const libraryUrl = fileUrl(cfg.libraryPath);
    const host = new URL(base).host;

    const groupOf = (id) => { const b = books.value.find((x) => x.id === id); return b ? classify(b) : (cfg.groupOf[id] || 'books'); };
    // Shelf items per tab: whole books, or one item per file for collections of theses/papers.
    // Subject and cover of a whole entry, or of one item of a collection.
    const bookText = (b) => [b.title, ...b.sections.map((x) => x.title + ' ' + x.summary)].join(' ');
    const coverOf = (b) => ({ short: shortTitle(bookInfo(b.title).name, b.id), subject: subjectOf(bookText(b)) });
    const subject = ref('');
    // Shelf items per tab: whole books, or one item per file for collections of theses/papers.
    // Series: books in several parts, keyed by the first part's ID, parts in reading order.
    const seriesAll = computed(() => {
      const m = {};
      for (const b of books.value) if (classify(b) === 'books') (m[seriesKey(b.id)] = m[seriesKey(b.id)] || []).push(b);
      for (const k of Object.keys(m)) { if (m[k].length < 2) delete m[k]; else m[k].sort((a, b) => partNo(a.id) - partNo(b.id)); }
      return m;
    });
    const partsOf = (id) => seriesAll.value[seriesKey(id)] || null;
    // A scanned book's own cover or title page, <book>/cover.jpg in the bucket (generated cover when missing).
    const coverImg = (id) => fileUrl(`${id}/cover.jpg`);
    const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;
    const years = (list) => { const y = list.map((b) => bookInfo(b.title).year).filter(Boolean); return y.length ? (y[0] === y[y.length - 1] ? y[0] : `${y[0]}–${y[y.length - 1]}`) : ''; };
    const seriesItem = (k) => {
      const ps = seriesAll.value[k], i = bookInfo(ps[0].title);
      return { key: 's:' + k, id: k, series: true, title: i.name, name: i.name, byline: [i.author, years(ps)].filter(Boolean).join(' · '),
        short: shortTitle(i.name), subject: coverOf(ps[0]).subject, href: '#/s/' + k, img: coverImg(ps[0].id),
        meta: `${plural(ps.length, 'part')} · ${plural(ps.reduce((n, b) => n + b.sections.length, 0), 'chapter')}`,
        processed: ps.map((b) => b.processed).filter(Boolean).sort().pop() || '' };
    };
    const bookItem = (b) => {
      const i = bookInfo(b.title);
      return { key: b.id, id: b.id, title: b.title, name: i.name, byline: [i.author, i.year].filter(Boolean).join(' · '), ...coverOf(b),
        href: '#/b/' + b.id, img: classify(b) === 'books' ? coverImg(b.id) : '', meta: plural(b.sections.length, 'chapter'), processed: b.processed };
    };
    const shelfAll = computed(() => Object.fromEntries(cfg.groups.map((g) => [g.id, books.value.filter((b) => classify(b) === g.id).flatMap((b) => {
      if (isCollection(b) && g.id !== 'books')
        return b.sections.map((x) => ({ key: b.id + '/' + x.section, id: b.id, title: x.title, name: x.title, byline: '', short: shortTitle(x.title), subject: subjectOf(x.title + ' ' + x.summary), href: readerHref(b.id, x.section), meta: x.summary, processed: x.processed }));
      const ps = g.id === 'books' && partsOf(b.id);
      if (ps) return ps[0].id === b.id ? [seriesItem(seriesKey(b.id))] : []; // one card per series, at its first part
      return [bookItem(b)];
    })])));
    const series = computed(() => (route.view === 'series' && seriesAll.value[route.book]) || null);
    // The open book as a part of its series: "Part II — Plane bending …", with the series around it.
    const partInfo = (b) => { const i = bookInfo(b.title); return { ...i, label: i.part || 'Part ' + (ROMAN[partNo(b.id)] || partNo(b.id)), partTitle: i.partTitle || (i.part ? '' : i.name) }; };
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
    // Previous/next chapter; a series reads on across its parts (last chapter of Part I → first of Part II).
    const neighbourPart = (d) => { const ps = book.value && partsOf(book.value.id); if (!ps) return null; const k = ps.findIndex((b) => b.id === book.value.id) + d; return ps[k] || null; };
    const prev = computed(() => {
      if (idx.value > 0) return book.value.sections[idx.value - 1];
      const p = idx.value === 0 && neighbourPart(-1);
      return p ? { ...p.sections[p.sections.length - 1], book: p.id, title: `${partInfo(p).label} · ${p.sections[p.sections.length - 1].title}` } : null;
    });
    const next = computed(() => {
      if (book.value && idx.value >= 0 && idx.value < book.value.sections.length - 1) return book.value.sections[idx.value + 1];
      const p = book.value && idx.value === book.value.sections.length - 1 && neighbourPart(1);
      return p ? { ...p.sections[0], book: p.id, title: `${partInfo(p).label} · ${p.sections[0].title}` } : null;
    });
    const sectionTitle = computed(() => {
      const s = book.value && book.value.sections.find((x) => x.section === route.section);
      return s ? s.title : route.section.replace('.md', '');
    });
    const readerHref = (id, section, page) => `#/b/${id}/${encodeURIComponent(section)}${page ? '?p=' + page : ''}`;
    // the address of a chapter (at a printed page) on this site, to cite
    const bookLink = (id, section, page) => new URL('library.html' + readerHref(id, section, page), location.href).href;
    const docUrl = computed(() => fileUrl(`${route.book}/${route.section}`));

    // Routing: #/books  #/theses  #/papers  #/terminal  #/b/<id>  #/b/<id>/<chapter.md>
    function parseHash() {
      const [h, query = ''] = location.hash.replace(/^#\/?/, '').split('?');
      const [head, id, ...rest] = h.split('/');
      route.page = +new URLSearchParams(query).get('p') || 0;
      // #/terminal is the old address of the terminal: it opens Jupyter + BRG too
      if (head === 'terminal' || head === 'notebook') Object.assign(route, { view: 'terminal', workspace: 'notebook', exercise: notebookExercise(id)?.id || 'box' });
      else if (head === 's' && id) Object.assign(route, { view: 'series', book: id, section: '' });
      else if (head === 'b' && id) {
        const section = rest.length ? decodeURIComponent(rest.join('/')) : '';
        Object.assign(route, { view: section ? 'read' : 'book', book: id, section });
      } else Object.assign(route, { view: 'list', group: cfg.groups.some((g) => g.id === head) ? head : 'books' });
      if (route.view !== 'terminal' && !route.page) scrollTo(0, 0);
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
        if (route.page) nextTick(() => toPage(document.querySelector('.doc .md'), t, route.page));
        linkScans(route.book, path);
      } catch (e) {
        if (doc.path === path) Object.assign(doc, { state: 'error', error: e.message + ' Some books do not have every extra page.' });
      }
    }
    watch(() => [route.view, route.book, route.section, state.value], loadDoc);
    watch(() => route.page, (pg) => { if (pg && doc.state === 'ready' && textCache.has(doc.path)) nextTick(() => toPage(document.querySelector('.doc .md'), textCache.get(doc.path), pg)); });
    // Printed page → scanned page image, from the book's SCANS.md ("| 117 | [s065R](scans/s065R.jpg) |"). The page
    // markers in a chapter then open the scan of their page, to check the text against the original.
    const scanMaps = new Map();
    async function scanMap(id) {
      if (!scanMaps.has(id)) scanMaps.set(id, getText(`${id}/SCANS.md`).then((t) => {
        const m = new Map();
        for (const r of t.matchAll(/^\|\s*(\[?[0-9ivxlc]+\]?[a-z ]*?)\s*\|\s*\[[^\]]*\]\((scans\/[^)\s]+)\)/gim)) if (!m.has(r[1].toLowerCase())) m.set(r[1].toLowerCase(), fileUrl(`${id}/${r[2]}`));
        return m;
      }).catch(() => new Map()));
      return scanMaps.get(id);
    }
    async function linkScans(id, path) {
      const m = await scanMap(id);
      if (!m.size || doc.path !== path) return;
      await nextTick();
      document.querySelectorAll('.doc .md sub').forEach((el) => {
        const n = (el.textContent.match(/^\s*(?:page|p\.)\s*(\[?[0-9ivxlc]+\]?)\s*$/i) || [])[1];
        const url = n && m.get(n.toLowerCase());
        if (!url || el.querySelector('a')) return;
        const a = document.createElement('a');
        a.href = url; a.target = '_blank'; a.rel = 'noopener'; a.className = 'scan-link'; a.title = 'Open the scanned page';
        a.textContent = el.textContent.trim();
        el.textContent = ''; el.appendChild(a);
      });
    }
    // Scroll a rendered chapter to where printed page `page` begins, and mark it.
    function toPage(root, text, page) {
      if (!root) return;
      const { closing } = pageMap(text.split(/\r?\n/));
      const want = closing ? page - 1 : page; // closing markers: page N begins after the marker of N − 1
      const subs = [...root.querySelectorAll('sub')];
      const mark = subs.find((el) => +(el.textContent.match(/(\d+)/) || [])[1] === want);
      root.querySelectorAll('.page-hit').forEach((el) => el.classList.remove('page-hit'));
      if (!mark) return; // the first page of a chapter with closing markers: its top
      mark.classList.add('page-hit');
      mark.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }

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

    // ---- Jupyter + BRG: the notebook on the left, the BRG terminal on the right ----
    const log = ref([]);
    const input = ref('');
    const busy = ref(false);
    const history = [];
    let hpos = 0;
    // The conversation with Claude (CAS/brg-terminal-ai): the page keeps it and sends it each time,
    // exactly as the service returned it (thinking blocks included).
    const ai = { history: [], container: undefined, abort: null };
    const stored = (name) => ({ get: () => { try { return localStorage.getItem(name) || ''; } catch (e) { return ''; } },
      set: (k) => { try { if (k) localStorage.setItem(name, k); else localStorage.removeItem(name); } catch (e) { /* private window */ } } });
    // the class's key for the BRG terminal service; or the visitor's own Anthropic API key, used from this browser
    const keyStore = stored('brg-terminal-key'), ownKey = stored('brg-anthropic-key');
    // What Claude cost from this browser: [{at, cost}], and the credits loaded, kept locally. The API key cannot
    // read the account's balance; the Claude Console's Billing and Cost pages have the exact figures.
    const spentLog = { all: () => { try { return JSON.parse(localStorage.getItem('brg-spent') || '[]'); } catch (e) { return []; } },
      add(cost) { try { localStorage.setItem('brg-spent', JSON.stringify([...this.all(), { at: Date.now(), cost }].slice(-5000))); } catch (e) { /* private window */ } } };
    const budget = stored('brg-budget');
    // The split between notebook and terminal; hiding a pane keeps its session mounted.
    const splitEl = ref(null), collapsedPane = ref(''), splitDragging = ref(false);
    const splitStacked = ref(matchMedia('(max-width: 900px)').matches);
    const ratioStore = stored('brg-workspace-ratio');
    const savedRatio = Number(ratioStore.get());
    const splitRatio = ref(savedRatio >= 0.15 && savedRatio <= 0.85 ? savedRatio : 2 / 3);
    let splitPointer = null;
    const dividerSize = () => parseFloat(getComputedStyle(splitEl.value).getPropertyValue('--divider-size')) || 6;
    function splitLimits() {
      const rect = splitEl.value?.getBoundingClientRect();
      const space = rect ? (splitStacked.value ? rect.height : rect.width) - dividerSize() : 1000;
      return [Math.max(0.15, Math.min(0.4, (splitStacked.value ? 140 : 200) / Math.max(1, space))),
        Math.min(0.85, 1 - Math.min(0.4, (splitStacked.value ? 140 : 240) / Math.max(1, space)))];
    }
    function setSplitRatio(value) {
      const [min, max] = splitLimits();
      splitRatio.value = Math.max(min, Math.min(max, value));
    }
    function toggleTerminal() { collapsedPane.value = collapsedPane.value ? '' : 'chat'; }
    function resetSplit() { collapsedPane.value = ''; splitRatio.value = 2 / 3; ratioStore.set(String(splitRatio.value)); }
    function beginSplitDrag(event) {
      if (event.button !== 0) return;
      event.preventDefault();
      splitPointer = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false, collapse: '' };
      event.currentTarget.focus();
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    function dragSplit(event) {
      if (event.pointerId !== splitPointer?.id) return;
      if (!splitPointer.moved && Math.hypot(event.clientX - splitPointer.x, event.clientY - splitPointer.y) < 4) return;
      splitPointer.moved = true;
      splitDragging.value = true;
      collapsedPane.value = '';
      const rect = splitEl.value.getBoundingClientRect();
      const size = dividerSize();
      const position = splitStacked.value ? event.clientY - rect.top : event.clientX - rect.left;
      const available = (splitStacked.value ? rect.height : rect.width) - size;
      splitPointer.collapse = position < 32 ? 'workspace' : position > available + size - 32 ? 'chat' : '';
      setSplitRatio((position - size / 2) / Math.max(1, available));
    }
    function endSplitDrag(event) {
      if (event.pointerId !== splitPointer?.id) return;
      if (event.type === 'pointerup') {
        if (splitPointer.moved) collapsedPane.value = splitPointer.collapse;
        else toggleTerminal();
      }
      splitPointer = null;
      splitDragging.value = false;
      ratioStore.set(String(splitRatio.value));
      if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    }
    function splitKey(event) {
      const back = splitStacked.value ? 'ArrowUp' : 'ArrowLeft';
      const forward = splitStacked.value ? 'ArrowDown' : 'ArrowRight';
      if (![back, forward, 'Home', 'End', 'Enter', ' ', 'Escape'].includes(event.key)) return;
      event.preventDefault();
      if (event.key === 'Enter' || event.key === ' ') toggleTerminal();
      else if (event.key === 'Escape') resetSplit();
      else {
        collapsedPane.value = '';
        const [min, max] = splitLimits();
        setSplitRatio(event.key === 'Home' ? min : event.key === 'End' ? max : splitRatio.value + (event.key === back ? -1 : 1) * (event.shiftKey ? 0.1 : 0.02));
        ratioStore.set(String(splitRatio.value));
      }
    }
    const updateSplitOrientation = () => { splitStacked.value = matchMedia('(max-width: 900px)').matches; };
    onMounted(() => addEventListener('resize', updateSplitOrientation));
    onBeforeUnmount(() => removeEventListener('resize', updateSplitOrientation));
    watch(() => route.workspace, () => { if (collapsedPane.value === 'workspace') collapsedPane.value = ''; });
    const claudeOn = ref(!!(cfg.chatEndpoint || ownKey.get()));
    const claudeLabel = computed(() => (cfg.chatEndpoint ? 'Claude' : claudeOn.value ? 'Claude, your key' : ''));
    const menuIndex = ref(0);
    const logEl = ref(null);
    const prompt = ref(null);
    const viewerEl = ref(null);
    const drawingIds = ref([]);
    const notebookEl = ref(null);
    const notebookFile = computed(() => notebookExercise(route.exercise)?.file || '01-basics/01-box.ipynb');
    const notebookSrc = 'jupyter/lab/index.html?path=' + notebookFile.value;
    async function openNotebook() {
      // Same-origin JupyterLab API: open another file without reloading the iframe or its kernels.
      const frame = notebookEl.value;
      if (!frame) return;
      const started = Date.now();
      while (frame === notebookEl.value && !frame.contentWindow?.jupyterapp && Date.now() - started < 30000) await new Promise((done) => setTimeout(done, 100));
      const app = frame.contentWindow?.jupyterapp;
      if (!app || frame !== notebookEl.value) return;
      try {
        await app.restored;
        await app.serviceManager.ready;
        const widget = await app.commands.execute('docmanager:open', {
          path: notebookFile.value, factory: 'Notebook',
          kernel: { name: app.serviceManager.kernelspecs.specs.default },
          kernelPreference: { language: 'python', autoStartDefault: true },
        });
        await widget?.context.ready;
        // List the topic folders, not only the opened notebook's folder.
        await app.commands.execute('filebrowser:go-to-path', { path: '', dontShowBrowser: true });
        app.shell.collapseLeft();
      } catch (e) { console.warn('Could not open the exercise in Jupyter.', e); }
    }
    // Claude's notebook tool: write the cells (from a BRG notebook tool of the MCP server) as a notebook in
    // JupyterLite's browser storage and open it in the notebook pane, for the student to run.
    // A notebook skill: call its MCP tool from this page, no Claude, and open the notebook it returns.
    async function runSkill(skill, words) {
      const args = skillArguments(skill, words);
      say(`· BRG tool: ${skill.tool}${Object.keys(args).length ? ' ' + JSON.stringify(args) : ''}`, 'dim');
      const result = await mcpCall('tools/call', { name: skill.tool, arguments: args });
      const text = (result.content || []).map((c) => c.text || '').join('');
      if (result.isError) throw new Error(text || `${skill.tool} failed.`);
      if (skill.add) { say(await addToNotebook(JSON.parse(text)), 'out'); return; }
      const notebook = JSON.parse(text);
      say(`· notebook: ${notebook.file}`, 'dim');
      say(await notebookForClaude(notebook.file, notebook.cells), 'out');
    }
    // An addition (a *_add tool): its imports into the imports cell, its code in a new cell below the cursor
    // (after the imports, before the scene), its scene lines before viewer.show().
    async function addToNotebook(addition) {
      const panel = notebookEl.value?.contentWindow?.jupyterapp?.shell.currentWidget;
      const nb = panel?.content, shared = nb?.model?.sharedModel;
      if (!shared?.insertCell) throw new Error('Open a notebook on the left first (/notebook, /box, …), and click the cell to add below.');
      const code = (i) => shared.cells[i]?.cell_type === 'code';
      const find = (test) => shared.cells.findIndex((c, i) => code(i) && test(c.getSource()));
      const isImports = (src) => src.split('\n').some((l) => /^(from\s+\S+\s+)?import\s/.test(l));
      // what /undo needs: the cells it inserted, and the old source of the cells it changed, by cell id
      const undo = { path: panel.context.path, name: addition.name, inserted: [], changed: [] };
      const change = (i, source) => { undo.changed.push([shared.cells[i].getId(), shared.cells[i].getSource()]); shared.cells[i].setSource(source); };
      let active = nb.activeCellIndex, imports = find(isImports);
      if (imports < 0) {
        imports = find((src) => /^\s*%pip\b/.test(src)) + 1;
        undo.inserted.push(shared.insertCell(imports, { cell_type: 'code', source: '' }).getId());
        if (active >= imports) active += 1;
      }
      change(imports, mergeImports(shared.cells[imports].getSource(), addition.imports));
      let scene = -1;
      shared.cells.forEach((c, i) => { if (code(i) && /^viewer\.show\(\)/m.test(c.getSource())) scene = i; });
      let at = Math.max(active + 1, imports + 1);
      if (scene >= 0 && at > scene) at = scene;
      const own = scene < 0 ? ['', addition.viewer, ...addition.scene, 'viewer.show()'] : [];
      undo.inserted.push(shared.insertCell(at, { cell_type: 'code', source: [addition.code, ...own].join('\n') }).getId());
      if (scene >= at) scene += 1;
      if (scene >= 0) {
        const lines = shared.cells[scene].getSource().split('\n'), show = lines.findIndex((l) => /^viewer\.show\(\)/.test(l));
        lines.splice(show, 0, ...addition.scene.filter((l) => !lines.includes(l)));
        change(scene, lines.join('\n'));
      }
      nb.activeCellIndex = at;
      lastAddition = undo;
      return `Added ${addition.name} to ${panel.context.path}: imports in cell ${imports + 1}, code in the new cell ${at + 1}` +
        (scene >= 0 ? `, scene in cell ${scene + 1}` : ' with its own viewer') + '. Run the notebook from the top (Run → Run All Cells). /undo takes it back.';
    }
    // /undo: take back the last addition: remove the cells it inserted and give the changed cells their old source.
    let lastAddition = null;
    function undoAddition() {
      const undo = lastAddition, app = notebookEl.value?.contentWindow?.jupyterapp;
      if (!undo) throw new Error('Nothing to undo: /undo takes back the last /add-… command.');
      const panel = app && [...app.shell.widgets('main')].find((w) => w.context?.path === undo.path);
      const shared = panel?.content?.model?.sharedModel;
      if (!shared) throw new Error(`${undo.path} is no longer open, so its last addition cannot be taken back.`);
      const index = (id) => shared.cells.findIndex((c) => c.getId() === id);
      shared.transact(() => {
        for (const [id, source] of undo.changed.reverse()) if (index(id) >= 0) shared.cells[index(id)].setSource(source);
        for (const id of undo.inserted) if (index(id) >= 0) shared.deleteCell(index(id));
      });
      lastAddition = null;
      app.shell.activateById(panel.id);
      return `Took back ${undo.name} from ${undo.path}. Rerun the notebook from the top.`;
    }
    async function notebookForClaude(file, cells) {
      if (route.view !== 'terminal') { location.hash = '/notebook'; await nextTick(); }
      await openNotebook();
      const app = notebookEl.value?.contentWindow?.jupyterapp;
      if (!app) return 'The notebook did not start in this browser.';
      const content = {
        nbformat: 4, nbformat_minor: 5,
        metadata: { kernelspec: { name: 'python', display_name: 'Python (Pyodide)', language: 'python' }, language_info: { name: 'python' } },
        cells: cells.map((c) => (c.type === 'code'
          ? { cell_type: 'code', metadata: {}, source: c.source, outputs: [], execution_count: null }
          : { cell_type: 'markdown', metadata: {}, source: c.source })),
      };
      await app.serviceManager.contents.save(file, { type: 'notebook', format: 'json', content });
      const widget = await app.commands.execute('docmanager:open', {
        path: file, factory: 'Notebook',
        kernel: { name: app.serviceManager.kernelspecs.specs.default },
        kernelPreference: { language: 'python', autoStartDefault: true },
      });
      // a file of the same name that was already open shows the new cells after a revert
      await widget?.context.ready;
      await widget?.context.revert();
      return `Wrote and opened ${file} (${cells.length} cells) in the notebook on the left. Run it from the top with Shift+Enter.`;
    }
    // Keep the notebook mounted after its first visit: leaving the page view preserves the kernel.
    const notebookOpened = ref(false);
    watch(() => route.view, (screen) => {
      if (screen !== 'terminal') return;
      notebookOpened.value = true;
      document.title = 'Jupyter + BRG · CAS Computational Form-finding';
    }, { immediate: true });
    watch(() => [route.workspace, route.exercise], () => {
      if (route.workspace === 'notebook') nextTick(openNotebook);
    });
    const say = (text, kind = 'out', act, href, img) => { log.value.push({ text, kind, act, href, img }); nextTick(() => { if (logEl.value) logEl.value.scrollTop = logEl.value.scrollHeight; }); };
    say('BRG terminal for the CAS library. Type /help for commands.', 'dim');
    say('COMPAS tutorials: begin with the box, then follow the foundation notebooks in Chapter 2 → Submission. Run cells from top to bottom (Shift+Enter). /notebook list shows the tutorials; /notebook <exercise> opens one.', 'dim');
    if (claudeOn.value) {
      say('Claude is connected: ask about the course and the books, or ask for a notebook (“create a box”). It uses the BRG tools, writes notebooks on the left, and cites pages. /new starts over.', 'dim');
    } else {
      say('Claude is not connected: the terminal searches the library only.', 'err');
      say('To connect Claude in this browser: /key <your Anthropic API key> (from console.anthropic.com; set a spend limit there). The key stays in this browser and goes only to Anthropic.', 'dim');
    }
    say('Sources, pages and figures appear here in the terminal. /open shows a whole chapter over the notebook, /close hides it.', 'dim');

    // The sheet over the notebook: what it shows, with a back stack of the commands that produced it.
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
    function closeSheet() { setView({ kind: 'welcome', title: '' }); remember(''); }
    // Links inside a chapter shown on the sheet stay on the sheet.
    function onViewerClick(e) {
      const a = e.target.closest && e.target.closest('a[href^="#/b/"]');
      if (!a || !viewerEl.value.contains(a)) return;
      e.preventDefault();
      const [, , id, ...rest] = a.getAttribute('href').split('#')[1].split('/');
      if (rest.length) run(`/open ${id}/${decodeURIComponent(rest.join('/'))}`);
      else run(`/book ${id}`);
    }

    async function showDoc(id, section, page = 0) {
      setView({ kind: 'loading', title: section });
      const text = await getText(`${id}/${section}`);
      const html = renderMarkdown(text, `${id}/${section}`, bookIds.value);
      const s = books.value.find((b) => b.id === id)?.sections.find((x) => x.section === section);
      setView({ kind: 'doc', title: `${bookTitle(id)} · ${s ? s.title : section}${page ? ' · p. ' + page : ''}`, html, open: `library.html${readerHref(id, section, page)}` });
      if (page) nextTick(() => toPage(viewerEl.value, text, page));
    }

    const skills = ref([]);
    skillsLoaded.then((list) => { skills.value = list; });
    const menuItems = computed(() => {
      const v = input.value;
      return v.startsWith('/') && !v.includes(' ') ? [...COMMANDS, ...skills.value].filter((c) => c.cmd.startsWith(v.toLowerCase())) : [];
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
    // Search results go on the sheet, over the notebook.
    const showHits = (q, list) => {
      if (!list.length) {
        say(`No chapters match “${q}”.`, 'dim');
        return false;
      }
      setView({ kind: 'list', title: `Search: ${q} · ${list.length} chapter${list.length === 1 ? '' : 's'}`, items: list, showBook: true });
      list.slice(0, 12).forEach((s) => say(`${s.book}/${s.section}  ${s.title}`, 'out', `/open ${s.book}/${s.section}`));
      say(list.length > 12 ? `… ${list.length - 12} more on the left.` : 'Results are also on the left.', 'dim');
      return true;
    };
    const splitRef = (ref_) => { const i = ref_.indexOf('/'); return i < 0 ? [ref_, ''] : [ref_.slice(0, i), ref_.slice(i + 1)]; };

    async function run(line, opts = {}) {
      line = line.trim();
      if (!line) return;
      if (!opts.quiet) {
        const shown = line.replace(/^(\/key\s+)(\S{6})\S+/, '$1$2••••'); // a key is never shown or kept in the history
        if (shown === line) { history.push(line); hpos = history.length; }
        say('> ' + shown, 'cmd');
      }
      const [cmd, ...args] = line.split(/\s+/);
      const arg = args.join(' ');
      const keep = () => { if (!opts.noRemember) remember(line); };
      try {
        busy.value = true;
        if (cmd === '/help' || cmd === '?') {
          COMMANDS.forEach((c) => say(`${c.cmd.padEnd(10)} ${c.help}`));
          if (skills.value.length) say('Notebook skills (/skills): ' + skills.value.map((k) => k.cmd).join(' · '), 'dim');
          say('Anything else goes to Claude when it is connected (/key), else it searches the library.', 'dim');
        }
        else if (cmd === '/notebook') {
          const id = arg.toLowerCase() || 'box';
          const tutorial = notebookExercises.find((entry) => entry.id === id);
          if (!tutorial) {
            if (id !== 'list') say('Unknown notebook. Choose one of these tutorials:', 'dim');
            notebookExercises.forEach((entry) => say(`/notebook ${entry.id} · ${entry.title}`, 'out', `/notebook ${entry.id}`));
            return;
          }
          location.hash = '/notebook/' + tutorial.id; closeSheet();
          say(`${tutorial.title} · ${tutorial.file}\n${tutorial.summary}\nChoose Run → Run All Cells, or use Shift+Enter cell by cell. Change one parameter, predict the result and run again.`, 'out');
          say('Save with Ctrl+S; use File → Save and Export Notebook As → Notebook to keep a copy on your computer. The notebook and terminal are separate: paste code or errors here when asking for help.', 'dim');
        }
        else if (cmd === '/close') closeSheet();
        else if (cmd === '/clear') log.value = [];
        else if (cmd === '/usage') {
          const all = spentLog.all(), sum = (l) => l.reduce((t, x) => t + x.cost, 0), day = Date.now() - 864e5, month = Date.now() - 30 * 864e5;
          const f = (v) => '$' + v.toFixed(2);
          say(`Claude from this browser: ${all.length} answers, ${f(sum(all))} in all · ${f(sum(all.filter((x) => x.at > month)))} in 30 days · ${f(sum(all.filter((x) => x.at > day)))} today`, 'out');
          if (all.length) say(`about ${f(sum(all) / all.length)} per answer`, 'dim');
          const b = +budget.get();
          if (b) say(`credits loaded: ${f(b)} · left, about ${f(Math.max(0, b - sum(all)))} (estimated from these answers only)`, 'out');
          say('Exact figures for the whole key: Claude Console → Settings → Billing (balance) and Cost. Other browsers and apps using the key are not counted here.', 'dim');
        }
        else if (cmd === '/budget') {
          if (arg.trim() === 'reset') { try { localStorage.removeItem('brg-spent'); } catch (e) { /* private window */ } say('Cost count reset to zero in this browser.', 'dim'); return; }
          const v = parseFloat(arg.replace(/[$,]/g, ''));
          if (!(v > 0)) { say('Usage: /budget 10   (the dollars of credits you loaded)', 'err'); return; }
          budget.set(String(v)); spentLog.all().length && say('Counting from the answers already made in this browser; to start the count from now, type /budget reset first.', 'dim');
          say(`Budget $${v.toFixed(2)} kept in this browser. /usage shows what is left.`, 'dim');
        }
        else if (cmd === '/new') { ai.history = []; ai.container = undefined; say('New conversation with Claude.', 'dim'); }
        else if (cmd === '/stop') { if (ai.abort) ai.abort.abort(); else say('Claude is not working on anything.', 'dim'); }
        else if (cmd === '/key') {
          const k = arg.trim();
          if (/^sk-ant-/.test(k)) {
            ownKey.set(k); claudeOn.value = true;
            say('Claude is on in this browser, with your API key. It is kept in this browser only and sent only to Anthropic; /key off removes it.', 'dim');
          } else if (!k) {
            say('Paste your key after /key on the same line: /key sk-ant-…   (/key off removes it)', 'dim');
            input.value = '/key ';
            nextTick(() => prompt.value && prompt.value.focus());
          } else if (k === 'off') {
            ownKey.set(''); keyStore.set(''); claudeOn.value = !!cfg.chatEndpoint;
            say('Keys removed from this browser.', 'dim');
          } else if (cfg.chatEndpoint) { keyStore.set(k); say('Class key kept in this browser.', 'dim'); }
          else say('That is not an Anthropic API key, so nothing was stored: they start with sk-ant-api03-. Copy the whole key when you create it in the Claude Console.', 'err');
        }
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
        } else if (cmd === '/search') { if (ready() && showHits(arg, search(arg, allSections.value))) keep(); }
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
          const page = cmd === '/open' ? +((args[1] || '').match(/\d+/) || [])[0] || 0 : 0;
          if (cmd === '/figures') {
            await showDoc(id, section);
            const tpl = document.createElement('template'); tpl.innerHTML = view.html;
            const items = [...tpl.content.querySelectorAll('img')].map((img) => ({ src: img.src, alt: img.alt, name: img.src.split('/').pop() }));
            setView({ kind: 'figures', title: `Figures · ${view.title}`, items, open: view.open });
            say(`${items.length} figure${items.length === 1 ? '' : 's'} over the notebook.`, 'dim');
          } else {
            await showDoc(id, section, page);
            if (cmd === '/open') say(page ? `Chapter shown at p. ${page}.` : 'Chapter shown over the notebook.', 'dim');
          }
          keep();
        } else if (cmd === '/page') {
          if (!ready()) return;
          const [id, section] = splitRef(args[0] || ''), page = +((args[1] || '').match(/\d+/) || [])[0] || 0;
          if (!id || !section || !page) { say('Usage: /page <book>/<chapter.md> <printed page>', 'err'); return; }
          const lines = (await getText(`${id}/${section}`)).split(/\r?\n/), { pages } = pageMap(lines);
          const text = lines.filter((l, i) => pages[i] === page && l.trim() && !PAGE_MARK.test(l))
            .map((l) => l.replace(/!\[([^\]]*)\]\([^)]*\)/g, '[figure: $1]').replace(/<[^>]+>/g, '').replace(/^#+\s*/, ''));
          const chapter = (books.value.find((b) => b.id === id)?.sections.find((x) => x.section === section) || {}).title || section;
          if (!text.length) { say(`p. ${page} is not in ${chapter}.`, 'err'); return; }
          say(`${citeBook(bookTitle(id))} — ${chapter}, p. ${page}:`, 'dim');
          text.slice(0, 40).forEach((l) => say('  ' + l, 'text'));
          if (text.length > 40) say(`  … ${text.length - 40} more lines`, 'dim');
          say(fileUrl(`${id}/${section}`), 'link', null, fileUrl(`${id}/${section}`));
          if (pages.includes(page + 1)) say(`next page: /page ${id}/${section} ${page + 1}`, 'dim', `/page ${id}/${section} ${page + 1}`);
        } else if (cmd === '/drawings') {
          if (!drawingIds.value.length) {
            const res = await fetch(PLAYER + 'views.json');
            drawingIds.value = res.ok ? await res.json() : [];
          }
          setView({ kind: 'drawings', title: `eQUILIBRIUM drawings · ${drawingIds.value.length}`, open: PLAYER + 'gallery.html' });
          say(`${drawingIds.value.length} drawings over the notebook. Pick one, or type /drawing <n>.`, 'dim'); keep();
        } else if (cmd === '/drawing') {
          const n = parseInt(args[0], 10);
          if (!n) { say('Usage: /drawing <n> [step]', 'err'); return; }
          const step = args[1] ? `&step=${encodeURIComponent(args[1])}` : '';
          const src = `${PLAYER}index.html?view=${n}${step}`;
          setView({ kind: 'drawing', title: `eQUILIBRIUM drawing ${n}`, src, open: src });
          say(`Drawing ${n} playing over the notebook. Use its controls to step through the construction.`, 'dim'); keep();
        } else if (cmd === '/undo') say(undoAddition(), 'out');
        else if (cmd === '/skills') {
          const list = await skillsLoaded;
          if (!list.length) say('No notebook skills: the BRG MCP server did not answer (it may be waking up; try again in a minute).', 'err');
          else {
            for (const [add, title] of [[false, 'New notebooks: each writes a runnable notebook on the left'],
              [true, 'Additions: each adds to the open notebook, below the cell you clicked']]) {
              const group = list.filter((k) => k.add === add);
              if (!group.length) continue;
              say(title + ':', 'dim');
              group.forEach((k) => say(`${k.cmd.padEnd(16)} ${k.help}`, 'out', k.cmd));
            }
            say('Arguments in order or as name=value, e.g. ' + list[0].cmd + (list[0].args.length ? ' ' + list[0].args[0] + '=3' : '') + '. Or ask Claude in words.', 'dim');
          }
        } else if (skills.value.some((k) => k.cmd === cmd.toLowerCase())) await runSkill(skills.value.find((k) => k.cmd === cmd.toLowerCase()), args);
        else if (cmd.startsWith('/')) say('Unknown command. Type /help.', 'err');
        else if (claudeOn.value) await askClaude(line);
        else if (ready() && showHits(line, search(line, allSections.value))) keep();
      } catch (e) {
        say(e instanceof TypeError ? 'Could not reach the library (network or CORS).' : e.message, 'err');
        if (view.kind === 'loading') setView({ kind: 'error', title: 'Error', error: e.message });
      } finally { busy.value = false; }
    }
    // One question to Claude: send the conversation, show what streams back, write the notebooks it asks
    // for on the left and send it what happened, until it has answered. A failed turn is dropped
    // whole, so the conversation stays valid.
    async function askClaude(line) {
      if (ai.abort) { say('Claude is still answering; wait, or /stop.', 'err'); return; }
      const mark = ai.history.length;
      ai.history.push({ role: 'user', content: line });
      ai.abort = new AbortController();
      let spent = 0, model = '';
      // what the answer cost, at the API's prices, shown under it
      const costLine = () => { if (spent) spentLog.add(spent); if (spent) say(`≈ $${spent < 0.01 ? spent.toFixed(3) : spent.toFixed(2)} for this answer · ${model.replace(/^claude-/, '').replace(/-(\d)-(\d)$/, ' $1.$2')}`, 'dim'); };
      try {
        for (let hop = 0; hop < 24; hop++) {
          const done = await claudeRound(ai.abort.signal);
          ai.history.push(...done.messages);
          if (done.container) ai.container = done.container;
          if (done.usage) lastUsage = done.usage;
          spent += done.cost || 0; model = done.model || model;
          if (!done.page.length) {
            if (done.stop === 'max_tokens') say('The answer was cut off (too long). Ask for less at once.', 'err');
            else if (done.stop === 'refusal') say('Claude declined this request.', 'err');
            costLine();
            return;
          }
          const results = [...done.results];
          for (const call of done.page) {
            say(`· notebook: ${call.file}`, 'dim');
            const reply = await notebookForClaude(call.file, call.cells).catch((e) => `The notebook could not be written: ${e.message}`);
            results.push({ type: 'tool_result', tool_use_id: call.id, content: reply });
          }
          ai.history.push({ role: 'user', content: results });
        }
        say('Claude took many steps without finishing; ask it to continue.', 'dim');
      } catch (e) {
        ai.history.length = mark;
        say(e.name === 'AbortError' ? 'Stopped.' : e instanceof TypeError ? 'Could not reach the BRG terminal service (network).' : e.message, 'err');
      } finally {
        endStream();
        ai.abort = null;
      }
    }
    let lastUsage = null;
    let claudeScript = null;
    const loadClaude = () => claudeScript || (claudeScript = new Promise((done, fail) => {
      const tag = Object.assign(document.createElement('script'), { src: 'vendor/brg-claude.js', onload: done, onerror: () => { claudeScript = null; fail(new Error('Could not load the Claude client.')); } });
      document.head.append(tag);
    }));
    function onClaudeEvent(e) {
      if (e.t === 'thinking' || e.t === 'text') streamInto(e.t, e.d);
      else if (e.t === 'tool') {
        endStream(); say(toolLine(e), 'dim');
        if (e.name === 'look_at_figure' && e.input && e.input.url) {
          const src = /^https:\/\//.test(e.input.url) ? e.input.url : fileUrl(e.input.url);
          say('Claude is looking at ' + src.split('/').slice(-3).join('/'), 'fig', null, src, src);
        }
      }
    }
    async function claudeRound(signal) {
      if (!cfg.chatEndpoint) {
        await loadClaude();
        const env = { ANTHROPIC_API_KEY: ownKey.get(), ANTHROPIC_BASE_URL: devParam('anthropic') || undefined, BROWSER: true, MODEL: window.BRGClaude.DEFAULT_MODEL, EFFORT: 'medium',
          MCP_URL: cfg.mcpEndpoint };
        try {
          const done = await window.BRGClaude.converse(env, [...ai.history], ai.container, onClaudeEvent, signal);
          endStream();
          return done;
        } catch (err) {
          endStream();
          if (err && err.name === 'AbortError') throw err;
          const why = window.BRGClaude.explain(err);
          // the visitor's own key: say what to do about it
          if (/not scoped to a workspace/i.test(why)) throw new Error('This API key was created without a workspace, so Anthropic refuses it from here. In the Claude Console create a new key and pick a workspace for it (Settings → API Keys → Create Key → Workspace: Default), then type /key off and /key <the new key>.');
          if (err && err.status === 401) throw new Error('Anthropic refused this API key (wrong, incomplete or deleted). Type /key off, then /key followed by the whole key, sk-ant-api03-….');
          if (/credit balance/i.test(why)) throw new Error('Your Anthropic account has no credits left. Add credits under Settings → Billing in the Claude Console.');
          throw new Error(why);
        }
      }
      const key = keyStore.get();
      const res = await fetch(cfg.chatEndpoint, {
        method: 'POST', signal,
        headers: { 'Content-Type': 'application/json', ...(key ? { 'X-BRG-Key': key } : {}) },
        body: JSON.stringify({ messages: ai.history, container: ai.container }),
      });
      if (!res.ok) {
        let message = `The BRG terminal service answered HTTP ${res.status}.`;
        try { message = (await res.json()).error || message; } catch (e) { /* not JSON */ }
        throw new Error(message);
      }
      const reader = res.body.getReader(), decoder = new TextDecoder();
      let buffer = '', done = null;
      for (;;) {
        const { value, done: end } = await reader.read();
        if (end) break;
        buffer += decoder.decode(value, { stream: true });
        let i;
        while ((i = buffer.indexOf('\n')) >= 0) {
          const text = buffer.slice(0, i); buffer = buffer.slice(i + 1);
          if (!text.trim()) continue;
          const e = JSON.parse(text);
          if (e.t === 'error') throw new Error(e.error);
          if (e.t === 'done') done = e; else onClaudeEvent(e);
        }
      }
      endStream();
      if (!done) throw new Error('The answer stopped before it was complete.');
      return done;
    }
    const toolLine = (e) => {
      const i = e.input || {};
      if (e.name === 'search_books') return `· searching the library: “${i.query}”${i.book ? ' in ' + i.book : ''}`;
      if (e.name === 'read_book_section') return `· reading ${i.book}/${i.section}${i.start_line > 1 ? ' from line ' + i.start_line : ''}`;
      if (e.name === 'look_at_figure') return `· looking at ${String(i.url).split('/').slice(-2).join('/')}`;
      if (e.name === 'list_books') return '· listing the library';
      if (e.name === 'code_execution' || /code_execution/.test(e.name)) return '· computing (Python)';
      return `· BRG tool: ${e.name}`;
    };
    // Thinking and text arrive in pieces: they grow one log line until the kind changes, then the
    // text is split into lines, and "/open book/file.md" lines become links.
    let streaming = null;
    function streamInto(kind, d) {
      if (!streaming || streaming.kind !== kind) {
        endStream();
        streaming = { kind, entry: { text: kind === 'thinking' ? '∴ ' : '', kind: kind === 'thinking' ? 'think' : 'text' } };
        log.value.push(streaming.entry);
        streaming.entry = log.value[log.value.length - 1];
      }
      streaming.entry.text += d;
      nextTick(() => { if (logEl.value) logEl.value.scrollTop = logEl.value.scrollHeight; });
    }
    function endStream() {
      if (!streaming) return;
      const { entry, kind } = streaming;
      streaming = null;
      if (kind !== 'text') return;
      const at = log.value.indexOf(entry);
      const lines = entry.text.replace(/\s+$/, '').split('\n').map((t) => {
        const open = t.trim().match(/^\/open\s+(\S+\.md)(?:\s+(?:pp?\.?\s*)?(\d+)\S*)?$/);
        if (!open) return [{ text: t || ' ', kind: 'text' }];
        const [id, section] = splitRef(open[1]), page = +open[2] || 0, url = fileUrl(open[1]);
        const chapter = (books.value.find((b) => b.id === id)?.sections.find((x) => x.section === section) || {}).title || section;
        return [{ text: `↗ ${citeBook(bookTitle(id))} — ${chapter}${page ? ', p. ' + page : ''}`, kind: 'out', act: page ? `/page ${open[1]} ${page}` : `/open ${open[1]}` }, { text: url, kind: 'link', href: url }];
      }).flat();
      log.value.splice(at, 1, ...lines);
    }
    function submit() { const line = input.value; input.value = ''; run(line); }
    watch(() => route.view, (v) => {
      document.body.classList.toggle('term-full', v === 'terminal');
      if (v === 'terminal') nextTick(() => prompt.value && prompt.value.focus());
    }, { immediate: true });

    return {
      cfg, state, error, books, query, route, shelf, shelfAll, subject, subjectsHere, coverOf, doc, libraryUrl, host, grouped, book, bookTitle, sectionCount, hits,
      prev, next, sectionTitle, readerHref, docUrl, groupOf, groupLabel, series, partsOf, partInfo, bookInfo, seriesKey, plural, years, coverImg,
      pixel: PIXEL, pixelCols: PIXEL_COLS, log, input, busy, menuItems, menuIndex, takeMenu, onKey, submit, focusPrompt, prompt, logEl,
      splitEl, splitRatio, collapsedPane, splitDragging, splitStacked, beginSplitDrag, dragSplit, endSplitDrag, splitKey,
      view, viewStack, viewBack, viewerEl, onViewerClick, run, drawingIds, closeSheet, claudeLabel, notebookSrc, notebookOpened, notebookEl, notebookFile, openNotebook,
    };
  },
}).mount('#app');
