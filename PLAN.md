# PLAN.md

> Working specification hub for AI discussions and implementation.

## 1. 🧾 Meta

- Project:
- Owner:
- Updated:
- Status: `Draft` | `Reviewing` | `Finalized` | `Implemented`

## 2. 💡 Draft Spec

- Background:
- Goal:
- Scope :
- Out of scope:
- Requirements:
  - [ ]
  - [ ]

## 3. ✅ Decision

- Final spec summary:
- Decision rationale:

## 4. 🛠️ Implementation Tasks

- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

## 5. 📚 Finalization Checklist

- [ ] `PLAN.md` reflects latest agreed spec
- [ ] `docs/...` updated after finalization
- [ ] `README.md` updated after finalization
- [ ] Open questions are cleared

## 6. ❓ Open Questions

- [ ]

---

## 7. 🧪 Example (One Issue)

- Project
- Owner:
- Updated : 2026-07-31
- Status: `Reviewing`

### 💡 Draft

- Background: There are setbacks occurring during the initial setup.
- Goal: The procedure should allow for the first launch within 10 minutes.
- Scope : README Quick Start and FAQ
- Out of scope: New features added / UI changes
- Requirements:
  - [ ] Please specify the prerequisites (Node, package manager, OS).
  - [ ] Unified execution commands in the shortest possible steps

### ✅ Decision

- Final spec summary: After reorganizing the Quick Start guide into 3 steps, we will add known errors to the FAQ.
- Decision rationale: This is the one that requires the least amount of effort and is expected to reduce inquiries.

### 🛠️ Tasks

- [ ] Update README.md Quick Start section.
- [ ] Update docs related pages.
- [ ] Add the results of the operational check.

### 📚 Finalization

- [ ] `PLAN.md` reflects latest agreed spec
- [ ] `docs/...` updated after finalization
- [ ] `README.md` updated after finalization
- [ ] Open questions are cleared

---

---

## CSS Property Order Rule

- Project: `@logue/biome-plugins`
- Owner: Logue
- Updated: 2026-08-21
- Status: `Reviewing`

### 💡 Draft Spec

- Background: Tailwind CSS's Prettier plugin enforces a deterministic class order. We want a similar convention for plain CSS/SCSS property ordering in this codebase.
- Goal: Define a canonical property order grouped by concern, sorted alphabetically within each group, enforced by a lint rule.
- Scope: `.css`, `.scss` files and JSX `style={{}}` attributes in this project.
- Out of scope: Automatic fix / auto-sort (lint warning only for now).
- Requirements:
  - [ ] Define the 6-group property order (see below).
  - [ ] Enforce it via a linter.

#### Proposed Property Groups

Properties within each group are sorted **alphabetically**.

| #   | Group                           | Key properties                                                                                                                                                                                                                                                     |
| --- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | **Variables**                   | `--*` custom properties                                                                                                                                                                                                                                            |
| 2   | **Display / Layout / Position** | `aspect-ratio`, `align-*`, `clear`, `columns`, `display`, `flex`, `flex-*`, `float`, `gap`, `grid`, `grid-*`, `inset`, `justify-*`, `order`, `overflow`, `overflow-*`, `place-*`, `position`, `row-gap`, `top`, `right`, `bottom`, `left`, `visibility`, `z-index` |
| 3   | **Box Model**                   | `border`, `border-*`, `box-sizing`, `height`, `max-height`, `min-height`, `margin`, `margin-*`, `outline`, `outline-*`, `padding`, `padding-*`, `width`, `max-width`, `min-width`                                                                                  |
| 4   | **Typography**                  | `color`, `font`, `font-*`, `letter-spacing`, `line-height`, `list-style`, `list-style-*`, `text-*`, `vertical-align`, `white-space`, `word-*`                                                                                                                      |
| 5   | **Visual / Background**         | `backdrop-filter`, `background`, `background-*`, `box-shadow`, `clip-path`, `content`, `filter`, `mix-blend-mode`, `object-fit`, `object-position`, `opacity`                                                                                                      |
| 6   | **Animation / Interaction**     | `animation`, `animation-*`, `cursor`, `pointer-events`, `resize`, `scroll-*`, `touch-action`, `transform`, `transform-*`, `transition`, `transition-*`, `user-select`, `will-change`                                                                               |

Blank lines between groups are **optional** (low priority).

### ✅ Decision

- Final spec summary: Adopt the 6-group ordering above. **Do not implement via Stylelint** to keep the package scope strictly Biome/GritQL. Document the convention in `AGENTS.md` now, and implement as a native Biome CSS rule once Biome's CSS linting supports property ordering.
- Decision rationale: Adding Stylelint would contradict the `@logue/biome-plugins` package name and responsibility. Biome's CSS support is actively growing; a native rule is the right long-term home. The convention in `AGENTS.md` is sufficient for AI-assisted enforcement in the interim.

### 🛠️ Implementation Tasks

