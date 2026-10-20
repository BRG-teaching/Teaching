// Library: reads LIBRARY.md from the R2 bucket and renders books, chapters and a terminal.
// The catalogue format is the one mcp-server-brg parses (src/brg_mcp/adapters/public_books.py):
//   ## `book-id/` — Title, Author, Year
//     - `01-chapter.md` **Chapter title** summary
const { createApp, ref, reactive, computed, watch, nextTick, onMounted } = Vue;
const cfg = window.CAS_LIBRARY;
// ?chat=http://localhost:8788 tries a local copy of the Claude service (CAS/brg-terminal-ai/test/serve.mjs).
// Only a local address: a link to another site could otherwise collect the conversation and the key.
// ?anthropic=http://localhost:8790 points the own-key mode at the mock Claude API of those tests.
const LOCAL = /^http:\/\/(localhost|127\.0\.0\.1):\d+\/?$/, devParam = (k) => { const v = new URLSearchParams(location.search).get(k); return v && LOCAL.test(v) ? v : ''; };
if (devParam('chat')) cfg.chatEndpoint = devParam('chat');
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
const TOPICS = {
  truss: { label: 'trusses and the Cremona diagram', avoid: ['polyhedr', 'polyedr'],
    words: [['truss', 4], ['roof truss', 2], ['cremona', 4], ['reciprocal figure', 3], ['treillis', 3], ['fachwerk', 3], ['lattice', 2], ['articulated', 2], ['articule', 2], ['kraefteplan', 2], ['reciproque', 1], ['reciprocal', 1], ['bow', 1]] },
  funicular: { label: 'the funicular polygon', avoid: [],
    words: [['funicular', 4], ['funiculaire', 4], ['seilpolygon', 4], ['catenary', 3], ['chainette', 3], ['force polygon', 2], ['polygone des forces', 2], ['thrust line', 2], ['arch', 1], ['voute', 1]] },
};
// What the templates cannot draw: such a request needs Claude's reasoning, not the nearest template.
const BEYOND = {
  truss: /\b(lower|higher|uneven|unequal|different heights?|sloped|sloping|inclined|settle\w*|circular|circle|round|ring|curved|arched|bowstring|lenticular|parabolic|polygonal|space|spatial|3d|three[- ]dimensional|dome|tower|cantilever|bridge|crane|k[- ]truss|vierendeel|scissors?|hammer ?beam|three[- ]hinged|continuous|irregular|asymmetric|inclined loads?|wind)\b/,
  funicular: /\b(three[- ]hinged|two[- ]hinged|hinged|dome|vault(ed)? shell|shell|space|spatial|3d|net|network|membrane|inclined loads?|wind|moving loads?|influence line)\b/,
};
let phraseWhy = '';

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
  { cmd: '/notebook', help: '[box | cable] open an exercise and its instructions', arg: true },
  { cmd: '/help', help: 'list the commands' },
  { cmd: '/books', help: 'show the books, theses and papers' },
  { cmd: '/book', help: '<id> show the chapters of one book', arg: true },
  { cmd: '/search', help: '<words> search chapter titles and summaries', arg: true },
  { cmd: '/open', help: '<book>/<chapter.md> show a chapter in the viewer', arg: true },
  { cmd: '/read', help: '<book>/<chapter.md> [start] [lines] print lines here, show the chapter there', arg: true },
  { cmd: '/figures', help: '<book>/<chapter.md> show every figure of a chapter', arg: true },
  { cmd: '/page', help: '<book>/<chapter.md> <page> print a printed page of a book here', arg: true },
  { cmd: '/drawings', help: 'show the eQUILIBRIUM step-by-step drawings' },
  { cmd: '/drawing', help: '<n> [step] play drawing n in the viewer', arg: true },
  { cmd: '/viewer', help: 'list the session viewer commands (Box, Sphere, Line, Move, Undo…)' },
  { cmd: '/close', help: 'close the sheet and show the 3D scene' },
  { cmd: '/clear', help: 'clear the transcript' },
  { cmd: '/new', help: 'start a new conversation with Claude' },
  { cmd: '/stop', help: 'stop Claude’s answer' },
  { cmd: '/key', help: '<key> your Anthropic API key (sk-ant-…) or the class key; /key off removes them', arg: true },
  { cmd: '/usage', help: 'what Claude cost from this browser, and what is left of /budget' },
  { cmd: '/budget', help: '<dollars> the credits you loaded, to estimate what is left', arg: true },
  { cmd: '/local', help: '<words> build from plain words here, without Claude', arg: true },
];
// The session viewer's own commands (viewer-commands.js); a line starting with one of them is
// passed to the viewer's command line, e.g. "Box 0,0,0 100 50 30".
const VIEWER_CMDS = (window.SESSION_VIEWER_COMMANDS || []).slice().sort((a, b) => b.cmd.length - a.cmd.length);
// Exactly a viewer command: its name, then only numbers, points, colours or words from its own help and options
// ("Box 0,0,0 100 50 30", "View Top", "Color #3f9c20"); "delete everything and …" is a request, not the Delete command.
function exactViewerCommand(line) {
  const c = viewerCommandOf(line);
  if (!c) return false;
  const known = new Set((c.help + ' ' + (c.example || '')).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').match(/[a-z]+/g) || []);
  const rest = line.slice(c.cmd.length).trim().split(/\s+/).filter(Boolean);
  if (rest.length <= 2 && rest.every((w) => /^[A-Z][a-z]*$/.test(w))) return true; // an option, as typed in the viewer
  return rest.every((w) => (/^[-+\d.,#a-f]+$/i.test(w) && /[\d#]/.test(w)) || known.has(w.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')));
}
const viewerCommandOf = (line) => VIEWER_CMDS.find((c) => line.toLowerCase() === c.cmd.toLowerCase() || line.toLowerCase().startsWith(c.cmd.toLowerCase() + ' '));
// Plain words for the scene, turned into viewer commands without an AI: "create a box", "delete everything",
// "select all and move up 200", "rotate the box 45 degrees around x", "top view", "create a table".
const SHAPE_WORDS = { box: 'Box', cube: 'Box', block: 'Box', sphere: 'Sphere', ball: 'Sphere', cylinder: 'Cylinder', column: 'Cylinder',
  cone: 'Cone', torus: 'Torus', ring: 'Torus', pyramid: 'Pyramid', capsule: 'Capsule', point: 'Point', line: 'Line', arrow: 'Arrow',
  polyline: 'Polyline', curve: 'Curve', circle: 'Nurbs Curve Circle', arc: 'Nurbs Curve Arc', ellipse: 'Nurbs Curve Ellipse',
  parabola: 'Nurbs Curve Parabola', tetrahedron: 'Tetrahedron', octahedron: 'Octahedron', icosahedron: 'Icosahedron', dodecahedron: 'Dodecahedron', text: 'Text' };
// Shapes the viewer would otherwise wait for clicks on.
const SHAPE_DEFAULTS = { Point: 'Point 0,0,0', Polyline: 'Polyline 0,0,0 1000,0,0 1000,1000,0', Text: 'Text Hello' };
// A line starting with "=" answers the running command (an option such as "Height 200") instead of ending it.
const NUM = '-?\\d+(?:\\.\\d+)?';
const POINT = new RegExp(`${NUM}\\s*,\\s*${NUM}(?:\\s*,\\s*${NUM})?`, 'g');
const pointsIn = (s) => (s.match(POINT) || []).map((p) => p.replace(/\s+/g, ''));
const numbersIn = (s) => (s.replace(POINT, ' ').match(new RegExp(NUM, 'g')) || []).map(Number);
const shapeIn = (s) => {
  for (const w of s.match(/[a-z]+/g) || []) for (const k of [w, w.replace(/es$/, ''), w.replace(/s$/, '')]) if (SHAPE_WORDS[k]) return SHAPE_WORDS[k];
  return '';
};
// Furniture and building parts made of boxes and cylinders, in millimetres (the viewer's grid is 1000 apart).
function sizesIn(s) {
  const wd = s.match(new RegExp(`(${NUM})\\s*(?:x|by|×)\\s*(${NUM})`));
  const h = s.match(new RegExp(`(${NUM})\\s*(?:mm\\s*)?(?:high|tall)|height\\s*(?:of\\s*)?(${NUM})`));
  return { l: wd ? +wd[1] : 0, w: wd ? +wd[2] : 0, h: h ? +(h[1] || h[2]) : 0 };
}
const legs = (l, w, inset, side, h) => [[1, 1], [-1, 1], [1, -1], [-1, -1]].map(([a, b]) => `Box ${a * (l / 2 - inset)},${b * (w / 2 - inset)},0 ${side} ${side} ${h}`);
const RECIPES = {
  table: (s) => { const z = sizesIn(s), l = z.l || 1200, w = z.w || 800, h = z.h || 750; return [`Box 0,0,${h - 40} ${l} ${w} 40`, ...legs(l, w, 70, 60, h - 40)]; },
  desk: (s) => RECIPES.table(s),
  stool: (s) => { const z = sizesIn(s), l = z.l || 350, h = z.h || 650; return [`Box 0,0,${h - 30} ${l} ${l} 30`, ...legs(l, l, 40, 40, h - 30)]; },
  bench: (s) => { const z = sizesIn(s), l = z.l || 1600, w = z.w || 400, h = z.h || 450; return [`Box 0,0,${h - 40} ${l} ${w} 40`, ...legs(l, w, 80, 60, h - 40)]; },
  chair: (s) => { const z = sizesIn(s), l = z.l || 450, h = z.h || 450; return [`Box 0,0,${h - 30} ${l} ${l} 30`, ...legs(l, l, 30, 40, h - 30), `Box 0,${-(l / 2 - 20)},${h} ${l} 40 ${h}`]; },
  shelf: (s) => {
    const z = sizesIn(s), l = z.l || 800, d = z.w || 300, h = z.h || 1800, n = Math.max(2, Math.min(12, (s.match(/(\d+)\s*(?:shelves|shelfs|levels|boards)/) || [])[1] || 5));
    return [`Box ${-(l / 2 - 10)},0,0 20 ${d} ${h}`, `Box ${l / 2 - 10},0,0 20 ${d} ${h}`, ...Array.from({ length: n }, (_, i) => `Box 0,0,${Math.round(i * (h - 20) / (n - 1))} ${l - 40} ${d} 20`)];
  },
  stair: (s) => {
    const n = Math.max(2, Math.min(40, +((s.match(/(\d+)\s*(?:steps|treads|risers)/) || [])[1] || 10))), w = sizesIn(s).w || 1000;
    return Array.from({ length: n }, (_, i) => `Box 0,${i * 280 + 140},0 ${w} 280 ${(i + 1) * 175}`);
  },
  wall: (s) => { const n = numbersIn(s), z = sizesIn(s); return [`Box 0,0,0 ${z.l || n[0] || 5000} ${z.w || 200} ${z.h || n[1] || 3000}`]; },
  slab: (s) => { const z = sizesIn(s); return [`Box 0,0,0 ${z.l || 6000} ${z.w || 4000} ${z.h || 200}`]; },
  'column grid': (s) => {
    const m = s.match(/(\d+)\s*(?:x|by|×)\s*(\d+)/), nx = Math.min(20, +(m ? m[1] : 3)), ny = Math.min(20, +(m ? m[2] : 3)), h = sizesIn(s).h || 3000, gap = 4000;
    const out = [];
    for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) out.push(`Cylinder ${(i - (nx - 1) / 2) * gap},${(j - (ny - 1) / 2) * gap},0 150 ${h}`);
    return out;
  },
  frame: (s) => { const z = sizesIn(s), l = z.l || 6000, h = z.h || 3000; return [`Box ${-l / 2},0,0 300 300 ${h}`, `Box ${l / 2},0,0 300 300 ${h}`, `Box 0,0,${h} ${l + 300} 300 400`]; },
};
const RECIPE_WORDS = { table: 'table', tables: 'table', desk: 'desk', stool: 'stool', bench: 'bench', chair: 'chair', shelf: 'shelf', shelves: 'shelf',
  bookshelf: 'shelf', bookcase: 'shelf', stair: 'stair', stairs: 'stair', staircase: 'stair', steps: 'stair', wall: 'wall', slab: 'slab',
  floor: 'slab', grid: 'column grid', columns: 'column grid', frame: 'frame', portal: 'frame' };
const recipeIn = (s) => { if (/\bcolumns?\s+grid\b|\bgrid of columns\b/.test(s)) return 'column grid'; for (const w of s.match(/[a-z]+/g) || []) if (RECIPE_WORDS[w]) return RECIPE_WORDS[w]; return ''; };

// Graphic statics after Lévy (La Statique graphique I, ch. I): the funicular polygon of vertical loads, a hanging
// cable or, inverted, an arch, as its form diagram, with the force diagram beside it: the load line, the pole and the
// rays, each parallel to a segment of the cable. In the XZ plane (View Front), lengths in millimetres, forces in kN.
// The Equilibrium drawings' palette (2_computational_form_finding/Equilibrium/drawings/web/lib/eqdraw.js), also the
// BRG books' convention: compression navy, tension pink, external forces green, guides grey, zero force pale.
const PAL = { compression: '#1a1eb2', tension: '#ce4095', force: '#3f9c20', guide: '#aaaaaa', zero: '#b9b9bd' };
const FUNICULAR = /\b(funicular|funiculaire|cable|catenary|hanging chain|arch|thrust line)\b/;
const TRUSS = /\b(truss|trusses|cremona|maxwell|reciprocal|pratt|howe|warren|fink|king ?post|bow'?s notation|lattice girder|treillis)\b/;
// graphic statics asked for without naming a structure: the terminal asks which one
const STATICS = /\b(graphic static|statique graphique|force (diagram|polygon)|form (and|&|\+) force)/;
const wholeIn = (t) => recipeIn(t) || FUNICULAR.test(t) || TRUSS.test(t) || STATICS.test(t);
let phraseNotes = [];
function lengthIn(s, words, fallback) {
  const m = s.match(new RegExp(`\\b(?:${words})\\s*(?:of\\s*|=\\s*)?(${NUM})\\s*(mm|cm|m)?\\b`)) || s.match(new RegExp(`(${NUM})\\s*(mm|cm|m)?\\s*(?:${words})\\b`));
  if (!m) return fallback;
  const v = Math.abs(+m[1]), unit = m[2] || (v < 200 ? 'm' : 'mm');
  return v * (unit === 'm' ? 1000 : unit === 'cm' ? 10 : 1);
}
function funicular(s) {
  const arch = /\b(arch|vault|thrust line|compression)\b/.test(s);
  const listed = s.match(/\bloads?\s*(?:of\s*|=\s*)?(\d+(?:\.\d+)?(?:(?:\s*,\s*|\s+and\s+|\s+)\d+(?:\.\d+)?)+)/);
  const count = +((s.match(/(\d+)\s*(?:point\s+|equal\s+|vertical\s+)?(?:loads|forces|weights|nodes)/) || [])[1] || 0);
  const each = +((s.match(new RegExp(`(${NUM})\\s*kn\\b`)) || [])[1] || 10);
  let P = listed ? listed[1].match(/\d+(?:\.\d+)?/g).map(Number).filter((v) => v > 0) : [];
  if (!P.length) P = Array(Math.max(1, Math.min(24, count || 5))).fill(each);
  const n = P.length, total = P.reduce((a, v) => a + v, 0);
  const L = lengthIn(s, 'span|wide|long', 10000), f = lengthIn(s, 'sag|rise|dip|depth|height', L / 4);
  // the loads stand at equal spacing; the support reactions and bending moments of the simple beam give the shape
  const x = P.map((_, i) => L * (i + 1) / (n + 1));
  const RA = P.reduce((a, v, i) => a + v * (L - x[i]) / L, 0), RB = total - RA;
  const M = x.map((xi, i) => RA * xi - P.slice(0, i).reduce((a, v, j) => a + v * (xi - x[j]), 0));
  const H = Math.max(...M) / f;                                       // the thrust that gives the asked sag
  const z = M.map((m) => (arch ? 1 : -1) * m / H);
  const r = (v) => Math.round(v), pt = (X, Z) => `${r(X)},0,${r(Z)}`;
  // force diagram: 0.6 of the span holds all loads; the pole sits H from the load line, on the side that keeps the rays parallel
  const k = 0.6 * L / total, gap = 0.3 * L;
  const X0 = arch ? L + gap + H * k : L + gap, OX = arch ? X0 - H * k : X0 + H * k;
  const q = [RA * k];
  P.forEach((v) => q.push(q[q.length - 1] - v * k));
  const h = r(L / 40), text = (t, X, Z) => [`Text ${t}`, `=Height ${h}`, pt(X, Z)];
  const top = arch ? f : 0;
  const member = arch ? PAL.compression : PAL.tension;
  const cmds = [
    'Construction Plane XZ', // Text lies in the construction plane: stand the labels in the drawing's XZ plane
    `Polyline ${[pt(0, 0), ...x.map((xi, i) => pt(xi, z[i])), pt(L, 0)].join(' ')}`, `Color ${member}`, // the cable, or the arch
    `Line ${pt(0, 0)} ${pt(L, 0)}`, `Color ${PAL.guide}`,                                            // its closing string
    `Point ${pt(0, 0)}`, `Point ${pt(L, 0)}`,
    ...x.flatMap((xi, i) => [`Arrow ${pt(xi, z[i] + P[i] * k * 0.5)} ${pt(xi, z[i])}`, `Color ${PAL.force}`]), // the loads
    `Line ${pt(X0, q[0])} ${pt(X0, q[n])}`, `Color ${PAL.force}`,                                    // the load line
    ...q.flatMap((qz) => [`Line ${pt(OX, 0)} ${pt(X0, qz)}`, `Color ${member}`]),                    // the rays: the segments' forces
    `Line ${pt(OX, 0)} ${pt(X0, 0)}`, `Color ${PAL.guide}`, `Point ${pt(OX, 0)}`,                    // H, and the pole
    ...text(arch ? 'form diagram (arch)' : 'form diagram (cable)', 0, top + 2.5 * h + Math.max(...P) * k * 0.5),
    ...text('force diagram', Math.min(X0, OX), q[0] + 2.5 * h),
    ...text('O', OX + (arch ? -1.5 : 0.6) * h, 0.6 * h),
    ...text(`H = ${H.toFixed(1)} kN`, Math.min(X0, OX) + 0.2 * h, -1.6 * h),
    ...x.flatMap((xi, i) => text(`P${i + 1}`, xi + 0.4 * h, z[i] + P[i] * k * 0.5 - h)),
    'Escape', 'Construction Plane XY', 'View Front', 'Fit',
  ];
  const T = Math.max(Math.hypot(H, RA), Math.hypot(H, RB));
  phraseNotes.push(
    `${arch ? 'Funicular arch' : 'Funicular cable'} · ${n} load${n === 1 ? '' : 's'} (${P.join(', ')} kN) · span ${(L / 1000).toFixed(2)} m · ${arch ? 'rise' : 'sag'} ${(f / 1000).toFixed(2)} m`,
    `Reactions R_A = ${RA.toFixed(1)} kN, R_B = ${RB.toFixed(1)} kN · horizontal thrust H = ${H.toFixed(1)} kN, the pole distance`,
    `Largest ${arch ? 'compression' : 'tension'} ${T.toFixed(1)} kN, in the end segments · force scale 1 kN = ${r(k)} mm · Front view, XZ plane`,
    `Colours as in the Equilibrium drawings: ${arch ? 'compression navy' : 'tension pink'}, loads and load line green, closing string and H grey`,
    'Change it: “funicular cable with 7 loads of 12 kN span 20 m sag 4 m”, “funicular arch loads 10 20 30 20 10”',
  );
  return cmds;
}

// Graphic statics of a plane truss (Cremona, Maxwell): member forces from the equilibrium of the joints, and
// the force diagram from Bow's notation. Every space of the form diagram, between members and the lines of the
// external forces, is a point of the force diagram; every member is a line between two such points, parallel
// to it and as long as its force. Pratt, Howe, Warren and roof trusses, loads on the top or bottom chord.
function trussGeometry(kind, n, L, d, bottom, P) {
  const a = L / n, nodes = [], members = [], loads = [];
  const node = (x, z) => nodes.push({ x, z }) - 1;
  const bar = (i, j, group) => members.push({ i, j, group });
  const B = Array.from({ length: n + 1 }, (_, i) => node(i * a, 0));
  for (let i = 0; i < n; i++) bar(B[i], B[i + 1], 'bottom chord');
  if (kind === 'warren') {
    const T = Array.from({ length: n }, (_, i) => node((i + 0.5) * a, d));
    for (let i = 0; i < n - 1; i++) bar(T[i], T[i + 1], 'top chord');
    for (let i = 0; i < n; i++) { bar(B[i], T[i], 'diagonal'); bar(T[i], B[i + 1], 'diagonal'); }
    (bottom ? B.slice(1, -1) : T).forEach((k) => loads.push({ node: k, fz: -P }));
  } else if (kind === 'roof') {
    const T = B.map((b, i) => (i === 0 || i === n ? b : node(i * a, d * (1 - Math.abs(2 * i / n - 1)))));
    for (let i = 0; i < n; i++) bar(T[i], T[i + 1], 'top chord');
    for (let i = 1; i < n; i++) bar(B[i], T[i], 'vertical');
    for (let i = 1; i < n - 1; i++) (i < n / 2 ? bar(T[i], B[i + 1], 'diagonal') : bar(B[i], T[i + 1], 'diagonal'));
    (bottom ? B : T).slice(1, -1).forEach((k) => loads.push({ node: k, fz: -P }));
  } else {
    const T = Array.from({ length: n + 1 }, (_, i) => node(i * a, d));
    for (let i = 0; i < n; i++) bar(T[i], T[i + 1], 'top chord');
    for (let i = 0; i <= n; i++) bar(B[i], T[i], 'vertical');
    // Pratt: diagonals fall towards the middle (in tension under gravity); Howe: they rise towards it
    for (let i = 0; i < n; i++) ((i < n / 2) === (kind === 'pratt') ? bar(T[i], B[i + 1], 'diagonal') : bar(B[i], T[i + 1], 'diagonal'));
    if (bottom) B.slice(1, -1).forEach((k) => loads.push({ node: k, fz: -P }));
    else T.forEach((k, i) => loads.push({ node: k, fz: i === 0 || i === n ? -P / 2 : -P }));
  }
  return { nodes, members, loads, supports: [B[0], B[n]] };
}

// Member forces (tension positive) from the 2N joint equations, solved by least squares, which is exact for a
// statically determinate truss in equilibrium.
function solveTruss(nodes, members, forces) {
  const N = nodes.length, M = members.length;
  if (M + 3 !== 2 * N) throw new Error('This truss is not statically determinate.');
  const A = Array.from({ length: 2 * N }, () => new Float64Array(M)), b = new Float64Array(2 * N);
  members.forEach(({ i, j }, e) => {
    const dx = nodes[j].x - nodes[i].x, dz = nodes[j].z - nodes[i].z, l = Math.hypot(dx, dz);
    A[2 * i][e] += dx / l; A[2 * i + 1][e] += dz / l; A[2 * j][e] -= dx / l; A[2 * j + 1][e] -= dz / l;
  });
  forces.forEach((f) => { b[2 * f.node] -= f.fx; b[2 * f.node + 1] -= f.fz; });
  const K = Array.from({ length: M }, () => new Float64Array(M + 1));
  for (let r = 0; r < 2 * N; r++) for (let p = 0; p < M; p++) {
    if (!A[r][p]) continue;
    K[p][M] += A[r][p] * b[r];
    for (let q = 0; q < M; q++) K[p][q] += A[r][p] * A[r][q];
  }
  for (let c = 0; c < M; c++) {
    let best = c;
    for (let r = c + 1; r < M; r++) if (Math.abs(K[r][c]) > Math.abs(K[best][c])) best = r;
    if (Math.abs(K[best][c]) < 1e-9) throw new Error('This truss is a mechanism.');
    [K[c], K[best]] = [K[best], K[c]];
    for (let r = 0; r < M; r++) if (r !== c) { const f = K[r][c] / K[c][c]; if (f) for (let q = c; q <= M; q++) K[r][q] -= f * K[c][q]; }
  }
  return members.map((_, e) => K[e][M] / K[e][e]);
}

// Bow's notation: the spaces of the form diagram, found as the faces of the plane graph of the members and of
// the external forces' lines (drawn outwards, closed far away by a circle); then each space's point in the
// force diagram, walking from space to space across members and forces.
function bowSpaces(nodes, members, T, forces, L) {
  const V = nodes.map((n) => ({ x: n.x, z: n.z }));
  const cx = V.reduce((t, v) => t + v.x, 0) / V.length, cz = V.reduce((t, v) => t + v.z, 0) / V.length, R = 8 * L;
  const hull = convexHull(V);
  const outside = (x, z) => hull.some((h, i) => { const g = hull[(i + 1) % hull.length]; return (g.x - h.x) * (z - h.z) - (g.z - h.z) * (x - h.x) < -1e-6 * L; });
  const edges = [], elements = [];
  members.forEach((m, e) => { elements.push({ at: m.i, other: m.j, vec: (() => { const dx = nodes[m.j].x - nodes[m.i].x, dz = nodes[m.j].z - nodes[m.i].z, l = Math.hypot(dx, dz); return [T[e] * dx / l, T[e] * dz / l]; })(), member: e }); edges.push([m.i, m.j]); });
  const far = [];
  forces.forEach((f, k) => {
    const len = Math.hypot(f.fx, f.fz), u = [f.fx / len, f.fz / len], o = nodes[f.node];
    // the line is drawn on the side the arrow comes from (a push), else on the side it goes to (a pull)
    const d = outside(o.x - u[0] * 0.01 * L, o.z - u[1] * 0.01 * L) ? [-u[0], -u[1]] : [u[0], u[1]];
    const px = o.x - cx, pz = o.z - cz, bq = px * d[0] + pz * d[1], t = -bq + Math.sqrt(bq * bq - (px * px + pz * pz - R * R));
    const id = V.push({ x: o.x + t * d[0], z: o.z + t * d[1] }) - 1;
    far.push(id); f.ray = d;
    elements.push({ at: f.node, other: id, vec: [f.fx, f.fz], force: k });
    edges.push([f.node, id]);
  });
  // close the far ends with arcs of the circle, so the outside splits into one space between each two lines
  const ang = (id) => Math.atan2(V[id].z - cz, V[id].x - cx);
  far.sort((p, q) => ang(p) - ang(q));
  far.forEach((id, k) => {
    const next = far[(k + 1) % far.length];
    let a0 = ang(id), a1 = ang(next);
    if (a1 <= a0) a1 += 2 * Math.PI;
    const steps = Math.max(1, Math.ceil((a1 - a0) / 0.2));
    let prev = id;
    for (let s = 1; s < steps; s++) { const t = a0 + (a1 - a0) * s / steps; const v = V.push({ x: cx + R * Math.cos(t), z: cz + R * Math.sin(t) }) - 1; edges.push([prev, v]); prev = v; }
    edges.push([prev, next]);
  });
  // faces: walk each half-edge keeping the face on the left
  const out = V.map(() => []);
  edges.forEach(([u, v]) => { out[u].push(v); out[v].push(u); });
  out.forEach((list, u) => list.sort((p, q) => Math.atan2(V[p].z - V[u].z, V[p].x - V[u].x) - Math.atan2(V[q].z - V[u].z, V[q].x - V[u].x)));
  const face = new Map(), faces = [];
  for (const [u0, v0] of edges.flatMap(([u, v]) => [[u, v], [v, u]])) {
    if (face.has(u0 + ',' + v0)) continue;
    const id = faces.length, loop = [];
    let u = u0, v = v0;
    while (!face.has(u + ',' + v)) {
      face.set(u + ',' + v, id); loop.push(u);
      const list = out[v], t = list.indexOf(u), w = list[(t - 1 + list.length) % list.length];
      u = v; v = w;
    }
    const area = loop.reduce((s2, k, i) => { const p2 = V[k], q2 = V[loop[(i + 1) % loop.length]]; return s2 + p2.x * q2.z - q2.x * p2.z; }, 0) / 2;
    faces.push({ loop, area });
  }
  // the force diagram: crossing an element from the space on its left to the one on its right adds its force
  const pos = new Map(), links = faces.map(() => []);
  elements.forEach((el) => {
    el.left = face.get(el.at + ',' + el.other); el.right = face.get(el.other + ',' + el.at);
    links[el.left].push([el.right, el.vec]); links[el.right].push([el.left, [-el.vec[0], -el.vec[1]]]);
  });
  const start = elements[elements.length - 1].left, queue = [start];
  pos.set(start, [0, 0]);
  while (queue.length) {
    const f = queue.shift(), [x, z] = pos.get(f);
    for (const [g, [vx, vz]] of links[f]) {
      const want = [x + vx, z + vz];
      if (!pos.has(g)) { pos.set(g, want); queue.push(g); } else if (Math.hypot(pos.get(g)[0] - want[0], pos.get(g)[1] - want[1]) > 1e-6 * (1 + Math.hypot(x, z))) throw new Error('The force diagram does not close.');
    }
  }
  return { V, faces, elements, pos, cx, cz, nNodes: nodes.length };
}
function convexHull(points) {
  const p = points.slice().sort((a, b) => a.x - b.x || a.z - b.z), cross = (o, a, b) => (a.x - o.x) * (b.z - o.z) - (a.z - o.z) * (b.x - o.x);
  const lower = [], upper = [];
  for (const q of p) { while (lower.length > 1 && cross(lower[lower.length - 2], lower[lower.length - 1], q) <= 0) lower.pop(); lower.push(q); }
  for (const q of p.reverse()) { while (upper.length > 1 && cross(upper[upper.length - 2], upper[upper.length - 1], q) <= 0) upper.pop(); upper.push(q); }
  return lower.slice(0, -1).concat(upper.slice(0, -1)); // counterclockwise
}

function truss(s) {
  const kind = /\bhowe\b/.test(s) ? 'howe' : /\bwarren\b/.test(s) ? 'warren' : /\b(roof|pitched|triangular|fink|king ?post|gable)\b/.test(s) ? 'roof' : 'pratt';
  let n = +((s.match(/(\d+)\s*(?:panels?|bays?|segments?|divisions?|fields?)/) || [])[1] || (/king ?post/.test(s) ? 2 : 6));
  n = Math.max(2, Math.min(16, n));
  if (kind === 'roof' && n % 2) n += 1;
  const L = lengthIn(s, 'span|long|wide', 12000);
  const d = lengthIn(s, 'depth|deep|height|high|tall|rise', kind === 'roof' ? L / 4 : L / 6);
  const P = +((s.match(new RegExp(`(${NUM})\\s*kn\\b`)) || [])[1] || 10);
  const bottom = /\b(bottom|lower) chord\b|\bhanging\b|\bsuspended\b/.test(s);
  const { nodes, members, loads, supports } = trussGeometry(kind, n, L, d, bottom, P);
  // reactions: a pin at A and a roller at B, both vertical under vertical loads
  const xa = nodes[supports[0]].x, xb = nodes[supports[1]].x, W = loads.reduce((t, f) => t - f.fz, 0);
  const RB = loads.reduce((t, f) => t - f.fz * (nodes[f.node].x - xa), 0) / (xb - xa), RA = W - RB;
  const forces = [...loads.map((f) => ({ node: f.node, fx: 0, fz: f.fz })), { node: supports[1], fx: 0, fz: RB, reaction: 'B' }, { node: supports[0], fx: 0, fz: RA, reaction: 'A' }];
  const T = solveTruss(nodes, members, forces);
  const bow = bowSpaces(nodes, members, T, forces, L);

  // names: outside spaces a, b, c … clockwise from the left; inside spaces 1, 2, 3 … from the left
  const used = new Set(bow.elements.flatMap((el) => [el.left, el.right]));
  const outer = [], inner = [];
  for (const f of used) (bow.faces[f].loop.some((k) => k >= bow.nNodes) ? outer : inner).push(f);
  const spot = (f) => {
    const own = bow.faces[f].loop.filter((k) => k < bow.nNodes).map((k) => bow.V[k]);
    const mx = own.reduce((t, v) => t + v.x, 0) / own.length, mz = own.reduce((t, v) => t + v.z, 0) / own.length;
    if (inner.includes(f)) return [mx, mz];
    const ox = mx - bow.cx, oz = mz - bow.cz, l = Math.hypot(ox, oz) || 1;
    return [mx + ox / l * 0.09 * L, mz + oz / l * 0.09 * L];
  };
  const name = new Map();
  // clockwise from the left, starting a little below the horizontal so the space beside the left support is a
  const turn = ([x, z]) => (3 * Math.PI + 0.3 - Math.atan2(z - bow.cz, x - bow.cx)) % (2 * Math.PI);
  outer.map((f) => [f, spot(f)]).sort((p, q) => turn(p[1]) - turn(q[1]))
    .forEach(([f], i) => name.set(f, String.fromCharCode(97 + i)));
  inner.map((f) => [f, spot(f)]).sort((p, q) => p[1][0] - q[1][0] || q[1][1] - p[1][1]).forEach(([f], i) => name.set(f, String(i + 1)));

  // place the force diagram right of the truss, about as big as the span
  const pts = [...bow.pos.values()], fx0 = Math.min(...pts.map((q) => q[0])), fx1 = Math.max(...pts.map((q) => q[0]));
  const fz0 = Math.min(...pts.map((q) => q[1])), fz1 = Math.max(...pts.map((q) => q[1]));
  const k = 0.8 * L / Math.max(fx1 - fx0, fz1 - fz0, 1e-9);
  const ox = L * 1.35 - fx0 * k, oz = d / 2 - (fz0 + fz1) / 2 * k;
  const r = (v) => Math.round(v), pt = (x, z) => `${r(x)},0,${r(z)}`, F = (f) => { const [x, z] = bow.pos.get(f); return [ox + x * k, oz + z * k]; };
  const h = r(L / 70), text = (t, x, z, size = h) => [`Text ${t}`, `=Height ${size}`, pt(x, z)];
  const maxLoad = Math.max(...forces.map((f) => Math.abs(f.fz)));
  const cmds = ['Construction Plane XZ']; // labels stand in the drawing's plane
  const tint = (t) => (Math.abs(t) < 1e-6 ? PAL.zero : t > 0 ? PAL.tension : PAL.compression);
  members.forEach((m, e) => cmds.push(`Line ${pt(nodes[m.i].x, nodes[m.i].z)} ${pt(nodes[m.j].x, nodes[m.j].z)}`, `Color ${tint(T[e])}`));
  supports.forEach((i) => cmds.push(`Point ${pt(nodes[i].x, nodes[i].z)}`));
  forces.forEach((f) => {
    const o = nodes[f.node], len = Math.min(0.2, Math.max(0.04, 0.08 * Math.abs(f.fz) / maxLoad)) * L, push = f.ray[1] * f.fz < 0;
    const far = [o.x + f.ray[0] * len, o.z + f.ray[1] * len];
    cmds.push(push ? `Arrow ${pt(...far)} ${pt(o.x, o.z)}` : `Arrow ${pt(o.x, o.z)} ${pt(...far)}`, `Color ${PAL.force}`);
  });
  // a zero-force member is a point in the force diagram: nothing to draw
  bow.elements.forEach((el) => {
    const [a, b] = [F(el.left), F(el.right)];
    if (Math.hypot(a[0] - b[0], a[1] - b[1]) > 1) cmds.push(`Line ${pt(...a)} ${pt(...b)}`, `Color ${el.member === undefined ? PAL.force : tint(T[el.member])}`);
  });
  for (const [f, label] of name) { cmds.push(...text(label, ...spot(f).map((v, i) => v - (i ? h / 2 : h / 3)))); const [x, z] = F(f); cmds.push(...text(label, x + h * 0.4, z + h * 0.3)); }
  const title = { pratt: 'Pratt truss', howe: 'Howe truss', warren: 'Warren truss', roof: 'roof truss' }[kind];
  cmds.push(...text(`form diagram (${title})`, 0, d + 0.22 * L, r(h * 1.4)), ...text('force diagram (Cremona)', ox + fx0 * k, oz + fz1 * k + 2.2 * h, r(h * 1.4)));
  cmds.push('Escape', 'Construction Plane XY', 'View Front', 'Fit');

  // the member forces, named by the two spaces they separate
  // letters before numbers, numbers in order: a-1, 2-3, 10-11
  const mname = (e) => { const el = bow.elements.find((x) => x.member === e); return [name.get(el.left), name.get(el.right)].sort((x, y) => (/\d/.test(x) - /\d/.test(y)) || (+x - +y) || x.localeCompare(y)).join('-'); };
  const fmt = (t) => (Math.abs(t) < 1e-6 ? '0' : `${t > 0 ? '+' : '−'}${Math.abs(t).toFixed(1)}`);
  const groups = {};
  members.forEach((m, e) => (groups[m.group] = groups[m.group] || []).push(`${mname(e)} ${fmt(T[e])}`));
  const ec = T.reduce((b2, t, e) => (t < T[b2] ? e : b2), 0), et = T.reduce((b2, t, e) => (t > T[b2] ? e : b2), 0);
  phraseNotes.push(
    `${title[0].toUpperCase() + title.slice(1)} · ${n} panels · span ${(L / 1000).toFixed(2)} m · ${kind === 'roof' ? 'rise' : 'depth'} ${(d / 1000).toFixed(2)} m · ${loads.length} load${loads.length === 1 ? '' : 's'} of ${P} kN on the ${bottom ? 'bottom' : 'top'} chord${!bottom && kind !== 'warren' && kind !== 'roof' ? ' (half at the ends)' : ''}`,
    `Reactions R_A = ${RA.toFixed(1)} kN, R_B = ${RB.toFixed(1)} kN · force scale 1 kN = ${r(k)} mm · Front view, XZ plane`,
    `Member forces in kN, + tension (pink), − compression (navy), 0 (pale grey), named by the spaces on either side (Bow's notation); loads and reactions green:`,
    ...Object.entries(groups).map(([g, list]) => `  ${g}: ${list.join(' · ')}`),
    `Largest compression ${Math.abs(T[ec]).toFixed(1)} kN in ${mname(ec)} (${members[ec].group}) · largest tension ${T[et].toFixed(1)} kN in ${mname(et)} (${members[et].group})`,
    'Change it: “Howe truss with 8 panels span 16 m depth 2 m”, “Warren truss with loads on the bottom chord”, “roof truss with 4 panels”',
  );
  return cmds;
}

const CREATE = /^(create|make|add|draw|build|place|put|insert|model|generate|design|construct|give me|show me)\b/;
const SCENE_VERBS = /^(create|make|add|draw|build|place|put|insert|model|generate|design|construct|give|show|remove|delete|erase|clear|empty|reset|wipe|clean|get|discard|trash|kill|select|pick|choose|highlight|deselect|unselect|hide|unhide|reveal|zoom|fit|frame|focus|center|centre|view|look|switch|move|shift|translate|push|pull|slide|copy|duplicate|clone|rotate|turn|spin|twist|scale|resize|grow|shrink|enlarge|double|halve|triple|undo|redo|revert|measure|start|new|cancel|stop|escape)\b/;
const ALL = /\b(all|everything|every\s*\w*|whole|entire|scene)\b/;
// What a clause points at: [] keeps the current selection.
function targetOf(s) {
  const named = s.match(/\b(?:named|called|by name)\s+["']?([^"'\s]+)/);
  if (named) return ['Escape', `Select By Name ${named[1]}`];
  if (ALL.test(s)) return ['Escape', 'Select All'];
  const shape = shapeIn(s);
  return shape ? ['Escape', `Select By Name ${shape.split(' ').pop().toLowerCase()}`] : [];
}
const DIRS = { x: [0, 1], y: [1, 1], z: [2, 1], up: [2, 1], upward: [2, 1], upwards: [2, 1], down: [2, -1], downward: [2, -1], downwards: [2, -1], right: [0, 1],
  left: [0, -1], forward: [1, 1], forwards: [1, 1], back: [1, -1], backward: [1, -1], backwards: [1, -1] };
const DIR = Object.keys(DIRS).sort((a, b) => b.length - a.length).join('|');
function offsetIn(s) {
  const p = pointsIn(s)[0];
  if (p) return p.split(',').length === 2 ? `${p},0` : p;
  const v = [0, 0, 0];
  let hit = false;
  const re = new RegExp(`(${NUM})\\s*(?:mm|units?)?\\s*(?:in|along|to(?:wards)?|on)?\\s*(?:the\\s+)?(${DIR})\\b|\\b(${DIR})(?:\\s*-?\\s*axis)?\\s*(?:by|of)?\\s*(${NUM})`, 'g');
  for (const m of s.matchAll(re)) { const [i, sign] = DIRS[m[2] || m[3]]; v[i] += sign * Number(m[1] ?? m[4]); hit = true; }
  return hit ? v.join(',') : '';
}
const VIEWS = { top: 'Top', plan: 'Top', front: 'Front', back: 'Back', left: 'Left', right: 'Right', side: 'Right', bottom: 'Bottom', isometric: 'Isometric',
  iso: 'Isometric', axonometric: 'Isometric', '3d': 'Isometric', perspective: 'Perspective', orthographic: 'Orthographic', ortho: 'Orthographic', parallel: 'Orthographic' };

function createCommands(s) {
  for (const [kind, build] of [['truss', truss], ['funicular', funicular]]) {
    if (!(kind === 'truss' ? TRUSS : FUNICULAR).test(s)) continue;
    const beyond = s.match(BEYOND[kind]);
    if (beyond) { phraseWhy = `The templates only draw ${kind === 'truss' ? 'flat Pratt, Howe, Warren and roof trusses under vertical loads' : 'funicular cables and arches under vertical loads'}; “${beyond[0]}” needs reasoning about what you mean.`; return null; }
    return build(s);
  }
  if (STATICS.test(s)) return null; // graphic statics of what? the reply lists the structures
  const recipe = recipeIn(s);
  if (recipe) return [...RECIPES[recipe](s), 'Escape', 'Fit'];
  const verb = shapeIn(s);
  if (!verb) return null;
  if (verb === 'Text') {
    const t = (typedLine.match(/["“']([^"”']+)["”']/) || [])[1] || (typedLine.match(/\b(?:saying|says|reading)\s+(.+)$/i) || [])[1]
      || (typedLine.match(/\btext\s+(.+)$/i) || [])[1];
    return [t ? `Text ${t.trim()}` : SHAPE_DEFAULTS.Text, '0,0,0', 'Fit'];
  }
  const pts = pointsIn(s), nums = numbersIn(s);
  const spec = VIEWER_CMDS.find((c) => c.cmd === verb);
  let line;
  if (!pts.length && !nums.length) line = (spec && spec.example) || SHAPE_DEFAULTS[verb] || verb;
  else if (['Line', 'Arrow', 'Polyline', 'Curve', 'Point'].includes(verb)) line = `${verb} ${pts.join(' ')}`;
  else {
    const fill = spec && spec.example ? numbersIn(spec.example.slice(verb.length)) : [];
    line = `${verb} ${pts[0] || '0,0,0'} ${nums.concat(fill.slice(nums.length)).join(' ')}`.trim();
  }
  return [line, 'Fit'];
}

// One clause ("move the box up 200") to viewer commands, or null when it is not understood.
function clauseToCommands(s) {
  let n;
  if (/^(undo|revert|go back|take (that|it) back)\b/.test(s)) return Array(Math.min(20, /\btwice\b/.test(s) ? 2 : numbersIn(s)[0] || 1)).fill('Undo');
  if (/^redo\b/.test(s)) return Array(Math.min(20, numbersIn(s)[0] || 1)).fill('Redo');
  if (/^(clear|reset|wipe|clean)( (it|up|all|everything))?$/.test(s)) return ['Escape', 'Select All', 'Delete'];
  if (/^(start (over|again|fresh)|new scene|(clear|empty|reset|wipe|clean)( up)?( the)?( whole| entire)? (scene|viewer|view|model|canvas|screen|everything|all)\b)/.test(s)) return ['Escape', 'Select All', 'Delete'];
  if (/^(remove|delete|erase|clear|get rid of|discard|trash|kill)\b/.test(s)) return [...targetOf(s), 'Delete'];
  if (/^(deselect|unselect|select (nothing|none)|clear (the )?selection|cancel|stop|escape)\b/.test(s)) return ['Escape'];
  if (/^(select|pick|choose|highlight)\b/.test(s)) { const t = targetOf(s); return t.length ? t : null; }
  if (/^(unhide|reveal|show (all|everything|hidden|them|it)\b)/.test(s)) return ['Show'];
  if (/\blayers?\b/.test(s) && /^(show|open|display|list|hide|close)\b/.test(s)) return [/^(hide|close)/.test(s) ? 'Layers Off' : 'Layers On'];
  if (/^hide\b/.test(s)) return [...targetOf(s), 'Hide'];
  if (/^(zoom|fit|frame|focus|center|centre)\b|^(see|show me) (it )?(all|everything)\b/.test(s)) return /\b(all|everything|scene|extents)\b/.test(s) ? ['Escape', 'Fit'] : ['Fit'];
  if (/^(rotate|turn|spin|twist)\b/.test(s)) {
    n = numbersIn(s)[0] ?? (/\bquarter\b/.test(s) ? 90 : /\bhalf\b/.test(s) ? 180 : undefined);
    if (n === undefined) return null;
    const ax = s.match(/^\w+\s+([xyz])\b|\b(?:around|about|on|in|along)\s+(?:the\s+)?([xyz])\b|\b([xyz])\s*-?\s*axis\b/);
    return [...targetOf(s), `Rotate ${ax ? ax[1] || ax[2] || ax[3] : 'z'} ${n}`];
  }
  if (/^(scale|resize|grow|shrink|enlarge|double|halve|triple)\b|^make (it|them|everything|all|the \w+) (bigger|larger|smaller|twice|half|double|\d)/.test(s)) {
    n = numbersIn(s)[0];
    if (n !== undefined && /%|percent/.test(s)) n /= 100;
    if (n === undefined) n = /\b(twice|double|bigger|larger|grow|enlarge)\b/.test(s) ? 2 : /\b(triple|three times)\b/.test(s) ? 3 : /\b(half|halve|smaller|shrink)\b/.test(s) ? 0.5 : undefined;
    return n ? [...targetOf(s), `Scale ${n}`] : null;
  }
  if (/^(move|shift|translate|push|pull|slide|copy|duplicate|clone)\b/.test(s)) {
    const off = offsetIn(s);
    return off ? [...targetOf(s), `${/^(copy|duplicate|clone)/.test(s) ? 'Copy' : 'Move'} ${off}`] : null;
  }
  if (/^(view|look|switch|go|set|change|show)\b|\bview\b|^(top|plan|front|back|left|right|side|bottom|isometric|iso|perspective|orthographic|ortho)$/.test(s)) {
    const w = (s.match(/\b(top|plan|front|back|left|right|side|bottom|isometric|iso|axonometric|3d|perspective|orthographic|ortho|parallel)\b/) || [])[1];
    if (w) return [`View ${VIEWS[w]}`];
    if (/\bx-?ray\b/.test(s)) return [`View Xray ${/\boff\b/.test(s) ? 'Off' : 'On'}`];
    if (/\bedges\b/.test(s)) return [`View ${/\b(hide|off|no|without)\b/.test(s) ? 'Hide' : 'Show'} Edges`];
    if (/\breset\b/.test(s)) return ['View Reset'];
  }
  if (/\b(transparent|see-?through|translucent|opaque|opacity)\b/.test(s)) {
    n = numbersIn(s)[0];
    return [`Opacity ${n !== undefined ? (n > 1 ? n / 100 : n) : /\bopaque\b/.test(s) ? 1 : 0.4}`];
  }
  if (/^(measure|how (long|big|large|much)|what('s| is) the|compute|calculate|get the)\b/.test(s)) {
    if (/\bdistance\b/.test(s)) { const p = pointsIn(s); return p.length >= 2 ? [`Measure Distance ${p[0]} ${p[1]}`] : null; }
    const what = /\barea\b/.test(s) ? 'Area' : /\bvolume\b/.test(s) ? 'Volume' : /\b(length|long)\b/.test(s) ? 'Length' : '';
    return what ? [...targetOf(s), what] : null;
  }
  if (CREATE.test(s) || /^(a |an |the )?(funicular|cable|catenary|arch|thrust line|force diagram|(pratt |howe |warren |roof |fink |king ?post |queen ?post )?truss)\b/.test(s)) return createCommands(s);
  // a structure named anywhere, in a request rather than a question
  if ((TRUSS.test(s) || FUNICULAR.test(s)) && !QUESTION.test(s)) return createCommands(s);
  return null;
}

// A whole line: clauses joined by "and", "then" or ";" each become commands; a clause without a verb
// takes the one before ("create a box and a sphere at 2000,0,0"). Returns { commands }, { failed } when a
// clause is not understood (sure: the line clearly asks for the scene), or null for a line about something else.
let typedLine = '';
const QUESTION = /^(what|how|why|which|when|where|who|explain|describe|is|are|does|do|can|could|should)\b/;
const ASKS = /^(a |an |the )?(funicular|cable|catenary|arch|thrust line|force diagram|(pratt |howe |warren |roof |fink |king ?post |queen ?post )?truss)\b|^(what|how|top|front|back|left|right|side|bottom|plan|iso\w*|perspective|ortho\w*)\b|\bview\b/;
const WEAK = /^(what|how|show|get|give|look|switch|go|set|change|start|new|stop|cancel|turn|top|front|back|left|right|side|bottom|plan|iso\w*|perspective|ortho\w*|view)\b/;
function phraseToCommands(line) {
  typedLine = line;
  const s = line.toLowerCase().trim().replace(/[.!?]+$/, '')
    .replace(/^((please|can you|could you|would you|will you|kindly|now|just|i want( you)? to|i'd like( you)? to|i would like( you)? to|let'?s)\s+)+/, '').replace(/\s+please$/, '');
  if (!SCENE_VERBS.test(s) && !ASKS.test(s) && !((TRUSS.test(s) || FUNICULAR.test(s)) && !QUESTION.test(s))) return null;
  phraseNotes = []; phraseWhy = '';
  // a clause without a verb takes the one before, or belongs to a part that reads the whole clause:
  // "create a table with 4 legs and the top", "a funicular cable with form and force diagram"
  const clauses = [];
  for (const c of s.split(/\s*;\s*|\s*,?\s+(?:and then|and also|after that|then|and)\s+/)) {
    if (!c) continue;
    const first = (c.match(/^[a-z]+/) || [''])[0], prev = clauses[clauses.length - 1];
    if (SCENE_VERBS.test(first) || !prev) clauses.push({ text: c, verb: SCENE_VERBS.test(first) ? first : '' });
    else if (wholeIn(prev.text)) prev.text += ' and ' + c;
    else clauses.push({ text: `${prev.verb} ${c}`.trim(), verb: prev.verb });
  }
  const commands = [], failed = [];
  for (const c of clauses) {
    const got = clauseToCommands(c.text);
    if (got) commands.push(...got); else failed.push(c.text);
  }
  return failed.length ? { failed, sure: !WEAK.test(s), statics: STATICS.test(s) || TRUSS.test(s), why: phraseWhy }
    : { commands, notes: phraseNotes, reading: TRUSS.test(s) ? 'truss' : FUNICULAR.test(s) ? 'funicular' : '' };
}
// The eQUILIBRIUM step-by-step player, on the same GitHub Pages site.
const PLAYER = '../../2_computational_form_finding/Equilibrium/drawings/web/';

createApp({
  components: { BookCover },
  setup() {
    const state = ref('loading');
    const error = ref('');
    const books = ref([]);
    const query = ref('');
    const route = reactive({ view: 'list', workspace: 'viewer', exercise: 'box', group: 'books', book: '', section: '', page: 0 });
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
        meta: `${plural(ps.length, 'part')} · ${plural(ps.reduce((n, b) => n + b.sections.length, 0), 'chapter')}` };
    };
    const bookItem = (b) => {
      const i = bookInfo(b.title);
      return { key: b.id, id: b.id, title: b.title, name: i.name, byline: [i.author, i.year].filter(Boolean).join(' · '), ...coverOf(b),
        href: '#/b/' + b.id, img: classify(b) === 'books' ? coverImg(b.id) : '', meta: plural(b.sections.length, 'chapter') };
    };
    const shelfAll = computed(() => Object.fromEntries(cfg.groups.map((g) => [g.id, books.value.filter((b) => classify(b) === g.id).flatMap((b) => {
      if (isCollection(b) && g.id !== 'books')
        return b.sections.map((x) => ({ key: b.id + '/' + x.section, id: b.id, title: x.title, name: x.title, byline: '', short: shortTitle(x.title), subject: subjectOf(x.title + ' ' + x.summary), href: readerHref(b.id, x.section), meta: x.summary }));
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
      if (head === 'terminal' || head === 'notebook') Object.assign(route, { view: 'terminal', workspace: head === 'notebook' ? 'notebook' : 'viewer', exercise: id === 'cable' ? 'cable' : 'box' });
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

    // ---- BRG terminal: CLI on the right, session viewer on the left ----
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
    const claudeOn = ref(!!(cfg.chatEndpoint || ownKey.get()));
    const claudeLabel = computed(() => (cfg.chatEndpoint ? 'Claude' : claudeOn.value ? 'Claude, your key' : ''));
    const menuIndex = ref(0);
    const logEl = ref(null);
    const prompt = ref(null);
    const viewerEl = ref(null);
    const drawingIds = ref([]);
    // The session viewer frame (viewer/index.html, same site) and the line typed into its command line.
    const sessionEl = ref(null);
    const notebookEl = ref(null);
    const notebookFile = computed(() => route.exercise === 'cable' ? '02-cable-nodes.ipynb' : '01-compas-box.ipynb');
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
        app.shell.collapseLeft();
      } catch (e) { console.warn('Could not open the exercise in Jupyter.', e); }
    }
    // Keep each frame mounted after its first visit: switching workspaces preserves the kernel and scene.
    const notebookOpened = ref(false), viewerOpened = ref(false);
    watch(() => [route.view, route.workspace], ([screen, workspace]) => {
      if (screen !== 'terminal') return;
      if (workspace === 'notebook') notebookOpened.value = true;
      else viewerOpened.value = true;
      document.title = workspace === 'notebook' ? 'Jupyter + BRG · CAS Computational Form-finding' : 'BRG terminal · CAS Computational Form-finding';
    }, { immediate: true });
    watch(() => [route.workspace, route.exercise], () => {
      if (route.workspace === 'notebook') nextTick(openNotebook);
    });
    // The viewer's own URL options given to this page pass through, e.g. ?live=off or ?scene=view_mixed_teapot.
    const viewerSrc = 'viewer/index.html' + (() => {
      const q = new URLSearchParams(location.search), keep = new URLSearchParams();
      for (const k of ['live', 'scene', 'data', 'notify', 'poll', 'msaa', 'dpr']) if (q.has(k)) keep.set(k, q.get(k));
      return keep.toString() ? '?' + keep : '';
    })();
    let viewerQueue = [];
    let viewerTimer = 0;
    function viewerWindow() {
      try { const w = sessionEl.value && sessionEl.value.contentWindow; return w && w.document && w.document.getElementById('command-agent') && w.wasmBindings ? w : null; }
      catch (e) { return null; }
    }
    // Type a line into the viewer's command line and press Enter (its hidden #command-agent input).
    // While the line is closed, typed letters are viewer shortcuts, so ':' opens it first; the next
    // text then replaces the line. Each step waits a frame or two for the viewer to take it.
    const wait = (ms) => new Promise((done) => setTimeout(done, ms));
    async function typeIntoViewer(w, line) {
      const input = w.document.getElementById('command-agent');
      const type = (text) => { input.value = text; input.dispatchEvent(new w.Event('input', { bubbles: true })); };
      type(':');
      await wait(150);
      type(line);
      await wait(150);
      input.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true, cancelable: true }));
      listenUntil = Date.now() + 1200;
      await wait(250);
    }
    let viewerTyping = false;
    let listenUntil = 0;
    let viewerAsks = false; // the viewer's last reply asks for a point, a value or an option
    let batchReplies = null; // the replies to a long batch, while it runs
    let collected = null; // every line and reply while Claude's commands run, for its tool result
    function sumUp(replies) {
      const made = {};
      let deleted = 0;
      for (const t of replies) {
        const m = t.match(/^Created and selected (.+?)(?: \(\w+\))? on /) || t.match(/^Created (text)\b/);
        if (m) made[m[1]] = (made[m[1]] || 0) + 1;
        const d = t.match(/^deleted (\d+) object/);
        if (d) deleted += +d[1];
      }
      const parts = Object.entries(made).map(([kind, n]) => `${n} ${kind}${n > 1 ? (/[sxh]$/.test(kind) ? 'es' : 's') : ''}`);
      if (parts.length || deleted) say(`‹ ${deleted ? `deleted ${deleted} objects; ` : ''}${parts.length ? 'created ' + parts.join(', ') : ''}`.replace(/; $/, ''), 'reply');
    }
    const NOISE = /pipelines|WebGPU is experimental|adapter|gpu init|scene posted|surface|first frame|^fit(ted)?\b|^fit selected|^Keys go to the viewer|epaint|pixels_per_point/;
    function hookViewer(w) {
      if (w.__brgTerminal) return;
      w.__brgTerminal = true;
      for (const k of ['log', 'info', 'warn', 'error']) {
        const original = w.console[k];
        w.console[k] = function (...a) {
          original.apply(this, a);
          const text = a.map(String).join(' ').trim();
          if (Date.now() >= listenUntil || !text || NOISE.test(text)) return;
          if (collected) collected.push((k === 'error' ? 'error: ' : '') + text);
          viewerAsks = /Esc cancels|type Height|click or type|then press Enter/.test(text);
          // a long batch (a funicular, a staircase) is summed up when it ends; its errors still show
          if (batchReplies && k !== 'error' && !/not a value|no command|wrong number|needs|cannot|failed/i.test(text)) { batchReplies.push(text); return; }
          // the same reply again (five boxes of a table) is counted on its line
          const last = log.value[log.value.length - 1];
          if (last && last.reply === text) { last.n += 1; last.text = `‹ ${text} ×${last.n}`; return; }
          log.value.push({ text: '‹ ' + text, kind: k === 'error' ? 'err' : 'reply', reply: text, n: 1 });
          nextTick(() => { if (logEl.value) logEl.value.scrollTop = logEl.value.scrollHeight; });
        };
      }
    }
    async function flushViewer(started = Date.now()) {
      clearTimeout(viewerTimer);
      if (viewerTyping) return;
      const w = viewerWindow();
      if (!w) {
        if (Date.now() - started > 20000) { say('The session viewer did not start. It needs a browser with WebGPU (Chrome, Edge, Safari 26).', 'err'); viewerQueue = []; return; }
        viewerTimer = setTimeout(() => flushViewer(started), 250);
        return;
      }
      hookViewer(w);
      viewerTyping = true;
      if (viewerQueue.length > 12) batchReplies = [];
      try { while (viewerQueue.length) await runInViewer(w, viewerQueue.shift()); }
      finally {
        viewerTyping = false;
        if (batchReplies) { await wait(500); const done = batchReplies; batchReplies = null; sumUp(done); }
      }
    }
    // A value (a point, a number, or an empty line for Enter) goes to the command that asked for it;
    // any other line ends a running command first, so nothing is left waiting for picks.
    const isValue = (line) => /^[-\d.,\s]*$/.test(line);
    async function runInViewer(w, line) {
      const answer = line.startsWith('=') || isValue(line);
      line = line.replace(/^=/, '');
      if (collected) collected.push('> ' + line);
      if (!w.wasmBindings.run_command) return typeIntoViewer(w, line); // a viewer built before run_command
      listenUntil = Date.now() + 1200;
      w.wasmBindings.run_command(line, !answer);
      await wait(10); // the viewer queues them in order; this only lets each answer arrive with its line
    }
    function sendToViewer(...lines) {
      if (route.workspace !== 'viewer') location.hash = '/terminal';
      if (view.kind !== 'welcome') closeSheet();
      viewerQueue.push(...lines);
      flushViewer();
    }
    const say = (text, kind = 'out', act, href, img) => { log.value.push({ text, kind, act, href, img }); nextTick(() => { if (logEl.value) logEl.value.scrollTop = logEl.value.scrollHeight; }); };
    say('BRG terminal for the CAS library. Type /help for commands.', 'dim');
    if (route.workspace === 'notebook') say('COMPAS exercises: run the cells on the left from top to bottom (Shift+Enter). Choose Box or Cable nodes above the notebook. /notebook or /notebook cable shows the instructions; viewer commands switch to the 3D view.', 'dim');
    if (claudeOn.value) {
      say('Claude is connected: ask about the course and the books, or ask for a model. It searches the books first (historical ones first), reasons, computes, draws in the 3D view, and cites pages. /new starts over.', 'dim');
      say('Viewer commands (Box 0,0,0 100 50 30; /viewer lists them) run directly; /local <words> builds from plain words without Claude.', 'dim');
    } else {
      say('Claude is not connected: the terminal searches the library and fills in fixed templates; it does not reason about what you ask.', 'err');
      say('To connect Claude in this browser: /key <your Anthropic API key> (from console.anthropic.com; set a spend limit there). The key stays in this browser and goes only to Anthropic.', 'dim');
      say('The 3D view on the left shows the live scene. Build in it with plain words (“create a table”, “delete everything”, “top view”) or its own commands (Box 0,0,0 100 50 30; /viewer lists them).', 'dim');
    }
    say('Sources, pages and figures appear here in the terminal; the 3D view only draws. /open shows a whole chapter over the view, /close hides it.', 'dim');

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
    function closeSheet() { setView({ kind: 'welcome', title: '' }); remember(''); }
    // Links inside a chapter shown in the viewer stay in the viewer.
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

    const menuItems = computed(() => {
      const v = input.value;
      if (v.startsWith('/')) return v.includes(' ') ? [] : COMMANDS.filter((c) => c.cmd.startsWith(v.toLowerCase()));
      // viewer commands by their first letters ("Bo" → Box), until arguments are typed
      if (v.length < 2 || /\d|,/.test(v) || v.split(' ').length > 3) return [];
      const low = v.toLowerCase();
      return VIEWER_CMDS.filter((c) => c.cmd.toLowerCase().startsWith(low)).sort((a, b) => a.cmd.length - b.cmd.length).slice(0, 8)
        .map((c) => ({ cmd: c.cmd, help: c.help.replace(/^[^·:]*[·:]\s*/, ''), arg: !!c.example, viewer: true }));
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
      if (items.length && e.key === 'Enter' && !items[menuIndex.value].viewer && input.value !== items[menuIndex.value].cmd) { e.preventDefault(); takeMenu(items[menuIndex.value]); return; }
      if (e.key === 'Escape') { input.value = ''; return; }
      if (!items.length && (e.key === 'ArrowUp' || e.key === 'ArrowDown') && history.length) {
        e.preventDefault(); hpos = Math.max(0, Math.min(history.length, hpos + (e.key === 'ArrowUp' ? -1 : 1))); input.value = history[hpos] || '';
      }
    }

    const ready = () => { if (state.value !== 'ready') { say(state.value === 'loading' ? 'The library is still loading.' : 'The library is not available: ' + error.value, 'err'); return false; } return true; };
    // Search results go on the sheet; none leaves the 3D view as it is.
    const showHits = (q, list) => {
      if (!list.length) {
        say(`No chapters match “${q}”.`, 'dim');
        say('For the 3D view try: create a table · create a box and a sphere at 2000,0,0 · move it up 200 · delete everything · top view · undo · /viewer', 'dim');
        return false;
      }
      setView({ kind: 'list', title: `Search: ${q} · ${list.length} chapter${list.length === 1 ? '' : 's'}`, items: list, showBook: true });
      list.slice(0, 12).forEach((s) => say(`${s.book}/${s.section}  ${s.title}`, 'out', `/open ${s.book}/${s.section}`));
      say(list.length > 12 ? `… ${list.length - 12} more in the viewer.` : 'Results are also in the viewer.', 'dim');
      return true;
    };
    // Graphic statics from the books: find the chapters on the construction (historical books first), find its
    // figure, show it in the terminal with its citation, recreate the construction in the 3D view, cite the sources.
    // Historical books first (before 1950, or by the founders of graphic statics), then the rest.
    const historical = (b) => { const t = plain(b.id + ' ' + b.title), y = +((b.title.match(/\b(1[5-9]\d\d)\b/) || [])[1] || 0);
      return (y && y < 1950) || /levy|culmann|cremona|maxwell|wolfe|ritter|rankine|varignon|mohr|muller-breslau|henneberg|bow\b/.test(t); };
    function rankSections(words, avoid = []) {
      return books.value.flatMap((b) => b.sections.map((s2) => {
        const t = plain(s2.title), m = plain(s2.summary);
        let score = words.reduce((n, [k, w]) => n + w * ((t.includes(k) ? 3 : 0) + (m.includes(k) ? 1 : 0)), 0);
        if (avoid.some((a) => t.includes(a))) score = Math.min(score, 1);
        return { book: b.id, section: s2.section, title: s2.title, score, old: historical(b) };
      })).filter((h) => h.score >= 2).sort((a, b) => b.old - a.old || b.score - a.score);
    }
    // The figure of a chapter that the text around it names best, with its §, printed page and caption.
    async function figureIn(hit, words) {
      const path = `${hit.book}/${hit.section}`, lines = (await getText(path)).split(/\r?\n/), keys = words.map(([k]) => k);
      let best = null;
      lines.forEach((line, i) => {
        const md = line.match(/!\[([^\]]*)\]\(\s*<?([^)\s>]+)/), html = line.match(/<img\b[^>]*\bsrc="([^"]+)"[^>]*>/);
        if (!md && !html) return;
        const alt = md ? md[1] : ((line.match(/\balt="([^"]*)"/) || [])[1] || '');
        // an equation set as an image is not the construction's figure
        if (/\b(equation|eq\.?|formula|formule)\b/i.test(alt) || /(^|\/)(eq|equation|math|formula)[-_]?\d/i.test(md ? md[2] : html[1])) return;
        const near = plain(lines.slice(Math.max(0, i - 8), i + 4).join(' ') + ' ' + alt);
        const score = keys.reduce((n, k) => n + near.split(k).length - 1, 0);
        if (score && (!best || score > best.score)) best = { score, i, alt, src: md ? md[2] : html[1] };
      });
      if (!best) return null;
      const page = pageMap(lines).pages[best.i] || '';
      let sec = '';
      for (let i = best.i; i >= 0 && !sec; i--) if (/^#/.test(lines[i])) sec = (lines[i].match(/§\s*(\d+)/) || [])[1] || '';
      const caption = best.alt || (lines[best.i + 1] || '').replace(/[*_]/g, '').trim().slice(0, 80);
      const cite = `${citeBook(bookTitle(hit.book))} — ${hit.title}${sec ? ', § ' + sec : ''}${page ? ', p. ' + page : ''}${caption ? ', ' + caption : ''}`;
      return { src: new URL(best.src, fileUrl(path)).href, caption, cite, page, act: page ? `/page ${path} ${page}` : `/open ${path}`, href: fileUrl(path) };
    }
    async function whereIn(hit, words) {
      const lines = (await getText(`${hit.book}/${hit.section}`)).split(/\r?\n/), keys = words.map(([k]) => k), { pages } = pageMap(lines);
      const hits = [], secs = new Set();
      let sec = '', quote = '';
      lines.forEach((line, i) => {
        if (/^#/.test(line)) sec = (line.match(/§\s*(\d+)/) || [])[1] || sec;
        if (!PAGE_MARK.test(line) && keys.some((k) => plain(line).includes(k))) {
          hits.push(pages[i]);
          if (sec) secs.add(sec);
          if (!quote && !/^\s*(#|!\[|<)/.test(line)) quote = line.replace(/[*_`$]/g, '').trim();
        }
      });
      const all = pages.filter(Boolean);
      return { pages: hits.filter(Boolean).length ? hits : all.length ? [all[0], all[all.length - 1]] : [], secs: [...secs], quote };
    }
    async function fromTheBooks(phrase) {
      const topic = TOPICS[phrase.reading];
      say(`Searching the library for ${topic.label}, historical books first…`, 'dim');
      const found = state.value === 'ready' ? rankSections(topic.words, topic.avoid) : [];
      if (state.value !== 'ready') say('The library has not loaded, so this is drawn without its sources.', 'err');
      let source = null;
      for (const h of found.slice(0, 5)) { source = await figureIn(h, topic.words).catch(() => null); if (source) break; }
      if (source) {
        say(`Found the construction in ${source.cite}. The recreation is drawn in the 3D view.`, 'out', source.act);
        say(source.cite, 'fig', null, source.href, source.src); // the book's own figure, here in the terminal
      } else if (found.length) say(`Found ${found.length} chapter${found.length === 1 ? '' : 's'}, without a figure of it; recreating the construction from the text.`, 'dim');
      else if (state.value === 'ready') say('Nothing on it in the library; drawing the standard construction.', 'dim');
      sendToViewer(...phrase.commands);
      say(`→ viewer: ${phrase.commands.filter((c) => c && !c.startsWith('=')).length} commands (the recreation)`, 'dim');
      (phrase.notes || []).forEach((n) => say(n, 'out'));
      if (found.length) {
        say('Sources, with the printed pages where the books treat it (click one to print the page here):', 'dim');
        for (const [n, h] of found.slice(0, 4).entries()) {
          const where = await whereIn(h, topic.words).catch(() => ({ pages: [], secs: [], quote: '' }));
          const first = where.pages.filter(Boolean).sort((a, b) => a - b)[0] || 0;
          const at = [where.secs.length ? '§ ' + where.secs.slice(0, 4).join(', ') : '', pageList(where.pages)].filter(Boolean).join(', ');
          say(`[${n + 1}] ${citeBook(bookTitle(h.book))} — ${h.title}${at ? ', ' + at : ''}`, 'out', first ? `/page ${h.book}/${h.section} ${first}` : `/open ${h.book}/${h.section}`);
          if (where.quote) say(`    “${where.quote.length > 170 ? where.quote.slice(0, 168) + '…' : where.quote}”`, 'dim');
          const url = fileUrl(`${h.book}/${h.section}`);
          say(url, 'link', null, url);
        }
      }
    }
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
      let phrase = null;
      try {
        busy.value = true;
        if (cmd === '/help' || cmd === '?') {
          COMMANDS.forEach((c) => say(`${c.cmd.padEnd(10)} ${c.help}`));
          say('Session viewer: type its commands directly, e.g. Box 0,0,0 100 50 30, Sphere 0,0,0 10, Line 0,0,0 100,0,0, Move 10,0,0, Undo, Fit, Layers On.', 'dim');
          say('Or plain words: create a table, create a box and a sphere at 2000,0,0, select all and move up 200, rotate the box 45 degrees around x, delete everything, top view, undo.', 'dim');
        }
        else if (cmd === '/notebook') {
          const cable = arg.toLowerCase() === 'cable';
          location.hash = cable ? '/notebook/cable' : '/notebook'; closeSheet();
          say(cable ? 'First cable exercise · 02-cable-nodes.ipynb\nTwo fixed supports (nodes 0 and 4), three free nodes (1, 2, 3), four cable segments, and a downward load of 1 kN at each free node.\nRun all cells to draw the numbered nodes, then solve their equilibrium with force density q = 2 kN/m. The middle node settles 1 m below the supports.\nTry changing the nodal load or force density, predict the sag, and run again.' : 'A COMPAS box · 01-compas-box.ipynb\n1. In Jupyter choose Run → Run All Cells (or Shift+Enter, cell by cell). The first cell installs COMPAS in browser Python.\n2. Box(xsize=2.0, ysize=1.0, zsize=1.5) creates the box; the next cell draws it.\n3. Change the dimensions and rerun. Predict the volume before you run: xsize × ysize × zsize.', 'out');
          say('Save with Ctrl+S; use File → Save and Export Notebook As → Notebook to keep a copy on your computer. The notebook and terminal are separate: paste code or errors here when asking for help.', 'dim');
        }
        else if (cmd === '/viewer') VIEWER_CMDS.slice().sort((a, b) => a.cmd.localeCompare(b.cmd)).forEach((c) => say(`${c.cmd.padEnd(24)} ${c.help.replace(/^[^·:]*[·:]\s*/, '')}`, 'out', c.example || c.cmd));
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
            say(`${items.length} figure${items.length === 1 ? '' : 's'} in the viewer.`, 'dim');
          } else {
            await showDoc(id, section, page);
            if (cmd === '/open') say(page ? `Chapter shown at p. ${page}.` : 'Chapter shown in the viewer.', 'dim');
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
          say(`${drawingIds.value.length} drawings in the viewer. Pick one, or type /drawing <n>.`, 'dim'); keep();
        } else if (cmd === '/drawing') {
          const n = parseInt(args[0], 10);
          if (!n) { say('Usage: /drawing <n> [step]', 'err'); return; }
          const step = args[1] ? `&step=${encodeURIComponent(args[1])}` : '';
          const src = `${PLAYER}index.html?view=${n}${step}`;
          setView({ kind: 'drawing', title: `eQUILIBRIUM drawing ${n}`, src, open: src });
          say(`Drawing ${n} playing in the viewer. Use its controls to step through the construction.`, 'dim'); keep();
        } else if (cmd !== '/local' && cmd.startsWith('/')) say('Unknown command. Type /help.', 'err');
        else if (claudeOn.value && cmd !== '/local' && !exactViewerCommand(line) && !/^-?\d[-\d.,\s]*$/.test(line)) await askClaude(line);
        else if ((phrase = phraseToCommands(cmd === '/local' ? arg : line)) && phrase.commands && phrase.reading) await fromTheBooks(phrase);
        else if (phrase && phrase.commands) {
          const shown = phrase.commands.filter((c) => c && !c.startsWith('='));
          sendToViewer(...phrase.commands);
          say('→ viewer: ' + (shown.length > 12 ? `${shown.length} commands: ${shown.slice(0, 3).join(' · ')} · …` : shown.join(' · ')), 'dim');
          (phrase.notes || []).forEach((n) => say(n, 'out'));
        }
        else if (viewerCommandOf(line)) { sendToViewer(line); say('→ viewer: ' + line, 'dim'); }
        else if (/^-?\d[-\d.,\s]*$/.test(line) || /^(finish|done|enter)$/i.test(line)) { const v = /\d/.test(line) ? line : ''; sendToViewer(v); say('→ viewer: ' + (v || 'Enter'), 'dim'); }
        else if (viewerAsks && !(phrase && phrase.sure)) { sendToViewer('=' + line); say('→ viewer (answer): ' + line, 'dim'); }
        else if (phrase && phrase.why) {
          say(phrase.why, 'err');
          say('Claude reads the books, reasons about the request, computes, then draws. Connect it with /key <your Anthropic API key>.', 'dim');
        }
        else if (phrase && phrase.statics) {
          say(`Graphic statics of which structure? Without Claude the terminal builds, from the books:`, 'err');
          say('funicular cable · funicular arch · Pratt truss · Howe truss · Warren truss · roof truss (king post, or n panels)', 'dim');
          say('e.g. “create a Pratt truss with 8 panels span 16 m”, “Warren truss with loads on the bottom chord”, “funicular arch loads 10 20 30 20 10”', 'dim');
        }
        else if (phrase && phrase.sure) {
          say(`Not understood: “${phrase.failed.join('”, “')}”. Without Claude the terminal knows:`, 'err');
          say('shapes: box, sphere, cylinder, cone, torus, pyramid, line, polyline, circle, arc, point, text (sizes and x,y,z optional)', 'dim');
          say('parts: table, chair, stool, bench, shelf, stair, wall, slab, column grid, frame (e.g. create a 2000 by 900 table)', 'dim');
          say('graphic statics: funicular cable or arch, Pratt / Howe / Warren / roof truss with its Cremona diagram', 'dim');
          say('edits: select / delete / hide / show / move / copy / rotate / scale … all, it, or the box · top view · zoom · undo · /viewer for every command', 'dim');
        }
        else if (ready() && showHits(line, search(line, allSections.value))) keep();
      } catch (e) {
        say(e instanceof TypeError ? 'Could not reach the library (network or CORS).' : e.message, 'err');
        if (view.kind === 'loading') setView({ kind: 'error', title: 'Error', error: e.message });
      } finally { busy.value = false; }
    }
    // One question to Claude: send the conversation, show what streams back, run its viewer calls in the
    // 3D view and send it what the viewer answered, until it has answered. A failed turn is dropped
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
          if (!done.viewer.length) {
            if (done.stop === 'max_tokens') say('The answer was cut off (too long). Ask for less at once.', 'err');
            else if (done.stop === 'refusal') say('Claude declined this request.', 'err');
            costLine();
            return;
          }
          const results = [...done.results];
          for (const call of done.viewer) {
            say(`· 3D view: ${call.note || call.commands.length + ' commands'}`, 'dim');
            const replies = await runForClaude(call.commands);
            results.push({ type: 'tool_result', tool_use_id: call.id, content: (replies.join('\n') || 'The viewer said nothing.').slice(0, 8000) });
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
          LIBRARY_BASE: new URL(cfg.mirrorPath || '.', location.href).href.replace(/\/$/, ''), FIGURE_BASE: cfg.baseUrl };
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
      return '· computing (Python)';
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
    // Claude's command lines in the 3D view; returns each line and what the viewer answered to it.
    async function runForClaude(commands) {
      if (route.workspace !== 'viewer') { location.hash = '/terminal'; await nextTick(); }
      const started = Date.now();
      while (!viewerWindow()) {
        if (Date.now() - started > 20000) return ['The 3D view did not start: this browser has no WebGPU.'];
        await wait(250);
      }
      while (viewerTyping) await wait(50);
      if (view.kind !== 'welcome') closeSheet();
      collected = [];
      viewerQueue.push(...commands);
      await flushViewer();
      await wait(500);
      const out = collected;
      collected = null;
      return out;
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
      view, viewStack, viewBack, viewerEl, onViewerClick, run, drawingIds, sessionEl, viewerSrc, closeSheet, claudeLabel, notebookSrc, notebookOpened, viewerOpened, notebookEl, notebookFile, openNotebook,
    };
  },
}).mount('#app');
