<template>
  <div class="materin-ui-page-shell">
    <header v-if="$slots.header" class="materin-ui-page-shell__header">
      <slot name="header" />
    </header>
    <div class="materin-ui-page-shell__body">
      <aside v-if="$slots.aside" class="materin-ui-page-shell__aside">
        <slot name="aside" />
      </aside>
      <main class="materin-ui-page-shell__main">
        <slot />
      </main>
    </div>
    <footer v-if="$slots.footer" class="materin-ui-page-shell__footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'MiPageShell' })
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-page-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__header {
    flex: 0 0 auto;
  }

  &__body {
    display: flex;
    flex: 1 1 auto;
    min-height: 0;
  }

  &__aside {
    flex: 0 0 220px;
  }

  &__main {
    flex: 1 1 auto;
    min-width: 0;
  }

  &__footer {
    flex: 0 0 auto;
  }
}
</style>
