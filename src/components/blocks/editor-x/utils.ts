import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import {
  $getRoot,
  $insertNodes,
  createEditor,
  type SerializedEditorState,
} from "lexical";

import { editorTheme } from "@/components/editor/themes/editor-theme";

import { nodes } from "./nodes";

const config = {
  namespace: "EditorUtils",
  nodes,
  theme: editorTheme,
  onError: (error: Error) => {
    console.error(error);
  },
};

/**
 * Converts a Lexical serialized state (JSON string or object) to an HTML string.
 * This function runs asynchronously.
 */
export const convertLexicalToHtml = (
  editorState: string | SerializedEditorState,
): Promise<string> => {
  return new Promise((resolve) => {
    const editor = createEditor(config);

    const serializedState =
      typeof editorState === "string"
        ? editor.parseEditorState(editorState)
        : editor.parseEditorState(JSON.stringify(editorState));

    editor.setEditorState(serializedState);

    editor.update(() => {
      const html = $generateHtmlFromNodes(editor, null);
      resolve(html);
    });
  });
};

/**
 * Converts an HTML string to a Lexical serialized state object.
 * This function runs asynchronously because editor updates are scheduled.
 */
export const convertHtmlToLexical = (
  html: string,
): Promise<SerializedEditorState> => {
  return new Promise((resolve) => {
    const editor = createEditor(config);

    editor.update(
      () => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(html, "text/html");
        const lexicalNodes = $generateNodesFromDOM(editor, dom);

        const root = $getRoot();
        root.clear();
        root.select();
        $insertNodes(lexicalNodes);
      },
      {
        onUpdate: () => {
          resolve(editor.getEditorState().toJSON());
        },
      },
    );
  });
};
