# AGENTS.md — @logue/biome-plugins

This package provides GritQL-based custom lint rules for Rstack-based TypeScript projects.
Rules here are shared across all templates (library, Vue, Tauri, etc.) so that coding
conventions live in one place and AGENTS.md files in individual projects stay lean.

## Lint Rules

Rules live in `grit/` and are loaded via `biome.jsonc` → `plugins`.

### `enforce-pure-src`

`src/` must contain only production code and co-located unit tests.
Storybook, demo, and sandbox content must live outside `src/` (e.g. `src-docs/`, `src-demo/`)
and reference the library as an external module.

### `prefer-union-over-enum` (severity: error)

`enum` and `const enum` are forbidden. Use union types.

```ts
// ✗
enum Color { Red = 'red', Green = 'green' }
const enum Direction { Up, Down }

// ✓
export type Color = 'red' | 'green';
export const colors: Color[] = ['red', 'green'];
export const Color: Record<Color, ColorValue> = { red: ..., green: ... };
```

Why: enums generate runtime code, hurt tree-shaking, and introduce implicit numeric
mappings that union types avoid entirely.

### `no-null-type` (severity: warn)

`| null` is forbidden in type annotation positions. Use `undefined` / optional (`?`).

```ts
// ✗
function process(str: string | null) {}
function handler(data: { value: string | null }) {}

// ✓
function process(str?: string) {}
function handler(data: { value?: string }) {}
```

**Exception — JSON transformation boundary only:**

```ts
// Immediately after JSON.parse: normalize null → undefined
const apiData = JSON.parse(json);
const normalized = { value: apiData.value ?? undefined };

// Downstream code uses undefined only
process(normalized.value);
```

Why: `undefined` is TypeScript's canonical "no value" (`Partial<T>` uses it). Mixing
`null` creates two ways to express absence and complicates every consuming type.

## TypeScript Conventions

Conventions that cannot be mechanically enforced by linting but must be followed.

### General Rules

- **No `any`** — use `unknown` and narrow with type guards
- **Explicit return types** on all exported functions
- **Unused variables** — prefix with underscore: `_value`, `_error`
- **Array syntax** — `string[]`, not `Array<string>`
- **Generic constructors** — left-hand side style: `const map: Map<string, User> = new Map()`
- **Do not suppress TypeScript errors** — `@ts-ignore` requires a written justification comment

### Prefer `type` over `interface`

```ts
// types/Options.d.ts
export type Options = {
  someText: string;
  someNumber: number;
};
```

Pair the type with its default values in a `.ts` sibling:

```ts
// types/Options.ts
import type { Options } from "./Options.d.ts";

/** Default configuration */
export const Options: Options = {
  someText: "white",
  someNumber: 1,
};
```

The variable name matches the type name so callers do `import { Options }` for both.

Use `interface` when:

- Deep inheritance hierarchy (3+ levels)
- Multiple implementations with clear contract inheritance

Why `type` over `interface`: tree-shaking friendly (especially for unions), single
import point for type and default value, default values are visibly paired.

### Naming Conventions

| Target             | Style                   | Example                |
| ------------------ | ----------------------- | ---------------------- |
| Types / Interfaces | PascalCase              | `RspackOptions`        |
| Classes            | PascalCase              | `Compiler`             |
| Functions          | camelCase               | `createCompiler`       |
| Variables          | camelCase               | `compiler`             |
| Constants          | SCREAMING_SNAKE_CASE    | `MAX_RETRIES`          |
| Files              | camelCase or PascalCase | match main export name |

### Async / Await

- Prefer `async/await` over raw Promise chains
- Wrap async operations in `try/catch`
- Use `Promise.all` for concurrent independent operations

### Error Handling

Use the standard hierarchy:

- `TypeError` — wrong argument type
- `RangeError` — value outside valid range
- `Error` — unexpected / unrecoverable state

Define a **custom exception class only when**:

- The error needs actionable context (error codes, recovery hints)
- Downstream code needs to catch-and-handle a specific failure type
- Multiple failure modes require differentiation

### Code Documentation

- `//` for single-line comments; `/* */` for multi-line
- All **exported** symbols require JSDoc (`@param`, `@returns`, `@example`, `@throws`)
- Non-exported internals may skip JSDoc
- Comments explain _why_, not _what_

## Formatting

Enforced by `biome.jsonc` in each project. Canonical values:

- **Indentation**: 2 spaces
- **Semicolons**: required
- **Quotes**: single quotes
- **Formatter**: Biome
- **Linter**: Rslint + Biome (with these plugins)

## Adding Rules for New Frameworks

When adding Vue, Tauri, or UI-library specific rules, add a new `.grit` file under
`grit/` and document it in this file under a new `### rule-name` heading. The consuming
project's `AGENTS.md` references this file rather than duplicating the rule rationale.
