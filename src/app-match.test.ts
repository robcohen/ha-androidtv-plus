import { describe, expect, it } from 'vitest';
import { appMatches } from './app-match';

describe('appMatches', () => {
  it('matches an explicit package id', () => {
    expect(appMatches({ name: 'Netflix', package: 'com.netflix.ninja' }, 'com.netflix.ninja')).toBe(
      true,
    );
    expect(appMatches({ name: 'Netflix', package: 'com.netflix.ninja' }, 'com.other.app')).toBe(
      false,
    );
  });

  it('matches a friendly name against a reverse-DNS foreground id', () => {
    expect(appMatches({ name: 'YouTube' }, 'com.google.android.youtube.tv')).toBe(true);
    expect(appMatches({ name: 'Spotify' }, 'com.spotify.tv.android')).toBe(true);
  });

  it('ignores URL schemes and short tokens', () => {
    // A scheme-only activity contributes no tokens, so the name still matches.
    expect(appMatches({ name: 'Netflix', activity: 'netflix://' }, 'com.netflix.ninja')).toBe(true);
    // "com" is under the 4-char threshold and must not match.
    expect(appMatches({ name: 'com' }, 'com.unrelated.package')).toBe(false);
  });

  it('is false without a foreground id', () => {
    expect(appMatches({ name: 'YouTube' }, undefined)).toBe(false);
    expect(appMatches({ name: 'YouTube' }, '')).toBe(false);
  });
});
