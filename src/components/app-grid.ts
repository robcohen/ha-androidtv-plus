import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { AndroidTVPlusApp } from '../types';
import { fireActivity } from './events';
import { appMatches } from '../app-match';

@customElement('atv-app-grid')
export class AtvAppGrid extends LitElement {
  @property({ attribute: false }) apps: AndroidTVPlusApp[] = [];
  /** Foreground app package id (`media_player` `app_id`), used to highlight the active tile. */
  @property({ attribute: false }) foreground?: string;

  protected render() {
    const anyActive = !!this.foreground && this.apps.some((app) => appMatches(app, this.foreground));
    return html`
      <div class="grid">
        ${this.apps.map((app) => {
          const active = appMatches(app, this.foreground);
          return html`
            <button
              class="tile ${active ? 'active' : ''} ${anyActive && !active ? 'dim' : ''}"
              aria-pressed=${active}
              title=${app.name ?? app.activity ?? app.service ?? 'App'}
              @click=${() => fireActivity(this, app)}
            >
              <span class="chip"><ha-icon icon=${app.icon ?? 'mdi:application'}></ha-icon></span>
              ${app.name ? html`<span class="label">${app.name}</span>` : ''}
            </button>
          `;
        })}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(54px, 1fr));
      gap: 8px;
    }
    .tile {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 10px 4px;
      border: 1px solid var(--atv-line);
      border-radius: 16px;
      cursor: pointer;
      color: var(--atv-text);
      background: var(--atv-surface-2);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        inset 0 -2px 3px -1px rgba(0, 0, 0, 0.22),
        0 2px 4px -1px rgba(0, 0, 0, 0.4);
      transition:
        background 120ms ease,
        transform 90ms ease,
        box-shadow 120ms ease;
    }
    .tile:hover {
      background: var(--atv-line);
      transform: translateY(-2px);
      box-shadow: 0 8px 18px -12px rgba(0, 0, 0, 0.6);
    }
    .tile:active {
      transform: translateY(1px) scale(0.98);
      box-shadow:
        inset 0 2px 5px rgba(0, 0, 0, 0.4),
        inset 0 -1px 0 rgba(255, 255, 255, 0.12);
    }
    .tile.dim {
      opacity: 0.5;
    }
    .tile.active {
      border-color: var(--atv-accent);
      box-shadow:
        0 0 0 2px color-mix(in srgb, var(--atv-accent) 45%, transparent),
        0 8px 18px -12px rgba(0, 0, 0, 0.6);
    }
    .tile.active .label {
      color: var(--atv-accent);
    }
    .chip {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      border-radius: 12px;
      color: var(--atv-on-accent);
      background: linear-gradient(
        145deg,
        color-mix(in srgb, var(--atv-accent) 78%, #ffffff 22%),
        var(--atv-accent)
      );
      box-shadow: 0 6px 14px -8px var(--atv-accent);
    }
    .chip ha-icon {
      --mdc-icon-size: 22px;
    }
    .label {
      font-size: 10.5px;
      font-weight: 500;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--atv-text-dim);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'atv-app-grid': AtvAppGrid;
  }
}
