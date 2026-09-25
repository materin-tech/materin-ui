<template>
  <section id="feedback" class="materin-docs-section">
    <div class="materin-docs-wrap">
      <div class="materin-docs-section__head">
        <h2>{{ t('反馈与浮层', 'Feedback and overlays') }}</h2>
        <p>
          {{
            t(
              '提示、浮层、对话框、抽屉、全局消息与引导漫游。浮层都用同一套遮罩与阴影，点遮罩、按 ESC 都能关。',
              'Alerts, poppers, dialogs, drawers, global messages and guided tours. Overlays share one scrim and shadow, and all of them close on overlay click or Escape.'
            )
          }}
        </p>
      </div>

      <div class="materin-docs-demo materin-docs-demo--column">
        <p class="materin-docs-demo__label">{{ t('提示条', 'Alert') }}</p>
        <div class="materin-docs-demo__grid">
          <MiAlert type="info" :title="t('信息', 'Info')" :description="t('说明性的补充信息。', 'Supplementary information.')" />
          <MiAlert type="success" :title="t('成功', 'Success')" :description="t('操作已经完成。', 'The action finished.')" />
          <MiAlert type="warning" :title="t('警告', 'Warning')" :description="t('还会影响别处的内容。', 'This affects something else too.')" />
          <MiAlert type="error" :title="t('出错', 'Error')" :description="t('没有写成功，可以重试。', 'The write failed — you can retry.')" />
        </div>
      </div>

      <div class="materin-docs-demo materin-docs-demo--column">
        <p class="materin-docs-demo__label">{{ t('浮层三件套', 'Poppers') }}</p>
        <MiSpace wrap :size="10">
          <MiTooltip :content="t('这是文字提示', 'A tooltip')">
            <MiButton size="sm" variant="ghost">{{ t('悬浮看提示', 'Hover me') }}</MiButton>
          </MiTooltip>

          <MiPopover :title="t('气泡卡片', 'Popover')">
            <template #reference>
              <MiButton size="sm" variant="ghost">{{ t('点开卡片', 'Open popover') }}</MiButton>
            </template>
            <p style="margin: 0">{{ t('卡片里可以放任意内容，包括按钮和输入框。', 'A popover can hold anything, buttons and inputs included.') }}</p>
          </MiPopover>

          <MiPopconfirm
            :title="t('确定要删掉这条记录吗？', 'Delete this record?')"
            @confirm="onConfirmed"
            @cancel="onCancelled"
          >
            <template #reference>
              <MiButton size="sm" variant="ghost">{{ t('二次确认', 'Confirm first') }}</MiButton>
            </template>
          </MiPopconfirm>

          <MiText v-if="confirmState" size="sm" :type="confirmState.includes('确认') || confirmState.includes('confirmed') ? 'success' : 'muted'">
            {{ confirmState }}
          </MiText>
        </MiSpace>
      </div>

      <div class="materin-docs-demo materin-docs-demo--column">
        <p class="materin-docs-demo__label">{{ t('容器与全局提示', 'Containers and global messages') }}</p>
        <MiSpace wrap :size="10">
          <MiButton size="sm" @click="dialogVisible = true">{{ t('对话框', 'Dialog') }}</MiButton>
          <MiButton size="sm" @click="drawerVisible = true">{{ t('抽屉', 'Drawer') }}</MiButton>
          <MiButton size="sm" @click="MiMessage.success(t('已经保存', 'Saved'))">{{ t('成功消息', 'Success message') }}</MiButton>
          <MiButton size="sm" @click="MiMessage.error(t('没有写成功', 'Write failed'))">{{ t('错误消息', 'Error message') }}</MiButton>
          <MiButton size="sm" @click="openNotification">{{ t('右上角通知', 'Notification') }}</MiButton>
          <MiButton size="sm" :loading="loading" @click="runLoading">{{ t('加载态', 'Loading') }}</MiButton>
        </MiSpace>
      </div>

      <div class="materin-docs-demo materin-docs-demo--column">
        <p class="materin-docs-demo__label">{{ t('引导漫游', 'Tour') }}</p>
        <MiSpace :size="10">
          <MiButton id="fb-tour-1" size="sm" variant="ghost" @click="startTour">{{ t('开始引导', 'Start tour') }}</MiButton>
          <span id="fb-tour-2" class="materin-docs-code">{{ t('第二步指向这里', 'Step two targets this') }}</span>
          <MiText size="sm" type="muted">{{ tourIndex >= 0 ? `${t('第', 'step')} ${tourIndex + 1} / ${tourSteps.length}` : t('未开始', 'not running') }}</MiText>
        </MiSpace>
      </div>

      <div class="materin-docs-demo materin-docs-demo--column">
        <p class="materin-docs-demo__label">{{ t('加载遮罩', 'Loading overlay') }}</p>
        <MiLoading :loading="loading" :text="t('正在准备数据…', 'Preparing data…')">
          <MiAlert type="info" :title="t('这段内容上方会出现遮罩', 'A mask covers this block')" :description="t('点上面那个「加载态」按钮就能看到。', 'Press the loading button above to see it.')" />
        </MiLoading>
      </div>
    </div>

    <MiDialog v-model="dialogVisible" :title="t('确认发布', 'Confirm publish')">
      <p style="margin: 0">
        {{
          t(
            '对话框打开时会锁住页面滚动，点遮罩或按 ESC 都能关闭。',
            'Opening a dialog locks page scrolling; overlay click or Escape closes it.'
          )
        }}
      </p>
      <template #footer>
        <MiButton size="sm" variant="ghost" @click="dialogVisible = false">{{ t('取消', 'Cancel') }}</MiButton>
        <MiButton size="sm" @click="dialogVisible = false">{{ t('发布', 'Publish') }}</MiButton>
      </template>
    </MiDialog>

    <MiDrawer v-model="drawerVisible" :title="t('筛选条件', 'Filters')" direction="rtl" size="320px">
      <MiSpace direction="vertical" :size="12" fill>
        <MiText size="sm" type="muted">{{ t('抽屉从右侧滑出，宽度可以自己定。', 'The drawer slides in from the right; size it as you like.') }}</MiText>
        <MiInput :placeholder="t('搜索…', 'Search…')" />
      </MiSpace>
      <template #footer>
        <MiButton size="sm" variant="ghost" @click="drawerVisible = false">{{ t('重置', 'Reset') }}</MiButton>
        <MiButton size="sm" @click="drawerVisible = false">{{ t('应用', 'Apply') }}</MiButton>
      </template>
    </MiDrawer>

    <MiTour v-model="tourIndex" :steps="tourSteps" />
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  MiAlert,
  MiButton,
  MiDialog,
  MiDrawer,
  MiInput,
  MiLoading,
  MiMessage,
  MiNotification,
  MiPopconfirm,
  MiPopover,
  MiSpace,
  MiText,
  MiTooltip,
  MiTour,
  type TourStep
} from '@/materin-ui/index'

