import { INSERT_UNORDERED_LIST_COMMAND } from "@lexical/list"
import { ListIcon } from "lucide-react"

import { ComponentPickerOption } from "@/components/editor/plugins/picker/component-picker-option"

export function BulletedListPickerPlugin() {
  return new ComponentPickerOption("Danh sách gạch đầu dòng", {
    icon: <ListIcon className="size-4" />,
    keywords: ["bulleted list", "unordered list", "ul", "danh sach", "danh sách"],
    onSelect: (_, editor) =>
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined),
  })
}
