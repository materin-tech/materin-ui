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
| `tools/check-components.py` | 五项契约检查 + 令牌存在性校验 |
| `tools/sync-to-site.sh` | 同步到站点并自动校验 |

**取值规则**（重要）：优先取宿主主题变量（Obsidian 的 `--interactive-accent` / `--background-primary` / `--radius-s` …），取不到时才用品牌回落值。所以用户换主题，界面自动跟着变。

**命名契约**：`materin-<scope>-<component>[__part][--variant]`，scope 五档：`ui` / `site` / `office` / `view` / `ctx`。

---

### 2. Vue 3 组件库（新增 · v0.2.0）

| 文件 | 作用 |
|------|------|
| `packages/styles/tokens.scss` | SCSS 版令牌（与 CSS tokens 同步） |
| `packages/styles/base.scss` | 基础样式（reset + 排版） |
| `packages/components/` | Vue 3 组件库（**4 个组件**） |

**已实现的组件**（命名遵循契约）：

| 组件 | 类名 | scope |
|------|------|-------|
| Button 按钮 | `materin-ui-btn` | ui（共享件） |
| Input 输入框 | `materin-ui-field` | ui（共享件） |
| Tag 标签 | `materin-ui-tag` | ui（共享件） |
| Card 卡片 | `materin-ui-card` | ui（共享件） |

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
├── docs-dist/                  ← 文档站（GitHub Pages 用）
├── CHANGELOG.md
├── LICENSE
├── package.json                ← @materin-tech/materin-ui
├── tsconfig.json
└── vite.config*.ts
```

---

## 🌐 文档站

组件库文档：https://materin-tech.github.io/materin-ui

---

## 📝 版本

| 版本 | 内容 |
|------|------|
| **0.1** | 令牌表 + 命名契约 + 校验工具 + 3 个 Obsidian 插件待接入 |
| **0.2.0** | + Vue 3 组件库（4 个组件：Button/Input/Tag/Card） |

---

## 许可

MIT © leapord