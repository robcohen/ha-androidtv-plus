import type { LovelaceCardConfig } from 'custom-card-helpers';

export type RemoteMode = 'dpad' | 'touch' | 'both';

export type TextMode = 'append' | 'replace';

export interface AndroidTVPlusApp {
  /** Label shown under the tile. */
  name?: string;
  /** mdi icon, e.g. `mdi:youtube`. */
  icon?: string;
  /** Deep link, URL, or application id passed to `remote.turn_on`. */
  activity?: string;
  /**
   * Optional Android package id (e.g. `com.netflix.ninja`). When set, the tile
   * is ringed if it is the foreground app. Without it, the card matches the
   * media player's `app_id` against the app's name/activity/service tokens.
   */
  package?: string;
  /**
   * Optional service to call instead of launching an activity, e.g.
   * `script.tv_open_jellyfin`. Use for apps that register no deep link and
   * cannot be launched by package id.
   */
  service?: string;
  /** Service data, when `service` is set. */
  data?: Record<string, unknown>;
}

/**
 * A selectable TV. Either a bare `remote.*` entity id, or an object with
 * per-TV settings (name, media player, apps, text mode) so the card's extras
 * follow the selected TV.
 */
export interface AndroidTVPlusTarget {
  /** `remote.*` entity id. */
  entity: string;
  /** Label shown in the picker. Defaults to the entity's friendly name. */
  name?: string;
  /** `media_player.*` for this TV; derived from the entity name if omitted. */
  media_player?: string;
  /** App tiles for this TV, overriding the card-level `apps`. */
  apps?: AndroidTVPlusApp[];
  /** Text delivery mode for this TV, overriding the card-level `text_mode`. */
  text_mode?: TextMode;
}

export type AndroidTVPlusEntity = string | AndroidTVPlusTarget;

export interface AndroidTVPlusCardConfig extends LovelaceCardConfig {
  /** `remote.*` entity from the androidtv_remote integration (the default TV). */
  entity: string;
  /**
   * Extra TVs offered in the header selector, in addition to `entity`. When
   * more than one TV is configured, the title becomes a dropdown. Each entry
   * may carry its own `media_player`, `apps` and `text_mode` so the status
   * line, tiles and keyboard follow the selected TV.
   */
  entities?: AndroidTVPlusEntity[];
  /** Optional `media_player.*` entity for the default TV. */
  media_player?: string;
  /** Card title. Defaults to the remote entity's friendly name. */
  name?: string;
  /** Which navigation surface(s) to show. Defaults to `both`. */
  mode?: RemoteMode;
  /** App shortcut tiles. */
  apps?: AndroidTVPlusApp[];
  /** Show the power button. Defaults to true. */
  show_power?: boolean;
  /** Show the volume rocker. Defaults to true. */
  show_volume?: boolean;
  /** Show the media transport row. Defaults to true. */
  show_media?: boolean;
  /** Show the keyboard / text input dialog. Defaults to true. */
  show_keyboard?: boolean;
  /**
   * How typed text is delivered to the TV. Most devices (including the Google
   * TV Streamer with its on-screen keyboard hidden) insert each character at
   * the cursor, so `append` (default) sends only the new characters. Some apps
   * show their own on-screen keyboard and replace the whole field on every
   * edit; for those, set `replace` and the card sends the full string each time.
   */
  text_mode?: TextMode;
  /** Vibrate on key press on supported devices. Defaults to true. */
  haptic_feedback?: boolean;
}
