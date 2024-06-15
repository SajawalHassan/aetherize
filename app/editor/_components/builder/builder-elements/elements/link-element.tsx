import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { EditorElement, editorActions } from "@/slices/editor-slice";
import { ElementLayout } from "./element-layout";

type Props = {
  element: EditorElement;
};

export const LinkElement = (props: Props) => {
  const { elements, viewingMode } = useAppSelector((state) => state.editor);
  const currentElement = props.element;

  const dispatch = useAppDispatch();

  const handleOnBlur = (e: React.FocusEvent) => {
    const aTag = e.currentTarget as HTMLAnchorElement;

    dispatch(
      editorActions.updateElement({
        elementId: currentElement.id,
        elementsArray: elements,
        elementData: {
          ...currentElement,
          content: {
            text: aTag.innerText,
          },
        },
      }),
    );
  };

  return (
    <ElementLayout currentElement={currentElement}>
      {!Array.isArray(currentElement.content) && (
        <a
          href={currentElement.content.href}
          contentEditable={viewingMode !== "preview"}
          suppressContentEditableWarning
          onBlur={handleOnBlur}
          className="w-full"
        >
          {currentElement.content.text}
        </a>
      )}
    </ElementLayout>
  );
};
