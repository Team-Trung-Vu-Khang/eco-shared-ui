import { ImageIcon } from "lucide-react"

import { InsertImageDialog } from "@/components/editor/plugins/images-plugin"
import { ComponentPickerOption } from "@/components/editor/plugins/picker/component-picker-option"

export function ImagePickerPlugin() {
  return new ComponentPickerOption("Hình ảnh", {
    icon: <ImageIcon className="size-4" />,
    keywords: ["image", "photo", "picture", "file", "anh", "ảnh", "hinh", "hình"],
    onSelect: (_, editor, showModal) =>
      showModal("Chèn hình ảnh", (onClose) => (
        <InsertImageDialog activeEditor={editor} onClose={onClose} />
      )),
  })
}
