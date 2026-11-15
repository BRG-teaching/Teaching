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
- `foeppl_presentation.py` — authors four slides with the Session `Presentation` API.
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

The four slides are: three bars and a load; two auxiliary planes; the skew force polygon; and a six-bar simple space truss. `python foeppl_presentation.py --serve` opens the deck in the existing Teaching viewer on localhost. Alternatively, serve `CAS/website` with `python -m http.server 8000 --directory CAS/website` from the Teaching root and open:

```text
http://localhost:8000/methods/space-trusses-foeppl/spatial-joint/
```

The deck's four topics each contain one step. Previous/Next buttons forward the viewer's normal arrow-key navigation; right-drag orbits and scrolling zooms. Spatial text heights are CSS pixels. Below 760 px, the page selects `mobile/presentation.yaml`, with shorter captions and a portrait equation layout, and the controls accept taps.

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
