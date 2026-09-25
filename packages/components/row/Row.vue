<template>
  <component :is="tag" class="materin-ui-row" :style="rowStyle">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, provide, toRef } from 'vue'
import { ROW_KEY } from '../_shared/row'

defineOptions({ name: 'MiRow' })

type Justify = 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'
type Align = 'top' | 'middle' | 'bottom' | 'stretch'

interface RowProps {
  /** 列间距（px）。列会各取一半做左右内边距 */
  gutter?: number
  justify?: Justify
  align?: Align
  tag?: string
}

const props = withDefaults(defineProps<RowProps>(), {
  gutter: 0,
  justify: 'start',
  align: 'top',
  tag: 'div'
})

provide(ROW_KEY, { gutter: toRef(props, 'gutter') })

const JUSTIFY: Record<Justify, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  'space-between': 'space-between',
  'space-around': 'space-around',
  'space-evenly': 'space-evenly'
}

const ALIGN: Record<Align, string> = {
  top: 'flex-start',
  middle: 'center',
  bottom: 'flex-end',
  stretch: 'stretch'
}

const rowStyle = computed(() => ({
  justifyContent: JUSTIFY[props.justify],
  alignItems: ALIGN[props.align]
}))
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-row {
  @include materin-component-base;

  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
</style>
