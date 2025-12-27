import { useAppSelector } from "@/editor-store/hooks";
import { Elementmanager } from "./element-manager";

type Props = {};

export const Renderer = (props: Props) => {
  const elements = useAppSelector((state) => state.editorReducer.elements);

  return (
    <div className="border min-h-[calc(100vh-86px)] w-full border-blue-500 bg-white text-black">
      {elements.map((element) => (
        <Elementmanager element={element} key={element.id} />
      ))}
    </div>
  );
};
