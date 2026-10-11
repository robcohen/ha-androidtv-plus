import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { EDITOR_TAG } from './const';
import type { AndroidTVPlusCardConfig, RemoteMode } from './types';

@customElement(EDITOR_TAG)
export class AndroidTVPlusCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: AndroidTVPlusCardConfig;

  public setConfig(config: AndroidTVPlusCardConfig): void {
    this.config = config;
  }

  private patch(changes: Partial<AndroidTVPlusCardConfig & { [key: string]: unknown }>): void {
    this.config = { ...this.config, ...changes } as AndroidTVPlusCardConfig;
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: this.config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private num(key: 'show_power' | 'show_volume' | 'show_media' | 'show_keyboard' | 'haptic_feedback') {
    return this.config[key] !== false;
  }

  private toggle(
    key: 'show_power' | 'show_volume' | 'show_media' | 'show_keyboard' | 'haptic_feedback',
    e: CustomEvent,
  ) {
    this.patch({ [key]: (e.target as unknown as { checked: boolean }).checked } as never);
  }

  protected render() {
    if (!this.hass || !this.config) return nothing;
    return html`
      <div class="form">
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this.config.entity}
          .includeDomains=${['remote']}
          allow-custom-entity
          label="Remote entity"
          @value-changed=${(e: CustomEvent) => this.patch({ entity: e.detail.value })}
        ></ha-entity-picker>

        <ha-entity-picker
          .hass=${this.hass}
          .value=${this.config.media_player ?? ''}
          .includeDomains=${['media_player']}
          allow-custom-entity
          label="Media player (optional)"
          @value-changed=${(e: CustomEvent) => this.patch({ media_player: e.detail.value || undefined })}
        ></ha-entity-picker>

        <ha-textfield
          .value=${this.config.name ?? ''}
          label="Title (optional)"
          @input=${(e: Event) => this.patch({ name: (e.target as HTMLInputElement).value || undefined })}
        ></ha-textfield>

        <div class="segmented" role="radiogroup">
          ${(['both', 'dpad', 'touch'] as RemoteMode[]).map(
            (m) => html`
              <button
                role="radio"
                aria-checked=${this.config.mode === m}
                class=${(this.config.mode ?? 'both') === m ? 'active' : ''}
                @click=${() => this.patch({ mode: m })}
              >
                ${m}
              </button>
            `,
          )}
        </div>

        <ha-formfield label="Show power">
          <ha-switch .checked=${this.num('show_power')} @change=${(e: CustomEvent) => this.toggle('show_power', e)}></ha-switch>
        </ha-formfield>
        <ha-formfield label="Show volume">
          <ha-switch .checked=${this.num('show_volume')} @change=${(e: CustomEvent) => this.toggle('show_volume', e)}></ha-switch>
        </ha-formfield>
        <ha-formfield label="Show media controls">
          <ha-switch .checked=${this.num('show_media')} @change=${(e: CustomEvent) => this.toggle('show_media', e)}></ha-switch>
        </ha-formfield>
        <ha-formfield label="Show keyboard">
          <ha-switch .checked=${this.num('show_keyboard')} @change=${(e: CustomEvent) => this.toggle('show_keyboard', e)}></ha-switch>
        </ha-formfield>
        <ha-formfield label="Haptic feedback">
          <ha-switch .checked=${this.num('haptic_feedback')} @change=${(e: CustomEvent) => this.toggle('haptic_feedback', e)}></ha-switch>
        </ha-formfield>

        <p class="hint">App tiles are configured in the card's YAML (<code>apps:</code>).</p>
      </div>
    `;
  }

  static styles = css`
    .form {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .segmented {
      display: flex;
      gap: 6px;
    }
    .segmented button {
      flex: 1;
      padding: 10px;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.4));
      border-radius: 10px;
      background: transparent;
      color: var(--secondary-text-color);
      cursor: pointer;
      text-transform: capitalize;
    }
    .segmented button.active {
      border-color: var(--primary-color);
      color: var(--primary-color);
    }
    .hint {
      margin: 0;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [EDITOR_TAG]: AndroidTVPlusCardEditor;
  }
}
