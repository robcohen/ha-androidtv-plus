import { describe, expect, it } from 'vitest';
import { computeEdit } from './edit';

describe('computeEdit (append mode)', () => {
  it('sends only the appended characters', () => {
    expect(computeEdit('', 'abc', 'append')).toEqual([{ type: 'text', text: 'abc' }]);
    expect(computeEdit('ab', 'abc', 'append')).toEqual([{ type: 'text', text: 'c' }]);
  });

  it('sends backspaces when shortening', () => {
    expect(computeEdit('abc', 'ab', 'append')).toEqual([{ type: 'del', count: 1 }]);
    expect(computeEdit('abc', '', 'append')).toEqual([{ type: 'del', count: 3 }]);
  });

  it('does nothing when unchanged', () => {
    expect(computeEdit('abc', 'abc', 'append')).toEqual([]);
  });

  it('deletes then retypes on paste / select-replace', () => {
    expect(computeEdit('abc', 'xyz', 'append')).toEqual([
      { type: 'del', count: 3 },
      { type: 'text', text: 'xyz' },
    ]);
    expect(computeEdit('', 'xyz', 'append')).toEqual([{ type: 'text', text: 'xyz' }]);
  });
});

describe('computeEdit (replace mode)', () => {
  it('sends the whole value on every edit', () => {
    expect(computeEdit('', 'abc', 'replace')).toEqual([{ type: 'text', text: 'abc' }]);
    expect(computeEdit('abc', 'abcd', 'replace')).toEqual([{ type: 'text', text: 'abcd' }]);
    expect(computeEdit('abc', 'x', 'replace')).toEqual([{ type: 'text', text: 'x' }]);
  });

  it('backspaces to empty and no-ops when already empty', () => {
    expect(computeEdit('abc', '', 'replace')).toEqual([{ type: 'del', count: 3 }]);
    expect(computeEdit('', '', 'replace')).toEqual([]);
  });
});
