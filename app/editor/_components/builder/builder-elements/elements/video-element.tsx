import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { EditorElement, editorActions } from "@/slices/editor-slice";
import clsx from "clsx";

type Props = {
  element: EditorElement;
};

export const VideoElement = (props: Props) => {
  const { selectedElement, viewingMode } = useAppSelector(
    (state) => state.editor,
  );
  const currentElement = props.element;

  const dispatch = useAppDispatch();

  const handleSelectElement = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (selectedElement?.id === currentElement.id) {
      dispatch(editorActions.selectElement(null));
    } else {
      dispatch(editorActions.selectElement(currentElement));
    }
  };

  return (
    <div
      onClick={handleSelectElement}
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
        <iframe
          width={currentElement.styles.width || "560"}
          height={currentElement.styles.height || "315"}
          src={currentElement.content.videoSrc}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      )}
    </div>
  );
};
