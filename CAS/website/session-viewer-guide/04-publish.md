# Step 4: Publish and verify

## 4.1 Add the notebook

Place the source notebook in the appropriate directory, for example:

```text
CAS/website/notebooks/05-solvers/06-session-viewer.ipynb
```

Add a matching entry to [`CAS/website/notebook-exercises.js`](../notebook-exercises.js):

```javascript
{
  "id": "session-viewer",
  "file": "05-solvers/06-session-viewer.ipynb",
  "title": "Solvers: Session Viewer",
  "summary": "Solve a force-density net with NumPy and display it with session_viewer.",
  "minutes": 30,
  "section": "foundation"
}
```

The route becomes `#/notebook/session-viewer`. If course metadata is regenerated from its external source, make the entry there as well so it is not lost.

## 4.2 Refresh the starter-content storage

In [`CAS/jupyter/jupyter-lite.json`](../../jupyter/jupyter-lite.json), bump `contentsStorageName` when adding or changing starter notebooks. For example:

```json
"contentsStorageName": "cas-jupyter-contents-5"
```

This prevents an existing browser's Jupyter contents storage from hiding the updated starter files.

## 4.3 Build locally

From the repository root:

```bash
py tools/build_site.py
py -m jupyter lite build --lite-dir CAS/jupyter --contents ../website/notebooks --output-dir docs/CAS/website/jupyter --apps lab
```

The first command assembles `docs/`. The second builds JupyterLite into `docs/CAS/website/jupyter/`. Always keep deployment output in `docs/`; do not commit it.

A local server can then serve the deployment:

```bash
py -m http.server 8765 --directory docs
```

Open:

```text
http://127.0.0.1:8765/CAS/website/library.html#/notebook/session-viewer
```

## 4.4 Verify the actual result

At minimum:

1. Open the tutorial through its menu route, not only as a JSON file.
2. Choose **Run → Run All Cells** and wait for the kernel to become idle.
3. Confirm that no cell contains a traceback.
4. Confirm that the nested `/session-viewer/` iframe contains a visible canvas of the requested height.
5. Orbit the camera and check that the rendered image changes.
6. Resize to a mobile viewport and check that the iframe and canvas remain visible.
7. Test the COMPAS branch when WebGPU is unavailable if that behavior was changed.

For debugging, the notebook bridge can run the notebook programmatically:

```javascript
const frame = document.querySelector('.notebook-frame');
const result = await window.BRGNotebook.call(frame, 'notebook_run', { all: true });
console.log(result);
```

## 4.5 Deploy

Commit the source notebook, menu entry, and JupyterLite configuration, then push `main`. The [Pages workflow](../../../.github/workflows/pages.yml) rebuilds the site and adds commit-specific query strings to website and notebook assets.

After deployment, repeat **Run All Cells** on the public URL. A successful local build alone does not verify the deployed wheel URL, iframe, or WASM assets.

Next: [Inspect the internals](05-internals.md).
