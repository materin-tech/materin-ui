<template>
  <section class="materin-docs-section">
    <div class="materin-docs-hero">
      <h1>{{ t('先把界面做清，再把体验做好', 'Clear interfaces first. Then good experience.') }}</h1>
      <p>
        {{
          t(
            `Materin UI 是一套 Vue 3 组件库：${total} 个组件、一套令牌、一条命名契约。每个组件一页，API 与类名契约逐项可查。`,
            `Materin UI is a Vue 3 component library: ${total} components, one token set, one naming contract. One page per component, with APIs and class contracts.`
          )
        }}
      </p>
      <div class="materin-docs-hero__actions">
        <MiButton type="primary" @click="go('/component/button')">{{ t('从按钮开始', 'Start with Button') }}</MiButton>
        <MiButton variant="ghost" @click="go('/tokens')">{{ t('看令牌表', 'Browse tokens') }}</MiButton>
      </div>
    </div>

    <section v-for="g in groups" :key="g.id" class="materin-docs-section" :id="`group-${g.id}`">
      <div class="materin-docs-section__head">
        <h2>{{ t(g.zh, g.en) }}</h2>
        <p>{{ g.components.length }} {{ t('个组件', 'components') }}</p>
      </div>
      <div class="materin-docs-grid">
        <a v-for="c in g.components" :key="c.kebab" class="materin-docs-cell" :href="`#/component/${c.kebab}`">
          <span class="materin-docs-cell__name">{{ t(c.zh, c.en) }}</span>
          <span class="materin-docs-cell__klass">{{ c.klass }}</span>
        </a>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { MiButton } from '@/materin-ui/index'
import { groups } from '../manifest'

const props = withDefaults(defineProps<{ lang?: 'zh' | 'en' }>(), { lang: 'zh' })
const t = (zh: string, en: string) => (props.lang === 'zh' ? zh : en)

const total = computed(() => groups.reduce((sum, g) => sum + g.components.length, 0))

const go = (path: string) => {
  if (typeof location !== 'undefined') location.hash = `#${path}`
}
</script>
