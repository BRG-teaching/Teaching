// Library: reads LIBRARY.md from the R2 bucket and renders books, chapters and a terminal.
// The catalogue format is the one mcp-server-brg parses (src/brg_mcp/adapters/public_books.py):
//   ## `book-id/` — Title, Author, Year
//     - `01-chapter.md` **Chapter title** summary
const { createApp, ref, reactive, computed, watch, nextTick, onMounted } = Vue;
const cfg = window.CAS_LIBRARY;
// ?chat=http://localhost:8788 tries a local copy of the Claude service (CAS/brg-terminal-ai/test/serve.mjs).
// Only a local address: a link to another site could otherwise collect the conversation and the key.
{ const chat = new URLSearchParams(location.search).get('chat'); if (chat && /^http:\/\/(localhost|127\.0\.0\.1):\d+\/?$/.test(chat)) cfg.chatEndpoint = chat; }
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
  { cmd: '/viewer', help: 'list the session viewer commands (Box, Sphere, Line, Move, Undo…)' },
  { cmd: '/close', help: 'close the sheet and show the 3D scene' },
  { cmd: '/clear', help: 'clear the transcript' },
  { cmd: '/new', help: 'start a new conversation with Claude' },
  { cmd: '/stop', help: 'stop Claude’s answer' },
  { cmd: '/key', help: '<key> the BRG terminal key, kept in this browser', arg: true },
  { cmd: '/local', help: '<words> build from plain words here, without Claude', arg: true },
];
// The session viewer's own commands (viewer-commands.js); a line starting with one of them is
// passed to the viewer's command line, e.g. "Box 0,0,0 100 50 30".
const VIEWER_CMDS = (window.SESSION_VIEWER_COMMANDS || []).slice().sort((a, b) => b.cmd.length - a.cmd.length);
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
const FUNICULAR = /\b(funicular|funiculaire|cable|catenary|hanging chain|arch|thrust line|force (diagram|polygon)|form (and|&|\+) force|graphic static)/;
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
  const cmds = [
    `Polyline ${[pt(0, 0), ...x.map((xi, i) => pt(xi, z[i])), pt(L, 0)].join(' ')}`,  // the cable, or the arch
    `Line ${pt(0, 0)} ${pt(L, 0)}`,                                                      // its closing string
    `Point ${pt(0, 0)}`, `Point ${pt(L, 0)}`,
    ...x.map((xi, i) => `Arrow ${pt(xi, z[i] + P[i] * k * 0.5)} ${pt(xi, z[i])}`),       // the loads
    `Line ${pt(X0, q[0])} ${pt(X0, q[n])}`,                                              // the load line
    ...q.map((qz) => `Line ${pt(OX, 0)} ${pt(X0, qz)}`),                                 // the rays
    `Line ${pt(OX, 0)} ${pt(X0, 0)}`, `Point ${pt(OX, 0)}`,                              // H, and the pole
    ...text(arch ? 'form diagram (arch)' : 'form diagram (cable)', 0, top + 2.5 * h + Math.max(...P) * k * 0.5),
    ...text('force diagram', Math.min(X0, OX), q[0] + 2.5 * h),
    ...text('O', OX + (arch ? -1.5 : 0.6) * h, 0.6 * h),
    ...text(`H = ${H.toFixed(1)} kN`, Math.min(X0, OX) + 0.2 * h, -1.6 * h),
    ...x.flatMap((xi, i) => text(`P${i + 1}`, xi + 0.4 * h, z[i] + P[i] * k * 0.5 - h)),
    'Escape', 'View Front', 'Fit',
  ];
  const T = Math.max(Math.hypot(H, RA), Math.hypot(H, RB));
  phraseNotes.push(
    `${arch ? 'Funicular arch' : 'Funicular cable'} · ${n} load${n === 1 ? '' : 's'} (${P.join(', ')} kN) · span ${(L / 1000).toFixed(2)} m · ${arch ? 'rise' : 'sag'} ${(f / 1000).toFixed(2)} m`,
    `Reactions R_A = ${RA.toFixed(1)} kN, R_B = ${RB.toFixed(1)} kN · horizontal thrust H = ${H.toFixed(1)} kN, the pole distance`,
    `Largest ${arch ? 'compression' : 'tension'} ${T.toFixed(1)} kN, in the end segments · force scale 1 kN = ${r(k)} mm · Front view, XZ plane`,
    'Change it: “funicular cable with 7 loads of 12 kN span 20 m sag 4 m”, “funicular arch loads 10 20 30 20 10”',
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
  if (FUNICULAR.test(s)) return funicular(s);
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
  if (CREATE.test(s) || /^(a |an |the )?(funicular|cable|catenary|arch|thrust line|force diagram)\b/.test(s)) return createCommands(s);
  return null;
}

