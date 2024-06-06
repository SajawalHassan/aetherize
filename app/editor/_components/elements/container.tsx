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
    dispatch(selectElement(props.element));
  };

  return (
    <div
      onClick={handleSelect}
      className={cn(
        "p-2",
        selectedElement?.id === props.element.id &&
          "border border-dashed border-gray-500",
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
