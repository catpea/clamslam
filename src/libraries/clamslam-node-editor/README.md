# clamslam/clamslam-node-editor

Domain package for node-editor luxury tags.

Conceptual XML exports:

```xml
<use library="clamslam/clamslam-node-editor"/>

<node/>
<port/>
<edge/>
<connect/>
```

`<connect/>` belongs here rather than in core because port-to-port connection is domain-specific, even though it is common in node editors, visual programming tools, audio graphs, shader graphs, and effects graphs.

JavaScript prototype exports:

```js
import { defineNodeEditorElements } from './index.js';

defineNodeEditorElements();
```
