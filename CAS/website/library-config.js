// Where the library lives and how it is grouped. The catalogue itself is LIBRARY.md in the
// R2 bucket (written by mcp-server-brg's books workflow), so adding a book there makes it
// appear here without editing this site.
window.CAS_LIBRARY = {
  // Public R2 bucket "brg-books" (see mcp-server-brg/config/sources.yaml).
  // Read directly only when the deploy's copy (mirrorPath) is missing; that needs a CORS rule
  // on the bucket allowing https://brg-teaching.github.io (see website/README.md).
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

  // Extra pages a book folder may contain, shown on its book page when present.
  extras: ['README.md', 'INDEX.md', 'GLOSSARY.md', 'FIGURES.md', 'SCANS.md', 'GRAPHIC-STATICS-NOTATION.md'],

  // Claude in the BRG terminal: the address of the Cloudflare Worker in CAS/brg-terminal-ai (see its
  // README), e.g. 'https://brg-terminal.<account>.workers.dev'. Empty: the terminal searches the library
  // and builds from plain words without Claude.
  chatEndpoint: '',
};
