import { ElementData } from "@/editor-store/editor-slice";
import { ElementLayout } from "../element-layout";

type Props = {
  element: ElementData;
};

export const LinkElement = (props: Props) => {
  return <ElementLayout element={props.element}>Link</ElementLayout>;
};
