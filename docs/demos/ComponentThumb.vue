<template>
  <a class="materin-docs-thumb" :href="`#/component/${component.kebab}`">
    <span class="materin-docs-thumb__preview" aria-hidden="true">
      <!-- 图文并茂：每个组件卡片里渲染真实的小样 -->
      <MiButton v-if="kebab === 'button'" size="sm" type="primary">按钮</MiButton>
      <MiButton v-else-if="kebab === 'button-group'" size="sm">
        <span style="display:inline-flex;gap:0">
          <MiButton size="sm" style="border-radius:4px 0 0 4px">日</MiButton>
          <MiButton size="sm" style="border-radius:0">周</MiButton>
          <MiButton size="sm" style="border-radius:0 4px 4px 0">月</MiButton>
        </span>
      </MiButton>
      <MiTag v-else-if="kebab === 'tag'" type="success">标签</MiTag>
      <MiCard v-else-if="kebab === 'card'" title="卡片" :bordered="true" style="width:120px;transform:scale(0.8);transform-origin:center">
        <span style="font-size:11px">内容</span>
      </MiCard>
      <MiIcon v-else-if="kebab === 'icon'" name="search" size="lg" />
      <MiLink v-else-if="kebab === 'link'" href="javascript:void(0)">链接</MiLink>
      <MiText v-else-if="kebab === 'text'" strong>文本</MiText>
      <MiTitle v-else-if="kebab === 'title'" :level="4">标题</MiTitle>
      <MiDivider v-else-if="kebab === 'divider'" style="width:110px" />
      <MiSpace v-else-if="kebab === 'space'" :size="6">
        <MiButton size="sm">A</MiButton>
        <MiButton size="sm">B</MiButton>
      </MiSpace>
      <MiInput v-else-if="kebab === 'input'" placeholder="输入…" style="width:110px" size="sm" />
      <MiInputNumber v-else-if="kebab === 'input-number'" :model-value="5" size="sm" style="width:100px" />
      <MiSwitch v-else-if="kebab === 'switch'" :model-value="true" />
      <MiSlider v-else-if="kebab === 'slider'" :model-value="50" style="width:110px" />
      <MiRate v-else-if="kebab === 'rate'" :model-value="4" />
      <MiCheckbox v-else-if="kebab === 'checkbox'" :model-value="true">多选</MiCheckbox>
      <MiRadio v-else-if="kebab === 'radio'" :model-value="true">单选</MiRadio>
      <MiSelect v-else-if="kebab === 'select'" placeholder="选择" style="width:110px" />
      <MiDatePicker v-else-if="kebab === 'date-picker'" placeholder="日期" style="width:110px" />
      <MiTimePicker v-else-if="kebab === 'time-picker'" placeholder="时间" style="width:100px" />
      <MiColorPicker v-else-if="kebab === 'color-picker'" model-value="#5b8cff" :show-value="false" />
      <MiAlert v-else-if="kebab === 'alert'" type="info" title="提示" style="width:130px" />
      <MiProgress v-else-if="kebab === 'progress'" :percent="65" :show-text="false" style="width:110px" />
      <MiBadge v-else-if="kebab === 'badge'" :value="5"><MiButton size="sm">消息</MiButton></MiBadge>
      <MiAvatar v-else-if="kebab === 'avatar'" label="M" />
      <MiSkeleton v-else-if="kebab === 'skeleton'" style="width:110px" />
      <MiEmpty v-else-if="kebab === 'empty'" description="" style="transform:scale(0.55);transform-origin:center" />
      <MiPagination v-else-if="kebab === 'pagination'" :total="90" :page-size="30" />
      <MiStatistic v-else-if="kebab === 'statistic'" :value="42" title="" />
      <MiResult v-else-if="kebab === 'result'" status="success" style="transform:scale(0.5);transform-origin:center" />
      <MiTree v-else-if="kebab === 'tree'" :nodes="treeNodes" style="font-size:10px" />
      <MiBreadcrumb v-else-if="kebab === 'breadcrumb'" :crumbs="crumbs" />
      <MiSteps v-else-if="kebab === 'steps'" :steps="stepDefs" :current="1" style="transform:scale(0.8);transform-origin:center" />
      <MiDropdown v-else-if="kebab === 'dropdown'" title="菜单" :options="dropdownOptions" />
      <MiTabs v-else-if="kebab === 'tabs'" model-value="a" style="width:130px">
        <div label="A" name="a" />
        <div label="B" name="b" />
      </MiTabs>
      <MiCalendar v-else-if="kebab === 'calendar'" style="transform:scale(0.42);transform-origin:top left;width:238%;margin-left:-69%" />
      <MiImage v-else-if="kebab === 'image'" :src="demoImage" :width="90" :height="54" rounded />
      <MiCopy v-else-if="kebab === 'copy'" text="materin.tech" />
      <MiMethodTag v-else-if="kebab === 'method-tag'" method="GET" />
      <MiStatusDot v-else-if="kebab === 'status-dot'" status="ok" />
      <MiGlassPanel v-else-if="kebab === 'glass-panel'" style="padding:10px;width:120px">
        <span style="font-size:11px">毛玻璃</span>
      </MiGlassPanel>
      <MiScrollbar v-else-if="kebab === 'scrollbar'" style="height:44px;width:110px">
        <div style="height:90px;font-size:10px">滚动内容</div>
      </MiScrollbar>
      <MiIcon v-else name="menu" />
    </span>
    <span class="materin-docs-thumb__name">{{ t(component.zh, component.en) }}</span>
    <span class="materin-docs-thumb__klass">{{ component.klass }}</span>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  MiAlert, MiAvatar, MiBadge, MiBreadcrumb, MiButton, MiCalendar, MiCard, MiCheckbox,
  MiColorPicker, MiCopy, MiDatePicker, MiDivider, MiDropdown, MiEmpty, MiGlassPanel,
  MiIcon, MiImage, MiInput, MiInputNumber, MiLink, MiMethodTag, MiPagination, MiProgress,
  MiRadio, MiRate, MiResult, MiScrollbar, MiSelect, MiSkeleton, MiSlider, MiSpace,
  MiStatistic, MiStatusDot, MiSteps, MiSwitch, MiTable, MiTabs, MiTag,
  MiText, MiTimePicker, MiTitle, MiTree
} from '@/materin-ui/index'

const props = withDefaults(defineProps<{ component: { kebab: string; zh: string; en: string; klass: string }; lang?: 'zh' | 'en' }>(), { lang: 'zh' })
const t = (zh: string, en: string) => (props.lang === 'zh' ? zh : en)
const kebab = computed(() => props.component.kebab)

const treeNodes = [
  { label: 'src', key: 'src', children: [{ label: 'main.ts', key: 'm' }] }
]
const crumbs = [
  { label: '首页' },
  { label: '文档' }
]
const stepDefs = [{ title: '一' }, { title: '二' }, { title: '三' }]
const dropdownOptions = [{ label: '复制' }, { label: '删除', danger: true }]
const demoImage = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'90\' height=\'54\'%3E%3Crect width=\'90\' height=\'54\' fill=\'%235b8cff\'/%3E%3C/svg%3E'
</script>
