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
    .pad {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
      gap: 6px;
      width: min(100%, 232px);
      aspect-ratio: 1;
      margin: 0 auto;
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
      transition:
        background 120ms ease,
        transform 80ms ease;
      touch-action: none;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }
    .btn:hover {
      background: var(--divider-color, rgba(127, 127, 127, 0.3));
    }
    .btn:active {
      transform: scale(0.94);
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .btn ha-icon {
      --mdc-icon-size: 30px;
    }
    .btn[data-key='DPAD_CENTER'] ha-icon {
      --mdc-icon-size: 44px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'atv-dpad': AtvDpad;
  }
}
