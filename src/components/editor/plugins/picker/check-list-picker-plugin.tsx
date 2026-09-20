import { INSERT_CHECK_LIST_COMMAND } from "@lexical/list"
import { ListTodoIcon } from "lucide-react"

import { ComponentPickerOption } from "@/components/editor/plugins/picker/component-picker-option"

export function CheckListPickerPlugin() {
  return new ComponentPickerOption("Danh sách kiểm", {
    icon: <ListTodoIcon className="size-4" />,
    keywords: ["check list", "todo list", "danh sach kiem", "danh sách kiểm"],
    onSelect: (_, editor) =>
      editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined),
  })
}
