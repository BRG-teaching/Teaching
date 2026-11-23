// Content of the CAS Computational Form-finding site.
// The page layout lives in website/src/CourseApp.vue and website/src/useCourse.js.
window.CAS = {
  title: 'Computational Form-finding',
  org: 'Block Research Group · ITA · D-ARCH · ETH Zürich',
  facts: [
    { value: '10', unit: 'ECTS' },
    { value: '40', unit: 'work days' },
    { value: '3–12', unit: 'months' },
    { value: '300 h', unit: 'student work ≈ 100 h contact' },
  ],
  hero: '../project/uploads/image.imageformat.1286.dpr2.2077283015.jpg',

  chapters: [
    {
      n: 1, color: '#3057b1', ects: 1, hours: 30, weeks: 'Weeks 1–2',
      title: 'LLM for BRG',
      logo: 'slide03-icon09.svg',
      mcp: {
        client: { title: 'LLM' },
        protocol: { title: 'BRG' },
      },
      contents: {
        lead: 'A practical LLM layer over BRG knowledge and the COMPAS ecosystem.',
        presentation: {
          label: 'Presentation',
          slides: [
            { src: 'presentations/mcp/slide-1.png', alt: 'Laptop showing structural form and force diagrams beside a source-grounded study notebook chat.' },
            { src: 'presentations/mcp/slide-2.png?v=2', alt: 'Books in German, French and English, a laptop showing scripts and an LLM study notebook, and a tablet with graphic statics notes.' },
            {
              key: 'applications-papers',
              alt: 'brg_papers highlighted among the four BRG pillars, showcasing the BRG publications website chatbot querying 154 papers and PhD theses.',
              applications: {
                groups: [
                  { title: 'brg_papers', emphasis: true },
                  { title: 'brg_theory' },
                  { title: 'brg_framework' },
                  { title: 'brg_presentation' },
                ],
                laptopFrame: 'presentations/mcp/laptop-frame.png?v=6',
                singleLaptop: {
                  screen: 'presentations/mcp/brg-web-chatbot.jpg?v=5',
                  url: 'library.html#/papers',
                  title: 'Open BRG Papers & PhD Theses in Library',
                },
              },
            },
            {
              key: 'applications-theory',
              alt: 'brg_theory highlighted among the four BRG pillars, showing historical Graphic Statics books turned into a searchable MCP resource.',
              applications: {
                groups: [
                  { title: 'brg_papers' },
                  { title: 'brg_theory', emphasis: true },
                  { title: 'brg_framework' },
                  { title: 'brg_presentation' },
                ],
                booksResource: {
                  books: [
                    { author: 'Bow', year: '1873', short: 'Diagrams of Forces', cover: 'presentations/mcp/gs-books/bow-1873.jpg', href: 'library.html#/b/framed-structures-bow' },
                    { author: 'Cremona', year: '1879', short: 'Reciprocal Figures', cover: 'presentations/mcp/gs-books/cremona-1879.jpg', href: 'library.html#/b/cremona-graphical-calculus-part-2' },
                    { author: 'Henneberg', year: '1911', short: 'Graphische Statik', cover: 'presentations/mcp/gs-books/henneberg-1911.jpg', href: 'library.html#/b/graphic-statics-henneberg' },
                    { ellipsis: true },
                    { author: 'Föppl', year: '1920', short: 'Graphische Statik', cover: 'presentations/mcp/gs-books/foeppl-1920.jpg', href: 'library.html#/b/graphic-statics-foeppl' },
                    { author: 'Trefftz', year: '1936', short: 'Graphostatik', cover: 'presentations/mcp/gs-books/trefftz-1936.jpg', href: 'library.html#/b/graphostatics-trefftz' },
                  ],
                  pipeline: [
                    { title: 'Scans', sub: 'PDFs & plates' },
                    { title: 'OCR & LaTeX', sub: 'Equations & layout' },
                    { title: 'Translation', sub: 'Proofread Markdown & figures' },
                    { title: 'Cloudflare R2', sub: 'LIBRARY.md & chapters' },
                    { title: 'MCP', sub: 'books-mcp resource', emphasis: true },
                  ],
                },
              },
            },
            {
              key: 'applications-framework',
              alt: 'brg_framework highlighted among the four BRG pillars, showcased across Chatbot, Terminal and VS Code.',
              applications: {
                groups: [
                  { title: 'brg_papers' },
                  { title: 'brg_theory' },
                  { title: 'brg_framework', emphasis: true },
                  { title: 'brg_presentation' },
                ],
                laptopFrame: 'presentations/mcp/laptop-frame.png?v=6',
                demos: [
                  { title: 'Chatbot', gif: 'presentations/mcp/chatbot.gif?v=2', url: 'https://www.youtube.com/watch?v=rVgoINY87DU' },
                  { title: 'Terminal', gif: 'presentations/mcp/terminal.gif?v=2', url: 'https://www.youtube.com/watch?v=yalyvv4nIP0' },
                  { title: 'VS Code', gif: 'presentations/mcp/vscode.gif?v=2', url: 'https://www.youtube.com/watch?v=qY66eiRa6Og' },
                ],
              },
            },
            {
              key: 'applications-presentation',
              alt: 'brg_presentation highlighted among the four BRG pillars, showing closed-joint kinematics and the compas_pr3d open-source workflow inside the laptop.',
              applications: {
                groups: [
                  { title: 'brg_papers' },
                  { title: 'brg_theory' },
                  { title: 'brg_framework' },
                  { title: 'brg_presentation', emphasis: true },
                ],
                laptopFrame: 'presentations/mcp/laptop-frame.png?v=6',
                singleLaptop: {
                  screen: 'presentations/mcp/brg-presentation.gif?v=2',
                },
              },
            },
            { src: 'presentations/mcp/slide-4.png?v=4', alt: 'LLM for BRG architecture: Context layers (MCP and Memory first, followed by Hooks, Skills, Agents) connected to BRG and the Context, Parsing, Storage, Indexing and LLM pipeline.' },
            { src: 'presentations/mcp/slide-5.png?v=3', alt: 'Method focus across four subjects: FD (Force Density, highlighted), DR (Dynamic Relaxation), TNA (Thrust Network Analysis) and AGS (Algebraic Graphic Statics).' },
            { src: 'presentations/mcp/slide-6.png?v=5', alt: 'Folder structure of brg_framework MCP for the Force Density (FD) method.' },
            {
              key: 'interactive-drawing-fd',
              alt: 'Interactive Force Density presentations (5 clickable decks) and 02-question.yaml stage format, displayed beside a large clickable laptop.',
              interactiveDrawing: {
                methodTitle: 'FD · Interactive Drawings',
                methodSub: '5 decks',
                presentations: [
                  { title: 'Static Equilibrium (Cosines)', url: 'https://petrasvestartas.github.io/session/?stage=equilibrium' },
                  { title: 'Single-Node & 5-Node Equations', url: 'https://petrasvestartas.github.io/session/?stage=force-density', active: true },
                  { title: 'Force Density Matrices', url: 'https://petrasvestartas.github.io/session/?stage=force-density-matrices' },
                  { title: 'Jacobian & Matrix Derivation', url: 'https://petrasvestartas.github.io/session/?stage=force-density-derivation' },
                  { title: 'Materialization & Cut Lengths', url: 'https://petrasvestartas.github.io/session/?stage=force-density-materialization' },
                ],
                specTitle: '02-question.yaml',
                yaml: `title: QUESTION
camera: { yaw: -58, pitch: 26 }
net:
  fixed: { n1: [0,0,0], n2: [5,0,3] }
  free: { n0: [3.6, 3.4, 1.9] }
  cables: { e0: [n0, n1], e1: [n0, n2] }
  q: 1
slides:
  - title: POSITION OF FREE NODE n0
    steps:
      - say: 'Four fixed nodes...'
        show: net`,
                laptopFrame: 'presentations/mcp/laptop-frame.png?v=6',
                gif: 'presentations/mcp/fd-interactive.gif?v=1',
                url: 'https://petrasvestartas.github.io/session/?stage=force-density',
                hint: 'Click to open FD interactive viewer ↗',
              },
            },
            { src: 'presentations/mcp/slide-5-tna.png?v=1', alt: 'Method focus across four subjects: FD (Force Density), DR (Dynamic Relaxation), TNA (Thrust Network Analysis, highlighted) and AGS (Algebraic Graphic Statics).' },
            { src: 'presentations/mcp/slide-6-tna.png?v=2', alt: 'Folder structure of brg_framework MCP for the Thrust Network Analysis (TNA) method.' },
            {
              key: 'interactive-drawing-tna',
              alt: 'Interactive Thrust Network Analysis presentations (5 clickable decks) and YAML stage format, displayed beside a large clickable laptop.',
              interactiveDrawing: {
                methodTitle: 'TNA · Interactive Drawings',
                methodSub: '5 decks',
                presentations: [
                  { title: 'Single-Node Thrust Equilibrium', url: 'https://petrasvestartas.github.io/session/?stage=thrust-network_analysis_one_node' },
                  { title: 'Horizontal Equilibrium (Γ & Γ*)', url: 'https://petrasvestartas.github.io/session/?stage=thrust-network_analysis_horizontal_equilibrium', active: true },
                  { title: 'Five Horizontal Equilibrium Methods', url: 'https://petrasvestartas.github.io/session/?stage=thrust-network_analysis_horizontal_methods' },
                  { title: 'Vertical Equilibrium & Heights', url: 'https://petrasvestartas.github.io/session/?stage=thrust-network_analysis_vertical_equilibrium' },
                  { title: 'Compression Plans & 3D Vaults', url: 'https://petrasvestartas.github.io/session/?stage=thrust-network_analysis_geometries' },
                ],
                specTitle: '01-force-diagram.yaml',
                yaml: `title: THE FORCE DIAGRAM
split: 0.5
camera: { view: top, fit: [LO, HI] }
slides:
  - title: NODES CLOSE POLYGONS
    steps:
      - say: 'Four bars push on node 1.'
        do:
          - add: [{ id: b0, line: [s1, n1] }]`,
                laptopFrame: 'presentations/mcp/laptop-frame.png?v=6',
                gif: 'presentations/mcp/tna-interactive.gif?v=1',
                url: 'https://petrasvestartas.github.io/session/?stage=thrust-network_analysis_horizontal_equilibrium',
                hint: 'Click to open TNA interactive viewer ↗',
              },
            },
            {
              key: 'workspace-slide',
              alt: 'Zero-install browser workspace combining the BRG Library, BRG Terminal, and JupyterLite in one screen with Claude, Gemini, and Kimi support.',
              workspaceSlide: {
                laptopFrame: 'presentations/mcp/laptop-frame.png?v=6',
                screen: 'presentations/mcp/workspace-screen.jpg?v=2',
                url: 'library.html#/notebook',
              },
            },
            { src: 'presentations/mcp/slide-12.png?v=6', alt: 'Connect (BRG MCP in Chatbot, Terminal, VS Code, Browser) → Ground (Theory, BRG books & papers, derivations, step-by-step explanations, examples) → Reproduce (COMPAS code implementations, connection with your own workflow, learning using Jupyter notebooks, Chatbot, Terminal, VS Code).' },
          ],
        },
        items: [
          'LLM fundamentals: prompts, context, tools and agents',
          'Model Context Protocol (MCP): clients, tools and resources',
          'BRG library and knowledge as grounded context',
          'COMPAS geometry and structural solvers as callable tools',
          'Notebook generation and reproducible computational workflows',
          'Evaluation, limitations and responsible use',
        ],
      },
      resources: {
        lead: 'The existing BRG and COMPAS infrastructure.',
        items: [
          'BRG Library: books, chapters and figures',
          'BRG MCP server: searchable knowledge and structural tools',
          'COMPAS core: geometry, data structures and exchange',
          'compas_ags, compas_fd, compas_dr and compas_tna',
          'Jupyter + BRG: browser notebooks and terminal',
        ],
      },
      submission: {
        lead: 'A working LLM workflow grounded in BRG and COMPAS.',
        items: [
          'A question answered from traceable BRG sources',
          'A structural object generated through MCP tools',
          'A runnable Jupyter notebook with reproducible results',
          'A short evaluation of accuracy and limitations',
        ],
      },
    },
    {
      n: 2, color: '#5552bb', ects: 1, hours: 30, weeks: 'Weeks 3–4',
      title: 'Computational Structural Design with COMPAS',
      short: 'Computational Structural Design',
      logo: 'slide03-icon03.svg',
      focus: [
        { logo: 'slide06-icon01.svg', label: 'COMPAS', sub: ['Primitives', 'Data', 'Data Exchange', 'Geometry', 'Data Structures'] },
        { logo: 'slide06-icon02.svg', label: 'AEC Formats', sub: ['IFC', 'Model'] },
        { logo: 'slide06-icon03.svg', label: 'Solvers', sub: ['Matrix Decomposition', 'Optimization Solvers'] },
        { logo: 'slide06-icon04.svg', label: 'AI Connectors', sub: ['LLM', 'Agents', 'MCP', 'Skills'] },
      ],
      contents: {
        lead: 'Mathematical and geometrical foundations, and why each one is needed.',
        items: [
          'Mathematical and geometrical foundations',
          'Math versus freeform geometrical descriptions',
          'Algorithms: how a design intent becomes a procedure',
          'Mesh with connectivity, and its matrices',
          'Dot and cross products, and where they are used',
          'Matrix decomposition inside solvers',
          'Graphs: when to use one, and how it is formulated',
          'Optimisation solvers and automatic differentiation',
        ],
      },
      resources: {
        lead: 'One course repo, one framework, one installation guide.',
        items: [
          'GKR course repo: lectures, assignments, roadmap',
          'compas.dev: getting started + API reference',
          'Installation guide, this repo',
          'Python cheat sheet & reference',
          'Book: Geometric Computation',
          'Rhino Python guide / RhinoCommon API',
          'BRG-teaching workshops',
        ],
      },
      submission: {
        lead: 'The hand-drawn 2D topics, now coded.',
        notebookResources: {
          text: 'Run these Python tutorials in the embedded Jupyter + BRG workspace. Start with small COMPAS examples, then work through data exchange, geometry, data structures and solvers. Structural exercises extend the foundations.',
          tutorials: window.CAS_NOTEBOOKS || [],
          links: [
            { label: 'Open COMPAS notebook workspace', url: 'library.html#/notebook' },
            { label: 'Official COMPAS notebook examples', url: 'https://compas.dev/compas-jupyterlite/lab/index.html' },
          ],
        },
        items: [
          'Warm-ups: brick wall, point grid',
          'Funicular line through 2–3 points',
          'Truss builder with member force data',
          'Final project: one classic construction as a parametric script',
        ],
      },
    },
    {
      n: 3, color: '#7750c1', ects: 1, hours: 30, weeks: 'Weeks 5–6',
      title: 'Graphic Statics',
      logo: 'slide03-icon04.svg',
      focus: [
        { logo: 'slide07-icon01.svg', label: 'Cables and arches' },
        { logo: 'slide07-icon02.svg', label: 'Trusses' },
        { logo: 'slide07-icon03.svg', label: 'compas_ags' },
      ],
      contents: {
        lead: 'The hand constructions rebuilt as code.',
        items: [
          'Form and force diagrams, reciprocity in code',
          'Equilibrium set up from graph data',
          'Forces and geometry modified, force diagrams computed',
          'Strut-and-tie thinking for load paths',
        ],
      },
      resources: {
        lead: 'Packages, plugins and GitBooks.',
        items: [
          'compas_ags: algebraic graphic statics',
          'compas-IGS: graphic statics in Rhino',
          'Gitbook: Computational Graphic Statics',
          'eQUILIBRIUM views as starter code',
        ],
      },
      submission: {
        lead: 'Drawn by hand first, then reproduced and verified in code.',
        items: [
          'Three eQUILIBRIUM views re-implemented as scripts',
          'An arch or truss sized for given loads',
        ],
      },
    },
    {
      n: 4, color: '#934abd', ects: 1, hours: 30, weeks: 'Weeks 7–8',
      title: 'Form Finding',
      logo: 'slide03-icon05.svg',
      focus: [
        { logo: 'slide08-icon01.svg', label: 'Force density' },
        { logo: 'slide08-icon02.svg', label: 'Dynamic relaxation' },
        { logo: 'slide08-icon03.svg', label: 'Form finding' },
      ],
      contents: {
        lead: 'Nets and membranes.',
        items: [
          'Force density method, Schek 1974: force-length ratios',
          'Boundary conditions and constraints',
          'Dynamic relaxation with kinetic damping',
          'When to use which solver',
          'Tensile surfaces and cable-net formworks',
        ],
      },
      resources: {
        lead: 'Packages, plugins and GitBooks.',
        items: [
          'compas_fd: force density',
          'compas_dr: dynamic relaxation',
          'compas-FoFin: FormFinder in Rhino',
          'Gitbook: COMPAS FormFinder',
          'BRG demonstrator case material: KnitCandela, HiLo',
        ],
      },
      submission: {
        lead: 'A form-found tension structure, with the solver choice justified.',
        items: [
          'A saddle net and a cable-net canopy',
          'FD and DR compared on the same problem',
          'Equilibrium verified in code, in a notebook',
        ],
      },
    },
    {
      n: 5, color: '#ae4bb2', ects: 1, hours: 30, weeks: 'Weeks 9–10',
      title: 'Thrust Network Analysis',
      logo: 'slide03-icon06.svg',
      focus: [
        { logo: 'slide09-icon01.svg', label: 'Thrust Network Analysis' },
        { logo: 'slide09-icon02.svg', label: 'Thrust Network Optimization' },
        { logo: 'slide09-icon03.svg', label: 'Discrete Element Modelling' },
      ],
      contents: {
        lead: 'From thrust network to buildable vault.',
        items: [
          'Thrust networks: horizontal equilibrium of the form diagram',
          'Vertical equilibrium and force densities',
          'Relation to graphic statics: reciprocity in 3D',
          'Funicular shells and masonry vaults: stability, load cases',
          'Interactive form-finding with RhinoVAULT',
          'Scripted workflows with compas_tna, optimisation with compas_tno',
          'Boundaries, openings, thickness, materialisation',
        ],
      },
      resources: {
        lead: 'Packages, plugins and GitBooks.',
        items: [
          'compas_tna: thrust network analysis',
          'compas_tno: optimisation of thrust networks',
          'compas_dem: discrete element modelling',
          'compas-RV / RhinoVAULT in Rhino 8',
          'Gitbook: RhinoVAULT',
          'Study cases: Armadillo Vault, Striatus Bridge',
        ],
      },
      submission: {
        lead: 'A compression-only structure, checked for stability and buildability.',
        items: [
          'A vault form-found from a given plan',
          'The form diagram steered iteratively',
          'A pavilion verified with compas_tna, documented',
        ],
      },
    },
    {
      n: 6, color: '#ca49a4', ects: 1, hours: 30, weeks: 'Weeks 11–12',
      title: 'Materialization / Constructability',
      logo: 'slide03-icon07.svg',
      focus: [
        { logo: 'slide10-icon01.svg', label: 'Materialization' },
        { logo: 'slide10-icon02.svg', label: 'Model' },
        { logos: ['slide10-icon03.svg', 'slide10-icon04.svg', 'slide10-icon05.svg'], label: 'Interactions', sub: ['Additive · Subtractive · Pouring'] },
      ],
      contents: {
        lead: 'From form-found geometry to something that can be built.',
        items: [
          'Discretisation: from surface to blocks and panels',
          'Interfaces, joints and contact surfaces',
          'Tolerance, fabrication constraints, material limits',
          'Assembly sequence, stability during construction',
          'Formwork and falsework strategies',
          'Robotic fabrication and digital workflows',
        ],
      },
      resources: {
        lead: 'Discrete element packages and the fabrication lab.',
        items: [
          'compas_model: model organisation',
          'Robotic Fabrication Laboratory (RFL)',
          'Study cases: Striatus, Phoenix, Armadillo Vault',
        ],
      },
      submission: {
        lead: 'A buildable version of the form found in Ch 3 to 5.',
        items: [
          'Discretised geometry with interfaces resolved',
          'Assembly drawings and sequence',
          'Stability check of the partially built state',
          'A small physical model of the assembly',
        ],
      },
    },
    {
      n: 7, color: '#dc4b8d', ects: 4, hours: 120, weeks: 'Runs across the full course',
      title: 'Individual Project',
      logo: 'slide03-icon08.svg',
      steps: [
        { logo: 'slide11-icon01.svg', label: 'Research question', sub: 'Structural system + sustainability', weeks: 'Weeks 1–2' },
        { logo: 'slide11-icon02.svg', label: 'Physical prototype', weeks: 'Weeks 3–4' },
        { logo: 'slide11-icon03.svg', label: 'Midterm review', sub: 'Presentation to an audience', weeks: 'Weeks 7–8' },
        { logos: ['slide11-icon04.svg', 'slide11-icon05.svg'], label: 'Toolchain', sub: 'At least two tools from the previous chapters', weeks: 'Weeks 9–10' },
        { logo: 'slide11-icon06.svg', label: 'Documented project', sub: 'In a GitHub repository', weeks: 'Weeks 13–14' },
        { logo: 'slide11-icon07.svg', label: 'Final review', sub: 'Presentation to an audience', weeks: 'Weeks 15–16' },
      ],
      contents: {
        lead: 'An own design question, carried through the whole course.',
        items: [
          'Own design question: arch, vault, shell, cable net or strut-and-tie',
          'At least two toolchains, running as code',
          'Proposal · mid-term peer review · final review with external critics',
          'A physical prototype of the form-found design',
          'Public repository · 4–6 page booklet · 15-minute defence',
        ],
      },
      resources: {
        lead: 'The Robotic Fabrication Laboratory.',
        items: [
          'RFL, Arch_Tec_Lab building, Hönggerberg campus',
          'Four six-axis robots on an overhead gantry, working cooperatively',
          'Maximum working volume 43 × 16 × 8 m',
          'Open across disciplines, for full-scale design and construction experiments',
        ],
      },
    },
  ],

  // Names in the card lists that become links (every occurrence, longest name first).
  links: {
    'eQUILIBRIUM platform': 'https://block.arch.ethz.ch/eq/',
    'eQUILIBRIUM views': 'https://brg-teaching.github.io/Teaching/2_computational_form_finding/Equilibrium/drawings/web/gallery.html',
    'Gitbook: Computational Graphic Statics': 'https://sites.gitbook.com/preview/site_gbuez',
    'Model Context Protocol': 'https://modelcontextprotocol.io/',
    'BRG Library': 'library.html',
    'BRG MCP server': 'https://github.com/BRG-research/mcp-server-brg',
    'COMPAS core': 'https://compas.dev/',
    'Jupyter + BRG': 'library.html#/notebook',
    'Library': 'library.html',
    'Course PDF archive': 'https://pub-c082064d3c234b25bcb6abd4240e637c.r2.dev/teaching/equilibrium/files/index.html',
    'compas_ags': 'https://github.com/BlockResearchGroup/compas_ags',
    'compas-IGS': 'https://github.com/BlockResearchGroup/compas-IGS',
    'compas.dev': 'https://compas.dev/#/gettingstarted',
    'Installation guide, this repo': 'https://github.com/BRG-teaching/Teaching#setup',
    'Rhino Python guide': 'https://developer.rhino3d.com/guides/rhinopython/',
    'RhinoCommon API': 'https://developer.rhino3d.com/api/rhinocommon/',
    'BRG-teaching workshops': 'https://github.com/BRG-teaching',
    'compas_fd': 'https://github.com/BlockResearchGroup/compas_fd',
    'compas_dr': 'https://github.com/BlockResearchGroup/compas_dr',
    'compas-FoFin': 'https://github.com/BlockResearchGroup/compas-FoFin',
    'Gitbook: COMPAS FormFinder': 'https://blockresearchgroup.gitbook.io/compas-fofin',
    'compas_tna': 'https://github.com/BlockResearchGroup/compas_tna',
    'compas_tno': 'https://github.com/BlockResearchGroup/compas_tno',
    'compas_dem': 'https://github.com/BlockResearchGroup/compas_dem',
    'compas-RV': 'https://github.com/BlockResearchGroup/compas-RV',
    'Gitbook: RhinoVAULT': 'https://blockresearchgroup.gitbook.io/rhinovault',
    'RhinoVAULT': 'https://blockresearchgroup.gitbook.io/rhinovault',
    'compas_model': 'https://github.com/BlockResearchGroup/compas_model',
    'Robotic Fabrication Laboratory (RFL)': 'https://ita.arch.ethz.ch/archteclab/rfl.html',
    'RFL': 'https://ita.arch.ethz.ch/archteclab/rfl.html',
  },

  grading: [
    { ch: 1, weight: 'ungraded', what: 'LLM workflow, one evaluation' },
    { ch: 2, weight: '10 %', what: 'Notebooks, truss module' },
    { ch: 3, weight: '10 %', what: 'Three views in code' },
    { ch: 4, weight: '10 %', what: 'Net and canopy, FD vs DR' },
    { ch: 5, weight: '5 %', what: 'Vault and pavilion' },
    { ch: 6, weight: '5 %', what: 'Assembly drawings, physical model' },
    { ch: 7, weight: '60 %', what: 'Repository, booklet, physical prototype, defence' },
  ],

};
