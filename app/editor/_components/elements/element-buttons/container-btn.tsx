"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { BODY_CONTAINER_ID } from "@/lib/constants";
import { addElement } from "@/slices/editor-slice";
import { v4 } from "uuid";

type Props = {};

export const ContainerBtn = (props: Props) => {
  const { elements, selectedElement } = useAppSelector((state) => state.editor);
  const dispatch = useAppDispatch();

  const handleAddContainer = () => {
    let containerId = BODY_CONTAINER_ID;

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
    <div
      className="w-max cursor-pointer rounded-md bg-zinc-600 p-4 hover:bg-zinc-700"
      onClick={handleAddContainer}
    >
      Container
    </div>
  );
};
