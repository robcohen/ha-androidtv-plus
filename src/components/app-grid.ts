import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { AndroidTVPlusApp } from '../types';
import { fireActivity } from './events';

@customElement('atv-app-grid')
export class AtvAppGrid extends LitElement {
  @property({ attribute: false }) apps: AndroidTVPlusApp[] = [];

  protected render() {
    return html`
      <div class="grid">
        ${this.apps.map(
          (app) => html`
            <button class="tile" title=${app.name ?? app.activity} @click=${() => fireActivity(this, app.activity)}>
              <ha-icon icon=${app.icon ?? 'mdi:application'}></ha-icon>
              ${app.name ? html`<span class="label">${app.name}</span>` : ''}
            </button>
          `,
        )}
      </div>
    `;
  }

  static styles = css`
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));
      gap: 8px;
    }
    .tile {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 12px 4px;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
      transition:
        background 120ms ease,
        transform 80ms ease;
    }
    .tile:hover {
      background: var(--divider-color, rgba(127, 127, 127, 0.28));
    }
    .tile:active {
      transform: scale(0.96);
    }
    .tile ha-icon {
      --mdc-icon-size: 26px;
    }
    .label {
      font-size: 11px;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--secondary-text-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'atv-app-grid': AtvAppGrid;
  }
}
