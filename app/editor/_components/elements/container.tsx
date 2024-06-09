import {
  EditorElement,
  addElement,
  selectElement,
} from "@/slices/editor-slice";
import React from "react";
import { Recursive } from "./recursive";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import clsx from "clsx";
import { Badge } from "@/components/ui/badge";
import { Trash } from "lucide-react";
import { CONTAINER_ID, defaultStyles } from "@/lib/constants";
import { v4 } from "uuid";
import { findElementAction } from "@/actions/editor-actions";

type Props = {
  element: EditorElement;
};

export const Container = (props: Props) => {
  const { content, id, name, styles, type } = props.element;
  const editor = useAppSelector((state) => state.editor);

  const dispatch = useAppDispatch();
  const selectedElement = useAppSelector(
    (state) => state.editor.selectedElement,
  );

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedElement && selectedElement?.id === id) {
      dispatch(selectElement(null));
    } else {
      dispatch(selectElement(props.element));
    }
  };

  const handleOnDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const type = e.dataTransfer.getData("type");
    const elementId = e.dataTransfer.getData("id");

    const dataTransferElement = findElementAction({
      editorArray: editor.elements,
      elementId,
    });

    switch (type) {
      case "text":
        dispatch(
          addElement({
            containerId: props.element.id,
            editorArray: editor.elements,
            newElement: dataTransferElement || {
              id: v4(),
              name: "Text field",
              styles: { ...defaultStyles },
              type: "text",
              content: { innerText: "text field" },
            },
          }),
        );
        break;
      case "container":
        dispatch(
          addElement({
            containerId: props.element.id,
            editorArray: editor.elements,
            newElement: dataTransferElement || {
              id: v4(),
              name: "Container",
              styles: { ...defaultStyles },
              type: "container",
              content: [],
            },
          }),
        );
        break;
    }
  };

  if (!editor) return;

  return (
    <div
      draggable={type !== CONTAINER_ID}
      onDragStartCapture={(e) => {
        e.dataTransfer.clearData();
        e.dataTransfer.setData("type", "container");
      }}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={(e) => e.preventDefault()}
      onDrop={handleOnDrop}
      style={styles}
      onClick={handleSelect}
      className={clsx(
        "relative z-50 border-[1px] border-dashed border-slate-300 p-4 transition-all duration-100",
        {
          "h-fit w-full": type === "container",
          "relative h-[91vh] w-full overflow-scroll": type === CONTAINER_ID,
          "mt-3": type !== CONTAINER_ID,
          "!border-blue-500":
            editor.selectedElement?.id === id &&
            editor.selectedElement?.type !== CONTAINER_ID,
          "!border-2 !border-yellow-400":
            editor.selectedElement?.id === id &&
            editor.selectedElement?.type === CONTAINER_ID,
          "!border-solid": editor.selectedElement?.id === id,
        },
      )}
    >
      <Badge
        className={clsx(
          "absolute -top-6 left-0 hidden rounded-none rounded-t-lg bg-blue-500",
          {
            block: selectedElement?.id === id,
          },
        )}
      >
        {props.element.name}
      </Badge>

      {Array.isArray(content) &&
        content.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}

      {editor.selectedElement?.id === props.element.id &&
        editor.selectedElement?.type !== CONTAINER_ID && (
          <div className="absolute -right-[1px] cursor-pointer rounded-lg bg-primary bg-zinc-700 px-2.5 py-2.5 text-xs font-bold hover:bg-zinc-800">
            <Trash size={16} />
          </div>
        )}
    </div>
  );
};
