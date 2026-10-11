import type { TextMode } from './types';

export type EditAction = { type: 'text'; text: string } | { type: 'del'; count: number };

/**
 * Translate a change to the input field into the minimal sequence of TV
 * operations, given how the TV applies edits.
 *
 * - `append` (default): the TV inserts each character at the cursor, so only
 *   the delta is sent. Pasting or replacing a selection sends backspaces for
 *   what we previously sent, then the new text.
 * - `replace`: the TV replaces the whole field on every edit, so the full value
 *   is sent each time (and backspaces when the field is emptied).
 */
export function computeEdit(prev: string, next: string, mode: TextMode): EditAction[] {
  if (mode === 'replace') {
    if (next.length === 0) {
      return prev.length ? [{ type: 'del', count: prev.length }] : [];
    }
    return [{ type: 'text', text: next }];
  }
  if (next.length > prev.length && next.startsWith(prev)) {
    return [{ type: 'text', text: next.slice(prev.length) }];
  }
  if (prev.startsWith(next)) {
    const count = prev.length - next.length;
    return count ? [{ type: 'del', count }] : [];
  }
  // Paste / select-replace while the TV is in append mode.
  const actions: EditAction[] = prev.length ? [{ type: 'del', count: prev.length }] : [];
  if (next) actions.push({ type: 'text', text: next });
  return actions;
}
