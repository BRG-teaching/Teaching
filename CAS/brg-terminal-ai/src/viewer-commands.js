// The session viewer's commands, written by CAS/website/tools/extract_viewer_commands.py.
export default [
 {
  "cmd": "Add Edge",
  "help": "Add Edge · connect the two selected objects in the session graph; the Graph table of the layers panel lists it",
  "example": ""
 },
 {
  "cmd": "Add Group",
  "help": "Add Group [name] · put the selection under a new group node; a click on one member then selects them all",
  "example": ""
 },
 {
  "cmd": "Arctic",
  "help": "Arctic (On Off): soft contact shading, studio lighting and outlines",
  "example": ""
 },
 {
  "cmd": "Area",
  "help": "Area · surface area of the selected meshes, BReps, NURBS surfaces and elements, or of one selected face",
  "example": ""
 },
 {
  "cmd": "Arrow",
  "help": "Arrow · Enter then click or type start and tip · Example: Arrow 0,0,0 100,0,0",
  "example": "Arrow 0,0,0 100,0,0"
 },
 {
  "cmd": "Arrowhead",
  "help": "Arrowhead: heads on the selected lines, polylines and curves · None, Start, End or Both · Example: Arrowhead End",
  "example": "Arrowhead End"
 },
 {
  "cmd": "Block With Hole",
  "help": "Block With Hole (Brep Mesh): base center, corner or length and width, height, hole radius · Example: Block With Hole 0,0,0 40 30 20 5",
  "example": "Block With Hole 0,0,0 40 30 20 5"
 },
 {
  "cmd": "BoundingBox",
  "help": "BoundingBox · create a world axis aligned box around the selection",
  "example": ""
 },
 {
  "cmd": "Box",
  "help": "Box (Brep Mesh): base center, corner or length and width, height · Example: Box 0,0,0 100 50 30",
  "example": "Box 0,0,0 100 50 30"
 },
 {
  "cmd": "Capsule",
  "help": "Capsule (Mesh): base center, radius, total height · Example: Capsule 0,0,0 5 30",
  "example": "Capsule 0,0,0 5 30"
 },
 {
  "cmd": "Clipping Plane",
  "help": "Clipping Plane: an origin, then a point on the side to cut away · 3Point · XY / YZ / ZX through a point · On / Off every cut · Flip the selected plane · Fill Hatch / Solid (default) · Example: Clipping Plane XY 0,0,1200",
  "example": "Clipping Plane XY 0,0,1200"
 },
 {
  "cmd": "Close",
  "help": "Close · joins the polyline or curve being drawn back to its first point",
  "example": ""
 },
 {
  "cmd": "Cone",
  "help": "Cone (Brep Mesh): base center, radius, height to the apex · Example: Cone 0,0,0 5 20",
  "example": "Cone 0,0,0 5 20"
 },
 {
  "cmd": "Controls",
  "help": "",
  "example": ""
 },
 {
  "cmd": "Copy",
  "help": "Copy · pick a base point, then as many target points as copies · Enter finishes · Copy 10,0,0 copies once",
  "example": ""
 },
 {
  "cmd": "Curve",
  "help": "Curve control points… · Example: Curve 0,0,0 50,100,0 100,0,0",
  "example": "Curve 0,0,0 50,100,0 100,0,0"
 },
 {
  "cmd": "Cylinder",
  "help": "Cylinder (Brep Mesh): base center, radius, height · Example: Cylinder 0,0,0 5 20",
  "example": "Cylinder 0,0,0 5 20"
 },
 {
  "cmd": "Delete",
  "help": "",
  "example": ""
 },
 {
  "cmd": "Dodecahedron",
  "help": "Dodecahedron (Brep Mesh): center, radius to the corners · Example: Dodecahedron 0,0,0 10",
  "example": "Dodecahedron 0,0,0 10"
 },
 {
  "cmd": "Edge",
  "help": "",
  "example": ""
 },
 {
  "cmd": "Element Attributes",
  "help": "Element Attributes (On Off): show or hide the objects hung under each element, such as its base plane",
  "example": ""
 },
 {
  "cmd": "Element Beam",
  "help": "Element Beam: pick lines or polylines, the axes · Width 150, Height 250 or two numbers change them · Enter creates a beam on each, mitred at its corners · Element Beam 120 200 on a selection creates at once",
  "example": ""
 },
 {
  "cmd": "Element Beam Variable",
  "help": "Element Beam Variable: pick closed sections in station order · Enter creates the beam, its axis from the first section's centre to the last's · on a selection it creates at once",
  "example": ""
 },
 {
  "cmd": "Element Block",
  "help": "Element Block: pick closed polylines, bottom then top, then hole pairs in the same order · Enter creates the block · on a selection it creates at once",
  "example": ""
 },
 {
  "cmd": "Element Column",
  "help": "Element Column: pick lines, the axes · Width 200, Depth 300 or two numbers change them · Enter creates a column on each · Element Column 200 300 on a selection creates at once",
  "example": ""
 },
 {
  "cmd": "Element Interactions",
  "help": "Element Interactions (On Off): draw or remove what other elements do to each element, its contacts, joints and cuts",
  "example": ""
 },
 {
  "cmd": "Element Plate",
  "help": "Element Plate: pick closed polylines, the outlines · Thickness 60 or a number changes it · Enter creates a plate on each · Element Plate 40 on a selection creates at once",
  "example": ""
 },
 {
  "cmd": "Element Support",
  "help": "Element Support: pick points or planes, where the supports stand · Enter creates a support on each · on a selection it creates at once",
  "example": ""
 },
 {
  "cmd": "Escape",
  "help": "",
  "example": ""
 },
 {
  "cmd": "Explode",
  "help": "Explode · a polyline into lines, a BRep into faces, a mesh into faces, a point cloud into points",
  "example": ""
 },
 {
  "cmd": "Extend",
  "help": "Extend · pick boundaries, Enter, click near curve ends · Extend Distance 5 grows ends by a length · Extend -0.2 1.2 extends a curve's domain",
  "example": ""
 },
 {
  "cmd": "Extrude",
  "help": "Extrude (Cap On Cap Off): curves, Enter, then a distance or x,y,z · Example: select curves, then Extrude 25",
  "example": "select curves, then Extrude 25"
 },
 {
  "cmd": "Face",
  "help": "",
  "example": ""
 },
 {
  "cmd": "Fit",
  "help": "Fit zooms to the selection, or the whole scene when nothing is selected",
  "example": ""
 },
 {
  "cmd": "Grid Snap",
  "help": "Grid Snap (On Off) or a spacing: a point off every object lands on the grid of the construction plane, 1000 apart at start like the ground grid's cells · Example: Grid Snap 50",
  "example": "Grid Snap 50"
 },
 {
  "cmd": "Hide",
  "help": "",
  "example": ""
 },
 {
  "cmd": "Icosahedron",
  "help": "Icosahedron (Brep Mesh): center, radius to the corners · Example: Icosahedron 0,0,0 10",
  "example": "Icosahedron 0,0,0 10"
 },
 {
  "cmd": "Layers",
  "help": "Layers (On Off All): show or hide the layer panel; All shows it with every row expanded",
  "example": ""
 },
 {
  "cmd": "Length",
  "help": "Length · total length of the selected lines, polylines and NURBS curves",
  "example": ""
 },
 {
  "cmd": "Length BoundingBox",
  "help": "Length BoundingBox · world X, Y and Z extents of the selection",
  "example": ""
 },
 {
  "cmd": "Line",
  "help": "Line · Enter then click or type endpoints · Example: Line 0,0,0 100,0,0",
  "example": "Line 0,0,0 100,0,0"
 },
 {
  "cmd": "Loft",
  "help": "Loft (Open Closed): click curves in section order, Enter lofts · Example: select curves, then Loft Closed",
  "example": "select curves, then Loft Closed"
 },
 {
  "cmd": "Measure Distance",
  "help": "Measure Distance · pick two points, snaps on · or type Measure Distance 0,0,0 100,0,0",
  "example": ""
 },
 {
  "cmd": "Move",
  "help": "Move · pick a base point, then the target point · Move 10,0,0 moves by a typed offset",
  "example": ""
 },
 {
  "cmd": "Nurbs Curve Arc",
  "help": "Nurbs Curve Arc (Center 3 Points): center, start or radius, end or angle · Example: Nurbs Curve Arc 0,0,0 10 90",
  "example": "Nurbs Curve Arc 0,0,0 10 90"
 },
 {
  "cmd": "Nurbs Curve Circle",
  "help": "Nurbs Curve Circle: center, radius · Example: Nurbs Curve Circle 0,0,0 10",
  "example": "Nurbs Curve Circle 0,0,0 10"
 },
 {
  "cmd": "Nurbs Curve Ellipse",
  "help": "Nurbs Curve Ellipse: center, end of the first axis or its radius, second radius · Example: Nurbs Curve Ellipse 0,0,0 20 10",
  "example": "Nurbs Curve Ellipse 0,0,0 20 10"
 },
 {
  "cmd": "Nurbs Curve Parabola",
  "help": "Nurbs Curve Parabola: start, end or length, apex or height · Example: Nurbs Curve Parabola 0,0,0 100 40",
  "example": "Nurbs Curve Parabola 0,0,0 100 40"
 },
 {
  "cmd": "Nurbs Surface 4 Points",
  "help": "Nurbs Surface 4 Points: four corners in order · Example: Nurbs Surface 4 Points 0,0,0 10,0,0 10,10,3 0,10,0",
  "example": "Nurbs Surface 4 Points 0,0,0 10,0,0 10,10,3 0,10,0"
 },
 {
  "cmd": "Nurbs Surface Loft",
  "help": "Nurbs Surface Loft (Smooth Straight): click curves in section order, Enter lofts",
  "example": ""
 },
 {
  "cmd": "Nurbs Surface Network",
  "help": "Nurbs Surface Network: click curves of both directions in any order, Enter builds the surface through them",
  "example": ""
 },
 {
  "cmd": "Nurbs Surface Revolve",
  "help": "Nurbs Surface Revolve: profile curves, Enter, axis start, axis end, angle · Example: Nurbs Surface Revolve 0,0,0 0,0,1 90",
  "example": "Nurbs Surface Revolve 0,0,0 0,0,1 90"
 },
 {
  "cmd": "Nurbs Surface Sweep1",
  "help": "Nurbs Surface Sweep1: the rail, then profile curves, Enter sweeps",
  "example": ""
 },
 {
  "cmd": "Nurbs Surface Sweep2",
  "help": "Nurbs Surface Sweep2: first rail, second rail, shape curves, Enter sweeps",
  "example": ""
 },
 {
  "cmd": "Object",
  "help": "",
  "example": ""
 },
 {
  "cmd": "Octahedron",
  "help": "Octahedron (Brep Mesh): center, radius to the corners · Example: Octahedron 0,0,0 10",
  "example": "Octahedron 0,0,0 10"
 },
 {
  "cmd": "Opacity",
  "help": "Opacity 0..1: how solid the faces are · 0 is x-ray, 1 solid · Example: Opacity 0.5",
  "example": "Opacity 0.5"
 },
 {
  "cmd": "Open",
  "help": "Open restores a saved .session file",
  "example": ""
 },
 {
  "cmd": "Orient 3 Points",
  "help": "Orient 3 Points · pick three reference points, then three target points · the selection moves rigidly",
  "example": ""
 },
 {
  "cmd": "Outline",
  "help": "Outline (On Off): black surface outlines",
  "example": ""
 },
 {
  "cmd": "Point",
  "help": "Point · Enter then click or type x,y,z",
  "example": ""
 },
 {
  "cmd": "Polyline",
  "help": "Polyline · click points, or choose Rectangle / Polygon · Enter finishes",
  "example": ""
 },
 {
  "cmd": "Project To Plane",
  "help": "Project To Plane: flatten the selected points, lines, polylines, curves and meshes · CPlane is the plane the view faces · XY / YZ / ZX through the origin · 3Point picks the plane · Example: Project To Plane XY",
  "example": "Project To Plane XY"
 },
 {
  "cmd": "Pyramid",
  "help": "Pyramid (Brep Mesh): base center, corner or edge length, height · Example: Pyramid 0,0,0 10 15",
  "example": "Pyramid 0,0,0 10 15"
 },
 {
  "cmd": "Quad Sphere",
  "help": "Quad Sphere (Mesh): center, radius · six patches of 8 × 8 quads · Example: Quad Sphere 0,0,0 10",
  "example": "Quad Sphere 0,0,0 10"
 },
 {
  "cmd": "Redo",
  "help": "",
  "example": ""
 },
 {
  "cmd": "Report",
  "help": "Report · download the viewer report: this run and the last failed or interrupted one",
  "example": ""
 },
 {
  "cmd": "Rotate",
  "help": "Rotate · pick the center, then type an angle or pick two reference points · Rotate z 45 turns about a world axis",
  "example": ""
 },
 {
  "cmd": "Save",
  "help": "Save downloads the complete editable scene as a .session file",
  "example": ""
 },
 {
  "cmd": "Scale",
  "help": "Scale · pick the origin, then type a factor or pick two reference points · 1D, 2D or 3D · Scale 2 scales at once",
  "example": ""
 },
 {
  "cmd": "Select All",
  "help": "Select All · selects every visible object that is not locked; an element's attributes stay out · Ctrl+A",
  "example": ""
 },
 {
  "cmd": "Select By Name",
  "help": "Select By Name text · selects visible objects whose name contains the text, any case · Example: Select By Name beam",
  "example": "Select By Name beam"
 },
 {
  "cmd": "Select Lasso",
  "help": "Select Lasso · drag a loop around objects · Shift adds · Ctrl removes · Esc cancels",
  "example": ""
 },
 {
  "cmd": "Select Small",
  "help": "Select Small length · selects visible objects whose bounding-box diagonal is shorter, in scene units · Example: Select Small 10",
  "example": "Select Small 10"
 },
 {
  "cmd": "Show",
  "help": "",
  "example": ""
 },
 {
  "cmd": "Snap",
  "help": "Snap (On Off): snapping · Snap End / Near / Mid / Center / Perp toggles one kind",
  "example": ""
 },
 {
  "cmd": "Sphere",
  "help": "Sphere (Brep Mesh): center, radius · Example: Sphere 0,0,0 10",
  "example": "Sphere 0,0,0 10"
 },
 {
  "cmd": "Split",
  "help": "Select a curve or face · Split · choose cutter curves · Enter confirms · Esc cancels",
  "example": ""
 },
 {
  "cmd": "Tetrahedron",
  "help": "Tetrahedron (Brep Mesh): center, radius to the corners · Example: Tetrahedron 0,0,0 10",
  "example": "Tetrahedron 0,0,0 10"
 },
 {
  "cmd": "Text",
  "help": "Text Hello world · then click or type the lower-left point · Height N sets the letter height",
  "example": ""
 },
 {
  "cmd": "Torus",
  "help": "Torus (Brep Mesh): center, major radius, minor radius · Example: Torus 0,0,0 20 5",
  "example": "Torus 0,0,0 20 5"
 },
 {
  "cmd": "Trim",
  "help": "Trim · pick objects, Enter, pick cutters, Enter, click the parts to remove · Esc cancels · Trim 0.2 0.8 keeps that part of a curve",
  "example": ""
 },
 {
  "cmd": "Undo",
  "help": "",
  "example": ""
 },
 {
  "cmd": "View",
  "help": "View: direction, projection, edges, outlines and display settings",
  "example": ""
 },
 {
  "cmd": "Volume",
  "help": "Volume · volume of the selected closed meshes, solid BReps and elements; open ones are refused",
  "example": ""
 },
 {
  "cmd": "Wedge",
  "help": "Wedge · three corners",
  "example": ""
 }
];
