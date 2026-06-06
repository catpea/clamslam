# Gizmo XML v0.5 Specification Draft

Gizmo XML is an XML-first language for authoring modern browser Web Components. It is not HTML, but its `<view>` may use XHTML-like DOM tags.

## Core Surfaces

```xml
<gizmo name="Node Graph" tag="fox-ve-node-graph" css="./node-graph.css">
  <about/>
  <terms/>
  <use library="gizmo/node-editor"/>
  <types/>
  <props/>
  <state/>
  <events/>
  <view/>
  <geometry/>
  <actions/>
  <interactions/>
  <effects/>
  <frames/>
  <dev/>
  <tests/>
</gizmo>
```

## New in v0.5

`<dev><probes>` is now a first-class development layer. Probes are live application-layer diagnostics that measure DOM reality and report semantic failures.

```xml
<dev>
  <probes>
    <probe name="ghost-edge-clears" select="fox-ve-node-graph" when="after-interaction" severity="error">
      const ghost = one(".fox-ve-node-graph-ghost-edge");
      if (!state.connection) {
        expect(ghost.hidden || !ghost.getAttribute("d"), "Ghost edge must be hidden.");
      }
    </probe>

    <layout-probe name="edge-start-port-center"
                  subject="edge.start"
                  relation="same-point"
                  target="edge.from.port.dot.center"
                  space="world"
                  tolerance="2"
                  severity="error"/>
  </probes>
</dev>
```

## Final Pre-Zip Language Features

### Build policy

```xml
<build mode="development" probes="keep" diagnostics="panel"/>
<build mode="production" probes="strip" diagnostics="strip"/>
```

### Diagnostics policy

```xml
<diagnostics report="panel console event" throw="never"/>
```

### Fixtures

```xml
<fixtures>
  <fixture name="basic-node-graph">
    <nodes/>
    <edges/>
    <view panX="0" panY="0" zoom="1"/>
  </fixture>
</fixtures>
```

### Library boundary

```xml
<use library="gizmo/node-editor"/>
<connect/>
```

`<connect/>` belongs in `gizmo/node-editor`, not in the universal core. This keeps the browser core small while allowing domain-level luxury tags.

## Data Kinds

Use XML-native `kind` notation:

```xml
<prop name="inputs" kind="list" of="Port"/>
<field name="connection" kind="maybe" of="Connection"/>
<field name="view" kind="record" of="Viewport"/>
```

Avoid TypeScript-looking user syntax such as `Port[]`.

Supported kinds: `text`, `number`, `boolean`, `css-color`, `choice`, `list`, `record`, `maybe`.

## DOM Binding

```xml
<span>{label}</span>
<button aria-expanded="{expanded}"/>
<div class.selected="{selected}"/>
<div style.left="{node.x}px"/>
<div style.--node-color="{color}"/>
<path svg.d="{edgePath(edge)}"/>
<fox-ve-node-card bind.inputs="{node.inputs}"/>
<div on.fox-node-port-down="port-connect"/>
<div ref="viewport"/>
```

## Luxury Interaction Tags

Core:

```xml
<drag/>
<pan/>
<zoom/>
<key/>
<tap/>
<press/>
<resize/>
<frame/>
```

Low-level escape hatch:

```xml
<pointer/>
```

Node-editor package:

```xml
<use library="gizmo/node-editor"/>
<node/>
<port/>
<edge/>
<connect/>
```
