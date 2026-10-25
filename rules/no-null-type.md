> For AI agents: the complete documentation index is available at /biome-plugins/llms.txt, the full documentation bundle is available at /biome-plugins/llms-full.txt.

# no-null-type

warn

`| null` is forbidden in type annotation positions.
Use `undefined` / optional (`?`) to represent absence.

## What it checks

`| null` (or `null |`) appearing in:

- Function parameter type annotations
- Arrow function parameter type annotations
- Variable / property type annotations with an initializer

## Why

TypeScript has two ways to represent "no value": `null` and `undefined`.
Mixing them creates cognitive overhead at every call site:

```ts
// Caller now has to think: which should I pass — null or undefined?
function process(str: string | null) {}
```

`undefined` is TypeScript's canonical absence value:

- `Partial<T>` uses `undefined`, not `null`
- Optional chaining (`?.`) and nullish coalescing (`??`) were designed for `undefined`
- `JSON.stringify` omits `undefined` values but serialises `null` — which is the _only_ place `null` is appropriate (see exception below)

Committing to `undefined`-only simplifies every type in the codebase.

See [TypeScript coding guidelines](https://github.com/microsoft/TypeScript/wiki/Coding-guidelines#null-and-undefined) for detail.

## Examples

### ✗ Incorrect

```ts
function process(str: string | null) {}

const handler = (data: { value: string | null }) => {};

let current: Item | null = null;
```

### ✓ Correct

```ts
function process(str?: string) {}

const handler = (data: { value?: string }) => {};

let current: Item | undefined;
```

## Exception — JSON transformation boundary

Immediately after `JSON.parse`, the data may contain `null`.
Normalise it to `undefined` at the boundary before passing it downstream:

```ts
// ✓  Boundary layer — null is allowed here
const raw = JSON.parse(json) as { value: string | null };
const normalized = {
  value: raw.value ?? undefined,
};

// ✓  Downstream — undefined only
process(normalized.value);
```


## Source

[`grit/no-null-type.grit`](https://github.com/logue/biome-plugins/blob/main/grit/no-null-type.grit)
