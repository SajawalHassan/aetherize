import { ElementData } from "@/editor-store/editor-slice";
import { ContainerElement } from "./elements/container-element";
import { ImageElement } from "./elements/image-element";
import { LinkElement } from "./elements/link-element";
import { TextElement } from "./elements/text-element";

type Props = {
  element: ElementData;
};

export const Elementmanager = (props: Props) => {
  switch (props.element.type) {
    case "container":
      return <ContainerElement element={props.element} />;
    case "image":
      return <ImageElement element={props.element} />;
    case "link":
      return <LinkElement element={props.element} />;
    case "text":
      return <TextElement element={props.element} />;
    default:
      return <p>NO ELEMENT TYPE FOUND!</p>;
  }
};
