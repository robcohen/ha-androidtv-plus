import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { fireKey } from './events';
import { HoldRepeater } from './hold';

/**
 * A single icon button that fires its key once on press and repeats while held.
 * Used for back/home, volume and media transport controls.
 */
@customElement('atv-repeat-button')
export class AtvRepeatButton extends LitElement {
  @property({ type: String }) key = '';
  @property({ type: String }) icon = '';
  @property({ type: String }) label = '';

  private readonly repeater = new HoldRepeater(() => fireKey(this, this.key));

  private down(e: PointerEvent) {
    e.preventDefault();
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      /* pointer already gone; the key still fires */
    }
    this.repeater.start();
  }

  protected render() {
    return html`
      <button
        class="btn"
        aria-label=${this.label}
        @pointerdown=${this.down}
        @pointerup=${() => this.repeater.stop()}
        @pointercancel=${() => this.repeater.stop()}
        @pointerleave=${() => this.repeater.stop()}
        @contextmenu=${(e: Event) => e.preventDefault()}
      >
        <ha-icon icon=${this.icon}></ha-icon>
      </button>
    `;
  }

  static styles = css`
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 46px;
      height: 46px;
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
      transform: scale(0.92);
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .btn ha-icon {
      --mdc-icon-size: 24px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'atv-repeat-button': AtvRepeatButton;
  }
}
