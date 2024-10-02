import { ElementDropIndicators } from "@/components/element-drop-indicators";
import { editorActions, EditorElement } from "@/store/slices/editor-slice";
import { useAppDispatch, useAppSelector } from "@/store/store-hooks";
import clsx from "clsx";
import React, { useEffect, useMemo } from "react";
import { useDrag } from "react-dnd";

interface Props {
  element: EditorElement;
}

export const TextElement = (props: Props) => {
  const dispatch = useAppDispatch();
  const editor = useAppSelector((state) => state.editorStore);
  const isSelected = useMemo(() => editor.selectedElements.includes(props.element.id), [editor.selectedElements]);

  const [{ isDragging }, dragRef] = useDrag({
    type: "element",
    item: props.element satisfies EditorElement,
    collect: (monitor) => ({
      isDragging: monitor.isDragging() satisfies boolean,
    }),
  });

  useEffect(() => {
    dispatch(editorActions.setIsDragging(isDragging));
  }, [isDragging]);

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(editorActions.selectElement(props.element.id));
  };

  return (
    <div
      ref={dragRef as any}
      className={clsx(
        "border relative border-transparent hover:border-white/25 w-full transition-all duration-100",
        isSelected && "!border-th-accent2 hover:!border-th-accent2"
      )}
      onClick={handleSelect}>
      <ElementDropIndicators element={props.element} />
      <p contentEditable={true} suppressContentEditableWarning className="w-max" onClick={(e) => e.stopPropagation()}>
        {props.element.content.text}
      </p>
    </div>
  );
};
