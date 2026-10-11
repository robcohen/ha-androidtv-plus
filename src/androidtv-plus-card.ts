import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardEditor } from 'custom-card-helpers';
import { CARD_TAG, CARD_VERSION, EDITOR_TAG, KEYS } from './const';
import type { AndroidTVPlusCardConfig, RemoteMode } from './types';
import {
  type ActivityEventDetail,
  type KeyEventDetail,
  type TextEventDetail,
} from './components/events';
import './components/dpad';
import './components/touchpad';
import './components/repeat-button';
import './components/keyboard';
import './components/app-grid';

console.info(
  `%c ${CARD_TAG} %c ${CARD_VERSION} `,
  'color: white; background: #4285f4; font-weight: 700; border-radius: 3px 0 0 3px;',
  'color: white; background: #34a853; font-weight: 700; border-radius: 0 3px 3px 0;',
);

@customElement(CARD_TAG)
export class AndroidTVPlusCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private config!: AndroidTVPlusCardConfig;
  @state() private mode: RemoteMode = 'both';

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import('./editor');
    return document.createElement(EDITOR_TAG);
  }

  public static getStubConfig(hass: HomeAssistant): AndroidTVPlusCardConfig {
    const remote = Object.keys(hass.states).find((e) => e.startsWith('remote.'));
    return {
      type: `custom:${CARD_TAG}`,
      entity: remote ?? 'remote.living_room_tv',
      mode: 'both',
      apps: [],
    };
  }

  public setConfig(config: AndroidTVPlusCardConfig): void {
    if (!config.entity || !config.entity.startsWith('remote.')) {
      throw new Error('You must specify a `remote.` entity from the androidtv_remote integration.');
    }
    this.config = {
      mode: 'both',
      show_power: true,
      show_volume: true,
      show_media: true,
      show_keyboard: true,
      haptic_feedback: true,
      ...config,
    };
    this.mode = this.config.mode ?? 'both';
  }

  public getCardSize(): number {
    let size = 8;
    if (this.config?.apps?.length) size += 2;
    if (this.config?.show_keyboard) size += 1;
    return size;
  }

  private get remoteState() {
    return this.hass?.states[this.config.entity];
  }

  private vibrate(): void {
    if (this.config.haptic_feedback) navigator.vibrate?.(8);
  }

  private sendKey(key: string): void {
    this.vibrate();
    void this.hass.callService(
      'remote',
      'send_command',
      { command: key },
      { entity_id: this.config.entity },
    );
  }

  private sendText(text: string): void {
    void this.hass.callService(
      'remote',
      'send_command',
      { command: `text:${text}` },
      { entity_id: this.config.entity },
    );
  }

  private launchActivity(activity: string): void {
    void this.hass.callService(
      'remote',
      'turn_on',
      { activity },
      { entity_id: this.config.entity },
    );
  }

  private onKey = (e: CustomEvent<KeyEventDetail>) => this.sendKey(e.detail.key);
  private onText = (e: CustomEvent<TextEventDetail>) => this.sendText(e.detail.text);
  private onActivity = (e: CustomEvent<ActivityEventDetail>) => this.launchActivity(e.detail.activity);

  private get cardTitle(): string {
    return this.config.name ?? this.remoteState?.attributes.friendly_name ?? 'Android TV';
  }

  private get activityLabel(): string {
    const app = this.remoteState?.attributes.current_activity as string | undefined;
    if (!app) return 'Idle';
    const last = app.split('.').pop() ?? app;
    return last.charAt(0).toUpperCase() + last.slice(1);
  }

  private renderNav() {
    const showDpad = this.mode === 'dpad' || this.mode === 'both';
    const showTouch = this.mode === 'touch' || this.mode === 'both';
    return html`
      ${this.config.mode === 'both'
        ? html`
            <div class="segmented" role="tablist">
              <button
                role="tab"
                class=${this.mode === 'dpad' ? 'active' : ''}
                @click=${() => (this.mode = 'dpad')}
              >
                <ha-icon icon="mdi:gamepad-variant-outline"></ha-icon> D-pad
              </button>
              <button
                role="tab"
                class=${this.mode === 'touch' ? 'active' : ''}
                @click=${() => (this.mode = 'touch')}
              >
                <ha-icon icon="mdi:gesture-tap"></ha-icon> Touch
              </button>
            </div>
          `
        : nothing}
      <div class="surface">${showDpad && this.mode !== 'touch' ? html`<atv-dpad></atv-dpad>` : nothing}
        ${showTouch && this.mode !== 'dpad' ? html`<atv-touchpad></atv-touchpad>` : nothing}</div>
    `;
  }

  private renderMedia() {
    return html`
      <div class="row">
        <atv-repeat-button .key=${KEYS.prev} icon="mdi:skip-previous" label="Previous"></atv-repeat-button>
        <atv-repeat-button .key=${KEYS.rewind} icon="mdi:rewind" label="Rewind"></atv-repeat-button>
        <atv-repeat-button .key=${KEYS.playPause} icon="mdi:play-pause" label="Play/Pause"></atv-repeat-button>
        <atv-repeat-button .key=${KEYS.stop} icon="mdi:stop" label="Stop"></atv-repeat-button>
        <atv-repeat-button .key=${KEYS.fastForward} icon="mdi:fast-forward" label="Fast forward"></atv-repeat-button>
        <atv-repeat-button .key=${KEYS.next} icon="mdi:skip-next" label="Next"></atv-repeat-button>
      </div>
    `;
  }

  private renderVolume() {
    return html`
      <div class="row">
        <atv-repeat-button .key=${KEYS.volDown} icon="mdi:volume-medium" label="Volume down"></atv-repeat-button>
        <atv-repeat-button .key=${KEYS.mute} icon="mdi:volume-off" label="Mute"></atv-repeat-button>
        <atv-repeat-button .key=${KEYS.volUp} icon="mdi:volume-high" label="Volume up"></atv-repeat-button>
      </div>
    `;
  }

  protected render() {
    if (!this.config || !this.hass) return nothing;
    return html`
      <ha-card
        @atv-key=${this.onKey}
        @atv-text=${this.onText}
        @atv-activity=${this.onActivity}
      >
        <div class="content">
          <header>
            <div class="titles">
              <div class="title">${this.cardTitle}</div>
              <div class="activity">${this.activityLabel}</div>
            </div>
            ${this.config.show_power
              ? html`<atv-repeat-button .key=${KEYS.power} icon="mdi:power" label="Power"></atv-repeat-button>`
              : nothing}
          </header>

          ${this.renderNav()}

          <div class="row">
            <atv-repeat-button .key=${KEYS.back} icon="mdi:arrow-left" label="Back"></atv-repeat-button>
            <atv-repeat-button .key=${KEYS.home} icon="mdi:home-outline" label="Home"></atv-repeat-button>
            <atv-repeat-button .key=${KEYS.menu} icon="mdi:menu" label="Menu"></atv-repeat-button>
            <atv-repeat-button .key=${KEYS.search} icon="mdi:magnify" label="Search"></atv-repeat-button>
          </div>

          ${this.config.show_media ? this.renderMedia() : nothing}
          ${this.config.show_volume ? this.renderVolume() : nothing}
          ${this.config.apps?.length
            ? html`<atv-app-grid .apps=${this.config.apps}></atv-app-grid>`
            : nothing}
          ${this.config.show_keyboard
            ? html`<atv-keyboard></atv-keyboard>`
            : nothing}
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    ha-card {
      overflow: hidden;
    }
    .content {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 16px;
    }
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .titles {
      min-width: 0;
    }
    .title {
      font-size: 18px;
      font-weight: 600;
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .activity {
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .segmented {
      display: flex;
      gap: 4px;
      padding: 4px;
      border-radius: 12px;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    }
    .segmented button {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 8px;
      border: none;
      border-radius: 9px;
      cursor: pointer;
      font-size: 14px;
      color: var(--secondary-text-color);
      background: transparent;
      transition: background 120ms ease;
    }
    .segmented button.active {
      color: var(--primary-text-color);
      background: var(--card-background-color, #fff);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }
    .surface {
      display: flex;
      justify-content: center;
    }
    .row {
      display: flex;
      justify-content: center;
      gap: 10px;
      flex-wrap: wrap;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [CARD_TAG]: AndroidTVPlusCard;
  }
  interface Window {
    customCards?: { type: string; name: string; description: string; preview?: boolean }[];
  }
}

window.customCards = window.customCards ?? [];
window.customCards.push({
  type: CARD_TAG,
  name: 'Android TV Plus',
  description: 'A d-pad and touch remote for Android TV, with app tiles and keyboard.',
});
