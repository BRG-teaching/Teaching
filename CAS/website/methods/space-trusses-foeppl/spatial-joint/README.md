# Spatial joint equilibrium — skew force quadrilateral

**Book:** August Föppl, *Das Fachwerk im Raume* / *The Space Truss*, 1892  
**Source:** Part I, Chapter 5, §§20–25, especially §23 and Figs. 2/2a on printed p. 36.

This is a manually reconstructed numerical example, not an implementation of Thrust Network Analysis (TNA), not a compression-only form-finding method, and not a recovery of numerical values from the historical drawing. Föppl supplies topology and construction rules but no unique coordinates or force scale for this figure.

## Method

At a joint with three non-coplanar bars, Föppl constructs one auxiliary plane through bars `a` and `b` and another through bar `c` and external force `P`. The resultants of `A, B` and of `C, P` must lie on the intersection of these planes. Two triangles sharing this resultant form the skew force quadrilateral in elevation and plan.

The script uses an explicit convention:

- unit bar directions point away from the joint;
- `P` is the external load applied to the joint;
- tension is positive and compression negative;
- equilibrium is `A a + B b + C c + P = 0`.

It computes the auxiliary-plane intersection, resultants, signed forces, closed 3D polygon, and two projections. NumPy solves the equilibrium independently. An SVD/nullspace computation provides another algebraic check.

The second example builds a simple space truss with two free joints and six bars, following the simple-truss idea of §13. A global equilibrium-matrix solution is compared with the joint-by-joint solutions. A separate example demonstrates the zero-force rule of §24: when three bars lie in one plane and the load also lies in that plane, the fourth out-of-plane bar carries no force.

## Files

- `spatial_joint.py` — numerical reconstruction, COMPAS scene, projections, diagram, and embedded checks.
- `foeppl_presentation.py` — authors twelve step-by-step slides in the Session Viewer Force-Density style.
- `../../session-viewer/methods/space-trusses-foeppl/presentation.yaml` and `steps/*.pb` — the playable desktop deck served by the existing Teaching viewer.
- `../../session-viewer/methods/space-trusses-foeppl/mobile/presentation.yaml` and `mobile/steps/*.pb` — the portrait deck selected for narrow screens.
- `method-diagram.svg` and `method-diagram.png` — the simplified geometric reconstruction.
- `thumbnail.webp` — the library-card image derived from that diagram.
- `projections.svg` and `projections.png` — elevation and plan of the skew force quadrilateral.
- `method.json` — library-card and presentation metadata.

## Numerical template

The example was developed with NumPy, COMPAS 2.15.1, compas_viewer 2.0.2, Matplotlib, and Pillow. It does not require `compas_tna`.

```bash
python spatial_joint.py
python spatial_joint.py --interactive
```

The first command runs all checks and writes the COMPAS captures, projections, and simplified diagram. The second also opens the interactive COMPAS viewer. For the COMPAS captures, use the normal desktop Qt renderer: on this machine `QT_QPA_PLATFORM=offscreen` returns an empty framebuffer.

## Interactive presentation

`foeppl_presentation.py` reuses the numerical example and imports `session_py` from the matching wheel bundled in `CAS/website/session-viewer/`. Its protobuf output requires no Rust/WASM rebuild and no external upload. Install the wheel's `protobuf>=7.35.1,<8` requirement in the local Python environment, then run:

```bash
python foeppl_presentation.py
```

The twelve step-by-step slides follow the same pedagogical progression as the Session Viewer Force-Density presentation: (1) spatial polygon equilibrium, (2) given anchor coordinates and unknowns, (3) bar direction cosines (§20 eq. 9), (4) pairing the four forces into two opposite resultants (§23), (5) plane $\Pi_{ab}$ and ground trace $ab$ (Fig. 2), (6) plane $\Pi_{cP}$, trace intersection $T$, and line $d = OT$ (Fig. 2), (7) first planar force triangle $(\mathbf{P}, \mathbf{F}_c, \mathbf{R}_{cP})$, (8) second planar force triangle $(\mathbf{R}_{ab}, \mathbf{F}_b, \mathbf{F}_a)$ completing the hinged skew quadrilateral (Fig. 2a), (9) Monge elevation/plan projector alignment and true 3D lengths, (10) $3\times 3$ direction-cosine matrix check, (11) sequential joint-by-joint solution of a six-bar simple space truss ($E \to D$), and (12) agreement with the $6\times 6$ global equilibrium matrix (§§20–21). `python foeppl_presentation.py --serve` opens the deck in the existing Teaching viewer on localhost. Alternatively, serve `CAS/website` with `python -m http.server 8000 --directory CAS/website` from the Teaching root and open:

```text
http://localhost:8000/methods/space-trusses-foeppl/spatial-joint/
```

Each topic contains one focused reveal. Previous/Next buttons forward the viewer's normal arrow-key navigation and display the active slide counter; drag orbits and scrolling zooms. Spatial text heights are CSS pixels. Below 760 px, `mobile/presentation.yaml` uses a full-width portrait 3D viewport with non-overlapping top and bottom equation bands, and the controls accept taps.

The shelf card opens printed page 36 of `05-chapter-05.md` in the original book reader. `useLibrary.js` inserts the interactive reconstruction and these controls immediately after `txt-fig002a.svg`, so the book's text and original figures remain in place. `index.html` redirects to that book page; the standalone presentation is also available from the Session Viewer README.

## Embedded checks

- known orthogonal force solution and zero-load solution;
- determinant and condition number of the bar-direction matrix;
- equilibrium residual and polygon closure;
- both resultants parallel to the auxiliary-plane intersection;
- independent SVD/nullspace agreement;
- superposition of independent load cases;
- elevation/plan projector alignment;
- local-versus-global simple-truss forces;
- zero-force example, coplanar-geometry rejection, and undefined auxiliary-plane rejection.

## Boundaries

The basic model assumes pin joints, axial member forces, and non-coplanar bars. It does not represent joint bending stiffness, slack-member activation, masonry envelopes, reciprocal primal/dual grids, or optimization. Those belong to other methods in the book or to later computational work and should be introduced separately rather than silently added to this example.
