# materin-ui

Materin 系列的 **UI 正本** —— 三个 Obsidian 插件与组织站点共用的颜色、形状、间距、命名。

站点上的规范页：**https://materin-tech.github.io/design/**

## 这是什么

一个 UI，三个插件，一个网页。这个仓库放两样东西：

1. **令牌表** `tokens/materin-ui.css` —— 唯一改风格的地方。取值规则是「先宿主、后品牌」：
   优先取宿主主题变量（Obsidian 的 `--interactive-accent` / `--background-primary` / `--radius-s` …），
   取不到时才用品牌回落值。所以用户换主题，界面自动跟着变。
2. **组件命名契约** `registry/components.json` + `tools/check-components.py` ——
   让界面能被「按名查找、按名维护」，且名字与实现不允许对不上。

## 命名契约

| 类型 | 模式 | 例子 |
| --- | --- | --- |
| 组件 | `materin-<scope>-<component>[__part][--variant]` | `materin-site-card__meta`、`materin-site-btn--primary` |
| 布局 / 工具 | `materin-u-<name>` | `materin-u-wrap`、`materin-u-grid` |
| 状态 | `is-<state>`，优先用 ARIA 属性 | `materin-site-chip[aria-pressed="true"]` |

`scope` 只有五个：`ui`（共享件）、`site`（站点）、`office`、`view`、`ctx`。名字里必须带 scope，
这样全仓库搜 `materin-ctx-` 就能一次拿到该插件的全部 UI。禁止裸类名（`.card`、`.btn`），
也**不允许别名**：一个组件只有一个名字，否则按名查找会落空。`lang-zh` / `lang-en` 是 i18n 系统约定，不参与改名。

## 视觉：透明与半透明

界面分四层，靠背景模糊和描边交代层次，而不是纯色块堆叠：

| 层 | 令牌 | 取值 |
| --- | --- | --- |
| 底色 | `--materin-surface` … | 不透明，定整体明暗 |
| 玻璃面 | `--materin-glass-bg` / `-strong` / `-subtle` | 74% / 90% / 66% 透明 + 背景模糊 |
| 高光边 | `--materin-glass-highlight` | 白色 12% 斜向渐变，让面读作「面」而不是「洞」 |
| 阴影 | `--materin-elev-1` / `-2` | 半透明面必须配阴影；悬停升一级 |

模糊：`--materin-glass-blur` `blur(20px) saturate(180%)`（顶栏）/ `--materin-glass-blur-sm` `blur(12px) saturate(160%)`（卡片、按钮）。

两条硬要求：

- **文字永远实色**，不给文字加透明度 —— 那是最容易把可读性做没的一步。站点实测对比度：
  深色卡片正文 7.13 : 1，浅色 5.51 : 1，均高于无障碍要求的 4.5 : 1。
- **降级只改令牌值**：宿主不支持 `backdrop-filter` 或用户开了「减少透明度」时，
  令牌自动换成不透明表面，组件层不需要写任何一条额外规则。

## 怎么用

**网页**：在站点自己的样式之前引入令牌表。

```html
<link rel="stylesheet" href="/assets/css/materin-ui.css">
<link rel="stylesheet" href="/assets/css/style.css">
```

**Obsidian 插件**：把令牌文件的 `:root` 段复制到插件 `styles.css` 顶部。
不做运行时远程 `@import` —— 插件打包成单文件且要能离线用，远程依赖只会变成新故障点。

**改完先校验**：

```bash
python3 tools/check-components.py --repo /path/to/repo   # 五项契约检查 + 令牌存在性
./tools/sync-to-site.sh                                 # 同步到站点并自动校验
```

## 目录

```
.
├── tokens/materin-ui.css        令牌正本（站点与插件共用的唯一来源）
├── registry/components.json     组件清单（名字 / 范围 / 用途 / 部件 / 变体 / 状态 / 仓库）
└── tools/
    ├── check-components.py      校验：契约 / 存在 / 注册 / 反向 / 裸色值 / 令牌存在性
    └── sync-to-site.sh          同步令牌、清单、校验脚本到站点仓库
```

## 现状

- 站点 `materin-tech.github.io`：48 个类名已全部纳入契约，运行时扫描零遗留；
  33 条组件登记，校验全通过（`--repo` 指向站点即可复现）。
- 三个插件仓库**尚未接入**（见 `registry/components.json` 的 `pending` 段实测数据）：
  Office / View / Ctx 的 `styles.css` 分别 534 / 608 / 135 行，类名 76 / 108 / 20 个；
  差异集中在强调色语义、状态色三套写法、硬编码色值，以及 View 的 `materin-chip`、`materin-doc-*` 缺 scope 段。

## 许可

MIT。
