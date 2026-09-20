import { INSERT_ORDERED_LIST_COMMAND } from "@lexical/list"
import { ListOrderedIcon } from "lucide-react"

import { ComponentPickerOption } from "@/components/editor/plugins/picker/component-picker-option"

export function NumberedListPickerPlugin() {
  return new ComponentPickerOption("Danh sách đánh số", {
    icon: <ListOrderedIcon className="size-4" />,
    keywords: ["numbered list", "ordered list", "ol", "danh sach danh so", "danh sách đánh số"],
    onSelect: (_, editor) =>
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined),
  })
}
