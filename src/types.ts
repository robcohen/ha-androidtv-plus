import type { LovelaceCardConfig } from 'custom-card-helpers';

export type RemoteMode = 'dpad' | 'touch' | 'both';

export interface AndroidTVPlusApp {
  /** Label shown under the tile. */
  name?: string;
  /** mdi icon, e.g. `mdi:youtube`. */
  icon?: string;
  /** Deep link, URL, or application id passed to `remote.turn_on`. */
  activity: string;
}

export interface AndroidTVPlusCardConfig extends LovelaceCardConfig {
  /** `remote.*` entity from the androidtv_remote integration. */
  entity: string;
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
  /** Vibrate on key press on supported devices. Defaults to true. */
  haptic_feedback?: boolean;
}
