import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { KEYS } from '../const';
import { fireKey, fireText } from './events';

/**
 * A small keyboard for injecting text into the Android TV's focused input
 * field. Submit (Enter) sends the text; the corner buttons send DEL / ENTER.
 */
@customElement('atv-keyboard')
export class AtvKeyboard extends LitElement {
  /**
   * When set, the input mirrors this value (e.g. an on-screen field read from
   * the TV once the backend exposes it). User typing otherwise owns the field.
   */
  @property({ type: String }) mirror?: string;

  @state() private value = '';

  protected willUpdate(changed: Map<string, unknown>) {
    if (changed.has('mirror') && this.mirror !== undefined && !this.focused) {
      this.value = this.mirror;
    }
  }

  private focused = false;

  private submit(e: Event) {
    e.preventDefault();
    const text = this.value;
    if (text) fireText(this, text);
  }

  protected render() {
    return html`
      <form class="bar" @submit=${this.submit}>
        <input
          class="field"
          type="text"
          placeholder="Type on TV…"
          .value=${this.value}
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
          @input=${(e: Event) => (this.value = (e.target as HTMLInputElement).value)}
          @focus=${() => (this.focused = true)}
          @blur=${() => (this.focused = false)}
        />
        <button type="button" class="iconbtn" aria-label="Backspace" @click=${() => fireKey(this, KEYS.del)}>
          <ha-icon icon="mdi:backspace-outline"></ha-icon>
        </button>
        <button type="button" class="iconbtn" aria-label="Enter" @click=${() => fireKey(this, KEYS.enter)}>
          <ha-icon icon="mdi:keyboard-return"></ha-icon>
        </button>
        <button type="submit" class="iconbtn primary" aria-label="Send text">
          <ha-icon icon="mdi:send"></ha-icon>
        </button>
      </form>
    `;
  }

  static styles = css`
    .bar {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .field {
      flex: 1;
      min-width: 0;
      padding: 10px 12px;
      border-radius: 10px;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.4));
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.1));
      color: var(--primary-text-color);
      font-size: 15px;
      outline: none;
    }
    .field:focus {
      border-color: var(--primary-color);
    }
    .iconbtn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 42px;
      height: 42px;
      flex: none;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
      transition: background 120ms ease;
    }
    .iconbtn:hover {
      background: var(--divider-color, rgba(127, 127, 127, 0.3));
    }
    .iconbtn.primary {
      color: var(--text-primary-color, #fff);
      background: var(--primary-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'atv-keyboard': AtvKeyboard;
  }
}
