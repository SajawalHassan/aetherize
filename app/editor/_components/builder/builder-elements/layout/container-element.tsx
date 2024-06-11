import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { EditorElementTypes, editorContainerId } from "@/lib/constants";
import { EditorElement, editorActions } from "@/slices/editor-slice";
import clsx from "clsx";
import { v4 } from "uuid";
import { Recursive } from "../recursive";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { dropElement } from "../helper";

type Props = {
  element: EditorElement;
};

export const ContainerElement = (props: Props) => {
  const [dragOverClassName, setDragOverClassName] = useState("");
  const dispatch = useAppDispatch();

  const { selectedElement, elements } = useAppSelector((state) => state.editor);
  const currentElement = props.element;

  const handleSelectElement = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (selectedElement?.id === currentElement.id) {
      dispatch(editorActions.selectElement(null));
    } else {
      dispatch(editorActions.selectElement(currentElement));
    }
  };

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    dropElement(e, currentElement, elements, dispatch);
    setDragOverClassName("");
  };

  return (
    <div
      onDragOver={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setDragOverClassName("bg-th-btn/20");
      }}
      onDragEnter={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setDragOverClassName("bg-th-btn/20");
      }}
      onDragLeave={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setDragOverClassName("");
      }}
      onDrop={handleOnDrop}
      onClick={handleSelectElement}
      style={currentElement.styles}
      className={clsx(
        "relative w-full border-spacing-4 p-4 transition-all duration-100",
        {
          "h-full": currentElement.type === editorContainerId,
          "border-2 border-solid": selectedElement?.id === currentElement.id,
          "border-th-secondary":
            selectedElement?.id === currentElement.id &&
            selectedElement?.type !== editorContainerId,
          "border-th-accent":
            selectedElement?.id === currentElement.id &&
            selectedElement?.type === editorContainerId,
          "border-2 border-dashed border-th-btn":
            selectedElement?.id !== currentElement.id,
        },
        dragOverClassName,
      )}
    >
      <Badge
        className={clsx(
          "absolute -left-[2.3px] -top-6 hidden rounded-none rounded-t-lg",
          {
            block: selectedElement?.id === currentElement.id,
            "bg-th-secondary": selectedElement?.type !== editorContainerId,
            "bg-th-accent": selectedElement?.type === editorContainerId,
          },
        )}
      >
        {props.element.name}
      </Badge>

      {Array.isArray(currentElement.content) &&
        currentElement.content.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}
    </div>
  );
};
