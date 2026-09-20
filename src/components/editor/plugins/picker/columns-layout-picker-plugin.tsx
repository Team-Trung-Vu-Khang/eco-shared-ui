import { Columns3Icon } from "lucide-react"

import { InsertLayoutDialog } from "@/components/editor/plugins/layout-plugin"
import { ComponentPickerOption } from "@/components/editor/plugins/picker/component-picker-option"

export function ColumnsLayoutPickerPlugin() {
  return new ComponentPickerOption("Bố cục cột", {
    icon: <Columns3Icon className="size-4" />,
    keywords: ["columns", "layout", "grid", "bo cuc cot", "bố cục cột"],
    onSelect: (_, editor, showModal) =>
      showModal("Chèn bố cục cột", (onClose) => (
        <InsertLayoutDialog activeEditor={editor} onClose={onClose} />
      )),
  })
}
