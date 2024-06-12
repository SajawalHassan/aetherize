import React from "react";
import { handleDragStart } from "@/lib/helper";

type Props = {};

export const MColPlaceholder = (props: Props) => {
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "mCol")}
      className="flex h-full w-full cursor-pointer flex-row gap-[6px] rounded-lg bg-black/70 px-2.5 py-4 hover:bg-black/20"
    >
      <div className="h-full w-full rounded-sm border-[1px] border-dashed border-muted-foreground/50 bg-muted-foreground/20" />
      <div className="h-full w-full rounded-sm border-[1px] border-dashed border-muted-foreground/50 bg-muted-foreground/20" />
    </div>
  );
};
