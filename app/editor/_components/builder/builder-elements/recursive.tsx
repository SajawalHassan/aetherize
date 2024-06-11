import { EditorElement } from "@/slices/editor-slice";
import { ContainerElement } from "./layout/container-element";
import { editorContainerId } from "@/lib/constants";
import { MColElement } from "./layout/mCol-element";
import { TextElement } from "./elements/text-element";
import { LinkElement } from "./elements/link-element";
import { ImageElement } from "./elements/image-element";
import { VideoElement } from "./elements/video-element";

type Props = {
  element: EditorElement;
};

export const Recursive = (props: Props) => {
  switch (props.element.type) {
    case editorContainerId:
      return <ContainerElement element={props.element} />;
    case "container":
      return <ContainerElement element={props.element} />;
    case "mCol":
      return <MColElement element={props.element} />;
    case "text":
      return <TextElement element={props.element} />;
    case "link":
      return <LinkElement element={props.element} />;
    case "image":
      return <ImageElement element={props.element} />;
    case "video":
      return <VideoElement element={props.element} />;
  }
};
