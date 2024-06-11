import { EditorElement } from "@/slices/editor-slice";
import { ContainerElement } from "./container-element";
import { editorContainerId } from "@/lib/constants";

type Props = {
  element: EditorElement;
};

export const Recursive = (props: Props) => {
  switch (props.element.type) {
    case "container":
      return <ContainerElement element={props.element} />;
    case editorContainerId:
      return <ContainerElement element={props.element} />;
  }
};
