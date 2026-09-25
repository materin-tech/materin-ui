<template>
  <nav class="materin-ui-anchor">
    <a
      v-for="link in links"
      :key="link.href"
      class="materin-ui-anchor__link"
      :class="{ 'is-active': link.href === activeHref }"
      :href="link.href"
    >
      {{ link.title }}
    </a>
  </nav>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

import type { AnchorLink } from './types'

defineOptions({ name: 'MiAnchor' })

interface AnchorProps {
  links?: AnchorLink[]
}

const props = withDefaults(defineProps<AnchorProps>(), { links: () => [] })

const activeHref = ref(props.links[0]?.href ?? '')
let observer: IntersectionObserver | undefined

onMounted(() => {
  if (typeof IntersectionObserver === 'undefined') return
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeHref.value = `#${entry.target.id}`
        }
      }
    },
    { rootMargin: '-20% 0px -70% 0px' }
  )
  props.links.forEach((link) => {
    const target = document.querySelector(link.href)
    if (target) observer!.observe(target)
  })
})

onUnmounted(() => observer?.disconnect())
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-anchor {
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-left: 2px solid $materin-border;

  &__link {
    padding: $materin-space-1 $materin-space-3;
    border-left: 2px solid transparent;
    color: $materin-text-muted;
    font-size: $materin-font-size-small;
    text-decoration: none;
    transition: all $materin-duration-fast $materin-ease-standard;

    &:hover {
      color: $materin-text;
    }

    &.is-active {
      border-left-color: $materin-accent;
      color: $materin-accent;
      margin-left: -2px;
    }
  }
}
</style>
