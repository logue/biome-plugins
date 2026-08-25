import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Biome's `--stdin-file-path` mode always reports
// "The contents aren't fixed. Use the `--write` flag to fix them." regardless of
// whether the input actually violates anything, so it cannot be used to assert on
// specific diagnostics. Instead, each check runs against a real file in a throwaway
// git repo (Biome's `vcs.useIgnoreFile` requires one) with only the rule under test
// registered as a plugin.
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..', '..');
const BIOME_BIN = join(ROOT, 'node_modules', '.bin', 'biome');

export interface CheckResult {
  /** Whether `biome check` exited successfully (no diagnostics of any kind). */
  ok: boolean;
  /** Combined stdout+stderr from the run. */
  output: string;
}

/**
 * Runs `biome check` against `code` with only `gritFile` (from the repo's `grit/`
 * directory) registered as a plugin. Unrelated formatter/recommended-lint noise is
 * disabled so `output` reflects only what the plugin itself reports.
 */
export function checkWithRule(
  gritFile: string,
  code: string,
  filePath = 'src/index.ts',
): CheckResult {
  const dir = mkdtempSync(join(tmpdir(), 'biome-grit-'));
  try {
    execFileSync('git', [
      'init',
      '--quiet',
      dir,
    ]);

    mkdirSync(join(dir, 'grit'), {
      recursive: true,
    });
    cpSync(join(ROOT, 'grit', gritFile), join(dir, 'grit', gritFile));

    writeFileSync(
      join(dir, 'biome.jsonc'),
      JSON.stringify({
        root: true,
        plugins: [
          `grit/${gritFile}`,
        ],
        linter: {
          rules: {
            recommended: false,
          },
        },
        formatter: {
          enabled: false,
        },
        vcs: {
          clientKind: 'git',
          enabled: true,
          useIgnoreFile: true,
        },
      }),
    );

    const target = join(dir, filePath);
    mkdirSync(dirname(target), {
      recursive: true,
    });
    writeFileSync(target, code);

    try {
      const output = execFileSync(
        BIOME_BIN,
        [
          'check',
          filePath,
          '--config-path=./',
          '--error-on-warnings',
        ],
        {
          cwd: dir,
          encoding: 'utf-8',
          stdio: 'pipe',
        },
      );
      return {
        ok: true,
        output,
      };
    } catch (error) {
      const execError = error as {
        stdout?: string;
        stderr?: string;
      };
      return {
        ok: false,
        output: `${execError.stdout ?? ''}${execError.stderr ?? ''}`,
      };
    }
  } finally {
    rmSync(dir, {
      recursive: true,
      force: true,
    });
  }
}
