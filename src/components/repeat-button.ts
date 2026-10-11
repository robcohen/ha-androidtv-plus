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
  @property({ type: Boolean }) accent = false;
  @property({ type: Boolean }) small = false;
  @property({ type: Boolean, reflect: true }) stretch = false;

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
        class="btn ${this.accent ? 'accent' : ''} ${this.small ? 'small' : ''}"
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
    :host {
      display: block;
    }
    :host([stretch]) {
      flex: 1 1 0;
      min-width: 0;
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 54px;
      height: 54px;
      border: 1px solid var(--atv-line);
      border-radius: 50%;
      cursor: pointer;
      color: var(--atv-text);
      background: var(--atv-surface-2);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        inset 0 -2px 3px -1px rgba(0, 0, 0, 0.28),
        0 2px 4px -1px rgba(0, 0, 0, 0.45),
        0 8px 16px -12px rgba(0, 0, 0, 0.6);
      transition:
        background 120ms ease,
        color 120ms ease,
        border-color 120ms ease,
        transform 90ms ease,
        box-shadow 120ms ease;
      touch-action: none;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }
    .btn:hover {
      background: var(--atv-line);
      transform: translateY(-1px);
    }
    .btn:active {
      transform: translateY(1px) scale(0.98);
      color: var(--atv-on-accent);
      border-color: transparent;
      background: var(--atv-accent);
      box-shadow:
        inset 0 2px 5px rgba(0, 0, 0, 0.45),
        inset 0 -1px 0 rgba(255, 255, 255, 0.15),
        0 0 0 5px color-mix(in srgb, var(--atv-accent) 16%, transparent);
    }
    .btn ha-icon {
      --mdc-icon-size: 22px;
    }
    .btn.small {
      width: 42px;
      height: 42px;
    }
    .btn.small ha-icon {
      --mdc-icon-size: 20px;
    }
    :host([stretch]) .btn {
      width: 100%;
      border-radius: 999px;
    }
    .btn.accent {
      color: var(--atv-on-accent);
      border-color: transparent;
      background: linear-gradient(
        145deg,
        color-mix(in srgb, var(--atv-accent) 78%, #ffffff 22%),
        var(--atv-accent)
      );
      box-shadow:
        0 8px 18px -10px var(--atv-accent),
        inset 0 1px 0 rgba(255, 255, 255, 0.35),
        inset 0 -2px 3px -1px rgba(0, 0, 0, 0.25);
    }
    .btn.accent:hover {
      background: linear-gradient(
        145deg,
        color-mix(in srgb, var(--atv-accent) 70%, #ffffff 30%),
        var(--atv-accent)
      );
      filter: brightness(1.04);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'atv-repeat-button': AtvRepeatButton;
  }
}
