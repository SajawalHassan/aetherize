import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { EditorElement, editorActions } from "@/slices/editor-slice";
import clsx from "clsx";
import { handleDeleteElement, handleSelectElement } from "@/lib/helper";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

type Props = {
  element: EditorElement;
};

export const VideoElement = (props: Props) => {
  const { selectedElement, viewingMode, elements } = useAppSelector(
    (state) => state.editor,
  );
  const currentElement = props.element;

  const dispatch = useAppDispatch();

  return (
    <div
      onClick={(e) =>
        handleSelectElement(e, selectedElement, currentElement, dispatch)
      }
      className={clsx("relative min-h-[20px]", {
        "border border-solid":
          selectedElement?.id === currentElement.id &&
          viewingMode !== "preview",
        "border-th-secondary": selectedElement?.id === currentElement.id,
        "border-spacing-4 border border-dashed border-th-btn":
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
        <iframe
          width={currentElement.containerStyles.width || "560"}
          height={currentElement.containerStyles.height || "315"}
          src={currentElement.content.videoSrc}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      )}

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
