#!/usr/bin/env python3
"""生成 docs/manifest.ts：组件分组、用途、props API 表（从 types.ts 解析）、类名契约。"""
import json
import pathlib
import re

ROOT = pathlib.Path("/opt/data/workspace/materin-ui")
COMP = ROOT / "packages/components"

# 分组定义：kebab -> (group_id, zh, en)
COMPONENTS = {
    # 布局子件与补充
    "aside": ("layout", "侧栏", "Aside"),
    "header": ("layout", "顶栏", "Header"),
    "main": ("layout", "主区", "Main"),
    "footer": ("layout", "底栏", "Footer"),
    "col": ("layout", "栅格列", "Col"),
    # 表单子件
    "checkbox-group": ("form", "多选组", "Checkbox group"),
    "radio-group": ("form", "单选组", "Radio group"),
    "option": ("form", "选项", "Option"),
    "option-group": ("form", "选项分组", "Option group"),
    # 数据/其他
    "carousel": ("data", "轮播", "Carousel"),
    "segmented": ("data", "分段控制", "Segmented"),
    "skeleton-item": ("data", "骨架块", "Skeleton item"),
    # 基础
    "button": ("basic", "按钮", "Button"),
    "button-group": ("basic", "按钮组", "Button group"),
    "card": ("basic", "卡片", "Card"),
    "tag": ("basic", "标签", "Tag"),
    "icon": ("basic", "图标", "Icon"),
    "link": ("basic", "链接", "Link"),
    "text": ("basic", "文本", "Text"),
    "title": ("basic", "标题", "Title"),
    "divider": ("basic", "分割线", "Divider"),
    "space": ("basic", "间距", "Space"),
    # 布局
    "container": ("layout", "容器（Header/Aside/Main/Footer）", "Container family"),
    "row": ("layout", "栅格", "Row"),
    "page-shell": ("layout", "页面骨架", "Page shell"),
    "splitter": ("layout", "分栏", "Splitter"),
    "page-header": ("layout", "页头", "Page header"),
    # 表单
    "form": ("form", "表单", "Form"),
    "form-item": ("form", "表单项", "Form item"),
    "input": ("form", "输入框", "Input"),
    "input-number": ("form", "数字输入", "Input number"),
    "select": ("form", "选择器", "Select"),
    "checkbox": ("form", "多选", "Checkbox"),
    "radio": ("form", "单选", "Radio"),
    "switch": ("form", "开关", "Switch"),
    "slider": ("form", "滑块", "Slider"),
    "rate": ("form", "评分", "Rate"),
    "date-picker": ("form", "日期选择", "Date picker"),
    "time-picker": ("form", "时间选择", "Time picker"),
    "time-select": ("form", "时间段选择", "Time select"),
    "upload": ("form", "上传", "Upload"),
    "transfer": ("form", "穿梭框", "Transfer"),
    "cascader": ("form", "级联选择", "Cascader"),
    "color-picker": ("form", "颜色选择", "Color picker"),
    "autocomplete": ("form", "自动补全", "Autocomplete"),
    "mention": ("form", "提及", "Mention"),
    "tree-select": ("form", "树选择", "Tree select"),
    # 反馈
    "alert": ("feedback", "提示条", "Alert"),
    "message": ("feedback", "全局消息", "Message"),
    "message-item": ("feedback", "消息条", "Message item"),
    "notification": ("feedback", "通知", "Notification"),
    "notification-item": ("feedback", "通知条", "Notification item"),
    "message-box": ("feedback", "命令式弹窗", "Message box"),
    "dialog": ("feedback", "对话框", "Dialog"),
    "drawer": ("feedback", "抽屉", "Drawer"),
    "tooltip": ("feedback", "文字提示", "Tooltip"),
    "popover": ("feedback", "气泡卡片", "Popover"),
    "popconfirm": ("feedback", "气泡确认", "Popconfirm"),
    "tour": ("feedback", "漫游引导", "Tour"),
    "loading": ("feedback", "加载", "Loading"),
    "result": ("feedback", "结果页", "Result"),
    # 数据
    "table": ("data", "表格", "Table"),
    "table-column": ("data", "表格列（配置型）", "Table column"),
    "tree": ("data", "树", "Tree"),
    "pagination": ("data", "分页", "Pagination"),
    "badge": ("data", "角标", "Badge"),
    "avatar": ("data", "头像", "Avatar"),
    "progress": ("data", "进度条", "Progress"),
    "statistic": ("data", "统计数值", "Statistic"),
    "descriptions": ("data", "描述列表", "Descriptions"),
    "collapse": ("data", "折叠面板", "Collapse"),
    "collapse-item": ("data", "折叠项", "Collapse item"),
    "timeline": ("data", "时间线", "Timeline"),
    "timeline-item": ("data", "时间线项", "Timeline item"),
    "calendar": ("data", "日历", "Calendar"),
    "image": ("data", "图片", "Image"),
    "qrcode": ("data", "二维码", "QR code"),
    "watermark": ("data", "水印", "Watermark"),
    "infinite-scroll": ("data", "无限滚动", "Infinite scroll"),
    "empty": ("data", "空状态", "Empty"),
    "skeleton": ("data", "骨架屏", "Skeleton"),
    # 导航
    "menu": ("nav", "菜单", "Menu"),
    "tabs": ("nav", "标签页", "Tabs"),
    "breadcrumb": ("nav", "面包屑", "Breadcrumb"),
    "steps": ("nav", "步骤条", "Steps"),
    "dropdown": ("nav", "下拉菜单", "Dropdown"),
    "anchor": ("nav", "锚点", "Anchor"),
    "backtop": ("nav", "回到顶部", "Back to top"),
    "affix": ("nav", "固钉", "Affix"),
    # 系列
    "copy": ("series", "复制按钮", "Copy"),
    "method-tag": ("series", "HTTP 方法徽标", "Method tag"),
    "status-dot": ("series", "状态点", "Status dot"),
    "glass-panel": ("series", "毛玻璃面板", "Glass panel"),
    # 系统
    "config-provider": ("system", "配置注入", "Config provider"),
    "scrollbar": ("system", "滚动条", "Scrollbar"),
}

