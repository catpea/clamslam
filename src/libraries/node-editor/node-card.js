import { escapeAttr, escapeHtml } from '../../core/dom.js';

export class FoxVeNodeCard extends HTMLElement {
  static observedAttributes = ['node-label', 'color', 'status', 'expanded', 'selected'];

  constructor() {
    super();
    this._inputs = [];
    this._outputs = [];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  get inputs() { return this._inputs; }
  set inputs(value) {
    this._inputs = Array.isArray(value) ? value.map(port => ({ ...port })) : [];
    this.render();
  }

  get outputs() { return this._outputs; }
  set outputs(value) {
    this._outputs = Array.isArray(value) ? value.map(port => ({ ...port })) : [];
    this.render();
  }

  get nodeLabel() { return this.getAttribute('node-label') || 'Node'; }
  get color() { return this.getAttribute('color') || '#0d6efd'; }
  get status() { return this.getAttribute('status') || 'ok'; }
  get expanded() { return this.hasAttribute('expanded'); }

  render() {
    this.style.setProperty('--node-color', this.color);
    this.innerHTML = `
      <div class="fox-ve-node-card-header">
        <span class="fox-ve-node-card-status" data-status="${escapeHtml(this.status)}"></span>
        <span class="fox-ve-node-card-title">${escapeHtml(this.nodeLabel)}</span>
        <button type="button" class="fox-ve-node-card-expand" aria-label="Toggle node details" aria-expanded="${this.expanded ? 'true' : 'false'}"><i aria-hidden="true">⌄</i></button>
      </div>
      <div class="fox-ve-node-card-port-grid">
        <div class="fox-ve-node-card-ports fox-ve-node-card-inputs">
          ${this._inputs.map((port, index) => this._portHtml(port, index, 'input')).join('')}
        </div>
        <div class="fox-ve-node-card-ports fox-ve-node-card-outputs">
          ${this._outputs.map((port, index) => this._portHtml(port, index, 'output')).join('')}
        </div>
      </div>
      <div class="fox-ve-node-card-details" ${this.expanded ? '' : 'hidden'}>Ready · ${escapeHtml(this.status)}</div>
    `;

    this.querySelector('.fox-ve-node-card-expand')?.addEventListener('click', event => {
      event.stopPropagation();
      this.toggleAttribute('expanded', !this.expanded);
      this.dispatchEvent(new CustomEvent('fox-node-expand', {
        bubbles: true,
        detail: { expanded: this.expanded }
      }));
    });

    this.querySelectorAll('.fox-ve-node-card-port').forEach(portEl => {
      portEl.addEventListener('pointerdown', event => {
        event.stopPropagation();
        portEl.setPointerCapture?.(event.pointerId);
        this.dispatchEvent(new CustomEvent('fox-node-port-down', {
          bubbles: true,
          composed: true,
          detail: { port: this._portDetail(portEl) }
        }));
      });
      portEl.addEventListener('pointerup', event => {
        event.stopPropagation();
        this.dispatchEvent(new CustomEvent('fox-node-port-up', {
          bubbles: true,
          composed: true,
          detail: { port: this._portDetail(portEl) }
        }));
      });
    });
  }

  _portHtml(port, index, side) {
    const id = String(port?.id ?? `${side}-${index}`);
    const label = String(port?.label ?? id);
    const type = String(port?.type ?? '');
    const core = side === 'output'
      ? `<span class="fox-ve-node-card-port-label">${escapeHtml(label)}</span><span class="fox-ve-node-card-port-dot"></span>`
      : `<span class="fox-ve-node-card-port-dot"></span><span class="fox-ve-node-card-port-label">${escapeHtml(label)}</span>`;
    return `<button type="button" class="fox-ve-node-card-port" data-port-id="${escapeAttr(id)}" data-port-side="${side}" data-port-type="${escapeAttr(type)}" aria-label="${side} ${escapeAttr(label)}">${core}</button>`;
  }

  _portDetail(portEl) {
    return {
      id: portEl.dataset.portId || '',
      label: portEl.querySelector('.fox-ve-node-card-port-label')?.textContent || portEl.dataset.portId || '',
      type: portEl.dataset.portType || '',
      side: portEl.dataset.portSide || ''
    };
  }
}

customElements.define('fox-ve-node-card', FoxVeNodeCard);


export function defineNodeCard(tag = 'fox-ve-node-card') {
  if (!customElements.get(tag)) customElements.define(tag, FoxVeNodeCard);
}
