# materin-ui

> Materin 系列的 **UI 正本** —— 三个 Obsidian 插件、组织站点与 Vue 3 组件库共用的：
> 颜色、形状、间距、命名。

---

## 📦 这个仓库包含两件事

### 1. 设计令牌与命名契约（你已有的部分）

| 文件 | 作用 |
|------|------|
| `tokens/materin-ui.css` | 唯一改风格的地方。取值规则是「先宿主、后品牌」 |
| `registry/components.json` | 组件清单（名字 / 范围 / 用途 / 部件 / 变体 / 状态 / 仓库） |
| `tools/check-components.py` | 八项契约检查 + 令牌存在性校验 + SCSS 镜像对账（含 `.vue`/`.scss`） |
| `registry/roadmap.json` | 对标 Element Plus 的目标清单（97 项，标注已完成 / 待做） |
| `tools/gen-index.py` | 按组件目录自动重建库主入口 |
| `tools/sync-to-site.sh` | 同步到站点并自动校验 |

**取值规则**（重要）：优先取宿主主题变量（Obsidian 的 `--interactive-accent` / `--background-primary` / `--radius-s` …），取不到时才用品牌回落值。所以用户换主题，界面自动跟着变。

**命名契约**：`materin-<scope>-<component>[__part][--variant]`，scope 六档：`ui` / `site` / `docs` / `office` / `view` / `ctx`。

---

### 2. Vue 3 组件库（新增 · v0.2.0）

| 文件 | 作用 |
|------|------|
| `packages/styles/tokens.scss` | SCSS 版令牌（与 CSS tokens 同步） |
| `packages/styles/base.scss` | 基础样式（reset + 排版） |
| `packages/components/` | Vue 3 组件库（**4 个组件**） |

**已实现的组件**（21 个，命名遵循契约）：

| 组 | 组件 | 类名 |
|----|------|------|
| 布局 | Container / Header / Aside / Main / Footer | `materin-ui-container` / `materin-ui-header` / `materin-ui-aside` / `materin-ui-main` / `materin-ui-footer` |
| 布局 | Row / Col（24 栅格，xs~xl 断点） | `materin-ui-row` / `materin-ui-col` |
| 布局 | Space / Divider | `materin-ui-space` / `materin-ui-divider` |
| 基础 | Link / Text / Title | `materin-ui-link` / `materin-ui-text` / `materin-ui-title` |
| 基础 | Badge / Avatar | `materin-ui-badge` / `materin-ui-avatar` |
| 展示 | Skeleton / SkeletonItem / Empty | `materin-ui-skeleton` / `materin-ui-skeleton-item` / `materin-ui-empty` |
| 展示 | Card | `materin-ui-card` |
| 表单 | Input 输入框 | `materin-ui-field` |
| 展示 | Tag 标签 | `materin-ui-tag` |
| 基础 | Button 按钮 | `materin-ui-btn` |

**路线图**：`registry/roadmap.json` —— 97 项目标（Element Plus 92 项全覆盖 + 本系列额外 5 件），
已完成与待做都在里面，改组件时先看它。新增组件后跑 `python3 tools/gen-index.py` 重建库入口。

---

## 🚀 安装使用（Vue 3）

```bash
# 安装
npm install @materin-tech/materin-ui

# Vue 入口
import { createApp } from 'vue'
import App from './App.vue'
import MaterinUI from '@materin-tech/materin-ui'
import '@materin-tech/materin-ui/styles'   // 组件样式
import '@materin-tech/materin-ui/tokens'   // 令牌表

createApp(App).use(MaterinUI).mount('#app')
```

---

## 🎨 设计哲学

| 维度 | 实现 |
|------|------|
| **透明与半透明** | 4 层玻璃（底色 / 玻璃 / 高光边 / 阴影） |
| **降级** | 不支持 `backdrop-filter` → 自动回退到不透明 |
| **暗色/浅色** | 主题切换只改 `--materin-*` 值，组件零适配 |
| **文字** | 永远实色（站点实测对比度：深色 7.13:1，浅色 5.51:1） |
| **圆角** | 跟随宿主：`var(--radius-s, 6px)` |

---

## 📂 目录结构

```
materin-ui/
├── tokens/
│   └── materin-ui.css          ← 唯一令牌正本
├── registry/
│   └── components.json         ← 组件清单
├── tools/
│   ├── check-components.py
│   └── sync-to-site.sh
├── packages/                   ← Vue 3 组件库
│   ├── styles/
│   │   ├── tokens.scss         SCSS 版令牌
│   │   └── base.scss
│   ├── components/
│   │   ├── button/
│   │   ├── input/
│   │   ├── tag/
│   │   └── card/
│   └── materin-ui/index.ts     库主入口
├── docs/                       ← 文档 + 风格展示站点（Vue 单页，源码）
├── docs-dist/                  ← 文档站构建产物（不入库，由 CI 上传 Pages）
├── .github/workflows/docs.yml  ← 契约检查 + 构建 + 部署 Pages
├── CHANGELOG.md
├── LICENSE
├── package.json                ← @materin-tech/materin-ui
├── tsconfig.json / tsconfig.build.json
├── vite.config.ts              ← 文档站（root: docs/）
└── vite.config.lib.ts          ← 组件库打包
```

---

## 🌐 文档站与风格展示

**https://materin-tech.github.io/materin-ui/** —— 组件演示（真组件在跑）、令牌实时取值表、命名契约、安装方式。源码在 `docs/`，推 main 由 CI 构建发布。

本地跑：

```bash
npm install
npm run docs:dev      # 文档站开发预览
npm run docs:build    # 构建到 docs-dist/
```

---

## 📦 发布到 npm

```bash
npm run build         # 打包组件库 + 生成类型声明；prepublishOnly 会自动跑
npm pack --dry-run    # 先看包里有什么
npm publish --access public
```

`files` 只含 `dist` 与令牌/样式，`docs/`、`docs-dist/`、`tools/` 不进包。

---

## 📝 版本

| 版本 | 内容 |
|------|------|
| **0.1** | 令牌表 + 命名契约 + 校验工具 + 3 个 Obsidian 插件待接入 |
| **0.2.0** | + Vue 3 组件库（4 个组件：Button/Input/Tag/Card） |
| **0.2.1** | + 文档与风格展示站点（`docs/` → Pages）；+ 库构建可跑通（`@` 别名、`exports` 对齐 `dist/style.css`、类型声明）；修 `Card.vue` 类型错误与 props 未生效、`base.scss` 26 个未定义 `--mi-*`、`Tag.vue` 硬编码色；令牌补 25 个；检查器扩到 `.vue`/`.scss` |

---

## 许可

MIT © leapord