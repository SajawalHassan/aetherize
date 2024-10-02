import React from "react";
import { BodyElement } from "./elements/body-element";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface Props {}

export const EditorWebsite = (props: Props) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-full w-full rounded-[10px] bg-th-prot">
        <BodyElement />
      </div>
    </DndProvider>
  );
};
