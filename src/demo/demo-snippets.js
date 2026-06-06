const snippetUrls = {
  'node-drag': new URL('../language/examples/node-drag.interaction.xml', import.meta.url),
  'port-connect': new URL('../language/examples/port-connect.interaction.xml', import.meta.url),
  view: new URL('../language/examples/node-graph.view.xml', import.meta.url),
  spec: new URL('../language/examples/node-graph.gizmo.xml', import.meta.url),
  probes: new URL('../language/examples/node-graph.dev.probes.xml', import.meta.url)
};

const cache = new Map();

export async function loadSnippet(name) {
  if (cache.has(name)) return cache.get(name);
  const url = snippetUrls[name];
  if (!url) return '';
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to load snippet ${name}: ${response.status}`);
  const text = (await response.text()).trim();
  cache.set(name, text);
  return text;
}
