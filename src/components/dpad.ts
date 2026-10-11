import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { KEYS } from '../const';
import { fireKey } from './events';
import { HoldRepeater } from './hold';

@customElement('atv-dpad')
export class AtvDpad extends LitElement {
  private readonly repeater = new HoldRepeater(() => {
    if (this.activeKey) fireKey(this, this.activeKey);
  });

  private activeKey?: string;

  private press(key: string) {
    this.activeKey = key;
    this.repeater.start();
  }

  private release() {
    this.activeKey = undefined;
    this.repeater.stop();
  }

  private button(key: string, icon: string, label: string) {
    return html`
      <button
        class="btn"
        data-key=${key}
        aria-label=${label}
        @pointerdown=${(e: PointerEvent) => {
          e.preventDefault();
          try {
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
          } catch {
            /* pointer already gone; the key still fires */
          }
          this.press(key);
        }}
        @pointerup=${() => this.release()}
        @pointercancel=${() => this.release()}
        @pointerleave=${() => this.release()}
        @contextmenu=${(e: Event) => e.preventDefault()}
      >
        <ha-icon icon=${icon}></ha-icon>
      </button>
    `;
  }

  protected render() {
    return html`
      <div class="pad">
        <span></span>
        ${this.button(KEYS.up, 'mdi:chevron-up', 'Up')}
        <span></span>
        ${this.button(KEYS.left, 'mdi:chevron-left', 'Left')}
        ${this.button(KEYS.center, 'mdi:circle-medium', 'Select')}
        ${this.button(KEYS.right, 'mdi:chevron-right', 'Right')}
        <span></span>
        ${this.button(KEYS.down, 'mdi:chevron-down', 'Down')}
        <span></span>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    .pad {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
      gap: 4px;
      width: 244px;
      max-width: 100%;
      aspect-ratio: 1;
      margin: 0 auto;
      padding: 10px;
      border-radius: 50%;
      background: radial-gradient(circle at 50% 28%, var(--atv-surface-2), var(--atv-surface) 74%);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.07),
        inset 0 -10px 26px -14px rgba(0, 0, 0, 0.5),
        0 12px 26px -18px rgba(0, 0, 0, 0.7);
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      color: var(--atv-text-dim);
      background: transparent;
      transition:
        background 120ms ease,
        color 120ms ease,
        transform 90ms ease;
      touch-action: none;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }
    .btn:hover {
      background: var(--atv-surface-2);
      color: var(--atv-text);
    }
    .btn:active {
      background: var(--atv-accent);
      color: var(--atv-on-accent);
      transform: scale(0.9);
    }
    .btn ha-icon {
      --mdc-icon-size: 30px;
    }
    .btn[data-key='DPAD_CENTER'] {
      margin: 6px;
      color: var(--atv-on-accent);
      background: linear-gradient(
        145deg,
        color-mix(in srgb, var(--atv-accent) 78%, #ffffff 22%),
        var(--atv-accent)
      );
      box-shadow:
        0 8px 18px -10px var(--atv-accent),
        inset 0 1px 0 rgba(255, 255, 255, 0.25);
    }
    .btn[data-key='DPAD_CENTER']:hover {
      background: linear-gradient(
        145deg,
        color-mix(in srgb, var(--atv-accent) 70%, #ffffff 30%),
        var(--atv-accent)
      );
      filter: brightness(1.04);
    }
    .btn[data-key='DPAD_CENTER']:active {
      transform: scale(0.92);
    }
    .btn[data-key='DPAD_CENTER'] ha-icon {
      --mdc-icon-size: 40px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'atv-dpad': AtvDpad;
  }
}
