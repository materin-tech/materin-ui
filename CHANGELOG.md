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
