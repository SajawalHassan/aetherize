import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { EditorElementTypes, editorContainerId } from "@/lib/constants";
import { findElementAction } from "@/slices/actions/editor-actions";
import { EditorElement, editorActions } from "@/slices/editor-slice";
import clsx from "clsx";
import React, { useMemo } from "react";
import { v4 } from "uuid";
import { Recursive } from "./recursive";
import { Badge } from "@/components/ui/badge";

type Props = {
  element: EditorElement;
};

export const ContainerElement = (props: Props) => {
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
    e.stopPropagation();

    const componentType = e.dataTransfer.getData(
      "componentType",
    ) as EditorElementTypes;
    if (!componentType) return console.error("No component type specified");

    switch (componentType) {
      case "container":
        dispatch(
          editorActions.addElement({
            containerId: currentElement.id,
            elementsArray: elements,
            newElement: {
              id: v4(),
              name: "Container",
              styles: {},
              type: componentType,
              content: [],
            },
          }),
        );
        break;
      case "mCol":
        dispatch(
          editorActions.addElement({
            containerId: currentElement.id,
            elementsArray: elements,
            newElement: {
              id: v4(),
              name: "Multiple columns",
              styles: {},
              type: componentType,
              content: [],
            },
          }),
        );
        break;
    }
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={(e) => e.preventDefault()}
      onDrop={handleOnDrop}
      onClick={handleSelectElement}
      style={currentElement.styles}
      className={clsx(
        "relative w-full border-spacing-4 p-4 transition-all duration-100",
        {
          "h-full": currentElement.type === editorContainerId,
          "border-2 border-solid border-th-secondary":
            selectedElement?.id === currentElement.id,
          "border-2 border-dashed border-th-btn":
            selectedElement?.id !== currentElement.id,
        },
      )}
    >
      <Badge
        className={clsx(
          "absolute -left-[2.3px] -top-6 hidden rounded-none rounded-t-lg bg-th-secondary",
          {
            block: selectedElement?.id === currentElement.id,
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
