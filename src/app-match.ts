import type { AndroidTVPlusApp } from './types';

/**
 * Whether a configured app tile corresponds to a foreground app package id.
 * Prefers an explicit `package`, otherwise matches against the app's
 * name/activity/service tokens (schemes and short tokens like `com`/`app` are
 * ignored so reverse-DNS ids still match a friendly name).
 */
export function appMatches(app: AndroidTVPlusApp, foreground?: string): boolean {
  const fg = foreground?.toLowerCase();
  if (!fg) return false;
  if (app.package) return app.package.toLowerCase() === fg;
  const tokens = [app.name, app.activity, app.service]
    .filter((s): s is string => !!s)
    .join(' ')
    .toLowerCase()
    .replace(/[a-z][a-z0-9+.-]*:\/\//g, ' ')
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length >= 4);
  return tokens.some((t) => fg.includes(t));
}
