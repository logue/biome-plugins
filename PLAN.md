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

## HTML / Vue / JSX / Svelte Attribute Order Rule

- Project: `@logue/biome-plugins`
- Owner: Logue
- Updated: 2026-08-21
- Status: `Reviewing`

### 💡 Draft Spec

- Background: No canonical attribute ordering exists across HTML, Vue, JSX, and Svelte. Consistent ordering improves readability and diff quality.
- Goal: Define a group-based attribute order, inspired by how Tailwind's Prettier plugin enforces class order. Enforce via a lint rule.
- Scope: `.html`, `.vue`, `.jsx`, `.tsx`, `.svelte` files.
- Out of scope: Auto-fix / auto-sort (lint warning only for now). Vue control-flow directives (`v-if`, `v-for`, etc.) are included in Group 0.

#### Proposed Attribute Groups

Within each group: **static (string literal) before dynamic (bound / expression)**.

```html
class="foo" ← static → first :class="bar" ← dynamic → second
```

| #   | Group                 | Attributes                                                                                                                                                               |
| --- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0   | **Meta / Directives** | `key`, `ref` (JSX/React/Vue template ref); `v-if`, `v-else-if`, `v-else`, `v-for`, `v-show`, `v-model`, `v-slot` etc. (Vue); `bind:*` (Svelte — equivalent to `v-model`) |
| 1   | **ID**                | `id`, `name`                                                                                                                                                             |
| 2   | **Class**             | `class` / `className`                                                                                                                                                    |
| 3   | **Semantic**          | `alt`, `crossorigin`, `for` / `htmlFor`, `href`, `integrity`, `lang`, `rel`, `src`, `title`, `type`                                                                      |
| 4   | **Sizing**            | `height`, `width`                                                                                                                                                        |
| 5   | **Style**             | `style` — hardcoded values that cannot be expressed by class/sizing attributes                                                                                           |
| 6   | **Other**             | All remaining attributes, alphabetical                                                                                                                                   |
| 7   | **Accessibility**     | `role`, `aria-*`                                                                                                                                                         |
| 8   | **Data**              | `data-*`                                                                                                                                                                 |
| 9   | **Events**            | `onclick` / `onClick` (native/JSX) → `@click` (Vue shorthand, per `useVueConsistentVOnStyle`) → `on:click` (Svelte)                                                      |

### ✅ Decision

- Final spec summary: Adopt the 8-group ordering above with the static-before-dynamic rule within each group.
- Decision rationale: Mirrors the mental model of "what the element is" → "how it looks" → "how it behaves", consistent with Tailwind's concern-based ordering philosophy.

### 🛠️ Implementation Tasks

- [x] Define attribute groups and ordering convention (this document).
- [ ] Add the convention to `AGENTS.md` under a `## HTML Attribute Order` section.
- [ ] Evaluate GritQL feasibility for JSX `style` attributes and Vue template attributes.
- [ ] When a suitable Biome or GritQL API is available: implement as a lint rule.

### 📚 Finalization Checklist

- [ ] `PLAN.md` reflects latest agreed spec
- [ ] `AGENTS.md` updated with the ordering table
- [ ] Open questions are cleared

### ❓ Open Questions

- [x] ~~Where does `style` (inline) go?~~ → Resolved: Group 5 (between Sizing and Other), as hardcoded fallback for values not expressible via class or sizing attributes.
- [x] ~~`ref` dual placement~~ → Resolved: `ref` is a framework-specific template ref (JSX/React/Vue), belongs in Group 0 only. Not an HTML attribute. (`rel` and `ref` were confused.)

---

## 🕒 Changelog

- 2026-08-21: Attribute order: added `style` as Group 5, added `crossorigin`/`integrity`/`lang`/`ref`/`rel` to Group 3 Semantic, renumbered groups 5–9
- 2026-08-21: Added HTML/Vue/JSX/Svelte Attribute Order Rule; clarified Group 0 (Svelte `bind:*`) and Group 8 event order (native → Vue `@` → Svelte `on:`)
- 2026-08-21: Added CSS Property Order Rule plan
- YYYY-MM-DD: Initial draft
