import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { KEYS, SWIPE_STEP_PX, TAP_THRESHOLD_PX } from '../const';
import { fireKey } from './events';

/**
 * A gesture touch surface: swipe to move the focus ring, tap to
 * select. A continuous drag keeps emitting directions as it crosses each step.
 */
@customElement('atv-touchpad')
export class AtvTouchpad extends LitElement {
  @state() private pressed = false;

  private originX = 0;
  private originY = 0;
  private lastX = 0;
  private lastY = 0;
  private moved = false;

  private onDown(e: PointerEvent) {
    e.preventDefault();
    this.pressed = true;
    this.moved = false;
    this.originX = this.lastX = e.clientX;
    this.originY =     this.lastY = e.clientY;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      /* pointer already gone; the gesture still works */
    }
  }

  private onMove(e: PointerEvent) {
    if (!this.pressed) return;
    const dx = e.clientX - this.lastX;
    const dy = e.clientY - this.lastY;
    const total = Math.hypot(e.clientX - this.originX, e.clientY - this.originY);
    if (total > TAP_THRESHOLD_PX) this.moved = true;

    if (Math.hypot(dx, dy) < SWIPE_STEP_PX) return;

    const key =
      Math.abs(dx) >= Math.abs(dy)
        ? dx > 0
          ? KEYS.right
          : KEYS.left
        : dy > 0
          ? KEYS.down
          : KEYS.up;
    fireKey(this, key);
    // Advance the reference so a continued drag emits the next step.
    this.lastX = e.clientX;
    this.lastY = e.clientY;
  }

  private onUp() {
    if (this.pressed && !this.moved) {
      fireKey(this, KEYS.center);
    }
    this.pressed = false;
  }

  protected render() {
    return html`
      <div
        class="pad ${this.pressed ? 'pressed' : ''}"
        role="button"
        aria-label="Touch remote"
        @pointerdown=${this.onDown}
        @pointermove=${this.onMove}
        @pointerup=${this.onUp}
        @pointercancel=${this.onUp}
        @contextmenu=${(e: Event) => e.preventDefault()}
      >
        <div class="ring"></div>
        <span class="hint">OK</span>
      </div>
    `;
  }

  static styles = css`
    .pad {
      position: relative;
      width: min(100%, 232px);
      aspect-ratio: 1;
      margin: 0 auto;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      touch-action: none;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
      background: radial-gradient(
        circle at 50% 35%,
        var(--secondary-background-color, rgba(127, 127, 127, 0.18)),
        var(--card-background-color, rgba(0, 0, 0, 0.1)) 70%
      );
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.08),
        0 2px 8px rgba(0, 0, 0, 0.25);
      transition: transform 90ms ease;
    }
    .pad.pressed {
      transform: scale(0.985);
    }
    .ring {
      width: 68%;
      aspect-ratio: 1;
      border-radius: 50%;
      border: 2px dashed var(--divider-color, rgba(127, 127, 127, 0.4));
      opacity: 0.55;
    }
    .hint {
      position: absolute;
      font-size: 13px;
      letter-spacing: 0.08em;
      font-weight: 600;
      color: var(--secondary-text-color);
      pointer-events: none;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'atv-touchpad': AtvTouchpad;
  }
}
