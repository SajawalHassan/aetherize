import { ElementData } from "@/editor-store/editor-slice";
import { ElementLayout } from "./element-layout";

type Props = {
  element: ElementData;
};

export const ImageElement = (props: Props) => {
  return <ElementLayout element={props.element}>Image</ElementLayout>;
};
