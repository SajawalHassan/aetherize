"use client";

import { Builder } from "./builder/builder";
import { FunctionsSidebar } from "./functions-sidebar/functions-sidebar";
import { EditorHeader } from "./header/editor-header";
import { EditorSidebar } from "./sidebar/editor-sidebar";

type Props = {};

export const Editor = (props: Props) => {
  return (
    <div className="flex min-h-screen flex-col bg-th-bg text-th-text">
      <EditorHeader />
      <div className="flex h-4 flex-grow gap-x-[16px] overflow-y-auto px-[16px] py-[21px]">
        <FunctionsSidebar />
        <Builder />
        <EditorSidebar />
      </div>
    </div>
  );
};
