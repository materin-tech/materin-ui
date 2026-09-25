<template>
  <section id="data" class="materin-docs-section">
    <div class="materin-docs-wrap">
      <div class="materin-docs-section__head">
        <h2>{{ t('数据展示', 'Data display') }}</h2>
        <p>
          {{
            t(
              '进度、统计数值、描述列表、结果页、折叠面板、时间线、分页、分段控制与图片。',
              'Progress, statistics, descriptions, results, collapse, timeline, pagination, segmented control and images.'
            )
          }}
        </p>
      </div>

      <div class="materin-docs-demo materin-docs-demo--column">
        <p class="materin-docs-demo__label">{{ t('进度条', 'Progress') }}</p>
        <MiSpace direction="vertical" :size="14" fill>
          <MiProgress :percent="percent" />
          <MiProgress :percent="percent" status="success" />
          <MiProgress :percent="72" status="warning" size="sm" />
          <MiProgress indeterminate :show-text="false" />
          <MiProgress :percent="percent" type="ring" :ring-size="52" />
          <MiButton size="sm" @click="bump">{{ t('推进 20%', 'Advance 20%') }}</MiButton>
        </MiSpace>
      </div>

      <div class="materin-docs-demo materin-docs-demo--column">
        <p class="materin-docs-demo__label">{{ t('统计数值', 'Statistic') }}</p>
        <div class="materin-docs-demo__grid">
          <MiStatistic :title="t('发布版本', 'Releases')" :value="44" />
          <MiStatistic :title="t('下载量', 'Downloads')" :value="128430" suffix="+" />
          <MiStatistic title="Pass rate" :value="0.987" :precision="1" suffix="%" />
          <MiStatistic :title="t('未通过', 'Failing')" value="3" status="error" />
        </div>
      </div>

      <div class="materin-docs-demo materin-docs-demo--column">
        <p class="materin-docs-demo__label">{{ t('描述列表与结果页', 'Descriptions and result') }}</p>
        <div class="materin-docs-demo__grid">
          <MiDescriptions
            :title="t('本次发布', 'This release')"
            :items="[
              { label: t('版本'), value: 'v0.6.0' },
              { label: t('组件数'), value: '55' },
              { label: t('契约检查'), value: '通过' }
            ]"
          />
          <MiResult
            status="success"
            :title="t('发布完成', 'Published')"
            :description="t('文档站已更新，约 70 秒后全量生效。', 'The docs site is updated; allow about 70 seconds.')"
          >
            <template #extra>
              <MiButton size="sm">{{ t('查看', 'View') }}</MiButton>
            </template>
          </MiResult>
        </div>
      </div>

      <div class="materin-docs-demo materin-docs-demo--column">
        <p class="materin-docs-demo__label">{{ t('折叠面板（手风琴）', 'Collapse (accordion)') }}</p>
        <MiCollapse v-model="openPanes" accordion>
          <MiCollapseItem name="a" :title="t('命名契约是什么？', 'What is the naming contract?')">
            {{ t('materin-范围-组件：按名锁定组件位置与风格。', 'scope then component: the name pins down where a component lives and how it looks.') }}
          </MiCollapseItem>
          <MiCollapseItem name="b" :title="t('为什么组件层不允许裸色值？', 'Why no raw colours?')">
            {{ t('颜色一律走令牌，主题切换与降级才不会漏。', 'All colours go through tokens so theme switches and fallbacks never miss.') }}
          </MiCollapseItem>
          <MiCollapseItem name="c" :title="t('文档站和 npm 包是什么关系？', 'Docs site vs npm package?')">
            {{ t('同一个仓库：packages/ 发包，docs/ 发站点。', 'One repo: packages/ ships the library, docs/ ships the site.') }}
          </MiCollapseItem>
        </MiCollapse>
      </div>

      <div class="materin-docs-demo materin-docs-demo--column">
        <p class="materin-docs-demo__label">{{ t('时间线', 'Timeline') }}</p>
        <MiTimeline>
          <MiTimelineItem v-for="step in steps" :key="step.ts" :timestamp="step.ts" :color="step.color">
            {{ step.text }}
          </MiTimelineItem>
        </MiTimeline>
      </div>

      <div class="materin-docs-demo materin-docs-demo--column">
        <p class="materin-docs-demo__label">{{ t('分页（点页码试试）', 'Pagination (click around)') }}</p>
        <MiPagination :total="930" :page-size="30" :current-page="page" @change="onPage" />
        <MiText size="sm" type="muted">{{ t('当前页', 'page') }} {{ page }}</MiText>
      </div>

      <div class="materin-docs-demo materin-docs-demo--column">
        <p class="materin-docs-demo__label">{{ t('分段控制', 'Segmented') }}</p>
        <MiSegmented v-model="view" :options="viewOptions" block />
        <MiText size="sm" type="muted">{{ t('当前视图', 'view') }}: {{ view }}</MiText>
      </div>

      <div class="materin-docs-demo materin-docs-demo--column">
        <p class="materin-docs-demo__label">{{ t('图片（占位扫光与失败回落）', 'Image (shimmer and fallback)') }}</p>
        <MiSpace wrap :size="12">
          <MiImage src="/materin-ui/tokens/materin-ui.css" :width="120" :height="80" :fallback-text="t('加载失败', 'Failed')" />
          <MiImage src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='80'%3E%3Crect width='120' height='80' fill='%235b8cff'/%3E%3C/svg%3E" :width="120" :height="80" rounded />
        </MiSpace>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  MiButton,
  MiCollapse,
  MiCollapseItem,
  MiDescriptions,
  MiImage,
  MiPagination,
  MiProgress,
  MiResult,
  MiSegmented,
  MiSpace,
  MiStatistic,
  MiText,
  MiTimeline,
  MiTimelineItem
} from '@/materin-ui/index'

const props = withDefaults(defineProps<{ lang?: 'zh' | 'en' }>(), { lang: 'zh' })
const t = (zh: string, en: string) => (props.lang === 'zh' ? zh : en)

const percent = ref(40)
const bump = () => {
  percent.value = (percent.value + 20) % 120
  if (percent.value > 100) percent.value = 5
}

const openPanes = ref<(string | number)[]>(['a'])
const page = ref(4)
const onPage = (value: number) => {
  page.value = value
}

const view = ref<string | number>('tokens')
const viewOptions = [
  { label: t('令牌', 'Tokens'), value: 'tokens' },
  { label: t('组件', 'Components'), value: 'components' },
  { label: t('路线图', 'Roadmap'), value: 'roadmap' }
]

const steps = [
  { ts: '2026-09-25 00:20', color: 'primary', text: t('组织建立，品牌站首推。', 'Org created, brand site pushed.') },
  { ts: '2026-09-25 01:40', color: 'primary', text: t('UI 仓库建立。', 'UI repo created.') },
  { ts: '2026-09-25 04:00', color: 'success', text: t('表单层与反馈层上线。', 'Form and feedback layers shipped.') },
  { ts: '2026-09-25 06:30', color: 'warning', text: t('数据展示层进行中。', 'Data display layer in progress.') }
]
</script>
