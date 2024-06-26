import { EditorElement } from "@/slices/editor-slice";
import { ElementLayout } from "./element-layout";

type Props = {
  element: EditorElement;
  containerElement: EditorElement;
};

export const ImageElement = (props: Props) => {
  const currentElement = props.element;

  return (
    <ElementLayout
      currentElement={currentElement}
      containerElement={props.containerElement}
    >
      {!Array.isArray(currentElement.content) && (
        <img
          className="h-full w-full"
          src={currentElement.content.imageSrc}
          alt={currentElement.name}
        />
      )}
    </ElementLayout>
  );
};
