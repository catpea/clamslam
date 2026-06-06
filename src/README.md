# src layout

This directory contains the browser module implementation of Gizmo XML v0.5.

- `core/` contains small DOM/math helpers used by the prototype runtime.
- `runtime/` contains reusable runtime support such as diagnostics and frame scheduling.
- `libraries/node-editor/` contains the node-editor package boundary. This is where `<connect/>`, `<node/>`, `<port/>`, and `<edge/>` belong conceptually.
- `demo/` contains the browser application that demonstrates the module.
- `language/examples/` contains the XML examples loaded by the demo canvas.