// A whole line: clauses joined by "and", "then" or ";" each become commands; a clause without a verb
// takes the one before ("create a box and a sphere at 2000,0,0"). Returns { commands }, { failed } when a
// clause is not understood (sure: the line clearly asks for the scene), or null for a line about something else.
let typedLine = '';
const ASKS = /^(a |an |the )?(funicular|cable|catenary|arch|thrust line|force diagram)\b|^(what|how|top|front|back|left|right|side|bottom|plan|iso\w*|perspective|ortho\w*)\b|\bview\b/;
const WEAK = /^(what|how|show|get|give|look|switch|go|set|change|start|new|stop|cancel|turn|top|front|back|left|right|side|bottom|plan|iso\w*|perspective|ortho\w*|view)\b/;
function phraseToCommands(line) {
  typedLine = line;
  const s = line.toLowerCase().trim().replace(/[.!?]+$/, '')
    .replace(/^((please|can you|could you|would you|will you|kindly|now|just|i want( you)? to|i'd like( you)? to|i would like( you)? to|let'?s)\s+)+/, '').replace(/\s+please$/, '');
  if (!SCENE_VERBS.test(s) && !ASKS.test(s)) return null;
  phraseNotes = [];
  // a clause without a verb takes the one before, or belongs to a part that reads the whole clause:
  // "create a table with 4 legs and the top", "a funicular cable with form and force diagram"
  const clauses = [];
  for (const c of s.split(/\s*;\s*|\s*,?\s+(?:and then|and also|after that|then|and)\s+/)) {
    if (!c) continue;
    const first = (c.match(/^[a-z]+/) || [''])[0], prev = clauses[clauses.length - 1];
    if (SCENE_VERBS.test(first) || !prev) clauses.push({ text: c, verb: SCENE_VERBS.test(first) ? first : '' });
    else if (recipeIn(prev.text) || FUNICULAR.test(prev.text)) prev.text += ' and ' + c;
    else clauses.push({ text: `${prev.verb} ${c}`.trim(), verb: prev.verb });
  }
  const commands = [], failed = [];
  for (const c of clauses) {
    const got = clauseToCommands(c.text);
    if (got) commands.push(...got); else failed.push(c.text);
  }
  return failed.length ? { failed, sure: !WEAK.test(s) } : { commands, notes: phraseNotes, funicular: FUNICULAR.test(s) };
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
    // The conversation with Claude (CAS/brg-terminal-ai): the page keeps it and sends it each time,
    // exactly as the service returned it (thinking blocks included).
    const ai = { history: [], container: undefined, abort: null };
    const keyStore = { get: () => { try { return localStorage.getItem('brg-terminal-key') || ''; } catch (e) { return ''; } },
      set: (k) => { try { localStorage.setItem('brg-terminal-key', k); } catch (e) { /* private window */ } } };
    const menuIndex = ref(0);
    const logEl = ref(null);
    const prompt = ref(null);
    const viewerEl = ref(null);
    const drawingIds = ref([]);
    // The session viewer frame (viewer/index.html, same site) and the line typed into its command line.
    const sessionEl = ref(null);
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
    const NOISE = /pipelines|WebGPU is experimental|adapter|gpu init|scene posted|surface|first frame|^fit(ted)?\b|^fit selected|^Keys go to the viewer/;
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
      await wait(60);
    }
    function sendToViewer(...lines) {
      if (view.kind !== 'welcome') closeSheet();
      viewerQueue.push(...lines);
      flushViewer();
    }
    const say = (text, kind = 'out', act) => { log.value.push({ text, kind, act }); nextTick(() => { if (logEl.value) logEl.value.scrollTop = logEl.value.scrollHeight; }); };
    say('BRG terminal for the CAS library. Type /help for commands.', 'dim');
    if (cfg.chatEndpoint) {
      say('Claude is connected: ask about the course and the books, or ask for a model. It reads the library, computes, and draws in the 3D view on the left. /new starts over.', 'dim');
      say('Viewer commands (Box 0,0,0 100 50 30; /viewer lists them) run directly; /local <words> builds from plain words without Claude.', 'dim');
    } else {
      say('Search mode: type words to search the library, or a command. Claude is not connected yet.', 'dim');
      say('The 3D view on the left shows the live scene. Build in it with plain words (“create a table”, “delete everything”, “top view”) or its own commands (Box 0,0,0 100 50 30; /viewer lists them).', 'dim');
    }
    say('Chapters, figures and drawings open on a sheet over it; /close shows the scene again.', 'dim');

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

    async function showDoc(id, section) {
      setView({ kind: 'loading', title: section });
      const html = renderMarkdown(await getText(`${id}/${section}`), `${id}/${section}`, bookIds.value);
      const s = books.value.find((b) => b.id === id)?.sections.find((x) => x.section === section);
      setView({ kind: 'doc', title: `${bookTitle(id)} · ${s ? s.title : section}`, html, open: `library.html${readerHref(id, section)}` });
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
    // Where the construction comes from: the library's chapters on the funicular polygon, Lévy first.
    function showReading() {
      if (state.value !== 'ready') { say('Read: Lévy, La Statique graphique I, ch. I (the library has not loaded).', 'dim'); return; }
      const seen = new Set();
      const hits = ['funiculaire', 'funicular', 'polygone des forces', 'force polygon'].flatMap((q) => search(q, allSections.value))
        .filter((h) => !seen.has(h.book + h.section) && seen.add(h.book + h.section))
        .sort((a, b) => /levy/i.test(b.book) - /levy/i.test(a.book));
      if (!hits.length) { say('No chapter on the funicular polygon in the library yet.', 'dim'); return; }
      say('Read (Lévy first):', 'dim');
      hits.slice(0, 5).forEach((h) => say(`${bookTitle(h.book)} · ${h.title}`, 'out', `/open ${h.book}/${h.section}`));
    }
    const splitRef = (ref_) => { const i = ref_.indexOf('/'); return i < 0 ? [ref_, ''] : [ref_.slice(0, i), ref_.slice(i + 1)]; };

    async function run(line, opts = {}) {
      line = line.trim();
      if (!line) return;
      if (!opts.quiet) { history.push(line); hpos = history.length; say('> ' + line, 'cmd'); }
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
        else if (cmd === '/viewer') VIEWER_CMDS.slice().sort((a, b) => a.cmd.localeCompare(b.cmd)).forEach((c) => say(`${c.cmd.padEnd(24)} ${c.help.replace(/^[^·:]*[·:]\s*/, '')}`, 'out', c.example || c.cmd));
        else if (cmd === '/close') closeSheet();
        else if (cmd === '/clear') log.value = [];
        else if (cmd === '/new') { ai.history = []; ai.container = undefined; say('New conversation with Claude.', 'dim'); }
        else if (cmd === '/stop') { if (ai.abort) ai.abort.abort(); else say('Claude is not working on anything.', 'dim'); }
        else if (cmd === '/key') { keyStore.set(arg.trim()); say(arg.trim() ? 'Key kept in this browser.' : 'Key removed.', 'dim'); }
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
        } else if (cmd !== '/local' && cmd.startsWith('/')) say('Unknown command. Type /help.', 'err');
        else if (cfg.chatEndpoint && cmd !== '/local' && !viewerCommandOf(line) && !/^-?\d[-\d.,\s]*$/.test(line)) await askClaude(line);
        else if ((phrase = phraseToCommands(cmd === '/local' ? arg : line)) && phrase.commands) {
          const shown = phrase.commands.filter((c) => c && !c.startsWith('='));
          sendToViewer(...phrase.commands);
          say('→ viewer: ' + (shown.length > 12 ? `${shown.length} commands: ${shown.slice(0, 3).join(' · ')} · …` : shown.join(' · ')), 'dim');
          (phrase.notes || []).forEach((n) => say(n, 'out'));
          if (phrase.funicular) showReading();
        }
        else if (viewerCommandOf(line)) { sendToViewer(line); say('→ viewer: ' + line, 'dim'); }
        else if (/^-?\d[-\d.,\s]*$/.test(line) || /^(finish|done|enter)$/i.test(line)) { const v = /\d/.test(line) ? line : ''; sendToViewer(v); say('→ viewer: ' + (v || 'Enter'), 'dim'); }
        else if (viewerAsks && !(phrase && phrase.sure)) { sendToViewer('=' + line); say('→ viewer (answer): ' + line, 'dim'); }
        else if (phrase && phrase.sure) {
          say(`Not understood: “${phrase.failed.join('”, “')}”. Without Claude the terminal knows:`, 'err');
          say('shapes: box, sphere, cylinder, cone, torus, pyramid, line, polyline, circle, arc, point, text (sizes and x,y,z optional)', 'dim');
          say('parts: table, chair, stool, bench, shelf, stair, wall, slab, column grid, frame (e.g. create a 2000 by 900 table)', 'dim');
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
      try {
        for (let hop = 0; hop < 24; hop++) {
          const done = await claudeRound(ai.abort.signal);
          ai.history.push(...done.messages);
          if (done.container) ai.container = done.container;
          if (done.usage) lastUsage = done.usage;
          if (!done.viewer.length) {
            if (done.stop === 'max_tokens') say('The answer was cut off (too long). Ask for less at once.', 'err');
            else if (done.stop === 'refusal') say('Claude declined this request.', 'err');
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
    async function claudeRound(signal) {
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
          if (e.t === 'thinking' || e.t === 'text') streamInto(e.t, e.d);
          else if (e.t === 'tool') { endStream(); say(toolLine(e), 'dim'); }
          else if (e.t === 'error') throw new Error(e.error);
          else if (e.t === 'done') done = e;
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
        const open = t.trim().match(/^\/open\s+(\S+\.md)$/);
        return open ? { text: t.trim(), kind: 'out', act: `/open ${open[1]}` } : { text: t || ' ', kind: 'text' };
      });
      log.value.splice(at, 1, ...lines);
    }
    // Claude's command lines in the 3D view; returns each line and what the viewer answered to it.
    async function runForClaude(commands) {
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
      prev, next, sectionTitle, readerHref, docUrl, groupOf, groupLabel,
      pixel: PIXEL, pixelCols: PIXEL_COLS, log, input, busy, menuItems, menuIndex, takeMenu, onKey, submit, focusPrompt, prompt, logEl,
      view, viewStack, viewBack, viewerEl, onViewerClick, run, drawingIds, sessionEl, viewerSrc, closeSheet,
    };
  },
}).mount('#app');
