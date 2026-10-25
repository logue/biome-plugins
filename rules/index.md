> For AI agents: the complete documentation index is available at /biome-plugins/llms.txt, the full documentation bundle is available at /biome-plugins/llms-full.txt.

# Rules

All rules are written in [GritQL](https://docs.grit.io/) and loaded as Biome plugins.
Each rule file is independent — load only what you need.

## Available Rules

| Rule                                                                       | Severity                                        | What it checks                              |
| -------------------------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------- |
| [enforce-attribute-order](/biome-plugins/rules/enforce-attribute-order.md) | <cds-tag type="purple" size="sm">warn</cds-tag> | JSX attributes must follow group order      |
| [enforce-pure-src](/biome-plugins/rules/enforce-pure-src.md)               | <cds-tag type="red" size="sm">error</cds-tag>   | No Storybook / demo imports inside `src/`   |
| [no-null-type](/biome-plugins/rules/no-null-type.md)                       | <cds-tag type="purple" size="sm">warn</cds-tag> | `\| null` in type annotation positions      |
| [prefer-union-over-enum](/biome-plugins/rules/prefer-union-over-enum.md)   | <cds-tag type="red" size="sm">error</cds-tag>   | `enum` and `const enum` are forbidden       |
| [vue-multi-word-filename](/biome-plugins/rules/vue-multi-word-filename.md) | <cds-tag type="red" size="sm">error</cds-tag>   | Vue filenames must be multi-word PascalCase |

## Rule Locations

Rules live in the `grit/` directory at the root of this package.
Import paths for `biome.jsonc`:

```
node_modules/@logue/biome-plugins/grit/enforce-attribute-order.grit
node_modules/@logue/biome-plugins/grit/enforce-pure-src.grit
node_modules/@logue/biome-plugins/grit/no-null-type.grit
node_modules/@logue/biome-plugins/grit/prefer-union-over-enum.grit
node_modules/@logue/biome-plugins/grit/vue-multi-word-filename.grit
```
