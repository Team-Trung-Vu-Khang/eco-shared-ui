import {
  type InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import type { EditorState, SerializedEditorState } from "lexical";

import { editorTheme } from "@/components/editor/themes/editor-theme";
import { TooltipProvider } from "@/components/ui/tooltip";

import { nodes } from "./nodes";
import { Plugins } from "./plugins";
import type { ClassValue } from "clsx";

const editorConfig: InitialConfigType = {
  nodes,
  namespace: "Editor",
  theme: editorTheme,
  onError: (error: Error) => {
    console.error(error);
  },
};

export function Editor({
  editorState,
  maxLength,
  editorSerializedState,
  initialHtml,
  initialText,
  onChange,
  onSerializedChange,
  contentEditableClassname,
}: {
  maxLength?: number;
  initialHtml?: string;
  initialText?: string;
  editorState?: EditorState;
  contentEditableClassname?: ClassValue;
  editorSerializedState?: SerializedEditorState;
  onChange?: (editorState: EditorState) => void;
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void;
}) {
  return (
    <div className="bg-background overflow-hidden rounded-lg border shadow">
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          ...(editorState ? { editorState } : {}),
          ...(editorSerializedState
            ? { editorState: JSON.stringify(editorSerializedState) }
            : {}),
        }}
      >
        <TooltipProvider>
          <Plugins
            maxLength={maxLength}
            initialHtml={initialHtml}
            initialText={initialText}
            contentEditableClassname={contentEditableClassname}
          />

          <OnChangePlugin
            ignoreSelectionChange={true}
            onChange={(editorState) => {
              onChange?.(editorState);
              onSerializedChange?.(editorState.toJSON());
            }}
          />
        </TooltipProvider>
      </LexicalComposer>
    </div>
  );
}

export type { EditorState, SerializedEditorState };
export { convertHtmlToLexical, convertLexicalToHtml } from "./utils";
