# Clam Slam v0.5

![](logo.jpg)

Clam Slam is an XML-first language prototype for complex agentic UI development with modern Web Components.


This package is now arranged as a browser-first npm module instead of a one-file demo. The root `index.html` imports the demo application from `src/`, and the clamslam-node-editor implementation is split into reusable source modules.

## Run

No npm dependencies are required.

```bash
npm run demo
```

Then open either:

```text
http://localhost:8080/
http://localhost:8080/demos/node-graph/
```

Serving the directory is preferred because XML snippets are loaded from `src/language/examples/` with `fetch()`.

## Module Entry Points

```js
import { defineNodeEditorElements } from './src/libraries/clamslam-node-editor/index.js';

// or, as a package export after npm linking/publishing:
import { defineNodeEditorElements } from 'clamslam/clamslam-node-editor';
```

Primary exports:

```text
src/index.js                         package root
src/core/index.js                    utility/core helpers
src/runtime/index.js                 diagnostics and frame scheduling helpers
src/libraries/clamslam-node-editor/index.js   clamslam-node-editor Web Components and luxury-tag boundary
```

## v0.5 Highlight: Development Probes

v0.5 adds development probes:

```xml
<dev>
  <probes>
    <probe/>
    <layout-probe/>
  </probes>
</dev>
```

A probe is an application-layer diagnostic. It measures DOM reality and reports semantic UI failures, such as stale ghost edges or cables not starting at the measured center of a port dot.

## Directory Layout

```text
src/
  index.js
  core/
    dom.js
    index.js
  runtime/
    diagnostics.js
    frames.js
    index.js
  libraries/
    clamslam-node-editor/
      constants.js
      index.js
      node-card.js
      node-graph.js
  demo/
    demo-data.js
    demo-snippets.js
    node-graph-app.js
    node-graph.css
  language/
    examples/
      node-drag.interaction.xml
      port-connect.interaction.xml
      node-graph.view.xml
      node-graph.clamslam.xml
      node-graph.dev.probes.xml

demos/node-graph/
  index.html

docs/spec/
  CLAM_SLAM_XML_V0_5.md

docs/agent/
  SKILL.md

test/fixtures/
  basic-node-graph.fixture.xml
```

## Current Demo Features

- Interactive node graph
- Node drag
- Port connection with ghost edge
- Pan and zoom
- Snap-to-grid
- Readonly toggle
- Live development probes
- Probe bug injection
- Tiny behavior test runner
- XML snippets loaded from real files, not inline script blocks

## Check

```bash
npm run check
```
