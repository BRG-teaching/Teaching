// Content of the CAS Computational Form-finding site, taken from the deck
// (../project/CAS Computational Form-Finding.dc.html). Edit text here; the
// page layout lives in index.html and app.js.
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
      title: 'History of Computational Structural Design',
      logo: 'slide03-icon02.svg',
      focus: [
        { logo: 'slide05-icon01.svg', label: 'Cables' },
        { logo: 'slide05-icon02.svg', label: 'Arches' },
        { logo: 'slide05-icon03.svg', label: 'Trusses' },
        { logo: 'slide05-icon04.svg', label: 'Beams' },
        { logo: 'slide05-icon05.svg', label: 'Frames' },
        { logo: 'slide05-icon06.svg', label: 'Plates and slabs' },
        { logo: 'slide05-icon07.svg', label: 'Columns' },
        { logo: 'slide05-icon08.svg', label: 'Bracing' },
        { logo: 'slide05-icon09.svg', label: 'Material-specific forms' },
        { logo: 'slide05-icon10.svg', label: 'Plastic and stress-field models' },
      ],
      contents: {
        lead: 'Structural typologies, taught through classic drawing techniques.',
        items: [
          'Equilibrium & graphic-statics fundamentals',
          'Cables: funicular lines, distributed loads, prestress',
          'Arches: thrust lines, masonry on spreading supports',
          'Arch-cable hybrids; span vs cantilever',
          'Trusses: Pratt/Howe, lenticular, constant-force',
          'Beams & frames: internal forces, superposition',
          'Techniques: form/force diagrams, funicular polygon, trial funiculars, dividing systems',
        ],
      },
      resources: {
        lead: 'Interactive platform',
        items: [
          'eQUILIBRIUM platform: drawings, courses, exams',
          'Gitbook: Computational Graphic Statics',
          'compas-IGS: graphic statics in Rhino',
          'Course PDF archive: slides, exercises + solutions',
          'Library: scanned books on the history of structures, readable chapter by chapter',
        ],
      },
      submission: {
        lead: 'Hand-drawn graphic-statics exercises and calculations.',
        items: [
          'Funicular constructions: cable through 2–3 points, parabola vs catenary',
          'Masonry arch check: thrust line, min/max thrust',
          'Truss member forces via force diagram',
          'Beam/frame internal forces (superposition)',
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
    { ch: 1, weight: 'ungraded', what: 'Annotated constructions, one essay' },
    { ch: 2, weight: '10 %', what: 'Notebooks, truss module' },
    { ch: 3, weight: '10 %', what: 'Three views in code' },
    { ch: 4, weight: '10 %', what: 'Net and canopy, FD vs DR' },
    { ch: 5, weight: '5 %', what: 'Vault and pavilion' },
    { ch: 6, weight: '5 %', what: 'Assembly drawings, physical model' },
    { ch: 7, weight: '60 %', what: 'Repository, booklet, physical prototype, defence' },
  ],

};
