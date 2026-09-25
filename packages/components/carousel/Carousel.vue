<template>
  <div class="materin-ui-carousel">
    <div class="materin-ui-carousel__track" :style="{ transform: `translateX(-${index * 100}%)` }">
      <div v-for="(slide, i) in count" :key="i" class="materin-ui-carousel__slide" :class="{ 'is-active': i === index }">
        <slot :name="`slide-${i}`" :index="i">
          <slot :index="i" />
        </slot>
      </div>
    </div>

    <button v-if="count > 1" class="materin-ui-carousel__nav materin-ui-carousel__nav--prev" type="button" aria-label="上一张" @click="go(index - 1)">‹</button>
    <button v-if="count > 1" class="materin-ui-carousel__nav materin-ui-carousel__nav--next" type="button" aria-label="下一张" @click="go(index + 1)">›</button>

    <div v-if="count > 1" class="materin-ui-carousel__indicators">
      <button
        v-for="i in count"
        :key="i"
        class="materin-ui-carousel__indicator"
        :class="{ 'is-active': i - 1 === index }"
        type="button"
        :aria-label="`第 ${i} 张`"
        @click="go(i - 1)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

defineOptions({ name: 'MiCarousel' })

interface CarouselProps {
  count?: number
  /** 自动播放间隔毫秒；0 关闭 */
  interval?: number
}

const props = withDefaults(defineProps<CarouselProps>(), { count: 1, interval: 0 })

const index = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

const go = (target: number) => {
  if (props.count === 0) return
  index.value = ((target % props.count) + props.count) % props.count
}

const start = () => {
  if (!props.interval || props.count < 2 || typeof window === 'undefined') return
  timer = setInterval(() => go(index.value + 1), props.interval)
}

const stop = () => {
  if (timer) clearInterval(timer)
  timer = undefined
}

onMounted(() => {
  start()
})

onUnmounted(() => stop())

defineExpose({ go, stop, start })
</script>

<style lang="scss">
@use '@/styles/tokens.scss' as *;

.materin-ui-carousel {
  position: relative;
  overflow: hidden;
  border-radius: $materin-radius-lg;

  &__track {
    display: flex;
    transition: transform $materin-duration-slow $materin-ease-standard;
  }

  &__slide {
    flex: 0 0 100%;
    min-width: 0;
  }

  &__nav {
    position: absolute;
    top: 50%;
    z-index: 5;
    width: 30px;
    height: 30px;
    border: 1px solid $materin-glass-border;
    border-radius: 50%;
    background: $materin-glass-bg-strong;
    color: $materin-text;
    font-size: 16px;
    cursor: pointer;
    transform: translateY(-50%);

    &--prev { left: $materin-space-3; }
    &--next { right: $materin-space-3; }
  }

  &__indicators {
    position: absolute;
    bottom: $materin-space-3;
    left: 50%;
    display: flex;
    gap: $materin-space-2;
    transform: translateX(-50%);
  }

  &__indicator {
    width: 7px;
    height: 7px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: $materin-text-faint;
    cursor: pointer;

    &.is-active {
      background: $materin-accent;
    }
  }
}
</style>
