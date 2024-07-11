import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { useTriggerChange } from "@/hooks/use-trigger-change";
import { useVariableChange } from "@/hooks/use-variable-change";
import { editorContainerId } from "@/lib/constants";
import {
  compare,
  dropElement,
  handleDeleteElement,
  handleSelectElement,
} from "@/lib/helper";
import { EditorElement, editorActions } from "@/slices/editor-slice";
import clsx from "clsx";
import { ClipboardCopyIcon, ClipboardPasteIcon, TrashIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { ContextMenuOption } from "./_components/context-menu-option";
import { Recursive } from "./recursive";

type Props = {
  currentElement: EditorElement;
};

export const BodyElement = (props: Props) => {
  const [contextMenu, setContextMenu] = useState(false);
  const [dragOverClassName, setDragOverClassName] = useState("");
  const [contextMenuPos, setContextMenuPos] = useState({
    x: 0,
    y: 0,
  });

  const elementRef = useRef<HTMLDivElement>(null);

  const { currentElement } = props;
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

  useHotkeys("ctrl+v", (e) => {
    if (!selectedElement) return;
    if (selectedElement.id !== currentElement.id) return;
    handlePaste(selectedElement.id);
  });

  const handlePaste = (containerId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    if (!copiedElement) return;

    dispatch(
      editorActions.pasteElement({
        containerId,
        elementsArray: elements,
        copiedElement,
      }),
    );

    setContextMenu(false);
  };

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    dropElement(e, currentElement, elements, dispatch);
    setDragOverClassName("");
  };

  return (
    <div
      ref={elementRef}
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
      onContextMenu={(e) => {
        if (viewingMode !== "development") return;

        e.stopPropagation();
        e.preventDefault();
        setContextMenu(true);
        setContextMenuPos({
          x: e.pageX,
          y: e.pageY,
        });
      }}
      style={currentElement.styles}
      className={clsx(
        "relative h-full w-full overflow-auto border border-transparent p-4 transition-all duration-100",
        {
          // Selected & in dev
          "!border-solid !border-th-accent":
            selectedElement?.id === currentElement.id &&
            viewingMode !== "preview",

          // Not selected & in dev
          "!border-dashed !border-th-btn":
            selectedElement?.id !== currentElement.id &&
            viewingMode !== "preview",
        },
        dragOverClassName,
      )}
    >
      {contextMenu && (
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
            setContextMenu(false);
          }}
        />
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
          disabled={true}
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
            "bg-th-secondary": selectedElement?.type !== editorContainerId,
            "bg-th-accent": selectedElement?.type === editorContainerId,
          },
        )}
      >
        {currentElement.name}
      </Badge>

      {currentElement.children
        .slice()
        .sort(compare)
        .map((childElement) => (
          <Recursive
            key={childElement.id}
            element={childElement}
            containerElement={currentElement}
          />
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
