# 版本记录

## 0.1 — 2026-09
首个版本，随「系列共用一套 UI」的定位落地。

- 令牌表 `tokens/materin-ui.css`：强调色 / 表面四层 / 文字 / 语义状态色 / 圆角 / 4px 间距基数 /
  字体 / HTTP 方法色 / 透明与半透明（玻璃底、模糊、高光边、两级阴影）。
  取值规则为「先宿主、后品牌」，浅色主题与两种降级（无 `backdrop-filter`、`prefers-reduced-transparency`）
  都只改令牌值。
- 组件命名契约 `materin-<scope>-<component>[__part][--variant]`；工具 `materin-u-*`；状态 `is-*`。
  scope 五档：`ui` / `site` / `office` / `view` / `ctx`。
- 组件清单 `registry/components.json`（33 条，站点 scope）与校验脚本
  `tools/check-components.py`（契约、存在性、注册、反向引用、裸色值、令牌存在性）。
- 站点侧完成接入：48 个类名纳入契约，组件层零裸色值，浅色值移入令牌层。
- 三个插件仓库尚未接入，差异清单见规范页「待统一项」与清单 `pending` 段。

## 0.2.0 — 2026-09
新增 Vue 3 组件库（@materin-tech/materin-ui npm 包）。

- 新增 `packages/` 目录：4 个 Vue 3 组件，全部遵循 `materin-ui-*` 命名契约
  - Button 按钮（`materin-ui-btn`）：4 种变体（primary/secondary/ghost/danger）× 3 种尺寸 × loading/block
  - Input 输入框（`materin-ui-field`）：3 种尺寸 + label/hint/error + clearable + prefix/suffix slot
  - Tag 标签（`materin-ui-tag`）：6 种主题色 × 3 种尺寸 × closable
  - Card 卡片（`materin-ui-card`）：default/glass/hero 3 种变体 × hoverable
- SCSS 版令牌 `packages/styles/tokens.scss`：与 CSS `tokens/materin-ui.css` 同步
- 库入口 `packages/materin-ui/index.ts`：Vue 插件安装 + 按需引入
- TypeScript 完整类型定义
- 文档站构建配置（Vite）准备好，等待 GitHub Pages 启用

**重要**：
- 所有组件**只引用 `--materin-*` 令牌**，零硬编码颜色
- 玻璃风视觉采用 mixin：`@include materin-glass('strong' | 'normal' | 'subtle')`
- 主题切换零适配：换主题只改令牌值，组件零代码改动

## 0.2.1 — 2026-09
组件库可构建、可发布，并补上文档与风格展示站点。

- 新增文档站 `docs/`（Vue 单页）：真组件演示、令牌实时取值表、命名契约、安装方式；
  源码在 `docs/`，由 `.github/workflows/docs.yml` 构建后发布到
  https://materin-tech.github.io/materin-ui/ （契约检查作为发布门禁）
- 修复「包发出去就是坏的」若干问题：
  - 库构建缺 `@` 别名 → 组件 SCSS 全部编译失败（`@use '@/styles/tokens.scss'`）
  - `exports["./styles"]` 指向 `dist/index.css`，实际产物是 `dist/style.css`
  - 类型声明没有构建步骤；`types` 应为 `dist/materin-ui/index.d.ts`（`vue-tsc` 升到 2.x）
  - CJS 消费方需 `.default` 才能拿到插件，改为显式 `exports: 'named'`
- 修复组件实现缺陷：`Card.vue` 引用不存在的 `customStyle`（类型检查报错、props 全部未生效，
  variant / shadow / hoverable / bordered / width 现在真起作用，取值一律引用令牌）
- 修复 `packages/styles/base.scss`：37 行引用 26 个从未定义的 `--mi-*` 变量 + 硬编码靛蓝
- 修复 `packages/components/tag/Tag.vue`：10 处硬编码 rgba → 语义令牌
- 修复 `packages/styles/tokens.scss` 三处镜像错名（border-strong / text-faint / info）
- 令牌补齐：只在 SCSS 里存在的 25 个（动效 / 字阶 / 间距 6、7 / 语义别名）已进 CSS 正本
- 命名契约新增 `docs` scope（六档：ui / site / docs / office / view / ctx）；文档站 12 个组件入清单
- 校验脚本：扫 `.vue`/`.scss`（含 SCSS 嵌套 `&--variant`）、排除构建产物、修 3 处自身 bug