// Where the library lives and how it is grouped. The catalogue itself is LIBRARY.md in the
// R2 bucket (written by mcp-server-brg's books workflow), so adding a book there makes it
// appear here without editing this site.
window.CAS_LIBRARY = {
  // Public R2 bucket "brg-books" (see mcp-server-brg/config/sources.yaml).
  // Read directly only when the deploy's copy (mirrorPath) is missing; that needs a CORS rule
  // on the bucket allowing https://brg-teaching.github.io.
  baseUrl: 'https://pub-c082064d3c234b25bcb6abd4240e637c.r2.dev',
  libraryPath: 'LIBRARY.md',
  // Copy of the markdown made by the GitHub Pages deploy (tools/mirror_books.py), read first.
  // It removes the need for CORS on the bucket; figures still load from baseUrl.
  mirrorPath: 'books',

  // Library tabs. Every entry in LIBRARY.md is a book unless its ID is listed here.
  groups: [
    { id: 'books', label: 'Books' },
    { id: 'theses', label: 'BRG PhD theses' },
    { id: 'papers', label: 'Papers' },
  ],
  // e.g. 'rippmann-2016-phd': 'theses', 'block-2009-tna-paper': 'papers'
  groupOf: {},

  // Subject of each book, set by hand (ids: gs, ff, tna, mat, math, comp, sd); books not listed are classified
  // from their text. Keep this list complete for books.
  subjects: {
    'cremona-graphical-calculus': 'gs',
    'graphic-statics-framed-structures': 'gs',
    'graphic-statics-henneberg': 'gs',
    'graphic-statics-levy': 'gs', 'graphic-statics-levy-part-2': 'gs', 'graphic-statics-levy-part-3': 'gs', 'graphic-statics-levy-part-4': 'gs',
    'graphical-analysis-wolfe': 'gs',
    'graphostatics-trefftz': 'gs',
    'graphic-statics-foeppl': 'gs',
    'space-trusses-foeppl': 'gs',
    'force-density-linkwitz': 'ff',
    'stability-of-revetments-poncelet': 'tna',
    'stability-of-vaults-poncelet': 'tna',
    'joinery-compendium-bauer-pauli': 'mat',
    'differential-integral-calculus-doelp-netto': 'math',
    'mathematics-formulary-wetzel': 'math',
    'faustformel-tragwerksentwurf': 'sd',
    'framed-structures-bow': 'sd',
    'graphic-statics-student-course': 'sd',
    'statics-zillich-stiegler-part-3': 'sd',
  },

  // Reviewed computational methods; all other books keep their bibliographic covers.
  methods: {},

  // Extra pages a book folder may contain, shown on its book page when present.
  extras: ['README.md', 'INDEX.md', 'GLOSSARY.md', 'FIGURES.md', 'SCANS.md', 'GRAPHIC-STATICS-NOTATION.md'],

  // Claude in the BRG terminal: a Cloudflare Worker address such as
  // 'https://brg-terminal.<account>.workers.dev'. Empty: the terminal searches the library
  // and builds from plain words without Claude.
  chatEndpoint: '',

  // The BRG MCP server used by Claude, Gemini and Kimi for the library and every BRG tool.
  // Own-key Gemini and Kimi modes call these tools directly from this browser.
  mcpEndpoint: 'https://brg-mcp.onrender.com/mcp',
  geminiModel: 'gemini-3.8-flash',
  kimiEndpoint: 'https://api.moonshot.ai/v1/chat/completions',
  kimiModel: 'kimi-k2.7-code',
};
