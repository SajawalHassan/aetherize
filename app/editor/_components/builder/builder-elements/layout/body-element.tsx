import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { editorContainerId } from "@/lib/constants";
import { EditorElement } from "@/slices/editor-slice";
import clsx from "clsx";
import { Badge } from "@/components/ui/badge";
import { ReactNode, useState } from "react";
import {
  dropElement,
  handleDeleteElement,
  handleDragStart,
  handleSelectElement,
} from "@/lib/helper";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { Recursive } from "../recursive";

type Props = {
  currentElement: EditorElement;
};

export const BodyElement = (props: Props) => {
  const [dragOverClassName, setDragOverClassName] = useState("");

  const { currentElement } = props;
  const { selectedElement, elements, viewingMode } = useAppSelector(
    (state) => state.editor,
  );

  const dispatch = useAppDispatch();

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
        "relative h-full w-full overflow-scroll p-4 transition-all duration-100",
        {
          "border border-solid":
            selectedElement?.id === currentElement.id &&
            viewingMode !== "preview",
          "border-th-secondary":
            selectedElement?.id === currentElement.id &&
            selectedElement?.type !== editorContainerId,
          "border-th-accent":
            selectedElement?.id === currentElement.id &&
            selectedElement?.type === editorContainerId,
          "border-spacing-4 border border-dashed border-th-btn":
            selectedElement?.id !== currentElement.id &&
            viewingMode !== "preview",
        },
        dragOverClassName,
      )}
    >
      <Badge
        className={clsx(
          "absolute -left-[2.3px] -top-6 hidden rounded-none rounded-t-lg",
          {
            block:
              selectedElement?.id === currentElement.id &&
              viewingMode !== "preview",
            "bg-th-secondary": selectedElement?.type !== editorContainerId,
            "bg-th-accent": selectedElement?.type === editorContainerId,
          },
        )}
      >
        {currentElement.name}
      </Badge>

      {Array.isArray(currentElement.content) &&
        currentElement.content.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}

      <TooltipProvider delayDuration={0}>
        <Button
          className={clsx(
            "absolute -bottom-10 -right-0 z-50 hidden items-center justify-center rounded-[5px] bg-th-secondary p-[6px] hover:bg-th-secondary/80 active:bg-th-secondary/60",
            {
              flex:
                selectedElement?.id === currentElement.id &&
                viewingMode !== "preview" &&
                currentElement.type !== editorContainerId,
            },
          )}
          onClick={(e) =>
            handleDeleteElement(e, currentElement.id, elements, dispatch)
          }
          tooltipText="Delete"
          tooltipContentClassName="bg-th-secondary"
        >
          <TrashIcon color="white" className="h-[24px] w-[24px]" />
        </Button>
      </TooltipProvider>
    </div>
  );
};
