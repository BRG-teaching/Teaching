# CAS website

A one-page Vue 3 site with the key slides of the deck. It opens on the full-screen title slide;
scrolling down leads to the contents, course map, course timeline, the seven chapters (logos,
contents, resources, submission) and the graphic statics solvers. A menu on the right side
(a button at the bottom right on phones) jumps to every section and marks where you are.

No build step. Vue is vendored in `vendor/` (v3.5.13, MIT), so the folder works as it is on
GitHub Pages or from any static server:

```bash
cd CAS && python3 -m http.server 8000   # then open http://localhost:8000/website/
```

Serve from `CAS/`, not `CAS/website/`: the page loads the logos from `../logos/` and the
photos from `../project/uploads/`.

| File | What to edit |
|---|---|
| `data.js` | All text: chapters, bullet lists, timeline steps, grading, solver table |
| `index.html` | Page structure (Vue template) |
| `style.css` | Colours and layout, same palette and Open Sans type as the deck |
| `app.js` | The small amount of logic (chapter highlight, timeline placement) |
