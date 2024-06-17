import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { EditorElement, editorActions } from "@/slices/editor-slice";
import clsx from "clsx";
import { handleDeleteElement, handleSelectElement } from "@/lib/helper";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactNode } from "react";

type Props = {
  currentElement: EditorElement;
  className?: string;
  children: ReactNode;
};

export const ElementLayout = (props: Props) => {
  const { elements, selectedElement, viewingMode } = useAppSelector(
    (state) => state.editor,
  );

  const { currentElement, children } = props;

  const dispatch = useAppDispatch();

  return (
    <div
      style={currentElement.styles}
      onClick={(e) =>
        handleSelectElement(e, selectedElement, currentElement, dispatch)
      }
      className={clsx(
        "relative",
        {
          "border border-solid":
            selectedElement?.id === currentElement.id &&
            viewingMode !== "preview",
          "border-th-secondary": selectedElement?.id === currentElement.id,
          "border-spacing-4 border border-dashed border-th-accent/20":
            selectedElement?.id !== currentElement.id &&
            viewingMode !== "preview",
        },
        props.className,
      )}
    >
      <Badge
        className={clsx(
          "absolute -left-[2.3px] -top-6 hidden truncate rounded-none rounded-t-lg bg-th-secondary",
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
