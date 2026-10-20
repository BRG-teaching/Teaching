// History Submission: course figures, tasks, worksheets and library chapters.
// Figure and worksheet provenance is recorded in history/sources.json.
Object.assign(window.CAS.chapters.find((chapter) => chapter.n === 1).submission, {
  "lead": "Hand-drawn graphic statics. Choose a structural system to open its exercise and course links.",
  "download": "history/all-figures.pdf",
  "systems": [
    {
      "id": "01-cables",
      "title": "Cables",
      "instruction": "Draw a cable shape and its force diagram.",
      "figure": "history/figures/01-cables.webp",
      "pdf": "history/figures/01-cables.pdf",
      "worksheet": "history/worksheets/01-cables.pdf",
      "worksheetLabel": "Worksheet (PDF, German)",
      "lecture": "library.html#/b/graphic-statics-student-course/08-sd1-l03-cables-p1.md",
      "exercise": "library.html#/b/graphic-statics-student-course/15-sd1-ex03-05-cables-arches-arch-cable.md",
      "alt": "Golden Gate Bridge; Cable equilibrium; Cable form-finding. Draw a cable shape and its force diagram."
    },
    {
      "id": "02-arches",
      "title": "Arches",
      "instruction": "Complete the side vaults and buttresses; draw the compression paths.",
      "figure": "history/figures/02-arches.webp",
      "pdf": "history/figures/02-arches.pdf",
      "worksheet": "history/worksheets/02-arches.pdf",
      "worksheetLabel": "Worksheet (PDF)",
      "lecture": "library.html#/b/graphic-statics-student-course/10-sd1-l04-arches-p1.md",
      "exercise": "library.html#/b/graphic-statics-student-course/15-sd1-ex03-05-cables-arches-arch-cable.md",
      "alt": "Beauvais Cathedral; Vault compression paths; Side vaults and buttresses. Complete the side vaults and buttresses; draw the compression paths."
    },
    {
      "id": "03-trusses",
      "title": "Trusses",
      "instruction": "Find support reactions and construct the member forces.",
      "figure": "history/figures/03-trusses.webp",
      "pdf": "history/figures/03-trusses.pdf",
      "worksheet": "history/worksheets/03-trusses.pdf",
      "worksheetLabel": "Worksheet (PDF)",
      "lecture": "library.html#/b/graphic-statics-student-course/18-sd2-l06-trusses-p1.md",
      "exercise": "library.html#/b/graphic-statics-student-course/27-sd2-ex06-10-trusses-beams-frames-plates-columns.md",
      "alt": "Centre Pompidou; Truss and force diagram; Truss member forces. Find support reactions and construct the member forces."
    },
    {
      "id": "04-beams",
      "title": "Beams",
      "instruction": "Draw the internal force flow and find support reactions.",
      "figure": "history/figures/04-beams.webp",
      "pdf": "history/figures/04-beams.pdf",
      "worksheet": "history/worksheets/04-beams.pdf",
      "worksheetLabel": "Worksheet (PDF)",
      "lecture": "library.html#/b/graphic-statics-student-course/21-sd2-l07-beams-p2.md",
      "exercise": "library.html#/b/graphic-statics-student-course/27-sd2-ex06-10-trusses-beams-frames-plates-columns.md",
      "alt": "House Kronleinstrasse; Beam force flow; Simply supported beam. Draw the internal force flow and find support reactions."
    },
    {
      "id": "05-frames",
      "title": "Frames",
      "instruction": "Construct a force path through the frame and close the force diagram.",
      "figure": "history/figures/05-frames.webp",
      "pdf": "history/figures/05-frames.pdf",
      "worksheet": "history/worksheets/05-frames.pdf",
      "worksheetLabel": "Worksheet (PDF)",
      "lecture": "library.html#/b/graphic-statics-student-course/22-sd2-l08-frames-p1.md",
      "exercise": "library.html#/b/graphic-statics-student-course/27-sd2-ex06-10-trusses-beams-frames-plates-columns.md",
      "alt": "Tagliamento Bridge; Frame equilibrium; Three-hinged frame. Construct a force path through the frame and close the force diagram."
    },
    {
      "id": "06-plates-slabs",
      "title": "Plates and slabs",
      "instruction": "Trace the slab loads through the beams to the supports.",
      "figure": "history/figures/06-plates-slabs.webp",
      "pdf": "history/figures/06-plates-slabs.pdf",
      "worksheet": "history/worksheets/06-plates-slabs.pdf",
      "worksheetLabel": "Worksheet (PDF)",
      "lecture": "library.html#/b/graphic-statics-student-course/24-sd2-l09-plates-columns-bracing-p1.md",
      "exercise": "library.html#/b/graphic-statics-student-course/27-sd2-ex06-10-trusses-beams-frames-plates-columns.md",
      "alt": "Mushroom slab; Slab force flow; Slab and supporting beams. Trace the slab loads through the beams to the supports."
    },
    {
      "id": "11-shells",
      "title": "Shells and vaults",
      "instruction": "Draw the vault compression paths and find the tie forces.",
      "figure": "history/figures/11-shells.webp",
      "pdf": "history/figures/11-shells.pdf",
      "worksheet": "history/worksheets/11-shells.pdf",
      "worksheetLabel": "Worksheet (PDF)",
      "lecture": "library.html#/b/graphic-statics-student-course/11-sd1-l04-arches-p2.md",
      "exercise": "library.html#/b/graphic-statics-student-course/55-sd3-ex04-05-masonry-construction-details.md",
      "alt": "Cadyl Silo; Shell as arch strips; Tied masonry vault. Draw the vault compression paths and find the tie forces."
    },
    {
      "id": "07-columns",
      "title": "Columns",
      "instruction": "Determine the buckling length for each support condition.",
      "figure": "history/figures/07-columns.webp",
      "pdf": "history/figures/07-columns.pdf",
      "worksheet": "history/worksheets/07-columns.pdf",
      "worksheetLabel": "Worksheet (PDF)",
      "lecture": "library.html#/b/graphic-statics-student-course/25-sd2-l09-plates-columns-bracing-p2.md",
      "exercise": "library.html#/b/graphic-statics-student-course/27-sd2-ex06-10-trusses-beams-frames-plates-columns.md",
      "alt": "Carre d’Art; Column force flow; Column support conditions. Determine the buckling length for each support condition."
    },
    {
      "id": "08-bracing",
      "title": "Bracing",
      "instruction": "Transfer the horizontal load through the walls to the supports.",
      "figure": "history/figures/08-bracing.webp",
      "pdf": "history/figures/08-bracing.pdf",
      "worksheet": "history/worksheets/08-bracing.pdf",
      "worksheetLabel": "Worksheet (PDF)",
      "lecture": "library.html#/b/graphic-statics-student-course/26-sd2-l09-plates-columns-bracing-p3.md",
      "exercise": "library.html#/b/graphic-statics-student-course/27-sd2-ex06-10-trusses-beams-frames-plates-columns.md",
      "alt": "House R128; Bracing equilibrium; Horizontal load transfer. Transfer the horizontal load through the walls to the supports."
    },
    {
      "id": "09-material-specific",
      "title": "Material-specific forms",
      "instruction": "Compare the required cantilever depth in timber, concrete and steel.",
      "figure": "history/figures/09-material-specific.webp",
      "pdf": "history/figures/09-material-specific.pdf",
      "worksheet": "history/worksheets/09-material-specific.pdf",
      "worksheetLabel": "Worksheet (PDF)",
      "lecture": "library.html#/b/graphic-statics-student-course/42-sd3-l03-timber-p3.md",
      "exercise": "library.html#/b/graphic-statics-student-course/54-sd3-ex01-03-steel-concrete-timber.md",
      "alt": "Gym Vrin; Timber roof equilibrium; Cantilevers in three materials. Compare the required cantilever depth in timber, concrete and steel."
    },
    {
      "id": "10-plastic-stress-fields",
      "title": "Plastic and stress-field models",
      "instruction": "Draw strut-and-tie force paths around the openings.",
      "figure": "history/figures/10-plastic-stress-fields.webp",
      "pdf": "history/figures/10-plastic-stress-fields.pdf",
      "worksheet": "history/worksheets/10-plastic-stress-fields.pdf",
      "worksheetLabel": "Worksheet (PDF)",
      "lecture": "library.html#/b/graphic-statics-student-course/61-dbaug-l02-plasticity-p3.md",
      "exercise": "library.html#/b/graphic-statics-student-course/27-sd2-ex06-10-trusses-beams-frames-plates-columns.md",
      "alt": "Palestra Doppia; Strut-and-tie and stress field; Beams with openings. Draw strut-and-tie force paths around the openings."
    }
  ]
});
