# Step 2: Prepare the viewer assets

The integration is already present in [`CAS/website/session-viewer/`](../session-viewer/). A new notebook can use these files directly; no Rust or WASM rebuild is needed.

## Required files

```text
CAS/website/session-viewer/
├── index.html
├── bridge.js
├── diagnostics.js
├── session_viewer-b6cfe03c21f32e16.js
├── session_viewer-b6cfe03c21f32e16_bg.wasm
├── session_py-0.260.0-py3-none-any.whl
├── snippets/
└── text/
```

The hashed JavaScript and WASM names must match the import in [`index.html`](../session-viewer/index.html). The `snippets/` and `text/` directories contain viewer dependencies and licensed fonts; keep them with the application.

## The two halves must match

There are two related artifacts:

- The **Python wheel** provides `Session`, geometry classes, protobuf serialization, `show()`, and `supports_webgpu()`.
- The **static viewer** deserializes that protobuf and renders it.

When refreshing either half, use artifacts from the same compatible version of the Session project. Copy the current static `session_viewer/dist/` output and the newly built `session_py` wheel into `CAS/website/session-viewer/`. Update the wheel URL in every notebook that uses it.

Do not copy only a newer WASM build while retaining an incompatible wheel: scene deserialization can fail even when all notebook cells execute.

## The public wheel URL

The notebooks install the wheel directly from GitHub Pages:

```python
%pip install -q https://brg-teaching.github.io/Teaching/CAS/website/session-viewer/session_py-0.260.0-py3-none-any.whl
```

Keep this URL HTTPS. Browsers block active mixed content when an HTTPS notebook tries to load an insecure viewer or package.

## Where to edit

Edit source under `CAS/website/`. The deployment build copies it to `docs/CAS/website/`, but `docs/` is generated and must not be edited or committed.

Next: [Write the notebook](03-notebook.md).
