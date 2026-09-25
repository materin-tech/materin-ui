<template>
  <div class="materin-docs-demo materin-docs-demo--column">
    <component :is="demo" v-if="demo" :lang="lang" />
    <p v-else class="materin-docs-demo__fallback">
      {{ t('该组件的用法见上方导入与 Props 表。', 'See imports and the Props table above for usage.') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import MiButtonDemo from './ButtonDemo.vue'
import MiInputDemo from './InputDemo.vue'
import MiSwitchDemo from './SwitchDemo.vue'
import MiSliderDemo from './SliderDemo.vue'
import MiTableDemo from './TableDemo.vue'
import MiTreeDemo from './TreeDemo.vue'
import MiProgressDemo from './ProgressDemo.vue'
import MiDialogDemo from './DialogDemo.vue'
import MiPaginationDemo from './PaginationDemo.vue'
import MiDatePickerDemo from './DatePickerDemo.vue'
import MiTagDemo from './TagDemo.vue'
import MiCardDemo from './CardDemo.vue'
import MiSelectDemo from './SelectDemo.vue'
import MiAlertDemo from './AlertDemo.vue'

const props = withDefaults(defineProps<{ kebab: string; lang?: 'zh' | 'en' }>(), { lang: 'zh' })
const t = (zh: string, en: string) => (props.lang === 'zh' ? zh : en)

const REGISTRY: Record<string, Component> = {
  button: MiButtonDemo,
  input: MiInputDemo,
  switch: MiSwitchDemo,
  slider: MiSliderDemo,
  table: MiTableDemo,
  tree: MiTreeDemo,
  progress: MiProgressDemo,
  dialog: MiDialogDemo,
  pagination: MiPaginationDemo,
  'date-picker': MiDatePickerDemo,
  tag: MiTagDemo,
  card: MiCardDemo,
  select: MiSelectDemo,
  alert: MiAlertDemo
}

const demo = computed(() => REGISTRY[props.kebab] ?? null)
</script>
