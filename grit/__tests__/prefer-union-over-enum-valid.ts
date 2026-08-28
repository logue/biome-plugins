// prefer-union-over-enum — VALID cases
// Expected: 0 diagnostics

// ✓ Union 型（コンパイル時に消去される）
export type Color = 'red' | 'green' | 'blue';

// ✓ as const オブジェクト（enum の代替マップ）
export const ColorMap = {
  red: '#ff0000',
  green: '#00ff00',
  blue: '#0000ff',
} as const;

// ✓ Union 型 + 値配列の組み合わせ
export type Direction = 'up' | 'down' | 'left' | 'right';
export const directions: Direction[] = [
  'up',
  'down',
  'left',
  'right',
];

// ✓ 数値 union
export type Status = 0 | 1 | 2;
