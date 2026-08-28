// prefer-union-over-enum — INVALID cases
// Expected: 3 diagnostics (error)

// ✗ 通常の enum
enum Color {
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
}

// ✗ const enum（コンパイル時インライン展開されるが、依然禁止）
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

// ✗ 数値 enum
enum Status {
  Pending = 0,
  Active = 1,
  Inactive = 2,
}
