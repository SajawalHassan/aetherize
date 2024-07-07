import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { editorContainerId } from "@/lib/constants";
import { caseAddElement, handleDragStart } from "@/lib/helper";
import { editorActions } from "@/slices/editor-slice";

type Props = { draggable?: boolean };

export const ContainerPlaceholder = (props: Props) => {
  const dispatch = useAppDispatch();
  const { selectedElement, elements } = useAppSelector((state) => state.editor);

  return (
    <div
      draggable={props.draggable !== undefined ? props.draggable : true}
      onDragStart={(e) => handleDragStart(e, "container")}
      onClick={() =>
        caseAddElement(
          "container",
          selectedElement ? selectedElement : elements[0],
          elements,
          dispatch,
        )
      }
      className="flex h-full w-full cursor-pointer gap-[4px] rounded-lg bg-black/70 p-4 hover:bg-black/20"
    >
      <div className="h-full w-full rounded-sm border-[1px] border-dashed border-muted-foreground/50 bg-muted-foreground/20" />
    </div>
  );
};
