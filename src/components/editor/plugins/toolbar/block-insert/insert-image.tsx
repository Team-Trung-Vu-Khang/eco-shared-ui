import { ImageIcon } from "lucide-react"

import { useToolbarContext } from "@/components/editor/context/toolbar-context"
import { InsertImageDialog } from "@/components/editor/plugins/images-plugin"
import { SelectItem } from "@/components/ui/select"

export function InsertImage() {
  const { activeEditor, showModal } = useToolbarContext()

  return (
    <SelectItem
      value="image"
      onPointerUp={(e) => {
        showModal("Chèn hình ảnh", (onClose) => (
          <InsertImageDialog activeEditor={activeEditor} onClose={onClose} />
        ))
      }}
      className=""
    >
      <div className="flex items-center gap-1">
        <ImageIcon className="size-4" />
        <span>Hình ảnh</span>
      </div>
    </SelectItem>
  )
}
