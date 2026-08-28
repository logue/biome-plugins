// no-null-type — VALID cases
// Expected: 0 diagnostics

// ✓ オプショナルパラメータ（? を使用）
function processString(str?: string) {
  return str?.trim();
}

// ✓ デフォルト値を使用
function processNumber(value = 0) {
  return value;
}

// ✓ オプショナル引数のアロー関数
const handleUser = (user?: User) => {
  return user?.name;
};

// ✓ undefined を使用
const selectedItem: Item | undefined = undefined;

// ✓ JSON 変換境界（例外ケース）
const normalized = {
  value: apiResponse.value ?? undefined,
};
