// Complete official worksheets and built references for History Submission.
Object.assign(window.CAS.chapters.find((chapter) => chapter.n === 1).submission, {
  "lead": "Choose a structural system for its worksheet, lecture and exercise notes.",
  "notebookResources": {
    "text": "Execute the Python exercises in the embedded Jupyter + BRG workspace using COMPAS. Start with the box example or the cable-nodes notebook.",
    "links": [
      { "label": "Open COMPAS notebook workspace", "url": "library.html#/notebook" },
      { "label": "Cable nodes notebook", "url": "library.html#/notebook/cable" },
      { "label": "Official COMPAS notebook examples", "url": "https://compas.dev/compas-jupyterlite/lab/index.html" }
    ]
  },
  "download": "history/all-worksheets.pdf",
  "systems": [
    {
      "id": "01-cables",
      "title": "Cables",
      "instruction": "Draw a cable shape and its force diagram.",
      "figure": "assets/history/figures/01-cables.webp",
      "pdf": "history/figures/01-cables.pdf",
      "worksheet": "history/worksheets/01-cables.pdf",
      "worksheetLabel": "Worksheet (PDF, German)",
      "lecture": "https://raw.githubusercontent.com/BRG-teaching/Teaching/pdf-archive/2_computational_form_finding/Equilibrium/files/L03-Cables_small_1667494910.pdf",
      "exercise": "../../2_computational_form_finding/Equilibrium/drawings/web/pdf/compendium-structural-design-I-II-en.pdf#page=15",
      "alt": "Golden Gate Bridge; Cable equilibrium; Cable form-finding. Draw a cable shape and its force diagram.",
      "worksheetIds": [
        "cables"
      ],
      "referenceId": "pavilion",
      "exerciseCount": 4,
      "diagram": {
        "image": "assets/history/diagrams/01-cables.webp",
        "title": "Graphic statics — cables",
        "width": 756,
        "height": 664
      }
    },
    {
      "id": "02-arches",
      "title": "Arches",
      "instruction": "Complete the side vaults and buttresses; draw the compression paths.",
      "figure": "assets/history/figures/02-arches.webp",
      "pdf": "history/figures/02-arches.pdf",
      "worksheet": "history/worksheets/02-arches.pdf",
      "worksheetLabel": "Worksheet (PDF)",
      "lecture": "https://raw.githubusercontent.com/BRG-teaching/Teaching/pdf-archive/2_computational_form_finding/Equilibrium/files/L04-Arches_small_1668675570.pdf",
      "exercise": "../../2_computational_form_finding/Equilibrium/drawings/web/pdf/compendium-structural-design-I-II-en.pdf#page=19",
      "alt": "Beauvais Cathedral; Vault compression paths; Side vaults and buttresses. Complete the side vaults and buttresses; draw the compression paths.",
      "worksheetIds": [
        "arches"
      ],
      "referenceId": "cathedral",
      "exerciseCount": 3,
      "diagram": {
        "image": "assets/history/diagrams/02-arches.webp",
        "title": "Graphic statics — arches",
        "width": 1587,
        "height": 862
      }
    },
    {
      "id": "03-trusses",
      "title": "Trusses",
      "instruction": "Find support reactions and construct the member forces.",
      "figure": "assets/history/figures/03-trusses.webp",
      "pdf": "history/figures/03-trusses.pdf",
      "worksheet": "history/worksheets/03-trusses.pdf",
      "worksheetLabel": "Worksheet (PDF)",
      "lecture": "https://raw.githubusercontent.com/BRG-teaching/Teaching/pdf-archive/2_computational_form_finding/Equilibrium/files/L06_Trusses_LE_1677757604.pdf",
      "exercise": "../../2_computational_form_finding/Equilibrium/drawings/web/pdf/compendium-structural-design-I-II-en.pdf#page=28",
      "alt": "Centre Pompidou; Truss and force diagram; Truss member forces. Find support reactions and construct the member forces.",
      "worksheetIds": [
        "trusses"
      ],
      "referenceId": "pompidou",
      "exerciseCount": 5,
      "diagram": {
        "image": "assets/history/diagrams/03-trusses.webp",
        "title": "Graphic statics — trusses",
        "width": 1587,
        "height": 550
      }
    },
    {
      "id": "04-beams",
      "title": "Beams",
      "instruction": "Draw the internal force flow and find support reactions.",
      "figure": "assets/history/figures/04-beams.webp",
      "pdf": "history/figures/04-beams.pdf",
      "worksheet": "history/worksheets/04-beams.pdf",
      "worksheetLabel": "Worksheet (PDF)",
      "lecture": "https://raw.githubusercontent.com/BRG-teaching/Teaching/pdf-archive/2_computational_form_finding/Equilibrium/files/L07-Beams_1678966202.pdf",
      "exercise": "../../2_computational_form_finding/Equilibrium/drawings/web/pdf/compendium-structural-design-I-II-en.pdf#page=32",
      "alt": "House Kronleinstrasse; Beam force flow; Simply supported beam. Draw the internal force flow and find support reactions.",
      "worksheetIds": [
        "beams"
      ],
      "referenceId": "house",
      "exerciseCount": 4,
      "diagram": {
        "image": "assets/history/diagrams/04-beams.webp",
        "title": "Graphic statics — beams",
        "width": 1587,
        "height": 509
      }
    },
    {
      "id": "05-frames",
      "title": "Frames",
      "instruction": "Construct a force path through the frame and close the force diagram.",
      "figure": "assets/history/figures/05-frames.webp",
      "pdf": "history/figures/05-frames.pdf",
      "worksheet": "history/worksheets/05-frames.pdf",
      "worksheetLabel": "Worksheet (PDF)",
      "lecture": "https://raw.githubusercontent.com/BRG-teaching/Teaching/pdf-archive/2_computational_form_finding/Equilibrium/files/L08_Frames_small_1680774620.pdf",
      "exercise": "../../2_computational_form_finding/Equilibrium/drawings/web/pdf/compendium-structural-design-I-II-en.pdf#page=35",
      "alt": "Tagliamento Bridge; Frame equilibrium; Three-hinged frame. Construct a force path through the frame and close the force diagram.",
      "worksheetIds": [
        "frames"
      ],
      "referenceId": "tagliamento",
      "exerciseCount": 5,
      "diagram": {
        "image": "assets/history/diagrams/05-frames.webp",
        "title": "Graphic statics — frames",
        "width": 1587,
        "height": 472
      }
    },
    {
      "id": "06-plates-slabs",
      "title": "Plates and slabs",
      "instruction": "Trace the slab loads through the beams to the supports.",
      "figure": "assets/history/figures/06-plates-slabs.webp",
      "pdf": "history/figures/06-plates-slabs.pdf",
      "worksheet": "history/worksheets/06-plates-slabs.pdf",
      "worksheetLabel": "Worksheet (PDF)",
      "lecture": "https://raw.githubusercontent.com/BRG-teaching/Teaching/pdf-archive/2_computational_form_finding/Equilibrium/files/L09_Scheiben&Platten_small_1682589079.pdf",
      "exercise": "../../2_computational_form_finding/Equilibrium/drawings/web/pdf/compendium-structural-design-I-II-en.pdf#page=36",
      "alt": "Mushroom slab; Slab force flow; Slab and supporting beams. Trace the slab loads through the beams to the supports.",
      "worksheetIds": [
        "plates"
      ],
      "referenceId": "maillart",
      "exerciseCount": 4,
      "diagram": {
        "image": "assets/history/diagrams/06-plates-slabs.webp",
        "title": "Graphic statics — plates and slabs",
        "width": 1587,
        "height": 833
      }
    },
    {
      "id": "11-shells",
      "title": "Shells and vaults",
      "instruction": "Draw the vault compression paths and find the tie forces.",
      "figure": "assets/history/figures/11-shells.webp",
      "pdf": "history/figures/11-shells.pdf",
      "worksheet": "history/worksheets/11-shells.pdf",
      "worksheetLabel": "Worksheet (PDF)",
      "lecture": "https://raw.githubusercontent.com/BRG-teaching/Teaching/pdf-archive/2_computational_form_finding/Equilibrium/files/L04-Arches_small_1668675570.pdf",
      "exercise": "https://raw.githubusercontent.com/BRG-teaching/Teaching/pdf-archive/2_computational_form_finding/Equilibrium/files/SchwartzSkriptTE_3_4.compressed_1475158034.pdf",
      "alt": "Cadyl Silo; Shell as arch strips; Tied masonry vault. Draw the vault compression paths and find the tie forces.",
      "worksheetIds": [
        "masonry"
      ],
      "referenceId": "cadyl",
      "exerciseCount": 4,
      "diagram": {
        "image": "assets/history/diagrams/11-shells.webp",
        "title": "Graphic statics — shells and vaults",
        "width": 1587,
        "height": 853
      }
    },
    {
      "id": "07-columns",
      "title": "Columns",
      "instruction": "Determine the buckling length for each support condition.",
      "figure": "assets/history/figures/07-columns.webp",
      "pdf": "history/figures/07-columns.pdf",
      "worksheet": "history/worksheets/07-columns.pdf",
      "worksheetLabel": "Worksheet (PDF)",
      "lecture": "https://raw.githubusercontent.com/BRG-teaching/Teaching/pdf-archive/2_computational_form_finding/Equilibrium/files/L09_Scheiben&Platten_small_1682589079.pdf",
      "exercise": "../../2_computational_form_finding/Equilibrium/drawings/web/pdf/compendium-structural-design-I-II-en.pdf#page=38",
      "alt": "Carre d’Art; Column force flow; Column support conditions. Determine the buckling length for each support condition.",
      "worksheetIds": [
        "bracing-columns"
      ],
      "referenceId": "carre",
      "exerciseCount": 5,
      "diagram": {
        "image": "assets/history/diagrams/07-columns.webp",
        "title": "Graphic statics — columns",
        "width": 712,
        "height": 957
      }
    },
    {
      "id": "08-bracing",
      "title": "Bracing",
      "instruction": "Transfer the horizontal load through the walls to the supports.",
      "figure": "assets/history/figures/08-bracing.webp",
      "pdf": "history/figures/08-bracing.pdf",
      "worksheet": "history/worksheets/08-bracing.pdf",
      "worksheetLabel": "Worksheet (PDF)",
      "lecture": "https://raw.githubusercontent.com/BRG-teaching/Teaching/pdf-archive/2_computational_form_finding/Equilibrium/files/L09_Scheiben&Platten_small_1682589079.pdf",
      "exercise": "../../2_computational_form_finding/Equilibrium/drawings/web/pdf/compendium-structural-design-I-II-en.pdf#page=37",
      "alt": "House R128; Bracing equilibrium; Horizontal load transfer. Transfer the horizontal load through the walls to the supports.",
      "worksheetIds": [
        "bracing-columns"
      ],
      "referenceId": "r128",
      "exerciseCount": 5,
      "diagram": {
        "image": "assets/history/diagrams/08-bracing.webp",
        "title": "Graphic statics — bracing",
        "width": 1460,
        "height": 957
      }
    },
    {
      "id": "09-material-specific",
      "title": "Material-specific forms",
      "instruction": "Compare the required cantilever depth in timber, concrete and steel.",
      "figure": "assets/history/figures/09-material-specific.webp",
      "pdf": "history/figures/09-material-specific.pdf",
      "worksheet": "history/worksheets/09-material-specific.pdf",
      "worksheetLabel": "Worksheet (PDF)",
      "lecture": "https://raw.githubusercontent.com/BRG-teaching/Teaching/pdf-archive/2_computational_form_finding/Equilibrium/files/TEIII_L3_Timber_1667582391.pdf",
      "exercise": "https://raw.githubusercontent.com/BRG-teaching/Teaching/pdf-archive/2_computational_form_finding/Equilibrium/files/SchwartzSkriptTE_3_4.compressed_1475158034.pdf",
      "alt": "Gym Vrin; Timber roof equilibrium; Cantilevers in three materials. Compare the required cantilever depth in timber, concrete and steel.",
      "worksheetIds": [
        "steel",
        "concrete",
        "timber",
        "masonry"
      ],
      "referenceId": "vrin",
      "exerciseCount": 14,
      "diagram": {
        "image": "assets/history/diagrams/09-material-specific.webp",
        "title": "Graphic statics — material-specific forms",
        "width": 1587,
        "height": 401
      }
    },
    {
      "id": "10-plastic-stress-fields",
      "title": "Plastic and stress-field models",
      "instruction": "Draw strut-and-tie force paths around the openings.",
      "figure": "assets/history/figures/10-plastic-stress-fields.webp",
      "pdf": "history/figures/10-plastic-stress-fields.pdf",
      "worksheet": "history/worksheets/10-plastic-stress-fields.pdf",
      "worksheetLabel": "Worksheet (PDF)",
      "lecture": "https://raw.githubusercontent.com/BRG-teaching/Teaching/pdf-archive/2_computational_form_finding/Equilibrium/files/20221012_Lecture2_OO_DT_OO_1665646086.pdf",
      "exercise": "../../2_computational_form_finding/Equilibrium/drawings/web/pdf/compendium-structural-design-I-II-en.pdf#page=32",
      "alt": "Palestra Doppia; Strut-and-tie and stress field; Beams with openings. Draw strut-and-tie force paths around the openings.",
      "worksheetIds": [
        "beams",
        "concrete",
        "timber"
      ],
      "referenceId": "palestra",
      "exerciseCount": 11,
      "diagram": {
        "image": "assets/history/diagrams/10-plastic-stress-fields.webp",
        "title": "Graphic statics — plastic and stress-field models",
        "width": 1064,
        "height": 957
      }
    }
  ],
  "referenceDownload": "history/all-figures.pdf",
  "worksheets": {
    "cables": {
      "id": "cables",
      "title": "SD I · EX 3 — Cables",
      "language": "German",
      "pdf": "history/official/cables.pdf",
      "tasks": [
        {
          "number": "1",
          "title": "Point and line loads",
          "instruction": "Draw the cable forms and force diagrams; compare the cable forces.",
          "pages": [
            1
          ]
        },
        {
          "number": "2",
          "title": "Cable form",
          "instruction": "Construct the cable for the four point loads and find its largest force.",
          "pages": [
            2
          ]
        },
        {
          "number": "3",
          "title": "Suspended pavilion roof",
          "instruction": "Calculate the roof loads and construct the suspended roof form.",
          "pages": [
            3
          ]
        },
        {
          "number": "Creative",
          "title": "Asymmetric suspended roof",
          "instruction": "Raise one support, redesign the roof, size its cable and propose stiffening.",
          "pages": [
            5
          ]
        }
      ],
      "pages": [
        {
          "number": 1,
          "title": "Task 1 — Point and line loads",
          "image": "assets/history/official/cables-page-01.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        },
        {
          "number": 2,
          "title": "Task 2 — Cable form",
          "image": "assets/history/official/cables-page-02.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        },
        {
          "number": 3,
          "title": "Task 3 — Suspended pavilion roof",
          "image": "assets/history/official/cables-page-03.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        },
        {
          "number": 4,
          "title": "Blank page in original PDF",
          "image": "assets/history/official/cables-page-04.webp",
          "width": 2105,
          "height": 2977,
          "blank": true
        },
        {
          "number": 5,
          "title": "Creative task — Asymmetric suspended roof",
          "image": "assets/history/official/cables-page-05.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        }
      ],
      "pageCount": 5,
      "referenceIds": [
        "pavilion"
      ]
    },
    "arches": {
      "id": "arches",
      "title": "SD I · EX 4 — Arches",
      "language": "English",
      "pdf": "history/official/arches.pdf",
      "tasks": [
        {
          "number": "1",
          "title": "Arches under specific constraints",
          "instruction": "Find arch forms that satisfy the given force and thrust constraints.",
          "pages": [
            1
          ]
        },
        {
          "number": "2",
          "title": "Support reactions in arch structures",
          "instruction": "Construct the reactions for each arrangement of adjacent arches.",
          "pages": [
            2
          ]
        },
        {
          "number": "Creative",
          "title": "Cathedral",
          "instruction": "Design side vaults and buttresses and trace compression into the ground.",
          "pages": [
            3
          ]
        }
      ],
      "pages": [
        {
          "number": 1,
          "title": "Task 1 — Arches under specific constraints",
          "image": "assets/history/official/arches-page-01.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        },
        {
          "number": 2,
          "title": "Task 2 — Support reactions in arch structures",
          "image": "assets/history/official/arches-page-02.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        },
        {
          "number": 3,
          "title": "Creative task — Cathedral",
          "image": "assets/history/official/arches-page-03.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        }
      ],
      "pageCount": 3,
      "referenceIds": [
        "cathedral"
      ]
    },
    "trusses": {
      "id": "trusses",
      "title": "SD II · EX 6 — Trusses",
      "language": "English",
      "pdf": "history/official/trusses.pdf",
      "tasks": [
        {
          "number": "1",
          "title": "Internal statical determinacy",
          "instruction": "Determine the degree of internal statical determinacy for each truss.",
          "pages": [
            1
          ]
        },
        {
          "number": "2",
          "title": "Spanning truss",
          "instruction": "Find reactions and member forces in the spanning truss.",
          "pages": [
            1
          ]
        },
        {
          "number": "3",
          "title": "Cantilevering truss",
          "instruction": "Analyse the cantilever and draw its force diagram.",
          "pages": [
            2
          ]
        },
        {
          "number": "4",
          "title": "Combined truss",
          "instruction": "Analyse the truss combining a span and a cantilever.",
          "pages": [
            2
          ]
        },
        {
          "number": "Creative",
          "title": "Greenhouse roof",
          "instruction": "Design a lightweight roof truss supported on the two given columns.",
          "pages": [
            3
          ]
        }
      ],
      "pages": [
        {
          "number": 1,
          "title": "Task 1 — Internal statical determinacy; Task 2 — Spanning truss",
          "image": "assets/history/official/trusses-page-01.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        },
        {
          "number": 2,
          "title": "Task 3 — Cantilevering truss; Task 4 — Combined truss",
          "image": "assets/history/official/trusses-page-02.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        },
        {
          "number": 3,
          "title": "Creative task — Greenhouse roof",
          "image": "assets/history/official/trusses-page-03.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        }
      ],
      "pageCount": 3,
      "referenceIds": [
        "pompidou"
      ]
    },
    "beams": {
      "id": "beams",
      "title": "SD II · EX 7 — Beams",
      "language": "English",
      "pdf": "history/official/beams.pdf",
      "tasks": [
        {
          "number": "1",
          "title": "Qualitative internal force flow",
          "instruction": "Sketch force paths for all five support arrangements, a–e.",
          "pages": [
            1,
            2
          ]
        },
        {
          "number": "2",
          "title": "Quantitative internal force flow",
          "instruction": "Find the resultants and construct force diagrams for all five beams.",
          "pages": [
            1,
            2
          ]
        },
        {
          "number": "3",
          "title": "Beams with openings",
          "instruction": "Draw force paths around the openings while staying within the material.",
          "pages": [
            2
          ]
        },
        {
          "number": "Creative",
          "title": "Open-air cinema",
          "instruction": "Design the roof beam without obstructing the viewing area.",
          "pages": [
            3
          ]
        }
      ],
      "pages": [
        {
          "number": 1,
          "title": "Task 1 — Qualitative internal force flow; Task 2 — Quantitative internal force flow",
          "image": "assets/history/official/beams-page-01.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        },
        {
          "number": 2,
          "title": "Task 1 — Qualitative internal force flow; Task 2 — Quantitative internal force flow; Task 3 — Beams with openings",
          "image": "assets/history/official/beams-page-02.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        },
        {
          "number": 3,
          "title": "Creative task — Open-air cinema",
          "image": "assets/history/official/beams-page-03.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        }
      ],
      "pageCount": 3,
      "referenceIds": [
        "house"
      ]
    },
    "frames": {
      "id": "frames",
      "title": "SD II · EX 8 — Frames",
      "language": "English",
      "pdf": "history/official/frames.pdf",
      "tasks": [
        {
          "number": "1",
          "title": "Frame corner: from arches to frames",
          "instruction": "Use thrust lines to construct equilibrium and force paths in cases a–d.",
          "pages": [
            1
          ]
        },
        {
          "number": "2",
          "title": "Internal force flow in frames",
          "instruction": "Calculate the loads and draw force paths through both concrete frames.",
          "pages": [
            2
          ]
        },
        {
          "number": "3",
          "title": "Dimensioning",
          "instruction": "Size the steel cable for the tension force found in task 2a.",
          "pages": [
            2
          ]
        },
        {
          "number": "4",
          "title": "Axial force proof",
          "instruction": "Check the given reinforcement against the tension force from task 2b.",
          "pages": [
            2
          ]
        },
        {
          "number": "Creative",
          "title": "Art gallery",
          "instruction": "Design a frame enclosing the required gallery space and construct its equilibrium.",
          "pages": [
            3
          ]
        }
      ],
      "pages": [
        {
          "number": 1,
          "title": "Task 1 — Frame corner: from arches to frames",
          "image": "assets/history/official/frames-page-01.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        },
        {
          "number": 2,
          "title": "Task 2 — Internal force flow in frames; Task 3 — Dimensioning; Task 4 — Axial force proof",
          "image": "assets/history/official/frames-page-02.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        },
        {
          "number": 3,
          "title": "Creative task — Art gallery",
          "image": "assets/history/official/frames-page-03.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        }
      ],
      "pageCount": 3,
      "referenceIds": [
        "tagliamento"
      ]
    },
    "plates": {
      "id": "plates",
      "title": "SD II · EX 9 — Plates",
      "language": "English",
      "pdf": "history/official/plates.pdf",
      "tasks": [
        {
          "number": "1",
          "title": "Tributary areas",
          "instruction": "Divide the plates into tributary areas for the given walls and columns.",
          "pages": [
            1
          ]
        },
        {
          "number": "2",
          "title": "Qualitative internal force flow",
          "instruction": "Draw internal force paths and reactions in both spatial structures.",
          "pages": [
            1
          ]
        },
        {
          "number": "3",
          "title": "Transferring vertical loads",
          "instruction": "Trace the slab loads through the supporting beam systems.",
          "pages": [
            2
          ]
        },
        {
          "number": "Creative",
          "title": "Beam grid pavilion",
          "instruction": "Design a roof beam grid using the existing walls and columns.",
          "pages": [
            3
          ]
        }
      ],
      "pages": [
        {
          "number": 1,
          "title": "Task 1 — Tributary areas; Task 2 — Qualitative internal force flow",
          "image": "assets/history/official/plates-page-01.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        },
        {
          "number": 2,
          "title": "Task 3 — Transferring vertical loads",
          "image": "assets/history/official/plates-page-02.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        },
        {
          "number": 3,
          "title": "Creative task — Beam grid pavilion",
          "image": "assets/history/official/plates-page-03.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        }
      ],
      "pageCount": 3,
      "referenceIds": [
        "maillart"
      ]
    },
    "bracing-columns": {
      "id": "bracing-columns",
      "title": "SD II · EX 10 — Bracing and horizontal forces",
      "language": "English",
      "pdf": "history/official/bracing-columns.pdf",
      "tasks": [
        {
          "number": "1",
          "title": "Bracing",
          "instruction": "Identify which wall layouts provide effective bracing.",
          "pages": [
            1
          ]
        },
        {
          "number": "2",
          "title": "Horizontal forces: qualitative",
          "instruction": "Trace horizontal forces through the slab and each bracing wall.",
          "pages": [
            1
          ]
        },
        {
          "number": "3",
          "title": "Horizontal forces: quantitative",
          "instruction": "Construct the slab and wall force diagrams for the given horizontal load.",
          "pages": [
            2
          ]
        },
        {
          "number": "4",
          "title": "Stability against buckling",
          "instruction": "Check the specified steel column against buckling and discuss prevention.",
          "pages": [
            3
          ]
        },
        {
          "number": "5",
          "title": "Redesigning the first floor",
          "instruction": "Place bracing walls and construct force paths for both horizontal load cases.",
          "pages": [
            4
          ]
        }
      ],
      "pages": [
        {
          "number": 1,
          "title": "Task 1 — Bracing; Task 2 — Horizontal forces: qualitative",
          "image": "assets/history/official/bracing-columns-page-01.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        },
        {
          "number": 2,
          "title": "Task 3 — Horizontal forces: quantitative",
          "image": "assets/history/official/bracing-columns-page-02.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        },
        {
          "number": 3,
          "title": "Task 4 — Stability against buckling",
          "image": "assets/history/official/bracing-columns-page-03.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        },
        {
          "number": 4,
          "title": "Task 5 — Redesigning the first floor",
          "image": "assets/history/official/bracing-columns-page-04.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        }
      ],
      "pageCount": 4,
      "referenceIds": [
        "r128",
        "carre"
      ]
    },
    "steel": {
      "id": "steel",
      "title": "SD III · EX 1 — Steel",
      "language": "English",
      "pdf": "history/official/steel.pdf",
      "tasks": [
        {
          "number": "1",
          "title": "Vertical loads: design variation 1",
          "instruction": "Analyse the three-dimensional cantilevering truss and its force diagrams.",
          "pages": [
            2
          ]
        },
        {
          "number": "2",
          "title": "Vertical loads: design variation 2",
          "instruction": "Analyse the alternative steel truss and compare its force flow.",
          "pages": [
            3
          ]
        },
        {
          "number": "3",
          "title": "Horizontal forces",
          "instruction": "Find force paths and bracing for horizontal loads in the lower and upper slabs.",
          "pages": [
            4
          ]
        }
      ],
      "pages": [
        {
          "number": 1,
          "title": "Introduction and design brief",
          "image": "assets/history/official/steel-page-01.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        },
        {
          "number": 2,
          "title": "Task 1 — Vertical loads: design variation 1",
          "image": "assets/history/official/steel-page-02.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        },
        {
          "number": 3,
          "title": "Task 2 — Vertical loads: design variation 2",
          "image": "assets/history/official/steel-page-03.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        },
        {
          "number": 4,
          "title": "Task 3 — Horizontal forces",
          "image": "assets/history/official/steel-page-04.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        }
      ],
      "pageCount": 4,
      "referenceIds": [
        "pompidou"
      ]
    },
    "concrete": {
      "id": "concrete",
      "title": "SD III · Reinforced concrete",
      "language": "English",
      "pdf": "history/official/concrete.pdf",
      "tasks": [
        {
          "number": "1",
          "title": "Vertical loads: design variation 1",
          "instruction": "Trace forces through the slab-wall system supported on six columns.",
          "pages": [
            2
          ]
        },
        {
          "number": "2",
          "title": "Vertical loads: design variation 2",
          "instruction": "Analyse the alternative system supported on three columns.",
          "pages": [
            3
          ]
        },
        {
          "number": "3",
          "title": "Horizontal forces",
          "instruction": "Evaluate horizontal stability and develop suitable force paths.",
          "pages": [
            4
          ]
        }
      ],
      "pages": [
        {
          "number": 1,
          "title": "Introduction and design brief",
          "image": "assets/history/official/concrete-page-01.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        },
        {
          "number": 2,
          "title": "Task 1 — Vertical loads: design variation 1",
          "image": "assets/history/official/concrete-page-02.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        },
        {
          "number": 3,
          "title": "Task 2 — Vertical loads: design variation 2",
          "image": "assets/history/official/concrete-page-03.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        },
        {
          "number": 4,
          "title": "Task 3 — Horizontal forces",
          "image": "assets/history/official/concrete-page-04.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        }
      ],
      "pageCount": 4,
      "referenceIds": [
        "palestra"
      ]
    },
    "timber": {
      "id": "timber",
      "title": "SD III · EX 3 — Timber",
      "language": "English",
      "pdf": "history/official/timber.pdf",
      "tasks": [
        {
          "number": "1",
          "title": "Vertical forces: design variation 1",
          "instruction": "Use arch-cable and stress-field models to analyse the glulam structure.",
          "pages": [
            2
          ]
        },
        {
          "number": "2",
          "title": "Crossed main-beam connection",
          "instruction": "Analyse both beam connection details and the effect of grain direction.",
          "pages": [
            3
          ]
        },
        {
          "number": "3",
          "title": "Vertical forces: design variation 2",
          "instruction": "Determine force flow in the spatial glulam alternative.",
          "pages": [
            4
          ]
        },
        {
          "number": "4",
          "title": "Horizontal forces",
          "instruction": "Construct bracing and force paths for the horizontal load cases.",
          "pages": [
            5
          ]
        }
      ],
      "pages": [
        {
          "number": 1,
          "title": "Introduction and design brief",
          "image": "assets/history/official/timber-page-01.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        },
        {
          "number": 2,
          "title": "Task 1 — Vertical forces: design variation 1",
          "image": "assets/history/official/timber-page-02.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        },
        {
          "number": 3,
          "title": "Task 2 — Crossed main-beam connection",
          "image": "assets/history/official/timber-page-03.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        },
        {
          "number": 4,
          "title": "Task 3 — Vertical forces: design variation 2",
          "image": "assets/history/official/timber-page-04.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        },
        {
          "number": 5,
          "title": "Task 4 — Horizontal forces",
          "image": "assets/history/official/timber-page-05.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        }
      ],
      "pageCount": 5,
      "referenceIds": [
        "vrin"
      ]
    },
    "masonry": {
      "id": "masonry",
      "title": "SD III · EX 4 — Masonry",
      "language": "English",
      "pdf": "history/official/masonry.pdf",
      "tasks": [
        {
          "number": "1",
          "title": "Vertical loads: tied vault",
          "instruction": "Find the compression and tie forces and check the supporting walls.",
          "pages": [
            2
          ]
        },
        {
          "number": "2",
          "title": "Vertical loads: buttressed vault",
          "instruction": "Determine the additional weight and buttress geometry needed for equilibrium.",
          "pages": [
            3
          ]
        },
        {
          "number": "3",
          "title": "Vertical loads: rib vault",
          "instruction": "Construct the two-way compression paths through the rib vault.",
          "pages": [
            4
          ]
        },
        {
          "number": "4",
          "title": "Horizontal forces in walls",
          "instruction": "Identify the walls that resist horizontal forces and draw their force paths.",
          "pages": [
            4
          ]
        }
      ],
      "pages": [
        {
          "number": 1,
          "title": "Introduction and design brief",
          "image": "assets/history/official/masonry-page-01.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        },
        {
          "number": 2,
          "title": "Task 1 — Vertical loads: tied vault",
          "image": "assets/history/official/masonry-page-02.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        },
        {
          "number": 3,
          "title": "Task 2 — Vertical loads: buttressed vault",
          "image": "assets/history/official/masonry-page-03.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        },
        {
          "number": 4,
          "title": "Task 3 — Vertical loads: rib vault; Task 4 — Horizontal forces in walls",
          "image": "assets/history/official/masonry-page-04.webp",
          "width": 2105,
          "height": 2977,
          "blank": false
        }
      ],
      "pageCount": 4,
      "referenceIds": [
        "cathedral",
        "cadyl"
      ]
    }
  },
  "references": {
    "pavilion": {
      "title": "Pavilhão de Portugal",
      "description": "The suspended canopy is the built project used in cable task 3 and the creative roof task.",
      "image": "assets/history/official/reference-pavilion.webp",
      "width": 1200,
      "height": 796,
      "lecture": "library.html#/b/graphic-statics-student-course/08-sd1-l03-cables-p1.md"
    },
    "cathedral": {
      "title": "Beauvais Cathedral",
      "description": "Its vaults and buttresses illustrate the compression paths explored in the cathedral task.",
      "image": "assets/history/official/reference-cathedral.webp",
      "width": 1200,
      "height": 795,
      "lecture": "library.html#/b/graphic-statics-student-course/10-sd1-l04-arches-p1.md"
    },
    "pompidou": {
      "title": "Centre Pompidou",
      "description": "The exposed steel trusses provide a built reference for member forces and truss load paths.",
      "image": "assets/history/official/reference-pompidou.webp",
      "width": 855,
      "height": 900,
      "lecture": "library.html#/b/graphic-statics-student-course/18-sd2-l06-trusses-p1.md"
    },
    "house": {
      "title": "House Krönleinstrasse",
      "description": "The exposed steel beams connect the beam exercises to load transfer in a built house.",
      "image": "assets/history/official/reference-house.webp",
      "width": 1018,
      "height": 764,
      "lecture": "library.html#/b/graphic-statics-student-course/20-sd2-l07-beams-p1.md"
    },
    "tagliamento": {
      "title": "Tagliamento Bridge",
      "description": "The frame bridge is a course example of constructing a thrust line through a frame.",
      "image": "assets/history/official/reference-tagliamento.webp",
      "width": 1200,
      "height": 900,
      "lecture": "library.html#/b/graphic-statics-student-course/22-sd2-l08-frames-p1.md"
    },
    "maillart": {
      "title": "Giesshübelstrasse warehouse",
      "description": "The mushroom columns and flat slab illustrate slab load transfer into columns.",
      "image": "assets/history/official/reference-maillart.webp",
      "width": 1200,
      "height": 795,
      "lecture": "library.html#/b/graphic-statics-student-course/24-sd2-l09-plates-columns-bracing-p1.md"
    },
    "carre": {
      "title": "Carré d’Art",
      "description": "The slender columns provide a built reference for support conditions and column stability.",
      "image": "assets/history/official/reference-carre.webp",
      "width": 766,
      "height": 387,
      "lecture": "library.html#/b/graphic-statics-student-course/25-sd2-l09-plates-columns-bracing-p2.md"
    },
    "r128": {
      "title": "House R128",
      "description": "The visible diagonal bracing illustrates how horizontal loads reach the supports.",
      "image": "assets/history/official/reference-r128.webp",
      "width": 1024,
      "height": 683,
      "lecture": "library.html#/b/graphic-statics-student-course/26-sd2-l09-plates-columns-bracing-p3.md"
    },
    "vrin": {
      "title": "Gym Vrin",
      "description": "The timber arch-cable roof illustrates the connection between material, form and force flow.",
      "image": "assets/history/official/reference-vrin.webp",
      "width": 1200,
      "height": 602,
      "lecture": "library.html#/b/graphic-statics-student-course/42-sd3-l03-timber-p3.md"
    },
    "palestra": {
      "title": "Palestra Doppia",
      "description": "The concrete box and supports provide a built reference for strut-and-tie and stress-field models.",
      "image": "assets/history/official/reference-palestra.webp",
      "width": 1200,
      "height": 686,
      "lecture": "library.html#/b/graphic-statics-student-course/61-dbaug-l02-plasticity-p3.md"
    },
    "cadyl": {
      "title": "Cadyl Silo",
      "description": "The masonry barrel vault illustrates compression paths and horizontal thrust in a shell.",
      "image": "assets/history/official/reference-cadyl.webp",
      "width": 1200,
      "height": 800,
      "lecture": "library.html#/b/graphic-statics-student-course/11-sd1-l04-arches-p2.md"
    }
  }
});
