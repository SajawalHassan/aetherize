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
import { BODY_CONTAINER_ID, defaultStyles } from "@/lib/constants";
import { v4 } from "uuid";

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
    console.log(type, type === "text", type === "container");

    switch (type) {
      case "text":
        dispatch(
          addElement({
            containerId: props.element.id,
            editorArray: editor.elements,
            newElement: {
              id: v4(),
              name: "Text field",
              styles: { ...defaultStyles },
              type: "text",
              content: { innerText: "text field" },
            },
          }),
        );
        break;
      default:
        console.log("case is container");
        dispatch(
          addElement({
            containerId: props.element.id,
            editorArray: editor.elements,
            newElement: {
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
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={(e) => e.preventDefault()}
      onDrop={handleOnDrop}
      style={styles}
      onClick={handleSelect}
      className={clsx(
        "group relative border-[1px] border-dashed border-slate-300 px-4 pb-4 pt-7 transition-all",
        {
          "h-fit w-full max-w-full": type === "container",
          "h-full": type === "__body",
          "mt-3": type !== "__body",
          "overflow-scroll": type === "__body",
          "!border-blue-500":
            editor.selectedElement?.id === id &&
            editor.selectedElement?.type !== "__body",
          "!border-2 !border-yellow-400":
            editor.selectedElement?.id === id &&
            editor.selectedElement?.type === "__body",
          "!border-solid": editor.selectedElement?.id === id,
        },
      )}
    >
      <Badge
        className={clsx("absolute -top-0 left-0 rounded-none rounded-t-lg")}
      >
        {props.element.name}
      </Badge>

      {Array.isArray(content) &&
        content.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}

      {editor.selectedElement?.id === props.element.id &&
        editor.selectedElement?.type !== "__body" && (
          <div className="absolute -right-[1px] cursor-pointer rounded-lg bg-primary bg-zinc-700 px-2.5 py-2.5 text-xs font-bold hover:bg-zinc-800">
            <Trash size={16} />
          </div>
        )}
    </div>
  );
};
