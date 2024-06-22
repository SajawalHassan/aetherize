import { EditorElement } from "@/slices/editor-slice";
import { ContainerElement } from "./layout/container-element";
import { editorContainerId } from "@/lib/constants";
import { TextElement } from "./elements/text-element";
import { LinkElement } from "./elements/link-element";
import { ImageElement } from "./elements/image-element";
import { VideoElement } from "./elements/video-element";
import { BodyElement } from "./layout/body-element";
import { ButtonElement } from "./elements/button-element";

type Props = {
  element: EditorElement;
  containerElement: EditorElement;
};

export const Recursive = (props: Props) => {
  switch (props.element.type) {
    case editorContainerId:
      return <BodyElement currentElement={props.element} />;
    case "container":
      return (
        <ContainerElement
          element={props.element}
          containerElement={props.containerElement}
        />
      );
    case "text":
      return (
        <TextElement
          element={props.element}
          containerElement={props.containerElement}
        />
      );
    case "link":
      return (
        <LinkElement
          element={props.element}
          containerElement={props.containerElement}
        />
      );
    case "image":
      return (
        <ImageElement
          element={props.element}
          containerElement={props.containerElement}
        />
      );
    case "video":
      return (
        <VideoElement
          element={props.element}
          containerElement={props.containerElement}
        />
      );
    case "button":
      return (
        <ButtonElement
          currentElement={props.element}
          containerElement={props.containerElement}
        />
      );
  }
};
