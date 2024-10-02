import { useElementDrop } from "@/hooks/use-element-drop";
import { EditorElement } from "@/store/slices/editor-slice";
import { useAppSelector } from "@/store/store-hooks";
import clsx from "clsx";

interface Props {
  element: EditorElement;
}

export const ElementDropIndicators = (props: Props) => {
  const editor = useAppSelector((state) => state.editorStore);
  const { dropAboveRef, dropBelowRef, isOverAbove, isOverBelow } = useElementDrop();

  return (
    <div
      className={clsx(
        "flex flex-col absolute top-0 h-full w-full justify-between -z-10",
        editor.isDraggingElement && "!z-50"
      )}>
      <div className={clsx("h-3 w-full", isOverAbove && "border-t-2 border-blue-500")} ref={dropAboveRef as any} />

      <div className={clsx("h-3 w-full", isOverBelow && "border-b-2 border-blue-500")} ref={dropBelowRef as any} />
    </div>
  );
};
