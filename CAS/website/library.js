// Library: reads LIBRARY.md from the R2 bucket and renders books, chapters and a terminal.
// The catalogue format is the one mcp-server-brg parses (src/brg_mcp/adapters/public_books.py):
//   ## `book-id/` — Title, Author, Year
//     - `01-chapter.md` **Chapter title** summary
const { createApp, ref, reactive, computed, watch, nextTick, onMounted, onBeforeUnmount } = Vue;
const cfg = window.CAS_LIBRARY;
const notebookExercises = window.CAS_NOTEBOOKS || [];
const notebookExercise = (id) => notebookExercises.find((tutorial) => tutorial.id === id) || notebookExercises.find((tutorial) => tutorial.id === 'box');
// ?chat=http://localhost:8788 tries a local copy of the Claude service.
// Only a local address: a link to another site could otherwise collect the conversation and the key.
// ?anthropic=http://localhost:8790, ?gemini=http://localhost:8791/v1beta/models and ?kimi=http://localhost:8792/v1/chat/completions point own-key modes at local mocks.
const LOCAL = /^http:\/\/(localhost|127\.0\.0\.1):\d+\/?$/, devParam = (k) => { const v = new URLSearchParams(location.search).get(k); return v && LOCAL.test(v) ? v : ''; };
const geminiDev = new URLSearchParams(location.search).get('gemini') || '';
const GEMINI_API = /^http:\/\/(localhost|127\.0\.0\.1):\d+\/v1beta\/models$/.test(geminiDev) ? geminiDev : 'https://generativelanguage.googleapis.com/v1beta/models';
const kimiDev = new URLSearchParams(location.search).get('kimi') || '';
const KIMI_API = /^http:\/\/(localhost|127\.0\.0\.1):\d+\/v1\/chat\/completions$/.test(kimiDev) ? kimiDev : (cfg.kimiEndpoint || 'https://api.moonshot.ai/v1/chat/completions');
if (devParam('chat')) cfg.chatEndpoint = devParam('chat');
// The BRG MCP server is called from this page for notebook skills and Gemini's tool calls.
// ?mcp=http://localhost:8000/mcp tries a local server for the skills only (Claude needs a public address).
const SKILLS_MCP = (() => { const v = new URLSearchParams(location.search).get('mcp'); return v && /^http:\/\/(localhost|127\.0\.0\.1):\d+\/mcp$/.test(v) ? v : cfg.mcpEndpoint; })();
let mcpId = 0;
async function mcpCall(method, params = {}, signal) {
  const id = ++mcpId;
  const res = await fetch(SKILLS_MCP, { method: 'POST', signal, headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' },
    body: JSON.stringify({ jsonrpc: '2.0', id, method, params }) });
  if (!res.ok) throw new Error(`The BRG MCP server answered HTTP ${res.status}.`);
  const contentType = res.headers.get('content-type') || '';
  const reply = contentType.includes('text/event-stream') ? (await res.text()).split(/\r?\n/).filter((line) => line.startsWith('data:')).map((line) => JSON.parse(line.slice(5).trim())).find((message) => message.id === id) : await res.json();
  if (!reply) throw new Error('The BRG MCP server returned no answer.');
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
    const u = new URL(img.getAttribute('src'), here);
    if (u.pathname.endsWith('.svg')) u.searchParams.set('v', 'cad3');
    img.src = u.href; img.loading = 'lazy';
  });
  tpl.content.querySelectorAll('a[href]').forEach((a) => {
    const raw = a.getAttribute('href');
    if (raw.startsWith('#')) return;
    const u = new URL(raw, here);
    if (u.origin === here.origin && u.pathname.endsWith('.md')) {
      const parts = decodeURIComponent(u.pathname).replace(/^\//, '').split('/');
      if (bookIds.has(parts[0])) { a.setAttribute('href', `#/b/${parts[0]}/${encodeURIComponent(parts.slice(1).join('/'))}${u.hash}`); return; }
    }
    if (u.pathname.endsWith('.svg')) u.searchParams.set('v', 'cad3');
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

const AI_PROVIDERS = [
  { id: 'claude', label: 'Claude', tokenUrl: 'https://console.anthropic.com/settings/keys', destination: 'Anthropic' },
  { id: 'gemini', label: 'Gemini', tokenUrl: 'https://aistudio.google.com/apikey', destination: 'Google' },
  { id: 'kimi', label: 'Kimi', tokenUrl: 'https://platform.moonshot.ai/console/api-keys', destination: 'Kimi', billing: 'Kimi Platform · pay-as-you-go' },
];

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
  { cmd: '/new', help: 'start a new conversation with the selected AI' },
  { cmd: '/stop', help: 'stop the AI’s answer' },
  { cmd: '/key', help: 'open the provider menu, or use <provider> <key>; /key off removes keys', arg: true },
  { cmd: '/model', help: '[claude | gemini | kimi] show or switch the AI provider', arg: true },
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
        linkOrigFigures(route.book, () => doc.path === path, () => document.querySelector('.doc .md'));
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
    // Redrawn figure → original book image, from FIGURES.md ("| [Fig. 1](figures/txt-fig001.svg) · [original](figures/orig/txt-fig001.png) |").
    // Clicking a redrawn figure toggles in place between the CAD drawing and the original book scan.
    const origMaps = new Map();
    async function origMap(id) {
      if (!origMaps.has(id)) origMaps.set(id, getText(`${id}/FIGURES.md`).then((t) => {
        const m = new Map();
        for (const line of t.split(/\r?\n/)) {
          if (!line.startsWith('|')) continue;
          const cur = line.match(/\]\((figures\/(?!orig\/)([^)\s]+))\)/i);
          const orig = line.match(/\]\((figures\/orig\/([^)\s]+))\)/i);
          if (cur && orig) m.set(cur[2].replace(/\.[^.]+$/, '').toLowerCase(), fileUrl(`${id}/${orig[1]}`));
        }
        return m;
      }).catch(() => new Map()));
      return origMaps.get(id);
    }
    async function linkOrigFigures(id, active, getRoot) {
      const m = await origMap(id);
      if (!m.size || !active()) return;
      await nextTick();
      const root = getRoot();
      if (!root) return;
      root.querySelectorAll('img[src]').forEach((img) => {
        if (img.closest('.fig-compare') || img.closest('a')) return;
        const fn = decodeURIComponent((img.getAttribute('src') || '').split('?')[0].split('#')[0]).split('/').pop() || '';
        const stem = fn.replace(/\.[^.]+$/, '').toLowerCase();
        const origUrl = m.get(stem);
        if (!origUrl) return;
        const cadUrl = img.src;
        const wrap = document.createElement('span');
        wrap.className = 'fig-compare';
        wrap.setAttribute('role', 'button');
        wrap.setAttribute('tabindex', '0');
        wrap.setAttribute('aria-pressed', 'false');
        wrap.title = 'Click to switch between 2D CAD redraw and original book image';
        const badge = document.createElement('span');
        badge.className = 'fig-compare-badge';
        badge.textContent = 'CAD · click for original';
        img.parentNode.insertBefore(wrap, img);
        wrap.appendChild(img);
        wrap.appendChild(badge);
        let preloaded = false;
        const preload = () => {
          if (preloaded) return;
          preloaded = true;
          const pre = new Image();
          pre.src = origUrl;
        };
        const toggle = (e) => {
          e.preventDefault();
          e.stopPropagation();
          preload();
          const toOrig = !wrap.classList.contains('is-orig');
          if (toOrig && !img.getAttribute('width') && !img.closest('.v-figs') && !img.style.width) {
            const w = Math.round(img.getBoundingClientRect().width);
            if (w > 0) img.style.width = w + 'px';
          }
          wrap.classList.toggle('is-orig', toOrig);
          wrap.setAttribute('aria-pressed', toOrig ? 'true' : 'false');
          img.src = toOrig ? origUrl : cadUrl;
          badge.textContent = toOrig ? 'Original book image · click for CAD' : 'CAD · click for original';
        };
        wrap.addEventListener('pointerenter', preload, { once: true });
        wrap.addEventListener('click', toggle);
        wrap.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') toggle(e); });
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

    // ---- Jupyter + BRG: the editor and its optional terminal ----
    const log = ref([]);
    const input = ref('');
    const busy = ref(false);
    const history = [];
    let hpos = 0;
    // Each provider's complete assistant messages and reasoning are preserved in its own format.
    const ai = { history: [], geminiHistory: [], kimiHistory: [], mcpTools: null, container: undefined, abort: null };
    const stored = (name) => ({ get: () => { try { return localStorage.getItem(name) || ''; } catch (e) { return ''; } },
      set: (k) => { try { if (k) localStorage.setItem(name, k); else localStorage.removeItem(name); } catch (e) { /* private window */ } } });
    // The class key and personal API keys stay in this browser's local storage.
    const keyStore = stored('brg-terminal-key'), ownKey = stored('brg-anthropic-key');
    const geminiKey = stored('brg-gemini-key'), kimiKey = stored('brg-kimi-key'), providerStore = stored('brg-ai-provider');
    const keyStores = { claude: ownKey, gemini: geminiKey, kimi: kimiKey }, keyRevision = ref(0);
    const savedProvider = providerStore.get();
    const aiProvider = ref(savedProvider === 'kimi' && kimiKey.get() ? 'kimi' : savedProvider === 'gemini' && geminiKey.get() ? 'gemini' : ownKey.get() || cfg.chatEndpoint ? 'claude' : geminiKey.get() ? 'gemini' : kimiKey.get() ? 'kimi' : 'claude');
    const providerInfo = (id) => AI_PROVIDERS.find((provider) => provider.id === id) || AI_PROVIDERS[0];
    const providerName = () => providerInfo(aiProvider.value).label;
    const providerModel = (id) => id === 'gemini' ? cfg.geminiModel : id === 'kimi' ? cfg.kimiModel : '';
    function providerHasPersonalKey(id) { keyRevision.value; return !!keyStores[id]?.get(); }
    function providerConfigured(id) { keyRevision.value; return id === 'claude' ? !!(ownKey.get() || cfg.chatEndpoint) : providerHasPersonalKey(id); }
    function selectProvider(name) {
      if (ai.abort) { say(`${providerName()} is still answering; wait, or /stop.`, 'err'); return false; }
      if (!providerConfigured(name)) return false;
      aiProvider.value = name;
      providerStore.set(name);
      ai.history = []; ai.geminiHistory = []; ai.kimiHistory = []; ai.container = undefined;
      return true;
    }
    function saveProviderKey(name, value) {
      if (ai.abort) { say(`${providerName()} is still answering; wait, or /stop.`, 'err'); return false; }
      const key = (value || '').trim(), info = providerInfo(name);
      if (!(name === 'claude' ? /^sk-ant-/.test(key) : /^[\w-]{20,200}$/.test(key))) {
        say(`Paste the complete ${info.label} API key. Nothing was stored.`, 'err');
        return false;
      }
      keyStores[name].set(key);
      keyRevision.value++;
      selectProvider(name);
      say(`${info.label} connected. Your key stays in this browser and is sent only to ${info.destination}. Notebook tools use the live Jupyter session; BRG tools use the existing MCP server.`, 'dim');
      return true;
    }
    function removeProviderKey(name) {
      if (ai.abort) { say(`${providerName()} is still answering; wait, or /stop.`, 'err'); return false; }
      keyStores[name].set('');
      keyRevision.value++;
      if (aiProvider.value === name) {
        const fallback = AI_PROVIDERS.find((provider) => provider.id !== name && providerConfigured(provider.id));
        if (fallback) selectProvider(fallback.id);
        else providerStore.set('');
      }
      say(`${providerInfo(name).label} key removed from this browser.`, 'dim');
      closeProviderMenu();
      return true;
    }
    const providerItems = computed(() => AI_PROVIDERS.map((provider) => ({ ...provider, active: provider.id === aiProvider.value && aiOn.value, configured: providerConfigured(provider.id) })));
    const providerMenuOpen = ref(false), keyFormProvider = ref(''), keyInput = ref(''), keyInputEl = ref(null), providerMenuEl = ref(null);
    function closeProviderMenu() { providerMenuOpen.value = false; keyFormProvider.value = ''; keyInput.value = ''; }
    function toggleProviderMenu() {
      if (providerMenuOpen.value) closeProviderMenu();
      else { providerMenuOpen.value = true; keyFormProvider.value = ''; keyInput.value = ''; }
    }
    function editProviderKey(name) {
      providerMenuOpen.value = true;
      keyFormProvider.value = name;
      keyInput.value = '';
      nextTick(() => keyInputEl.value?.focus());
    }
    function chooseProvider(name) {
      if (!providerConfigured(name)) { editProviderKey(name); return; }
      if (name !== aiProvider.value && selectProvider(name)) say(`Now using ${providerName()}${providerModel(name) ? ' · ' + providerModel(name) : ''}. New conversation.`, 'dim');
      closeProviderMenu();
    }
    function submitProviderKey() {
      if (keyFormProvider.value && saveProviderKey(keyFormProvider.value, keyInput.value)) closeProviderMenu();
    }
    const closeProviderOnOutside = (event) => { if (providerMenuOpen.value && providerMenuEl.value && !providerMenuEl.value.contains(event.target)) closeProviderMenu(); };
    onMounted(() => document.addEventListener('pointerdown', closeProviderOnOutside));
    onBeforeUnmount(() => document.removeEventListener('pointerdown', closeProviderOnOutside));
    // What Claude cost from this browser: [{at, cost}], and the credits loaded, kept locally. The API key cannot
    // read the account's balance; the Claude Console's Billing and Cost pages have the exact figures.
    const spentLog = { all: () => { try { return JSON.parse(localStorage.getItem('brg-spent') || '[]'); } catch (e) { return []; } },
      add(cost) { try { localStorage.setItem('brg-spent', JSON.stringify([...this.all(), { at: Date.now(), cost }].slice(-5000))); } catch (e) { /* private window */ } } };
    const budget = stored('brg-budget');
    // The editor starts alone; opening the terminal does not remount either session.
    const splitEl = ref(null), collapsedPane = ref('chat'), splitDragging = ref(false);
    const splitStacked = ref(matchMedia('(max-width: 900px)').matches);
    const ratioStore = stored('brg-workspace-ratio');
    const savedRatio = Number(ratioStore.get());
    const splitRatio = ref(savedRatio >= 0.15 && savedRatio <= 0.85 ? savedRatio : 0.72);
    let splitPointer = null;
    const dividerSize = () => parseFloat(getComputedStyle(splitEl.value).getPropertyValue('--divider-size')) || 1;
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
    function toggleTerminal() {
      collapsedPane.value = collapsedPane.value === 'chat' ? '' : 'chat';
      if (!collapsedPane.value) nextTick(() => prompt.value?.focus());
    }
    function resetSplit() { collapsedPane.value = 'chat'; splitRatio.value = 0.72; ratioStore.set(String(splitRatio.value)); }
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
    const aiOn = computed(() => providerConfigured(aiProvider.value));
    const aiLabel = computed(() => !aiOn.value ? '' : aiProvider.value === 'claude' && cfg.chatEndpoint ? 'Claude' : `${providerName()}, your key`);
    const menuIndex = ref(0);
    const logEl = ref(null);
    const prompt = ref(null);
    const viewerEl = ref(null);
    const drawingIds = ref([]);
    const notebookEl = ref(null);
    const notebookFile = computed(() => notebookExercise(route.exercise)?.file || '01-basics/01-box.ipynb');
    const notebookSrc = 'jupyter/lab/index.html';
    const fileBrowserState = stored('brg-jupyter-file-browser');
    let notebookChromeInitialized = false;
    function rememberNotebookChrome() {
      const fileBrowser = notebookEl.value?.contentDocument?.querySelector('.jp-FileBrowser');
      if (fileBrowser) fileBrowserState.set(fileBrowser.closest('[hidden], .lm-mod-hidden') ? 'closed' : 'open');
    }
    onMounted(() => addEventListener('pagehide', rememberNotebookChrome));
    onBeforeUnmount(() => removeEventListener('pagehide', rememberNotebookChrome));
    function fitNotebookChrome(app) {
      app.shell._leftHandler.sideBar.show();
      app.shell._rightHandler.sideBar.hide();
      for (const id of ['jp-top-panel', 'jp-bottom-panel']) app.shell.layout.widgets.find((widget) => widget.id === id)?.show();
      if (notebookChromeInitialized) return;
      if (fileBrowserState.get() === 'open') {
        app.shell.expandLeft();
        app.shell.activateById('filebrowser');
      } else app.shell.collapseLeft();
      notebookChromeInitialized = true;
    }
    async function openNotebook() {
      // Same-origin JupyterLab API: open another file without reloading the iframe or its kernels.
      const frame = notebookEl.value;
      if (!frame) return;
      const frameDocument = frame.contentDocument;
      if (frameDocument && !frameDocument.getElementById('brg-jupyter-theme')) {
        const fontStyles = document.querySelector('link[href^="https://fonts.googleapis.com"]');
        if (fontStyles) {
          const fonts = frameDocument.createElement('link');
          fonts.rel = 'stylesheet';
          fonts.href = fontStyles.href;
          frameDocument.head.append(fonts);
        }
        const stylesheet = frameDocument.createElement('link');
        stylesheet.id = 'brg-jupyter-theme';
        stylesheet.rel = 'stylesheet';
        stylesheet.href = new URL('notebook-theme.css', location.href).href;
        frameDocument.head.append(stylesheet);
      }
      const started = Date.now();
      while (frame === notebookEl.value && !frame.contentWindow?.jupyterapp && Date.now() - started < 30000) await new Promise((done) => setTimeout(done, 100));
      const app = frame.contentWindow?.jupyterapp;
      if (!app || frame !== notebookEl.value) return;
      try {
        await app.restored;
        await app.serviceManager.ready;
        while (frame === notebookEl.value && frame.contentDocument.visibilityState === 'hidden') {
          await new Promise((done) => frame.contentDocument.addEventListener('visibilitychange', done, { once: true }));
        }
        if (frame !== notebookEl.value) return;
        for (const id of ['@jupyterlite/pyodide-kernel-extension:kernel', 'jupyter.extensions.jupyter-threejs']) {
          const deadline = Date.now() + 30000;
          while (frame === notebookEl.value && !app.hasPlugin(id) && Date.now() < deadline) await new Promise((done) => setTimeout(done, 100));
          if (frame !== notebookEl.value) return;
          if (!app.hasPlugin(id)) throw new Error(`The Jupyter plugin did not load: ${id}`);
          await app.activatePlugin(id);
        }
        await app.serviceManager.kernelspecs.refreshSpecs();
        const widget = await app.commands.execute('docmanager:open', {
          path: notebookFile.value, factory: 'Notebook',
          kernel: { name: app.serviceManager.kernelspecs.specs.default },
          kernelPreference: { language: 'python', autoStartDefault: true },
        });
        await widget?.context.ready;
        if (widget && !widget.sessionContext.session?.kernel) {
          await widget.sessionContext.changeKernel({ name: app.serviceManager.kernelspecs.specs.default || 'python' });
        }
        app.shell.mode = 'multiple-document';
        app.shell.collapseRight();
        fitNotebookChrome(app);
        await app.commands.execute('filebrowser:go-to-path', { path: '', dontShowBrowser: true });
        if (widget?.id) app.shell.activateById(widget.id);
        await app.commands.execute('notebook:render-all-markdown');
      } catch (e) { console.warn('Could not open the exercise in Jupyter.', e); }
    }
    // The shared AI notebook tool writes MCP-generated cells into JupyterLite and opens them on the left.
    // A notebook skill calls its MCP tool directly, without an AI provider, and opens the notebook it returns.
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
    say('BRG terminal · /help for commands.', 'dim');
    if (aiOn.value) say(`Ask ${providerName()} about this notebook: it can read cells and errors, run Python, and make requested edits. BRG sources and figures are also available.`, 'dim');
    else say('Library tools are ready. Connect Claude with /key <Anthropic key> or Gemini with /key gemini <key>.', 'dim');

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
      linkOrigFigures(id, () => view.kind === 'doc', () => viewerEl.value?.querySelector('.md'));
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
        const shown = line.replace(/^(\/key\s+(?:(?:gemini|claude|kimi)\s+)?)(\S{6})\S+/, '$1$2••••'); // the full key is masked and omitted from history
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
          say('Anything else goes to the selected AI when it is connected (/key), else it searches the library.', 'dim');
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
          say('Save with Ctrl+S; use File → Save and Export Notebook As → Notebook to keep a copy on your computer. The connected AI can inspect cells and errors, run code and edit this notebook when you ask.', 'dim');
        }
        else if (cmd === '/close') closeSheet();
        else if (cmd === '/clear') log.value = [];
        else if (cmd === '/usage') {
          if (aiProvider.value !== 'claude') say(`${providerName()} usage and quotas are in ${aiProvider.value === 'kimi' ? 'the Kimi Platform console' : 'Google AI Studio'}. The cost estimate below is for Claude only.`, 'dim');
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
        else if (cmd === '/new') { ai.history = []; ai.geminiHistory = []; ai.kimiHistory = []; ai.container = undefined; say(`New conversation with ${providerName()}.`, 'dim'); }
        else if (cmd === '/stop') { if (ai.abort) ai.abort.abort(); else say(`${providerName()} is not working on anything.`, 'dim'); }
        else if (cmd === '/model') {
          const name = arg.toLowerCase();
          if (!name) {
            say(`Using ${providerName()}${providerModel(aiProvider.value) ? ' · ' + providerModel(aiProvider.value) : ''}. Switch with /model claude, /model gemini or /model kimi.`, 'out');
            say(providerItems.value.map((provider) => `${provider.label}: ${provider.configured ? 'configured' : 'no key'}`).join(' · '), 'dim');
          } else if (!AI_PROVIDERS.some((provider) => provider.id === name)) say('Usage: /model claude, /model gemini or /model kimi.', 'err');
          else if (!providerConfigured(name)) { say(`Add a ${providerInfo(name).label} key in the provider menu or with /key ${name} <key>.`, 'err'); editProviderKey(name); }
          else if (selectProvider(name)) say(`Now using ${providerName()}${providerModel(name) ? ' · ' + providerModel(name) : ''}. New conversation.`, 'dim');
        }
        else if (cmd === '/key') {
          const k = arg.trim();
          const providerCommand = k.match(/^(claude|gemini|kimi)(?:\s+(.*))?$/i);
          if (providerCommand) {
            const name = providerCommand[1].toLowerCase(), key = (providerCommand[2] || '').trim();
            if (key === 'off') removeProviderKey(name);
            else if (key) saveProviderKey(name, key);
            else if (providerHasPersonalKey(name)) { selectProvider(name); say(`Using your saved ${providerInfo(name).label} key.`, 'dim'); }
            else {
              say(`Create a ${providerInfo(name).label} token with the provider link, then paste it here. Nothing was stored.`, 'dim');
              editProviderKey(name);
            }
          } else if (/^sk-ant-/.test(k)) saveProviderKey('claude', k);
          else if (/^AIza[\w-]{20,}$/.test(k)) saveProviderKey('gemini', k);
          else if (!k) {
            say('Choose a provider in the bottom menu, or type /key <provider> <key>.', 'dim');
            providerMenuOpen.value = true;
            keyFormProvider.value = '';
          } else if (k === 'off') {
            Object.values(keyStores).forEach((store) => store.set(''));
            keyStore.set(''); providerStore.set(''); keyRevision.value++;
            aiProvider.value = 'claude';
            ai.history = []; ai.geminiHistory = []; ai.kimiHistory = []; ai.container = undefined;
            closeProviderMenu();
            say('API keys removed from this browser.', 'dim');
          } else if (cfg.chatEndpoint) { keyStore.set(k); keyRevision.value++; selectProvider('claude'); say('Class key kept in this browser.', 'dim'); }
          else say('Key not recognised. Choose a provider in the bottom menu, or use /key <provider> <key>. Nothing was stored.', 'err');
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
            const items = [...tpl.content.querySelectorAll('img')].map((img) => ({ src: img.src, alt: img.alt, name: img.src.split('/').pop().split('?')[0] }));
            setView({ kind: 'figures', title: `Figures · ${view.title}`, items, open: view.open });
            linkOrigFigures(id, () => view.kind === 'figures', () => viewerEl.value?.querySelector('.v-figs'));
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
            say('Arguments in order or as name=value, e.g. ' + list[0].cmd + (list[0].args.length ? ' ' + list[0].args[0] + '=3' : '') + '. Or ask the selected AI in words.', 'dim');
          }
        } else if (skills.value.some((k) => k.cmd === cmd.toLowerCase())) await runSkill(skills.value.find((k) => k.cmd === cmd.toLowerCase()), args);
        else if (cmd.startsWith('/')) say('Unknown command. Type /help.', 'err');
        else if (aiOn.value) await askAI(line);
        else if (ready() && showHits(line, search(line, allSections.value))) keep();
      } catch (e) {
        say(e instanceof TypeError ? 'Could not reach the library (network or CORS).' : e.message, 'err');
        if (view.kind === 'loading') setView({ kind: 'error', title: 'Error', error: e.message });
      } finally { busy.value = false; }
    }
    async function askAI(line) {
      if (aiProvider.value === 'gemini') return askGemini(line);
      if (aiProvider.value === 'kimi') return askKimi(line);
      return askClaude(line);
    }
    async function askKimi(line) {
      if (ai.abort) { say('Kimi is still answering; wait, or /stop.', 'err'); return; }
      const mark = ai.kimiHistory.length;
      ai.kimiHistory.push({ role: 'user', content: line });
      ai.abort = new AbortController();
      try {
        await loadKimi();
        if (!ai.mcpTools) ai.mcpTools = (await mcpCall('tools/list', {}, ai.abort.signal)).tools || [];
        const done = await window.BRGKimi.converse({
          apiKey: kimiKey.get(), model: cfg.kimiModel || window.BRGKimi.DEFAULT_MODEL,
          endpoint: KIMI_API, history: ai.kimiHistory, tools: ai.mcpTools,
          callTool: (name, args, signal) => mcpCall('tools/call', { name, arguments: args }, signal),
          callNotebookTool: (name, args, signal) => window.BRGNotebook.call(notebookEl.value, name, args, signal),
          writeNotebook: async (file, cells) => {
            say(`· notebook: ${file}`, 'dim');
            return notebookForClaude(file, cells);
          },
          onEvent: onAIEvent, signal: ai.abort.signal,
        });
        ai.kimiHistory.push(...done.messages);
        if (done.stop === 'length') say('The answer was cut off (too long). Ask for less at once.', 'err');
        else if (done.stop === 'rounds') say('Kimi took many steps without finishing; ask it to continue.', 'dim');
      } catch (e) {
        ai.kimiHistory.length = mark;
        if (e.name === 'AbortError') say('Stopped.', 'err');
        else if (e instanceof TypeError) say('Could not reach Kimi or the BRG MCP server (network or CORS).', 'err');
        else if (e.status === 401 || e.status === 403) say('Kimi refused this API key. Use a Kimi Platform key from the provider menu; Kimi Code membership keys use a different service.', 'err');
        else if (e.status === 429) say('Kimi’s usage limit is reached. Check the quota and billing for your key in the Kimi Platform console.', 'err');
        else say(e.message, 'err');
      } finally {
        endStream();
        ai.abort = null;
      }
    }
    async function askGemini(line) {
      if (ai.abort) { say('Gemini is still answering; wait, or /stop.', 'err'); return; }
      const mark = ai.geminiHistory.length;
      ai.geminiHistory.push({ role: 'user', parts: [{ text: line }] });
      ai.abort = new AbortController();
      try {
        await loadGemini();
        if (!ai.mcpTools) ai.mcpTools = (await mcpCall('tools/list', {}, ai.abort.signal)).tools || [];
        const done = await window.BRGGemini.converse({
          apiKey: geminiKey.get(), model: cfg.geminiModel || window.BRGGemini.DEFAULT_MODEL,
          endpoint: GEMINI_API, history: ai.geminiHistory, tools: ai.mcpTools,
          callTool: (name, args, signal) => mcpCall('tools/call', { name, arguments: args }, signal),
          callNotebookTool: (name, args, signal) => window.BRGNotebook.call(notebookEl.value, name, args, signal),
          writeNotebook: async (file, cells) => {
            say(`· notebook: ${file}`, 'dim');
            return notebookForClaude(file, cells);
          },
          onEvent: onAIEvent, signal: ai.abort.signal,
        });
        ai.geminiHistory.push(...done.messages);
        if (done.stop === 'MAX_TOKENS') say('The answer was cut off (too long). Ask for less at once.', 'err');
        else if (done.stop === 'rounds') say('Gemini took many steps without finishing; ask it to continue.', 'dim');
      } catch (e) {
        ai.geminiHistory.length = mark;
        if (e.name === 'AbortError') say('Stopped.', 'err');
        else if (e instanceof TypeError) say('Could not reach Gemini or the BRG MCP server (network or CORS).', 'err');
        else if (e.status === 400 && /api.key|key.invalid/i.test(e.message)) say('Gemini refused this API key. Replace it with /key gemini <key>.', 'err');
        else if (e.status === 401 || e.status === 403) say('Gemini refused access to this key. Check its restrictions and Generative Language API access in Google AI Studio.', 'err');
        else if (e.status === 429) say('Gemini’s usage limit is reached. Check the quota for your key in Google AI Studio or try again later.', 'err');
        else say(e.message, 'err');
      } finally {
        endStream();
        ai.abort = null;
      }
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
    let claudeScript = null, geminiScript = null, kimiScript = null;
    const loadClaude = () => claudeScript || (claudeScript = new Promise((done, fail) => {
      const tag = Object.assign(document.createElement('script'), { src: 'vendor/brg-claude.js', onload: done, onerror: () => { claudeScript = null; fail(new Error('Could not load the Claude client.')); } });
      document.head.append(tag);
    }));
    const loadGemini = () => geminiScript || (geminiScript = new Promise((done, fail) => {
      const tag = Object.assign(document.createElement('script'), { src: 'brg-gemini.js', onload: done, onerror: () => { geminiScript = null; fail(new Error('Could not load the Gemini client.')); } });
      document.head.append(tag);
    }));
    const loadKimi = () => kimiScript || (kimiScript = new Promise((done, fail) => {
      const tag = Object.assign(document.createElement('script'), { src: 'brg-kimi.js', onload: done, onerror: () => { kimiScript = null; fail(new Error('Could not load the Kimi client.')); } });
      document.head.append(tag);
    }));
    function onAIEvent(e) {
      if (e.t === 'thinking' || e.t === 'text') streamInto(e.t, e.d);
      else if (e.t === 'tool') {
        endStream(); say(toolLine(e), 'dim');
        if (e.name === 'look_at_figure' && e.input && e.input.url) {
          const src = /^https:\/\//.test(e.input.url) ? e.input.url : fileUrl(e.input.url);
          say(`${providerName()} is looking at ${src.split('/').slice(-3).join('/')}`, 'fig', null, src, src);
        }
      }
    }
    async function claudeRound(signal) {
      if (!cfg.chatEndpoint) {
        await loadClaude();
        const env = { ANTHROPIC_API_KEY: ownKey.get(), ANTHROPIC_BASE_URL: devParam('anthropic') || undefined, BROWSER: true, MODEL: window.BRGClaude.DEFAULT_MODEL, EFFORT: 'medium',
          MCP_URL: cfg.mcpEndpoint,
          NOTEBOOK_TOOL: (name, args, toolSignal) => window.BRGNotebook.call(notebookEl.value, name, args, toolSignal) };
        try {
          const done = await window.BRGClaude.converse(env, [...ai.history], ai.container, onAIEvent, signal);
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
          if (e.t === 'done') done = e; else onAIEvent(e);
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
      if (e.name === 'notebook_inspect') return `· reading the open notebook${i.cell ? ' · cell ' + i.cell : ''}`;
      if (e.name === 'notebook_run') return `· ${i.all ? 'running all notebook cells' : 'running notebook cell ' + (i.cell || 'active')}`;
      if (e.name === 'notebook_execute') return '· running Python in the notebook kernel';
      if (e.name === 'notebook_update') return `· updating notebook cell ${i.cell || 'active'}`;
      if (e.name === 'notebook_insert') return '· inserting a notebook cell';
      if (e.name === 'notebook_restart') return '· restarting the notebook kernel';
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
      if (v === 'terminal' && collapsedPane.value !== 'chat') nextTick(() => prompt.value?.focus());
    }, { immediate: true });

    return {
      cfg, state, error, books, query, route, shelf, shelfAll, subject, subjectsHere, coverOf, doc, libraryUrl, host, grouped, book, bookTitle, sectionCount, hits,
      prev, next, sectionTitle, readerHref, docUrl, groupOf, groupLabel, series, partsOf, partInfo, bookInfo, seriesKey, plural, years, coverImg,
      pixel: PIXEL, pixelCols: PIXEL_COLS, log, input, busy, menuItems, menuIndex, takeMenu, onKey, submit, focusPrompt, prompt, logEl,
      splitEl, splitRatio, collapsedPane, splitDragging, splitStacked, beginSplitDrag, dragSplit, endSplitDrag, splitKey, toggleTerminal,
      view, viewStack, viewBack, viewerEl, onViewerClick, run, drawingIds, closeSheet, aiLabel, notebookSrc, notebookOpened, notebookEl, notebookFile, openNotebook,
      aiOn, aiProvider, providerInfo, providerItems, providerName, providerHasPersonalKey, providerMenuOpen, providerMenuEl, keyFormProvider, keyInput, keyInputEl,
      toggleProviderMenu, closeProviderMenu, chooseProvider, editProviderKey, submitProviderKey, removeProviderKey,
    };
  },
}).mount('#app');
