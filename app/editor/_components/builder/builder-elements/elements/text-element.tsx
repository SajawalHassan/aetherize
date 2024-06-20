import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { EditorElement, editorActions } from "@/slices/editor-slice";
import { ElementLayout } from "./element-layout";

type Props = {
  element: EditorElement;
};

export const TextElement = (props: Props) => {
  const { elements, viewingMode } = useAppSelector((state) => state.editor);
  const currentElement = props.element;

  const dispatch = useAppDispatch();

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
    <ElementLayout currentElement={currentElement} componentType={"text"}>
      {!Array.isArray(currentElement.content) && (
        <span
          contentEditable={viewingMode !== "preview"}
          suppressContentEditableWarning
          onBlur={handleOnBlur}
          className="w-full"
        >
          {currentElement.content.text}
        </span>
      )}
    </ElementLayout>
  );
};
