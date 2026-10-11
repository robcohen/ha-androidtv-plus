import { LitElement, css, html, nothing } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { KEYS, LONG_PRESS_MS, SWIPE_STEP_PX, TAP_THRESHOLD_PX } from '../const';
import { fireKey } from './events';

type Dir = 'up' | 'down' | 'left' | 'right' | null;

/**
 * A gesture touch surface: swipe to move the focus ring, tap to select, hold to
 * long-press. Each swipe gesture emits exactly ONE direction key, chosen by the
 * net displacement when it first crosses `SWIPE_STEP_PX` (or at release if it only
 * crosses the tap threshold), so a swipe never skips several items. Repeat the
 * swipe to move further. Holding the centre after a tap-ish press (no movement)
 * emits `START_LONG:DPAD_CENTER` then `END_LONG:DPAD_CENTER`, the TV's hold
 * gesture (context menus, "move app"); a quick tap stays a short select. The knob
 * follows the finger through a lightly under-damped spring (a touch of lag, a
 * small overshoot on release), tilts with drag velocity, and the pad lights the
 * edge you are pushing toward.
 */
@customElement('atv-touchpad')
export class AtvTouchpad extends LitElement {
  @state() private pressed = false;
  @state() private padDir: Dir = null;
  @state() private okFlash = false;
  @state() private tap: { x: number; y: number; id: number } | null = null;

  @query('.knob') private knobEl?: HTMLElement;
  @query('.trail') private trailEl?: HTMLElement;

  private okTimer?: ReturnType<typeof setTimeout>;
  private tapTimer?: ReturnType<typeof setTimeout>;
  private longTimer?: ReturnType<typeof setTimeout>;
  private tapId = 0;
  private longActive = false;

  private originX = 0;
  private originY = 0;
  private lastX = 0;
  private lastY = 0;
  private originLX = 0;
  private originLY = 0;
  private moved = false;
  private emitted = false;
  private centerX = 0;
  private centerY = 0;
  private maxR = 0;

  // Spring state (px, px/s), target position, and rAF handle.
  private pos = { x: 0, y: 0 };
  private vel = { x: 0, y: 0 };
  private target = { x: 0, y: 0 };
  private lastT = 0;
  private raf = 0;

  private get reduceMotion(): boolean {
    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    cancelAnimationFrame(this.raf);
    clearTimeout(this.okTimer);
    clearTimeout(this.tapTimer);
    clearTimeout(this.longTimer);
  }

  private clampToRadius(dx: number, dy: number): { x: number; y: number } {
    const r = Math.hypot(dx, dy);
    if (r > this.maxR && r > 0) {
      return { x: (dx / r) * this.maxR, y: (dy / r) * this.maxR };
    }
    return { x: dx, y: dy };
  }

  private setTarget(x: number, y: number) {
    const { x: dx, y: dy } = this.clampToRadius(x - this.centerX, y - this.centerY);
    this.target.x = dx;
    this.target.y = dy;
    const r = Math.hypot(dx, dy);
    this.padDir =
      this.pressed && r > this.maxR * 0.5
        ? Math.abs(dx) >= Math.abs(dy)
          ? dx > 0
            ? 'right'
            : 'left'
          : dy > 0
            ? 'down'
            : 'up'
        : null;
    if (this.reduceMotion) {
      this.pos.x = dx;
      this.pos.y = dy;
      this.vel.x = 0;
      this.vel.y = 0;
      this.applyKnob();
    }
  }

  private startLoop() {
    this.lastT = 0;
    if (!this.raf) this.raf = requestAnimationFrame(this.step);
  }

