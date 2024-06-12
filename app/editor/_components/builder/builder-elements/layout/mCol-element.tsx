import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { EditorElementTypes, editorContainerId } from "@/lib/constants";
import { EditorElement, editorActions } from "@/slices/editor-slice";
import clsx from "clsx";
import { v4 } from "uuid";
import { Recursive } from "../recursive";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  dropElement,
  handleDeleteElement,
  handleSelectElement,
} from "../helper";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

type Props = {
  element: EditorElement;
};

export const MColElement = (props: Props) => {
  const [dragOverClassName, setDragOverClassName] = useState("");

  const dispatch = useAppDispatch();

  const { selectedElement, elements, viewingMode } = useAppSelector(
    (state) => state.editor,
  );
  const currentElement = props.element;

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    dropElement(e, currentElement, elements, dispatch);
    setDragOverClassName("");
  };

  return (
    <div
      onDragOver={(e) => {
        e.stopPropagation();
        e.preventDefault();
        if (viewingMode !== "preview") setDragOverClassName("bg-th-btn/20");
      }}
      onDragEnter={(e) => {
        e.stopPropagation();
        e.preventDefault();
        if (viewingMode !== "preview") setDragOverClassName("bg-th-btn/20");
      }}
      onDragLeave={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setDragOverClassName("");
      }}
      onDrop={handleOnDrop}
      onClick={(e) =>
        handleSelectElement(e, selectedElement, currentElement, dispatch)
      }
      style={currentElement.containerStyles}
      className={clsx(
        "relative flex w-full border-spacing-4 gap-2 p-4 transition-all duration-100",
        {
          "h-full": currentElement.type === editorContainerId,
          "border-2 border-solid":
            selectedElement?.id === currentElement.id &&
            viewingMode !== "preview",
          "border-th-secondary":
            selectedElement?.id === currentElement.id &&
            selectedElement?.type !== editorContainerId,
          "border-spacing-4 border-2 border-dashed border-th-btn":
            selectedElement?.id !== currentElement.id &&
            viewingMode !== "preview",
        },
        dragOverClassName,
      )}
    >
      <Badge
        className={clsx(
          "absolute -left-[2.3px] -top-6 hidden rounded-none rounded-t-lg bg-th-secondary",
          {
            block:
              selectedElement?.id === currentElement.id &&
              viewingMode !== "preview",
          },
        )}
      >
        {props.element.name}
      </Badge>

      {Array.isArray(currentElement.content) &&
        currentElement.content.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}

      <TooltipProvider>
        <Button
          className={clsx(
            "absolute -bottom-10 -right-0 hidden items-center justify-center rounded-[5px] bg-th-secondary p-[6px] hover:bg-th-secondary/80 active:bg-th-secondary/60",
            {
              flex:
                selectedElement?.id === currentElement.id &&
                viewingMode !== "preview",
            },
          )}
          onClick={(e) =>
            handleDeleteElement(e, currentElement.id, elements, dispatch)
          }
        >
          <TrashIcon color="white" className="h-[24px] w-[24px]" />
        </Button>
      </TooltipProvider>
    </div>
  );
};
