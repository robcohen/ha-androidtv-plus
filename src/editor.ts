import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { EDITOR_TAG } from './const';
import type { AndroidTVPlusApp, AndroidTVPlusCardConfig, AndroidTVPlusEntity, RemoteMode, TextMode } from './types';
import { discoverRemotes } from './targets';

type ToggleKey = 'show_power' | 'show_volume' | 'show_media' | 'show_keyboard' | 'haptic_feedback';

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

  private num(key: ToggleKey) {
    return this.config[key] !== false;
  }

  private toggle(key: ToggleKey, e: CustomEvent) {
    this.patch({ [key]: (e.target as unknown as { checked: boolean }).checked } as never);
  }

  private get apps(): AndroidTVPlusApp[] {
    return this.config.apps ?? [];
  }

  private get tvs(): Exclude<AndroidTVPlusEntity, string>[] {
    return (this.config.entities ?? []).map((e) => (typeof e === 'string' ? { entity: e } : e));
  }

  private setTvs(list: Exclude<AndroidTVPlusEntity, string>[]): void {
    this.patch({ entities: list.length ? list : undefined });
  }

  /** Every other `remote.*` entity in the system, plus any already-configured ones. */
  private get otherTvs(): string[] {
    return discoverRemotes(
      this.config.entity,
      this.tvs.map((t) => t.entity),
      Object.keys(this.hass?.states ?? {}),
    ).sort((a, b) => this.friendlyName(a).localeCompare(this.friendlyName(b)));
  }

  private friendlyName(entity: string): string {
    return (this.hass?.states[entity]?.attributes.friendly_name as string | undefined) ?? entity;
  }

  private tvIncluded(entity: string): boolean {
    return this.tvs.some((t) => t.entity === entity);
  }

  private toggleTv(entity: string, on: boolean): void {
    if (on) {
      if (!this.tvIncluded(entity)) this.setTvs([...this.tvs, { entity }]);
    } else {
      this.setTvs(this.tvs.filter((t) => t.entity !== entity));
    }
  }

  private setTvName(entity: string, name: string): void {
    this.patchTv(entity, { name: name || undefined });
  }

  private patchTv(entity: string, changes: Partial<Exclude<AndroidTVPlusEntity, string>>): void {
    this.setTvs(this.tvs.map((t) => (t.entity === entity ? { ...t, ...changes } : t)));
  }

  private tvTextMode(entity: string): TextMode {
    return this.tvs.find((t) => t.entity === entity)?.text_mode ?? this.config.text_mode ?? 'append';
  }

  private setTvTextMode(entity: string, mode: TextMode): void {
    this.patchTv(entity, { text_mode: mode });
  }

  /** App list for a slot: `null` is the card-level default, else a TV entity. */
  private appsFor(slot: string | null): AndroidTVPlusApp[] {
    if (slot === null) return this.apps;
    return this.tvs.find((t) => t.entity === slot)?.apps ?? [];
  }

  private setAppsFor(slot: string | null, apps: AndroidTVPlusApp[]): void {
    if (slot === null) {
      this.patch({ apps });
      return;
    }
    this.patchTv(slot, { apps: apps.length ? apps : undefined });
  }

  private updateApp(slot: string | null, index: number, changes: Partial<AndroidTVPlusApp>): void {
    const apps = this.appsFor(slot).map((app, i) => (i === index ? { ...app, ...changes } : app));
    this.setAppsFor(slot, apps);
  }

  private addApp(slot: string | null): void {
    this.setAppsFor(slot, [...this.appsFor(slot), { name: '', icon: 'mdi:apps', activity: '' }]);
  }

  private removeApp(slot: string | null, index: number): void {
    this.setAppsFor(slot, this.appsFor(slot).filter((_, i) => i !== index));
  }

  private moveApp(slot: string | null, index: number, delta: number): void {
    const apps = [...this.appsFor(slot)];
    const target = index + delta;
    if (target < 0 || target >= apps.length) return;
    [apps[index], apps[target]] = [apps[target], apps[index]];
    this.setAppsFor(slot, apps);
  }

  private setKind(slot: string | null, index: number, kind: 'activity' | 'service'): void {
    const app = this.appsFor(slot)[index];
    if (!app) return;
    if (kind === 'service' && app.service !== undefined) return;
    if (kind === 'activity' && app.service === undefined) return;
    this.updateApp(
      slot,
      index,
      kind === 'service'
        ? { service: '', activity: undefined, data: undefined }
        : { activity: '', service: undefined, data: undefined },
    );
  }

  private renderApp(slot: string | null, app: AndroidTVPlusApp, index: number) {
    const isService = app.service !== undefined;
    return html`
      <div class="app">
        <div class="app-head">
          <ha-icon icon=${app.icon || 'mdi:apps'}></ha-icon>
          <span class="app-name">${app.name || 'Untitled'}</span>
          <button class="icon-btn" title="Move up" ?disabled=${index === 0} @click=${() => this.moveApp(slot, index, -1)}>
            <ha-icon icon="mdi:arrow-up"></ha-icon>
          </button>
          <button
            class="icon-btn"
            title="Move down"
            ?disabled=${index === this.appsFor(slot).length - 1}
            @click=${() => this.moveApp(slot, index, 1)}
          >
            <ha-icon icon="mdi:arrow-down"></ha-icon>
          </button>
          <button class="icon-btn danger" title="Remove" @click=${() => this.removeApp(slot, index)}>
            <ha-icon icon="mdi:delete-outline"></ha-icon>
          </button>
        </div>

        <ha-textfield
          label="Name"
          .value=${app.name ?? ''}
          @change=${(e: Event) => this.updateApp(slot, index, { name: (e.target as HTMLInputElement).value })}
        ></ha-textfield>

        <ha-icon-picker
          .hass=${this.hass}
          .value=${app.icon ?? ''}
          label="Icon"
          @value-changed=${(e: CustomEvent) => this.updateApp(slot, index, { icon: e.detail.value })}
        ></ha-icon-picker>

        <div class="segmented small" role="radiogroup">
          <button
            role="radio"
            aria-checked=${!isService}
            class=${!isService ? 'active' : ''}
            @click=${() => this.setKind(slot, index, 'activity')}
          >
            Activity / URL
          </button>
          <button
            role="radio"
            aria-checked=${isService}
            class=${isService ? 'active' : ''}
            @click=${() => this.setKind(slot, index, 'service')}
          >
            Service
          </button>
        </div>

        ${isService
          ? html`
              <ha-textfield
                label="Service (e.g. script.tv_open_jellyfin)"
                .value=${app.service ?? ''}
                @change=${(e: Event) => this.updateApp(slot, index, { service: (e.target as HTMLInputElement).value })}
              ></ha-textfield>
              <ha-textfield
                label="Data (JSON, optional)"
                .value=${app.data ? JSON.stringify(app.data) : ''}
                @change=${(e: Event) => this.updateData(slot, index, (e.target as HTMLInputElement).value)}
              ></ha-textfield>
            `
          : html`
              <ha-textfield
                label="Activity / URL (e.g. netflix:// or https://…)"
                .value=${app.activity ?? ''}
                @change=${(e: Event) => this.updateApp(slot, index, { activity: (e.target as HTMLInputElement).value })}
              ></ha-textfield>
            `}

        <ha-textfield
          label="Package / app id (optional, for highlight)"
          .value=${app.package ?? ''}
          @change=${(e: Event) => this.updateApp(slot, index, { package: (e.target as HTMLInputElement).value || undefined })}
        ></ha-textfield>
      </div>
    `;
  }

  private renderAppsSection(slot: string | null, title: string, hint?: string) {
    const apps = this.appsFor(slot);
    return html`
      <div class=${slot === null ? 'section' : 'apps-group'}>
        <div class="section-head">
          <span class="section-title">${title}</span>
          <button class="add" @click=${() => this.addApp(slot)}>
            <ha-icon icon="mdi:plus"></ha-icon>Add app
          </button>
        </div>
        ${hint ? html`<p class="hint">${hint}</p>` : nothing}
        ${apps.length
          ? apps.map((app, i) => this.renderApp(slot, app, i))
          : html`<p class="hint">No app tiles yet — add one to fill the app drawer.</p>`}
      </div>
    `;
  }

  private updateData(slot: string | null, index: number, raw: string): void {
    const text = raw.trim();
    if (!text) {
      this.updateApp(slot, index, { data: undefined });
      return;
    }
    try {
      const parsed = JSON.parse(text);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        this.updateApp(slot, index, { data: parsed as Record<string, unknown> });
      } else {
        throw new Error('expected an object');
      }
    } catch {
      // Leave the previous value in place; the field shows the invalid text.
    }
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

        <div class="section">
          <div class="section-head">
            <span class="section-title">Other TVs</span>
          </div>
          <p class="hint">
            Tick any other <code>remote.*</code> entity to offer it in a selector in the card header. The remote
            entity above stays the default.
          </p>
          ${this.otherTvs.length
            ? this.otherTvs.map((entity) => {
                const included = this.tvIncluded(entity);
                const tv = this.tvs.find((t) => t.entity === entity);
                return html`
                  <div class="app">
                    <ha-formfield label=${this.friendlyName(entity)} class="tvrow">
                      <ha-switch
                        .checked=${included}
                        @change=${(e: CustomEvent) =>
                          this.toggleTv(entity, (e.target as unknown as { checked: boolean }).checked)}
                      ></ha-switch>
                    </ha-formfield>
                    ${included
                      ? html`
                          <ha-textfield
                            label="Name (optional)"
                            .value=${tv?.name ?? ''}
                            @input=${(e: Event) =>
                              this.setTvName(entity, (e.target as HTMLInputElement).value)}
                          ></ha-textfield>
                          <div class="field-group">
                            <span class="group-label">Text input mode</span>
                            <div class="segmented small" role="radiogroup">
                              ${(['append', 'replace'] as TextMode[]).map(
                                (t) => html`
                                  <button
                                    role="radio"
                                    aria-checked=${this.tvTextMode(entity) === t}
                                    class=${this.tvTextMode(entity) === t ? 'active' : ''}
                                    @click=${() => this.setTvTextMode(entity, t)}
                                  >
                                    ${t === 'append' ? 'Insert' : 'Replace field'}
                                  </button>
                                `,
                              )}
                            </div>
                          </div>
                          ${this.renderAppsSection(
                            entity,
                            'Apps',
                            'Overrides the default app list for this TV.',
                          )}
                        `
                      : nothing}
                  </div>
                `;
              })
            : html`<p class="hint">No other <code>remote.*</code> entities found.</p>`}
        </div>

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

        <div class="field-group">
          <span class="group-label">Text input mode</span>
          <div class="segmented small" role="radiogroup">
            ${(['append', 'replace'] as TextMode[]).map(
              (t) => html`
                <button
                  role="radio"
                  aria-checked=${(this.config.text_mode ?? 'append') === t}
                  class=${(this.config.text_mode ?? 'append') === t ? 'active' : ''}
                  @click=${() => this.patch({ text_mode: t })}
                >
                  ${t === 'append' ? 'Insert (default)' : 'Replace field'}
                </button>
              `,
            )}
          </div>
          <p class="hint">
            Most TVs insert each character at the cursor — keep “Insert”. Choose “Replace field” only if an app
            replaces the whole field on every keystroke (usually apps with their own on-screen keyboard).
          </p>
        </div>

        ${this.renderAppsSection(null, 'Apps')}
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
    .segmented.small button {
      padding: 7px;
      font-size: 13px;
      text-transform: none;
    }
    .hint {
      margin: 0;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .field-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .group-label {
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .section {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding-top: 6px;
      border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.4));
    }
    .apps-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .section-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .section-title {
      font-weight: 600;
    }
    .add {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border: 1px solid var(--primary-color);
      border-radius: 999px;
      background: transparent;
      color: var(--primary-color);
      cursor: pointer;
      font: inherit;
    }
    .app {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 12px;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.4));
      border-radius: 12px;
    }
    .app-head {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .app-name {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 600;
    }
    .icon-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: none;
      border-radius: 8px;
      background: transparent;
      color: var(--secondary-text-color);
      cursor: pointer;
    }
    .icon-btn:hover {
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
    }
    .icon-btn[disabled] {
      opacity: 0.35;
      cursor: default;
    }
    .icon-btn.danger:hover {
      color: var(--error-color, #b00020);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [EDITOR_TAG]: AndroidTVPlusCardEditor;
  }
}
