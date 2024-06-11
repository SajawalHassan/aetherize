import { EditorElement } from "@/slices/editor-slice";
import { ContainerElement } from "./container-element";
import { editorContainerId } from "@/lib/constants";
import { MColElement } from "./mCol-element";

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
  }
};
