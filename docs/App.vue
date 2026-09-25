<template>
  <header class="materin-docs-header">
    <div class="materin-docs-wrap materin-docs-header__inner">
      <a class="materin-docs-brand" href="/materin-ui/">
        <strong class="materin-docs-brand__name">Materin UI</strong>
        <span class="materin-docs-brand__version">v{{ version }}</span>
      </a>
      <nav class="materin-docs-nav">
        <a href="#install">{{ t('安装', 'Install') }}</a>
        <a href="#tokens">{{ t('令牌', 'Tokens') }}</a>
        <a href="#components">{{ t('组件', 'Components') }}</a>
        <a href="#layout">{{ t('布局与基础', 'Layout') }}</a>
        <a href="#form">{{ t('表单', 'Forms') }}</a>
        <a href="#contract">{{ t('命名契约', 'Contract') }}</a>
        <button class="materin-docs-toggle" type="button" @click="toggleLang">{{ lang === 'zh' ? 'EN' : '中' }}</button>
        <button class="materin-docs-toggle" type="button" :aria-label="t('切换主题', 'Toggle theme')" @click="toggleTheme">
          {{ theme === 'dark' ? '🌙' : '☀️' }}
        </button>
      </nav>
    </div>
  </header>

  <main class="materin-docs-hero">
    <div class="materin-docs-wrap">
      <h1>{{ t('一套令牌，一套命名，一个 Vue 组件库', 'One set of tokens, one naming contract, one Vue 3 library') }}</h1>
      <p>
        {{
          t(
            'Materin UI 让 Vue 组件、组织站点与 Obsidian 插件共用同一套颜色、形状、间距和命名。颜色跟随宿主主题，形状与间距固定，组件按名可查。',
            'Materin UI keeps Vue components, the org site and the Obsidian plugins on one set of colours, shapes, spacing and names. Colours follow the host theme, shape and spacing are fixed, and every component can be found by name.'
          )
        }}
      </p>
      <div class="materin-docs-hero__actions">
        <MiButton type="primary" @click="scrollTo('components')">{{ t('看组件', 'Browse components') }}</MiButton>
        <MiButton @click="scrollTo('install')">{{ t('安装方式', 'How to install') }}</MiButton>
      </div>
    </div>
  </main>

  <section id="install" class="materin-docs-section">
    <div class="materin-docs-wrap">
      <div class="materin-docs-section__head">
        <h2>{{ t('安装与使用', 'Install and use') }}</h2>
        <p>{{ t('包名 @materin-tech/materin-ui，Vue 3 是 peer 依赖（^3.3）。', 'Package @materin-tech/materin-ui. Vue 3 is a peer dependency (^3.3).') }}</p>
      </div>
      <pre class="materin-docs-code"><code>{{ installSnippet }}</code></pre>
      <pre class="materin-docs-code"><code>{{ usageSnippet }}</code></pre>
      <p class="materin-docs-section__head" style="margin:0;color:var(--materin-text-muted)">
        {{ t(
          '令牌表单独发布，可直接给非 Vue 项目用（Obsidian 插件就只取这一份）。',
          'The token sheet ships separately, so non-Vue projects can use it directly — the Obsidian plugins take just this file.'
        ) }}
      </p>
      <pre class="materin-docs-code"><code>{{ tokensSnippet }}</code></pre>
    </div>
  </section>

  <section id="tokens" class="materin-docs-section">
    <div class="materin-docs-wrap">
      <div class="materin-docs-section__head">
        <h2>{{ t('令牌', 'Tokens') }}</h2>
        <p>
          {{
            t(
              '取值规则是「先宿主、后品牌」：宿主（Obsidian 主题）有该变量就用宿主的，没有才用品牌回落值。下表的值是实时从页面读出来的 —— 切换主题，数字会跟着变。',
              'Host first, brand second: if the host (an Obsidian theme) defines the variable it wins, otherwise the brand fallback applies. Values below are read live from this page — switch the theme and they change.'
            )
          }}
        </p>
      </div>

      <table class="materin-docs-tokens">
        <thead>
          <tr>
            <th>{{ t('令牌', 'Token') }}</th>
            <th>{{ t('当前取值', 'Live value') }}</th>
            <th>{{ t('用途', 'Used for') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in tokenRows" :key="row.name">
            <td>
              <span v-if="row.color" class="materin-docs-swatch" :style="{ background: `var(${row.name})` }"></span>
              <code>{{ row.name }}</code>
            </td>
            <td><code>{{ row.value || '—' }}</code></td>
            <td>{{ t(row.zh, row.en) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section id="components" class="materin-docs-section">
    <div class="materin-docs-wrap">
      <div class="materin-docs-section__head">
        <h2>{{ t('组件', 'Components') }}</h2>
        <p>{{ t('下面是真组件在跑，不是截图。每块都标了类名前缀，方便按名在代码里定位。', 'These are the real components running, not screenshots. Each block states its class prefix so you can locate it by name in the source.') }}</p>
        <p style="margin-top:8px;color:var(--materin-text-muted)">
          {{
            t(
              '当前 34 个组件（布局 9、基础与展示 8、表单与选择 13、原有 4），另有 63 个在路线图上：对标 Element Plus 全覆盖，另加 5 个本系列需要的组件。清单见 registry/roadmap.json。',
              '34 components today (9 layout, 8 foundation, 13 form and choice, 4 original), with 63 more on the roadmap: full Element Plus coverage plus five components this series needs. The list lives in registry/roadmap.json.'
            )
          }}
        </p>
      </div>

      <div class="materin-docs-demo materin-docs-demo--column">
        <p class="materin-docs-demo__label">MiButton · <code>materin-ui-btn</code></p>
        <div class="materin-docs-demo__grid">
          <div>
            <MiButton type="primary">primary</MiButton>
            <MiButton type="secondary">secondary</MiButton>
            <MiButton type="ghost">ghost</MiButton>
            <MiButton type="danger">danger</MiButton>
          </div>
          <div>
            <MiButton size="sm">small</MiButton>
            <MiButton size="md">medium</MiButton>
            <MiButton size="lg">large</MiButton>
          </div>
          <div>
            <MiButton loading>{{ t('加载中', 'Loading') }}</MiButton>
            <MiButton disabled>{{ t('禁用', 'Disabled') }}</MiButton>
            <MiButton>
              <template #icon>★</template>
              {{ t('带图标', 'With icon') }}
            </MiButton>
          </div>
          <div>
            <MiButton type="primary" block>{{ t('块级按钮', 'Block button') }}</MiButton>
          </div>
        </div>
      </div>

      <div class="materin-docs-demo materin-docs-demo--column">
        <p class="materin-docs-demo__label">MiInput · <code>materin-ui-field</code></p>
        <div class="materin-docs-demo__grid">
          <MiInput v-model="form.name" :label="t('名称', 'Name')" :hint="t('会跟随主题色', 'Follows the theme accent')" />
          <MiInput v-model="form.email" :label="t('邮箱', 'Email')" type="email" clearable :placeholder="t('可清空', 'Clearable')" />
          <MiInput v-model="form.token" :label="t('接口密钥', 'API key')" :error="t('这里演示错误态', 'This is the error state')" />
          <MiInput v-model="form.disabled" :label="t('禁用', 'Disabled')" disabled />
        </div>
      </div>

      <div class="materin-docs-demo materin-docs-demo--column">
        <p class="materin-docs-demo__label">MiTag · <code>materin-ui-tag</code></p>
        <div class="materin-docs-demo__grid">
          <div>
            <MiTag v-for="type in tagTypes" :key="type" :type="type">{{ type }}</MiTag>
          </div>
          <div>
            <MiTag size="sm">sm</MiTag>
            <MiTag size="md">md</MiTag>
            <MiTag size="lg">lg</MiTag>
          </div>
          <div>
            <MiTag type="primary" closable @close="onTagClose">{{ t('可关闭', 'Closable') }}</MiTag>
            <MiTag type="neutral" disabled>{{ t('禁用', 'Disabled') }}</MiTag>
            <span v-if="lastClosed" class="materin-docs-demo__label" style="width:auto">
              {{ t('刚关闭：', 'just closed: ') }}{{ lastClosed }}
            </span>
          </div>
        </div>
      </div>

      <div class="materin-docs-demo materin-docs-demo--column">
        <p class="materin-docs-demo__label">MiCard · <code>materin-ui-card</code></p>
        <div class="materin-docs-demo__grid">
          <MiCard :title="t('默认卡片', 'Default card')" :subtitle="t('elev-1 阴影', 'elev-1 shadow')">
            <p style="margin:0">{{ t('普通表面色，走 surface-3 与圆角令牌。', 'Solid surface, using the surface-3 and radius tokens.') }}</p>
          </MiCard>
          <MiCard variant="glass" :title="t('玻璃卡片', 'Glass card')" :subtitle="t('毛玻璃 + 高光边', 'Frosted glass with a specular edge')" hoverable>
            <p style="margin:0">{{ t('半透明底 + 背景模糊，压在背景上仍可读。', 'Translucent with background blur — still readable over what is behind it.') }}</p>
          </MiCard>
          <MiCard variant="hero" :title="t('Hero 卡片', 'Hero card')" :subtitle="t('强调色渐变', 'Accent gradient')">
            <p style="margin:0">{{ t('用于首屏或强调区块。', 'For hero areas and emphasis.') }}</p>
          </MiCard>
        </div>
      </div>
    </div>
  </section>

  <ComponentsLayer :lang="lang" />

  <FormSection :lang="lang" />

  <section id="contract" class="materin-docs-section">
    <div class="materin-docs-wrap">
      <div class="materin-docs-section__head">
        <h2>{{ t('命名契约', 'Naming contract') }}</h2>
        <p>{{ t('组件能被「按名维护」，前提是名字唯一且带用途。', 'Components can be maintained by name only if names are unique and carry their purpose.') }}</p>
      </div>
      <pre class="materin-docs-code"><code>{{ contractSnippet }}</code></pre>
      <p style="color:var(--materin-text-muted)">
        {{
          t(
            '清单与校验脚本在仓库的 registry/ 与 tools/ 里；跑一次 tools/check-components.py --repo . 就能核对：名字、清单、样式、令牌四者是否一致。',
            'The registry and the checker live in registry/ and tools/. Run tools/check-components.py --repo . to confirm that names, registry, styles and tokens all agree.'
          )
        }}
      </p>
    </div>
  </section>

  <footer class="materin-docs-footer">
    <div class="materin-docs-wrap materin-docs-footer__inner">
      <p>© 2026 Materin · MIT</p>
      <p>
        <a href="https://materin-tech.github.io/">Materin</a>
        ·
        <a href="https://materin-tech.github.io/design/">{{ t('风格规范', 'Style spec') }}</a>
        ·
        <a href="https://materin-tech.github.io/projects/materin-ui/">{{ t('项目说明', 'Project page') }}</a>
        ·
        <a href="https://github.com/materin-tech/materin-ui">GitHub</a>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { MiButton, MiCard, MiInput, MiTag } from '@/materin-ui/index'
import ComponentsLayer from './sections/ComponentsLayer.vue'
import FormSection from './sections/FormSection.vue'

declare const __MI_VERSION__: string
const version = __MI_VERSION__

/* 语言与主题：与组织站点一致的做法（localStorage 记忆，属性驱动样式） */
const lang = ref<'zh' | 'en'>('zh')
const theme = ref<'dark' | 'light'>('dark')

onMounted(() => {
  try {
    const l = localStorage.getItem('mi-lang')
    if (l === 'en' || l === 'zh') lang.value = l
    else lang.value = (navigator.language || 'zh').toLowerCase().startsWith('zh') ? 'zh' : 'en'
    const t0 = localStorage.getItem('mi-theme')
    theme.value = t0 === 'light' ? 'light' : t0 === 'dark' ? 'dark' : theme.value
  } catch (e) {}
  document.documentElement.setAttribute('data-theme', theme.value)
  tick.value++
})

function t(zh: string, en: string): string {
  return lang.value === 'zh' ? zh : en
}

function toggleLang() {
  lang.value = lang.value === 'zh' ? 'en' : 'zh'
  try { localStorage.setItem('mi-lang', lang.value) } catch (e) {}
}

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', theme.value)
  try { localStorage.setItem('mi-theme', theme.value) } catch (e) {}
  tick.value++ // 主题变了，重新读令牌值
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

/* 令牌实时取值：切主题后重读 */
const tick = ref(0)

interface TokenRow {
  name: string
  zh: string
  en: string
  color?: boolean
}

const tokenDefs: TokenRow[] = [
  { name: '--materin-accent', zh: '强调色（宿主 --interactive-accent）', en: 'Accent (host --interactive-accent)', color: true },
  { name: '--materin-on-accent', zh: '强调色上的文字', en: 'Text on accent', color: true },
  { name: '--materin-secondary', zh: '次色：标签与首屏点缀', en: 'Secondary: tags and hero accents', color: true },
  { name: '--materin-surface', zh: '底色', en: 'Base surface', color: true },
  { name: '--materin-surface-2', zh: '次级底（侧栏、代码底）', en: 'Secondary surface', color: true },
  { name: '--materin-surface-3', zh: '卡片底', en: 'Card surface', color: true },
  { name: '--materin-surface-4', zh: '悬停底', en: 'Hover fill', color: true },
  { name: '--materin-border', zh: '描边', en: 'Border', color: true },
  { name: '--materin-text', zh: '正文文字（不加透明度）', en: 'Body text (never translucent)', color: true },
  { name: '--materin-text-muted', zh: '次要文字', en: 'Muted text', color: true },
  { name: '--materin-ok', zh: '成功', en: 'Success', color: true },
  { name: '--materin-warn', zh: '警告', en: 'Warning', color: true },
  { name: '--materin-error', zh: '错误', en: 'Error', color: true },
  { name: '--materin-ok-soft', zh: '成功底色（由语义色派生）', en: 'Success tint (derived)', color: true },
  { name: '--materin-glass-bg', zh: '毛玻璃面（74% + 20px 模糊）', en: 'Glass surface (74% + 20px blur)', color: true },
  { name: '--materin-glass-bg-subtle', zh: '卡片毛玻璃（66%）', en: 'Glass card (66%)', color: true },
  { name: '--materin-glass-highlight', zh: '玻璃高光边', en: 'Glass specular edge', color: true },
  { name: '--materin-radius', zh: '圆角（跟随宿主 --radius-s）', en: 'Radius (host --radius-s)' },
  { name: '--materin-space-3', zh: '间距基数第三档', en: 'Spacing step 3' },
  { name: '--materin-duration-normal', zh: '标准动画时长', en: 'Standard duration' },
  { name: '--materin-font-size-body', zh: '正文字号', en: 'Body size' },
  { name: '--materin-method-get', zh: 'HTTP 方法色（仅 View 用）', en: 'HTTP method colour (View only)', color: true }
]

const tokenRows = computed(() => {
  void tick.value
  const styles = getComputedStyle(document.documentElement)
  return tokenDefs.map((row) => ({ ...row, value: styles.getPropertyValue(row.name).trim() }))
})

const form = ref({ name: '', email: '', token: 'mi_live_0001', disabled: 'disabled' })
const tagTypes = ['primary', 'secondary', 'ok', 'warn', 'error', 'neutral']
const lastClosed = ref('')

function onTagClose(event: MouseEvent) {
  lastClosed.value = (event.target as HTMLElement).textContent?.trim() || ''
}

const installSnippet = `npm install @materin-tech/materin-ui
# 或 pnpm add @materin-tech/materin-ui`

const usageSnippet = `import { createApp } from 'vue'
import MaterinUI from '@materin-tech/materin-ui'
import '@materin-tech/materin-ui/styles'   // 组件样式
import '@materin-tech/materin-ui/tokens'   // 令牌表

createApp(App).use(MaterinUI).mount('#app')`

const tokensSnippet = `<link rel="stylesheet" href="https://materin-tech.github.io/materin-ui/tokens/materin-ui.css">`

const contractSnippet = `materin-<scope>-<component>[__part][--variant]

组件     materin-ui-btn          materin-ui-card__title    materin-ui-tag--ok
布局工具 materin-u-<name>
状态     is-<state>  或  aria-pressed="true"

scope: ui | site | docs | office | view | ctx`
</script>
