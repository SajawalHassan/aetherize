import React from "react";
import { handleDragStart } from "@/lib/helper";
import { EditorElementTypes } from "@/lib/constants";
import { LucideIcon } from "lucide-react";

type Props = {
  componentType: EditorElementTypes;
  Icon: LucideIcon;
};

export const ElementPlaceholder = (props: Props) => {
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, props.componentType)}
      className="flex h-full w-full cursor-pointer items-center justify-center gap-[6px] rounded-lg bg-black/70 px-2.5 py-4 hover:bg-black/20"
    >
      <props.Icon size={30} />
    </div>
  );
};
