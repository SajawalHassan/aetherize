import React from "react";
import { caseAddElement, handleDragStart } from "@/lib/helper";
import { EditorElementTypes } from "@/lib/types";
import { LucideIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";

type Props = {
  componentType: EditorElementTypes;
  Icon: LucideIcon;
  draggable?: boolean;
};

export const ElementPlaceholder = (props: Props) => {
  const dispatch = useAppDispatch();
  const { selectedElement, elements } = useAppSelector((state) => state.editor);

  return (
    <div
      draggable={props.draggable !== undefined ? props.draggable : true}
      onDragStart={(e) => handleDragStart(e, props.componentType)}
      onClick={() =>
        caseAddElement(
          props.componentType,
          selectedElement ? selectedElement : elements[0],
          elements,
          dispatch,
        )
      }
      className="flex h-full w-full cursor-pointer items-center justify-center gap-[6px] rounded-lg bg-black/70 px-2.5 py-4 hover:bg-black/20"
    >
      <props.Icon size={30} />
    </div>
  );
};
