import {
  addElement,
  changePrevDraggedElement,
  changeSelectedElementId,
  editElementData,
  ElementData,
} from "@/editor-store/editor-slice";
import { useAppDispatch, useAppSelector } from "@/editor-store/hooks";
import { cn } from "@/lib/utils";
import { Elementmanager } from "./element-manager";
import { Badge } from "@/components/ui/badge";
import { DragEvent, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DragDropHandlers } from "./dragDrop-handlers";

type Props = {
  children: React.ReactNode;
  element: ElementData;
  className?: string;
};

export const ElementLayout = (props: Props) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const dispatch = useAppDispatch();
  const selectedElementId = useAppSelector(
    (state) => state.editorReducer.selectedElementId
  );
  const draggedElement = useAppSelector(
    (state) => state.editorReducer.draggedElement
  );
  const prevDraggedElement = useAppSelector(
    (state) => state.editorReducer.prevDraggedElement
  );
  const elements = useAppSelector((state) => state.editorReducer.elements);
  const isSelected = props.element.id === selectedElementId;

  const childElements = [...elements]
    .filter((e) => e.parentId === props.element.id)
    .sort((a, b) => a.relativeIdx - b.relativeIdx);

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(changeSelectedElementId(props.element.id));
  };

  const handleDrop = (e: DragEvent) => {
    e.stopPropagation();
    if (e.defaultPrevented) return;

    if (!draggedElement) return;

    let parentId = "";
    if (props.element.canContain) parentId = props.element.id;
    else if (!props.element.canContain) parentId = props.element.parentId;

    dispatch(
      addElement({
        element: {
          id: uuidv4(),
          name: draggedElement.name,
          canContain: draggedElement.canContain,
          parentId,
          styles: {},
          type: draggedElement.type,
          relativeIdx: -1,
        },
      })
    );

    setIsDraggingOver(false);
  };

  const handleDragEnter = (e: DragEvent) => {
    e.stopPropagation();

    if (prevDraggedElement && prevDraggedElement.canContain) {
      dispatch(
        changePrevDraggedElement({
          ...prevDraggedElement,
          styles: {
            ...prevDraggedElement.styles,
            backgroundColor: "transparent",
          },
        })
      );
    }

    dispatch(changePrevDraggedElement(props.element));

    if (props.element.canContain) setIsDraggingOver(true);
    else {
      const parentElement = elements.find(
        (e) => e.id === props.element.parentId
      );
      if (!parentElement) return;

      dispatch(
        editElementData({
          ...parentElement,
          styles: { ...parentElement.styles, backgroundColor: "#f4f4f5" },
        })
      );
    }
  };

  const handleDragLeave = (e: DragEvent) => {
    e.stopPropagation();

    if (props.element.canContain) setIsDraggingOver(false);
    else {
      const parentElement = elements.find(
        (e) => e.id === props.element.parentId
      );
      if (!parentElement) return;
      if (prevDraggedElement && prevDraggedElement.canContain) {
        dispatch(
          editElementData({
            ...parentElement,
            styles: { ...parentElement.styles, backgroundColor: "transparent" },
          })
        );
      }
    }
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleOnClick}
      className={cn(
        "border-2 border-transparent relative pl-2 p-10",
        selectedElementId === props.element.id && "border-blue-500",
        isDraggingOver && "bg-zinc-100!",
        props.className
      )}
      style={props.element.styles}
    >
      {isSelected && <Badge text={props.element.name} />}

      {props.children}
      {props.element.canContain &&
        childElements.map((e, idx) => (
          <DragDropHandlers
            relativeIdx={e.relativeIdx}
            idx={idx}
            key={e.id}
            parentId={props.element.id}
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
