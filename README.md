# Android TV Plus

A polished Home Assistant Lovelace card for Android TV — a real remote, not grid of YAML buttons.

It gives you **two navigation styles** in one card:

- **D-pad** — a classic directional pad with press-and-hold key repeat.
- **Touch** — a gesture surface: swipe to move the focus ring, tap to select, with continuous drag support.

Plus app shortcut tiles, media transport, a volume rocker, power, and a keyboard for
typing into whichever text field is focused on the TV.

> Works with the built-in [`androidtv_remote`](https://www.home-assistant.io/integrations/androidtv_remote/)
> integration. It drives the `remote.*` entity via `remote.send_command` /
> `remote.turn_on`, so no extra backend is required.

## Install (HACS)

1. HACS → **Frontend** → three-dot menu → **Custom repositories**.
2. Add `https://github.com/robcohen/ha-androidtv-plus` as type **Lovelace**.
3. Install **Android TV Plus**, then reload your browser.

Or add the resource manually: **Settings → Dashboards → Resources → Add**,
URL `/hacsfiles/ha-androidtv-plus/androidtv-plus-card.js`, type **JavaScript Module**.

## Usage

Add a card and pick **Android TV Plus**, or use YAML:

```yaml
type: custom:androidtv-plus-card
entity: remote.living_room_tv   # required: a remote.* from androidtv_remote
mode: both                      # both | dpad | touch
apps:
  - name: YouTube
    icon: mdi:youtube
    activity: https://www.youtube.com
  - name: Netflix
    icon: mdi:netflix
    activity: netflix://
```

### Options

| Option            | Type    | Default | Description                                             |
| ----------------- | ------- | ------- | ------------------------------------------------------- |
| `entity`          | string  | —       | **Required.** `remote.*` entity from `androidtv_remote`. |
| `media_player`    | string  | —       | Optional `media_player.*` (e.g. the Cast entity).       |
| `name`            | string  | entity  | Card title.                                             |
| `mode`            | string  | `both`  | `both`, `dpad`, or `touch`.                             |
| `apps`            | list    | `[]`    | App tiles (`name`, `icon`, `activity`).                 |
| `show_power`      | boolean | `true`  | Show the power button.                                  |
| `show_volume`     | boolean | `true`  | Show the volume rocker.                                 |
| `show_media`      | boolean | `true`  | Show the media transport row.                           |
| `show_keyboard`   | boolean | `true`  | Show the keyboard / text input.                         |
| `haptic_feedback` | boolean | `true`  | Vibrate on supported devices.                           |

### Keyboard

The keyboard sends text to the TV's focused input field via `remote.send_command`
with a `text:` prefix (a feature of the `androidtv_remote` integration), alongside
`DEL` and `ENTER` keys. It is send-only; reading the on-screen field back is a
separate, upstream-tracked effort.

## Development

```bash
npm install
npm run typecheck
npm run build      # emits dist/androidtv-plus-card.js
npm run watch      # rebuild on change
```

`dist/androidtv-plus-card.js` is committed because HACS serves it directly.

## License

MIT
