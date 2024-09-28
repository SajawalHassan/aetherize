import { editorActions, EditorElement } from "@/store/slices/editor-slice";
import { useAppDispatch, useAppSelector } from "@/store/store-hooks";
import clsx from "clsx";
import React, { useMemo } from "react";

interface Props {
  element: EditorElement;
}

export const TextElement = (props: Props) => {
  const dispatch = useAppDispatch();
  const editor = useAppSelector((state) => state.editorStore);
  const isSelected = useMemo(() => editor.selectedElements.includes(props.element.id), [editor.selectedElements]);

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(editorActions.selectElement(props.element.id));
  };

  return (
    <div
      className={clsx(
        "border border-transparent hover:border-white/25 w-full transition-all duration-100",
        isSelected && "!border-th-accent2 hover:!border-th-accent2"
      )}
      onClick={handleSelect}>
      <p contentEditable={true} suppressContentEditableWarning className="w-max" onClick={(e) => e.stopPropagation()}>
        {props.element.content.text}
      </p>
    </div>
  );
};
