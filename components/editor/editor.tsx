"use client";

import { EditorStoreProvider } from "@/providers/editor-store-provider";

interface Props {}

export const Editor = (props: Props) => {
  return (
    <EditorStoreProvider>
      <div>Editor</div>
    </EditorStoreProvider>
  );
};
