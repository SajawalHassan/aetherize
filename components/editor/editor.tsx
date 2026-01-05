"use client";

import { EditorHeader } from "./editor-header";
import { Renderer } from "./renderer/renderer";
import { Sidebar } from "./sidebar/sidebar";

import EditorStoreProvider from "./editor-store-provider";
import { TooltipProvider } from "../ui/tooltip";
import { PropertiesPanel } from "./properties-panel/properties-panel";

type Props = {
  playgroundMode: boolean;
};

export const Editor = (props: Props) => {
  return (
    <EditorStoreProvider>
      {/* Providing just one whole provider for convienience. Subject to change. */}
      <TooltipProvider delayDuration={100}>
        <div className="min-h-screen bg-black text-white font-finlandica">
          <EditorHeader />
          <div className="flex items-start justify-between">
            <Sidebar />
            <Renderer />
            <PropertiesPanel />
          </div>
        </div>
      </TooltipProvider>
    </EditorStoreProvider>
  );
};
