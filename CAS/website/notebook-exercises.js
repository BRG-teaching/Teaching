// The notebooks of the website, edited here. Entries with "source": "mcp-server-brg" are written by the GitHub Action
// of BRG-research/mcp-server-brg on every push: edit those notebooks there, a copy here is overwritten.
window.CAS_NOTEBOOKS = [
  {
    "id": "box",
    "file": "01-basics/01-box.ipynb",
    "title": "A COMPAS box",
    "summary": "One box, its mesh and an interactive COMPAS scene.",
    "minutes": 30,
    "section": "foundation"
  },
  {
    "id": "data",
    "file": "01-basics/02-data.ipynb",
    "title": "Data: values and COMPAS objects",
    "summary": "Python values, object properties and copies.",
    "minutes": 30,
    "section": "foundation"
  },
  {
    "id": "exchange",
    "file": "01-basics/03-json.ipynb",
    "title": "Data exchange: COMPAS JSON",
    "summary": "Save and load a box, a point and units as COMPAS JSON.",
    "minutes": 45,
    "section": "foundation"
  },
  {
    "id": "colors",
    "file": "01-basics/04-colors.ipynb",
    "title": "Data: colour by value",
    "summary": "Colour a roof mesh by face height with a colour map.",
    "minutes": 20,
    "section": "foundation"
  },
  {
    "id": "primitives",
    "file": "02-geometry/01-primitives.ipynb",
    "title": "Geometry: primitives",
    "summary": "A box, a sphere, a point and a line in one scene.",
    "minutes": 20,
    "section": "foundation"
  },
  {
    "id": "vectors",
    "file": "02-geometry/02-vectors-frames.ipynb",
    "title": "Geometry: vectors and frames",
    "summary": "Dot and cross products, frames and transformations.",
    "minutes": 60,
    "section": "foundation"
  },
  {
    "id": "transformations",
    "file": "02-geometry/03-transformations.ipynb",
    "title": "Geometry: transformations",
    "summary": "Rotate, scale, mirror, shear and project one cube.",
    "minutes": 30,
    "section": "foundation"
  },
  {
    "id": "curve-frames",
    "file": "02-geometry/04-curve-frames.ipynb",
    "title": "Geometry: frames along a curve",
    "summary": "Place boxes on the frames of a Bezier curve.",
    "minutes": 30,
    "section": "foundation"
  },
  {
    "id": "bounding-boxes",
    "file": "02-geometry/05-bounding-boxes.ipynb",
    "title": "Geometry: bounding boxes",
    "summary": "Axis-aligned and oriented boxes around a rotated point cloud.",
    "minutes": 30,
    "section": "foundation"
  },
  {
    "id": "polygons",
    "file": "02-geometry/06-polygons.ipynb",
    "title": "Geometry: polygons",
    "summary": "Regular polygons, their areas, centroids and offsets.",
    "minutes": 30,
    "section": "foundation"
  },
  {
    "id": "patterns",
    "file": "02-geometry/07-brick-pattern.ipynb",
    "title": "Algorithms: grids and brick patterns",
    "summary": "A point grid and a staggered brick wall from loops.",
    "minutes": 75,
    "section": "foundation"
  },
  {
    "id": "dual",
    "file": "02-geometry/08-dual-mesh.ipynb",
    "title": "Geometry: vault mesh and its dual",
    "summary": "Triangulate a vault surface and build its dual mesh.",
    "minutes": 30,
    "section": "foundation"
  },
  {
    "id": "blocks",
    "file": "02-geometry/09-blocks.ipynb",
    "title": "Geometry: masonry blocks",
    "summary": "Offset each dual face into a block with a flat top.",
    "minutes": 45,
    "section": "foundation"
  },
  {
    "id": "delaunay",
    "file": "02-geometry/10-delaunay-hull.ipynb",
    "title": "Geometry: Delaunay and convex hull",
    "summary": "Triangulate site points and outline their hull.",
    "minutes": 20,
    "section": "foundation"
  },
  {
    "id": "closest-points",
    "file": "02-geometry/11-closest-points.ipynb",
    "title": "Geometry: closest points",
    "summary": "Ten nearest points to a target with a KD-tree.",
    "minutes": 20,
    "section": "foundation"
  },
  {
    "id": "ribs",
    "file": "02-geometry/12-vault-ribs.ipynb",
    "title": "Geometry: slice a vault into ribs",
    "summary": "Cut a vault mesh with parallel planes into rib lines.",
    "minutes": 30,
    "section": "foundation"
  },
  {
    "id": "graph",
    "file": "03-datastructures/01-graph.ipynb",
    "title": "Data structures: a graph",
    "summary": "Three nodes, two edges, attributes and an adjacency matrix.",
    "minutes": 45,
    "section": "foundation"
  },
  {
    "id": "topology",
    "file": "03-datastructures/02-mesh.ipynb",
    "title": "Data structures: a mesh",
    "summary": "One quad, its normal and a connectivity matrix.",
    "minutes": 60,
    "section": "foundation"
  },
  {
    "id": "edge-loops",
    "file": "03-datastructures/03-edge-loops.ipynb",
    "title": "Data structures: edge loops and strips",
    "summary": "Select a row of edges and a strip of faces on a quad mesh.",
    "minutes": 20,
    "section": "foundation"
  },
  {
    "id": "shortest-path",
    "file": "03-datastructures/04-shortest-path.ipynb",
    "title": "Data structures: shortest path",
    "summary": "Connect points to their neighbours and find a route.",
    "minutes": 30,
    "section": "foundation"
  },
  {
    "id": "model",
    "file": "04-aec/01-model.ipynb",
    "title": "A COMPAS model",
    "summary": "One beam in a group, saved as COMPAS JSON.",
    "minutes": 35,
    "section": "foundation"
  },
  {
    "id": "ifc",
    "file": "04-aec/02-ifc.ipynb",
    "title": "AEC exchange: an IFC wall",
    "summary": "One IFC wall in a storey with compas_ifc, saved and loaded.",
    "minutes": 45,
    "section": "foundation"
  },
  {
    "id": "columns-slab",
    "file": "04-aec/03-columns-slab.ipynb",
    "title": "AEC: columns, slab and contacts",
    "summary": "Four columns and a slab, their contacts, a load takedown and a carbon estimate.",
    "minutes": 45,
    "section": "foundation"
  },
  {
    "id": "matrices",
    "file": "05-solvers/01-qr.ipynb",
    "title": "Solvers: matrix decomposition",
    "summary": "Intersect two lines with a QR solve.",
    "minutes": 60,
    "section": "foundation"
  },
  {
    "id": "optimization",
    "file": "05-solvers/02-optimisation.ipynb",
    "title": "Solvers: constrained optimisation",
    "summary": "Minimise box area at a fixed volume and height limit.",
    "minutes": 90,
    "section": "foundation"
  },
  {
    "id": "node-equilibrium",
    "file": "05-solvers/03-node-equilibrium.ipynb",
    "title": "Solvers: node equilibrium by iteration",
    "summary": "Move a node by its residual force until it balances.",
    "minutes": 30,
    "section": "foundation"
  },
  {
    "id": "fdm-numpy",
    "file": "05-solvers/04-force-density-numpy.ipynb",
    "title": "Solvers: force density with NumPy",
    "summary": "Assemble and solve the force density equations by hand.",
    "minutes": 45,
    "section": "foundation"
  },
  {
    "id": "fdm-linkwitz",
    "file": "05-solvers/05-force-density-linkwitz.ipynb",
    "title": "Solvers: Force Density Method",
    "summary": "Linkwitz's Chapter 6 section by section: lengths, direction cosines, force densities, branch-node matrix, Jacobian, D_N and D_F, materialization, all on one free node with four bars, then the 36-node grid.",
    "minutes": 90,
    "section": "foundation"
  },
  {
    "id": "session-viewer",
    "file": "05-solvers/06-session-viewer.ipynb",
    "title": "Solvers: Session Viewer",
    "summary": "Solve a force-density net with NumPy and display nodes and force-scaled edges with session_viewer.",
    "minutes": 30,
    "section": "foundation"
  },
  {
    "id": "ags",
    "file": "06-structures/01-ags.ipynb",
    "title": "Graphic statics: compas_ags",
    "summary": "Form and force diagrams of a loaded triangle frame.",
    "minutes": 45,
    "section": "extension"
  },
  {
    "id": "cable",
    "file": "06-structures/02-fd.ipynb",
    "title": "Force density: compas_fd",
    "summary": "A loaded cable net found with force densities.",
    "minutes": 45,
    "section": "extension"
  },
  {
    "id": "dr",
    "file": "06-structures/03-dr.ipynb",
    "title": "Dynamic relaxation: compas_dr",
    "summary": "The same cable net solved with dynamic relaxation.",
    "minutes": 45,
    "section": "extension"
  },
  {
    "id": "tna",
    "file": "06-structures/04-tna.ipynb",
    "title": "Thrust network analysis: compas_tna",
    "summary": "Form and force diagrams of a compression vault.",
    "minutes": 60,
    "section": "extension"
  },
  {
    "id": "funicular",
    "file": "06-structures/05-funicular-arch.ipynb",
    "title": "Graphic statics: funicular arch",
    "summary": "Build an arch from a load line, a pole and its rays.",
    "minutes": 45,
    "section": "extension"
  },
  {
    "id": "masonry-arch",
    "file": "06-structures/06-masonry-arch.ipynb",
    "title": "Masonry arch: blocks and interfaces",
    "summary": "Generate arch blocks and their contact interfaces.",
    "minutes": 30,
    "section": "extension"
  },
  {
    "id": "arch-stability",
    "file": "06-structures/07-arch-stability.ipynb",
    "title": "Masonry arch: stability",
    "summary": "Rigid-block equilibrium with friction solved as a linear program.",
    "minutes": 60,
    "section": "extension"
  },
  {
    "id": "fd-answers-01-forces",
    "file": "fd/answers_01_forces.ipynb",
    "title": "Answers 01 Forces (exercises)",
    "summary": "mcp_brg_fd_exercises",
    "section": "extension",
    "source": "mcp-server-brg"
  },
  {
    "id": "fd-answers-02-force-densities",
    "file": "fd/answers_02_force_densities.ipynb",
    "title": "Answers 02 Force densities (exercises)",
    "summary": "mcp_brg_fd_exercises",
    "section": "extension",
    "source": "mcp-server-brg"
  },
  {
    "id": "fd-answers-03-grid-matrices",
    "file": "fd/answers_03_grid_matrices.ipynb",
    "title": "Answers 03 Grid matrices (exercises)",
    "summary": "mcp_brg_fd_exercises",
    "section": "extension",
    "source": "mcp-server-brg"
  },
  {
    "id": "fd-answers-04-grid-variations",
    "file": "fd/answers_04_grid_variations.ipynb",
    "title": "Answers 04 Grid variations (exercises)",
    "summary": "mcp_brg_fd_exercises",
    "section": "extension",
    "source": "mcp-server-brg"
  },
  {
    "id": "fd-exercise-01-forces",
    "file": "fd/exercise_01_forces.ipynb",
    "title": "Exercise 01 Forces (exercises)",
    "summary": "mcp_brg_fd_exercises",
    "section": "extension",
    "source": "mcp-server-brg"
  },
  {
    "id": "fd-exercise-02-force-densities",
    "file": "fd/exercise_02_force_densities.ipynb",
    "title": "Exercise 02 Force densities (exercises)",
    "summary": "mcp_brg_fd_exercises",
    "section": "extension",
    "source": "mcp-server-brg"
  },
  {
    "id": "fd-exercise-03-grid-matrices",
    "file": "fd/exercise_03_grid_matrices.ipynb",
    "title": "Exercise 03 Grid matrices (exercises)",
    "summary": "mcp_brg_fd_exercises",
    "section": "extension",
    "source": "mcp-server-brg"
  },
  {
    "id": "fd-exercise-04-grid-variations",
    "file": "fd/exercise_04_grid_variations.ipynb",
    "title": "Exercise 04 Grid variations (exercises)",
    "summary": "mcp_brg_fd_exercises",
    "section": "extension",
    "source": "mcp-server-brg"
  },
  {
    "id": "fd-extension-01-geometric-constraints",
    "file": "fd/extension_01_geometric_constraints.ipynb",
    "title": "Extension 01 Geometric constraints (extensions)",
    "summary": "mcp_brg_fd_extensions",
    "section": "extension",
    "source": "mcp-server-brg"
  },
  {
    "id": "fd-extension-02-compression-and-tensegrity",
    "file": "fd/extension_02_compression_and_tensegrity.ipynb",
    "title": "Extension 02 Compression and tensegrity (extensions)",
    "summary": "mcp_brg_fd_extensions",
    "section": "extension",
    "source": "mcp-server-brg"
  },
  {
    "id": "fd-extension-03-minimal-surfaces",
    "file": "fd/extension_03_minimal_surfaces.ipynb",
    "title": "Extension 03 Minimal surfaces (extensions)",
    "summary": "mcp_brg_fd_extensions",
    "section": "extension",
    "source": "mcp-server-brg"
  },
  {
    "id": "fd-extension-04-inflatable-structures",
    "file": "fd/extension_04_inflatable_structures.ipynb",
    "title": "Extension 04 Inflatable structures (extensions)",
    "summary": "mcp_brg_fd_extensions",
    "section": "extension",
    "source": "mcp-server-brg"
  },
  {
    "id": "fd-extension-05-differentiable-optimisation",
    "file": "fd/extension_05_differentiable_optimisation.ipynb",
    "title": "Extension 05 Differentiable optimisation (extensions)",
    "summary": "mcp_brg_fd_extensions",
    "section": "extension",
    "source": "mcp-server-brg"
  },
  {
    "id": "fd-extension-06-inverse-form-finding",
    "file": "fd/extension_06_inverse_form_finding.ipynb",
    "title": "Extension 06 Inverse form finding (extensions)",
    "summary": "mcp_brg_fd_extensions",
    "section": "extension",
    "source": "mcp-server-brg"
  }
];
