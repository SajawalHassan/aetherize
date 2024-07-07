import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { EditorElement, editorActions } from "@/slices/editor-slice";
import { ElementLayout } from "./element-layout";
import { handleSelectElement } from "@/lib/helper";

type Props = {
  element: EditorElement;
  containerElement: EditorElement;
};

export const LinkElement = (props: Props) => {
  const { elements, viewingMode, selectedElement } = useAppSelector(
    (state) => state.editor,
  );
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
    <ElementLayout
      currentElement={currentElement}
      containerElement={props.containerElement}
    >
      <a
        href={currentElement.content.href}
        contentEditable={
          viewingMode !== "preview" && selectedElement?.id === currentElement.id
        }
        suppressContentEditableWarning
        onClick={(e) => {
          e.stopPropagation();
          if (selectedElement?.id !== currentElement.id)
            handleSelectElement(e, selectedElement, currentElement, dispatch);
        }}
        onBlur={handleOnBlur}
        className="w-full"
      >
        {currentElement.content.text}
      </a>
    </ElementLayout>
  );
};
