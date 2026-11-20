# Session Viewer on Teaching

Static Rust/WebAssembly and WGSL viewer for Session kernel scenes and protobuf presentations. No server, browser-side Python, or external renderer is needed to play the published files.

## Open

- [Linkwitz: Force density method](https://brg-teaching.github.io/Teaching/CAS/website/session-viewer/?presentation=force-density/presentation.yaml) — 36 protobuf reveals, with a closed first-slide force polygon. Free nodes, solution annotations, and positive presentation-matrix cells are pink (`#dc4b8d`).
- [Create one slide](https://brg-teaching.github.io/Teaching/CAS/website/session-viewer/?presentation=one-slide/presentation.yaml) — one protobuf session with an animated matrix multiplication and pink positive cells.
- [One-slide authoring guide](../session-viewer-guide/one-slide.md) — complete Python source, export layout, local server, and publication instructions.
- [Session Viewer integration guide](../session-viewer-guide/00-start-here.md) — notebook embedding and debugging.

Use Left Arrow and Right Arrow to navigate. Orbit and zoom the left 3D region of the force-density deck with the mouse; its equations remain in slide space.

## Force-density repair

The first slide projects force vectors with the 3D camera's orthographic axes. Its local/slide-space morph travels without shortening the arrow, then turns and scales into place with arrowhead clearance. The completion path restores the authored final transform. Browser checks compare actual rendered endpoints with projected cables, require direction alignment of at least `0.999`, and check closure and on-canvas trajectories.

Text-and-matrix-only presentations also start their effects without waiting for a nonexistent geometry frame. Geometry-bearing topics retain that startup wait.

## Files and compatibility

`index.html` imports the matching hashed JavaScript/WASM runtime. Keep `bridge.js` and its script tag for ordinary notebook scenes, along with the fonts, snippets, diagnostics, and compatible `session_py` wheel.

`force-density/presentation.yaml` and `one-slide/presentation.yaml` each resolve their own `steps/` directory. There are exactly 36 referenced force-density protobufs and one referenced one-slide protobuf. Do not copy an extra `generated` directory into these URLs.

The Python source and full authoring documentation live in `session/session_viewer/examples/linkwitz/` in the Session workspace; `one_slide.py` is also included beside the Teaching guide for convenience. Teaching contains the deployable runtime and protobuf artifacts, not a second renderer.

## Book recovery

The main library mirrors Linkwitz's Chapter 6 from the existing `force-density-linkwitz` R2 folder. `../tools/mirror_books.py` restores its catalogue entry when the upstream map omits it. See [the library](https://brg-teaching.github.io/Teaching/CAS/website/library.html#/b/force-density-linkwitz); course-password access may be required.

The [book-concept review](../session-viewer-guide/book-review.md) records all 36 completed slide reviews and separate review prompts. Every slide had its own read-only review agent. Its content recommendations are not silently applied to the published deck.
