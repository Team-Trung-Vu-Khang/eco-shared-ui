import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode"
import { MinusIcon } from "lucide-react"

import { ComponentPickerOption } from "@/components/editor/plugins/picker/component-picker-option"

export function DividerPickerPlugin() {
  return new ComponentPickerOption("Đường phân cách", {
    icon: <MinusIcon className="size-4" />,
    keywords: ["horizontal rule", "divider", "hr", "duong ke", "đường kẻ", "phan cach", "phân cách"],
    onSelect: (_, editor) =>
      editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined),
  })
}
