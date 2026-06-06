# SKILL: Convert Complex Web Components to Clam Slam

Use this skill when converting a complex JavaScript Web Component into Clam Slam.

## Goal

Convert imperative custom element code into XML surfaces that a human and local AI agent can understand, test, and maintain.

## Process

1. Extract public contract: tag name, attributes, properties, methods, events.
2. Extract data shapes into `<types>`, `<props>`, and `<state>`.
3. Extract DOM construction into `<view>`.
4. Replace repeated DOM construction with `each` and `key`.
5. Replace DOM property assignments with `bind.*`.
6. Replace CSS class toggles with `class.name="{expr}"`.
7. Replace SVG attributes with `svg.*`.
8. Extract pure coordinate math into `<geometry>`.
9. Extract simple handlers into `<actions>`.
10. Replace pointer plumbing with luxury tags such as `<drag/>`, `<pan/>`, `<zoom/>`, and `<connect/>`.
11. Extract DOM measurement, ResizeObserver, requestAnimationFrame, and external effects into `<effects>` and `<frames>`.
12. Add `<dev><probes>` for geometry and semantic UI invariants.
13. Add tests and fixtures.

## Rules

- Do not use TypeScript array syntax such as `Port[]` in user-facing XML. Use `<prop name="inputs" kind="list" of="Port"/>`.
- Do not manually encode pointerdown/pointermove/pointerup streams if a luxury tag fits.
- Do not mix coordinate spaces. Define `client`, `viewport`, and `world` terms when geometry is present.
- Do not hide DOM/world effects inside pure functions.
- Do not mutate forbidden state declared in `<contract>`.
- Do not omit cleanup for observers, global listeners, timers, animation frames, or pointer capture.
- Add probes for every visual bug reported by a human.

## Required Agent Accuracy Layer

For every non-trivial interaction include:

```xml
<about/>
<contract/>
<invariants/>
<agent-notes/>
<tests/>
```

For every subtle geometry dependency include:

```xml
<dev>
  <probes>
    <layout-probe/>
  </probes>
</dev>
```
