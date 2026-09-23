import { describe, expect, it } from '@rstest/core';
import { checkWithRule } from './helpers/run-biome';

const RULE = 'enforce-attribute-order.grit';
const FILE_PATH = 'src/index.tsx';

describe('grit/enforce-attribute-order', () => {
  it('flags `key` written after `id`', () => {
    const result = checkWithRule(
      RULE,
      'const el = <Item id="x" key={k} />;\n',
      FILE_PATH,
    );

    expect(result.ok).toBe(false);
    expect(result.output).toContain('should be written before the `id`');
  });

  it('flags `className` written before `id`', () => {
    const result = checkWithRule(
      RULE,
      'const el = <div className="foo" id="bar" />;\n',
      FILE_PATH,
    );

    expect(result.ok).toBe(false);
    expect(result.output).toContain('should be written before the `className`');
  });

  it('flags `aria-*` written before `className`', () => {
    const result = checkWithRule(
      RULE,
      'const el = <nav aria-label="main" className="nav" />;\n',
      FILE_PATH,
    );

    expect(result.ok).toBe(false);
    expect(result.output).toContain('should be written after `className`');
  });

  it('flags `data-*` written before `className`', () => {
    const result = checkWithRule(
      RULE,
      'const el = <section data-testid="hero" className="hero" />;\n',
      FILE_PATH,
    );

    expect(result.ok).toBe(false);
    expect(result.output).toContain('should be written after `className`');
  });

  it('flags an event handler written before `className`', () => {
    const result = checkWithRule(
      RULE,
      'const el = <Button onClick={fn} className="btn" />;\n',
      FILE_PATH,
    );

    expect(result.ok).toBe(false);
    expect(result.output).toContain('should be written after `className`');
  });

  it('flags an event handler written before `id`', () => {
    const result = checkWithRule(
      RULE,
      'const el = <button type="button" onClick={handleSubmit} id="submit-btn" />;\n',
      FILE_PATH,
    );

    expect(result.ok).toBe(false);
    expect(result.output).toContain('should be written after `id`');
  });

  it('flags a non-adjacent violation (unrelated attribute in between)', () => {
    const result = checkWithRule(
      RULE,
      'const el = <div className="c" data-x="1" data-y="2" id="i" />;\n',
      FILE_PATH,
    );

    expect(result.ok).toBe(false);
    expect(result.output).toContain('should be written before the `className`');
  });

  it('does not flag correctly ordered attributes', () => {
    const result = checkWithRule(
      RULE,
      [
        'const a = <Item key={k} id="x" />;',
        'const b = <div id="bar" className="foo" />;',
        'const c = <nav className="nav" aria-label="main" />;',
        'const d = <section className="hero" data-testid="hero" />;',
        'const e = <Button className="btn" onClick={fn} />;',
        'const f = <button id="submit-btn" type="button" onClick={handleSubmit} />;',
        '',
      ].join('\n'),
      FILE_PATH,
    );

    expect(result.ok).toBe(true);
  });
});
