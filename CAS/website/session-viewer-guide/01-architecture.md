# Step 1: Understand the architecture

## Components

The integration has four parts:

1. **JupyterLite/Pyodide** runs the notebook's Python code in the browser.
2. **`session_py`** stores points, lines, colours, and widths in a `Session` and serializes that session to protobuf.
3. **An iframe** loads the static `session_viewer` application from the same website.
4. **WASM and WebGPU** render the scene on a canvas inside that iframe.

The existing COMPAS notebook viewer remains available when WebGPU is unavailable.

## Data flow

```text
Notebook cell
    |
    | Session with Point and Line objects
    v
session_py.show(session)
    |
    | session.pb_dumps() -> base64 protobuf in URL fragment
    v
IPython.display.IFrame
    |
    | /session-viewer/?scene=notebook.yaml&data=off&live=off#session=...
    v
bridge.js
    |
    | notebook.yaml manifest + notebook.pb bytes through fetch()
    v
session_viewer JavaScript + WASM
    |
    v
WebGPU canvas in the notebook cell output
```

## What runs where

| Component | Runs in | Needs a server? |
| --- | --- | --- |
| Notebook Python | Pyodide in the browser | No |
| Scene serialization | Pyodide in the browser | No |
| Static HTML, JS, WASM, fonts | GitHub Pages | Static hosting only |
| 3D rendering | Browser WebGPU | No |
| COMPAS fallback | Browser JavaScript/WebGL | No |

The URL fragment is not sent as part of the HTTP request. The scene is decoded locally by the iframe; it is not uploaded to the BRG MCP server or an AI provider.

## Ordinary Python versus JupyterLite

`session_py.viewer.show()` deliberately supports two environments:

- On **Emscripten/JupyterLite**, it returns an iframe pointing to the deployed static viewer.
- In **ordinary local Python**, it starts a loopback HTTP server with `serve()` and returns an iframe pointing to that server.

This guide concerns the first path. Do not start the local server inside JupyterLite.

Next: [Prepare the viewer assets](02-assets.md).
