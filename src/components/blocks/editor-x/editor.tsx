import * as React from "react";
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
  // Use a ref to store the initial state so it doesn't change on re-renders
  const memoizedConfig = React.useMemo(() => {
    const config: InitialConfigType = {
      ...editorConfig,
      ...(editorState ? { editorState } : {}),
      ...(editorSerializedState
        ? { editorState: JSON.stringify(editorSerializedState) }
        : {}),
    };
    return config;
  }, []); // Empty dependency array means it's only calculated once on mount

  return (
    <div className="bg-background overflow-hidden rounded-lg border shadow">
      <LexicalComposer initialConfig={memoizedConfig}>
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
