<template>
  <!-- enforce-attribute-order — INVALID cases (Vue テンプレート) -->
  <!-- Expected: 8 diagnostics (warn) -->

  <!-- ✗ v-if (Group 0) が id (Group 1) より後 -->
  <div
    id="modal"
    v-if="isOpen"
  >
    modal
  </div>

  <!-- ✗ v-for (Group 0) が id (Group 1) より後 -->
  <li
    id="item"
    v-for="item in list"
    :key="item.id"
  >
    {{ item }}
  </li>

  <!-- ✗ class (Group 3) が id (Group 1) より前 -->
  <div
    class="card"
    id="main-card"
  />

  <!-- ✗ 動的 :class (Group 3) が 静的 class (Group 3) より前 -->
  <div
    :class="dynamicClass"
    class="base-class"
  />

  <!-- ✗ @event (Group 10) が class (Group 3) より前 -->
  <button
    @click="handleClick"
    type="button"
    class="btn"
  >
    Click
  </button>

  <!-- ✗ @event (Group 10) が id (Group 1) より前 -->
  <button
    type="button"
    @click="handleSubmit"
    id="submit-btn"
  />

  <!-- ✗ aria-* (Group 8) が class (Group 3) より前 -->
  <nav
    aria-label="main navigation"
    class="nav"
  />

  <!-- ✗ data-* (Group 9) が class (Group 3) より前 -->
  <section
    data-testid="hero"
    class="hero"
  />
</template>
