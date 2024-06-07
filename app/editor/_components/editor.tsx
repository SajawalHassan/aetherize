"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { Recursive } from "./elements/recursive";
import { EditorNav } from "./nav/editor-nav";
import { EditorSidebar } from "./editor-sidebar";

type Props = {};

export const Editor = (props: Props) => {
  const { elements, selectedElement } = useAppSelector((state) => state.editor);
  const dispatch = useAppDispatch();

  return (
    <div className="flex min-h-screen flex-col">
      <EditorNav />
      <div className="b flex h-full w-full flex-grow">
        <div className="flex-grow p-2">
          {elements.map((element: any, i: number) => (
            <Recursive element={element} key={i} />
          ))}
        </div>
        <EditorSidebar />
      </div>
    </div>
  );
};
