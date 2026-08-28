<template>
  <!-- ✓ v-if → id → class → aria-* → @event (Groups 0→1→3→8→10) -->
  <div
    v-if="isOpen"
    id="modal"
    class="modal"
    aria-modal="true"
    @click="closeModal"
  >
    modal
  </div>

  <!-- ✓ v-for → id → class → @event (Groups 0→1→3→10) -->
  <li
    v-for="item in list"
    :key="item.id"
    id="item"
    class="list-item"
    @click="select(item)"
  >
    {{ item }}
  </li>

  <!-- ✓ id → class (正しい順序) -->
  <div
    id="main-card"
    class="card"
  />

  <!-- ✓ 静的 class → 動的 :class (グループ内: 静的→動的) -->
  <div
    class="base-class"
    :class="dynamicClass"
  />

  <!-- ✓ id → class → @event (Groups 1→3→10) -->
  <button
    id="submit-btn"
    class="btn"
    type="button"
    @click="handleSubmit"
  >
    Submit
  </button>

  <!-- ✓ class → aria-* → data-* → @event (Groups 3→8→9→10) -->
  <nav
    class="nav"
    aria-label="main navigation"
    data-testid="main-nav"
    @click="handleNavClick"
  />
</template>
