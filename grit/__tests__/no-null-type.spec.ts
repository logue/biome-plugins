import { describe, expect, it } from '@rstest/core';

import { checkWithRule } from './helpers/run-biome';

const RULE = 'no-null-type.grit';
const MESSAGE = 'Avoid `null` in type annotations.';

describe('grit/no-null-type', () => {
  it('flags a `| null` function parameter', () => {
    const result = checkWithRule(
      RULE,
      'function process(str: string | null) {\n  return str;\n}\n',
    );

    expect(result.ok).toBe(false);
    expect(result.output).toContain(MESSAGE);
  });

  it('flags a `null |` arrow function parameter', () => {
    const result = checkWithRule(
      RULE,
      'const process = (str: null | string) => str;\n',
    );

    expect(result.ok).toBe(false);
    expect(result.output).toContain(MESSAGE);
  });

  it('flags a `| null` variable declaration', () => {
    const result = checkWithRule(RULE, 'let value: string | null = null;\n');

    expect(result.ok).toBe(false);
    expect(result.output).toContain(MESSAGE);
  });

  it('flags a `| null` class field', () => {
    const result = checkWithRule(
      RULE,
      'class Widget {\n  label: string | null = null;\n}\n',
    );

    expect(result.ok).toBe(false);
    expect(result.output).toContain(MESSAGE);
  });

  it('does not flag an optional parameter', () => {
    const result = checkWithRule(
      RULE,
      'function process(str?: string) {\n  return str;\n}\n',
    );

    expect(result.ok).toBe(true);
    expect(result.output).not.toContain(MESSAGE);
  });

  it('does not flag the documented JSON transformation boundary exception', () => {
    const result = checkWithRule(
      RULE,
      'const normalized = { value: apiData.value ?? undefined };\n',
    );

    expect(result.ok).toBe(true);
    expect(result.output).not.toContain(MESSAGE);
  });
});
