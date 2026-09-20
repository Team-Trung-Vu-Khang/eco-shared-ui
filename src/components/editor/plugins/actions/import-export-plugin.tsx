import { exportFile, importFile } from "@lexical/file"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { DownloadIcon, UploadIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function ImportExportPlugin() {
  const [editor] = useLexicalComposerContext()
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"ghost"}
            onClick={() => importFile(editor)}
            title="Nhập"
            aria-label="Nhập nội dung trình soạn thảo từ JSON"
            size={"sm"}
            className="p-2"
          >
            <UploadIcon className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Nhập nội dung</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"ghost"}
            onClick={() =>
              exportFile(editor, {
                fileName: `Playground ${new Date().toISOString()}`,
                source: "Playground",
              })
            }
            title="Xuất"
            aria-label="Xuất nội dung trình soạn thảo ra JSON"
            size={"sm"}
            className="p-2"
          >
            <DownloadIcon className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Xuất nội dung</TooltipContent>
      </Tooltip>
    </>
  )
}
