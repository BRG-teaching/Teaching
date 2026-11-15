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

- `spatial_joint.py` — executable reconstruction and all embedded numerical checks.
- `viewer.png` — session-viewer presentation of the COMPAS reconstruction: bars, external force, auxiliary planes, intersection, and force polygon.
- `simple-truss.png` — session-viewer presentation of the six-bar simple truss.
- `index.yaml`, `01-spatial-joint.yaml`, `02-simple-truss.yaml`, `img/projections.png` — session-viewer deck and its image dependency; preserve this folder structure when loading it locally.
- `projections.svg` — elevation and plan of the skew force quadrilateral.
- `projections.png` — raster version used for display.
- `thumbnail.webp` — combined library thumbnail.
- `method.json` — proposed library-card metadata.

## Run

The example was developed with NumPy, COMPAS 2.15.1, compas_viewer 2.0.2, Matplotlib, and Pillow. It does not require `compas_tna`.

```bash
python spatial_joint.py
```

This runs all checks and writes the script's COMPAS scene captures and projection figures. The packaged `viewer.png`, `simple-truss.png`, and `thumbnail.webp` are separately captured session-viewer presentations of the same examples. To open the interactive COMPAS viewer after generating the script's figures:

```bash
python spatial_joint.py --interactive
```

For the script's COMPAS captures, the verified image-capture path is the normal desktop Qt renderer. On this machine `QT_QPA_PLATFORM=offscreen` returns an empty framebuffer, so it is not used for the generated images.

## Session viewer

Place the three YAML files and `img/projections.png` in `session_viewer/examples/stage/foppl-spatial-joint/`, preserving the `img/` path. Run `NO_COLOR=false trunk serve` in `session_viewer`, then open `http://127.0.0.1:8080/?stage=decks/foppl-spatial-joint/index.yaml&data=off`. Trunk may use a different port if 8080 is occupied.

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
