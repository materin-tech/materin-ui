<template>
  <div class="materin-ui-config-provider" :data-materin-theme="theme">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { CONFIG_KEY, type ConfigContext } from './types'

defineOptions({ name: 'MiConfigProvider' })

interface ConfigProviderProps {
  /** 命名空间主题：dark / light / auto */
  theme?: 'dark' | 'light' | 'auto'
}

const props = withDefaults(defineProps<ConfigProviderProps>(), { theme: 'auto' })

provide(CONFIG_KEY as unknown as symbol, { theme: props.theme } as ConfigContext)
</script>

<style lang="scss">
.materin-ui-config-provider {
  display: block;
}
</style>
