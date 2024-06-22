import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { editorContainerId } from "@/lib/constants";
import { EditorElement } from "@/slices/editor-slice";
import clsx from "clsx";
import { Badge } from "@/components/ui/badge";
import React, { ReactNode, useState } from "react";
import {
  dropElement,
  handleDeleteElement,
  handleSelectElement,
} from "@/lib/helper";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { useVariableChange } from "@/hooks/use-variable-change";

type Props = {
  containerElement: EditorElement;
  currentElement: EditorElement;
  children: ReactNode;
  className?: string;
};

export const Layout = (props: Props) => {
  const [dragOverClassName, setDragOverClassName] = useState("");

  const { currentElement, children, className } = props;
  const { selectedElement, elements, viewingMode, variables } = useAppSelector(
    (state) => state.editor,
  );

  const dispatch = useAppDispatch();
  useVariableChange(
    variables,
    currentElement,
    elements,
    dispatch,
    selectedElement,
  );

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    dropElement(e, currentElement, elements, dispatch);
    setDragOverClassName("");
  };

  const handleDragHover = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const elementString: string = e.dataTransfer.getData("element");
    const hoveredElement: EditorElement = elementString
      ? JSON.parse(elementString)
      : null;

    if (!hoveredElement) setDragOverClassName("bg-th-btn/20");
    else if (hoveredElement.id !== currentElement.id) {
      if (hoveredElement.index > currentElement.index) {
        if (props.containerElement.styles.display === "flex")
          setDragOverClassName("!border-l-th-accent");
        else setDragOverClassName("!border-t-th-accent");
      } else {
        if (props.containerElement.styles.display === "flex")
          setDragOverClassName("!border-r-th-accent");
        else setDragOverClassName("!border-b-th-accent");
      }
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setDragOverClassName("");
  };

  return (
    <div
      draggable={viewingMode !== "preview"}
      onDragStart={(e) => {
        e.stopPropagation();
        e.dataTransfer.setData("element", JSON.stringify(currentElement));
      }}
      onDragOver={handleDragHover}
      onDragEnter={handleDragHover}
      onDragLeave={handleDragLeave}
      onDrop={handleOnDrop}
      onClick={(e) =>
        handleSelectElement(e, selectedElement, currentElement, dispatch)
      }
      style={currentElement.styles}
      className={clsx(
        "relative w-full p-4 transition-all duration-100",
        {
          "h-full overflow-scroll": currentElement.type === editorContainerId,
          "!border !border-solid":
            selectedElement?.id === currentElement.id &&
            viewingMode !== "preview",
          "!border-th-secondary":
            selectedElement?.id === currentElement.id &&
            selectedElement?.type !== editorContainerId,
          "!border-th-accent":
            selectedElement?.id === currentElement.id &&
            selectedElement?.type === editorContainerId,
          "!border-spacing-4 !border !border-th-accent/20":
            selectedElement?.id !== currentElement.id &&
            viewingMode !== "preview",
          "!h-10":
            (currentElement.content as Array<EditorElement>).length === 0,
        },
        dragOverClassName,
        className,
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

      {children}

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
