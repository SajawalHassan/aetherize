import { EditorElement } from "@/slices/editor-slice";
import { Container } from "./container";
import { Text } from "./text";

type Props = {
  element: EditorElement;
};

export const Recursive = (props: Props) => {
  switch (props.element.type) {
    case "container":
      return <Container element={props.element} />;
    case "__body":
      return <Container element={props.element} />;
    case "text":
      return <Text element={props.element} />;
    default:
      return null;
  }
};
