<template>
  <span class="materin-ui-qrcode" :class="{ 'materin-ui-qrcode--bordered': bordered }" :style="{ width: px(size), height: px(size) }">
    <canvas v-if="cells" ref="canvasRef" class="materin-ui-qrcode__canvas" :width="cells.length" :height="cells.length"
      :style="{ width: px(size), height: px(size), imageRendering: 'pixelated' }" aria-label="QR code" role="img" />
    <span v-else class="materin-ui-qrcode__placeholder">…</span>
  </span>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import qrcode from 'qrcode-generator'

defineOptions({ name: 'MiQRCode' })

interface QRCodeProps {
  value: string
  /** 1-40；0 = 自动选最小版本 */
  typeNumber?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  errorLevel?: 'L' | 'M' | 'Q' | 'H'
  /** 像素 */
  size?: number
  /** 深色模块颜色（CSS 颜色） */
  color?: string
  bordered?: boolean
}

const props = withDefaults(defineProps<QRCodeProps>(), {
  typeNumber: 0,
  errorLevel: 'M',
  size: 120,
  color: '#000000',
  bordered: false
})

const canvasRef = ref<HTMLCanvasElement>()
const cells = ref<boolean[][]>([])

const px = (v: number) => `${v}px`

const encode = () => {
  if (!props.value) {
    cells.value = []
    return
  }
  try {
    const qr = qrcode(props.typeNumber, props.errorLevel)
    qr.addData(props.value)
    qr.make()
    const count = qr.getModuleCount()
    cells.value = Array.from({ length: count }, (_, row) =>
      Array.from({ length: count }, (_, col) => qr.isDark(row, col))
    )
  } catch {
    cells.value = []
  }
}

watch(() => [props.value, props.typeNumber, props.errorLevel], encode, { immediate: true })

watch(
  [cells, () => props.color],
  async () => {
    await nextTick()
    const canvas = canvasRef.value
    if (!canvas || cells.value.length === 0) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = props.color
    cells.value.forEach((rowCells, row) => {
      rowCells.forEach((dark, col) => {
        if (dark) ctx.fillRect(col, row, 1, 1)
      })
    })
  },
  { flush: 'post' }
)

</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-qrcode {
  display: inline-block;

  &__canvas {
    display: block;
  }

  &__placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: $materin-text-faint;
    font-size: $materin-font-size-caption;
  }

  &--bordered {
    padding: $materin-space-2;
    border: 1px solid $materin-border;
    border-radius: $materin-radius;
  }
}
</style>