- [x] Define property groups and ordering convention (this document).
- [ ] Add the ordering convention to `AGENTS.md` under a `## CSS Property Order` section.
- [ ] When Biome adds CSS property-order support: implement as a GritQL or native Biome rule and remove the `AGENTS.md` prose description.

### 📚 Finalization Checklist

- [ ] `PLAN.md` reflects latest agreed spec
- [ ] `AGENTS.md` updated with the ordering table
- [ ] Open questions are cleared

### ❓ Open Questions

- [ ] Where do `flex-*` / `grid-*` sub-properties that also affect sizing (e.g. `flex-basis`) belong — Group 2 or Group 3? Current decision: Group 2 (display-mode properties take precedence).

---

## JSX Attribute Order Rule

- Project: `@logue/biome-plugins`
- Owner: Logue
- Updated: 2026-09-23
- Status: `Implemented`

### 💡 Draft Spec

- Background: JSX/TSX components often mix `key`, `id`, `className`, `aria-*`, `data-*`, and event handlers in inconsistent order. A deterministic order improves readability and reduces diff churn.
- Goal: Define the canonical attribute order for JSX and enforce it via a GritQL lint rule.
- Scope: `.jsx`, `.tsx` files.
- Out of scope: Auto-fix / auto-sort; HTML / Vue / Svelte template attributes.

#### Proposed JSX Attribute Groups

Within each group: **static attributes first, then dynamic/bound attributes**.

| #   | Group                         | JSX attributes                                                         |
| --- | ----------------------------- | ---------------------------------------------------------------------- |
| 0   | **Definition / Control Flow** | `key`                                                                  |
| 1   | **ID**                        | `id`, `name`                                                           |
| 2   | **Two-Way Binding / Ref**     | `ref` (JSX ref / template ref equivalent)                              |
| 3   | **Class**                     | `className`, `class`                                                   |
| 4   | **Semantic**                  | `alt`, `crossOrigin`, `htmlFor`, `href`, `rel`, `src`, `title`, `type` |
| 5   | **Sizing**                    | `height`, `width`                                                      |
| 6   | **Style**                     | `style`                                                                |
| 7   | **Other**                     | remaining non-special attributes, alphabetical                         |
| 8   | **Accessibility**             | `role`, `aria-*`                                                       |
| 9   | **Data**                      | `data-*`                                                               |
| 10  | **Events**                    | `onClick`, `onChange`, `on*` handlers; native event props last         |

### ✅ Decision

- Final spec summary: Implement the JSX attribute-order lint in GritQL only. Keep the broader HTML / Vue / Svelte rule as a future item, because Biome's GritQL engine does not target template-language ASTs.
- Decision rationale: This is the practical limit of the current Biome/GritQL architecture. JSX is covered by the JS/TS AST, so the rule is enforceable and testable here. HTML/Vue/Svelte templates are not reachable from the current plugin engine, so they must be deferred to an engine or toolchain with template AST support.

### 🛠️ Implementation Tasks

- [x] Define JSX attribute groups and ordering convention (this document).
- [x] Implement `grit/enforce-attribute-order.grit` for JSX / TSX only.
- [x] Add regression tests in `grit/__tests__/enforce-attribute-order.spec.ts`.
- [x] Confirm non-adjacent violations are detected by matching the full JSX element text.
- [ ] Add the convention to `AGENTS.md` under a `## JSX Attribute Order` section.
- [ ] Revisit HTML / Vue / Svelte once Biome extends GritQL template-language support.

### 📚 Finalization Checklist

- [x] `PLAN.md` reflects latest agreed spec
- [ ] `AGENTS.md` updated with the JSX ordering table
- [ ] Open questions are cleared

### ❓ Open Questions

- [ ] Should we add a second pass for `className` + `style` ordering inside JSX elements after the base group order is stabilized?

---

## HTML / Vue / Svelte Attribute Order Rule (Deferred)

- Project: `@logue/biome-plugins`
- Owner: Logue
- Updated: 2026-09-23
- Status: `Deferred`

### 💡 Draft Spec

- Background: The same attribute-order idea is valid for HTML, Vue, and Svelte templates, but those files are not directly matchable by the current Biome GritQL engine.
- Goal: Define the canonical order for template attributes in a future engine that exposes template ASTs.
- Scope: `.html`, `.vue`, `.svelte` files.
- Out of scope: Implementation in the current repository; this will require Biome/GritQL support for template-language parsing.

### ✅ Decision

- Final spec summary: Defer the HTML / Vue / Svelte version of the rule. Keep the schema and rationale documented, but do not attempt implementation in the current GritQL plugin layer.
- Decision rationale: Template AST coverage is unavailable in the current Biome/GritQL version, and attempting to match Vue/Svelte syntax in a JS-only plugin creates parser failures and false negatives. The JSX implementation is the correct scope for this repository right now.

### 🛠️ Implementation Tasks

- [ ] Define final shared attribute-order groups for HTML / Vue / Svelte templates.
- [ ] Re-evaluate once Biome GritQL supports template-language ASTs.
- [ ] Move the rule into a template-aware linter if/when available.

### 📚 Finalization Checklist

