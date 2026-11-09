# Step 6: Troubleshooting

## `NameError`: a class is not defined

Example:

```text
NameError: name 'Mesh' is not defined
```

Run the import cell before the failing cell, or use **Run → Run All Cells**. Restarting the kernel clears imports; it does not fix skipped cells.

## The cell runs but no iframe appears

Use an explicit display call:

```python
display(show(session, height=420))
```

This is required when `show()` is called inside an `if` block rather than returned as the cell's final expression.

## `await` produces a syntax error

Keep `await supports_webgpu()` at the notebook cell's top level. Do not place it in an ordinary synchronous function.

## The iframe reports that WebGPU is unavailable

Use a WebGPU-enabled browser over HTTPS or localhost. The notebook's `else` branch should display the COMPAS viewer instead. Do not hide the fallback by leaving `viewer.show()` out of that branch.

## The iframe exists but the scene cannot be decoded

Check that the `session_py` wheel and static viewer artifacts come from compatible versions. If the protobuf or Session API changed, refresh the wheel, JavaScript, WASM, snippets, and index imports together.

## The wheel does not install

Open the wheel URL directly and check for HTTP 404. Confirm that the wheel exists in `CAS/website/session-viewer/` and that the filename in the `%pip install` cell matches exactly.

## The new notebook is missing or an old version opens

Bump `contentsStorageName` in `CAS/jupyter/jupyter-lite.json`, rebuild JupyterLite, and use the new deployment's versioned URL. Existing browser tabs must be reloaded to load new outer-page JavaScript.

## The viewer is black or absent in only one browser

Check the browser console and the nested `/session-viewer/` iframe separately from the outer Jupyter iframe. Verify that notebook CSS does not hide the output iframe or canvas. Then check `await supports_webgpu()` and exercise the fallback rather than restarting a nonexistent Jupyter server.

## Presentation decks raise `NotImplementedError`

This is expected in the browser-only integration. A single `Session` works in JupyterLite. For presentation playback, use ordinary local Python and `serve(deck, ...)`, or host the exported protobuf deck as static files; see [Create one presentation slide](one-slide.md).

## A useful diagnostic sequence

```python
print(await supports_webgpu())
print(len(session.lookup))
display(show(session, height=420))
```

The first line checks rendering support, the second confirms that the session contains objects, and the third tests the complete iframe path. Inspect any exception in the cell before changing package versions.
