import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { editorContainerId } from "@/lib/constants";
import { EditorElement, editorActions } from "@/slices/editor-slice";
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
import { ClipboardCopyIcon, ClipboardPasteIcon, TrashIcon } from "lucide-react";
import { useTriggerChange } from "@/hooks/use-trigger-change";
import { ContextMenuOption } from "../_components/context-menu-option";
import { v4 } from "uuid";
import { useHotkeys } from "react-hotkeys-hook";
import { useVariableChange } from "@/hooks/use-variable-change";

type Props = {
  containerElement: EditorElement;
  currentElement: EditorElement;
  children: ReactNode;
  className?: string;
};

export const Layout = (props: Props) => {
  const [dragOverClassName, setDragOverClassName] = useState("");
  const [contextMenu, setContextMenu] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({
    x: 0,
    y: 0,
  });

  const { currentElement, children, className } = props;
  const {
    selectedElement,
    elements,
    viewingMode,
    triggers,
    copiedElement,
    variables,
  } = useAppSelector((state) => state.editor);

  const dispatch = useAppDispatch();
  useTriggerChange(triggers, currentElement, elements, dispatch);
  useVariableChange(variables, currentElement, elements, dispatch);

  useHotkeys("ctrl+c", () => {
    if (!selectedElement) return;
    handleCopy(selectedElement);
  });

  useHotkeys("ctrl+v", () => {
    if (!selectedElement) return;
    if (selectedElement.id !== currentElement.id) return;
    handlePaste(selectedElement.id);
  });

  useHotkeys("delete", () => {
    if (!selectedElement) return;
    if (selectedElement.id !== currentElement.id) return;
    dispatch(
      editorActions.deleteElement({
        elementId: currentElement.id,
        elementsArray: elements,
      }),
    );
  });

  const handleCopy = (element: EditorElement, e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();

    dispatch(editorActions.copyElement(element));
    setContextMenu(false);
  };

  const handlePaste = (containerElementId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    if (!copiedElement) return;

    dispatch(
      editorActions.addElement({
        containerId: containerElementId,
        elementsArray: elements,
        newElement: {
          ...copiedElement,
          id: v4(),
          name: copiedElement.name + " copy",
        },
      }),
    );

    setContextMenu(false);
  };

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

    // prettier-ignore
    if (!hoveredElement) setDragOverClassName("bg-th-btn/20");
    
    else if (hoveredElement.id !== currentElement.id && hoveredElement.containerId === currentElement.containerId) {
      if (hoveredElement.index > currentElement.index) { // Element is below other element
        if (props.containerElement.styles.display === "flex") { // Container has flexbox
          setDragOverClassName("!border-l-th-accent");
        } else {
          setDragOverClassName("!border-t-th-accent");
        }
      } else { // Element is above other element
        if (props.containerElement.styles.display === "flex") { // Container has flexbox
          setDragOverClassName("!border-r-th-accent");
        } else {
          setDragOverClassName("!border-b-th-accent");
        }
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
      draggable={viewingMode !== "preview" && !contextMenu}
      onDragStart={(e) => {
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
      onContextMenu={(e) => {
        if (viewingMode !== "development") return;
        e.preventDefault();
        e.stopPropagation();
        setContextMenu(true);
        setContextMenuPos({
          x: e.pageX,
          y: e.pageY,
        });
      }}
      className={clsx(
        "relative w-full p-4 transition-all duration-100",
        {
          "h-full overflow-scroll": currentElement.type === editorContainerId,
          "!border !border-solid":
            selectedElement?.id === currentElement.id &&
            viewingMode !== "preview",
          "!border-th-element-border-select":
            selectedElement?.id === currentElement.id,
          "!border-spacing-4 !border !border-th-element-border":
            selectedElement?.id !== currentElement.id &&
            viewingMode !== "preview",
          "!h-10":
            (currentElement.content as Array<EditorElement>).length === 0,
        },
        dragOverClassName,
        className,
      )}
    >
      {contextMenu && (
        <>
          <div
            className="fixed inset-0 z-[100]"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setContextMenu(false);
            }}
            onContextMenu={(e) => {
              if (viewingMode !== "development") return;
              e.preventDefault();
              e.stopPropagation();
            }}
          />
        </>
      )}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ top: contextMenuPos.y, left: contextMenuPos.x }}
        className={clsx(
          "fixed -z-[110] min-h-60 min-w-[14rem] rounded-sm border border-white/20 bg-th-btn py-2 opacity-0 transition-opacity duration-100",
          {
            "!z-[110] opacity-100": contextMenu === true,
          },
        )}
      >
        <h4 className="mb-2 ml-2.5 text-xl font-semibold">Options</h4>
        <ContextMenuOption
          text="Copy element"
          Icon={ClipboardCopyIcon}
          hotKey="Ctrl+C"
          onClick={(e) => handleCopy(currentElement, e)}
          disabled={currentElement.id === editorContainerId}
        />
        <ContextMenuOption
          text="Paste element"
          Icon={ClipboardPasteIcon}
          hotKey="Ctrl+V"
          onClick={(e) => handlePaste(currentElement.id, e)}
          disabled={!!!copiedElement}
        />
      </div>

      <Badge
        className={clsx(
          "absolute -left-[2.3px] -top-6 hidden rounded-none rounded-t-lg",
          {
            block:
              selectedElement?.id === currentElement.id &&
              viewingMode !== "preview",
            "bg-th-element-border-select":
              selectedElement?.type !== editorContainerId,
          },
        )}
      >
        {currentElement.name}
      </Badge>

      {children}

      <TooltipProvider delayDuration={0}>
        <Button
          className={clsx(
            "absolute -bottom-10 -right-0 z-50 hidden items-center justify-center rounded-[5px] bg-th-element-border-select p-[6px] hover:bg-th-element-border-select/80 active:bg-th-secondary/60",
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
          tooltipContentClassName="bg-th-element-border-select"
        >
          <TrashIcon color="white" className="h-[24px] w-[24px]" />
        </Button>
      </TooltipProvider>
    </div>
  );
};
