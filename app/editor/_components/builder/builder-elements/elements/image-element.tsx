import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { EditorElement, editorActions } from "@/slices/editor-slice";
import clsx from "clsx";
import { handleDeleteElement, handleSelectElement } from "../helper";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

type Props = {
  element: EditorElement;
};

export const ImageElement = (props: Props) => {
  const { selectedElement, viewingMode, elements } = useAppSelector(
    (state) => state.editor,
  );
  const currentElement = props.element;

  const dispatch = useAppDispatch();

  return (
    <div
      style={currentElement.containerStyles}
      onClick={(e) =>
        handleSelectElement(e, selectedElement, currentElement, dispatch)
      }
      className={clsx("relative min-h-[20px]", {
        "border-2 border-solid":
          selectedElement?.id === currentElement.id &&
          viewingMode !== "preview",
        "border-th-secondary": selectedElement?.id === currentElement.id,
        "border-spacing-4 border-2 border-dashed border-th-btn":
          selectedElement?.id !== currentElement.id &&
          viewingMode !== "preview",
      })}
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
      {!Array.isArray(currentElement.content) && (
        <img
          className="h-full w-full"
          src={currentElement.content.imageSrc}
          alt={currentElement.name}
        />
      )}

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
