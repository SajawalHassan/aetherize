import { EditorElement } from "@/slices/editor-slice";
import { ElementLayout } from "./element-layout";

type Props = {
  element: EditorElement;
  containerElement: EditorElement;
};

export const VideoElement = (props: Props) => {
  const currentElement = props.element;

  return (
    <ElementLayout
      currentElement={currentElement}
      containerElement={props.containerElement}
    >
      <div className="min-h-full min-w-full">
        <iframe
          width={currentElement.styles.width || "560"}
          height={currentElement.styles.height || "315"}
          src={currentElement.content.videoSrc}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      </div>
    </ElementLayout>
  );
};
