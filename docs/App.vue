<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { groups } from './manifest'
import HomePage from './pages/HomePage.vue'
import ComponentPage from './pages/ComponentPage.vue'
import TokensPage from './pages/TokensPage.vue'
import ComponentsPage from './pages/ComponentsPage.vue'

type Lang = 'zh' | 'en'

const props = withDefaults(defineProps<{ lang?: Lang }>(), { lang: 'zh' })
const emit = defineEmits<{ (e: 'update:lang', value: Lang): void }>()
const t = (zh: string, en: string) => (props.lang === 'zh' ? zh : en)

const allComponents = groups.flatMap((g) =>
  g.components.map((c) => ({ ...c, groupId: g.id, groupZh: g.zh, groupEn: g.en }))
)

/** hash 路由：#/component/button、#/tokens、#/（首页） */
const route = ref(typeof location !== 'undefined' ? location.hash.replace(/^#/, '') || '/' : '/')

const onHashChange = () => {
  route.value = location.hash.replace(/^#/, '') || '/'
}

if (typeof window !== 'undefined') window.addEventListener('hashchange', onHashChange)

const parsed = computed(() => {
  const m = route.value.match(/^\/component\/([a-z-]+)$/)
  if (m) {
    const component = allComponents.find((c) => c.kebab === m[1])
    if (component) return { name: 'component' as const, component }
  }
  if (route.value === '/tokens') return { name: 'tokens' as const, component: null }
  if (route.value === '/components') return { name: 'components' as const, component: null }
  return { name: 'home' as const, component: null }
})

const current = computed(() => parsed.value.component ?? null)

const query = ref('')

const filteredGroups = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return groups
  return groups
    .map((g) => ({
      ...g,
      components: g.components.filter(
        (c) => c.zh.toLowerCase().includes(q) || c.en.toLowerCase().includes(q) || c.kebab.includes(q)
      )
    }))
    .filter((g) => g.components.length > 0)
})

const navOpen = ref(false)

watch(route, () => {
  navOpen.value = false
  if (typeof window !== 'undefined') window.scrollTo({ top: 0 })
})

const version = __MI_VERSION__
</script>

<template>
  <div class="materin-docs-app">
    <header class="materin-docs-header">
      <div class="materin-docs-header__inner">
        <button class="materin-docs-header__burger" type="button" aria-label="目录" @click="navOpen = !navOpen">☰</button>
        <a class="materin-docs-brand" href="#/">
          <span class="materin-docs-brand__name">Materin UI</span>
          <span class="materin-docs-brand__version">v{{ version }}</span>
        </a>
        <nav class="materin-docs-header__links">
          <a href="#/">{{ t('总览', 'Overview') }}</a>
          <a href="#/tokens">{{ t('令牌', 'Tokens') }}</a>
          <a href="#/components">{{ t('组件', 'Components') }}</a>
        </nav>
        <div class="materin-docs-toggle">
          <button
            class="materin-docs-toggle__option"
            :class="{ 'is-active': lang === 'zh' }"
            type="button"
            @click="emit('update:lang', 'zh')"
          >
            中
          </button>
          <button
            class="materin-docs-toggle__option"
            :class="{ 'is-active': lang === 'en' }"
            type="button"
            @click="emit('update:lang', 'en')"
          >
            EN
          </button>
        </div>
      </div>
    </header>

    <div class="materin-docs-shell">
      <aside class="materin-docs-sidebar" :class="{ 'is-open': navOpen }">
        <input
          class="materin-docs-sidebar__search"
          type="search"
          :placeholder="t('搜索组件…', 'Search components…')"
          v-model="query"
        />
        <nav class="materin-docs-sidebar__nav">
          <section v-for="g in filteredGroups" :key="g.id" class="materin-docs-sidebar__group">
            <p class="materin-docs-sidebar__group-title">{{ t(g.zh, g.en) }}</p>
            <a
              v-for="c in g.components"
              :key="c.kebab"
              class="materin-docs-sidebar__link"
              :class="{ 'is-active': current?.kebab === c.kebab }"
              :href="`#/component/${c.kebab}`"
            >
              {{ t(c.zh, c.en) }}
            </a>
          </section>
        </nav>
      </aside>
      <div v-if="navOpen" class="materin-docs-scrim" @click="navOpen = false" />

      <main class="materin-docs-main">
        <HomePage v-if="parsed.name === 'home'" :lang="lang" />
        <TokensPage v-else-if="parsed.name === 'tokens'" :lang="lang" />
        <ComponentsPage v-else-if="parsed.name === 'components'" :lang="lang" />
        <ComponentPage v-else-if="current" :key="current.kebab" :component="current" :lang="lang" />

        <footer class="materin-docs-footer">
          <div class="materin-docs-footer__inner">
            <p>Materin UI v{{ version }} · {{ allComponents.length }} {{ t('个组件', 'components') }}</p>
          </div>
        </footer>
      </main>
    </div>
  </div>
</template>
