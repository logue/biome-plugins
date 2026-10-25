> For AI agents: the complete documentation index is available at /biome-plugins/llms.txt, the full documentation bundle is available at /biome-plugins/llms-full.txt.

# Getting Started

## Prerequisites

- [Biome](https://biomejs.dev/) 2.5 or later
- pnpm 10 or later (or npm / yarn)

## Installation

```sh
pnpm add -D @logue/biome-plugins
```

## Configuration

Register the rules you want in your `biome.jsonc`:

```jsonc
{
  "$schema": "https://biomejs.dev/schemas/2.5.9/schema.json",
  "plugins": [
    {
      "path": "./node_modules/@logue/biome-plugins/grit/enforce-pure-src.grit",
    },
    {
      "path": "./node_modules/@logue/biome-plugins/grit/prefer-union-over-enum.grit",
    },
    {
      "path": "./node_modules/@logue/biome-plugins/grit/no-null-type.grit",
    },
  ],
}
```


## Verify

Run Biome to confirm the rules are active:

```sh
pnpm biome lint .
```

Write a deliberate violation and check that a diagnostic appears:

```ts
// should trigger prefer-union-over-enum → error
enum Color {
  Red = "red",
}
```

## Selective Loading

You can load only the rules you need. Each `.grit` file is independent:

```jsonc
{
  "plugins": [
    // Load only the enum rule
    {
      "path": "./node_modules/@logue/biome-plugins/grit/prefer-union-over-enum.grit",
    },
  ],
}
```
