import { useAppDispatch, useAppSelector } from "@/store/store-hooks";
import React, { useMemo } from "react";
import { RecursiveElement } from "./recursive-element";
import { editorActions, EditorElement } from "@/store/slices/editor-slice";
import clsx from "clsx";

type Props = {
  element: EditorElement;
};

export const ContainerElement = (props: Props) => {
  const editor = useAppSelector((state) => state.editorStore);
  const nestedElements = editor.elements.filter((el) => el.containerId.includes(props.element.id));
  const isSelected = useMemo(() => editor.selectedElements.includes(props.element.id), [editor.selectedElements]);

  const dispatch = useAppDispatch();

  const handleSelect = () => {
    dispatch(editorActions.selectElement(props.element.id));
  };

  return (
    <div>
      <div className={clsx("p-2 border border-white", isSelected && "!border-blue-500")} onClick={handleSelect}>
        ContainerElement | {props.element.id}
      </div>
      <div className="pl-4">
        {nestedElements.map((el) => (
          <RecursiveElement element={el} key={el.id} />
        ))}
      </div>
    </div>
  );
};
