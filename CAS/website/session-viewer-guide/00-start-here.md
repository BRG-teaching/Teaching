# Embed `session_viewer` in JupyterLite

This guide explains the working integration used by the CAS notebooks. It covers the Python side, the static WebGPU viewer, the browser-only data bridge, publication, and verification.

The complete working example is [`05-solvers/06-session-viewer.ipynb`](../notebooks/05-solvers/06-session-viewer.ipynb). Its public page is [Solvers: Session Viewer](https://brg-teaching.github.io/Teaching/CAS/website/library.html#/notebook/session-viewer).

## Steps

1. [Understand the architecture](01-architecture.md): how Python, the iframe, protobuf data, and WebGPU fit together.
2. [Prepare the viewer assets](02-assets.md): the static viewer files and matching `session_py` wheel.
3. [Write the notebook](03-notebook.md): install the packages, build a `Session`, and embed or fall back.
4. [Publish and verify](04-publish.md): register the tutorial, rebuild JupyterLite, and test the result.
5. [Inspect the internals](05-internals.md): follow the exact URL and fetch flow when debugging.
6. [Troubleshoot](06-troubleshooting.md): fix missing output, WebGPU, caching, and version problems.

## Short version

The notebook installs `session_py` from a wheel hosted beside the static viewer. Python creates a `Session` and calls:

```python
if await supports_webgpu():
    display(show(session, height=420))
else:
    viewer.show()
```

In JupyterLite, `show()` returns an iframe. The scene is serialized to protobuf, encoded in the iframe URL fragment, decoded by `bridge.js`, and rendered by the existing WASM/WebGPU viewer. No scene upload or running Jupyter server is involved.

## Rules for changes

- Keep source files in `CAS/website/`; never edit the generated `docs/` deployment.
- Keep the wheel and static viewer assets synchronized when either API or protobuf definitions change.
- Preserve the COMPAS fallback for browsers without WebGPU.
- Bump `contentsStorageName` whenever starter notebooks change.
- Run every notebook cell and inspect the rendered canvas before publishing.