const props = withDefaults(defineProps<{ lang?: 'zh' | 'en' }>(), { lang: 'zh' })

const t = (zh: string, en: string) => (props.lang === 'zh' ? zh : en)

const dialogVisible = ref(false)
const drawerVisible = ref(false)
const loading = ref(false)
const confirmed = ref<null | boolean>(null)
const tourIndex = ref(-1)

const confirmState = computed(() => {
  if (confirmed.value === null) return ''
  return confirmed.value ? t('已确认（confirmation received）', 'confirmed') : t('已取消', 'cancelled')
})

const onConfirmed = () => {
  confirmed.value = true
}
const onCancelled = () => {
  confirmed.value = false
}

const openNotification = () => {
  MiNotification.success({
    title: t('部署完成', 'Deployment finished'),
    message: t('静态站已经更新，约 70 秒后全量生效。', 'The static site is updated; allow about 70 seconds.')
  })
}

const runLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    MiMessage.info(t('加载结束', 'Loading done'))
  }, 1200)
}

const tourSteps = computed<TourStep[]>(() => [
  {
    target: '#fb-tour-1',
    title: t('从这里开始', 'Start here'),
    description: t('点一次就能带用户走完关键位置。', 'One click walks a user through the key spots.'),
    placement: 'bottom'
  },
  {
    target: '#fb-tour-2',
    title: t('第二步', 'Second step'),
    description: t('高亮框会跟着目标元素的位置走。', 'The highlight box follows the target element.')
  },
  {
    target: '#feedback .materin-docs-section__head',
    title: t('第三步', 'Third step'),
    description: t('最后一步按钮变成「完成」。', 'On the last step the button reads “Finish”.'),
    placement: 'bottom'
  }
])

const startTour = () => {
  tourIndex.value = 0
}
</script>
