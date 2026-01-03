import { useAppDispatch, useAppSelector } from "@/editor-store/hooks";
import { Elementmanager } from "./element-manager";
import { BODY_TAG_ID } from "@/lib/constants";
import {
  addElement,
  changeSelectedElementId,
} from "@/editor-store/editor-slice";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { DragEvent } from "react";
import { DragDropHandlers } from "./dragDrop-handlers";

type Props = {};

export const BodyElement = () => {
  const elements = useAppSelector((state) => state.editorReducer.elements);

  const selectedElementId = useAppSelector(
    (state) => state.editorReducer.selectedElementId
  );
  const draggedElement = useAppSelector(
    (state) => state.editorReducer.draggedElement
  );

  const dispatch = useAppDispatch();

  const element = elements.find((e) => e.id === BODY_TAG_ID);
  if (!element) return null;

  const isSelected = selectedElementId === element.id;
  const childElements = [...elements]
    .filter((e) => e.parentId === BODY_TAG_ID)
    .sort((a, b) => a.relativeIdx - b.relativeIdx);

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(changeSelectedElementId(element.id));
  };

  const handleDrop = (e: DragEvent) => {
    e.stopPropagation();

    if (!draggedElement) return;

    let parentId = "";
    if (element.canContain) parentId = element.id;
    else if (!element.canContain) parentId = element.parentId;

    dispatch(
      addElement({
        element: {
          id: draggedElement.id,
          name: draggedElement.name,
          canContain: draggedElement.canContain,
          parentId,
          styles: {},
          type: draggedElement.type,
          relativeIdx: draggedElement.relativeIdx,
        },
      })
    );
    dispatch(changeSelectedElementId(draggedElement.id));
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={handleOnClick}
      className={cn(
        "border-4 border-transparent min-h-[calc(100vh-88px)] relative",
        isSelected && "border-green-500"
      )}
    >
      {isSelected && <Badge text={element.name} className="bg-green-500" />}

      {childElements.map((e, idx) => (
        <DragDropHandlers
          relativeIdx={e.relativeIdx}
          idx={idx}
          key={e.id}
          parentId={element.id}
          childElements={childElements}
        >
          <p className="absolute text-center text-xl inset-0 m-auto mt-10">
            {e.relativeIdx}
          </p>
          <Elementmanager element={e} />
        </DragDropHandlers>
      ))}
    </div>
  );
};
