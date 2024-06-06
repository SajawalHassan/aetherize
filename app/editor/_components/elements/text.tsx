"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { EditorElement, updateElement } from "@/slices/editor-slice";

type Props = {
  element: EditorElement;
};

export const Text = (props: Props) => {
  const elements = useAppSelector((state) => state.editor.elements);
  const dispatch = useAppDispatch();

  return (
    <p
      className="w-max"
      contentEditable={true}
      onBlur={(e) => {
        const pTag = e.target as HTMLParagraphElement;

        dispatch(
          updateElement({
            editorArray: elements,
            elementId: props.element.id,
            elementData: {
              ...props.element,
              content: {
                innerText: pTag.innerText,
              },
            },
          }),
        );
      }}
      suppressContentEditableWarning={true}
    >
      {!Array.isArray(props.element.content) && props.element.content.innerText}
    </p>
  );
};
