import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { EditorElement, editorActions } from "@/slices/editor-slice";
import clsx from "clsx";
import {
  dropElement,
  handleDeleteElement,
  handleSelectElement,
} from "@/lib/helper";
import { Button } from "@/components/ui/button";
import { ClipboardCopyIcon, ClipboardPasteIcon, TrashIcon } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactNode, useState } from "react";
import { useVariableChange } from "@/hooks/use-variable-change";
import { useHotkeys } from "react-hotkeys-hook";
import { v4 } from "uuid";
import { ContextMenuOption } from "../_components/context-menu-option";
import { editorContainerId } from "@/lib/constants";

type Props = {
  containerElement: EditorElement;
  currentElement: EditorElement;
  className?: string;
  children: ReactNode;
};

export const ElementLayout = (props: Props) => {
  const [dragOverClassName, setDragOverClassName] = useState("");
  const [contextMenu, setContextMenu] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({
    x: 0,
    y: 0,
  });

  const { elements, selectedElement, viewingMode, variables, copiedElement } =
    useAppSelector((state) => state.editor);

  const { currentElement, children } = props;

  const dispatch = useAppDispatch();
  useVariableChange(
    variables,
    currentElement,
    elements,
    dispatch,
    selectedElement,
  );

  useHotkeys("ctrl+c", () => {
    if (!selectedElement) return;
    handleCopy(selectedElement);
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

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    dropElement(e, currentElement, elements, dispatch);
    setDragOverClassName("");
  };

  const handleDragHover = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const elementString: string = e.dataTransfer.getData("element");
    const hoveredElement = elementString ? JSON.parse(elementString) : null;

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
      style={currentElement.styles}
      onClick={(e) =>
        handleSelectElement(e, selectedElement, currentElement, dispatch)
      }
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setContextMenu(true);
        setContextMenuPos({
          x: e.pageX,
          y: e.pageY,
        });
      }}
      className={clsx(
        "relative w-max",
        {
          "border border-solid":
            selectedElement?.id === currentElement.id &&
            viewingMode !== "preview",
          "border-th-secondary": selectedElement?.id === currentElement.id,
          "border-spacing-4 border border-th-accent/20":
            selectedElement?.id !== currentElement.id &&
            viewingMode !== "preview",
        },
        props.className,
        dragOverClassName,
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
              e.preventDefault();
              e.stopPropagation();
              setContextMenu(false);
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
          disabled
        />
      </div>
      <Badge
        className={clsx(
          "absolute -left-[2.3px] -top-6 hidden truncate rounded-none rounded-t-lg bg-th-secondary hover:bg-th-secondary/80",
          {
            block:
              selectedElement?.id === currentElement.id &&
              viewingMode !== "preview",
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
                viewingMode !== "preview",
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
