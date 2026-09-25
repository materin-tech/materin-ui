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
## 0.3.0 — 2026-09
组件库从 4 个扩到 **21 个**，并立下「对标 Element Plus 全覆盖」的清单。

- 新增布局层：Container / Header / Aside / Main / Footer / Row / Col / Space / Divider
  - 容器方向自动判定（Aside 挂载即转横向）、24 栅格（span / offset / order + xs~xl 断点）、
    间距与分割线（横竖、三种线型、文字位置）
- 新增基础与展示层：Link / Text / Title / Badge / Avatar / Skeleton / SkeletonItem / Empty
- 新增 `registry/roadmap.json`：97 项目标清单（覆盖 Element Plus 92 项 + 本系列额外的 5 件：
  复制按钮 / HTTP 方法徽标 / 状态点 / 毛玻璃面板 / 页面骨架），已完成与待做一目了然
- 新增 `tools/gen-index.py`：库主入口按组件目录自动生成，新增组件不必手改 import
- 新增唤醒式响应：`_shared/breakpoint.ts`（客户端断点，ResizeObserver 于窗口 resize 去抖 80ms）
- 全部组件只引用令牌、零裸色值，并登记进 `registry/components.json`（校验脚本作为门禁）
## 0.4.0 — 2026-09
加上**表单层**，组件数 21 → **34**。

- 新增表单与选择组件 13 个：
  - Form / FormItem：自研轻量校验（必填 / 类型 / 长度 / 区间 / 正则 / 自定义，支持 blur 与 change 触发），
    `validate()` / `validateField()` / `resetFields()` / `clearValidate()` 齐全，标签位置三档
  - InputNumber（步进 / 上下限 / 精度 / 键盘上下键）、Select + Option + OptionGroup（单选多选、
    键盘导航、点击外部关闭、分组标题）、Checkbox + CheckboxGroup、Radio + RadioGroup、
    Switch（开关文案 / 加载态）、Slider（拖动 / 点轨道 / 键盘 / 双滑块区间）、Rate
- Input 接入表单项上下文：尺寸、禁用、错误态与 aria 由 FormItem 统一下发
- 文档站新增「表单与输入控件」实况区（真校验、真报错、真下拉）
- 路线图更新：**已完成 34 / 待做 63**（对标 Element Plus 92 项 + 本系列额外 5 件）
## 0.5.0 — 2026-09
加上**反馈层**，组件数 34 → **44**（含命令式服务）。

- 新增反馈组件 10 个：
  - Alert（四种语义、可关闭、玻璃底）、Loading（局部/全屏遮罩、三档转圈、可带文案）
  - Tooltip / Popover / Popconfirm（同一套浮层机制：四个方向、点外部关闭、延迟可调，
    坐标与点击判定共用 `_shared/popper.ts`）
  - Dialog（遮罩、居中/全屏/玻璃、打开锁滚动、ESC 与点遮罩关闭）、Drawer（四边滑出、可调尺寸）
  - **MiMessage / MiNotification**：一行调用的全局消息与通知，自动挂载宿主、可堆叠、定时关闭
  - Tour：按选择器逐步骤高亮目标并浮动说明，含上一步/下一步/完成
- 文档站新增「反馈与浮层」实况区（真对话框、真抽屉、真消息、真漫游）
- 路线图：**已完成 44 / 待做 53**（对标 Element Plus 92 项 + 本系列额外 5 件）
