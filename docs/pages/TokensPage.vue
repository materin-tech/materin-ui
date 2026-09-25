<template>
  <section class="materin-docs-section">
    <div class="materin-docs-section__head">
      <h2>{{ t('设计令牌', 'Design tokens') }}</h2>
      <p>
        {{
          t(
            '所有颜色、圆角、阴影、字号的唯一来源。改令牌，全站生效；组件层不出现裸色值。',
            'The single source for every colour, radius, shadow and font size. Change a token and everything follows; components never hardcode colours.'
          )
        }}
      </p>
    </div>
    <div class="materin-docs-tokens">
      <div v-for="row in rows" :key="row.name" class="materin-docs-token-row">
        <span class="materin-docs-swatch" :style="{ background: `var(${row.name})` }" />
        <code>{{ row.name }}</code>
        <span>{{ row.value }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{ lang?: 'zh' | 'en' }>(), { lang: 'zh' })
const t = (zh: string, en: string) => (props.lang === 'zh' ? zh : en)

const rows = ref<{ name: string; value: string }[]>([])

if (typeof window !== 'undefined') {
  const styles = getComputedStyle(document.documentElement)
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        const text = rule.cssText
        const match = text.match(/--materin-[\w-]+(?=\s*:)/g)
        if (!match) continue
        for (const name of match) {
          if (rows.value.some((r) => r.name === name)) continue
          rows.value.push({ name, value: styles.getPropertyValue(name).trim() })
        }
      }
    } catch {
      // 跨域样式表跳过
    }
  }
  rows.value.sort((a, b) => a.name.localeCompare(b.name))
}
</script>
