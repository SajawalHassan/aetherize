"use client";

import { EditorNav } from "./nav/editor-nav";
import { EditorSidebar } from "./sidebar/editor-sidebar";

type Props = {};

export const Editor = (props: Props) => {
  return (
    <div className="flex min-h-screen flex-col bg-th-bg text-th-text">
      <EditorNav />
      <div className="flex h-4 flex-grow overflow-y-auto px-[16px] py-[21px]">
        <EditorSidebar />
      </div>
    </div>
  );
};
