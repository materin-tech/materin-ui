<template>
  <div ref="rootRef" class="materin-ui-watermark">
    <slot />
    <div v-if="ready" class="materin-ui-watermark__layer" :style="layerStyleText" aria-hidden="true" />
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'

defineOptions({ name: 'MiWatermark' })

interface WatermarkProps {
  content?: string
  /** 颜色走 CSS 颜色字符串；渲染为 canvas 纹理 */
  color?: string
  fontSize?: number
  rotate?: number
  /** 两枚水印的间距 */
  gap?: { x: number; y: number }
  zIndex?: number
}

const props = withDefaults(defineProps<WatermarkProps>(), {
  content: '',
  color: 'rgba(0,0,0,0.08)',
  fontSize: 14,
  rotate: -22,
  gap: () => ({ x: 120, y: 90 }),
  zIndex: 9
})

const rootRef = ref<HTMLElement>()
const ready = ref(false)
const dataUrl = ref('')

const draw = () => {
  if (typeof document === 'undefined' || !props.content) return
  const canvas = document.createElement('canvas')
  let ctx = canvas.getContext('2d')
  if (!ctx) return
  const text = props.content
  const font = `${props.fontSize}px sans-serif`
  ctx.font = font
  const metrics = ctx.measureText(text)
  canvas.width = metrics.width + 24
  canvas.height = props.fontSize + 24
  ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.font = font
  ctx.fillStyle = props.color
  ctx.textBaseline = 'middle'
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.rotate((props.rotate * Math.PI) / 180)
  ctx.fillText(text, -metrics.width / 2, 0)
  dataUrl.value = canvas.toDataURL()
  ready.value = true
}

watch(() => [props.content, props.color, props.fontSize, props.rotate], draw, { immediate: true })

/** 防篡改回写用：与 :style 同内容的 CSS 文本 */
const layerStyleText = computed(() =>
  `background-image: url(${dataUrl.value}); background-repeat: repeat; z-index: ${props.zIndex}`
)
</script>

/** 防篡改：水印层被删或被改样式就重画 */
let observer: MutationObserver | undefined

const guard = () => {
  if (typeof MutationObserver === 'undefined') return
  observer = new MutationObserver((records) => {
    const layer = rootRef.value?.querySelector('.materin-ui-watermark__layer')
    const removed = records.some((r) => [...r.removedNodes].some((n) => (n as HTMLElement).classList?.contains('materin-ui-watermark__layer')))
    const mutated = records.some((r) => r.target === layer)
    if (removed) {
      ready.value = false
      requestAnimationFrame(() => {
        draw()
      })
    } else if (mutated && layer) {
      layer.setAttribute('style', layerStyleText.value)
    }
  })
  observer.observe(rootRef.value!, { childList: true, subtree: true, attributes: true })
}

const attach = () => {
  observer?.disconnect()
  guard()
}

watch(rootRef, attach)

onUnmounted(() => observer?.disconnect())



<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-watermark {
  position: relative;
  display: block;

  &__layer {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
}
</style>
