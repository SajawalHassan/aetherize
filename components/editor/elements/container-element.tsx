import { useAppDispatch, useAppSelector } from "@/store/store-hooks";
import React, { useMemo } from "react";
import { RecursiveElement } from "./recursive-element";
import { editorActions, EditorElement } from "@/store/slices/editor-slice";
import clsx from "clsx";
import { Badge } from "@/components/badge";

type Props = {
  element: EditorElement;
};

export const ContainerElement = (props: Props) => {
  const editor = useAppSelector((state) => state.editorStore);
  const nestedElements = editor.elements.filter((el) => el.containerId.includes(props.element.id));
  const isSelected = useMemo(() => editor.selectedElements.includes(props.element.id), [editor.selectedElements]);

  const dispatch = useAppDispatch();

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(editorActions.selectElement(props.element.id));
  };

  return (
    <div
      className={clsx(
        "relative w-full border border-white/25 hover:border-white/50 p-4 transition-all duration-100",
        isSelected && "!border-th-accent2 hover:!border-th-accent2",
        nestedElements.length === 0 && "min-h-12"
      )}
      onClick={handleSelect}>
      <Badge variant="primary" text={props.element.name} className={clsx(!isSelected && "opacity-0")} />
      {nestedElements.map((el) => (
        <RecursiveElement element={el} key={el.id} />
      ))}
    </div>
  );
};
