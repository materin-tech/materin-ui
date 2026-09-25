#!/usr/bin/env python3
"""按 packages/components/*/index.ts 重新生成库主入口（新增组件不用手改 import）。"""
import re
import pathlib

ROOT = pathlib.Path("/opt/data/workspace/materin-ui")
COMP = ROOT / "packages/components"

skip = {"_shared"}
rows = []
for d in sorted(COMP.iterdir()):
    if not d.is_dir() or d.name in skip:
        continue
    idx = d / "index.ts"
    if not idx.exists():
        continue
    text = idx.read_text(encoding="utf-8")
    m = re.search(r"export \{ default as (Mi\w+) \}", text)
    if not m:
        m = re.search(r"\b(\w+) as (Mi\w+) \}", text)
        names = [m.group(2)] if m else []
    else:
        names = [m.group(1)]
    if not m:
        continue
    t = re.search(r"export type \{ ([^}]+) \}", text)
    rows.append({
        "dir": d.name,
        "comp": names[0],
        "types": [x.strip() for x in t.group(1).split(",")] if t else [],
    })

imports = "\n".join(f"import {r['comp']} from '../components/{r['dir']}'" for r in rows)
names = ", ".join(r["comp"] for r in rows)
type_lines = "\n".join(
    f"export type {{ {', '.join(r['types'])} }} from '../components/{r['dir']}/types'"
    for r in rows if r["types"]
)

content = f'''/**
 * materin-ui 库主入口
 *
 * 使用：
 *   import {{ createApp }} from 'vue'
 *   import MaterinUI from '@materin-tech/materin-ui'
 *   import '@materin-tech/materin-ui/styles'   // 组件样式
 *   import '@materin-tech/materin-ui/tokens'   // Materin UI 令牌表
 *   createApp(App).use(MaterinUI).mount('#app')
 *
 * 命名契约：materin-<scope>-<component>[__part][--variant]
 * scope: ui (共享件) | site | docs | office | view | ctx
 *
 * 本文件由 tools/gen-index.py 生成（新增组件后重跑），不要手改 import 列表。
 */

import type {{ App }} from 'vue'

declare const __MI_VERSION__: string

{imports}

const components = [{names}]

const install = (app: App): void => {{
  components.forEach((component) => {{
    app.component(component.name || component.__name || 'MiComponent', component)
  }})
}}

export {{{names}}}

export default {{
  install,
  version: typeof __MI_VERSION__ === 'string' ? __MI_VERSION__ : '0.0.0-dev'
}}

{type_lines}
'''

(ROOT / "packages/materin-ui/index.ts").write_text(content, encoding="utf-8")
print(f"主入口已重写：{len(rows)} 个组件")
for r in rows:
    print(f"  {r['comp']:14} ← components/{r['dir']}")
