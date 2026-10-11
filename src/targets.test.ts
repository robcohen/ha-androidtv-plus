import { describe, expect, it } from 'vitest';
import type { AndroidTVPlusCardConfig } from './types';
import { discoverRemotes, resolveTargets } from './targets';

function config(
  partial: Partial<AndroidTVPlusCardConfig>,
): AndroidTVPlusCardConfig {
  return { type: 'custom:androidtv-plus-card', entity: '', ...partial };
}

describe('resolveTargets', () => {
  it('puts the default entity first and keeps extra strings', () => {
    const t = resolveTargets(
      config({
        entity: 'remote.primary',
        entities: ['remote.second', { entity: 'remote.third', name: 'Den' }],
      }),
    );
    expect(t.map((x) => x.entity)).toEqual([
      'remote.primary',
      'remote.second',
      'remote.third',
    ]);
    expect(t[2].name).toBe('Den');
  });

  it('lets the default inherit card-level media_player, apps and text_mode', () => {
    const t = resolveTargets(
      config({
        entity: 'remote.primary',
        media_player: 'media_player.primary',
        text_mode: 'replace',
        apps: [{ name: 'Netflix' }],
      }),
    );
    expect(t[0].media_player).toBe('media_player.primary');
    expect(t[0].text_mode).toBe('replace');
    expect(t[0].apps).toEqual([{ name: 'Netflix' }]);
  });

  it('does not leak card-level defaults onto extra TVs', () => {
    const t = resolveTargets(
      config({
        entity: 'remote.primary',
        media_player: 'media_player.primary',
        text_mode: 'replace',
        apps: [{ name: 'Netflix' }],
        entities: ['remote.extra'],
      }),
    );
    expect(t[1].media_player).toBeUndefined();
    expect(t[1].text_mode).toBeUndefined();
    expect(t[1].apps).toBeUndefined();
  });

  it('keeps per-TV overrides on an extra entry', () => {
    const t = resolveTargets(
      config({
        entity: 'remote.primary',
        entities: [
          {
            entity: 'remote.extra',
            media_player: 'media_player.extra',
            text_mode: 'append',
            apps: [{ name: 'Plex' }],
          },
        ],
      }),
    );
    expect(t[1].media_player).toBe('media_player.extra');
    expect(t[1].text_mode).toBe('append');
    expect(t[1].apps).toEqual([{ name: 'Plex' }]);
  });

  it('drops duplicates and non-remote entities', () => {
    const t = resolveTargets(
      config({
        entity: 'remote.primary',
        entities: ['remote.primary', 'media_player.nope', 'remote.second'],
      }),
    );
    expect(t.map((x) => x.entity)).toEqual(['remote.primary', 'remote.second']);
  });
});

describe('discoverRemotes', () => {
  it('excludes the primary and de-duplicates', () => {
    const out = discoverRemotes('remote.primary', ['remote.second'], [
      'remote.primary',
      'remote.second',
      'remote.third',
    ]);
    expect(out).toEqual(['remote.second', 'remote.third']);
  });

  it('includes a configured TV even when it is not in the state machine', () => {
    expect(discoverRemotes('remote.primary', ['remote.gone'], [])).toEqual([
      'remote.gone',
    ]);
  });

  it('ignores non-remote entities', () => {
    expect(
      discoverRemotes('remote.primary', [], [
        'media_player.x',
        'switch.y',
        'remote.second',
      ]),
    ).toEqual(['remote.second']);
  });
});
