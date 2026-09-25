<template>
  <section class="materin-docs-section">
    <div class="materin-docs-section__head">
      <h1>{{ t('组件总览', 'Components') }}</h1>
      <p>
        {{
          t(
            `${total} 个组件，按组浏览。每个卡片内是该组件的真实渲染效果，点击进入文档页。`,
            `${total} components grouped for browsing. Each card shows a live render; click for the docs.`
          )
        }}
      </p>
    </div>

    <section v-for="g in groups" :key="g.id" class="materin-docs-section">
      <div class="materin-docs-section__head">
        <h2>{{ t(g.zh, g.en) }}</h2>
        <p>{{ g.components.length }} {{ t('个组件', 'components') }}</p>
      </div>
      <div class="materin-docs-gallery">
        <ComponentThumb
          v-for="c in g.components"
          :key="c.kebab"
          :component="c"
          :lang="lang"
        />
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ComponentThumb from '../demos/ComponentThumb.vue'
import { groups } from '../manifest'

const props = withDefaults(defineProps<{ lang?: 'zh' | 'en' }>(), { lang: 'zh' })
const t = (zh: string, en: string) => (props.lang === 'zh' ? zh : en)

const total = computed(() => groups.reduce((sum, g) => sum + g.components.length, 0))
</script>
