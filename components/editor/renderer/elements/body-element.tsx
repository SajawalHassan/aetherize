import { useAppDispatch, useAppSelector } from "@/editor-store/hooks";
import { Elementmanager } from "../element-manager";
import { BODY_TAG_ID } from "@/lib/constants";
import {
  addElement,
  changeSelectedElementId,
} from "@/editor-store/editor-slice";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { v4 } from "uuid";
import { DragEvent } from "react";

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
        id: v4(),
        name: draggedElement.name,
        canContain: draggedElement.canContain,
        parentId,
        styles: {},
        type: draggedElement.type,
      })
    );
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

      {elements
        .filter((e) => e.parentId === BODY_TAG_ID)
        .map((e) => (
          <Elementmanager element={e} key={e.id} />
        ))}
    </div>
  );
};