GROUPS = [
    ("basic", "基础", "Basic"),
    ("layout", "布局", "Layout"),
    ("form", "表单", "Form"),
    ("feedback", "反馈", "Feedback"),
    ("data", "数据展示", "Data"),
    ("nav", "导航", "Navigation"),
    ("series", "本系列", "Series"),
    ("system", "系统", "System"),
]

HAS_DEMO = {"button", "input", "select", "switch", "slider", "dialog", "table",
            "tree", "progress", "alert", "tag", "card", "pagination", "date-picker"}


def parse_props(types_ts: str):
    """从 types.ts 提取 *Props 接口的字段。"""
    props = []
    for m in re.finditer(r"interface\s+(\w*Props)\s*\{([^}]+)\}", types_ts):
        for raw in m.group(2).splitlines():
            line = raw.split("//")[0].strip().rstrip(";").strip()
            if not line or line.startswith("/**") or line.startswith("*"):
                continue
            pm = re.match(r"^(\w+)(\?)?\s*:\s*(.+)$", line)
            if pm:
                props.append({
                    "name": pm.group(1),
                    "required": pm.group(2) is None,
                    "type": pm.group(3).strip(),
                })
    return props


def main():
    # registry：file 路径 -> 条目（拿 klass 与 purpose）
    reg = json.loads((ROOT / "registry/components.json").read_text(encoding="utf-8"))
    by_file = {}
    for c in reg["components"]:
        f = c.get("file", "")
        if f.startswith("packages/components/"):
            by_file[f.split("/")[2]] = c

    groups_out = []
    unmapped = []
    for gid, zh, en in GROUPS:
        groups_out.append({"id": gid, "zh": zh, "en": en, "components": []})

    for d in sorted(COMP.iterdir()):
        if not d.is_dir() or d.name.startswith("_"):
            continue
        idx = d / "index.ts"
        if not idx.exists():
            continue
        kebab = d.name
        if kebab not in COMPONENTS:
            unmapped.append(kebab)
            continue
        gid, zh, en = COMPONENTS[kebab]
        # 配置型/命令式组件自身无样式类，文档页展示宿主类
        HOST_KLASS = {"message-box": "materin-ui-dialog", "table-column": "materin-ui-table"}
        text = idx.read_text(encoding="utf-8")
        names = re.findall(r"export\s+\{([^}]+)\}", text)
        exports = []
        for chunk in names:
            exports += [x.strip().split(" as ")[-1] for x in chunk.split(",") if x.strip()]
        exports = [x for x in exports if x.startswith("Mi")]
        entry = by_file.get(kebab, {})
        # 配置型/命令式组件本身无类名，展示宿主类
        if entry and not entry.get("parts") and not entry.get("variants") and entry.get("name") in ("materin-ui-message-box", "materin-ui-table-column"):
            entry = dict(entry, name="materin-ui-dialog" if kebab == "message-box" else "materin-ui-table")
        types_ts = (d / "types.ts").read_text(encoding="utf-8") if (d / "types.ts").exists() else ""
        groups_out[[g["id"] for g in groups_out].index(gid)]["components"].append({
            "kebab": kebab,
            "zh": zh,
            "en": en,
            "exports": exports,
            "klass": HOST_KLASS.get(kebab, entry.get("name", f"materin-ui-{kebab}")),
            "purpose": entry.get("purpose", {"zh": "", "en": ""}),
            "parts": entry.get("parts", []),
            "variants": entry.get("variants", []),
            "states": entry.get("states", []),
            "props": parse_props(types_ts),
            "hasDemo": kebab in HAS_DEMO,
        })

    if unmapped:
        print("!! 未分组组件:", unmapped)
        return 1

    # 精简输出：不导出多余字段
    lines = [
        "/** 由 tools/gen-docs-manifest.py 生成：组件分组 + API 表。不要手改。 */",
        "export interface DocProp { name: string; required: boolean; type: string }",
        "export interface DocComponent {",
        "  kebab: string; zh: string; en: string; exports: string[]; klass: string;",
        "  purpose: { zh: string; en: string }; parts: string[]; variants: string[]; states: string[];",
        "  props: DocProp[]; hasDemo: boolean",
        "}",
        "export interface DocGroup { id: string; zh: string; en: string; components: DocComponent[] }",
        "",
    ]
    for g in groups_out:
        g["components"].sort(key=lambda c: c["zh"])
    lines.append(f"export const groups: DocGroup[] = {json.dumps(groups_out, ensure_ascii=False, indent=2)}")
    lines.append("")
    total = sum(len(g["components"]) for g in groups_out)
    out = ROOT / "docs/manifest.ts"
    out.write_text("\n".join(lines), encoding="utf-8")
    print(f"manifest.ts 生成：{len(groups_out)} 组 / {total} 页")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
