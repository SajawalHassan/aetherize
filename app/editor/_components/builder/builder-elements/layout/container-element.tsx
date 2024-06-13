import { EditorElement } from "@/slices/editor-slice";
import { Recursive } from "../recursive";
import { Layout } from "./layout";

type Props = {
  element: EditorElement;
};

export const ContainerElement = (props: Props) => {
  const currentElement = props.element;

  return (
    <Layout currentElement={currentElement}>
      {Array.isArray(currentElement.content) &&
        currentElement.content.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}
    </Layout>
  );
};