- [x] Decision recorded in `PLAN.md`
- [ ] Implementation deferred until template AST support exists
- [ ] Open questions are cleared

### ❓ Open Questions

- [ ] What is the earliest supported Biome version that provides template-language matching for Vue/Svelte/HTML?

---

## Import Specifier Grouping (type vs. value)

- Project: `@logue/biome-plugins`
- Owner: Logue
- Updated: 2026-08-31
- Status: `Implemented`

### 💡 Draft Spec

- Background: `assist.actions.source.organizeImports` sorts named specifiers within a single
  `import { ... } from '...'` statement purely alphabetically, ignoring the inline `type`
  modifier — e.g. `import { apple, type banana, cake, type durian } from '@/food'`. The desire
  was for value specifiers to come first and type specifiers after, each group sorted.
- Goal: group type-only specifiers apart from value specifiers, sorted within each group.

### ✅ Decision

- Final spec summary: Biome's `organizeImports` has no option to group specifiers by kind
  within one combined import statement — confirmed in the official docs: "a type qualifier
  of a named specifier doesn't affect the order." A GritQL plugin cannot implement this
  either: this Biome version's GritQL engine doesn't support custom JS functions (`function
$x js { ... }` fails to compile), has no built-in sort, and cannot even bind a metavariable
  to a braced specifier list (`import { $specs } from $source` never matches — confirmed
  against the official docs' own `export { $names }` example, which also doesn't match).
  Instead, set `linter.rules.style.useImportType.options.style` to `"separatedType"`, which
  forces type-only specifiers into their own `import type { ... }` declaration whenever an
  import mixes types and values. Combined with `organizeImports` (which already places the
  `import type` statement ahead of the value import for the same source by default), this
  achieves the same grouped-and-sorted intent as two lines instead of one:

  ```ts
  import type { banana, durian } from "@/food";
  import { apple, cake } from "@/food";
  ```

- Decision rationale: Fully native, zero-maintenance, and verified end-to-end with
  `biome check --write`. The one-statement form the user originally pictured is not
  implementable given the current Biome GritQL engine's constraints (see above).

### 🛠️ Implementation Tasks

- [x] Set `useImportType` to `{ "level": "error", "options": { "style": "separatedType" } }`
      in `biome.jsonc`.
- [x] Verified against a mixed `import { apple, type banana, cake, type durian } from '../food'`
      fixture: `biome check --write` splits and sorts it into the two-line form above.

---

## 🕒 Changelog

- 2026-08-31: Set `useImportType` to `style: "separatedType"` (see "Import Specifier Grouping"
  above) so type-only imports are split into their own `import type { ... }` declaration and
  sorted apart from value imports — Biome's `organizeImports` cannot group specifiers by kind
  within a single combined import statement, and a GritQL plugin can't either (no custom JS
  functions, no sort, can't bind a metavariable to a braced specifier list in this engine).
- 2026-08-31: Fixed `grit/enforce-attribute-order.grit`, which never actually flagged anything: the Vue-section patterns used `@event`/`:class` syntax GritQL's snippet parser cannot parse at all, which failed the _entire_ plugin's compilation (so even the JSX rules never ran); separately, the JSX patterns used bare metavariables in attribute-value position (`id=$id`), which this Biome/GritQL engine cannot bind, and used `contains` with an `as`-bound node pattern, which only ever reports the first match in a file. Rewrote the rule to match `JsxOpeningElement()`/`JsxSelfClosingElement()` directly and check attribute order via full-text regex, combined with `any { }` so every check runs per element. Removed the non-functional Vue section — GritQL plugins in this Biome version only target JS/TS(JSX)/CSS/JSON, so Vue/Svelte template attribute order cannot be implemented until Biome extends GritQL to template languages (tracked in the rule's task list above). Added `grit/__tests__/enforce-attribute-order.spec.ts` (previously untested) and removed the unused/never-wired-up `.vue` fixture files.
- 2026-08-28: Implemented `grit/enforce-attribute-order.grit` (adjacent-pair detection for JSX and Vue); created `grit/vue-multi-word-filename.grit`; fixed `grit/enforce-pure-src.grit` syntax (`$file_path.matches()` → `$filename <: r"..."`)
- 2026-08-27: Attribute order: restructured to 11 groups (0–10) aligned with Vue official style guide; `ref` moved from Group 0 to Group 2 (Two-Way Binding / Ref) after `id`; `v-model`/`v-slot` separated from control-flow directives into Group 2; `v-html`/`v-text` added to Group 10; Svelte control-flow block equivalents noted in Group 0
- 2026-08-21: Attribute order: added `style` as Group 5, added `crossorigin`/`integrity`/`lang`/`ref`/`rel` to Group 3 Semantic, renumbered groups 5–9
- 2026-08-21: Added HTML/Vue/JSX/Svelte Attribute Order Rule; clarified Group 0 (Svelte `bind:*`) and Group 8 event order (native → Vue `@` → Svelte `on:`)
- 2026-08-21: Added CSS Property Order Rule plan
- YYYY-MM-DD: Initial draft
