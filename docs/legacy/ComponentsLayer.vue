<template>
  <section id="layout" class="materin-docs-section">
    <div class="materin-docs-wrap">
      <div class="materin-docs-section__head">
        <h2>{{ t('布局与基础组件', 'Layout and foundation components') }}</h2>
        <p>
          {{
            t(
              '下面所有东西都是真组件在跑：容器 / 顶栏 / 侧栏 / 主区 / 页脚、24 栅格、间距、分割线、标题与文本、链接、角标、头像、骨架屏、空状态。点「重新加载」看骨架屏切回真实内容。',
              'Everything below is a real component: container / header / aside / main / footer, a 24-column grid, spacing, dividers, headings and text, links, badges, avatars, skeletons and an empty state. Press "Reload" to watch the skeleton hand over to real content.'
            )
          }}
        </p>
      </div>

      <!-- 容器 + 顶栏/侧栏/主区/页脚 -->
      <div class="materin-docs-demo materin-docs-demo--column">
        <p class="materin-docs-demo__label">
          MiContainer / MiHeader / MiAside / MiMain / MiFooter ·
          <code>materin-ui-container</code> 等
        </p>
        <MiContainer style="height: 260px">
          <MiHeader :height="46">
            <strong>Materin</strong>
            <MiTag type="ok" size="sm">顶栏</MiTag>
            <MiSpace style="margin-left: auto" :size="8">
              <MiAvatar size="sm" name="M" />
              <MiBadge :value="3" type="primary"><MiAvatar size="sm" name="Q" /></MiBadge>
            </MiSpace>
          </MiHeader>
          <MiContainer>
            <MiAside :width="160">
              <MiSpace direction="vertical" :size="10" fill>
                <MiText size="sm" strong>{{ t('侧栏', 'Aside') }}</MiText>
                <MiLink v-for="item in asideItems" :key="item" type="default" :underline="false">{{ item }}</MiLink>
              </MiSpace>
            </MiAside>
            <MiMain>
              <MiSpace direction="vertical" :size="12" fill>
                <MiTitle :level="4">{{ t('主区', 'Main region') }}</MiTitle>
                <MiText type="secondary" size="sm">
                  {{ t('侧栏一出现，容器自动转为横向（无需手写 direction）。', 'As soon as the aside mounts, the container turns horizontal — no direction prop needed.') }}
                </MiText>
                <MiRow :gutter="12">
                  <MiCol :span="8"><MiSkeletonItem variant="rect" height="52" /></MiCol>
                  <MiCol :span="8"><MiSkeletonItem variant="rect" height="52" /></MiCol>
                  <MiCol :span="8"><MiSkeletonItem variant="rect" height="52" /></MiCol>
                </MiRow>
              </MiSpace>
            </MiMain>
          </MiContainer>
          <MiFooter :height="34">
            <MiText size="sm" type="secondary">页脚 · MiFooter</MiText>
          </MiFooter>
        </MiContainer>
      </div>

      <!-- 栅格 -->
      <div class="materin-docs-demo materin-docs-demo--column">
        <p class="materin-docs-demo__label">MiRow / MiCol · <code>materin-ui-row</code> <code>materin-ui-col</code></p>
        <MiRow :gutter="12">
          <MiCol v-for="n in 12" :key="n" :span="6" :md="4" :lg="2">
            <div class="materin-docs-demo__label" style="width: auto; text-align: center; padding: 8px 0; border-radius: 8px; background: rgba(0, 0, 0, 0)">
              <MiTag size="sm" :type="n % 3 === 0 ? 'primary' : 'neutral'">{{ n }}</MiTag>
            </div>
          </MiCol>
        </MiRow>
      </div>

      <!-- 间距与分割线 -->
      <div class="materin-docs-demo materin-docs-demo--column">
        <p class="materin-docs-demo__label">MiSpace / MiDivider · <code>materin-ui-space</code> <code>materin-ui-divider</code></p>
        <MiSpace :size="12" wrap>
          <MiButton size="sm" v-for="s in ['sm', 'md', 'lg']" :key="s" type="secondary">size={{ s }}</MiButton>
        </MiSpace>
        <MiDivider>{{ t('居中文字', 'Centred text') }}</MiDivider>
        <MiDivider content-position="left" border-style="dashed">{{ t('左侧 · 虚线', 'Left · dashed') }}</MiDivider>
        <MiSpace :size="10">
          <MiText size="sm">GET</MiText>
          <MiDivider direction="vertical" />
          <MiText size="sm">POST</MiText>
          <MiDivider direction="vertical" />
          <MiText size="sm" type="secondary">{{ t('竖分割线', 'Vertical divider') }}</MiText>
        </MiSpace>
      </div>

      <!-- 文本与链接 -->
      <div class="materin-docs-demo materin-docs-demo--column">
        <p class="materin-docs-demo__label">MiTitle / MiText / MiLink · <code>materin-ui-title</code> <code>materin-ui-text</code> <code>materin-ui-link</code></p>
        <MiSpace direction="vertical" :size="8" fill>
          <MiTitle :level="3">{{ t('三级标题', 'Level 3 heading') }}</MiTitle>
          <MiText>{{ t('正文文本，默认语义色。', 'Body text in the default semantic colour.') }}</MiText>
          <MiText type="secondary" size="sm">{{ t('次要文本 + 小号。', 'Secondary text, small size.') }}</MiText>
          <MiText type="success" strong>{{ t('成功色 + 加粗。', 'Success colour, bold.') }}</MiText>
          <MiText truncated style="max-width: 320px">
            {{ t('单行省略：这一行故意写得很长很长很长很长很长很长很长很长很长，超出宽度就截断。', 'Single-line truncation: this line is deliberately long, long, long so that it gets cut off at the container width.') }}
          </MiText>
          <MiSpace :size="12" wrap>
            <MiLink v-for="type in linkTypes" :key="type" :type="type">{{ type }}</MiLink>
            <MiLink type="primary" :underline="false" disabled>disabled</MiLink>
          </MiSpace>
        </MiSpace>
      </div>

      <!-- 角标与头像 -->
      <div class="materin-docs-demo materin-docs-demo--column">
        <p class="materin-docs-demo__label">MiBadge / MiAvatar · <code>materin-ui-badge</code> <code>materin-ui-avatar</code></p>
        <MiSpace :size="20" wrap>
          <MiBadge :value="5" type="danger"><MiButton size="sm" type="secondary">{{ t('消息', 'Inbox') }}</MiButton></MiBadge>
          <MiBadge :value="128" :max="99" type="primary"><MiAvatar name="M" /></MiBadge>
          <MiBadge is-dot type="success"><MiAvatar name="V" /></MiBadge>
          <MiBadge :value="'NEW'" type="warning" standalone />
          <MiSpace :size="10">
            <MiAvatar size="sm" name="S" />
            <MiAvatar size="md" name="M" />
            <MiAvatar size="lg" name="L" />
            <MiAvatar shape="square" size="md" name="Q" />
          </MiSpace>
        </MiSpace>
      </div>

      <!-- 骨架屏与空状态 -->
      <div class="materin-docs-demo materin-docs-demo--column">
        <p class="materin-docs-demo__label">MiSkeleton / MiEmpty · <code>materin-ui-skeleton</code> <code>materin-ui-empty</code></p>
        <MiSpace :size="12" style="margin-bottom: 12px">
          <MiButton size="sm" @click="reload">{{ t('重新加载', 'Reload') }}</MiButton>
          <MiText size="sm" type="secondary">{{ loading ? t('加载中…', 'Loading…') : t('已加载', 'Loaded') }}</MiText>
        </MiSpace>
        <div class="materin-docs-demo__grid">
          <MiSkeleton :rows="4" :loading="loading">
            <MiCard :title="t('加载完成', 'Loaded')" :subtitle="t('骨架屏已让位', 'The skeleton has stepped aside')">
              <MiText size="sm">{{ t('这是一段真实内容，替换掉了上面的占位块。', 'This is real content replacing the placeholder blocks.') }}</MiText>
            </MiCard>
          </MiSkeleton>
          <MiEmpty :description="t('这里还没有内容', 'Nothing here yet')">
            <template #bottom>
              <MiButton size="sm" type="primary">{{ t('新建', 'Create') }}</MiButton>
            </template>
          </MiEmpty>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  MiAside,
  MiAvatar,
  MiBadge,
  MiButton,
  MiCard,
  MiCol,
  MiContainer,
  MiDivider,
  MiEmpty,
  MiFooter,
  MiHeader,
  MiLink,
  MiMain,
  MiRow,
  MiSkeleton,
  MiSkeletonItem,
  MiSpace,
  MiTag,
  MiText,
  MiTitle
} from '@/materin-ui/index'

const props = defineProps<{ lang: 'zh' | 'en' }>()

const t = (zh: string, en: string) => (props.lang === 'zh' ? zh : en)

const loading = ref(true)
const reload = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1200)
}

const asideItems = ['概览', '令牌', '组件', '契约']
const linkTypes = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'default']
</script>
