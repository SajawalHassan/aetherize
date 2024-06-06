import { EditorElement, selectElement } from "@/slices/editor-slice";
import React from "react";
import { Recursive } from "./recursive";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { cn } from "@/lib/utils";

type Props = {
  element: EditorElement;
};

export const Container = (props: Props) => {
  const dispatch = useAppDispatch();
  const selectedElement = useAppSelector(
    (state) => state.editor.selectedElement,
  );

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedElement && selectedElement.id === props.element.id) {
      dispatch(selectElement(null));
    } else {
      dispatch(selectElement(props.element));
    }
  };

  return (
    <div
      onClick={handleSelect}
      className={cn(
        "w-max border border-dashed border-gray-700 py-2",
        selectedElement?.id === props.element.id &&
          "border border-solid border-gray-300",
      )}
    >
      <p className="text-sm text-gray-300">{props.element.name}</p>
      {Array.isArray(props.element.content) &&
        props.element.content.map((childElement) => (
          <Recursive element={childElement} key={childElement.id} />
        ))}
    </div>
  );
};
