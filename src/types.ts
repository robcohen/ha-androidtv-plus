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
 * per-TV companions (name, media player, IME sensor) so the card's extras can
 * follow the selected TV.
 */
export type AndroidTVPlusEntity =
  | string
  | {
      entity: string;
      name?: string;
      media_player?: string;
      ime_entity?: string;
    };

export interface AndroidTVPlusCardConfig extends LovelaceCardConfig {
  /** `remote.*` entity from the androidtv_remote integration. */
  entity: string;
  /**
   * Extra TVs offered in the header selector, in addition to `entity`. When
   * more than one TV is configured, the title becomes a dropdown. Each entry
   * may carry its own `media_player` / `ime_entity` so the status line, volume
   * and keyboard follow the selected TV.
   */
  entities?: AndroidTVPlusEntity[];
  /** Optional `media_player.*` entity, used to show the active app / volume. */
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
  /**
   * Optional `binary_sensor.*` that is `on` while the TV has a text field open
   * (e.g. `binary_sensor.tv_ime` from the androidtv_ime companion integration).
   * When set, the keyboard opens automatically while a field is focused, and
   * its `text` attribute is mirrored into the input.
   */
  ime_entity?: string;
  /** Vibrate on key press on supported devices. Defaults to true. */
  haptic_feedback?: boolean;
}
