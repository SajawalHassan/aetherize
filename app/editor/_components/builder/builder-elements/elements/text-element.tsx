import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { EditorElement, editorActions } from "@/slices/editor-slice";
import clsx from "clsx";

type Props = {
  element: EditorElement;
};

export const TextElement = (props: Props) => {
  const { elements, selectedElement } = useAppSelector((state) => state.editor);
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

  const handleOnBlur = (e: React.FocusEvent) => {
    const spanTag = e.currentTarget as HTMLSpanElement;

    dispatch(
      editorActions.updateElement({
        elementId: currentElement.id,
        elementsArray: elements,
        elementData: {
          ...currentElement,
          content: {
            text: spanTag.innerText,
          },
        },
      }),
    );
  };

  return (
    <div
      onClick={handleSelectElement}
      className={clsx(
        "relative border-2 p-4",
        selectedElement?.id !== currentElement.id
          ? "border-spacing-4 border-dashed border-th-btn"
          : "border-solid border-th-secondary",
      )}
    >
      <Badge
        className={clsx(
          "absolute -left-[2.3px] -top-6 hidden rounded-none rounded-t-lg bg-th-secondary",
          {
            block: selectedElement?.id === currentElement.id,
          },
        )}
      >
        {props.element.name}
      </Badge>
      {!Array.isArray(currentElement.content) && (
        <span contentEditable onBlur={handleOnBlur} className="w-full">
          {currentElement.content.text}
        </span>
      )}
    </div>
  );
};
