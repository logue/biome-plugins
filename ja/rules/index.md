> For AI agents: the complete documentation index is available at /biome-plugins/ja/llms.txt, the full documentation bundle is available at /biome-plugins/ja/llms-full.txt.

# ルール一覧

すべてのルールは [GritQL](https://docs.grit.io/) で記述され、Biome プラグインとして読み込まれます。
各ルールファイルは独立しているため、必要なものだけを選んで使用できます。

## 利用可能なルール

| ルール                                                                           | 重大度                                             | 検出内容                                |
| ----------------------------------------------------------------------------- | ----------------------------------------------- | ----------------------------------- |
| [enforce-attribute-order](/biome-plugins/ja/rules/enforce-attribute-order.md) | <cds-tag type="purple" size="sm">warn</cds-tag> | JSX 属性のグループ順序違反を検出                  |
| [enforce-pure-src](/biome-plugins/ja/rules/enforce-pure-src.md)               | <cds-tag type="red" size="sm">error</cds-tag>   | `src/` 内への Storybook / デモ用インポートを禁止  |
| [no-null-type](/biome-plugins/ja/rules/no-null-type.md)                       | <cds-tag type="purple" size="sm">warn</cds-tag> | 型アノテーションでの `\| null` を検出            |
| [prefer-union-over-enum](/biome-plugins/ja/rules/prefer-union-over-enum.md)   | <cds-tag type="red" size="sm">error</cds-tag>   | `enum` および `const enum` を禁止         |
| [vue-multi-word-filename](/biome-plugins/ja/rules/vue-multi-word-filename.md) | <cds-tag type="red" size="sm">error</cds-tag>   | Vue ファイル名が複数ワード PascalCase でない場合を検出 |

## ルールファイルの場所

ルールはパッケージルートの `grit/` ディレクトリに配置されています。
`biome.jsonc` でのインポートパス:

```
node_modules/@logue/biome-plugins/grit/enforce-attribute-order.grit
node_modules/@logue/biome-plugins/grit/enforce-pure-src.grit
node_modules/@logue/biome-plugins/grit/no-null-type.grit
node_modules/@logue/biome-plugins/grit/prefer-union-over-enum.grit
node_modules/@logue/biome-plugins/grit/vue-multi-word-filename.grit
```
