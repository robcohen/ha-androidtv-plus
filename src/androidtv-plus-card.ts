import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardEditor } from 'custom-card-helpers';
import { CARD_TAG, CARD_VERSION, EDITOR_TAG, KEYS } from './const';
import type { AndroidTVPlusCardConfig, AndroidTVPlusEntity, RemoteMode } from './types';
import {
  ATV_ACTIVITY_EVENT,
  ATV_KEY_EVENT,
  ATV_TEXT_EVENT,
  type ActivityEventDetail,
  type KeyEventDetail,
  type TextEventDetail,
} from './components/events';
import './components/dpad';
import './components/touchpad';
import './components/repeat-button';
import './components/keyboard';
import './components/app-grid';
import { appMatches } from './app-match';

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
  @state() private surface: 'dpad' | 'touch' = 'touch';
  @state() private keyboardOpen = false;
  @state() private appsOpen = false;
  @state() private volumeOpen = false;
  @state() private pickerOpen = false;
  @state() private activeEntity!: string;

  constructor() {
    super();
    // Listen on the host so events from the drawers (which render outside the
    // remote body) are caught too.
    this.addEventListener(ATV_KEY_EVENT, this.onKey as EventListener);
    this.addEventListener(ATV_TEXT_EVENT, this.onText as EventListener);
    this.addEventListener(ATV_ACTIVITY_EVENT, this.onActivity as EventListener);
  }

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
    this.surface = this.mode === 'dpad' ? 'dpad' : 'touch';
    const targets = this.targets;
    const preferred = this.activeEntity ?? this.readStoredTarget();
    this.activeEntity =
      preferred && targets.some((t) => t.entity === preferred) ? preferred : targets[0]?.entity;
  }

  private static readonly STORAGE_KEY = 'androidtv-plus:active';

  private readStoredTarget(): string | undefined {
    try {
      return localStorage.getItem(AndroidTVPlusCard.STORAGE_KEY) ?? undefined;
    } catch {
      return undefined;
    }
  }

  private storeTarget(entity: string): void {
    try {
      localStorage.setItem(AndroidTVPlusCard.STORAGE_KEY, entity);
    } catch {
      /* storage unavailable (private mode); selection just won't persist */
    }
  }

  public getCardSize(): number {
    let size = 9;
    if (this.config?.apps?.length) size += 2;
    if (this.config?.show_keyboard) size += 1;
    return size;
  }

  private onDrawerClick(e: Event): void {
    if (e.target === e.currentTarget) {
      this.appsOpen = false;
      this.volumeOpen = false;
    }
  }

  private get remoteState() {
    const entity = this.target?.entity;
    return entity ? this.hass?.states[entity] : undefined;
  }

  /** Normalised list of selectable TVs: `entity` first, then `entities`, de-duped. */
  private get targets(): {
    entity: string;
    name?: string;
    media_player?: string;
    ime_entity?: string;
  }[] {
    const cfg = this.config;
    if (!cfg) return [];
    const seen = new Set<string>();
    const out: { entity: string; name?: string; media_player?: string; ime_entity?: string }[] = [];
    for (const item of [cfg.entity, ...(cfg.entities ?? [])] as AndroidTVPlusEntity[]) {
      const t =
        typeof item === 'string'
          ? { entity: item }
          : {
              entity: item.entity,
              name: item.name,
              media_player: item.media_player,
              ime_entity: item.ime_entity,
            };
      if (!t.entity?.startsWith('remote.') || seen.has(t.entity)) continue;
      seen.add(t.entity);
      if (t.entity === cfg.entity) {
        t.media_player ??= cfg.media_player;
        t.ime_entity ??= cfg.ime_entity;
      }
      out.push(t);
    }
    return out;
  }

  /** The currently selected TV. */
  private get target() {
    const targets = this.targets;
    return targets.find((t) => t.entity === this.activeEntity) ?? targets[0];
  }

  private nameFor(t: { entity: string; name?: string }): string {
    return (
      t.name ??
      (this.hass?.states[t.entity]?.attributes.friendly_name as string | undefined) ??
      t.entity
    );
  }

  private selectTarget(entity: string): void {
    this.activeEntity = entity;
    this.storeTarget(entity);
    this.pickerOpen = false;
    this.keyboardOpen = false;
    this.vibrate();
  }

  private get isOn(): boolean {
    return this.remoteState?.state === 'on';
  }

  /**
   * Media player paired with the selected TV: explicit config first, otherwise
   * derived by swapping the `remote.` prefix for `media_player.` (the naming
   * the integrations use, e.g. `remote.living_room_tv` → `media_player.living_room_tv`).
   */
  private get companionMediaPlayer(): string | undefined {
    const t = this.target;
    if (!t) return undefined;
    if (t.media_player) return t.media_player;
    const candidate = `media_player.${t.entity.replace(/^remote\./, '')}`;
    return this.hass?.states[candidate] ? candidate : undefined;
  }

  private get mediaState() {
    const mp = this.companionMediaPlayer;
    return mp ? this.hass?.states[mp] : undefined;
  }

  /** True when the remote entity is missing or unavailable (integration offline). */
  private get offline(): boolean {
    return this.statusKind === 'offline';
  }

  /** Non-power controls are disabled unless the TV is reachable and on. */
  private get controlsDisabled(): boolean {
    return !this.isOn;
  }

  /** Foreground package id, from the media player's `app_id` or the remote's `current_activity`. */
  private get foregroundPackage(): string | undefined {
    const fromMedia = this.mediaState?.attributes?.app_id;
    const fromRemote = this.remoteState?.attributes?.current_activity;
    const value =
      (typeof fromMedia === 'string' && fromMedia) ||
      (typeof fromRemote === 'string' && fromRemote) ||
      '';
    return value || undefined;
  }

  /** Friendly name for a foreground app, from the configured tiles if it matches. */
  private get activeAppName(): string | undefined {
    const fg = this.foregroundPackage;
    if (!fg) return undefined;
    return this.config.apps?.find((app) => appMatches(app, fg))?.name || undefined;
  }

  /** Strip google/android reverse-DNS prefixes and prettify a known app id. */
  private prettyApp(id?: string): string | undefined {
    if (!id) return undefined;
    let s = id;
    for (const prefix of [
      'com.google.android.apps.tv.',
      'com.google.android.',
      'com.android.',
      'android.',
    ]) {
      if (s.toLowerCase().startsWith(prefix)) {
        s = s.slice(prefix.length) || s;
        break;
      }
    }
    const friendly: Record<string, string> = {
      launcherx: 'Home',
      launcher: 'Home',
      leanback: 'Home',
      tvlauncher: 'Home',
      dreamx: 'Screensaver',
    };
    const mapped = friendly[s.toLowerCase()];
    if (mapped) return mapped;
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  /** Now-playing line for the strip, from the media player. */
  private get nowPlaying(): { primary: string; secondary?: string } | null {
    const media = this.mediaState;
    if (!media || media.state === 'off' || media.state === 'unavailable') return null;
    const title = typeof media.attributes.media_title === 'string' ? media.attributes.media_title : '';
    const artist = typeof media.attributes.media_artist === 'string' ? media.attributes.media_artist : '';
    const rawApp = typeof media.attributes.app_name === 'string' ? media.attributes.app_name : '';
    const app =
      this.activeAppName ||
      this.prettyApp(rawApp) ||
      (this.isOn ? this.activityLabel : '');
    const primary = title || app;
    if (!primary) return null;
    const secondary = title ? artist || app : '';
    return { primary, secondary: secondary || undefined };
  }

  private get statusKind(): 'on' | 'off' | 'offline' {
    const state = this.remoteState?.state;
    if (!state || state === 'unavailable' || state === 'unknown') return 'offline';
    return this.isOn ? 'on' : 'off';
  }

  private get imeState() {
    const ime = this.target?.ime_entity;
    return ime ? this.hass?.states[ime] : undefined;
  }

  /** True while the TV reports a focused text field (via `ime_entity`). */
  private get imeOpen(): boolean {
    return this.imeState?.state === 'on';
  }

  /** Field contents reported by the TV, mirrored into the keyboard input. */
  private get imeText(): string | undefined {
    const text = this.imeState?.attributes?.text;
    return typeof text === 'string' && text.length ? text : undefined;
  }

  /** True when the keyboard is active — opened by the user or auto-shown by the TV. */
  private get keyboardActive(): boolean {
    return this.keyboardOpen || this.imeOpen;
  }

  private get keyboardVisible(): boolean {
    return !!this.config?.show_keyboard && this.keyboardActive;
  }

  private vibrate(): void {
    if (this.config.haptic_feedback) navigator.vibrate?.(8);
  }

  private sendQueue: Array<{
    domain: string;
    service: string;
    data: Record<string, unknown>;
    entity_id: string;
  }> = [];
  private sending = false;

  /**
   * Queue an HA service call and process the queue strictly in order, one at a
   * time. Serialising keeps `text:` edits ordered and stops held-repeat or
   * rapid taps from flooding the integration. Failures are logged, never left
   * as unhandled promise rejections.
   */
  private callService(
    domain: string,
    service: string,
    data: Record<string, unknown>,
    target?: { entity_id: string },
  ): void {
    this.sendQueue.push({
      domain,
      service,
      data,
      entity_id: target?.entity_id ?? this.target?.entity ?? this.config.entity,
    });
    void this.pumpQueue();
  }

  private async pumpQueue(): Promise<void> {
    if (this.sending) return;
    this.sending = true;
    try {
      let job = this.sendQueue.shift();
      while (job) {
        try {
          await this.hass.callService(job.domain, job.service, job.data, {
            entity_id: job.entity_id,
          });
        } catch (err) {
          console.warn(`[androidtv-plus] ${job.domain}.${job.service} failed`, err);
        }
        job = this.sendQueue.shift();
      }
    } finally {
      this.sending = false;
    }
  }

  private sendKey(key: string): void {
    this.vibrate();
    this.callService('remote', 'send_command', { command: key });
  }

  private sendText(text: string): void {
    this.callService('remote', 'send_command', { command: `text:${text}` });
  }

  private launchActivity(activity: string): void {
    this.callService('remote', 'turn_on', { activity });
  }

  private onKey = (e: CustomEvent<KeyEventDetail>) => this.sendKey(e.detail.key);
  private onText = (e: CustomEvent<TextEventDetail>) => this.sendText(e.detail.text);
  private onActivity = (e: CustomEvent<ActivityEventDetail>) => {
    const { activity, service, data } = e.detail;
    if (service) {
      const [domain, ...rest] = service.split('.');
      this.callService(domain, rest.join('.'), data ?? {}, {
        entity_id: this.target?.entity ?? this.config.entity,
      });
      return;
    }
    if (activity) this.launchActivity(activity);
  };

  private get cardTitle(): string {
    // With several TVs the selector must reflect the selected one, so a fixed
    // `name` only applies when there is a single TV.
    if (this.targets.length > 1 && this.target) return this.nameFor(this.target);
    return this.config.name ?? (this.target ? this.nameFor(this.target) : 'Android TV');
  }

  private get activityLabel(): string {
    const app = this.remoteState?.attributes.current_activity as string | undefined;
    if (!app) return 'Idle';
    const last = app.split('.').pop() ?? app;
    return last.charAt(0).toUpperCase() + last.slice(1);
  }

  private get statusText(): string {
    if (this.statusKind === 'offline') {
      // The media player often still reports the TV as on while the remote
      // entity is briefly unavailable — that's a reconnect, not a hard failure.
      return this.mediaState?.state === 'on' ? 'Reconnecting…' : 'Unavailable';
    }
    if (!this.isOn) return 'Off';
    return this.activeAppName || this.prettyApp(this.foregroundPackage) || this.activityLabel;
  }

  /** Hover text for the status line: the remote entity's last update + state. */
  private get statusTitle(): string {
    const state = this.remoteState;
    if (!state) return `${this.target?.entity ?? ''} — not found`;
    const updated = state.last_updated ? new Date(state.last_updated).toLocaleString() : 'unknown';
    return `${this.target?.entity ?? ''}\nstate: ${state.state}\nupdated: ${updated}`;
  }

  private renderSegmented() {
    if (this.config.mode !== 'both') return nothing;
    return html`
      <div class="segmented" role="tablist">
        <button
          role="tab"
          aria-label="Touch"
          title="Touch"
          class=${this.surface === 'touch' ? 'active' : ''}
          @click=${() => (this.surface = 'touch')}
        >
          <ha-icon icon="mdi:gesture-tap"></ha-icon>
        </button>
        <button
          role="tab"
          aria-label="D-pad"
          title="D-pad"
          class=${this.surface === 'dpad' ? 'active' : ''}
          @click=${() => (this.surface = 'dpad')}
        >
          <ha-icon icon="mdi:gamepad-variant-outline"></ha-icon>
        </button>
      </div>
    `;
  }

  private renderSurface() {
    const showDpad = this.surface === 'dpad' && this.config.mode !== 'touch';
    const showTouch = this.surface === 'touch' && this.config.mode !== 'dpad';
    return html`
      ${showDpad ? html`<atv-dpad></atv-dpad>` : nothing}
      ${showTouch ? html`<atv-touchpad></atv-touchpad>` : nothing}
    `;
  }

  private renderTransport() {
    return html`
      <div class="transport">
        <atv-repeat-button stretch .key=${KEYS.rewind} icon="mdi:rewind" label="Rewind"></atv-repeat-button>
        <atv-repeat-button stretch .key=${KEYS.playPause} icon="mdi:play-pause" label="Play/Pause" accent></atv-repeat-button>
        <atv-repeat-button stretch .key=${KEYS.fastForward} icon="mdi:fast-forward" label="Fast forward"></atv-repeat-button>
      </div>
    `;
  }

  private renderSecondary() {
    return html`
      <div class="secondary">
        <atv-repeat-button stretch .key=${KEYS.menu} icon="mdi:menu" label="Menu" small></atv-repeat-button>
        <atv-repeat-button stretch .key=${KEYS.search} icon="mdi:magnify" label="Search" small></atv-repeat-button>
        ${this.config.apps?.length
          ? html`<button
              class="round small grow ${this.appsOpen ? 'on' : ''}"
              aria-label="Apps"
              title="Apps"
              @click=${() => {
                this.appsOpen = !this.appsOpen;
                if (this.appsOpen) {
                  this.keyboardOpen = false;
                  this.volumeOpen = false;
                }
              }}
            >
              <ha-icon icon="mdi:apps"></ha-icon>
            </button>`
          : nothing}
      </div>
    `;
  }

  protected render() {
    if (!this.config || !this.hass) return nothing;
    return html`
      <ha-card>
        <div class="remote ${this.controlsDisabled ? 'controls-off' : ''} ${this.offline ? 'offline' : ''}">
          ${this.pickerOpen
            ? html`<div class="picker-backdrop" @click=${() => (this.pickerOpen = false)}></div>`
            : nothing}
          <header class="hero">
            <div class="device">
              <div class="device-icon"><ha-icon icon="mdi:television"></ha-icon></div>
              <div class="meta">
                ${this.targets.length > 1
                  ? html`<div class="picker">
                      <button
                        class="title pick"
                        aria-haspopup="listbox"
                        aria-expanded=${this.pickerOpen ? 'true' : 'false'}
                        title="Choose TV"
                        @click=${() => (this.pickerOpen = !this.pickerOpen)}
                      >
                        <span>${this.cardTitle}</span>
                        <ha-icon icon="mdi:chevron-down"></ha-icon>
                      </button>
                      ${this.pickerOpen
                        ? html`<div class="picker-list" role="listbox" aria-label="TV">
                            ${this.targets.map(
                              (t) => html`<button
                                role="option"
                                aria-selected=${t.entity === this.target.entity ? 'true' : 'false'}
                                class=${t.entity === this.target.entity ? 'sel' : ''}
                                @click=${() => this.selectTarget(t.entity)}
                              >
                                <ha-icon
                                  icon=${t.entity === this.target.entity ? 'mdi:check' : 'mdi:television'}
                                ></ha-icon>
                                <span>${this.nameFor(t)}</span>
                              </button>`,
                            )}
                          </div>`
                        : nothing}
                    </div>`
                  : html`<div class="title">${this.cardTitle}</div>`}
                <div class="status ${this.statusKind}" title=${this.statusTitle}>
                  <span class="dot"></span>
                  <span>${this.statusText}</span>
                </div>
              </div>
            </div>
            ${this.config.show_power
              ? html`<atv-repeat-button .key=${KEYS.power} icon="mdi:power" label="Power" accent></atv-repeat-button>`
              : nothing}
          </header>

          <div class="navrow">
            ${this.config.show_keyboard
              ? html`<button
                  class="round lead ${this.keyboardActive ? 'on' : 'dim'}"
                  aria-label="Keyboard"
                  title="Keyboard"
                  @click=${() => {
                    this.keyboardOpen = !this.keyboardOpen;
                    if (this.keyboardOpen) {
                      this.appsOpen = false;
                      this.volumeOpen = false;
                    }
                  }}
                >
                  <ha-icon icon="mdi:keyboard"></ha-icon>
                </button>`
              : html`<span></span>`}
            ${this.renderSegmented()}
            ${this.config.show_volume !== false
              ? html`<button
                  class="round ${this.volumeOpen ? 'on' : ''}"
                  aria-label="Volume"
                  title="Volume"
                  @click=${() => {
                    this.volumeOpen = !this.volumeOpen;
                    if (this.volumeOpen) {
                      this.keyboardOpen = false;
                      this.appsOpen = false;
                    }
                  }}
                >
                  <ha-icon icon="mdi:volume-high"></ha-icon>
                </button>`
              : html`<span></span>`}
          </div>

          ${this.keyboardVisible
            ? html`<div class="kbd-inline">
                <atv-keyboard .mirror=${this.imeText} .mode=${this.config.text_mode ?? 'append'}></atv-keyboard>
              </div>`
            : nothing}

          <div class="surface">${this.renderSurface()}</div>

          ${this.nowPlaying
            ? html`<div class="nowplaying">
                <ha-icon icon="mdi:play-circle-outline"></ha-icon>
                <div class="np-meta">
                  <span class="np-title">${this.nowPlaying.primary}</span>
                  ${this.nowPlaying.secondary
                    ? html`<span class="np-sub">${this.nowPlaying.secondary}</span>`
                    : nothing}
                </div>
              </div>`
            : nothing}

          ${this.config.show_media ? this.renderTransport() : nothing}

          <div class="navbtns">
            <atv-repeat-button stretch .key=${KEYS.back} icon="mdi:arrow-left" label="Back"></atv-repeat-button>
            <atv-repeat-button stretch .key=${KEYS.home} icon="mdi:home-outline" label="Home"></atv-repeat-button>
          </div>

          ${this.renderSecondary()}
        </div>
      </ha-card>
      ${this.volumeOpen && this.config.show_volume !== false
        ? html`<div class="drawer" @click=${this.onDrawerClick}>
            <div class="sheet" role="dialog" aria-label="Volume">
              <div class="handle"></div>
              <div class="transport">
                <atv-repeat-button .key=${KEYS.volDown} icon="mdi:volume-medium" label="Volume down"></atv-repeat-button>
                <atv-repeat-button .key=${KEYS.mute} icon="mdi:volume-off" label="Mute"></atv-repeat-button>
                <atv-repeat-button .key=${KEYS.volUp} icon="mdi:volume-high" label="Volume up"></atv-repeat-button>
              </div>
            </div>
          </div>`
        : nothing}
      ${this.appsOpen && this.config.apps?.length
        ? html`<div class="drawer" @click=${this.onDrawerClick}>
            <div class="sheet" role="dialog" aria-label="Apps">
              <div class="handle"></div>
              <atv-app-grid .apps=${this.config.apps} .foreground=${this.foregroundPackage}></atv-app-grid>
            </div>
          </div>`
        : nothing}
    `;
  }

  static styles = css`
    :host {
      display: block;
      position: relative;
      --atv-radius: 20px;
      --atv-gap: 14px;
      --atv-surface: var(--card-background-color, #ffffff);
      --atv-surface-2: var(--secondary-background-color, rgba(127, 127, 127, 0.1));
      --atv-text: var(--primary-text-color, #1c1c1e);
      --atv-text-dim: var(--secondary-text-color, #6b7280);
      --atv-line: var(--divider-color, rgba(127, 127, 127, 0.2));
      --atv-accent: var(--primary-color, #4285f4);
      --atv-on-accent: var(--text-primary-color, #ffffff);
      --atv-shadow: 0 1px 2px rgba(0, 0, 0, 0.08), 0 10px 26px -14px rgba(0, 0, 0, 0.4);
    }
    ha-card {
      overflow: hidden;
      border-radius: var(--atv-radius);
    }
    .drawer {
      position: absolute;
      inset: 0;
      z-index: 6;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      box-sizing: border-box;
      border-radius: var(--atv-radius);
      background: color-mix(in srgb, #000 58%, transparent);
      backdrop-filter: blur(3px);
      -webkit-backdrop-filter: blur(3px);
      overflow: hidden;
    }
    .drawer.top {
      justify-content: flex-start;
      background: transparent;
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }
    .drawer .sheet {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 10px 14px 16px;
      border-radius: var(--atv-radius) var(--atv-radius) 0 0;
      background: var(--atv-surface);
      box-shadow: 0 -12px 30px -14px rgba(0, 0, 0, 0.55);
      animation: drawer-up 220ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    .drawer .handle {
      width: 40px;
      height: 4px;
      flex: none;
      margin: 0 auto;
      border-radius: 999px;
      background: var(--atv-line);
    }
    .drawer.top .sheet {
      border-radius: 0 0 var(--atv-radius) var(--atv-radius);
      box-shadow: 0 12px 30px -14px rgba(0, 0, 0, 0.4);
      animation: drawer-down 220ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    @keyframes drawer-up {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }
    @keyframes drawer-down {
      from {
        transform: translateY(-100%);
      }
      to {
        transform: translateY(0);
      }
    }
    .remote {
      display: flex;
      flex-direction: column;
      gap: var(--atv-gap);
      padding: 16px;
    }
    .remote .surface,
    .remote .transport,
    .remote .navbtns,
    .remote .secondary,
    .remote .navrow,
    .remote .kbd-inline,
    .remote .hero atv-repeat-button {
      transition: opacity 200ms ease, filter 200ms ease;
    }
    .remote.controls-off .surface,
    .remote.controls-off .transport,
    .remote.controls-off .navbtns,
    .remote.controls-off .secondary,
    .remote.controls-off .navrow,
    .remote.controls-off .kbd-inline {
      opacity: 0.4;
      filter: grayscale(0.55);
      pointer-events: none;
    }
    .remote.offline .hero atv-repeat-button {
      opacity: 0.4;
      filter: grayscale(0.55);
      pointer-events: none;
    }
    .hero {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .device {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }
    .device-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      flex: none;
      border-radius: 14px;
      color: var(--atv-on-accent);
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
    .device-icon ha-icon {
      --mdc-icon-size: 24px;
    }
    .meta {
      min-width: 0;
    }
    .picker {
      position: relative;
    }
    .title.pick {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      max-width: 100%;
      padding: 0;
      border: none;
      background: transparent;
      cursor: pointer;
      color: var(--atv-text);
      font-size: 17px;
      font-weight: 700;
      letter-spacing: 0.2px;
    }
    .title.pick span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .title.pick ha-icon {
      --mdc-icon-size: 20px;
      flex: none;
      color: var(--atv-text-dim);
    }
    .picker-backdrop {
      position: absolute;
      inset: 0;
      z-index: 5;
      border-radius: var(--atv-radius);
    }
    .picker-list {
      position: absolute;
      top: calc(100% + 6px);
      left: 0;
      z-index: 6;
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 180px;
      max-width: 260px;
      padding: 5px;
      border: 1px solid var(--atv-line);
      border-radius: 14px;
      background: var(--atv-surface);
      box-shadow: 0 10px 26px -10px rgba(0, 0, 0, 0.5);
      animation: kbd-in 140ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    .picker-list button {
      display: flex;
      align-items: center;
      gap: 9px;
      padding: 9px 10px;
      border: none;
      border-radius: 10px;
      background: transparent;
      cursor: pointer;
      text-align: left;
      font-size: 14px;
      font-weight: 600;
      color: var(--atv-text);
    }
    .picker-list button:hover {
      background: var(--atv-surface-2);
    }
    .picker-list button.sel {
      color: var(--atv-accent);
    }
    .picker-list button ha-icon {
      --mdc-icon-size: 20px;
      flex: none;
    }
    .picker-list button span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .title {
      font-size: 17px;
      font-weight: 700;
      letter-spacing: 0.2px;
      color: var(--atv-text);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .status {
      display: flex;
      align-items: center;
      gap: 7px;
      margin-top: 3px;
      font-size: 12.5px;
      color: var(--atv-text-dim);
    }
    .dot {
      width: 7px;
      height: 7px;
      flex: none;
      border-radius: 50%;
      background: var(--atv-text-dim);
      transition: background 200ms ease, box-shadow 200ms ease;
    }
    .status.on .dot {
      background: #34a853;
      box-shadow: 0 0 0 3px rgba(52, 168, 83, 0.18);
    }
    .status.offline .dot {
      background: var(--error-color, #db4437);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--error-color, #db4437) 18%, transparent);
    }
    .nowplaying {
      display: flex;
      align-items: center;
      gap: 9px;
      min-width: 0;
      padding: 8px 12px;
      border-radius: 12px;
      color: var(--atv-text-dim);
      background: var(--atv-surface-2);
    }
    .nowplaying ha-icon {
      --mdc-icon-size: 18px;
      flex: none;
    }
    .np-meta {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .np-title {
      font-size: 12.5px;
      font-weight: 600;
      color: var(--atv-text);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .np-sub {
      font-size: 11px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .navrow {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
    }
    .navrow > .round {
      justify-self: end;
    }
    .navrow > .round.lead {
      justify-self: start;
    }
    .navbtns {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: 1fr;
      gap: 12px;
    }
    .segmented {
      display: flex;
      gap: 4px;
      padding: 4px;
      width: 96px;
      flex: none;
      border-radius: 14px;
      background: var(--atv-surface-2);
      box-shadow:
        inset 0 2px 4px rgba(0, 0, 0, 0.35),
        inset 0 -1px 0 rgba(255, 255, 255, 0.08);
    }
    .segmented button {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 9px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-size: 13.5px;
      font-weight: 600;
      color: var(--atv-text-dim);
      background: transparent;
      transition: background 140ms ease, color 140ms ease, box-shadow 140ms ease;
    }
    .segmented button ha-icon {
      --mdc-icon-size: 18px;
    }
    .segmented button.active {
      color: var(--atv-text);
      background: var(--atv-surface);
      box-shadow:
        0 1px 2px rgba(0, 0, 0, 0.35),
        inset 0 1px 0 rgba(255, 255, 255, 0.5);
    }
    .kbd-inline {
      display: flex;
      animation: kbd-in 180ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    .kbd-inline > * {
      flex: 1 1 0;
      min-width: 0;
    }
    @keyframes kbd-in {
      from {
        opacity: 0;
        transform: translateY(-6px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .surface {
      display: flex;
      justify-content: center;
      padding: 2px 0;
    }    .surface > * {
      flex: 1 1 0;
      min-width: 0;
      max-width: 100%;
    }
    .transport {
      display: flex;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .remote .transport {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: 1fr;
      flex-wrap: nowrap;
    }
    .secondary {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: 1fr;
      align-items: center;
      gap: 6px;
      opacity: 0.85;
    }
    .round {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      flex: none;
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
    }
    .round:hover {
      background: var(--atv-line);
      transform: translateY(-1px);
    }
    .round:active {
      transform: translateY(1px) scale(0.96);
      box-shadow:
        inset 0 2px 5px rgba(0, 0, 0, 0.45),
        inset 0 -1px 0 rgba(255, 255, 255, 0.15);
    }
    .round.on {
      color: var(--atv-on-accent);
      border-color: transparent;
      background: var(--atv-accent);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.35),
        inset 0 -2px 3px -1px rgba(0, 0, 0, 0.25),
        0 0 0 6px color-mix(in srgb, var(--atv-accent) 18%, transparent);
    }
    .round.dim {
      opacity: 0.45;
    }
    .round.dim:hover {
      opacity: 0.75;
    }
    .round ha-icon {
      --mdc-icon-size: 22px;
    }
    .round.small {
      width: 42px;
      height: 42px;
    }
    .round.small ha-icon {
      --mdc-icon-size: 20px;
    }
    .round.grow {
      flex: 1 1 0;
      width: auto;
      min-width: 0;
      border-radius: 999px;
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
