#!/usr/bin/env bash
# 把 materin-ui 正本同步到站点仓库（站点无构建步骤，副本靠这个脚本保持一致）
#
#   ./tools/sync-to-site.sh [站点仓库路径]
#
# 同步三样东西：令牌 / 组件清单 / 校验脚本。同步完自动跑一次校验。
set -euo pipefail

UI_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SITE="${1:-/opt/data/workspace/materin-tech/materin-tech.github.io}"

if [ ! -d "$SITE" ]; then
  echo "站点目录不存在：$SITE" >&2
  exit 2
fi

install -m 644 "$UI_DIR/tokens/materin-ui.css" "$SITE/assets/css/materin-ui.css"
install -m 644 "$UI_DIR/registry/components.json" "$SITE/data/components.json"
install -m 755 "$UI_DIR/tools/check-components.py" "$SITE/tools/check-components.py"

echo "已同步 $UI_DIR → $SITE"
for f in assets/css/materin-ui.css data/components.json tools/check-components.py; do
  printf '  %-30s %6s bytes\n' "$f" "$(wc -c < "$SITE/$f")"
done

echo
python3 "$UI_DIR/tools/check-components.py" --repo "$SITE"
