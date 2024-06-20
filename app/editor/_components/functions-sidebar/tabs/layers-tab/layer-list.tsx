import { compare } from "@/lib/helper";
import { EditorElement } from "@/slices/editor-slice";
import { Layer } from "./layer";

type Props = {
  layers: EditorElement[];
};

export const LayerList = (props: Props) => {
  return (
    <div className="-pl-2 mt-2 space-y-2">
      {props.layers
        .slice()
        .sort(compare)
        .map((element) => (
          <Layer element={element} key={element.id} />
        ))}
    </div>
  );
};
