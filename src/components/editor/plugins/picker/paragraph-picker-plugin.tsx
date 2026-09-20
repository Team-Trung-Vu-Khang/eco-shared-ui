import { $setBlocksType } from "@lexical/selection"
import { $createParagraphNode, $getSelection, $isRangeSelection } from "lexical"
import { TextIcon } from "lucide-react"

import { ComponentPickerOption } from "@/components/editor/plugins/picker/component-picker-option"

export function ParagraphPickerPlugin() {
  return new ComponentPickerOption("Đoạn văn", {
    icon: <TextIcon className="size-4" />,
    keywords: ["normal", "paragraph", "p", "text", "doan van", "đoạn văn"],
    onSelect: (_, editor) =>
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createParagraphNode())
        }
      }),
  })
}
