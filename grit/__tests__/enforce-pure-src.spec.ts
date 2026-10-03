import { describe, expect, it } from '@rstest/core';

import { checkWithRule } from './helpers/run-biome';

const RULE = 'enforce-pure-src.grit';
const MESSAGE =
  'The `src` directory may only contain production code and test code.';

describe('grit/enforce-pure-src', () => {
  it.each([
    'storybook',
    'demo',
    'sandbox',
    'preview',
  ])('flags a %s import from inside src/', (keyword) => {
    const result = checkWithRule(RULE, `import Foo from './Foo.${keyword}';\n`);

    expect(result.ok).toBe(false);
    expect(result.output).toContain(MESSAGE);
  });

  it('does not flag a normal import from inside src/', () => {
    const result = checkWithRule(RULE, "import Button from './Button';\n");

    expect(result.ok).toBe(true);
    expect(result.output).not.toContain(MESSAGE);
  });

  it('does not flag a Storybook import outside src/ (e.g. src-demo/)', () => {
    const result = checkWithRule(
      RULE,
      "import Button from './Button.stories';\n",
      'src-demo/index.ts',
    );

    expect(result.ok).toBe(true);
    expect(result.output).not.toContain(MESSAGE);
  });
});
