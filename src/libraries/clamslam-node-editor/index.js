import { FoxVeNodeCard, defineNodeCard } from './node-card.js';
import { FoxVeNodeGraph, defineNodeGraph } from './node-graph.js';

export { FoxVeNodeCard, defineNodeCard } from './node-card.js';
export { FoxVeNodeGraph, defineNodeGraph } from './node-graph.js';

function defineNodeEditorElements() {
  defineNodeCard();
  defineNodeGraph();
}

export {defineNodeEditorElements}