  private step = (t: number) => {
    if (!this.lastT) this.lastT = t;
    let dt = (t - this.lastT) / 1000;
    this.lastT = t;
    dt = Math.min(dt, 0.05);
    const k = 600;
    const c = 34;
    const ax = -k * (this.pos.x - this.target.x) - c * this.vel.x;
    const ay = -k * (this.pos.y - this.target.y) - c * this.vel.y;
    this.vel.x += ax * dt;
    this.vel.y += ay * dt;
    this.pos.x += this.vel.x * dt;
    this.pos.y += this.vel.y * dt;
    this.applyKnob();
    const resting =
      Math.abs(this.vel.x) < 1.5 &&
      Math.abs(this.vel.y) < 1.5 &&
      Math.abs(this.pos.x - this.target.x) < 0.3 &&
      Math.abs(this.pos.y - this.target.y) < 0.3;
    if (resting && !this.pressed) {
      this.pos.x = this.target.x;
      this.pos.y = this.target.y;
      this.vel.x = 0;
      this.vel.y = 0;
      this.applyKnob();
      this.raf = 0;
      return;
    }
    this.raf = requestAnimationFrame(this.step);
  };

  private applyKnob() {
    const el = this.knobEl;
    if (!el) return;
    const speed = Math.hypot(this.vel.x, this.vel.y);
    const tilt = Math.max(-14, Math.min(14, -this.vel.x * 0.05));
    const scale = 1 + Math.min(0.12, speed * 0.0009);
    el.style.transform = `translate(${Math.round(this.pos.x)}px, ${Math.round(
      this.pos.y,
    )}px) rotate(${tilt.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
    if (this.trailEl) {
      const tx = Math.max(-10, Math.min(10, -this.vel.x * 0.012));
      const ty = Math.max(-10, Math.min(10, -this.vel.y * 0.012));
      this.trailEl.style.transform = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px)`;
      this.trailEl.style.opacity = String(Math.min(0.5, speed / 2600));
    }
  }

  private onClick = (e: PointerEvent) => {
    this.pressed = true;
    this.moved = false;
    this.emitted = false;
    this.longActive = false;
    this.originX = this.lastX = e.clientX;
    this.originY = this.lastY = e.clientY;
    // Holding select without moving becomes a long press (START_LONG on the way
    // down, END_LONG on release) so the TV opens its hold menu; a quick tap stays
    // a normal select.
    clearTimeout(this.longTimer);
    this.longTimer = setTimeout(() => {
      if (this.pressed && !this.moved) {
        this.longActive = true;
        this.flashOk();
        fireKey(this, `START_LONG:${KEYS.center}`);
      }
    }, LONG_PRESS_MS);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    this.centerX = rect.left + rect.width / 2;
    this.centerY = rect.top + rect.height / 2;
    this.maxR = (rect.width / 2) * 0.66;
    this.originLX = e.clientX - rect.left;
    this.originLY = e.clientY - rect.top;
    this.setTarget(e.clientX, e.clientY);
    if (!this.reduceMotion) this.startLoop();
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      /* pointer already gone; the gesture still works */
    }
  };

  private dirFrom(dx: number, dy: number): string {
    return Math.abs(dx) >= Math.abs(dy)
      ? dx > 0
        ? KEYS.right
        : KEYS.left
      : dy > 0
        ? KEYS.down
        : KEYS.up;
  }

  private onMove(e: PointerEvent) {
    if (!this.pressed) return;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
    this.setTarget(e.clientX, e.clientY);
    const dx = e.clientX - this.originX;
    const dy = e.clientY - this.originY;
    if (Math.hypot(dx, dy) > TAP_THRESHOLD_PX) this.moved = true;
    // Any real movement means this is a swipe, not a long press.
    if (this.moved) {
      clearTimeout(this.longTimer);
      this.longTimer = undefined;
    }
    // Emit at most one direction per gesture: the first time the drag crosses
    // the step threshold, then lock until pointerup.
    if (!this.emitted && Math.hypot(dx, dy) >= SWIPE_STEP_PX) {
      this.emitted = true;
      fireKey(this, this.dirFrom(dx, dy));
    }
  }

  private flashOk() {
    this.okFlash = false;
    requestAnimationFrame(() => {
      this.okFlash = true;
    });
    clearTimeout(this.okTimer);
    this.okTimer = setTimeout(() => {
      this.okFlash = false;
    }, 460);
  }

  private fireTap() {
    this.tap = { x: this.originLX, y: this.originLY, id: ++this.tapId };
    clearTimeout(this.tapTimer);
    this.tapTimer = setTimeout(() => {
      this.tap = null;
    }, 520);
  }

  private onUp() {
    if (this.pressed) {
      if (this.longActive) {
        fireKey(this, `END_LONG:${KEYS.center}`);
      } else if (!this.moved) {
        fireKey(this, KEYS.center);
        this.flashOk();
        this.fireTap();
      } else if (!this.emitted) {
        // Moved past the tap threshold but not far enough to emit mid-drag;
        // still count it as one step so a short swipe is never a no-op.
        fireKey(this, this.dirFrom(this.lastX - this.originX, this.lastY - this.originY));
      }
    }
    clearTimeout(this.longTimer);
    this.longTimer = undefined;
    this.longActive = false;
    this.pressed = false;
    this.emitted = false;
    this.padDir = null;
    this.target.x = 0;
    this.target.y = 0;
    if (this.reduceMotion) {
      this.pos.x = 0;
      this.pos.y = 0;
      this.vel.x = 0;
      this.vel.y = 0;
      this.applyKnob();
    } else {
      this.startLoop();
    }
  }

  protected updated() {
    this.applyKnob();
  }

  protected render() {
    return html`
      <div
        class="pad ${this.pressed ? 'pressed' : ''}"
        role="button"
        aria-label="Touch remote"
        @pointerdown=${this.onClick}
        @pointermove=${this.onMove}
        @pointerup=${this.onUp}
        @pointercancel=${this.onUp}
        @contextmenu=${(e: Event) => e.preventDefault()}
      >
        <span class="dir up ${this.padDir === 'up' ? 'active' : ''}"><ha-icon icon="mdi:chevron-up"></ha-icon></span>
        <span class="dir down ${this.padDir === 'down' ? 'active' : ''}"><ha-icon icon="mdi:chevron-down"></ha-icon></span>
        <span class="dir left ${this.padDir === 'left' ? 'active' : ''}"><ha-icon icon="mdi:chevron-left"></ha-icon></span>
        <span class="dir right ${this.padDir === 'right' ? 'active' : ''}"><ha-icon icon="mdi:chevron-right"></ha-icon></span>

        <div class="knob ${this.okFlash ? 'ok' : ''}">
          <div class="trail"></div>
          <div class="ripple"></div>
          <div class="ball"><ha-icon icon="mdi:circle-medium"></ha-icon></div>
        </div>

        ${this.tap
          ? html`<span
              class="tap"
              style="left:${this.tap.x}px; top:${this.tap.y}px"
              data-tap=${this.tap.id}
            ></span>`
          : nothing}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    .pad {
      position: relative;
      width: 244px;
      max-width: 100%;
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
      background:
        radial-gradient(circle at 50% 12%, rgba(255, 255, 255, 0.35), transparent 42%),
        radial-gradient(circle at 50% 28%, var(--atv-surface-2), var(--atv-surface) 74%);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.5),
        inset 0 0 0 1px color-mix(in srgb, var(--atv-line) 60%, transparent),
        inset 0 -10px 26px -14px rgba(0, 0, 0, 0.5),
        0 12px 26px -18px rgba(0, 0, 0, 0.7);
      transition:
        transform 90ms ease,
        box-shadow 150ms ease;
    }
    /* Slow sheen that keeps the surface feeling alive at rest. */
    .pad::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 50%;
      pointer-events: none;
      background: conic-gradient(
        from 0deg,
        transparent 0deg,
        color-mix(in srgb, var(--atv-accent) 14%, transparent) 55deg,
        transparent 130deg,
        transparent 360deg
      );
      opacity: 0.5;
      animation: pad-sheen 26s linear infinite;
    }
    .pad::before {
      content: '';
      position: absolute;
      inset: 15%;
      border-radius: 50%;
      border: 1px solid var(--atv-line);
      opacity: 0.7;
    }
    .pad.pressed {
      transform: scale(0.985);
      box-shadow:
        inset 0 0 0 2px color-mix(in srgb, var(--atv-accent) 45%, transparent),
        inset 0 -10px 26px -14px rgba(0, 0, 0, 0.5),
        0 12px 26px -18px rgba(0, 0, 0, 0.7);
    }
    .dir {
      position: absolute;
      display: flex;
      color: var(--atv-text-dim);
      opacity: 0.18;
      pointer-events: none;
      transition:
        opacity 150ms ease,
        color 150ms ease,
        transform 150ms ease,
        filter 150ms ease;
    }
    .dir ha-icon {
      --mdc-icon-size: 20px;
    }
    .dir.active {
      opacity: 1;
      color: var(--atv-accent);
      filter: drop-shadow(0 0 6px color-mix(in srgb, var(--atv-accent) 60%, transparent));
    }
    .dir.up {
      top: 9px;
      left: 50%;
      transform: translateX(-50%);
    }
    .dir.down {
      bottom: 9px;
      left: 50%;
      transform: translateX(-50%);
    }
    .dir.left {
      left: 9px;
      top: 50%;
      transform: translateY(-50%);
    }
    .dir.right {
      right: 9px;
      top: 50%;
      transform: translateY(-50%);
    }
    .dir.up.active {
      transform: translateX(-50%) translateY(-2px);
    }
    .dir.down.active {
      transform: translateX(-50%) translateY(2px);
    }
    .dir.left.active {
      transform: translateY(-50%) translateX(-2px);
    }
    .dir.right.active {
      transform: translateY(-50%) translateX(2px);
    }
    .knob {
      position: relative;
      width: 34%;
      aspect-ratio: 1;
      pointer-events: none;
      will-change: transform;
    }
    .trail {
      position: absolute;
      inset: 0;
      z-index: 0;
      border-radius: 50%;
      opacity: 0;
      background: var(--atv-accent);
      filter: blur(8px);
      transition:
        opacity 140ms ease,
        transform 140ms ease;
    }
    .ball {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      --mdc-icon-size: 34px;
      color: var(--atv-on-accent);
      background: linear-gradient(
        145deg,
        color-mix(in srgb, var(--atv-accent) 78%, #ffffff 22%),
        var(--atv-accent)
      );
      box-shadow:
        0 8px 18px -10px var(--atv-accent),
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        inset 0 -3px 6px -2px rgba(0, 0, 0, 0.35);
    }
    .ripple {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 2px solid var(--atv-accent);
      opacity: 0;
    }
    .tap {
      position: absolute;
      width: 56px;
      height: 56px;
      margin: -28px 0 0 -28px;
      border-radius: 50%;
      border: 2px solid var(--atv-accent);
      pointer-events: none;
      animation: tap-out 500ms ease-out forwards;
    }
    .knob.ok .ball {
      animation: ball-pop 300ms ease-out;
    }
    .knob.ok .ripple {
      animation: ripple-out 420ms ease-out;
    }
    @keyframes ball-pop {
      0% {
        transform: scale(1);
      }
      35% {
        transform: scale(0.82);
      }
      70% {
        transform: scale(1.16);
      }
      100% {
        transform: scale(1);
      }
    }
    @keyframes ripple-out {
      0% {
        transform: scale(0.8);
        opacity: 0.9;
      }
      100% {
        transform: scale(2.4);
        opacity: 0;
      }
    }
    @keyframes tap-out {
      0% {
        transform: scale(0.3);
        opacity: 0.85;
      }
      100% {
        transform: scale(1.5);
        opacity: 0;
      }
    }
    @keyframes pad-sheen {
      to {
        transform: rotate(360deg);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .pad::after,
      .trail {
        animation: none;
        opacity: 0;
      }
      .knob.ok .ball,
      .knob.ok .ripple,
      .tap {
        animation-duration: 1ms;
      }
      .dir,
      .pad {
        transition: none;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'atv-touchpad': AtvTouchpad;
  }
}
