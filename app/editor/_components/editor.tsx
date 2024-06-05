"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { addElement } from "@/slices/editor-slice";
import { Recursive } from "./elements/recursive";
import { EDITOR_CONTAINER_NAME } from "@/lib/constants";
import { v4 } from "uuid";

type Props = {};

export const Editor = (props: Props) => {
  const { elements, selectedElement } = useAppSelector((state) => state.editor);
  const dispatch = useAppDispatch();

  const handleAddTextElement = () => {
    let containerId = EDITOR_CONTAINER_NAME;
    if (selectedElement) containerId = selectedElement.id;

    dispatch(
      addElement({
        containerId,
        editorArray: elements,
        newElement: {
          id: v4(),
          name: "Text",
          styles: {},
          type: "text",
          content: { innerText: "Hello World" },
        },
      }),
    );
  };

  const handleAddContainerElement = () => {
    let containerId = EDITOR_CONTAINER_NAME;
    if (selectedElement) containerId = selectedElement.id;

    dispatch(
      addElement({
        containerId,
        editorArray: elements,
        newElement: {
          id: v4(),
          name: "Container",
          styles: {},
          type: "container",
          content: [],
        },
      }),
    );
  };

  return (
    <div>
      {elements.map((element, i) => (
        <Recursive element={element} key={i} />
      ))}
      <button
        className="rounded-sm bg-gray-200 px-3 py-1.5 transition-all hover:bg-gray-300"
        onClick={handleAddTextElement}
      >
        Add text element
      </button>
      <button
        className="rounded-sm bg-gray-200 px-3 py-1.5 transition-all hover:bg-gray-300"
        onClick={handleAddContainerElement}
      >
        Add container element
      </button>
    </div>
  );
};
