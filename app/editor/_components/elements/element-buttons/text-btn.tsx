"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { BODY_CONTAINER_ID, defaultStyles } from "@/lib/constants";
import { addElement } from "@/slices/editor-slice";
import { v4 } from "uuid";
type Props = {};

export const TextBtn = (props: Props) => {
  const { elements, selectedElement } = useAppSelector((state) => state.editor);
  const dispatch = useAppDispatch();

  const handleAddText = () => {
    let containerId = BODY_CONTAINER_ID;

    if (selectedElement) containerId = selectedElement.id;

    dispatch(
      addElement({
        containerId,
        editorArray: elements,
        newElement: {
          id: v4(),
          name: "Text Field",
          styles: { ...defaultStyles },
          type: "text",
          content: {
            innerText: "Input text",
          },
        },
      }),
    );
  };

  return (
    <div
      draggable={true}
      onDragStart={(e) => {
        e.dataTransfer.clearData();
        e.dataTransfer.setData("type", "text");
      }}
      className="w-max cursor-pointer rounded-md bg-zinc-600 p-4 hover:bg-zinc-700"
      onClick={handleAddText}
    >
      Text
    </div>
  );
};
