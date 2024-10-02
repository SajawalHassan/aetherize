import { EditorElement } from "@/store/slices/editor-slice";
import { useDrop } from "react-dnd";

export const useElementDrop = () => {
  const [{ isOverDropAbove: isOverAbove }, dropAboveRef] = useDrop({
    accept: "element",
    drop: (element: EditorElement) => console.log("dropAboveRef", element.name),
    collect: (monitor) => ({
      isOverDropAbove: !!monitor.isOver(),
    }),
  });

  const [{ isOverBelow }, dropBelowRef] = useDrop({
    accept: "element",
    drop: (element: EditorElement) => console.log("dropBelowRef", element.name),
    collect: (monitor) => ({
      isOverBelow: !!monitor.isOver(),
    }),
  });

  return { isOverAbove, isOverBelow, dropAboveRef, dropBelowRef };
};
