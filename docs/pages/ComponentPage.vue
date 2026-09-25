<template>
  <article v-if="component" class="materin-docs-section">
    <div class="materin-docs-section__head">
      <p class="materin-docs-component__group">{{ t(component.groupZh, component.groupEn) }}</p>
      <h1>{{ t(component.zh, component.en) }}</h1>
      <p class="materin-docs-component__purpose">
        {{ t(component.purpose.zh, component.purpose.en) }}
      </p>
      <div class="materin-docs-component__meta">
        <code class="materin-docs-component__klass">{{ component.klass }}</code>
        <code v-for="name in component.exports" :key="name" class="materin-docs-component__export">
          &lt;{{ name }} /&gt;
        </code>
      </div>
    </div>

    <!-- 实况示例 -->
    <section v-if="component.hasDemo" class="materin-docs-section">
      <div class="materin-docs-section__head">
        <h2>{{ t('实况演示', 'Live demo') }}</h2>
      </div>
      <DemoHost :kebab="component.kebab" :lang="lang" />
    </section>

    <!-- Props API -->
    <section class="materin-docs-section">
      <div class="materin-docs-section__head">
        <h2>Props</h2>
      </div>
      <table v-if="component.props.length" class="materin-docs-api">
        <thead>
          <tr>
            <th>{{ t('属性', 'Prop') }}</th>
            <th>{{ t('类型', 'Type') }}</th>
            <th>{{ t('必填', 'Required') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prop in component.props" :key="prop.name">
            <td><code>{{ prop.name }}</code></td>
            <td><code>{{ prop.type }}</code></td>
            <td>{{ prop.required ? t('是', 'yes') : '—' }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else class="materin-docs-component__none">
        {{ t('该组件以函数或子件形式使用，见「导入」一栏。', 'Used as a function or sub-component — see Imports above.') }}
      </p>
    </section>

    <!-- 类名契约 -->
    <section class="materin-docs-section">
      <div class="materin-docs-section__head">
        <h2>{{ t('类名契约', 'Class contract') }}</h2>
        <p>
          {{
            t(
              '命名即定位：materin-<scope>-<component>，修饰用 --variant，部件用 __part，状态用 is-*。',
              'Names locate code: materin-<scope>-<component>, modifiers with --, parts with __, states with is-*.'
            )
          }}
        </p>
      </div>
      <dl class="materin-docs-contract">
        <div class="materin-docs-contract__row">
          <dt>{{ t('根类', 'Root') }}</dt>
          <dd><code>{{ component.klass }}</code></dd>
        </div>
        <div v-if="component.parts.length" class="materin-docs-contract__row">
          <dt>{{ t('部件', 'Parts') }}</dt>
          <dd>
            <code v-for="part in component.parts" :key="part">{{ part }}</code>
          </dd>
        </div>
        <div v-if="component.variants.length" class="materin-docs-contract__row">
          <dt>{{ t('变体', 'Variants') }}</dt>
          <dd>
            <code v-for="variant in component.variants" :key="variant">{{ component.klass + variant }}</code>
          </dd>
        </div>
        <div v-if="component.states.length" class="materin-docs-contract__row">
          <dt>{{ t('状态', 'States') }}</dt>
          <dd>
            <code v-for="state in component.states" :key="state">{{ state }}</code>
          </dd>
        </div>
      </dl>
    </section>

    <!-- 上一页 / 下一页 -->
    <nav class="materin-docs-pager">
      <a v-if="prev" :href="`#/component/${prev.kebab}`">← {{ t(prev.zh, prev.en) }}</a>
      <span v-else />
      <a v-if="next" :href="`#/component/${next.kebab}`">{{ t(next.zh, next.en) }} →</a>
    </nav>
  </article>
</template>

<script setup lang="ts">
import { computed, type Component as VueComponent } from 'vue'
import DemoHost from '../demos/DemoHost.vue'
import { groups, type DocComponent } from '../manifest'

const props = withDefaults(defineProps<{ component: DocComponent; lang?: 'zh' | 'en' }>(), { lang: 'zh' })
const t = (zh: string, en: string) => (props.lang === 'zh' ? zh : en)

const flat = computed(() => groups.flatMap((g) => g.components))
const index = computed(() => flat.value.findIndex((c) => c.kebab === props.component.kebab))
const prev = computed(() => (index.value > 0 ? flat.value[index.value - 1] : null))
const next = computed(() => (index.value < flat.value.length - 1 ? flat.value[index.value + 1] : null))
</script>
