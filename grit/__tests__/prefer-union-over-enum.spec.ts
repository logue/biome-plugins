import { describe, expect, it } from '@rstest/core';

import { checkWithRule } from './helpers/run-biome';

const RULE = 'prefer-union-over-enum.grit';
const MESSAGE = '`enum` (including `const enum`) is forbidden.';

describe('grit/prefer-union-over-enum', () => {
  it('flags a plain enum', () => {
    const result = checkWithRule(
      RULE,
      "export enum Color {\n  Red = 'red',\n  Green = 'green',\n}\n",
    );

    expect(result.ok).toBe(false);
    expect(result.output).toContain(MESSAGE);
  });

  it('flags a const enum', () => {
    const result = checkWithRule(
      RULE,
      'export const enum Direction {\n  Up,\n  Down,\n}\n',
    );

    expect(result.ok).toBe(false);
    expect(result.output).toContain(MESSAGE);
  });

  it('does not flag an equivalent union type', () => {
    const result = checkWithRule(
      RULE,
      "export type Color = 'red' | 'green';\n",
    );

    expect(result.ok).toBe(true);
    expect(result.output).not.toContain(MESSAGE);
  });
});
