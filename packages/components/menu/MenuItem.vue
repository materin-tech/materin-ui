<template>
  <button class="materin-ui-menu__item" :class="{ 'is-active': active }" type="button" @click="handleClick">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { MENU_KEY, type MenuContext } from './types'

defineOptions({ name: 'MiMenuItem' })

interface MenuItemProps {
  name: string
}

const props = defineProps<MenuItemProps>()
const menu = inject< MenuContext | null>(MENU_KEY as unknown as symbol, null)

const active = computed(() => menu?.active.value === props.name)

const handleClick = () => {
  if (menu) menu.select(props.name)
}
</script>
