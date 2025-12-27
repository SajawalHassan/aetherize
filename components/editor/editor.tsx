"use client";

import { EditorHeader } from "./editor-header";
import { Renderer } from "./renderer/renderer";
import { Sidebar } from "./sidebar/sidebar";

import EditorStoreProvider from "./editor-store-provider";

type Props = {
  playgroundMode: boolean;
};

export const Editor = (props: Props) => {
  return (
    <EditorStoreProvider>
      <div className="min-h-screen bg-black text-white font-finlandica">
        <EditorHeader />
        <div className="flex items-start justify-between">
          <Sidebar />
          <Renderer />
        </div>
      </div>
    </EditorStoreProvider>
  );
};
