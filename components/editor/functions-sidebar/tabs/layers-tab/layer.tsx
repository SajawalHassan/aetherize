import { EditorElement, editorActions } from "@/slices/editor-slice";
import React, { useMemo, useState } from "react";
import { LayerList } from "./layer-list";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import clsx from "clsx";
import { editorContainerId } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  BoxIcon,
  BoxSelectIcon,
  ImageIcon,
  LinkIcon,
  PointerIcon,
  TrashIcon,
  TypeIcon,
  YoutubeIcon,
} from "lucide-react";
import {
  dropElement,
  handleDeleteElement,
  handleSelectElement,
} from "@/lib/helper";

type Props = {
  element: EditorElement;
};

export const Layer = (props: Props) => {
  const [dragOverClassName, setDragOverClassName] = useState("");

  const { elements, selectedElement } = useAppSelector((state) => state.editor);
  const dispatch = useAppDispatch();

  const handleOnBlur = (e: React.FocusEvent) => {
    const pTag = e.currentTarget as HTMLSpanElement;

    dispatch(
      editorActions.updateElement({
        elementId: props.element.id,
        elementsArray: elements,
        elementData: {
          ...props.element,
          name: pTag.innerText,
        },
      }),
    );
  };

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    dropElement(e, props.element, elements, dispatch);
    setDragOverClassName("");
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const hoveredElement: EditorElement = JSON.parse(
      e.dataTransfer.getData("element"),
    );
    if (hoveredElement.id !== props.element.id) {
      if (hoveredElement.index > props.element.index) {
        setDragOverClassName("!border-t-th-accent");
      } else {
        setDragOverClassName("!border-b-th-accent");
      }
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setDragOverClassName("");
  };

  return (
    <div className="pl-2">
      <div
        draggable
        onDragStart={(e) => {
          e.stopPropagation();
          e.dataTransfer.setData("element", JSON.stringify(props.element));
        }}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleOnDrop}
        onClick={(e) =>
          handleSelectElement(e, selectedElement, props.element, dispatch)
        }
        className={clsx(
          "relative flex h-[40px] items-center justify-between rounded-sm border border-th-border pl-2",
          {
            "!rounded-none !border-th-secondary":
              props.element.id === selectedElement?.id &&
              props.element.id !== editorContainerId,
            "!rounded-none !border-th-accent":
              props.element.id === selectedElement?.id &&
              props.element.id === editorContainerId,
          },
          dragOverClassName,
        )}
      >
        <div className="flex items-center gap-x-2">
          {props.element.type === "container" ? (
            <BoxIcon size={20} />
          ) : props.element.type === "text" ? (
            <TypeIcon size={20} />
          ) : props.element.type === "image" ? (
            <ImageIcon size={20} />
          ) : props.element.type === "video" ? (
            <YoutubeIcon size={20} />
          ) : props.element.type === editorContainerId ? (
            <BoxSelectIcon size={20} />
          ) : props.element.type === "link" ? (
            <LinkIcon size={20} />
          ) : (
            props.element.type === "button" && <PointerIcon size={20} />
          )}
          <p
            className="w-max max-w-[150px] truncate font-medium"
            contentEditable
            suppressContentEditableWarning
            onBlur={handleOnBlur}
          >
            {props.element.name}
          </p>
        </div>
        <Button
          size={"icon"}
          onClick={(e) =>
            handleDeleteElement(e, props.element.id, elements, dispatch)
          }
          className={clsx("min-h-full rounded-l-none rounded-r-sm", {
            "!rounded-none !bg-th-secondary !text-white hover:!bg-th-secondary/80":
              selectedElement?.id === props.element.id,
            "!bg-th-accent hover:!bg-th-accent/80":
              selectedElement?.id === props.element.id &&
              selectedElement?.id === editorContainerId,
            "!hidden": props.element.id === editorContainerId,
          })}
        >
          <TrashIcon size={18} />
        </Button>
      </div>
      <LayerList layers={props.element.children} />
    </div>
  );
};
