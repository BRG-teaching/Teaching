// The BRG library as Claude reads it: LIBRARY.md and the chapter Markdown in the public R2 bucket.
// The tools carry the names mcp-server-brg gives them (list_books, search_books, read_book_section),
// so the website terminal and the desktop brg tools read the same way.

const safePath = (p) => !!p && !p.startsWith('/') && !p.split('/').some((s) => s === '' || s === '.' || s === '..') && !/[\\%?#:]/.test(p);
const fileUrl = (base, path) => base.replace(/\/$/, '') + '/' + path.split('/').map(encodeURIComponent).join('/');

// The catalogue: "# Group", "## `id/` — Title", "  - `file.md` **Title** summary" (as the website reads it).
export function parseLibrary(text) {
  const books = [];
  let cur = null, heading = '';
  for (const line of text.split(/\r?\n/)) {
    const g = line.match(/^#\s+(.+)$/);
    if (g) { heading = g[1].trim(); continue; }
    const h = line.match(/^## `([a-zA-Z0-9_-]+)\/` — (.+)$/);
    if (h) { cur = { id: h[1], title: h[2].trim(), group: heading, sections: [] }; books.push(cur); continue; }
    const e = line.match(/^\s+- `([^`]+\.md)` \*\*(.*?)\*\*(.*)$/);
    if (cur && e && safePath(e[1])) cur.sections.push({ section: e[1], title: e[2], summary: e[3].replace(/^\s*[—-]\s*/, '').trim() });
  }
  return books.filter((b) => b.sections.length);
}

let cached = null; // { at, books } for ten minutes per Worker instance
async function catalogue(env) {
  if (cached && Date.now() - cached.at < 600000) return cached.books;
  const res = await fetch(fileUrl(env.LIBRARY_BASE, 'LIBRARY.md'));
  if (!res.ok) throw new Error(`LIBRARY.md returned HTTP ${res.status}`);
  cached = { at: Date.now(), books: parseLibrary(await res.text()) };
  return cached.books;
}

// Historical: before 1950, or by the founders of graphic statics.
const historical = (b) => {
  const year = +((b.title.match(/\b(1[5-9]\d\d)\b/) || [])[1] || 0);
  return (year > 0 && year < 1950) || /levy|culmann|cremona|maxwell|wolfe|ritter|rankine|varignon|mohr|muller-breslau|henneberg|bow\b/.test(words(b.id + ' ' + b.title).join(' '));
};

// Words, lower case, without accents, so "funiculaire" and "Lévy" match as typed.
const words = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').match(/[a-z0-9]+/g) || [];

export const LIBRARY_TOOLS = [
  {
    name: 'list_books',
    description: 'List every book, BRG PhD thesis and paper in the BRG library with its id, title, group and number of chapters. Call it when you need to know what the library holds, before choosing what to read.',
    input_schema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'search_books',
    description: 'Search the chapter titles and summaries of the BRG library (Lévy, La Statique graphique; ETH graphic statics; BRG theses and papers). Call it before answering any question about the course material, and before building a model the books describe. Search in the language of the source too (French for Lévy: "polygone funiculaire", "pôle", "rayons"). Historical books come first, marked [historical].',
    input_schema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Words to look for, e.g. "polygone funiculaire" or "thrust line arch"' },
        book: { type: 'string', description: 'Optional book id to search in only, e.g. "graphic-statics-levy-part-1"' },
        limit: { type: 'integer', description: 'Most results to return, 1-25 (default 10)' },
      },
      required: ['query'],
      additionalProperties: false,
    },
  },
  {
    name: 'read_book_section',
    description: 'Read lines of one chapter (or README.md, INDEX.md, GLOSSARY.md, FIGURES.md, GRAPHIC-STATICS-NOTATION.md) of a book. Read the chapters a search points to before relying on them; read in pieces, following the "next" line number. Figures appear as Markdown image links; pass their URLs to look_at_figure to see them.',
    input_schema: {
      type: 'object',
      properties: {
        book: { type: 'string', description: 'Book id, e.g. "graphic-statics-levy-part-1"' },
        section: { type: 'string', description: 'File name in the book, e.g. "01-chapter-1.md"' },
        start_line: { type: 'integer', description: 'First line, from 1 (default 1)' },
        line_count: { type: 'integer', description: 'Lines to read, 1-400 (default 200)' },
      },
      required: ['book', 'section'],
      additionalProperties: false,
    },
  },
  {
    name: 'look_at_figure',
    description: 'See a figure or plate of a book as an image: an image URL from a chapter, or a path relative to the library such as "graphic-statics-levy-part-1/figures/fig001.png". Call it when the construction in a figure matters for the answer or the model.',
    input_schema: {
      type: 'object',
      properties: { url: { type: 'string', description: 'Image URL in the library bucket, or a path relative to it' } },
      required: ['url'],
      additionalProperties: false,
    },
  },
];

const text = (s) => [{ type: 'text', text: s }];

// Run one library tool; returns tool_result content. Inputs come from the model: check them here.
export async function runLibraryTool(name, input, env) {
  if (!input || typeof input !== 'object') throw new Error('The tool input is not an object.');
  if (name === 'list_books') {
    const books = await catalogue(env);
    return text(books.map((b) => `${b.id} — ${b.title} [${b.group || 'Books'}, ${b.sections.length} chapters]`).join('\n'));
  }
  if (name === 'search_books') {
    if (typeof input.query !== 'string' || !input.query.trim()) throw new Error('search_books needs a query.');
    const limit = Math.max(1, Math.min(25, Number.isInteger(input.limit) ? input.limit : 10));
    const terms = words(input.query);
    const books = (await catalogue(env)).filter((b) => !input.book || b.id === input.book);
    const hits = [];
    for (const b of books) {
      const inBook = words(b.title);
      for (const s of b.sections) {
        const inTitle = words(s.title), inSummary = words(s.summary);
        // a word in the chapter title counts most, then the summary, then the book's title
        const score = terms.reduce((n, t) => n + (inTitle.some((w) => w.startsWith(t)) ? 3 : 0) + (inSummary.some((w) => w.startsWith(t)) ? 1 : 0) + (inBook.some((w) => w.startsWith(t)) ? 1 : 0), 0);
        if (score) hits.push({ score, old: historical(b), line: `${b.id}/${s.section} — ${b.title} — ${s.title}: ${s.summary}${historical(b) ? ' [historical]' : ''}` });
      }
    }
    // historical books first (before 1950, or by the founders of graphic statics), as the course reads them
    hits.sort((a, b) => b.old - a.old || b.score - a.score);
    return text(hits.length ? hits.slice(0, limit).map((h) => h.line).join('\n') : `Nothing matches “${input.query}”. Try other words, the source language, or list_books.`);
  }
  if (name === 'read_book_section') {
    const path = `${input.book}/${input.section}`;
    if (typeof input.book !== 'string' || typeof input.section !== 'string' || !safePath(path) || !path.endsWith('.md')) throw new Error('Give a book id and a .md file name in it.');
    const res = await fetch(fileUrl(env.LIBRARY_BASE, path));
    if (!res.ok) throw new Error(`${path} returned HTTP ${res.status}.`);
    const lines = (await res.text()).split(/\r?\n/);
    const start = Math.max(1, Number.isInteger(input.start_line) ? input.start_line : 1);
    const count = Math.max(1, Math.min(400, Number.isInteger(input.line_count) ? input.line_count : 200));
    const part = lines.slice(start - 1, start - 1 + count);
    const base = fileUrl(env.LIBRARY_BASE, path).replace(/[^/]+$/, '');
    const next = start + count <= lines.length ? `next: start_line ${start + count}` : 'end of file';
    return text(`${path} lines ${start}–${start + part.length - 1} of ${lines.length} (${next}). Relative links resolve against ${base}\n\n${part.join('\n')}`);
  }
  if (name === 'look_at_figure') {
    if (typeof input.url !== 'string') throw new Error('look_at_figure needs a url.');
    const base = env.LIBRARY_BASE.replace(/\/$/, '');
    const url = /^https:\/\//.test(input.url) ? input.url : safePath(input.url) ? fileUrl(base, input.url) : '';
    if (!url || !url.startsWith(base + '/') || !/\.(png|jpe?g|gif|webp)$/i.test(url)) throw new Error('Only images in the library bucket can be shown.');
    return [{ type: 'image', source: { type: 'url', url } }, { type: 'text', text: url }];
  }
  throw new Error(`No library tool named ${name}.`);
}
