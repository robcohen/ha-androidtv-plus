export const CARD_VERSION = '0.2.1';
export const CARD_TAG = 'androidtv-plus-card';
export const EDITOR_TAG = 'androidtv-plus-card-editor';

/**
 * Android TV key names accepted by `remote.send_command`, as documented for the
 * Home Assistant `androidtv_remote` integration.
 */
export const KEYS = {
  up: 'DPAD_UP',
  down: 'DPAD_DOWN',
  left: 'DPAD_LEFT',
  right: 'DPAD_RIGHT',
  center: 'DPAD_CENTER',
  back: 'BACK',
  home: 'HOME',
  menu: 'MENU',
  search: 'SEARCH',
  power: 'POWER',
  del: 'DEL',
  enter: 'ENTER',
  volUp: 'VOLUME_UP',
  volDown: 'VOLUME_DOWN',
  mute: 'MUTE',
  playPause: 'MEDIA_PLAY_PAUSE',
  stop: 'MEDIA_STOP',
  next: 'MEDIA_NEXT',
  prev: 'MEDIA_PREVIOUS',
  rewind: 'MEDIA_REWIND',
  fastForward: 'MEDIA_FAST_FORWARD',
} as const;

export type KeyName = (typeof KEYS)[keyof typeof KEYS];

/** Initial delay before a held button starts repeating. */
export const REPEAT_DELAY_MS = 450;
/** Interval between repeats while a button is held. */
export const REPEAT_INTERVAL_MS = 150;
/** Hold time before a select press becomes a long press (START_LONG/END_LONG). */
export const LONG_PRESS_MS = 500;
/** Minimum distance (px) for a touch-surface swipe to register a direction. */
export const SWIPE_THRESHOLD_PX = 28;
/** Maximum movement (px) still treated as a tap/select. */
export const TAP_THRESHOLD_PX = 18;
/** Movement (px) that emits the next direction during a continuous drag. */
export const SWIPE_STEP_PX = 34;
