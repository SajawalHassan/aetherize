import React from "react";
import { EditorNavBtn } from "./editor-nav-btn";
import {
  Laptop,
  Smartphone,
  Tablet,
  ArrowLeft,
  UndoIcon,
  RedoIcon,
  EyeIcon,
} from "lucide-react";

type Props = {};

export const EditorNav = (props: Props) => {
  return (
    <nav className="flex items-center justify-between border-b border-gray-500 p-3">
      <aside className="flex items-center gap-x-2">
        <EditorNavBtn Icon={ArrowLeft} srText="Back button" />
        <p>Path: /</p>
      </aside>

      <aside className="flex items-center">
        <EditorNavBtn Icon={Smartphone} srText={"Mobile view"} />
        <EditorNavBtn Icon={Tablet} srText={"Tablet view"} />
        <EditorNavBtn Icon={Laptop} srText={"Laptop view"} />
      </aside>

      <aside className="flex items-center gap-x-2">
        <EditorNavBtn Icon={UndoIcon} srText="Undo action" />
        <EditorNavBtn Icon={RedoIcon} srText="Redo action" />
        <EditorNavBtn Icon={EyeIcon} srText="Live mode" />
      </aside>
    </nav>
  );
};
