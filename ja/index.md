> For AI agents: the complete documentation index is available at /biome-plugins/ja/llms.txt, the full documentation bundle is available at /biome-plugins/ja/llms-full.txt.

# @logue/biome-plugins

カスタムBiome Lintルール

> GritQLベースのルールで、Rstackプロジェクト全体で一貫したTypeScriptの規約を強制します。 1つのパッケージで、すべてのテンプレートに対応します。


[はじめに →](/ja/guide/getting-started) | [ルール一覧](/ja/rules/)

## Features

- 🔍 **GritQL対応**: ルールはGritQLで記述され、Biome 2.xでネイティブに実行されます。 追加のランタイムやポストプロセッサは不要です。

- ⚡ **Rstackファースト**: Rslib、Rsbuild、Rspressベースのプロジェクト向けに設計されています。 Biomeが動作するあらゆるコードベースで動作します。

- 📐 **唯一の信頼できる情報源**: TypeScript の規約はここに集約されます。各プロジェクトの AGENTS.md に重複して記述する必要はありません。 ルールを一度追加すれば、すべてのテンプレートが恩恵を受けます。

- 🧩 **フレームワーク対応**: Vue、Tauri、または UI ライブラリ用の新しいルールは、追加の .grit ファイルとして挿入されます。 プロジェクトごとの設定を肥大化させることなく拡張できます。

