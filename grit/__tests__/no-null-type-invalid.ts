// no-null-type — INVALID cases
// Expected: 4 diagnostics (warn)

// ✗ 関数パラメータ: T | null
function processString(str: string | null) {
  return str?.trim();
}

// ✗ 関数パラメータ: null | T
function processNumber(value: null | number) {
  return value ?? 0;
}

// ✗ アロー関数パラメータ: T | null
const handleUser = (user: User | null) => {
  return user?.name;
};

// ✗ 変数型アノテーション: T | null
const selectedItem: Item | null = null;
