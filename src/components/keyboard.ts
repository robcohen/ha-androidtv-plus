import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { KEYS } from '../const';
import { computeEdit } from '../edit';
import type { TextMode } from '../types';
import { fireKey, fireText } from './events';

/**
 * A small keyboard for injecting text into the Android TV's focused input
 * field. Text is sent as you type: appended characters go out immediately and
 * deletions send DEL, mirroring the TV's field.
 *
 * Two delivery modes:
 * - `append` (default): the TV inserts each character at the cursor, so only
 *   the newly typed characters are sent. Pasting or replacing a selection is
 *   handled by sending DEL for what we previously sent, then the new text.
 * - `replace`: the TV replaces the whole field on every edit (some apps that
 *   show their own on-screen keyboard); the full string is sent each time.
 */
@customElement('atv-keyboard')
export class AtvKeyboard extends LitElement {
  /**
   * When set, the input mirrors this value (e.g. an on-screen field read from
   * the TV once the backend exposes it). User typing otherwise owns the field.
   */
  @property({ type: String }) mirror?: string;

  /** How the TV applies text edits. */
  @property({ type: String }) mode: TextMode = 'append';

  @state() private value = '';

  /** The last value we have already sent to the TV. */
  private sent = '';
  private focused = false;

  protected willUpdate(changed: Map<string, unknown>) {
    if (changed.has('mirror') && this.mirror !== undefined && !this.focused) {
      this.value = this.mirror;
      this.sent = this.mirror;
    }
  }

  private onInput(e: Event) {
    const input = e.target as HTMLInputElement;
    const next = input.value;
    for (const action of computeEdit(this.sent, next, this.mode)) {
      if (action.type === 'text') fireText(this, action.text);
      else this.deleteChars(action.count);
    }
    this.sent = next;
    this.value = next;
  }

  /** Send `n` backspaces to the TV's focused field. */
  private deleteChars(n: number): void {
    for (let i = 0; i < n; i++) fireKey(this, KEYS.del);
  }

  /** Remove the characters we sent from the TV's field and empty the input. */
  private clearField(): void {
    this.deleteChars(this.sent.length);
    this.sent = '';
    this.value = '';
    const input = this.renderRoot.querySelector('input.field') as HTMLInputElement | null;
    if (input) input.value = '';
  }

  protected render() {
    return html`
      <div class="bar">
        <input
          class="field"
          type="text"
          placeholder="Type on TV…"
          .value=${this.value}
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
          @input=${this.onInput}
          @focus=${() => (this.focused = true)}
          @blur=${() => (this.focused = false)}
        />
        <div class="keys">
          <button type="button" class="iconbtn" aria-label="Clear" @click=${() => this.clearField()}>
            <ha-icon icon="mdi:close-circle-outline"></ha-icon>
          </button>
          <button type="button" class="iconbtn" aria-label="Backspace" @click=${() => fireKey(this, KEYS.del)}>
            <ha-icon icon="mdi:backspace-outline"></ha-icon>
          </button>
          <button type="button" class="iconbtn" aria-label="Enter" @click=${() => fireKey(this, KEYS.enter)}>
            <ha-icon icon="mdi:keyboard-return"></ha-icon>
          </button>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    .bar {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .keys {
      display: flex;
      gap: 8px;
    }
    .field {
      width: 100%;
      box-sizing: border-box;
      min-width: 0;
      padding: 12px 14px;
      border-radius: 14px;
      border: 1px solid var(--atv-line);
      background: var(--atv-surface-2);
      color: var(--atv-text);
      font-size: 15px;
      outline: none;
      transition:
        border-color 140ms ease,
        box-shadow 140ms ease;
    }
    .field::placeholder {
      color: var(--atv-text-dim);
    }
    .field:focus {
      border-color: var(--atv-accent);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--atv-accent) 22%, transparent);
    }
    .iconbtn {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1 1 0;
      width: auto;
      min-width: 0;
      height: 46px;
      border: 1px solid var(--atv-line);
      border-radius: 14px;
      cursor: pointer;
      color: var(--atv-text);
      background: var(--atv-surface-2);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        inset 0 -2px 3px -1px rgba(0, 0, 0, 0.28),
        0 2px 4px -1px rgba(0, 0, 0, 0.45);
      transition:
        background 120ms ease,
        border-color 120ms ease,
        transform 90ms ease,
        box-shadow 120ms ease;
    }
    .iconbtn ha-icon {
      --mdc-icon-size: 22px;
    }
    .iconbtn:hover {
      background: var(--atv-line);
    }
    .iconbtn:active {
      transform: translateY(1px) scale(0.97);
      box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.45);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'atv-keyboard': AtvKeyboard;
  }
}
